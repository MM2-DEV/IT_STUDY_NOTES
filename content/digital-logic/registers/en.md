---
description: Registers and shift registers, the SISO, SIPO, PISO and PIPO registers, the step-by-step operation of a 4-bit shift register, the buffer register and the universal shift register.
updated: 2026-11-01
---

## Basic Registers {#basic-registers}

**Definition:** a register is a **group of flip-flops** used to **store a binary word** (several bits) temporarily. Each flip-flop stores one bit, so an **n-bit register has n flip-flops** and stores an n-bit word. For example, a 4-bit register has 4 flip-flops and an 8-bit register has 8 flip-flops.

**Registers in the CPU:** registers are the **fastest storage (memory) devices** of a computer. They are inside the processor (CPU), and **all data is held temporarily in registers before it is processed**. Putting new data into a register is called **loading** it. The number and size of the registers vary from processor to processor.

**Construction:** registers are usually made of **D flip-flops** (see [D and T Flip-Flops](/topics/digital-logic/flip-flops#d-and-t-flip-flops)) that share a **common clock**, so that all the bits change together at the active clock edge. Extra gates are added to control when data is loaded, shifted or cleared.

**Shift register:** a register in which the stored bits can be **moved (shifted) from one flip-flop to the next**, left or right, on each clock pulse is called a **shift register**. The flip-flops are connected in a chain: the output Q of one flip-flop is connected to the input D of the next.

**Basic operations of a register:**

1. **Loading (writing):** putting data into the register, either one bit at a time (serial) or all bits at once (parallel).
2. **Storing:** keeping the data unchanged for as long as needed.
3. **Shifting:** moving the bits one position left or right on each clock pulse.
4. **Reading:** taking data out of the register, serially or in parallel.
5. **Clearing:** resetting all the flip-flops to 0.

**Data input and output:** there are two ways to move data into and out of a register:

1. **Serial:** one bit at a time, on one line, with one clock pulse for each bit.
2. **Parallel:** all the bits at the same time, on separate lines, with a single clock pulse.

**Applications of registers:**

1. **Temporary storage** of data (buffering)
2. As **cache memory**
3. As **buffers in printers and keyboards**
4. In **calculators and digital watches**
5. **Serial-to-parallel** and **parallel-to-serial** data conversion
6. **Delaying** a signal by a number of clock pulses
7. **Multiplying or dividing a binary number by 2** (shifting left or right)
8. Building **counters** (ring and Johnson counters; see [Counters](/topics/digital-logic/counters))

## Classification of Registers {#classification-of-registers}

Registers are classified in several ways:

1. **By construction:**
   1. **Buffer (parallel load) register** (see [Buffer Register](#buffer-register))
   2. **Shift register**
2. **By the work they do:**
   1. **Accumulator register:** a special register of the arithmetic logic unit (ALU) that holds the result of arithmetic and logic operations.
   2. **General-purpose registers:** used to store any data temporarily.
   3. **Special-purpose registers:** used for particular instructions or tasks (see the CPU registers below).
3. **By the way data enters and leaves them:** SISO, SIPO, PISO and PIPO (below).
4. **By the direction of shifting:** left, right, bidirectional and universal (below).

### Types of Shift Registers by Data Input and Output

1. **Serial-In Serial-Out (SISO)**
2. **Serial-In Parallel-Out (SIPO)**
3. **Parallel-In Serial-Out (PISO)**
4. **Parallel-In Parallel-Out (PIPO)**

#### 1. Serial-In Serial-Out (SISO) Shift Register

Data enters **one bit at a time** at the serial input (Din) and leaves **one bit at a time** at the serial output (the last flip-flop). The output Q of each flip-flop is connected to the D input of the next. On every clock pulse, every bit moves one position along the chain.

![4-bit SISO shift register made of four D flip-flops with a common clock](/diagrams/digital-logic/shift-register-siso.svg)

1. Entering a 4-bit word takes **4 clock pulses**.
2. Because each bit reaches the output only after passing through all the flip-flops, a SISO register is used as a **delay circuit** (an n-bit SISO register delays the data by n clock pulses).

#### 2. Serial-In Parallel-Out (SIPO) Shift Register

Data enters **serially** (one bit per clock pulse), but the outputs of **all the flip-flops are available together** (Q3, Q2, Q1, Q0). After n clock pulses, the whole n-bit word can be read at once. It is used for **serial-to-parallel conversion**, for example to receive data that arrives one bit at a time on a single line.

![4-bit SIPO shift register: data enters serially and Q3 to Q0 are read in parallel](/diagrams/digital-logic/shift-register-sipo.svg)

#### 3. Parallel-In Serial-Out (PISO) Shift Register

All the bits are **loaded at the same time** (in parallel) from separate input lines, and then **shifted out one bit at a time** at the serial output. A control input (**SHIFT/LOAD**) chooses the mode:

1. **Load mode:** gates between the flip-flops connect each parallel input to its flip-flop, so all the bits are loaded on one clock pulse.
2. **Shift mode:** the parallel inputs are blocked, and each flip-flop receives the output of the previous one, so the data moves one position on each clock pulse and leaves serially.

It is used for **parallel-to-serial conversion**, for example to send a byte over a single line.

#### 4. Parallel-In Parallel-Out (PIPO) Register

All the bits are **loaded at the same time** and are **available at the outputs at the same time**. There is no connection between the flip-flops; each flip-flop simply stores its own bit. **One clock pulse** loads the whole word. It is used for **temporary storage** (see [Buffer Register](#buffer-register)).

![4-bit PIPO register: inputs D3 to D0 load together and outputs Q3 to Q0 are read together](/diagrams/digital-logic/register-pipo.svg)

#### Comparison of the Four Types (n-bit register)

| Type | Data in | Data out | Clock pulses to load | Main use |
| --- | --- | --- | --- | --- |
| SISO | Serial | Serial | n (and n − 1 more to shift the rest out) | Delay |
| SIPO | Serial | Parallel | n | Serial-to-parallel conversion |
| PISO | Parallel | Serial | 1 (then one per bit to shift out) | Parallel-to-serial conversion |
| PIPO | Parallel | Parallel | 1 | Temporary storage |

### Types of Shift Registers by Direction of Shifting

1. **Shift-right register:** each bit moves one position to the **right** on each clock pulse. Shifting a binary number one place right **divides it by 2**.
2. **Shift-left register:** each bit moves one position to the **left** on each clock pulse. Shifting a binary number one place left **multiplies it by 2**.
3. **Bidirectional shift register:** can shift **either left or right**. A mode-control input selects the direction (gates between the flip-flops connect each D input either to the flip-flop on its left or to the one on its right), with a separate serial input for each direction.
4. **Universal shift register:** can shift left, shift right, load in parallel and hold (see [Universal Shift Register](#universal-shift-register)).

**Example of multiplying and dividing:** 0110 (6) shifted left gives 1100 (12), which is 6 × 2; 0110 (6) shifted right gives 0011 (3), which is 6 ÷ 2.

### Differences Between Shift Register and Buffer Register

| Basis | Shift register | Buffer (parallel load) register |
| --- | --- | --- |
| Main work | Stores data and **shifts** it | Only **stores** data temporarily |
| Data transfer | **Serial** register | **Parallel** register |
| Connection | Flip-flops joined in a chain: the output of each goes to the input of the next | Each flip-flop is independent; one clock pulse loads all the bits |
| Use | Data shifting, serial-parallel conversion (for example, in digital displays) | Temporary storage between devices of different speeds (for example, between the CPU and input/output devices) |

### Registers of the CPU

Besides general-purpose registers, a processor has special registers, for example:

1. **Program counter (PC):** holds the **address of the next instruction** to be executed (also called the instruction pointer).
2. **Memory address register (MAR):** holds the **address** of the memory location to be read or written.
3. **Memory buffer register (MBR):** holds the **data** being read from or written to memory.
4. **Memory data register (MDR):** holds a copy of the instruction or data fetched from main memory.
5. **Accumulator (AC):** holds the results of arithmetic and logic operations in the ALU.
6. **Current instruction register (CIR / IR):** holds the instruction fetched from memory while the control unit decodes and executes it.
7. **Stack control register:** manages the **stack**, a part of memory used in **last in, first out (LIFO)** order.
8. **Flag (status) register:** shows the **current status** of the processor (for example, whether a result was zero or negative).
9. **Input/output register:** used to communicate with input/output devices.
10. **Stack pointer (SP):** holds the address of the top of the stack.
11. **Floating-point registers:** hold real (floating-point) numbers for floating-point arithmetic.

**Advantages of registers:** they are the **fastest** storage, being inside the CPU, so data in registers is processed without slower trips to main memory. **Disadvantages:** their **capacity is very small** (a register holds one word, typically 8 to 64 bits), and they are **costly**, because each bit needs a flip-flop.

(These registers are studied further in [Computer Architecture](/topics/computer-architecture).)

## Operation of a 4-bit Shift Register {#operation-of-a-4-bit-shift-register}

Take the 4-bit SISO shift register above: four D flip-flops FF3, FF2, FF1 and FF0, with a common clock. The serial input Din goes to FF3, Q3 goes to the D input of FF2, Q2 to FF1, Q1 to FF0, and **Q0 is the serial output**. At each active clock edge:

1. FF3 takes the bit at Din.
2. FF2 takes the old value of Q3, FF1 takes the old Q2, and FF0 takes the old Q1.
3. The old value of Q0 leaves the register (it appears at the serial output before the edge).

So **all the bits move one position to the right** at the same time.

### Worked Example: Storing 1011

The register starts cleared (0000). The word 1011 is entered **LSB first**, so the bits applied to Din are 1, 1, 0, 1, one bit per clock pulse.

| Clock pulse | Din | Q3 | Q2 | Q1 | Q0 |
| --- | --- | --- | --- | --- | --- |
| Initial | — | 0 | 0 | 0 | 0 |
| 1 | 1 (LSB) | 1 | 0 | 0 | 0 |
| 2 | 1 | 1 | 1 | 0 | 0 |
| 3 | 0 | 0 | 1 | 1 | 0 |
| 4 | 1 (MSB) | 1 | 0 | 1 | 1 |

After **4 clock pulses**, the register holds **Q3 Q2 Q1 Q0 = 1011**.

1. **Reading in parallel (SIPO):** the whole word 1011 is now available on Q3 to Q0.
2. **Reading serially (SISO):** Q0 already shows the LSB (1). Applying three more clock pulses (with Din = 0) shifts the remaining bits out of Q0 one by one:

| Clock pulse | Din | Q3 | Q2 | Q1 | Q0 (serial output) |
| --- | --- | --- | --- | --- | --- |
| 5 | 0 | 0 | 1 | 0 | 1 |
| 6 | 0 | 0 | 0 | 1 | 0 |
| 7 | 0 | 0 | 0 | 0 | 1 |

The serial output gives 1 (after pulse 4), 1, 0, 1: the word 1011, LSB first. So for a 4-bit SISO register, **4 clock pulses enter the word** and **3 more pulses** are needed to bring all of it out (2n − 1 = 7 pulses in all).

## Buffer Register {#buffer-register}

**Definition:** a buffer register is the **simplest register**: a group of **D flip-flops with a common clock** that **stores a binary word temporarily**. The data is applied to the D inputs in parallel, and **at the active clock edge all the bits are stored together**; the stored word is available at the Q outputs in parallel. So a buffer register is a **parallel-in parallel-out (PIPO)** register with no shifting.

![4-bit buffer register (PIPO): four D flip-flops with a common clock](/diagrams/digital-logic/register-pipo.svg)

**Working:**

1. The word to be stored (for example D3 D2 D1 D0 = 1010) is applied to the D inputs.
2. At the active clock edge, each flip-flop copies its D input: Q3 Q2 Q1 Q0 = 1010.
3. The word stays stored until a new word is loaded at a later clock edge.

### Controlled Buffer Register

In a basic buffer register, a new word is loaded at **every** clock edge, so the data cannot be kept unchanged while the clock runs. A **controlled buffer register** adds control inputs:

1. **LOAD:** when **LOAD = 1**, the input word is loaded at the next clock edge; when **LOAD = 0**, each flip-flop is fed back its **own output**, so the register **keeps its contents** even though the clock is running. (This choice is made with a 2-to-1 multiplexer, or equivalent gates, in front of each D input.)
2. **CLR (clear):** resets all the flip-flops to 0.

**Uses of buffer registers:**

1. **Temporary storage** of a data word, for example between two parts of a digital system that work at different times or speeds.
2. Holding the input or output data of a processor or another digital circuit (data buffering).

## Universal Shift Register {#universal-shift-register}

**Definition:** a universal shift register is a register that can perform **all the register operations**: **shift right**, **shift left**, **parallel load** and **hold (no change)**. So it supports serial and parallel input and serial and parallel output.

**Construction:** an n-bit universal shift register is made of **n D flip-flops** and **n 4 × 1 multiplexers**. The output of each multiplexer drives the D input of one flip-flop, and **all the multiplexers share the same two select lines S1 and S0**. The four inputs of each multiplexer are:

| MUX input | Connected to | Operation |
| --- | --- | --- |
| 0 | The flip-flop's own output | Hold (no change) |
| 1 | Output of the previous flip-flop (or the serial input for shift right) | Shift right |
| 2 | Output of the next flip-flop (or the serial input for shift left) | Shift left |
| 3 | The parallel input bit for this flip-flop | Parallel load |

![One stage of a universal shift register: a 4×1 MUX selects the D input of the flip-flop](/diagrams/digital-logic/universal-shift-register-stage.svg)

**Mode-control table:**

| S1 | S0 | Operation |
| --- | --- | --- |
| 0 | 0 | No change (hold) |
| 0 | 1 | Shift right |
| 1 | 0 | Shift left |
| 1 | 1 | Parallel load |

**Example IC:** the **74LS194A** is a 4-bit bidirectional universal shift register with parallel inputs and outputs, separate shift-right and shift-left serial inputs, two mode-control inputs (S0, S1), positive-edge-triggered clocking and a direct clear input. Its four modes are: parallel load when S0 and S1 are both high, shift right when S0 is high and S1 is low, shift left when S0 is low and S1 is high, and no change (clock inhibited) when both are low.

**Applications:**

1. Serial-to-parallel and parallel-to-serial data conversion
2. Arithmetic operations (multiplication and division by 2 by shifting)
3. Temporary data storage
4. Delay circuits
5. Counters (ring and Johnson counters)

## References {#references}

**TutorialsPoint**

- [Digital Circuits – Shift Registers](https://www.tutorialspoint.com/digital_circuits/digital_circuits_shift_registers.htm) — accessed 2026-11-01

**GeeksforGeeks**
- [What is Register in Digital Electronics?](https://www.geeksforgeeks.org/what-is-register-digital-electronics/) — accessed 2026-11-01

- [Shift Registers in Digital Logic](https://www.geeksforgeeks.org/digital-logic/shift-registers-in-digital-logic/) — accessed 2026-11-01
- [Universal Shift Register in Digital Logic](https://www.geeksforgeeks.org/digital-logic/universal-shift-register-in-digital-logic/) — accessed 2026-11-01

**Additional sources**

- *Information and Communication Technology* (Class XI–XII), Chapter 3: Number System and Digital Device (register) — reference book supplied by the project owner
- [Registers (theory)](https://cse15-iiith.vlabs.ac.in/exp/registers/theory.html) — Virtual Labs, IIIT Hyderabad, accessed 2026-11-01
- [Data registers](https://sites.ualberta.ca/~gingrich/courses/phys395/notes/node146.html) — University of Alberta course notes, accessed 2026-11-01
- [SN74LS194A product page](https://www.ti.com/product/SN74LS194A) — Texas Instruments, accessed 2026-11-01
