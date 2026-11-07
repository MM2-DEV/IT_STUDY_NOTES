---
description: Introduction to PROLOG - logic programming, history and features, facts, rules and queries, data objects (atoms, numbers, variables, structures), unification, backtracking and the cut, arithmetic and comparison operators, recursion, lists, negation as failure, and applications, with programs run in SWI-Prolog.
updated: 2026-11-06
---

### Logic Programming

Logic programming is a **programming paradigm in which a program is a set of facts and rules written in formal logic, and computation is done by asking questions (queries) that the system answers by logical inference**.

A rule has a **head** and a **body**: "H is true if B1, B2 and B3 are true". A **fact** is a rule with no body ("H is true"). The programmer states **what** is true about the problem; the system works out **how** to find an answer. Examples of logic programming languages are **Prolog**, Datalog and Answer Set Programming (ASP).

### Definition of PROLOG

PROLOG (**PRO**gramming in **LOG**ic) is a **declarative logic programming language in which a program consists of facts and rules about objects and their relations, and answers are found by querying them**.

It is suited to **symbolic, non-numeric computation** — symbol manipulation and inference — which is why it is widely used in artificial intelligence.

### History of PROLOG

1. PROLOG was created in **1972** by **Alain Colmerauer** and **Philippe Roussel** at the University of Marseille (France), based on **Robert Kowalski**'s procedural interpretation of Horn clauses. The first system was **Marseille Prolog**.
2. **Edinburgh Prolog**, developed by David H. D. Warren at the University of Edinburgh in the 1970s, defined the standard syntax; the language was standardized by ISO in **1995** (ISO/IEC 13211-1).
3. In the 1980s, Japan's **Fifth Generation Computer Systems** project based its kernel language on Prolog. Prolog is therefore usually described as a **fifth-generation language**.
4. Popular implementations today are **SWI-Prolog** (free), GNU Prolog, SICStus and Visual Prolog.

### Features of PROLOG

1. **Declarative** — programs describe facts and relationships, not step-by-step procedures.
2. **Built-in inference engine** — answers queries by **resolution**, searching the facts and rules.
3. **Unification (pattern matching)** — matches terms by finding values for variables that make them identical.
4. **Automatic backtracking** — when a goal fails, Prolog goes back and tries other alternatives; it can find all solutions.
5. **Recursion** — the main way of repetition (there are no loops).
6. **Built-in lists** and powerful symbolic data structures.
7. **Logical variables**, which are untyped (Prolog is dynamically typed).

### Logic Programming vs Procedural Programming

| Basis | Logic programming (Prolog) | Procedural programming (C, Java) |
| --- | --- | --- |
| Program states | **What** is true (facts and rules) | **How** to compute (sequence of steps) |
| Basic unit | Clause (fact or rule) | Statement, function |
| Control | Built-in (search and backtracking) | Written by the programmer |
| Repetition | Recursion | Loops and recursion |
| Variables | Logical variables, bound once by unification | Memory locations that can be reassigned |
| Execution | Answering queries by inference | Executing statements in order |
| Suited to | Symbolic AI, reasoning, NLP, expert systems | Numeric and general-purpose computing |

### Facts

**Fact** is an **unconditionally true statement about objects or the relationship between them**.

**Syntax:** `relation(object1, object2, ...).`

1. The name of the relation (the **predicate**) and constant objects begin with a **lower-case** letter.
2. The relation name comes first; the objects are written in parentheses, separated by commas.
3. Every fact ends with a **full stop (.)**.

Examples: `cat(tom).` (Tom is a cat), `likes(nila, mango).` (Nila likes mango), `parent(rahim, karim).` (Rahim is a parent of Karim).

### Rules

Rules are **statements that are true only when their conditions are true**; each rule defines a new relation in terms of other relations.

**Syntax:** `head :- body.`

1. The symbol **`:-`** is read as **"if"** (it is called the **neck**).
2. The **head** (left side) is true if the **body** (right side) is true.
3. A **comma (,)** in the body means **AND** (conjunction); a **semicolon (;)** means **OR** (disjunction).

