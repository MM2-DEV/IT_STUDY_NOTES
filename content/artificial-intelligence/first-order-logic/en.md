---
description: First-order (predicate) logic — syntax, quantifiers, free and bound variables, inference rules, unification and resolution.
updated: 2026-11-06
---

### Introduction

Propositional logic treats every statement as one indivisible fact that is either true or false. It cannot look inside a statement, so it cannot describe objects, their properties or the relations between them, and it cannot state general rules in a short form. For example:

1. "Sachin likes cricket" can only be one proposition, say `P`; the logic does not know that Sachin is a person or that cricket is a game.
2. "All students in the class like mathematics" needs a separate proposition for every student.
3. "Some humans are intelligent" cannot be expressed at all, because it talks about *some* members of a group.

First-order logic removes these limitations by adding objects, predicates, functions, variables and quantifiers to propositional logic.

### Definition

First-order logic (FOL) is an extension of propositional logic that represents knowledge in terms of objects, their properties and the relations between them, and uses variables with the quantifiers ∀ (for all) and ∃ (there exists) to make statements about all or some objects.

It is also called **predicate logic** or **first-order predicate logic (FOPL)**. It is a knowledge representation language in artificial intelligence and is expressive enough to represent most natural-language statements concisely. Like a natural language, it has two parts:

1. **Syntax:** the rules that say which collections of symbols are valid sentences.
2. **Semantics:** the meaning of the sentences, given by interpreting the symbols over a domain (the *universe of discourse*) of real objects.

### What First-Order Logic Assumes About the World

Propositional logic assumes only that the world contains facts. First-order logic assumes that the world also contains three kinds of things:

1. **Objects:** people, numbers, colours, houses, wars, theories, and so on (for example, `John`, `5`, `Mumbai`).
2. **Relations:** properties of one object (unary relations such as *red*, *round*, *is a student*) or relations among several objects (*brother of*, *greater than*, *comes between*).
3. **Functions:** relations in which one object is mapped to exactly one other object (*father of*, *best friend of*, *age of*).

### Basic Elements of First-Order Logic

The syntax of FOL is built from seven kinds of symbols:

| Element | Meaning | Examples |
| --- | --- | --- |
| Constant | Names one particular object | `John`, `Apple`, `5`, `Mumbai` |
| Variable | Stands for any object of the domain | `x`, `y`, `z` |
| Predicate | A property of an object or a relation between objects; true or false | `Brother`, `Father`, `Student`, `>` |
| Function | Maps objects to one object | `FatherOf(x)`, `sqrt(x)`, `LeftLegOf(x)` |
| Connective | Joins sentences | `¬` (not), `∧` (and), `∨` (or), `→` (implies), `↔` (if and only if) |
| Equality | States that two terms name the same object | `=` |
| Quantifier | States for how many objects a sentence is true | `∀` (for all), `∃` (there exists) |

