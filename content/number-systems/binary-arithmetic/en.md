---
description: Rules and worked examples for binary addition, subtraction, 1's and 2's complement (signed numbers, subtraction and overflow), multiplication and division, and octal and hexadecimal addition.
updated: 2026-11-01
---

## Binary Addition {#binary-addition}

**Binary addition** is the addition of binary numbers, done column by column from the right (the least significant bit), with a carry of 1 to the next column whenever a column sum is 2 or more.

**Rules of binary addition:**

| A | B | Sum | Carry | Result |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 + 0 = 0 |
| 0 | 1 | 1 | 0 | 0 + 1 = 1 |
| 1 | 0 | 1 | 0 | 1 + 0 = 1 |
| 1 | 1 | 0 | 1 | 1 + 1 = 10 (sum 0, carry 1) |

When there is also a carry from the previous column: **1 + 1 + 1 = 11** (sum 1, carry 1).

**Method:**

1. Add the bits column by column, starting from the rightmost (least significant) bit.
2. Write the sum bit below the column, and carry 1 to the next column on the left when the column total is 2 or 3.
3. Write the final carry (if any) at the left of the result.

**Example 1: 1101 + 1110**

| Column (right to left) | Calculation | Sum bit | Carry |
| --- | --- | --- | --- |
| 1st | 1 + 0 | 1 | 0 |
| 2nd | 0 + 1 | 1 | 0 |
| 3rd | 1 + 1 | 0 | 1 |
| 4th | 1 + 1 + 1 (carry) | 1 | 1 |
| Final carry | — | 1 | — |

```text
      1101    (13)
    + 1110    (14)
    ------
     11011    (27)
```

So, 1101 + 1110 = **11011**.

**Example 2: 1010 + 11011**

```text
      01010   (10)
    + 11011   (27)
    -------
     100101   (37)
```

So, 1010 + 11011 = **100101**.

**Example 3 (with fractions): 11.10 + 101.01**

Line up the binary points and add in the same way:

```text
      011.10   (3.5)
    + 101.01   (5.25)
    --------
     1000.11   (8.75)
```

So, 11.10 + 101.01 = **1000.11**.

## Binary Subtraction {#binary-subtraction}

**Binary subtraction** is the subtraction of binary numbers, done column by column from the right, with a borrow from the next column when 1 is subtracted from 0.

**Rules of binary subtraction:**

| A | B | Difference (A − B) | Borrow |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 (borrow 1 from the next higher bit) |

When 1 is subtracted from 0, 1 is **borrowed** from the next higher (left) column. The borrowed 1 has the value 2 (binary 10) in the current column, so 10 − 1 = 1.

**Method:**

1. Subtract column by column, starting from the rightmost bit.
2. If the bit below is larger (0 − 1), borrow 1 from the nearest column on the left that has a 1. That column becomes 0, every 0 passed on the way becomes 1, and the current column gets 10 (= 2).
3. Continue until all columns are subtracted.

**Example 1: 11010 − 01100**

| Column (right to left) | Calculation | Difference bit |
| --- | --- | --- |
| 1st | 0 − 0 | 0 |
| 2nd | 1 − 0 | 1 |
| 3rd | 0 − 1 → borrow from the 4th column: 10 − 1 | 1 |
| 4th | 1 became 0 (it lent 1); 0 − 1 → borrow from the 5th column: 10 − 1 | 1 |
| 5th | 1 became 0 (it lent 1); 0 − 0 | 0 |

```text
      11010   (26)
    − 01100   (12)
    -------
      01110   (14)
```

So, 11010 − 01100 = **01110** (= 1110).

**Example 2: 1101 − 1011**

```text
      1101    (13)
    − 1011    (11)
    ------
      0010    (2)
```

So, 1101 − 1011 = **0010** (= 10).

**Example 3 (with fractions): 110101.101 − 010110.110**

```text
      110101.101   (53.625)
    − 010110.110   (22.75)
    ------------
      011110.111   (30.875)
```

So, 110101.101 − 010110.110 = **011110.111**.

## Subtraction Using 2's Complement {#subtraction-using-2-s-complement}

