---
description: Software and software engineering, the software process, the history and nature of software engineering, its relation to other disciplines, and its relation to programming languages.
updated: 2026-11-03
---

## Introduction and Software Process {#introduction-and-software-process}

### Definition of Software

Software is a collection of programs together with the documentation and operating procedures needed to use them.

It is therefore more than program code: a software product is the complete package that is delivered to a user.

Software has three components:

1. **Programs** — the source code and the object (executable) code, together with the libraries they use.
2. **Documentation** — documents that describe the software, such as the requirements specification, design models (data flow diagrams, ER diagrams), test reports and user manuals.
3. **Operating procedures** — instructions for setting up and using the software, such as installation guides, system administration guides and reference guides.

A short formula that is often quoted is:

> Software product = Program + Documentation + Licensing (and operating procedures)

### Program vs Software Product

A program is a set of instructions written to perform a specific task on a computer. A software product is a complete, documented and tested system that is built for users and maintained over time.

| Basis | Program | Software product |
| --- | --- | --- |
| Definition | A set of instructions for one specific task | A complete product: programs, documentation, operating procedures and libraries |
| Size | Usually small | Usually large |
| Developed by | Usually one person | A team of developers |
| Users | Usually the programmer only | Many users, often unknown to the developers |
| Documentation | Little or none | Complete documentation (requirements, design, user manuals) |
| User interface | Often not planned | Carefully designed |
| Testing | Informal, by the programmer | Systematic and formal |
| Maintenance | Rarely maintained | Maintained and upgraded throughout its life |
| Development approach | Often written without a defined process | Developed by following a software process (life cycle) |

### Definition of Software Engineering

Software engineering is the branch of engineering that develops software products by using well-defined scientific principles, methods and procedures.

Its goal is to produce reliable, efficient and maintainable software within the planned time and budget.

Two standard definitions are frequently quoted:

1. **IEEE definition:** software engineering is (1) the application of a systematic, disciplined, quantifiable approach to the development, operation and maintenance of software, that is, the application of engineering to software; and (2) the study of such approaches.
2. **Fritz Bauer's definition:** software engineering is the establishment and use of sound engineering principles in order to obtain economically software that is reliable and works efficiently on real machines.

Software engineering is not limited to writing code. It covers the whole life of the software: planning, requirements, design, coding, testing, deployment and maintenance.

### Need for Software Engineering

Software engineering is needed because user requirements and the environments in which software runs change quickly. The main reasons are:

1. **Large software** — a large program needs a scientific, step-by-step process, just as a building needs more planning than a single wall.
2. **Scalability** — without engineering methods it is often easier to rebuild software than to extend an existing system.
3. **Cost** — hardware has become cheap through mass manufacturing, but software remains expensive when it is built without a proper process.
4. **Dynamic nature** — software must keep changing as the user's environment changes, so it must be built to be modified.
5. **Quality management** — a disciplined development process produces better-quality software.

### Importance of Software Engineering

1. **Reduces complexity** — a large problem is divided into smaller parts that are solved one by one.
2. **Minimizes cost** — planning removes unnecessary work and lowers the development cost.
3. **Decreases time** — following a defined method avoids wasted effort and repeated trial runs.
4. **Handles big projects** — planning, direction, testing and maintenance make long, large projects manageable.
5. **Produces reliable software** — testing and maintenance keep the software working for its intended period.
6. **Increases effectiveness** — following standards makes the software more effective.

### Software Engineering as a Layered Technology

Software engineering is described as a layered technology because it is built from four layers, and each layer rests on the layer below it (Roger S. Pressman).

![Software engineering as a layered technology: a quality focus at the bottom, then process, methods and tools](/diagrams/software-engineering/se-layers.svg)

The four layers, from the bottom up, are:

1. **A quality focus** — the bedrock of software engineering. Every engineering approach must rest on an organizational commitment to quality, supported by continuous process improvement.
2. **Process** — the foundation layer. The process holds the technology layers together and defines a framework of activities that must be established for the effective delivery of software on time.
3. **Methods** — the technical "how-to's" for building software: communication, requirements analysis, design modeling, program construction, testing and support.
4. **Tools** — automated or semi-automated support for the process and the methods. When tools are integrated, so that information created by one tool can be used by another, the system is called computer-aided software engineering (CASE).

