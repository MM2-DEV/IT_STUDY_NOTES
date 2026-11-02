---
description: Latches and flip-flops, the SR flip-flop, clock triggering, the JK flip-flop with the race-around condition and the master-slave JK flip-flop, and the D and T flip-flops, with characteristic and excitation tables.
updated: 2026-11-01
---

**Sequential circuit:** a sequential circuit is a digital circuit whose output depends on **both the present inputs and the previous state** (what is stored in it). It contains **memory elements** and **feedback**. This is the opposite of a [combinational circuit](/topics/digital-logic/combinational-circuits), whose output depends only on the present inputs. The basic memory elements of sequential circuits are **latches** and **flip-flops**.

**Clock:** a clock is a signal that changes regularly between 0 and 1. In a **synchronous** sequential circuit, the flip-flops change state only at the moments set by the clock; in an **asynchronous** circuit, the state can change as soon as the inputs change.

**Triggering:** making a flip-flop respond to its inputs is called *triggering*. A flip-flop can be triggered in two ways:

1. **Level triggering:** the flip-flop responds **during the whole time the clock is at one level**.
   1. **Positive level triggering:** it responds while the clock is **1 (high)**.
   2. **Negative level triggering:** it responds while the clock is **0 (low)**.
2. **Edge triggering:** the flip-flop responds **only at the instant the clock changes**.
   1. **Positive edge triggering:** it responds at the **rising edge** (the change from 0 to 1).
   2. **Negative edge triggering:** it responds at the **falling edge** (the change from 1 to 0).

![A clock signal showing its high and low levels and its rising and falling edges](/diagrams/digital-logic/clock-triggering.svg)

