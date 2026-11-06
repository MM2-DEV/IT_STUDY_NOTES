---
description: Software maintenance - definition and need, types of maintenance (corrective, adaptive, perfective and preventive), maintenance activities, maintenance models, cost of maintenance with Boehm's annual change traffic model, and software re-engineering (reverse engineering, restructuring and forward engineering).
updated: 2026-11-04
---

### Definition of Software Maintenance

Software maintenance is the process of **modifying a software product after it has been delivered** to the users, to correct faults, to adapt it to a changed environment, to improve its performance or other qualities, or to add new features. It is the last and usually the longest phase of the software development life cycle, and it continues for as long as the software is in use.

Maintenance keeps the software useful as the needs of its users and its environment change; the reasons why software must keep changing are summarized by Lehman's laws of software evolution (see [History and Nature of Software Engineering](/topics/software-engineering/introduction-to-software-engineering#history-and-nature-of-software-engineering)).

### Need for Software Maintenance

Software must be maintained for the following reasons:

1. **To correct faults** — errors that remain after testing are found during use.
2. **Changes in market conditions** — new policies and rules (for example, a change in tax rates or bookkeeping rules) require the software to be changed.
3. **Client requirements** — users ask for new features and functions over time.
4. **Host modifications** — changes in the hardware, operating system or other software on which the system runs.
5. **Organizational changes** — business changes such as reorganization, mergers or entry into new markets.
6. **To improve the design and performance** of the software.
7. **To interface with other systems.**
8. **To migrate legacy software** to new platforms.

### Types of Software Maintenance

Software maintenance is of four types:

1. **Corrective maintenance** — modifications made to **correct faults (bugs)** discovered by users or reported in error reports after delivery.
2. **Adaptive maintenance** — modifications made to keep the software working in a **changed environment**, such as new hardware, a new operating system, new interfaces with other software, or new business rules and laws.
3. **Perfective maintenance** — modifications made to **add new features**, meet new user requirements, or **improve the performance**, reliability or other qualities of the software, so that it remains useful for a long time.
4. **Preventive maintenance** — modifications made to **prevent future problems**: faults that are not serious now but may become serious later are corrected, and the code and documents are improved (restructuring, refactoring, updating documentation) to make future maintenance easier.

Corrective maintenance is **reactive** (it fixes problems that have already occurred), while preventive maintenance is **proactive**. Perfective maintenance usually takes the largest share of the maintenance effort; one estimate gives perfective maintenance about 25–30%, corrective maintenance 20–25%, adaptive maintenance 15–20% and preventive maintenance 10–15% of the maintenance effort, with the figures varying between organizations.

### Software Maintenance Activities (Process)

The IEEE framework describes the maintenance process as eight activities, which may be repeated for each change request:

1. **Identification and tracing** — the need for a modification is identified (from a user request or from logs and error messages), and the request is classified by type of maintenance.
2. **Analysis** — the impact of the change on the system, including safety and security, is analyzed; the change is converted into a requirements specification, and its cost is estimated.
3. **Design** — new modules (or changes to existing ones) are designed, and test cases are prepared.
4. **Implementation** — the new modules are coded, and unit testing is done.
5. **System testing** — integration testing between the new and existing modules, followed by regression testing of the whole system.
6. **Acceptance testing** — the users test the modified system; their complaints are fixed or kept for the next iteration.
7. **Delivery** — the modified system is installed (as an update or a new installation), and training and user manuals are provided if needed.
8. **Maintenance management** — **configuration management** and **version control** tools manage the versions, revisions and patches of the software.

### Software Maintenance Models

The common software maintenance models are:

1. **Quick-fix model** — an ad hoc, "fire-fighting" approach: when a problem occurs, it is fixed as quickly as possible by changing the code directly, without analysing its effect on the design or updating the documents. It is fast and cheap, and suitable for urgent fixes in small programs, but the structure of the software degrades quickly with repeated changes.
2. **Iterative enhancement model** — maintenance is treated as iterative development, in three stages: analysis of the existing system, classification of the proposed modifications, and redesign and implementation of the requested modifications. The documents are updated at each iteration.
3. **Reuse-oriented model** — the parts of the old system that can be reused are identified and understood, modified as needed, and integrated into the new system.
4. **Boehm's model** (1983) — based on economic principles: proposed changes are evaluated by cost–benefit analysis, and approved changes are given budgets; management decisions drive a closed maintenance cycle.
5. **Taute maintenance model** — a cycle of eight phases:
   1. **Change request** — the customer submits a request, which is classified and given an identification number.
   2. **Estimate** — the effort, time and impact of the change are estimated.
   3. **Schedule** — the requests to be included in the next release are selected and planned.
   4. **Programming** — the code is modified and a test version is produced.
   5. **Test** — the change is tested, including regression testing.
   6. **Documentation** — the system and user documents are updated.
   7. **Release** — the new version is delivered, and users perform acceptance testing.
   8. **Operation** — the software is used normally until a new request starts the cycle again.

### Cost of Software Maintenance

Maintenance is the most expensive phase of the software life cycle: it usually accounts for **more than half** of the total cost of the software (estimates range from about 60% to 80%; one study gives up to 67%), and each year it may cost about 15–25% of the original development cost. Development may take one or two years, but maintenance can continue for 10–20 years.

**Factors that affect maintenance cost:**

**Non-technical (real-world) factors:**

1. The age of the software: old software built for slow hardware with little memory is hard to maintain, and old technology becomes more expensive to support.
2. Lack of experienced maintenance staff, who may work by trial and error.
3. Changes made without regard for the original structure, which make later changes harder.
4. Changes that are not documented.
5. The stability of the application domain and the rate of change of requirements.

**Technical (software) factors:**

1. Program structure, size and complexity.
2. The programming language used.
3. Dependence on the external environment.
4. Quality of the documentation.
5. Staff reliability and availability, and the use of tools (automated testing, version control, configuration management).

#### Boehm's Maintenance Cost Model (Annual Change Traffic)

Boehm's model, part of COCOMO, estimates maintenance effort from the **annual change traffic (ACT)** — the fraction of the software's source instructions that are changed (added, deleted or modified) in a year:

> **ACT = (KLOC added + KLOC deleted) ÷ KLOC total**
>
> **AME = ACT × SDE**

where:

- **ACT** = annual change traffic (a fraction),
- **KLOC added**, **KLOC deleted** = thousands of lines of code added and deleted in a year,
- **KLOC total** = total size of the software in thousands of lines of code,
- **AME** = annual maintenance effort (person-months),
- **SDE** = software development effort (person-months).

**Example 1 — ACT:** in a year, 2 KLOC are added to and 1 KLOC deleted from a 15 KLOC program.

1. ACT = (2 + 1) ÷ 15 = 3 ÷ 15 = **0.2** (20% per year).

**Example 2 — maintenance effort:** a product was developed with 700 person-months (PM) of effort, its ACT is 20% per year, and its lifetime is 15 years.

1. AME = 0.20 × 700 = **140 PM per year**.
2. Maintenance effort for 15 years = 15 × 140 = **2,100 PM**.
3. Total effort for the whole life = 700 + 2,100 = **2,800 PM**, so maintenance is 2,100 ÷ 2,800 = 75% of the total.

#### Belady–Lehman Maintenance Effort Model

> **M = P + K e^(C − D)**

where:

- **M** = total maintenance effort,
- **P** = productive effort (analysis, design, coding and testing of the change),
- **K** = an empirical constant,
- **C** = the complexity caused by poor design and documentation,
- **D** = the maintenance team's degree of familiarity with the software.

The effort grows **exponentially** when the complexity is high and the team is unfamiliar with the software. **Example:** with P = 100 person-hours, K = 1, C = 8 and D = 4: M = 100 + 1 × e⁴ = 100 + 54.6 = **154.6 person-hours**.

### Software Re-engineering

Software re-engineering is the process of **modifying existing (legacy) software to improve its structure and maintainability, without changing its functionality**. The software is redesigned and its programs are rewritten, often in a newer language or for a newer platform. For example, UNIX was first written in assembly language and later re-engineered in C, which made it easier to maintain and to port.