### Software Process

A software process is a set of related activities and their results that together produce a software product.

The activities are usually carried out by software engineers, and the result is a working, documented system.

#### Fundamental Activities of a Software Process

Every software process contains four fundamental activities:

1. **Software specification** — the customer and the engineers define the functions of the software and the constraints on its operation.
2. **Software development** — the software is designed and programmed to meet the specification.
3. **Software validation** — the software is checked to ensure that it does what the customer wants.
4. **Software evolution** — the software is modified to meet changing customer and market requirements.

#### Software Process Framework

A process framework is the foundation of a complete software process. It identifies a small number of framework activities that apply to every project, together with umbrella activities that apply throughout the process.

![Generic software process framework with five framework activities and eight umbrella activities](/diagrams/software-engineering/process-framework.svg)

The five framework activities are:

1. **Communication** — gathering requirements from the customer and other stakeholders through meetings, interviews and surveys, and agreeing on the objectives of the system.
2. **Planning** — preparing the work plan: technical risks, required resources (time, people, tools), work products and the schedule.
3. **Modeling** — analyzing the requirements and creating architectural and detailed design models that act as a blueprint for development.
4. **Construction** — writing the code from the design models and testing it to find and remove errors.
5. **Deployment** — delivering the software (complete or in increments) to the customer, who evaluates it and gives feedback.

The eight umbrella activities are:

1. **Software project tracking and control** — comparing progress with the plan and taking corrective action to keep to the schedule.
2. **Risk management** — assessing risks that may affect the outcome of the project or the quality of the product.
3. **Software quality assurance** — the activities needed to ensure the quality of the software.
4. **Technical reviews** — reviewing work products to find and remove errors before they move to the next activity.
5. **Software configuration management** — controlling the effects of change throughout the process.
6. **Work product preparation and production** — creating the models, documents, logs, forms and lists the project needs.
7. **Reusability management** — defining criteria for reuse and keeping reusable work products and components.
8. **Measurement** — defining and collecting process, project and product measures that help the team deliver the required software.

#### Software Process Models

A software process model is a simplified description of a software process, presented from a particular perspective. Because it is an abstraction of the actual process, a model shows only part of the information about that process.

Process models are of three types by perspective:

1. **Workflow model** — shows the sequence of activities in the process, with their inputs, outputs and dependencies. The activities in this model represent human actions.
2. **Dataflow (activity) model** — shows the process as a set of activities, each of which transforms data; for example, a specification is transformed into a design. The activities may be carried out by people or by computers.
3. **Role/action model** — shows the roles of the people involved in the process and the activities for which each of them is responsible.

There are four general paradigms (approaches) of software development:

1. **Waterfall approach** — the activities are carried out as separate phases (requirements, design, implementation, testing and so on); each phase is signed off before the next one starts.
2. **Evolutionary development** — specification, development and validation are interleaved; an initial system is built quickly from an abstract specification and then refined with customer feedback.
3. **Formal transformation** — a formal mathematical specification of the system is converted into a program by transformations that preserve correctness.
4. **System assembly from reusable components** — the system is built mainly by integrating existing components instead of developing everything from scratch.

The individual models (waterfall, spiral, V-model, agile and others) are explained in [Software Development Models](/topics/software-engineering/software-development-models).

#### Software Paradigms

Software paradigms are the methods and steps that are followed while developing software.

They form three nested levels: programming is a part of software design, and software design is a part of software development.

1. **Software development paradigm** — requirement gathering, software design and programming.
2. **Software design paradigm** — design, maintenance and programming.
3. **Programming paradigm** — coding, testing and integration.

## History and Nature of Software Engineering {#history-and-nature-of-software-engineering}

### Evolution of Software Engineering: From Art to Engineering

Software development has passed through three stages:

1. **Art** — in the early days, programs were written by individuals or very small teams using intuition and personal experience ("programming by intuition"). There was no planning or defined method, and the skill stayed with a few talented programmers.
2. **Craft** — as more people learned programming, coding styles, standards and established ways of working appeared, and university courses and research spread this knowledge. Development became more reliable and less error-prone.
3. **Engineering discipline** — design and coding are now based on documented principles, standards and research-based rules that anyone can learn and apply. These principles are used throughout the software industry.

