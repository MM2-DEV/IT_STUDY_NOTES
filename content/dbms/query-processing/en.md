---
description: Query processing - parsing and translation, optimization and evaluation, evaluation plans and query trees, measures of query cost, selection algorithms and their costs, external sort-merge, join algorithms (nested-loop, block nested-loop, indexed nested-loop, merge and hash join) with worked cost calculations, and materialization vs pipelining.
updated: 2026-11-06
---

## Concept and Overview of Query Processing {#concept-and-overview-of-query-processing}

### Definition of Query Processing

Query processing is the **set of activities by which a DBMS translates a high-level query into low-level operations and executes them**.

It bridges the gap between the declarative query written by the user and the file-system operations that read the disk.

### Steps in Query Processing

Query processing has three basic steps:

1. **Parsing and translation** — the **parser** checks the **syntax** of the query, **verifies** that the relations and attributes exist (using the catalog), replaces views by their definitions, and builds a **parse tree**; the **translator** converts it into an internal form, usually a **relational algebra expression**.
2. **Optimization** — a query can be evaluated in many ways (different orders of operations and different algorithms). The **query optimizer** uses **statistics** from the catalog to estimate the cost of the alternatives and chooses the **evaluation plan with the lowest estimated cost**.
3. **Evaluation** — the **query-execution engine** executes the chosen plan and returns the result to the user.

![Steps in query processing: parsing and translation, optimization using catalog statistics, and evaluation](/diagrams/dbms/query-processing-steps.svg)

**Example:** for `SELECT name FROM Student WHERE cgpa > 3.5;` the translator can produce either **π name (σ cgpa>3.5 (Student))** or **σ cgpa>3.5 (π name, cgpa (Student))**; both give the same result, and the optimizer decides which is cheaper and how each operation is performed (for example, by a file scan or by an index on cgpa).

### Evaluation Primitive and Evaluation Plan

1. **Evaluation primitive** — a relational-algebra operation **annotated with instructions on how to evaluate it**, for example "use the index on cgpa for this selection".
2. **Query-evaluation plan (query-execution plan)** — a **sequence of evaluation primitives** that together evaluate a query: the relational algebra expression with each operation annotated by the algorithm and the indexes to use.

## Notations {#notations}

Queries inside the DBMS are represented with the following notations:

1. **Relational algebra expression** — the query written with operators such as σ (selection), π (projection), ⋈ (join), × (Cartesian product), ∪, ∩ and −; for example, π name (σ cgpa>3.5 (Student) ⋈ Department).
2. **Query tree (operator tree)** — a tree for a relational algebra expression in which the **leaves are the input relations** and the **internal nodes are relational algebra operations**; it is evaluated from the leaves up to the root, which produces the result. It shows the **order** of operations.
3. **Query graph** — a graph in which **relations are nodes** and **join and selection conditions are edges**; it shows the query without fixing the order of operations.
4. **Annotated plan** — a query tree in which every node is labelled with the **algorithm** to be used (for example, "hash join", "index scan on cgpa") and whether intermediate results are pipelined or materialized.

![Query tree for a selection on Student, a join with Department and a projection on name](/diagrams/dbms/query-tree.svg)

The symbols used in cost formulas are:

| Symbol | Meaning |
| --- | --- |
| nᵣ | Number of tuples in relation r |
| bᵣ | Number of blocks containing the tuples of r |
| fᵣ | Blocking factor of r (tuples per block) |
| V(A, r) | Number of distinct values of attribute A in r |
| hᵢ | Height of index i (number of levels) |
| M | Number of memory buffer blocks available |
| t_T | Time to transfer one block |
| t_S | Time for one disk seek (seek time + rotational delay) |

## Measures of Query Cost {#measures-of-query-cost}

### Factors of Query Cost

The cost of evaluating a query can be measured by several resources:

1. **Number of disk accesses (block transfers and seeks)** — the most important, because disk access is much slower than memory.
2. **CPU time** — usually ignored for simplicity.
3. **Communication cost** — in distributed and parallel databases.
4. **Response time** — the elapsed time to answer the query; hard to estimate because it depends on buffer contents and disk layout, so optimizers usually minimize total resource use instead.

### Cost Formula

> **Cost = b × t_T + S × t_S**

Here:

1. **b** — the number of **blocks transferred**.
2. **t_T** — the time to **transfer one block**.
3. **S** — the number of **seeks**.
4. **t_S** — the time for **one seek** (average seek time plus rotational latency).

Writing a block costs about twice as much as reading it, because it is read back to check the write; the cost of writing the final result is usually not counted. Costs are estimated for the **worst case**, assuming that data must be read from disk and only the minimum memory is available.

**Example:** with t_T = 0.1 ms and t_S = 4 ms (typical values for a 4 KB block at about 40 MB/s), an operation that transfers 500 blocks with 2 seeks costs 500 × 0.1 + 2 × 4 = 50 + 8 = **58 ms**.

## Selection Operation and Its Cost Estimation {#selection-operation-and-its-cost-estimation}

The selection σθ(r) is carried out by a **file scan** (searching the file without an index) or by an **index scan** (using an index). The standard algorithms and their costs (in block transfers and seeks; hᵢ = height of a B+ tree index) are:

### Selections Using File Scans

1. **A1 — Linear search:** scan **every block** of the file and test every record. Cost = **t_S + bᵣ × t_T** (one seek, then bᵣ block transfers). For an equality condition on a **key**, the scan can stop when the record is found: average cost = **t_S + (bᵣ ÷ 2) × t_T**. It can be used with any condition, any file order and no index.
2. **Binary search** (numbered A2 in older editions of the textbook): if the file is **sorted on the attribute** and the condition is an equality, binary search on the blocks costs about **⌈log₂ bᵣ⌉ × (t_T + t_S)**. Database files are rarely kept sorted on disk, so index search is used instead.

### Selections Using Indices

3. **A2 — Primary index, equality on a key:** follow the B+ tree to the single record. Cost = **(hᵢ + 1) × (t_T + t_S)** — hᵢ index blocks plus one data block.
4. **A3 — Primary index, equality on a non-key:** the matching records are consecutive (the file is sorted on the attribute). Cost = **hᵢ × (t_T + t_S) + t_S + b × t_T**, where b is the number of blocks containing matching records.
5. **A4 — Secondary index, equality:** on a key, cost = **(hᵢ + 1) × (t_T + t_S)**; on a non-key, each of the n matching records may be in a different block: cost = **(hᵢ + n) × (t_T + t_S)**, which can be **very expensive** when n is large.

### Selections Involving Comparisons (A ≥ v, A ≤ v)

6. **A5 — Primary index, comparison:** for A ≥ v, find the first record with A ≥ v using the index and scan the file sequentially from there; for A ≤ v, scan the file from the beginning until A > v (the index is not needed). Cost = **hᵢ × (t_T + t_S) + t_S + b × t_T**.
7. **A6 — Secondary index, comparison:** scan the leaf level of the index from the first qualifying entry and fetch each record by its pointer; cost = **(hᵢ + n) × (t_T + t_S)** — often worse than a linear scan if many records match.

### Complex Selections

8. **A7 — Conjunctive selection using one index** (θ₁ ∧ θ₂ ∧ …): use the cheapest index for one condition, then test the other conditions on the fetched records.
9. **A8 — Conjunctive selection using a composite index** on several attributes, if one exists.
10. **A9 — Conjunctive selection by intersection of identifiers:** use several indexes to get sets of record pointers, intersect them, and fetch only the records in the intersection.
11. **A10 — Disjunctive selection by union of identifiers** (θ₁ ∨ θ₂ ∨ …): if every condition has an index, take the union of the pointer sets; otherwise a linear scan is needed.
12. **Negation (¬θ):** usually requires a linear scan; an index can help only if few records satisfy ¬θ.

### Worked Example

