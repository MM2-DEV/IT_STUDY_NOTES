---
description: Topological sorting of a directed acyclic graph (DAG) - definition and conditions, Kahn's in-degree (BFS) algorithm with cycle detection, the DFS-based algorithm, worked example, C program, complexity and applications.
updated: 2026-11-01
---

### Definition

A **topological sort (topological ordering)** of a directed graph is a **linear ordering of its vertices** such that for **every directed edge u → v, vertex u comes before vertex v** in the ordering.

If the vertices are **tasks** and an edge u → v means "u must be finished before v can start", a topological order is an order in which all the tasks can be done without breaking any dependency.

### Conditions

1. Topological sorting is possible **only for a directed acyclic graph (DAG)**: a directed graph with **no directed cycle**.
2. It is **impossible** for a graph with a cycle: in a cycle u → v → … → u, u would have to come both before and after v.
3. It is not defined for undirected graphs (an undirected edge has no direction to follow).
4. **Every DAG has at least one** topological ordering, and a DAG can have **more than one** valid ordering.
5. Every DAG has at least one vertex with **in-degree 0** (no incoming edges); such a vertex can be placed first.

### Example Graph

![DAG with edges 0→1, 0→2, 1→3, 1→4, 2→4, 3→5, 4→5](/diagrams/data-structures-algorithms/topological-dag.svg)

Edges: 0→1, 0→2, 1→3, 1→4, 2→4, 3→5, 4→5. Valid topological orders include **0, 1, 2, 3, 4, 5** and **0, 2, 1, 4, 3, 5**. An order such as 0, 1, 4, … is **not** valid, because the edge 2 → 4 needs 2 before 4.

### Method 1: Kahn's Algorithm (In-degree / BFS Method)

Proposed by **Arthur B. Kahn** in **1962**. It repeatedly removes a vertex with **no incoming edges**.

1. Compute the **in-degree** of every vertex.
2. Put all vertices with **in-degree 0** into a **queue**.
3. While the queue is not empty:
   1. **Dequeue** a vertex u and append it to the result.
   2. For each edge u → v, **decrease the in-degree of v by 1**; if it becomes 0, **enqueue v**.
4. If the result contains **all V vertices**, it is a topological order. If it contains **fewer than V** vertices, some vertices never reached in-degree 0, so the graph **has a cycle** and no topological order exists.

**Example:** in-degrees: 0 → 0, 1 → 1, 2 → 1, 3 → 1, 4 → 2, 5 → 2.

| Step | Dequeued | In-degrees reduced | Queue after the step | Result so far |
| --- | --- | --- | --- | --- |
| Start | — | — | 0 | — |
| 1 | 0 | 1 → 0, 2 → 0 | 1, 2 | 0 |
| 2 | 1 | 3 → 0, 4 → 1 | 2, 3 | 0, 1 |
| 3 | 2 | 4 → 0 | 3, 4 | 0, 1, 2 |
| 4 | 3 | 5 → 1 | 4 | 0, 1, 2, 3 |
| 5 | 4 | 5 → 0 | 5 | 0, 1, 2, 3, 4 |
| 6 | 5 | — | empty | **0, 1, 2, 3, 4, 5** |

All 6 vertices are in the result, so the graph has no cycle.

### Method 2: DFS-Based Algorithm

1. Run **DFS** from every unvisited vertex.
2. When the DFS of a vertex **finishes** (after all the vertices reachable from it have been visited), **push it onto a stack**.
3. When all vertices are done, **pop the stack** (that is, take the vertices in **reverse order of finishing**). This is a topological order.

A vertex finishes only after all the vertices that depend on it have finished, so it is placed before them.

**Example:** DFS from 0 (neighbours in increasing order) finishes the vertices in the order 5, 3, 4, 1, 2, 0. Reversing gives **0, 2, 1, 4, 3, 5**, which is also a valid topological order.

### Program (Kahn's Algorithm)

```c
#include <stdio.h>
#define N 6

int adj[N][N];

int main(void)
{
    int edges[][2] = {{0,1}, {0,2}, {1,3}, {1,4}, {2,4}, {3,5}, {4,5}};
    int m = 7, indeg[N] = {0}, queue[N], front = 0, rear = 0, count = 0;

    for (int i = 0; i < m; i++)
    {
        adj[edges[i][0]][edges[i][1]] = 1;
        indeg[edges[i][1]]++;                       /* count incoming edges */
    }
    for (int v = 0; v < N; v++)
        if (indeg[v] == 0) queue[rear++] = v;       /* start vertices */

    printf("Topological order: ");
    while (front < rear)
    {
        int u = queue[front++];
        printf("%d ", u);
        count++;
        for (int v = 0; v < N; v++)
            if (adj[u][v] && --indeg[v] == 0)       /* remove edge u -> v */
                queue[rear++] = v;
    }
    printf("\n");
    if (count < N) printf("The graph has a cycle\n");
    return 0;
}
```

Output: `Topological order: 0 1 2 3 4 5`

### Complexity

1. **Time:** **O(V + E)** for both methods with an adjacency list (each vertex and each edge is processed once). With an adjacency matrix, as in the program above, it is O(V²).
2. **Space:** O(V) for the in-degree array and the queue (or the visited array and the stack).

### Kahn's Algorithm vs DFS-Based Method

| Basis | Kahn's Algorithm | DFS-Based Method |
| --- | --- | --- |
| Approach | BFS-like; removes vertices with in-degree 0 | DFS; orders vertices by reverse finishing time |
| Data structure | Queue and in-degree array | Stack (or recursion) and visited array |
| Cycle detection | Easy: fewer than V vertices in the result | Needs extra tracking of vertices on the current DFS path |
| Time | O(V + E) | O(V + E) |

### Applications

1. **Scheduling jobs or tasks** that depend on each other (project management, PERT and critical path analysis).
2. **Course scheduling** with prerequisites.
3. Deciding the **compilation order** of files in build systems (makefiles) and resolving symbol dependencies in linkers.
4. **Instruction scheduling** in compilers.
5. **Recalculating spreadsheet formula cells** in the right order.
6. Ordering the loading of database tables with foreign keys, and data serialization.

## References {#references}

**GeeksforGeeks**

- [Topological Sorting](https://www.geeksforgeeks.org/dsa/topological-sorting/) — accessed 2026-11-01
- [Kahn's Algorithm for Topological Sorting](https://www.geeksforgeeks.org/dsa/topological-sorting-indegree-based-solution/) — accessed 2026-11-01

**TutorialsPoint**

- [Topological Sorting](https://www.tutorialspoint.com/topological-sorting) — accessed 2026-11-01

**TpointTech**

- [Topological Sorting](https://www.tpointtech.com/topological-sorting) — accessed 2026-11-01

**Additional sources**

- [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting) — Wikipedia (Kahn 1962, cycle detection in Kahn's algorithm, applications) — accessed 2026-11-01
