---
description: Structured program design with sequence, selection and iteration, top-down design and stepwise refinement, and modular program design with modules, cohesion and coupling.
updated: 2026-11-01
---

## Structured Program Design {#structured-program-design}

**Definition:** structured programming (structured program design) is a method of designing programs in which the program is built from **a small set of standard control structures**, each with **one entry and one exit**, and organised in **blocks**, without unrestricted jumps (**goto**).

The result is a program whose flow can be followed from top to bottom, which makes it easy to read, test and change.

### The Three Basic Control Structures

1. **Sequence:** statements are carried out **one after another**, in the order in which they are written.
2. **Selection (decision):** **one of two or more paths** is chosen according to a condition (`if`, `if-else`, `switch`).
3. **Iteration (repetition, loop):** a group of statements is **repeated** while a condition is true (`for`, `while`, `do-while`).

**Structured program theorem:** Böhm and Jacopini (1966) showed that **sequence, selection and iteration are enough to express any computable function**, so `goto` is never essential. Edsger W. Dijkstra's letter **"Go To Statement Considered Harmful" (1968)** made the structured programming movement popular. Programs full of `goto` jumps, whose flow is tangled and hard to follow, are called **"spaghetti code"**.

```c
/* Sequence, selection and iteration in C */
int sum = 0;                    /* sequence  */
for (int i = 1; i <= 10; i++)   /* iteration */
    if (i % 2 == 0)             /* selection */
        sum = sum + i;          /* adds the even numbers 2 + 4 + ... + 10 = 30 */
```

**Block structure:** statements are grouped into **blocks** that act like one statement, for example `{ … }` in C, `BEGIN … END` in Pascal and indentation in Python.

### Top-Down Design and Stepwise Refinement

Structured programs are usually designed **top-down**:

1. Start with the **whole problem** as one task.
2. **Divide** it into a few major sub-tasks.
3. **Refine** each sub-task into smaller, more detailed steps (**stepwise refinement**).
4. Continue until each step is simple enough to be coded directly with the three control structures.

**Example: preparing the result of a class**

```text
 Prepare result
 ├── Read the marks of each student
 ├── Calculate the total and average of each student
 │     ├── Add the marks of all subjects
 │     └── Divide by the number of subjects
 ├── Assign the grade
 └── Print the result sheet
```

The opposite approach, **bottom-up design**, first builds and tests the small, low-level parts and then combines them into larger parts. It is suitable when the low-level components are already known.

### Advantages of Structured Programming

1. Programs are **easy to read and understand**, because the flow goes from top to bottom.
2. **Easier to test, debug and maintain**: each block can be checked on its own.
3. **Less development time and effort**, and higher programmer productivity.
4. Reduced complexity: the program is divided into small, manageable parts.
5. Programs written in structured high-level languages are largely **machine-independent**.

### Disadvantages of Structured Programming

1. Programs may be **slower** and use more memory than hand-written machine-level code, because the code must be translated by a compiler.
2. Deeply **nested** loops and conditions can become hard to follow in complex programs.
3. Data and the functions that use it are kept separate, which makes very large programs harder to manage (a problem addressed by [object-oriented programming](/topics/programming/oop-concepts)).

