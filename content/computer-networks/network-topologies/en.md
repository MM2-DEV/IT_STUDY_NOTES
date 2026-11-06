---
description: Network topologies - physical and logical topology, and the bus, star (switched), ring, mesh, tree, hybrid and point-to-point topologies with their working, advantages, disadvantages, the mesh link formula and a comparison table.
updated: 2026-11-06
---

## Star, Switched, Bus and Ring Topologies {#star-switched-bus-and-ring-topologies}

### Definition of Network Topology

A network topology is the **arrangement of the devices (nodes) and the links that connect them** in a computer network.

It is of two kinds:

1. **Physical topology** — the actual layout of the devices and cables.
2. **Logical topology** — the way **data flows** between the devices, whatever the physical layout. The two can be the same or different (for example, a network can be wired as a star but work logically as a bus).

### Types of Network Topology

There are seven main types of network topology:

1. Bus topology
2. Star topology (and switched topology)
3. Ring topology
4. Mesh topology
5. Tree topology
6. Hybrid topology
7. Point-to-point topology

![Bus, star, ring, mesh, tree and hybrid topologies](/diagrams/computer-networks/topologies.svg)

### 1. Bus Topology

Bus topology is a topology in which **all devices are connected to a single shared cable called the bus (backbone)**.

A signal sent by one device travels along the whole bus and is received by all devices, but only the addressed device accepts it. **Terminators** at both ends of the cable absorb the signal to stop it reflecting back. Only one device can send at a time; access is controlled by a method such as **CSMA/CD**. Example: early coaxial-cable Ethernet (10BASE2, 10BASE5).

**Advantages:**

1. Simple and easy to install.
2. Uses the least cable, so it is cheap.
3. The failure of one device does not affect the others.

**Disadvantages:**

1. If the **backbone cable fails, the whole network stops**.
2. Performance falls as more devices are added (more collisions).
3. Faults are hard to locate.
4. Limited cable length and number of devices.

### 2. Star Topology

Star topology is a topology in which **every device is connected by its own cable to a central device** such as a hub or a switch.

All data passes through the central device, which forwards it to the destination. Example: an office LAN with every computer connected to a switch.

**Advantages:**

1. Easy to install, manage and expand.
2. The failure of one device or cable **affects only that device**.
3. Faults are easy to find.
4. Good performance (no shared backbone).

**Disadvantages:**

1. If the **central device fails, the whole network stops** (single point of failure).
2. Needs more cable than bus topology.
3. The cost of the central device.

#### Switched Topology

A switched topology is a **star topology in which the central device is a switch**. The switch forwards each frame **only to the port of the destination device** (using its MAC address), instead of broadcasting it to all ports as a hub does. So devices can communicate at the same time without collisions (each port is a separate collision domain), and performance and security are better than with a hub. Most modern Ethernet LANs use switched (star) topology.

### 3. Ring Topology

Ring topology is a topology in which **each device is connected to exactly two neighbouring devices, forming a closed loop (ring)**.

Data travels around the ring in **one direction** (unidirectional), passing through each device; each device **regenerates** the signal (acts as a repeater). Access is usually controlled by a **token**: only the device holding the token may send (**token passing**). A **dual ring** sends data in both directions for reliability. Examples: **Token Ring (IEEE 802.5)** and **FDDI**.

**Advantages:**

1. No collisions, because only the token holder sends; all devices get equal access.
2. Performs better than bus under heavy load.
3. Signals are regenerated at each device, so long distances are possible.

**Disadvantages:**

1. The failure of **one device or link can break the whole ring** (unless a dual ring is used).
2. Adding or removing a device disturbs the network.
3. Data passes through many devices, so transmission can be slow; troubleshooting is difficult.

### 4. Mesh Topology

Mesh topology is a topology in which **every device is connected directly to other devices by dedicated point-to-point links**.

1. **Full mesh** — every device is connected to **every other** device.
2. **Partial mesh** — some devices are connected to all others, and others only to the devices they communicate with most.

> **Number of links in a full mesh = n(n − 1) ÷ 2**

