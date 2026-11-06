---
description: C pointers - the address and indirection operators, declaration and initialization, pointer arithmetic, pointers and arrays, pointers and strings, pointer to pointer, pointers and functions, NULL, void, wild and dangling pointers, and dynamic memory allocation with malloc, calloc, realloc and free.
updated: 2026-11-04
---

### Pointer

**Definition:** a pointer is a **variable that stores the memory address of another variable**.

Through a pointer, a program can read and change the variable it points to. A pointer is a **derived data type**.

Every variable is stored at some memory location, which has an **address**. For example:

```c
int x = 25;
int *p = &x;     /* p holds the address of x */
```

| Name | Value | Address |
| --- | --- | --- |
| `x` | 25 | 1000 (for example) |
| `p` | 1000 (address of x) | 2000 |

Here **p points to x**.

### The Two Pointer Operators

1. **Address-of operator (`&`):** gives the **address** of a variable. `&x` is the address of x.
2. **Indirection (dereference, value-at) operator (`*`):** gives the **value stored at the address** held by a pointer. `*p` is the value of the variable p points to.

```c
#include <stdio.h>

int main(void)
{
    int x = 25;
    int *p = &x;

    printf("x = %d\n", x);           /* 25 */
    printf("*p = %d\n", *p);         /* 25: value at the address in p */
    *p = 40;                         /* changes x through the pointer */
    printf("x = %d\n", x);           /* 40 */
    printf("%d\n", p == &x);         /* 1: p holds the address of x */
    return 0;
}
```

Output:

```text
x = 25
*p = 25
x = 40
1
```

(Addresses can be printed with `%p`, for example `printf("%p", (void *) p);`; the actual value differs from run to run.)

### Declaration and Initialization

```text
 data_type *pointer_name;
```

```c
int   *ip;     /* pointer to int   */
float *fp;     /* pointer to float */
char  *cp;     /* pointer to char  */
```

1. In a declaration, `*` means "pointer to"; it is **not** multiplication.
2. The **data type** of a pointer is the type of the variable it points to; an `int *` must point to an `int`.
3. A pointer must be **initialized** with a valid address (`p = &x;`) or with `NULL` before it is used.
4. The **size of a pointer** does not depend on the type it points to; it depends on the machine (for example 8 bytes on a 64-bit system, 4 bytes on a 32-bit system).

### Pointer Arithmetic

Only a few arithmetic operations are allowed on pointers:

1. **Increment (`p++`) and decrement (`p--`)**
2. **Adding or subtracting an integer** (`p + n`, `p - n`)
3. **Subtracting two pointers** that point into the same array (gives the number of elements between them)
4. **Comparing** two pointers (`==`, `<`, `>` …)

**Rule:** when an integer n is added to a pointer, the address increases by **n × (size of the data type)**, not by n bytes.

| If p (an `int *`, 4-byte int) holds | p + 1 holds | p + 3 holds |
| --- | --- | --- |
| 1000 | 1004 | 1012 |

For a `char *` (1 byte) holding 1000, `p + 1` is 1001; for a `double *` (8 bytes), `p + 1` is 1008.

**Not allowed:** adding two pointers, multiplying or dividing pointers.

### Pointers and Arrays

The **name of an array is the address of its first element**: `a` is the same as `&a[0]`. So an array element can be reached through a pointer:

```text
 a[i]  ≡  *(a + i)        &a[i]  ≡  a + i
```

```c
#include <stdio.h>

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;                       /* same as p = &a[0] */
    int i;

    for (i = 0; i < 5; i++)
        printf("%d ", *(p + i));      /* same as a[i] */
    printf("\n");

    printf("%d %d\n", *p, *(p + 2));  /* 10 30 */
    p++;                              /* now points to a[1] */
    printf("%d\n", *p);               /* 20 */
    return 0;
}
```

Output:

```text
10 20 30 40 50
10 30
20
```

**Difference:** a pointer is a variable and can be changed (`p++`), but an array name is a constant address and **cannot** be changed (`a++` is an error).

### Differences Between Array and Pointer

**Array:** an array is a collection of a **fixed number of elements of the same data type**, stored in **contiguous memory locations** and accessed by an index.

Its memory is allocated when it is defined, and its size cannot change.

**Pointer:** a pointer is a **variable that stores the memory address** of another variable.

It holds one address at a time, and it can be changed to point to another location.

Although an array name is converted to the address of its first element in most expressions (so `a[i]` and `p[i]` work the same way), an array is **not** a pointer:

```c
#include <stdio.h>

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;

    printf("sizeof(a) = %zu\n", sizeof(a));   /* whole array: 5 x 4 = 20 */
    printf("sizeof(p) = %zu\n", sizeof(p));   /* only the pointer: 8 on 64-bit */
    printf("a[2] = %d, p[2] = %d\n", a[2], p[2]);

    p = &a[3];             /* a pointer can be made to point elsewhere */
    printf("*p = %d\n", *p);
    /* a = &a[3];             error: an array name cannot be assigned */
    return 0;
}
```

Output (on a 64-bit system):

