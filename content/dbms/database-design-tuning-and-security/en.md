---
description: Database design phases, database tuning (indexes, queries, schema, transactions, hardware), database security and authorization (threats, CIA, authentication, access control models DAC, MAC and RBAC, GRANT and REVOKE, views, roles, SQL injection, encryption, statistical databases), and multidimensional queries (data warehouse, OLAP, data cube, star and snowflake schemas, OLAP operations, ROLLUP and CUBE).
updated: 2026-11-06
---

## Database Design {#database-design}

### Definition of Database Design

Database design is the **process of creating a detailed data model of a database** so that it stores the required data efficiently, consistently and without redundancy.

The model covers the entities, attributes, relationships, constraints and physical storage of the database.

### Phases of Database Design

1. **Requirements analysis** — find out what data the users and applications need, what operations they will perform and what performance and security they require (through interviews, documents and existing systems).
2. **Conceptual design** — build a high-level **conceptual schema**, usually an **ER diagram**, describing entities, attributes, relationships and constraints, independent of any DBMS.
3. **Logical design** — **map** the conceptual schema to the data model of the chosen DBMS (for a relational DBMS, convert the ER diagram into **tables, keys and foreign keys**).
4. **Schema refinement (normalization)** — analyse the tables using **functional dependencies** and **normalize** them (to 3NF or BCNF) to remove redundancy and anomalies.
5. **Physical design** — decide how the tables are stored: **indexes**, file organizations, clustering, partitioning, and possible denormalization, to meet performance needs.
6. **Security design** — identify user groups, their roles and **access privileges**, and the views each group may use.
7. **Implementation and testing** — create the database with DDL, load the data, build the applications and test them (including the integrity constraints); then **tune** and maintain it.

### Characteristics of a Good Database Design

1. **No unnecessary redundancy** — each fact stored once.
2. **Completeness** — all required data and relationships are represented.
3. **Data integrity** — constraints (primary key, foreign key, NOT NULL, UNIQUE, CHECK) keep data correct.
4. **Efficiency** — frequent queries run fast.
5. **Security** — users can access only what they are allowed to.
6. **Flexibility** — the design can be extended easily.

### Pitfalls in Database Design

1. **Redundancy** — repeating information, which wastes space and causes update anomalies.
2. **Incompleteness** — some aspects of the enterprise cannot be modelled (for example, a fact cannot be stored until another fact exists).
3. Choosing the wrong entities, attributes or relationships (for example, using an attribute where an entity is needed).

## Database Tuning {#database-tuning}

### Definition of Database Tuning

Database tuning is the **process of adjusting a database system to improve its performance** for its actual workload.

It adjusts the hardware, DBMS parameters, physical schema, indexes, queries and transactions to improve throughput and response time. It is continuous: the workload is monitored, **bottlenecks** are found, and the components causing them are tuned.

### Bottlenecks

The performance of a system is usually limited by a few components, called **bottlenecks** (for example, the disk, the CPU, memory or locks). Removing one bottleneck may create another, so tuning repeats: **monitor → find the bottleneck → tune → monitor**. DBMSs provide tools such as query execution plans and performance monitors.

### Levels of Database Tuning

1. **Hardware tuning** — add memory (more buffer pages), faster or more disks (or SSDs), RAID, more processors; spread data and logs over separate disks.
2. **Tuning of DBMS parameters** — buffer size, checkpoint interval, number of connections and so on.
3. **Tuning of indexes** — create indexes on attributes used frequently in WHERE clauses and joins; remove indexes that are rarely used (they slow down updates); choose clustered or non-clustered indexes appropriately.
4. **Tuning of the physical schema:**
   - **Denormalization** — store some joined or redundant data to avoid frequent expensive joins.
   - **Vertical partitioning** — split a table with many columns so that frequently used columns are stored together.
   - **Materialized views** — store the results of frequent aggregate queries.
5. **Tuning of queries** — rewrite slow queries:
   - select only the needed columns instead of SELECT *;
   - filter rows with **WHERE** before grouping rather than with HAVING;
   - use joins instead of correlated subqueries where possible;
   - avoid functions on indexed columns in conditions, so the index can be used.
6. **Tuning of transactions** — keep transactions **short**, reduce lock contention (lock granularity, weaker isolation levels where safe), and run large batch jobs at off-peak times.

