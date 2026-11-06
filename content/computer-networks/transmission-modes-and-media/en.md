---
description: Transmission modes (simplex, half-duplex, full-duplex; serial and parallel), synchronous and asynchronous transmission, guided media (UTP, STP, coaxial cable, optical fibre), unguided media (radio, microwave, infrared), satellite as a medium, and the null modem.
updated: 2026-11-06
---

## Transmission Modes and Transmission Systems {#transmission-modes-and-transmission-systems}

### Definition of Transmission Mode

Transmission mode is the **way data is transferred between two devices connected by a link**.

The term is used for two separate classifications:

1. **By direction of data flow** — simplex, half-duplex and full-duplex.
2. **By the number of bits sent at a time** — parallel and serial transmission; serial transmission is further divided into asynchronous and synchronous (see [Synchronous and Asynchronous Transmission](#synchronous-and-asynchronous-transmission)).

### Types of Transmission Mode by Direction

There are three types of transmission mode by the direction of data flow:

1. Simplex
2. Half-duplex
3. Full-duplex

![Simplex, half-duplex and full-duplex transmission](/diagrams/computer-networks/transmission-modes.svg)

### 1. Simplex Mode

Simplex mode is a transmission mode in which **data flows in only one direction**: one device can only send and the other can only receive.

The whole capacity of the channel is used in one direction. The receiver cannot reply, so it cannot report errors back to the sender. Examples:

1. Keyboard to computer.
2. Computer to monitor.
3. Radio and television broadcasting.

### 2. Half-Duplex Mode

Half-duplex mode is a transmission mode in which **both devices can send and receive, but not at the same time**: when one device sends, the other can only receive.

The whole capacity of the channel is used by the device that is sending at that moment. Because the receiver can reply, it can ask for damaged data to be resent. Examples:

1. Walkie-talkie (press to talk, release to listen).
2. A hub-based Ethernet LAN.

### 3. Full-Duplex Mode

**Full-duplex mode** is a transmission mode in which **both devices can send and receive at the same time**.

It is also called duplex mode.

The capacity of the link is shared between the two directions, either by two separate paths (for example, separate wire pairs) or by dividing the channel between the two directions. It gives the best performance. Examples:

1. Telephone conversation.
2. A switch-based Ethernet LAN.
3. Mobile phone networks.

### Simplex vs Half-Duplex vs Full-Duplex

| Basis | Simplex | Half-duplex | Full-duplex |
| --- | --- | --- | --- |
| Direction | One way only | Both ways, one at a time | Both ways at the same time |
| Sending and receiving | Sender only sends, receiver only receives | Each device sends and receives, alternately | Each device sends and receives together |
| Channel use | Whole channel in one direction | Whole channel by the current sender | Channel shared by both directions (or two paths) |
| Performance | Lowest | Moderate | Best |
| Feedback / error reporting | Not possible | Possible | Possible |
| Example | Keyboard, TV broadcast | Walkie-talkie | Telephone |

### Parallel and Serial Transmission

Binary data can be sent over a link in two ways: in **parallel** (a group of bits at a time) or in **serial** (one bit at a time).

![Parallel and serial transmission](/diagrams/computer-networks/serial-parallel.svg)

#### Parallel Transmission

Parallel transmission is the **sending of a group of bits (usually 8) at the same time, each bit on its own wire**, with one clock tick.

Its advantage is **speed**: n bits are sent in the time of one bit. Its disadvantages are **cost** (n wires are needed) and **skew** (bits on different wires may arrive at slightly different times), so it is used only over **short distances**. Examples: the old parallel printer port and the data bus inside a computer.

#### Serial Transmission

Serial transmission is the **sending of bits one after another over a single wire (channel)**.

It needs only one channel, so it **costs less** (by a factor of about n) and works over long distances. Because the device stores data in parallel, a **parallel-to-serial converter** is needed at the sender and a **serial-to-parallel converter** at the receiver. Examples: USB, Ethernet, and all long-distance communication. Serial transmission is of two types: **asynchronous** and **synchronous**.

#### Parallel vs Serial Transmission

| Basis | Parallel transmission | Serial transmission |
| --- | --- | --- |
| Bits sent | Several (for example, 8) at a time | One at a time |
| Wires needed | n wires for n bits | One wire (channel) |
| Speed | Faster | Slower (per clock tick) |
| Cost | Higher | Lower |
| Distance | Short | Long |
| Problems | Skew and crosstalk between wires | Needs parallel–serial conversion |
| Examples | Parallel printer port, internal data bus | USB, Ethernet, telephone lines |

## Synchronous and Asynchronous Transmission {#synchronous-and-asynchronous-transmission}

### Asynchronous Transmission

Asynchronous transmission is a **serial transmission in which each byte (character) is sent separately, framed by a start bit and one or more stop bits**.

It is called asynchronous because the timing **between bytes** does not matter: the sender can send a byte at any time, and there can be **gaps** of any length between bytes. The timing **within a byte** still matters: the receiver uses the start bit to synchronize with each byte.

1. **Start bit** — a **0** sent before each byte, to tell the receiver that a byte is arriving.
2. **Data bits** — usually 8 bits (sometimes with a parity bit for error detection).
3. **Stop bit(s)** — one or more **1**s sent after the byte, to mark its end.
4. **Idle line** — between bytes the line is kept in the stop state (1).

Examples: data from a keyboard to a computer, serial (RS-232) ports and UARTs.

![Asynchronous and synchronous serial transmission](/diagrams/computer-networks/async-sync-frame.svg)

### Efficiency of Asynchronous Transmission

The start and stop bits are **overhead**: they carry no data.

> **Efficiency = data bits ÷ total bits sent per character**

**Example 1:** each character has 1 start bit, 8 data bits and 1 stop bit, so 10 bits are sent per character. Efficiency = 8 ÷ 10 = **80%**. On a 9600 bps line, at most 9600 ÷ 10 = **960 characters per second** can be sent.

**Example 2:** with 1 start bit, 8 data bits, 1 parity bit and 2 stop bits, 12 bits are sent per character. Efficiency = 8 ÷ 12 ≈ **66.7%**, and a 9600 bps line carries 9600 ÷ 12 = **800 characters per second**.

### Synchronous Transmission

Synchronous transmission is a **serial transmission in which data is sent as a continuous stream of bits, grouped into frames (blocks), with no start bit, stop bit or gaps between bytes**.

The sender and receiver are kept in step by a **common clock** (a separate clock line, or timing information carried in the signal itself). The receiver counts the bits and separates them into bytes. Each frame starts with **synchronization (header) characters** and ends with a trailer. Because there is little overhead, it is **faster** and more efficient than asynchronous transmission.

**Example:** a frame carries 1000 bytes of data (8000 bits) with 8 bytes (64 bits) of header and trailer. Efficiency = 8000 ÷ (8000 + 64) ≈ **99.2%**, much higher than the 80% of asynchronous transmission.

Examples: Ethernet, HDLC and SONET; transfers of large blocks of data between computers.

### Isochronous Transmission

Isochronous transmission is a **transmission in which data is delivered at a fixed, guaranteed rate**, so that there are no uneven delays between frames.

It is needed for real-time audio and video, where synchronization between characters is not enough and the whole stream must arrive at a steady rate. Example: live television and video calls.

### Synchronous vs Asynchronous Transmission

| Basis | Synchronous | Asynchronous |
| --- | --- | --- |
| Unit sent | Frames (blocks of bytes) | One byte (character) at a time |
| Start and stop bits | Not used | Used for each byte |
| Gaps between bytes | None | Allowed, of any length |
| Timing | Common clock between sender and receiver | Each byte is synchronized by its start bit |
| Overhead | Low | High (2 or more extra bits per byte) |
| Speed | Faster | Slower |
| Efficiency | High | Lower (for example, 80%) |
| Cost and complexity | Higher (needs clock synchronization) | Lower, simple |
| Example | Ethernet, HDLC, data transfer between computers | Keyboard, RS-232 serial port |

## Guided Media: STP, UTP, Coaxial, Optical Fiber {#guided-media-stp-utp-coaxial-optical-fiber}

### Definition of Transmission Media

A transmission medium is the **physical path through which data travels from a sender to a receiver**.

It works below the physical layer (sometimes called **layer 0**). Transmission media are of two types:

1. **Guided (wired, bounded) media** — the signal is guided along a physical conductor: **twisted-pair cable**, **coaxial cable** and **optical fibre**.
2. **Unguided (wireless, unbounded) media** — the signal travels through air or space without a conductor: **radio waves**, **microwaves** and **infrared** (see [Unguided Media](#unguided-wireless-media)).

![Twisted-pair, coaxial and optical-fibre cables](/diagrams/computer-networks/guided-media.svg)

### Guided Media

Guided media are **transmission media in which the signal travels along a physical path (a cable) from one device to another**.

Twisted-pair and coaxial cables carry signals as **electric current** in copper conductors; optical fibre carries signals as **light**.

### 1. Twisted-Pair Cable

Twisted-pair cable is a cable made of **two insulated copper conductors twisted together**; one wire carries the signal and the other is the ground reference.

The **twisting** makes noise and crosstalk affect both wires almost equally, so the receiver, which uses the difference between them, cancels most of the noise. More twists per unit length give better quality. A cable usually holds four pairs. It is used in telephone lines, DSL and Ethernet LANs, with the **RJ-45** connector (RJ-11 for telephones).

Twisted-pair cable is of two types:

1. **Unshielded twisted pair (UTP)**
2. **Shielded twisted pair (STP)**

#### Unshielded Twisted Pair (UTP)

**Unshielded twisted pair (UTP)** is a **twisted-pair cable with no metal shield** around the pairs.

It is the most common cable in LANs because it is cheap, thin, flexible and easy to install. It is more affected by external interference than STP.

UTP cables are graded into **categories** by the **TIA/EIA-568** standard; a higher category supports higher frequencies and data rates:

| Category | Bandwidth | Typical use |
| --- | --- | --- |
| Cat 1 | 0.4 MHz | Telephone and modem lines |
| Cat 2 | 4 MHz | Older terminal systems |
| Cat 3 | 16 MHz | 10 Mbps Ethernet (10BASE-T) |
| Cat 4 | 20 MHz | 16 Mbps Token Ring |
| Cat 5 | 100 MHz | 100 Mbps Fast Ethernet (100BASE-TX); replaced by Cat 5e |
| Cat 5e | 100 MHz | 1 Gbps Ethernet (1000BASE-T); common in current LANs |
| Cat 6 | 250 MHz | 1 Gbps Ethernet; 10 Gbps up to 55 m |
| Cat 6a | 500 MHz | 10 Gbps Ethernet up to 100 m |

Categories 7 (600 MHz) and 8 (2000 MHz, for 25 and 40 Gbps Ethernet over short distances) are shielded cables. The maximum length of a twisted-pair Ethernet segment is 100 m.

#### Cat 5 vs Cat 6

| Basis | Cat 5 (and Cat 5e) | Cat 6 |
| --- | --- | --- |
| Bandwidth | 100 MHz | 250 MHz |
| Ethernet speed | 100 Mbps (Cat 5); 1 Gbps (Cat 5e) | 1 Gbps; 10 Gbps up to 55 m |
| Crosstalk and noise | Higher | Lower (stricter specifications) |
| Cable | Thinner, cheaper | Thicker, more expensive |
| Maximum segment length | 100 m | 100 m |
| Compatibility | — | Backward compatible with Cat 5 and Cat 5e |

#### Shielded Twisted Pair (STP)

**Shielded twisted pair (STP)** is a **twisted-pair cable in which the pairs are covered by a metal foil or braided-mesh shield**.

The shield blocks external electromagnetic interference and crosstalk, so STP gives better quality and higher data rates than UTP. It is **bulkier, more expensive** and harder to install, and the shield must be grounded. It is used in places with heavy electrical noise, such as factories.

#### UTP vs STP

| Basis | UTP | STP |
| --- | --- | --- |
| Shield | None | Metal foil or braided mesh |
| Noise and crosstalk | More affected | Less affected |
| Cost | Cheaper | More expensive |
| Installation | Easy, thin and flexible | Harder, bulky, needs grounding |
| Data rate | Lower | Higher |
| Use | Office and home LANs, telephones | Industrial (noisy) environments |

### 2. Coaxial Cable

Coaxial cable (coax) is a cable with a **central copper conductor surrounded by an insulator, a metal braided shield (outer conductor) and a plastic jacket**, all sharing the same axis.

The outer conductor shields the inner one, so coaxial cable carries **higher-frequency signals** than twisted pair, with less interference. Its disadvantage is **attenuation** at high frequencies, which needs repeaters, and it is thicker and costlier than twisted pair.

Coaxial cables are classified by **RG (radio government) ratings**:

| Category | Impedance | Use |
| --- | --- | --- |
| RG-59 | 75 Ω | Cable TV |
| RG-58 | 50 Ω | Thin Ethernet (10BASE2) |
| RG-11 | 50 Ω | Thick Ethernet (10BASE5) |

Connectors: the **BNC** (Bayonet Neill–Concelman) connector joins the cable to a device, the **BNC T-connector** branches a cable, and the **BNC terminator** stops signal reflection at the end of a bus. Uses: cable TV, CCTV, and old bus-topology Ethernet.

### 3. Optical Fibre

Optical fibre is a **cable made of thin glass or plastic that carries data as pulses of light**.

It has three parts:

1. **Core** — the inner glass or plastic strand that carries the light.
2. **Cladding** — a layer around the core with a **lower refractive index**, which reflects the light back into the core.
3. **Jacket (buffer)** — the outer protective covering.

#### Principle of Optical Fibre

Optical fibre works on the principle of **total internal reflection**. When light travels from a denser medium (the core) to a less dense medium (the cladding) and strikes the boundary at an angle **greater than the critical angle**, all of it is reflected back into the core instead of passing into the cladding. So the light travels along the fibre, even around bends.

> **sin θc = n₂ / n₁**

Here **θc** is the critical angle (measured from the normal to the boundary), **n₁** the refractive index of the core and **n₂** the refractive index of the cladding (n₁ > n₂).

**Example:** a core has n₁ = 1.48 and the cladding has n₂ = 1.46. sin θc = 1.46 / 1.48 ≈ 0.9865, so **θc ≈ 80.6°**. Light that strikes the boundary at more than 80.6° from the normal stays in the core.

#### Propagation Modes of Optical Fibre

There are two modes of propagation, and multimode has two forms:

1. **Multimode step-index** — a thick core of uniform density; light rays travel in many paths and change direction sharply at the cladding. Rays arrive at different times, so the signal is distorted; used for short distances.
2. **Multimode graded-index** — the core density is highest at the centre and falls gradually towards the edge, so rays curve smoothly and arrive at nearly the same time; less distortion.
3. **Single-mode** — a very thin core (and a highly focused light source, a laser) lets light travel almost in a straight line along the axis; the least distortion and the highest bandwidth, used for long distances (for example, undersea cables).

![Propagation modes of light in optical fibre](/diagrams/computer-networks/fiber-modes.svg)

Light sources are **LEDs** (multimode, cheaper) and **laser diodes** (single-mode); the receiver uses a **photodiode**. Connectors: **SC** (subscriber channel), **ST** (straight tip), **MT-RJ** and **LC**.

**Advantages of optical fibre:**

1. Very **high bandwidth** and data rate.
2. **Low attenuation** — signals travel tens of kilometres without repeaters.
3. **Immune to electromagnetic interference** and crosstalk.
4. **Secure** — difficult to tap.
5. Light weight and small size.

**Disadvantages of optical fibre:**

1. Installation and maintenance need special skill.
2. Light travels in one direction, so two fibres are needed for two-way communication.
3. Cable and interfaces are more expensive.
4. Fibre is fragile and cannot be bent sharply.

### Comparison of Guided Media

| Basis | Twisted pair | Coaxial cable | Optical fibre |
| --- | --- | --- | --- |
| Signal | Electrical | Electrical | Light |
| Conductor | Two twisted copper wires | Central copper core with outer braided conductor | Glass or plastic core |
| Bandwidth | Lowest | Moderate | Highest |
| Attenuation | High | Moderate | Lowest |
| Noise immunity | Low (UTP), better (STP) | Good | Immune to EMI |
| Cost | Cheapest | Moderate | Highest |
| Installation | Easiest | Moderate | Difficult |
| Connector | RJ-45 | BNC | SC, ST, LC |
| Use | LANs, telephone | Cable TV, CCTV | Backbones, long distance, undersea |

## Unguided (Wireless) Media {#unguided-wireless-media}

### Definition of Unguided Media

Unguided media are **transmission media that carry electromagnetic waves through air, water or a vacuum without a physical conductor** (wireless communication).

Signals are sent by an **antenna** and received by another antenna. The wavelength and frequency of a wave are related by:

> **λ = c / f**

Here **λ** is the wavelength in metres, **c** the speed of light (3 × 10⁸ m/s) and **f** the frequency in hertz.

**Example:** a Wi-Fi signal of 2.4 GHz has λ = 3 × 10⁸ / 2.4 × 10⁹ = **0.125 m (12.5 cm)**; an FM radio signal of 100 MHz has λ = 3 × 10⁸ / 10⁸ = **3 m**.

### Propagation Methods

Wireless signals travel from the sender to the receiver in three ways:

1. **Ground propagation** — low-frequency waves travel close to the earth, following its curve (for example, AM radio at low frequencies).
2. **Sky propagation** — higher-frequency waves go up to the **ionosphere** and are reflected back to the earth, so they cover long distances (for example, shortwave radio).
3. **Line-of-sight propagation** — very high-frequency waves travel in a straight line from antenna to antenna; the antennas must face each other and be high enough (for example, microwave links and satellites).

### Radio Frequency Bands

| Band | Range | Propagation | Applications |
| --- | --- | --- | --- |
| VLF (very low frequency) | 3–30 kHz | Ground | Long-range radio navigation |
| LF (low frequency) | 30–300 kHz | Ground | Radio beacons, navigation |
| MF (middle frequency) | 300 kHz–3 MHz | Sky | AM radio |
| HF (high frequency) | 3–30 MHz | Sky | Shortwave, citizens band, ship and aircraft |
| VHF (very high frequency) | 30–300 MHz | Sky and line-of-sight | FM radio, VHF TV |
| UHF (ultra high frequency) | 300 MHz–3 GHz | Line-of-sight | UHF TV, mobile phones, paging |
| SHF (super high frequency) | 3–30 GHz | Line-of-sight | Satellite communication |
| EHF (extremely high frequency) | 30–300 GHz | Line-of-sight | Radar, satellite |

### Types of Unguided Media

There are three types of unguided media:

1. Radio waves
2. Microwaves
3. Infrared

#### 1. Radio Waves

Radio waves are **electromagnetic waves with frequencies from about 3 kHz to 1 GHz**, which are mostly **omnidirectional**.

An antenna sends them in all directions, so the sending and receiving antennas need not be aligned. Low and medium frequencies **penetrate walls** and travel long distances (by sky propagation). Because they spread in all directions, they suffer interference from other users of the same frequency, and the bands are regulated by government. Uses: **multicast** communication such as AM and FM radio, television, cordless phones and paging.

#### 2. Microwaves

Microwaves are **electromagnetic waves with frequencies from about 1 GHz to 300 GHz**, which are **unidirectional** and travel in a straight line.

The sending and receiving antennas (usually **parabolic dish** or horn antennas) must be **aligned (line-of-sight)**. Because of the earth's curve, towers are placed on high ground and **repeaters** are needed every few tens of kilometres. Very high frequencies **cannot penetrate walls**. Uses: **unicast** communication such as cellular phone networks, satellite links, terrestrial microwave links between towers, and wireless LANs.

#### 3. Infrared Waves

Infrared waves are **electromagnetic waves with frequencies from 300 GHz to 400 THz** (wavelengths from 1 mm to 770 nm), used for **short-range** communication.

They are line-of-sight and **cannot penetrate walls**, so an infrared system in one room does not interfere with one in the next room; this also makes them secure. They cannot be used outdoors in sunlight, because the sun's infrared rays interfere. Uses: **TV and AC remote controls**, and short-range links between devices (IrDA).

### Comparison of Unguided Media

| Basis | Radio waves | Microwaves | Infrared |
| --- | --- | --- | --- |
| Frequency | 3 kHz – 1 GHz | 1 GHz – 300 GHz | 300 GHz – 400 THz |
| Direction | Omnidirectional | Unidirectional | Unidirectional, line-of-sight |
| Antenna alignment | Not needed | Needed | Needed |
| Wall penetration | Yes | No (at high frequencies) | No |
| Range | Long | Long (with repeaters) | Very short |
| Security | Low | Medium | High (confined to a room) |
| Uses | AM/FM radio, TV, paging | Mobile phones, satellite, Wi-Fi | Remote controls |

Different references draw the band edges differently: TutorialsPoint gives radio waves as 3 Hz–300 GHz and microwaves as 300 MHz–300 GHz; the division above (radio up to 1 GHz, microwaves 1–300 GHz) follows Forouzan and GeeksforGeeks.

## Satellite Communication {#satellite-communication}

### Satellite as a Transmission Medium

**Satellite communication** is the **use of an artificial satellite in orbit as a microwave relay station between two or more ground (earth) stations**.

It is a form of unguided (microwave, line-of-sight) transmission. The full explanation — orbits, frequency bands and VSAT — is in [Satellite Communication Systems](/topics/computer-networks/telecommunication#satellite-communication-systems).

### Working of Satellite Communication

1. **Uplink** — an earth station sends a signal up to the satellite on one frequency.
2. **Transponder** — the satellite receives the signal, amplifies it and changes its frequency (so that the outgoing signal does not interfere with the incoming one).
3. **Downlink** — the satellite sends the signal back down to the receiving earth stations, over a wide area (its **footprint**).

A satellite in **geostationary orbit** (about 35 786 km above the equator) moves with the earth's rotation, so it appears fixed in the sky; three such satellites can cover almost the whole earth.

**Advantages:** very wide coverage, including remote and rural areas; the cost does not depend on distance; suitable for broadcasting. **Disadvantages:** high launch and setup cost; a long **propagation delay** (about 0.24 s for one hop up and down to a geostationary satellite); signals are affected by rain at high frequencies.

## Null Modem Configuration {#null-modem-configuration}

### DTE and DCE

1. **DTE (data terminal equipment)** — a device that is the **source or destination of digital data**, such as a computer, terminal or printer.
2. **DCE (data circuit-terminating equipment)** — a device that **sends and receives data over the network** for a DTE, converting the data into signals suitable for the link, such as a **modem**.

The **RS-232 (EIA-232)** serial standard is designed to connect a **DTE to a DCE**: the DTE sends data on its **TxD** (transmit data) pin, and the DCE receives it on the matching pin. If two DTEs are joined with an ordinary (straight-through) cable, both transmit on the same wire and both listen on the same wire, so no data is received.

### Definition of Null Modem

A null modem is a **connection (cable or adapter) that directly connects two DTEs, such as two computers, through their RS-232 serial ports without modems**, by crossing the transmit and receive lines.

The cable makes each DTE appear to be connected to a DCE, so no modem is needed when the two devices are close to each other. The RS-232 standard does not define null-modem wiring, so several wiring schemes exist.

### Null Modem Wiring (Full Handshaking)

In a null modem cable, the **output signals of one computer are connected to the input signals of the other**:

1. **TxD ↔ RxD** — the transmit data of each computer goes to the receive data of the other (DB-9 pins 3 ↔ 2; DB-25 pins 2 ↔ 3).
2. **RTS ↔ CTS** — request to send of each side goes to clear to send of the other (DB-9 pins 7 ↔ 8; DB-25 pins 4 ↔ 5).
3. **DTR → DSR and DCD** — data terminal ready of each side goes to data set ready and data carrier detect of the other (DB-9 pin 4 → pins 6 and 1; DB-25 pin 20 → pins 6 and 8).
4. **Signal ground ↔ signal ground** — not crossed (DB-9 pin 5; DB-25 pin 7).

![Null modem wiring between two computers](/diagrams/computer-networks/null-modem.svg)

### Types of Null Modem Wiring

There are four common wiring schemes:

1. **No hardware handshaking** — only TxD, RxD and ground are connected (three wires); flow control must be done by software (XON/XOFF).
2. **Loopback handshaking** — TxD/RxD crossed; the handshaking pins at each end are looped back to themselves, so each computer believes the other is always ready.
3. **Partial handshaking** — some handshaking lines are crossed and others looped back.
4. **Full handshaking** — TxD/RxD, RTS/CTS and DTR/DSR/DCD are all crossed (as above).

### Uses of Null Modem

1. Transferring files directly between two computers through their serial ports.
2. Connecting a computer to the **serial console** of a router, switch or server for configuration.
3. Early two-player games between two computers.
4. Debugging the operating system kernel of one computer from another.

## References {#references}

**TutorialsPoint**

- [Digital Transmission](https://www.tutorialspoint.com/data_communication_computer_network/digital_transmission.htm) — accessed 2026-11-06 (parallel and serial transmission; asynchronous start and stop bits; synchronous transmission). It says that in asynchronous transmission "there is no importance of timing"; timing between bytes does not matter, but timing within each byte does, as written above.
- [Transmission Media](https://www.tutorialspoint.com/data_communication_computer_network/transmission_media.htm) — accessed 2026-11-06 (UTP categories and RJ-45; coaxial RG-59, RG-58, RG-11 and BNC connectors; fibre modes and SC, ST, MT-RJ connectors). It says light "refracts at 90 degree" at the critical angle; the working principle is total internal reflection beyond the critical angle, as written above.
- [Wireless Transmission](https://www.tutorialspoint.com/data_communication_computer_network/wireless_transmission.htm) — accessed 2026-11-06 (radio frequency bands, ground and ionospheric propagation, microwave line-of-sight, infrared)
- [Difference between Simplex, Half duplex and Full Duplex Transmission Modes](https://www.tutorialspoint.com/what-is-full-duplex-mode-differentiate-between-simplex-half-duplex-and-full-duplex) — accessed 2026-11-06 (examples of the three modes)

**GeeksforGeeks**

- [Types of Transmission Media](https://www.geeksforgeeks.org/computer-networks/types-transmission-media/) — accessed 2026-11-06 (UTP, STP, coaxial cable, optical fibre; frequency ranges of radio waves, microwaves and infrared; comparison of unguided media). It lists AM broadcasting under shortwave; AM broadcasting uses the MF band, while shortwave is the HF band.
- [Difference Between Synchronous and Asynchronous Transmission](https://www.geeksforgeeks.org/computer-networks/difference-between-synchronous-and-asynchronous-transmission/) — accessed 2026-11-06 (comparison table). It states that asynchronous transmission is half-duplex and synchronous transmission is full-duplex, and that asynchronous transmission avoids synchronized clocks "as parity bit is used"; neither is correct (asynchronous serial links such as RS-232 work in full duplex, and synchronization comes from the start bit, not the parity bit), so these points are not used.
- [Difference Between DTE and DCE](https://www.geeksforgeeks.org/computer-networks/difference-between-dte-and-dce/) and [RS232C for Data Transfer](https://www.geeksforgeeks.org/computer-networks/rs232c-for-data-transfer/) — accessed 2026-11-06 (DTE and DCE, TxD and RxD lines). The DTE page expands DTE as "Data Termination Equipment"; the standard name is data terminal equipment. GeeksforGeeks has no null modem page (its null-modem URL returns 404).

**TpointTech**

- [Transmission Modes](https://www.tpointtech.com/computer-network-transmission-modes) and [Types of Transmission](https://www.tpointtech.com/types-of-transmission) — accessed 2026-11-06 (simplex, half-duplex and full-duplex with examples). These pages give unsupported claims such as full-duplex using "double" bandwidth; they are not used.
- [Transmission Media](https://www.tpointtech.com/transmission-media), [Guided Transmission Media](https://www.tpointtech.com/guided-transmission-media) and [Unguided Transmission Media](https://www.tpointtech.com/unguided-transmission-media) — accessed 2026-11-06 (guided and unguided media, STP and UTP, coaxial cable, fibre, radio, microwave, infrared, satellite). Issues found: it gives Cat 5 as 200 Mbps (Cat 5 is a 100 MHz cable used for 100 Mbps Ethernet), says optical fibre "uses electrical signals" (it carries light), and gives the radio-wave range as "3 kHz to 1 kHz". The values above follow TutorialsPoint, GeeksforGeeks and Forouzan.

**Programiz**

- Programiz has no page on transmission modes or media (checked 2026-11-06).

**Additional sources** (used because the reference websites have no null modem page, and do not give the efficiency of asynchronous transmission, the critical-angle formula, the radio-band propagation table, the coaxial impedances or the wavelength formula)

- Wikipedia, [Null modem](https://en.wikipedia.org/wiki/Null_modem) — accessed 2026-11-06 (definition, wiring types, DB-9 and DB-25 pin connections, uses)
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapters 4 and 7 (transmission modes, guided and unguided media, radio bands, RG ratings, propagation modes of fibre). The expansion of "RG" differs between sources (radio government in Forouzan and TutorialsPoint, radio guide elsewhere).
- Wikipedia, [Twisted pair](https://en.wikipedia.org/wiki/Twisted_pair), [Category 5 cable](https://en.wikipedia.org/wiki/Category_5_cable) and [Category 6 cable](https://en.wikipedia.org/wiki/Category_6_cable) — accessed 2026-11-06 (bandwidth and use of each cable category; the reference websites give data rates for some categories that disagree with each other). All worked examples above were checked by calculation.
