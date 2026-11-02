---
description: Semaphores and synchronization mechanisms - the definition, initialization, wait and signal operations of semaphores, using semaphores for mutual exclusion and process synchronization, implementation of semaphores, critical regions, conditional critical regions, monitors, and Ada tasks.
updated: 2026-11-03
---

## Definition of Semaphores {#definition-of-semaphores}

> **A semaphore is an integer variable used to control access to shared resources and to synchronize cooperating processes. After it is given an initial value, it can be changed only by two atomic operations: `wait()` and `signal()`.**

The semaphore was introduced by the Dutch computer scientist **Edsger W. Dijkstra** (in 1962–63, while building the THE multiprogramming system). The two operations were originally called **P** and **V**, from Dutch words: V is usually explained as *verhogen* ("to increase") and P as *proberen* ("to test") — Dijkstra himself later said P stood for *prolaag* ("try to decrease"):

| Operation | Other names | Effect |
| --- | --- | --- |
| `wait(S)` | P(S), down(S) | Decrements S; the process waits if no resource is available |
| `signal(S)` | V(S), up(S) | Increments S; wakes a waiting process if there is one |

**Atomic** means that when one process changes the semaphore value, no other process can change the same semaphore at the same time — the test and the change happen as one indivisible step.

### Types of Semaphores

1. **Binary semaphore:** its value is only **0 or 1**. It is used for mutual exclusion (a single resource, such as one printer). A binary semaphore used for mutual exclusion is similar to a **mutex lock**.
2. **Counting semaphore:** its value can range over an unrestricted domain (0 to N). It controls access to a resource that has **N identical instances** (for example, 5 printers or 3 database connections). Its value is the number of free instances.

| Basis | Binary semaphore | Counting semaphore |
| --- | --- | --- |
| Values | 0 and 1 | 0 to N (and negative in the blocking implementation) |
| Use | Mutual exclusion; one resource | Resources with several instances |
| Processes allowed in at once | One | Up to N |
| Initial value (usual) | 1 | N (number of instances) |

### Mutex vs Semaphore

| Basis | Mutex | Semaphore |
| --- | --- | --- |
| Nature | A locking mechanism (an object) | A signalling mechanism (an integer) |
| Operations | `lock()` / `unlock()` (acquire/release) | `wait()` / `signal()` |
| Ownership | Only the process that locked it can unlock it | Any process can signal it |
| Holders at once | One | One (binary) or up to N (counting) |

### Advantages of Semaphores

1. Enforce mutual exclusion and synchronize processes.
2. With the blocking implementation, there is no busy waiting, so no CPU time is wasted.
3. Machine-independent; implemented in the OS kernel.
4. Flexible resource management (counting semaphores).

### Disadvantages of Semaphores

1. Easy to misuse: a wrong order of `wait()` and `signal()`, or a missing call, causes deadlock or breaks mutual exclusion — and such timing errors are hard to find.
2. **Deadlock:** processes can wait on each other's semaphores in a cycle.
3. **Starvation:** a process may wait indefinitely if the waiting queue is not served fairly (for example, LIFO).
4. **Priority inversion:** a high-priority process may be blocked waiting for a semaphore held by a low-priority process.
5. Not modular; difficult to use in large programs.

## Semaphore Initialization {#semaphore-initialization}

A semaphore must be given an initial value before it is used — this is the only time it is changed without `wait()` or `signal()`. The initial value depends on the purpose:

| Purpose | Initial value | Meaning |
| --- | --- | --- |
| Mutual exclusion (`mutex`) | **1** | One process may enter the critical section |
| Resource with N instances | **N** | N processes may use the resource at once |
| Ordering / event signalling (`synch`) | **0** | The waiting process must wait until the event is signalled |
| Bounded buffer `empty` | **n** (buffer size) | All slots are empty at the start |
| Bounded buffer `full` | **0** | No slot is full at the start |

In POSIX C a semaphore is initialized with `sem_init(&s, 0, 1);` (the last argument is the initial value).