Computers do not have a separate circuit for subtraction. They subtract by **adding the complement** of the subtrahend, so the same adder circuit can do both addition and subtraction. To understand this, we first need the **1's complement** and the **2's complement**.

### Types of Complements of a Binary Number

A binary number has two types of complements:

1. **1's complement**
2. **2's complement**

#### 1. 1's Complement

**Definition:** The 1's complement of a binary number is obtained by **changing every 0 to 1 and every 1 to 0** (inverting all the bits).

**Formula:** for an *n*-bit binary number N,

```text
 1's complement of N = (2ⁿ − 1) − N
```

**Examples:**

| Binary number | 1's complement |
| --- | --- |
| 0111 | 1000 |
| 1010011 | 0101100 |
| 01011000 | 10100111 |

Check with the formula for 0111 (n = 4): (2⁴ − 1) − 7 = 15 − 7 = 8 = 1000. ✓

#### 2. 2's Complement

**Definition:** The 2's complement of a binary number is its **1's complement plus 1**.

**Formula:** for an *n*-bit binary number N,

```text
 2's complement of N = 2ⁿ − N = (1's complement of N) + 1
```

**Method 1: invert and add 1**

1. Find the 1's complement (invert every bit).
2. Add 1 to the least significant (rightmost) bit.

**Example 1:** 2's complement of 1010011

```text
 Number:            1010011
 1's complement:    0101100
 Add 1:           +       1
                  ---------
 2's complement:    0101101
```

**Example 2:** 2's complement of 01011000

```text
 Number:            01011000
 1's complement:    10100111
 Add 1:           +        1
                  ----------
 2's complement:    10101000
```

**Method 2: shortcut**

1. Starting from the rightmost (least significant) bit, **copy the bits unchanged up to and including the first 1**.
2. **Invert all the remaining bits** to the left.

**Example:** 2's complement of 01011000

```text
 Number:          0 1 0 1 | 1 0 0 0
                  ───────   ───────
                  invert    copy (from the right, up to and including the first 1)

 2's complement:  1 0 1 0 | 1 0 0 0   = 10101000
```

The answer is the same as by Method 1.

**Properties:**

1. The 1's complement of the 1's complement of a number is the number itself.
2. The 2's complement of the 2's complement of a number is the number itself.

### Signed Numbers in 1's and 2's Complement

In a **signed binary number**, the leftmost bit (the most significant bit, MSB) is the **sign bit**:

1. **0** means the number is **positive** (or zero).
2. **1** means the number is **negative**.

Positive numbers are written in ordinary binary in all methods. Negative numbers are written in one of three ways:

1. **Sign-magnitude:** sign bit 1, followed by the magnitude in binary.
2. **1's complement:** the 1's complement of the positive number.
3. **2's complement:** the 2's complement of the positive number.

**All 4-bit signed numbers:**

| Bits | Sign-magnitude | 1's complement | 2's complement |
| --- | --- | --- | --- |
| 0111 | +7 | +7 | +7 |
| 0110 | +6 | +6 | +6 |
| 0101 | +5 | +5 | +5 |
| 0100 | +4 | +4 | +4 |
| 0011 | +3 | +3 | +3 |
| 0010 | +2 | +2 | +2 |
| 0001 | +1 | +1 | +1 |
| 0000 | +0 | +0 | 0 |
| 1000 | −0 | −7 | −8 |
| 1001 | −1 | −6 | −7 |
| 1010 | −2 | −5 | −6 |
| 1011 | −3 | −4 | −5 |
| 1100 | −4 | −3 | −4 |
| 1101 | −5 | −2 | −3 |
| 1110 | −6 | −1 | −2 |
| 1111 | −7 | −0 | −1 |

**Range of numbers with *n* bits:**

| Method | Range | For 4 bits | For 8 bits | For 16 bits | Number of zeros |
| --- | --- | --- | --- | --- | --- |
| Sign-magnitude | −(2ⁿ⁻¹ − 1) to +(2ⁿ⁻¹ − 1) | −7 to +7 | −127 to +127 | −32767 to +32767 | Two (+0 and −0) |
| 1's complement | −(2ⁿ⁻¹ − 1) to +(2ⁿ⁻¹ − 1) | −7 to +7 | −127 to +127 | −32767 to +32767 | Two (+0 and −0) |
| 2's complement | −2ⁿ⁻¹ to +(2ⁿ⁻¹ − 1) | −8 to +7 | −128 to +127 | −32768 to +32767 | One |