A relation Student has bᵣ = 100 blocks.

1. Linear search on a non-key condition: 1 seek + 100 transfers.
2. Linear search for a key value: on average 1 seek + 50 transfers.
3. Binary search on a file sorted on the key: about ⌈log₂ 100⌉ = 7 block accesses.
4. With a primary B+ tree index of height hᵢ = 3, equality on the key: (3 + 1) = **4** block transfers and 4 seeks.

## Sorting {#sorting}

### Need for Sorting

Sorting is needed for queries with **ORDER BY**, and it is used inside other operations such as **merge join**, duplicate elimination (**DISTINCT**), **GROUP BY** and set operations. When a relation fits in memory, an in-memory sort such as quicksort is used; when it is **larger than memory**, **external sorting** is used.

### External Sort-Merge Algorithm

**External sort-merge** is the sorting algorithm used for a relation that does not fit into the M available memory blocks.

It works in two stages:

1. **Create sorted runs:** read **M blocks** of the relation at a time into memory, **sort them in memory** and write them back as a sorted file called a **run**. This produces **⌈bᵣ ÷ M⌉ runs**.
2. **Merge the runs:** use **M − 1 blocks as input buffers** (one for each run) and **1 block as an output buffer**; repeatedly output the smallest first record among the buffers, reading the next block of a run when its buffer becomes empty. If there are more than M − 1 runs, several **merge passes** are needed; each pass merges groups of M − 1 runs and reduces the number of runs by a factor of M − 1.

### Cost of External Sort-Merge

> **Number of merge passes = ⌈log M−1 (bᵣ ÷ M)⌉**

> **Block transfers = bᵣ × (2 × ⌈log M−1 (bᵣ ÷ M)⌉ + 1)**

Run creation reads and writes every block once (2bᵣ); each merge pass also reads and writes every block (2bᵣ), except that the final result is not written (it is counted as bᵣ for reading in the last pass).

**Worked example:** sort a relation of bᵣ = 1,000 blocks with M = 11 memory blocks.

1. Number of runs = ⌈1000 ÷ 11⌉ = **91**.
2. Each merge pass merges M − 1 = 10 runs: 91 → 10 → 1, so the number of passes = ⌈log₁₀ 91⌉ = **2**.
3. Block transfers = 1000 × (2 × 2 + 1) = **5,000**.

## Join Operation and Its Cost Estimation {#join-operation-and-its-cost-estimation}

### Join Algorithms

The join r ⋈θ s can be computed by five main algorithms. The examples use **Student** (r): nᵣ = 5,000 tuples, bᵣ = 100 blocks, and **Takes** (s): nₛ = 10,000 tuples, bₛ = 400 blocks.

#### 1. Nested-Loop Join

For **each tuple** of the **outer** relation r, scan the **whole inner** relation s and test every pair:

```text
for each tuple tr in r:
    for each tuple ts in s:
        if (tr, ts) satisfies θ: add tr · ts to the result
```

It works for **any join condition** and needs no index.

> **Worst case: block transfers = nᵣ × bₛ + bᵣ, seeks = nᵣ + bᵣ**

> **Best case (the smaller relation fits in memory): block transfers = bᵣ + bₛ, seeks = 2**

**Example:** with Student as the outer relation: 5,000 × 400 + 100 = **2,000,100** block transfers and 5,000 + 100 = **5,100** seeks. With Takes as the outer relation: 10,000 × 100 + 400 = **1,000,400** transfers and 10,400 seeks. With t_T = 0.1 ms and t_S = 4 ms, the first plan takes about 2,000,100 × 0.1 + 5,100 × 4 ≈ **220 seconds**.

#### 2. Block Nested-Loop Join

A variant that processes the relations **block by block** instead of tuple by tuple: every **block** of the inner relation is paired with every **block** of the outer relation.

> **Worst case: block transfers = bᵣ × bₛ + bᵣ, seeks = 2 × bᵣ**

