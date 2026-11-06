---
description: Greedy algorithms - definition, components, greedy-choice property and optimal substructure, greedy vs dynamic programming, and the fractional knapsack, activity selection, task (job) scheduling with deadlines and coin changing problems, with worked examples and C programs.
updated: 2026-11-02
---

## Introduction to Greedy Algorithms {#introduction-to-greedy-algorithms}

### Definition

A **greedy algorithm** solves an **optimization problem** (a problem of finding the maximum or minimum of something) by building the solution **step by step**, and at each step making the choice that **looks best at that moment** (the **locally optimal** choice), hoping that these choices lead to the **globally optimal** solution.

A greedy algorithm **never reconsiders** a choice once it has been made (no backtracking).

### Components of a Greedy Algorithm

1. **Candidate set:** the items from which the solution is built.
2. **Selection function:** chooses the best candidate to add next.
3. **Feasibility function:** checks whether a candidate can be added without breaking the constraints.
4. **Objective function:** gives the value of a solution (the quantity to maximise or minimise).
5. **Solution function:** checks whether a complete solution has been reached.

### General Steps

1. Start with an empty solution.
2. From the remaining candidates, **select the best** one according to the selection rule.
3. If it is **feasible**, add it to the solution; otherwise discard it.
4. Repeat until a complete solution is reached or no candidates remain.

### Advantages and Disadvantages

**Advantages:**

1. **Simple** to design and implement.
2. **Efficient**: usually fast (often dominated by an O(n log n) sort).
3. Gives good approximate solutions for some hard problems (for example, a nearest-neighbour tour for the travelling salesman problem).

**Disadvantages:**

1. It **does not always give the optimal solution**; it works only for problems that have the **greedy-choice property** and **optimal substructure**.
2. A bad early choice can never be corrected.
3. Proving that a greedy algorithm is correct can be difficult.

### Examples of Greedy Algorithms

1. Fractional knapsack problem
2. Activity selection problem
3. Job sequencing (task scheduling) with deadlines
4. Coin changing (for standard coin systems)
5. **Huffman coding** ([Huffman Coding](/topics/data-structures-algorithms/huffman-coding))
6. **Prim's** and **Kruskal's** minimum spanning tree algorithms ([Minimum Spanning Trees](/topics/data-structures-algorithms/minimum-spanning-trees))
7. **Dijkstra's** shortest path algorithm ([Shortest Path Algorithms](/topics/data-structures-algorithms/shortest-path-algorithms#single-source-shortest-paths))
8. Optimal merge pattern

## Greedy-Choice Property {#greedy-choice-property}

**The greedy-choice property** is the property of a problem that a **globally optimal solution can be reached by making locally optimal (greedy) choices**.

A greedy algorithm gives the optimal answer only when the problem has these two properties:

1. **Greedy-choice property:** a **globally optimal solution can be reached by making locally optimal (greedy) choices**. The choice made at each step depends only on the choices made so far, not on the solutions of future sub-problems. In other words, there is always an optimal solution that **contains the greedy choice**.
2. **Optimal substructure:** an optimal solution to the problem **contains optimal solutions to its sub-problems**. After the greedy choice is made, what remains is a smaller problem of the same kind, which is again solved optimally.

**Proving the greedy-choice property (exchange argument):** take any optimal solution; if it does not contain the greedy choice, **exchange** one of its elements for the greedy choice and show that the solution is still feasible and no worse. Then an optimal solution with the greedy choice exists.

**Example — activity selection:** choosing the activity that **finishes first** is safe: in any optimal schedule, the first activity can be replaced by the earliest-finishing activity without causing any overlap, so the number of activities stays the same.

**When the property fails — coin changing with coins {1, 7, 10} and amount 15:**

1. Greedy (largest coin first): 10 + 1 + 1 + 1 + 1 + 1 = **6 coins**.
2. Optimal: 7 + 7 + 1 = **3 coins**.

Taking the largest coin (10) is not part of any optimal solution, so the greedy algorithm fails; dynamic programming is needed.

