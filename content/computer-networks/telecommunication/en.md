---
description: Telecommunication - elements of a telecommunication system, the PSTN and its hierarchy, telephone switching systems (Strowger, crossbar, electronic SPC, space and time division), the cellular concept and mobile generations 1G to 5G, GSM architecture, FDMA, TDMA and CDMA, spread spectrum (FHSS and DSSS), optical fibre communication systems and satellite communication systems, with worked examples.
updated: 2026-11-06
---

## Elements of a Telecommunication System {#elements-of-a-telecommunication-system}

### Definition of Telecommunication

Telecommunication is the **exchange of information — voice, data, text, images or video — between distant places by electrical, radio or optical signals**.

The word *tele* is Greek for "far". The person who starts a telephone call is the **calling subscriber**, and the person called is the **called subscriber**. Telephony began when **Alexander Graham Bell** demonstrated the telephone in **1876**.

### Elements of a Telecommunication System

A telecommunication system has these elements:

1. **Information source** — produces the message (speech, music, text, data, pictures).
2. **Input transducer** — converts the message into an **electrical signal** (for example, a microphone converts sound into voltage).
3. **Transmitter** — processes the signal for the channel: amplification, encoding, **modulation** onto a carrier, and multiplexing.
4. **Channel (transmission medium)** — carries the signal from the transmitter to the receiver: wire pairs, coaxial cable, optical fibre or radio (free space).
5. **Noise** — unwanted signals added in the channel (and equipment) that distort the message.
6. **Receiver** — recovers the message from the received signal: amplification, filtering, **demodulation** and decoding.
7. **Output transducer** — converts the electrical signal back into the original form (for example, a loudspeaker or display).
8. **Destination** — the person or device for whom the message is meant.

![Block diagram of a telecommunication system](/diagrams/computer-networks/telecom-system.svg)

### Need for Switching

If every telephone were connected directly to every other telephone (a **fully connected network**), the number of links would grow very quickly:

> **Number of links = n(n − 1) ÷ 2**

Here **n** is the number of telephones. **Example:** 5 telephones need 5 × 4 ÷ 2 = **10** links, but 100 telephones need 100 × 99 ÷ 2 = **4950** links. Therefore telephones are connected to **switching exchanges**, which connect any two subscribers on demand.

## Telephone Networks (PSTN) {#telephone-networks-pstn}

### Definition of PSTN

The PSTN (Public Switched Telephone Network) is the **worldwide collection of interconnected, circuit-switched telephone networks that provide public telephone service**.

It is also called **POTS** (plain old telephone service). It uses telephone lines, optical fibre, microwave links, undersea cables and satellites, and today is almost entirely **digital** in its core, with analog local loops to many homes.

### Components of the PSTN

1. **Subscriber equipment (telephone set)** — converts voice to electrical signals and back, and sends dialling signals.
2. **Local loop (subscriber line)** — the pair of copper wires that connects each telephone to the nearest exchange. Lines from many homes are gathered in cables at distribution points and brought to the exchange's **main distribution frame (MDF)**.
3. **Exchanges (switching offices)** — set up, maintain and release connections:
   1. **Local exchange (end office, central office)** — serves the subscribers of an area.
   2. **Tandem exchange** — connects local exchanges in a city.
   3. **Trunk (toll) exchange** — handles long-distance calls between cities.
   4. **International gateway exchange** — connects the national network to other countries.
4. **Trunks** — high-capacity lines (today fibre, using TDM such as E-1 and SDH) between exchanges.
5. **Signalling system** — carries call-control information.

![The hierarchy of the PSTN](/diagrams/computer-networks/pstn-hierarchy.svg)

### Interconnection of Exchanges

1. **Mesh** — every exchange is connected to every other; used in cities with heavy traffic.
2. **Star** — exchanges are connected through a central **tandem** exchange.
3. **Hierarchical** — exchanges are arranged in levels (local, toll, regional, international), with direct high-usage routes added where traffic is heavy. National networks use this structure.

### Telephone Signalling

1. **Subscriber loop signalling** — between the telephone and the local exchange: off-hook and on-hook, **dial tone**, the dialled digits, **ringing**, ring-back and **busy tones**.
2. **Interexchange signalling** — between exchanges: in early networks it was sent on the same channel as the voice (**in-band, channel-associated signalling**); today it is sent over a separate data network (**common channel signalling, CCS**), using **Signalling System No. 7 (SS7)**.

**Dialling methods:**

1. **Pulse (rotary) dialling** — each digit is sent as a series of breaks in the loop current (digit 5 = 5 pulses).
2. **Tone dialling (DTMF, dual-tone multi-frequency)** — each key sends **two tones at once**, one from a low group (697, 770, 852, 941 Hz) and one from a high group (1209, 1336, 1477, 1633 Hz). For example, key **1** sends **697 Hz + 1209 Hz**.

### Digital Telephone Network

