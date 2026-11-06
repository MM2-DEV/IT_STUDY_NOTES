# TOPICS

Master topic list for the IT Study Notes website.

- Each **category** maps to a folder under `content/` (folder name shown next to the category heading).
- Each **topic** maps to one content folder (`content/<category>/<slug>/en.md` and `bn.md`), using the slug shown under the topic heading.
- Syllabus items written in Bengali have been translated into English topic names here.

## Exam Tags

| Tag        | Examination                                                 | Subject                                    |
| ---------- | ----------------------------------------------------------- | ------------------------------------------ |
| `School`   | NTRCA ICT (Written) — School                                | Computer Science (কম্পিউটার বিজ্ঞান)       |
| `School-2` | NTRCA ICT (Written) — School-2                              | Computer & IT (কম্পিউটার ও তথ্য প্রযুক্তি) |
| `College`  | NTRCA ICT (Written) — Lecturer                              | Information and Communication Technology   |
| `PSC-IT`   | Public Service Commission (PSC) — IT posts                  | Computer Science                           |
| `AP`       | Assistant Programmer (AP)                                   | Computer Science                           |
| `Bank`     | Bank IT posts (Bangladesh Bank and other banks: AD/AP/SO ICT) | Computer Science / ICT                   |
| `Others`   | Not tied to a specific exam                                 | Additional subjects                        |

**Tagging rules**

- A topic heading shows every exam that covers any part of the topic.
- When a topic is covered by **more than one** exam, each subtopic is tagged with the exams that list it explicitly.
- When a topic is covered by **only one** exam, its subtopics are not tagged individually.
- `Others` topics have no official syllabus subtopics. Their subtopics were drafted from standard curricula and need review (see note N15).

## Topic Status

Every topic shows a slug and a status line under its heading. Update the status as work progresses:

| Status         | Meaning                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| `Not started`  | No notes written yet.                                                        |
| `In progress`  | Research or writing has started.                                             |
| `English done` | English notes are published. The Bengali toggle is disabled for this topic. |
| `Complete`     | English and Bengali notes are both published.                               |

## Shared Topics

Some subjects appear in more than one place because different syllabi cover them from different angles. Write the full explanation once, in the **main home**, and link to it from the other places, which keep only the angle specific to them.

| Subject                         | Main home                               | Other places (link to the main home)                                   |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| Memory hierarchy                | 11.2 Memory                              | 6.1 Operating System Fundamentals (Hardware Concepts)                  |
| Virtual memory                  | 6.10 Virtual Memory                     | 11.2 Memory (definition only)                                           |
| Interrupts                      | 11.7 Interrupts and Exceptions           | 12.5 Microprocessor Interrupts (8086-specific); 6.3 Interrupts and OS Organization (OS handling) |
| Hashing                         | 5.9 Hashing                             | 8.7 Indexing and Hashing (database hash indexing)                     |
| B-Tree and B+ Tree              | 5.12 AVL, B and B+ Trees                | 8.7 Indexing and Hashing (B-tree / B+-tree index files)               |
| Huffman coding                  | 5.13 Huffman Coding                     | 11.5 Instruction Set Architecture (opcode encoding)                     |
| Quick sort and merge sort       | 5.8 Sorting                             | 5.21 Divide and Conquer (design and run-time analysis)                 |
| Assembly language programming   | 12.4 Assembly Language Programming       | 4.4 Programming Languages and Paradigms                                |
| Graphs                          | 5.14 Graphs and Graph Traversal         | 16.6 Graph Theory and Applications (mathematical angle)                |
| Satellite communication         | 9.19 Telecommunication                 | 9.6 Transmission Modes and Media                                      |
| Cellular systems                | 9.19 Telecommunication                 | 9.17 Wireless and Cellular Networks                                   |

## Coverage at a Glance

| #   | Category                                          | School | School-2 | College | PSC-IT | AP  | Bank | Others |
| --- | ------------------------------------------------- | :----: | :------: | :-----: | :----: | :-: | :--: | :----: |
| 1   | Computer Fundamentals                             |   ✓    |    ✓     |         |        |     |      |        |
| 2   | Number Systems and Data Representation            |   ✓    |    ✓     |         |   ✓    |  ✓  |      |        |
| 3   | Digital Logic and Boolean Algebra                 |   ✓    |    ✓     |         |   ✓    |  ✓  |  ✓   |        |
| 4   | Programming                                       |   ✓    |    ✓     |    ✓    |   ✓    |  ✓  |  ✓   |   ✓    |
| 5   | Data Structures and Algorithms                    |        |    ✓     |    ✓    |   ✓    |  ✓  |  ✓   |        |
| 6   | Operating Systems                                 |   ✓    |    ✓     |    ✓    |   ✓    |  ✓  |  ✓   |   ✓    |
| 7   | Software Engineering, Web Technologies and E-Commerce |        |          |    ✓    |   ✓    |  ✓  |  ✓   |   ✓    |
| 8   | Database Management Systems                       |        |    ✓     |    ✓    |   ✓    |  ✓  |  ✓   |        |
| 9   | Computer Networks and Data Communication          |        |    ✓     |    ✓    |   ✓    |  ✓  |  ✓   |   ✓    |
| 10  | Artificial Intelligence, Big Data and Cloud Computing |        |          |         |   ✓    |  ✓  |  ✓   |   ✓    |
| 11  | Computer Architecture and Organization            |        |    ✓     |         |   ✓    |  ✓  |  ✓   |        |
| 12  | Microprocessors, Microcontrollers and Interfacing |        |    ✓     |         |   ✓    |  ✓  |  ✓   |        |
| 13  | Computer Maintenance and Troubleshooting          |        |    ✓     |         |        |     |      |        |
| 14  | Cybersecurity                                     |        |          |    ✓    |   ✓    |  ✓  |  ✓   |        |
| 15  | Computer Graphics and Multimedia                  |        |    ✓     |         |        |     |      |   ✓    |
| 16  | Discrete Mathematics and Numerical Analysis       |        |          |         |   ✓    |  ✓  |      |        |
| 17  | Compiler Design and Theory of Computation         |        |          |         |   ✓    |  ✓  |  ✓   |   ✓    |
| 18  | Power Sector Information                          |        |          |         |        |     |      |   ✓    |

---

## 1. Computer Fundamentals — `computer-fundamentals`

### 1.1 Introduction to Computers — `School`

**Slug:** `introduction-to-computers` · **Status:** English done

- Definition of Computer
- Characteristics of Computer

### 1.2 History of Computers — `School`

**Slug:** `history-of-computers` · **Status:** English done

- From the Abacus to the First Commercial Computer

### 1.3 Generations of Computers — `School`

**Slug:** `generations-of-computers` · **Status:** English done

- First to Fifth Generation

### 1.4 Types and Classification of Computers — `School`

**Slug:** `types-and-classification-of-computers` · **Status:** English done

- Types: Analog Computer, Digital Computer, Hybrid Computer
- Classification: Microcomputer, Mainframe Computer, Supercomputer

### 1.5 Organization of a Computer System — `School`

**Slug:** `organization-of-a-computer-system` · **Status:** English done

- Input Unit
- Memory Unit
- Arithmetic Logic Unit (ALU)
- Output Unit
- Control Unit

### 1.6 Hardware and Software — `School`

**Slug:** `hardware-and-software` · **Status:** English done

### 1.7 Analog and Digital Systems — `School-2`

**Slug:** `analog-and-digital-systems` · **Status:** English done

- Analog and Digital Signals
- Differences and Examples
- Advantages and Disadvantages of Analog and Digital Systems

---

## 2. Number Systems and Data Representation — `number-systems`

### 2.1 Number Systems and Conversion — `School` `School-2` `PSC-IT` `AP`

**Slug:** `number-systems-and-conversion` · **Status:** English done

- History of Inventing Numbers
- Non-positional and Positional Number Systems — `School`
- Binary, Octal, Decimal and Hexadecimal — `School` `PSC-IT` `AP`
- Conversion Between Number Systems — `School` `School-2`
  - Decimal ↔ Binary
  - Decimal ↔ Octal
  - Decimal ↔ Hexadecimal
  - Hexadecimal ↔ Octal
  - Any Base ↔ Any Base

### 2.2 Binary Arithmetic — `School` `School-2`

**Slug:** `binary-arithmetic` · **Status:** English done

- Binary Addition — `School` `School-2`
- Binary Subtraction — `School`
- Subtraction Using 2's Complement — `School-2`
- Binary Multiplication — `School`
- Binary Division — `School`
- Octal and Hexadecimal Addition

### 2.3 Data and Data Representation — `School` `PSC-IT` `AP`

**Slug:** `data-and-data-representation` · **Status:** English done

- Data, Information and Data Processing — `School`
- Data Representation — `PSC-IT` `AP`

### 2.4 Binary Codes — `School` `School-2` `PSC-IT` `AP`

**Slug:** `binary-codes` · **Status:** English done

- BCD (Binary Coded Decimal) — `School` `School-2` `PSC-IT` `AP`
- Excess-3 Code — `School-2`
- EBCDIC — `School`
- ASCII — `School` `School-2`
- Unicode

### 2.5 Parity — `School-2`

**Slug:** `parity` · **Status:** English done

- Parity Bit
- Parity Generator

---

## 3. Digital Logic and Boolean Algebra — `digital-logic`

### 3.1 Logic Gates — `School` `School-2` `PSC-IT` `AP`

**Slug:** `logic-gates` · **Status:** English done

- Basic Gates: AND, OR, NOT — `School` `School-2` `PSC-IT` `AP`
- NOR Gate — `School`
- Universal Gates — `School-2`
- Special Gates: XOR, XNOR

### 3.2 Boolean Algebra — `School-2` `PSC-IT` `AP`

**Slug:** `boolean-algebra` · **Status:** English done

