---
description: Hadoop and HDFS, the Hadoop ecosystem, MapReduce with a word-count example, Apache Spark and RDDs, and NoSQL databases with their types and the CAP theorem.
updated: 2026-11-06
---

## Hadoop and HDFS {#hadoop-and-hdfs}

### Definition of Hadoop

Apache Hadoop is an open-source framework, written in Java, that stores and processes very large datasets in a distributed way across clusters of commodity (low-cost) computers, using simple programming models.

Hadoop scales from a single server to thousands of machines, each offering local computation and storage. Instead of one expensive high-end server, many ordinary computers work together as one distributed system and read the data in parallel, which gives much higher throughput at lower cost. Hadoop is designed for **batch (offline) processing**, not for interactive online analytical processing (OLAP). It is used by companies such as Facebook, Yahoo, X (Twitter) and LinkedIn.

### Modules of Hadoop

Hadoop has four core modules:

1. **HDFS (Hadoop Distributed File System):** the storage layer; it stores files as blocks distributed over the cluster.
2. **MapReduce:** the processing (computation) layer; a programming model for parallel processing of the data with key–value pairs.
3. **YARN (Yet Another Resource Negotiator):** the framework for job scheduling and cluster resource management.
4. **Hadoop Common:** the Java libraries and utilities needed by the other modules.

At its core, Hadoop has two major layers: the **storage layer (HDFS)** and the **processing layer (MapReduce)**.

### How Hadoop Works

1. Data is divided into files and directories, and each file is divided into uniform-sized **blocks** (128 MB by default in current Hadoop versions; 64 MB in Hadoop 1).
2. The blocks are distributed across the nodes of the cluster.
3. Each block is replicated on several nodes, to survive hardware failures.
4. The processing code is sent to the nodes that hold the data ("move computation to the data"), which reduces network traffic.
5. Hadoop checks that the code ran successfully, performs the sort between the map and reduce stages, sends the sorted data to the right computers, and writes debugging logs for each job.

### Definition of HDFS

HDFS (Hadoop Distributed File System) is the distributed file system of Hadoop that stores very large files across many commodity machines, as replicated blocks, and provides high-throughput, fault-tolerant access to them.

HDFS is based on the Google File System (GFS). It follows the **write once, read many times** principle: files are written once and then read many times (data can be appended, but not changed in the middle).

### HDFS Architecture

HDFS has a **master–slave** architecture with one NameNode and many DataNodes.

![HDFS master–slave architecture](/diagrams/artificial-intelligence/hdfs-architecture.svg)

1. **NameNode (master):**
   1. Manages the file system **namespace** and stores the **metadata**: file names, permissions, and the list of blocks of each file with their locations.
   2. Regulates clients' access to files.
   3. Executes file system operations such as opening, closing and renaming files and directories.
   4. Keeps the metadata in memory for fast access. In Hadoop 1, the single NameNode was a **single point of failure**; Hadoop 2 and later support an active/standby NameNode pair (HDFS High Availability) to remove it.
2. **DataNodes (slaves):** usually one per node of the cluster.
   1. Store the actual data blocks.
   2. Perform read and write operations as requested by clients.
   3. Create, delete and replicate blocks on the instructions of the NameNode.
   4. Send regular **heartbeats** and **block reports** to the NameNode; a DataNode that stops sending heartbeats is marked dead and its blocks are re-replicated elsewhere.
3. **Secondary NameNode:** a helper machine that periodically takes **checkpoints** (snapshots) of the NameNode's metadata, which reduces downtime and data loss. It is not a standby NameNode.
4. **Block:** the minimum amount of data that HDFS reads or writes. The default block size is **128 MB** (134,217,728 bytes) and is configurable. A file smaller than a block uses only its actual size (a 5 MB file occupies 5 MB, not 128 MB). Blocks are large to minimise the cost of disk seeks.
5. **Replication factor:** the number of copies of each block; the default is **3**. The replicas are placed on different nodes and racks (rack awareness), so data survives the failure of a node or a rack.

**Worked example.** A 500 MB file is stored with the default block size and replication factor:

1. Number of blocks = `⌈500 / 128⌉ = 4` (three blocks of 128 MB and one of `500 − 3 × 128 = 116` MB).
2. Number of block replicas = `4 × 3 = 12`.
3. Raw storage used = `500 × 3 = 1,500` MB.

### Features and Goals of HDFS