## Greedy vs Dynamic Programming {#greedy-vs-dynamic-programming}

Both methods need **optimal substructure**, but they make their choices differently:

1. A **greedy** algorithm makes **one choice** at each step (the best-looking one) and then solves the single remaining sub-problem. It is **top-down** and never goes back.
2. **Dynamic programming** considers **all choices** at each step, solving every **overlapping** sub-problem once and storing the result, and then picks the best. It is usually **bottom-up** (or top-down with memoization).

| Basis | Greedy Method | Dynamic Programming |
| --- | --- | --- |
| Choice at each step | The **locally best** choice, made immediately | Chosen after **comparing the solutions of sub-problems** |
| Optimal solution | **Not guaranteed** (only if the greedy-choice property holds) | **Guaranteed** (when the principle of optimality holds) |
| Sub-problems | Solves only one sub-problem after each choice; no reuse | Solves **overlapping** sub-problems once and **reuses** stored results |
| Going back | Never reconsiders a choice | Effectively considers all possibilities |
| Memory | Little (no table) | More (a table of sub-problem results) |
| Speed and simplicity | Faster and simpler | Slower and more complex |
| Required properties | Greedy-choice property + optimal substructure | Optimal substructure + overlapping sub-problems |
| Examples | Fractional knapsack, MST (Prim, Kruskal), Dijkstra, Huffman coding, activity selection | **0/1 knapsack**, Fibonacci numbers, LCS, matrix chain multiplication, Floyd–Warshall |

**Fractional vs 0/1 knapsack:** the **fractional** knapsack problem (items may be broken) is solved optimally by the greedy method, but the **0/1** knapsack problem (each item taken whole or not at all) is **not**; it needs dynamic programming. For example, with capacity 50 and items (value, weight) = (60, 10), (100, 20), (120, 30), greedy by ratio would take the first two items whole for a value of 160, but the best 0/1 choice is the second and third items, with value **220**.

## Fractional Knapsack Problem {#fractional-knapsack-problem}

### Problem

**The fractional knapsack problem** is the problem of filling a knapsack of limited weight capacity with items, which may be broken into fractions, so that the total value is maximum.

There are n items, each with a **value vᵢ** and a **weight wᵢ**, and a knapsack (bag) that can carry a maximum weight **W**. Items **can be broken into fractions**. Find the **maximum total value** that can be put into the knapsack.

### Greedy Algorithm

1. Compute the **value-to-weight ratio vᵢ / wᵢ** (value per unit weight) of each item.
2. **Sort** the items in **decreasing order of ratio**.
3. Take items in this order: if the whole item fits, take all of it; otherwise take the **fraction** that fills the remaining capacity, and stop.

### Example

Capacity W = 50; items (value, weight): (60, 10), (100, 20), (120, 30).

| Item | Value | Weight | Ratio v/w |
| --- | --- | --- | --- |
| 1 | 60 | 10 | 6 |
| 2 | 100 | 20 | 5 |
| 3 | 120 | 30 | 4 |

1. Take all of item 1: weight 10, value 60 (40 left).
2. Take all of item 2: weight 20, value 100 (20 left).
3. Item 3 needs 30, but only 20 is left → take **20/30 = 2/3** of it: value 2/3 × 120 = 80.

**Maximum value = 60 + 100 + 80 = 240.**

### Program

```c
#include <stdio.h>

int main(void)
{
    double v[] = {60, 100, 120}, w[] = {10, 20, 30}, W = 50, total = 0;
    int n = 3;

    for (int i = 0; i < n - 1; i++)            /* sort by v/w, descending */
        for (int j = 0; j < n - 1 - i; j++)
            if (v[j] / w[j] < v[j + 1] / w[j + 1])
            {
                double t = v[j]; v[j] = v[j + 1]; v[j + 1] = t;
                t = w[j]; w[j] = w[j + 1]; w[j + 1] = t;
            }

    for (int i = 0; i < n && W > 0; i++)
    {
        if (w[i] <= W) { total += v[i]; W -= w[i]; }          /* whole item */
        else { total += v[i] * (W / w[i]); W = 0; }           /* fraction */
    }
    printf("Maximum value = %.2f\n", total);
    return 0;
}
```