- Boolean Algebra — `School-2` `PSC-IT` `AP`
- De Morgan's Theorem — `School-2`

### 3.3 Logic Simplification — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `logic-simplification` · **Status:** English done

- Simplification of Logic Circuits — `School-2`
- Circuit and Expression Minimization — `PSC-IT` `AP`
- Karnaugh Map — `School-2` `PSC-IT` `AP` `Bank`
- Quine–McCluskey Method — `PSC-IT` `AP`

### 3.4 Combinational Circuits — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `combinational-circuits` · **Status:** English done

- Circuit Design Using Logic Gates — `PSC-IT` `AP`
- Half Adder and Full Adder — `School-2` `PSC-IT` `AP`
- Parallel Adder — `School-2`
- Multiplexer and Demultiplexer — `School-2` `PSC-IT` `AP` `Bank`
- Encoder and Decoder — `School-2` `PSC-IT` `AP`
- Seven-Segment Decoder and Display — `School-2`
- Comparator — `School-2`

### 3.5 Flip-Flops — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `flip-flops` · **Status:** English done

- Basic Flip-Flops — `School-2` `PSC-IT` `AP` `Bank`
- J-K Flip-Flop — `School-2`
- D and T Flip-Flops — `School-2`

### 3.6 Registers — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `registers` · **Status:** English done

- Basic Registers — `PSC-IT` `AP` `Bank`
- Classification of Registers — `School-2` `Bank`
- Operation of a 4-bit Shift Register — `School-2` `Bank`
- Buffer Register — `School-2`
- Universal Shift Register — `School-2` `Bank`

### 3.7 Counters — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `counters` · **Status:** English done

- Basic Counters — `PSC-IT` `AP` `Bank`
- Asynchronous Ripple Counter — `School-2` `Bank`
- Decade Counter — `School-2` `Bank`

### 3.8 A/D and D/A Conversion — `School-2` `PSC-IT` `AP`

**Slug:** `ad-da-conversion` · **Status:** English done

- Need and Applications — `School-2`
- Ladder-Type D/A Converter — `School-2`
- Digital Ramp A/D Converter — `School-2`
- Resolution, Accuracy and Conversion Time — `School-2`
- ADC and DAC Circuits — `PSC-IT` `AP`

### 3.9 PLA Design — `PSC-IT` `AP`

**Slug:** `pla-design` · **Status:** English done

### 3.10 Pulse and Switching Circuits — `PSC-IT` `AP`

**Slug:** `pulse-and-switching-circuits` · **Status:** English done

- Pulse Mode and Fundamental Mode Logic
- Pulse and Switching Units
- Multivibrators (see note N2)

### 3.11 Digital Logic Families — `PSC-IT` `AP`

**Slug:** `digital-logic-families` · **Status:** English done

- DTL, TTL, CMOS and MOS Gates (see note N3)

### 3.12 Op-Amp Applications — `PSC-IT` `AP`

**Slug:** `op-amp-applications` · **Status:** English done

- LED and LCD Applications of Op-Amps
- Comparators (see note N4)

---

## 4. Programming — `programming`

### 4.1 Introduction to Programming — `School-2` `PSC-IT` `AP`

**Slug:** `introduction-to-programming` · **Status:** English done

- Introduction to Computer Programming — `PSC-IT` `AP`
- Steps of Programming — `School-2`
- Problem-Solving Techniques — `PSC-IT` `AP`
- Algorithm Specification and Development — `PSC-IT` `AP`
- Programming Style — `PSC-IT` `AP`
- Testing and Debugging — `PSC-IT` `AP`

### 4.2 Algorithms and Flowcharts — `School` `School-2`

**Slug:** `algorithms-and-flowcharts` · **Status:** English done

- Algorithm — `School` `School-2`
- Variables and Operations — `School`
- Flowchart — `School` `School-2`

### 4.3 Program Design Techniques — `PSC-IT` `AP`

**Slug:** `program-design-techniques` · **Status:** English done

- Structured Program Design
- Modular Program Design

### 4.4 Programming Languages and Paradigms — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `programming-languages-and-paradigms` · **Status:** English done

- Types of Programming Languages — `School-2` `PSC-IT` `AP` `Bank`
- Programming Paradigms — `PSC-IT` `AP`
- Machine Language Programming (see note N5) — `PSC-IT` `AP`
- Assembly Language Programming — `PSC-IT` `AP`

### 4.5 C: Data Types, Variables and Operators — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `c-data-types-operators` · **Status:** English done

- Fundamentals of C Programming — `College`
- Data Types — `School-2` `College` `PSC-IT` `AP` `Bank`
- Variables and Expressions — `College`
- Operators — `School-2`
- Statements — `PSC-IT` `AP`

### 4.6 C: Control Statements — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-control-statements` · **Status:** English done

- Conditional Statements — `School-2` `College` `PSC-IT` `AP`
- Looping Statements — `School-2` `College` `PSC-IT` `AP`

### 4.7 C: Arrays and Strings — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-arrays-strings` · **Status:** English done

- Arrays — `School-2` `College` `PSC-IT` `AP`
- Strings — `College` `PSC-IT` `AP`

### 4.8 C: Pointers — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `c-pointers` · **Status:** English done

### 4.9 C: Functions — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `c-functions` · **Status:** English done

### 4.10 C: Structures, Unions and Bit-fields — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-structures-unions` · **Status:** English done

- Structures — `School-2` `College` `PSC-IT` `AP`
- Unions — `College` `PSC-IT` `AP`
- Bit-fields — `PSC-IT` `AP`

### 4.11 C: Preprocessor Directives — `School-2` `PSC-IT` `AP`

**Slug:** `c-preprocessor` · **Status:** English done

### 4.12 C: Console and File I/O — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-console-file-io` · **Status:** English done

- Console I/O — `College`
- File I/O — `School-2` `College` `PSC-IT` `AP`

### 4.13 C: Graphics — `School-2`

**Slug:** `c-graphics` · **Status:** English done

### 4.14 Object-Oriented Programming Concepts — `College` `PSC-IT` `AP` `Bank`

**Slug:** `oop-concepts` · **Status:** English done

- Classes and Objects — `College` `PSC-IT` `AP` `Bank`
- Methods — `College`
- Interfaces — `College` `Bank`
- Packages — `College`
- Encapsulation — `College` `PSC-IT` `AP` `Bank`
- Inheritance — `College` `PSC-IT` `AP` `Bank`
- Polymorphism — `College` `PSC-IT` `AP` `Bank`

### 4.15 C++ and Java — `PSC-IT` `AP` `Bank`

**Slug:** `cpp-and-java` · **Status:** In progress

- Introductory Programming with C++/Java — `PSC-IT` `AP` `Bank`
- Template Functions and Classes — `PSC-IT` `AP`
- Multithreading — `PSC-IT` `AP`
- Exceptions — `PSC-IT` `AP` `Bank`
- Java Platform Independence: JDK, JRE and JVM — `Bank`
- Garbage Collection in Java — `Bank`

### 4.16 Python Programming — `Others`

**Slug:** `python-programming` · **Status:** English done

- Introduction and Features of Python
- Variables, Data Types and Operators
- Input and Output
- Control Flow: Conditional Statements and Loops
- Functions and Lambda Expressions
- Strings
- Lists, Tuples, Sets and Dictionaries
- Modules and Packages
- File Handling
- Exception Handling
- Object-Oriented Programming in Python

### 4.17 Practice Programs — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `practice-programs` · **Status:** English done

- Sum of Two Numbers — `School-2` `College` `PSC-IT` `AP`
- Multiplication of Two Numbers — `School-2` `College` `PSC-IT` `AP`
- Sum and Average of Three Numbers — `School-2` `College` `PSC-IT` `AP`
- Leap Year — `School-2` `College` `PSC-IT` `AP`
- Prime Number — `School-2` `College` `PSC-IT` `AP` `Bank`
- Odd or Even Number — `School-2` `College` `PSC-IT` `AP`
- GCD (HCF) of Two Numbers — `School-2` `College` `PSC-IT` `AP`
- LCM of Two Numbers — `School-2` `College` `PSC-IT` `AP`
- Reverse the Items of an Array — `School-2` `College` `PSC-IT` `AP`
- Fibonacci Series — `School-2` `College` `PSC-IT` `AP`
- Roots of a Quadratic Equation — `School-2` `College` `PSC-IT` `AP`
- Largest of Three Numbers — `School-2` `College` `PSC-IT` `AP` `Bank`
- Smallest of Three Numbers — `School-2` `College` `PSC-IT` `AP`
- Area of a Triangle (Base and Height) — `School-2` `College` `PSC-IT` `AP`
- Area of a Triangle (Three Sides) — `School-2` `College` `PSC-IT` `AP`
- Area of a Rectangle — `School-2` `College` `PSC-IT` `AP`
- Sum of Numbers from 1 to 100 — `School-2` `College` `PSC-IT` `AP`
- Sum of Numbers from 1 to n — `School-2` `College` `PSC-IT` `AP`
- Factorial of a Number — `School-2` `College` `PSC-IT` `AP` `Bank`
- AND, OR and XOR of Two Numbers — `School-2` `College` `PSC-IT` `AP`
- Positive, Negative or Zero — `School-2` `College` `PSC-IT` `AP`

---

## 5. Data Structures and Algorithms — `data-structures-algorithms`

### 5.1 Introduction and Complexity — `College` `PSC-IT` `AP` `Bank`

**Slug:** `introduction-and-complexity` · **Status:** English done

- Introduction to Data Structures — `College`
- Complexity of Algorithms — `College` `PSC-IT` `AP` `Bank`
- Time–Space Trade-off — `College` `Bank`
- Asymptotic Notations — `PSC-IT` `AP` `Bank`

### 5.2 Arrays — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `arrays` · **Status:** English done

- Array Representation and Operations — `School-2` `PSC-IT` `AP` `Bank`
- Sparse and Dense Matrices — `PSC-IT` `AP`