1. A **constant** names a specific object, for example `Krish`, `Bob` or `India`.
2. A **variable** can take any object of the domain as its value. If the domain is the students of a class, `x` can be any student.
3. A **predicate** takes one or more arguments and returns true or false. `Father(John, Robert)` says that John is the father of Robert.
4. A **function** takes objects as arguments and returns one object, not a truth value. `MotherOf(Alice)` *is* a person (Alice's mother); it is not a statement.
5. A **term** is an expression that refers to an object: a constant, a variable, or a function applied to terms (`MotherOf(x)`, `FatherOf(FatherOf(John))`).

A predicate and a function look alike in writing, but they differ in what they return:

| Point | Predicate | Function |
| --- | --- | --- |
| Returns | A truth value (true or false) | An object |
| Example | `Brother(Ravi, Ajay)` | `FatherOf(Ravi)` |
| Can stand alone as a sentence | Yes | No; it is used as a term inside a predicate |

### Atomic and Complex Sentences

**An atomic sentence** is the simplest sentence of first-order logic: a predicate symbol followed by a list of terms in parentheses, `Predicate(term1, term2, …, termn)`.

It states one fact without using any connective. Examples:

1. Ravi and Ajay are brothers: `Brothers(Ravi, Ajay)`
2. Chinky is a cat: `Cat(Chinky)`
3. John teaches Mathematics: `Teaches(John, Mathematics)`
4. Richard's father is married to John's mother: `Married(FatherOf(Richard), MotherOf(John))`

**A complex sentence** is a sentence made by joining atomic sentences with logical connectives.

Examples:

1. `Brother(Richard, John) ∧ Brother(John, Richard)`
2. `King(Richard) ∨ King(John)`
3. `¬King(Richard) → King(John)`

A simple statement such as "x is an integer" has two parts: the **subject** (`x`) and the **predicate** ("is an integer"), written `Integer(x)`.

### Quantifiers

**A quantifier** is a symbol that states how many objects of the universe of discourse a sentence is true for, and so fixes the range and scope of a variable.

First-order logic has two quantifiers:

1. Universal quantifier (`∀`)
2. Existential quantifier (`∃`)

#### Universal Quantifier

The **universal quantifier** is the symbol `∀` (an inverted A), which states that the sentence within its scope is true for every object of the domain.

`∀x` is read as "for all x", "for each x" or "for every x". The main connective used with `∀` is implication (`→`).

Example: "All men drink coffee" is `∀x Man(x) → Drink(x, Coffee)`, read "for every x, if x is a man, then x drinks coffee".

#### Existential Quantifier

The **existential quantifier** is the symbol `∃` (a reversed E), which states that the sentence within its scope is true for at least one object of the domain.

`∃x` is read as "there exists an x", "for some x" or "for at least one x". The main connective used with `∃` is conjunction (`∧`).

Example: "Some boys are intelligent" is `∃x Boy(x) ∧ Intelligent(x)`, read "there is some x such that x is a boy and x is intelligent".

#### Choosing the Connective

Using the wrong connective with a quantifier changes the meaning:

1. `∀x Man(x) ∧ Drink(x, Coffee)` says that *everything* in the domain is a man and drinks coffee, which is far stronger than intended.
2. `∃x Boy(x) → Intelligent(x)` is true as soon as there is one object that is not a boy (an implication with a false premise is true), so it says almost nothing.

#### Properties of Quantifiers

1. Two universal quantifiers can be swapped: `∀x ∀y` is the same as `∀y ∀x`.
2. Two existential quantifiers can be swapped: `∃x ∃y` is the same as `∃y ∃x`.
3. A universal and an existential quantifier **cannot** be swapped: `∃x ∀y` is not the same as `∀y ∃x`.

For property 3, let `Loves(x, y)` mean "x loves y":

1. `∀x ∃y Loves(x, y)` means "everybody loves somebody" (each person may love a different person).
2. `∃y ∀x Loves(x, y)` means "there is someone whom everybody loves".

The two quantifiers are also connected through negation, which is used when converting sentences to clause form:

1. `¬∀x P(x)` is equivalent to `∃x ¬P(x)` ("not everyone is P" means "someone is not P").
2. `¬∃x P(x)` is equivalent to `∀x ¬P(x)` ("no one is P" means "everyone is not P").

### Free and Bound Variables

**A bound variable** is a variable that occurs within the scope of a quantifier for that variable.

**A free variable** is a variable that occurs outside the scope of every quantifier for that variable.

A free variable has no fixed meaning until a value is assigned to it. Examples:

1. In `∀x ∃y P(x, y, z)`, the variables `x` and `y` are bound, and `z` is free.
2. In `∀x (A(x) ∧ B(y))`, `x` is bound and `y` is free, because the quantifier is `∀x`, not `∀y`.
3. In `∃y LessThan10(PriceOf(y))`, `y` is bound by `∃`.

A formula with no free variables is called a **sentence** (a closed formula); only sentences have a definite truth value.

### Representing English Sentences in First-Order Logic

| English sentence | First-order logic |
| --- | --- |
| All birds fly. | `∀x Bird(x) → Fly(x)` |
| Every man respects his parent. | `∀x ∀y (Man(x) ∧ Parent(y, x)) → Respects(x, y)` |
| Some boys play cricket. | `∃x Boy(x) ∧ Play(x, Cricket)` |
| Not all students like both Mathematics and Science. | `¬∀x Student(x) → (Like(x, Mathematics) ∧ Like(x, Science))` |
| Only one student failed in Mathematics. | `∃x Student(x) ∧ Failed(x, Mathematics) ∧ ∀y ((Student(y) ∧ ¬(x = y)) → ¬Failed(y, Mathematics))` |
| No student likes Physics. | `∀x Student(x) → ¬Like(x, Physics)` |
| Every customer who makes a purchase receives an invoice. | `∀x (Customer(x) ∧ Purchases(x)) → ReceivesInvoice(x)` |

In the "not all students" sentence, the negation applies to the whole universally quantified sentence. In the "only one student" sentence, the second part says that every other student did not fail.

### Equality

**Equality** is the relation, written `=` between two terms, which states that both terms refer to the same object.

Examples:

1. `FatherOf(John) = Henry` states that the object referred to by `FatherOf(John)` is Henry.
2. `¬(x = y)`, also written `x ≠ y`, states that `x` and `y` are different objects.

### Propositional Logic vs First-Order Logic

| Point | Propositional logic | First-order logic |
| --- | --- | --- |
| Basic unit | A proposition (a whole statement) | Objects, predicates and functions |
| What it represents | Facts that are true or false | Objects, their properties and relations, and general rules |
| Variables | No | Yes |
| Quantifiers | No | Yes (`∀`, `∃`) |
| Expressive power | Limited | Much greater |
| General rules | One proposition is needed for each case | One quantified sentence covers all cases |
| Example of "All students like Maths" | `P1 ∧ P2 ∧ … ∧ Pn` (one per student) | `∀x Student(x) → Likes(x, Maths)` |
| Also called | Propositional calculus, sentential logic | Predicate logic, first-order predicate logic |
| Used in | Simple logical systems, digital circuits | AI knowledge bases, expert systems, NLP, theorem proving |

### Inference in First-Order Logic

**Inference** in first-order logic is the process of deriving new sentences (facts) from the sentences already in the knowledge base.

Two basic operations are used in inference:

1. **Substitution:** replacing a variable by a term. `F[a/x]` (or `SUBST({x/a}, F)`) denotes the formula `F` with the constant `a` written in place of the variable `x`.
2. **Equality:** recognising that two terms refer to the same object.

Notation varies between books: in these notes `{x/John}` means "replace `x` by `John`", as on TutorialsPoint and GeeksforGeeks; TpointTech writes the same substitution as `{John/x}`.

#### Inference Rules for Quantifiers

First-order logic adds four inference rules for quantifiers to the propositional rules (such as modus ponens):

1. Universal Generalization
2. Universal Instantiation
3. Existential Instantiation
4. Existential Introduction

**Universal Generalization (UG)** is the rule that if `P(c)` is true for an *arbitrary* element `c` of the universe of discourse, then `∀x P(x)` is true.

`c` must be arbitrary: nothing may be assumed about it except that it belongs to the domain. Proving `P` for a few chosen objects (for example, John, Mary and Sam) is not enough. Example: if "a byte contains 8 bits" is proved for an arbitrary byte, then "all bytes contain 8 bits" follows.

**Universal Instantiation (UI)**, also called universal elimination, is the rule that from `∀x P(x)` we can infer `P(c)` for any ground term `c` (a term without variables).

1. It can be applied many times, to add many new sentences.
2. The new knowledge base is logically equivalent to the old one.

Example: from `∀x King(x) ∧ Greedy(x) → Evil(x)` we can infer:

1. `King(John) ∧ Greedy(John) → Evil(John)`
2. `King(Richard) ∧ Greedy(Richard) → Evil(Richard)`
3. `King(FatherOf(John)) ∧ Greedy(FatherOf(John)) → Evil(FatherOf(John))`

**Existential Instantiation (EI)**, also called existential elimination, is the rule that from `∃x P(x)` we can infer `P(K)`, where `K` is a new constant symbol that does not appear anywhere else in the knowledge base.

1. It is applied only once to an existential sentence, which can then be discarded.
2. The new knowledge base is not logically equivalent to the old one, but it is satisfiable whenever the old one was.
3. The new constant `K` is called a **Skolem constant**. Existential instantiation is a special case of Skolemization.

Example: from `∃x Crown(x) ∧ OnHead(x, John)` we can infer `Crown(K) ∧ OnHead(K, John)`, as long as `K` is new.

**Existential Introduction**, also called existential generalization, is the rule that if some element `c` of the universe of discourse has the property `P`, then `∃x P(x)` is true.

Example: "Priyanka got good marks in English", therefore "someone got good marks in English".

| Rule | From | Infer | Condition |
| --- | --- | --- | --- |
| Universal Generalization | `P(c)` | `∀x P(x)` | `c` is an arbitrary element |
| Universal Instantiation | `∀x P(x)` | `P(c)` | `c` is any ground term |
| Existential Instantiation | `∃x P(x)` | `P(K)` | `K` is a new constant |
| Existential Introduction | `P(c)` | `∃x P(x)` | `c` is an element of the domain |

#### Generalized Modus Ponens

**Generalized Modus Ponens (GMP)** is the lifted (first-order) version of modus ponens: if there is a substitution θ that makes each premise of a rule identical to a known fact, then the conclusion of the rule, with θ applied, can be inferred.

For atomic sentences `p1, …, pn`, `p1', …, pn'` and `q`, where `SUBST(θ, pi') = SUBST(θ, pi)` for every `i`:

`p1', p2', …, pn', (p1 ∧ p2 ∧ … ∧ pn → q)`  ⊢  `SUBST(θ, q)`

where:

1. `pi` are the premises of the rule and `q` is its conclusion.
2. `pi'` are the known facts.
3. θ is the substitution that makes `pi` and `pi'` identical (found by unification).
4. `SUBST(θ, q)` is `q` with θ applied.

Example: rule `King(x) ∧ Greedy(x) → Evil(x)`, facts `King(John)` and `Greedy(John)`:

1. `p1 = King(x)`, `p1' = King(John)`; `p2 = Greedy(x)`, `p2' = Greedy(John)`; `q = Evil(x)`.
2. θ = `{x/John}` makes `p1 = p1'` and `p2 = p2'`.
3. Conclusion: `SUBST(θ, q) = Evil(John)`.

Generalized modus ponens is the inference rule used by forward and backward chaining, which are explained in [Knowledge Organization and Manipulation](/topics/artificial-intelligence/knowledge-representation#knowledge-organization-and-manipulation).

### Unification

**Unification** is the process of finding a substitution that makes two logical expressions identical.

It is the key step of every first-order inference algorithm, including generalized modus ponens, resolution and Prolog execution. The `UNIFY` algorithm takes two atomic sentences `Ψ1` and `Ψ2` and returns a substitution θ (called a **unifier**) such that `SUBST(θ, Ψ1) = SUBST(θ, Ψ2)`, or returns *failure* if no such substitution exists.

Example: `UNIFY(King(x), King(John)) = {x/John}`; applying it gives `King(John)` on both sides.

#### Most General Unifier

The **most general unifier (MGU)** is the unifier that makes the fewest and least specific substitutions; every other unifier of the two expressions can be obtained from it by further substitution.

Example: `Likes(x, y)` and `Likes(z, IceCream)` are unified by both `{x/z, y/IceCream}` and `{x/John, z/John, y/IceCream}`. The first is the MGU, because it does not fix `x` and `z` to John unnecessarily.

#### Conditions for Unification

1. The predicate symbols must be the same. `Loves(x, y)` and `Hates(A, B)` cannot be unified.
2. The number of arguments must be the same. `P(A, B)` and `P(x, y, z)` cannot be unified.
3. Two different constants cannot be unified. `Apple` and `Orange` do not unify; a constant unifies only with itself or with a variable.
4. A variable can be replaced by a constant, another variable or a function term.
5. A variable cannot be replaced by a term that contains the same variable (the **occurs check**). `x` and `f(x)` cannot be unified.
6. A substitution must be used consistently. In `P(x, x)` both arguments must get the same value, so `P(x, x)` and `P(A, B)` cannot be unified, although `P(x, x)` and `P(A, A)` can (with `{x/A}`).

#### Unification Algorithm

`UNIFY(Ψ1, Ψ2)`:

1. If `Ψ1` or `Ψ2` is a variable or a constant:
   1. If `Ψ1` and `Ψ2` are identical, return the empty substitution (NIL).
   2. Else, if `Ψ1` is a variable: if `Ψ1` occurs in `Ψ2`, return FAILURE; otherwise return `{Ψ1/Ψ2}`.
   3. Else, if `Ψ2` is a variable: if `Ψ2` occurs in `Ψ1`, return FAILURE; otherwise return `{Ψ2/Ψ1}`.
   4. Else return FAILURE.
2. If the predicate (or function) symbols of `Ψ1` and `Ψ2` differ, return FAILURE.
3. If `Ψ1` and `Ψ2` have different numbers of arguments, return FAILURE.
4. Set the substitution set `SUBST` to NIL.
5. For each argument position `i`:
   1. Call `UNIFY` on the `i`-th arguments of `Ψ1` and `Ψ2`, and put the result in `S`.
   2. If `S` is FAILURE, return FAILURE.
   3. If `S` is not NIL, apply `S` to the remaining arguments of both expressions, and add `S` to `SUBST`.
6. Return `SUBST`.

#### Worked Examples of Unification

In these examples, lowercase `x`, `y`, `z` and uppercase `X`, `Y`, `Z` are variables; `a`, `b`, `John`, `Jane`, `Elizabeth` are constants. Each result was checked with a short unification program.

**Example 1:** `Knows(John, x)` and `Knows(John, Jane)`

1. `Knows` = `Knows`; both have 2 arguments.
2. `John` and `John` are identical.
3. `x` and `Jane`: substitute `{x/Jane}`.
4. MGU = `{x/Jane}`; both become `Knows(John, Jane)`.

**Example 2:** `Knows(John, x)` and `Knows(y, MotherOf(y))`

1. `John` and `y`: substitute `{y/John}`. The second expression becomes `Knows(John, MotherOf(John))`.
2. `x` and `MotherOf(John)`: substitute `{x/MotherOf(John)}`.
3. MGU = `{y/John, x/MotherOf(John)}`; both become `Knows(John, MotherOf(John))`.

**Example 3:** `p(b, X, f(g(Z)))` and `p(Z, f(Y), f(Y))`

1. `b` and `Z`: substitute `{Z/b}`. The expressions become `p(b, X, f(g(b)))` and `p(b, f(Y), f(Y))`.
2. `X` and `f(Y)`: substitute `{X/f(Y)}`. They become `p(b, f(Y), f(g(b)))` and `p(b, f(Y), f(Y))`.
3. `f(g(b))` and `f(Y)`: same function `f`, so unify `g(b)` with `Y`: substitute `{Y/g(b)}`.
4. MGU = `{Z/b, X/f(g(b)), Y/g(b)}`; both become `p(b, f(g(b)), f(g(b)))`.

**Example 4:** `Q(a, g(x, a), f(y))` and `Q(a, g(f(b), a), x)`

1. `a` and `a` are identical.
2. `g(x, a)` and `g(f(b), a)`: unify `x` with `f(b)`: substitute `{x/f(b)}`. The expressions become `Q(a, g(f(b), a), f(y))` and `Q(a, g(f(b), a), f(b))`.
3. `f(y)` and `f(b)`: substitute `{y/b}`.
4. MGU = `{x/f(b), y/b}`; both become `Q(a, g(f(b), a), f(b))`.

**Example 5 (failure, different constants):** `p(f(a), g(Y))` and `p(X, X)`

1. `f(a)` and `X`: substitute `{X/f(a)}`. The second expression becomes `p(f(a), f(a))`.
2. `g(Y)` and `f(a)`: the function symbols `g` and `f` differ, so unification **fails**.

**Example 6 (failure, occurs check):** `p(X, X)` and `p(Z, f(Z))`

1. `X` and `Z`: substitute `{X/Z}`. The first expression becomes `p(Z, Z)`.
2. `Z` and `f(Z)`: `Z` occurs inside `f(Z)`, so unification **fails**.

**Example 7 (standardizing apart):** `Knows(John, x)` and `Knows(x, Elizabeth)` fail, because `x` would have to be both John and Elizabeth. The two sentences are independent, so their variables can be renamed first (**standardizing apart**): `Knows(John, x)` and `Knows(z, Elizabeth)` unify with `{z/John, x/Elizabeth}`.

### Resolution

**Resolution** is an inference rule and theorem-proving technique that proves a statement by refutation: the negation of the statement is added to the knowledge base, and resolution steps are applied until a contradiction (the empty clause) is derived.

Resolution was introduced by the mathematician John Alan Robinson in 1965. It is a single inference rule that works on sentences in **conjunctive normal form (CNF)**, also called clausal form, and it uses unification to match literals. It is the basis of automated theorem provers and of logic programming languages such as Prolog.

#### Basic Terms

1. **Literal:** an atomic sentence (a *positive literal*, such as `P(x)`) or the negation of an atomic sentence (a *negative literal*, such as `¬Q(y)`).
2. **Clause:** a disjunction of literals, such as `P(x) ∨ ¬Q(x)`. A clause with exactly one literal is a **unit clause**; a clause with no literals is the **empty clause** (`□`), which is always false.
3. **Conjunctive normal form (CNF):** a conjunction of clauses, such as `(A ∨ ¬B) ∧ (B ∨ C)`.
4. **Complementary literals:** two literals that are the negation of each other, such as `Loves(x, y)` and `¬Loves(x, y)`, after unification.

#### The Resolution Rule

The first-order resolution rule is the lifted version of the propositional resolution rule. Two clauses that are standardized apart (share no variables) can be resolved if one contains a literal `li` and the other contains a literal `mj` such that `UNIFY(li, ¬mj) = θ`:

`(l1 ∨ … ∨ lk),  (m1 ∨ … ∨ mn)`  ⊢  `SUBST(θ, l1 ∨ … ∨ li−1 ∨ li+1 ∨ … ∨ lk ∨ m1 ∨ … ∨ mj−1 ∨ mj+1 ∨ … ∨ mn)`

where:

1. `l1 … lk` and `m1 … mn` are the literals of the two clauses.
2. `li` and `mj` are the complementary literals, which are removed.
3. θ is the unifier of `li` and `¬mj`.
4. The new clause, called the **resolvent**, contains all the remaining literals with θ applied.

This rule is also called **binary resolution**, because it resolves exactly two literals.

Propositional example: `A ∨ B` and `¬A ∨ C` resolve to `B ∨ C`.

First-order example: `Animal(g(x)) ∨ Loves(f(x), x)` and `¬Loves(u, v) ∨ ¬Kills(u, v)`:

1. The complementary literals are `Loves(f(x), x)` and `¬Loves(u, v)`.
2. θ = `{u/f(x), v/x}`.
3. Resolvent: `Animal(g(x)) ∨ ¬Kills(f(x), x)`.

#### Converting First-Order Logic to CNF

Every first-order sentence can be converted to an equivalent set of clauses (equivalent in satisfiability). The conversion has six steps:

1. **Eliminate implications and biconditionals:** replace `A ↔ B` by `(A → B) ∧ (B → A)`, and `A → B` by `¬A ∨ B`.
2. **Move negation inwards** so that `¬` applies only to atomic sentences:
   1. `¬(A ∧ B)` becomes `¬A ∨ ¬B`, and `¬(A ∨ B)` becomes `¬A ∧ ¬B` (De Morgan's laws).
   2. `¬¬A` becomes `A`.
   3. `¬∀x P` becomes `∃x ¬P`, and `¬∃x P` becomes `∀x ¬P`.
3. **Standardize variables apart:** rename variables so that each quantifier uses a different variable.
4. **Skolemize:** remove existential quantifiers (explained below).
5. **Drop universal quantifiers:** all remaining variables are understood to be universally quantified.
6. **Distribute ∨ over ∧:** replace `A ∨ (B ∧ C)` by `(A ∨ B) ∧ (A ∨ C)`, then write each conjunct as a separate clause.

**Skolemization** is the process of removing existential quantifiers by replacing each existentially quantified variable with a new constant (a Skolem constant) or a new function of the enclosing universally quantified variables (a Skolem function).

1. `∃x P(x)` becomes `P(A)`, where `A` is a new Skolem constant.
2. `∀x ∃y Loves(x, y)` becomes `∀x Loves(x, F(x))`, where `F(x)` is a new Skolem function. A function is needed because the person `y` may be different for every `x`.

Example: convert "every student is taught by some teacher", `∀x Student(x) → ∃y (Teacher(y) ∧ Teaches(y, x))`, to CNF:

1. Eliminate `→`: `∀x ¬Student(x) ∨ ∃y (Teacher(y) ∧ Teaches(y, x))`
2. Negations are already inwards; variables are already distinct.
3. Skolemize `y` as `F(x)`: `∀x ¬Student(x) ∨ (Teacher(F(x)) ∧ Teaches(F(x), x))`
4. Drop `∀x`: `¬Student(x) ∨ (Teacher(F(x)) ∧ Teaches(F(x), x))`
5. Distribute `∨` over `∧`: `(¬Student(x) ∨ Teacher(F(x))) ∧ (¬Student(x) ∨ Teaches(F(x), x))`
6. Clauses: `¬Student(x) ∨ Teacher(F(x))` and `¬Student(x) ∨ Teaches(F(x), x)`

#### Steps of Resolution

1. Convert the given facts into first-order logic.
2. Convert the first-order sentences into CNF (clauses).
3. Negate the statement to be proved, and add it to the clauses.
4. Repeatedly resolve pairs of clauses that contain complementary literals, using unification, and add each resolvent. Draw the steps as a resolution graph (tree).
5. If the empty clause is derived, the negated statement contradicts the knowledge base, so the statement is proved. If no new clause can be derived, the statement cannot be proved.

#### Worked Example of Resolution

Given:

1. John likes all kinds of food.
2. Apples and vegetables are food.
3. Anything anyone eats and is not killed by is food.
4. Anil eats peanuts and is still alive.
5. Harry eats everything that Anil eats.

Prove: John likes peanuts.

**Step 1: Convert to first-order logic.** Two background facts about being alive are added (sentences 6 and 7):

1. `∀x Food(x) → Likes(John, x)`
2. `Food(Apple) ∧ Food(Vegetables)`
3. `∀x ∀y (Eats(x, y) ∧ ¬Killed(x)) → Food(y)`
4. `Eats(Anil, Peanuts) ∧ Alive(Anil)`
5. `∀x Eats(Anil, x) → Eats(Harry, x)`
6. `∀x ¬Killed(x) → Alive(x)`
7. `∀x Alive(x) → ¬Killed(x)`

Goal: `Likes(John, Peanuts)`

**Step 2: Convert to CNF.**

1. Eliminate `→`, move `¬` inwards (`¬(Eats(x, y) ∧ ¬Killed(x))` becomes `¬Eats(x, y) ∨ Killed(x)`; `¬¬Killed(x)` becomes `Killed(x)`).
2. Standardize variables apart (`x, y` in sentence 3 become `y, z`; sentences 5, 6 and 7 use `w`, `g` and `k`).
3. There is no `∃`, so Skolemization changes nothing. Drop `∀`, and split the conjunctions in sentences 2 and 4.

The clauses are:

1. `¬Food(x) ∨ Likes(John, x)`
2. `Food(Apple)`
3. `Food(Vegetables)`
4. `¬Eats(y, z) ∨ Killed(y) ∨ Food(z)`
5. `Eats(Anil, Peanuts)`
6. `Alive(Anil)`
7. `¬Eats(Anil, w) ∨ Eats(Harry, w)`
8. `Killed(g) ∨ Alive(g)`
9. `¬Alive(k) ∨ ¬Killed(k)`

**Step 3: Negate the goal** and add it: `¬Likes(John, Peanuts)`.

**Step 4: Resolve.**

| Step | Clauses resolved | Unifier | Resolvent |
| --- | --- | --- | --- |
| 1 | `¬Likes(John, Peanuts)` and clause 1 | `{x/Peanuts}` | `¬Food(Peanuts)` |
| 2 | `¬Food(Peanuts)` and clause 4 | `{z/Peanuts}` | `¬Eats(y, Peanuts) ∨ Killed(y)` |
| 3 | `¬Eats(y, Peanuts) ∨ Killed(y)` and clause 5 | `{y/Anil}` | `Killed(Anil)` |
| 4 | `Killed(Anil)` and clause 9 | `{k/Anil}` | `¬Alive(Anil)` |
| 5 | `¬Alive(Anil)` and clause 6 | `{ }` | `□` (empty clause) |

![Resolution refutation tree for "John likes peanuts"](/diagrams/artificial-intelligence/fol-resolution-tree.svg)

The empty clause is derived, so the negated goal contradicts the knowledge base. Therefore **John likes peanuts** is proved. (The proof was also checked with a short resolution program.)

### Applications of First-Order Logic

1. **Knowledge representation and reasoning:** encoding facts and rules, such as `Parent(John, Mary)` and `∀x ∀y Parent(x, y) → Ancestor(x, y)`, and deriving new facts (`Ancestor(John, Mary)`).
2. **Expert systems:** rule-based reasoning, for example in medical diagnosis.
3. **Automated theorem proving:** proving mathematical theorems and verifying logical arguments by resolution.
4. **Logic programming:** Prolog programs are written in a subset of first-order logic (Horn clauses) and run by unification and resolution (see [Introduction to Prolog](/topics/artificial-intelligence/introduction-to-prolog)).
5. **Natural language processing:** representing the meaning of sentences, such as "every student has submitted the assignment" as `∀x Student(x) → Submitted(x, Assignment)`, for semantic parsing and question answering.
6. **Semantic web:** ontologies and rules that describe web resources (RDF and OWL are based on logics related to FOL).
7. **Software and hardware verification:** checking that a system satisfies its specification.

### Limitations of First-Order Logic

1. **Uncertainty:** every fact must be definitely true or false, so probabilistic or uncertain knowledge cannot be represented directly.
2. **Vague terms:** statements such as "most people" or "approximately 10" are difficult to express.
3. **Computational cost:** inference over a large knowledge base can be slow; resolution generates many intermediate clauses.
4. **Common-sense reasoning:** assumptions, exceptions and incomplete information (for example, "birds fly, except penguins") are hard to handle.
5. **Rigidity:** all facts and rules must be stated explicitly.

## References {#references}

- TutorialsPoint — [First-Order Logic in Artificial Intelligence](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_first_order_logic.htm), [Inference in First-Order Logic](https://www.tutorialspoint.com/artificial_intelligence/ai_inference_rules_in_first_order_logic.htm), [Unification in First-Order Logic](https://www.tutorialspoint.com/artificial_intelligence/ai_unification_in_first_order_logic_fol.htm), [Resolution in First-Order Logic](https://www.tutorialspoint.com/artificial_intelligence/ai_resolution_in_first_order_logic_fol.htm), accessed 2026-11-06.
- TpointTech — [First-Order Logic in Artificial Intelligence](https://www.tpointtech.com/first-order-logic-in-artificial-intelligence), [Inference in First-Order Logic](https://www.tpointtech.com/ai-inference-in-first-order-logic), [What is Unification?](https://www.tpointtech.com/ai-unification-in-first-order-logic), [Resolution in FOL](https://www.tpointtech.com/ai-resolution-in-first-order-logic), accessed 2026-11-06.
- GeeksforGeeks — [First-Order Logic in Artificial Intelligence](https://www.geeksforgeeks.org/artificial-intelligence/first-order-logic-in-artificial-intelligence/), [Unification in AI](https://www.geeksforgeeks.org/artificial-intelligence/unification-in-ai/), [Resolution Algorithm in Artificial Intelligence](https://www.geeksforgeeks.org/artificial-intelligence/resolution-algorithm-in-artificial-intelligence/), accessed 2026-11-06.
- Programiz has no page on first-order logic.

Issues found on the reference websites and how they were resolved:

1. TpointTech writes "Some boys play cricket" as `∃x boys(x) → play(x, cricket)`, using `→` with `∃`; its own "points to remember" say that `∃` takes `∧`. Written here with `∧`.
2. TpointTech's bound-variable example `∀x [A(x) B(y)]` says that both `x` and `y` are bound; `y` is free, because only `x` is quantified.
3. TpointTech writes "Every man respects his parent" as `∀x man(x) → respects(x, parent)`, treating "parent" as one constant; written here with a `Parent(y, x)` predicate.
4. TpointTech and TutorialsPoint list as a condition that unification fails "if the same variable occurs twice" in an expression. This is true only when the two positions need different values (`P(x, x)` and `P(A, B)`); `P(x, x)` and `P(A, A)` unify. Stated here with both cases.
5. TpointTech says that a clause "is also known as a unit clause"; a unit clause is a clause with exactly one literal.
6. TpointTech's CNF step says "distribute conjunction ∧ over disjunction"; the correct step for CNF is to distribute `∨` over `∧`.
7. TutorialsPoint's Universal Generalization example concludes `∀x Loves(x, IceCream)` from three named people; the rule needs an arbitrary element. It also says that "UI is the negation of UG"; UI is the reverse direction of UG, not its negation.
8. GeeksforGeeks's unification page mostly describes "unified AI systems" (multi-task models), which is a different meaning of the word; only its first-order logic section was used.
9. GeeksforGeeks's Wumpus-world resolution example tries to prove `P1,2` and says that the empty clause shows it is entailed. With `¬B1,1` in the knowledge base, the entailed sentence is `¬P1,2` (there is no pit), so that example was not used.
10. TpointTech's unification example 3 gives the final unifier as `{b/Z, f(Y)/X, g(b)/Y}`; after composing the substitutions, `X` is `f(g(b))`. All unification examples here were checked with a unification program.
