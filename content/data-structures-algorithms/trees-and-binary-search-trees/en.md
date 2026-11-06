---
description: Trees - tree terminology, binary trees (types, properties, array and linked representation), traversals (inorder, preorder, postorder, level order) with constructing a tree from traversals, and binary search trees with search, insertion and deletion, with C programs.
updated: 2026-11-02
---

## Tree Concepts {#tree-concepts}

### Definition

A **tree** is a **non-linear, hierarchical data structure** made of **nodes** connected by **edges**.

It has these properties:

1. There is one special node, the **root**, which has **no parent**.
2. Every other node has **exactly one parent** and zero or more children.
3. A tree is **connected** and has **no cycles**, so there is **exactly one path** between any two nodes.
4. A tree with n nodes has exactly **n − 1 edges**.

Arrays, linked lists, stacks and queues are **linear** structures (the elements form a sequence); a tree stores data in a **hierarchy**, like a family tree or the folders on a disk.

![A tree with root A, internal nodes B, D and F, and leaves C, E, G, H and I on levels 0 to 3](/diagrams/data-structures-algorithms/tree-terminology.svg)

### Tree Terminology

The examples refer to the tree in the figure.

| Term | Meaning | Example |
| --- | --- | --- |
| **Node** | An element of the tree; holds a value (key) and links to its children | A, B, …, I |
| **Edge** | The link between a parent and a child | A–B |
| **Root** | The topmost node; it has no parent | A |
| **Parent** | The node directly above a node | B is the parent of E and F |
| **Child** | A node directly below a node | E and F are children of B |
| **Siblings** | Nodes with the same parent | B, C, D |
| **Leaf (external / terminal) node** | A node with **no children** | C, E, G, H, I |
| **Internal (non-terminal) node** | A node with **at least one child** | A, B, D, F |
| **Ancestor** | Any node on the path from the root to a node | A and B are ancestors of F |
| **Descendant** | Any node below a node | E, F, H, I are descendants of B |
| **Path** | A sequence of nodes connected by edges | A → B → F → H |
| **Subtree** | A node together with all its descendants | B with E, F, H, I |
| **Degree of a node** | The **number of children** of the node | degree(A) = 3, degree(F) = 2 |
| **Degree of a tree** | The highest degree of any node | 3 |
| **Level** | The root is at level 0; each child is one level below its parent | F is at level 2 |
| **Depth of a node** | Number of edges from the **root** to the node | depth(H) = 3 |
| **Height of a node** | Number of edges on the longest path from the node **down to a leaf** | height(B) = 2 |
| **Height of the tree** | The height of the root (= depth of the deepest node) | 3 |
| **Forest** | A collection of **disjoint trees**; removing the root of a tree gives a forest | removing A gives three trees |

Some books count levels from 1 (root at level 1) and height in nodes instead of edges; then the formulas below shift by 1. These notes use **root at level 0** and **height in edges**.

### Types of Trees

1. **General tree:** a node can have **any number** of children.
2. **Binary tree:** each node has **at most two** children.
3. **Binary search tree (BST):** a binary tree in which left subtree < node < right subtree.
4. **AVL tree:** a self-balancing binary search tree (see [AVL, B and B+ Trees](/topics/data-structures-algorithms/avl-b-bplus-trees)).
5. **B-tree and B+ tree:** balanced multiway search trees used in databases and file systems.

### Applications of Trees

1. Storing **hierarchical data**: file systems (folders), organisation charts, the HTML DOM.
2. **Binary search trees** for fast search, insertion and deletion.
3. **Heaps** for priority queues and heap sort.
4. **B-trees and B+ trees** for database indexing.
5. **Syntax (parse) trees** and expression trees in compilers.
6. **Tries** for dictionaries, auto-complete and router tables.
7. **Huffman trees** for data compression.

## Binary Trees {#binary-trees}

### Definition

A **binary tree** is a tree in which **each node has at most two children**, called the **left child** and the **right child**.

Each subtree of a binary tree is also a binary tree. A binary tree can be **empty**.

A node of a binary tree is usually declared in C as:

```c
struct node
{
    int data;
    struct node *left;    /* pointer to the left child */
    struct node *right;   /* pointer to the right child */
};
```

