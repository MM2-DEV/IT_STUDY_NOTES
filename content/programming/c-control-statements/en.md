---
description: C conditional statements (if, if-else, nested if, else-if ladder, switch, the conditional operator and goto) and looping statements (while, do-while, for, nested loops, break, continue and infinite loops), with example programs.
updated: 2026-11-01
---

**Control statements:** normally the statements of a C program run one after another (sequence). **Control statements** change this order: they decide **which statements run** (selection) and **how many times** they run (iteration), or **jump** to another part of the program.

1. **Conditional (selection) statements:** `if`, `if-else`, nested `if`, `else-if` ladder, `switch`
2. **Looping (iteration) statements:** `while`, `do-while`, `for`
3. **Jump statements:** `break`, `continue`, `goto`, `return`

## Conditional Statements {#conditional-statements}

**Definition:** conditional (decision-making) statements **test a condition** and execute different statements depending on whether the condition is **true (non-zero)** or **false (zero)**.

### 1. if Statement

Executes a statement (or block) **only if the condition is true**; otherwise it is skipped.

```text
 if (condition)
 {
     statements;
 }
```

```c
#include <stdio.h>

int main(void)
{
    int marks = 75;

    if (marks >= 33)
        printf("Passed\n");

    return 0;
}
```

Output: `Passed`

### 2. if-else Statement

Executes one block if the condition is **true** and another block if it is **false**.

```text
 if (condition)
 {
     statements-1;      /* condition true  */
 }
 else
 {
     statements-2;      /* condition false */
 }
```

```c
#include <stdio.h>

int main(void)
{
    int n = 7;

    if (n % 2 == 0)
        printf("%d is even\n", n);
    else
        printf("%d is odd\n", n);

    return 0;
}
```

Output: `7 is odd`

### 3. Nested if Statement

An `if` or `if-else` **inside another** `if` or `else`. It is used when a second condition must be checked only after the first one.

```c
#include <stdio.h>

int main(void)
{
    int a = 7, b = 12, c = 5;

    if (a > b)
    {
        if (a > c)
            printf("Largest = %d\n", a);
        else
            printf("Largest = %d\n", c);
    }
    else
    {
        if (b > c)
            printf("Largest = %d\n", b);
        else
            printf("Largest = %d\n", c);
    }
    return 0;
}
```

Output: `Largest = 12`

**Dangling else:** an `else` always belongs to the **nearest unmatched `if`** before it. Braces `{ }` make the intended pairing clear.

### 4. else-if Ladder

Tests **several conditions one after another**; the block of the **first true condition** runs, and the rest are skipped. The final `else` runs if no condition is true.

```c
#include <stdio.h>

int main(void)
{
    int marks = 72;

    if (marks >= 80)
        printf("Grade: A+\n");
    else if (marks >= 70)
        printf("Grade: A\n");
    else if (marks >= 60)
        printf("Grade: A-\n");
    else if (marks >= 33)
        printf("Grade: Pass\n");
    else
        printf("Grade: F\n");

    return 0;
}
```

Output: `Grade: A`

### 5. switch Statement

Selects **one of many blocks** by comparing the value of an expression with a list of **constant case values**.

```text
 switch (expression)
 {
     case constant1:
         statements;
         break;
     case constant2:
         statements;
         break;
     ...
     default:
         statements;
 }
```

```c
#include <stdio.h>

int main(void)
{
    int day = 3;

    switch (day)
    {
        case 1:  printf("Saturday\n");  break;
        case 2:  printf("Sunday\n");    break;
        case 3:  printf("Monday\n");    break;
        default: printf("Other day\n");
    }
    return 0;
}
```

Output: `Monday`

**Rules of the switch statement:**

1. The expression must give an **integer or character** value (not `float` or a string).
2. Each `case` label must be a **constant** (or constant expression), and no two labels may be equal.
3. **`break`** ends the `switch`. **Without `break`, execution "falls through"** into the following cases until a `break` or the end of the `switch` is reached.
4. **`default`** is optional; it runs when no case matches.
5. Several cases can share one block: `case 'a': case 'e': … printf("Vowel");`.

**Fall-through example:**

```c
#include <stdio.h>

int main(void)
{
    int n = 2;

    switch (n)
    {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
    }
    printf("\n");
    return 0;
}
```

Output: `Two Three ` (there is no `break`, so case 3 also runs).

### Differences Between if-else and switch

| Basis | if-else (else-if ladder) | switch |
| --- | --- | --- |
| Test | Any condition (relational, logical, ranges) | Only equality with constant values |
| Data types | Any type, including `float` | Integer and character only |
| Number of alternatives | Suitable for a few | Suitable for many fixed values |
| Readability for many choices | Becomes long | Clearer |
| Default case | Final `else` | `default` |
| Fall-through | Not possible | Possible when `break` is omitted |
| How it decides | Tests conditions one after another (else-if chain) | Compares one value with a list of constants |
| Best for | Complex conditions | Many choices that depend on one value |

### 6. Conditional (Ternary) Operator

A short form of a simple `if-else` that gives a value:

```c
max = (a > b) ? a : b;
```

### 7. goto Statement

Transfers control **unconditionally** to a **labelled** statement in the same function.

```text
 goto label;
 ...
 label: statement;
```

