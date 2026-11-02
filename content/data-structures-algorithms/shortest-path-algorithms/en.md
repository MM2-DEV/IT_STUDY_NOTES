---
description: Shortest path problems - types (single-source, single-destination, single-pair, all-pairs), relaxation and negative cycles, Dijkstra's and Bellman-Ford algorithms for single-source shortest paths, and the Floyd-Warshall algorithm for all-pairs shortest paths, with worked examples, C programs and comparisons.
updated: 2026-11-01
---

## Shortest Path Problems {#shortest-path-problems}

### Definition

The **shortest path** from vertex u to vertex v in a **weighted graph** is the path from u to v with the **minimum total weight**, where the **length (weight) of a path** is the **sum of the weights** of its edges. (In an unweighted graph, it is the path with the fewest edges.)

**Example uses:** finding the shortest or fastest route on a map (GPS), routing packets in computer networks (routing protocols), telephone networks, social networks (degrees of separation).

### Types of Shortest Path Problems

1. **Single-source shortest paths:** find the shortest paths **from one source vertex to all other vertices**. Algorithms: **Dijkstra's**, **Bellman–Ford**, BFS (unweighted graphs), topological-order relaxation (DAGs).
2. **Single-destination shortest paths:** find the shortest paths **from all vertices to one destination** vertex. (It is solved as a single-source problem by reversing every edge.)
3. **Single-pair shortest path:** find the shortest path **between one given pair** of vertices (u, v). (It is usually solved by running a single-source algorithm from u.)
4. **All-pairs shortest paths:** find the shortest paths **between every pair** of vertices. Algorithms: **Floyd–Warshall**, Johnson's algorithm, or a single-source algorithm run from every vertex.

### Relaxation

Shortest-path algorithms keep an estimate **dist[v]** of the shortest distance from the source to each vertex v (initially 0 for the source and **∞** for every other vertex). **Relaxing** an edge (u, v) with weight w means checking whether going through u gives a shorter path to v:

```text
RELAX(u, v, w)
1. if dist[u] + w < dist[v] then
2.     dist[v] ← dist[u] + w
3.     prev[v] ← u            (remember the previous vertex on the path)
```

The algorithms differ in **the order in which they relax the edges**.

### Negative Edges and Negative Cycles

1. A **negative edge** has a weight less than 0 (for example, a gain or a refund).
2. A **negative cycle** is a cycle whose total weight is **negative**. If a negative cycle can be reached from the source, going around it again and again keeps reducing the path length, so **no shortest path exists**.
3. **Dijkstra's algorithm** does not work correctly with negative edges. **Bellman–Ford** and **Floyd–Warshall** allow negative edges, and Bellman–Ford can **detect** negative cycles.

## Single-Source Shortest Paths {#single-source-shortest-paths}

### 1. Dijkstra's Algorithm

**Dijkstra's algorithm** finds the shortest paths from one source to all other vertices in a graph with **non-negative edge weights**. It was conceived by **Edsger W. Dijkstra** in **1956** and published in **1959**. It is a **greedy algorithm**: at each step it permanently selects the unvisited vertex with the **smallest known distance**.

**Algorithm:**

1. Set dist[source] = 0 and dist[v] = ∞ for every other vertex; mark all vertices unvisited.
2. Pick the **unvisited vertex u with the smallest dist[u]** and mark it **visited** (its distance is now final).
3. **Relax** every edge (u, v) to an unvisited neighbour v.
4. Repeat steps 2–3 until all vertices are visited (or the smallest distance is ∞).

**Example:** directed graph with source **A**:

![Directed weighted graph A to E; shortest distances from A are A 0, B 3, C 1, D 4, E 7](/diagrams/data-structures-algorithms/dijkstra-example.svg)

| Step | Vertex selected | A | B | C | D | E |
| --- | --- | --- | --- | --- | --- | --- |
| Start | — | 0 | ∞ | ∞ | ∞ | ∞ |
| 1 | A (0) | **0** | 4 | 1 | ∞ | ∞ |
| 2 | C (1) | | 3 (via C: 1 + 2) | **1** | 6 | ∞ |
| 3 | B (3) | | **3** | | 4 (via B: 3 + 1) | ∞ |
| 4 | D (4) | | | | **4** | 7 |
| 5 | E (7) | | | | | **7** |

**Shortest paths from A:** B = 3 (A→C→B), C = 1 (A→C), D = 4 (A→C→B→D), E = 7 (A→C→B→D→E).

**Program:**