**Example of query tuning:**

```sql
-- Slower: filters after grouping
SELECT customer_id, SUM(amount) FROM Sales
GROUP BY customer_id, sale_date
HAVING sale_date BETWEEN '2025-01-01' AND '2025-12-31';

-- Faster: filters rows first, then groups
SELECT customer_id, SUM(amount) FROM Sales
WHERE sale_date BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY customer_id;
```

## Security and Authorization {#security-and-authorization}

### Database Security

Database security is the **protection of the database against unauthorized access, modification, destruction or disclosure**, whether intentional or accidental. Its three goals (the **CIA triad**) are:

1. **Confidentiality (secrecy)** — information is not disclosed to unauthorized users.
2. **Integrity** — data is modified only by authorized users, in authorized ways.
3. **Availability** — authorized users can access the data whenever they need it.

### Threats to Database Security

1. **SQL injection** — malicious input changes the meaning of a query.
2. **Weak authentication** — stolen or guessed passwords, brute-force attacks.
3. **Privilege abuse** — insiders using more access than they need.
4. **Misconfiguration and unpatched software.**
5. **Denial of service**, malware and attacks on unprotected backups.
6. **Inference** — deducing confidential individual data from allowed summary data.

### Control Measures for Database Security

1. **Authentication** — verifying the identity of users (passwords, multi-factor authentication, biometrics).
2. **Access control (authorization)** — granting each user only the privileges needed (**principle of least privilege**).
3. **Inference control** — preventing confidential data from being deduced from statistical (summary) queries.
4. **Flow control** — preventing information from flowing to unauthorized users (for example, through covert channels).
5. **Encryption** — encrypting data **at rest** and **in transit**, so stolen data cannot be read (for example, card numbers).
6. **Auditing** — recording who accessed or changed what, to detect misuse.
7. **Backup and recovery** — protecting availability against loss.

### Access Control Models

1. **Discretionary access control (DAC)** — the **owner** of an object decides who may access it, by **granting and revoking privileges** to other users; used in SQL (GRANT and REVOKE).
2. **Mandatory access control (MAC)** — access is decided by the system using **security classes (levels)** such as Top Secret > Secret > Confidential > Unclassified assigned to both users (clearance) and data (classification); the Bell–LaPadula rules apply: **no read up** (a subject can read only objects at its level or below) and **no write down**. Used in military and government systems.
3. **Role-based access control (RBAC)** — privileges are given to **roles** (such as teacher, clerk, manager), and users are assigned roles; changing a user's job only means changing the role.

### Authorization in SQL

#### Privileges

Privileges are rights to perform actions on database objects: **SELECT** (read), **INSERT**, **UPDATE** (optionally on specific columns), **DELETE**, **REFERENCES** (create foreign keys), **ALL PRIVILEGES**, and system privileges such as creating tables. The creator of an object is its **owner** and holds all privileges on it.

#### GRANT and REVOKE

```sql
-- Give privileges
GRANT SELECT, UPDATE (cgpa) ON Student TO clerk;

-- Allow the receiver to pass the privilege on to others
GRANT SELECT ON Student TO teacher WITH GRANT OPTION;

-- Take back a privilege
REVOKE UPDATE (cgpa) ON Student FROM clerk;

-- Also revoke it from everyone who received it from teacher
REVOKE SELECT ON Student FROM teacher CASCADE;
```

1. **WITH GRANT OPTION** — the user who receives the privilege can **grant it to other users**.
2. **CASCADE** — revoking a privilege also revokes it from **all users who received it through the revoked user**; **RESTRICT** makes the REVOKE fail if such dependent grants exist.
3. **Authorization graph** — the system keeps a graph whose nodes are users and whose edges Uᵢ → Uⱼ mean "Uᵢ granted the privilege to Uⱼ", with the DBA (or owner) as the root; a user keeps a privilege only while there is a **path from the root** to that user.

#### Roles

A role is a **named set of privileges**; privileges are granted to the role and the role is granted to users:

```sql
CREATE ROLE teacher;
GRANT SELECT, UPDATE ON Marks TO teacher;
GRANT teacher TO rahim, sumi;
```

#### Views for Security

A **view** can give a user access to **only some rows and columns** of a table: for example, a view showing only the names and departments of students (without their phone numbers), on which SELECT is granted instead of on the base table.

### SQL Injection

