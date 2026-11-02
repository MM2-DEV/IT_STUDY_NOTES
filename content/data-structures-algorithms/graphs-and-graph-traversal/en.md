---
description: Graphs - terminology (vertex, edge, degree, path, cycle), types of graphs, adjacency matrix and adjacency list representations and graph operations, breadth-first search and depth-first search with worked examples and C programs, BFS vs DFS, and an overview of graph algorithms.
updated: 2026-11-02
---

## Graph Terminologies {#graph-terminologies}

### Definition

A **graph** is a **non-linear data structure** consisting of a set of **vertices (nodes)** and a set of **edges** that connect pairs of vertices. It is written as

```text
G = (V, E)      V = set of vertices,  E = set of edges
```

Graphs model **relationships** between objects: cities joined by roads, computers joined by network links, people joined by friendships, web pages joined by links. A **tree** is a special graph that is connected and has no cycles.

### Basic Terms

| Term | Meaning |
| --- | --- |
| **Vertex (node)** | A basic element of the graph |
| **Edge (arc)** | A connection between two vertices, written (u, v) |
| **Adjacent vertices** | Two vertices joined directly by an edge |
| **Degree of a vertex** | The number of edges incident on the vertex (a self-loop counts twice) |
| **In-degree** | In a directed graph, the number of edges **coming into** the vertex |
| **Out-degree** | In a directed graph, the number of edges **going out of** the vertex |
| **Path** | A sequence of vertices joined by edges, with no vertex repeated (for example, 0–1–4–5) |
| **Cycle** | A path that **starts and ends at the same vertex** |
| **Self-loop** | An edge that connects a vertex to itself |
| **Parallel (multiple) edges** | Two or more edges joining the same pair of vertices |
| **Subgraph** | A graph formed from a subset of the vertices and edges of another graph |
| **Connected graph** | There is a path between **every pair** of vertices |
| **Weight** | A value (cost, distance, time) attached to an edge |

### Important Facts

1. **Handshaking lemma:** in an undirected graph, the **sum of the degrees of all vertices = 2 × number of edges**, because every edge adds 1 to the degree of each of its two ends. Hence the number of vertices with odd degree is always even.
2. In a directed graph, **sum of in-degrees = sum of out-degrees = number of edges**.
3. A **complete** undirected graph with n vertices has **n(n − 1) / 2** edges (each vertex has degree n − 1); a complete **directed** graph has **n(n − 1)** edges. Example: n = 5 → 10 undirected edges, 20 directed edges.
4. A tree with n vertices has **n − 1** edges.

**Example:** the undirected graph in the figure below has 6 vertices and 7 edges; the degrees are 2, 3, 2, 2, 3, 2, whose sum is 14 = 2 × 7.

![Directed graph A, B, C, D with five edges and the in-degree and out-degree of each vertex](/diagrams/data-structures-algorithms/directed-graph.svg)

### Types of Graphs

1. **Undirected graph:** edges have **no direction**; (u, v) and (v, u) are the same edge. Example: two-way roads, friendships.
2. **Directed graph (digraph):** every edge has a **direction**, from u to v (drawn as an arrow); (u, v) ≠ (v, u). Example: one-way roads, web links.
3. **Weighted graph:** each edge has a **weight** (cost, distance, time). Example: road maps, airline routes.
4. **Unweighted graph:** all edges are treated as equal.
5. **Null (edgeless) graph:** has vertices but **no edges**.
6. **Trivial graph:** has **one vertex** and no edges.
7. **Simple graph:** has **no self-loops and no parallel edges**.
8. **Multigraph:** allows **parallel edges** (but no self-loops).
9. **Pseudograph:** allows both self-loops and parallel edges.
10. **Connected graph:** there is a path between every pair of vertices. **Disconnected graph:** some pair of vertices has no path between them.
11. **Complete graph:** every vertex is connected to **every other** vertex (degree n − 1).
12. **Regular graph:** every vertex has the **same degree**.
13. **Cyclic graph:** contains at least one cycle. **Acyclic graph:** has no cycle. A **directed acyclic graph (DAG)** is a directed graph with no directed cycle.
14. **Bipartite graph:** the vertices can be divided into **two sets** U and V so that every edge joins a vertex of U to a vertex of V.
15. **Sparse graph:** relatively **few** edges; **dense graph:** **many** edges (close to the maximum).
16. **Tree:** a connected graph with **no cycles**.

### Applications of Graphs

1. Maps and navigation (GPS shortest routes).
2. Computer networks and routing.
3. Social networks (friend suggestions).
4. The World Wide Web (pages and links) and search-engine crawling.
5. Scheduling tasks with dependencies, and course prerequisites.
6. Electric circuits and dependency analysis in compilers.