### History of Software Engineering

| Year | Event |
| --- | --- |
| 1950s | Douglas T. Ross lectured on "software engineering" at MIT, one of the earliest uses of the idea. |
| 1965 | The term "software engineering" appeared in the June 1965 issue of the magazine *Computers and Automation*. |
| 1966 | Anthony A. Oettinger, president of the ACM, used the term in his president's letter in *Communications of the ACM* (August 1966). |
| Late 1960s | Margaret H. Hamilton used the name "software engineering" for the Apollo guidance software work, to give the discipline legitimacy. |
| 1968 | The NATO Science Committee organized the first conference on software engineering at Garmisch, Germany (7–11 October 1968). About 50 experts attended. The phrase "software crisis" also came from this conference. This conference is widely regarded as the start of software engineering as a profession. |
| 1969 | A second NATO software engineering conference was held in Rome, Italy (October 1969). |
| 1960s–1980s | The period of the software crisis: many projects ran over budget and schedule, and defective software caused damage. IBM's OS/360 is a classic example of cost and schedule overruns. |
| 1970s | Structured programming and structured design came into wide use. |
| 1975 | Fred Brooks published *The Mythical Man-Month*, based on his experience of managing OS/360. |
| 1980s | Object-oriented programming changed the way software was designed and built. |
| 1984 | The Software Engineering Institute (SEI) was established at Carnegie Mellon University. |
| 1986 | Fred Brooks published "No Silver Bullet", arguing that no single technology or practice would give a tenfold improvement in productivity within a decade. |
| 1990s | The Internet became prominent; agile methods such as Scrum and Extreme Programming (XP) appeared. |
| 2001 | The Agile Manifesto was published, and lightweight (agile) methods spread widely in the following years. |

### Software Crisis

The software crisis is the set of problems that arose because it became very difficult to write useful and efficient programs in the required time.

Demand for software and its complexity grew rapidly, but the same workforce, methods and tools were still being used, so projects failed to keep pace.

The symptoms of the software crisis were:

1. Projects ran over budget.
2. Projects were delivered late, and some were never delivered.
3. The software was of poor quality and contained many errors.
4. The software was inefficient.
5. The software often did not meet the user's requirements.
6. The software was difficult to change, debug and enhance.
7. Maintenance cost as much as, or more than, development.
8. Projects were difficult to manage.

The main causes were:

1. Poor project management.
2. Lack of training in software engineering.
3. Less-skilled project members.
4. Little improvement in productivity.
5. Growing size and complexity of software.

The solution to the software crisis is software engineering: a systematic, disciplined and quantifiable approach to development. Following its principles reduces budget overruns, improves quality, shortens development time, uses experienced and trained staff, and delivers software that meets the user's requirements.

### Nature of Software

Software is a logical rather than a physical element, so it has characteristics that are quite different from those of hardware.

The three characteristics of software are:

1. **Software is developed or engineered; it is not manufactured in the classical sense.** Both hardware and software need good design to achieve high quality, but manufacturing hardware can introduce quality problems that do not exist for software. The cost of software lies in engineering it, not in producing copies.
2. **Software does not wear out, but it does deteriorate.** Hardware follows the "bathtub curve": its failure rate is high early in its life (manufacturing defects), falls to a low steady level, and rises again as components wear out because of dust, vibration, temperature and other environmental effects. Software is not affected by these effects, so in theory its failure-rate curve should flatten after the early defects are corrected (the idealized curve). In practice, every change made during maintenance can introduce new errors, so the failure rate jumps after each change; over time the minimum failure rate rises and the software deteriorates (the actual curve). A worn-out hardware part can be replaced with a spare part, but software has no spare parts, so software maintenance is more complex than hardware maintenance.
3. **Most software is still custom-built, although the industry is moving towards component-based assembly.** Hardware engineers assemble products from standard, reusable components, while much software has traditionally been built from scratch for each customer. Modern software increasingly reuses components such as libraries and frameworks.

![Failure curves: the hardware bathtub curve and the idealized and actual failure curves of software](/diagrams/software-engineering/failure-curves.svg)

#### Changing Nature of Software

The nature of software has changed over time, and software now belongs to seven broad categories:

1. **System software** — programs written to serve other programs, such as compilers, editors, file-management utilities and operating-system components.
2. **Application software** — stand-alone programs that solve a specific business need, such as point-of-sale transaction processing and real-time manufacturing process control.
3. **Engineering and scientific software** — programs that use "number crunching" algorithms, such as those for astronomy, molecular biology, computer-aided design and simulation.
4. **Embedded software** — software that resides inside a product or system and controls its features and functions, such as the keypad control of a microwave oven or the fuel control of a car.
5. **Product-line software** — software designed to provide a specific capability for many different customers, such as word processors, spreadsheets, database management and multimedia software.
6. **Web applications (WebApps)** — network-centric software that ranges from simple linked web pages to sophisticated applications integrated with corporate databases.
7. **Artificial intelligence software** — software that uses non-numerical algorithms to solve complex problems, such as robotics, expert systems, pattern recognition, neural networks and game playing.

#### Software Evolution

Software evolution is the process of developing software and then updating it continually, by using software engineering principles, until it meets the required needs.

It starts with requirement gathering and a prototype; user feedback then leads to repeated changes and new releases. Because technology and requirements keep changing, updating existing software is usually more practical than building it again.

Meir M. Lehman classified software into three types by how it evolves:

1. **S-type (static type)** — software that works strictly according to a defined specification and solution. It changes the least. Example: a calculator program for mathematical computation.
2. **P-type (practical type)** — software defined by a collection of procedures. Its specification can be described, but the solution is not obvious at once. Example: gaming software.
3. **E-type (embedded type)** — software that works closely with the requirements of a real-world environment. It changes the most, because real-world conditions keep changing. Example: online trading software.

Lehman's laws of software evolution describe how E-type software changes. There are eight laws:

1. **Continuing change** — E-type software must keep adapting to real-world changes, or it becomes progressively less useful.
2. **Increasing complexity** — as the software evolves, its complexity tends to increase unless work is done to maintain or reduce it.
3. **Conservation of familiarity** — the knowledge of how and why the software was developed must be retained at any cost, so that changes can be made correctly.
4. **Continuing growth** — the size of the software keeps growing as the business it supports changes.
5. **Reducing quality** — the quality of the software declines unless it is rigorously maintained and adapted to its changing environment.
6. **Feedback systems** — E-type software forms multi-loop, multi-level feedback systems and must be treated as such to be modified or improved successfully.
7. **Self-regulation** — the evolution process is self-regulating, and its product and process measures are distributed close to normal.
8. **Organizational stability** — the average effective global activity rate in an evolving system is invariant over the lifetime of the product.

## Relation of Software Engineering to Other Disciplines {#relation-of-software-engineering-to-other-disciplines}

Software engineering is a part of computer science, but it also draws on many other fields. Computer science studies the theories and methods that underlie computers and software, while software engineering deals with the practical problems of producing software. Software engineering is based on computer science in the same way that electrical engineering is based on physics: the scientist extends knowledge, and the engineer applies it to build useful products within limits of time and cost.

The relationship of software engineering to other subjects is studied in two groups (Ghezzi, Jazayeri and Mandrioli):

1. Its relationship to other areas of computer science.
2. Its relationship to disciplines outside computer science.

### A. Relationship to Other Areas of Computer Science

