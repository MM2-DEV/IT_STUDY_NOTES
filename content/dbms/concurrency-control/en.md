---
description: Concurrency control - shared and exclusive locks, lock compatibility, two-phase locking and its strict, rigorous and conservative forms, multiple-granularity locking, timestamp-ordering protocol, Thomas write rule, validation-based protocol, and deadlock handling (prevention with wait-die and wound-wait, detection with wait-for graphs, recovery, starvation).
updated: 2026-11-06
---

## Lock-Based Protocols {#lock-based-protocols}

### Concurrency Control

Concurrency control is the **mechanism of the DBMS that controls the simultaneous execution of transactions** so that the database stays consistent.

It ensures that the resulting schedule is **serializable** (and preferably recoverable), preserving **isolation**. Without it, concurrent transactions cause lost updates, dirty reads, unrepeatable reads and incorrect summaries. The main techniques are **lock-based**, **timestamp-based** and **validation-based (optimistic)** protocols.

### Lock

A lock is a **variable associated with a data item** that controls access to that item by concurrent transactions.

A transaction must **obtain an appropriate lock on an item before reading or writing it**, and the **concurrency-control manager** grants or delays the request.

#### Types of Locks

1. **Shared lock (S, lock-S)** — allows the transaction to **read** the item but not write it. Several transactions can hold shared locks on the same item at the same time.
2. **Exclusive lock (X, lock-X)** — allows the transaction to **both read and write** the item. Only **one** transaction can hold it, and no other lock can be held on the item at the same time.

(A **binary lock** has only two states, locked and unlocked; it is too restrictive for practical use.)

#### Lock Compatibility Matrix

| Requested \ Held | Shared (S) | Exclusive (X) |
| --- | --- | --- |
| **Shared (S)** | Compatible (granted) | Not compatible (wait) |
| **Exclusive (X)** | Not compatible (wait) | Not compatible (wait) |

A request is granted only if it is compatible with all locks already held on the item by other transactions; otherwise the transaction **waits** until those locks are released.

### Locking Protocols

A locking protocol is a **set of rules** stating when a transaction may lock and unlock data items.

1. **Simplistic lock protocol** — a transaction locks an item before writing it and may unlock it right after the write. It does not guarantee serializability.
2. **Pre-claiming lock protocol** — before it starts, a transaction **requests all the locks it needs**; if all are granted it executes and releases them at the end, otherwise it waits (or rolls back).
3. **Two-phase locking protocol (2PL)** — described below.

### Two-Phase Locking (2PL) Protocol

In two-phase locking, every transaction issues its lock and unlock requests in **two phases**:

1. **Growing (expanding) phase** — the transaction **may obtain locks but may not release any lock**.
2. **Shrinking phase** — the transaction **may release locks but may not obtain any new lock**.

The point at which the transaction obtains its **last lock** (the end of the growing phase) is called its **lock point**. A lock can be **upgraded** from S to X only in the growing phase, and **downgraded** from X to S only in the shrinking phase.

![Two-phase locking: locks are acquired in the growing phase up to the lock point and released in the shrinking phase](/diagrams/dbms/two-phase-locking.svg)

**Example:**

| Step | T1 | T2 |
| --- | --- | --- |
| 1 | lock-S(A) | |
| 2 | | lock-S(A) |
| 3 | lock-X(B) | |
| 4 | read(A), write(B) | |
| 5 | unlock(A) | |
| 6 | | lock-X(C) |
| 7 | unlock(B) | |
| 8 | | unlock(A) |
| 9 | | unlock(C) |

T1's lock point is step 3 and T2's is step 6; neither acquires a lock after releasing one, so both follow 2PL.

**Properties of basic 2PL:**

1. It **guarantees conflict serializability**: transactions are serialized in the order of their lock points.
2. It does **not prevent deadlocks** — for example, T1 holds lock-X(A) and requests lock-X(B) while T2 holds lock-X(B) and requests lock-X(A).
3. It does **not prevent cascading rollbacks** — if T1 writes A, unlocks it, and T2 reads A before T1 commits, then T2 must roll back if T1 fails.

### Types of Two-Phase Locking

1. **Strict 2PL** — basic 2PL, and all **exclusive (X) locks are held until the transaction commits or aborts**. No other transaction can read uncommitted data, so it produces **strict, cascadeless** schedules. It is the most widely used form.
2. **Rigorous 2PL** — basic 2PL, and **all locks (S and X) are held until commit or abort**. Transactions are serialized in the order they commit. Every rigorous schedule is strict.
3. **Conservative (static) 2PL** — the transaction **acquires all the locks it needs before it starts** (by pre-declaring its read and write sets); if any lock is unavailable it acquires none and waits. It is **deadlock-free**, but it is hard to know all needed items in advance and it reduces concurrency.

