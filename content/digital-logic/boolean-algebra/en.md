---
description: Boolean algebra (postulates, laws, theorems and the duality principle) and De Morgan's theorems with truth-table proofs and gate equivalences.
updated: 2026-11-01
---

## Boolean Algebra {#boolean-algebra}

### Definition and History

**Boolean algebra** is the branch of algebra in which the variables can have **only two values: 1 (true) and 0 (false)**, and the basic operations are **OR (logical addition)**, **AND (logical multiplication)** and **NOT (complement)**. It is the mathematical basis of logic gates and digital circuits.

1. It is named after the English mathematician **George Boole** (1815–1864).
2. In **1847** Boole published *The Mathematical Analysis of Logic*, and in **1854** *An Investigation of the Laws of Thought*, in which he developed this algebra of logic.
3. In **1937**, **Claude Shannon** showed in his master's thesis that Boolean algebra can be used to analyse and design **switching circuits**. This is why it is used to design the circuits of computers.

**In digital circuits:** the two values are electrical levels. In TTL circuits, a voltage from **0 V to 0.8 V** is **0**, and from **2 V to 5 V** is **1**.

### Boolean Constants and Variables

1. **Boolean constant:** a quantity whose value is fixed: **0** or **1**.
2. **Boolean variable:** a quantity that can take either of the two values 0 or 1, written with a letter such as A, B, X. For example, if A can be 0 or 1, A is a Boolean variable.
3. **Complement:** the opposite value of a variable. The complement of A is written **A′** or **Ā** (read "A bar" or "NOT A"). If A = 0 then A′ = 1, and if A = 1 then A′ = 0.
4. **Boolean expression (function):** a combination of variables and constants joined by the operations +, · and ′, for example X = A + B′C.

### The Three Basic Operations (Postulates)

1. **Boolean addition (OR operation, +):**

| Rule | Result |
| --- | --- |
| 0 + 0 | 0 |
| 0 + 1 | 1 |
| 1 + 0 | 1 |
| 1 + 1 | **1** |

The first three rules are the same as in ordinary arithmetic, but **1 + 1 = 1** (not 2): in Boolean algebra, + means OR, not ordinary addition.

2. **Boolean multiplication (AND operation, ·):**

| Rule | Result |
| --- | --- |
| 0 · 0 | 0 |
| 0 · 1 | 0 |
| 1 · 0 | 0 |
| 1 · 1 | 1 |

3. **Boolean complement (NOT operation, ′):**

| Rule | Result |
| --- | --- |
| 0′ | 1 |
| 1′ | 0 |

**Order of operations:** first NOT (complement), then AND (·), then OR (+). Brackets are worked out first.

### Duality Principle

**Statement:** if, in any true Boolean equation (law), every **AND (·)** is changed to **OR (+)**, every **OR (+)** is changed to **AND (·)**, every **0** is changed to **1** and every **1** is changed to **0**, the resulting equation (called its **dual**) is also true. The variables and their complements are **not** changed.

**Examples:**

| Equation | Its dual |
| --- | --- |
| A + 0 = A | A · 1 = A |
| A + 1 = 1 | A · 0 = 0 |
| A + A′ = 1 | A · A′ = 0 |
| 1 + 1 = 1 | 0 · 0 = 0 |
| A + A · B = A | A · (A + B) = A |
| A + B · C = (A + B) · (A + C) | A · (B + C) = A · B + A · C |

So every law of Boolean algebra comes in a pair, and only one of each pair has to be proved.

### Laws and Theorems of Boolean Algebra

**1. Basic theorems (with one variable):**

| Law | OR form | AND form (dual) |
| --- | --- | --- |
| Identity law | A + 0 = A | A · 1 = A |
| Null (annulment) law | A + 1 = 1 | A · 0 = 0 |
| Idempotent law | A + A = A | A · A = A |
| Complement law | A + A′ = 1 | A · A′ = 0 |
| Double complement (involution) law | (A′)′ = A | — |

**2. Commutative law:** the order of the variables does not matter.

1. A + B = B + A
2. A · B = B · A

**3. Associative law:** the grouping of the variables does not matter.

