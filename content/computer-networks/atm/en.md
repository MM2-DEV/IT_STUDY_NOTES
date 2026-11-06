---
description: ATM (Asynchronous Transfer Mode) - cells, virtual paths and virtual channels, ATM switches (VP and VP/VC switches, switching tables, crossbar, banyan and Batcher-banyan fabrics), the ATM reference model and its layers, the cell header, adaptation layers AAL1 to AAL5, service categories, and worked efficiency examples.
updated: 2026-11-06
---

## ATM Switches {#atm-switches}

### Definition of ATM

ATM (Asynchronous Transfer Mode) is a **connection-oriented, cell-switching technology, standardized by the ITU-T, that carries all kinds of traffic — voice, video and data — in small fixed-size cells of 53 bytes over virtual circuits**.

It was developed (in the 1980s) as the switching technology of **broadband ISDN (B-ISDN)**, to combine the quality of service of telephone networks with the flexibility of packet networks. It is "asynchronous" because cells from a source are sent whenever there is data, not in fixed time slots as in synchronous TDM.

### Main Features of ATM

1. **Fixed-size cells** of **53 bytes** (5-byte header + 48-byte payload). Fixed, small cells can be switched quickly in hardware and give small, predictable delays for voice and video.
2. **Connection-oriented** — a **virtual connection** is set up before data transfer; all cells of a connection follow the same path and arrive in order.
3. **Quality of service (QoS)** — each connection can be given a service category (constant or variable bit rate, and so on) with guaranteed bandwidth, delay and loss.
4. **Asynchronous (statistical) multiplexing** — cells from many connections share a link, with slots used only when a source has data.
5. **Independent of the physical medium** — cells can be carried over fibre (SONET/SDH, for example at 155.52 Mbps or 622 Mbps) or copper.
6. **Same technology for LANs and WANs.**

### ATM Network Architecture

1. **Endpoints (end systems)** — user devices with an ATM interface, such as computers, routers and codecs.
2. **ATM switches** — forward cells inside the network.
3. **User-network interface (UNI)** — the interface between an endpoint and a switch.
4. **Network-network interface (NNI)** — the interface between two switches.

### Virtual Connections: TP, VP and VC

ATM connections are organized in three levels:

1. **Transmission path (TP)** — the **physical link** (wire, cable or fibre) between an endpoint and a switch or between two switches.
2. **Virtual path (VP)** — a **bundle of virtual channels** that follow the same route; identified by a **VPI** (virtual path identifier).
3. **Virtual channel (VC)** — a **single connection** carrying the cells of one stream; identified by a **VCI** (virtual channel identifier).

A virtual connection is identified by the pair **(VPI, VCI)**. These identifiers have **local** meaning: they are changed at each switch.

![Virtual paths, virtual channels and a switching table](/diagrams/computer-networks/atm-vp-vc.svg)

### ATM Switch

An ATM switch is a **device that receives cells on its input ports and forwards each cell to an output port according to the VPI/VCI in its header, changing the VPI/VCI to the values for the next link**.

It uses a **switching table**, set up when the virtual connection is established, with one entry per connection:

| Input port | Input VPI | Input VCI | Output port | Output VPI | Output VCI |
| --- | --- | --- | --- | --- | --- |
| 1 | 14 | 21 | 3 | 22 | 74 |

**Example:** a cell arrives on port 1 with VPI = 14 and VCI = 21. The switch finds this entry, changes the header to VPI = 22 and VCI = 74, and sends the cell out on port 3. The next switch repeats the process with its own table.

### Types of ATM Switches

There are two types of ATM switches:

1. **VP switch (VP cross-connect)** — switches cells using **only the VPI**; all VCs inside a virtual path are switched together and their VCIs are not changed. This makes switching simple and fast in the core of the network.
2. **VP/VC switch (VPC switch)** — switches cells using **both the VPI and the VCI**, so individual virtual channels can be routed separately; used at the edges, near the users.

### Switching Fabrics of ATM Switches

The switching fabric moves cells from the input ports to the output ports.

1. **Crossbar switch** — connects N inputs to N outputs with a grid of **N² crosspoints**. It is simple and **non-blocking** but needs many crosspoints for large N.
2. **Knockout switch** — a crossbar with a **knockout** circuit at each output that keeps only a limited number of cells arriving for that output at the same time (the rest are dropped or buffered).
3. **Banyan switch** — a **multistage** switch built from **2 × 2 microswitches** arranged in **log₂ N stages** of N/2 microswitches each. Each microswitch looks at **one bit** of the output port number: **0 sends the cell to the upper output, 1 to the lower output**, so a cell routes itself to its destination ("self-routing").
4. **Batcher-banyan switch** — a **Batcher sorting network** placed before the banyan switch arranges the cells in order of their destination ports, which avoids internal collisions in the banyan stages (a **trap** module removes duplicate destinations).

