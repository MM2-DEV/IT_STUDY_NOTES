---
description: Fundamentals of C (history, features, program structure, compilation and tokens), C data types, variables, constants and expressions with type conversion, all C operators with precedence, and the kinds of statements in C.
updated: 2026-11-01
---

## Fundamentals of C Programming {#fundamentals-of-c-programming}

### History of C

1. **C** was developed by **Dennis M. Ritchie** at **Bell Laboratories** (AT&T Bell Labs, USA) in **1972**, to write the **UNIX** operating system.
2. It succeeded the earlier language **B**.
3. In **1978**, Brian **Kernighan** and Dennis **Ritchie** published the book *The C Programming Language*; the version it describes is called **K&R C**.
4. In **1989**, ANSI standardised the language (**ANSI C** or **C89**); ISO adopted it in **1990** (**C90**).
5. Later standards: **C99** (1999), **C11** (2011), **C17** (2018) and **C23** (2024).

### Features of C

1. **Middle-level language:** it has the features of a high-level language and also gives **low-level access** to memory (through pointers) and hardware, so it is used for system programming.
2. **Structured (procedural) language:** a program is divided into **functions** and uses sequence, selection and loops.
3. **Fast and efficient:** C programs run almost as fast as assembly language programs.
4. **Portable:** a C program can be compiled on many different machines with little or no change.
5. **Small set of keywords** (originally 32) and a rich set of **operators**.
6. **Rich standard library** of built-in functions (for input/output, strings, mathematics and so on).
7. **Pointers** and **dynamic memory allocation**.
8. **Extensible:** new functions can be added to the library.
9. **Case-sensitive:** `total` and `Total` are different names.

**Applications of C:**

1. Operating systems and kernels (UNIX, Linux)
2. Compilers, interpreters and assemblers
3. Embedded systems and microcontrollers
4. Database systems
5. Networking software and device drivers
6. Text editors and games

### Structure of a C Program

```c
/* 1. Documentation: comments describing the program */
#include <stdio.h>          /* 2. Preprocessor (link) section: header files */
#define PI 3.14159          /* 3. Definition section: symbolic constants */

int count = 0;              /* 4. Global declaration section */
float area(float r);        /*    function prototype          */

int main(void)              /* 5. main() function: execution starts here */
{
    float r = 2.0;          /*    declaration part */
    printf("Area = %.2f\n", area(r));   /* executable part */
    return 0;
}

float area(float r)         /* 6. Sub-program (user-defined function) section */
{
    return PI * r * r;
}
```

1. **Documentation section:** comments giving the name, purpose and author of the program. Comments are written as `/* … */` (multi-line) or `// …` (single line, from C99); the compiler ignores them.
2. **Preprocessor (link) section:** `#include` directives that attach header files, such as `stdio.h` for `printf()` and `scanf()`.
3. **Definition section:** symbolic constants and macros defined with `#define`.
4. **Global declaration section:** variables and function prototypes used by more than one function.
5. **main() function:** every C program must have exactly one `main()` function; **execution begins at `main()`**. Its body has a declaration part and an executable part, inside braces `{ }`. Every statement ends with a semicolon `;`.
6. **Sub-program section:** user-defined functions called from `main()` or from each other.

**The first C program:**

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, World!\n");
    return 0;
}
```

1. `#include <stdio.h>` includes the standard input/output header, which declares `printf()`.
2. `int main(void)` is the function where execution starts; `int` means it returns an integer.
3. `printf()` prints the text; `\n` is the newline escape sequence.
4. `return 0;` ends `main()` and returns 0 (success) to the operating system.

### Compilation and Execution of a C Program

A C source file (`hello.c`) passes through four stages to become an executable program:

1. **Preprocessing:** the **preprocessor** processes the `#` directives: it inserts header files, replaces macros and removes comments (output: `hello.i`).
2. **Compilation:** the **compiler** translates the preprocessed code into **assembly code** and reports syntax errors (output: `hello.s`).
3. **Assembly:** the **assembler** converts the assembly code into machine code, the **object file** (output: `hello.o` or `hello.obj`).
4. **Linking:** the **linker** joins the object file with library code (for example, the code of `printf()`) to produce the **executable file** (`hello` or `hello.exe`).

The executable is then **loaded** into memory by the loader and **executed**. With the GCC compiler, the command `gcc hello.c -o hello` performs all four stages, and `./hello` runs the program.

### C Character Set

