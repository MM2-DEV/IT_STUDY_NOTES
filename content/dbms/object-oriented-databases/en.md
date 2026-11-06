---
description: Object-oriented databases - the object-oriented data model (objects, object identity, attributes, methods, messages, classes, inheritance, encapsulation, polymorphism, complex objects), OODBMS and ODMG, OODBMS vs RDBMS, object-relational DBMS, object persistence, and implementing persistence on relational databases with object-relational mapping and inheritance mapping.
updated: 2026-11-06
---

## Object-Oriented Data Model {#object-oriented-data-model}

### Definition of Object-Oriented Data Model

The object-oriented data model is a data model in which **data and the methods that operate on it are stored together as objects**, grouped into classes.

The classes are organized in **inheritance hierarchies**, following the concepts of object-oriented programming. It was developed for applications that need **complex data** — such as CAD/CAM, multimedia, geographic information systems and engineering design — which do not fit well into flat relational tables.

### Concepts of the Object-Oriented Data Model

1. **Object** — a real-world entity represented in the database; it has a **state** (its attribute values) and a **behaviour** (its methods). Example: a particular circle with centre (2, 3) and radius 4.
2. **Object identity (OID)** — every object has a **unique, system-generated identifier** that never changes during the object's lifetime and is independent of its attribute values (unlike a primary key, which is a value). Objects refer to one another through OIDs.
3. **Attributes (instance variables)** — the data items that describe the state of an object; an attribute can hold a simple value, another object (a reference) or a collection of objects.
4. **Methods** — procedures (code) that operate on the object's data, for example findArea() or scale(factor).
5. **Messages** — requests sent to an object to invoke one of its methods; the object responds by executing the method. A message may only read the state (read-only) or change it (update).
6. **Class** — a group of objects with the same attributes and methods; each object is an **instance** of a class. Example: class Circle with attributes x_coord, y_coord, radius and methods findArea(), findCircumference(), scale().
7. **Inheritance** — a class (subclass) can be defined as a **specialization** of another (superclass) and inherits its attributes and methods ("is-a" relationship); types include single, multiple, multilevel, hierarchical and hybrid inheritance. Example: Student and Teacher inherit from Person.
8. **Encapsulation** — the attributes and methods are bound together in the object, and the internal data is **hidden**: other objects can access it only through the object's methods (its interface). This gives data hiding and data independence.
9. **Polymorphism** — the same method name can behave differently for different classes; for example findArea() computes πr² for a Circle and side² for a Square.
10. **Complex objects** — objects built from other objects and collections (sets, lists, arrays), for example a Car object containing Engine and Wheel objects.

### Object-Oriented Database Management System (OODBMS)

An OODBMS is a **DBMS that stores data as objects**, supporting the object-oriented data model directly.

Objects of a programming language such as **Java, C++ or Smalltalk** can be stored and retrieved **without converting them into tables**. It combines **object-oriented features** (objects, OID, classes, inheritance, encapsulation, complex objects) with **database features** (persistence, secondary storage, concurrency control, recovery and ad hoc querying).

**Standard:** the **ODMG (Object Data Management Group)** standard (version 3.0, 2001) defined an object model, the **ODL (Object Definition Language)** for defining schemas, and the **OQL (Object Query Language)**, an SQL-like query language for objects.

**Examples of OODBMS:** Versant, ObjectStore, Objectivity/DB, GemStone, db4o, ObjectDB, ZODB (Python).

### Advantages of OODBMS

1. **Complex data** (multimedia, CAD, nested objects) can be represented naturally.
2. **No impedance mismatch** — the same object model is used in the program and the database, so no mapping code is needed, and development is faster.
3. **Reusability** through inheritance, and data hiding through encapsulation.
4. **Fast navigation** between related objects by following object references (OIDs) instead of joins.

### Disadvantages of OODBMS

