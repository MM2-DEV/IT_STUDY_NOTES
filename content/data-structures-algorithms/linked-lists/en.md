---
description: Abstract data types and the List ADT, linked list representation and operations, arrays versus linked lists, and singly, doubly (two-way) and circular linked lists with C programs, complexities, advantages and applications.
updated: 2026-11-01
---

## Abstract Data Types and List ADT {#abstract-data-types-and-list-adt}

**Abstract data type (ADT):** an ADT is a **conceptual model of a data type** that specifies **what operations can be performed and how they behave**, **without saying how they are implemented**.

It separates the **logical behaviour** (the interface) from the **physical implementation**.

**Examples of ADTs:**

1. **List ADT:** an ordered sequence of elements.
2. **Stack ADT:** last in, first out; operations push, pop, peek (see [Stacks and Queues](/topics/data-structures-algorithms/stacks-and-queues)).
3. **Queue ADT:** first in, first out; operations enqueue, dequeue, peek.

**Features of an ADT:**

1. **Abstraction:** only the essential operations are visible; the implementation is hidden.
2. **Encapsulation:** the data and the operations on it are bundled together.
3. **Data independence:** the implementation can be changed (for example, from an array to a linked list) without changing the programs that use the ADT.

**Advantages:** modularity (a large system is divided into manageable parts), security of the data (no unintended changes), and reusability. **Disadvantages:** the extra layer of abstraction adds some overhead, and designing a good ADT needs planning.

**ADT vs data structure:** an ADT is the **specification** (what is done); a **data structure** is a concrete **implementation** of it (how it is done). For example, the List ADT can be implemented by an **array** or by a **linked list**.

### List ADT

A **list** is an **ordered collection of elements** in which each element has a position (first, second, …).

Typical operations of the **List ADT**:

| Operation | Meaning |
| --- | --- |
| `insert(x, pos)` | Insert element x at position pos |
| `remove(pos)` | Remove the element at position pos |
| `get(pos)` | Return the element at position pos |
| `search(x)` | Find the position of element x |
| `size()` | Number of elements |
| `isEmpty()` | Check whether the list is empty |
| `traverse()` | Visit every element in order |

The List ADT is implemented in two main ways:

1. **Array (sequential) implementation:** elements in contiguous memory (see [Arrays](/topics/data-structures-algorithms/arrays)).
2. **Linked implementation:** a **linked list** (below).

## Representation and Operations {#representation-and-operations}

**Definition:** a linked list is a **linear, dynamic data structure** in which the elements, called **nodes**, are **not stored in contiguous memory**; each node contains the **data** and a **pointer (link) to the next node**.

The order of the elements is given by the links, not by their positions in memory.

**Parts of a linked list:**

1. **Node:** contains a **data (info) field** and a **link (next) field** holding the address of the next node.
2. **Head (start) pointer:** points to the **first node**. An empty list has head = NULL.
3. **Last node (tail):** its link field is **NULL**, which marks the end of the list.

**Node representation in C** (a self-referential structure):

```c
struct node
{
    int data;               /* information */
    struct node *next;      /* address of the next node */
};
```

**Memory allocation:** nodes are created at run time with `malloc()` and released with `free()` (see [Dynamic Memory Allocation](/topics/programming/c-pointers)), so the list can **grow and shrink** as needed.

**Types of linked lists:**

1. **Singly linked list:** each node points to the next node only; traversal in one direction.
2. **Doubly (two-way) linked list:** each node points to both the next and the previous node; traversal in both directions.
3. **Circular linked list:** the last node points back to the first node instead of NULL.

### Basic Operations

1. **Traversal:** visiting each node from the head until NULL.
2. **Insertion:** at the beginning, at the end, or at a given position (after a given node).
3. **Deletion:** of the first node, the last node, or a node with a given value (position).
4. **Searching:** finding a node with a given value by traversing from the head.
5. **Counting** the nodes, **reversing** the list, **concatenating** two lists, **sorting**.

**Overflow and underflow:** **overflow** occurs when a new node is needed but no free memory is available (`malloc()` returns NULL); **underflow** occurs when a deletion is attempted on an **empty list**.

### Differences Between Array and Linked List

