---
description: SQL - definition, history and features, DDL, DML, DQL, DCL and TCL commands, SELECT with WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions, joins, subqueries and views, DELETE vs TRUNCATE vs DROP; assertions and triggers with examples; and applications using SQL - embedded and dynamic SQL, stored procedures, cursors, ODBC/JDBC and a Python program.
updated: 2026-11-06
---

## SQL {#sql}

### Definition of SQL

SQL (**Structured Query Language**) is the **standard language for defining, manipulating, querying and controlling data** in relational databases.

It is used to create and change the structure of a database, to insert, update, delete and retrieve data, and to control access to it. It is a **declarative (non-procedural)** language: the user states **what** data is wanted, not how to find it. SQL is based on relational algebra and tuple relational calculus, and it is used in all relational DBMSs, such as MySQL, Oracle, SQL Server, PostgreSQL and SQLite.

### History of SQL

1. **1970** — E. F. Codd of IBM proposed the relational model.
2. **1974** — **Donald Chamberlin** and **Raymond Boyce** of IBM designed the language **SEQUEL** (Structured English Query Language) for IBM's **System R** project; it was later renamed **SQL**.
3. **1979** — Relational Software Inc. (now **Oracle**) released the first commercial SQL-based RDBMS.
4. **1986** — SQL became an **ANSI** standard, and in **1987** an **ISO** standard (SQL-86/87); later versions include SQL-92, SQL:1999 (triggers, recursive queries), SQL:2003 (XML) and newer revisions.
5. DBMS vendors add their own procedural extensions, such as **PL/SQL** (Oracle) and **T-SQL** (Microsoft SQL Server).

### Features of SQL

1. **Non-procedural (declarative)** and English-like, easy to learn.
2. **Standard** language supported by all relational DBMSs.
3. Works on **sets of rows** at a time.
4. **Not case-sensitive** for keywords; statements end with a semicolon.
5. Supports data definition, manipulation, querying, access control and transactions in **one language**.
6. Can be **embedded** in programming languages (C, Java, Python) and used to create views, stored procedures and triggers.

### Types of SQL Commands

SQL commands are divided into five categories:

1. **DDL (Data Definition Language)** — defines and changes the **structure (schema)** of database objects: **CREATE, ALTER, DROP, TRUNCATE, RENAME**. DDL statements are usually auto-committed.
2. **DML (Data Manipulation Language)** — changes the **data** in tables: **INSERT, UPDATE, DELETE**. DML changes can be committed or rolled back.
3. **DQL (Data Query Language)** — retrieves data: **SELECT**. (Many books include SELECT in DML.)
4. **DCL (Data Control Language)** — controls **access rights**: **GRANT, REVOKE**.
5. **TCL (Transaction Control Language)** — manages **transactions**: **COMMIT, ROLLBACK, SAVEPOINT**.

![SQL commands grouped into DDL, DML, DQL, DCL and TCL](/diagrams/dbms/sql-commands.svg)

### Common SQL Data Types

1. **INT / INTEGER**, **SMALLINT**, **BIGINT** — whole numbers.
2. **DECIMAL(p, s) / NUMERIC(p, s)** — exact numbers with p digits, s after the decimal point; for example DECIMAL(3,2) holds 3.75.
3. **FLOAT / REAL** — approximate floating-point numbers.
4. **CHAR(n)** — fixed-length string; **VARCHAR(n)** — variable-length string up to n characters.
5. **DATE**, **TIME**, **TIMESTAMP** — date and time values.
6. **BOOLEAN** — true or false.

### DDL Commands

```sql
-- CREATE: make a new table
CREATE TABLE Student (
    roll_no INT PRIMARY KEY,
    name    VARCHAR(30) NOT NULL,
    dept_id INT REFERENCES Department(dept_id),
    cgpa    DECIMAL(3,2) CHECK (cgpa BETWEEN 0 AND 4),
    city    VARCHAR(20)
);

-- ALTER: change the structure
ALTER TABLE Student ADD email VARCHAR(50);       -- add a column
ALTER TABLE Student DROP COLUMN email;           -- remove a column

-- TRUNCATE: delete all rows, keep the structure
TRUNCATE TABLE Student;

-- DROP: delete the whole table (structure and data)
DROP TABLE Student;
```