In the digital PSTN, each voice channel is converted with **PCM** to **64 kbps** (8000 samples × 8 bits; see [PCM](/topics/computer-networks/modulation-techniques#pcm-ppm-pam)). Channels are multiplexed by TDM into **E-1 (2.048 Mbps, 30 voice channels)** or **T-1 (1.544 Mbps, 24 channels)** links and into higher SDH/SONET rates on fibre (see [Multiplexing](/topics/computer-networks/multiplexing)). **ISDN** (Integrated Services Digital Network) extended digital service to the subscriber: the **basic rate interface (BRI)** gives **2B + D** = two 64 kbps bearer channels and a 16 kbps signalling channel.

## Telephone Switching Systems {#telephone-switching-systems}

### Definition of a Switching System

A switching system (telephone exchange) is a **collection of switching elements, arranged and controlled so as to set up a communication path between any two subscribers on demand, and to release it when the call ends**.

### Elements of a Switching System

1. **Switching network** — provides the paths between the calling and called subscribers.
2. **Control subsystem** — identifies the lines, interprets the signalling information, and sets up and releases the paths.
3. **Signalling** — subscriber loop, interexchange and intra-exchange (register) signalling.
4. **Subscriber line interface** and **trunk interface** — the points where subscriber lines and trunks connect to the exchange.
5. **Line scanning unit** and **distributor units** — detect and send signalling information on the lines.
6. **Operator console** and service circuits — for maintenance and administration.

### Types of Switching Systems

Switching systems are classified as follows:

1. **Manual switching** — operators connect calls by hand with cords and plugs on a **switchboard**.
2. **Automatic switching:**
   1. **Electromechanical switching:**
      1. **Strowger (step-by-step) switching** — invented by **Almon B. Strowger** (his company was founded in **1891**). Each dialled digit moves an electromechanical selector one step at a time; the control is distributed in the switches themselves (**direct control**).
      2. **Crossbar switching** — uses a matrix of horizontal and vertical bars whose crosspoints are closed by relays, with a separate common **hard-wired** control (indirect control). It is faster and quieter than Strowger.
   2. **Electronic switching** — controlled by a computer (processor) using **stored program control (SPC)**:
      1. **Space-division switching** — each call has its own physical path through the switch for the whole call.
      2. **Time-division switching** — samples of many calls share one path at different times (TDM); it can be **analog** (PAM samples) or **digital** (PCM samples).

### Stored Program Control (SPC)

**Stored program control (SPC)** is a **method of controlling a telephone exchange in which the control functions are performed by a computer program stored in memory**.

New services (call waiting, call forwarding, abbreviated dialling, itemized billing) can be added by changing the software. SPC can be **centralized** (one main processor, often with a standby) or **distributed** (several processors sharing the work).

### Space-Division and Time-Division Switching

1. **Space-division switch** — the classic form is the **crossbar (crosspoint) matrix**: N inputs and N outputs connected by **N² crosspoints**. **Example:** a 100 × 100 crossbar needs 100² = **10 000 crosspoints**, though at most 50 calls can be in progress among 100 subscribers. **Multistage** switches reduce the number of crosspoints.
2. **Time-division switch** — uses a **time-slot interchanger (TSI)**: the samples of the incoming TDM frame are written into memory and read out in a different order, so that the sample in slot i reaches output slot j. Large digital exchanges combine both: **time–space–time (TST)** switching.

### Comparison of Switching Systems

| Basis | Strowger | Crossbar | Electronic (SPC) |
| --- | --- | --- | --- |
| Technology | Electromechanical selectors | Electromechanical crosspoints and relays | Computers and electronic (digital) switches |
| Control | Direct, step by step | Common, hard-wired | Stored program |
| Speed | Slow | Faster | Very fast |
| Maintenance | High (moving parts, wear) | Moderate | Low |
| New services | Very difficult | Difficult | Easy (change software) |
| Size and power | Large | Large | Small |

## Mobile Communication Generations (1G–5G) {#mobile-communication-generations-1g-5g}

### Cellular Concept

**Cellular network** is a **mobile network in which the service area is divided into small areas called cells, each served by a base station with a limited set of frequencies, and the same frequencies are reused in distant cells**.

1. **Cell** — the area covered by one base station (drawn as a **hexagon**); its size depends on the transmitter power (from a few hundred metres in cities to tens of kilometres in rural areas).
2. **Base station** — the transceiver and antenna of a cell; base stations are connected to a **mobile switching centre (MSC)**, which connects calls to other mobiles and to the PSTN.
3. **Frequency reuse** — cells that are far enough apart use the same frequencies without harmful interference, so a limited spectrum serves many users.
4. **Cluster** — a group of **N** adjacent cells that together use all the available frequencies once; the pattern is repeated over the area.
5. **Handoff (handover)** — when a user moves into a new cell, the call is transferred to the new base station without interruption. In a **hard handoff** (GSM) the old link is released before the new one is made ("break before make"); in a **soft handoff** (CDMA) the mobile is connected to both for a while ("make before break").
6. **Cell splitting** — a congested cell is divided into smaller cells with lower power, which increases capacity.

![Frequency reuse with seven-cell clusters](/diagrams/computer-networks/cellular-reuse.svg)

### Formulas of Frequency Reuse

> **Cluster size: N = i² + ij + j²**

> **Reuse distance: D = R √(3N)**

> **Channels per cell = S ÷ N**

Here **i** and **j** are non-negative integers (shift parameters), **R** is the cell radius, **D** the distance between the centres of the nearest cells using the same frequencies, and **S** the total number of duplex channels. Possible cluster sizes are 3, 4, 7, 9, 12, …

**Example 1:** for i = 2 and j = 1, N = 4 + 2 + 1 = **7**, and D = R √21 ≈ **4.58 R**. A larger N gives less interference (larger D) but fewer channels per cell.

**Example 2:** an operator has **33 MHz** of spectrum and uses two 25 kHz simplex channels for each call (50 kHz per duplex channel). Total channels S = 33 000 ÷ 50 = **660**. With N = 4, each cell has 660 ÷ 4 = **165** channels; with N = 7, about **94**; with N = 12, **55**.

### Generations of Mobile Communication

| Generation | First launched | Signal and technology | Multiple access | Typical data speed | Main services |
| --- | --- | --- | --- | --- | --- |
| **1G** | 1979 (NTT, Japan); AMPS 1983 | Analog voice (AMPS, NMT, TACS) | FDMA | About 2.4 kbps | Voice only |
| **2G** | 1991 (GSM, Finland) | Digital (GSM, IS-95 CDMA) | TDMA (GSM), CDMA | 9.6–14.4 kbps | Digital voice, **SMS**, encryption |
| 2.5G / 2.75G | Around 2000 | GPRS / EDGE (packet data) | TDMA | Up to about 114 / 384 kbps | MMS, basic mobile Internet |
| **3G** | 2001 (NTT DoCoMo, Japan) | UMTS (W-CDMA), CDMA2000 (IMT-2000) | CDMA | About 2 Mbps (HSPA up to 42 Mbps) | Mobile Internet, **video calls** |
| **4G** | 14 December 2009 (TeliaSonera, Stockholm and Oslo) | LTE, WiMAX; all-IP (IMT-Advanced) | OFDMA | 100 Mbps (moving) to 1 Gbps (stationary) | HD video, **VoLTE**, mobile broadband |
| **5G** | 2019 (large-scale, e.g. South Korea) | 5G NR, sub-6 GHz and mmWave (IMT-2020) | OFDMA | Peak 20 Gbps; latency about 1 ms | eMBB, URLLC, mMTC (IoT), network slicing |

**Main features of each generation:**

1. **1G** — analog voice; no security, poor quality, no roaming between operators of different systems (NMT introduced international roaming in the Nordic countries).
2. **2G** — digital voice with better quality and **encryption**; **SIM** cards; **SMS**; **GPRS** (2.5G) and **EDGE** (2.75G) added packet data.
3. **3G** — **mobile broadband**: Internet, e-mail, video calling and multimedia, defined by the ITU's IMT-2000 requirements.
4. **4G** — an **all-IP** network (voice also carried as IP — **VoLTE**), using **OFDMA** and **MIMO** antennas; IMT-Advanced required 100 Mbps for moving and 1 Gbps for stationary users.
5. **5G** — three service types defined by the ITU: **enhanced mobile broadband (eMBB)**, **ultra-reliable low-latency communications (URLLC)** for uses such as remote surgery and self-driving cars, and **massive machine-type communications (mMTC)** for the Internet of Things; also **network slicing** and **millimetre-wave** bands.

## GSM Architecture {#gsm-architecture}

### Definition of GSM

GSM (Global System for Mobile Communications) is the **second-generation (2G) digital cellular standard that uses a combination of FDMA and TDMA to carry digital voice and data**.

The GSM standardization group was set up in Europe in **1982**; the first commercial GSM network opened in **Finland in 1991**. GSM became the most widely used mobile system in the world.

### Main Parameters of GSM

1. **Frequency bands:** **GSM-900** — uplink (mobile to base station) **890–915 MHz**, downlink **935–960 MHz**, with a **duplex spacing of 45 MHz**; also **GSM-1800 (DCS-1800)**.
2. **FDMA:** each 25 MHz band is divided into **124 carriers of 200 kHz** (25 MHz ÷ 200 kHz − 1 guard channel = 124).
3. **TDMA:** each carrier is divided into **8 time slots**; a **TDMA frame lasts 4.615 ms**, so one time slot lasts 4.615 ÷ 8 ≈ **0.577 ms**. Each slot carries one full-rate call, so one carrier carries **8 calls**.
4. **Modulation:** **GMSK**, with a gross bit rate of **270.833 kbps** per carrier.
5. **Speech coding:** about **13 kbps** (full rate), converted to 64 kbps PCM for the PSTN.
6. **Duplexing:** **FDD** (separate uplink and downlink frequencies).

### Architecture of GSM

A GSM network has four subsystems:

1. Mobile station (MS)
2. Base station subsystem (BSS)
3. Network switching subsystem (NSS)
4. Operation support subsystem (OSS)

![GSM architecture](/diagrams/computer-networks/gsm-architecture.svg)

### 1. Mobile Station (MS)

The mobile station is the user's equipment.

It has two parts:

1. **Mobile equipment (ME)** — the handset (radio transceiver, display, processors), identified by its **IMEI** (International Mobile Equipment Identity).
2. **SIM (Subscriber Identity Module)** — a smart card that holds the subscriber's identity (**IMSI**, International Mobile Subscriber Identity), the secret authentication key **Ki** and other data. Moving the SIM to another handset moves the subscription with it (**personal mobility**).

### 2. Base Station Subsystem (BSS)

1. **Base transceiver station (BTS)** — the radio transceivers and antennas of a **cell**; it handles the radio link with the mobiles (modulation, encoding, encryption). A BTS has 1 to 16 transceivers.
2. **Base station controller (BSC)** — controls one or more BTSs: allocates radio channels and time slots, controls power and **frequency hopping**, and handles **handovers** between its BTSs. The BSC connects to the MSC.

### 3. Network Switching Subsystem (NSS)

1. **Mobile switching centre (MSC)** — the central switch: sets up and routes calls between mobiles and to other networks, and manages **registration, authentication, location updating and handovers** between BSCs.
2. **Gateway MSC (GMSC)** — the MSC that connects the GSM network to the **PSTN** and other networks; incoming calls are routed through it.
3. **Home location register (HLR)** — the main **permanent database** of all subscribers of the operator: their subscriptions, services and current location (the VLR where they are).
4. **Visitor location register (VLR)** — a **temporary database**, usually built into the MSC, holding information about subscribers **currently in that MSC's area** (including roaming visitors), copied from their HLR.
5. **Authentication centre (AuC)** — a protected database holding each subscriber's **secret key (Ki)**; it produces the data used to **authenticate** subscribers and to generate the **ciphering keys**.
6. **Equipment identity register (EIR)** — a database of valid mobile equipment (**IMEIs**); stolen or unapproved handsets are blocked.

### 4. Operation Support Subsystem (OSS)

The **operation and maintenance centre (OMC)** monitors and controls the network: configuration, performance, fault management, security, subscriptions and billing.

### GSM Interfaces

1. **Um (air interface)** — the radio link between the MS and the BTS.
2. **Abis** — between the BTS and the BSC.
3. **A** — between the BSC and the MSC.

### GSM Security

GSM authenticates the SIM with a **challenge–response** procedure (algorithm **A3**, using the secret key Ki shared by the SIM and the AuC), generates a ciphering key (algorithm **A8**), and encrypts speech over the air (algorithms **A5/1, A5/2, A5/3**). A temporary identity (**TMSI**) is used over the air instead of the IMSI to protect the user's privacy.

### Call to a Mobile (Roaming)

When a call is made to a mobile: the call reaches the **GMSC**, which asks the **HLR** where the subscriber is; the HLR knows the subscriber's current **VLR/MSC**, which gives a temporary routing number; the call is routed to that MSC, which **pages** the mobile in its location area through the BSCs and BTSs.

## Multiple Access Techniques: FDMA, TDMA, CDMA {#multiple-access-techniques-fdma-tdma-cdma}

### Multiple Access

Multiple access is a **technique that allows many users to share a common communication channel (a radio band) at the same time**.

Multiplexing combines signals at one point; multiple access lets many separate users (such as mobile phones) share the channel. There are three basic techniques:

1. **FDMA** — divides the **frequency** band.
2. **TDMA** — divides **time**.
3. **CDMA** — separates users by **codes**.

![FDMA, TDMA and CDMA](/diagrams/computer-networks/multiple-access.svg)

### FDMA (Frequency Division Multiple Access)

FDMA is a **multiple access technique in which the available bandwidth is divided into separate frequency channels, and each user is given its own channel for the whole duration of the call**.

Channels are separated by **guard bands**. Each user transmits continuously on its channel. It is simple, but a channel is wasted when its user is idle, and filters must be sharp. Example: **1G AMPS** (30 kHz channels).

### TDMA (Time Division Multiple Access)

TDMA is a **multiple access technique in which several users share the same frequency channel by transmitting in different time slots**, in turn.

Each user sends in bursts during its slot of a repeating **frame**, so accurate **synchronization** and guard times are needed. A mobile transmits only part of the time, which saves battery. Example: **GSM** (8 slots per 200 kHz carrier, combined with FDMA).

### CDMA (Code Division Multiple Access)

CDMA is a **multiple access technique in which all users transmit at the same time on the same wide frequency band, and each user's signal is spread with its own unique code**, so the receiver separates the users by their codes.

CDMA is based on **spread spectrum** (direct sequence). The codes are **orthogonal** (for example, **Walsh codes**): the inner product of two different codes is zero, so other users' signals cancel out when the receiver correlates with the wanted code.

**Example (two users with 4-chip Walsh codes):** user A sends bit **+1** with code **[+1, +1, +1, +1]**; user B sends bit **−1** with code **[+1, −1, +1, −1]**.

1. Signals: A = [+1, +1, +1, +1]; B = −1 × [+1, −1, +1, −1] = [−1, +1, −1, +1].
2. The channel adds them: **[0, +2, 0, +2]**.
3. Receiver for A: (0×1 + 2×1 + 0×1 + 2×1) ÷ 4 = **+1** → A's bit is +1.
4. Receiver for B: (0×1 + 2×(−1) + 0×1 + 2×(−1)) ÷ 4 = **−1** → B's bit is −1.

CDMA allows **soft handoff**, gives more capacity than FDMA and TDMA, and resists interference and eavesdropping, but needs accurate **power control** to solve the **near–far problem** (a strong nearby signal drowning a weak distant one). Examples: **IS-95 (cdmaOne)**, CDMA2000 and the W-CDMA of 3G.

### Other Multiple Access Techniques

1. **OFDMA (orthogonal FDMA)** — users are given groups of many narrow, orthogonal subcarriers; used in **4G LTE**, **5G** and Wi-Fi 6.
2. **SDMA (space division multiple access)** — users in different directions share frequencies through directional (smart) antennas.

### FDMA vs TDMA vs CDMA

| Basis | FDMA | TDMA | CDMA |
| --- | --- | --- | --- |
| Resource divided | Frequency | Time | Code |
| Each user has | A separate frequency band, all the time | The whole channel in its time slot | The whole band, all the time, with a unique code |
| Guard needed | Guard bands | Guard times | None (codes) |
| Synchronization | Not needed | Needed (slots) | Needed (codes) |
| Handoff | Hard | Hard | Soft |
| Capacity | Lowest | Medium | Highest |
| Interference and security | Poorer | Medium | Best (spread spectrum) |
| Power control | Simple | Simple | Strict (near–far problem) |
| Examples | 1G AMPS | GSM, D-AMPS | IS-95, CDMA2000, W-CDMA (3G) |

## Spread Spectrum {#spread-spectrum}

### Definition of Spread Spectrum

Spread spectrum is a **transmission technique in which the signal is deliberately spread over a frequency band much wider than the bandwidth needed for the data, using a pseudo-random (spreading) code known to the sender and the receiver**.

Because the power is spread thinly over a wide band, the signal looks like noise. It was first used in military communication.

### Advantages of Spread Spectrum

1. **Resistance to jamming and interference** — narrowband interference affects only a small part of the spread signal.
2. **Security and privacy** — the signal is hard to detect or intercept without the code.
3. **Resistance to multipath fading.**
4. **Multiple access (CDMA)** — many users can share the same band with different codes.

### Processing Gain

> **Processing gain (G_p) = spread bandwidth ÷ data bandwidth ≈ chip rate ÷ bit rate**, and in decibels **10 log₁₀ G_p**

Here the **chip rate** is the rate of the spreading code (chips per second) and the **bit rate** is the rate of the data.

**Example 1:** IS-95 CDMA spreads 9.6 kbps of speech data with a chip rate of 1.2288 Mcps. G_p = 1 228 800 ÷ 9600 = **128**, that is 10 log₁₀ 128 ≈ **21 dB**.

**Example 2:** 802.11 (DSSS) spreads each data bit with an 11-chip **Barker code**; at 1 Mbps the chip rate is **11 Mchips/s** and G_p = 11 (≈ 10.4 dB).

### Types of Spread Spectrum

There are two types of spread spectrum:

1. Frequency hopping spread spectrum (FHSS)
2. Direct sequence spread spectrum (DSSS)

### Frequency Hopping Spread Spectrum (FHSS)

**Frequency hopping spread spectrum (FHSS)** is a **spread spectrum technique in which the carrier frequency hops (changes) rapidly among many frequency channels in a pseudo-random order known to both the sender and the receiver**.

The signal stays on each frequency for a short **dwell time**. If several data bits are sent per hop, it is **slow hopping**; if each bit is sent over several hops, it is **fast hopping**. Interference on one frequency affects only a few hops. Example: **Bluetooth** (1600 hops per second over 79 channels of 1 MHz in the 2.4 GHz band), military radios.

### Direct Sequence Spread Spectrum (DSSS)

**Direct sequence spread spectrum (DSSS)** is a **spread spectrum technique in which each data bit is replaced by a sequence of many shorter bits (chips) of a pseudo-noise (PN) code**, so the signal occupies a much wider band.

The data bit is combined (XOR or multiplied) with the chip sequence; the receiver multiplies the received signal by the same code to recover the data (**despreading**), while other signals remain spread and look like noise. Examples: **802.11b Wi-Fi**, **CDMA (IS-95, W-CDMA)**, GPS.

### FHSS vs DSSS

| Basis | FHSS | DSSS |
| --- | --- | --- |
| Spreading method | Carrier hops among frequencies | Each bit multiplied by a fast chip code |
| Bandwidth used at an instant | Narrow (one channel at a time) | Whole wide band all the time |
| Effect of narrowband interference | Affects only some hops | Reduced by despreading |
| Synchronization | Hop timing | Chip timing (more precise) |
| Data rate (in early Wi-Fi) | Lower (about 1–3 Mbps) | Higher (11 Mbps in 802.11b) |
| Complexity | Simpler | More complex |
| Examples | Bluetooth, military radios | CDMA, 802.11b, GPS |

## Optical Fiber Communication Systems {#optical-fiber-communication-systems}

### Definition of Optical Fibre Communication

Optical fibre communication is a **method of transmitting information from one place to another by sending pulses of light through an optical fibre**.

The light carries the information as a modulated optical carrier; the fibre guides it by **total internal reflection** (see [Optical Fibre](/topics/computer-networks/transmission-modes-and-media#guided-media-stp-utp-coaxial-optical-fiber) for the structure, the critical angle and the propagation modes). Fibres form the backbone of modern telephone networks, the Internet and undersea cables.

### Elements of an Optical Fibre Communication System

1. **Transmitter** — converts the electrical signal into light (**electrical to optical, E/O**): a driver circuit and a light source, either an **LED** (cheap, for short multimode links) or a **laser diode** (narrow beam and spectrum, for long single-mode links).
2. **Optical fibre (channel)** — carries the light; lengths of fibre are joined by **splices** and **connectors**.
3. **Repeaters or optical amplifiers** — restore the weakened signal on long links; modern links use **erbium-doped fibre amplifiers (EDFAs)**, which amplify light directly.
4. **Receiver** — converts the light back to an electrical signal (**optical to electrical, O/E**) with a **photodetector** (**PIN photodiode** or **avalanche photodiode, APD**), followed by an amplifier and a decision circuit.

![Block diagram of an optical fibre communication system](/diagrams/computer-networks/fiber-system.svg)

### Transmission Windows

Silica fibre has low loss at three wavelength regions ("windows"): **850 nm** (first window), **1310 nm** (second window, low dispersion) and **1550 nm** (third window, lowest loss, about **0.2 dB/km**). Long-distance links use 1550 nm and **wavelength-division multiplexing (WDM)** to send many wavelengths in one fibre.

### Numerical Aperture

> **Numerical aperture: NA = √(n₁² − n₂²) = sin θₐ**

Here **n₁** is the refractive index of the core, **n₂** that of the cladding and **θₐ** the **acceptance angle** — the largest angle to the fibre axis at which light entering the fibre is guided.

**Example:** n₁ = 1.48 and n₂ = 1.46. NA = √(1.48² − 1.46²) = √(2.1904 − 2.1316) = √0.0588 ≈ **0.243**, so the acceptance angle θₐ = sin⁻¹ 0.243 ≈ **14°**.

### Loss in a Fibre Link

> **Total loss (dB) = attenuation (dB/km) × length (km) + splice and connector losses**

**Example:** a 100 km link at 1550 nm with 0.2 dB/km has a fibre loss of 100 × 0.2 = **20 dB**. If 1 mW is launched, the received power is 1 × 10^(−20/10) = **0.01 mW**, still enough for a sensitive receiver; longer links need amplifiers.

### Losses and Dispersion

1. **Attenuation** — loss of light power by **absorption** (impurities), **scattering** (Rayleigh scattering in the glass) and **bending losses** (macro- and micro-bends).
2. **Dispersion** — spreading of the light pulses as they travel, which limits the data rate: **intermodal dispersion** (different paths in multimode fibre) and **chromatic dispersion** (different wavelengths travel at different speeds).

### Advantages of Optical Fibre Communication

1. **Very high bandwidth** — terabits per second over one fibre with WDM.
2. **Low loss** — long distances (about 100 km) between amplifiers.
3. **Immunity to electromagnetic interference** and no crosstalk.
4. **Security** — difficult to tap without detection.
5. **Small size and light weight**; made from abundant raw material (silica).
6. Electrical isolation; no sparks (safe in hazardous areas).

### Disadvantages of Optical Fibre Communication

1. High cost of installation, splicing and test equipment; needs skilled workers.
2. Fragile; cannot be bent sharply.
3. Needs E/O and O/E conversion at the ends.

### Applications

Long-distance and undersea telephone and Internet backbones (such as the SEA-ME-WE submarine cables), fibre to the home (FTTH), local area network backbones, cable television, and medical imaging (endoscopes).

## Satellite Communication Systems {#satellite-communication-systems}

### Definition of Satellite Communication

Satellite communication is the **communication between two or more earth stations through an artificial satellite in orbit, which receives signals from one earth station, amplifies them and sends them back to the earth**.

A communication satellite is a **microwave repeater in space**. It overcomes the limits of the earth's curvature for line-of-sight radio links. The first artificial satellite was **Sputnik 1** (Soviet Union, 1957). Bangladesh's first communication satellite, **Bangabandhu Satellite-1**, was launched on **12 May 2018** on a SpaceX Falcon 9 rocket into **geostationary orbit at 119.1° East**; built by Thales Alenia Space, it carries **40 Ku-band and C-band transponders**.

### Elements of a Satellite Communication System

1. **Space segment** — the satellite and its subsystems: **transponders**, antennas, power (solar panels and batteries), attitude and orbit control, and telemetry, tracking and command (TT&C).
2. **Ground (earth) segment** — earth stations that transmit to and receive from the satellite, including large gateways and small terminals (such as VSATs and TV dishes).

### Uplink, Downlink and Transponder

1. **Uplink** — the path from the earth station **to the satellite**, at the uplink frequency.
2. **Downlink** — the path from the satellite **to the earth station**, at a **different, lower** downlink frequency.
3. **Transponder** — the satellite circuit that receives the uplink signal, **amplifies** it, **changes its frequency** to the downlink frequency and retransmits it. Different frequencies are used so that the strong transmitted signal does not interfere with the weak received one.

![Satellite orbits and the uplink and downlink of a transponder](/diagrams/computer-networks/satellite-orbits.svg)

### Satellite Frequency Bands

| Band | Uplink / downlink (approximate) | Typical use |
| --- | --- | --- |
| L band (1–2 GHz) | 1.6 / 1.5 GHz | Mobile satellite phones, GPS |
| S band (2–4 GHz) | 2.2 / 1.9 GHz | Mobile services, weather satellites |
| C band (4–8 GHz) | **6 / 4 GHz** | TV distribution, telephone trunks; little rain effect |
| Ku band (12–18 GHz) | **14 / 11–12 GHz** | Direct-to-home TV, VSAT; affected by rain |
| Ka band (26–40 GHz) | 30 / 20 GHz | High-speed satellite Internet; most affected by rain |

### Types of Satellite Orbits

| Orbit | Altitude | Orbital period | One-hop delay | Examples |
| --- | --- | --- | --- | --- |
| **LEO** (low earth orbit) | About 160–2000 km | About 90–120 minutes | A few milliseconds | Starlink, Iridium, International Space Station |
| **MEO** (medium earth orbit) | About 2000–35 786 km | Several hours (GPS: 12 hours at 20 200 km) | Tens of milliseconds | GPS, Galileo, O3b |
| **GEO** (geostationary orbit) | **35 786 km** above the equator | **23 h 56 min** (one sidereal day) | About **0.24 s** | TV broadcast, Bangabandhu Satellite-1, VSAT networks |

1. A **geosynchronous** orbit has a period of one sidereal day; a **geostationary** orbit is a geosynchronous orbit that is **circular and above the equator**, so the satellite appears **fixed** in the sky and ground antennas need no tracking. **Three** geostationary satellites spaced 120° apart can cover almost the whole earth (except the polar regions).
2. LEO satellites move quickly across the sky, so a system needs **many satellites (a constellation)** and handovers between them, but the delay and the power needed are small.

### Kepler's Third Law and the Geostationary Orbit

> **T = 2π √(a³ ÷ μ)**

Here **T** is the orbital period, **a** the radius of the orbit (from the earth's centre), and **μ** the earth's gravitational parameter, about **398 600 km³/s²**. The square of the period is proportional to the cube of the orbit radius (Kepler's third law).

**Example:** for a geostationary satellite, a = 6378 + 35 786 = **42 164 km**. T = 2π √(42 164³ ÷ 398 600) ≈ **86 164 s ≈ 23 h 56 min**, exactly one sidereal day, so the satellite keeps pace with the earth's rotation.

### Delay in Satellite Communication

> **One-hop delay ≈ 2h ÷ c**

**Example:** for a geostationary satellite (h = 35 786 km), one hop (earth → satellite → earth) takes about 2 × 35 786 ÷ 300 000 ≈ **0.24 s**, so a reply needs about **0.48 s** — noticeable in telephone calls. For a LEO satellite at 550 km, one hop takes only about **3.7 ms**.

### Multiple Access in Satellite Systems

Many earth stations share one transponder by **FDMA** (each station a frequency band), **TDMA** (each station a time slot; bursts are synchronized) or **CDMA** (each station a code). The VSAT networks used by banks and remote offices are described in [VSAT](/topics/computer-networks/wireless-and-cellular-networks#vsat).

### Applications of Satellite Communication

1. **Television broadcasting** — direct-to-home (DTH) TV and distribution of programmes to cable networks.
2. **Telephone and Internet** links to remote areas, islands, ships and aircraft; backup for terrestrial networks.
3. **Navigation** — GPS, Galileo and other systems.
4. **Weather forecasting** and earth observation (remote sensing).
5. **Disaster management** and military communication.

### Advantages and Disadvantages of Satellite Communication

**Advantages:** very wide coverage (one GEO satellite sees about a third of the earth); cost independent of distance; quick to set up in remote areas; suitable for broadcasting to many receivers at once.

**Disadvantages:** high launch and building cost; long **propagation delay** (GEO); **rain fade** at high frequencies; satellites have a limited lifetime (about 15 years for GEO) and cannot be repaired easily; signals can be received by anyone in the footprint, so encryption is needed.

## References {#references}

**TutorialsPoint**

- [Telecommunication Switching Systems and Networks](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/index.htm) — [Introduction](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_introduction.htm), [Switching Systems](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_switching_systems.htm), [Elements of a Switching System](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_elements_of_a_switching_system.htm), [Strowger](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_strowger_switching_system.htm), [Crossbar Switching](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_crossbar_switching.htm), [Stored Program Control](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_stored_program_control.htm), [Time Division Switching](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_time_division_switching.htm) and [Telephone Networks](https://www.tutorialspoint.com/telecommunication_switching_systems_and_networks/telecommunication_switching_systems_and_networks_telephone_networks.htm) — accessed 2026-11-06 (telecommunication, Bell 1876, n(n − 1)/2 links, classification of switching systems, elements of a switching system, SPC, space- and time-division switching, PSTN, subscriber loops and the MDF, mesh, star and hierarchical interconnection). Its PSTN page says that circuit, packet and message switching "are different modes of using PSTN"; the PSTN is a circuit-switched network.
- [GSM Architecture](https://www.tutorialspoint.com/gsm/gsm_architecture.htm), [GSM Overview](https://www.tutorialspoint.com/gsm/gsm_overview.htm) and [GSM Specification](https://www.tutorialspoint.com/gsm/gsm_specification.htm) — accessed 2026-11-06 (MS, SIM, BTS, BSC, MSC, HLR, VLR, AuC, EIR, OMC; 124 carriers of 200 kHz, 8 time slots, frame of 4.615 ms, 270.833 kbps; GSM group 1982, launch 1991). Issues found: the specification page swaps the uplink and downlink of GSM-900 and gives "933–960 MHz" (the uplink is 890–915 MHz and the downlink 935–960 MHz), and gives the duplex distance as 80 MHz (45 MHz for GSM-900); the architecture page writes "PSDN" for PSTN and gives GPRS "up to 115 kbps".
- [Wireless Communication: Cellular Networks](https://www.tutorialspoint.com/wireless_communication/wireless_communication_cellular_networks.htm), [Multiple Access](https://www.tutorialspoint.com/wireless_communication/wireless_communication_multiple_access.htm) and [Terms in Mobile Telephony](https://www.tutorialspoint.com/wireless_communication/wireless_communication_terms_in_mobile_telephony.htm); [CDMA: Multiple Access Methods](https://www.tutorialspoint.com/cdma/multiple_access_methods.htm), [FDMA](https://www.tutorialspoint.com/cdma/fdma_technology.htm), [TDMA](https://www.tutorialspoint.com/cdma/tdma_technology.htm), [CDMA Technology](https://www.tutorialspoint.com/cdma/cdma_technology.htm), [Spread Spectrum](https://www.tutorialspoint.com/cdma/cdma_spread_spectrum.htm) and [CDMA Techniques](https://www.tutorialspoint.com/cdma/cdma_techniques.htm) — accessed 2026-11-06 (cells, frequency reuse and handoff; FDMA, TDMA, CDMA; DS and FH spread spectrum; Walsh, PN and Gold codes). Its spread spectrum page describes spread spectrum as a technique in which "the frequency of the transmitted signal is deliberately varied"; that describes frequency hopping only — direct sequence spreads the signal with a chip code.
- [Satellite Communication: Introduction](https://www.tutorialspoint.com/satellite_communication/satellite_communication_introduction.htm), [Earth Orbit Satellites](https://www.tutorialspoint.com/satellite_communication/satellite_communication_earth_orbit_satellites.htm), [Transponders](https://www.tutorialspoint.com/satellite_communication/satellite_communication_transponders.htm), [Services](https://www.tutorialspoint.com/satellite_communication/satellite_communication_services.htm) and [Kepler's Laws](https://www.tutorialspoint.com/satellite_communication/satellite_communication_keplers_laws.htm) — accessed 2026-11-06 (uplink, downlink and transponder; Sputnik 1 in 1957; GEO, MEO and LEO; geosynchronous vs geostationary; Kepler's third law). Its introduction gives the sky-wave band as "3040 MHz" (sky waves are used at about 3–30 MHz), and its orbit page gives the geostationary height as 35 900 km (35 786 km).
- [What is VSAT in the Computer Network?](https://www.tutorialspoint.com/what-is-vsat-in-the-computer-network) — accessed 2026-11-06 (L, S, C and Ku band frequencies)

**GeeksforGeeks**

- [Generations of Wireless Communication](https://www.geeksforgeeks.org/computer-networks/generations-of-wireless-communication/) — accessed 2026-11-06 (0G to 5G, technologies and speeds, comparison table)
- [How GSM Works](https://www.geeksforgeeks.org/computer-networks/how-gsm-works/) and [GSM in Wireless Communication](https://www.geeksforgeeks.org/computer-networks/gsm-in-wireless-communication/) — accessed 2026-11-06 (MS, BTS, BSC, MSC, HLR, VLR)
- [Difference between FDMA, TDMA and CDMA](https://www.geeksforgeeks.org/computer-networks/difference-between-fdma-tdma-and-cdma/) and [Difference between FDMA and CDMA](https://www.geeksforgeeks.org/computer-networks/difference-between-fdma-and-cdma/) — accessed 2026-11-06 (definitions, advantages, comparison). It states that "FDMA works only with analog signals" (FDMA channels can carry digital modulation too), and lists "TDMA requires substantial investment … as cell sizes decrease" among the *advantages* of TDMA, which is a disadvantage.
- [FHSS vs DSSS](https://www.geeksforgeeks.org/computer-networks/fhss-vs-dsss/) — accessed 2026-11-06 (definitions, advantages, about 3 Mbps for FHSS and 11 Mbps for DSSS, Bluetooth). Its PSTN, satellite and fibre-communication URLs return 404.

**TpointTech**

- [Telecommunication Networks](https://www.tpointtech.com/telecommunication-networks), [Public Switched Telephone Network](https://www.tpointtech.com/public-switched-telephone-network), [Cellular Network](https://www.tpointtech.com/cellular-network), [4G Mobile Communication Technology](https://www.tpointtech.com/4g-mobile-communication-technology), [CDMA vs GSM](https://www.tpointtech.com/cdma-vs-gsm), [Direct Sequence Spread Spectrum](https://www.tpointtech.com/direct-sequence-spread-spectrum), [What is Fiber Optics?](https://www.tpointtech.com/what-is-fiber-optics) and [Advantages and Disadvantages of Satellite Communication](https://www.tpointtech.com/advantages-and-disadvantages-of-satellite-communication) — accessed 2026-11-06 (elements of telecommunication networks, exchanges and subscriber lines, cells and handover, 4G, DSSS, fibre structure and total internal reflection, satellite advantages and disadvantages)

**Programiz**

- Programiz has no page on telecommunication (checked 2026-11-06).

**Additional sources** (used to check dates and figures, and for the frequency-reuse formulas, the numerical aperture and fibre loss, and Bangabandhu Satellite-1)

- Wikipedia, [1G](https://en.wikipedia.org/wiki/1G), [3G](https://en.wikipedia.org/wiki/3G), [4G](https://en.wikipedia.org/wiki/4G), [5G](https://en.wikipedia.org/wiki/5G), [GSM](https://en.wikipedia.org/wiki/GSM), [Cellular network](https://en.wikipedia.org/wiki/Cellular_network), [Strowger switch](https://en.wikipedia.org/wiki/Strowger_switch), [DTMF signaling](https://en.wikipedia.org/wiki/DTMF_signaling), [Optical fiber](https://en.wikipedia.org/wiki/Optical_fiber) and [Bangabandhu Satellite-1](https://en.wikipedia.org/wiki/Bangabandhu_Satellite-1) — accessed 2026-11-06 (NTT 1979, NMT 1981, AMPS 1983; NTT DoCoMo 3G 2001; first LTE network on 14 December 2009; 5G from 2019 with eMBB, URLLC and mMTC and 20 Gbps peak; GSM in Finland in 1991 and the A5 ciphers; D = R√(3N); Strowger's company of 1891; DTMF frequencies; NA and about 0.2 dB/km at 1550 nm; Bangabandhu-1 launched on 12 May 2018 to 119.1° E with 40 Ku- and C-band transponders by Thales Alenia Space).
- Theodore S. Rappaport, *Wireless Communications: Principles and Practice*, 2nd edition, Prentice Hall, chapter 3 (cluster size N = i² + ij + j², reuse distance, and the 33 MHz channel example). All calculations above (links, reuse, GSM timing, the CDMA example, processing gain, NA, fibre loss, the geostationary period and satellite delays) were checked by script.
