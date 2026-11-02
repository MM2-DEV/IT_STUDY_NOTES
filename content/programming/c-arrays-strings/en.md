---
description: C arrays (declaration, initialization, memory layout, one- and two-dimensional arrays, passing arrays to functions) and strings (null-terminated character arrays, reading and printing, and the string.h library functions), with example programs.
updated: 2026-11-01
---

## Arrays {#arrays}

**Definition:** an array is a **fixed-size collection of elements of the same data type**, stored in **contiguous (consecutive) memory locations** and referred to by **one common name**. Each element is accessed by its **index (subscript)**.

**Why arrays are needed:** to store the marks of 100 students, declaring 100 separate variables is impractical; one array `int marks[100];` stores them all, and a loop can process them.

(The array as a data structure, with its operations, is covered in [Arrays](/topics/data-structures-algorithms/arrays).)

### One-Dimensional Array

**Declaration:**

```text
 data_type array_name[size];
```

```c
int marks[5];          /* 5 integers: marks[0] to marks[4] */
float price[10];
char name[20];
```

The size must be a **positive integer constant**. (C99 also allows variable-length arrays inside functions.)

**Initialization:**

```c
int a[5] = {10, 20, 30, 40, 50};   /* all elements given                  */
int b[]  = {1, 2, 3};              /* size taken from the list: 3          */
int c[5] = {1, 2};                 /* rest are 0: {1, 2, 0, 0, 0}          */
int d[5] = {0};                    /* all elements 0                       */
```

**Indexing:** in C, the index **starts at 0**. In an array of size n, the first element is `a[0]` and the last is `a[n − 1]`. So `marks[9]` is the **10th** element.

**Memory representation:** the elements are stored one after another. If `int a[5]` starts at address 1000 and an `int` takes 4 bytes:

| Element | a[0] | a[1] | a[2] | a[3] | a[4] |
| --- | --- | --- | --- | --- | --- |
| Value | 10 | 20 | 30 | 40 | 50 |
| Address | 1000 | 1004 | 1008 | 1012 | 1016 |

**Address of an element:**

```text
 address of a[i] = base address + i × (size of one element)
```

For example, the address of a[3] = 1000 + 3 × 4 = 1012.

**Size of an array:** total bytes = number of elements × size of one element. `sizeof(a)` gives 5 × 4 = 20 bytes, and the number of elements is `sizeof(a) / sizeof(a[0])`.

**No bounds checking:** C does **not check** whether an index is inside the array. Using `a[5]` or `a[-1]` for `int a[5]` reads or writes memory outside the array, which gives wrong results or crashes the program; the programmer must keep indexes within 0 to n − 1.

**Example: reading numbers and finding their sum, average and largest value**

```c
#include <stdio.h>

int main(void)
{
    int a[5] = {12, 45, 7, 30, 21};
    int i, sum = 0, max = a[0];

    for (i = 0; i < 5; i++)
    {
        sum += a[i];
        if (a[i] > max)
            max = a[i];
    }
    printf("Sum = %d\n", sum);
    printf("Average = %.2f\n", sum / 5.0);
    printf("Largest = %d\n", max);
    return 0;
}
```

Output:

```text
Sum = 115
Average = 23.00
Largest = 45
```

**Example: reversing an array**

```c
#include <stdio.h>

int main(void)
{
    int a[6] = {1, 2, 3, 4, 5, 6};
    int i, t, n = 6;

    for (i = 0; i < n / 2; i++)
    {
        t = a[i];
        a[i] = a[n - 1 - i];
        a[n - 1 - i] = t;
    }
    for (i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `6 5 4 3 2 1`

### Two-Dimensional Array

A two-dimensional array is an **array of arrays**, arranged as a **table (matrix) of rows and columns**.

```text
 data_type array_name[rows][columns];
```

```c
int m[2][3] = { {1, 2, 3},
                {4, 5, 6} };      /* 2 rows, 3 columns, 6 elements */
```

The element in row i and column j is `m[i][j]`; here `m[1][2]` is 6. When initializing, the number of **rows may be omitted** but the number of **columns must be given**: `int m[][3] = {1, 2, 3, 4, 5, 6};`.

**Memory representation:** C stores two-dimensional arrays in **row-major order**: all elements of row 0, then all of row 1, and so on: 1, 2, 3, 4, 5, 6. For an array with C columns:

```text
 address of m[i][j] = base address + (i × C + j) × (size of one element)
