---
description: Network devices and internetworking - repeater, hub, bridge, switch, router, brouter, gateway, modem, NIC and access point, the OSI layer of each device, collision and broadcast domains, bridges vs routers, hub vs switch vs router, and network interconnection.
updated: 2026-11-06
---

## Network Devices Used at Each Layer {#network-devices-used-at-each-layer}

### Network Devices

Network (connecting) devices are **hardware devices that connect computers and networks and control the flow of data between them**.

Each device works at a particular layer of the OSI model, which decides what information it uses (signals, MAC addresses, IP addresses or application data).

![Network devices and the OSI layers at which they work](/diagrams/computer-networks/devices-layers.svg)

### Physical Layer Devices

#### Repeater

A repeater is a **physical-layer device that regenerates a weak or corrupted signal and retransmits it**, so that it can travel a longer distance.

It works with **signals (bits)** only: it does not read addresses, filter traffic or connect different types of networks. A repeater connects two segments of the **same LAN** (for example, extending an Ethernet cable). A **digital** repeater regenerates the original bit pattern, while an **analog** one only amplifies (including the noise).

#### Hub

A hub is a **physical-layer device that connects several devices in a star network and repeats every incoming signal to all its other ports** (a multiport repeater).

It does not check addresses, so all devices receive all data, and all ports share one **collision domain** and bandwidth; it works in half-duplex mode. Hubs are now largely replaced by switches.

Types of hubs:

1. **Passive hub** — only connects the cables; does not amplify or regenerate the signal (needs no power).
2. **Active hub** — regenerates (amplifies) the signal before sending it out; needs power.
3. **Intelligent (smart) hub** — an active hub with management features (such as SNMP monitoring).

#### Modem

A modem (modulator–demodulator) is a **device that converts digital data from a computer into analog signals for transmission (modulation) and converts received analog signals back into digital data (demodulation)**.

It connects a computer or LAN to an ISP over telephone lines (DSL modem), cable TV lines (cable modem) or fibre (ONT).

### Data Link Layer Devices

#### Network Interface Card (NIC)

A network interface card (NIC) is a **hardware component that connects a computer to a network**.

It has a unique 48-bit **MAC (physical) address** and works at the **physical and data link layers**. It can be wired (Ethernet) or wireless (Wi-Fi), internal (expansion slot or built into the motherboard) or external (USB).

#### Bridge

A bridge is a **data-link-layer device that connects two LAN segments and forwards or filters frames using their MAC addresses**.

It keeps a **table of MAC addresses** for each port: a frame is forwarded only if its destination is on the other segment, otherwise it is **filtered** (dropped). This divides the network into separate **collision domains** and reduces traffic. A bridge usually has only two (or a few) ports and forwards in software.

Types of bridges:

1. **Transparent (learning) bridge** — invisible to the stations; it **learns** the MAC addresses on each port automatically from the source addresses of frames and builds its table itself (used in Ethernet; the **spanning tree protocol** prevents loops).
2. **Source-routing bridge** — the **sending station** decides the route and puts it in the frame; the bridge simply follows it (used in Token Ring).

#### Switch

A switch is a **data-link-layer device that connects many devices and forwards each frame only to the port of its destination, using MAC addresses**.

It is a multiport bridge: it learns the MAC addresses on each port, works in **full duplex**, and gives each port its own **collision domain**, so many devices can communicate at the same time without collisions. It forwards frames in hardware (ASICs) by **store-and-forward**, **cut-through** or **fragment-free** switching. Switches are the main devices in modern LANs; managed switches support VLANs. A **layer-3 switch** can also route packets using IP addresses.

#### Access Point (AP)

A wireless access point is a **device that connects wireless devices to a wired network (LAN) using Wi-Fi (IEEE 802.11)**. It works at the data link layer, acting as a bridge between the wireless and wired network.

### Network Layer Devices

#### Router

A router is a **network-layer device that connects different networks and forwards packets between them by choosing the best path using IP addresses**.

It keeps a **routing table**, built manually or by **routing protocols** (RIP, OSPF, BGP), and uses it to forward each packet towards its destination. A router separates both **collision domains** and **broadcast domains**, can connect LANs to WANs (and to the Internet), and often provides **NAT**, firewall and DHCP functions.

#### Brouter

A brouter (bridging router) is a **device that works as both a bridge and a router**: it **routes** packets of routable protocols (such as IP) and **bridges** frames of non-routable protocols.

It works at the data link and network layers and is rarely used today.

### Upper Layer Device

#### Gateway

A gateway is a **device that connects two networks using different protocols and converts data from one protocol to the other**.

It is a protocol converter and usually works at the **upper layers (transport to application)**, but can work at all seven layers. It is the entry and exit point of a network. Examples: an e-mail gateway between different mail systems, a VoIP gateway between the telephone network and an IP network, and an IoT gateway.

### Collision Domain and Broadcast Domain

1. **Collision domain** — the part of a network in which **frames sent at the same time can collide** (on a shared medium in half-duplex mode).
2. **Broadcast domain** — the part of a network that **receives every broadcast frame** sent by any device in it.

| Device | Breaks collision domains | Breaks broadcast domains |
| --- | --- | --- |
| Repeater | No | No |
| Hub | No | No |
| Bridge | Yes | No |
| Switch | Yes (each port is one) | No (unless VLANs are used) |
| Router | Yes | Yes (each interface is one) |