### Types of Binary Trees

![Examples of full, complete, perfect and right-skewed binary trees](/diagrams/data-structures-algorithms/binary-tree-types.svg)

1. **Full (strict / proper) binary tree:** every node has **either 0 or 2 children** (no node has exactly one child).
2. **Complete binary tree:** **all levels are completely filled except possibly the last**, and the nodes of the last level are placed **as far left as possible**. (Heaps are complete binary trees.)
3. **Perfect binary tree:** every internal node has **exactly two children** and **all leaves are at the same level**. A perfect tree of height h has 2^(h+1) − 1 nodes.
4. **Skewed (degenerate / pathological) binary tree:** each node has **at most one child**, so the tree behaves like a linked list.
   1. **Left-skewed:** every node has only a left child.
   2. **Right-skewed:** every node has only a right child.
5. **Balanced binary tree:** for **every node**, the heights of the left and right subtrees differ by **at most 1**. Its height is O(log n).

Every perfect binary tree is both full and complete, but a full tree need not be complete and a complete tree need not be full.

### Properties of Binary Trees

(Root at level 0; height counted in edges.)

1. The maximum number of nodes at level l is **2^l**. Example: level 3 can have at most 2³ = 8 nodes.
2. The maximum number of nodes in a binary tree of height h is **2^(h+1) − 1** (a perfect binary tree). Example: height 3 → 2⁴ − 1 = 15 nodes.
3. The minimum number of nodes in a binary tree of height h is **h + 1** (a skewed tree).
4. The minimum possible height of a binary tree with n nodes is **⌊log₂ n⌋**; the maximum height is **n − 1** (skewed). Example: n = 15 → minimum height ⌊log₂ 15⌋ = 3.
5. A binary tree with n nodes has **n − 1 edges**.
6. In **any** non-empty binary tree, the number of **leaf nodes is one more than the number of nodes with two children**: **n₀ = n₂ + 1**.
7. A **full** binary tree with I internal nodes has **I + 1 leaves** and **2I + 1** nodes in total. A full binary tree of height h has at least **2h + 1** nodes.
8. A **complete** binary tree of height h has at least **2^h** nodes (last level with one node) and at most **2^(h+1) − 1**; a complete tree with n nodes has height **⌊log₂ n⌋**. Example: n = 10 → height ⌊log₂ 10⌋ = 3.

### Representation of Binary Trees

**1. Array (sequential) representation:** the nodes are stored level by level, from left to right. With **0-based** indexing, for the node at index i:

1. Left child: **2i + 1**
2. Right child: **2i + 2**
3. Parent: **⌊(i − 1) / 2⌋**

(With **1-based** indexing: left child 2i, right child 2i + 1, parent ⌊i / 2⌋.)

Array representation is efficient for **complete** binary trees (such as heaps) but wastes space for skewed trees, which need up to 2^(h+1) − 1 places.

**2. Linked representation:** each node holds the data and two pointers, **left** and **right** (NULL when the child is absent), as in the `struct node` above. It uses memory only for the existing nodes and is the usual representation.

### Applications of Binary Trees

1. Binary search trees and self-balancing trees for searching and sorting.
2. Heaps (priority queues, heap sort).
3. Expression trees and syntax trees in compilers.
4. Huffman coding trees.
5. Routing tables in routers.

## Traversing Binary Trees {#traversing-binary-trees}

**Tree traversal** is the process of **visiting every node of a tree exactly once** in a systematic order.

Because a tree is not linear, there are several orders. The three **depth-first** traversals are named by **when the root is visited**:

| Traversal | Order | Memory aid |
| --- | --- | --- |
| **Inorder** | **Left → Root → Right** | root in the middle |
| **Preorder** | **Root → Left → Right** | root first |
| **Postorder** | **Left → Right → Root** | root last |

The **breadth-first** traversal is **level order**.

### Algorithms

