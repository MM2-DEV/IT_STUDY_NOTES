---
description: The need for A/D and D/A conversion, the binary weighted and R-2R ladder D/A converters, the digital ramp, successive approximation, flash and dual-slope A/D converters, and resolution, accuracy and conversion time.
updated: 2026-11-01
---

## Need and Applications {#need-and-applications}

**Analog and digital signals:** most quantities in the real world, such as temperature, pressure, sound and light, are **analog**: they vary **continuously** and can take any value. Computers and other digital systems work only with **digital** signals: binary numbers made of 0s and 1s (see [Analog and Digital Systems](/topics/computer-fundamentals/analog-and-digital-systems)).

**Definitions:**

1. **Analog-to-digital converter (ADC, A/D converter):** a circuit that **converts an analog voltage into an equivalent binary number**. It has one analog input and n digital outputs.
2. **Digital-to-analog converter (DAC, D/A converter):** a circuit that **converts a binary number into an equivalent analog voltage (or current)**. It has n digital inputs and one analog output.

### Need for A/D and D/A Conversion

1. A digital system **cannot process an analog signal directly**, so an ADC is needed at its input to turn the analog signal into binary numbers. The ADC is the **interface between the analog outside world and the digital system**.
2. Many output devices (loudspeakers, motors, analog meters) need an **analog** signal, so a DAC is needed to turn the processed binary numbers back into an analog signal.
3. Digital processing has many advantages (accurate storage, copying without loss, processing by computer), so signals are converted to digital form for processing and then back to analog form for use.

A typical system that processes a real-world signal digitally:

```text
 Sensor (analog) → ADC → Digital processor / computer → DAC → Actuator (analog)
```

### Steps of A/D Conversion

1. **Sampling:** the analog signal is measured at regular intervals. (By the Nyquist–Shannon sampling theorem, the sampling rate must be **at least twice the highest frequency** in the signal.)
2. **Quantization:** each sample is approximated to the nearest of a fixed number of discrete levels.
3. **Encoding:** each level is given its binary code, which is the digital output.

### Applications

**Applications of ADCs:**

1. **Digital signal processing** of signals from sensors and microphones
2. **Audio recording** and digital voice communication
3. **Data acquisition** and digital measuring instruments (for example, digital voltmeters)
4. **Medical equipment** (ECG, EEG and similar bio-signals)
5. **Automotive** and **industrial** sensors (temperature, pressure, speed)
6. Phones, tablets, cameras and other consumer electronics

**Applications of DACs:**

1. **Audio playback**: CD players, music players and sound cards turn digital audio into sound
2. **Video** output in televisions and display equipment
3. **Motor control** and other control systems
4. **Communication** systems (generating transmitted signals)
5. **Test and calibration** of instruments
6. As a part of some ADCs (the digital ramp and successive approximation types)

## Ladder-Type D/A Converter {#ladder-type-d-a-converter}

### Basic Principle of a DAC

A DAC gives an output voltage that is **proportional to the binary value** of its input. Each input bit has a **weight** that is a power of two: in a 3-bit DAC, the MSB counts 4 times as much as the LSB, and the middle bit 2 times as much. So:

```text
 Analog output = (step size) × (decimal value of the binary input)
```

The **step size** is the change in output caused by a change of 1 in the LSB. Two common resistor networks give these binary weights: the **binary weighted resistor DAC** and the **R-2R ladder DAC**. Both feed an **op-amp inverting adder** (summing amplifier), which adds the weighted currents and gives the output voltage.

### Binary Weighted Resistor DAC

**Construction:** each bit has its own resistor, and the resistor values are **binary weighted**: R for the MSB, 2R for the next bit, 4R for the next, and so on (the resistor doubles for each less significant bit). Each bit input is switched to 0 V (bit 0) or to the reference voltage −VR (bit 1). The resistors meet at the inverting input of the op-amp, which has a feedback resistor Rf.

![3-bit binary weighted resistor DAC with resistors R, 2R and 4R feeding an inverting adder](/diagrams/digital-logic/dac-weighted-resistor.svg)

**Output (3-bit, with R = 2Rf):**

```text
 V0 = (VR / 2) × (b2 + b1/2 + b0/4)
```

For n bits: V0 = (VR / 2) × (bn−1 + bn−2/2 + … + b0/2ⁿ⁻¹).

