---
description: C structures (definition, declaration, initialization, member access with . and ->, arrays of structures, nested structures, structures and functions, typedef), unions and their difference from structures, enumerations, and bit-fields.
updated: 2026-11-01
---

## Structures {#structures}

**Definition:** a structure is a **user-defined data type** that **groups variables of different data types** under **one name**. Each variable inside a structure is called a **member** (or field). It is declared with the keyword **`struct`**.

**Why structures are needed:** an array can hold only values of **one** type. A student's record has a roll number (int), a name (string) and marks (float); a structure keeps these related values of different types together as one unit.

### Declaring a Structure

```text
 struct tag_name
 {
     data_type member1;
     data_type member2;
     ...
 };                          /* note the semicolon */
```

```c
struct student
{
    int   roll;
    char  name[30];
    float marks;
};
```

Declaring the structure only describes a **template**; it **reserves no memory**. Memory is reserved when **structure variables** are declared:

```c
struct student s1, s2;            /* two variables of type struct student */
```

Variables can also be declared together with the structure: `struct student { … } s1, s2;`.

### Initializing and Accessing Members

1. **Dot operator (`.`):** accesses a member through a structure **variable**: `s1.roll`.
2. **Arrow operator (`->`):** accesses a member through a **pointer** to a structure: `p->roll` (same as `(*p).roll`).

```c
#include <stdio.h>
#include <string.h>

struct student
{
    int   roll;
    char  name[30];
    float marks;
};

int main(void)
{
    struct student s1 = {101, "Rahim", 78.5};   /* initialization in member order */
    struct student s2;
    struct student *p = &s2;

    s2.roll = 102;                  /* dot operator */
    strcpy(s2.name, "Karim");       /* strings are copied with strcpy */
    p->marks = 85.0;                /* arrow operator through a pointer */

    printf("%d %s %.1f\n", s1.roll, s1.name, s1.marks);
    printf("%d %s %.1f\n", p->roll, p->name, s2.marks);
    return 0;
}
```

Output:

```text
101 Rahim 78.5
102 Karim 85.0
```

**Copying:** one structure variable can be assigned to another of the same type with `=` (all members are copied): `s2 = s1;`. Structures **cannot be compared** with `==`; members must be compared one by one.

### Memory Size of a Structure

Each member gets its **own memory**, one after another, so the size of a structure is **at least the sum of the sizes of its members**. The compiler may add unused bytes (**padding**) between members so that each member is properly aligned, so the size can be larger than the sum. For example, on a typical system `struct { char c; int i; }` has a size of 8 bytes, not 5 (1 + 4), because 3 padding bytes follow `c`. Use `sizeof` to find the actual size.

### Array of Structures

An array whose elements are structures, used to store many records:

```c
#include <stdio.h>

struct student
{
    int   roll;
    float marks;
};

int main(void)
{
    struct student s[3] = { {1, 72.5}, {2, 88.0}, {3, 65.0} };
    int i, top = 0;

    for (i = 1; i < 3; i++)
        if (s[i].marks > s[top].marks)
            top = i;

    printf("Highest: roll %d with %.1f\n", s[top].roll, s[top].marks);
    return 0;
}
```

Output: `Highest: roll 2 with 88.0`

### Nested Structures

A structure can be a **member of another structure**:

```c
struct date
{
    int day, month, year;
};

struct employee
{
    int id;
    struct date join;          /* nested structure */
};

struct employee e = {7, {1, 11, 2026}};
/* e.join.year is 2026 */
```

### Structures and Functions

1. **Passing a member:** `show(s1.marks);`
2. **Passing a whole structure by value:** the function gets a **copy**; changes do not affect the original.
3. **Passing a pointer to a structure (by reference):** the function can change the original, and copying a large structure is avoided.

```c
#include <stdio.h>

struct point { int x, y; };

void moveRight(struct point *p, int d)
{
    p->x += d;                 /* changes the caller's structure */
}

int main(void)
{
    struct point pt = {2, 5};

    moveRight(&pt, 3);
    printf("(%d, %d)\n", pt.x, pt.y);
    return 0;
}
```

Output: `(5, 5)`

### typedef

**`typedef`** gives a **new name (alias)** to an existing data type, so that the keyword `struct` need not be repeated:

```c
typedef struct
{
    int   roll;
    float marks;
} Student;

Student s1, s2;                /* no "struct" keyword needed */

typedef unsigned int uint;     /* typedef works with any type */
uint count = 10;
```

### Enumeration (enum)

An **enumeration** is a user-defined type consisting of **named integer constants**. By default, the first name has the value 0 and each next name is one more.

```c
enum day { SUN, MON, TUE, WED };       /* SUN = 0, MON = 1, TUE = 2, WED = 3 */
enum color { RED = 1, GREEN = 5, BLUE }; /* BLUE = 6 */
enum day today = TUE;                  /* today has the value 2 */
```

## Unions {#unions}

**Definition:** a union is a **user-defined data type**, declared with the keyword **`union`**, whose members **share the same memory location**. Its syntax is the same as that of a structure, but **only one member can hold a valid value at any time**.

```c
union data
{
    int   i;
    float f;
    char  str[20];
};
```

