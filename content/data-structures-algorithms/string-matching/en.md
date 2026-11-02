---
description: String matching (pattern searching) - the naive algorithm, Rabin-Karp with rolling hashes and spurious hits, the Knuth-Morris-Pratt (KMP) algorithm with the LPS (prefix) array, finite-automaton matching and Boyer-Moore, with worked examples, C programs and a complexity comparison.
updated: 2026-11-02
---

### The String-Matching Problem

**String matching (pattern searching)** is the problem of finding **all occurrences of a pattern P** (length **m**) in a **text T** (length **n**, with m ≤ n). The pattern **occurs with shift s** if T[s … s + m − 1] = P[0 … m − 1]. The task is to find all such **valid shifts**.

**Example:** T = "aabaacaadaabaaba", P = "aaba" → valid shifts **0, 9 and 12**.

**Applications:** the "find" command in text editors and browsers, searching in databases and search engines, plagiarism detection and DNA sequence matching in bioinformatics.

### 1. Naive (Brute-Force) Algorithm

**Idea:** try **every shift s = 0, 1, …, n − m**; at each shift, compare the pattern with the text **character by character**; if all m characters match, report s.

```c
#include <stdio.h>
#include <string.h>

void naiveSearch(const char *T, const char *P)
{
    int n = strlen(T), m = strlen(P);
    for (int s = 0; s <= n - m; s++)
    {
        int j = 0;
        while (j < m && T[s + j] == P[j]) j++;
        if (j == m) printf("Pattern found at shift %d\n", s);
    }
}

int main(void)
{
    naiveSearch("aabaacaadaabaaba", "aaba");
    return 0;
}
```

Output:

```text
Pattern found at shift 0
Pattern found at shift 9
Pattern found at shift 12
```

**Example 2:** T = **1011101110** (n = 10), P = **111** (m = 3). The shifts s = 0 to 7 are tried; only **s = 2** (T[2…4] = 111) and **s = 6** (T[6…8] = 111) are valid (0-based positions).

**Complexity:**

1. **Best case: O(n)** — the first character of the pattern mismatches at almost every shift (for example, P = "FAA" in a text with no 'F').
2. **Worst case: O((n − m + 1) × m) = O(n × m)** — many characters match at every shift (for example, T = "AAAAAAAAAAAAAAB", P = "AAAAB").
3. No preprocessing; O(1) extra space.

The naive algorithm is simple, but after a partial match it **throws away** what it has learned and starts again at the next shift.

### 2. Rabin–Karp Algorithm

**Idea:** compare **hash values** instead of characters. Compute the hash of the pattern and the hash of each m-character **window** of the text; only when the **hashes are equal** compare the characters (to confirm the match).

**Hash function:** treat the window as a number in base d (d = size of the alphabet), taken modulo a prime q:

```text
hash(s[0 … m−1]) = ( s[0]·d^(m−1) + s[1]·d^(m−2) + … + s[m−1]·d^0 ) mod q
```

**Rolling hash:** the hash of the next window is computed from the previous one in **O(1)** time, by removing the leftmost character and adding the new one:

```text
t(s+1) = ( d × ( t(s) − T[s]·h ) + T[s+m] ) mod q        where h = d^(m−1) mod q
```

**Spurious hit:** two different strings can have the **same hash value**. A window whose hash equals the pattern's hash but whose characters differ is called a **spurious hit**; this is why the characters must be checked whenever the hashes match.

**Example:** T = "ABCCDDAEFG", P = "CDD", with letter values A = 1, B = 2, C = 3, D = 4, …, d = 10 and q = 13.

1. Pattern hash: 344 mod 13 = **6**.

