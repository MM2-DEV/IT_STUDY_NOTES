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

| #   | Category                                          | School | School-2 | College | PSC-IT | AP  | Others |
| --- | ------------------------------------------------- | :----: | :------: | :-----: | :----: | :-: | :----: |
| 1   | Computer Fundamentals                             |   ✓    |    ✓     |         |        |     |        |
| 2   | Number Systems and Data Representation            |   ✓    |    ✓     |         |   ✓    |  ✓  |        |
| 3   | Digital Logic and Boolean Algebra                 |   ✓    |    ✓     |         |   ✓    |  ✓  |        |
| 4   | Programming                                       |   ✓    |    ✓     |    ✓    |   ✓    |  ✓  |   ✓    |
| 5   | Data Structures and Algorithms                    |        |    ✓     |    ✓    |   ✓    |  ✓  |        |
| 6   | Operating Systems                                 |   ✓    |    ✓     |    ✓    |   ✓    |  ✓  |   ✓    |
| 7   | Software Engineering, Web Technologies and E-Commerce |        |          |    ✓    |   ✓    |  ✓  |   ✓    |
| 8   | Database Management Systems                       |        |    ✓     |    ✓    |   ✓    |  ✓  |        |
| 9   | Computer Networks and Data Communication          |        |    ✓     |    ✓    |   ✓    |  ✓  |   ✓    |
| 10  | Artificial Intelligence, Big Data and Cloud Computing |        |          |         |   ✓    |  ✓  |   ✓    |
| 11  | Computer Architecture and Organization            |        |    ✓     |         |   ✓    |  ✓  |        |
| 12  | Microprocessors, Microcontrollers and Interfacing |        |    ✓     |         |   ✓    |  ✓  |        |
| 13  | Computer Maintenance and Troubleshooting          |        |    ✓     |         |        |     |        |
| 14  | Cybersecurity                                     |        |          |    ✓    |   ✓    |  ✓  |        |
| 15  | Computer Graphics and Multimedia                  |        |    ✓     |         |        |     |   ✓    |
| 16  | Discrete Mathematics and Numerical Analysis       |        |          |         |   ✓    |  ✓  |        |
| 17  | Compiler Design and Theory of Computation         |        |          |         |   ✓    |  ✓  |   ✓    |
| 18  | Power Sector Information                          |        |          |         |        |     |   ✓    |

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

### 3.3 Logic Simplification — `School-2` `PSC-IT` `AP`

**Slug:** `logic-simplification` · **Status:** English done

- Simplification of Logic Circuits — `School-2`
- Circuit and Expression Minimization — `PSC-IT` `AP`
- Karnaugh Map — `School-2` `PSC-IT` `AP`
- Quine–McCluskey Method — `PSC-IT` `AP`

### 3.4 Combinational Circuits — `School-2` `PSC-IT` `AP`

**Slug:** `combinational-circuits` · **Status:** English done

- Circuit Design Using Logic Gates — `PSC-IT` `AP`
- Half Adder and Full Adder — `School-2` `PSC-IT` `AP`
- Parallel Adder — `School-2`
- Multiplexer and Demultiplexer — `School-2` `PSC-IT` `AP`
- Encoder and Decoder — `School-2` `PSC-IT` `AP`
- Seven-Segment Decoder and Display — `School-2`
- Comparator — `School-2`

### 3.5 Flip-Flops — `School-2` `PSC-IT` `AP`

**Slug:** `flip-flops` · **Status:** English done

- Basic Flip-Flops — `School-2` `PSC-IT` `AP`
- J-K Flip-Flop — `School-2`
- D and T Flip-Flops — `School-2`

### 3.6 Registers — `School-2` `PSC-IT` `AP`

**Slug:** `registers` · **Status:** English done

- Basic Registers — `PSC-IT` `AP`
- Classification of Registers — `School-2`
- Operation of a 4-bit Shift Register — `School-2`
- Buffer Register — `School-2`
- Universal Shift Register — `School-2`

### 3.7 Counters — `School-2` `PSC-IT` `AP`

**Slug:** `counters` · **Status:** English done

- Basic Counters — `PSC-IT` `AP`
- Asynchronous Ripple Counter — `School-2`
- Decade Counter — `School-2`

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

### 4.4 Programming Languages and Paradigms — `School-2` `PSC-IT` `AP`

**Slug:** `programming-languages-and-paradigms` · **Status:** English done

- Types of Programming Languages — `School-2` `PSC-IT` `AP`
- Programming Paradigms — `PSC-IT` `AP`
- Machine Language Programming (see note N5) — `PSC-IT` `AP`
- Assembly Language Programming — `PSC-IT` `AP`

### 4.5 C: Data Types, Variables and Operators — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-data-types-operators` · **Status:** English done

- Fundamentals of C Programming — `College`
- Data Types — `School-2` `College` `PSC-IT` `AP`
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

### 4.8 C: Pointers — `School-2` `College` `PSC-IT` `AP`

**Slug:** `c-pointers` · **Status:** English done

### 4.9 C: Functions — `School-2` `College` `PSC-IT` `AP`

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

### 4.14 Object-Oriented Programming Concepts — `College` `PSC-IT` `AP`

**Slug:** `oop-concepts` · **Status:** English done

- Classes and Objects — `College` `PSC-IT` `AP`
- Methods — `College`
- Interfaces — `College`
- Packages — `College`
- Encapsulation — `College` `PSC-IT` `AP`
- Inheritance — `College` `PSC-IT` `AP`
- Polymorphism — `College` `PSC-IT` `AP`

