---
description: Data encoding (line coding) - the purpose of line coding, signal elements, DC component and synchronization, and the NRZ-L, NRZ-I, Manchester and differential Manchester schemes with their rules, signal rates and a worked bit-pattern example.
updated: 2026-11-06
---

## NRZ, NRZI {#nrz-nrzi}

### Line Coding

Line coding is the **process of converting a sequence of bits (digital data) into a digital signal** for transmission.

At the sender, the data is **encoded** into a digital signal; at the receiver, the signal is **decoded** back into data. Line coding is used for digital-to-digital conversion, for example in Ethernet LANs and serial links.

### Important Terms

1. **Data element** — the smallest unit of information: a **bit**.
2. **Signal element** — the shortest unit (in time) of a digital signal: one constant level or one level change.
3. **Data rate (N)** — the number of data elements (bits) sent per second (bps).
4. **Signal rate (S)** — the number of signal elements sent per second (**baud**); the bandwidth needed depends on the signal rate.
5. **r** — the number of data elements carried by one signal element.

> **S = N / r** (in the worst case, with the most level changes)

Here **S** is the signal rate in baud, **N** the data rate in bps, and **r** the number of bits per signal element (r = 1 for NRZ, r = ½ for Manchester, which needs two signal elements per bit).

### Problems a Line Code Must Avoid

1. **Baseline wandering** — the receiver decides 0 or 1 by comparing the signal with a running average (the baseline). A long run of the same level shifts this average and causes decoding errors.
2. **DC component** — when the signal level stays constant for a long time, it creates very low frequencies (near zero) that some media, such as transformer-coupled telephone lines, cannot pass.
3. **Lack of self-synchronization** — the receiver's bit intervals must match the sender's. If the signal has no level changes for a long time, the receiver's clock can drift and miscount bits. A **self-synchronizing** signal has transitions that mark the start, middle or end of each bit.

### Types of Line Coding

Line coding schemes are divided into five types:

1. **Unipolar** — all signal levels are on one side of zero (for example, unipolar NRZ).
2. **Polar** — the levels are on both sides of zero: **NRZ (NRZ-L and NRZ-I)**, RZ, and biphase (**Manchester** and **differential Manchester**).
3. **Bipolar** — three levels: positive, zero and negative (AMI, pseudoternary).
4. **Multilevel** — more than two levels, so that each signal element carries more than one bit (for example, 2B1Q).
5. **Multitransition** — the signal changes level in a fixed cycle (for example, MLT-3).

![The bit pattern 01001110 in NRZ-L, NRZ-I, Manchester and differential Manchester](/diagrams/computer-networks/line-coding.svg)

### Non-Return-to-Zero (NRZ)

Non-return-to-zero (NRZ) is a **polar line-coding scheme in which the signal level stays constant during the whole bit interval** and does not return to zero in the middle of the bit.

Each bit is one signal element (r = 1). NRZ has two forms: **NRZ-L** and **NRZ-I**.

### NRZ-L (NRZ-Level)

NRZ-L is a **form of NRZ in which the level of the voltage decides the value of the bit**: one level for 1 and the other for 0.

In the convention used in the figure, **1 = high (positive) voltage** and **0 = low (negative) voltage**. Some books use the opposite mapping (0 = positive, 1 = negative); only the rule "the level gives the bit" is fixed.

Example: 01001110 is sent as low, high, low, low, high, high, high, low.

Problems:

1. A long run of 0s or of 1s gives a constant level, causing **baseline wandering** and a loss of **synchronization**.
2. If the polarity of the wires is accidentally reversed, **all bits are inverted**.

Use: RS-232 serial ports.

### NRZ-I (NRZ-Invert)

NRZ-I (NRZI) is a **form of NRZ in which a change (inversion) of the voltage level at the start of a bit represents 1, and no change represents 0**.

The value of a bit depends on whether the level changes, not on the level itself, so reversing the polarity of the wires does not affect decoding.

Example: starting from the low level, 01001110 is sent as low (0: no change), high (1: invert), high, high, low (1: invert), high (1: invert), low (1: invert), low (0: no change).

