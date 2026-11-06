---
description: Recursion - definition, base case and recursive case, the call stack and activation records, types of recursion (direct, indirect, tail, head, tree and nested), applications, recursion versus iteration, the recursive factorial with its trace and analysis, and the Tower of Hanoi algorithm with its 2ⁿ − 1 moves.
updated: 2026-11-01
---

## Concept and Applications of Recursion {#concept-and-applications-of-recursion}

**Definition:** recursion is a technique in which a **function calls itself**, either **directly** or **indirectly** (through another function), to solve a problem.

A function that does this is a **recursive function**. Each call solves a **smaller instance of the same problem**, until the problem becomes simple enough to solve directly. (For writing recursive functions in C, see [C: Functions](/topics/programming/c-functions).)

### Properties of a Recursive Function

Every correct recursive function must have:

1. **Base case (base criterion, terminating condition):** the simplest case, whose answer is known **without another recursive call**; it **stops** the recursion.
2. **Recursive case (progressive approach):** the function calls itself with a **smaller (simpler) input**, so that **each call moves closer to the base case**.

If the base case is missing or is never reached, the function keeps calling itself until the memory for calls is exhausted: a **stack overflow** error.

### How Recursion Works: The Call Stack

Each time a function is called, the system creates an **activation record (stack frame)** on the **call stack**. It holds the function's **parameters, local variables and return address**. When a function calls itself:

1. The current call is **paused**, and its activation record stays on the stack.
2. A **new activation record** is pushed for the new call (each call has its own copy of the local variables).
3. When the **base case** is reached, the calls **return one by one in reverse order** (last in, first out), and each paused call resumes and uses the result of the call it made.

So recursion is implemented with a **stack** (see [Stacks and Queues](/topics/data-structures-algorithms/stacks-and-queues)). The **space complexity** of a recursive function is at least proportional to the **maximum depth** of the recursion.

### Types of Recursion

1. **Direct recursion:** a function **calls itself** directly.
2. **Indirect recursion:** a function calls **another function**, which (directly or through others) calls the first function again: A calls B, and B calls A.
3. **Tail recursion:** the recursive call is the **last action** of the function; nothing remains to be done after it returns. (Tail-recursive functions can easily be turned into loops.)
4. **Head (non-tail) recursion:** the recursive call comes **first** (or work remains after it returns); the processing is done while the calls return.
5. **Linear recursion:** the function makes **one** recursive call each time (for example, factorial).
6. **Tree recursion:** the function makes **more than one** recursive call each time (for example, Fibonacci: fib(n − 1) + fib(n − 2)), so the calls form a tree.
7. **Nested recursion:** a recursive call is passed as an **argument** to another recursive call, for example f(n) = f(f(n + 11)).

```c
#include <stdio.h>

void tail(int n)                 /* tail recursion: prints n, n-1, ..., 1 */
{
    if (n == 0) return;
    printf("%d ", n);
    tail(n - 1);                 /* last action */
}

void head(int n)                 /* head recursion: prints 1, 2, ..., n */
{
    if (n == 0) return;
    head(n - 1);                 /* first action */
    printf("%d ", n);
}

int main(void)
{
    tail(3); printf("\n");       /* 3 2 1 */
    head(3); printf("\n");       /* 1 2 3 */
    return 0;
}
```

Output:

```text
3 2 1
1 2 3
```

### Applications of Recursion

