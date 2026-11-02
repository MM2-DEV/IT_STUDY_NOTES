---
description: Sorting algorithms - insertion, selection, bubble, quick, merge and radix sort with algorithms, pass-by-pass examples, C programs, time and space complexity, stability, and comparison tables.
updated: 2026-11-02
---

## Insertion Sort {#insertion-sort}

**Sorting** means arranging data in a particular order, usually **ascending** (increasing) or **descending** (decreasing), numerically or alphabetically. Sorted data makes searching faster (for example, binary search needs sorted data).

**Terms used to describe sorting algorithms:**

1. **In-place sorting:** sorts within the original array, using only a small, constant amount of extra memory (for example, bubble, insertion and selection sort).
2. **Not-in-place sorting:** needs extra memory proportional to the data size (for example, merge sort).
3. **Stable sorting:** elements with **equal keys keep their original relative order** in the sorted output.
4. **Unstable sorting:** the relative order of equal elements may change.
5. **Adaptive sorting:** takes advantage of elements that are already in order, so it runs faster on nearly sorted data (for example, insertion sort).
6. **Comparison sort:** decides the order by comparing elements (bubble, insertion, selection, quick, merge). **Non-comparison sort:** does not compare elements directly (radix sort, counting sort).

### Concept

**Insertion sort** builds the sorted array **one element at a time**, the way a person **sorts playing cards in the hand**. The array is divided into a **sorted part** (on the left) and an **unsorted part**. Each element (the **key**) is taken from the unsorted part and **inserted into its correct position** in the sorted part by shifting the larger elements one place to the right.

### Algorithm

To sort `A[0 … n−1]` in ascending order:

1. Treat `A[0]` as a sorted part of size 1.
2. For `i = 1` to `n − 1`:
   1. `key = A[i]`, `j = i − 1`.
   2. While `j ≥ 0` and `A[j] > key`: shift `A[j]` to `A[j + 1]` and set `j = j − 1`.
   3. Insert the key: `A[j + 1] = key`.

### Example

Sort `[23, 1, 10, 5, 2]`:

| Pass | Key | Array after the pass (sorted part in bold) |
| --- | --- | --- |
| Start | — | **23**, 1, 10, 5, 2 |
| 1 | 1 | **1, 23**, 10, 5, 2 |
| 2 | 10 | **1, 10, 23**, 5, 2 |
| 3 | 5 | **1, 5, 10, 23**, 2 |
| 4 | 2 | **1, 2, 5, 10, 23** |

### Program

```c
#include <stdio.h>

void insertionSort(int a[], int n)
{
    for (int i = 1; i < n; i++)
    {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key)
        {
            a[j + 1] = a[j];       /* shift larger element right */
            j--;
        }
        a[j + 1] = key;            /* insert key */
    }
}

int main(void)
{
    int a[] = {23, 1, 10, 5, 2}, n = 5;
    insertionSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `1 2 5 10 23`

### Complexity and Properties

| Case | When | Time |
| --- | --- | --- |
| Best | The array is **already sorted** (one comparison per element) | **O(n)** |
| Average | Random order | **O(n²)** |
| Worst | The array is in **reverse order** — the i-th element is compared with all i − 1 before it: 1 + 2 + … + (n − 1) = **n(n − 1)/2** comparisons | **O(n²)** |

1. **Space:** O(1), in-place.
2. **Stable:** yes.
3. **Adaptive:** yes; the work depends on how unsorted the data is.

**Advantages:** simple; stable; in-place; efficient for **small or nearly sorted** lists. **Disadvantage:** O(n²), so it is slow for large lists.

**Uses:** small or nearly sorted data; as part of hybrid algorithms such as **TimSort** and **IntroSort**, which switch to insertion sort for small sub-arrays.

## Selection Sort {#selection-sort}

### Concept

**Selection sort** repeatedly **selects the smallest element** from the unsorted part and **swaps** it with the first element of the unsorted part. After pass i, the first i elements are in their final positions.

### Algorithm

1. For `i = 0` to `n − 2`:
   1. Find the index `min` of the smallest element in `A[i … n−1]`.
   2. Swap `A[i]` and `A[min]`.

### Example

Sort `[64, 25, 12, 22, 11]`:

| Pass | Smallest in the unsorted part | Swap | Array after the pass |
| --- | --- | --- | --- |
| 1 | 11 | 64 ↔ 11 | **11**, 25, 12, 22, 64 |
| 2 | 12 | 25 ↔ 12 | **11, 12**, 25, 22, 64 |
| 3 | 22 | 25 ↔ 22 | **11, 12, 22**, 25, 64 |
| 4 | 25 | none (already in place) | **11, 12, 22, 25, 64** |

### Program

```c
#include <stdio.h>