Output: `Maximum value = 240.00`

**Complexity:** **O(n log n)** for sorting (the simple sort above is O(n²)); the selection loop is O(n).

## Activity Selection Problem {#activity-selection-problem}

### Problem

**The activity selection problem** is the problem of selecting the maximum number of non-overlapping activities that can be performed by a single resource that does only one activity at a time.

There are n activities, each with a **start time** sᵢ and a **finish time** fᵢ, and one resource (for example, a person or a room) that can do **only one activity at a time**. Select the **maximum number of activities** that do not overlap.

### Greedy Algorithm

1. **Sort** the activities by **finish time** (earliest first).
2. **Select the first** activity.
3. For each next activity: if its **start time ≥ the finish time of the last selected activity**, select it.

Choosing the activity that finishes earliest leaves the **most time** for the remaining activities.

(Here an activity may start at the moment the previous one finishes. If the problem says the next start must be **strictly greater** than the previous finish, use > instead of ≥; in the example below the answer is the same.)

### Example

| Activity | A1 | A2 | A3 | A4 | A5 | A6 |
| --- | --- | --- | --- | --- | --- | --- |
| Start | 1 | 3 | 0 | 5 | 8 | 5 |
| Finish | 2 | 4 | 6 | 7 | 9 | 9 |

The activities are already sorted by finish time.

| Activity | (start, finish) | Last finish | Decision |
| --- | --- | --- | --- |
| A1 | (1, 2) | — | **Select** (first) |
| A2 | (3, 4) | 2 | 3 ≥ 2 → **Select** |
| A3 | (0, 6) | 4 | 0 < 4 → Reject |
| A4 | (5, 7) | 4 | 5 ≥ 4 → **Select** |
| A5 | (8, 9) | 7 | 8 ≥ 7 → **Select** |
| A6 | (5, 9) | 9 | 5 < 9 → Reject |

**Selected: A1, A2, A4, A5 — 4 activities.**

### Program

```c
#include <stdio.h>

int main(void)
{
    int s[] = {1, 3, 0, 5, 8, 5}, f[] = {2, 4, 6, 7, 9, 9}, n = 6;  /* sorted by finish */
    int last = 0, count = 1;

    printf("Selected: A1");
    for (int i = 1; i < n; i++)
        if (s[i] >= f[last])                 /* does not overlap */
        {
            printf(" A%d", i + 1);
            last = i;
            count++;
        }
    printf("\nTotal = %d\n", count);
    return 0;
}
```

Output:

```text
Selected: A1 A2 A4 A5
Total = 4
```

**Complexity:** **O(n log n)** (sorting by finish time); O(n) if the activities are already sorted.

## Task Scheduling Problem {#task-scheduling-problem}

### Problem (Job Sequencing with Deadlines)

**The task scheduling problem (job sequencing with deadlines)** is the problem of ordering unit-time tasks, each with a deadline and a profit, on one processor so that the total profit of the tasks finished by their deadlines is maximum.

There are n **tasks (jobs)**. Each task takes **one unit of time**, has a **deadline** dᵢ and a **profit** pᵢ that is earned only if the task is **finished by its deadline**. Only one task can run at a time. Find a schedule that gives the **maximum total profit**.

(The same problem is often stated with a **penalty** for each task that misses its deadline — see the next part.)

### Greedy Algorithm

1. **Sort** the tasks in **decreasing order of profit**.
2. Create time slots 1, 2, …, up to the largest deadline, all initially free.
3. For each task in this order, put it in the **latest free slot on or before its deadline**; if no such slot is free, **skip** the task.

Putting a task as **late** as possible keeps the earlier slots free for tasks with earlier deadlines.

### Example

| Job | J1 | J2 | J3 | J4 | J5 |
| --- | --- | --- | --- | --- | --- |
| Deadline | 2 | 1 | 2 | 1 | 3 |
| Profit | 100 | 19 | 27 | 25 | 15 |