Example: `grandparent(X, Z) :- parent(X, Y), parent(Y, Z).` — X is a grandparent of Z **if** X is a parent of Y **and** Y is a parent of Z.

### Queries

**Query** is a **question asked to the Prolog system about the relationships in the knowledge base**, written after the prompt `?-`.

Prolog answers **true** (or gives the values of the variables) if the query can be proved from the facts and rules, and **false** if it cannot. With variables in a query, pressing `;` asks for the **next** answer (by backtracking).

### Knowledge Base

The facts and rules of a program together form the **knowledge base** (the **database**). A Prolog program is a knowledge base; the program is run by **consulting** (loading) it and asking queries.

### Example: A Family Knowledge Base

```prolog
% Facts
male(rahim).
male(karim).
male(sami).
female(fatema).
female(nila).
female(rina).

parent(rahim, karim).
parent(fatema, karim).
parent(rahim, nila).
parent(karim, sami).
parent(karim, rina).

% Rules
father(X, Y) :- parent(X, Y), male(X).
mother(X, Y) :- parent(X, Y), female(X).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
sibling(X, Y) :- parent(P, X), parent(P, Y), X \= Y.
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```

Queries and SWI-Prolog's answers:

```text
?- parent(rahim, karim).
true.

?- parent(sami, rahim).
false.

?- father(X, karim).
X = rahim.

?- grandparent(rahim, Z).
Z = sami ;
Z = rina.

?- sibling(sami, Y).
Y = rina.

?- ancestor(X, rina).
X = karim ;
X = rahim ;
X = fatema.
```

The rule `ancestor` is **recursive**: the first clause is the base case (a parent is an ancestor), and the second says that a parent of an ancestor is also an ancestor.

### Data Objects (Terms)

Everything in Prolog is a **term**. Terms are of these types:

1. **Atoms** — symbolic constants: strings of letters, digits and underscores beginning with a **lower-case** letter (`tom`, `b_59`); strings of special characters (`:-`, `=>`); or any characters in **single quotes** (`'Dhaka City'`).
2. **Numbers** — integers (`100`, `-81`) and real numbers (`3.14`).
3. **Variables** — begin with an **upper-case** letter or an underscore (`X`, `Sum`, `_temp`). A variable stands for an unknown object and gets a value only by unification.
4. **Anonymous variable** — a single underscore **`_`**, used when the value is not needed; each `_` is a different variable.
5. **Structures (compound terms)** — a **functor** with arguments, such as `date(12, may, 2018)` or `point(1, 2)`. Lists are special structures.

Atoms and numbers are called **constants**; constants and variables are **simple objects**, and structures are **compound objects**.

### Unification

Unification is the **process of making two terms identical by finding values (substitutions) for their variables**.

Prolog uses unification to match a query with facts and rule heads. Two terms unify if:

1. They are identical constants; or
2. One is a variable — it is bound to the other term; or
3. They are structures with the **same functor and number of arguments**, and their arguments unify pairwise.

```text
?- point(1, 2) = point(X, Y).
X = 1,
Y = 2.

?- [H|T] = [10, 20, 30].
H = 10,
T = [20, 30].

?- f(a, Z) = f(Z, b).
false.
```

The last query fails because Z would have to be both `a` and `b`.

### Backtracking

Backtracking is the **mechanism by which Prolog, when a goal fails or when more answers are requested, returns to the most recent choice point and tries the next alternative clause**.

Prolog solves a query by **depth-first search**, trying clauses **from top to bottom** and goals in a body **from left to right**. For `?- grandparent(rahim, Z).`, Prolog first tries Y = karim and finds Z = sami and Z = rina; it then backtracks to try Y = nila, which has no children, so that branch fails.

![Search tree of a Prolog query with backtracking](/diagrams/artificial-intelligence/prolog-search-tree.svg)

### The Cut (!)

The cut, written **`!`**, is a **built-in goal that always succeeds but prevents backtracking past the point where it appears**, committing Prolog to the choices made so far in the clause.

