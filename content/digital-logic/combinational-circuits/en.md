---
description: Combinational circuits, their design from logic gates, half and full adders, the parallel adder, multiplexers and demultiplexers, encoders and decoders, the seven-segment decoder and display, and the magnitude comparator.
updated: 2026-11-01
---

**Combinational circuit:** a combinational circuit is a digital logic circuit, built from logic gates, whose **output at any moment depends only on the inputs present at that moment**. It has **no memory element** and **no feedback path** from output to input, so past inputs have no effect on the present output. (Circuits whose output also depends on past inputs, because they contain memory elements such as flip-flops, are called *sequential circuits*; see [Flip-Flops](/topics/digital-logic/flip-flops).)

**Block diagram:** a combinational circuit has **n input variables**, a network of **logic gates**, and **m output variables**. For every combination of the n inputs, each output has one fixed value, so the circuit can be described completely by a **truth table** with 2ⁿ rows or by one **Boolean expression** for each output.

![Block diagram of a combinational circuit: n inputs, a combinational logic circuit and m outputs](/diagrams/digital-logic/combinational-circuit-block.svg)

**Characteristics:**

1. The output depends **only on the present inputs**.
2. It contains **no memory** (no flip-flops), so it cannot store any previous state.
3. It has **no feedback** from output to input.
4. It is built only from **logic gates** (AND, OR, NOT, NAND, NOR, XOR, XNOR).
5. It **responds immediately** to a change of input (apart from the small propagation delay of the gates).
6. It is described completely by a truth table or by Boolean expressions.

**Common combinational circuits** (grouped by function):

1. **Arithmetic and comparison circuits:**
   1. Half adder and full adder
   2. Parallel adder
   3. Comparator
2. **Data-routing circuits:**
   1. Multiplexer
   2. Demultiplexer
3. **Code-converting circuits:**
   1. Encoder
   2. Decoder
   3. BCD to seven-segment decoder

## Circuit Design Using Logic Gates {#circuit-design-using-logic-gates}

**Design** of a combinational circuit means starting from a statement of the problem (what the circuit must do) and ending with a **logic diagram** (the gates and their connections) that does it.

### Design Procedure

