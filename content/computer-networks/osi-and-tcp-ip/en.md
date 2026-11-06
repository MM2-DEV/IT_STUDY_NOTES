---
description: The OSI reference model and its seven layers, the functions, data units, protocols and devices of each layer, the TCP/IP protocol suite and its layers, and a comparison of the OSI and TCP/IP models.
updated: 2026-11-06
---

## OSI Model {#osi-model}

### Definition of OSI Model

The OSI (Open Systems Interconnection) model is a **seven-layer reference model, developed by ISO, that describes how data is communicated between two computers in a network**.

It was published by the **International Organization for Standardization (ISO)** in **1984** (ISO 7498). Each layer performs a specific set of functions, provides services to the layer above and uses the services of the layer below. It is a conceptual model used for teaching and for designing network protocols; it does not itself define protocols.

### The Seven Layers of the OSI Model

From bottom (layer 1) to top (layer 7):

1. **Physical layer**
2. **Data link layer**
3. **Network layer**
4. **Transport layer**
5. **Session layer**
6. **Presentation layer**
7. **Application layer**

A common way to remember them from layer 1 upward is "**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way".

The lower three layers (physical, data link, network) are concerned with **moving data through the network** (network support layers); the upper three (session, presentation, application) are concerned with **the user's application** (user support layers); the transport layer links the two.

![OSI model layers with their data units and the corresponding TCP/IP layers](/diagrams/computer-networks/osi-tcpip.svg)

### Advantages of the OSI Model

1. It divides network communication into **smaller, simpler parts**, making it easier to understand, design and troubleshoot.
2. **Standardization and interoperability** — products from different vendors can work together.
3. Changes in one layer do not affect the other layers.
4. It is a general model, independent of particular protocols.

### Disadvantages of the OSI Model

1. It is a **theoretical model**; its protocols were never widely implemented (the Internet uses TCP/IP).
2. Some functions (such as error control) are repeated in several layers.
3. The session and presentation layers have few functions in practice.

## Functions of Each Layer {#functions-of-each-layer}

### 1. Physical Layer

The physical layer is responsible for **transmitting raw bits (0s and 1s) over the physical medium** from one node to the next.

Functions:

1. **Bit representation and encoding** — converts bits into electrical, light or radio signals.
2. **Data rate** — the number of bits sent per second.
3. **Bit synchronization** — sender and receiver use the same clock.
4. **Physical topology** and the definition of the **interface and medium** (connectors, cables, voltages).
5. **Transmission mode** — simplex, half-duplex or full-duplex.

**Data unit:** bits. **Devices:** hub, repeater, modem, cables, connectors. **Examples:** Ethernet physical standards, USB, DSL, Bluetooth radio.

### 2. Data Link Layer

The data link layer is responsible for the **node-to-node (hop-to-hop) delivery of frames** over a single link, free of errors.

Functions:

1. **Framing** — divides the bit stream into **frames**.
2. **Physical (MAC) addressing** — adds the source and destination **MAC addresses** to the frame header.
3. **Error control** — detects (and retransmits) damaged or lost frames, using a trailer such as a **CRC**.
4. **Flow control** — prevents a fast sender from overwhelming a slow receiver.
5. **Access control** — decides which device may use a shared link (for example, CSMA/CD).

It has two sublayers: **LLC (logical link control)**, for flow and error control and the interface to the network layer, and **MAC (media access control)**, for access to the medium and hardware addressing.

**Data unit:** frame. **Devices:** switch, bridge, NIC, access point. **Protocols:** Ethernet (IEEE 802.3), Wi-Fi (802.11), PPP, HDLC.

### 3. Network Layer

The network layer is responsible for the **source-to-destination (host-to-host) delivery of packets** across multiple networks.

Functions:

1. **Logical addressing** — adds the source and destination **IP addresses**.
2. **Routing** — chooses the best path through the routers to the destination.
3. **Forwarding** of packets from the input to the output link of a router.
4. **Fragmentation** of packets to suit different networks, and internetworking.

**Data unit:** packet (datagram). **Devices:** router, layer-3 switch. **Protocols:** IP (IPv4, IPv6), ICMP, IGMP, routing protocols (RIP, OSPF).

### 4. Transport Layer

The transport layer is responsible for the **process-to-process (end-to-end) delivery of the entire message**, reliably and in order.

Functions:

1. **Port (service-point) addressing** — delivers data to the correct **process (application)** using port numbers.
2. **Segmentation and reassembly** — divides the message into segments, numbered for correct reassembly.
3. **Connection control** — **connection-oriented** (TCP) or **connectionless** (UDP) service.
4. **End-to-end flow control and error control** (retransmission of lost segments).
5. **Congestion control** (TCP).

**Data unit:** segment (TCP) or datagram (UDP). **Protocols:** TCP, UDP, SCTP.

### 5. Session Layer

The session layer is responsible for **establishing, maintaining, synchronizing and terminating sessions (dialogues)** between two communicating applications.

Functions:

1. **Dialog control** — allows communication in half-duplex or full-duplex mode.
2. **Synchronization** — adds **checkpoints** to a long data stream, so that after a failure only the data after the last checkpoint is re-sent.
3. Session establishment, authentication and termination.

**Data unit:** data. **Examples:** RPC, NetBIOS, PPTP.

### 6. Presentation Layer

The presentation layer is responsible for the **syntax and semantics of the data exchanged**, so that data sent by one system can be understood by the other.

Functions:

1. **Translation** — converts between data formats and character codes (for example, ASCII and EBCDIC).
2. **Encryption and decryption** — for security.
3. **Compression** — reduces the number of bits to be sent (for example, JPEG, MPEG).

