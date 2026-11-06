---
description: Distributed databases - homogeneous and heterogeneous distributed databases, distributed data storage (replication, horizontal, vertical and mixed fragmentation, transparency), distributed transactions and failures, and commit protocols (two-phase and three-phase commit).
updated: 2026-11-06
---

## Heterogeneous and Homogeneous Databases {#heterogeneous-and-homogeneous-databases}

### Distributed Database

A distributed database is a **collection of logically related databases distributed over several sites** connected by a computer network.

It is managed by a **distributed DBMS (DDBMS)**, which makes the distribution **transparent** to users, so that the data appears as a single database. (Its advantages and disadvantages are given in [Database System Architectures](/topics/dbms/database-system-architectures#distributed-systems).)

### Homogeneous Distributed Database

In a homogeneous distributed database, **all sites use the same DBMS software and operating system**, have the **same schema**, are **aware of one another** and **cooperate** in processing user requests. Example: all branches of a bank run Oracle with the same schema.

Homogeneous databases are of two types:

1. **Autonomous** — each database is independent and functions on its own; they are integrated by a controlling application and use message passing to share updates.
2. **Non-autonomous** — data is distributed across the sites, and a **central (master) DBMS** coordinates updates across them.

### Heterogeneous Distributed Database

In a heterogeneous distributed database, **different sites may use different DBMS software, schemas, data models and operating systems**; sites may not be aware of one another and may provide only limited cooperation. **Middleware** (gateways) translates queries and data between the systems. Example: one site uses MySQL, another PostgreSQL and another MongoDB.

Heterogeneous databases are of two types:

1. **Federated** — the systems are independent but are integrated so that they function as a single database system (a **multidatabase system**).
2. **Un-federated** — the systems use a central coordinating module through which the databases are accessed.

### Homogeneous vs Heterogeneous

| Basis | Homogeneous | Heterogeneous |
| --- | --- | --- |
| DBMS software | Same at all sites | Different at different sites |
| Schema and data model | Same | May differ |
| Awareness of other sites | Sites know each other and cooperate | Sites may not know each other |
| Query and transaction processing | Simpler | Complex (needs translation and middleware) |
| Example | All branches on Oracle | MySQL + PostgreSQL + MongoDB |

## Distributed Data Storage {#distributed-data-storage}

A relation r can be stored in a distributed database in two ways, which can be combined:

1. **Replication** — the system keeps **several identical copies (replicas)** of the relation at different sites.
2. **Fragmentation** — the relation is **divided into several fragments**, stored at different sites.

### Data Replication

Data replication is **storing separate copies of a relation (or fragment) at two or more sites**.

1. **Full replication** — a copy of the **whole database** is stored at **every site**.
2. **Partial replication** — copies of **some fragments** are stored at some sites (chosen by how often they are used there).
3. **No replication** — each fragment is stored at **exactly one site**.

**Advantages of replication:**

1. **Availability and reliability** — if a site fails, the relation can be found at another site.
2. **Increased parallelism and faster reads** — queries can read the nearest copy, and several sites can process queries on the relation in parallel.
3. **Reduced data transfer** over the network.

**Disadvantages of replication:**

1. **Increased overhead on update** — every replica must be updated to stay consistent, so updates are slower and more complex.
2. **More storage space.**
3. **Complex concurrency control** across copies.

### Data Fragmentation

Data fragmentation is **dividing a relation r into fragments r₁, r₂, …, rₙ** that together contain all the information of r, so that **r can be reconstructed** from them (the reconstruction must be lossless).

#### Types of Fragmentation

1. **Horizontal fragmentation** — divides the relation **by rows**: each tuple is assigned to one or more fragments using a **selection condition**, and each fragment has **all the attributes**:
   rᵢ = σ Pᵢ (r), and r is reconstructed by **union**: r = r₁ ∪ r₂ ∪ … ∪ rₙ.
   Example: STUDENT tuples of the CSE department are stored at the CSE campus site, and those of EEE at the EEE site:
   `CSE_STUDENT = σ dept = 'CSE' (STUDENT)`.
2. **Vertical fragmentation** — divides the relation **by columns**: each fragment contains a subset of the attributes **plus the primary key** (or a tuple-id), so that the fragments can be joined back:
   rᵢ = π Rᵢ (r), and r is reconstructed by **natural join**: r = r₁ ⋈ r₂ ⋈ … ⋈ rₙ.
   Example: STUDENT(Roll, Name, Address, Fees, Marks) is split into STD_INFO(Roll, Name, Address) at the office and STD_FEES(Roll, Fees) at the accounts section.
3. **Mixed (hybrid) fragmentation** — horizontal fragmentation followed by vertical fragmentation, or vice versa; the relation is reconstructed by the corresponding unions and joins.

**Advantages of fragmentation:** data is stored where it is used most (**locality**), reducing communication; queries can run in **parallel** on fragments; sensitive attributes can be kept apart (**security**).

**Disadvantages:** queries needing data from several fragments are slower, and reconstructing the relation is costly.

### Data Transparency

**Data transparency** is the property of a distributed database that **users need not know how and where the data is stored**.

It has three forms:

1. **Fragmentation transparency** — users are not required to know how a relation has been fragmented; they query the whole relation.
2. **Replication transparency** — users see each data object as **logically unique**; they need not know how many copies exist or where.
3. **Location transparency** — users need not know the **physical location** (site) of the data; the DDBMS finds it using its catalog. Data items have unique global names.

## Distributed Transactions {#distributed-transactions}

### Local and Global Transactions

1. **Local transaction** — accesses and updates data at **only one (local) site**.
2. **Global transaction** — accesses and updates data at **several sites**; it must still satisfy the **ACID** properties, which is harder because the sites can fail independently.

### System Structure

Each site has two subsystems:

1. **Transaction manager** — manages the execution of the transactions (or subtransactions) that access data at **its site**: it keeps a **log** for recovery and takes part in **concurrency control**.
2. **Transaction coordinator** — coordinates the execution of the **transactions started at its site**: it **starts** the transaction, **breaks it into subtransactions** and distributes them to the appropriate sites, and **coordinates its termination** — the transaction must be **committed at all sites or aborted at all sites**.

### Failures in a Distributed System

Besides the failures of a centralized system (transaction failure, system crash, disk failure), a distributed system has:

1. **Failure of a site.**
2. **Loss of messages** — handled by network protocols (acknowledgements and retransmission).
3. **Failure of a communication link.**
4. **Network partition** — the network is split into two or more parts (partitions) that cannot communicate with each other, although each part may work.

Because a site cannot tell whether another site has failed or the link to it has failed, distributed commit is difficult.

## Commit Protocols {#commit-protocols}

### Commit Protocol

A **commit protocol** is a protocol that ensures the **atomicity of a global transaction**: a transaction executed at several sites must either **commit at all sites or abort at all sites**.

The most widely used is the **two-phase commit protocol (2PC)**; the **three-phase commit protocol (3PC)** avoids some of its blocking problems.

### Two-Phase Commit Protocol (2PC)

Let T be a transaction initiated at site Sᵢ, whose transaction coordinator is Cᵢ. When all sites executing T inform Cᵢ that T has completed, Cᵢ starts the 2PC protocol:

#### Phase 1: Prepare (Voting) Phase

1. Cᵢ adds the record **<prepare T>** to its log, forces the log to stable storage, and sends **prepare T** messages to all sites where T executed.
2. On receiving the message, each site's transaction manager decides whether it can commit its part of T:
   - if **yes**, it adds **<ready T>** to its log, forces the log (and T's records) to stable storage, and sends **ready T** to Cᵢ;
   - if **no**, it adds **<no T>** to its log and sends **abort T** to Cᵢ.

#### Phase 2: Commit (Decision) Phase

1. If Cᵢ receives **ready T from all** participating sites, T is **committed**: Cᵢ adds **<commit T>** to its log and forces it to stable storage — this is the **commit point**. Otherwise (any **abort T**, or no reply before a **timeout**), T is **aborted**: Cᵢ adds **<abort T>** to its log.
2. Cᵢ sends the decision (**commit T** or **abort T**) to all participating sites.
3. Each site records the decision in its log (<commit T> or <abort T>), commits or aborts its part of T, and sends an **acknowledgement** to Cᵢ; after receiving all acknowledgements, Cᵢ adds <complete T> to its log.

![Two-phase commit: in phase 1 the coordinator sends prepare and collects ready or abort votes; in phase 2 it sends commit or abort and collects acknowledgements](/diagrams/dbms/two-phase-commit.svg)

#### Handling Failures in 2PC

1. **Failure of a participating site Sₖ** — when it recovers, Sₖ examines its log for T:
   - log contains **<commit T>** → **redo(T)**;
   - log contains **<abort T>** → **undo(T)**;
   - log contains **<ready T>** but no decision → Sₖ must ask Cᵢ (or other sites) for the fate of T;
   - log contains **no control record** for T → Sₖ failed before replying to prepare, so Cᵢ must have aborted T → **undo(T)**.
2. **Failure of the coordinator Cᵢ** — the participating sites decide the fate of T among themselves:
   - if any active site has **<commit T>** in its log, T is committed; if any has **<abort T>**, T is aborted;
   - if some site has **no <ready T>**, Cᵢ cannot have decided to commit, so T can be aborted;
   - if **all active sites have <ready T> but no decision**, they cannot know what Cᵢ decided and must **wait for Cᵢ to recover**.
3. **Blocking problem** — in the last case, the sites must **hold their locks** on T's data while they wait, so other transactions are **blocked**; this is the main disadvantage of 2PC.

### Three-Phase Commit Protocol (3PC)

The three-phase commit protocol extends 2PC to **avoid blocking** when the coordinator fails, under the assumptions that there is **no network partitioning** and that **at most K sites fail**:

1. **Phase 1 (voting)** — the same as phase 1 of 2PC: the coordinator sends prepare, and the sites vote ready or abort.
2. **Phase 2 (pre-commit)** — if all vote ready, the coordinator makes a **pre-commit decision**, records it at at least K other sites (sending **prepare to commit**, "enter prepared state"), and the sites acknowledge.
3. **Phase 3 (commit)** — the coordinator sends **commit**, and the sites commit.

Because the pre-commit decision is known to K sites, if the coordinator fails, the remaining sites can determine the decision and continue **without waiting** for the coordinator. 3PC has **higher overhead** (more messages and log writes) and is rarely used in practice.

### 2PC vs 3PC

| Basis | Two-phase commit | Three-phase commit |
| --- | --- | --- |
| Phases | Prepare, commit | Prepare (voting), pre-commit, commit |
| Blocking on coordinator failure | Can block | Non-blocking (if no partition and ≤ K failures) |
| Messages and overhead | Fewer | More |
| Use in practice | Widely used | Rarely used |

## References {#references}

**TutorialsPoint**

- [Distributed DBMS – Database Environments](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_database_environments.htm) — accessed 2026-11-06 (homogeneous autonomous and non-autonomous, heterogeneous federated and un-federated databases, design alternatives)
- [Distributed DBMS – Design Strategies](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_design_strategies.htm) — accessed 2026-11-06 (replication, horizontal, vertical and hybrid fragmentation with examples). Its horizontal-fragmentation SQL uses a double-quoted string ("Computer Science"); SQL string literals use single quotes.
- [Distribution Transparency](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_distribution_transparency.htm) — accessed 2026-11-06 (location, fragmentation and replication transparency)
- [Failure and Commit](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_failure_commit.htm) and [Commit Protocols](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_commit_protocols.htm) — accessed 2026-11-06 (soft, hard and network failures; one-phase, two-phase and three-phase commit)

**GeeksforGeeks**

- [Distributed Database System](https://www.geeksforgeeks.org/dbms/distributed-database-system/) and [Data Replication in DBMS](https://www.geeksforgeeks.org/dbms/data-replication-in-dbms/) — accessed 2026-11-06 (types, full, partial and no replication, fragmentation). The distributed-database page lists client-server, peer-to-peer and cloud as "types" next to homogeneous and heterogeneous; these are architectures, not types of homogeneity.

**TpointTech**

- [Distributed Database Architecture](https://www.tpointtech.com/distributed-database-architecture-in-dbms) and [Commit Protocol in DBMS](https://www.tpointtech.com/commit-protocol-in-dbms) — accessed 2026-11-06 (2PC log records, failure handling, blocking, 3PC with K sites)

**Programiz**

- Programiz has no page on distributed databases (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Distributed Databases" — transaction manager and coordinator, failure types, the 2PC failure-handling rules and the 3PC assumptions