## Representing Graphs and Graph Operations {#representing-graphs-and-graph-operations}

A graph is usually stored in one of two ways.

![An undirected graph with vertices 0 to 5 and its adjacency matrix and adjacency list](/diagrams/data-structures-algorithms/graph-representation.svg)

### 1. Adjacency Matrix

A **V × V two-dimensional array** `adj`, where

```text
adj[i][j] = 1   if there is an edge from vertex i to vertex j
adj[i][j] = 0   otherwise
```

1. For an **undirected** graph the matrix is **symmetric** (adj[i][j] = adj[j][i]).
2. For a **directed** graph, only adj[source][destination] is set.
3. For a **weighted** graph, the weight is stored instead of 1.
4. The degree of vertex i in an undirected graph = the number of 1s in row i.

**Advantages:** checking whether an edge (i, j) exists takes **O(1)**; simple to implement. **Disadvantage:** needs **O(V²)** memory even if there are few edges.

### 2. Adjacency List

An **array of lists**: entry i holds a (linked) list of the vertices adjacent to vertex i.

1. For an undirected graph, each edge (u, v) appears in both lists (u's and v's).
2. For a weighted graph, each list item stores (neighbour, weight).

**Advantages:** needs only **O(V + E)** memory; finding all neighbours of a vertex is fast. **Disadvantage:** checking whether a particular edge exists takes O(degree) time.

### Adjacency Matrix vs Adjacency List

| Basis | Adjacency Matrix | Adjacency List |
| --- | --- | --- |
| Structure | V × V 2-D array | Array of V lists |
| Memory | **O(V²)** | **O(V + E)** |
| Check if edge (u, v) exists | **O(1)** | O(degree of u) |
| Find all neighbours of u | O(V) | O(degree of u) |
| Add an edge | O(1) | O(1) |
| Remove an edge | O(1) | O(degree of u) |
| Best for | **Dense** graphs | **Sparse** graphs |

### Graph Operations

1. **Add or remove a vertex.**
2. **Add or remove an edge.**
3. **Check whether a vertex or an edge exists.**
4. **Find the neighbours** (adjacent vertices) of a vertex.
5. **Traverse** the graph (BFS or DFS).
6. **Find a path** between two vertices (and the shortest path).

## Breadth-First Search (BFS) {#breadth-first-search-bfs}

### Concept

**Breadth-first search** visits the graph **level by level**: it first visits the starting vertex, then **all its neighbours**, then the neighbours of those neighbours, and so on. It uses a **queue** (FIFO). Every vertex is **marked as visited** so that it is not processed twice (graphs, unlike trees, can have cycles).

### Algorithm

1. Mark the starting vertex as visited and **enqueue** it.
2. While the queue is not empty:
   1. **Dequeue** a vertex u and process (print) it.
   2. For every **unvisited neighbour** v of u: mark v as visited and **enqueue** it.
3. If the graph is disconnected, repeat from any unvisited vertex.

**Algorithm with node status values.** Many books describe BFS by giving every node a **status**: **1 = ready** (not yet discovered), **2 = waiting** (in the queue), **3 = processed** (removed from the queue and visited).

1. Set STATUS = 1 for every node.
2. Enqueue the starting node and set its STATUS = 2.
3. Repeat until the queue is empty: dequeue a node N, process it and set its STATUS = 3; enqueue every neighbour of N whose STATUS = 1 and set its STATUS = 2.

(DFS uses the same three status values, but with a **stack** instead of a queue.)

```text
BFS(G, s)
1. mark s visited;  ENQUEUE(Q, s)
2. while Q is not empty
3.     u ← DEQUEUE(Q);  visit u
4.     for each neighbour v of u
5.         if v is not visited then mark v visited;  ENQUEUE(Q, v)
```

### Example

BFS of the graph in the figure above, starting at **0** (neighbours taken in increasing order):

| Step | Dequeued (visited) | Neighbours enqueued | Queue after the step |
| --- | --- | --- | --- |
| 1 | 0 | 1, 2 | 1, 2 |
| 2 | 1 | 3, 4 (0 already visited) | 2, 3, 4 |
| 3 | 2 | — (0, 4 already visited) | 3, 4 |
| 4 | 3 | 5 | 4, 5 |
| 5 | 4 | — | 5 |
| 6 | 5 | — | empty |

**BFS order: 0, 1, 2, 3, 4, 5**

### Program