1. **Limited adoption**, fewer tools and less vendor support than relational systems.
2. **No universally accepted standard** and weaker query languages than SQL.
3. Harder to learn; schema changes can be complex.
4. Ad hoc querying, views and security are less developed.

### OODBMS vs RDBMS

| Basis | RDBMS | OODBMS |
| --- | --- | --- |
| Data stored as | Tables (relations) of rows | Objects (data and methods) |
| Data complexity | Simple, atomic values | Complex objects and collections |
| Grouping | Entity type / table | Class |
| Identity | Primary key (a value) | Object identifier (OID), system-generated |
| Relationships | Foreign keys and joins | Object references |
| Behaviour | Only data is stored | Data and methods stored together |
| Main objective | Data independence | Encapsulation |
| Query language | SQL | OQL |
| Inheritance | Not supported | Supported |
| Examples | MySQL, Oracle, SQL Server | Versant, ObjectStore, db4o, ObjectDB |

### Object-Relational DBMS (ORDBMS)

An object-relational DBMS is a **relational DBMS extended with object-oriented features**, keeping tables and SQL while adding:

1. **User-defined (structured) types** and complex data types (arrays, multisets, nested tables).
2. **Type and table inheritance.**
3. **Methods and user-defined functions** stored with the types.
4. **Reference types** (object identifiers) and large objects (BLOB, CLOB).

Its query language is **object-relational SQL** (SQL:1999 and later). **Examples:** PostgreSQL, Oracle, IBM DB2, Informix.

| Basis | OODBMS | ORDBMS |
| --- | --- | --- |
| Basis | Object-oriented programming model | Relational model extended with objects |
| Data storage | Objects | Tables with object features |
| Query language | OQL | Extended SQL |
| Compatibility with existing relational systems | Low | High |
| Examples | Versant, ObjectStore | PostgreSQL, Oracle |

## Implementing Object Persistence Using Relational Databases {#implementing-object-persistence-using-relational-databases}

### Object Persistence

Objects created by a program normally **disappear when the program ends** (transient objects). An object is **persistent** if it **continues to exist after the program that created it terminates**, because it has been saved on secondary storage; it can be loaded again later by the same or another program.

#### Approaches to Making Objects Persistent

1. **Persistence by class** — all objects of a class declared persistent are persistent.
2. **Persistence by creation** — an object is made persistent when it is created, using a special syntax.
3. **Persistence by marking** — an object is created as transient and later **marked** persistent before the program ends.
4. **Persistence by reachability** — one or more objects are declared persistent (**root** objects), and **every object reachable from a root** through references is also persistent.

### Implementing Persistence with a Relational Database

