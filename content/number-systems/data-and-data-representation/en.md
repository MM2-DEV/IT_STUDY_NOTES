---
description: Data, information and the data processing cycle, and how numbers, text, images, audio and video are represented inside a computer.
updated: 2026-11-01
---

## Data, Information and Data Processing {#data-information-and-data-processing}

### Data

**Definition:** Data is a representation of **facts, concepts or instructions** in a formal way, so that people or machines can communicate, interpret or process it.

Data are **raw, unorganized facts** that must be processed before they become meaningful.

Data is represented with:

1. Letters (A–Z, a–z)
2. Digits (0–9)
3. Special characters (such as +, −, /, *, <, =)

**Examples:** the marks of each student in a class; the number of visitors to a website from each country; daily temperature readings.

### Information

**Definition:** Information is **organized or classified data** that is **meaningful** to the receiver.

It is the **processed data** on which decisions and actions are based.

**Examples:** a merit list or result sheet prepared from students' marks; a report card; a sales report.

**Characteristics of information:** for a decision to be meaningful, the information must be:

1. **Timely:** available when it is needed.
2. **Accurate:** free from errors.
3. **Complete:** nothing important is missing.

### Differences Between Data and Information

| Basis | Data | Information |
| --- | --- | --- |
| Definition | Raw, unorganized facts | Processed, organized data |
| Meaning | Has no particular meaning by itself | Meaningful to the receiver |
| Dependence | Does not depend on information | Depends on data (it is produced from data) |
| Position in processing | Input of processing | Output of processing |
| Use in decision-making | Cannot be used directly | Used for decisions and actions |
| Example | Marks of each student | Merit list, result sheet |

### Data Processing

**Definition:** Data processing is the process of **converting raw data into meaningful information**.

People or machines **restructure or re-order** the data to make it more useful for a particular purpose.

### Data Processing Cycle

Data processing consists of three basic steps, which together form the **data processing cycle**:

```text
   ┌─────────┐       ┌────────────┐       ┌──────────┐
   │  Input  │ ────► │ Processing │ ────► │  Output  │
   │ (data)  │       │            │       │ (info.)  │
   └─────────┘       └────────────┘       └──────────┘
```

1. **Input:** the input data is collected and prepared in a convenient form for processing. The form depends on the processing machine (for example, data typed on a keyboard or stored on a disk).
2. **Processing:** the input data is changed into a more useful form. For example, paychecks are calculated from the time cards of employees.
3. **Output:** the result of processing is collected. Its form depends on how the result will be used; for example, the output may be the paychecks for the employees.

The data and results are also **stored** for future use, so the computer's data processing is often described as **input, processing, output and storage**.

## Data Representation {#data-representation}

**Data representation** is the way in which data (numbers, text, images, sound and video) is stored and processed inside a computer.

A computer is a digital machine, so it represents **all data in binary form**, as patterns of **0s and 1s** (bits).

**Units of data:**

1. **Bit** (binary digit): a single 0 or 1; the smallest unit of data.
2. **Nibble:** a group of 4 bits.
3. **Byte:** a group of 8 bits.

### 1. Representation of Numbers

Numbers are not stored as characters; they are converted directly into binary bit patterns so that arithmetic can be performed on them.

#### Integers

1. **Unsigned integers:** only zero and positive numbers. With *n* bits, the range is **0 to 2ⁿ − 1** (for 8 bits: 0 to 255).
2. **Signed integers:** positive and negative numbers. The leftmost bit (most significant bit) is the **sign bit**: **0 = positive**, **1 = negative**. There are three methods:

| Method | How a negative number is formed | Range for 8 bits | Zero |
| --- | --- | --- | --- |
| **Sign-magnitude** | Sign bit 1, and the remaining bits hold the magnitude | −127 to +127 | Two zeros (+0 and −0) |
| **1's complement** | Invert every bit of the positive number | −127 to +127 | Two zeros (+0 and −0) |
| **2's complement** | 1's complement + 1 | −128 to +127 | Only one zero |

**Example: +5 and −5 in 8 bits**

| Method | +5 | −5 |
| --- | --- | --- |
| Sign-magnitude | 0000 0101 | 1000 0101 |
| 1's complement | 0000 0101 | 1111 1010 |
| 2's complement | 0000 0101 | 1111 1011 |