### 4.15 C++ and Java — `PSC-IT` `AP`

**Slug:** `cpp-and-java` · **Status:** English done

- Introductory Programming with C++/Java
- Template Functions and Classes
- Multithreading
- Exceptions

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

---

## 5. Data Structures and Algorithms — `data-structures-algorithms`

### 5.1 Introduction and Complexity — `College` `PSC-IT` `AP`

**Slug:** `introduction-and-complexity` · **Status:** English done

- Introduction to Data Structures — `College`
- Complexity of Algorithms — `College` `PSC-IT` `AP`
- Time–Space Trade-off — `College`
- Asymptotic Notations — `PSC-IT` `AP`

### 5.2 Arrays — `School-2` `PSC-IT` `AP`

**Slug:** `arrays` · **Status:** English done

- Array Representation and Operations — `School-2` `PSC-IT` `AP`
- Sparse and Dense Matrices — `PSC-IT` `AP`

### 5.3 Recursion — `School-2` `College` `PSC-IT` `AP`

**Slug:** `recursion` · **Status:** English done

- Concept and Applications of Recursion — `School-2` `College` `PSC-IT` `AP`
- Factorial — `College`
- Tower of Hanoi — `College`

### 5.4 Linked Lists — `School-2` `College` `PSC-IT` `AP`

**Slug:** `linked-lists` · **Status:** English done

- Abstract Data Types and List ADT — `College`
- Representation and Operations — `School-2` `PSC-IT` `AP`
- Singly Linked List — `College`
- Two-Way (Doubly) Linked List — `College`
- Circular Linked List — `College`

### 5.5 Stacks and Queues — `School-2` `College` `PSC-IT` `AP`

**Slug:** `stacks-and-queues` · **Status:** English done

- Structure and Operations of Stacks and Queues — `School-2` `College` `PSC-IT` `AP`
- Implementation Strategies — `College`
- Applications of Stack — `School-2` `PSC-IT` `AP`

### 5.6 Prefix, Infix and Postfix Expressions — `College` `PSC-IT` `AP`

**Slug:** `prefix-infix-postfix` · **Status:** English done

- Prefix, Infix and Postfix (Polish) Notation — `College` `PSC-IT` `AP`
- Transformation and Evaluation Algorithms — `College`

### 5.7 Searching — `School-2` `College` `PSC-IT` `AP`

**Slug:** `searching` · **Status:** English done

- Linear Search — `College`
- Binary Search — `School-2` `College`
- Searching Algorithms — `PSC-IT` `AP`

### 5.8 Sorting — `School-2` `College` `PSC-IT` `AP`

**Slug:** `sorting` · **Status:** English done

- Insertion Sort — `School-2` `College` `PSC-IT` `AP`
- Selection Sort — `College` `PSC-IT` `AP`
- Bubble Sort — `College`
- Quick Sort — `College` `PSC-IT` `AP`
- Merge Sort — `College` `PSC-IT` `AP`
- Radix Sort — `College` `PSC-IT` `AP`

### 5.9 Hashing — `College` `PSC-IT` `AP`

**Slug:** `hashing` · **Status:** English done

- Hash Indices and Hash Functions — `College`
- Static and Dynamic Hashing — `College`
- Collisions and Collision Resolution Techniques — `College`
- Basic Hashing Techniques — `PSC-IT` `AP`

### 5.10 Trees and Binary Search Trees — `College` `PSC-IT` `AP`

**Slug:** `trees-and-binary-search-trees` · **Status:** English done

- Tree Concepts — `College`
- Binary Trees — `College` `PSC-IT` `AP`
- Traversing Binary Trees — `PSC-IT` `AP`
- Binary Search Trees and Operations — `College` `PSC-IT` `AP`

### 5.11 Heaps and Heap Sort — `College` `PSC-IT` `AP`

**Slug:** `heaps-and-heap-sort` · **Status:** English done

- Binary Heaps — `College` `PSC-IT` `AP`
- Heap Sort — `College` `PSC-IT` `AP`

### 5.12 AVL, B and B+ Trees — `College`

**Slug:** `avl-b-bplus-trees` · **Status:** English done

- AVL Tree
- B Tree
- B+ Tree

### 5.13 Huffman Coding — `College` `PSC-IT` `AP`

**Slug:** `huffman-coding` · **Status:** English done

- Huffman Encoding Technique / Algorithm — `College` `PSC-IT` `AP`

### 5.14 Graphs and Graph Traversal — `College` `PSC-IT` `AP`

**Slug:** `graphs-and-graph-traversal` · **Status:** English done

- Graph Terminologies — `College`
- Representing Graphs and Graph Operations — `College` `PSC-IT` `AP`
- Breadth-First Search (BFS) — `College`
- Depth-First Search (DFS) — `College`
- Graph Algorithms — `PSC-IT` `AP`

### 5.15 Minimum Spanning Trees — `College` `PSC-IT` `AP`

**Slug:** `minimum-spanning-trees` · **Status:** English done

- Spanning Trees and Minimum Spanning Trees — `College` `PSC-IT` `AP`
- Kruskal's Algorithm — `College`
- Prim's Algorithm — `College`

### 5.16 Shortest Path Algorithms — `College` `PSC-IT` `AP`

**Slug:** `shortest-path-algorithms` · **Status:** English done

- Shortest Path Problems — `College` `PSC-IT` `AP`
- Single-Source Shortest Paths — `College`
- All-Pairs Shortest Paths — `College`

### 5.17 Topological Sorting — `College` `PSC-IT` `AP`

**Slug:** `topological-sorting` · **Status:** English done

