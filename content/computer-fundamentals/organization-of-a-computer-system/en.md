---
description: The five functional units of a computer (input, memory, ALU, output and control) and how they work together.
updated: 2026-11-01
---

A computer system is organized into five functional units:

1. **Input Unit**
2. **Memory Unit**
3. **Arithmetic Logic Unit (ALU)**
4. **Output Unit**
5. **Control Unit (CU)**

The ALU and the Control Unit together form the **Central Processing Unit (CPU)**, which is called the *brain of the computer*.

```text
                 ┌──────────── Central Processing Unit (CPU) ────────────┐
                 │   ┌───────────────────┐     ┌──────────────────────┐  │
                 │   │ Control Unit (CU) │     │ Arithmetic Logic     │  │
                 │   │                   │     │ Unit (ALU)           │  │
                 │   └───────────────────┘     └──────────────────────┘  │
                 └────────────────────────────▲───────────┬──────────────┘
                                              │           │
                                              │           ▼
 ┌──────────────┐          ┌───────────────────────────────────┐          ┌───────────────┐
 │  Input Unit  │ ───────► │            Memory Unit            │ ───────► │  Output Unit  │
 └──────────────┘          └───────────────────────────────────┘          └───────────────┘

  ───►  flow of data and instructions
  The Control Unit sends control signals to every unit and coordinates their work.
```

## Input Unit {#input-unit}

**Definition:** The input unit consists of the devices through which data and instructions are entered into the computer from the outside world.

**Functions of the input unit:**

1. It **accepts** data and instructions from the user or from another source.
2. It **converts** the data and instructions into **binary form** (0 and 1), which the computer can understand.
3. It **sends** the converted data and instructions to the **memory unit** for processing.

**Examples of input devices:**

1. Keyboard
2. Mouse
3. Joystick
4. Light pen
5. Track ball
6. Scanner
7. Graphic tablet (digitizer)
8. Microphone
9. Touch screen
10. MICR (Magnetic Ink Character Reader)
11. OCR (Optical Character Reader)
12. OMR (Optical Mark Reader)
13. Barcode reader
14. Biometric devices

## Memory Unit {#memory-unit}

**Definition:** The memory unit (also called the *storage unit*) stores data and instructions, and supplies them whenever they are needed.

**Functions of the memory unit:**

1. It stores all the **data and instructions** required for processing.
2. It stores the **intermediate results** of processing.
3. It stores the **final results** of processing before they are sent to an output device.
4. All inputs and outputs are passed through the main memory.

**Types of memory:**

| Type | Description | Examples |
| --- | --- | --- |
| **Primary memory** (main memory) | Stores instructions and data during program execution. RAM is **volatile**: its contents are lost when the power is turned off (ROM is non-volatile). Cache is a small, faster memory placed closer to the CPU than RAM. | RAM, ROM, cache memory |
| **Secondary memory** (auxiliary storage) | Stores data permanently; it is **non-volatile**, so data remains after the power is turned off. | Hard disk (HDD), solid-state drive (SSD), pen drive, CD/DVD |

Memory is explained in detail in [Memory](/topics/computer-architecture/memory) and [Secondary Storage Devices](/topics/computer-architecture/secondary-storage-devices).

## Arithmetic Logic Unit (ALU) {#arithmetic-logic-unit-alu}

**Definition:** The Arithmetic Logic Unit (ALU) is the part of the CPU that performs all **arithmetic** and **logical** operations on data.

The ALU has two sections:

1. **Arithmetic section:** performs arithmetic operations such as **addition, subtraction, multiplication and division**.
2. **Logic section:** performs logical operations such as **comparing, selecting, matching and merging** of data, and logic operations such as **AND, OR, NOT and XOR**.

**Functions of the ALU:**

1. Performs arithmetic calculations.
2. Performs logical operations.
3. **Compares** two values and finds whether one is equal to, greater than or less than the other. This allows the computer to take decisions.
4. Works under the direction of the **control unit**: it receives data from memory, processes it, and sends the result back to memory.

## Output Unit {#output-unit}

**Definition:** The output unit consists of the devices through which the computer gives the processed results (information) to the user or to another system.

**Functions of the output unit:**

1. It **accepts** the results produced by the computer, which are in binary form.
2. It **converts** the results into a form that people can understand (text, pictures, sound or print).
3. It **supplies** the converted results to the user or to another system.

**Examples of output devices:**

1. Monitor
2. Printer
3. Graphic plotter
4. Speaker
5. Headphones
6. Projector

## Control Unit {#control-unit}

**Definition:** The Control Unit (CU) is the part of the CPU that **directs and coordinates** the operations of all the other units of the computer. It works like the manager of the computer.

**Functions of the control unit:**

1. It **obtains (fetches)** instructions from memory, **interprets (decodes)** them, and directs the operation of the computer to **execute** them.
2. It **controls the transfer** of data and instructions among the other units of the computer.
3. It **manages and coordinates** all the units of the computer.
4. It sends **control signals** to the memory, the ALU and the input/output devices.
5. It communicates with input and output devices for the transfer of data or results.
6. It handles interruptions (interrupts), such as hardware failures and external events.

> **Remember:** The control unit **does not process or store data** itself. It only directs the other units. Processing is done by the ALU, and storage by the memory unit.

## References {#references}

**IT Job QnS**

- [NTRCA IT Job Solution](https://it.jobqns.com/ntrca-it-job-solution/) (15th NTRCA written question on the internal blocks of a computer) — accessed 2026-11-01

**TutorialsPoint**

- [Computer – Components](https://www.tutorialspoint.com/computer_fundamentals/computer_components.htm) — accessed 2026-11-01
- [Computer – CPU](https://www.tutorialspoint.com/computer_fundamentals/computer_cpu.htm) — accessed 2026-11-01
- [Computer – Quick Guide](https://www.tutorialspoint.com/computer_fundamentals/computer_quick_guide.htm) (functions of the memory unit, control unit and ALU) — accessed 2026-11-01
- [Computer – Input Devices](https://www.tutorialspoint.com/computer_fundamentals/computer_input_devices.htm) — accessed 2026-11-01
- [Computer – Output Devices](https://www.tutorialspoint.com/computer_fundamentals/computer_output_devices.htm) — accessed 2026-11-01
- [Computer – Memory](https://www.tutorialspoint.com/computer_fundamentals/computer_memory.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Components of a Computer](https://www.geeksforgeeks.org/computer-science-fundamentals/functional-components-of-a-computer/) — accessed 2026-11-01

**TpointTech**

- [Components of Computer](https://www.tpointtech.com/components-of-computer) — accessed 2026-11-01
- [Central Processing Unit (CPU)](https://www.tpointtech.com/central-processing-unit-cpu) — accessed 2026-11-01

**Additional sources**

- [Control unit](https://en.wikipedia.org/wiki/Control_unit) — Wikipedia, accessed 2026-11-01
- [Arithmetic logic unit](https://en.wikipedia.org/wiki/Arithmetic_logic_unit) — Wikipedia, accessed 2026-11-01
