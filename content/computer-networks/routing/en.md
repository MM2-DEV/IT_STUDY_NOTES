---
description: Routing - static, dynamic and default routing; link-state routing with Dijkstra's algorithm and distance-vector routing with the Bellman-Ford equation, count to infinity and its remedies; autonomous systems and the RIP, OSPF and BGP protocols; and unicast, broadcast, multicast and anycast routing with IGMP, DVMRP, MOSPF and PIM.
updated: 2026-11-06
---

## Link-State and Distance-Vector Routing Algorithms {#link-state-and-distance-vector-routing-algorithms}

### Routing

Routing is the **process of finding the best path for packets from a source network to a destination network** and filling the routers' routing (forwarding) tables with it.

A network is modelled as a **graph**: routers are **nodes** and links are **edges**, each with a **cost** (based on distance, delay, bandwidth or money). The best path is the **least-cost path**. Common metrics are **hop count**, bandwidth, delay, load and reliability.

### Types of Routing

1. **Static routing** — routes are entered **manually** by the administrator and do not change unless edited. It is simple and secure but does not adapt to failures; used in small networks.
2. **Dynamic routing** — routers learn routes **automatically** by exchanging information with routing protocols (RIP, OSPF, BGP) and adapt when links change.
3. **Default routing** — packets for any destination not in the table are sent to one **default route** (0.0.0.0/0), usually towards the ISP.

### Classification of Routing Algorithms

1. **Non-adaptive (static) algorithms** — routes are computed in advance and do not depend on the current traffic or topology (for example, **flooding**, where every incoming packet is sent out on every other link).
2. **Adaptive (dynamic) algorithms** — routes change with the topology and traffic. They are of two types:
   1. **Global (centralized)** — every router knows the **complete topology** and all link costs: **link-state** algorithms.
   2. **Decentralized** — each router knows only its **neighbours** and the costs to them, and learns the rest iteratively from them: **distance-vector** algorithms.

### Link-State Routing

Link-state routing is a **routing method in which every router learns the complete topology of the network and computes the least-cost paths to all destinations itself, using Dijkstra's algorithm**.

**Steps:**

1. **Discover neighbours** — each router finds its directly connected neighbours (with Hello packets) and measures the cost of each link.
2. **Build a link-state packet (LSP)** — containing the router's identity, its neighbours and the link costs, with a sequence number and age.
3. **Flood the LSP** — every router sends its LSP to all other routers in the network, so every router obtains the same **link-state database** (a map of the network).
4. **Compute the shortest paths** — each router runs **Dijkstra's algorithm** with itself as the source to build its shortest-path tree and routing table.

### Dijkstra's Algorithm

**Dijkstra's algorithm** is an **algorithm that finds the least-cost paths from one source node to all other nodes** of a graph with non-negative link costs.

**Notation:** D(v) is the current least cost from the source to node v; p(v) is the previous node on that path; N′ is the set of nodes whose least cost is known.

1. **Initialization:** N′ = {source}. For every neighbour v, D(v) = c(source, v); for all other nodes, D(v) = ∞.
2. **Repeat** until all nodes are in N′:
   1. Find the node w not in N′ with the **smallest D(w)** and add it to N′.
   2. For every neighbour v of w not in N′: **D(v) = min(D(v), D(w) + c(w, v))**, and set p(v) = w if the cost decreases.

For n nodes, the simple implementation takes **O(n²)** time.

### Worked Example of Dijkstra's Algorithm

Find the least-cost paths from router **u** in the network below.

![A network with link costs and the shortest-path tree of u](/diagrams/computer-networks/lsr-graph.svg)

| Step | N′ | D(v), p(v) | D(w), p(w) | D(x), p(x) | D(y), p(y) | D(z), p(z) |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | u | 2, u | 5, u | **1, u** | ∞ | ∞ |
| 1 | ux | **2, u** | 4, x | | 2, x | ∞ |
| 2 | uxv | | 4, x | | **2, x** | ∞ |
| 3 | uxvy | | **3, y** | | | 4, y |
| 4 | uxvyw | | | | | **4, y** |
| 5 | uxvywz | | | | | |

In step 1, x is added (D = 1); w improves from 5 to 1 + 3 = 4 through x, and y becomes 1 + 1 = 2. In step 3, w improves to 2 + 1 = 3 through y, and z becomes 2 + 2 = 4. (v and y both have cost 2 in step 2; either may be chosen first.)

