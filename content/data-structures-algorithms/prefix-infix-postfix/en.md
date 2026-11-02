---
description: Infix, prefix (Polish) and postfix (reverse Polish) notation, operator precedence and associativity, and the stack algorithms for converting between all three notations and evaluating prefix and postfix expressions, with worked examples and C programs.
updated: 2026-11-02
---

## Prefix, Infix and Postfix (Polish) Notation {#prefix-infix-and-postfix-polish-notation}

An arithmetic expression is made of **operands** (constants or variables such as `a`, `5`) and **operators** (`+`, `−`, `*`, `/`, `^`). The same expression can be written in three equivalent notations, depending on **where the operator is placed relative to its operands**.

### 1. Infix Notation

The operator is written **between** its two operands: `a + b`.

1. This is the ordinary notation used by people in mathematics.
2. It is easy for humans to read, but **difficult for a computer to evaluate directly**, because the computer must apply **precedence** and **associativity** rules and handle **parentheses**.

### 2. Prefix Notation (Polish Notation)

The operator is written **before** its operands: `+ a b`.

The notation was introduced by the Polish logician **Jan Łukasiewicz in 1924**, so it is called **Polish notation**.

### 3. Postfix Notation (Reverse Polish Notation, RPN)

The operator is written **after** its operands: `a b +`.

Because it is the reverse of Polish notation, postfix is called **Reverse Polish Notation (RPN)**.

### Examples

| Infix | Prefix | Postfix |
| --- | --- | --- |
| a + b | + a b | a b + |
| (a + b) * c | * + a b c | a b + c * |
| a * (b + c) | * a + b c | a b c + * |
| a / b + c / d | + / a b / c d | a b / c d / + |
| (a + b) * (c + d) | * + a b + c d | a b + c d + * |
| ((a + b) * c) − d | − * + a b c d | a b + c * d − |
| (a + b * d) * (b − c) | * + a * b d − b c | a b d * + b c − * |

### Operator Precedence and Associativity

**Precedence** decides which operator is applied first; for example, in `a + b * c` the multiplication is done first. **Associativity** decides the order when operators of **equal precedence** appear together.

| Precedence | Operators | Associativity |
| --- | --- | --- |
| Highest | `^` (exponent; also written `$` or `↑`) | Right to left: `a ^ b ^ c` = `a ^ (b ^ c)` |
| Middle | `*`, `/` | Left to right: `a / b * c` = `(a / b) * c` |
| Lowest | `+`, `−` | Left to right: `a − b − c` = `(a − b) − c` |

Parentheses override these rules: the part inside `( )` is evaluated first.

### Why Prefix and Postfix Are Used

1. **No parentheses are needed:** the position of each operator fixes the order of evaluation.
2. **No precedence or associativity rules are needed** during evaluation.
3. The expression can be evaluated in a **single scan using a stack**, in O(n) time.
4. For these reasons, compilers and calculators convert infix expressions to postfix (or prefix) before computing them.

### Differences Between Infix, Prefix and Postfix

| Basis | Infix | Prefix | Postfix |
| --- | --- | --- | --- |
| Operator position | Between the operands | Before the operands | After the operands |
| Other name | — | Polish notation | Reverse Polish notation |
| Example | a + b * c | + a * b c | a b c * + |
| Parentheses | Needed to change the order | Never needed | Never needed |
| Precedence rules during evaluation | Needed | Not needed | Not needed |
| Evaluated by scanning | — (converted first) | Right to left | Left to right |
| Readability | Easy for humans | Easy for computers | Easy for computers |

### Manual Conversion (Bracket Method)

For quick conversion by hand:

1. **Fully parenthesise** the infix expression according to precedence and associativity.
2. For **postfix**, move each operator to the place of its **closing** bracket; for **prefix**, move it to the place of its **opening** bracket.
3. Remove the brackets.

**Example:** `a + b * c` → `(a + (b * c))`

- Postfix: `(a (b c *) +)` → `a b c * +`
- Prefix: `+ (a * (b c))` → `+ a * b c`