### 5.18 Flow Networks — `College` `PSC-IT` `AP`

**Slug:** `flow-networks` · **Status:** English done

- Flow Networks — `College`
- Max-Flow Problem — `PSC-IT` `AP`

### 5.19 Algorithm Design and Analysis — `College` `PSC-IT` `AP`

**Slug:** `algorithm-design-and-analysis` · **Status:** English done

- Analyzing and Designing Algorithms — `College` `PSC-IT` `AP`
- Correctness of Algorithms — `College`
- Techniques for Analysis of Algorithms — `PSC-IT` `AP`

### 5.20 Greedy Algorithms — `College` `PSC-IT` `AP`

**Slug:** `greedy-algorithms` · **Status:** English done

- Introduction to Greedy Algorithms — `College` `PSC-IT` `AP`
- Greedy Choice Property — `College`
- Greedy vs Dynamic Programming — `College`
- Fractional Knapsack Problem — `College`
- Activity Selection Problem — `College`
- Task Scheduling Problem — `College`
- Coin Changing Problem — `College`

### 5.21 Divide and Conquer — `College` `PSC-IT` `AP`

**Slug:** `divide-and-conquer` · **Status:** English done

- Divide and Conquer Design Technique — `College` `PSC-IT` `AP`
- Quick Sort and Merge Sort — `College`
- Proof of Correctness and Run-Time Analysis — `College`

### 5.22 Dynamic Programming — `College` `PSC-IT` `AP`

**Slug:** `dynamic-programming` · **Status:** English done

- Introduction to Dynamic Programming — `College` `PSC-IT` `AP`
- Principle of Optimality and Optimal Substructure — `College`
- Assembly Line Scheduling — `College`
- Matrix Chain Multiplication — `College`
- Longest Common Subsequence (LCS) — `College`
- Viterbi Algorithm — `College`
- Bitonic Euclidean Traveling Salesperson Problem — `College`

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

**Slug:** `operating-system-fundamentals` · **Status:** Not started

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

### 6.2 Process Management — `School-2` `College` `PSC-IT` `AP`

**Slug:** `process-management` · **Status:** Not started

- Concept of a Process — `School-2` `College`
- Operations on Processes — `College`
- Process States — `College` `PSC-IT` `AP`
- Concurrent Processes — `College`
- Process Control Block (PCB) — `College` `PSC-IT` `AP`
- Process Context — `College`
- UNIX Process Control and Management — `College`
- Signals — `College`
- Process Hierarchies — `College`
- Forks and Pipes — `College`

### 6.3 Interrupts and OS Organization — `College`

**Slug:** `interrupts-and-os-organization` · **Status:** Not started

- Interrupt Processing
- Operating System Organization
- OS Kernel
- FLIH (First-Level Interrupt Handler)
- Dispatcher

### 6.4 CPU Scheduling — `College` `PSC-IT` `AP`

**Slug:** `cpu-scheduling` · **Status:** Not started

- Job and Processor Scheduling — `College` `PSC-IT` `AP`
- Scheduling Algorithms — `College` `PSC-IT` `AP`

### 6.5 Process Synchronization and Concurrency — `College` `PSC-IT` `AP`

**Slug:** `process-synchronization-and-concurrency` · **Status:** Not started

- Problems of Concurrent Processes — `College`
- Critical Section Problem — `College` `PSC-IT` `AP`
- Solutions to the Critical Section Problem — `PSC-IT` `AP`
- Mutual Exclusion — `College`
- Synchronization — `College`
- Deadlock (Introduction) — `College`
- Process Co-operation — `College`
- Producer and Consumer Processes — `College`

### 6.6 Semaphores and Synchronization Mechanisms — `College` `PSC-IT` `AP`

**Slug:** `semaphores-and-synchronization-mechanisms` · **Status:** Not started

- Definition of Semaphores — `College` `PSC-IT` `AP`
- Semaphore Initialization — `College`
- Wait Operation — `College`
- Signal Operation — `College`
- Use of Semaphores to Implement Mutex — `College`
- Process Synchronization Using Semaphores — `College`
- Implementation of Semaphores — `College`
- Critical Regions — `College`
- Conditional Critical Regions — `College`
- Monitors — `College`
- Ada Tasks — `College`

### 6.7 Interprocess Communication (IPC) — `College` `PSC-IT` `AP`

**Slug:** `ipc` · **Status:** Not started

- IPC Techniques — `College` `PSC-IT` `AP`
- Message Passing — `College`
- Direct Communication — `College`
- Indirect Communication — `College`

### 6.8 Deadlock Management — `College` `PSC-IT` `AP`

**Slug:** `deadlock-management` · **Status:** Not started

- Deadlock Handling Methods — `PSC-IT` `AP`
- Deadlock Prevention — `College`
- Deadlock Detection — `College`
- Deadlock Avoidance — `College`
- Banker's Algorithm — `College`

### 6.9 Memory Management — `School-2` `College` `PSC-IT` `AP`

**Slug:** `memory-management` · **Status:** Not started

- Memory Organization and Management — `College`
- Memory Management Techniques — `School-2` `PSC-IT` `AP`
- Storage Allocation — `College`
- Paging — `College` `PSC-IT` `AP`
- Segmentation — `School-2` `College` `PSC-IT` `AP`
- Address Mapping — `College`

### 6.10 Virtual Memory — `College` `PSC-IT` `AP`

**Slug:** `virtual-memory` · **Status:** Not started

- Virtual Memory Concepts — `College`
- Virtual Storage Management — `College`
- Page Replacement Strategies — `College` `PSC-IT` `AP`

