---
description: Binary heaps - max heap and min heap, array representation, heapify, insertion, deletion and building a heap with complexities - and heap sort with a step-by-step example, C program, complexity and properties.
updated: 2026-11-02
---

## Binary Heaps {#binary-heaps}

### Definition

A **binary heap** (or simply a **heap**) is a **complete binary tree** that satisfies the **heap property**:

1. **Shape property:** it is a **complete binary tree**: all levels are full except possibly the last, which is filled **from the left**.
2. **Heap (order) property:** every parent is ordered with respect to its children.

**Types of binary heap:** there are two types of binary heap:

1. **Max heap:** the key of every **parent is greater than or equal to** the keys of its children. The **largest** element is at the **root**.
2. **Min heap:** the key of every **parent is less than or equal to** the keys of its children. The **smallest** element is at the **root**.

A heap is **not sorted**: there is no order between siblings, or between the left and right subtrees. It only guarantees that the root holds the maximum (or minimum).

![A max heap and a min heap built from the same keys, each shown as a tree and as an array](/diagrams/data-structures-algorithms/max-min-heap.svg)

### Array Representation

Because a heap is a complete binary tree, it is stored in an **array** without any pointers or gaps. The elements are stored level by level. For the node at index i (0-based):

1. **Root:** index 0
2. **Left child:** 2i + 1
3. **Right child:** 2i + 2
4. **Parent:** ⌊(i − 1) / 2⌋

**Example:** in the max heap `[44, 42, 35, 33, 31, 19, 27, 10, 26, 14]`, the children of 42 (index 1) are at indexes 3 and 4 (33 and 31), and the parent of 14 (index 9) is at index ⌊8/2⌋ = 4 (31).

In an array of n elements, the **leaves** are at indexes ⌊n/2⌋ to n − 1, and the **last non-leaf node** is at index **⌊n/2⌋ − 1**.

### Differences Between Min Heap and Max Heap

| Basis | Min Heap | Max Heap |
| --- | --- | --- |
| Heap property | Parent ≤ its children | Parent ≥ its children |
| Root | **Smallest** element | **Largest** element |
| Removed first | The smallest element | The largest element |
| Priority order | Ascending (smaller = higher priority) | Descending (larger = higher priority) |
| Used for | Ascending priority queue, Dijkstra's and Prim's algorithms | Descending priority queue, heap sort (ascending order) |

### Heap Operations (Max Heap)

#### 1. Heapify (Sift Down)

**Heapify** restores the heap property at a node i whose subtrees are already heaps:

1. Find the **largest** of the node and its two children.
2. If a child is larger than the node, **swap** the node with that child.
3. Repeat heapify on the child's position until no swap is needed (or a leaf is reached).

Heapify takes **O(log n)** time (at most the height of the tree).

#### 2. Insertion (Sift Up)

1. Insert the new element at the **end** of the array (the next free place in the last level).
2. **Compare it with its parent**; if it is larger than the parent, **swap** them.
3. Repeat step 2 until the parent is larger or the element reaches the root.

**Example:** insert **60** into the max heap `[50, 30, 40, 10, 20]`:

1. Add at the end: `[50, 30, 40, 10, 20, 60]`; 60 is at index 5, its parent is index 2 (40).
2. 60 > 40 → swap: `[50, 30, 60, 10, 20, 40]`; parent of index 2 is index 0 (50).
3. 60 > 50 → swap: **`[60, 30, 50, 10, 20, 40]`**; 60 is now the root.

**Building a heap by insertion:** inserting 35, 33, 42, 10, 14, 19, 27, 44, 26, 31 one by one gives the max heap **`[44, 42, 35, 33, 31, 19, 27, 10, 26, 14]`** shown in the figure.

**Example 2:** insert 44, 33, 77, 11, 55, 88, 66 into an empty max heap:

| Insert | After placing at the end | Swaps (sift up) | Heap |
| --- | --- | --- | --- |
| 44 | [44] | — | [44] |
| 33 | [44, 33] | — | [44, 33] |
| 77 | [44, 33, 77] | 77 ↔ 44 | [77, 33, 44] |
| 11 | [77, 33, 44, 11] | — | [77, 33, 44, 11] |
| 55 | [77, 33, 44, 11, 55] | 55 ↔ 33 | [77, 55, 44, 11, 33] |
| 88 | [77, 55, 44, 11, 33, 88] | 88 ↔ 44, then 88 ↔ 77 | [88, 55, 77, 11, 33, 44] |
| 66 | [88, 55, 77, 11, 33, 44, 66] | — (66 < 77) | **[88, 55, 77, 11, 33, 44, 66]** |