1. **Letters:** A–Z and a–z
2. **Digits:** 0–9
3. **Special characters:** `+ - * / % = < > ( ) { } [ ] ; : , . ' " # & | ! ? ~ ^ _ \` and others
4. **White space:** blank, tab and newline

**Escape sequences** are special character combinations that begin with a backslash:

| Escape sequence | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Horizontal tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |
| `\0` | Null character (end of a string) |
| `\a` | Alert (beep) |
| `\b` | Backspace |

### Tokens

A **token** is the **smallest individual unit** of a C program that the compiler recognises. There are six types of tokens:

1. **Keywords:** reserved words with a fixed meaning, for example `int`, `if`, `while`. They are all written in **lowercase** and cannot be used as names.
2. **Identifiers:** names given by the programmer to variables, functions, arrays and so on, for example `total`, `area`.
3. **Constants (literals):** fixed values, for example `10`, `3.14`, `'A'`.
4. **String literals:** sequences of characters in double quotes, for example `"Dhaka"`.
5. **Operators:** symbols that perform operations, for example `+`, `=`, `&&`.
6. **Special symbols (punctuators):** `;` `,` `{ }` `( )` `[ ]` `#` and others.

**The 32 keywords of ANSI C (C89):**

```text
 auto      break     case      char      const     continue  default   do
 double    else      enum      extern    float     for       goto      if
 int       long      register  return    short     signed    sizeof    static
 struct    switch    typedef   union     unsigned  void      volatile  while
```

Later standards added more keywords, for example `inline` and `_Bool` (C99) and `_Atomic` and `_Static_assert` (C11).

**Rules for identifiers:**

1. An identifier may contain **letters, digits and the underscore (_)** only.
2. The **first character must be a letter or an underscore**, not a digit.
3. **Keywords cannot** be used as identifiers.
4. No spaces or other special characters are allowed.
5. Identifiers are **case-sensitive** (`Sum` and `sum` are different).
6. In ANSI C, at least the first **31 characters** are significant.

**Examples:** `total_marks`, `_count`, `num1` are valid; `1num` (starts with a digit), `total marks` (space), `int` (keyword) and `net-pay` (hyphen) are invalid.

## Data Types {#data-types}

**Definition:** a data type tells the compiler **what kind of value** a variable can hold, **how much memory** it needs and **which operations** can be performed on it.

### Types (Classification) of Data Types in C

Data types in C are of four types:

1. **Basic (primary) data types:** `char`, `int`, `float`, `double`
2. **Void type:** `void` (no value)
3. **Derived data types:** arrays, pointers, functions
4. **User-defined data types:** `struct` (structure), `union`, `enum` (enumeration), `typedef`

### Basic Data Types

| Data type | Used for | Typical size | Format specifier | Example |
| --- | --- | --- | --- | --- |
| `char` | A single character | 1 byte | `%c` | `char grade = 'A';` |
| `int` | Whole numbers | 2 or 4 bytes (4 on most modern systems) | `%d` | `int age = 25;` |
| `float` | Real numbers, single precision (about 6 decimal digits) | 4 bytes | `%f` | `float price = 99.50;` |
| `double` | Real numbers, double precision (about 15 decimal digits) | 8 bytes | `%lf` (input), `%f` (output) | `double pi = 3.14159265;` |
| `void` | No value (for example, a function that returns nothing) | — | — | `void show(void);` |

Sizes depend on the compiler and machine; the `sizeof` operator gives the exact size. On a typical 64-bit Linux system: `sizeof(char)` = 1, `sizeof(int)` = 4, `sizeof(float)` = 4, `sizeof(double)` = 8 and `sizeof(long)` = 8.

### Type Modifiers

The modifiers **`short`**, **`long`**, **`signed`** and **`unsigned`** change the size or range of the basic types.

| Data type | Typical size | Range |
| --- | --- | --- |
| `char` / `signed char` | 1 byte | −128 to 127 |
| `unsigned char` | 1 byte | 0 to 255 |
| `short int` | 2 bytes | −32,768 to 32,767 |
| `unsigned short int` | 2 bytes | 0 to 65,535 |
| `int` (4 bytes) | 4 bytes | −2,147,483,648 to 2,147,483,647 |
| `int` (2 bytes, older compilers) | 2 bytes | −32,768 to 32,767 |
| `unsigned int` (4 bytes) | 4 bytes | 0 to 4,294,967,295 |
| `long int` | 4 or 8 bytes | at least −2,147,483,648 to 2,147,483,647 |
| `float` | 4 bytes | about 1.2E−38 to 3.4E+38 |
| `double` | 8 bytes | about 2.3E−308 to 1.7E+308 |
| `long double` | 10 or more bytes | larger range and precision |

