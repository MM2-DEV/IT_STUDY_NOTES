---
description: Divide and conquer - the divide, conquer and combine steps, characteristics, examples and the max-min problem, quick sort and merge sort as divide-and-conquer algorithms, and their proofs of correctness and run-time analysis with recurrences.
updated: 2026-11-02
---

## Divide and Conquer Design Technique {#divide-and-conquer-design-technique}

### Definition

**Divide and conquer** is an algorithm design technique that solves a problem by **breaking it into smaller sub-problems of the same type**, solving the sub-problems **recursively**, and **combining** their solutions into the solution of the original problem.

It works best when the sub-problems are **independent** (do not overlap); when they overlap, dynamic programming is used instead.

### The Three Steps

1. **Divide:** split the problem into smaller sub-problems (usually of equal size), each a smaller instance of the same problem.
2. **Conquer:** solve each sub-problem **recursively**; when a sub-problem is small enough (the **base case**), solve it directly.
3. **Combine (merge):** combine the solutions of the sub-problems to get the solution of the whole problem.

```text
DAndC(P)
1. if P is small enough then
2.     return the direct solution of P
3. divide P into sub-problems P1, P2, ..., Pa
4. solve each: S1 ← DAndC(P1), ..., Sa ← DAndC(Pa)
5. return COMBINE(S1, S2, ..., Sa)
```

### Run Time

If a problem of size n is divided into **a** sub-problems of size **n/b**, and dividing plus combining costs **f(n)**, the running time is given by the recurrence

```text
T(n) = a·T(n/b) + f(n)
```

