---
description: Software cost estimation and metrics - the COCOMO model (basic, intermediate and detailed) with worked examples, Halstead's software science formulas, and graph-based complexity measures (McCabe's cyclomatic complexity and the control flow graph).
updated: 2026-11-04
---

## COCOMO Model {#cocomo-model}

### Definition of COCOMO

COCOMO (**COnstructive COst MOdel**) is an empirical (regression-based) software cost estimation model that estimates the **effort** (in person-months), the **development time** (in months) and the **staff** needed for a software project from its estimated **size in thousands of lines of code (KLOC)**.

It was developed by **Barry W. Boehm** and published in 1981 in his book *Software Engineering Economics*, based on data from 63 projects.

### Types of Software Projects in COCOMO

COCOMO classifies software projects into three types (modes), according to their size, complexity and the experience of the team:

1. **Organic** — a small, simple project developed by a small, experienced team in a familiar, flexible environment, with well-understood requirements; typically about **2 to 50 KLOC**. Examples: simple business systems, payroll and inventory systems, data processing systems.
2. **Semi-detached** — a medium-size project with a team of mixed experience and some new or less familiar features; typically about **50 to 300 KLOC**. Examples: a new database management system, an operating system, a complex inventory system.
3. **Embedded** — a project with tight constraints of hardware, software and operational regulations, usually large and complex and developed by a large team; typically **over 300 KLOC**. Examples: air-traffic control, ATM software, flight control, real-time control systems.

