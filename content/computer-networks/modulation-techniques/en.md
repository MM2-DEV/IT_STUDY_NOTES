---
description: Modulation techniques - modulation and demodulation, the need for modulation, digital modulation (ASK, FSK, PSK, QPSK, QAM), analog modulation (AM, FM, PM), the sampling theorem, PCM, PAM, PWM and PPM, delta modulation and companding, with formulas and worked examples.
updated: 2026-11-06
---

## Modulation and Demodulation {#modulation-and-demodulation}

### Definition of Modulation

Modulation is the **process of changing a characteristic (amplitude, frequency or phase) of a high-frequency carrier signal according to the data or message signal**, so that the data can be transmitted.

The **message (modulating) signal** is the information to be sent, such as voice or digital data. The **carrier** is a high-frequency sine wave that carries it. The result is the **modulated signal**.

### Definition of Demodulation

Demodulation is the **process of recovering the original message signal from the modulated carrier** at the receiver.

A **modem** (modulator–demodulator) performs both: it modulates digital data from a computer into an analog signal for the telephone or cable line, and demodulates the received analog signal back into digital data.

### Need for Modulation

1. **Practical antenna size** — an antenna works efficiently when its length is about a quarter of the wavelength (λ = c / f) of the signal. A 1 kHz audio signal has λ = 3 × 10⁸ / 10³ = 300 km, so it would need an antenna about **75 km** long; on a 1 MHz carrier, λ = 300 m and the antenna is about **75 m**.
2. **Multiplexing** — signals modulated onto different carrier frequencies can share one medium without interfering (frequency-division multiplexing).
3. **Matching the medium** — a band-pass medium (such as a telephone line, radio channel or cable TV system) can pass only a certain range of frequencies, so the data must be moved into that range.
4. **Longer range** — high-frequency signals travel farther and suffer less from noise.

### Types of Modulation

Modulation is classified into three main types:

1. **Analog modulation** (analog message on a continuous carrier) — **AM, FM and PM**.
2. **Digital modulation** (digital data on a continuous carrier) — **ASK, FSK, PSK, QPSK and QAM**.
3. **Pulse modulation** (the carrier is a train of pulses):
   1. **Analog pulse modulation** — **PAM, PWM and PPM**.
   2. **Digital pulse modulation** — **PCM and delta modulation (DM)**.

In data-communication terms, these are the four conversions between data and signals: digital-to-analog (digital modulation), analog-to-analog (analog modulation), analog-to-digital (PCM, DM) and digital-to-digital (line coding, described in [Data Encoding](/topics/computer-networks/data-encoding)).

## Digital Modulation Techniques {#digital-modulation-techniques}

### Definition of Digital Modulation

Digital modulation (digital-to-analog conversion) is the **process of changing a characteristic of an analog carrier signal according to digital data (bits)**.

A sine wave has three characteristics — **amplitude, frequency and phase** — so there are three basic techniques. A fourth, QAM, changes amplitude and phase together.

### Types of Digital Modulation

There are four types of digital modulation:

1. **Amplitude shift keying (ASK)** — changes the amplitude.
2. **Frequency shift keying (FSK)** — changes the frequency.
3. **Phase shift keying (PSK)** — changes the phase; QPSK is its four-phase form.
4. **Quadrature amplitude modulation (QAM)** — changes both amplitude and phase.

