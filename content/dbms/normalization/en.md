---
description: Normalization - purpose, insertion, update and deletion anomalies, advantages and disadvantages, denormalization; functional dependencies, their types, Armstrong's axioms, attribute closure and candidate keys with worked examples, canonical cover, lossless and dependency-preserving decomposition; 1NF, 2NF, 3NF and BCNF with examples, 4NF and 5NF, and 3NF vs BCNF.
updated: 2026-11-06
---

## Concept of Normalization {#concept-of-normalization}

### Definition of Normalization

Normalization is the process of **organizing data into well-structured tables by decomposing large tables into smaller, related ones** to reduce redundancy and anomalies.

The decomposition is based on functional dependencies and keys, and removes **insertion, update and deletion anomalies**. The tables are then linked with keys. The concept was introduced by **E. F. Codd** (1NF in 1970; 2NF and 3NF in 1971); BCNF was defined by Raymond F. Boyce and Codd in 1974.

### Need for Normalization: Anomalies

When all data is kept in one large table, the same facts are repeated in many rows, and the following problems (anomalies) occur. Consider this table, whose key is (Roll_No, Course_ID):

| Roll_No | Name | Course_ID | Course_Title | Teacher |
| --- | --- | --- | --- | --- |
| 101 | Rahim | C1 | DBMS | Dr. Hasan |
| 101 | Rahim | C2 | Networks | Dr. Akter |
| 102 | Karim | C1 | DBMS | Dr. Hasan |
| 103 | Sumi | C3 | Java | Dr. Roy |

1. **Insertion anomaly** — a fact cannot be inserted without some other, unrelated fact. A new course C4 cannot be added until some student takes it, because Roll_No is part of the key and cannot be NULL.
2. **Update (modification) anomaly** — the same fact is stored in many rows, so a change must be made in every row; if one row is missed, the data becomes inconsistent. If the teacher of DBMS changes, both C1 rows must be updated.
3. **Deletion anomaly** — deleting one fact unintentionally deletes another. If Sumi (103) leaves, the only record of the course Java and its teacher is lost.

Normalization removes these anomalies by storing each fact only once.

### Normal Forms

A normal form is a condition that a table must satisfy, based on its keys and functional dependencies. The normal forms are, in increasing strictness: **1NF, 2NF, 3NF, BCNF, 4NF and 5NF**. Each higher normal form includes all the conditions of the lower ones. In practice, most databases are normalized up to **3NF or BCNF**.

![The normal forms UNF, 1NF, 2NF, 3NF, BCNF, 4NF and 5NF, each removing one more kind of dependency](/diagrams/dbms/normal-forms.svg)

### Advantages of Normalization

1. **Reduces data redundancy** — each fact is stored once, saving storage space.
2. **Removes insertion, update and deletion anomalies.**
3. **Improves data consistency and integrity.**
4. **Gives a clear, well-organized structure** that is easier to understand and maintain.
5. **Makes updates faster**, because only one place has to be changed.

### Disadvantages of Normalization

1. **More tables** — the database has many small tables.
2. **More joins** — queries must join many tables, which can make retrieval slower.
3. **More complex design and queries.**
4. Over-normalization can reduce performance in read-heavy systems such as reporting.

### Denormalization

Denormalization is the **intentional addition of redundant or pre-computed data** to a normalized database to **improve query performance**.

For example, tables are combined, columns are duplicated or totals are stored, to reduce joins. It is used in read-heavy systems such as data warehouses and reports. Its costs are redundancy, extra storage and the work of keeping the copies consistent.

## Functional Dependencies {#functional-dependencies}

### Definition of Functional Dependency

A functional dependency (FD) is a relationship in which **the value of an attribute set X uniquely determines the value of an attribute set Y**.

It is written **X → Y** and read "X functionally determines Y" or "Y is functionally dependent on X". Here X is the **determinant** and Y is the **dependent**.

Formally, X → Y holds in a relation R if, whenever two tuples have the same value of X, they also have the same value of Y.

**Example:** in STUDENT(Roll_No, Name, Dept), Roll_No → Name holds, because each roll number belongs to exactly one name. Name → Roll_No does not hold, because two students can have the same name.

