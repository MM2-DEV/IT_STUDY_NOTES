---
description: Parallel databases - I/O parallelism with round-robin, hash and range partitioning and skew; interquery and intraquery parallelism; intraoperation parallelism (parallel sort and parallel join) and interoperation parallelism (pipelined and independent).
updated: 2026-11-06
---

## I/O Parallelism {#i-o-parallelism}

### Definition of I/O Parallelism

I/O parallelism is the **reduction of disk-access time by partitioning relations across multiple disks** so that the parts are read and written in parallel.

It is also called **horizontal partitioning** or **data declustering**: the tuples of a relation are divided among n disks (D₀, D₁, …, Dₙ₋₁), each tuple residing on one disk. (The architectures of parallel systems — shared memory, shared disk and shared nothing — and the measures speedup and scaleup are described in [Database System Architectures](/topics/dbms/database-system-architectures#parallel-systems).)

### Partitioning Techniques

There are three partitioning techniques:

1. **Round-robin partitioning** — the relation is scanned in any order and the **i-th tuple is sent to disk Dᵢ mod n**. It spreads the tuples **evenly** over the disks.
2. **Hash partitioning** — one or more attributes are chosen as the **partitioning attributes**; a **hash function** h with range 0 … n − 1 is applied to them, and a tuple with value v goes to disk **D h(v)**.
3. **Range partitioning** — a **partitioning vector** [v₀, v₁, …, vₙ₋₂] divides the values of the partitioning attribute into ranges; a tuple with value v goes to disk D₀ if v < v₀, to Dᵢ₊₁ if vᵢ ≤ v < vᵢ₊₁, and to Dₙ₋₁ if v ≥ vₙ₋₂. Contiguous ranges of values are stored together.

**Example:** the keys 7, 12, 25, 31, 44 and 50 on three disks:

| Technique | Disk 0 | Disk 1 | Disk 2 |
| --- | --- | --- | --- |
| Round-robin (in the order given) | 7, 31 | 12, 44 | 25, 50 |
| Hash (key mod 3) | 12 | 7, 25, 31 | 44, 50 |
| Range (≤ 20, 21–40, > 40) | 7, 12 | 25, 31 | 44, 50 |

![Round-robin, hash and range partitioning of six keys across three disks](/diagrams/dbms/partitioning.svg)

### Comparison of Partitioning Techniques

Three kinds of data access are considered: **scanning the entire relation**, **point queries** (A = v) and **range queries** (v₁ ≤ A ≤ v₂).

| Basis | Round-robin | Hash | Range |
| --- | --- | --- | --- |
| Scanning the whole relation | Best (even load on all disks) | Good (if the hash spreads evenly) | Good |
| Point query on the partitioning attribute | All disks must be searched | Only one disk is searched (best) | Only one disk is searched |
| Range query on the partitioning attribute | All disks must be searched | All disks must be searched | Only the disks covering the range (best) |
| Load balance | Very even | Usually even (depends on hash and data) | Can be uneven (skew) |
| Best for | Sequential scans of the whole relation | Point queries, joins on the attribute | Range queries and clustered access |

### Skew

Skew is the **uneven distribution of tuples** among the partitions, which reduces the benefit of parallelism, because the time of a parallel operation is set by the **largest** partition.

1. **Attribute-value skew** — many tuples have the same value of the partitioning attribute, so they all go to the same partition (a problem for hash and range partitioning).
2. **Partition skew** — a badly chosen partitioning vector (range) or a poor hash function puts too many tuples in some partitions even without repeated values.

Skew is reduced by **balanced range-partitioning vectors** (built from a sorted sample or a **histogram** of the attribute values) and by **virtual processors** (creating many more small partitions than disks and assigning them to the disks in round-robin fashion).

## Interquery and Intraquery Parallelism {#interquery-and-intraquery-parallelism}

### Interquery Parallelism

In interquery parallelism, **different queries or transactions execute in parallel with one another** on different processors.

1. It **increases throughput** — more transactions are processed per second — and supports **transaction scaleup**.
2. It does **not reduce the response time** of an individual query (each query still runs on one processor).
3. It is the easiest form of parallelism to provide, especially on shared-memory systems; on shared-disk and shared-nothing systems, locking, logging and **cache coherency** must be coordinated between processors.

### Intraquery Parallelism

In intraquery parallelism, **a single query is executed in parallel on multiple processors and disks**.

1. It **speeds up long-running queries** (reduces response time), which is important for decision-support queries on large data.
2. It is achieved in two complementary ways:
   - **Intraoperation parallelism** — parallelize the execution of **each individual operation** (sort, select, project, join) of the query.
   - **Interoperation parallelism** — execute the **different operations** of the query expression **in parallel**.

### Interquery vs Intraquery Parallelism

| Basis | Interquery parallelism | Intraquery parallelism |
| --- | --- | --- |
| What runs in parallel | Different queries / transactions | Parts of one query |
| Main benefit | Higher throughput (scaleup) | Shorter response time (speedup) |
| Effect on a single query | No speedup | Faster |
| Typical use | Online transaction processing | Decision support, large queries |

## Intraoperation and Interoperation Parallelism {#intraoperation-and-interoperation-parallelism}

### Intraoperation Parallelism

Because relational operations work on **sets of tuples**, and relations are large, a single operation can be split over many processors, each working on a part of the data. It gives a **high degree of parallelism**. Examples:

#### Parallel Sort

1. **Range-partitioning sort** — **redistribute** the relation by **range partitioning** on the sort attribute (so each processor gets a range of values), then each processor **sorts its partition locally**; the final result is the concatenation of the partitions in range order.
2. **Parallel external sort-merge** — each processor **sorts the data already on its disk** locally; then the sorted runs are **range-partitioned** across the processors and each processor **merges** the incoming sorted streams.

#### Parallel Join

1. **Partitioned join** — for equi-joins and natural joins: **partition both relations** r and s on the join attribute using the **same** range or hash function, so that tuples that can join go to the **same processor**; each processor Pᵢ then joins rᵢ with sᵢ locally (using any join algorithm, such as hash join).
2. **Fragment-and-replicate join** — for **any join condition** (such as r.A < s.B), where partitioning does not work: **partition one relation** (for example, r) and **replicate the other** (s) to every processor, so each processor joins its fragment of r with all of s. (In the general form, both relations are partitioned into m and n fragments and each of the m × n processors joins one pair.)
3. **Partitioned parallel hash join** — the relations are hash-partitioned over the processors, and each processor then performs a hash join locally.

Other operations are parallelized similarly: **selection** is done on each partition (or only on one partition for point queries on the partitioning attribute), and **duplicate elimination, projection and aggregation** are done locally on each partition and then combined.

### Interoperation Parallelism

Interoperation parallelism executes the **different operations of a query expression at the same time**. There are two forms:

1. **Pipelined parallelism** — the output tuples of one operation are **consumed by the next operation as soon as they are produced**, with the two operations running on **different processors**. For r₁ ⋈ r₂ ⋈ r₃ ⋈ r₄, processor P₁ computes temp₁ = r₁ ⋈ r₂ and passes its tuples to P₂, which computes temp₁ ⋈ r₃, and so on. It avoids writing intermediate results to disk, but gives only a limited speedup, because pipelines are short, some operations (such as sort and aggregation) are **blocking**, and the steps take unequal times.
2. **Independent parallelism** — operations that **do not depend on each other** are executed **in parallel**. For r₁ ⋈ r₂ ⋈ r₃ ⋈ r₄, temp₁ = r₁ ⋈ r₂ and temp₂ = r₃ ⋈ r₄ can be computed at the same time on different processors, and then temp₁ ⋈ temp₂ is computed (possibly pipelined). It also gives limited parallelism, but is useful when the degree of parallelism is low.

### Intraoperation vs Interoperation Parallelism

| Basis | Intraoperation parallelism | Interoperation parallelism |
| --- | --- | --- |
| What is parallelized | One operation, over partitions of the data | Different operations of one query |
| Forms | Parallel sort, parallel join, parallel selection | Pipelined and independent parallelism |
| Degree of parallelism | High (grows with the data size) | Limited (by the number of operations) |
| Also called | Horizontal (data) parallelism | Vertical parallelism (pipelined form) |

## References {#references}

**TutorialsPoint**

- TutorialsPoint's DBMS and Distributed DBMS tutorials have no page on parallel databases (checked 2026-11-06).

**GeeksforGeeks**

- [Design of Parallel Databases](https://www.geeksforgeeks.org/dbms/design-of-parallel-databases-dbms/) — accessed 2026-11-06 (parallel DBMS, shared memory, shared disk, shared nothing and hierarchical architectures)
- [Shared Nothing Architecture](https://www.geeksforgeeks.org/system-design/shared-nothing-architecture/) and [Shared Disk Architecture](https://www.geeksforgeeks.org/shared-disk-architecture-system-design/) — accessed 2026-11-06 (data partitioning and sharding)

**TpointTech**

- [Types of Database Parallelism](https://www.tpointtech.com/data-warehouse-types-of-database-parallelism) — accessed 2026-11-06 (horizontal and vertical parallelism, intraquery and interquery parallelism: intraquery speeds up long-running queries; interquery increases throughput but does not make individual transactions faster)

**IT Job QnS**

- IT Job QnS has no page on parallel databases (checked 2026-11-06).

**Programiz**

- Programiz has no page on parallel databases (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Parallel Databases" — I/O parallelism, round-robin, hash and range partitioning and their comparison, skew, parallel sort, partitioned and fragment-and-replicate joins, pipelined and independent parallelism (the reference websites cover these only briefly)
