---
description: Data structures (definition, classification and operations), time and space complexity of algorithms with best, worst and average cases, the time-space trade-off, and the asymptotic notations Big-O, Omega and Theta.
updated: 2026-11-02
---

## Introduction to Data Structures {#introduction-to-data-structures}

**Data structure:** a data structure is a **way of organising and storing data in a computer's memory so that it can be accessed and used efficiently**.

It defines both the **arrangement of the data** and the **operations** that can be performed on it.

**Algorithm:** an **algorithm** is a finite sequence of steps for solving a problem (see [Algorithms and Flowcharts](/topics/programming/algorithms-and-flowcharts#algorithm)).

Algorithms work on data, and the choice of data structure decides how efficient the algorithm can be; hence the well-known phrase *"Algorithms + Data Structures = Programs"* (the title of Niklaus Wirth's 1976 book).

**Why data structures are needed:**

1. To handle **large amounts of data** efficiently (for example, millions of records in a database).
2. To make **searching, insertion and deletion fast**.
3. To use **memory efficiently**.
4. To make programs **reusable** and easier to design (well-known structures with known behaviour).

**Characteristics of a good data structure implementation:**

1. **Correctness:** it carries out its operations correctly.
2. **Time efficiency:** its operations take as little time as possible.
3. **Space efficiency:** it uses as little memory as possible.

### Classification of Data Structures

```text
                         Data structures
                 ┌──────────────┴──────────────┐
            Primitive                     Non-primitive
   (int, float, char, boolean,      ┌──────────┴──────────┐
    pointer)                      Linear              Non-linear
                          ┌────────┬───┴───┬───────┐    ┌───┴───┐
                        Array  Linked   Stack   Queue  Tree   Graph
                                list
```

1. **Primitive data structures:** the basic data types provided by the language, operated on directly by machine instructions: integer, real (float), character, boolean, pointer.
2. **Non-primitive data structures:** built from primitive types; they store a **collection** of values.
   1. **Linear data structures:** elements are arranged in a **sequence**, one after another; each element (except the first and last) has a unique predecessor and successor. Examples: **array, linked list, stack, queue**.
   2. **Non-linear data structures:** elements are **not in a sequence**; an element may be connected to several others, forming a **hierarchy** or **network**. Examples: **tree, graph** (also heaps and hash tables).

| Basis | Primitive | Non-primitive |
| --- | --- | --- |
| Defined by | Built into (predefined by) the programming language | Created by the programmer or libraries from primitive types |
| Values held | A single value of one type | A collection of values (possibly of different types) |
| Examples | int, float, char, boolean, pointer | Array, linked list, stack, queue, tree, graph |
| Operations | Basic arithmetic and logical operations | Insertion, deletion, searching, sorting, traversal and so on |
| Role | Building blocks | Built from primitive data structures |

**Static and dynamic data structures:**

1. **Static:** the size is **fixed** when the program is compiled; for example, an **array**.
2. **Dynamic:** the size can **grow and shrink** while the program runs, using dynamic memory allocation; for example, a **linked list** and trees built with pointers.

| Basis | Linear | Non-linear |
| --- | --- | --- |
| Arrangement | Sequential (one level) | Hierarchical or network (many levels) |
| Relationship between elements | One-to-one (each element has one predecessor and one successor) | One-to-many or many-to-many |
| Traversal | All elements in one run | Needs special methods (for example, tree traversals, BFS/DFS) |
| Memory use | Can waste memory (for example, unused array space) | Uses memory more flexibly |
| Implementation | Easier | More complex |
| Examples | Array, linked list, stack, queue | Tree, graph |
| Best suited for | Simple storage and processing of data | Complex relationships and hierarchies (file systems, social networks, computer networks) |
| Applications | Mainly application software | Artificial intelligence, image processing |

### Operations on Data Structures

1. **Traversing:** visiting (processing) each element exactly once.
2. **Searching:** finding the location of an element with a given value.
3. **Insertion:** adding a new element.
4. **Deletion:** removing an element.
5. **Sorting:** arranging the elements in order (ascending or descending).
6. **Merging:** combining two collections into one.
7. **Updating:** changing the value of an existing element.
8. **Accessing:** reading an element at a given position or with a given key.

**Abstract data type (ADT):** a data type described only by its **values and operations** (what it does), without saying how it is implemented; for example, a stack ADT with push and pop (see [Abstract Data Types and List ADT](/topics/data-structures-algorithms/linked-lists#abstract-data-types-and-list-adt)).

**Applications of data structures:** databases (indexing with B-trees and hashing), operating systems (queues for scheduling, stacks for function calls), compilers (symbol tables, expression trees), networks and maps (graphs for routing), file systems (trees), and artificial intelligence (search trees and graphs).

## Complexity of Algorithms {#complexity-of-algorithms}

**Complexity of an algorithm** is a measure of the **resources it needs** as a function of the **input size n**.

It has two parts:

1. **Time complexity:** the amount of **time (number of basic operations)** the algorithm takes to run, as a function of n.
2. **Space complexity:** the amount of **memory** the algorithm needs to run, as a function of n. It includes a **fixed part** (code, simple variables, constants) and a **variable part** that depends on the input (dynamically allocated memory, recursion stack). The extra memory beyond the input itself is called **auxiliary space**.

Complexity is measured by **counting steps** rather than seconds, because the actual time depends on the computer, the language and the compiler; counting the number of basic operations gives a measure that is **independent of the machine**.

### Counting Steps

```c
sum = 0;                         /* 1 step                      */
for (i = 0; i < n; i++)          /* loop runs n times           */
    sum = sum + a[i];            /* n steps                     */
```

The total is about n + 1 steps, so the time complexity is **O(n)** (linear).

```c
for (i = 0; i < n; i++)          /* outer loop: n times         */
    for (j = 0; j < n; j++)      /* inner loop: n times each    */
        c[i][j] = a[i][j] + b[i][j];
```

The statement inside runs n × n = n² times, so the time complexity is **O(n²)** (quadratic).

```c
for (i = 1; i < n; i = i * 2)    /* i = 1, 2, 4, 8, ... < n     */
    count++;
```

i doubles each time, so the loop runs about log₂ n times: **O(log n)** (logarithmic).

### Types of Time Complexity Cases: Best, Worst and Average

For the same input size, an algorithm may take different times for different inputs:

1. **Best case:** the **minimum** time, for the most favourable input.
2. **Worst case:** the **maximum** time, for the least favourable input. It gives a **guarantee** (the algorithm never takes longer), so it is the most commonly used measure.
3. **Average case:** the **expected** time over all possible inputs (of size n).

**Example: linear search** for a key in an array of n elements (see [Linear Search](/topics/data-structures-algorithms/searching#linear-search)):

1. **Best case:** the key is the **first** element: 1 comparison, **O(1)**.
2. **Worst case:** the key is the **last** element or is not present: n comparisons, **O(n)**.
3. **Average case:** about n/2 comparisons, which is still **O(n)**.

### Analysis of Algorithms

1. **A priori analysis:** theoretical analysis **before** implementation, by counting steps; independent of the machine.
2. **A posteriori analysis:** measuring the running time and memory **after** implementation, by running the program; depends on the machine and compiler.

## Time-Space Trade-off {#time-space-trade-off}

**Definition:** the **time-space trade-off** (space-time trade-off) is the situation in which an algorithm can **use less time by using more memory**, or **use less memory by taking more time**.

It is usually not possible to minimise both at once, so the programmer chooses according to which resource is more valuable for the problem.

**Examples:**

1. **Lookup tables vs recalculation:** storing pre-computed results in a table (for example, a table of squares or of trigonometric values) gives answers instantly but uses memory; calculating each value when it is needed saves memory but takes more time.
2. **Compressed vs uncompressed data:** compressed data takes less space but needs time to decompress; uncompressed data takes more space but is faster to access.
3. **Stored (cached) results vs re-computing:** keeping an image or a web page in a cache uses memory but avoids re-creating it.
4. **Loop unrolling:** writing the body of a loop several times makes the program larger but faster (fewer loop jumps).

**Example: Fibonacci numbers**

1. **Plain recursion:** fib(n) = fib(n − 1) + fib(n − 2) recomputes the same values again and again: **time O(2ⁿ)**, but almost no extra memory for stored results.
2. **Storing results (dynamic programming):** each value is computed once and kept in an array: **time O(n)**, but **space O(n)** for the array. Extra memory buys a huge saving in time (see [Dynamic Programming](/topics/data-structures-algorithms/dynamic-programming)).

## Asymptotic Notations {#asymptotic-notations}

**Asymptotic analysis** describes how the running time (or space) of an algorithm **grows as the input size n becomes very large**. Only the **fastest-growing term** matters for large n, and **constant factors are ignored**. For example, 3n² + 5n + 2 grows like n², because for large n the n² term dominates.

Asymptotic notations are of three main types:

### 1. Big-O Notation (O): Upper Bound

**Definition:** f(n) = **O(g(n))** if there exist positive constants **c** and **n₀** such that

```text
 f(n) ≤ c · g(n)   for all n ≥ n₀
```

Big-O gives an **upper bound**: f(n) grows **no faster than** g(n). It is mostly used to describe the **worst case**.

**Example:** f(n) = 3n² + 5n + 2. Take c = 4: 3n² + 5n + 2 ≤ 4n² holds for all n ≥ 6 (at n = 6: 140 ≤ 144). So **f(n) = O(n²)**, with c = 4 and n₀ = 6.

### 2. Big-Omega Notation (Ω): Lower Bound

**Definition:** f(n) = **Ω(g(n))** if there exist positive constants c and n₀ such that

```text
 f(n) ≥ c · g(n)   for all n ≥ n₀
```

Big-Omega gives a **lower bound**: f(n) grows **at least as fast as** g(n). It is associated with the **best case**.

**Example:** 3n² + 5n + 2 ≥ 3n² for all n ≥ 1, so f(n) = **Ω(n²)** (c = 3, n₀ = 1).

### 3. Big-Theta Notation (Θ): Tight Bound

**Definition:** f(n) = **Θ(g(n))** if there exist positive constants c₁, c₂ and n₀ such that

```text
 c₁ · g(n) ≤ f(n) ≤ c₂ · g(n)   for all n ≥ n₀
```

Big-Theta gives a **tight bound**: f(n) grows **at the same rate** as g(n). f(n) = Θ(g(n)) exactly when f(n) = O(g(n)) and f(n) = Ω(g(n)).

**Example:** from the two examples above, 3n² + 5n + 2 = **Θ(n²)** (c₁ = 3, c₂ = 4, n₀ = 6).

**Example 2:** f(n) = 2n + 3.

1. **O(n):** 2n + 3 ≤ 5n for all n ≥ 1 (at n = 1: 5 ≤ 5), so c = 5, n₀ = 1.
2. **Ω(n):** 2n + 3 ≥ 1·n for all n ≥ 1, so c = 1, n₀ = 1.
3. **Θ(n):** 1·n ≤ 2n + 3 ≤ 5n for all n ≥ 1 (c₁ = 1, c₂ = 5, n₀ = 1).

**Little-o and little-omega:** f(n) = **o(g(n))** means f grows **strictly slower** than g (f(n)/g(n) → 0 as n → ∞), and f(n) = **ω(g(n))** means f grows **strictly faster** (f(n)/g(n) → ∞). For example, n = o(n²) and n² = ω(n).

| Notation | Bound | Meaning | Usually describes |
| --- | --- | --- | --- |
| O(g(n)) | Upper | f grows no faster than g | Worst case |
| Ω(g(n)) | Lower | f grows at least as fast as g | Best case |
| Θ(g(n)) | Tight | f grows at the same rate as g | Exact growth rate |

### Rules for Finding Big-O

1. **Drop constant factors:** 5n → O(n); 100 → O(1).
2. **Keep only the highest-order term:** n³ + 1000n² + n → O(n³).
3. **Sequential steps add:** O(n) followed by O(n²) gives O(n + n²) = O(n²).
4. **Nested loops multiply:** a loop of n inside a loop of n gives O(n × n) = O(n²).

### Common Growth Rates

In order from **fastest (best)** to **slowest (worst)** algorithm:

| Complexity | Name | Example |
| --- | --- | --- |
| O(1) | Constant | Accessing an array element by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic (n log n) | Merge sort, heap sort |
| O(n²) | Quadratic | Bubble, selection and insertion sort |
| O(n³) | Cubic | Standard matrix multiplication |
| O(2ⁿ) | Exponential | Plain recursive Fibonacci, all subsets |
| O(n!) | Factorial | All permutations (brute-force travelling salesperson) |

```text
 O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

**Growth of the number of steps:**

| n | log₂ n | n | n log₂ n | n² | n³ | 2ⁿ |
| --- | --- | --- | --- | --- | --- | --- |
| 10 | 3.3 | 10 | 33 | 100 | 1,000 | 1,024 |
| 100 | 6.6 | 100 | 664 | 10,000 | 1,000,000 | about 1.27 × 10³⁰ |
| 1,000 | 10 | 1,000 | 9,966 | 1,000,000 | 10⁹ | astronomically large |

The table shows why an O(n log n) sorting algorithm is far better than an O(n²) one for large inputs, and why exponential algorithms are practical only for very small n.

## References {#references}

**TutorialsPoint**

- [Data Structure – Overview](https://www.tutorialspoint.com/data_structures_algorithms/data_structure_overview.htm) — accessed 2026-11-01
- [Asymptotic Analysis](https://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Difference between Linear and Non-linear Data Structures](https://www.geeksforgeeks.org/dsa/difference-between-linear-and-non-linear-data-structures/) — accessed 2026-11-01
- [What is Data Structure: Types, Classifications and Applications](https://www.geeksforgeeks.org/dsa/what-is-data-structure-types-classifications-and-applications/) — accessed 2026-11-01
- [Time-Space Trade-Off in Algorithms](https://www.geeksforgeeks.org/dsa/time-space-trade-off-in-algorithms/) — accessed 2026-11-01

**TpointTech**

- [What is Data Structure](https://www.tpointtech.com/what-is-data-structure) — accessed 2026-11-02
- [Difference between Primitive and Non-primitive Data Structure](https://www.tpointtech.com/difference-between-primitive-and-non-primitive-data-structure) — accessed 2026-11-02
- [Difference between Linear and Non-linear Data Structure](https://www.tpointtech.com/difference-between-linear-and-non-linear-data-structure) — accessed 2026-11-02
- [Asymptotic Notation](https://www.tpointtech.com/asymptotic-notation) — accessed 2026-11-02

**Programiz**

- [Data Structure and Types](https://www.programiz.com/dsa/data-structure-types) — accessed 2026-11-02
- [Asymptotic Notations](https://www.programiz.com/dsa/asymptotic-notations) — accessed 2026-11-02

**Additional sources**

- [Algorithms + Data Structures = Programs](https://en.wikipedia.org/wiki/Algorithms_%2B_Data_Structures_%3D_Programs) — Wikipedia, accessed 2026-11-01
