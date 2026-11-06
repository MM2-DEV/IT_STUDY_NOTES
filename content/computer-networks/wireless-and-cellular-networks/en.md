---
description: Wireless and cellular networks - wireless LANs and IEEE 802.11 (architecture, CSMA/CA, hidden and exposed terminals, RTS/CTS, frame, standards from 802.11b to Wi-Fi 7, security), Bluetooth, VSAT networks and their delay, and analog vs digital cellular systems.
updated: 2026-11-06
---

## Wireless LAN {#wireless-lan}

### Definition of Wireless LAN

A wireless LAN (WLAN) is a **local area network in which devices communicate by radio waves instead of cables**, so that users can move freely within the coverage area.

The common WLAN standard is **IEEE 802.11**, marketed as **Wi-Fi**. WLANs are used in homes, offices, campuses, airports and cafés (hotspots).

### Advantages and Disadvantages of WLAN

**Advantages:**

1. **Mobility** — users can move within the coverage area and stay connected.
2. **Easy installation** — no cables need to be laid; useful where wiring is hard.
3. **Scalability** — new devices can join easily.
4. **Lower installation cost** in many buildings.

**Disadvantages:**

1. **Lower speed and reliability** than wired LANs; signals weaken with distance and walls.
2. **Interference** from other devices in the same band (microwave ovens, Bluetooth, cordless phones).
3. **Security risks** — radio signals can be received by anyone in range, so encryption is essential.
4. Limited range (typically tens of metres indoors).

### IEEE 802.11 Architecture

![IEEE 802.11 architecture](/diagrams/computer-networks/wlan-architecture.svg)

1. **Station (STA)** — any device with a wireless network interface: a laptop, smartphone or printer.
2. **Access point (AP)** — a base station that connects the wireless stations to the wired network (it works as a bridge between 802.11 and Ethernet).
3. **Basic service set (BSS)** — a group of stations communicating with one AP (or with each other); it is the basic building block of a WLAN.
4. **Extended service set (ESS)** — two or more BSSs joined through their APs by a **distribution system (DS)**, usually a wired LAN. A station can move between BSSs of the same ESS (roaming).
5. **SSID (service set identifier)** — the name of a WLAN, sent by the AP in **beacon frames**; a station **associates** with an AP of the chosen SSID.

### Modes of Operation

There are two modes of operation:

1. **Infrastructure mode** — stations communicate through an **access point**, which also connects them to the wired network and the Internet. This is the usual mode.
2. **Ad hoc mode** (**independent BSS, IBSS**) — stations communicate **directly** with each other, with no access point or infrastructure (for example, two laptops sharing files).

### Hidden and Exposed Terminal Problems

Wireless stations cannot detect all collisions, because a station cannot listen while it transmits and does not hear stations beyond its range.

1. **Hidden terminal problem** — stations A and C are both in the range of B, but not in range of each other. Each senses the channel as idle and sends to B, so their frames **collide at B** without A or C knowing.
2. **Exposed terminal problem** — a station refrains from sending because it hears another nearby transmission, even though its own transmission (to a different receiver) would not have caused a collision; capacity is wasted.

![The hidden-terminal problem and RTS/CTS](/diagrams/computer-networks/hidden-terminal.svg)

### CSMA/CA

CSMA/CA (carrier sense multiple access with collision avoidance) is the **access method of IEEE 802.11, in which stations try to avoid collisions before they happen**, because collisions cannot be detected reliably in wireless networks.

**Working:**

1. **Carrier sense** — the station listens to the channel. If it is idle for a short period called **DIFS** (distributed inter-frame space), the station sends.
2. **Random backoff** — if the channel is busy, the station chooses a random backoff time and counts it down only while the channel is idle; it sends when the counter reaches zero.
3. **Acknowledgement** — the receiver waits a short time (**SIFS**) and returns an **ACK**. If no ACK arrives, the sender assumes a collision and retransmits after a longer random backoff.
4. **RTS/CTS (optional)** — to solve the hidden-terminal problem, the sender first sends a short **request to send (RTS)** frame; the receiver replies with a **clear to send (CTS)** frame. All stations that hear the RTS or CTS keep silent for the time given in its **duration** field (the **network allocation vector, NAV**), so the data frame does not collide.