```c
#include <stdio.h>
#define N 6

int adj[N][N] = {
    {0,1,1,0,0,0},
    {1,0,0,1,1,0},
    {1,0,0,0,1,0},
    {0,1,0,0,0,1},
    {0,1,1,0,0,1},
    {0,0,0,1,1,0}
};

void bfs(int start)
{
    int queue[N], front = 0, rear = 0, visited[N] = {0};
    visited[start] = 1;
    queue[rear++] = start;                  /* enqueue */
    while (front < rear)
    {
        int u = queue[front++];             /* dequeue */
        printf("%d ", u);
        for (int v = 0; v < N; v++)
            if (adj[u][v] && !visited[v])
            {
                visited[v] = 1;
                queue[rear++] = v;
            }
    }
    printf("\n");
}

int main(void)
{
    printf("BFS: ");
    bfs(0);
    return 0;
}
```

Output: `BFS: 0 1 2 3 4 5`

### Complexity

1. **Time:** **O(V + E)** with an adjacency list (every vertex and every edge is examined once); **O(V²)** with an adjacency matrix.
2. **Space:** **O(V)** for the queue and the visited array.

### Applications of BFS

1. Finding the **shortest path** (fewest edges) in an **unweighted** graph.
2. Level-order traversal of trees.
3. Testing whether a graph is **bipartite**.
4. Finding all vertices reachable from a source, and connected components.
5. Web crawlers, peer-to-peer networks (finding neighbours), GPS navigation, network broadcasting.
6. Used inside other algorithms, such as Ford–Fulkerson (Edmonds–Karp) for maximum flow and cycle detection in undirected graphs.

## Depth-First Search (DFS) {#depth-first-search-dfs}

### Concept

**Depth-first search** starts at a vertex and goes **as deep as possible** along one path, visiting an unvisited neighbour at each step. When it reaches a vertex with no unvisited neighbours, it **backtracks** to the previous vertex and tries another path. It uses a **stack** (LIFO) — either an explicit stack or the **recursion** stack.

### Algorithm (Recursive)

```text
DFS(G, u)
1. mark u visited;  visit u
2. for each neighbour v of u
3.     if v is not visited then DFS(G, v)
```

To cover a disconnected graph, call DFS from every vertex that is still unvisited.

### Example

DFS of the same graph, starting at **0** (neighbours in increasing order):

1. Visit **0** → first unvisited neighbour is 1.
2. Visit **1** → neighbours 0 (visited), **3**.
3. Visit **3** → neighbours 1 (visited), **5**.
4. Visit **5** → neighbours 3 (visited), **4**.
5. Visit **4** → neighbours 1 (visited), **2**.
6. Visit **2** → neighbours 0 and 4 are visited → backtrack to 4, 5, 3, 1, 0; nothing is left.

**DFS order: 0, 1, 3, 5, 4, 2**

### Program

```c
#include <stdio.h>
#define N 6

int adj[N][N] = {
    {0,1,1,0,0,0},
    {1,0,0,1,1,0},
    {1,0,0,0,1,0},
    {0,1,0,0,0,1},
    {0,1,1,0,0,1},
    {0,0,0,1,1,0}
};
int visited[N];

void dfs(int u)
{
    visited[u] = 1;
    printf("%d ", u);
    for (int v = 0; v < N; v++)
        if (adj[u][v] && !visited[v])
            dfs(v);                         /* go deeper */
}

int main(void)
{
    printf("DFS: ");
    dfs(0);
    printf("\n");
    return 0;
}
```

Output: `DFS: 0 1 3 5 4 2`

### Complexity

1. **Time:** **O(V + E)** with an adjacency list; **O(V²)** with an adjacency matrix.
2. **Space:** **O(V)** for the visited array and the stack (recursion).

### Applications of DFS

1. Finding a **path** between two vertices.
2. **Cycle detection** in a graph.
3. **Topological sorting** of a DAG (see [Topological Sorting](/topics/data-structures-algorithms/topological-sorting)).
4. Finding **connected components** and **strongly connected components**.
5. Testing whether a graph is bipartite.
6. Solving mazes and puzzles by **backtracking**.

### Differences Between BFS and DFS

| Basis | BFS | DFS |
| --- | --- | --- |
| Full form | Breadth-First Search | Depth-First Search |
| Data structure | **Queue** | **Stack** (or recursion) |
| Order | **FIFO** | **LIFO** |
| Method | Visits **level by level** (all neighbours first) | Goes **as deep as possible**, then backtracks |
| Tree built | Level by level | Subtree by subtree |
| Shortest path | Finds the shortest path (fewest edges) in an unweighted graph | Does not guarantee the shortest path |
| Suitable when | The target is **close** to the source | The target is **far** from the source |
| Memory | Stores a whole level, which can be large for wide graphs | Stores only the current path, usually less |
| Time | O(V + E) | O(V + E) |
| Applications | Shortest path, bipartite check, level order, web crawling | Cycle detection, topological sort, strongly connected components, maze solving |