```

For `int m[2][3]` starting at 2000, the address of m[1][2] = 2000 + (1 × 3 + 2) × 4 = 2020.

**Example: addition of two matrices**

```c
#include <stdio.h>

int main(void)
{
    int a[2][2] = { {1, 2}, {3, 4} };
    int b[2][2] = { {5, 6}, {7, 8} };
    int c[2][2], i, j;

    for (i = 0; i < 2; i++)
        for (j = 0; j < 2; j++)
            c[i][j] = a[i][j] + b[i][j];

    for (i = 0; i < 2; i++)
    {
        for (j = 0; j < 2; j++)
            printf("%d ", c[i][j]);
        printf("\n");
    }
    return 0;
}
```

Output:

```text
6 8
10 12
```

**Example: multiplication of two matrices** (an m × n matrix times an n × p matrix gives an m × p matrix; c[i][j] = Σ a[i][k] × b[k][j])

```c
#include <stdio.h>

int main(void)
{
    int a[2][2] = { {1, 2}, {3, 4} };
    int b[2][2] = { {5, 6}, {7, 8} };
    int c[2][2] = {0}, i, j, k;

    for (i = 0; i < 2; i++)
        for (j = 0; j < 2; j++)
            for (k = 0; k < 2; k++)
                c[i][j] += a[i][k] * b[k][j];

    for (i = 0; i < 2; i++)
        printf("%d %d\n", c[i][0], c[i][1]);
    return 0;
}
```

Output:

```text
19 22
43 50
```

### Passing an Array to a Function

When an array name is passed to a function, the **address of its first element** is passed (not a copy of the array), so the function can change the original array. The size is usually passed as a separate argument.

```c
#include <stdio.h>

void doubleAll(int arr[], int n)
{
    for (int i = 0; i < n; i++)
        arr[i] = arr[i] * 2;      /* changes the caller's array */
}

int main(void)
{
    int a[4] = {1, 2, 3, 4};

    doubleAll(a, 4);
    for (int i = 0; i < 4; i++)
        printf("%d ", a[i]);
    printf("\n");
    return 0;
}
```

Output: `2 4 6 8`

### Advantages and Disadvantages of Arrays

**Advantages:**

1. Stores many values of the same type under **one name**.
2. **Direct (random) access** to any element by its index, in constant time.
3. Easy to process with **loops**.
4. Used to build other data structures (matrices, stacks, queues).

**Disadvantages:**

1. **Fixed size**: the size must be decided in advance and cannot change; unused space is wasted.
2. All elements must be of the **same type**.
3. **Inserting and deleting** in the middle needs shifting of elements, which is slow.
4. **No bounds checking** in C.

## Strings {#strings}

**Definition:** in C, a string is a **one-dimensional array of characters terminated by the null character `'\0'`**. C has no separate string type; the `'\0'` marks where the string ends.

### Declaration and Initialization

```c
char s1[6] = {'H', 'e', 'l', 'l', 'o', '\0'};   /* character by character      */
char s2[]  = "Hello";                            /* '\0' is added automatically  */
char s3[20];                                     /* room for 19 characters + '\0' */
```

**Memory representation of "Hello":**

| Index | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Character | 'H' | 'e' | 'l' | 'l' | 'o' | '\0' |

The string "Hello" has **length 5** but needs **6 bytes** (one extra for `'\0'`). The array must always have room for the null character.

**Character vs string:** `'A'` is a character constant (1 byte); `"A"` is a string constant (2 bytes: `'A'` and `'\0'`).

### Reading and Printing Strings

| Function | Use | Note |
| --- | --- | --- |
| `scanf("%s", s)` | Reads a word | Stops at the first space, tab or newline; no `&` is needed, because the array name is already an address |
| `fgets(s, size, stdin)` | Reads a whole line, including spaces | Reads at most size − 1 characters, so it is safe; keeps the newline `'\n'` |
| `gets(s)` | Reads a line | **Unsafe** (no limit, causes buffer overflow); deprecated in C99 and **removed in C11**; never use it |
| `printf("%s", s)` | Prints a string | Prints characters up to `'\0'` |
| `puts(s)` | Prints a string and a newline | |

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char name[50];

    printf("Enter your name: ");
    if (fgets(name, sizeof name, stdin) != NULL)
    {
        name[strcspn(name, "\n")] = '\0';    /* remove the newline */
        printf("Hello, %s!\n", name);
    }
    return 0;
}
```