1. **Programming languages** — languages are the main tools of the software engineer, and many language features were introduced to support software engineering principles. This relationship is explained in the next section, [Programming Languages](#programming-languages).
2. **Operating systems** — operating systems were among the first very large software systems, so many software engineering ideas were first developed and tested in them. Examples are the layered (hierarchical) structure of a system, in which each layer uses only the services of the layer below it; the virtual machine, which hides the hardware behind an abstract interface; and the separation of policy (what is done) from mechanism (how it is done). In the other direction, operating systems provide the environment and many of the tools that software engineers use, and operating-system design benefits from software engineering methods for structuring and verifying large programs.
3. **Databases** — database systems introduced data independence, which separates the logical view of the data from its physical storage; this is an application of the software engineering principles of abstraction and separation of the interface from the implementation. Database technology is also used inside software engineering environments to store and manage software artifacts (requirements, designs, code and versions) for configuration management, and software engineering methods are used to design database applications.
4. **Artificial intelligence (AI)** — AI systems are often hard to specify completely in advance, so AI work encouraged exploratory programming and prototyping, ideas that also entered software engineering. AI techniques, such as expert systems and knowledge-based assistants, are used to build intelligent software tools, and large AI systems in turn need software engineering methods to be built reliably.
5. **Theoretical computer science (theoretical models)** — formal models such as finite state machines, formal languages and grammars, Petri nets and mathematical logic are used to specify, analyze and verify software. These models give software engineering a precise foundation, much as mathematics does for other engineering fields.

### B. Relationship to Other Disciplines

1. **Management science** — much of software engineering is management: estimating cost and effort, scheduling, planning human resources, dividing and assigning work, monitoring progress and managing risk. These activities use the methods of management science and project management.
2. **Systems engineering** — systems engineering studies complex systems that are made of hardware, software and people. Software is usually one component of such a system, so software engineering is part of systems engineering: the requirements of the software come from the requirements of the whole system, and the life-cycle concepts of software engineering were adopted from systems engineering.

The *Guide to the Software Engineering Body of Knowledge* (SWEBOK) lists seven related disciplines:

1. **Computer engineering** — the design of computer hardware and of systems that combine hardware and software.
2. **Computer science** — the theory, algorithms and data structures on which software is built.
3. **General management** — the management of organizations, people and money.
4. **Mathematics** — discrete mathematics, logic and statistics, used for formal specification, analysis and measurement.
5. **Project management** — planning, scheduling and controlling projects.
6. **Quality management** — quality planning, quality assurance and quality improvement.
7. **Systems engineering** — the development of complete systems, of which software is one part.

## Programming Languages {#programming-languages}

A programming language is a formal language with a defined syntax and semantics that is used to write instructions a computer can execute. Programming languages are the main tools of the software engineer, so software engineering and programming languages have strongly influenced each other.

### Influence of Software Engineering on Programming Languages

As software grew larger, programming languages added features that directly support software engineering principles such as modularity, abstraction, information hiding and reuse. The main features are:

1. **Structured control constructs** — `if-else`, `while`, `for` and `switch` statements replace unrestricted `goto` jumps, so programs follow structured programming and are easier to read and verify.
2. **Modules and separate compilation** — a large program can be divided into modules that are written and compiled separately, for example Ada packages, Modula-2 modules and Java packages.
3. **Separation of interface from implementation** — a module exposes only its interface and hides its internal details (information hiding); for example, an Ada package has a separate specification and body.
4. **Abstract data types and classes** — data and the operations on it are encapsulated together, which led to object-oriented languages such as C++ and Java.
5. **Strong type checking** — the compiler checks that data is used consistently, so many errors are detected before the program runs.
6. **Exception handling** — the program can detect and recover from errors and unusual conditions, which makes software more robust (for example, in Ada, C++ and Java).
7. **Generic units and templates** — one piece of code can work with many data types, which supports generality and reuse (for example, Ada generics, C++ templates and Java generics).
8. **Concurrency constructs** — built-in support for parallel activities, such as Ada tasks and Java threads.

The language Ada (standardized in 1983 for the US Department of Defense) is a well-known example of a language designed specifically to support software engineering: it combines packages, separate compilation, strong typing, exception handling, generics and tasks.

### Influence of Programming Languages on Software Engineering

1. **Formal definition of syntax** — because language syntax is defined formally (for example, in BNF), tools could be generated automatically: lexical-analyzer and parser generators (such as lex and yacc), syntax-directed editors and compilers. These tools are part of modern software development environments.
2. **Design and specification notations** — many design and specification languages borrow ideas from programming languages, such as modules, types and interfaces.
3. **Quality of the product** — the language chosen affects the qualities of the software, such as its reliability, efficiency, maintainability and portability.

### Choosing a Programming Language for a Project

The programming language is chosen according to the requirements of the project, not according to its popularity. The main factors are:

1. **Type of application** — the purpose of the project (web, mobile, embedded, data science and so on) and its size and complexity.
2. **Target platform** — where the program will run; for example, Java bytecode runs on any machine that has a Java Virtual Machine, while a C program must be compiled separately for each platform.
3. **Maintainability** — a current language with long-term support, for which enough developers are available to maintain the software.
4. **Scalability and performance** — whether the language and its tools can handle more users and more features without slowing down or failing.
5. **Security** — the security requirements of the domain, for example for health-care or financial applications.
6. **Community support** — the availability of tutorials, forums and other help for solving problems.
7. **Development time** — the available libraries and packages, and the team's existing knowledge of the language.

## References {#references}

**TutorialsPoint**

- [Software Engineering Overview](https://www.tutorialspoint.com/software_engineering/software_engineering_overview.htm) — accessed 2026-11-03 (definitions, need for software engineering, software evolution, Lehman's S/P/E types and laws, software paradigms)
- [Software Implementation](https://www.tutorialspoint.com/software_engineering/software_implementation.htm) — accessed 2026-11-03 (structured programming and the role of the language in coding)

**GeeksforGeeks**

- [Introduction to Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-engineering-introduction-to-software-engineering/) — accessed 2026-11-03 (definition, program vs software product)
- [Software Processes in Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-processes-in-software-engineering/) — accessed 2026-11-03
- [Software Process Framework](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-process-framework/) — accessed 2026-11-03
- [Layered Technology in Software Engineering](https://www.geeksforgeeks.org/?p=672294) — accessed 2026-11-03 (this page calls the quality focus the "top layer" and the process the "foundation"; in Pressman's model, which the page follows, the quality focus is the bedrock at the bottom and the process is the foundation layer above it)
- [Software Crisis](https://www.geeksforgeeks.org/software-engineering/software-engineering-software-crisis/) — accessed 2026-11-03
- [Software Characteristics](https://www.geeksforgeeks.org/software-engineering-software-characteristics/) — accessed 2026-11-03
- [Changing Nature of Software](https://www.geeksforgeeks.org/software-engineering-changing-nature-of-software/) — accessed 2026-11-03
- [Evolution of Software Engineering: From an Art to Engineering Discipline](https://www.geeksforgeeks.org/software-engineering/evolution-of-software-engineering-from-an-art-to-engineering-discipline/) — accessed 2026-11-03 (its timeline dates Pressman's *Software Engineering: A Practitioner's Approach* to 1975; the first edition appeared in 1982, so that entry is not used here)
- [How to Choose a Programming Language for a Project](https://www.geeksforgeeks.org/blogs/how-to-choose-a-programming-language-for-a-project/) — accessed 2026-11-03

**TpointTech**

- [Software Engineering Tutorial](https://www.tpointtech.com/software-engineering) — accessed 2026-11-03 (definitions, need for and importance of software engineering)
- [Software Processes](https://www.tpointtech.com/software-processes) — accessed 2026-11-03 (process activities, types of process models, general paradigms, components of software, software crisis)
- [Characteristics of Software Engineering](https://www.tpointtech.com/characteristics-of-software-engineering) — accessed 2026-11-03
- [Layered Technology in Software Engineering](https://www.tpointtech.com/layered-technology-in-software-engineering) — accessed 2026-11-03 (this page describes layered system architecture — presentation, application, domain and infrastructure layers — not Pressman's quality/process/methods/tools layers, so it is not used for that section)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (the reference websites do not cover the history in detail, the relation of software engineering to other disciplines, or the relation to programming languages)

- Carlo Ghezzi, Mehdi Jazayeri and Dino Mandrioli, *Fundamentals of Software Engineering*, 2nd edition, Prentice Hall, chapter 1 — "A Shortened History of Software Engineering", "The Relationship of Software Engineering to Other Areas of Computer Science" and "The Relationship of Software Engineering to Other Disciplines" ([table of contents at Pearson](https://www.pearson.com/en-us/subject-catalog/p/fundamentals-of-software-engineering/P200000003499/9780133056990))
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — software engineering as a layered technology, the nature of software and the failure curves
- Wikipedia, [History of software engineering](https://en.wikipedia.org/wiki/History_of_software_engineering) and [Software engineering](https://en.wikipedia.org/wiki/Software_engineering) — accessed 2026-11-03 (early uses of the term, the NATO conferences, OS/360, the Software Engineering Institute, "No Silver Bullet")
- P. Naur and B. Randell (eds.), *Software Engineering: Report on a Conference Sponsored by the NATO Science Committee*, Garmisch, Germany, 7–11 October 1968
- IEEE Computer Society, *Guide to the Software Engineering Body of Knowledge (SWEBOK)*, Version 3.0, 2014 — "Related Disciplines"
