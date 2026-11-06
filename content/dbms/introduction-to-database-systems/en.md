---
description: Introduction to database systems - data, database and DBMS, evolution from manual and file processing systems to DBMS, problems of file processing, file system vs DBMS, role of databases in organizations, components of the database environment, types of DBMS, and advantages and disadvantages of DBMS.
updated: 2026-11-06
---

## Evolution of File Processing Systems {#evolution-of-file-processing-systems}

### Data, Information and Database

1. **Data** — raw facts and figures (text, numbers, images, sounds) that can be recorded and processed; for example, a student's roll number, name and marks. The word comes from the Latin *datum*, "a single piece of information".
2. **Information** — data that has been processed and organized so that it has meaning and is useful; for example, a result sheet showing each student's grade.
3. **Database** — an organized collection of logically related data, stored electronically so that it can be easily accessed, managed and updated; for example, a college database holding data about students, teachers, courses and results.

### File Processing System

A file processing system is an early method of data management in which **each application keeps its own separate data files**, handled by its own programs.

The files are not connected with each other, and a new program has to be written for every new task.

For example, in a college the accounts section keeps a file of (roll, name, fees), the library keeps a file of (roll, name, books issued), and the examination section keeps a file of (roll, name, marks). The name and roll of every student are stored three times.

![In file processing each program has its own separate file; in the database approach all programs share one database through the DBMS](/diagrams/dbms/file-vs-database-approach.svg)

#### Characteristics of a File Processing System

1. Data of the organization is stored as separate files (flat files).
2. Each file belongs to one department or application and is independent of the others.
3. Programs are written in third-generation languages such as **COBOL**, **C** and **C++**, and the file format is fixed inside each program.
4. Any change in a file's structure requires changes to all the programs that use it.
5. It is simple and cheap to start, but less flexible and costly to maintain.

### Problems of File Processing Systems

1. **Data redundancy** — the same data is stored in several files, wasting storage space and effort.
2. **Data inconsistency** — because of redundancy, different copies of the same data may not agree; for example, a student's address is changed in the accounts file but not in the library file.
3. **Difficulty in accessing data** — a new program must be written for every new request (for example, "list all students of a district who owe fees"), so data cannot be retrieved easily.
4. **Data isolation** — data is scattered in separate files in different formats, so it is hard to write programs that combine it.
5. **Integrity problems** — rules (constraints) such as "the balance must never be negative" are buried inside program code, so they are hard to enforce and to change.
6. **Atomicity problems** — if the system fails in the middle of an operation (for example, money has been taken from one account but not yet added to the other), the data is left in an inconsistent state; the operation cannot be guaranteed to happen completely or not at all.
7. **Concurrent-access anomalies** — when several users update the same data at the same time, the result can be wrong.
8. **Security problems** — it is difficult to let each user see only the part of the data he or she is allowed to see.
9. **Program–data dependence** — the structure of the data is fixed in the programs, so changing the structure means rewriting the programs.

These problems led to the development of database management systems.

### Evolution of Data Management

1. **Manual (paper) files** — records kept in folders and filing cabinets and searched by hand; adequate only for small amounts of data.
2. **1950s – early 1960s: punched cards and magnetic tapes** — the first computerized data processing (for example, payroll); data could be read only **sequentially**.
3. **1960s: file processing systems** — separate data files for each application, written in COBOL and similar languages; with **hard disks**, direct (random) access to records became possible.
4. **1960s: the first DBMSs (navigational databases)**:
   - **Network model** — **Charles Bachman** developed the **Integrated Data Store (IDS)** at General Electric, one of the first DBMSs; the network model was standardized by **CODASYL** (Data Base Task Group) in **1971**.
   - **Hierarchical model** — IBM developed **IMS (Information Management System)**, a tree-structured DBMS.