**Range rule:** an n-bit **signed** integer holds −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1, and an n-bit **unsigned** integer holds 0 to 2ⁿ − 1. For 8 bits: −128 to 127 (signed) and 0 to 255 (unsigned).

### Common Format Specifiers

| Specifier | Type |
| --- | --- |
| `%d` or `%i` | `int` |
| `%u` | `unsigned int` |
| `%ld` | `long int` |
| `%f` | `float` (and `double` in `printf`) |
| `%lf` | `double` (in `scanf`) |
| `%c` | `char` |
| `%s` | string |
| `%e` | real number in exponential form |
| `%o` | octal integer |
| `%x` | hexadecimal integer |
| `%p` | pointer (address) |
| `%zu` | `size_t` (the result of `sizeof`) |

## Variables and Expressions {#variables-and-expressions}

### Variables

**Definition:** a variable is a **named memory location** whose value **can change** during program execution. Every variable in C must be **declared with a data type before it is used**.

```c
int count;                 /* declaration: reserves memory for an int */
float price = 99.5;        /* declaration with initialization */
int a = 10, b = 20, c;     /* several variables of the same type */
```

1. **Declaration** tells the compiler the name and type of the variable (and, for a definition, reserves memory).
2. **Initialization** gives the variable its first value when it is declared.
3. A local variable that is **not initialized** contains an unpredictable ("garbage") value; global and `static` variables are automatically initialized to 0.
4. A variable must be **declared only once** in the same scope.

**lvalue and rvalue:** an **lvalue** refers to a memory location and can appear on the **left** of `=` (a variable). An **rvalue** is a value that can appear only on the **right**, such as a constant: `x = 20;` is valid, but `20 = x;` is invalid.

**Scope of variables:**

1. **Local variable:** declared **inside a function or block**; it can be used only inside that block and exists only while the block runs.
2. **Global variable:** declared **outside all functions**; it can be used by all the functions in the file and exists for the whole run of the program.

### Constants

A **constant** is a value that **cannot change** during program execution.

**Types of constants:**

1. **Integer constants:** `25`, `-7`, `017` (octal, begins with 0), `0x1F` (hexadecimal, begins with 0x)
2. **Real (floating-point) constants:** `3.14`, `-0.5`, `2.5e3` (= 2500.0)
3. **Character constants:** a single character in single quotes, `'A'`, `'7'`, `'\n'`
4. **String constants:** characters in double quotes, `"Hello"` (stored with a terminating `'\0'`)

**Defining named constants:**

```c
#define PI 3.14159          /* symbolic constant (preprocessor macro) */
const int MAX = 100;        /* constant variable: its value cannot be changed */
```

### Expressions

**Definition:** an expression is a **combination of operands (variables, constants) and operators** that produces a **single value**. Examples: `a + b`, `x * (y - 2)`, `marks >= 33`.

1. **Arithmetic expression:** gives a number, for example `a * b + c`.
2. **Relational expression:** gives 1 (true) or 0 (false), for example `a > b`.
3. **Logical expression:** combines conditions, for example `a > b && a > c`.

In C, **any non-zero value is treated as true, and 0 as false**.

### Type Conversion

Type conversion is of two types:

1. **Implicit conversion (automatic, type promotion):** when an expression mixes types, the compiler converts the **smaller (lower) type to the larger (higher) type** before the operation. Order: `char`/`short` → `int` → `long` → `float` → `double` → `long double`.

```c
char ch = 'A';
printf("%d %c\n", ch + 1, ch + 1);   /* 66 B: 'A' (65) is converted to int */
```

2. **Explicit conversion (type casting):** the programmer converts a value with the **cast operator** `(type)`.

```c
int a = 17, b = 5;
printf("%.2f\n", (float) a / b);     /* 3.40: a is converted to float */
printf("%d\n", (int) 3.99);          /* 3: the fractional part is dropped */
```

**Integer division:** when both operands are integers, `/` gives an **integer result** (the fraction is discarded): `17 / 5` is 3, and `int i = 7; double d = i / 2;` gives d = 3.0, not 3.5. To get 3.5, write `i / 2.0` or `(double) i / 2`.

## Operators {#operators}

**Definition:** an operator is a **symbol that tells the compiler to perform a specific operation** on one or more **operands**. By the number of operands, operators are **unary** (one operand, for example `-x`, `++x`), **binary** (two operands, for example `a + b`) or **ternary** (three operands: `?:`).

**Types of operators in C** (C operators are of eight types, explained below):

