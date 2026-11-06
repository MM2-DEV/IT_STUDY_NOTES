---
description: Data link control - line discipline, flow control and error control; types of errors; parity, checksum and Hamming code; stop-and-wait, Go-Back-N and Selective Repeat ARQ with efficiency and window formulas; CRC with modulo-2 division; and the HDLC protocol, its modes, frame format, frame types and bit stuffing.
updated: 2026-11-06
---

## Error Control and Flow Control {#error-control-and-flow-control}

### Data Link Control

Data link control is the **set of services provided by the data link layer for reliable data transfer between two directly connected nodes**: line discipline, flow control and error control.

1. **Line discipline** — decides which device may send and when.
2. **Flow control** — stops the sender from sending faster than the receiver can accept.
3. **Error control** — detects damaged or lost frames and gets them corrected or resent.

### Line Discipline

Line discipline coordinates the devices on a link. It is done in two ways:

1. **ENQ/ACK (enquiry/acknowledgement)** — used on a dedicated (point-to-point) link. The sender sends an **ENQ** frame asking whether the receiver is ready; the receiver answers with **ACK** (ready) or **NAK** (not ready). After sending its data, the sender ends with an **EOT** (end of transmission) frame.
2. **Poll/Select** — used when one **primary** device controls several **secondary** devices. In **select**, the primary tells a secondary to get ready to receive data. In **poll**, the primary asks each secondary in turn whether it has data to send.

### Types of Errors

An error occurs when the bits received are not the same as the bits sent, usually because of noise.

1. **Single-bit error** — only **one bit** of the data unit is changed (1 to 0 or 0 to 1).
2. **Burst error** — **two or more bits** in the data unit are changed. The length of the burst is counted from the first changed bit to the last changed bit, even if some bits in between are unchanged. Burst errors are more common, because noise usually lasts longer than one bit.

### Error Control

Error control is the **detection and correction of errors in frames, including the retransmission of damaged or lost frames**.

Errors are handled in two ways:

1. **Error detection** — the receiver only finds out whether an error has occurred, and the frame is then resent (**backward error correction**, done by ARQ).
2. **Error correction** — the receiver finds the exact bits in error and corrects them itself, without retransmission (**forward error correction, FEC**).

Both need **redundancy**: extra bits are added to the data at the sender and checked at the receiver.

### Error Detection Methods

There are four common methods of error detection:

1. Simple parity check
2. Two-dimensional parity check
3. Checksum
4. Cyclic redundancy check (CRC) — explained in [CRC](#crc)

#### 1. Simple Parity Check

**Simple parity check** is an error-detection method that adds **one extra bit (the parity bit)** to each data unit so that the total number of 1s is even (**even parity**) or odd (**odd parity**).

**Example (even parity):** the data 1011001 has four 1s (already even), so the parity bit is **0** and 10110010 is sent. If one bit changes, the number of 1s becomes odd and the receiver detects the error.

It detects **all single-bit errors** and all errors that change an **odd number** of bits, but it **cannot detect** an even number of changed bits (for example, two bits changed).

#### 2. Two-Dimensional Parity Check

**Two-dimensional parity check** is an error-detection method in which the data is arranged as a **table (rows and columns)** and a parity bit is calculated for **each row and each column**.

The extra row of column parities (and the row parity bits) are sent with the data.

It detects most burst errors and can even locate a single-bit error (the row and column whose parities fail), but some patterns — such as two errors in each of two rows, in the same columns — are not detected.

#### 3. Checksum

A checksum is an **error-detection method in which the data is divided into k segments of m bits, the segments are added using ones' complement arithmetic, and the complement of the sum is sent as the checksum**.

**At the sender:**

1. Divide the data into segments of m bits.
2. Add all segments using ones' complement arithmetic (any carry out of the left is added back at the right — "wrap around").
3. Complement the sum (change 0s to 1s and 1s to 0s); this is the **checksum**, sent with the data.

**At the receiver:** add all segments **and the checksum** in the same way and complement the result. If the result is **0** (the sum is all 1s), the data is accepted; otherwise it is rejected.

**Example (4-bit segments):** the data is 7, 11, 12, 0, 6.

1. Sum = 7 + 11 + 12 + 0 + 6 = 36 = 100100₂.
2. Wrap around the carry: 0100₂ + 10₂ = 0110₂ = **6**.
3. Checksum = complement of 0110 = 1001₂ = **9**. The sender sends 7, 11, 12, 0, 6, 9.
4. Receiver: 7 + 11 + 12 + 0 + 6 + 9 = 45 = 101101₂; wrapping gives 1101₂ + 10₂ = 1111₂ = 15; its complement is **0**, so no error is detected.

The checksum is used in the Internet (IP, TCP and UDP headers use a 16-bit checksum).

### Forward Error Correction: Hamming Code

**Hamming code** is an **error-correcting code that adds redundant (parity) bits at the positions that are powers of 2, so that the receiver can find and correct a single-bit error**.

The number of redundant bits **r** needed for **m** data bits must satisfy:

> **2ʳ ≥ m + r + 1**

Here **m** is the number of data bits and **r** the number of redundant bits; the r bits must be able to point to any of the m + r bit positions, or show "no error".

**Examples:** for m = 4, r = 3 (2³ = 8 ≥ 4 + 3 + 1 = 8); for m = 7 (an ASCII character), r = 4 (2⁴ = 16 ≥ 7 + 4 + 1 = 12).

**Positions:** the redundant bits are placed at positions **1, 2, 4, 8, …**. Each redundant bit is the (even) parity of the positions whose binary number contains it:

1. **r1** (position 1) checks positions 1, 3, 5, 7, 9, 11, …
2. **r2** (position 2) checks positions 2, 3, 6, 7, 10, 11, …
3. **r4** (position 4) checks positions 4, 5, 6, 7, 12, 13, 14, 15, …
4. **r8** (position 8) checks positions 8–15, 24–31, …

**Example (encoding the data 1011 with even parity):** place the data bits, from left to right, at positions 3, 5, 6, 7: d3 = 1, d5 = 0, d6 = 1, d7 = 1.

1. r1 = parity of positions 3, 5, 7 = 1 + 0 + 1 → **0**.
2. r2 = parity of positions 3, 6, 7 = 1 + 1 + 1 → **1**.
3. r4 = parity of positions 5, 6, 7 = 0 + 1 + 1 → **0**.
4. The code word (positions 1 to 7) is **0110011**.

**Correcting an error:** suppose bit 6 is changed and **0110001** is received. The receiver recomputes the checks:

1. Check 1 (positions 1, 3, 5, 7): 0 + 1 + 0 + 1 = even → **0**.
2. Check 2 (positions 2, 3, 6, 7): 1 + 1 + 0 + 1 = odd → **1**.
3. Check 4 (positions 4, 5, 6, 7): 0 + 0 + 0 + 1 = odd → **1**.

The checks, read as c4 c2 c1 = **110₂ = 6**, give the position of the error, so bit 6 is inverted to recover 0110011.

A Hamming code corrects single-bit errors only. With one extra overall parity bit (SECDED), it can also detect (but not correct) double-bit errors.

### Hamming Distance

**Hamming distance** is the **number of bit positions in which two words of the same length differ** (the number of 1s in their XOR).

For example, the distance between 10101 and 11110 is 3 (10101 ⊕ 11110 = 01011).

The **minimum Hamming distance (d_min)** of a code is the smallest distance between any two valid code words:

> **To detect up to s errors: d_min ≥ s + 1**

> **To correct up to t errors: d_min ≥ 2t + 1**

Here **s** is the number of errors to be detected and **t** the number to be corrected. **Example:** a code with d_min = 3 can **detect up to 2** errors or **correct 1** error; this is the case for the Hamming code above.

### Flow Control

Flow control is a **set of procedures that tells the sender how much data it can send before it must wait for an acknowledgement from the receiver**, so that a fast sender does not overwhelm a slow receiver.

The receiver has limited speed and limited buffer memory; if frames arrive faster than it can process them, they are lost. Flow control is done at the **data link layer** (node-to-node, between two directly connected devices) and at the **transport layer** (end-to-end, for example TCP's sliding window).

Flow control methods are of two types:

1. **Stop-and-wait** — the sender sends **one frame** and waits for its acknowledgement before sending the next.
2. **Sliding window** — the sender can send **several frames** (up to the window size) before it needs an acknowledgement.

### Sliding Window

**Sliding window** is a flow control method in which the **sender may send several frames, up to the window size, before it receives an acknowledgement**.

Frames are numbered **modulo 2ᵐ** with an **m-bit sequence number** (for example, 0 to 7 for m = 3). The **sender window** contains the frames that may be sent without waiting for an acknowledgement. When an acknowledgement arrives, the window **slides** forward over the next sequence numbers. An acknowledgement carries the number of the **next frame expected** (ACK 5 acknowledges all frames up to 4).

![Sender sliding window with 3-bit sequence numbers](/diagrams/computer-networks/sliding-window.svg)

**Piggybacking** is the technique of sending an acknowledgement **inside a data frame** going in the opposite direction, instead of in a separate frame; it saves bandwidth in two-way (full-duplex) communication.

### Automatic Repeat Request (ARQ)

**Automatic repeat request (ARQ)** is an **error-control method in which the receiver detects errors and the sender automatically retransmits frames that are damaged or lost**.

The receiver sends an **ACK** for a correct frame and may send a **NAK** for a damaged frame. The sender keeps a **timer** for each frame; if no ACK arrives before it expires (**timeout**), the frame is resent.

There are three types of ARQ:

1. Stop-and-wait ARQ
2. Go-Back-N ARQ
3. Selective Repeat ARQ

### 1. Stop-and-Wait ARQ

Stop-and-wait ARQ is an **ARQ protocol in which the sender sends one frame, keeps a copy, and waits for its acknowledgement before sending the next frame**.

Frames and ACKs are numbered alternately **0 and 1** (a 1-bit sequence number) so that a duplicate frame, sent again after a lost ACK, can be recognized. The sender and receiver windows are both **1**.

![Stop-and-wait ARQ with a lost frame](/diagrams/computer-networks/stop-and-wait.svg)

The link is idle while the sender waits, so stop-and-wait is inefficient when the propagation delay is long compared with the transmission time.

> **Transmission time: T_t = L / B**, **propagation time: T_p = d / v**, **a = T_p / T_t**

> **Efficiency of stop-and-wait: η = T_t / (T_t + 2T_p) = 1 / (1 + 2a)**

Here **L** is the frame size in bits, **B** the bandwidth (bps), **d** the length of the link, **v** the propagation speed, and **2T_p** the round-trip time (the processing time and the transmission time of the ACK are ignored).

**Example (satellite link):** one-way propagation delay = 250 ms, bandwidth = 1 Mbps, frame size = 1000 bytes = 8000 bits.

1. T_t = 8000 / 1 000 000 = **8 ms**; a = 250 / 8 = **31.25**.
2. η = 1 / (1 + 2 × 31.25) = 1 / 63.5 ≈ **0.0157 (1.57%)** — the link is idle about 98% of the time.
3. To keep the link fully busy, the sender must be able to send N frames during T_t + 2T_p: N ≥ (8 + 500) / 8 = 1 + 2a = 63.5, so a window of at least **64 frames** is needed.

### 2. Go-Back-N ARQ

Go-Back-N ARQ is a **sliding window ARQ protocol in which the sender can send up to N frames without acknowledgement, and when a frame is lost or damaged, the sender resends that frame and all frames sent after it**.

1. Sender window = **N**; receiver window = **1** (the receiver accepts frames only in order and discards out-of-order frames).
2. Acknowledgements are **cumulative**: ACK k acknowledges all frames before k.
3. With m-bit sequence numbers, the sender window must be at most **2ᵐ − 1**.

### 3. Selective Repeat ARQ

Selective Repeat ARQ is a **sliding window ARQ protocol in which only the frames that are lost or damaged are resent**, while the receiver buffers correct frames that arrive out of order.

1. Sender window = receiver window = **N**.
2. The receiver sends a **NAK** for a missing frame and **individual** ACKs; it delivers the frames to the upper layer in order.
3. With m-bit sequence numbers, each window must be at most **2ᵐ⁻¹** (half the sequence numbers); otherwise the receiver cannot tell a new frame from a resent old one.

![Go-Back-N and Selective Repeat when frame 1 is lost](/diagrams/computer-networks/gbn-sr.svg)

### Efficiency and Window Size of Sliding Window ARQ

> **Efficiency of Go-Back-N and Selective Repeat: η = N / (1 + 2a)** (when N < 1 + 2a; otherwise η = 1)

> **Maximum window: Go-Back-N: 2ᵐ − 1; Selective Repeat: 2ᵐ⁻¹**

Here **N** is the sender window size, **a = T_p / T_t**, and **m** the number of bits in the sequence number.

**Example 1:** a link has a = 2 (T_p is twice T_t). Stop-and-wait gives η = 1 / (1 + 4) = **20%**; Go-Back-N with N = 3 gives η = 3 / 5 = **60%**; with N ≥ 5 the link is fully used (100%).

**Example 2:** with a 3-bit sequence number (0–7), the Go-Back-N window can be at most 2³ − 1 = **7** frames, and the Selective Repeat window at most 2² = **4** frames.

### Comparison of ARQ Protocols

| Basis | Stop-and-wait ARQ | Go-Back-N ARQ | Selective Repeat ARQ |
| --- | --- | --- | --- |
| Sender window | 1 | N | N |
| Receiver window | 1 | 1 | N |
| Minimum sequence numbers | 2 | N + 1 | 2N |
| Maximum window (m bits) | 1 | 2ᵐ − 1 | 2ᵐ⁻¹ |
| Efficiency | 1 / (1 + 2a) | N / (1 + 2a) | N / (1 + 2a) |
| Acknowledgement | Individual | Cumulative | Individual (and NAK) |
| Out-of-order frames | Not accepted | Discarded | Buffered and accepted |
| Frames resent after one loss | 1 | The lost frame and all after it (up to N) | Only the lost frame |
| Buffers at receiver | 1 | 1 | N |
| Complexity | Lowest | Moderate | Highest |

### Flow Control vs Error Control

| Basis | Flow control | Error control |
| --- | --- | --- |
| Purpose | Prevent the sender from overwhelming the receiver | Detect and correct damaged or lost frames |
| Concerned with | Amount and rate of data sent | Correctness of the data received |
| Methods | Stop-and-wait, sliding window | Parity, checksum, CRC, Hamming code, ARQ |
| Problem prevented | Buffer overflow and data loss at the receiver | Acceptance of corrupted data |

## CRC {#crc}

### Definition of CRC

The cyclic redundancy check (CRC) is an **error-detection method in which the sender divides the data by a predetermined binary number (the generator, or divisor) using modulo-2 division, and sends the remainder (the CRC) with the data**.

The receiver divides the whole received code word by the same generator. If the remainder is **zero**, the data is accepted; otherwise an error is detected and the frame is discarded (and resent by ARQ). CRC is the most powerful of the common detection methods and is used in Ethernet, Wi-Fi and HDLC.

### Generator Polynomial

The generator is written as a **polynomial**: each bit is the coefficient of a power of x. For example, **1101 = x³ + x² + 1** and **1011 = x³ + x + 1**. If the generator has **k** bits (degree k − 1), the CRC remainder has **k − 1** bits.

### Modulo-2 Division

Modulo-2 division is long division in which **subtraction is replaced by XOR** (0 ⊕ 0 = 0, 0 ⊕ 1 = 1, 1 ⊕ 0 = 1, 1 ⊕ 1 = 0); there are no borrows or carries. At each step, if the leftmost bit of the current part is 1, the generator is XORed with it; if it is 0, all 0s are used instead.

### Steps of CRC

**At the sender:**

1. Append **k − 1 zeros** to the data (k = number of bits in the generator).
2. Divide the result by the generator using **modulo-2 division**.
3. The **k − 1-bit remainder** is the CRC; it replaces the appended zeros, and the **code word** (data + CRC) is sent.

**At the receiver:**

1. Divide the received code word by the same generator.
2. If the remainder is **all 0s**, there is no error; otherwise the frame has an error.

### Worked Example of CRC

**Data = 100100, generator = 1101 (x³ + x² + 1).** The generator has 4 bits, so 3 zeros are appended: 100100**000**.

```text
1101 ) 100100000
       1101          (XOR)
        1000
        1101         (XOR)
         1010
         1101        (XOR)
          1110
          1101       (XOR)
           0110
           0000      (leftmost bit is 0: XOR with 0000)
            1100
            1101     (XOR)
             001     <- remainder (CRC)
```

The CRC is **001**, so the code word sent is 100100**001**.

**Receiver (no error):** 100100001 ÷ 1101 gives remainder **000**, so the data is accepted.

**Receiver (with error):** if 100000001 is received (one bit changed), 100000001 ÷ 1101 gives remainder **011**, which is not zero, so the error is detected.

**Example 2:** data 1010000 with generator 1001 (x³ + 1) gives the remainder **011** and the code word 1010000**011**; data 11100 with the same generator gives the remainder **111** and the code word 11100**111**.

### Error Detection Power of CRC

With a well-chosen generator of degree r (r CRC bits), CRC detects:

1. **All single-bit errors.**
2. **All double-bit errors**, if the generator has suitable factors.
3. **All errors with an odd number of bits**, if the generator has the factor (x + 1).
4. **All burst errors of length ≤ r**, and most longer bursts.

Common standard generators include **CRC-16** (used in HDLC as CRC-CCITT) and **CRC-32** (used in Ethernet and Wi-Fi).

### Checksum vs CRC

| Basis | Checksum | CRC |
| --- | --- | --- |
| Method | Ones' complement addition of segments | Modulo-2 (XOR) division by a generator |
| Detection power | Lower | Higher, especially for burst errors |
| Computation | Simple, done easily in software | Done quickly in hardware (shift registers) |
| Used in | IP, TCP and UDP headers | Ethernet, Wi-Fi, HDLC frames |
| Layer | Network and transport layers | Data link layer |

## HDLC {#hdlc}

### Definition of HDLC

HDLC (High-level Data Link Control) is a **bit-oriented data link layer protocol, standardized by ISO, for communication over point-to-point and multipoint links**.

It is based on IBM's **SDLC** protocol and provides framing, flow control (sliding window) and error control (CRC and ARQ). Many protocols are derived from it, such as **LAPB** (X.25), **LAPD** (ISDN) and the framing of **PPP**; it is also the default serial-link encapsulation of Cisco routers.

### Types of Stations

1. **Primary station** — controls the link; its frames are called **commands**.
2. **Secondary station** — works under the control of the primary; its frames are called **responses**.
3. **Combined station** — acts as both primary and secondary; it can send both commands and responses.

### Link Configurations

1. **Unbalanced configuration** — one primary station and one or more secondary stations (point-to-point or multipoint).
2. **Balanced configuration** — two combined stations of equal rank (point-to-point).

### Transfer Modes

HDLC has three data transfer modes:

1. **Normal Response Mode (NRM)** — unbalanced; a secondary may send only when the primary **polls** it. Used on multipoint links.
2. **Asynchronous Response Mode (ARM)** — unbalanced; a secondary may send **without permission**, but the primary still controls the link (initialization, error recovery, disconnection). Rarely used.
3. **Asynchronous Balanced Mode (ABM)** — balanced; either **combined station** can start sending at any time. It is the most common mode on point-to-point links.

### HDLC Frame Format

![HDLC frame format and control-field formats](/diagrams/computer-networks/hdlc-frame.svg)

| Field | Size | Purpose |
| --- | --- | --- |
| Flag | 8 bits | Marks the start (and end) of the frame; always **01111110** (7E hexadecimal) |
| Address | 8 bits (or more) | Address of the secondary station |
| Control | 8 bits (16 in extended mode) | Frame type, sequence numbers N(S) and N(R), and the poll/final bit |
| Information | Variable | User data (in I-frames and some U-frames) |
| FCS (frame check sequence) | 16 or 32 bits | CRC for error detection |
| Flag | 8 bits | Marks the end of the frame (01111110) |

The **poll/final (P/F) bit** is the fifth bit of the control field: in a command from the primary it is the **poll** bit (asking for a response); in a response from a secondary it is the **final** bit (the end of its response).

### Types of HDLC Frames

HDLC has three types of frames, identified by the first bits of the control field:

1. **I-frame (information frame)** — control field starts with **0**. It carries **user data** together with a send sequence number **N(S)** and a piggybacked acknowledgement number **N(R)** (3 bits each, or 7 bits in extended mode).
2. **S-frame (supervisory frame)** — control field starts with **10**. It carries **flow and error control** information (acknowledgements) when there is no data to piggyback on, and has no information field.
3. **U-frame (unnumbered frame)** — control field starts with **11**. It is used for **link management**: setting up and disconnecting the link and setting the mode. It has no sequence numbers.

### Types of S-Frames

The 2-bit code of an S-frame gives four types:

| Code | S-frame | Meaning |
| --- | --- | --- |
| 00 | **RR** (Receive Ready) | Positive ACK; ready to receive the frame N(R) |
| 10 | **RNR** (Receive Not Ready) | Positive ACK, but the receiver is busy; stop sending |
| 01 | **REJ** (Reject) | Negative ACK; resend all frames from N(R) (Go-Back-N) |
| 11 | **SREJ** (Selective Reject) | Negative ACK; resend only frame N(R) (Selective Repeat) |

### Examples of U-Frames

1. **SNRM, SARM, SABM** — set normal response, asynchronous response or asynchronous balanced mode.
2. **UA** — unnumbered acknowledgement (accepts a mode-setting or disconnect command).
3. **DISC** — disconnect the link.
4. **FRMR** — frame reject (an unacceptable frame was received).

### Bit Stuffing

Bit stuffing is the **process of inserting an extra 0 after every five consecutive 1s in the data**, so that the flag pattern 01111110 never appears inside a frame.

The receiver removes the 0 that follows five consecutive 1s. If the sixth bit is also 1, it is the flag (or an error).

**Example 1:** the data **01111110** (the same as a flag) is sent as 011111**0**10.

**Example 2:** the data 0111111111100 is sent as 011111**0**11111**0**00 (a 0 after each group of five 1s).

## References {#references}

**GeeksforGeeks**

- [Error Detection in Computer Networks](https://www.geeksforgeeks.org/computer-networks/error-detection-in-computer-networks/), [Error Control in Data Link Layer](https://www.geeksforgeeks.org/computer-networks/error-control-in-data-link-layer/) and [Hamming Code in Computer Network](https://www.geeksforgeeks.org/computer-networks/hamming-code-in-computer-network/) — accessed 2026-11-06 (single-bit and burst errors; parity, two-dimensional parity, checksum, CRC; 2ʳ ≥ m + r + 1; parity positions). The parity values of its Hamming example (data 1011001) do not satisfy its own parity rules, so a recalculated example is used above.
- [Cyclic Redundancy Check and Modulo-2 Division](https://www.geeksforgeeks.org/dsa/modulo-2-binary-division/) — accessed 2026-11-06 (generator polynomial, k − 1 appended zeros, the 100100 ÷ 1101 example with remainder 001, and the error case 100000001)
- [Flow Control in Data Link Layer](https://www.geeksforgeeks.org/computer-networks/flow-control-in-data-link-layer/), [Stop and Wait ARQ](https://www.geeksforgeeks.org/computer-networks/stop-and-wait-arq/), [Go Back N](https://www.geeksforgeeks.org/computer-networks/sliding-window-protocol-set-2-receiver-side/), [Selective Repeat](https://www.geeksforgeeks.org/sliding-window-protocol-set-3-selective-repeat/) and [Difference Between Stop and Wait, GoBackN and Selective Repeat](https://www.geeksforgeeks.org/computer-networks/difference-between-stop-and-wait-gobackn-and-selective-repeat/) — accessed 2026-11-06 (windows, efficiency N / (1 + 2a), sequence numbers N + 1 and 2N, the comparison table). Its efficiency formula N / (1 + 2a) applies only while N < 1 + 2a; efficiency cannot exceed 100%.
- [Basic Frame Structure of HDLC](https://www.geeksforgeeks.org/computer-networks/basic-frame-structure-of-hdlc/) and [Types of HDLC Frames](https://www.geeksforgeeks.org/types-of-hdlc-frames/) — accessed 2026-11-06 (field sizes, flag 01111110, I-, S- and U-frames and their first control bits, RR, RNR, REJ, SREJ, SNRM, SARM, SABM, UA). Its S-frame paragraph says that an S-frame "contains send and receive sequence numbers"; an S-frame carries only N(R).

**TutorialsPoint**

- [Error Detection and Correction](https://www.tutorialspoint.com/data_communication_computer_network/error_detection_and_correction.htm) and [Data-link Control and Protocols](https://www.tutorialspoint.com/data_communication_computer_network/data_link_control_and_protocols.htm) — accessed 2026-11-06 (single-bit, multiple-bit and burst errors; parity and CRC; backward and forward error correction; Hamming redundancy; stop-and-wait, sliding window, Go-Back-N and Selective Repeat ARQ)
- [What is High-Level Data Link Control (HDLC)?](https://www.tutorialspoint.com/what-is-high-level-data-link-control-hdlc) — accessed 2026-11-06 (ISO standard based on SDLC; frame fields; P/F bit; three frame types)

**TpointTech**

- [Data Link Controls](https://www.tpointtech.com/data-link-controls) — accessed 2026-11-06 (line discipline: ENQ/ACK and poll/select; flow control; error control). It heads the ENQ/ACK section "END/ACK".
- [Sliding Window Protocol](https://www.tpointtech.com/sliding-window-protocol), [CRC in Computer Network](https://www.tpointtech.com/crc-in-computer-network), [Error Detection](https://www.tpointtech.com/computer-network-error-detection) and [Error Correction](https://www.tpointtech.com/computer-network-error-correction) — accessed 2026-11-06 (modulo-n sequence numbers, ACK numbering, piggybacking; CRC steps and the 11100 ÷ 1001 example; Hamming code). The parity bits of its Hamming example (data 1010) do not satisfy its own parity checks; its sliding window page gives the window as 2ⁿ − 1 for all sliding window protocols, which holds for Go-Back-N but not for Selective Repeat (2ⁿ⁻¹). TpointTech has no page on HDLC.

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — accessed 2026-11-06 (item 40, stop-and-wait ARQ and the types of ARQ; item 51, flow control at the data link and transport layers; item 88, checksum; item 94, stop-and-wait efficiency on a satellite link; item 95, flow control vs congestion control). In item 94 it rounds the required window to "63 frames" in one step and "63 or 64" in another; since N ≥ 63.5, the minimum window is 64.

**Programiz**

- Programiz has no page on data link control (checked 2026-11-06).

**Additional sources** (used because the reference websites do not give the HDLC station types, configurations, transfer modes, S-frame codes or bit stuffing, nor the Hamming distance rules)

- Wikipedia, [High-Level Data Link Control](https://en.wikipedia.org/wiki/High-Level_Data_Link_Control) — accessed 2026-11-06 (primary, secondary and combined stations; unbalanced and balanced configurations; NRM, ARM and ABM; S-frame codes; U-frame commands; bit stuffing after five 1s; use by Cisco and in LAPB, LAPD and PPP).
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapters 10 and 11 (burst error length, checksum example, minimum Hamming distance rules, CRC detection capabilities, flow and error control, HDLC). All worked examples above (CRC divisions, checksum, Hamming code, efficiencies, bit stuffing) were checked by a script.
