---
description: Balanced search trees - AVL trees (balance factor, LL, RR, LR and RL rotations, insertion example), B-trees of order m (properties, search, insertion by splitting, deletion), and B+ trees (linked leaves, insertion), with the B-tree vs B+ tree comparison.
updated: 2026-11-02
---

## AVL Tree {#avl-tree}

### Definition

An **AVL tree** is a **self-balancing binary search tree** in which, for **every node**, the heights of the left and right subtrees differ by **at most 1**. It is named after its inventors, **Georgy Adelson-Velsky and Evgenii Landis**, who published it in **1962**. It was the **first self-balancing binary search tree**.

An ordinary BST can become **skewed** (for example, when keys are inserted in sorted order), and its operations then take O(n). An AVL tree **rebalances itself by rotations** after every insertion and deletion, so its height always stays **O(log n)** (at most about 1.44 log₂ n).

### Balance Factor

```text
Balance factor (BF) = height of left subtree − height of right subtree
```

1. In an AVL tree, the balance factor of every node must be **−1, 0 or +1**.
2. **BF = +1:** the left subtree is one level taller (left-heavy).
3. **BF = 0:** both subtrees have the same height.
4. **BF = −1:** the right subtree is one level taller (right-heavy).
5. If any node gets **BF = +2 or −2**, the tree is **unbalanced** and must be fixed by a rotation.

### Rotations

A **rotation** rearranges a few nodes to restore the balance while keeping the BST order. Each rotation takes **O(1)** time. The four imbalance cases are named by the path from the unbalanced node to the newly inserted node:

| Case | Where the new node was inserted | Fix |
| --- | --- | --- |
| **LL** | In the **left** subtree of the **left** child | **Single right rotation** |
| **RR** | In the **right** subtree of the **right** child | **Single left rotation** |
| **LR** | In the **right** subtree of the **left** child | **Double rotation:** left rotation on the left child, then right rotation on the node |
| **RL** | In the **left** subtree of the **right** child | **Double rotation:** right rotation on the right child, then left rotation on the node |

![The four AVL imbalance cases LL, RR, LR and RL with 10, 20 and 30, and the balanced tree after the rotation](/diagrams/data-structures-algorithms/avl-rotations.svg)

**Right rotation** at node y (with left child x): x becomes the new root of the subtree, y becomes the right child of x, and the old right subtree of x becomes the left subtree of y. The **left rotation** is the mirror image.

(Some books name the rotation by the case, for example "LL rotation" for the single right rotation used in the LL case.)

### Insertion

1. Insert the key as in an ordinary BST (as a leaf).
2. Go back up from the new node to the root, **updating the heights and balance factors**.
3. At the **first unbalanced node** (BF = ±2), identify the case (LL, RR, LR or RL) and apply the matching rotation.

**Example:** insert 10, 20, 30, 40, 50, 25 into an empty AVL tree.

| Insert | Imbalance | Fix | Tree after the step |
| --- | --- | --- | --- |
| 10 | — | — | 10 |
| 20 | — | — | 10 (right child 20) |
| 30 | BF(10) = −2, RR case | Left rotation at 10 | 20 (10, 30) |
| 40 | — | — | 20 (10, 30 (–, 40)) |
| 50 | BF(30) = −2, RR case | Left rotation at 30 | 20 (10, 40 (30, 50)) |
| 25 | BF(20) = −2; 25 went into the left subtree of the right child 40: RL case | Right rotation at 40, then left rotation at 20 | **30 (20 (10, 25), 40 (–, 50))** |

```text
Final AVL tree:
          30
        /    \
      20      40
     /  \       \
   10    25      50
```

**Example 2:** insert the letters H, I, J, B, A, E, C, F, D, G, K, L (alphabetical order).

