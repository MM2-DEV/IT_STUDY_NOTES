---
description: Multiplexing - multiplexer and demultiplexer, the types of multiplexing, frequency-division multiplexing with guard bands, synchronous time-division multiplexing with the T-1 and E-1 lines, and statistical (asynchronous) TDM, with formulas and worked examples.
updated: 2026-11-06
---

## FDM, TDM, Statistical TDM {#fdm-tdm-statistical-tdm}

### Definition of Multiplexing

Multiplexing is the **technique of sending several signals at the same time over a single communication link**, by dividing the capacity (bandwidth) of the link among them.

It is used when the bandwidth of the link is greater than the bandwidth needed by each device, so that one expensive link can be shared.

1. A **multiplexer (MUX)** combines the n input lines into one stream on the link (**many-to-one**).
2. A **demultiplexer (DEMUX)** at the other end separates the stream back into its n components and sends each to its output line (**one-to-many**).

### Advantages of Multiplexing

1. Several signals share a single medium, so fewer links are needed and costs fall.
2. The bandwidth of the link is used efficiently.

### Types of Multiplexing

There are three basic types of multiplexing:

1. **Frequency-division multiplexing (FDM)** — an analog technique; the bandwidth of the link is divided into frequency bands.
2. **Wavelength-division multiplexing (WDM)** — an analog technique for optical fibre; FDM using light of different wavelengths.
3. **Time-division multiplexing (TDM)** — a digital technique; the time of the link is divided into slots. It has two forms:
   1. **Synchronous TDM**
   2. **Statistical (asynchronous) TDM**

### Frequency-Division Multiplexing (FDM)

Frequency-division multiplexing is an **analog multiplexing technique in which the bandwidth of the link is divided into separate, non-overlapping frequency bands (channels), and each signal is sent in its own band at the same time**.

![FDM: modulated signals in separate frequency channels separated by guard bands](/diagrams/computer-networks/fdm.svg)

**Working:**

1. Each input signal **modulates a different carrier frequency** (f₁, f₂, f₃, …).
2. The modulated signals are **combined** by the multiplexer into one composite signal and sent over the link.
3. At the receiver, **band-pass filters** separate the composite signal into its channels, and each is demodulated.

Adjacent channels are separated by **guard bands** — strips of unused frequencies that prevent the signals from overlapping and interfering (crosstalk).

> **Bandwidth of the link ≥ n × B + (n − 1) × G**

Here **n** is the number of channels, **B** the bandwidth of each channel and **G** the width of each guard band.

**Example 1:** four channels of 150 kHz each are multiplexed with 10 kHz guard bands. Link bandwidth = 4 × 150 + 3 × 10 = **630 kHz**.

**Example 2:** five channels of 100 kHz each with 10 kHz guard bands need 5 × 100 + 4 × 10 = **540 kHz**.

**Applications:** AM and FM radio broadcasting, broadcast and cable television, the first generation of mobile phones (each user a separate frequency), and analog telephone carrier systems. **OFDM** (orthogonal FDM), used in Wi-Fi and 4G, packs many closely spaced subcarriers without guard bands.

**Advantages:** simple; all signals are sent at the same time; no synchronization is needed between sender and receiver.

**Disadvantages:** crosstalk between channels; many modulators and filters are needed; bandwidth is wasted in guard bands.

### Wavelength-Division Multiplexing (WDM)

**Wavelength-division multiplexing (WDM)** is an **analog multiplexing technique for optical fibre in which several light signals of different wavelengths (colours) are sent through one fibre at the same time**.

It is FDM applied to light: the signals are combined and separated, for example by a prism. It is used to raise the capacity of fibre-optic backbones.

### Time-Division Multiplexing (TDM)

Time-division multiplexing is a **digital multiplexing technique in which the whole bandwidth of the link is given to each input in turn for a short time slot**, so that the data of several inputs is interleaved in time.

In FDM all signals are sent at the same time in different frequencies; in TDM they are sent at different times using the full bandwidth. TDM is mainly used for digital signals (analog signals are first converted, for example by PCM).

### Synchronous TDM

Synchronous TDM is a **TDM technique in which each input has a fixed, pre-assigned time slot in every frame, whether or not it has data to send**.

![Synchronous and statistical TDM frames](/diagrams/computer-networks/tdm-frames.svg)

**Working:**

1. The multiplexer takes one data unit (a bit, a byte or a block) from each input in a fixed round-robin order — **interleaving**, like a rotating switch.
2. The slots of one round form a **frame**; with n inputs, each frame has (at least) **n slots**.
3. The demultiplexer, synchronized with the multiplexer, sends each slot to its output in the same order. **Framing bits** are added to each frame to keep the two in step.

If an input has no data, its slot is sent **empty**, so link capacity is wasted.

> **Data rate of the link = n × data rate of each input** (plus any framing bits)

> **Slot duration = T / n** and **frame duration = T**

Here **n** is the number of inputs and **T** the duration of one data unit at an input.

**Example:** four inputs, each at 1 kbps, are multiplexed 1 bit at a time.

1. Each input bit lasts T = 1 / 1000 s = **1 ms**, so each frame lasts **1 ms** (1000 frames per second).
2. Each slot (output bit) lasts 1 ms / 4 = **0.25 ms**.
3. The link data rate = 4 × 1 kbps = **4 kbps**.

### Digital Hierarchy: T-1 and E-1 Lines