### DML Commands

```sql
INSERT INTO Student (roll_no, name, dept_id, cgpa, city)
VALUES (101, 'Rahim', 1, 3.75, 'Dhaka');

UPDATE Student SET cgpa = 3.50 WHERE roll_no = 104;   -- change data

DELETE FROM Student WHERE roll_no = 105;              -- remove rows
```

Without a WHERE clause, UPDATE and DELETE affect **all rows** of the table.

### DQL: the SELECT Statement

The general form of a query is:

```sql
SELECT   [DISTINCT] column_list        -- columns to show
FROM     table_list                    -- tables to use
WHERE    condition                     -- filter rows
GROUP BY column_list                   -- form groups
HAVING   group_condition               -- filter groups
ORDER BY column_list [ASC | DESC];     -- sort the result
```

The clauses are **written** in this order but **evaluated** in the order FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

The examples below use these two tables:

| roll_no | name | dept_id | cgpa | city |
| --- | --- | --- | --- | --- |
| 101 | Rahim | 1 | 3.75 | Dhaka |
| 102 | Karim | 2 | 3.40 | Khulna |
| 103 | Sumi | 1 | 3.90 | Dhaka |
| 104 | Nila | 3 | 3.20 | Sylhet |
| 105 | Rafi | 2 | 2.95 | Dhaka |
| 106 | Tania | NULL | 3.60 | Rajshahi |

| dept_id | dept_name |
| --- | --- |
| 1 | CSE |
| 2 | EEE |
| 3 | BBA |
| 4 | Physics |

#### WHERE and ORDER BY

```sql tab
SELECT name, cgpa FROM Student
WHERE cgpa >= 3.5
ORDER BY cgpa DESC;
```

```text tab=Output
name   cgpa
Sumi   3.9
Rahim  3.75
Tania  3.6
```

#### Operators in WHERE

1. **Comparison:** =, <> (or !=), <, >, <=, >=.
2. **Logical:** AND, OR, NOT.
3. **BETWEEN a AND b** — a value in a range (inclusive).
4. **IN (list)** — a value in a list.
5. **LIKE** — pattern matching: **%** matches any number of characters, **_** matches exactly one character.
6. **IS NULL / IS NOT NULL** — tests for NULL (= NULL does not work).

```sql tab
SELECT name FROM Student WHERE name LIKE 'R%';
SELECT name FROM Student WHERE city IN ('Dhaka', 'Sylhet') AND cgpa BETWEEN 3.0 AND 3.8;
SELECT name FROM Student WHERE dept_id IS NULL;
```

```text tab=Output
Query 1: Rahim, Rafi
Query 2: Rahim, Nila
Query 3: Tania
```

#### DISTINCT

```sql tab
SELECT DISTINCT city FROM Student ORDER BY city;
```

```text tab=Output
Dhaka
Khulna
Rajshahi
Sylhet
```

#### Aggregate Functions

The five standard aggregate functions are **COUNT, SUM, AVG, MAX and MIN**; they return one value from a set of rows (NULLs are ignored, except by COUNT(*)).

```sql tab
SELECT COUNT(*) AS total, ROUND(AVG(cgpa), 2) AS avg_cgpa,
       MAX(cgpa) AS highest, MIN(cgpa) AS lowest
FROM Student;
```

```text tab=Output
total  avg_cgpa  highest  lowest
6      3.47      3.9     2.95
```

#### GROUP BY and HAVING

**GROUP BY** groups rows with the same value, and an aggregate is calculated for each group; **HAVING** filters the groups.

```sql tab
SELECT dept_id, COUNT(*) AS students, ROUND(AVG(cgpa), 2) AS avg_cgpa
FROM Student
WHERE dept_id IS NOT NULL
GROUP BY dept_id
HAVING COUNT(*) >= 2;
```

