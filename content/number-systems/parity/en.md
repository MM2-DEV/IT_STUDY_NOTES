---
description: The parity bit, even and odd parity, and the even and odd parity generator circuits with truth tables and Boolean expressions.
updated: 2026-11-01
---

## Parity Bit {#parity-bit}

**Definition:** A **parity bit** (also called a **check bit**) is an **extra bit (0 or 1)** added to a group of binary data bits so that the **total number of 1s** becomes either even or odd. It is one of the simplest methods of **error detection** in digital systems and data communication.

There are two types of parity:

1. **Even parity:** the parity bit is chosen so that the total number of 1s (data bits + parity bit) is **even**.
2. **Odd parity:** the parity bit is chosen so that the total number of 1s (data bits + parity bit) is **odd**.

**Rule:**

| Number of 1s in the data | Even parity bit | Odd parity bit |
| --- | --- | --- |
| Even | 0 | 1 |
| Odd | 1 | 0 |

**Examples** (the parity bit is written at the right):

| Data | Number of 1s | With even parity | With odd parity |
| --- | --- | --- | --- |
| 0101 | 2 | 0101**0** | 0101**1** |
| 1101 | 3 | 1101**1** | 1101**0** |
| 1100111 | 5 | 1100111**1** | 1100111**0** |

**How parity is used to detect errors:**

1. The **sender** counts the 1s in the data and adds the parity bit (this is done by a *parity generator*).
2. The data and the parity bit are transmitted together.
3. The **receiver** counts the 1s again (this is done by a *parity checker*). If the count does not match the agreed parity (even or odd), the data has an error, and the receiver can ask for it to be sent again.

**Example:** with even parity, 1100111 is sent as 11001111 (six 1s). If one bit changes during transmission, for example to 11000111 (five 1s), the receiver finds an odd number of 1s and detects the error.

**Advantages:**

1. Simple and cheap: it needs only one extra bit and simple circuits.
2. Detects **all single-bit errors**.
3. Detects any error in which an **odd number** of bits are changed.

**Disadvantages (limitations):**

1. It **cannot detect** an error if an **even number** of bits are changed (for example, two bits), because the number of 1s stays even (or odd).
2. It can only **detect** errors; it **cannot correct** them or find which bit is wrong.
3. It adds an extra bit to every data unit.

## Parity Generator {#parity-generator}

**Definition:** A **parity generator** is a **combinational logic circuit** that generates the parity bit for a given binary data at the **transmitter** (sending end). The circuit that checks the parity at the **receiver** is called a **parity checker**.

Parity generators are built with **XOR (Exclusive-OR) gates**, because the XOR of a group of bits is 1 when the number of 1s is odd, and 0 when it is even.

### Even Parity Generator (3-bit)

For the three data bits A, B and C, the even parity bit P makes the total number of 1s even.

**Truth table:**

| A | B | C | Number of 1s | P (even parity) |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 1 | 2 | 0 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 2 | 0 |
| 1 | 1 | 0 | 2 | 0 |
| 1 | 1 | 1 | 3 | 1 |

**Boolean expression:**

```text
 P = A ⊕ B ⊕ C
```

**Circuit:** two XOR gates.

```text
 A ──┐
     XOR ──┐
 B ──┘     XOR ──── P (even parity bit)
 C ────────┘
```

### Odd Parity Generator (3-bit)

For the three data bits A, B and C, the odd parity bit P makes the total number of 1s odd. P is the **complement** of the even parity bit.

**Truth table:**

| A | B | C | Number of 1s | P (odd parity) |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 2 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 2 | 1 |
| 1 | 1 | 0 | 2 | 1 |
| 1 | 1 | 1 | 3 | 0 |

**Boolean expression:**

```text
 P = (A ⊕ B ⊕ C)'      (the complement of A ⊕ B ⊕ C)
   = (A ⊕ B) ⊙ C       (⊙ means XNOR)
```

**Circuit:** an XOR gate followed by an XNOR gate (or two XOR gates followed by a NOT gate).

```text
 A ──┐
     XOR ──┐
 B ──┘     XNOR ─── P (odd parity bit)
 C ────────┘
```

### Parity Generator for 4 Bits

For four data bits A, B, C and D, the same idea gives:

1. **Even parity bit:** P = A ⊕ B ⊕ C ⊕ D (three XOR gates).
2. **Odd parity bit:** P = (A ⊕ B ⊕ C ⊕ D)' (three XOR gates followed by a NOT gate).

### Parity Checker

At the receiver, the parity checker XORs all the received bits, including the parity bit. For 3 data bits with even parity:

```text
 Check = A ⊕ B ⊕ C ⊕ P
```

1. **Check = 0:** the number of 1s is even, so **no error** is detected.
2. **Check = 1:** the number of 1s is odd, so an **error** is detected.

## References {#references}

**TutorialsPoint**

- [Parity Bit Generator and Checker](https://www.tutorialspoint.com/digital-electronics/parity-bit-generator-and-checker.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Vertical Redundancy Check (VRC) or Parity Check](https://www.geeksforgeeks.org/vertical-redundancy-check-vrc-or-parity-check/) — accessed 2026-11-01

**Additional sources**

- [Parity bit](https://en.wikipedia.org/wiki/Parity_bit) — Wikipedia, accessed 2026-11-01
