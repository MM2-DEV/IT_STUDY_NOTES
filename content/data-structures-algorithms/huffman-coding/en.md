---
description: Huffman coding - the greedy lossless compression technique, prefix codes, the algorithm for building the Huffman tree with a min-priority queue, worked examples with code tables and bit savings, decoding, C program, complexity and applications.
updated: 2026-11-02
---

## Huffman Encoding Technique / Algorithm {#huffman-encoding-technique-algorithm}

### Introduction

**Huffman coding** is a **lossless data compression** technique. It assigns **variable-length binary codes** to the characters of the input: **frequently occurring characters get short codes** and **rare characters get long codes**, so the total number of bits needed is reduced. It was developed by **David A. Huffman** while he was a student at MIT, and published in **1952** ("A Method for the Construction of Minimum-Redundancy Codes").

Huffman coding is a **greedy algorithm**: at every step it combines the two **least frequent** items.

**Fixed-length vs variable-length codes:** with a fixed-length code, every character uses the same number of bits (for example, 8 bits in ASCII, or 3 bits for 6 different characters). A variable-length code such as Huffman's uses fewer bits for common characters, so the encoded message is shorter.

### Prefix Codes

Huffman codes are **prefix codes (prefix-free codes)**: **no code is a prefix of another code**. This makes decoding **unambiguous** — the decoder always knows where one code ends and the next begins, without any separator.

**Example of a code that is not prefix-free:** a = 0, b = 1, c = 00, d = 01. The bit string `0001` could be read as "aaab", "cd", "aad" and so on, so it cannot be decoded uniquely. Because the Huffman codes are taken from the **leaves** of a binary tree, no code can be a prefix of another.

### Algorithm

**Building the Huffman tree:**

1. Count the **frequency** of each character.
2. Create a **leaf node** for each character and insert all of them into a **min-priority queue (min-heap)** keyed by frequency.
3. **Remove the two nodes with the lowest frequencies.**
4. Create a **new internal node** whose frequency is the **sum** of the two; make the first removed node its **left child** and the second its **right child**. Insert the new node into the queue.
5. **Repeat steps 3 and 4** until only **one node** remains; this node is the **root** of the Huffman tree.

**Assigning the codes:** traverse the tree from the root, writing **0 for every left edge** and **1 for every right edge**. The path from the root to a leaf is the code of that leaf's character.

```text
HUFFMAN(C)                       C = set of n characters with frequencies
1. Q ← min-priority queue of all characters in C
2. for i ← 1 to n − 1
3.     x ← EXTRACT-MIN(Q)
4.     y ← EXTRACT-MIN(Q)
5.     z ← new node;  z.left ← x;  z.right ← y
6.     z.freq ← x.freq + y.freq
7.     INSERT(Q, z)
8. return EXTRACT-MIN(Q)         (the root of the tree)
```

For n characters there are exactly **n − 1 merge steps**, and the tree has **n leaves** and **n − 1 internal nodes**.

### Example 1

Six characters with these frequencies (out of 100 characters):

| Character | a | b | c | d | e | f |
| --- | --- | --- | --- | --- | --- | --- |
| Frequency | 5 | 9 | 12 | 13 | 16 | 45 |

**Building the tree:**

| Step | Two smallest removed | New node | Queue after the step |
| --- | --- | --- | --- |
| 1 | a:5, b:9 | 14 | c:12, d:13, 14, e:16, f:45 |
| 2 | c:12, d:13 | 25 | 14, e:16, 25, f:45 |
| 3 | 14, e:16 | 30 | 25, 30, f:45 |
| 4 | 25, 30 | 55 | f:45, 55 |
| 5 | f:45, 55 | 100 (root) | 100 |

![Huffman tree for a:5, b:9, c:12, d:13, e:16, f:45 with left edges labelled 0 and right edges labelled 1](/diagrams/data-structures-algorithms/huffman-tree.svg)

**Codes and bits:**

| Character | Frequency | Huffman code | Code length | Bits (frequency × length) |
| --- | --- | --- | --- | --- |
| f | 45 | 0 | 1 | 45 |
| c | 12 | 100 | 3 | 36 |
| d | 13 | 101 | 3 | 39 |
| e | 16 | 111 | 3 | 48 |
| a | 5 | 1100 | 4 | 20 |
| b | 9 | 1101 | 4 | 36 |
| **Total** | **100** | | | **224** |

1. **Huffman coding:** 224 bits; average code length = 224 / 100 = **2.24 bits per character**.
2. **Fixed-length code:** 6 characters need 3 bits each → 100 × 3 = **300 bits**.
3. **ASCII (8 bits per character):** 100 × 8 = **800 bits**.

The most frequent character, f, gets the shortest code (1 bit); the least frequent, a and b, get the longest (4 bits).

### Example 2

Encode the string **BCAADDDCCACACAC** (15 characters).

1. Frequencies: B = 1, D = 3, A = 5, C = 6.
2. Merge B:1 and D:3 → 4; merge 4 and A:5 → 9; merge C:6 and 9 → 15 (root).
3. Codes: **C = 0**, **B = 100**, **D = 101**, **A = 11**.

| Character | Frequency | Code | Bits |
| --- | --- | --- | --- |
| A | 5 | 11 | 10 |
| B | 1 | 100 | 3 |
| C | 6 | 0 | 6 |
| D | 3 | 101 | 9 |
| **Total** | **15** | | **28** |