### 5.3 Recursion — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `recursion` · **Status:** English done

- Concept and Applications of Recursion — `School-2` `College` `PSC-IT` `AP`
- Factorial — `College` `Bank`
- Tower of Hanoi — `College`

### 5.4 Linked Lists — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `linked-lists` · **Status:** English done

- Abstract Data Types and List ADT — `College`
- Representation and Operations — `School-2` `PSC-IT` `AP` `Bank`
- Singly Linked List — `College`
- Two-Way (Doubly) Linked List — `College`
- Circular Linked List — `College`

### 5.5 Stacks and Queues — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `stacks-and-queues` · **Status:** In progress

- Structure and Operations of Stacks and Queues — `School-2` `College` `PSC-IT` `AP` `Bank`
- Implementation Strategies — `College`
- Applications of Stack — `School-2` `PSC-IT` `AP`
- Priority Queue — `Bank`

### 5.6 Prefix, Infix and Postfix Expressions — `College` `PSC-IT` `AP` `Bank`

**Slug:** `prefix-infix-postfix` · **Status:** English done

- Prefix, Infix and Postfix (Polish) Notation — `College` `PSC-IT` `AP` `Bank`
- Transformation and Evaluation Algorithms — `College` `Bank`

### 5.7 Searching — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `searching` · **Status:** English done

- Linear Search — `College` `Bank`
- Binary Search — `School-2` `College` `Bank`
- Searching Algorithms — `PSC-IT` `AP`

### 5.8 Sorting — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `sorting` · **Status:** English done

- Insertion Sort — `School-2` `College` `PSC-IT` `AP` `Bank`
- Selection Sort — `College` `PSC-IT` `AP` `Bank`
- Bubble Sort — `College` `Bank`
- Quick Sort — `College` `PSC-IT` `AP` `Bank`
- Merge Sort — `College` `PSC-IT` `AP` `Bank`
- Radix Sort — `College` `PSC-IT` `AP` `Bank`

### 5.9 Hashing — `College` `PSC-IT` `AP` `Bank`

**Slug:** `hashing` · **Status:** English done

- Hash Indices and Hash Functions — `College` `Bank`
- Static and Dynamic Hashing — `College` `Bank`
- Collisions and Collision Resolution Techniques — `College` `Bank`
- Basic Hashing Techniques — `PSC-IT` `AP` `Bank`

### 5.10 Trees and Binary Search Trees — `College` `PSC-IT` `AP` `Bank`

**Slug:** `trees-and-binary-search-trees` · **Status:** English done

- Tree Concepts — `College`
- Binary Trees — `College` `PSC-IT` `AP` `Bank`
- Traversing Binary Trees — `PSC-IT` `AP` `Bank`
- Binary Search Trees and Operations — `College` `PSC-IT` `AP` `Bank`

### 5.11 Heaps and Heap Sort — `College` `PSC-IT` `AP` `Bank`

**Slug:** `heaps-and-heap-sort` · **Status:** English done

- Binary Heaps — `College` `PSC-IT` `AP` `Bank`
- Heap Sort — `College` `PSC-IT` `AP`

### 5.12 AVL, B and B+ Trees — `College`

**Slug:** `avl-b-bplus-trees` · **Status:** English done

- AVL Tree
- B Tree
- B+ Tree

### 5.13 Huffman Coding — `College` `PSC-IT` `AP`

**Slug:** `huffman-coding` · **Status:** English done

- Huffman Encoding Technique / Algorithm — `College` `PSC-IT` `AP`

### 5.14 Graphs and Graph Traversal — `College` `PSC-IT` `AP` `Bank`

**Slug:** `graphs-and-graph-traversal` · **Status:** English done

- Graph Terminologies — `College`
- Representing Graphs and Graph Operations — `College` `PSC-IT` `AP` `Bank`
- Breadth-First Search (BFS) — `College` `Bank`
- Depth-First Search (DFS) — `College` `Bank`
- Graph Algorithms — `PSC-IT` `AP`

### 5.15 Minimum Spanning Trees — `College` `PSC-IT` `AP` `Bank`

**Slug:** `minimum-spanning-trees` · **Status:** English done

- Spanning Trees and Minimum Spanning Trees — `College` `PSC-IT` `AP`
- Kruskal's Algorithm — `College` `Bank`
- Prim's Algorithm — `College` `Bank`

### 5.16 Shortest Path Algorithms — `College` `PSC-IT` `AP` `Bank`

**Slug:** `shortest-path-algorithms` · **Status:** English done

- Shortest Path Problems — `College` `PSC-IT` `AP`
- Single-Source Shortest Paths — `College` `Bank`
- All-Pairs Shortest Paths — `College` `Bank`

### 5.17 Topological Sorting — `College` `PSC-IT` `AP` `Bank`

**Slug:** `topological-sorting` · **Status:** English done

### 5.18 Flow Networks — `College` `PSC-IT` `AP`

**Slug:** `flow-networks` · **Status:** English done

- Flow Networks — `College`
- Max-Flow Problem — `PSC-IT` `AP`

### 5.19 Algorithm Design and Analysis — `College` `PSC-IT` `AP` `Bank`

**Slug:** `algorithm-design-and-analysis` · **Status:** English done

- Analyzing and Designing Algorithms — `College` `PSC-IT` `AP` `Bank`
- Correctness of Algorithms — `College` `Bank`
- Techniques for Analysis of Algorithms — `PSC-IT` `AP` `Bank`

### 5.20 Greedy Algorithms — `College` `PSC-IT` `AP` `Bank`

**Slug:** `greedy-algorithms` · **Status:** English done

- Introduction to Greedy Algorithms — `College` `PSC-IT` `AP`
- Greedy Choice Property — `College`
- Greedy vs Dynamic Programming — `College` `Bank`
- Fractional Knapsack Problem — `College`
- Activity Selection Problem — `College`
- Task Scheduling Problem — `College`
- Coin Changing Problem — `College`

### 5.21 Divide and Conquer — `College` `PSC-IT` `AP`

**Slug:** `divide-and-conquer` · **Status:** English done

- Divide and Conquer Design Technique — `College` `PSC-IT` `AP`
- Quick Sort and Merge Sort — `College`
- Proof of Correctness and Run-Time Analysis — `College`

### 5.22 Dynamic Programming — `College` `PSC-IT` `AP` `Bank`

**Slug:** `dynamic-programming` · **Status:** In progress

- Introduction to Dynamic Programming — `College` `PSC-IT` `AP` `Bank`
- Principle of Optimality and Optimal Substructure — `College`
- Assembly Line Scheduling — `College`
- Matrix Chain Multiplication — `College`
- Longest Common Subsequence (LCS) — `College`
- Viterbi Algorithm — `College`
- Bitonic Euclidean Traveling Salesperson Problem — `College`
- 0/1 Knapsack Problem — `Bank`

### 5.23 Backtracking and Branch and Bound — `College` `PSC-IT` `AP`

**Slug:** `backtracking-and-branch-and-bound` · **Status:** English done

- Backtracking — `College`
- Branch and Bound — `PSC-IT` `AP`

### 5.24 String Matching — `PSC-IT` `AP`

**Slug:** `string-matching` · **Status:** English done

### 5.25 Computational Geometry — `PSC-IT` `AP`

**Slug:** `computational-geometry` · **Status:** English done

### 5.26 Approximation and Parallel Algorithms — `PSC-IT` `AP`

**Slug:** `approximation-and-parallel-algorithms` · **Status:** English done

- Approximation Algorithms
- Parallel Algorithms

---

## 6. Operating Systems — `operating-systems`

### 6.1 Operating System Fundamentals — `School` `School-2` `College` `PSC-IT` `AP`

**Slug:** `operating-system-fundamentals` · **Status:** English done

- Overview of Operating System — `College` `PSC-IT` `AP`
- Goals and Components of Operating System — `PSC-IT` `AP`
- Functions / Functionalities of Operating System — `School` `School-2` `College`
- Characteristics of Operating System — `College`
- Evolution of Operating System — `PSC-IT` `AP`
- Types of Operating System — `School` `School-2`
- DOS — `School`
- Windows — `School`
- Hardware Concepts Related to OS — `College`
  - CPU States
  - I/O Channels
  - Memory Hierarchy
  - Microprogramming

### 6.2 Process Management — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `process-management` · **Status:** In progress

- Concept of a Process — `School-2` `College` `Bank`
- Operations on Processes — `College`
- Process States — `College` `PSC-IT` `AP`
- Concurrent Processes — `College`
- Process Control Block (PCB) — `College` `PSC-IT` `AP`
- Process Context — `College`
- UNIX Process Control and Management — `College`
- Signals — `College`
- Process Hierarchies — `College`
- Forks and Pipes — `College`
- Threads: Process vs Thread — `Bank`

### 6.3 Interrupts and OS Organization — `College` `Bank`

**Slug:** `interrupts-and-os-organization` · **Status:** In progress

- Interrupt Processing — `College` `Bank`
- Operating System Organization — `College`
- OS Kernel — `College` `Bank`
- FLIH (First-Level Interrupt Handler) — `College`
- Dispatcher — `College`
- Interrupts and Traps — `Bank`

### 6.4 CPU Scheduling — `College` `PSC-IT` `AP` `Bank`

**Slug:** `cpu-scheduling` · **Status:** In progress

- Job and Processor Scheduling — `College` `PSC-IT` `AP` `Bank`
- Scheduling Algorithms — `College` `PSC-IT` `AP` `Bank`
- Starvation and Aging — `Bank`

### 6.5 Process Synchronization and Concurrency — `College` `PSC-IT` `AP` `Bank`

**Slug:** `process-synchronization-and-concurrency` · **Status:** English done