![An 8 × 8 banyan switch](/diagrams/computer-networks/banyan-switch.svg)

> **Number of stages of a banyan switch = log₂ N**

> **Number of 2 × 2 microswitches = (N / 2) × log₂ N**

Here **N** is the number of input (and output) ports.

**Example:** an 8 × 8 banyan switch has log₂ 8 = **3 stages** of 8 / 2 = 4 microswitches, that is **12 microswitches**, compared with 8² = **64 crosspoints** for a crossbar. A cell for output port 6 (binary **110**) goes **down** in stage 1 (bit 1), **down** in stage 2 (bit 1) and **up** in stage 3 (bit 0), from any input. For N = 64, a banyan switch needs 6 stages of 32 microswitches = 192, against 4096 crosspoints for a crossbar.

A banyan switch is cheaper than a crossbar, but it is **blocking**: two cells can collide inside the switch even when they are going to different outputs, which is why the Batcher sorter is added.

## ATM Protocol {#atm-protocol}

### ATM Reference Model

The **ATM reference model** is the **three-layer protocol architecture of ATM (the B-ISDN reference model), which defines how user data is turned into cells, switched and transmitted**.

Its three layers are:

1. **ATM adaptation layer (AAL)** — adapts the data of the upper layers (IP packets, voice, video) to ATM cells.
2. **ATM layer** — handles the cell header: routing, switching and multiplexing of cells.
3. **Physical layer** — transmits cells as bits over the medium.

![Layers of the ATM reference model](/diagrams/computer-networks/atm-layers.svg)

The model also has three planes: the **user plane** (transfer of user data), the **control plane** (signalling: setting up and releasing connections) and the **management plane**.

### Physical Layer

The physical layer has two sublayers:

1. **Physical medium dependent (PMD)** sublayer — bit transmission, timing and the medium (fibre or copper).
2. **Transmission convergence (TC)** sublayer — maps cells into the transmission frames (such as SONET), generates the header error control (**HEC**) and finds **cell boundaries** (cell delineation).

ATM does not define a single medium; it was designed mainly for **SONET/SDH** over optical fibre.

### ATM Layer and Cell Header

The ATM layer **adds the 5-byte header** to each 48-byte payload received from the AAL, and switches, multiplexes and demultiplexes cells using the VPI and VCI.

![The ATM cell and its UNI and NNI headers](/diagrams/computer-networks/atm-cell.svg)

| Field | UNI | NNI | Purpose |
| --- | --- | --- | --- |
| GFC (generic flow control) | 4 bits | — | Flow control at the user–network interface |
| VPI (virtual path identifier) | 8 bits | 12 bits | Identifies the virtual path |
| VCI (virtual channel identifier) | 16 bits | 16 bits | Identifies the virtual channel |
| PT (payload type) | 3 bits | 3 bits | User data or management data, congestion indication, last cell of a frame |
| CLP (cell loss priority) | 1 bit | 1 bit | 1 = the cell may be discarded first during congestion |
| HEC (header error control) | 8 bits | 8 bits | CRC over the header (detects and corrects single-bit header errors) |

The NNI header has no GFC field, so its VPI is longer (12 bits), allowing more virtual paths between switches.

### ATM Adaptation Layer (AAL)

The **ATM adaptation layer (AAL)** is the **top layer of ATM, which accepts data from the upper layers, divides it into 48-byte payloads at the sender and reassembles it at the receiver**.

It has two sublayers:

1. **Convergence sublayer (CS)** — adds headers or trailers for the service (such as sequence numbers, timing information or a length field and CRC).
2. **Segmentation and reassembly (SAR)** sublayer — **segments** the data into 48-byte units at the sender and **reassembles** them at the receiver.

### Types of AAL

| AAL type | Service | Bit rate | Connection | Example |
| --- | --- | --- | --- | --- |
| **AAL1** | Real-time, timing needed | Constant (CBR) | Connection-oriented | Uncompressed voice and video, circuit emulation (T-1/E-1) |
| **AAL2** | Real-time, timing needed | Variable (VBR), low rate | Connection-oriented | Compressed voice and video, mobile voice |
| **AAL3/4** | Data, no timing | Variable | Connection-oriented or connectionless | Data transfer (originally separate AAL3 and AAL4) |
| **AAL5** | Data, no timing | Variable | Mainly connection-oriented | **IP over ATM**, LAN emulation; also called **SEAL** (simple and efficient adaptation layer) |

### AAL5 and Efficiency

AAL5 adds an **8-byte trailer** (with a length field and a 32-bit CRC) to each packet and pads it so that the total is a **multiple of 48 bytes**; the result is cut into 48-byte cell payloads. The PT field of the last cell marks the end of the packet.

> **Cell efficiency = 48 ÷ 53 ≈ 90.6%**

> **Number of cells = ⌈(packet size + 8) ÷ 48⌉**

