---
description: Recovery system - failure classification, volatile, non-volatile and stable storage, data access with buffers, recovery and atomicity, shadow paging, log-based recovery with deferred and immediate modification, write-ahead logging, undo and redo with worked examples, checkpoints, and recovery with concurrent transactions.
updated: 2026-11-06
---

## Failure Classification {#failure-classification}

### Recovery System

The recovery system (recovery manager) is the part of the DBMS that **restores the database to a consistent state after a failure**.

It ensures the **atomicity** (all or nothing) and **durability** (committed changes are never lost) of transactions.

### Types of Failures

There are three main types of failure:

1. **Transaction failure** — a single transaction cannot continue:
   - **Logical error** — the transaction cannot complete because of an internal condition such as bad input, data not found, overflow or a violated constraint.
   - **System error** — the DBMS itself must terminate the transaction, for example to break a **deadlock** or because a resource is unavailable. The transaction can be restarted later.
2. **System crash** — a hardware malfunction, power failure, or a bug in the DBMS or operating system halts the system. The **contents of volatile storage (main memory) are lost**, but non-volatile storage is not affected. This is the **fail-stop assumption**: hardware and software errors stop the system without corrupting the disk.
3. **Disk failure** — a disk block loses its contents because of a **head crash**, bad sectors or a failure during data transfer. Recovery needs a **backup copy** (on other disks or tapes) or a remote copy.

## Storage Structure {#storage-structure}

### Types of Storage

1. **Volatile storage** — **loses its contents on a system crash**; very fast. Examples: main memory and cache memory.
2. **Non-volatile storage** — **survives system crashes**, but can be lost through disk failure. Examples: magnetic disks, flash storage (SSD), magnetic tapes, optical disks.
3. **Stable storage** — information is **never lost** (in theory). It is implemented approximately by **keeping several copies on different non-volatile media** with independent failure modes — for example, mirrored disks (RAID) in different places, and remote copies. A block is written to stable storage by writing the first copy, then (only after it has completed successfully) the second copy; after a failure, the copies are compared and any inconsistent copy is replaced by the correct one. The **log** is kept on stable storage.

### Data Access

1. The database is stored on disk in **physical blocks**; the blocks temporarily in main memory are **buffer blocks**, kept in the **disk buffer**.
2. Block movement between disk and memory:
   - **input(B)** — transfers physical block B to main memory.
   - **output(B)** — transfers buffer block B to the disk, replacing the old copy.
3. Each transaction Ti has a private **work area** with local copies of the items it uses. Data moves between the work area and the buffer with:
   - **read(X)** — assigns the value of X (inputting its block if needed) to the local variable xᵢ.
   - **write(X)** — assigns the local value xᵢ to X in the buffer block.
4. **output(B)** need not happen immediately after write(X); the buffer manager outputs blocks later. If the system crashes after write(X) but before output(B), the new value is lost — this is why recovery is needed.

## Recovery and Atomicity {#recovery-and-atomicity}

### Need for Recovery

Consider transaction Ti transferring Tk 50 from account A (1,000) to B (2,000). If the system crashes after output of the block containing A = 950 but before output of the block containing B = 2,050, the database is left with A = 950 and B = 2,000 — Tk 50 has vanished, and **atomicity is violated**. Simply re-executing Ti would give A = 900, and not re-executing it leaves the error. To achieve atomicity, **information describing the modifications must first be written to stable storage**, without modifying the database itself, so that the system can later **undo** incomplete transactions and **redo** committed ones.

There are two approaches:

1. **Log-based recovery** (the standard method).
2. **Shadow paging (shadow copy)**.

### Shadow Paging

Shadow paging keeps **two page tables** during a transaction:

1. **Shadow page table** — points to the pages of the database **before** the transaction; it is **never changed** during the transaction and is stored on disk.
2. **Current page table** — used by the transaction; when a page is modified for the first time, a **new copy** of the page is written to an **unused disk block**, and only the current page table is changed to point to it (copy-on-write).

**Commit:** (1) write all modified pages to disk, (2) write the current page table to disk, (3) **change the fixed pointer on disk** so that the current page table becomes the new shadow page table — this single write is the commit point. **Crash before commit:** the current page table is discarded and the shadow page table still describes the old consistent database, so **no undo or redo** is needed.

**Advantages:** no log and no undo/redo; very fast recovery.

**Disadvantages:**

1. Copying the page table and writing many pages at commit is expensive.
2. Data becomes **fragmented** (related pages are scattered on disk).
3. Old pages must be freed by **garbage collection**.
4. It is hard to extend to **concurrent transactions**; it is mainly used in text editors and simple systems.