**Worked example:** a 3-bit weighted resistor DAC with VR = 8 V gives V0 = 4 × (b2 + b1/2 + b0/4):

| Input b2 b1 b0 | Decimal | V0 |
| --- | --- | --- |
| 000 | 0 | 0 V |
| 001 | 1 | 1 V |
| 010 | 2 | 2 V |
| 011 | 3 | 3 V |
| 100 | 4 | 4 V |
| 101 | 5 | 5 V |
| 110 | 6 | 6 V |
| 111 | 7 | 7 V |

The step size is 1 V (VR/8), and the output is 1 V × the decimal value of the input. For example, input 101: V0 = 4 × (1 + 0 + 0.25) = 5 V.

**Disadvantages:**

1. It needs **many different resistor values**, and the spread between the smallest (MSB) and largest (LSB) resistor grows rapidly with the number of bits (an 8-bit DAC needs values from R to 128R).
2. Each resistor must be very **precise**, and precise resistors over such a wide range are difficult to make, especially in an IC. So it is practical only for a small number of bits.

### R-2R Ladder DAC

**Definition:** the R-2R ladder DAC is a D/A converter whose resistor network is a **ladder made of only two resistor values, R and 2R**. It gives the same binary-weighted output as the weighted resistor DAC without needing a wide range of resistor values.

**Construction (4-bit):**

1. Resistors of value **R** are connected **in series** along the ladder (the "rails" of the ladder).
2. From each junction (node), a resistor of value **2R** goes to a bit switch (the "rungs" of the ladder). Each switch connects its 2R resistor to 0 V when the bit is 0 and to the reference voltage VR when the bit is 1.
3. A further **2R** resistor terminates the LSB end of the ladder to ground.
4. The MSB end of the ladder is connected to the inverting input of an op-amp with feedback resistor Rf, which gives the output voltage.

![4-bit R-2R ladder DAC with series R resistors, 2R legs to the bit switches and an op-amp](/diagrams/digital-logic/dac-r2r-ladder.svg)

**Working:** at every node of the ladder, the resistance looking towards the LSB end is 2R, in parallel with the 2R leg to the switch, so the current divides equally at each node. As a result, the effect of each bit on the output is **half the effect of the next more significant bit**: the bits are binary weighted, and the output is proportional to the binary value of the input, just as in the weighted resistor DAC. (A general output formula for the ladder is difficult to write in a simple form, so the output is usually found for each input combination.)

**Advantages:**

1. Only **two resistor values** (R and 2R) are needed, so accurate, matched resistors are much easier to make, especially in an IC.
2. The DAC is easily **extended**: one more bit needs only one more R-2R section.
3. It is more accurate than the weighted resistor DAC for the same number of bits.

For these reasons, the R-2R ladder DAC is **preferred** over the binary weighted resistor DAC.

### Differences Between Weighted Resistor and R-2R Ladder DACs

| Basis | Binary weighted resistor DAC | R-2R ladder DAC |
| --- | --- | --- |
| Resistor values | Many: R, 2R, 4R, 8R, … | Only two: R and 2R |
| Spread of resistor values | Very wide for many bits | No spread |
| Number of resistors (n bits) | n | About 2n |
| Accuracy | Hard to make accurate for many bits | Easier to make accurate |
| Adding more bits | Needs a new, larger resistor value | Add one more R-2R section |
| Use | Small number of bits | Preferred in practice, including in ICs |

## Digital Ramp A/D Converter {#digital-ramp-a-d-converter}

**Definition:** the digital ramp ADC (also called the **counter type ADC**) is an A/D converter in which a **counter counts upwards** from zero, a **DAC** converts the count into a voltage, and a **comparator** stops the counter when this voltage reaches the analog input. The final count is the digital output. Because the DAC output rises in equal steps like a staircase, it is called a "digital ramp" (or staircase ramp) ADC.

### Block Diagram

1. **Control logic:** starts a conversion, resets the counter and enables or disables the clock.
2. **Clock generator:** gives the pulses that are counted.
3. **Counter (n-bit):** counts the clock pulses; its value is the digital output.
4. **DAC:** converts the count into an analog voltage **Va**.
5. **Comparator:** compares the analog input **Vi** with Va. Its output is 1 while Vi > Va and becomes 0 when Va ≥ Vi.
6. **AND gate:** passes the clock pulses to the counter while the comparator output is 1, and blocks them when it becomes 0.

