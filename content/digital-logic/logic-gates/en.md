---
description: Logic gates, the basic AND, OR and NOT gates, the NOR gate, the universal NAND and NOR gates, and the special XOR and XNOR gates, with truth tables, switch circuits and gate realizations.
updated: 2026-11-01
---

**Logic gate:** a logic gate is an **electronic circuit** that performs a **Boolean (logical) operation**.

It has **one or more inputs** and **only one output**, and every input and output is either **0 (low, false)** or **1 (high, true)**. Logic gates are the basic building blocks of all digital circuits; they are made with transistors, and a modern processor contains millions of them.

**Logic levels:** in standard TTL circuits, which use a **5 V** supply, an input between **0 V and 0.8 V** is read as **0 (low)**, and an input between **2 V and 5 V** is read as **1 (high)**.

**Truth table:** a table that shows the output of a gate (or circuit) for **every possible combination of inputs**.

With *n* inputs there are **2ⁿ** rows: 2 inputs give 2² = 4 rows, and 3 inputs give 2³ = 8 rows.

**Classification of logic gates:**

```text
                         Logic gates
                              │
              ┌───────────────┴────────────────┐
         Basic gates                    Compound gates
     ┌───────┼───────┐               ┌─────────┴──────────┐
    AND      OR     NOT        Universal gates       Special gates
                               ┌─────┴─────┐          ┌─────┴─────┐
                             NAND         NOR        XOR         XNOR
```

1. **Basic gates:** each performs one basic Boolean operation:
   1. **OR gate:** logical addition (+).
   2. **AND gate:** logical multiplication (·).
   3. **NOT gate:** logical complement (inversion).
2. **Compound gates:** made by combining two or more basic gates:
   1. **NAND gate:** AND gate + NOT gate.
   2. **NOR gate:** OR gate + NOT gate.
   3. **XOR (Exclusive-OR) gate:** made from AND, OR and NOT gates.
   4. **XNOR (Exclusive-NOR) gate:** XOR gate + NOT gate.

## Basic Gates: AND, OR, NOT {#basic-gates-and-or-not}

### AND Gate

**Definition:** the AND gate is the logic gate that performs the **logical multiplication** (AND operation) of Boolean algebra.

It has **two or more inputs** and **one output**. The output is **1 only when all the inputs are 1**; if **any input is 0**, the output is 0.

**Boolean expression:** X = A · B = AB (read "A AND B").

**Symbol:** a D-shaped symbol: a flat back on the input side and a round front on the output side.

![AND gate symbol](/diagrams/digital-logic/and-gate.svg)

![3-input AND gate symbol](/diagrams/digital-logic/and-gate-3-input.svg)

**Truth table (2 inputs):**

| A | B | X = A · B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Truth table (3 inputs), X = A · B · C:**

| A | B | C | X |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

**Switch circuit:** the AND gate works like **two switches connected in series** with a bulb. The bulb lights (X = 1) only when switch A **and** switch B are both ON (closed).

![Switch circuit of the AND gate: switches A and B in series with a bulb](/diagrams/digital-logic/and-switch-circuit.svg)

**Example of use:** a burglar alarm. One input is the alarm switch (1 = switched on at night) and the other is a door sensor (1 = door opened). Only when the alarm is switched on **and** the door is opened are both inputs 1, so the output becomes 1 and the alarm rings.

### OR Gate

**Definition:** the OR gate is the logic gate that performs the **logical addition** (OR operation) of Boolean algebra.

It has **two or more inputs** and **one output**. The output is **1 if any one (or more) of the inputs is 1**; the output is 0 only when **all the inputs are 0**.

**Boolean expression:** X = A + B (read "A OR B").

**Symbol:** a shape with a curved back on the input side and a pointed front on the output side.

![OR gate symbol](/diagrams/digital-logic/or-gate.svg)

![3-input OR gate symbol](/diagrams/digital-logic/or-gate-3-input.svg)

**Truth table (2 inputs):**

| A | B | X = A + B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Truth table (3 inputs), X = A + B + C:**

| A | B | C | X |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

**Switch circuit:** the OR gate works like **two switches connected in parallel**. The bulb lights (X = 1) when switch A **or** switch B (or both) is ON.

![Switch circuit of the OR gate: switches A and B in parallel](/diagrams/digital-logic/or-switch-circuit.svg)

**Example of use:** in a factory, if either the temperature **or** the pressure of a machine becomes too high, an OR gate (with the two sensor signals as inputs) gives output 1 and the machine is stopped automatically.

### NOT Gate