SQL injection is an attack in which **malicious input is inserted into an SQL query built from user input**, changing its meaning.

The attacker can then read, modify or delete data. For example, if a login query is built as

`SELECT * FROM Users WHERE name = '` + input + `' AND password = '…'`

then the input `' OR '1'='1' --` makes the condition always true and the rest of the query a comment, so the attacker logs in without a password. **Prevention:**

1. Use **prepared (parameterized) statements**, which send the values separately from the SQL text.
2. **Validate** input (allow only expected characters and formats).
3. Use stored procedures and ORMs correctly.
4. Give the application account **minimum privileges** and show generic error messages.

### Statistical Database Security

A **statistical database** allows only **summary (aggregate) queries** such as COUNT, SUM and AVG over groups, not access to individual records — for example, a census database. An attacker may still **infer** an individual's data by combining queries (for example, the average salary of a group that contains only one person). Protections include a **minimum query-set size**, preventing queries with large overlaps, and adding small random **noise** to results.

## Multidimensional Queries {#multidimensional-queries}

### Data Warehouse

A data warehouse is a **subject-oriented, integrated, time-variant and non-volatile collection of data** gathered from several sources, organized to support **analysis and decision making**. Data is loaded through **ETL** (extract, transform, load).

| Basis | Operational database (OLTP) | Data warehouse (OLAP) |
| --- | --- | --- |
| Purpose | Day-to-day transactions | Analysis and decision support |
| Data | Current, detailed | Historical, summarized |
| Users | Clerks, many users | Managers and analysts |
| Operations | Short inserts, updates, deletes | Complex read-only queries |
| Design | ER model, normalized | Star or snowflake schema |
| Size | MB to GB | GB to TB and more |

### Multidimensional Data Model

Multidimensional queries analyse data viewed as a **data cube**:

1. **Facts (measures)** — the numeric values being analysed, such as **sales amount** or units sold.
2. **Dimensions** — the perspectives by which facts are analysed, such as **time, item, branch and location**; each dimension can have a **hierarchy** (day < month < quarter < year; city < province < country).
3. **Data cube** — a multidimensional array in which each cell holds the measure for one combination of dimension values.

### Schemas for Multidimensional Data

1. **Star schema** — a large central **fact table** containing the measures and the foreign keys of the dimensions, surrounded by one **denormalized dimension table** per dimension. Simple and fast for queries.
2. **Snowflake schema** — like a star schema, but the dimension tables are **normalized** into further tables (for example, ITEM → SUPPLIER), reducing redundancy at the cost of more joins.
3. **Fact constellation (galaxy) schema** — **several fact tables share dimension tables** (for example, SALES and SHIPPING).

![Star schema with the SALES fact table in the centre and TIME, ITEM, BRANCH and LOCATION dimension tables](/diagrams/dbms/star-schema.svg)

### OLAP

OLAP (online analytical processing) is a technology that allows users to **analyse multidimensional data interactively and quickly** from different points of view. OLAP servers are of three types:

1. **ROLAP (relational OLAP)** — stores data in a **relational DBMS** and adds aggregation logic; scales to large data.
2. **MOLAP (multidimensional OLAP)** — stores data in **multidimensional arrays (cubes)**; very fast for pre-computed summaries, but wastes space for sparse data.
3. **HOLAP (hybrid OLAP)** — keeps detailed data in relational tables and aggregates in a MOLAP store.

### OLAP Operations

1. **Roll-up (drill-up)** — **summarizes** data by climbing up a hierarchy (for example, quarter → year, or city → country) or by removing a dimension.
2. **Drill-down** — the reverse of roll-up; gives **more detail** by stepping down a hierarchy (year → quarter → month) or adding a dimension.
3. **Slice** — selects **one value of one dimension**, giving a sub-cube (for example, Time = Q1).
4. **Dice** — selects values on **two or more dimensions**, giving a smaller sub-cube (for example, Time = Q1 or Q2 and Location = Dhaka or Sylhet).
5. **Pivot (rotate)** — **rotates the axes** of the view to present the data differently (for example, swapping Location and Time).

![A three-dimensional data cube of location, time and item, with the OLAP operations roll-up, drill-down, slice, dice and pivot](/diagrams/dbms/olap-cube.svg)

### Multidimensional Queries in SQL: ROLLUP and CUBE

