---
description: Searching - linear (sequential) search and binary search with algorithms, worked examples, C programs and complexities, the linear vs binary search comparison, and other searching algorithms such as jump search and interpolation search.
updated: 2026-11-02
---

## Linear Search {#linear-search}

**Searching** is the process of finding whether a given element (the **key**) is present in a collection of data and, if it is, finding its position.

A search is **successful** if the key is found and **unsuccessful** otherwise.

**Linear search** (also called **sequential search**) checks the elements **one by one from the beginning** until the key is found or the list ends. The data **does not need to be sorted**.

### Algorithm

To search for `key` in array `A[0 … n−1]`:

1. Set `i = 0`.
2. If `A[i] = key`, the search is successful: return `i`.
3. Otherwise, set `i = i + 1`.
4. If `i < n`, go to step 2.
5. If the whole array has been checked without a match, the search is unsuccessful: return −1.

### Example

Search for **47** in `A = [34, 10, 66, 27, 47, 52]`:

| Step | Index i | A[i] | A[i] = 47? |
| --- | --- | --- | --- |
| 1 | 0 | 34 | No |
| 2 | 1 | 10 | No |
| 3 | 2 | 66 | No |
| 4 | 3 | 27 | No |
| 5 | 4 | 47 | **Yes** → found at index 4 |

The key was found after **5 comparisons**.

### Program

```c
#include <stdio.h>

int linearSearch(int a[], int n, int key)
{
    for (int i = 0; i < n; i++)
        if (a[i] == key)
            return i;          /* found */
    return -1;                 /* not found */
}

int main(void)
{
    int a[] = {34, 10, 66, 27, 47, 52};
    int n = sizeof(a) / sizeof(a[0]);

    printf("47 found at index %d\n", linearSearch(a, n, 47));
    printf("99 found at index %d\n", linearSearch(a, n, 99));
    return 0;
}
```

Output:

```text
47 found at index 4
99 found at index -1
```

### Complexity

| Case | When it happens | Comparisons | Time |
| --- | --- | --- | --- |
| Best case | The key is the **first** element | 1 | **O(1)** |
| Average case | The key is somewhere in the middle | about n/2 | **O(n)** |
| Worst case | The key is the **last** element or **not present** | n | **O(n)** |

**Space complexity:** O(1) (only a loop variable is needed).

### Advantages and Disadvantages

**Advantages:**

1. Simple to understand and implement.
2. Works on **unsorted** data; no preprocessing is needed.
3. Works on any sequential structure, such as a **linked list**, where elements can only be visited one after another.
4. Efficient for **small** data sets.

**Disadvantage:** slow for large data sets, because in the worst case **every element** must be checked (O(n)).

## Binary Search {#binary-search}

**Binary search** (also called **half-interval search**) is a searching algorithm that finds a key in a **sorted** array by repeatedly **dividing the search range in half**.

It compares the key with the **middle element**:

1. If they are equal, the search is successful.
2. If the key is **smaller**, the search continues in the **left half**.
3. If the key is **larger**, the search continues in the **right half**.

Each comparison discards half of the remaining elements. Binary search follows the **divide and conquer** technique.

**Preconditions:**

1. The array must be **sorted**.
2. Any element must be accessible directly in constant time (an **array**, not a linked list).

### Algorithm

To search for `key` in sorted array `A[0 … n−1]`:

1. Set `low = 0` and `high = n − 1`.
2. While `low ≤ high`:
   1. `mid = (low + high) / 2` (integer division; `low + (high − low) / 2` avoids overflow for very large indices).
   2. If `A[mid] = key`, return `mid` (found).
   3. If `key < A[mid]`, set `high = mid − 1` (search the left half).
   4. If `key > A[mid]`, set `low = mid + 1` (search the right half).
3. If `low > high`, the key is not present: return −1.

### Example

Search for **31** in the sorted array:

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 10 | 14 | 19 | 26 | 27 | 31 | 33 | 35 | 42 | 44 |

| Step | low | high | mid | A[mid] | Decision |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 9 | 4 | 27 | 31 > 27 → search the right half: low = 5 |
| 2 | 5 | 9 | 7 | 35 | 31 < 35 → search the left half: high = 6 |
| 3 | 5 | 6 | 5 | 31 | **Found** at index 5 |

The key was found after **3 comparisons**; linear search would need 6.

### Program

**Iterative version:**

```c
#include <stdio.h>

int binarySearch(int a[], int n, int key)
{
    int low = 0, high = n - 1;
    while (low <= high)
    {
        int mid = low + (high - low) / 2;
        if (a[mid] == key)
            return mid;            /* found */
        else if (key < a[mid])
            high = mid - 1;        /* left half */
        else
            low = mid + 1;         /* right half */
    }
    return -1;                     /* not found */
}

int main(void)
{
    int a[] = {10, 14, 19, 26, 27, 31, 33, 35, 42, 44};
    int n = sizeof(a) / sizeof(a[0]);

    printf("31 found at index %d\n", binarySearch(a, n, 31));
    printf("20 found at index %d\n", binarySearch(a, n, 20));
    return 0;
}
```

