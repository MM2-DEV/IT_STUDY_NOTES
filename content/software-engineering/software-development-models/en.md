---
description: Software development (SDLC) models - the waterfall model, the agile model (manifesto, principles, Scrum and XP), the spiral model, the RAD model and the V-model, with their phases, uses, advantages, disadvantages and comparisons.
updated: 2026-11-03
---

## Waterfall Model {#waterfall-model}

### Definition of the Waterfall Model

The waterfall model is a linear, sequential software development model in which the phases are carried out one after another, like water flowing down a series of steps.

Each phase must be completed, reviewed and signed off before the next phase starts, and the output of each phase is the input of the next.

It is also called the linear-sequential life cycle model or the classical waterfall model. It was the first SDLC model to be widely used. Winston W. Royce described this sequence of phases in his 1970 paper "Managing the Development of Large Software Systems"; in that paper he also pointed out the risks of a strict sequence and recommended feedback between phases, and the name "waterfall" was applied to the model later.

![Waterfall model: requirements, design, implementation, integration and testing, deployment and maintenance in sequence](/diagrams/software-engineering/waterfall-model.svg)

### Phases of the Waterfall Model

The waterfall model has six phases:

1. **Requirements analysis and specification** — all the requirements of the system are collected from the customer, analyzed and documented in the Software Requirements Specification (SRS).
2. **System design** — the requirements are converted into the system architecture (high-level design) and the detailed design of each module (low-level design), recorded in the software design document (SDD).
3. **Implementation and unit testing** — the design is coded as small programs (units), and each unit is tested on its own.
4. **Integration and system testing** — the units are combined into the complete system, which is tested to find faults and to check that it meets the SRS.
5. **Deployment** — the tested product is installed at the customer's site or released to the market.
6. **Maintenance** — after delivery, the software is corrected (corrective maintenance), adapted to new environments (adaptive maintenance) and enhanced (perfective maintenance) by issuing patches and new versions.

### Characteristics of the Waterfall Model

1. The phases are sequential and do not overlap.
2. Going back to an earlier phase is difficult.
3. It is document-driven: every phase produces a document that is reviewed.
4. The scope, cost and schedule are planned at the start, with clear milestones.

### When to Use the Waterfall Model

1. The requirements are clear, well documented and fixed.
2. The product definition is stable.
3. The technology is well understood.
4. The project is short, or small to medium in size.
5. Strict documentation and control are required, as in government and regulated systems.

### Advantages of the Waterfall Model

1. It is simple to understand and to use.
2. Its rigid structure makes it easy to manage: each phase has specific deliverables and a review.
3. The stages, milestones and deliverables are clearly defined, so progress is easy to track.
4. The cost and release date can be estimated before development starts.
5. The process and its results are well documented.
6. It works well for small projects whose requirements are well understood.

### Disadvantages of the Waterfall Model

1. No working software is produced until late in the life cycle.
2. It has a high amount of risk and uncertainty.
3. It cannot accommodate changing requirements; it is difficult to go back to an earlier phase.
4. It is not suitable for complex, object-oriented, long or ongoing projects.
5. Testing starts late, so errors in the requirements or design are found late, when they are expensive to fix.
6. Integration is done all at once at the end, so problems appear late.
7. The customer sees the product only at the end.

## Agile Model {#agile-model}

### Definition of the Agile Model

The agile model is an iterative and incremental software development model that delivers working software quickly and adapts to changing requirements.

The product is divided into small builds that are delivered in short iterations (also called sprints) of about one to four weeks, and each iteration ends with a working product that is shown to the customer for feedback.

In each iteration a cross-functional team carries out planning, requirements analysis, design, coding, unit testing and acceptance testing. Agile is an adaptive approach, while traditional models such as the waterfall model are predictive: detailed planning is done only for the near future, and the plan changes as the customer's needs become clearer.

