---
description: Stacks (LIFO) and queues (FIFO) - structure and operations with overflow and underflow, array and linked-list implementations, circular queue, deque, priority queue, queue using two stacks, and the applications of stacks, with C programs.
updated: 2026-11-02
---

## Structure and Operations of Stacks and Queues {#structure-and-operations-of-stacks-and-queues}

### Stack

**Definition:** a stack is a **linear data structure** in which **insertion and deletion are done at only one end**, called the **top**. The element inserted **last is removed first**, so a stack follows the **LIFO (Last In, First Out)** principle (also called FILO, first in last out). A stack is an **abstract data type**; it can be implemented with an **array** or a **linked list**.

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

**Definition:** a queue is a **linear data structure** in which **insertion is done at one end**, called the **rear (tail)**, and **deletion at the other end**, called the **front (head)**. The element inserted **first is removed first**, so a queue follows the **FIFO (First In, First Out)** principle.

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
 front                 rear          front           rear
   ↓                    ↓              ↓               ↓
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

## References {#references}

**TutorialsPoint**

- [Stack Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm) — accessed 2026-11-01
- [Queue Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm) — accessed 2026-11-01
- [Circular Queue Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/circular_queue_data_structure.htm) — accessed 2026-11-02

**GeeksforGeeks**

- [Difference Between Stack and Queue Data Structures](https://www.geeksforgeeks.org/dsa/difference-between-stack-and-queue-data-structures/) — accessed 2026-11-01
- [Queue Introduction](https://www.geeksforgeeks.org/dsa/introduction-to-queue-data-structure-and-algorithm-tutorials/) — accessed 2026-11-01
- [Implementation of Circular Queue Using Array](https://www.geeksforgeeks.org/dsa/introduction-to-circular-queue/) — accessed 2026-11-01
- [Different Types of Queues and its Applications](https://www.geeksforgeeks.org/dsa/different-types-of-queues-and-its-applications/) — accessed 2026-11-01
- [Applications of Stack](https://www.geeksforgeeks.org/dsa/applications-advantages-and-disadvantages-of-stack/) — accessed 2026-11-01

**TpointTech**

- [Application of Stack in Data Structure](https://www.tpointtech.com/application-of-stack-in-data-structure) — accessed 2026-11-02
- [Types of Queues](https://www.tpointtech.com/types-of-queue-in-data-structure) — accessed 2026-11-02
- [Application of Queue in Data Structure](https://www.tpointtech.com/application-of-queue-in-data-structure) — accessed 2026-11-02
- [Types of Queues in Data Structure](https://tpointtech.com/ds-types-of-queues) — accessed 2026-11-01

**Programiz**

- [Stack Data Structure](https://www.programiz.com/dsa/stack) — accessed 2026-11-01
- [Queue Data Structure](https://www.programiz.com/dsa/queue) — accessed 2026-11-01
- [Circular Queue Data Structure](https://www.programiz.com/dsa/circular-queue) — accessed 2026-11-01
- [Deque Data Structure](https://www.programiz.com/dsa/deque) — accessed 2026-11-01
- [Priority Queue](https://www.programiz.com/dsa/priority-queue) — accessed 2026-11-01

**IT Job QnS**

- [Data Structure](https://it.jobqns.com/data-structure/) — accessed 2026-11-01