void selectionSort(int a[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int min = i;
        for (int j = i + 1; j < n; j++)
            if (a[j] < a[min])
                min = j;                       /* index of the smallest */
        int t = a[i]; a[i] = a[min]; a[min] = t;
    }
}

int main(void)
{
    int a[] = {64, 25, 12, 22, 11}, n = 5;
    selectionSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `11 12 22 25 64`

### Complexity and Properties

1. **Time:** **O(n²)** in the best, average and worst cases. It always makes **n(n − 1)/2 comparisons**, even if the array is already sorted, so it is **not adaptive**.
2. **Swaps:** at most **n − 1**; fewer memory writes than most other sorts.
3. **Space:** O(1), in-place.
4. **Stable:** **no**. For example, in `[2a, 2b, 1]` the first swap moves `2a` behind `2b`.

**Advantages:** simple; in-place; makes **few swaps**, which is useful when writing to memory is costly (for example, flash memory) and for files with **very large records and small keys**. **Disadvantages:** O(n²) even for sorted data; not stable.

## Bubble Sort {#bubble-sort}

### Concept

**Bubble sort** repeatedly **compares adjacent elements** and **swaps** them if they are in the wrong order. In each pass, the **largest remaining element "bubbles up" to the end** of the array, like an air bubble rising in water. After pass i, the last i elements are in their final positions.

### Algorithm

1. For `i = 0` to `n − 2` (passes):
   1. `swapped = false`.
   2. For `j = 0` to `n − 2 − i`: if `A[j] > A[j + 1]`, swap them and set `swapped = true`.
   3. If `swapped` is still false, the array is sorted: **stop early**.

The `swapped` flag is an **optimisation**: if a whole pass makes no swap, the remaining passes are skipped.

### Example

Sort `[5, 1, 4, 2, 8]`:

**Pass 1:**

| Compare | Action | Array |
| --- | --- | --- |
| 5, 1 | Swap | 1, 5, 4, 2, 8 |
| 5, 4 | Swap | 1, 4, 5, 2, 8 |
| 5, 2 | Swap | 1, 4, 2, 5, 8 |
| 5, 8 | No swap | 1, 4, 2, 5, **8** |

**Pass 2:** (1, 4) no swap; (4, 2) swap; (4, 5) no swap → `1, 2, 4, 5, 8`

**Pass 3:** no swap → the array is sorted and the algorithm stops: **`1, 2, 4, 5, 8`**.

### Program

```c
#include <stdio.h>

void bubbleSort(int a[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j + 1])
            {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                swapped = 1;
            }
        if (!swapped)
            break;                 /* no swap: already sorted */
    }
}

int main(void)
{
    int a[] = {5, 1, 4, 2, 8}, n = 5;
    bubbleSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `1 2 4 5 8`

### Complexity and Properties

| Case | When | Time |
| --- | --- | --- |
| Best | Already sorted (one pass with no swap, using the flag) | **O(n)** |
| Average | Random order | **O(n²)** |
| Worst | Reverse order | **O(n²)** |

1. A full bubble sort makes at most **n − 1 passes** and **n(n − 1)/2 comparisons**.
2. **Space:** O(1), in-place.
3. **Stable:** yes (equal adjacent elements are never swapped).

**Advantages:** very simple to understand and implement; in-place; stable. **Disadvantage:** O(n²), so it is very slow for large data; it is used mainly for teaching.

## Quick Sort {#quick-sort}

### Concept

**Quick sort** is a **divide and conquer** algorithm developed by **Tony Hoare** (1959). It:

1. **Chooses a pivot** element.
2. **Partitions** the array so that all elements **smaller than the pivot** come before it and all **larger** elements come after it. The pivot is then in its **final position**.
3. **Recursively sorts** the left and right parts. A part with zero or one element is already sorted.

**Pivot choices:**

1. First or last element (simple, but gives the worst case on already sorted data).
2. A random element (avoids the worst case for any fixed input pattern).
3. The median element (gives balanced splits, but finding the median is costly).

### Algorithm (Lomuto Partition, Last Element as Pivot)

```text
QUICKSORT(A, low, high)
1. if low < high then
2.     p ← PARTITION(A, low, high)
3.     QUICKSORT(A, low, p − 1)
4.     QUICKSORT(A, p + 1, high)

PARTITION(A, low, high)
1. pivot ← A[high];  i ← low − 1
2. for j ← low to high − 1
3.     if A[j] < pivot then  i ← i + 1;  swap A[i], A[j]
4. swap A[i + 1], A[high]          (place the pivot)
5. return i + 1
```

### Example

Sort `[10, 80, 30, 90, 40, 50, 70]`. **First partition** (pivot = 70):

| j | A[j] | A[j] < 70? | Action | Array |
| --- | --- | --- | --- | --- |
| 0 | 10 | Yes | i = 0, swap A[0] with itself | 10, 80, 30, 90, 40, 50, 70 |
| 1 | 80 | No | — | 10, 80, 30, 90, 40, 50, 70 |
| 2 | 30 | Yes | i = 1, swap 80 ↔ 30 | 10, 30, 80, 90, 40, 50, 70 |
| 3 | 90 | No | — | 10, 30, 80, 90, 40, 50, 70 |
| 4 | 40 | Yes | i = 2, swap 80 ↔ 40 | 10, 30, 40, 90, 80, 50, 70 |
| 5 | 50 | Yes | i = 3, swap 90 ↔ 50 | 10, 30, 40, 50, 80, 90, 70 |
| End | — | — | Swap A[4] = 80 ↔ pivot 70 | 10, 30, 40, 50, **70**, 90, 80 |

The pivot 70 is now at index 4. Quick sort then sorts `[10, 30, 40, 50]` (already in order) and `[90, 80]` (pivot 80 → `80, 90`), giving **`10, 30, 40, 50, 70, 80, 90`**.

### Program

```c
#include <stdio.h>

void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }

int partition(int a[], int low, int high)
{
    int pivot = a[high], i = low - 1;
    for (int j = low; j < high; j++)
        if (a[j] < pivot)
            swap(&a[++i], &a[j]);
    swap(&a[i + 1], &a[high]);        /* pivot to its final place */
    return i + 1;
}

void quickSort(int a[], int low, int high)
{
    if (low < high)
    {
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }
}

int main(void)
{
    int a[] = {10, 80, 30, 90, 40, 50, 70}, n = 7;
    quickSort(a, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `10 30 40 50 70 80 90`

### Complexity and Properties

| Case | When | Time |
| --- | --- | --- |
| Best | The pivot always divides the array into **two equal halves** | **O(n log n)** |
| Average | Random data | **O(n log n)** |
| Worst | The pivot is always the **smallest or largest** element (for example, an already sorted array with the first or last element as pivot) | **O(n²)** |

1. **Space:** O(log n) for the recursion stack with balanced splits; O(n) in the worst case.
2. **In-place:** yes (no extra array is needed).
3. **Stable:** **no**.

**Advantages:** very fast in practice for large data; in-place; cache-friendly (good locality of reference). **Disadvantages:** O(n²) worst case with a poor pivot; not stable.

## Merge Sort {#merge-sort}

### Concept

**Merge sort** is a **divide and conquer** algorithm invented by **John von Neumann** (1945). It:

1. **Divides** the array into **two halves**.
2. **Recursively sorts** each half (a single element is already sorted).
3. **Merges** the two sorted halves into one sorted array.

**Merging** two sorted arrays: compare the first remaining element of each, copy the smaller one to the output, and repeat; when one array is finished, copy the rest of the other.

### Example

Sort `[38, 27, 43, 3, 9, 82, 10]`:

```text
Divide:          [38, 27, 43, 3, 9, 82, 10]
                 /                        \
         [38, 27, 43, 3]             [9, 82, 10]
          /          \                /        \
     [38, 27]     [43, 3]          [9, 82]     [10]
      /    \       /    \           /    \       |
   [38]   [27]  [43]   [3]        [9]   [82]   [10]

Merge:
     [27, 38]     [3, 43]          [9, 82]     [10]
          \          /                 \        /
        [3, 27, 38, 43]               [9, 10, 82]
                 \                        /
             [3, 9, 10, 27, 38, 43, 82]
```

### Program

```c
#include <stdio.h>

void merge(int a[], int l, int m, int r)
{
    int tmp[100], i = l, j = m + 1, k = 0;
    while (i <= m && j <= r)
        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];   /* <= keeps it stable */
    while (i <= m) tmp[k++] = a[i++];                   /* rest of left half */
    while (j <= r) tmp[k++] = a[j++];                   /* rest of right half */
    for (k = 0; k < r - l + 1; k++) a[l + k] = tmp[k];
}

void mergeSort(int a[], int l, int r)
{
    if (l < r)
    {
        int m = (l + r) / 2;
        mergeSort(a, l, m);          /* sort left half */
        mergeSort(a, m + 1, r);      /* sort right half */
        merge(a, l, m, r);           /* merge them */
    }
}

int main(void)
{
    int a[] = {38, 27, 43, 3, 9, 82, 10}, n = 7;
    mergeSort(a, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `3 9 10 27 38 43 82`

### Complexity and Properties

1. **Recurrence:** T(n) = 2T(n/2) + O(n) (two half-size sub-problems plus linear merging), which gives **T(n) = O(n log n)**.
2. **Time:** **O(n log n)** in the best, average and worst cases.
3. **Space:** **O(n)** extra for the temporary array; **not in-place**.
4. **Stable:** yes.

**Advantages:** guaranteed O(n log n); stable; suitable for **linked lists** and for **external sorting** of data too large for main memory; easy to parallelise; also used to **count inversions** in an array. **Disadvantages:** needs O(n) extra memory; often slower than quick sort in practice for arrays.

### Differences Between Quick Sort and Merge Sort

| Basis | Quick Sort | Merge Sort |
| --- | --- | --- |
| Division | Around a **pivot**; parts may be unequal | Always into **two equal halves** |
| Main work | **Partitioning** before the recursive calls | **Merging** after the recursive calls |
| Worst case | **O(n²)** | **O(n log n)** |
| Average case | O(n log n) | O(n log n) |
| Extra space | Little (in-place; recursion stack only) | **O(n)** temporary array (not in-place) |
| Stability | Not stable | Stable |
| Sorting method | Internal sorting | Also suits external sorting |
| Preferred for | Arrays | Linked lists |
| Locality of reference | Good | Poorer |

## Radix Sort {#radix-sort}

### Concept

**Radix sort** is a **non-comparison** sorting algorithm for integers (or fixed-length strings). It sorts the numbers **digit by digit**, starting from the **least significant digit (LSD)** — the units place — and moving to the most significant digit. In each pass the numbers are distributed into **10 buckets (0–9)** by the current digit, using a **stable** sort (usually **counting sort**), so the order from the previous pass is kept for equal digits.

The **number of passes** equals the **number of digits in the largest number**.

### Algorithm

1. Find the largest number and count its digits, d.
2. For each digit position from the units place to the d-th place:
   1. Distribute the numbers into buckets 0–9 according to that digit (stably).
   2. Collect the numbers from bucket 0 to bucket 9.

### Example

Sort `[170, 45, 75, 90, 802, 24, 2, 66]`. The largest number, 802, has **3 digits**, so there are **3 passes**.

| Pass | Sorted by | Result |
| --- | --- | --- |
| 1 | Units digit | 170, 90, 802, 2, 24, 45, 75, 66 |
| 2 | Tens digit | 802, 2, 24, 45, 66, 170, 75, 90 |
| 3 | Hundreds digit | **2, 24, 45, 66, 75, 90, 170, 802** |

In pass 2, 802 and 2 both have tens digit 0; they keep their pass-1 order (802 before 2) because each pass is stable.

### Program

```c
#include <stdio.h>

void countSortByDigit(int a[], int n, int exp)
{
    int out[100], count[10] = {0};
    for (int i = 0; i < n; i++) count[(a[i] / exp) % 10]++;
    for (int d = 1; d < 10; d++) count[d] += count[d - 1];   /* end positions */
    for (int i = n - 1; i >= 0; i--)                          /* backwards: stable */
        out[--count[(a[i] / exp) % 10]] = a[i];
    for (int i = 0; i < n; i++) a[i] = out[i];
}

void radixSort(int a[], int n)
{
    int max = a[0];
    for (int i = 1; i < n; i++) if (a[i] > max) max = a[i];
    for (int exp = 1; max / exp > 0; exp *= 10)              /* 1, 10, 100, ... */
        countSortByDigit(a, n, exp);
}

int main(void)
{
    int a[] = {170, 45, 75, 90, 802, 24, 2, 66}, n = 8;
    radixSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `2 24 45 66 75 90 170 802`

### Complexity and Properties

1. **Time:** **O(d × (n + b))**, where d = number of digits, n = number of elements and b = base (10 for decimal). When d is a small constant, this is **linear, O(n)**.
2. **Space:** O(n + b) for the output array and buckets; not in-place.
3. **Stable:** yes (each pass uses a stable sort).

**Advantages:** no comparisons between elements; can be faster than comparison sorts for large sets of integers with few digits. **Disadvantages:** works only on integers or fixed-length keys; needs extra memory; slower when the keys have many digits.

### Comparison of Sorting Algorithms

| Algorithm | Best | Average | Worst | Extra space | Stable | In-place | Method |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes | Insertion |
| Selection sort | O(n²) | O(n²) | O(n²) | O(1) | No | Yes | Selection |
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes | Exchange |
| Quick sort | O(n log n) | O(n log n) | O(n²) | O(log n) to O(n) | No | Yes | Partitioning |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No | Merging |
| Heap sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes | Selection (heap) |
| Radix sort | O(d(n + b)) | O(d(n + b)) | O(d(n + b)) | O(n + b) | Yes | No | Distribution (non-comparison) |

Heap sort is explained in [Heaps and Heap Sort](/topics/data-structures-algorithms/heaps-and-heap-sort).

## References {#references}

**TutorialsPoint**

- [Bubble Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/bubble_sort_algorithm.htm) — accessed 2026-11-02
- [Insertion Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/insertion_sort_algorithm.htm) — accessed 2026-11-02
- [Selection Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/selection_sort_algorithm.htm) — accessed 2026-11-02 (its "average case O(n log n)" statement is wrong)
- [Merge Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm) — accessed 2026-11-02
- [Sorting Algorithms](https://www.tutorialspoint.com/data_structures_algorithms/sorting_algorithms.htm) — accessed 2026-11-01
- [Quick Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/quick_sort_algorithm.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Insertion Sort Algorithm](https://www.geeksforgeeks.org/dsa/insertion-sort-algorithm/) — accessed 2026-11-01
- [Selection Sort](https://www.geeksforgeeks.org/dsa/selection-sort-algorithm-2/) — accessed 2026-11-01
- [Bubble Sort Algorithm](https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/) — accessed 2026-11-01
- [Quick Sort](https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/) — accessed 2026-11-01
- [Merge Sort](https://www.geeksforgeeks.org/dsa/merge-sort/) — accessed 2026-11-01
- [Radix Sort](https://www.geeksforgeeks.org/dsa/radix-sort/) — accessed 2026-11-01
- [Quick Sort vs Merge Sort](https://www.geeksforgeeks.org/dsa/quick-sort-vs-merge-sort/) — accessed 2026-11-01
- [Time Complexities of All Sorting Algorithms](https://www.geeksforgeeks.org/dsa/time-complexities-of-all-sorting-algorithms/) — accessed 2026-11-01
- [Stable and Unstable Sorting Algorithms](https://www.geeksforgeeks.org/dsa/stable-and-unstable-sorting-algorithms/) — accessed 2026-11-01

**TpointTech**

- [Bubble Sort](https://www.tpointtech.com/bubble-sort) — accessed 2026-11-02
- [Selection Sort](https://www.tpointtech.com/selection-sort) — accessed 2026-11-02
- [Quick Sort](https://www.tpointtech.com/quick-sort) — accessed 2026-11-02
- [Radix Sort](https://www.tpointtech.com/radix-sort) — accessed 2026-11-02

**Programiz**

- [Sorting Algorithm](https://www.programiz.com/dsa/sorting-algorithm) — accessed 2026-11-01
- [Bubble Sort](https://www.programiz.com/dsa/bubble-sort) — accessed 2026-11-02
- [Selection Sort](https://www.programiz.com/dsa/selection-sort) — accessed 2026-11-02
- [Insertion Sort](https://www.programiz.com/dsa/insertion-sort) — accessed 2026-11-02
- [Merge Sort](https://www.programiz.com/dsa/merge-sort) — accessed 2026-11-02
- [Quicksort Algorithm](https://www.programiz.com/dsa/quick-sort) — accessed 2026-11-01
- [Radix Sort Algorithm](https://www.programiz.com/dsa/radix-sort) — accessed 2026-11-01

**IT Job QnS**

- [Design and Analysis of Algorithm](https://it.jobqns.com/design-and-analysis-of-algorithm/) — accessed 2026-11-01

**Additional sources**

- [Quicksort](https://en.wikipedia.org/wiki/Quicksort) — Wikipedia (inventor, Tony Hoare, 1959) — accessed 2026-11-01
- [Merge sort](https://en.wikipedia.org/wiki/Merge_sort) — Wikipedia (inventor, John von Neumann, 1945) — accessed 2026-11-01
