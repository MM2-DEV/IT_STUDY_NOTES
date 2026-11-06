---
description: Types of programming languages by level (machine, assembly and high-level), generations, middle-level languages, language translators, programming paradigms (imperative, procedural, object-oriented, declarative, functional and logic), and machine and assembly language programming.
updated: 2026-11-04
---

## Types of Programming Languages {#types-of-programming-languages}

**Programming language:** a programming language is a formal language, with fixed rules of syntax and meaning, used to write instructions (programs) that a computer can carry out.

### Types of Programming Languages by Level

The **level** of a language means how close it is to the computer's hardware (low) or to human language (high). By level, programming languages are of two main types, and low-level languages are further divided into two:

1. **Low-level languages** — close to the hardware of the computer:
   1. **Machine language** (first generation)
   2. **Assembly language** (second generation)
2. **High-level languages** — close to human language and independent of the hardware (for example C, Java, Python).

So, by level, a language is a **machine language**, an **assembly language** or a **high-level language**.

#### 1. Low-Level Language

A low-level language is a language that gives **little or no abstraction from the hardware**: its instructions correspond closely to the processor's own instructions, and they work directly with registers and memory addresses.

Programs written in it are **machine-dependent**.

**Characteristics of low-level languages:**

1. Close to the machine, far from human language.
2. Machine-dependent: a program for one processor does not run on another (not portable).
3. Gives direct control of the hardware (registers, memory, I/O ports).
4. Programs are fast and use little memory.
5. Difficult to write, read, debug and maintain; the programmer must know the processor's architecture.

Low-level languages are of two types:

**(a) Machine language:** machine language is the language of **binary codes (0s and 1s)** that the processor **understands and executes directly**.

