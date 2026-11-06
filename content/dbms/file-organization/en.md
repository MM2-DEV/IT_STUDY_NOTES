---
description: File organization in DBMS - files, records, fields and blocks, objectives, blocking factor with a worked example, fixed-length and variable-length record representation (slotted page), spanned and unspanned records; heap, sequential, hash, indexed sequential (ISAM), B+ tree and cluster file organization with advantages, disadvantages and a comparison.
updated: 2026-11-06
---

## Concept of File Organization {#concept-of-file-organization}

### Definition of File Organization

File organization is the **method of arranging the records of a file on disk** so that they can be stored, retrieved and updated efficiently.

It decides how records are **placed into disk blocks** and **linked to each other**. It establishes a logical relationship among the records and determines how they are mapped to disk blocks.

### Basic Terms

1. **Field** — the smallest named unit of data; an attribute value such as Name or Roll_No.
2. **Record** — a collection of related fields describing one entity; one row (tuple) of a table, for example (101, Rahim, CSE).
3. **File** — a collection of records of the same type, stored on disk as a sequence of blocks; a table is stored as one or more files.
4. **Block (page)** — the **unit of data transfer between disk and main memory**; a block has a fixed size, usually **4 to 8 KB**, set when the disk is formatted.
5. **Search key / ordering field** — the field used to arrange or search the records.

### Objectives of File Organization

1. **Fast retrieval** — records can be selected quickly.
2. **Easy insertion, deletion and update.**
3. **Efficient use of storage** — minimum wasted space and low storage cost.
4. **No duplicate records** caused by insert, update or delete operations.
5. Good performance for the most frequent kind of access (sequential, random or range).

### Blocking Factor

The blocking factor (bfr) is the **number of records that fit in one block**. For fixed-length records that do not span blocks:

> **bfr = ⌊ B ÷ R ⌋**

> **Number of blocks needed, b = ⌈ r ÷ bfr ⌉**

> **Unused space per block = B − (bfr × R)**

Here:

1. **B** — block size in bytes.
2. **R** — record size in bytes.
3. **r** — number of records in the file.
4. **⌊ ⌋** — floor (round down); **⌈ ⌉** — ceiling (round up).

**Worked example:** a STUDENT file has r = 10,000 records of R = 100 bytes, and the block size is B = 4,096 bytes.

1. bfr = ⌊ 4096 ÷ 100 ⌋ = ⌊ 40.96 ⌋ = **40 records per block**.
2. b = ⌈ 10,000 ÷ 40 ⌉ = **250 blocks**.
3. Unused space per block = 4096 − (40 × 100) = **96 bytes**.
4. Searching an **unordered (heap)** file for one record needs, on average, b ÷ 2 = **125 block accesses** (linear search).
5. Searching an **ordered** file on its ordering key with binary search needs about ⌈ log₂ 250 ⌉ = **8 block accesses**.

### Representation of Records

#### Fixed-Length Records

In a fixed-length record, **every record has the same size**, and each field has a fixed length and position. For example, Name (30 bytes) + NID (9) + Salary (4) + Job_Code (4) + Department (20) = **67 bytes** per record, and each field is always found at the same offset (Salary starts after the first 39 bytes).

1. **Advantages:** simple to design, store and access; the address of the i-th record can be calculated directly.
2. **Disadvantages:** space is wasted when values are shorter than the field size or optional fields are empty; when a record is deleted, its space must be filled (by moving the last record into it, or by keeping a **free list** of deleted slots).

#### Variable-Length Records

Variable-length records are needed when records have **variable-length fields** (such as VARCHAR), **optional fields**, **repeating fields**, or when **records of different types** are stored in one file. Their fields can be separated by:

1. **Separator characters** — for example, `Rahim|101|45000|Computer Science|`.
2. **Length prefixes** — each field is preceded by its length.
3. **Fixed part with (offset, length) pairs** — the record starts with a fixed-size part holding the offset and length of each variable field, followed by the actual values.

Variable-length records are stored in blocks with the **slotted-page structure**:

1. Each block starts with a **header** containing the **number of records**, the **end of free space**, and an array with the **location (offset) and size** of each record.
2. **Records** are stored together at the **end of the block**, and **free space** lies between the header and the records.
3. A new record is placed at the end of the free space, and a new entry is added to the header.
4. When a record is deleted, its header entry is marked deleted and the remaining records are moved to close the gap.
5. Other structures point to the **header entry**, not directly to the record, so records can be moved inside the block.

![Slotted-page structure: the block header holds the offset and size of each record; records are stored at the end of the block, with free space between](/diagrams/dbms/slotted-page.svg)

#### Spanned and Unspanned Records

1. **Unspanned organization** — a record must lie **completely within one block**; any leftover space at the end of a block is unused. Used for fixed-length records smaller than a block.
2. **Spanned organization** — a record **may continue from one block into the next**, linked by a **pointer** at the end of the block. It avoids wasted space and is needed when a record is larger than a block.

#### Data Dictionary (System Catalog)

The DBMS stores **metadata** about all files in the **data dictionary (system catalog)**: names of relations and attributes, their types and lengths, views, integrity constraints, users and privileges, the number of tuples, the **file organization method** (heap, sequential, hash) and the **indexes**. The DBMS consults the catalog before accessing any relation.

## Classification and Representation {#classification-and-representation}

### Types of File Organization

There are six main types of file organization:

1. **Heap (pile / unordered) file organization**
2. **Sequential (ordered) file organization**
3. **Hash (direct / random) file organization**
4. **Indexed sequential access method (ISAM)**
5. **B+ tree file organization**
6. **Cluster file organization**

![The keys 101, 112, 125, 138 and 140 stored in heap, sequential and hash (key mod 7) file organizations](/diagrams/dbms/file-organizations.svg)

### 1. Heap File Organization

In heap (pile) file organization, records are stored **in the order in which they are inserted**, wherever there is free space — usually at the **end of the file** — with **no ordering** on any field.

1. **Insertion:** very fast — the last block is read, the record is appended and the block is written back; if the block is full, the record goes to a new or any free block. The address of the last block is kept in the file header.
2. **Search:** slow — **linear search** from the first block (on average half the blocks).
3. **Deletion:** find the record, then mark it deleted (a deletion marker) or remove it; this leaves empty space, so the file must be **reorganized** periodically.

**Advantages:**

1. Simplest organization; fastest insertion.
2. Best for **bulk loading** of data, and for small files.
3. Good when most queries read the whole file.

**Disadvantages:**

1. Searching, updating and deleting are slow for large files (linear search).
2. Deleted records leave unused space (fragmentation).

### 2. Sequential File Organization

In sequential (ordered) file organization, records are stored **one after another in sorted order of a key field** (the **ordering field**), such as Roll_No. (A file in which records are kept simply in insertion order is called a **pile file**.)

1. **Insertion:** the correct position must be found and later records shifted, so it is slow; in practice new records go to an **overflow file**, which is **merged** with the main file periodically.
2. **Search:** on the ordering field, **binary search** is possible; reading all records in key order is very efficient.
3. **Deletion:** the record is marked deleted, and the file is reorganized periodically.

**Advantages:**

1. Fast and efficient for processing **all records in order** (batch processing, reports, payroll, result sheets).
2. Binary search on the ordering field.
3. Simple; can be stored on cheap sequential media such as magnetic tape.

**Disadvantages:**

1. A particular record cannot be reached directly; random access is slow.
2. Insertion and deletion are expensive (records must be shifted or the file re-sorted).
3. Searching on any field other than the ordering field is slow.

#### Heap (Unordered) vs Sequential (Ordered) File

| Basis | Heap (unordered) | Sequential (ordered) |
| --- | --- | --- |
| Order of records | Insertion order | Sorted on the ordering field |
| Insertion | Fast (append at the end) | Slow (find position, shift or use overflow) |
| Search | Linear search, slow | Binary search on the ordering field |
| Deletion | Leaves gaps; periodic reorganization | Gaps or overflow; periodic reorganization |
| Reading in key order | Inefficient (must sort first) | Very efficient |
| Best for | Bulk loading, frequent inserts | Batch processing, range queries on the key |

### 3. Hash File Organization