In practice, computers represent signed numbers in **2's complement**, because it has only **one zero** and subtraction can be done by simple addition. John von Neumann suggested the use of 2's complement in his 1945 report on the EDVAC, and the EDSAC computer (1949) used it.

**Importance (advantages) of 2's complement:**

1. **Subtraction is done by addition:** A − B = A + (2's complement of B).
2. The **same adder circuit** is used for both addition and subtraction, so the number of circuits is reduced.
3. The circuits are **simpler**, so they are **cheaper** and work **faster**.
4. There is only **one representation of zero**.

**Signed numbers in 8-bit and 16-bit registers:** 2's complement numbers are usually written in an **8-bit** or a **16-bit** register. In both, the leftmost bit is the sign bit.

| Register | Sign bit | Bits for the value | Range in 2's complement |
| --- | --- | --- | --- |
| 8-bit | 1 (the leftmost bit) | 7 | −128 to +127 |
| 16-bit | 1 (the leftmost bit) | 15 | −32768 to +32767 |

**When to use a 16-bit register instead of an 8-bit register:**

1. The number of bits used depends on the **word length of the register**.
2. **8-bit register:** used when the magnitude of the numbers is from **0 to 127**. It has 1 sign bit and 7 bits for the value. The largest value that fits in 7 bits is 111 1111 = 127.
3. **16-bit register:** used for **larger numbers**. If the binary value of a number needs **8 bits or more** (that is, it is more than 7 bits without the sign bit), the number is written in **16 bits** and then its 2's complement is taken. It has 1 sign bit and 15 bits for the value.
4. **Rule to remember:** if the value of **any of the numbers, or of their sum (result), is 128 or more**, a **16-bit** register must be used.

**Examples of choosing the register:**

| Problem | Largest magnitude among the numbers and the result | Register |
| --- | --- | --- |
| (+22) + (−13) = +9 | 22 | 8-bit |
| (−22) + (−13) = −35 | 35 | 8-bit |
| (+65) − (+55) = +10 | 65 | 8-bit |
| (−92) + (−53) = −145 | 145 (the sum is 128 or more) | 16-bit |
| (+200) − (+75) = +125 | 200 (a number is 128 or more) | 16-bit |

> **Note:** some books say a 16-bit register covers decimal numbers "up to 65535". That is the range of an **unsigned** 16-bit number. In a signed 16-bit register, 1 bit is the sign bit and 15 bits hold the value, so the 2's complement range is **−32768 to +32767**. (Strictly, −128 also fits in 8 bits as 1000 0000, but the rule above, "128 or more → 16 bits", is the one to follow in examinations.)

| Number | Sign bit | Remaining 7 bits | 8-bit 2's complement |
| --- | --- | --- | --- |
| +12 | 0 | 0001100 | 0000 1100 |
| −12 | 1 | 1110100 | 1111 0100 |
| +22 | 0 | 0010110 | 0001 0110 |
| −22 | 1 | 1101010 | 1110 1010 |
| +26 | 0 | 0011010 | 0001 1010 |
| −26 | 1 | 1100110 | 1110 0110 |

**Negation:** changing a positive number into the negative number of the same magnitude, or a negative number into the positive one, is called **negation**. In binary, negation is done by taking the **2's complement**: only the sign changes, not the magnitude. Negating twice gives the original number.

```text
 +9               = 0000 1001
 Negation (2's c.) = 1111 0111   = −9
 Negation again    = 0000 1001   = +9
```

#### Writing a Negative Decimal Number in 2's Complement

1. Write the **magnitude** (the number without the minus sign) in binary, using the given number of bits (for example, 8 bits).
2. Take the **2's complement** of it.

**Example 1:** −25 in 8-bit 2's complement

```text
 +25 in 8 bits:     00011001
 1's complement:    11100110
 Add 1:           +        1
                  ----------
 −25:               11100111
```

**Example 2:** −120 in 8-bit 2's complement

```text
 +120 in 8 bits:    01111000
 2's complement:    10001000     (shortcut: copy "1000", invert "0111" → "1000")
 −120:              10001000
```

More 8-bit examples: −1 = 11111111, −5 = 11111011, −18 = 11101110, and **−128 = 10000000** (the most negative 8-bit number).

#### Finding the Decimal Value of a 2's Complement Number

1. If the sign bit is **0**, the number is positive: convert it to decimal in the usual way.
2. If the sign bit is **1**, the number is negative: take its **2's complement** to get the magnitude, convert it to decimal, and put a **minus sign** in front.

**Example:** 11100111 (8-bit 2's complement)

```text
 Sign bit = 1 → negative
 2's complement of 11100111 = 00011001 = 25
 Value = −25
```

Another way: the sign bit has the weight −2ⁿ⁻¹. For 11100111: −128 + 64 + 32 + 4 + 2 + 1 = −25.

### Subtraction Using 1's Complement

**Steps (A − B):**

1. Make both numbers the same number of bits.
2. Find the **1's complement** of the subtrahend B.
3. **Add** it to the minuend A.
4. Check the result:
   1. **If there is a final carry:** remove it and **add it to the least significant bit** of the result (this is called the **end-around carry**). The answer is **positive**.
   2. **If there is no final carry:** the answer is **negative**. Take the **1's complement of the sum** and put a minus sign in front.

**Example 1 (positive result): 10101 − 00111** (21 − 7)

```text
 1's complement of 00111 = 11000

        10101
      + 11000
      -------
       101101
       ↑
       final carry → remove it and add it to the LSB (end-around carry)

        01101
      +     1
      -------
        01110   = +14
```

**Example 2 (negative result): 10101 − 10111** (21 − 23)

```text
 1's complement of 10111 = 01000

        10101
      + 01000
      -------
        11101   (no final carry → the answer is negative)

 1's complement of 11101 = 00010

 Answer: −00010 = −2
```

### Subtraction Using 2's Complement

**Steps (A − B):**

1. Make both numbers the **same number of bits** (add leading zeros to the smaller one).
2. Find the **2's complement of the subtrahend** B.
3. **Add** it to the minuend A.
4. Check the result:
   1. **If there is a final carry** (an extra bit at the left): **discard the carry**. The remaining bits are the answer, and the answer is **positive**.
   2. **If there is no final carry:** the answer is **negative**. Take the **2's complement of the sum** to get its magnitude, and put a minus sign in front.

**Example 1 (positive result): 10101 − 00111** (21 − 7)

```text
 Step 1: 2's complement of 00111 = 11000 + 1 = 11001

 Step 2:      10101   (21)
            + 11001   (2's complement of 7)
            -------
             101110
             ↑
             final carry → discard it

 Answer: 01110 = +14
```

**Example 2 (negative result): 10101 − 10111** (21 − 23)

```text
 Step 1: 2's complement of 10111 = 01000 + 1 = 01001

 Step 2:      10101   (21)
            + 01001   (2's complement of 23)
            -------
              11110   (no final carry → the answer is negative)

 Step 3: 2's complement of 11110 = 00001 + 1 = 00010

 Answer: −00010 = −2
```

**Example 3: 110110 − 100010** (54 − 34)

```text
 Step 1: 2's complement of 100010 = 011101 + 1 = 011110

 Step 2:      110110   (54)
            + 011110
            --------
            1010100
            ↑
            final carry → discard it

 Answer: 010100 = +20
```

**Example 4: (25 − 18) using 8-bit 2's complement**

```text
 +25 =  00011001
 −18 =  11101110      (2's complement of 00010010)

        00011001
      + 11101110
      ----------
       100000111
       ↑
       final carry → discard it

 Answer: 00000111 = +7
```

**Example 5: (18 − 25) using 8-bit 2's complement**

```text
 +18 =  00010010
 −25 =  11100111      (2's complement of 00011001)

        00010010
      + 11100111
      ----------
        11111001      (no final carry; sign bit 1 → negative)

 2's complement of 11111001 = 00000111 = 7

 Answer: −7
```

### Addition of Signed Numbers in 2's Complement

Signed numbers in 2's complement are simply **added in binary**, including the sign bits. Any carry out of the sign bit is **discarded**. The result is also in 2's complement form. The four possible cases (4-bit numbers):

```text
   (+5)    0101          (−5)    1011
 + (+2)  + 0010        + (+2)  + 0010
 ------  ------        ------  ------
   (+7)    0111          (−3)    1101

   (+5)    0101          (−5)    1011
 + (−2)  + 1110        + (−2)  + 1110
 ------  ------        ------  ------
   (+3)   10011          (−7)   11001
          ↑                     ↑
          discard the carry     discard the carry → 1001 = −7
          → 0011 = +3
```

**The four cases with 8-bit numbers:**

```text
 1. Two positive numbers: (+22) + (+9)
      +22 =  0001 0110
      +9  =  0000 1001
            ----------
      +31 =  0001 1111      sign bit 0 → positive

 2. Larger positive + smaller negative: (+22) + (−13)
      +22 =  0001 0110
      −13 =  1111 0011      (2's complement of 0000 1101)
            ----------
            1 0000 1001     discard the carry → 0000 1001 = +9

 3. Larger negative + smaller positive: (−22) + (+13)
      −22 =  1110 1010      (2's complement of 0001 0110)
      +13 =  0000 1101
            ----------
             1111 0111      sign bit 1 → negative;
                            2's complement of 1111 0111 = 0000 1001 = 9 → answer −9

 4. Two negative numbers: (−22) + (−13)
      −22 =  1110 1010
      −13 =  1111 0011
            ----------
            1 1101 1101     discard the carry → 1101 1101; sign bit 1 → negative;
                            2's complement of 1101 1101 = 0010 0011 = 35 → answer −35
```

**Subtraction in an 8-bit register: (+65) − (+55)**

```text
 +65              =  0100 0001
 −55              =  1100 1001      (2's complement of 0011 0111)
                    -----------
                    1 0000 1010     discard the carry → 0000 1010 = +10
```

**Addition in a 16-bit register: (−92) + (−53)**

The sum, −145, is outside the 8-bit range (−128 to +127), so a 16-bit register is used.

```text
 +92 =  0000 0000 0101 1100
 −92 =  1111 1111 1010 0100      (2's complement of +92)

 +53 =  0000 0000 0011 0101
 −53 =  1111 1111 1100 1011      (2's complement of +53)

   −92    1111 1111 1010 0100
 + −53  + 1111 1111 1100 1011
        ----------------------
        1 1111 1111 0110 1111    discard the carry → 1111 1111 0110 1111

 Sign bit 1 → negative.
 2's complement of 1111 1111 0110 1111 = 0000 0000 1001 0001 = 145
 Answer: −145
```

**Subtraction in a 16-bit register: (+200) − (+75)**

+200 is outside the 8-bit range, so a 16-bit register is used.

```text
 +200 =  0000 0000 1100 1000
 −75  =  1111 1111 1011 0101     (2's complement of 0000 0000 0100 1011)
        ----------------------
        1 0000 0000 0111 1101    discard the carry → 0000 0000 0111 1101 = +125
```

### Overflow

**Definition:** **Overflow** occurs when the result of an addition is **too large (or too small) to fit** in the available number of bits.

For example, with 4 bits the 2's complement range is −8 to +7, so +7 + 2 = +9 cannot be represented. To avoid overflow, use a register with more bits (for example, 16 bits instead of 8).

**How to detect overflow:**

1. Overflow can occur only when two numbers of the **same sign** are added.
2. Overflow has occurred if the **carry into the sign bit** and the **carry out of the sign bit** are **different**.
3. Equivalently, overflow has occurred if adding two positive numbers gives a negative result, or adding two negative numbers gives a positive result.

**Examples (4 bits):**

```text
   (+7)    0111          (−7)    1001
 + (+2)  + 0010        + (−2)  + 1110
 ------  ------        ------  ------
   (+9)    1001          (−9)   10111

 Carry into sign bit = 1  Carry into sign bit = 0
 Carry out of sign bit = 0  Carry out of sign bit = 1
 Different → OVERFLOW     Different → OVERFLOW
 (1001 reads as −7)       (0111 reads as +7)
```

### Differences Between 1's Complement and 2's Complement

| Basis | 1's complement | 2's complement |
| --- | --- | --- |
| How it is found | Invert every bit | Invert every bit and add 1 |
| Formula (n bits) | (2ⁿ − 1) − N | 2ⁿ − N |
| Representations of zero | Two (+0 = 0000, −0 = 1111) | One (0000) |
| Range (n bits) | −(2ⁿ⁻¹ − 1) to +(2ⁿ⁻¹ − 1) | −2ⁿ⁻¹ to +(2ⁿ⁻¹ − 1) |
| Range (8 bits) | −127 to +127 | −128 to +127 |
| Final carry in subtraction | Added back to the result (end-around carry) | Discarded |
| Use in computers | Rarely used today | Used by almost all computers |

## Binary Multiplication {#binary-multiplication}

**Binary multiplication** is the multiplication of binary numbers by forming a partial product for each bit of the multiplier (the multiplicand itself for a 1, all 0s for a 0), shifting each partial product one place further left than the one before, and adding them.

**Rules of binary multiplication:**

| A | B | A × B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Method** (the same as decimal long multiplication):

1. Multiply the multiplicand by each bit of the multiplier, starting from the rightmost bit. Multiplying by 1 copies the multiplicand; multiplying by 0 gives all zeros.
2. Shift each new partial product **one place to the left**.
3. **Add** all the partial products using binary addition.

**Example 1: 1101 × 11**

```text
        1101    (13)
      ×   11    (3)
      ------
        1101    ← 1101 × 1
       1101     ← 1101 × 1, shifted one place left
      ------
      100111    (39)
```

So, 1101 × 11 = **100111**.

**Example 2: 11011 × 110**

```text
          11011    (27)
        ×   110    (6)
        -------
          00000    ← 11011 × 0
         11011     ← 11011 × 1, shifted one place left
        11011      ← 11011 × 1, shifted two places left
        --------
        10100010   (162)
```

So, 11011 × 110 = **10100010**.

## Binary Division {#binary-division}

**Binary division** is the division of binary numbers by repeated comparison, subtraction and shifting, in the same way as long division in decimal.

**Rules of binary division:**

| A | B | A ÷ B |
| --- | --- | --- |
| 0 | 1 | 0 |
| 1 | 1 | 1 |
| 0 | 0 | Undefined (meaningless) |
| 1 | 0 | Undefined (meaningless) |

**Method** (the same as decimal long division):

1. Starting from the left of the dividend, take the smallest group of bits that is **greater than or equal to the divisor**; write **1** in the quotient and subtract the divisor from that group.
2. Bring down the next bit of the dividend. If the new value is **smaller than the divisor**, write **0** in the quotient; otherwise write **1** and subtract the divisor.
3. Repeat until all bits of the dividend have been brought down. What is left is the **remainder**.

**Example 1: 110011 ÷ 11**

```text
            10001        ← quotient
         ________
    11 ) 110011
         11              11 ≥ 11 → quotient bit 1; 11 − 11 = 0
         --
          0              bring down 0: 0 < 11  → quotient bit 0
          00             bring down 0: 0 < 11  → quotient bit 0
          001            bring down 1: 1 < 11  → quotient bit 0
          0011           bring down 1: 11 ≥ 11 → quotient bit 1
            11           11 − 11 = 0
            --
             0           ← remainder
```

So, 110011 ÷ 11 = **10001**, remainder **0**. Check: 51 ÷ 3 = 17.

**Example 2: 11011 ÷ 10**

```text
            1101         ← quotient
         _______
    10 ) 11011
         10              11 ≥ 10 → quotient bit 1; 11 − 10 = 1
         --
          10             bring down 0: 10 ≥ 10 → quotient bit 1; 10 − 10 = 0
          10
          --
           01            bring down 1: 1 < 10  → quotient bit 0
           011           bring down 1: 11 ≥ 10 → quotient bit 1; 11 − 10 = 1
            10
            --
             1           ← remainder
```

So, 11011 ÷ 10 = **1101**, remainder **1**. Check: 27 ÷ 2 = 13, remainder 1.

## Octal and Hexadecimal Addition {#octal-and-hexadecimal-addition}

Octal and hexadecimal numbers are added column by column from the right, like decimal numbers. The only difference is when a carry is produced.

### Octal Addition

**Rules:**

1. If the sum of the digits in a column (plus any carry) is **less than 8**, write the sum; the carry is 0.
2. If the sum is **8 or more**, subtract 8: write the remainder and carry **1** to the next column. (In octal, 7 + 1 = 10₈.)

**Example 1: (637)₈ + (543)₈**

| Column (right to left) | Decimal sum | Write | Carry |
| --- | --- | --- | --- |
| 1st | 7 + 3 = 10 | 10 − 8 = 2 | 1 |
| 2nd | 3 + 4 + 1 = 8 | 8 − 8 = 0 | 1 |
| 3rd | 6 + 5 + 1 = 12 | 12 − 8 = 4 | 1 |
| Final carry | — | 1 | — |

```text
      637
    + 543
    -----
     1402
```

So, (637)₈ + (543)₈ = **(1402)₈**.

**Example 2: (427)₈ + (624)₈ = (1253)₈**

**Example 3 (with fractions): (724.54)₈ + (424.14)₈**

```text
      724.54
    + 424.14
    --------
     1350.70
```

So, (724.54)₈ + (424.14)₈ = **(1350.70)₈**.

### Hexadecimal Addition

**Rules:**

1. If the sum of the digits in a column (plus any carry) is **less than 16**, write the hexadecimal digit of the sum (10 = A, 11 = B, … 15 = F); the carry is 0.
2. If the sum is **16 or more**, subtract 16: write the hexadecimal digit of the remainder and carry **1** to the next column. (In hexadecimal, F + 1 = 10₁₆.)

**Example 1: (ABC)₁₆ + (27F)₁₆**

| Column (right to left) | Decimal sum | Write | Carry |
| --- | --- | --- | --- |
| 1st | C + F = 12 + 15 = 27 | 27 − 16 = 11 = B | 1 |
| 2nd | B + 7 + 1 = 11 + 7 + 1 = 19 | 19 − 16 = 3 | 1 |
| 3rd | A + 2 + 1 = 10 + 2 + 1 = 13 | 13 = D | 0 |

```text
      ABC
    + 27F
    -----
      D3B
```

So, (ABC)₁₆ + (27F)₁₆ = **(D3B)₁₆**.

**Example 2: (6DF)₁₆ + (26D)₁₆ = (94C)₁₆**

**Example 3: (ABC)₁₆ + (DEF)₁₆ = (18AB)₁₆**

### Adding Numbers of Different Bases

To add numbers written in different bases, first **convert them to the same base**, then add.

**Example: (36)₈ + (27)₁₀, answer in octal**

```text
 (27)₁₀ = (33)₈        (27 ÷ 8 = 3 remainder 3; 3 ÷ 8 = 0 remainder 3)

      36
    + 33
    ----
      71      (6 + 3 = 9 ≥ 8 → write 1, carry 1;  3 + 3 + 1 = 7)
```

So, (36)₈ + (27)₁₀ = **(71)₈**.

## References {#references}

**TutorialsPoint**

- [Digital Electronics – Binary Arithmetic](https://www.tutorialspoint.com/digital-electronics/digital-electronics-binary-arithmetic.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [How to Subtract Binary Numbers? – Methods and Examples](https://www.geeksforgeeks.org/maths/binary-subtraction/) — accessed 2026-11-01

**TpointTech**

- [Addition and Subtraction using 2's Complement in Digital Electronics](https://www.tpointtech.com/addition-and-subtraction-using-2s-complement-in-digital-electronics) — accessed 2026-11-01

**Additional sources**

- [Chapter 2: Number Systems, Arithmetic, and Code](https://www2.cs.uh.edu/~jhuang/JCH/LD/chapter2h.pdf) — J. C. Huang, Digital Logic Design lecture notes, University of Houston, accessed 2026-11-01
- [Two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) — Wikipedia, accessed 2026-11-01
- [Ones' complement](https://en.wikipedia.org/wiki/Ones%27_complement) — Wikipedia, accessed 2026-11-01