### CSMA/CD vs CSMA/CA

| Basis | CSMA/CD | CSMA/CA |
| --- | --- | --- |
| Full form | Carrier sense multiple access with collision detection | Carrier sense multiple access with collision avoidance |
| Used in | Wired Ethernet (IEEE 802.3) | Wireless LAN (IEEE 802.11) |
| Approach | Detects collisions and stops sending | Avoids collisions before they happen |
| Collision detection | Yes, while transmitting | Not possible; uses ACKs instead |
| After a collision | Jam signal, then backoff | Retransmission after backoff if no ACK |
| Extra mechanisms | — | Inter-frame spaces, RTS/CTS, NAV |
| Efficiency | Higher (less overhead) | Lower (more overhead) |

### IEEE 802.11 Frame

An 802.11 frame has a **frame control** field (2 bytes: type of frame, to/from DS bits and others), a **duration** field (2 bytes: time the channel will be busy, used for the NAV), **four address fields** (6 bytes each), a **sequence control** field (2 bytes), the **frame body** (0–2312 bytes) and a **frame check sequence** (4-byte CRC). Normally three addresses are used: the receiving station, the transmitting station and the router interface (or AP) on the wired side; the fourth is used when APs forward frames to each other.

### IEEE 802.11 Standards

| Standard | Wi-Fi name | Year | Band | Maximum data rate |
| --- | --- | --- | --- | --- |
| 802.11 | — | 1997 | 2.4 GHz | 2 Mbps |
| 802.11b | (Wi-Fi 1) | 1999 | 2.4 GHz | 11 Mbps |
| 802.11a | (Wi-Fi 2) | 1999 | 5 GHz | 54 Mbps |
| 802.11g | (Wi-Fi 3) | 2003 | 2.4 GHz | 54 Mbps |
| 802.11n | **Wi-Fi 4** | 2009 | 2.4 and 5 GHz | 600 Mbps (MIMO) |
| 802.11ac | **Wi-Fi 5** | 2013 | 5 GHz | About 6.9 Gbps (MU-MIMO, wider channels) |
| 802.11ax | **Wi-Fi 6** (6E with 6 GHz) | 2021 | 2.4, 5 (and 6) GHz | About 9.6 Gbps (OFDMA) |
| 802.11be | **Wi-Fi 7** | 2024 | 2.4, 5 and 6 GHz | About 23 Gbps |

All use **CSMA/CA**. The 2.4 GHz band has only **three non-overlapping 20 MHz channels** (1, 6 and 11), while the 5 GHz band has many more, so it suffers less interference; higher frequencies, however, have a shorter range. Other amendments include **802.11p** (vehicles, 5.9 GHz) and **802.11i** (security).

### Wireless Security

| Protocol | Year | Encryption | Status |
| --- | --- | --- | --- |
| WEP (Wired Equivalent Privacy) | 1997 | RC4 with 64- or 128-bit keys | Broken; should not be used |
| WPA (Wi-Fi Protected Access) | 2003 | TKIP (still RC4-based) | Temporary fix; outdated |
| WPA2 | 2004 | AES (CCMP); IEEE 802.11i | Widely used |
| WPA3 | 2018 | AES; SAE replaces the pre-shared key exchange | Current, strongest |

### Bluetooth

Bluetooth is a **short-range wireless technology (IEEE 802.15.1) for connecting devices such as phones, headsets, keyboards and speakers**, forming a wireless personal area network (WPAN).

It works in the **2.4 GHz** band with **frequency-hopping spread spectrum**, over a range of about 10 m. A **piconet** has one **primary (master)** device and up to **seven active secondary (slave)** devices; several piconets connected through shared devices form a **scatternet**.

### Wi-Fi vs Bluetooth

