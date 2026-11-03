---
description: The nature of software quality, external and internal qualities, product and process (project) qualities, the representative qualities (correctness, robustness, usability, maintainability, portability), quality models, and the measurement of quality.
updated: 2026-11-03
---

## Software Nature and Qualities {#software-nature-and-qualities}

### Definition of Software Quality

Software quality is the degree to which a software product meets its specified requirements and the expectations of its users. In the traditional sense, a quality product is "fit for purpose": it does exactly what the users want it to do, which for software means that it satisfies the requirements written in the Software Requirements Specification (SRS).

Fitness for purpose alone is an incomplete definition. A program can be functionally correct and still be a poor-quality product if, for example, its user interface is hard to use or its code is difficult to maintain. Software quality therefore covers several qualities (attributes), such as correctness, reliability, usability, efficiency, maintainability and portability.

### Nature of Software Qualities

Software is an intangible, logical product, so its qualities differ in nature from the qualities of physical products:

1. **Software qualities cannot be seen or touched directly.** They must be judged through the behaviour of the software and through its documents, such as the requirements, design and code.
2. **Software is easy to change, so its qualities are easily lost.** A change made without care can damage qualities that were present before, such as reliability or understandability.
3. **Qualities apply to every artifact, not only to the code.** Requirements, designs, test data and manuals are all part of the product and all have qualities.
4. **The importance of each quality depends on the application.** For example, response time is critical in a real-time system, while data integrity and security are critical in an information system.

A related distinction is between the quality of design and the quality of conformance:

1. **Quality of design** — the characteristics that the designers specify for the product, such as its functions, performance and tolerances.
2. **Quality of conformance** — the degree to which the finished product follows the design specification. The higher the conformance, the higher the quality of conformance.

### Classification of Software Qualities

Software qualities are classified in two ways (Ghezzi, Jazayeri and Mandrioli):

