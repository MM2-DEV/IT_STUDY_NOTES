---
description: Ethernet and LAN standards - the IEEE 802 family, LLC and MAC sublayers, MAC addresses, multiple access methods, CSMA/CD with minimum frame size and backoff calculations, the Ethernet frame, the Ethernet generations and their media, and Token Ring and FDDI.
updated: 2026-11-06
---

### IEEE 802 Standards

**IEEE 802** is a **family of standards, developed by the IEEE LAN/MAN Standards Committee (Project 802), for local and metropolitan area networks**.

The standards define the **physical layer** and the **data link layer**. They let equipment from different manufacturers work together. The main members are:

| Standard | Subject |
| --- | --- |
| IEEE 802.1 | Higher-layer LAN protocols: bridging, spanning tree, VLANs (802.1Q) |
| IEEE 802.2 | Logical link control (LLC) |
| IEEE 802.3 | **Ethernet** (CSMA/CD) |
| IEEE 802.4 | Token bus |
| IEEE 802.5 | **Token Ring** |
| IEEE 802.6 | MAN (DQDB) |
| IEEE 802.11 | **Wireless LAN (Wi-Fi)** — see [Wireless LAN](/topics/computer-networks/wireless-and-cellular-networks#wireless-lan) |
| IEEE 802.15 | Wireless personal area network (802.15.1 Bluetooth) |
| IEEE 802.16 | Broadband wireless access (WiMAX) |

### LLC and MAC Sublayers

IEEE divides the data link layer of a LAN into two sublayers:

1. **Logical link control (LLC)** — the upper sublayer (IEEE 802.2), common to all LANs; it provides flow and error control and the interface to the network layer.
2. **Media access control (MAC)** — the lower sublayer, different for each LAN type (CSMA/CD for Ethernet, token passing for Token Ring); it controls access to the shared medium and handles framing and MAC addresses.

### MAC Address

A MAC address is a **48-bit physical (hardware) address that is permanently assigned to a network interface card and uniquely identifies it on a LAN**.

It is written as **12 hexadecimal digits** in six pairs, for example **00-A0-C9-14-C8-29** (or with colons).

1. The first 24 bits (3 bytes) are the **OUI (organizationally unique identifier)** of the manufacturer, assigned by IEEE.
2. The last 24 bits are a serial number given by the manufacturer.

Types of MAC addresses:

1. **Unicast** — identifies one interface (the least significant bit of the first byte is 0).
2. **Multicast** — identifies a group of interfaces (the least significant bit of the first byte is 1).
3. **Broadcast** — all 48 bits are 1 (**FF-FF-FF-FF-FF-FF**); the frame is received by every station on the LAN.

### Multiple Access Methods

**Multiple access protocol** is a **set of rules that decides which station may send when several stations share one medium**, so that frames do not collide.

There are three types of multiple access protocol:

1. **Random access (contention)** — any station may send when it wants; collisions are detected or avoided. Examples: ALOHA, slotted ALOHA, **CSMA**, **CSMA/CD** (Ethernet), **CSMA/CA** (Wi-Fi).
2. **Controlled access** — stations take turns. Examples: reservation, polling, **token passing** (Token Ring, FDDI).
3. **Channelization** — the channel is divided among the stations by frequency, time or code. Examples: **FDMA, TDMA, CDMA**.

### Ethernet

Ethernet is the **most widely used wired LAN technology, standardized by IEEE as 802.3**, which defines its frame format, MAC addressing, access method (CSMA/CD) and physical media.

It was developed by **Robert Metcalfe and David Boggs at Xerox PARC in 1973**. It was published as the DIX (Digital, Intel, Xerox) standard in 1980 and standardized as **IEEE 802.3 in 1983**. It started at 10 Mbps on a shared coaxial cable (bus) and now runs at 100 Mbps to 400 Gbps over twisted pair and fibre, mostly in a **switched star** topology.

### CSMA/CD

CSMA/CD (carrier sense multiple access with collision detection) is the **access method of classic Ethernet, in which a station listens before sending and stops sending as soon as it detects a collision**.

![CSMA/CD flowchart](/diagrams/computer-networks/csma-cd.svg)

**Working:**

1. **Carrier sense** — the station listens to the medium; if it is busy, it waits until it is idle.
2. **Transmit and detect** — the station sends its frame and keeps listening. If the signal on the line differs from what it sent, a **collision** has occurred.
3. **Jam signal** — on a collision, the station stops sending and transmits a short **jam signal** so that all stations know of the collision.
4. **Backoff** — the station waits a random time and tries again (binary exponential backoff). After **16** unsuccessful attempts it gives up and reports an error.

CSMA/CD is used only in **half-duplex** Ethernet on shared media (buses and hubs). Switched, full-duplex Ethernet has no collisions, so CSMA/CD is not used there, although it is still supported.

### Minimum Frame Size in CSMA/CD

A station can detect a collision only while it is still sending. In the worst case, a collision with a station at the far end is detected after one **round trip (2T_p)**, so the transmission time of a frame must be at least the round-trip time:

> **T_t ≥ 2 T_p**, so **L_min = 2 × T_p × B**

Here **T_t = L / B** is the transmission time, **T_p = d / v** the one-way propagation delay, **L** the frame size in bits, **B** the bandwidth, **d** the length of the cable and **v** the propagation speed.

**Example 1:** a 1 km cable with v = 2 × 10⁸ m/s and B = 10 Mbps. T_p = 1000 / (2 × 10⁸) = **5 µs**, so L_min = 2 × 5 × 10⁻⁶ × 10⁷ = **100 bits**.

**Example 2 (standard Ethernet):** the minimum frame is **64 bytes = 512 bits**. At 10 Mbps this takes 512 / 10⁷ = **51.2 µs** (the **slot time**). This allows a round trip of 51.2 µs, so with v = 2 × 10⁸ m/s the one-way distance could be 25.6 µs × 2 × 10⁸ = **5120 m** in theory; the standard limits it to **2500 m**, because repeaters and the jam signal use part of the slot time.

### Binary Exponential Backoff

After the **n-th** collision of a frame, the station chooses a random integer **K** from **0 to 2ⁿ − 1** (n is limited to 10) and waits:

> **Backoff time = K × slot time**

**Example:** after the 3rd collision, K is chosen from 0 to 2³ − 1 = 7, so the station waits up to 7 × 51.2 µs = **358.4 µs** at 10 Mbps. After the 10th and later collisions, K is chosen from 0 to 1023. The range doubles after each collision, so repeated collisions become less likely.

### Ethernet Frame Format

![IEEE 802.3 Ethernet frame format](/diagrams/computer-networks/ethernet-frame.svg)

| Field | Size | Purpose |
| --- | --- | --- |
| Preamble | 7 bytes | Alternating 1s and 0s (10101010) to synchronize the receiver's clock |
| SFD (start frame delimiter) | 1 byte | 10101011; marks the start of the frame |
| Destination address | 6 bytes | MAC address of the receiver |
| Source address | 6 bytes | MAC address of the sender |
| Length / Type | 2 bytes | Length of the data field (IEEE 802.3) or the type of upper-layer protocol, such as 0x0800 for IPv4 (Ethernet II) |
| Data and padding | 46–1500 bytes | Upper-layer data; padded with 0s if shorter than 46 bytes |
| CRC | 4 bytes | CRC-32 for error detection |

The preamble and SFD are added by the physical layer and are not counted in the frame size. So:

1. **Minimum frame** = 6 + 6 + 2 + 46 + 4 = **64 bytes** (minimum data = 64 − 18 = 46 bytes).
2. **Maximum frame** = 6 + 6 + 2 + 1500 + 4 = **1518 bytes**; the maximum data (**MTU**) is **1500 bytes**.

### Ethernet Generations

| Generation | Rate | IEEE standard | Main media |
| --- | --- | --- | --- |
| Standard Ethernet | 10 Mbps | 802.3 (1983) | Coaxial cable, UTP, fibre |
| Fast Ethernet | 100 Mbps | 802.3u (1995) | Cat 5 UTP, fibre |
| Gigabit Ethernet | 1 Gbps | 802.3z (1998, fibre), 802.3ab (1999, UTP) | Fibre, Cat 5e UTP |
| 10 Gigabit Ethernet | 10 Gbps | 802.3ae (2002) | Fibre (and Cat 6a UTP) |

In the names of the physical standards, such as **10BASE-T**, the number is the data rate in Mbps, **BASE** means **baseband** signalling, and the last part gives the medium (**T** = twisted pair, **F**, **SX**, **LX** = fibre) or the segment length in hundreds of metres (**5** = 500 m, **2** ≈ 185 m).

### Standard Ethernet (10 Mbps)

| Standard | Medium | Maximum segment | Topology |
| --- | --- | --- | --- |
| 10BASE5 (Thick Ethernet) | Thick coaxial cable (RG-8) | 500 m | Bus |
| 10BASE2 (Thin Ethernet, Cheapernet) | Thin coaxial cable (RG-58), BNC T-connectors | 185 m | Bus |
| 10BASE-T | UTP (Cat 3 or better), RJ-45 | 100 m | Star (hub) |
| 10BASE-FL | Two multimode optical fibres | 2000 m | Star |

Standard Ethernet uses **Manchester encoding** (see [Data Encoding](/topics/computer-networks/data-encoding#manchester-and-differential-manchester)).

### Fast Ethernet (100 Mbps)

| Standard | Medium | Maximum segment |
| --- | --- | --- |
| 100BASE-TX | Two pairs of Cat 5 UTP | 100 m |
| 100BASE-FX | Two multimode optical fibres | 400 m half-duplex; 2 km full-duplex |
| 100BASE-T4 | Four pairs of Cat 3 UTP (half-duplex only) | 100 m |

### Gigabit Ethernet (1 Gbps)

| Standard | Medium | Maximum segment |
| --- | --- | --- |
| 1000BASE-SX | Multimode fibre, short-wave (850 nm) laser | Up to 550 m |
| 1000BASE-LX | Long-wave (1310 nm) laser; single-mode or multimode fibre | Up to 5 km (single-mode) |
| 1000BASE-CX | Shielded copper cable | 25 m |
| 1000BASE-T | Four pairs of Cat 5 (Cat 5e recommended) UTP | 100 m |

### 10 Gigabit Ethernet (10 Gbps)

| Standard | Medium | Maximum segment |
| --- | --- | --- |
| 10GBASE-SR | Multimode fibre (850 nm) | Up to 400 m (depending on the fibre) |
| 10GBASE-LR | Single-mode fibre (1310 nm) | 10 km |
| 10GBASE-ER | Single-mode fibre (1550 nm) | 30 km (40 km on engineered links) |
| 10GBASE-T | Cat 6a UTP | 100 m |

10 Gigabit Ethernet works only in **full-duplex** mode, so it does not use CSMA/CD.

### Token Ring (IEEE 802.5)

Token Ring is a **LAN technology in which stations are connected in a logical ring and a special frame called a token circulates around the ring; only the station holding the token may transmit**.

It was introduced by **IBM** (1984) and standardized as **IEEE 802.5** (1989), at **4 Mbps** and later **16 Mbps**.

1. The **token** is a 3-byte frame. A station that wants to send captures the token, changes it into the start of a data frame and sends its data.
2. A station may hold the token only for the **token holding time** (typically 10 ms), then it must pass it on.
3. The frame travels around the ring and is removed by its sender, which then releases a new token.
4. **Priority and reservation** bits in the access control field let high-priority stations reserve the next token.
5. An **active monitor** station regenerates a lost token and removes frames that circle endlessly.

Because only the token holder transmits, there are **no collisions**, and every station gets the token within a bounded time. Physically, stations are wired in a **star** to a central wiring centre (MAU) that bypasses failed stations.

### FDDI

FDDI (Fiber Distributed Data Interface) is a **100 Mbps token-passing LAN standard (ANSI) that uses two counter-rotating optical fibre rings**.

The secondary ring is a backup: if a link fails, the two rings are joined to form a single ring, so the network keeps working. A dual ring can extend up to about **100 km**. FDDI was used as a campus **backbone** before Fast and Gigabit Ethernet replaced it.

### Ethernet vs Token Ring

| Basis | Ethernet (IEEE 802.3) | Token Ring (IEEE 802.5) |
| --- | --- | --- |
| Access method | CSMA/CD (random access) | Token passing (controlled access) |
| Collisions | Possible (on shared media) | None |
| Topology | Bus or star | Logical ring (physically star-wired) |
| Access delay | Random; not guaranteed | Bounded; every station gets a turn |
| Priority | No | Yes (priority and reservation bits) |
| Data rate | 10 Mbps to 400 Gbps | 4 or 16 Mbps |
| Cost and use | Cheap; dominant today | Expensive; obsolete |

## References {#references}

**TutorialsPoint**

- [LAN Technologies](https://www.tutorialspoint.com/data_communication_computer_network/network_lan_technologies.htm) — accessed 2026-11-06 (Ethernet, CSMA/CD, 48-bit MAC address, 10BASE-T, Fast Ethernet 100BASE-T and 100BASE-FX, Gigabit Ethernet 802.3ab). Issues found and corrected: it says the **T** in 10BASE-T stands for "Thick Ethernet" and that 10BASE-T uses coaxial cable (T means twisted pair; thick Ethernet is 10BASE5); it dates the invention of Ethernet to 1970 (1973) and its standardization to 1980 (DIX 1980, IEEE 802.3 1983); it writes "IEEE 803.2"; it limits 100BASE-FX to 100 m in half-duplex (400 m); and it gives IEEE 802.3ah for Gigabit Ethernet over fibre (that is 802.3z).
- [Token Ring Network](https://www.tutorialspoint.com/data_communication_computer_network/token_ring_network.htm) and [MAC Address](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_mac_address.htm) — accessed 2026-11-06 (3-byte token, token holding time of 10 ms, priority and reservation, monitor station; OUI, unicast, multicast and broadcast MAC addresses)

**GeeksforGeeks**

- [Ethernet Frame Format](https://www.geeksforgeeks.org/computer-networks/ethernet-frame-format/) — accessed 2026-11-06 (preamble, SFD 10101011, addresses, length, 46–1500 bytes of data, CRC; 64 to 1518 bytes). It says the length field gives "the length of the entire Ethernet frame"; in IEEE 802.3 it gives the length of the data field.
- [Collision Detection in CSMA/CD](https://www.geeksforgeeks.org/computer-networks/collision-detection-csmacd/), [Carrier Sense Multiple Access (CSMA)](https://www.geeksforgeeks.org/computer-networks/carrier-sense-multiple-access-csma/) and [What is Ethernet?](https://www.geeksforgeeks.org/computer-networks/what-is-ethernet/) — accessed 2026-11-06 (steps of CSMA/CD, jam signal, T_t ≥ 2T_p and L ≥ 2 T_p B, CSMA/CD not used in full-duplex Ethernet). Its IEEE 802 standards page returns 404.

**TpointTech**

- [Ethernet Frame Format](https://www.tpointtech.com/ethernet-frame-format), [Collision Detection in CSMA/CD](https://www.tpointtech.com/collision-detection-in-csma-cd), [Back-off Algorithm for CSMA/CD](https://www.tpointtech.com/back-off-algorithm-for-csma-cd), [Fast Ethernet](https://www.tpointtech.com/fast-ethernet), [Token Ring in Computer Networks](https://www.tpointtech.com/token-ring-in-computer-networks) and [Difference between Token Ring and Ethernet](https://www.tpointtech.com/difference-between-token-ring-and-ethernet-token-ring) — accessed 2026-11-06 (backoff time K × slot time with K from 0 to 2ⁿ − 1; 100BASE-TX and 100BASE-FX; token passing). The backoff page defines the slot time both as "2t" (the round-trip time) and as the time for a signal to go from one end to the other; it is the round-trip time (512 bit times, 51.2 µs at 10 Mbps).

**Programiz**

- Programiz has no page on Ethernet or LAN standards (checked 2026-11-06).

**Additional sources** (used to check the dates, standard numbers and segment lengths, which differ between the reference websites, and for the FDDI details)

- Wikipedia, [Ethernet](https://en.wikipedia.org/wiki/Ethernet), [Ethernet physical layer](https://en.wikipedia.org/wiki/Ethernet_physical_layer), [IEEE 802](https://en.wikipedia.org/wiki/IEEE_802), [Token Ring](https://en.wikipedia.org/wiki/Token_Ring) and [Fiber Distributed Data Interface](https://en.wikipedia.org/wiki/Fiber_Distributed_Data_Interface) — accessed 2026-11-06 (Xerox PARC 1973, DIX 1980, IEEE 802.3 1983; segment lengths and standards of each Ethernet variant; IEEE 802 working groups; IBM Token Ring 1984 and IEEE 802.5 1989 at 4 and 16 Mbps; FDDI dual ring of 100 Mbps up to 100 km).
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapters 12 and 13 (multiple access, minimum frame size, the 2500 m limit of standard Ethernet, binary exponential backoff). All calculations above were checked by script.
