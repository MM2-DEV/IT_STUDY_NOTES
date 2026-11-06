---
description: Query optimization - heuristic and cost-based optimization, equivalence rules for transforming relational expressions with examples, catalog statistics (n_r, b_r, f_r, V(A,r), histograms), estimating the size of selections and joins with worked examples, and cost-based join-order selection with dynamic programming.
updated: 2026-11-06
---

## Transformation of Relational Expressions {#transformation-of-relational-expressions}

### Query Optimization

Query optimization is the **process of selecting the most efficient evaluation plan** for a query.

A query can be written as many **equivalent** relational algebra expressions, and each operation can be performed by several algorithms; their costs can differ enormously (seconds versus hours). The optimizer chooses the plan with the **lowest estimated cost**, so that results are produced faster, more queries are served and fewer resources are used.

There are two approaches to query optimization:

1. **Heuristic (rule-based) optimization** — transforms the query using **rules of thumb** (equivalence rules), such as performing selections early, without estimating costs.
2. **Cost-based optimization** — generates alternative plans, **estimates the cost** of each using **statistics** from the catalog, and chooses the cheapest.

Most optimizers combine the two: heuristics reduce the number of alternatives, and cost estimates choose among the rest.

### Equivalent Expressions

Two relational algebra expressions are **equivalent** if they produce the **same set of tuples on every legal database instance**. An **equivalence rule** states that an expression of one form can be replaced by an equivalent expression of another form. (E = relational algebra expression, θ = condition, L = list of attributes.)

### Equivalence Rules

1. **Cascade of selections:** a conjunctive selection can be split into a sequence of selections:
   σθ₁∧θ₂ (E) = σθ₁ (σθ₂ (E))
2. **Commutativity of selection:**
   σθ₁ (σθ₂ (E)) = σθ₂ (σθ₁ (E))
3. **Cascade of projections:** only the last (outermost) projection is needed:
   πL₁ (πL₂ (… πLₙ (E) …)) = πL₁ (E)
4. **Selection with Cartesian product and theta join:**
   (a) σθ (E₁ × E₂) = E₁ ⋈θ E₂
   (b) σθ₁ (E₁ ⋈θ₂ E₂) = E₁ ⋈θ₁∧θ₂ E₂
5. **Commutativity of theta join (and natural join):**
   E₁ ⋈θ E₂ = E₂ ⋈θ E₁
6. **Associativity of joins:**
   (a) (E₁ ⋈ E₂) ⋈ E₃ = E₁ ⋈ (E₂ ⋈ E₃)
   (b) (E₁ ⋈θ₁ E₂) ⋈θ₂∧θ₃ E₃ = E₁ ⋈θ₁∧θ₃ (E₂ ⋈θ₂ E₃), where θ₂ involves attributes of E₂ and E₃ only
7. **Distribution of selection over theta join:**
   (a) if θ₀ involves only attributes of E₁: σθ₀ (E₁ ⋈θ E₂) = (σθ₀ (E₁)) ⋈θ E₂
   (b) if θ₁ involves only E₁ and θ₂ only E₂: σθ₁∧θ₂ (E₁ ⋈θ E₂) = (σθ₁ (E₁)) ⋈θ (σθ₂ (E₂))
8. **Distribution of projection over theta join:** if L₁ and L₂ are attributes of E₁ and E₂, and θ uses only attributes in L₁ ∪ L₂:
   πL₁∪L₂ (E₁ ⋈θ E₂) = (πL₁ (E₁)) ⋈θ (πL₂ (E₂))
9. **Commutativity of union and intersection:** E₁ ∪ E₂ = E₂ ∪ E₁; E₁ ∩ E₂ = E₂ ∩ E₁ (set difference is not commutative).
10. **Associativity of union and intersection:** (E₁ ∪ E₂) ∪ E₃ = E₁ ∪ (E₂ ∪ E₃); (E₁ ∩ E₂) ∩ E₃ = E₁ ∩ (E₂ ∩ E₃).
11. **Distribution of selection over set operations:** σP (E₁ − E₂) = σP (E₁) − σP (E₂), and similarly for ∪ and ∩.
12. **Distribution of projection over union:** πL (E₁ ∪ E₂) = (πL (E₁)) ∪ (πL (E₂)).

### Heuristic Optimization Rules

1. **Perform selections as early as possible** (push σ down the query tree) — they reduce the number of tuples.
2. **Break conjunctive selections** into a cascade of selections, so that each can be moved down separately.
3. **Perform projections early** — they reduce the size of each tuple.
4. **Replace a Cartesian product followed by a selection with a join.**
5. **Perform the most restrictive selections and joins first** — those that produce the smallest results.
6. **Combine operations** that can be done together (for example, a selection and a projection on the same relation) and **pipeline** results where possible.

### Example of Transformation

Find the names of teachers of the CSE department and the titles of the courses they taught in 2025:

1. **Initial expression:** π name, title (σ dept = 'CSE' ∧ year = 2025 (Teacher ⋈ Teaches ⋈ Course))
2. By **rule 1**, split the selection: σ dept = 'CSE' (σ year = 2025 (…)).
3. By **rule 7**, push each selection to the relation that has its attribute: dept belongs to Teacher and year to Teaches.
4. **Optimized expression:** π name, title ((σ dept = 'CSE' (Teacher)) ⋈ (σ year = 2025 (Teaches)) ⋈ Course)