| Basis | Array | Linked list |
| --- | --- | --- |
| Memory | Contiguous locations | Scattered nodes connected by pointers |
| Size | Fixed when created (static) | Grows and shrinks at run time (dynamic) |
| Access | Direct (random) access by index, O(1) | Sequential access from the head, O(n) |
| Insertion / deletion | Slow: elements must be shifted, O(n) | Fast: only pointers change, O(1) once the position is known |
| Extra memory | None | Extra space for a pointer in every node |
| Memory waste | Unused space if the array is larger than needed | No unused space (but pointer overhead) |
| Cache performance | Good (locality) | Poor (nodes are spread out) |
| Searching | Linear or binary search (if sorted) | Only linear search |
| Implementation | Simple | More complex (pointer handling) |
| Best for | Frequent access by position | Frequent insertion and deletion |

## Singly Linked List {#singly-linked-list}

**Definition:** a singly linked list is a linked list in which **each node has one link field**, pointing to the **next node**; the last node's link is NULL.

It can be traversed **in one direction only** (from head to tail).

![Singly linked list of four nodes with data and next fields, the last pointing to NULL](/diagrams/data-structures-algorithms/singly-linked-list.svg)

### Algorithms

**Insert at the beginning:**

1. Create a new node and store the data in it.
2. Set newnode→next = head.
3. Set head = newnode.

**Insert at the end:**

1. Create a new node with newnode→next = NULL.
2. If the list is empty, set head = newnode.
3. Otherwise, traverse to the last node and set last→next = newnode.

**Insert after a given position (node p):**

1. Create a new node.
2. Set newnode→next = p→next.
3. Set p→next = newnode. (The order of steps 2 and 3 matters; otherwise the rest of the list is lost.)

**Delete the first node:** set temp = head, head = head→next, and free temp.

**Delete a node with a given value:** find the node and its **previous node**; set prev→next = node→next and free the node.

**Reverse the list:** use three pointers, prev, current and next: for each node, save next = current→next, set current→next = prev, then move prev = current and current = next. Finally set head = prev.

### Program in C

```c
#include <stdio.h>
#include <stdlib.h>

struct node { int data; struct node *next; };
struct node *head = NULL;

struct node *newNode(int x)
{
    struct node *n = (struct node *) malloc(sizeof(struct node));
    n->data = x;
    n->next = NULL;
    return n;
}

void insertBegin(int x)
{
    struct node *n = newNode(x);
    n->next = head;
    head = n;
}

void insertEnd(int x)
{
    struct node *n = newNode(x), *t = head;
    if (head == NULL) { head = n; return; }
    while (t->next != NULL)
        t = t->next;
    t->next = n;
}

void insertAfter(int key, int x)            /* insert x after the node holding key */
{
    struct node *t = head;
    while (t != NULL && t->data != key)
        t = t->next;
    if (t == NULL) return;                 /* key not found */
    struct node *n = newNode(x);
    n->next = t->next;
    t->next = n;
}

void deleteValue(int x)
{
    struct node *t = head, *prev = NULL;
    while (t != NULL && t->data != x) { prev = t; t = t->next; }
    if (t == NULL) return;                 /* not found */
    if (prev == NULL) head = t->next;      /* deleting the first node */
    else prev->next = t->next;
    free(t);
}

int search(int x)                          /* returns the position (1, 2, ...) or 0 */
{
    int pos = 1;
    for (struct node *t = head; t != NULL; t = t->next, pos++)
        if (t->data == x) return pos;
    return 0;
}

void reverse(void)
{
    struct node *prev = NULL, *cur = head, *next;
    while (cur != NULL)
    {
        next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    head = prev;
}

void display(void)
{
    for (struct node *t = head; t != NULL; t = t->next)
        printf("%d -> ", t->data);
    printf("NULL\n");
}

int main(void)
{
    insertEnd(20); insertEnd(30); insertBegin(10); insertEnd(40);
    display();                       /* 10 -> 20 -> 30 -> 40 -> NULL */
    insertAfter(20, 25);
    display();                       /* 10 -> 20 -> 25 -> 30 -> 40 -> NULL */
    deleteValue(30);
    deleteValue(10);
    display();                       /* 20 -> 25 -> 40 -> NULL */
    printf("25 found at position %d\n", search(25));
    reverse();
    display();                       /* 40 -> 25 -> 20 -> NULL */
    return 0;
}
```

Output:

```text
10 -> 20 -> 30 -> 40 -> NULL
10 -> 20 -> 25 -> 30 -> 40 -> NULL
20 -> 25 -> 40 -> NULL
25 found at position 2
40 -> 25 -> 20 -> NULL
```

### Complexity of Singly Linked List Operations