### 6.11 Secondary Storage Management — `PSC-IT` `AP`

**Slug:** `secondary-storage-management` · **Status:** Not started

- Disk Scheduling Algorithms

### 6.12 File System — `School-2` `College` `PSC-IT` `AP`

**Slug:** `file-system` · **Status:** Not started

- File Management — `School-2` `PSC-IT` `AP`
- File System Structure — `PSC-IT` `AP`
- File Organization — `College` `PSC-IT` `AP`
- Blocking and Buffering — `College`
- File Descriptors — `College`
- File and Directory Structures — `College`
- Directory Tree — `College`
- Blocks and Fragments — `College`
- Inodes — `College`
- UNIX File Structure — `College`
- File Control Block (FCB) — `PSC-IT` `AP`
- Space Allocation — `PSC-IT` `AP`
- Tree-Structured File System — `PSC-IT` `AP`

### 6.13 Protection and Security — `PSC-IT` `AP`

**Slug:** `protection-and-security` · **Status:** Not started

- Classification of Protection and Security Issues
- Protection and Security Handling Techniques

### 6.14 Linux — `Others`

**Slug:** `linux` · **Status:** Not started

- Introduction and History of Linux
- Linux Distributions
- Linux Architecture: Kernel, Shell, Utilities
- Linux File System Hierarchy
- Basic Linux Commands
- File Permissions and Ownership
- Users and Groups
- Process Management Commands
- Package Management
- Shell Scripting Basics

---

## 7. Software Engineering, Web Technologies and E-Commerce — `software-engineering`

### 7.1 Introduction to Software Engineering — `College` `PSC-IT` `AP`

**Slug:** `introduction-to-software-engineering` · **Status:** Not started

- Introduction and Software Process — `PSC-IT` `AP`
- History and Nature of Software Engineering — `College`
- Relation of Software Engineering to Other Disciplines — `College`
- Programming Languages — `College`

### 7.2 Software Qualities — `College`

**Slug:** `software-qualities` · **Status:** Not started

- Software Nature and Qualities
- Product Qualities and Project Qualities
- Correctness, Robustness, Usability, Maintainability, Portability
- Quality Measurements

### 7.3 Software Development Life Cycle — `College`

**Slug:** `software-development-life-cycle` · **Status:** Not started

- Requirement, Design, Development, Testing, Maintenance

### 7.4 Software Development Models — `College`

**Slug:** `software-development-models` · **Status:** Not started

- Waterfall Model
- Agile Model
- Spiral Model
- RDD (see note N6)
- V Model

### 7.5 Software Engineering Principles — `College`

**Slug:** `software-engineering-principles` · **Status:** Not started

- Modularity, Abstraction, Generality
- Object-Oriented, Component-Oriented, Structured

### 7.6 Requirements Engineering — `College` `PSC-IT` `AP`

**Slug:** `requirements-engineering` · **Status:** Not started

- Requirements Engineering Processes — `PSC-IT` `AP`
- Requirement Specification — `College`
- Descriptive Specification — `College`

### 7.7 System Modeling and Design — `College` `PSC-IT` `AP`

**Slug:** `system-modeling-and-design` · **Status:** Not started

- System Models: Context, Behavioral and Object Models — `PSC-IT` `AP`
- Basics of Modeling Diagrams — `College`
- UI Design — `College`
- Object-Oriented Design Techniques — `PSC-IT` `AP`
- Real-Time Software Design — `PSC-IT` `AP`
- System Design with Reuse — `PSC-IT` `AP`

### 7.8 Critical Systems — `PSC-IT` `AP`

**Slug:** `critical-systems` · **Status:** Not started

- Critical System Design and Dependability
- Critical System Specification and Development

### 7.9 Verification, Validation and Testing — `College` `PSC-IT` `AP`

**Slug:** `verification-validation-and-testing` · **Status:** Not started

- Verification and Validation — `College` `PSC-IT` `AP`
- Software Testing — `College` `PSC-IT` `AP`
- Analysis and Debugging — `College`

### 7.10 Software Maintenance — `PSC-IT` `AP`

**Slug:** `software-maintenance` · **Status:** Not started

### 7.11 Software Project Management — `College` `PSC-IT` `AP`

**Slug:** `software-project-management` · **Status:** Not started

- Project Management Concepts — `College` `PSC-IT` `AP`
- Project Metrics — `College`
- Estimation — `College`
- Risk Management — `College`

### 7.12 Software Cost Estimation and Metrics — `PSC-IT` `AP`

**Slug:** `software-cost-estimation-and-metrics` · **Status:** Not started

- COCOMO Model
- Halstead Formula
- Graph-Based Complexity Measures (see note N7)

### 7.13 Reliability and Quality Assurance — `PSC-IT` `AP`

**Slug:** `reliability-and-quality-assurance` · **Status:** Not started

- Software Reliability and Availability
- Quality Assurance

### 7.14 System Analysis and Design — `Others`

**Slug:** `system-analysis-and-design` · **Status:** Not started

- System Concepts and Characteristics
- Types of Information Systems
- Role of the System Analyst
- System Development Phases in System Analysis and Design
- Feasibility Study: Technical, Economic, Operational
- Fact-Finding Techniques
- Data Flow Diagram (DFD)
- Data Dictionary
- Decision Tables and Decision Trees
- System Implementation and Conversion Methods

### 7.15 HTML, CSS and JavaScript — `College`

**Slug:** `html-css-and-javascript` · **Status:** Not started

### 7.16 Server-Side Programming — `College`