## Log-Based Recovery {#log-based-recovery}

### Log

The log is a **sequence of log records**, kept on **stable storage**, that records **all update activities** in the database.

The main log records are:

1. **<Ti start>** — transaction Ti has started.
2. **<Ti, X, V₁, V₂>** — Ti has written data item X; **V₁** is the **old value** (before the write) and **V₂** the **new value**.
3. **<Ti commit>** — Ti has committed.
4. **<Ti abort>** — Ti has aborted.

### Write-Ahead Logging (WAL) Rule

The log record of an update must be **written to stable storage before the change is written to the database on disk** (and all log records of a transaction, including <Ti commit>, must be on stable storage before the transaction is considered committed). This guarantees that the information needed to undo or redo any change is always available.

### Undo and Redo

1. **undo(Ti)** — restores all data items updated by Ti to their **old values**, going **backward** through the log from Ti's last record. (It also writes <Ti abort> when finished.)
2. **redo(Ti)** — sets all data items updated by Ti to their **new values**, going **forward** through the log from <Ti start>.

Both are **idempotent**: doing them several times gives the same result as doing them once, which is necessary if a crash occurs during recovery.

### Deferred Database Modification

In deferred modification, **all writes of a transaction are recorded in the log but the database is not modified until the transaction partially commits**. If the transaction fails before commit, the database has not been touched, so **no undo is needed** (the log records only need the new value).

Recovery rule: after a crash, **redo(Ti)** if the log contains both **<Ti start> and <Ti commit>**; transactions without a commit are ignored.

### Immediate Database Modification

In immediate modification, **the database may be updated while the transaction is still active** (uncommitted writes can reach the disk), after the log record has been written (WAL). The log records need both the old and new values.

Recovery rules after a crash:

1. **undo(Ti)** if the log contains **<Ti start>** but neither <Ti commit> nor <Ti abort>.
2. **redo(Ti)** if the log contains **<Ti start>** and **<Ti commit>** (or <Ti abort>, since the undo actions written during the abort are redone too).

Undo is performed before redo.

### Worked Example

Initial values: A = 1,000, B = 1,500, C = 2,000. T1 transfers Tk 200 from A to B; T2 withdraws Tk 100 from C. Log (immediate modification):

```text
<T1 start>
<T1, A, 1000, 800>
<T1, B, 1500, 1700>
<T1 commit>
<T2 start>
<T2, C, 2000, 1900>
```

1. **Crash before <T1 commit> is written:** undo T1 → A = 1,000, B = 1,500, C = 2,000.
2. **Crash after <T1 commit> but before <T2 commit>** (the log above): redo T1 and undo T2 → **A = 800, B = 1,700, C = 2,000**.
3. **Crash after <T2 commit>:** redo T1 and T2 → A = 800, B = 1,700, C = 1,900.

Under **deferred** modification, case 2 needs only **redo T1**; T2's write never reached the database, so C = 2,000 without any undo.

### Deferred vs Immediate Modification

| Basis | Deferred modification | Immediate modification |
| --- | --- | --- |
| When the database is updated | After the transaction partially commits | During the transaction (after logging) |
| Undo needed | No | Yes |
| Redo needed | Yes | Yes |
| Log contents | New values only | Old and new values |
| Memory | All updates held until commit | Updates can be written early |

### Checkpoints

Without checkpoints, recovery would have to **search the entire log** and would redo many transactions whose updates are already on disk, which is very slow. A **checkpoint** is performed periodically:

1. Output all **log records** currently in main memory to stable storage.
2. Output all **modified buffer blocks** to the disk.
3. Write a log record **<checkpoint L>** to stable storage, where **L** is the list of transactions **active** at the time of the checkpoint.

During a checkpoint, no transaction may perform updates. After a crash, only transactions that started after the last checkpoint or were active at it (in L) need to be considered: transactions that **committed before the checkpoint** already have their updates on disk and are **ignored**.

![Checkpoint timeline: T1 committed before the checkpoint is ignored; T2 and T3 committed before the failure are redone; T4 and T5, not committed, are undone](/diagrams/dbms/checkpoint-recovery.svg)

## Recovery with Concurrent Transactions {#recovery-with-concurrent-transactions}

### Concurrent Transactions and Recovery

With many concurrent transactions there is **one log**, shared by all, in which their records are **interleaved**. Recovery assumes that concurrency control uses **strict two-phase locking** (an item updated by an uncommitted transaction cannot be updated by another until it commits or aborts), so that undoing one transaction never undoes another transaction's committed work. Logging is done as before, and the checkpoint record **<checkpoint L>** lists the active transactions.

