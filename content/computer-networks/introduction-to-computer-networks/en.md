---
description: Introduction to computer networks - computer network and its uses, the Internet and its history, networking protocols and their elements, network edge (end systems and access networks) and network core (packet and circuit switching), delays and throughput, protocol layers and encapsulation, and types of networks (PAN, LAN, MAN, WAN).
updated: 2026-11-06
---

## Overview of the Internet {#overview-of-the-internet}

### Computer Network

A computer network is a **collection of interconnected computers and other devices that communicate with each other to share data and resources**.

The devices (nodes) are connected by wired or wireless **links** and follow common rules called **protocols**. Data is divided into **packets**, and each device is identified by an address (such as an IP address).

#### Components of a Computer Network

1. **Nodes (end devices)** — computers, servers, phones, printers.
2. **Network interface card (NIC)** — connects a device to the network; wired (Ethernet) or wireless (Wi-Fi); it has a unique **MAC address**.
3. **Transmission media** — twisted-pair cable, coaxial cable, optical fibre, or wireless (radio).
4. **Connecting devices** — hub, switch, router, bridge, gateway, modem, access point.
5. **Protocols and software** — rules and programs that control communication.

#### Uses of Computer Networks

1. **Resource sharing** — printers, storage and software are shared by many users.
2. **Information sharing and communication** — e-mail, messaging, file transfer, the web, video conferencing, IP telephony.
3. **Centralized data management** and backup.
4. **Remote access** and cloud computing.
5. **Reliability and cost saving** — data can be replicated, and expensive equipment is shared.

#### Advantages and Disadvantages of Computer Networks

1. **Advantages:** resource sharing, lower cost, fast communication, centralized data, scalability, remote access.
2. **Disadvantages:** security threats (viruses, hacking), cost of setting up and maintaining the network, dependence on the network (a failure affects many users), and the need for skilled administrators.

### The Internet

The Internet is a **worldwide network of networks** that connects billions of computing devices using the **TCP/IP protocol suite**.

It can be described in two ways:

1. **Nuts-and-bolts view** — the Internet consists of **end systems (hosts)** such as PCs, phones and servers, connected by **communication links** (copper, fibre, radio) and **packet switches** (routers and link-layer switches); end systems reach it through **Internet service providers (ISPs)**, and everything runs on **protocols** such as TCP, IP and HTTP, defined by **Internet standards** (RFCs of the IETF).
2. **Services view** — the Internet is an **infrastructure that provides services to distributed applications** (web, e-mail, video streaming, social media); it provides a **socket interface** through which a program on one end system asks the Internet to deliver data to a program on another end system.

#### ISPs

End systems access the Internet through **Internet service providers (ISPs)** — residential, corporate, university and mobile ISPs. Lower-tier (**access**) ISPs connect to **regional ISPs**, which connect to **tier-1 ISPs** (global backbone providers); ISPs also connect directly to each other at **Internet exchange points (IXPs)**. So the Internet is a **network of networks**.

### History of the Internet

1. **1969 — ARPANET:** the US Department of Defense's Advanced Research Projects Agency (ARPA) built **ARPANET**, the first operational **packet-switched** network, connecting four nodes: UCLA, Stanford Research Institute (SRI), UC Santa Barbara and the University of Utah. The first message was sent from UCLA to SRI on **29 October 1969**.
2. **1971–1972 — e-mail:** Ray Tomlinson wrote the first network e-mail program and introduced the **@** sign.
3. **1974 — TCP/IP:** **Vinton Cerf and Robert Kahn** designed the TCP/IP protocols for connecting different networks.
4. **1 January 1983 — TCP/IP adopted:** ARPANET switched to TCP/IP; the **Domain Name System (DNS)** was also introduced in 1983–1984.
5. **1986 — NSFNET:** the US National Science Foundation's network became the backbone connecting universities; ARPANET was decommissioned in **1990**.
6. **1989–1991 — World Wide Web:** **Tim Berners-Lee** at CERN proposed the Web in 1989 (with HTML, HTTP and URLs) and made it public in 1991.
7. **1990s onwards — commercial Internet:** commercial ISPs, web browsers (Mosaic 1993, Netscape 1994), e-commerce, and later broadband, wireless, smartphones and cloud services.

## Overview of Networking Protocols {#overview-of-networking-protocols}

### Definition of Protocol

A protocol is a **set of rules that governs data communication between devices**, defining the format and order of messages exchanged and the actions taken on sending and receiving them.