```text tab=Output
dept_id  students  avg_cgpa
1        2         3.83
2        2         3.18
```

| Basis | WHERE | HAVING |
| --- | --- | --- |
| Filters | Individual rows | Groups |
| Applied | Before grouping | After GROUP BY |
| Aggregate functions | Cannot be used | Can be used |
| Used with | SELECT, UPDATE, DELETE | SELECT (with GROUP BY) |

### Joins

A join combines rows from two or more tables based on a related column.

1. **INNER JOIN** — only the rows that have matching values in both tables.
2. **LEFT (OUTER) JOIN** — all rows of the left table, with the matching rows of the right table (NULL where there is no match).
3. **RIGHT (OUTER) JOIN** — all rows of the right table, with the matching rows of the left table.
4. **FULL (OUTER) JOIN** — all rows of both tables (NULL where there is no match).
5. **CROSS JOIN** — the Cartesian product: every row of one table with every row of the other.
6. **SELF JOIN** — a table joined with itself (using two aliases).
7. **NATURAL JOIN** — an equi-join on all columns with the same name.

![SQL joins shown as Venn diagrams: inner, left, right and full outer join](/diagrams/dbms/sql-joins.svg)

```sql tab
SELECT s.name, d.dept_name
FROM Student s INNER JOIN Department d ON s.dept_id = d.dept_id;
```

```text tab=Output
name   dept_name
Rahim  CSE
Karim  EEE
Sumi   CSE
Nila   BBA
Rafi   EEE
```

```sql tab
SELECT s.name, d.dept_name
FROM Student s LEFT JOIN Department d ON s.dept_id = d.dept_id;
```

```text tab=Output
name   dept_name
Rahim  CSE
Karim  EEE
Sumi   CSE
Nila   BBA
Rafi   EEE
Tania  NULL
```

Tania appears in the LEFT JOIN with NULL because she has no department; the INNER JOIN leaves her out. A join from Department to Student in the other direction would also show **Physics** with NULL, because it has no students.

### Subquery

A subquery (nested query) is a query **inside another query**, written in **parentheses**; its result is used by the outer query.

```sql tab
SELECT name, cgpa FROM Student
WHERE cgpa > (SELECT AVG(cgpa) FROM Student);
```

```text tab=Output
name   cgpa
Rahim  3.75
Sumi   3.9
Tania  3.6
```

### View

A view is a **virtual table** defined by a stored query, which stores no data of its own.

Its rows come from the base tables each time it is used. Views simplify complex queries and give security by showing users only some columns or rows.

```sql tab
CREATE VIEW cse_students AS
SELECT roll_no, name, cgpa FROM Student WHERE dept_id = 1;

SELECT * FROM cse_students;
```

```text tab=Output
roll_no  name   cgpa
101      Rahim  3.75
103      Sumi   3.9
```

### Index

An index is a data structure (usually a B+ tree) built on one or more columns to **find rows faster**.

It works like the index of a book: `CREATE INDEX idx_name ON Student(name);`. It speeds up searching but slows down inserts and updates and uses extra space.

### DCL and TCL Commands

```sql
GRANT SELECT, UPDATE ON Student TO clerk;     -- give privileges
REVOKE UPDATE ON Student FROM clerk;          -- take them back

UPDATE Account SET balance = balance - 500 WHERE acc_no = 1;
SAVEPOINT after_debit;                        -- a point to roll back to
UPDATE Account SET balance = balance + 500 WHERE acc_no = 2;
COMMIT;                                       -- make the changes permanent
-- ROLLBACK;                                  -- or undo since the last COMMIT
-- ROLLBACK TO after_debit;                   -- or undo back to the savepoint
```

### DELETE vs TRUNCATE vs DROP