All four are explained in [ASK, PSK, FSK, QPSK, QAM](#ask-psk-fsk-qpsk-qam).

![ASK, FSK and PSK of the bits 10110](/diagrams/computer-networks/digital-modulation.svg)

### Binary and M-ary Modulation

1. **Binary modulation** — each signal element carries **1 bit** (2 different signal elements).
2. **M-ary modulation** — there are **M** different signal elements (levels, frequencies, phases or amplitude–phase combinations), so each carries **log₂ M** bits.

> **Bit rate = Baud rate × log₂ M**

Here **M** is the number of different signal elements and **log₂ M** the number of bits per signal element (see [Data Rate and Baud Rate](/topics/computer-networks/data-transmission-basics#data-rate-and-baud-rate)).

**Example:** a modem sends 1000 signal elements per second (1000 baud) using 16-QAM (M = 16). Each element carries log₂ 16 = 4 bits, so the bit rate is 1000 × 4 = **4000 bps**. With 64-QAM, each element carries log₂ 64 = **6 bits**.

### Constellation Diagram

A constellation diagram shows each signal element of a digital modulation scheme as a **point**: its distance from the centre is the **peak amplitude**, and its angle from the horizontal axis is the **phase**. The horizontal axis is the **in-phase (I)** carrier and the vertical axis is the **quadrature (Q)** carrier.

![Constellation diagrams of BPSK, QPSK and 16-QAM](/diagrams/computer-networks/constellations.svg)

## AM, FM, PM {#am-fm-pm}

### Analog Modulation

Analog modulation (analog-to-analog conversion) is the **representation of an analog message signal by changing the amplitude, frequency or phase of a high-frequency carrier**.

It is used when the medium is band-pass, such as in radio broadcasting. There are three types: **AM**, **FM** and **PM**.

![AM, FM and PM of a carrier](/diagrams/computer-networks/analog-modulation.svg)

### Amplitude Modulation (AM)

Amplitude modulation is a **technique in which the amplitude of the carrier changes according to the amplitude of the message signal**, while its frequency and phase stay constant.

The **envelope** (outline) of the modulated signal has the shape of the message.

> **s(t) = [A_c + m(t)] cos(2π f_c t)**

> **Modulation index (μ) = A_m / A_c**

> **Bandwidth of AM: B_AM = 2 f_m** (twice the highest message frequency)

Here:

1. **s(t)** — the AM signal; **A_c** — the carrier amplitude; **f_c** — the carrier frequency.
2. **m(t)** — the message signal; **A_m** — its peak amplitude; **f_m** — its highest frequency.
3. **μ** — the modulation index, normally between 0 and 1. If μ > 1 (**over-modulation**), the envelope is distorted and the message cannot be recovered correctly.

**Example:** a carrier of 10 V peak is modulated by a voice signal of 5 V peak whose highest frequency is 5 kHz. Modulation index = 5 / 10 = **0.5**; bandwidth = 2 × 5 kHz = **10 kHz**. This is why AM radio stations are given **10 kHz** channels (the AM broadcast band is 530–1700 kHz).

### Frequency Modulation (FM)

Frequency modulation is a **technique in which the frequency of the carrier changes according to the amplitude of the message signal**, while its amplitude and phase stay constant.

When the message voltage rises, the carrier frequency rises, and when it falls, the frequency falls. The largest change of frequency from the carrier is the **frequency deviation (Δf)**.

> **Modulation index (β) = Δf / f_m**

> **Bandwidth of FM (Carson's rule): B_FM ≈ 2(Δf + f_m) = 2(1 + β) f_m**

Here **Δf** is the peak frequency deviation, **f_m** the highest message frequency and **β** the FM modulation index. β can be less than 1 (narrowband FM) or greater than 1 (wideband FM).

**Example:** FM radio uses a peak deviation of 75 kHz and audio up to 15 kHz. β = 75 / 15 = **5**, and B_FM ≈ 2 × (75 + 15) = **180 kHz**. FM stations are therefore given **200 kHz** channels (the FM band is 88–108 MHz).

### Phase Modulation (PM)

Phase modulation is a **technique in which the phase of the carrier changes according to the amplitude of the message signal**, while its amplitude stays constant.

PM looks similar to FM, because changing the phase also changes the frequency for a moment. In FM the frequency change follows the **amplitude** of the message; in PM it follows the **rate of change** of the message. Its bandwidth is also given by B_PM ≈ 2(1 + β) f_m, and it needs simpler hardware than FM. Use: some mobile and satellite systems; digital PSK is its digital form.

### AM vs FM vs PM

| Basis | AM | FM | PM |
| --- | --- | --- | --- |
| Carrier characteristic changed | Amplitude | Frequency | Phase |
| Constant | Frequency and phase | Amplitude and phase | Amplitude |
| Bandwidth | 2 f_m (small) | 2(1 + β) f_m (large) | 2(1 + β) f_m |
| Effect of noise | Very affected (noise changes amplitude) | Less affected | Less affected |
| Sound quality | Lower | Higher | Higher |
| Range | Longer (can use ground and sky waves) | Shorter (line of sight) | Shorter |
| Circuit | Simple and cheap | More complex | More complex |
| Broadcast band | 530–1700 kHz | 88–108 MHz | — |
| Channel width | 10 kHz | 200 kHz | — |

## Delta Modulation and Companding {#delta-modulation-and-companding}

### Delta Modulation (DM)

Delta modulation is an **analog-to-digital conversion technique that sends only one bit per sample, showing whether the signal has risen or fallen compared with the previous approximation**.

PCM sends the value of every sample; DM sends only the **change**. The modulator keeps a **staircase** approximation of the signal and moves it by a fixed **step size (Δ)** at each sample:

1. If the signal is **above** the staircase, the bit **1** is sent and the staircase goes **up** by Δ.
2. If the signal is **below** the staircase, the bit **0** is sent and the staircase goes **down** by Δ.

The demodulator rebuilds the staircase from the bits and smooths it with a low-pass filter. DM is the simplest form of differential PCM (DPCM).

> **Bit rate of DM = sampling rate (f_s)**, because each sample gives one bit.

![Delta modulation staircase](/diagrams/computer-networks/delta-modulation.svg)

### Errors in Delta Modulation

1. **Slope overload distortion** — when the signal changes **faster** than the staircase can follow (the step size is too **small**), the staircase lags behind the signal.
2. **Granular noise** — when the signal is almost **flat**, the staircase keeps moving up and down by Δ around it (the step size is too **large**).

To avoid slope overload, the staircase must be able to rise at least as fast as the signal:

> **Δ × f_s ≥ maximum slope of the signal**; for a sine wave A sin(2π f_m t), **Δ × f_s ≥ 2π f_m A**

Here **Δ** is the step size, **f_s** the sampling rate, **A** the peak amplitude and **f_m** the frequency of the signal.

**Example:** a 1 kHz sine wave with a peak of 1 V is delta-modulated at 64 000 samples per second. The step size must be at least 2π × 1000 × 1 / 64 000 ≈ **0.098 V** to avoid slope overload. The bit rate is **64 kbps** (one bit per sample).

### Adaptive Delta Modulation (ADM)

Adaptive delta modulation is a **form of delta modulation in which the step size changes with the signal**: it becomes larger when the signal changes quickly (several bits in the same direction) and smaller when it changes slowly.

This reduces both slope overload and granular noise. A common form is **CVSD** (continuously variable slope delta modulation).

### PCM vs Delta Modulation

| Basis | PCM | Delta modulation |
| --- | --- | --- |
| Bits per sample | n bits (for example, 8) | 1 bit |
| What is sent | Value of each sample | Increase or decrease from the previous approximation |
| Bit rate | f_s × n | f_s |
| Bandwidth | High | Low |
| Sampling rate | At least the Nyquist rate (2 f_max) | Much higher than the Nyquist rate (oversampling) |
| Errors | Quantization noise | Slope overload and granular noise |
| Complexity | More complex | Simple |
| Signal quality (SNR) | Good | Lower |

### Companding

Companding (**compressing** + ex**panding**) is a **technique in which the signal is compressed before uniform quantization at the transmitter and expanded by the reverse rule at the receiver**, so that weak signals get more quantization levels than strong ones.

With **uniform** quantization, all steps are equal, so weak signals (such as quiet speech) suffer a large relative quantization error. Companding gives the effect of **non-uniform quantization**: small steps for small amplitudes and large steps for large amplitudes. This keeps the signal-to-quantization-noise ratio nearly constant and lets 8-bit codes give the quality of about 13–14-bit uniform codes.

1. **Compressor** (at the transmitter) — boosts weak signals relative to strong ones.
2. **Uniform quantizer and encoder.**
3. **Expander** (at the receiver) — applies the inverse of the compressor's rule, restoring the original amplitudes.

Two standard companding laws are defined in **ITU-T G.711** for telephone PCM:

1. **μ-law** — used in North America and Japan (μ = 255).
2. **A-law** — used in Europe and most other countries (E-1 systems).

> **μ-law compressor: F(x) = sgn(x) × ln(1 + μ|x|) / ln(1 + μ)**, for −1 ≤ x ≤ 1

Here **x** is the normalized input amplitude, **F(x)** the compressed output, **μ** the compression parameter (255) and **sgn(x)** the sign of x (+1 or −1).

**Example (μ = 255):**

1. x = 0.01: F = ln(1 + 2.55) / ln 256 ≈ **0.228**
2. x = 0.1: F = ln(26.5) / ln 256 ≈ **0.591**
3. x = 0.5: F = ln(128.5) / ln 256 ≈ **0.876**

A weak input of 1% of the full range is raised to about 23% of the range, so it uses many more quantization levels.

## ASK, PSK, FSK, QPSK, QAM {#ask-psk-fsk-qpsk-qam}

### Amplitude Shift Keying (ASK)

**Amplitude shift keying (ASK)** is a **digital modulation technique in which the amplitude of the carrier is changed to represent binary data**, while its frequency and phase stay constant.

In **binary ASK (BASK)**, one amplitude represents 1 and another represents 0. In its simplest form, **on–off keying (OOK)**, bit 1 sends the carrier and bit 0 sends nothing.

1. **Advantages:** simple and cheap; needs low bandwidth.
2. **Disadvantage:** very **sensitive to noise**, because noise mainly affects amplitude.
3. **Use:** optical-fibre transmission (light on/off).

### Frequency Shift Keying (FSK)

**Frequency shift keying (FSK)** is a **digital modulation technique in which the frequency of the carrier is changed to represent binary data**, while its amplitude and phase stay constant.

In **binary FSK (BFSK)**, one frequency (f₁) represents 1 and another (f₂) represents 0.

1. **Advantage:** **less affected by noise** than ASK.
2. **Disadvantage:** needs **more bandwidth** than ASK, because it uses two carrier frequencies.
3. **Use:** early low-speed modems, caller ID, radio teleprinters.

### Phase Shift Keying (PSK)

**Phase shift keying (PSK)** is a **digital modulation technique in which the phase of the carrier is changed to represent binary data**, while its amplitude and frequency stay constant.

In **binary PSK (BPSK)**, two phases **180° apart** are used: for example, phase 0° for 1 and 180° for 0.

1. **Advantages:** less affected by noise than ASK; needs less bandwidth than FSK.
2. **Disadvantage:** the receiver needs the carrier phase (coherent detection), so it is more complex.
3. **Use:** Wi-Fi, Bluetooth, satellite links, RFID.

### Quadrature Phase Shift Keying (QPSK)

**Quadrature phase shift keying (QPSK)** is a **form of PSK that uses four phases, 90° apart, so that each signal element carries 2 bits**.

The bit stream is divided into pairs (dibits). Each dibit (00, 01, 11, 10) selects one of four phases, for example 45°, 135°, 225° and 315°. QPSK sends **twice the bit rate of BPSK** in the same bandwidth (bit rate = 2 × baud rate).

**Example:** a QPSK modem sends 1200 baud. Bit rate = 1200 × 2 = **2400 bps**.

### Quadrature Amplitude Modulation (QAM)

**Quadrature amplitude modulation (QAM)** is a **digital modulation technique that changes both the amplitude and the phase of the carrier**, combining ASK and PSK.

Two carriers of the same frequency, 90° out of phase (the in-phase and quadrature carriers), are each amplitude-modulated and then added. With M combinations of amplitude and phase, each signal element carries log₂ M bits:

| Scheme | Signal elements (M) | Bits per signal element |
| --- | --- | --- |
| 4-QAM (same as QPSK) | 4 | 2 |
| 16-QAM | 16 | 4 |
| 64-QAM | 64 | 6 |
| 256-QAM | 256 | 8 |

1. **Advantage:** the **highest bit rate** for a given bandwidth (baud rate).
2. **Disadvantage:** points are closer together as M grows, so it is more affected by noise and needs a good channel.
3. **Use:** cable modems, DSL, Wi-Fi, 4G and 5G, digital TV.

### Comparison of Digital Modulation Techniques

| Basis | ASK | FSK | PSK (BPSK) | QPSK | QAM |
| --- | --- | --- | --- | --- | --- |
| Characteristic changed | Amplitude | Frequency | Phase | Phase (4 values) | Amplitude and phase |
| Bits per signal element | 1 | 1 | 1 | 2 | log₂ M (for example, 4 for 16-QAM) |
| Noise immunity | Poor | Good | Good | Good | Lower as M grows |
| Bandwidth needed | Low | High | Low | Low | Low |
| Complexity | Simplest | Simple | Moderate | Moderate | Most complex |
| Typical use | Optical fibre | Low-speed modems | Wi-Fi, satellite | Satellite, cellular | Cable modems, DSL, Wi-Fi |

## Sampling Theorem {#sampling-theorem}

### Sampling

Sampling is the **process of measuring the amplitude of an analog signal at regular intervals of time**. Each measured value is a **sample**; the number of samples per second is the **sampling rate (f_s)**, and the time between samples is the **sampling interval (T_s = 1 / f_s)**.

### Sampling Theorem (Nyquist Theorem)

The **sampling theorem** is the rule that a **band-limited signal can be fully reconstructed from its samples if it is sampled at a rate at least twice its highest frequency**.

> **f_s ≥ 2 f_max**

> **Nyquist rate = 2 f_max**, **Nyquist interval = 1 / (2 f_max)**

Here **f_s** is the sampling rate (samples per second), and **f_max** the highest frequency in the signal (Hz).

It is also called the **Nyquist–Shannon sampling theorem**. In practice, a signal is passed through a **low-pass (anti-aliasing) filter** first, to remove frequencies above f_s / 2.

**Example 1:** telephone voice is limited to about 4 kHz. Nyquist rate = 2 × 4000 = **8000 samples per second**; sampling interval = 1 / 8000 s = **125 µs**.

**Example 2:** an audio CD samples at 44 100 samples per second, which can represent frequencies up to 44 100 / 2 = **22.05 kHz**, above the human hearing limit of about 20 kHz.

### Aliasing

Aliasing is the **distortion that occurs when a signal is sampled below the Nyquist rate**: a high-frequency component appears as a false lower frequency (an alias) in the reconstructed signal.

**Example:** a 5 kHz tone sampled at 8 kHz (below its Nyquist rate of 10 kHz) is reconstructed as a false tone of |5 − 8| = **3 kHz**.

### Types of Sampling

There are three types of sampling:

1. **Ideal (impulse) sampling** — the samples are instantaneous impulses (a theoretical model).
2. **Natural sampling** — each pulse follows the shape of the signal during the pulse.
3. **Flat-top sampling** — each pulse has a constant height equal to the signal value at the start of the pulse (sample-and-hold); the most common in practice.

## PCM, PPM, PAM {#pcm-ppm-pam}

### Pulse Modulation

Pulse modulation is a **modulation technique in which the carrier is a train of pulses and a characteristic of the pulses (amplitude, width or position) is changed according to the samples of the message signal**.

![PAM, PWM and PPM](/diagrams/computer-networks/pulse-modulation.svg)

### Pulse Amplitude Modulation (PAM)

**Pulse amplitude modulation (PAM)** is a **pulse modulation technique in which the amplitude (height) of each pulse is made proportional to the value of the message signal at that sample**, while the pulse width and position stay constant.

It is the result of sampling (natural or flat-top) and is the **first step of PCM**. PAM is easily affected by noise, because noise changes amplitude.

### Pulse Width Modulation (PWM)

**Pulse width modulation (PWM)** is a **pulse modulation technique in which the width (duration) of each pulse is made proportional to the sample value**, while the amplitude stays constant. It is also called pulse duration modulation (PDM).

> **Duty cycle = ON time ÷ (ON time + OFF time)**

**Example:** a 5 V PWM signal is ON for 2 ms and OFF for 3 ms in each cycle. Duty cycle = 2 ÷ 5 = **40%**, and its average voltage is 0.4 × 5 = **2 V**. PWM is widely used to control the speed of motors and the brightness of LEDs.

### Pulse Position Modulation (PPM)

**Pulse position modulation (PPM)** is a **pulse modulation technique in which the position (time) of each pulse, relative to its reference time, is changed according to the sample value**, while the amplitude and width stay constant.

It is usually produced from PWM: each PPM pulse starts at the trailing edge of a PWM pulse. Because all pulses have the same amplitude and width, the transmitted power is constant and noise has little effect. Uses: optical and infrared communication, and radio control.

### PAM vs PWM vs PPM

| Basis | PAM | PWM | PPM |
| --- | --- | --- | --- |
| Pulse characteristic changed | Amplitude | Width | Position |
| Constant | Width and position | Amplitude | Amplitude and width |
| Noise immunity | Poor | Better | Best |
| Transmitted power | Varies | Varies | Constant |
| Bandwidth depends on | Pulse width | Rise time of the pulses | Rise time of the pulses |
| Synchronization needed | No | No | Yes |

### Pulse Code Modulation (PCM)

**Pulse code modulation (PCM)** is the **most common technique for converting an analog signal into digital data**, by sampling the signal, quantizing each sample to a fixed level, and encoding the level as a binary number.

![PCM process: sampling, quantization and encoding](/diagrams/computer-networks/pcm-process.svg)

The PCM encoder has three main steps (after a low-pass filter):

1. **Sampling** — the analog signal is sampled at (at least) the Nyquist rate, giving PAM pulses.
2. **Quantization** — the range of amplitudes is divided into **L** zones (levels); each sample is replaced by the value at the middle of its zone.
3. **Encoding** — each quantized level is converted into an **n-bit** binary code.

The PCM decoder reverses the process and passes the result through a low-pass filter.

### Formulas of PCM

> **L = 2ⁿ** (number of levels), so **n = log₂ L**

> **Step size: Δ = (V_max − V_min) / L**

> **Maximum quantization error = Δ / 2**

> **Bit rate of PCM = f_s × n**

> **SQNR (dB) ≈ 6.02 n + 1.76**

Here:

1. **L** — the number of quantization levels; **n** — the number of bits per sample.
2. **Δ** — the height of each zone; **V_max** and **V_min** — the largest and smallest amplitudes of the signal.
3. **f_s** — the sampling rate.
4. **SQNR** — the signal-to-quantization-noise ratio in decibels; each extra bit per sample adds about 6 dB.

### Worked Examples of PCM

**Example 1 (telephone):** voice is sampled at 8000 samples per second with 8 bits per sample. Bit rate = 8000 × 8 = **64 000 bps (64 kbps)** — the rate of one digital telephone channel (DS0).

**Example 2 (quantization):** a signal ranges from −1 V to +1 V and is quantized with n = 3 bits.

1. L = 2³ = **8 levels**; Δ = (1 − (−1)) / 8 = **0.25 V**.
2. The zones are −1 to −0.75, −0.75 to −0.5, …, +0.75 to +1, numbered 0 (000) to 7 (111).
3. A sample of **0.6 V** lies in zone 6 (0.5 to 0.75 V); its quantized value is the middle of the zone, **0.625 V**, and its code is **110**.
4. Quantization error = 0.6 − 0.625 = **−0.025 V** (within ±Δ/2 = ±0.125 V).

**Example 3 (SQNR):** with 8 bits per sample, SQNR ≈ 6.02 × 8 + 1.76 ≈ **49.9 dB**; with 12 bits, ≈ **74 dB**.

**Example 4 (audio CD):** 44 100 samples per second × 16 bits × 2 channels (stereo) = **1 411 200 bps ≈ 1.41 Mbps**.

### Advantages and Disadvantages of PCM

1. **Advantages:** high noise immunity (signals can be regenerated); easy to encrypt, multiplex (TDM) and store; uniform format for voice, video and data.
2. **Disadvantages:** needs much more bandwidth than the analog signal; quantization noise; complex encoder and decoder.

## References {#references}

**TutorialsPoint**

- [Analog Transmission](https://www.tutorialspoint.com/data_communication_computer_network/analog_transmission.htm) — accessed 2026-11-06 (digital-to-analog conversion: ASK, FSK, PSK, QPSK; analog-to-analog conversion: AM, FM, PM). Its PM text says the frequency of the carrier "is not increased"; in PM the phase changes and the instantaneous frequency changes with it, as written above.
- [Digital Transmission](https://www.tutorialspoint.com/data_communication_computer_network/digital_transmission.htm) — accessed 2026-11-06 (analog-to-digital conversion: sampling at twice the highest frequency, quantization, encoding, PCM, delta modulation). TutorialsPoint's separate pages *digital_to_analog_conversion.htm*, *analog_to_digital_conversion.htm* and *analog_to_analog_conversion.htm* return 404.

**GeeksforGeeks**

- [Digital Modulation Techniques – ASK, FSK and PSK](https://www.geeksforgeeks.org/electronics-engineering/digital-modulation-techniques/), [Digital to Analog Conversion](https://www.geeksforgeeks.org/digital-to-analog-conversion) and [Quadrature Amplitude Modulation](https://www.geeksforgeeks.org/computer-networks/quadrature-amplitude-modulation/) — accessed 2026-11-06 (ASK, FSK, BPSK 180°, QPSK four phases, M-ary, QAM as a combination of ASK and PSK). Issues: it calls M-ary ASK "M-FSK", calls PSK "non coherent" (PSK needs coherent detection), and says 1024-QAM "quadruples" the throughput of 256-QAM (it carries 10 bits per symbol instead of 8, a 25% increase).
- [Analog to Analog Conversion (Modulation)](https://www.geeksforgeeks.org/digital-logic/analog-to-analog-conversion-modulation/) and [Difference between Amplitude Modulation and Frequency Modulation](https://www.geeksforgeeks.org/electronics-engineering/difference-between-amplitude-modulation-and-frequency-modulation/) — accessed 2026-11-06 (AM bandwidth 2f_m, AM index 0 to 1, AM and FM bands and channel widths, comparison). The comparison page says the FM modulation index is "always greater than one"; narrowband FM has β < 1, as written above.
- [Difference between PCM and Delta Modulation](https://www.geeksforgeeks.org/computer-networks/difference-between-pulse-code-modulation-pcm-and-delta-modulation-dm/) — accessed 2026-11-06 (one bit per sample, slope overload, granular noise, comparison). It says DM is used "to realize high signal to noise ratio" and also that DM has a poor SNR; the second is correct.
- [Analog to Digital Conversion](https://www.geeksforgeeks.org/digital-logic/analog-to-digital-conversion/) — accessed 2026-11-06 (Nyquist rate, step size (V_max − V_min) / L, n = log₂ L, quantization at the middle of each zone, ideal, natural and flat-top sampling, delta and adaptive delta modulation)
- [Pulse Amplitude Modulation](https://www.geeksforgeeks.org/electronics-engineering/pulse-amplitude-modulation/), [Pulse Position Modulation](https://www.geeksforgeeks.org/electrical-engineering/pulse-position-modulation-ppm/) and [Pulse Width Modulation](https://www.geeksforgeeks.org/electronics-engineering/pulse-width-modulation-pwm/) — accessed 2026-11-06 (definitions, PPM from the trailing edge of PWM, duty cycle). The worked examples on its PAM page are amplitude-modulation equations, not PAM; they are not used.

**TpointTech**

- [Modulation in Mobile Computing](https://www.tpointtech.com/modulation-in-mobile-computing) and [Quadrature Amplitude Modulation](https://www.tpointtech.com/quadrature-amplitude-modulation-qam) — accessed 2026-11-06 (analog and digital modulation, AM, FM and PM expressions, BPSK, QAM with in-phase and quadrature carriers). It describes analog modulation as "transmission into digital signals" and gives "the example of QAM in analog modulation is PM"; both are incorrect and not used.
- [Sampling](https://www.tpointtech.com/sampling) — accessed 2026-11-06 (Nyquist rate 2W, Nyquist interval 1/2W, aliasing, anti-aliasing filter)

**IT Job QnS**

- [Computer Network](https://it.jobqns.com/computer-network/) — accessed 2026-11-06 (modem: modulation and demodulation between digital and analog signals). It has no item on the other subtopics.

**Programiz**

- Programiz has no page on modulation (checked 2026-11-06).

**Additional sources** (used because the reference websites have no page on companding, and do not give the μ-law formula, the slope-overload condition, Carson's rule, the PCM bit-rate or SQNR formulas)

- Wikipedia, [Companding](https://en.wikipedia.org/wiki/Companding), [μ-law algorithm](https://en.wikipedia.org/wiki/%CE%9C-law_algorithm) and [Delta modulation](https://en.wikipedia.org/wiki/Delta_modulation) — accessed 2026-11-06 (compressor, quantizer and expander; μ = 255 and G.711; μ-law in North America and Japan, A-law in Europe; slope-overload condition; adaptive DM and CVSD).
- Behrouz A. Forouzan, *Data Communications and Networking*, 5th edition, McGraw-Hill, chapters 4 and 5 (PCM steps, L = 2ⁿ, bit rate f_s × n, SNR_dB = 6.02 n + 1.76, AM bandwidth 2B, FM and PM bandwidth 2(1 + β)B, constellation diagrams, QAM). All worked examples above were checked by calculation.