```c
#include <stdio.h>
#define N 5
#define INF 9999

int g[N][N] = {          /* A  B  C  D  E   (0 = no edge) */
    {0, 4, 1, 0, 0},     /* A */
    {0, 0, 0, 1, 0},     /* B */
    {0, 2, 0, 5, 0},     /* C */
    {0, 0, 0, 0, 3},     /* D */
    {0, 0, 0, 0, 0}      /* E */
};

int main(void)
{
    int dist[N], visited[N] = {0};
    for (int i = 0; i < N; i++) dist[i] = INF;
    dist[0] = 0;                                    /* source A */

    for (int k = 0; k < N; k++)
    {
        int u = -1;
        for (int i = 0; i < N; i++)                 /* smallest unvisited distance */
            if (!visited[i] && (u == -1 || dist[i] < dist[u])) u = i;
        visited[u] = 1;
        for (int v = 0; v < N; v++)                 /* relax edges (u, v) */
            if (g[u][v] && !visited[v] && dist[u] + g[u][v] < dist[v])
                dist[v] = dist[u] + g[u][v];
    }
    for (int i = 0; i < N; i++) printf("%c: %d\n", 'A' + i, dist[i]);
    return 0;
}
```

Output:

```text
A: 0
B: 3
C: 1
D: 4
E: 7
```

**Complexity:**

1. With an **array** (linear search for the minimum): **O(V²)** — good for dense graphs.
2. With a **binary heap (priority queue)** and an adjacency list: **O((V + E) log V)**, i.e. O(E log V).

**Limitation:** Dijkstra's algorithm **fails with negative edge weights**, because a vertex is finalised as soon as it is selected, and a negative edge found later could give it a shorter path.

**Applications:** GPS and map route finding, network routing protocols (such as OSPF), telephone networks, social networking applications.

### 2. Bellman–Ford Algorithm

The **Bellman–Ford algorithm** also solves the single-source problem, but it **works with negative edge weights** and can **detect negative cycles**. It is slower than Dijkstra's algorithm.

**Algorithm:**

1. Set dist[source] = 0 and dist[v] = ∞ for all other vertices.
2. **Repeat V − 1 times:** relax **every edge** (u, v, w) of the graph.
3. **Negative-cycle check:** go through all edges once more; if any edge can still be relaxed (dist[u] + w < dist[v]), the graph has a **negative cycle** reachable from the source.

**Why V − 1 passes:** a shortest path that has no cycle contains at most **V − 1 edges**, and after pass i, every shortest path that uses at most i edges has been found.

**Example:** V = 5, source 0, edges 0→1 (5), 1→2 (1), 1→3 (2), 2→4 (1), 4→3 (−1):

| After | dist[0] | dist[1] | dist[2] | dist[3] | dist[4] |
| --- | --- | --- | --- | --- | --- |
| Start | 0 | ∞ | ∞ | ∞ | ∞ |
| Pass 1 (edges in the order listed) | 0 | 5 | 6 | 7 → **6** (via 4: 7 − 1) | 7 |
| Passes 2–4 | 0 | 5 | 6 | 6 | 7 (no change) |

The negative edge 4→3 gives vertex 3 a shorter path (0→1→2→4→3 = 5 + 1 + 1 − 1 = 6) than the direct route 0→1→3 (= 7). No edge can be relaxed in the extra check, so there is no negative cycle.

**Program:**

```c
#include <stdio.h>
#define INF 9999

struct edge { int u, v, w; };

int main(void)
{
    struct edge e[] = {{0,1,5}, {1,2,1}, {1,3,2}, {2,4,1}, {4,3,-1}};
    int V = 5, E = 5, dist[5];

    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[0] = 0;

    for (int pass = 1; pass <= V - 1; pass++)      /* V - 1 passes */
        for (int j = 0; j < E; j++)
            if (dist[e[j].u] != INF && dist[e[j].u] + e[j].w < dist[e[j].v])
                dist[e[j].v] = dist[e[j].u] + e[j].w;

    for (int j = 0; j < E; j++)                    /* negative-cycle check */
        if (dist[e[j].u] != INF && dist[e[j].u] + e[j].w < dist[e[j].v])
        {
            printf("Negative cycle found\n");
            return 0;
        }
    for (int i = 0; i < V; i++) printf("%d: %d\n", i, dist[i]);
    return 0;
}
```

Output:

```text
0: 0
1: 5
2: 6
3: 6
4: 7
```

