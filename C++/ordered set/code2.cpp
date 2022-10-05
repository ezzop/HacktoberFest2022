// code using segment tree
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int inf = 1e9 + 7;
vector<int> tree;

// find by order function
int find_byord(int current_node, int node_left, int node_right, int k)
{
    if (node_left == node_right)
    {
        return current_node;
    }
    int value_left = tree[2 * current_node], value_right = tree[2 * current_node + 1];
    int left_child_right = (node_left + node_right) / 2;
    if (value_left < k)
    {
        // going to right side
        return find_byord(2 * current_node + 1, left_child_right + 1, node_right, k - value_left);
    }
    // going to left side
    return find_byord(2 * current_node, node_left, left_child_right, k);
}

int orde_key(int current_node, int node_left, int node_right, int range_left, int range_right)
{
    if (node_right < range_left || node_left > range_right)
    {
        return 0;
    }
    if (node_left >= range_left && node_right <= range_right)
    {
        return tree[current_node];
    }
    int left_child_right = (node_left + node_right) / 2;
    return orde_key(2 * current_node, node_left, left_child_right, range_left, range_right) +
           orde_key(2 * current_node + 1, left_child_right + 1, node_right, range_left, range_right);
}

void update(int index, int n)
{
    tree[n + index] = 0;
    int parent = (n + index) / 2;
    for (int i = parent; i >= 1; i /= 2)
    {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
    return;
}

void func()
{
    // for now we are taking values in a certain range like {0, k};
    vector<int> vec{8, 1, 0, 3, 9, 10, 7};
    int n = 1;
    for (int i = 0; i < vec.size(); i++)
    {
        n = max(n, vec[i] + 1);
    }
    while (__builtin_popcount(n) != 1)
    {
        n++;
    }
    tree.resize(2 * n);
    for (int i = 0; i < vec.size(); i++)
    {
        if (tree[n + vec[i]] >= 1)
        {
            // because in ordered set we will take value only once .. so here if the value is considered before
            // we wont consider it again
            continue;
        }
        // insert function
        tree[n + vec[i]]++;
    }
    for (int i = n - 1; i >= 1; i--)
    {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }

    //  find by order(k) ... note that in ordered set we count k from 0 but here it will be from 1
    cout << "FIND BY ORDER FOR 4TH VALUE : " << find_byord(1, 0, n - 1, 4) - n << endl;

    // // order of key(k) .. values which are less than key
    int value = 8;
    cout << "VALUES WHICH ARE LESS THAN 8: " << orde_key(1, 0, n - 1, 0, value - 1) << endl;

    // remove function ... lets remove 7
    update(7, n);

    //  find by order(k) ... note that in ordered set we count k from 0 but here it will be from 1
    cout << "FIND BY ORDER FOR 4TH VALUE : " << find_byord(1, 0, n - 1, 4) - n << endl;

    // // order of key(k) .. values which are less than key
    value = 8;
    cout << "VALUES WHICH ARE LESS THAN 8: " << orde_key(1, 0, n - 1, 0, value - 1) << endl;

    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    cin.exceptions(cin.failbit);
    // clock_t start = clock();

    func();

    // clock_t end = clock();
    // double elapsed = double(end - start) / CLOCKS_PER_SEC;
    // printf('Time measured: %.4f seconds.', elapsed);
    return 0;
}

/*

some data for find by order function

we will check whether the number we are searching will lie on left or right
if it lies on left then we will directly call the function i.e func(k) -> func(k)
if it lies on right then we decrease the value on left because the number we are searching will change
now func(k) -> func(k - value_on_left);


*/