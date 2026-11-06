---
description: Digital logic families and their characteristics (fan-in, fan-out, propagation delay, power dissipation and noise margin), and DTL, TTL, MOS (PMOS and NMOS) and CMOS gates with their comparison.
updated: 2026-11-01
---

**Logic family:** a logic family is a **group of digital integrated circuits built with the same circuit technology**, so that they share the same **logic levels, supply voltage** and general characteristics (speed, power consumption, noise immunity) and can be connected to one another.

Logic gates of the same family work together without extra interface circuits.

### Classification of Logic Families

1. **Bipolar families:** use **bipolar junction transistors** (and diodes and resistors).
   1. **RTL:** Resistor-Transistor Logic
   2. **DTL:** Diode-Transistor Logic
   3. **TTL:** Transistor-Transistor Logic
   4. **ECL:** Emitter-Coupled Logic
2. **Unipolar (MOS) families:** use **MOSFETs** (metal-oxide-semiconductor field-effect transistors).
   1. **PMOS:** p-channel MOSFETs only
   2. **NMOS:** n-channel MOSFETs only
   3. **CMOS:** Complementary MOS, using both p-channel and n-channel MOSFETs

### Characteristics (Parameters) of Logic Families

1. **Fan-in:** the **number of inputs** a gate has.
2. **Fan-out:** the **maximum number of gate inputs** (of the same family) that one gate output can drive without its output voltage going outside the valid logic levels. Standard TTL has a fan-out of 10.
3. **Propagation delay (tpd):** the **time between a change at the input and the resulting change at the output**. It decides the **speed** of the family: the smaller the delay, the faster the gate.
4. **Power dissipation:** the **power consumed** by a gate. *Static* power is used while the output stays at one level; *dynamic* power is used while the output is switching.
5. **Noise margin (noise immunity):** the **largest unwanted (noise) voltage** that can be added to an input without changing the output to a wrong logic level:

   ```text
   High-level noise margin  NMH = VOH(min) − VIH(min)
   Low-level noise margin   NML = VIL(max) − VOL(max)
   ```

   VOH and VOL are the guaranteed output levels of a driving gate; VIH and VIL are the input levels that the driven gate accepts as 1 and 0.

6. **Speed-power product (figure of merit):** propagation delay × power dissipation per gate. A **smaller** value means a better family (fast and economical). For standard TTL: 10 ns × 10 mW = 100 pJ.
7. **Supply voltage** and **operating temperature range**.

**Example (standard TTL levels):** VOH(min) = 2.4 V, VIH(min) = 2.0 V, VIL(max) = 0.8 V and VOL(max) = 0.4 V. So NMH = 2.4 − 2.0 = **0.4 V** and NML = 0.8 − 0.4 = **0.4 V**: a TTL gate tolerates up to 0.4 V of noise.

## DTL, TTL, CMOS and MOS Gates {#dtl-ttl-cmos-and-mos-gates}

### DTL (Diode-Transistor Logic)

**Definition:** DTL is a bipolar logic family in which **diodes perform the logic (AND/OR) function** and a **transistor performs inversion and amplification**.

The basic DTL gate is a **NAND gate**. DTL is the **direct ancestor of TTL**.

![DTL NAND gate: two input diodes, resistors and an output transistor](/diagrams/digital-logic/dtl-nand.svg)

**Working of the DTL NAND gate:**

1. **Any input low (0):** the diode at that input conducts and pulls the point P low. The base of the transistor becomes negative, so the transistor is **OFF**, and the resistor RC pulls the output **high (1)**.
2. **All inputs high (1):** all the input diodes are reverse biased. Current flows from VCC through R1 and R2 into the base, so the transistor **saturates (ON)**, and the output is **low (0)**.

So the output is 0 only when all inputs are 1: Y = (AB)′, a **NAND** function. (The diodes perform AND; the transistor inverts it.)

**Advantages:**

1. Higher **fan-in** than RTL (more inputs can be added with more diodes).
2. Simple and inexpensive, with good noise immunity.

**Disadvantages:**

1. **Slow:** propagation delay is relatively large, because the charge stored in the base of the saturated transistor must be removed before it turns off.
2. Needs more components (diodes) than RTL.

**History:** the IBM 1401 computer (announced 1959) used a form of DTL, and Signetics introduced the first high-volume DTL integrated-circuit family in 1962. DTL was later replaced by TTL.

### TTL (Transistor-Transistor Logic)

**Definition:** TTL is a bipolar logic family in which **transistors perform both the logic function and the amplification**.

The basic TTL gate is a **NAND gate** whose input stage is a **multiple-emitter transistor** (one emitter for each input), followed by amplifying stages. TTL replaced DTL; Texas Instruments' **5400/7400 series** of the mid-1960s made TTL the industry standard.

**Main features of standard TTL:**