Most applications are written in object-oriented languages but store their data in **relational databases**. Because objects (with references, collections and inheritance) and tables (with flat rows and foreign keys) are different models — the **impedance mismatch** — objects must be **mapped** to tables. This is done by hand-written code (with JDBC/ODBC) or automatically by an **object-relational mapping (ORM)** framework such as **Hibernate (JPA)** in Java, **Entity Framework** in .NET or **SQLAlchemy** in Python. ORM is explained in [Database Access](/topics/software-engineering/database-access#object-relational-mapping-orm).

### Mapping Rules

1. **Class → table:** each persistent class becomes a table, and each simple attribute becomes a column. The primary key is an attribute with unique values or a **separate generated ID** (playing the role of the object identifier). Example: class Circle(x_coord, y_coord, radius) → CIRCLE(cid, x_coord, y_coord, radius).
2. **Multivalued (collection) attributes → separate table** with a foreign key to the owner's table.
3. **One-to-one association:** put the primary key of one table as a **foreign key** in the other.
4. **One-to-many association:** put the primary key of the "one" side as a **foreign key** in the table of the "many" side. Example: EMPLOYEE(emp_id, name, dept_id → DEPARTMENT).
5. **Many-to-many association:** create a **new (junction) table** with the primary keys of both classes as foreign keys; attributes of the association become its columns. Example: WORKS_ON(emp_id, project_id, hours) with primary key (emp_id, project_id).
6. **Object references** become foreign keys; **methods** are not stored in the tables (they stay in the program, or become stored procedures).

### Mapping Inheritance

An inheritance hierarchy (for example, Person with subclasses Student and Teacher) can be stored in three ways:

1. **Table per class hierarchy (single table)** — **one table for the whole hierarchy**, containing the attributes of all classes plus a **type (discriminator) column**. It is simple and fast (no joins), but has **many NULL values** and cannot enforce NOT NULL on subclass attributes.
2. **Table per concrete class** — **one table for each non-abstract class**, each containing **all attributes**, including the inherited ones. No joins are needed for one class, but inherited columns are repeated, and queries over the superclass need a UNION.
3. **Table per class (joined / vertical mapping)** — **one table for each class**, holding **only that class's own attributes**; the subclass table's **primary key is also a foreign key** to the superclass table. It is normalized with no redundancy, but reading an object needs **joins**.

![An inheritance hierarchy Person → Student, Teacher stored as one table per hierarchy, one table per concrete class, or one table per class joined by keys](/diagrams/dbms/inheritance-mapping.svg)

In JPA/Hibernate these are the inheritance strategies **SINGLE_TABLE**, **TABLE_PER_CLASS** and **JOINED**.

| Strategy | Tables | NULLs | Joins to read an object | Redundancy |
| --- | --- | --- | --- | --- |
| Table per hierarchy | One | Many | None | None |
| Table per concrete class | One per concrete class | None | None | Inherited columns repeated |
| Table per class (joined) | One per class | None | Yes | None |

## References {#references}

**TutorialsPoint**

- [OOAD – Object-Oriented Model](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_model.htm) — accessed 2026-11-06 (object identity, state and behaviour, the Circle class, encapsulation, message passing, inheritance types, polymorphism)
- [OOAD – Implementation Strategies](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_implementation_strategies.htm) — accessed 2026-11-06 (persistent data; mapping classes, one-to-one, one-to-many and many-to-many associations and inheritance to tables). Its CIRCLE example lists RADIUS in the schema but creates the table with Z_COORD and no RADIUS. TutorialsPoint's `dbms_object_oriented_databases` page returns 404.

**GeeksforGeeks**

- [Basic Object-Oriented Data Model](https://www.geeksforgeeks.org/dbms/basic-object-oriented-data-model/) and [Definition and Overview of ODBMS](https://www.geeksforgeeks.org/dbms/definition-and-overview-of-odbms/) — accessed 2026-11-06 (components, advantages and disadvantages)
- [Difference between RDBMS and OODBMS](https://www.geeksforgeeks.org/dbms/difference-between-rdbms-and-oodbms/) — accessed 2026-11-06 (comparison table). Its usage section lists MongoDB and Apache Cassandra as OODBMSs; they are NoSQL (document and wide-column) databases. GeeksforGeeks' `object-oriented-databases` and `object-relational-data-model-in-dbms` pages return 404.

**TpointTech**

- [Definition and Overview of ODBMS](https://www.tpointtech.com/definition-and-overview-of-odbms) — accessed 2026-11-06 (requirements of an OODBMS, ODMG 3.0, example applications)
- [Difference between OODBMS and ORDBMS](https://www.tpointtech.com/what-is-the-difference-between-oodbms-and-ordbms) — accessed 2026-11-06 (ORDBMS features and examples)
- [Hibernate Tutorial](https://www.tpointtech.com/hibernate-tutorial) — accessed 2026-11-06 (ORM, JPA, the SINGLE_TABLE, TABLE_PER_CLASS and JOINED inheritance strategies)

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (object-oriented DBMS among the types of DBMS; the object data model)

**Programiz**

- Programiz has no page on object-oriented databases (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Object-Based Databases" — the four approaches to persistence (by class, creation, marking and reachability) and object-relational features (not covered on the reference websites)