| Type | When locks are released | Serializable | Cascadeless | Deadlock-free |
| --- | --- | --- | --- | --- |
| Basic 2PL | Any time in the shrinking phase | Yes | No | No |
| Strict 2PL | X locks at commit/abort | Yes | Yes | No |
| Rigorous 2PL | All locks at commit/abort | Yes | Yes | No |
| Conservative 2PL | Locks obtained all at start | Yes | Depends | Yes |

### Multiple-Granularity Locking

Data items can be locked at different **levels of granularity** — the whole **database**, an **area**, a **file (table)** or a **record** — arranged as a tree. Locking a node **implicitly locks all its descendants**. **Fine granularity** (records) gives more concurrency but more lock overhead; **coarse granularity** (tables) gives less overhead but less concurrency. To know quickly whether a lower node is locked, **intention locks** are placed on the ancestors:

1. **IS (intention-shared)** — some descendant will be locked in shared mode.
2. **IX (intention-exclusive)** — some descendant will be locked in exclusive (or shared) mode.
3. **SIX (shared and intention-exclusive)** — the node is locked in shared mode and some descendant will be locked in exclusive mode.

Locks are acquired from the **root downward** (a node can be locked in S or IS only if its parent is locked in IS or IX, and in X, IX or SIX only if its parent is locked in IX or SIX), and released from the **bottom upward**.

## Timestamp-Based Protocols {#timestamp-based-protocols}

### Timestamp

A timestamp is a **unique number assigned to each transaction when it starts**; the timestamp of transaction Ti is written TS(Ti).

It is taken from the system clock or a logical counter. If Ti starts before Tj, then **TS(Ti) < TS(Tj)** — the older transaction has the smaller timestamp. For each data item Q, the system keeps:

1. **W-timestamp(Q)** — the largest timestamp of any transaction that has successfully **written** Q.
2. **R-timestamp(Q)** — the largest timestamp of any transaction that has successfully **read** Q.

### Timestamp-Ordering Protocol

The timestamp-ordering protocol ensures that **conflicting read and write operations are executed in timestamp order**, so the schedule is equivalent to the serial schedule in the order of the timestamps:

1. **Ti issues read(Q):**
   - If **TS(Ti) < W-timestamp(Q)**, Ti would read a value that a younger transaction has already overwritten — the read is **rejected** and Ti is **rolled back**.
   - Otherwise the read is executed and **R-timestamp(Q) = max(R-timestamp(Q), TS(Ti))**.
2. **Ti issues write(Q):**
   - If **TS(Ti) < R-timestamp(Q)**, a younger transaction has already read the old value — the write is **rejected** and Ti is **rolled back**.
   - If **TS(Ti) < W-timestamp(Q)**, Ti would write an obsolete value — the write is **rejected** and Ti is **rolled back**.
   - Otherwise the write is executed and **W-timestamp(Q) = TS(Ti)**.

A rolled-back transaction is restarted with a **new** timestamp.

**Example:** TS(T1) = 5 and TS(T2) = 10. T2 reads A, so R-timestamp(A) = 10. Then T1 issues write(A): since TS(T1) = 5 < R-timestamp(A) = 10, the write is rejected and T1 is rolled back.

**Advantages:**

1. It **guarantees conflict serializability**.
2. It is **deadlock-free**, because no transaction ever waits.

**Disadvantages:**

1. **Starvation** — a long transaction may be rolled back and restarted repeatedly.
2. It can produce **cascading rollbacks** and non-recoverable schedules (unless extended, for example by delaying reads until the writer commits).
3. Overhead of maintaining timestamps for every item.

### Thomas Write Rule

The Thomas write rule (R. H. Thomas, 1979) modifies the write rule of timestamp ordering to allow more concurrency:

1. If **TS(Ti) < R-timestamp(Q)** — reject the write and **roll back** Ti (as before).
2. If **TS(Ti) < W-timestamp(Q)** — the value Ti wants to write is already **obsolete** (a younger transaction has written Q), so the write is simply **ignored**, and Ti continues (instead of being rolled back).
3. Otherwise — execute the write and set **W-timestamp(Q) = TS(Ti)**.

Ignoring obsolete writes allows some schedules that are **view serializable but not conflict serializable** (schedules with blind writes).

**Example:** TS(T1) = 10, TS(T2) = 20. T2 writes Q (W-timestamp(Q) = 20); then the older T1 issues write(Q). Since 10 < 20, basic timestamp ordering would roll back T1, but under the Thomas write rule T1's write is just **ignored**, because T2's later value would overwrite it anyway.

### Validation-Based (Optimistic) Protocol