- Problems of Concurrent Processes — `College`
- Critical Section Problem — `College` `PSC-IT` `AP`
- Solutions to the Critical Section Problem — `PSC-IT` `AP`
- Mutual Exclusion — `College`
- Synchronization — `College`
- Deadlock (Introduction) — `College` `Bank`
- Process Co-operation — `College`
- Producer and Consumer Processes — `College` `Bank`

### 6.6 Semaphores and Synchronization Mechanisms — `College` `PSC-IT` `AP` `Bank`

**Slug:** `semaphores-and-synchronization-mechanisms` · **Status:** In progress

- Definition of Semaphores — `College` `PSC-IT` `AP`
- Semaphore Initialization — `College`
- Wait Operation — `College`
- Signal Operation — `College`
- Use of Semaphores to Implement Mutex — `College`
- Process Synchronization Using Semaphores — `College` `Bank`
- Implementation of Semaphores — `College`
- Critical Regions — `College`
- Conditional Critical Regions — `College`
- Monitors — `College`
- Ada Tasks — `College`
- Readers–Writers and Dining Philosophers Problems — `Bank`

### 6.7 Interprocess Communication (IPC) — `College` `PSC-IT` `AP`

**Slug:** `ipc` · **Status:** English done

- IPC Techniques — `College` `PSC-IT` `AP`
- Message Passing — `College`
- Direct Communication — `College`
- Indirect Communication — `College`

### 6.8 Deadlock Management — `College` `PSC-IT` `AP` `Bank`

**Slug:** `deadlock-management` · **Status:** English done

- Deadlock Handling Methods — `PSC-IT` `AP` `Bank`
- Deadlock Prevention — `College` `Bank`
- Deadlock Detection — `College` `Bank`
- Deadlock Avoidance — `College` `Bank`
- Banker's Algorithm — `College` `Bank`

### 6.9 Memory Management — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `memory-management` · **Status:** In progress

- Memory Organization and Management — `College` `Bank`
- Memory Management Techniques — `School-2` `PSC-IT` `AP`
- Storage Allocation — `College` `Bank`
- Paging — `College` `PSC-IT` `AP` `Bank`
- Segmentation — `School-2` `College` `PSC-IT` `AP` `Bank`
- Address Mapping — `College`
- Swapping — `Bank`
- Fragmentation — `Bank`

### 6.10 Virtual Memory — `College` `PSC-IT` `AP` `Bank`

**Slug:** `virtual-memory` · **Status:** In progress

- Virtual Memory Concepts — `College` `Bank`
- Virtual Storage Management — `College` `Bank`
- Page Replacement Strategies — `College` `PSC-IT` `AP` `Bank`
- Page Fault Handling — `Bank`

### 6.11 Secondary Storage Management — `PSC-IT` `AP`

**Slug:** `secondary-storage-management` · **Status:** English done

- Disk Scheduling Algorithms

### 6.12 File System — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `file-system` · **Status:** In progress

- File Management — `School-2` `PSC-IT` `AP`
- File System Structure — `PSC-IT` `AP`
- File Organization — `College` `PSC-IT` `AP` `Bank`
- Blocking and Buffering — `College`
- File Descriptors — `College`
- File and Directory Structures — `College`
- Directory Tree — `College`
- Blocks and Fragments — `College` `Bank`
- Inodes — `College`
- UNIX File Structure — `College`
- File Control Block (FCB) — `PSC-IT` `AP`
- Space Allocation — `PSC-IT` `AP`
- Tree-Structured File System — `PSC-IT` `AP`
- File Access Methods — `Bank`
- File Systems: FAT32, NTFS and ext4 — `Bank`

### 6.13 Protection and Security — `PSC-IT` `AP` `Bank`

**Slug:** `protection-and-security` · **Status:** English done

- Classification of Protection and Security Issues — `PSC-IT` `AP`
- Protection and Security Handling Techniques — `PSC-IT` `AP` `Bank`

### 6.14 Linux — `Others` `Bank`

**Slug:** `linux` · **Status:** English done

- Introduction and History of Linux — `Others`
- Linux Distributions — `Others`
- Linux Architecture: Kernel, Shell, Utilities — `Others`
- Linux File System Hierarchy — `Others`
- Basic Linux Commands — `Others` `Bank`
- File Permissions and Ownership — `Others` `Bank`
- Users and Groups — `Others`
- Process Management Commands — `Others` `Bank`
- Package Management — `Others`
- Shell Scripting Basics — `Others`

---

## 7. Software Engineering, Web Technologies and E-Commerce — `software-engineering`

### 7.1 Introduction to Software Engineering — `College` `PSC-IT` `AP`

**Slug:** `introduction-to-software-engineering` · **Status:** English done

- Introduction and Software Process — `PSC-IT` `AP`
- History and Nature of Software Engineering — `College`
- Relation of Software Engineering to Other Disciplines — `College`
- Programming Languages — `College`

### 7.2 Software Qualities — `College`

**Slug:** `software-qualities` · **Status:** English done

- Software Nature and Qualities
- Product Qualities and Project Qualities
- Correctness, Robustness, Usability, Maintainability, Portability
- Quality Measurements

### 7.3 Software Development Life Cycle — `College` `Bank`

**Slug:** `software-development-life-cycle` · **Status:** English done

- Requirement, Design, Development, Testing, Maintenance — `College`

### 7.4 Software Development Models — `College` `Bank`

**Slug:** `software-development-models` · **Status:** English done

- Waterfall Model — `College` `Bank`
- Agile Model — `College` `Bank`
- Spiral Model — `College` `Bank`
- RDD (see note N6) — `College` `Bank`
- V Model — `College` `Bank`

### 7.5 Software Engineering Principles — `College`

**Slug:** `software-engineering-principles` · **Status:** English done

- Modularity, Abstraction, Generality
- Object-Oriented, Component-Oriented, Structured

### 7.6 Requirements Engineering — `College` `PSC-IT` `AP` `Bank`

**Slug:** `requirements-engineering` · **Status:** English done

- Requirements Engineering Processes — `PSC-IT` `AP`
- Requirement Specification — `College` `Bank`
- Descriptive Specification — `College`

### 7.7 System Modeling and Design — `College` `PSC-IT` `AP` `Bank`

**Slug:** `system-modeling-and-design` · **Status:** In progress

- System Models: Context, Behavioral and Object Models — `PSC-IT` `AP`
- Basics of Modeling Diagrams — `College` `Bank`
- UI Design — `College`
- Object-Oriented Design Techniques — `PSC-IT` `AP`
- Real-Time Software Design — `PSC-IT` `AP`
- System Design with Reuse — `PSC-IT` `AP`
- Design Patterns and Architectural Patterns — `Bank`

### 7.8 Critical Systems — `PSC-IT` `AP`

**Slug:** `critical-systems` · **Status:** English done

- Critical System Design and Dependability
- Critical System Specification and Development

### 7.9 Verification, Validation and Testing — `College` `PSC-IT` `AP` `Bank`

**Slug:** `verification-validation-and-testing` · **Status:** English done

- Verification and Validation — `College` `PSC-IT` `AP` `Bank`
- Software Testing — `College` `PSC-IT` `AP` `Bank`
- Analysis and Debugging — `College`

### 7.10 Software Maintenance — `PSC-IT` `AP` `Bank`

**Slug:** `software-maintenance` · **Status:** English done

### 7.11 Software Project Management — `College` `PSC-IT` `AP` `Bank`

**Slug:** `software-project-management` · **Status:** English done

- Project Management Concepts — `College` `PSC-IT` `AP` `Bank`
- Project Metrics — `College` `Bank`
- Estimation — `College` `Bank`
- Risk Management — `College`

### 7.12 Software Cost Estimation and Metrics — `PSC-IT` `AP` `Bank`

**Slug:** `software-cost-estimation-and-metrics` · **Status:** English done

- COCOMO Model — `PSC-IT` `AP` `Bank`
- Halstead Formula — `PSC-IT` `AP` `Bank`
- Graph-Based Complexity Measures (see note N7) — `PSC-IT` `AP` `Bank`

### 7.13 Reliability and Quality Assurance — `PSC-IT` `AP` `Bank`

**Slug:** `reliability-and-quality-assurance` · **Status:** In progress

- Software Reliability and Availability — `PSC-IT` `AP`
- Quality Assurance — `PSC-IT` `AP` `Bank`
- Software Quality Control (SQC) — `Bank`
- Software Quality Metrics — `Bank`
- Software Auditing — `Bank`

### 7.14 System Analysis and Design — `Others` `Bank`

**Slug:** `system-analysis-and-design` · **Status:** English done

- System Concepts and Characteristics — `Others`
- Types of Information Systems — `Others`
- Role of the System Analyst — `Others`
- System Development Phases in System Analysis and Design — `Others` `Bank`
- Feasibility Study: Technical, Economic, Operational — `Others` `Bank`
- Fact-Finding Techniques — `Others`
- Data Flow Diagram (DFD) — `Others` `Bank`
- Data Dictionary — `Others`
- Decision Tables and Decision Trees — `Others`
- System Implementation and Conversion Methods — `Others`

### 7.15 HTML, CSS and JavaScript — `College`

**Slug:** `html-css-and-javascript` · **Status:** English done

### 7.16 Server-Side Programming — `College` `Bank`

**Slug:** `server-side-programming` · **Status:** English done

- HTTP Server — `College` `Bank`
- Application Server — `College` `Bank`
- MVC Web Framework — `College`

### 7.17 Web Services — `College`

**Slug:** `web-services` · **Status:** English done

### 7.18 Database Access — `College`

**Slug:** `database-access` · **Status:** English done

- Object-Relational Mapping (ORM)
- Lambda Expressions
- Language Integrated Query (LINQ)
- Data Reader and Writer

### 7.19 Introduction to E-Commerce — `Others`

**Slug:** `introduction-to-e-commerce` · **Status:** English done

- Definition and History
- E-Commerce vs E-Business
- Advantages and Disadvantages