(The size ranges are only typical; the type depends mainly on the team's experience and the constraints, not only on the size.)

### Types of COCOMO Models

COCOMO has three levels (models), each more detailed than the one before:

1. **Basic COCOMO** — estimates effort and time from the size alone; it gives a quick, rough estimate early in a project.
2. **Intermediate COCOMO** — adjusts the basic estimate with **15 cost drivers** that describe the product, hardware, personnel and project.
3. **Detailed COCOMO** — applies the intermediate model to **each module and each phase** of the project separately.

### 1. Basic COCOMO

> **Effort: E = a × (KLOC)^b person-months**
>
> **Development time: D = c × (E)^d months**
>
> **Average staff: P = E ÷ D persons**
>
> **Productivity = KLOC ÷ E (or LOC ÷ E)**

where:

- **KLOC** = estimated size of the software in thousands of lines of code,
- **E** = total effort in person-months (PM),
- **D** = development time (duration) in months,
- **a, b, c, d** = constants for the project type:

| Project type | a | b | c | d |
| --- | --- | --- | --- | --- |
| Organic | 2.4 | 1.05 | 2.5 | 0.38 |
| Semi-detached | 3.0 | 1.12 | 2.5 | 0.35 |
| Embedded | 3.6 | 1.20 | 2.5 | 0.32 |

**Example 1 — an organic project of 32 KLOC:**

1. Effort E = 2.4 × (32)^1.05 = 2.4 × 38.05 = **91.33 person-months**.
2. Development time D = 2.5 × (91.33)^0.38 = **13.9 months**.
3. Average staff P = 91.33 ÷ 13.9 = **6.57 ≈ 7 persons**.
4. Productivity = 32,000 ÷ 91.33 = **350 LOC per person-month**.

**Example 2 — a 400 KLOC project in each mode:**

| Mode | Effort E = a × 400^b | Time D = 2.5 × E^d |
| --- | --- | --- |
| Organic | 2.4 × 400^1.05 = 1,295.31 PM | 2.5 × 1,295.31^0.38 = 38.08 months |
| Semi-detached | 3.0 × 400^1.12 = 2,462.80 PM | 2.5 × 2,462.80^0.35 = 38.45 months |
| Embedded | 3.6 × 400^1.20 = 4,772.81 PM | 2.5 × 4,772.81^0.32 = 37.60 months |

The same software needs much more effort in the embedded mode, because the exponent b is larger: effort grows faster than size (a **diseconomy of scale**).

### 2. Intermediate COCOMO

Intermediate COCOMO multiplies the nominal effort by an **effort adjustment factor (EAF)**, computed from **15 cost drivers**. Each cost driver is rated from *very low* to *extra high*, and each rating has an effort multiplier (1.00 for nominal); the EAF is the **product** of the 15 multipliers, and it typically lies between about 0.9 and 1.4.

> **E = a × (KLOC)^b × EAF**
>
> **D = c × (E)^d**

| Project type | a | b | c | d |
| --- | --- | --- | --- | --- |
| Organic | 3.2 | 1.05 | 2.5 | 0.38 |
| Semi-detached | 3.0 | 1.12 | 2.5 | 0.35 |
| Embedded | 2.8 | 1.20 | 2.5 | 0.32 |

The 15 cost drivers are grouped into four categories:

1. **Product attributes (3):**
   1. Required software reliability (RELY).
   2. Size of the application database (DATA).
   3. Complexity of the product (CPLX).
2. **Hardware (computer) attributes (4):**
   1. Run-time performance (execution time) constraints (TIME).
   2. Memory (storage) constraints (STOR).
   3. Volatility of the virtual machine environment (VIRT).
   4. Required turnaround time (TURN).
3. **Personnel attributes (5):**
   1. Analyst capability (ACAP).
   2. Software engineering (programmer) capability (PCAP).
   3. Applications experience (AEXP).
   4. Virtual machine experience (VEXP).
   5. Programming language experience (LEXP).
4. **Project attributes (3):**
   1. Use of software tools (TOOL).
   2. Application of software engineering methods (MODP).
   3. Required development schedule (SCED).

**Example — intermediate COCOMO:** the 32 KLOC organic project requires **high reliability** (multiplier 1.15) and has **highly capable analysts** (multiplier 0.86); all other drivers are nominal (1.00).

1. EAF = 1.15 × 0.86 = **0.989**.
2. E = 3.2 × (32)^1.05 × 0.989 = 3.2 × 38.05 × 0.989 = **120.4 person-months**.
3. D = 2.5 × (120.4)^0.38 = **15.4 months**.

### 3. Detailed COCOMO

Detailed COCOMO divides the software into **modules** and the development into **phases**, estimates the effort of each module in each phase with phase-sensitive cost drivers, and adds the results. Its six phases are:

1. Planning and requirements.
2. System (product) design.
3. Detailed design.
4. Coding and unit testing.
5. Integration and testing.
6. Maintenance (cost constructive model).

### Advantages and Disadvantages of COCOMO

**Advantages:**

1. It is a systematic, transparent and well-documented model.
2. It gives estimates of effort, time and staff at different stages of the project.
3. The cost drivers show which factors most affect cost and effort.
4. It helps to judge the feasibility of a project before development.

**Disadvantages:**

1. It needs an estimate of the size (KLOC), which is hard to know early in the project.
2. It assumes that size is the main driver of cost.
3. Its accuracy depends on calibrating the constants with the organization's own data.
4. It does not fit modern development styles well (reuse, rapid prototyping); this led to **COCOMO II** (2000), which also uses object points and function points.

## Halstead Formula {#halstead-formula}

### Definition of Halstead's Software Science

Halstead's software science (Maurice H. Halstead, 1977) is a set of metrics that measure the size, complexity and effort of a program from the **number of operators and operands** in its source code.

A program is treated as a sequence of **tokens**, each of which is either an **operator** (an action: `+`, `=`, `if`, `while`, `()`, `;`, function calls, keywords) or an **operand** (a value acted on: variables and constants).

### Basic Counts

1. **n1** = number of **distinct (unique) operators**.
2. **n2** = number of **distinct (unique) operands**.
3. **N1** = **total** number of occurrences of operators.
4. **N2** = **total** number of occurrences of operands.

**Counting rules (for C):**

1. Comments, declarations of identifiers and functions, and preprocessor (`#`) directives are ignored.
2. Variables and constants are **operands**.
3. Function calls, keywords (`if`, `else`, `for`, `while`, `do`, `switch`, `case`, `return`, `break`, `continue`, `default`, `sizeof`), arithmetic, relational and logical symbols, brackets, commas and semicolons are **operators**.
4. In `goto label`, `goto` is an operator and the label is an operand.
5. In `a[i]`, `a` and `i` are operands and `[]` is an operator; in `s.x` and `p->x`, the names are operands and `.` and `->` are operators.
6. Unary and binary uses of `+`, `-` and `*` are counted as different operators.
7. Local variables with the same name in different functions are counted as different operands.

### Halstead's Formulas

> **Program vocabulary: n = n1 + n2**
>
> **Program length: N = N1 + N2**
>
> **Estimated length: N̂ = n1 × log₂ n1 + n2 × log₂ n2**
>
> **Volume: V = N × log₂ n (bits)**
>
> **Difficulty: D = (n1 ÷ 2) × (N2 ÷ n2)**
>
> **Program level: L = 1 ÷ D** (estimated level L̂ = (2 ÷ n1) × (n2 ÷ N2))
>
> **Effort: E = D × V = V ÷ L**
>
> **Time to program: T = E ÷ 18 seconds**
>
> **Estimated number of delivered bugs: B = V ÷ 3000**

where:

- **V (volume)** is the number of bits needed to encode the program,
- **D (difficulty)** grows with the number of distinct operators and with how often operands are repeated,
- **L (level)** is the inverse of difficulty; a higher-level (more compact) program has L closer to 1,
- **E (effort)** is the number of elementary mental discriminations needed to write the program,
- **18** is the **Stroud number** — the number of elementary mental discriminations a person can make per second,
- **3000** is an empirical value: about one bug per 3000 bits of volume.

The **potential volume** V\* = (2 + n2\*) × log₂(2 + n2\*), where n2\* is the number of distinct input and output parameters, is the volume of the most compact possible program; the program level can also be computed as L = V\* ÷ V.

### Worked Example

A sorting function in C has n1 = 14 distinct operators, n2 = 10 distinct operands, N1 = 53 operator occurrences and N2 = 38 operand occurrences.

1. Vocabulary n = 14 + 10 = **24**.
2. Length N = 53 + 38 = **91**.
3. Estimated length N̂ = 14 × log₂ 14 + 10 × log₂ 10 = 14 × 3.807 + 10 × 3.322 = 53.30 + 33.22 = **86.52** (close to the actual length of 91).
4. Volume V = 91 × log₂ 24 = 91 × 4.585 = **417.23 bits**.
5. Difficulty D = (14 ÷ 2) × (38 ÷ 10) = 7 × 3.8 = **26.6**.
6. Program level L = 1 ÷ 26.6 = **0.0376**.
7. Effort E = 26.6 × 417.23 = **11,098.4** elementary mental discriminations.
8. Time T = 11,098.4 ÷ 18 = **616.6 seconds ≈ 10.3 minutes**.
9. Estimated bugs B = 417.23 ÷ 3000 = **0.14**.

### Advantages and Disadvantages of Halstead's Metrics

**Advantages:**

1. They are simple to calculate and can be computed automatically from the code.
2. They measure the overall quality and complexity of a program and predict effort, time and errors.
3. They can be used for any programming language.

**Disadvantages:**

1. They depend on the complete code, so they cannot be used early in development.
2. The counting rules for operators and operands are not standardized, so different tools give different results.
3. They measure the size of the program text, not its control structure (see cyclomatic complexity below).

## Graph-Based Complexity Measures {#graph-based-complexity-measures}

The syllabus prints this item as "Graph: Cel analysis of complexity measures"; it is taken here as the graph-based (graph-theoretic) analysis of program complexity, whose standard measure is **McCabe's cyclomatic complexity**.

### Control Flow Graph

A control flow graph (flow graph) is a directed graph that represents the flow of control in a program:

1. **Node** — a statement or a block of statements with no branch in it (a straight sequence of code); a **predicate node** contains a condition (a decision).
2. **Edge** — an arrow that shows the transfer of control from one node to another.
3. **Region** — an area bounded by edges and nodes; the area outside the graph is also counted as a region.

### Cyclomatic Complexity

Cyclomatic complexity, developed by **Thomas J. McCabe** in 1976, is a graph-based software metric that measures the **logical complexity** of a program as the **number of linearly independent paths** through its control flow graph.

It is based on graph theory (the cyclomatic number of a graph). It gives the **number of test cases** needed to execute every independent path at least once (**basis path testing**); it is also an upper bound on the number of tests needed for full branch coverage.

#### Formulas for Cyclomatic Complexity

Cyclomatic complexity V(G) can be calculated in three ways, which give the same result:

> **1. V(G) = E − N + 2P** (for one program or module, P = 1, so V(G) = E − N + 2)
>
> **2. V(G) = number of predicate (decision) nodes + 1**
>
> **3. V(G) = number of regions of the flow graph**

where:

- **E** = number of edges,
- **N** = number of nodes,
- **P** = number of connected components (separate programs or modules in the graph),
- a **predicate node** is a node with a condition (`if`, `while`, `for`, `case`); a compound condition such as `a && b` counts as two predicates.

#### Worked Example

```c
int count_positive(int a[], int n)
{
    int i = 0, c = 0;          /* node 1 */
    while (i < n)              /* node 2: decision */
    {
        if (a[i] > 0)          /* node 3: decision */
            c++;               /* node 4 */
        i++;                   /* node 5 */
    }
    return c;                  /* node 6 */
}
```

![Control flow graph of count_positive with nodes 1 to 6, two decision nodes and three regions; V(G) = 3](/diagrams/software-engineering/flow-graph.svg)

The edges are 1→2, 2→3, 2→6, 3→4, 3→5, 4→5 and 5→2 (back to the loop condition).

1. **Method 1:** E = 7, N = 6, P = 1, so V(G) = 7 − 6 + 2 = **3**.
2. **Method 2:** there are 2 predicate nodes (node 2 `while` and node 3 `if`), so V(G) = 2 + 1 = **3**.
3. **Method 3:** the graph has 3 regions (R1, R2 and the outside region R3), so V(G) = **3**.

So there are **3 independent paths**, and at least 3 test cases are needed:

1. Path 1: 1 → 2 → 6 (the loop is not entered; n = 0).
2. Path 2: 1 → 2 → 3 → 5 → 2 → 6 (one element that is not positive).
3. Path 3: 1 → 2 → 3 → 4 → 5 → 2 → 6 (one positive element).

#### Interpretation of Cyclomatic Complexity

1. V(G) ≥ 1 for every program; a program with no decisions has V(G) = 1 (one path).
2. A higher value means more complex logic, more paths to test and a greater risk of errors.
3. McCabe recommended that the cyclomatic complexity of a module should **not exceed 10**; a module with a higher value should be divided into smaller modules.

#### Uses of Cyclomatic Complexity

1. It gives the number of independent paths, and so the minimum number of test cases for **basis path testing**.
2. It helps to ensure that every path is tested at least once (better code coverage).
3. It shows which modules are too complex and should be simplified.
4. It helps to estimate the testing effort and the risk of a module.

#### Advantages and Disadvantages of Cyclomatic Complexity

**Advantages:**

1. It is easy to calculate and to apply, and faster to compute than Halstead's metrics.
2. It is a good indicator of how difficult a module is to test and maintain.
3. It can be used to compare the complexity of different designs.

**Disadvantages:**

1. It measures only the **control** complexity, not the data complexity or the size of the program.
2. It gives the same value to nested and non-nested conditions, although nested conditions are harder to understand.
3. It can give misleading values for simple decision structures (for example, a long `switch`).

## References {#references}

**TutorialsPoint**

- [Software Design Complexity](https://www.tutorialspoint.com/software_engineering/software_design_complexity.htm) — accessed 2026-11-04 (Halstead's measures, McCabe's cyclomatic complexity with V(G) = e − n + 2 and its example, the limit of 10; the page's rendering drops the minus sign from the formula)
- [Software Project Management](https://www.tutorialspoint.com/software_engineering/software_project_management.htm) — accessed 2026-11-04 (COCOMO's organic, semi-detached and embedded types)

**GeeksforGeeks**

- [COCOMO Model](https://www.geeksforgeeks.org/software-engineering/software-engineering-cocomo-model/) — accessed 2026-11-04 (project types and size ranges, constants for basic and intermediate COCOMO, the 15 cost drivers, detailed COCOMO phases, the 400 KLOC example)
- [Halstead's Software Metrics](https://www.geeksforgeeks.org/software-engineering/software-engineering-halsteads-software-metrics/) — accessed 2026-11-04 (counting rules, formulas and the sorting example; its difficulty value of 37.03 comes from a rounded level, while (14 ÷ 2) × (38 ÷ 10) = 26.6, and its time formula mixes seconds and minutes; the values above are recalculated from its own counts)
- [Cyclomatic Complexity](https://www.geeksforgeeks.org/software-engineering/cyclomatic-complexity/) — accessed 2026-11-04 (definition, formulas, uses, advantages and disadvantages)

**TpointTech**

- [COCOMO Model](https://www.tpointtech.com/cocomo-model) — accessed 2026-11-04 (project types, constants, cost drivers, examples; it labels the development time in its examples as "PM" — development time is in months, effort is in person-months)
- [Halstead's Software Metrics](https://www.tpointtech.com/software-engineering-halsteads-software-metrics) — accessed 2026-11-04 (formulas and the same sorting example; its effort of 10,974 should be 26.6 × 417.23 ≈ 11,098, and it uses the estimated level 0.038 in place of the level it defines)
- [Cyclomatic Complexity](https://www.tpointtech.com/software-engineering-cyclomatic-complexity) — accessed 2026-11-04 (V(G) = E − N + 2P, properties)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (for the cost-driver multipliers used in the intermediate example, the third cyclomatic complexity formula and the original definitions)

- Barry W. Boehm, *Software Engineering Economics*, Prentice Hall, 1981 — COCOMO and the cost-driver effort multipliers (for example, high required reliability 1.15 and high analyst capability 0.86)
- Maurice H. Halstead, *Elements of Software Science*, Elsevier, 1977
- Thomas J. McCabe, "A Complexity Measure", *IEEE Transactions on Software Engineering*, 1976
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — flow graphs, regions and the three ways of computing cyclomatic complexity, basis path testing