**Slug:** `server-side-programming` · **Status:** Not started

- HTTP Server
- Application Server
- MVC Web Framework

### 7.17 Web Services — `College`

**Slug:** `web-services` · **Status:** Not started

### 7.18 Database Access — `College`

**Slug:** `database-access` · **Status:** Not started

- Object-Relational Mapping (ORM)
- Lambda Expressions
- Language Integrated Query (LINQ)
- Data Reader and Writer

### 7.19 Introduction to E-Commerce — `Others`

**Slug:** `introduction-to-e-commerce` · **Status:** Not started

- Definition and History
- E-Commerce vs E-Business
- Advantages and Disadvantages

### 7.20 E-Commerce Business Models — `Others`

**Slug:** `e-commerce-business-models` · **Status:** Not started

- B2B, B2C, C2C, C2B
- B2G and G2C

### 7.21 Electronic Payment Systems — `Others`

**Slug:** `electronic-payment-systems` · **Status:** Not started

- Credit and Debit Cards
- Electronic Wallets and Mobile Financial Services
- Payment Gateways
- Electronic Funds Transfer (EFT)

### 7.22 E-Commerce Security — `Others`

**Slug:** `e-commerce-security` · **Status:** Not started

- Security Threats
- Encryption, SSL/TLS and Digital Certificates

### 7.23 M-Commerce and Digital Marketing — `Others`

**Slug:** `m-commerce-and-digital-marketing` · **Status:** Not started

- Mobile Commerce
- Online Advertising and Digital Marketing

### 7.24 Legal and Ethical Issues in E-Commerce — `Others`

**Slug:** `legal-and-ethical-issues-in-e-commerce` · **Status:** Not started

---

## 8. Database Management Systems — `dbms`

### 8.1 Introduction to Database Systems — `School-2` `College` `PSC-IT` `AP`

**Slug:** `introduction-to-database-systems` · **Status:** Not started

- Evolution of File Processing Systems — `College`
- Role of Databases in Organizations — `College`
- Core Components of a Database Environment — `College`
- Definition of DBMS — `School-2` `PSC-IT` `AP`
- Types of DBMS — `School-2` `PSC-IT` `AP`
- Advantages and Disadvantages of DBMS — `School-2` `PSC-IT` `AP`

### 8.2 Data Models and the ER Model — `School-2` `College` `PSC-IT` `AP`

**Slug:** `data-models-and-the-er-model` · **Status:** Not started

- Data Models — `School-2` `PSC-IT` `AP`
- Entity-Relationship (ER) Model — `School-2` `College` `PSC-IT` `AP`
- ER Diagram Symbols and Constructs — `College`

### 8.3 The Relational Model — `School-2` `College` `PSC-IT` `AP`

**Slug:** `the-relational-model` · **Status:** Not started

- Relational Model — `School-2` `College` `PSC-IT` `AP`
- Integrity Constraints — `PSC-IT` `AP`
- Transforming an ER Diagram into a Relational Model — `College`

### 8.4 Normalization — `School-2` `College` `PSC-IT` `AP`

**Slug:** `normalization` · **Status:** Not started

- Concept of Normalization — `School-2` `College` `PSC-IT` `AP`
- Functional Dependencies — `PSC-IT` `AP`
- 2NF, 3NF and BCNF — `PSC-IT` `AP`

### 8.5 SQL — `College` `PSC-IT` `AP`

**Slug:** `sql` · **Status:** Not started

- SQL — `College` `PSC-IT` `AP`
- Assertions and Triggers — `PSC-IT` `AP`
- Applications Using SQL — `PSC-IT` `AP`

### 8.6 File Organization — `School-2` `PSC-IT` `AP`

**Slug:** `file-organization` · **Status:** Not started

- Concept of File Organization — `School-2` `PSC-IT` `AP`
- Classification and Representation — `PSC-IT` `AP`

### 8.7 Indexing and Hashing — `School-2` `College` `PSC-IT` `AP`

**Slug:** `indexing-and-hashing` · **Status:** Not started

- Basic Concepts of Indexing — `School-2` `College` `PSC-IT` `AP`
- Ordered Indices — `College`
- Sparse and Dense Indexing — `PSC-IT` `AP`
- B+-Tree Index Files — `College` `PSC-IT` `AP`
- B-Tree Index Files — `College`
- Static and Dynamic Hashing / Hash Indexing — `College` `PSC-IT` `AP`
- Comparison of Ordered Indexing and Hashing — `College`

### 8.8 Query Processing — `School-2` `College` `PSC-IT` `AP`

**Slug:** `query-processing` · **Status:** Not started

- Concept and Overview of Query Processing — `School-2` `College`
- Notations — `PSC-IT` `AP`
- Measures of Query Cost — `College`
- Selection Operation and Its Cost Estimation — `College` `PSC-IT` `AP`
- Sorting — `College`
- Join Operation and Its Cost Estimation — `College` `PSC-IT` `AP`
- Evaluation of Expressions — `College`

### 8.9 Query Optimization — `College`

**Slug:** `query-optimization` · **Status:** Not started

- Transformation of Relational Expressions
- Catalog and Statistical Information for Cost Estimation
- Cost-Based Optimization

### 8.10 Transactions — `College` `PSC-IT` `AP`

**Slug:** `transactions` · **Status:** Not started

- Transaction Concept — `College` `PSC-IT` `AP`
- Transaction State — `College`
- Concurrent Executions — `College`
- Serializability — `College`

### 8.11 Concurrency Control — `College` `PSC-IT` `AP`

**Slug:** `concurrency-control` · **Status:** Not started