![Block diagram of a digital ramp (counter type) ADC: clock, counter, DAC, comparator and control logic](/diagrams/digital-logic/adc-digital-ramp.svg)

### Working

1. A **start** signal makes the control logic **reset the counter to 0** and enable the clock.
2. With each clock pulse, the counter **increases by 1**, and the DAC output Va rises by one step.
3. The comparator compares Vi and Va. While **Vi > Va**, its output stays 1 and counting continues.
4. When Va becomes **equal to or greater than Vi**, the comparator output becomes 0, and the control logic **stops the clock**.
5. The number now in the counter is the **digital output**, which represents Vi.

![Staircase DAC voltage Va rising step by step until it crosses the input Vi](/diagrams/digital-logic/adc-ramp-waveform.svg)

**Worked example:** the DAC step size is 0.5 V and the input is Vi = 2.7 V. The counter counts 1, 2, 3, …, and Va becomes 0.5 V, 1.0 V, 1.5 V, 2.0 V, 2.5 V, 3.0 V. At the **6th** pulse, Va = 3.0 V ≥ 2.7 V, so the clock stops and the output is **0110** (6). The output represents 3.0 V, which differs from 2.7 V by less than one step.

### Conversion Time

The number of clock pulses needed depends on the input: a small Vi needs few pulses, and the largest Vi needs the counter to count all the way up. For an **n-bit** converter, the **maximum conversion time is (2ⁿ − 1) clock periods**.

**Example:** an 8-bit digital ramp ADC with a 1 MHz clock (1 µs period) needs up to 2⁸ − 1 = 255 clock pulses, so its maximum conversion time is **255 µs**.

### Advantages and Disadvantages

**Advantages:**

1. **Simple** circuit and easy to understand.
2. **Low cost**.
3. Good **linearity** and accuracy (each step of the DAC is equal).

**Disadvantages:**

1. **Slow**: the conversion time can be as long as (2ⁿ − 1) clock pulses, and it doubles for every extra bit.
2. The **conversion time is not constant**; it depends on the input voltage.
3. The counter starts from 0 for every conversion, even if the input has changed only a little.
4. The circuit becomes more complex, and the conversion slower, as the resolution (number of bits) increases.

**Applications:** digital multimeters, instrumentation and measurement, data acquisition from sensors, and medical equipment (such as ECG machines), where the input changes slowly.

## Resolution, Accuracy and Conversion Time {#resolution-accuracy-and-conversion-time}

These are the main specifications used to describe and compare A/D and D/A converters.

### Resolution

**Definition:** resolution is the **smallest change in the analog quantity that the converter can distinguish** (for an ADC) or **produce** (for a DAC). It is stated in three ways:

1. **In bits (n):** the number of bits of the converter. An n-bit converter has **2ⁿ** different digital codes (levels). An 8-bit converter has 2⁸ = 256 levels, and a 16-bit converter has 65,536.
2. **As a voltage (step size, or 1 LSB):** the analog value of one step:

```text
 Step size (resolution) Q = full-scale range / 2ⁿ
```

3. **As a percentage of full scale:**

```text
 % resolution = (1 / 2ⁿ) × 100
```

(Some textbooks define full scale as the largest output, with all bits 1; then step size = full-scale output / (2ⁿ − 1) and % resolution = 1 / (2ⁿ − 1) × 100. Check which convention a question uses.)

**Worked examples:**

1. A 3-bit ADC with a 0 to 1 V range: Q = 1 V / 2³ = 1 / 8 = **0.125 V**.
2. An 8-bit ADC with a 0 to 10 V range: Q = 10 V / 256 ≈ **39 mV**, and % resolution = (1 / 256) × 100 ≈ **0.39 %**.

**More bits give finer resolution:** each extra bit doubles the number of levels and halves the step size.

### Quantization Error

Because an ADC can give only whole steps, every analog value is rounded to the nearest level. The difference between the actual input and the value represented by the output is the **quantization error**. In an ideal ADC, it lies between **−½ LSB and +½ LSB**. It can be made smaller only by using more bits (a smaller step size).

### Accuracy

**Definition:** accuracy is **how close the actual output of a converter is to the ideal (expected) output**.

1. For a **DAC**, it compares the actual analog output with the ideal output for each input code.
2. For an **ADC**, it compares the analog value represented by the digital output with the actual input.