| Shift | Window | Value | Hash (mod 13) | Result |
| --- | --- | --- | --- | --- |
| 0 | ABC | 123 | 6 | Hash matches, characters differ → **spurious hit** |
| 1 | BCC | 233 | 12 | No match |
| 2 | CCD | 334 | 9 | No match |
| 3 | CDD | 344 | 6 | Hash matches and characters match → **pattern found at shift 3** |

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char T[] = "ABCCDDAEFG", P[] = "CDD";
    int n = strlen(T), m = strlen(P), d = 10, q = 13;
    int p = 0, t = 0, h = 1;

    for (int i = 0; i < m - 1; i++) h = (h * d) % q;          /* h = d^(m-1) mod q */
    for (int i = 0; i < m; i++)
    {
        p = (d * p + (P[i] - 'A' + 1)) % q;                    /* pattern hash */
        t = (d * t + (T[i] - 'A' + 1)) % q;                    /* first window */
    }
    for (int s = 0; s <= n - m; s++)
    {
        if (p == t)
        {
            if (strncmp(T + s, P, m) == 0) printf("Match at shift %d\n", s);
            else printf("Spurious hit at shift %d\n", s);
        }
        if (s < n - m)                                          /* rolling hash */
        {
            t = (d * (t - (T[s] - 'A' + 1) * h) + (T[s + m] - 'A' + 1)) % q;
            if (t < 0) t += q;
        }
    }
    return 0;
}
```

Output:

```text
Spurious hit at shift 0
Match at shift 3
```

**Complexity:** O(m) preprocessing; **average O(n + m)**; **worst case O(n × m)** (when there are many spurious hits or matches). It is useful for searching **many patterns** at once and for plagiarism detection.

### 3. Knuth–Morris–Pratt (KMP) Algorithm

**Idea:** when a mismatch occurs after some characters have matched, the matched characters are already known (they are a prefix of the pattern). KMP uses this to **shift the pattern as far as possible** without moving backwards in the text, so **each text character is examined only once** after matching starts.

**LPS (prefix function / failure function) array:** for each position i of the pattern, **lps[i]** is the length of the **longest proper prefix of P[0 … i] that is also a suffix of P[0 … i]**. (A proper prefix is not the whole string.)

**Example:** P = "aabaaac"

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P[i] | a | a | b | a | a | a | c |
| Prefix P[0…i] | a | aa | aab | aaba | aabaa | aabaaa | aabaaac |
| Longest proper prefix = suffix | — | a | — | a | aa | aa | — |
| **lps[i]** | 0 | 1 | 0 | 1 | 2 | 2 | 0 |

Another example: P = "abcdabca" → lps = [0, 0, 0, 0, 1, 2, 3, 1].

**Search:** keep i (text index) and j (pattern index):

1. If T[i] = P[j]: increase i and j. If j = m, the pattern is found at shift i − m; set j = lps[j − 1] to look for the next occurrence.
2. If T[i] ≠ P[j] and j > 0: set **j = lps[j − 1]** (shift the pattern; i does not move back).
3. If T[i] ≠ P[j] and j = 0: increase i.

```c
#include <stdio.h>
#include <string.h>