| Operation | Time |
| --- | --- |
| Insert / delete at the beginning | O(1) |
| Insert at the end (only a head pointer) | O(n) (O(1) if a tail pointer is kept) |
| Insert after a given node | O(1) |
| Delete a given node (its predecessor must be found) | O(n) |
| Search, traversal, counting, reversing | O(n) |
| Access the k-th element | O(n) |

**Limitation:** a node cannot reach its **previous** node, so deleting a node or moving backwards needs a traversal from the head. This is solved by the doubly linked list.

## Two-Way (Doubly) Linked List {#two-way-doubly-linked-list}

**Definition:** a doubly (two-way) linked list is a linked list in which **each node has two link fields**: **prev**, pointing to the **previous node**, and **next**, pointing to the **next node**.

The first node's prev and the last node's next are NULL. It can be traversed **in both directions** (forward and backward).

```c
struct dnode
{
    struct dnode *prev;     /* address of the previous node */
    int data;
    struct dnode *next;     /* address of the next node */
};
```

![Doubly linked list of three nodes with prev, data and next fields](/diagrams/data-structures-algorithms/doubly-linked-list.svg)

**Insert at the beginning:** newnode→prev = NULL; newnode→next = head; if head ≠ NULL then head→prev = newnode; head = newnode.

**Delete a given node p:** if p→prev ≠ NULL then p→prev→next = p→next, else head = p→next; if p→next ≠ NULL then p→next→prev = p→prev; free p. (No search for the previous node is needed, so this takes **O(1)** once p is known.)

```c
#include <stdio.h>
#include <stdlib.h>

struct dnode { struct dnode *prev; int data; struct dnode *next; };
struct dnode *head = NULL, *tail = NULL;

void insertEnd(int x)
{
    struct dnode *n = (struct dnode *) malloc(sizeof(struct dnode));
    n->data = x;
    n->next = NULL;
    n->prev = tail;
    if (tail != NULL) tail->next = n;
    else head = n;                         /* first node */
    tail = n;
}

void deleteNode(struct dnode *p)
{
    if (p->prev != NULL) p->prev->next = p->next; else head = p->next;
    if (p->next != NULL) p->next->prev = p->prev; else tail = p->prev;
    free(p);
}

int main(void)
{
    for (int x = 10; x <= 40; x += 10)
        insertEnd(x);

    deleteNode(head->next);                /* delete 20 */

    printf("Forward:  ");
    for (struct dnode *t = head; t != NULL; t = t->next) printf("%d ", t->data);
    printf("\nBackward: ");
    for (struct dnode *t = tail; t != NULL; t = t->prev) printf("%d ", t->data);
    printf("\n");
    return 0;
}
```

Output:

```text
Forward:  10 30 40
Backward: 40 30 10
```

**Advantages of a doubly linked list:**

1. Traversal in **both directions**.
2. **Deletion of a given node in O(1)**, and insertion **before** a given node, because the previous node is directly available.
3. Suitable for implementing **deques**, browser history and undo/redo.

**Disadvantages:** **more memory** (an extra pointer in every node), and every insertion and deletion must update **more pointers**, so the code is more complex.

### Differences Between Singly and Doubly Linked Lists

| Basis | Singly linked list | Doubly linked list |
| --- | --- | --- |
| Fields in a node | Two: data and next | Three: prev, data and next |
| Traversal | One direction only (forward) | Both directions |
| Memory | Less | More (extra pointer per node) |
| Deleting a given node | O(n): the previous node must be found | O(1): the previous node is known |
| Insert before a given node | Needs traversal | Direct |
| Pointers updated per insertion | Fewer | More |
| Use | Simple lists, stacks | Deques, browser back/forward, LRU caches, most library list classes |

## Circular Linked List {#circular-linked-list}

**Definition:** a circular linked list is a linked list in which the **last node points back to the first node** instead of to NULL, so the nodes form a **circle**.

There is **no NULL at the end**, and traversal can start from any node and return to it.

![Circular linked list: the last node points back to the first node](/diagrams/data-structures-algorithms/circular-linked-list.svg)

**Types:**

1. **Circular singly linked list:** each node has one next pointer; the last node's next points to the first node.
2. **Circular doubly linked list:** each node has prev and next pointers; the last node's next points to the first node, and the first node's prev points to the last node.

**Pointer to the last node:** a circular list is often accessed through a pointer to its **last** node, because last→next is then the first node; so both **insertion at the beginning and at the end take O(1)** time without any traversal.

**Traversal:** since there is no NULL, the loop stops when it comes **back to the starting node**:

```c
#include <stdio.h>
#include <stdlib.h>

struct node { int data; struct node *next; };
struct node *last = NULL;                  /* pointer to the last node */

void insertEnd(int x)
{
    struct node *n = (struct node *) malloc(sizeof(struct node));
    n->data = x;
    if (last == NULL)
        n->next = n;                       /* single node points to itself */
    else
    {
        n->next = last->next;              /* new node points to the first */
        last->next = n;
    }
    last = n;
}

void display(void)
{
    if (last == NULL) return;
    struct node *t = last->next;           /* start from the first node */
    do {
        printf("%d ", t->data);
        t = t->next;
    } while (t != last->next);             /* stop when back at the first */
    printf("\n");
}

int main(void)
{
    for (int x = 10; x <= 40; x += 10)
        insertEnd(x);
    display();                             /* 10 20 30 40 */
    printf("After 40 comes %d\n", last->next->data);   /* 10 */
    return 0;
}
```

Output:

```text
10 20 30 40
After 40 comes 10
```

**Advantages of a circular linked list:**

1. **Any node can be the starting point**, and the whole list can be traversed from any node.
2. **No NULL pointers** at the end.
3. Insertion at the beginning and end in **O(1)** with a pointer to the last node.
4. Natural for **repeating (round) tasks**.

**Disadvantages:** traversal needs care: a wrong stopping condition causes an **infinite loop**; implementation and debugging are harder; reversing and deletion are more complex.

**Applications of circular linked lists:**

1. **Round-robin CPU scheduling** in operating systems (processes are served in turn, again and again).
2. Repeating **playlists** in music players, multiplayer games (players take turns).
3. Implementing **circular queues** (only one pointer, to the last node, is needed).

### Applications of Linked Lists

1. Implementing **stacks, queues and deques**.
2. Representing **polynomials** (each node holds a coefficient and an exponent) and adding them.
3. Arithmetic on **very long integers**.
4. **Sparse matrices** and **adjacency lists** of graphs.
5. **Dynamic memory management** in operating systems (lists of free memory blocks), and file systems.
6. **Browser** back/forward navigation, image viewers and **undo/redo** (doubly linked lists); **LRU caches**.
7. Music player playlists and round-robin scheduling (circular linked lists).

### Advantages and Disadvantages of Linked Lists

**Advantages:**

1. **Dynamic size:** grows and shrinks at run time; no memory is reserved in advance.
2. **Efficient insertion and deletion:** only pointers change, without shifting elements.
3. **No wasted space** for unused elements, and easy implementation of other data structures.

**Disadvantages:**

1. **No random access:** reaching an element needs traversal from the head, O(n).
2. **Extra memory** for the pointer(s) in every node.
3. **Pointer handling is complex**, and errors are hard to debug.
4. **Poor cache performance**, since nodes are scattered in memory.
5. Reverse traversal is difficult in a singly linked list.

## References {#references}

**TutorialsPoint**

- [Linked List Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm) — accessed 2026-11-01
- [Doubly Linked List Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/doubly_linked_list_algorithm.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Abstract Data Types](https://www.geeksforgeeks.org/dsa/abstract-data-types/) — accessed 2026-11-01
- [Linked List vs Array](https://www.geeksforgeeks.org/dsa/linked-list-vs-array/) — accessed 2026-11-01
- [Applications, Advantages and Disadvantages of Linked List](https://www.geeksforgeeks.org/dsa/applications-advantages-and-disadvantages-of-linked-list/) — accessed 2026-11-01
- [Difference between Singly linked list and Doubly linked list](https://www.geeksforgeeks.org/dsa/difference-between-singly-linked-list-and-doubly-linked-list/) — accessed 2026-11-01
- [Introduction to Circular Linked List](https://www.geeksforgeeks.org/dsa/circular-linked-list/) — accessed 2026-11-01

**TpointTech**

- [Linked List in Data Structure](https://www.tpointtech.com/linked-list-in-data-structure) — accessed 2026-11-02
- [Singly Linked List](https://www.tpointtech.com/singly-linked-list) — accessed 2026-11-02
- [Doubly Linked List](https://www.tpointtech.com/doubly-linked-list) — accessed 2026-11-02
- [Circular Linked List](https://www.tpointtech.com/circular-linked-list) — accessed 2026-11-02

**Programiz**

- [Linked List Data Structure](https://www.programiz.com/dsa/linked-list) — accessed 2026-11-02
- [Types of Linked List](https://www.programiz.com/dsa/linked-list-types) — accessed 2026-11-02
