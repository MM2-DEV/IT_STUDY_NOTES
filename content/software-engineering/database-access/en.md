---
description: Database access from programs - object-relational mapping (ORM) and ORM tools, lambda expressions, Language Integrated Query (LINQ) with query and method syntax, and reading and writing data with ADO.NET DataReader and Command objects.
updated: 2026-11-04
---

## Object-Relational Mapping (ORM) {#object-relational-mapping-orm}

### Definition of ORM

Object-Relational Mapping (ORM) is a programming technique that **converts data between objects of an object-oriented language and tables of a relational database**.

An **ORM tool** (ORM framework) is the middleware that does this conversion automatically, so that the programmer works with classes and objects instead of writing SQL statements.

In ORM:

1. A **class** is mapped to a **table**.
2. A **property (attribute)** of the class is mapped to a **column**.
3. An **object** (instance) of the class is mapped to a **row** (record).
4. A **reference** between objects is mapped to a **foreign key**.

![ORM maps the Student class to the Students table: properties become columns and each object becomes a row](/diagrams/software-engineering/orm-mapping.svg)

### Need for ORM: the Object-Relational Mismatch

Objects and relational tables represent data in different ways. This difference is called the **object-relational impedance mismatch**. It has five parts:

1. **Granularity** — an object model may have more classes than the database has tables.
2. **Inheritance** — classes support inheritance, but relational databases have no inheritance.
3. **Identity** — a database identifies a row only by its primary key, while a language like Java has both object identity (`a == b`) and object equality (`a.equals(b)`).
4. **Associations** — objects are linked by **references**, but tables are linked by **foreign keys**.
5. **Navigation** — objects are reached by following references from object to object, while data in tables is reached with joins.

Without ORM, the programmer must write SQL and conversion code for every class by hand. ORM solves this mismatch automatically.

### How ORM Works

1. **Entity mapping** — each class (entity) is mapped to a table; the mapping is given as **metadata**, using annotations (for example, `@Entity`, `@Table`) or XML files.
2. **Relationship mapping** — one-to-one, one-to-many and many-to-many relationships between classes are converted into foreign keys.
3. **Data type mapping** — language data types (for example, `string`, `int`) are converted to database types (for example, `VARCHAR`, `INT`).
4. **CRUD operations** — when the program creates, reads, updates or deletes an object, the ORM generates and runs the matching SQL (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).
5. **Object-oriented query language** — queries are written against classes and properties, for example **HQL** (Hibernate Query Language), **JPQL** (Java Persistence Query Language) or **LINQ** (in .NET).

### Components of an ORM Solution

1. **CRUD API** — operations to create, read, update and delete objects of persistent classes.
2. **Query language or API** — to write queries that refer to classes and their properties.
3. **Mapping metadata** — a way to specify how classes map to tables.
4. **Transactional object handling** — features such as dirty checking (finding changed objects), lazy loading (fetching related objects only when needed) and caching.

### Examples of ORM Tools