void computeLPS(const char *P, int m, int lps[])
{
    int len = 0;                       /* length of the previous longest prefix-suffix */
    lps[0] = 0;
    for (int i = 1; i < m; )
    {
        if (P[i] == P[len]) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
}

void kmpSearch(const char *T, const char *P)
{
    int n = strlen(T), m = strlen(P), lps[100];
    computeLPS(P, m, lps);
    for (int i = 0, j = 0; i < n; )
    {
        if (T[i] == P[j])
        {
            i++; j++;
            if (j == m)
            {
                printf("Pattern found at shift %d\n", i - m);
                j = lps[j - 1];
            }
        }
        else if (j > 0) j = lps[j - 1];          /* do not move i back */
        else i++;
    }
}

int main(void)
{
    int lps[10];
    computeLPS("aabaaac", 7, lps);
    printf("LPS of aabaaac:");
    for (int i = 0; i < 7; i++) printf(" %d", lps[i]);
    printf("\n");
    kmpSearch("aabaacaadaabaaba", "aaba");
    return 0;
}
```

Output:

```text
LPS of aabaaac: 0 1 0 1 2 2 0
Pattern found at shift 0
Pattern found at shift 9
Pattern found at shift 12
```

**Complexity:** O(m) to build the LPS array + O(n) for the search = **O(n + m)** in the **worst case**; O(m) extra space.

### 4. String Matching with a Finite Automaton

**Idea:** build a **finite automaton** (state machine) for the pattern, then feed the text through it, one character at a time.

1. The automaton has **m + 1 states**, 0 to m; **state k** means "the last k characters read match the first k characters of the pattern". State 0 is the start state and **state m is the accepting state** (a match has just ended).
2. The **transition function δ(k, x)** gives the next state: the length of the **longest prefix of P that is a suffix of P[0 … k−1]x**.
3. Each text character causes one transition; whenever state m is reached, the pattern has been found.

**Example:** P = "AABA", alphabet {A, B}:

| State | on A | on B |
| --- | --- | --- |
| 0 | 1 | 0 |
| 1 | 2 | 0 |
| 2 | 2 | 3 |
| 3 | **4** | 0 |
| 4 (accept) | 2 | 0 |

**Complexity:** the search takes **O(n)** (one transition per text character); building the transition table takes O(m³ × |Σ|) with the simple method, or **O(m × |Σ|)** with the LPS (prefix-function) method, where |Σ| is the alphabet size.

### 5. Boyer–Moore Algorithm

**Idea:** compare the pattern with the text **from right to left** (starting at the **last** character of the pattern), and on a mismatch use heuristics to **skip** several positions at once:

1. **Bad-character heuristic:** the text character that caused the mismatch is the "bad character". Shift the pattern so that the **last occurrence of that character in the pattern** lines up with it; if it does not occur in the pattern, shift the pattern **completely past** it.
2. **Good-suffix heuristic:** shift the pattern so that the part already matched lines up with another occurrence of it in the pattern.

**Example:** T = "ABAAABCD", P = "ABC": at shift 0, 'C' ≠ 'A' → shift by 2; at shift 2, 'C' ≠ 'A' → shift by 2; at shift 4, C, B, A all match → **pattern found at shift 4**.

**Complexity:** with the bad-character rule, the **best case is O(n / m)** (large jumps when the text and pattern share few characters), and the worst case is **O(n × m)**. It is very fast in practice for large alphabets and long patterns.

### Comparison of String-Matching Algorithms

| Algorithm | Preprocessing | Matching (worst case) | Main idea |
| --- | --- | --- | --- |
| Naive | None | O((n − m + 1) m) | Try every shift |
| Rabin–Karp | O(m) | O((n − m + 1) m); average O(n + m) | Compare rolling hashes; check characters on a hash match |
| Finite automaton | O(m × \|Σ\|) (or O(m³ \|Σ\|) simply) | O(n) | Feed the text through a pattern automaton |
| KMP | O(m) | **O(n)** | LPS array; never move back in the text |
| Boyer–Moore | O(m + \|Σ\|) | O(n × m); best O(n / m) | Compare right to left; skip with bad-character / good-suffix rules |

## References {#references}

**GeeksforGeeks**

- [Naive Algorithm for Pattern Searching](https://www.geeksforgeeks.org/dsa/naive-algorithm-for-pattern-searching/) — accessed 2026-11-01
- [Rabin-Karp Algorithm for Pattern Searching](https://www.geeksforgeeks.org/dsa/rabin-karp-algorithm-for-pattern-searching/) — accessed 2026-11-01
- [KMP Algorithm for Pattern Searching](https://www.geeksforgeeks.org/dsa/kmp-algorithm-for-pattern-searching/) — accessed 2026-11-01
- [Finite Automata Algorithm for Pattern Searching](https://www.geeksforgeeks.org/dsa/finite-automata-algorithm-for-pattern-searching/) — accessed 2026-11-01
- [Boyer Moore Algorithm for Pattern Searching](https://www.geeksforgeeks.org/dsa/boyer-moore-algorithm-for-pattern-searching/) — accessed 2026-11-01

**TpointTech**

- [String Matching Introduction](https://www.tpointtech.com/daa-string-matching-introduction) — accessed 2026-11-02
- [Naive String Matching Algorithm](https://www.tpointtech.com/daa-naive-string-matching-algorithm) — accessed 2026-11-02
- [Rabin-Karp Algorithm](https://www.tpointtech.com/daa-rabin-karp-algorithm) — accessed 2026-11-02
- [String Matching with Finite Automata](https://www.tpointtech.com/daa-string-matching-with-finite-automata) — accessed 2026-11-02
- [Knuth-Morris-Pratt Algorithm](https://www.tpointtech.com/daa-knuth-morris-pratt-algorithm) — accessed 2026-11-02
- [Boyer-Moore Algorithm](https://www.tpointtech.com/daa-boyer-moore-algorithm) — accessed 2026-11-02

**Programiz**

- [Rabin-Karp Algorithm](https://www.programiz.com/dsa/rabin-karp-algorithm) — accessed 2026-11-01
