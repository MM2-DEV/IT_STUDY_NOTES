---
description: Switching techniques - the need for switching, circuit switching and its phases and switches, message switching, packet switching with datagram and virtual-circuit approaches, store-and-forward delay calculations, and comparisons of the switching methods.
updated: 2026-11-06
---

## Circuit Switching {#circuit-switching}

### Definition of Switching

Switching is the **process of forwarding data from an input port to an output port that leads towards its destination**, through intermediate devices called **switches**.

Connecting every device directly to every other device (a full mesh) needs too many links, and a single shared line (a bus) becomes slow and full of collisions as the network grows. A **switched network** solves this: devices are connected to switches, and the switches create or choose paths between them.

### Types of Switching

There are three switching techniques:

1. **Circuit switching** — a dedicated path is set up before communication.
2. **Message switching** — the whole message is stored and forwarded from node to node.
3. **Packet switching** — the message is divided into packets that are forwarded independently. It has two approaches: **datagram** and **virtual circuit**.

![Circuit switching and packet switching](/diagrams/computer-networks/circuit-packet-switching.svg)

### Circuit Switching

Circuit switching is a **switching technique in which a dedicated physical path (circuit) is set up between the sender and the receiver before communication starts, and is reserved for them until the communication ends**.

Each link on the path gives the connection a fixed share of its capacity (a frequency band in FDM or a time slot in TDM). Once the circuit is set up, data flows continuously along it without waiting at the switches. It is the method of the traditional **telephone network (PSTN)**.

### Phases of Circuit Switching

Circuit switching works in three phases:

1. **Circuit establishment (setup)** — the sender's request travels through the switches; each switch reserves a free line to the next one; the receiver acknowledges, and the end-to-end circuit is ready. If any part of the path is busy, the call fails (it is **blocked**).
2. **Data transfer** — data (voice or other data) flows over the reserved path, in order and at a constant rate.
3. **Circuit disconnection (teardown)** — when one side ends the communication, every switch releases its reserved resources for other users.

### Switches Used in Circuit Switching

1. **Space-division switch** — the paths are separated in **space**: each connection uses its own physical path through the switch.
   1. **Crossbar switch** — connects n inputs to m outputs through a grid of **n × m crosspoints** (electronic micro-switches). A crossbar for n inputs and n outputs needs **n²** crosspoints; for example, 1000 lines need 1000² = **1 000 000** crosspoints, most of them idle at any time.
   2. **Multistage switch** — combines several smaller crossbars in stages to reduce the number of crosspoints, at the risk of **blocking** when all middle paths are busy.
2. **Time-division switch** — the paths are separated in **time** using TDM; a **time-slot interchange (TSI)** unit changes the order of the time slots so that each input slot reaches the right output.

### Delay in Circuit Switching

> **Total time = setup time + L / R + propagation delay**

Here **L** is the size of the data in bits and **R** the rate of the circuit in bps. There is no waiting at the switches once the circuit exists.

**Example:** a file of 640 000 bits is sent over a circuit that has one of 24 TDM slots of a 1.536 Mbps link, and setting up the circuit takes 500 ms. The circuit rate is 1.536 Mbps / 24 = **64 kbps**, so the transmission takes 640 000 / 64 000 = 10 s, and the total time is 10 + 0.5 = **10.5 s** (propagation delay ignored).

### Advantages of Circuit Switching

1. **Guaranteed bandwidth** and a constant data rate during the connection.
2. **Low, constant delay** after setup; data arrives in order.
3. Suitable for continuous, real-time traffic such as voice calls.

### Disadvantages of Circuit Switching

1. **Wasted capacity** — the circuit stays reserved even when no data is sent (for example, silence in a call).
2. **Setup delay** before any data can be sent; calls can be blocked when the network is busy.
3. Expensive: resources are dedicated to one connection; not suitable for bursty computer data.
4. If a link of the circuit fails, the connection is lost.

### Message Switching

Message switching is a **switching technique in which the whole message is sent to the next node, stored there completely, checked, and then forwarded to the following node** until it reaches the destination (**store-and-forward**).

There is no dedicated path; each message carries the destination address in its header. If the outgoing link is busy, the message waits in a queue. Nodes need large storage, and delays are long, so it is not suitable for real-time or interactive use. It was used in telegraph networks and in early e-mail systems, and has been replaced by packet switching.

## Packet Switching {#packet-switching}

### Definition of Packet Switching