### 7.20 E-Commerce Business Models — `Others`

**Slug:** `e-commerce-business-models` · **Status:** English done

- B2B, B2C, C2C, C2B
- B2G and G2C

### 7.21 Electronic Payment Systems — `Others`

**Slug:** `electronic-payment-systems` · **Status:** English done

- Credit and Debit Cards
- Electronic Wallets and Mobile Financial Services
- Payment Gateways
- Electronic Funds Transfer (EFT)

### 7.22 E-Commerce Security — `Others`

**Slug:** `e-commerce-security` · **Status:** English done

- Security Threats
- Encryption, SSL/TLS and Digital Certificates

### 7.23 M-Commerce and Digital Marketing — `Others`

**Slug:** `m-commerce-and-digital-marketing` · **Status:** English done

- Mobile Commerce
- Online Advertising and Digital Marketing

### 7.24 Legal and Ethical Issues in E-Commerce — `Others`

**Slug:** `legal-and-ethical-issues-in-e-commerce` · **Status:** English done

### 7.25 Version Control and DevOps — `Bank`

**Slug:** `version-control-and-devops` · **Status:** Not started

- Version Control and Git Commands
- Branching and Merging
- DevOps and Its Significance
- DevSecOps

---

## 8. Database Management Systems — `dbms`

### 8.1 Introduction to Database Systems — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `introduction-to-database-systems` · **Status:** English done

- Evolution of File Processing Systems — `College`
- Role of Databases in Organizations — `College`
- Core Components of a Database Environment — `College`
- Definition of DBMS — `School-2` `PSC-IT` `AP` `Bank`
- Types of DBMS — `School-2` `PSC-IT` `AP`
- Advantages and Disadvantages of DBMS — `School-2` `PSC-IT` `AP`

### 8.2 Data Models and the ER Model — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `data-models-and-the-er-model` · **Status:** English done

- Data Models — `School-2` `PSC-IT` `AP` `Bank`
- Entity-Relationship (ER) Model — `School-2` `College` `PSC-IT` `AP` `Bank`
- ER Diagram Symbols and Constructs — `College` `Bank`

### 8.3 The Relational Model — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `the-relational-model` · **Status:** English done

- Relational Model — `School-2` `College` `PSC-IT` `AP` `Bank`
- Integrity Constraints — `PSC-IT` `AP` `Bank`
- Transforming an ER Diagram into a Relational Model — `College`

### 8.4 Normalization — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `normalization` · **Status:** English done

- Concept of Normalization — `School-2` `College` `PSC-IT` `AP` `Bank`
- Functional Dependencies — `PSC-IT` `AP` `Bank`
- 2NF, 3NF and BCNF — `PSC-IT` `AP` `Bank`

### 8.5 SQL — `College` `PSC-IT` `AP` `Bank`

**Slug:** `sql` · **Status:** English done

- SQL — `College` `PSC-IT` `AP` `Bank`
- Assertions and Triggers — `PSC-IT` `AP` `Bank`
- Applications Using SQL — `PSC-IT` `AP`

### 8.6 File Organization — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `file-organization` · **Status:** English done

- Concept of File Organization — `School-2` `PSC-IT` `AP`
- Classification and Representation — `PSC-IT` `AP` `Bank`

### 8.7 Indexing and Hashing — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `indexing-and-hashing` · **Status:** English done

- Basic Concepts of Indexing — `School-2` `College` `PSC-IT` `AP`
- Ordered Indices — `College`
- Sparse and Dense Indexing — `PSC-IT` `AP`
- B+-Tree Index Files — `College` `PSC-IT` `AP`
- B-Tree Index Files — `College`
- Static and Dynamic Hashing / Hash Indexing — `College` `PSC-IT` `AP` `Bank`
- Comparison of Ordered Indexing and Hashing — `College`

### 8.8 Query Processing — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `query-processing` · **Status:** English done

- Concept and Overview of Query Processing — `School-2` `College` `Bank`
- Notations — `PSC-IT` `AP`
- Measures of Query Cost — `College`
- Selection Operation and Its Cost Estimation — `College` `PSC-IT` `AP`
- Sorting — `College`
- Join Operation and Its Cost Estimation — `College` `PSC-IT` `AP`
- Evaluation of Expressions — `College`

### 8.9 Query Optimization — `College`

**Slug:** `query-optimization` · **Status:** English done

- Transformation of Relational Expressions
- Catalog and Statistical Information for Cost Estimation
- Cost-Based Optimization

### 8.10 Transactions — `College` `PSC-IT` `AP` `Bank`

**Slug:** `transactions` · **Status:** English done

- Transaction Concept — `College` `PSC-IT` `AP` `Bank`
- Transaction State — `College`
- Concurrent Executions — `College` `Bank`
- Serializability — `College` `Bank`

### 8.11 Concurrency Control — `College` `PSC-IT` `AP` `Bank`

**Slug:** `concurrency-control` · **Status:** English done

- Lock-Based Protocols — `College` `PSC-IT` `AP` `Bank`
- Timestamp-Based Protocols — `College`
- Deadlock Handling — `PSC-IT` `AP`

### 8.12 Recovery System — `College` `Bank`

**Slug:** `recovery-system` · **Status:** In progress

- Failure Classification — `College` `Bank`
- Storage Structure — `College`
- Recovery and Atomicity — `College` `Bank`
- Log-Based Recovery — `College` `Bank`
- Recovery with Concurrent Transactions — `College`
- Backup and Restore — `Bank`

### 8.13 Object-Oriented Databases — `College`

**Slug:** `object-oriented-databases` · **Status:** English done

- Object-Oriented Data Model
- Implementing Object Persistence Using Relational Databases

### 8.14 Data Analysis and Mining — `College`

**Slug:** `data-analysis-and-mining` · **Status:** English done

- Data Mining
- Decision Tree
- Bayes Theory
- Randomized Trees (see note N8)

### 8.15 Database System Architectures — `College`

**Slug:** `database-system-architectures` · **Status:** English done

- Centralized and Client-Server Systems
- Server System Architectures
- Parallel Systems
- Distributed Systems
- Network Types

### 8.16 Parallel Databases — `College`

**Slug:** `parallel-databases` · **Status:** English done

- I/O Parallelism
- Interquery and Intraquery Parallelism
- Intraoperation and Interoperation Parallelism

### 8.17 Distributed Databases — `College`

**Slug:** `distributed-databases` · **Status:** English done

- Heterogeneous and Homogeneous Databases
- Distributed Data Storage
- Distributed Transactions
- Commit Protocols

### 8.18 Database Design, Tuning and Security — `College`

**Slug:** `database-design-tuning-and-security` · **Status:** English done

- Database Design
- Database Tuning
- Security and Authorization
- Multidimensional Queries

---

## 9. Computer Networks and Data Communication — `computer-networks`

### 9.1 Introduction to Computer Networks — `School-2` `College` `PSC-IT` `AP` `Bank`

**Slug:** `introduction-to-computer-networks` · **Status:** In progress

- Overview of the Internet — `College`
- Overview of Networking Protocols — `School-2` `College` `PSC-IT` `AP` `Bank`
- Network Edge and Network Core — `College`
- Protocol Layers and Service Models — `College`
- Types of Networks: LAN, MAN, WAN — `School-2` `PSC-IT` `AP`
- Network Delays, Throughput, Goodput and Bandwidth-Delay Product — `Bank`

### 9.2 Network Topologies — `School-2` `PSC-IT` `AP`

**Slug:** `network-topologies` · **Status:** English done

- Star, Switched, Bus and Ring Topologies — `School-2` `PSC-IT` `AP`

### 9.3 OSI and TCP/IP Models — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `osi-and-tcp-ip` · **Status:** English done

- OSI Model — `School-2` `PSC-IT` `AP` `Bank`
- Functions of Each Layer — `School-2` `Bank`
- TCP/IP Protocol Suite — `School-2` `PSC-IT` `AP`

### 9.4 Network Devices and Internetworking — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `network-devices-and-internetworking` · **Status:** In progress

- Network Devices Used at Each Layer — `School-2` `Bank`
- Bridges and Routers — `PSC-IT` `AP` `Bank`
- Network Interconnection — `PSC-IT` `AP`
- VLANs and Trunking — `Bank`

### 9.5 Data Transmission Basics — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `data-transmission-basics` · **Status:** English done

- Data Communication — `School-2`
- Analog and Digital Data — `PSC-IT` `AP`
- Data Rate and Baud Rate — `School-2` `PSC-IT` `AP` `Bank`
- Channel Capacity — `School-2` `PSC-IT` `AP` `Bank`
- Bandwidth and Frequency Spectrum — `School-2` `PSC-IT` `AP` `Bank`
- Baseband and Broadband — `School-2`
- Transmission Impairments — `PSC-IT` `AP`

### 9.6 Transmission Modes and Media — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `transmission-modes-and-media` · **Status:** English done

- Transmission Modes and Transmission Systems — `School-2`
- Synchronous and Asynchronous Transmission — `PSC-IT` `AP` `Bank`
- Guided Media: STP, UTP, Coaxial, Optical Fiber — `School-2` `PSC-IT` `AP`
- Unguided (Wireless) Media — `School-2` `PSC-IT` `AP`
- Satellite Communication — `School-2`
- Null Modem Configuration — `PSC-IT` `AP`

### 9.7 Data Encoding — `PSC-IT` `AP`

**Slug:** `data-encoding` · **Status:** English done

- NRZ, NRZI
- Manchester and Differential Manchester

### 9.8 Modulation Techniques — `School-2` `PSC-IT` `AP`

**Slug:** `modulation-techniques` · **Status:** English done

- Modulation and Demodulation — `School-2` `PSC-IT` `AP`
- Digital Modulation Techniques — `School-2` `PSC-IT` `AP`
- AM, FM, PM — `PSC-IT` `AP`
- Delta Modulation and Companding (see note N10) — `PSC-IT` `AP`
- ASK, PSK, FSK, QPSK, QAM — `PSC-IT` `AP`
- Sampling Theorem — `PSC-IT` `AP`
- PCM, PPM, PAM — `PSC-IT` `AP`