**Value of a semaphore after operations.** Each `wait()` decreases the value by 1 and each `signal()` increases it by 1, so:

> **Final value = Initial value − (number of wait operations) + (number of signal operations)**

**Example 1:** a counting semaphore is initialized to 12; then 10 `wait` (P) and 4 `signal` (V) operations are performed.

1. After 10 P operations: 12 − 10 = 2.
2. After 4 V operations: 2 + 4 = **6**.

**Example 2:** a counting semaphore is initialized to 7; then 20 P operations and 15 V operations are performed.

Final value = 7 − 20 + 15 = **2**.

## Wait Operation {#wait-operation}

The `wait()` operation can be defined in two ways: with **busy waiting** or with **blocking**.

The `wait()` operation (P, down) is used **before** entering the critical section or using a resource.

### Busy-Waiting Definition

```c
wait(S) {
    while (S <= 0)
        ;        /* busy-wait (no operation) */
    S--;
}
```

1. If S > 0, a resource is free: S is decremented and the process continues.
2. If S ≤ 0, no resource is free: the process keeps looping (testing S) until another process signals.

### Blocking Definition

```c
wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;   /* the semaphore's waiting queue */
        block();                       /* suspend the process */
    }
}
```

The value is decremented first; if it becomes negative, the process is placed in the semaphore's waiting queue and blocked (it goes to the waiting state and uses no CPU time).

## Signal Operation {#signal-operation}

The `signal()` operation is also defined in two ways, matching the two definitions of `wait()`.

The `signal()` operation (V, up) is used **after** leaving the critical section or releasing a resource.

### Busy-Waiting Definition

```c
signal(S) {
    S++;
}
```

### Blocking Definition

```c
signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove a process P from S->list;
        wakeup(P);                     /* move P to the ready queue */
    }
}
```

If the value is still ≤ 0 after the increment, some processes are waiting, so one of them is removed from the queue and woken up.

**Example (counting semaphore, 3 printers, initial value 3):**

| Step | Operation | S.value | Result |
| --- | --- | --- | --- |
| 1 | P1: wait | 2 | P1 gets a printer |
| 2 | P2: wait | 1 | P2 gets a printer |
| 3 | P3: wait | 0 | P3 gets a printer |
| 4 | P4: wait | −1 | No printer free; P4 is blocked and queued |
| 5 | P1: signal | 0 | P4 is woken up and gets P1's printer |

## Use of Semaphores to Implement Mutex {#use-of-semaphores-to-implement-mutex}

A binary semaphore `mutex`, initialized to **1**, gives mutual exclusion among n processes:

```c
semaphore mutex = 1;

/* every process Pi */
do {
    wait(mutex);          /* entry section */
        /* critical section */
    signal(mutex);        /* exit section */
        /* remainder section */
} while (true);
```

**How it works (two processes P1 and P2):**

| Step | Event | mutex | Result |
| --- | --- | --- | --- |
| 1 | Start | 1 | The critical section is free |
| 2 | P1: wait(mutex) | 0 | P1 enters the critical section |
| 3 | P2: wait(mutex) | −1 | P2 is blocked (or busy-waits) |
| 4 | P1: signal(mutex) | 0 | P2 is woken up and enters |
| 5 | P2: signal(mutex) | 1 | The critical section is free again |

This satisfies **mutual exclusion** (only one process can find the value positive and decrement it) and **progress**; with a FIFO waiting queue it also gives **bounded waiting**.

**Common mistakes:**

1. `signal(mutex) … wait(mutex)` (order reversed): several processes enter together — mutual exclusion is broken.
2. `wait(mutex) … wait(mutex)`: the process blocks itself forever — deadlock.
3. Omitting `wait()` or `signal()`: mutual exclusion is broken, or the processes deadlock.

## Process Synchronization Using Semaphores {#process-synchronization-using-semaphores}

Besides mutual exclusion, semaphores can impose an **order** on the execution of processes.

### Ordering Two Statements