Sorted by profit: J1 (100), J3 (27), J4 (25), J2 (19), J5 (15).

| Job | Deadline | Slot chosen | Schedule (slots 1, 2, 3) |
| --- | --- | --- | --- |
| J1 | 2 | Slot 2 | –, J1, – |
| J3 | 2 | Slot 2 taken → slot 1 | J3, J1, – |
| J4 | 1 | Slot 1 taken → skip | J3, J1, – |
| J2 | 1 | Slot 1 taken → skip | J3, J1, – |
| J5 | 3 | Slot 3 | J3, J1, J5 |

**Schedule: J3, J1, J5 — total profit = 27 + 100 + 15 = 142.**

### Program

```c
#include <stdio.h>

int main(void)
{
    /* jobs already sorted by profit: J1, J3, J4, J2, J5 */
    char *id[] = {"J1", "J3", "J4", "J2", "J5"};
    int deadline[] = {2, 2, 1, 1, 3}, profit[] = {100, 27, 25, 19, 15};
    int n = 5, maxd = 3, slot[4] = {-1, -1, -1, -1}, total = 0;

    for (int i = 0; i < n; i++)
        for (int t = deadline[i]; t >= 1; t--)    /* latest free slot */
            if (slot[t] == -1)
            {
                slot[t] = i;
                total += profit[i];
                break;
            }

    printf("Schedule:");
    for (int t = 1; t <= maxd; t++)
        if (slot[t] != -1) printf(" %s", id[slot[t]]);
    printf("\nTotal profit = %d\n", total);
    return 0;
}
```

Output:

```text
Schedule: J3 J1 J5
Total profit = 142
```

**Complexity:** O(n log n) for sorting plus O(n × d) for finding slots (d = largest deadline), so **O(n²)** in the worst case; it can be reduced to O(n log n) with a disjoint-set (union–find) structure.

### Task Scheduling with Deadlines and Penalties

In the textbook form of the **task-scheduling problem**, there are n **unit-time tasks** on one processor; task i has a **deadline dᵢ** and a **penalty wᵢ**, which must be paid if the task finishes **after** its deadline. The goal is a schedule with the **minimum total penalty**. (Minimising the penalty of late tasks is the same as maximising the total penalty of on-time tasks, so it is the job-sequencing problem above with "profit" replaced by "penalty".)

**Greedy algorithm:**

1. Sort the tasks in **decreasing order of penalty**.
2. Take the tasks one by one and add a task to the set A of **on-time tasks** if A stays **independent** — that is, for every t = 1, 2, …, n, the number of tasks in A with deadline ≤ t is **at most t** (they can all be finished by their deadlines). Otherwise the task will be late.
3. Schedule the tasks of A in increasing order of deadline, followed by the late tasks in any order.

**Example:** 7 tasks:

| Task | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Deadline dᵢ | 4 | 2 | 4 | 3 | 1 | 4 | 6 |
| Penalty wᵢ | 70 | 60 | 50 | 40 | 30 | 20 | 10 |

(The tasks are already in decreasing order of penalty.)

| Task | Set A if accepted | Check | Decision |
| --- | --- | --- | --- |
| 1 | {1} | — | Accept |
| 2 | {1, 2} | — | Accept |
| 3 | {1, 2, 3} | — | Accept |
| 4 | {1, 2, 3, 4} | 4 tasks with deadline ≤ 4 | Accept |
| 5 | {1, 2, 3, 4, 5} | 5 tasks with deadline ≤ 4 > 4 | **Reject** (late) |
| 6 | {1, 2, 3, 4, 6} | 5 tasks with deadline ≤ 4 > 4 | **Reject** (late) |
| 7 | {1, 2, 3, 4, 7} | ≤ 4 tasks by time 4, 5 by time 6 | Accept |

**Optimal schedule: 2, 4, 1, 3, 7, 5, 6** (on-time tasks by deadline, then the late tasks 5 and 6). **Minimum total penalty = w₅ + w₆ = 30 + 20 = 50.** (Checking all 7! orders gives the same minimum.)