### Types of Functional Dependency

1. **Trivial FD** — X → Y where **Y is a subset of X**; it always holds. Example: {Roll_No, Name} → Name; A → A.
2. **Non-trivial FD** — X → Y where **Y is not a subset of X**. Example: Roll_No → Name.
3. **Completely non-trivial FD** — X → Y where X and Y have **no attribute in common** (X ∩ Y = ∅). Example: Roll_No → Name.
4. **Full functional dependency** — Y depends on the **whole** of a composite determinant X, and not on any proper part of it. Example: {Roll_No, Course_ID} → Grade.
5. **Partial dependency** — a non-prime attribute depends on **only part of a composite candidate key**. Example: in (Roll_No, Course_ID, Name), Roll_No → Name.
6. **Transitive dependency** — if X → Y and Y → Z (and Y does not determine X), then Z depends on X **transitively** through Y. Example: Roll_No → Dept_ID and Dept_ID → Dept_Name, so Roll_No → Dept_Name is transitive.
7. **Multivalued dependency (MVD)** — X →→ Y: one value of X is associated with a **set of values of Y** that is **independent** of the other attributes. Example: a student can have several hobbies and several languages, unrelated to each other: Student →→ Hobby and Student →→ Language.

### Prime and Non-Prime Attributes

1. **Prime attribute** — an attribute that is part of **any candidate key**.
2. **Non-prime attribute** — an attribute that is not part of any candidate key.

### Armstrong's Axioms

Armstrong's axioms (W. W. Armstrong, 1974) are inference rules used to derive all the functional dependencies implied by a given set of FDs. They are **sound** (they derive only correct FDs) and **complete** (they derive all of them).

**Primary rules:**

1. **Reflexivity** — if Y ⊆ X, then X → Y.
2. **Augmentation** — if X → Y, then XZ → YZ.
3. **Transitivity** — if X → Y and Y → Z, then X → Z.

**Secondary (derived) rules:**

1. **Union** — if X → Y and X → Z, then X → YZ.
2. **Decomposition** — if X → YZ, then X → Y and X → Z.
3. **Pseudo-transitivity** — if X → Y and WY → Z, then WX → Z.
4. **Composition** — if X → Y and A → B, then XA → YB.

### Closure of a Set of Attributes

The **closure of an attribute set X**, written **X⁺**, is the **set of all attributes that are functionally determined by X** using the given FDs.

**Algorithm:**

1. Start with X⁺ = X.
2. For each FD A → B, if all of A is in X⁺, add B to X⁺.
3. Repeat step 2 until nothing new can be added.

**Use:** if X⁺ contains **all** the attributes of R, then X is a **super key**; if, in addition, no proper subset of X has this property, X is a **candidate key**.

#### Worked Example 1

R(A, B, C, D, E) with F = {AB → C, B → D, C → E, D → A}. Find B⁺ and the candidate key.

1. B⁺ = {B}.
2. B → D gives {B, D}.
3. D → A gives {A, B, D}.
4. AB → C (A and B are now present) gives {A, B, C, D}.
5. C → E gives {A, B, C, D, E}.

So **B⁺ = {A, B, C, D, E}** = all attributes, and B is a single attribute, so **B is the candidate key**. (B never appears on the right side of any FD, so it must be in every key.) By comparison, (CD)⁺ = {A, C, D, E}, which does not contain B, so CD is not a key.

#### Worked Example 2

R(A, B, C, D, E) with F = {A → BC, CD → E, B → D, E → A}.

1. A⁺: A → BC gives {A, B, C}; B → D gives {A, B, C, D}; CD → E gives {A, B, C, D, E}. So **A is a candidate key**.
2. E⁺: E → A, then as above, gives all attributes. So **E is a candidate key**.
3. (CD)⁺: CD → E, E → A, A → BC gives all attributes, and C⁺ = {C}, D⁺ = {D}. So **CD is a candidate key**.
4. (BC)⁺: B → D gives {B, C, D}; CD → E, E → A gives all attributes. So **BC is a candidate key**.