**Result:**

| Destination | Least cost | Path | Next hop from u |
| --- | --- | --- | --- |
| v | 2 | u → v | v |
| x | 1 | u → x | x |
| y | 2 | u → x → y | x |
| w | 3 | u → x → y → w | x |
| z | 4 | u → x → y → z | x |

### Distance-Vector Routing

Distance-vector routing is a **routing method in which each router keeps a table (vector) of its least known costs to all destinations, and periodically exchanges it only with its neighbours**, updating its own table with the Bellman-Ford equation.

1. **Initially**, each router knows only the cost to its neighbours; the distance to itself is 0 and to all others ∞.
2. Each router **sends its distance vector to its neighbours** (periodically, and when it changes).
3. On receiving a neighbour's vector, a router **recomputes** its costs; if any cost changes, it sends its new vector to its neighbours.
4. The process continues until no more changes occur (the algorithm **converges**).

It is **iterative, asynchronous and distributed**: each router computes with the information it receives from its neighbours.

### Bellman-Ford Equation

> **Dₓ(y) = minᵥ { c(x, v) + Dᵥ(y) }**

Here **Dₓ(y)** is the least cost from router x to destination y, **c(x, v)** the cost of the link from x to its neighbour v, and **Dᵥ(y)** neighbour v's least cost to y. The minimum is taken over all neighbours v of x; the neighbour that gives the minimum is the **next hop** towards y.

**Example:** in a network of three routers, c(x, y) = 2, c(y, z) = 1 and c(x, z) = 7. Router x computes its cost to z:

Dₓ(z) = min{ c(x, y) + D_y(z), c(x, z) + D_z(z) } = min{ 2 + 1, 7 + 0 } = **3**, through **y** — cheaper than the direct link of cost 7.

![Distance-vector calculation at router x](/diagrams/computer-networks/dv-example.svg)

### Count-to-Infinity Problem

**Count to infinity** is the **problem of distance-vector routing in which, after a link cost rises or a link fails, routers keep increasing their costs step by step through a routing loop**.

In distance-vector routing, **good news travels fast, bad news travels slowly**. When a link cost increases or a link fails, two routers can keep pointing to each other for the destination, creating a **routing loop**, and their costs rise step by step towards "infinity".

**Example:** three routers have c(x, y) = 4, c(y, z) = 1 and c(z, x) = 50, so D_y(x) = 4 and D_z(x) = 5 (through y). The cost of link x–y rises to 60.

1. y computes D_y(x) = min{60 + 0, 1 + D_z(x)} = min{60, 1 + 5} = **6**, through z — but z's cost of 5 was itself through y. A **loop** y → z → y forms.
2. z then computes D_z(x) = min{50, 1 + 6} = **7**; y computes 8; z 9; and so on.
3. The costs grow by 1 in each exchange, and only after more than 40 exchanges does z's cost reach **50**, when it finally uses its direct link to x. If the link had failed completely, the costs would count up to "infinity".

### Remedies for Count to Infinity

1. **Maximum metric** — "infinity" is defined as a small number (16 in RIP), so counting stops quickly.
2. **Split horizon** — a router does **not advertise** a route back to the neighbour from which it learnt it.
3. **Poisoned reverse** — a router advertises such routes back to that neighbour with cost **∞**, so the neighbour does not route through it.
4. **Hold-down timers** — after a route fails, a router ignores updates about it for a time.
5. **Triggered updates** — changes are sent immediately instead of waiting for the next periodic update.

Split horizon and poisoned reverse solve loops between **two** routers, but not loops involving three or more routers.

### Distance-Vector vs Link-State Routing

| Basis | Distance-vector routing | Link-state routing |
| --- | --- | --- |
| Knowledge | Local: each router knows only its neighbours' vectors | Global: every router knows the whole topology |
| Information sent | The whole routing table (distance vector) | Only its own link states (LSPs) |
| Sent to | Neighbours only | All routers (flooding) |
| When sent | Periodically and on change | On change (and periodic refresh) |
| Algorithm | Bellman-Ford | Dijkstra |
| Convergence | Slow; count-to-infinity problem; routing loops | Fast; no count to infinity |
| Bandwidth | Less (small messages to neighbours) | More (flooding of LSPs) |
| CPU and memory | Less | More (database and Dijkstra computation) |
| Message complexity | Low | O(n × E) messages for n nodes and E links |
| Robustness | An error spreads to the whole network | Each router computes its own table |
| Protocols | RIP, IGRP | OSPF, IS-IS |

