---
description: Types and generations of programming languages, low-level and high-level languages, language translators, programming paradigms (imperative, procedural, object-oriented, declarative, functional and logic), and machine and assembly language programming.
updated: 2026-11-01
---

## Types of Programming Languages {#types-of-programming-languages}

**Programming language:** a formal language, with fixed rules of syntax and meaning, used to write instructions (programs) that a computer can carry out.

Programming languages are divided into two broad types:

1. **Low-level languages:** close to the hardware of the computer.
   1. **Machine language**
   2. **Assembly language**
2. **High-level languages:** close to human language and independent of the hardware (for example C, Java, Python).

### Machine Language

**Definition:** machine language is the language of **binary codes (0s and 1s)** that the processor **understands and executes directly**. It is the only language a computer understands without translation. (See [Machine Language Programming](#machine-language-programming).)

### Assembly Language

**Definition:** assembly language is a low-level language that uses **mnemonics** (short, easy-to-remember codes such as `MOV`, `ADD`, `SUB`) instead of binary codes. A program called an **assembler** translates it into machine language. (See [Assembly Language Programming](#assembly-language-programming).)

### High-Level Language

**Definition:** a high-level language uses **English-like words and mathematical notation**, and hides the details of the hardware, so the programmer can concentrate on solving the problem. A **compiler** or **interpreter** translates it into machine language.

**Examples:**

1. FORTRAN (scientific computing)
2. COBOL (business data processing)
3. C, C++
4. Java
5. Python

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

**Definition:** a programming paradigm is a **style or approach** of programming: a way of organising a program and of thinking about how a problem is solved. Many languages support more than one paradigm.

```text
                     Programming paradigms
                ┌─────────────┴──────────────┐
           Imperative                    Declarative
     ┌──────────┼────────────┐       ┌─────────┼─────────┐
 Procedural  Object-     Parallel   Logic  Functional  Database
             oriented   processing
```

### 1. Imperative Paradigm

**Definition:** imperative programming is a paradigm in which the program is a **sequence of commands** that **change the program's state** (the values of variables) step by step, mainly through **assignment statements**. It tells the computer **how** to solve the problem. It follows the structure of the von Neumann computer. Examples: C, FORTRAN, BASIC.

### 2. Procedural Paradigm

**Definition:** procedural programming is a kind of imperative programming in which the program is divided into **procedures (functions or subroutines)**, each doing one task; procedures are called when needed, which allows **code reuse**. Examples: C, Pascal, FORTRAN.

### 3. Object-Oriented Paradigm (OOP)

**Definition:** object-oriented programming is a paradigm in which the program is organised as a collection of **objects**, each combining **data (attributes)** and the **functions (methods)** that work on it. Objects are created from **classes** and interact by calling each other's methods. Its main features are **encapsulation, inheritance and polymorphism** (see [Object-Oriented Programming Concepts](/topics/programming/oop-concepts)). Simula was the first object-oriented language. Examples: C++, Java, Python, C#, Smalltalk.

### 4. Parallel Processing Paradigm

**Definition:** parallel processing is a paradigm in which the instructions of a program are **divided among several processors** so that parts of the program run at the same time and the program finishes sooner (a divide-and-conquer approach). C and C++ support it through libraries.

### 5. Declarative Paradigm

**Definition:** declarative programming is a paradigm in which the program describes **what** result is wanted, **not how** to compute it step by step; the language system decides the steps. It includes:

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

## Machine Language Programming {#machine-language-programming}

**Definition:** machine language programming is writing programs **directly in the binary codes** of the processor. Each instruction is a pattern of bits that the processor executes **without any translation**.

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

**Definition:** assembly language programming is writing programs with **mnemonics** (symbolic codes) for the processor's instructions, together with symbolic names (**labels**) for memory addresses. Each assembly instruction normally corresponds to **one machine instruction**. An **assembler** translates the program into machine code.

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

**Additional sources**

- [8085 Instruction Set (lecture notes)](https://www.jmc.edu/econtent/ug/4647_8085%20instruction%20set.pdf) — jmc.edu e-content, accessed 2026-11-01
