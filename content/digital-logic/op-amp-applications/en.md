---
description: The operational amplifier, op-amp circuits that drive LED and LCD displays (indicators, bar-graph level meters and display drivers), and op-amp comparators, the zero-crossing detector and the Schmitt trigger.
updated: 2026-11-01
---

**Operational amplifier (op-amp):** an op-amp is a **direct-coupled, very high-gain amplifier** made as an integrated circuit.

It works with both AC and DC signals and is used for linear operations (amplifying, adding, integrating) and non-linear operations (comparing, switching). The **IC 741** is the best-known general-purpose op-amp.

**Terminals:** an op-amp is drawn as a triangle with two inputs and one output:

1. **Inverting input (−):** the output is out of phase with a signal applied here.
2. **Non-inverting input (+):** the output is in phase with a signal applied here.
3. **Output:** the op-amp amplifies the **difference** between the two inputs: Vo = A × (V+ − V−), where A is the open-loop gain.

**Ideal op-amp characteristics:**

1. Infinite open-loop voltage gain
2. Infinite input impedance (it draws no input current)
3. Zero output impedance
4. Infinite bandwidth
5. Infinite CMRR (common-mode rejection ratio)
6. Infinite slew rate (the output changes instantly)
7. Zero output when the two inputs are equal

**Saturation:** because the open-loop gain is so large, even a very small difference between the inputs drives the output to its maximum positive or negative value, called **+Vsat** or **−Vsat** (a little less than the supply voltages). An op-amp used **without feedback (open loop)** therefore gives only two output levels, like a switch. This is the basis of the comparator.

## LED and LCD Applications of Op-Amps {#led-and-lcd-applications-of-op-amps}