Advantages and problems:

1. Long runs of **1s** cause a transition in every bit, so they keep synchronization; only long runs of **0s** cause baseline wandering and loss of synchronization (half the problem of NRZ-L).
2. It still has a DC component when long runs of 0s occur.

Some systems use the inverted rule (**0 = transition, 1 = no change**), for example **USB** and HDLC, which also insert extra bits (**bit stuffing**) to avoid long runs without transitions.

### NRZ-L vs NRZ-I

| Basis | NRZ-L | NRZ-I |
| --- | --- | --- |
| Bit decided by | Level of the signal | Presence or absence of a transition |
| Bit 1 | One level (for example, high) | Inversion of the level |
| Bit 0 | The other level (for example, low) | No change |
| Long run of 1s | Constant level — synchronization lost | Transition in every bit — no problem |
| Long run of 0s | Constant level — synchronization lost | Constant level — synchronization lost |
| Reversed polarity | All bits inverted | No effect |
| Signal rate (worst case) | N | N |

### Signal Rate of NRZ

In NRZ, each bit is one signal element (r = 1), so the signal rate in the worst case equals the data rate: **S = N**.

**Example:** at a data rate of 10 Mbps, NRZ needs at most **10 Mbaud** (10 million signal elements per second).

## Manchester and Differential Manchester {#manchester-and-differential-manchester}

### Biphase Schemes

Manchester and differential Manchester are called **biphase** schemes. Each bit interval is divided into **two halves**, and there is always a **transition in the middle of the bit**. This mid-bit transition gives **self-synchronization**: the receiver can recover the sender's clock from the signal itself.

### Manchester Encoding

Manchester encoding is a **line-coding scheme in which every bit has a transition in the middle of the bit interval, and the direction of that transition represents the bit**.

It combines the ideas of RZ (a transition in the middle of the bit) and NRZ-L (two levels). The convention of **IEEE 802.3 (Ethernet)** is:

1. **Bit 1** — a **low-to-high** transition in the middle of the bit.
2. **Bit 0** — a **high-to-low** transition in the middle of the bit.

The original convention of G. E. Thomas (1949), used in some textbooks, is the opposite (0 = low-to-high, 1 = high-to-low). Inverting the signal turns one convention into the other.

Example (IEEE 802.3): 01001110 is sent as high-low, low-high, high-low, high-low, low-high, low-high, low-high, high-low; when two equal bits follow each other, an extra transition is needed at the bit boundary.

Use: **10 Mbps Ethernet** (IEEE 802.3), RFID and consumer infrared remote controls.

### Differential Manchester Encoding

Differential Manchester encoding is a **line-coding scheme in which there is always a transition in the middle of the bit, and the value of the bit is decided by whether there is a transition at the start of the bit**.

It combines the ideas of RZ and NRZ-I. In the convention used by the reference websites and in the figure:

1. **Bit 0** — a **transition at the start** of the bit (plus the mid-bit transition).
2. **Bit 1** — **no transition at the start** of the bit (only the mid-bit transition).

Some systems use the reverse rule (transition at the start = 1). Because only the presence of transitions matters, reversing the polarity of the wires does not affect decoding.

Use: **IEEE 802.5 Token Ring** LANs.

### Advantages and Disadvantages of Biphase Schemes

**Advantages:**

1. **Self-synchronizing** — a transition in every bit lets the receiver keep its clock in step.
2. **No DC component** and **no baseline wandering** — each bit spends half its time at each level.

**Disadvantage:**

1. **Twice the signal rate (bandwidth) of NRZ** — each bit needs two signal elements (r = ½), so S = N / ½ = **2N** in the worst case.

**Example:** 10 Mbps Ethernet with Manchester encoding needs up to 10 × 2 = **20 Mbaud** (20 million signal elements per second), while NRZ would need only 10 Mbaud for the same data rate.

### Manchester vs Differential Manchester