```text
sizeof(a) = 20
sizeof(p) = 8
a[2] = 30, p[2] = 30
*p = 40
```

| Basis | Array | Pointer |
| --- | --- | --- |
| Definition | A collection of elements of the same type in contiguous memory | A variable that stores the address of another variable |
| Declaration | `data_type name[size];` — `int a[5];` | `data_type *name;` — `int *p;` |
| What it stores | The values of its elements | An address |
| Capacity | As many elements as its declared size | One address at a time |
| Memory allocation | Fixed block, allocated when the array is defined | Memory for the pointer itself only; it can point to memory allocated at run time (`malloc`) |
| Size | Fixed; cannot be changed after definition | The pointer's own size is fixed (4 or 8 bytes); the memory it points to can be resized (`realloc`) |
| `sizeof` | Gives the size of the **whole array** (`5 × 4 = 20` bytes) | Gives the size of the **pointer only** (8 bytes on a 64-bit system) |
| Assignment | Cannot be assigned or changed: `a = b;` and `a++` are errors | Can be assigned and changed: `p = &x;`, `p++` |
| Name | The array name is a **constant address** (address of the first element) | The pointer is a **variable** whose value is an address |
| `&` operator | `&a` is the address of the whole array (same value as `a`, different type) | `&p` is the address of the pointer variable itself |
| Initialization | With a list of values: `int a[3] = {1, 2, 3};` | With an address: `int *p = &x;` or `int *p = a;` |
| Element access | `a[i]`, which means `*(a + i)` | `*(p + i)`, or `p[i]` |
| Passing to a function | Passed as a pointer to its first element | Passed as a pointer (its value is copied) |
| Combination | An **array of pointers**: `int *arr[5];` | A **pointer to an array**: `int (*ptr)[5];` |

### Pointers and Strings

A string can be handled through a `char` pointer:

```c
#include <stdio.h>

int main(void)
{
    char *s = "Hello";      /* s points to the first character of a string literal */
    int len = 0;

    while (*(s + len) != '\0')
        len++;
    printf("%s has %d characters\n", s, len);
    return 0;
}
```

Output: `Hello has 5 characters`

A string literal such as `"Hello"` must not be modified through the pointer; to change the text, store it in an array: `char s[] = "Hello";`.

### Array of Pointers

An array whose elements are pointers. A common use is a list of strings of different lengths:

```c
char *city[3] = {"Dhaka", "Rajshahi", "Barishal"};
printf("%s\n", city[2]);      /* Barishal */
```

### Pointer to Pointer (Double Pointer)

A pointer can store the **address of another pointer**. It is declared with two asterisks.

```c
#include <stdio.h>

int main(void)
{
    int x = 7;
    int *p = &x;        /* pointer to x */
    int **pp = &p;      /* pointer to p */

    printf("%d %d %d\n", x, *p, **pp);   /* 7 7 7 */
    return 0;
}
```

`*pp` is p (the address of x), and `**pp` is the value of x.

### Pointers and Functions

**1. Call by reference (passing addresses):** in C, arguments are normally passed **by value** (the function gets copies). By passing **addresses**, a function can **change the caller's variables**, and it can return **more than one value**. (See [C: Functions](/topics/programming/c-functions).)

```c
#include <stdio.h>

void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void)
{
    int x = 5, y = 9;

    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}
```

Output: `x = 9, y = 5`

**2. Pointer to a function:** a pointer can hold the address of a function and call it.

```c
#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main(void)
{
    int (*op)(int, int);      /* pointer to a function taking two ints and returning int */

    op = add;
    printf("%d\n", op(3, 4)); /* 7  */
    op = mul;
    printf("%d\n", op(3, 4)); /* 12 */
    return 0;
}
```

### Special Kinds of Pointers

1. **NULL pointer:** a pointer that **points to nothing** (holds the value `NULL`). Pointers are initialized to `NULL` when they have no valid address yet, and are **checked before use**: `if (p != NULL) …`. Dereferencing a NULL pointer causes a crash or undefined behaviour.
2. **void pointer (generic pointer):** a pointer of type `void *` that can hold the **address of any data type**. It **cannot be dereferenced directly** and does not allow pointer arithmetic; it must first be **cast** to the correct type: `*(int *) vp`. `malloc()` returns a `void *`.
3. **Wild pointer:** a pointer that has been **declared but not initialized**, so it holds a garbage address. Using it can crash the program. **Avoid:** always initialize pointers (to `NULL` or a valid address).
4. **Dangling pointer:** a pointer that still points to memory that has been **freed** or that has **gone out of scope** (for example, the address of a local variable returned from a function). **Avoid:** set the pointer to `NULL` after `free()`, and never return the address of a local (non-`static`) variable.

### Dynamic Memory Allocation

**Static vs dynamic allocation:**

1. **Static (compile-time) allocation:** the size of variables and arrays is fixed when the program is compiled, for example `int a[100];`. Too much space wastes memory; too little cannot hold the data.
2. **Dynamic (run-time) allocation:** memory is **requested while the program runs**, in the amount actually needed, from an area called the **heap**, and **released** when no longer needed. It is done with four library functions declared in **`stdlib.h`**:

