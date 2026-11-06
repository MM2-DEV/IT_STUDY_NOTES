---
description: Data models - categories (conceptual, logical, physical) and types (hierarchical, network, relational, ER, object-oriented, object-relational, semi-structured, flat), schema and instance; the ER model - entities, attributes, relationships, degree, cardinality and participation; ER diagram symbols, extended ER (generalization, specialization, aggregation) and steps to draw an ER diagram.
updated: 2026-11-06
---

## Data Models {#data-models}

### Definition of Data Model

A data model is a **collection of conceptual tools for describing data, relationships, data semantics and constraints** in a database.

It describes how data is organized and how it can be stored, connected and processed, and it provides the basis for designing a database. The basic building blocks of a data model are **entities, attributes, relationships and constraints**.

### Categories of Data Models

Data models are of three categories by the level of detail:

1. **Conceptual (high-level) data model** — describes **what** data the organization needs and how the items are related, in terms that users understand, independent of any DBMS or hardware. It is used in requirements gathering and early design. Example: the **ER model**.
2. **Logical (representational or implementation) data model** — describes the logical structure of the data as it will be implemented in a type of DBMS — tables, columns, keys and relationships — without physical storage details. Example: the **relational model**.
3. **Physical (low-level) data model** — describes **how** data is actually stored in a particular DBMS: files, records, data types and lengths, indexes, access paths, partitions and storage on disk.

### Types of Data Models

The main types of data models are eight:

1. **Hierarchical model** — data is organized as a **tree** of records with parent–child links. Each child has **only one parent**, and a parent can have many children (one-to-many). Developed by IBM in the 1960s (IBM **IMS**).
   - Advantages: simple; fast retrieval along fixed paths; suits naturally hierarchical data such as organization charts and file systems.
   - Disadvantages: cannot represent many-to-many relationships directly (records must be duplicated); rigid structure; access only through the root.
2. **Network model** — data is organized as a **graph**: a record (member) can have **many parents** (owners), linked by pointers through "sets", so **many-to-many** relationships can be represented. Developed by Charles Bachman (IDS) and standardized by **CODASYL (DBTG)** in **1971**.
   - Advantages: more flexible than the hierarchical model; supports 1:1, 1:N and M:N relationships; less redundancy.
   - Disadvantages: complex to design and use; access is navigational (following pointers); structural changes are difficult.
3. **Relational model** — data is stored in **tables (relations)** of rows (tuples) and columns (attributes); tables are linked by common values (keys). Proposed by **E. F. Codd** of IBM in **1970**; based on set theory and first-order predicate logic; queried with **SQL**. It is the most widely used model.
4. **Entity-Relationship (ER) model** — a conceptual model that describes data as **entities, attributes and relationships**, drawn as an ER diagram. Proposed by **Peter Chen** in **1976**.
5. **Object-oriented model** — data and the operations on it are stored together as **objects**, with classes, object identity, inheritance and encapsulation, as in object-oriented programming.
6. **Object-relational model** — a relational model extended with object-oriented features such as user-defined types, inheritance and complex data types (for example, PostgreSQL and Oracle).
7. **Semi-structured model** — items of the same type may have different sets of attributes; the data describes itself with tags. **XML** and **JSON** are common formats.
8. **Flat (file) model** — the earliest and simplest model: all data is kept in a single two-dimensional table (one file), with no relationships between records.

![Hierarchical model: each child has one parent; network model: a record can have many parents](/diagrams/dbms/hierarchical-network-model.svg)

#### Hierarchical Model vs Network Model

| Basis | Hierarchical model | Network model |
| --- | --- | --- |
| Structure | Tree | Graph |
| Parents of a record | Only one | One or more |
| Relationships | One-to-many | One-to-many and many-to-many |
| Access path | One path, from the root | Several paths |
| Redundancy | Higher (records repeated for M:N) | Lower |
| Flexibility | Less | More |
| Complexity | Simpler | More complex |
| Example | IBM IMS | IDS, IDMS (CODASYL) |