**Structured languages:** C, Pascal, ALGOL, and most modern languages (C++, Java, C#, Python) support structured programming. Early assembly language and early BASIC, which depended on jumps, are examples of unstructured programming.

### Differences Between Structured and Unstructured Programming

| Basis | Structured programming | Unstructured programming |
| --- | --- | --- |
| Organisation | Divided into blocks, functions and modules | One continuous block of code |
| Flow control | Sequence, selection and loops; avoids `goto` | Depends on `goto` jumps |
| Readability | Easy to read and understand | Hard to read ("spaghetti code") |
| Debugging and maintenance | Easy | Difficult |
| Code repetition | Avoided (code reused through functions) | Code is often duplicated |
| Suitable for | Small, medium and large programs | Only small, simple programs |
| Examples | C, Pascal | Early BASIC, assembly language |

## Modular Program Design {#modular-program-design}

**Definition:** modular programming (modular program design) is a technique in which a large program is **divided into smaller, separate, self-contained parts called modules**, each of which performs **one specific task**.

The modules are written, tested and debugged separately and are then combined to form the complete program.

**Module:** a module is an independent unit of a program that has a **name**, a **specific task**, **inputs** and **outputs**, and that can be called (used) by other parts of the program.

In C, a module is usually a **function** (or a separate source file); in object-oriented languages, a **class** with its data and methods is a module.

### Structure of a Modular Program

1. A **main module** controls the program and calls the other modules in the required order.
2. Each **sub-module** carries out one task and may itself call smaller modules.
3. Modules communicate through **parameters** (inputs) and **return values** (outputs), not through shared global data.

```text
                 Main module
        ┌────────────┼────────────┐
   Read marks    Calculate     Print result
                  average
```

**Example in C:**

```c
#include <stdio.h>

/* Module 1: read the marks of n students */
void read_marks(int marks[], int n)
{
    for (int i = 0; i < n; i++)
        scanf("%d", &marks[i]);
}

/* Module 2: calculate the average */
float average(const int marks[], int n)
{
    int sum = 0;
    for (int i = 0; i < n; i++)
        sum += marks[i];
    return (float) sum / n;
}

/* Module 3: print the result */
void print_result(float avg)
{
    printf("Average = %.2f\n", avg);
}

/* Main module: controls the order of the other modules */
int main(void)
{
    int marks[5];

    read_marks(marks, 5);
    print_result(average(marks, 5));
    return 0;
}
```

With the input 70 80 90 60 75, the program prints `Average = 75.00`.

### How to Divide a Program into Modules

1. If the program is centred on **data**, group the operations on the same data into one module.
2. If the program provides **different services**, make one module for each function (input, processing, output).
3. Each module should do **one job** and should be **small enough** to understand and test easily.

### Cohesion and Coupling

The quality of a modular design is judged by two measures. A good design has **high cohesion and low coupling**.

**Cohesion** is the **strength of the relationship between the elements inside one module**: how closely they work together for a single purpose.

**High cohesion is desirable.** Types of cohesion, from the **best (highest)** to the **worst (lowest)**:

1. **Functional cohesion:** all elements contribute to **one single task** (the ideal).
2. **Sequential cohesion:** the output of one element is the input of the next.
3. **Communicational cohesion:** the elements work on the **same data**.
4. **Procedural cohesion:** the elements are grouped because they are carried out in a **certain order**.
5. **Temporal cohesion:** the elements are grouped because they run at the **same time** (for example, initialisation tasks).
6. **Logical cohesion:** the elements do **similar kinds** of tasks but different functions (for example, all input routines).
7. **Coincidental cohesion:** the elements have **no meaningful relationship** (the worst).

**Coupling** is the **degree of dependence between different modules**.

**Low coupling is desirable**, so that a change in one module does not affect the others. Types of coupling, from the **best (lowest)** to the **worst (highest)**:

1. **Data coupling:** modules share only the **data they need**, passed as parameters (the best).
2. **Stamp coupling:** a **whole data structure** is passed, although only part of it is used.
3. **Control coupling:** one module passes a **control flag** that decides how the other module behaves.
4. **External coupling:** modules depend on something **outside** the program (a device, a file format or a protocol).
5. **Common coupling:** modules share **global data**.
6. **Content coupling:** one module **directly changes the data or code of another** (the worst).

| Basis | Cohesion | Coupling |
| --- | --- | --- |
| Measures | Relationship **within** a module | Dependence **between** modules |
| Desirable level | High | Low |
| Best type | Functional | Data |
| Worst type | Coincidental | Content |

### Advantages of Modular Programming

1. **Easier to design, understand and manage**: each module is small and has one task.
2. **Parallel development**: different programmers can write different modules at the same time.
3. **Reusability**: a module (for example, a function for sorting) can be reused in other programs.
4. **Easier testing and debugging**: each module is tested separately, and errors are isolated to one module.
5. **Easier maintenance**: a module can be changed or replaced without rewriting the whole program.
6. Avoids writing the same code many times.

### Disadvantages of Modular Programming

1. Designing the modules and the **interfaces** between them needs careful planning.
2. Calling modules (functions) adds a little **time and memory overhead**.
3. Combining modules written separately (**integration**) can cause errors if the interfaces do not match.

### Relationship Between Structured and Modular Design

The two are used together: **modular design** decides **how the program is divided** into modules (usually top-down), and **structured design** decides **how each module is written** (with sequence, selection and iteration only).

## References {#references}

**TutorialsPoint**

- [Programming Methodologies – Quick Guide](https://www.tutorialspoint.com/programming_methodologies/programming_methodologies_quick_guide.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Structured Programming Approach with Advantages and Disadvantages](https://www.geeksforgeeks.org/c/structured-programming-approach-with-advantages-and-disadvantages/) — accessed 2026-11-01
- [Difference between structured and unstructured programming](https://www.geeksforgeeks.org/dsa/difference-between-structured-and-unstructured-programming/) — accessed 2026-11-01
- [Coupling and Cohesion – Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-engineering-coupling-and-cohesion/) — accessed 2026-11-01

**Additional sources**

- [Structured programming](https://en.wikipedia.org/wiki/Structured_programming) — Wikipedia, accessed 2026-11-01