1. **State the problem** clearly.
2. **Determine the number of inputs and outputs** needed.
3. **Assign a letter symbol** to every input and output variable.
4. **Write the truth table** that gives the value of every output for every combination of inputs.
5. **Obtain the simplified Boolean expression** for each output, using Boolean algebra or a Karnaugh map (see [Logic Simplification](/topics/digital-logic/logic-simplification#karnaugh-map)).
6. **Draw the logic diagram** from the simplified expressions.

### Worked Example: A Majority (Voting) Circuit

**Problem:** design a circuit with three inputs A, B and C whose output F is 1 when **two or more** inputs are 1 (for example, a three-member committee where a motion passes with a majority vote).

**Steps 2 and 3:** three inputs (A, B, C) and one output (F).

**Step 4: truth table**

| A | B | C | Number of 1s | F |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 2 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 2 | 1 |
| 1 | 1 | 0 | 2 | 1 |
| 1 | 1 | 1 | 3 | 1 |

**Step 5: simplification.** F = Σm(3, 5, 6, 7) = A′BC + AB′C + ABC′ + ABC. On a 3-variable K-map, the 1s form three pairs: m6 and m7 give **AB**, m3 and m7 give **BC**, and m5 and m7 give **AC** (the same map is drawn for the full adder carry [below](#half-adder-and-full-adder)). So:

```text
 F = AB + BC + CA
```

**Step 6: logic diagram:** three 2-input AND gates and one 3-input OR gate.

![Majority circuit: three AND gates feeding a 3-input OR gate, F = AB + BC + CA](/diagrams/digital-logic/majority-circuit.svg)

Without simplification, the expression A′BC + AB′C + ABC′ + ABC would need three NOT gates, four 3-input AND gates and a 4-input OR gate. The simplified circuit needs only four gates.

### Analysis: From a Given Circuit to Its Truth Table

**Analysis** is the reverse of design: a logic diagram is given and its function must be found.

1. Label the output of every gate.
2. Write the Boolean expression of each gate output, working from the inputs towards the output.
3. Combine them to get the expression of the final output, and simplify it if possible.
4. Fill in the truth table by putting every input combination into the expression.

**Example:** a circuit has an OR gate with inputs A and B, a NOT gate with input C, and an AND gate that combines the two. The OR gate gives A + B, the NOT gate gives C′, and the output is **F = (A + B) · C′**. F is 1 when C = 0 and at least one of A and B is 1:

| A | B | C | A + B | C′ | F = (A + B)C′ |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 |

## Half Adder and Full Adder {#half-adder-and-full-adder}

An **adder** is a combinational circuit that adds binary numbers. It follows the rules of binary addition (see [Binary Addition](/topics/number-systems/binary-arithmetic#binary-addition)):

| Addition | Sum | Carry |
| --- | --- | --- |
| 0 + 0 | 0 | 0 |
| 0 + 1 | 1 | 0 |
| 1 + 0 | 1 | 0 |
| 1 + 1 | 0 | 1 |

**How a computer adds:** when 5 and 6 are typed on the keyboard, an **encoder** converts them into binary (0101 and 0110), the **adder** circuit inside the processor adds them to get 1011, and a **decoder** converts the result back so that the monitor shows **11**. All the arithmetic of a computer is finally done by binary addition, so the adder is one of its most important circuits.

### Types of Adders

Adders are of two types:

1. **Half adder**
2. **Full adder**

#### 1. Half Adder

**Definition:** a half adder is a combinational circuit that **adds two binary digits (bits)**. It has **two inputs** (A and B) and **two outputs**: the **Sum (S)** and the **Carry (C)**.

**Truth table:**

| A | B | Sum (S) | Carry (C) |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

**Boolean expressions** (read from the truth table):

```text
 S = A′B + AB′ = A ⊕ B      (S is 1 when the inputs are different: XOR)
 C = A · B                  (C is 1 only when both inputs are 1: AND)
```

**Logic circuit:** one **XOR gate** (for the sum) and one **AND gate** (for the carry).

![Half adder: an XOR gate gives the sum and an AND gate gives the carry](/diagrams/digital-logic/half-adder.svg)

**Using basic gates only:** since S = A′B + AB′, the sum can also be made from two NOT gates, two AND gates and one OR gate (instead of one XOR gate); the carry is still one AND gate. (An XOR gate alone gives the sum of two bits but not the carry.)

**Using only NAND gates:** a half adder can be built with a minimum of **5 NAND gates**.

**Limitation:** a half adder **cannot add a carry coming from a previous (lower) bit position**, because it has only two inputs. So it can add only the least significant bits of two numbers. This limitation is removed by the full adder.

#### 2. Full Adder

**Definition:** a full adder is a combinational circuit that **adds three bits**: the two bits A and B, and the **carry input (Cin)** from the previous lower bit position. It has **three inputs** (A, B, Cin) and **two outputs**: **Sum (S)** and **Carry out (Cout)**.

**Truth table:**

| A | B | Cin | Sum (S) | Carry (Cout) |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

S is 1 when an **odd number** of inputs are 1; Cout is 1 when **two or more** inputs are 1.

**Sum expression:** from the rows where S = 1 (minterms 1, 2, 4, 7):

```text
 S = A′B′Cin + A′BCin′ + AB′Cin′ + ABCin
   = A′(B′Cin + BCin′) + A(B′Cin′ + BCin)
   = A′(B ⊕ Cin) + A(B ⊕ Cin)′
   = A ⊕ B ⊕ Cin
```

**Carry expression:** from the rows where Cout = 1 (minterms 3, 5, 6, 7), simplified on a K-map:

![K-map for the carry of a full adder: Cout = AB + BC + AC](/diagrams/digital-logic/kmap-full-adder-carry.svg)

```text
 Cout = AB + BCin + ACin
```

The same carry can also be written as **Cout = AB + Cin(A ⊕ B)**, which is the form obtained when a full adder is built from two half adders (both forms are equal).

**Logic circuit:** with the expressions S = A ⊕ B ⊕ Cin and Cout = AB + (A ⊕ B)Cin, a full adder needs **two XOR gates, two AND gates and one OR gate**.

![Full adder circuit with two XOR gates, two AND gates and one OR gate](/diagrams/digital-logic/full-adder-circuit.svg)

### Full Adder Using Two Half Adders

A full adder can be made from **two half adders and one OR gate**:

1. **Half adder 1** adds A and B. It gives S1 = A ⊕ B and C1 = AB.
2. **Half adder 2** adds S1 and Cin. It gives the final sum S = S1 ⊕ Cin = A ⊕ B ⊕ Cin, and a carry C2 = (A ⊕ B)Cin.
3. **The OR gate** combines the two carries: Cout = C1 + C2 = AB + (A ⊕ B)Cin.

![Full adder made from two half adders and one OR gate](/diagrams/digital-logic/full-adder-from-half-adders.svg)

**Using only NAND gates:** a full adder can be built with **9 NAND gates** (or 9 NOR gates). Because NAND and NOR are [universal gates](/topics/digital-logic/logic-gates#universal-gates), the sum-of-products expressions can be rewritten with De Morgan's theorem for NAND-only or NOR-only circuits:

```text
 NAND form:  S    = ( (A′B′Cin)′ · (A′BCin′)′ · (AB′Cin′)′ · (ABCin)′ )′
             Cout = ( (AB)′ · (BCin)′ · (ACin)′ )′

 NOR form:   Cout = (A + B)(B + Cin)(A + Cin) = ( (A + B)′ + (B + Cin)′ + (A + Cin)′ )′
```

### Differences Between Half Adder and Full Adder

| Basis | Half adder | Full adder |
| --- | --- | --- |
| Bits added | Two bits (A, B) | Three bits (A, B, Cin) |
| Inputs | 2 | 3 |
| Outputs | 2 (Sum, Carry) | 2 (Sum, Carry out) |
| Carry from previous stage | Cannot be added | Can be added |
| Sum | S = A ⊕ B | S = A ⊕ B ⊕ Cin |
| Carry | C = AB | Cout = AB + BCin + ACin |
| Gates | 1 XOR + 1 AND | 2 XOR + 2 AND + 1 OR |
| Construction | Basic circuit | Two half adders + one OR gate |
| Use in a multi-bit adder | Only for the least significant bit | For every bit position |
| Can replace the other | A half adder **cannot** be used in place of a full adder | A full adder **can** be used in place of a half adder (with Cin = 0) |
| Design complexity | Simple | More complex |
| Typical uses | Calculators, simple digital circuits | Multi-bit (parallel) adders, ALUs of processors |

**Applications of adders:**

1. The **Arithmetic Logic Unit (ALU)** of a processor
2. Building **parallel (multi-bit) adders**
3. Calculators
4. Calculating memory addresses and table indices
5. Binary multiplication (by repeated addition of partial products)

## Parallel Adder {#parallel-adder}

**Definition:** a parallel adder is a combinational circuit that **adds two n-bit binary numbers**, with **all the bits applied at the same time** (in parallel), and gives the n-bit sum together with a final carry. An **n-bit parallel adder is built from n full adders** connected in cascade.

### Construction

1. Each full adder (FA) adds one pair of bits: FA0 adds A0 and B0 (the least significant bits), FA1 adds A1 and B1, and so on.
2. The **carry output of each full adder is connected to the carry input of the next higher full adder**.
3. The carry input of the first stage (C0) is normally 0 (connected to ground). Because the least significant bits never have a carry in, the first stage can be a **half adder**: an **n-bit parallel adder needs (n − 1) full adders and 1 half adder** (or n full adders with C0 = 0). For example, a 4-bit parallel adder needs **3 full adders and 1 half adder**.
4. The outputs S0, S1, … give the sum, and the carry out of the last stage (C4 in a 4-bit adder) is the final carry.

Because the carry passes ("ripples") from one stage to the next, this circuit is also called a **ripple-carry adder**.

![4-bit parallel adder made of four full adders FA0 to FA3, with the carry rippling from FA0 to FA3](/diagrams/digital-logic/parallel-adder-4bit.svg)

### Worked Example: 1101 + 0111

A = 1101 (13) and B = 0111 (7), with C0 = 0.

| Stage | Ai | Bi | Carry in | Sum Si | Carry out |
| --- | --- | --- | --- | --- | --- |
| FA0 | 1 | 1 | C0 = 0 | 0 | C1 = 1 |
| FA1 | 0 | 1 | C1 = 1 | 0 | C2 = 1 |
| FA2 | 1 | 1 | C2 = 1 | 1 | C3 = 1 |
| FA3 | 1 | 0 | C3 = 1 | 0 | C4 = 1 |

Result: C4 S3 S2 S1 S0 = **10100** = 20 (check: 13 + 7 = 20).

### Propagation Delay

All the bits are applied together, but FA1 cannot produce its final output until the carry C1 arrives from FA0, FA2 must wait for C2, and so on. In the worst case the carry must ripple through **every stage**, so the **delay grows in proportion to the number of bits**. This carry propagation delay is the main drawback of the ripple-carry adder.

The **carry look-ahead adder** removes most of this delay by calculating the carries of all the stages at the same time from the inputs, instead of waiting for them to ripple. (The 74LS283 4-bit binary full adder IC, for example, uses internal look-ahead carry.)

### Advantages and Disadvantages

**Advantages:**

1. All the bits are added **at the same time**, so addition is **fast**.
2. It is simple to build: identical full adders are just connected in a chain.

**Disadvantages:**

1. **Carry propagation delay:** each stage must wait for the carry from the previous stage, and the delay grows with the number of bits.
2. It needs **n full adders** for n bits, so the hardware grows with the word length.

### Differences Between Serial Adder and Parallel Adder

A **serial adder** adds two numbers **one bit at a time**. The numbers are kept in shift registers; a **single full adder** adds one pair of bits on each clock pulse, and a **D flip-flop** stores the carry for the next pair.

| Basis | Serial adder | Parallel adder |
| --- | --- | --- |
| Bits added at a time | One pair per clock pulse | All the bits at once |
| Full adders needed | Only one | n (one per bit) |
| Registers used | Shift registers | Registers with parallel loading |
| Carry | Stored in a carry flip-flop and used on the next clock pulse | Passed directly to the next full adder (ripple carry) |
| Type of circuit | Sequential (needs memory and a clock) | Combinational |
| Speed | Slow (n clock pulses for n bits) | Fast |
| Addition time | Grows with the number of bits (one bit per clock pulse) | All bits are added at once (only the carry ripples) |
| Hardware | Less | More |

## Multiplexer and Demultiplexer {#multiplexer-and-demultiplexer}

### Multiplexer (MUX)

**Definition:** a multiplexer is a combinational circuit that **selects one of several data inputs and sends it to a single output**. Which input is selected is decided by the **select lines** (control inputs). Because it selects data, a multiplexer is also called a **data selector**. It works on the **many-to-one** principle, like a digitally controlled multi-position switch.

**Relation between inputs and select lines:** a multiplexer with **2ⁿ data inputs** has **n select lines** and **one output**. In other words, N inputs need **log₂N** select lines.

| Multiplexer | Data inputs | Select lines | Output |
| --- | --- | --- | --- |
| 2 × 1 | 2 | 1 | 1 |
| 4 × 1 | 4 | 2 | 1 |
| 8 × 1 | 8 | 3 | 1 |
| 16 × 1 | 16 | 4 | 1 |
| 32 × 1 | 32 | 5 | 1 |

#### 2 × 1 Multiplexer

Inputs I0 and I1, one select line S, output Y.

| S | Y |
| --- | --- |
| 0 | I0 |
| 1 | I1 |

```text
 Y = S′I0 + SI1
```

![2×1 multiplexer made of a NOT gate, two AND gates and an OR gate](/diagrams/digital-logic/mux-2to1.svg)

#### 4 × 1 Multiplexer

Inputs I0 to I3, two select lines S1 and S0, output Y.

| S1 | S0 | Y |
| --- | --- | --- |
| 0 | 0 | I0 |
| 0 | 1 | I1 |
| 1 | 0 | I2 |
| 1 | 1 | I3 |

```text
 Y = S1′S0′I0 + S1′S0I1 + S1S0′I2 + S1S0I3
```

**Circuit:** two NOT gates (to make S1′ and S0′), four 3-input AND gates (one for each data input) and one 4-input OR gate. Each AND gate is enabled by one combination of the select lines; only that AND gate passes its data input to the OR gate.

![4×1 multiplexer made of two NOT gates, four 3-input AND gates and a 4-input OR gate](/diagrams/digital-logic/mux-4to1.svg)

#### 8 × 1 Multiplexer

Inputs I0 to I7, three select lines S2, S1 and S0, output Y.

| S2 | S1 | S0 | Y |
| --- | --- | --- | --- |
| 0 | 0 | 0 | I0 |
| 0 | 0 | 1 | I1 |
| 0 | 1 | 0 | I2 |
| 0 | 1 | 1 | I3 |
| 1 | 0 | 0 | I4 |
| 1 | 0 | 1 | I5 |
| 1 | 1 | 0 | I6 |
| 1 | 1 | 1 | I7 |

```text
 Y = S2′S1′S0′I0 + S2′S1′S0I1 + S2′S1S0′I2 + S2′S1S0I3
   + S2S1′S0′I4 + S2S1′S0I5 + S2S1S0′I6 + S2S1S0I7
```

The circuit has three NOT gates, eight 4-input AND gates and one 8-input OR gate.

#### Building a Larger Multiplexer from Smaller Ones

1. **8 × 1 from two 4 × 1 and one 2 × 1:** both 4 × 1 MUXes share the select lines S1 and S0; the upper one takes I0 to I3 and the lower one I4 to I7. Their outputs go to a 2 × 1 MUX whose select line is S2: S2 = 0 passes one of I0 to I3, and S2 = 1 passes one of I4 to I7.
2. **16 × 1 from two 8 × 1 and one 2 × 1:** the two 8 × 1 MUXes share S2, S1 and S0, and the 2 × 1 MUX uses S3.

![8×1 multiplexer made from two 4×1 multiplexers and one 2×1 multiplexer](/diagrams/digital-logic/mux-8to1-from-4to1.svg)

#### Implementing a Boolean Function with a Multiplexer

A multiplexer can produce **any** Boolean function, without other gates (or with only one NOT gate):

1. **With n select lines for an n-variable function:** connect the variables to the select lines and connect each data input Ik to **0 or 1**, the value of the function for minterm k.
2. **With n − 1 select lines for an n-variable function** (a 2ⁿ⁻¹ × 1 MUX), which uses a smaller multiplexer:
   1. Write the function as a sum of minterms.
   2. Connect n − 1 variables (usually the most significant ones) to the select lines.
   3. For each combination of the select lines, see how F depends on the remaining variable (say C), and connect the data input to **0**, **1**, **C** or **C′**:

| F for C = 0 | F for C = 1 | Connect the data input to |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | 1 | 1 |
| 0 | 1 | C |
| 1 | 0 | C′ |

**Example:** implement F(A, B, C) = Σm(1, 3, 5, 6) with a 4 × 1 MUX, using A and B as the select lines (S1 = A, S0 = B).

| A B (select) | Minterms | F for C = 0 | F for C = 1 | Data input |
| --- | --- | --- | --- | --- |
| 0 0 | m0, m1 | 0 | 1 | I0 = C |
| 0 1 | m2, m3 | 0 | 1 | I1 = C |
| 1 0 | m4, m5 | 0 | 1 | I2 = C |
| 1 1 | m6, m7 | 1 | 0 | I3 = C′ |

![F(A, B, C) = Σm(1, 3, 5, 6) using a 4×1 MUX: I0, I1 and I2 are connected to C and I3 to C′](/diagrams/digital-logic/mux-function-example.svg)

**Example: a 3-input XOR (X = A ⊕ B ⊕ C) using 2 × 1 MUXes:**

1. **First MUX (A ⊕ B):** select line A, I0 = B, I1 = B′. The output is A′B + AB′ = A ⊕ B.
2. **Second MUX:** select line C, I0 = (A ⊕ B), I1 = (A ⊕ B)′ (through a NOT gate). The output is C′(A ⊕ B) + C(A ⊕ B)′ = A ⊕ B ⊕ C.

**Applications of the multiplexer:**

1. Data selection and data routing
2. **Parallel-to-serial conversion**
3. Sending many signals over one line (at the transmitting end of **time-division multiplexing** in communication systems and telephone networks)
4. Implementing Boolean functions (logic function generators)
5. Computer memory systems

### Demultiplexer (DEMUX)

**Definition:** a demultiplexer is a combinational circuit that **takes one data input and sends it to one of several outputs**. The output that receives the data is chosen by the **select lines**; all other outputs stay 0. Because it distributes data, a demultiplexer is also called a **data distributor**. It works on the **one-to-many** principle and does the **reverse of a multiplexer**.

**Relation:** a demultiplexer with **n select lines** has **one data input** and **2ⁿ outputs** (1 × 2, 1 × 4, 1 × 8, 1 × 16 and so on).

#### 1 × 2 Demultiplexer

Data input D, one select line S, outputs Y0 and Y1.

| S | Y1 | Y0 |
| --- | --- | --- |
| 0 | 0 | D |
| 1 | D | 0 |

```text
 Y0 = S′D        Y1 = SD
```

#### 1 × 4 Demultiplexer

Data input D, two select lines S1 and S0, outputs Y0 to Y3.

| S1 | S0 | Y3 | Y2 | Y1 | Y0 |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | D |
| 0 | 1 | 0 | 0 | D | 0 |
| 1 | 0 | 0 | D | 0 | 0 |
| 1 | 1 | D | 0 | 0 | 0 |

```text
 Y0 = S1′S0′D     Y1 = S1′S0D     Y2 = S1S0′D     Y3 = S1S0D
```

**Circuit:** two NOT gates and four 3-input AND gates. The data input D goes to all four AND gates, but only the AND gate enabled by the select lines passes it.

![1×4 demultiplexer made of two NOT gates and four 3-input AND gates](/diagrams/digital-logic/demux-1to4.svg)

#### Building a Larger Demultiplexer from Smaller Ones

1. **1 × 8 from one 1 × 2 and two 1 × 4:** the 1 × 2 DEMUX (select line S2) sends D to one of the two 1 × 4 DEMUXes, which share S1 and S0. The upper 1 × 4 gives Y0 to Y3, and the lower one Y4 to Y7.
2. **1 × 16 from one 1 × 2 and two 1 × 8:** the 1 × 2 DEMUX uses S3, and the two 1 × 8 DEMUXes share S2, S1 and S0.

**Applications of the demultiplexer:**

1. Data distribution and routing to one of several devices
2. **Serial-to-parallel conversion**
3. At the receiving end of **time-division multiplexing**, to separate the signals that were sent over one line
4. Implementing Boolean functions
5. Reconstructing parallel data and in Arithmetic Logic Units (ALUs)

### Differences Between Multiplexer and Demultiplexer

| Basis | Multiplexer (MUX) | Demultiplexer (DEMUX) |
| --- | --- | --- |
| Function | Selects one of many inputs and sends it to one output | Sends one input to one of many outputs |
| Other name | Data selector | Data distributor |
| Principle | Many-to-one | One-to-many |
| Inputs and outputs | 2ⁿ data inputs, 1 output | 1 data input, 2ⁿ outputs |
| Select lines | n | n |
| Conversion | Parallel to serial | Serial to parallel |
| Use in time-division multiplexing | At the transmitter | At the receiver |
| Examples | 2 × 1, 4 × 1, 8 × 1, 16 × 1 | 1 × 2, 1 × 4, 1 × 8, 1 × 16 |
| Acts as | A digitally controlled multi-position switch | A data distributor circuit |
| Type of circuit | Combinational | Combinational |
| Bandwidth | Uses a single line efficiently (several signals share one line) | Spreads one signal over several lines |

## Encoder and Decoder {#encoder-and-decoder}

### Encoder

**Definition:** an encoder is a combinational circuit that **converts an active input signal into a binary code**. It has **2ⁿ input lines** (or fewer) and **n output lines**; when one input line is 1, the outputs give the binary code of that line. An ordinary encoder assumes that **only one input is 1 at a time**. Since each output is just the OR of some inputs, an encoder is made of **OR gates**. In simple words, an encoder **converts information from a form people use (such as a decimal digit or a key pressed) into a code the computer understands (binary)**:

```text
 Human language ──► Encoder ──► Machine (binary) code
```

**Characteristics of an encoder:**

1. **All the inputs cannot be 0 at the same time** (one input must be active).
2. **Only one input is 1 at a time**; all the other inputs are 0.

**Number of outputs:** an encoder with 2ⁿ inputs has n outputs. For example, an encoder with **32 inputs** has **5 outputs** (32 = 2⁵), and one with 64 inputs has 6 outputs.

#### 4-to-2 Encoder

Inputs I0 to I3, outputs Y1 and Y0.

| I3 | I2 | I1 | I0 | Y1 | Y0 |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |

Y1 is 1 for inputs I2 and I3; Y0 is 1 for inputs I1 and I3:

```text
 Y1 = I2 + I3        Y0 = I1 + I3
```

![4-to-2 encoder made of two OR gates](/diagrams/digital-logic/encoder-4to2.svg)

#### Octal-to-Binary (8-to-3) Encoder

Eight inputs I0 to I7 (one for each octal digit) and three outputs Y2, Y1, Y0.

| Active input | Y2 | Y1 | Y0 |
| --- | --- | --- | --- |
| I0 | 0 | 0 | 0 |
| I1 | 0 | 0 | 1 |
| I2 | 0 | 1 | 0 |
| I3 | 0 | 1 | 1 |
| I4 | 1 | 0 | 0 |
| I5 | 1 | 0 | 1 |
| I6 | 1 | 1 | 0 |
| I7 | 1 | 1 | 1 |

```text
 Y2 = I4 + I5 + I6 + I7
 Y1 = I2 + I3 + I6 + I7
 Y0 = I1 + I3 + I5 + I7
```

It needs three 4-input OR gates.

#### Decimal-to-BCD (10-to-4) Encoder

Ten inputs D0 to D9 (one for each decimal digit) and four outputs Y3 Y2 Y1 Y0, which give the BCD code of the active digit (for example, D5 gives 0101 and D9 gives 1001; see [BCD](/topics/number-systems/binary-codes#bcd-binary-coded-decimal)).

```text
 Y3 = D8 + D9
 Y2 = D4 + D5 + D6 + D7
 Y1 = D2 + D3 + D6 + D7
 Y0 = D1 + D3 + D5 + D7 + D9
```

It needs four OR gates.

#### Limitations of an Ordinary Encoder

1. **More than one active input gives a wrong code.** In an 8-to-3 encoder, if I3 and I6 are both 1, the outputs become 011 OR 110 = 111, which is the code of I7, not of either input.
2. **"No input active" cannot be told apart from I0.** When all inputs are 0, the output is 000, which is also the code of I0.

#### Priority Encoder

**Definition:** a priority encoder is an encoder that **gives each input a priority**. When **two or more inputs are 1 at the same time, it gives the code of the input with the highest priority** and ignores the others. It also has a **valid output (V)**, which is 1 when at least one input is 1 and 0 when no input is active. This removes both limitations of the ordinary encoder.

**4-to-2 priority encoder** (I3 has the highest priority and I0 the lowest; X = don't care):

| I3 | I2 | I1 | I0 | Y1 | Y0 | V |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | X | X | 0 |
| 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | X | 0 | 1 | 1 |
| 0 | 1 | X | X | 1 | 0 | 1 |
| 1 | X | X | X | 1 | 1 | 1 |

```text
 Y1 = I3 + I2
 Y0 = I3 + I2′I1
 V  = I3 + I2 + I1 + I0
```

For example, if I1 and I2 are both 1, the output is 10 (the code of I2, the higher-priority input).

**Applications of encoders:**

1. **Input devices** such as the **keyboard**, mouse and telephone sets: converting the key pressed into a binary code (a priority encoder handles two keys pressed together).
2. Converting **alphanumeric characters into ASCII or EBCDIC codes**.
3. Converting **decimal numbers into binary** (or BCD), for example in calculators and digital instruments.
4. Converting **analog audio and video into digital** form.
5. **Robotics:** determining positions (positional priority) in robot control.
6. **Priority selection:** controlling **interrupt requests (IRQ)** in microprocessors, deciding which device is served first.

### Decoder

**Definition:** a decoder is a combinational circuit that **converts an n-bit binary code into one of 2ⁿ output lines**. For each input combination, **exactly one output is 1** (active) and all the others are 0. It does the **reverse of an encoder**. A decoder with n inputs and 2ⁿ outputs is called an **n-to-2ⁿ line decoder** (2-to-4, 3-to-8, 4-to-16). Which output is 1 depends on the value of the inputs. In simple words, a decoder **converts the computer's (binary) code into a form people can understand**:

```text
 Machine (binary) code ──► Decoder ──► Human language
```

**Number of outputs:** a decoder with **9 inputs** has 2⁹ = **512 outputs**.

Each output of a decoder is 1 for exactly one input combination, so **each output is one minterm** of the input variables. A decoder is therefore made of **AND gates** (with NOT gates for the complements).

**Enable input (E):** many decoders have an enable input. When **E = 0, all outputs are 0** (the decoder is disabled); when **E = 1**, the decoder works normally.

#### 2-to-4 Line Decoder

Inputs A and B (A is the more significant bit), enable E, outputs Y0 to Y3.

| E | A | B | Y3 | Y2 | Y1 | Y0 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | X | X | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

```text
 Y0 = EA′B′     Y1 = EA′B     Y2 = EAB′     Y3 = EAB
```

![2-to-4 line decoder with enable, made of two NOT gates and four 3-input AND gates](/diagrams/digital-logic/decoder-2to4.svg)

#### 3-to-8 Line Decoder (Binary-to-Octal Decoder)

Inputs A, B, C (A is the most significant bit), outputs Y0 to Y7. With E = 1, exactly one output is 1:

| A | B | C | Active output | Expression |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | Y0 | A′B′C′ |
| 0 | 0 | 1 | Y1 | A′B′C |
| 0 | 1 | 0 | Y2 | A′BC′ |
| 0 | 1 | 1 | Y3 | A′BC |
| 1 | 0 | 0 | Y4 | AB′C′ |
| 1 | 0 | 1 | Y5 | AB′C |
| 1 | 1 | 0 | Y6 | ABC′ |
| 1 | 1 | 1 | Y7 | ABC |

It needs three NOT gates and eight 3-input AND gates (4-input AND gates if there is an enable input, which is ANDed into every term).

**4-to-16 decoder from two 3-to-8 decoders:** the inputs A, B, C (here the three lower bits) go to both 3-to-8 decoders, and the most significant bit (call it W) selects one of them through the enable inputs. The first decoder is enabled by W′ and gives Y0 to Y7; the second is enabled by W and gives Y8 to Y15.

#### Implementing a Boolean Function with a Decoder

Since the outputs of a decoder are all the minterms of its inputs, **any Boolean function can be built with a decoder and an OR gate**: OR together the decoder outputs for the minterms of the function.

**Example: a full adder with a 3-to-8 decoder and two OR gates.** Connect A, B and Cin to the decoder inputs. From the truth table of the full adder:

```text
 S    = Σm(1, 2, 4, 7)  →  S    = Y1 + Y2 + Y4 + Y7   (one 4-input OR gate)
 Cout = Σm(3, 5, 6, 7)  →  Cout = Y3 + Y5 + Y6 + Y7   (one 4-input OR gate)
```

#### Decoder as a Demultiplexer

A decoder with an enable input can work as a **demultiplexer**: the **enable input is used as the data input (D)**, and the decoder inputs are used as the **select lines**. For example, in the 2-to-4 decoder above, Y0 = EA′B′; with E = D, this becomes Y0 = A′B′D, which is exactly the output of a 1 × 4 DEMUX. The difference is only in use: a decoder has no separate data input, while a demultiplexer has one data input plus select lines.

**Applications of decoders:**

1. **Display devices:** the video card of a monitor uses decoders to show output; a BCD to seven-segment decoder drives digit displays (see [below](#seven-segment-decoder-and-display)).
2. Converting **binary numbers into their decimal equivalents**.
3. Converting codes such as **ASCII and EBCDIC back into alphanumeric characters**.
4. In the **CPU**: decoding instructions, **memory addresses** (selecting one memory location or chip) and the binary output of counters.
5. Selecting different display units one after another, and **timing and sequencing**: switching devices such as motors, heaters and switches on and off at the right time in automatic control.
6. Working as a **demultiplexer** (data distribution) and **implementing Boolean functions** (with OR gates).

### Differences Between Encoder and Decoder

| Basis | Encoder | Decoder |
| --- | --- | --- |
| Function | Converts an active input line into a binary code | Converts a binary code into one active output line |
| Inputs and outputs | 2ⁿ inputs, n outputs | n inputs, 2ⁿ outputs |
| Active lines | One input is active at a time | One output is active at a time |
| Input | Active (signal) input lines | Coded binary data |
| Output | Coded binary data | One active output line |
| Gates used | OR gates | AND gates (and NOT gates) |
| Complexity | Simple | More complex |
| Position in communication | At the transmitting end | At the receiving end |
| Examples | 4-to-2, 8-to-3 (octal to binary), 10-to-4 (decimal to BCD), priority encoder | 2-to-4, 3-to-8, 4-to-16, BCD to seven-segment |
| Relation | Reverse of a decoder | Reverse of an encoder |
| Conversion | People's language (decimal, letters) → machine code | Machine code → people's language |
| Connected to | The input unit (for example, the keyboard) | The output unit (for example, the display) |
| Main uses | Keyboards; letters to ASCII/EBCDIC; priority selection | Memory address decoding, displays, code to readable text, demultiplexing |

## Seven-Segment Decoder and Display {#seven-segment-decoder-and-display}

### Seven-Segment Display

**Definition:** a seven-segment display is a display device made of **seven LED bars (segments)**, arranged in the shape of the digit **8**, that can show the decimal digits **0 to 9** (and a few letters) by lighting different combinations of segments. The segments are named **a to g**; many displays also have an eighth LED for the **decimal point (dp)**.

**Arrangement of the segments:**

1. **a:** top
2. **b:** upper right
3. **c:** lower right
4. **d:** bottom
5. **e:** lower left
6. **f:** upper left
7. **g:** middle

![Seven-segment display with the segments a to g and the decimal point dp](/diagrams/digital-logic/seven-segment-layout.svg)

**Segments lit for each digit:**

| Digit | Segments lit | Number of segments |
| --- | --- | --- |
| 0 | a, b, c, d, e, f | 6 |
| 1 | b, c | 2 |
| 2 | a, b, d, e, g | 5 |
| 3 | a, b, c, d, g | 5 |
| 4 | b, c, f, g | 4 |
| 5 | a, c, d, f, g | 5 |
| 6 | a, c, d, e, f, g | 6 |
| 7 | a, b, c | 3 |
| 8 | a, b, c, d, e, f, g | 7 |
| 9 | a, b, c, d, f, g | 6 |

![Digits 0 to 9 shown on a seven-segment display](/diagrams/digital-logic/seven-segment-digits.svg)

(Some displays draw 6 and 9 without the "tail" segment, a and d respectively, or 7 with segment f; the table above uses the common form.)

### Types of Seven-Segment Display

1. **Common cathode display:** the cathodes of all the LEDs are joined together and connected to logic 0 (ground). A segment lights when **logic 1 (high)** is applied to it, so the segments are **active-high**.
2. **Common anode display:** the anodes of all the LEDs are joined together and connected to logic 1 (the supply). A segment lights when **logic 0 (low)** is applied to it, so the segments are **active-low**.

Each segment is driven through a current-limiting resistor.

| Basis | Common cathode | Common anode |
| --- | --- | --- |
| Common terminal | All cathodes, connected to ground (0) | All anodes, connected to the supply (1) |
| A segment lights when its input is | 1 (high) | 0 (low) |
| Segment drive | Active-high | Active-low |
| Example decoder IC | 74LS48 (active-high outputs) | 74LS47 (active-low outputs) |

### BCD to Seven-Segment Decoder

**Definition:** a BCD to seven-segment decoder is a combinational circuit that **converts a 4-bit BCD code into the seven signals (a to g) needed to show that digit** on a seven-segment display. It has **four inputs** (A, B, C, D, with A as the most significant bit) and **seven outputs** (a to g).

![BCD to seven-segment decoder with inputs A, B, C, D and outputs a to g driving a display](/diagrams/digital-logic/bcd-to-seven-segment.svg)

**Truth table** (for a common cathode display, 1 = segment on). BCD uses only 0000 to 1001, so the inputs 1010 to 1111 (10 to 15) never occur; they are treated as **don't-care (X)** conditions.

| Digit | A | B | C | D | a | b | c | d | e | f | g |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 5 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 6 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 7 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 8 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 9 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| 10–15 | | | | | X | X | X | X | X | X | X |

**Minterms of each segment** (d = don't-care terms 10 to 15 for every segment):

| Segment | Minterms (segment on) |
| --- | --- |
| a | Σm(0, 2, 3, 5, 6, 7, 8, 9) |
| b | Σm(0, 1, 2, 3, 4, 7, 8, 9) |
| c | Σm(0, 1, 3, 4, 5, 6, 7, 8, 9) |
| d | Σm(0, 2, 3, 5, 6, 8, 9) |
| e | Σm(0, 2, 6, 8) |
| f | Σm(0, 4, 5, 6, 8, 9) |
| g | Σm(2, 3, 4, 5, 6, 8, 9) |

**Simplification:** each segment is simplified with a 4-variable K-map, using the don't-care cells (10 to 15) wherever they make a group larger. For segment a:

![K-map of segment a with don't cares: a = A + C + BD + B′D′](/diagrams/digital-logic/kmap-seven-segment-a.svg)

**Simplified expressions** (common cathode):

```text
 a = A + C + BD + B′D′
 b = B′ + C′D′ + CD
 c = B + C′ + D
 d = A + B′D′ + B′C + CD′ + BC′D
 e = B′D′ + CD′
 f = A + C′D′ + BC′ + BD′
 g = A + B′C + BC′ + CD′
```

Each expression is then built with AND, OR and NOT gates. For a **common anode** display, every output must be inverted (each 1 in the table becomes 0 and each 0 becomes 1).

**Decoder ICs:**

1. **74LS47:** BCD to seven-segment decoder/driver with **active-low** (open-collector) outputs, for **common anode** displays.
2. **74LS48:** BCD to seven-segment decoder with **active-high** outputs, for **common cathode** displays.

**Applications of seven-segment displays:**

1. Digital clocks and watches
2. Calculators
3. Digital meters and measuring instruments
4. Microwave ovens and other home appliances
5. Vehicle speedometers and odometers
6. Electronic scoreboards and counters

## Comparator {#comparator}

**Definition:** a **magnitude comparator** (digital comparator) is a combinational circuit that **compares two binary numbers A and B** and tells whether **A > B, A = B or A < B**. It has three outputs, and exactly one of them is 1 for any pair of inputs:

1. **G** (greater): 1 when A > B
2. **E** (equal): 1 when A = B
3. **L** (less): 1 when A < B

### 1-Bit Comparator

| A | B | G (A > B) | E (A = B) | L (A < B) |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 |

```text
 G = AB′
 L = A′B
 E = A′B′ + AB = (A ⊕ B)′      (XNOR)
```

**Circuit:** two NOT gates, two AND gates and one XNOR gate. (E can also be written as E = (G + L)′, the NOR of the other two outputs.)

![1-bit magnitude comparator: two NOT gates, two AND gates and an XNOR gate](/diagrams/digital-logic/comparator-1bit.svg)

### 2-Bit Comparator

A = A1A0 and B = B1B0. Two numbers are compared **from the most significant bit**: if A1 and B1 are different, they decide the result; only if A1 = B1 do the next bits A0 and B0 decide it.

Let **xᵢ = (Aᵢ ⊕ Bᵢ)′ = AᵢBᵢ + Aᵢ′Bᵢ′**, which is 1 when bit i of A and B is equal. Then:

```text
 E = x1 · x0
 G = A1B1′ + x1A0B0′
 L = A1′B1 + x1A0′B0
```

**Example:** A = 10 and B = 01. A1 = 1, B1 = 0, so A1B1′ = 1 and **G = 1** (A > B), without looking at the lower bits.

### 4-Bit Comparator

A = A3A2A1A0 and B = B3B2B1B0, with xᵢ = (Aᵢ ⊕ Bᵢ)′ for i = 0 to 3:

```text
 E = x3 · x2 · x1 · x0
 G = A3B3′ + x3A2B2′ + x3x2A1B1′ + x3x2x1A0B0′
 L = A3′B3 + x3A2′B2 + x3x2A1′B1 + x3x2x1A0′B0
```

1. **A = B** only when every pair of bits is equal.
2. **A > B** when A3 > B3; or A3 = B3 and A2 > B2; or A3 = B3, A2 = B2 and A1 > B1; or the three higher pairs are equal and A0 > B0.
3. **A < B** follows the same pattern with the inequality reversed.

**Comparator IC and cascading:** the **74LS85** is a 4-bit magnitude comparator IC. Longer numbers are compared by **cascading** comparators: the A > B, A = B and A < B outputs of the stage that handles the less significant bits are connected to the matching cascade inputs of the stage that handles the more significant bits. The A = B cascade input of the least significant stage is held at logic 1.

**Applications of comparators:**

1. Processors and microcontrollers (comparing data, checking addresses, conditional instructions)
2. Control systems (comparing a sensor value with a reference value)
3. Password or code checking (matching entered data with stored data)
4. Sorting circuits (finding the larger of two numbers)

## References {#references}

**IT Job QnS**

- [Digital Logic Design](https://it.jobqns.com/digital-logic-design/) — accessed 2026-11-01

**TutorialsPoint**

- [Digital Electronics – Combinational Circuits](https://www.tutorialspoint.com/digital-electronics/digital-electronics-combinational-circuits.htm) — accessed 2026-11-01
- [Half Adder](https://www.tutorialspoint.com/digital-electronics/digital-electronics-half-adder.htm) — accessed 2026-11-01
- [Full Adder](https://www.tutorialspoint.com/digital-electronics/digital-electronics-full-adder.htm) — accessed 2026-11-01
- [Design Full Adder using Half Adder](https://www.tutorialspoint.com/digital-electronics/design-full-adder-using-half-adder.htm) — accessed 2026-11-01
- [Half Adder with NAND Gates](https://www.tutorialspoint.com/digital-electronics/half-adder-with-nand-gates.htm) — accessed 2026-11-01
- [Full Adder with NAND Gates](https://www.tutorialspoint.com/digital-electronics/full-adder-with-nand-gates.htm) — accessed 2026-11-01
- [N-Bit Parallel Adders](https://www.tutorialspoint.com/digital-electronics/digital-electronics-n-bit-parallel-adders.htm) — accessed 2026-11-01
- [Serial Binary Adder](https://www.tutorialspoint.com/digital-electronics/digital-electronics-serial-binary-adder.htm) — accessed 2026-11-01
- [Multiplexers](https://www.tutorialspoint.com/digital-electronics/digital-electronics-multiplexers.htm) — accessed 2026-11-01
- [Multiplexer Design Procedure and Applications](https://www.tutorialspoint.com/digital-electronics/multiplexer-design-procedure-and-applications.htm) — accessed 2026-11-01
- [Demultiplexers](https://www.tutorialspoint.com/digital-electronics/digital-electronics-demultiplexers.htm) — accessed 2026-11-01
- [Difference between Multiplexer and Demultiplexer](https://www.tutorialspoint.com/digital-electronics/difference-between-multiplexer-and-demultiplexer.htm) — accessed 2026-11-01
- [Encoders](https://www.tutorialspoint.com/digital-electronics/digital-electronics-encoders.htm) — accessed 2026-11-01
- [Priority Encoders](https://www.tutorialspoint.com/digital-electronics/digital-electronics-priority-encoders.htm) — accessed 2026-11-01
- [Decoders](https://www.tutorialspoint.com/digital-electronics/digital-electronics-decoders.htm) — accessed 2026-11-01
- [Comparators](https://www.tutorialspoint.com/digital-electronics/digital-electronics-comparators.htm) — accessed 2026-11-01
- [Seven-Segment LED Display](https://www.tutorialspoint.com/digital-electronics/seven-segment-led-display.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Difference between Multiplexer and Demultiplexer](https://www.geeksforgeeks.org/gate/difference-between-multiplexer-and-demultiplexer/) — accessed 2026-11-01
- [Difference between Encoder and Decoder](https://www.geeksforgeeks.org/digital-logic/difference-between-encoder-and-decoder/) — accessed 2026-11-01
- [Half Adder vs Full Adder](https://www.geeksforgeeks.org/gate/difference-between-half-adder-and-full-adder/) — accessed 2026-11-01
- [Difference between Serial Adder and Parallel Adder](https://www.geeksforgeeks.org/digital-logic/difference-between-serial-adder-and-parallel-adder/) — accessed 2026-11-01
- [Combinational Circuit](https://www.geeksforgeeks.org/digital-logic/what-is-combinational-circuit/) — accessed 2026-11-01
- [Encoders and Decoders in Digital Logic](https://www.geeksforgeeks.org/digital-logic/encoders-and-decoders-in-digital-logic/) — accessed 2026-11-01
- [BCD to 7 Segment Decoder](https://www.geeksforgeeks.org/digital-logic/bcd-to-7-segment-decoder/) — accessed 2026-11-01
- [Magnitude Comparator in Digital Logic](https://www.geeksforgeeks.org/digital-logic/magnitude-comparator-in-digital-logic/) — accessed 2026-11-01

**TpointTech**

- [Combinational Circuits in Computer Organization](https://www.tpointtech.com/combinational-circuits) — accessed 2026-11-01
- [Combinational Logic Circuits](https://www.tpointtech.com/combinational-logic-circuits-in-digital-electronics) — accessed 2026-11-01
- [Decoder in Digital Electronics](https://www.tpointtech.com/decoder-digital-electronics) — accessed 2026-11-01
- [Difference between Decoder and Demultiplexer](https://www.tpointtech.com/decoder-vs-demultiplexer) — accessed 2026-11-01

**Additional sources**

- *Information and Communication Technology* (Class XI–XII), Chapter 3: Number System and Digital Device (encoder, decoder, adder) — reference book supplied by the project owner
- [Adder (electronics)](https://en.wikipedia.org/wiki/Adder_(electronics)) — Wikipedia, accessed 2026-11-01
- [Seven-segment display](https://en.wikipedia.org/wiki/Seven-segment_display) — Wikipedia, accessed 2026-11-01
- [Multiplexer: Boolean function implementation](https://mail.asic-world.com/digital/combo6.html) — ASIC World, accessed 2026-11-01
- [SN74LS47 product page](https://www.ti.com/product/SN74LS47) — Texas Instruments, accessed 2026-11-01
- [SN74LS85 product page](https://www.ti.com/product/SN74LS85) — Texas Instruments, accessed 2026-11-01
- [SN74LS283 product page](https://www.ti.com/product/SN74LS283) — Texas Instruments, accessed 2026-11-01