### Advantages of Data Models

1. Represent the data and its relationships correctly and clearly.
2. Help communication between users, analysts and developers.
3. Reduce redundancy and find missing or wrong data early in design.
4. Give a clear basis for building the physical database (tables, keys, relationships).
5. Reduce development and maintenance cost.

### Disadvantages of Data Models

1. Large data models are hard to understand.
2. A small change in the structure may require changes in the whole application.
3. Physical models require knowledge of the DBMS and of physical storage.

### Schema and Instance

1. **Schema** — the **overall design (logical structure)** of the database: the names of tables, their attributes, data types, keys and constraints. It is defined during design and **changes rarely**. A **schema diagram** shows the schema.
2. **Instance (database state)** — the **actual data stored in the database at a particular moment**. It **changes frequently**, with every insert, update or delete.
3. **Subschema** — a part of the schema seen by a particular user or application (a view).

For example, the schema STUDENT(Roll_No, Name, Dept) stays the same, while the instance changes when a new student is added.

## Entity-Relationship (ER) Model {#entity-relationship-er-model}

### Definition of ER Model

The Entity-Relationship (ER) model is a **high-level conceptual data model** that describes data as **entities, attributes and relationships**, drawn as an **ER diagram (ERD)**.

It was introduced by **Peter Chen in 1976**. It is used in the conceptual design of a database and can be converted easily into tables of the relational model.

### Entity, Entity Type and Entity Set

1. **Entity** — a real-world object, person, place, event or concept that can be distinctly identified and about which data is stored; for example, a particular student, a car, a course or a reservation.
2. **Entity type** — the definition of a group of entities that have the same attributes; for example, STUDENT(Roll_No, Name, Age).
3. **Entity set** — the collection of all entities of one entity type at a particular time; for example, all the students of a college. An ER diagram shows entity sets (types), not individual entities.

#### Strong and Weak Entity

1. **Strong entity** — an entity type that has a **key attribute (primary key)** of its own and does not depend on any other entity; drawn as a **single rectangle**. Example: EMPLOYEE (Emp_ID).
2. **Weak entity** — an entity type that **does not have a primary key of its own** and **depends on a strong (owner) entity** for its identification; drawn as a **double rectangle**. It is connected to its owner through an **identifying relationship** (double diamond), always with **total participation**. It has a **partial key (discriminator)**, underlined with a dashed line. Example: DEPENDENT of an EMPLOYEE (identified by Emp_ID + Dependent_Name).

| Basis | Strong entity | Weak entity |
| --- | --- | --- |
| Primary key | Has its own primary key | Has only a partial key (discriminator) |
| Dependence | Independent | Depends on an owner (strong) entity |
| Symbol | Single rectangle | Double rectangle |
| Key underline | Solid underline | Dashed underline |
| Relationship with owner | — | Identifying relationship (double diamond) |
| Participation | Total or partial | Always total |

### Attributes

An attribute is a **property (characteristic) that describes an entity or a relationship**.

It is drawn as an **ellipse (oval)**; for example, a student's Roll_No, Name and Age. The set of values an attribute can take is its **domain**.

#### Types of Attributes

1. **Simple (atomic) attribute** — cannot be divided further; for example, Age, Price.
2. **Composite attribute** — made up of smaller sub-attributes; for example, Name (First_Name, Last_Name), Address (Street, City, Post_Code).
3. **Single-valued attribute** — has only one value for an entity; for example, Date_of_Birth, NID number.
4. **Multivalued attribute** — can have several values for one entity; for example, Phone_No, Email; drawn as a **double ellipse**.
5. **Derived attribute** — its value is calculated from other attributes and need not be stored; for example, Age (from Date_of_Birth), Total_Marks; drawn as a **dashed ellipse**.
6. **Stored attribute** — its value is stored in the database; for example, Date_of_Birth.
7. **Key attribute** — uniquely identifies each entity of an entity set; for example, Roll_No; its name is **underlined**.

