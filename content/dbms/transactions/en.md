---
description: Transactions - definition, read and write operations, ACID properties with examples, transaction states, concurrent execution and its problems (lost update, dirty read, unrepeatable read, incorrect summary, phantom), schedules, conflict and view serializability with precedence graphs, recoverable, cascadeless and strict schedules, and SQL isolation levels.
updated: 2026-11-06
---

## Transaction Concept {#transaction-concept}

### Definition of Transaction

A transaction is a **sequence of database operations executed as a single logical unit of work**, so that either all of them take effect or none do.

A transaction moves the database from one consistent state to another. For example, transferring money from account A to account B is one transaction made of several operations.

### Operations of a Transaction

1. **read(X)** — reads data item X from the database into a variable in main memory (the buffer of the transaction).
2. **write(X)** — writes the value of the variable back to data item X in the database.
3. **commit** — ends the transaction successfully and makes all its changes **permanent**.
4. **rollback (abort)** — ends the transaction unsuccessfully and **undoes** all its changes.

**Example — transfer Tk 500 from account A to account B:**

```text
T1:  read(A)
     A := A - 500
     write(A)
     read(B)
     B := B + 500
     write(B)
     commit
```

### ACID Properties

To keep the database correct despite failures and concurrent access, every transaction must have four properties, called **ACID**:

1. **Atomicity** — **all or nothing**: either all operations of the transaction are reflected in the database, or none are. If the system fails after write(A) but before write(B), Tk 500 would disappear; atomicity ensures that the partial change is **undone (rolled back)**. It is ensured by the **recovery system** (transaction manager), using the log.
2. **Consistency** — a transaction executed alone takes the database from **one consistent state to another**, preserving all integrity constraints. In the transfer, the total A + B is the same before and after (for example, 1000 + 2000 = 3000 before, 500 + 2500 = 3000 after). It is the responsibility of the **application programmer** who writes the transaction (with the integrity constraints checked by the DBMS).
3. **Isolation** — when several transactions run **concurrently**, each must behave **as if it were running alone**; intermediate results of a transaction must not be visible to others. If another transaction reads A and B between write(A) and write(B), it would see a total that is Tk 500 short. Isolation is ensured by the **concurrency-control system**.
4. **Durability** — once a transaction **commits**, its changes are **permanent** and survive any later system failure (such as a power cut). It is ensured by the **recovery system**, using the log and stable storage.

## Transaction State {#transaction-state}

### States of a Transaction

During its life a transaction passes through the following states:

1. **Active** — the initial state; the transaction is executing its read and write operations.
2. **Partially committed** — after the **final operation** has been executed, but the changes may still be only in main memory (not yet safely on disk).
3. **Committed** — after **successful completion**: all changes are permanently recorded.
4. **Failed** — when it is found that **normal execution cannot continue** (an error, a failed check, or a system failure).
5. **Aborted** — after the transaction has been **rolled back** and the database restored to its state before the transaction started. The system can then either **restart** the transaction (as a new transaction, if the failure was not caused by its own logic) or **kill** it.
6. **Terminated** — the transaction has left the system, either after commit or after abort.

![Transaction states: active, partially committed, committed, failed, aborted and terminated, with the restart path from aborted to active](/diagrams/dbms/transaction-states.svg)

**Example:** in the transfer, the transaction is **active** while it reads and writes A and B; it becomes **partially committed** after write(B); **committed** when its changes are safely recorded; if a failure occurs after write(A), it becomes **failed**, and after A is restored to its old value it is **aborted**.

## Concurrent Executions {#concurrent-executions}

### Concurrent Execution of Transactions

Concurrent execution means that **operations of several transactions are interleaved** (executed alternately), instead of running each transaction to completion before starting the next.

### Advantages of Concurrent Execution

1. **Improved throughput and resource utilization** — while one transaction waits for disk I/O, the CPU can work on another, so more transactions finish per unit of time.
2. **Reduced waiting time and response time** — short transactions need not wait behind long ones.

### Problems of Concurrent Execution

If concurrent transactions are not controlled, the following problems can occur (T1 and T2 run concurrently):

1. **Lost update problem** — two transactions read the same item and both update it; one update overwrites the other and is lost.
   Example: A = 100. T1 reads A (100), T2 reads A (100), T1 writes A = 100 − 10 = 90, T2 writes A = 100 + 20 = 120. The final value is 120 instead of the correct 110; T1's update is lost.
