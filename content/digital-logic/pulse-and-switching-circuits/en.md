---
description: Asynchronous sequential circuits in fundamental mode and pulse mode, pulse parameters, mechanical, electromechanical and electronic switches, the transistor as a switch, and the astable, monostable and bistable multivibrators.
updated: 2026-11-01
---

## Pulse Mode and Fundamental Mode Logic {#pulse-mode-and-fundamental-mode-logic}

### Asynchronous Sequential Circuits

**Synchronous sequential circuits** (for example, clocked counters and registers) change state only at the clock pulses, so they operate in **pulse mode** with the clock as the timing signal (see [Flip-Flops](/topics/digital-logic/flip-flops)).

**Definition:** an **asynchronous sequential circuit** is a sequential circuit that has **no clock**. Its state changes **as soon as its inputs change**. It is a combinational circuit with **feedback**: some outputs (the next-state variables **Y**) are fed back as inputs (the present-state variables **y**). The memory of the circuit is the **delay (Δ)** of the feedback path, or un-clocked latches.

![Model of an asynchronous sequential circuit: a combinational circuit whose next-state outputs are fed back through a delay](/diagrams/digital-logic/async-sequential-model.svg)

**Stable and unstable states:**

1. After a delay Δ, the present state y takes the value of the next state Y.
2. If, for the present inputs, **y = Y**, nothing more changes: the circuit is in a **stable state**.
3. If **y ≠ Y**, the circuit is in an **unstable (transient) state** and keeps changing until it reaches a stable state.

