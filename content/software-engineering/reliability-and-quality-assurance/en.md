---
description: Software reliability and availability (reliability metrics MTTF, MTTR, MTBF, ROCOF, POFOD and availability, reliability growth models) and software quality assurance (SQA activities and techniques, QA vs QC, ISO 9000, the SEI CMM and CMMI, and Six Sigma), and software quality control, software quality metrics and software auditing.
updated: 2026-11-07
---

## Software Reliability and Availability {#software-reliability-and-availability}

### Definition of Software Reliability

Software reliability is the **probability of failure-free operation** of a software system for a specified period of time in a specified environment.

It describes how well the software continues to deliver its services correctly as it is used, and it is one of the main attributes of software quality and dependability (see [Critical Systems](/topics/software-engineering/critical-systems#critical-system-design-and-dependability)).

Reliability depends on the **operational profile** — how the software is actually used: a fault in a part of the program that users never execute does not reduce the reliability they observe, while a fault in a frequently used part reduces it greatly.

### Definition of Availability

Availability is the **probability that a system is up and able to deliver its services** at a given point in time (or the fraction of time it is available for use).

It depends both on how often the system fails and on **how quickly it is repaired** after a failure, so it includes planned and unplanned downtime.

### Factors Affecting Software Reliability

1. **Complexity** — the main cause of reliability problems; complex modules contain more faults (measured, for example, by McCabe's cyclomatic complexity).
2. **Errors in the specification**, or misunderstanding of it.
3. **Coding errors.**
4. **Inadequate testing.**
5. **Changes in the environment** — software that works in one environment may fail in another (for example, the Ariane 5 rocket failed in 1996 because control software reused from Ariane 4 could not handle Ariane 5's larger horizontal velocity).
6. **Misuse** of the software, and unforeseen situations.

### Software Reliability vs Hardware Reliability

| Basis | Hardware reliability | Software reliability |
| --- | --- | --- |
| Cause of failure | Physical wear-out, ageing, manufacturing defects | Design and coding faults |
| Failure over time | Follows the **bathtub curve**: high, then low and steady, then rising (wear-out) | Does not wear out; reliability usually **improves** as faults are found and removed |
| Effect of repair | A worn part is replaced with a new identical one; reliability returns to its earlier value | A fault is corrected; reliability may increase (or decrease if the fix introduces new faults) |
| Environmental factors | Temperature, dust, vibration affect it | Not affected by physical environment |
| Identical copies | Each copy can fail independently | Every copy contains the same faults |

### Reliability Metrics

Software reliability is measured with six metrics:

**1. MTTF (Mean Time To Failure)** — the average operating time from the start (or the end of a repair) until the next failure, that is, the time the system runs before it fails; it is measured in operating time, excluding the time for repairs.

> **MTTF = [(t₂ − t₁) + (t₃ − t₂) + … + (tₙ − tₙ₋₁)] ÷ (n − 1)**

where t₁, t₂, …, tₙ are the times at which the n failures occurred.

**Example:** failures occur at 10, 25 and 43 hours of operation. MTTF = [(25 − 10) + (43 − 25)] ÷ (3 − 1) = (15 + 18) ÷ 2 = **16.5 hours**.

**2. MTTR (Mean Time To Repair)** — the average time needed to find the cause of a failure and fix it.

> **MTTR = total repair (down) time ÷ number of repairs**

**3. MTBF (Mean Time Between Failures)** — the average time from one failure to the next, including the repair time; it is measured in real (calendar) time.

> **MTBF = MTTF + MTTR**

**Example:** with MTTF = 16.5 hours and MTTR = 1.5 hours, MTBF = 16.5 + 1.5 = **18 hours**.

**4. ROCOF (Rate of Occurrence of Failures)** — the number of failures in a given time interval (failure intensity); it suits systems that receive many regular requests, such as banking systems.

> **ROCOF = number of failures ÷ operating time**

**Example:** 6 failures in 1,200 hours of operation give ROCOF = 6 ÷ 1,200 = **0.005 failures per hour** (5 failures per 1,000 hours).

**5. POFOD (Probability Of Failure On Demand)** — the probability that the system will fail when a service is requested; it does not involve time, and it suits safety-critical systems whose services are demanded occasionally (for example, a protection or shutdown system).

> **POFOD = number of failed requests ÷ total number of requests**

**Example:** 3 failures in 200 requests give POFOD = 3 ÷ 200 = **0.015**. A POFOD of 0.001 means that about 1 request in 1,000 fails.

**6. AVAIL (Availability)** — the probability that the system is available for use at a given time; it suits continuously running systems such as telephone switches and operating systems.

> **Availability = MTTF ÷ (MTTF + MTTR) = MTTF ÷ MTBF**
>
> **Availability = uptime ÷ (uptime + downtime)**

**Example 1:** with MTTF = 16.5 hours and MTTR = 1.5 hours, availability = 16.5 ÷ 18 = **0.917 (91.7%)**.

**Example 2:** a system has an MTTF of 25 days (600 hours) and an MTTR of 6 hours. Availability = 600 ÷ (600 + 6) = 600 ÷ 606 = **0.990 (99%)**.

**Example 3:** an availability of 0.999 (99.9%) allows 0.001 × 365 × 24 = **8.76 hours** of downtime per year.

### Software Reliability Growth Models

A software reliability growth model is a mathematical model of how the reliability of software **improves over time** as faults are found and removed during testing. It is used to predict the reliability at the end of testing and to decide **how much more testing** is needed.

Reliability models are of two types:

1. **Prediction models** — use historical data from earlier projects and are made before development or testing, to predict reliability at a future time.
2. **Estimation models** — use failure data from the current project, collected during testing, to estimate the present or near-future reliability.

The well-known models are:

1. **Jelinski–Moranda model** — assumes that the failure rate is proportional to the number of faults remaining, and that each fault removed reduces the failure rate by the same amount.
2. **Basic execution time model (Musa)** — the failure intensity decreases linearly with the number of failures experienced.
3. **Goel–Okumoto model** — a non-homogeneous Poisson process model of the number of failures over time.
4. **Musa–Okumoto logarithmic model** — the failure intensity decreases exponentially with the failures experienced (later fixes give smaller improvements).

#### Basic Execution Time Model (Musa)

> **λ(μ) = λ₀ × (1 − μ ÷ ν₀)**
>
> **Additional failures to reach a target: Δμ = (ν₀ ÷ λ₀) × (λP − λF)**
>
> **Additional execution time: Δτ = (ν₀ ÷ λ₀) × ln(λP ÷ λF)**

where:

- **λ(μ)** = failure intensity (failures per CPU hour) after μ failures have been experienced,
- **λ₀** = initial failure intensity at the start of testing,
- **ν₀** = total number of failures expected in infinite time,
- **μ** = number of failures experienced so far,
- **λP** = present failure intensity, **λF** = target (final) failure intensity.

**Example:** λ₀ = 10 failures per CPU hour, ν₀ = 100 failures, and 50 failures have been experienced.

1. λ = 10 × (1 − 50 ÷ 100) = 10 × 0.5 = **5 failures per CPU hour**.
2. To reach a target of λF = 1 failure per CPU hour: Δμ = (100 ÷ 10) × (5 − 1) = **40 more failures** must be found and fixed.
3. Δτ = (100 ÷ 10) × ln(5 ÷ 1) = 10 × 1.609 = **16.1 more CPU hours** of testing.

### Improving Software Reliability

Reliability is improved by four kinds of techniques:

1. **Fault (error) avoidance** — using experienced staff, good methods, standards and CASE tools so that fewer faults are introduced.
2. **Fault detection** — finding faults by reviews, inspections and testing (including reliability testing with the operational profile).
3. **Fault removal** — correcting the faults found, and retesting.
4. **Fault tolerance** — designing the system to keep working despite faults (N-version programming, recovery blocks, checkpointing and rollback; see [Critical Systems](/topics/software-engineering/critical-systems#critical-system-design-and-dependability)).

## Quality Assurance {#quality-assurance}

### Definition of Software Quality Assurance

Software quality assurance (SQA) is a **planned and systematic set of activities** that gives adequate confidence that a software product, and the **process** used to produce it, conform to the established technical requirements and standards (IEEE).

SQA is **process-oriented** and **preventive**: it aims to prevent defects by defining and improving the development process, rather than only finding defects in the finished product.

Software quality and its factors are explained in [Software Qualities](/topics/software-engineering/software-qualities).

### Objectives of SQA

1. To give confidence that the software meets its functional and non-functional requirements.
2. To give confidence that the project keeps to its schedule and budget.
3. To ensure that the development and maintenance processes follow the defined standards and procedures.
4. To improve the efficiency of development, maintenance and SQA activities.

### SQA Activities

1. **SQA planning** — preparing the SQA plan: the quality goals, standards, procedures, reviews, audits and responsibilities for the project.
2. **Requirements review** — checking the requirements for correctness, completeness, consistency and testability.
3. **Process definition** — defining the procedures for development, documentation, coding, reviews and testing.
4. **Process monitoring** — checking that the defined processes and standards are followed.
5. **Reviews and inspections** — formal technical reviews of requirements, designs, code and documents, to find defects early.
6. **Auditing** — evaluating processes and work products against the standards and procedures.
7. **Verification and testing** — checking that the work products and the final product meet the requirements.
8. **Defect management** — recording, tracking, analysing and verifying the correction of defects.
9. **Process improvement** — measuring and improving the process.

### SQA Techniques

1. **Auditing** — the work products are inspected to check that the standards are followed.
2. **Reviewing (formal technical reviews)** — the work products are examined by a team of reviewers.
3. **Code and design inspections.**
4. **Walkthroughs.**
5. **Static analysis** — automated analysis of the code without executing it.
6. **Testing** — functional, path and stress testing.
7. **Standardization** — following standards such as ISO 9001, ISO/IEC 25010 and IEEE 730 (the IEEE standard for SQA processes).
8. **Six Sigma** — a statistical method of reducing defects (see below).

### Quality Assurance vs Quality Control

| Basis | Quality assurance (QA) | Quality control (QC) |
| --- | --- | --- |
| Focus | The **process** used to make the product | The **product** itself |
| Aim | To **prevent** defects | To **find (detect)** defects |
| Approach | Proactive | Reactive |
| Activities | Defining processes, standards, audits, reviews, training | Testing, inspection of the product |
| When | Throughout the life cycle, before and during development | Mainly after a work product is produced |
| Responsibility | The whole team and management | Mainly the testing team |
| Type | Verification-oriented ("are we doing the process right?") | Validation-oriented ("is the product right?") |
| Example | Defining a coding standard and a review process | Running test cases on the finished module |

Quality management has evolved in four stages: product **inspection**, **quality control** (finding defects and their causes), **quality assurance** (a good process gives a good product) and **total quality management (TQM)**, which improves all processes continuously through measurement.

### Software Quality Standards and Models

#### ISO 9000

ISO 9000 is a series of international standards for **quality management systems**, published by the International Organization for Standardization (ISO) from 1987.

It specifies the guidelines that an organization's **quality system** must follow — its organization, responsibilities, procedures and documentation — rather than the quality of the product itself. **ISO 9001** is the standard against which organizations are certified; it applies to organizations that design, develop, produce and service products, including software organizations. (Older versions also had ISO 9002, for production without design, and ISO 9003, for final inspection and testing only; they were merged into ISO 9001 in 2000.)

The steps of ISO 9001 certification are:

1. **Application** — the organization applies to an accredited registrar.
2. **Pre-assessment** — the registrar makes a rough assessment of the organization.
3. **Document review and adequacy audit** — the registrar reviews the quality documents and suggests improvements.
4. **Compliance audit** — the registrar checks that the suggestions have been carried out.
5. **Registration** — the certificate is awarded.
6. **Continued surveillance** — the registrar audits the organization periodically to keep the certificate valid.

#### Capability Maturity Model (CMM)

The Capability Maturity Model (CMM) is a framework, developed by the **Software Engineering Institute (SEI) at Carnegie Mellon University** in 1987 (published in 1991), for assessing and improving the **maturity of an organization's software process**.

It defines five maturity levels; an organization improves step by step from one level to the next.

![The five CMM maturity levels: Initial, Repeatable, Defined, Managed and Optimizing](/diagrams/software-engineering/cmm-levels.svg)

The five maturity levels of CMM are:

1. **Level 1 — Initial:** the process is ad hoc and chaotic; few processes are defined, and success depends on individual effort and skill. There are no key process areas.
2. **Level 2 — Repeatable:** basic project management is established to track cost, schedule and functionality, so earlier successes can be repeated on similar projects. Key process areas: requirements management, software project planning, project tracking and oversight, subcontract management, software quality assurance and software configuration management.
3. **Level 3 — Defined:** a standard, documented software process is used throughout the organization, and every project tailors it. Key process areas: organization process focus, organization process definition, training program, integrated software management, software product engineering, intergroup coordination and peer reviews.
4. **Level 4 — Managed:** detailed **quantitative measures** of the process and product quality are collected, and the process is controlled with them. Key process areas: quantitative process management and software quality management.
5. **Level 5 — Optimizing:** the process is **continuously improved** using quantitative feedback and new ideas and technologies. Key process areas: defect prevention, technology change management and process change management.

**CMMI (Capability Maturity Model Integration)**, released by the SEI in 2002, replaced CMM; it integrates software engineering, systems engineering and other disciplines, and offers both staged (maturity levels) and continuous (capability levels) representations. Its five maturity levels are Initial, Managed, Defined, Quantitatively Managed and Optimizing.

#### ISO 9000 vs SEI CMM

| Basis | ISO 9000 | SEI CMM |
| --- | --- | --- |
| Developed by | International Organization for Standardization | Software Engineering Institute (USA) |
| Nature | A set of standards for quality management systems | A model of process maturity levels |
| Main focus | The customer–supplier relationship; reducing the customer's risk in choosing a supplier | The supplier's own process improvement |
| Original domain | Manufacturing (later applied to software) | Specifically software development |
| Levels | One level: certified or not | Five maturity levels |
| Assessment | An audit for certification | An appraisal of maturity |
| Validity | Certificate valid for a period (renewed by surveillance audits) | No fixed validity period |
| Detail | General principles and guidelines | Detailed key process areas for each level |
| Recognition | Worldwide | Mainly in the USA and the software industry |
| Philosophy | Follow the standard to make results repeatable | Continuous improvement |

#### Six Sigma

Six Sigma is a **data-driven, statistical** method for improving quality by reducing the variation and defects in a process.

A process that operates at six sigma (six standard deviations between the mean and the nearest specification limit) produces no more than **3.4 defects per million opportunities** (allowing for the conventional 1.5σ long-term shift of the process mean), that is, it is (1 − 3.4 ÷ 1,000,000) × 100 = **99.99966%** defect-free.

Six Sigma uses two methods:

1. **DMAIC** — for improving an existing process: **D**efine, **M**easure, **A**nalyze, **I**mprove, **C**ontrol.
2. **DMADV** — for designing a new process or product: **D**efine, **M**easure, **A**nalyze, **D**esign, **V**erify.

## Software Quality Control (SQC) {#software-quality-control-sqc}

### Definition

**Software quality control (SQC)** is the set of product-focused activities that check software work products against the requirements and quality standards, find their defects and make sure the defects are corrected.

SQC compares the quality of what has been produced with the requirements and standards, and takes **corrective action** when the product does not conform. It is therefore **reactive (corrective)**, while software quality assurance (SQA) is **proactive (preventive)**. QC is a part (subset) of QA, and testing is a part of QC.

### Activities of SQC

1. **Inspections:** a formal examination of a requirements document, design or code by people other than the author, to find defects and violations of standards (planning, overview, preparation, inspection meeting, rework and follow-up).
2. **Reviews:** technical reviews, code reviews and walkthroughs of work products (see [Verification, Validation and Testing](/topics/software-engineering/verification-validation-and-testing)).
3. **Testing:** executing test cases on the product — unit, integration, system and acceptance testing.
4. **Checking the functionality** against the specified requirements.
5. **Recording and tracking defects**, getting them corrected and checking the corrections.
6. **Measuring quality** with metrics (such as defect density) and taking corrective action when the targets are not met.

### Differences Between SQA, SQC and Testing

The differences between quality assurance and quality control are given in [Quality Assurance](#quality-assurance). Testing fits in as follows:

| Basis | Quality assurance (SQA) | Quality control (SQC) | Testing |
| --- | --- | --- | --- |
| Focus | The process used to build the product | The product | The product |
| Aim | Prevent defects | Find and correct defects | Find defects by executing the software |
| Nature | Preventive, proactive | Corrective, reactive | Detective |
| Activities | Defining processes and standards, audits, training | Inspections, reviews, testing, defect tracking | Running test cases |
| Executes the software? | Generally no | Sometimes (testing) | Yes |
| Relationship | The widest | A subset of QA | A subset of QC |
| Example | Defining coding and testing standards | Inspecting the design; testing the login module | Executing the test cases of the payment module |

## Software Quality Metrics {#software-quality-metrics}

### Definition

**A software metric** is a quantitative measure of a characteristic of a software product, process or project that can be measured or counted.

**Software quality metrics** are the subset of software metrics that measure the quality of the product, the process and the project. Size and complexity metrics such as LOC, function points, Halstead's metrics and cyclomatic complexity are explained in [Software Cost Estimation and Metrics](/topics/software-engineering/software-cost-estimation-and-metrics).

### Types of Software Metrics

There are three types of software metrics:

1. **Product metrics:** describe the product — size, complexity, design features, performance and quality level (for example, LOC, function points, defect density, MTTF).
2. **Process metrics:** describe the development and maintenance process and are used to improve it (for example, defect removal efficiency, defect injection rate, the time taken to fix defects).
3. **Project metrics:** describe the project and its execution (for example, number of developers, staffing pattern, cost, schedule and productivity).

Software **quality** metrics are commonly grouped into three classes:

1. **Product quality metrics:** mean time to failure (MTTF), defect density, customer problems and customer satisfaction.
2. **In-process quality metrics:** defect density during testing, the defect arrival pattern during testing, the phase-based defect removal pattern and defect removal efficiency.
3. **Maintenance quality metrics:** the fix backlog and backlog management index, fix response time, percent delinquent fixes and fix quality.

### Product Quality Metrics

**1. Mean time to failure (MTTF):** the average time between failures; used mainly for safety-critical systems. Its formula and a worked example are in [Software Reliability and Availability](#software-reliability-and-availability).

**2. Defect density:**

> **Defect density = Number of defects ÷ Size of the software (in KLOC or function points)**

**Example:** five modules have 5, 10, 20, 15 and 5 defects, and sizes of 500, 1,000, 1,500, 1,500 and 1,000 LOC.

1. Total defects = 5 + 10 + 20 + 15 + 5 = **55**.
2. Total size = 500 + 1,000 + 1,500 + 1,500 + 1,000 = 5,500 LOC = **5.5 KLOC**.
3. Defect density = 55 ÷ 5.5 = **10 defects per KLOC**.

Measured by function points: 18 defects in a 240 FP system → 18 ÷ 240 = **0.075 defects per FP**.

**3. Customer problems metric (PUM — problems per user-month):**

> **PUM = Total problems reported by customers in a period ÷ Total license-months of the software in that period**

where **license-months = number of installed licenses × number of months in the period**, and the problems include both true defects and non-defect problems (such as usability problems).

**Example:** 200 licenses are used for 6 months, so license-months = 200 × 6 = **1,200**. Customers report 60 problems, so PUM = 60 ÷ 1,200 = **0.05 problems per user-month**.

**4. Customer satisfaction:** measured by customer surveys on a five-point scale — very satisfied, satisfied, neutral, dissatisfied and very dissatisfied. The results are reported as percent completely satisfied, percent satisfied (satisfied + very satisfied), percent dissatisfied (dissatisfied + very dissatisfied) and percent **non-satisfied** (neutral + dissatisfied + very dissatisfied); the last is used most often.

**Example:** 500 responses: 150 very satisfied, 250 satisfied, 50 neutral, 30 dissatisfied and 20 very dissatisfied.

1. Completely satisfied = 150 ÷ 500 = **30%**.
2. Satisfied = (150 + 250) ÷ 500 = **80%**.
3. Dissatisfied = (30 + 20) ÷ 500 = **10%**.
4. Non-satisfied = (50 + 30 + 20) ÷ 500 = **20%**.

### In-Process Quality Metrics

**Defect removal efficiency (DRE):** the share of the defects present that are removed by a phase or by the whole development process.

> **DRE = Defects removed (before release or in a phase) ÷ (Defects removed + Defects found later) × 100%**

**Example 1 (whole process):** 90 defects are found before release and 10 more are found by users after release, so DRE = 90 ÷ (90 + 10) × 100% = **90%**.

**Example 2 (one phase):** a design review removes 40 defects, and 10 more design defects are found later, so the design review's DRE = 40 ÷ (40 + 10) × 100% = **80%**.

### Maintenance Quality Metrics

**1. Backlog management index (BMI):**

> **BMI = Number of problems closed during the month ÷ Number of problem arrivals during the month × 100%**

If BMI is more than 100%, the backlog of problems is shrinking; if it is less than 100%, it is growing.

**Example:** 45 problems are closed and 50 arrive in a month → BMI = 45 ÷ 50 × 100% = **90%** (the backlog grows). If 60 are closed and 50 arrive → BMI = **120%** (the backlog shrinks).

**2. Fix response time:** the mean time from when a problem is opened to when it is closed. **Example:** fixes taking 2, 5, 3, 6 and 4 days → (2 + 5 + 3 + 6 + 4) ÷ 5 = 20 ÷ 5 = **4 days**.

**3. Percent delinquent fixes:**

> **Percent delinquent fixes = Number of fixes that took longer than the response-time target ÷ Number of fixes delivered × 100%**

**Example:** 8 of 40 fixes were late → 8 ÷ 40 × 100% = **20%**.

**4. Fix quality (percent defective fixes):** a fix is defective if it does not solve the problem or introduces a new defect. **Example:** 3 of 60 fixes were defective → 3 ÷ 60 × 100% = **5%**.

## Software Auditing {#software-auditing}

### Definition

**A software audit** is an independent examination of a software product or process, usually by a party outside the development team, to assess its compliance with specifications, standards, regulations, contracts or other criteria.

IEEE Std 1028 defines it as "an independent examination of a software product, software process, or set of software processes performed by a third party to assess compliance with specifications, standards, contractual agreements, or other criteria". An audit concentrates on **compliance**, not on the technical content of the work.

### Purpose of a Software Audit

1. To give an independent evaluation of whether products and processes conform to regulations, standards, guidelines, plans and procedures.
2. To check the testing process and suggest improvements.
3. To find gaps between the documented requirements and what was built.
4. To confirm that development follows the agreed guidelines and checklists, and to identify risks.
5. To report significant deviations from the process.
6. To avoid legal penalties for breaking regulations or licences.

### Types of Software Audits

By who carries out the audit:

1. **Internal (first-party) audit:** the organisation audits itself, usually through its SQA team.
2. **External audit by a customer (second-party audit):** a customer evaluates the supplier's quality system, or the organisation audits its own subcontractors and suppliers.
3. **External audit by a certification body (third-party audit):** an independent body, such as an ISO 9001 registrar, audits the organisation for certification.

By purpose:

1. **Compliance audit:** checks that the processes follow the required standards and rules.
2. **Process improvement audit:** examines the existing processes, finds problems and recommends improvements.
3. **Root cause analysis:** uses testing and analysis to find the root cause of specific problems.

### Steps of a Software Audit

1. **Define the objectives** and scope of the audit.
2. **Analyse the methodology** (for example, the testing method) and check that it follows the agreed plans and guidelines.
3. **Review the work products and records** — test plans, test cases, execution reports, defect reports, coverage and the traceability matrix.
4. **Interview** stakeholders and team members to understand the progress of the work.
5. **Report** the findings (deviations and recommendations) to management.
6. **Follow up** to check that the corrective actions have been carried out.

### IEEE 1028

**IEEE Std 1028, "Standard for Software Reviews and Audits"** (latest version 2008), defines five types of systematic reviews and their procedures:

1. Management reviews
2. Technical reviews
3. Inspections
4. Walk-throughs
5. Audits

The roles in an IEEE 1028 audit are:

1. **Initiator:** decides that an audit is needed and its purpose, scope and criteria, and receives the report.
2. **Lead auditor:** plans and leads the audit; must be free from bias.
3. **Recorder:** records anomalies, decisions and action items.
4. **Auditors:** examine the products and processes, record observations and recommend corrective actions.
5. **Audited organisation:** provides information and carries out the corrective actions.

### Differences Between a Software Audit and a Software Review

| Basis | Software audit | Software review |
| --- | --- | --- |
| Performed by | An independent (often external) party | Peers or team members; the author takes part |
| Purpose | Check compliance with standards, regulations, contracts and plans | Find defects and improve the technical quality of a work product |
| Focus | Conformance of the process and product | The technical content of documents and code |
| Formality | Formal, with an audit plan and a report | Informal to formal (walkthrough, technical review, inspection) |
| Timing | Periodically, at milestones or for certification | Throughout development, as early as possible |

## References {#references}

**TutorialsPoint**

- [Quality Assurance (Software Quality Management)](https://www.tutorialspoint.com/software_quality_management/software_quality_management_quality_assurance.htm) — accessed 2026-11-04 (IEEE definition and objectives of SQA)
- [Standards and Certificates](https://www.tutorialspoint.com/software_quality_management/software_quality_management_standards_and_certificates.htm) — accessed 2026-11-04 (ISO 9001, certification by periodic audits, CMM by the SEI, IEEE SQA standards)
- [System Design – Reliability](https://www.tutorialspoint.com/system_analysis_and_design/system_design_reliability.htm) — accessed 2026-11-04 (MTBF, MTTR, availability)
- [Software Quality Metrics](https://www.tutorialspoint.com/software_quality_management/software_quality_management_metrics.htm) — accessed 2026-11-04 (MTTF for safety-critical systems)
- [Software Testing – QA, QC & Testing](https://www.tutorialspoint.com/software_testing/software_testing_qa_qc_testing.htm) — accessed 2026-11-07
- [Software Quality Management – Quick Guide](https://www.tutorialspoint.com/software_quality_management/software_quality_management_quick_guide.htm) — accessed 2026-11-07 (quality control; quality metrics; internal and external audits)
- [Software Testing – Audit](https://www.tutorialspoint.com/software_testing_dictionary/audit.htm) — accessed 2026-11-07
- [What is the Role of Audits in Quality Management?](https://www.tutorialspoint.com/article/what-is-the-role-of-audits-in-quality-management) — accessed 2026-11-07

**GeeksforGeeks**

- [Reliability Attributes in Software Development](https://www.geeksforgeeks.org/reliability-attributes-in-software-development/) — accessed 2026-11-04 (ROCOF, MTTF with its example, MTTR, MTBF, POFOD, availability, factors affecting reliability; its MTTF formula is written up to tₙ₊₁ although the failure times end at tₙ — the corrected form is used here)
- [Software Quality Assurance](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-quality-assurance/) — accessed 2026-11-04 (SQA activities and techniques)
- [Capability Maturity Model (CMM)](https://www.geeksforgeeks.org/software-engineering/software-engineering-capability-maturity-model-cmm/) — accessed 2026-11-04 (levels, key process areas, CMM vs CMMI)
- [Difference between ISO 9000 and SEI-CMM](https://www.geeksforgeeks.org/difference-between-iso9000-and-sei-cmm/) — accessed 2026-11-04
- [Six Sigma in Software Engineering](https://www.geeksforgeeks.org/six-sigma-in-software-engineering/) — accessed 2026-11-04
- [Quality Assurance (QA) vs Quality Control (QC)](https://www.geeksforgeeks.org/differences-between-quality-assurance-and-quality-control/) — accessed 2026-11-07
- [Software Measurement and Metrics](https://www.geeksforgeeks.org/software-engineering/software-measurement-and-metrics/) — accessed 2026-11-07
- [Software Testing – Defect Density](https://www.geeksforgeeks.org/software-testing/software-testing-defect-density/) — accessed 2026-11-07 (the defect-density example)
- [Functional Testing Interview Questions](https://www.geeksforgeeks.org/software-testing/functional-testing-interview-questions/) — accessed 2026-11-07 (defect removal efficiency)
- [Software Review](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-review/) — accessed 2026-11-07 (software audit review)

**TpointTech**

- [Software Reliability Metrics](https://www.tpointtech.com/software-engineering-software-reliability-metrics) — accessed 2026-11-04 (MTTF, MTTR, MTBF, ROCOF, POFOD, availability; its heading "Mean Time Between Failure (MTBR)" should read MTBF)
- [Software Reliability Models](https://www.tpointtech.com/software-engineering-software-reliability-models) — accessed 2026-11-04 (prediction and estimation models; Jelinski–Moranda, basic execution time, Goel–Okumoto and Musa–Okumoto models)
- [ISO 9000 Certification](https://www.tpointtech.com/software-engineering-iso-9000-certification) — accessed 2026-11-04 (ISO 9001, 9002 and 9003, certification steps; it expands ISO as "International Standards Organization" — the official name is the International Organization for Standardization — and presents ISO 9002 and 9003 as current, although they were merged into ISO 9001 in 2000)
- [Software Quality Assurance](https://www.tpointtech.com/software-quality-assurance) — accessed 2026-11-04
- [Quality Assurance vs Quality Control](https://www.tpointtech.com/difference-between-quality-assurance-and-quality-control) — accessed 2026-11-07
- [Software Metrics in Software Engineering](https://www.tpointtech.com/software-engineering-software-metrics) — accessed 2026-11-07

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (for the formulas of the basic execution time model and the key process areas of each CMM level)

- [IEEE 1028-2008 — IEEE Standard for Software Reviews and Audits](https://standards.ieee.org/ieee/1028/4402/) — IEEE SA (the five review types) — accessed 2026-11-07
- [Software audit review](https://en.wikipedia.org/wiki/Software_audit_review) — Wikipedia (the IEEE 1028 definition of an audit and the audit roles) — accessed 2026-11-07
- S. H. Kan, *Metrics and Models in Software Quality Engineering*, 2nd ed., Addison-Wesley, 2002 — the classes of quality metrics, PUM, BMI and percent delinquent fixes
- John D. Musa, Anthony Iannino and Kazuhira Okumoto, *Software Reliability: Measurement, Prediction, Application*, McGraw-Hill, 1987 — the basic execution time model
- Mark C. Paulk et al., *The Capability Maturity Model: Guidelines for Improving the Software Process*, SEI / Addison-Wesley, 1995 — the five maturity levels and their key process areas
- Ian Sommerville, *Software Engineering* — reliability metrics and their uses

Issues found on the reference websites (SQC, quality metrics and auditing) and how they were resolved:

1. TutorialsPoint prints the customer-problems metric as "total problems + total license-months"; a rate per user-month is the problems divided by the license-months, as in S. H. Kan, Metrics and Models in Software Quality Engineering, which TutorialsPoint's material follows.
2. TutorialsPoint's QA/QC/Testing table calls testing "preventive"; testing executes the software to find (detect) defects, as GeeksforGeeks and TpointTech state.
3. GeeksforGeeks' defect-density page gives two contradictory "acceptable" benchmarks (1 defect per 1,000 LOC, and 0.1–0.5 defects per LOC), so no benchmark is given here.
4. None of the reference websites names first-, second- and third-party audits; TutorialsPoint lists internal audits, audits of suppliers, and external audits by customers and by certification bodies, which are the audits known by those names (ISO 19011 terminology).
5. TutorialsPoint's audit page lists review roles (manager, moderator, author, scribe); the audit roles are taken from IEEE Std 1028 (through Wikipedia).
