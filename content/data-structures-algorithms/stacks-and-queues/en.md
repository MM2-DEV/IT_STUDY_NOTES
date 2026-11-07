---
description: Stacks (LIFO) and queues (FIFO) - structure and operations with overflow and underflow, array and linked-list implementations, circular queue, deque, priority queue (types, operations, implementations, comparisons and a heap program), queue using two stacks, and the applications of stacks, with C programs.
updated: 2026-11-07
---

## Structure and Operations of Stacks and Queues {#structure-and-operations-of-stacks-and-queues}

### Stack

**Definition:** a stack is a **linear data structure** in which **insertion and deletion are done at only one end**, called the **top**.

The element inserted **last is removed first**, so a stack follows the **LIFO (Last In, First Out)** principle (also called FILO, first in last out). A stack is an **abstract data type**; it can be implemented with an **array** or a **linked list**.

**Real-life examples:** a pile of plates (a plate is put on and taken from the top), a stack of books, the browser's **back** button, and **undo** in an editor.

**Stack operations:**

| Operation | Meaning |
| --- | --- |
| `push(x)` | Insert x on the **top** of the stack |
| `pop()` | Remove and return the **top** element |
| `peek()` / `top()` | Return the top element **without removing** it |
| `isEmpty()` | True if the stack has no elements |
| `isFull()` | True if the stack is full (array implementation) |

**Stack overflow and underflow:**

1. **Overflow:** trying to **push** onto a **full** stack.
2. **Underflow:** trying to **pop** from an **empty** stack.

**Algorithms (array STACK[MAX], top = −1 when empty):**

```text
 PUSH(x)                                POP()
 1. if top = MAX − 1 then               1. if top = −1 then
        print "Stack Overflow"; return         print "Stack Underflow"; return
 2. top ← top + 1                       2. x ← STACK[top]
 3. STACK[top] ← x                      3. top ← top − 1
                                        4. return x
```

**Example:** starting with an empty stack: push 10, push 20, push 30, pop, push 40.

```text
 push 10    push 20    push 30    pop → 30   push 40
                         30                    40     ← top
              20         20         20         20
   10         10         10         10         10
```

The stack finally contains 10, 20, 40 (top = 40). All stack operations take **O(1)** time.

### Queue

**Definition:** a queue is a **linear data structure** in which **insertion is done at one end**, called the **rear (tail)**, and **deletion at the other end**, called the **front (head)**.

The element inserted **first is removed first**, so a queue follows the **FIFO (First In, First Out)** principle.

**Real-life examples:** people standing in a line at a ticket counter or bus stop, print jobs waiting for a printer, and processes waiting for the CPU.

**Queue operations:**

| Operation | Meaning |
| --- | --- |
| `enqueue(x)` | Insert x at the **rear** |
| `dequeue()` | Remove and return the element at the **front** |
| `peek()` / `front()` | Return the front element without removing it |
| `isEmpty()`, `isFull()` | Check whether the queue is empty or full |

**Queue overflow:** inserting into a full queue. **Queue underflow:** deleting from an empty queue.

**Algorithms (array QUEUE[MAX], front = rear = −1 when empty):**

```text
 ENQUEUE(x)                               DEQUEUE()
 1. if rear = MAX − 1 then                1. if front = −1 or front > rear then
        print "Queue Overflow"; return           print "Queue Underflow"; return
 2. if front = −1 then front ← 0          2. x ← QUEUE[front]
 3. rear ← rear + 1                       3. front ← front + 1
 4. QUEUE[rear] ← x                       4. return x
```

**Example:** enqueue 10, 20, 30; dequeue; enqueue 40:

```text
front       rear                     front       rear
  ↓           ↓                        ↓           ↓
 [10]  [20]  [30]                [ ]  [20]  [30]  [40]
                                 (10 has been removed)
```

### Differences Between Stack and Queue