1. **Mathematical functions** defined recursively: factorial, Fibonacci numbers, GCD, power (xⁿ = x · xⁿ⁻¹).
2. **Tower of Hanoi** (see [below](#tower-of-hanoi)).
3. **Tree traversals** (preorder, inorder, postorder) and **graph traversal** (depth-first search).
4. **Divide and conquer** algorithms: **binary search, merge sort, quick sort**.
5. **Backtracking** problems (N-queens, maze solving, generating permutations).
6. Evaluating expressions and **parsing** in compilers.
7. **Dynamic programming** with memoisation, and generating **fractals**.

### Advantages and Disadvantages of Recursion

**Advantages:**

1. **Short, clear and elegant code** for problems that are naturally recursive (trees, Tower of Hanoi).
2. Reduces the problem to simpler sub-problems, matching the mathematical definition.
3. Basis of divide and conquer, backtracking and dynamic programming.

**Disadvantages:**

1. **More memory:** every pending call occupies stack space.
2. **Slower:** the overhead of many function calls and returns.
3. Risk of **stack overflow** for deep recursion or a missing base case.
4. **Harder to trace and debug**.
5. Tree recursion may **repeat the same work** many times (plain recursive Fibonacci takes exponential time).

### Recursion vs Iteration

Every recursive algorithm can be rewritten iteratively (using loops, and sometimes an explicit stack), and every iterative algorithm can be written recursively.

| Basis | Recursion | Iteration |
| --- | --- | --- |
| Method | A function calls itself | A loop repeats statements |
| Termination | Base case is reached | Loop condition becomes false |
| Memory | More (a stack frame for every call) | Less |
| Speed | Slower (call overhead) | Faster |
| Code | Usually shorter and clearer for recursive problems | Usually longer for such problems |
| If termination fails | Stack overflow | Infinite loop |
| Suited for | Trees, divide and conquer, Tower of Hanoi | Simple repetition, counting, searching |

## Factorial {#factorial}

**Definition:** the factorial of a non-negative integer n, written **n!**, is the product of all positive integers from 1 to n:

```text
 n! = n × (n − 1) × (n − 2) × … × 2 × 1,     and  0! = 1
```

For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.

**Recursive definition:**

```text
 n! = 1               if n = 0 or n = 1     (base case)
 n! = n × (n − 1)!    if n > 1              (recursive case)
```

### Recursive Algorithm

```text
 Algorithm FACT(n)
 1. if n ≤ 1 then return 1
 2. else return n × FACT(n − 1)
```

### Program in C (Recursive and Iterative)

```c
#include <stdio.h>

long factRecursive(int n)
{
    if (n <= 1)                       /* base case */
        return 1;
    return n * factRecursive(n - 1);  /* recursive case */
}

long factIterative(int n)
{
    long f = 1;
    for (int i = 2; i <= n; i++)
        f *= i;
    return f;
}

int main(void)
{
    printf("5! = %ld (recursive), %ld (iterative)\n", factRecursive(5), factIterative(5));
    printf("10! = %ld\n", factRecursive(10));
    return 0;
}
```

Output:

```text
5! = 120 (recursive), 120 (iterative)
10! = 3628800
```

### Trace of FACT(5)

The calls go down to the base case, then the results are multiplied on the way back:

```text
 FACT(5) = 5 × FACT(4)                       ┐
           FACT(4) = 4 × FACT(3)             │ calls are pushed
                     FACT(3) = 3 × FACT(2)   │ onto the stack
                               FACT(2) = 2 × FACT(1)
                                             FACT(1) = 1      ← base case
                               FACT(2) = 2 × 1 = 2            ┐
                     FACT(3) = 3 × 2 = 6                      │ calls return
           FACT(4) = 4 × 6 = 24                               │ (popped)
 FACT(5) = 5 × 24 = 120                                       ┘
```

| Call | Waits for | Returns |
| --- | --- | --- |
| FACT(5) | FACT(4) | 5 × 24 = 120 |
| FACT(4) | FACT(3) | 4 × 6 = 24 |
| FACT(3) | FACT(2) | 3 × 2 = 6 |
| FACT(2) | FACT(1) | 2 × 1 = 2 |
| FACT(1) | — (base case) | 1 |

### Analysis

1. **Recurrence relation:** T(n) = T(n − 1) + c (one multiplication per call), with T(1) = c. So T(n) = c × n, which is **O(n)** time.
2. **Space:** n activation records are on the stack at the deepest point, so **O(n)** space for the recursive version; the iterative version uses **O(1)** extra space.
3. **Limit:** factorials grow very fast; 13! = 6,227,020,800 already exceeds the range of a 32-bit `int`, so `long` (or larger) types are needed.

## Tower of Hanoi {#tower-of-hanoi}

**The Tower of Hanoi** is a mathematical puzzle in which a stack of n discs of different sizes must be moved from one peg to another, using a third peg, by moving one disc at a time and never placing a larger disc on a smaller one.

**The problem:** there are **three pegs (towers)**, say **A (source)**, **B (auxiliary)** and **C (destination)**, and **n discs** of different sizes stacked on peg A, the **largest at the bottom** and the smallest at the top. The task is to **move all the discs from A to C**, using B, following three rules:

1. **Only one disc** can be moved at a time.
2. Only the **top disc** of a peg can be moved (placed on top of another peg).
3. A **larger disc must never be placed on a smaller disc**.

![Tower of Hanoi with three discs on peg A and two empty pegs B and C](/diagrams/data-structures-algorithms/tower-of-hanoi.svg)

### Recursive Solution

To move n discs from A to C using B:

1. **Move the top n − 1 discs** from A to **B** (using C as the auxiliary).
2. **Move the largest disc** (disc n) from A to **C**.
3. **Move the n − 1 discs** from B to **C** (using A as the auxiliary).

**Base case:** if n = 1, move the single disc directly from the source to the destination.

```text
 Algorithm HANOI(n, source, auxiliary, destination)
 1. if n = 1 then
 2.     move disc 1 from source to destination
 3.     return
 4. HANOI(n − 1, source, destination, auxiliary)
 5. move disc n from source to destination
 6. HANOI(n − 1, auxiliary, source, destination)
```

### Program in C

```c
#include <stdio.h>

int moves = 0;

void hanoi(int n, char from, char aux, char to)
{
    if (n == 1)
    {
        printf("Move disc 1 from %c to %c\n", from, to);
        moves++;
        return;
    }
    hanoi(n - 1, from, to, aux);                        /* step 1 */
    printf("Move disc %d from %c to %c\n", n, from, to);  /* step 2 */
    moves++;
    hanoi(n - 1, aux, from, to);                        /* step 3 */
}

int main(void)
{
    hanoi(3, 'A', 'B', 'C');
    printf("Total moves = %d\n", moves);
    return 0;
}
```

Output (n = 3):

```text
Move disc 1 from A to C
Move disc 2 from A to B
Move disc 1 from C to B
Move disc 3 from A to C
Move disc 1 from B to A
Move disc 2 from B to C
Move disc 1 from A to C
Total moves = 7
```

### Number of Moves

Let T(n) be the number of moves for n discs. Moving n discs needs the moves for n − 1 discs twice, plus one move of the largest disc:

```text
 T(1) = 1
 T(n) = 2T(n − 1) + 1
```

Solving the recurrence:

```text
 T(n) = 2T(n − 1) + 1
      = 2[2T(n − 2) + 1] + 1      = 2²T(n − 2) + 2 + 1
      = 2³T(n − 3) + 2² + 2 + 1
      …
      = 2ⁿ⁻¹T(1) + 2ⁿ⁻² + … + 2 + 1
      = 2ⁿ⁻¹ + 2ⁿ⁻² + … + 2 + 1   = 2ⁿ − 1
```

**The minimum number of moves for n discs is 2ⁿ − 1.**

| Discs (n) | 1 | 2 | 3 | 4 | 5 | 10 | 64 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Moves (2ⁿ − 1) | 1 | 3 | 7 | 15 | 31 | 1,023 | 18,446,744,073,709,551,615 |

With 64 discs and one move every second, the moves would take about 5.8 × 10¹¹ years.

### Complexity

1. **Time complexity:** **O(2ⁿ)** (exponential), since the number of moves is 2ⁿ − 1.
2. **Space complexity:** **O(n)**, for the recursion stack (the depth of recursion is n).

The Tower of Hanoi shows the power of recursion: a problem that looks complex has a very short recursive solution, while an iterative solution is much harder to write.

## References {#references}

**TutorialsPoint**

- [Recursion Basics](https://www.tutorialspoint.com/data_structures_algorithms/recursion_basics.htm) — accessed 2026-11-01
- [Tower of Hanoi Using Recursion](https://www.tutorialspoint.com/data_structures_algorithms/tower_of_hanoi.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Introduction to Recursion](https://www.geeksforgeeks.org/dsa/introduction-to-recursion-2/) — accessed 2026-11-01
- [Types of Recursions](https://www.geeksforgeeks.org/dsa/types-of-recursions/) — accessed 2026-11-01
- [Difference between Recursion and Iteration](https://www.geeksforgeeks.org/dsa/difference-between-recursion-and-iteration/) — accessed 2026-11-01

**TpointTech**

- [Recursive Algorithm](https://www.tpointtech.com/recursive-algorithm) — accessed 2026-11-01

**Programiz**

- [C Recursion](https://www.programiz.com/c-programming/c-recursion) — accessed 2026-11-02