Packet switching is a **switching technique in which a message is divided into small units called packets, and each packet is sent through the network separately, sharing the links with packets of other users**.

Each packet has a **header** (source and destination addresses, sequence number and control information) and a **payload** (the data). No resources are reserved: packets use a link only when they are sent, which is called **statistical multiplexing**. The **Internet** is a packet-switched network.

### Store-and-Forward Transmission

**Store-and-forward transmission** is a method in which a switch (router) must **receive the whole packet before it starts sending it on the next link**.

Packets wait in **queues (buffers)** at busy links; if a buffer is full, a packet is dropped (**packet loss**).

> **Delay of one packet over N links = N × L / R** (store-and-forward, ignoring other delays)

> **Delay of P packets over N links = (N + P − 1) × L / R**

Here **L** is the packet size in bits, **R** the link rate, **N** the number of links and **P** the number of packets.

The total end-to-end delay of a packet also includes **processing, queuing and propagation delays** at each hop (see [Introduction to Computer Networks](/topics/computer-networks/introduction-to-computer-networks)).

**Example 1:** a packet passes through 4 routers; each router adds a 2 ms processing delay, and the transmission delay on each link is 5 ms. With 4 routers there are 5 links. Total delay = 4 × 2 + 5 × 5 = 8 + 25 = **33 ms** (propagation ignored).

**Example 2 (why packets are faster than whole messages):** a 12 000-bit message is sent over 3 links of 2 Mbps.

1. **Message switching:** each link takes 12 000 / 2 000 000 = 6 ms, so the delay is 3 × 6 = **18 ms**.
2. **Packet switching** with 4 packets of 3000 bits: each packet takes 1.5 ms per link, and while one packet is on the second link, the next is on the first (pipelining). Delay = (3 + 4 − 1) × 1.5 = **9 ms** (headers ignored).

### Packet Switching vs Circuit Switching: Sharing Example

A 1 Mbps link is shared by users who each send at 100 kbps when active, but are active only 10% of the time.

1. **Circuit switching** must reserve 100 kbps for each user, so only 1 000 / 100 = **10 users** can be supported.
2. **Packet switching** can support **35 users**: the link overflows only when more than 10 of them are active together, and the probability of that is only about **0.0004**.

### Types of Packet Switching

There are two approaches to packet switching:

1. Datagram approach (connectionless)
2. Virtual-circuit approach (connection-oriented)

### 1. Datagram Packet Switching

Datagram packet switching is a **connectionless approach in which each packet (datagram) is treated independently and routed separately using the destination address in its header**.

No setup is needed. Packets of the same message may take **different routes**, arrive **out of order**, or be lost; the higher layers (such as TCP) reorder them and request retransmission. Each router uses a **routing (forwarding) table** based on destination addresses. Example: the **IP** network layer of the Internet.

### 2. Virtual-Circuit Packet Switching

Virtual-circuit packet switching is a **connection-oriented approach in which a logical path (virtual circuit) is set up before data transfer, and all packets of the connection follow that path in order**.

It combines features of circuit switching (setup, data transfer and teardown phases; ordered delivery) with packet switching (packets share the links; no dedicated capacity). Each packet carries a short **virtual-circuit identifier (VCI)** instead of the full destination address. Examples: **X.25, Frame Relay, ATM** and **MPLS**.

### Datagram vs Virtual Circuit

| Basis | Datagram | Virtual circuit |
| --- | --- | --- |
| Connection | Connectionless | Connection-oriented |
| Setup phase | None | Needed (setup, data transfer, teardown) |
| Path | Each packet routed separately; may differ | All packets follow the same path |
| Address in each packet | Full destination address | Short virtual-circuit identifier |
| Packet order | May arrive out of order | Arrive in order |
| Effect of a router failure | Packets take another route | The virtual circuit is broken |
| Resource reservation | Not possible | Possible |
| Examples | IP (Internet) | X.25, Frame Relay, ATM, MPLS |

### Advantages of Packet Switching

1. **Efficient use of bandwidth** — links are shared; no capacity is reserved for idle users.
2. **No setup delay** (datagrams); data is sent as soon as it is ready.
3. **Reliable and flexible** — packets can be rerouted around failed links.
4. Supports many users and different data rates; suitable for bursty traffic.
5. Cheaper, because the infrastructure is shared.

### Disadvantages of Packet Switching

1. **Variable delay** (queuing) and possible **packet loss** under congestion.
2. Packets may arrive **out of order** and must be reassembled.
3. Each packet carries **header overhead**.
4. Routers need more processing and buffer memory; quality of service is harder to guarantee for real-time traffic (voice and video need extra mechanisms).

