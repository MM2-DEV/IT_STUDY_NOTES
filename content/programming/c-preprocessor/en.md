---
description: The C preprocessor and its directives - file inclusion, macro definition (object-like and function-like macros), conditional compilation, predefined macros, the #, ## and defined operators, header guards, and macros versus functions.
updated: 2026-11-01
---

### The C Preprocessor

**Definition:** the **C preprocessor** is a program that **processes the source code before it is compiled**. It works as a **text-substitution tool**: it inserts header files, replaces macros and selects which parts of the code are compiled. Its instructions are called **preprocessor directives**.

**Position in compilation:** preprocessing is the **first stage** of building a C program (preprocessing → compilation → assembly → linking; see [Compilation and Execution of a C Program](/topics/programming/c-data-types-operators#fundamentals-of-c-programming)). The output of the preprocessor (with GCC, seen with `gcc -E file.c`) is pure C code without directives, which is then given to the compiler.

**Rules for directives:**

1. Every directive **begins with `#`**, usually in the first column.
2. A directive occupies **one line**; it is **not ended with a semicolon**. A long directive can continue on the next line with a backslash `\` at the end of the line.
3. Directives are usually written at the **top of the file**, but they can appear anywhere.

### Preprocessor Directives

| Directive | Purpose |
| --- | --- |
| `#include` | Inserts the contents of another file (usually a header file) |
| `#define` | Defines a macro (a name that is replaced by text) |
| `#undef` | Removes (undefines) a macro |
| `#ifdef` | Compiles the following code only if a macro **is defined** |
| `#ifndef` | Compiles the following code only if a macro **is not defined** |
| `#if` | Compiles the following code if a constant expression is true (non-zero) |
| `#elif` | Else-if branch of `#if` |
| `#else` | Alternative branch |
| `#endif` | Ends a conditional block |
| `#error` | Stops compilation with an error message |
| `#pragma` | Gives special, compiler-specific instructions |
| `#line` | Changes the line number and file name reported by the compiler |

The directives fall into three main groups:

1. **File inclusion:** `#include`
2. **Macro definition:** `#define`, `#undef`
3. **Conditional compilation:** `#if`, `#ifdef`, `#ifndef`, `#elif`, `#else`, `#endif`

### 1. File Inclusion (#include)

`#include` inserts the **entire contents of a file** at that point of the program.

```c
#include <stdio.h>        /* angle brackets: searched in the system (standard) directories */
#include "myheader.h"     /* quotes: searched first in the current (project) directory     */
```

1. **`<file.h>`** is used for **standard library** header files.
2. **`"file.h"`** is used for the programmer's **own** header files.

### 2. Macro Definition (#define)

A **macro** is a **name that the preprocessor replaces with a piece of text** (its **replacement list**) everywhere it appears in the program. Replacement is done before compilation, and macro names are usually written in CAPITALS.

**a) Object-like macro (symbolic constant):**

```c
#define PI 3.14159
#define MAX_SIZE 100

float area = PI * r * r;     /* becomes: float area = 3.14159 * r * r; */
int a[MAX_SIZE];             /* becomes: int a[100];                   */
```

**b) Function-like (parameterized) macro:** a macro that takes arguments, like a function.

```c
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

`SQUARE(4)` becomes `((4) * (4))` = 16, and `MAX(10, 20)` becomes 20. There must be **no space** between the macro name and the opening bracket.

**Why the brackets are needed:** a macro is pure text substitution, so the arguments and the whole replacement must be bracketed:

```c
#include <stdio.h>

#define SQ_BAD(x)  x * x
#define SQ_GOOD(x) ((x) * (x))

int main(void)
{
    printf("%d\n", SQ_BAD(2 + 3));    /* 2 + 3 * 2 + 3 = 11 (wrong)  */
    printf("%d\n", SQ_GOOD(2 + 3));   /* ((2 + 3) * (2 + 3)) = 25   */
    return 0;
}
```

Output:

```text
11
25
```

**c) Multi-line macro:** continued with `\` at the end of each line.

```c
#define PRINT_SUM(a, b) \
    printf("%d + %d = %d\n", (a), (b), (a) + (b))