It is the only language a computer understands without translation, so no translator is needed. Machine code differs from one processor family to another (for example, Intel x86 and ARM). (See [Machine Language Programming](#machine-language-programming).)

**(b) Assembly language:** assembly language is a low-level language that uses **mnemonics** (short, easy-to-remember codes such as `MOV`, `ADD`, `SUB`) instead of binary codes.

Each assembly instruction normally corresponds to one machine instruction. A program called an **assembler** translates it into machine language. Every processor family has its own assembly language (for example, 8086 and ARM assembly). (See [Assembly Language Programming](#assembly-language-programming).)

#### 2. High-Level Language

A high-level language is a language that uses **English-like words and mathematical notation** and hides the details of the hardware, so that the programmer can concentrate on solving the problem.

A **compiler** or **interpreter** translates it into machine language.

**Characteristics of high-level languages:**

1. Close to human language; easy to learn, read and write.
2. Machine-independent (portable): the same program can run on different computers after translation by a compiler or interpreter for each computer.
3. Does not need knowledge of the hardware.
4. Provides features such as data types, control statements, functions, error handling and (in most languages) automatic memory management.

**Advantages:**

1. Easy to write, read, debug and maintain.
2. Portable across different machines.
3. Programs are developed faster and are shorter.

**Disadvantages:**

1. Must be translated by a compiler or interpreter.
2. Programs usually run more slowly and use more memory than equivalent low-level programs.
3. Gives less direct control of the hardware.

**Examples:**

1. FORTRAN (scientific computing)
2. COBOL (business data processing)
3. C, C++
4. Java
5. Python

#### Middle-Level Language

Some books add a **middle-level language** between the two levels: a high-level language that also provides low-level features. **C** (and C++) is called a middle-level language because it has high-level features (functions, loops, data types) and also low-level features (pointers, direct access to memory addresses, bit-level operators), so it is used for both application software and system software such as operating systems and device drivers. (Middle-level is a description of such languages, not a separate generation.)

#### Machine Language vs Assembly Language vs High-Level Language

| Basis | Machine language | Assembly language | High-level language |
| --- | --- | --- | --- |
| Level | Low-level | Low-level | High-level |
| Generation | First (1GL) | Second (2GL) | Third (3GL) and later |
| Form of instructions | Binary codes (0s and 1s) | Mnemonics (`MOV`, `ADD`) | English-like statements |
| Translator | Not needed | Assembler | Compiler or interpreter |
| Machine dependence | Machine-dependent | Machine-dependent | Machine-independent (portable) |
| Ease of writing and reading | Very difficult | Easier than machine language | Easy |
| Debugging and maintenance | Very difficult | Difficult | Easy |
| Execution speed | Fastest | Fast | Slower |
| Memory efficiency | Highest | High | Lower |
| Hardware control | Direct | Direct | Limited |
| Knowledge of hardware needed | Yes | Yes | No |
| Examples | `10110000 01100001` | `MOV AL, 61H` | C, Java, Python |

### Generations of Programming Languages

| Generation | Type | Description | Examples |
| --- | --- | --- | --- |
| **1GL** | Machine language | Binary codes executed directly by the processor; machine-dependent | Binary machine code |
| **2GL** | Assembly language | Mnemonics translated by an assembler; machine-dependent | 8085 / 8086 assembly |
| **3GL** | High-level (procedural) languages | English-like statements; the programmer writes step-by-step procedures; translated by a compiler or interpreter | FORTRAN, COBOL, Pascal, C |
| **4GL** | Non-procedural languages | The programmer states **what** result is wanted, not **how** to get it; mainly for databases and reports | SQL, FoxPro |
| **5GL** | Constraint-based and logic languages | The programmer gives facts and constraints, and the system finds the solution; used in artificial intelligence | PROLOG |

### Language Translators (Language Processors)

A program written in any language other than machine language must be **translated into machine language** before it can run. The programs that do this are called **language translators** or **language processors**. The program written by the programmer is the **source code**, and the translated program is the **object code**.

1. **Assembler:** translates **assembly language** into machine language. It is machine-dependent.
2. **Compiler:** translates the **whole high-level program at once** into machine code (object code) and then reports all the errors. The object code can be run many times without translating again. Examples: C, C++.
3. **Interpreter:** translates and **executes the program one statement at a time**, and stops at the first error. No separate object code is produced. Examples: Python, JavaScript.

**Differences between compiler and interpreter:**

| Basis | Compiler | Interpreter |
| --- | --- | --- |
| Translation | Whole program at once | One statement at a time |
| Object code | Produced (saved as an executable) | Not produced |
| Execution speed | Faster | Slower |
| Error reporting | After translating the whole program | Stops at the first error |
| Debugging | Harder | Easier |
| Memory | More (object code is stored) | Less |
| Examples | C, C++ | Python, JavaScript |

### Differences Between Low-Level and High-Level Languages

| Basis | Low-level language | High-level language |
| --- | --- | --- |
| Closeness | Close to the machine (hardware) | Close to human language |
| Ease of learning and writing | Difficult | Easy |
| Machine dependence | Machine-dependent (not portable) | Machine-independent (portable) |
| Translator | None (machine language) or assembler | Compiler or interpreter |
| Execution speed | Faster | Slower |
| Memory efficiency | High | Lower |
| Debugging and maintenance | Difficult | Easy |
| Hardware control | Direct (registers, memory) | Limited |
| Use | System programs, device drivers, embedded systems | Application software, web development |
| Examples | Machine language, assembly language | C, Java, Python |

## Programming Paradigms {#programming-paradigms}

**Definition:** a programming paradigm is a **style or approach** of programming: a way of organising a program and of thinking about how a problem is solved.

Many languages support more than one paradigm.

```text
                     Programming paradigms
                ┌─────────────┴──────────────┐
           Imperative                    Declarative
     ┌──────────┼────────────┐       ┌─────────┼─────────┐
 Procedural  Object-     Parallel   Logic  Functional  Database
             oriented   processing
```

### 1. Imperative Paradigm

**Definition:** imperative programming is a paradigm in which the program is a **sequence of commands** that **change the program's state** (the values of variables) step by step, mainly through **assignment statements**.

It tells the computer **how** to solve the problem. It follows the structure of the von Neumann computer. Examples: C, FORTRAN, BASIC.

### 2. Procedural Paradigm

**Definition:** procedural programming is a kind of imperative programming in which the program is divided into **procedures (functions or subroutines)**, each doing one task; procedures are called when needed, which allows **code reuse**.

Examples: C, Pascal, FORTRAN.

### 3. Object-Oriented Paradigm (OOP)

**Definition:** object-oriented programming is a paradigm in which the program is organised as a collection of **objects**, each combining **data (attributes)** and the **functions (methods)** that work on it.

Objects are created from **classes** and interact by calling each other's methods. Its main features are **encapsulation, inheritance and polymorphism** (see [Object-Oriented Programming Concepts](/topics/programming/oop-concepts)). Simula was the first object-oriented language. Examples: C++, Java, Python, C#, Smalltalk.

### 4. Parallel Processing Paradigm

**Definition:** parallel processing is a paradigm in which the instructions of a program are **divided among several processors** so that parts of the program run at the same time and the program finishes sooner (a divide-and-conquer approach).

C and C++ support it through libraries.

### 5. Declarative Paradigm

**Definition:** declarative programming is a paradigm in which the program describes **what** result is wanted, **not how** to compute it step by step; the language system decides the steps.

It includes:

1. **Logic programming:** the program consists of **facts and rules**, and the system answers questions by **logical inference** from them. Example: **PROLOG**.
2. **Functional programming:** computation is done by **evaluating mathematical functions**; it avoids changing variables (state), and functions can be passed to and returned from other functions. Examples: Haskell, Lisp, Erlang, Scala.
3. **Database (data-driven) programming:** the program is built around storing, retrieving and filtering data. Example: **SQL** (`SELECT name FROM student WHERE marks > 80;` states what is wanted, not how to search).

### Differences Between Imperative and Declarative Programming

| Basis | Imperative | Declarative |
| --- | --- | --- |
| Focus | **How** to solve the problem (steps) | **What** result is wanted |
| Program state | Changed by assignment statements | Changes are avoided or hidden |
| Control flow | Written explicitly by the programmer | Decided by the language system |
| Sub-types | Procedural, object-oriented | Logic, functional, database |
| Who decides the steps | The programmer | The compiler or language system |
| Variables | Mutable (values change) | Usually immutable |
| Side effects | More side effects | Few or no side effects |
| Optimisation | Done by the programmer | Done by the system from the rules given |
| Advantages | Easy to learn; fine control (important for low-level work) | Shorter code, high abstraction, easy to extend |
| Examples | C, Java | PROLOG, Haskell, SQL |

### Differences Between Procedural and Object-Oriented Programming

| Basis | Procedural | Object-oriented |
| --- | --- | --- |
| Program is divided into | Functions (procedures) | Objects (classes) |
| Emphasis | Procedures (actions) | Data |
| Approach | Top-down | Bottom-up |
| Data security | Data can move freely between functions (less secure) | Data is hidden inside objects (encapsulation) |
| Reuse | Through functions | Through inheritance and objects |
| Suitable for | Small and medium programs | Large, complex programs |
| Access specifiers | None | `private`, `public`, `protected` |
| Adding new data and functions | Difficult | Easy |
| Overloading | Not possible | Possible |
| Abstraction | Procedure abstraction | Data abstraction |
| Real-world modelling | Weak | Strong (objects model real things) |
| Examples | C, FORTRAN, Pascal, BASIC | C++, Java, Python, C# |

### Differences Between Structured and Object-Oriented Programming

**Structured programming** is a form of procedural programming in which a program is divided into **functions (modules)** and is built only from the three standard control structures — **sequence, selection and iteration** — without unrestricted `goto` jumps; the `main()` function calls the other functions as needed (see [Structured Program Design](/topics/programming/program-design-techniques#structured-program-design)).

Examples: C, Pascal, ALGOL, Modula-2.

**Object-oriented programming** organises a program as a collection of **objects**, which combine data and the functions (methods) that work on it, and is based on **encapsulation, abstraction, inheritance and polymorphism**. Examples: C++, Java, Python, C#.

| Basis | Structured programming | Object-oriented programming |
| --- | --- | --- |
| Basic unit | Function (module) | Object (created from a class) |
| Program is divided into | Small functions | Objects |
| Main focus | Functions and processes (the algorithm) | Data, and the objects that hold it |
| Emphasis | On code (procedures) | On data |
| Design approach | Top-down | Bottom-up |
| Data and functions | Kept separate; data is often global and moves freely between functions | Bound together in a class (encapsulation) |
| Data security | Less secure (no data hiding) | More secure (data hiding with `private`) |
| Access specifiers | None | `private`, `public`, `protected` |
| Communication | `main()` calls other functions | Objects communicate by calling each other's methods (message passing) |
| Execution | Mostly sequential, following the function calls | Methods are called dynamically as needed |
| Code reuse | Through functions and libraries | Through classes, inheritance and objects |
| Inheritance and polymorphism | Not supported | Supported |
| Overloading | Not possible (in C) | Function and operator overloading |
| Flexibility and abstraction | Less | More |
| Modification and extension | Harder for large programs | Easier; new classes can be added |
| Suitable for | Small and medium programs | Large, complex programs |
| Examples | C, Pascal, ALGOL, Modula-2 | C++, Java, Python, C# |

## Machine Language Programming {#machine-language-programming}

**Definition:** machine language programming is writing programs **directly in the binary codes** of the processor.

Each instruction is a pattern of bits that the processor executes **without any translation**.

**Format of a machine instruction:** an instruction has two parts:

1. **Operation code (opcode):** tells the processor **which operation** to perform (add, move, load and so on).
2. **Operand(s):** the **data**, or the **register or memory address** of the data, on which the operation is performed.

Machine code is usually written in **hexadecimal** (or octal) instead of long binary strings, to make it shorter.

**Example (Intel 8085):** the instruction that loads the value 05H into the accumulator (register A) is written in assembly language as `MVI A, 05H`. In machine language it is the two bytes **3E 05** (hexadecimal): **3E** is the opcode of `MVI A` and **05** is the data. In binary, this is:

```text
 0011 1110   0000 0101
 (opcode 3E) (data 05)
```

**Characteristics of machine language:**

1. It is the **only language the computer understands directly**.
2. It is **machine-dependent**: each processor family has its own instruction codes, so a program for one processor does not run on another.
3. The programmer must know the **internal structure** of the processor (its registers and memory addresses).

**Advantages:**

1. **Fastest execution**, since no translation is needed.
2. **Efficient use of memory** and full, direct control of the hardware.

**Disadvantages:**

1. Very **difficult to write, read and remember** (only 0s and 1s).
2. **Error-prone**, and errors are very hard to find and correct.
3. **Not portable** between different processors.
4. Writing programs takes a very long time.

## Assembly Language Programming {#assembly-language-programming}

**Definition:** assembly language programming is writing programs with **mnemonics** (symbolic codes) for the processor's instructions, together with symbolic names (**labels**) for memory addresses.

Each assembly instruction normally corresponds to **one machine instruction**. An **assembler** translates the program into machine code.

**Parts of an assembly language statement:**

```text
 LABEL:   MNEMONIC   OPERANDS     ; COMMENT
 START:   MVI        A, 05H       ; load 05H into register A
```

1. **Label:** an optional name for the address of the instruction (used as the target of jumps).
2. **Mnemonic (opcode):** the short name of the operation, for example `MOV` (move), `ADD` (add), `SUB` (subtract), `MVI` (move immediate), `HLT` (halt).
3. **Operands:** the registers, data or addresses used by the instruction.
4. **Comment:** an explanation for the reader, ignored by the assembler (written after a semicolon).

**Steps to run an assembly program:**

1. Write the program in a text editor and save it (for example as a `.asm` file).
2. **Assemble** it with an assembler to produce an object file.
3. **Link** the object file (with any library code) to produce an executable.
4. **Run** the executable.

**Advantages of assembly language (over machine language):**

1. **Easier to write, read and remember**, because mnemonics are used instead of binary codes.
2. **Easier to find and correct errors**, and easier to modify.
3. Still gives **direct control of the hardware** (registers, memory, I/O) and produces **fast, compact** programs.

**Disadvantages:**

1. **Machine-dependent**: an assembly program for one processor does not run on another.
2. Needs an **assembler** for translation.
3. The programmer must know the processor's architecture; programs are **long** and slow to write compared with high-level languages.
4. Difficult to maintain for large programs.

**Uses:** device drivers, operating system kernels, embedded systems and microcontrollers, and programs where speed or size is critical.

The instruction set and complete assembly programs for the 8085/8086 microprocessors are covered in [Assembly Language Programming](/topics/microprocessors/assembly-language-programming).

### Differences Between Machine Language and Assembly Language

| Basis | Machine language | Assembly language |
| --- | --- | --- |
| Form of instructions | Binary codes (0s and 1s), often written in hex | Mnemonics such as MOV, ADD, SUB |
| Understood by | The computer directly | People; must be translated for the computer |
| Translator | Not needed | Assembler |
| Ease of writing and reading | Very difficult | Easier |
| Finding and correcting errors | Very difficult | Easier |
| Execution speed | Fastest | Fast (after assembly it is machine code) |
| Machine dependence | Machine-dependent | Machine-dependent |
| Generation | First generation (1GL) | Second generation (2GL) |

## References {#references}

**GeeksforGeeks**

- [Difference Between Imperative and Declarative Programming](https://www.geeksforgeeks.org/theory-of-computation/difference-between-imperative-and-declarative-programming/) — accessed 2026-11-01
- [Differences between Procedural and Object Oriented Programming](https://www.geeksforgeeks.org/software-engineering/differences-between-procedural-and-object-oriented-programming/) — accessed 2026-11-01
- [Generations of Programming Languages](https://www.geeksforgeeks.org/blogs/generation-programming-languages/) — accessed 2026-11-01
- [Difference Between Machine Language and Assembly Language](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-machine-language-and-assembly-language/) — accessed 2026-11-01
- [What is Assembly Language?](https://www.geeksforgeeks.org/computer-organization-architecture/what-is-assembly-language/) — accessed 2026-11-01
- [Language Processors: Assembler, Compiler and Interpreter](https://www.geeksforgeeks.org/language-processors-assembler-compiler-and-interpreter/) — accessed 2026-11-01
- [Difference between High Level and Low level languages](https://www.geeksforgeeks.org/computer-science-fundamentals/difference-between-high-level-and-low-level-languages/) — accessed 2026-11-01
- [Introduction of Programming Paradigms](https://www.geeksforgeeks.org/system-design/introduction-of-programming-paradigms/) — accessed 2026-11-01
- [Difference between assembly language and high level language](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-assembly-language-and-high-level-language/) — accessed 2026-11-04
- [Difference between Structured Programming and Object Oriented Programming](https://www.geeksforgeeks.org/software-engineering/difference-between-structured-programming-and-object-oriented-programming/) — accessed 2026-11-04

**TutorialsPoint**

- [Computer Concepts – Programming Languages](https://www.tutorialspoint.com/computer_concepts/computer_concepts_programming_languages.htm) — accessed 2026-11-04 (it calls assembly language a "middle-level" language and lists Ada and Pascal as assembly languages; assembly is a low-level language, and Ada and Pascal are high-level languages, so these points are not used)
- [Difference between Structured and Object Oriented Programming](https://www.tutorialspoint.com/article/difference-between-structured-and-object-oriented-programming) — accessed 2026-11-04

**TpointTech**

- [Classification of Programming Languages](https://www.tpointtech.com/classification-of-programming-languages) — accessed 2026-11-04 (its comparison table says low-level code runs more slowly and high-level code faster; this is reversed — low-level code runs faster)
- [Features of C Language](https://www.tpointtech.com/features-of-c-language) — accessed 2026-11-04 (C as a mid-level language)
- [Procedural Programming vs Object-Oriented Programming](https://www.tpointtech.com/procedural-programming-vs-object-oriented-programming) — accessed 2026-11-04

**Programiz**

- [C++ Programming guide](https://www.programiz.com/cpp-programming/guide) — accessed 2026-11-04 (C++ as a middle-level language); Programiz has no page on the classification of languages by level

**Additional sources**

- [8085 Instruction Set (lecture notes)](https://www.jmc.edu/econtent/ug/4647_8085%20instruction%20set.pdf) — jmc.edu e-content, accessed 2026-11-01