The candidate keys are **A, E, CD and BC**; all five attributes are prime.

### Canonical (Minimal) Cover

A canonical cover Fc is a **minimal set of FDs equivalent to F** (it implies the same FDs), with no redundant FD and no extraneous attribute. Steps:

1. Write each FD with a single attribute on the right side (decomposition rule).
2. Remove extraneous attributes from the left sides.
3. Remove redundant FDs (an FD that can be derived from the others).

Example: F = {A → BC, B → C, AB → C}. Splitting gives {A → B, A → C, B → C, AB → C}. AB → C is redundant (A → C already exists), and A → C is redundant (it follows from A → B and B → C). So **Fc = {A → B, B → C}**.

### Properties of Decomposition

Normalization decomposes a relation R into smaller relations R₁, R₂, …. A good decomposition has two properties:

1. **Lossless-join decomposition** — joining the smaller relations gives back **exactly the original relation**, with no extra (spurious) tuples. A decomposition of R into R₁ and R₂ is lossless if R₁ ∪ R₂ = R and the **common attributes R₁ ∩ R₂ form a key (super key) of R₁ or of R₂**.
2. **Dependency-preserving decomposition** — every FD of the original relation can be checked within the individual smaller relations (directly or by inference), without joining them.

Lossless join is essential; dependency preservation is desirable. A **3NF** decomposition can always be both lossless and dependency-preserving, while a **BCNF** decomposition is always lossless but **may not preserve all dependencies**.

## 2NF, 3NF and BCNF {#2nf-3nf-and-bcnf}

### First Normal Form (1NF)

A relation is in **1NF** if **every attribute contains only atomic (single, indivisible) values** — there are no multivalued attributes, repeating groups or nested tables — and each row is unique.

**Not in 1NF** (Phone has several values):

| Roll_No | Name | Phone |
| --- | --- | --- |
| 101 | Rahim | 01711000001, 01811000002 |
| 102 | Karim | 01911000003 |

**In 1NF** (one value in each cell):

| Roll_No | Name | Phone |
| --- | --- | --- |
| 101 | Rahim | 01711000001 |
| 101 | Rahim | 01811000002 |
| 102 | Karim | 01911000003 |

(Alternatively, the phone numbers can be moved to a separate table STUDENT_PHONE(Roll_No, Phone).)

### Second Normal Form (2NF)

A relation is in **2NF** if:

1. it is in **1NF**, and
2. it has **no partial dependency** — every **non-prime attribute is fully functionally dependent on the whole of every candidate key**, not on a part of it.

2NF matters only when a candidate key is **composite**; a relation in 1NF whose candidate keys are single attributes is automatically in 2NF.

**Example:** ENROLL(Roll_No, Course_ID, Name, Course_Title, Grade), key (Roll_No, Course_ID), with the FDs:

1. Roll_No → Name (partial dependency)
2. Course_ID → Course_Title (partial dependency)
3. {Roll_No, Course_ID} → Grade (full dependency)

It is not in 2NF. Decompose so that each attribute depends on a whole key:

1. STUDENT(**Roll_No**, Name)
2. COURSE(**Course_ID**, Course_Title)
3. ENROLL(**Roll_No, Course_ID**, Grade)

| Roll_No | Name |
| --- | --- |
| 101 | Rahim |
| 102 | Karim |

| Course_ID | Course_Title |
| --- | --- |
| C1 | DBMS |
| C2 | Networks |

| Roll_No | Course_ID | Grade |
| --- | --- | --- |
| 101 | C1 | A |
| 101 | C2 | B+ |
| 102 | C1 | A- |

### Third Normal Form (3NF)

A relation is in **3NF** if:

1. it is in **2NF**, and
2. it has **no transitive dependency** of a non-prime attribute on a candidate key.

Formally, for every non-trivial FD X → A, either **X is a super key** or **A is a prime attribute**.

**Example:** STUDENT(Roll_No, Name, Dept_ID, Dept_Name), key Roll_No, with Roll_No → Dept_ID and Dept_ID → Dept_Name. Dept_Name depends on Roll_No **transitively** through Dept_ID (a non-key attribute), so the relation is in 2NF but not in 3NF.