Suppose statement **S1** in process P1 must execute **before** statement **S2** in process P2. Use a semaphore `synch` initialized to **0**:

```c
semaphore synch = 0;

/* Process P1 */          /* Process P2 */
S1;                        wait(synch);
signal(synch);             S2;
```

If P2 reaches `wait(synch)` first, it blocks (synch = 0) until P1 executes S1 and `signal(synch)`. So S2 always runs after S1.

### Classical Problems Solved with Semaphores

1. **Producer–consumer (bounded buffer):** semaphores `mutex = 1`, `empty = n`, `full = 0` (see [Producer and Consumer Processes](/topics/operating-systems/process-synchronization-and-concurrency#producer-and-consumer-processes)).
2. **Readers–writers problem:** many readers may read shared data at the same time, but a writer needs exclusive access. Semaphores `rw_mutex = 1` (writer exclusion) and `mutex = 1` (protects `read_count`).
3. **Dining philosophers problem:** five philosophers share five chopsticks; each chopstick is a semaphore initialized to 1. The simple solution can deadlock if all philosophers pick up their left chopstick at the same time, so extra rules are needed (for example, allow at most four philosophers at the table, or let one philosopher pick up the right chopstick first).

#### Readers–Writers Solution

```c
semaphore rw_mutex = 1, mutex = 1;
int read_count = 0;

/* Writer */                     /* Reader */
wait(rw_mutex);                   wait(mutex);
    /* writing */                 read_count++;
signal(rw_mutex);                 if (read_count == 1) wait(rw_mutex);  /* first reader locks out writers */
                                  signal(mutex);
                                      /* reading */
                                  wait(mutex);
                                  read_count--;
                                  if (read_count == 0) signal(rw_mutex); /* last reader lets writers in */
                                  signal(mutex);
```

## Implementation of Semaphores {#implementation-of-semaphores}

### Problem with Busy Waiting

The simple definition of `wait()` uses **busy waiting**: a waiting process keeps looping and wastes CPU time that another process could use. A semaphore that busy-waits is called a **spinlock**. Spinlocks are useful only when the wait is expected to be very short (for example, on multiprocessors), because no context switch is needed.

### Implementation with a Waiting Queue (No Busy Waiting)

The semaphore is defined as a structure with an integer value and a list (queue) of waiting processes:

```c
typedef struct {
    int value;
    struct process *list;   /* queue of processes waiting on this semaphore */
} semaphore;
```

Two operations are provided by the OS as system calls:

1. **`block()`:** suspends the process that calls it (moves it to the waiting state).
2. **`wakeup(P)`:** resumes the blocked process P (moves it to the ready queue).

`wait()` and `signal()` are then defined as in the blocking versions above:

1. In `wait()`, if the value becomes negative, the process is added to the list and blocked.
2. In `signal()`, if the value is still ≤ 0, one process is removed from the list and woken up.

With this implementation, the value can become **negative**; its **magnitude is the number of processes waiting** on the semaphore. If the list is a **FIFO queue**, bounded waiting is guaranteed.

### Making wait() and signal() Atomic

No two processes may execute `wait()` and `signal()` on the same semaphore at the same time — these operations are themselves critical sections. They are made atomic by:

1. **Disabling interrupts** while they execute (on a single processor).
2. Using a **spinlock** with an atomic instruction such as Test-and-Set or Compare-and-Swap (on a multiprocessor).

Busy waiting is not removed completely, but it is limited to the very short critical sections of `wait()` and `signal()`.

## Critical Regions {#critical-regions}

Semaphores are easy to misuse. A **critical region** is a higher-level, **language** construct, proposed by **Per Brinch Hansen** and **C. A. R. Hoare** (1972), that lets the **compiler** enforce mutual exclusion.

1. A shared variable is declared with the keyword `shared`:

   ```text
   var v : shared T;
   ```

2. The shared variable can be accessed **only inside** a region statement:

   ```text
   region v do S;
   ```

   While statement S is being executed, no other process can access the variable v. If several processes try to execute region statements on v at the same time, only one at a time is allowed.

3. The compiler checks that v is used only inside region statements, and translates each region into semaphore operations, using a semaphore `v_mutex` (initialized to 1) that it creates itself:

   ```text
   wait(v_mutex);
   S;
   signal(v_mutex);
   ```

**Advantages:** the programmer cannot forget a `wait()` or `signal()` or put them in the wrong order; mutual exclusion is checked by the compiler. **Disadvantage:** a critical region gives mutual exclusion only — it cannot make a process wait for a **condition** (for example, "buffer not empty"). The critical region concept as such was not adopted by any non-experimental language.

## Conditional Critical Regions {#conditional-critical-regions}

A **conditional critical region** adds a **condition (guard)** to a critical region:

```text
region v when B do S;
```

where **B** is a Boolean expression.

1. A process entering the region gets exclusive access to v and evaluates B.
2. If **B is true**, statement S is executed.
3. If **B is false**, the process **releases** its exclusive access to v and is **delayed** until B becomes true (after some other process has changed v), and no other process is in the region associated with v.

**Example — bounded buffer:**

```text
var buffer : shared record
                 pool : array [0..n-1] of item;
                 count, in, out : integer;
             end;

/* Producer */
region buffer when count < n do
begin
    pool[in] := next_produced;
    in := (in + 1) mod n;
    count := count + 1;
end;

/* Consumer */
region buffer when count > 0 do
begin
    next_consumed := pool[out];
    out := (out + 1) mod n;
    count := count - 1;
end;
```

The producer waits while the buffer is full (`count < n` is false), and the consumer waits while it is empty (`count > 0` is false).

**Implementation:** the compiler uses two semaphores — one for mutual exclusion on the shared variable, and one on which processes wait for the condition B to become true (when a process leaves the region, the waiting processes re-test their conditions).

**Advantage:** both mutual exclusion and condition synchronization are expressed clearly. **Disadvantage:** the conditions must be re-evaluated repeatedly, which is costly. Conditional critical regions led to the **monitor**.

## Monitors {#monitors}

### Definition

> **A monitor is a high-level synchronization construct (an abstract data type) that groups shared data with the procedures that operate on it. Only one process at a time can be active inside a monitor.**

The monitor concept was developed in the early 1970s by **Per Brinch Hansen** and **C. A. R. Hoare**, as a combination of abstract data types and critical regions. Monitors were first implemented in Brinch Hansen's **Concurrent Pascal**. Processes outside the monitor cannot access its variables directly; they can only call its procedures. **Mutual exclusion is automatic** — the programmer does not write `wait()` and `signal()` for it.

### Structure (Syntax)

```text
monitor monitor_name
{
    /* shared variable declarations */
    condition x, y;

    procedure P1 ( … ) { … }
    procedure P2 ( … ) { … }
    …
    procedure Pn ( … ) { … }

    initialization_code ( … ) { … }
}
```

![Structure of a monitor: shared data, operations, initialization code, entry queue and condition queues](/diagrams/operating-systems/monitor.svg)

### Condition Variables

Mutual exclusion alone is not enough; a process may need to wait for a condition (for example, "buffer not empty"). Monitors provide **condition variables** with two operations:

1. **`x.wait()`:** the calling process is **suspended** (always blocked) and **releases the monitor**, so that another process can enter.
2. **`x.signal()`:** resumes **exactly one** process suspended on x. If no process is suspended on x, `x.signal()` has **no effect** — it is not remembered. (This is the difference from a semaphore's `signal()`, which always changes the value.)

When process P signals and Q is resumed, both cannot be active in the monitor, so one policy is chosen:

1. **Signal and wait** (Hoare-style): P waits until Q leaves the monitor (or waits for another condition).
2. **Signal and continue** (Mesa-style): Q waits until P leaves the monitor (or waits for another condition).

### Example: Bounded Buffer Monitor

```text
monitor BoundedBuffer
{
    item buffer[N];
    int count = 0, in = 0, out = 0;
    condition not_full, not_empty;

    procedure insert(item x) {
        if (count == N) not_full.wait();
        buffer[in] = x;  in = (in + 1) % N;  count++;
        not_empty.signal();
    }

    procedure remove(item *x) {
        if (count == 0) not_empty.wait();
        *x = buffer[out];  out = (out + 1) % N;  count--;
        not_full.signal();
    }
}
```

In Java, every object can act as a monitor: `synchronized` methods give mutual exclusion, and `wait()`, `notify()` and `notifyAll()` act on the object's condition.

### Advantages and Disadvantages

- **Advantages:** automatic mutual exclusion; fewer timing errors than semaphores; shared data and its operations are encapsulated together (modular).
- **Disadvantages:** must be supported by the programming language and compiler (Concurrent Pascal, Java, C#, Ada and others); less flexible than semaphores; not directly usable in languages without monitor support.

### Semaphore vs Monitor

| Basis | Semaphore | Monitor |
| --- | --- | --- |
| Nature | An integer variable | An abstract data type (language construct) |
| Level | Low level | High level |
| Mutual exclusion | Must be coded by the programmer with wait/signal | Automatic |
| Condition variables | None | Yes (`x.wait()`, `x.signal()`) |
| Effect of signal with no waiting process | The value is incremented (remembered) | No effect (not remembered) |
| Access to shared data | Shared data is outside the semaphore | Only through the monitor's procedures |
| Errors | Prone to timing errors | Fewer errors; easier to use correctly |
| Support | OS kernel (system calls) | Programming language and compiler |

## Ada Tasks {#ada-tasks}

**Ada** is a programming language designed (led by **Jean Ichbiah**) for the **United States Department of Defense** for embedded and real-time systems; the first standard was **Ada 83**. Concurrency is part of the language itself: a concurrent unit in Ada is called a **task**.

### Tasks

1. A task has a **specification** (which lists its **entries** — the services it offers to other tasks) and a **body** (its code).
2. Tasks start running automatically when the block or program that declares them begins; a block cannot end until all its tasks have terminated.
3. Task types let tasks be created dynamically.

### Communication by Rendezvous

Ada tasks communicate and synchronize by a **rendezvous** (meeting):

1. A **calling task** calls an **entry** of another task, for example `Buffer.Insert(X);`.
2. The **called task** executes an **`accept`** statement for that entry.
3. Whichever task arrives first **waits** for the other: the caller waits until the server reaches `accept`; the server waits at `accept` until a call arrives. Callers wait in a **FIFO queue** for each entry.
4. During the rendezvous, the code inside the `accept` statement runs while the caller waits; then both continue independently.

This is **synchronous message passing**; mutual exclusion is automatic because a task accepts only one call at a time.

### Selective Wait

A **`select`** statement lets a server task wait for calls on several entries at once. Each alternative can have a **guard** (`when condition =>`), so an entry is accepted only when its condition is true — similar to a conditional critical region. Other options are `else` (do not wait), `delay` (wait for a limited time) and `terminate`.

### Example: A Bounded Buffer Task

```ada
task Buffer is
   entry Insert (X : in  Item);
   entry Remove (X : out Item);
end Buffer;

task body Buffer is
   Pool  : array (0 .. N - 1) of Item;
   Count : Integer := 0;
   In_P, Out_P : Integer := 0;
begin
   loop
      select
         when Count < N =>
            accept Insert (X : in Item) do
               Pool (In_P) := X;
            end Insert;
            In_P := (In_P + 1) mod N;  Count := Count + 1;
      or
         when Count > 0 =>
            accept Remove (X : out Item) do
               X := Pool (Out_P);
            end Remove;
            Out_P := (Out_P + 1) mod N;  Count := Count - 1;
      or
         terminate;
      end select;
   end loop;
end Buffer;
```

The guard `when Count < N` stops producers when the buffer is full, and `when Count > 0` stops consumers when it is empty.

### Protected Objects (Ada 95)

Ada 95 added **protected objects**, which work like monitors: they encapsulate data and give mutual exclusion without explicit locks. Their **entries** have **barriers** (Boolean conditions) that must be true before the entry body runs.

## References {#references}

**TutorialsPoint**

- [Semaphores](https://www.tutorialspoint.com/operating_system/semaphores_in_os.htm) — accessed 2026-11-03 (it describes priority inversion the wrong way round; in priority inversion a high-priority process is blocked by a low-priority one, as GeeksforGeeks states)
- [Counting Semaphores](https://www.tutorialspoint.com/operating_system/counting_semaphores_in_os.htm) — accessed 2026-11-03
- [Mutex](https://www.tutorialspoint.com/operating_system/mutex_in_os.htm) — accessed 2026-11-03
- [Monitors](https://www.tutorialspoint.com/operating_system/os_monitors_in_process_synchronization.htm) — accessed 2026-11-03
- TutorialsPoint has no page on critical regions, conditional critical regions or Ada tasks (checked 2026-11-03).

**GeeksforGeeks**

- [Semaphores in Process Synchronization](https://www.geeksforgeeks.org/operating-systems/semaphores-in-process-synchronization/) — accessed 2026-11-03
- [Monitors in Process Synchronization](https://www.geeksforgeeks.org/operating-systems/monitors-in-process-synchronization/) — accessed 2026-11-03
- [Monitor vs Semaphore](https://www.geeksforgeeks.org/operating-systems/monitor-vs-semaphore/) — accessed 2026-11-03
- [Critical Regions in Operating System](https://www.geeksforgeeks.org/operating-systems/critical-regions-in-operating-system/) — accessed 2026-11-03 (it describes a critical region only in general terms, without the `region` construct)
- [Producer Consumer Solution using Semaphores](https://www.geeksforgeeks.org/operating-systems/producer-consumer-problem-using-semaphores-set-1/) — accessed 2026-11-03

**TpointTech**

- [Counting Semaphore](https://www.tpointtech.com/os-counting-semaphore) — accessed 2026-11-03
- [Problem on Counting Semaphore](https://www.tpointtech.com/os-problem-on-counting-semaphore) — accessed 2026-11-03
- [Difference between Semaphore and Monitor](https://www.tpointtech.com/semaphore-vs-monitor) — accessed 2026-11-03
- [Sleep and Wake in Process Synchronization](https://www.tpointtech.com/os-sleep-and-wake) — accessed 2026-11-03
- TpointTech has no page on critical regions, conditional critical regions or Ada tasks (checked 2026-11-03).

**IT Job QnS**

- [Operating System](https://it.jobqns.com/operating-system/) — accessed 2026-11-03 (semaphore values, counting semaphores and monitors)

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (used because the reference websites do not cover critical regions, conditional critical regions and Ada tasks)

- [CS322 Concurrency lecture notes — critical regions, conditional critical regions and monitors](https://www.cs.gordon.edu/courses/cs322/lectures/concurrency7.html) — Gordon College — accessed 2026-11-03
- Per Brinch Hansen, "Structured Multiprogramming", *Communications of the ACM* 15(7), 1972 — the `region v do S` construct
- [Ada Programming/Tasking](https://en.wikibooks.org/wiki/Ada_Programming/Tasking) — Wikibooks — accessed 2026-11-03
- [Ada (programming language)](https://en.wikipedia.org/wiki/Ada_(programming_language)) — Wikipedia (designer, purpose and standards) — accessed 2026-11-03
- [Semaphore (programming)](https://en.wikipedia.org/wiki/Semaphore_(programming)) — Wikipedia (Dijkstra and the names P and V) — accessed 2026-11-03
- [Monitor (synchronization)](https://en.wikipedia.org/wiki/Monitor_(synchronization)) — Wikipedia (origin of monitors; Hoare-style and Mesa-style signalling) — accessed 2026-11-03
- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts* — semaphore implementation with a waiting queue, the readers–writers and dining-philosophers problems, and monitor condition variables