The joins now work only on CSE teachers and 2025 teaching records instead of whole relations.

![Initial query tree with the selection above the joins, and optimized tree with the selections pushed down to Teacher and Teaches](/diagrams/dbms/query-tree-optimization.svg)

## Catalog and Statistical Information for Cost Estimation {#catalog-and-statistical-information-for-cost-estimation}

### Catalog Statistics

To estimate the cost of a plan, the optimizer needs the **size of each intermediate result**, which it estimates from **statistics stored in the database catalog**:

| Statistic | Meaning |
| --- | --- |
| nᵣ | Number of tuples in relation r |
| bᵣ | Number of blocks containing tuples of r |
| lᵣ | Size of a tuple of r in bytes |
| fᵣ | Blocking factor of r — number of tuples that fit in one block |
| V(A, r) | Number of distinct values of attribute A in r (= nᵣ if A is a key) |
| Histograms | Distribution of the values of an attribute in ranges |

If the tuples of r are stored together physically: **bᵣ = ⌈nᵣ ÷ fᵣ⌉**. The catalog also stores the **height of each index** and the number of its leaf blocks. Statistics are updated periodically (not after every change), so estimates are approximate.

### Estimating the Size of a Selection

Assume values are uniformly distributed (or use a histogram):

1. **Equality σA=v (r):** estimated tuples = **nᵣ ÷ V(A, r)**. If A is a key, the result has at most **1** tuple.
2. **Comparison σA≤v (r):** if min(A, r) and max(A, r) are known, estimated tuples = **nᵣ × (v − min(A, r)) ÷ (max(A, r) − min(A, r))** (0 if v < min; nᵣ if v ≥ max).
3. **Selectivity** of a condition θᵢ = sᵢ ÷ nᵣ, where sᵢ is the estimated number of tuples satisfying θᵢ — the probability that a tuple satisfies it.
4. **Conjunction σθ₁∧θ₂∧…∧θₙ (r):** estimated tuples = **nᵣ × (s₁ × s₂ × … × sₙ) ÷ nᵣⁿ** (the product of the selectivities, assuming independence).
5. **Disjunction σθ₁∨θ₂∨…∨θₙ (r):** estimated tuples = **nᵣ × [1 − (1 − s₁/nᵣ) × (1 − s₂/nᵣ) × … × (1 − sₙ/nᵣ)]**.
6. **Negation σ¬θ (r):** estimated tuples = nᵣ − size(σθ (r)).

**Worked example:** Student has nᵣ = 5,000 tuples, V(dept, Student) = 50 departments, and CGPA values from 2.00 to 4.00.

1. σ dept = 'CSE' (Student): 5,000 ÷ 50 = **100** tuples (selectivity 100 ÷ 5,000 = 0.02).
2. σ cgpa ≤ 3.00 (Student): 5,000 × (3.00 − 2.00) ÷ (4.00 − 2.00) = **2,500** tuples (selectivity 0.5).
3. σ dept = 'CSE' ∧ cgpa ≤ 3.00 (Student): 5,000 × 0.02 × 0.5 = **50** tuples.
4. σ dept = 'CSE' ∨ cgpa ≤ 3.00 (Student): 5,000 × [1 − (1 − 0.02) × (1 − 0.5)] = 5,000 × 0.51 = **2,550** tuples.

### Estimating the Size of a Join

For r(R) ⋈ s(S):

1. **Cartesian product r × s:** exactly **nᵣ × nₛ** tuples.
2. If **R ∩ S = ∅** (no common attribute), r ⋈ s is the same as r × s.
3. If **R ∩ S is a key of R**, each tuple of s joins with at most one tuple of r, so the result has **at most nₛ** tuples.
4. If **R ∩ S is a foreign key in S referencing R**, the result has **exactly nₛ** tuples.
5. If **R ∩ S = {A} is not a key** of either relation: estimated tuples = **min(nᵣ × nₛ ÷ V(A, s), nᵣ × nₛ ÷ V(A, r))** — the lower estimate is usually more accurate.

**Worked example:** Student (nᵣ = 5,000) ⋈ Takes (nₛ = 10,000) on ID; ID is the key of Student and a foreign key in Takes; V(ID, Takes) = 2,500 and V(ID, Student) = 5,000.

1. Cartesian product: 5,000 × 10,000 = **50,000,000** tuples.
2. Using the foreign key: exactly **10,000** tuples (one per Takes tuple).
3. Ignoring keys: 5,000 × 10,000 ÷ 2,500 = 20,000 and 5,000 × 10,000 ÷ 5,000 = 10,000; the lower value, **10,000**, agrees with the foreign-key estimate.

### Other Estimates