| Basis | Stack | Queue |
| --- | --- | --- |
| Principle | **LIFO** (last in, first out) | **FIFO** (first in, first out) |
| Ends used | **One** end (top) for both insertion and deletion | **Two** ends: insertion at the rear, deletion at the front |
| Pointers | One: `top` | Two: `front` and `rear` |
| Insertion / deletion | push / pop | enqueue / dequeue |
| Full / empty (array) | top = MAX − 1 / top = −1 | rear = MAX − 1 / front = −1 or front > rear |
| Variants | — | Circular queue, deque, priority queue |
| Real-life example | Pile of plates | Line at a ticket counter |
| Uses | Function calls, recursion, expression evaluation, undo, backtracking | CPU and printer scheduling, BFS, buffers |
| Time of operations | O(1) | O(1) |

## Implementation Strategies {#implementation-strategies}

Stacks and queues can each be implemented with an **array** (static) or a **linked list** (dynamic).

### 1. Stack Using an Array

```c
#include <stdio.h>
#define MAX 5

int stack[MAX], top = -1;

void push(int x)
{
    if (top == MAX - 1) { printf("Stack Overflow\n"); return; }
    stack[++top] = x;
}

int pop(void)
{
    if (top == -1) { printf("Stack Underflow\n"); return -1; }
    return stack[top--];
}

int peek(void) { return stack[top]; }

int main(void)
{
    push(10); push(20); push(30);
    printf("Popped %d\n", pop());      /* 30 */
    push(40);
    printf("Top is %d\n", peek());     /* 40 */
    while (top != -1)
        printf("%d ", pop());          /* 40 20 10 */
    printf("\n");
    pop();                             /* underflow */
    return 0;
}
```

Output:

```text
Popped 30
Top is 40
40 20 10
Stack Underflow
```

### 2. Stack Using a Linked List

The **head** of the list is the **top**: push inserts a node at the beginning and pop deletes the first node, both in O(1). There is no fixed size, so overflow happens only when memory runs out.

```c
#include <stdio.h>
#include <stdlib.h>

struct node { int data; struct node *next; };
struct node *top = NULL;

void push(int x)
{
    struct node *n = (struct node *) malloc(sizeof(struct node));
    n->data = x;
    n->next = top;          /* new node becomes the top */
    top = n;
}

int pop(void)
{
    if (top == NULL) { printf("Stack Underflow\n"); return -1; }
    struct node *t = top;
    int x = t->data;
    top = top->next;
    free(t);
    return x;
}

int main(void)
{
    push(1); push(2); push(3);
    printf("%d ", pop());
    printf("%d ", pop());
    printf("%d\n", pop());  /* 3 2 1 */
    return 0;
}
```

Output: `3 2 1`

### 3. Queue Using an Array and the Circular Queue

**Drawback of a simple (linear) array queue:** dequeue only moves `front` forward, so the places at the beginning of the array **cannot be reused**. After some insertions and deletions, `rear` reaches the end of the array and the queue reports **overflow even though there are empty places** at the front.

**Circular queue:** the array is treated as a **circle (ring buffer)**: after the last position comes the first position again. `front` and `rear` move forward **with modulo arithmetic**, so freed places are reused.

```text
 rear  = (rear + 1) % MAX        (for enqueue)
 front = (front + 1) % MAX       (for dequeue)
```

**Conditions** (keeping a count of the elements):

1. **Empty:** count = 0.
2. **Full:** count = MAX. (Without a count, the full condition is usually written **(rear + 1) % MAX = front**, keeping one place empty.)

```c
#include <stdio.h>
#define MAX 4

int q[MAX], front = 0, count = 0;

void enqueue(int x)
{
    if (count == MAX) { printf("Queue Overflow\n"); return; }
    q[(front + count) % MAX] = x;      /* rear position */
    count++;
}

int dequeue(void)
{
    if (count == 0) { printf("Queue Underflow\n"); return -1; }
    int x = q[front];
    front = (front + 1) % MAX;
    count--;
    return x;
}

int main(void)
{
    enqueue(10); enqueue(20); enqueue(30); enqueue(40);
    enqueue(50);                                   /* overflow: queue is full */
    printf("%d ", dequeue());                      /* 10 */
    printf("%d\n", dequeue());                     /* 20 */
    enqueue(50); enqueue(60);                      /* reuse the freed places */
    while (count > 0)
        printf("%d ", dequeue());                  /* 30 40 50 60 */
    printf("\n");
    return 0;
}
```