**Why DFS is often preferred:** it usually needs **less memory** (only the current path is stored, while BFS stores whole levels), it reaches deep solutions quickly, it suits **backtracking** problems (mazes, cycle detection, topological sort), and it is simple to write recursively. However, **BFS is better when the shortest path is required.**

## Graph Algorithms {#graph-algorithms}

The main groups of graph algorithms are:

| Problem | Algorithms | Covered in |
| --- | --- | --- |
| **Traversal** | Breadth-first search (BFS), depth-first search (DFS) | [BFS](#breadth-first-search-bfs), [DFS](#depth-first-search-dfs) |
| **Minimum spanning tree** | **Prim's**, **Kruskal's**, Borůvka's | [Minimum Spanning Trees](/topics/data-structures-algorithms/minimum-spanning-trees) |
| **Shortest path** | **Dijkstra's** (single source, non-negative weights), **Bellman–Ford** (negative weights allowed), **Floyd–Warshall** (all pairs), BFS (unweighted graphs) | [Shortest Path Algorithms](/topics/data-structures-algorithms/shortest-path-algorithms) |
| **Topological sorting** | DFS-based method, **Kahn's algorithm** | [Topological Sorting](/topics/data-structures-algorithms/topological-sorting) |
| **Maximum flow** | **Ford–Fulkerson**, Edmonds–Karp, Dinic's | [Flow Networks](/topics/data-structures-algorithms/flow-networks) |
| **Cycle detection** | DFS (directed and undirected graphs), union–find (disjoint sets) | — |
| **Connectivity** | Connected components (BFS/DFS), strongly connected components (Kosaraju's, Tarjan's), articulation points and bridges | — |
| **Other problems** | Graph colouring, travelling salesman problem, Eulerian path and circuit, bipartite matching | — |

**Spanning tree:** a subgraph that includes **all the vertices** of a connected undirected graph, has **no cycles**, and has exactly **n − 1 edges**. A **minimum spanning tree (MST)** is a spanning tree of a weighted graph with the **least total edge weight**. A complete graph with n vertices has **n^(n−2)** spanning trees (Cayley's formula).

## References {#references}

**TutorialsPoint**

- [Graph Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm) — accessed 2026-11-01
- [Breadth First Traversal](https://www.tutorialspoint.com/data_structures_algorithms/breadth_first_traversal.htm) — accessed 2026-11-02

**TpointTech**

- [Graph Data Structure](https://www.tpointtech.com/graph-data-structure) — accessed 2026-11-02
- [Breadth First Search Algorithm](https://www.tpointtech.com/breadth-first-search-algorithm) — accessed 2026-11-02
- [Depth First Search Algorithm](https://www.tpointtech.com/depth-first-search-algorithm) — accessed 2026-11-02

**GeeksforGeeks**

- [Graph and its Representations](https://www.geeksforgeeks.org/dsa/graph-and-its-representations/) — accessed 2026-11-01
- [Types of Graphs with Examples](https://www.geeksforgeeks.org/dsa/graph-types-and-applications/) — accessed 2026-11-01
- [Graph Theory Basics](https://www.geeksforgeeks.org/engineering-mathematics/mathematics-graph-theory-basics-set-1/) — accessed 2026-11-01
- [Handshaking Lemma and Interesting Tree Properties](https://www.geeksforgeeks.org/dsa/handshaking-lemma-and-interesting-tree-properties/) — accessed 2026-11-01
- [Difference between BFS and DFS](https://www.geeksforgeeks.org/dsa/difference-between-bfs-and-dfs/) — accessed 2026-11-01
- [Graph Algorithms](https://www.geeksforgeeks.org/dsa/graph-data-structure-and-algorithms/) — accessed 2026-11-01

**Programiz**

- [Graph Data Structure](https://www.programiz.com/dsa/graph) — accessed 2026-11-01
- [Breadth First Search](https://www.programiz.com/dsa/graph-bfs) — accessed 2026-11-01
- [Depth First Search](https://www.programiz.com/dsa/graph-dfs) — accessed 2026-11-01

**IT Job QnS**

- [Data Structure](https://it.jobqns.com/data-structure/) — accessed 2026-11-01

**Additional sources**

- [Cayley's formula](https://en.wikipedia.org/wiki/Cayley%27s_formula) — Wikipedia (number of spanning trees of a complete graph; the IT Job QnS formula was garbled) — accessed 2026-11-01
