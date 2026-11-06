---
description: The BCD, Excess-3, EBCDIC, ASCII and Unicode codes, with code tables, conversion examples, properties and differences.
updated: 2026-11-01
---

## BCD (Binary Coded Decimal) {#bcd-binary-coded-decimal}

**Definition:** In **BCD (Binary Coded Decimal)**, each **decimal digit** (0 to 9) is represented separately by its own **4-bit binary code**.

The most common form is the **8421 BCD** code.

BCD is a **weighted code**: the four bit positions have the weights **8, 4, 2 and 1** (from left to right).

**BCD table:**

| Decimal digit | BCD (8421) |
| --- | --- |
| 0 | 0000 |
| 1 | 0001 |
| 2 | 0010 |
| 3 | 0011 |
| 4 | 0100 |
| 5 | 0101 |
| 6 | 0110 |
| 7 | 0111 |
| 8 | 1000 |
| 9 | 1001 |

**Invalid codes:** 4 bits can form 16 combinations, but only 10 (0000 to 1001) are used. The remaining **six codes are invalid** in BCD:

1. 1010
2. 1011
3. 1100
4. 1101
5. 1110
6. 1111

**How to convert a decimal number to BCD:** write the 4-bit code of each decimal digit separately.

**Example 1:** (49)₁₀ in BCD

```text
 Decimal digits:   4      9
 BCD:            0100   1001      → (49)₁₀ = (0100 1001)BCD
```

Compare with pure binary: (49)₁₀ = (110001)₂. BCD is **not** the same as converting the whole number to binary.

**Example 2:** (2025)₁₀ = (0010 0000 0010 0101)BCD

**Advantages of BCD:**

1. It is very similar to the decimal system, so conversion between decimal and BCD is easy.
2. Only the binary codes of the ten digits 0 to 9 need to be remembered.
3. Converting a number into decimal digits for display is simple: each digit is converted separately.

**Disadvantages of BCD:**

1. It needs **more bits** than pure binary to represent the same number.
2. Addition and subtraction follow different rules, so BCD arithmetic is more complicated than binary arithmetic.
3. Six of the sixteen 4-bit combinations are wasted (invalid).

**Uses of BCD:** in electronic devices that work with and display decimal numbers, such as calculators, digital clocks and digital meters.

### Other Weighted BCD Codes

Besides 8421, other 4-bit weights can also be used to code the decimal digits. In each code, the value of a digit is the sum of the weights of the bits that are 1.

| Decimal digit | 8421 | 2421 (Aiken code) | 5421 |
| --- | --- | --- | --- |
| 0 | 0000 | 0000 | 0000 |
| 1 | 0001 | 0001 | 0001 |
| 2 | 0010 | 0010 | 0010 |
| 3 | 0011 | 0011 | 0011 |
| 4 | 0100 | 0100 | 0100 |
| 5 | 0101 | 1011 | 1000 |
| 6 | 0110 | 1100 | 1001 |
| 7 | 0111 | 1101 | 1010 |
| 8 | 1000 | 1110 | 1011 |
| 9 | 1001 | 1111 | 1100 |

A **7421** code also exists. With the weights 7, 4, 2 and 1, some digits can be coded in two ways (for example, 7 can be 0111 = 4 + 2 + 1 or 1000 = 7), so different books may show slightly different 7421 tables.

### Differences Between BCD and Pure Binary

| Basis | BCD | Pure binary |
| --- | --- | --- |
| What it is | A **code**: each decimal digit is coded separately in 4 bits | A **number system** with base 2 and the digits 0 and 1 |
| How a number is converted | Digit by digit | The whole number at once |
| Ease of conversion from decimal | Easy | More work |
| Number of bits needed | More | Fewer |
| Example: (137)₁₀ | 0001 0011 0111 | 10001001 |

## Excess-3 Code {#excess-3-code}

**Definition:** **Excess-3 (XS-3)** is a binary code for decimal digits in which each digit is represented by its **8421 BCD code plus 3 (0011)**.

It is called *excess-3* because every code is 3 more than the BCD code.

**Excess-3 table:**

| Decimal digit | BCD (8421) | Excess-3 (BCD + 0011) |
| --- | --- | --- |
| 0 | 0000 | 0011 |
| 1 | 0001 | 0100 |
| 2 | 0010 | 0101 |
| 3 | 0011 | 0110 |
| 4 | 0100 | 0111 |
| 5 | 0101 | 1000 |
| 6 | 0110 | 1001 |
| 7 | 0111 | 1010 |
| 8 | 1000 | 1011 |
| 9 | 1001 | 1100 |

**Invalid codes:** only 0011 to 1100 are used, so six codes are invalid in Excess-3:

1. 0000
2. 0001
3. 0010
4. 1101
5. 1110
6. 1111

**How to convert a decimal number to Excess-3:**

1. Write the BCD code of each decimal digit.
2. Add 0011 (3) to each 4-bit group.

**Example 1:** (398)₁₀ to Excess-3