| Basis | DELETE | TRUNCATE | DROP |
| --- | --- | --- | --- |
| Removes | Selected rows (or all) | All rows | The whole table |
| WHERE clause | Can be used | Cannot be used | Not applicable |
| Table structure | Remains | Remains | Removed |
| Command type | DML | DDL | DDL |
| Speed | Slower (row by row, logged) | Faster | Fast |
| Rollback | Can be rolled back | Usually cannot (DBMS-dependent) | Usually cannot (DBMS-dependent) |
| Triggers | DELETE triggers fire | Do not fire | Do not fire |

### Advantages of SQL

1. Fast retrieval of large amounts of data.
2. No need to write procedural code for queries.
3. Standard language, portable across DBMSs.
4. Easy to learn and use.
5. Supports multiple views, security and transactions.

### Disadvantages of SQL

1. Each DBMS has its own dialect, so code is not fully portable.
2. Complex queries can be hard to write and optimize.
3. Some DBMSs and tools are costly.
4. Not suited to hierarchical or unstructured data.

## Assertions and Triggers {#assertions-and-triggers}

### Assertion

An assertion is a **database-wide integrity constraint** — a condition that the database must always satisfy, usually involving **more than one table**.

The DBMS checks it whenever any table in the condition is modified, and rejects any change that would make it false. It is defined with **CREATE ASSERTION** (part of the SQL standard).

```sql
CREATE ASSERTION assertion_name CHECK (condition);
```

**Example:** the total of all loans of a branch must be less than its assets (the condition is written with NOT EXISTS: "there is no branch for which this is false"):

```sql
CREATE ASSERTION loan_limit CHECK (
    NOT EXISTS (
        SELECT * FROM Branch b
        WHERE (SELECT SUM(amount) FROM Loan l
               WHERE l.branch_id = b.branch_id) >= b.assets
    )
);
```

Assertions are **rarely implemented** by commercial DBMSs (MySQL, Oracle, SQL Server and PostgreSQL do not support CREATE ASSERTION), because checking a condition over many tables on every change is expensive. The same rules are enforced with **CHECK constraints, triggers or application code**.

### Trigger

A trigger is a **stored program that the DBMS executes automatically** when a specified event (INSERT, UPDATE or DELETE) occurs on a table.

In some DBMSs, DDL and database events such as logon can also fire triggers. A trigger cannot be called directly. It follows the **ECA model: Event – Condition – Action**:

1. **Event** — the change that activates the trigger (for example, an UPDATE on Student).
2. **Condition** — an optional test; the trigger acts only if it is true.
3. **Action** — the SQL statements executed when the trigger fires.

#### General Syntax

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE}
ON table_name
[FOR EACH ROW]
[WHEN (condition)]
BEGIN
    -- statements; OLD.column and NEW.column give the old and new values
END;
```

#### Types of Triggers

1. **By timing:**
   - **BEFORE trigger** — runs before the change; used to **validate or modify** the new data.
   - **AFTER trigger** — runs after the change; used for **logging (audit), updating other tables** and derived values.
   - **INSTEAD OF trigger** — runs instead of the change; used to make **views** updatable.
2. **By level:**
   - **Row-level trigger** (FOR EACH ROW) — runs **once for every row** affected.
   - **Statement-level trigger** — runs **once for the whole statement**, however many rows are affected.
3. **By event:** INSERT, UPDATE and DELETE triggers (BEFORE/AFTER × INSERT/UPDATE/DELETE gives six combinations), and in some DBMSs DDL triggers (CREATE, ALTER, DROP) and database-event triggers (LOGON, STARTUP).

In a row-level trigger, **OLD** refers to the row before the change (UPDATE, DELETE) and **NEW** to the row after the change (INSERT, UPDATE).

#### Example 1: AFTER UPDATE Trigger (Audit Log)

This trigger records every change of a student's CGPA in a log table:

```sql tab
CREATE TABLE Cgpa_Log (roll_no INT, old_cgpa DECIMAL(3,2),
                       new_cgpa DECIMAL(3,2), changed_on DATE);