In validation-based (optimistic) concurrency control, a transaction executes **without any locking**, assuming conflicts are rare, and is checked only at the end. Each transaction passes through three phases:

1. **Read phase** — the transaction reads data and performs its computations on **local copies**; no change is made to the database.
2. **Validation phase** — the system checks whether applying the transaction's updates would **violate serializability** with respect to other concurrent transactions.
3. **Write phase** — if validation succeeds, the local updates are **written to the database**; otherwise the transaction is **rolled back and restarted**.

The timestamps Start(Ti), Validation(Ti) and Finish(Ti) are recorded, and TS(Ti) = Validation(Ti). It works well when conflicts are rare (mostly read-only transactions) and causes no cascading rollbacks; when conflicts are frequent, many transactions are restarted.

### Lock-Based vs Timestamp-Based Protocols

| Basis | Lock-based (2PL) | Timestamp ordering |
| --- | --- | --- |
| Mechanism | Locks on data items | Timestamps of transactions and items |
| Conflict handling | Transaction waits | Transaction is rolled back |
| Deadlock | Possible | Not possible |
| Serialization order | Order of lock points | Order of timestamps |
| Starvation | Possible | Possible (repeated restarts) |

## Deadlock Handling {#deadlock-handling}

### Definition of Deadlock

A deadlock is a situation in which **two or more transactions wait indefinitely for one another**, each holding a lock that another needs.

In a set {T0, T1, …, Tn}, T0 waits for an item held by T1, T1 waits for T2, …, and Tn waits for T0, so none can proceed.

**Example:** T1 holds an exclusive lock on the STUDENT table and requests a lock on GRADE; T2 holds an exclusive lock on GRADE and requests a lock on STUDENT. Both wait forever.

### Necessary Conditions for Deadlock (Coffman Conditions)

A deadlock can occur only if all four conditions hold at the same time:

1. **Mutual exclusion** — at least one item is held in a non-shareable (exclusive) mode.
2. **Hold and wait** — a transaction holds some locks while waiting for others.
3. **No preemption** — a lock cannot be taken away from a transaction; it is released only voluntarily.
4. **Circular wait** — there is a circular chain of transactions, each waiting for an item held by the next.

Breaking any one of these conditions prevents deadlock.

### Methods of Deadlock Handling

There are three methods of handling deadlocks:

1. **Deadlock prevention** — design the protocol so that a deadlock can never occur.
2. **Deadlock detection and recovery** — allow deadlocks to occur, detect them and break them.
3. **Timeout** — a transaction that waits longer than a fixed time is rolled back and restarted (simple, but the time is hard to choose).

### Deadlock Prevention

1. **Lock everything in advance** (conservative 2PL) — a transaction locks all its items before it starts.
2. **Ordering of data items** — all transactions request locks in the same fixed order, so a circular wait cannot form.
3. **Timestamp-based prevention** — when Ti requests an item held by Tj, their timestamps decide whether Ti waits or a transaction is rolled back:

#### Wait-Die Scheme (Non-Preemptive)

1. If Ti is **older** than Tj (TS(Ti) < TS(Tj)), Ti is allowed to **wait**.
2. If Ti is **younger** than Tj, Ti **dies** — it is rolled back and restarted later **with the same timestamp**.

An older transaction waits for a younger one; a younger one never waits for an older one.

#### Wound-Wait Scheme (Preemptive)

1. If Ti is **older** than Tj, Ti **wounds** Tj — Tj is rolled back (preempted) and restarted later with the same timestamp, and Ti gets the item.
2. If Ti is **younger** than Tj, Ti **waits**.

A younger transaction waits for an older one; an older one never waits.

**Example:** TS(T1) = 10 (older), TS(T2) = 20 (younger).

1. T1 requests an item held by T2: under **wait-die**, T1 **waits**; under **wound-wait**, T2 is **rolled back**.
2. T2 requests an item held by T1: under **wait-die**, T2 **dies** (is rolled back); under **wound-wait**, T2 **waits**.

| Basis | Wait-die | Wound-wait |
| --- | --- | --- |
| Older requests item held by younger | Older waits | Younger is rolled back (wounded) |
| Younger requests item held by older | Younger is rolled back (dies) | Younger waits |
| Type | Non-preemptive | Preemptive |
| Rollbacks | More (a younger one may die many times) | Fewer |
| Victim | Always the younger transaction | Always the younger transaction |

Because a restarted transaction keeps its **original timestamp**, it eventually becomes the oldest and is never rolled back again, so there is **no starvation**.

### Deadlock Detection

Deadlocks are detected with a **wait-for graph**:

1. Draw a **node for each active transaction**.
2. Draw an **edge Ti → Tj** when Ti is **waiting for an item held by Tj**; the edge is removed when Tj releases the item.
3. A **deadlock exists if and only if the graph contains a cycle**.

