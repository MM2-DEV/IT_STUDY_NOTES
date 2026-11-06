---
description: Indexing and hashing in DBMS - index structure and evaluation, ordered indices (primary, clustering, secondary), dense and sparse indexes, multilevel indexes with worked calculations, B+ tree and B-tree index files (node order and search cost), hash indexes with static and extendible hashing, and ordered indexing vs hashing.
updated: 2026-11-06
---

## Basic Concepts of Indexing {#basic-concepts-of-indexing}

### Definition of Index

An index is an **additional data structure** on one or more attributes of a table that **speeds up the retrieval of records**.

It works like the index at the back of a book and reduces the number of disk-block accesses. Instead of scanning the whole file, the DBMS searches the small index and follows a pointer to the required record or block.

### Structure of an Index

An index file consists of **index entries (index records)**, each with two fields:

1. **Search key** — the value of the attribute (or set of attributes) on which the index is built, for example Roll_No. The search key need not be the primary key.
2. **Pointer (data reference)** — the address of the disk block (and position) where the record with that key is stored.

Index files are much smaller than data files, because each entry holds only a key and a pointer.

### Types of Indices

There are two basic kinds of indices:

1. **Ordered indices** — the search keys are stored in **sorted order**.
2. **Hash indices** — the search keys are distributed into **buckets** by a **hash function**.

### Index Evaluation Metrics

No single indexing technique is best for every situation. A technique is judged by:

1. **Access types** — the kinds of access supported efficiently: finding records with a **specified value** (equality search) or with values in a **range**.
2. **Access time** — the time to find a particular data item or set of items.
3. **Insertion time** — the time to find the correct place and insert a new entry, including updating the index.
4. **Deletion time** — the time to find and delete an entry, including updating the index.
5. **Space overhead** — the additional space occupied by the index.

### Advantages of Indexing

1. Much **faster searching** and retrieval; fewer disk accesses.
2. Faster sorting, grouping and joins on the indexed column.
3. Unique indexes **enforce uniqueness** of values.

### Disadvantages of Indexing

1. Extra **storage space** for the index files.
2. **Slower insert, update and delete**, because the indexes must also be updated.
3. Too many indexes, or indexes on the wrong columns, can reduce performance.

### Index in SQL

```sql
CREATE INDEX idx_student_name ON Student(name);          -- ordinary index
CREATE UNIQUE INDEX idx_student_email ON Student(email); -- also enforces uniqueness
DROP INDEX idx_student_name;                              -- syntax varies by DBMS
```

## Ordered Indices {#ordered-indices}

### Definition of Ordered Index

An ordered index is an index whose **entries are stored in sorted order of the search key**.

It can therefore be searched by **binary search**, and records can be read in key order. Ordered indices are of three types:

1. **Primary index**
2. **Clustering index**
3. **Secondary index**

### Primary Index

A primary index is an ordered index on a data file that is **physically sorted on its primary key**, with **one entry per data block**.

Each entry contains the key of the **first record of the block** (the **block anchor**) and a pointer to that block, so it is a **sparse** index. A file can have **at most one** primary index.

### Clustering Index

A clustering index is an ordered index on a data file that is **physically ordered on a non-key field**, with **one entry for each distinct value**.

