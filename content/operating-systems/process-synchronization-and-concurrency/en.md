---
description: Process synchronization and concurrency - problems of concurrent processes and race conditions, the critical section problem and its requirements, software and hardware solutions (lock variable, strict alternation, Peterson's algorithm, interrupt disabling, test-and-set, swap), mutual exclusion, synchronization, an introduction to deadlock, process co-operation, and the producer-consumer problem.
updated: 2026-11-03
---

## Problems of Concurrent Processes {#problems-of-concurrent-processes}

When several processes run **concurrently** (their executions overlap in time) and **share data or resources**, their results can become wrong if their access is not controlled. The main problems are:

1. **Race condition:** the result depends on the order in which the processes happen to run.
2. **Data inconsistency:** shared data is left corrupted or inconsistent.
3. **Deadlock:** processes wait for each other forever.
4. **Starvation:** a process is repeatedly denied the resource it needs.
5. **Difficult debugging:** errors depend on timing, so they are hard to reproduce.

### Race Condition

> **A race condition is a situation in which several processes access and change the same shared data at the same time, and the final result depends on the order in which the accesses happen.**

**Example.** A shared variable `count` = 5. A producer process executes `count++` and a consumer process executes `count--` at the same time. The correct final value is 5 + 1 − 1 = **5**.

Each high-level statement is executed as three machine instructions:

| Producer (`count++`) | Consumer (`count--`) |
| --- | --- |
| P1: `R1 = count` (load) | C1: `R2 = count` (load) |
| P2: `R1 = R1 + 1` | C2: `R2 = R2 − 1` |
| P3: `count = R1` (store) | C3: `count = R2` (store) |

If a context switch interleaves them in the order P1, P2, C1, C2, P3, C3:

| Step | Instruction | R1 | R2 | count |
| --- | --- | --- | --- | --- |
| 1 | P1: R1 = count | 5 | | 5 |
| 2 | P2: R1 = R1 + 1 | 6 | | 5 |
| 3 | C1: R2 = count | 6 | 5 | 5 |
| 4 | C2: R2 = R2 − 1 | 6 | 4 | 5 |
| 5 | P3: count = R1 | 6 | 4 | **6** |
| 6 | C3: count = R2 | 6 | 4 | **4** |

The final value is **4** instead of 5 (the producer's update was lost). If P3 and C3 were executed in the opposite order, the result would be **6**. To prevent this, only one process at a time may execute the code that changes `count` — this is the [critical section problem](#critical-section-problem).

## Critical Section Problem {#critical-section-problem}

### Critical Section

> **A critical section is the part of a program in which a process accesses shared resources, such as shared variables, files or devices.**

No two processes may execute their critical sections at the same time.

### Structure of a Process

```text
do {
    entry section        // request permission to enter
        critical section // access the shared data
    exit section         // announce that the critical section is free
        remainder section
} while (true);
```

1. **Entry section:** the code that requests permission to enter the critical section.
2. **Critical section:** the code that uses the shared resources.
3. **Exit section:** the code that releases the critical section so that another process can enter.
4. **Remainder section:** the rest of the code.

### The Critical Section Problem

> **The critical section problem is the problem of designing a protocol (entry and exit sections) that cooperating processes can use, so that no two of them execute their critical sections at the same time.**

### Requirements of a Solution

A correct solution must satisfy three requirements:

1. **Mutual exclusion:** if one process is executing in its critical section, no other process may execute in its critical section.
2. **Progress:** if no process is in its critical section and some processes want to enter, only the processes that are not in their remainder sections can take part in deciding which enters next, and this decision cannot be postponed indefinitely. (A process that does not want to enter must not block the others.)
3. **Bounded waiting:** there is a limit on the number of times other processes can enter their critical sections after a process has requested entry and before its request is granted. (No process waits forever.)

Mutual exclusion and progress are the **primary** requirements; bounded waiting is **secondary**. A good solution should also be **architecturally neutral (portable)**: it should not depend on the number or speed of the CPUs or on special hardware.

## Solutions to the Critical Section Problem {#solutions-to-the-critical-section-problem}

### Types of Solutions

Solutions to the critical section problem are of four types:

1. **Software solutions:** lock variable, strict alternation (turn variable), Peterson's algorithm, Dekker's algorithm, Bakery algorithm.
2. **Hardware solutions:** disabling interrupts, the Test-and-Set (TSL) instruction, the Swap (exchange) instruction, Compare-and-Swap.
3. **Operating-system solutions:** semaphores and mutex locks.
4. **Programming-language solutions:** monitors and critical regions.

Software and hardware solutions that keep looping until they can enter use **busy waiting** (the waiting process wastes CPU time). Semaphores and monitors can **block** the waiting process instead (see [Semaphores and Synchronization Mechanisms](/topics/operating-systems/semaphores-and-synchronization-mechanisms)).

### A. Software Solutions

#### 1. Lock Variable

A shared variable `lock` is 0 when the critical section is free and 1 when it is occupied.

```c
while (lock != 0) ;   /* entry: busy-wait while occupied */
lock = 1;
/* critical section */
lock = 0;             /* exit */
```

**Fails mutual exclusion.** Testing `lock` and setting it are two separate steps. Process P1 can read `lock = 0` and be preempted before it sets `lock = 1`; P2 then reads `lock = 0` and enters; when P1 resumes, it also enters. Both are in the critical section.

#### 2. Strict Alternation (Turn Variable)

A shared variable `turn` says whose turn it is (two processes, P0 and P1).

```c
/* Process Pi (j is the other process) */
while (turn != i) ;   /* busy-wait until it is my turn */
/* critical section */
turn = j;             /* give the turn to the other process */
/* remainder section */
```

- **Mutual exclusion:** satisfied.
- **Progress:** **not satisfied** — the processes must strictly alternate. If it is P0's turn but P0 does not want to enter, P1 cannot enter even though the critical section is free.

#### 3. Peterson's Algorithm

**Peterson's algorithm** is a software solution to the critical-section problem for **two processes**.

It combines the turn variable with an "interested" flag for each process.

- `flag[i] = true` means process Pi wants to enter.
- `turn` says which process must wait if both want to enter.

```c
/* shared: boolean flag[2] = {false, false}; int turn; */

/* Process Pi (j = 1 - i) */
do {
    flag[i] = true;                  /* I want to enter */
    turn = j;                        /* but let the other go first */
    while (flag[j] && turn == j) ;   /* busy-wait */

    /* critical section */

    flag[i] = false;                 /* exit: I am no longer interested */

    /* remainder section */
} while (true);
```

1. **Mutual exclusion:** both processes could be inside only if `turn` were equal to both i and j at the same time, which is impossible; the process that wrote `turn` last waits.
2. **Progress:** if Pj is not interested (`flag[j] == false`), Pi enters at once.
3. **Bounded waiting:** because each process sets `turn` to the other, a waiting process enters after at most one entry by the other process.

Peterson's algorithm satisfies **all three requirements**. Its limitations: it works for only two processes, it uses busy waiting, and on modern processors that reorder memory accesses it needs memory barriers (atomic variables).

### B. Hardware Solutions

#### 1. Disabling Interrupts

A process disables interrupts just before entering its critical section and enables them again on leaving. With interrupts off, no context switch can happen, so on a **single processor** no other process can run.

```text
disable interrupts
    critical section
enable interrupts
```

- **Advantage:** very simple; works on a uniprocessor.
- **Disadvantages:** does **not** work on **multiprocessors** (disabling interrupts on one CPU does not stop the others); it is dangerous to let user processes disable interrupts (a process might never enable them again); the clock and devices are not serviced while interrupts are off. It is used only inside the kernel for very short sections.

#### 2. Test-and-Set Lock (TSL) Instruction

Test-and-Set is a hardware instruction that **reads a memory word and sets it to true in one atomic (indivisible) operation**. Because the test and the set cannot be separated, the problem of the lock variable disappears.

```c
boolean TestAndSet(boolean *target) {   /* executed atomically by the hardware */
    boolean old = *target;
    *target = true;
    return old;
}

/* shared: boolean lock = false; */
do {
    while (TestAndSet(&lock)) ;   /* busy-wait until the old value was false */
    /* critical section */
    lock = false;                 /* exit */
    /* remainder section */
} while (true);
```

- Mutual exclusion: **satisfied**. Progress: **satisfied**.
- Bounded waiting: **not guaranteed** (a process may keep losing the race).
- It needs special hardware support and uses busy waiting.

#### 3. Swap (Exchange) Instruction

Swap atomically exchanges the contents of two words. Each process has a local variable `key`:

```c
/* shared: boolean lock = false; */
do {
    key = true;
    while (key == true)
        Swap(&lock, &key);   /* atomic exchange */
    /* critical section */
    lock = false;
    /* remainder section */
} while (true);
```

If `lock` was false, the swap sets `lock` to true and `key` to false, so the process enters. Swap gives mutual exclusion and progress but not bounded waiting.

### Comparison of the Solutions

| Solution | Type | Mutual exclusion | Progress | Bounded waiting | Busy waiting |
| --- | --- | --- | --- | --- | --- |
| Lock variable | Software | No | — | No | Yes |
| Strict alternation | Software | Yes | No | Yes | Yes |
| Peterson's algorithm | Software (2 processes) | Yes | Yes | Yes | Yes |
| Disabling interrupts | Hardware | Yes (uniprocessor only) | — | — | No |
| Test-and-Set | Hardware | Yes | Yes | No | Yes |
| Swap | Hardware | Yes | Yes | No | Yes |
| Semaphore | OS | Yes | Yes | Yes (with a FIFO queue) | No (blocking) |

## Mutual Exclusion {#mutual-exclusion}

### Definition

> **Mutual exclusion is the requirement that no two processes be in their critical sections at the same time: while one process is using a shared resource, all other processes are kept out.**

The term was introduced by **Edsger W. Dijkstra**. Mutual exclusion removes race conditions on shared data.

### Requirements for Mutual Exclusion

1. Only one process at a time is allowed in the critical section for a resource.
2. A process that halts in its remainder section must not interfere with other processes.
3. A process that wants to enter its critical section must not wait indefinitely (no deadlock or starvation).
4. When no process is in the critical section, a process that requests entry must be allowed to enter without delay.
5. No assumptions are made about the relative speeds or the number of processors.
6. A process stays in its critical section for a finite time only.

### Ways to Achieve Mutual Exclusion

1. **Software approach:** algorithms such as Peterson's, Dekker's and Lamport's Bakery algorithm, using shared variables and busy waiting. Error-prone and with high overhead.
2. **Hardware approach:** disabling interrupts, or special atomic instructions (Test-and-Set, Swap, Compare-and-Swap). Fast, but uses busy waiting and does not prevent starvation.
3. **Operating-system / language support:** mutex locks, semaphores and monitors.

### Examples

1. **Printer:** only one process may print at a time, otherwise the outputs mix.
2. **Bank account:** only one transaction may update a balance at a time, otherwise the balance becomes wrong.
3. **Shared database record:** only one transaction may change a record at a time.

## Synchronization {#synchronization}

### Definition

> **Process synchronization is the coordination of cooperating processes, so that they access shared data and resources in a controlled order and produce correct, consistent results.**

Synchronization is needed only for **cooperating processes** (processes that share data); independent processes do not need it.

### Types of Synchronization

1. **Competition (mutual exclusion):** processes compete for a shared resource, and only one may use it at a time — for example, two processes updating the same variable.
2. **Cooperation (condition synchronization / ordering):** one process must wait until another has done something — for example, a consumer must wait until the producer has produced an item, or statement S2 in P2 must run only after S1 in P1.

### Synchronization Mechanisms

1. **Locks / mutexes:** acquire before the critical section, release after it.
2. **Semaphores:** integer variables accessed with the atomic `wait()` and `signal()` operations; binary or counting.
3. **Monitors:** a high-level language construct that encapsulates shared data with its procedures; only one process at a time can be active inside it.
4. **Condition variables:** used with locks or monitors so that processes can wait until a condition becomes true and be signalled when it does.

### Goals of Synchronization

1. **Correctness:** preserve data integrity and consistency.
2. **Orderly resource management:** fair and efficient access to shared resources.
3. **Progress:** avoid deadlock and starvation.
4. **Maximum concurrency** and **no busy waiting** where possible.

Too much synchronization reduces parallelism and adds overhead; too little causes race conditions.

## Deadlock (Introduction) {#deadlock-introduction}

### Definition

> **A deadlock is a situation in which a set of processes are blocked forever, because each process holds a resource while waiting for another resource that is held by another process in the set.**

**Example:** process P1 holds resource R1 and requests R2, while process P2 holds R2 and requests R1. Neither can continue, and neither will release what it holds — both wait forever. (A familiar picture is two trains on the same single track, facing each other.)

### System Model

A process uses a resource in the following sequence:

1. **Request:** the process requests the resource; if it is not available, the process waits.
2. **Use:** the process uses the resource.
3. **Release:** the process releases the resource.

### Necessary Conditions for Deadlock (Coffman Conditions)

A deadlock can occur only if **all four** of the following conditions hold at the same time:

1. **Mutual exclusion:** at least one resource is non-shareable — only one process can use it at a time.
2. **Hold and wait:** a process holds at least one resource while waiting for other resources held by other processes.
3. **No preemption:** a resource cannot be taken away from a process; it is released only voluntarily by the process holding it.
4. **Circular wait:** a circular chain of processes {P0, P1, …, Pn} exists in which P0 waits for a resource held by P1, P1 waits for P2, …, and Pn waits for P0.

### Methods of Handling Deadlock

1. **Deadlock prevention:** ensure that at least one of the four conditions can never hold.
2. **Deadlock avoidance:** grant a request only if the system stays in a safe state (Banker's algorithm).
3. **Deadlock detection and recovery:** allow deadlocks, detect them, then recover (terminate processes or preempt resources).
4. **Deadlock ignorance (Ostrich algorithm):** ignore the problem and restart the system if a deadlock occurs (used by most general-purpose operating systems, such as Windows and UNIX).

These are explained in [Deadlock Management](/topics/operating-systems/deadlock-management).

### Deadlock vs Starvation

| Basis | Deadlock | Starvation |
| --- | --- | --- |
| Meaning | Processes block each other forever | A process waits indefinitely while others proceed |
| Processes affected | A set of processes, all blocked | One (or some) low-priority process |
| Cause | All four Coffman conditions hold | Unfair resource allocation or priorities |
| Progress of others | None in the set can proceed | Other processes keep running |
| Solution | Prevention, avoidance, detection and recovery | Aging |

## Process Co-operation {#process-co-operation}

### Independent and Cooperating Processes

1. **Independent process:** cannot affect or be affected by other processes; it shares no data with them. Its result depends only on its input.
2. **Cooperating process:** can affect or be affected by other processes; it shares data (variables, files, databases) with them. Its result may depend on the relative order of execution.

| Basis | Independent process | Cooperating process |
| --- | --- | --- |
| Shares data with others | No | Yes |
| Affected by other processes | No | Yes |
| Result for the same input | Always the same | May vary with the execution order |
| Needs synchronization and IPC | No | Yes |

### Reasons for Process Co-operation

1. **Information sharing:** several users or processes may need the same information (for example, a shared file).
2. **Computation speed-up:** a task is divided into subtasks that run in parallel.
3. **Modularity:** the system is built from separate processes or threads.
4. **Convenience:** a user can do several tasks at the same time (for example, editing, printing and compiling).

### Methods of Co-operation

1. **Co-operation by sharing:** processes share data through **shared memory**; they must synchronize access to it (mutual exclusion).
2. **Co-operation by communication:** processes exchange **messages** (message passing). See [Interprocess Communication](/topics/operating-systems/ipc).

## Producer and Consumer Processes {#producer-and-consumer-processes}

### The Producer–Consumer Problem

The **producer–consumer problem** (also called the **bounded-buffer problem**) is a classic example of cooperating processes:

1. A **producer** process produces items (data) and puts them into a shared **buffer**.
2. A **consumer** process takes items out of the buffer and uses them.

Examples: a compiler producing assembly code that the assembler consumes; a print spooler; a web server producing pages that a browser consumes.

The buffer can be:

1. **Unbounded buffer:** no limit on size — the producer never waits; the consumer waits when the buffer is empty.
2. **Bounded buffer:** fixed size n — the producer must wait when the buffer is **full**, and the consumer must wait when it is **empty**.

### Conditions for a Correct Solution

1. The producer must not add an item to a **full** buffer.
2. The consumer must not remove an item from an **empty** buffer.
3. Only one process at a time may change the buffer (mutual exclusion).

### Solution with a Shared Counter (Has a Race Condition)

The buffer is a circular array of size `BUFFER_SIZE` with an index `in` (next free slot) and `out` (first full slot); `count` is the number of items in the buffer.

![Bounded buffer: a circular array with in and out indices between a producer and a consumer](/diagrams/operating-systems/bounded-buffer.svg)

```c
/* Producer */
while (true) {
    /* produce an item in next_produced */
    while (count == BUFFER_SIZE) ;      /* buffer full: do nothing */
    buffer[in] = next_produced;
    in = (in + 1) % BUFFER_SIZE;
    count++;
}

/* Consumer */
while (true) {
    while (count == 0) ;                /* buffer empty: do nothing */
    next_consumed = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    count--;
    /* consume the item in next_consumed */
}
```

Each routine is correct by itself, but when they run concurrently, `count++` and `count--` can interleave and give a wrong `count`, as shown in the [race condition example](#problems-of-concurrent-processes).

### Sleep and Wakeup (Lost Wake-up Problem)

To avoid busy waiting, the producer can **sleep** when the buffer is full and the consumer can **sleep** when it is empty; each **wakes up** the other when the buffer state changes. But a wake-up can be **lost**:

1. The consumer reads `count == 0` and decides to sleep.
2. Before it actually sleeps, it is preempted.
3. The producer inserts an item, sees `count == 1`, and sends a wake-up to the consumer — but the consumer is not asleep yet, so the wake-up is lost.
4. The consumer resumes and goes to sleep.
5. The producer eventually fills the buffer and sleeps too. **Both sleep forever.**

The problem is solved by storing the pending wake-ups in a counter — that is, by **semaphores**.

### Solution Using Semaphores

Three semaphores are used:

| Semaphore | Purpose | Initial value |
| --- | --- | --- |
| `mutex` | Mutual exclusion for the buffer (binary) | 1 |
| `empty` | Counts the empty slots | n (buffer size) |
| `full` | Counts the full slots | 0 |

```c
/* Producer */
do {
    /* produce an item */
    wait(empty);      /* wait for an empty slot */
    wait(mutex);      /* enter the critical section */
    /* add the item to the buffer */
    signal(mutex);    /* leave the critical section */
    signal(full);     /* one more full slot */
} while (true);

/* Consumer */
do {
    wait(full);       /* wait for a full slot */
    wait(mutex);
    /* remove an item from the buffer */
    signal(mutex);
    signal(empty);    /* one more empty slot */
    /* consume the item */
} while (true);
```

1. `empty` blocks the producer when the buffer is full.
2. `full` blocks the consumer when the buffer is empty.
3. `mutex` lets only one process change the buffer at a time.
4. The order of the `wait()` calls matters: each process waits on its counting semaphore **before** `mutex`. If the producer did `wait(mutex)` first and then blocked on `wait(empty)`, it would hold the mutex while sleeping, and the consumer could never enter — a deadlock.

**Example (buffer size 3):** initially empty = 3, full = 0. The producer produces two items → empty = 1, full = 2. The consumer consumes one → empty = 2, full = 1. If the producer produces three more items without the consumer running, the third `wait(empty)` finds empty = 0 and the producer blocks until the consumer frees a slot.

## References {#references}

**TutorialsPoint**

- [Process Synchronization](https://www.tutorialspoint.com/operating_system/os_process_synchronization.htm) — accessed 2026-11-03
- [Critical Section Problem](https://www.tutorialspoint.com/operating_system/os_critical_section_problem.htm) — accessed 2026-11-03
- [Solutions For Process Synchronization](https://www.tutorialspoint.com/operating_system/os_solution_to_process_synchronization_problem.htm) — accessed 2026-11-03 (it lists Test-and-Set under both software and hardware solutions; it is a hardware instruction)
- [Peterson's Algorithm](https://www.tutorialspoint.com/operating_system/os_peterson_solution_in_process_synchronization.htm) — accessed 2026-11-03
- [Mutual Exclusion Synchronization](https://www.tutorialspoint.com/operating_system/os_mutual_exclusion_in_synchronization.htm) — accessed 2026-11-03
- [Mutual Exclusion Using Interrupt Disabling](https://www.tutorialspoint.com/operating_system/os_mutual_exclusion_using_interrupt_disabling.htm) — accessed 2026-11-03
- [Producer Consumer Problem](https://www.tutorialspoint.com/operating_system/os_producer_consumer_problem.htm) — accessed 2026-11-03

**GeeksforGeeks**

- [Process Synchronization](https://www.geeksforgeeks.org/operating-system-process-synchronization/) — accessed 2026-11-03
- [Software Based Solutions in Process Synchronization](https://www.geeksforgeeks.org/gate/software-based-solutions/) — accessed 2026-11-03
- [Hardware Based Solutions in Process Synchronization](https://www.geeksforgeeks.org/operating-systems/hardware-based-solutions/) — accessed 2026-11-03
- [Mutual Exclusion in Synchronization](https://www.geeksforgeeks.org/operating-systems/mutual-exclusion-in-synchronization/) — accessed 2026-11-03
- [Concurrency in Operating System](https://www.geeksforgeeks.org/operating-systems/concurrency-in-operating-system/) — accessed 2026-11-03
- [Introduction of Deadlock in Operating System](https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/) — accessed 2026-11-03
- [Producer Consumer Solution using Semaphores](https://www.geeksforgeeks.org/operating-systems/producer-consumer-problem-using-semaphores-set-1/) — accessed 2026-11-03

**TpointTech**

- [Process Synchronization in OS](https://www.tpointtech.com/os-process-synchronization-introduction) — accessed 2026-11-03
- [Critical Section Problem in OS](https://www.tpointtech.com/os-critical-section-problem) — accessed 2026-11-03
- [Lock Variable Synchronization Mechanism](https://www.tpointtech.com/os-lock-variable-mechanism) — accessed 2026-11-03
- [OS TSL Mechanism](https://www.tpointtech.com/os-tsl-mechanism) — accessed 2026-11-03 (it says TSL is "provided by the operating system"; Test-and-Set is a CPU (hardware) instruction)
- [Turn Variable or Strict Alternation Approach](https://www.tpointtech.com/os-turn-variable-or-strict-alternation-approach) — accessed 2026-11-03
- [N-Process Peterson Algorithm](https://www.tpointtech.com/n-process-peterson-algorithm) — accessed 2026-11-03 (its code puts the critical section inside the busy-wait loop; the correct form, used in these notes, matches TutorialsPoint and GeeksforGeeks)
- [Sleep and Wake in Process Synchronization](https://www.tpointtech.com/os-sleep-and-wake) — accessed 2026-11-03

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).
