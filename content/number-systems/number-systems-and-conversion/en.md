---
description: The history of numbers, non-positional and positional number systems, the binary, octal, decimal and hexadecimal systems, and conversion between them with worked examples.
updated: 2026-11-01
---

## History of Inventing Numbers {#history-of-inventing-numbers}

Number systems developed slowly as people needed to count and calculate. The main steps were:

1. **Counting with objects and tally marks:** in early times people counted with fingers, pebbles, sticks and knots, and by cutting marks (tally marks) on bones, wood or walls. Tally marks have been found in the archaeological record from at least 40,000 years ago. A common way of grouping tally marks is four vertical strokes with a fifth stroke drawn across them, so that the marks can be counted in fives.
2. **Mesopotamia (Sumerians and Babylonians):** the Sumerians used several counting systems for different kinds of objects. Around **2000 BC** the **Babylonian** number system appeared. It was a **base-60 (sexagesimal) positional** system written with two symbols (one for units and one for tens), but it had no true zero. Its legacy survives today in **60 seconds in a minute, 60 minutes in an hour and 360 degrees in a circle**.
3. **Egypt:** the Egyptian **hieroglyphic** number system used a separate symbol for each power of 10 (1, 10, 100, … 1,000,000) and wrote numbers by repeating these symbols. It was **non-positional** and had no zero.
4. **Rome:** the **Roman numerals** (I, V, X, L, C, D, M) developed around the middle of the 1st millennium BC from Etruscan symbols. The system is **non-positional** and has no zero; it is still used today, for example on clock faces.
5. **The Maya (Central America):** the **Maya number system** was a **base-20 (vigesimal) positional** system. It used a dot for one, a bar for five, and a shell-shaped symbol for **zero**.
6. **India and the binary idea:** the Indian scholar **Pingala** (about the 3rd–2nd century BC) described poetic metres using combinations of short and long syllables, which is equivalent to listing binary sequences.
7. **India and the decimal system with zero:** the **decimal (base-10) positional system**, now called the **Hindu–Arabic numeral system**, was developed in **India** between about the 1st and 4th centuries AD.
   1. Around **500 AD** the astronomer **Aryabhata** used the word *kha* (emptiness) to mark zero in tables of digits.
   2. In the 7th century, **Brahmagupta** gave rules for calculating with zero in his *Brahmasphutasiddhanta*.
   3. The Sanskrit word for zero, *śūnya* (empty), was translated into Arabic as *ṣifr*, from which the words *cipher* and *zero* come.
8. **Spread to the Arab world and Europe:** Arab and Persian mathematicians adopted the Indian system in the 8th century. **Al-Khwarizmi** wrote a book on calculating with the Hindu numerals around **825 AD**; the word *algorithm* comes from his name. **Fibonacci** introduced the system to European mathematics in his book *Liber Abaci* in **1202**.
9. **Binary for computers:** the German mathematician **Gottfried Wilhelm Leibniz** wrote about binary arithmetic in **1679** and published his best-known work on it in **1703**. Later, **George Boole** set out Boolean algebra (1854), and **Claude Shannon** (1937) applied Boolean algebra and binary arithmetic to switching circuits, which is the basis of digital computers.

## Non-positional and Positional Number Systems {#non-positional-and-positional-number-systems}

A **number system** is a way of representing numbers using a set of symbols (digits). Number systems are of two types:

1. **Non-positional number system**
2. **Positional number system**

**Basic terms:**

1. **Digit:** each basic symbol used to write numbers in a number system is called a digit. It is the smallest symbol of a number system. For example, the number 62345 is made of the five digits 6, 2, 3, 4 and 5.
2. **Base (radix):** the base or radix of a number system is the **total number of different symbols (digits)** used in it. For example, the decimal system uses ten digits (0 to 9), so its base is 10. A number in base *b* is written with the base as a subscript, for example (101)₂ or (25)₈.
3. **Place value (positional value):** the value given to a position in a number. In a positional number system it is a power of the base.

### Non-positional Number System

**Definition:** In a non-positional number system, the value of a symbol **does not depend on its position** in the number. Each symbol always has the same value, and the value of a number is found by adding (and sometimes subtracting) the values of its symbols.

**Example 1: the Egyptian hieroglyphic number system** is a non-positional number system. It had a separate symbol for each power of 10, and a number was written by **repeating** each symbol as many times as needed:

| Symbol (name) | Single stroke | Cattle hobble | Coil of rope | Water lily | Bent finger | Tadpole | Heh |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 1 | 10 | 100 | 1,000 | 10,000 | 100,000 | 1,000,000 |

For example, 23 is written with two "10" symbols and three "1" symbols (10 + 10 + 1 + 1 + 1). There was no symbol for zero.

**Example 2: the Roman numeral system** is also a non-positional number system. It uses seven symbols:

| Symbol | I | V | X | L | C | D | M |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

Rules for finding the value:

1. **Additive principle:** the values of the symbols are added. For example, CCXXVIII = 100 + 100 + 10 + 10 + 5 + 1 + 1 + 1 = **228**.
2. **Subtractive principle:** when a smaller symbol comes before a larger one, it is subtracted. For example, IV = 5 − 1 = **4** and IX = 10 − 1 = **9**. The standard subtractive forms are IV, IX, XL, XC, CD and CM.

**Characteristics:**

1. The value of each symbol is fixed and does not depend on its position.
2. There is **no symbol for zero**.
3. The value of a number is the sum (or difference) of the values of its symbols.

### Positional Number System

**Definition:** In a positional (or **weighted**) number system, the value of a digit **depends on its position** in the number as well as on the digit itself. Each position has a **weight** (place value), which is a power of the base.

To find the value of a number in a positional number system, three things are needed:

1. The **face value** of each digit (the digit's own value).
2. The **base** of the number system.
3. The **position** (place value) of each digit in the number.

**Radix point, MSB and LSB:**

1. **Radix point:** the dot (.) that separates the **integer part** from the **fractional part** of a number. For example, in 576.12, 576 is the integer part and .12 is the fractional part. In the decimal system it is called the *decimal point*, and in the binary system the *binary point*.
2. **Most significant digit (MSD):** the **leftmost** digit, which has the **highest** place value. In a binary number it is called the **most significant bit (MSB)**.
3. **Least significant digit (LSD):** the **rightmost** digit, which has the **lowest** place value. In a binary number it is called the **least significant bit (LSB)**.

```text
         MSB                  LSB
          ↓                    ↓
          1  0  1  1  0  1  .  0  1  1
                            ↑
                      radix (binary) point
```

For a number in base *b*, the weights are:

```text
 Position :  ...   3     2     1     0   .   -1      -2     ...
 Weight   :  ...   b³    b²    b¹    b⁰  .   b⁻¹     b⁻²    ...
                                         ▲
                                   radix point
```

The value of the number is the **sum of each digit multiplied by its weight**. For example, in the decimal number 1234:

```text
 1234 = (1 × 10³) + (2 × 10²) + (3 × 10¹) + (4 × 10⁰)
      =   1000    +   200     +    30     +    4      = 1234
```

The same digit can have different values in different positions. In 228, the first 2 means 2 × 100 = 200, while the second 2 means 2 × 10 = 20.

**Characteristics:**

1. Each position has a weight equal to a power of the base: b⁰, b¹, b², … to the left of the radix point, and b⁻¹, b⁻², … to the right of it.
2. The base is an integer equal to 2 or more.
3. The largest digit in any position is **one less than the base** (for example, 9 in decimal and 1 in binary).
4. It has a symbol for **zero**.
5. The value of a number is the weighted sum of its digits.

**Examples:**

1. Binary number system (base 2)
2. Octal number system (base 8)
3. Decimal number system (base 10)
4. Hexadecimal number system (base 16)

Computers use positional number systems.

### Differences Between Non-positional and Positional Number Systems

| Basis | Non-positional | Positional |
| --- | --- | --- |
| Value of a symbol | Does not depend on its position | Depends on its position (weight) |
| Weight of positions | No weights | Each position has a weight (a power of the base) |
| Zero | No symbol for zero | Has a symbol for zero |
| How value is found | Adding (or subtracting) symbol values | Sum of each digit × its weight |
| Example | Roman numerals | Binary, octal, decimal, hexadecimal |

## Binary, Octal, Decimal and Hexadecimal {#binary-octal-decimal-and-hexadecimal}

The four positional number systems used in computing are:

| Number system | Base | Digits used | Example |
| --- | --- | --- | --- |
| Binary | 2 | 0, 1 | (10101)₂ |
| Octal | 8 | 0, 1, 2, 3, 4, 5, 6, 7 | (12570)₈ |
| Decimal | 10 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | (1234)₁₀ |
| Hexadecimal | 16 | 0–9 and A, B, C, D, E, F | (19FDE)₁₆ |

### Binary Number System

1. Base: **2**. Digits: **0 and 1**.
2. Each binary digit is called a **bit** (*bi*nary dig*it*).
3. A group of **4 bits** is called a **nibble**, and a group of **8 bits** is called a **byte**.
4. The binary system was described in its modern form by the German mathematician **Gottfried Wilhelm Leibniz**.

**Why computers use the binary number system:**

1. A computer is an electronic machine, and its circuits (switches) work in only **two states**: **on** (current flows, high voltage) and **off** (no current, low voltage). These two states are easily represented by the two binary digits **1 and 0**.
2. Electronic circuits that need to recognise only two states are **simple, cheap and reliable**.
3. Data can also be stored in two states, for example the two directions of magnetisation on a magnetic disk.
4. Because there are only two states (true/false), all arithmetic and logical operations can be carried out with **Boolean algebra** and logic gates, which makes circuit design easy.

**Example:**

```text
 (10101)₂ = (1 × 2⁴) + (0 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)
          =    16    +    0     +    4     +    0     +    1      = (21)₁₀
```

### Octal Number System

1. Base: **8**. Digits: **0 to 7**.
2. Since 2³ = 8, each octal digit can be written as a group of **3 bits**, so octal is called a **3-bit code**.
3. In octal, the number after 7 is **10** (7 + 1 = 10₈), because there is no digit 8.

**Uses of octal:**

1. To write long binary numbers in a short form.
2. In early computers whose word sizes were multiples of 3 bits (12, 24 and 36 bits), such as the PDP-8, ICL 1900 and IBM mainframes.
3. For **file permissions** in UNIX and Linux (for example, `chmod 755`).

**Example:**

```text
 (12570)₈ = (1 × 8⁴) + (2 × 8³) + (5 × 8²) + (7 × 8¹) + (0 × 8⁰)
          =   4096   +   1024   +   320    +    56    +    0      = (5496)₁₀
```

### Decimal Number System

1. Base: **10**. Digits: **0 to 9**.
2. It is the number system we use in daily life.
3. The place values are units (10⁰), tens (10¹), hundreds (10²), thousands (10³) and so on.

**Example:**

```text
 (1234)₁₀ = (1 × 10³) + (2 × 10²) + (3 × 10¹) + (4 × 10⁰) = 1000 + 200 + 30 + 4 = 1234
```

### Hexadecimal Number System

1. Base: **16**. Digits: **0 to 9** and the letters **A to F**, where A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15.
2. Since 2⁴ = 16, each hexadecimal digit can be written as a group of **4 bits** (one nibble), so hexadecimal is called a **4-bit code**. Two hexadecimal digits represent exactly **one byte** (00 to FF).
3. In hexadecimal, the number after F is **10** (F + 1 = 10₁₆).

**Uses of hexadecimal:**

1. To write long binary numbers in a short, readable form; it is more convenient than octal for computers that use 8-bit bytes.
2. To show **memory addresses** and the contents of memory.
3. For **colour codes** in HTML and CSS: six hexadecimal digits, two each for red, green and blue. For example, **#FF0000** is red.

**Example:**

```text
 (19FDE)₁₆ = (1 × 16⁴) + (9 × 16³) + (F × 16²) + (D × 16¹) + (E × 16⁰)
           = (1 × 65536) + (9 × 4096) + (15 × 256) + (13 × 16) + (14 × 1)
           =   65536   +   36864    +   3840     +   208     +   14     = (106462)₁₀
```

### Equivalence Table (0 to 15)

| Decimal | Binary (4 bits) | Octal | Hexadecimal |
| --- | --- | --- | --- |
| 0 | 0000 | 0 | 0 |
| 1 | 0001 | 1 | 1 |
| 2 | 0010 | 2 | 2 |
| 3 | 0011 | 3 | 3 |
| 4 | 0100 | 4 | 4 |
| 5 | 0101 | 5 | 5 |
| 6 | 0110 | 6 | 6 |
| 7 | 0111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |

## Conversion Between Number Systems {#conversion-between-number-systems}

Two general methods are used:

1. **Any base → decimal:** multiply each digit by its weight (a power of the base) and add the products. Digits after the radix point use negative powers (b⁻¹, b⁻², …).
2. **Decimal → any base:**
   1. **Integer part:** divide the number repeatedly by the new base and write down the remainders. Read the remainders **from bottom to top** (the first remainder is the least significant digit).
   2. **Fractional part:** multiply the fraction repeatedly by the new base and write down the integer part (carry) of each result. Read the carries **from top to bottom**. Stop when the fraction becomes 0 or enough digits are obtained.

### Decimal ↔ Binary

**Example 1: (29)₁₀ to binary** (repeated division by 2)

```text
 2 | 29
   |----
 2 | 14   remainder 1   ▲  (least significant bit)
 2 |  7   remainder 0   │
 2 |  3   remainder 1   │  read upwards
 2 |  1   remainder 1   │
   |  0   remainder 1   │  (most significant bit)
```

So, (29)₁₀ = **(11101)₂**.

**Example 2: (18.625)₁₀ to binary**

Integer part: 18 ÷ 2 = 9 r 0, 9 ÷ 2 = 4 r 1, 4 ÷ 2 = 2 r 0, 2 ÷ 2 = 1 r 0, 1 ÷ 2 = 0 r 1. Reading upwards: (18)₁₀ = (10010)₂.

Fractional part (repeated multiplication by 2):

```text
 0.625 × 2 = 1.25   → carry 1   │  read downwards
 0.25  × 2 = 0.5    → carry 0   │
 0.5   × 2 = 1.0    → carry 1   ▼  (fraction is now 0, so stop)
```

So, (0.625)₁₀ = (0.101)₂, and (18.625)₁₀ = **(10010.101)₂**.

**Note: fractions that do not end.** For some decimal fractions, the fractional part never becomes 0. In that case, stop after 4 to 6 digits; the result is an **approximate value**.

**Example: (0.77)₁₀ to binary**

```text
 0.77 × 2 = 1.54   → carry 1   │
 0.54 × 2 = 1.08   → carry 1   │
 0.08 × 2 = 0.16   → carry 0   │  read downwards
 0.16 × 2 = 0.32   → carry 0   │
 0.32 × 2 = 0.64   → carry 0   │
 0.64 × 2 = 1.28   → carry 1   ▼  (the fraction is not 0, so the answer is approximate)
```

So, (0.77)₁₀ ≈ **(0.110001…)₂**.

**Short method for small integers (place-value table):** write the place values of binary (… 128, 64, 32, 16, 8, 4, 2, 1). Starting from the largest place value that fits, write 1 under each place value that is subtracted from the number, and 0 under the others.

**Example: (38)₁₀ to binary**

```text
 Place value:   32   16    8    4    2    1
 Bit:            1    0    0    1    1    0

 38 − 32 = 6;  6 − 4 = 2;  2 − 2 = 0
```

So, (38)₁₀ = **(100110)₂**.

**Example 3: (11101)₂ to decimal**

```text
 (11101)₂ = (1 × 2⁴) + (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)
          =    16    +    8     +    4     +    0     +    1      = (29)₁₀
```

**Example 4: (10010.101)₂ to decimal**

```text
 (10010.101)₂ = (1 × 2⁴) + (0 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰) + (1 × 2⁻¹) + (0 × 2⁻²) + (1 × 2⁻³)
              =    16    +    0     +    0     +    2     +    0     +   0.5     +    0      +  0.125
              = (18.625)₁₀
```

### Decimal ↔ Octal

**Example 1: (12345)₁₀ to octal** (repeated division by 8)

```text
 8 | 12345
   |------
 8 |  1543   remainder 1   ▲
 8 |   192   remainder 7   │
 8 |    24   remainder 0   │  read upwards
 8 |     3   remainder 0   │
   |     0   remainder 3   │
```

So, (12345)₁₀ = **(30071)₈**.

**Example 2: (152.25)₁₀ to octal**

Integer part: 152 ÷ 8 = 19 r 0, 19 ÷ 8 = 2 r 3, 2 ÷ 8 = 0 r 2. Reading upwards: (152)₁₀ = (230)₈.

Fractional part: 0.25 × 8 = 2.0 → carry 2 (fraction is now 0). So (0.25)₁₀ = (0.2)₈.

So, (152.25)₁₀ = **(230.2)₈**.

**Example 3: (30071)₈ to decimal**

```text
 (30071)₈ = (3 × 8⁴) + (0 × 8³) + (0 × 8²) + (7 × 8¹) + (1 × 8⁰)
          =  12288   +    0     +    0     +    56    +    1      = (12345)₁₀
```

**Example 4: (152.25)₈ to decimal**

```text
 (152.25)₈ = (1 × 8²) + (5 × 8¹) + (2 × 8⁰) + (2 × 8⁻¹) + (5 × 8⁻²)
           =    64    +    40    +    2     +   0.25    + 0.078125  = (106.328125)₁₀
```

### Decimal ↔ Hexadecimal

**Example 1: (543)₁₀ to hexadecimal** (repeated division by 16)

```text
 16 | 543
    |-----
 16 |  33   remainder 15 = F   ▲
 16 |   2   remainder 1        │  read upwards
    |   0   remainder 2        │
```

So, (543)₁₀ = **(21F)₁₆**.

**Example 2: (152.25)₁₀ to hexadecimal**

Integer part: 152 ÷ 16 = 9 r 8, 9 ÷ 16 = 0 r 9. Reading upwards: (152)₁₀ = (98)₁₆.

Fractional part: 0.25 × 16 = 4.0 → carry 4 (fraction is now 0). So (0.25)₁₀ = (0.4)₁₆.

So, (152.25)₁₀ = **(98.4)₁₆**.

**Example 3: (21F)₁₆ to decimal**

```text
 (21F)₁₆ = (2 × 16²) + (1 × 16¹) + (F × 16⁰)
         = (2 × 256) + (1 × 16)  + (15 × 1)  = 512 + 16 + 15 = (543)₁₀
```

### Hexadecimal ↔ Octal

Hexadecimal and octal are converted **through binary**, because each hexadecimal digit is exactly 4 bits and each octal digit is exactly 3 bits. So the conversion uses these four grouping rules:

| Conversion | Rule | Example |
| --- | --- | --- |
| Binary → Octal | Group the bits in **threes** from the radix point (to the left for the integer part, to the right for the fraction), adding zeros at the outer ends; write the octal digit of each group | (110 101)₂ = (65)₈; (010 010 100)₂ = (224)₈ |
| Octal → Binary | Write each octal digit as **3 bits** | (175)₈ = (001 111 101)₂ = (1111101)₂ |
| Binary → Hexadecimal | Group the bits in **fours** from the radix point, adding zeros at the outer ends; write the hexadecimal digit of each group | (1011 0110)₂ = (B6)₁₆ |
| Hexadecimal → Binary | Write each hexadecimal digit as **4 bits** | (A09.E2)₁₆ = (1010 0000 1001 . 1110 0010)₂ |

**Hexadecimal → Octal:**

1. Replace each hexadecimal digit with its **4-bit** binary equivalent.
2. Regroup the bits into groups of **3**, starting from the radix point and moving left (for the integer part) and right (for the fraction). Add zeros at the outer ends to complete the groups.
3. Replace each 3-bit group with its octal digit.

**Example 1: (152A.25)₁₆ to octal**

```text
 Step 1:  1    5    2    A   .  2    5
          0001 0101 0010 1010 . 0010 0101

 Step 2:  1 010 100 101 010 . 001 001 010   (regroup in threes)
          001 010 100 101 010 . 001 001 010 (pad the outer ends with zeros)

 Step 3:  1   2   4   5   2  .  1   1   2
```

So, (152A.25)₁₆ = **(12452.112)₈**.

**Octal → Hexadecimal:**

1. Replace each octal digit with its **3-bit** binary equivalent.
2. Regroup the bits into groups of **4**, starting from the radix point. Add zeros at the outer ends to complete the groups.
3. Replace each 4-bit group with its hexadecimal digit.

**Example 2: (152.25)₈ to hexadecimal**

```text
 Step 1:  1   5   2  .  2   5
          001 101 010 . 010 101

 Step 2:  0 0110 1010 . 0101 01      (regroup in fours)
          0000 0110 1010 . 0101 0100 (pad the outer ends with zeros)

 Step 3:  0    6    A   .  5    4
```

So, (152.25)₈ = **(6A.54)₁₆**.

### Any Base ↔ Any Base

To convert a number from any base to any other base (for example, from base 6 to base 9):

1. **Convert the number to decimal**: multiply each digit by its place value (a power of the old base) and add.
2. **Convert the decimal number to the new base**: divide repeatedly by the new base and read the remainders from bottom to top.

**Example 1: (532)₆ to base 9**

```text
 Step 1: (532)₆ = (5 × 6²) + (3 × 6¹) + (2 × 6⁰)
                = 180 + 18 + 2 = (200)₁₀

 Step 2:  9 | 200
            |-----
          9 |  22   remainder 2   ▲
          9 |   2   remainder 4   │  read upwards
            |   0   remainder 2   │
```

So, (532)₆ = **(242)₉**.

**Example 2: (4E)₁₆ to base 5**

```text
 Step 1: (4E)₁₆ = (4 × 16¹) + (14 × 16⁰) = 64 + 14 = (78)₁₀

 Step 2:  5 | 78
            |----
          5 | 15   remainder 3   ▲
          5 |  3   remainder 0   │  read upwards
            |  0   remainder 3   │
```

So, (4E)₁₆ = **(303)₅**.

**Example 3: (8E)₁₆ to base 9**

```text
 Step 1: (8E)₁₆ = (8 × 16¹) + (14 × 16⁰) = 128 + 14 = (142)₁₀

 Step 2:  9 | 142
            |-----
          9 |  15   remainder 7   ▲
          9 |   1   remainder 6   │  read upwards
            |   0   remainder 1   │
```

So, (8E)₁₆ = **(167)₉**.

**Example 4: (212)₃ to decimal**

```text
 (212)₃ = (2 × 3²) + (1 × 3¹) + (2 × 3⁰) = 18 + 3 + 2 = (23)₁₀
```

## References {#references}


**IT Job QnS**

- [Digital Logic Design](https://it.jobqns.com/digital-logic-design/) (exam questions: (10010.101)₂ to decimal and (543)₁₀ to hexadecimal; (12345)₁₀ to octal, Bangladesh Bank Assistant Programmer 2019) — accessed 2026-11-01

**TutorialsPoint**

- [Computer – Number System](https://www.tutorialspoint.com/computer_fundamentals/computer_number_system.htm) — accessed 2026-11-01
- [Computer – Number Conversion](https://www.tutorialspoint.com/computer_fundamentals/computer_number_conversion.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Classification of Number System](https://www.geeksforgeeks.org/digital-logic/classification-of-number-system/) — accessed 2026-11-01

**TpointTech**

- [Number Systems](https://www.tpointtech.com/number-systems) — accessed 2026-11-01
- [Conversion of Number System in Digital Electronics](https://www.tpointtech.com/conversion-of-number-system-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- [Positional notation](https://en.wikipedia.org/wiki/Positional_notation) — Wikipedia, accessed 2026-11-01
- [Roman numerals](https://en.wikipedia.org/wiki/Roman_numerals) — Wikipedia, accessed 2026-11-01
- [Egyptian numerals](https://en.wikipedia.org/wiki/Egyptian_numerals) — Wikipedia, accessed 2026-11-01
- [History of ancient numeral systems](https://en.wikipedia.org/wiki/History_of_ancient_numeral_systems) — Wikipedia, accessed 2026-11-01
- [Babylonian cuneiform numerals](https://en.wikipedia.org/wiki/Babylonian_cuneiform_numerals) — Wikipedia, accessed 2026-11-01
- [Maya numerals](https://en.wikipedia.org/wiki/Maya_numerals) — Wikipedia, accessed 2026-11-01
- [Pingala](https://en.wikipedia.org/wiki/Pingala) — Wikipedia, accessed 2026-11-01
- [Hindu–Arabic numeral system](https://en.wikipedia.org/wiki/Hindu%E2%80%93Arabic_numeral_system) — Wikipedia, accessed 2026-11-01
- [0 (number)](https://en.wikipedia.org/wiki/0) — Wikipedia, accessed 2026-11-01
- [Binary number](https://en.wikipedia.org/wiki/Binary_number) — Wikipedia, accessed 2026-11-01
- [Octal](https://en.wikipedia.org/wiki/Octal) — Wikipedia, accessed 2026-11-01
- [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) — Wikipedia, accessed 2026-11-01