```text
 Decimal digits:       3       9       8
 BCD:                0011    1001    1000
 Add 0011:         + 0011  + 0011  + 0011
                    ------  ------  ------
 Excess-3:           0110    1100    1011    → (398)₁₀ = (0110 1100 1011)XS-3
```

**Example 2:** (2025)₁₀ = (0101 0011 0101 1000)XS-3

To convert Excess-3 back to decimal, **subtract 0011** from each 4-bit group and read the BCD digit.

**Properties of Excess-3:**

1. **Non-weighted code:** the bit positions do not have fixed weights.
2. **Self-complementing code:** the 1's complement of the Excess-3 code of a digit is the Excess-3 code of its **9's complement** (9 minus the digit). For example, digit 2 = 0101; its 1's complement is 1010, which is the Excess-3 code of 7 (and 9 − 2 = 7). This makes decimal subtraction by the complement method simpler.

### Differences Between BCD and Excess-3

| Basis | BCD (8421) | Excess-3 |
| --- | --- | --- |
| How it is formed | Binary code of each decimal digit | BCD code + 0011 (3) |
| Weighted? | Weighted (8, 4, 2, 1) | Non-weighted |
| Self-complementing? | No | Yes |
| Valid codes | 0000 to 1001 | 0011 to 1100 |
| Code for 0 | 0000 | 0011 |
| Code for 9 | 1001 | 1100 |

## EBCDIC {#ebcdic}

**Full form:** **E**xtended **B**inary **C**oded **D**ecimal **I**nterchange **C**ode. (Some books write "Information Code"; the correct word is **Interchange**.)

**Definition:** EBCDIC is an **8-bit** character code used to represent letters, digits, special symbols and control characters.

It was devised by **IBM** in **1963–1964** and introduced with the **IBM System/360** mainframe computers.

**Features:**

1. It is an **8-bit code**, so it can represent **2⁸ = 256** different characters.
2. It was developed from BCDIC, the 6-bit Binary Coded Decimal Interchange Code used for punched cards.
3. It is used mainly in **IBM mainframe** and IBM midrange computers.
4. It was developed separately from ASCII and is **not compatible** with it: the same character has different codes in the two systems.
5. In EBCDIC the letters A to Z do **not** have continuous (consecutive) codes.
6. Each 8-bit code has two parts: the left 4 bits are the **zone bits** and the right 4 bits are the **digit (numeric) bits**:

| Characters | Zone bits | Digit bits | Codes (hexadecimal) |
| --- | --- | --- | --- |
| Digits 0 to 9 | 1111 | 0000 to 1001 (the 8421 BCD code of the digit) | F0 to F9 |
| Letters A to I | 1100 | 0001 to 1001 | C1 to C9 |
| Letters J to R | 1101 | 0001 to 1001 | D1 to D9 |
| Letters S to Z | 1110 | 0010 to 1001 | E2 to E9 |

For example, the digit **5** is 1111 0101 (F5): zone 1111 followed by the BCD code of 5 (0101).

**Examples:**

| Character | EBCDIC (hexadecimal) | EBCDIC (binary) |
| --- | --- | --- |
| A | C1 | 1100 0001 |
| a | 81 | 1000 0001 |
| 0 | F0 | 1111 0000 |

## ASCII {#ascii}

**Full form:** **A**merican **S**tandard **C**ode for **I**nformation **I**nterchange.

**Definition:** ASCII is a **7-bit** character code used to represent letters, digits, punctuation marks, symbols and control characters in computers and communication equipment.

The first edition of the standard was published in **1963** by the **American Standards Association (ASA)**, now the American National Standards Institute (ANSI). **Bob Bemer**, a member of the committee that defined it, is sometimes called the *father of ASCII*.

**Features:**

1. It is a **7-bit code**, so it represents **2⁷ = 128** characters (codes 0 to 127).
2. Of these, **95 are printable** characters (letters, digits, punctuation and space) and **33 are control** characters (codes 0 to 31 and 127, DEL).
3. Upper-case letters A to Z have the codes **65 to 90**, lower-case letters a to z have **97 to 122**, and the digits 0 to 9 have **48 to 57**.
4. The code of a lower-case letter is **32 more** than the code of its upper-case letter, so they differ by only one bit.
5. **Extended ASCII:** 8-bit versions of ASCII keep the original 128 characters and add 128 more (256 in total). "Extended ASCII" has no single official standard.
6. The first 128 characters of **Unicode** are the same as ASCII.

**ASCII-7 and ASCII-8:**

1. **ASCII-7:** the original 7-bit code (2⁷ = 128 characters). The left 3 bits are called the **zone bits** and the right 4 bits the **numeric bits**. For example, A = **100 0001** (zone 100, numeric 0001) and Z = **101 1010**.
2. **ASCII-8:** an 8-bit form. When ASCII is sent as 8 bits, the extra (leftmost) bit can be used as a **parity bit** for error detection (see [Parity](/topics/number-systems/parity)); 8-bit *extended ASCII* character sets instead use it to represent 2⁸ = 256 characters.

**Examples:**

| Character | Decimal | Hexadecimal | Binary (7 bits) |
| --- | --- | --- | --- |
| A | 65 | 41 | 100 0001 |
| a | 97 | 61 | 110 0001 |
| 0 | 48 | 30 | 011 0000 |
| Space | 32 | 20 | 010 0000 |