- Lock-Based Protocols — `College` `PSC-IT` `AP`
- Timestamp-Based Protocols — `College`
- Deadlock Handling — `PSC-IT` `AP`

### 8.12 Recovery System — `College`

**Slug:** `recovery-system` · **Status:** Not started

- Failure Classification
- Storage Structure
- Recovery and Atomicity
- Log-Based Recovery
- Recovery with Concurrent Transactions

### 8.13 Object-Oriented Databases — `College`

**Slug:** `object-oriented-databases` · **Status:** Not started

- Object-Oriented Data Model
- Implementing Object Persistence Using Relational Databases

### 8.14 Data Analysis and Mining — `College`

**Slug:** `data-analysis-and-mining` · **Status:** Not started

- Data Mining
- Decision Tree
- Bayes Theory
- Randomized Trees (see note N8)

### 8.15 Database System Architectures — `College`

**Slug:** `database-system-architectures` · **Status:** Not started

- Centralized and Client-Server Systems
- Server System Architectures
- Parallel Systems
- Distributed Systems
- Network Types

### 8.16 Parallel Databases — `College`

**Slug:** `parallel-databases` · **Status:** Not started

- I/O Parallelism
- Interquery and Intraquery Parallelism
- Intraoperation and Interoperation Parallelism

### 8.17 Distributed Databases — `College`

**Slug:** `distributed-databases` · **Status:** Not started

- Heterogeneous and Homogeneous Databases
- Distributed Data Storage
- Distributed Transactions
- Commit Protocols

### 8.18 Database Design, Tuning and Security — `College`

**Slug:** `database-design-tuning-and-security` · **Status:** Not started

- Database Design
- Database Tuning
- Security and Authorization
- Multidimensional Queries

---

## 9. Computer Networks and Data Communication — `computer-networks`

### 9.1 Introduction to Computer Networks — `School-2` `College` `PSC-IT` `AP`

**Slug:** `introduction-to-computer-networks` · **Status:** Not started

- Overview of the Internet — `College`
- Overview of Networking Protocols — `School-2` `College` `PSC-IT` `AP`
- Network Edge and Network Core — `College`
- Protocol Layers and Service Models — `College`
- Types of Networks: LAN, MAN, WAN — `School-2` `PSC-IT` `AP`

### 9.2 Network Topologies — `School-2` `PSC-IT` `AP`

**Slug:** `network-topologies` · **Status:** Not started

- Star, Switched, Bus and Ring Topologies — `School-2` `PSC-IT` `AP`

### 9.3 OSI and TCP/IP Models — `School-2` `PSC-IT` `AP`

**Slug:** `osi-and-tcp-ip` · **Status:** Not started

- OSI Model — `School-2` `PSC-IT` `AP`
- Functions of Each Layer — `School-2`
- TCP/IP Protocol Suite — `School-2` `PSC-IT` `AP`

### 9.4 Network Devices and Internetworking — `School-2` `PSC-IT` `AP`

**Slug:** `network-devices-and-internetworking` · **Status:** Not started

- Network Devices Used at Each Layer — `School-2`
- Bridges and Routers — `PSC-IT` `AP`
- Network Interconnection — `PSC-IT` `AP`

### 9.5 Data Transmission Basics — `School-2` `PSC-IT` `AP`

**Slug:** `data-transmission-basics` · **Status:** Not started

- Data Communication — `School-2`
- Analog and Digital Data — `PSC-IT` `AP`
- Data Rate and Baud Rate — `School-2` `PSC-IT` `AP`
- Channel Capacity — `School-2` `PSC-IT` `AP`
- Bandwidth and Frequency Spectrum — `School-2` `PSC-IT` `AP`
- Baseband and Broadband — `School-2`
- Transmission Impairments — `PSC-IT` `AP`

### 9.6 Transmission Modes and Media — `School-2` `PSC-IT` `AP`

**Slug:** `transmission-modes-and-media` · **Status:** Not started

- Transmission Modes and Transmission Systems — `School-2`
- Synchronous and Asynchronous Transmission — `PSC-IT` `AP`
- Guided Media: STP, UTP, Coaxial, Optical Fiber — `School-2` `PSC-IT` `AP`
- Unguided (Wireless) Media — `School-2` `PSC-IT` `AP`
- Satellite Communication — `School-2`
- Null Modem Configuration — `PSC-IT` `AP`

### 9.7 Data Encoding — `PSC-IT` `AP`

**Slug:** `data-encoding` · **Status:** Not started

- NRZ, NRZI
- Manchester and Differential Manchester

### 9.8 Modulation Techniques — `School-2` `PSC-IT` `AP`

**Slug:** `modulation-techniques` · **Status:** Not started

- Modulation and Demodulation — `School-2` `PSC-IT` `AP`
- Digital Modulation Techniques — `School-2` `PSC-IT` `AP`
- AM, FM, PM — `PSC-IT` `AP`
- Delta Modulation and Companding (see note N10) — `PSC-IT` `AP`
- ASK, PSK, FSK, QPSK, QAM — `PSC-IT` `AP`
- Sampling Theorem — `PSC-IT` `AP`
- PCM, PPM, PAM — `PSC-IT` `AP`

### 9.9 Data Link Control — `PSC-IT` `AP`

**Slug:** `data-link-control` · **Status:** Not started

- Error Control and Flow Control
- CRC
- HDLC

### 9.10 Multiplexing — `PSC-IT` `AP`

**Slug:** `multiplexing` · **Status:** Not started

- FDM, TDM, Statistical TDM

