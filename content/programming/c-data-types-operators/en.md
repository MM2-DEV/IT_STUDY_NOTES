---
description: Fundamentals of C (history, features, why C is a structured language, program structure, compilation and tokens), C data types, variables (naming rules, local and global variables), constants and expressions with type conversion, all C operators with precedence, and the kinds of statements in C.
updated: 2026-11-04
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

### Why C Is Called a Structured Programming Language

C is called a structured programming language because it supports the rules of **structured programming**: a program is divided into **functions (modules)**, and the code inside each function is built only from the three standard control structures — **sequence, selection and iteration** — so it can be written without unrestricted `goto` jumps (see [Structured Program Design](/topics/programming/program-design-techniques#structured-program-design)).

The reasons are:

1. **Functions (modularity):** a large program is broken into small, separate functions, each doing one task; `main()` calls the other functions. Each function can be written, tested and debugged separately and reused.
2. **Structured control statements:** C provides statements for all three basic structures, so a `goto` is never needed:
   1. Sequence — statements run one after another.
   2. Selection — `if`, `if-else`, `switch`.
   3. Iteration — `for`, `while`, `do-while`.
3. **Blocks:** statements are grouped into blocks with `{ }`, and each block has a single entry and a single exit.
4. **Local variables:** variables declared inside a function or block are local to it, so functions do not interfere with each other's data.
5. **Top-down design:** a C program is naturally designed from the top (`main()`) down to smaller functions (stepwise refinement).

```c
#include <stdio.h>

/* Each task is written as a separate function (module) */
char findGrade(int marks)
{
    if (marks >= 80)                     /* selection */
        return 'A';
    else if (marks >= 60)
        return 'B';
    else
        return 'C';
}

void printResult(int roll, int marks)
{
    printf("Roll %d: marks = %d, grade = %c\n", roll, marks, findGrade(marks));
}

int main(void)                           /* main() calls the other functions */
{
    int marks[3] = {85, 72, 40};         /* sequence */
    for (int i = 0; i < 3; i++)          /* iteration */
        printResult(i + 1, marks[i]);
    return 0;
}
```

Output:

```text
Roll 1: marks = 85, grade = A
Roll 2: marks = 72, grade = B
Roll 3: marks = 40, grade = C
```

Because the program is made of separate functions and structured statements, it is **easy to read, test, debug and modify**. (C still has a `goto` statement, but structured C programs do not need it.)

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

A **token** is the **smallest individual unit** of a C program that the compiler recognises.

There are six types of tokens:

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

### Definition of Data Type

A data type is a classification that tells the compiler what kind of value a variable can hold.

It also decides how much memory the variable occupies, the range of values it can store and the operations that can be performed on it.

For example, `int age;` tells the compiler that `age` holds a whole number, that it needs (usually) 4 bytes, and that arithmetic operations such as `+` and `%` can be applied to it.

### Types of Data Types in C

Data types in C are of four types:

1. **Basic (primary or fundamental) data types** — `char`, `int`, `float` and `double` (and `_Bool`, added in C99).
2. **Void type** — `void`, which means "no value".
3. **Derived data types** — types built from the basic types: arrays, pointers and functions.
4. **User-defined data types** — types defined by the programmer: structures (`struct`), unions (`union`), enumerations (`enum`) and `typedef` names.

Some books classify the types slightly differently: for example, they place structures and unions among the derived types and list enumerations as a separate category. The types themselves are the same.

### 1. Basic Data Types

The basic data types are the built-in types from which all other types are made.

C has four basic data types — `char`, `int`, `float` and `double` — and C99 added the Boolean type `_Bool`.

#### char (Character)

The `char` type stores a single character, such as `'A'`, `'z'`, `'5'` or `'#'`. It occupies 1 byte (8 bits), which is the smallest addressable unit in C.

1. A character is stored as its integer code (in ASCII, `'A'` is 65 and `'a'` is 97), so `char` is really a small integer type, and arithmetic can be done on it: `'A' + 1` gives 66, the code of `'B'`.
2. A character constant is written in single quotes: `char grade = 'A';`.
3. Its format specifier is `%c` (to print the character) or `%d` (to print its code).
4. `signed char` holds −128 to 127, and `unsigned char` holds 0 to 255. Whether a plain `char` is signed or unsigned is decided by the compiler (implementation-defined); on most PC compilers it is signed.
5. A string, such as `"Hello"`, is an array of `char` ending with the null character `'\0'`.

#### int (Integer)

The `int` type stores whole numbers — positive, negative or zero — without a fractional part, such as `25`, `-340` and `0`.

1. It occupies 4 bytes (32 bits) on almost all modern compilers, giving the range −2,147,483,648 to 2,147,483,647. On old 16-bit compilers (such as Turbo C), it occupies 2 bytes, with the range −32,768 to 32,767.
2. Its format specifiers are `%d` and `%i`.
3. Integer constants can be written in decimal (`25`), octal with a leading `0` (`031`) or hexadecimal with a leading `0x` (`0x19`); all three represent the value 25.
4. `int` is signed by default, so `int` and `signed int` are the same type.

#### float (Single-Precision Floating Point)

The `float` type stores real numbers — numbers with a fractional part — in single precision, such as `3.14`, `-0.005` and `2.5e3` (2.5 × 10³).

1. It occupies 4 bytes and is accurate to about 6 significant decimal digits.
2. Its positive range is about 1.2 × 10⁻³⁸ to 3.4 × 10³⁸.
3. Its format specifier is `%f` (also `%e` for exponential form and `%g` for the shorter form).
4. A floating constant without a suffix is a `double`; the suffix `f` makes it a `float`: `float price = 99.50f;`.

#### double (Double-Precision Floating Point)

The `double` type stores real numbers in double precision, so it has a larger range and more accuracy than `float`.

1. It occupies 8 bytes and is accurate to about 15 significant decimal digits.
2. Its positive range is about 2.2 × 10⁻³⁰⁸ to 1.7 × 10³⁰⁸.
3. Its format specifier is `%lf` in `scanf`; in `printf`, both `%f` and `%lf` print a `double`.
4. It is the default type of floating constants: `double pi = 3.14159265358979;`.

#### _Bool (Boolean, C99)

The `_Bool` type stores a truth value: 0 (false) or 1 (true). It occupies 1 byte on most compilers. After including `<stdbool.h>`, it can be written as `bool`, with the constants `true` and `false`: `bool passed = true;`. Since C23, `bool`, `true` and `false` are keywords.

Converting any non-zero value to `_Bool` gives 1, and converting zero gives 0.

#### Summary of Basic Data Types

| Data type | Used for | Typical size | Range (typical) | Format specifier | Example |
| --- | --- | --- | --- | --- | --- |
| `char` | A single character | 1 byte | −128 to 127 (or 0 to 255) | `%c` | `char grade = 'A';` |
| `int` | Whole numbers | 4 bytes (2 on 16-bit compilers) | −2,147,483,648 to 2,147,483,647 | `%d`, `%i` | `int age = 25;` |
| `float` | Real numbers, single precision (about 6 digits) | 4 bytes | 1.2E−38 to 3.4E+38 | `%f` | `float price = 99.50f;` |
| `double` | Real numbers, double precision (about 15 digits) | 8 bytes | 2.2E−308 to 1.7E+308 | `%lf` (input), `%f` or `%lf` (output) | `double pi = 3.14159265;` |
| `_Bool` (`bool`) | True or false (1 or 0) | 1 byte | 0 to 1 | `%d` | `bool ok = true;` |

### 2. Void Type

The `void` type means "no value" or "no type".

A variable of type `void` cannot be declared. It has three uses:

1. **Function that returns no value** — `void display(int n);`
2. **Function that takes no arguments** — `int rand(void);`
3. **Generic pointer** — a `void *` pointer can hold the address of any type of data; for example, `malloc` returns `void *`: `void *malloc(size_t size);`. A `void *` pointer must be converted to another pointer type before the data it points to is accessed.

### 3. Derived Data Types

Derived data types are types that are built from the basic data types.

There are three derived types:

1. **Array** — a collection of a fixed number of elements of the same type, stored in consecutive memory locations and accessed by an index starting from 0: `int marks[5];`.
2. **Pointer** — a variable that stores the memory address of another variable: `int *p = &age;`.
3. **Function** — a named block of code with a return type and parameters; the function type is defined by its return type and parameter types: `int add(int a, int b);`.

These types are explained in [Arrays and Strings](/topics/programming/c-arrays-strings), [Pointers](/topics/programming/c-pointers) and [Functions](/topics/programming/c-functions).

### 4. User-Defined Data Types

User-defined data types are types that the programmer creates from existing types.

There are four user-defined types:

1. **Structure (`struct`)** — groups variables (members) of different types under one name; each member has its own memory, so the size of a structure is at least the sum of the sizes of its members.

   ```c
   struct Student { int roll; char name[30]; float cgpa; };
   ```

2. **Union (`union`)** — like a structure, but all members share the same memory location, so only one member holds a meaningful value at a time; the size of a union is the size of its largest member.

   ```c
   union Value { int i; float f; char c; };
   ```

3. **Enumeration (`enum`)** — a set of named integer constants; by default, the first name has the value 0 and each following name is one more than the previous.

   ```c
   enum Day { SUN, MON, TUE };   /* SUN = 0, MON = 1, TUE = 2 */
   ```

4. **`typedef`** — gives a new name (alias) to an existing type.

   ```c
   typedef unsigned long int ulong;
   ulong population;
   ```

Structures and unions are explained in [Structures and Unions](/topics/programming/c-structures-unions).

### Type Modifiers

A type modifier is a keyword written before a basic data type to change its size, its range, or whether it can hold negative values. C has four type modifiers:

1. `signed`
2. `unsigned`
3. `short`
4. `long`

The modifier `long` can be written twice — `long long` (added in C99) — to obtain an integer type at least 64 bits wide.

The four modifiers are of two kinds:

1. **Sign modifiers** — `signed` and `unsigned` decide whether a type can hold negative values.
2. **Size modifiers** — `short`, `long` and `long long` change the size (and therefore the range) of a type.

#### 1. signed

The `signed` modifier allows a type to hold both negative and positive values. One bit (the most significant bit) is used for the sign, so an n-bit signed type holds −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1. The integer types (`short`, `int`, `long`, `long long`) are signed by default, so writing `signed` before them changes nothing: `signed int` is the same as `int`.

Example: `signed char temperature = -15;`

#### 2. unsigned

The `unsigned` modifier allows a type to hold only zero and positive values. All the bits are used for the value, so an n-bit unsigned type holds 0 to 2ⁿ − 1 — its largest value is about twice the largest value of the signed type of the same size.

Example: `unsigned int population = 4000000000u;` (this value is too large for a 4-byte `int` but fits in a 4-byte `unsigned int`).

If a negative value is assigned to an unsigned variable, it is converted by adding 2ⁿ: `unsigned char c = -1;` stores 255.

#### 3. short

The `short` modifier gives an integer type that may be smaller than `int`. A `short int` is at least 16 bits (2 bytes), and on almost all systems it is exactly 2 bytes, with the range −32,768 to 32,767. It is used to save memory when the values are small.

Example: `short int year = 2026;`

#### 4. long

The `long` modifier gives a type that may be larger than the plain type.

1. **`long int`** — an integer of at least 32 bits (4 bytes). It is 4 bytes on Windows and on 32-bit systems, and 8 bytes on 64-bit Linux and macOS. Example: `long int distance = 150000000L;`
2. **`long long int`** (C99) — an integer of at least 64 bits (8 bytes), with the range −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. It is used for very large whole numbers. Example: `long long int stars = 9000000000000LL;`
3. **`long double`** — a floating-point type with at least the precision and range of `double`, and usually more. On x86 computers it uses the 80-bit extended-precision format and occupies 10, 12 or 16 bytes depending on the compiler (16 bytes with GCC on 64-bit Linux). Example: `long double x = 3.14159265358979323846L;`

#### Which Modifier Can Be Used with Which Data Type

Not every modifier can be used with every data type. The rules are:

| Data type | `signed` | `unsigned` | `short` | `long` | `long long` |
| --- | --- | --- | --- | --- | --- |
| `char` | Yes (`signed char`) | Yes (`unsigned char`) | No | No | No |
| `int` | Yes | Yes | Yes (`short int`) | Yes (`long int`) | Yes (`long long int`) |
| `float` | No | No | No | No | No |
| `double` | No | No | No | Yes (`long double`) | No |
| `void` | No | No | No | No | No |

From this table:

1. **`char`** can take only the sign modifiers: `signed char` and `unsigned char`.
2. **`int`** can take all the modifiers, and a sign modifier can be combined with a size modifier: `unsigned short int`, `signed long int`, `unsigned long long int` and so on.
3. **`float`** cannot take any modifier.
4. **`double`** can take only `long`, giving `long double`. Floating-point types are always signed, so `signed` and `unsigned` cannot be used with them.
5. **`void`** cannot take any modifier.

The following rules also apply:

1. When a modifier is used with `int`, the word `int` can be left out: `short` means `short int`, `long` means `long int`, `long long` means `long long int`, `unsigned` means `unsigned int` and `signed` means `signed int`.
2. `short` and `long` cannot be used together, and `signed` and `unsigned` cannot be used together.
3. The keywords can be written in any order: `unsigned long int` and `long unsigned int` are the same type, but the conventional order is sign, then size, then type.
4. The following combinations are invalid, and the compiler reports an error for each: `short char`, `long char`, `short float`, `long float`, `signed float`, `unsigned float`, `unsigned double`, `short double`, `long long double`, `short long` and `long long long`.

#### Complete List of Data Types with Modifiers

The table gives the sizes for a typical 64-bit system (GCC on Linux); the size column also notes where Windows, 32-bit or 16-bit systems differ.

| Data type | Other valid spellings | Size (64-bit Linux) | Range | Format specifier |
| --- | --- | --- | --- | --- |
| `char` | — | 1 byte | −128 to 127 (or 0 to 255) | `%c` |
| `signed char` | — | 1 byte | −128 to 127 | `%c`, `%hhd` |
| `unsigned char` | — | 1 byte | 0 to 255 | `%c`, `%hhu` |
| `short int` | `short`, `signed short`, `signed short int` | 2 bytes | −32,768 to 32,767 | `%hd` |
| `unsigned short int` | `unsigned short` | 2 bytes | 0 to 65,535 | `%hu` |
| `int` | `signed`, `signed int` | 4 bytes (2 on 16-bit compilers) | −2,147,483,648 to 2,147,483,647 | `%d`, `%i` |
| `unsigned int` | `unsigned` | 4 bytes (2 on 16-bit compilers) | 0 to 4,294,967,295 | `%u` |
| `long int` | `long`, `signed long`, `signed long int` | 8 bytes (4 on Windows and 32-bit systems) | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (with 4 bytes: −2,147,483,648 to 2,147,483,647) | `%ld` |
| `unsigned long int` | `unsigned long` | 8 bytes (4 on Windows and 32-bit systems) | 0 to 18,446,744,073,709,551,615 (with 4 bytes: 0 to 4,294,967,295) | `%lu` |
| `long long int` (C99) | `long long`, `signed long long`, `signed long long int` | 8 bytes | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | `%lld` |
| `unsigned long long int` (C99) | `unsigned long long` | 8 bytes | 0 to 18,446,744,073,709,551,615 | `%llu` |
| `float` | — | 4 bytes | 1.2E−38 to 3.4E+38 (about 6 digits) | `%f` |
| `double` | — | 8 bytes | 2.2E−308 to 1.7E+308 (about 15 digits) | `%lf` (input), `%f` (output) |
| `long double` | — | 16 bytes (10 or 12 on other compilers) | 3.4E−4932 to 1.2E+4932 (about 18 digits) | `%Lf` |
| `_Bool` (C99) | `bool` (with `<stdbool.h>`) | 1 byte | 0 to 1 | `%d` |

The ranges of the floating-point types are for positive values; the same ranges apply to negative values.

#### Sizes Guaranteed by the C Standard

The C standard does not fix the exact size of most types; it fixes only minimum sizes and an order:

1. `sizeof(char)` is always 1 byte.
2. `short` and `int` are at least 16 bits, `long` is at least 32 bits, and `long long` is at least 64 bits.
3. `sizeof(char) ≤ sizeof(short) ≤ sizeof(int) ≤ sizeof(long) ≤ sizeof(long long)`.
4. `float` ≤ `double` ≤ `long double` in precision and range.

The actual sizes are chosen by the compiler according to the data model of the system:

| Data model | Used by | `short` | `int` | `long` | `long long` | Pointer |
| --- | --- | --- | --- | --- | --- | --- |
| LP32 | 16-bit Windows (Win16) | 16 bits | 16 bits | 32 bits | — | 32 bits |
| ILP32 | 32-bit Windows and Unix-like systems | 16 bits | 32 bits | 32 bits | 64 bits | 32 bits |
| LLP64 | 64-bit Windows | 16 bits | 32 bits | 32 bits | 64 bits | 64 bits |
| LP64 | 64-bit Linux, macOS and other Unix-like systems | 16 bits | 32 bits | 64 bits | 64 bits | 64 bits |

The `sizeof` operator gives the exact size of a type on the system in use.

#### Calculating the Range of an Integer Type

The range of an integer type depends on its number of bits n:

> **Signed range = −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1**
>
> **Unsigned range = 0 to 2ⁿ − 1**

where n = number of bits = size in bytes × 8.

**Example 1 — `short int` (2 bytes):**

1. n = 2 × 8 = 16 bits.
2. Signed: −2¹⁵ to 2¹⁵ − 1 = **−32,768 to 32,767**.
3. Unsigned: 0 to 2¹⁶ − 1 = **0 to 65,535**.

**Example 2 — `long long int` (8 bytes):**

1. n = 8 × 8 = 64 bits.
2. 2⁶³ = 9,223,372,036,854,775,808.
3. Signed: **−9,223,372,036,854,775,808 to 9,223,372,036,854,775,807**.
4. Unsigned: 0 to 2⁶⁴ − 1 = **0 to 18,446,744,073,709,551,615**.

#### Example Program: Sizes of Data Types

```c
#include <stdio.h>

int main(void)
{
    printf("char        : %zu byte\n",  sizeof(char));
    printf("short       : %zu bytes\n", sizeof(short));
    printf("int         : %zu bytes\n", sizeof(int));
    printf("long        : %zu bytes\n", sizeof(long));
    printf("long long   : %zu bytes\n", sizeof(long long));
    printf("float       : %zu bytes\n", sizeof(float));
    printf("double      : %zu bytes\n", sizeof(double));
    printf("long double : %zu bytes\n", sizeof(long double));
    return 0;
}
```

Output with GCC on 64-bit Linux:

```text
char        : 1 byte
short       : 2 bytes
int         : 4 bytes
long        : 8 bytes
long long   : 8 bytes
float       : 4 bytes
double      : 8 bytes
long double : 16 bytes
```

### Common Format Specifiers

| Specifier | Type |
| --- | --- |
| `%c` | `char` (as a character) |
| `%hhd` / `%hhu` | `signed char` / `unsigned char` (as a number) |
| `%hd` / `%hu` | `short int` / `unsigned short int` |
| `%d` or `%i` | `int` |
| `%u` | `unsigned int` |
| `%ld` / `%lu` | `long int` / `unsigned long int` |
| `%lld` / `%llu` | `long long int` / `unsigned long long int` |
| `%f` | `float` (and `double` in `printf`) |
| `%lf` | `double` (required in `scanf`) |
| `%Lf` | `long double` |
| `%e` | real number in exponential form |
| `%g` | real number in `%f` or `%e` form, whichever is shorter |
| `%o` | unsigned integer in octal |
| `%x` | unsigned integer in hexadecimal |
| `%s` | string |
| `%p` | pointer (address) |
| `%zu` | `size_t` (the result of `sizeof`) |

## Variables and Expressions {#variables-and-expressions}

### Variables

**Definition:** a variable is a **named memory location** whose value **can change** during program execution.

Every variable in C must be **declared with a data type before it is used**.

```c
int count;                 /* declaration: reserves memory for an int */
float price = 99.5;        /* declaration with initialization */
int a = 10, b = 20, c;     /* several variables of the same type */
```

1. **Declaration** tells the compiler the name and type of the variable (and, for a definition, reserves memory).
2. **Initialization** gives the variable its first value when it is declared.
3. A local variable that is **not initialized** contains an unpredictable ("garbage") value; global and `static` variables are automatically initialized to 0 (see [Local and Global Variables](#local-and-global-variables)).
4. A variable must be **declared only once** in the same scope.

**lvalue and rvalue:** an **lvalue** refers to a memory location and can appear on the **left** of `=` (a variable). An **rvalue** is a value that can appear only on the **right**, such as a constant: `x = 20;` is valid, but `20 = x;` is invalid.

### Rules for Naming Variables

A variable name is an identifier, so it must follow the rules for identifiers:

1. A name may contain only **letters (A–Z, a–z), digits (0–9) and the underscore (`_`)**.
2. The **first character must be a letter or an underscore**; it cannot be a digit.
3. **No spaces** and **no other special characters** (such as `-`, `$`, `@`, `.`) are allowed.
4. A **keyword** (such as `int`, `float`, `if`, `while`) cannot be used as a name.
5. Names are **case-sensitive**: `age`, `Age` and `AGE` are three different variables.
6. A name must be **unique within its scope**: the same name cannot be declared twice in the same block.
7. ANSI C treats at least the **first 31 characters** as significant; longer names are allowed, but some compilers ignore the extra characters.
8. Names beginning with an underscore followed by a capital letter, or with two underscores (such as `_Count` or `__temp`), are **reserved** for the compiler and the standard library, so they should be avoided.

Good practice is to use **meaningful names**, such as `total_marks` or `studentCount`, instead of `tm` or `x1`.

| Name | Valid? | Reason |
| --- | --- | --- |
| `age` | Valid | Letters only |
| `total_marks` | Valid | Letters and underscore |
| `_count` | Valid | Starts with an underscore |
| `num1` | Valid | A digit is allowed after the first character |
| `1num` | Invalid | Starts with a digit |
| `total marks` | Invalid | Contains a space |
| `net-pay` | Invalid | Contains a hyphen |
| `my$var` | Invalid | Contains `$` |
| `int` | Invalid | It is a keyword |
| `float` | Invalid | It is a keyword |

### Local and Global Variables {#local-and-global-variables}

Variables are classified by their **scope** (the part of the program in which they can be used) into local and global variables.

**Local variable:** a local variable is a variable declared **inside a function or a block**.

It can be used only inside that function or block, it is created when the block starts and destroyed when the block ends, and it is not initialized automatically (it holds a garbage value until a value is assigned). Function parameters are also local to their function.

**Global variable:** a global variable is a variable declared **outside all functions**, usually at the top of the program.

It can be used by every function in the file (and in other files through `extern`), it exists for the whole run of the program, and it is automatically initialized to **0**.

If a local variable has the **same name** as a global variable, the local variable **hides** the global one inside its block.

```c
#include <stdio.h>

int count = 5;               /* global variable */
int total;                   /* global, not initialized: automatically 0 */

void show(void)
{
    int x = 10;              /* local to show() */
    printf("In show(): x = %d, count = %d\n", x, count);
    count++;                 /* changes the global variable */
}

int main(void)
{
    int count = 100;         /* local variable with the same name hides the global */
    show();
    printf("In main(): count = %d, total = %d\n", count, total);
    show();
    /* printf("%d", x);         error: x is not visible in main() */
    return 0;
}
```

Output:

```text
In show(): x = 10, count = 5
In main(): count = 100, total = 0
In show(): x = 10, count = 6
```

Here `main()` prints its own local `count` (100), while `show()` uses and changes the global `count` (5, then 6). The uninitialized global `total` is 0.

#### Differences Between Local and Global Variables

| Basis | Local variable | Global variable |
| --- | --- | --- |
| Where declared | Inside a function or block | Outside all functions |
| Scope (accessibility) | Only within the function or block where it is declared | Throughout the program, by all functions |
| Lifetime | Created when the block starts; destroyed when it ends | Exists for the whole run of the program |
| Default value | Garbage (not initialized automatically) | 0 (initialized automatically) |
| Memory | Stack | Data segment (static memory) |
| Effect of a change | Affects only its own function | Affects every function that uses it |
| Same name in different functions | Allowed; each function has its own variable | Only one global variable can have a given name |
| Same name as the other kind | Hides the global variable inside its block | Hidden by a local variable of the same name |
| Data sharing | Cannot share data between functions (values must be passed) | Shares data between functions without passing arguments |
| Safety | Safer; other functions cannot change it | Risky; any function can change it by mistake |
| Use | Temporary data needed only in one function | Data needed by many functions |

**Advantages of local variables:** the same name can be reused in different functions, memory is used only while the function runs, and the data is protected from other functions.

**Advantages of global variables:** they are declared once and can be used by all functions, so data can be shared without passing arguments.

**Disadvantage of global variables:** any function can change them, so errors are hard to trace; programs with many global variables are hard to understand and maintain. Local variables are therefore preferred, and global variables are used only when data must be shared.

Storage classes (`auto`, `register`, `static`, `extern`), which also decide scope and lifetime, are explained in [Functions](/topics/programming/c-functions).

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

**Definition:** an expression is a **combination of operands (variables, constants) and operators** that produces a **single value**.

Examples: `a + b`, `x * (y - 2)`, `marks >= 33`.

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

**Definition:** an operator is a **symbol that tells the compiler to perform a specific operation** on one or more **operands**.

By the number of operands, operators are **unary** (one operand, for example `-x`, `++x`), **binary** (two operands, for example `a + b`) or **ternary** (three operands: `?:`).

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

**Definition:** a statement is a **complete instruction** that the program carries out.

In C, a simple statement **ends with a semicolon (`;`)**.

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
- [C – Data Types](https://www.tutorialspoint.com/cprogramming/c_data_types.htm) — accessed 2026-11-04 (its table gives `long double` a precision of 19 decimal places; GCC on x86 reports `LDBL_DIG` = 18. It also gives `long` only as 8 bytes, which is true for 64-bit Linux and macOS but not for Windows or 32-bit systems, where it is 4 bytes, and it does not list `long long`)
- [C – Variables](https://www.tutorialspoint.com/cprogramming/c_variables.htm) — accessed 2026-11-04 (naming rules, 31 significant characters; it says variables with static storage duration are initialized to "NULL" — they are initialized to zero; NULL is a pointer value)
- [C – Scope Rules](https://www.tutorialspoint.com/cprogramming/c_scope_rules.htm) — accessed 2026-11-04 (local and global variables, default values, a local variable hiding a global one)
- [C – Operators](https://www.tutorialspoint.com/cprogramming/c_operators.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Data Types in C](https://www.geeksforgeeks.org/c/data-types-in-c/) — accessed 2026-11-04 (it gives the ranges of `float` and `double` as 3.4e−38 to 3.4e+38 and 1.7e−308 to 1.7e+308; the smallest positive normal values are about 1.2e−38 and 2.2e−308, as in `<float.h>`. It also says that `char` is signed by default, which is implementation-defined, and prints `sizeof` with `%d` instead of `%zu`)
- [Variables in C](https://www.geeksforgeeks.org/c/variables-in-c/) — accessed 2026-11-04 (naming rules)
- [Difference between Local Variable and Global Variable](https://www.geeksforgeeks.org/c/difference-between-local-variable-and-global-variable/) — accessed 2026-11-04
- [Structured Programming Approach with Advantages and Disadvantages](https://www.geeksforgeeks.org/c/structured-programming-approach-with-advantages-and-disadvantages/) — accessed 2026-11-04

**TpointTech**

- [Data Types in C](https://www.tpointtech.com/data-types-in-c) — accessed 2026-11-04 (its table gives `int` as 2 bytes while its text says 4 bytes, gives the upper limit of a 4-byte `int` as 2,147,483,648 instead of 2,147,483,647, and leaves `long long` out of the table)
- [Variables in C](https://www.tpointtech.com/variables-in-c) — accessed 2026-11-04 (naming rules, valid and invalid names, local, global, static, automatic and external variables)
- [Local Variable vs Global Variable](https://www.tpointtech.com/local-variable-vs-global-variable) — accessed 2026-11-04
- [Features of C Language](https://www.tpointtech.com/features-of-c-language) — accessed 2026-11-04 (C as a structured and mid-level language)

**Programiz**

- [C Data Types](https://www.programiz.com/c-programming/c-data-types) — accessed 2026-11-04 (sizes and format specifiers of all the types with modifiers, including `long long int` and `long double`; it gives the range of `short` as −32,767 to +32,767, which is the minimum range the standard guarantees — a 16-bit `short` on real systems holds −32,768 to 32,767)
- [C Variables, Constants and Literals](https://www.programiz.com/c-programming/c-variables-constants) — accessed 2026-11-04 (naming rules)
- [C Storage Class](https://www.programiz.com/c-programming/c-storage-class) — accessed 2026-11-04 (local and global variables)

**Additional sources**

- [C (programming language)](https://en.wikipedia.org/wiki/C_(programming_language)) — Wikipedia, accessed 2026-11-01
- [Statements](https://en.cppreference.com/w/c/language/statements) — cppreference.com, accessed 2026-11-01
- [Arithmetic types](https://en.cppreference.com/w/c/language/arithmetic_types) — cppreference.com, accessed 2026-11-04 (valid spellings of each type, minimum widths, data models)
- Sizes, limits (`<limits.h>`, `<float.h>`) and the invalid modifier combinations were checked with GCC (`-std=c11`) on 64-bit Linux, 2026-11-04
