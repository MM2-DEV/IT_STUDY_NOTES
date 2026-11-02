---
description: Flow networks - source, sink, capacity and flow, the capacity and conservation constraints, residual graphs and augmenting paths, cuts and the max-flow min-cut theorem, and the maximum flow problem solved by the Ford-Fulkerson method and the Edmonds-Karp algorithm, with a worked example and C program.
updated: 2026-11-01
---

## Flow Networks {#flow-networks}

### Definition

A **flow network** is a **directed graph** G = (V, E) in which:

1. Each edge (u, v) has a non-negative **capacity c(u, v)**: the **maximum amount** that can flow through the edge (for example, litres of water per second through a pipe, or cars per hour on a road).
2. There are two special vertices: the **source (s)**, where the flow starts, and the **sink (t)**, where the flow ends.

A **flow** f assigns to each edge an amount **f(u, v)** that is actually sent through it.

### Constraints on a Flow

1. **Capacity constraint:** the flow on an edge cannot exceed its capacity: **0 ≤ f(u, v) ≤ c(u, v)**.
2. **Flow conservation:** for every vertex **except the source and the sink**, the **total flow entering = the total flow leaving** (nothing is stored or created inside the network).

The **value of the flow** is the total amount leaving the source (which equals the total amount entering the sink).

![Flow network from S to T; each edge shows flow/capacity for a maximum flow of 19, and a dashed line marks a minimum cut of capacity 19](/diagrams/data-structures-algorithms/flow-network.svg)

In the figure, each label is **flow/capacity**. For example, at vertex D, the flow entering is 6 (from A) + 9 (from C) = 15, and the flow leaving is 5 (to B) + 10 (to T) = 15, so flow is conserved.

### Residual Graph and Augmenting Paths

1. **Residual capacity** of an edge = **capacity − current flow**: the extra amount that can still be sent through it.
2. The **residual graph** contains the edges that still have residual capacity. For every edge (u, v) that carries flow, it also contains a **reverse edge (v, u)** whose capacity equals that flow; sending flow along a reverse edge means **cancelling (undoing)** some of the flow on (u, v) so that it can be rerouted.
3. An **augmenting path** is a path from the **source to the sink in the residual graph**. Its **bottleneck** is the smallest residual capacity on the path; that amount can be added to the flow.

### Cuts and the Max-Flow Min-Cut Theorem

1. An **s–t cut** divides the vertices into two sets: S containing the source and T containing the sink.
2. The **capacity of the cut** is the **sum of the capacities of the edges going from S to T**.
3. **Max-flow min-cut theorem:** the **maximum value of a flow** from s to t **equals the minimum capacity of an s–t cut**.

In the figure, the cut S = {S, C}, T = {A, B, D, T} is crossed (from S to T) by the edges S→A (10) and C→D (9), so its capacity is 19 — exactly the maximum flow.

### Applications of Flow Networks

1. **Network routing**: maximising the data that can be sent through a communication network.
2. **Transportation**: moving goods or vehicles through road or rail networks.
3. **Water, oil and gas pipelines** and electrical distribution.
4. **Bipartite matching** and **job assignment** (assigning workers to jobs).
5. Supply chain and distribution planning.

## Max-Flow Problem {#max-flow-problem}

### The Problem

The **maximum flow problem** is to find the **largest possible flow from the source to the sink** that satisfies the capacity and conservation constraints.

### Ford–Fulkerson Method

The **Ford–Fulkerson method** was published by **L. R. Ford Jr. and D. R. Fulkerson** in **1956**. It is a **greedy** method that keeps adding flow along augmenting paths:

1. Start with **zero flow** on every edge.
2. While there is an **augmenting path** from the source to the sink in the **residual graph**:
   1. Find the **bottleneck** (minimum residual capacity) b on the path.
   2. **Add b** to the flow on every edge of the path (and update the residual graph, including the reverse edges).
   3. Add b to the total flow.
3. When no augmenting path remains, the flow is **maximum**.

The **reverse edges** are essential: without them the method can stop at a flow that is not maximum.

### Edmonds–Karp Algorithm

The **Edmonds–Karp algorithm** is the Ford–Fulkerson method in which each augmenting path is found by **breadth-first search (BFS)**, so the **shortest** augmenting path (fewest edges) is always used.

### Example

Find the maximum flow from S to T in the network of the figure (capacities: S→A 10, S→C 10, A→B 4, A→C 2, A→D 8, C→D 9, D→B 6, B→T 10, D→T 10), choosing augmenting paths by BFS:

| Iteration | Augmenting path | Bottleneck | Total flow |
| --- | --- | --- | --- |
| 1 | S → A → B → T | 4 (A→B) | 4 |
| 2 | S → A → D → T | 6 (S→A has 10 − 4 = 6 left) | 10 |
| 3 | S → C → D → T | 4 (D→T has 10 − 6 = 4 left) | 14 |
| 4 | S → C → D → B → T | 5 (C→D has 9 − 4 = 5 left) | **19** |

After iteration 4, no augmenting path exists (S→A and C→D are full), so the **maximum flow is 19**. This equals the capacity of the cut {S, C} | {A, B, D, T}, 10 + 9 = 19, as the max-flow min-cut theorem says.

### Program (Edmonds–Karp)

```c
#include <stdio.h>
#include <string.h>
#define N 6                      /* S=0, A=1, B=2, C=3, D=4, T=5 */

int r[N][N];                     /* residual capacities */

int bfs(int s, int t, int parent[])
{
    int visited[N] = {0}, queue[N], front = 0, rear = 0;
    queue[rear++] = s; visited[s] = 1; parent[s] = -1;
    while (front < rear)
    {
        int u = queue[front++];
        for (int v = 0; v < N; v++)
            if (!visited[v] && r[u][v] > 0)
            {
                parent[v] = u; visited[v] = 1; queue[rear++] = v;
            }
    }
    return visited[t];           /* 1 if an augmenting path exists */
}

int main(void)
{
    r[0][1] = 10; r[0][3] = 10; r[1][2] = 4; r[1][3] = 2; r[1][4] = 8;
    r[3][4] = 9;  r[4][2] = 6;  r[2][5] = 10; r[4][5] = 10;

    int parent[N], maxFlow = 0;
    while (bfs(0, 5, parent))
    {
        int b = 1000000;
        for (int v = 5; v != 0; v = parent[v])           /* bottleneck */
            if (r[parent[v]][v] < b) b = r[parent[v]][v];
        for (int v = 5; v != 0; v = parent[v])
        {
            r[parent[v]][v] -= b;                       /* forward edge */
            r[v][parent[v]] += b;                       /* reverse edge */
        }
        maxFlow += b;
        printf("Augmented by %d, total %d\n", b, maxFlow);
    }
    printf("Maximum flow = %d\n", maxFlow);
    return 0;
}
```

Output:

```text
Augmented by 4, total 4
Augmented by 6, total 10
Augmented by 4, total 14
Augmented by 5, total 19
Maximum flow = 19
```

### Complexity

1. **Ford–Fulkerson** with integer capacities: **O(E × f\*)**, where f\* is the value of the maximum flow (each augmentation adds at least 1 unit and takes O(E) time). With irrational capacities it may not terminate.
2. **Edmonds–Karp:** **O(V × E²)**, independent of the size of the flow.

### Other Maximum Flow Algorithms

1. **Dinic's algorithm**
2. **Push–relabel algorithm**

## References {#references}

**GeeksforGeeks**

- [Max Flow Problem Introduction](https://www.geeksforgeeks.org/dsa/max-flow-problem-introduction/) — accessed 2026-11-01
- [Ford-Fulkerson Algorithm for Maximum Flow Problem](https://www.geeksforgeeks.org/dsa/ford-fulkerson-algorithm-for-maximum-flow-problem/) — accessed 2026-11-01

**TutorialsPoint**

- [Flow Networks](https://www.tutorialspoint.com/data_structures_algorithms/flow_networks.htm) — accessed 2026-11-02
- [Augmenting Path Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/augmenting_path_algorithm.htm) — accessed 2026-11-02
- [Network Flow Problems](https://www.tutorialspoint.com/data_structures_algorithms/network_flow_problems.htm) — accessed 2026-11-02
- [Maxflow Mincut Theorem](https://www.tutorialspoint.com/data_structures_algorithms/maxflow_mincut_theorem.htm) — accessed 2026-11-02

**TpointTech**

- [Ford-Fulkerson Algorithm](https://www.tpointtech.com/ford-fulkerson-algorithm) — accessed 2026-11-02

**Programiz**

- [Ford-Fulkerson Algorithm](https://www.programiz.com/dsa/ford-fulkerson-algorithm) — accessed 2026-11-01

**Additional sources**

- [Ford–Fulkerson algorithm](https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm) — Wikipedia (authors and year, O(E f) and Edmonds–Karp O(VE²) bounds; not given by the reference websites) — accessed 2026-11-01
- [Max-flow min-cut theorem](https://en.wikipedia.org/wiki/Max-flow_min-cut_theorem) — Wikipedia (cuts and the theorem; not covered by the reference websites) — accessed 2026-11-01
