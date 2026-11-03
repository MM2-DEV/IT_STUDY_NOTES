---
description: The software development life cycle (SDLC) - its definition and need, and its phases (requirement, design, development, testing and maintenance) with the activities and outputs of each phase.
updated: 2026-11-03
---

## Requirement, Design, Development, Testing, Maintenance {#requirement-design-development-testing-maintenance}

### Definition of SDLC

The software development life cycle (SDLC) is a structured, step-by-step process for planning, designing, developing, testing, deploying and maintaining software. It divides the work into phases, each with its own activities and deliverables, and the output of each phase becomes the input of the next phase.

The SDLC is also called the software development process. A particular way of arranging its phases (one after another, in iterations, in increments and so on) is called an SDLC model or software process model, such as the waterfall, spiral, V-model or agile model; these are explained in [Software Development Models](/topics/software-engineering/software-development-models).

### Need for SDLC

1. **Defined order of work** — the SDLC gives development a clear, organized sequence of phases, so every team member knows what to do and when.
2. **Planning and control** — cost, schedule and resources are estimated at the start, and progress can be checked at the end of each phase.
3. **Early detection of defects** — reviewing and testing the output of each phase finds errors early, when they are cheaper to fix; the later an error is found, the more expensive it is to correct.
4. **Quality** — a systematic process produces software that meets the user's requirements and expectations.
5. **Alignment with business goals** — the requirements are agreed with the stakeholders before development starts, so the product serves the organization's needs.
6. **Documentation** — each phase produces documents (SRS, design documents, test reports) that help in maintenance and in training new team members.

### Phases of SDLC

The SDLC has five main phases:

1. Requirement.
2. Design.
3. Development (coding).
4. Testing.
5. Maintenance.

Between testing and maintenance, the tested software is deployed (installed) at the user's site; many sources show deployment as a separate phase.

![Phases of the SDLC: requirement, design, development, testing, deployment and maintenance, with the output of each phase](/diagrams/software-engineering/sdlc-phases.svg)

#### 1. Requirement Phase

The requirement phase is the phase in which the needs of the customer are collected, analyzed and documented. It answers the question "What should the software do?" and is the most important phase, because every later phase depends on it.

The requirement phase has four main activities:

1. **Communication and planning** — the customer requests the software and discusses it with the developer; the project is planned, and the cost, schedule and resources are estimated.
2. **Requirement gathering** — business analysts and the project team collect information from the customer, users and other stakeholders: what the software should do, who will use it and how it will be used. The methods include interviews, questionnaires, studying the existing system and its documents, and observing users at work.
3. **Feasibility study** — the team checks whether the project is worth doing and can be done: technically (with the available technology), economically (within the budget) and operationally (whether users will use it). The output is a feasibility report.
4. **Requirement analysis and specification** — the requirements are analyzed, conflicts and ambiguities are removed, and the requirements are classified into functional requirements (what the system must do) and non-functional requirements (qualities such as performance, security and usability). They are written in the Software Requirements Specification (SRS) and approved by the stakeholders.

**Output:** project plan, feasibility report and the Software Requirements Specification (SRS).

#### 2. Design Phase

The design phase is the phase in which the requirements in the SRS are transformed into a technical blueprint of the system. It answers the question "How will the software do it?"

The design is prepared at two levels:

1. **High-level design (HLD)** — the overall architecture of the system: its major modules and how they interact, the technology stack (programming language, database, hardware and software platform) and the database design.
2. **Low-level design (LLD)** — the detailed design of each module: its internal logic, algorithms, data structures, interfaces (APIs) and workflows.

The design is described with tools such as data flow diagrams, flowcharts, decision tables, decision trees, data dictionaries, UML diagrams and pseudocode.

**Output:** the Design Document Specification (DDS).

#### 3. Development (Coding) Phase

The development phase is the phase in which programmers write the source code according to the design. The work is divided into small units (modules); for example, front-end developers build the user interface and back-end developers build the server-side operations. It is usually the longest phase of the SDLC.

The main activities are:

1. Writing the code in a suitable programming language, following the organization's coding standards and guidelines.
2. Unit testing of each module by its programmer.
3. Code reviews to find errors and improve the code.
4. Using version control, compilers, debuggers and integrated development environments (IDEs).

**Output:** source code and an executable program.

#### 4. Testing Phase