### 9.11 Switching Techniques — `PSC-IT` `AP`

**Slug:** `switching-techniques` · **Status:** Not started

- Circuit Switching
- Packet Switching

### 9.12 Ethernet and LAN Standards — `PSC-IT` `AP`

**Slug:** `ethernet-and-lan-standards` · **Status:** Not started

### 9.13 Application Layer — `College` `PSC-IT` `AP`

**Slug:** `application-layer` · **Status:** Not started

- Principles of Network Applications — `College`
- Web and HTTP — `College` `PSC-IT` `AP`
- FTP — `College`
- E-mail — `College` `PSC-IT` `AP`
- DNS — `College` `PSC-IT` `AP`

### 9.14 Transport Layer — `College` `PSC-IT` `AP`

**Slug:** `transport-layer` · **Status:** Not started

- Transport Layer Services — `College` `PSC-IT` `AP`
- Multiplexing and Demultiplexing — `College`
- Connectionless Transport: UDP — `College` `PSC-IT` `AP`
- Principles of Reliable Data Transfer — `College`
- Connection-Oriented Transport: TCP — `College` `PSC-IT` `AP`
- Principles of Congestion Control — `College` `PSC-IT` `AP`
- TCP Congestion Control — `College`

### 9.15 Network Layer and IP — `College` `PSC-IT` `AP`

**Slug:** `network-layer-and-ip` · **Status:** Not started

- Datagram Networks — `College`
- Inside a Router — `College`
- Internet Protocol (IP) — `College` `PSC-IT` `AP`
- IP Addresses — `PSC-IT` `AP`
- IP Subnetting — `College`
- ARP and ICMP (see note N11) — `PSC-IT` `AP`
- IPv6 — `PSC-IT` `AP`

### 9.16 Routing — `College` `PSC-IT` `AP`

**Slug:** `routing` · **Status:** Not started

- Link-State and Distance-Vector Routing Algorithms — `College`
- RIP, OSPF, BGP — `College`
- Unicast and Multicast Routing Protocols — `PSC-IT` `AP`

### 9.17 Wireless and Cellular Networks — `PSC-IT` `AP`

**Slug:** `wireless-and-cellular-networks` · **Status:** Not started

- Wireless LAN
- VSAT
- Analog and Digital Cellular Systems

### 9.18 ATM — `PSC-IT` `AP`

**Slug:** `atm` · **Status:** Not started

- ATM Switches
- ATM Protocol

### 9.19 Telecommunication — `Others`

**Slug:** `telecommunication` · **Status:** Not started

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

**Slug:** `overview-of-ai` · **Status:** Not started

### 10.2 Knowledge Representation — `PSC-IT` `AP`

**Slug:** `knowledge-representation` · **Status:** Not started

- General Concepts of Knowledge
- Knowledge Representation
- Knowledge Organization and Manipulation

### 10.3 Introduction to PROLOG — `PSC-IT` `AP`

**Slug:** `introduction-to-prolog` · **Status:** Not started

### 10.4 Intelligent Agents — `PSC-IT` `AP`

**Slug:** `intelligent-agents` · **Status:** Not started

### 10.5 First-Order Logic — `PSC-IT` `AP`

**Slug:** `first-order-logic` · **Status:** Not started

### 10.6 Search Strategies and Game Playing — `PSC-IT` `AP`

**Slug:** `search-strategies-and-game-playing` · **Status:** Not started

- Search Strategies
- Matching Techniques
- Game Planning

### 10.7 Natural Language Processing — `PSC-IT` `AP`

**Slug:** `natural-language-processing` · **Status:** Not started

### 10.8 Probabilistic Reasoning — `PSC-IT` `AP`

**Slug:** `probabilistic-reasoning` · **Status:** Not started

### 10.9 Expert Systems and Computer Vision — `PSC-IT` `AP`

**Slug:** `expert-systems-and-computer-vision` · **Status:** Not started

### 10.10 Knowledge Acquisition and Learning — `PSC-IT` `AP`

**Slug:** `knowledge-acquisition-and-learning` · **Status:** Not started

- Learning in Symbolic and Non-Symbolic Representation

### 10.11 Introduction to Big Data — `Others`

**Slug:** `introduction-to-big-data` · **Status:** Not started

- Definition of Big Data
- Characteristics of Big Data (the "V"s)
- Sources and Types of Data: Structured, Semi-Structured, Unstructured

### 10.12 Big Data Technologies — `Others`

**Slug:** `big-data-technologies` · **Status:** Not started

- Hadoop and HDFS
- MapReduce
- Apache Spark
- NoSQL Databases

### 10.13 Data Warehousing and Analytics — `Others`

**Slug:** `data-warehousing-and-analytics` · **Status:** Not started

- Data Warehouse Concepts
- Data Analytics

### 10.14 Introduction to Cloud Computing — `Others`

**Slug:** `introduction-to-cloud-computing` · **Status:** Not started

- Definition and Essential Characteristics
- Advantages and Disadvantages

### 10.15 Cloud Service Models — `Others`

**Slug:** `cloud-service-models` · **Status:** Not started

- IaaS, PaaS, SaaS

### 10.16 Cloud Deployment Models — `Others`

**Slug:** `cloud-deployment-models` · **Status:** Not started

- Public, Private, Hybrid and Community Clouds

### 10.17 Virtualization — `Others`

**Slug:** `virtualization` · **Status:** Not started

- Virtual Machines and Hypervisors (Type 1 and Type 2)
- Containers

### 10.18 Cloud Security and Related Computing Models — `Others`

**Slug:** `cloud-security` · **Status:** Not started