### Differences Between ASCII and BCD

| Basis | ASCII | BCD |
| --- | --- | --- |
| Full form | American Standard Code for Information Interchange | Binary Coded Decimal |
| What it codes | Letters, digits, symbols and control characters | Only the decimal digits 0 to 9 |
| Number of bits | 7 bits (128 characters) | 4 bits per digit |
| Type of code | Alphanumeric code | Numeric code |
| Use | Representing text in computers | Representing decimal numbers in binary |

### Differences Between ASCII and EBCDIC

| Basis | ASCII | EBCDIC |
| --- | --- | --- |
| Full form | American Standard Code for Information Interchange | Extended Binary Coded Decimal Interchange Code |
| Number of bits | 7 bits | 8 bits |
| Number of characters | 128 | 256 |
| Developed by | American Standards Association (1963) | IBM (1963–1964) |
| Used in | Most computers (personal computers, Linux and other systems) | IBM mainframe computers |
| Letters A–Z | Consecutive codes | Not consecutive |
| Code for A | 65 (41 in hexadecimal) | 193 (C1 in hexadecimal) |

## Unicode {#unicode}

**Definition:** **Unicode** is a character encoding standard that gives a **unique number (code point)** to every character of **all the world's writing systems**, so that text in any language, including **Bengali**, can be stored, processed and exchanged by computers.

**History:**

1. In **1987**, Joe Becker of **Xerox** and Lee Collins and Mark Davis of **Apple** began working on a universal character set.
2. The **Unicode Consortium** was formed in **January 1991**, and **Unicode 1.0** was released in **October 1991**. Bengali was one of the scripts in Unicode 1.0.
3. Unicode was first designed as a **16-bit** code (2¹⁶ = **65,536** characters), but it has since been extended.

**Features:**

1. Each character has a code point written as **U+** followed by hexadecimal digits. For example, A = **U+0041**, the Bengali letter অ = **U+0985** and the Bengali digit ০ = **U+09E6**.
2. The code space runs from **U+0000 to U+10FFFF** (17 planes, more than one million code points).
3. Version 18.0 defines **172,808 characters** in **175 scripts**.
4. The **first 128 characters are the same as ASCII**, so Unicode is compatible with ASCII.
5. The Bengali script has its own block, **U+0980 to U+09FF** (128 code points).
6. Unicode text is stored in one of three standard encodings:
   1. **UTF-8:** 1 to 4 bytes per character (ASCII characters take 1 byte). It is the most widely used encoding.
   2. **UTF-16:** 2 or 4 bytes per character.
   3. **UTF-32:** 4 bytes per character.

**Advantages of Unicode:**

1. It can represent the characters of almost **all languages** of the world, large and small.
2. Text in different languages (for example, Bengali and English) can be used together in one document.
3. It is **compatible with ASCII**.
4. Text can be exchanged between different computers, programs and countries without the characters changing.

### Differences Between ASCII and Unicode

| Basis | ASCII | Unicode |
| --- | --- | --- |
| Full form | American Standard Code for Information Interchange | Universal character encoding standard (Unicode) |
| Bits | 7 bits (8 bits in extended ASCII) | Originally 16 bits; stored in UTF-8, UTF-16 or UTF-32 (8, 16 or 32-bit units) |
| Number of characters | 128 (256 in extended ASCII) | More than 170,000 (code space of over one million) |
| Languages | Mainly English | Almost all the world's languages, including Bengali |
| Maintained by | American Standards Association (now ANSI) | Unicode Consortium |
| Memory needed | Less | More |
| Example | A = 65 = 100 0001 | A = U+0041; অ = U+0985 |

## References {#references}

**TutorialsPoint**

- [Digital Electronics – Binary Codes](https://www.tutorialspoint.com/digital-electronics/digital-electronics-binary-codes.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Excess-3 Code](https://www.geeksforgeeks.org/digital-logic/excess-3-code/) — accessed 2026-11-01

**TpointTech**

- [Excess-3 Code in Digital Electronics](https://www.tpointtech.com/excess-3-code-in-digital-electronics) — accessed 2026-11-01
- [ASCII Code in Digital Electronics](https://www.tpointtech.com/ascii-code-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- [Binary-coded decimal](https://en.wikipedia.org/wiki/Binary-coded_decimal) — Wikipedia, accessed 2026-11-01
- [EBCDIC](https://en.wikipedia.org/wiki/EBCDIC) — Wikipedia, accessed 2026-11-01
- [Bob Bemer](https://en.wikipedia.org/wiki/Bob_Bemer) — Wikipedia, accessed 2026-11-01
- [Unicode](https://en.wikipedia.org/wiki/Unicode) — Wikipedia, accessed 2026-11-01
- [Bengali (Unicode block)](https://en.wikipedia.org/wiki/Bengali_(Unicode_block)) — Wikipedia, accessed 2026-11-01
- [ASCII](https://en.wikipedia.org/wiki/ASCII) — Wikipedia, accessed 2026-11-01
