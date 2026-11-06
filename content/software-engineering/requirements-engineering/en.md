---
description: Requirements engineering - the RE process (feasibility study, elicitation and analysis, specification, validation and management), types of requirements, the Software Requirements Specification (SRS) and its characteristics, and descriptive specifications (ER diagrams, logic and algebraic specifications).
updated: 2026-11-03
---

## Requirements Engineering Processes {#requirements-engineering-processes}

### Definition of Requirements Engineering

Requirements engineering (RE) is the systematic process of discovering, analyzing, documenting, validating and managing the requirements of a software system.

Its aim is to produce a complete and correct Software Requirements Specification (SRS) that describes what the stakeholders need from the system.

A requirement is a description of a service that the system must provide or a constraint under which it must operate. Requirements engineering is the basis of every later phase of the project: errors in the requirements are much cheaper to correct during requirements engineering than after the system has been designed or built.

### Steps of the Requirements Engineering Process

The requirements engineering process has five steps:

1. Feasibility study.
2. Requirements elicitation and analysis.
3. Requirements specification.
4. Requirements validation.
5. Requirements management.

The process is iterative: problems found in a later step often send the team back to an earlier step.

![Requirements engineering process: feasibility study, elicitation and analysis, specification and validation, with requirements management throughout](/diagrams/software-engineering/re-process.svg)

#### 1. Feasibility Study

A feasibility study is a short study that decides whether the proposed system is worth building and can be built within the available technology, budget and time.

Its output is a feasibility report that recommends whether the project should continue.

A feasibility study examines five types of feasibility:

1. **Technical feasibility** — whether the required hardware, software, technology and technical skills are available.
2. **Economic feasibility** — whether the benefits of the system justify its costs (cost-benefit analysis).
3. **Operational feasibility** — whether the system will solve the business problem and will be accepted, operated and maintained by its users.
4. **Legal feasibility** — whether the project complies with laws, regulations, contracts and intellectual-property rules.
5. **Schedule feasibility** — whether the project can be completed within the required time.

