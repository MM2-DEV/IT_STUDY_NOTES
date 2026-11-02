---
description: Hashing - hash tables, hash indices and hash functions, load factor, static and dynamic (extendible) hashing, collisions and their resolution by chaining and open addressing (linear probing, quadratic probing, double hashing), and the basic hashing methods (division, multiplication, mid-square, folding).
updated: 2026-11-02
---

## Hash Indices and Hash Functions {#hash-indices-and-hash-functions}

### Hashing

**Hashing** is a technique that **maps a key directly to a location (index)** in a table by using a **hash function**. Because the location is computed from the key, an element can be inserted, searched or deleted in **O(1) time on average**, without comparing the key with many other keys (as linear or binary search must).

**Terms:**

1. **Key:** the value used to identify a record (for example, a roll number).
2. **Hash function h(k):** a function that converts a key k into an index (the **hash value**, **hash code** or **hash address**) in the range 0 to m − 1.
3. **Hash table:** an **array** of m slots in which each record is stored at the index given by the hash function.
4. **Bucket:** a slot of the hash table (in a database, a unit of storage, usually one disk block, that can hold one or more records).
5. **Collision:** two different keys get the **same** hash value.
6. **Load factor (α):** α = **n / m**, where n is the number of stored keys and m is the number of slots. It measures how full the table is; as α grows, collisions increase.

**Example:** with table size m = 10 and h(k) = k mod 10, the key 47 is stored at index **7** and the key 123 at index **3**. To search for 47, compute h(47) = 7 and look only at slot 7.

### Hash Index

In a database, a **hash index** organises the search keys and their record pointers into **buckets** by applying a **hash function** to the search key. Instead of traversing an index tree, the DBMS computes the bucket address of a record **directly** from its key, so **exact-match (equality) searches** are very fast. A hash index is not useful for **range queries** (for example, salary between 20,000 and 30,000), because consecutive keys are scattered across different buckets.

### Hash Function

A **hash function** takes a key of any size and returns a **fixed-size** value used as the table index.

**Properties of a good hash function:**

1. **Deterministic:** the same key always gives the same hash value.
2. **Easy and fast to compute.**
3. **Uniform distribution:** spreads the keys evenly over the table, avoiding clustering.
4. **Minimises collisions.**
5. Produces a value within the table range (0 to m − 1).
6. **Uses every part (bit) of the key**, so that keys differing slightly usually get different hash values.