**2's complement** is the method used in most computers today, because it has only one zero and subtraction can be done by addition (see [Subtraction Using 2's Complement](/topics/number-systems/binary-arithmetic#subtraction-using-2-s-complement)).

With *n* bits it represents −2ⁿ⁻¹ to +(2ⁿ⁻¹ − 1); for 8 bits, −128 to +127.

#### Real Numbers (Floating Point)

Real numbers (numbers with a fractional part, very large or very small numbers) are stored in **floating-point** form, similar to scientific notation:

```text
 Value = (−1)^Sign × 1.Mantissa × 2^(Exponent − Bias)
```

1. **Sign:** 1 bit (0 = positive, 1 = negative).
2. **Exponent:** stored with a **bias** added, so that both positive and negative exponents can be stored. Bias = 2^(k−1) − 1, where *k* is the number of exponent bits.
3. **Mantissa (significand):** the significant bits of the number. The leading 1 of a normalized number is not stored (it is *implicit*).

The **IEEE 754** standard defines the common formats:

| Format | Total bits | Sign | Exponent | Mantissa | Bias |
| --- | --- | --- | --- | --- | --- |
| Single precision | 32 | 1 | 8 | 23 | 127 |
| Double precision | 64 | 1 | 11 | 52 | 1023 |

**Example: 12.375 in single precision**

```text
 1. Binary:        12.375 = 1100.011₂ = 1.100011 × 2³
 2. Sign:          0 (positive)
 3. Exponent:      3 + 127 = 130 = 10000010
 4. Mantissa:      100011 followed by zeros (23 bits)

 Result:  0  10000010  10001100000000000000000   (= 41460000 in hexadecimal)
         sign exponent        mantissa
```

### 2. Representation of Text

Text is represented by giving each character (letter, digit or symbol) a **unique binary code**. The common coding schemes are:

1. **ASCII:** 7 bits, 128 characters. For example, the letter **a** is **0110 0001**.
2. **EBCDIC:** 8 bits, used mainly on IBM mainframes.
3. **Unicode:** codes for the characters of almost all of the world's writing systems, including Bengali.

These codes are explained in [Binary Codes](/topics/number-systems/binary-codes).

### 3. Representation of Images

1. An image is made up of a grid (matrix) of small dots called **pixels** (picture elements).
2. Each pixel is stored as a binary number that represents its colour.
3. The number of bits per pixel is called the **colour depth**. With *n* bits per pixel, 2ⁿ colours can be shown: 1 bit gives 2 colours (black and white), and 4 bits give 16 colours.

**Example:** an image of 100 × 300 pixels with a colour depth of 16 bits needs 100 × 300 × 16 = 480,000 bits = 60,000 bytes.

### 4. Representation of Audio

1. Sound is an analog (continuous) signal.
2. To store it, the sound wave is **sampled** (measured) at regular intervals, and each sample is converted into a binary number.
3. A higher **sampling rate** (samples per second) and a higher **bit depth** (bits per sample) give better sound quality, but need more storage.

See [Conversion Between Analog and Digital Signals](/topics/computer-fundamentals/analog-and-digital-systems#analog-and-digital-signals).

### 5. Representation of Video

A video is a **sequence of images (frames)** shown one after another to create the effect of motion. Each frame is stored as an image.

## References {#references}

**TutorialsPoint**

- [Computer Fundamentals – Quick Guide](https://www.tutorialspoint.com/computer_fundamentals/computer_quick_guide.htm) (Computer – Data and Information: data, information, data processing cycle) — accessed 2026-11-01

**GeeksforGeeks**

- [Different forms of data representation in today's world](https://www.geeksforgeeks.org/software-engineering/different-forms-of-data-representation-in-todays-world/) — accessed 2026-11-01
- [Floating Point Representation](https://www.geeksforgeeks.org/digital-logic/introduction-of-floating-point-representation/) — accessed 2026-11-01

**TpointTech**

- [Data vs Information](https://www.tpointtech.com/data-vs-information) — accessed 2026-11-01

**Additional sources**

- [Signed number representations](https://en.wikipedia.org/wiki/Signed_number_representations) — Wikipedia, accessed 2026-11-01
- [Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format) — Wikipedia, accessed 2026-11-01