| Roll_No | Name | Dept_ID | Dept_Name |
| --- | --- | --- | --- |
| 101 | Rahim | D1 | Computer Science |
| 102 | Karim | D2 | Physics |
| 103 | Sumi | D1 | Computer Science |

Decompose:

1. STUDENT(**Roll_No**, Name, Dept_ID) — Dept_ID is a foreign key.
2. DEPARTMENT(**Dept_ID**, Dept_Name)

| Roll_No | Name | Dept_ID |
| --- | --- | --- |
| 101 | Rahim | D1 |
| 102 | Karim | D2 |
| 103 | Sumi | D1 |

| Dept_ID | Dept_Name |
| --- | --- |
| D1 | Computer Science |
| D2 | Physics |

Now "Computer Science" is stored once. The decomposition is lossless, because the common attribute Dept_ID is the key of DEPARTMENT.

### Boyce–Codd Normal Form (BCNF)

A relation is in **BCNF** if, for **every non-trivial functional dependency X → Y, X is a super key**.

In other words, **every determinant is a candidate key (or super key)**. BCNF is a stronger form of 3NF (sometimes called 3.5NF): every BCNF relation is in 3NF, but not every 3NF relation is in BCNF.

**Example:** TEACHES(Student, Subject, Teacher). Each teacher teaches only one subject, and for each subject a student has one teacher:

1. {Student, Subject} → Teacher
2. Teacher → Subject

The candidate keys are **{Student, Subject}** and **{Student, Teacher}**, so all three attributes are prime.

| Student | Subject | Teacher |
| --- | --- | --- |
| Rahim | DBMS | Dr. Hasan |
| Karim | DBMS | Dr. Hasan |
| Rahim | Java | Dr. Roy |
| Sumi | DBMS | Dr. Islam |

1. It **is in 3NF**: for Teacher → Subject, the determinant Teacher is not a super key, but Subject is a **prime** attribute, so 3NF allows it.
2. It is **not in BCNF**: Teacher → Subject has a determinant (Teacher) that is **not a super key**. The fact "Dr. Hasan teaches DBMS" is repeated.

Decompose into BCNF:

1. TEACHER_SUBJECT(**Teacher**, Subject)
2. STUDENT_TEACHER(**Student, Teacher**)

This decomposition is **lossless** (the common attribute Teacher is the key of TEACHER_SUBJECT) but **not dependency-preserving**: {Student, Subject} → Teacher can no longer be checked in a single table.

### Fourth and Fifth Normal Forms

1. **Fourth normal form (4NF)** — a relation is in 4NF if it is in BCNF and has **no non-trivial multivalued dependency** X →→ Y unless X is a super key. Example: STUDENT(Name, Hobby, Language), where hobbies and languages are independent, is split into (Name, Hobby) and (Name, Language).
2. **Fifth normal form (5NF / project-join normal form)** — a relation is in 5NF if it is in 4NF and has **no join dependency** that is not implied by its candidate keys; that is, it cannot be decomposed further into smaller tables without loss.

### Difference Between 3NF and BCNF

| Basis | 3NF | BCNF |
| --- | --- | --- |
| Condition | For every non-trivial X → A, X is a super key **or A is prime** | For every non-trivial X → A, X is a super key |
| Strictness | Less strict | Stricter (every BCNF relation is in 3NF) |
| Determinants | A non-key determinant is allowed if the dependent is prime | Every determinant must be a super key |
| Redundancy | Some redundancy may remain | Less redundancy |
| Dependency preservation | Always achievable | Not always achievable |
| Lossless decomposition | Always achievable | Always achievable |

### Summary of Normal Forms

| Normal form | Condition |
| --- | --- |
| 1NF | All values atomic; no repeating groups |
| 2NF | 1NF + no partial dependency of a non-prime attribute on a candidate key |
| 3NF | 2NF + no transitive dependency of a non-prime attribute on a candidate key |
| BCNF | Every determinant of a non-trivial FD is a super key |
| 4NF | BCNF + no non-trivial multivalued dependency |
| 5NF | 4NF + no non-trivial join dependency |