**Data unit:** data. **Examples:** SSL/TLS, JPEG, GIF, MPEG, MIME.

### 7. Application Layer

The application layer is responsible for **providing network services directly to the user's applications**.

Functions:

1. Network virtual terminal (remote login).
2. File transfer, access and management (FTAM).
3. E-mail and directory services.
4. Web access and name resolution.

**Data unit:** data (message). **Protocols:** HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, Telnet, SNMP.

### Summary of OSI Layers

| No. | Layer | Main function | Data unit | Devices / protocols |
| --- | --- | --- | --- | --- |
| 7 | Application | Network services to applications | Data | HTTP, FTP, SMTP, DNS; gateway |
| 6 | Presentation | Translation, encryption, compression | Data | SSL/TLS, JPEG, MPEG |
| 5 | Session | Dialog control, synchronization | Data | RPC, NetBIOS |
| 4 | Transport | Process-to-process delivery, reliability | Segment | TCP, UDP |
| 3 | Network | Logical addressing and routing | Packet | IP, ICMP; router |
| 2 | Data link | Framing, MAC addressing, error control | Frame | Ethernet, PPP; switch, bridge |
| 1 | Physical | Transmission of bits | Bits | Cables, hub, repeater |

## TCP/IP Protocol Suite {#tcp-ip-protocol-suite}

### Definition of TCP/IP Model

The TCP/IP model is a **layered networking model and protocol suite, named after its two main protocols TCP and IP, on which the Internet is based**.

It was developed by the **US Department of Defense (DARPA)** for ARPANET in the 1970s — before the OSI model — and is standardized in Internet RFCs (RFC 1122). It is a practical model: its layers are defined by the protocols actually used.

### Layers of the TCP/IP Model

The TCP/IP model has four layers (some books split the lowest into two, giving five layers):

1. **Application layer** — combines the functions of the OSI application, presentation and session layers; provides services to user applications. Protocols: **HTTP, FTP, SMTP, POP3, DNS, Telnet, SNMP, DHCP**.
2. **Transport layer** — process-to-process delivery: **TCP** (reliable, connection-oriented, with checksums, acknowledgements, retransmission and ordering) and **UDP** (fast, connectionless, with only a checksum).
3. **Internet layer** — logical addressing and routing of packets between networks: **IP**, with **ICMP**, **ARP** and **IGMP**.
4. **Network access (link) layer** — combines the OSI data link and physical layers; sends frames over the physical network: **Ethernet, Wi-Fi, PPP**.

### Advantages and Disadvantages of TCP/IP

1. **Advantages:** an open standard, independent of hardware and operating system; scalable and reliable; the basis of the Internet; supports many routing protocols.
2. **Disadvantages:** the layers and services are not clearly separated; it is not a good general model for other networks; built-in security is weak (added later with protocols such as TLS and IPsec).

### OSI Model vs TCP/IP Model

| Basis | OSI model | TCP/IP model |
| --- | --- | --- |
| Full form | Open Systems Interconnection | Transmission Control Protocol / Internet Protocol |
| Developed by | ISO (1984) | US Department of Defense (ARPANET, 1970s) |
| Number of layers | 7 | 4 (or 5) |
| Session and presentation | Separate layers | Merged into the application layer |
| Physical and data link | Separate layers | Combined as network access layer |
| Nature | Theoretical, reference model | Practical, implemented model |
| Model and protocols | Model defined first, then protocols | Protocols developed first, then the model |
| Layer boundaries | Strict, clearly defined | Less strict |
| Network layer service | Connectionless and connection-oriented | Connectionless (IP) |
| Transport layer service | Connection-oriented (mainly) | Connection-oriented (TCP) and connectionless (UDP) |
| Use | Teaching and reference | The Internet |

## References {#references}

**TutorialsPoint**

- [Layers of OSI Model](https://www.tutorialspoint.com/data_communication_computer_network/layers_of_osi_model.htm), [TCP/IP Model](https://www.tutorialspoint.com/data_communication_computer_network/tcp_ip_model.htm) and [OSI vs TCP/IP Model](https://www.tutorialspoint.com/data_communication_computer_network/osi_vs_tcp_ip_model.htm) — accessed 2026-11-06 (functions of each layer, four TCP/IP layers, comparison). Its comparison also states that "the smallest size of the OSI header is 5 bytes" while TCP/IP's is 20 bytes; this is not a standard textbook point and is not used.

**GeeksforGeeks**

- [OSI Model](https://www.geeksforgeeks.org/computer-networks/open-systems-interconnection-model-osi/) — accessed 2026-11-06 (layers, functions, data units, devices and protocols, LLC and MAC). In its layer table it lists switches under the network layer as well; (layer-2) switches work at the data link layer, and only layer-3 switches work at the network layer.
- [TCP/IP Model](https://www.geeksforgeeks.org/computer-networks/tcp-ip-model/) and [Difference between OSI and TCP/IP Model](https://www.geeksforgeeks.org/computer-networks/difference-between-osi-model-and-tcp-ip-model/) — accessed 2026-11-06. The TCP/IP page gives four layers and the comparison page five; both views are used in textbooks, as noted above.

**TpointTech**

- [OSI Model](https://www.tpointtech.com/osi-model) and [TCP/IP Model](https://www.tpointtech.com/computer-network-tcp-ip-model) — accessed 2026-11-06 (layers and protocols)

**Programiz**

- Programiz has no page on the OSI or TCP/IP model (checked 2026-11-06).