1. Arithmetic operators
2. Relational operators
3. Logical operators
4. Assignment operators
5. Increment and decrement operators
6. Bitwise operators
7. Conditional (ternary) operator
8. Special operators: `sizeof`, comma, address `&`, pointer `*`, member `.` and `->`

### 1. Arithmetic Operators

With `int a = 17, b = 5;`:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `a + b` | 22 |
| `-` | Subtraction | `a - b` | 12 |
| `*` | Multiplication | `a * b` | 85 |
| `/` | Division (integer division for integers) | `a / b` | 3 |
| `%` | Modulus (remainder; integers only) | `a % b` | 2 |

The sign of the result of `%` follows the **first operand**: `-17 % 5` is −2 and `17 % -5` is 2. The `%` operator cannot be used with `float` or `double`.

### 2. Relational Operators

They compare two values and give **1 (true)** or **0 (false)**. With `a = 10, b = 20`:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `==` | Equal to | `a == b` | 0 |
| `!=` | Not equal to | `a != b` | 1 |
| `>` | Greater than | `a > b` | 0 |
| `<` | Less than | `a < b` | 1 |
| `>=` | Greater than or equal to | `a >= b` | 0 |
| `<=` | Less than or equal to | `a <= b` | 1 |

**Note:** `=` is assignment, but `==` is comparison. Writing `if (x = 5)` instead of `if (x == 5)` is a common logical error.

### 3. Logical Operators

| Operator | Meaning | Result | Example | Result |
| --- | --- | --- | --- | --- |
| `&&` | Logical AND | 1 if **both** operands are true | `10 > 5 && 3 > 4` | 0 |
| `\|\|` | Logical OR | 1 if **either** operand is true | `10 > 5 \|\| 3 > 4` | 1 |
| `!` | Logical NOT | Reverses the value | `!(10 > 5)` | 0 |

**Short-circuit evaluation:** in `A && B`, if A is false, B is not evaluated; in `A || B`, if A is true, B is not evaluated.

### 4. Assignment Operators

`=` stores the value on the right in the variable on the left. **Compound assignment** operators combine an operation with assignment:

| Operator | Example | Same as |
| --- | --- | --- |
| `=` | `c = a + b` | — |
| `+=` | `c += a` | `c = c + a` |
| `-=` | `c -= a` | `c = c - a` |
| `*=` | `c *= a` | `c = c * a` |
| `/=` | `c /= a` | `c = c / a` |
| `%=` | `c %= a` | `c = c % a` |
| `&=` `\|=` `^=` `<<=` `>>=` | `c <<= 2` | `c = c << 2` |

**Example:** `int c = 10; c += 5; c *= 2;` gives c = 30.

### 5. Increment and Decrement Operators

`++` adds 1 to a variable and `--` subtracts 1. Each has two forms:

1. **Prefix** (`++x`, `--x`): the variable is changed **first**, and the **new** value is used in the expression.
2. **Postfix** (`x++`, `x--`): the **old** value is used in the expression **first**, and then the variable is changed.

```c
int x = 5, y;
y = x++;    /* y = 5, x = 6  (use, then increment) */
x = 5;
y = ++x;    /* y = 6, x = 6  (increment, then use) */
```

### 6. Bitwise Operators

They work on the **individual bits** of integers. With `A = 60` (0011 1100) and `B = 13` (0000 1101):

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `&` | Bitwise AND | `A & B` | 12 (0000 1100) |
| `\|` | Bitwise OR | `A \| B` | 61 (0011 1101) |
| `^` | Bitwise XOR | `A ^ B` | 49 (0011 0001) |
| `~` | One's complement (inverts all bits) | `~A` | −61 |
| `<<` | Left shift | `A << 2` | 240 (1111 0000) |
| `>>` | Right shift | `A >> 2` | 15 (0000 1111) |

Shifting left by n places multiplies by 2ⁿ, and shifting right by n places divides by 2ⁿ (for non-negative numbers). (For the logic of AND, OR and XOR, see [Logic Gates](/topics/digital-logic/logic-gates).)

### 7. Conditional (Ternary) Operator

```text
 condition ? expression1 : expression2
```

If the condition is true, the value is expression1; otherwise it is expression2. It is a short form of `if-else`.

```c
int marks = 75;
printf("%s\n", marks >= 33 ? "Pass" : "Fail");   /* Pass */
int max = (a > b) ? a : b;                         /* larger of a and b */
```

### 8. Special Operators