```

**#undef** removes a macro so it can be redefined:

```c
#undef MAX_SIZE
#define MAX_SIZE 200
```

### 3. Conditional Compilation

Conditional compilation directives tell the preprocessor to **include or skip parts of the code** depending on a condition. This is used to build different versions of a program (for example, a debug version), to write code for different platforms, and to avoid including a header file twice.

```c
#include <stdio.h>

#define DEBUG 1
#define VERSION 2

int main(void)
{
#ifdef DEBUG
    printf("Debug mode is on\n");     /* compiled only because DEBUG is defined */
#endif

#if VERSION == 1
    printf("Version 1\n");
#elif VERSION == 2
    printf("Version 2\n");
#else
    printf("Unknown version\n");
#endif
    return 0;
}
```

Output:

```text
Debug mode is on
Version 2
```

A macro can also be defined from the command line, without changing the code: `gcc -DDEBUG prog.c`.

**Header guard (include guard):** prevents the contents of a header file from being included **more than once** in the same file:

```c
/* myheader.h */
#ifndef MYHEADER_H
#define MYHEADER_H

int add(int a, int b);

#endif
```

The first time the file is included, `MYHEADER_H` is not defined, so the contents are processed and `MYHEADER_H` is defined; any later inclusion is skipped.

### Predefined Macros

| Macro | Value |
| --- | --- |
| `__FILE__` | Name of the current source file (a string) |
| `__LINE__` | Current line number (an integer) |
| `__DATE__` | Date of compilation, as "MMM DD YYYY" |
| `__TIME__` | Time of compilation, as "HH:MM:SS" |
| `__STDC__` | 1 if the compiler conforms to the ANSI/ISO C standard |

```c
printf("File %s, line %d\n", __FILE__, __LINE__);
```

### Preprocessor Operators

1. **Continuation operator (`\`):** continues a macro onto the next line.
2. **Stringizing operator (`#`):** converts a macro argument into a **string literal**.
3. **Token-pasting operator (`##`):** **joins two tokens** into one.
4. **`defined` operator:** used in `#if`; gives 1 if a macro is defined and 0 if not, for example `#if defined(DEBUG)` or `#if !defined(MESSAGE)`.

```c
#include <stdio.h>

#define STR(x) #x                 /* stringizing   */
#define JOIN(a, b) a##b           /* token pasting */

int main(void)
{
    int value12 = 99;

    printf("%s\n", STR(Hello));   /* "Hello"                      */
    printf("%d\n", JOIN(value, 12));  /* becomes value12 -> 99   */
    return 0;
}
```

Output:

```text
Hello
99
```

### Macros vs Functions

| Basis | Macro | Function |
| --- | --- | --- |
| Processed by | Preprocessor (text replacement before compilation) | Compiler (compiled once, called at run time) |
| Speed | Faster: no function-call overhead | Slower: call and return take time |
| Program size | Larger: the code is copied at every use | Smaller: the code exists only once |
| Type checking | No type checking of arguments | Arguments are type-checked |
| Side effects | Arguments may be evaluated more than once (for example, `SQUARE(i++)`) | Each argument is evaluated once |
| Debugging | Harder | Easier |
| Recursion | Not possible | Possible |
| How it works | The macro name is replaced by its text before compilation | Control is transferred to the function when it is called |
| Compile-time error checking | Not done on the macro itself | Done |
| Suitable for | Short code repeated many times, and constants | Large or complex operations |

## References {#references}

**GeeksforGeeks**

- [Macros vs Functions](https://www.geeksforgeeks.org/macros-vs-functions) — accessed 2026-11-01

**TutorialsPoint**

- [C – Preprocessors](https://www.tutorialspoint.com/cprogramming/c_preprocessors.htm) — accessed 2026-11-01

**Additional sources**

- [Preprocessor](https://en.cppreference.com/w/c/preprocessor) — cppreference.com, accessed 2026-11-01
