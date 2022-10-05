// find of a range and update of a point
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int inf = 1e9 + 7;
vector<int> tree;

// find function recursively(primitive)
int find(int node, int node_low, int node_high, int range_low, int range_high)
{
    if (node_low >= range_low && node_high <= range_high)
    {
        return tree[node];
    }
    if (node_high < range_low || node_low > range_high)
    {
        return 0;
    }
    int left_child_right = (node_low + node_high) / 2;
    return find(2 * node, node_low, left_child_right, range_low, range_high) +
           find(2 * node + 1, left_child_right + 1, node_high, range_low, range_high);
}
// update fucntion iterative(primitive)
void update_iterative(int index, int n, int value)
{
    tree[n + index] += value;
    int parent = (n + index) / 2;
    for (int i = parent; i >= 1; i /= 2)
    {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
}

// update function recursively
void update_recursive(int node, int node_low, int node_high, int range_low, int range_high, int value)
{
    // this wil get active only in leaf condition
    if (node_low >= range_low && node_high <= range_high)
    {
        tree[node] += value;
        return;
    }
    if (node_high < range_low || node_low > range_high)
    {
        return;
    }
    int left_child_right = (node_low + node_high) / 2;
    update_recursive(2 * node, node_low, left_child_right, range_low, range_high, value);
    update_recursive(2 * node + 1, left_child_right + 1, node_high, range_low, range_high, value);

    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// function which updates and finds value as well
// if value == -1 which means we have to show output otherwise we have to update with value update
int find_update(int node, int node_low, int node_high, int range_low, int range_high, int value)
{
    if (node_low >= range_low && node_high <= range_high)
    {
        // update and show resut as well
        if (value != -1)
        {
            // update values
            tree[node] += value;
        }
        return tree[node];
    }
    if (node_high < range_low || node_low > range_high)
    {
        // just return 0 and there is no need to update or something..
        return 0;
    }
    int left_child_right = (node_low + node_high) / 2;
    // here we need to return sum and after calling for left and right we need to update tree[node] also .. so we will stor
    // left-right value(which we thought of returning) and return it in last
    int sum = find_update(2 * node, node_low, left_child_right, range_low, range_high, value) +
              find_update(2 * node + 1, left_child_right + 1, node_high, range_low, range_high, value);

    tree[node] = tree[2 * node] + tree[2 * node + 1];

    return sum;
}

void check_tree()
{
    cout << "check tree: " << endl;
    for (int i = 0; i < tree.size(); i++)
    {
        cout << tree[i] << " ";
    }
    cout << endl;
}

int main()
{

    vector<int> vec{2, 5, 8, 9, 10, 3, 4};
    int n = vec.size();
    while (__builtin_popcount(n) != 1)
    {
        n++;
    }
    tree.resize(2 * n);
    for (int i = 0; i < (int)vec.size(); i++)
    {
        tree[n + i] = vec[i];
    }
    for (int i = n - 1; i >= 1; i--)
    {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
    // check_tree();

    // update_recursive(1, 0, n-1, 3, 3, 11);

    // update_iterative(3, n, 11);

    // cout << "sum of value [0, 2] is: " << find(1, 0, n - 1, 0, 2) << endl;

    cout << "sum of value [0, 2] is: " << find_update(1, 0, n - 1, 0, 0, 3) << endl;
    check_tree();
    return 0;
}