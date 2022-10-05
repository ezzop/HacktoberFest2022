One nice blog to practice segment trees is : https://codeforces.com/blog/entry/22616

This code is about segment trees which are used for range queries
In these types of problems we can find sum and update a particular value in O(logn)
these can be used for maximum, minimum, xor, sum ...

update - point, find - range  -> do update for one point
update - range, find - point -> do update kind of function for finding
update - range, find - range  -> lazy propagation


update function can be done iteratively or recursively or we can do update&finding in one function also...

1. code for finding sum of range and updating one value. https://cses.fi/problemset/task/1649
2. Code for finding value at one index and updating a range(just opposite of first one).https://cses.fi/problemset/task/1651
3. Code for finding value of a range and updating a range(lazy propagation).
    https://www.spoj.com/problems/HORRIBLE/
    https://lightoj.com/problem/horrible-queries


one nice topcoder blog about lazy propagation is:
https://www.topcoder.com/thrive/articles/range-operations-lazy-propagation#:~:text=Lazy%20propagation%20is%20a%20range,will%20avoid%20the%20repeated%20sharing.

and one nice video for basics of lazy propagation is: 
https://www.youtube.com/watch?v=CjX25pq6-SY