| Basis | Manchester | Differential Manchester |
| --- | --- | --- |
| Mid-bit transition | Always; its direction gives the bit | Always; used only for synchronization |
| Bit decided by | Direction of the mid-bit transition | Presence of a transition at the start of the bit |
| Bit 1 (convention used here) | Low-to-high in the middle | No transition at the start |
| Bit 0 (convention used here) | High-to-low in the middle | Transition at the start |
| Combines | RZ and NRZ-L | RZ and NRZ-I |
| Reversed polarity | All bits inverted | No effect |
| Complexity | Simpler | More complex |
| Signal rate (worst case) | 2N | 2N |
| Used in | Ethernet (IEEE 802.3) | Token Ring (IEEE 802.5) |

### Comparison of NRZ and Biphase Schemes

| Scheme | Bit decided by | Self-synchronizing | DC component | Signal rate (worst case) |
| --- | --- | --- | --- | --- |
| NRZ-L | Level | No | Yes | N |
| NRZ-I | Transition at start (1) | Only for runs of 1s | Yes | N |
| Manchester | Direction of mid-bit transition | Yes | No | 2N |
| Differential Manchester | Transition at start (0) | Yes | No | 2N |

## References {#references}

**GeeksforGeeks**

- [Digital to Digital Conversion in Computer Network](https://www.geeksforgeeks.org/computer-networks/digital-to-digital-conversion-in-computer-network/) — accessed 2026-11-06 (unipolar, polar NRZ-L and NRZ-I, RZ, Manchester, differential Manchester, bipolar). It places the differential Manchester rule in the middle of the bit ("transition at the middle of the bit interval to represent bit 0"); the bit value is decided by the transition at the **start** of the bit, as in its other pages and the other reference websites.
- [Manchester Encoding in Computer Network](https://www.geeksforgeeks.org/computer-networks/manchester-encoding-in-computer-network/) and [Difference Between Manchester and Differential Manchester Encoding](https://www.geeksforgeeks.org/computer-networks/difference-between-manchester-and-differential-manchester-encoding/) — accessed 2026-11-06 (both conventions of Manchester, Ethernet and Token Ring, comparison). These pages mix the two Manchester conventions within one page, and one says Manchester "adds a redundant bit … enabling error correction"; Manchester adds transitions, not error-correcting bits. The conventions above follow Wikipedia.

**TutorialsPoint**

- [Digital Transmission](https://www.tutorialspoint.com/data_communication_computer_network/digital_transmission.htm) — accessed 2026-11-06 (line coding; unipolar, polar and bipolar encoding; NRZ-L, NRZ-I, RZ, Manchester, differential Manchester). It says differential Manchester "changes phase only when 1 is encountered", which reverses the rule used by the other reference websites (a start-of-bit transition for 0).

**TpointTech**

- [Digital Transmission](https://www.tpointtech.com/computer-network-digital-transmission) — accessed 2026-11-06 (unipolar, polar NRZ-L and NRZ-I, RZ, biphase Manchester and differential Manchester, bipolar AMI, B8ZS, HDB3). It gives NRZ-L as 0 = positive and 1 = negative, the opposite mapping to GeeksforGeeks; both are in use, as noted above. A sentence describing differential Manchester is labelled "Manchester Encoding".

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — checked 2026-11-06; it has no item on line coding.

**Programiz**

- Programiz has no page on line coding (checked 2026-11-06).

**Additional sources** (used because the reference websites disagree on the Manchester conventions and do not give the signal-rate formula)

- Wikipedia, [Manchester code](https://en.wikipedia.org/wiki/Manchester_code), [Differential Manchester encoding](https://en.wikipedia.org/wiki/Differential_Manchester_encoding) and [Non-return-to-zero](https://en.wikipedia.org/wiki/Non-return-to-zero) — accessed 2026-11-06 (G. E. Thomas and IEEE 802.3 conventions, the two variants of differential Manchester and NRZI, USB and HDLC bit stuffing, twice the bandwidth of NRZ).
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapter 4 (data and signal elements, S = N / r, baseline wandering, DC component, self-synchronization, classification of line coding schemes). The diagram was generated from the encoding rules by a script, and the examples were checked against it.
