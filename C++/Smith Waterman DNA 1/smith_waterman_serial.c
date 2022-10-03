#include <stdio.h>
#include <string.h>
#include <time.h>
#include<stdlib.h>
#include<sys/wait.h>
#include<unistd.h>
#include "smith_waterman_helpers.h"


int MATCH = 2;
int MISMATCH = -1;
int SPACE = -1;


void front(char* x, char* y, int x_len, int y_len, int score[x_len+1][y_len+1], int pred[x_len+1][y_len+1], int* max_row, int* max_col);
void sw_back(char* x, char* y, int x_len, int y_len, int score[x_len+1][y_len+1], int pred[x_len+1][y_len+1], int* max_row, int* max_col);


void front(
  char* x,
  char* y,
  int x_len,
  int y_len,
  int score[x_len+1][y_len+1],
  int pred[x_len+1][y_len+1],
  int* max_row,
  int* max_col
) {
  int i,j;
  int diagonal, left, up;
  int max_score = 0;
  *max_row = 0;
  *max_col = 0;
  // Initialize the first row and first column of matrix to 0
  for (i=0; i<=x_len; i++) {
    for (j=0; j<=y_len; j++) {
      score[i][j]=0;
      pred[i][j]=0;
    }
  }

  // Fill out matrices
  for (i=1; i<=x_len; i++) {
    for (j=1; j<=y_len; j++) {
      // Calculate diagonal, up, and left
      if (x[i-1] == y[j-1]) {
        diagonal = score[i-1][j-1] + MATCH;
      } else {
        diagonal = score[i-1][j-1] + MISMATCH;
      }
      up = score[i-1][j] + SPACE;
      left = score[i][j-1] + SPACE;
      // Set score & predecessor for current subproblem
      if ((max(0,max(diagonal,max(up,left)))) == 0) {
        score[i][j] = 0;
        pred[i][j] = 0;
      } else if (diagonal >= up && diagonal >= left) {
        score[i][j] = diagonal;
        pred[i][j] = 1;
      } else if (left >= diagonal && left >= up) {
        score[i][j] = left;
        pred[i][j] = 2;
      } else {
        score[i][j] = up;
        pred[i][j] = 3;
      }

      // Update max if needed
      if (score[i][j] > max_score) {
        max_score = score[i][j];
        *max_row = i;
        *max_col = j;
      }
    }
  }
}


void sw_back(
  char* x,
  char* y,
  int x_len,
  int y_len,
  int score[x_len+1][y_len+1],
  int pred[x_len+1][y_len+1],
  int* max_row,
  int* max_col
) {
  int char_n = 0;
  int i = *max_row;
  int j = *max_col;
  char x_res[x_len+y_len+1];
  char y_res[x_len+y_len+1];
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

int main(int argc, const char* argv[]) {
  srand(time(NULL));
  int ref_len,query_len;
  printf("===========================================================\n"
         "SMITH WATERMAN SERIAL ALGORITHM\n");
  printf("Computing the local alignment for two random DNA sequences.\n");
  printf("===========================================================\n");
  printf("Enter the string size for the reference string: ");
  scanf("%d",&ref_len);
  printf("Enter the string size for the query string: ");
  scanf("%d",&query_len);
  char* ref = generate_sequence(ref_len);
  char* query = generate_sequence(query_len);
  printf("Reference string: %s\nQuery string: %s\n",ref,query);
  int score[ref_len+1][query_len+1];
  int pred[ref_len+1][query_len+1];
  int max_row;
  int max_col;
  front(ref, query, ref_len, query_len, score, pred, &max_row, &max_col);
  printf("===========================================================\n"
         "RESULTS\n"
         "===========================================================\n");
  sw_back(ref, query, ref_len, query_len, score, pred, &max_row, &max_col);
  return 0;
}
