---
description: Designing and analysing algorithms - algorithm design techniques, a priori and a posteriori analysis, correctness (partial and total correctness, loop invariants, induction, counterexamples), and analysis techniques - counting loops, recurrence relations (substitution, iteration, recursion tree, master theorem) and amortized analysis.
updated: 2026-11-02
---

## Analyzing and Designing Algorithms {#analyzing-and-designing-algorithms}

An **algorithm** is a finite sequence of well-defined steps that solves a problem (see [Algorithms and Flowcharts](/topics/programming/algorithms-and-flowcharts) for its definition and properties). Working with algorithms has two parts:

1. **Designing** an algorithm: finding a correct method to solve the problem, usually by applying a known **design technique**.
2. **Analysing** an algorithm: estimating the **resources** it needs — mainly **time** (running time) and **space** (memory) — as a function of the **input size n**, so that different algorithms can be compared.

### Algorithm Design Techniques

| Technique | Idea | Examples |
| --- | --- | --- |
| **Brute force** | Try **every possible** solution and pick the right one | Linear search, guessing a 4-digit PIN by trying all 10,000 combinations |
| **Divide and conquer** | **Divide** the problem into smaller independent sub-problems, **solve** them recursively, **combine** the results | Binary search, merge sort, quick sort, Strassen's matrix multiplication |
| **Greedy method** | Build the solution step by step, always taking the choice that **looks best now**, never going back | Prim's and Kruskal's MST, Dijkstra's shortest path, Huffman coding, fractional knapsack |
| **Dynamic programming** | Break the problem into **overlapping** sub-problems; solve each **once** and **store** the result | 0/1 knapsack, Floyd–Warshall, longest common subsequence, matrix chain multiplication |
| **Backtracking** | Build the solution step by step and **abandon** (backtrack from) a partial solution as soon as it breaks a constraint | N-queens, graph colouring, Hamiltonian cycle, rat in a maze |
| **Branch and bound** | Explore a tree of partial solutions, using **bounds** to prune branches that cannot beat the best solution found | 0/1 knapsack, travelling salesman problem |
| **Randomized** | Use **random numbers** to make some decisions. A **Las Vegas** algorithm always gives the correct result but its running time varies; a **Monte Carlo** algorithm has a fixed running time but a small chance of a wrong result | Quick sort with a random pivot |

Each technique is described in its own topic: [Greedy Algorithms](/topics/data-structures-algorithms/greedy-algorithms), [Divide and Conquer](/topics/data-structures-algorithms/divide-and-conquer), [Dynamic Programming](/topics/data-structures-algorithms/dynamic-programming) and [Backtracking and Branch and Bound](/topics/data-structures-algorithms/backtracking-and-branch-and-bound).

### Why Analyse Algorithms?

1. **To compare algorithms** for the same problem and choose the best one for the purpose (for example, bubble sort needs no extra memory but is slower than merge sort, which needs extra space).
2. **To predict scalability:** how the running time and memory grow for large inputs.
3. **To avoid repeated testing:** a machine-independent measure does not change when the hardware or compiler changes.

What is measured:

1. **Time complexity:** the number of basic steps as a function of n.
2. **Space complexity:** the amount of extra memory as a function of n.