### 9.9 Data Link Control — `PSC-IT` `AP` `Bank`

**Slug:** `data-link-control` · **Status:** English done

- Error Control and Flow Control — `PSC-IT` `AP` `Bank`
- CRC — `PSC-IT` `AP` `Bank`
- HDLC — `PSC-IT` `AP` `Bank`

### 9.10 Multiplexing — `PSC-IT` `AP` `Bank`

**Slug:** `multiplexing` · **Status:** English done

- FDM, TDM, Statistical TDM — `PSC-IT` `AP` `Bank`

### 9.11 Switching Techniques — `PSC-IT` `AP` `Bank`

**Slug:** `switching-techniques` · **Status:** English done

- Circuit Switching — `PSC-IT` `AP` `Bank`
- Packet Switching — `PSC-IT` `AP` `Bank`

### 9.12 Ethernet and LAN Standards — `PSC-IT` `AP` `Bank`

**Slug:** `ethernet-and-lan-standards` · **Status:** English done

### 9.13 Application Layer — `College` `PSC-IT` `AP` `Bank`

**Slug:** `application-layer` · **Status:** In progress

- Principles of Network Applications — `College` `Bank`
- Web and HTTP — `College` `PSC-IT` `AP` `Bank`
- FTP — `College`
- E-mail — `College` `PSC-IT` `AP`
- DNS — `College` `PSC-IT` `AP` `Bank`
- Important Protocols and Port Numbers — `Bank`
- Proxy Server and Reverse Proxy — `Bank`

### 9.14 Transport Layer — `College` `PSC-IT` `AP` `Bank`

**Slug:** `transport-layer` · **Status:** English done

- Transport Layer Services — `College` `PSC-IT` `AP` `Bank`
- Multiplexing and Demultiplexing — `College`
- Connectionless Transport: UDP — `College` `PSC-IT` `AP` `Bank`
- Principles of Reliable Data Transfer — `College`
- Connection-Oriented Transport: TCP — `College` `PSC-IT` `AP` `Bank`
- Principles of Congestion Control — `College` `PSC-IT` `AP` `Bank`
- TCP Congestion Control — `College` `Bank`

### 9.15 Network Layer and IP — `College` `PSC-IT` `AP` `Bank`

**Slug:** `network-layer-and-ip` · **Status:** In progress

- Datagram Networks — `College`
- Inside a Router — `College`
- Internet Protocol (IP) — `College` `PSC-IT` `AP`
- IP Addresses — `PSC-IT` `AP` `Bank`
- IP Subnetting — `College` `Bank`
- ARP and ICMP (see note N11) — `PSC-IT` `AP`
- IPv6 — `PSC-IT` `AP`
- NAT and PAT — `Bank`
- Quality of Service (QoS) — `Bank`

### 9.16 Routing — `College` `PSC-IT` `AP` `Bank`

**Slug:** `routing` · **Status:** English done

- Link-State and Distance-Vector Routing Algorithms — `College` `Bank`
- RIP, OSPF, BGP — `College` `Bank`
- Unicast and Multicast Routing Protocols — `PSC-IT` `AP` `Bank`

### 9.17 Wireless and Cellular Networks — `PSC-IT` `AP`

**Slug:** `wireless-and-cellular-networks` · **Status:** English done

- Wireless LAN
- VSAT
- Analog and Digital Cellular Systems

### 9.18 ATM — `PSC-IT` `AP`

**Slug:** `atm` · **Status:** English done

- ATM Switches
- ATM Protocol

### 9.19 Telecommunication — `Others`

**Slug:** `telecommunication` · **Status:** English done

- Elements of a Telecommunication System
- Telephone Networks (PSTN)
- Telephone Switching Systems
- Mobile Communication Generations (1G–5G)
- GSM Architecture
- Multiple Access Techniques: FDMA, TDMA, CDMA
- Spread Spectrum
- Optical Fiber Communication Systems
- Satellite Communication Systems

---

## 10. Artificial Intelligence, Big Data and Cloud Computing — `artificial-intelligence`

The AI topics (10.1–10.10) are tagged `PSC-IT` and `AP` based on note N1; the Big Data and Cloud Computing topics (10.11–10.18) are tagged `Others`.

### 10.1 Overview of AI — `PSC-IT` `AP`

**Slug:** `overview-of-ai` · **Status:** English done

### 10.2 Knowledge Representation — `PSC-IT` `AP`

**Slug:** `knowledge-representation` · **Status:** English done

- General Concepts of Knowledge
- Knowledge Representation
- Knowledge Organization and Manipulation

### 10.3 Introduction to PROLOG — `PSC-IT` `AP`

**Slug:** `introduction-to-prolog` · **Status:** English done

### 10.4 Intelligent Agents — `PSC-IT` `AP`

**Slug:** `intelligent-agents` · **Status:** English done

### 10.5 First-Order Logic — `PSC-IT` `AP`

**Slug:** `first-order-logic` · **Status:** English done

### 10.6 Search Strategies and Game Playing — `PSC-IT` `AP`

**Slug:** `search-strategies-and-game-playing` · **Status:** English done

- Search Strategies
- Matching Techniques
- Game Planning

### 10.7 Natural Language Processing — `PSC-IT` `AP`

**Slug:** `natural-language-processing` · **Status:** English done

### 10.8 Probabilistic Reasoning — `PSC-IT` `AP`

**Slug:** `probabilistic-reasoning` · **Status:** English done

### 10.9 Expert Systems and Computer Vision — `PSC-IT` `AP`

**Slug:** `expert-systems-and-computer-vision` · **Status:** English done

### 10.10 Knowledge Acquisition and Learning — `PSC-IT` `AP` `Bank`

**Slug:** `knowledge-acquisition-and-learning` · **Status:** English done

- Learning in Symbolic and Non-Symbolic Representation — `PSC-IT` `AP` `Bank`

### 10.11 Introduction to Big Data — `Others`

**Slug:** `introduction-to-big-data` · **Status:** English done

- Definition of Big Data
- Characteristics of Big Data (the "V"s)
- Sources and Types of Data: Structured, Semi-Structured, Unstructured

### 10.12 Big Data Technologies — `Others` `Bank`

**Slug:** `big-data-technologies` · **Status:** English done

- Hadoop and HDFS — `Others`
- MapReduce — `Others`
- Apache Spark — `Others`
- NoSQL Databases — `Others` `Bank`

### 10.13 Data Warehousing and Analytics — `Others` `Bank`

**Slug:** `data-warehousing-and-analytics` · **Status:** In progress

- Data Warehouse Concepts — `Others` `Bank`
- Data Analytics — `Others`
- Data Lake vs Data Warehouse — `Bank`

### 10.14 Introduction to Cloud Computing — `Others`

**Slug:** `introduction-to-cloud-computing` · **Status:** English done

- Definition and Essential Characteristics
- Advantages and Disadvantages

### 10.15 Cloud Service Models — `Others` `Bank`

**Slug:** `cloud-service-models` · **Status:** English done

- IaaS, PaaS, SaaS — `Others` `Bank`

### 10.16 Cloud Deployment Models — `Others` `Bank`

**Slug:** `cloud-deployment-models` · **Status:** English done

- Public, Private, Hybrid and Community Clouds — `Others` `Bank`

### 10.17 Virtualization — `Others` `Bank`

**Slug:** `virtualization` · **Status:** English done

- Virtual Machines and Hypervisors (Type 1 and Type 2) — `Others` `Bank`
- Containers — `Others` `Bank`

### 10.18 Cloud Security and Related Computing Models — `Others` `Bank`

**Slug:** `cloud-security` · **Status:** English done

- Cloud Security Issues — `Others` `Bank`
- Edge and Fog Computing — `Others` `Bank`

### 10.19 Cloud Infrastructure and Operations — `Bank`

**Slug:** `cloud-infrastructure-and-operations` · **Status:** Not started

- Cloud Service Providers: AWS, Microsoft Azure and Google Cloud
- Content Delivery Network (CDN)
- Role of APIs in Cloud Computing
- Docker and Kubernetes
- Load Balancing and Auto Scaling
- Cloud Bursting
- Data Privacy and Data Sovereignty
- Green Cloud Computing

### 10.20 Machine Learning Fundamentals — `Bank`

**Slug:** `machine-learning-fundamentals` · **Status:** Not started

- Classification vs Regression
- Supervised vs Unsupervised Learning
- Overfitting and Underfitting
- Gradient Descent
- Linear Regression

### 10.21 Generative AI and Large Language Models — `Bank`

**Slug:** `generative-ai-and-llms` · **Status:** Not started

- Generative AI
- Large Language Models (LLMs) and Transformers
- Prompt Engineering

---

## 11. Computer Architecture and Organization — `computer-architecture`

### 11.1 Fundamentals of Computer Design — `PSC-IT` `AP` `Bank`

**Slug:** `fundamentals-of-computer-design` · **Status:** Not started

- Fundamentals of Computer Design — `PSC-IT` `AP` `Bank`
- Processor and ALU Design — `PSC-IT` `AP` `Bank`
- Von Neumann Architecture — `Bank`
- Instruction Cycle (Fetch, Decode, Execute) — `Bank`
- CPU Execution Time and Performance Calculation — `Bank`

### 11.2 Memory — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `memory` · **Status:** Not started

- Memory Hierarchy — `School-2` `Bank`
- Types of Memory — `School-2` `Bank`
- RAM Structure and Addressing Techniques — `School-2`
- Characteristics of PROM, EPROM and EEPROM — `School-2`
- Cache Memory — `School-2` `PSC-IT` `AP` `Bank`
- Definition of Virtual Memory — `School-2`
- Memory Organization and Memory System — `PSC-IT` `AP`
- SRAM vs DRAM — `Bank`
- Cache Mapping Techniques (Direct, Associative, Set-Associative) — `Bank`
- Cache Hit, Miss, Hit Ratio and Miss Penalty — `Bank`
- Memory Interleaving — `Bank`

