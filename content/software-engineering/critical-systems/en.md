---
description: Critical systems - types of critical systems, dependability and its attributes, fault avoidance, detection and tolerance (N-version programming and recovery blocks), risk-driven safety, security and reliability specification, and the dependable development of critical systems.
updated: 2026-11-04
---

## Critical System Design and Dependability {#critical-system-design-and-dependability}

### Definition of Critical System

A critical system is a system whose failure can cause **significant economic loss, physical damage, or a threat to human life**. Because the cost of its failure is very high, the most important property of a critical system is its **dependability**: users must be able to trust it.

### Types of Critical Systems

Critical systems are of three types:

1. **Safety-critical system** — a system whose failure may cause **injury, loss of life or serious environmental damage**. Examples: the control system of a chemical plant, an insulin pump, aircraft flight control, railway signalling.
2. **Mission-critical system** — a system whose failure may cause the **failure of an important goal-directed activity** (a mission). Examples: the navigation system of a spacecraft, a military command system.
3. **Business-critical system** — a system whose failure may cause **very high costs for the business** that uses it. Examples: the customer accounting system of a bank, an airline reservation system, a stock-trading system.

### Causes of System Failure

Critical systems can fail for three reasons:

1. **Hardware failure** — hardware fails because of design or manufacturing errors, or because components wear out.
2. **Software failure** — software fails because of errors in its specification, design or implementation.
3. **Operational failure** — human operators make mistakes; this is now the largest single cause of system failures.

For these reasons, critical systems are usually developed with **well-tried techniques** rather than new, untested ones, and the cost of verification and validation is very high (often more than half of the total development cost).

### Dependability

Dependability is the **trustworthiness** of a computer system: the degree of confidence a user has that the system will operate as expected and will not "fail" in normal use. It is not measured as a single number but is described by several related properties.

#### Attributes (Dimensions) of Dependability

Dependability has four principal attributes:

1. **Availability** — the probability that the system will be **up and running** and able to deliver useful services to users at a given point in time.
2. **Reliability** — the probability that the system will **correctly deliver services** as expected by users over a given period of time.
3. **Safety** — a judgement of how likely it is that the system will **cause damage** to people or to its environment; a safe system operates without catastrophic failure.
4. **Security** — a judgement of how likely it is that the system can **resist accidental or deliberate intrusions** (attacks); security includes integrity and confidentiality.

Other properties related to dependability are:

1. **Repairability** — the ease with which the system can be repaired after a failure.
2. **Maintainability** — the ease with which the system can be changed to meet new requirements.
3. **Survivability** — the ability of the system to continue delivering service while it is under attack or while part of it has failed.
4. **Error tolerance** — the ability of the system to avoid and tolerate errors made by its users.

#### Availability and Reliability

Availability and reliability are related but different. A system can be **available but unreliable** (it is running but often gives wrong results), or **reliable but not very available** (it rarely fails, but takes a long time to repair). Availability depends on how often the system fails **and** on how quickly it is repaired:

> **Availability = MTTF ÷ (MTTF + MTTR)**

where:

- **MTTF** (mean time to failure) = the average time the system runs before it fails,
- **MTTR** (mean time to repair) = the average time needed to repair the system after a failure.

**Example:** a system runs on average 950 hours before it fails, and a repair takes on average 50 hours.

1. MTTF + MTTR = 950 + 50 = 1000 hours.
2. Availability = 950 ÷ 1000 = **0.95**, so the system is available 95% of the time.

