// code using ordered_set
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int inf = 1e9 + 7;
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
template <typename T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
typedef pair<int, int> pii;

void func()
{
    vector<int> vec{8, 1, 0, 3, 9, 10, 7, 1};
    ordered_set<int> s;
    // insert function demo
    for (int i = 0; i < vec.size(); i++)
    {
        s.insert(vec[i]);
    }

    // check elements of set
    cout << "CHECK ALL ELEMENTS: " << endl;
    for (auto x : s)
    {
        cout << x << " ";
    }
    cout << endl;

    // find by order function
    cout << "CHECK 1ST ELEMENT: " << *(s.find_by_order(3)) << endl;

    // order of key function
    cout << "VALUES LESS THAN 8: " << s.order_of_key(8) << endl;

    // erase function

    s.erase(7);

    // check elements of set
    cout << "CHECK ALL ELEMENTS: " << endl;
    for (auto x : s)
    {
        cout << x << " ";
    }
    cout << endl;

    // find by order function
    cout << "CHECK 1ST ELEMENT: " << *(s.find_by_order(3)) << endl;

    // order of key function
    cout << "VALUES LESS THAN 8: " << s.order_of_key(8) << endl;

    // erase function

    s.erase(7);
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