**Memory size:** the size of a union is the **size of its largest member** (plus any padding), because all members start at the same address. Here the largest member is `str` (20 bytes), so `sizeof(union data)` is 20, whereas a structure with the same three members needs 4 + 4 + 20 = 28 bytes.

**Only one member at a time:** storing a value in one member overwrites the others, so only the **most recently assigned** member is meaningful.

```c
#include <stdio.h>
#include <string.h>

union data
{
    int   i;
    float f;
    char  str[20];
};

int main(void)
{
    union data d;

    printf("Size = %zu bytes\n", sizeof(d));
    d.i = 10;
    printf("d.i = %d\n", d.i);           /* valid */
    d.f = 220.5;
    printf("d.f = %.1f\n", d.f);         /* valid; d.i is now overwritten */
    strcpy(d.str, "C Programming");
    printf("d.str = %s\n", d.str);       /* valid; d.i and d.f are now garbage */
    return 0;
}
```

Output:

```text
Size = 20 bytes
d.i = 10
d.f = 220.5
d.str = C Programming
```

**Uses of unions:**

1. **Saving memory** when only one of several members is needed at a time.
2. Storing a value that may be of **different types** at different times (for example, a variable that holds either an integer or a real number, together with a flag that tells which).
3. Looking at the **same bytes in different ways** in low-level programming.

### Differences Between Structure and Union

| Basis | Structure | Union |
| --- | --- | --- |
| Purpose | Groups members of different types into one unit | Stores members of different types in one shared memory location |
| Keyword | `struct` | `union` |
| Memory | Each member has **its own** memory | All members **share** the same memory |
| Size | Sum of the members' sizes (plus padding) | Size of the **largest** member (plus padding) |
| Example (int, float, char[20]) | 28 bytes | 20 bytes |
| Values at a time | **All** members hold values together | Only **one** member holds a valid value |
| Overlap of members | Members do not overlap | Members fully overlap (all start at the same address) |
| Changing a member | Does not affect other members | Overwrites the other members |
| Initialization | All members can be initialized | Only the first member (by default) |
| Use | Grouping related data of a record | Saving memory when only one member is used at a time |

## Bit-fields {#bit-fields}

**Definition:** a bit-field is a **member of a structure (or union) whose size is given in bits**, instead of the full size of its type. Bit-fields let several small values be **packed into one word** to save memory.

```text
 struct tag
 {
     type member_name : width;     /* width = number of bits */
 };
```

**Allowed types:** `unsigned int`, `signed int`, `int` (and `_Bool` from C99). An **unsigned** bit-field of width n holds values from **0 to 2ⁿ − 1**; a **signed** one holds −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1. The width must not be larger than the number of bits in the type.

**Example: storing a date compactly**

```c
#include <stdio.h>

struct date
{
    unsigned int day   : 5;    /* 1 to 31   needs 5 bits  (0 to 31)   */
    unsigned int month : 4;    /* 1 to 12   needs 4 bits  (0 to 15)   */
    unsigned int year  : 12;   /* 0 to 4095 needs 12 bits             */
};

int main(void)
{
    struct date d = {1, 11, 2026};

    printf("%u/%u/%u\n", d.day, d.month, d.year);
    printf("Size = %zu bytes\n", sizeof(d));
    return 0;
}
```

Output (on a typical system):

```text
1/11/2026
Size = 4 bytes
```

The 5 + 4 + 12 = 21 bits fit into one 4-byte unit, whereas three ordinary `unsigned int` members would need 12 bytes.

**Overflow:** if a value is too large for its width, only the low bits are kept. For `unsigned int b : 3;` (values 0 to 7), storing 8 gives 0.

**Restrictions on bit-fields:**

1. The **address operator `&` cannot be applied** to a bit-field, so **pointers to bit-fields** are not possible (a bit-field may not start at a byte boundary). Hence a bit-field cannot be read with `scanf("%u", &d.day)`.
2. **Arrays of bit-fields** are not allowed.
3. `sizeof` cannot be applied to a bit-field member.
4. The order and packing of bits inside a word are **implementation-defined**, so bit-field layouts are not portable between compilers.
5. A **nameless bit-field of width 0** (`unsigned : 0;`) forces the next bit-field to start in a new storage unit.

**Uses of bit-fields:**

1. **Saving memory** when many small values (flags, codes) must be stored, for example in embedded systems.
2. Representing **hardware registers** and **status flags** whose individual bits have meanings.
3. Packing data in communication protocols and file formats.

## References {#references}

**GeeksforGeeks**

- [Difference Between Structure and Union in C](https://www.geeksforgeeks.org/c/structure-vs-union-in-c/) — accessed 2026-11-01

**TutorialsPoint**

- [C – Structures](https://www.tutorialspoint.com/cprogramming/c_structures.htm) — accessed 2026-11-01
- [C – Unions](https://www.tutorialspoint.com/cprogramming/c_unions.htm) — accessed 2026-11-01
- [C – Bit Fields](https://www.tutorialspoint.com/cprogramming/c_bit_fields.htm) — accessed 2026-11-01

**Additional sources**

- [Bit-fields](https://en.cppreference.com/w/c/language/bit_field) — cppreference.com, accessed 2026-11-01