The system maintains the graph and runs a cycle-detection algorithm periodically (or whenever a request has to wait). Detection is suitable when deadlocks are rare.

![Wait-for graph: T1 waits for T2, T2 waits for T3, T3 waits for T1 — a cycle, so the transactions are deadlocked](/diagrams/dbms/wait-for-graph.svg)

### Recovery from Deadlock

When a deadlock is detected:

1. **Select a victim** — choose a transaction in the cycle to roll back, the one whose rollback **costs the least**: considering how long it has run, how many items it has used, how many more it needs, and how many transactions would be rolled back with it.
2. **Rollback** — roll the victim back either **totally** (abort and restart it) or **partially** (only as far as needed to break the deadlock).
3. **Avoid starvation** — make sure the same transaction is not always chosen as the victim, for example by counting how many times it has been rolled back.

### Starvation

Starvation is a situation in which a transaction **waits indefinitely or is repeatedly rolled back** while other transactions proceed.

For example, a transaction may keep waiting for an exclusive lock while other transactions keep getting shared locks on the item, or may always be chosen as the deadlock victim. It is avoided by granting locks in **first-come, first-served** order and by using **priorities or ageing** (such as keeping the original timestamp in wait-die and wound-wait).

## References {#references}

**TutorialsPoint**

- [Concurrency Control](https://www.tutorialspoint.com/dbms/dbms_concurrency_control.htm) — accessed 2026-11-06 (binary, shared and exclusive locks, simplistic, pre-claiming and two-phase locking, timestamp ordering, Thomas write rule). It says that 2PL "divides the execution into three parts" before describing the two phases.
- [Deadlock](https://www.tutorialspoint.com/dbms/dbms_deadlock.htm) — accessed 2026-11-06 (wait-die, wound-wait, wait-for graph, victim selection)

**GeeksforGeeks**

- [Concurrency Control in DBMS](https://www.geeksforgeeks.org/dbms/concurrency-control-in-dbms/) and [Lock-Based Concurrency Control](https://www.geeksforgeeks.org/dbms/lock-based-concurrency-control-protocol-in-dbms/) — accessed 2026-11-06
- [Two-Phase Locking](https://www.geeksforgeeks.org/dbms/two-phase-locking-protocol/) and [Categories of Two-Phase Locking](https://www.geeksforgeeks.org/dbms/categories-of-two-phase-locking-strict-rigorous-conservative/) — accessed 2026-11-06 (lock point, the 2PL example above, cascading rollback, strict, rigorous and conservative 2PL)
- [Multiple Granularity Locking](https://www.geeksforgeeks.org/dbms/multiple-granularity-locking-in-dbms/) — accessed 2026-11-06
- [Timestamp-Based Concurrency Control](https://www.geeksforgeeks.org/dbms/timestamp-based-concurrency-control/) — accessed 2026-11-06. It says the "younger" transaction is aborted, but its own rules reject the late request of the transaction with the smaller timestamp (the older one).
- [Thomas Write Rule](https://www.geeksforgeeks.org/dbms/thomas-write-rule-in-dbms/) — accessed 2026-11-06. Its worked example (TS(T1) = 30 writing after TS(T2) = 20) says T1's write is ignored; by the rule, a write is ignored only when an older transaction writes after a younger one, as in the example above.
- [Deadlock in DBMS](https://www.geeksforgeeks.org/dbms/deadlock-in-dbms/) — accessed 2026-11-06 (Coffman conditions, wait-die and wound-wait with example)

**TpointTech**

- [Lock-Based Protocol](https://www.tpointtech.com/dbms-lock-based-protocol) — accessed 2026-11-06. It describes "strict 2PL" as holding all locks until commit; that is rigorous 2PL (strict 2PL holds only exclusive locks), as given above.
- [Timestamp Ordering Protocol](https://www.tpointtech.com/dbms-timestamp-ordering-protocol), [Validation-Based Protocol](https://www.tpointtech.com/dbms-validation-based-protocol), [Thomas Write Rule](https://www.tpointtech.com/dbms-thomas-write-rule) and [Multiple Granularity](https://www.tpointtech.com/dbms-multiple-granularity) — accessed 2026-11-06 (read, validation and write phases)
- [Deadlock in DBMS](https://www.tpointtech.com/deadlock-in-dbms) — accessed 2026-11-06. It lists the wait-for graph under deadlock avoidance, while its own text (and the other sites) use it for detection.

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (deadlock, Coffman conditions, deadlock avoidance and detection, wait-die and wound-wait)

**Programiz**

- Programiz has no page on concurrency control (checked 2026-11-06).