which is usually solved with the **master theorem** (see [Techniques for Analysis of Algorithms](/topics/data-structures-algorithms/algorithm-design-and-analysis#techniques-for-analysis-of-algorithms)).

### Examples of Divide and Conquer Algorithms

| Algorithm | Divide | Combine | Time |
| --- | --- | --- | --- |
| **Binary search** | Compare with the middle; keep **one** half | Nothing | O(log n) |
| **Merge sort** | Two equal halves | **Merge** the sorted halves | O(n log n) |
| **Quick sort** | **Partition** around a pivot | Nothing (already in place) | O(n log n) average, O(n²) worst |
| **Max-min problem** | Two halves | Compare the two maxima and the two minima | 3n/2 − 2 comparisons |
| **Strassen's matrix multiplication** | Four n/2 × n/2 blocks; 7 multiplications instead of 8 | Add and subtract the products | O(n^(log₂ 7)) ≈ O(n^2.81) |
| **Karatsuba multiplication** (large integers) | Split each number into halves; 3 multiplications instead of 4 | Add the products | O(n^(log₂ 3)) ≈ O(n^1.59) |
| **Closest pair of points** | Split the points by a vertical line | Check pairs near the line | O(n log n) |
| **Fast Fourier Transform (Cooley–Tukey)** | Even and odd terms | Combine with twiddle factors | O(n log n) |
| **Tower of Hanoi** | Move n − 1 discs, then the largest, then n − 1 discs | — | O(2ⁿ) |

### Example: The Max-Min Problem

**Problem:** find both the **maximum** and the **minimum** of an array of n elements.

1. **Naive method:** scan the array, comparing each element with the current max and the current min: **2(n − 1) = 2n − 2** comparisons.
2. **Divide and conquer:**
   1. If the part has **one** element, it is both the max and the min (0 comparisons).
   2. If it has **two** elements, **one** comparison gives the max and the min.
   3. Otherwise, **divide** it into two halves, find the max and min of each half recursively, and **combine** with **2 comparisons** (larger of the two maxima, smaller of the two minima).

Recurrence: T(n) = T(⌊n/2⌋) + T(⌈n/2⌉) + 2, with T(2) = 1 and T(1) = 0. For **n a power of 2**, this gives **T(n) = 3n/2 − 2** comparisons — about 25% fewer than the naive method. Both methods are O(n).

**Derivation** (n a power of 2, so T(n) = 2T(n/2) + 2):

```text
T(n) = 2T(n/2) + 2
     = 2[2T(n/4) + 2] + 2          = 4T(n/4) + 4 + 2
     = 8T(n/8) + 8 + 4 + 2
     ...
     = 2^i · T(n/2^i) + (2^i + 2^(i−1) + … + 2)
     = 2^i · T(n/2^i) + 2(2^i − 1)
```

The expansion stops when n/2^i = 2, that is 2^i = n/2. Using T(2) = 1:

T(n) = (n/2)·1 + 2(n/2 − 1) = n/2 + n − 2 = **3n/2 − 2**.

**Check for n = 8:** T(2) = 1, T(4) = 2·1 + 2 = 4, T(8) = 2·4 + 2 = **10** = 3·8/2 − 2, while the naive method needs 2·8 − 2 = 14.

```c
#include <stdio.h>

int comparisons = 0;

void maxMin(int a[], int lo, int hi, int *max, int *min)
{
    if (lo == hi) { *max = *min = a[lo]; return; }          /* one element */
    if (hi == lo + 1)                                       /* two elements */
    {
        comparisons++;
        if (a[lo] > a[hi]) { *max = a[lo]; *min = a[hi]; }
        else               { *max = a[hi]; *min = a[lo]; }
        return;
    }
    int mid = (lo + hi) / 2, max1, min1, max2, min2;
    maxMin(a, lo, mid, &max1, &min1);                      /* conquer left */
    maxMin(a, mid + 1, hi, &max2, &min2);                  /* conquer right */
    comparisons += 2;                                       /* combine */
    *max = (max1 > max2) ? max1 : max2;
    *min = (min1 < min2) ? min1 : min2;
}

int main(void)
{
    int a[] = {22, 13, -5, -8, 15, 60, 17, 31}, max, min;
    maxMin(a, 0, 7, &max, &min);
    printf("Max = %d, Min = %d, comparisons = %d\n", max, min, comparisons);
    return 0;
}
```

Output: `Max = 60, Min = -8, comparisons = 10` (for n = 8: 3 × 8/2 − 2 = 10, while the naive method needs 14).

### Example: Strassen's Matrix Multiplication

Multiplying two n × n matrices in the ordinary way takes n³ scalar multiplications (O(n³)). Dividing each matrix into four n/2 × n/2 blocks,

```text
X = | A  B |      Y = | E  F |      X·Y = | C11  C12 |
    | C  D |          | G  H |            | C21  C22 |
```

the ordinary block method needs **8** block multiplications: T(n) = 8T(n/2) + O(n²) = **O(n³)** (master theorem, case 1). **Strassen's method** (Volker Strassen, 1969) needs only **7**:

```text
M1 = (A + D)(E + H)        M5 = (A + B) H
M2 = (C + D) E             M6 = (C − A)(E + F)
M3 = A (F − H)             M7 = (B − D)(G + H)
M4 = D (G − E)

C11 = M1 + M4 − M5 + M7    C12 = M3 + M5
C21 = M2 + M4              C22 = M1 − M2 + M3 + M6
```

So T(n) = 7T(n/2) + O(n²) = **O(n^(log₂ 7)) ≈ O(n^2.81)** (master theorem, case 1, since n^(log₂ 7) grows faster than n²).

**Numerical check (2 × 2 matrices):** X = [[12, 34], [22, 10]], Y = [[3, 4], [2, 1]]: M1 = 88, M2 = 96, M3 = 36, M4 = −10, M5 = 46, M6 = 70, M7 = 72, so C11 = 88 − 10 − 46 + 72 = **104**, C12 = 36 + 46 = **82**, C21 = 96 − 10 = **86**, C22 = 88 − 96 + 36 + 70 = **98** — the same as the ordinary product (12·3 + 34·2 = 104, and so on).

### Advantages and Disadvantages

**Advantages:**

1. Makes hard problems easier to solve (for example, the Tower of Hanoi).
2. Often gives **efficient algorithms** (merge sort, quick sort, FFT, Strassen's method).
3. The sub-problems are independent, so they can be solved **in parallel** on different processors.
4. Uses memory **caches** well, because small sub-problems fit in the cache.

**Disadvantages:**

1. **Recursion overhead**: function calls and the call stack use extra time and memory.
2. For small problems, dividing and combining can cost more than a simple direct method.
3. If the sub-problems **overlap**, the same sub-problem is solved many times (for example, naive recursive Fibonacci takes exponential time); dynamic programming is then better.
4. Some problems are hard to divide into independent parts.

### Divide and Conquer vs Dynamic Programming

| Basis | Divide and Conquer | Dynamic Programming |
| --- | --- | --- |
| Sub-problems | **Independent** (do not overlap) | **Overlapping** (the same sub-problem occurs many times) |
| Storing results | Not needed | Results are **stored** (memoization or tabulation) and reused |
| Approach | Top-down recursion | Usually bottom-up (or top-down with memoization) |
| Efficiency on overlapping sub-problems | Repeats work (can become exponential) | Each sub-problem is solved once |
| Examples | Merge sort, quick sort, binary search | Fibonacci numbers, LCS, 0/1 knapsack, matrix chain multiplication |

## Quick Sort and Merge Sort {#quick-sort-and-merge-sort}

The full algorithms, worked examples, C programs and the comparison table are in [Sorting](/topics/data-structures-algorithms/sorting#quick-sort). Here they are viewed as divide-and-conquer algorithms.

### Merge Sort as Divide and Conquer

For the array A[p … r]:

1. **Divide:** find the middle q = ⌊(p + r)/2⌋ and split into A[p … q] and A[q+1 … r]. (O(1))
2. **Conquer:** recursively sort the two halves. (2T(n/2))
3. **Combine:** **merge** the two sorted halves into one sorted array. (O(n))

Most of the work is done in the **combine** step; dividing is trivial. See [Merge Sort](/topics/data-structures-algorithms/sorting#merge-sort).

### Quick Sort as Divide and Conquer

For the array A[p … r]:

1. **Divide:** **partition** the array around a **pivot** into A[p … q−1] (elements smaller than the pivot) and A[q+1 … r] (elements not smaller), with the pivot at its final position q. (O(n))
2. **Conquer:** recursively sort the two parts.
3. **Combine:** **nothing to do** — after the parts are sorted, the whole array is sorted in place.

Most of the work is done in the **divide** (partition) step. See [Quick Sort](/topics/data-structures-algorithms/sorting#quick-sort).

| Step | Merge Sort | Quick Sort |
| --- | --- | --- |
| Divide | Trivial: split at the middle, O(1) | **Partition** around the pivot, O(n) |
| Conquer | Two recursive calls of size n/2 | Two recursive calls of sizes that depend on the pivot |
| Combine | **Merge**, O(n) | Nothing, O(1) |
| Sizes of parts | Always equal | Equal only if the pivot is the median |

## Proof of Correctness and Run-Time Analysis {#proof-of-correctness-and-run-time-analysis}

Divide-and-conquer algorithms are recursive, so their correctness is proved by **mathematical induction** on the input size, and the step that does the real work (merge or partition) is proved with a **loop invariant**. Their running time is found by writing and solving a **recurrence**. (Both methods are explained in [Algorithm Design and Analysis](/topics/data-structures-algorithms/algorithm-design-and-analysis#correctness-of-algorithms).)

### Correctness of Merge Sort

**1. The MERGE procedure is correct (loop invariant).** MERGE copies the smaller of the two front elements of the sorted halves L and R into the output, one element per step.

1. **Invariant:** at the start of each step, the output part filled so far contains the **smallest elements of L and R in sorted order**, and the next elements of L and R are the smallest not yet copied.
2. **Initialization:** before the first step, the output is empty, so the invariant holds.
3. **Maintenance:** the smaller of the two front elements is the smallest remaining element; copying it keeps the output sorted and containing the smallest elements.
4. **Termination:** when all n elements are copied, the output contains all the elements in sorted order.

**2. MERGE-SORT is correct (induction on n).**

1. **Base case:** an array of size 0 or 1 is already sorted.
2. **Inductive step:** assume MERGE-SORT correctly sorts every array smaller than n. For size n ≥ 2, the two halves are smaller than n, so they are sorted correctly; MERGE then combines two sorted arrays into one sorted array. So the result is sorted.

### Correctness of Quick Sort

**1. PARTITION is correct (loop invariant).** In the Lomuto partition with pivot x = A[r], index i marks the end of the "small" region and j scans the array:

1. **Invariant:** at the start of each iteration, every element in A[p … i] is **less than x**, and every element in A[i+1 … j−1] is **greater than or equal to x**.
2. **Initialization:** at first i = p − 1 and j = p, so both regions are empty.
3. **Maintenance:** if A[j] < x, it is swapped into the small region (i increases); otherwise the large region simply grows. The invariant still holds.
4. **Termination:** when j = r, all elements are in one of the two regions; swapping the pivot into position i + 1 places it between them, at its final sorted position.

**2. QUICKSORT is correct (induction on n).** An array of size 0 or 1 is sorted. For larger arrays, after partitioning, everything left of the pivot is smaller and everything right of it is not smaller; by the induction hypothesis the two parts are sorted correctly, so the whole array is sorted.

### Run-Time Analysis of Merge Sort

```text
T(n) = 2T(n/2) + cn        T(1) = c
```

1. **Master theorem:** a = 2, b = 2, n^(log₂ 2) = n = f(n) → case 2 → **T(n) = Θ(n log n)**.
2. **Recursion tree:** each level costs cn in total and there are log₂ n + 1 levels, so T(n) = cn(log₂ n + 1) = **Θ(n log n)**.

The split is always equal, so this holds in the **best, average and worst** cases.

### Run-Time Analysis of Quick Sort

The partition step costs Θ(n); the cost depends on how the pivot splits the array.

1. **Worst case** — the pivot is always the **smallest or largest** element (for example, an already sorted array with the last element as the pivot), so one part is empty:

   T(n) = T(n − 1) + cn = c(n + (n − 1) + … + 1) = c·n(n + 1)/2 = **Θ(n²)**.

2. **Best case** — the pivot always splits the array into **two equal halves**:

   T(n) = 2T(n/2) + cn = **Θ(n log n)** (the same recurrence as merge sort).

3. **Average case** — for random input, even an unbalanced but constant-proportion split (for example, 9 : 1) gives a recursion tree of depth O(log n) with cost at most cn per level, so **T(n) = O(n log n)**. Choosing the pivot at **random** makes the expected time O(n log n) for every input.

| Algorithm | Recurrence | Best | Average | Worst |
| --- | --- | --- | --- | --- |
| Merge sort | T(n) = 2T(n/2) + Θ(n) | Θ(n log n) | Θ(n log n) | Θ(n log n) |
| Quick sort | T(n) = T(k) + T(n − k − 1) + Θ(n) | Θ(n log n) | Θ(n log n) | Θ(n²) |
| Binary search | T(n) = T(n/2) + Θ(1) | Θ(1) | Θ(log n) | Θ(log n) |
| Max-min | T(n) = 2T(n/2) + 2 | — | Θ(n) | Θ(n) |

## References {#references}

**GeeksforGeeks**

- [Introduction to Divide and Conquer Algorithm](https://www.geeksforgeeks.org/dsa/introduction-to-divide-and-conquer-algorithm/) — accessed 2026-11-01
- [Dynamic Programming vs Divide-and-Conquer](https://www.geeksforgeeks.org/dsa/dynamic-programming-vs-divide-and-conquer/) — accessed 2026-11-01
- [Maximum and Minimum in an Array](https://www.geeksforgeeks.org/dsa/maximum-and-minimum-in-an-array/) — accessed 2026-11-01
- [Loop Invariant Condition with Examples](https://www.geeksforgeeks.org/dsa/loop-invariant-condition-examples-sorting-algorithms/) — accessed 2026-11-01
- [Quick Sort](https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/) — accessed 2026-11-01
- [Merge Sort](https://www.geeksforgeeks.org/dsa/merge-sort/) — accessed 2026-11-01

**TutorialsPoint**

- [Strassen's Matrix Multiplication](https://www.tutorialspoint.com/data_structures_algorithms/strassens_matrix_multiplication_algorithm.htm) — accessed 2026-11-02
- [Divide and Conquer](https://www.tutorialspoint.com/data_structures_algorithms/divide_and_conquer.htm) — accessed 2026-11-01
- [Max-Min Problem](https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_max_min_problem.htm) — accessed 2026-11-01

**TpointTech**

- [Divide and Conquer Introduction](https://www.tpointtech.com/divide-and-conquer-introduction) — accessed 2026-11-02
- [Max-Min Problem](https://www.tpointtech.com/daa-max-min-problem) — accessed 2026-11-02
- [Quick Sort](https://www.tpointtech.com/daa-quick-sort) — accessed 2026-11-02

**Programiz**

- [Divide and Conquer Algorithm](https://www.programiz.com/dsa/divide-and-conquer) — accessed 2026-11-01
- [Master Theorem](https://www.programiz.com/dsa/master-theorem) — accessed 2026-11-01

**Additional sources**

- [Strassen algorithm](https://en.wikipedia.org/wiki/Strassen_algorithm) — Wikipedia (complexity O(n^(log₂ 7)) ≈ n^2.807; GeeksforGeeks gives a different exponent) — accessed 2026-11-01