## RIP, OSPF, BGP {#rip-ospf-bgp}

### Autonomous System

An autonomous system (AS) is a **group of routers and networks under one administrative control (such as an ISP, a university or a company) that uses one routing policy**.

Each AS has a unique **AS number** (ASN), assigned by the regional registries (APNIC for Bangladesh). Routing in the Internet is **hierarchical**:

1. **Intra-AS (intradomain) routing** — inside one AS, with an **interior gateway protocol (IGP)**: **RIP** or **OSPF**. Each AS can choose its own.
2. **Inter-AS (interdomain) routing** — between ASes, with an **exterior gateway protocol (EGP)**: **BGP**, used by the whole Internet.

Routers at the edge of an AS that connect to other ASes are **gateway (border) routers**.

![Hierarchical routing with autonomous systems](/diagrams/computer-networks/as-routing.svg)

### RIP

RIP (Routing Information Protocol) is an **intra-AS (interior) routing protocol based on the distance-vector algorithm, which uses hop count as its metric**.

1. **Metric:** **hop count** — the number of routers (subnets) on the path; each link has cost 1.
2. **Maximum:** **15 hops**; a cost of **16 means unreachable** (infinity), so RIP is limited to small networks.
3. **Updates:** each router sends its whole routing table to its neighbours every **30 seconds** in RIP **response (advertisement)** messages.
4. **Timers:** a route not refreshed for **180 seconds** is marked invalid (the neighbour is assumed dead), and is removed after **240 seconds**.
5. **Transport:** RIP messages are carried in **UDP, port 520**; RIP is implemented as an application-level process (routed) that updates the network layer's table.
6. **Loop prevention:** split horizon, poisoned reverse, route poisoning and hold-down timers.

| Version | Year | Updates sent to | Addressing |
| --- | --- | --- | --- |
| RIPv1 | 1988 | Broadcast (255.255.255.255) | Classful (no subnet mask) |
| RIPv2 | 1993 | Multicast (224.0.0.9) | Classless (subnet mask; supports VLSM, authentication) |
| RIPng | 1997 | Multicast (FF02::9) | IPv6 |

**Advantages:** simple to configure and understand; supported by all routers. **Disadvantages:** slow convergence, count to infinity, a 15-hop limit, and much traffic from periodic full-table updates.

### OSPF

OSPF (Open Shortest Path First) is an **intra-AS (interior) routing protocol based on the link-state algorithm, which floods link-state advertisements and computes routes with Dijkstra's algorithm**.

1. **Metric:** a **cost** for each link, set by the administrator (commonly inversely proportional to the link bandwidth), so a fast path with more hops can be preferred over a slow one.
2. **Operation:** routers find neighbours with **Hello** packets, exchange their link-state databases, and **flood link-state advertisements (LSAs)** whenever a link changes (and at least every 30 minutes). Each router runs **Dijkstra's algorithm** on its database.
3. **Transport:** OSPF messages are carried **directly in IP** (protocol number **89**), not in TCP or UDP.
4. **Areas (hierarchy):** a large AS is divided into **areas**; all areas connect to the **backbone area (area 0)**. Area border routers summarize routes between areas, which limits flooding.
5. **Designated router (DR)** and **backup DR (BDR)** are elected on a multi-access network (such as Ethernet) to reduce the number of adjacencies and LSAs.
6. **Advanced features:** authentication of messages, **equal-cost multipath** (several paths with the same cost can be used together), support for CIDR and VLSM, and fast convergence. **"Open"** means the protocol specification is publicly available.

### BGP

BGP (Border Gateway Protocol) is the **inter-AS (exterior) routing protocol of the Internet, a path-vector protocol that lets each AS learn which destination prefixes are reachable through its neighbouring ASes and choose routes according to its policies**.

1. **Path vector:** each route advertisement contains the destination **prefix** and attributes, especially the **AS-PATH** — the list of ASes the advertisement has passed through. A router rejects routes that contain its own AS number, which **prevents loops**.
2. **Transport:** BGP routers (peers) exchange messages over semi-permanent **TCP connections on port 179** (OPEN, UPDATE, KEEPALIVE and NOTIFICATION messages).
3. **eBGP and iBGP:** **external BGP (eBGP)** sessions run between gateway routers of **different** ASes; **internal BGP (iBGP)** sessions spread the learnt routes to the routers **inside** an AS.
4. **Attributes:** besides AS-PATH, a route has a **NEXT-HOP** (the IP address of the router interface that begins the AS-PATH) and a **LOCAL-PREF** (local preference) set by the AS's policy.
5. **Policy routing:** an AS can decide, for business reasons, which routes to accept and which to advertise to its neighbours (for example, an ISP does not carry transit traffic between two other ISPs for free).

