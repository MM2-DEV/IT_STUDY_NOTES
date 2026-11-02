---
description: Deadlock management - deadlock handling methods, deadlock prevention, deadlock detection (resource allocation graph, wait-for graph and the detection algorithm) and recovery, deadlock avoidance (safe state and the resource allocation graph algorithm), and the Banker's algorithm with worked examples.
updated: 2026-11-03
---

## Deadlock Handling Methods {#deadlock-handling-methods}

### Deadlock: A Recap

> **A deadlock is a situation in which a set of processes are blocked forever, because each process holds a resource while waiting for another resource that is held by another process in the set.**

A process uses a resource in the order **request → use → release**. A deadlock can occur only if all four **necessary (Coffman) conditions** hold at the same time:

1. **Mutual exclusion:** at least one resource is non-shareable.
2. **Hold and wait:** a process holds some resources while waiting for others.
3. **No preemption:** resources cannot be forcibly taken from a process.
4. **Circular wait:** a cycle of processes exists, each waiting for a resource held by the next.

(See also [Deadlock (Introduction)](/topics/operating-systems/process-synchronization-and-concurrency#deadlock-introduction).)

### Resource Allocation Graph (RAG)

A **resource allocation graph** shows the state of resource allocation:

1. **Process vertex:** a circle (P1, P2, …).
2. **Resource vertex:** a rectangle (R1, R2, …); each **dot** inside is one instance of the resource.
3. **Request edge (P → R):** process P has requested resource R and is waiting for it.
4. **Assignment edge (R → P):** an instance of R has been allocated to P.

**Rules:**

| Situation | Meaning |
| --- | --- |
| No cycle in the graph | No deadlock |
| Cycle, every resource has a single instance | **Deadlock** (a cycle is necessary and sufficient) |
| Cycle, some resources have several instances | Deadlock is **possible** but not certain (a cycle is necessary, not sufficient) |

**Example:** P1 holds R1 and requests R2; P2 holds R2 and requests R1 (single instances). The graph has the cycle P1 → R2 → P2 → R1 → P1, so P1 and P2 are deadlocked.

![Resource allocation graph with a cycle between P1, R1, P2 and R2: deadlock](/diagrams/operating-systems/rag-deadlock.svg)

![Resource allocation graph with a cycle but no deadlock, because P2 and P4 can release instances](/diagrams/operating-systems/rag-no-deadlock.svg)

### Methods of Handling Deadlocks

There are four methods:

1. **Deadlock prevention:** design the system so that at least one of the four necessary conditions **can never hold**. Deadlock is impossible.
2. **Deadlock avoidance:** the OS needs **advance information** (each process's maximum resource needs). Before granting each request it checks that the system will stay in a **safe state** (for example, the **Banker's algorithm**).
3. **Deadlock detection and recovery:** the system lets deadlocks occur, **detects** them periodically, and then **recovers** (terminates processes or preempts resources).
4. **Deadlock ignorance (Ostrich algorithm):** **ignore** the problem and pretend deadlocks never occur; if one happens, the user restarts the program or the computer. This is used by most general-purpose operating systems, such as **Windows** and **Linux**, because deadlocks are rare and the other methods are costly.

| Method | Idea | Advance knowledge needed | Typical use |
| --- | --- | --- | --- |
| Prevention | Break one necessary condition | No | Real-time, embedded and flight-control systems |
| Avoidance | Grant requests only if the state stays safe | Yes (maximum needs) | Systems where needs are known in advance |
| Detection and recovery | Find deadlocks and then break them | No | Database and transaction-processing systems |
| Ignorance (Ostrich) | Do nothing | No | Most general-purpose OS (Windows, Linux) |

### Prevention vs Avoidance

| Basis | Deadlock prevention | Deadlock avoidance |
| --- | --- | --- |
| Approach | Makes one of the four conditions impossible | Allows all conditions but checks each request |
| Advance information | Not needed | Maximum needs must be declared in advance |
| Resource requests | Restricted by rules | Granted only if the resulting state is safe |
| Resource utilization | Low | Better than prevention |
| Example | Resource ordering, requesting all resources at once | Banker's algorithm, RAG algorithm with claim edges |

## Deadlock Prevention {#deadlock-prevention}

> **Deadlock prevention is a method of handling deadlocks that makes sure at least one of the four necessary conditions for deadlock can never hold.**

### 1. Eliminating Mutual Exclusion

Make resources **shareable** wherever possible — for example, **read-only files** can be used by many processes at once. A non-shareable device such as a printer can be made to behave like a shareable one by **spooling**: processes write their output to a spool on the disk, and only the printer daemon uses the printer.

**Limitation:** many resources (printers, tape drives, writable files, mutex locks) are **intrinsically non-shareable**, so this condition generally cannot be removed.

### 2. Eliminating Hold and Wait

Ensure that a process never holds some resources while waiting for others. Two protocols:

1. **Request all resources at once:** a process must request and be allocated **all** the resources it needs **before it starts** execution ("all or nothing").
2. **Release before requesting:** a process may request resources only when it holds **none**; it must release everything it holds before asking for more.

**Example:** P1 and P2 both need R1 and R2. If each must request both together, one gets both, finishes and releases them, and then the other proceeds — no deadlock.

**Disadvantages:** **low resource utilization** (resources are held long before they are used) and **starvation** (a process needing several popular resources may wait forever).

### 3. Eliminating No Preemption

Allow resources to be **preempted**:

1. If a process holding some resources requests a resource that cannot be allocated immediately, **all the resources it holds are released** (preempted). The process restarts only when it can get all its old resources and the new one.
2. Alternatively, if the requested resource is held by a process that is itself waiting, the resource can be taken from that waiting process.

**Limitation:** this works only for resources whose state can be **saved and restored** easily (CPU registers, memory). It cannot be applied to printers or tape drives, and it can cause **starvation**.

### 4. Eliminating Circular Wait

Impose a **total ordering** on all resource types: give each resource type a unique number with a function **F** (for example, F(tape drive) = 1, F(disk drive) = 5, F(printer) = 12), and require every process to request resources **only in increasing order** of F. (A process that wants a lower-numbered resource must first release the higher-numbered ones.)

**Example:** with R1 = 1, R2 = 2 and R3 = 3, a process holding R2 may request R3 but not R1. Since every process climbs the numbering in the same direction, a cycle can never form.

This is the **most practical** prevention method. **Disadvantage:** resources must be requested in numerical order even when the program needs them in a different order.

### Summary

| Condition | How it is prevented | Problem |
| --- | --- | --- |
| Mutual exclusion | Make resources shareable; spooling | Many resources cannot be shared |
| Hold and wait | Request all resources at the start, or release all before a new request | Low utilization; starvation |
| No preemption | Take resources away from waiting processes | Only for resources whose state can be saved; starvation |
| Circular wait | Number the resources; request in increasing order | Inconvenient ordering |

## Deadlock Detection {#deadlock-detection}

If the system uses neither prevention nor avoidance, it must provide:

1. a **detection algorithm** that examines the state of the system to find out whether a deadlock has occurred, and
2. a **recovery algorithm** to break the deadlock.

### Methods of Deadlock Detection

The detection method depends on the number of instances of each resource type:

1. **Single instance of each resource type:** wait-for graph.
2. **Several instances of a resource type:** detection algorithm.

#### 1. Single Instance of Each Resource Type: Wait-for Graph

A **wait-for graph** is obtained from the resource allocation graph by **removing the resource nodes** and joining the edges: an edge **Pi → Pj** means process Pi is waiting for a resource held by Pj.

> **A deadlock exists if and only if the wait-for graph contains a cycle.**

![Wait-for graph with the cycle P1, P2, P3, P4, P5](/diagrams/operating-systems/wait-for-graph.svg)

**Example:** if P1 waits for R1 held by P2, and P2 waits for R2 held by P1, the wait-for graph is P1 → P2 → P1 — a cycle, so P1 and P2 are deadlocked.

The system maintains the wait-for graph and periodically runs a cycle-detection algorithm; detecting a cycle needs about **n²** operations for n processes.

#### 2. Several Instances of a Resource Type: Detection Algorithm

A wait-for graph is not enough when resources have several instances. The detection algorithm uses data structures like the Banker's algorithm:

1. **Available:** a vector of length m — the number of free instances of each resource type.
2. **Allocation:** an n × m matrix — the instances currently allocated to each process.
3. **Request:** an n × m matrix — the **current** request of each process.

(Here n = number of processes and m = number of resource types.)

**Algorithm:**

1. Let Work = Available. For each process i, set Finish[i] = **false** if Allocation[i] ≠ 0, otherwise Finish[i] = **true**.
2. Find a process i such that Finish[i] = false and **Request[i] ≤ Work**. If there is none, go to step 4.
3. Work = Work + Allocation[i]; Finish[i] = true; go to step 2. (We assume that Pi will get its request, finish, and release its resources.)
4. If Finish[i] = false for some i, the system is **deadlocked**, and every process Pi with Finish[i] = false is deadlocked.

The algorithm needs about **m × n²** operations.

**Example:** five processes P0–P4 and three resource types A (7 instances), B (2 instances) and C (6 instances).

| Process | Allocation (A B C) | Request (A B C) |
| --- | --- | --- |
| P0 | 0 1 0 | 0 0 0 |
| P1 | 2 0 0 | 2 0 2 |
| P2 | 3 0 3 | 0 0 0 |
| P3 | 2 1 1 | 1 0 0 |
| P4 | 0 0 2 | 0 0 2 |

Available = (7, 2, 6) − (7, 2, 6) allocated = **(0, 0, 0)**.

| Step | Process | Request ≤ Work? | Work after release |
| --- | --- | --- | --- |
| Start | — | — | (0, 0, 0) |
| 1 | P0 | (0,0,0) ≤ (0,0,0) ✓ | (0, 1, 0) |
| 2 | P2 | (0,0,0) ≤ (0,1,0) ✓ | (3, 1, 3) |
| 3 | P3 | (1,0,0) ≤ (3,1,3) ✓ | (5, 2, 4) |
| 4 | P4 | (0,0,2) ≤ (5,2,4) ✓ | (5, 2, 6) |
| 5 | P1 | (2,0,2) ≤ (5,2,6) ✓ | (7, 2, 6) |

All Finish[i] = true, so there is **no deadlock** (the sequence ⟨P0, P2, P3, P4, P1⟩ completes).

Now suppose **P2 requests one more instance of C** (Request of P2 = (0, 0, 1)). Work starts at (0, 0, 0); only P0 can finish, giving Work = (0, 1, 0). No other request fits — P1 needs (2,0,2), P2 needs (0,0,1), P3 needs (1,0,0), P4 needs (0,0,2). So **P1, P2, P3 and P4 are deadlocked**.

### When to Run the Detection Algorithm

It depends on how often deadlocks occur and how many processes they affect:

1. **On every request that cannot be granted immediately:** finds the deadlock and the process that caused it at once, but the overhead is very high.
2. **Periodically** (for example, once an hour) or **when CPU utilization drops** below some level (for example, 40%): lower overhead, but it may be impossible to tell which process caused the deadlock.

### Recovery from Deadlock

#### 1. Process Termination

1. **Abort all deadlocked processes:** breaks the deadlock surely, but at great cost — all their work is lost.
2. **Abort one process at a time** until the deadlock cycle is eliminated: less loss, but the detection algorithm must run again after each abort.

Factors for choosing the process to abort (the **victim**):

1. The priority of the process.
2. How long it has computed and how much longer it needs.
3. How many and what types of resources it has used.
4. How many more resources it needs to complete.
5. How many processes will have to be terminated.
6. Whether it is interactive or batch.

#### 2. Resource Preemption

Take resources away from some processes and give them to others until the deadlock is broken. Three issues:

1. **Selecting a victim:** choose the process and resources whose preemption **costs least** (number of resources held, time already used).
2. **Rollback:** the preempted process cannot continue normally, so it must be **rolled back** to a safe state and restarted from there. Since a safe state is hard to determine, the simplest solution is a **total rollback** (abort and restart). Saving **checkpoints** allows partial rollback.
3. **Starvation:** the same process may be chosen as the victim every time. The solution is to include the **number of rollbacks** in the cost factor, so a process can be picked only a limited number of times.

## Deadlock Avoidance {#deadlock-avoidance}

> **In deadlock avoidance, each process declares in advance the maximum number of resources of each type it may need. Before granting any request, the OS checks that granting it keeps the system in a safe state; otherwise the process must wait.**

### Safe State and Safe Sequence

1. A state is **safe** if the system can allocate resources to every process (up to its maximum) in **some order** and still avoid deadlock — that is, if there exists a **safe sequence** ⟨P1, P2, …, Pn⟩ in which the remaining needs of each Pi can be satisfied by the currently available resources plus the resources held by all the Pj before it.
2. A state is **unsafe** if no safe sequence exists.

Relationship:

1. A safe state is **never** a deadlock state.
2. A deadlock state is **always** an unsafe state.
3. An unsafe state **may** lead to deadlock, but **not every unsafe state is a deadlock**.

![Nested regions: safe states, unsafe states, and deadlock inside the unsafe region](/diagrams/operating-systems/safe-unsafe-deadlock.svg)

Avoidance therefore keeps the system **always in a safe state**.

**Example (one resource type, 12 instances):**

| Process | Maximum need | Allocated | Remaining need |
| --- | --- | --- | --- |
| P1 | 10 | 5 | 5 |
| P2 | 4 | 2 | 2 |
| P3 | 9 | 2 | 7 |

Allocated = 5 + 2 + 2 = 9, so Available = 12 − 9 = **3**.

1. P2 needs 2 ≤ 3 → P2 finishes and releases 4 → Available = 3 + 2 = 5.
2. P1 needs 5 ≤ 5 → P1 finishes and releases 10 → Available = 5 + 5 = 10.
3. P3 needs 7 ≤ 10 → P3 finishes → Available = 12.

The safe sequence is **⟨P2, P1, P3⟩**, so the state is **safe**.

Now suppose P3 is given **one more** instance (allocated 3, remaining need 6). Available = 12 − 10 = **2**. P2 can still finish (Available becomes 4), but then P1 needs 5 and P3 needs 6 — neither can finish. The state is **unsafe**, so an avoidance algorithm would **not** grant P3 the extra instance.

### Resource Allocation Graph Algorithm (Single Instances)

When every resource type has **only one instance**, a variant of the RAG is used. A new type of edge, the **claim edge** Pi → Rj (drawn as a **dashed line**), shows that Pi **may request** Rj in the future.

1. All claim edges must be shown before the process starts.
2. When Pi actually requests Rj, the claim edge becomes a **request edge**; when Rj is allocated, it becomes an **assignment edge**; when Rj is released, it becomes a claim edge again.
3. A request is granted **only if** converting the request edge into an assignment edge **does not form a cycle** in the graph (claim edges included). If a cycle would form, the allocation would put the system in an unsafe state, so Pi must wait.

This algorithm cannot be used when resources have several instances; then the **Banker's algorithm** is used.

### Minimum Resources to Avoid Deadlock

If n processes share R identical instances of a resource, and process i needs at most maxᵢ instances, deadlock can never occur when:

> **R ≥ Σ (maxᵢ − 1) + 1**

where:

- **R** = the number of instances of the resource,
- **maxᵢ** = the maximum need of process i,
- the sum is over all n processes.

The worst case is when every process holds maxᵢ − 1 instances and waits for one more; one extra instance lets one process finish and release its instances.

**Example 1:** 3 processes, each needing at most 2 tape drives. Minimum R = 3 × (2 − 1) + 1 = **4** tape drives. (With only 3 drives, each process could hold 1 and wait for another — deadlock.)

**Example 2:** P1, P2 and P3 need at most 3, 4 and 5 instances. Minimum R = (3 − 1) + (4 − 1) + (5 − 1) + 1 = 2 + 3 + 4 + 1 = **10**.

## Banker's Algorithm {#banker-s-algorithm}

### Introduction

The **Banker's algorithm**, formalized by **Edsger W. Dijkstra**, is a **deadlock-avoidance** algorithm for systems with **several instances of each resource type**. It is named after a bank that never lends its cash in such a way that it can no longer satisfy the needs of all its customers. Each process must declare its **maximum need** in advance; a request is granted only if the system stays in a **safe state**.

### Data Structures

For n processes and m resource types:

| Structure | Size | Meaning |
| --- | --- | --- |
| **Available** | vector of length m | Available[j] = number of free instances of resource type Rj |
| **Max** | n × m matrix | Max[i][j] = maximum instances of Rj that Pi may request |
| **Allocation** | n × m matrix | Allocation[i][j] = instances of Rj currently allocated to Pi |
| **Need** | n × m matrix | Need[i][j] = instances of Rj that Pi may still request |

> **Need[i][j] = Max[i][j] − Allocation[i][j]**
>
> **Available = Total instances − Σ Allocation (column-wise)**

(For vectors, X ≤ Y means X[j] ≤ Y[j] for every j.)

### Safety Algorithm

1. Let **Work = Available** and **Finish[i] = false** for every process i.
2. Find a process i such that **Finish[i] = false** and **Need[i] ≤ Work**. If there is none, go to step 4.
3. **Work = Work + Allocation[i]**; Finish[i] = true; go to step 2. (Pi can finish and release its resources.)
4. If **Finish[i] = true for all i**, the system is in a **safe state**; otherwise it is **unsafe**.

This algorithm needs about **m × n²** operations.

### Resource-Request Algorithm

When process Pi makes a request vector **Requestᵢ**:

1. If Requestᵢ ≤ Needᵢ, go to step 2. Otherwise, raise an **error** (the process has exceeded its maximum claim).
2. If Requestᵢ ≤ Available, go to step 3. Otherwise, Pi must **wait** (the resources are not available).
3. **Pretend** to allocate the resources:
   1. Available = Available − Requestᵢ
   2. Allocationᵢ = Allocationᵢ + Requestᵢ
   3. Needᵢ = Needᵢ − Requestᵢ
4. Run the **safety algorithm** on the new state. If it is **safe**, the request is **granted**. If it is **unsafe**, Pi must **wait**, and the old state is **restored**.

### Worked Example

Five processes P0–P4 and three resource types: A (10 instances), B (5 instances) and C (7 instances).

| Process | Allocation (A B C) | Max (A B C) |
| --- | --- | --- |
| P0 | 0 1 0 | 7 5 3 |
| P1 | 2 0 0 | 3 2 2 |
| P2 | 3 0 2 | 9 0 2 |
| P3 | 2 1 1 | 2 2 2 |
| P4 | 0 0 2 | 4 3 3 |

**Step 1 — Available.** Total allocated = (0+2+3+2+0, 1+0+0+1+0, 0+0+2+1+2) = (7, 2, 5).
Available = (10, 5, 7) − (7, 2, 5) = **(3, 3, 2)**.

**Step 2 — Need = Max − Allocation:**

| Process | Need (A B C) |
| --- | --- |
| P0 | 7 4 3 |
| P1 | 1 2 2 |
| P2 | 6 0 0 |
| P3 | 0 1 1 |
| P4 | 4 3 1 |

**Step 3 — Safety algorithm** (check the processes in order, repeatedly):

| Step | Process | Need ≤ Work? | Work = Work + Allocation |
| --- | --- | --- | --- |
| Start | — | — | (3, 3, 2) |
| 1 | P0 | (7,4,3) ≤ (3,3,2)? No | — |
| 2 | P1 | (1,2,2) ≤ (3,3,2) ✓ | (3,3,2) + (2,0,0) = (5, 3, 2) |
| 3 | P2 | (6,0,0) ≤ (5,3,2)? No | — |
| 4 | P3 | (0,1,1) ≤ (5,3,2) ✓ | (5,3,2) + (2,1,1) = (7, 4, 3) |
| 5 | P4 | (4,3,1) ≤ (7,4,3) ✓ | (7,4,3) + (0,0,2) = (7, 4, 5) |
| 6 | P0 | (7,4,3) ≤ (7,4,5) ✓ | (7,4,5) + (0,1,0) = (7, 5, 5) |
| 7 | P2 | (6,0,0) ≤ (7,5,5) ✓ | (7,5,5) + (3,0,2) = (10, 5, 7) |

All processes can finish, so the system is in a **safe state** with the safe sequence **⟨P1, P3, P4, P0, P2⟩**. (A system can have more than one safe sequence; any one is enough.)

**Step 4 — Request by P1 for (1, 0, 2):**

1. Request (1,0,2) ≤ Need of P1 (1,2,2) ✓
2. Request (1,0,2) ≤ Available (3,3,2) ✓
3. Pretend to allocate: Available = (3,3,2) − (1,0,2) = **(2, 3, 0)**; Allocation of P1 = (3, 0, 2); Need of P1 = (0, 2, 0).
4. Safety check from Work = (2,3,0): P1 (0,2,0) ✓ → (5,3,2); P3 (0,1,1) ✓ → (7,4,3); P4 (4,3,1) ✓ → (7,4,5); P0 (7,4,3) ✓ → (7,5,5); P2 (6,0,0) ✓ → (10,5,7).

The new state is **safe** (sequence ⟨P1, P3, P4, P0, P2⟩), so the request is **granted**.

**Step 5 — In this new state:**

1. **P4 requests (3, 3, 0):** (3,3,0) ≤ Need (4,3,1) ✓, but (3,3,0) ≤ Available (2,3,0)? **No** (only 2 of A are free) → P4 must **wait**.
2. **P0 requests (0, 2, 0):** (0,2,0) ≤ Need (7,4,3) ✓ and ≤ Available (2,3,0) ✓. Pretend: Available = (2, 1, 0). Now no process's Need fits: P0 (7,2,3), P1 (0,2,0), P2 (6,0,0), P3 (0,1,1), P4 (4,3,1) — every one needs more than (2,1,0) in some column. The state would be **unsafe**, so the request is **not granted** (P0 waits), even though the resources are available.

### Advantages of the Banker's Algorithm

1. Avoids deadlock while allowing all four conditions (better utilization than prevention).
2. Works for resources with several instances.
3. Each request is checked before it is granted.

### Disadvantages of the Banker's Algorithm

1. Each process must know and declare its **maximum need in advance**, which is rarely possible.
2. The **number of processes** must be fixed; new processes cannot join freely.
3. The number of resources must remain constant (a device that fails reduces it).
4. Processes must release all their resources within a finite time.
5. It is **expensive** (about m × n² operations on every request), so it is rarely used in general-purpose operating systems.

## References {#references}

**TutorialsPoint**

- [Deadlock Handling](https://www.tutorialspoint.com/operating_system/os_deadlock_handling.htm) — accessed 2026-11-03
- [Deadlock Prevention](https://www.tutorialspoint.com/operating_system/os_deadlock_prevention.htm) — accessed 2026-11-03
- [Deadlock Avoidance (Banker's Algorithm)](https://www.tutorialspoint.com/operating_system/os_deadlock_avoidance_bankers_algorithm.htm) — accessed 2026-11-03 (same example as these notes; its safe sequence ⟨P1, P3, P4, P0, P2⟩ agrees)
- [Deadlock Detection and Recovery](https://www.tutorialspoint.com/operating_system/os_deadlock_detection_and_recovery.htm) — accessed 2026-11-03 (it says an unsafe state indicates deadlock; an unsafe state only makes deadlock possible, as GeeksforGeeks and TpointTech state)

**GeeksforGeeks**

- [Introduction of Deadlock in Operating System](https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/) — accessed 2026-11-03
- [Deadlock Prevention](https://www.geeksforgeeks.org/operating-systems/deadlock-prevention/) — accessed 2026-11-03
- [Deadlock Detection And Recovery](https://www.geeksforgeeks.org/operating-systems/deadlock-detection-recovery/) — accessed 2026-11-03
- [Banker's Algorithm](https://www.geeksforgeeks.org/operating-systems/bankers-algorithm-in-operating-system-2/) — accessed 2026-11-03 (its code example's data is inconsistent: P3's allocation exceeds its maximum, and the Available vector does not match the stated totals; the example in these notes uses consistent data)

**TpointTech**

- [Deadlock avoidance in Operating Systems](https://www.tpointtech.com/os-deadlock-avoidance) — accessed 2026-11-03
- [Banker's Algorithm in Operating System](https://www.tpointtech.com/bankers-algorithm-in-operating-system) — accessed 2026-11-03 (its example says P3's request (0, 1, 0, 2) can be granted; recomputing with its own data shows the resulting state is unsafe, so the request must wait — checked with a script)
- [Resource Allocation Graph (RAG) in OS](https://www.tpointtech.com/os-resource-allocation-graph) — accessed 2026-11-03
- [OS Deadlock Detection using RAG](https://www.tpointtech.com/os-deadlock-detection-using-rag) — accessed 2026-11-03
- [Deadlock Detection and Recovery in OS](https://www.tpointtech.com/os-deadlock-detection-and-recovery) — accessed 2026-11-03

**IT Job QnS**

- [Operating System](https://it.jobqns.com/operating-system/) — accessed 2026-11-03 (deadlock conditions, prevention, safe state, RAG, wait-for graph, Need = Max − Allocation, and recovery questions)

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources**

- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "Deadlocks" — the claim-edge RAG algorithm, the multiple-instance detection example, when to invoke detection, and the factors for choosing a victim (the reference websites cover these only briefly)

All Banker's-algorithm and detection-algorithm results in these notes were computed with a script and checked by hand.