### 11.3 Secondary Storage Devices — `School-2` `Bank`

**Slug:** `secondary-storage-devices` · **Status:** Not started

- Hard Disk — `School-2` `Bank`
- Optical Disk — `School-2`
- Flash Memory — `School-2` `Bank`
- HDD vs SSD — `Bank`
- RAID — `Bank`

### 11.4 Control Unit Design — `School-2` `PSC-IT` `AP`

**Slug:** `control-unit-design` · **Status:** Not started

- Control Unit Design Approaches — `School-2`
- Hardwired Control — `PSC-IT` `AP`
- Micro-programmed Control — `PSC-IT` `AP`

### 11.5 Instruction Set Architecture — `School-2` `Bank`

**Slug:** `instruction-set-architecture` · **Status:** Not started

- RISC and CISC Processors — `School-2` `Bank`
- Opcode Encoding (Huffman) — `School-2`

### 11.6 Input/Output Organization — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `io-organization` · **Status:** Not started

- Programmed I/O — `School-2`
- Interrupt-Driven I/O — `School-2`
- DMA (Direct Memory Access) — `School-2`
- I/O Subsystem and I/O Processor — `PSC-IT` `AP`
- System Organization and Bus — `PSC-IT` `AP` `Bank`

### 11.7 Interrupts and Exceptions — `PSC-IT` `AP`

**Slug:** `interrupts-and-exceptions` · **Status:** Not started

### 11.8 Pipelining — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `pipelining` · **Status:** Not started

- Pipelining and Pipeline Processors — `School-2` `PSC-IT` `AP` `Bank`
- Hazards — `PSC-IT` `AP` `Bank`

### 11.9 Parallel Processing — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `parallel-processing` · **Status:** Not started

- Parallel Processing Concepts — `School-2` `PSC-IT` `AP` `Bank`
- Multiprocessing (Definition) — `School-2`
- Systolic Arrays — `PSC-IT` `AP`
- Fault-Tolerant Computers — `PSC-IT` `AP`
- GPU vs CPU — `Bank`

### 11.10 Quantum Computing — `Bank`

**Slug:** `quantum-computing` · **Status:** Not started

- Basic Concepts of Quantum Computing

---

## 12. Microprocessors, Microcontrollers and Interfacing — `microprocessors`

### 12.1 Microprocessor Fundamentals — `School-2` `PSC-IT` `AP`

**Slug:** `microprocessor-fundamentals` · **Status:** Not started

- Microprocessors and Microcomputers — `PSC-IT` `AP`
- Evolution of the Microprocessor — `PSC-IT` `AP`
- Architecture and Operation of a General-Purpose Microprocessor — `PSC-IT` `AP`
- CPU, ALU and Control Unit — `School-2`

### 12.2 Intel 8085/8086 Architecture — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `intel-8085-8086` · **Status:** Not started

- Intel 8085/8086 Architecture — `School-2` `PSC-IT` `AP` `Bank`
- Register Structure — `School-2` `PSC-IT` `AP`
- Segment Registers — `School-2`
- Programming Model — `PSC-IT` `AP`
- 8086 vs 8088 — `Bank`

### 12.3 Addressing Modes and Instruction Set — `School-2` `PSC-IT` `AP` `Bank`

**Slug:** `addressing-modes-and-instruction-set` · **Status:** Not started

- Addressing Modes — `PSC-IT` `AP` `Bank`
- Common Instruction Types — `PSC-IT` `AP`
- Instruction Set — `School-2` `PSC-IT` `AP`

### 12.4 Assembly Language Programming — `School-2` `PSC-IT` `AP`

**Slug:** `assembly-language-programming` · **Status:** Not started

- Assembly Language Programming — `School-2` `PSC-IT` `AP`
- Arithmetic and Logical Programs — `School-2`
- Input/Output Programs — `School-2`

### 12.5 Microprocessor Interrupts — `PSC-IT` `AP`

**Slug:** `microprocessor-interrupts` · **Status:** Not started

- Classification of Interrupts
- Interrupt Handling

### 12.6 Memory Management in the Intel 80x86 Family — `PSC-IT` `AP`

**Slug:** `x86-memory-management` · **Status:** Not started

- Real-Mode Memory Management
- Segmentation and Physical Address Translation
- Protected-Mode Memory Management
- Segmentation and Virtual Addressing
- Segment Selectors, Descriptors and Tables
- 80386 and 80486 Register Formats
- Paged Memory Operation and TLB Structure

### 12.7 I/O Interfacing and Peripheral Chips — `PSC-IT` `AP`

**Slug:** `io-interfacing` · **Status:** Not started

- I/O Port Organization and Access
- Interfacing the Keyboard, Printer and Monitor
- 8255A, 8253, 8272, 8259A and 8237 Chips
- Bus Interfaces

### 12.8 Microcontrollers and PLC — `School-2` `PSC-IT` `AP`

**Slug:** `microcontrollers-and-plc` · **Status:** Not started

- Control Systems — `School-2`
- Microcontroller: Definition, Applications and Advantages — `School-2` `PSC-IT` `AP`
- Microcontroller Architecture — `School-2`
- Applications of PLC — `School-2`

### 12.9 Interfaces and Peripheral Devices — `School-2`

**Slug:** `interfaces-and-peripheral-devices` · **Status:** Not started

- Parallel and Serial Interfaces
- Keyboard Encoder, Mouse, Scanner
- LCD Display
- Printers: Dot Matrix, Inkjet, Laser
- UART/USART
- Serial, Parallel and USB Ports
- OMR, OCR, MICR, Barcode Reader
- Light Pen, Plotter, Modem

---

## 13. Computer Maintenance and Troubleshooting — `computer-maintenance`

### 13.1 Types of Maintenance — `School-2`

**Slug:** `types-of-maintenance` · **Status:** Not started

- Preventive Maintenance
- Corrective Maintenance

### 13.2 System Unit Components — `School-2`

**Slug:** `system-unit-components` · **Status:** Not started

- System Unit
- Motherboard Slots and Sockets
- BIOS
- Power Supply Output Voltages and Signals
- Memory Modules
- Expansion Cards

### 13.3 Installation and Utility Software — `School-2`

**Slug:** `installation-and-utility-software` · **Status:** Not started

- Operating System Installation
- Driver Installation
- Use of Utility Software

---

## 14. Cybersecurity — `cybersecurity`

### 14.1 Network Security — `PSC-IT` `AP` `Bank`

**Slug:** `network-security` · **Status:** Not started

- Types of Attack — `PSC-IT` `AP` `Bank`
- Encryption Techniques — `PSC-IT` `AP` `Bank`
- Digital Signatures — `PSC-IT` `AP`

### 14.2 Web Security — `College` `Bank`

**Slug:** `web-security` · **Status:** Not started

- Denial of Service — `College`
- Buffer Overflow — `College`
- Cross-Site Scripting — `College`
- Authentication and Access Control — `College` `Bank`

### 14.3 Security Fundamentals — `Bank`

**Slug:** `security-fundamentals` · **Status:** Not started

- CIA Triad
- Vulnerability, Threat and Risk
- Attack Surface and Attack Vectors
- Penetration Testing vs Vulnerability Assessment

### 14.4 Cryptographic Techniques — `Bank`

**Slug:** `cryptographic-techniques` · **Status:** Not started

- Symmetric and Asymmetric Encryption
- Hashing Techniques
- Hashing vs Encryption vs Encoding
- Message Authentication Code (MAC) and HMAC
- Digital Certificates and Certificate Authority (CA)
- Blockchain

### 14.5 Network Security Technologies — `Bank`

**Slug:** `network-security-technologies` · **Status:** Not started

- Firewall and Web Application Firewall (WAF)
- Intrusion Detection and Prevention Systems (IDS and IPS)
- DMZ (Demilitarized Zone)
- VPN and Its Types (IPsec and SSL/TLS VPN Tunnelling)
- TLS/SSL and HTTPS

### 14.6 Authentication and Access Control Models — `Bank`

**Slug:** `authentication-and-access-control-models` · **Status:** Not started

- Two-Factor and Multi-Factor Authentication
- Access Control Models (DAC, MAC, RBAC)
- Privileged Access Management (PAM)
- Zero Trust Security

### 14.7 Security Operations and Threat Intelligence — `Bank`

**Slug:** `security-operations` · **Status:** Not started

- Security Operations Center (SOC)
- SIEM and SOAR
- Indicators of Compromise (IoC)
- Advanced Persistent Threats (APT)
- MITRE ATT&CK Framework
- Data Loss Prevention (DLP)
- Different Hacking Techniques

### 14.8 Secure Development and Business Continuity — `Bank`

**Slug:** `secure-development-and-business-continuity` · **Status:** Not started

- Secure Software Development Life Cycle (SSDLC)
- Business Continuity Planning (BCP)
- Disaster Recovery Planning (DRP)

---

## 15. Computer Graphics and Multimedia — `graphics-multimedia`

### 15.1 Computer Graphics — `School-2`

**Slug:** `computer-graphics` · **Status:** Not started

- Definition
- Graphics Software and Its Types
- Applications of Each Type

### 15.2 Multimedia — `School-2`

**Slug:** `multimedia` · **Status:** Not started

- Multimedia Software and Its Types
- Applications of Multimedia
- Use of VoIP

### 15.3 Graphics Hardware and Display Devices — `Others`

**Slug:** `graphics-hardware-and-display-devices` · **Status:** Not started

- Raster-Scan and Random-Scan Displays
- CRT, LCD and LED Displays
- Resolution, Aspect Ratio and Frame Buffer