1. **Supply voltage:** 5 V.
2. **Logic levels:**

| Level | Low (0) | High (1) |
| --- | --- | --- |
| Input | 0 to 0.8 V | 2.0 V to VCC |
| Output | 0 to 0.4 V | 2.4 V to VCC |

3. **Noise margin:** 0.4 V.
4. **Fan-out:** 10.
5. **Propagation delay:** about 10 ns per gate.
6. **Power dissipation:** about 10 mW per gate.

**TTL output configurations:**

1. **Totem-pole output:** two output transistors, one above the other; one pulls the output high and the other pulls it low. It gives a **low output impedance** (fast switching and good drive); its high output level is typically about 3.5 V.
2. **Open-collector output:** the upper transistor is left out, so an **external pull-up resistor** is needed. Open-collector outputs **can be wired together** to form wired logic.
3. **Tri-state (three-state) output:** besides high and low, the output has a third **high-impedance (Hi-Z)** state, selected by an **enable** input, in which the output is effectively disconnected. It lets many devices share one **bus**, with only the enabled device driving it.

**TTL sub-families** (they trade speed against power):

| Series | Name | Propagation delay | Power per gate |
| --- | --- | --- | --- |
| 74 | Standard TTL | 10 ns | 10 mW |
| 74L | Low-power TTL | 33 ns | 1 mW |
| 74H | High-speed TTL | 6 ns | 22 mW |
| 74S | Schottky TTL | 3 ns | 19 mW |
| 74LS | Low-power Schottky TTL | 9.5 ns | 2 mW |

The **74LS** series became the most common TTL type.

**Advantages of TTL:**

1. **Fast** (short propagation delay).
2. Standardised and widely available; good compatibility between ICs.
3. Less sensitive to damage from static electricity than early CMOS.

**Disadvantages of TTL:**

1. **Higher power consumption** (it draws power even when not switching), so it produces more heat.
2. Needs a **fixed 5 V** supply.
3. Lower noise margin than CMOS.

### MOS Gates (PMOS and NMOS)

**MOS logic** uses **MOSFETs** as switches. A MOSFET is controlled by the **voltage** on its gate (almost no gate current flows), so MOS gates take very little input current, and many can be packed into a small area of silicon.

1. **PMOS logic:** uses only **p-channel** MOSFETs. It was the main MOS technology in the 1960s, but it is slow and is now obsolete.
2. **NMOS logic:** uses only **n-channel** MOSFETs. It is **faster than PMOS** and was widely used in microprocessors and computers in the 1970s, until CMOS replaced it in the 1980s.

**Structure of an NMOS gate:** NMOS transistors form a **pull-down network** between the output and ground, and a **load** (a resistor, or a transistor acting as a resistor) **pulls the output up** to VDD.

1. **NMOS NOR gate:** two NMOS transistors **in parallel**. If **either** input is 1, a transistor turns on and pulls the output to 0; the output is 1 only when both inputs are 0. So Y = (A + B)′.
2. **NMOS NAND gate:** two NMOS transistors **in series**. The output is pulled to 0 only when **both** inputs are 1. So Y = (AB)′.

![NMOS NOR gate: two NMOS transistors in parallel with a pull-up load](/diagrams/digital-logic/nmos-nor.svg)

**Drawback of NMOS:** when the output is low, current flows continuously from VDD through the load and the conducting transistor, so the gate wastes power (**static power dissipation**) and produces heat.

### CMOS (Complementary MOS)

**Definition:** CMOS is a MOS logic family that uses **complementary pairs of p-channel (PMOS) and n-channel (NMOS) MOSFETs**.

The **PMOS transistors form a pull-up network** (between VDD and the output) and the **NMOS transistors form a pull-down network** (between the output and ground). For every input combination, one network is ON and the other is OFF. CMOS was presented by Frank Wanlass and Chih-Tang Sah of Fairchild Semiconductor in **1963**; RCA's **CD4000 series** (1968) was an early CMOS logic family. CMOS is now the **most common technology** for digital ICs, including microprocessors and memories.

#### CMOS Inverter (NOT Gate)

One PMOS and one NMOS transistor are connected in series between VDD and ground, with their gates joined as the input and their drains joined as the output.

![CMOS inverter: a PMOS transistor above an NMOS transistor](/diagrams/digital-logic/cmos-inverter.svg)

| Input A | PMOS | NMOS | Output Y |
| --- | --- | --- | --- |
| 0 (low) | ON | OFF | 1 (connected to VDD) |
| 1 (high) | OFF | ON | 0 (connected to ground) |

In either state, one transistor is OFF, so there is **no direct path from VDD to ground**, and almost **no current flows** when the gate is not switching.

#### CMOS NAND and NOR Gates