5. **1970: the relational model** — **Edgar F. Codd** of IBM proposed the relational model, in which data is stored in **tables** and queried without describing how to find it.
6. **Late 1970s – 1980s: relational DBMSs** — IBM's **System R** project developed **SQL**; commercial RDBMSs such as **Oracle**, **IBM DB2**, **Ingres** and SQL/DS appeared, and relational systems replaced network and hierarchical ones.
7. **1990s: object-oriented, object-relational and web databases** — decision support and data warehousing, parallel databases, and databases behind websites with very high transaction rates.
8. **2000s onwards: open-source, NoSQL, big data and cloud databases** — MySQL and PostgreSQL grew; **NoSQL** databases (MongoDB, Cassandra, Redis) handle very large and unstructured data; **cloud databases** (database as a service) are offered over the Internet.

## Role of Databases in Organizations {#role-of-databases-in-organizations}

A database is a **shared, central store of an organization's data**. It supports both the daily work of the organization and its planning and decision making:

1. **Supporting daily operations (transaction processing)** — recording sales, purchases, payments, admissions, bookings and other day-to-day transactions in real time (an **operational database**).
2. **Data sharing** — the same data is available to all authorized departments and users at the same time.
3. **Decision support** — managers use reports, queries and analyses of stored data to make business decisions; data warehouses hold historical data for analysis.
4. **Better customer service** — customer records, orders and histories are available instantly.
5. **Data security, integrity and reliability** — the organization's data is protected, accurate, backed up and recoverable.
6. **Supporting e-commerce and online services** — websites and apps read and store their data in databases.
7. **Regulatory compliance and record keeping** — keeping accurate records for audits and legal requirements.

### Applications of Databases

1. **Banking** — customer accounts, loans and transactions.
2. **Airlines and railways** — reservations and schedules.
3. **Universities and schools** — student records, registration, courses and results.
4. **E-commerce** — products, customers, orders and payments.
5. **Telecommunication** — call records, monthly bills and prepaid balances.
6. **Hospitals** — patient records, doctors and treatments.
7. **Finance and accounting** — sales, purchases, stocks and financial statements.
8. **Human resource management** — employees, salaries and taxes.
9. **Manufacturing** — production, inventory, orders and supply chains.
10. **Social media** — user profiles, posts, friends and messages.
11. **Libraries, insurance, broadcasting and government services.**

## Core Components of a Database Environment {#core-components-of-a-database-environment}

### Components of a Database System

A database system has six components:

1. **Hardware** — the physical devices: computers and servers, storage devices (hard disks, SSDs), memory, input/output devices and network equipment.
2. **Software** — the **DBMS** itself (for example, MySQL, Oracle, SQL Server, PostgreSQL, Microsoft Access), together with the operating system, network software and application programs.
3. **Data** — the most important component:
   - **User (operational) data** — the actual data of the organization stored in the database.
   - **Metadata** — "data about data": descriptions of the structure, names, types, sizes and constraints of the data, stored in the **data dictionary (catalog)**.
4. **Procedures** — instructions and rules for using and running the database: installing and setting up the DBMS, logging in and out, entering data, taking backups, recovering after failures and producing reports.
5. **Database access language** — the language used to define, store, update and retrieve data, mainly **SQL**: **DDL** (CREATE, ALTER, DROP), **DML** (INSERT, UPDATE, DELETE, SELECT), **DCL** (GRANT, REVOKE) and **TCL** (COMMIT, ROLLBACK).
6. **People (users)** — those who manage, design and use the database:
   - **Database administrator (DBA)** — installs and manages the DBMS, defines the storage structure, grants access rights, monitors and tunes performance, and takes backups and recovers the database.
   - **Database designers** — identify the data to be stored and design the database structure (logical and physical design).
   - **Application programmers** — write programs that use the database.
   - **End users** — **naive (parametric) users** such as bank tellers and reservation clerks, who use ready-made programs; **casual users**, who query the database occasionally; and **sophisticated users** such as engineers and analysts, who write their own queries.

### Components of the Database Environment

In the database environment of an organization, the following components work together:

1. **CASE tools** — computer-aided software engineering tools used to design databases and application programs.
2. **Repository** — a central store of all **metadata**: data definitions, relationships, screen and report formats and other system components.
3. **DBMS** — the software that defines, creates, maintains and controls access to the database.
4. **Database** — the organized collection of logically related data.
5. **Application programs** — programs that create and maintain the database and supply information to users.
6. **User interface** — the languages, menus, forms and other facilities through which users interact with the system.
7. **Data and database administrators** — the people responsible for the overall management of the organization's data and of the database.
8. **System developers** — systems analysts and programmers who design new application programs.
9. **End users** — the people throughout the organization who add, delete and modify data and request information.

![The database environment: end users, user interface, application programs, CASE tools, DBMS, database, repository, administrators and system developers](/diagrams/dbms/database-environment.svg)

## Definition of DBMS {#definition-of-dbms}

A Database Management System (DBMS) is a **software system that enables users to create, store, retrieve, update and manage a database**.

It acts as an **interface between the database and its users or application programs**, controls access to the data, and keeps the data consistent, secure and available to many users at the same time.

**Database system** = the database + the DBMS software (together with the applications that use them).

**Examples of DBMS:** MySQL, Oracle Database, Microsoft SQL Server, PostgreSQL, IBM DB2, Microsoft Access, SQLite, MongoDB.

### Functions of a DBMS

1. **Data definition** — creating, modifying and removing the structure of the database (using DDL).
2. **Data manipulation** — inserting, updating, deleting and retrieving data (using DML).
3. **Data storage management** — storing data on disk and keeping the catalog of metadata.
4. **Security and authorization** — allowing each user access only to permitted data.
5. **Integrity control** — enforcing rules (constraints) on the data.
6. **Concurrency control** — allowing many users to work at the same time without conflict.
7. **Transaction management** — making transactions satisfy the **ACID** properties (atomicity, consistency, isolation, durability).
8. **Backup and recovery** — restoring the database after a failure.

### Characteristics of a DBMS

1. **Real-world entity** — models real things such as students and courses with their attributes.
2. **Relation-based tables** — data is arranged in tables (in a relational DBMS).
3. **Isolation of data and application (data independence)** — the database stores its own description (metadata), separate from the programs.
4. **Less redundancy** — data is stored once and shared; normalization reduces redundancy.
5. **Consistency** — the data obeys the defined rules.
6. **Query language** — data can be retrieved easily with a query language such as SQL.
7. **ACID properties** for transactions.
8. **Multi-user and concurrent access.**
9. **Multiple views** — different users see different views of the same data.
10. **Security** — access is controlled by permissions.

### File System vs DBMS

| Basis | File processing system | DBMS |
| --- | --- | --- |
| Meaning | Data stored in separate files, handled by separate programs | Software that manages one integrated database |
| Redundancy and inconsistency | High; data is duplicated in many files | Controlled; data is stored centrally and shared |
| Data access | A new program is needed for each request | Easy, with a query language (SQL) |
| Data sharing | Difficult | Easy among authorized users |
| Data independence | None; data structure is fixed in programs | Logical and physical data independence |
| Integrity constraints | Hard to enforce (inside programs) | Easy (primary key, foreign key, unique, check, NOT NULL) |
| Concurrent access | Leads to anomalies | Controlled by concurrency control (locking) |
| Atomicity / crash recovery | Not supported | Supported by transactions and recovery |
| Backup and recovery | Done manually | Built-in backup and recovery tools |
| Security | Weak | Strong; user-level access control |
| Data abstraction | Storage details are visible | Storage details are hidden |
| Structure and cost | Simple and cheap | Complex and more expensive |
| Writing procedures | The user writes procedures to manage data | The DBMS manages data; users need not write procedures |
| Examples | Files handled by COBOL or C programs | MySQL, Oracle, SQL Server |

## Types of DBMS {#types-of-dbms}

### Types of DBMS by Data Model

There are six main types of DBMS by data model:

1. **Hierarchical DBMS** — data is organized as a **tree**: each child record has only **one parent**, and a parent can have many children (one-to-many). It is fast for fixed one-to-many relationships but cannot represent many-to-many relationships easily. Example: **IBM IMS**.
2. **Network DBMS** — data is organized as a **graph**: a record can have **many parents** and many children, linked by pointers, so many-to-many relationships can be represented. It is complex to design and query. Examples: **IDS**, IDMS (CODASYL model).
3. **Relational DBMS (RDBMS)** — data is stored in **tables (relations)** of rows (tuples) and columns (attributes), linked by keys, and queried with **SQL**. It is the most widely used type. Examples: **MySQL, Oracle, SQL Server, PostgreSQL, DB2**.
4. **Object-oriented DBMS (OODBMS)** — data is stored as **objects** with attributes and methods, as in object-oriented programming (classes, inheritance, encapsulation). Examples: ObjectDB, db4o.
5. **Object-relational DBMS (ORDBMS)** — a relational DBMS extended with object features such as user-defined types and inheritance. Example: PostgreSQL.
6. **NoSQL DBMS** ("Not only SQL") — non-relational databases for very large, distributed and unstructured or semi-structured data, of four kinds:
   - **Key-value stores** — Redis, Amazon DynamoDB.
   - **Document stores** — MongoDB, CouchDB.
   - **Column-family (wide-column) stores** — Cassandra, HBase.
   - **Graph databases** — Neo4j.

### Types of DBMS by Number of Users

1. **Single-user (personal) DBMS** — used by one user at a time on one computer; for example, Microsoft Access used on a desktop.
2. **Multi-user (enterprise) DBMS** — used by many users at the same time; for example, Oracle and SQL Server in a bank.

### Types of DBMS by Location

1. **Centralized DBMS** — the whole database is stored at **one site** (one central computer) and accessed by users from many locations.
2. **Distributed DBMS** — the database is spread over **several sites** connected by a network, but it appears to users as one database:
   - **Homogeneous** — all sites use the same DBMS software.
   - **Heterogeneous** — different sites use different DBMS software.
3. **Cloud database** — the database is hosted by a cloud provider and used over the Internet as a service (for example, Amazon RDS, Google Cloud SQL, MongoDB Atlas).

## Advantages and Disadvantages of DBMS {#advantages-and-disadvantages-of-dbms}

### Advantages of DBMS

1. **Controlled data redundancy** — data is stored centrally once and shared, so duplication is reduced.
2. **Data consistency** — with less redundancy, an update is made in one place, so all users see the same correct value.
3. **Data sharing** — many authorized users and applications can use the same data.
4. **Data integrity** — integrity constraints (for example, marks between 0 and 100) prevent invalid data.
5. **Data security** — access control, authentication and authorization let users see only the data they are permitted to see.
6. **Data independence** — the structure of the data can be changed without changing the application programs (logical and physical data independence).
7. **Easy access with a query language** — data is retrieved with short SQL queries instead of long programs.
8. **Concurrency control** — many users can use the database at the same time without conflicts.
9. **Backup and recovery** — the DBMS provides tools to back up the data and recover it after a failure.
10. **Enforcement of standards** — the DBA can apply common standards for naming, formats and documentation.
11. **Multiple user interfaces and views** — graphical, form-based and programming interfaces, and different views for different users.
12. **Reduced application development and maintenance time.**

### Disadvantages of DBMS

1. **High cost** — the DBMS software, powerful hardware, and training and staff (such as a DBA) are expensive.
2. **Complexity** — a DBMS is complex software; designers, developers and users must be trained to use it properly.
3. **Large size** — the DBMS needs a lot of disk space and memory.
4. **Performance overhead** — for small, simple applications, a DBMS can be slower than simple files because of its extra features (security, concurrency, recovery).
5. **Higher impact of failure** — since all data is centralized, a failure of the database affects every user and application; good backup is essential.
6. **Conversion cost** — moving from an old file system to a DBMS takes time and money.

## References {#references}

**TutorialsPoint**