SQL (since SQL:1999) extends GROUP BY for multidimensional aggregation:

1. **GROUP BY ROLLUP (A, B)** — computes aggregates for (A, B), for (A) and for the grand total ( ) — the subtotals of a **hierarchy**.
2. **GROUP BY CUBE (A, B)** — computes aggregates for **all combinations**: (A, B), (A), (B) and ( ).

In the result, NULL marks the dimension that has been summarized ("all").

**Example:** a table Sales(dept, year, amount) with the rows (CSE, 2024, 100), (CSE, 2025, 150), (EEE, 2024, 80), (EEE, 2025, 120).

```sql tab
SELECT dept, year, SUM(amount) AS total
FROM Sales
GROUP BY ROLLUP (dept, year);
```

```text tab=Output
dept  year  total
CSE   2024  100
CSE   2025  150
CSE   NULL  250
EEE   2024  80
EEE   2025  120
EEE   NULL  200
NULL  NULL  450
```

With **GROUP BY CUBE (dept, year)**, the result also contains the totals for each year over all departments: (NULL, 2024, **180**) and (NULL, 2025, **270**). (The order of rows can differ between DBMSs.)

## References {#references}

**TutorialsPoint**

- [Data Warehousing – OLAP](https://www.tutorialspoint.com/dwh/dwh_olap.htm) — accessed 2026-11-06 (ROLAP, MOLAP, HOLAP; roll-up, drill-down, slice, dice, pivot; OLAP vs OLTP). It describes slice as selecting "one particular dimension" and later "one or more dimensions"; slice fixes one dimension, dice two or more.
- [Data Warehousing – Schemas](https://www.tutorialspoint.com/dwh/dwh_schemas.htm) — accessed 2026-11-06 (star, snowflake and fact constellation schemas). TutorialsPoint's `database_security` and `sql-grant-revoke` pages return 404.

**GeeksforGeeks**

- [Database Design in DBMS](https://www.geeksforgeeks.org/dbms/database-design-in-dbms/) — accessed 2026-11-06 (life cycle, logical and physical design, goals)
- [SQL Performance Tuning](https://www.geeksforgeeks.org/sql/sql-performance-tuning/) — accessed 2026-11-06 (query rules, the WHERE vs HAVING example, index tuning). Its advice to "avoid SELECT DISTINCT" rewrites a query without DISTINCT, which changes the result when duplicates exist. GeeksforGeeks' `database-tuning` page returns 404.
- [Database Security](https://www.geeksforgeeks.org/dbms/database-security/) and [Control Methods of Database Security](https://www.geeksforgeeks.org/dbms/control-methods-of-database-security/) — accessed 2026-11-06 (CIA, threats, authentication, access, inference and flow control, statistical methods, encryption)
- [SQL Commands (DCL)](https://www.geeksforgeeks.org/sql/sql-ddl-dql-dml-dcl-tcl-commands/) — accessed 2026-11-06 (GRANT and REVOKE syntax with WITH GRANT OPTION and CASCADE)
- [SQL Injection](https://www.geeksforgeeks.org/sql/sql-injection/) — accessed 2026-11-06 (attack types and prevention)
- [OLAP Operations](https://www.geeksforgeeks.org/dbms/olap-operations-in-dbms/), [Data Warehousing](https://www.geeksforgeeks.org/dbms/data-warehousing/) and [Dimensional Data Modeling](https://www.geeksforgeeks.org/digital-logic/dimensional-data-modeling/) — accessed 2026-11-06

**TpointTech**

- [Database Security](https://www.tpointtech.com/database-security) — accessed 2026-11-06 (threats and best practices)

**IT Job QnS**

- IT Job QnS has no page on database design, tuning or security (checked 2026-11-06).

**Programiz**

- [SQL Injection](https://www.programiz.com/sql/injection) — accessed 2026-11-06 (always-true and multi-statement injection, prevention with validation, ORMs and prepared statements). Its prepared-statement example passes the SQL string to `mysqli_stmt_bind_param` instead of a prepared statement object.

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, and R. Elmasri and S. B. Navathe, *Fundamentals of Database Systems* — the phases of database design, levels of tuning, DAC, MAC (Bell–LaPadula) and RBAC, the authorization graph, roles and the SQL ROLLUP and CUBE operators (the ROLLUP and CUBE results above were calculated with a script)