1. **Hibernate** (Java) — the most popular open-source Java ORM; implements the **JPA (Java Persistence API)** specification and uses **HQL**.
2. **EclipseLink** (Java) — open-source ORM from the Eclipse Foundation, based on Oracle **TopLink**; the reference implementation of JPA.
3. **TopLink** (Java) — Oracle's ORM tool.
4. **Apache OpenJPA** (Java) — an implementation of JPA from the Apache Software Foundation.
5. **MyBatis** (formerly iBatis, Java) — maps SQL statements and their results to objects; the programmer still writes the SQL.
6. **Entity Framework (EF / EF Core)** (C#, .NET) — Microsoft's ORM; queries are written with LINQ.
7. **NHibernate** (.NET) — the .NET version of Hibernate.
8. **Django ORM** and **SQLAlchemy** (Python).

### Example of ORM (Entity Framework Core, C#)

The class below is mapped to a `Students` table. The program saves and loads objects without writing any SQL:

```csharp
public class Student            // mapped to the table "Students"
{
    public int Id { get; set; }        // primary key column
    public string Name { get; set; }   // column "Name"
    public double Cgpa { get; set; }   // column "Cgpa"
}

public class SchoolContext : DbContext
{
    public DbSet<Student> Students { get; set; }   // the table
}

// Saving an object: EF generates INSERT INTO Students ...
using var db = new SchoolContext();
db.Students.Add(new Student { Name = "Rahim", Cgpa = 3.75 });
db.SaveChanges();

// Loading objects: EF generates SELECT ... WHERE Cgpa >= 3.5
var good = db.Students.Where(s => s.Cgpa >= 3.5).ToList();
```

The database provider and connection string are configured separately in the `DbContext`.

### Advantages of ORM

1. **Less code and faster development** — no repetitive SQL and conversion (boilerplate) code.
2. **Object-oriented development** — business code works with objects, not tables and SQL.
3. **Database independence (portability)** — the same code can work with different databases with few changes.
4. **Easier maintenance** — changes in the database schema are handled mostly in the mapping.
5. **Transaction management** and **automatic primary key generation**.
6. **Better performance through caching** and lazy loading.
7. **Protection against SQL injection** — ORMs build parameterized queries instead of joining strings.

### Disadvantages of ORM

1. **Slower for complex queries** — highly complex queries can run faster in hand-written (native) SQL.
2. **Unnecessary for small applications** — a simple direct database connection (for example, JDBC or ADO.NET) is enough.
3. **Hidden SQL** — because the generated SQL is hidden, a careless programmer may cause inefficient queries (for example, one query per object).
4. **Learning curve** — the ORM framework itself must be learned and configured.

## Lambda Expressions {#lambda-expressions}

### Definition of Lambda Expression

A lambda expression is an **anonymous function** (a function without a name) that is written **inline** where it is needed.

It can be stored in a variable or passed as an argument to a method. It takes input parameters and returns a value. In C#, lambda expressions were introduced in **C# 3.0** (2007), together with LINQ.

### Syntax of Lambda Expression

```text
(input parameters) => expression
(input parameters) => { statements }
```

1. **Input parameters** — the values the lambda receives, written on the left side. Parentheses can be left out when there is exactly one parameter (`x => x * x`).
2. **Lambda operator `=>`** — read as "goes to"; separates the parameters from the body.
3. **Body** — on the right side; an expression or a block of statements that uses the parameters.

For example, `x => x + 10` takes `x` and returns `x + 10`.

### Types of Lambda Expressions

There are two types of lambda expressions:

1. **Expression lambda** — the body is a **single expression**; its value is returned automatically, without a `return` statement.
2. **Statement lambda** — the body is a **block of one or more statements** inside braces `{ }`; it must use `return` to return a value.

```csharp
Func<int, int> square = x => x * x;              // expression lambda
Func<int, int, int> add = (a, b) =>              // statement lambda
{
    int total = a + b;
    return total;
};

Console.WriteLine(square(5));   // 25
Console.WriteLine(add(5, 6));   // 11
```

### Lambda Expressions and Delegates

A lambda expression is assigned to a **delegate** type (a type that refers to a method). C# has three common built-in delegate types for lambdas:

1. **`Func<T, TResult>`** — takes zero or more inputs and **returns a value**; the last type parameter is the return type (`Func<int, int, int>` takes two `int`s and returns an `int`).
2. **`Action<T>`** — takes inputs and **returns nothing** (`void`), for example `Action<string> greet = name => Console.WriteLine("Hello " + name);`.
3. **`Predicate<T>`** — takes one input and **returns `bool`**, for example `Predicate<int> isEven = n => n % 2 == 0;`.

Before lambdas, C# 2.0 used **anonymous methods** written with the `delegate` keyword: `delegate (int x) { return x * x; }`. Lambda expressions are a shorter way of writing them.

A lambda can use variables of the method in which it is written; this is called **capturing** the variables (a **closure**).

### Lambda Expressions in LINQ

Lambda expressions are used most often as arguments of LINQ methods, to give the condition, key or transformation:

```csharp
List<int> numbers = new List<int> { 6, 7, 12, 15, 9 };

var squares = numbers.Select(x => x * x);            // transform each item
var divisibleBy3 = numbers.Where(x => x % 3 == 0);   // filter

Console.WriteLine("Squares: " + string.Join(", ", squares));
Console.WriteLine("Divisible by 3: " + string.Join(", ", divisibleBy3));
```

```text
Squares: 36, 49, 144, 225, 81
Divisible by 3: 6, 12, 15, 9
```

### Lambda Expressions in Other Languages

| Language | Syntax | Example |
| --- | --- | --- |
| C# (3.0) | `(parameters) => expression` | `x => x * x` |
| Java (8) | `(parameters) -> expression` | `x -> x * x` (implements a functional interface) |
| Python | `lambda parameters: expression` | `lambda x: x * x` |
| C++ (C++11) | `[capture](parameters) { body }` | `[](int x) { return x * x; }` |

### Advantages of Lambda Expressions

1. **Concise code** — a short function is written in one line, without declaring a separate named method.
2. **Readability** — the logic is written exactly where it is used.
3. **Easy use with LINQ and collections** — filtering, sorting and transforming data become simple.
4. **Can be passed as arguments** to methods and stored in variables.
5. **Can capture variables** from the enclosing method.

## Language Integrated Query (LINQ) {#language-integrated-query-linq}

### Definition of LINQ

LINQ (Language Integrated Query) is a feature of **.NET languages** that adds **SQL-like query capabilities directly into the programming language**.

With one common syntax, data from collections, arrays, XML, databases and DataSets can be queried. It was designed by **Anders Hejlsberg** and introduced in **C# 3.0, .NET Framework 3.5 and Visual Studio 2008**. Its standard query operators are in the **`System.Linq`** namespace.

### Need for LINQ

1. Before LINQ, a program had to use a different language for each data source — SQL for databases, XPath/XQuery for XML, and loops for collections.
2. Database access needed a lot of code (open a connection, create a command, run a reader), and the SQL was written as plain strings that the compiler could not check.
3. LINQ gives one syntax for all data sources, checked by the compiler, with much less code.

### Types of LINQ

The types of LINQ (LINQ providers) are:

1. **LINQ to Objects** — queries in-memory collections and arrays (`List<T>`, arrays and any `IEnumerable<T>`).
2. **LINQ to XML (XLINQ)** — queries and creates XML documents.
3. **LINQ to DataSet** — queries ADO.NET DataSets and DataTables.
4. **LINQ to SQL (DLINQ)** — queries Microsoft SQL Server databases.
5. **LINQ to Entities** — queries databases through **Entity Framework** (the ORM).
6. **PLINQ (Parallel LINQ)** — runs LINQ to Objects queries in parallel on several processor cores.

LINQ to SQL, LINQ to DataSet and LINQ to Entities together are also called **LINQ to ADO.NET**.

### Architecture of LINQ

LINQ has three layers:

1. **Language layer (top)** — the .NET languages C# and VB.NET with their query syntax.
2. **LINQ providers (middle)** — LINQ to Objects, LINQ to XML, LINQ to DataSet, LINQ to SQL and LINQ to Entities, which convert the query for each data source.
3. **Data sources (bottom)** — objects, XML documents and relational databases. Collections expose the **`IEnumerable<T>`** interface (queried in memory by the `Enumerable` class), and remote sources such as databases expose **`IQueryable<T>`** (queried through the `Queryable` class, which converts the query into SQL).

### LINQ Syntax

A LINQ query can be written in two ways:

1. **Query syntax** (query expression or comprehension syntax) — SQL-like; it starts with `from` and ends with `select` or `group`.
2. **Method syntax** (fluent or lambda syntax) — calls extension methods such as `Where()`, `Select()` and `OrderBy()`, with **lambda expressions** as arguments.

The compiler converts query syntax into method syntax, so both give the same result. Some operators (for example, `Count()`, `Max()`, `First()`, `ToList()`) have no query keyword and are always called as methods.

#### Clauses of Query Syntax

1. **`from`** — gives the data source and a range variable.
2. **`where`** — filters elements by a condition.
3. **`select`** — chooses the values to return.
4. **`orderby`** — sorts (`ascending` or `descending`).
5. **`group … by`** — groups elements by a key.
6. **`join … on … equals`** — combines two sources on matching keys.
7. **`let`** — stores an intermediate value.
8. **`into`** — continues the query after a `group`, `join` or `select`.

#### Standard Query Operators

| Category | Operators |
| --- | --- |
| Filtering | `Where`, `OfType` |
| Projection | `Select`, `SelectMany` |
| Sorting | `OrderBy`, `OrderByDescending`, `ThenBy`, `Reverse` |
| Grouping | `GroupBy` |
| Joining | `Join`, `GroupJoin` |
| Aggregation | `Count`, `Sum`, `Min`, `Max`, `Average`, `Aggregate` |
| Element | `First`, `FirstOrDefault`, `Last`, `Single`, `ElementAt` |
| Set | `Distinct`, `Union`, `Intersect`, `Except` |
| Partitioning | `Take`, `Skip`, `TakeWhile`, `SkipWhile` |
| Quantifier | `Any`, `All`, `Contains` |
| Conversion | `ToList`, `ToArray`, `ToDictionary` |

### Steps to Write a LINQ Query

1. Add the namespace `using System.Linq;`.
2. Create (or connect to) the data source.
3. Write the query.
4. Execute the query, usually with a `foreach` loop.

### Example of LINQ

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

class Student
{
    public string Name { get; set; }
    public double Cgpa { get; set; }
}

class Program
{
    static void Main()
    {
        int[] scores = { 97, 92, 81, 60 };

        // Query syntax
        var high = from s in scores
                   where s > 80
                   select s;

        // Method syntax (same query)
        var high2 = scores.Where(s => s > 80);

        foreach (int s in high)
            Console.Write(s + " ");
        Console.WriteLine();

        Console.WriteLine("Count: " + high2.Count());
        Console.WriteLine("Sum: " + scores.Sum() + ", Max: " + scores.Max()
                          + ", Average: " + scores.Average());

        var students = new List<Student>
        {
            new Student { Name = "Rahim", Cgpa = 3.75 },
            new Student { Name = "Karim", Cgpa = 3.40 },
            new Student { Name = "Sumi",  Cgpa = 3.90 },
            new Student { Name = "Nila",  Cgpa = 3.55 }
        };

        // Students with CGPA of at least 3.5, highest first
        var top = from st in students
                  where st.Cgpa >= 3.5
                  orderby st.Cgpa descending
                  select st.Name;

        Console.WriteLine(string.Join(", ", top));
    }
}
```

```text
97 92 81
Count: 3
Sum: 330, Max: 97, Average: 82.5
Sumi, Rahim, Nila
```

### Deferred and Immediate Execution

1. **Deferred execution** — a query such as `Where` or `Select` is **not run when it is written**; it runs only when its result is enumerated (for example, in a `foreach` loop). So the query always uses the current data.
2. **Immediate execution** — operators that return a single value or a new collection (`Count()`, `Sum()`, `Max()`, `First()`, `ToList()`, `ToArray()`) run the query at once.

### Advantages of LINQ

1. **One syntax for all data sources** — no need to learn a separate query language for each data source.
2. **Compile-time type checking** — errors in a query are found when the program is compiled, not at run time.
3. **IntelliSense support** in Visual Studio while writing queries.
4. **Less code and faster development**; queries are short and readable.
5. **Easy debugging** with the .NET debugger, because queries are part of the C# code.
6. **Easy filtering, sorting, grouping and joining**, including joins of several data sources in one query.
7. **Easy conversion of data**, for example from SQL data to XML.
8. **Reusable queries.**

### Disadvantages of LINQ

1. A LINQ query to a database can be **slower than a stored procedure**, which has a precompiled, fixed execution plan.
2. The SQL generated by LINQ to SQL or LINQ to Entities is hidden and may be less efficient than hand-written SQL.
3. It is available only in .NET languages.

## Data Reader and Writer {#data-reader-and-writer}

**ADO.NET** (ActiveX Data Objects for .NET) is the data-access technology of the .NET Framework, through which programs read data from and write data to a database.

Its main classes for SQL Server are in the `System.Data.SqlClient` namespace (`Microsoft.Data.SqlClient` in newer .NET).

### Components of ADO.NET

1. **Connection** (`SqlConnection`) — opens a connection to the database.
2. **Command** (`SqlCommand`) — holds an SQL statement or stored procedure and runs it on the database.
3. **DataReader** (`SqlDataReader`) — reads the result of a query **row by row**, forward-only and read-only, while the connection is open.
4. **DataAdapter** (`SqlDataAdapter`) — a bridge between the database and a DataSet: it **fills** the DataSet with data and **updates** the database with the changes made in the DataSet.
5. **DataSet** — an **in-memory, disconnected** copy of data, containing DataTables (with DataRows and DataColumns) and the relations between them.

![ADO.NET: the application opens a Connection, and a Command reads rows through a DataReader or writes data with ExecuteNonQuery](/diagrams/software-engineering/ado-net-reader-writer.svg)

### Data Reader

A DataReader (`SqlDataReader` for SQL Server) is an ADO.NET object that reads data from a database as a **forward-only, read-only stream of rows**, one row at a time, over an **open (connected) connection**. It is created by calling the **`ExecuteReader()`** method of a Command object; it cannot be created with `new`.

#### Characteristics of the DataReader

1. **Forward-only** — rows are read from the first to the last; it cannot move back.
2. **Read-only** — data cannot be changed through it.
3. **Connected** — the connection must stay open while the reader is used.
4. **Fast and uses little memory** — only one row is in memory at a time, so it is faster than a DataSet.
5. `SqlDataReader` is a **sealed** class (it cannot be inherited).

#### Important Members of the DataReader

| Member | Purpose |
| --- | --- |
| `Read()` | Moves to the next row; returns `false` when there are no more rows |
| `HasRows` | Tells whether the result contains at least one row |
| `FieldCount` | The number of columns in the current row |
| `reader["Name"]` or `reader[0]` | The value of a column, by name or by position |
| `GetString(i)`, `GetInt32(i)`, `GetDouble(i)` | The value of column `i` as a given type |
| `GetName(i)` | The name of column `i` |
| `NextResult()` | Moves to the next result set when several queries were run |
| `IsClosed` | Tells whether the reader is closed |
| `Close()` | Closes the reader |

#### Example: Reading Data with a DataReader

```csharp
using System;
using System.Data.SqlClient;

class ReadStudents
{
    static void Main()
    {
        string connectionString = "<YOUR_CONNECTION_STRING>";   // placeholder

        using (SqlConnection con = new SqlConnection(connectionString))
        {
            SqlCommand cmd = new SqlCommand("SELECT Id, Name, Cgpa FROM Students", con);
            con.Open();

            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())          // one row at a time
                {
                    Console.WriteLine(reader["Id"] + " " + reader["Name"] + " " + reader["Cgpa"]);
                }
            }
        }   // the using blocks close the reader and the connection
    }
}
```

### Data Writer: Writing Data with a Command

ADO.NET has no separate "DataWriter" class for databases. Data is **written** (inserted, updated or deleted) in two ways:

1. **Directly, with a Command object** — the SQL `INSERT`, `UPDATE` or `DELETE` statement is run with **`ExecuteNonQuery()`**, which returns the **number of rows affected**.
2. **Through a DataAdapter and DataSet** — rows are added, changed or deleted in the DataSet in memory, and then **`DataAdapter.Update()`** writes all the changes to the database.

#### Execute Methods of the Command Object

| Method | Used for | Returns |
| --- | --- | --- |
| `ExecuteReader()` | `SELECT` queries that return rows | A DataReader |
| `ExecuteNonQuery()` | `INSERT`, `UPDATE`, `DELETE` and DDL statements | The number of rows affected (`int`); −1 for other statements |
| `ExecuteScalar()` | Queries that return one value (for example, `SELECT COUNT(*)`) | The first column of the first row |
| `ExecuteXmlReader()` | Queries that return XML | An `XmlReader` |

#### Example: Writing Data with ExecuteNonQuery

```csharp
using (SqlConnection con = new SqlConnection(connectionString))
{
    SqlCommand cmd = new SqlCommand(
        "INSERT INTO Students (Name, Cgpa) VALUES (@name, @cgpa)", con);
    cmd.Parameters.AddWithValue("@name", "Karim");     // parameters prevent SQL injection
    cmd.Parameters.AddWithValue("@cgpa", 3.40);

    con.Open();
    int rows = cmd.ExecuteNonQuery();
    Console.WriteLine(rows + " row(s) inserted");     // 1 row(s) inserted
}
```

Values are passed with **parameters** (`@name`, `@cgpa`) instead of being joined into the SQL string; this protects the program from **SQL injection**.

### Connected vs Disconnected Architecture

1. **Connected architecture** — the program keeps the connection open while it works with the data; it uses **Connection, Command and DataReader**. It is fast, but the connection is held for the whole time.
2. **Disconnected architecture** — the **DataAdapter** opens the connection, fills a **DataSet** and closes the connection; the program works on the data in memory and reconnects only to save the changes with `Update()`. It is more scalable, because connections are not held for long.

### DataReader vs DataSet

| Basis | DataReader | DataSet |
| --- | --- | --- |
| Architecture | Connected (needs an open connection) | Disconnected (works without a connection) |
| Access | Forward-only, read-only | Random access in any direction; data can be changed |
| Data held | One row at a time | Many tables, with their relations, in memory |
| Speed and memory | Faster; less memory | Slower; more memory |
| Created by | `Command.ExecuteReader()` | Filled by a `DataAdapter` (`Fill()`) |
| Updating the database | Not possible | Possible, with `DataAdapter.Update()` |
| Best for | Quickly displaying read-only data | Working with data offline, editing and passing data between tiers |

## References {#references}

**TutorialsPoint**

- [Hibernate – ORM Overview](https://www.tutorialspoint.com/hibernate/orm_overview.htm) — accessed 2026-11-04 (definition of ORM, the five mismatch problems, components of an ORM solution, advantages, Java ORM frameworks)
- [LINQ – Overview](https://www.tutorialspoint.com/linq/linq_overview.htm) — accessed 2026-11-04 (definition, history, types of LINQ, syntax, architecture, need, advantages, LINQ vs stored procedures). This page puts the standard query operators in a `System.Query` namespace; the correct namespace is `System.Linq` (cross-checked with TpointTech and GeeksforGeeks).
- [ASP.NET – ADO.NET](https://www.tutorialspoint.com/asp.net/asp.net_ado_net.htm) — accessed 2026-11-04 (DataSet, DataTable, DataRow, DataAdapter, DataReader, connection and command)
- [VB.Net – Database Access](https://www.tutorialspoint.com/vb.net/vb.net_database_access.htm) — accessed 2026-11-04 (connected and disconnected access, DataSet updates through the DataAdapter)

**GeeksforGeeks**

- [What is Object-Relational Mapping (ORM) in DBMS?](https://www.geeksforgeeks.org/dbms/what-is-object-relational-mapping-orm-in-dbms/) — accessed 2026-11-04 (how ORM works, advantages)
- [Lambda Expressions in C#](https://www.geeksforgeeks.org/c-sharp/lambda-expressions-in-c-sharp/) — accessed 2026-11-04 (definition, syntax, types, examples with LINQ, advantages)
- [LINQ Query Syntax](https://www.geeksforgeeks.org/c-sharp/linq-query-syntax/) — accessed 2026-11-04 (query clauses, query vs method syntax, advantages)
- [Introduction to ADO.NET](https://www.geeksforgeeks.org/software-engineering/introduction-to-ado-net/) — accessed 2026-11-04 (architecture, connected and disconnected modes, advantages)

**TpointTech**

- [ORM Tools in Java](https://www.tpointtech.com/orm-tools-in-java) — accessed 2026-11-04 (ORM tools, advantages, when not to use ORM)
- [LINQ Introduction](https://www.tpointtech.com/what-is-linq) — accessed 2026-11-04 (definition, Enumerable and Queryable, syntax, steps, advantages)
- [LINQ Lambda Expression Syntax](https://www.tpointtech.com/linq-lambda-expression-syntax) — accessed 2026-11-04 (the `=>` operator)
- [ADO.Net DataReader](https://www.tpointtech.com/ado-net-datareader) — accessed 2026-11-04 (SqlDataReader definition, properties, methods, example)
- [ADO.Net Command](https://www.tpointtech.com/ado-net-command) — accessed 2026-11-04 (SqlCommand constructors and methods; this page's method table leaves out `ExecuteNonQuery()`, which is taken from Microsoft's documentation below)

**Programiz**

- [C# Lambda Expression](https://www.programiz.com/csharp-programming/lambda-expression) — accessed 2026-11-04 (expression and statement lambdas, use with delegates and as method arguments)
- [Java Lambda Expressions](https://www.programiz.com/java-programming/lambda-expression), [Python Lambda Function](https://www.programiz.com/python-programming/anonymous-function) and [C++ Lambda](https://www.programiz.com/cpp-programming/lambda-expression) — accessed 2026-11-04 (lambda syntax in other languages)
- [SQL Injection](https://www.programiz.com/sql/injection) — accessed 2026-11-04 (ORMs and parameterized queries against SQL injection)
- Programiz has no page on LINQ or on ADO.NET readers and writers (checked 2026-11-04).

**Additional sources** (for `ExecuteNonQuery()`, `DataAdapter.Update()` and deferred execution, which the reference websites do not cover fully)

- Microsoft Learn, [SqlCommand.ExecuteNonQuery Method](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.executenonquery)
- Microsoft Learn, [Updating Data Sources with DataAdapters](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/updating-data-sources-with-dataadapters)
- Microsoft Learn, [Introduction to LINQ Queries (C#)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries) — deferred and immediate execution