Telephone networks use synchronous TDM to carry many digital voice channels (each **64 kbps** = 8000 samples per second × 8 bits; see [PCM](/topics/computer-networks/modulation-techniques#pcm-ppm-pam)).

1. **T-1 line** (North America): **24** voice channels × 8 bits + **1** framing bit = **193 bits** per frame; 8000 frames per second, so the rate is 193 × 8000 = **1.544 Mbps**.
2. **E-1 line** (Europe and most other countries outside North America and Japan): **32** channels (30 for voice, 2 for signalling and framing) × 8 bits = 256 bits per frame; 256 × 8000 = **2.048 Mbps**.

### Statistical TDM

Statistical TDM (also called **asynchronous TDM** or **intelligent TDM**) is a **TDM technique in which time slots are given only to inputs that have data to send**, so that no slot is wasted.

**Working:**

1. The multiplexer checks each input in turn and puts data into the next free slot only if the input has data; idle inputs are skipped.
2. Because a slot no longer belongs to a fixed input, each slot must carry an **address** that identifies its source (and destination).
3. A frame has **fewer slots than inputs** (m slots for n inputs, m < n), and the link can have a lower capacity than the sum of the input rates, because not all inputs are active at the same time. Inputs keep **buffers** for data waiting for a slot.

> **Address bits per slot = log₂ n** (rounded up)

**Example:** a statistical multiplexer has **8** inputs and sends 8 bits of data in each slot. Each slot needs log₂ 8 = **3** address bits, so a slot has 8 + 3 = 11 bits, and only 8 / 11 ≈ **72.7%** of the bits carry data. This overhead is the price paid for not sending empty slots.

### Synchronous TDM vs Statistical TDM

| Basis | Synchronous TDM | Statistical TDM |
| --- | --- | --- |
| Slot allocation | Fixed; one slot per input in every frame | Dynamic; only to inputs with data |
| Empty slots | Sent, wasting capacity | Not sent |
| Slots per frame | n (one per input) | m, with m < n |
| Addressing | Not needed (position identifies the input) | Each slot carries an address |
| Link capacity | Equal to the sum of the input rates | Can be less than the sum of the input rates |
| Buffering | Not needed | Needed |
| Synchronization | Framing bits at the start of each frame | Not needed for slot positions |
| Delay | Fixed and predictable | Variable (data may wait in buffers) |
| Suitable for | Steady traffic (telephone voice, T-1, E-1) | Bursty traffic (computer data) |

### FDM vs TDM

| Basis | FDM | TDM |
| --- | --- | --- |
| Shared resource | Frequency (bandwidth) | Time |
| Signal type | Analog | Mainly digital |
| Transmission | All signals at the same time, in different bands | Signals one after another, in different time slots |
| Separation | Guard bands | Synchronization (framing bits) or addresses |
| Interference | Crosstalk between channels | Little crosstalk |
| Hardware | Modulators and filters for each channel | Simpler: a commutator (switch) and clock |
| Efficiency | Bandwidth lost in guard bands | Synchronous TDM wastes empty slots |
| Examples | Radio, TV, analog telephone carriers | T-1 and E-1 lines, digital telephone networks, GSM |

## References {#references}

**TutorialsPoint**

- [Multiplexing](https://www.tutorialspoint.com/data_communication_computer_network/physical_layer_multiplexing.htm), [Frequency Division Multiplexing](https://www.tutorialspoint.com/data_communication_computer_network/frequency_division_multiplexing.htm), [Time Division Multiplexing](https://www.tutorialspoint.com/data_communication_computer_network/time_division_multiplexing.htm), [Synchronous TDM](https://www.tutorialspoint.com/data_communication_computer_network/synchronous_tdm.htm), [Asynchronous TDM](https://www.tutorialspoint.com/data_communication_computer_network/asynchronous_tdm.htm), [Synchronous vs Asynchronous TDM](https://www.tutorialspoint.com/data_communication_computer_network/synchronous_vs_asynchronous_tdm.htm) and [Difference between TDM and FDM](https://www.tutorialspoint.com/data_communication_computer_network/difference_between_tdm_and_fdm.htm) — accessed 2026-11-06 (MUX and DEMUX; FDM with guard bands and the 630 kHz example; OFDM; WDM; synchronous TDM and interleaving; statistical TDM with addresses and m < n slots; comparisons). Issues found: the TDM page expands SONET as "Asynchronous Optical Network" and STM as "Synchronous Transfer Node" (they are Synchronous Optical Network and Synchronous Transfer Mode), and gives a television serial followed by advertisements as an example of TDM, which is not multiplexing; the synchronous-vs-asynchronous TDM page describes start and stop bits, which belong to asynchronous *transmission*, not asynchronous TDM.

**GeeksforGeeks**

- [Difference between Synchronous TDM and Asynchronous TDM](https://www.geeksforgeeks.org/difference-between-synchronous-tdm-and-asynchronous-tdm/) — accessed 2026-11-06 (advantages and disadvantages of both, suitability for steady and bursty traffic). Its multiplexing overview URL returns 404.

**TpointTech**

- [Multiplexing in Computer Network](https://www.tpointtech.com/multiplexing-in-computer-network) — accessed 2026-11-06 (MUX and DEMUX, FDM, WDM with a prism, synchronous and asynchronous TDM, T-1). It lists "FDM is used only when low-speed channels are required" as a disadvantage, which is not a general limitation of FDM, and it is not used.

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — checked 2026-11-06; it has no item on multiplexing.

**Programiz**

- Programiz has no page on multiplexing (checked 2026-11-06).

**Additional source** (used because the reference websites do not give the synchronous TDM rate and slot formulas, the 540 kHz example, the T-1 frame of 193 bits, the E-1 rate or the address overhead of statistical TDM)

- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapter 6 (FDM, WDM, synchronous and statistical TDM, the digital signal hierarchy, T and E lines). All calculations above were checked by script.