Output:

```text
31 found at index 5
20 found at index -1
```

**Recursive version:**

```c
#include <stdio.h>

int binarySearchRec(int a[], int low, int high, int key)
{
    if (low > high)
        return -1;                                      /* not found */
    int mid = low + (high - low) / 2;
    if (a[mid] == key)
        return mid;
    if (key < a[mid])
        return binarySearchRec(a, low, mid - 1, key);   /* left half */
    return binarySearchRec(a, mid + 1, high, key);      /* right half */
}

int main(void)
{
    int a[] = {10, 14, 19, 26, 27, 31, 33, 35, 42, 44};
    printf("42 found at index %d\n", binarySearchRec(a, 0, 9, 42));
    return 0;
}
```

Output: `42 found at index 8`

### Complexity

After each comparison, the search range is halved: n → n/2 → n/4 → … → 1. After k steps the range is n / 2^k, which becomes 1 when **k = log₂ n**. So the number of comparisons is at most **⌊log₂ n⌋ + 1**.

| Case | When it happens | Time |
| --- | --- | --- |
| Best case | The key is the **middle** element | **O(1)** |
| Average case | — | **O(log n)** |
| Worst case | The key is found when one element remains, or is not present | **O(log n)** |

**Space complexity:** O(1) for the iterative version; O(log n) for the recursive version (the recursion stack).

**Example:** for n = 1,000 elements, binary search needs at most ⌊log₂ 1000⌋ + 1 = **10** comparisons, while linear search may need 1,000.

### Advantages and Disadvantages

**Advantages:**

1. Very fast for large data: **O(log n)**.
2. The iterative version needs only O(1) extra space.

**Disadvantages:**

1. Works only on **sorted** data (unsorted data must first be sorted).
2. Needs direct (random) access to the middle element, so it is **not suitable for linked lists**.
3. More complex than linear search.

### Applications

1. Searching in sorted arrays, dictionaries and symbol tables.
2. Finding the first or last occurrence of a value, or the closest value, in sorted data.
3. Database indexing (for example, B-trees).
4. Finding the commit that introduced a bug in version control (`git bisect`).
5. Narrowing the search space in optimisation problems.

### Differences Between Linear Search and Binary Search

| Basis | Linear Search | Binary Search |
| --- | --- | --- |
| Other name | Sequential search | Half-interval search |
| Input data | Need **not** be sorted | Must be **sorted** |
| Method | Checks elements one by one | Compares with the middle element and halves the range |
| Comparisons | **Equality** comparisons (=) | **Ordering** comparisons (<, >) |
| Best case | O(1) | O(1) |
| Worst case time | **O(n)** | **O(log n)** |
| Data structure | Arrays (also multidimensional) and linked lists | Single-dimensional arrays (random access needed) |
| Complexity of the algorithm | Less complex (simple) | More complex |
| Speed | Slow for large data | Very fast |
| Suitable for | Small or unsorted data | Large sorted data |

## Searching Algorithms {#searching-algorithms}

**Searching algorithms** are methods used to **locate a specific item** in a collection of data.

They are classified into two groups:

1. **Sequential search:** the elements are checked **one by one**; the data need not be sorted (for example, linear search).
2. **Interval search:** the data must be **sorted**; the algorithm repeatedly narrows down an **interval** that may contain the key (for example, binary, jump, interpolation, exponential and Fibonacci search).

The main searching algorithms are:

1. Linear search
2. Sentinel linear search
3. Binary search
4. Meta binary search
5. Ternary search
6. Jump search
7. Interpolation search
8. Exponential search
9. Fibonacci search

### Jump Search

**Jump search** works on a **sorted** array. It jumps ahead in **fixed-size blocks** of m elements, checking A[0], A[m], A[2m], …, until it finds an element **greater than or equal to the key**. It then steps back to the previous block and performs a **linear search** inside that block.

1. Worst case: about n/m jumps + (m − 1) comparisons; this is smallest when the **block size m = √n**.
2. Time complexity: **O(√n)**; space O(1).
3. It is faster than linear search (O(n)) but slower than binary search (O(log n)).
4. It moves **backward only once**, which helps when moving backward is costly.

**Example:** for n = 16, the block size is √16 = 4, so jump search checks A[0], A[4], A[8], A[12] and then searches linearly inside one block.

### Interpolation Search

**Interpolation search** is an improvement of binary search, for a **sorted** array whose values are **uniformly distributed**, that **estimates the position** of the key from its value instead of always checking the middle.

Instead of always checking the middle, it **estimates the position** of the key from its value, as a person does when looking up a word in a dictionary:

```text
pos = low + ((key − A[low]) × (high − low)) / (A[high] − A[low])
```

1. If `A[pos] = key`, the search is successful.
2. If `key < A[pos]`, search the left part; otherwise, search the right part.
3. The search continues only while `A[low] ≤ key ≤ A[high]`.

**Example:** A = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], key = 70, low = 0, high = 9:

pos = 0 + ((70 − 10) × (9 − 0)) / (100 − 10) = 540 / 90 = **6**, and A[6] = 70, so the key is found in **one** step.