> **Best case: block transfers = bᵣ + bₛ, seeks = 2**

**Example:** 100 × 400 + 100 = **40,100** block transfers and 2 × 100 = **200** seeks (about 40,100 × 0.1 + 200 × 4 = **4.8 seconds**) — far better than the simple nested loop. The smaller relation should be the outer one; if M blocks are available, using M − 2 blocks for the outer relation reduces the cost to ⌈bᵣ ÷ (M − 2)⌉ × bₛ + bᵣ.

#### 3. Indexed Nested-Loop Join

If there is an **index on the join attribute of the inner relation**, the scan of the inner relation is replaced by an **index lookup** for each outer tuple:

> **Cost = bᵣ × (t_T + t_S) + nᵣ × c**

where c is the cost of one index lookup plus fetching the matching tuples. **Example:** with a B+ tree index on Takes where c ≈ 5 block accesses, the cost is about 100 + 5,000 × 5 = **25,100** block accesses (each with a seek). It is useful when the outer relation is small or an index already exists.

#### 4. Merge Join (Sort-Merge Join)

Used for **equi-joins and natural joins**. Both relations are **sorted on the join attribute** (external sort if needed); then they are scanned **together**, like the merge step of merge sort, and tuples with equal join values are joined.

> **Block transfers = bᵣ + bₛ** (plus the cost of sorting if the relations are not already sorted)

**Example:** if both relations are already sorted, the cost is 100 + 400 = **500** block transfers.

#### 5. Hash Join

Used for **equi-joins and natural joins**. A hash function h on the join attribute is used to **partition both relations** into buckets; tuples that can join fall into the **same partition**. Then, for each partition, the partition of the smaller (**build**) relation is loaded into memory with an in-memory hash index, and the matching partition of the other (**probe**) relation is read and joined.

> **Block transfers ≈ 3 × (bᵣ + bₛ)** (each relation is read and written once for partitioning and read once for joining; without recursive partitioning)

**Example:** 3 × (100 + 400) = **1,500** block transfers.

### Comparison of Join Algorithms

| Algorithm | Join conditions | Requirement | Block transfers (example) |
| --- | --- | --- | --- |
| Nested-loop | Any | None | 2,000,100 |
| Block nested-loop | Any | None | 40,100 |
| Indexed nested-loop | Equi-join (or with index) | Index on the inner relation | ≈ 25,100 |
| Merge join | Equi-join / natural join | Relations sorted on the join attribute | 500 (+ sorting) |
| Hash join | Equi-join / natural join | Enough memory for partitions | 1,500 |

## Evaluation of Expressions {#evaluation-of-expressions}

A query usually contains several operations. The results of one operation are passed to the next in one of two ways:

### Materialization

**Materialized evaluation (materialization)** is the method of evaluating a query expression in which **each operation is evaluated separately**, starting from the lowest level of the query tree, and **its result is stored (materialized) in a temporary relation** on disk, which is then **read as input by the next operation**.

1. It is always applicable and easy to implement.
2. **Cost** = the cost of all the operations **plus** the cost of **writing and reading the temporary relations**: writing a result of nᵣ tuples with blocking factor fᵣ takes ⌈nᵣ ÷ fᵣ⌉ block writes.
3. **Double buffering** (two output buffers, one filled while the other is written) lets the CPU and disk work in parallel and reduces the time.

### Pipelining

**Pipelined evaluation (pipelining)** is the method of evaluating a query expression in which **several operations are evaluated at the same time**, and **the result tuples of one operation are passed directly to the next operation** as they are produced, **without storing temporary relations** on disk.

For example, in π name (σ cgpa>3.5 (Student)), each tuple selected by σ is passed immediately to π.

1. **Advantages:** removes the cost of writing and reading temporary relations; the first results reach the user quickly.
2. **Limitation:** not possible for **blocking operations** — those that need **all their input before producing output**, such as sorting, aggregation and the build phase of hash join.

#### Types of Pipelining

