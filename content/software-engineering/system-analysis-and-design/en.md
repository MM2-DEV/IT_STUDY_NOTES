---
description: System analysis and design - system concepts, characteristics, elements and types of systems, types of information systems, the role of the system analyst, the phases of system development, feasibility study, fact-finding techniques, data flow diagrams, data dictionary, decision tables and decision trees, and system implementation and conversion methods.
updated: 2026-11-04
---

## System Concepts and Characteristics {#system-concepts-and-characteristics}

### Definition of System

A system is an organized group of **interrelated and interdependent components** that work together, according to a plan, to achieve a **common objective**. A business information system, for example, is made of people, procedures, data, software and hardware that work together to support the business.

**System analysis** is the process of studying an existing system (or a problem) to understand how it works, identify its problems and determine the requirements of a new system. **System design** is the process of planning the new system — its architecture, components, data, interfaces and procedures — to meet those requirements.

### Constraints of a System

1. A system must have some **structure and behaviour**, designed to achieve a predefined objective.
2. Its components must be **interconnected and interdependent**.
3. The **objectives of the organization as a whole** have priority over the objectives of its subsystems.

### Characteristics of a System

1. **Organization** — the structure and order of the components, which helps the system achieve its objectives.
2. **Interaction** — the way in which the components operate with each other.
3. **Interdependence** — the components depend on each other; the output of one subsystem is often the input of another.
4. **Integration** — the parts work together as a whole, even though each has its own function.
5. **Central objective** — the goal of the system, which must be known early in the analysis.

### Elements of a System

1. **Input** — the data, materials or energy that enter the system.
2. **Processor** — the component that transforms the inputs into outputs.
3. **Output** — the useful results produced by the processing.
4. **Control** — guides the system: it decides how input, processing and output are carried out.
5. **Feedback** — information about the output that is returned to the control; **positive feedback** reinforces the performance, and **negative feedback** gives information for corrective action.
6. **Environment** — the external "supersystem" in which the system works, which affects its functioning.
7. **Boundaries and interface** — the boundary separates the system from its environment; the interface is the point at which the system connects with other systems.

### Types of Systems

Systems are classified in seven ways:

1. **Physical or abstract** — physical systems are tangible (computers, equipment); abstract systems are conceptual (models, formulas, plans).
2. **Open or closed** — an open system interacts with its environment (receives inputs and gives outputs, such as a business); a closed system is isolated from its environment.
3. **Adaptive or non-adaptive** — an adaptive system responds to changes in its environment; a non-adaptive system does not.
4. **Permanent or temporary** — a permanent system lasts a long time (a business policy); a temporary system exists for a short, specific period (a project).
5. **Natural or manufactured** — natural systems are created by nature (the solar system); manufactured systems are made by people (a computer system).
6. **Deterministic or probabilistic** — a deterministic system behaves in a predictable way (a computer program); a probabilistic system's behaviour can be predicted only with some probability (weather).
7. **Social, human–machine or machine** — a social system is made of people; a human–machine system has both people and machines (most information systems); a machine system works without human involvement.

### System Models

1. **Schematic model** — a two-dimensional chart of the elements of a system and their links.
2. **Flow system model** — shows the flow of material, energy or information (for example, PERT).
3. **Static system model** — shows one pair of relationships at one time (for example, a Gantt chart).
4. **Dynamic system model** — shows a system that changes continuously (for example, a business with inputs, processing and outputs).

## Types of Information Systems {#types-of-information-systems}

### Definition of Information System

An information system is an organized combination of **people, hardware, software, data, procedures and communication networks** that collects, processes, stores and distributes information to support the operations, management and decision-making of an organization.

### Categories of Information

Information in an organization is of three categories, used at three levels of management:

1. **Strategic information** — for long-range planning by **top management**; supported by **decision support systems (DSS)** and executive support systems.
2. **Managerial (tactical) information** — for short- and medium-term planning and control by **middle management**; supported by **management information systems (MIS)**.
3. **Operational information** — for day-to-day operations by **lower (operational) management**; supported by **data processing (transaction processing) systems**.