**Definition:** the NOT gate is the logic gate that performs the **complement (inversion)** operation of Boolean algebra.

It has **only one input** and **one output**, and the output is the **opposite of the input**: input 1 gives output 0, and input 0 gives output 1. Because it inverts its input, it is also called an **inverter**.

**Boolean expression:** X = Ā = A′ (read "NOT A" or "A bar").

**Symbol:** a triangle with a small circle (bubble) at the output. The bubble means inversion.

![NOT gate symbol](/diagrams/digital-logic/not-gate.svg)

**Truth table:**

| A | X = Ā |
| --- | --- |
| 0 | 1 |
| 1 | 0 |

**Switch circuit:** the switch is connected **in parallel with the bulb**. When the switch is OFF (A = 0), current flows through the bulb and it lights (X = 1); when the switch is ON (A = 1), the current bypasses the bulb and it goes off (X = 0).

![Switch circuit of the NOT gate: switch A in parallel with the bulb](/diagrams/digital-logic/not-switch-circuit.svg)

**Example of use:** an automatic water pump. A water-level sensor gives 1 when the tank is full. Through a NOT gate, this becomes 0 and switches the pump **off**; when the tank is not full, the sensor gives 0, the NOT gate gives 1, and the pump runs.

### Differences Between AND, OR and NOT Gates

| Basis | AND gate | OR gate | NOT gate |
| --- | --- | --- | --- |
| Operation | Logical multiplication | Logical addition | Complement (inversion) |
| Expression | X = A · B | X = A + B | X = Ā |
| Number of inputs | Two or more | Two or more | Only one |
| Output is 1 when | All inputs are 1 | Any input is 1 | Input is 0 |
| Output is 0 when | Any input is 0 | All inputs are 0 | Input is 1 |
| Switch circuit | Switches in series | Switches in parallel | Switch in parallel with the bulb |

## NOR Gate {#nor-gate}

**Definition:** the NOR (NOT-OR) gate is an **OR gate followed by a NOT gate**: the output of the OR gate is inverted.

Its output is the **opposite of the OR gate**. The output is **1 only when all the inputs are 0**; if **any input is 1**, the output is 0.

**Boolean expression:** X = (A + B)′, written as A + B with a bar over the whole expression (read "A NOR B").

**Construction:** OR gate + NOT gate = NOR gate.

![OR gate followed by a NOT gate gives a NOR gate](/diagrams/digital-logic/nor-from-or-not.svg)

**Symbol:** the OR symbol with a bubble at the output.

![NOR gate symbol](/diagrams/digital-logic/nor-gate.svg)

**Truth table (2 inputs):**

| A | B | A + B | X = (A + B)′ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 |

**Truth table (3 inputs), X = (A + B + C)′:**

| A | B | C | A + B + C | X |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 |

**Switch circuit:** two switches are connected **in parallel with each other, and together in parallel with the bulb**. The bulb lights only when **both** switches are OFF (A = 0, B = 0). If either switch is ON, the current bypasses the bulb and it goes off.

![Switch circuit of the NOR gate](/diagrams/digital-logic/nor-switch-circuit.svg)

**Characteristics:**