The common hash functions (division, multiplication, mid-square and folding) are explained in [Basic Hashing Techniques](#basic-hashing-techniques).

### Applications of Hashing

1. Implementing **hash tables** (dictionaries, maps and sets in programming languages, symbol tables in compilers).
2. **Database indexing** (hash indices).
3. Caches and fast look-up tables.
4. Password storage and data-integrity checks (using cryptographic hash functions such as SHA-256).

## Static and Dynamic Hashing {#static-and-dynamic-hashing}

In databases, hashing is used to decide **in which bucket a record is stored**. There are two kinds of hashing, depending on whether the number of buckets can change.

### Static Hashing

In **static hashing**, the **number of buckets is fixed** for the lifetime of the database, and the hash function always maps a given key to the **same bucket address**.

**Example:** with h(key) = key mod 5 there are five buckets, 0 to 4. The record with EMP_ID 103 goes to bucket 103 mod 5 = **3**; EMP_IDs 101, 102, 103, 104 and 105 go to buckets 1, 2, 3, 4 and 0.

**Operations:**

1. **Insertion:** compute h(K) and store the record in that bucket.
2. **Search:** compute h(K) again and read the bucket.
3. **Deletion:** search for the record, then remove it.
4. **Update:** search for the record, then modify it.

**Bucket overflow:** when a record hashes to a bucket that is **already full**. Because the number of buckets is fixed, static hashing handles overflow by:

1. **Overflow chaining:** a new (overflow) bucket is linked to the full bucket, forming a chain.
2. **Linear probing:** the record is placed in the **next free bucket**.

**Drawback:** as the database grows, buckets fill up and overflow chains grow, so performance falls; if the database shrinks, space is wasted.

### Dynamic Hashing

In **dynamic hashing**, **buckets are added and removed dynamically** as the data grows and shrinks. It solves the **bucket overflow** problem of static hashing. The best-known form is **extendible hashing**.

**Extendible hashing:**

1. The hash function produces a binary hash value, but only some of its bits are used.
2. A **directory** (bucket address table) holds pointers to the buckets. It is indexed by a number of bits of the hash value called the **global depth**; a directory of global depth d has **2^d entries**.
3. Each bucket has a **local depth**, the number of bits that bucket uses. The local depth is never greater than the global depth; several directory entries can point to the same bucket.
4. **Search:** take the global-depth bits of h(K), use them as the directory index, and follow the pointer to the bucket.
5. **Insertion:** if the bucket has room, store the record. If the bucket is **full**, it is **split** into two and its records are redistributed using one more bit:
   1. If **local depth < global depth**, only the bucket splits and its local depth increases by 1.
   2. If **local depth = global depth**, the **directory doubles**, the global depth increases by 1, and then the bucket splits.

**Advantages:** performance does not fall as the data grows; memory is used efficiently because buckets grow and shrink with the data; suitable for databases that change often.

**Disadvantages:** more complex to implement; the directory needs extra memory and can become large if the keys are not evenly distributed; bucket overflow can still happen (for example, when many records have identical hash values).

### Differences Between Static and Dynamic Hashing

| Basis | Static Hashing | Dynamic Hashing |
| --- | --- | --- |
| Number of buckets | **Fixed** | **Changes** (buckets are added or removed) |
| Hash function / address | A key always maps to the same fixed address | The number of hash bits used grows and shrinks |
| Growth of the database | Causes bucket overflow and long overflow chains | Handled by splitting buckets |
| Performance as data grows | Falls | Stays stable |
| Directory | Not needed | Needs a directory (bucket address table) |
| Memory | May waste space when data shrinks | Used efficiently |
| Complexity | Simple | More complex |
| Suitable for | Databases of fixed, known size | Databases whose size changes often |

## Collisions and Collision Resolution Techniques {#collisions-and-collision-resolution-techniques}

### Collision

A **collision** occurs when **two or more different keys produce the same hash value** and so compete for the same slot. For example, with h(k) = k mod 7, the keys 50, 85 and 92 all hash to slot 1. Collisions cannot be avoided completely when there are more possible keys than slots, so a hash table needs a **collision resolution technique**.

The two main approaches are:

1. **Separate chaining** (open hashing)
2. **Open addressing** (closed hashing): linear probing, quadratic probing and double hashing

**Note on the names:** "open addressing" is also called **closed hashing** (the keys stay inside the table), and separate chaining is the matching **open hashing**. Some DBMS tutorials use "open hashing" and "close hashing" the other way round for bucket overflow handling, so in an answer, name the method itself (chaining or probing) to avoid confusion.

### 1. Separate Chaining

Each slot of the hash table holds a **linked list (chain)** of all the keys that hash to that slot. A colliding key is simply **added to the list** of its slot.

**Example:** insert 50, 700, 76, 85, 92, 73, 101 into a table of size 7 with h(k) = k mod 7:

| Slot | Chain |
| --- | --- |
| 0 | 700 |
| 1 | 50 → 85 → 92 |
| 2 | — |
| 3 | 73 → 101 |
| 4 | — |
| 5 | — |
| 6 | 76 |

**Performance:** with load factor α = n/m, the expected time of search and delete is **O(1 + α)**, and insertion is O(1). If all keys fall into one chain, search becomes O(n) in the worst case.

**Advantages:** simple; the table **never becomes full** (α can exceed 1); less sensitive to the hash function and the load factor; deletion is easy.

**Disadvantages:** extra memory for the links; poor cache performance (nodes are scattered in memory); some slots may never be used; long chains make search slow.

### 2. Open Addressing

All keys are stored **inside the table itself** (so α ≤ 1). When the home slot is occupied, the table is **probed** (searched) for another empty slot in a fixed sequence. The probe sequence is h(k, i) for i = 0, 1, 2, …

#### a) Linear Probing

Check the **next slot**, one by one, wrapping around at the end:

```text
h(k, i) = (h(k) + i) mod m        i = 0, 1, 2, ...
```

**Example:** insert 50, 700, 76, 85, 92, 73, 101 into a table of size 7 with h(k) = k mod 7:

| Key | h(k) | Slots probed | Stored at |
| --- | --- | --- | --- |
| 50 | 1 | 1 | 1 |
| 700 | 0 | 0 | 0 |
| 76 | 6 | 6 | 6 |
| 85 | 1 | 1 (full), 2 | 2 |
| 92 | 1 | 1, 2 (full), 3 | 3 |
| 73 | 3 | 3 (full), 4 | 4 |
| 101 | 3 | 3, 4 (full), 5 | 5 |

Final table: `[700, 50, 85, 92, 73, 101, 76]`

**Problem — clustering:** linear probing tends to create **long runs of occupied slots** (clusters); a key that hashes anywhere into a cluster must probe to its end, so the clusters keep growing and searches slow down. This is called **primary clustering**.

**Searching and deleting:** a search probes from h(k) until the key is found or an **empty** slot is reached. A deleted slot is therefore marked as **"deleted"** (with a dummy item) rather than emptied, so that later searches do not stop too early.

#### b) Quadratic Probing

The gaps between probes grow as **squares**, which reduces primary clustering:

```text
h(k, i) = (h(k) + i²) mod m       i = 0, 1, 2, ...
```

**Example:** table size 7, h(k) = k mod 7, insert 22, 30, 50:

1. 22 → 22 mod 7 = 1 → slot 1.
2. 30 → 30 mod 7 = 2 → slot 2.
3. 50 → 50 mod 7 = 1 (full) → (1 + 1²) mod 7 = 2 (full) → (1 + 2²) mod 7 = **5** → slot 5.

#### c) Double Hashing

A **second hash function** h₂(k) decides the **step size** between probes, so different keys that collide follow different probe sequences:

```text
h(k, i) = (h₁(k) + i × h₂(k)) mod m        (h₂(k) must never be 0)
```

**Example:** table size 7, h₁(k) = k mod 7, h₂(k) = 1 + (k mod 5); insert 27, 43, 692, 72:

1. 27 → h₁ = 6 → slot 6.
2. 43 → h₁ = 1 → slot 1.
3. 692 → h₁ = 6 (full); h₂ = 1 + 2 = 3 → (6 + 3) mod 7 = **2** → slot 2.
4. 72 → h₁ = 2 (full); h₂ = 1 + 2 = 3 → (2 + 3) mod 7 = **5** → slot 5.

Double hashing gives the best distribution of the three probing methods, but it needs more computation.

### Program: Hash Table with Linear Probing

```c
#include <stdio.h>
#define SIZE 7
#define EMPTY -1

int table[SIZE];

int hash(int key) { return key % SIZE; }

void insert(int key)
{
    int i = hash(key);
    for (int n = 0; n < SIZE; n++)
    {
        if (table[i] == EMPTY) { table[i] = key; return; }
        i = (i + 1) % SIZE;                /* linear probing */
    }
    printf("Table full, cannot insert %d\n", key);
}

int search(int key)
{
    int i = hash(key);
    for (int n = 0; n < SIZE && table[i] != EMPTY; n++)
    {
        if (table[i] == key) return i;
        i = (i + 1) % SIZE;
    }
    return -1;                             /* not found */
}

int main(void)
{
    int keys[] = {50, 700, 76, 85, 92, 73, 101};
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
    for (int i = 0; i < 7; i++) insert(keys[i]);

    for (int i = 0; i < SIZE; i++) printf("%d: %d\n", i, table[i]);
    printf("101 is at slot %d\n", search(101));
    return 0;
}
```

Output:

```text
0: 700
1: 50
2: 85
3: 92
4: 73
5: 101
6: 76
101 is at slot 5
```

### Differences Between Separate Chaining and Open Addressing

| Basis | Separate Chaining | Open Addressing |
| --- | --- | --- |
| Where keys are stored | In **linked lists** outside the table | **Inside the table** itself |
| Table full? | Never; chains can always grow (α may exceed 1) | Can become full (α ≤ 1) |
| Implementation | Simpler | Needs more computation (probing) |
| Sensitivity | Less sensitive to the hash function and load factor | Must avoid clustering and keep α low |
| Cache performance | Poor (scattered list nodes) | Better (everything in one array) |
| Extra space | Needed for the links | No links needed |
| Space use | Some slots may never be used | Any slot can be used, even if no key hashes to it |
| Deletion | Easy | Needs "deleted" markers |
| Used when | The number of keys is unknown or changes often | The number of keys is known |

### Comparison of Open Addressing Methods

| Method | Next slot | Clustering | Computation |
| --- | --- | --- | --- |
| Linear probing | (h(k) + i) mod m | Primary clustering | Easiest; best cache use |
| Quadratic probing | (h(k) + i²) mod m | Less clustering than linear | Moderate |
| Double hashing | (h₁(k) + i·h₂(k)) mod m | Least clustering | Most (two hash functions) |

## Basic Hashing Techniques {#basic-hashing-techniques}

The basic techniques (methods) for building a hash function are:

1. Division method
2. Multiplication method
3. Mid-square method
4. Folding method

### 1. Division Method

The key is divided by the table size m and the **remainder** is the hash value:

```text
h(k) = k mod m
```

**Example:** k = 1234567, m = 97 → h(k) = 1234567 mod 97 = **48**.

The table size m should preferably be a **prime number** (not close to a power of 2); a poor choice of m gives a poor distribution.

**Advantages:** simple and very fast. **Disadvantage:** keys that differ by a multiple of m collide.

### 2. Multiplication Method

```text
h(k) = ⌊ m × ((k × A) mod 1) ⌋            0 < A < 1
```

Multiply the key by a constant A, take the **fractional part** of the product, multiply it by m, and take the **floor**. A commonly suggested value is A ≈ 0.6180339887 ((√5 − 1)/2).

**Example:** k = 12345, m = 100, A = 0.6180339887:

1. k × A = 7629.6295…
2. Fractional part = 0.6295…
3. m × 0.6295… = 62.95… → h(k) = **62**

**Advantage:** the choice of m is not critical (m can be a power of 2). **Disadvantage:** slightly more computation than division.

### 3. Mid-Square Method

1. **Square** the key.
2. Take the required number of **middle digits** of the result as the hash value.

**Example:** table of 100 slots (two-digit addresses), k = 3456:

3456² = 11**94 39**36 → the middle two digits are **43**, so h(3456) = **43**.

**Example 2:** k = 4567 → 4567² = 20,8**57**,489 → the middle two digits are **57**.

The middle digits depend on **all** the digits of the key, so the distribution is good. **Disadvantage:** squaring large keys can overflow the integer range.

### 4. Folding Method

1. **Split** the key into parts of equal size (the last part may be shorter).
2. **Add** the parts.
3. Take the sum **mod m** (or ignore the final carry) to get the hash value.

**Example:** k = 123456789, m = 10 (parts of 3 digits):

123 + 456 + 789 = 1368 → 1368 mod 10 = **8**

In a variation, **every other part is reversed** before adding (123 + 654 + 789 = 1566).

**Example 2 (unequal parts, table of 1000 slots):** k = 12345678 → 12 + 345 + 678 = 1035 → 1035 mod 1000 = **35**.

**Advantage:** simple, and suitable for **long keys** (such as phone or account numbers). **Disadvantage:** the quality depends on how the key is split.

### Other Hash Functions

1. **Universal hashing:** the hash function is chosen **at random** from a family, for example h(k) = ((a·k + b) mod p) mod m with random a and b and a prime p > m, so that no fixed set of keys always produces bad behaviour.
2. **Perfect hashing:** for a **fixed set of keys**, builds a hash function with **no collisions** at all.
3. **Cryptographic hash functions** (for example, SHA-256 and SHA-3): designed for security (it is infeasible to find the key from the hash or to find two keys with the same hash); slower than ordinary hash functions.

## References {#references}

**TutorialsPoint**

- [Hash Table Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/hash_data_structure.htm) — accessed 2026-11-01
- [DBMS - Hashing](https://www.tutorialspoint.com/dbms/dbms_hashing.htm) — accessed 2026-11-01
- [Hashing Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/hashing_data_structure.htm) — accessed 2026-11-02
- [Collision in Hashing](https://www.tutorialspoint.com/data_structures_algorithms/collision_in_hashing.htm) — accessed 2026-11-02

**GeeksforGeeks**

- [Hash Functions and Types of Hash Functions](https://www.geeksforgeeks.org/dsa/hash-functions-and-list-types-of-hash-functions/) — accessed 2026-11-01
- [Collision Resolution Techniques](https://www.geeksforgeeks.org/dsa/collision-resolution-techniques/) — accessed 2026-11-01
- [Separate Chaining Collision Handling Technique in Hashing](https://www.geeksforgeeks.org/dsa/separate-chaining-collision-handling-technique-in-hashing/) — accessed 2026-11-01
- [Open Addressing Collision Handling Technique in Hashing](https://www.geeksforgeeks.org/dsa/open-addressing-collision-handling-technique-in-hashing/) — accessed 2026-11-01
- [Folding Method in Hashing](https://www.geeksforgeeks.org/dsa/folding-method-in-hashing/) — accessed 2026-11-01
- [Mid-Square Hashing](https://www.geeksforgeeks.org/dsa/mid-square-hashing/) — accessed 2026-11-01
- [Dynamic Hashing in DBMS](https://www.geeksforgeeks.org/?p=1203179) — accessed 2026-11-01
- [Extendible Hashing (Dynamic approach to DBMS)](https://www.geeksforgeeks.org/dbms/extendible-hashing-dynamic-approach-to-dbms/) — accessed 2026-11-01

**TpointTech**

- [Hashing in Data Structure](https://www.tpointtech.com/hashing-in-data-structure) — accessed 2026-11-02
- [Hash Function in Data Structure](https://www.tpointtech.com/hash-function-in-data-structure) — accessed 2026-11-02 (its multiplication-method example is wrong: the correct index is 9, not 6)
- [DBMS Static Hashing](https://www.tpointtech.com/dbms-static-hashing) — accessed 2026-11-01
- [DBMS Dynamic Hashing](https://www.tpointtech.com/dbms-dynamic-hashing) — accessed 2026-11-01