- [DBMS – Overview](https://www.tutorialspoint.com/dbms/dbms_overview.htm) — accessed 2026-11-06 (data, database, characteristics of DBMS, users)
- [DBMS – System Environment](https://www.tutorialspoint.com/dbms/dbms_system_environment.htm) — accessed 2026-11-06 (catalog, users: DBA, casual, application programmers, parametric users; CASE tools)
- [Explain the characteristics of DBMS](https://www.tutorialspoint.com/Advantages-of-Database-Management-System) — accessed 2026-11-06 (characteristics and examples of DBMS). This URL, titled "advantages", serves a page on characteristics only.

**GeeksforGeeks**

- [Introduction of DBMS](https://www.geeksforgeeks.org/dbms/introduction-of-dbms-database-management-system-set-1/) — accessed 2026-11-06 (definition, components, types with examples, database languages, applications)
- [History of DBMS](https://www.geeksforgeeks.org/dbms/history-of-dbms/) — accessed 2026-11-06 (tapes, IDS and IMS, Codd 1970, System R and commercial RDBMSs)
- [Disadvantages of File Systems](https://www.geeksforgeeks.org/dbms/disadvantages-of-file-systems/), [Traditional File System](https://www.geeksforgeeks.org/dbms/traditional-file-system/) and [Need for DBMS](https://www.geeksforgeeks.org/dbms/need-for-dbms/) — accessed 2026-11-06
- [Difference between File System and DBMS](https://www.geeksforgeeks.org/dbms/difference-between-file-system-and-dbms/) — accessed 2026-11-06. In this page's table the "procedures" row is reversed (it says DBMS users must write procedures); TpointTech has it the right way, as given above. It also claims that a DBMS has "no redundant data"; a DBMS controls redundancy but does not remove it completely.
- [Advantages of Database Management System](https://www.geeksforgeeks.org/dbms/advantages-of-database-management-system/) — accessed 2026-11-06. Its description of atomicity ("changes reflected across the whole database") is incorrect; atomicity means that a transaction is done completely or not at all.

**TpointTech**

- [DBMS Tutorial](https://www.tpointtech.com/dbms-tutorial) — accessed 2026-11-06 (definition, tasks, characteristics, advantages, disadvantages)
- [What is a Database](https://www.tpointtech.com/what-is-database) — accessed 2026-11-06 (data, evolution, types). This page calls both IMS and IDS "the first DBMS", and says IDS was developed at Honeywell; Bachman developed IDS at General Electric (GeeksforGeeks names both IDS and IMS among the first DBMSs, as given above).
- [Difference between File System and DBMS](https://www.tpointtech.com/dbms-vs-files-system) and [Advantages of DBMS over File System](https://www.tpointtech.com/advantages-of-dbms-over-file-system) — accessed 2026-11-06. The latter calls a file management system "also a database management system" and gives MySQL and Oracle as query languages; both statements are wrong (the query language is SQL).
- [Components of DBMS](https://www.tpointtech.com/components-of-dbms), [Database Applications](https://www.tpointtech.com/database-applications), [Types of Databases](https://www.tpointtech.com/types-of-databases) and [Personnel Involved in DBMS](https://www.tpointtech.com/personnel-involved-in-database-management-system) — accessed 2026-11-06. The types page says that Codd "invented the database in 1970"; he proposed the relational model in 1970.

**Programiz**

- [Introduction to Databases](https://www.programiz.com/sql/database-introduction) — accessed 2026-11-06 (relational and non-relational databases with examples). It describes all non-relational databases as key-value stores; MongoDB, which it lists, is a document store.

**Additional sources**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, McGraw-Hill, chapter 1 — the classic list of file-processing problems (including atomicity problems and concurrent-access anomalies)
- J. A. Hoffer, V. Ramesh and H. Topi, *Modern Database Management*, Pearson, chapter 1 — components of the database environment (CASE tools, repository, DBMS, database, application programs, user interface, administrators, system developers, end users)