## Transformation and Evaluation Algorithms {#transformation-and-evaluation-algorithms}

All the algorithms below use a **stack** and take **O(n)** time and **O(n)** space for an expression of length n.

### 1. Infix to Postfix Conversion

**Algorithm:** scan the infix expression from **left to right**.

1. If the symbol is an **operand**, add it to the output (postfix string).
2. If it is a left parenthesis **`(`**, push it onto the stack.
3. If it is a right parenthesis **`)`**, pop operators from the stack and add them to the output **until `(` is found**; pop and discard the `(`.
4. If it is an **operator** `op`:
   1. While the stack is not empty, the top is not `(`, and the top operator has **higher precedence** than `op` (or **equal precedence and `op` is left-associative**), pop the top and add it to the output.
   2. Then **push** `op`.
5. At the end, **pop all remaining operators** and add them to the output.

**Example:** convert `A + B / C * (D + E) − F` to postfix.

| Symbol | Stack (top on the right) | Postfix output | Action |
| --- | --- | --- | --- |
| A | | A | Operand → output |
| + | + | A | Push |
| B | + | A B | Output |
| / | + / | A B | `/` is higher than `+` → push |
| C | + / | A B C | Output |
| * | + * | A B C / | `/` has equal precedence (left-assoc.) → pop; push `*` |
| ( | + * ( | A B C / | Push |
| D | + * ( | A B C / D | Output |
| + | + * ( + | A B C / D | Top is `(` → push |
| E | + * ( + | A B C / D E | Output |
| ) | + * | A B C / D E + | Pop until `(` |
| − | − | A B C / D E + * + | Pop `*`, then `+` (equal); push `−` |
| F | − | A B C / D E + * + F | Output |
| End | | A B C / D E + * + F − | Pop the rest |

**Result:** `A B C / D E + * + F −`

**Example 2:** `A + (B * C − (D / E ^ F) * G) * H` → `A B C * D E F ^ / G * − H * +`

### 2. Infix to Prefix Conversion

**Algorithm (reverse method):**

1. **Reverse** the infix expression.
2. **Swap** every `(` with `)` and every `)` with `(`.
3. Convert the result to **postfix** with the algorithm above, with one change for equal precedence: pop the top only when `op` is **right-associative** (`^`); left-associative operators of equal precedence are pushed without popping.
4. **Reverse** the postfix result. This gives the prefix expression.

In short: **Prefix = reverse(postfix(reverse(infix)))**.

**Example:** convert `a * (b + c) / d` to prefix.

1. Reverse: `d / ) c + b ( * a`
2. Swap the brackets: `d / ( c + b ) * a`
3. Convert to postfix:

| Symbol | Stack | Output | Action |
| --- | --- | --- | --- |
| d | | d | Output |
| / | / | d | Push |
| ( | / ( | d | Push |
| c | / ( | d c | Output |
| + | / ( + | d c | Push |
| b | / ( + | d c b | Output |
| ) | / | d c b + | Pop until `(` |
| * | / * | d c b + | Equal precedence, left-associative → push without popping |
| a | / * | d c b + a | Output |
| End | | d c b + a * / | Pop the rest |

4. Reverse `d c b + a * /` → **`/ * a + b c d`**

### 3. Evaluation of a Postfix Expression

**Algorithm:** scan the postfix expression from **left to right**.

1. If the symbol is an **operand**, push it onto the stack.
2. If it is an **operator**, pop two values: the **first popped is the right operand (B)** and the **second popped is the left operand (A)**. Compute **A op B** and push the result.
3. At the end, the **single value on the stack** is the result.

**Example:** evaluate `12 7 3 − / 2 +`

| Symbol | Action | Stack (top on the right) |
| --- | --- | --- |
| 12 | Push | 12 |
| 7 | Push | 12, 7 |
| 3 | Push | 12, 7, 3 |
| − | Pop 3 and 7 → 7 − 3 = 4 | 12, 4 |
| / | Pop 4 and 12 → 12 / 4 = 3 | 3 |
| 2 | Push | 3, 2 |
| + | Pop 2 and 3 → 3 + 2 = 5 | 5 |

**Result: 5** (the infix form is `12 / (7 − 3) + 2`).

**Example 2:** `10 5 2 + * 12 3 / −` = `10 * (5 + 2) − 12 / 3` = 70 − 4 = **66**.

### 4. Evaluation of a Prefix Expression

**Algorithm:** scan the prefix expression from **right to left**.

1. If the symbol is an **operand**, push it onto the stack.
2. If it is an **operator**, pop two values: the **first popped is the left operand (A)** and the **second popped is the right operand (B)**. Compute **A op B** and push the result.
3. At the end, the single value on the stack is the result.

**Example:** evaluate `+ * / + 100 200 2 5 7`

| Symbol (right to left) | Action | Stack (top on the right) |
| --- | --- | --- |
| 7 | Push | 7 |
| 5 | Push | 7, 5 |
| 2 | Push | 7, 5, 2 |
| 200 | Push | 7, 5, 2, 200 |
| 100 | Push | 7, 5, 2, 200, 100 |
| + | Pop 100 and 200 → 100 + 200 = 300 | 7, 5, 2, 300 |
| / | Pop 300 and 2 → 300 / 2 = 150 | 7, 5, 150 |
| * | Pop 150 and 5 → 150 * 5 = 750 | 7, 750 |
| + | Pop 750 and 7 → 750 + 7 = 757 | 757 |

**Result: 757** (the infix form is `((100 + 200) / 2) * 5 + 7`).

### 5. Postfix to Infix Conversion

Scan **left to right**. Push operands. For an operator, pop B (first) and A (second), and push the string **`(A op B)`**. The final string is the infix expression.

**Example:** `a b c / −` → push a, b, c; `/` gives `(b / c)`; `−` gives **`(a − (b / c))`**.

### 6. Prefix to Infix Conversion

Scan **right to left**. Push operands. For an operator, pop A (first) and B (second), and push **`(A op B)`**.

**Example:** `− * + a b c d`: push d, c, b, a; `+` gives `(a + b)`; `*` gives `((a + b) * c)`; `−` gives **`(((a + b) * c) − d)`**.

### 7. Prefix to Postfix Conversion

Scan the prefix expression from **right to left**. Push operands. For an operator, pop A (first) and B (second), and push the string **`A B op`**. The final string is the postfix expression.

**Example:** `* − A / B C − / A K L`

1. Push L, K, A; `/` → `A K /`; `−` → `A K / L −`.
2. Push C, B; `/` → `B C /`; push A; `−` → `A B C / −`.
3. `*` → **`A B C / − A K / L − *`**.

### 8. Postfix to Prefix Conversion

Scan the postfix expression from **left to right**. Push operands. For an operator, pop B (first) and A (second), and push the string **`op A B`**. The final string is the prefix expression.

**Example:** `A B + C D − *`

1. `A B +` → `+ A B`.
2. `C D −` → `− C D`.
3. `*` → **`* + A B − C D`**.

(Converting the first result back gives the original: postfix `A B C / − A K / L − *` → prefix `* − A / B C − / A K L`.)

**Another prefix-evaluation example:** `+ − * 2 2 / 16 8 5` = (2 × 2 − 16 / 8) + 5 = (4 − 2) + 5 = **7**.

### Program: Infix to Postfix in C

The program handles single-letter or single-digit operands and the operators `+ − * / ^` (`^` is right-associative).

```c
#include <stdio.h>
#include <ctype.h>

char stack[100];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop(void)    { return stack[top--]; }

int prec(char op)
{
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;                       /* '(' */
}

void infixToPostfix(const char *in, char *out)
{
    int k = 0;
    for (int i = 0; in[i]; i++)
    {
        char c = in[i];
        if (isalnum(c))
            out[k++] = c;                               /* operand */
        else if (c == '(')
            push(c);
        else if (c == ')')
        {
            while (stack[top] != '(') out[k++] = pop();
            pop();                                      /* discard '(' */
        }
        else                                            /* operator */
        {
            while (top != -1 && stack[top] != '(' &&
                   (prec(stack[top]) > prec(c) ||
                    (prec(stack[top]) == prec(c) && c != '^')))
                out[k++] = pop();
            push(c);
        }
    }
    while (top != -1) out[k++] = pop();
    out[k] = '\0';
}

int main(void)
{
    char out[100];
    infixToPostfix("A+B/C*(D+E)-F", out);
    printf("%s\n", out);            /* ABC/DE+*+F- */
    infixToPostfix("a^b^c", out);
    printf("%s\n", out);            /* abc^^ */
    return 0;
}
```

Output:

```text
ABC/DE+*+F-
abc^^
```

### Program: Postfix Evaluation in C

The tokens are separated by spaces, so numbers may have several digits.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int stack[100], top = -1;

int evaluatePostfix(char *expr)
{
    for (char *tok = strtok(expr, " "); tok; tok = strtok(NULL, " "))
    {
        if (isdigit((unsigned char) tok[0]))
            stack[++top] = atoi(tok);                   /* operand */
        else
        {
            int b = stack[top--];                       /* right operand */
            int a = stack[top--];                       /* left operand */
            switch (tok[0])
            {
                case '+': stack[++top] = a + b; break;
                case '-': stack[++top] = a - b; break;
                case '*': stack[++top] = a * b; break;
                case '/': stack[++top] = a / b; break;
            }
        }
    }
    return stack[top--];
}

int main(void)
{
    char e1[] = "12 7 3 - / 2 +";
    char e2[] = "10 5 2 + * 12 3 / -";
    printf("%d\n", evaluatePostfix(e1));    /* 5 */
    printf("%d\n", evaluatePostfix(e2));    /* 66 */
    return 0;
}
```

Output:

```text
5
66
```

## References {#references}

**TutorialsPoint**

- [Infix to Postfix](https://www.tutorialspoint.com/data_structures_algorithms/infix_to_postfix.htm) — accessed 2026-11-02
- [Expression Parsing](https://www.tutorialspoint.com/data_structures_algorithms/expression_parsing.htm) — accessed 2026-11-01
- [Prefix and Postfix Expressions in Data Structure](https://www.tutorialspoint.com/article/prefix-and-postfix-expressions-in-data-structure) — accessed 2026-11-01

**GeeksforGeeks**

- [Convert Infix Expression to Postfix Expression](https://www.geeksforgeeks.org/dsa/convert-infix-expression-to-postfix-expression/) — accessed 2026-11-01
- [Convert Infix to Prefix Notation](https://www.geeksforgeeks.org/dsa/convert-infix-prefix-notation/) — accessed 2026-11-01
- [Evaluation of Postfix Expression](https://www.geeksforgeeks.org/dsa/evaluation-of-postfix-expression/) — accessed 2026-11-01
- [Evaluation of Prefix Expressions](https://www.geeksforgeeks.org/dsa/evaluation-prefix-expressions/) — accessed 2026-11-01
- [Postfix to Infix](https://www.geeksforgeeks.org/dsa/postfix-to-infix/) — accessed 2026-11-01
- [Prefix to Infix Conversion](https://www.geeksforgeeks.org/dsa/prefix-infix-conversion/) — accessed 2026-11-01

**TpointTech**

- [Convert Infix to Prefix Notation](https://www.tpointtech.com/convert-infix-to-prefix-notation) — accessed 2026-11-02
- [Conversion of Prefix to Postfix Expression](https://www.tpointtech.com/conversion-of-prefix-to-postfix-expression) — accessed 2026-11-02
- [Conversion of Postfix to Prefix Expression](https://www.tpointtech.com/conversion-of-postfix-to-prefix-expression) — accessed 2026-11-02
- [Convert Infix to Postfix Notation](https://www.tpointtech.com/convert-infix-to-postfix-notation) — accessed 2026-11-01

**IT Job QnS**

- [Data Structure](https://it.jobqns.com/data-structure/) — accessed 2026-11-01

**Additional sources**

- [Polish notation](https://en.wikipedia.org/wiki/Polish_notation) — Wikipedia (origin of the name; not covered by the reference websites) — accessed 2026-11-01