Output:

```text
Queue Overflow
10 20
30 40 50 60
```

All circular queue operations take **O(1)** time.

**Uses of a circular queue:** CPU scheduling (round robin), memory and buffer management (for example, a buffer between a fast producer and a slow consumer), traffic-signal cycling (green → yellow → red → green) and circular playlists in media players.

### 4. Queue Using a Linked List

Keep two pointers: **front** (first node) and **rear** (last node). Enqueue adds a node after `rear`; dequeue removes the node at `front`. Both take **O(1)**, and the queue never becomes full until memory runs out.

### 5. Double-Ended Queue (Deque)

A **deque** allows **insertion and deletion at both ends** (front and rear). It can work as **both a stack and a queue**. A typical use is **palindrome checking**: characters are removed from both ends and compared.

1. **Input-restricted deque:** insertion at **one end only**, deletion at **both ends**.
2. **Output-restricted deque:** deletion at **one end only**, insertion at **both ends**.

### 6. Priority Queue

In a **priority queue**, each element has a **priority**, and the element with the **highest priority is removed first** (elements with equal priority are served in FIFO order).

1. **Ascending priority queue:** the **smallest** element (lowest number) is removed first.
2. **Descending priority queue:** the **largest** element is removed first.

**Example:** insert 7, 5, 3. An ascending priority queue deletes them in the order **3, 5, 7**; a descending priority queue deletes them in the order **7, 5, 3**.

A priority queue can be implemented with an array, a linked list, a binary search tree or, most efficiently, a **binary heap** (see [Heaps and Heap Sort](/topics/data-structures-algorithms/heaps-and-heap-sort)):

| Implementation | Peek (highest priority) | Insert | Delete |
| --- | --- | --- | --- |
| Linked list (kept in priority order) | O(1) | O(n) | O(1) |
| Binary heap | O(1) | O(log n) | O(log n) |
| Binary search tree (balanced) | O(log n); O(1) if a pointer to the highest-priority node is kept | O(log n) | O(log n) |

**Uses of a priority queue:**

1. CPU (operating system) task scheduling, interrupt handling and load balancing.
2. Network packet scheduling.
3. Dijkstra's shortest-path algorithm.
4. Data compression with Huffman coding.

