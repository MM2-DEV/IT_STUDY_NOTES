---
description: The array as a data structure - memory representation, address calculation for one- and two-dimensional arrays in row-major and column-major order, traversal, insertion, deletion, search and update with their complexities, and sparse and dense matrices with triplet and linked representations.
updated: 2026-11-01
---

## Array Representation and Operations {#array-representation-and-operations}

**Definition:** an array is a **linear data structure** that stores a **fixed number of elements of the same type** in **contiguous (consecutive) memory locations**. Each element is identified by its **index (subscript)**. (For array syntax in C, see [C: Arrays and Strings](/topics/programming/c-arrays-strings#arrays).)

**Terms:**

1. **Element:** each item stored in the array.
2. **Index:** the position number of an element. In C, indexes run from **0 to n − 1**; in general, from a **lower bound (LB)** to an **upper bound (UB)**.
3. **Length (size):** the number of elements, **UB − LB + 1**.

### Memory Representation of a One-Dimensional Array

The elements are stored one after another, so the address of any element can be **calculated directly** from the address of the first element (the **base address**). This is why any element can be accessed in **O(1)** time (**random access**).

```text
 Address of A[i] = B + W × (i − LB)
```

where **B** = base address, **W** = size of one element in bytes (word size), **LB** = lower bound of the index.

**Example:** an array A[1 : 50] of 4-byte integers starts at address 2000. Address of A[25] = 2000 + 4 × (25 − 1) = 2000 + 96 = **2096**. (In C, where LB = 0, the formula is simply B + W × i.)

### Memory Representation of a Two-Dimensional Array

Memory is one-dimensional, so the elements of a two-dimensional array (a matrix of **M rows and N columns**) must be stored in one line. There are two ways:

1. **Row-major order:** the elements are stored **row by row**: all of row 1, then all of row 2, and so on. **C, C++ and Java** use row-major order.
2. **Column-major order:** the elements are stored **column by column**: all of column 1, then all of column 2. **FORTRAN** uses column-major order.

For the 2 × 3 matrix

```text
 | a  b  c |
 | d  e  f |
```

row-major storage is a, b, c, d, e, f, and column-major storage is a, d, b, e, c, f.

**Address formulas** for A[I][J], where the row index runs from LR and the column index from LC:

```text
 Row-major:     Address of A[I][J] = B + W × [ N × (I − LR) + (J − LC) ]
 Column-major:  Address of A[I][J] = B + W × [ M × (J − LC) + (I − LR) ]
```

(N = number of columns, M = number of rows.)

**Example:** an array A[1 : 10][1 : 20] (10 rows, 20 columns) of 2-byte elements has base address 1000. Find the address of A[5][8].

1. **Row-major:** 1000 + 2 × [20 × (5 − 1) + (8 − 1)] = 1000 + 2 × (80 + 7) = 1000 + 174 = **1174**.
2. **Column-major:** 1000 + 2 × [10 × (8 − 1) + (5 − 1)] = 1000 + 2 × (70 + 4) = 1000 + 148 = **1148**.

### Basic Operations on Arrays

**1. Traversal:** visiting every element once (for example, to print them or to find their sum).

```text
 Algorithm TRAVERSE(A, n)
 1. for i ← 0 to n − 1
 2.     process A[i]
```

Time: **O(n)**.

**2. Insertion:** to insert an item at position pos, every element from the end down to pos is **shifted one place to the right** to make room, then the item is placed and the size increases by 1.

**3. Deletion:** to delete the element at position pos, every element after it is **shifted one place to the left**, and the size decreases by 1.

```c
#include <stdio.h>

void insert(int a[], int *n, int pos, int item)
{
    for (int i = *n - 1; i >= pos; i--)   /* shift right */
        a[i + 1] = a[i];
    a[pos] = item;
    (*n)++;
}

void delete(int a[], int *n, int pos)
{
    for (int i = pos; i < *n - 1; i++)    /* shift left */
        a[i] = a[i + 1];
    (*n)--;
}

void print(int a[], int n)
{
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\n");
}

int main(void)
{
    int a[10] = {10, 20, 30, 40, 50};
    int n = 5;

    insert(a, &n, 2, 25);      /* insert 25 at index 2 */
    print(a, n);               /* 10 20 25 30 40 50    */
    delete(a, &n, 4);          /* delete index 4 (40)  */
    print(a, n);               /* 10 20 25 30 50       */
    return 0;
}
```

Output:

```text
10 20 25 30 40 50
10 20 25 30 50
```

The array must have spare capacity for insertion (otherwise it **overflows**). Inserting or deleting at the **end** needs no shifting, **O(1)**; at the **beginning**, all n elements are shifted, **O(n)**.

**4. Searching:** finding the position of a given value: **linear search** O(n) on any array, or **binary search** O(log n) on a sorted array (see [Searching](/topics/data-structures-algorithms/searching)).

**5. Update (access):** reading or changing the element at a given index: `A[i] = x`, **O(1)**.

**6. Sorting:** arranging the elements in order (see [Sorting](/topics/data-structures-algorithms/sorting)).

**7. Merging:** combining two arrays into one.

### Complexity of Array Operations

| Operation | Best case | Worst case |
| --- | --- | --- |
| Access / update by index | O(1) | O(1) |
| Traversal | O(n) | O(n) |
| Insertion | O(1) (at the end) | O(n) (at the beginning) |
| Deletion | O(1) (at the end) | O(n) (at the beginning) |
| Linear search | O(1) | O(n) |
| Binary search (sorted array) | O(1) | O(log n) |

### Advantages and Disadvantages of Arrays

**Advantages:**

1. **Random access** to any element in O(1) time by its index.
2. **Simple** to use; elements are easily processed with loops.
3. **No extra memory** for links (unlike linked lists), and good use of the processor cache because elements are contiguous.

**Disadvantages:**

1. **Fixed size:** the size must be decided in advance; unused space is wasted, and the array cannot grow beyond its size.
2. **Insertion and deletion are slow** (O(n)), because elements must be shifted.
3. Needs a **contiguous block** of memory.
4. All elements must be of the **same type**.

## Sparse and Dense Matrices {#sparse-and-dense-matrices}

**Sparse matrix:** a matrix in which **most of the elements are zero**. **Dense matrix:** a matrix in which **most of the elements are non-zero**.

**Sparsity** = (number of zero elements) / (total number of elements).

**Why sparse matrices need a special representation:** storing a large sparse matrix as an ordinary two-dimensional array **wastes memory** on zeros and **wastes time** in processing them. Storing **only the non-zero elements** saves both. Sparse matrices are common in practice, for example in scientific computing, graphs (adjacency matrices), and recommendation systems.

**Example:** a 5 × 6 matrix with only 4 non-zero elements:

```text
     0  1  2  3  4  5      (column index)
 0 | 0  0  7  0  0  0 |
 1 | 0  0  0  0  0  2 |
 2 | 0  0  0  0  0  0 |
 3 | 0  9  0  0  0  0 |
 4 | 0  0  0  0  4  0 |
```

It has 30 elements, of which 26 are zero (sparsity = 26/30 ≈ 0.87).

### 1. Array (Triplet) Representation

Each non-zero element is stored as a **triplet (row, column, value)**. The first row usually stores the **number of rows, the number of columns and the number of non-zero elements**.

| Row | Column | Value |
| --- | --- | --- |
| 5 | 6 | 4 |
| 0 | 2 | 7 |
| 1 | 5 | 2 |
| 3 | 1 | 9 |
| 4 | 4 | 4 |

**Storage:** the full matrix needs 30 cells; the triplet form needs (4 + 1) × 3 = **15** cells. In general, a matrix with t non-zero elements needs 3(t + 1) cells, which saves memory when t is small compared with m × n.

### 2. Linked List Representation

Each non-zero element is a **node** with four fields: **row, column, value** and a **pointer to the next node**. Nodes are created only for non-zero elements, and the list can grow or shrink as elements become non-zero or zero.

```text
 [0|2|7|•]→[1|5|2|•]→[3|1|9|•]→[4|4|4|NULL]
  row col value next
```

(A more general **orthogonal list** links each node both to the next non-zero element in its row and to the next one in its column.)

### Special Sparse Matrices

Some sparse matrices have zeros in a fixed pattern, so only the useful part needs to be stored, often in a one-dimensional array:

1. **Diagonal matrix:** non-zero elements only on the main diagonal (A[i][j] = 0 for i ≠ j); only **n** elements need to be stored.
2. **Lower triangular matrix:** all elements **above** the main diagonal are zero (A[i][j] = 0 for i < j); only **n(n + 1)/2** elements need to be stored.
3. **Upper triangular matrix:** all elements **below** the main diagonal are zero (A[i][j] = 0 for i > j); also **n(n + 1)/2** elements.
4. **Tridiagonal matrix:** non-zero elements only on the main diagonal and the diagonals just above and below it; **3n − 2** elements.

**Example:** a lower triangular 4 × 4 matrix stored row by row in a one-dimensional array B needs 4 × 5 / 2 = 10 places instead of 16. With 0-based indexes (i ≥ j), element A[i][j] is stored at **B[i(i + 1)/2 + j]**; for example, A[3][1] is at B[3 × 4/2 + 1] = B[7].

### Differences Between Sparse and Dense Matrices

| Basis | Sparse matrix | Dense matrix |
| --- | --- | --- |
| Elements | Mostly zero | Mostly non-zero |
| Best storage | Triplets, linked lists (only non-zero elements) | Ordinary two-dimensional array |
| Memory with a 2-D array | Mostly wasted on zeros | Well used |
| Processing | Skip zeros to save time | Process all elements |
| Examples | Adjacency matrix of a large network, document-term matrix | Image pixel data, small coefficient matrices |

## References {#references}

**TutorialsPoint**

- [Array Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Sparse Matrix and its representations](https://www.geeksforgeeks.org/dsa/sparse-matrix-representation/) — accessed 2026-11-01
- [Calculation of address of element of 1-D, 2-D, and 3-D using row-major and column-major order](https://www.geeksforgeeks.org/dsa/calculation-of-address-of-element-of-1-d-2-d-and-3-d-using-row-major-and-column-major-order/) — accessed 2026-11-01

**TpointTech**

- [Array Data Structure](https://www.tpointtech.com/data-structure-array) — accessed 2026-11-02
- [Multidimensional Array in Data Structure](https://www.tpointtech.com/multidimensional-array-in-data-structure) — accessed 2026-11-02
- [Sparse Matrix](https://www.tpointtech.com/sparse-matrix) — accessed 2026-11-02

**IT Job QnS**

- [Data Structure](https://it.jobqns.com/data-structure/) — accessed 2026-11-02