1. **CMOS NAND:** the two **PMOS** transistors are **in parallel** and the two **NMOS** transistors are **in series**. The output goes low only when both NMOS transistors are on, that is, when **both inputs are 1**.
2. **CMOS NOR:** the two **PMOS** transistors are **in series** and the two **NMOS** transistors are **in parallel**. The output goes low when **either input is 1**.

(The pull-up and pull-down networks are always **duals**: where the PMOS transistors are in parallel, the NMOS transistors are in series, and vice versa.)

![CMOS NAND gate: PMOS transistors in parallel and NMOS transistors in series](/diagrams/digital-logic/cmos-nand.svg)

![CMOS NOR gate: PMOS transistors in series and NMOS transistors in parallel](/diagrams/digital-logic/cmos-nor.svg)

#### Characteristics of CMOS

1. **Very low power dissipation:** almost no static power; power is used mainly while switching (charging and discharging the load capacitance), so it rises with the switching frequency.
2. **High noise immunity:** the output swings fully between 0 V and VDD.
3. **High fan-out** (about 50), because MOSFET gates draw almost no input current.
4. **Wide supply-voltage range** (for example 3.3 V or 5 V; older series accept a wider range).
5. **High packing density**, so it is used for VLSI chips.
6. **Symmetric rise and fall times** and very small input current (little loading of the driving circuit).
7. **Disadvantages:** older CMOS series are **slower** than TTL (longer propagation delay); CMOS inputs are **sensitive to static electricity** (electrostatic discharge); fabrication is complex; it handles large currents less well than TTL; and very small CMOS transistors have **leakage current**, which adds some static power.

### Comparison of Logic Families

| Basis | DTL | TTL | NMOS | CMOS |
| --- | --- | --- | --- | --- |
| Devices used | Diodes and a bipolar transistor | Bipolar transistors | n-channel MOSFETs | p-channel and n-channel MOSFETs |
| Basic gate | NAND | NAND | NOR (or NAND) | NAND / NOR |
| Speed | Slow | Fast | Faster than PMOS | Slower than TTL (older series) |
| Power dissipation | Moderate | High (≈ 10 mW per gate, standard TTL) | Static power when output is low | Very low (almost no static power) |
| Noise immunity | Good | Moderate (0.4 V margin) | Lower than CMOS | High |
| Fan-out | Limited | 10 | — | About 50 |
| Supply voltage | — | Fixed 5 V | — | Wide range |
| Packing density | Low | Moderate | High | Very high |
| Present use | Obsolete | Glue logic, older designs | Obsolete | Most modern ICs |

### Differences Between TTL and CMOS

| Basis | TTL | CMOS |
| --- | --- | --- |
| Technology | Bipolar junction transistors | MOSFETs (PMOS and NMOS pairs) |
| Power consumption | High | Very low |
| Speed (propagation delay) | Faster (shorter delay) | Slower in older series |
| Noise immunity | Lower | Higher |
| Fan-out | Lower (10) | Higher (about 50) |
| Supply voltage | Fixed 5 V | Wide range (for example 3.3 V or 5 V) |
| Sensitivity to static electricity | Less sensitive | More sensitive |
| Packing density | Lower | Higher (used in VLSI) |
| Typical use | High-speed, older systems, glue logic | Battery-powered devices, microprocessors, memories |

## References {#references}

**TutorialsPoint**

- [Digital Electronics – Families](https://www.tutorialspoint.com/digital-electronics/digital-electronics-families.htm) — accessed 2026-11-01
- [Difference Between CMOS and TTL](https://www.tutorialspoint.com/article/difference-between-cmos-and-ttl) — accessed 2026-11-01

**GeeksforGeeks**
- [CMOS Inverter](https://www.geeksforgeeks.org/electronics-engineering/cmos-inverter/) — accessed 2026-11-01

- [Introduction to Logic Family](https://www.geeksforgeeks.org/digital-logic/introduction-to-logic-family/) — accessed 2026-11-01

**Additional sources**

- [Logic family](https://en.wikipedia.org/wiki/Logic_family) — Wikipedia, accessed 2026-11-01
- [Diode–transistor logic](https://en.wikipedia.org/wiki/Diode%E2%80%93transistor_logic) — Wikipedia, accessed 2026-11-01
- [Transistor–transistor logic](https://en.wikipedia.org/wiki/Transistor%E2%80%93transistor_logic) — Wikipedia, accessed 2026-11-01
- [NMOS logic](https://en.wikipedia.org/wiki/NMOS_logic) — Wikipedia, accessed 2026-11-01
- [CMOS](https://en.wikipedia.org/wiki/CMOS) — Wikipedia, accessed 2026-11-01
- [Three-state logic](https://en.wikipedia.org/wiki/Three-state_logic) — Wikipedia, accessed 2026-11-01
- [Noise margin](https://en.wikipedia.org/wiki/Noise_margin) — Wikipedia, accessed 2026-11-01