CREATE TRIGGER log_cgpa_change
AFTER UPDATE OF cgpa ON Student
FOR EACH ROW
WHEN (OLD.cgpa <> NEW.cgpa)
BEGIN
    INSERT INTO Cgpa_Log VALUES (OLD.roll_no, OLD.cgpa, NEW.cgpa, '2026-11-06');
END;

UPDATE Student SET cgpa = 3.80 WHERE roll_no = 101;
SELECT * FROM Cgpa_Log;
```

```text tab=Output
roll_no  old_cgpa  new_cgpa  changed_on
101      3.75      3.8      2026-11-06
```

#### Example 2: BEFORE INSERT Trigger (Validation)

```sql tab
CREATE TRIGGER check_name
BEFORE INSERT ON Student
FOR EACH ROW
WHEN (length(NEW.name) < 2)
BEGIN
    SELECT RAISE(ABORT, 'Name is too short');
END;

INSERT INTO Student VALUES (109, 'A', 1, 3.00, 'Dhaka');
```

```text tab=Output
Error: Name is too short
```

(The examples are in SQLite syntax; MySQL, Oracle and SQL Server use slightly different trigger syntax, for example `:NEW` in Oracle PL/SQL.)

#### Uses of Triggers

1. Enforcing complex **business rules and integrity constraints** that CHECK cannot express.
2. **Auditing** — keeping a log of changes.
3. Automatically **computing derived values** (for example, totals).
4. **Validating** data before it is stored.
5. **Replicating** data to other tables and preventing invalid transactions.

#### Disadvantages of Triggers

1. They run invisibly, so errors are **hard to find and debug**.
2. They add **overhead** to every insert, update and delete.
3. Triggers that fire other triggers (cascading) are hard to control.

### Assertion vs Trigger

| Basis | Assertion | Trigger |
| --- | --- | --- |
| Purpose | States a condition the database must always satisfy | Performs actions automatically when an event occurs |
| Scope | Whole database (any tables) | A specific table (or view) |
| Action | Only rejects violating changes | Can do any action: insert, update, log, reject |
| Written in | A declarative SQL condition | Procedural statements (BEGIN … END) |
| Event and timing | Checked on every change to the tables involved | Fires on a chosen event, BEFORE/AFTER |
| Support | Standard SQL, but rarely implemented | Supported by almost all DBMSs |

### Trigger vs Stored Procedure

| Basis | Trigger | Stored procedure |
| --- | --- | --- |
| Execution | Automatically, on an event | Explicitly, by a CALL/EXEC statement |
| Parameters | Cannot take parameters | Can take parameters |
| Return values | Cannot return values | Can return values / result sets |
| Transaction statements | Usually cannot use COMMIT/ROLLBACK | Can use them |

## Applications Using SQL {#applications-using-sql}

Application programs (for banking, reservations, e-commerce and so on) are written in a **host language** such as C, Java, C# or Python and use SQL to access the database. Because SQL works on **sets of rows** while programming languages work on **one variable or record at a time**, the two do not fit naturally; this is called the **impedance mismatch**, and it is solved with cursors and data-type conversion.

### Ways of Using SQL in Applications

1. **Embedded SQL** — SQL statements are written **directly inside a host-language program**, marked with `EXEC SQL … ;`. A **precompiler** replaces them with calls to the DBMS library before compilation. Host variables are used in SQL with a colon (`:roll`).
2. **Dynamic SQL** — the SQL statement is **built as a string at run time** and then prepared and executed (`PREPARE`, `EXECUTE`), so the query can depend on user input.
3. **Database APIs (call-level interfaces)** — the program calls library functions that send SQL to the DBMS:
   - **ODBC (Open Database Connectivity)** — Microsoft's standard API for accessing any database through a **driver**.
   - **JDBC (Java Database Connectivity)** — the standard API for Java programs.
   - **ADO.NET** for .NET, and **Python DB-API** modules (sqlite3, psycopg2, mysql-connector) for Python.
4. **Stored procedures and functions** — named blocks of SQL and procedural code **stored in the database** and called by applications (for example, `CALL transfer(1, 2, 500);`); written in **PL/SQL** (Oracle), **T-SQL** (SQL Server) or SQL/PSM.
5. **ORM frameworks** — map classes to tables and generate SQL automatically (Hibernate, Entity Framework, SQLAlchemy).

### Embedded SQL Example (C)

```c
EXEC SQL BEGIN DECLARE SECTION;
    int  roll;
    char name[31];