In hash (direct) file organization, a **hash function h(K)** is applied to the **hash key** of a record to compute the **address of the bucket (block)** where the record is stored. The same function is used to find the record, so a record can be reached **directly**, without searching the file. A **bucket** is a unit of storage (one or more blocks) that can hold several records.

**Example:** with h(K) = K mod 7, key 101 goes to bucket 3, 125 to bucket 6, 138 to bucket 5, and 112 to bucket 0. Key 140 also gives 140 mod 7 = 0, so it **collides** with 112.

1. **Insertion, search, update and deletion:** compute h(K), go to that bucket and perform the operation — usually **one block access**.
2. **Bucket overflow (collision):** occurs when a bucket is full or two keys give the same address. It is handled by:
   - **Open addressing (linear probing)** — store the record in the next free bucket.
   - **Overflow chaining** — link an overflow bucket to the full bucket.
3. **Static hashing** uses a **fixed number of buckets**, so overflow chains grow as the file grows; **dynamic (extendible) hashing** increases or decreases the number of buckets as the file grows or shrinks, using more bits of the hash value.

**Advantages:**

1. Very fast access (direct address) for searches on the hash key with equality conditions (=).
2. Suitable for large databases and online systems such as banking and ticket booking.

**Disadvantages:**

1. **Not suitable for range queries** (for example, cgpa BETWEEN 3 and 4) or for reading records in order, because records are scattered.
2. Collisions and overflow reduce performance.
3. Searching on a field other than the hash key is slow.

The hash functions, collision resolution techniques and static and dynamic hashing are explained in detail in [Hashing](/topics/data-structures-algorithms/hashing).

### 4. Indexed Sequential Access Method (ISAM)

ISAM combines **sequential file organization** with an **index**. The records are stored **sorted on the primary key** in a **data file**, and an **index file** stores the key values with **pointers to the blocks** where they are found. It was developed by IBM. Its parts are:

1. **Data file** — records sorted on the key.
2. **Index file** — entries of (key, block address), searched first.
3. **Overflow area** — new records that do not fit in their correct block.

Records can be accessed **sequentially** (in key order) or **randomly** (through the index).

**Advantages:**

1. Fast search on large files, using the index.
2. Supports both sequential processing and random access.
3. Supports **range queries** and partial-key searches (for example, names starting with "JA").

**Disadvantages:**

1. Extra disk space for the index.
2. The index is static: many insertions fill the overflow area, so performance falls and the file must be **reorganized**.

### 5. B+ Tree File Organization

B+ tree file organization is an advanced form of ISAM in which the records (or pointers to them) are stored in a **balanced B+ tree** on a key:

1. **Internal nodes** hold only key values and pointers that guide the search.
2. **All records are stored at the leaf level**, and the leaves are **linked together** in key order, so they can be read sequentially.
3. Every path from the root to a leaf has the **same length** (balanced), and the tree grows and shrinks automatically as records are inserted and deleted, by splitting and merging nodes.

**Advantages:**

1. Fast search, insertion and deletion (logarithmic number of block accesses).
2. Efficient range queries and sequential access through the linked leaves.
3. No reorganization is needed; the tree stays balanced as the file grows.

**Disadvantages:**

1. Extra space for the internal nodes; some nodes may be half empty.
2. More complex; not efficient for small or static tables.

