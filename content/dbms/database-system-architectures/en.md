---
description: Database system architectures - centralized and client-server systems (1-tier, 2-tier, 3-tier), server system architectures (transaction servers and data servers), parallel systems (speedup, scaleup, shared memory, shared disk, shared nothing, hierarchical), distributed systems, and network types (LAN, WAN, SAN).
updated: 2026-11-06
---

## Centralized and Client-Server Systems {#centralized-and-client-server-systems}

### Centralized Database System

A centralized database system is a database system that **runs on a single computer** at **one location**, without interacting with other computers.

Earlier, mainframes did all the processing and users worked on **terminals** with only display capability; today a centralized system can be a single PC or a large server.

1. **Single-user system** — used by one user at a time (for example, a desktop database); it has little concurrency control and simple recovery.
2. **Multi-user system** — serves many users, connected through terminals or a network, from one central computer.

**Advantages:** easy to manage, secure and consistent (one copy of data), simple backup. **Disadvantages:** a single point of failure, a performance bottleneck as users grow, and slow access for distant users.

### Client-Server System

In a client-server system, the work is divided between **server systems**, which store the database and **process requests**, and **client systems**, usually PCs or workstations, which provide the **user interface** and send requests to the server over a network. The DBMS functions are split into a **front end** (forms, report writers, GUI on the client) and a **back end** (query evaluation, optimization, concurrency control and recovery on the server); they communicate through an interface such as **SQL** with **ODBC** or **JDBC**.

**Advantages:** central control of data, better functionality for the cost, flexibility in expanding the system, and easier maintenance of the user interface.

### Tiers of Client-Server Architecture

1. **1-tier (single-tier) architecture** — the client, the application and the database are on the **same machine**; the user works directly on the DBMS (for example, a local Microsoft Access database). Simple and cheap, but single-user and not shareable.
2. **2-tier architecture** — the **client** runs the user interface and the application programs and communicates **directly with the database server** through ODBC/JDBC (for example, a desktop library system connected to a database server). Simple and fast for small numbers of users, but hard to scale, and changes to application logic must be installed on every client.
3. **3-tier architecture** — an **application server** (middle tier) lies between the client and the database server:
   - **Presentation (client) tier** — the user interface, usually a web browser.
   - **Application (middle) tier** — the business logic; it receives requests from clients and accesses the database.
   - **Database (data) tier** — the DBMS and the database.

   It is the most widely used architecture (for example, web applications): it is scalable, more secure (clients never access the database directly), and easier to maintain, but more complex and costly. Extending it to more layers gives an **n-tier architecture**.

![Two-tier architecture with the client talking directly to the database server, and three-tier architecture with an application server in between](/diagrams/dbms/client-server-tiers.svg)

| Basis | 2-tier | 3-tier |
| --- | --- | --- |
| Layers | Client and database server | Client, application server and database server |
| Business logic | On the client (or in the database) | On the application server |
| Client access to database | Direct | Through the application server |
| Scalability | Limited | High |
| Security | Lower | Higher |
| Maintenance | Harder (logic on every client) | Easier (logic in one place) |
| Example | Desktop application connected to a database | Web application |

## Server System Architectures {#server-system-architectures}

Server systems are of two broad kinds:

1. **Transaction servers (query servers)** — clients send requests (SQL queries or remote procedure calls); the server executes them and returns the **results**. Used by relational databases.
2. **Data servers** — clients request **data items (pages or objects)**, process them locally and send them back; the server only supplies and stores data. Used in object-oriented databases and file servers.

### Transaction Server Process Structure

A typical transaction server consists of several processes that access data in **shared memory**:

1. **Server processes** — receive user queries (transactions), execute them and send back the results; there may be many (one per client or a pool).
2. **Lock manager process** — implements lock management (granting, releasing and deadlock detection).
3. **Database writer process** — outputs modified buffer blocks to disk continually.
4. **Log writer process** — outputs log records from the log buffer to stable storage.
5. **Checkpoint process** — performs periodic checkpoints.
6. **Process monitor process** — monitors other processes and starts recovery actions (aborting transactions, restarting processes) if one fails.

**Shared memory** contains the **buffer pool**, the **lock table**, the **log buffer** and cached query plans, and is accessed by all server processes using semaphores (mutual exclusion) for safety.

### Data Servers

Data servers are used on LANs with fast connections and powerful clients:

1. **Page shipping vs item (data) shipping** — the server can send whole **pages** (which also bring nearby items the client may need — prefetching) or single **items** (fewer unneeded data, more messages).
2. **Locking** — locks are granted by the server for the items or pages shipped; with page shipping, a lock on a page covers all its items.
3. **Data caching** — the client keeps data in its cache after a transaction, but must check with the server that the cached data is still up to date before using it (**cache coherency**).
4. **Lock caching** — the client keeps locks it is likely to need again; the server calls back locks when other clients need them.

## Parallel Systems {#parallel-systems}

### Definition of Parallel System

A parallel database system is a database system that **uses many processors and disks working in parallel** to improve throughput and response time.

**Throughput** is the number of tasks completed per unit time, and **response time** is the time to complete a single task. It is used for very large databases (terabytes) and very high transaction rates.

1. **Coarse-grain parallel machine** — a small number of powerful processors.
2. **Massively parallel (fine-grain) machine** — thousands of smaller processors.

### Speedup and Scaleup

The two main measures of a parallel system are:

1. **Speedup** — running a **given task in less time** by increasing the degree of parallelism (more processors and disks).

> **Speedup = T_S ÷ T_L**

where T_S is the execution time on the smaller system and T_L on the larger system that is **N times larger**. The speedup is **linear** if it equals N, and **sublinear** if it is less than N.

2. **Scaleup** — handling **a larger task in the same time** by increasing the degree of parallelism in proportion.

> **Scaleup = T_S ÷ T_L**

where T_S is the time of a task Q on the smaller machine M_S, and T_L is the time of a task N times larger on a machine M_L that is N times larger. The scaleup is **linear** if it equals 1 (the same time), and **sublinear** if it is less than 1.

**Worked examples:**

1. A query takes 100 seconds on 1 processor and 25 seconds on 5 processors: speedup = 100 ÷ 25 = **4**, which is **sublinear** (linear would be 5).
2. A job takes 10 seconds on 1 processor; a job 10 times larger takes 12 seconds on 10 processors: scaleup = 10 ÷ 12 ≈ **0.83**, which is **sublinear** (linear would be 1).

Two kinds of scaleup are measured: **batch scaleup** (the size of a single large task grows) and **transaction scaleup** (the number of small transactions grows).

### Factors Limiting Speedup and Scaleup

1. **Startup costs** — the time to start many processes can dominate a short task.
2. **Interference** — processes compete for shared resources (bus, disks, locks) and wait for one another.
3. **Skew** — the work cannot be divided into exactly equal parts, so the slowest part determines the total time.

### Interconnection Networks

1. **Bus** — all components share one communication bus; simple, but does not scale beyond a few processors.
2. **Mesh** — components are arranged in a grid, each connected to its neighbours.
3. **Hypercube** — n components are connected as the corners of a log₂ n-dimensional cube; any two are at most log₂ n links apart.

### Parallel Database Architectures

1. **Shared memory** — all processors share a **common memory** (and the disks) over a bus or network. Communication between processors is very fast, but the bus becomes a bottleneck, so it does not scale beyond a moderate number of processors. Used in symmetric multiprocessors (SMP).
2. **Shared disk** — each processor has its **own memory**, but all processors can **access all the disks** through an interconnection network. It is fault-tolerant (if a processor fails, others take over its work) and the memory bus is not a bottleneck, but the connection to the disk subsystem becomes a bottleneck, and a distributed lock manager is needed. Example: Oracle RAC.
3. **Shared nothing** — each node has its **own processor, memory and disks**, and nodes communicate only through the network; the data is partitioned among the nodes. It scales to **thousands of processors** (near-linear scalability), but communication and access to non-local data are costly. Used in massively parallel (MPP) systems and most large data warehouses.
4. **Hierarchical** — combines the others: nodes that do not share memory or disks are connected by a network, and each node is itself a shared-memory or shared-disk system.

![Shared memory, shared disk and shared nothing parallel architectures](/diagrams/dbms/parallel-architectures.svg)

| Basis | Shared memory | Shared disk | Shared nothing |
| --- | --- | --- | --- |
| Memory | Shared | Private | Private |
| Disks | Shared | Shared | Private |
| Communication | Very fast (memory) | Through disks / network | Through network only |
| Scalability | Low (bus bottleneck) | Medium | High |
| Fault tolerance | Low | High | High (with replication) |
| Example | SMP servers | Oracle RAC | Teradata, MPP data warehouses |

## Distributed Systems {#distributed-systems}

### Definition of Distributed Database System

A distributed database system is a **collection of sites, each with its own database and DBMS, connected by a network**, that appear to users as **one database**.

Unlike a shared-nothing parallel system, the sites are usually **geographically separated**, are administered separately and connected by slower networks.

1. **Local transaction** — accesses data only at the site where it starts.
2. **Global transaction** — accesses data at several sites.