Feasibility study is explained in detail in [System Analysis and Design](/topics/software-engineering/system-analysis-and-design#feasibility-study-technical-economic-operational).

#### 2. Requirements Elicitation and Analysis

Requirements elicitation is the process of gathering the requirements of the system from the customers, users and other stakeholders, and from sources such as existing systems, business documents and standards. Requirements analysis is the process of studying the gathered requirements to remove ambiguities, conflicts and duplicates, and to organize and prioritize them.

The elicitation process has four activities:

1. **Requirements gathering** — the developers discuss with the client and end users to learn what they expect from the software.
2. **Organizing requirements** — the requirements are arranged in order of importance, urgency and convenience.
3. **Negotiation and discussion** — ambiguous and conflicting requirements are discussed with the stakeholders, and unrealistic requirements are compromised reasonably.
4. **Documentation** — all formal and informal, functional and non-functional requirements are documented for the next step.

The main elicitation techniques are:

1. **Interviews** — structured (closed), unstructured (open), one-to-one or group interviews with stakeholders.
2. **Surveys** — stakeholders are asked about their expectations and requirements.
3. **Questionnaires** — a document of predefined questions with options is given to stakeholders to answer.
4. **Task analysis** — the existing operations and system are studied to find the requirements of the new system.
5. **Domain analysis** — domain experts help to identify the general and specific requirements of the field.
6. **Brainstorming** — an informal discussion among stakeholders in which all ideas are recorded.
7. **Prototyping** — a model of the user interface, without full functionality, is shown to the client to obtain feedback.
8. **Observation** — experts watch the users at work in their real environment.
9. **Focus groups and the Delphi technique** — group discussions and repeated rounds of anonymous expert opinion.

Requirements are often modelled during analysis with data flow diagrams, entity-relationship diagrams, use cases and data dictionaries.

#### 3. Requirements Specification

Requirements specification is the step in which the analyzed requirements are written in a standard, precise form, the Software Requirements Specification (SRS).

The analyst converts requirements written in the customer's natural language into a technical document that the development team can use, including interface, performance, security and other constraints. It is explained in [Requirement Specification](#requirement-specification).

#### 4. Requirements Validation

Requirements validation is the step in which the documented requirements are checked to ensure that they define the system the customer really wants.

The requirements are checked for:

1. **Validity** — whether they meet the real needs of the users.
2. **Consistency** — whether any requirements conflict with each other.
3. **Completeness** — whether all the required functions and constraints are included.
4. **Realism (feasibility)** — whether they can be implemented with the available technology and budget.
5. **Verifiability and clarity** — whether they are unambiguous and can be tested.

The validation techniques are:

1. Requirements reviews (formal reviews, buddy checks).
2. Prototyping.
3. Test-case generation (writing tests from the requirements).
4. Model checking.

Verification checks that the requirements are documented correctly (complete, consistent and accurate), while validation checks that they meet the stakeholders' needs.

#### 5. Requirements Management

Requirements management is the process of tracking, prioritizing and controlling changes to the requirements throughout the life of the project.

Requirements change because the business environment, users' understanding and technology change. Its main activities are:

1. Change control — evaluating and approving or rejecting requested changes.
2. Impact analysis — finding the effect of a change on the design, code, tests, cost and schedule.
3. Version control of the requirements documents.
4. Traceability — linking each requirement to its source and to the design, code and test cases.
5. Communicating changes to all stakeholders.

### Advantages of Requirements Engineering

1. The software matches the stakeholders' needs.
2. Problems and conflicts are found early, when they are cheaper to fix.
3. Communication between developers and stakeholders improves.
4. Clear documentation reduces misunderstandings.
5. A stable set of requirements reduces project risk.

### Disadvantages of Requirements Engineering

1. It can be time-consuming and costly if it is poorly managed.
2. It is hard to capture the needs of all stakeholders, especially when their priorities conflict.
3. It is difficult to keep the requirements clear, consistent and complete.
4. Changing requirements can cause delays and extra cost.

## Requirement Specification {#requirement-specification}

### Definition of SRS

A Software Requirements Specification (SRS) is a formal document that completely describes what the software system must do and the constraints under which it must operate.

It is produced at the end of the requirements phase, after the requirements have been gathered and analyzed.

The SRS describes **what** the system must do, not **how** it is to be built. It may be written by the client to state their expectations, or by the developer; in either case, it acts as an agreement (contract) between the customer and the developer. IEEE Std 830 is the well-known standard for writing an SRS.

### Uses of SRS

1. It is an agreement between the customer and the developer about what the product will do.
2. It is the input to the design phase.
3. It is the basis for estimating cost and schedule.
4. It is the basis for system and acceptance testing (validation).
5. It is the reference for maintenance and future enhancements.

### Types of Requirements

Software requirements are of three types:

1. **Functional requirements** — the functions, services and behaviour that the system must provide: how it responds to particular inputs and what output it produces. Examples: a user can log in; a user can search invoices; the system generates a monthly sales report; users can be divided into groups with different rights.
2. **Non-functional requirements** — the qualities and constraints of the system, that is, how well it must perform its functions. Examples: performance (a page must load within 2 seconds), security, reliability, availability, usability, portability, scalability, storage, interoperability, cost and disaster recovery.
3. **Domain requirements** — requirements that come from the application domain of the system, such as banking rules, health-care privacy standards or payment-security standards for e-commerce.

#### Functional vs Non-Functional Requirements

| Basis | Functional requirements | Non-functional requirements |
| --- | --- | --- |
| Question answered | What must the system do? | How well must the system do it? |
| Describe | Features and behaviour | Quality attributes and constraints |
| Examples | Login, search, checkout, report generation | Speed, security, reliability, availability, scalability |
| If not met | The system lacks a function | The system works but may be unusable or unacceptable |
| Verified by | Functional testing (checking the expected outputs) | Non-functional testing against measurable targets (performance, load, security testing) |
| Effect on design | Decides what functionality to build | Strongly influences the architecture and technology choices |
| Documented as | Use cases, user stories, functional specifications | Quality targets, service levels, constraints |

#### Priority of Requirements

Requirements are often ranked into four levels of priority:

1. **Must have** — the software cannot be operational without them.
2. **Should have** — they enhance the functionality of the software and are negotiable.
3. **Could have** — the software can still function properly without them.
4. **Wish list** — they are not tied to the objectives of the software and can be deferred to later updates.

### Structure of an SRS

A typical SRS, based on IEEE Std 830, contains the following sections:

1. **Introduction** — the purpose and scope of the document and the product, and an overview, together with definitions, acronyms and references.
2. **General (overall) description** — the product perspective, product functions, user characteristics, general constraints, and assumptions and dependencies.
3. **Functional requirements** — the expected behaviour of the system: for each function, its inputs and their sources, valid ranges, processing and outputs, ranked by importance.
4. **Interface requirements** — the user, hardware, software and communication interfaces.
5. **Performance requirements** — required response time, throughput, memory and error rates, both static and dynamic.
6. **Design constraints** — standards, hardware limits, required algorithms, and security or company policies that limit the design.
7. **Non-functional attributes** — security, portability, reliability, reusability, compatibility, data integrity and scalability.
8. **Preliminary schedule and budget**.
9. **Appendices** — supporting information, glossary and index.

### Characteristics of a Good SRS

IEEE Std 830 lists eight characteristics of a good SRS:

1. **Correct** — every requirement in the SRS is one that the software must meet; this is confirmed by the users' review.
2. **Unambiguous** — every requirement has only one interpretation.
3. **Complete** — it contains all the functional and non-functional requirements, defines the response to all valid and invalid inputs, and leaves no "to be determined" items unresolved.
4. **Consistent** — no requirements conflict with each other, and terms are used in the same way throughout.
5. **Ranked for importance and/or stability** — each requirement is marked by how important it is (essential, conditional, optional) or how likely it is to change.
6. **Verifiable** — there is a finite, cost-effective process to check whether the product meets each requirement; vague statements such as "user-friendly" or "fast" are replaced by measurable ones.
7. **Modifiable** — its structure allows changes to be made easily and consistently, with an index and cross-references and without redundant statements.
8. **Traceable** — the origin of each requirement is clear, and each requirement can be referenced in later design, code and test documents.

Other desirable characteristics are:

1. **Design-independent** — it states what the system must do, not how, so that alternative designs remain possible.
2. **Testable** — test cases and test plans can easily be derived from it.
3. **Understandable by the customer** — it uses plain language that non-technical stakeholders can review.
4. **Right level of abstraction** — its level of detail suits its purpose; an SRS for development needs more detail than one for a feasibility study.
5. **Concise and relevant** — it contains only information about the system being built.

## Descriptive Specification {#descriptive-specification}

### Specification Styles

A **specification** is a precise statement of the required properties of a system, written so that it can be checked.

Specifications are classified in two ways (Ghezzi, Jazayeri and Mandrioli):

1. **Formal or informal** — a formal specification is written in a language with precise syntax and semantics (usually mathematical); an informal specification is written in natural language; a semi-formal specification uses a precise syntax (such as a diagram notation) with partly informal meaning.
2. **Operational or descriptive** — according to how the required behaviour is described.

#### Operational Specification

An operational specification describes the system by giving a model of its desired behaviour, usually an abstract machine that can simulate how the system works. It answers the question "How does the system behave?" by describing its states and actions step by step.

Examples of operational specification techniques are:

1. Data flow diagrams (DFDs).
2. Finite state machines (FSMs).
3. Petri nets.
4. UML behavioural diagrams, such as statechart and activity diagrams.

#### Descriptive Specification

A descriptive specification describes the system by stating the properties that it must have, without giving a model of how it works. It answers the question "What properties must the system satisfy?" and is written in a declarative form, such as relations, logical formulas or equations.

**Illustration:** an ellipse can be specified in both styles.

1. **Operational:** "an ellipse is the curve traced by a pencil that is held against a taut string whose two ends are fixed at two points (the foci)." This describes a process that produces the curve.
2. **Descriptive:** "an ellipse is the set of all points whose distances from two fixed points (the foci) add up to a constant", or the equation x²/a² + y²/b² = 1. This states a property of the points, without saying how to draw them.

### Types of Descriptive Specification

Descriptive specification techniques are of three types:

1. Entity-relationship (ER) diagrams.
2. Logic specifications.
3. Algebraic specifications.

#### 1. Entity-Relationship Diagrams

An entity-relationship (ER) diagram is a semi-formal, graphical notation that describes the data of a system: the entities (objects of interest, such as Student and Course), their attributes (such as name and roll number) and the relationships between them (such as "a student enrolls in a course"), with cardinalities such as one-to-many. It describes the structure of the data and the relations that must hold, not the operations performed on the data, so it is a descriptive specification. ER diagrams are explained in detail in [Data Models and the ER Model](/topics/dbms/data-models-and-the-er-model#entity-relationship-er-model).

#### 2. Logic Specifications

A logic specification describes the required properties of a program by formulas of mathematical logic, usually first-order predicate logic. A common form gives a **precondition** (a property that must be true of the input before the program runs) and a **postcondition** (a property that must be true of the output after the program finishes).

**Example — sorting an array a[1..n]:**

1. Precondition: n ≥ 1.
2. Postcondition: for every i with 1 ≤ i < n, a[i] ≤ a[i + 1], and the final array is a permutation of the original array.

The specification states what a correct sort must achieve, without saying whether bubble sort, quicksort or any other algorithm is used.

#### 3. Algebraic Specifications

An algebraic specification describes an abstract data type by listing its operations and a set of equations (axioms) that relate the operations to each other. It specifies the behaviour of the data type only through the effects of its operations, without describing how the data is stored.

**Example — a stack:**

The operations are `new` (create an empty stack), `push(s, x)`, `pop(s)`, `top(s)` and `isEmpty(s)`. The axioms are:

1. `isEmpty(new) = true`
2. `isEmpty(push(s, x)) = false`
3. `top(push(s, x)) = x`
4. `pop(push(s, x)) = s`

These four equations fully describe the last-in, first-out behaviour of a stack, whether it is implemented with an array or a linked list.

### Advantages of Descriptive Specifications

1. They describe only the required properties, so they do not bias the design towards a particular implementation.
2. Formal descriptive specifications (logic and algebraic) are precise and unambiguous.
3. They can be used to verify the correctness of a program mathematically.

### Disadvantages of Descriptive Specifications

1. Logic and algebraic specifications are hard for customers and many developers to read.
2. They cannot be executed or simulated directly, unlike many operational specifications.
3. Writing a complete and consistent set of formulas or axioms is difficult for large systems.

### Operational Specification vs Descriptive Specification

| Basis | Operational specification | Descriptive specification |
| --- | --- | --- |
| Describes | How the system behaves (a model of its behaviour) | What properties the system must have |
| Style | Procedural, as an abstract machine | Declarative, as relations, formulas or equations |
| Execution | Can often be simulated or executed | Usually cannot be executed directly |
| Bias towards design | May suggest a particular implementation | Independent of implementation |
| Ease of understanding | Usually more intuitive | Often more abstract and mathematical |
| Examples | DFD, finite state machine, Petri net, UML statechart | ER diagram, logic specification (pre- and postconditions), algebraic specification |

## References {#references}

**TutorialsPoint**

- [Software Requirements](https://www.tutorialspoint.com/software_engineering/software_requirements.htm) — accessed 2026-11-03 (RE process, elicitation process and techniques, characteristics of good requirements, functional and non-functional requirements, priority levels)

**GeeksforGeeks**

- [Requirements Engineering Process](https://www.geeksforgeeks.org/software-engineering/software-engineering-requirements-engineering-process/) — accessed 2026-11-03 (five steps, types of feasibility, verification and validation, requirements management)
- [Software Requirement Specification (SRS) Format](https://www.geeksforgeeks.org/software-engineering/software-requirement-specification-srs-format/) — accessed 2026-11-03
- [Quality Characteristics of a Good SRS](https://www.geeksforgeeks.org/software-engineering/software-engineering-quality-characteristics-of-a-good-srs/) — accessed 2026-11-03
- [Functional vs Non-Functional Requirements](https://www.geeksforgeeks.org/software-engineering/functional-vs-non-functional-requirements/) — accessed 2026-11-03

**TpointTech**

- [Requirement Engineering](https://www.tpointtech.com/software-engineering-requirement-engineering) — accessed 2026-11-03 (RE process, functional, non-functional and domain requirements)
- [Software Requirement Specifications](https://www.tpointtech.com/software-requirement-specifications) — accessed 2026-11-03 (characteristics of a good SRS)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (the reference websites do not cover specification styles or descriptive specifications)

- Carlo Ghezzi, Mehdi Jazayeri and Dino Mandrioli, *Fundamentals of Software Engineering*, 2nd edition, Prentice Hall, chapter 5, "Specification" — formal and informal, operational and descriptive specifications; ER diagrams, logic specifications and algebraic specifications
- Carlo A. Furia, Dino Mandrioli, Angelo Morzenti and Matteo Rossi, ["Modeling Time in Computing: A Taxonomy and a Comparative Survey"](https://arxiv.org/abs/0807.4132), *ACM Computing Surveys*, 2010 — the distinction between operational and descriptive specification languages
- IEEE Std 830-1998, *IEEE Recommended Practice for Software Requirements Specifications* — the eight characteristics of a good SRS and the SRS structure
