---
description: Data transmission basics - data communication and its components, analog and digital data and signals, bit rate and baud rate, channel capacity (Nyquist and Shannon), bandwidth and frequency spectrum, baseband and broadband, and transmission impairments with worked examples.
updated: 2026-11-06
---

## Data Communication {#data-communication}

### Definition of Data Communication

Data communication is the **exchange of data between two devices through a transmission medium**, such as a cable or radio waves.

The devices must be part of a communication system made of hardware and software. The word *data* means information in any agreed form: text, numbers, images, audio or video.

### Components of Data Communication

A data communication system has five components:

1. **Message** — the information (data) to be sent: text, numbers, pictures, audio or video.
2. **Sender** — the device that sends the message, such as a computer, phone or camera.
3. **Receiver** — the device that receives the message.
4. **Transmission medium** — the physical path along which the message travels from sender to receiver, such as twisted-pair cable, coaxial cable, optical fibre or radio waves.
5. **Protocol** — the set of rules that governs the communication. Two devices can be connected but cannot communicate without a protocol that both of them understand.

### Characteristics of Data Communication

The effectiveness of a data communication system depends on four characteristics:

1. **Delivery** — data must reach the correct destination (the intended receiver only).
2. **Accuracy** — data must be delivered without errors; altered data is unusable.
3. **Timeliness** — data must be delivered on time; late audio or video is useless (**real-time** transmission).
4. **Jitter** — the variation in packet arrival time; it must be small, otherwise audio and video quality is uneven.

### Data Flow

