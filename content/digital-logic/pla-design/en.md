---
description: Programmable logic devices (PROM, PAL and PLA), the structure of a programmable logic array, the PLA design procedure and programming table, with worked examples.
updated: 2026-11-01
---

### Programmable Logic Devices (PLDs)

**Definition:** a programmable logic device (PLD) is an integrated circuit that contains an **array of AND gates** and an **array of OR gates** whose connections can be **programmed (configured) by the user** to make the chip perform a required logic function. "Programming" here means setting the hardware connections (for example, by blowing fuses), not writing software.

Because any Boolean function can be written in **sum-of-products (SOP)** form, an AND array (to form the product terms) followed by an OR array (to add them) can produce any combinational function (see [Logic Simplification](/topics/digital-logic/logic-simplification#circuit-and-expression-minimization)).

**Types of PLDs:** the types differ in **which array is programmable**:

| PLD | AND array | OR array | What the AND array produces |
| --- | --- | --- | --- |
| **PROM** (Programmable Read-Only Memory) | Fixed (a decoder) | Programmable | **All** 2ⁿ minterms |
| **PAL** (Programmable Array Logic) | Programmable | Fixed | Only the product terms needed; each OR gate has its own fixed group of terms |
| **PLA** (Programmable Logic Array) | Programmable | Programmable | Only the product terms needed; any term can go to any output |

### Programmable Logic Array (PLA)

**Definition:** a programmable logic array (PLA) is a PLD in which **both the AND array and the OR array are programmable**.

The AND array produces only the product terms that are needed (not all minterms), and the OR array adds any chosen product terms to form each output. A PLA is used to build **custom combinational circuits**.

**Structure:**

1. **Inputs with buffers and inverters:** each input variable is made available in both its **true** and **complemented** form (A and A′, B and B′, …).
2. **Programmable AND array:** each AND gate can be connected to any of the true or complemented inputs, so it forms one **product term**.
3. **Programmable OR array:** each OR gate can be connected to any of the product terms, so it forms one output as a **sum of products**.
4. **Outputs:** the outputs of the OR gates are the functions F1, F2, ….

**Size of a PLA:** a PLA is described by three numbers: **n inputs × k product terms × m outputs**. The number of product terms k is limited (it is usually much less than 2ⁿ), so the functions must be simplified to fit.

**Sharing of product terms:** a product term formed once in the AND array can be **connected to several OR gates**. So when two outputs need the same product term, the PLA forms it only once. This is the main advantage of a PLA over a PAL.

**Notation in diagrams:** each AND gate or OR gate is drawn with a **single input line**, and a **×** on a crossing shows a **programmed (connected)** link; a crossing without × is not connected.

### PLA Design Procedure

1. **Write the truth table** of the required outputs (or start from the given functions).
2. **Write each output in SOP form** (sum of minterms).
3. **Simplify each output** (for example, with a [Karnaugh map](/topics/digital-logic/logic-simplification#karnaugh-map)). The aim is the **smallest total number of distinct product terms**, so prefer product terms that can be **shared** between outputs.
4. **List the distinct product terms**; their number k must not exceed the number of AND gates in the PLA.
5. **Prepare the PLA programming table** (see below).
6. **Program the connections**: in the AND array according to the input columns, and in the OR array according to the output columns.

### PLA Programming Table

The programming table specifies all the connections of a PLA. It has one row for each product term and three groups of columns:

1. **Product term:** the number or name of the term.
2. **Inputs:** for each input variable, **1** if the variable appears in its true form, **0** if it appears complemented, and **–** (dash) if it does not appear in the term.
3. **Outputs:** for each output, **1** if the product term is connected to that OR gate, and **–** if it is not.

### Worked Example 1

**Problem:** implement the following two functions with a PLA:

```text
 F1(A, B, C) = Σm(3, 5, 6, 7)
 F2(A, B, C) = Σm(1, 6, 7)
```

**Simplification:**

1. F1 is 1 when two or more inputs are 1. Its K-map gives three pairs: **F1 = AB + BC + AC**.
2. F2: m6 and m7 combine to **AB**; m1 (001) cannot combine with them, so it stays as **A′B′C**. So **F2 = AB + A′B′C**.

**Distinct product terms:** AB, BC, AC and A′B′C, so **k = 4**. The term **AB is shared** by F1 and F2, so it is formed only once (without sharing, 5 AND gates would be needed). The PLA size is **3 × 4 × 2**.

**Programming table:**

| Product term | A | B | C | F1 | F2 |
| --- | --- | --- | --- | --- | --- |
| 1: AB | 1 | 1 | – | 1 | 1 |
| 2: BC | – | 1 | 1 | 1 | – |
| 3: AC | 1 | – | 1 | 1 | – |
| 4: A′B′C | 0 | 0 | 1 | – | 1 |

![PLA with 3 inputs, 4 product terms and 2 outputs implementing F1 = AB + BC + AC and F2 = AB + A′B′C](/diagrams/digital-logic/pla-example.svg)

### Worked Example 2

**Problem:** implement with a PLA the outputs of this truth table:

| A | B | C | F1 | F2 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |

**SOP forms:**

```text
 F1 = AB′C′ + ABC′ + ABC
 F2 = A′BC + AB′C + ABC
```

**Simplification:**

```text
 F1 = AC′(B′ + B) + ABC = AC′ + ABC = A(C′ + BC) = A(C′ + B) = AC′ + AB
 F2 = BC(A′ + A) + AB′C = BC + AB′C = C(B + AB′) = C(B + A) = BC + AC
```

**Programming table** (4 product terms, PLA size 3 × 4 × 2):

| Product term | A | B | C | F1 | F2 |
| --- | --- | --- | --- | --- | --- |
| 1: AC′ | 1 | – | 0 | 1 | – |
| 2: AB | 1 | 1 | – | 1 | – |
| 3: BC | – | 1 | 1 | – | 1 |
| 4: AC | 1 | – | 1 | – | 1 |

### Differences Between PROM, PAL and PLA

| Basis | PROM | PAL | PLA |
| --- | --- | --- | --- |
| AND array | Fixed | Programmable | Programmable |
| OR array | Programmable | Fixed | Programmable |
| Product terms | All 2ⁿ minterms (no simplification needed) | Only the needed terms | Only the needed terms |
| Sharing product terms between outputs | — | Not possible (fixed OR) | Possible |
| Flexibility | Low for functions with many inputs | Limited | Highest |
| Cost and complexity | — | Lower | Higher |
| Speed | — | Faster | Slower |
| Use | Storing tables and codes | Most common simple PLD | Custom logic with shared terms |

### Advantages and Disadvantages of a PLA

**Advantages:**

1. **Flexible:** both arrays are programmable, so many different combinational circuits can be built.
2. **Efficient:** only the product terms that are needed are formed, and they can be **shared** between outputs.
3. One chip can replace **many separate gates**, which saves space and wiring.

**Disadvantages:**

1. **More complex** to design and program than a PAL.
2. **Costlier** and **slower** than a PAL, because both arrays are programmable.

**Applications of PLAs:**

1. Implementing **custom combinational logic** (several Boolean functions in one chip)
2. **Control units** of processors (controlling a datapath)
3. **Code converters** and **decoders**
4. Next-state logic of counters and other sequential circuits (with external flip-flops), and bus interface logic

## References {#references}

**TutorialsPoint**

- [Digital Circuits – Programmable Logic Devices](https://www.tutorialspoint.com/digital_circuits/digital_circuits_programmable_logic_devices.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Programmable Logic Array](https://www.geeksforgeeks.org/digital-logic/programmable-logic-array/) — accessed 2026-11-01
- [Programmable Logic Array vs Programming Array Logic](https://www.geeksforgeeks.org/digital-logic/difference-between-programmable-logic-array-and-programming-array-logic/) — accessed 2026-11-01