| Basis | Wi-Fi | Bluetooth |
| --- | --- | --- |
| Standard | IEEE 802.11 | IEEE 802.15.1 |
| Network type | WLAN | WPAN |
| Range | About 30–100 m | About 10 m |
| Data rate | Hundreds of Mbps to Gbps | A few Mbps |
| Power use | Higher | Low |
| Devices | Many per access point | One master and 7 active slaves per piconet |
| Use | Internet access, LANs | Headsets, keyboards, file sharing between nearby devices |

## VSAT {#vsat}

### Definition of VSAT

VSAT (Very Small Aperture Terminal) is a **two-way satellite ground station with a small dish antenna (less than 3 m, typically 0.75–1.2 m in diameter) that sends and receives data through a satellite**.

"Very small aperture" refers to the small size of the dish. VSATs connect remote places where cables or fibre are not available. Most use satellites in **geostationary orbit** (about 35 786 km above the equator); the full explanation of satellites, orbits and frequency bands is in [Satellite Communication Systems](/topics/computer-networks/telecommunication#satellite-communication-systems).

### Components of a VSAT Network

1. **Outdoor unit (ODU)** — the small dish antenna with a transceiver (block up-converter and low-noise block down-converter) that sends to and receives from the satellite.
2. **Indoor unit (IDU)** — a modem (router) that connects the user's computers or network to the outdoor unit.
3. **Satellite** — a transponder in orbit that relays the signals.
4. **Hub (master earth station)** — a large earth station that controls the network and connects it to the Internet or the organization's data centre.

### VSAT Network Topologies

There are two VSAT network topologies:

1. **Star (hub-and-spoke) topology** — every VSAT communicates only with the **hub** through the satellite; traffic between two VSATs goes VSAT → satellite → hub → satellite → VSAT (**double hop**). It is the most common topology and suits banks and retail chains with one head office.
2. **Mesh topology** — VSATs communicate **directly** with each other through the satellite (**single hop**), which gives a shorter delay but needs larger, more expensive terminals.

![A VSAT star network](/diagrams/computer-networks/vsat-network.svg)

### Delay in a VSAT Network

> **One-hop delay (earth → satellite → earth) ≈ 2 × h / c**

Here **h** is the height of the satellite (35 786 km for a geostationary satellite) and **c** the speed of light (3 × 10⁵ km/s).

**Example:**

1. One hop (VSAT → satellite → hub): 2 × 35 786 / 300 000 ≈ **0.239 s (239 ms)**.
2. A request and its reply between a VSAT and the hub (two hops): ≈ **0.48 s**, about half a second.
3. In a star network, a message between two VSATs also needs two hops (through the hub) ≈ **0.48 s** one way.

This delay is why VSAT is less suitable for interactive real-time uses such as online games and why TCP over satellite needs large windows.

### Frequency Bands Used by VSAT

1. **C band** (about 4–8 GHz; uplink about 6 GHz, downlink about 4 GHz) — less affected by rain; needs larger dishes.
2. **Ku band** (uplink about 14 GHz, downlink about 11–12 GHz) — smaller dishes; affected by heavy rain (**rain fade**).
3. **Ka band** (about 20–30 GHz) — high data rates; most affected by rain.

### Applications of VSAT

1. Connecting **bank branches and ATMs** to the head office, and credit-card point-of-sale transactions.
2. **Internet access** in remote and rural areas, islands, ships and aircraft.
3. **Corporate networks** of retail chains, oil and gas fields, and government offices.
4. **Disaster recovery** and emergency communication when ground networks fail.
5. Distance learning and television distribution.

### Advantages and Disadvantages of VSAT

**Advantages:**

1. Coverage of very large and remote areas, independent of ground infrastructure.
2. Quick installation; the cost does not depend on distance.
3. Useful as a backup when terrestrial links fail.

**Disadvantages:**

1. **Long delay** (about 0.5 s for a round trip through a geostationary satellite).
2. **Rain fade** at higher frequencies (Ku and Ka bands).
3. The dish needs a **clear line of sight** to the satellite and careful alignment.
4. Bandwidth is more expensive than on fibre.

## Analog and Digital Cellular Systems {#analog-and-digital-cellular-systems}

### Cellular System

A cellular system is a **mobile telephone network in which the service area is divided into small regions called cells, each served by its own base station**, and frequencies are reused in distant cells.

As a mobile user moves from one cell to another, the call is passed to the new cell's base station (**handoff**). The cellular concept, frequency reuse and the generations from 1G to 5G are explained in [Mobile Communication Generations](/topics/computer-networks/telecommunication#mobile-communication-generations-1g-5g); the GSM system is described in [GSM Architecture](/topics/computer-networks/telecommunication#gsm-architecture).

### Analog Cellular System

An analog cellular system is a **first-generation (1G) mobile system in which voice is carried as an analog signal, frequency-modulated onto a separate radio channel for each call**.

The main example is **AMPS** (Advanced Mobile Phone System), developed by Bell Labs and Motorola and introduced in the United States in **1983**. AMPS used the **800–850 MHz** band, with **30 kHz** channels and **FDMA** (frequency-division multiple access): each call has its own pair of frequencies. Other analog systems were NMT (Nordic countries) and TACS (United Kingdom).

**Limitations:** poor voice quality affected by noise, **no security** (calls could be overheard with a scanner), low capacity, voice only (no data), large handsets with short battery life, and no international roaming.

### Digital Cellular System

A digital cellular system is a **mobile system from the second generation (2G) onwards in which voice is digitized, compressed and coded before transmission**, so that several users can share one radio channel.

Examples are **GSM** (TDMA + FDMA; 900 and 1800 MHz; each 200 kHz carrier has 8 time slots), **IS-95 CDMA** (cdmaOne; code-division multiple access) and later 3G (UMTS, CDMA2000), 4G (LTE) and 5G (NR) systems.

**Advantages over analog systems:** better voice quality (error correction), **encryption** for security, **more users** in the same spectrum (TDMA or CDMA), **data services** (SMS, GPRS, mobile Internet), smaller handsets with longer battery life, and international roaming (SIM cards in GSM).

**Example (capacity in 200 kHz):** AMPS uses 30 kHz per call, so 200 kHz holds only 200 ÷ 30 ≈ **6 calls**; a GSM 200 kHz carrier holds **8 calls** in its 8 time slots (and 16 with half-rate speech coding), and digital systems can also reuse frequencies more closely because digital signals tolerate more interference.

### Analog vs Digital Cellular Systems

| Basis | Analog cellular (1G) | Digital cellular (2G and later) |
| --- | --- | --- |
| Voice signal | Analog (FM) | Digital (coded, compressed) |
| Multiple access | FDMA | TDMA, CDMA, OFDMA (with FDMA) |
| Examples | AMPS, NMT, TACS | GSM, IS-95 CDMA, UMTS, LTE, 5G NR |
| Capacity | Low (one call per channel) | High (several users per channel) |
| Voice quality | Affected by noise and fading | Better; error correction |
| Security | None (easily overheard) | Encryption and authentication |
| Data services | None | SMS, packet data, Internet |
| Handsets | Large, short battery life | Small, longer battery life |
| Roaming | Limited | International (GSM SIM) |

## References {#references}

**TutorialsPoint**

- [Wireless LAN and IEEE 802.11](https://www.tutorialspoint.com/data_communication_computer_network/wireless_lan_and_ieee_802_11.htm), [IEEE 802.11 Networks](https://www.tutorialspoint.com/data_communication_computer_network/ieee_802_11_networks.htm), [IEEE 802.11 Wireless LAN Standards](https://www.tutorialspoint.com/data_communication_computer_network/ieee_802_11_wireless_lan_standards.htm), [Wireless LANs](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_wireless_lans.htm) and [Wireless Networks](https://www.tutorialspoint.com/data_communication_computer_network/wireless_networks.htm) — accessed 2026-11-06 (stations, AP, BSS, ESS, DS, infrastructure and independent BSS; frame fields; 802.11, a, b, g, n and p). Issues: its frame description lists "three 6-byte address fields" (the 802.11 frame has four, of which three are normally used); it gives 802.11g "an average throughput of 22 Mbps" (its maximum rate is 54 Mbps); and it dates 802.11b to "early 2000" (approved in 1999).
- [What is VSAT in the Computer Network?](https://www.tutorialspoint.com/what-is-vsat-in-the-computer-network) — accessed 2026-11-06 (dish smaller than 3 m, hub-and-spoke architecture, L, S, C and Ku bands, 500 ms latency, rain fade, uses)

**GeeksforGeeks**

- [IEEE 802.11 Architecture](https://www.geeksforgeeks.org/computer-networks/ieee-802-11-architecture/) — accessed 2026-11-06 (stations, AP, distribution system, SSID, BSS and ESS, services)
- [VSAT (Very Small Aperture Terminal)](https://www.geeksforgeeks.org/computer-networks/vsat-very-small-aperture-terminal/) — accessed 2026-11-06 (antenna 75 cm to 1.2 m, star topology through a hub, uses, delay of about 500 ms, weather effects). It gives the data rate as "4 kilobytes per second to 16 megabytes per second" (commonly quoted as 4 kbps to 16 Mbps, in bits) and claims that VSAT networks are "not affected by earthquakes, cyclones" — ground equipment and links can still be damaged, and heavy rain affects the signal, as the same page says.
- [Generations of Wireless Communication](https://www.geeksforgeeks.org/computer-networks/generations-of-wireless-communication/) — accessed 2026-11-06 (1G analog, 2G digital with GSM, CDMA and TDMA; SMS; GPRS and EDGE). Its CSMA/CA, hidden-terminal and wireless-LAN URLs return 404.

**TpointTech**

- [Advantages and Disadvantages of WLAN](https://www.tpointtech.com/advantages-and-disadvantages-of-wlan), [CSMA/CA vs CSMA/CD](https://www.tpointtech.com/csma-ca-vs-csma-cd), [Collision Avoidance in Wireless Networks](https://www.tpointtech.com/collision-avoidance-in-wireless-networks), [802.11ac vs 802.11ax](https://www.tpointtech.com/difference-between-802-11ac-and-802-11ax), [Wireless Security: WEP, WPA, WPA2 and WPA3](https://www.tpointtech.com/wireless-security-wep-wpa-wpa2-and-wpa3-differences), [Bluetooth](https://www.tpointtech.com/bluetooth-in-computer-networks), [Cellular Network](https://www.tpointtech.com/cellular-network) and [CDMA vs GSM](https://www.tpointtech.com/cdma-vs-gsm) — accessed 2026-11-06 (CSMA/CA with RTS/CTS; Wi-Fi 5 using only 5 GHz with MU-MIMO; Wi-Fi 6; wireless security protocols; piconet and scatternet; cells, base stations and handover). It gives the maximum rate of 802.11ac as "3.5 Gbps"; the standard allows up to about 6.9 Gbps (3.5 Gbps is a common figure for early products).

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — accessed 2026-11-06 (Wi-Fi as IEEE 802.11 and Bluetooth as IEEE 802.15.1; the access point; item 37, the purpose of the IEEE 802.11 committee; item 41, LTE network elements)

**Programiz**

- Programiz has no page on wireless or cellular networks (checked 2026-11-06).

**Additional sources** (used to check the 802.11 years and rates, which differ between the reference websites, and for AMPS and the Wi-Fi security protocols)

- Wikipedia, [IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11), [Advanced Mobile Phone System](https://en.wikipedia.org/wiki/Advanced_Mobile_Phone_System) and [Wi-Fi Protected Access](https://en.wikipedia.org/wiki/Wi-Fi_Protected_Access) — accessed 2026-11-06 (generation table with years, bands and link rates; three non-overlapping 2.4 GHz channels; AMPS introduced in 1983 at 800–850 MHz with 30 kHz channels; WEP with RC4, WPA with TKIP in 2003, WPA2 with AES-CCMP in 2004, WPA3 with SAE in 2018).
- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, chapter 7 (802.11 architecture, hidden terminals, CSMA/CA, RTS/CTS, the four address fields). The satellite delays above were checked by calculation.
