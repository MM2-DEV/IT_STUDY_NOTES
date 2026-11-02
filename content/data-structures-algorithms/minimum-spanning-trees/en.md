---
description: Spanning trees and minimum spanning trees - properties, Cayley's formula, Kruskal's algorithm with union-find and Prim's algorithm, with a worked example, C programs, complexities and the Prim vs Kruskal comparison.
updated: 2026-11-01
---

## Spanning Trees and Minimum Spanning Trees {#spanning-trees-and-minimum-spanning-trees}

### Spanning Tree

A **spanning tree** of a **connected, undirected graph** G is a **subgraph** that:

1. includes **all the vertices** of G,
2. is a **tree** — connected and with **no cycles**,
3. uses the **minimum number of edges**, which is **n − 1** for n vertices.

**Properties:**

1. A connected graph has **at least one** spanning tree; a **disconnected** graph has **none** (it has a spanning forest instead).
2. Every spanning tree of a graph with n vertices has exactly **n − 1 edges**.
3. A spanning tree is **minimally connected**: removing any edge disconnects it.
4. It is **maximally acyclic**: adding any edge creates a cycle.
5. A **complete graph** with n vertices has **n^(n−2)** spanning trees (**Cayley's formula**). Examples: n = 4 → 4² = **16** spanning trees; n = 5 → 5³ = **125** spanning trees.
6. A spanning tree of a connected graph with **e edges** and **n vertices** is obtained by **removing e − n + 1 edges** (it keeps n − 1 of the e edges). Example: a connected graph with 6 vertices and 9 edges → remove 9 − 6 + 1 = **4** edges.

### Minimum Spanning Tree (MST)

A **minimum spanning tree** of a **connected, weighted, undirected graph** is a spanning tree whose **sum of edge weights is as small as possible**.

1. An MST has **n − 1 edges** and no cycles.
2. A graph can have **more than one MST** when some edges have equal weights, but all of them have the same total weight. If all edge weights are **distinct**, the MST is **unique**.
3. The two best-known MST algorithms, **Kruskal's** and **Prim's**, are both **greedy algorithms**: at each step they take the cheapest edge that keeps the result a valid tree.

![Weighted graph with vertices A to F; the thick edges E–F, B–D, A–C, B–C and D–F form the minimum spanning tree of weight 15](/diagrams/data-structures-algorithms/mst-example.svg)

### Applications

1. Designing **networks** at the lowest cost: telecommunication, computer, electrical grid, water supply and road networks.
2. Computer network routing protocols (for example, the spanning tree protocol in LANs).
3. Cluster analysis.
4. Approximation algorithms, for example for the travelling salesman problem.
5. Finding paths on maps.

## Kruskal's Algorithm {#kruskal-s-algorithm}

### Idea

**Kruskal's algorithm** builds the MST by adding edges in **increasing order of weight**, skipping any edge that would form a **cycle**. At the start every vertex is a separate tree (a forest); the chosen edges join the trees together until a single tree remains.

### Algorithm

1. **Sort all edges** in increasing order of weight.
2. Take the **smallest remaining edge** (u, v).
3. If u and v are in **different trees** (the edge does not form a cycle), **add** the edge to the MST and merge the two trees; otherwise **reject** it.
4. Repeat steps 2–3 until the MST has **n − 1 edges**.

The cycle check is done with the **union–find (disjoint set)** data structure: **find(x)** returns the representative of x's set, and **union(x, y)** merges two sets. An edge (u, v) forms a cycle exactly when find(u) = find(v).

### Example

For the graph in the figure (6 vertices, so the MST needs 5 edges):

| Order | Edge | Weight | Decision |
| --- | --- | --- | --- |
| 1 | E–F | 1 | **Accept** |
| 2 | B–D | 2 | **Accept** |
| 3 | A–C | 3 | **Accept** |
| 4 | B–C | 4 | **Accept** (joins {A, C} and {B, D}) |
| 5 | D–F | 5 | **Accept** (joins {A, B, C, D} and {E, F}); 5 edges — stop |
| — | A–B (6), C–D (7), C–E (8), D–E (9) | — | Not needed (each would form a cycle) |

**MST edges:** E–F, B–D, A–C, B–C, D–F. **Total weight = 1 + 2 + 3 + 4 + 5 = 15.**

### Program

```c
#include <stdio.h>
#include <stdlib.h>

struct edge { int u, v, w; };
int parent[10];

int find(int x)                                  /* representative of x's set */
{
    while (parent[x] != x) x = parent[x];
    return x;
}

int cmp(const void *a, const void *b)
{
    return ((struct edge *) a)->w - ((struct edge *) b)->w;
}

int main(void)
{
    /* vertices A..F = 0..5 */
    struct edge e[] = {{0,1,6}, {0,2,3}, {1,2,4}, {1,3,2}, {2,3,7},
                       {2,4,8}, {3,4,9}, {3,5,5}, {4,5,1}};
    int n = 6, m = 9, count = 0, total = 0;

    for (int i = 0; i < n; i++) parent[i] = i;
    qsort(e, m, sizeof(struct edge), cmp);       /* sort by weight */

    for (int i = 0; i < m && count < n - 1; i++)
    {
        int a = find(e[i].u), b = find(e[i].v);
        if (a != b)                              /* no cycle */
        {
            parent[a] = b;                       /* union */
            printf("%c-%c  %d\n", 'A' + e[i].u, 'A' + e[i].v, e[i].w);
            total += e[i].w;
            count++;
        }
    }
    printf("Total weight = %d\n", total);
    return 0;
}
```

Output:

```text
E-F  1
B-D  2
A-C  3
B-C  4
D-F  5
Total weight = 15
```

### Complexity

1. Sorting the edges takes **O(E log E)**; the union–find operations take almost constant time each.
2. Total: **O(E log E)**, which is the same as **O(E log V)** (because E ≤ V²).
3. Space: O(V + E).

Kruskal's algorithm works well for **sparse** graphs and needs only an **edge list**.

## Prim's Algorithm {#prim-s-algorithm}

### Idea

**Prim's algorithm** grows the MST **from a starting vertex**, one vertex at a time. At each step it adds the **cheapest edge that connects a vertex in the tree to a vertex outside the tree**. Because the tree always stays connected and an edge to a vertex already in the tree is never chosen, no cycle can form.

### Algorithm

1. Start with any vertex in the tree.
2. Among all edges with **one end in the tree and the other end outside**, choose the one with the **minimum weight**.
3. Add that edge and its outside vertex to the tree.
4. Repeat steps 2–3 until **all vertices** are in the tree (n − 1 edges).

In practice each outside vertex keeps a **key** = the weight of the cheapest edge joining it to the tree; at each step the vertex with the smallest key is added (using a **min-priority queue**), and the keys of its neighbours are updated.

### Example

For the same graph, starting at **A**:

| Step | Tree vertices | Cheapest edge leaving the tree | Added |
| --- | --- | --- | --- |
| 1 | A | A–C (3) (other: A–B 6) | C |
| 2 | A, C | B–C (4) (others: A–B 6, C–D 7, C–E 8) | B |
| 3 | A, B, C | B–D (2) | D |
| 4 | A, B, C, D | D–F (5) (others: C–E 8, D–E 9) | F |
| 5 | A, B, C, D, F | E–F (1) | E |

**MST edges:** A–C, B–C, B–D, D–F, E–F. **Total weight = 15** — the same tree as Kruskal's algorithm found, though the edges were added in a different order.

### Program

```c
#include <stdio.h>
#define N 6
#define INF 9999

int g[N][N] = {          /* A  B  C  D  E  F  (0 = no edge) */
    {0, 6, 3, 0, 0, 0},  /* A */
    {6, 0, 4, 2, 0, 0},  /* B */
    {3, 4, 0, 7, 8, 0},  /* C */
    {0, 2, 7, 0, 9, 5},  /* D */
    {0, 0, 8, 9, 0, 1},  /* E */
    {0, 0, 0, 5, 1, 0}   /* F */
};

int main(void)
{
    int key[N], parent[N], inTree[N], total = 0;
    for (int i = 0; i < N; i++) { key[i] = INF; inTree[i] = 0; parent[i] = -1; }
    key[0] = 0;                                   /* start at A */

    for (int k = 0; k < N; k++)
    {
        int u = -1;
        for (int i = 0; i < N; i++)               /* vertex with the smallest key */
            if (!inTree[i] && (u == -1 || key[i] < key[u])) u = i;
        inTree[u] = 1;
        if (parent[u] != -1)
        {
            printf("%c-%c  %d\n", 'A' + parent[u], 'A' + u, key[u]);
            total += key[u];
        }
        for (int v = 0; v < N; v++)               /* update neighbours' keys */
            if (g[u][v] && !inTree[v] && g[u][v] < key[v])
            {
                key[v] = g[u][v];
                parent[v] = u;
            }
    }
    printf("Total weight = %d\n", total);
    return 0;
}
```

Output:

```text
A-C  3
C-B  4
B-D  2
D-F  5
F-E  1
Total weight = 15
```

### Complexity

1. With an **adjacency matrix** and a simple search for the minimum key: **O(V²)** — good for **dense** graphs.
2. With an **adjacency list** and a **binary heap**: **O((V + E) log V)** = O(E log V).
3. With an adjacency list and a **Fibonacci heap**: **O(E + V log V)**.
3. Space: O(V) (plus the graph).

### Differences Between Prim's and Kruskal's Algorithms

| Basis | Prim's Algorithm | Kruskal's Algorithm |
| --- | --- | --- |
| Approach | Grows **one tree** from a starting vertex, one **vertex** at a time | Adds **edges** in increasing order of weight, joining a forest of trees |
| Starting point | Needs a **starting vertex** | No starting vertex; works on all edges |
| Edge chosen | Cheapest edge **joining the tree to an outside vertex** | Cheapest edge in the **whole graph** that does not form a cycle |
| Cycle prevention | Automatic (only edges to new vertices are taken) | Checked with **union–find** |
| Intermediate result | Always a **connected tree** | A **forest** (may be disconnected) until the end |
| Data structure | Min-priority queue (heap) | Sorted edge list + union–find |
| Graph representation | Adjacency matrix or list | Edge list |
| Time complexity | O(V²) (matrix); O(E log V) (heap) | O(E log E) = O(E log V) |
| Better for | **Dense** graphs | **Sparse** graphs |
| Disconnected graph | Gives the MST of one component only | Gives a minimum spanning forest |

## References {#references}

**GeeksforGeeks**

- [Kruskal's Minimum Spanning Tree Algorithm](https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/) — accessed 2026-11-01
- [Prim's Algorithm for Minimum Spanning Tree](https://www.geeksforgeeks.org/dsa/prims-minimum-spanning-tree-mst-greedy-algo-5/) — accessed 2026-11-01
- [Difference between Prim's and Kruskal's Algorithm for MST](https://www.geeksforgeeks.org/dsa/difference-between-prims-and-kruskals-algorithm-for-mst/) — accessed 2026-11-01

**TutorialsPoint**

- [Graph Data Structure (spanning tree and MST)](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm) — accessed 2026-11-01
- [Kruskal's Minimal Spanning Tree Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/kruskals_spanning_tree_algorithm.htm) — accessed 2026-11-01
- [Prim's Minimal Spanning Tree](https://www.tutorialspoint.com/data_structures_algorithms/prims_spanning_tree_algorithm.htm) — accessed 2026-11-01

**TpointTech**

- [Spanning Tree](https://www.tpointtech.com/spanning-tree) — accessed 2026-11-01
- [Kruskal's Algorithm](https://www.tpointtech.com/kruskal-algorithm) — accessed 2026-11-01
- [Prim's Algorithm](https://www.tpointtech.com/prim-algorithm) — accessed 2026-11-01

**Programiz**

- [Spanning Tree and Minimum Spanning Tree](https://www.programiz.com/dsa/spanning-tree-and-minimum-spanning-tree) — accessed 2026-11-01
- [Kruskal's Algorithm](https://www.programiz.com/dsa/kruskal-algorithm) — accessed 2026-11-01
- [Prim's Algorithm](https://www.programiz.com/dsa/prim-algorithm) — accessed 2026-11-01

**IT Job QnS**

- [Design and Analysis of Algorithm](https://it.jobqns.com/design-and-analysis-of-algorithm/) — accessed 2026-11-01
- [Data Structure](https://it.jobqns.com/data-structure/) — accessed 2026-11-01

**Additional sources**

- [Cayley's formula](https://en.wikipedia.org/wiki/Cayley%27s_formula) — Wikipedia — accessed 2026-11-01