### Types of Information Systems

Information systems are of seven main types, by the level of the organization they serve:

1. **Transaction processing system (TPS)** — records and processes the routine, day-to-day **transactions** of the business and updates its records; it is used by operational staff and supports the other systems with data. It works in batch mode or on-line (OLTP). Examples: billing, payroll, stock control, bank deposits and withdrawals, airline reservations.
2. **Office automation system (OAS)** — supports office work and communication: word processing, spreadsheets, e-mail, scheduling and document management.
3. **Knowledge work system (KWS)** — supports professionals (engineers, scientists, designers) in creating new knowledge; for example, CAD systems.
4. **Management information system (MIS)** — converts the data from transaction processing systems into **summarized, routine reports** (summary, scheduled, on-demand and exception reports) for **middle managers**, for planning, controlling and decision-making about routine, structured problems. Examples: sales management and human resource management reports.
5. **Decision support system (DSS)** — an **interactive** system that gives managers data, models and analysis tools to make **semi-structured and unstructured** decisions; users take part in building it. Examples: financial planning, loan approval analysis, "what-if" analysis.
6. **Executive support system (ESS) / executive information system (EIS)** — gives **top management** easy access to summarized internal and external information, through graphs and dashboards, for **strategic** decisions.
7. **Expert system (ES)** — an artificial-intelligence-based system that **mimics the decision-making of a human expert** in a narrow field, using a **knowledge base** of facts and rules and an **inference engine** that reasons with them. Examples: medical diagnosis, fault diagnosis.

#### MIS vs DSS

| Basis | Management information system (MIS) | Decision support system (DSS) |
| --- | --- | --- |
| Users | Middle managers | Middle and top managers, analysts |
| Decisions supported | Structured, routine | Semi-structured and unstructured |
| Output | Fixed, scheduled reports | Interactive analysis, "what-if" results |
| Flexibility | Low | High |
| Orientation | Past and present (control) | Future (planning) |
| Data source | Mainly internal (from TPS) | Internal and external |

## Role of the System Analyst {#role-of-the-system-analyst}

### Definition of System Analyst

A system analyst is a person who studies an organization's systems and problems, determines the requirements of a new or improved information system, and designs it, acting as the **link (bridge) between the users and management on one side and the programmers on the other**. The system analyst is the key person in system development and an agent of change in the organization.

### Roles of the System Analyst

1. **Change agent** — introduces and manages changes in the organization's methods and systems.
2. **Investigator and monitor** — studies the existing system to find problems and their causes.
3. **Architect** — designs the logical and physical structure of the new system.
4. **Psychologist and motivator** — understands people, handles their resistance to change and motivates them to accept the new system.
5. **Intermediary and diplomat** — communicates between users, management and programmers, and resolves conflicts between them.
6. **Sales person** — "sells" the proposed system to management and users.

### Responsibilities of the System Analyst

1. Defining and understanding the user's requirements through **fact-finding**.
2. Prioritizing the requirements by agreement with the users.
3. Gathering the facts and opinions of users.
4. Evaluating alternative solutions, choosing the best one and quantifying its costs and benefits (**feasibility study**).
5. Preparing clear, precise **specifications** for users and programmers.
6. Producing a modular **logical design** of the system.
7. Planning testing, implementation, user training and conversion.
8. Evaluating the system after it has been in use, and planning modifications.

### Skills (Attributes) of a System Analyst

The skills of a system analyst are of four kinds:

1. **Interpersonal (communication) skills** — communicating with users and programmers, leading small teams, managing expectations, teaching and motivating.
2. **Analytical skills** — understanding systems, identifying and solving problems, systems thinking, and judging trade-offs.
3. **Management skills** — understanding the organization's terminology and practices; managing resources, projects, risk and change.
4. **Technical skills** — knowledge of computers, software, databases, networks, system design tools (CASE tools) and emerging technologies.

## System Development Phases in System Analysis and Design {#system-development-phases-in-system-analysis-and-design}