Op-amps (mostly working as comparators; see [Comparators](#comparators)) are used to **decide when a display element should be on**: they compare an analog voltage with reference levels and switch **LED** or **LCD** indicators and displays accordingly.

### LED (Light-Emitting Diode)

**Definition:** an LED is a semiconductor diode that **emits light when a forward current flows** through it.

It is driven through a **current-limiting resistor** so that the current stays safe. LEDs are used as indicator lamps, in [seven-segment displays](/topics/digital-logic/combinational-circuits#seven-segment-decoder-and-display) and in bar-graph displays.

### Op-Amp Driving an LED (Threshold Indicator)

**Circuit:** a comparator compares the input voltage Vi with a reference Vref, and its output drives an LED through a resistor.

1. When the input crosses the reference, the comparator output changes from one saturation level to the other and **switches the LED on** (or off).
2. The reference sets the **switching level**, so the LED indicates whether a quantity is above or below a set value.

**Uses:** low-battery indicators, over-temperature or over-voltage alarms, light-level (day/night) indicators, and signal-presence indicators. The sensor (for example, a temperature or light sensor) gives the input voltage, and the LED shows the result.

### LED Bar-Graph Level Indicator

**Construction:**

1. A **resistor voltage divider** connected to a reference voltage gives several equally spaced reference levels.
2. **One comparator for each LED**: every comparator receives the same input Vi at its + input and one of the reference levels at its − input.
3. Each comparator output drives one LED (through a resistor).

![Comparator LED level indicator: a resistor divider sets three reference levels, three comparators each drive one LED](/diagrams/digital-logic/led-level-indicator.svg)

**Working:** as Vi rises, it passes the reference levels one after another, and the comparators switch on their LEDs in turn. So **the number of lit LEDs (the length of the "bar") shows the size of the input voltage**, like an analog meter. (This is the same principle as the comparator bank of a [flash ADC](/topics/digital-logic/ad-da-conversion#adc-and-dac-circuits).)

**Example uses:** battery-level indicators, **audio level (VU) meters**, which use op-amp comparators to show the level of an audio signal, and voltage or temperature bar-graph meters.

**IC example: LM3914 dot/bar display driver.** The LM3914 contains an **input buffer**, an accurate **10-step voltage divider** with its own adjustable reference, and **10 comparators**. It senses an analog voltage and **drives 10 LEDs** as a linear analog display; one pin selects a **bar graph** or a **moving dot**. Its LED outputs are **current-regulated**, so separate LED resistors are not needed, and several ICs can be chained for displays of 20 to over 100 segments. Its outputs can drive **LEDs, LCDs or vacuum fluorescent displays**.

### LCD (Liquid Crystal Display)

**Construction:** the common **twisted nematic (TN)** LCD has a layer of **liquid crystal** between two glass plates. The inner surfaces carry transparent electrodes, and **polarizers** are fixed on the outer surfaces.

**Working:**

1. **No voltage:** the liquid-crystal molecules are twisted by 90°, so they rotate the polarized light and it **passes** through the display.
2. **Voltage applied** between the electrodes of a segment: the molecules line up with the electric field, the light is **blocked**, and the segment looks **dark**.

So an LCD **does not produce light**; it controls light passing through it (or reflected by it).

**Drive requirement:** the voltage across an LCD segment **must have no DC component**. A DC voltage makes impurity ions move to the electrodes and stick there, which spoils the display. So LCDs are driven with **AC waveforms** (square waves whose polarity keeps reversing); the segment responds to the **RMS value** of the voltage, not its polarity.

**Op-amp use:** an op-amp **square-wave generator** (astable multivibrator; see [Multivibrators](/topics/digital-logic/pulse-and-switching-circuits#multivibrators)) can produce the AC drive waveform, and comparator-based display drivers such as the LM3914 can drive LCD segments according to an analog input level.

### Differences Between LED and LCD Displays

| Basis | LED display | LCD display |
| --- | --- | --- |
| Light | **Emits** its own light | **Does not emit** light; controls the light passing through |
| Device | Semiconductor diode (p-n junction) | Liquid crystal between glass plates and polarizers |
| Drive | DC forward current (through a current-limiting resistor) | AC voltage with no DC component |
| Visibility in darkness | Visible (self-luminous) | Needs a backlight or outside light |
| Op-amp role | Comparator switches the LED current | Square-wave generator / display driver provides AC drive |
| Response time | Faster | Slower |
| Power consumption | Higher | Lower |
| Contrast and picture quality | Better (deeper black level) | Lower |
| Viewing angle | Wider | Narrower (contrast falls when viewed from the side) |
| Cost | More expensive | Cheaper |
| Materials | Semiconductor (for example, gallium arsenide phosphide) | Liquid crystals and glass electrodes |

## Comparators {#comparators}

**Definition:** a comparator is a circuit that **compares two input voltages** and gives an output that shows **which one is greater**.

An op-amp used **in open loop** (without negative feedback) is a comparator: one input receives the signal Vi and the other a **reference voltage Vref**, and the output saturates at **+Vsat** or **−Vsat**. A comparator is a **non-linear** application of the op-amp.

**Note:** this analog comparator is different from the digital [magnitude comparator](/topics/digital-logic/combinational-circuits#comparator), which compares two binary numbers using logic gates.

### Types of Comparators: Non-Inverting and Inverting

![Non-inverting op-amp comparator with the input at + and the reference at −](/diagrams/digital-logic/opamp-comparator.svg)

| Type | Vi applied to | Vref applied to | Vi > Vref | Vi < Vref |
| --- | --- | --- | --- | --- |
| **Non-inverting comparator** | + input | − input | Vo = **+Vsat** | Vo = **−Vsat** |
| **Inverting comparator** | − input | + input | Vo = **−Vsat** | Vo = **+Vsat** |

**Example:** a non-inverting comparator with Vref = 2 V and ±Vsat = ±13 V gives Vo = +13 V whenever Vi is above 2 V, and −13 V whenever Vi is below 2 V. It acts as a **level detector** for 2 V.

### Zero-Crossing Detector

**Definition:** a comparator with **Vref = 0 V** is called a **zero-crossing detector**.

Its output **changes state every time the input crosses zero volts**.

1. **Non-inverting zero-crossing detector:** output +Vsat during the positive half-cycles of the input and −Vsat during the negative half-cycles.
2. **Inverting zero-crossing detector:** the opposite (−Vsat during positive half-cycles, +Vsat during negative half-cycles).

![Zero-crossing detector: a sine wave input and the square wave output that changes at each zero crossing](/diagrams/digital-logic/zero-crossing-detector.svg)

**Use:** it converts a **sine wave into a square wave** of the same frequency, and it marks the instants when an AC signal crosses zero (for timing and phase measurement).

### Schmitt Trigger (Comparator with Hysteresis)

**Problem with a simple comparator:** if a **noisy** input stays close to the reference level, the noise makes it cross the reference many times, and the output switches back and forth (false triggering).

**Definition:** a **Schmitt trigger** is a **comparator with positive feedback**, which gives it **two threshold voltages**: an **upper threshold voltage VUT** and a **lower threshold voltage VLT**.

The output changes state only when the input rises above VUT or falls below VLT; between the two thresholds, the output does not change. This property is called **hysteresis**.

**Inverting Schmitt trigger:** the input goes to the − input, and a voltage divider (R2 from the output to the + input, and R1 from the + input to ground) feeds a fraction of the output back to the + input:

```text
 VUT = + Vsat × R1 / (R1 + R2)
 VLT = − Vsat × R1 / (R1 + R2)
 Hysteresis  VH = VUT − VLT
```

**Worked example:** ±Vsat = ±12 V, R1 = 1 kΩ and R2 = 2 kΩ. Then R1 / (R1 + R2) = 1/3, so VUT = **+4 V**, VLT = **−4 V** and VH = **8 V**. Noise smaller than this band cannot make the output switch falsely.

**Applications of the Schmitt trigger:**

1. Converting noisy or slowly changing signals into clean **square waves** (waveform shaping)
2. **Noise immunity** in signal conditioning
3. Switch **debouncing**
4. Square-wave **oscillators** (with an RC circuit)

### Applications of Comparators

1. **Zero-crossing detectors** (sine-to-square conversion, timing)
2. **Level (threshold) detectors**: switching an LED, alarm or relay when a voltage passes a set level
3. **Window comparators**: two comparators that show whether the input lies **between** a lower and an upper limit
4. **A/D converters**: the comparator is the key part of every ADC (see [A/D and D/A Conversion](/topics/digital-logic/ad-da-conversion))
5. **LED bar-graph and audio level meters** (see [above](#led-and-lcd-applications-of-op-amps))
6. **Square-wave generators** and Schmitt triggers

## References {#references}

**TutorialsPoint**

- [Basics of Operational Amplifier](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_basics_of_operational_amplifier.htm) — accessed 2026-11-01
- [Comparators](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_comparators.htm) — accessed 2026-11-01
- [Waveform Generators](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_waveform_generators.htm) — accessed 2026-11-01
- [Seven-Segment LED Display](https://www.tutorialspoint.com/digital-electronics/seven-segment-led-display.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Difference between LED and LCD](https://www.geeksforgeeks.org/electronics-engineering/difference-between-led-and-lcd/) — accessed 2026-11-01
- [Op Amp Applications](https://www.geeksforgeeks.org/electrical-engineering/op-amp-applications/) — accessed 2026-11-01
- [Schmitt Trigger](https://www.geeksforgeeks.org/electronics-engineering/schmitt-trigger/) — accessed 2026-11-01

**Additional sources**

- [LM3914 Dot/Bar Display Driver datasheet](https://web.ece.ucsb.edu/~ilan/Classes/ECE2A_F2010/Labs/Datasheets/LM3914.pdf) — National Semiconductor, accessed 2026-11-01
- [AN3219: Driving Bare TN and STN LCDs Using GPIO Pins](https://NXP.com/docs/en/application-note/AN3219.pdf) — Freescale (NXP) application note, accessed 2026-11-01
