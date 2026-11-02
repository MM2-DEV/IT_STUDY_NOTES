---
description: Backtracking and branch and bound - state space trees, the backtracking method with the N-queens, sum of subsets and graph colouring problems, branch and bound with bounding and pruning, FIFO, LIFO and least-cost search, a 0/1 knapsack example, and the backtracking vs branch and bound comparison.
updated: 2026-11-02
---

## Backtracking {#backtracking}

### Definition

**Backtracking** is an algorithm design technique that builds a solution **step by step** (one component at a time) and, as soon as it finds that the current **partial solution cannot lead to a valid solution**, it **undoes (backtracks from) the last choice** and tries the next possibility. It is an improvement over brute force: instead of generating every complete candidate, it **abandons a whole group of candidates** as soon as a partial one fails.

Backtracking is used mainly for **constraint satisfaction** problems: finding **one solution**, **all solutions**, or deciding whether a solution exists.

### State Space Tree

The search is pictured as a **state space tree**:

1. The **root** is the initial (empty) state.
2. Each **edge** is one choice; each **node** is a partial solution.
3. The **leaves** are complete candidates (solutions or non-solutions).

Backtracking explores this tree in **depth-first** order. At each node it checks a **feasibility (bounding) condition**; if the node cannot lead to a solution, its whole subtree is **pruned** (not explored), and the algorithm goes back to the parent.

**Terms used for the nodes of a state space tree:**

1. **Live node:** a node that has been generated but whose children have not all been generated yet.
2. **E-node (expanding node):** the live node whose children are being generated at the moment.
3. **Dead node:** a node that will not be expanded further — either it is **non-promising** (it cannot lead to a solution) or all its children have already been generated.
4. **Promising / non-promising node:** a node is promising if it can still lead to a solution; otherwise it is non-promising and is pruned.
5. **Answer (solution) state:** a node that represents a complete, valid solution.

**Kinds of problems solved by backtracking:**

1. **Decision problems:** does a valid solution exist? (N-queens, sum of subsets, graph colouring)
2. **Optimization problems:** find the best solution (for example, 0/1 knapsack or the travelling salesman problem by exploring the tree and keeping the best answer).
3. **Enumeration problems:** list **all** valid solutions (all N-queens placements, all permutations or combinations).

### General Algorithm

```text
BACKTRACK(x)                      x = current partial solution
1. if x is a complete solution then
2.     record (or print) x
3.     return
4. for each possible next choice c
5.     if adding c to x is feasible then
6.         add c to x
7.         BACKTRACK(x)
8.         remove c from x        (backtrack: undo the choice)
```

### Example 1: The N-Queens Problem

**Problem:** place **N queens on an N × N chessboard** so that **no two queens attack each other** — no two in the same **row**, **column** or **diagonal**.

**Backtracking method:** place the queens **one row at a time**. In the current row, try each column; place the queen in the first **safe** column and move to the next row. If no column in a row is safe, **backtrack** to the previous row and move its queen to the next safe column.

**4-queens:** starting with the queen of row 1 in column 1 leads to dead ends: rows 1–3 can be filled (columns 1, 3 and then none; or 1, 4, 2 and then none for row 4), so the algorithm backtracks to row 1 and moves its queen to column 2. Then row 2 → column 4, row 3 → column 1, row 4 → column 3 gives the first solution.

The 4-queens problem has exactly **two solutions** (the column of the queen in rows 1 to 4):

1. **(2, 4, 1, 3)**
2. **(3, 1, 4, 2)**

```text
Solution (2, 4, 1, 3):
  . Q . .
  . . . Q
  Q . . .
  . . Q .
```

There is no solution for N = 2 or N = 3; the **8-queens** problem has **92** solutions, one of which is **(4, 6, 8, 2, 7, 1, 3, 5)** (the column of the queen in rows 1 to 8).