**Example:** a 1500-byte IP packet is sent with AAL5.

1. 1500 + 8 (trailer) = 1508 bytes, padded to the next multiple of 48: **1536 bytes** (28 bytes of padding).
2. Number of cells = 1536 ÷ 48 = **32 cells**.
3. Bytes sent = 32 × 53 = **1696 bytes**, so the efficiency is 1500 ÷ 1696 ≈ **88.4%** (the "cell tax" of about 11.6%).

**Example (cell time):** at 155.52 Mbps, one 53-byte cell (424 bits) takes 424 ÷ 155.52 × 10⁶ ≈ **2.73 µs** to send — short enough that a voice cell never waits long behind a data cell.

### ATM Service Categories

1. **CBR (constant bit rate)** — a fixed rate, like a leased line; for uncompressed voice and video.
2. **VBR (variable bit rate)** — a rate that varies within limits: **real-time VBR** (compressed video) and **non-real-time VBR** (bursty data with delay bounds).
3. **ABR (available bit rate)** — a **guaranteed minimum** rate, with more when the network has spare capacity; uses network feedback for congestion control.
4. **UBR (unspecified bit rate)** — **best effort**, no guarantees (like the Internet); for file transfer and e-mail.

### ATM vs IP Networks

| Basis | ATM | IP (Internet) |
| --- | --- | --- |
| Data unit | Fixed 53-byte cells | Variable-size packets |
| Connection | Connection-oriented (virtual circuits) | Connectionless (datagrams) |
| Addressing in each unit | Short local labels (VPI/VCI) | Full 32-bit (or 128-bit) addresses |
| Quality of service | Built in (CBR, VBR, ABR, UBR) | Best effort (extra mechanisms needed) |
| Switching | Fast hardware switching of cells | Forwarding by longest prefix match |
| Overhead | About 10% header per cell (cell tax) | 20–40 bytes per packet |
| Use today | Old backbones, DSL access networks | The whole Internet |

### Advantages and Disadvantages of ATM

**Advantages:**

1. Supports voice, video and data on one network with guaranteed **QoS**.
2. Small fixed cells allow fast, hardware switching with low, predictable delay.
3. Works over LANs and WANs at high speeds.

**Disadvantages:**

1. **High overhead** (the 5-byte header in every 53 bytes, plus padding).
2. **Complex and expensive** equipment and signalling.
3. Largely replaced by Ethernet and IP/MPLS networks; it is still found in older carrier backbones and DSL access networks.

## References {#references}

**TutorialsPoint**

- [ATM Networks](https://www.tutorialspoint.com/data_communication_computer_network/atm_networks.htm) and [Asynchronous Transfer Mode (ATM)](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_atm.htm) — accessed 2026-11-06 (53-byte cell, UNI and NNI formats, physical layer with PMD and TC sublayers, ATM layer, AAL with CS and SAR sublayers, endpoints and switches; ABR, CBR, UBR and VBR services). Issues: one page says ATM "uses time division multiplexing", while the other correctly says *asynchronous* time-division multiplexing; and it says the AAL "corresponds to network layer of OSI model", a mapping not used in the ATM standards (the AAL adapts upper-layer data to cells and is usually compared with the transport layer, if at all).

**GeeksforGeeks**

- [Asynchronous Transfer Mode (ATM) in Computer Network](https://www.geeksforgeeks.org/computer-networks/asynchronous-transfer-mode-atm-in-computer-network/) — accessed 2026-11-06 (B-ISDN origins, ITU-T standard, UNI and NNI headers, VPC and VCC, switching with translation tables, ATM vs IP, AAL). It writes "call relay" for **cell relay**.

**TpointTech**

- [Asynchronous Transfer Mode (ATM) in Computer Network](https://www.tpointtech.com/asynchronous-transfer-mode-in-computer-network) — accessed 2026-11-06 (cell format, virtual paths, switching, applications such as ATM WANs and frame relay backbones). It says ATM carries traffic "with end-to-end encryption"; ATM provides end-to-end **quality of service**, not encryption.

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — checked 2026-11-06; ATM is mentioned only in the syllabus and in passing (transparent fragmentation); it has no item on ATM switches or the ATM protocol.

**Programiz**

- Programiz has no page on ATM (checked 2026-11-06).

**Additional source** (used because the reference websites do not describe VP and VP/VC switches, the switching fabrics — crossbar, knockout, banyan and Batcher-banyan — the full header fields, the AAL types and AAL5 trailer, or the efficiency calculations)

- Behrouz A. Forouzan, *Data Communications and Networking*, 4th edition, McGraw-Hill, chapter 18 (ATM: architecture, TP, VP and VC, switching, the banyan and Batcher-banyan switches, layers, AAL1, AAL2, AAL3/4 and AAL5, service classes). The banyan routing in the diagram and all calculations above were checked by script.