The system development life cycle (SDLC) is the process of developing an information system through a sequence of phases, from the study of the problem to the operation and maintenance of the new system. In system analysis and design it has five main phases:

1. **Feasibility study (preliminary investigation and planning)**
   1. The problem and the scope of the existing system are defined.
   2. The objectives of the new system are outlined.
   3. The feasibility of the new system is checked, and a project schedule is made.
   4. Constraints, integration and security are considered.
   5. **Output:** a feasibility report (system proposal).
2. **System analysis and requirements specification**
   1. Information is gathered by fact-finding techniques and validated.
   2. The requirements are defined, prototypes may be built, and alternatives are evaluated and ranked.
   3. The information needs of end users are studied.
   4. **Output:** the Software Requirements Specification (SRS), with the software, hardware, functional and network requirements.
3. **System design**
   1. The application, network, databases, user interfaces and system interfaces are designed.
   2. The SRS is converted into a detailed logical (and then physical) design.
   3. Contingency, training, maintenance and operation plans are made.
   4. **Output:** the design document.
4. **Implementation (coding, testing and installation)**
   1. The design is coded as programs.
   2. The modules are integrated and **tested** according to a test plan.
   3. The system is **installed** at the user's site, data is converted, users are trained and the old system is changed over to the new one (see [System Implementation and Conversion Methods](#system-implementation-and-conversion-methods)).
5. **Maintenance and support**
   1. Users are supported (by telephone or on site).
   2. Remaining errors are corrected, and changes and new requirements are implemented after deployment.
   3. The system is evaluated after implementation (post-implementation review).

## Feasibility Study: Technical, Economic, Operational {#feasibility-study-technical-economic-operational}

### Definition of Feasibility Study

A feasibility study is a **preliminary investigation** that evaluates whether a proposed system is **worth developing and can be developed** with the available technology, budget, time and people. Its aim is to define the scope of the problem and to recommend whether to continue — not to solve the problem. Its output is a **feasibility report (system proposal)** that management uses to decide.

### Types of Feasibility

The three main types of feasibility are:

1. **Technical feasibility** — whether the proposed system can be developed with the **available or obtainable technology**: hardware, software, network and technical expertise; whether the existing resources are enough or must be upgraded; and whether the system can be integrated with existing systems.
2. **Economic feasibility (cost–benefit analysis)** — whether the **benefits** of the system are greater than its **costs**, so that the investment is justified. It compares the development and operating costs with the tangible and intangible benefits, using measures such as the payback period and the return on investment (ROI).
3. **Operational feasibility** — whether the system will **work in the organization** and be **accepted and used** by its users and management: whether it solves the business problem, whether users will accept the changed methods, and whether it can be operated and maintained.

Other types of feasibility are:

1. **Schedule feasibility** — whether the system can be completed within the required time.
2. **Legal feasibility** — whether the system conflicts with laws, regulations, contracts or data-protection rules.
3. **Behavioural feasibility** — how the employees will react to the new system, and whether they need training or job changes.

#### Economic Feasibility: Cost–Benefit Calculation

> **Payback period = initial investment ÷ annual net benefit**
>
> **ROI = (total benefits − total costs) ÷ total costs × 100%**

**Example:** a new system costs Tk 5,00,000 to develop and gives a net benefit (savings minus running costs) of Tk 2,00,000 per year for 5 years.

1. Payback period = 5,00,000 ÷ 2,00,000 = **2.5 years**.
2. Total benefits in 5 years = 5 × 2,00,000 = Tk 10,00,000.
3. ROI = (10,00,000 − 5,00,000) ÷ 5,00,000 × 100% = **100%**, so the system is economically feasible.

### Steps of a Feasibility Study

1. Form a project team and appoint a project leader.
2. Study the present system and prepare system flowcharts.
3. Identify the deficiencies of the current system and set the goals of the new one.
4. Identify alternative solutions (candidate systems).
5. Assess the technical, economic and operational feasibility of each alternative.
6. Weigh the performance and cost-effectiveness of each alternative.
7. Rank the alternatives and select the best one.
8. Prepare and present the **feasibility report (system proposal)** to management.