#### 3. Deletion (Extract Max)

Deletion always removes the **root** (the maximum):

1. Remove the root and **replace it with the last element** of the heap; reduce the size by 1.
2. **Heapify (sift down)** from the root: swap the element with its **larger child** until the heap property holds.

**Example:** delete from `[44, 42, 35, 33, 31, 19, 27, 10, 26, 14]`:

1. Remove 44; move the last element, 14, to the root: `[14, 42, 35, 33, 31, 19, 27, 10, 26]`.
2. 14 < larger child 42 → swap: `[42, 14, 35, 33, 31, 19, 27, 10, 26]`.
3. 14 < larger child 33 → swap: `[42, 33, 35, 14, 31, 19, 27, 10, 26]`.
4. 14 < larger child 26 → swap: **`[42, 33, 35, 26, 31, 19, 27, 10, 14]`**.

#### 4. Building a Heap from an Array (Bottom-Up)

Call heapify on every **non-leaf node**, from the **last non-leaf node (index ⌊n/2⌋ − 1)** back to the **root**. This takes only **O(n)** time, which is faster than n separate insertions (O(n log n)).

### Complexity of Heap Operations

| Operation | Time |
| --- | --- |
| Find max (max heap) / find min (min heap) — the root | **O(1)** |
| Insert | **O(log n)** |
| Delete (extract max / min) | **O(log n)** |
| Heapify one node | O(log n) |
| Build a heap from n elements (bottom-up) | **O(n)** |

### Applications of Heaps

1. **Priority queues** (insert and remove the highest-priority element in O(log n)).
2. **Heap sort.**
3. Graph algorithms: **Dijkstra's** shortest path and **Prim's** minimum spanning tree.
4. Finding the k-th largest or smallest element, merging k sorted arrays.
5. Operating-system job scheduling.

## Heap Sort {#heap-sort}

### Concept

**Heap sort** is a **comparison-based** sorting algorithm that uses a **binary heap**. To sort in **ascending** order it uses a **max heap**:

1. **Build a max heap** from the array; the largest element is now at the root (index 0).
2. **Swap** the root with the **last element** of the heap; the largest element is now in its final place at the end.
3. **Reduce the heap size by 1** (the sorted part at the end is excluded).
4. **Heapify** the root to restore the max heap.
5. **Repeat** steps 2–4 until the heap has one element.

(For descending order, a min heap is used.)

### Algorithm

```text
HEAPSORT(A, n)
1. for i ← ⌊n/2⌋ − 1 down to 0        (build the max heap)
2.     HEAPIFY(A, n, i)
3. for end ← n − 1 down to 1
4.     swap A[0], A[end]              (move the maximum to the end)
5.     HEAPIFY(A, end, 0)             (restore the heap of size end)

HEAPIFY(A, n, i)
1. largest ← i;  l ← 2i + 1;  r ← 2i + 2
2. if l < n and A[l] > A[largest] then largest ← l
3. if r < n and A[r] > A[largest] then largest ← r
4. if largest ≠ i then
5.     swap A[i], A[largest]
6.     HEAPIFY(A, n, largest)
```

### Example

Sort `[9, 4, 3, 8, 10, 2, 5]` (n = 7).

**Step 1 — build the max heap** (the last non-leaf node is index ⌊7/2⌋ − 1 = 2):

| Heapify at | Action | Array |
| --- | --- | --- |
| — | Start | 9, 4, 3, 8, 10, 2, 5 |
| i = 2 (3) | Children 2 and 5; swap 3 ↔ 5 | 9, 4, 5, 8, 10, 2, 3 |
| i = 1 (4) | Children 8 and 10; swap 4 ↔ 10 | 9, 10, 5, 8, 4, 2, 3 |
| i = 0 (9) | Children 10 and 5; swap 9 ↔ 10 | **10, 9, 5, 8, 4, 2, 3** |

**Step 2 — repeatedly move the maximum to the end** (heap | sorted part):