```text
INORDER(node)                 PREORDER(node)                POSTORDER(node)
1. if node ≠ NULL             1. if node ≠ NULL             1. if node ≠ NULL
2.   INORDER(node.left)       2.   visit(node)              2.   POSTORDER(node.left)
3.   visit(node)              3.   PREORDER(node.left)      3.   POSTORDER(node.right)
4.   INORDER(node.right)      4.   PREORDER(node.right)     4.   visit(node)
```

**Level order:** put the root in a **queue**; repeatedly dequeue a node, visit it, and enqueue its left and right children, until the queue is empty. It visits the nodes level by level, from left to right.

### Example

For the tree in the [binary search tree figure](#binary-search-trees-and-operations) (root 50; 30 and 70; 20, 40, 60, 80):

| Traversal | Output |
| --- | --- |
| Inorder | 20, 30, 40, 50, 60, 70, 80 |
| Preorder | 50, 30, 20, 40, 70, 60, 80 |
| Postorder | 20, 40, 30, 60, 80, 70, 50 |
| Level order | 50, 30, 70, 20, 40, 60, 80 |

**Example 2:** for the tree A(B(D, E(G, –)), C(–, F)) — B and C are children of A; D and E of B; G is the left child of E; F is the right child of C:

| Traversal | Output |
| --- | --- |
| Inorder | D B G E A C F |
| Preorder | A B D E G C F |
| Postorder | D G E B F C A |

All traversals take **O(n)** time, because each node is visited once. The recursive traversals use O(h) stack space (h = height).

### Uses of the Traversals

1. **Inorder:** gives the keys of a **BST in sorted (ascending) order**; on an expression tree it gives the infix expression.
2. **Preorder:** used to **copy (clone) a tree**; on an expression tree it gives the **prefix** expression.
3. **Postorder:** used to **delete (free) a tree** (children are deleted before the parent); on an expression tree it gives the **postfix** expression.
4. **Level order:** processing a tree level by level (for example, printing each level, finding the width).

**Expression tree example:** for (a − b) / ((c × d) + e), the root is `/`, its left subtree is `a − b` and its right subtree is `(c × d) + e`. Preorder gives `/ − a b + × c d e` (prefix) and postorder gives `a b − c d × e + /` (postfix). See also [Prefix, Infix and Postfix Expressions](/topics/data-structures-algorithms/prefix-infix-postfix).

### Constructing a Binary Tree from Its Traversals

A binary tree can be built uniquely from its **inorder** traversal together with its **preorder** or **postorder** traversal. (Preorder and postorder alone are not enough in general.)

**Method (inorder + preorder):**

1. The **first** element of the preorder is the **root**. (With postorder, the **last** element is the root.)
2. Find the root in the inorder: the elements to its **left** form the **left subtree** and those to its **right** form the **right subtree**.
3. Repeat for each subtree with the matching part of the preorder.

**Example:** Inorder: **D B E A F C**, Preorder: **A B D E C F**

1. Preorder starts with **A** → A is the root. Inorder splits into left (D B E) and right (F C).
2. Left part: the next preorder element is **B** → root of the left subtree; inorder D | B | E gives D as its left child and E as its right child.
3. Right part: the next preorder element is **C** → root of the right subtree; inorder F | C gives F as its left child.

Result: A has children B and C; B has children D and E; C has left child F. (Check: postorder = D E B F C A.)

## Binary Search Trees and Operations {#binary-search-trees-and-operations}

### Definition

A **binary search tree (BST)** is a binary tree in which, for **every node**:

1. All keys in the **left subtree are smaller** than the node's key.
2. All keys in the **right subtree are larger** than the node's key.
3. The left and right subtrees are also binary search trees.

(Duplicate keys are usually not allowed, or are always placed on one fixed side.) The **inorder traversal of a BST gives the keys in ascending order**.

![Binary search tree with root 50, children 30 and 70, and leaves 20, 40, 60 and 80](/diagrams/data-structures-algorithms/bst-example.svg)

### Search

1. Start at the root.
2. If the node is NULL, the key is **not found**.
3. If the key equals the node's key, it is **found**.
4. If the key is **smaller**, search the **left** subtree; if **larger**, search the **right** subtree.

**Example:** search for 60 in the tree above: 60 > 50 → go right to 70; 60 < 70 → go left to 60 → found (3 comparisons).

### Insertion

A new key is always inserted as a **leaf**: search for the key as above, and when an empty (NULL) place is reached, create the new node there.

**Example:** insert 5, 10, 90, 4, 60, 98, 50, 55 in this order into an empty BST:

1. **5** becomes the root.
2. **10** > 5 → right child of 5.
3. **90** > 5, > 10 → right child of 10.
4. **4** < 5 → left child of 5.
5. **60** > 5, > 10, < 90 → left child of 90.
6. **98** > 5, > 10, > 90 → right child of 90.
7. **50** > 5, > 10, < 90, < 60 → left child of 60.
8. **55** > 5, > 10, < 90, < 60, > 50 → right child of 50.

```text
        5
       / \
      4   10
            \
             90
            /  \
          60    98
         /
       50
         \
          55
```

**Example 2:** insert 45, 15, 79, 90, 10, 55, 12, 20, 50:

```text
            45
          /    \
        15      79
       /  \    /  \
     10   20  55   90
       \      /
        12   50
```

Searching for 20 follows 45 → 15 → 20.

Inserting keys that are **already sorted** (for example, 10, 20, 30, 40) produces a **skewed tree**, in which every operation takes O(n).

### Deletion

To delete a node, first search for it. Then there are **three cases**:

1. **Case 1 — the node is a leaf (no children):** simply remove it (set the parent's link to NULL).
2. **Case 2 — the node has one child:** remove the node and **connect its parent directly to its only child**.
3. **Case 3 — the node has two children:** find its **inorder successor** (the **smallest key in its right subtree**), **copy** the successor's key into the node, and then **delete the successor** (which has at most one child, so case 1 or 2 applies). The **inorder predecessor** (the largest key in the left subtree) can be used instead.

**Example:** in the tree 50(30(20, 40), 70(60, 80)):

1. Delete **20** (leaf) → just remove it.
2. Then delete **30** (now has one child, 40) → 40 takes the place of 30.
3. Then delete **50** (two children) → its inorder successor is **60** (smallest in the right subtree); copy 60 into the root and delete the old 60 (a leaf). The tree becomes 60(40, 70(–, 80)).

**Example 2 (deletions in the tree of Example 2 above):**

1. Delete **90** (leaf) → simply removed.
2. Delete **79** (now has one child, 55) → 55 takes its place.
3. Delete **45** (root, two children) → its inorder successor is **50** (smallest key in the right subtree); 50 is copied into the root and the old 50 (a leaf) is removed. The tree becomes 50(15(10(–, 12), 20), 55).

### Complexity

The time of search, insertion and deletion is proportional to the **height h** of the tree: **O(h)**.

| Operation | Best / average (balanced tree, h ≈ log n) | Worst (skewed tree, h = n − 1) |
| --- | --- | --- |
| Search | O(log n) | O(n) |
| Insertion | O(log n) | O(n) |
| Deletion | O(log n) | O(n) |

To keep the height O(log n) in all cases, **self-balancing BSTs** such as AVL trees and red-black trees are used.

### Program: BST Operations and Traversals

```c
#include <stdio.h>
#include <stdlib.h>

struct node { int data; struct node *left, *right; };

struct node *newNode(int x)
{
    struct node *n = malloc(sizeof(struct node));
    n->data = x;
    n->left = n->right = NULL;
    return n;
}

struct node *insert(struct node *root, int x)
{
    if (root == NULL) return newNode(x);          /* empty place found */
    if (x < root->data) root->left = insert(root->left, x);
    else if (x > root->data) root->right = insert(root->right, x);
    return root;
}

struct node *search(struct node *root, int x)
{
    if (root == NULL || root->data == x) return root;
    return (x < root->data) ? search(root->left, x) : search(root->right, x);
}

struct node *deleteNode(struct node *root, int x)
{
    if (root == NULL) return NULL;
    if (x < root->data) root->left = deleteNode(root->left, x);
    else if (x > root->data) root->right = deleteNode(root->right, x);
    else
    {
        if (root->left == NULL)                   /* case 1 or 2 */
        {
            struct node *t = root->right; free(root); return t;
        }
        if (root->right == NULL)                  /* case 2 */
        {
            struct node *t = root->left; free(root); return t;
        }
        struct node *s = root->right;             /* case 3: inorder successor */
        while (s->left != NULL) s = s->left;
        root->data = s->data;
        root->right = deleteNode(root->right, s->data);
    }
    return root;
}

void inorder(struct node *r)   { if (r) { inorder(r->left); printf("%d ", r->data); inorder(r->right); } }
void preorder(struct node *r)  { if (r) { printf("%d ", r->data); preorder(r->left); preorder(r->right); } }
void postorder(struct node *r) { if (r) { postorder(r->left); postorder(r->right); printf("%d ", r->data); } }

int main(void)
{
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    struct node *root = NULL;
    for (int i = 0; i < 7; i++) root = insert(root, keys[i]);

    printf("Inorder:   "); inorder(root);   printf("\n");
    printf("Preorder:  "); preorder(root);  printf("\n");
    printf("Postorder: "); postorder(root); printf("\n");
    printf("Search 60: %s\n", search(root, 60) ? "found" : "not found");

    root = deleteNode(root, 20);
    root = deleteNode(root, 30);
    root = deleteNode(root, 50);
    printf("After deleting 20, 30, 50 - preorder: "); preorder(root); printf("\n");
    return 0;
}
```

Output:

```text
Inorder:   20 30 40 50 60 70 80 
Preorder:  50 30 20 40 70 60 80 
Postorder: 20 40 30 60 80 70 50 
Search 60: found
After deleting 20, 30, 50 - preorder: 60 40 70 80 
```

### Advantages and Disadvantages of BSTs

**Advantages:**

1. Search, insertion and deletion in O(log n) when the tree is balanced.
2. Inorder traversal gives sorted data directly (dynamic sorting).
3. Supports range queries and finding the minimum (leftmost node) and maximum (rightmost node).

**Disadvantage:** if the keys are inserted in sorted or nearly sorted order, the tree becomes **skewed** and the operations degrade to **O(n)**, like a linked list.

### Applications of BSTs

1. Implementing ordered sets and maps (dictionaries).
2. Multilevel indexing in databases.
3. Dynamic sorting.
4. Managing virtual memory areas in the Unix kernel.

## References {#references}

**TutorialsPoint**

- [Tree Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm) — accessed 2026-11-01
- [Tree Traversal](https://www.tutorialspoint.com/data_structures_algorithms/tree_traversal.htm) — accessed 2026-11-02
- [Binary Search Tree](https://www.tutorialspoint.com/data_structures_algorithms/binary_search_tree.htm) — accessed 2026-11-02

**GeeksforGeeks**

- [Properties of Binary Tree](https://www.geeksforgeeks.org/dsa/properties-of-binary-tree/) — accessed 2026-11-01
- [Handshaking Lemma and Interesting Tree Properties](https://www.geeksforgeeks.org/dsa/handshaking-lemma-and-interesting-tree-properties/) — accessed 2026-11-01
- [Binary Tree (Array implementation)](https://www.geeksforgeeks.org/dsa/binary-tree-array-implementation/) — accessed 2026-11-01
- [Tree Traversal Techniques](https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/) — accessed 2026-11-01
- [Deletion in Binary Search Tree](https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/) — accessed 2026-11-01

**TpointTech**

- [Tree Data Structure](https://www.tpointtech.com/tree-data-structure) — accessed 2026-11-02
- [Binary Search Tree](https://www.tpointtech.com/binary-search-tree) — accessed 2026-11-02
- [Binary Tree](https://www.tpointtech.com/binary-tree) — accessed 2026-11-01

**Programiz**

- [Tree Data Structure](https://www.programiz.com/dsa/trees) — accessed 2026-11-01
- [Binary Tree](https://www.programiz.com/dsa/binary-tree) — accessed 2026-11-01
- [Complete Binary Tree](https://www.programiz.com/dsa/complete-binary-tree) — accessed 2026-11-02
- [Tree Traversal](https://www.programiz.com/dsa/tree-traversal) — accessed 2026-11-02
- [Binary Search Tree](https://www.programiz.com/dsa/binary-search-tree) — accessed 2026-11-01