| Insert | Imbalance found | Rotation |
| --- | --- | --- |
| H, I | — | — |
| J | BF(H) = −2, RR case | Left rotation at H → I(H, J) |
| B | — | — |
| A | BF(H) = +2, LL case | Right rotation at H → I(B(A, H), J) |
| E | BF(I) = +2; E went into the right subtree of the left child B: LR case | Left rotation at B, right rotation at I → H(B(A, E), I(–, J)) |
| C | — | — |
| F | — | — |
| D | BF(B) = −2; D went into the left subtree of the right child E: RL case | Right rotation at E, left rotation at B → C(B(A, –), E(D, F)) |
| G | BF(H) = +2; G went into the right subtree of the left child C: LR case | Left rotation at C, right rotation at H → E becomes the root |
| K | BF(I) = −2, RR case | Left rotation at I → J(I, K) |
| L | — | — |

```text
Final AVL tree:
              E
          /       \
         C         H
        / \       / \
       B   D     F   J
      /           \ / \
     A            G I  K
                        \
                         L
```

Inorder traversal gives A B C D E F G H I J K L, and every node's balance factor is −1, 0 or +1.

### Deletion

1. Delete the node as in a BST (leaf: remove it; one child: replace the node by its child; two children: copy the inorder successor's key into it and delete the successor).
2. Go back up to the root, updating balance factors, and **rotate** at every unbalanced node. (Unlike insertion, a deletion may need rotations at several levels.)

### Complexity

| Operation | Time |
| --- | --- |
| Search | O(log n) |
| Insertion | O(log n) |
| Deletion | O(log n) |
| One rotation | O(1) |

The space is O(n); each node also stores its height (or balance factor).

### Advantages and Disadvantages

**Advantages:**

1. Guaranteed **O(log n)** search, insertion and deletion, even for sorted input.
2. More strictly balanced than red-black trees, so it is lower and **searches are faster**.
3. Inorder traversal gives the keys in sorted order.

**Disadvantages:**

1. More complex to implement than a plain BST.
2. Insertions and deletions may need many rotations, so it is slower than a red-black tree when there are many updates.
3. Extra memory in each node for the height or balance factor.

**Applications:** look-up-intensive applications such as **database indexing** and in-memory dictionaries and sets, where searches are much more frequent than updates.

## B Tree {#b-tree}

### Definition

A **B-tree** is a **self-balancing multiway (m-way) search tree** in which a node can hold **more than one key** and have **more than two children**. It was invented by **Rudolf Bayer and Edward McCreight** in **1970** at Boeing Research Labs. B-trees are designed for data stored on **disk (secondary storage)**: each node is the size of a disk block, so the tree is **very short and wide**, and only a few disk accesses are needed to find a key.

### Properties of a B-Tree of Order m

The **order m** is the **maximum number of children** of a node.

1. Every node has **at most m children** and **at most m − 1 keys**.
2. Every node except the root and the leaves has **at least ⌈m/2⌉ children** (and so at least ⌈m/2⌉ − 1 keys).
3. The **root** has **at least 2 children** unless it is a leaf (it then has at least 1 key).
4. **All leaves are at the same level**, so the tree is always perfectly height-balanced.
5. A non-leaf node with **k children has k − 1 keys**.
6. The keys in each node are in **ascending order**, and the keys of the subtree between two keys lie between those two keys.

**Example:** for **m = 5**, a node has at most 5 children and 4 keys; a non-root internal node has at least ⌈5/2⌉ = 3 children and 2 keys.

| Order m | Max children | Max keys | Min children (non-root internal) | Min keys (non-root) |
| --- | --- | --- | --- | --- |
| 3 | 3 | 2 | 2 | 1 |
| 4 | 4 | 3 | 2 | 1 |
| 5 | 5 | 4 | 3 | 2 |

(Some books instead use the **minimum degree t**: every non-root node has t − 1 to 2t − 1 keys and t to 2t children.)

### Search

1. Start at the root. Compare the key k with the keys of the node, from left to right.
2. If k equals a key, it is **found**.
3. Otherwise, follow the **child pointer between the two keys** that k lies between (or the first or last child).
4. If a leaf is reached without finding k, the key is **not present**.

### Insertion

1. Search for the **leaf** where the key belongs, and insert the key there in sorted order.
2. If the leaf now has **m keys (overflow)**, **split** it: the **median key moves up** to the parent, and the keys on its left and right form two separate nodes.
3. If the parent overflows, split it in the same way. If the **root splits**, a new root is created and the **height grows by one**. (A B-tree grows upward, at the root.)

**Example:** insert 1, 7, 6, 2, 11, 4, 8, 13, 10, 5, 19, 9, 18, 24 into a B-tree of **order 5** (at most 4 keys per node):

| Insert | Action | Tree |
| --- | --- | --- |
| 1, 7, 6, 2 | Fill the root | [1 2 6 7] |
| 11 | [1 2 6 7 11] overflows → median **6** moves up | [6] → [1 2], [7 11] |
| 4, 8, 13 | Insert into leaves | [6] → [1 2 4], [7 8 11 13] |
| 10 | [7 8 10 11 13] overflows → median **10** moves up | [6 10] → [1 2 4], [7 8], [11 13] |
| 5, 19, 9, 18 | Insert into leaves | [6 10] → [1 2 4 5], [7 8 9], [11 13 18 19] |
| 24 | [11 13 18 19 24] overflows → median **18** moves up | **[6 10 18] → [1 2 4 5], [7 8 9], [11 13], [19 24]** |

![B-tree of order 5 with root 6, 10, 18 and four leaves](/diagrams/data-structures-algorithms/b-tree-example.svg)

### Deletion

1. **Key in a leaf:** delete it if the leaf still has at least the minimum number of keys. Otherwise, **borrow** a key from a sibling (through the parent), or if no sibling can spare one, **merge** the leaf with a sibling and the separating key from the parent.
2. **Key in an internal node:** replace it with its **inorder predecessor** or **successor** (taken from a child that has more than the minimum keys), or **merge** the two children if neither can spare a key.
3. If merging empties the root, the **height decreases by one**.

### Complexity

| Operation | Time |
| --- | --- |
| Search | O(log n) |
| Insertion | O(log n) |
| Deletion | O(log n) |
| Traversal | O(n) |

The height of a B-tree is O(log_m n), so with a large order (hundreds of keys per node) even millions of keys need only a few levels.

### Advantages, Disadvantages and Applications

**Advantages:** always balanced; guaranteed O(log n) operations; very **few disk accesses** because the tree is short; good use of storage blocks.

**Disadvantages:** complex to implement; for small in-memory data it can be slower than a binary search tree, because each node holds many keys.

**Applications:**

1. **Databases** and **file systems** (indexes stored on disk).
2. Storing blocks of data on secondary storage.
3. Multilevel indexing.

## B+ Tree {#bplus-tree}

### Definition

A **B+ tree** is a variation of the B-tree in which:

1. **All keys (and the data pointers / records) are stored in the leaf nodes.**
2. The **internal (index) nodes store only keys** used to guide the search (copies of some leaf keys); they hold no data.
3. The **leaf nodes are linked together** in key order, like a linked list, so the records can also be read **sequentially**.

It has the same balance properties as a B-tree of order m: all leaves are at the same level; every node has at most m children; every non-root internal node has at least ⌈m/2⌉ children; and the root has at least 2 children unless it is a leaf.

![B+ tree with index node 10, 20 and three linked leaves holding all the keys](/diagrams/data-structures-algorithms/bplus-tree-example.svg)

### Search

Start at the root and follow the child pointer for the range in which the key lies, **always down to a leaf**; then look for the key in that leaf. Every search therefore takes the same number of steps (the height of the tree).

**Range queries** (for example, all keys from 8 to 25) are efficient: find the first key in a leaf, then follow the **leaf links** to the right.

### Insertion

1. Insert the key into the correct **leaf** in sorted order.
2. If the leaf overflows, **split** it into two leaves and **copy** the **first key of the new right leaf** up to the parent (the key **stays in the leaf** too, because all keys must be in the leaves).
3. If an internal node overflows, split it and **move** its middle key up to the parent (internal keys are not kept twice).

**Example (order 3, at most 2 keys per leaf):** insert 5, 15, 25, 35, 45:

1. 5, 15 → leaf [5 15].
2. 25 → [5 15 25] overflows → leaves [5 15] and [25]; **25 is copied up** → root [25].
3. 35 → leaf [25 35].
4. 45 → [25 35 45] overflows → leaves [25 35] and [45]; **45 is copied up** → root [25 45] with three linked leaves [5 15] → [25 35] → [45].

### Advantages and Applications

**Advantages:** fast **sequential access** and range queries through the linked leaves; internal nodes hold only keys, so more keys fit in a node and the tree is **shorter**; simpler insertion and deletion, since all data is in the leaves.

**Applications:** **database indexing** (most relational databases use B+ trees for their indexes) and **multilevel indexing** in file systems.

### Differences Between B-Tree and B+ Tree

| Basis | B-Tree | B+ Tree |
| --- | --- | --- |
| Data pointers / records | Stored in **all nodes** (internal and leaf) | Stored **only in leaf nodes** |
| Keys | Each key appears **once** (no duplicates) | Keys of internal nodes are **repeated** in the leaves |
| Leaf nodes | **Not linked** | **Linked** like a linked list |
| Sequential access | Not possible directly | Possible through the leaf links |
| Search | May end at an internal node; time varies | Always goes down to a leaf; time is uniform |
| Range queries | Slower | Faster |
| Height | Taller for the same data | Shorter (internal nodes hold more keys) |
| Insertion and deletion | More complex (deleting internal keys) | Simpler (all data in the leaves) |
| Applications | Databases, search engines | Database indexing, multilevel indexing |

## References {#references}

**TutorialsPoint**

- [AVL Trees](https://www.tutorialspoint.com/data_structures_algorithms/avl_tree_algorithm.htm) — accessed 2026-11-01
- [B Trees](https://www.tutorialspoint.com/data_structures_algorithms/b_trees.htm) — accessed 2026-11-02
- [B+ Trees](https://www.tutorialspoint.com/data_structures_algorithms/b_plus_trees.htm) — accessed 2026-11-02

**GeeksforGeeks**

- [Introduction to AVL Tree](https://www.geeksforgeeks.org/dsa/introduction-to-avl-tree/) — accessed 2026-11-01
- [Introduction of B-Tree](https://www.geeksforgeeks.org/dsa/introduction-of-b-tree-2/) — accessed 2026-11-01
- [Difference between B tree and B+ tree](https://www.geeksforgeeks.org/dsa/difference-between-b-tree-and-b-tree/) — accessed 2026-11-01

**TpointTech**

- [B Tree](https://www.tpointtech.com/b-tree) — accessed 2026-11-01
- [AVL Tree](https://www.tpointtech.com/avl-tree) — accessed 2026-11-02
- [B+ Tree](https://www.tpointtech.com/b-plus-tree) — accessed 2026-11-02

**Programiz**

- [AVL Tree](https://www.programiz.com/dsa/avl-tree) — accessed 2026-11-01
- [B-tree](https://www.programiz.com/dsa/b-tree) — accessed 2026-11-01
- [Deletion from a B-tree](https://www.programiz.com/dsa/deletion-from-a-b-tree) — accessed 2026-11-01
- [B+ Tree](https://www.programiz.com/dsa/b-plus-tree) — accessed 2026-11-01
- [Insertion on a B+ Tree](https://www.programiz.com/dsa/insertion-on-a-b-plus-tree) — accessed 2026-11-01

**Additional sources**

- [AVL tree](https://en.wikipedia.org/wiki/AVL_tree) — Wikipedia (inventors, 1962, height bound; not given by the reference websites) — accessed 2026-11-01
- [B-tree](https://en.wikipedia.org/wiki/B-tree) — Wikipedia (inventors, 1970; Knuth's definition of order m) — accessed 2026-11-01
