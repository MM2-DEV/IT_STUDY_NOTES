---
description: Data warehouse concepts — characteristics, OLTP vs OLAP, three-tier architecture, ETL, data marts, metadata — and data analytics — process, preprocessing, the four types and tools.
updated: 2026-11-06
---

## Data Warehouse Concepts {#data-warehouse-concepts}

### Definition of Data Warehouse

A data warehouse (DW) is a subject-oriented, integrated, time-variant and non-volatile collection of data, gathered from several sources and kept separate from operational databases, that supports analysis and decision-making by management.

This definition is due to **Bill Inmon**, known as the "father of data warehousing". The idea of data warehousing dates to the late 1980s, when IBM researchers **Barry Devlin and Paul Murphy** introduced the "business data warehouse" (1988). A data warehouse is designed for **query and analysis** rather than transaction processing; it holds historical data from one or many sources and gives decision-makers (executives, managers and analysts) a consolidated, multidimensional view of the business, together with OLAP tools for analysis.

### Characteristics of a Data Warehouse

A data warehouse has four characteristics:

1. **Subject-oriented:** it is organised around the major subjects of the business, such as customer, product, supplier, sales and revenue, rather than around day-to-day operations; data not useful for decision-making about the subject is excluded.
2. **Integrated:** it combines data from heterogeneous sources (relational databases, flat files, online transaction records), and the data is cleaned so that naming conventions, units and attribute types are consistent.
3. **Time-variant:** the data is identified with a particular time period and kept for a long time (for example, 3, 6 or 12 months, or many years), giving a historical perspective. An operational system usually keeps only current data.
4. **Non-volatile:** once loaded, the data is not changed or deleted; new data is added without erasing the old. Only two operations are needed: the initial loading of data and access to data. Therefore a data warehouse does not need transaction processing, recovery and concurrency control, which speeds up data retrieval.

### Why a Data Warehouse Is Kept Separate from Operational Databases

1. An operational database is built for known, simple tasks (searching particular records, indexing); data warehouse queries are complex and summarise large amounts of data.
2. Operational databases must support many concurrent transactions with concurrency control and recovery; analytical queries would slow them down.
3. An operational database allows reading and modifying data; an OLAP query needs read-only access.
4. An operational database keeps current data; a data warehouse keeps historical data.

### OLTP vs OLAP (Operational Database vs Data Warehouse)

| Point | Operational database (OLTP) | Data warehouse (OLAP) |
| --- | --- | --- |
| Purpose | Day-to-day transaction processing | Analysis and decision support |
| Users | Clerks, DBAs, database professionals (thousands of users) | Executives, managers, analysts (hundreds of users) |
| Role | Runs the business ("data in") | Analyses the business ("information out") |
| Data | Current, detailed, frequently updated | Historical, summarised and consolidated |
| Operations | Short reads, inserts, updates, deletes | Complex, read-mostly queries |
| Orientation | Application- and transaction-oriented | Subject-oriented |
| Design | ER model, normalised | Star or snowflake schema, denormalised |
| Records accessed per query | Tens | Millions |
| Database size | About 100 MB to 100 GB | About 100 GB to 100 TB |
| Priority | High availability, fast transactions | Query flexibility, high throughput |

### Three-Tier Data Warehouse Architecture

A data warehouse generally has a three-tier architecture:

![Three-tier data warehouse architecture](/diagrams/artificial-intelligence/dw-architecture.svg)

1. **Bottom tier: the data warehouse database server**, usually a relational database system. Back-end tools and utilities (ETL) feed data into it from operational databases and external sources; they extract, clean, transform, load and refresh the data. The bottom tier also holds the metadata repository and data marts.
2. **Middle tier: the OLAP server**, which presents the data as a multidimensional cube. It is implemented as:
   1. **ROLAP (relational OLAP):** an extended relational DBMS that maps multidimensional operations to standard relational operations.
   2. **MOLAP (multidimensional OLAP):** directly implements multidimensional data and operations.
3. **Top tier: the front-end client layer**, containing query and reporting tools, analysis tools and data mining tools.

Data warehouse architectures are also described in three forms: **basic** (sources → warehouse → users), **with a staging area** (data is cleaned in a staging area before loading), and **with a staging area and data marts**.

### ETL Process

**ETL (extract, transform, load)** is the process that collects data from source systems, converts it into a clean, consistent format, and loads it into the data warehouse.