> **Number of ports (links) per device = n − 1**

Here **n** is the number of devices.

**Example:** a full mesh of **5** devices needs 5 × 4 ÷ 2 = **10** links, and each device needs **4** ports; a full mesh of **10** devices needs 10 × 9 ÷ 2 = **45** links and 9 ports per device.

**Advantages:**

1. **Very reliable and fault-tolerant** — if one link fails, data takes another path.
2. Dedicated links: no traffic problems, high speed.
3. **Secure and private**, because each link carries only the data of its two devices.
4. Faults are easy to identify.

**Disadvantages:**

1. **Very expensive** — many cables and ports.
2. Difficult to install and reconfigure.
3. Much cabling and space is needed.

Examples: WAN backbones and the core of the Internet (partial mesh), and wireless mesh networks.

### 5. Tree Topology

Tree topology is a **hierarchical topology in which groups of star-connected devices are connected to a central backbone (root)**.

It combines bus and star topologies: the root node is connected to second-level hubs or switches, which connect the devices (or further levels). Example: a campus network with a switch for each department connected to a main switch.

**Advantages:**

1. Easy to **expand** by adding new branches.
2. Faults can be isolated to one branch; easy to manage in segments.
3. Suitable for large networks.

**Disadvantages:**

1. If the **root or backbone fails**, the network is broken into parts.
2. Needs a lot of cable; more complex to configure.

### 6. Hybrid Topology

Hybrid topology is a topology formed by **combining two or more different topologies**, such as star and bus, or star and ring.

Example: several star networks joined by a bus backbone, as in many universities and companies; the Internet is the largest hybrid network.

**Advantages:** flexible, scalable, and reliable (faults stay in one part). **Disadvantages:** complex design, expensive and harder to manage.

### 7. Point-to-Point Topology

Point-to-point topology is the **simplest topology, in which two devices are connected by a dedicated link**. The whole capacity of the link is used by the two devices. Example: a leased line between two branch offices, or a computer connected directly to a printer. It is fast and secure but cannot connect more devices.

### Comparison of Topologies

| Basis | Bus | Star | Ring | Mesh | Tree |
| --- | --- | --- | --- | --- | --- |
| Connection | Single shared cable | Central hub/switch | Closed loop | Every device to every other | Hierarchy of stars |
| Cable needed | Least | More | Moderate | Most | More |
| Cost | Lowest | Moderate | Moderate | Highest | High |
| Effect of one device failing | No effect | Only that device | Can break the ring | No effect (other paths) | Only that branch |
| Single point of failure | Backbone cable | Central device | Any link (single ring) | None | Root / backbone |
| Collisions | Yes | Hub: yes; switch: no | No (token) | No | Depends |
| Expansion | Difficult | Easy | Difficult | Difficult | Easy |
| Example | Old coaxial Ethernet | Office LAN | Token Ring, FDDI | Internet core | Campus network |

## References {#references}

**TutorialsPoint**

- [Computer Network Topologies](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_topologies.htm) — accessed 2026-11-06 (physical and logical topology; point-to-point, bus, star, ring, mesh, tree, daisy chain and hybrid; the mesh formula). It writes that "for every new host n(n − 1)/2 connections are required"; n(n − 1)/2 is the total number of links, and each new host needs n − 1 links.

**GeeksforGeeks**

- [Types of Network Topology](https://www.geeksforgeeks.org/computer-networks/types-of-network-topology/) — accessed 2026-11-06 (definitions, working, advantages, disadvantages and examples of each topology; N − 1 links per node in a mesh)

**TpointTech**

- [Computer Network Topologies](https://www.tpointtech.com/computer-network-topologies) — accessed 2026-11-06 (mesh examples 5 devices → 10 links, 10 → 45; token passing in ring). Its ring section lists "faulty devices can be removed without bringing the network down" as an advantage, which contradicts the single-ring behaviour described by TutorialsPoint (one failure breaks the ring); it holds only for dual rings or rings with bypass.

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — accessed 2026-11-06 (network topologies)

**Programiz**

- Programiz has no page on network topologies (checked 2026-11-06).