### Types of Distributed Databases

1. **Homogeneous distributed database** — all sites use the **same DBMS software** and schema and are aware of one another (for example, all bank branches use Oracle).
2. **Heterogeneous distributed database** — sites may use **different DBMSs, schemas and data models** (for example, MySQL at one site, PostgreSQL at another), connected through middleware.

### Advantages of Distributed Databases

1. **Sharing of data** — users at one site can access data at other sites.
2. **Local autonomy** — each site keeps control of its own data.
3. **Availability and reliability** — if one site fails, others continue; with replication, data stays available.
4. **Faster local access** and better performance by keeping data near its users.
5. **Modular growth** — new sites can be added easily.

### Disadvantages of Distributed Databases

1. **Complexity** of software development, query processing and transactions (needs commit protocols such as two-phase commit).
2. **Higher cost** of communication and maintenance.
3. **Security** is harder over a network.
4. Difficult **concurrency control and deadlock handling** across sites.

The storage, transactions and commit protocols of distributed databases are explained in [Distributed Databases](/topics/dbms/distributed-databases).

## Network Types {#network-types}

Distributed and client-server databases depend on the network that connects the sites. The main network types are:

1. **Local area network (LAN)** — connects computers within a **small area** such as a building or campus, with **high speed and low delay**; for example, Ethernet. Client-server and parallel systems usually run on LANs.
2. **Wide area network (WAN)** — connects computers over a **large geographical area** (cities, countries) and has **lower speed and higher delay**; the Internet is the largest WAN. Distributed databases often run over WANs, so the cost of communication strongly affects query processing.
3. **Storage area network (SAN)** — a special high-speed network that connects a group of servers to a large pool of **storage devices** (disks), so that every server can access the storage as if it were local; it is used in shared-disk systems.

WANs are further classified as **continuous-connection** (always connected, such as the Internet) and **discontinuous-connection** (connected only part of the time, such as mobile devices that synchronize when online).

| Basis | LAN | WAN |
| --- | --- | --- |
| Area | Small (building, campus) | Large (countries, world) |
| Speed | High | Lower |
| Delay | Low | High |
| Ownership | Usually one organization | Many organizations / public |
| Example | Office Ethernet | The Internet |

## References {#references}

**TutorialsPoint**

- [DBMS – Architecture](https://www.tutorialspoint.com/dbms/dbms_architecture.htm) — accessed 2026-11-06 (1-tier, 2-tier, 3-tier and n-tier architecture)
- [Distributed DBMS – Concepts](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_concepts.htm) and [Database Environments](https://www.tutorialspoint.com/distributed_dbms/distributed_dbms_database_environments.htm) — accessed 2026-11-06 (distributed database, homogeneous and heterogeneous types, architectures). The concepts page says "there are four types of DBMS" and then lists five.

**GeeksforGeeks**

- [Types of DBMS Architecture](https://www.geeksforgeeks.org/dbms/dbms-architecture-2-level-3-level/) — accessed 2026-11-06 (1-, 2- and 3-tier architecture with advantages and disadvantages). GeeksforGeeks' `centralized-and-client-server-architecture-in-dbms` page returns 404.
- [Design of Parallel Databases](https://www.geeksforgeeks.org/dbms/design-of-parallel-databases-dbms/) — accessed 2026-11-06 (shared memory, shared disk, shared nothing and hierarchical architectures)
- [Distributed Database System](https://www.geeksforgeeks.org/dbms/distributed-database-system/) — accessed 2026-11-06

**TpointTech**

- [Centralized and Client-Server Architecture for DBMS](https://www.tpointtech.com/centralized-and-client-server-architecture-for-dbms) — accessed 2026-11-06
- [Types of Database Parallelism](https://www.tpointtech.com/data-warehouse-types-of-database-parallelism) — accessed 2026-11-06 (speedup, scaleup, shared architectures)
- [Distributed Database Architecture](https://www.tpointtech.com/distributed-database-architecture-in-dbms) — accessed 2026-11-06

**IT Job QnS**

- [Database Management System](https://it.jobqns.com/database-management-system/) — accessed 2026-11-06 (one-, two- and three-tier architectures; ODBC and JDBC in the two-tier architecture)

**Programiz**

- Programiz has no page on database system architectures (checked 2026-11-06).

**Additional source**

- A. Silberschatz, H. F. Korth and S. Sudarshan, *Database System Concepts*, chapter "Database-System Architectures" — transaction-server processes, data servers (page shipping, caching), speedup and scaleup formulas, factors limiting them, interconnection networks and network types (not covered fully on the reference websites)