Accuracy is usually stated as a **percentage of full scale** or in **LSBs** (for example, ±½ LSB). It is reduced by quantization error, non-linearity (unequal steps), offset and gain errors, and inexact resistor values. **Resolution and accuracy are different:** resolution is the size of the smallest step, while accuracy is how correct each output is; a converter can have fine resolution but poor accuracy.

### Conversion Time

**Definition:** the conversion time of an ADC is the **time from the start of a conversion until the valid digital output is available**. The shorter the conversion time, the more samples can be taken each second.

| ADC type | Conversion time (n bits) |
| --- | --- |
| Digital ramp (counter) | Up to (2ⁿ − 1) clock periods; depends on the input |
| Successive approximation | n clock periods; constant |
| Flash | One comparison step; the fastest |
| Dual slope | Long (slowest of these); used where accuracy matters more than speed |

**Example:** with a 1 MHz clock, an 8-bit counter type ADC needs up to 255 µs, but an 8-bit successive approximation ADC needs only 8 µs.

Because the input must not change during a conversion, a **sample-and-hold circuit** is used in front of an ADC to hold the input constant while it is being converted.

## ADC and DAC Circuits {#adc-and-dac-circuits}

### Types of DAC

1. **Binary weighted resistor DAC** (see [Ladder-Type D/A Converter](#ladder-type-d-a-converter))
2. **R-2R ladder DAC** (see [Ladder-Type D/A Converter](#ladder-type-d-a-converter))

### Types of ADC

1. **Direct type ADCs:** compare the analog input directly with internally generated reference voltages.
   1. **Digital ramp (counter type) ADC** (see [Digital Ramp A/D Converter](#digital-ramp-a-d-converter))
   2. **Successive approximation ADC**
   3. **Flash (parallel) ADC**
2. **Indirect type ADCs:** first convert the analog input into another quantity, such as time, and then into binary.
   1. **Dual-slope (integrating) ADC**

### Successive Approximation ADC

**Construction:** like the digital ramp ADC, but the counter is replaced by a **successive approximation register (SAR)**. The blocks are the clock, the SAR, a DAC, a comparator and the control logic.

![Block diagram of a successive approximation ADC](/diagrams/digital-logic/adc-successive-approximation.svg)

**Working:** the SAR finds the output **one bit at a time, starting from the MSB**, like a binary search:

1. All the bits of the SAR are cleared, and the **MSB is set to 1** (trial value).
2. The DAC converts the trial value to Va, and the comparator compares it with Vi.
3. If **Va ≤ Vi**, the bit is **kept at 1**; if **Va > Vi**, the bit is **reset to 0**.
4. The next lower bit is set to 1 and tested in the same way, until all n bits have been tested.

**Worked example:** a 4-bit SAR ADC with a step size of 1 V, and Vi = 10.3 V.

| Clock | Trial code | Va | Comparison | Decision | Result so far |
| --- | --- | --- | --- | --- | --- |
| 1 | 1000 | 8 V | 8 ≤ 10.3 | Keep MSB = 1 | 1000 |
| 2 | 1100 | 12 V | 12 > 10.3 | Reset this bit to 0 | 1000 |
| 3 | 1010 | 10 V | 10 ≤ 10.3 | Keep this bit = 1 | 1010 |
| 4 | 1011 | 11 V | 11 > 10.3 | Reset LSB to 0 | 1010 |

The output is **1010** (10), found in only **4 clock pulses** (n pulses for n bits).

**Features:** fast, with a **fixed conversion time of n clock pulses** for every input; widely used (for example, the **ADC0809** is an 8-bit successive approximation ADC IC).

### Flash (Parallel) ADC

**Construction (3-bit):**

1. A **voltage divider of 8 equal resistors** connected to the reference voltage VR gives the reference voltages VR/8, 2VR/8, …, 7VR/8.
2. **7 comparators** compare the input Vi (at their + inputs) with these reference voltages (at their − inputs), **all at the same time**.
3. A **priority encoder** (8-to-3) converts the comparator outputs into the 3-bit binary output (see [Encoder and Decoder](/topics/digital-logic/combinational-circuits#encoder-and-decoder)).

![3-bit flash ADC with eight resistors, seven comparators and a priority encoder](/diagrams/digital-logic/adc-flash-3bit.svg)

**Working:** each comparator gives 1 if Vi is above its reference voltage. For example, with VR = 8 V the references are 1 V to 7 V; if Vi = 5.6 V, comparators C1 to C5 give 1 and C6, C7 give 0, so the priority encoder gives **101** (5).

**Features:**

1. It is the **fastest** ADC, because all the comparisons are made **in parallel** in one step.
2. An n-bit flash ADC needs **2ⁿ − 1 comparators** (3 bits: 7; 8 bits: 255), so it becomes large, costly and power-hungry for many bits.

### Dual-Slope ADC

**Construction:** an **integrator**, a **comparator** (comparing the integrator output with 0 V), a **clock**, a **counter** and **control logic**.

**Working:**

1. The integrator integrates the **input voltage Vi** for a **fixed time** (until the counter overflows to zero), so its output rises to a value proportional to Vi.
2. The control logic then switches the integrator to a **reference voltage of opposite polarity** (−Vref), so the integrator output falls back towards zero at a fixed rate, and the counter counts during this time.
3. When the integrator output reaches **0 V**, the comparator stops the clock. The count in the counter is **proportional to Vi** and is the digital output.

**Features:** **very accurate** but **slow** (its conversion time doubles for each extra bit); used where accuracy is more important than speed, for slowly varying signals such as those from temperature sensors (the **ICL7109** is a 12-bit dual-slope ADC IC).

### Comparison of ADC Types

| Basis | Digital ramp (counter) | Successive approximation | Flash | Dual slope |
| --- | --- | --- | --- | --- |
| Main parts | Counter, DAC, comparator | SAR, DAC, comparator | Resistor divider, 2ⁿ − 1 comparators, encoder | Integrator, comparator, counter |
| Conversion time (n bits) | Up to 2ⁿ − 1 clock pulses | n clock pulses | One step | Long |
| Conversion time constant? | No (depends on input) | Yes | Yes | Depends on input |
| Speed | Slow | Fast | Fastest | Slowest |
| Cost and complexity | Low | Medium | High (many comparators) | Medium |
| Typical use | Simple, low-cost systems | General purpose, data acquisition | Very high-speed conversion | Accurate measurement of slowly varying signals |

### Differences Between ADC and DAC

| Basis | ADC | DAC |
| --- | --- | --- |
| Conversion | Analog → digital | Digital → analog |
| Input | One analog voltage | n binary bits |
| Output | n binary bits | One analog voltage (or current) |
| Main parts | Comparator, counter or SAR, DAC, clock | Resistor network, switches, op-amp |
| Position in a system | At the input of a digital system | At the output of a digital system |
| Example IC | ADC0809 (8-bit, successive approximation) | DAC0808 (8-bit) |

## References {#references}

**GeeksforGeeks**
- [Counter-Type Analog-to-Digital Converter (ADC)](https://www.geeksforgeeks.org/digital-logic/counter-type-analog-to-digital-converter-adc/) — accessed 2026-11-01

**TutorialsPoint**

- [Digital to Analog Converters](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_digital_to_analog_converters.htm) — accessed 2026-11-01
- [Direct Type ADCs](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_direct_type_adcs.htm) — accessed 2026-11-01
- [Indirect Type ADC](https://www.tutorialspoint.com/linear_integrated_circuits_applications/linear_integrated_circuits_applications_indirect_type_adc.htm) — accessed 2026-11-01
- [Analog to Digital Converter](https://www.tutorialspoint.com/digital-electronics/analog-to-digital-converter.htm) — accessed 2026-11-01
- [Digital to Analog Converter](https://www.tutorialspoint.com/digital-electronics/digital-to-analog-converter.htm) — accessed 2026-11-01
- [DAC and ADC ICs](https://www.tutorialspoint.com/digital-electronics/dac-and-adc-ics.htm) — accessed 2026-11-01

**Additional sources**

- [Analog-to-digital converter](https://en.wikipedia.org/wiki/Analog-to-digital_converter) — Wikipedia, accessed 2026-11-01
- [Digital-to-analog converter](https://en.wikipedia.org/wiki/Digital-to-analog_converter) — Wikipedia, accessed 2026-11-01
- [Digital to analog converter (theory)](https://aec-iitkgp.vlabs.ac.in/exp/digital-analog-converter/theory.html) — Virtual Labs, IIT Kharagpur, accessed 2026-11-01
