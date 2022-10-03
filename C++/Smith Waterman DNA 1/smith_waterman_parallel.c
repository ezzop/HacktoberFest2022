#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include <omp.h>
#include "smith_waterman_helpers.h"

int MATCH = 2;
int MISMATCH = -1;
int SPACE = -1;

bool is_parallel( int m, int n, int start_i, int start_j, int new_score[m][n], int score[m][n]);
void calculate_element(int up, int diagonal, int left, int * score, int * pred);
void forward( char* x, char* y, int m, int n, int score[m][n], int pred[m][n], int *max_score_arr, int *max_row_arr, int *max_col_arr, int block_size, int num_stages, int num_teams, int num_threads );
void fixup( char* x, char* y, int m, int n, int score[m][n], int pred[m][n], int *max_score_arr, int *max_row_arr, int *max_col_arr, int block_size, int num_stages, int num_teams, int num_threads );
void backward( char* x, char* y, int m, int n, int score[m][n], int pred[m][n], int max_row, int max_col);
void smith_waterman(char* x, char* y);


bool is_parallel(int m, int n, int start_i, int start_j, int new_score[m][n], int score[m][n]) {
  bool parallel = true;
  for (int i = 0; start_j+i < n-1 && start_i - i > 1; i++) {
    if ((new_score[start_i-i][start_j+i] - score[start_i-i][start_j+i]) != (new_score[start_i-i][start_j+i] - score[start_i-i-1][start_j+i+1])) {
      parallel = false;
    }
    else {
      parallel = true;
    }
  }
  return parallel;
}


void calculate_element(int up, int diagonal, int left, int * score, int * pred) {
  // Set score & predecessor for current subproblem
  if ((max(0,max(diagonal,max(up,left)))) == 0) {
    *score = 0;
    *pred = 0;
  } else if (diagonal >= up && diagonal >= left) {
    *score = diagonal;
    *pred = 1;
  } else if (left >= diagonal && left >= up) {
    *score = left;
    *pred = 2;
  } else {
    *score = up;
    *pred = 3;
  }
}


void forward(
  char* x,
  char* y,
  int m,
  int n,
  int score[m][n],
  int pred[m][n],
  int *max_score_arr,
  int *max_row_arr,
  int *max_col_arr,
  int block_size,
  int num_stages,
  int num_teams,
  int num_threads
) {
  omp_set_num_threads(10);
  int max_threads = omp_get_max_threads();

#pragma omp parallel num_threads(max_threads)
  {
    int tid = omp_get_thread_num();
    int team_num = floor((num_teams/num_threads) * (tid/num_threads));
    int lp = team_num * block_size;
    int rp = lp + block_size;

    // Create arrays to store initial read values for up, diagonal, and left
    int up[n];
    int diagonal[n];
    int left[n];
    int start_row, start_col, curr_row, curr_col;

#pragma omp barrier
    for (int i = lp; i < rp; i++)
    {
      start_row = get_start_row(i,m);
      start_col = get_start_col(i,m);
      curr_row = start_row - (tid % num_threads);
      curr_col = start_col + (tid % num_threads);
#pragma omp barrier
      for (int j = 0; j < block_size; j++)
      {
        if (curr_col < n && curr_row > 0) {
          if (x[curr_row-1] == y[curr_col-1]) {
            diagonal[curr_col] = score[curr_row-1][curr_col-1] + MATCH;
          } else {
            diagonal[curr_col] = score[curr_row-1][curr_col-1] + MISMATCH;
          }
          up[curr_col] = score[curr_row-1][curr_col] + SPACE;
          left[curr_col] = score[curr_row][curr_col-1] + SPACE;
          curr_col += num_threads;
          curr_row -= num_threads;
        }
      }
      curr_row = start_row - (tid % num_threads);
      curr_col = start_col + (tid % num_threads);
#pragma omp barrier
      for (int j = 0; j < block_size; j++) {
        if (curr_col < n && curr_row > 0) {
          calculate_element(up[curr_col],diagonal[curr_col],left[curr_col],&score[curr_row][curr_col],&pred[curr_row][curr_col]);
          if (score[curr_row][curr_col] > max_score_arr[tid]) {
            max_score_arr[tid] = score[curr_row][curr_col];
            max_row_arr[tid] = curr_row;
            max_col_arr[tid] = curr_col;
          }
          curr_col += num_threads;
          curr_row -= num_threads;
        }
      }
    }
  }
}


