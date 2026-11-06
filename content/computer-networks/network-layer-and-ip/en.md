---
description: Network layer and IP - forwarding and routing, datagram networks, the inside of a router and longest prefix matching, IPv4 datagram format and fragmentation, IPv4 addresses (classful, classless, private, special), DHCP and NAT, subnetting and VLSM with worked examples, ARP and ICMP, and IPv6 with its header, addresses and transition.
updated: 2026-11-06
---

## Datagram Networks {#datagram-networks}

### Network Layer

The network layer is the **layer that moves packets (datagrams) from the source host to the destination host across many networks**, choosing their route through the routers.

The transport layer gives **process-to-process** delivery; the network layer gives **host-to-host** delivery. Its two main functions are:

1. **Forwarding** — moving a packet from a router's **input link to the correct output link**, using the router's forwarding table. It is done locally, in each router, in nanoseconds (the **data plane**).
2. **Routing** — deciding the **whole path** that packets take from source to destination, using **routing algorithms** (such as OSPF and BGP) to build the forwarding tables. It is network-wide and slower (the **control plane**); see [Routing](/topics/computer-networks/routing).

Other functions are **logical addressing** (IP addresses), **fragmentation** of packets to suit each link's MTU, and error reporting (ICMP).

### Network-Layer Service Model

The Internet's network layer (IP) provides **best-effort service**: it tries to deliver every packet but gives **no guarantee** of delivery, order, delay, bandwidth or freedom from errors. Reliability, if needed, is added by the transport layer (TCP).

### Datagram Network

A datagram network is a **connectionless packet-switched network in which each packet (datagram) carries the full destination address and is forwarded independently**, without any connection setup.

1. Routers keep **no state** about connections; each one forwards a datagram by looking up its destination address in the **forwarding table**.
2. Datagrams of the same message may take **different paths**, arrive **out of order**, or be lost.
3. Forwarding tables change only when routing protocols update them (every one to five minutes or so), not for each connection.
4. The **Internet** (IP) is a datagram network.