The testing phase is the phase in which the software is checked to make sure that it meets the requirements and is free of defects. Testers execute the software with planned test cases, report the defects to the developers, and retest the software after the defects are fixed.

Testing is done at four levels:

1. **Unit testing** — each module is tested separately.
2. **Integration testing** — the modules are combined and the interfaces between them are tested.
3. **System testing** — the complete system is tested against the SRS, including non-functional requirements such as performance and security.
4. **Acceptance testing (UAT)** — the customer or users test the software to decide whether to accept it; it includes alpha testing (at the developer's site) and beta testing (at the user's site).

**Output:** test cases, test reports, defect reports and a tested product.

Testing is explained in detail in [Verification, Validation and Testing](/topics/software-engineering/verification-validation-and-testing).

#### Deployment (Implementation)

Deployment is the step in which the tested software is released and installed for the users. It includes setting up the production environment, installing and configuring the software, integrating it with existing databases and other programs, converting old data, training the users and checking the installation with a quick (smoke) test. The software may be released all at once or in stages, and it may first be given to a limited group for beta testing.

**Output:** the live (operational) software and user documentation.

#### 5. Maintenance Phase

The maintenance phase is the phase in which the software is kept working correctly and usefully after it has been delivered. It lasts for the whole operational life of the software, so it is usually the longest and most expensive part of the life cycle. Problems that were not found during testing appear during real use, and the user's environment and needs keep changing.

Maintenance is of three main types:

1. **Corrective maintenance** — fixing bugs that are found during use.
2. **Adaptive maintenance** — changing the software so that it works in a new environment, such as a new operating system, new hardware or new laws and rules.
3. **Perfective maintenance** — improving the software by adding new features, improving performance or meeting new user requirements.

**Output:** patches, updates and new versions of the software.

When the software becomes obsolete, it is retired (disposed of): its data and components are archived, the system is shut down, and users are moved to the replacement system.

Software maintenance is explained in detail in [Software Maintenance](/topics/software-engineering/software-maintenance).

### Summary of SDLC Phases

| Phase | Main question | Main activities | Output | Main people involved |
| --- | --- | --- | --- | --- |
| Requirement | What should the software do? | Planning, requirement gathering, feasibility study, requirement analysis | Project plan, feasibility report, SRS | Customer, business analysts, project manager |
| Design | How will the software do it? | Architecture (HLD), detailed design (LLD), database design | Design document (DDS) | System architects, designers |
| Development | Build the software | Coding, unit testing, code reviews | Source code, executable program | Programmers (front-end, back-end) |
| Testing | Does it work as required? | Unit, integration, system and acceptance testing | Test reports, defect reports, tested product | Testers (QA team), users |
| Deployment | Deliver the software | Installation, configuration, data conversion, user training | Live software, user documentation | Release managers, DevOps engineers |
| Maintenance | Keep the software useful | Corrective, adaptive and perfective maintenance | Patches, updates, new versions | Support engineers, developers |

### Detailed Activities of SDLC

The five main phases are often divided into more detailed activities. One common breakdown has eleven activities, which map onto the main phases as follows:

| Main phase | Detailed activities |
| --- | --- |
| Requirement | 1. Communication, 2. Requirement gathering, 3. Feasibility study, 4. System analysis |
| Design | 5. Software design |
| Development | 6. Coding |
| Testing | 7. Testing |
| Deployment | 8. Integration (with libraries, databases and other programs), 9. Implementation (installation at the user's site) |
| Maintenance | 10. Operation and maintenance, 11. Disposition (retirement of the software) |

## References {#references}

**TutorialsPoint**

- [Software Development Life Cycle](https://www.tutorialspoint.com/software_engineering/software_development_life_cycle.htm) — accessed 2026-11-03 (the eleven SDLC activities from communication to disposition)

**GeeksforGeeks**

- [Software Development Life Cycle (SDLC)](https://www.geeksforgeeks.org/software-engineering/software-development-life-cycle-sdlc/) — accessed 2026-11-03 (stages, HLD and LLD, SRS and DDS, testing levels, deployment)

**TpointTech**

- [Software Development Life Cycle](https://www.tpointtech.com/software-development-life-cycle) — accessed 2026-11-03 (requirement, design, build, testing, deployment and maintenance phases)

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-03 (SDLC stages with outputs and roles; corrective, perfective and adaptive maintenance)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for this subtopic (checked 2026-11-03).