## Coin Changing Problem {#coin-changing-problem}

### Problem

**The coin changing problem** is the problem of making a given amount from given coin denominations, each available in unlimited supply, using the **minimum number of coins**.

### Greedy Algorithm

Repeatedly take the **largest coin that is not larger than the remaining amount**, until the amount becomes 0.

### Example

Denominations {1, 2, 5, 10}, amount **39**:

1. 39 → take 10, 10, 10 (remaining 9)
2. 9 → take 5 (remaining 4)
3. 4 → take 2, 2 (remaining 0)

**Coins: 10 + 10 + 10 + 5 + 2 + 2 = 39 → 6 coins.**

### Program

```c
#include <stdio.h>

int main(void)
{
    int coins[] = {10, 5, 2, 1}, k = 4, amount = 39, count = 0;

    printf("Coins:");
    for (int i = 0; i < k; i++)
        while (amount >= coins[i])          /* largest coin that fits */
        {
            amount -= coins[i];
            printf(" %d", coins[i]);
            count++;
        }
    printf("\nNumber of coins = %d\n", count);
    return 0;
}
```

Output:

```text
Coins: 10 10 10 5 2 2
Number of coins = 6
```

**Complexity:** O(k + number of coins used), where k is the number of denominations (plus O(k log k) if the denominations must first be sorted).

### When Greedy Coin Changing Fails

The greedy method is optimal for **canonical** coin systems such as {1, 2, 5, 10} (and most real currencies), but **not for every set** of denominations:

| Denominations | Amount | Greedy result | Optimal result |
| --- | --- | --- | --- |
| {1, 7, 10} | 15 | 10 + 1+1+1+1+1 = **6 coins** | 7 + 7 + 1 = **3 coins** |
| {1, 10, 18} | 20 | 18 + 1 + 1 = **3 coins** | 10 + 10 = **2 coins** |

For arbitrary denominations, the minimum-coin problem is solved with **dynamic programming**.

## References {#references}

**GeeksforGeeks**

- [Greedy Algorithm Tutorial](https://www.geeksforgeeks.org/dsa/introduction-to-greedy-algorithm-data-structures-and-algorithm-tutorials/) — accessed 2026-11-01
- [Greedy Approach vs Dynamic Programming](https://www.geeksforgeeks.org/dsa/greedy-approach-vs-dynamic-programming/) — accessed 2026-11-01
- [Fractional Knapsack Problem](https://www.geeksforgeeks.org/dsa/fractional-knapsack-problem/) — accessed 2026-11-01
- [Activity Selection Problem](https://www.geeksforgeeks.org/dsa/activity-selection-problem-greedy-algo-1/) — accessed 2026-11-01
- [Job Sequencing Problem](https://www.geeksforgeeks.org/dsa/job-sequencing-problem/) — accessed 2026-11-01
- [Greedy Algorithm to Find Minimum Number of Coins](https://www.geeksforgeeks.org/dsa/greedy-algorithm-to-find-minimum-number-of-coins/) — accessed 2026-11-01

**TutorialsPoint**

- [Greedy Algorithms](https://www.tutorialspoint.com/data_structures_algorithms/greedy_algorithms.htm) — accessed 2026-11-01
- [Job Sequencing with Deadline](https://www.tutorialspoint.com/data_structures_algorithms/job_sequencing_with_deadline.htm) — accessed 2026-11-02

**TpointTech**

- [Activity Selection Problem](https://www.tpointtech.com/activity-selection-problem) — accessed 2026-11-02
- [Fractional Knapsack Problem](https://www.tpointtech.com/fractional-knapsack-problem) — accessed 2026-11-02
- [Activity or Task Scheduling Problem](https://www.tpointtech.com/activity-or-task-scheduling-problem) — accessed 2026-11-02
- [Dynamic Programming vs Greedy Method](https://www.tpointtech.com/dynamic-programming-vs-greedy-method) — accessed 2026-11-02

**Programiz**

- [Greedy Algorithm](https://www.programiz.com/dsa/greedy-algorithm) — accessed 2026-11-01