In a **virtual-circuit network** (such as ATM, Frame Relay, X.25), a path is set up before data transfer, routers keep state for each connection, and each packet carries a short VC number. The comparison of datagram and virtual-circuit networks is given in [Switching Techniques](/topics/computer-networks/switching-techniques#packet-switching).

### Forwarding with Longest Prefix Matching

Forwarding tables do not list every address; they list **address ranges (prefixes)** and an output link for each. When several entries match a destination address, the router uses the **longest prefix match**: the entry with the **longest (most specific) matching prefix**.

**Example:** a router has entries for 192.168.0.0/16, 192.168.16.0/20, 192.168.20.0/22 and 192.168.20.0/25. A datagram arrives for **192.168.20.45**. All four prefixes contain this address, so the router chooses the longest, **192.168.20.0/25** (25 bits), and forwards the datagram on its link.

## Inside a Router {#inside-a-router}

### Router

A router is a **network-layer device that connects different networks and forwards datagrams between them**, using a forwarding table computed by routing protocols.

### Components of a Router

A router has four main components:

1. **Input ports** — terminate the incoming physical link and perform link-layer functions; look up the output port in the **forwarding table** (a copy is kept in each input port, so lookups are done locally at line speed); and queue datagrams waiting for the switching fabric.
2. **Switching fabric** — connects the input ports to the output ports.
3. **Output ports** — store datagrams received from the fabric in a queue and transmit them on the outgoing link.
4. **Routing processor** — runs the routing protocols, keeps the routing tables and computes the forwarding table (control plane); it also performs network management.

![Inside a router](/diagrams/computer-networks/router-architecture.svg)

### Types of Switching Fabric

There are three types of switching fabric:

1. **Switching via memory** — the routing processor (CPU) copies each packet from the input port into memory and then to the output port, as in early routers. Speed is limited by memory bandwidth; only one packet is moved at a time.
2. **Switching via a bus** — input ports send packets directly to output ports over a **shared bus**. Only one packet can cross the bus at a time, so speed is limited by the bus bandwidth.
3. **Switching via an interconnection network** — such as a **crossbar**, with 2N buses connecting N inputs to N outputs. Packets going to **different** output ports can be forwarded **at the same time**.

### Queuing in a Router

1. **Input queuing** — if the fabric is slower than the input ports, packets wait at the inputs. **Head-of-the-line (HOL) blocking** occurs when a packet at the front of a queue waits for a busy output and blocks the packets behind it, even though their outputs are free.
2. **Output queuing** — when packets arrive at an output faster than the link can send them, they wait in the output queue. If the buffer is full, packets are **dropped** (packet loss).

### Packet Scheduling

The output port chooses the order in which queued packets are sent:

1. **FIFO (first-in, first-out)** — in order of arrival.
2. **Priority queuing** — higher-priority classes are always sent first.
3. **Round robin** — the scheduler serves the classes in turn.
4. **Weighted fair queuing (WFQ)** — round robin in which each class gets a share of the bandwidth according to its weight.

## Internet Protocol (IP) {#internet-protocol-ip}

### Definition of IP

The Internet Protocol (IP) is the **main network-layer protocol of the Internet, which defines the format of datagrams and the addressing of hosts and routers, and delivers datagrams on a best-effort, connectionless basis**.

The current versions are **IPv4** (32-bit addresses) and **IPv6** (128-bit addresses). IP works together with **ICMP** (error reporting), **ARP** (address resolution) and routing protocols.

### IPv4 Datagram Format

![IPv4 datagram header](/diagrams/computer-networks/ipv4-header.svg)

| Field | Size | Purpose |
| --- | --- | --- |
| Version | 4 bits | IP version (4) |
| Header length (HLEN) | 4 bits | Header length in 4-byte words: 5 (20 bytes) to 15 (60 bytes) |
| Type of service | 8 bits | Priority and type of service (now DSCP and ECN bits) |
| Total length | 16 bits | Length of the whole datagram (header + data); maximum 65 535 bytes |
| Identification | 16 bits | Same number in all fragments of one datagram |
| Flags | 3 bits | Reserved, **DF** (do not fragment) and **MF** (more fragments) |
| Fragment offset | 13 bits | Position of the fragment's data in the original datagram, in units of 8 bytes |
| Time to live (TTL) | 8 bits | Decreased by 1 at each router; the datagram is discarded at 0 (prevents endless loops) |
| Protocol | 8 bits | Upper-layer protocol of the data: **1 = ICMP, 6 = TCP, 17 = UDP** |
| Header checksum | 16 bits | Error check over the **header only**; recomputed at each router (TTL changes) |
| Source and destination IP addresses | 32 bits each | Addresses of the sender and the receiver |
| Options | 0–40 bytes | Rarely used (for example, record route, timestamp) |

The usual IPv4 header is **20 bytes**; with a 20-byte TCP header, each datagram carries **40 bytes** of headers.

### IP Fragmentation

Each link has a **maximum transmission unit (MTU)** — the largest frame payload it can carry (1500 bytes for Ethernet). When a datagram is larger than the MTU of the next link, the router **fragments** it into smaller datagrams. Fragments are **reassembled only at the destination host**, using the **identification**, **MF flag** and **fragment offset** fields. If the **DF** flag is set and the datagram is too large, it is dropped and an ICMP error is sent. (IPv6 routers do not fragment.)

> **Data per fragment = a multiple of 8 bytes ≤ MTU − IP header length**

> **Fragment offset = (byte position of the first data byte) ÷ 8**

**Example:** a 4000-byte datagram (20-byte header + 3980 bytes of data, identification x) must cross a link with an MTU of 1500 bytes. Each fragment can carry at most 1500 − 20 = 1480 bytes of data (1480 is a multiple of 8).

| Fragment | Data bytes | Total length | Offset | MF flag |
| --- | --- | --- | --- | --- |
| 1 | 1480 (bytes 0–1479) | 1500 | 0 | 1 |
| 2 | 1480 (bytes 1480–2959) | 1500 | 1480 ÷ 8 = 185 | 1 |
| 3 | 1020 (bytes 2960–3979) | 1040 | 2960 ÷ 8 = 370 | 0 |

All three fragments have identification x; the last has MF = 0, which tells the receiver that it is the last one.

## IP Addresses {#ip-addresses}

### Definition of IP Address

An IP address is a **logical address assigned to each network interface of a host or router, which identifies it on the Internet**.

An **IPv4 address** is **32 bits** long, giving 2³² (about 4.3 billion) addresses. It is written in **dotted-decimal notation**: four bytes, each written as a decimal number from 0 to 255, separated by dots. For example, 11000001 00100000 11011000 00001001 = **193.32.216.9**.

An IP address belongs to an **interface**, not to a host: a router with three interfaces has three IP addresses. Each address has a **network part (prefix)**, shared by all interfaces on the same network, and a **host part**.

### IP Address vs MAC Address

| Basis | IP address | MAC address |
| --- | --- | --- |
| Layer | Network layer (logical address) | Data link layer (physical address) |
| Size | 32 bits (IPv4), 128 bits (IPv6) | 48 bits |
| Notation | Dotted decimal (IPv4), hexadecimal (IPv6) | Hexadecimal (00-1A-2B-3C-4D-5E) |
| Assigned by | Network administrator, DHCP or ISP | Manufacturer (burnt into the NIC) |
| Changes | When the host moves to another network | Normally fixed |
| Scope | Used to reach hosts across networks | Used only within the local network |
| Found from the other by | DNS (from a name) | ARP (from an IP address) |

### Classful Addressing

**Classful addressing** is an **addressing scheme in which the IPv4 address space is divided into five fixed classes (A to E), identified by the first bits of the address**.

It was used from 1981 until 1993, when it was replaced by classless addressing.

![Classful IPv4 addresses](/diagrams/computer-networks/ip-classes.svg)

| Class | Leading bits | First-byte range | Default mask | Networks | Hosts per network | Use |
| --- | --- | --- | --- | --- | --- | --- |
| A | 0 | 0–127 | 255.0.0.0 (/8) | 2⁷ = 128 (126 usable) | 2²⁴ − 2 = 16 777 214 | Very large networks |
| B | 10 | 128–191 | 255.255.0.0 (/16) | 2¹⁴ = 16 384 | 2¹⁶ − 2 = 65 534 | Medium networks |
| C | 110 | 192–223 | 255.255.255.0 (/24) | 2²¹ = 2 097 152 | 2⁸ − 2 = 254 | Small networks |
| D | 1110 | 224–239 | — | — | — | Multicast |
| E | 1111 | 240–255 | — | — | — | Reserved (experimental) |

In class A, the networks 0 and 127 are reserved, so 126 are usable. The number of hosts is 2ʰ − 2 because the first address (all host bits 0) is the **network address** and the last (all host bits 1) is the **broadcast address**.

**Example:** the address 105.38.89.230 has the first byte 105 = **0**1101001, so it is a **class A** address with the default mask 255.0.0.0.

The main problem of classful addressing was **wasted addresses**: an organization needing 2000 addresses was too big for class C (254) and had to take a class B block of 65 534 addresses, most of them unused.

### Classless Addressing (CIDR)

Classless addressing (**CIDR**, Classless Inter-Domain Routing, introduced in 1993) is an **addressing scheme in which the network prefix can have any length, written as a.b.c.d/n**, where n is the number of bits in the prefix.

1. A block of **2³²⁻ⁿ** addresses is given to an organization, so its size can match its needs (a power of 2).
2. The first address of a block must be **divisible by the block size** (the host bits are all 0).
3. **Route aggregation (supernetting):** an ISP can advertise one prefix (for example 200.23.16.0/20) for all the smaller blocks it gives to its customers, which keeps routing tables small.

### Classful vs Classless Addressing

| Basis | Classful | Classless (CIDR) |
| --- | --- | --- |
| Prefix length | Fixed by the class: 8, 16 or 24 bits | Any length (/n) |
| Notation | Address; the class gives the mask | a.b.c.d/n |
| Block sizes | 2²⁴, 2¹⁶ or 2⁸ addresses | Any power of 2 |
| Address waste | High | Low |
| Routing table | Large | Smaller (route aggregation) |
| Subnetting | Fixed-length subnets | Variable-length subnets (VLSM) |
| Period | 1981–1993 | Since 1993 |

### Special and Private Addresses

| Address | Meaning |
| --- | --- |
| Network address (all host bits 0) | Identifies the network itself, for example 192.168.1.0/24 |
| Directed broadcast (all host bits 1) | All hosts of that network, for example 192.168.1.255 |
| 255.255.255.255 | Limited broadcast: all hosts on the local network (not forwarded by routers) |
| 0.0.0.0 | "This host" (used by a host that does not yet have an address) |
| 127.0.0.0/8 (usually 127.0.0.1) | **Loopback** (localhost): packets return to the same host |
| 169.254.0.0/16 | **Link-local (APIPA)**: chosen by a host when no DHCP server answers |

**Private addresses** (RFC 1918) can be used freely inside organizations but are **not routed on the Internet**:

1. **10.0.0.0/8** (10.0.0.0 – 10.255.255.255) — one class A block.
2. **172.16.0.0/12** (172.16.0.0 – 172.31.255.255) — 16 class B blocks.
3. **192.168.0.0/16** (192.168.0.0 – 192.168.255.255) — 256 class C blocks.

All other unicast addresses are **public** addresses, assigned by IANA through regional registries (APNIC for the Asia-Pacific region) and ISPs.

### DHCP

DHCP (Dynamic Host Configuration Protocol) is an **application-layer protocol that automatically assigns an IP address and other network settings to a host when it joins a network**.

Besides the IP address, DHCP gives the **subnet mask**, the **default gateway** (first-hop router) and the **DNS server** address. Addresses are **leased** for a limited time. DHCP uses **UDP** (server port **67**, client port **68**) and works in four steps (**DORA**):

1. **Discover** — the new host broadcasts a DHCP discover message (from 0.0.0.0 to 255.255.255.255).
2. **Offer** — DHCP servers reply with an offer of an IP address and lease time.
3. **Request** — the host broadcasts a request for one of the offered addresses.
4. **Acknowledge (ACK)** — the server confirms, and the host uses the address.

### NAT

NAT (Network Address Translation) is a **method by which a router replaces the private source addresses of outgoing datagrams with its own public address**, so that many hosts on a private network can share one public IP address.

The NAT router keeps a **NAT translation table**. In the common form, **PAT (port address translation, NAT overload)**, it also changes the source **port number**, so that replies can be sent back to the right private host.

**Example:** host 10.0.0.1 sends a datagram from port 3345 to a web server. The NAT router (public address 138.76.29.7) replaces the source with **138.76.29.7:5001** and records "5001 ↔ 10.0.0.1:3345". When the reply arrives for 138.76.29.7:5001, it changes the destination back to 10.0.0.1:3345.

NAT saves public IPv4 addresses and hides internal addresses, but it breaks the end-to-end principle (outside hosts cannot easily start connections to inside hosts).

## IP Subnetting {#ip-subnetting}

### Definition of Subnetting

Subnetting is the **process of dividing one IP network into smaller networks (subnets) by taking bits from the host part to form a subnet part**.

It improves address use, reduces broadcast traffic, and separates departments for performance and security; routers connect the subnets. A **subnet** is a group of interfaces that can reach each other without a router.

### Subnet Mask

A subnet mask is a **32-bit number with 1s in the network (and subnet) bit positions and 0s in the host bit positions**, used to find the network part of an address.

It is written in dotted decimal (255.255.252.0) or as a prefix length (**/22**). The network address of a host is found with a **bitwise AND** of its IP address and the mask.

![Finding the network address with a subnet mask](/diagrams/computer-networks/subnet-example.svg)

### Formulas of Subnetting

> **Number of subnets = 2ˢ**

> **Addresses per subnet (block size) = 2ʰ**, **usable hosts per subnet = 2ʰ − 2**

> **Prefix length n = 32 − h**

Here **s** is the number of bits borrowed from the host part for the subnet, and **h** the number of host bits that remain. The 2 addresses subtracted are the network address and the broadcast address.

**Mask values of the interesting byte:** 128 (/25), 192 (/26), 224 (/27), 240 (/28), 248 (/29), 252 (/30), 254, 255. The **block size** in that byte is 256 minus the mask value (for example, 256 − 252 = 4 in the third byte for /22).

### Steps to Find the Subnet of an Address

1. Find the block size from the prefix length (2³²⁻ⁿ addresses).
2. **Network address:** set all host bits to 0 (AND with the mask; in the interesting byte, the largest multiple of the block size not greater than the address byte).
3. **Broadcast address:** set all host bits to 1 (network address + block size − 1).
4. **Usable host range:** from network address + 1 to broadcast address − 1.

### Worked Example 1: An Address with /22

Find the subnet of **172.16.16.137/22**.

1. Subnet mask: /22 = 11111111.11111111.11111100.00000000 = **255.255.252.0**.
2. Block size: 2³²⁻²² = 2¹⁰ = **1024** addresses (4 in the third byte: 256 − 252).
3. Network address: in the third byte, the largest multiple of 4 not greater than 16 is 16, so the network is **172.16.16.0**.
4. Broadcast address: 172.16.(16 + 4 − 1).255 = **172.16.19.255**.
5. Usable hosts: 1024 − 2 = **1022**, from **172.16.16.1** to **172.16.19.254**.

### Worked Example 2: An Address with /20

Find the subnet of **105.38.89.230/20**.

1. Mask: /20 = **255.255.240.0**; block size 2¹² = 4096 (16 in the third byte).
2. Network: the largest multiple of 16 not greater than 89 is 80, so the network is **105.38.80.0**.
3. Broadcast: **105.38.95.255** (80 + 16 − 1 = 95).
4. Usable hosts: 4096 − 2 = **4094**. The network ID is the first 20 bits and the host ID the last 12 bits.

### Worked Example 3: Equal Subnets

Divide **192.168.1.0/24** into **4 equal subnets**.

1. 4 = 2², so **2 bits** are borrowed: the new prefix is /26 (mask **255.255.255.192**).
2. Each subnet has 2⁶ = 64 addresses and 64 − 2 = **62** usable hosts.

| Subnet | Network address | Usable hosts | Broadcast address |
| --- | --- | --- | --- |
| 1 | 192.168.1.0/26 | 192.168.1.1 – 192.168.1.62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | 192.168.1.65 – 192.168.1.126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | 192.168.1.129 – 192.168.1.190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | 192.168.1.193 – 192.168.1.254 | 192.168.1.255 |

**Example (class B):** borrowing 4 bits from the class B network 172.16.0.0 gives 2⁴ = **16 subnets** of /20 (172.16.0.0, 172.16.16.0, 172.16.32.0, …), each with 2¹² − 2 = **4094** hosts.

### VLSM

VLSM (Variable Length Subnet Masking) is **subnetting in which the subnets of one network have different prefix lengths (sizes)**, so that each subnet gets only as many addresses as it needs.

**Steps:**

1. Sort the requirements from the **largest to the smallest**.
2. For each, find the smallest block of 2ʰ addresses with 2ʰ − 2 ≥ the hosts needed.
3. Allocate the blocks one after another from the start of the address space, each on a boundary that is a multiple of its size.

**Worked example 4:** using VLSM, divide **10.100.0.0/22** among department A (250 hosts), B (120 hosts) and C (50 hosts).

| Department | Hosts needed | Block (2ʰ) | Subnet | Mask | Usable range |
| --- | --- | --- | --- | --- | --- |
| A | 250 | 256 (h = 8) | 10.100.0.0/24 | 255.255.255.0 | 10.100.0.1 – 10.100.0.254 |
| B | 120 | 128 (h = 7) | 10.100.1.0/25 | 255.255.255.128 | 10.100.1.1 – 10.100.1.126 |
| C | 50 | 64 (h = 6) | 10.100.1.128/26 | 255.255.255.192 | 10.100.1.129 – 10.100.1.190 |

The addresses from **10.100.1.192** onwards (10.100.1.192/26 and 10.100.2.0/23) remain free for future use.

**Worked example 5 (dividing a block by fractions):** the block **245.248.128.0/20** (4096 addresses) is shared so that one department gets half, another a quarter, and a third the remaining quarter: **245.248.128.0/21** (2048 addresses), **245.248.136.0/22** (1024) and **245.248.140.0/22** (1024).

## ARP and ICMP {#arp-and-icmp}

### ARP

ARP (Address Resolution Protocol) is a **protocol that finds the MAC (physical) address of a host on the same local network from its IPv4 address**.

A frame on a LAN must carry the **MAC address** of the next hop, but the sender knows only its **IP address**. ARP works between the network and data link layers.

![ARP request and reply](/diagrams/computer-networks/arp.svg)

**Working:**

1. The sender first checks its **ARP cache** (table of IP-to-MAC mappings).
2. If the address is not there, it **broadcasts** an **ARP request** (destination MAC **FF:FF:FF:FF:FF:FF**) asking "Who has IP address X?" All hosts on the LAN receive it.
3. Only the host with IP address X replies with an **ARP reply** containing its MAC address, sent **unicast** to the sender.
4. The sender stores the mapping in its ARP cache for some time (typically minutes; entries expire, **TTL**) and sends the frame.

If the destination is on **another network**, the sender uses ARP to find the MAC address of its **default gateway (router)**, not of the final host.

Related protocols:

1. **RARP (Reverse ARP)** — finds an IP address from a MAC address (replaced by DHCP).
2. **Proxy ARP** — a router answers ARP requests on behalf of hosts on another network.
3. **Gratuitous ARP** — a host announces its own IP-to-MAC mapping (for example, to detect duplicate addresses).

### ICMP

ICMP (Internet Control Message Protocol) is a **network-layer protocol used by hosts and routers to report errors and exchange control and diagnostic information about IP**.

IP itself has no error reporting, so ICMP messages are sent back to the **source** when something goes wrong. ICMP messages are carried **inside IP datagrams** (protocol number 1). Each message has a **type**, a **code** and a checksum, followed by the header and the first 8 bytes of the datagram that caused the error.

| Type | Message | Meaning |
| --- | --- | --- |
| 0 | **Echo reply** | Reply to ping |
| 3 | **Destination unreachable** | Network, host, port or protocol unreachable; or fragmentation needed but DF set |
| 4 | Source quench | Congestion control (no longer used) |
| 5 | **Redirect** | A better route is available |
| 8 | **Echo request** | Sent by ping |
| 11 | **Time exceeded** | TTL reached 0 (or fragment reassembly timed out) |
| 12 | Parameter problem | Bad IP header |

### Ping and Traceroute

1. **ping** sends ICMP **echo request** messages and waits for **echo replies**; it tests whether a host is reachable and measures the round-trip time.
2. **traceroute** (tracert in Windows) sends datagrams with **TTL = 1, 2, 3, …**. The router where the TTL reaches 0 discards the datagram and returns an ICMP **time exceeded** message, revealing its address. When the datagram reaches the destination host, a **port unreachable** (or echo reply) message ends the trace. It shows every router on the path and the delay to each.

**Example (diagnosis):** if a computer can ping 8.8.8.8 but cannot open websites by name, IP connectivity works, so the fault is in **name resolution (DNS)**: the DNS server setting is wrong or the DNS server is unreachable. This can be checked with `nslookup` and corrected in the DNS settings.

## IPv6 {#ipv6}

### Definition of IPv6

IPv6 (Internet Protocol version 6) is the **newer version of IP that uses 128-bit addresses**, designed to replace IPv4 mainly because the 32-bit IPv4 address space has run out.

IPv6 gives 2¹²⁸ ≈ 3.4 × 10³⁸ addresses. It also simplifies the header for faster processing and adds better support for auto-configuration, multicast, security (IPsec) and quality of service (flow labels).

### IPv6 Address Notation

An IPv6 address is written as **eight groups of four hexadecimal digits** (16 bits each), separated by colons:

**2001:0DB8:0000:0000:0000:FF00:0042:8329**

It can be shortened by two rules:

1. **Leading zeros** in a group can be omitted: 0DB8 → DB8, 0042 → 42.
2. **One run** of consecutive all-zero groups can be replaced by **::** (only once in an address).

So the address above becomes **2001:DB8::FF00:42:8329**. The prefix length is written as in CIDR, for example 2001:DB8::/32.

### Types of IPv6 Addresses

There are three types of IPv6 addresses:

1. **Unicast** — one interface (for example, **global unicast** addresses starting with 2 or 3, **link-local** addresses FE80::/10, and the loopback **::1**).
2. **Multicast** — a group of interfaces (addresses starting with **FF**).
3. **Anycast** — a group of interfaces, delivered to the **nearest** one.

IPv6 has **no broadcast** addresses; multicast is used instead.

### IPv6 Datagram Format

![IPv6 base header](/diagrams/computer-networks/ipv6-header.svg)

The IPv6 base header has a **fixed length of 40 bytes**:

1. **Version** (4 bits) — 6.
2. **Traffic class** (8 bits) — priority of the datagram.
3. **Flow label** (20 bits) — identifies datagrams of the same flow (such as audio or video) that need special handling.
4. **Payload length** (16 bits) — number of bytes after the 40-byte header.
5. **Next header** (8 bits) — the type of the next header (an extension header, or TCP/UDP), like the protocol field of IPv4.
6. **Hop limit** (8 bits) — decreased by 1 at each router, like TTL.
7. **Source and destination addresses** (128 bits each).

Removed from IPv4: **fragmentation fields** (routers do not fragment; if a datagram is too large, the router drops it and sends an ICMPv6 "Packet Too Big" message), the **header checksum** (to speed up processing; the link and transport layers check errors) and **options** (replaced by extension headers).

### IPv4 vs IPv6

| Basis | IPv4 | IPv6 |
| --- | --- | --- |
| Address size | 32 bits | 128 bits |
| Number of addresses | 2³² ≈ 4.3 × 10⁹ | 2¹²⁸ ≈ 3.4 × 10³⁸ |
| Notation | Dotted decimal (192.168.1.1) | Hexadecimal with colons (2001:DB8::1) |
| Header size | 20–60 bytes (variable) | 40 bytes (fixed) |
| Header checksum | Yes | No |
| Fragmentation | By routers and the source | By the source only |
| Broadcast | Yes | No (multicast and anycast) |
| Address configuration | Manual or DHCP | Auto-configuration (SLAAC) or DHCPv6 |
| Security (IPsec) | Optional | Built-in support |
| Address resolution | ARP | Neighbor Discovery (ICMPv6) |
| QoS | Type of service | Traffic class and flow label |

### Transition from IPv4 to IPv6

Because the whole Internet cannot change at once, three methods are used:

1. **Dual stack** — hosts and routers run **both IPv4 and IPv6** and use whichever the other side supports.
2. **Tunneling** — an IPv6 datagram is carried as the **payload of an IPv4 datagram** across an IPv4-only part of the network.
3. **Header translation** — a translator (such as NAT64) converts IPv6 headers to IPv4 and back, when one side supports only IPv4.

## References {#references}

**TutorialsPoint**

- [Network Layer Introduction](https://www.tutorialspoint.com/data_communication_computer_network/network_layer_introduction.htm), [Network Addressing](https://www.tutorialspoint.com/data_communication_computer_network/network_addressing.htm), [Design Issues for the Network Layers](https://www.tutorialspoint.com/data_communication_computer_network/design_issues_for_the_network_layers.htm), [Network Layer Protocols](https://www.tutorialspoint.com/data_communication_computer_network/network_layer_protocols.htm) and [Address Resolution Protocol](https://www.tutorialspoint.com/data_communication_computer_network/address_resolution_protocol.htm) — accessed 2026-11-06 (functions of the network layer; unicast, multicast, broadcast and anycast; ARP broadcast and cache; RARP; ICMP echo; IPv4 classes; IPv6 auto-configuration). Issues: it describes class D as providing "flat IP addressing" (class D is for multicast), and states that a MAC address "never changes" (it can be changed in software).

**GeeksforGeeks**

- [IPv4 Datagram Header](https://www.geeksforgeeks.org/computer-networks/introduction-and-ipv4-datagram-header/) and [Fragmentation in Network Layer](https://www.geeksforgeeks.org/computer-networks/fragmentation-network-layer/) — accessed 2026-11-06 (header fields, DF and MF flags, offset in 8-byte units, reassembly at the destination). The IPv4 page expands VLSM as "Virtual Length Subnet Mask" (it is Variable Length Subnet Mask) and writes "Post Address Resolution Protocol" for ARP.
- [Introduction of Classful IP Addressing](https://www.geeksforgeeks.org/computer-networks/ip-addressing-introduction-and-classful-addressing/), [Classless Addressing](https://www.geeksforgeeks.org/ip-addressing-classless-addressing/), [Classful vs Classless Addressing](https://www.geeksforgeeks.org/computer-networks/classful-vs-classless-addressing/), [CIDR](https://www.geeksforgeeks.org/computer-networks/classless-inter-domain-routing-cidr/), [Introduction to Subnetting](https://www.geeksforgeeks.org/computer-networks/introduction-to-subnetting/) and [VLSM](https://www.geeksforgeeks.org/introduction-of-variable-length-subnet-mask-vlsm/) — accessed 2026-11-06 (classes and their ranges, masks and host counts; block rules of CIDR; subnet mask; dividing 193.1.2.0/24; VLSM allocation from the largest requirement). It gives the class A range as 0.0.0.0–127.255.255.255; the networks 0 and 127 are reserved, so usable class A networks are 1–126.
- [Router in Computer Networks](https://www.geeksforgeeks.org/computer-networks/introduction-of-a-router/) — accessed 2026-11-06 (input port, switching fabric via memory, bus and interconnection network, output port, routing processor). It says EGP shares routing data "between internet hosts"; exterior gateway protocols exchange routes between autonomous systems.
- [How ARP Works](https://www.geeksforgeeks.org/computer-networks/how-address-resolution-protocol-arp-works/), [ICMP](https://www.geeksforgeeks.org/computer-networks/internet-control-message-protocol-icmp/), [IPv6](https://www.geeksforgeeks.org/computer-networks/internet-protocol-version-6-ipv6/), [What is IPv6](https://www.geeksforgeeks.org/computer-networks/what-is-ipv6/) and [Differences between IPv4 and IPv6](https://www.geeksforgeeks.org/computer-networks/differences-between-ipv4-and-ipv6/) — accessed 2026-11-06 (ARP cache, broadcast request, unicast reply; ICMP types 0, 3, 5, 8, 11, 12; IPv6 notation, address types and comparison). Its ARP example asks "Who owns IP address 192.168.1.100?" while the replying host has 192.168.1.3; the request should name 192.168.1.3.

**TpointTech**

- [Network Layer](https://www.tpointtech.com/network-layer), [Network Layer Protocols](https://www.tpointtech.com/network-layer-protocols), [Router](https://www.tpointtech.com/router) and [Virtual Circuits vs Datagram Networks](https://www.tpointtech.com/virtual-circuits-vs-datagram-networks) — accessed 2026-11-06 (forwarding and routing, datagram and virtual-circuit networks, router functions)
- [IP Address](https://www.tpointtech.com/ip-address), [IPv4 Header](https://www.tpointtech.com/ipv4-header-in-computer-networks), [Subnetting in Computer Networks](https://www.tpointtech.com/subnetting-in-computer-networks), [Subnet Mask](https://www.tpointtech.com/subnet-mask), [Classful vs Classless Addressing](https://www.tpointtech.com/classful-vs-classless-addressing), [Private IP Address](https://www.tpointtech.com/private-ip-address), [Address Resolution Protocol](https://www.tpointtech.com/address-resolution-protocol), [ICMP Protocol](https://www.tpointtech.com/icmp-protocol) and [IPv4 vs IPv6](https://www.tpointtech.com/ipv4-vs-ipv6) — accessed 2026-11-06 (dotted-decimal notation, private ranges, subnet masks, ICMP messages, IPv4 and IPv6 comparison)

**Programiz**

- Programiz has no page on the network layer or IP (checked 2026-11-06).

**Additional sources** (used for the inside of a router — fabrics, HOL blocking and scheduling — the fragmentation table, NAT and DHCP details, route aggregation, the private and special address ranges and IPv6 transition, which the reference websites cover only partly)

- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, chapter 4 (sections 4.1–4.3).
- IETF RFC 1918 (private address allocation) and RFC 4291 (IPv6 addressing architecture). All addresses, ranges, block sizes and fragment offsets above were checked with Python's ipaddress module.