### 15.4 Output Primitives — `Others`

**Slug:** `output-primitives` · **Status:** Not started

- Line Drawing Algorithms: DDA, Bresenham
- Circle Drawing Algorithms
- Polygon Filling

### 15.5 2D Transformations — `Others`

**Slug:** `2d-transformations` · **Status:** Not started

- Translation, Rotation, Scaling
- Reflection and Shearing
- Homogeneous Coordinates and Composite Transformations

### 15.6 Clipping — `Others`

**Slug:** `clipping` · **Status:** Not started

- Line Clipping: Cohen–Sutherland
- Polygon Clipping: Sutherland–Hodgman

### 15.7 3D Graphics and Projections — `Others`

**Slug:** `3d-graphics-projections` · **Status:** Not started

- 3D Transformations
- Parallel and Perspective Projections

### 15.8 Color Models — `Others`

**Slug:** `color-models` · **Status:** Not started

- RGB, CMY/CMYK, HSV

---

## 16. Discrete Mathematics and Numerical Analysis — `discrete-mathematics`

### 16.1 Propositional and Predicate Logic — `PSC-IT` `AP`

**Slug:** `propositional-and-predicate-logic` · **Status:** Not started

### 16.2 Set Theory — `PSC-IT` `AP`

**Slug:** `set-theory` · **Status:** Not started

- Set Operations
- Algebra of Sets

### 16.3 Mathematical Induction — `PSC-IT` `AP`

**Slug:** `mathematical-induction` · **Status:** Not started

### 16.4 Relations — `PSC-IT` `AP`

**Slug:** `relations` · **Status:** Not started

- Basic Concepts and Representation

### 16.5 Functions — `PSC-IT` `AP`

**Slug:** `functions` · **Status:** Not started

- Classification and Pictorial Representation

### 16.6 Graph Theory and Applications — `PSC-IT` `AP`

**Slug:** `graph-theory-and-applications` · **Status:** Not started

### 16.7 Elementary Number Systems — `PSC-IT` `AP`

**Slug:** `elementary-number-systems` · **Status:** Not started

### 16.8 Principles of Counting — `PSC-IT` `AP`

**Slug:** `principles-of-counting` · **Status:** Not started

### 16.9 Recursion, Generating Functions and Recurrence Relations — `PSC-IT` `AP`

**Slug:** `recurrence-relations` · **Status:** Not started

- See note N9

### 16.10 Solving Linear Systems — `PSC-IT` `AP`

**Slug:** `solving-linear-systems` · **Status:** Not started

- Gaussian Elimination
- Gauss–Jordan Elimination

### 16.11 Interpolation — `PSC-IT` `AP`

**Slug:** `interpolation` · **Status:** Not started

- Newton's Formula
- Lagrange's Formula

### 16.12 Numerical Differentiation and Integration — `PSC-IT` `AP`

**Slug:** `numerical-differentiation-and-integration` · **Status:** Not started

- Trapezoidal Rule
- Simpson's 1/3 and 3/8 Rules
- Romberg Integration

### 16.13 Solution of Equations — `PSC-IT` `AP`

**Slug:** `solution-of-equations` · **Status:** Not started

- Newton–Raphson Method

### 16.14 Solution of Ordinary Differential Equations — `PSC-IT` `AP`

**Slug:** `solution-of-ordinary-differential-equations` · **Status:** Not started

### 16.15 Least Squares Approximation of Functions — `PSC-IT` `AP`

**Slug:** `least-squares-approximation-of-functions` · **Status:** Not started

---

## 17. Compiler Design and Theory of Computation — `compiler-theory`

### 17.1 Introduction to Compilers — `PSC-IT` `AP`

**Slug:** `introduction-to-compilers` · **Status:** Not started

- Basic Issues
- Logical Analysis

### 17.2 Lexical Analysis — `PSC-IT` `AP`

**Slug:** `lexical-analysis` · **Status:** Not started

### 17.3 Syntax Analysis — `PSC-IT` `AP`

**Slug:** `syntax-analysis` · **Status:** Not started

### 17.4 Semantic Analysis and Type Checking — `PSC-IT` `AP`

**Slug:** `semantic-analysis-and-type-checking` · **Status:** Not started

### 17.5 Run-Time Environments — `PSC-IT` `AP`

**Slug:** `run-time-environments` · **Status:** Not started

### 17.6 Code Generation and Code Optimization — `PSC-IT` `AP`

**Slug:** `code-generation-and-code-optimization` · **Status:** Not started

### 17.7 Language Theory — `PSC-IT` `AP`

**Slug:** `language-theory` · **Status:** Not started

### 17.8 Finite Automata — `Others` `Bank`

**Slug:** `finite-automata` · **Status:** Not started

- Deterministic Finite Automata (DFA) — `Others` `Bank`
- Nondeterministic Finite Automata (NFA) — `Others` `Bank`
- NFA to DFA Conversion — `Others`
- DFA Minimization — `Others`

### 17.9 Regular Expressions and Regular Languages — `Others` `Bank`

**Slug:** `regular-expressions-and-regular-languages` · **Status:** Not started

- Regular Expressions — `Others`
- Equivalence of Regular Expressions and Finite Automata — `Others` `Bank`
- Pumping Lemma for Regular Languages — `Others`

### 17.10 Context-Free Grammars and Pushdown Automata — `Others` `Bank`

**Slug:** `context-free-grammars-and-pushdown-automata` · **Status:** Not started

- Context-Free Grammars, Derivations and Parse Trees — `Others` `Bank`
- Ambiguity — `Others`
- Chomsky Normal Form and Greibach Normal Form — `Others`
- Pushdown Automata — `Others`

### 17.11 Turing Machines and Computability — `Others` `Bank`

**Slug:** `turing-machines-and-computability` · **Status:** Not started

- Turing Machines — `Others` `Bank`
- Chomsky Hierarchy — `Others`
- Decidability and the Halting Problem — `Others`

### 17.12 Computational Complexity — `Others` `Bank`

**Slug:** `computational-complexity` · **Status:** Not started

- Classes P and NP — `Others` `Bank`
- NP-Complete and NP-Hard Problems — `Others`

---

## 18. Power Sector Information — `power-sector`

See note N16. The scope of this category needs confirmation before content is written.

### 18.1 Overview of the Power Sector of Bangladesh — `Others`

**Slug:** `overview-of-the-power-sector-of-bangladesh` · **Status:** Not started

### 18.2 Power Sector Organizations and Companies — `Others`

**Slug:** `power-sector-organizations-and-companies` · **Status:** Not started

### 18.3 Power Generation Sources and Power Plants — `Others`

**Slug:** `power-generation-sources-and-power-plants` · **Status:** Not started

### 18.4 Power Transmission and Distribution — `Others`

**Slug:** `power-transmission-and-distribution` · **Status:** Not started

### 18.5 Renewable Energy — `Others`

**Slug:** `renewable-energy` · **Status:** Not started

---

## Transcription Notes and Open Questions

The items below were unclear or look like typos in the source syllabus. They should be confirmed before notes are written.

| Note | Location                     | Printed text                                                                             | Interpretation used / question                                                                                                   |
| ---- | ---------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| N1   | Artificial Intelligence      | "(g) Artificial Intelligence: …"                                                         | Section has no heading in the source. **Assumed PSC-IT and AP; please confirm.** |
| N2   | PSC-IT/AP Digital System           | "Newtrivibrations"                                                                       | Read as **multivibrators**.                                                                                                      |
| N3   | PSC-IT/AP Digital System           | "DTL, TTL, Hl, CMOS MOS gates"                                                           | "Hl" is unclear (possibly I²L or HTL). Left out until confirmed.                                                                 |
| N4   | PSC-IT/AP Digital System           | "Cooperators"                                                                            | Read as **comparators**.                                                                                                         |
| N5   | PSC-IT/AP Programming in C         | "Mechanic Language Programming"                                                          | Read as **machine language programming**.                                                                                        |
| N6   | College Software Engineering | "RDD"                                                                                    | Kept as printed. Possibly RAD (Rapid Application Development). Please confirm.                                                   |
| N7   | PSC-IT/AP Software Engineering     | "Graph: Cel analysis of complexity measures"                                             | Unclear. Possibly graph-based (cyclomatic) complexity analysis. Please confirm.                                                  |
| N8   | College DBMS                 | "Randomize tree"                                                                         | Kept as "randomized trees". Exact intended topic unclear.                                                                        |
| N9   | PSC-IT/AP Discrete Mathematics     | "Reversion"                                                                              | Read as **recursion**.                                                                                                           |
| N10  | PSC-IT/AP Data Communication       | "Della modulation", "compounding", "NUll modem"                                          | Read as **delta modulation**, **companding** and **null modem**.                                                                 |
| N11  | PSC-IT/AP Network and the Internet | "ARJP", "IPV6 congestion control"                                                        | Read as **ARP**. IPv6 and congestion control are treated as separate items.                                                      |
| N12  | PSC-IT/AP Compiler                 | "compiliary", "hexical analysis"                                                         | Read as **compiler** and **lexical analysis**.                                                                                   |
| N13  | School-2 Operating System    | "পলিনোমিয়াল অ্যাক্টিভ পিক্সেলের বৈশিষ্ট্য" (characteristics of polynomial active pixel) | Does not match any known OS topic and is **not included**. Please clarify.                                                       |
| N14  | School Types of computers    | Lists only analog and digital                                                            | Hybrid computer was added to 1.4 at the project owner's request (2026-11-01).                                                                 |
| N15  | `Others` subjects            | Subject names only                                                                       | All subtopics tagged `Others` were drafted from standard curricula, not from an official syllabus. Please review. |
| N16  | Power Sector Information     | "Power Sector Information & MCQ"                                                         | General-knowledge section. Topic outline is provisional; which exam it targets and what it should cover need confirmation.        |