### Recovery Algorithm (Restart Recovery)

1. **Redo phase** — scan the log **forward** from the last **<checkpoint L>** record, **repeating history**: redo every update record <Ti, X, V₁, V₂> by writing V₂ to X. Set **undo-list = L**; add Ti to the undo-list when <Ti start> is found, and remove it when <Ti commit> or <Ti abort> is found.
2. **Undo phase** — scan the log **backward** from the end: for every log record of a transaction in the undo-list, restore the **old value** V₁ (and write a compensation record); when <Ti start> is found for such a transaction, write **<Ti abort>** and remove it from the list. Stop when the undo-list is empty.

After recovery, normal processing resumes.

### Simple Form: Undo-List and Redo-List

Many books state the procedure with two lists, built by reading the log **backward** to the last checkpoint:

1. **Redo-list** — transactions with **<Ti start>** and **<Ti commit>** (or only <Ti commit>, if they were in the checkpoint list): their updates are **redone**.
2. **Undo-list** — transactions with **<Ti start>** (or in the checkpoint list) but **no <Ti commit> or <Ti abort>**: their updates are **undone**.

**Example log** (with T1 and T2 active at the checkpoint):

```text
<T1 start>
<T1, A, 50, 60>
<T2 start>
<T2, B, 70, 80>
<checkpoint {T1, T2}>
<T1 commit>
<T3 start>
<T3, C, 90, 95>
--- crash ---
```

1. Checkpoint list L = {T1, T2}; T1 commits after the checkpoint; T3 starts after it.
2. **Redo-list = {T1}** — redo A = 60.
3. **Undo-list = {T2, T3}** — undo C = 90 and B = 70 (going backward).

Final values: A = 60, B = 70, C = 90.

## References {#references}

**TutorialsPoint**

- [Data Recovery](https://www.tutorialspoint.com/dbms/dbms_data_recovery.htm) — accessed 2026-11-06 (failure classification, storage structure, log-based recovery, checkpoints, recovery with concurrent transactions). It says that shadow paging makes changes "on a volatile memory"; the shadow and current page tables are kept on disk. It also says logs before a checkpoint can be discarded; only records no longer needed by active transactions can be discarded.

**GeeksforGeeks**

- [Database Recovery Techniques](https://www.geeksforgeeks.org/dbms/database-recovery-techniques-in-dbms/) — accessed 2026-11-06 (log-based recovery, shadow paging, checkpoints, backups). GeeksforGeeks' `recovery-techniques-in-dbms` and `types-of-failures-in-dbms` pages return 404.
- [Log-Based Recovery](https://www.geeksforgeeks.org/dbms/log-based-recovery-in-dbms/) — accessed 2026-11-06 (log records, deferred and immediate modification, undo and redo). Its mixed example log (T2 writes Balance 300 → 400 after T1 wrote 600, then T1 aborts) is inconsistent and undoing T1 would erase T2's committed value; it is not used. It also says that transactions with an abort record are redone, which is a simplification.
- [Checkpoints](https://www.geeksforgeeks.org/dbms/checkpoints-in-dbms/) and [Shadow Paging](https://www.geeksforgeeks.org/dbms/shadow-paging-dbms/) — accessed 2026-11-06. The shadow-paging page lists both "increased concurrency" and "limited concurrency".

**TpointTech**

- [Failure Classification](https://www.tpointtech.com/dbms-failure-classification) — accessed 2026-11-06. It labels the second cause of transaction failure "syntax error" but describes a system error (the DBMS aborting a transaction because of deadlock or unavailable resources).
- [Log-Based Recovery](https://www.tpointtech.com/dbms-log-based-recovery) — accessed 2026-11-06 (write-ahead logging; the A, B, C example used above)
- [Recovery with Concurrent Transaction](https://www.tpointtech.com/dbms-recovery-concurrent-transaction) and [Checkpoint](https://www.tpointtech.com/dbms-checkpoint) — accessed 2026-11-06. Its example log has a checkpoint without the list of active transactions, so T2's uncommitted write before the checkpoint would not be found by scanning only from the checkpoint; the checkpoint must record the active list, as in the example above.

**Programiz**

- Programiz has no page on recovery (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Recovery System" — stable storage implementation, data access (input, output, read, write, work area), the <checkpoint L> record and the redo-then-undo recovery algorithm (not covered fully on the reference websites)