| Pass | Swap root with the last heap element, then heapify | Array |
| --- | --- | --- |
| 1 | 10 ↔ 3 | 9, 8, 5, 3, 4, 2 \| **10** |
| 2 | 9 ↔ 2 | 8, 4, 5, 3, 2 \| **9, 10** |
| 3 | 8 ↔ 2 | 5, 4, 2, 3 \| **8, 9, 10** |
| 4 | 5 ↔ 3 | 4, 3, 2 \| **5, 8, 9, 10** |
| 5 | 4 ↔ 2 | 3, 2 \| **4, 5, 8, 9, 10** |
| 6 | 3 ↔ 2 | **2, 3, 4, 5, 8, 9, 10** |

### Program

```c
#include <stdio.h>

void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }

void heapify(int a[], int n, int i)
{
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest != i)
    {
        swap(&a[i], &a[largest]);
        heapify(a, n, largest);          /* continue down the tree */
    }
}

void heapSort(int a[], int n)
{
    for (int i = n / 2 - 1; i >= 0; i--)  /* build max heap */
        heapify(a, n, i);
    for (int end = n - 1; end > 0; end--)
    {
        swap(&a[0], &a[end]);            /* largest to the end */
        heapify(a, end, 0);              /* restore heap */
    }
}

int main(void)
{
    int a[] = {9, 4, 3, 8, 10, 2, 5}, n = 7;
    heapSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `2 3 4 5 8 9 10`

### Complexity and Properties

1. **Time:** building the heap takes O(n); each of the n − 1 extractions takes O(log n). So heap sort takes **O(n log n)** in the **best, average and worst** cases.
2. **Space:** **O(1)** extra (in-place); the recursive heapify uses O(log n) stack space, which an iterative heapify avoids.
3. **In-place:** yes.
4. **Stable:** **no** (equal elements can change their relative order).

**Advantages:**

1. Guaranteed **O(n log n)** even in the worst case (unlike quick sort).
2. Needs only O(1) extra memory (unlike merge sort).

**Disadvantages:**

1. Not stable.
2. Usually slower in practice than a well-implemented quick sort, because of poor locality of reference (cache use) and larger constant factors.

**Applications:** systems that need a guaranteed worst-case time with little memory (for example, embedded systems and the Linux kernel); priority-queue-based problems such as finding the k largest elements.

### Heap Sort Compared with Quick Sort and Merge Sort

| Basis | Heap Sort | Quick Sort | Merge Sort |
| --- | --- | --- | --- |
| Worst-case time | O(n log n) | O(n²) | O(n log n) |
| Average time | O(n log n) | O(n log n) | O(n log n) |
| Extra space | O(1) | O(log n) | O(n) |
| In-place | Yes | Yes | No |
| Stable | No | No | Yes |

See also [Sorting](/topics/data-structures-algorithms/sorting#radix-sort) for the full comparison of sorting algorithms.

## References {#references}

**TutorialsPoint**

- [Heap Sort Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/heap_sort_algorithm.htm) — accessed 2026-11-02 (its claim that heap sort combines insertion sort and merge sort is wrong)
- [Heap Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Binary Heap](https://www.geeksforgeeks.org/dsa/binary-heap/) — accessed 2026-11-01
- [Difference Between Min Heap and Max Heap](https://www.geeksforgeeks.org/dsa/difference-between-min-heap-and-max-heap/) — accessed 2026-11-01
- [Time Complexity of Building a Heap](https://www.geeksforgeeks.org/dsa/time-complexity-of-building-a-heap/) — accessed 2026-11-01
- [Heap Sort](https://www.geeksforgeeks.org/dsa/heap-sort/) — accessed 2026-11-01

**TpointTech**

- [Heap Data Structure](https://www.tpointtech.com/heap-data-structure) — accessed 2026-11-02
- [Heap Sort](https://www.tpointtech.com/heap-sort) — accessed 2026-11-02

**Programiz**

- [Heap Data Structure](https://www.programiz.com/dsa/heap-data-structure) — accessed 2026-11-01
- [Heap Sort Algorithm](https://www.programiz.com/dsa/heap-sort) — accessed 2026-11-01
- [Priority Queue](https://www.programiz.com/dsa/priority-queue) — accessed 2026-11-01