EXEC SQL END DECLARE SECTION;

roll = 101;
EXEC SQL SELECT name INTO :name FROM Student WHERE roll_no = :roll;
printf("%s\n", name);
```

### Cursor

A cursor is a **pointer to the result set of a query** that lets a program **process the rows one at a time**.

It is used when a query returns many rows. The steps are:

1. **DECLARE** the cursor for a SELECT statement.
2. **OPEN** the cursor (the query is executed).
3. **FETCH** rows one by one into host variables, in a loop.
4. **CLOSE** the cursor.

```sql
EXEC SQL DECLARE c1 CURSOR FOR
    SELECT name, cgpa FROM Student WHERE cgpa >= 3.5;
EXEC SQL OPEN c1;
EXEC SQL FETCH c1 INTO :name, :cgpa;     -- repeat until no more rows
EXEC SQL CLOSE c1;
```

### Stored Procedure Example (MySQL)

```sql
DELIMITER //
CREATE PROCEDURE top_students(IN min_cgpa DECIMAL(3,2))
BEGIN
    SELECT name, cgpa FROM Student WHERE cgpa >= min_cgpa ORDER BY cgpa DESC;
END //
DELIMITER ;

CALL top_students(3.5);
```

**Advantages of stored procedures:** reusable code, less network traffic (one call instead of many statements), better security (users get permission to run the procedure, not to the tables) and precompiled execution plans.

### Application Program Example (Python)

The program connects to a database, creates a table, inserts rows with a **parameterized query** and processes the result row by row:

```python tab
import sqlite3

con = sqlite3.connect("college.db")          # connect (creates the file if needed)
cur = con.cursor()

cur.execute("DROP TABLE IF EXISTS Student")
cur.execute("""CREATE TABLE Student (
                   roll_no INTEGER PRIMARY KEY,
                   name    TEXT NOT NULL,
                   cgpa    REAL)""")

students = [(101, "Rahim", 3.75), (102, "Karim", 3.40), (103, "Sumi", 3.90)]
cur.executemany("INSERT INTO Student VALUES (?, ?, ?)", students)   # parameterized
con.commit()                                  # make the changes permanent

min_cgpa = 3.5                                # value from the user / program
cur.execute("SELECT name, cgpa FROM Student WHERE cgpa >= ? ORDER BY cgpa DESC",
            (min_cgpa,))
for name, cgpa in cur.fetchall():             # process the result row by row
    print(name, cgpa)

