#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include <omp.h>
#include "hmm_data_gen.h"
#include "viterbi_helpers.h"

void viterbi(int n, int q, int t, int O[n], int S[q], float I[q], int Y[t], float A[q][q], float B[q][n]);
void fix_stage(int n, int lp, int q, int t, float s1[q], int s2[q], float dp1[q][t], int Y[t], float A[q][q], float B[q][n]);
void copy_new_stage_to_old(int q, int t, int stage_num, float s1[q], int s2[q], float dp1[q][t], int dp2[q][t]);
bool is_parallel(int q, int t, int comp_stage_idx, float s[q], float dp1[q][t]);

void viterbi(
    int n,
    int q,
    int t,
    int O[n],
    int S[q],
    float I[q],
    int Y[t],
    float A[q][q],
    float B[q][n])
{
    int p = 4;
    float dp1[q][t];
    int dp2[q][t];
    int segment_size = t / p;

    float min_prob = -1.000;
    float max_prob = -0.001;

    /* Initialize dp matrices */
    for (int i = 0; i < q; i++)
    {
        for (int j = 0; j < t; j++)
        {
            if (j == 0)
            {
                int observation = Y[0];
                dp1[i][0] = I[i] + B[i][observation];
                dp2[i][0] = 0;
            }
            else
            {
                dp1[i][j] = get_rand_float(min_prob, max_prob);
                dp2[i][j] = 0;
            }
        }
    }
    // Forward Phase
    omp_set_num_threads(10);
    int max_threads = omp_get_max_threads();
    int num_stages = t;
    int block_size = (int)ceil((float)num_stages / num_stages);
#pragma omp parallel num_threads(max_threads)
    {
        int tid = omp_get_thread_num();
        int lp = (tid * block_size) + 1;
        int rp = lp + block_size;
        // for each stage that processor i is responsible for
#pragma omp barrier
        for (int j = lp; j <= rp; j++)
        {
#pragma omp barrier
            if (j < t)
            {
                for (int k = 0; k < q; k++)
                {
                    float max = -INFINITY;
                    int arg_max = -1;
                    double curr_log_prob, sub_prob;
                    for (int l = 0; l < q; l++)
                    {
                        sub_prob = dp1[l][j - 1];
                        curr_log_prob = sub_prob + A[l][k] + B[k][Y[j]];
                        // // Update max and curr_max if needed
                        if (curr_log_prob > max)
                        {
                            max = curr_log_prob;
                            arg_max = l;
                        }
                    }
                    // Update dp memos
                    dp1[k][j] = max;
                    dp2[k][j] = arg_max;
                }
            }
        }
    }

    // Fixup Phase
    bool converged = false;
    bool conv[p]; // conv[i] denotes whether segment i has converged
    for (int i = 0; i < p; i++)
    {
        conv[i] = false;
    }
    int count = 0;
    do
    {
        count++;
#pragma omp parallel for
        for (int i = 1; i < p; i++)
        {
            int lp = segment_size * i;
            int rp = lp + segment_size - 1;
            if (i == p - 1)
            {
                rp = t - 1;
            }
            bool parallel = false;
            float s1[q];
            int s2[q];
            for (int j = lp; j <= rp; j++)
            {
                // Fix stage j using actual solution to stage j-1
                fix_stage(n, j, q, t, s1, s2, dp1, Y, A, B);
                // If new solution and old solution are parallel, break
                parallel = is_parallel(q, t, j, s1, dp1);
                if (parallel)
                {
                    conv[i] = true;
                    break;
                }
                copy_new_stage_to_old(q, t, j, s1, s2, dp1, dp2);
            }
            bool local_conv = true;
        }
        converged = true;
        for (int i = 1; i < p; i++)
        {
            if (!conv[i])
            {
                converged = false;
                break;
            }
        }
    } while (!converged);

    // Get last state in path
    float max = dp1[0][t - 1];
    int arg_max = 0;
    float state_prob;
    for (int i = 1; i < q; i++)
    {
        state_prob = dp1[i][t - 1];
        if (state_prob > max)
        {
            max = state_prob;
            arg_max = i;
        }
    }
    int X[t];
    X[t - 1] = S[arg_max];
    // Backward algorithm
    for (int i = t - 1; i > 0; i--)
    {
        arg_max = dp2[arg_max][i];
        X[i - 1] = S[arg_max];
    }
    printf("===========================================================\n"
           "RESULTS\n"
           "===========================================================\n");
    printf("Observation sequence:\n");
    print_arr(t, Y);
    printf("Most probable state sequence:\n");
    print_arr(t, X);
}

/* Copy new stage to old */
void copy_new_stage_to_old(int q, int t, int stage_num, float s1[q], int s2[q], float dp1[q][t], int dp2[q][t])
{
    for (int i = 0; i < q; i++)
    {
        dp1[i][stage_num] = s1[i];
        dp2[i][stage_num] = s2[i];
    }
}

void fix_stage(
    int n,
    int lp,
    int q,
    int t,
    float s1[q],
    int s2[q],
    float dp1[q][t],
    int Y[t],
    float A[q][q],
    float B[q][n])
{
    for (int i = 0; i < q; i++)
    {
        float max = -INFINITY;
        int arg_max = -1;
        double curr_log_prob;
        for (int j = 0; j < q; j++)
        {
            curr_log_prob = dp1[j][lp - 1] + A[j][i] + B[i][Y[lp]];
            // Update max and curr_max if needed
            if (curr_log_prob > max)
            {
                max = curr_log_prob;
                arg_max = j;
            }
        }
        s1[i] = max;
        s2[i] = arg_max;
    }
}

bool is_parallel(int q, int t, int comp_stage_idx, float s[q], float dp[q][t])
{
    for (int i = 1; i < q; i++)
    {
        if ((s[i - 1] - dp[i - 1][comp_stage_idx]) != (s[i] - dp[i][comp_stage_idx]))
        {
            return false;
        }
    }
    return true;
}

int main()
{
    int n, q, t;
    printf("===========================================================\n"
           "VITERBI LTDP PARALLEL ALGORITHM\n");
    printf("Computing the most probable state sequence from a sequence of observations.\n");
    printf("This program will generate the observation sequence and HMM based on the\n"
           "dimensions you specify.\n");
    printf("===========================================================\n");
    printf("Enter the size of the observation space: ");
    scanf("%d", &n);
    printf("Enter the size of the state space: ");
    scanf("%d", &q);
    printf("Enter the number of observations in the sequence: ");
    scanf("%d", &t);
    int O[n];
    int S[q];
    int Y[t];
    float I[q];
    float A[q][q];
    float B[q][n];
    convert_array_to_log_prob(2, I);
    convert_to_log_prob(2, 2, A);
    convert_to_log_prob(2, 2, B);
    generate_sequence(q, n, t, O, S, Y, I, A, B);
    viterbi(n, q, t, O, S, I, Y, A, B);
    return 0;
}