1. **Projection πA (r):** V(A, r) tuples (duplicates removed).
2. **Aggregation A γ F (r):** V(A, r) tuples — one per group.
3. **Set operations:** r ∪ s ≤ nᵣ + nₛ; r ∩ s ≤ min(nᵣ, nₛ); r − s ≤ nᵣ.
4. **Distinct values after a selection** σθ (r): V(A, σθ(r)) is the number of values in the condition (if A = v, then 1), otherwise about min(V(A, r), size of the result).

## Cost-Based Optimization {#cost-based-optimization}

### Definition of Cost-Based Optimization

Cost-based optimization is a method that **estimates the cost of alternative evaluation plans** using catalog statistics and **chooses the cheapest plan**.

It generates the plans with the equivalence rules and estimates their cost from the cost formulas of the algorithms (block transfers and seeks).

### Steps of Cost-Based Optimization

1. **Generate** logically equivalent expressions using the equivalence rules.
2. **Annotate** each expression with the algorithms (and indexes) for each operation, to obtain alternative evaluation plans.
3. **Estimate the size** of every intermediate result with the statistics.
4. **Estimate the cost** of every plan, adding the costs of its operations.
5. **Choose** the cheapest plan.

### Choosing the Join Order

The order of joins has the largest effect on the cost: for r₁ ⋈ r₂ ⋈ r₃, joining the two relations that give the **smallest intermediate result** first is usually best. The number of possible join orders grows very fast:

> **Number of join orders for n relations = (2(n − 1))! ÷ (n − 1)!**

| n (relations) | Possible join orders | Left-deep join orders (n!) |
| --- | --- | --- |
| 3 | 12 | 6 |
| 5 | 1,680 | 120 |
| 7 | 665,280 | 5,040 |
| 10 | 17,643,225,600 | 3,628,800 |

For n = 3: (2 × 2)! ÷ 2! = 24 ÷ 2 = **12**. Examining all orders is impossible for large n, so optimizers use the techniques below.

### Dynamic Programming for Join Order

**Dynamic programming** finds the best join order without examining every order:

1. Compute the best plan for **each single relation** (best access path).
2. Compute the best plan for **every subset of 2 relations**, then of 3 relations, and so on, using the **best plans of smaller subsets** already computed and stored.
3. For a set S, try every way of splitting it into S₁ and S − S₁ and keep the cheapest combination; the best plan for the full set is the answer.

The time complexity is **O(3ⁿ)** (for n = 10, 3¹⁰ = 59,049 subset combinations instead of about 17.6 billion orders), and the space is O(2ⁿ). This method was introduced in the **System R** optimizer of IBM.

### Left-Deep Join Trees

A **left-deep join tree** is one in which the **right input of every join is a base relation**, not an intermediate result. Considering only left-deep trees reduces the number of orders to n! and the dynamic-programming cost to O(n × 2ⁿ), and it suits **pipelining** and **indexed nested-loop joins**, because each new relation can be joined with the result coming up the pipeline. System R considered only left-deep trees.

### Interesting Sort Orders

A plan that produces its result **sorted on an attribute that a later operation needs** (for example, for a merge join or ORDER BY) may be worth keeping even if it is not the cheapest, because it avoids a later sort. Optimizers therefore keep the best plan for each **interesting sort order**.

### Heuristic vs Cost-Based Optimization

| Basis | Heuristic optimization | Cost-based optimization |
| --- | --- | --- |
| Method | Applies fixed transformation rules | Estimates and compares the cost of alternative plans |
| Uses statistics | No | Yes (catalog statistics) |
| Optimizer overhead | Low, fast | Higher (many plans to evaluate) |
| Quality of plan | Usually good, but not guaranteed best | Usually the best (as accurate as the estimates) |
| Example rule / method | Push selections down | Dynamic programming join order |

## References {#references}

**TutorialsPoint**

- [Heuristics in Query Processing](https://www.tutorialspoint.com/dbms/dbms_heuristics_in_query_processing.htm) — accessed 2026-11-06 (six heuristic rules, the EMPLOYEE–WORKS_ON–PROJECT example, limitations of heuristics). TutorialsPoint's `dbms_optimization` page returns 404.

**GeeksforGeeks**

- [Query Optimization in Relational Algebra](https://www.geeksforgeeks.org/dbms/query-optimization-in-relational-algebra/) — accessed 2026-11-06 (definition, need, features, the equivalence rules and the instructor–teaches–course examples). Its claim that "a query is said to be optimal when it is minimal" mixes up a minimal set of rules with an optimal query.

**TpointTech**

- [Transforming Relational Expressions](https://www.tpointtech.com/dbms-transforming-relational-expressions) and [Advanced Query Optimization](https://www.tpointtech.com/dbms-advanced-query-optimization) — accessed 2026-11-06 (equivalence rules)
- [Estimating Query Cost](https://www.tpointtech.com/estimating-query-cost) — accessed 2026-11-06. TpointTech's `query-optimization-in-dbms` page returns 404.

**IT Job QnS**

- IT Job QnS has no page on query optimization (checked 2026-11-06).

**Programiz**

- Programiz has no page on query optimization (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Query Optimization" — catalog statistics, selection and join size estimation, the number of join orders, dynamic programming and left-deep join trees (the reference websites do not cover these). The Student/Takes figures follow the textbook's example; all calculations were checked with a script.