con.close()
```

```text tab=Output
Sumi 3.9
Rahim 3.75
```

The `?` placeholders send the values separately from the SQL text; this prevents **SQL injection**, an attack in which input such as `' OR '1'='1` is joined into a query string to change its meaning.

### Steps of Database Access from a Program

1. **Load the driver** / import the database library.
2. **Open a connection** to the database (server, database name, user name and password).
3. **Create a statement** (or cursor) and **execute** the SQL query.
4. **Process the result set** row by row.
5. **Commit** (or roll back) the transaction.
6. **Close** the result set, statement and connection.

### Applications of SQL

1. Business applications — banking, accounting, inventory, payroll, ERP and CRM systems.
2. Websites and e-commerce — products, customers, orders and payments.
3. Reservation systems — airlines, railways, hotels.
4. Data analysis and reporting — summarizing data with GROUP BY, joins and views; data warehouses.
5. Mobile apps — local databases such as SQLite on phones.
6. Database administration — creating users, granting privileges, backup and tuning.

## References {#references}

**TutorialsPoint**

- [SQL – Overview](https://www.tutorialspoint.com/sql/sql-overview.htm) — accessed 2026-11-06 (definition, why SQL, history: 1974, ANSI 1986, ISO 1987, dialects). Its timeline gives 1986 for the first relational database from Relational Software (Oracle); Oracle's first commercial release was in 1979.
- [SQL – Syntax](https://www.tutorialspoint.com/sql/sql-syntax.htm) — accessed 2026-11-06 (statements, WHERE, IN, BETWEEN, LIKE, GROUP BY, HAVING, indexes). Its GROUP BY example is described as "average salary per age group", but the query groups by address and age and uses SUM.
- [SQL – Using Joins](https://www.tutorialspoint.com/sql/sql-using-joins.htm) — accessed 2026-11-06 (inner, left, right, full, self and cross joins with outputs)
- [PL/SQL – Triggers](https://www.tutorialspoint.com/plsql/plsql_triggers.htm) — accessed 2026-11-06 (trigger events, benefits, syntax, BEFORE/AFTER/INSTEAD OF, row and table level)

**GeeksforGeeks**

- [What is SQL](https://www.geeksforgeeks.org/sql/what-is-sql/) — accessed 2026-11-06 (working, components, rules, benefits, limitations)
- [SQL Commands: DDL, DQL, DML, DCL and TCL](https://www.geeksforgeeks.org/sql/sql-ddl-dql-dml-dcl-tcl-commands/) — accessed 2026-11-06
- [SQL Triggers](https://www.geeksforgeeks.org/sql/sql-trigger-student-database/) — accessed 2026-11-06 (definition, types, BEFORE vs AFTER). Its marks example is headed "BEFORE" but written as AFTER INSERT, and it mixes MySQL, Oracle and SQL Server syntax without saying so.
- [Difference between Assertions and Triggers](https://www.geeksforgeeks.org/dbms/difference-between-assertions-and-triggers-in-dbms/) — accessed 2026-11-06 (comparison). Its "assertion" example is a CHECK constraint, not CREATE ASSERTION, and it says that a trigger is called "by using the $ symbol"; triggers are fired automatically by their events.
- [Difference between DELETE, DROP and TRUNCATE](https://www.geeksforgeeks.org/sql/difference-between-delete-drop-and-truncate/) — accessed 2026-11-06
- [Impedance Mismatch in DBMS](https://www.geeksforgeeks.org/dbms/impedance-mismatch-in-dbms/) — accessed 2026-11-06. GeeksforGeeks' embedded-SQL page (`dbms/embedded-sql-in-dbms`) returns 404.

**TpointTech**

- [SQL Introduction](https://www.tpointtech.com/dbms-sql-introduction) — accessed 2026-11-06 (rules, components). Its query execution order puts JOIN after WHERE and SELECT after ORDER BY; the logical order is FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.
- [SQL Commands](https://www.tpointtech.com/dbms-sql-command) — accessed 2026-11-06 (DDL, DML, DCL and TCL with examples; it says "four types" but classifies SELECT under DML)
- [MySQL Trigger](https://www.tpointtech.com/mysql-trigger) — accessed 2026-11-06 (row and statement level, six trigger types, uses and limitations)
- [Relationship between ODBC, OLE DB and ADO](https://www.tpointtech.com/what-is-the-relationship-between-odbc-ole-db-and-ado) — accessed 2026-11-06

**Programiz**

- [SQL tutorial](https://www.programiz.com/sql), [SQL JOIN](https://www.programiz.com/sql/join), [GROUP BY](https://www.programiz.com/sql/group-by), [Views](https://www.programiz.com/sql/views) and [Stored Procedures](https://www.programiz.com/sql/stored-procedures) — accessed 2026-11-06

**Additional sources**

- D. D. Chamberlin and R. F. Boyce, "SEQUEL: A Structured English Query Language", *Proceedings of the ACM SIGFIDET Workshop*, 1974
- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapters on intermediate and advanced SQL — assertions, embedded and dynamic SQL, cursors, JDBC/ODBC (topics that the reference websites do not cover fully)

All SQL examples with output were run on SQLite 3 (Python `sqlite3` module); the Python program was run with Python 3.