Each entry points to the **first block** containing that value (for example, Dept_ID). It is also sparse. A file can have at most one primary or clustering index, because it can be physically sorted in only one order. (In many books, any index whose order matches the file's physical order is called a **clustered (clustering) index**, and the primary index is a special case of it.)

### Secondary Index

A secondary (non-clustering) index is an index on a field that is **not the ordering field** of the data file.

The data file is **not sorted** on this field. Because the records with a given key can be anywhere in the file, a secondary index must be **dense** (one entry for every record, or for every key value with a pointer to a list of records). A file can have **many** secondary indexes. Searching through a secondary index usually needs more disk accesses than through a primary index.

| Basis | Primary index | Clustering index | Secondary index |
| --- | --- | --- | --- |
| Defined on | Ordering key field (unique) | Ordering non-key field | Non-ordering field (key or non-key) |
| File sorted on that field | Yes | Yes | No |
| Entries | One per block | One per distinct value | One per record (or per value) |
| Dense or sparse | Sparse | Sparse | Dense |
| Number per file | At most one | At most one | Many |

### Index Update

1. **Insertion:** the DBMS finds the place of the new record; for a **dense** index, a new entry is added if the key value is new; for a **sparse** index, an entry is added only if a new block is created (or the record becomes the first in its block).
2. **Deletion:** for a dense index, the entry is removed if no other record has that key; for a sparse index, the entry is replaced by the next key in the block, or removed if the block becomes empty.

## Sparse and Dense Indexing {#sparse-and-dense-indexing}

### Dense Index

A dense index is an index that has **an index entry for every search-key value (every record)** in the data file.

Each entry holds the key and a pointer to the record.

### Sparse Index

A sparse index is an index that has **index entries for only some of the search-key values**, usually **one entry per data block**.

The entry is for the first record of the block. It can be used **only when the data file is sorted** on the search key. To find a record with key K, the DBMS finds the index entry with the **largest key ≤ K**, goes to that block and **searches the block sequentially**.

![Dense index with an entry for every record, and sparse index with an entry for the first record of each block](/diagrams/dbms/dense-sparse-index.svg)

### Dense Index vs Sparse Index

| Basis | Dense index | Sparse index |
| --- | --- | --- |
| Index entries | One for every search-key value | Only for some values (one per block) |
| Size | Larger | Smaller |
| Search speed | Faster (direct pointer to the record) | Slower (block must be searched) |
| Space | More | Less |
| Insertion/deletion overhead | More | Less |
| Data file must be sorted | No | Yes |
| Used for | Secondary indexes | Primary and clustering indexes |

### Worked Example: Primary (Sparse) Index

A file has r = 30,000 records of R = 100 bytes, sorted on the key Name; block size B = 1,024 bytes. Each index entry is a 9-byte key + 6-byte block pointer = 15 bytes.

1. Records per block: bfr = ⌊1024 ÷ 100⌋ = **10**.
2. Data blocks: b = ⌈30,000 ÷ 10⌉ = **3,000**.
3. **Without an index**, binary search on the data file needs ⌈log₂ 3,000⌉ = **12 block accesses**.
4. Index entries per block: ⌊1024 ÷ 15⌋ = **68**.
5. The primary index has one entry per data block: 3,000 entries, which fill ⌈3,000 ÷ 68⌉ = **45 index blocks**.
6. **With the index**, binary search on the index needs ⌈log₂ 45⌉ = 6 accesses, plus **1** access for the data block = **7 block accesses**.

### Multilevel Index

When the index itself becomes too large to search quickly or to keep in memory, an **index on the index** is built. A **multilevel index** treats the first-level (inner) index as a sorted file and builds a **sparse outer (second-level) index** on it; levels are added until the **top level fits in one block**.

![Two-level index: a sparse outer index points to blocks of the inner index, which point to the data blocks](/diagrams/dbms/multilevel-index.svg)

The number of entries per index block is the **fan-out (f₀)**. Each level has about 1/f₀ as many blocks as the level below it.

> **Number of levels t = ⌈log f₀ (r₁)⌉, and search cost = t + 1 block accesses**

Here r₁ is the number of first-level index entries and the extra access reads the data block.

**Worked example:** a first-level index occupies b₁ = 442 blocks, and the fan-out is f₀ = 68.

1. Second level: b₂ = ⌈442 ÷ 68⌉ = **7 blocks**.
2. Third level: b₃ = ⌈7 ÷ 68⌉ = **1 block** — the top level.
3. So t = **3 levels**, and a search needs 3 + 1 = **4 block accesses**.
4. Binary search on the single-level index would need ⌈log₂ 442⌉ + 1 = 9 + 1 = **10 block accesses**.

Static multilevel indexes, such as **ISAM**, become inefficient as the file grows (overflow blocks); this led to the dynamic **B+ tree** and **B-tree** indexes.

## B+-Tree Index Files {#bplus-tree-index-files}

### Definition of B+ Tree Index

A B+ tree index is a **dynamic, balanced multilevel tree index** in which **all keys and record pointers are stored in linked leaf nodes**.

The internal (non-leaf) nodes form a sparse multilevel index that guides the search. It is the **most widely used index structure** in relational DBMSs, because it stays balanced and efficient as records are inserted and deleted, without reorganizing the file. Each node normally occupies **one disk block**.

### Structure of a B+ Tree Node

A node of a B+ tree of **order n** (at most n pointers) has the form:

> **P₁, K₁, P₂, K₂, …, Pₙ₋₁, Kₙ₋₁, Pₙ**

where the Kᵢ are search-key values in increasing order (K₁ < K₂ < … < Kₙ₋₁) and the Pᵢ are pointers.

1. **Leaf node:** each Pᵢ (i < n) points to the record (or bucket of records) with key Kᵢ; the last pointer **Pₙ points to the next leaf** (the leaves form a linked list). A leaf holds between ⌈(n − 1) ÷ 2⌉ and n − 1 keys.
2. **Non-leaf (internal) node:** holds up to n pointers to child nodes; all keys in the subtree of Pᵢ are ≥ Kᵢ₋₁ and < Kᵢ. A non-leaf node other than the root has between **⌈n ÷ 2⌉ and n** children.
3. **Root:** if it is not a leaf, it has at least **2** children.
4. **All leaves are at the same depth** (the tree is balanced).

### Order of a B+ Tree from the Block Size

Because each node fills one block, the order is chosen so that a node fits in a block:

> **Internal node: n × P + (n − 1) × V ≤ B**

> **Leaf node: n_leaf × (V + Pr) + P ≤ B**

Here B = block size, V = size of a search key, P = size of a block (tree) pointer and Pr = size of a record pointer.

**Worked example:** B = 512 bytes, V = 9 bytes, P = 6 bytes, Pr = 7 bytes.

1. Internal node: 6n + 9(n − 1) ≤ 512 → 15n ≤ 521 → n = **34** (34 pointers and 33 keys use 34 × 6 + 33 × 9 = 501 bytes).
2. Leaf node: 16 × n_leaf + 6 ≤ 512 → 16 × n_leaf ≤ 506 → n_leaf = **31** entries (31 × 16 + 6 = 502 bytes).

### Search and Query Cost

To find a key K, start at the root, at each internal node follow the pointer of the range that contains K, and at the leaf look for K; the path from the root to a leaf is the same length for every key. For a **range query**, find the first key and then follow the **leaf links**.

> **Number of levels (block accesses to reach a leaf) ≤ ⌈log ⌈n÷2⌉ (N)⌉**

where N is the number of search-key values. **Example:** with N = 1,000,000 keys and n = 100, at most ⌈log₅₀ 1,000,000⌉ = ⌈3.53⌉ = **4** levels, so about 4 block accesses (plus one for the record), compared with about 20 for binary search on a sorted file (⌈log₂ 1,000,000⌉ = 20).

### Insertion and Deletion

1. **Insertion:** the key is inserted into the correct leaf in sorted order; if the leaf overflows, it is **split** into two, and the first key of the new leaf is **copied up** into the parent; if the parent overflows, it is split in turn (its middle key is moved up), possibly up to the root, which increases the height by one.
2. **Deletion:** the key is removed from its leaf; if the leaf becomes less than half full, it **borrows** an entry from a sibling or is **merged** with a sibling, and the parent is updated; merging can propagate upward and reduce the height.

The detailed insertion and deletion algorithms with examples are given in [AVL, B and B+ Trees](/topics/data-structures-algorithms/avl-b-bplus-trees#bplus-tree).

### Advantages of B+ Tree Indexes

1. Remain **balanced** automatically; performance does not degrade as the file grows, and no reorganization is needed.
2. Few disk accesses (high fan-out, small height).
3. Efficient for both **equality and range queries** (linked leaves).

### Disadvantages of B+ Tree Indexes

1. Extra space and overhead for insertion and deletion (splits and merges).
2. Nodes may be only half full, wasting some space.

## B-Tree Index Files {#b-tree-index-files}

### Definition of B-Tree Index

A B-tree index is a balanced multilevel tree index in which **each key appears only once** and **non-leaf nodes also store record pointers**.

So a search may end at an internal node, and the leaves are not linked.

A non-leaf node of a B-tree has the form:

> **P₁, Pr₁, K₁, P₂, Pr₂, K₂, …, Pₙ₋₁, Prₙ₋₁, Kₙ₋₁, Pₙ**

where each Kᵢ has a **record pointer Prᵢ** in addition to the tree pointers Pᵢ. Because these extra pointers take space, a B-tree node holds **fewer keys** than a B+ tree node of the same size, so its fan-out is lower and the tree may be deeper.

### B-Tree vs B+ Tree as an Index

| Basis | B-tree | B+ tree |
| --- | --- | --- |
| Where records are referenced | Internal and leaf nodes | Only leaf nodes |
| Repetition of keys | Each key appears once | Internal keys are repeated in the leaves |
| Search | May end at an internal node | Always ends at a leaf |
| Leaf nodes | Not linked | Linked list in key order |
| Range queries / sequential access | Inefficient | Efficient |
| Fan-out and height | Lower fan-out, deeper | Higher fan-out, shallower |
| Insertion and deletion | More complex | Simpler |
| Use | Fewer DBMSs | Most DBMS and file-system indexes |

The definition, properties, insertion and deletion of B-trees are explained in [AVL, B and B+ Trees](/topics/data-structures-algorithms/avl-b-bplus-trees#b-tree).

## Static and Dynamic Hashing / Hash Indexing {#static-and-dynamic-hashing-hash-indexing}

### Hash Index

A hash index is an index that organizes the **search keys, with their record pointers, into buckets** using a **hash function h**.

The hash function is applied to the search key. A **bucket** is a unit of storage (usually one disk block) that holds one or more entries. To find a record with key K, the DBMS computes h(K) and reads only that bucket. (In hash file organization, the records themselves are stored in the buckets.)

### Static Hashing

In static hashing, the **number of buckets is fixed** when the file is created, and h(K) always gives the same bucket address. **Example:** with 5 buckets and h(K) = K mod 5, keys 101, 102, 103, 104 and 105 go to buckets 1, 2, 3, 4 and 0.

1. **Operations:** insertion, search, update and deletion all compute h(K) and go directly to the bucket.
2. **Bucket overflow** occurs when a bucket is full, because of **insufficient buckets** or **skew** (many keys hashing to the same bucket). It is handled by:
   - **Overflow chaining** — overflow buckets are linked to the full bucket.
   - **Open addressing (linear probing)** — the entry is put in the next bucket with free space.
3. **Problem:** a fixed number of buckets is wrong as the database grows or shrinks — too few buckets cause long overflow chains, and too many waste space.

### Dynamic (Extendible) Hashing

Dynamic hashing **allows the number of buckets to grow and shrink** as records are inserted and deleted. In **extendible hashing**:

1. The hash function produces a binary value, of which only the first or last **i bits** are used; **i is the global depth**.
2. A **directory (bucket address table)** of **2ⁱ entries** points to the buckets; several entries can point to the same bucket.
3. Each bucket has a **local depth** j (j ≤ i): the number of bits its entries have in common.
4. When a bucket overflows:
   - if **j < i**, the bucket is **split** into two, its local depth is increased, and its entries are redistributed — the directory does not change;
   - if **j = i**, the **directory is doubled** (i increases by 1), and then the bucket is split.
5. When buckets become empty, they can be merged and the directory halved.

**Worked example:** keys 16, 4, 6, 22, 24, 10, 31, 7, 9, 20, 26 are inserted, using the **last bits** of their binary values, with a bucket size of 3 and an initial global depth of 1.

1. 16 (10000), 4 (00100), 6 (00110) go to bucket 0, which becomes full.
2. 22 (10110) overflows bucket 0; local depth = global depth, so the directory doubles to global depth 2: bucket 00 = {16, 4}, bucket 10 = {6, 22}; bucket 1 (local depth 1) is shared by 01 and 11.
3. 24 → 00, 10 → 10, 31 → 11, 7 → 11 and 9 → 01 fit without overflow.
4. 20 (10100) overflows bucket 00 (local depth 2 = global depth 2): the directory doubles to global depth 3, giving 000 = {16, 24} and 100 = {4, 20}.
5. 26 (11010) overflows bucket 010 = {6, 22, 10}, whose local depth 2 < global depth 3: only the bucket splits, giving 010 = {10, 26} and 110 = {6, 22}.

![Extendible hashing with global depth 3: directory entries point to buckets {16, 24}, {4, 20}, {10, 26}, {6, 22} and the shared bucket {31, 7, 9}](/diagrams/dbms/extendible-hashing.svg)

### Static vs Dynamic Hashing

| Basis | Static hashing | Dynamic (extendible) hashing |
| --- | --- | --- |
| Number of buckets | Fixed | Grows and shrinks with the data |
| Performance as the file grows | Degrades (overflow chains) | Stays good |
| Space | Wasted if too many buckets | Used efficiently |
| Extra structure | None | Directory (bucket address table) |
| Complexity | Simple | More complex |

Hash functions and collision resolution are explained in detail in [Hashing](/topics/data-structures-algorithms/hashing).

## Comparison of Ordered Indexing and Hashing {#comparison-of-ordered-indexing-and-hashing}

The choice between an ordered index (B+ tree) and hashing depends on the kind of queries, the cost of reorganization and the cost of insertions and deletions:

| Basis | Ordered indexing (B+ tree) | Hashing |
| --- | --- | --- |
| Organization | Keys stored in sorted order | Keys distributed into buckets by a hash function |
| Equality search (A = v) | Logarithmic number of accesses | About one access on average (best) |
| Range query (v1 ≤ A ≤ v2) | Efficient (follow sorted leaves) | Not supported efficiently (must scan) |
| Retrieval in sorted order | Easy | Not possible without sorting |
| Worst case | Predictable (tree height) | Poor if many keys collide |
| Growth of file | Handled automatically | Static hashing degrades; dynamic hashing needed |
| Typical use | Default index in most DBMSs | Exact-match lookups; hash joins |

**Conclusion:** if most queries look for a **single value**, hashing is preferable; if **range queries** or ordered results are common, an **ordered index (B+ tree)** is preferable. Most DBMSs use B+ tree indexes by default and offer hash indexes as an option.

## References {#references}

**TutorialsPoint**

- [DBMS – Indexing](https://www.tutorialspoint.com/dbms/dbms_indexing.htm) — accessed 2026-11-06 (primary, secondary and clustering indexes; dense, sparse and multilevel indexes; B+ tree node rules, insertion and deletion). It calls the B+ tree "a balanced binary search tree"; a B+ tree is a multi-way search tree.
- [Single-Level Ordered Indexing](https://www.tutorialspoint.com/dbms/dbms_single_level_ordered_indexing.htm) — accessed 2026-11-06 (block anchors and the 30,000-record worked example used above). It says a secondary index "can be dense or sparse"; a secondary index must be dense because the file is not sorted on its field (GeeksforGeeks).
- [Multi-Level Indexing](https://www.tutorialspoint.com/dbms/dbms_multi_level_indexing.htm) — accessed 2026-11-06 (fan-out, the 442-block example, ISAM)
- [Dynamic Multilevel Indexing with B-Tree and B+ Tree](https://www.tutorialspoint.com/dbms/dynamic_multi_level_indexing_with_b_minus_tree_and_b_plus_tree.htm) — accessed 2026-11-06. Its B+ tree example says an internal node of a 512-byte block holds "34 keys and 35 pointers"; that needs 34 × 9 + 35 × 6 = 516 bytes, so the correct order is 34 pointers and 33 keys (501 bytes), as calculated above. It also lists linked leaves as a B-tree property, which belongs to the B+ tree.
- [DBMS – Hashing](https://www.tutorialspoint.com/dbms/dbms_hashing.htm) — accessed 2026-11-06 (bucket, static and dynamic hashing, overflow). It says a mod-4 hash function "generates only 5 values"; mod 4 gives four values (0–3).

**GeeksforGeeks**

- [Indexing in Databases – Set 1](https://www.geeksforgeeks.org/dbms/indexing-in-databases-set-1/) — accessed 2026-11-06 (index structure, the five evaluation attributes, types of indexing, advantages and disadvantages)
- [Difference between Dense and Sparse Index](https://www.geeksforgeeks.org/dbms/difference-between-dense-index-and-sparse-index-in-dbms/) — accessed 2026-11-06 (comparison table). Some of its sparse-index bullets contradict the definition ("one index entry per record", "no need to scan blocks") and are not used.
- [Introduction of B-Tree](https://www.geeksforgeeks.org/dbms/introduction-of-b-tree-2/) and [Introduction of B+ Tree](https://www.geeksforgeeks.org/dbms/introduction-of-b-tree/) — accessed 2026-11-06 (node structure of order a and b, B vs B+ tree)
- [Extendible Hashing](https://www.geeksforgeeks.org/dbms/extendible-hashing-dynamic-approach-to-dbms/) — accessed 2026-11-06 (global and local depth, directory expansion, bucket splitting; the worked example above, re-simulated to check the final buckets)
- [Difference between Indexing and Hashing](https://www.geeksforgeeks.org/dbms/difference-between-indexing-and-hashing-in-dbms/) — accessed 2026-11-06. Its claim that indexing is "not best for large databases" is not followed; B+ tree indexes are the standard index for large disk-based tables.

**TpointTech**

- [Indexing in DBMS](https://www.tpointtech.com/indexing-in-dbms) and [B+ Tree](https://www.tpointtech.com/dbms-b-plus-tree) — accessed 2026-11-06 (index structure, ordered indices, B+ tree search and insertion)
- [Hashing](https://www.tpointtech.com/dbms-hashing), [Static Hashing](https://www.tpointtech.com/dbms-static-hashing) and [Dynamic Hashing](https://www.tpointtech.com/dbms-dynamic-hashing) — accessed 2026-11-06 (the mod-5 example). The dynamic-hashing example assigns keys to buckets with wrong bit patterns (for example, 2 = 010 is put in the "00" bucket, and key 9 is written as 10001, which is 17); it is not used.

**Programiz**

- [B+ Tree](https://www.programiz.com/dsa/b-plus-tree) and [SQL CREATE INDEX](https://www.programiz.com/sql/create-index) — accessed 2026-11-06 (B+ tree properties and search; index creation and dropping)

**Additional sources**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter on indexing and hashing — index evaluation metrics, B+ tree node structure and the query-cost bound log⌈n/2⌉(N)
- R. Elmasri and S. B. Navathe, *Fundamentals of Database Systems*, chapter on indexing structures — the order of a B+ tree from the block size (B = 512, V = 9, P = 6, Pr = 7)

All calculations above were checked with a script.