Edge triggering is preferred in practice because the state can change only once in each clock cycle, which avoids timing problems such as the race-around condition (see [J-K Flip-Flop](#j-k-flip-flop)).

## Basic Flip-Flops {#basic-flip-flops}

**Definition:** a flip-flop is a **sequential circuit with two stable states** that can **store one bit** of binary information (0 or 1). It keeps its state until an input changes it. Because it has two stable states, it is also called a **bistable multivibrator**. A flip-flop is the **basic memory cell** of digital systems. The simple, unclocked form is called a **latch** (it "latches", or holds, its state; see the differences between a latch and a flip-flop below). The first electronic flip-flop circuit was invented by the British physicist **William Eccles** (with F. W. Jordan) in **1918**.

**The smallest memory unit:** the memory of a digital system is built from flip-flops; a group of flip-flops working together, each holding one bit, forms a register.

**Outputs:** every flip-flop has two outputs, **Q** and **Q′**, which are always the **complement** of each other in normal operation.

1. **Set state:** Q = 1 and Q′ = 0 (the flip-flop stores 1).
2. **Reset (clear) state:** Q = 0 and Q′ = 1 (the flip-flop stores 0).

**Notation:** Qn is the present state (before the clock) and **Qn+1** is the next state (after the clock).

**Types of flip-flops:**

1. **SR** (Set-Reset) flip-flop
2. **JK** flip-flop
3. **D** (Data or Delay) flip-flop
4. **T** (Toggle) flip-flop

![Symbols of the SR, JK, D and T flip-flops](/diagrams/digital-logic/flip-flop-symbols.svg)

### SR Latch

A **latch** is the simplest memory element. It has **no clock**: its output changes as soon as its inputs change, so it is an asynchronous circuit. The basic **SR latch** is made of **two cross-coupled NOR gates** or **two cross-coupled NAND gates**: the output of each gate is fed back to an input of the other gate.

**SR latch with NOR gates** (active-high inputs):

![SR latch made of two cross-coupled NOR gates](/diagrams/digital-logic/sr-latch-nor.svg)

| S | R | Qn+1 | State |
| --- | --- | --- | --- |
| 0 | 0 | Qn | No change (memory) |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | — | Invalid (forbidden): Q = Q′ = 0 |

**SR latch with NAND gates** (active-low inputs, written S′ and R′): a **0** on S′ sets the latch, and a **0** on R′ resets it.

![SR latch made of two cross-coupled NAND gates](/diagrams/digital-logic/sr-latch-nand.svg)

| S′ | R′ | Qn+1 | State |
| --- | --- | --- | --- |
| 0 | 0 | — | Invalid (forbidden): Q = Q′ = 1 |
| 0 | 1 | 1 | Set |
| 1 | 0 | 0 | Reset |
| 1 | 1 | Qn | No change (memory) |

### Clocked SR Flip-Flop

**Definition:** the SR flip-flop is an SR latch with **two extra NAND gates** at the inputs, controlled by the **clock (CLK)**. The S and R inputs can reach the latch only when CLK = 1; when CLK = 0, the outputs of the input gates are 1 and the latch keeps its state.

![Clocked SR flip-flop made of four NAND gates](/diagrams/digital-logic/sr-flip-flop-clocked.svg)

**Truth table:**

| CLK | S | R | Qn+1 | State |
| --- | --- | --- | --- | --- |
| 0 | X | X | Qn | No change (clock inactive) |
| 1 | 0 | 0 | Qn | No change |
| 1 | 0 | 1 | 0 | Reset |
| 1 | 1 | 0 | 1 | Set |
| 1 | 1 | 1 | — | Invalid (forbidden) |

**Characteristic table** (the next state for each present state):

| S | R | Qn | Qn+1 |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | X (invalid) |
| 1 | 1 | 1 | X (invalid) |

**Characteristic equation** (from a K-map of this table, using the invalid rows as don't-cares):

```text
 Qn+1 = S + R′Qn        with the condition S · R = 0
```

**The forbidden state:** when S = R = 1, both outputs become equal (Q = Q′), which breaks the rule that Q and Q′ are complements. When S and R then return to 0 together, the final state cannot be predicted. So **S = R = 1 must not be applied** to an SR flip-flop. This is the main drawback of the SR flip-flop, and it is removed in the JK flip-flop.

### Excitation Table

A **characteristic table** gives the next state for given inputs. An **excitation table** does the reverse: it gives the **inputs needed to move from a present state to a required next state**. Excitation tables are used when designing counters and other sequential circuits. (X = don't care.)

**Excitation table of the SR flip-flop:**

| Qn | Qn+1 | S | R |
| --- | --- | --- | --- |
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | X | 0 |

### Differences Between Latch and Flip-Flop

| Basis | Latch | Flip-flop |
| --- | --- | --- |
| Clock | No clock (or an enable input) | Uses a clock |
| Type of circuit | Asynchronous | Synchronous |
| Triggering | Level-sensitive: changes whenever the inputs (or enable) are active | Usually edge-triggered: changes only at a clock edge |
| Construction | Two cross-coupled gates | A latch plus clock-control circuitry |
| Speed | Faster (simpler) | Slower than a latch |
| Use | Basic storage, building flip-flops | Registers, counters, synchronous circuits |
| Stable states | Two (bistable) | Two (bistable) |
| Classification | Not divided further | Divided into synchronous and asynchronous types |
| Examples | SR latch, D latch | SR, JK, D and T flip-flops |

**Applications of flip-flops:**

1. Storing one bit of data (memory cells)
2. **Registers** and **shift registers** (see [Registers](/topics/digital-logic/registers))
3. **Counters** (see [Counters](/topics/digital-logic/counters))
4. **Frequency division** (dividing the clock frequency by 2)
5. Eliminating switch bounce
6. Data transfer and synchronisation

## J-K Flip-Flop {#j-k-flip-flop}

**Definition:** the JK flip-flop is an **improved SR flip-flop** in which the **invalid state is removed**. Its inputs J and K work like S and R, but when **J = K = 1** the output **toggles** (changes to its complement) instead of becoming invalid. (The names J and K are conventional letters; they do not stand for words.)

**Construction:** the outputs are fed back to the inputs: the J input is ANDed with **Q′**, and the K input is ANDed with **Q**. So S = JQ′ and R = KQ. Because S and R can never both be 1 at the same time, the forbidden state never occurs.

![JK flip-flop made from an SR flip-flop with two AND gates and feedback](/diagrams/digital-logic/jk-flip-flop-circuit.svg)

(In the gate-level circuit, the two AND gates and the clock gating are combined into two **3-input NAND gates**, with inputs J, CLK and Q′ for one gate and K, CLK and Q for the other.)

**Truth table** (with the clock active):

| J | K | Qn+1 | State |
| --- | --- | --- | --- |
| 0 | 0 | Qn | No change |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Qn′ | Toggle |

**Characteristic table:**

| J | K | Qn | Qn+1 |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**Characteristic equation:**

```text
 Qn+1 = JQn′ + K′Qn
```

**Excitation table:**

| Qn | Qn+1 | J | K |
| --- | --- | --- | --- |
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

### Race-Around Condition

**Definition:** in a **level-triggered** JK flip-flop with **J = K = 1**, the output toggles. If the clock stays at 1 for longer than the time the flip-flop takes to change (its **propagation delay**), the new output is fed back to the inputs and the flip-flop **toggles again and again** while the clock is high. At the end of the clock pulse the final state is uncertain. This repeated toggling during one clock pulse is called the **race-around condition**.

**Ways to avoid it:**

1. Keep the **clock pulse width shorter than the propagation delay** of the flip-flop, so the output can change only once while the clock is high (this is difficult to achieve in practice).
2. Use an **edge-triggered** JK flip-flop, which responds only at a clock edge.
3. Use a **master-slave JK flip-flop**.

### Master-Slave JK Flip-Flop

**Construction:** two flip-flops are connected **in series**:

1. The **master** flip-flop receives the J and K inputs and is clocked by the clock signal (it works while CLK = 1).
2. The **slave** flip-flop receives the outputs of the master as its inputs and is clocked by the **inverted clock** (through a NOT gate), so it works while CLK = 0.
3. The outputs of the slave are the outputs of the whole flip-flop, and they are fed back to the input gates of the master.

![Master-slave JK flip-flop: a master and a slave flip-flop with an inverted clock to the slave](/diagrams/digital-logic/master-slave-jk.svg)

**Working:**

1. **While CLK = 1:** the master responds to J and K, but the slave is disabled, so the output Q does not change.
2. **When CLK falls to 0:** the master is disabled (its state is frozen), and the slave copies the state of the master to the output.

Since the master and the slave are never enabled at the same time, the output can change **only once per clock pulse**, at the **falling (negative) edge** of the clock. So the race-around condition cannot occur.

### Differences Between SR and JK Flip-Flops

| Basis | SR flip-flop | JK flip-flop |
| --- | --- | --- |
| Inputs | S (set), R (reset) | J, K |
| Both inputs 1 | Invalid (forbidden) state | Toggle (output complements) |
| Feedback from outputs | No | Yes (Q′ to the J side, Q to the K side) |
| Characteristic equation | Qn+1 = S + R′Qn (SR = 0) | Qn+1 = JQn′ + K′Qn |
| Race-around condition | Does not arise | Can occur when J = K = 1 with level triggering |

## D and T Flip-Flops {#d-and-t-flip-flops}

### D Flip-Flop

**Definition:** the D flip-flop (Data or **Delay** flip-flop) has **one data input D** and a clock. At the active clock edge, **the output Q takes the value of D**, and it keeps that value until the next active clock edge. Because the input appears at the output one clock period later, it is also called a **delay flip-flop**.

**Construction:** an SR flip-flop with **S = D** and **R = D′** (through a NOT gate). Since S and R are always complements, the forbidden state S = R = 1 can never occur. (A JK flip-flop with J = D and K = D′ also works as a D flip-flop.)

![D flip-flop: a clocked SR flip-flop with a NOT gate, so that S = D and R = D′](/diagrams/digital-logic/d-flip-flop-circuit.svg)

**Truth table:**

| CLK | D | Qn+1 | State |
| --- | --- | --- | --- |
| 0 | X | Qn | No change |
| 1 (active) | 0 | 0 | Reset |
| 1 (active) | 1 | 1 | Set |

**Characteristic equation:**

```text
 Qn+1 = D
```

**Excitation table:**

| Qn | Qn+1 | D |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**D latch (transparent latch):** a level-triggered version with an **enable (E)** input instead of a clock edge. While E = 1, Q follows D (the latch is "transparent"); when E = 0, Q holds its last value.

**Uses of the D flip-flop:**

1. **Registers** and **shift registers** (data storage and data transfer)
2. Delaying a signal by one clock period
3. Counters

### T Flip-Flop

**Definition:** the T (Toggle) flip-flop has **one input T** and a clock. When **T = 0**, the output **does not change**; when **T = 1**, the output **toggles** (changes to its complement) at every active clock edge.

**Construction:** a JK flip-flop with **J and K joined together** as the input T. Then T = 0 gives J = K = 0 (no change), and T = 1 gives J = K = 1 (toggle).

**Truth table:**

| T | Qn | Qn+1 | State |
| --- | --- | --- | --- |
| 0 | 0 | 0 | No change |
| 0 | 1 | 1 | No change |
| 1 | 0 | 1 | Toggle |
| 1 | 1 | 0 | Toggle |

**Characteristic equation:**

```text
 Qn+1 = TQn′ + T′Qn = T ⊕ Qn
```

**Excitation table:**

| Qn | Qn+1 | T |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Frequency division:** with T = 1, the output toggles once on every clock pulse, so it completes one cycle for every **two** clock cycles. The output frequency is therefore **half** the clock frequency: a T flip-flop is a **divide-by-2 circuit**. With n T flip-flops in a chain, the frequency is divided by 2ⁿ.

**Uses of the T flip-flop:**

1. **Counters** (binary ripple counters; see [Counters](/topics/digital-logic/counters))
2. **Frequency dividers**

### Comparison of the Four Flip-Flops

| Basis | SR | JK | D | T |
| --- | --- | --- | --- | --- |
| Inputs | S, R | J, K | D | T |
| Characteristic equation | Qn+1 = S + R′Qn | Qn+1 = JQn′ + K′Qn | Qn+1 = D | Qn+1 = T ⊕ Qn |
| Invalid state | Yes (S = R = 1) | No | No | No |
| Toggle | No | Yes (J = K = 1) | No | Yes (T = 1) |
| Made from | Latch + clock gates | SR + feedback | SR (or JK) with an inverter | JK with J = K |
| Main use | Basic storage | General purpose, counters | Registers, data storage | Counters, frequency division |

## References {#references}

**TutorialsPoint**

- [Digital Circuits – Flip-Flops](https://www.tutorialspoint.com/digital_circuits/digital_circuits_flip_flops.htm) — accessed 2026-11-01
- [Latches](https://www.tutorialspoint.com/digital-electronics/digital-electronics-latches.htm) — accessed 2026-11-01
- [Flip-Flop: Triggering Methods](https://www.tutorialspoint.com/digital-electronics/flip-flop-triggering-methods.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Difference between Flip-flop and Latch](https://www.geeksforgeeks.org/gate/difference-between-flip-flop-and-latch/) — accessed 2026-11-01
- [Flip-Flop Types, Their Conversion and Applications](https://www.geeksforgeeks.org/digital-logic/flip-flop-types-their-conversion-and-applications/) — accessed 2026-11-01
- [Master-Slave JK Flip Flop](https://www.geeksforgeeks.org/digital-logic/master-slave-jk-flip-flop/) — accessed 2026-11-01
- [Introduction of Sequential Circuits](https://www.geeksforgeeks.org/digital-logic/introduction-of-sequential-circuits/) — accessed 2026-11-01

**TpointTech**

- [Master-Slave JK Flip Flop in Digital Electronics](https://www.tpointtech.com/master-slave-jk-flip-flop-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- *Information and Communication Technology* (Class XI–XII), Chapter 3: Number System and Digital Device (flip-flop) — reference book supplied by the project owner
- [Race conditions](https://learn.circuitverse.org/docs/seq-design/race-conditions.html) — CircuitVerse Learn, accessed 2026-11-01