It makes programs more efficient by stopping useless searching. A **green cut** only removes unnecessary search and does not change the answers; a **red cut** changes the meaning of the program (the result would differ without it).

```prolog
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).
```

```text
?- max(8, 5, M).
M = 8.

?- max(3, 9, M).
M = 9.
```

When X ≥ Y, the cut stops Prolog from trying the second clause, so only the correct answer is given.

### Negation as Failure

Prolog proves `\+ G` ("not G") if it **cannot prove G**. This is **negation as failure**, based on the **closed-world assumption**: what cannot be proved from the knowledge base is taken to be false.

```prolog
bird(sparrow).
bird(penguin).
cannot_fly(penguin).
can_fly(X) :- bird(X), \+ cannot_fly(X).
```

```text
?- can_fly(sparrow).
true.

?- can_fly(penguin).
false.
```

### Operators

**Arithmetic operators:** `+`, `-`, `*`, `/` (division), `//` (integer division), `mod` (remainder), `**` (power). Arithmetic is evaluated only by **`is`**: `X is Expression` computes the expression and unifies the result with X.

**Comparison operators:**

| Operator | Meaning |
| --- | --- |
| `X =:= Y` | Values of X and Y are equal (arithmetic) |
| `X =\= Y` | Values of X and Y are not equal |
| `X < Y`, `X > Y` | Less than, greater than |
| `X =< Y`, `X >= Y` | Less than or equal to, greater than or equal to |
| `X = Y` | X and Y unify (no evaluation) |
| `X \= Y` | X and Y do not unify |
| `X == Y` | X and Y are identical terms |
| `X \== Y` | X and Y are not identical |

```text
?- X is 7 + 3 * 2.
X = 13.

?- X = 2 + 3.
X = 2+3.

?- 2 + 3 =:= 5.
true.

?- 2 + 3 = 5.
false.

?- 3 =:= 3.0.
true.

?- 3 == 3.0.
false.

?- X is 7 / 2.
X = 3.5.

?- Y is 7 // 2.
Y = 3.

?- X is 17 mod 5.
X = 2.
```

`X = 2 + 3` does not calculate: it binds X to the **structure** `2+3`. `=:=` evaluates both sides, while `=` and `==` compare terms without evaluating them.

### Recursion

Prolog has no loops; repetition is done by **recursion**, with a **base case** that stops it.

```prolog
factorial(0, 1).
factorial(N, F) :- N > 0, N1 is N - 1, factorial(N1, F1), F is N * F1.
```

```text
?- factorial(5, F).
F = 120.
```

To find 5!, Prolog finds 4! = 24 (recursively, down to the base case 0! = 1) and then computes F = 5 × 24 = 120.

### Lists

**List** is a **sequence of elements written in square brackets**, such as `[red, green, blue]`; the empty list is `[]`.

A non-empty list has a **head** (the first element) and a **tail** (the list of the remaining elements), written **`[H|T]`**. For `[a, b, c]`, the head is `a` and the tail is `[b, c]`, so `[a, b, c] = [a | [b, c]]`.

```prolog
list_length([], 0).
list_length([_|T], N) :- list_length(T, N1), N is N1 + 1.

list_sum([], 0).
list_sum([H|T], S) :- list_sum(T, S1), S is S1 + H.

is_member(X, [X|_]).
is_member(X, [_|T]) :- is_member(X, T).
```

```text
?- list_length([a, b, c, d], N).
N = 4.

?- list_sum([4, 7, 9], S).
S = 20.

?- is_member(c, [a, b, c]).
true.

?- is_member(X, [a, b, c]).
X = a ;
X = b ;
X = c.

?- append(A, B, [1, 2]).
A = [],
B = [1, 2] ;
A = [1],
B = [2] ;
A = [1, 2],
B = [].
```

Built-in list predicates include **`member/2`**, **`append/3`**, **`length/2`**, **`reverse/2`** and **`nth0/3`**. The last query shows that a Prolog relation can be used "backwards": `append` finds every way to split `[1, 2]`.

### Applications of PROLOG