- Cloud Security Issues
- Edge and Fog Computing

---

## 11. Computer Architecture and Organization — `computer-architecture`

### 11.1 Fundamentals of Computer Design — `PSC-IT` `AP`

**Slug:** `fundamentals-of-computer-design` · **Status:** Not started

- Fundamentals of Computer Design
- Processor and ALU Design

### 11.2 Memory — `School-2` `PSC-IT` `AP`

**Slug:** `memory` · **Status:** Not started

- Memory Hierarchy — `School-2`
- Types of Memory — `School-2`
- RAM Structure and Addressing Techniques — `School-2`
- Characteristics of PROM, EPROM and EEPROM — `School-2`
- Cache Memory — `School-2` `PSC-IT` `AP`
- Definition of Virtual Memory — `School-2`
- Memory Organization and Memory System — `PSC-IT` `AP`

### 11.3 Secondary Storage Devices — `School-2`

**Slug:** `secondary-storage-devices` · **Status:** Not started

- Hard Disk
- Optical Disk
- Flash Memory

### 11.4 Control Unit Design — `School-2` `PSC-IT` `AP`

**Slug:** `control-unit-design` · **Status:** Not started

- Control Unit Design Approaches — `School-2`
- Hardwired Control — `PSC-IT` `AP`
- Micro-programmed Control — `PSC-IT` `AP`

### 11.5 Instruction Set Architecture — `School-2`

**Slug:** `instruction-set-architecture` · **Status:** Not started

- RISC and CISC Processors
- Opcode Encoding (Huffman)

### 11.6 Input/Output Organization — `School-2` `PSC-IT` `AP`

**Slug:** `io-organization` · **Status:** Not started

- Programmed I/O — `School-2`
- Interrupt-Driven I/O — `School-2`
- DMA (Direct Memory Access) — `School-2`
- I/O Subsystem and I/O Processor — `PSC-IT` `AP`
- System Organization and Bus — `PSC-IT` `AP`

### 11.7 Interrupts and Exceptions — `PSC-IT` `AP`

**Slug:** `interrupts-and-exceptions` · **Status:** Not started

### 11.8 Pipelining — `School-2` `PSC-IT` `AP`

**Slug:** `pipelining` · **Status:** Not started

- Pipelining and Pipeline Processors — `School-2` `PSC-IT` `AP`
- Hazards — `PSC-IT` `AP`

### 11.9 Parallel Processing — `School-2` `PSC-IT` `AP`

**Slug:** `parallel-processing` · **Status:** Not started

- Parallel Processing Concepts — `School-2` `PSC-IT` `AP`
- Multiprocessing (Definition) — `School-2`
- Systolic Arrays — `PSC-IT` `AP`
- Fault-Tolerant Computers — `PSC-IT` `AP`

---

## 12. Microprocessors, Microcontrollers and Interfacing — `microprocessors`

### 12.1 Microprocessor Fundamentals — `School-2` `PSC-IT` `AP`

**Slug:** `microprocessor-fundamentals` · **Status:** Not started

- Microprocessors and Microcomputers — `PSC-IT` `AP`
- Evolution of the Microprocessor — `PSC-IT` `AP`
- Architecture and Operation of a General-Purpose Microprocessor — `PSC-IT` `AP`
- CPU, ALU and Control Unit — `School-2`

### 12.2 Intel 8085/8086 Architecture — `School-2` `PSC-IT` `AP`

**Slug:** `intel-8085-8086` · **Status:** Not started

- Intel 8085/8086 Architecture — `School-2` `PSC-IT` `AP`
- Register Structure — `School-2` `PSC-IT` `AP`
- Segment Registers — `School-2`
- Programming Model — `PSC-IT` `AP`

### 12.3 Addressing Modes and Instruction Set — `School-2` `PSC-IT` `AP`

**Slug:** `addressing-modes-and-instruction-set` · **Status:** Not started

- Addressing Modes — `PSC-IT` `AP`
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

### 14.1 Network Security — `PSC-IT` `AP`

**Slug:** `network-security` · **Status:** Not started

- Types of Attack
- Encryption Techniques
- Digital Signatures

### 14.2 Web Security — `College`

**Slug:** `web-security` · **Status:** Not started

- Denial of Service
- Buffer Overflow
- Cross-Site Scripting
- Authentication and Access Control

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

### 17.8 Finite Automata — `Others`

**Slug:** `finite-automata` · **Status:** Not started

- Deterministic Finite Automata (DFA)
- Nondeterministic Finite Automata (NFA)
- NFA to DFA Conversion
- DFA Minimization

### 17.9 Regular Expressions and Regular Languages — `Others`

**Slug:** `regular-expressions-and-regular-languages` · **Status:** Not started

- Regular Expressions
- Equivalence of Regular Expressions and Finite Automata
- Pumping Lemma for Regular Languages

### 17.10 Context-Free Grammars and Pushdown Automata — `Others`

**Slug:** `context-free-grammars-and-pushdown-automata` · **Status:** Not started

- Context-Free Grammars, Derivations and Parse Trees
- Ambiguity
- Chomsky Normal Form and Greibach Normal Form
- Pushdown Automata

### 17.11 Turing Machines and Computability — `Others`

**Slug:** `turing-machines-and-computability` · **Status:** Not started

- Turing Machines
- Chomsky Hierarchy
- Decidability and the Halting Problem

### 17.12 Computational Complexity — `Others`

**Slug:** `computational-complexity` · **Status:** Not started

- Classes P and NP
- NP-Complete and NP-Hard Problems

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
