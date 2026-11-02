---
description: Approximation algorithms - approximation ratio, the 2-approximation for vertex cover and the MST-based 2-approximation for metric TSP - and parallel algorithms - Flynn's classification, the PRAM model (EREW, CREW, ERCW, CRCW), speedup, efficiency, cost, Amdahl's law, parallel algorithm models and examples such as parallel sum and odd-even transposition sort.
updated: 2026-11-02
---

## Approximation Algorithms {#approximation-algorithms}

### Definition

Many important optimization problems are **NP-hard** (for example, vertex cover, the travelling salesman problem, set cover). No polynomial-time algorithm is known that always finds their **optimal** solution. An **approximation algorithm** runs in **polynomial time** and finds a solution that is **guaranteed to be close to the optimal one**, though not necessarily optimal.

### Approximation Ratio

Let **C** be the cost of the solution found by the algorithm and **C\*** the cost of an optimal solution. The algorithm has an **approximation ratio (performance ratio) ρ(n)** if, for every input of size n,

```text
max( C / C*, C* / C ) ≤ ρ(n)
```

1. For a **minimization** problem, C ≥ C\*, so the ratio is **C / C\***: how many times larger than the optimum the result can be.
2. For a **maximization** problem, C ≤ C\*, so the ratio is **C\* / C**.

An algorithm with ratio ρ(n) is called a **ρ(n)-approximation algorithm**. A ratio of 1 means the algorithm is exact; the closer the ratio is to 1, the better.

### Example 1: Vertex Cover (2-Approximation)

A **vertex cover** of an undirected graph is a set of vertices that **touches every edge** (for every edge (u, v), u or v is in the set). Finding a **minimum** vertex cover is NP-complete.

**Approximation algorithm:**

1. Start with an empty cover C, and let E be the set of all edges.
2. While E is not empty: pick **any edge (u, v)** from E, **add both u and v** to C, and **remove from E every edge touching u or v**.
3. Return C.

**Why it is a 2-approximation:** the edges picked in step 2 share no endpoints. Every vertex cover (including the optimal one) must contain at least one endpoint of each picked edge, so the optimal cover has at least as many vertices as there are picked edges. The algorithm adds **two** vertices per picked edge, so **|C| ≤ 2 × |optimal cover|**.

**Example:** edges 0–1, 0–2, 1–3, 3–4, 4–5, 5–6. Picking (0, 1), then (3, 4), then (5, 6) gives **C = {0, 1, 3, 4, 5, 6}** (6 vertices). An optimal cover is {0, 3, 5} (3 vertices), so here the result is exactly twice the optimum. The algorithm runs in **O(V + E)** time.

### Example 2: Travelling Salesman Problem with the Triangle Inequality (2-Approximation)

When the costs satisfy the **triangle inequality** — cost(i, j) ≤ cost(i, k) + cost(k, j), that is, going directly is never more expensive than going through a third city — the following algorithm gives a tour of at most **twice the optimal** cost:

1. Choose a starting city.
2. Build a **minimum spanning tree (MST)** of all the cities (for example, with Prim's algorithm).
3. Visit the cities in **preorder** of the MST, and return to the start.

**Why:** deleting one edge from the optimal tour leaves a spanning tree, so **MST cost ≤ optimal tour cost**. A walk that goes around the MST uses each tree edge twice, costing **2 × MST**. The preorder tour skips repeated cities, and by the triangle inequality the shortcuts never increase the cost. So the tour costs **≤ 2 × MST ≤ 2 × optimal**.

**Christofides' algorithm** (MST + minimum-weight perfect matching on the odd-degree vertices + an Euler circuit, then shortcuts) improves the ratio to **1.5** for such instances.

### Example 3: Set Cover (Greedy, Ratio H(n))

**Problem:** given a universe U of n elements and a collection of subsets of U, choose the **fewest subsets whose union is U** (in the weighted version, the cheapest total cost). The problem is NP-hard.

**Greedy algorithm:** repeatedly choose the set that covers the **largest number of still-uncovered elements** (weighted version: the smallest cost per newly covered element), until every element is covered.

**Ratio:** the greedy cover is at most **H(n) = 1 + 1/2 + 1/3 + … + 1/n ≤ ln n + 1** times the optimum — a **logarithmic** ratio. For example, with n = 15 elements, H(15) ≈ 3.32.

**Example:** U = {1, 2, 3, 4, 5}; sets {1, 2, 3}, {2, 4}, {3, 4}, {4, 5}.

1. {1, 2, 3} covers 3 uncovered elements (the most) → choose it; uncovered = {4, 5}.
2. {4, 5} covers 2 more (the others cover only 1) → choose it; everything is covered.

Greedy cover = **{1, 2, 3}, {4, 5}** — 2 sets, which is also optimal here (no single set covers U).

### Other Examples

| Problem | Type | Approximation |
| --- | --- | --- |
| Vertex cover | Minimization | Ratio **2** |
| TSP with triangle inequality | Minimization | Ratio **2** (MST method), **1.5** (Christofides) |
| Set cover | Minimization | Greedy method, ratio **H(n) ≤ ln n + 1** (logarithmic) |

### Advantages and Disadvantages

**Advantages:** run in polynomial time on problems that are otherwise impractical to solve exactly; give a **provable guarantee** on how far the result can be from the optimum.

**Disadvantages:** the result is usually **not optimal**; the guarantee (ratio) depends on the problem, and some problems have only weak guarantees (for example, the logarithmic ratio for set cover).

## Parallel Algorithms {#parallel-algorithms}

### Definition

A **sequential algorithm** executes **one step at a time** on a single processor. A **parallel algorithm** **divides a problem into sub-problems that are solved simultaneously** on **several processors**, and then combines their results to obtain the final output. The aim is to **reduce the running time**.

### Flynn's Classification of Computers

Computers are classified by the number of **instruction streams** and **data streams**:

| Class | Meaning | Description | Example |
| --- | --- | --- | --- |
| **SISD** | Single Instruction, Single Data | One processor executes one instruction stream on one data stream | Ordinary uniprocessor computer |
| **SIMD** | Single Instruction, Multiple Data | One control unit sends the **same instruction** to many processors, each working on **different data** | Vector and array processors, GPUs |
| **MISD** | Multiple Instruction, Single Data | Several processors execute different instructions on the **same data** stream | Rare; used mainly for fault tolerance (for example, the Space Shuttle flight control computer) |
| **MIMD** | Multiple Instruction, Multiple Data | Several processors execute **different instructions on different data** | Multiprocessors (shared memory), multicomputers (connected by a network) |

### The PRAM Model

The **Parallel Random Access Machine (PRAM)** is the standard theoretical model for designing parallel algorithms. It has **p processors**, each with private memory, connected to a **shared global memory**; in each step, every processor can read from the shared memory, compute, and write back. It ignores communication costs, so algorithms can be designed without the details of a real machine.

PRAM models differ in whether several processors may access the **same memory location at the same time**:

1. **EREW** (Exclusive Read, Exclusive Write): no two processors may read or write the same location simultaneously.
2. **CREW** (Concurrent Read, Exclusive Write): many processors may **read** the same location at once, but only one may write to it.
3. **ERCW** (Exclusive Read, Concurrent Write): concurrent writes are allowed, but not concurrent reads.
4. **CRCW** (Concurrent Read, Concurrent Write): many processors may read and write the same location simultaneously.

### Analysing Parallel Algorithms

Let **T₁** be the running time of the best sequential algorithm and **Tₚ** the running time of the parallel algorithm on **p** processors.

1. **Running time Tₚ:** from the moment the first processor starts until the last processor finishes.
2. **Number of processors p.**
3. **Cost = p × Tₚ** (the total processor time used). A parallel algorithm is **cost-optimal** if its cost is of the same order as the best sequential time T₁.
4. **Speedup Sₚ = T₁ / Tₚ:** how many times faster the parallel algorithm is. Usually Sₚ ≤ p; **Sₚ = p** is **linear (ideal) speedup**.
5. **Efficiency Eₚ = Sₚ / p = T₁ / (p × Tₚ):** the speedup per processor, normally between 0 and 1 (1 = every processor is fully useful).

**Amdahl's law:** if a fraction **f** of a program can be parallelised and the rest must run sequentially, the speedup on p processors is at most

```text
Speedup ≤ 1 / ( (1 − f) + f / p )        and, however many processors are used,  ≤ 1 / (1 − f)
```

**Example:** if 95% of a program can be parallelised (f = 0.95), the speedup can never exceed 1 / 0.05 = **20**, even with unlimited processors.

### Example 1: Parallel Sum (Reduction)

Adding n numbers sequentially takes n − 1 additions, i.e. **O(n)** time. With **n/2 processors**, add the numbers **in pairs** simultaneously, then add the partial sums in pairs, and so on, like a binary tree:

```text
Step 0:   3   1   7   0   4   1   6   3
Step 1:     4       7       5       9        (4 additions in parallel)
Step 2:         11              14           (2 additions in parallel)
Step 3:                 25                   (1 addition)
```

The number of steps is **⌈log₂ n⌉** (3 for n = 8), so the parallel time is **O(log n)**. Speedup = O(n / log n); with n/2 processors the cost is O(n log n), so this version is not cost-optimal (using n / log n processors makes it cost-optimal).

### Example 2: Odd–Even Transposition Sort

A parallel version of **bubble sort** for n numbers on n processors (one number each). The phases alternate:

1. **Odd phase:** each pair (1, 2), (3, 4), … compares and exchanges its two numbers if they are out of order.
2. **Even phase:** each pair (2, 3), (4, 5), … does the same.

All compare-exchange operations in a phase are done **simultaneously**. After **n phases** the list is sorted, so the time is **O(n)** with n processors (compared with O(n²) for sequential bubble sort).

**Example:** sort 5, 2, 4, 1, 3 (n = 5 phases; positions numbered 1 to 5):

| Phase | Pairs compared | Result |
| --- | --- | --- |
| Start | — | 5, 2, 4, 1, 3 |
| 1 (odd) | (1,2), (3,4) | 2, 5, 1, 4, 3 |
| 2 (even) | (2,3), (4,5) | 2, 1, 5, 3, 4 |
| 3 (odd) | (1,2), (3,4) | 1, 2, 3, 5, 4 |
| 4 (even) | (2,3), (4,5) | 1, 2, 3, 4, 5 |
| 5 (odd) | (1,2), (3,4) | 1, 2, 3, 4, 5 |

Other parallel sorting algorithms include **enumeration sort**, **parallel merge sort** and **hyper quick sort**.

### Parallel Algorithm Models

1. **Data-parallel model:** the **same operation** is applied to different data items in parallel (for example, dense matrix multiplication).
2. **Task-graph model:** the problem is split into tasks with **dependencies**, arranged as a graph; a task starts when the tasks it depends on are finished (for example, parallel quick sort).
3. **Work-pool model:** tasks are assigned **dynamically** to free processes from a common pool, for load balancing (for example, parallel tree search).
4. **Master–slave model:** a **master** process creates tasks and gives them to **slave** (worker) processes.
5. **Pipeline (producer–consumer) model:** data passes through a **chain of processes**, each doing one stage of the work.
6. **Hybrid model:** a combination of the above models.

## References {#references}

**GeeksforGeeks**

- [Approximation Algorithms](https://www.geeksforgeeks.org/dsa/approximation-algorithms/) — accessed 2026-11-01
- [Vertex Cover Problem: Approximate Solution](https://www.geeksforgeeks.org/dsa/introduction-and-approximate-solution-for-vertex-cover-problem/) — accessed 2026-11-01
- [Approximate Solution for Travelling Salesman Problem using MST](https://www.geeksforgeeks.org/dsa/approximate-solution-for-travelling-salesman-problem-using-mst/) — accessed 2026-11-01
- [PRAM or Parallel Random Access Machines](https://www.geeksforgeeks.org/?p=405633) — accessed 2026-11-01

**TutorialsPoint**

- [Approximation Algorithms](https://www.tutorialspoint.com/data_structures_algorithms/dsa_approximation_algorithms.htm) — accessed 2026-11-02
- [Set Cover Problem](https://www.tutorialspoint.com/data_structures_algorithms/dsa_set_cover_problem.htm) — accessed 2026-11-02 (its "2-approximation" claim for greedy set cover is wrong)
- [Parallel Algorithm — Introduction](https://www.tutorialspoint.com/parallel_algorithm/parallel_algorithm_introduction.htm) — accessed 2026-11-01
- [Parallel Algorithm — Analysis](https://www.tutorialspoint.com/parallel_algorithm/parallel_algorithm_analysis.htm) — accessed 2026-11-01
- [Parallel Algorithm — Models](https://www.tutorialspoint.com/parallel_algorithm/parallel_algorithm_models.htm) — accessed 2026-11-01
- [Parallel Algorithm — Sorting](https://www.tutorialspoint.com/parallel_algorithm/parallel_algorithm_sorting.htm) — accessed 2026-11-01

**TpointTech**

- [Approximate Algorithms](https://www.tpointtech.com/daa-approximate-algorithms) — accessed 2026-11-02

**Additional sources**

- [Set cover problem](https://en.wikipedia.org/wiki/Set_cover_problem) — Wikipedia (greedy ratio H(n) ≤ ln n + 1 and the example; the reference websites disagree on the ratio) — accessed 2026-11-02

- [Analysis of parallel algorithms](https://en.wikipedia.org/wiki/Analysis_of_parallel_algorithms) — Wikipedia (efficiency = speedup / p; the TutorialsPoint efficiency formula is wrong) — accessed 2026-11-01
- [Flynn's taxonomy](https://en.wikipedia.org/wiki/Flynn%27s_taxonomy) — Wikipedia (examples of each class) — accessed 2026-11-01
- [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law) — Wikipedia (formula and the 95% example) — accessed 2026-11-01