The outcome is a decision to **go** (continue), **no-go** (abandon the project) or **revise the scope**.

## Fact-Finding Techniques {#fact-finding-techniques}

### Definition of Fact-Finding

Fact-finding (requirements gathering) is the process of collecting information about the existing system, its problems and the requirements of the new system, from users, managers and documents. It is used mainly in the feasibility study and the system analysis phase.

### Types of Fact-Finding Techniques

The main fact-finding techniques are:

#### 1. Interviews

The analyst meets users and managers face to face and asks them questions.

1. **Structured interview** — uses a fixed set of standard questions, in a set order, with predefined answer choices or short answers.
2. **Unstructured interview** — uses open-ended questions in a free, conversational style.

**Advantages:** gives direct, in-depth information and the users' opinions; the analyst can ask follow-up questions and observe reactions; builds a good relationship with users.

**Disadvantages:** time-consuming and costly; the answers depend on the interviewer's skill and may be biased; not practical for many people.

#### 2. Questionnaires

A written list of questions is given to many people to answer.

1. **Open-ended questionnaire** — the respondents answer in their own words.
2. **Closed questionnaire** — the respondents choose from given answers (yes/no, multiple choice, rating scales).

**Advantages:** cheap and quick for a large or scattered group; answers can be anonymous and analysed statistically.

**Disadvantages:** the response rate may be low; there is no chance to ask follow-up questions; questions may be misunderstood; it is hard to design good questionnaires.

#### 3. Review of Records, Procedures and Forms (Document Analysis)

The analyst studies the organization's existing documents: reports, forms, manuals, procedures, policies and files.

**Advantages:** gives facts about the current system quickly, and helps the analyst understand it before meeting users.

**Disadvantages:** the documents may be out of date or incomplete, and they do not show how work is actually done.

#### 4. Observation

The analyst watches the users at work in their real environment.

**Advantages:** shows how the system really works, including tasks that users forget to mention.

**Disadvantages:** time-consuming; people may behave differently when they are watched; observer bias.

#### 5. Joint Application Development (JAD)

JAD is a structured **workshop** in which users, managers and analysts work together, led by a facilitator, to define the requirements.

**Advantages:** reaches agreement quickly; gives better requirements and reduces conflicts.

**Disadvantages:** needs skilled facilitation; dominant participants may overshadow others; it is hard to bring all the key people together.

Other techniques include **prototyping** (users try a working model) and background **research** on similar systems.

## Data Flow Diagram (DFD) {#data-flow-diagram-dfd}

### Definition of DFD

A data flow diagram (DFD) is a **graphical representation of the flow of data through a system**: it shows where the data comes from, how it is processed, where it is stored and where it goes. It shows **what** the system does with data, not **how** (it shows no control logic or timing). DFDs were developed for structured analysis by Larry Constantine, Ed Yourdon and Tom DeMarco.

### Components (Symbols) of a DFD

| Component | Meaning | Yourdon–DeMarco symbol | Gane–Sarson symbol |
| --- | --- | --- | --- |
| External entity (source or sink) | A person, organization or system outside the system that sends or receives data | Rectangle (square) | Rectangle (square) |
| Process | A function that transforms input data into output data; named with a verb phrase | Circle (bubble) | Rounded rectangle |
| Data flow | Data moving between components; labelled with a noun | Arrow | Arrow |
| Data store | Data held for later use (file, database table); named with a noun | Two parallel lines | Open-ended rectangle |

### Rules for Drawing DFDs

1. Every process must have at least one input and one output data flow.
2. Every data store must have at least one data flow in and one data flow out.
3. Data cannot flow directly between two external entities.
4. Data cannot flow directly between an external entity and a data store; it must pass through a process.
5. Data cannot flow directly between two data stores.
6. Each data flow is labelled with a short descriptive name; processes are named with verb phrases, and data stores and entities with nouns.
7. Data flows should not cross each other where possible.