**Example:** the SR latch made of two cross-coupled NOR gates (see [Basic Flip-Flops](/topics/digital-logic/flip-flops#basic-flip-flops)) is the simplest asynchronous sequential circuit. Its next state is Y = R′(S + y): with S = 1 and R = 0 it settles in the stable state y = 1, and with S = 0 and R = 0 it stays in whichever state it was in.

Asynchronous sequential circuits are operated in one of two modes: **fundamental mode** or **pulse mode**.

### Fundamental Mode

**Definition:** an asynchronous circuit operates in **fundamental mode** when its inputs are **levels** (0 or 1 held steady) and these two conditions are met:

1. **Only one input changes at a time.**
2. After an input change, there is **enough time for the circuit to reach a stable state** (all internal signals stop changing) before the next input change.

The memory elements are the **delays** in the feedback paths (or un-clocked latches). The behaviour is described by a flow table that shows, for each present state and input combination, the next state; stable states are marked (circled).

### Pulse Mode

**Definition:** an asynchronous circuit operates in **pulse mode** when its inputs are **pulses**, not levels, and there is **no clock**. The input pulses themselves supply the timing: they trigger the latches or flip-flops, doing the job that the clock does in a synchronous circuit. The restrictions are:

1. **Only one input line has a pulse at a time** (pulses never occur on two inputs together).
2. Each input pulse must be **long enough** to trigger the storage element, but must **end before the circuit settles** into its new state, so that one pulse causes only one change.
3. Only the **uncomplemented (true)** forms of the input pulses are used.

The storage elements are usually **latches or flip-flops** (for example, SR or T flip-flops), and the circuit is designed much like a synchronous circuit.

### Differences Between Fundamental Mode and Pulse Mode

| Basis | Fundamental mode | Pulse mode |
| --- | --- | --- |
| Form of the inputs | Levels (steady 0 or 1) | Pulses |
| Clock | None | None (the input pulses provide the timing) |
| Input changes | One input changes at a time | A pulse on only one input line at a time |
| Timing condition | The circuit must settle before the next input change | Each pulse must end before the circuit settles |
| Memory elements | Delay in the feedback paths, or un-clocked latches | Latches or flip-flops |
| Design method | Flow tables with stable and unstable states | Similar to synchronous design |

### Advantages and Disadvantages of Asynchronous Circuits

**Advantages:**

1. **No clock**, so there is no waiting for clock edges and no clock-distribution problem; they can be fast.
2. **Lower power consumption**, because circuits switch only when inputs change.
3. Less electromagnetic interference.

**Disadvantages:**

1. **Race conditions:** if two state variables must change at almost the same time, small differences in gate delays can make the circuit settle in the **wrong state**.
2. **Harder to design, test and debug** than synchronous circuits.
3. Few design tools are available for them.

## Pulse and Switching Units {#pulse-and-switching-units}

### Pulse

**Definition:** a **pulse** is a **unidirectional, non-sinusoidal** signal formed by a sudden change from a base value to a new value, which returns to the base value after a fixed time. A series of repeated pulses is a **pulse train**; its high and low levels represent ON (1) and OFF (0), so pulses are the signals of digital circuits.

**Signal direction:**

1. **Unidirectional signal:** varies on one side of zero only (positive or negative), for example a pulse.
2. **Bidirectional signal:** varies above and below zero, crossing the zero line, for example a sine wave.

### Pulse Parameters

![A pulse train showing rise time, fall time, pulse width and period](/diagrams/digital-logic/pulse-parameters.svg)

1. **Amplitude:** the height of the pulse (from the base level to the top).
2. **Rise time (tr):** the time the pulse takes to rise from **10 % to 90 %** of its amplitude.
3. **Fall time (tf):** the time the pulse takes to fall from **90 % to 10 %** of its amplitude.
4. **Pulse width (tw):** the duration of the pulse, usually measured between the **50 %** points of its rising and falling edges.
5. **Period (T):** the time from any point on one pulse to the same point on the next pulse. **Frequency** f = 1 / T.
6. **Duty cycle:** the ratio of the pulse width to the period, D = tw / T (often given as a percentage).
7. **Overshoot:** the edge of the pulse goes **beyond** its normal maximum value.
8. **Undershoot:** the edge goes beyond its normal minimum value when the pulse falls.
9. **Ringing:** the **damped oscillations** that follow an overshoot or undershoot.

**Worked example:** a pulse train has a pulse width of 2 ms and a period of 8 ms. Duty cycle = 2 / 8 = 0.25 = **25 %**, and frequency = 1 / 8 ms = **125 Hz**. (A square wave has a duty cycle of 50 %.)

### Switches

**Definition:** a **switch** is a device that **makes or breaks** an electrical circuit (connects or disconnects it). A switch has two states, ON (closed) and OFF (open), so it is the basic unit of digital (two-state) circuits. A good switch is **fast** and switches **without sparking**.

**Types of switches:**

1. **Mechanical switch:** operated by hand (for example, a toggle switch).
   1. **Disadvantages:** slow (high inertia), sparking at the contacts when breaking a current, and large contacts needed for large currents.
2. **Electromechanical switch (relay):** a current in a coil makes an electromagnet that moves a lever to open or close the contacts of another circuit. Relays come in SPST, SPDT, DPST and DPDT forms.
   1. **Advantages:** a small control current switches a large load current, it can be operated from a distance, and the control circuit is isolated from the load.
   2. **Disadvantages:** slow, and the moving parts wear out.
3. **Electronic switch:** a semiconductor device, usually a **transistor**, that switches without moving parts.
   1. **Advantages:** small and light, **very fast**, no sparking, no moving parts (so little wear and maintenance), quiet, reliable and cheap.

### Transistor as a Switch

A bipolar transistor has three regions of operation:

1. **Cut-off region (switch OFF):** the base-emitter junction is not forward biased, so the collector current IC ≈ 0 (only a tiny leakage current). The transistor behaves as an **open switch**, and **VCE ≈ VCC**.
2. **Saturation region (switch ON):** the base current is large enough to give the maximum collector current, IC(sat) ≈ VCC / RC. The transistor behaves as a **closed switch**, and **VCE ≈ 0** (in practice a small knee voltage).
3. **Active region:** between cut-off and saturation; the transistor works as a linear **amplifier**. This region is avoided in switching (it is passed through quickly).

In both the ON and OFF states, the power lost in the transistor is very small (either the current or the voltage is almost zero), so a transistor is an efficient switch.

**Switching times:** a transistor cannot switch instantly. With a pulse at its input, the times are:

1. **Delay time (td):** from the start of the input pulse until the collector current reaches **10 %** of its final value.
2. **Rise time (tr):** for the collector current to rise from **10 % to 90 %**.
3. **Turn-on time:** t(on) = td + tr.
4. **Storage time (ts):** from the end of the input pulse until the collector current falls to **90 %** (the time needed to remove the extra charge stored in saturation).
5. **Fall time (tf):** for the collector current to fall from **90 % to 10 %**.
6. **Turn-off time:** t(off) = ts + tf.

## Multivibrators {#multivibrators}

**Definition:** a multivibrator is a **two-stage switching circuit** (usually two transistors, each controlling the other through feedback) whose output switches between **two states**, high and low. It generates **non-sinusoidal** waveforms such as **square and rectangular** waves. The two states may be **stable** (the circuit stays there until triggered) or **quasi-stable** (the circuit stays there only for a time set by its RC components, and then leaves it by itself).

**Types of multivibrators:**

| Type | Stable states | Quasi-stable states | Trigger needed | Output | Other name |
| --- | --- | --- | --- | --- | --- |
| **Astable** | 0 | 2 | No (free-running) | Continuous square wave | Free-running multivibrator, square-wave generator |
| **Monostable** | 1 | 1 | One trigger for each output pulse | One pulse of fixed width per trigger | One-shot |
| **Bistable** | 2 | 0 | A trigger to change each state | Stays high or low until triggered | Flip-flop |

![Output waveforms of the astable, monostable and bistable multivibrators](/diagrams/digital-logic/multivibrator-waveforms.svg)

### Astable Multivibrator

**Construction:** two transistors, Q1 and Q2, with **capacitor coupling** both ways: the collector of each transistor is connected to the base of the other through a capacitor (C1, C2), and each base is biased through a resistor (R1, R2).

**Working:**

1. When the supply is switched on, one transistor (say Q1) turns ON first and drives Q2 OFF.
2. The coupling capacitor charges through its resistor until the base voltage of Q2 reaches about 0.7 V; then Q2 turns ON and drives Q1 OFF.
3. The same happens in the other half, so the circuit keeps switching between the two quasi-stable states **by itself**, without any trigger, and the output is a **continuous square wave**.

**Time period:**

```text
 t1 = 0.69 R1C1      (time of one state)
 t2 = 0.69 R2C2      (time of the other state)
 T  = t1 + t2 = 0.69 (R1C1 + R2C2)
 With R1 = R2 = R and C1 = C2 = C:  T = 1.38 RC,  f = 1 / (1.38 RC)
```

**Worked example:** R = 10 kΩ and C = 0.1 µF give RC = 10⁴ × 10⁻⁷ = 1 ms, so T = 1.38 ms and f = 1 / 1.38 ms ≈ **725 Hz**.

**Applications:** square-wave and clock generators, timers, Morse code generators, flashing lights.

### Monostable Multivibrator

**Construction:** two transistors, one coupled through a **capacitor** (giving the quasi-stable state) and the other through a **resistor** (giving the stable state). A trigger input is applied to one transistor.

**Working:**

1. In the **stable state**, one transistor (Q2) is ON and the other (Q1) is OFF, and the circuit stays like this indefinitely.
2. A **trigger pulse** turns Q1 ON and Q2 OFF: the circuit enters the **quasi-stable state**, and the output changes.
3. The coupling capacitor discharges; after a time set by RC, Q2 turns ON again and the circuit **returns to the stable state by itself**.
4. So each trigger produces **one output pulse of fixed width**.

**Pulse width:**

```text
 T = 0.69 RC
```

**Worked example:** R = 10 kΩ and C = 1 µF give RC = 10 ms, so the output pulse lasts T = 0.69 × 10 ms = **6.9 ms**.

**Condition:** the next trigger must come after the circuit has returned to the stable state (the interval between triggers must be longer than the pulse width).

**Applications:** **time-delay** circuits, producing a pulse of fixed width from a short trigger, pulse stretching, timers.

### Bistable Multivibrator

**Construction:** two transistors with **resistor (direct) coupling** both ways: the collector of each transistor is connected to the base of the other through a resistor (with small speed-up capacitors across these resistors to make switching faster).

**Working:**

1. One transistor is ON and the other OFF; the circuit stays in this state **indefinitely** (stable state).
2. A trigger pulse makes the circuit switch to the **other stable state**, where it again stays until the next trigger.
3. Because it keeps its state, a bistable multivibrator **stores one bit**: it is the electronic **flip-flop** (see [Flip-Flops](/topics/digital-logic/flip-flops)).

**Applications:** **memory elements** (storing binary information), **counters**, frequency division and registers.

**Schmitt trigger:** an emitter-coupled form of the bistable circuit that switches its output **high when the input rises above an upper trigger point (UTP)** and **low when the input falls below a lower trigger point (LTP)**. Between the two points the output does not change (this is called **hysteresis**). It is used to **square up slow or noisy signals** and as a voltage-level detector.

### Differences Between the Three Multivibrators

| Basis | Astable | Monostable | Bistable |
| --- | --- | --- | --- |
| Other name | Free-running multivibrator | One-shot multivibrator | Flip-flop |
| Stable states | None | One | Two |
| Coupling between the stages | Both capacitive | One capacitive, one resistive | Both resistive |
| Trigger | Not needed | Needed (one per pulse) | Needed (to change each state) |
| Output | Continuous square wave | One fixed-width pulse per trigger | Changes state at each trigger |
| Timing | T = 0.69(R1C1 + R2C2) | T = 0.69RC | Set by the triggers |
| Adjusted by | Frequency and duty cycle (R and C) | Pulse width (R and C) | Triggers |
| Main use | Clock / square-wave generator, flashing lights | Time delay, pulse generator, switch debouncing | Memory (flip-flop), counters, shift registers |

**General applications of multivibrators:**

1. Clock and **square-wave generators**
2. **Time-delay** generators
3. **Frequency dividers**
4. **Memory elements** in computers (bistable)

## References {#references}

**TutorialsPoint**

- [Pulse Circuits – Signal](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_signal.htm) — accessed 2026-11-01
- [Pulse Circuits – Switch](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_switch.htm) — accessed 2026-11-01
- [Transistor as a Switch](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_transistor_as_switch.htm) — accessed 2026-11-01
- [Multivibrator Overview](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_multivibrator_overview.htm) — accessed 2026-11-01
- [Astable Multivibrator](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_astable_multivibrator.htm) — accessed 2026-11-01
- [Monostable Multivibrator](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_monostable_multivibrator.htm) — accessed 2026-11-01
- [Bistable Multivibrator](https://www.tutorialspoint.com/pulse_circuits/pulse_circuits_bistable_multivibrator.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Astable, Monostable and Bistable Multivibrator](https://www.geeksforgeeks.org/computer-organization-architecture/astable-monostable-and-bistable-multivibrator/) — accessed 2026-11-01
- [Asynchronous Sequential Circuits](https://www.geeksforgeeks.org/digital-logic/asynchronous-sequential-circuits/) — accessed 2026-11-01

**Additional sources**

- [Logic Design: Asynchronous Sequential Circuits (lecture slides)](https://www.ece.mcmaster.ca/~shirani/2di4/chapter9.pdf) — McMaster University, accessed 2026-11-01
- [Digital Logic Design lecture notes (fundamental mode and pulse mode circuits)](https://mrcet.com/downloads/digital_notes/ECE/II%20Year/31082020/DIGITAL%20LOGIC%20DESIGN.pdf) — Malla Reddy College of Engineering and Technology, accessed 2026-11-01
- [Design of Pulse Mode Circuit](https://eee.poriyaan.in/topic/design-of-pulse-mode-circuit-11672/) — Poriyaan, accessed 2026-11-01
- [Asynchronous circuit](https://en.wikipedia.org/wiki/Asynchronous_circuit) — Wikipedia, accessed 2026-11-01