**Complexity:** average **O(log log n)** (for uniformly distributed data); worst case **O(n)**.

### Exponential Search

**Exponential search** works on a **sorted** array. It first finds a **range** that contains the key by checking the elements at indexes 1, 2, 4, 8, … (doubling each time) until it reaches an element **greater than the key** (or the end of the array); then it runs a **binary search** inside that range.

**Example:** A = [6, 11, 19, 24, 33, 54, 67, 81, 94, 99], key = 81.

1. A[0] = 6 ≠ 81; check A[1] = 11, A[2] = 19, A[4] = 33 — all less than 81.
2. A[8] = 94 > 81 → the key lies between indexes 4 and 8.
3. Binary search in A[4 … 8] finds 81 at **index 7**.

**Complexity:** **O(log i)**, where i is the position of the key (O(log n) in the worst case); O(1) space. It is useful for very large or **unbounded** lists, because it does not need to know the size first.

### Fibonacci Search

**Fibonacci search** works on a **sorted** array and divides the range using **Fibonacci numbers** (1, 1, 2, 3, 5, 8, 13, …) instead of halves.

1. Find the smallest Fibonacci number **F(m) ≥ n**; keep the two before it, F(m−1) and F(m−2). Set offset = −1.
2. While F(m) > 1: compare the key with A[i], where **i = min(offset + F(m−2), n − 1)**.
   1. If A[i] < key: discard the left part — offset = i, and move **one** Fibonacci step down (F(m) ← F(m−1)).
   2. If A[i] > key: discard the right part — move **two** Fibonacci steps down (F(m) ← F(m−2)).
   3. If A[i] = key: found.

**Example:** A = [12, 14, 16, 17, 20, 24, 31, 43, 50, 62] (n = 10), key = 24. The smallest Fibonacci number ≥ 10 is 13 (with 8 and 5 before it).

| Step | F(m), F(m−1), F(m−2) | Offset | i | A[i] | Decision |
| --- | --- | --- | --- | --- | --- |
| 1 | 13, 8, 5 | −1 | min(−1 + 5, 9) = 4 | 20 | 20 < 24 → offset = 4, step down one |
| 2 | 8, 5, 3 | 4 | min(4 + 3, 9) = 7 | 43 | 43 > 24 → step down two |
| 3 | 3, 2, 1 | 4 | min(4 + 1, 9) = 5 | 24 | **Found at index 5** |

**Complexity:** **O(log n)** time, O(1) space. It uses only addition and subtraction to compute the probe positions (no division).

### Comparison of Searching Algorithms

| Algorithm | Data must be sorted? | Best case | Average case | Worst case | Space |
| --- | --- | --- | --- | --- | --- |
| Linear search | No | O(1) | O(n) | O(n) | O(1) |
| Binary search | Yes | O(1) | O(log n) | O(log n) | O(1) iterative |
| Jump search | Yes | O(1) | O(√n) | O(√n) | O(1) |
| Interpolation search | Yes (uniformly distributed values) | O(1) | O(log log n) | O(n) | O(1) |
| Exponential search | Yes | O(1) | O(log i) | O(log n) | O(1) |
| Fibonacci search | Yes | O(1) | O(log n) | O(log n) | O(1) |

Performance order on large sorted data: **binary search > jump search > linear search**.

## References {#references}

**TutorialsPoint**

- [Searching Algorithms](https://www.tutorialspoint.com/data_structures_algorithms/searching_algorithms.htm) — accessed 2026-11-02
- [Exponential Search](https://www.tutorialspoint.com/data_structures_algorithms/exponential_search.htm) — accessed 2026-11-02
- [Fibonacci Search](https://www.tutorialspoint.com/data_structures_algorithms/fibonacci_search.htm) — accessed 2026-11-02
- [Linear Search Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/linear_search_algorithm.htm) — accessed 2026-11-01
- [Binary Search Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Searching Algorithms](https://www.geeksforgeeks.org/dsa/searching-algorithms/) — accessed 2026-11-01
- [Linear Search Algorithm](https://www.geeksforgeeks.org/dsa/linear-search/) — accessed 2026-11-01
- [Binary Search Algorithm](https://www.geeksforgeeks.org/dsa/binary-search/) — accessed 2026-11-01
- [Linear Search vs Binary Search](https://www.geeksforgeeks.org/dsa/linear-search-vs-binary-search/) — accessed 2026-11-01
- [Jump Search](https://www.geeksforgeeks.org/dsa/jump-search/) — accessed 2026-11-01
- [Interpolation Search](https://www.geeksforgeeks.org/dsa/interpolation-search/) — accessed 2026-11-01

**TpointTech**

- [Linear Search](https://www.tpointtech.com/linear-search) — accessed 2026-11-02
- [Binary Search](https://www.tpointtech.com/binary-search) — accessed 2026-11-01

**Programiz**

- [Linear Search](https://www.programiz.com/dsa/linear-search) — accessed 2026-11-01
- [Binary Search](https://www.programiz.com/dsa/binary-search) — accessed 2026-11-01