1. It is a **compound gate** (OR + NOT).
2. Its output is 1 only when all inputs are 0.
3. It is a **universal gate**: AND, OR and NOT gates can all be built using only NOR gates (see [Universal Gates](#universal-gates)).

**Example of use:** in an automatic washing machine, three sensors check the water level, the weight of the clothes and the door. Each sensor gives 0 when everything is normal. The three sensor outputs go to a NOR gate: when all are 0 the output is 1 and the machine runs; if any sensor gives 1 (an error), the output becomes 0 and the machine stops.

## Universal Gates {#universal-gates}

**Definition:** a **universal gate** is a gate with which **all the basic gates (AND, OR and NOT)**, and therefore any logic circuit, can be built.

The **NAND gate** and the **NOR gate** are the two universal gates.

Any Boolean expression can be written using only NAND operations (or only NOR operations), so **any logic circuit can be built using only NAND gates, or only NOR gates**.

### NAND Gate

**Definition:** the NAND (NOT-AND) gate is an **AND gate followed by a NOT gate**: the output of the AND gate is inverted.

Its output is the **opposite of the AND gate**. The output is **0 only when all the inputs are 1**; if **any input is 0**, the output is 1.

**Boolean expression:** X = (A · B)′, written as AB with a bar over the whole expression (read "A NAND B").

**Construction:** AND gate + NOT gate = NAND gate. (Note: NOT gate + AND gate, i.e. inverting the inputs first, does **not** give a NAND gate.)

![AND gate followed by a NOT gate gives a NAND gate](/diagrams/digital-logic/nand-from-and-not.svg)

**Symbol:** the AND symbol with a bubble at the output.

![NAND gate symbol](/diagrams/digital-logic/nand-gate.svg)

**Truth table (2 inputs):**

| A | B | A · B | X = (A · B)′ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**Truth table (3 inputs), X = (A · B · C)′:**

| A | B | C | A · B · C | X |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 |

**Switch circuit:** two switches are connected **in series with each other, and together in parallel with the bulb**. The bulb goes off only when **both** switches are ON (A = 1, B = 1).

![Switch circuit of the NAND gate](/diagrams/digital-logic/nand-switch-circuit.svg)

**Example of use:** in a warehouse, three exhaust fans each give 1 while they are working. Their outputs go to a NAND gate: while all three work, the output is 0; if any fan stops (gives 0), the output becomes 1 and an alarm rings.

### Realization of the Basic Gates Using NAND Gates

**1. NOT gate from NAND (1 NAND gate):** connect both inputs together. Since A · A = A, the output is (A · A)′ = A′.

![NOT gate made from one NAND gate](/diagrams/digital-logic/not-from-nand.svg)

**2. AND gate from NAND (2 NAND gates):** a NAND gate followed by a NAND gate used as NOT.

![AND gate made from two NAND gates](/diagrams/digital-logic/and-from-nand.svg)

**3. OR gate from NAND (3 NAND gates):** invert each input with a NAND gate (used as NOT), then feed both into a third NAND gate. By De Morgan's theorem, (A′ · B′)′ = A + B.

![OR gate made from three NAND gates](/diagrams/digital-logic/or-from-nand.svg)

**4. NOR gate from NAND (4 NAND gates):** build OR (3 NAND gates) and invert its output with a fourth NAND gate.

Since the NOT, AND and OR gates can all be made using only NAND gates, the **NAND gate is a universal gate**.

### Realization of the Basic Gates Using NOR Gates

**1. NOT gate from NOR (1 NOR gate):** connect both inputs together. Since A + A = A, the output is (A + A)′ = A′.

![NOT gate made from one NOR gate](/diagrams/digital-logic/not-from-nor.svg)

**2. OR gate from NOR (2 NOR gates):** a NOR gate followed by a NOR gate used as NOT.

![OR gate made from two NOR gates](/diagrams/digital-logic/or-from-nor.svg)

**3. AND gate from NOR (3 NOR gates):** invert each input with a NOR gate (used as NOT), then feed both into a third NOR gate. By De Morgan's theorem, (A′ + B′)′ = A · B.

![AND gate made from three NOR gates](/diagrams/digital-logic/and-from-nor.svg)

**4. NAND gate from NOR (4 NOR gates):** build AND (3 NOR gates) and invert its output with a fourth NOR gate.

Since the NOT, OR and AND gates can all be made using only NOR gates, the **NOR gate is a universal gate**. (The Apollo Guidance Computer, used in the Moon landings, was built entirely from NOR gates.)

### Number of Gates Needed

| Gate to be made | Number of NAND gates | Number of NOR gates |
| --- | --- | --- |
| NOT | 1 | 1 |
| AND | 2 | 3 |
| OR | 3 | 2 |
| NOR | 4 | — |
| NAND | — | 4 |

### Differences Between NAND and NOR Gates

| Basis | NAND gate | NOR gate |
| --- | --- | --- |
| Made from | AND gate + NOT gate | OR gate + NOT gate |
| Expression | X = (A · B)′ | X = (A + B)′ |
| Output is 0 when | All inputs are 1 | Any input is 1 |
| Output is 1 when | Any input is 0 | All inputs are 0 |
| Universal gate? | Yes | Yes |

## Special Gates: XOR, XNOR {#special-gates-xor-xnor}

The XOR and XNOR gates are called **special gates**. They are compound gates made from the basic gates, but they are used so often that they are treated as separate gates.

### XOR Gate (Exclusive-OR)

**Definition:** the XOR (Exclusive-OR) gate is a logic gate whose output is **1 when its two inputs are different**, and **0 when they are the same**.

With more than two inputs, the output is **1 when an odd number of inputs are 1**.

**Boolean expression:** X = A ⊕ B = A′B + AB′ (read "A XOR B"; ⊕ is the XOR operator).

**Symbol:** the OR symbol with an extra curved line on the input side.

![XOR gate symbol](/diagrams/digital-logic/xor-gate.svg)

**Truth table (2 inputs):**

| A | B | X = A ⊕ B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Truth table (3 inputs), X = A ⊕ B ⊕ C** (output 1 when the number of 1s is odd):

![3-input XOR gate symbol](/diagrams/digital-logic/xor-gate-3-input.svg)

| A | B | C | X |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

**Realization with basic gates:** from X = A′B + AB′, an XOR gate is made with two NOT gates, two AND gates and one OR gate.

![XOR gate made from NOT, AND and OR gates](/diagrams/digital-logic/xor-from-basic-gates.svg)

**Uses of the XOR gate:**

1. In **adders**: the sum bit of a half adder and a full adder is produced by XOR gates (see [Half Adder and Full Adder](/topics/digital-logic/combinational-circuits#half-adder-and-full-adder)).
2. In **parity generators and checkers**: the XOR of a group of bits is 1 when the number of 1s is odd, so XOR gates generate and check even and odd parity bits (see [Parity Generator](/topics/number-systems/parity#parity-generator)).
3. In **comparators**: the output is 0 when two bits are equal and 1 when they are different.
4. As a **controlled inverter**: if one input is 0, the output equals the other input; if it is 1, the output is the inverted other input.

### XNOR Gate (Exclusive-NOR)

**Definition:** the XNOR (Exclusive-NOR) gate is an **XOR gate followed by a NOT gate**.

Its output is the opposite of XOR: it is **1 when its two inputs are the same** (both 0 or both 1), and **0 when they are different**. Because it gives 1 for equal inputs, it is also called the **equivalence gate**.

**Boolean expression:** X = (A ⊕ B)′ = A ⊙ B = A′B′ + AB.

**Construction:** XOR gate + NOT gate = XNOR gate.

![XOR gate followed by a NOT gate gives an XNOR gate](/diagrams/digital-logic/xnor-from-xor-not.svg)

**Symbol:** the XOR symbol with a bubble at the output.

![XNOR gate symbol](/diagrams/digital-logic/xnor-gate.svg)

**Truth table (2 inputs):**

| A | B | A ⊕ B | X = (A ⊕ B)′ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

**Truth table (3 inputs), X = (A ⊕ B ⊕ C)′** (output 1 when the number of 1s is even):

| A | B | C | X |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**Uses of the XNOR gate:**

1. In **comparators**: its output is 1 when two bits are equal.
2. In **parity checkers** (even parity).

> **Remember:** when **all the inputs are 0**, the output of the **NAND, NOR and XNOR** gates is **1**.

### Differences Between XOR and XNOR Gates

| Basis | XOR gate | XNOR gate |
| --- | --- | --- |
| Full form | Exclusive-OR | Exclusive-NOR |
| Expression | X = A ⊕ B = A′B + AB′ | X = (A ⊕ B)′ = A′B′ + AB |
| Output is 1 when (2 inputs) | The inputs are different | The inputs are the same |
| Output for 3 or more inputs | 1 when the number of 1s is odd | 1 when the number of 1s is even |
| Made from | AND, OR and NOT gates | XOR gate + NOT gate |
| Main use | Adders, parity generators | Comparators (equality check) |

## References {#references}

**TutorialsPoint**

- [Basic Logic Gates: Definition, Types, Boolean Function and Truth Table](https://www.tutorialspoint.com/article/basic-logic-gates-definition-types-boolean-function-and-truth-table) — accessed 2026-11-01

**GeeksforGeeks**

- [NOR Gate – Truth Table, Logic Diagram, Implementation](https://www.geeksforgeeks.org/digital-logic/nor-gate/) — accessed 2026-11-01

**TpointTech**

- [NAND Gate in Digital Electronics](https://www.tpointtech.com/nand-gate-in-digital-electronics) — accessed 2026-11-01
- [XOR Gate in Digital Electronics](https://www.tpointtech.com/xor-gate-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- [Logic gate](https://en.wikipedia.org/wiki/Logic_gate) — Wikipedia, accessed 2026-11-01
- [XOR gate](https://en.wikipedia.org/wiki/XOR_gate) — Wikipedia, accessed 2026-11-01
- [NAND logic](https://en.wikipedia.org/wiki/NAND_logic) — Wikipedia, accessed 2026-11-01
- [NOR logic](https://en.wikipedia.org/wiki/NOR_logic) — Wikipedia, accessed 2026-11-01
- [Transistor–transistor logic](https://en.wikipedia.org/wiki/Transistor%E2%80%93transistor_logic) — Wikipedia, accessed 2026-11-01