Without a common protocol, two devices can be connected but cannot understand each other — just as two people need a common language.

### Key Elements of a Protocol

1. **Syntax** — the **structure or format** of the data: the order and meaning of fields (for example, the first 8 bits are the sender's address).
2. **Semantics** — the **meaning** of each section of bits and the **action** to be taken (for example, what a particular control field means).
3. **Timing** — **when** data should be sent and **how fast** (speed matching and sequencing).

### Examples of Protocols

| Protocol | Full form | Use | Port |
| --- | --- | --- | --- |
| HTTP / HTTPS | Hypertext Transfer Protocol (Secure) | Web pages | 80 / 443 |
| FTP | File Transfer Protocol | File transfer | 20 (data), 21 (control) |
| SMTP | Simple Mail Transfer Protocol | Sending e-mail | 25 |
| POP3 / IMAP | Post Office Protocol / Internet Message Access Protocol | Receiving e-mail | 110 / 143 |
| DNS | Domain Name System | Name to IP address | 53 |
| DHCP | Dynamic Host Configuration Protocol | Automatic IP addresses | 67, 68 |
| Telnet / SSH | — / Secure Shell | Remote login | 23 / 22 |
| SNMP | Simple Network Management Protocol | Network management | 161, 162 (UDP) |
| TCP | Transmission Control Protocol | Reliable, connection-oriented transport | — |
| UDP | User Datagram Protocol | Fast, connectionless transport | — |
| IP | Internet Protocol | Addressing and routing of packets | — |

### Standards Organizations

Protocols are standardized so that equipment from different makers can work together:

1. **IETF** (Internet Engineering Task Force) — Internet standards published as **RFCs** (TCP/IP, HTTP).
2. **IEEE** (Institute of Electrical and Electronics Engineers) — LAN standards such as **802.3 (Ethernet)** and **802.11 (Wi-Fi)**.
3. **ISO** (International Organization for Standardization) — the **OSI model**.
4. **ITU-T** — telecommunication standards.
5. **W3C** (World Wide Web Consortium) — web standards such as HTML and CSS.

## Network Edge and Network Core {#network-edge-and-network-core}

### Network Edge

The network edge is the **part of the network where the end systems (hosts) and their access networks are located**.

1. **End systems (hosts)** — computers, phones, servers and other devices that run applications. They work either as **clients and servers** (a client requests and a server provides a service) or as **peers** (peer-to-peer).
2. **Access network** — the network that **connects an end system to its first (edge) router**:
   - **Home access:** **DSL** (over the telephone line), **cable** (over the cable TV network, HFC), **FTTH** (fibre to the home) and fixed wireless.
   - **Enterprise and campus access:** **Ethernet** LANs and **Wi-Fi** (wireless LAN).
   - **Wide-area wireless access:** **cellular** networks (4G LTE, 5G).
3. **Physical media** — **guided** (twisted-pair copper, coaxial cable, optical fibre) and **unguided** (terrestrial radio, satellite).

### Network Core

The network core is the **mesh of interconnected packet switches (routers) and links that connects the access networks of the Internet**.

Data is moved through the core by one of two switching methods:

1. **Packet switching** — messages are broken into **packets**, which are sent through the network independently. Routers use **store-and-forward transmission**: a router must receive the **whole packet** before it starts sending it on the outgoing link. Packets wait in **output queues (buffers)** when the link is busy, which causes **queuing delay**, and **packet loss** if the buffer is full. Each router uses a **forwarding table** (filled by **routing protocols**) to choose the output link. Links are shared on demand, so resources are used efficiently. The Internet uses packet switching.
2. **Circuit switching** — a **dedicated end-to-end path (circuit)** with reserved bandwidth is set up for the whole duration of a communication, as in the traditional telephone network. Transmission rate is guaranteed, but the reserved capacity is wasted during silent periods. A link is shared among circuits by **FDM** (frequency-division multiplexing — each circuit gets a frequency band) or **TDM** (time-division multiplexing — each circuit gets a time slot in every frame).

![The Internet: end systems and access networks at the edge, connected by routers in the network core](/diagrams/computer-networks/internet-structure.svg)

| Basis | Packet switching | Circuit switching |
| --- | --- | --- |
| Path | No dedicated path; packets routed independently | Dedicated path set up before communication |
| Resource reservation | None; shared on demand | Bandwidth reserved for the whole call |
| Setup | Not needed | Call setup needed |
| Efficiency | High (no idle reserved capacity) | Low for bursty data |
| Delay | Variable (queuing) | Constant after setup |
| Example | The Internet | Traditional telephone network |

### Delay, Loss and Throughput

A packet travelling from one node to the next suffers four delays:

1. **Processing delay (d_proc)** — time to examine the packet header and decide where to send it (microseconds).
2. **Queuing delay (d_queue)** — time waiting in the output buffer for the link; it depends on the traffic (congestion).
3. **Transmission delay (d_trans)** — time to **push all the bits of the packet onto the link**.
4. **Propagation delay (d_prop)** — time for a bit to **travel along the link** from one end to the other.

> **d_nodal = d_proc + d_queue + d_trans + d_prop**

> **d_trans = L ÷ R**

> **d_prop = d ÷ s**

Here:

1. **L** — packet length in bits.
2. **R** — transmission rate (bandwidth) of the link in bits per second.
3. **d** — length of the physical link in metres.
4. **s** — propagation speed of the signal in the medium (about 2 × 10⁸ m/s in copper or fibre).

**Worked example:** a 1,500-byte packet is sent over a 10 Mbps link 2,000 km long (s = 2 × 10⁸ m/s), ignoring processing and queuing.

1. L = 1,500 × 8 = 12,000 bits.
2. d_trans = 12,000 ÷ (10 × 10⁶) = **1.2 ms**.
3. d_prop = (2,000 × 10³) ÷ (2 × 10⁸) = **10 ms**.
4. Total delay = 1.2 + 10 = **11.2 ms**.

**Throughput** is the **rate (bits per second) at which data is actually delivered** from sender to receiver.

For a path of several links, the throughput is the rate of the slowest link — the **bottleneck link**: throughput = **min(R₁, R₂, …, Rₙ)**. **Example:** a server link of 2 Mbps and a client link of 1 Mbps give a throughput of 1 Mbps, so a 4 MB file (32 Mbit) takes 32 ÷ 1 = **32 seconds**.

## Protocol Layers and Service Models {#protocol-layers-and-service-models}

### Protocol Layering

Protocol layering is the **organization of the protocols of a network into layers, where each layer provides services to the layer above it using the services of the layer below it**.

Each layer performs a set of related functions; the protocols of a layer communicate with the same layer on the other machine. This **service model** makes a complex system easier to design, understand and change: a layer's implementation can be changed without affecting the other layers.

**Advantages of layering:** it breaks a complex task into smaller parts, makes the system modular, and allows standardization and independent updating of each layer. **Disadvantage:** some functions may be repeated in several layers, and a layer may need information that is hidden in another layer.

### The Five-Layer Internet Protocol Stack

1. **Application layer** — network applications and their protocols (HTTP, SMTP, FTP, DNS); data unit: **message**.
2. **Transport layer** — delivers messages between application processes (TCP, UDP); data unit: **segment**.
3. **Network layer** — moves datagrams from source host to destination host through routers (IP, routing protocols); data unit: **datagram (packet)**.
4. **Link layer** — moves frames between neighbouring nodes over a single link (Ethernet, Wi-Fi, PPP); data unit: **frame**.
5. **Physical layer** — moves the individual **bits** over the medium (cable, fibre, radio).

The seven-layer **OSI model** adds a **presentation** and a **session** layer between the application and transport layers; it is explained in [OSI and TCP/IP Models](/topics/computer-networks/osi-and-tcp-ip).

### Encapsulation

At the sender, each layer **adds its own header** (control information) to the data received from the layer above, and passes the result to the layer below; this is called **encapsulation**. At the receiver, each layer **removes its header** (decapsulation) and passes the data up. So an application message becomes a transport-layer segment, then a network-layer datagram, then a link-layer frame, and finally bits on the medium.

![Encapsulation: the application message M gets a transport header, a network header and a link header as it moves down the layers](/diagrams/computer-networks/encapsulation.svg)

## Types of Networks: LAN, MAN, WAN {#types-of-networks-lan-man-wan}

### Types of Networks by Area

There are four main types of computer networks by geographical area:

1. **PAN (Personal Area Network)** — a network for **one person's devices** within a range of about **10 metres**, for example a phone connected to earbuds, a smartwatch or a laptop by **Bluetooth**, USB or infrared. A Bluetooth PAN of up to 8 devices is called a **piconet**.
2. **LAN (Local Area Network)** — a network covering a **small area such as a room, building, school or campus** (up to a few kilometres), usually **privately owned**, with **high speed** (100 Mbps–10 Gbps and more), low error rate and low cost. It uses **Ethernet** and **Wi-Fi**. Example: an office or school computer lab network.
3. **MAN (Metropolitan Area Network)** — a network covering a **city or town** (about 5–50 km), connecting several LANs, often owned by a service provider or government. It uses optical fibre, Metro Ethernet and wireless links. Example: a city's cable TV network or a city-wide network of bank branches.
4. **WAN (Wide Area Network)** — a network covering a **large geographical area such as a country or continent**, connecting LANs and MANs through leased lines, satellite links, SONET and other public or shared links. It has lower speed and higher delay and error rate than a LAN, and is expensive. Example: **the Internet** (the largest WAN), and the networks of banks and airlines.

A **CAN (Campus Area Network)** connects the LANs of a university or company campus.

### LAN vs MAN vs WAN

| Basis | LAN | MAN | WAN |
| --- | --- | --- | --- |
| Full form | Local Area Network | Metropolitan Area Network | Wide Area Network |
| Area | Building or campus (up to a few km) | City (about 5–50 km) | Country, continent or world |
| Ownership | Private (one organization) | Private or public | Usually public / many organizations |
| Speed | High | Moderate to high | Lower |
| Delay and errors | Low | Moderate | High |
| Cost | Low | Moderate | High |
| Media | Twisted pair, Ethernet, Wi-Fi | Fibre, Metro Ethernet, microwave | Leased lines, fibre, satellite |
| Example | School lab network | City cable network | The Internet |

### Other Classifications

1. **By transmission:** **point-to-point** networks (a dedicated link between two devices) and **broadcast** networks (one channel shared by all devices, such as Wi-Fi).
2. **By architecture:** **client-server** and **peer-to-peer** networks.
3. **By access:** **intranet** (a private network inside an organization using Internet technologies), **extranet** (an intranet partly opened to partners and customers) and the **Internet** (public).

## References {#references}

**TutorialsPoint**

- [Data Communication and Computer Network](https://www.tutorialspoint.com/data_communication_computer_network/) and [Computer Network Types](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_types.htm) — accessed 2026-11-06 (uses, PAN, LAN, MAN, WAN, internetwork). The LAN section says a LAN can have "as least as two to as much as 16 million" systems, which is a garbled figure and is not used.
- [Internet Overview](https://www.tutorialspoint.com/internet_technologies/internet_overview.htm) and [History of Networking](https://www.tutorialspoint.com/communication_technologies/communication_technologies_history_of_networking.htm) — accessed 2026-11-06 (ARPANET, TCP/IP, DNS, decommissioning of ARPANET)

**GeeksforGeeks**

- [Basics of Computer Networking](https://www.geeksforgeeks.org/computer-networks/basics-computer-networking/) — accessed 2026-11-06 (definition, working, devices, uses)
- [Types of Computer Networks](https://www.geeksforgeeks.org/computer-networks/types-of-computer-networks/) — accessed 2026-11-06 (PAN, LAN, CAN, MAN, WAN, transmission and ownership classification)
- [Protocols in Application Layer](https://www.geeksforgeeks.org/computer-networks/protocols-application-layer/) — accessed 2026-11-06 (protocols and port numbers). It gives SNMP as "161 (TCP), 162 (UDP)"; SNMP uses UDP ports 161 and 162.

**TpointTech**

- [Computer Network Introduction](https://www.tpointtech.com/computer-network-introduction), [Types of Computer Network](https://www.tpointtech.com/types-of-computer-network), [Protocol in Computer Network](https://www.tpointtech.com/protocol-in-computer-network) and [History of the Internet](https://www.tpointtech.com/history-of-the-internet) — accessed 2026-11-06 (components, advantages, network ranges, protocol elements, standards organizations). Its types page calls WAN "very slow", which is an overstatement; WANs are slower than LANs.

**Programiz**

- Programiz has no page on computer networks (checked 2026-11-06).

**Additional source**

- J. F. Kurose and K. W. Ross, *Computer Networking: A Top-Down Approach*, chapter 1 — nuts-and-bolts and services views, ISP structure, network edge and access networks, network core, store-and-forward packet switching, circuit switching with FDM and TDM, the four delays and their formulas, throughput, the five-layer stack and encapsulation (not covered on the reference websites). The worked example was checked with a script.
