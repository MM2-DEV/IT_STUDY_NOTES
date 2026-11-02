---
description: Counters, the modulus of a counter, synchronous and asynchronous counters, the asynchronous ripple up and down counter with its timing diagram, and the decade (MOD-10) counter.
updated: 2026-11-01
---

## Basic Counters {#basic-counters}

**Definition:** a counter is a **sequential circuit that counts the clock pulses** applied to it. It is a group of **flip-flops** connected so that, with every clock pulse, the stored binary number moves to the next value of a fixed sequence (for example 0, 1, 2, 3, …). Counting is the most widely used application of flip-flops (see [Flip-Flops](/topics/digital-logic/flip-flops)). The output of a counter shows the **number of pulses received, in binary**.

**Why counters are needed:** many devices must do things in a sequence or for a set time. For example, a **microwave oven** cooks for the time that has been set and then switches itself off when the time is up (the count reaches 0); a counter at the door of a hall can count the people entering and leaving and show how many seats are still empty. With a counter and a decoder, operations can be controlled one after another automatically, for example switching motors, heaters and switches on and off.

**States of a counter:** each combination of the flip-flop outputs is a **state**. A 3-bit binary counter (3 flip-flops) goes through the 8 states 000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 and then back to 000:

```text
          000
       ↗       ↘
    111          001
     ↑             ↓
    110          010
     ↑             ↓
    101          011
       ↖       ↙
          100
```

### Modulus (MOD Number)

**Definition:** the **modulus (MOD number)** of a counter is the **number of different states** it goes through before returning to its starting state. A MOD-N counter counts from 0 to N − 1 and then returns to 0.

1. A counter with **n flip-flops** can have at most **2ⁿ states**, so its maximum MOD number is 2ⁿ.
2. The **largest number** it can count to is **2ⁿ − 1**.
3. To build a MOD-N counter, the number of flip-flops n must satisfy **2ⁿ ≥ N** (n is at least log₂N).

| Flip-flops (n) | States (2ⁿ) | Count range | Name |
| --- | --- | --- | --- |
| 2 | 4 | 0 to 3 | MOD-4 counter |
| 3 | 8 | 0 to 7 | MOD-8 counter |
| 4 | 16 | 0 to 15 | MOD-16 counter |

**Example:** a MOD-10 (decade) counter needs 4 flip-flops, because 2³ = 8 is less than 10 and 2⁴ = 16 is enough.

**Frequency division:** the last flip-flop of a MOD-N counter completes one cycle for every N clock pulses, so a MOD-N counter **divides the clock frequency by N**. For example, a MOD-8 counter driven by an 8 kHz clock gives 1 kHz at its last output.

### Classification of Counters