The structure, insertion and deletion of B+ trees are explained in [AVL, B and B+ Trees](/topics/data-structures-algorithms/avl-b-bplus-trees#bplus-tree).

### 6. Cluster File Organization

In cluster file organization, **records of two or more related tables are stored in the same file and the same block**, grouped on a common **cluster key** (usually the **join attribute**), which is stored only once. For example, each DEPARTMENT record is stored together with all the EMPLOYEE records of that department.

1. **Indexed cluster** — records are grouped by the cluster key using an index.
2. **Hash cluster** — records are grouped by the hash value of the cluster key.

**Advantages:**

1. Very fast **joins** on the cluster key, because related records are read in one block access.
2. Suitable for **one-to-many** relationships that are frequently joined.

**Disadvantages:**

1. Slow when the tables are used separately or joined on other conditions.
2. Not suitable for one-to-one relationships or very large databases.
3. Changing the cluster key requires reorganization.

### Comparison of File Organizations

| Organization | Order of records | Search on key | Insertion | Range queries | Best for |
| --- | --- | --- | --- | --- | --- |
| Heap | Insertion order | Linear (slow) | Fastest | Poor | Bulk loading, small files |
| Sequential | Sorted on a key | Binary search | Slow | Good | Batch processing, reports |
| Hash | By hash function | Direct (fastest for =) | Fast | Not supported | Equality searches, online systems |
| ISAM | Sorted + index | Through index | Medium (overflow area) | Good | Mixed sequential and random access |
| B+ tree | Sorted leaves | Logarithmic | Fast (tree adjusts) | Very good | General-purpose, dynamic files |
| Cluster | Grouped by cluster key | Through cluster key | Medium | Depends | Frequent joins of related tables |

## References {#references}

**TutorialsPoint**

- [File Structure](https://www.tutorialspoint.com/dbms/dbms_file_structure.htm) — accessed 2026-11-06 (file, heap, sequential, hash and clustered organization, file operations)
- [Ordered and Unordered Records](https://www.tutorialspoint.com/dbms/dbms_ordered_and_unordered_records.htm) — accessed 2026-11-06 (heap and sorted files, deletion markers, binary search, comparison table)
- [Placing File Records on Disk](https://www.tutorialspoint.com/dbms/dbms_placing_file_records_on_disk.htm) — accessed 2026-11-06 (fixed and variable-length records, the 67-byte example, separators, spanned and unspanned records)
- [Storage System](https://www.tutorialspoint.com/dbms/dbms_storage_system.htm) and [Buffers and Disk Blocks](https://www.tutorialspoint.com/dbms/dbms_buffer_and_disk_blocks.htm) — accessed 2026-11-06 (disk blocks)

**GeeksforGeeks**

- [File Organization in DBMS – Set 1](https://www.geeksforgeeks.org/dbms/file-organization-in-dbms-set-1/) — accessed 2026-11-06 (objectives, sequential and heap organization). Its heap example says "four records … R1, R5, R6, R4 and R3", which are five records.
- [File Organization in DBMS – Set 2 (Hashing)](https://www.geeksforgeeks.org/dbms/file-organization-in-dbms-set-4/) — accessed 2026-11-06 (static and dynamic hashing, bucket overflow). The `set-2` URL returns 404; this article is at the `set-4` URL. It calls linear probing "open hashing" and overflow chaining "closed hashing", which is the reverse of the usual names (open hashing = separate chaining, closed hashing = open addressing), so the names linear probing and overflow chaining are used here.
- [File Organization in DBMS – Set 3](https://www.geeksforgeeks.org/dbms/file-organization-in-dbms-set-3/) — accessed 2026-11-06 (B+ tree, cluster and ISAM organization)

**TpointTech**

- [File Organization](https://www.tpointtech.com/dbms-file-organization), [Sequential](https://www.tpointtech.com/dbms-sequential-file-organization), [Heap](https://www.tpointtech.com/dbms-heap-file-organization), [Hash](https://www.tpointtech.com/dbms-hash-file-organization), [ISAM](https://www.tpointtech.com/dbms-indexed-sequential-access-method), [B+ File Organization](https://www.tpointtech.com/dbms-b-plus-file-organization) and [Cluster](https://www.tpointtech.com/dbms-cluster-file-organization) — accessed 2026-11-06. The ISAM page begins "we will discuss … hash file organization" (a copy error); the cluster page's example output is not actually grouped (Bid 2 appears in rows 3 and 6).
- [File Organization Storage](https://www.tpointtech.com/file-organization-storage) and [Data Dictionary Storage](https://www.tpointtech.com/data-dictionary-storage) — accessed 2026-11-06 (block size, fixed-length record problems, slotted page, system catalog)

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (lists "File organization: definition of various file organization, classification and representation" in its syllabus; it has no notes on the topic)

**Programiz**

- Programiz has no page on file organization (checked 2026-11-06).

**Additional source**

- R. Elmasri and S. B. Navathe, *Fundamentals of Database Systems*, Pearson, chapter on disk storage and file structures — blocking factor and the number of block accesses for linear and binary search (not given on the reference websites)
