---
description: Definition of big data, its sources and units of size, the V's of big data, and structured, semi-structured and unstructured data.
updated: 2026-11-06
---

## Definition of Big Data {#definition-of-big-data}

### Definition

Big data is a collection of datasets so large, fast-growing and complex that they cannot be stored, processed or analysed efficiently with traditional data-processing tools and techniques, such as a single relational database server.

Big data is not a single technique or tool; it has become a complete subject that includes many tools, techniques and frameworks (such as Hadoop, Spark and NoSQL databases) for capturing, storing, processing and analysing such data. The term also refers to the process of extracting useful information from these huge datasets.

Ordinary files are measured in megabytes (a Word or Excel file) or gigabytes (a film); big data is measured in terabytes, petabytes and more. For example, TutorialsPoint states that the amount of data produced by mankind from the beginning of time until 2003 was 5 billion gigabytes, and that the same amount was created every two days in 2011 and every ten minutes in 2013.

### Units of Data Size

| Unit | Symbol | Decimal (SI) value | Binary value |
| --- | --- | --- | --- |
| Kilobyte | KB | 10³ bytes | 2¹⁰ = 1,024 bytes (KiB) |
| Megabyte | MB | 10⁶ bytes | 2²⁰ bytes (MiB) |
| Gigabyte | GB | 10⁹ bytes | 2³⁰ bytes (GiB) |
| Terabyte | TB | 10¹² bytes | 2⁴⁰ bytes (TiB) |
| Petabyte | PB | 10¹⁵ bytes | 2⁵⁰ bytes (PiB) |
| Exabyte | EB | 10¹⁸ bytes | 2⁶⁰ bytes (EiB) |
| Zettabyte | ZB | 10²¹ bytes | 2⁷⁰ bytes (ZiB) |

Each unit is 1,000 (decimal) or 1,024 (binary) times the previous one. Examples:

1. 5 billion GB = `5 × 10⁹ × 10⁹ bytes = 5 × 10¹⁸ bytes = 5 EB`.
2. Storing 1 PB on 4 TB hard disks needs `10¹⁵ / (4 × 10¹²) = 250` disks (before replication).
3. 1 PiB = 2⁵⁰ = 1,125,899,906,842,624 bytes, about 12.6% more than 1 PB.

### Sources of Big Data

Big data is produced by many devices and applications:

1. **Social media data:** posts, likes, photos and views of millions of users on Facebook, X (Twitter), LinkedIn and others.
2. **E-commerce data:** logs of searches, orders and payments on sites such as Amazon, Flipkart, Alibaba and Daraz, from which buying trends can be found.
3. **Black box data:** the flight recorders of helicopters, aeroplanes and jets, which capture the voices of the crew, microphone and earphone recordings, and aircraft performance information.
4. **Stock exchange data:** buy and sell decisions of customers on the shares of different companies.
5. **Power grid data:** the power consumed by each node with respect to a base station.
6. **Transport data:** the model, capacity, distance and availability of vehicles; GPS data.
7. **Search engine data:** the huge amounts of data that search engines retrieve from many databases.
8. **Weather stations and satellites:** data used for weather forecasting.
9. **Telecom companies:** call records and usage data of millions of users.
10. **Sensors and IoT devices, machines and system logs.**

### Benefits of Big Data

1. **Better decisions:** data-driven insights support planning (for example, marketing agencies learn the response to their campaigns from social media).
2. **Better products:** companies plan production from customers' preferences and product perception.
3. **Better services:** hospitals give better and quicker service by using patients' medical histories.
4. **Fraud and risk detection:** banks analyse transaction patterns to detect fraud.
5. **Efficiency:** better use of staff, equipment and budgets; lower costs.

### Classes of Big Data Technology

There are two classes of big data technology, which are often used together:

1. **Operational big data:** systems such as MongoDB and other NoSQL databases that provide real-time, interactive workloads, where data is mainly captured and stored.
2. **Analytical big data:** systems such as massively parallel processing (MPP) databases and MapReduce that perform retrospective, complex analysis that may touch most or all of the data.