### Hub vs Switch vs Router

| Basis | Hub | Switch | Router |
| --- | --- | --- | --- |
| OSI layer | Physical (1) | Data link (2) | Network (3) |
| Address used | None | MAC address | IP address |
| Data unit | Bits / signals | Frames | Packets |
| Forwarding | Broadcasts to all ports | Sends only to the destination port | Sends along the best path to another network |
| Collision domain | One shared | One per port | One per interface |
| Broadcast domain | One | One | One per interface |
| Duplex | Half | Full | Full |
| Used to connect | Devices in a LAN | Devices in a LAN | Different networks (LAN–WAN, Internet) |
| Intelligence | None ("dumb") | Learns MAC addresses | Routing table, routing protocols |

## Bridges and Routers {#bridges-and-routers}

### Bridge vs Router

| Basis | Bridge | Router |
| --- | --- | --- |
| OSI layer | Data link (2) | Network (3) |
| Address used | MAC (physical) address | IP (logical) address |
| Connects | Segments of the same LAN (same network) | Different networks (LANs and WANs) |
| Table | MAC address (bridging) table, learned | Routing table (static or dynamic) |
| Path selection | No routing; one path | Chooses the best of several paths |
| Broadcasts | Forwarded (one broadcast domain) | Not forwarded (separate broadcast domains) |
| Collision domains | Separated | Separated |
| Protocol dependence | Transparent to upper-layer protocols | Must understand the network-layer protocol (such as IP) |
| Ports | Usually two | Several |
| Speed | Faster (simple filtering) | Slower (more processing per packet) |

### Switch vs Bridge

| Basis | Bridge | Switch |
| --- | --- | --- |
| Ports | Few (usually 2) | Many (8, 24, 48 …) |
| Forwarding | Software | Hardware (ASIC), faster |
| Switching method | Store-and-forward | Store-and-forward, cut-through, fragment-free |
| Buffers and error checking | Limited | Yes |

## Network Interconnection {#network-interconnection}

### Internetworking

Internetworking is the **connection of two or more separate networks — possibly of different types — so that devices on them can communicate as one larger network (an internet)**.

The network formed is called an **internetwork (internet)**; the global Internet is the largest example. Different interconnecting devices are used depending on how different the networks are:

1. **Repeaters and hubs** — join cable **segments of the same LAN** at the physical layer; they extend the network but do not reduce traffic.
2. **Bridges and switches** — join **LAN segments** at the data link layer into an **extended LAN**, filtering frames by MAC address and dividing collision domains.
3. **Routers** — join **different networks** (LANs, MANs, WANs) at the network layer, routing packets by IP address and dividing broadcast domains; the Internet is built from routers.
4. **Gateways** — join networks that use **completely different protocols** (for example, different addressing or message formats), converting between them at the upper layers.

### Need for Internetworking

1. To let users in different networks (offices, branches, organizations) share data and resources.
2. To extend a network beyond the limits of distance and number of devices of one LAN.
3. To divide a large network into smaller segments for better performance and security.
4. To connect private networks to the Internet.

## References {#references}

**TutorialsPoint**

- [Repeaters](https://www.tutorialspoint.com/data_communication_computer_network/repeaters.htm), [Bridges](https://www.tutorialspoint.com/data_communication_computer_network/bridges.htm), [Switches](https://www.tutorialspoint.com/data_communication_computer_network/switches.htm), [Gateways](https://www.tutorialspoint.com/data_communication_computer_network/gateways.htm), [Network Interface Card](https://www.tutorialspoint.com/data_communication_computer_network/network_interface_card_nic.htm) and [Basic Network Hardware](https://www.tutorialspoint.com/data_communication_computer_network/basic_network_hardware.htm) — accessed 2026-11-06 (functions and types of each device; transparent and source-routing bridges). Its bridge page says a bridge "accepts all the packets and amplifies all of them" and then that it passes "only selective packets"; a bridge filters frames, as described above.

**GeeksforGeeks**

- [Network Devices (Hub, Repeater, Bridge, Switch, Router, Gateways)](https://www.geeksforgeeks.org/computer-networks/network-devices-hub-repeater-bridge-switch-router-gateways/) — accessed 2026-11-06 (layer of each device, hub vs switch vs router table, brouter, access point). It heads the gateway section "Layer 4–7" but says in the text that a gateway works at all seven layers; both are reflected above.
- [Difference between Switch and Bridge](https://www.geeksforgeeks.org/computer-networks/difference-between-switch-and-bridge/) and [Difference between Router and Switch](https://www.geeksforgeeks.org/computer-networks/difference-between-router-and-switch/) — accessed 2026-11-06. The router–switch page gives speeds such as "1–10 Mbps" for routers, which are outdated and are not used.

**TpointTech**

- [Collision Domain and Broadcast Domain](https://www.tpointtech.com/collision-domain-and-broadcast-domain), [Router vs Bridge](https://www.tpointtech.com/router-vs-bridge) and [Switch vs Router](https://www.tpointtech.com/switch-vs-router) — accessed 2026-11-06 (which devices separate collision and broadcast domains; bridge vs router table)

**Programiz**

- Programiz has no page on network devices (checked 2026-11-06).