### Relationship, Relationship Type and Relationship Set

1. **Relationship** — an association among two or more entities; for example, the student *Rahim* **enrols in** the course *DBMS*.
2. **Relationship type** — the definition of a set of similar relationships between entity types; for example, ENROLS between STUDENT and COURSE; drawn as a **diamond**.
3. **Relationship set** — the collection of all relationships of one type.
A relationship can also have attributes (descriptive attributes), such as the Grade of a student in a course.

### Degree of a Relationship

The degree of a relationship is the **number of entity types that participate in it**:

1. **Unary (recursive) relationship — degree 1** — an entity type is related to itself; for example, an EMPLOYEE *supervises* other EMPLOYEEs.
2. **Binary relationship — degree 2** — between two entity types; for example, STUDENT *enrols in* COURSE. It is the most common.
3. **Ternary relationship — degree 3** — among three entity types; for example, a TEACHER *teaches* a SUBJECT to a CLASS.
4. **N-ary relationship — degree n** — among n entity types (a degree-4 relationship is called quaternary).

### Cardinality Ratio (Mapping Cardinality)

The cardinality ratio is the **maximum number of entities of one entity set that can be associated with one entity of the other entity set** through a relationship. For a binary relationship there are four types:

1. **One-to-one (1:1)** — one entity of A is related to at most one entity of B, and vice versa; for example, a PERSON *holds* one PASSPORT.
2. **One-to-many (1:N)** — one entity of A can be related to many entities of B, but each entity of B to only one of A; for example, one DEPARTMENT *has* many EMPLOYEEs.
3. **Many-to-one (N:1)** — many entities of A are related to one entity of B; for example, many SURGERIEs are *done by* one SURGEON.
4. **Many-to-many (M:N)** — many entities of A can be related to many entities of B; for example, STUDENTs *enrol in* COURSEs, and EMPLOYEEs *work on* PROJECTs.

### Participation Constraint

The participation constraint states **whether every entity of an entity set must take part in a relationship** (the minimum cardinality):

1. **Total participation (mandatory)** — **every** entity must participate in at least one relationship; drawn with a **double line**. Example: every STUDENT must enrol in at least one COURSE; every weak entity participates totally in its identifying relationship.
2. **Partial participation (optional)** — **some** entities may not participate; drawn with a **single line**. Example: some COURSEs may have no student.

#### Min–Max Notation

Instead of 1, N and double lines, the **(min, max)** pair can be written beside each entity on the relationship line: *min* = the least number of relationships an entity must have (0 = optional, 1 or more = mandatory), *max* = the most it can have. For example, (1,1) next to EMPLOYEE in WORKS_FOR means every employee works for exactly one department, and (0,N) next to DEPARTMENT means a department can have zero or many employees.

### Advantages of the ER Model

1. **Simple and easy to understand**, even for non-technical users.
2. **Clear visual representation** of the data and its relationships.
3. **Effective communication** tool between users, designers and developers.
4. **Easy conversion to the relational model** (tables).
5. **Independent of any particular DBMS.**

### Disadvantages of the ER Model

