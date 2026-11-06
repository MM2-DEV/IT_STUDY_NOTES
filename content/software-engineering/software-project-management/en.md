---
description: Software project management - concepts (the 4 Ps, W5HH, project manager, planning, scheduling with Gantt charts and the critical path), project metrics (size-oriented and function-oriented, function points), estimation (LOC, FP, three-point estimates, COCOMO and Putnam), and risk management (types of risk, risk exposure, RMMM).
updated: 2026-11-04
---

## Project Management Concepts {#project-management-concepts}

### Definition of Software Project Management

A **software project** is the complete procedure of software development, from requirements gathering to testing and maintenance, carried out within a specified time and budget to deliver the intended software product.

Software project management (SPM) is the planning, organizing, staffing, monitoring and controlling of a software project so that it delivers a quality product **on time, within budget** and according to the user's requirements.

### Need for Software Project Management

Software projects need special management because:

1. **Software is intangible** — its progress cannot be seen directly, so it is hard to monitor.
2. **Software development is a relatively new discipline**, with less experience to rely on than older engineering fields.
3. **Most software is custom-built** for a particular client's requirements.
4. **Technology changes rapidly**, so the experience of earlier projects may not apply.

These factors bring risk, so the project must be managed to balance its **scope (quality), time and cost** — the "triple constraint".

### The Management Spectrum: The 4 Ps

Effective software project management focuses on four Ps:

1. **People** — the most important element: the stakeholders (senior managers, project managers, practitioners, customers and end users) and the team, which must be recruited, organized and motivated.
2. **Product** — the software to be built: its objectives, scope and alternative solutions must be defined before the project is planned.
3. **Process** — the framework of activities (a process model) chosen for the project, through which the product is developed.
4. **Project** — the planned, controlled work that brings the people, product and process together; the project manager plans, monitors and controls it.

### W5HH Principle

The W5HH principle (Barry Boehm) is a set of seven questions that outline the key characteristics of a project and the plan for it:

1. **Why** is the system being developed? (the business reason)
2. **What** will be done? (the functions and tasks)
3. **When** will it be done? (the schedule and milestones)
4. **Who** is responsible for each function?
5. **Where** are they organizationally located?
6. **How** will the job be done technically and managerially?
7. **How much** of each resource is needed?

### Project Manager

A project manager is the person responsible for the planning, execution, monitoring, control and closure of a project. The responsibilities are of two kinds:

**Managing people:**

1. Act as the project leader and motivate the team.
2. Liaise with the stakeholders (the link between the client and the team).
3. Manage human resources and set up the reporting hierarchy.

**Managing the project:**

1. Define and set the project scope.
2. Plan, schedule and manage the project activities.
3. Monitor progress and performance.
4. Analyze risks at every phase.
5. Take the necessary steps to avoid or solve problems.
6. Act as the spokesperson for the project.

### Software Project Management Activities

The main project management activities are:

1. **Project planning** — the plan is made before development starts: the processes, resources, schedule and estimates.
2. **Scope management** — defines what is included in the project and what is not, divides the work into manageable parts, and controls changes to the scope.
3. **Estimation** — estimates the **size** (in KLOC or function points), **effort** (person-months), **time** (duration) and **cost** of the project (see [Estimation](#estimation)).
4. **Project scheduling** — decides when each task is done and by whom (see below).
5. **Resource management** — the people, tools and libraries are limited resources; they are allocated to tasks when needed and released when no longer required.
6. **Risk management** — identifies, analyses and controls the risks (see [Risk Management](#risk-management)).
7. **Execution and monitoring** — the planned tasks are carried out and progress is checked through **activity monitoring**, weekly **status reports** and **milestone checklists**.
8. **Communication management** — the right information reaches the right stakeholders at the right time: planning, sharing, feedback and closure.
9. **Configuration management** — controls changes to the requirements, design and code after they have been **baselined**, through a change-control process (identification, validation, analysis, control, execution and closing of each change request).

### Project Scheduling

Project scheduling is the process of dividing the project into tasks, estimating their durations and dependencies, and assigning start and finish dates and people to them.

The steps of project scheduling are:

1. Break the project down into smaller tasks — a **work breakdown structure (WBS)**.
2. Find the dependencies between the tasks.
3. Estimate the time each task will take.
4. Assign people and resources to the tasks.
5. Calculate the total duration of the project, and find the **critical path**.

#### Activity Network and Critical Path Method (CPM)

An activity network shows the tasks of a project and the order in which they depend on each other. The **critical path** is the **longest path** through the network: it decides the **minimum time** in which the project can be completed, and a delay in any task on it (a **critical task**) delays the whole project. A task that is not on the critical path has **slack (float)**: it can be delayed by that amount without delaying the project.

> **Project duration = length of the critical path (the longest path)**
>
> **Slack of a path = critical path length − length of the path**

**Example:** a project has four tasks: A (3 days); B (2 days) and C (4 days), which both need A; and D (2 days), which needs both B and C.

1. Path A–B–D = 3 + 2 + 2 = 7 days.
2. Path A–C–D = 3 + 4 + 2 = 9 days.
3. The longest path is **A–C–D**, so the critical path is A–C–D and the project needs **9 days**.
4. Task B has a slack of 9 − 7 = **2 days**.

![Activity network: A leads to B and C, which both lead to D; the critical path A–C–D takes 9 days](/diagrams/software-engineering/cpm-network.svg)

**PERT (Program Evaluation and Review Technique)** uses a similar network but estimates each task's time from three estimates (optimistic, most likely and pessimistic; see [Estimation](#estimation)).

#### Gantt Chart

A Gantt chart is a **bar chart** of the project schedule: each task is a horizontal bar on a time axis, starting at its start date and as long as its duration. It shows at a glance which tasks run when and in parallel, and it is used to track progress.

![Gantt chart: A from day 0 to 3, B from 3 to 5 with 2 days of slack, C from 3 to 7, D from 7 to 9](/diagrams/software-engineering/gantt-chart.svg)

## Project Metrics {#project-metrics}

### Definition of Software Metrics

Software measurement is the process of assigning numbers to the attributes of software products, processes and projects. A software metric is a quantitative measure of an attribute of software or of its development, used for planning, estimating, controlling and improving.

Measures are of two kinds:

1. **Direct measures** — measured directly: lines of code, execution speed, memory size, number of defects, cost and effort.
2. **Indirect measures** — derived from other measures: functionality, quality, complexity, efficiency, reliability and maintainability.

### Types of Software Metrics

Software metrics are of three types:

1. **Product metrics** — describe the characteristics of the product: size, complexity, design features, performance and quality (for example, defect density and cyclomatic complexity).
2. **Process metrics** — describe the effectiveness of the development process, and are used to improve it over the long term (for example, defect removal efficiency, lead time, defect injection rate).
3. **Project metrics** — describe the project and its execution, and are used to control the current project: staffing, cost, schedule, productivity and cost variance.

### Size-Oriented Metrics

Size-oriented metrics use the size of the software in **lines of code (LOC or KLOC = thousands of LOC)** to normalize other measures, so that projects of different sizes can be compared.

> **Productivity = KLOC ÷ effort (person-months)**
>
> **Quality = errors ÷ KLOC (or defects ÷ KLOC)**
>
> **Cost = cost ÷ LOC**
>
> **Documentation = pages of documentation ÷ KLOC**

**Example:** a project produced 20 KLOC with 5 person-months of effort, cost $100,000, had 40 errors and 300 pages of documentation.

1. Productivity = 20 ÷ 5 = **4 KLOC per person-month**.
2. Quality = 40 ÷ 20 = **2 errors per KLOC**.
3. Cost = $100,000 ÷ 20,000 LOC = **$5 per LOC**.
4. Documentation = 300 ÷ 20 = **15 pages per KLOC**.

**Advantages of LOC:** it is simple to count, and many estimation models use it.

**Disadvantages of LOC:**

1. It depends on the programming language: the same function needs more lines in assembly language than in a high-level language, so a less expressive language appears "more productive".
2. It penalizes well-designed, short programs.
3. It cannot be counted early, before the code exists.
4. It measures only length, not functionality or complexity.
5. There is no standard way of counting (comments, blank lines and declarations).

### Function-Oriented Metrics: Function Points

Function-oriented metrics use the **functionality** delivered by the software as the normalization value. The most widely used measure is the **function point (FP)**, proposed by **Allan J. Albrecht** at IBM in 1979 and later standardized by the International Function Point Users Group (IFPUG). It measures size from the user's point of view, is **independent of the programming language**, and can be counted from the requirements.

The function point count is based on five information domain components:

1. **External inputs (EI)** — inputs from the user or another system that enter the application (input screens, forms).
2. **External outputs (EO)** — outputs to the user or another system (reports, messages, output screens).
3. **External inquiries (EQ)** — on-line input–output pairs that retrieve data without changing it (queries).
4. **Internal logical files (ILF)** — logical groups of data maintained inside the application (files, database tables).
5. **External interface files (EIF)** — logical groups of data used by the application but maintained by another application.

Each component is counted and rated as simple (low), average or complex (high), with these weights:

| Component | Simple | Average | Complex |
| --- | --- | --- | --- |
| External inputs (EI) | 3 | 4 | 6 |
| External outputs (EO) | 4 | 5 | 7 |
| External inquiries (EQ) | 3 | 4 | 6 |
| Internal logical files (ILF) | 7 | 10 | 15 |
| External interface files (EIF) | 5 | 7 | 10 |

The 14 **general system characteristics** (value adjustment factors) are each rated from **0 (no influence) to 5 (essential)**:

1. Data communications.
2. Distributed data processing.
3. Performance.
4. Heavily used configuration.
5. Transaction rate.
6. On-line data entry.
7. End-user efficiency.
8. On-line update.
9. Complex processing.
10. Reusability.
11. Installation ease.
12. Operational ease.
13. Multiple sites.
14. Facilitate change.

> **UFP = Σ (count of each component × its weight)**
>
> **CAF = 0.65 + 0.01 × ΣFi**
>
> **FP = UFP × CAF**

where:

- **UFP** = unadjusted function points,
- **Fi** = the rating (0 to 5) of the i-th general system characteristic, so ΣFi is between 0 and 70,
- **CAF** = complexity adjustment factor (also called the value adjustment factor, VAF), between 0.65 and 1.35,
- **FP** = adjusted function points.

**Example:** a system has 50 external inputs, 40 external outputs, 35 external inquiries, 6 internal logical files and 4 external interface files, all of average complexity, and all 14 characteristics are rated 3 (average).

1. UFP = (50 × 4) + (40 × 5) + (35 × 4) + (6 × 10) + (4 × 7) = 200 + 200 + 140 + 60 + 28 = **628**.
2. ΣFi = 14 × 3 = 42.
3. CAF = 0.65 + 0.01 × 42 = 0.65 + 0.42 = **1.07**.
4. FP = 628 × 1.07 = **671.96 ≈ 672 function points**.

The function point count is then used like LOC for derived metrics: productivity = FP ÷ person-month, quality = errors ÷ FP, cost = cost ÷ FP and documentation = pages ÷ FP.

#### LOC vs Function Points

| Basis | Lines of code (LOC) | Function points (FP) |
| --- | --- | --- |
| Measures | Physical size of the code | Functionality delivered to the user |
| Language dependence | Depends on the language | Independent of the language |
| When it can be counted | Only after coding (or estimated) | Early, from the requirements |
| Ease of counting | Easy | Needs training and judgement |
| Point of view | Developer's | User's |
| Suitable for | Comparing projects in the same language | Comparing projects in different languages; early estimation |

## Estimation {#estimation}

### Definition of Software Project Estimation

Software project estimation is the process of predicting the **size, effort, time (duration) and cost** of a software project before (and during) its development. The estimates are the basis of the project plan, the schedule and the budget.

The four quantities are estimated in this order:

1. **Size** — in lines of code (KLOC) or function points.
2. **Effort** — in person-months (PM), derived from the size.
3. **Time (schedule)** — the duration in months, derived from the effort.
4. **Cost** — derived mainly from the effort (the cost of people), together with hardware, software licences, tools, training, travel and communication.

### Types of Estimation Techniques

Software estimation techniques are of two types:

1. **Decomposition techniques** — the project is divided into smaller parts (functions or activities), each part is estimated, and the estimates are added:
   1. **LOC-based estimation** — the size of each function is estimated in lines of code.
   2. **FP-based estimation** — the size is estimated in function points.
   3. **Process-based estimation** — the effort for each process activity (communication, planning, design, coding, testing) is estimated for each function.
2. **Empirical estimation models** — formulas derived from data on past projects compute the effort and time from the size:
   1. **COCOMO** (Barry Boehm) — explained in [COCOMO Model](/topics/software-engineering/software-cost-estimation-and-metrics#cocomo-model).
   2. **Putnam model (SLIM)** — explained below.

Estimates can also be made by **expert judgement** (for example, the Delphi technique, in which several experts estimate independently and then revise their estimates until they agree) and **by analogy** with completed similar projects.

### LOC-Based Estimation with Three-Point Estimates

Because a size estimate is uncertain, three estimates are made for each function — **optimistic (S_opt)**, **most likely (S_m)** and **pessimistic (S_pess)** — and combined into an expected value (the PERT formula):

> **S = (S_opt + 4 × S_m + S_pess) ÷ 6**

The effort and cost are then found from past productivity:

> **Effort (person-months) = Size ÷ Productivity**
>
> **Cost = Effort × cost per person-month**

**Example:** for a module, S_opt = 4,600 LOC, S_m = 6,900 LOC and S_pess = 8,600 LOC; the organization's productivity is 620 LOC per person-month, and one person-month costs $8,000.

1. S = (4,600 + 4 × 6,900 + 8,600) ÷ 6 = (4,600 + 27,600 + 8,600) ÷ 6 = 40,800 ÷ 6 = **6,800 LOC**.
2. Effort = 6,800 ÷ 620 = **10.97 ≈ 11 person-months**.
3. Cost = 10.97 × $8,000 = **$87,742** (about $12.90 per LOC).

### Putnam Model

The Putnam model (Lawrence Putnam, the basis of the SLIM tool) is an empirical model that relates the size of the software to the development effort and time, based on the **Rayleigh curve** of how staffing is distributed over a project:

> **L = Ck × K^(1/3) × td^(4/3)**, so **K = L³ ÷ (Ck³ × td⁴)**

where:

- **L** = size of the software in lines of code,
- **K** = total effort in person-years,
- **td** = development time in years,
- **Ck** = a technology (state-of-technology) constant: about 2,000 for a poor development environment, 8,000 for a good one and 11,000 for an excellent one.

**Example:** L = 40,000 LOC, Ck = 8,000, td = 2 years.

1. L ÷ Ck = 40,000 ÷ 8,000 = 5, so L³ ÷ Ck³ = 5³ = 125.
2. td⁴ = 2⁴ = 16.
3. K = 125 ÷ 16 = **7.81 person-years**.

Because the effort varies as **1 ÷ td⁴**, compressing the schedule increases the effort sharply: halving the development time multiplies the effort by 16.

## Risk Management {#risk-management}

### Definition of Risk

A risk is an **uncertain event or condition that, if it occurs, has a negative effect** on a project — on its schedule, cost, quality or success. A risk has two characteristics:

1. **Uncertainty** — the risk may or may not happen (there are no 100% probable risks).
2. **Loss** — if the risk happens, it causes unwanted consequences or losses.

**Risk management** is the process of **identifying, analysing, planning for and monitoring** the risks of a project, so that their probability or their effect is reduced.

### Types of Risks

**By what they threaten**, software risks are of three types:

1. **Project risks** — threaten the project plan: problems with the budget, schedule, staff, resources, customers and requirements. Example: an experienced developer leaves during the project.
2. **Technical risks** — threaten the quality and timeliness of the product: problems with design, implementation, interfaces, testing and maintenance, ambiguous or changing specifications, and new or untested technology. Example: a required tool or library does not perform as expected.
3. **Business risks** — threaten the viability of the product: building a product that nobody wants (market risk), a product that no longer fits the company's strategy, a product the sales force cannot sell, loss of management support or of the budget.

**By how predictable they are**, risks are of three types:

1. **Known risks** — risks that can be found by careful evaluation of the project plan and environment (for example, an unrealistic delivery date).
2. **Predictable risks** — risks predicted from experience of past projects (for example, staff turnover).
3. **Unpredictable risks** — risks that can occur but are extremely difficult to identify in advance.

Risks are also grouped by their source: technology, people, organizational, tools, requirements and estimation risks.

### Reactive and Proactive Risk Strategies

1. **Reactive strategy** — nothing is done about a risk until it causes a problem ("fire-fighting").
2. **Proactive strategy** — risks are identified and analysed **before** work starts, and plans are made to avoid or control them. Proactive risk management is the recommended approach.

### Risk Management Process

The risk management process has four steps:

1. **Risk identification** — list the possible risks to the project, using checklists, brainstorming, experience of past projects and interviews with stakeholders.
2. **Risk analysis (assessment)** — estimate the **probability** of each risk and the **impact (severity)** of its consequences, and calculate its **risk exposure**; then **prioritize** the risks (a **risk table** sorted by exposure).
3. **Risk planning** — decide how each important risk will be handled, with one of four strategies:
   1. **Avoid** — change the plan so that the risk cannot occur (for example, reduce the scope).
   2. **Transfer** — pass the risk to someone else (for example, outsource a risky part or buy insurance).
   3. **Reduce (mitigate)** — reduce the probability or the impact of the risk (for example, prepare backup staff).
   4. **Accept** — accept the risk and prepare a contingency plan in case it occurs.
4. **Risk monitoring** — track the identified risks throughout the project, watch for warning signs, check whether the mitigation steps are working, and look for new risks.

### Risk Exposure

Risk exposure (RE) measures the **expected loss** from a risk:

> **RE = P × C**

where:

- **P** = probability that the risk will occur (0 to 1),
- **C** = cost (impact) to the project if the risk occurs.

**Example:** there is a 60% probability that a key developer will leave, which would cost $50,000 (recruitment, training and delay). A second risk, a 30% probability that a third-party library must be replaced, would cost $20,000.

1. RE (developer leaves) = 0.6 × 50,000 = **$30,000**.
2. RE (library replaced) = 0.3 × 20,000 = **$6,000**.
3. The first risk has the higher exposure, so it is given priority.

The probability and impact can also be rated on a scale (for example, 1 to 10), and risks are ranked by **priority = probability × impact**.

**Risk leverage** shows whether a risk-reduction step is worth its cost:

> **Risk leverage = (RE before reduction − RE after reduction) ÷ cost of reduction**

**Example:** training a backup developer costs $5,000 and reduces the exposure of the first risk from $30,000 to $10,000. Risk leverage = (30,000 − 10,000) ÷ 5,000 = **4**; a value greater than 1 means the step is worth taking.

### RMMM Plan

The **RMMM (Risk Mitigation, Monitoring and Management) plan** documents all the work done on risks as part of the project plan; each risk may be recorded on a **risk information sheet (RIS)**. It has three parts:

1. **Risk mitigation** — the steps taken to **avoid** the risk or reduce its probability: identify its causes, remove them, control the related documents and hold timely reviews.
2. **Risk monitoring** — tracking the project to see whether the predicted risks occur, whether the mitigation steps are applied, and to collect data for future risk analysis.
3. **Risk management (contingency planning)** — the actions to take if mitigation fails and the risk **actually occurs**.

**Example — high staff turnover:**

1. **Mitigation:** find out why people leave and remove the causes that the project controls; spread knowledge across the team; set documentation standards; assign a backup person for every critical role.
2. **Monitoring:** watch the team's attitude, relationships, salary concerns and the availability of jobs outside.
3. **Management:** if people leave, use the backups and the documentation, move resources to fully staffed functions, and adjust the schedule so that new members can be trained.

The drawbacks of RMMM are that it adds cost and time to the project, it can become a large task in itself on big projects, and it does not guarantee a risk-free project.

## References {#references}

**TutorialsPoint**

- [Software Project Management](https://www.tutorialspoint.com/software_engineering/software_project_management.htm) — accessed 2026-11-04 (need for project management, the project manager, management activities, estimation of size, effort, time and cost, decomposition and empirical techniques including the Putnam model and COCOMO, scheduling, resource, risk, communication and configuration management)
- [Software Requirements](https://www.tutorialspoint.com/software_engineering/software_requirements.htm) — accessed 2026-11-04 (size, complexity, quality, process and resource metrics)

**GeeksforGeeks**

- [Software Project Management (SPM)](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-project-management-spm/) — accessed 2026-11-04
- [The Management Spectrum (4 Ps)](https://www.geeksforgeeks.org/4-ps-in-software-project-planning/) — accessed 2026-11-04
- [W5HH Principle](https://www.geeksforgeeks.org/w5hh-principle/) — accessed 2026-11-04
- [Software Measurement and Metrics](https://www.geeksforgeeks.org/software-engineering/software-measurement-and-metrics/) — accessed 2026-11-04 (product, process and project metrics; direct and indirect measures)
- [Calculation of Function Point (FP)](https://www.geeksforgeeks.org/software-engineering/software-engineering-calculation-of-function-point-fp/) — accessed 2026-11-04 (weights, the 14 characteristics, CAF and the worked example used here)
- [Risk Management](https://www.geeksforgeeks.org/software-engineering/software-engineering-risk-management/) — accessed 2026-11-04 (project, technical and business risks)
- [Steps of Risk Management Process](https://www.geeksforgeeks.org/risk-management-steps-in-software-engineering/) — accessed 2026-11-04 (avoid, mitigate, transfer, accept)
- [RMMM Plan](https://www.geeksforgeeks.org/software-engineering/risk-mitigation-monitoring-and-management-rmmm-plan/) — accessed 2026-11-04

**TpointTech**

- [Software Project Management Activities](https://www.tpointtech.com/software-project-management-activities) — accessed 2026-11-04 (project manager and activities)
- [Size-Oriented Metrics](https://www.tpointtech.com/software-engineering-size-oriented-metrics) — accessed 2026-11-04 (LOC-based metrics and their disadvantages)
- [Functional Point (FP) Analysis](https://www.tpointtech.com/software-engineering-functional-point-fp-analysis) — accessed 2026-11-04 (Albrecht, IFPUG, CAF range 0.65–1.35. Its weight table is misaligned — it gives external inputs the weights 7/10/15, which belong to internal logical files, and so on — and its worked example uses weights that match neither its own table nor the IFPUG table; the IFPUG weights given by GeeksforGeeks are used here)
- [Risk Management Activities](https://www.tpointtech.com/software-engineering-risk-management-activities) — accessed 2026-11-04 (risk identification by source, probability bands, priority = probability × severity, avoid/transfer/reduce, risk leverage)

**IT Job QnS**

- IT Job QnS has no page on software project management, metrics, estimation or risk management (checked 2026-11-04).

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (the reference websites do not give the critical path method, the three-point estimate, the Putnam formula, known/predictable/unpredictable risks or the risk exposure formula)

- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — the 4 Ps, W5HH, size- and function-oriented metrics, LOC- and FP-based estimation with three-point estimates, risk types, risk exposure and RMMM
- Lawrence H. Putnam, "A General Empirical Solution to the Macro Software Sizing and Estimating Problem", *IEEE Transactions on Software Engineering*, 1978 — the Putnam model
- International Function Point Users Group (IFPUG), *Function Point Counting Practices Manual* — function point weights and the 14 general system characteristics
