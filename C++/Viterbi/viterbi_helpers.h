#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>

int max(int a, int b);
float get_rand_float(float min, float max);
void print_arr(int t, int X[t]);
void print_fl_arr(int t, float X[t]);
void print_fl_matrix(int m, int n, float A[m][n]);
void print_matrix(int m, int n, int A[m][n]);
void convert_to_log_prob(int m, int n, float matrix[m][n]);
void convert_array_to_log_prob(int n, float arr[n]);

int max(int a, int b)
{
    if (a > b)
    {
        return a;
    }
    return b;
}

float get_rand_float(float min, float max)
{
    return (max - min) * ((((float)rand()) / (float)RAND_MAX)) + min;
}

void print_arr(int t, int X[t])
{
    for (int i = 0; i < t; i++)
    {
        printf("%d ", X[i]);
    }
    printf("\n");
}

void print_fl_arr(int t, float X[t])
{
    for (int i = 0; i < t; i++)
    {
        printf("%f ", X[i]);
    }
    printf("\n");
}

void print_fl_matrix(int m, int n, float A[m][n])
{
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            printf("%f ", A[i][j]);
        }
        printf("\n");
    }
}

void print_matrix(int m, int n, int A[m][n])
{
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            printf("%d ", A[i][j]);
        }
        printf("\n");
    }
}

void convert_to_log_prob(int m, int n, float A[m][n])
{
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            A[i][j] = (float)log(A[i][j]);
        }
    }
}

void convert_array_to_log_prob(int n, float X[n])
{
    for (int i = 0; i < n; i++)
    {
        X[i] = (float)log(X[i]);
    }
}