Using `goto` makes programs hard to read and maintain ("spaghetti code"), so it is avoided in [structured programming](/topics/programming/program-design-techniques#structured-program-design).

## Looping Statements {#looping-statements}

**Definition:** a loop (iteration statement) **repeats a block of statements** as long as a condition is true. Every loop has:

1. **Initialization** of a loop control variable
2. A **condition** (test) that decides whether to continue
3. An **update** (increment or decrement) of the control variable
4. The **body**: the statements to be repeated

**Types of loops:**

1. **Entry-controlled loops:** the condition is tested **before** the body (`while`, `for`). The body may run **zero** times.
2. **Exit-controlled loop:** the condition is tested **after** the body (`do-while`). The body runs **at least once**.

### 1. while Loop

```text
 initialization;
 while (condition)
 {
     statements;
     update;
 }
```

```c
#include <stdio.h>

int main(void)
{
    int i = 1, sum = 0;

    while (i <= 10)
    {
        sum = sum + i;
        i++;
    }
    printf("Sum = %d\n", sum);
    return 0;
}
```

Output: `Sum = 55`

### 2. do-while Loop

```text
 do
 {
     statements;
 } while (condition);      /* note the semicolon */
```

The body runs first, then the condition is tested, so the body runs **at least once** even if the condition is false at the start.

```c
#include <stdio.h>

int main(void)
{
    int i = 10;

    do
    {
        printf("i = %d\n", i);
        i++;
    } while (i < 5);
    return 0;
}
```

Output: `i = 10` (printed once, although `i < 5` is false).

### 3. for Loop

The initialization, condition and update are written together in one line:

```text
 for (initialization; condition; update)
 {
     statements;
 }
```

**Order of execution:** initialization (once) → condition → body → update → condition → body → update … until the condition becomes false.

```c
#include <stdio.h>

int main(void)
{
    int n = 5, i;
    long fact = 1;

    for (i = 1; i <= n; i++)
        fact = fact * i;

    printf("%d! = %ld\n", n, fact);
    return 0;
}
```

Output: `5! = 120`

### Differences Between while, do-while and for

| Basis | while | do-while | for |
| --- | --- | --- | --- |
| Type | Entry-controlled | Exit-controlled | Entry-controlled |
| Condition tested | Before the body | After the body | Before the body |
| Minimum number of runs | 0 | 1 | 0 |
| Semicolon after the condition | No | Yes: `while (condition);` | No |
| Initialization and update | Written separately | Written separately | In one line with the condition |
| Update (increment) | Inside the body | Inside the body | In the loop header, after each repetition |
| Scope of a variable declared in the loop | — | — | Can be limited to the loop (`for (int i = 0; …)`) |
| Best used when | The number of repetitions is not known in advance | The body must run at least once (for example, a menu) | The number of repetitions is known |

### 4. Nested Loops

A loop **inside another loop**. For each repetition of the outer loop, the inner loop runs completely.

```c
#include <stdio.h>

int main(void)
{
    int i, j;

    for (i = 1; i <= 4; i++)
    {
        for (j = 1; j <= i; j++)
            printf("* ");
        printf("\n");
    }
    return 0;
}
```

Output:

```text
*
* *
* * *
* * * *
```

### Jump Statements Used with Loops

1. **break:** **terminates the loop** (or `switch`) immediately, and control passes to the statement after the loop.
2. **continue:** **skips the rest of the current repetition** and goes to the next one (to the condition in `while`/`do-while`, or to the update in `for`).
3. **goto:** jumps to a labelled statement (can be used to leave nested loops, but should be avoided).
4. **return:** ends the function, and so also the loop.

```c
#include <stdio.h>

int main(void)
{
    int i;

    for (i = 1; i <= 10; i++)
    {
        if (i == 3)
            continue;      /* skip 3 */
        if (i == 6)
            break;         /* stop at 6 */
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

Output: `1 2 4 5`

**Differences between break and continue:**

| Basis | break | continue |
| --- | --- | --- |
| Effect | Ends the whole loop | Skips only the current repetition |
| Control goes to | The statement after the loop | The next repetition of the loop |
| Used in | Loops and `switch` | Loops only |
| Remaining repetitions | All skipped | The following repetitions still run |

### Infinite Loops

A loop whose condition **never becomes false** runs forever. It is written on purpose with `for (;;)` or `while (1)` and ended with `break` or `return`; an infinite loop caused by a mistake (for example, forgetting the update `i++`) is a logical error. A running program can be stopped with **Ctrl + C**.

### Example: Checking a Prime Number

```c
#include <stdio.h>

int main(void)
{
    int n = 29, i, is_prime = 1;

    if (n < 2)
        is_prime = 0;

    for (i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
        {
            is_prime = 0;
            break;
        }
    }

    if (is_prime)
        printf("%d is prime\n", n);
    else
        printf("%d is not prime\n", n);
    return 0;
}
```

Output: `29 is prime` (only divisors up to √n need to be tested).

## References {#references}

**GeeksforGeeks**

- [Difference between break and continue statement in C](https://www.geeksforgeeks.org/c/difference-between-break-and-continue-statement-in-c/) — accessed 2026-11-01
- [Difference between For, While and Do-While Loop in Programming](https://www.geeksforgeeks.org/dsa/difference-between-for-while-and-do-while-loop-in-programming/) — accessed 2026-11-01
- [Difference Between if-else and switch in C](https://www.geeksforgeeks.org/cpp/difference-between-if-else-and-switch-in-c/) — accessed 2026-11-01

**TutorialsPoint**

- [C – Decision Making](https://www.tutorialspoint.com/cprogramming/c_decision_making.htm) — accessed 2026-11-01
- [C – Loops](https://www.tutorialspoint.com/cprogramming/c_loops.htm) — accessed 2026-11-01

**Additional sources**

- [Statements](https://en.cppreference.com/w/c/language/statements) — cppreference.com, accessed 2026-11-01
