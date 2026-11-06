---
description: Computer programs and programming, the steps of program development, problem-solving techniques, algorithm specification and development, good programming style, and types of errors, testing and debugging.
updated: 2026-11-01
---

## Introduction to Computer Programming {#introduction-to-computer-programming}

**Computer program:** a computer program is a **sequence of instructions**, written in a **programming language**, that tells a computer to perform a specific task.

A program may be only two lines long or millions of lines long.

**Programming:** **writing** computer programs is called **programming** (or **coding**). A person who writes programs is a **programmer**.

**Programming language:** a programming language is a formal language, with its own rules of **syntax** (form) and **semantics** (meaning), used to write instructions that a computer can carry out.

Examples:

1. C
2. C++
3. Java
4. Python
5. PHP

(The types of programming languages are explained in [Programming Languages and Paradigms](/topics/programming/programming-languages-and-paradigms).)

**Example:** the C statement below is a one-line instruction that tells the computer to display a message:

```c
printf("Hello, World!");
```

**Why programs are needed:** a computer has no intelligence of its own; it can solve a problem only when it is given a **step-by-step program**. All software, from a word processor to a mobile banking app, is made of programs.

**Uses of computer programs:**

1. Everyday software: word processors (MS Word), spreadsheets (MS Excel), web browsers
2. Business: accounting, banking and billing systems
3. Communication: SMS, chat and voice calls on mobile phones
4. Medicine: controlling medical equipment such as ultrasound and X-ray machines
5. Films and games: creating graphics and special effects

## Steps of Programming {#steps-of-programming}

Writing a program is not just typing code. A program is developed in a series of steps, called the **program development life cycle**:

1. **Problem definition**
2. **Problem analysis**
3. **Algorithm development (design)**
4. **Coding and documentation**
5. **Testing and debugging**
6. **Maintenance**

### 1. Problem Definition

State **clearly and exactly what the program must do**. A clear problem statement defines the scope of the work and gives a basis for checking the finished program.

**Example:** "Write a C program that calculates the area of a circle from its radius."

### 2. Problem Analysis

Find out what is needed to solve the problem:

1. **Input:** the data to be supplied (the radius r).
2. **Output:** the results to be produced (the area).
3. **Processing:** the formulas and rules to be used (area = π × r²).
4. **Variables and constants** needed (radius, area, π = 3.14159).

### 3. Algorithm Development (Design)