![Re-engineering: reverse engineering from the existing software to its specification, restructuring of the program and data, and forward engineering to the re-engineered software](/diagrams/software-engineering/reengineering.svg)

The re-engineering process has five steps:

1. **Decide what to re-engineer** — the whole system or a part of it.
2. **Reverse engineering** — recover the specification and design of the existing software.
3. **Program restructuring** — restructure the programs if needed (for example, convert function-oriented programs into object-oriented ones).
4. **Data restructuring** — restructure the data as required.
5. **Forward engineering** — build the re-engineered software from the recovered specification.

**Reverse engineering:** reverse engineering is the process of **analysing an existing system** (its code and design) to **recover its specification and design**. It works like the SDLC in reverse, moving from the low-level code up to higher levels of abstraction.

**Program restructuring:** program restructuring is the process of reorganizing and rebuilding existing code (or data), in the same language or by translating it into another, **without changing its functionality**, to improve its reliability and maintainability and to reduce its dependence on obsolete hardware. Components that fail often are good candidates for restructuring.

**Forward engineering:** forward engineering is the process of **building new software from the specification** obtained by reverse engineering, following the normal software engineering process.

#### Forward Engineering vs Reverse Engineering

| Basis | Forward engineering | Reverse engineering |
| --- | --- | --- |
| Direction | From requirements and design to code | From code to design and specification |
| Starts with | A specification | An existing system |
| Produces | A new system | The specification and design of the existing system |
| Abstraction | From high level to low level | From low level to high level |
| Purpose | To develop a system | To understand, document or re-engineer a system |

## References {#references}

**TutorialsPoint**

- [Software Maintenance Overview](https://www.tutorialspoint.com/software_engineering/software_maintenance_overview.htm) — accessed 2026-11-04 (reasons for maintenance, types of maintenance, cost and its real-world and software-end factors, IEEE maintenance activities, re-engineering, reverse engineering, program restructuring and forward engineering)

**GeeksforGeeks**

- [Software Maintenance](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-maintenance/) — accessed 2026-11-04 (need, types, challenges, advantages and disadvantages)
- [Cost and Efforts of Software Maintenance](https://www.geeksforgeeks.org/software-engineering/cost-and-efforts-of-software-maintenance/) — accessed 2026-11-04 (cost factors and percentages; the model M = P + K e^(C − D))
- [Boehm's Software Maintenance Model](https://www.geeksforgeeks.org/software-engineering/boehms-software-maintenance-model/) — accessed 2026-11-04 (ACT and AME; the page writes the ACT formula without brackets, which would read as KLOC added + (KLOC deleted ÷ KLOC total); the sum of the added and deleted code is divided by the total, as written here)
- [Quick-fix Model](https://www.geeksforgeeks.org/software-engineering/software-engineering-quick-fix-model/) — accessed 2026-11-04
- [Taute Software Maintenance Model](https://www.geeksforgeeks.org/taute-software-maintenance-model/) — accessed 2026-11-04

**TpointTech**

- [Software Maintenance in Software Engineering](https://www.tpointtech.com/software-engineering-software-maintenance) — accessed 2026-11-04 (definition, need, the four types, difficulties of maintenance; it describes preventive maintenance as keeping the system from becoming obsolete through reverse engineering and re-engineering, and describes perfective maintenance as "restricting" the software — most likely a misprint for "restructuring"). Its separate page on maintenance cost factors (training.tpointtech.com) could not be opened (the address did not resolve, checked 2026-11-04).

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-04 (corrective, perfective and adaptive maintenance; maintenance as the last SDLC stage)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for this topic (checked 2026-11-04).

**Additional sources** (the reference websites do not describe the iterative enhancement and reuse-oriented maintenance models)

- K. K. Aggarwal and Yogesh Singh, *Software Engineering*, New Age International — software maintenance models (quick-fix, iterative enhancement, reuse-oriented, Boehm's and Taute's models) and maintenance cost estimation
- Barry W. Boehm, *Software Engineering Economics*, Prentice Hall, 1981 — annual change traffic and the COCOMO maintenance effort model