### Circuit Switching vs Packet Switching

| Basis | Circuit switching | Packet switching |
| --- | --- | --- |
| Path | Dedicated path for the whole communication | No dedicated path; links shared |
| Setup | Needed before transfer | Not needed (datagram) |
| Resource reservation | Yes | No |
| Data unit | Continuous stream | Packets with headers |
| Store-and-forward | No | Yes |
| Bandwidth use | Wasteful when idle | Efficient (statistical multiplexing) |
| Delay | Constant after setup | Variable (queuing) |
| Congestion | At setup (calls blocked) | At each node (packets queued or lost) |
| Order of data | Always in order | May be out of order (datagram) |
| Cost of failure | Connection lost | Packets rerouted |
| Charging | By time and distance | By amount of data |
| Example | Telephone network (PSTN) | Internet |

### Circuit vs Message vs Packet Switching

| Basis | Circuit switching | Message switching | Packet switching |
| --- | --- | --- | --- |
| Dedicated path | Yes | No | No |
| Unit sent | Continuous stream | Whole message | Packets |
| Store-and-forward | No | Yes (whole message) | Yes (each packet) |
| Storage at nodes | None | Large (whole messages) | Small (packets) |
| Delay | Low after setup | High | Low to moderate |
| Suitable for real-time use | Yes | No | Yes, with QoS support |
| Bandwidth use | Low efficiency | Better | Best |
| Example | Telephone call | Telegram, early e-mail | Internet |

## References {#references}

**TutorialsPoint**

- [Switching](https://www.tutorialspoint.com/data_communication_computer_network/physical_layer_switching.htm), [Circuit Switching](https://www.tutorialspoint.com/data_communication_computer_network/circuit_switching.htm), [Message Switching](https://www.tutorialspoint.com/data_communication_computer_network/message_switching.htm) and [Packet Switching](https://www.tutorialspoint.com/data_communication_computer_network/packet_switching.htm) — accessed 2026-11-06 (need for switching; three phases of circuit switching; store-and-forward message switching; packets with header and payload; statistical multiplexing). Its packet switching page calls packet switching "a connectionless network switching technique"; the datagram approach is connectionless, but the virtual-circuit approach is connection-oriented.

**GeeksforGeeks**

- [Circuit Switching in Computer Network](https://www.geeksforgeeks.org/computer-networks/circuit-switching-in-computer-network/), [Packet Switching and Delays in Computer Network](https://www.geeksforgeeks.org/computer-networks/packet-switching-and-delays-in-computer-network/) and [Difference between Circuit Switching and Packet Switching](https://www.geeksforgeeks.org/computer-networks/difference-between-circuit-switching-and-packet-switching/) — accessed 2026-11-06 (advantages and disadvantages, datagram and virtual-circuit packet switching with X.25, Frame Relay, ATM and MPLS, the comparison table). Issues: it describes queuing and processing delays as occurring "at the destination" (they occur at every router), and states that packet switching is "not suitable for real-time communication, such as voice and video", whereas VoIP and video calls run over packet-switched networks with QoS mechanisms.

**TpointTech**

- [Differentiate between Circuit Switching, Message Switching, and Packet Switching](https://www.tpointtech.com/differentiate-between-circuit-switching-message-switching-and-packet-switching), [Circuit Switching in Computer Network](https://www.tpointtech.com/circuit-switching-in-computer-network) and [Switching Techniques](https://www.tpointtech.com/computer-network-switching-techniques) — accessed 2026-11-06 (circuit, message and packet switching; store-and-forward; constant delay of circuit switching). The *Switching Techniques* page mainly describes how a LAN switch forwards frames by MAC address (store-and-forward, cut-through, fragment-free modes), which is a different meaning of "switching" from the switching techniques of this topic.

**Programiz**

- Programiz has no page on switching techniques (checked 2026-11-06).

**Additional sources** (used because the reference websites do not give the space- and time-division switches, the crossbar crosspoint count, the store-and-forward delay formulas or the circuit-switching timing and sharing examples)

- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapter 8 (circuit-switched networks, datagram and virtual-circuit networks, structure of circuit switches: crossbar, multistage and time-slot interchange).
- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, section 1.3 (store-and-forward transmission, (N + P − 1) L / R, the 640 000-bit circuit-switching example and the 35-user statistical multiplexing example). All calculations above were checked by script.