For the input `Rahim Uddin`, the output is `Hello, Rahim Uddin!` (with `scanf("%s", …)` only `Rahim` would be read).

### String Library Functions (string.h)

| Function | Purpose | Example | Result |
| --- | --- | --- | --- |
| `strlen(s)` | Length of s (not counting `'\0'`) | `strlen("Hello")` | 5 |
| `strcpy(d, s)` | Copies s into d | `strcpy(d, "Hi")` | d = "Hi" |
| `strncpy(d, s, n)` | Copies at most n characters | | |
| `strcat(d, s)` | Appends (joins) s to the end of d | d = "Good", `strcat(d, "Day")` | d = "GoodDay" |
| `strncat(d, s, n)` | Appends at most n characters | | |
| `strcmp(s1, s2)` | Compares two strings | `strcmp("abc", "abd")` | negative (< 0) |
| `strncmp(s1, s2, n)` | Compares the first n characters | | |
| `strchr(s, c)` | Finds the first occurrence of character c | | Pointer to it, or NULL |
| `strrchr(s, c)` | Finds the last occurrence of c | | |
| `strstr(s1, s2)` | Finds the first occurrence of s2 in s1 | | Pointer to it, or NULL |
| `strtok(s, delim)` | Splits s into tokens | | |

**Result of `strcmp(s1, s2)`:**

1. **0** if the strings are **equal**
2. **Negative** if s1 comes **before** s2 (in character-code order)
3. **Positive** if s1 comes **after** s2

Strings cannot be compared with `==` or copied with `=`; `strcmp` and `strcpy` must be used. The functions `toupper(c)` and `tolower(c)` (in `ctype.h`) convert a single character to upper or lower case.

**Example: using the string functions**

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char s1[30] = "Good";
    char s2[] = "Day";
    char s3[30];

    printf("%zu\n", strlen(s1));       /* 4 */
    strcat(s1, s2);
    printf("%s\n", s1);                /* GoodDay */
    strcpy(s3, s1);
    printf("%s\n", s3);                /* GoodDay */
    printf("%d\n", strcmp(s1, s3) == 0);   /* 1: the strings are equal */
    return 0;
}
```

**Example: string length and reverse without library functions**

```c
#include <stdio.h>

int main(void)
{
    char s[] = "PROGRAM";
    int len = 0, i;
    char t;

    while (s[len] != '\0')       /* count characters up to '\0' */
        len++;

    for (i = 0; i < len / 2; i++)
    {
        t = s[i];
        s[i] = s[len - 1 - i];
        s[len - 1 - i] = t;
    }
    printf("Length = %d, Reverse = %s\n", len, s);
    return 0;
}
```

Output: `Length = 7, Reverse = MARGORP`

**Example: checking a palindrome** (a word that reads the same backwards, such as "MADAM")

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char s[] = "MADAM";
    int i, n = strlen(s), ok = 1;

    for (i = 0; i < n / 2; i++)
        if (s[i] != s[n - 1 - i])
        {
            ok = 0;
            break;
        }
    printf("%s is %sa palindrome\n", s, ok ? "" : "not ");
    return 0;
}
```

Output: `MADAM is a palindrome`

### Array of Strings

A list of strings is stored in a **two-dimensional character array**: each row holds one string.

```c
char names[3][10] = {"Dhaka", "Khulna", "Sylhet"};
printf("%s\n", names[1]);      /* Khulna */
```

## References {#references}

**TutorialsPoint**

- [C – Arrays](https://www.tutorialspoint.com/cprogramming/c_arrays.htm) — accessed 2026-11-01
- [C – Strings](https://www.tutorialspoint.com/cprogramming/c_strings.htm) — accessed 2026-11-01

**Additional sources**

- [gets, gets_s](https://en.cppreference.com/w/c/io/gets) — cppreference.com, accessed 2026-11-01
- [Null-terminated byte strings](https://en.cppreference.com/w/c/string/byte) — cppreference.com, accessed 2026-11-01