The reliability metrics (POFOD, ROCOF, MTTF and availability) are explained in detail in [Reliability and Quality Assurance](/topics/software-engineering/reliability-and-quality-assurance#software-reliability-and-availability).

#### Cost of Dependability

The cost of achieving dependability **increases very rapidly** as the required level of dependability rises: moving from medium to high to ultra-high dependability needs more expensive development techniques, more redundant hardware and much more testing and verification. For this reason, the required level of dependability must be specified realistically.

### Approaches to Dependable System Design

There are three complementary approaches to building dependable software:

1. **Fault avoidance (error avoidance)** — the design and implementation process avoids introducing faults: experienced developers, good software engineering methods and tools, formal specification and safe programming practices.
2. **Fault detection and removal** — verification and validation techniques (reviews, inspections, static analysis and testing) find faults before the system is put into use, and each fault found is removed and the system retested.
3. **Fault tolerance** — the system is designed so that faults that remain do not cause system failures: it detects errors and recovers from them while it is running.

Completely fault-free software is not practical to produce, so critical systems use all three approaches.

### Fault Tolerance

Fault tolerance is the ability of a system to **continue operating correctly even when faults occur** in its hardware or software. A fault-tolerant system can detect faults and recover from them without failing.

Fault tolerance involves four activities:

1. **Fault (error) detection** — the system detects that an incorrect state has occurred.
2. **Damage assessment** — the parts of the system state affected by the fault are found.
3. **Fault recovery** — the system is restored to a safe state, either **backward** (to a previously saved correct state) or **forward** (by correcting the damaged state).
4. **Fault repair** — the system is modified so that the fault does not happen again.

#### Techniques of Software Fault Tolerance

Software fault tolerance is based on **redundancy** (extra components) and **diversity** (components that do the same thing in different ways, so they are unlikely to fail in the same way). There are three main techniques:

**1. N-version programming:** N-version programming is a fault-tolerance technique in which **N (at least three) versions** of the same software are developed **independently** by different teams from the same specification, using different designs, algorithms or languages. All the versions are run **in parallel** on the same input, and an **output selector (voter)** compares their results and chooses the result produced by the **majority**. A faulty version is out-voted, so no time is lost in recovery.

![N-version programming: one input goes to three independently developed versions, and a majority voter selects the result](/diagrams/software-engineering/n-version.svg)

This is the software version of **triple modular redundancy (TMR)** used in hardware, where three identical components are used and a voter takes the majority output.

**2. Recovery blocks:** a recovery block is a fault-tolerance technique in which the system state is saved, a **primary algorithm** is executed, and its result is checked by an **acceptance test**. If the result passes the test, it is used; if it fails, the system **restores the saved state** and executes an **alternate algorithm** (a different implementation of the same function), and so on. If all the alternates fail, an exception is raised. The alternates are run **one after another** (sequentially).

![Recovery block: save state, run the primary algorithm, check with an acceptance test, and on failure restore state and try the next alternate](/diagrams/software-engineering/recovery-block.svg)

**3. Checkpointing and rollback recovery:** the state of the system is saved periodically (a **checkpoint**); after a failure or data corruption, the system is **rolled back** to the most recent checkpoint and continues from there, instead of starting again from the beginning. It is useful for long computations and transaction systems.

#### N-Version Programming vs Recovery Blocks

| Basis | N-version programming | Recovery blocks |
| --- | --- | --- |
| Execution of versions | In parallel | Sequentially (one after another) |
| Result selection | Voting (majority) by a common output selector | An acceptance test written for each block |
| Time to recover | No extra time; a faulty version is out-voted | Extra time to restore the state and run an alternate |
| Hardware needed | More (N processors, or N times the processing) | Less (one version runs at a time) |
| Suitability for real-time systems | Suitable | Less suitable, because of the delay of retries |
| Main weakness | Independently developed versions may still contain the same faults (common specification errors) | The acceptance test is hard to design and may itself be faulty |

#### Advantages and Disadvantages of Fault Tolerance

**Advantages:**

1. Improved reliability: the system keeps running despite faults.
2. Increased availability and reduced downtime.
3. Errors are contained, and their impact is limited.

**Disadvantages:**

1. Increased complexity of design, implementation and testing.
2. Increased cost (extra versions, hardware and expertise).
3. Overhead: error detection and recovery use processing time and resources.
4. False alarms may cause unnecessary recovery actions.

## Critical System Specification and Development {#critical-system-specification-and-development}

### Specification of Critical Systems

The specification of a critical system must state, in addition to its normal functions, what the system must do to avoid and handle failures. Its requirements are of two kinds:

1. **Functional requirements** — define the error checking, recovery and protection functions the system must provide (for example, "the system shall check that the dose is within the safe range").
2. **Non-functional requirements** — define the required reliability and availability, often as **"shall not"** requirements that state behaviour that is not allowed (for example, "the system shall not deliver a single dose greater than the maximum for a user").

### Risk-Driven Specification

Critical-system specification is **risk-driven**: the risks that the system faces are identified and analysed, and the requirements are written to avoid or reduce them. The risk-driven specification process has four stages:

1. **Risk (hazard) identification** — identify the potential risks (hazards) that may arise.
2. **Risk analysis and classification** — assess how likely and how serious each risk is, and classify it.
3. **Risk decomposition** — analyse each serious risk to find its possible **root causes**.
4. **Risk reduction assessment** — define how each risk will be eliminated or reduced; this produces the dependability requirements.

### Safety Specification

#### Safety Terms

| Term | Meaning |
| --- | --- |
| Accident (mishap) | An unplanned event that causes death, injury or damage to property or the environment |
| Hazard | A condition with the potential to cause or contribute to an accident (for example, a failure of the sensor that measures blood sugar) |
| Damage | A measure of the loss resulting from an accident |
| Hazard severity | An assessment of the worst possible damage that could result from a hazard |
| Hazard probability | The probability that the events that create a hazard will occur |
| Risk | A measure of the probability that the system will cause an accident; it combines hazard probability, hazard severity and the probability that the hazard will lead to an accident |

#### 1. Hazard Identification

Hazard identification finds the hazards that may threaten the system. Hazards are classed into types:

1. **Physical hazards** (for example, a robot arm striking a person).
2. **Electrical hazards** (for example, electric shock).
3. **Biological hazards** (for example, infection).
4. **Radiation hazards.**
5. **Service failure hazards** (for example, an insulin pump delivering a wrong dose).

#### 2. Risk Analysis and Classification

Each hazard is assessed by its **probability** and its **severity**, and its risk is placed in one of three regions of the **risk triangle**:

1. **Intolerable (unacceptable) region** — the risk cannot be accepted; the system must be designed so that the hazard cannot arise, or cannot cause an accident.
2. **ALARP region ("as low as reasonably practicable")** — the risk is tolerated only if reducing it further is impractical or too expensive; the design must reduce it as far as is reasonably practicable.
3. **Acceptable region** — the risk is negligible, and no special action is needed (but it should be reduced if this costs little).

![The risk triangle: unacceptable region at the top, ALARP region in the middle and acceptable region at the bottom](/diagrams/software-engineering/alarp.svg)

#### 3. Risk Decomposition: Fault Tree Analysis

Fault tree analysis (FTA) is a **top-down, deductive** technique for finding the root causes of a hazard. The hazard is placed at the root of the tree (the **top event**), and the conditions that could cause it are shown below it, linked by logical **OR** and **AND** gates, until the basic causes (the leaves) are reached. Hazards that can be caused in many ways (many OR gates) need special attention.

![Part of a fault tree for an insulin pump: the top event "incorrect insulin dose given" is caused by incorrect sugar measurement, wrong timing or delivery system failure, each with further causes](/diagrams/software-engineering/fault-tree.svg)

#### 4. Risk Reduction

Risks are reduced by three strategies, often used together:

1. **Hazard avoidance** — the system is designed so that the hazard cannot occur (for example, a cutting machine that works only when the operator uses both hands on two separate buttons).
2. **Hazard detection and removal** — the system detects the hazard and removes it before it causes an accident (for example, a chemical plant that detects excessive pressure and opens a relief valve).
3. **Damage limitation** — the system includes protection features that limit the damage if an accident occurs (for example, an automatic fire extinguisher in an aircraft engine).

### Security Specification

Security specification identifies the assets that must be protected and the requirements needed to protect them. It has five stages:

1. **Asset identification and evaluation** — identify the assets (data, programs) and their value.
2. **Threat analysis and risk assessment** — identify the possible threats and estimate their risks.
3. **Threat assignment** — relate each threat to the assets it affects.
4. **Technology analysis** — assess the available security technologies against the threats.
5. **Security requirements specification** — specify the security requirements, with the technologies that will be used.

The types of security requirements are:

1. **Identification** — the system must identify its users.
2. **Authentication** — the system must verify users' identities.
3. **Authorization** — the system must define and enforce the access privileges of users.
4. **Immunity** — the system must protect itself against infection by viruses and similar threats.
5. **Integrity** — the system must prevent data from being corrupted.
6. **Intrusion detection** — the system must detect attacks on it.
7. **Non-repudiation** — a party to a transaction must not be able to deny taking part in it.
8. **Privacy** — the system must maintain data privacy.
9. **Security auditing** — the system must allow its use to be audited and checked.
10. **System maintenance security** — the system must prevent authorized changes from accidentally weakening its security.

### Reliability Specification

Reliability requirements are specified **quantitatively**, with reliability metrics, so that they can be tested:

1. **POFOD (probability of failure on demand)** — the probability that the system fails when a service is requested; used for systems whose services are demanded at unpredictable times (for example, a protection system).
2. **ROCOF (rate of occurrence of failures)** — the number of failures in a given time or number of transactions; used for systems that receive regular requests (for example, a bank system).
3. **MTTF (mean time to failure)** — the average time between observed system failures; used for systems with long transactions.
4. **AVAIL (availability)** — the probability that the system is available for use at a given time; used for continuously running systems (for example, a telephone switch).

**Example — POFOD:** a protection system fails to respond 2 times in 1000 demands, so POFOD = 2 ÷ 1000 = **0.002**.

Failures are also classified so that different reliability requirements can be set for each class:

1. **Transient** — occurs only with certain inputs.
2. **Permanent** — occurs with all inputs.
3. **Recoverable** — the system can recover without operator intervention.
4. **Unrecoverable** — operator intervention is needed to recover.
5. **Non-corrupting** — the failure does not corrupt the system state or data.
6. **Corrupting** — the failure corrupts the system state or data.

The formulas and worked examples for these metrics are in [Reliability and Quality Assurance](/topics/software-engineering/reliability-and-quality-assurance#software-reliability-and-availability).

### Development of Critical Systems

#### Dependable Processes

Critical systems are developed with a **well-defined, repeatable process** that is designed to avoid, detect and remove faults. The characteristics of a dependable process are:

1. **Documentable** — the process has a defined model, with the activities and documents produced at each step.
2. **Standardized** — a standard set of development standards is followed.
3. **Auditable** — outside people can check that the process is being followed.
4. **Diverse** — it uses redundant and diverse verification and validation activities.
5. **Robust** — it can recover from failures of individual process activities.

The validation activities of a dependable process include requirements reviews, requirements management, **formal specification** (a mathematical model of the software), system modelling, design and code **inspections**, **static analysis**, test planning and management, and **configuration management**. Formal methods are used particularly for safety-critical systems, because they find specification and design errors early and allow correctness to be proved.

#### Dependable Programming Guidelines

Programming practices that reduce faults in critical systems are:

1. **Limit the visibility of information** — use information hiding, so that each component can access only the data it needs.
2. **Check all inputs for validity** — check that every input is in its expected format and range.
3. **Provide a handler for all exceptions** — every error condition must be handled, so that the system can recover or fail safely.
4. **Minimize the use of error-prone constructs** — avoid or limit `goto` statements, floating-point numbers, pointers, dynamic memory allocation, parallelism, recursion, interrupts, inheritance and aliasing.
5. **Provide restart capabilities** — keep copies of data so that a long operation can restart after a failure without starting from the beginning.
6. **Check array bounds** — check that every array access is within the bounds of the array.
7. **Include timeouts when calling external components** — a call to another system must not wait for ever.
8. **Name all constants that represent real-world values** — use named constants instead of numbers, so that they are changed in only one place.

Defensive programming — assuming that there may be undetected faults or inconsistencies, and including checks and exception handling for them — is the basis of these guidelines.

## References {#references}

**GeeksforGeeks**

- [Software Product – Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-product/) — accessed 2026-11-04 (dependability includes reliability, security and safety)
- [Getting High Reliability in Software](https://www.geeksforgeeks.org/software-engineering/getting-high-reliability-in-software/) — accessed 2026-11-04 (error avoidance, detection, removal and fault tolerance; its description of rollback recovery, "test the system each time it is accessed", is unclear, so the description of checkpointing and rollback from its fault-tolerance page is used here)
- [Basic Fault Tolerant Software Techniques](https://www.geeksforgeeks.org/software-engineering/basic-fault-tolerant-software-techniques/) — accessed 2026-11-04 (recovery blocks, N-version programming, checkpointing and rollback recovery; advantages and disadvantages)
- [Difference between N-version programming and Recovery blocks](https://www.geeksforgeeks.org/difference-between-n-version-programming-and-recovery-blocks-techniques/) — accessed 2026-11-04 (its table says recovery blocks cannot be applied to critical systems; they are used in critical systems, though their retry delay makes them less suitable for real-time ones)
- GeeksforGeeks has no page on critical-system types, hazard analysis, fault tree analysis or risk-driven specification (checked 2026-11-04).

**TutorialsPoint**

- [System Design – Reliability](https://www.tutorialspoint.com/system_analysis_and_design/system_design_reliability.htm) — accessed 2026-11-04 (reliability, MTBF and MTTR, redundancy and failover)
- TutorialsPoint has no page on critical systems, hazard analysis or fault tree analysis (checked 2026-11-04).

**TpointTech**

- [Software Fault Tolerance](https://www.tpointtech.com/software-engineering-software-fault-tolerance) — accessed 2026-11-04 (recovery blocks with an adjudicator, N-version software, their comparison; it spells the originator of recovery blocks "Randel" — Brian Randell)
- [Software Reliability Metrics](https://www.tpointtech.com/software-engineering-software-reliability-metrics) — accessed 2026-11-04 (POFOD for safety-critical systems)
- TpointTech has no page on critical-system types, hazard analysis or fault tree analysis (checked 2026-11-04).

**IT Job QnS**

- IT Job QnS has no page on critical systems (checked 2026-11-04).

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (the reference websites do not cover critical-system types, the attributes of dependability, risk-driven specification, safety and security specification, or dependable processes and programming guidelines)

- Ian Sommerville, *Software Engineering*, Pearson — "Critical Systems" (types of critical systems, dependability and its attributes), "Critical Systems Specification" (risk-driven specification, hazard analysis, ALARP, fault tree analysis, risk reduction, security and reliability specification) and "Critical Systems Development" (dependable processes, dependable programming, fault tolerance, N-version programming and recovery blocks)
- B. Randell, "System Structure for Software Fault Tolerance", *IEEE Transactions on Software Engineering*, 1975 (recovery blocks); A. Avižienis, "The N-Version Approach to Fault-Tolerant Software", *IEEE Transactions on Software Engineering*, 1985
