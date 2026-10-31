---
description: Simplifying logic circuits with Boolean algebra, minterms, maxterms, SOP and POS forms, the Karnaugh map and the Quine–McCluskey method, with worked examples.
updated: 2026-11-01
---

## Simplification of Logic Circuits {#simplification-of-logic-circuits}

**Definition:** simplification of a logic circuit means rewriting its Boolean expression in a **simpler, equivalent form** (one that gives the same output for every input) so that the circuit can be built with **fewer gates and fewer inputs**.

**Why simplification is needed:**

1. Fewer logic gates are needed, so the circuit is **cheaper**.
2. The circuit is **smaller** and **simpler**.
3. It works **faster**, because the signal passes through fewer gates.
4. It uses **less power** and is more **reliable**.

**Methods of simplification:**

1. **Algebraic method:** using the laws and theorems of Boolean algebra (see [Boolean Algebra](/topics/digital-logic/boolean-algebra)).
2. **Karnaugh map (K-map) method:** a graphical method (see [Karnaugh Map](#karnaugh-map)).
3. **Quine–McCluskey (tabulation) method:** a tabular method (see [Quine–McCluskey Method](#quine-mccluskey-method)).

### Rules for Algebraic Simplification

1. Work from left to right.
2. Work out the expressions inside brackets first.
3. Do the complement (NOT) operations first.
4. Then do the AND (·) operations.
5. Then do the OR (+) operations.
6. Use the laws of Boolean algebra (such as A + A′ = 1, A · A′ = 0, A + AB = A, A + A′B = A + B and De Morgan's theorems) to remove terms and variables.

### Worked Examples

**Example 1: simplify F = AB + AB′**

```text
 F = AB + AB′
   = A(B + B′)        (distributive law)
   = A · 1            (B + B′ = 1)
   = A
```

The circuit for AB + AB′ needs one NOT gate, two AND gates and one OR gate; after simplification, the output is simply the input A, and **no gate** is needed.

**Example 2: simplify F = (A + B + C′)′ · B · C′**

```text
 F = (A + B + C′)′ · B · C′
   = A′ · B′ · C · B · C′      (De Morgan's theorem; (C′)′ = C)
   = A′ · (B′ · B) · (C · C′)
   = A′ · 0 · 0                (B′ · B = 0, C · C′ = 0)
   = 0
```

**Example 3: simplify F = A′B + A′B′ + AB**

```text
 F = A′B + A′B′ + AB
   = A′(B + B′) + AB           (distributive law)
   = A′ · 1 + AB
   = A′ + AB
   = (A′ + A)(A′ + B)          (A + BC = (A + B)(A + C))
   = 1 · (A′ + B)
   = A′ + B
```

**Example 4: simplify F = ABC + AB′C + ABC′**

```text
 F = ABC + AB′C + ABC′
   = AC(B + B′) + ABC′
   = AC + ABC′
   = A(C + BC′)
   = A(C + B)                  (C + C′B = C + B)
   = AB + AC
```

**Example 5: simplify X = AB + A(B + C) + B(B + C)**

```text
 X = AB + AB + AC + BB + BC   (multiplying out)
   = AB + AC + B + BC          (AB + AB = AB; BB = B)
   = AB + AC + B               (B + BC = B)
   = B + AC                    (B + AB = B)
```

Before simplification the circuit needs two OR gates for the (B + C) terms, three AND gates and one 3-input OR gate; after simplification it needs only **one AND gate and one OR gate**.

**Example 6: simplify XY′Z + X′Y′Z**

```text
 XY′Z + X′Y′Z = Y′Z(X + X′) = Y′Z · 1 = Y′Z
```

**Example 7 (exam question, Sonali Bank ADA): simplify Q = C′ + A′B + BC′(B′ + C)**

```text
 Q = C′ + A′B + BC′B′ + BC′C
   = C′ + A′B + 0 + 0          (B · B′ = 0, C′ · C = 0)
   = C′ + A′B
```

## Circuit and Expression Minimization {#circuit-and-expression-minimization}

**Minimization** means finding the expression with the **fewest terms** and the **fewest literals** (variables or complemented variables) for a given function, so that the circuit needs the fewest gates and gate inputs. To minimize an expression systematically, it is first written in a **standard form**.

### Minterms and Maxterms

1. **Literal:** a variable or its complement (for example, A or A′).
2. **Minterm:** a **product (AND) term** that contains **every variable once**, in true or complemented form. A variable is written **complemented if its value is 0** and uncomplemented if its value is 1. A minterm is 1 for only one input combination. Minterms are written m₀, m₁, m₂, …
3. **Maxterm:** a **sum (OR) term** that contains **every variable once**. A variable is written **complemented if its value is 1** and uncomplemented if its value is 0. A maxterm is 0 for only one input combination. Maxterms are written M₀, M₁, M₂, …
4. With *n* variables there are **2ⁿ minterms** and **2ⁿ maxterms**.
5. A minterm and the maxterm with the same number are complements of each other: **mᵢ′ = Mᵢ** (by De Morgan's theorem).

**Minterms and maxterms of three variables:**

| Decimal | A B C | Minterm | Maxterm |
| --- | --- | --- | --- |
| 0 | 0 0 0 | m₀ = A′B′C′ | M₀ = A + B + C |
| 1 | 0 0 1 | m₁ = A′B′C | M₁ = A + B + C′ |
| 2 | 0 1 0 | m₂ = A′BC′ | M₂ = A + B′ + C |
| 3 | 0 1 1 | m₃ = A′BC | M₃ = A + B′ + C′ |
| 4 | 1 0 0 | m₄ = AB′C′ | M₄ = A′ + B + C |
| 5 | 1 0 1 | m₅ = AB′C | M₅ = A′ + B + C′ |
| 6 | 1 1 0 | m₆ = ABC′ | M₆ = A′ + B′ + C |
| 7 | 1 1 1 | m₇ = ABC | M₇ = A′ + B′ + C′ |

### SOP and POS Forms

1. **Sum of Products (SOP):** product (AND) terms joined by OR. Example: AB + A′C.
2. **Product of Sums (POS):** sum (OR) terms joined by AND. Example: (A + B)(A′ + C).
3. **Canonical (standard) SOP:** an OR of **minterms** only; every term contains all the variables. It is also written with Σ (sigma) and the minterm numbers: F = Σm(1, 3, 6, 7).
4. **Canonical (standard) POS:** an AND of **maxterms** only. It is written with Π (pi) and the maxterm numbers: F = ΠM(0, 2, 4, 5).
5. The minimized (simplified) forms are called the **minimal SOP** and **minimal POS**.

An SOP circuit is built with AND gates followed by one OR gate (an AND–OR circuit); a POS circuit is built with OR gates followed by one AND gate (an OR–AND circuit).

### Writing an Expression from a Truth Table

1. **SOP:** for each row where the output is **1**, write the minterm (complement the variables that are 0), and OR the minterms together.
2. **POS:** for each row where the output is **0**, write the maxterm (complement the variables that are 1), and AND the maxterms together.

**Example:** find the SOP and POS expressions of X.

| A | B | C | X |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

```text
 SOP (rows 1, 3, 6, 7):  X = A′B′C + A′BC + ABC′ + ABC = Σm(1, 3, 6, 7)
 POS (rows 0, 2, 4, 5):  X = (A + B + C)(A + B′ + C)(A′ + B + C)(A′ + B + C′) = ΠM(0, 2, 4, 5)
```

The minterms in Σ and the maxterms in Π are always **complementary sets**: together they contain every number from 0 to 2ⁿ − 1 once.

**Minimizing the SOP algebraically:**

```text
 X = A′B′C + A′BC + ABC′ + ABC
   = A′C(B′ + B) + AB(C′ + C)
   = A′C + AB
```

So the canonical SOP with 4 terms of 3 literals reduces to **A′C + AB** (2 terms, 4 literals). The same result is obtained from the Karnaugh map below.

## Karnaugh Map {#karnaugh-map}

**Definition:** a **Karnaugh map (K-map)** is a **graphical method** of simplifying a Boolean expression. The truth table is drawn as a grid of cells, one cell for each minterm, arranged so that **adjacent cells differ in only one variable**. Adjacent 1s are then grouped, and each group gives one simple product term.

**History:** the K-map was introduced by **Maurice Karnaugh** in **1953**, as a refinement of the Veitch chart (Edward W. Veitch, 1952).

### Structure of a K-map

1. A K-map of *n* variables has **2ⁿ cells**: 4 cells for 2 variables, 8 for 3 and 16 for 4.
2. The rows and columns are labelled in **Gray code order (00, 01, 11, 10)**, not in binary order, so that only one variable changes between any two adjacent cells.
3. The map **wraps around**: the cells in the leftmost column are adjacent to those in the rightmost column, and the top row is adjacent to the bottom row.

![2-variable K-map layout](/diagrams/digital-logic/kmap-2-variable-layout.svg)

![3-variable K-map layout](/diagrams/digital-logic/kmap-3-variable-layout.svg)

![4-variable K-map layout](/diagrams/digital-logic/kmap-4-variable-layout.svg)

### Rules for Grouping

1. Group only **adjacent cells containing 1** (for SOP); a group must not contain any 0.
2. The number of cells in a group must be a **power of 2**: 1, 2, 4, 8 or 16.
3. Groups must be **rectangles or squares** (horizontal or vertical); **diagonal** groups are not allowed.
4. Make each group **as large as possible**.
5. Use **as few groups as possible**.
6. Groups may **overlap**: a 1 may be used in more than one group, but every group must contain at least one 1 that is not in any other group.
7. Groups may **wrap around** the edges of the map, and the four corner cells of a 4-variable map can form one group.
8. Every 1 must be in at least one group.

**Size of a group and number of variables removed:** in an *n*-variable map, a group of 2ᵏ cells removes *k* variables, so its term has n − k literals. In a 4-variable map: a group of 2 cells gives a 3-literal term, a group of 4 gives a 2-literal term, a group of 8 gives a 1-literal term, and a group of 16 gives 1.

### Steps for SOP Simplification

1. Draw the K-map for the number of variables.
2. Write **1** in the cell of each minterm of the function and **0** in the other cells.
3. Group the 1s following the rules above.
4. For each group, write the product term containing only the variables whose value **does not change** inside the group: write the variable if it is 1 throughout the group, and its complement if it is 0 throughout.
5. **OR** all the product terms.

**Example 1: F(A, B) = Σm(0, 1, 3)**

![K-map of F = Σm(0, 1, 3)](/diagrams/digital-logic/kmap-example-2var.svg)

1. Group (cells 0, 1): A = 0 throughout, B changes → **A′**.
2. Group (cells 1, 3): B = 1 throughout, A changes → **B**.

So, **F = A′ + B**.

**Example 2: F(A, B, C) = Σm(1, 3, 6, 7)**

![K-map of F = Σm(1, 3, 6, 7)](/diagrams/digital-logic/kmap-example-3var.svg)

1. Group (cells 1, 3): A = 0 and C = 1 throughout, B changes → **A′C**.
2. Group (cells 6, 7): A = 1 and B = 1 throughout, C changes → **AB**.

So, **F = A′C + AB** (the same answer as the algebraic method above).

**Example 3 (exam question, Combined Bank Senior Officer IT): F(W, X, Y, Z) = Σm(0, 4, 5, 6, 12, 14, 15)**

![K-map of F = Σm(0, 4, 5, 6, 12, 14, 15)](/diagrams/digital-logic/kmap-example-wxyz.svg)

1. Quad (cells 4, 6, 12, 14; columns 00 and 10 wrap around): X = 1, Z = 0 → **XZ′**.
2. Pair (cells 0, 4): W = 0, Y = 0, Z = 0 → **W′Y′Z′**.
3. Pair (cells 4, 5): W = 0, X = 1, Y = 0 → **W′XY′**.
4. Pair (cells 14, 15): W = 1, X = 1, Y = 1 → **WXY**.

So, **F = XZ′ + W′Y′Z′ + W′XY′ + WXY**.

**Example 4 (exam question, Combined Bank AE/AME/SO): F(A, B, C, D) = Σm(3, 5, 7, 9, 11, 13, 14, 15)**

![K-map of F = Σm(3, 5, 7, 9, 11, 13, 14, 15)](/diagrams/digital-logic/kmap-example-4var-a.svg)

1. Quad (cells 3, 7, 11, 15): C = 1, D = 1 → **CD**.
2. Quad (cells 5, 7, 13, 15): B = 1, D = 1 → **BD**.
3. Quad (cells 9, 11, 13, 15): A = 1, D = 1 → **AD**.
4. Pair (cells 14, 15): A = 1, B = 1, C = 1 → **ABC**.

So, **F = CD + BD + AD + ABC**.

**Example 5 (exam question, Combined Bank AME/AE): F(A, B, C, D) = Σm(0, 3, 5, 7, 8, 10, 11, 12, 13, 14, 15)**

![K-map of F = Σm(0, 3, 5, 7, 8, 10, 11, 12, 13, 14, 15)](/diagrams/digital-logic/kmap-example-4var-b.svg)

1. Quad (cells 3, 7, 11, 15): **CD**.
2. Pair (cells 0, 8; rows 00 and 10 wrap around): B = 0, C = 0, D = 0 → **B′C′D′**.
3. Quad (cells 5, 7, 13, 15): **BD**.
4. Quad (cells 8, 10, 12, 14; columns 00 and 10 wrap around): A = 1, D = 0 → **AD′**.

So, **F = CD + B′C′D′ + BD + AD′**.

### Steps for POS Simplification

1. Write **0** in the cell of each maxterm (each row where the output is 0) and **1** in the other cells.
2. Group the **0s** following the same rules.
3. For each group, write the **sum term** of the variables that do not change: write the variable if it is **0** throughout the group, and its **complement** if it is **1**.
4. **AND** all the sum terms.

**Example 6: F(A, B, C) = ΠM(0, 3, 6, 7)**

![K-map of F = ΠM(0, 3, 6, 7)](/diagrams/digital-logic/kmap-example-pos.svg)

1. Group (cells 6, 7): A = 1, B = 1 → **(A′ + B′)**.
2. Group (cells 3, 7): B = 1, C = 1 → **(B′ + C′)**.
3. Single cell 0: A = 0, B = 0, C = 0 → **(A + B + C)**.

So, **F = (A′ + B′)(B′ + C′)(A + B + C)**.

### Don't-Care Conditions

**Definition:** a **don't-care condition** is an input combination for which the output may be either 0 or 1, because the combination **never occurs** or its output **does not matter**. It is marked **X** (or d) in the K-map, and the don't-care minterms are listed with **d**. For example, in a BCD circuit, the inputs 1010 to 1111 never occur.

**Rule:** a don't-care cell may be treated as **1** (for SOP) or **0** (for POS) **only if it helps to make a group larger**; otherwise it is ignored. A group must not be made of don't-cares only.

**Example 7: F(A, B, C, D) = Σm(1, 3, 7, 11, 15) + d(0, 2, 5)**

![K-map of F = Σm(1, 3, 7, 11, 15) + d(0, 2, 5)](/diagrams/digital-logic/kmap-example-dont-care.svg)

1. Quad (cells 3, 7, 11, 15): **CD**.
2. Quad (cells 1, 3, 5, 7), using the don't-care in cell 5 as 1: A = 0, D = 1 → **A′D**.
3. The don't-cares in cells 0 and 2 are not needed, so they are treated as 0.

So, **F = CD + A′D**. (Using the don't-cares 0 and 2 instead gives the equally minimal answer CD + A′B′.)

### Advantages and Disadvantages of the K-map

**Advantages:**

1. It is simpler and faster than the algebraic method for up to 4 variables.
2. It gives the minimal SOP or POS form directly.
3. Don't-care conditions are easy to use.

**Disadvantages:**

1. It becomes difficult to use for **5 or more variables**.
2. It depends on recognising groups by eye, so mistakes are possible.
3. It is not suitable for computer programs.

## Quine–McCluskey Method {#quine-mccluskey-method}

**Definition:** the **Quine–McCluskey method** (also called the **tabulation method**) is a **systematic, tabular method** of minimizing a Boolean function. It finds all the **prime implicants** of the function and then selects the smallest set of them that covers all the minterms.

**History:** the method was developed by **Willard V. Quine** in **1952** and extended by **Edward J. McCluskey** in **1956**.

**Important terms:**

1. **Implicant:** a product term that covers one or more minterms of the function (a group of 1s in a K-map).
2. **Prime implicant (PI):** an implicant that cannot be combined with another to remove a variable (the largest possible group).
3. **Essential prime implicant (EPI):** a prime implicant that covers at least one minterm that **no other prime implicant** covers. Every essential prime implicant must appear in the minimal expression.

### Steps

1. Write each minterm in **binary**, and arrange the minterms in **groups according to the number of 1s** they contain.
2. Compare each term with every term in the **next group**. If two terms differ in **only one bit**, combine them and write a **dash (−)** in that bit position. Mark the terms that have been combined.
3. Repeat step 2 with the new terms (only terms with dashes in the same positions can combine) until no more combinations are possible.
4. The terms that were **never combined** are the **prime implicants**.
5. Draw the **prime implicant chart**: one row for each prime implicant and one column for each minterm; mark the minterms each prime implicant covers.
6. Find the **essential prime implicants**: a column with only one mark shows a minterm covered by one prime implicant only.
7. If some minterms are still uncovered, choose the fewest additional prime implicants to cover them.
8. Write the minimal expression as the OR of the selected prime implicants (a 1 is the variable, a 0 its complement, and a dash removes the variable).

### Worked Example: F(A, B, C, D) = Σm(0, 1, 2, 4, 6, 8, 9, 11, 13, 15)

**Step 1: group the minterms by the number of 1s**

| Group (number of 1s) | Minterm | ABCD |
| --- | --- | --- |
| 0 | 0 | 0000 |
| 1 | 1 | 0001 |
| 1 | 2 | 0010 |
| 1 | 4 | 0100 |
| 1 | 8 | 1000 |
| 2 | 6 | 0110 |
| 2 | 9 | 1001 |
| 3 | 11 | 1011 |
| 3 | 13 | 1101 |
| 4 | 15 | 1111 |

**Step 2: combine terms that differ in one bit (pairs)**

| Pair | ABCD |
| --- | --- |
| (0, 1) | 000− |
| (0, 2) | 00−0 |
| (0, 4) | 0−00 |
| (0, 8) | −000 |
| (1, 9) | −001 |
| (2, 6) | 0−10 |
| (4, 6) | 01−0 |
| (8, 9) | 100− |
| (9, 11) | 10−1 |
| (9, 13) | 1−01 |
| (11, 15) | 1−11 |
| (13, 15) | 11−1 |

**Step 3: combine the pairs into quads**

| Quad | ABCD | Term |
| --- | --- | --- |
| (0, 1, 8, 9) | −00− | B′C′ |
| (0, 2, 4, 6) | 0−−0 | A′D′ |
| (9, 11, 13, 15) | 1−−1 | AD |

Every pair has been combined into a quad, and the quads cannot be combined further, so the **prime implicants** are **B′C′**, **A′D′** and **AD**.

**Step 4: prime implicant chart**

| Prime implicant | 0 | 1 | 2 | 4 | 6 | 8 | 9 | 11 | 13 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B′C′ (0, 1, 8, 9) | ✓ | ✓ |  |  |  | ✓ | ✓ |  |  |  |
| A′D′ (0, 2, 4, 6) | ✓ |  | ✓ | ✓ | ✓ |  |  |  |  |  |
| AD (9, 11, 13, 15) |  |  |  |  |  |  | ✓ | ✓ | ✓ | ✓ |

1. Minterm 1 (and 8) is covered only by **B′C′** → essential.
2. Minterms 2, 4 and 6 are covered only by **A′D′** → essential.
3. Minterms 11, 13 and 15 are covered only by **AD** → essential.

All the minterms are covered by the three essential prime implicants, so:

**F = B′C′ + A′D′ + AD**

The K-map gives the same answer:

![K-map of F = Σm(0, 1, 2, 4, 6, 8, 9, 11, 13, 15)](/diagrams/digital-logic/kmap-example-qm.svg)

### Advantages and Disadvantages of the Quine–McCluskey Method

**Advantages:**

1. It can be used for **any number of variables**, including 5 or more.
2. It is a fixed, step-by-step procedure, so it is suitable for **computer programs**.
3. It does not depend on recognising patterns by eye, and it shows that the result is minimal.

**Disadvantages:**

1. For a large number of variables the tables become **very large**, and the work grows very quickly (exponentially).
2. By hand, it is **slower** than the K-map for functions of 4 or fewer variables.

### Differences Between the K-map and the Quine–McCluskey Method

| Basis | K-map | Quine–McCluskey method |
| --- | --- | --- |
| Type of method | Graphical | Tabular |
| Number of variables | Practical up to 4 (difficult for 5 or more) | Any number |
| How groups are found | By eye | Systematically, by comparing binary terms |
| Suitable for computers | No | Yes |
| Speed by hand (small functions) | Fast | Slow |
| Introduced by | Maurice Karnaugh (1953) | W. V. Quine (1952), E. J. McCluskey (1956) |

## References {#references}

**IT Job QnS**

- [Digital Logic Design](https://it.jobqns.com/digital-logic-design/) (K-map and simplification exam questions from Combined Bank and Sonali Bank) — accessed 2026-11-01

**TutorialsPoint**

- [Minterms and Maxterms in Boolean Algebra](https://www.tutorialspoint.com/digital-electronics/minterms-and-maxterms-in-boolean-algebra.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Introduction of K-Map (Karnaugh Map)](https://www.geeksforgeeks.org/digital-logic/introduction-of-k-map-karnaugh-map/) — accessed 2026-11-01
- [Quine-McCluskey Method](https://www.geeksforgeeks.org/digital-logic/quine-mccluskey-method/) — accessed 2026-11-01

**TpointTech**

- [Simplification of Boolean Expressions using Karnaugh Map](https://www.tpointtech.com/simplification-of-boolean-expressions-using-karnaugh-map) — accessed 2026-11-01

**Additional sources**

- [Karnaugh map](https://en.wikipedia.org/wiki/Karnaugh_map) — Wikipedia, accessed 2026-11-01
- [Quine–McCluskey algorithm](https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm) — Wikipedia, accessed 2026-11-01