void fixup(
  char* x,
  char* y,
  int m,
  int n,
  int score[m][n],
  int pred[m][n],
  int *max_score_arr,
  int *max_row_arr,
  int *max_col_arr,
  int block_size,
  int num_stages,
  int num_teams,
  int num_threads
) {
  int max_threads = omp_get_max_threads();
  bool converged = false;
  bool conv[num_teams];
  for (int i = 1; i < num_teams; i++) {
    conv[i] = false;
  }

  int new_score[m][n];
  int new_pred[m][n];

  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      new_score[i][j] = 0;
      new_pred[i][j] = 0;
    }
  }

  do {
    #pragma omp parallel
    {
      int tid = omp_get_thread_num();
      int team_num = floor((num_teams/num_threads) * (tid/num_threads));
      int lp = team_num * block_size + block_size;
      int rp = lp + block_size;
      int up[n];
      int diagonal[n];
      int left[n];
      int start_row, start_col, curr_row, curr_col;
      bool parallel = false;
      #pragma omp barrier
      for (int i = lp; i < rp; i++)
      {
        start_row = get_start_row(i,m);
        start_col = get_start_col(i,m);
        curr_row = start_row - (tid % num_threads);
        curr_col = start_col + (tid % num_threads);
      #pragma omp barrier
        for (int j = 0; j < block_size; j++)
        {
          if (curr_col < n && curr_row > 0) {
            if (x[curr_row-1] == y[curr_col-1]) {
              diagonal[curr_col] = score[curr_row-1][curr_col-1] + MATCH;
            } else {
              diagonal[curr_col] = score[curr_row-1][curr_col-1] + MISMATCH;
            }
            up[curr_col] = score[curr_row-1][curr_col] + SPACE;
            left[curr_col] = score[curr_row][curr_col-1] + SPACE;
            curr_col += num_threads;
            curr_row -= num_threads;
          }
        }
        curr_row = start_row - (tid % num_threads);
        curr_col = start_col + (tid % num_threads);
        #pragma omp barrier
        for (int j = 0; j < block_size; j++) {
          if (curr_col < n && curr_row > 0) {
            calculate_element(up[curr_col],diagonal[curr_col],left[curr_col],&new_score[curr_row][curr_col],&new_pred[curr_row][curr_col]);
            if (new_score[curr_row][curr_col] > max_score_arr[tid]) {
              max_score_arr[tid] = new_score[curr_row][curr_col];
              max_row_arr[tid] = curr_row;
              max_col_arr[tid] = curr_col;
            }
            curr_col += num_threads;
            curr_row -= num_threads;
          }
        }
        #pragma omp barrier
        parallel = is_parallel(m,n,start_row,start_col,new_score,score);
        if (parallel) {
          conv[i] = true;
          break;
        }
        copy_new_soln(m,n,start_row,start_col,new_score,new_pred,score,pred);
      }
    }
    converged = true;
    for (int i = 1; i < num_threads; i++) {
      if (!conv[i]) {
        converged = false;
        break;
      }
    }
  } while (converged);
}


void backward(
  char* x,
  char* y,
  int m,
  int n,
  int score[m][n],
  int pred[m][n],
  int max_row,
  int max_col
) {
  int char_n = 0;
  char x_res[m+n-1];
  char y_res[m+n-1];
  int i = max_row;
  int j = max_col;
  // Keep tracing back from element with max_score until we hit a 0
  while (pred[i][j] != 0) {
    switch(pred[i][j]) {
      case 1: // diagonal
        x_res[char_n] = x[i-1];
        y_res[char_n] = y[j-1];
        i--;
        j--;
        break;
      case 2: // left
        x_res[char_n] ='-';
        y_res[char_n] = y[j-1];
        j--;
        break;
      case 3: // up
        x_res[char_n] = x[i-1];
        y_res[char_n] = '-';
        i--;
        break;
    }
    char_n++;

  }
  printf("Local alignment for reference: ");
  print_reverse(x_res,char_n);
  printf("Local alignment for query: ");
  print_reverse(y_res,char_n);
}

void smith_waterman(char* x, char* y) {
  int m = strlen(x) + 1;
  int n = strlen(y) + 1;
  int score[m][n];
  int pred[m][n];
  int num_cores = 8;

  int *max_score_arr = (int *)malloc(sizeof(int)*num_cores);
  int *max_row_arr = (int *)malloc(sizeof(int)*num_cores);
  int *max_col_arr = (int *)malloc(sizeof(int)*num_cores);

  // Initialize matrices
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      score[i][j] = 0;
      pred[i][j] = 0;
    }
  }
  int num_teams = 1; 
  int num_threads = 100; 
  int num_stages = get_num_of_stages(m,n);
  int block_size = (int)ceil((float)num_stages / num_teams);
  forward(x,y,m,n,score,pred,max_score_arr,max_row_arr,max_col_arr,block_size,num_stages,num_teams,num_threads);
  fixup(x,y,m,n,score,pred,max_score_arr,max_row_arr,max_col_arr,block_size,num_stages,num_teams-1,num_threads);
  int max_row = 0;
  int max_col = 0;
  int max_score = 0;
  for (int i = 0; i < num_cores; i++) {
    if (max_score_arr[i] >= max_score) {
      max_row = max_row_arr[i];
      max_col = max_col_arr[i];
    }
  }
  printf("===========================================================\n"
         "RESULTS\n"
         "===========================================================\n");
  backward(x,y,m,n,score,pred,max_row,max_col);
}

int main() {
  srand(time(NULL));
  int ref_len,query_len;
  printf("===========================================================\n"
         "SMITH WATERMAN LTDP PARALLEL ALGORITHM\n");
  printf("Computing the local alignment for two random DNA sequences.\n");
  printf("===========================================================\n");
  printf("Enter the string size for the reference string: ");
  scanf("%d",&ref_len);
  printf("Enter the string size for the query string: ");
  scanf("%d",&query_len);
  char* ref = generate_sequence(ref_len);
  char* query = generate_sequence(query_len);
  printf("Reference string: %s\nQuery string: %s\n",ref,query);
  
  smith_waterman(ref,query);
  return 0;
}