1. **External and internal qualities.**
2. **Product and process qualities** (explained in the next section, [Product Qualities and Project Qualities](#product-qualities-and-project-qualities)).

#### External and Internal Qualities

1. **External qualities** — qualities that are visible to the users of the system, such as reliability, usability and performance. Users judge a product by its external qualities.
2. **Internal qualities** — qualities that concern the developers and are not seen directly by users, such as verifiability and the structure of the code. Internal qualities help the developers achieve the external qualities; for example, a well-structured, verifiable design makes it easier to build reliable software.

#### Characteristics of Good Software

The characteristics of good software are grouped into three categories:

1. **Operational** — how well the software works in operation: budget, usability, efficiency, correctness, functionality, dependability, security and safety.
2. **Transitional** — how well the software can be moved from one platform to another: portability, interoperability, reusability and adaptability.
3. **Maintenance** — how well the software can keep working in a changing environment: modularity, maintainability, flexibility and scalability.

### Representative Software Qualities

The main qualities used to describe software are:

1. **Correctness** — the software behaves according to its functional requirements specification.
2. **Reliability** — the software fails rarely, so the user can depend on it.
3. **Robustness** — the software behaves reasonably even in situations that the requirements specification did not anticipate.
4. **Performance (efficiency)** — the software uses computing resources (CPU time, memory, disk space, network bandwidth) economically and responds within acceptable time.
5. **Usability (user-friendliness)** — users of different skill levels find the software easy to learn and use.
6. **Verifiability** — the properties of the software, such as its correctness or performance, can be checked easily.
7. **Maintainability** — the software can be changed easily after release, both to fix defects and to meet new requirements.
8. **Reusability** — parts of the software can be used, with little or no change, to build new products.
9. **Portability** — the software can run in different environments (hardware platforms and operating systems).
10. **Understandability** — the software and its documents are easy to understand.
11. **Interoperability** — the software can coexist and cooperate with other systems.
12. **Integrity (security)** — the software prevents unauthorized access to its programs and data.

Correctness, robustness, usability, maintainability and portability are explained in detail in [Correctness, Robustness, Usability, Maintainability, Portability](#correctness-robustness-usability-maintainability-portability).

#### Reliability vs Correctness

1. Correctness is an absolute quality: any deviation from the specification makes the software incorrect, however small it is.
2. Reliability is a relative quality: software can still be reliable if its failures are rare and not serious.
3. Correct software is always reliable, but reliable software is not necessarily correct.

### Software Quality Models

A quality model is a structured set of quality factors (characteristics) that is used to specify and evaluate software quality. The two best-known models are McCall's model and ISO/IEC 9126.

#### McCall's Quality Model

McCall's quality model (Jim McCall, 1977) describes software quality by eleven quality factors, grouped into three categories according to how the software is used.

![McCall's quality model: eleven quality factors in the product revision, product operation and product transition groups](/diagrams/software-engineering/mccall-model.svg)

**1. Product operation factors** (the operational characteristics of the software):

1. **Correctness** — the extent to which the software meets its specification and the user's objectives; its output is accurate, complete and available on time.
2. **Reliability** — the extent to which the software performs its intended functions without failure, stated as the maximum allowed failure rate.
3. **Efficiency** — the amount of computing resources (processing power, storage, communication capacity) and code that the software needs to perform its functions.
4. **Integrity** — the extent to which access to the software and its data by unauthorized persons can be controlled.
5. **Usability** — the effort required to learn, operate, prepare input for and interpret the output of the software.

**2. Product revision factors** (the ability to change the software):

1. **Maintainability** — the effort required to locate and fix an error in the software.
2. **Flexibility** — the effort required to modify the operational software for new circumstances, customers or business changes.
3. **Testability** — the effort required to test the software to ensure that it performs its intended functions.

**3. Product transition factors** (the ability to adapt the software to new environments):

1. **Portability** — the effort required to transfer the software from one hardware or software environment to another.
2. **Reusability** — the extent to which the software, or parts of it, can be reused in other applications.
3. **Interoperability** — the effort required to couple the software with another system.

In McCall's model the eleven factors are external qualities that users and managers care about. Each factor is broken down into lower-level, internal quality criteria that can be measured; for example, usability is broken down into operability, training, communicativeness, input/output volume and input/output rate.

#### ISO/IEC 9126 Quality Model

ISO/IEC 9126 is an international standard that describes software product quality by six characteristics, each with sub-characteristics:

| Characteristic | Meaning | Sub-characteristics |
| --- | --- | --- |
| Functionality | The software provides functions that meet stated and implied needs | Suitability, accuracy, interoperability, security, functionality compliance |
| Reliability | The software maintains its level of performance under stated conditions | Maturity, fault tolerance, recoverability, reliability compliance |
| Usability | The effort needed by users to use the software | Understandability, learnability, operability, attractiveness, usability compliance |
| Efficiency | The relationship between performance and the resources used | Time behaviour, resource utilization, efficiency compliance |
| Maintainability | The effort needed to make specified changes | Analyzability, changeability, stability, testability, maintainability compliance |
| Portability | The ability to transfer the software from one environment to another | Adaptability, installability, co-existence, replaceability, portability compliance |

ISO/IEC 9126 has been replaced by ISO/IEC 25010 (2011), which adds security and compatibility as separate main characteristics.

### Quality Requirements in Different Application Areas

The importance of each quality depends on the kind of application (Ghezzi, Jazayeri and Mandrioli):

1. **Information systems** (such as banking and library systems) — data integrity, security, data availability, transaction performance and ease of use by non-technical users.
2. **Real-time systems** (such as process-control and monitoring systems) — response within strict time limits (deadlines), and safety.
3. **Distributed systems** — the distribution of data and control among computers, fault tolerance and availability, because a failure of one part should not stop the whole system.
4. **Embedded systems** (such as software in aircraft, cars and appliances) — correct interfacing with hardware devices, reliability, robustness and safety, because the software is part of a larger device.

## Product Qualities and Project Qualities {#product-qualities-and-project-qualities}

Software qualities are classified into product qualities and process qualities. Process qualities are also called project qualities, because they describe how well the development project is carried out.

### Product Qualities

Product qualities are the qualities of the software product itself. They describe what the delivered software is like: for example, correctness, reliability, robustness, performance, usability, maintainability, reusability and portability.

The product is more than the code delivered to the customer. It includes every artifact produced during development, such as the requirements specification, the design documents, the source code, the test data and the user manuals. These artifacts are used by different people, so a product has different qualities for different users: for example, end users care about usability and reliability, while maintainers care about understandability and maintainability.

### Process (Project) Qualities

Process qualities are the qualities of the process (project) used to develop the software. They describe how the software is produced. The three main process qualities are:

1. **Productivity** — the efficiency of the process: how much useful output (software) is produced for a given amount of effort. Productivity is often measured as size per unit of effort, for example lines of code or function points per person-month, although such measures must be used with care.
2. **Timeliness** — the ability to deliver the product on time. A product that is delivered late may have lost its value, for example because a competitor has already released a similar product. Incremental delivery of the product helps achieve timeliness.
3. **Visibility** — the process is visible when all its steps and its current status are clearly documented, so that managers and developers can see the progress of the project and the effect of their decisions.

### Relationship Between Product and Process Qualities

Product and process qualities are closely related, because the quality of a product depends heavily on the quality of the process that produced it:

1. A good process tends to produce a good product; for example, a process with systematic reviews and testing produces more reliable software.
2. Some qualities apply to both: reliability, for example, can describe both the product and a repeatable process.
3. For this reason, quality management has moved from product assurance (inspecting finished products) to process assurance (improving the process), as in quality standards such as ISO 9001 and the Capability Maturity Model (CMM).

### Product Qualities vs Process Qualities

| Basis | Product qualities | Process (project) qualities |
| --- | --- | --- |
| Describe | The software product and its artifacts | The way the software is developed |
| Question answered | "What is the software like?" | "How well is the software being produced?" |
| Examples | Correctness, reliability, robustness, usability, maintainability, portability | Productivity, timeliness, visibility |
| Mainly seen by | Users and maintainers | Managers and the development team |
| Improved by | Good design, coding, testing and reviews | Good planning, process models, documentation and management |

## Correctness, Robustness, Usability, Maintainability, Portability {#correctness-robustness-usability-maintainability-portability}

### Correctness

Correctness is the quality of software that behaves according to its specification. A program is functionally correct if it provides exactly the functions stated in its functional requirements specification (the SRS).

1. Correctness is an absolute (yes-or-no) quality: any deviation from the specification, however small, makes the software incorrect.
2. Correctness is defined only with respect to a specification. If the specification is wrong or incomplete, a "correct" program can still fail to satisfy the user.
3. Correctness is established by testing (which can show the presence of errors) and by formal verification and proofs (which can show their absence), and it is helped by using proven algorithms and standard libraries.

### Robustness

Robustness is the quality of software that behaves reasonably even in circumstances that its requirements specification did not anticipate. A robust program does not crash or produce disastrous results when it receives incorrect input data or when a hardware or other failure occurs; instead, it detects the problem, rejects or filters out the bad data, reports the error and continues working or stops safely.

1. **Example:** a program that asks for a person's age should reject a negative number or a letter with an error message, instead of crashing or storing the invalid value.
2. **Robustness vs correctness:** correctness concerns behaviour in the situations described by the specification; robustness concerns behaviour outside them. If a requirement (such as "reject invalid input") is written into the specification, it becomes a matter of correctness.
3. Robustness is achieved by validating input, handling exceptions and designing for fault tolerance.

### Usability

Usability (user-friendliness) is the quality of software that its users find easy to learn and use. A usable product lets users of different skill levels, from novices to experts, invoke its functions easily.

1. Usability is subjective: what is friendly for an expert (for example, a command-line interface) may be difficult for a novice, who may prefer a graphical interface.
2. The user interface strongly affects usability, but usability also depends on consistent behaviour, helpful error messages, documentation and predictable performance.
3. In McCall's model, usability is measured by the effort needed to learn the software, operate it, prepare its input and interpret its output.

### Maintainability

Maintainability is the quality of software that can be modified easily after it has been released. Maintenance includes fixing errors, adding new features and changing existing functions, and it often accounts for more than half of the total cost of software.

Maintainability has two parts:

1. **Repairability** — the ease with which defects can be found and corrected within a reasonable time. It is improved by a modular structure, in which a defect is confined to one module.
2. **Evolvability** — the ease with which the software can be changed to meet new or changed requirements.

Maintenance is of three main types:

1. **Corrective maintenance** — removing errors that remain in the delivered software.
2. **Adaptive maintenance** — adjusting the software to changes in its environment, such as a new operating system or new hardware.
3. **Perfective maintenance** — changing the software to improve its qualities or to add new features requested by users.

Maintainability is improved by modular design, low coupling, clear documentation and readable code.

### Portability

Portability is the quality of software that can run in different environments with little or no modification. An environment includes the hardware platform, the operating system and other software with which the program works.

1. **Example:** a Java program compiled to bytecode can run on any computer that has a Java Virtual Machine, whereas a C program must be recompiled for each platform.
2. Portability is achieved by isolating environment-dependent parts (such as hardware access and operating-system calls) in a few modules, and by using standard languages and libraries.
3. Moving existing software to a new environment is usually cheaper than developing a new application.

### Comparison of the Five Qualities

| Quality | Question it answers | Seen mainly by | Example of poor quality |
| --- | --- | --- | --- |
| Correctness | Does it do what the specification says? | Users and testers | A payroll program computes tax with the wrong rate |
| Robustness | Does it behave sensibly in unexpected situations? | Users | The program crashes when a letter is typed into a number field |
| Usability | Is it easy to learn and use? | Users | Users cannot find how to save their work |
| Maintainability | Is it easy to fix and change? | Developers and maintainers | A small change requires editing dozens of unrelated modules |
| Portability | Can it run in another environment? | Developers and customers | The program runs only on one version of one operating system |

## Quality Measurements {#quality-measurements}

Quality measurement is the process of assigning numbers to the qualities of software, so that quality can be specified, compared and controlled objectively. A quality that is not measured cannot be managed: measurement shows whether the product meets its quality goals, where the weak areas are and whether the process is improving.

### Measuring Software Qualities

Some qualities can be measured directly, while others can only be measured indirectly:

1. **Direct measures** — values that can be counted or timed directly, such as lines of code, execution time, memory used, number of defects and time between failures.
2. **Indirect measures** — values derived from direct measures, such as defect density, reliability, maintainability and usability.

Qualities such as usability and understandability are partly subjective, so they are often measured by surveys, user tests and expert judgement. Quality goals should be stated in measurable terms — for example, "the mean time to failure must be at least 500 hours" instead of "the software must be reliable".

Each quality is commonly measured as follows:

1. **Correctness** — the number of defects per thousand lines of code (KLOC), counting defects reported after release over a standard period such as one year.
2. **Reliability** — the mean time to failure (MTTF) or mean time between failures (MTBF).
3. **Performance** — response time, throughput and resource utilization, measured by benchmarks, monitoring or simulation.
4. **Usability** — the time needed to learn the system, the time needed to perform tasks, the number of user errors and user-satisfaction surveys.
5. **Maintainability** — the mean time to change (MTTC), which is the average time needed to analyze a change request, design and implement the change, test it and deliver it to users.
6. **Integrity** — the ability of the system to withstand attacks, calculated from the probabilities of threat and security.

### Types of Software Metrics

A software metric is a quantitative measure of a property of software or of its development. Software metrics are of three types:

1. **Product metrics** — describe the characteristics of the product, such as its size, complexity, design features, performance and quality level.
2. **Process metrics** — describe the development and maintenance process, and are used to improve it; for example, the effectiveness of defect removal.
3. **Project metrics** — describe the project and its execution, such as the number of developers, staffing pattern, cost, schedule and productivity.

Software quality metrics are a subset of software metrics that focus on quality. They are of three types:

1. Product quality metrics.
2. In-process quality metrics.
3. Maintenance quality metrics.

### 1. Product Quality Metrics

#### Mean Time to Failure (MTTF)

MTTF is the average time for which the software runs before it fails. It is used mainly for safety-critical systems, such as avionics and air-traffic control.

> **MTTF = (sum of the operating times before each failure) ÷ (number of failures)**

**Example:** a system fails after running 100 hours, 150 hours and 200 hours in three test runs.

1. Sum of operating times = 100 + 150 + 200 = 450 hours.
2. MTTF = 450 / 3 = **150 hours**.

The detailed reliability measures (MTTF, MTTR, MTBF and availability) are explained in [Reliability and Quality Assurance](/topics/software-engineering/reliability-and-quality-assurance).

#### Defect Density

Defect density is the number of defects relative to the size of the software, where size is measured in thousands of lines of code (KLOC) or in function points.

> **Defect density = number of defects ÷ size in KLOC**

**Example:** 30 defects are found in a program of 15,000 lines of code.

1. Size = 15,000 / 1,000 = 15 KLOC.
2. Defect density = 30 / 15 = **2 defects per KLOC**.

#### Customer Problems (PUM)

The customer-problems metric counts all the problems that customers meet while using the software, including problems that are not defects (such as usability problems or unclear documentation). It is expressed as problems per user-month (PUM):

> **PUM = total problems reported by customers in a period ÷ total license-months of the software in that period**

> **License-months = number of installed licenses × number of months in the period**

**Example:** customers report 120 problems over 6 months, and 500 licenses are installed.

1. License-months = 500 × 6 = 3,000.
2. PUM = 120 / 3,000 = **0.04 problems per user-month**.

#### Customer Satisfaction

Customer satisfaction is measured by surveys on a five-point scale: very satisfied, satisfied, neutral, dissatisfied and very dissatisfied. The most commonly used metric is the percentage of satisfied customers (very satisfied plus satisfied).

**Example:** in a survey of 200 customers, 70 are very satisfied and 90 are satisfied.

1. Satisfied customers = 70 + 90 = 160.
2. Percentage satisfied = 160 / 200 × 100 = **80%**.

### 2. In-Process Quality Metrics

In-process quality metrics are collected during development to track and improve quality before the product is released. The four main metrics are:

1. **Defect density during testing** — the number of defects found per KLOC (or function point) during formal testing. A higher rate usually means that more errors were injected during development, unless the testing effort was unusually high.
2. **Defect arrival pattern** — the number of defects reported in each time interval (for example, each week) during testing, together with the backlog of open defects over time.
3. **Phase-based defect removal pattern** — the number of defects removed in each development phase, including design reviews, code inspections and testing.
4. **Defect removal effectiveness (DRE)** — the percentage of the defects present that are removed by the development process (or by one phase).

> **DRE = (defects removed during development ÷ defects latent in the product) × 100%**

The defects latent in the product are the defects removed during development plus the defects found later (for example, after release).

**Example:** 90 defects are removed before release, and users find 10 more after release.

1. Latent defects = 90 + 10 = 100.
2. DRE = 90 ÷ 100 × 100% = **90%**.

A higher DRE means that fewer defects escape to later phases or to the customer.

### 3. Maintenance Quality Metrics

Maintenance quality metrics measure how well defects are fixed after release. The four main metrics are:

1. **Fix backlog and backlog management index (BMI)** — the fix backlog is the number of reported problems still open at the end of a week or month. The BMI compares the problems closed with the problems that arrived:

> **BMI = (number of problems closed during the month ÷ number of problems arrived during the month) × 100%**

If BMI is greater than 100%, the backlog is decreasing; if it is less than 100%, the backlog is increasing.

**Example:** 50 problems arrive in a month, and 45 problems are closed. BMI = 45 / 50 × 100% = **90%**, so the backlog is increasing.

2. **Fix response time** — the mean time taken to fix problems, from the time a problem is opened to the time it is closed.
3. **Percent delinquent fixes** — the percentage of fixes that took longer than the agreed response time for their severity level:

> **Percent delinquent fixes = (number of fixes that exceeded the response-time criteria ÷ number of fixes delivered in the period) × 100%**

**Example:** 40 fixes are delivered in a month, and 6 of them exceeded the agreed response time. Percent delinquent fixes = 6 / 40 × 100% = **15%**.

4. **Fix quality** — the percentage of defective fixes, that is, fixes that did not solve the problem or that introduced a new defect. The goal is zero defective fixes and zero delinquent fixes.

### Other Quality Measures

#### Mean Time to Change (MTTC)

MTTC measures maintainability: it is the average time needed to analyze a change request, design and implement the change, test it and deliver it.

> **MTTC = total time spent on all changes ÷ number of changes**

**Example:** five changes take 4, 6, 8, 10 and 12 hours. MTTC = (4 + 6 + 8 + 10 + 12) / 5 = 40 / 5 = **8 hours**. A lower MTTC means a more maintainable program.

#### Integrity

Integrity measures the ability of a system to withstand attacks on its security. It is calculated from two probabilities:

1. **Threat** — the probability that an attack of a specific type will occur within a given time.
2. **Security** — the probability that an attack of that type will be repelled.

> **Integrity = Σ [1 − threat × (1 − security)]**

The sum is taken over each type of attack.

**Example:** for one type of attack, threat = 0.25 and security = 0.95.

1. 1 − security = 1 − 0.95 = 0.05.
2. threat × (1 − security) = 0.25 × 0.05 = 0.0125.
3. Integrity = 1 − 0.0125 = **0.9875 (about 0.99)**.

An integrity value close to 1 means that the system is well protected against that type of attack.

## References {#references}

**TutorialsPoint**

- [Software Engineering Overview](https://www.tutorialspoint.com/software_engineering/software_engineering_overview.htm) — accessed 2026-11-03 (characteristics of good software: operational, transitional and maintenance)
- [SE Quality Q & A #5](https://www.tutorialspoint.com/software_engineering/se_quality_qa5.htm) — accessed 2026-11-03 (software quality parameters, including correctness and robustness)
- [Software Quality Factors](https://www.tutorialspoint.com/software_quality_management/software_quality_management_factors.htm) — accessed 2026-11-03 (McCall's model)
- [Software Quality Metrics](https://www.tutorialspoint.com/software_quality_management/software_quality_management_metrics.htm) — accessed 2026-11-03 (product, in-process and maintenance quality metrics; the page prints the PUM formula with "+" between the total problems and the total license-months; PUM is a rate, problems divided by license-months, as written above)

**GeeksforGeeks**

- [Software Quality](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-quality/) — accessed 2026-11-03
- [McCall's Quality Model](https://www.geeksforgeeks.org/software-engineering/mccalls-quality-model/) — accessed 2026-11-03
- [ISO/IEC 9126 in Software Engineering](https://www.geeksforgeeks.org/software-engineering/iso-iec-9126-in-software-engineering/) — accessed 2026-11-03
- [Measuring Software Quality using Quality Metrics](https://www.geeksforgeeks.org/software-engineering/measuring-software-quality-using-quality-metrics/) — accessed 2026-11-03 (names MTTC, MTBF and MTTR as measures, without formulas)

**TpointTech**

- [Software Quality](https://www.tpointtech.com/software-engineering-software-quality) — accessed 2026-11-03 (fitness for purpose, quality factors, evolution from product assurance to process assurance)
- [Software Quality Assurance](https://www.tpointtech.com/software-quality-assurance) — accessed 2026-11-03 (quality of design and quality of conformance, measurable quality characteristics)
- [Characteristics of Software Engineering](https://www.tpointtech.com/characteristics-of-software-engineering) — accessed 2026-11-03 (usability, maintainability, portability)

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-03 (lists functionality, reliability, usability, efficiency, maintainability and portability as the qualities that testing checks; the page has no separate section on software qualities or quality measurement)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (the reference websites do not cover external and internal qualities, process qualities, robustness in detail, quality in different application areas, or the MTTC and integrity formulas)

- Carlo Ghezzi, Mehdi Jazayeri and Dino Mandrioli, *Fundamentals of Software Engineering*, 2nd edition, Prentice Hall, chapter 2, "Software: Its Nature and Qualities" — classification of software qualities, representative qualities, quality requirements in different application areas and measurement of quality ([table of contents at Pearson](https://www.pearson.com/en-us/subject-catalog/p/fundamentals-of-software-engineering/P200000003499/9780133056990))
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach*, "Measuring Quality" — correctness, maintainability (MTTC), integrity (threat and security) and usability measures
- Stephen H. Kan, *Metrics and Models in Software Quality Engineering*, 2nd edition, Addison-Wesley — product, in-process and maintenance quality metrics, including PUM, DRE and BMI
