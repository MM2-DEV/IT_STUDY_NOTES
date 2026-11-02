---
description: Dynamic programming - overlapping sub-problems, memoization and tabulation, the principle of optimality and optimal substructure, and the assembly-line scheduling, matrix chain multiplication, longest common subsequence, Viterbi and bitonic Euclidean travelling-salesperson problems, with worked examples and C programs.
updated: 2026-11-02
---

## Introduction to Dynamic Programming {#introduction-to-dynamic-programming}

### Definition

**Dynamic programming (DP)** is an algorithm design technique for **optimization problems** that **breaks a problem into smaller sub-problems**, **solves each sub-problem only once**, and **stores its result** in a table, so that the result can be **reused** instead of being computed again. The method was developed by **Richard Bellman** in the 1950s.

DP can be used when the problem has two properties:

1. **Overlapping sub-problems:** the same sub-problems are needed **again and again** (unlike divide and conquer, whose sub-problems are independent).
2. **Optimal substructure:** an optimal solution of the problem can be built from **optimal solutions of its sub-problems** (see [Principle of Optimality](#principle-of-optimality-and-optimal-substructure)).

### Example: Fibonacci Numbers

F(0) = 0, F(1) = 1, F(n) = F(n − 1) + F(n − 2).

The plain recursive function computes the same values many times: F(5) calls F(3) twice and F(2) three times. Its running time grows **exponentially** (O(2ⁿ) is an upper bound). Storing each F(i) once reduces the time to **O(n)**.

### Approaches of Dynamic Programming

Dynamic programming is applied in two ways:

1. **Memoization (top-down):** keep the recursive solution, but **store** each result in a table (memo) the first time it is computed; before computing, **look it up**.
2. **Tabulation (bottom-up):** fill a table **iteratively**, starting from the **smallest sub-problems** (base cases) and working up to the original problem; no recursion.

```c
#include <stdio.h>

long long memo[51];                     /* 0 means "not computed yet" */

long long fibMemo(int n)                /* top-down */
{
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];   /* already stored */
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

long long fibTab(int n)                 /* bottom-up */
{
    long long dp[51];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

int main(void)
{
    printf("%lld %lld\n", fibMemo(40), fibTab(40));
    return 0;
}
```

Output: `102334155 102334155`

| Basis | Memoization (Top-Down) | Tabulation (Bottom-Up) |
| --- | --- | --- |
| Direction | Starts from the original problem and recurses down | Starts from the base cases and builds up |
| Implementation | Recursion + a lookup table | Loops + a table |
| Sub-problems solved | **Only those that are needed** | **All** sub-problems, in order |
| Overhead | Recursive calls (stack space, risk of stack overflow) | No recursion overhead; usually faster |
| Ease of writing | Easy: add a table to the recursive solution | The order of filling the table must be worked out |

### Steps for Designing a DP Algorithm

1. **Characterise the structure** of an optimal solution (find the optimal substructure).
2. **Define the value** of an optimal solution **recursively** (write the recurrence).
3. **Compute** the value of an optimal solution, usually **bottom-up**, storing the results in a table.
4. **Construct** an optimal solution from the stored information (if the solution itself, not only its value, is needed).

### Applications

0/1 knapsack, longest common subsequence, matrix chain multiplication, shortest paths (Bellman–Ford, Floyd–Warshall), edit distance, assembly-line scheduling, the Viterbi algorithm, resource allocation and scheduling. See also [Greedy vs Dynamic Programming](/topics/data-structures-algorithms/greedy-algorithms#greedy-vs-dynamic-programming) and [Divide and Conquer vs Dynamic Programming](/topics/data-structures-algorithms/divide-and-conquer#divide-and-conquer-design-technique).

## Principle of Optimality and Optimal Substructure {#principle-of-optimality-and-optimal-substructure}

### Principle of Optimality

**Bellman's principle of optimality** (Richard Bellman, *Dynamic Programming*, 1957): *an optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.*

In simple words: **in an optimal sequence of decisions, whatever the first decision is, the remaining decisions must also be optimal** for the sub-problem that is left. Dynamic programming can be applied only to problems that obey this principle.

### Optimal Substructure

A problem has **optimal substructure** if an **optimal solution contains optimal solutions to its sub-problems**.

**Example (shortest path):** if the shortest path from A to C passes through B, then its A-to-B part must be a shortest path from A to B (and its B-to-C part a shortest path from B to C). Otherwise, replacing that part with a shorter one would give a shorter A-to-C path, which is impossible.

**Counter-example (longest simple path):** the longest simple path from A to C does **not** necessarily consist of longest simple paths from A to B and from B to C (joining them may repeat vertices). This problem has no optimal substructure, and no efficient DP algorithm is known for it.

### Overlapping Sub-problems

A problem has **overlapping sub-problems** if a recursive algorithm **solves the same sub-problem many times**. DP stores each answer once. If the sub-problems do **not** overlap (as in merge sort), divide and conquer is enough and a table gives no benefit.

## Assembly-Line Scheduling {#assembly-line-scheduling}

### Problem

A factory has **two assembly lines**, each with **n stations**. Station j on line i takes time **a[i][j]**. A product (car chassis) must pass through stations 1, 2, …, n **in order**, on either line. Entering line i takes **e[i]**, leaving it takes **x[i]**, and **moving to the other line** after station j − 1 costs **t[i][j]** (staying on the same line costs nothing). Find the **minimum total time** to build one product.

Trying every route takes O(2ⁿ) time (each station can be on either line).

### Optimal Substructure and Recurrence

The fastest way through station j on line 1 is either the fastest way through station j − 1 on line 1 (staying), or the fastest way through station j − 1 on line 2 plus the transfer time (switching). Let **T1(j)** and **T2(j)** be the minimum times to finish station j on line 1 and line 2:

```text
T1(1) = e1 + a1,1                        T2(1) = e2 + a2,1
T1(j) = min( T1(j−1) + a1,j ,  T2(j−1) + t2,j + a1,j )
T2(j) = min( T2(j−1) + a2,j ,  T1(j−1) + t1,j + a2,j )
Answer = min( T1(n) + x1 ,  T2(n) + x2 )
```

(t1,j is the cost of moving from line 1 to line 2 before station j; t2,j the reverse.)

### Example

| | Station 1 | Station 2 | Station 3 | Station 4 |
| --- | --- | --- | --- | --- |
| Line 1 time a1 | 4 | 5 | 3 | 2 |
| Line 2 time a2 | 2 | 10 | 1 | 4 |
| Transfer 1 → 2 (t1) | — | 7 | 4 | 5 |
| Transfer 2 → 1 (t2) | — | 9 | 2 | 8 |

Entry times e1 = 10, e2 = 12; exit times x1 = 18, x2 = 7.

| j | T1(j) | T2(j) |
| --- | --- | --- |
| 1 | 10 + 4 = **14** | 12 + 2 = **14** |
| 2 | min(14 + 5, 14 + 9 + 5) = **19** | min(14 + 10, 14 + 7 + 10) = **24** |
| 3 | min(19 + 3, 24 + 2 + 3) = **22** | min(24 + 1, 19 + 4 + 1) = **24** |
| 4 | min(22 + 2, 24 + 8 + 2) = **24** | min(24 + 4, 22 + 5 + 4) = **28** |

**Answer = min(24 + 18, 28 + 7) = 35.**

```c
#include <stdio.h>

int min(int a, int b) { return a < b ? a : b; }

int main(void)
{
    int a[2][4] = {{4, 5, 3, 2}, {2, 10, 1, 4}};
    int t[2][4] = {{0, 7, 4, 5}, {0, 9, 2, 8}};   /* t[0]: line1->line2, t[1]: line2->line1 */
    int e[2] = {10, 12}, x[2] = {18, 7}, n = 4;

    int T1 = e[0] + a[0][0], T2 = e[1] + a[1][0];
    for (int j = 1; j < n; j++)
    {
        int n1 = min(T1 + a[0][j], T2 + t[1][j] + a[0][j]);
        int n2 = min(T2 + a[1][j], T1 + t[0][j] + a[1][j]);
        T1 = n1; T2 = n2;
    }
    printf("Minimum time = %d\n", min(T1 + x[0], T2 + x[1]));
    return 0;
}
```

Output: `Minimum time = 35`

**Complexity:** **O(n)** time (and O(1) extra space when only the last two values are kept), compared with O(2ⁿ) for trying all routes.

## Matrix Chain Multiplication {#matrix-chain-multiplication}

### Problem

Multiplying a p × q matrix by a q × r matrix needs **p × q × r** scalar multiplications. Matrix multiplication is **associative**, so a chain A1 × A2 × … × An can be **parenthesised** in many ways, all giving the same result but with very different costs. Given the dimensions (Ai is p[i−1] × p[i]), find the **parenthesisation with the minimum number of scalar multiplications**. (The problem is to find the order, not to multiply the matrices.)

**Example of why the order matters:** A1 = 10 × 30, A2 = 30 × 5, A3 = 5 × 60.

1. (A1 A2) A3: 10·30·5 + 10·5·60 = 1500 + 3000 = **4500**.
2. A1 (A2 A3): 30·5·60 + 10·30·60 = 9000 + 18000 = **27000**.

The number of possible parenthesisations grows exponentially, so trying all of them is not practical.

### Recurrence

Let **m[i][j]** be the minimum cost of computing Ai … Aj. The last multiplication splits the chain at some k (i ≤ k < j) into (Ai … Ak)(Ak+1 … Aj):

```text
m[i][i] = 0
m[i][j] = min over i ≤ k < j of ( m[i][k] + m[k+1][j] + p[i−1]·p[k]·p[j] )
```

**s[i][j]** stores the best k, so that the optimal parenthesisation can be printed.

### Example

Four matrices with p = [40, 20, 30, 10, 30]: A1 = 40×20, A2 = 20×30, A3 = 30×10, A4 = 10×30. The table is filled by **chain length**:

| m[i][j] | j = 1 | j = 2 | j = 3 | j = 4 |
| --- | --- | --- | --- | --- |
| i = 1 | 0 | 24000 | 14000 | **26000** |
| i = 2 | | 0 | 6000 | 12000 |
| i = 3 | | | 0 | 9000 |
| i = 4 | | | | 0 |

For example, m[1][3] = min(m[1][1] + m[2][3] + 40·20·10, m[1][2] + m[3][3] + 40·30·10) = min(0 + 6000 + 8000, 24000 + 0 + 12000) = **14000** (k = 1).

**Minimum cost = 26000**, with the parenthesisation **((A1 (A2 A3)) A4)**.

```c
#include <stdio.h>

int main(void)
{
    int p[] = {40, 20, 30, 10, 30}, n = 4;
    int m[5][5] = {0};

    for (int len = 2; len <= n; len++)              /* chain length */
        for (int i = 1; i <= n - len + 1; i++)
        {
            int j = i + len - 1;
            m[i][j] = 1 << 30;
            for (int k = i; k < j; k++)
            {
                int cost = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (cost < m[i][j]) m[i][j] = cost;
            }
        }
    printf("Minimum multiplications = %d\n", m[1][n]);
    return 0;
}
```

Output: `Minimum multiplications = 26000`

**Example 2:** five matrices with p = [4, 10, 3, 12, 20, 7]: M1 = 4×10, M2 = 10×3, M3 = 3×12, M4 = 12×20, M5 = 20×7.

| m[i][j] | j = 1 | j = 2 | j = 3 | j = 4 | j = 5 |
| --- | --- | --- | --- | --- | --- |
| i = 1 | 0 | 120 | 264 | 1080 | **1344** |
| i = 2 | | 0 | 360 | 1320 | 1350 |
| i = 3 | | | 0 | 720 | 1140 |
| i = 4 | | | | 0 | 1680 |
| i = 5 | | | | | 0 |

The last cell tries every split k:

1. k = 1: m[1][1] + m[2][5] + 4·10·7 = 0 + 1350 + 280 = 1630
2. k = 2: m[1][2] + m[3][5] + 4·3·7 = 120 + 1140 + 84 = **1344**
3. k = 3: m[1][3] + m[4][5] + 4·12·7 = 264 + 1680 + 336 = 2280
4. k = 4: m[1][4] + m[5][5] + 4·20·7 = 1080 + 0 + 560 = 1640

**Minimum = 1344** (split at k = 2), with the parenthesisation **((M1 × M2) × ((M3 × M4) × M5))**.

**Complexity:** **O(n³)** time (O(n²) entries, each trying up to n split points) and **O(n²)** space.

## Longest Common Subsequence (LCS) {#longest-common-subsequence-lcs}

### Problem

A **subsequence** of a string is obtained by **deleting zero or more characters without changing the order** of the rest (the characters need not be adjacent). For example, "ACE" is a subsequence of "ABCDE". The **longest common subsequence** of two strings X and Y is a longest sequence that is a subsequence of **both**. Checking all 2^m subsequences of X takes exponential time.

### Recurrence

Let **c[i][j]** be the LCS length of the first i characters of X and the first j characters of Y:

```text
c[i][j] = 0                              if i = 0 or j = 0
c[i][j] = c[i−1][j−1] + 1                if X[i] = Y[j]
c[i][j] = max( c[i−1][j], c[i][j−1] )    if X[i] ≠ Y[j]
```

### Example

X = **ABCBDAB**, Y = **BDCABA**:

| | | B | D | C | A | B | A |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **B** | 0 | 1 | 1 | 1 | 1 | 2 | 2 |
| **C** | 0 | 1 | 1 | 2 | 2 | 2 | 2 |
| **B** | 0 | 1 | 1 | 2 | 2 | 3 | 3 |
| **D** | 0 | 1 | 2 | 2 | 2 | 3 | 3 |
| **A** | 0 | 1 | 2 | 2 | 3 | 3 | 4 |
| **B** | 0 | 1 | 2 | 2 | 3 | 4 | **4** |

**LCS length = 4.** Tracing back from the bottom-right cell (diagonally where the characters match) gives an LCS such as **BCBA** (other LCSs of length 4, such as BDAB, also exist).

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char X[] = "ABCBDAB", Y[] = "BDCABA";
    int m = strlen(X), n = strlen(Y), c[20][20] = {0};

    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (X[i - 1] == Y[j - 1])
                c[i][j] = c[i - 1][j - 1] + 1;
            else
                c[i][j] = c[i - 1][j] > c[i][j - 1] ? c[i - 1][j] : c[i][j - 1];

    char lcs[20]; int k = c[m][n], i = m, j = n;
    lcs[k] = '\0';
    while (i > 0 && j > 0)                          /* trace back */
    {
        if (X[i - 1] == Y[j - 1]) { lcs[--k] = X[i - 1]; i--; j--; }
        else if (c[i - 1][j] >= c[i][j - 1]) i--;
        else j--;
    }
    printf("LCS length = %d, LCS = %s\n", c[m][n], lcs);
    return 0;
}
```

Output: `LCS length = 4, LCS = BCBA`

**Example 2:** X = **BCDAACD**, Y = **ACDBAC**. Filling the table in the same way gives c[7][6] = **4**, and tracing back gives the LCS **CDAC**.

**Complexity:** **O(m × n)** time and space (space can be reduced to O(n) if only the length is needed).

**Applications:** the `diff` utility (comparing files), version control systems such as Git, DNA sequence comparison in bioinformatics, plagiarism detection.

## Viterbi Algorithm {#viterbi-algorithm}

### Problem

A **hidden Markov model (HMM)** describes a system that moves between **hidden states** that cannot be seen directly; at each time step the current state produces an **observation** that can be seen. The model has:

1. **Initial probabilities** π(s): the probability of starting in state s.
2. **Transition probabilities** a(r, s): the probability of moving from state r to state s.
3. **Emission probabilities** b(s, o): the probability that state s produces observation o.

Given a sequence of observations o₁, o₂, …, o_T, the **Viterbi algorithm** finds the **most likely sequence of hidden states** that produced it (the **Viterbi path**). It is a **dynamic programming** algorithm proposed by **Andrew Viterbi** in **1967**, originally for decoding convolutional codes.

### Recurrence

Let **V(t, s)** be the probability of the **most likely state sequence** that ends in state s at time t and explains the first t observations:

```text
V(1, s) = π(s) · b(s, o1)
V(t, s) = max over r of [ V(t−1, r) · a(r, s) ] · b(s, ot)
B(t, s) = the state r that gives the maximum         (back-pointer)
```

At the end, choose the state with the largest V(T, s) and follow the back-pointers backwards to recover the whole path. The principle of optimality holds: the best path ending in state s at time t must contain the best path to its previous state at time t − 1.

### Example

A doctor cannot see whether a patient is **Healthy** or has a **Fever** (hidden states), only how the patient feels: **normal**, **cold** or **dizzy** (observations).

1. Initial: Healthy 0.6, Fever 0.4.
2. Transitions: Healthy → Healthy 0.7, Healthy → Fever 0.3; Fever → Healthy 0.4, Fever → Fever 0.6.
3. Emissions: Healthy — normal 0.5, cold 0.4, dizzy 0.1; Fever — normal 0.1, cold 0.3, dizzy 0.6.

Observations over three days: **normal, cold, dizzy**.

| | Day 1 (normal) | Day 2 (cold) | Day 3 (dizzy) |
| --- | --- | --- | --- |
| V(t, Healthy) | 0.6 × 0.5 = **0.3** | max(0.3×0.7, 0.04×0.4) × 0.4 = 0.21 × 0.4 = **0.084** (from Healthy) | max(0.084×0.7, 0.027×0.4) × 0.1 = **0.00588** (from Healthy) |
| V(t, Fever) | 0.4 × 0.1 = **0.04** | max(0.3×0.3, 0.04×0.6) × 0.3 = 0.09 × 0.3 = **0.027** (from Healthy) | max(0.084×0.3, 0.027×0.6) × 0.6 = 0.0252 × 0.6 = **0.01512** (from Healthy) |

The largest final value is **0.01512 (Fever on day 3)**. Following the back-pointers: Fever (day 3) ← Healthy (day 2) ← Healthy (day 1). **Most likely sequence: Healthy, Healthy, Fever.**

**Complexity:** **O(T × S²)** for T observations and S states (trying every sequence would take O(S^T)).

**Applications:** decoding convolutional codes in mobile phones (CDMA, GSM), modems, satellite and deep-space communication and Wi-Fi (802.11); speech recognition; part-of-speech tagging in language processing; bioinformatics.

## Bitonic Euclidean Traveling-Salesperson Problem {#bitonic-euclidean-traveling-salesperson-problem}

### Problem

The **Euclidean travelling-salesperson problem** asks for the **shortest closed tour** that visits each of n given points in the plane exactly once. It is NP-hard, so no polynomial-time algorithm is known for it.

A simpler version restricts the tour to be **bitonic**: with the points sorted by **x-coordinate**, the tour starts at the **leftmost** point, goes **strictly left to right** to the **rightmost** point, and then goes **strictly right to left** back to the start. Equivalently, **any vertical line crosses the tour at most twice**. The **shortest bitonic tour** can be found in **O(n²)** time by dynamic programming. (The problem appears as an exercise in Cormen et al., *Introduction to Algorithms*, attributed there to J. L. Bentley.)

### Recurrence

Number the points p₁, p₂, …, pₙ in order of increasing x-coordinate. For i < j, let **b(i, j)** be the length of the **shortest bitonic path** from pᵢ to pⱼ that visits **all the points p₁ … pⱼ** (going left from pᵢ to p₁, then right to pⱼ). In such a path, pⱼ's neighbour must be pⱼ₋₁ unless i = j − 1:

```text
b(1, 2) = |p1 p2|
b(i, j) = b(i, j−1) + |p(j−1) p(j)|                       if i < j − 1
b(j−1, j) = min over 1 ≤ k < j−1 of ( b(k, j−1) + |pk pj| )
Shortest bitonic tour = b(n−1, n) + |p(n−1) p(n)|
```

(|pq| is the Euclidean distance between p and q.) The points p(n−1) and p(n) are always neighbours in a bitonic tour, which is why the tour length is b(n−1, n) plus that edge.

### Example

Seven points sorted by x: (0, 6), (1, 0), (2, 3), (5, 4), (6, 1), (7, 5), (8, 2). Filling the table b(i, j) column by column gives the shortest bitonic tour length **≈ 25.58**. (Checking every possible bitonic tour of these points gives the same minimum.)

**Complexity:** O(n²) table entries; each entry with i < j − 1 takes O(1), and the n − 1 entries with i = j − 1 take O(n) each, so the total time is **O(n²)** (plus O(n log n) for sorting the points), with O(n²) space.

## References {#references}

**GeeksforGeeks**

- [Introduction to Dynamic Programming](https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/) — accessed 2026-11-01
- [Tabulation vs Memoization](https://www.geeksforgeeks.org/dsa/tabulation-vs-memoization/) — accessed 2026-11-01
- [Assembly Line Scheduling](https://www.geeksforgeeks.org/dsa/assembly-line-scheduling-dp-34/) — accessed 2026-11-01
- [Matrix Chain Multiplication](https://www.geeksforgeeks.org/dsa/matrix-chain-multiplication-dp-8/) — accessed 2026-11-01
- [Longest Common Subsequence](https://www.geeksforgeeks.org/dsa/longest-common-subsequence-dp-4/) — accessed 2026-11-01

**TutorialsPoint**

- [Dynamic Programming](https://www.tutorialspoint.com/data_structures_algorithms/dynamic_programming.htm) — accessed 2026-11-02

**TpointTech**

- [Matrix Chain Multiplication Example](https://www.tpointtech.com/matrix-chain-multiplication-example) — accessed 2026-11-02
- [Longest Common Sequence](https://www.tpointtech.com/longest-common-sequence) — accessed 2026-11-02
- [Optimal Substructure Property](https://www.tpointtech.com/optimal-substructure-property) — accessed 2026-11-02

**Programiz**

- [Dynamic Programming](https://www.programiz.com/dsa/dynamic-programming) — accessed 2026-11-02
- [Longest Common Subsequence](https://www.programiz.com/dsa/longest-common-subsequence) — accessed 2026-11-02

**Additional sources**

- [Dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) — Wikipedia (developed by Richard Bellman in the 1950s) — accessed 2026-11-01
- [Travelling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) — Wikipedia (the Euclidean TSP is NP-hard) — accessed 2026-11-01
- [Bellman equation](https://en.wikipedia.org/wiki/Bellman_equation) — Wikipedia (Bellman's principle of optimality) — accessed 2026-11-01
- [Viterbi algorithm](https://en.wikipedia.org/wiki/Viterbi_algorithm) — Wikipedia (the reference websites do not cover the Viterbi algorithm; recurrence, example and applications) — accessed 2026-11-01
- [Bitonic tour](https://en.wikipedia.org/wiki/Bitonic_tour) — Wikipedia (the reference websites do not cover bitonic tours) — accessed 2026-11-01
- [Bitonic TSP sample solution](https://www.cs.huji.ac.il/course/2004/algo/Solutions/bitonic.pdf) — course sample solutions (recurrence for shortest bitonic paths) — accessed 2026-11-01