## References {#references}

**TutorialsPoint**

- [Database Normalization](https://www.tutorialspoint.com/dbms/database_normalization.htm) — accessed 2026-11-06 (functional dependency, Armstrong's axioms, trivial, non-trivial and completely non-trivial FDs, anomalies, 1NF, 2NF, 3NF, BCNF, prime and non-prime attributes)
- [Functional Dependency](https://www.tutorialspoint.com/dbms/dbms_functional_dependency.htm) — accessed 2026-11-06 (definition, valid and invalid dependencies with examples)

**GeeksforGeeks**

- [Introduction of Database Normalization](https://www.geeksforgeeks.org/dbms/introduction-of-database-normalization/) and [Normal Forms in DBMS](https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/) — accessed 2026-11-06. The normal-forms page's 3NF example claims a dependency CourseID → … through StudentID that is not given, and its BCNF example uses a dependency whose determinant is the whole key (which does not violate BCNF); these examples are not used.
- [Types of Functional Dependencies](https://www.geeksforgeeks.org/dbms/types-of-functional-dependencies-in-dbms/) — accessed 2026-11-06. Its "semi non-trivial" example {StudentID, CourseID} → CourseID is actually trivial (the right side is a subset of the left side).
- [Armstrong's Axioms](https://www.geeksforgeeks.org/dbms/armstrongs-axioms-in-functional-dependency-in-dbms/), [Attribute Closure and Candidate Keys](https://www.geeksforgeeks.org/dbms/finding-attribute-closure-and-candidate-keys-using-functional-dependencies/), [Canonical Cover](https://www.geeksforgeeks.org/dbms/canonical-cover-of-functional-dependencies-in-dbms/) and [Lossless Join and Dependency-Preserving Decomposition](https://www.geeksforgeeks.org/dbms/lossless-join-and-dependency-preserving-decomposition/) — accessed 2026-11-06 (worked example 1 and the canonical-cover example come from these pages)
- [Second Normal Form](https://www.geeksforgeeks.org/dbms/second-normal-form-2nf/), [Third Normal Form](https://www.geeksforgeeks.org/dbms/third-normal-form-3nf/) and [BCNF](https://www.geeksforgeeks.org/dbms/boyce-codd-normal-form-bcnf/) — accessed 2026-11-06 (the BCNF student–teacher–subject example). The 3NF page calls B non-prime in its Example 2, but B is part of the candidate key BC (worked example 2 above).
- [Denormalization](https://www.geeksforgeeks.org/dbms/denormalization-in-databases/) — accessed 2026-11-06

**TpointTech**

- [Normalization](https://www.tpointtech.com/dbms-normalization) — accessed 2026-11-06 (anomalies, table of normal forms). It says that normal forms ensure anomalies "are introduced"; they ensure that anomalies are removed.
- [Functional Dependency](https://www.tpointtech.com/dbms-functional-dependency) — accessed 2026-11-06. It states the reflexivity axiom backwards ("if S → T, then T is a subset of S"); the rule is "if T ⊆ S, then S → T".
- [First Normal Form](https://www.tpointtech.com/dbms-first-normal-form), [Second Normal Form](https://www.tpointtech.com/dbms-second-normal-form), [Third Normal Form](https://www.tpointtech.com/dbms-third-normal-form) and [BCNF](https://www.tpointtech.com/dbms-boyce-codd-normal-form) — accessed 2026-11-06. The 2NF page says deleting student 2523 keeps teacher 201's data, though teacher 201 appears only in that row; the 3NF page swaps the labels of its deletion and update anomaly examples.

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (normalization, anomalies, functional dependency types, 1NF, 2NF, 3NF and BCNF with examples). Its multivalued-dependency example contains two rows with Employee_Id 4 and different names, which breaks the dependency it illustrates; and in its BCNF example P_Leader → P_ID makes {E_Code, P_Leader} a second candidate key, so P_Leader is prime, not non-prime as stated.

**Programiz**

- Programiz has no page on normalization or functional dependencies (checked 2026-11-06).