| Point | Operational | Analytical |
| --- | --- | --- |
| Latency | 1 ms – 100 ms | 1 min – 100 min |
| Concurrency (users) | 1,000 – 100,000 | 1 – 10 |
| Access pattern | Writes and reads | Reads |
| Queries | Selective | Unselective (scan large parts of the data) |
| Data scope | Operational (current) | Retrospective (historical) |
| End user | Customer | Data scientist |
| Technology | NoSQL | MapReduce, MPP database |

### Challenges of Big Data

1. Capturing data.
2. Curation (cleaning and organising).
3. Storage.
4. Searching.
5. Sharing.
6. Transfer.
7. Analysis.
8. Presentation (visualisation).
9. Privacy and security.

## Characteristics of Big Data (the V's) {#characteristics-of-big-data-the-v-s}

### The V's of Big Data

Big data is described by characteristics whose names begin with V. The original model has **3 V's** (Volume, Velocity, Variety); the **5 V's** add Veracity and Value; the **6 V's** add Variability.

![The V's of big data](/diagrams/artificial-intelligence/big-data-vs.svg)

1. Volume
2. Velocity
3. Variety
4. Veracity
5. Value
6. Variability

#### 1. Volume

**Volume** is the very large amount of data that is generated and stored, measured in terabytes, petabytes, exabytes and more.

The name "big data" itself refers to its size. Data is generated daily by business processes, machines, social media, networks and human interactions. Example: an e-commerce platform with 100 million users stores customer profiles, searches, orders, payments, reviews and website activity.

#### 2. Velocity

**Velocity** is the speed at which data is generated, collected, transmitted and processed.

Data flows continuously from application logs, business processes, networks, social media, sensors and mobile devices, and some applications must process it almost in real time. Example: a bank must check card transactions as they happen to detect fraud.

#### 3. Variety

**Variety** is the many different types, formats and sources of data: structured, semi-structured and unstructured.

In the past, data came mainly from databases and spreadsheets; today it also comes as e-mails, PDFs, photos, videos, audio, social media posts and sensor readings. Example: an online shop processes customer records (tables), JSON data from APIs, product images, reviews and videos together. The types of data are explained in [Sources and Types of Data](#sources-and-types-of-data-structured-semi-structured-unstructured).

#### 4. Veracity

**Veracity** is the quality, accuracy and trustworthiness of the data.

Big data comes from many sources, so some of it may be incomplete, duplicated, outdated, inconsistent or wrong; poor-quality data leads to wrong analysis and wrong decisions. Example: customer data collected from different systems may contain duplicate records or incorrect addresses, so it must be cleaned and validated before analysis.

#### 5. Value

**Value** is the useful insight and benefit that can be obtained by analysing the data.

Large amounts of data are worthless by themselves; their value comes from analysis that supports decisions. Example: an e-commerce company analyses purchase data to find popular products and improve its recommendations.

#### 6. Variability

**Variability** is the change over time in the meaning, structure or rate of flow of the data.

Example: an online store receives a sudden burst of traffic and orders during a major sale; the meaning of a word in social media posts can change with context.

## Sources and Types of Data: Structured, Semi-Structured, Unstructured {#sources-and-types-of-data-structured-semi-structured-unstructured}

### Types of Data

The sources of big data are listed under [Sources of Big Data](#definition-of-big-data). By its organisation, data is of three types:

1. Structured data
2. Semi-structured data
3. Unstructured data

![Structured, semi-structured and unstructured data](/diagrams/artificial-intelligence/data-types.svg)

#### 1. Structured Data

**Structured data** is data organised in a predefined format (a fixed schema) of rows and columns, so that each element can be addressed and queried directly, usually in a relational database.

1. It has relational keys and maps easily into predefined fields.
2. It is queried with SQL.
3. Examples: bank transaction records, customer and employee tables, sales records, student results.

#### 2. Semi-Structured Data

**Semi-structured data** is data that does not follow the fixed table structure of a relational database but contains organisational markers, such as tags, keys and metadata, that separate its elements and make it easier to analyse.

1. Its structure is flexible: different records can have different fields.
2. Examples: XML, JSON, HTML, e-mail (structured header fields with a free-text body), NoSQL documents.

#### 3. Unstructured Data

**Unstructured data** is data that has no predefined data model or format, so it does not fit the rows and columns of a relational database.

1. It forms the largest part of today's data.
2. It needs special storage and processing (for example, data lakes, Hadoop, NLP and computer vision) to extract value.
3. Examples: Word and PDF documents, plain text, images, audio, video, social media posts, CCTV footage, media logs.

Some sources also describe **quasi-structured data**: textual data with inconsistent formats that can be structured only with effort and tools, such as web server logs and clickstream data.

### Structured vs Semi-Structured vs Unstructured Data

| Point | Structured data | Semi-structured data | Unstructured data |
| --- | --- | --- | --- |
| Organisation | Predefined schema; rows and columns | Tags, keys or markers; flexible schema | No predefined model |
| Technology | Relational database tables | XML, JSON, RDF | Character and binary data |
| Transaction management | Mature transactions and concurrency control | Adapted from DBMS; less mature | No transaction management or concurrency |
| Version management | Over tuples, rows and tables | Over tuples or graphs is possible | Versioned as a whole |
| Flexibility | Schema-dependent; least flexible | More flexible than structured | Most flexible; no schema |
| Scalability | Hard to scale the schema | Easier to scale than structured | Most scalable |
| Query performance | Structured queries with complex joins | Queries over anonymous nodes are possible | Only textual queries (search) |
| Ease of analysis | Easiest | Moderate | Hardest |
| Examples | Bank transactions, employee table | XML, JSON, e-mail | Images, videos, audio, PDF, text |

## References {#references}

- TutorialsPoint — [Hadoop: Big Data Overview](https://www.tutorialspoint.com/hadoop/hadoop_big_data_overview.htm), [Big Data Analytics: Overview](https://www.tutorialspoint.com/big_data_analytics/big_data_analytics_overview.htm), accessed 2026-11-06.
- TpointTech — [What is Big Data](https://www.tpointtech.com/what-is-big-data), [Big Data Characteristics](https://www.tpointtech.com/big-data-characteristics), accessed 2026-11-06.
- GeeksforGeeks — [What is Big Data](https://www.geeksforgeeks.org/dbms/what-is-big-data/), [6V's of Big Data](https://www.geeksforgeeks.org/data-engineering/5-vs-of-big-data/), [Difference between Structured, Semi-structured and Unstructured Data](https://www.geeksforgeeks.org/dbms/difference-between-structured-semi-structured-and-unstructured-data/), accessed 2026-11-06.
- Programiz has no page on big data.
- The unit conversions were checked with a short program.

Issues found on the reference websites and how they were resolved:

1. TpointTech's "Big Data Characteristics" page says that "OLTP systems are built to work with semi-structured data" and that semi-structured data "is stored in relations, i.e., tables"; OLTP systems work mainly with structured relational data, and semi-structured data is usually stored as documents (XML, JSON) because it does not fit a fixed table schema.
2. TpointTech's "What is Big Data" page describes Velocity as "the volume of data will double in every 2 years"; that is a statement about growth in volume. Velocity is the speed at which data is generated and processed, as TpointTech's other page and GeeksforGeeks say.
3. TpointTech lists CSV and TSV as semi-structured data; CSV and TSV files are normally treated as structured (tabular) data, so they were not used as examples.
4. The reference websites give different numbers of V's (3 on TpointTech's "What is Big Data", 5 on its "Characteristics" page, 6 on GeeksforGeeks). All six are given here, with the number of each model stated.