Priority queues are explained in full, with a program and comparison tables, in [Priority Queue](#priority-queue).

### 7. Queue Using Two Stacks

A queue can be built from two stacks S1 and S2:

1. **Enqueue(x):** push x onto **S1**.
2. **Dequeue():** if S2 is empty, **pop every element of S1 and push it onto S2** (this reverses the order); then **pop from S2**.

Each element is moved from S1 to S2 at most once, so the operations take **O(1) amortised** time.

```c
#include <stdio.h>
#define MAX 10

int s1[MAX], t1 = -1, s2[MAX], t2 = -1;

void enqueue(int x) { s1[++t1] = x; }

int dequeue(void)
{
    if (t2 == -1)                       /* move everything from S1 to S2 */
        while (t1 != -1)
            s2[++t2] = s1[t1--];
    if (t2 == -1) { printf("Queue Underflow\n"); return -1; }
    return s2[t2--];
}

int main(void)
{
    enqueue(1); enqueue(2); enqueue(3);
    printf("%d ", dequeue());           /* 1 */
    enqueue(4);
    printf("%d ", dequeue());           /* 2 */
    printf("%d ", dequeue());           /* 3 */
    printf("%d\n", dequeue());          /* 4 */
    return 0;
}
```

Output: `1 2 3 4` (first in, first out).

### Array vs Linked-List Implementation

| Basis | Array implementation | Linked-list implementation |
| --- | --- | --- |
| Size | Fixed (static) | Grows and shrinks (dynamic) |
| Overflow | When the array is full | Only when memory runs out |
| Memory | No pointer overhead, but unused places are wasted | Extra pointer in every node |
| Speed | O(1); good cache use | O(1); allocation overhead |
| Simplicity | Simple | More complex (pointers) |

### Applications of Queues

1. **CPU scheduling** and **disk scheduling** in operating systems (processes wait in a ready queue; round robin uses a circular queue).
2. **Printer spooling** (print jobs are printed in order).
3. **Breadth-first search (BFS)** of graphs and level-order traversal of trees.
4. **Buffers** for data transfer between devices of different speeds (keyboard buffer, I/O buffers, pipes).
5. Handling requests at a server or call centre in the order they arrive.
6. The **producer–consumer** problem (a bounded buffer between processes).
7. Interrupt handling in real-time systems.

## Applications of Stack {#applications-of-stack}

1. **Function calls and recursion:** the **call stack** stores the return address, parameters and local variables of each active function; when a function returns, its record is popped (see [Recursion](/topics/data-structures-algorithms/recursion#concept-and-applications-of-recursion)).
2. **Expression conversion and evaluation:** converting **infix** expressions to **postfix** or **prefix**, and evaluating postfix expressions, in compilers and calculators (see [Prefix, Infix and Postfix Expressions](/topics/data-structures-algorithms/prefix-infix-postfix)).
3. **Parenthesis (bracket) matching:** checking whether the brackets in an expression or program are balanced.
4. **Reversing** a string, a word or a list (push all items, then pop them).
5. **Undo/redo** in editors, and the **back** button of web browsers.
6. **Backtracking:** maze solving, N-queens, and **depth-first search (DFS)** of graphs.
7. **Memory management:** allocating and freeing local (automatic) variables.
8. Problems such as next greater element and stock span.
9. **Converting a decimal number to binary:** divide by 2 repeatedly and **push** each remainder; then **pop** them all. Example: 14 → remainders 0, 1, 1, 1 (pushed in this order) → popped as **1110**.

### Example 1: Checking Balanced Parentheses

**Algorithm:** scan the expression from left to right; **push** every opening bracket; for every closing bracket, the stack must not be empty and the **popped** bracket must be of the same type. At the end, the expression is balanced only if the **stack is empty**.

```c
#include <stdio.h>
#include <string.h>

int balanced(const char *e)
{
    char st[100];
    int top = -1;
    for (int i = 0; e[i]; i++)
    {
        char c = e[i];
        if (c == '(' || c == '{' || c == '[')
            st[++top] = c;                         /* push opening bracket */
        else if (c == ')' || c == '}' || c == ']')
        {
            if (top == -1) return 0;               /* nothing to match */
            char o = st[top--];                    /* pop */
            if ((c == ')' && o != '(') || (c == '}' && o != '{') || (c == ']' && o != '['))
                return 0;                          /* wrong type */
        }
    }
    return top == -1;                              /* balanced if stack is empty */
}

int main(void)
{
    const char *tests[] = {"{a+(b*c)-[d/e]}", "(a+b))", "([)]"};
    for (int i = 0; i < 3; i++)
        printf("%-16s %s\n", tests[i], balanced(tests[i]) ? "Balanced" : "Not balanced");
    return 0;
}
```

Output:

```text
{a+(b*c)-[d/e]}  Balanced
(a+b))           Not balanced
([)]             Not balanced
```

### Example 2: Reversing a String with a Stack

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char s[] = "STACK", st[20];
    int top = -1, n = strlen(s);

    for (int i = 0; i < n; i++) st[++top] = s[i];   /* push all characters */
    for (int i = 0; i < n; i++) s[i] = st[top--];   /* pop them back */
    printf("%s\n", s);                              /* KCATS */
    return 0;
}
```

Output: `KCATS`

### Advantages and Disadvantages of Stacks

**Advantages:** push and pop are very fast (**O(1)**); simple to implement; the LIFO order is exactly what is needed for function calls, expression evaluation and backtracking.

**Disadvantages:** **only the top element** can be accessed directly (middle elements cannot be reached without popping); an array stack can **overflow**.

## Priority Queue {#priority-queue}

### Definition

**A priority queue** is a special type of queue in which every element has a priority, and elements are removed in order of priority instead of order of arrival: the element with the highest priority is removed first.

A priority queue is an **abstract data type (ADT)**: it defines the operations (insert, delete the highest-priority element, peek) but not how they are done. The priority is usually the value of the element itself; either the largest or the smallest value can be treated as the highest priority.

### Characteristics

1. Every element has a priority associated with it.
2. An element with higher priority is removed before an element with lower priority.
3. Elements with the same priority are removed in the order in which they were inserted (FIFO).
4. Elements may be inserted in any order; only deletion follows priority.

### Types of Priority Queues

There are two types of priority queues:

1. **Ascending (min) priority queue:** the **smallest** element has the highest priority and is removed first. Example: insert 7, 5, 3 → removed in the order **3, 5, 7**.
2. **Descending (max) priority queue:** the **largest** element has the highest priority and is removed first. Example: insert 7, 3, 5 → removed in the order **7, 5, 3**.

### Operations

1. **Insert (enqueue):** adds an element according to its priority.
2. **Delete (dequeue, extract-max or extract-min):** removes and returns the element with the highest priority.
3. **Peek (top):** returns the element with the highest priority without removing it.
4. **isEmpty, isFull and size:** check the state of the queue.

With a **binary max heap** (see [Heaps and Heap Sort](/topics/data-structures-algorithms/heaps-and-heap-sort#binary-heaps)):

1. **Insert:** put the new element at the end of the heap (the next free position of the complete binary tree), then move it **up** while it is larger than its parent (heapify up) — O(log n).
2. **Delete:** remove the root (the largest element), move the last element into the root, then move it **down** while it is smaller than a child, swapping with the larger child (heapify down) — O(log n).
3. **Peek:** return the root — O(1).

### Implementations

A priority queue can be implemented with:

1. **Unsorted array:** insert at the end in O(1); peek and delete must search the whole array, O(n).
2. **Sorted array:** insert must shift elements to keep the order, O(n); peek is O(1); delete is O(1) if the highest-priority element is kept at the end of the array (O(n) if it is kept at the front, because the other elements must be shifted).
3. **Sorted linked list:** insert must walk to the right position, O(n); the highest-priority element is at the head, so peek and delete are O(1). Each node holds the data, its **priority number** and a link to the next node.
4. **Binary heap:** insert and delete O(log n), peek O(1); the most common and most efficient implementation.
5. **Binary search tree:** insert and delete O(log n) and peek O(1) (if a pointer to the highest-priority node is kept) — but only for a **balanced** BST (AVL or red-black tree); an unbalanced BST can degrade to O(n).

| Implementation | Insert | Peek | Delete (highest priority) |
| --- | --- | --- | --- |
| Unsorted array | O(1) | O(n) | O(n) |
| Sorted array | O(n) | O(1) | O(1) (highest at the end) |
| Sorted linked list | O(n) | O(1) | O(1) |
| Binary heap | O(log n) | O(1) | O(log n) |
| Balanced BST | O(log n) | O(1) (with a pointer) | O(log n) |

A binary heap is preferred over a BST because it is stored in a simple array (no pointers, less memory, cache-friendly), its height is always O(log n) because it is a complete binary tree, and it can be built from n elements in O(n) time.

### Program: Priority Queue Using a Max Heap

```c tab
#include <stdio.h>

#define MAX 100

int heap[MAX];  /* max heap: the largest value (highest priority) is at heap[0] */
int size = 0;

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

/* Insert: add at the end, then move it up while it is larger than its parent. */
void insert(int value) {
    int i = size++;
    heap[i] = value;
    while (i > 0 && heap[(i - 1) / 2] < heap[i]) {
        swap(&heap[(i - 1) / 2], &heap[i]);
        i = (i - 1) / 2;
    }
}

/* Peek: the highest-priority element is the root. */
int peek(void) { return heap[0]; }

/* Delete: remove the root, put the last element there, then move it down. */
int extractMax(void) {
    int max = heap[0];
    heap[0] = heap[--size];
    int i = 0;
    while (1) {
        int left = 2 * i + 1, right = 2 * i + 2, largest = i;
        if (left < size && heap[left] > heap[largest]) largest = left;
        if (right < size && heap[right] > heap[largest]) largest = right;
        if (largest == i) break;
        swap(&heap[i], &heap[largest]);
        i = largest;
    }
    return max;
}

int main(void) {
    int values[] = {30, 10, 50, 20, 40};
    for (int k = 0; k < 5; k++) insert(values[k]);

    printf("Heap array: ");
    for (int k = 0; k < size; k++) printf("%d ", heap[k]);
    printf("\nPeek: %d\n", peek());

    printf("Deleted in priority order: ");
    while (size > 0) printf("%d ", extractMax());
    printf("\n");
    return 0;
}
```

```text tab=Output
Heap array: 50 40 30 10 20 
Peek: 50
Deleted in priority order: 50 40 30 20 10 
```

**Trace of the insertions:** 30 → [30]; 10 → [30, 10]; 50 is larger than its parent 30, so they swap → [50, 10, 30]; 20 is larger than its parent 10 → [50, 20, 30, 10]; 40 is larger than its parent 20 but smaller than 50 → [50, 40, 30, 10, 20].

### Applications of Priority Queues

1. CPU and process scheduling in operating systems.
2. Interrupt handling and load balancing in operating systems.
3. Dijkstra's shortest-path algorithm.
4. Prim's minimum spanning tree algorithm.
5. Huffman coding (data compression).
6. A* search in artificial intelligence.
7. Heap sort.
8. Event-driven simulation.
9. Finding the k-th smallest or largest element, and merging k sorted lists.

### Differences Between a Queue and a Priority Queue

| Basis | Queue | Priority queue |
| --- | --- | --- |
| Order of removal | FIFO: the element inserted first is removed first | The element with the highest priority is removed first |
| Priority | Elements have no priority | Every element has a priority |
| Insertion order in removal | Always kept | Kept only among elements of equal priority |
| Usual implementation | Circular array or linked list | Binary heap (also array, linked list or BST) |
| Insert and delete time | O(1) | O(log n) with a heap |
| Used when | Order of arrival matters (printer queue, BFS) | Importance matters (scheduling, Dijkstra's algorithm) |

### Differences Between a Priority Queue and a Heap

| Basis | Priority queue | Heap |
| --- | --- | --- |
| Type | Abstract data type: defines **what** operations are available | Concrete data structure: defines **how** the data is stored |
| Purpose | Retrieve elements by priority | Keep elements in a complete binary tree with the heap property (parent ≥ children in a max heap, ≤ in a min heap) |
| Implementation | Heap, BST, array or linked list | Usually a binary heap stored in an array |
| Operations | Insert, delete highest priority, peek | Heapify, insert, extract, build heap |
| Relationship | Usually implemented with a heap | Mainly used to implement priority queues |

## References {#references}

**TutorialsPoint**

- [Stack Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm) — accessed 2026-11-01
- [Queue Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm) — accessed 2026-11-01
- [Circular Queue Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/circular_queue_data_structure.htm) — accessed 2026-11-02
- [Data Structure – Priority Queue](https://www.tutorialspoint.com/data_structures_algorithms/priority_queue.htm) — accessed 2026-11-07

**GeeksforGeeks**

- [Difference Between Stack and Queue Data Structures](https://www.geeksforgeeks.org/dsa/difference-between-stack-and-queue-data-structures/) — accessed 2026-11-01
- [Queue Introduction](https://www.geeksforgeeks.org/dsa/introduction-to-queue-data-structure-and-algorithm-tutorials/) — accessed 2026-11-01
- [Implementation of Circular Queue Using Array](https://www.geeksforgeeks.org/dsa/introduction-to-circular-queue/) — accessed 2026-11-01
- [Different Types of Queues and its Applications](https://www.geeksforgeeks.org/dsa/different-types-of-queues-and-its-applications/) — accessed 2026-11-01
- [Applications of Stack](https://www.geeksforgeeks.org/dsa/applications-advantages-and-disadvantages-of-stack/) — accessed 2026-11-01
- [Introduction to Priority Queue](https://www.geeksforgeeks.org/dsa/priority-queue-set-1-introduction/) — accessed 2026-11-07
- [How to implement Priority Queue – using Heap or Array?](https://www.geeksforgeeks.org/dsa/how-to-implement-priority-queue-using-heap-or-array/) — accessed 2026-11-07
- [Priority Queue Using Array](https://www.geeksforgeeks.org/dsa/priority-queue-using-array/) — accessed 2026-11-07
- [Applications of Priority Queue](https://www.geeksforgeeks.org/dsa/applications-priority-queue/) — accessed 2026-11-07
- [Why is Binary Heap Preferred over BST for Priority Queue?](https://www.geeksforgeeks.org/dsa/why-is-binary-heap-preferred-over-bst-for-priority-queue/) — accessed 2026-11-07
- [Difference between PriorityQueue and Queue Implementation in Java](https://www.geeksforgeeks.org/java/difference-between-priorityqueue-and-queue-implementation-in-java/) — accessed 2026-11-07
- [Heap Data Structure Interview Questions](https://www.geeksforgeeks.org/dsa/commonly-asked-data-structure-interview-questions-on-heap-data-structure/) — accessed 2026-11-07 (priority queue vs heap)

**TpointTech**

- [Application of Stack in Data Structure](https://www.tpointtech.com/application-of-stack-in-data-structure) — accessed 2026-11-02
- [Types of Queues](https://www.tpointtech.com/types-of-queue-in-data-structure) — accessed 2026-11-02
- [Application of Queue in Data Structure](https://www.tpointtech.com/application-of-queue-in-data-structure) — accessed 2026-11-02
- [Types of Queues in Data Structure](https://tpointtech.com/ds-types-of-queues) — accessed 2026-11-01
- [Priority Queue in Data Structure](https://www.tpointtech.com/priority-queue) — accessed 2026-11-07
- [Why is Binary Heap Preferred over BST for Priority Queue](https://www.tpointtech.com/why-is-binary-heap-preferred-over-bst-for-priority-queue) — accessed 2026-11-07

**Programiz**

- [Stack Data Structure](https://www.programiz.com/dsa/stack) — accessed 2026-11-01
- [Queue Data Structure](https://www.programiz.com/dsa/queue) — accessed 2026-11-01
- [Circular Queue Data Structure](https://www.programiz.com/dsa/circular-queue) — accessed 2026-11-01
- [Deque Data Structure](https://www.programiz.com/dsa/deque) — accessed 2026-11-01
- [Priority Queue](https://www.programiz.com/dsa/priority-queue) — accessed 2026-11-01
- [Types of Queues](https://www.programiz.com/dsa/types-of-queue) — accessed 2026-11-07

Issues found on the reference websites (priority queue) and how they were resolved:

1. TpointTech's priority-queue page says equal priorities are served in FIFO order, but its linked-list example serves 15 before 12 at the same priority; FIFO order for equal priorities is used here, as stated by Programiz and TpointTech's "Types of Queues" page.
2. TpointTech and Programiz give O(log n) for a BST-based priority queue without saying that the tree must be balanced; GeeksforGeeks and TpointTech's heap-vs-BST page show that an unbalanced BST can take O(n), so the table says "balanced BST".
3. GeeksforGeeks' "using Heap or Array" page calls its array sorted while its code uses an unsorted array; the unsorted-array costs were taken from GeeksforGeeks' "Priority Queue Using Array" page.
4. TpointTech's heap-vs-BST page contradicts itself on which uses less memory; a heap needs no pointers (GeeksforGeeks), so it uses less memory.