1. **By the way the clock is applied:**
   1. **Asynchronous (ripple or serial) counter:** only the **first** flip-flop receives the external clock; each of the other flip-flops is clocked by the **output of the previous flip-flop** (see [Asynchronous Ripple Counter](#asynchronous-ripple-counter)).
   2. **Synchronous (parallel) counter:** **all** the flip-flops receive the **same clock at the same time**, so they all change together. Logic gates between the flip-flops decide which ones toggle.
2. **By the direction of counting:**
   1. **Up counter:** counts upwards (0, 1, 2, …).
   2. **Down counter:** counts downwards (…, 2, 1, 0).
   3. **Up/down counter:** can count in either direction, selected by a mode-control input.
3. **By the modulus:** MOD-4, MOD-8, MOD-10 (decade), MOD-16 and so on.
4. **Shift-register counters:**
   1. **Ring counter:** a shift register whose last output is fed back to the first input; one 1 circulates around the ring. n flip-flops give **n states**. It is *self-decoding* (each state is shown by one flip-flop).
   2. **Johnson (twisted-ring) counter:** a shift register whose **inverted** last output is fed back to the first input. n flip-flops give **2n states**.

### Synchronous Counter (2-bit Example)

In a 2-bit synchronous up counter, both JK flip-flops receive the clock together:

1. **FF-A** (the LSB) has **J = K = 1**, so it toggles on every clock pulse.
2. **FF-B** (the MSB) has **J = K = QA**, so it toggles only on the pulses when QA = 1.

The count sequence QB QA is 00 → 01 → 10 → 11 → 00, the same as a ripple counter, but both outputs change at the same instant.

**3-bit synchronous counter (JK flip-flops FF0, FF1, FF2):**

1. **FF0** has J = K = 1 (high), so it toggles on **every** clock pulse.
2. **FF1** has J = K = Q0, so it toggles when **Q0 = 1**.
3. **FF2** has J = K = Q0 · Q1 (through an **AND gate**), so it toggles when **both Q0 and Q1 are 1**.

All three flip-flops receive the clock at the same time, so there is **no cumulative (ripple) delay**. **Ring counters** and **MOD-10 synchronous counters** are other examples of synchronous counters.

### Differences Between Asynchronous and Synchronous Counters

| Basis | Asynchronous (ripple) counter | Synchronous counter |
| --- | --- | --- |
| Clock | Only the first flip-flop gets the external clock | All flip-flops get the same clock |
| Clocking of the other flip-flops | By the output of the previous flip-flop | By the common clock |
| Change of outputs | One after another (the change "ripples") | All at the same time |
| Propagation delay | Adds up through all the stages | Only one flip-flop delay (plus the gates) |
| Speed | Slower | Faster |
| Extra logic gates | Not needed for simple up counting | Needed between the flip-flops |
| Design | Simple | More complex |
| Decoding errors (glitches) | Possible during the ripple | None |
| Other name | Ripple counter, serial counter | Parallel counter |
| Count sequence | Fixed sequence (up or down) | Can be designed for any sequence |
| Examples | Ripple up counter, ripple down counter | Ring counter, Johnson counter, synchronous MOD-10 counter |

**Applications of counters:**

1. **Digital clocks** and watches
2. **Frequency counters** and frequency dividers
3. **Time measurement** (timers)
4. Analog-to-digital converters (see [A/D and D/A Conversion](/topics/digital-logic/ad-da-conversion))
5. Counting objects or **events** (for example, people passing a gate)
6. Generating **digital timing signals** and control sequences, and **controlling the operations** of digital electronic devices
7. **Digital computers**

## Asynchronous Ripple Counter {#asynchronous-ripple-counter}

**Definition:** an asynchronous counter is a counter in which **only the first flip-flop is clocked by the external clock**, and **every other flip-flop is clocked by the output of the flip-flop before it**. A change at the first flip-flop passes on (**ripples**) through the chain like a wave, so it is also called a **ripple counter** (or serial counter).

### Construction of a 3-bit Ripple Up Counter

1. Three **JK flip-flops** with **J = K = 1** (or T flip-flops with T = 1) are used, so each flip-flop **toggles** whenever it is clocked.
2. The flip-flops are **negative-edge triggered**: they toggle when their clock input falls from 1 to 0.
3. The external clock drives **FF0** only. **Q0** drives the clock of **FF1**, and **Q1** drives the clock of **FF2**.
4. **Q0 is the LSB** and **Q2 is the MSB**; the count is read as Q2 Q1 Q0.

![3-bit ripple up counter: three JK flip-flops with J = K = 1; each Q output clocks the next flip-flop](/diagrams/digital-logic/ripple-counter-3bit.svg)

### Working

1. **FF0** toggles at **every falling edge of the clock**.
2. **FF1** toggles whenever **Q0 falls** from 1 to 0, which happens every second clock pulse.
3. **FF2** toggles whenever **Q1 falls** from 1 to 0, which happens every fourth clock pulse.

Starting from 000, the outputs step through the binary numbers 0 to 7 and then return to 0:

| Clock pulse | Q2 | Q1 | Q0 | Count | What happens |
| --- | --- | --- | --- | --- | --- |
| Initial | 0 | 0 | 0 | 0 | All flip-flops cleared |
| 1 | 0 | 0 | 1 | 1 | Q0 rises (0 → 1); FF1 not clocked |
| 2 | 0 | 1 | 0 | 2 | Q0 falls, so FF1 toggles |
| 3 | 0 | 1 | 1 | 3 | Q0 rises |
| 4 | 1 | 0 | 0 | 4 | Q0 falls → Q1 falls → FF2 toggles |
| 5 | 1 | 0 | 1 | 5 | Q0 rises |
| 6 | 1 | 1 | 0 | 6 | Q0 falls, so FF1 toggles |
| 7 | 1 | 1 | 1 | 7 | Q0 rises |
| 8 | 0 | 0 | 0 | 0 | All three toggle in turn; the counter returns to 0 |

![Timing diagram of a 3-bit ripple counter showing CLK, Q0, Q1 and Q2](/diagrams/digital-logic/ripple-counter-timing.svg)

The timing diagram shows that **Q0 has half the clock frequency, Q1 one quarter, and Q2 one eighth**: each flip-flop divides the frequency by 2. With an 8 kHz clock, Q0 = 4 kHz, Q1 = 2 kHz and Q2 = 1 kHz.

### Ripple Down Counter

A ripple counter counts **downwards** (7, 6, 5, …, 0, 7, …) if each flip-flop is clocked by the **complemented output Q′** of the previous flip-flop instead of Q (with negative-edge triggering). An **up/down ripple counter** uses a mode-control input M and gates between the stages: one value of M passes Q to the next clock input (up counting), and the other passes Q′ (down counting).

### Propagation Delay

Each flip-flop takes a short time (its **propagation delay**) to change after its clock edge. In a ripple counter, the later flip-flops cannot change until the earlier ones have changed, so the **delays add up**: in the worst case (for example, from 111 to 000), the last flip-flop changes only after the delays of all the flip-flops. Because of this:

1. The counter output is correct only after the ripple has finished; during the ripple, **false intermediate states** appear for a short time (for example, 111 passes through 110 and 100 before reaching 000).
2. The clock period must be longer than the total delay, so ripple counters are **not suitable for high clock frequencies**, and the problem grows with the number of flip-flops.

### Advantages and Disadvantages

**Advantages:**

1. **Simple** design: no extra gates are needed for basic counting.
2. Needs **few components**, so it is cheap.
3. Each stage is a natural **divide-by-2** circuit, so it is convenient as a frequency divider.

**Disadvantages:**

1. **Slow**, because the propagation delays add up.
2. **False intermediate states (glitches)** while the change ripples through.
3. Not suitable for **high-frequency** operation or for long counters.

## Decade Counter {#decade-counter}

**Definition:** a decade counter is a **MOD-10 counter**: it has **10 states** and returns to its starting state after the tenth clock pulse. A decade counter that counts in **BCD**, from **0000 (0) to 1001 (9)**, is called a **BCD counter** (see [BCD](/topics/number-systems/binary-codes#bcd-binary-coded-decimal)).

**Number of flip-flops:** 10 states need **4 flip-flops** (2⁴ = 16 ≥ 10). A 4-bit counter would normally count 0 to 15, so the **six states 1010 to 1111 must be skipped**.

### Construction (Asynchronous Decade Counter)

1. Four negative-edge-triggered JK flip-flops (J = K = 1) are connected as a **4-bit ripple counter** (FF0 = LSB to FF3 = MSB).
2. A **2-input NAND gate** receives **Q3 and Q1**. Its output is connected to the active-low **CLEAR (CLR)** inputs of all the flip-flops.
3. The count 10 is **1010**; it is the first count at which **Q3 = 1 and Q1 = 1** together. At that moment the NAND output becomes 0 and **immediately clears all the flip-flops to 0000**.

![Decade ripple counter: four JK flip-flops with a NAND gate on Q3 and Q1 driving the clear inputs](/diagrams/digital-logic/decade-counter.svg)

### Count Sequence

| Clock pulse | Q3 | Q2 | Q1 | Q0 | Decimal |
| --- | --- | --- | --- | --- | --- |
| Initial | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 2 | 0 | 0 | 1 | 0 | 2 |
| 3 | 0 | 0 | 1 | 1 | 3 |
| 4 | 0 | 1 | 0 | 0 | 4 |
| 5 | 0 | 1 | 0 | 1 | 5 |
| 6 | 0 | 1 | 1 | 0 | 6 |
| 7 | 0 | 1 | 1 | 1 | 7 |
| 8 | 1 | 0 | 0 | 0 | 8 |
| 9 | 1 | 0 | 0 | 1 | 9 |
| 10 | 1 → 0 | 0 | 1 → 0 | 0 | 1010 appears for a moment, then the counter is cleared to 0000 |

So the counter goes 0, 1, 2, …, 9, 0, 1, … The state 1010 exists only for the very short time needed to clear the flip-flops. The last flip-flop (Q3) completes one cycle every 10 clock pulses, so a decade counter **divides the frequency by 10**.

**The same method gives any MOD-N counter:** connect to the NAND gate the outputs that are 1 in the binary value of N. For example, a **MOD-6** counter (3 flip-flops) is cleared at 110, so its NAND gate takes **Q2 and Q1**.

### Decade Counter IC

The **74LS90** is a decade counter IC. It contains a **divide-by-two** counter and a **divide-by-five** counter (four flip-flops in all). Connecting the output **QA** to the clock input **CKB** gives a BCD decade counter (0 to 9). It also has gated **reset-to-zero** inputs and **set-to-nine** inputs.

**Applications of decade counters:**

1. **Digital clocks** and timers (counting seconds and minutes in decimal digits)
2. **Frequency counters** and digital meters
3. Driving **BCD to seven-segment decoders** for decimal displays (see [Seven-Segment Decoder and Display](/topics/digital-logic/combinational-circuits#seven-segment-decoder-and-display))
4. **Divide-by-10** frequency division

## References {#references}

**TutorialsPoint**

- [Digital Circuits – Counters](https://www.tutorialspoint.com/digital_circuits/digital_circuits_counters.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Synchronous vs. Asynchronous Counter](https://www.geeksforgeeks.org/digital-logic/differences-between-synchronous-and-asynchronous-counter/) — accessed 2026-11-01
- [Counters in Digital Logic](https://www.geeksforgeeks.org/digital-logic/counters-in-digital-logic/) — accessed 2026-11-01
- [Shift Registers in Digital Logic](https://www.geeksforgeeks.org/digital-logic/shift-registers-in-digital-logic/) (ring and Johnson counters) — accessed 2026-11-01

**TpointTech**

- [Ripple Counter in Digital Electronics](https://www.tpointtech.com/ripple-counter-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- *Information and Communication Technology* (Class XI–XII), Chapter 3: Number System and Digital Device (counter) — reference book supplied by the project owner
- [SN74LS90 product page](https://www.ti.com/product/SN74LS90) — Texas Instruments, accessed 2026-11-01