![Agile model: requirements feed short iterations of plan, design, code, test and review, each producing a working increment](/diagrams/software-engineering/agile-model.svg)

### Phases of the Agile Model

1. **Requirement gathering** — the requirements, business opportunities, time and effort are identified, and feasibility is checked.
2. **Design** — the team works with the stakeholders and designs the requirements with user-flow diagrams, high-level UML diagrams and prototypes.
3. **Construction (iteration)** — the team builds a working product in short iterations and improves it in each round.
4. **Testing (quality assurance)** — the product is tested to find bugs and check its performance.
5. **Deployment** — the working product is released to the users.
6. **Feedback** — the customer's feedback is collected and used to plan the next iteration.

### Agile Manifesto

The Agile Manifesto was published in 2001 by a group of software developers. It states four values:

1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.

The items on the left are valued more, although the items on the right also have value.

### Principles of Agile

The Agile Manifesto is supported by twelve principles:

1. The highest priority is to satisfy the customer through early and continuous delivery of valuable software.
2. Changing requirements are welcome, even late in development.
3. Working software is delivered frequently, in weeks rather than months.
4. Business people and developers work together daily.
5. Projects are built around motivated individuals, who are given the support they need and trusted to do the job.
6. Face-to-face conversation is the most effective way of conveying information.
7. Working software is the primary measure of progress.
8. Development proceeds at a sustainable pace that can be maintained indefinitely.
9. Continuous attention is paid to technical excellence and good design.
10. Simplicity — maximizing the amount of work not done — is essential.
11. The best architectures, requirements and designs come from self-organizing teams.
12. At regular intervals, the team reflects on how to become more effective and adjusts its behaviour.

### Agile Methods

Several methods follow the agile approach; they were grouped under the name "agile" when the Agile Manifesto was published in 2001. The main agile methods are:

1. **Scrum** (1995) — work is organized in time-boxed sprints of one to four weeks.
2. **Extreme Programming (XP)** (1996) — emphasizes frequent releases, testing and close customer involvement.
3. **Crystal** (Crystal Clear) — a family of lightweight methods whose process depends on team size and project criticality; its work is organized into chartering, cyclic delivery and wrap-up.
4. **Dynamic Systems Development Method (DSDM)** (1995) — a rapid development framework with active user involvement, time-boxing, MoSCoW prioritization (must have, should have, could have, won't have) and prototyping.
5. **Feature-Driven Development (FDD)** — the software is designed and built one feature at a time, in small steps that can be delivered separately.
6. **Lean software development** — reduces waste and cost and speeds up delivery, following principles such as eliminating waste and deferring commitment.
7. **Adaptive Software Development (ASD)**.
8. **Rational Unified Process (RUP)** (1998) — an iterative process framework that is often listed with the agile methods.

#### Scrum

Scrum is an agile framework in which the work is done in short, time-boxed iterations called sprints, usually one to four weeks long; each sprint produces a usable increment of the product.

Scrum has three roles:

1. **Product owner** — represents the customer and manages and prioritizes the product backlog.
2. **Scrum master** — guides the team in following Scrum and removes obstacles to its work.
3. **Development team** — a small, self-organizing team that builds the product.

Scrum has two main artifacts:

1. **Product backlog** — a prioritized list of all the features (user stories) required in the product, managed by the product owner.
2. **Sprint backlog** — the items selected for the current sprint, with the plan for completing them, owned by the development team.

Scrum has four events within each sprint:

1. **Sprint planning** — the team decides which backlog items will be done in the sprint.
2. **Daily scrum** — a 15-minute stand-up meeting each day on progress and problems.
3. **Sprint review** — the completed work is demonstrated to the stakeholders.
4. **Sprint retrospective** — the team reviews how it worked and how to improve.

#### Extreme Programming (XP)

Extreme Programming (XP) is an agile method that delivers software in frequent small releases and relies on continuous testing, close teamwork and constant customer feedback.

XP has five core values:

1. Communication.
2. Simplicity.
3. Feedback.
4. Courage.
5. Respect.

The main XP practices are:

1. User stories to capture requirements.
2. Simple design.
3. Pair programming (two programmers work together at one computer).
4. Test-driven development (the test is written before the code).
5. Continuous integration of the code.
6. Unit and acceptance testing.
7. Small, frequent releases with continuous customer feedback.

### When to Use the Agile Model

1. The requirements are expected to change frequently.
2. The customer can work closely and regularly with the team.
3. A skilled and experienced team is available.
4. Early delivery of partial, working software is valuable.

### Advantages of the Agile Model

1. Working software is delivered frequently and early.
2. It accepts changing requirements at any stage.
3. Continuous customer feedback ensures that the product matches business needs.
4. It promotes teamwork, face-to-face communication and cross-training.
5. It needs little upfront planning and has minimal rules and documentation.
6. Frequent testing reduces the risk of major failures late in the project.
7. It reduces the total development time.
8. It is easy to manage and gives flexibility to developers.

### Disadvantages of the Agile Model

1. It depends heavily on the customer; if the customer is not clear about the requirements, the team can be misled.
2. Documentation is limited, so the project depends heavily on individuals, and knowledge transfer to new members is difficult.
3. Maintenance is difficult after the original developers move to other projects.
4. It is not suitable for handling complex dependencies, and large projects are hard to manage without experienced teams.
5. It needs strong agile leadership and an overall plan.
6. Strict delivery management can force the team to cut scope to meet deadlines.

### Agile Model vs Waterfall Model

| Basis | Agile model | Waterfall model |
| --- | --- | --- |
| Approach | Iterative and incremental; adaptive | Linear and sequential; predictive |
| Planning | Detailed planning only for the near future | Complete planning at the start |
| Requirements | Can change at any stage | Fixed at the start |
| Delivery | Working software after every iteration | Working software only at the end |
| Testing | In every iteration, alongside development | A separate phase after coding |
| Customer involvement | Continuous, throughout the project | Mainly at the start and at the end |
| Documentation | Minimal | Detailed, in every phase |
| Risk | Low; problems are found early | High; problems are found late |
| Suitable for | Projects with changing requirements | Small projects with clear, fixed requirements |

## Spiral Model {#spiral-model}

### Definition of the Spiral Model

The spiral model is a risk-driven software development model that combines the iterative nature of prototyping with the controlled, systematic aspects of the waterfall model.

The development proceeds in a series of loops (spirals); in each loop the risks are analyzed and resolved before the next version of the product is built.

The spiral model was proposed by Barry Boehm in 1986 ("A Spiral Model of Software Development and Enhancement"). It is called a meta-model because it can include the other models: one loop can follow the waterfall model, and prototyping is used to reduce risk.

![Spiral model: loops through four quadrants - objectives, risk analysis, development and planning](/diagrams/software-engineering/spiral-model.svg)

### Phases (Quadrants) of the Spiral Model

Each loop of the spiral is a phase of the development, and it passes through four quadrants:

1. **Objective setting (planning)** — the objectives, alternative solutions and constraints of the phase are identified, and the requirements are gathered from the customer.
2. **Risk analysis and reduction** — the alternatives are evaluated, the risks (technical, cost, schedule and operational) are identified, and a prototype is built to resolve the main risks.
3. **Development and validation (engineering)** — the next version of the product is designed, coded and tested.
4. **Review and planning (evaluation)** — the customer evaluates the product, and the next loop of the spiral is planned.

In the spiral diagram:

1. The **radius** at any point represents the cumulative cost of the project so far.
2. The **angular dimension** represents the progress made in the current phase.
3. The **number of loops** is not fixed; the project manager decides it according to the risks.

### Risk Handling in the Spiral Model

Risk handling is the most important feature of the spiral model. A risk is any adverse situation that may affect the successful completion of the project. In every loop, the risks are identified before development, analyzed and reduced, usually by building a prototype; the riskiest parts of the system are therefore built first, and the decision to continue is made at the end of each loop.

### When to Use the Spiral Model

1. The project is large, complex and has medium to high risk.
2. The requirements are unclear or complex, and significant changes are expected.
3. Risk evaluation and cost control are important.
4. It is a long-term project, or a new product line that is released in phases.

### Advantages of the Spiral Model

1. Risk analysis in every loop reduces risk; risky parts are developed early.
2. Changing requirements can be accommodated.
3. Prototypes are used extensively, so requirements are captured more accurately.
4. Users see the system early and give feedback.
5. Development is divided into smaller parts, which suits large projects.

### Disadvantages of the Spiral Model

1. The model and its management are complex.
2. It is expensive, so it is not suitable for small or low-risk projects.
3. Its success depends on expert risk analysis.
4. The end date and total cost are hard to estimate, because the number of loops is not known at the start.
5. The spiral may continue indefinitely.
6. The many intermediate stages require extensive documentation.

## RDD {#rdd}

The syllabus prints this item as "RDD". It is taken here as **RAD (Rapid Application Development)**, the development model that is normally studied with the waterfall, agile, spiral and V-models.

### Definition of the RAD Model

The RAD (Rapid Application Development) model is an iterative and incremental software development model that delivers software quickly by using rapid prototyping and continuous user feedback instead of extensive upfront planning.

A prototype is a working model that is functionally equivalent to a part of the final product.

In the RAD model, the system is divided into modules that are developed in parallel by small teams and then integrated. Each module is developed within a fixed period of time (a time box), usually about 60 to 90 days. Reusable components and automated tools (such as code generators) are used to speed up development.

The RAD approach was developed by James Martin in the 1980s and described in his 1991 book *Rapid Application Development*.

### Phases of the RAD Model

The RAD model is described in two common forms.

**James Martin's four phases:**

1. **Requirements planning** — the developers and users agree on the requirements and the scope of the system, and a basic project plan is made.
2. **User design** — the developers build prototypes; the users test them and give feedback, and the design is refined. User design and construction are repeated until the users are satisfied.
3. **Construction** — the working system is built from the refined prototypes, using reusable components and fast development tools, with iterative testing.
4. **Cutover** — the modules are integrated and tested, data is converted, users are trained and the system is deployed.

![RAD model: requirements planning, repeated user design and construction, then cutover](/diagrams/software-engineering/rad-model.svg)

**Five phases (Pressman's description):**

1. **Business modelling** — the flow of information between the business functions is modelled: what information drives the business, where it comes from and who processes it.
2. **Data modelling** — the information from business modelling is refined into data objects, with their attributes and relationships.
3. **Process modelling** — the processes for adding, modifying, deleting and retrieving the data objects are defined.
4. **Application generation** — the system is built by converting the process and data models into prototypes, using automated tools.
5. **Testing and turnover** — each prototype is tested in every iteration; because many components are reused and already tested, testing time and the risk of major defects are reduced.

### When to Use the RAD Model

1. The system can be divided into modules that can be delivered incrementally.
2. The project must be delivered in a short time (about 2–3 months).
3. Skilled designers and developers and domain experts are available.
4. The budget allows the use of automated code-generation tools.
5. The users can be involved continuously to give feedback.

### Advantages of the RAD Model

1. Development time is short, and software is delivered quickly.
2. Changing requirements can be accommodated.
3. Reusable components increase productivity.
4. Early and continuous user feedback improves user satisfaction.
5. Progress can be measured.
6. Integration starts early, which reduces integration problems.

### Disadvantages of the RAD Model

1. Only systems that can be divided into modules can be built with RAD.
2. It needs highly skilled developers and designers, and strong modelling skills.
3. It needs continuous user involvement and close cooperation between users and the team.
4. Automated tools and code generators are expensive, so it is not suitable for low-budget projects.
5. It is not suitable for large projects or for projects with high technical risk.
6. Management is complex, and scope may grow without firm limits.

## V Model {#v-model}

### Definition of the V-Model

The V-model (verification and validation model) is a sequential software development model in which each development phase has a corresponding testing phase.

It is an extension of the waterfall model, and its phases are drawn in the shape of the letter V: the development (verification) phases go down the left side, coding is at the bottom, and the testing (validation) phases go up the right side.

In the V-model, testing is planned in parallel with development: the test plan for each testing phase is written during the matching development phase. The model was developed from the waterfall model in the 1980s and is widely used in fields where errors are costly, such as medical devices, defence, aerospace and automotive systems.

![V-model: verification phases on the left, coding at the bottom, validation phases on the right](/diagrams/software-engineering/v-model.svg)

### Verification Phases (Left Side)

Verification consists of static checks (reviews), without executing code. There are five verification phases:

1. **Business requirement analysis** — the customer's requirements are gathered and understood; the acceptance test plan is prepared.
2. **System design** — the complete system (hardware and communication setup) is designed from the requirements; the system test plan is prepared.
3. **Architectural design (high-level design)** — the system is divided into modules, and the data flow between the modules and with external systems is defined; the integration test plan is prepared.
4. **Module design (low-level design)** — the detailed internal design of each module is specified; the unit test plan is prepared.
5. **Coding** — the modules are coded in a suitable programming language, following coding standards and code reviews. Coding joins the two sides of the V.

### Validation Phases (Right Side)

Validation consists of dynamic testing, in which the code is executed. There are four validation phases, each matching a verification phase:

1. **Unit testing** — each module is tested on its own (matches module design).
2. **Integration testing** — the modules are combined, and their interaction is tested (matches architectural design).
3. **System testing** — the complete system is tested, including its communication with external systems (matches system design).
4. **Acceptance testing** — the product is tested in the user's environment to check that it meets the business requirements, including compatibility, load and performance (matches business requirement analysis).

### Principles of the V-Model

1. **Large to small** — the requirements are refined from a large, general view to small, detailed parts.
2. **Data and process integrity** — the data and the processes are integrated in every phase.
3. **Scalability** — the model can be applied to projects of different size, complexity and duration.
4. **Cross-referencing** — every requirement is directly linked to the test activity that checks it (traceability).

### When to Use the V-Model

1. The requirements are clear, well documented, unambiguous and fixed.
2. The product definition and the technology are stable and well understood.
3. The project is short, or small to medium in size.
4. High reliability is needed, as in medical, aviation, banking and automotive software.

### Advantages of the V-Model

1. It is simple, disciplined and easy to manage; the phases are completed one at a time.
2. Test planning starts early, so defects are found early and are cheaper to fix.
3. Every requirement can be traced to a test.
4. Each phase has specific deliverables and a review.
5. It works well for small projects with well-understood requirements.

### Disadvantages of the V-Model

1. It is rigid, like the waterfall model, and cannot accommodate changing requirements easily.
2. No working software is produced until late in the life cycle.
3. Once testing has started, it is difficult to change the functionality.
4. It is not suitable for complex, object-oriented, long or high-risk projects.
5. It does not support iterative development or prototypes.

### V-Model vs Waterfall Model

| Basis | V-model | Waterfall model |
| --- | --- | --- |
| Shape | V-shaped | Linear steps, like a waterfall |
| Testing | Test planning starts in each development phase | Testing is a phase after coding |
| Defect detection | Early | Late |
| Development and testing | Proceed in parallel | Proceed one after another |
| Traceability | Each development phase is linked to a test phase | No direct link between phases and tests |

### Comparison of Software Development Models

| Basis | Waterfall | Agile | Spiral | RAD | V-model |
| --- | --- | --- | --- | --- | --- |
| Approach | Linear, sequential | Iterative, incremental | Iterative, risk-driven | Iterative, prototype-based | Sequential, V-shaped |
| Requirements | Fixed at the start | Can change at any time | Can change | Can change | Fixed at the start |
| Risk analysis | None | Informal, each iteration | Formal, in every loop | Low | None |
| Customer involvement | At start and end | Continuous | At each loop | Continuous | At start and end |
| Working software | At the end | After every iteration | After each loop | After each prototype/time box | At the end |
| Cost | Low | Medium | High | High (tools) | Medium |
| Best for | Small projects with clear requirements | Projects with changing requirements | Large, complex, high-risk projects | Modular projects with short deadlines | Projects needing high reliability and testing |

## References {#references}

**TutorialsPoint**

- [SDLC – Waterfall Model](https://www.tutorialspoint.com/sdlc/sdlc_waterfall_model.htm) — accessed 2026-11-03
- [SDLC – Agile Model](https://www.tutorialspoint.com/sdlc/sdlc_agile_model.htm) — accessed 2026-11-03
- [SDLC – Spiral Model](https://www.tutorialspoint.com/sdlc/sdlc_spiral_model.htm) — accessed 2026-11-03
- [SDLC – RAD Model](https://www.tutorialspoint.com/sdlc/sdlc_rad_model.htm) — accessed 2026-11-03 (the five-phase description: business, data and process modelling, application generation, testing and turnover)
- [SDLC – V-Model](https://www.tutorialspoint.com/sdlc/sdlc_v_model.htm) — accessed 2026-11-03

**GeeksforGeeks**

- [Waterfall Model](https://www.geeksforgeeks.org/software-engineering/waterfall-model/) — accessed 2026-11-03
- [Agile Development Models](https://www.geeksforgeeks.org/software-engineering/software-engineering-agile-development-models/) — accessed 2026-11-03 (the twelve agile principles)
- [Spiral Model](https://www.geeksforgeeks.org/software-engineering/software-engineering-spiral-model/) — accessed 2026-11-03 (radius and angular dimension, meta-model)
- [Rapid Application Development Model (RAD)](https://www.geeksforgeeks.org/software-engineering/software-engineering-rapid-application-development-model-rad/) — accessed 2026-11-03
- [SDLC V-Model](https://www.geeksforgeeks.org/software-engineering/software-engineering-sdlc-v-model/) — accessed 2026-11-03 (principles of the V-model)

**TpointTech**

- [Waterfall Model](https://www.tpointtech.com/software-engineering-waterfall-model) — accessed 2026-11-03 (the page says the model has five phases and later calls them six stages, and says in one section that the model is unsuitable for large, complex projects and in another that it is frequently applied to big projects; the phases used here follow TutorialsPoint)
- [Agile Model](https://www.tpointtech.com/software-engineering-agile-model) — accessed 2026-11-03 (agile methods)
- [Spiral Model](https://www.tpointtech.com/software-engineering-spiral-model) — accessed 2026-11-03
- [Rapid Application Development Model](https://www.tpointtech.com/software-engineering-rapid-application-development-model) — accessed 2026-11-03 (James Martin's four phases, time-boxing)
- [V-Model](https://www.tpointtech.com/software-engineering-v-model) — accessed 2026-11-03

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (for the origins of the models and the full Agile Manifesto, which the reference websites give only in part)

- Winston W. Royce, "Managing the Development of Large Software Systems", *Proceedings of IEEE WESCON*, 1970
- Barry W. Boehm, "A Spiral Model of Software Development and Enhancement", *ACM SIGSOFT Software Engineering Notes*, 1986
- James Martin, *Rapid Application Development*, Macmillan, 1991
- [Manifesto for Agile Software Development](https://agilemanifesto.org/) and [Principles behind the Agile Manifesto](https://agilemanifesto.org/principles.html), 2001
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — the five-phase description of the RAD model