2. **Dirty read (temporary update) problem** — a transaction reads a value written by another transaction that **has not committed** and later **fails and rolls back**; the first transaction has used a value that never really existed.
3. **Unrepeatable read problem** — a transaction reads the same item twice and gets **different values**, because another transaction updated it in between.
4. **Incorrect summary problem** — a transaction calculates an aggregate (such as the total of all balances) while another transaction is updating some of the items, so the result mixes old and new values.
5. **Phantom problem** — a transaction re-runs a query with a condition and finds **new rows** (phantoms) that another transaction inserted in between.

These problems are prevented by **concurrency control**, which allows only correct (serializable) schedules.

### Schedule

A schedule is a **sequence of the operations of a set of concurrent transactions in the chronological order in which they are executed**, preserving the order of operations within each transaction.

1. **Serial schedule** — the transactions are executed **one after another**, with no interleaving (for example, all of T1, then all of T2). It is always correct (consistent), but gives no concurrency. For n transactions there are **n!** serial schedules.
2. **Non-serial (concurrent) schedule** — the operations of the transactions are **interleaved**. It may or may not be correct.
3. **Complete schedule** — every transaction in it ends with a commit or an abort.

## Serializability {#serializability}

### Definition of Serializability

A schedule is **serializable** if it is **equivalent to some serial schedule** of the same transactions.

That is, it produces the same effect on the database as if the transactions had been executed one after another. Serializability is the main **correctness criterion** for concurrent execution. There are two kinds of equivalence: **conflict** and **view**.

### Conflicting Operations

Two operations **conflict** if all three conditions hold:

1. they belong to **different transactions**,
2. they access the **same data item**, and
3. **at least one of them is a write**.

So read–write, write–read and write–write pairs on the same item conflict; two reads never conflict. The order of conflicting operations matters; non-conflicting adjacent operations can be **swapped** without changing the result.

### Conflict Serializability

Two schedules are **conflict equivalent** if one can be changed into the other by **swapping adjacent non-conflicting operations** — equivalently, if they order every pair of conflicting operations in the same way. A schedule is **conflict serializable** if it is conflict equivalent to some serial schedule.

### Testing Conflict Serializability: Precedence Graph

1. Draw a **node** for each transaction.
2. Draw an **edge Ti → Tj** if an operation of Ti **conflicts with** and **comes before** an operation of Tj (Ti writes X before Tj reads X; Ti reads X before Tj writes X; or Ti writes X before Tj writes X).
3. If the graph has **no cycle**, the schedule is **conflict serializable**; an equivalent serial order is given by a **topological sort** of the graph. If there is a **cycle**, it is **not** conflict serializable.

**Example 1:** S1 = r1(x) r3(y) w1(x) w2(y) r3(x) w2(x)

1. w1(x) before r3(x) → **T1 → T3**; w1(x) before w2(x) → **T1 → T2**; r3(x) before w2(x) → **T3 → T2**. (On y, r3(y) and w2(y) give T3 → T2 again.)
2. No cycle, so S1 is conflict serializable, equivalent to the serial order **T1 → T3 → T2**.

**Example 2:** S2 = r2(A) w2(A) r1(A) w1(A) r1(B) w1(B) r2(B) w2(B)

1. On A, T2's operations come before T1's → **T2 → T1**; on B, T1's come before T2's → **T1 → T2**.
2. There is a **cycle**, so S2 is **not** conflict serializable.

![Precedence graphs: S1 has edges T1 → T3, T1 → T2, T3 → T2 and no cycle; S2 has a cycle between T1 and T2](/diagrams/dbms/precedence-graph.svg)

### View Serializability

Two schedules S and S′ are **view equivalent** if, for every data item X:

1. **Initial read** — if a transaction reads the initial value of X in S, it also reads the initial value of X in S′.
2. **Updated read (reads-from)** — if Ti reads a value of X written by Tj in S, it reads the value written by Tj in S′ too.
3. **Final write** — the transaction that performs the final write of X in S also performs the final write of X in S′.

A schedule is **view serializable** if it is view equivalent to some serial schedule.

**Example:** S = r1(A) w2(A) w1(A) w3(A)

1. The precedence graph has edges T1 → T2 (r1 before w2) and T2 → T1 (w2 before w1) — a **cycle**, so S is **not conflict serializable**.
2. Compare with the serial schedule T1 → T2 → T3: T1 reads the initial value of A in both; there are no other reads; the final write is by T3 in both. So S is **view serializable**.
3. This is possible because T2 and T3 make **blind writes** — writing an item **without reading it first**.