1. **Extract:** raw data is collected from the sources, which can be structured (SQL databases, ERP and CRM systems), semi-structured (JSON, XML) or unstructured (e-mails, web pages, flat files), without changing its format.
2. **Transform:** the data is cleaned and converted according to business rules: filtering wrong or irrelevant data, removing duplicates, converting units and currencies, standardising formats, sorting, joining and aggregating (for example, averaging sales).
3. **Load:** the transformed data is loaded into the warehouse:
   1. **Full load:** all the data is loaded, usually when the warehouse is first populated.
   2. **Incremental load:** only new or changed data is loaded, for regular updates.

In **ETL pipelining**, the three stages overlap: while one batch is being loaded, the next is being transformed and another extracted, which speeds up the process.

### Data Warehouse Models

There are three data warehouse models:

1. **Enterprise warehouse:** collects all the information about subjects spanning the whole organisation, with enterprise-wide data integration from operational systems and external providers; its size ranges from gigabytes to terabytes and beyond.
2. **Data mart:** a subset of organisation-wide data that is valuable to a specific group or department.
3. **Virtual warehouse:** a set of views over operational databases; it is easy to build but needs spare capacity on the operational database servers.

### Data Mart

**A data mart** is a small data warehouse that contains a subset of the organisation's data focused on one subject or department, such as sales, marketing or finance.

1. It gives a departmental view of data and is customised by department; for example, a marketing data mart contains data about items, customers and sales.
2. It is small, cheap and quick to build: implementation takes weeks rather than months or years, on low-cost servers.
3. Data marts speed up queries by reducing the amount of data to scan, and they can separate data for access control and privacy.
4. Types:
   1. **Dependent data mart:** built from the enterprise data warehouse (the top-down approach).
   2. **Independent data mart:** built directly from operational or external sources, without a central warehouse (the bottom-up approach).

| Point | Data warehouse | Data mart |
| --- | --- | --- |
| Scope | Enterprise-wide | One department or subject |
| Data sources | Many sources across the organisation | Few sources, or the data warehouse |
| Size | Large (typically hundreds of GB to many TB) | Small (typically under a few TB) |
| Implementation time | Months to years | Weeks to months |
| Cost | High | Low |
| Query response | Slower (more data) | Faster |
| Design approach | Top-down (Inmon) | Bottom-up (Kimball) |

### Approaches to Building a Data Warehouse

1. **Top-down approach (Bill Inmon):** first build the enterprise data warehouse by integrating data from all sources, then create dependent data marts from it. It gives consistent data and a single source of truth, but takes longer and costs more.
2. **Bottom-up approach (Ralph Kimball):** first build data marts for individual business processes, then integrate them into the data warehouse. It delivers results quickly, is more flexible and less risky, but integration of the marts can be harder.

### Metadata

**Metadata** is data about data; in a data warehouse it is the road map that describes the warehouse objects and helps users and tools locate its contents.

For example, the index of a book is metadata about its contents. The **metadata repository** of a data warehouse contains:

1. **Business metadata:** data ownership, business definitions and changing policies.
2. **Operational metadata:** the currency of data (active, archived or purged) and the lineage of data (its history of migration and the transformations applied).
3. **Mapping data:** source databases and their contents, extraction, partitioning, cleaning and transformation rules, and refresh and purging rules.
4. **Summarisation algorithms:** dimension definitions, granularity, aggregation and summarising rules.

### Multidimensional Data Model and OLAP