**Complexity:** **O(V × E)** time (V − 1 passes over E edges); O(V) space. (The best case is O(E), when the distances stop changing after one pass and the loop stops early.)

**Applications:** routing protocols based on distance vectors (such as RIP), graphs with negative weights (for example, cash flows or energy gains and losses) and detecting negative cycles (for example, in cycle-cancelling methods for network flow).

### Dijkstra vs Bellman–Ford

| Basis | Dijkstra's Algorithm | Bellman–Ford Algorithm |
| --- | --- | --- |
| Negative edge weights | **Not allowed** (wrong results) | **Allowed** |
| Negative cycle detection | Not possible | **Possible** |
| Method | **Greedy**: picks the closest unvisited vertex | Relaxes **all edges V − 1 times** (dynamic-programming style) |
| Edges examined | Only the edges of the selected vertex | Every edge in every pass |
| Time complexity | O(V²) or O(E log V) | **O(V × E)** |
| Speed | Faster | Slower |
| Used in | Link-state routing (OSPF), maps | Distance-vector routing (RIP) |

## All-Pairs Shortest Paths {#all-pairs-shortest-paths}

### Floyd–Warshall Algorithm

The **Floyd–Warshall algorithm** finds the shortest distances **between every pair of vertices**. It is a **dynamic programming** algorithm. It works with **negative edge weights**, but **not with negative cycles**.

**Idea:** number the vertices 1 to n. D^(k)[i][j] is the shortest distance from i to j using only vertices **1 … k as intermediate vertices**. For each k, the path from i to j either does not use k, or goes from i to k and then from k to j:

```text
D(k)[i][j] = min( D(k−1)[i][j],  D(k−1)[i][k] + D(k−1)[k][j] )
```

**Algorithm:**

1. Start with the **distance matrix** D⁰: D[i][j] = weight of edge (i, j), **∞** if there is no edge, and **0** on the diagonal.
2. For **k = 1 to n** (each vertex in turn as the intermediate vertex), for every pair (i, j): D[i][j] = min(D[i][j], D[i][k] + D[k][j]).
3. After k = n, D holds the shortest distance for every pair.

```text
for k ← 1 to n
    for i ← 1 to n
        for j ← 1 to n
            if D[i][k] + D[k][j] < D[i][j] then D[i][j] ← D[i][k] + D[k][j]
```

**Negative cycles:** if after the algorithm some **D[i][i] < 0**, vertex i is on a negative cycle.

### Example

![Directed weighted graph with vertices 1 to 4 for the Floyd–Warshall example](/diagrams/data-structures-algorithms/floyd-example.svg)

**D⁰ (the edge weights):**

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 3 | ∞ | 7 |
| **2** | 8 | 0 | 2 | ∞ |
| **3** | 5 | ∞ | 0 | 1 |
| **4** | 2 | ∞ | ∞ | 0 |

**D¹ (via vertex 1):** D[2][4] = min(∞, 8 + 7) = 15; D[3][2] = min(∞, 5 + 3) = 8; D[4][2] = min(∞, 2 + 3) = 5.

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 3 | ∞ | 7 |
| **2** | 8 | 0 | 2 | 15 |
| **3** | 5 | 8 | 0 | 1 |
| **4** | 2 | 5 | ∞ | 0 |

**D² (via vertex 2):** D[1][3] = 3 + 2 = 5; D[4][3] = 5 + 2 = 7.

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 3 | 5 | 7 |
| **2** | 8 | 0 | 2 | 15 |
| **3** | 5 | 8 | 0 | 1 |
| **4** | 2 | 5 | 7 | 0 |

**D³ (via vertex 3):** D[1][4] = 5 + 1 = 6; D[2][1] = 2 + 5 = 7; D[2][4] = 2 + 1 = 3.

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 3 | 5 | 6 |
| **2** | 7 | 0 | 2 | 3 |
| **3** | 5 | 8 | 0 | 1 |
| **4** | 2 | 5 | 7 | 0 |

**D⁴ (via vertex 4) — final shortest distances:** D[2][1] = 3 + 2 = 5; D[3][1] = 1 + 2 = 3; D[3][2] = 1 + 5 = 6.

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 3 | 5 | 6 |
| **2** | 5 | 0 | 2 | 3 |
| **3** | 3 | 6 | 0 | 1 |
| **4** | 2 | 5 | 7 | 0 |

For example, the shortest distance from 2 to 1 is 5 (2 → 3 → 4 → 1 = 2 + 1 + 2), shorter than the direct edge of weight 8.