Data can flow between two devices in three ways (described fully in [Transmission Modes and Media](/topics/computer-networks/transmission-modes-and-media#transmission-modes-and-transmission-systems)):

1. **Simplex** — in one direction only (for example, keyboard to computer).
2. **Half-duplex** — in both directions, but one direction at a time (for example, a walkie-talkie).
3. **Full-duplex** — in both directions at the same time (for example, a telephone call).

## Analog and Digital Data {#analog-and-digital-data}

### Analog Data and Digital Data

1. **Analog data** is data that takes **continuous values**, such as the sound of a human voice or the temperature of a room.
2. **Digital data** is data that takes **discrete values**, such as text and numbers stored in a computer as 0s and 1s.

To be transmitted, data must be converted into **signals** (electromagnetic or light energy). Both data and signals can be analog or digital.

![An analog signal and a digital signal](/diagrams/computer-networks/analog-digital-signals.svg)

### Analog Signal

An analog signal is a **continuous wave that can have an infinite number of values in a range** and changes smoothly over time.

The simplest analog signal is a **sine wave**. A **periodic** signal repeats a pattern in each period; an **aperiodic** (non-periodic) signal has no repeating pattern. Data communication usually uses periodic analog signals and aperiodic digital signals.

### Parameters of a Sine Wave

A sine wave is described by three parameters:

1. **Peak amplitude (A)** — the highest strength (intensity) of the signal, measured in **volts** for an electric signal.
2. **Frequency (f)** — the number of cycles (periods) per second, measured in **hertz (Hz)**.
3. **Phase** — the position of the waveform relative to time 0, measured in **degrees or radians** (for example, 0°, 90°, 180°).

The **period (T)** is the time, in seconds, needed to complete one cycle. Period and frequency are inverses of each other:

> **f = 1 / T** and **T = 1 / f**

Here **f** is the frequency in hertz (Hz) and **T** is the period in seconds (s).

![Peak amplitude, period and frequency of a sine wave](/diagrams/computer-networks/sine-wave-parameters.svg)

**Example 1:** a signal has a period of 1 ms. Its frequency is f = 1 / 0.001 s = **1000 Hz (1 kHz)**.

**Example 2:** a signal has a frequency of 10 kHz. Its period is T = 1 / 10 000 = 0.0001 s = **0.1 ms (100 µs)**.

A signal that changes quickly has a **high frequency**; a signal that does not change at all has a frequency of **0** (and an infinite period).

### Digital Signal

A digital signal is a **signal that has only a limited number of defined values (levels)**, usually two: one for bit 1 (for example, a positive voltage) and one for bit 0 (for example, zero voltage).

A digital signal can also have **more than two levels**, so that each level carries more than one bit (see [Data Rate and Baud Rate](#data-rate-and-baud-rate)). Most digital signals are aperiodic, so they are described by **bit rate** and **bit interval** instead of frequency and period.

### Analog Signal vs Digital Signal

| Basis | Analog signal | Digital signal |
| --- | --- | --- |
| Nature | Continuous wave | Discrete (square) wave |
| Values | Infinite number of values in a range | Limited number of values (usually 0 and 1) |
| Described by | Amplitude, frequency, period, phase | Bit rate and bit interval |
| Effect of noise | Easily affected; noise cannot be removed fully | Less affected; signal can be regenerated |
| Accuracy | Lower | Higher |
| Bandwidth needed | Less | More |
| Power use | More | Less |
| Examples | Human voice, analog radio and TV, thermometer readings | Computer data, digital phones, CDs, DVDs |

### Conversions Between Data and Signals

Data of either kind can be sent with signals of either kind:

1. **Digital data → digital signal** — line coding (for example, NRZ, Manchester); see [Data Encoding](/topics/computer-networks/data-encoding).
2. **Analog data → digital signal** — sampling and quantization (for example, PCM).
3. **Digital data → analog signal** — digital modulation (ASK, FSK, PSK, QAM).
4. **Analog data → analog signal** — analog modulation (AM, FM, PM).

Items 2–4 are described in [Modulation Techniques](/topics/computer-networks/modulation-techniques).

## Data Rate and Baud Rate {#data-rate-and-baud-rate}

### Bit Rate (Data Rate)

Bit rate (data rate) is the **number of bits sent in one second**, measured in **bits per second (bps)**.

Larger units are kbps (10³ bps), Mbps (10⁶ bps) and Gbps (10⁹ bps). The **bit interval** (bit duration) is the time needed to send one bit:

> **Bit interval = 1 / bit rate**

**Example:** at a bit rate of 4000 bps, the bit interval is 1 / 4000 = 0.00025 s = **0.25 ms**.

### Baud Rate (Signal Rate)

Baud rate is the **number of signal elements (symbols) sent in one second**, measured in **baud**.

It is also called the **signal rate**, **modulation rate** or **pulse rate**. A **signal element** is the shortest unit of a signal that has a constant value (one level or one waveform). The bandwidth that a signal needs depends on its baud rate, not directly on its bit rate.

### Relationship Between Bit Rate and Baud Rate

If a signal has **L** different levels (or symbols), each signal element can carry **r** bits:

> **r = log₂ L**

> **Bit rate (N) = Baud rate (S) × r**, so **S = N / r**

Here:

1. **N** — the bit rate, in bits per second (bps).
2. **S** — the baud rate, in signal elements (baud) per second.
3. **r** — the number of bits carried by one signal element.
4. **L** — the number of signal levels (different signal elements).

Therefore bit rate = baud rate only when each signal element carries **one bit** (two levels). With more levels, the bit rate is **higher** than the baud rate.

![Bit rate and baud rate with a four-level signal](/diagrams/computer-networks/bit-rate-baud-rate.svg)

**Example 1:** a signal sends 1000 signal elements per second and each element carries 4 bits. Bit rate = 1000 × 4 = **4000 bps**.

**Example 2:** a signal carries 3 bits per element and the bit rate is 12 000 bps. Baud rate = 12 000 / 3 = **4000 baud**.

**Example 3:** a signal with **16 levels** carries data at 8000 bps. Then r = log₂ 16 = 4 bits per element, and baud rate = 8000 / 4 = **2000 baud**.

### Bit Rate vs Baud Rate

| Basis | Bit rate | Baud rate |
| --- | --- | --- |
| Meaning | Number of bits sent per second | Number of signal elements (symbols) sent per second |
| Unit | bps | baud |
| Formula | Bit rate = baud rate × bits per element | Baud rate = bit rate ÷ bits per element |
| Concerned with | Computer efficiency (amount of data) | Data transmission (signal changes on the line) |
| Determines | How fast data is delivered | The bandwidth the signal needs |
| Value | Equal to or greater than baud rate (with more than two levels) | Equal to or less than bit rate (with more than two levels) |

## Channel Capacity {#channel-capacity}

### Definition of Channel Capacity

Channel capacity is the **maximum data rate (in bps) at which data can be sent over a channel** without errors.

How fast data can be sent depends on three factors:

1. The **bandwidth** of the channel.
2. The **number of signal levels** used.
3. The **quality of the channel** (the level of noise).

Two formulas give the maximum rate: **Nyquist** for a noiseless channel and **Shannon** for a noisy channel.

### Nyquist Bit Rate (Noiseless Channel)

For a **noiseless channel**, the Nyquist formula gives the theoretical maximum bit rate:

> **Bit rate = 2 × B × log₂ L**

Here:

1. **Bit rate** — the maximum bit rate, in bps.
2. **B** — the bandwidth of the channel, in Hz.
3. **L** — the number of signal levels used to represent the data.

More levels give a higher bit rate in theory, but the receiver must then distinguish between levels that are closer together, which makes errors more likely in practice.

**Example 1:** a noiseless channel with a bandwidth of 3000 Hz uses a signal with **2 levels**. Bit rate = 2 × 3000 × log₂ 2 = 2 × 3000 × 1 = **6000 bps**.

**Example 2:** the same channel uses **4 levels**. Bit rate = 2 × 3000 × log₂ 4 = 2 × 3000 × 2 = **12 000 bps**.

**Example 3:** 265 kbps must be sent over a noiseless channel with a bandwidth of 20 kHz. How many levels are needed?

1. 265 000 = 2 × 20 000 × log₂ L
2. log₂ L = 265 000 / 40 000 = 6.625
3. L = 2^6.625 ≈ **98.7 levels**

Since the number of levels should be a power of 2, either 128 levels are used (giving 280 kbps) or 64 levels (giving 240 kbps, less than required).

### Shannon Capacity (Noisy Channel)

A real channel is always noisy. For a **noisy channel**, the Shannon formula gives the highest data rate that can be achieved:

> **C = B × log₂(1 + SNR)**

Here:

1. **C** — the capacity of the channel, in bps.
2. **B** — the bandwidth of the channel, in Hz.
3. **SNR** — the **signal-to-noise ratio**, the ratio of the average signal power to the average noise power (a plain ratio, not in decibels).

The capacity depends only on the channel (bandwidth and noise), not on the number of signal levels. No method can send data faster than C over that channel. Because the formula has a logarithm, doubling the SNR does not double the capacity.

### Signal-to-Noise Ratio in Decibels

SNR is often given in **decibels (dB)**:

> **SNR(dB) = 10 log₁₀ SNR**, so **SNR = 10^(SNR(dB) / 10)**

**Example:** an SNR of 1000 is 10 log₁₀ 1000 = **30 dB**; an SNR of 36 dB is 10^3.6 ≈ **3981**.

### Worked Examples of Shannon Capacity

**Example 1 (no signal):** if the SNR is 0 (the noise is so strong that the signal is lost), C = B × log₂(1 + 0) = B × 0 = **0 bps**: no data can be sent, whatever the bandwidth.

**Example 2 (telephone line):** a telephone line has a bandwidth of 3000 Hz and an SNR of 3162 (about 35 dB).

1. C = 3000 × log₂(1 + 3162) = 3000 × log₂ 3163
2. log₂ 3163 ≈ 11.63
3. C ≈ 3000 × 11.63 ≈ **34 881 bps ≈ 34.9 kbps**

This is the upper limit of a telephone line; to send faster, the bandwidth or the SNR must be increased.

**Example 3 (SNR in dB):** a channel has a bandwidth of 2 MHz and an SNR of 36 dB.

1. SNR = 10^3.6 ≈ 3981
2. C = 2 000 000 × log₂(1 + 3981) ≈ 2 000 000 × 11.96
3. C ≈ **23.9 Mbps**

### Using Both Formulas Together

Shannon gives the **upper limit**; Nyquist gives the **number of signal levels** needed for a chosen rate.

**Example:** a channel has a bandwidth of 1 MHz and an SNR of 63.

1. **Shannon:** C = 1 000 000 × log₂(1 + 63) = 1 000 000 × log₂ 64 = 1 000 000 × 6 = **6 Mbps** (upper limit).
2. For better performance a lower rate is chosen, for example **4 Mbps**.
3. **Nyquist:** 4 000 000 = 2 × 1 000 000 × log₂ L, so log₂ L = 2 and **L = 4 signal levels**.

### Nyquist vs Shannon

| Basis | Nyquist bit rate | Shannon capacity |
| --- | --- | --- |
| Channel | Noiseless (ideal) | Noisy (real) |
| Formula | Bit rate = 2B log₂ L | C = B log₂(1 + SNR) |
| Depends on | Bandwidth and number of signal levels | Bandwidth and signal-to-noise ratio |
| Gives | Maximum bit rate for a given number of levels | Absolute upper limit for the channel |

## Bandwidth and Frequency Spectrum {#bandwidth-and-frequency-spectrum}

### Time Domain and Frequency Domain

A signal can be shown in two ways:

1. **Time-domain plot** — shows the amplitude of the signal against **time**.
2. **Frequency-domain plot** — shows the peak amplitude of each frequency component against **frequency**.

A **simple** periodic signal is a single sine wave and has one frequency. A **composite** signal is made of many sine waves of different frequencies, amplitudes and phases (by Fourier analysis). Data signals are composite signals.

### Frequency Spectrum

**Frequency spectrum** is the **set of all the frequencies (sine-wave components) that a signal contains**.

### Bandwidth

**Bandwidth** is the **range of frequencies that a composite signal contains: the difference between its highest and lowest frequencies**, measured in hertz (Hz).

> **B = f_high − f_low**

Here **B** is the bandwidth, **f_high** the highest frequency and **f_low** the lowest frequency of the signal, all in Hz.

**Example 1:** a signal contains frequencies from 1000 Hz to 5000 Hz. Bandwidth = 5000 − 1000 = **4000 Hz**.

**Example 2:** a periodic signal is made of five sine waves with frequencies 100, 300, 500, 700 and 900 Hz. Bandwidth = 900 − 100 = **800 Hz**; its spectrum has five spikes, at 100, 300, 500, 700 and 900 Hz.

The bandwidth of a **channel (medium)** is the range of frequencies it can pass. A signal can be sent through a channel without serious loss only if the channel's bandwidth covers the signal's bandwidth. A channel whose frequencies start at 0 is a **low-pass channel**; one whose frequencies do not start at 0 is a **band-pass channel**.

### Two Meanings of Bandwidth

1. **Bandwidth in hertz** — the range of frequencies of a signal or channel (as above).
2. **Bandwidth in bits per second** — the number of bits per second a channel or link can carry (for example, "a 100 Mbps Ethernet link").

The two are related: a larger bandwidth in hertz allows a higher bit rate (see [Channel Capacity](#channel-capacity)).

## Baseband and Broadband {#baseband-and-broadband}

### Baseband Transmission

Baseband transmission is the **sending of a digital signal over a channel without changing it into an analog signal**, so that a single signal uses the whole bandwidth of the channel.

It needs a **low-pass channel** (frequencies starting at 0). Only one device can send at a time; several users share the channel by **time-division multiplexing (TDM)**. The signal is encoded with a line code such as **Manchester**. Example: Ethernet LANs — the word **BASE** in names such as **10BASE-T** and **100BASE-TX** means baseband.

### Broadband Transmission

Broadband transmission is the **sending of data as analog signals modulated onto carrier frequencies**, so that a channel can carry many signals at once in separate frequency bands.

It uses a **band-pass channel**. The bandwidth is divided into channels by **frequency-division multiplexing (FDM)**, and digital data is modulated with methods such as ASK, FSK, PSK or QAM. Examples: cable television, cable Internet and DSL. In everyday use, "broadband" also means any high-speed Internet connection.

![Baseband and broadband transmission](/diagrams/computer-networks/baseband-broadband.svg)

### Baseband vs Broadband

| Basis | Baseband | Broadband |
| --- | --- | --- |
| Signal | Digital, sent without modulation | Analog, modulated onto carriers |
| Use of bandwidth | One signal uses the whole bandwidth | Bandwidth divided into many channels |
| Channels | Single channel | Many channels at the same time |
| Multiplexing | Time-division (TDM) | Frequency-division (FDM) |
| Channel type | Low-pass | Band-pass |
| Encoding | Line coding (for example, Manchester) | Modulation (ASK, FSK, PSK, QAM) |
| Direction | Bidirectional on the same channel | Two-way traffic uses separate frequency channels |
| Distance | Short; repeaters regenerate the signal | Long; amplifiers boost the signal |
| Cost and installation | Cheap and simple | Costly and more complex |
| Examples | Ethernet LAN (10BASE-T) | Cable TV, cable Internet, DSL |

## Transmission Impairments {#transmission-impairments}

### Definition of Transmission Impairment

Transmission impairment is the **difference between the signal sent and the signal received**, caused by imperfections in the transmission medium.

The signal at the end of the medium is not the same as the signal at its start. For analog signals this lowers quality; for digital signals it causes **bit errors**.

### Causes of Transmission Impairment

There are three causes of transmission impairment:

1. Attenuation
2. Distortion
3. Noise

![Attenuation, distortion and noise](/diagrams/computer-networks/transmission-impairments.svg)

### 1. Attenuation

Attenuation is the **loss of energy (strength) of a signal as it travels through a medium**.

Part of the signal's energy is turned into heat by the resistance of the medium, so the signal becomes weaker with distance. To compensate, **amplifiers** (for analog signals) or **repeaters** (for digital signals) are placed along the path.

Attenuation and amplification are measured in **decibels (dB)**:

> **dB = 10 log₁₀ (P₂ / P₁)**

Here **P₁** is the power of the signal at the first point and **P₂** its power at the second point (in watts or milliwatts). A **negative** value means the signal is attenuated; a **positive** value means it is amplified. When voltages are measured instead of power, **dB = 20 log₁₀ (V₂ / V₁)**, because power is proportional to the square of the voltage.

**Example 1:** a signal loses half its power (P₂ = 0.5 P₁). Attenuation = 10 log₁₀ 0.5 ≈ **−3 dB**.

**Example 2:** an amplifier increases the power 10 times (P₂ = 10 P₁). Gain = 10 log₁₀ 10 = **+10 dB**.

**Example 3:** the voltage of a signal falls to half (V₂ = 0.5 V₁). Attenuation = 20 log₁₀ 0.5 ≈ **−6 dB**.

**Example 4 (adding decibels):** a signal is attenuated by 3 dB, amplified by 7 dB and attenuated again by 3 dB. Because decibels are logarithmic, they are simply added: −3 + 7 − 3 = **+1 dB** in total.

**Example 5 (loss per kilometre):** a cable has a loss of −0.3 dB/km, and a signal of 2 mW enters it. After 5 km, the loss is 5 × (−0.3) = −1.5 dB, so P₂ = 2 × 10^(−1.5/10) = 2 × 10^(−0.15) ≈ **1.42 mW**.

### 2. Distortion

Distortion is the **change in the form (shape) of a signal** as it travels through a medium.

It occurs in **composite signals**, made of several frequencies. Each frequency component travels at its own speed through the medium, so the components reach the receiver at slightly different times (out of phase), and the received signal has a different shape. This is called **delay distortion**. In digital signals, the components of one bit can overlap the next bit (**dispersion**), causing bit errors.

### 3. Noise

Noise is **any unwanted signal that is added to the signal** between the sender and the receiver.

Types of noise:

1. **Thermal noise** — caused by the random motion of electrons in a conductor; it is present in all devices and media and cannot be removed.
2. **Intermodulation noise** — caused when signals of different frequencies share a medium and produce unwanted signals at the sum or difference of their frequencies.
3. **Induced noise** — caused by sources such as motors and electrical appliances, which act as transmitting antennas.
4. **Crosstalk** — the effect of one wire (or channel) on another; one wire acts as a sending antenna and the other as a receiving antenna (for example, hearing another conversation on a telephone line).
5. **Impulse noise** — a short spike of high energy, caused by lightning, power lines or switching; it mostly damages digital data.

The effect of noise is measured by the **signal-to-noise ratio** (see [Channel Capacity](#signal-to-noise-ratio-in-decibels)):

> **SNR = average signal power / average noise power**

A **high SNR** means the signal is little affected by noise (good quality); a **low SNR** means the signal is badly corrupted by noise.

## References {#references}

**GeeksforGeeks**

- [Data Communication: Definition, Components, Types, Channels](https://www.geeksforgeeks.org/computer-networks/data-communication-definition-components-types-channels/) — accessed 2026-11-06 (five components, data flow modes)
- [Difference between Analog and Digital Signal](https://www.geeksforgeeks.org/computer-networks/difference-between-analog-and-digital-signal/) — accessed 2026-11-06 (comparison table)
- [Difference Between Bit Rate and Baud Rate](https://www.geeksforgeeks.org/computer-networks/difference-btween-bit-rate-and-baud-rate/) — accessed 2026-11-06 (definitions, formulas, examples 1 and 2, comparison table). It says a higher "modulation index" raises the bit rate; the correct idea is more bits per signal element (higher-order modulation), as written above.
- [Maximum Data Rate (channel capacity) for Noiseless and Noisy channels](https://www.geeksforgeeks.org/computer-networks/maximum-data-rate-channel-capacity-for-noiseless-and-noisy-channels/) — accessed 2026-11-06 (Nyquist and Shannon formulas, SNR in dB, the 6000 bps, 98.7-level, 3162-SNR and 36 dB examples). Issues found and corrected: it writes "L = 26.625" for 2^6.625; it gives the result of the 36 dB example as "24 MHz" instead of about 24 Mbps; and it states that capacity is "directly proportional to the power of the signal", whereas capacity grows only logarithmically with the SNR. Its telephone-line result (34 860 bps) uses a rounded logarithm; the calculated value is about 34 881 bps.

**TutorialsPoint**

- [Physical Layer Introduction](https://www.tutorialspoint.com/data_communication_computer_network/physical_layer_introduction.htm), [Analog Transmission](https://www.tutorialspoint.com/data_communication_computer_network/analog_transmission.htm), [Digital Transmission](https://www.tutorialspoint.com/data_communication_computer_network/digital_transmission.htm) and [Transmission Impairments](https://www.tutorialspoint.com/data_communication_computer_network/transmission_impairments.htm) — accessed 2026-11-06 (factors of channel capacity, conversions between data and signals, attenuation, dispersion, delay distortion, and thermal, intermodulation, crosstalk and impulse noise). It uses "channel capacity" and "data rate" as the same thing; capacity is the maximum possible rate, as defined above. It also says noise is "the major factor for the transmission distortion"; noise and distortion are separate impairments.

**TpointTech**

- [Difference between Baseband and Broadband Transmission](https://www.tpointtech.com/baseband-vs-broadband-transmission) — accessed 2026-11-06 (baseband vs broadband: signal type, TDM vs FDM, encoding, distance, cost, examples). It calls broadband transmission unidirectional; two-way broadband systems (such as DSL and cable Internet) use separate frequency channels for each direction, as written above.
- [Digital Transmission](https://www.tpointtech.com/computer-network-digital-transmission) — accessed 2026-11-06 (no formulas for bit rate, baud rate or channel capacity)

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — checked 2026-11-06; it has no item on these subtopics (it mentions analog and digital signals only in its answer on the modem).

**Programiz**

- Programiz has no page on data transmission (checked 2026-11-06).

**Additional source** (used because the reference websites do not give the sine-wave parameters, the relation r = log₂ L and S = N / r, the combined Shannon–Nyquist example, the bandwidth examples, the decibel formulas for attenuation, the four characteristics of data communication, or induced noise)

- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapters 1 and 3 (data communication components and characteristics; periodic analog signals; bandwidth; transmission impairment; data rate limits). All worked examples above were checked by calculation.