Data in a warehouse is viewed as a **data cube** of **facts** (numeric measures, such as sales amount) and **dimensions** (such as time, item, branch and location), stored in a **star**, **snowflake** or **fact constellation** schema, and analysed with the **OLAP operations** roll-up, drill-down, slice, dice and pivot. These are explained with diagrams in [Multidimensional Queries](/topics/dbms/database-design-tuning-and-security#multidimensional-queries).

### Applications and Uses of a Data Warehouse

Data warehouses are used in financial services, banking, consumer goods, retail and controlled manufacturing. Their applications are of three types:

1. **Information processing:** querying, basic statistical analysis and reporting with tables, crosstabs, charts and graphs.
2. **Analytical processing:** OLAP operations such as slice and dice, drill-down, roll-up and pivoting.
3. **Data mining:** finding hidden patterns and associations, building models, and classification and prediction (see [Data Mining](/topics/dbms/data-analysis-and-mining#data-mining)).

Benefits:

1. Fast, consistent access to integrated information improves business productivity.
2. A consistent view of customers and items helps customer relationship management.
3. Tracking trends over a long period reduces costs.
4. It keeps the organisation's history as a foundation for decision-making.

## Data Analytics {#data-analytics}

### Definition of Data Analytics

Data analytics is the process of examining raw data, using statistical and computational techniques, to find patterns, trends and insights that support decision-making.

It helps organisations understand past performance, monitor current trends and predict future outcomes. **Big data analytics** applies these techniques to very large and complex datasets (measured in terabytes or petabytes) with tools such as Hadoop and Spark.

Uses of data analytics:

1. **Decision-making:** gives clear facts and patterns for smarter choices.
2. **Problem solving:** shows what is going wrong and why.
3. **Identifying opportunities:** reveals trends and chances for growth.
4. **Improving efficiency:** reduces waste and saves time.

### Process of Data Analytics

1. **Data collection:** gather raw data from sources such as databases, websites, apps, surveys, sensors, social media and logs.
2. **Data storage and management:** store the data so that it can be retrieved for analysis (databases, data warehouses, HDFS, cloud storage such as Amazon S3).
3. **Data cleaning (preprocessing):** fix errors, handle missing values and noise, remove duplicates, and transform and normalise the data.
4. **Data analysis:** apply statistical methods, data mining and machine learning to find patterns and insights.
5. **Data visualisation:** present the results as charts, graphs and dashboards.
6. **Interpretation and decision-making:** stakeholders use the findings to make decisions; the process is repeated as new data arrives.

### Data Preprocessing

**Data preprocessing** is the step of cleaning and transforming raw data before analysis or modelling, so that missing values, noise, inconsistencies and duplicates do not mislead the results.

#### Handling Missing Values

1. **Deletion:** remove rows or columns with too many missing values (suitable only when few values are missing, at random).
2. **Mean, median or mode imputation:** fill a missing numeric value with the column's mean or median, and a missing categorical value with the mode (most common value).
3. **Forward or backward fill:** use the previous or next value; useful for time-series data.
4. **Predictive imputation:** predict the missing value from other columns with a model such as k-nearest neighbours or regression.
5. **Constant fill:** use a fixed value such as 0 or the label "Unknown".

Example: ages `25, 30, ?, 35, 40`. The mean of the known values is `(25 + 30 + 35 + 40) / 4 = 130 / 4 = 32.5`, so the missing age is filled with 32.5.

#### Handling Noise

**Noise** is random error or unwanted variation in data that hides the true pattern. Methods:

1. **Binning:** sort the values into bins and replace each value by the bin mean or median, smoothing local fluctuations.
2. **Regression:** fit a regression line and replace noisy points with the predicted values.
3. **Outlier detection:** find extreme values with the z-score or the interquartile range (IQR) and remove or cap them.
4. **Smoothing filters:** moving averages remove random spikes.
5. **Clustering:** values that do not belong to any cluster are treated as outliers.

**IQR method.** With `Q1` = first quartile, `Q3` = third quartile and `IQR = Q3 − Q1`, a value is an outlier if it is below `Q1 − 1.5 × IQR` or above `Q3 + 1.5 × IQR`.

Example: temperature readings `21, 22, 22, 23, 24, 25, 26, 500` (°C, sorted). Using the medians of the lower and upper halves:

1. `Q1` = median of `21, 22, 22, 23` = `(22 + 22) / 2 = 22`; `Q3` = median of `24, 25, 26, 500` = `(25 + 26) / 2 = 25.5`.
2. `IQR = 25.5 − 22 = 3.5`.
3. Lower fence = `22 − 1.5 × 3.5 = 16.75`; upper fence = `25.5 + 1.5 × 3.5 = 30.75`.
4. 500 is above 30.75, so it is an outlier (noise). It can be replaced by the median of the data, `(23 + 24) / 2 = 23.5`.

**Normalisation (min–max scaling)** rescales a value to the range 0 to 1: `x' = (x − min) / (max − min)`. For ages between 20 and 40, the age 25 becomes `(25 − 20) / (40 − 20) = 0.25`. (All three calculations were checked with a short program.)

### Types of Data Analytics

There are four types of data analytics:

![The four types of data analytics](/diagrams/artificial-intelligence/analytics-types.svg)

1. **Descriptive analytics** answers "What happened?". It summarises past data into reports and dashboards, for example a company's monthly income, profit and sales, or social media statistics.
2. **Diagnostic analytics** answers "Why did it happen?". It finds the root causes using drill-down and data mining. Example: an online shop finds that sales fell although customers still add items to their carts; analysis shows that the payment page was failing or shipping costs were too high.
3. **Predictive analytics** answers "What will happen?". It uses historical and current data with statistics, data mining and machine learning to forecast future outcomes, for example market and customer trends, or detecting likely fraudulent transactions.
4. **Prescriptive analytics** answers "What should we do?". It builds on descriptive and predictive analytics to recommend actions, often with AI and optimisation. Example: an airline automatically changes ticket prices according to demand, weather, season and location.

| Type | Question | Time focus | Techniques | Example |
| --- | --- | --- | --- | --- |
| Descriptive | What happened? | Past | Reports, dashboards, aggregation | Monthly sales report |
| Diagnostic | Why did it happen? | Past | Drill-down, data mining, correlation | Finding why sales fell |
| Predictive | What will happen? | Future | Machine learning, forecasting | Predicting customer churn |
| Prescriptive | What should we do? | Future | Optimisation, AI, simulation | Dynamic ticket pricing |

### Methods of Data Analysis

1. **Quantitative analysis:** works with numbers, using statistics such as means, hypothesis testing and sampling.
2. **Qualitative analysis:** works with words, pictures and symbols (interviews, diaries, behaviour), using methods such as narrative analysis, content analysis and grounded theory.

### Tools and Skills for Data Analytics

1. **Programming languages:** Python and R.
2. **Databases:** SQL.
3. **Big data tools:** Hadoop, Spark, Hive, NoSQL databases (see [Big Data Technologies](/topics/artificial-intelligence/big-data-technologies)).
4. **Spreadsheets:** Microsoft Excel.
5. **Visualisation and business intelligence:** Tableau, Power BI.
6. **Knowledge:** statistics and probability, machine learning, data management and data visualisation.

### Data Warehouse vs Data Analytics

| Point | Data warehouse | Data analytics |
| --- | --- | --- |
| What it is | A central store of integrated historical data | The process of examining data to find insights |
| Role | Provides clean, consistent data | Uses data to answer business questions |
| Main activities | ETL, storage, OLAP | Cleaning, analysis, modelling, visualisation |
| Output | Organised data, OLAP cubes, reports | Insights, predictions, recommendations |

## References {#references}

- TutorialsPoint — [Data Warehousing: Overview](https://www.tutorialspoint.com/dwh/dwh_overview.htm), [Architecture](https://www.tutorialspoint.com/dwh/dwh_architecture.htm), [Terminologies](https://www.tutorialspoint.com/dwh/dwh_terminologies.htm), [Data Marting](https://www.tutorialspoint.com/dwh/dwh_data_marting.htm), [Big Data Analytics: Overview](https://www.tutorialspoint.com/big_data_analytics/big_data_analytics_overview.htm), accessed 2026-11-06.
- TpointTech — [Data Warehouse Tutorial](https://www.tpointtech.com/data-warehouse), [Data Warehouse Architecture](https://www.tpointtech.com/data-warehouse-architecture), [ETL Process](https://www.tpointtech.com/etl-process), accessed 2026-11-06. TpointTech has no page on the types of data analytics.
- GeeksforGeeks — [ETL Process in Data Warehouse](https://www.geeksforgeeks.org/dbms/etl-process-in-data-warehouse/), [Data Warehouse Architecture](https://www.geeksforgeeks.org/dbms/data-warehouse-architecture/), [What is Data Analytics](https://www.geeksforgeeks.org/data-analysis/what-is-data-analytics/), accessed 2026-11-06.
- Programiz has no page on data warehousing or data analytics.
- Wikipedia — [Data warehouse](https://en.wikipedia.org/wiki/Data_warehouse) (history: Devlin and Murphy, 1988; Bill Inmon) and [Data mart](https://en.wikipedia.org/wiki/Data_mart) (dependent and independent data marts), accessed 2026-11-06.

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint says that the term "data warehouse" was "first coined by Bill Inmon in 1990". Wikipedia records that Inmon began to discuss the term in the 1970s and that Devlin and Murphy introduced the "business data warehouse" in 1988, as TpointTech also says. These notes give Inmon's definition and the 1988 Devlin–Murphy origin, without a "coined in 1990" claim.
2. TpointTech's data warehouse page opens by calling a data warehouse an RDBMS "construct to meet the requirement of transaction processing systems"; a data warehouse is designed for query and analysis, not transaction processing, as the same page says a few lines later.
3. TutorialsPoint's section "Types of Data Warehouse" actually lists the three types of data warehouse applications (information processing, analytical processing and data mining); they are presented here as applications.
4. TutorialsPoint's big data analytics page gives CSV files as an example of semi-structured data; CSV is tabular (structured) data, so XML and JSON are used as examples instead. The same page writes "perspective analytics" for prescriptive analytics.
5. TpointTech gives fixed sizes for data warehouses (more than 100 TB) and data marts (less than 10 TB); real sizes vary widely, so the table gives them only as typical ranges.
6. The preprocessing calculations were checked with a short program.