```c
#include <stdio.h>
#include <stdlib.h>

int n, col[20], count = 0;              /* col[r] = column of the queen in row r */

int safe(int r, int c)
{
    for (int i = 0; i < r; i++)
        if (col[i] == c || abs(col[i] - c) == r - i)   /* same column or diagonal */
            return 0;
    return 1;
}

void place(int r)
{
    if (r == n)                                         /* all queens placed */
    {
        count++;
        if (n == 4)
        {
            for (int i = 0; i < n; i++) printf("%d ", col[i] + 1);
            printf("\n");
        }
        return;
    }
    for (int c = 0; c < n; c++)
        if (safe(r, c))
        {
            col[r] = c;
            place(r + 1);                               /* next row; returning = backtrack */
        }
}

int main(void)
{
    n = 4; place(0); printf("4-queens: %d solutions\n", count);
    n = 8; count = 0; place(0); printf("8-queens: %d solutions\n", count);
    return 0;
}
```

Output:

```text
2 4 1 3 
3 1 4 2 
4-queens: 2 solutions
8-queens: 92 solutions
```

The worst-case time is exponential (about O(N!)), but pruning makes it far faster than checking all placements.

### Example 2: Sum of Subsets

**Problem:** given a set of positive numbers and a target sum M, find all **subsets whose sum equals M**.

**Backtracking method:** the state space tree decides, for each number in turn, whether to **include** or **exclude** it. A branch is **pruned** when the sum so far **exceeds M**, or when the sum so far plus all the remaining numbers is **less than M** (the target can no longer be reached).

**Example:** set {10, 7, 5, 18, 12, 20, 15}, M = 35. The subsets with sum 35 are exactly **{10, 7, 18}**, **{10, 5, 20}**, **{5, 18, 12}** and **{20, 15}**.

### Example 3: Graph Colouring (m-Colouring)

**Problem:** colour the vertices of a graph using at most **m colours** so that **no two adjacent vertices have the same colour**.

**Backtracking method:** colour the vertices one by one; for each vertex, try colours 1 to m and choose the first colour not used by any already-coloured neighbour. If no colour fits, backtrack to the previous vertex and change its colour.

### Applications of Backtracking

1. N-queens problem
2. Sum of subsets
3. Graph colouring (m-colouring)
4. Hamiltonian cycle / path
5. Solving **Sudoku**, crosswords and other puzzles
6. Rat in a maze and other maze problems
7. Knight's tour
8. Generating all permutations or combinations

### Advantages and Disadvantages

**Advantages:** simple and systematic; finds **all** solutions if required; **prunes** large parts of the search space, so it is much faster than brute force.

**Disadvantages:** the worst-case time is still **exponential**; it can be slow for large inputs when little can be pruned; for optimization problems, dynamic programming or branch and bound is usually better.

## Branch and Bound {#branch-and-bound}

### Definition

**Branch and bound (B&B)** is an algorithm design technique for **optimization problems** (finding the minimum or maximum). Like backtracking, it searches a **state space tree** of partial solutions, but it uses **bounds** to avoid exploring branches that **cannot lead to a better solution than the best one found so far**.

### How It Works

1. **Branching:** divide the problem into smaller sub-problems; each node of the state space tree is a partial solution.
2. **Bounding:** for each node, compute a **bound** on the best solution that can be obtained from it: an **upper bound** for a maximization problem, or a **lower bound** for a minimization problem.
3. **Pruning:** if a node's bound is **not better than the best complete solution found so far**, the node is **killed** and its subtree is not explored. A node is also pruned if it is **infeasible**.

The search ends when no live (unexplored, promising) nodes remain; the best solution found is optimal.

### Types of Branch and Bound (Order of Exploring Nodes)

1. **FIFO branch and bound:** live nodes are kept in a **queue** — breadth-first order.
2. **LIFO branch and bound:** live nodes are kept in a **stack** — depth-first order.
3. **Least-cost (LC) branch and bound:** the live node with the **best bound (least cost)** is expanded next, using a **priority queue** — best-first order. It usually reaches the optimal solution fastest.

### Example: 0/1 Knapsack

Capacity W = 16; items (value, weight): 1 = (40, 2), 2 = (30, 5), 3 = (50, 10), 4 = (10, 5), already in decreasing order of value/weight (20, 6, 5, 2).

**Upper bound of a node:** the value already taken **plus the best value obtainable by filling the remaining capacity with the remaining items, allowing a fraction of the last one** (the fractional knapsack value). No 0/1 solution below the node can exceed this bound.

At the root: take items 1 and 2 (value 70, weight 7), then 9/10 of item 3 (45) → **upper bound = 115**.

Least-cost (best-first) search — the live node with the **largest upper bound** is expanded next:

| Step | Node expanded (bound) | Children created | Best so far |
| --- | --- | --- | --- |
| 1 | Root (115) | Include 1: value 40, weight 2, bound 115; exclude 1: bound 82 | 40 |
| 2 | Include 1 (115) | Include 2: value 70, weight 7, bound 115; exclude 2: bound 98 | 70 |
| 3 | Include 1, 2 (115) | Include 3: weight 17 > 16 → **infeasible**; exclude 3: bound 80 | 70 |
| 4 | Include 1, exclude 2 (98) | Include 3: value **90**, weight 12, bound 98; exclude 3: bound 50 ≤ 90 → **pruned** | **90** |
| 5 | Include 1, 3 (98) | Include 4: weight 17 → **infeasible**; exclude 4: bound 90, not better → **pruned** | 90 |
| 6 | — | Remaining live nodes "exclude 1" (82) and "include 1, 2, exclude 3" (80) have bounds ≤ 90 → **pruned** | 90 |

**Optimal solution: items 1 and 3, value 90** (weight 12). Many branches (for example, the whole subtree "exclude item 1", bound 82) were never explored.

### Other Applications

1. **Travelling salesman problem** (lower bounds from reduced cost matrices)
2. **Job assignment** problem
3. **8-puzzle** (15-puzzle)
4. Integer linear programming and other discrete optimization problems

### Advantages and Disadvantages

**Advantages:** finds the **optimal** solution; pruning often avoids exploring most of the tree, so it is much faster than exhaustive search.

**Disadvantages:** in the worst case the tree is still **exponential** in size; computing good bounds can be difficult; it may need a lot of memory to store live nodes (especially FIFO / least-cost search).

### Differences Between Backtracking and Branch and Bound

| Basis | Backtracking | Branch and Bound |
| --- | --- | --- |
| Problems solved | Mainly **decision** / constraint-satisfaction problems (find one or all solutions) | **Optimization** problems (find the best solution) |
| Search order | **Depth-first** search of the state space tree | **BFS (FIFO), DFS (LIFO) or best-first (least cost)** |
| Pruning based on | A **feasibility** function (does the partial solution break a constraint?) | A **bounding** function (can this branch beat the best solution so far?) as well as feasibility |
| When the search stops | Can stop as soon as a solution is found (or after finding all solutions) | Continues until no live node can lead to a better solution |
| Data structure | Recursion stack | Queue, stack or priority queue of live nodes |
| Memory | Small: stores only the current path from the root | Larger: keeps all the live nodes (the frontier) in memory |
| Efficiency depends on | How early the constraints cut off invalid paths | How tight (good) the bounding function is |
| Examples | N-queens, sum of subsets, graph colouring, Hamiltonian cycle, Sudoku | 0/1 knapsack, travelling salesman problem, job assignment |

## References {#references}

**GeeksforGeeks**

- [Introduction to Backtracking](https://www.geeksforgeeks.org/dsa/introduction-to-backtracking-2/) — accessed 2026-11-01
- [N Queen Problem](https://www.geeksforgeeks.org/dsa/n-queen-problem-backtracking-3/) — accessed 2026-11-01
- [Introduction to Branch and Bound](https://www.geeksforgeeks.org/dsa/introduction-to-branch-and-bound-data-structures-and-algorithms-tutorial/) — accessed 2026-11-01
- [Branch and Bound Algorithm](https://www.geeksforgeeks.org/dsa/branch-and-bound-algorithm/) — accessed 2026-11-01
- [Difference between Backtracking and Branch-N-Bound Technique](https://www.geeksforgeeks.org/dsa/difference-between-backtracking-and-branch-n-bound-technique/) — accessed 2026-11-01

**TpointTech**

- [Backtracking Introduction](https://www.tpointtech.com/backtracking-introduction) — accessed 2026-11-02
- [Branch and Bound](https://www.tpointtech.com/branch-and-bound) — accessed 2026-11-02
- [Branch and Bound vs Backtracking](https://www.tpointtech.com/branch-and-bound-vs-backtracking) — accessed 2026-11-02
- [N Queens Problems](https://www.tpointtech.com/n-queens-problems) — accessed 2026-11-02

**Programiz**

- [Backtracking Algorithm](https://www.programiz.com/dsa/backtracking-algorithm) — accessed 2026-11-01