1. A + (B + C) = (A + B) + C
2. A · (B · C) = (A · B) · C

**4. Distributive law:**

1. A · (B + C) = A · B + A · C
2. A + B · C = (A + B) · (A + C)

**5. Absorption law (secondary theorems):**

1. A + A · B = A
2. A · (A + B) = A
3. A + A′ · B = A + B
4. A · (A′ + B) = A · B

**6. Consensus theorem:** A · B + A′ · C + B · C = A · B + A′ · C

**7. De Morgan's theorems:** (A + B)′ = A′ · B′ and (A · B)′ = A′ + B′ (see [De Morgan's Theorem](#de-morgan-s-theorem)).

### Proofs of the Theorems

Each law can be proved in two ways: with **truth tables**, or **algebraically** using the other laws. In a truth table proof, both sides are calculated for every combination of inputs; if the two columns are the same in every row, the law is true.

**Proving the basic theorems by putting A = 0 and A = 1:**

1. A + A′ = 1: if A = 0, then 0 + 1 = 1; if A = 1, then 1 + 0 = 1.
2. A · A′ = 0: if A = 0, then 0 · 1 = 0; if A = 1, then 1 · 0 = 0.
3. A + A = A: if A = 0, then 0 + 0 = 0; if A = 1, then 1 + 1 = 1.
4. (A′)′ = A: if A = 0, then A′ = 1 and (A′)′ = 0 = A.

**Example 1: prove A + A · B = A**

*Algebraic proof:*

```text
 A + A·B = A·1 + A·B        (A·1 = A)
         = A·(1 + B)        (distributive law)
         = A·1              (1 + B = 1)
         = A
```

*Truth table proof:*

| A | B | A · B | A + A · B |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |

The columns A and A + A · B are the same in every row, so A + A · B = A.

**Example 2: prove A + A′ · B = A + B**

*Algebraic proof:*

```text
 A + A′·B = (A + A′)·(A + B)     (distributive law: A + BC = (A + B)(A + C))
          = 1·(A + B)            (A + A′ = 1)
          = A + B
```

*Truth table proof:*

| A | B | A′ | A′ · B | A + A′ · B | A + B |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 | 1 | 1 |

The last two columns are the same in every row, so A + A′ · B = A + B.

**Example 3: prove A + B · C = (A + B) · (A + C)**

```text
 (A + B)·(A + C) = A·A + A·C + A·B + B·C     (multiplying out)
                 = A + A·C + A·B + B·C       (A·A = A)
                 = A·(1 + C + B) + B·C
                 = A·1 + B·C                 (1 + C + B = 1)
                 = A + B·C
```

### Uses of Boolean Algebra

1. To express the working of logic circuits as Boolean expressions.
2. To **simplify** logic expressions, so that the circuit needs fewer gates (see [Logic Simplification](/topics/digital-logic/logic-simplification)).
3. To design and analyse digital circuits such as adders, decoders and multiplexers.

### Differences Between Ordinary Algebra and Boolean Algebra

| Basis | Ordinary algebra | Boolean algebra |
| --- | --- | --- |
| Values of a variable | Any number | Only 0 and 1 |
| Operations | Addition, subtraction, multiplication, division and others | Only OR (+), AND (·) and NOT (′) |
| Meaning of + | Arithmetic addition (1 + 1 = 2) | Logical OR (1 + 1 = 1) |
| Complement | No complement operation | Every variable has a complement |
| Fractions and negative numbers | Used | Not used |
| Logarithms, trigonometry, etc. | Used | Not used |
| A + A | 2A | A |
| A · A | A² | A |

## De Morgan's Theorem {#de-morgan-s-theorem}

The English mathematician **Augustus De Morgan** (1806–1871), who was born in Madurai, India, gave two theorems that relate the complement of a sum to a product of complements, and the complement of a product to a sum of complements. They are very important for simplifying expressions and for designing circuits with NAND and NOR gates.

> **Note:** books number the two theorems differently. Here the first theorem is the one for the sum (NOR), and the second is the one for the product (NAND).

### De Morgan's First Theorem

**Statement:** the **complement of the sum** of two variables is equal to the **product of their complements**.

```text
 (A + B)′ = A′ · B′
```

**In terms of gates:** a **NOR gate** is equivalent to an **AND gate with inverted inputs** (a "bubbled AND").

![De Morgan's first theorem: a NOR gate equals an AND gate with inverted inputs](/diagrams/digital-logic/demorgan-nor-equals-and-of-complements.svg)

**Proof by truth table:**

| A | B | A + B | (A + B)′ | A′ | B′ | A′ · B′ |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 1 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 | 0 |

The columns (A + B)′ and A′ · B′ are the same in every row, so (A + B)′ = A′ · B′.

### De Morgan's Second Theorem

**Statement:** the **complement of the product** of two variables is equal to the **sum of their complements**.

```text
 (A · B)′ = A′ + B′
```

**In terms of gates:** a **NAND gate** is equivalent to an **OR gate with inverted inputs** (a "bubbled OR").

![De Morgan's second theorem: a NAND gate equals an OR gate with inverted inputs](/diagrams/digital-logic/demorgan-nand-equals-or-of-complements.svg)

**Proof by truth table:**

| A | B | A · B | (A · B)′ | A′ | B′ | A′ + B′ |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 0 | 0 | 0 |

The columns (A · B)′ and A′ + B′ are the same in every row, so (A · B)′ = A′ + B′.

### De Morgan's Theorems for Three Variables

```text
 1. (A + B + C)′ = A′ · B′ · C′
 2. (A · B · C)′ = A′ + B′ + C′
```

**Proof by truth table:**

| A | B | C | (A + B + C)′ | A′ · B′ · C′ | (A · B · C)′ | A′ + B′ + C′ |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 1 | 1 | 1 |
| 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 0 | 0 | 0 |

The first two result columns are equal, and the last two result columns are equal, in every row.

### De Morgan's Theorems for n Variables

```text
 1. (A₁ + A₂ + A₃ + … + Aₙ)′ = A₁′ · A₂′ · A₃′ · … · Aₙ′
 2. (A₁ · A₂ · A₃ · … · Aₙ)′ = A₁′ + A₂′ + A₃′ + … + Aₙ′
```

### How to Apply De Morgan's Theorem

To find the complement of an expression:

1. Change every **+** into **·**, and every **·** into **+**.
2. **Complement each variable** (A becomes A′, and A′ becomes A).
3. Keep the brackets so that the order of operations does not change.

**Example 1:** (A′ + B)′ = (A′)′ · B′ = **A · B′**

**Example 2:** (A · B + C)′ = (A · B)′ · C′ = **(A′ + B′) · C′**

**Example 3: simplify X = ((A + B)′ + C)′**

```text
 X = ((A + B)′)′ · C′        (De Morgan's first theorem)
   = (A + B) · C′            (double complement: (P′)′ = P)
```

### Importance of De Morgan's Theorem

1. It is used to find the **complement** of a Boolean expression.
2. It is used to **simplify** Boolean expressions.
3. It shows that a NOR gate is equivalent to an AND gate with inverted inputs, and a NAND gate to an OR gate with inverted inputs, so circuits can be built using only **NAND** or only **NOR** gates (see [Universal Gates](/topics/digital-logic/logic-gates#universal-gates)).

## References {#references}

**TutorialsPoint**

- [Digital Electronics – Boolean Algebra](https://www.tutorialspoint.com/digital-electronics/digital-electronics-boolean-algebra.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Boolean Algebra – Expression, Rules, Theorems, and Examples](https://www.geeksforgeeks.org/digital-logic/basics-of-boolean-algebra-in-digital-electronics/) — accessed 2026-11-01

**TpointTech**

- [De-Morgan's Theorem](https://www.tpointtech.com/de-morgans-theorem-of-boolean-algebra-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra) — Wikipedia, accessed 2026-11-01
- [George Boole](https://en.wikipedia.org/wiki/George_Boole) — Wikipedia, accessed 2026-11-01
- [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) — Wikipedia, accessed 2026-11-01
- [Augustus De Morgan](https://en.wikipedia.org/wiki/Augustus_De_Morgan) — Wikipedia, accessed 2026-11-01