**BGP route selection.** When a router has several routes to the same prefix, it chooses in this order:

1. The route with the highest **local preference** (the policy decision of the AS).
2. Among those, the route with the **shortest AS-PATH** (fewest ASes).
3. Among those, the route with the **closest NEXT-HOP router** (least intra-AS cost) — **hot-potato routing**, which sends the packet out of its own AS as quickly as possible.
4. If a tie still remains, the route learnt from the router with the lowest **BGP identifier**.

### RIP vs OSPF vs BGP

| Basis | RIP | OSPF | BGP |
| --- | --- | --- | --- |
| Type | Interior (IGP) | Interior (IGP) | Exterior (EGP) |
| Algorithm | Distance vector (Bellman-Ford) | Link state (Dijkstra) | Path vector |
| Metric | Hop count (max 15) | Link cost (bandwidth-based) | Policy and path attributes (AS-PATH) |
| Updates | Whole table every 30 s | LSAs on change (refresh every 30 min) | Incremental updates on change |
| Transport | UDP port 520 | IP protocol 89 | TCP port 179 |
| Convergence | Slow | Fast | Slow (but scalable) |
| Hierarchy | None (flat) | Areas with backbone area 0 | Autonomous systems |
| Network size | Small | Large enterprise and ISP networks | The whole Internet |

### Interior vs Exterior Gateway Protocols

| Basis | Interior gateway protocol (IGP) | Exterior gateway protocol (EGP) |
| --- | --- | --- |
| Used | Inside one autonomous system | Between autonomous systems |
| Main goal | Performance: least-cost paths | Policy and reachability; scale |
| Administration | One administrator | Different organizations |
| Examples | RIP, OSPF, IS-IS, EIGRP | BGP |

## Unicast and Multicast Routing Protocols {#unicast-and-multicast-routing-protocols}

### Types of Delivery

1. **Unicast** — **one-to-one**: a packet goes from one source to one destination.
2. **Broadcast** — **one-to-all**: a packet goes to all hosts on a network. A **limited broadcast** (255.255.255.255) stays on the local network; a **directed broadcast** (for example, 192.168.1.255) is sent to all hosts of a specific network.
3. **Multicast** — **one-to-many**: a packet goes to a **group** of interested receivers (for example, live video to subscribers), using class D addresses (224.0.0.0 – 239.255.255.255).
4. **Anycast** — **one-to-nearest**: several servers share one address, and a packet goes to the **nearest** of them, as chosen by the routing protocols (used, for example, by DNS root servers).

### Unicast Routing Protocols

Unicast routing finds a path for packets sent to **one** destination. It uses the routing protocols described above:

1. **Distance-vector protocols** — RIP (and Cisco's IGRP and EIGRP).
2. **Link-state protocols** — OSPF and IS-IS.
3. **Path-vector protocols** — BGP.

### Broadcast Routing

1. **N-way unicast** — the source sends a separate copy to each destination (wasteful, and the source must know every address).
2. **Uncontrolled flooding** — every router sends a received packet out on all its other links; in a network with loops, copies multiply endlessly (a **broadcast storm**).
3. **Controlled flooding** — a router floods a packet only the first time it sees it (**sequence-number-controlled** flooding), or only if it arrived on the link on its own shortest path back to the source (**reverse path forwarding, RPF**).
4. **Spanning-tree broadcast** — packets are sent only along the links of a **spanning tree** (a tree that connects all routers with no loops), so each router receives exactly one copy.

### Multicast Routing

Multicast routing is the **routing of packets from a source to all members of a multicast group**, sending only one copy of each packet over each link of a tree that connects the routers with group members.

It has two tasks: finding out **which hosts are members** of a group, and building a **multicast tree** to reach them. Routers whose attached hosts are not group members are **pruned** from the tree.

1. **Source-based tree** — a separate tree for **each source** of the group (for example, a shortest-path tree rooted at the source, built with reverse path forwarding and pruning).
2. **Group-shared tree** — **one tree** shared by all sources of the group, built around a **centre (core or rendezvous point)**; sources send their packets to the centre, which sends them down the tree.

### IGMP

IGMP (Internet Group Management Protocol) is a **protocol that hosts and their local router use to manage multicast group membership**: a host uses it to **join** or **leave** a group, and the router uses it to **query** which groups have members on its attached networks.

IGMP works only between a host and its **first-hop router**. The routers then use a **multicast routing protocol** to send group traffic across the network. (In IPv6, the same job is done by MLD.)

### Multicast Routing Protocols

1. **DVMRP (Distance Vector Multicast Routing Protocol)** — based on distance vectors (derived from RIP); builds **source-based trees** with **reverse path forwarding**, flooding the first packets and then **pruning** the branches with no members (**flood and prune**).
2. **MOSPF (Multicast OSPF)** — an extension of OSPF; routers flood group-membership information as link states, so every router knows where the members are and computes a **source-based shortest-path tree** with Dijkstra's algorithm. It works only within an OSPF domain.
3. **PIM (Protocol Independent Multicast)** — works with **any** unicast routing protocol (it uses the existing unicast routing table):
   1. **PIM dense mode (PIM-DM)** — for groups whose members are close together and everywhere; uses **flood and prune**, like DVMRP (source-based trees).
   2. **PIM sparse mode (PIM-SM)** — for groups with few, widely scattered members; routers explicitly **join** a **shared tree** rooted at a **rendezvous point (RP)**, and can later switch to a source-based tree.
4. **CBT (Core-Based Trees)** — builds a **group-shared tree** around a core router.

### Unicast vs Multicast Routing

| Basis | Unicast routing | Multicast routing |
| --- | --- | --- |
| Receivers | One destination | A group of receivers |
| Addresses | Unicast addresses (classes A, B, C) | Group addresses (class D: 224.0.0.0 – 239.255.255.255) |
| Path | One least-cost path | A tree (source-based or group-shared) |
| Copies of a packet | One per receiver if sent to many | One per link of the tree |
| Membership management | Not needed | IGMP |
| Protocols | RIP, OSPF, BGP | DVMRP, MOSPF, PIM, CBT |

## References {#references}

**TutorialsPoint**

- [Network Layer Routing](https://www.tutorialspoint.com/data_communication_computer_network/network_layer_routing.htm), [Routing Algorithm](https://www.tutorialspoint.com/data_communication_computer_network/routing_algorithm.htm), [Shortest Path Algorithm](https://www.tutorialspoint.com/data_communication_computer_network/shortest_path_algorithm.htm), [Link State Routing](https://www.tutorialspoint.com/data_communication_computer_network/link_state_routing.htm), [Adaptive](https://www.tutorialspoint.com/data_communication_computer_network/adaptive_routing_algorithm.htm) and [Non-Adaptive Routing Algorithms](https://www.tutorialspoint.com/data_communication_computer_network/non_adaptive_routing_algorithm.htm), [Routing Table](https://www.tutorialspoint.com/data_communication_computer_network/routing_table.htm) and [Unicast, Broadcast and Multicast](https://www.tutorialspoint.com/data_communication_computer_network/unicast_broadcast_and_multicast.htm) — accessed 2026-11-06 (default routes; unicast, broadcast, multicast and anycast routing; reverse path forwarding; distance-vector and link-state routing; flooding; limited and directed broadcast). It states that anycast routing "is done with help of DNS server"; anycast delivery to the nearest server is done by the routing protocols (several servers advertise the same address).
- [Routing Information Protocol](https://www.tutorialspoint.com/data_communication_computer_network/routing_information_protocol.htm), [Open Shortest Path First Protocol](https://www.tutorialspoint.com/data_communication_computer_network/open_shortest_path_first_protocol.htm) and [Border Gateway Protocol](https://www.tutorialspoint.com/data_communication_computer_network/border_gateway_protocol.htm) — accessed 2026-11-06 (hop count with a maximum of 15, 30-second updates, port 520, RIP versions; LSAs, link-state database, SPF, areas and backbone area 0; path-vector routing, eBGP and iBGP). The RIP page places port 520 "on the OSI model of network layer"; RIP messages are carried in UDP (port 520). The OSPF page says the checksum is used "to find and fix errors"; a checksum only detects errors.

**GeeksforGeeks**

- [Types of Routing](https://www.geeksforgeeks.org/computer-networks/types-of-routing/), [Classification of Routing Algorithms](https://www.geeksforgeeks.org/computer-networks/classification-of-routing-algorithms/), [Distance Vector Routing](https://www.geeksforgeeks.org/computer-networks/distance-vector-routing-dvr-protocol/), [Link State Routing](https://www.geeksforgeeks.org/computer-networks/unicast-routing-link-state-routing/) and [Difference between Distance Vector and Link State Routing](https://www.geeksforgeeks.org/computer-networks/difference-between-distance-vector-routing-and-link-state-routing/) — accessed 2026-11-06 (static, default and dynamic routing; adaptive and non-adaptive algorithms; the Bellman-Ford equation; the comparison table). The distance-vector page lists "route missiles" among its applications, which is not a networking use and is not included.
- [Routing Information Protocol (RIP)](https://www.geeksforgeeks.org/computer-networks/routing-information-protocol-rip/), [OSPF Protocol States](https://www.geeksforgeeks.org/computer-networks/open-shortest-path-first-ospf-protocol-states/) and [Border Gateway Protocol (BGP)](https://www.geeksforgeeks.org/computer-networks/border-gateway-protocol-bgp/) — accessed 2026-11-06 (RIP timers 30, 180 and 240 s and versions; Hello packets, DR and BDR election; BGP as a path-vector EGP over TCP). Its RIP page says RIP "operates at the Network Layer"; RIP serves the network layer but runs as an application over UDP. Its BGP page calls BGP "highly secure"; BGP itself has weak security (route hijacking is a known problem). GeeksforGeeks' multicast routing URL returns 404.

**TpointTech**

- [Routing](https://www.tpointtech.com/computer-network-routing), [Routing Algorithm](https://www.tpointtech.com/computer-network-routing-algorithm), [Distance Vector Routing Algorithm](https://www.tpointtech.com/distance-vector-routing-algorithm), [Link State Routing Algorithm](https://www.tpointtech.com/link-state-routing-algorithm), [Count to Infinity Problem](https://www.tpointtech.com/count-to-infinity-problem-in-distance-vector-routing), [RIP Protocol](https://www.tpointtech.com/rip-protocol), [OSPF Protocol](https://www.tpointtech.com/ospf-protocol), [Border Gateway Protocol](https://www.tpointtech.com/border-gateway-protocol), [Routing Protocols](https://www.tpointtech.com/routing-protocols-in-computer-networks) and [Autonomous System](https://www.tpointtech.com/what-is-autonomous-system) — accessed 2026-11-06 (static and dynamic routing, the two-node loop, split horizon and poisoned reverse, RIP, OSPF, BGP and autonomous systems)

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — accessed 2026-11-06 (item 45, distance-vector vs link-state; item 84, packet delivery with OSPF; item 85, LSAs and the SPF algorithm; item 86, the BGP path-selection steps; item 87, static, dynamic, default and ad hoc routing, and Dijkstra's algorithm for shortest paths). Items 45, 85 and 86 give no answer text.

**Programiz**

- Programiz has no page on routing (checked 2026-11-06). Dijkstra's and Bellman-Ford algorithms as graph algorithms are covered in the data structures topics.

**Additional sources** (used because the reference websites have no page on multicast routing protocols and do not give the Dijkstra table of this example, the count-to-infinity numbers or the BGP route-selection order)

- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, chapter 5 (link-state and distance-vector algorithms, the example network, count to infinity with costs 4, 1 and 50, OSPF, BGP route selection and hot-potato routing) and section 4.7 of earlier editions (broadcast and multicast routing).
- Wikipedia, [Internet Group Management Protocol](https://en.wikipedia.org/wiki/Internet_Group_Management_Protocol), [Distance Vector Multicast Routing Protocol](https://en.wikipedia.org/wiki/Distance_Vector_Multicast_Routing_Protocol) and [Protocol Independent Multicast](https://en.wikipedia.org/wiki/Protocol_Independent_Multicast) — accessed 2026-11-06 (IGMP membership queries and leaving a group, MLD in IPv6; DVMRP based on RIP with reverse path flooding and prune messages; PIM independent of the unicast protocol, PIM-DM flood and prune, PIM-SM shared trees rooted at a rendezvous point).
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapter 21 (multicast routing: source-based and group-shared trees, DVMRP, MOSPF, PIM and CBT). The Dijkstra and count-to-infinity examples above were checked by a script.