1. **Expert systems** — Prolog's inference engine works as the expert system's inference engine.
2. **Natural language processing** — parsing sentences (definite clause grammars).
3. **Automated reasoning and theorem proving.**
4. **Intelligent database retrieval** and deductive databases.
5. **Robot planning** and problem solving (puzzles such as the Tower of Hanoi and the monkey–banana problem).
6. **Machine learning** (inductive logic programming) and symbolic AI research.

### Advantages and Disadvantages of PROLOG

**Advantages:**

1. Programs are short and close to logic; easy to build knowledge bases.
2. Built-in search, backtracking and pattern matching.
3. Built-in list handling; well suited to symbolic computation.

**Disadvantages:**

1. Poor for numeric computation, graphics and heavy input/output.
2. Uncontrolled backtracking can make programs slow; the cut needs care.
3. The order of clauses and goals affects efficiency and can even cause infinite loops.

## References {#references}

**TutorialsPoint**

- [Prolog – Introduction](https://www.tutorialspoint.com/prolog/prolog_introduction.htm), [Basics](https://www.tutorialspoint.com/prolog/prolog_basics.htm), [Hello World](https://www.tutorialspoint.com/prolog/prolog_hello_world.htm), [Relations](https://www.tutorialspoint.com/prolog/prolog_relations.htm), [Data Objects](https://www.tutorialspoint.com/prolog/prolog_data_objects.htm), [Operators](https://www.tutorialspoint.com/prolog/prolog_operators.htm), [Lists](https://www.tutorialspoint.com/prolog/prolog_lists.htm), [Recursion and Structures](https://www.tutorialspoint.com/prolog/prolog_recursion_and_structures.htm), [Backtracking](https://www.tutorialspoint.com/prolog/prolog_backtracking.htm), [Preventing Backtracking](https://www.tutorialspoint.com/prolog/prolog_preventing_backtracking.htm) and [Conjunctions and Disjunctions](https://www.tutorialspoint.com/prolog/prolog_conjunctions_and_disjunctions.htm) — accessed 2026-11-06 (logic vs functional programming, facts, rules, queries, the neck `:-`, atoms, numbers, variables, anonymous variables, comparison operators, lists with head and tail, backtracking and the cut). Issues: it calls Prolog "one major example of the fourth generation language" — Prolog is generally classed as a **fifth-generation** (logic) language; it gives "the normal range of integers" as −16383 to 16383, which is a limit of some old implementations only (SWI-Prolog has unbounded integers); and its comparison table says "functional programming follows the Von-Neumann architecture", which describes imperative (procedural) programming.

**GeeksforGeeks**

- [Prolog | An Introduction](https://www.geeksforgeeks.org/artificial-intelligence/prolog-an-introduction/) and [Lists in Prolog](https://www.geeksforgeeks.org/theory-of-computation/lists-in-prolog/) — accessed 2026-11-06 (facts, knowledge base, queries, unification, backtracking, recursion, advantages, lists). It describes LISP as "another logic programming language"; LISP is a **functional** programming language.

**TpointTech**

- [Prolog Tutorial](https://www.tpointtech.com/prolog) — accessed 2026-11-06 (declarative language, Marseille Prolog, the Japanese fifth-generation project, logical variables, backtracking, applications). It also calls Prolog a fourth-generation language (see above).

**Programiz**

- Programiz has no page on Prolog (checked 2026-11-06).

**Additional sources** (used for the history and standardization of Prolog and for green and red cuts, which the reference websites do not give)

- Ivan Bratko, *Prolog Programming for Artificial Intelligence*, 4th edition, Pearson (chapters 1–5: facts, rules, unification, backtracking, the cut with green and red cuts, negation as failure).
- Wikipedia, [Prolog](https://en.wikipedia.org/wiki/Prolog) — accessed 2026-11-06 (Colmerauer and Roussel 1972, Kowalski's Horn clauses, Warren and Edinburgh syntax, the FGCS project, ISO/IEC 13211-1 of 1995).
- All programs above were run in **SWI-Prolog 9.0.4**; the answers shown are its output.