Without compression, 15 characters × 8 bits = **120 bits**; the Huffman-encoded data needs only **28 bits**. (To decode the file, the code table or tree must also be stored with it.)

### Example 3

Encode the 20-character string **abbcdbccdaabbeeebeab**.

1. Frequencies: a = 4, b = 7, c = 3, d = 2, e = 4.
2. Merges: d:2 + c:3 → 5; a:4 + e:4 → 8; 5 + b:7 → 12; 8 + 12 → 20 (root).
3. Codes: **a = 00, e = 01, b = 11, d = 100, c = 101** (a and e have equal frequency, so their codes may be swapped).

| Character | Frequency | Code | Bits |
| --- | --- | --- | --- |
| a | 4 | 00 | 8 |
| e | 4 | 01 | 8 |
| b | 7 | 11 | 14 |
| d | 2 | 100 | 6 |
| c | 3 | 101 | 9 |
| **Total** | **20** | | **45** |

Average code length = 45 / 20 = **2.25 bits per character**, compared with 3 bits for a fixed-length code (60 bits) and 8 bits in ASCII (160 bits).

### Decoding

Start at the **root** and read the bits one by one: go **left on 0** and **right on 1**. When a **leaf** is reached, output its character and go back to the root.

**Example:** decode `1100 0 101` (spaces added only for readability) with the codes of Example 1:

1. 1 → 1 → 0 → 0 reaches leaf **a**.
2. 0 reaches leaf **f**.
3. 1 → 0 → 1 reaches leaf **d**.

The decoded text is **"afd"**.

**Note:** when two frequencies are equal, the choice of which node goes left can differ, so **different correct Huffman trees and codes** are possible for the same input; all of them give the **same total number of bits**.

### Program

The program builds the tree for Example 1 by repeatedly choosing the two smallest unused nodes, then prints each character's code.

```c
#include <stdio.h>

#define MAXN 20

int freq[MAXN], left[MAXN], right[MAXN], used[MAXN], count;
char sym[MAXN];

int smallest(void)                       /* index of the unused node with the lowest frequency */
{
    int best = -1;
    for (int i = 0; i < count; i++)
        if (!used[i] && (best == -1 || freq[i] < freq[best]))
            best = i;
    used[best] = 1;
    return best;
}

void printCodes(int node, char *code, int depth)
{
    if (left[node] == -1)                /* leaf */
    {
        code[depth] = '\0';
        printf("%c: %s\n", sym[node], code);
        return;
    }
    code[depth] = '0'; printCodes(left[node], code, depth + 1);
    code[depth] = '1'; printCodes(right[node], code, depth + 1);
}

int main(void)
{
    char chars[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    int f[] = {5, 9, 12, 13, 16, 45}, n = 6;

    for (count = 0; count < n; count++)
    {
        sym[count] = chars[count]; freq[count] = f[count];
        left[count] = right[count] = -1; used[count] = 0;
    }
    for (int step = 0; step < n - 1; step++)    /* n - 1 merges */
    {
        int x = smallest(), y = smallest();
        freq[count] = freq[x] + freq[y];
        left[count] = x; right[count] = y; used[count] = 0;
        count++;
    }
    char code[MAXN];
    printCodes(count - 1, code, 0);             /* the last node is the root */
    return 0;
}
```

Output:

```text
f: 0
c: 100
d: 101
a: 1100
b: 1101
e: 111
```

(This simple program finds the minimum by a linear scan, which takes O(n²); a min-heap gives O(n log n).)

### Complexity

1. **Time:** **O(n log n)** for n distinct characters, using a min-heap: there are n − 1 merge steps, each with two extract-min operations and one insert of O(log n).
2. **Space:** O(n) for the tree and the queue.

### Advantages and Disadvantages

**Advantages:**

1. **Lossless:** the original data is recovered exactly.
2. Gives an **optimal prefix code** for symbol-by-symbol coding when the character frequencies are known.
3. Prefix codes are decoded **without ambiguity** and without separators.

**Disadvantages:**

1. The frequency table or tree must be stored or sent along with the encoded data.
2. Two passes over the data are needed (one to count frequencies, one to encode).
3. Gives little compression when all characters have nearly equal frequencies.

### Applications

1. File compression formats such as **ZIP (PKZIP)**, **GZIP** and **BZIP2**.
2. **Text and fax** transmission.
3. Multimedia formats such as **JPEG** and **MP3**, which use Huffman coding as one of their stages.

## References {#references}

**TutorialsPoint**

- [Huffman Coding](https://www.tutorialspoint.com/article/huffman-coding) — accessed 2026-11-01

**GeeksforGeeks**

- [Huffman Coding (Greedy Algorithm)](https://www.geeksforgeeks.org/dsa/huffman-coding-greedy-algo-3/) — accessed 2026-11-01

**TpointTech**

- [Huffman Coding Algorithm](https://www.tpointtech.com/huffman-coding-algorithm) — accessed 2026-11-02
- [Huffman Encoding](https://www.tpointtech.com/huffman-encoding) — accessed 2026-11-02 (its code table and encoded "BEAD" example are wrong)

**Programiz**

- [Huffman Coding](https://www.programiz.com/dsa/huffman-coding) — accessed 2026-11-01

**Additional sources**

- [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding) — Wikipedia (inventor, 1952 paper, optimality; not given by the reference websites) — accessed 2026-11-01