1. **Fault detection and recovery:** with many commodity machines, failures are common, so HDFS detects faults and recovers automatically.
2. **Huge datasets:** clusters of hundreds or thousands of nodes store files of gigabytes to terabytes.
3. **Computation near the data:** processing runs where the data is stored, reducing network traffic and increasing throughput.
4. **Streaming data access** with high throughput.
5. **Low cost:** runs on commodity hardware.
6. File permissions and authentication; a command interface (`hadoop fs`) to work with files.

HDFS is **not** suitable for:

1. Low-latency data access (it favours throughput over the time to read the first record).
2. Lots of small files (each file's metadata uses NameNode memory).
3. Multiple writers or modifications at arbitrary positions in a file.

### YARN

**YARN (Yet Another Resource Negotiator)** is the resource management layer of Hadoop that allocates cluster resources (CPU and memory) to applications and schedules their tasks.

YARN separates resource management from data processing, so frameworks other than MapReduce (such as Spark) can run on the same Hadoop cluster. It has three components:

1. **ResourceManager:** the master that allocates resources to all applications in the cluster.
2. **NodeManager:** runs on each node, manages that node's resources and reports to the ResourceManager.
3. **ApplicationMaster:** one per application; it negotiates resources from the ResourceManager and works with the NodeManagers to run the application's tasks.

In Hadoop 1 (MRv1), the MapReduce engine itself managed resources with a **JobTracker** (on the master, accepting jobs and assigning tasks) and **TaskTrackers** (on the slaves, running the tasks); YARN (MRv2) replaced them.

### The Hadoop Ecosystem

**The Hadoop ecosystem** is the set of tools built around the core Hadoop modules for data ingestion, storage, processing, querying, machine learning and cluster management.

| Component | Category | Role |
| --- | --- | --- |
| HDFS | Storage | Distributed, fault-tolerant storage of very large files |
| YARN | Resource management | Allocates cluster resources and schedules jobs |
| MapReduce | Processing | Parallel batch processing with map and reduce functions |
| Spark | Processing | Fast in-memory batch, streaming, interactive and iterative processing |
| Hive | Querying | Data warehouse tool; queries data in HDFS with the SQL-like HiveQL (HQL), mainly for batch analysis and reporting |
| Pig | Scripting | Platform developed at Yahoo; data-flow scripts in Pig Latin are converted into MapReduce jobs |
| HBase | NoSQL database | Column-oriented NoSQL database on HDFS, modelled on Google's Bigtable; fast random read/write of small parts of huge tables |
| Cassandra | NoSQL database | Distributed wide-column NoSQL database (originally from Facebook) with high availability and no single point of failure |
| Mahout, Spark MLlib | Machine learning | Scalable algorithms for clustering, classification and recommendation (collaborative filtering) |
| ZooKeeper | Coordination | Centralised service for configuration, synchronisation and naming among the distributed components |
| Oozie | Workflow scheduling | Schedules Hadoop jobs as workflows (jobs in sequence) and coordinator jobs (triggered by time or data) |
| Flume | Data ingestion | Collects, aggregates and moves large amounts of streaming log data (web logs, events) into HDFS |
| Sqoop | Data transfer | Transfers bulk data between relational databases and Hadoop (import and export) |
| Kafka | Streaming | Distributed, high-throughput platform for real-time data streams (event messages) |
| Avro | Serialization | Data serialization framework: defines data with JSON schemas and stores it in a compact binary format |
| Chukwa | Monitoring | Data collection system for monitoring large distributed systems, built on HDFS and MapReduce |
| Solr, Lucene | Search | Full-text searching and indexing |

**Example (big data pipeline for an e-commerce platform).** Five components can be chosen as follows:

1. **Flume** (or Kafka) ingests real-time web logs, clickstream data and application events into Hadoop.
2. **HDFS** stores the petabyte-scale data reliably by replicating blocks.
3. **YARN** allocates CPU and memory to the batch and streaming jobs.
4. **MapReduce** (or Spark) runs large-scale batch analytics such as sales and customer-behaviour analysis.
5. **Mahout** (or Spark MLlib) builds recommendation engines and other machine-learning models; **Hive** gives analysts SQL-like queries for reports.

### Advantages and Limitations of Hadoop

Advantages:

1. **Scalability:** nodes can be added (or removed) without stopping the cluster.
2. **Low cost:** open source and runs on commodity hardware.
3. **Flexibility:** stores structured, semi-structured and unstructured data without preprocessing.
4. **Fault tolerance:** failures are detected and handled by the software; data is replicated.
5. **Platform independence:** Java-based, so it runs on many platforms.
6. Automatic distribution of data and work, using the parallelism of many CPU cores.

Limitations:

1. MapReduce is slow for iterative and interactive work, because it reads and writes the disk between steps.
2. MapReduce programming in Java is complex, and choosing among the many ecosystem tools is hard.
3. Not suitable for many small files or low-latency access.
4. Security, data management and governance need extra tools.
5. Shortage of skilled Hadoop developers.

## MapReduce {#mapreduce}

### Definition of MapReduce

MapReduce is a parallel programming model and processing framework for processing very large datasets on a cluster of commodity machines by dividing the work into a map phase and a reduce phase that operate on key–value pairs.

MapReduce was devised at Google and described in the 2004 paper "MapReduce: Simplified Data Processing on Large Clusters"; Hadoop provides an open-source implementation. The framework handles the distribution of work, scheduling and fault tolerance, so the programmer writes only the map and reduce functions.

### Phases of MapReduce

1. **Input splitting:** the input is divided into **input splits** (usually one per HDFS block); each split is processed by one map task.
2. **Map:** the **mapper** takes input key–value pairs and produces intermediate key–value pairs `<k2, v2>`. The keys need not be unique.
3. **Shuffle and sort:** the framework sorts the map output by key, partitions it among the reducers and groups all values of the same key: `<k2, list(v2)>`.
4. **Reduce:** the **reducer** applies a function (such as sum or count) to the list of values of each key and produces the final `<key, value>` output, which is written to HDFS. The reduce phase starts only after the map phase is complete.

An optional **combiner** runs a local reduce on each mapper's output to reduce the data sent over the network.

In general form:

`map: (k1, v1) → list(k2, v2)`

`reduce: (k2, list(v2)) → list(k3, v3)`

### Worked Example: Word Count

Count the occurrences of each word in three input splits: "Deer Bear River", "Car Car River" and "Deer Car Bear".

![MapReduce word count](/diagrams/artificial-intelligence/mapreduce-wordcount.svg)

1. **Map:** each mapper emits `(word, 1)` for every word: split 1 gives `(Deer,1) (Bear,1) (River,1)`; split 2 gives `(Car,1) (Car,1) (River,1)`; split 3 gives `(Deer,1) (Car,1) (Bear,1)`.
2. **Shuffle and sort:** values are grouped by key: `Bear → [1, 1]`, `Car → [1, 1, 1]`, `Deer → [1, 1]`, `River → [1, 1]`.
3. **Reduce:** each reducer sums its list: `Bear 2`, `Car 3`, `Deer 2`, `River 2`.

The same steps written as a small Python program (a single-machine simulation of the three phases):

```python tab
from collections import defaultdict

splits = ["Deer Bear River", "Car Car River", "Deer Car Bear"]

# Map phase: each mapper emits (word, 1) for every word in its split
def mapper(text):
    return [(word, 1) for word in text.split()]

mapped = [pair for split in splits for pair in mapper(split)]

# Shuffle and sort phase: group the values of each key
groups = defaultdict(list)
for word, one in mapped:
    groups[word].append(one)

# Reduce phase: add the values of each key
def reducer(word, values):
    return word, sum(values)

for word in sorted(groups):
    print(*reducer(word, groups[word]))
```

```text tab=Output
Bear 2
Car 3
Deer 2
River 2
```

### Applications of MapReduce

1. Counting and indexing: word count, building search-engine indexes (Google used MapReduce to regenerate its index of the web).
2. Distributed sorting and pattern-based searching (distributed grep).
3. Document clustering and web link-graph reversal.
4. Log analysis and large-scale data transformation (ETL).
5. Machine learning on large datasets.

### Advantages and Disadvantages of MapReduce

Advantages:

1. Processes huge datasets in parallel on commodity hardware.
2. Scalable to thousands of nodes.
3. Fault tolerant: failed tasks are automatically re-run on other nodes.
4. Simple model: the programmer writes only map and reduce functions.
5. Moves computation to the data (data locality).

Disadvantages:

1. Slow for iterative algorithms and interactive queries, because intermediate results are written to disk between jobs.
2. Batch only; not suitable for real-time processing.
3. Many problems are hard to express as map and reduce steps.

## Apache Spark {#apache-spark}

### Definition of Apache Spark

Apache Spark is an open-source, unified analytics engine for large-scale distributed data processing that keeps intermediate data in memory, so it processes batch, streaming, interactive and iterative workloads much faster than disk-based MapReduce.

Spark was started by Matei Zaharia at UC Berkeley's AMPLab in 2009, open-sourced in 2010 under a BSD licence, donated to the Apache Software Foundation in 2013, and became a top-level Apache project in February 2014. Spark is not a modified version of Hadoop: it has its own cluster management and can run without Hadoop, although it is often used with HDFS for storage and YARN for resources.

### Features of Spark

1. **Speed:** Spark can run applications up to 100 times faster than Hadoop MapReduce in memory, and about 10 times faster on disk, by reducing disk reads and writes; it uses a DAG (directed acyclic graph) scheduler and a query optimiser.
2. **Multiple languages:** APIs in Java, Scala, Python and R, and SQL; more than 80 high-level operators.
3. **Advanced analytics (generality):** besides map and reduce, it supports SQL queries, streaming data, machine learning and graph algorithms in one engine.
4. **Runs everywhere:** standalone, on Hadoop YARN, Kubernetes or Mesos, or in the cloud; reads data from HDFS, HBase, Cassandra, Amazon S3 and others.

### Components of Spark

![Components of Apache Spark](/diagrams/artificial-intelligence/spark-stack.svg)

1. **Spark Core:** the general execution engine on which everything else is built; it provides in-memory computing, task scheduling, fault recovery and access to external storage.
2. **Spark SQL:** works with structured and semi-structured data using SQL and DataFrames (its first data abstraction was called SchemaRDD).
3. **Spark Streaming:** processes live data streams by dividing them into small batches (mini-batches).
4. **MLlib:** a distributed machine-learning library (classification, regression, clustering, collaborative filtering).
5. **GraphX:** a library for graph processing and graph algorithms.

Spark can be deployed in three ways: **standalone** (alongside MapReduce on top of HDFS), on **Hadoop YARN**, and **Spark in MapReduce (SIMR)**.

### Resilient Distributed Dataset (RDD)

**A resilient distributed dataset (RDD)** is the fundamental data structure of Spark: an immutable (read-only), fault-tolerant collection of records, divided into partitions that are processed in parallel on different nodes of the cluster.

1. **Resilient:** if a partition is lost, Spark recomputes it from its **lineage** (the record of operations that created it), instead of relying on replication.
2. **Distributed:** the data is partitioned across the nodes.
3. An RDD is created by parallelising a collection in the driver program, or by referring to a dataset in external storage (HDFS, HBase and so on).
4. Two kinds of operations:
   1. **Transformations** (such as `map`, `filter`, `reduceByKey`) create a new RDD; they are **lazy**, that is, computed only when needed.
   2. **Actions** (such as `count`, `collect`, `saveAsTextFile`) return a result or write output, and trigger the computation.
5. An RDD can be **persisted (cached)** in memory, so repeated queries on the same data are fast.

**Why Spark is faster.** In MapReduce, the only way to share data between jobs (for example, between the iterations of an algorithm) is to write it to stable storage such as HDFS, which involves replication, serialisation and disk I/O; most Hadoop applications spend more than 90% of their time on HDFS reads and writes. Spark keeps intermediate results in distributed memory (spilling to disk only if memory is insufficient). Data sharing in memory is 10 to 100 times faster than through the network and disk.

### Uses of Spark

1. **Data integration (ETL):** cleaning and combining data from different systems at lower cost and time.
2. **Stream processing:** analysing real-time data such as log files, for example to detect fraudulent transactions.
3. **Machine learning:** iterative algorithms run quickly on data kept in memory.
4. **Interactive analytics:** fast responses to ad-hoc queries.

### MapReduce vs Spark

| Point | Hadoop MapReduce | Apache Spark |
| --- | --- | --- |
| Processing | Disk-based; writes intermediate results to disk | In-memory; keeps intermediate results in RAM |
| Speed | Slower | Up to 100× faster in memory, about 10× on disk |
| Processing types | Batch only | Batch, streaming (real time), interactive, iterative, graph |
| Ease of programming | Harder; verbose Java code | Easier; high-level APIs in Scala, Java, Python, R, SQL |
| Iterative algorithms (ML) | Inefficient | Efficient |
| Fault tolerance | Replication of data on disk | RDD lineage (recomputation) |
| Caching | Cannot cache data in memory | Can cache data in memory |
| Memory need | Low; works well with limited RAM | High; needs a lot of RAM |
| Query language | Needs tools such as Hive or Pig | Has its own Spark SQL |
| Cluster manager | YARN | Standalone, YARN, Kubernetes, Mesos |

## NoSQL Databases {#nosql-databases}

### Definition of NoSQL Database

A NoSQL ("Not only SQL") database is a non-relational database that stores and manages data without the fixed table structure of relational databases, using flexible data models such as key–value pairs, documents, column families or graphs.

NoSQL databases were developed because relational databases had difficulties with big data, very high scalability and real-time web applications. They are used in social media, big data, IoT and cloud applications.

### Characteristics of NoSQL Databases

1. Non-relational data model; no fixed tables.
2. Flexible, dynamic schema (schema-less): records in the same collection can have different fields.
3. **Horizontal scalability (scale-out):** data is distributed across many servers; more capacity is added by adding servers.
4. High availability and performance through replication and partitioning (sharding).
5. Handle large volumes of structured, semi-structured and unstructured data.
6. Usually follow the **BASE** model (Basically Available, Soft state, Eventually consistent) instead of strict ACID transactions.
7. Usually avoid joins; related data is often stored together.

### Types of NoSQL Databases

There are four main types of NoSQL databases:

![The four types of NoSQL databases](/diagrams/artificial-intelligence/nosql-types.svg)

1. **Key–value store:** stores data as pairs of a unique key and a value; the value is fetched only by its key. It is the simplest and fastest type. Uses: caching, session storage, shopping carts, leaderboards. Examples: Redis, Memcached, Amazon DynamoDB.
2. **Document store:** stores data as documents (JSON, BSON or XML), grouped in collections; each document can have its own structure, including nested fields and arrays, and can be queried by its fields. Uses: content management, product catalogues, user profiles. Examples: MongoDB, CouchDB, Firebase Firestore.
3. **Column-family (wide-column) store:** stores data in rows identified by a row key, with columns grouped into column families; each row can have different columns, and rows are stored sorted by row key. (It is not the same as a columnar storage format such as Parquet, which stores each column separately.) Uses: big data analytics, time-series and IoT data. Examples: Apache Cassandra, HBase, Google Bigtable.
4. **Graph database:** stores data as **nodes** (entities) and **edges** (relationships) with properties, and answers queries by traversing relationships instead of using joins. Uses: social networks, recommendation systems, fraud detection. Examples: Neo4j, Amazon Neptune.

### Advantages and Disadvantages of NoSQL

Advantages:

1. High performance for large-scale applications.
2. Horizontal scalability on commodity servers.
3. Flexible schema; the data structure can change easily.
4. Handles big data of all types.
5. High availability through replication.

Disadvantages:

1. Weaker consistency (often only eventual consistency) and limited transaction support.
2. No standard query language; each product has its own.
3. Limited support for joins and complex queries.
4. Less mature tools and fewer experts than relational databases.

### SQL vs NoSQL

| Point | SQL (relational) database | NoSQL database |
| --- | --- | --- |
| Data model | Tables with rows and columns | Key–value, document, column-family or graph |
| Schema | Fixed, predefined | Flexible, dynamic |
| Query language | SQL (standard) | Product-specific APIs and languages |
| Joins | Supports complex joins | Generally avoids joins |
| Transactions | ACID | Usually BASE (eventual consistency) |
| Scaling | Vertical (bigger server) | Horizontal (more servers) |
| Best for | Structured data, complex queries, strong consistency | Large, fast-changing, semi-structured or unstructured data |
| Typical uses | Banking, ERP, CRM, inventory | Social media, big data, IoT, real-time web apps |
| Examples | MySQL, PostgreSQL, Oracle, SQL Server | MongoDB, Cassandra, Redis, Neo4j |

### CAP Theorem

**The CAP theorem** is the theorem of distributed systems which states that a distributed data system can guarantee at most two of the three properties Consistency, Availability and Partition tolerance at the same time; when a network partition occurs, it must choose between consistency and availability.

1. **Consistency (C):** every node returns the same, most recent successful write; all clients see the same data.
2. **Availability (A):** every request to a non-failing node receives a response (possibly with outdated data).
3. **Partition tolerance (P):** the system continues to operate even if the network splits it into parts that cannot communicate.

Network partitions cannot be avoided in a distributed system, so in practice the choice is between:

1. **CP systems:** keep consistency and refuse some requests during a partition (for example, HBase, MongoDB in its default configuration).
2. **AP systems:** stay available and may return outdated data, becoming consistent later (for example, Cassandra, Amazon DynamoDB).
3. **CA** is possible only when there is no partition, as in a single-node relational database.

Example: a bank balance is 500 taka on two replicas, DB1 and DB2. A purchase of 200 taka updates DB1 to 300, but a network fault stops the update from reaching DB2. A CP system rejects reads from DB2 until it is updated; an AP system answers 500 from DB2 (outdated) and updates it later.

## References {#references}

- TutorialsPoint — [Hadoop: Introduction](https://www.tutorialspoint.com/hadoop/hadoop_introduction.htm), [HDFS Overview](https://www.tutorialspoint.com/hadoop/hadoop_hdfs_overview.htm), [MapReduce](https://www.tutorialspoint.com/hadoop/hadoop_mapreduce.htm), [Apache Spark: Introduction](https://www.tutorialspoint.com/apache_spark/apache_spark_introduction.htm), [Apache Spark: RDD](https://www.tutorialspoint.com/apache_spark/apache_spark_rdd.htm), accessed 2026-11-06.
- TpointTech — [What is Hadoop](https://www.tpointtech.com/what-is-hadoop), [What is HDFS](https://www.tpointtech.com/hdfs), [MapReduce Tutorial](https://www.tpointtech.com/mapreduce), [Apache Spark Tutorial](https://www.tpointtech.com/apache-spark-tutorial), [NoSQL Databases](https://www.tpointtech.com/nosql-databases), accessed 2026-11-06.
- GeeksforGeeks — [Hadoop Ecosystem](https://www.geeksforgeeks.org/data-engineering/hadoop-ecosystem/), [MapReduce Architecture](https://www.geeksforgeeks.org/data-engineering/mapreduce-architecture/), [Difference Between MapReduce and Apache Spark](https://www.geeksforgeeks.org/data-engineering/difference-between-mapreduce-and-apache-spark/), [Introduction to NoSQL](https://www.geeksforgeeks.org/dbms/introduction-to-nosql/), [Types of NoSQL Databases](https://www.geeksforgeeks.org/dbms/types-of-nosql-databases/), [SQL vs NoSQL](https://www.geeksforgeeks.org/dbms/difference-between-sql-and-nosql/), [The CAP Theorem in DBMS](https://www.geeksforgeeks.org/dbms/the-cap-theorem-in-dbms/), accessed 2026-11-06.
- Programiz has no page on Hadoop, Spark or NoSQL.
- Apache Hadoop documentation — [HDFS Architecture](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html) and [hdfs-default.xml](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml) (default `dfs.blocksize` = 134217728 bytes, `dfs.replication` = 3), accessed 2026-11-06.
- Ecosystem tools not described on the reference websites: [Apache Flume](https://flume.apache.org/), [Apache Chukwa](https://chukwa.apache.org/) (now retired), and Wikipedia — [Sqoop](https://en.wikipedia.org/wiki/Sqoop), [Apache Avro](https://en.wikipedia.org/wiki/Apache_Avro), [Apache Cassandra](https://en.wikipedia.org/wiki/Apache_Cassandra), [Apache Kafka](https://en.wikipedia.org/wiki/Apache_Kafka), [Apache ZooKeeper](https://en.wikipedia.org/wiki/Apache_ZooKeeper), accessed 2026-11-06.
- The word-count program was run with Python 3, and its real output is shown.

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint's HDFS page gives the default block size as 64 MB, while its Hadoop introduction says 128 MB and TpointTech says 128 MB. The Apache documentation confirms 128 MB (134,217,728 bytes) for current Hadoop; 64 MB was the default in Hadoop 1.
2. TutorialsPoint says that Spark "is one of Hadoop's sub project"; Spark was developed at UC Berkeley's AMPLab and became its own top-level Apache project. TutorialsPoint itself adds that Spark is not a modified version of Hadoop and has its own cluster management.
3. TpointTech says that the Hadoop master node "includes Job Tracker, Task Tracker, NameNode, and DataNode"; the master runs the JobTracker and NameNode, while TaskTrackers and DataNodes run on the slave nodes (a small cluster may also run them on the master machine).
4. GeeksforGeeks's MapReduce-vs-Spark table describes MapReduce as a framework "used for writing data into HDFS" and says Spark has "low scalability"; MapReduce is a processing framework, and Spark scales to thousands of nodes. Those rows were not used.
5. GeeksforGeeks says that Hive "supports both real-time and batch processing"; Hive is designed mainly for batch queries over large datasets (not low-latency real-time queries).
6. TpointTech lists "Apache Couchbase"; Couchbase is not an Apache Software Foundation project, so it was not used.