### Levels of DFD

1. **Level 0 DFD (context diagram)** — shows the whole system as a **single process**, with its external entities and the main data flows; it defines the system boundary.
2. **Level 1 DFD** — divides the single process into its **major processes** (numbered 1, 2, 3 …), with the data stores.
3. **Level 2 DFD** — divides each level 1 process into more detailed sub-processes (numbered 1.1, 1.2 …).

**Balancing:** the inputs and outputs of a process must be the same as the inputs and outputs of its lower-level (child) diagram.

![Context diagram of a library system: the library system as one process exchanging data with the member, librarian, publisher and management](/diagrams/software-engineering/context-diagram.svg)

A level 1 DFD example (order processing) is shown in [System Modeling and Design](/topics/software-engineering/system-modeling-and-design#system-models-context-behavioral-and-object-models).

### Logical DFD vs Physical DFD

| Basis | Logical DFD | Physical DFD |
| --- | --- | --- |
| Shows | What the system does (business activities and data) | How the system is implemented |
| Implementation details | None (independent of technology) | Shows hardware, software, files, programs and people |
| Used by | Analysts and users, to understand the business | Developers, to build the system |
| Example process | "Verify customer" | "Run customer check program on the server" |

### Advantages of DFDs

1. They are easy for users to understand.
2. They show the boundaries and the data flows of the system clearly.
3. They support top-down decomposition into levels.

## Data Dictionary {#data-dictionary}

### Definition of Data Dictionary

A data dictionary is a **structured repository of information about the data** of a system ("data about data", **metadata**): it lists and defines **every data element, data flow, data store and process** that appears in the DFDs, with its name, aliases, type, length, range of values, composition and description. It gives the whole project a **common, standard vocabulary** for its data.

### Contents of a Data Dictionary

1. **Data elements** — the smallest units of data (fields), such as ISBN or price: name, type, length and allowed values.
2. **Data structures** — groups of data elements, such as a customer record.
3. **Data flows** — the data moving between processes, with their source and destination.
4. **Data stores** — files and tables, with their contents.
5. **Processes** — a description of each process.

### Data Dictionary Notation

| Symbol | Meaning | Example |
| --- | --- | --- |
| = | is composed of | `grossPay = regularPay + overtimePay` |
| + | and | `name = firstName + lastName` |
| [ \| ] | either … or (selection) | `payment = [cash \| card]` |
| { } | iteration (repeated, zero or more times) | `order = customer + {item}` |
| ( ) | optional | `address = street + city + (postcode)` |
| \* \* | comment | `* price in taka *` |

**Example entry:**

```text
book            = ISBN + title + {author} + publisher + (edition)
ISBN            = 10 or 13 digits
title           = 1 to 60 characters
```

### Types of Data Dictionary

1. **Active data dictionary** — maintained automatically by the database management system; it is updated whenever the database structure changes.
2. **Passive data dictionary** — maintained manually and separately from the database, so it must be updated by hand.

### Advantages of a Data Dictionary

1. It ensures that all developers use the same names and definitions for data (consistency).
2. It improves communication between analysts, users and programmers.
3. It helps to find duplicate or conflicting data definitions.
4. It supports database design and maintenance.

## Decision Tables and Decision Trees {#decision-tables-and-decision-trees}

Decision tables and decision trees are tools of structured analysis for specifying **complex decision logic**: which actions are taken for which combinations of conditions.

### Decision Table

A decision table is a **table (matrix)** that shows all the combinations of **conditions** and the **actions** to be taken for each combination. It has four parts:

1. **Condition stub** (upper left) — the list of conditions.
2. **Condition entries** (upper right) — the values of the conditions in each rule: Y (true), N (false) or – (does not matter).
3. **Action stub** (lower left) — the list of possible actions.
4. **Action entries** (lower right) — an X marks the actions taken for each rule.

Each column of entries is a **rule**. With **n** conditions that can each be true or false, the number of possible rules is:

> **Number of rules = 2ⁿ**

**Example — discount policy:** a 5% discount is given if the customer pays in advance, or if the purchase is at least Rs 10,000 and the customer is a regular customer; otherwise, no discount is given. There are n = 3 conditions, so there are 2³ = **8** possible combinations, which can be reduced to 4 rules with "–" (does not matter):

| Conditions / actions | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| --- | --- | --- | --- | --- |
| C1: Advance payment? | Y | N | N | N |
| C2: Purchase ≥ Rs 10,000? | – | Y | Y | N |
| C3: Regular customer? | – | Y | N | – |
| A1: Give 5% discount | X | X | | |
| A2: Give no discount | | | X | X |

(Rule 1 covers 4 combinations, rule 4 covers 2, and rules 2 and 3 cover 1 each: 4 + 1 + 1 + 2 = 8.)

### Decision Tree

A decision tree is a **graphical, tree-shaped** representation of decision logic: it starts with a condition at the root, each branch represents an outcome (value) of a condition, and the leaves represent the **actions**. It shows the order in which the conditions are tested.

![Decision tree for the discount policy: advance payment gives a discount; otherwise purchase amount and regular customer are tested](/diagrams/software-engineering/decision-tree.svg)

### Decision Table vs Decision Tree

| Basis | Decision table | Decision tree |
| --- | --- | --- |
| Representation | Tabular (rows and columns) | Graphical (branches and nodes) |
| Best for | Many conditions and complex combinations | Few conditions, where the order of testing matters |
| Completeness | Easy to check that all 2ⁿ combinations are covered | Harder to check completeness |
| Readability | Compact but less intuitive | Easy to understand visually |
| Shows sequence of conditions | No | Yes |
| Derivation | Can be derived from a decision tree | Can be drawn from a decision table |
| Main use | Specifying and checking rules; generating test cases | Explaining decisions to users |

**Structured English** (procedural logic written with imperative sentences and IF–THEN–ELSE and loops) is a third tool; it is best when the logic contains sequences and loops.

## System Implementation and Conversion Methods {#system-implementation-and-conversion-methods}

### Definition of System Implementation

System implementation is the process of putting a newly designed system into **operation** — installing the hardware and software, converting the data, training the users and changing over from the old system to the new one — so that the users can take over its operation.

### Activities of System Implementation

1. **Coding and testing** of the programs, and system testing.
2. **Installation** of hardware and software.
3. **File (data) conversion** — the data of the old system is converted into the format of the new system and loaded.
4. **User training** — operators and end users are trained, by instructor-led (classroom or virtual) or self-paced (multimedia or web-based) training.
5. **Documentation** — user manuals and operating procedures.
6. **Conversion (changeover)** from the old system to the new system.
7. **Post-implementation evaluation review (PIER)** — the system is evaluated after it has been in use, to check that it gives the expected benefits within the planned cost and time.

### Conversion Methods (Changeover Strategies)

Conversion is the process of changing from the old system to the new system. There are four conversion methods:

1. **Direct (direct cutover / plunge) conversion** — the old system is stopped and the new system is started on a fixed date.
2. **Parallel conversion** — the old and new systems run **together** for a period, and their results are compared; the old system is stopped when the new one is proved.
3. **Pilot conversion** — the new system is installed in **one location or department (the pilot site)** first; when it works well there, it is installed in the rest of the organization.
4. **Phased (gradual) conversion** — the new system is introduced **in stages (modules)**, one part at a time, while the old system continues for the parts not yet converted.

#### Comparison of Conversion Methods

| Method | How it works | Advantages | Disadvantages | Risk | Cost |
| --- | --- | --- | --- | --- | --- |
| Direct | Old system stopped, new started at once | Quickest and cheapest; immediate benefits; users must use the new system | No fallback if the new system fails; needs very careful planning and testing | Highest | Lowest |
| Parallel | Both systems run together for a time | Safest; results can be compared; the old system is a fallback | Most expensive (double work); users may not give the new system a fair trial | Lowest | Highest |
| Pilot | New system tried in one site first | Problems are found at one site with limited damage; staff can be trained there | Slower; other sites wait; the pilot may not represent all sites | Low | Medium |
| Phased | New system introduced module by module | Problems are limited to one module; users learn gradually | Takes a long time; old and new systems must work together | Medium | Medium |

## References {#references}

**TutorialsPoint**

- [System Analysis & Design – Overview](https://www.tutorialspoint.com/system_analysis_and_design/system_analysis_and_design_overview.htm) — accessed 2026-11-04 (system definition, constraints, characteristics, elements, types of systems, system models, categories of information)
- [System Development Life Cycle](https://www.tutorialspoint.com/system_analysis_and_design/system_analysis_and_design_development_life_cycle.htm) — accessed 2026-11-04 (phases of system development; role, responsibilities and attributes of the system analyst)
- [Requirement Determination](https://www.tutorialspoint.com/system_analysis_and_design/requirement_determination.htm) — accessed 2026-11-04 (fact-finding methods with advantages and disadvantages)
- [System Planning](https://www.tutorialspoint.com/system_analysis_and_design/system_analysis_and_design_planning.htm) — accessed 2026-11-04 (feasibility study, types of feasibility, steps)
- [Structured Analysis](https://www.tutorialspoint.com/system_analysis_and_design/system_analysis_and_design_structured.htm) — accessed 2026-11-04 (DFD, data dictionary, decision trees, decision tables and the discount example, structured English, selection of tools)
- [Implementation & Maintenance](https://www.tutorialspoint.com/system_analysis_and_design/system_analysis_and_design_implementation_maintenance.htm) — accessed 2026-11-04 (training, conversion methods with advantages and disadvantages, file conversion, PIER)

**GeeksforGeeks**

- [Types of Information System](https://www.geeksforgeeks.org/types-of-information-system/) — accessed 2026-11-04 (TPS, MIS, DSS, expert system)
- [Role of a System Analyst](https://www.geeksforgeeks.org/aptitude/role-of-a-system-analyst/) — accessed 2026-11-04
- [Difference between Decision Table and Decision Tree](https://www.geeksforgeeks.org/software-engineering/difference-between-decision-table-and-decision-tree/) — accessed 2026-11-04 (its claim that a decision tree cannot be derived from a decision table is questionable — a tree can be drawn from the rules of a table — so this row is not used)
- [Software Analysis and Design Tools](https://www.geeksforgeeks.org/software-analysis-and-design-tools/) — accessed 2026-11-04 (DFD, data dictionary)

**TpointTech**

- [Feasibility Study in Software Engineering](https://www.tpointtech.com/feasibility-study-in-software-engineering) — accessed 2026-11-04 (types of feasibility, go / no-go / revised-scope outcomes)
- [Data Flow Diagram (DFD)](https://www.tpointtech.com/software-engineering-data-flow-diagrams) — accessed 2026-11-04 (DFD rules, Yourdon–DeMarco and Gane–Sarson symbols, levels, logical and physical DFDs; it uses the non-standard terms "movements" and "shops" for data flows and data stores)
- [Behavioural Model in Software Engineering](https://www.tpointtech.com/behavioural-model-in-software-engineering) — accessed 2026-11-04 (DFD rules: allowed and forbidden flows)

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-04 (technical, operational and economic feasibility); the site has no other page on system analysis and design (checked 2026-11-04)

**Programiz**

- Programiz has no system analysis and design tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (the reference websites do not cover office automation and knowledge work systems, JAD, the data dictionary notation or the 2ⁿ rule)

- Kenneth C. Laudon and Jane P. Laudon, *Management Information Systems*, Pearson — types of information systems by organizational level
- Elias M. Awad, *Systems Analysis and Design*, and Kenneth E. Kendall and Julie E. Kendall, *Systems Analysis and Design*, Pearson — system concepts, the role of the system analyst, fact-finding (including JAD), feasibility and conversion methods
- Tom DeMarco, *Structured Analysis and System Specification*, Yourdon Press, 1978 — DFDs and data dictionary notation