| Function | Syntax | Purpose |
| --- | --- | --- |
| `malloc()` | `p = (int *) malloc(n * sizeof(int));` | Allocates **one block** of the given number of bytes; the memory is **not initialized** (contains garbage) |
| `calloc()` | `p = (int *) calloc(n, sizeof(int));` | Allocates memory for **n elements** of the given size and **initializes all bytes to zero** |
| `realloc()` | `p = (int *) realloc(p, m * sizeof(int));` | **Changes the size** of a block allocated earlier (keeps the old contents) |
| `free()` | `free(p);` | **Releases** a block allocated by `malloc`, `calloc` or `realloc` |

`malloc`, `calloc` and `realloc` return the **address of the block** (a `void *`), or **`NULL` if the memory cannot be allocated**, so the result must be checked.

**Differences between malloc() and calloc():**

| Basis | malloc() | calloc() |
| --- | --- | --- |
| Allocation | Creates a **single block** of memory of the given size | Allocates **multiple contiguous blocks** (n elements) |
| Arguments | **One**: the total size in bytes | **Two**: the number of blocks and the size of each block |
| Syntax | `void *malloc(size_t size);` | `void *calloc(size_t num, size_t size);` |
| Initialization | **Not initialized**: contains garbage values | **Initialized to 0** (all bytes set to zero) |
| Speed | **Generally faster**, because it does not initialize the memory | **Slightly slower**, because it sets all the memory to zero |
| Overhead | No initialization overhead | Extra overhead for zero initialization |
| Use | General dynamic memory allocation | Contiguous dynamic memory allocation (for example, arrays that must start at zero) |
| On failure | Returns `NULL` | Returns `NULL` |

**Example: an array whose size is decided at run time**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n = 5, i, sum = 0;
    int *a = (int *) malloc(n * sizeof(int));

    if (a == NULL)
    {
        printf("Memory not available\n");
        return 1;
    }
    for (i = 0; i < n; i++)
        a[i] = (i + 1) * 10;          /* 10 20 30 40 50 */
    for (i = 0; i < n; i++)
        sum += a[i];
    printf("Sum = %d\n", sum);

    free(a);                           /* release the memory */
    a = NULL;                          /* avoid a dangling pointer */
    return 0;
}
```

Output: `Sum = 150`

**Memory leak:** if dynamically allocated memory is **not freed** when it is no longer needed (for example, the only pointer to it is lost), it remains reserved and cannot be reused. Programs that leak memory repeatedly can run out of memory. Every `malloc`/`calloc` should have a matching `free`.

### Advantages and Disadvantages of Pointers

**Advantages:**

1. **Call by reference:** functions can change variables of the caller and return more than one value.
2. **Dynamic memory allocation:** memory can be allocated and released at run time.
3. **Dynamic data structures:** linked lists, trees and graphs are built with pointers.
4. **Efficient handling** of arrays and strings, and of large structures (passing an address instead of copying).
5. Direct access to memory and hardware (for system programming).

**Disadvantages:**

1. Pointer errors are **hard to find**: uninitialized (wild) and dangling pointers can crash the program or corrupt data.
2. Forgetting to free memory causes **memory leaks**.
3. Programs with many pointers are harder to read and understand.

## References {#references}

**TutorialsPoint**

- [C – Pointers](https://www.tutorialspoint.com/cprogramming/c_pointers.htm) — accessed 2026-11-01
- [C – Memory Management](https://www.tutorialspoint.com/cprogramming/c_memory_management.htm) — accessed 2026-11-01
- [Pointer vs Array in C](https://www.tutorialspoint.com/cprogramming/c_pointer_vs_array.htm) — accessed 2026-11-04 (its table says a pointer cannot be initialized when it is defined; it can, for example `int *p = &x;` — and says a pointer "can be resized"; the pointer itself has a fixed size, only the memory it points to can be resized)

**GeeksforGeeks**

- [Difference Between malloc() and calloc()](https://www.geeksforgeeks.org/c/difference-between-malloc-and-calloc-with-examples/) — accessed 2026-11-01
- [Dangling, Void, Null and Wild Pointers in C](https://www.geeksforgeeks.org/c/dangling-void-null-wild-pointers/) — accessed 2026-11-01
- [Difference between Arrays and Pointers](https://www.geeksforgeeks.org/c/difference-between-array-and-pointers/) — accessed 2026-11-04

**TpointTech**

- [Pointer vs Array in C](https://www.tpointtech.com/pointer-vs-array-in-c) — accessed 2026-11-04 (it calls arrays "static" and pointers "dynamic"; it is the memory a pointer points to that can be allocated dynamically, not the pointer itself)

**Programiz**

- [Relationship Between Arrays and Pointers](https://www.programiz.com/c-programming/c-pointers-arrays) — accessed 2026-11-04 (`x[i]` is equivalent to `*(x + i)`; arrays and pointers are not the same)

**Additional sources**

- [calloc](https://en.cppreference.com/w/c/memory/calloc) — cppreference.com, accessed 2026-11-01