1. **`sizeof`:** gives the size of a type or variable in bytes: `sizeof(int)` is 4 on most systems.
2. **Comma operator (`,`):** evaluates expressions from left to right; the value of the whole expression is the value of the last one: `p = (q = 3, q + 2);` gives p = 5.
3. **Address operator (`&`):** gives the memory address of a variable, as in `scanf("%d", &x);`.
4. **Indirection (dereference) operator (`*`):** gives the value stored at an address (see [Pointers](/topics/programming/c-pointers)).
5. **Member operators (`.` and `->`):** access members of structures and unions (see [Structures](/topics/programming/c-structures-unions#structures)).

### Operator Precedence and Associativity

**Precedence** decides which operator is applied first in an expression with several operators; **associativity** decides the order when operators of the **same precedence** appear together. (Highest precedence first.)

| Precedence | Category | Operators | Associativity |
| --- | --- | --- | --- |
| 1 | Postfix | `()` `[]` `->` `.` `x++` `x--` | Left to right |
| 2 | Unary | `+` `-` `!` `~` `++x` `--x` `(type)` `*` `&` `sizeof` | Right to left |
| 3 | Multiplicative | `*` `/` `%` | Left to right |
| 4 | Additive | `+` `-` | Left to right |
| 5 | Shift | `<<` `>>` | Left to right |
| 6 | Relational | `<` `<=` `>` `>=` | Left to right |
| 7 | Equality | `==` `!=` | Left to right |
| 8 | Bitwise AND | `&` | Left to right |
| 9 | Bitwise XOR | `^` | Left to right |
| 10 | Bitwise OR | `\|` | Left to right |
| 11 | Logical AND | `&&` | Left to right |
| 12 | Logical OR | `\|\|` | Left to right |
| 13 | Conditional | `?:` | Right to left |
| 14 | Assignment | `=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `\|=` `<<=` `>>=` | Right to left |
| 15 | Comma | `,` | Left to right |

**Examples:**

1. `2 + 3 * 4` = 2 + 12 = **14** (`*` has higher precedence than `+`), but `(2 + 3) * 4` = **20**.
2. `10 - 4 - 3` = (10 − 4) − 3 = **3** (`-` is left-to-right associative).
3. `a = b = 5` assigns 5 to b first and then to a (assignment is right-to-left associative).

## Statements {#statements}

**Definition:** a statement is a **complete instruction** that the program carries out. In C, a simple statement **ends with a semicolon (`;`)**.

**Kinds of statements in C:**

1. **Expression statement:** an expression followed by a semicolon, for example an assignment or a function call.

```c
x = a + b;
printf("Hello\n");
```

2. **Compound statement (block):** a group of statements and declarations enclosed in **braces `{ }`**; it can be used wherever a single statement is allowed, and variables declared inside it are local to the block.

```c
{
    int t = a;
    a = b;
    b = t;
}
```

3. **Selection (decision) statements:** choose what to execute according to a condition: `if`, `if-else`, `switch`.
4. **Iteration (loop) statements:** repeat statements: `while`, `do-while`, `for`.
5. **Jump statements:** transfer control unconditionally: `break`, `continue`, `goto`, `return`.
6. **Labeled statements:** statements with a label used by `goto` (`label:`), or the `case` and `default` labels of a `switch`.
7. **Null (empty) statement:** a semicolon alone (`;`); it does nothing and is used, for example, as the empty body of a loop.
8. **Declaration statements:** declare variables, for example `int a, b;`.

The selection, iteration and jump statements are explained in [C: Control Statements](/topics/programming/c-control-statements).

## References {#references}

**TutorialsPoint**

- [C – Overview](https://www.tutorialspoint.com/cprogramming/c_overview.htm) — accessed 2026-11-01
- [C – Program Structure](https://www.tutorialspoint.com/cprogramming/c_program_structure.htm) — accessed 2026-11-01
- [C – Tokens](https://www.tutorialspoint.com/cprogramming/c_tokens.htm) — accessed 2026-11-01
- [C – Keywords](https://www.tutorialspoint.com/cprogramming/c_keywords.htm) — accessed 2026-11-01
- [C – Data Types](https://www.tutorialspoint.com/cprogramming/c_data_types.htm) — accessed 2026-11-01
- [C – Variables](https://www.tutorialspoint.com/cprogramming/c_variables.htm) — accessed 2026-11-01
- [C – Operators](https://www.tutorialspoint.com/cprogramming/c_operators.htm) — accessed 2026-11-01

**Additional sources**

- [C (programming language)](https://en.wikipedia.org/wiki/C_(programming_language)) — Wikipedia, accessed 2026-11-01
- [Statements](https://en.cppreference.com/w/c/language/statements) — cppreference.com, accessed 2026-11-01