Write a **step-by-step plan** of the solution, as an **algorithm**, a **flowchart** or **pseudocode** (see [Problem-Solving Techniques](#problem-solving-techniques)). A large problem is divided into smaller modules.

```text
 Step 1: Start
 Step 2: Read the radius r
 Step 3: area ← 3.14159 × r × r
 Step 4: Print area
 Step 5: Stop
```

### 4. Coding and Documentation

Translate the algorithm into a **programming language** (writing the **source code**) and add **comments** that explain it.

```c
#include <stdio.h>

/* Program: area of a circle
   Input:   radius r
   Output:  area = PI * r * r */
#define PI 3.14159

int main(void)
{
    float radius, area;

    printf("Enter the radius: ");
    scanf("%f", &radius);

    area = PI * radius * radius;      /* formula from the analysis step */

    printf("Area = %.2f\n", area);
    return 0;
}
```

For radius 5, the program prints `Area = 78.54`.

**Documentation** also includes the user manual and technical documents (algorithms, flowcharts, test plans), which help users and later programmers.

### 5. Testing and Debugging

**Run the program with different test data**, compare the results with the expected results, and **find and remove the errors** (see [Testing and Debugging](#testing-and-debugging)).

### 6. Maintenance

After the program is in use, it is **modified to correct errors found later, to adapt it to a changed environment, or to add new features**. Problems found during maintenance can send the work back to an earlier step, so the steps form a **cycle**.

**Types of maintenance:**

1. **Corrective:** fixing errors found after the program is delivered.
2. **Adaptive:** changing the program to suit a changed environment (new hardware, operating system or rules).
3. **Perfective:** adding new features or improving performance.
4. **Preventive:** changes that prevent future problems.

## Problem-Solving Techniques {#problem-solving-techniques}

Before a program is coded, the method of solving the problem is planned with one or more of the following techniques.

### 1. Algorithm

An **algorithm** is a **finite sequence of clear, step-by-step instructions** for solving a problem, usually written in plain English.

(See [Algorithm Specification and Development](#algorithm-specification-and-development) and [Algorithms and Flowcharts](/topics/programming/algorithms-and-flowcharts#algorithm).)

### 2. Flowchart

A **flowchart** is a **diagram** of the steps of a solution, drawn with **standard symbols** (oval for start/stop, parallelogram for input/output, rectangle for processing, diamond for decision) joined by **arrows** that show the order of steps.

(See [Flowchart](/topics/programming/algorithms-and-flowcharts#flowchart).)

### 3. Pseudocode

**Pseudocode** ("false code") is an **informal, English-like description of a program** written with the structure of a programming language (IF … THEN … ELSE, WHILE …, and so on) but without its strict syntax.

Each line can later be translated directly into code.

**Example:** finding the larger of two numbers.

```text
 READ a, b
 IF a > b THEN
     PRINT a
 ELSE
     PRINT b
 ENDIF
```

### 4. Decision Table

A **decision table** lists **conditions** and the **actions** to be taken for each combination of conditions, in table form. It is useful when a problem has many conditions.

**Example:** result of an examination.

| Condition / Action | Rule 1 | Rule 2 |
| --- | --- | --- |
| Marks ≥ 33? | Yes | No |
| Print "Pass" | ✓ | |
| Print "Fail" | | ✓ |

### 5. Top-Down and Bottom-Up Approaches

1. **Top-down approach (stepwise refinement):** start with the **whole problem**, divide it into **smaller sub-problems (modules)**, and divide these further until each part is simple enough to code.
2. **Bottom-up approach:** first build the **smallest, lowest-level parts**, then combine them into larger parts until the whole solution is complete.

(These are explained further in [Program Design Techniques](/topics/programming/program-design-techniques).)

### Differences Between Algorithm, Flowchart and Pseudocode

| Basis | Algorithm | Flowchart | Pseudocode |
| --- | --- | --- | --- |
| Form | Numbered steps in plain language | Diagram with standard symbols | Structured English, close to code |
| Ease of understanding | Easy | Easiest (visual) | Easy for programmers |
| Making changes | Easy | Difficult (must be redrawn) | Easy |
| Suitable for | Any problem | Small and medium problems | Problems of any size |
| Closeness to code | Low | Low | High |

## Algorithm Specification and Development {#algorithm-specification-and-development}

An **algorithm** is a **finite set of well-defined instructions**, carried out in a fixed order, that solves a problem or performs a computation.

An algorithm is **language-independent**: the same algorithm can be coded in any programming language.

### Characteristics (Properties) of an Algorithm

1. **Input:** it takes **zero or more inputs**, supplied from outside.
2. **Output:** it produces **at least one output**.
3. **Definiteness:** every step is **clear and unambiguous** (it has only one meaning).
4. **Finiteness:** it **ends after a finite number of steps** for every input; an endless loop is not an algorithm.
5. **Effectiveness:** every step is **simple and basic enough** to be carried out exactly, even by hand with paper and pencil.

### Algorithm Specification

An algorithm can be specified (written) in three ways:

1. **Natural language** (plain English): easy to write, but it can be ambiguous and is hard to follow for complex logic.
2. **Flowchart:** a graphical form, easy to follow.
3. **Pseudocode:** close to a programming language, so it is the easiest to convert into code.

**Common conventions for writing an algorithm:**

1. Give the algorithm a **name** and state its **input** and **output**.
2. **Number the steps** and begin with **Start** and end with **Stop**.
3. Use **←** (or =) for assignment, for example `sum ← sum + x`.
4. Use **Read/Input** and **Print/Output** for input and output.
5. Use IF … THEN … ELSE for decisions and WHILE / REPEAT … UNTIL / FOR for repetition, with indentation to show which steps belong inside.

### Developing an Algorithm

1. **Understand the problem:** what result must be produced?
2. **Identify the inputs** and any **constraints** (rules and limits on the data).
3. **Identify the outputs**.
4. **Plan the approach:** list the main steps from start to finish (broad steps first).
5. **Refine the design:** break each main step into precise, detailed steps (stepwise refinement), usually written in pseudocode.
6. **Analyse the algorithm:** check that it is **correct** for all valid inputs (including special cases), that every step is clear, and that it is **efficient** in time and memory.
7. **Implement:** translate it into a program.

### Worked Example: Largest of Three Numbers

**Problem:** find the largest of three numbers. **Input:** a, b, c. **Output:** the largest number.

```text
 Algorithm: LARGEST(a, b, c)
 Step 1: Start
 Step 2: Read a, b, c
 Step 3: IF a > b AND a > c THEN large ← a
         ELSE IF b > c THEN large ← b
         ELSE large ← c
 Step 4: Print large
 Step 5: Stop
```

**Check:** for a = 7, b = 12, c = 5: a > b is false, b > c is true, so large = 12. ✓

### Analysis of Algorithms

An algorithm is judged by the resources it needs:

1. **Time complexity:** how the running time grows with the size of the input.
2. **Space complexity:** how much memory it needs.

Analysis can be done in two ways:

1. **A priori analysis:** theoretical analysis **before implementation** (counting the steps).
2. **A posteriori analysis:** measuring the program **after implementation** by running it.

(Complexity is studied in [Introduction and Complexity](/topics/data-structures-algorithms/introduction-and-complexity).)

## Programming Style {#programming-style}

**Programming style** is the set of rules and habits a programmer follows to make a program **easy to read, understand, test and change**.

A program is read many more times than it is written, so good style saves time and prevents errors.

### Characteristics of a Good Program

1. **Correct and effective:** it solves the given problem.
2. **Reliable:** it gives the same correct output for the same input every time.
3. **Efficient:** it uses little time and memory.
4. **Portable:** it runs on different machines of the same kind without change.
5. **User-friendly:** it is easy to use.
6. **Readable and self-documenting:** its names and layout explain what it does.

### Rules of Good Programming Style

1. **Meaningful names:** use descriptive names for variables and functions (`radius`, `total_marks`), not `x1` or `a`. Follow the naming conventions of the language.
2. **Comments:** add a short comment at the top of the program (its purpose, input and output) and before important blocks; do not comment the obvious.
3. **Indentation and spacing:** indent the statements inside blocks and control structures, and use blank lines between sections and spaces around operators.
4. **Simple, clear statements:** do one task in each statement; avoid "clever" tricks and overly complex expressions; use brackets to make the order of evaluation clear.
5. **Structured control:** use the standard sequence, selection (if, switch) and loop (for, while) structures, and avoid unrestricted jumps (`goto`).
6. **Modularity:** divide the program into small functions, each doing one job.
7. **Named constants:** use named constants (`#define PI 3.14159`) instead of unexplained numbers in the code.
8. **Consistency:** follow the same style throughout the program and the project.

**Example:** both programs below compute the area of a circle and give the same output, but only the second is easy to read.

```c
#include<stdio.h>
int main(void){float r,a;scanf("%f",&r);a=3.14159*r*r;printf("%.2f\n",a);return 0;}
```

```c
#include <stdio.h>
#define PI 3.14159

int main(void)
{
    float radius, area;

    scanf("%f", &radius);
    area = PI * radius * radius;   /* area of a circle */
    printf("%.2f\n", area);

    return 0;
}
```

## Testing and Debugging {#testing-and-debugging}

### Types of Program Errors

An error in a program is also called a **bug**.

1. **Syntax error:** a violation of the **grammar rules** of the language (a missing semicolon or bracket, a misspelled keyword, an undeclared variable). It is found by the **compiler**, and the program cannot run until it is corrected.

```c
int a = 10          /* syntax error: ';' missing */
printf("%d\n", a);
```

   The compiler reports an error such as `expected ',' or ';' before 'printf'`.

2. **Runtime error:** an error that occurs **while the program is running**, although it compiled successfully, for example **division by zero**, accessing an array element outside its bounds, or running out of memory. The program usually stops abnormally (crashes).

```c
int a = 10, b = 0;
printf("%d\n", a / b);   /* runtime error: division by zero */
```

3. **Logical error:** the program compiles and runs, but gives **wrong results** because the logic is wrong. The compiler cannot find it; the programmer must find it by testing.

```c
int a = 10, b = 20;
float avg = a + b / 2;   /* logical error: gives 20.0, not 15.0 */
                         /* correct: avg = (a + b) / 2.0;      */
```

4. **Linker error:** the program compiles, but the **executable file cannot be built** because something it needs cannot be found, for example writing `Main()` instead of `main()` (the linker reports an undefined reference to `main`), or calling a function that is declared but never defined.

5. **Semantic error:** a statement that is grammatically correct but has **no valid meaning** in the language, for example `a + b = c;` (a value cannot be assigned to an expression).

### Testing

**Definition:** testing is the process of **running a program with selected input data (test cases)** and comparing its actual output with the expected output, in order to **find errors** and to check that the program meets its requirements.

**Good test data includes:**

1. **Normal** (typical) values
2. **Boundary** values (the smallest and largest allowed values)
3. **Invalid** or unexpected values (to check that the program handles them)

**Levels of testing:**

1. **Unit testing:** each module or function is tested separately.
2. **Integration testing:** the modules are combined and tested together, to check how they work with each other.
3. **System testing:** the complete program is tested against its requirements.
4. **Acceptance testing:** the users test the program before accepting it.

**Testing methods:**

1. **Black-box testing:** the tester checks the **outputs for given inputs** without looking at the code (it tests *what* the program does).
2. **White-box (glass-box) testing:** the tester uses knowledge of the **internal code** and checks that every path, branch and statement works (it tests *how* the program does it).

### Debugging

**Definition:** debugging is the process of **locating, analysing and removing the errors (bugs)** that testing has revealed.

**Debugging techniques:**

1. **Reading the compiler messages** to correct syntax errors
2. **Print statements (tracing):** printing the values of variables at different points to see where the values go wrong
3. **Using a debugger tool** (for example GDB): running the program step by step, setting **breakpoints** and **watching** variables
4. **Desk checking (dry run):** following the code by hand with sample data
5. **Testing small modules** one at a time, so that errors are found early and easily

### Differences Between Testing and Debugging

| Basis | Testing | Debugging |
| --- | --- | --- |
| Purpose | To **find** errors (defects) | To **locate and correct** the errors found |
| Order | Done first | Done after testing finds an error |
| Done by | Testers (or programmers) | Programmers (developers) |
| Knowledge of the code | Not always needed (black-box testing) | Needed |
| Method | Running the program with test cases | Analysing symptoms to find the cause |
| Result | A list of failures | A corrected program |
| Place in development | A separate step of program development | A consequence of testing |

## References {#references}

**TutorialsPoint**

- [Computer Programming – Overview](https://www.tutorialspoint.com/computer_programming/computer_programming_overview.htm) — accessed 2026-11-01
- [Programming Methodologies – Quick Guide](https://www.tutorialspoint.com/programming_methodologies/programming_methodologies_quick_guide.htm) — accessed 2026-11-01
- [What is program development cycle in C language?](https://www.tutorialspoint.com/article/what-is-program-development-cycle-in-c-language) — accessed 2026-11-01
- [Algorithms & Their Complexity](https://www.tutorialspoint.com/computer_programming/computer_programming_algorithms_complexity_blueprint_analysis.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [What is Algorithm](https://www.geeksforgeeks.org/dsa/introduction-to-algorithms/) — accessed 2026-11-01
- [Differences between Testing and Debugging](https://www.geeksforgeeks.org/differences-between-testing-and-debugging/) — accessed 2026-11-01
- [Black Box Testing vs White Box Testing](https://www.geeksforgeeks.org/software-testing/differences-between-black-box-testing-vs-white-box-testing/) — accessed 2026-11-01

**TpointTech**

- [How to Write an Algorithm](https://www.tpointtech.com/how-to-write-an-algorithm) — accessed 2026-11-01