1. **Demand-driven (lazy) pipelining** — the top operation **requests** the next tuple from its child whenever it needs one; each operation is implemented as an **iterator** with **open()**, **next()** and **close()** functions. It is the most common method.
2. **Producer-driven (eager) pipelining** — each operation **produces tuples eagerly** and puts them into an **output buffer** for its parent, until the buffer is full; operations can run in parallel. It is used in parallel systems.

### Materialization vs Pipelining

| Basis | Materialization | Pipelining |
| --- | --- | --- |
| Intermediate results | Stored in temporary relations on disk | Passed directly to the next operation |
| Extra cost | Writing and reading temporary relations | None for temporary relations |
| Operations at a time | One | Several at once |
| Memory needed | Less | More buffers (too few cause thrashing) |
| Applicability | Always | Not for blocking operations (sort, aggregation) |
| First result | After all operations finish | Produced early |

## References {#references}

**TutorialsPoint**

- [Query Processing](https://www.tutorialspoint.com/dbms/dbms_query_processing.htm) — accessed 2026-11-06 (definition, stages, query tree, external sorting example). Its external-sorting cost formula "2b + 2b log₄(205)" differs from the standard formula bᵣ(2⌈log M−1(bᵣ/M)⌉ + 1) used above.
- [Heuristics in Query Processing](https://www.tutorialspoint.com/dbms/dbms_heuristics_in_query_processing.htm) — accessed 2026-11-06 (query tree and query graph)

**GeeksforGeeks**

- [Query Optimization in Relational Algebra](https://www.geeksforgeeks.org/dbms/query-optimization-in-relational-algebra/) — accessed 2026-11-06. GeeksforGeeks' `query-processing-in-dbms` page returns 404.
- [Join Algorithms in Database](https://www.geeksforgeeks.org/dbms/join-algorithms-in-database/) — accessed 2026-11-06 (nested-loop, block nested-loop and indexed nested-loop join). Its naive nested-loop cost "M + m × N" mixes tuple and page counts; the standard formula nᵣ × bₛ + bᵣ is used above.
- [External Sorting](https://www.geeksforgeeks.org/dbms/external-sorting/) — accessed 2026-11-06 (k-way merge; gives no block-transfer formula)

**TpointTech**

- [Query Processing in DBMS](https://www.tpointtech.com/query-processing-in-dbms) — accessed 2026-11-06 (steps, evaluation plan). Its translations of `select emp_name … where salary > 10000` project only salary, dropping emp_name; the correct expression is π emp_name (σ salary>10000 (Employee)).
- [Estimating Query Cost](https://www.tpointtech.com/estimating-query-cost) — accessed 2026-11-06 (b × t_T + S × t_S, t_T = 0.1 ms, t_S = 4 ms)
- [Selection Operation in Query Processing](https://www.tpointtech.com/selection-operation-in-query-processing) — accessed 2026-11-06 (file scan, linear search and index-based costs)
- [External Sort-Merge](https://www.tpointtech.com/external-sort-merge-algorithm), [Nested-Loop Join](https://www.tpointtech.com/nested-loop-join-algorithm), [Merge Join](https://www.tpointtech.com/merge-join-algorithm) and [Hash Join](https://www.tpointtech.com/hash-join-algorithm) — accessed 2026-11-06
- [Evaluation of Expressions](https://www.tpointtech.com/evaluation-of-expressions), [Materialization](https://www.tpointtech.com/materialization-in-query-processing), [Pipelining](https://www.tpointtech.com/pipelining-in-query-processing) and [Implementation of Pipelining](https://www.tpointtech.com/implementation-of-pipelining) — accessed 2026-11-06 (demand-driven and producer-driven pipelining, iterators)

**Programiz**

- Programiz has no page on query processing (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Query Processing" — algorithms A1–A10 with their cost formulas, external sort-merge cost, and the join cost formulas; the Student/Takes sizes (5,000 and 10,000 tuples; 100 and 400 blocks) follow the textbook's example. All calculations above were checked with a script.