### Program

```c
#include <stdio.h>
#define N 4
#define INF 9999

int main(void)
{
    int d[N][N] = {
        {0,   3,   INF, 7},
        {8,   0,   2,   INF},
        {5,   INF, 0,   1},
        {2,   INF, INF, 0}
    };

    for (int k = 0; k < N; k++)                 /* intermediate vertex */
        for (int i = 0; i < N; i++)
            for (int j = 0; j < N; j++)
                if (d[i][k] != INF && d[k][j] != INF && d[i][k] + d[k][j] < d[i][j])
                    d[i][j] = d[i][k] + d[k][j];

    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++) printf("%3d", d[i][j]);
        printf("\n");
    }
    return 0;
}
```

Output:

```text
  0  3  5  6
  5  0  2  3
  3  6  0  1
  2  5  7  0
```

### Complexity

1. **Time:** **O(V³)** (three nested loops), whatever the number of edges.
2. **Space:** **O(V²)** for the distance matrix.

Floyd–Warshall is simple and suits **dense** graphs; for sparse graphs, running Dijkstra's algorithm from every vertex (or Johnson's algorithm) is faster.

**Applications:** finding shortest paths between all pairs of cities or network nodes; the **transitive closure** of a directed graph (which vertices can reach which); testing whether an undirected graph is bipartite.

### Comparison of Shortest Path Algorithms

| Algorithm | Problem | Negative edges | Technique | Time |
| --- | --- | --- | --- | --- |
| BFS | Single source, **unweighted** graph | — | Traversal | O(V + E) |
| Dijkstra | Single source | **No** | Greedy | O(V²) or O(E log V) |
| Bellman–Ford | Single source | **Yes** (detects negative cycles) | Relaxation / dynamic programming | O(V × E) |
| Floyd–Warshall | **All pairs** | **Yes** (no negative cycles) | Dynamic programming | O(V³) |
| Johnson's | All pairs | Yes | Bellman–Ford + Dijkstra | O(V² log V + V × E) |

## References {#references}

**GeeksforGeeks**

- [Shortest Path Algorithms: A Complete Guide](https://www.geeksforgeeks.org/dsa/shortest-path-algorithms-a-complete-guide/) — accessed 2026-11-01
- [Dijkstra's Algorithm](https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-greedy-algo-7/) — accessed 2026-11-01
- [Bellman–Ford Algorithm](https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/) — accessed 2026-11-01
- [Floyd Warshall Algorithm](https://www.geeksforgeeks.org/dsa/floyd-warshall-algorithm-dp-16/) — accessed 2026-11-01

**TutorialsPoint**

- [Graph Data Structure (shortest path)](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm) — accessed 2026-11-01
- [Dijkstra's Shortest Path Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/dijkstras_shortest_path_algorithm.htm) — accessed 2026-11-02
- [Floyd Warshall Algorithm](https://www.tutorialspoint.com/data_structures_algorithms/floyd_warshall_algorithm.htm) — accessed 2026-11-02

**TpointTech**

- [Dijkstra's Algorithm](https://www.tpointtech.com/dijkstras-algorithm) — accessed 2026-11-02
- [Bellman-Ford Algorithm](https://www.tpointtech.com/bellman-ford-algorithm) — accessed 2026-11-02
- [Floyd-Warshall Algorithm](https://www.tpointtech.com/floyd-warshall-algorithm) — accessed 2026-11-02

**Programiz**

- [Dijkstra's Algorithm](https://www.programiz.com/dsa/dijkstra-algorithm) — accessed 2026-11-01
- [Bellman Ford's Algorithm](https://www.programiz.com/dsa/bellman-ford-algorithm) — accessed 2026-11-01
- [Floyd-Warshall Algorithm](https://www.programiz.com/dsa/floyd-warshall-algorithm) — accessed 2026-11-01

**IT Job QnS**

- [Design and Analysis of Algorithm](https://it.jobqns.com/design-and-analysis-of-algorithm/) — accessed 2026-11-01

**Additional sources**

- [Shortest path problem](https://en.wikipedia.org/wiki/Shortest_path_problem) — Wikipedia (the four problem types; not defined by the reference websites) — accessed 2026-11-01
- [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) — Wikipedia (inventor and dates, array-based O(V²) running time, use in OSPF and IS-IS) — accessed 2026-11-01
- [Bellman–Ford algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm) — Wikipedia (use in distance-vector routing such as RIP) — accessed 2026-11-01