### Conflict vs View Serializability

| Basis | Conflict serializability | View serializability |
| --- | --- | --- |
| Based on | Order of conflicting operations | Initial reads, reads-from and final writes |
| Test | Precedence graph (polynomial time) | NP-complete in general |
| Relationship | Every conflict-serializable schedule is view serializable | Includes schedules with blind writes that are not conflict serializable |
| Use in practice | Used by concurrency-control protocols | Mainly theoretical |

### Recoverability

Besides serializability, schedules must be safe when a transaction fails:

1. **Recoverable schedule** — if Tj **reads a value written by Ti**, then **Ti commits before Tj commits**. Otherwise, if Ti aborts after Tj has committed, Tj cannot be undone (a **non-recoverable** schedule).
2. **Cascading rollback** — the failure of one transaction forces the rollback of others that read its uncommitted data, which can undo a lot of work.
3. **Cascadeless schedule** — a transaction **reads only values written by committed transactions**; this avoids cascading rollbacks. Every cascadeless schedule is recoverable.
4. **Strict schedule** — a transaction can neither **read nor write** an item written by another transaction until that transaction **commits or aborts**. Strict schedules make recovery simple.

> **Serial ⊂ Strict ⊂ Cascadeless ⊂ Recoverable**

### Isolation Levels in SQL

SQL allows a transaction to choose a weaker level of isolation for more concurrency:

| Isolation level | Dirty read | Unrepeatable read | Phantom |
| --- | --- | --- | --- |
| Read uncommitted | Possible | Possible | Possible |
| Read committed | Prevented | Possible | Possible |
| Repeatable read | Prevented | Prevented | Possible |
| Serializable | Prevented | Prevented | Prevented |

`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;` gives full serializability.

## References {#references}

**TutorialsPoint**

- [DBMS – Transaction](https://www.tutorialspoint.com/dbms/dbms_transaction.htm) — accessed 2026-11-06 (transaction, ACID, serializability, conflict and view equivalence, states)

**GeeksforGeeks**

- [Transaction in DBMS](https://www.geeksforgeeks.org/dbms/transaction-in-dbms/), [ACID Properties](https://www.geeksforgeeks.org/dbms/acid-properties-in-dbms/) and [Transaction States](https://www.geeksforgeeks.org/dbms/transaction-states-in-dbms/) — accessed 2026-11-06. The ACID page's table assigns atomicity to the "transaction manager"; textbooks assign atomicity and durability to the recovery system (which is part of transaction management), as given above.
- [Concurrency Problems](https://www.geeksforgeeks.org/dbms/concurrency-problems-in-dbms-transactions/) — accessed 2026-11-06. It describes the phantom problem as reading an item that "does not exist" (a deleted item), while its ACID page describes new rows appearing; the standard meaning (new rows from another transaction's insert) is used above.
- [Conflict Serializability](https://www.geeksforgeeks.org/dbms/conflict-serializability-in-dbms/), [View Serializability](https://www.geeksforgeeks.org/dbms/view-serializability-in-dbms/) and [Types of Schedules](https://www.geeksforgeeks.org/dbms/types-of-schedules-in-dbms/) — accessed 2026-11-06 (example S1 and the view-serializable example). In the conflict-serializability walk-through for S2, one step swaps R2(B) ahead of W1(B), which conflict; the final verdict (not serializable) is still correct.

**TpointTech**

- [Transaction Processing Concept](https://www.tpointtech.com/dbms-transaction-processing-concept), [States of Transaction](https://www.tpointtech.com/dbms-states-of-transaction), [Schedule](https://www.tpointtech.com/dbms-schedule), [Testing of Serializability](https://www.tpointtech.com/dbms-testing-of-serializability), [Conflict Serializable Schedule](https://www.tpointtech.com/dbms-conflict-serializable-schedule) and [View Serializability](https://www.tpointtech.com/dbms-view-serializability) — accessed 2026-11-06. The testing page says that an edge Ti → Tj means "all instructions of Ti are executed before the first instruction of Tj"; it only means that one conflicting operation of Ti comes before one of Tj.

**Programiz**

- Programiz has no page on transactions (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Transactions" — the components responsible for each ACID property, the advantages of concurrent execution and the SQL isolation levels. The precedence graphs above were checked with a script.