The cases analysed are the **worst case**, **best case** and **average case**, and the results are written with the **asymptotic notations** O, Ω and Θ (see [Introduction and Complexity](/topics/data-structures-algorithms/introduction-and-complexity#asymptotic-notations)). A fourth kind, **amortized analysis**, is described [below](#techniques-for-analysis-of-algorithms).

### Types of Algorithm Analysis: A Priori and A Posteriori

1. **A priori analysis** is a **theoretical** analysis done **before** running the algorithm. It counts the steps and expresses the result with asymptotic notation, so it does not depend on the hardware or compiler.
2. **A posteriori analysis** is an **empirical** analysis done **after** implementing and running the program, by measuring the actual running time and memory on a particular machine.

| Basis | A Priori Analysis | A Posteriori Analysis |
| --- | --- | --- |
| When | **Before** execution | **After** execution |
| Type | **Absolute** (theoretical) | **Relative** (experimental) |
| Depends on hardware / compiler | **No** | **Yes** |
| Result | Approximate (an order of growth) | Exact (for that machine and input) |
| Notation | Uses **asymptotic notation** | Does not use asymptotic notation |
| Same on every system? | Yes | No — varies from system to system |
| Cost | Cheaper (no implementation needed) | Costlier (needs the program, hardware and test data) |

## Correctness of Algorithms {#correctness-of-algorithms}

An algorithm is **correct** if, **for every valid input**, it **stops** and produces the **correct output** as given by the problem's specification. **Testing** can show that a program works on the inputs that were tried, but it cannot cover every possible input of a non-trivial program; a **proof of correctness** shows mathematically that the algorithm is right for **all** inputs.

### Types of Correctness: Partial and Total

1. **Partial correctness:** **if** the algorithm returns an answer, the answer is correct. (It might never stop.)
2. **Total correctness:** the algorithm is partially correct **and it always terminates**.

So, **total correctness = partial correctness + termination**.

### Methods of Proving Correctness

1. **Loop invariant** (for iterative algorithms)
2. **Mathematical induction** (especially for recursive algorithms)
3. **Proof by counterexample** — used to show an algorithm is **incorrect**: a single input for which it gives a wrong answer disproves it.

### Loop Invariants

A **loop invariant** is a condition (a statement about the program variables) that is **true immediately before and after every iteration** of a loop. To prove a loop correct with an invariant, show three things:

1. **Initialization:** the invariant is true **before the first iteration**.
2. **Maintenance:** if it is true before an iteration, it remains true **after** that iteration.
3. **Termination:** when the loop **ends**, the invariant (together with the reason the loop stopped) shows that the algorithm has produced the **correct result**.

This is similar to mathematical induction, but the "induction" stops when the loop ends.

**Example 1: finding the maximum of A[0 … n−1]**

```text
max ← A[0]
for i ← 1 to n − 1
    if A[i] > max then max ← A[i]
return max
```

**Invariant:** at the start of each iteration with index i, **max is the largest element of A[0 … i−1]**.

1. **Initialization:** before the first iteration (i = 1), max = A[0], which is the largest element of A[0 … 0]. ✔
2. **Maintenance:** if max is the largest of A[0 … i−1], then after comparing with A[i] and updating, max is the largest of A[0 … i]. ✔
3. **Termination:** the loop ends when i = n, so max is the largest element of A[0 … n−1] — the whole array. ✔

The loop runs n − 1 times, so the algorithm also terminates: it is **totally correct**.

**Example 2: insertion sort.** Invariant: at the start of each iteration of the outer loop with index i, the sub-array **A[0 … i−1] is sorted** (and contains the elements originally in those positions). When the loop ends with i = n, the whole array is sorted. Similar invariants exist for selection sort (the first i elements are the i smallest, in order) and bubble sort (the last i elements are in their final positions).

### Proof by Mathematical Induction

Induction is natural for **recursive** algorithms:

1. **Base case:** show the algorithm is correct for the smallest input.
2. **Inductive step:** assume it is correct for all inputs smaller than n (the **induction hypothesis**), and show that it is then correct for n.

**Example:** `fact(n) = 1 if n = 0, otherwise n × fact(n − 1)`.

1. **Base case:** fact(0) = 1 = 0!. ✔
2. **Inductive step:** assume fact(n − 1) = (n − 1)!. Then fact(n) = n × (n − 1)! = n!. ✔

Each call reduces n by 1 until n = 0, so the recursion terminates.

## Techniques for Analysis of Algorithms {#techniques-for-analysis-of-algorithms}

### 1. Counting Steps in Loops

The general method is to count the **iterations** of each loop and the work per iteration, express the total as a function of n, and keep only the **fastest-growing term**.

| Loop pattern | Iterations | Complexity |
| --- | --- | --- |
| Statements in **sequence** (one after another) | t₁ + t₂ + … | **Add** their times |
| Runs a **fixed** number of times (does not depend on n) | constant | **O(1)** |
| `for (i = 1; i <= n; i += c)` — variable changes by a **constant step** | n / c | **O(n)** |
| Two **nested** loops, each up to n | n × n | **O(n²)** (c nested loops: O(n^c)) |
| `for (i = 1; i <= n; i *= 2)` — variable **multiplied or divided** by a constant | log₂ n | **O(log n)** |
| `for (i = 2; i <= n; i = i * i)` — variable **squared** (or square-rooted) each time | log log n | **O(log log n)** |
| Two loops **one after another** (O(m) and O(n)) | m + n | **O(m + n)** |
| `if–else` | max(t₁, t₂) | Take the **larger (worst) branch** |

**Example:** in the code below, the outer loop runs n times and the inner loop runs log₂ n times for each, so the total is **O(n log n)**.

```c
for (int i = 0; i < n; i++)          /* n times */
    for (int j = 1; j < n; j *= 2)   /* log2 n times */
        count++;
```

### 2. Recurrence Relations

The running time of a **recursive** algorithm is described by a **recurrence relation**: an equation that gives T(n) in terms of T on smaller inputs. Examples:

| Algorithm | Recurrence | Solution |
| --- | --- | --- |
| Binary search | T(n) = T(n/2) + O(1) | O(log n) |
| Merge sort | T(n) = 2T(n/2) + O(n) | O(n log n) |
| Linear recursion (e.g. factorial) | T(n) = T(n − 1) + O(1) | O(n) |
| Selection sort written recursively | T(n) = T(n − 1) + O(n) | O(n²) |
| Tower of Hanoi | T(n) = 2T(n − 1) + 1 | O(2ⁿ) |

The main methods of solving recurrences are described below.

#### a) Substitution Method

**Guess** the form of the solution and **prove** it by **mathematical induction**.

**Example:** T(n) = 2T(n/2) + n. Guess T(n) ≤ c·n log n. Assume it holds for n/2: T(n) ≤ 2·c(n/2) log(n/2) + n = c·n log n − c·n + n ≤ c·n log n for c ≥ 1. So T(n) = **O(n log n)**.

#### b) Iteration (Back-Substitution) Method

**Expand** the recurrence repeatedly until a pattern appears, then sum it.

**Example:** T(n) = T(n − 1) + n, T(1) = 1:

T(n) = T(n − 2) + (n − 1) + n = … = 1 + 2 + … + n = **n(n + 1)/2 = O(n²)**.

**Example 2:** T(n) = 2T(n − 1) for n > 1, T(1) = 1:

T(n) = 2T(n − 1) = 2²T(n − 2) = … = 2^k T(n − k). With k = n − 1: T(n) = 2^(n−1) T(1) = **2^(n−1) = O(2ⁿ)**. (For example, T(20) = 2¹⁹ = 524,288.)

**Example 3 (substitution):** T(n) = T(n/2) + 1. Guess T(n) ≤ c·log n: T(n) ≤ c·log(n/2) + 1 = c·log n − c + 1 ≤ c·log n for c ≥ 1. So T(n) = **O(log n)** (this is the recurrence of binary search).

#### c) Recursion Tree Method

Draw the recurrence as a **tree** whose nodes are the costs of the sub-problems, add the costs **level by level**, and sum over all levels.

**Example:** T(n) = 2T(n/2) + n (merge sort):

```text
Level 0:            n                          → cost n
Level 1:       n/2      n/2                    → cost n
Level 2:    n/4  n/4  n/4  n/4                 → cost n
  ...                                            ...
Level log n:  1  1  1  ...  1   (n leaves)     → cost n
```

There are **log₂ n + 1 levels**, each costing n, so T(n) = **O(n log n)**.

#### d) Master Theorem

The **master theorem** solves recurrences of the divide-and-conquer form

```text
T(n) = a·T(n/b) + f(n)        a ≥ 1, b > 1
```

where **a** = number of sub-problems, **n/b** = size of each sub-problem, and **f(n)** = cost of dividing and combining. Compare f(n) with **n^(log_b a)**:

1. **Case 1:** if f(n) = O(n^(log_b a − ε)) for some ε > 0 (f grows **slower**), then **T(n) = Θ(n^(log_b a))**.
2. **Case 2:** if f(n) = Θ(n^(log_b a)) (they grow **equally**), then **T(n) = Θ(n^(log_b a) · log n)**.
3. **Case 3:** if f(n) = Ω(n^(log_b a + ε)) for some ε > 0 (f grows **faster**), **and** a·f(n/b) ≤ k·f(n) for some constant k < 1 (the **regularity condition**), then **T(n) = Θ(f(n))**.

**Examples:**

| Recurrence | a, b | n^(log_b a) | f(n) | Case | Result |
| --- | --- | --- | --- | --- | --- |
| T(n) = 8T(n/2) + n² | 8, 2 | n³ | n² (slower) | 1 | **Θ(n³)** |
| T(n) = 2T(n/2) + n (merge sort) | 2, 2 | n | n (equal) | 2 | **Θ(n log n)** |
| T(n) = T(n/2) + 1 (binary search) | 1, 2 | n⁰ = 1 | 1 (equal) | 2 | **Θ(log n)** |
| T(n) = 3T(n/2) + n² | 3, 2 | n^1.58 | n² (faster) | 3 | **Θ(n²)** |

**Extended form of the master theorem.** When f(n) = Θ(n^k · (log n)^p) with k ≥ 0, compare a with b^k:

| Condition | Result |
| --- | --- |
| a > b^k | T(n) = Θ(n^(log_b a)) |
| a = b^k and p > −1 | T(n) = Θ(n^(log_b a) · (log n)^(p+1)) |
| a = b^k and p = −1 | T(n) = Θ(n^(log_b a) · log log n) |
| a = b^k and p < −1 | T(n) = Θ(n^(log_b a)) |
| a < b^k and p ≥ 0 | T(n) = Θ(n^k · (log n)^p) |
| a < b^k and p < 0 | T(n) = Θ(n^k) |

| Recurrence | a, b^k, p | Result |
| --- | --- | --- |
| T(n) = 4T(n/2) + n² | 4 = 2², p = 0 | Θ(n² log n) |
| T(n) = 2T(n/2) + n / log n | 2 = 2¹, p = −1 | Θ(n log log n) |
| T(n) = 16T(n/4) + n² / (log n)² | 16 = 4², p = −2 | Θ(n²) |
| T(n) = 2T(n/2) + n³ / log n | 2 < 2³, p = −1 | Θ(n³) |

**Decreasing recurrences** T(n) = a·T(n − b) + f(n) with f(n) = O(n^k) (a ≥ 1, b ≥ 1) have these **upper bounds**:

1. a = 1: T(n) = **O(n^(k+1))** — for example, T(n) = T(n − 1) + n² = O(n³).
2. a > 1: T(n) = **O(a^(n/b) · n^k)** — for example, T(n) = 2T(n − 1) + n = O(n · 2ⁿ).

These are upper bounds, not always tight: T(n) = 2T(n − 1) + n actually grows as Θ(2ⁿ) (T(n)/2ⁿ approaches a constant).

**The master theorem cannot be used** when, for example, a is not a constant (a = 2ⁿ), a < 1, f(n) is not polynomially comparable with n^(log_b a), or the sub-problems are not of equal size n/b (such as T(n) = T(n − 1) + n).

### 3. Amortized Analysis

**Amortized analysis** finds the **average cost per operation over a whole sequence of operations**, in the worst case. It is useful when most operations are cheap but a few are expensive. Unlike average-case analysis, it uses **no probability**: it is a guaranteed bound on the total cost of the sequence.

**Methods:**

1. **Aggregate method:** find the total cost T(n) of n operations; the amortized cost is T(n)/n.
2. **Accounting method:** charge each operation a fixed amount; cheap operations save **credit** that pays for later expensive ones.
3. **Potential method:** define a **potential function** Φ for the data structure (like stored energy); amortized cost = actual cost + change in potential.

**Example: dynamic array (table doubling).** Inserting into an array that still has space costs O(1). When it is full, a new array of **twice the size** is allocated and all elements are copied, which costs O(n) for that one insertion. A simple worst-case bound would give O(n²) for n insertions, but copying happens only at sizes 1, 2, 4, 8, …, so the total copying cost is less than 2n. The total for n insertions is O(n), so the **amortized cost per insertion is O(1)**.

### 4. Empirical Analysis

The program is run on test inputs of increasing size and the running time is measured and plotted (this is a posteriori analysis). It confirms the theoretical results and shows constant factors, but the results depend on the machine and the inputs chosen.

## References {#references}

**GeeksforGeeks**

- [Why is Analysis of Algorithms Important?](https://www.geeksforgeeks.org/dsa/what-is-algorithm-and-why-analysis-of-it-is-important/) — accessed 2026-11-01
- [Most Important Types of Algorithms](https://www.geeksforgeeks.org/dsa/most-important-type-of-algorithms/) — accessed 2026-11-01
- [Difference between Posteriori and Priori Analysis](https://www.geeksforgeeks.org/?p=331440) — accessed 2026-11-01
- [Loop Invariant Condition with Examples](https://www.geeksforgeeks.org/dsa/loop-invariant-condition-examples-sorting-algorithms/) — accessed 2026-11-01
- [Analysis of Loops](https://www.geeksforgeeks.org/dsa/analysis-of-algorithms-set-4-analysis-of-loops/) — accessed 2026-11-01
- [How to Analyse Complexity of Recurrence Relation](https://www.geeksforgeeks.org/dsa/how-to-analyse-complexity-of-recurrence-relation/) — accessed 2026-11-01
- [Introduction to Amortized Analysis](https://www.geeksforgeeks.org/dsa/introduction-to-amortized-analysis/) — accessed 2026-11-01

**TutorialsPoint**

- [Analysis of Algorithms](https://www.tutorialspoint.com/design_and_analysis_of_algorithms/analysis_of_algorithms.htm) — accessed 2026-11-01
- [Methodology of Analysis](https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_methodology.htm) — accessed 2026-11-02
- [Asymptotic Notations and Apriori Analysis](https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_asymptotic_notations_apriori.htm) — accessed 2026-11-02
- [Master's Theorem](https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_masters_theorem.htm) — accessed 2026-11-02

**TpointTech**

- [Algorithm Design Techniques](https://www.tpointtech.com/daa-algorithm-design-techniques) — accessed 2026-11-02
- [Analyzing Algorithm Control Structure](https://www.tpointtech.com/daa-analyzing-algorithm-control-structure) — accessed 2026-11-02
- [Recurrence Relation](https://www.tpointtech.com/daa-recurrence-relation) — accessed 2026-11-02
- [Master Method](https://www.tpointtech.com/daa-master-method) — accessed 2026-11-02

**Programiz**

- [Master Theorem](https://www.programiz.com/dsa/master-theorem) — accessed 2026-11-01
- [Divide and Conquer Algorithm](https://www.programiz.com/dsa/divide-and-conquer) — accessed 2026-11-01

**Additional sources**

- [Correctness (computer science)](https://en.wikipedia.org/wiki/Correctness_(computer_science)) — Wikipedia (partial and total correctness; not defined by the reference websites) — accessed 2026-11-01
- [Master theorem (analysis of algorithms)](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)) — Wikipedia (regularity condition for case 3, omitted by Programiz) — accessed 2026-11-01
