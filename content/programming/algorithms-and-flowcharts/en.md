---
description: Algorithms with worked examples, variables, constants and the arithmetic, relational and logical operations used in algorithms, and flowcharts with their symbols, rules, basic structures and examples.
updated: 2026-11-01
---

## Algorithm {#algorithm}

**Definition:** an algorithm is a **finite, ordered set of clear, step-by-step instructions for solving a problem**.

It starts with **Start**, ends with **Stop**, and is usually written in plain language before a program is coded. The same algorithm can be coded in any programming language.

**Characteristics of an algorithm** (see also [Algorithm Specification and Development](/topics/programming/introduction-to-programming#algorithm-specification-and-development)):

1. **Input:** zero or more inputs.
2. **Output:** at least one output.
3. **Definiteness:** each step is clear and unambiguous.
4. **Finiteness:** it ends after a finite number of steps.
5. **Effectiveness:** each step is simple and can be carried out exactly.

**Advantages of algorithms:**

1. Easy to write and understand, because they use ordinary language.
2. Language-independent: an algorithm can be converted into a program in any language.
3. Divide a problem into simple steps, which makes coding and finding errors easier.
4. Easy to change.

**Disadvantages of algorithms:**

1. Writing algorithms for large, complex programs takes time.
2. Branches and loops are harder to follow in text than in a flowchart.

### Worked Examples

**Example 1: sum and average of three numbers**

```text
 Step 1: Start
 Step 2: Read a, b, c
 Step 3: sum ← a + b + c
 Step 4: avg ← sum / 3
 Step 5: Print sum, avg
 Step 6: Stop
```

**Example 2: simple interest**

```text
 Step 1: Start
 Step 2: Read principal P, rate R, time T
 Step 3: SI ← (P × R × T) / 100
 Step 4: Print SI
 Step 5: Stop
```

For P = 5000, R = 10 and T = 2: SI = (5000 × 10 × 2) / 100 = 1000.

**Example 3: Celsius to Fahrenheit**

```text
 Step 1: Start
 Step 2: Read C
 Step 3: F ← (9 × C) / 5 + 32
 Step 4: Print F
 Step 5: Stop
```

For C = 100: F = 900 / 5 + 32 = 212.

**Example 4: larger of two numbers**

```text
 Step 1: Start
 Step 2: Read a, b
 Step 3: If a > b then Print a
         Else Print b
 Step 4: Stop
```

**Example 5: even or odd**

```text
 Step 1: Start
 Step 2: Read n
 Step 3: If n mod 2 = 0 then Print "Even"
         Else Print "Odd"
 Step 4: Stop
```

**Example 6: sum of the numbers from 1 to N**

```text
 Step 1: Start
 Step 2: Read N
 Step 3: sum ← 0, i ← 1
 Step 4: Repeat Steps 5 and 6 while i ≤ N
 Step 5:     sum ← sum + i
 Step 6:     i ← i + 1
 Step 7: Print sum
 Step 8: Stop
```

For N = 5: sum = 1 + 2 + 3 + 4 + 5 = 15.

**Example 7: factorial of n** (n! = 1 × 2 × 3 × … × n)

```text
 Step 1: Start
 Step 2: Read n
 Step 3: fact ← 1, i ← 1
 Step 4: Repeat Steps 5 and 6 while i ≤ n
 Step 5:     fact ← fact × i
 Step 6:     i ← i + 1
 Step 7: Print fact
 Step 8: Stop
```

For n = 5: fact = 1 × 2 × 3 × 4 × 5 = 120.

**Example 8: checking whether a number is prime** (a prime number n > 1 has no divisor other than 1 and n)

```text
 Step 1: Start
 Step 2: Read n
 Step 3: If n < 2 then Print "Not prime" and go to Step 9
 Step 4: i ← 2
 Step 5: Repeat Steps 6 and 7 while i ≤ n − 1
 Step 6:     If n mod i = 0 then Print "Not prime" and go to Step 9
 Step 7:     i ← i + 1
 Step 8: Print "Prime"
 Step 9: Stop
```

For n = 7: none of 2, 3, 4, 5, 6 divides 7, so the output is "Prime". For n = 9: 9 mod 3 = 0, so the output is "Not prime".

## Variables and Operations {#variables-and-operations}

### Variable

**Definition:** a variable is a **name given to a memory location** that stores a value.

The value of a variable **can change** while the algorithm or program runs. For example, in `sum ← sum + i`, the value of `sum` changes on every repetition.

**Rules for naming variables** (common to most languages):

1. A name is made of **letters, digits and the underscore (_)**.
2. It must **begin with a letter** (or underscore), not a digit: `year1990` is valid, but `1990year` is not.
3. It must **not contain spaces** or special symbols such as `+`, `-`, `#`, `@`.
4. It must **not be a keyword** (a reserved word of the language, such as `if` or `while`).
5. It should be **meaningful**, for example `total` or `average`.

**Data types:** each variable holds one kind of data, for example:

1. **Integer:** whole numbers (25, −7)
2. **Real (floating-point):** numbers with a fractional part (3.14, −0.5)
3. **Character:** a single symbol ('A', '7')
4. **String:** text ("Dhaka")
5. **Boolean:** True or False

### Constant

**Definition:** a constant is a value that **does not change** during the execution of an algorithm or program, for example 3.14159 (π), 100 or "Pass".

A constant can be written directly (a **literal**) or given a name (a **named constant**, such as PI).

### Assignment Operation

**Assignment** stores a value in a variable. In algorithms it is written with **←** (in many programming languages with **=**). The expression on the right is calculated first, and the result is stored in the variable on the left, replacing the old value.

```text
 x ← 5          (x becomes 5)
 x ← x + 1      (the old value 5 is increased by 1, so x becomes 6)
```

### Operations

**Operator:** a symbol that performs an operation on values (called **operands**).

In `2 + 3`, `+` is the operator and 2 and 3 are the operands.

**1. Arithmetic operations** (with A = 10, B = 20):

| Operation | Symbol | Example | Result |
| --- | --- | --- | --- |
| Addition | + | A + B | 30 |
| Subtraction | − | A − B | −10 |
| Multiplication | × (or *) | A × B | 200 |
| Division | / | B / A | 2 |
| Modulus (remainder) | mod (or %) | B mod A | 0 |

The **modulus** operation gives the **remainder** of a division: 17 mod 5 = 2, and n mod 2 = 0 means n is even.

**2. Relational (comparison) operations:** compare two values and give **True** or **False** (A = 10, B = 20):

| Operation | Symbol | Example | Result |
| --- | --- | --- | --- |
| Equal to | = (or ==) | A = B | False |
| Not equal to | ≠ (or !=) | A ≠ B | True |
| Greater than | > | A > B | False |
| Less than | < | A < B | True |
| Greater than or equal to | ≥ (or >=) | A ≥ B | False |
| Less than or equal to | ≤ (or <=) | A ≤ B | True |

**3. Logical operations:** combine conditions:

| Operation | Result | Example (A = 10, B = 20) | Result |
| --- | --- | --- | --- |
| AND | True only if **both** conditions are true | (A > 5) AND (B > 25) | False |
| OR | True if **at least one** condition is true | (A > 5) OR (B > 25) | True |
| NOT | Reverses the condition | NOT (A > 5) | False |

**Order of evaluation (precedence):** in an expression, operations are done in this order: brackets first, then multiplication, division and modulus, then addition and subtraction (from left to right for equal precedence), then relational operations, then logical operations. For example, 2 + 3 × 4 = 2 + 12 = 14, but (2 + 3) × 4 = 20.

### Trace Table (Dry Run)

A **trace table** follows the values of the variables step by step, to check an algorithm by hand.

**Example: swapping the values of two variables using a third variable**

```text
 Step 1: Start
 Step 2: Read a, b
 Step 3: temp ← a
 Step 4: a ← b
 Step 5: b ← temp
 Step 6: Print a, b
 Step 7: Stop
```

| Step | a | b | temp |
| --- | --- | --- | --- |
| After Step 2 (a = 5, b = 8) | 5 | 8 | — |
| After Step 3 | 5 | 8 | 5 |
| After Step 4 | 8 | 8 | 5 |
| After Step 5 | 8 | 5 | 5 |

The output is a = 8, b = 5: the values have been swapped. (Without `temp`, writing `a ← b` first would lose the old value of a.)

## Flowchart {#flowchart}

**Definition:** a flowchart is a **diagram (pictorial representation) of an algorithm or process**.

It uses **standard symbols** for the different kinds of steps and **arrows (flow lines)** to show the order in which the steps are carried out.

### Flowchart Symbols

![Standard flowchart symbols: terminal, input/output, process, decision, flow line, connectors, predefined process and document](/diagrams/programming/flowchart-symbols.svg)

| Symbol | Shape | Use |
| --- | --- | --- |
| Terminal | Oval | Start and Stop |
| Input/Output | Parallelogram | Reading input and printing output |
| Process | Rectangle | Calculations and assignments |
| Decision | Diamond | A question with two (or more) exits, such as Yes/No |
| Flow line | Arrow | Direction of flow |
| On-page connector | Small circle | Joins two parts of the flowchart on the same page |
| Off-page connector | Pentagon | Continues the flowchart on another page |
| Predefined process | Rectangle with double side lines | A module or sub-program described elsewhere |
| Document | Rectangle with a wavy bottom | A printed document or report |

### Rules for Drawing a Flowchart

1. Every flowchart has **one Start** and **one Stop** (terminal) symbol.
2. Use the **standard symbols** for each kind of step.
3. Connect every symbol with **arrows**, so that the direction of flow is clear.
4. The flow should normally go **from top to bottom** and **from left to right**.
5. A **decision** symbol has **two or more exits**, each clearly labelled (Yes/No or True/False).
6. **Flow lines should not cross**; use connectors when the chart is long or crowded.
7. Keep the writing inside the symbols **short and clear**.

### Basic Structures of a Flowchart

1. **Sequence:** the steps are carried out **one after another** in a straight line.
2. **Selection (decision):** a condition is tested, and **one of two paths** is followed depending on the result.
3. **Repetition (loop):** a group of steps is **repeated** while a condition is true; the flow line goes back to an earlier step.

### Example Flowcharts

**1. Sequence: sum and average of three numbers**

![Flowchart: read a, b, c; compute the sum and average; print them](/diagrams/programming/flowchart-sum-average.svg)

**2. Selection: the larger of two numbers**

![Flowchart: read a and b; if a > b print a, otherwise print b](/diagrams/programming/flowchart-larger-of-two.svg)

**3. Selection: even or odd**

![Flowchart: read n; if n mod 2 = 0 print Even, otherwise print Odd](/diagrams/programming/flowchart-even-odd.svg)

**4. Loop: sum of the numbers from 1 to N**

![Flowchart: sum = 0 and i = 1; while i ≤ N add i to sum and increase i; then print sum](/diagrams/programming/flowchart-sum-1-to-n.svg)

**5. Loop: factorial of n**

![Flowchart: fact = 1 and i = 1; while i ≤ n multiply fact by i and increase i; then print fact](/diagrams/programming/flowchart-factorial.svg)

### Advantages and Disadvantages of Flowcharts

**Advantages:**

1. **Easy to understand**: the logic is shown visually, so it is a good way to communicate it.
2. Acts as a **blueprint** when writing the program (coding becomes easier).
3. Helps in **finding errors** (debugging) and analysing the program.
4. Serves as good **documentation** of the program.

**Disadvantages:**

1. **Difficult to draw** for large and complex programs.
2. **Difficult to modify**: a change may mean redrawing the whole chart.
3. **Lacks detail** compared with the program itself.
4. **Time-consuming** to draw.

### Types of Flowcharts

Two kinds of flowcharts are used in planning a solution:

1. **Program flowchart:** shows the detailed steps of a program (the logic of the solution), as in the examples above.
2. **System flowchart:** shows how data flows through a whole system: its inputs, processes, files and outputs.

### Differences Between Algorithm and Flowchart

| Basis | Algorithm | Flowchart |
| --- | --- | --- |
| Meaning | Step-by-step instructions in words | Diagram of the steps using symbols |
| Form | Text | Graphics (symbols and arrows) |
| Ease of understanding | Harder to follow for complex logic | Easier to understand (visual) |
| Rules | No fixed set of symbols | Uses standard symbols and rules |
| Branching and looping | Easy to write | Clear to see, but harder to draw for large programs |
| Making changes | Easy | Difficult (may need redrawing) |
| Suitable for | Large and small problems | Small and medium problems |

## References {#references}

**TutorialsPoint**

- [Computer Programming – Variables](https://www.tutorialspoint.com/computer_programming/computer_programming_variables.htm) — accessed 2026-11-01
- [Computer Programming – Operators](https://www.tutorialspoint.com/computer_programming/computer_programming_operators.htm) — accessed 2026-11-01
- [Algorithm Flowchart](https://www.tutorialspoint.com/basics_of_computer_science/basics_of_computer_science_algorithm_flowchart.htm) — accessed 2026-11-01
- [Programming Methodologies – Quick Guide](https://www.tutorialspoint.com/programming_methodologies/programming_methodologies_quick_guide.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Introduction to Flowcharts](https://www.geeksforgeeks.org/dsa/an-introduction-to-flowcharts/) — accessed 2026-11-01
- [What is a Flowchart and its Types?](https://www.geeksforgeeks.org/computer-science-fundamentals/what-is-a-flowchart-and-its-types/) — accessed 2026-11-01

**TpointTech**

- [Difference between Algorithm and Flow chart](https://www.tpointtech.com/algorithm-vs-flow-chart) — accessed 2026-11-01

**Additional sources**

- [Flowchart](https://en.wikipedia.org/wiki/Flowchart) — Wikipedia, accessed 2026-11-01