1. There is no single standard notation (Chen, crow's foot and others are used).
2. Some constraints and data manipulation cannot be shown.
3. Large ER diagrams become complex and hard to read.

## ER Diagram Symbols and Constructs {#er-diagram-symbols-and-constructs}

### Symbols of ER Diagram

| Symbol | Meaning |
| --- | --- |
| Rectangle | Strong entity (entity type) |
| Double rectangle | Weak entity |
| Diamond | Relationship |
| Double diamond | Identifying relationship (of a weak entity) |
| Ellipse (oval) | Attribute |
| Ellipse with underlined name | Key attribute |
| Ellipse with dashed underline | Partial key (discriminator) of a weak entity |
| Double ellipse | Multivalued attribute |
| Dashed ellipse | Derived attribute |
| Ellipse connected to smaller ellipses | Composite attribute |
| Single line | Links attributes to entities and entities to relationships; partial participation |
| Double line | Total participation |
| 1, N, M written on lines | Cardinality ratio |
| Triangle labelled ISA | Generalization / specialization |
| Dashed box around a relationship | Aggregation |

![ER diagram symbols in Chen notation: entities, relationships, the types of attributes, participation lines and cardinality](/diagrams/dbms/er-symbols.svg)

### Example of an ER Diagram

1. **STUDENT** (strong entity) has the key attribute Roll_No, the simple attribute Name, the multivalued attribute Phone and the derived attribute Age.
2. **COURSE** (strong entity) has the key Course_ID and the attribute Title.
3. **ENROLS** is an **M:N** relationship between STUDENT and COURSE, with the descriptive attribute Grade; STUDENT participates **totally** (every student enrols in a course) and COURSE **partially**.
4. **GUARDIAN** is a **weak entity** identified through the identifying relationship **HAS** (1:N) with STUDENT; its partial key is G_Name.

![ER diagram: STUDENT enrols in COURSE (M:N, with Grade); weak entity GUARDIAN is identified through HAS](/diagrams/dbms/er-example.svg)

### Extended (Enhanced) ER Constructs

The **Enhanced ER (EER)** model adds the following constructs to the basic ER model:

1. **Superclass and subclass (ISA relationship)** — a subclass is a subset of the entities of a superclass; every entity of the subclass "**is a**" member of the superclass. For example, DEVELOPER ISA EMPLOYEE.
2. **Specialization** — a **top-down** process of dividing a higher-level entity type into lower-level **sub-entity types** (subclasses) according to their distinguishing features; for example, EMPLOYEE is specialized into DEVELOPER and TESTER.
3. **Generalization** — a **bottom-up** process of combining two or more entity types that have **common attributes** into a higher-level entity type (superclass); for example, STUDENT and FACULTY are generalized into PERSON, CAR and TRUCK into VEHICLE.
4. **Attribute inheritance** — a subclass inherits all the attributes and relationships of its superclass and can have its own extra attributes (for example, DEVELOPER inherits Emp_ID and Name and adds Language).
5. **Constraints on specialization:**
   - **Disjoint** (an entity can belong to only one subclass; marked *d*) or **overlapping** (an entity can belong to several subclasses; marked *o*).
   - **Total** (every superclass entity must belong to some subclass; double line) or **partial** (some may belong to none; single line).
6. **Aggregation** — an abstraction in which a **relationship together with its entities is treated as a single higher-level entity**, so that it can take part in another relationship. The ER model cannot connect a relationship directly to another relationship; aggregation solves this. For example, the relationship EMPLOYEE **works on** PROJECT is aggregated, and the aggregate **uses** MACHINERY.
7. **Category (union type)** — a subclass of the union of several different superclasses; for example, an OWNER may be a PERSON, a BANK or a COMPANY.

![Generalization (bottom-up) and specialization (top-down): DEVELOPER and TESTER are subclasses of EMPLOYEE through ISA](/diagrams/dbms/generalization-specialization.svg)

![Aggregation: the WORKS_ON relationship between EMPLOYEE and PROJECT is treated as one entity that takes part in USES with MACHINERY](/diagrams/dbms/aggregation.svg)

#### Generalization vs Specialization

| Basis | Generalization | Specialization |
| --- | --- | --- |
| Approach | Bottom-up | Top-down |
| Process | Combines lower-level entities into a higher-level entity | Divides a higher-level entity into lower-level entities |
| Based on | Common attributes | Distinguishing attributes |
| Result | Superclass | Subclasses |
| Example | CAR, TRUCK → VEHICLE | EMPLOYEE → DEVELOPER, TESTER |

### Steps to Draw an ER Diagram

1. **Identify the entities** and draw them as rectangles (double rectangles for weak entities).
2. **Identify the relationships** between the entities and draw them as diamonds connected to the entities (never connect two relationships directly).
3. **Identify the attributes** of each entity and relationship and draw them as ovals connected to them.
4. **Mark the primary keys** by underlining the key attributes.
5. **Specify the cardinality ratios** (1:1, 1:N, M:N) and the **participation constraints** (single or double lines).
6. **Remove redundant** entities, relationships and attributes, and review the diagram with the users.

## References {#references}

**TutorialsPoint**

- [DBMS – Data Models](https://www.tutorialspoint.com/dbms/dbms_data_models.htm) — accessed 2026-11-06 (flat, ER and relational models, mapping cardinalities)
- [ER Model – Basic Concepts](https://www.tutorialspoint.com/dbms/er_model_basic_concepts.htm) — accessed 2026-11-06 (entity, entity set, attribute types, keys, relationship, degree, mapping cardinalities)
- [ER Diagram Representation](https://www.tutorialspoint.com/dbms/er_diagram_representation.htm) and [Drawing an ER Diagram](https://www.tutorialspoint.com/dbms/dbms_drawing_er_diagram.htm) — accessed 2026-11-06 (symbols, total and partial participation, COMPANY example)
- [Generalization and Aggregation](https://www.tutorialspoint.com/dbms/dbms_generalization_aggregation.htm) and [Enhanced ER Model](https://www.tutorialspoint.com/dbms/dbms_enhanced_er_model.htm) — accessed 2026-11-06 (generalization, specialization, inheritance, ISA, disjoint and completeness constraints, union). The page titled "Generalization Aggregation" does not cover aggregation; aggregation is taken from GeeksforGeeks.

**GeeksforGeeks**

- [Data Models in DBMS](https://www.geeksforgeeks.org/dbms/data-models-in-dbms/) — accessed 2026-11-06 (conceptual, representational and physical models; types; advantages and disadvantages). This page dates the hierarchical model to the 1950s, while GeeksforGeeks' own hierarchical-model page and the other sites give the 1960s (IBM IMS); it describes the object-oriented model as "OOP plus relational", which is the object-relational model; and it lists a "Float" model, which is the flat model. Its claim that data models have "no set data manipulation language" is wrong and is not used.
- [Introduction of ER Model](https://www.geeksforgeeks.org/dbms/introduction-of-er-model/) — accessed 2026-11-06 (entities, attribute types, degree, cardinality, participation, steps to draw)
- [Generalization, Specialization and Aggregation](https://www.geeksforgeeks.org/dbms/generalization-specialization-and-aggregation-in-er-model/) — accessed 2026-11-06
- [Hierarchical Model](https://www.geeksforgeeks.org/dbms/hierarchical-model-in-dbms/) and [Network Model](https://www.geeksforgeeks.org/dbms/network-model-in-dbms/) — accessed 2026-11-06 (advantages, disadvantages, comparison table). The network-model page says that the model has no database standard, which contradicts the CODASYL (DBTG) standard named on GeeksforGeeks' data-models page.

**TpointTech**

- [Data Models](https://www.tpointtech.com/data-models) and [Data Model Schema and Instance](https://www.tpointtech.com/dbms-data-model-schema-and-instance) — accessed 2026-11-06 (relational, ER, object-based and semi-structured models; schema, instance, subschema)
- [ER Model Concept](https://www.tpointtech.com/dbms-er-model-concept) — accessed 2026-11-06 (strong vs weak entity, attributes, cardinality, degree, min–max notation). This page calls a degree-4 relationship "quadratic" and says that a ternary relationship has degree 4 (a quaternary relationship has degree 4; ternary is 3), calls a minimum of 0 "optimal" (optional), says that attributes "must be unique" (only key attributes must be), and draws a strong entity's link as a "single arrow line" (it is a plain single line).
- [Notation of ER Diagram](https://www.tpointtech.com/dbms-notation-of-er-diagram) — accessed 2026-11-06

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (data model types, ER diagram purposes, ten ER symbols, entity types, attribute types, degree and cardinality with examples)

**Programiz**

- Programiz has no page on data models or the ER model (checked 2026-11-06).
