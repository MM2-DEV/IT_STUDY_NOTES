---
description: C functions - library and user-defined functions, prototype, definition and call, the four categories of functions, actual and formal parameters, call by value and call by reference, recursion, and the storage classes auto, register, static and extern.
updated: 2026-11-04
---

### Function

**Definition:** a function is a **self-contained, named block of statements that performs a specific task**.

It can receive values (**arguments**), process them and **return a result**. Every C program has at least one function, **`main()`**, where execution begins.

**Advantages of functions:**

1. **Modularity:** a large program is divided into small, manageable parts (see [Modular Program Design](/topics/programming/program-design-techniques#modular-program-design)).
2. **Reusability:** a function is written once and **called many times**, from different places or programs.
3. **Avoids repetition** of the same code, so programs are **shorter**.
4. **Easier to test, debug and maintain**: each function can be checked separately.
5. **Teamwork:** different programmers can write different functions.

### Types of Functions

1. **Library (built-in) functions:** predefined functions supplied with the compiler and declared in **header files**. Examples:
   1. `printf()`, `scanf()`: `stdio.h`
   2. `strlen()`, `strcpy()`: `string.h`
   3. `sqrt()`, `pow()`, `sin()`: `math.h`
   4. `malloc()`, `free()`, `abs()`: `stdlib.h`
2. **User-defined functions:** functions written by the programmer for a particular task, such as `area()` or `swap()`.

### Differences Between Library Function and User-Defined Function

**Library function:** a library function (also called a built-in or predefined function) is a function that is **already written and supplied with the C compiler** in the standard library; its prototype is declared in a **header file**, which must be included before the function is used.

Examples: `printf()`, `scanf()`, `sqrt()`, `strlen()`.

**User-defined function:** a user-defined function is a function that the **programmer writes** for a particular task of the program, by declaring, defining and calling it.

Examples: `sum()`, `square()`, `swap()`. (`main()` itself is a user-defined function.)

```c
#include <stdio.h>
#include <math.h>              /* header of the library function sqrt() */

int square(int n)              /* user-defined function */
{
    return n * n;
}

int main(void)
{
    printf("square(5) = %d\n", square(5));       /* user-defined */
    printf("sqrt(25)  = %.1f\n", sqrt(25.0));    /* library */
    return 0;
}
```

Output (compile with `-lm` on Linux, to link the mathematics library):

```text
square(5) = 25
sqrt(25)  = 5.0
```

| Basis | Library function | User-defined function |
| --- | --- | --- |
| Written by | The compiler developers (part of the C standard library) | The programmer |
| Availability | Ready to use; no code has to be written | The programmer must write its definition before use |
| Declaration (prototype) | In a header file (`stdio.h`, `math.h`, `string.h` …) | In the program itself |
| Header file needed | Yes, the matching header must be included | No header needed (its prototype is in the program) |
| Where stored | In library files, already compiled | In the program's own source file |
| Name | Fixed; cannot be changed | Chosen by the programmer |
| Code can be changed | No; its working is fixed | Yes; the programmer can modify it at any time |
| Purpose | General, common tasks (input/output, mathematics, strings) | Tasks specific to the program |
| Reliability | Well tested and optimized | Depends on the programmer |
| Portability | Same behaviour on every standard C compiler | Depends on how it is written |
| Examples | `printf()`, `scanf()`, `sqrt()`, `pow()`, `strlen()`, `strcpy()` | `sum()`, `square()`, `swap()`, `main()` |

### Parts of a User-Defined Function

```c
#include <stdio.h>

int max(int a, int b);            /* 1. Declaration (prototype) */

int main(void)
{
    int x = 12, y = 30;
    int m = max(x, y);            /* 2. Function call: x, y are actual arguments */
    printf("Maximum = %d\n", m);
    return 0;
}

int max(int a, int b)             /* 3. Definition: a, b are formal parameters */
{
    if (a > b)
        return a;                 /* 4. return statement */
    return b;
}
```

Output: `Maximum = 30`

1. **Function declaration (prototype):** tells the compiler the function's **name, return type and the types of its parameters**, before it is used. It ends with a semicolon. Parameter names are optional: `int max(int, int);`.
2. **Function call:** transfers control to the function, passing the **actual arguments**. The number and types of arguments must match the parameters.
3. **Function definition:** the actual code of the function: the **header** (return type, name, parameter list) and the **body** in braces.
4. **return statement:** ends the function and sends a value back to the caller. A function of type **`void`** returns no value.

**General form of a definition:**

```text
 return_type function_name(parameter list)
 {
     local declarations;
     statements;
     return value;
 }
```

### Types of Parameters: Actual and Formal

| Basis | Actual parameters (arguments) | Formal parameters |
| --- | --- | --- |
| Where | In the **function call** | In the **function definition** (header) |
| What they are | The values or variables **passed** to the function | Variables that **receive** those values |
| Example (above) | `x`, `y` in `max(x, y)` | `a`, `b` in `int max(int a, int b)` |
| Lifetime | Belong to the calling function | Local to the called function; exist only while it runs |

### Categories of Functions (by Arguments and Return Value)

1. **No arguments, no return value:** `void greet(void)` — only does a task, such as printing a message.
2. **Arguments, no return value:** `void printSquare(int n)` — receives data but returns nothing.
3. **No arguments, with a return value:** `int readNumber(void)` — returns a value, for example one read from the keyboard.
4. **Arguments and a return value:** `int max(int a, int b)` — receives data and returns a result (the most useful form).

### Parameter-Passing Methods: Call by Value and Call by Reference

Arguments are passed to a function in two ways:

**1. Call by value:** a **copy of the value** of each actual argument is passed to the formal parameter. Changes made to the parameter inside the function **do not affect** the caller's variable. This is the **default** way of passing arguments in C.

**2. Call by reference:** the **address** of the argument is passed (the parameter is a pointer). The function works on the **original variable**, so changes **do affect** the caller's variable. (See [Pointers](/topics/programming/c-pointers).)

```c
#include <stdio.h>

void swapByValue(int a, int b)
{
    int t = a; a = b; b = t;          /* swaps only the copies */
}

void swapByReference(int *a, int *b)
{
    int t = *a; *a = *b; *b = t;      /* swaps the original variables */
}

int main(void)
{
    int x = 5, y = 9;

    swapByValue(x, y);
    printf("After call by value:     x = %d, y = %d\n", x, y);
    swapByReference(&x, &y);
    printf("After call by reference: x = %d, y = %d\n", x, y);
    return 0;
}
```

Output:

```text
After call by value:     x = 5, y = 9
After call by reference: x = 9, y = 5
```

| Basis | Call by value | Call by reference |
| --- | --- | --- |
| What is passed | A **copy** of the value | The **address** of the variable |
| Parameters | Ordinary variables | Pointers |
| Effect on the original | Original **does not change** | Original **can change** |
| Memory | Separate copies are made | No copy; the same memory is used |
| Safety | Safer (original is protected) | Original can be changed by mistake |
| Function call | `swap(x, y)` | `swap(&x, &y)` |
| Function header | `void swap(int a, int b)` | `void swap(int *a, int *b)` |
| When to use | To protect the original data | To modify the original data (or return several values) |
| Actual and formal parameters | Stored at **different** memory locations | Refer to the **same** memory location |
| Efficiency for large data | Slower: the whole value is copied | Faster: only the address is passed |
| Dereferencing (`*`) | Not needed | Needed to reach the original value |
| Simplicity | Simple | Slightly more complex (uses pointers) |

**Call by reference in C and in C++:** strictly, **C supports only call by value**. "Call by reference" in C is obtained by passing the **address** (a pointer) **by value**; the function then uses `*` to reach the original variable. **C++** has true **reference parameters**, declared with `&` in the parameter list; the function then works on the original variable directly, without pointers:

```cpp
#include <iostream>
using namespace std;

void swapRef(int &a, int &b)      // a and b are references (other names) for x and y
{
    int t = a; a = b; b = t;
}

int main()
{
    int x = 5, y = 9;
    swapRef(x, y);                // no & needed in the call
    cout << "x = " << x << ", y = " << y << endl;
    return 0;
}
```

Output: `x = 9, y = 5`

**Passing arrays:** when an array is passed, the address of its first element is passed, so the function works on the original array (see [Passing an Array to a Function](/topics/programming/c-arrays-strings#arrays)).

### Recursion

**Definition:** recursion is a technique in which a **function calls itself**, directly or indirectly.

A recursive function solves a problem by reducing it to a **smaller version of the same problem**.

Every recursive function must have:

1. A **base case (terminating condition):** a case that is solved directly, **without** another recursive call, so that the recursion stops.
2. A **recursive case:** a call to itself with a **smaller** (simpler) input that moves towards the base case.

Without a base case, the function calls itself endlessly until the memory for function calls (the stack) is exhausted (**stack overflow**).

**Example 1: factorial** (n! = n × (n − 1)!, and 0! = 1! = 1)

```c
#include <stdio.h>

long factorial(int n)
{
    if (n <= 1)                      /* base case */
        return 1;
    return n * factorial(n - 1);     /* recursive case */
}

int main(void)
{
    printf("5! = %ld\n", factorial(5));
    return 0;
}
```

Output: `5! = 120`

**How it works:** each call waits for the result of the next call; the calls are stored on the **stack**:

```text
 factorial(5) = 5 × factorial(4)
              = 5 × 4 × factorial(3)
              = 5 × 4 × 3 × factorial(2)
              = 5 × 4 × 3 × 2 × factorial(1)
              = 5 × 4 × 3 × 2 × 1 = 120
```

**Example 2: Fibonacci series** (0, 1, 1, 2, 3, 5, 8, …; each term is the sum of the two before it)

```c
#include <stdio.h>

int fib(int n)
{
    if (n == 0) return 0;            /* base cases */
    if (n == 1) return 1;
    return fib(n - 1) + fib(n - 2);  /* recursive case */
}

int main(void)
{
    for (int i = 0; i < 10; i++)
        printf("%d ", fib(i));
    printf("\n");
    return 0;
}
```

Output: `0 1 1 2 3 5 8 13 21 34`

**Example 3: GCD by Euclid's method** (gcd(a, b) = gcd(b, a mod b), and gcd(a, 0) = a)

```c
#include <stdio.h>

int gcd(int a, int b)
{
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

int main(void)
{
    printf("gcd(48, 18) = %d\n", gcd(48, 18));
    return 0;
}
```

Output: `gcd(48, 18) = 6` (gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6).

**Advantages of recursion:**

1. **Short, clear code** for problems that are naturally recursive (factorial, Fibonacci, Tower of Hanoi, tree traversal).
2. Some problems are much easier to solve recursively than iteratively.

**Disadvantages of recursion:**

1. **Uses more memory**: every call is kept on the stack until it returns.
2. **Slower** than a loop, because of the overhead of many function calls.
3. Risk of **stack overflow** if the base case is missing or the recursion is too deep.
4. Can be harder to understand and debug.

**Recursion vs iteration:**

| Basis | Recursion | Iteration |
| --- | --- | --- |
| Method | A function calls itself | A loop repeats statements |
| Termination | Base case | Loop condition becomes false |
| Memory | More (stack for every call) | Less |
| Speed | Slower | Faster |
| Code | Usually shorter | Usually longer |
| If termination fails | Stack overflow | Infinite loop |
| Implementation | Function calls | Loop statements (`for`, `while`, `do-while`) |
| Best suited for | Naturally recursive problems (tree traversal, divide and conquer, Tower of Hanoi) | Simple repetition (counting, searching) |

(Recursion is studied further in [Recursion](/topics/data-structures-algorithms/recursion).)

### Storage Classes

A **storage class** decides a variable's **storage location**, **default initial value**, **scope** (where it can be used) and **lifetime** (how long it exists). C has four storage classes:

| Storage class | Keyword | Storage | Default initial value | Scope | Lifetime |
| --- | --- | --- | --- | --- | --- |
| Automatic | `auto` | Memory (stack) | Garbage (indeterminate) | Local to the block | Until the block ends |
| Register | `register` | CPU register (if available) | Garbage (indeterminate) | Local to the block | Until the block ends |
| Static | `static` | Memory | Zero | Local to the block (local static) or to the file (global static) | Whole program run |
| External | `extern` | Memory | Zero | Global (all files of the program) | Whole program run |

1. **auto:** the **default** for local variables (`int a;` inside a function is `auto int a;`). Created when the block is entered and destroyed when it ends.
2. **register:** asks the compiler to keep the variable in a **CPU register** for fast access (useful for loop counters). The compiler may ignore the request. The **address operator `&` cannot be used** on a register variable.
3. **static:** a **local static** variable is created and **initialized only once**, and **keeps its value between function calls**. A **global static** variable or function is visible **only in its own source file**.
4. **extern:** **declares** a global variable (or function) that is **defined in another file** (or later in the same file), so it can be shared between files. It does not create a new variable.

**Example: a static local variable keeps its value**

```c
#include <stdio.h>

void counter(void)
{
    static int count = 0;   /* initialized only once */
    int normal = 0;         /* re-created on every call */

    count++;
    normal++;
    printf("static = %d, auto = %d\n", count, normal);
}

int main(void)
{
    counter();
    counter();
    counter();
    return 0;
}
```

Output:

```text
static = 1, auto = 1
static = 2, auto = 1
static = 3, auto = 1
```

### The main() Function with Arguments

`main()` can receive **command-line arguments**: `int main(int argc, char *argv[])`. **`argc`** is the number of arguments (including the program name), and **`argv`** is an array of strings holding them. For the command `./prog hello 5`, argc = 3, argv[0] = "./prog", argv[1] = "hello" and argv[2] = "5".

## References {#references}

**GeeksforGeeks**

- [Difference between Recursion and Iteration](https://www.geeksforgeeks.org/dsa/difference-between-recursion-and-iteration/) — accessed 2026-11-01
- [Pass by Value Vs Pass by Reference in C](https://www.geeksforgeeks.org/c/difference-between-call-by-value-and-call-by-reference/) — accessed 2026-11-04 (C supports only pass by value; pass by reference is obtained with pointers)
- [Difference between user defined function and library function in C/C++](https://www.geeksforgeeks.org/cpp/difference-between-user-defined-function-and-library-function-in-c-c/) — accessed 2026-11-04 (its table says program execution "begins from the user-defined function"; execution begins at `main()`, which is a user-defined function)

**TutorialsPoint**

- [C – Functions](https://www.tutorialspoint.com/cprogramming/c_functions.htm) — accessed 2026-11-04 (library and user-defined functions)
- [C – Function Call by Reference](https://www.tutorialspoint.com/cprogramming/c_function_call_by_reference.htm) — accessed 2026-11-04
- [C – Storage Classes](https://www.tutorialspoint.com/cprogramming/c_storage_classes.htm) — accessed 2026-11-01
- [C – Recursion](https://www.tutorialspoint.com/cprogramming/c_recursion.htm) — accessed 2026-11-01
- [C – Variables](https://www.tutorialspoint.com/cprogramming/c_variables.htm) — accessed 2026-11-01

**TpointTech**

- [User-defined vs Library Function in C](https://www.tpointtech.com/user-defined-vs-library-function-in-c) — accessed 2026-11-04 (its table says library functions are needed in every C program; a C program can be written without any library function)
- [Call by Value and Call by Reference in C](https://www.tpointtech.com/call-by-value-and-call-by-reference-in-c) — accessed 2026-11-04

**Programiz**

- [C Standard Library Functions](https://www.programiz.com/c-programming/library-function) — accessed 2026-11-04 (advantages of library functions, header files)
- [C User-defined Functions](https://www.programiz.com/c-programming/c-user-defined-functions) — accessed 2026-11-04
- [C Pass Addresses and Pointers to Functions](https://www.programiz.com/c-programming/c-pointer-functions) — accessed 2026-11-04 (call by reference)

**Additional sources**

- [Storage-class specifiers and storage duration](https://en.cppreference.com/w/c/language/storage_duration) — cppreference.com, accessed 2026-11-01
