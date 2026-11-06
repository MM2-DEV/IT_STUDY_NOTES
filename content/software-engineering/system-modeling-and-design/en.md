---
description: System models (context, behavioural and object models), the basics of UML modelling diagrams, user interface design, object-oriented design techniques, real-time software design, and system design with reuse.
updated: 2026-11-04
---

## System Models: Context, Behavioral and Object Models {#system-models-context-behavioral-and-object-models}

### Definition of System Model

A system model is an abstract, usually graphical, representation of a system that shows one view (perspective) of it, leaving out the other details. System modelling is the process of building such models, today mostly with the **UML (Unified Modeling Language)** notation, to understand the system to be developed and to explain it to customers and developers.

System models are used:

1. During **requirements engineering**, to understand the existing system and to discuss the proposed one with stakeholders.
2. During **design**, to describe the system to the engineers who build it.
3. After implementation, to **document** the structure and operation of the system.

### Perspectives of System Models

A system is described by models from four perspectives:

1. **External perspective** — models the **context** (environment) of the system.
2. **Interaction perspective** — models the interactions between the system and its users, other systems, and its own components.
3. **Structural perspective** — models the organization of the system or the structure of its data.
4. **Behavioural perspective** — models the dynamic behaviour of the system and how it responds to events.

### Types of System Models

From these perspectives, system models are of four types:

1. **Context model** (external perspective).
2. **Interaction model** (interaction perspective) — use-case diagrams and sequence diagrams.
3. **Object (structural) model** (structural perspective) — class diagrams, with inheritance and aggregation.
4. **Behavioural model** (behavioural perspective) — data-flow diagrams and state diagrams.

The context, behavioural and object models are explained below; the use-case and sequence diagrams of the interaction model are explained in [Basics of Modeling Diagrams](#basics-of-modeling-diagrams).

### 1. Context Model

A context model is a model that shows the **system and its environment**: the other systems, people and organizations with which the system interacts, and the **boundary** between what is inside the system and what is outside it. It is drawn at an early stage of requirements engineering, together with the stakeholders, to decide which functions the new system will provide and which are provided by the systems around it.

The system is drawn as one box in the centre, and the external systems and actors are drawn around it and connected to it.

![Context model of an ATM system: the ATM system in the centre, surrounded by the account database, security system, branch accounting system, usage database, maintenance system and customer](/diagrams/software-engineering/atm-context-model.svg)

**Example — ATM system:** the ATM system interacts with the account database (account details), the branch accounting system, the security system, the usage database, the maintenance system and the customer. These are outside the system boundary, so they are not developed as part of the ATM software, but the interfaces to them must be.

The position of the **system boundary** is an important decision, because it decides the requirements, the cost and the development time of the system. A context model shows only the systems in the environment, not the data exchanged with them; process models such as **UML activity diagrams** are used together with context models to show how the system is used in a wider business process.

### 2. Behavioural Model

A behavioural model is a model of the **dynamic behaviour** of a system while it is running: it shows what happens, or should happen, when the system responds to a **stimulus** from its environment.

The stimulus is of two kinds, so behavioural models are of two types:

1. **Data-driven (data-processing) model** — the stimulus is **data** that arrives and must be processed.
2. **Event-driven (state machine) model** — the stimulus is an **event** that triggers processing.

#### (a) Data-Driven Model: Data-Flow Diagram

A data-driven model shows the **sequence of actions** involved in processing input data and producing output. It is drawn as a **data-flow diagram (DFD)** (also called a bubble chart), or as a UML activity diagram.

The four elements of a DFD are:

1. **External entity (source or sink)** — a rectangle; a person or system outside the system that supplies or receives data.
2. **Process** — a circle (bubble); a function that transforms input data into output data.
3. **Data flow** — an arrow labelled with the data that moves.
4. **Data store** — two parallel lines; data at rest, such as a file or a database table.

![Data-flow diagram of order processing: a customer order is validated, an invoice is prepared, and goods are dispatched, with an orders file as the data store](/diagrams/software-engineering/dfd-order.svg)

DFDs are drawn in levels: the **level 0 DFD (context diagram)** shows the whole system as a single process with its external entities, and the **level 1** and **level 2** DFDs divide it into more detailed processes. DFDs are explained in detail in [System Analysis and Design](/topics/software-engineering/system-analysis-and-design#data-flow-diagram-dfd).

#### (b) Event-Driven Model: State Machine Model

A state machine model shows how a system **responds to external and internal events**: the system is in one **state** at a time, and an event causes a **transition** to another state. It is drawn as a **UML state diagram (statechart)**, and it suits **real-time systems**, which are driven by events.

The elements of a state diagram are:

1. **State** — a rounded rectangle; a condition of the system (or object) during its life.
2. **Transition** — an arrow from one state to another, labelled with the **event** that causes it.
3. **Initial state** — a filled circle.
4. **Final state** — a filled circle inside a ring.

![State diagram of a microwave oven: Waiting, Set power, Set time, Enabled, Disabled and Operation states with transitions labelled by events](/diagrams/software-engineering/microwave-state.svg)

**Example — microwave oven:** the oven waits for the user; pressing the power button and entering a time sets it up; it is **enabled** only when the door is closed, and pressing *start* begins cooking; when the time runs out, it returns to *waiting*. Opening the door disables it, so it cannot cook with the door open.

### 3. Object Model

An object model is a structural model that describes a system in terms of **object classes** and the **relationships** between them. It is drawn as a **UML class diagram**, and it is the basis of object-oriented design.

1. **Object** — an entity with an **identity**, a **state** (its attribute values) and **behaviour** (its operations); for example, one particular bank account.
2. **Class** — a description (template) of a set of objects with the same attributes and operations; it is drawn as a box with three compartments: the **name**, the **attributes** and the **operations**.

![Class diagram of a bank system: Customer owns Accounts, Bank aggregates Accounts, and SavingsAccount and CurrentAccount inherit from Account](/diagrams/software-engineering/class-diagram.svg)

The main relationships in an object model are of three types:

1. **Inheritance (generalization)** — an **"is-a"** relationship: a subclass inherits the attributes and operations of a superclass and adds its own. Drawn as a line with a **hollow triangle** at the superclass. Example: a savings account *is an* account. Classes arranged by inheritance form an **inheritance model** (class hierarchy).
2. **Aggregation** — a **"has-a" (whole–part)** relationship: one object is made up of other objects. Drawn with a **hollow diamond** at the whole. Example: a bank *has* accounts. In **composition**, a strong form of aggregation drawn with a **filled diamond**, the parts cannot exist without the whole.
3. **Association** — a general link between classes, drawn as a plain line, with **multiplicities** (such as `1`, `1..*`, `*`) showing how many objects take part. Example: a customer owns one or more accounts.

The behaviour of objects (how they cooperate by calling each other's operations) is shown with **sequence diagrams** and state diagrams; this is called **object behaviour modelling**.

#### Comparison of Context, Behavioural and Object Models

| Basis | Context model | Behavioural model | Object model |
| --- | --- | --- | --- |
| Perspective | External | Behavioural (dynamic) | Structural (static) |
| Shows | The system, its environment and its boundary | How the system responds to data or events | The classes of the system and their relationships |
| Main diagrams | Context (block) diagram, activity diagram | Data-flow diagram, state diagram | Class diagram |
| Main question | What is inside and outside the system? | What does the system do when data or an event arrives? | What is the system made of? |
| Used mainly in | Early requirements engineering | Requirements analysis and design | Object-oriented analysis and design |

## Basics of Modeling Diagrams {#basics-of-modeling-diagrams}

### Definition of UML

The Unified Modeling Language (UML) is a standard, general-purpose **visual modelling language** for specifying, visualizing, constructing and documenting the artifacts of a software system. It is a notation, **not a programming language**, and it does not prescribe a development process.

UML was created by unifying the methods of **Grady Booch**, **James Rumbaugh** (OMT) and **Ivar Jacobson** (OOSE). It was adopted as a standard by the **Object Management Group (OMG)** in 1997 and published as an ISO standard (ISO/IEC 19501) in 2005. The current version, **UML 2.5**, defines **14 diagram types**.

### Uses of UML

1. It gives developers, designers and stakeholders a **common visual language**.
2. It makes complex systems **easier to understand**.
3. It helps to **plan the structure and behaviour** of a system before coding.
4. It **documents** the system for maintenance.

### Building Blocks of UML

UML has three kinds of building blocks:

1. **Things** — the elements of a model:
   1. **Structural things** — class, object, interface, collaboration, use case, actor, component and node.
   2. **Behavioural things** — interaction (message exchange) and state machine.
   3. **Grouping thing** — package.
   4. **Annotational thing** — note.
2. **Relationships** — the links between things:
   1. **Dependency** — one element uses another; a change in the independent element may affect the dependent one (dashed arrow).
   2. **Association** — a structural link between elements, with multiplicity (solid line).
   3. **Generalization** — a parent–child (inheritance) relationship (solid line with a hollow triangle).
   4. **Realization** — a class implements an interface (dashed line with a hollow triangle).
3. **Diagrams** — graphical views of the model, explained below.

### Types of UML Diagrams

UML 2.5 has 14 diagrams, of two types:

![The fourteen UML 2.5 diagrams: seven structural and seven behavioural, of which four are interaction diagrams](/diagrams/software-engineering/uml-diagrams.svg)

**1. Structural (static) diagrams** show the static structure of the system. There are seven:

1. **Class diagram** — classes, their attributes and operations, and their relationships.
2. **Object diagram** — objects (instances of classes) and their links at one moment.
3. **Component diagram** — the software components and their interfaces and dependencies.
4. **Deployment diagram** — the hardware nodes and the software artifacts deployed on them.
5. **Package diagram** — how model elements are grouped into packages, and the dependencies between packages.
6. **Composite structure diagram** — the internal parts, ports and connectors of a class.
7. **Profile diagram** — extensions of UML (stereotypes) for a particular domain.

**2. Behavioural (dynamic) diagrams** show the dynamic behaviour of the system. There are seven:

1. **Use case diagram** — the functions of the system and the actors who use them.
2. **Activity diagram** — the flow of activities, decisions and parallel work (like a flowchart).
3. **State machine diagram** — the states of an object and the events that change them.
4. **Sequence diagram** — the messages exchanged between objects in time order.
5. **Communication (collaboration) diagram** — the messages exchanged between objects, emphasizing their links.
6. **Timing diagram** — how states change over time, with timing constraints.
7. **Interaction overview diagram** — an activity diagram whose nodes are interactions.

The sequence, communication, timing and interaction overview diagrams are together called **interaction diagrams**.

### Use Case Diagram

A use case diagram shows the **functional requirements** of a system: what the system does (use cases) and who uses it (actors), from the user's point of view.

The elements of a use case diagram are:

1. **Actor** — a stick figure; a user or external system that interacts with the system.
2. **Use case** — an ellipse; a function or goal of the system, such as *Withdraw cash*.
3. **System boundary** — a rectangle around the use cases.
4. **Relationships**:
   1. **Association** — a line between an actor and a use case.
   2. **Include** (`<<include>>`) — a use case **always** includes the behaviour of another (for example, *Withdraw cash* includes *Validate PIN*).
   3. **Extend** (`<<extend>>`) — a use case **optionally** adds behaviour to another under a condition (for example, *Print receipt* extends *Withdraw cash*).
   4. **Generalization** — a child actor or use case inherits from a parent.

### Class Diagram

A class diagram shows the **static structure** of a system: its classes and the relationships between them (see the [object model](#system-models-context-behavioral-and-object-models) above).

1. Each class is a box with three compartments: **name**, **attributes** and **operations**.
2. **Visibility** of members: `+` public, `-` private, `#` protected, `~` package.
3. **Relationships:**
   1. **Association** — classes are linked (plain line).
   2. **Aggregation** — whole–part; the part can exist without the whole (hollow diamond).
   3. **Composition** — whole–part; the part cannot exist without the whole (filled diamond).
   4. **Generalization (inheritance)** — is-a (hollow triangle).
   5. **Dependency** — a temporary, weak use of another class (dashed arrow).
   6. **Realization** — a class implements an interface (dashed line with a hollow triangle).
4. **Multiplicity** — how many objects take part: `1`, `0..1`, `*` (many), `1..*` (one or more).

### Sequence Diagram

A sequence diagram shows how objects interact **in time order** in one scenario (one use case).

The elements of a sequence diagram are:

1. **Actor and objects (lifelines)** — drawn at the top, each with a dashed vertical line (its lifeline); time runs downwards.
2. **Activation bar** — a thin rectangle on a lifeline while the object is active.
3. **Messages** — horizontal arrows between lifelines:
   1. **Synchronous message** — the sender waits for the reply (filled arrowhead).
   2. **Asynchronous message** — the sender continues without waiting (open arrowhead).
   3. **Return message** — a dashed arrow back to the caller.
   4. **Create and destroy messages** — create a new object or end one.
4. **Combined fragments** — boxes such as `alt` (alternatives), `opt` (optional) and `loop` (repetition).

### Activity Diagram

An activity diagram shows the **flow of control** from one activity to another, like a flowchart, including decisions and parallel activities.

The elements of an activity diagram are:

1. **Initial node** — a filled circle.
2. **Activity or action** — a rounded rectangle.
3. **Control flow** — an arrow.
4. **Decision and merge nodes** — diamonds, for branching and joining alternative paths.
5. **Fork and join nodes** — thick bars, for starting and ending parallel activities.
6. **Final node** — a filled circle inside a ring.
7. **Swimlanes** — columns that show which actor or object performs each activity.

### State Machine Diagram

A state machine diagram shows the **states** of one object and the **transitions** caused by events (see the [behavioural model](#system-models-context-behavioral-and-object-models) above). Its elements are states (rounded rectangles), transitions (arrows labelled `event [guard] / action`), the initial state (filled circle) and the final state (filled circle in a ring).

## UI Design {#ui-design}

### Definition of User Interface

A user interface (UI) is the part of a software system through which users interact with it: the front end through which they give commands and data to the system and receive its results. User interface design is the process of designing this interface so that the system is easy to learn and use, efficient and attractive.

The attributes of a good user interface are:

1. **Attractive.**
2. **Simple to use.**
3. **Responsive in a short time.**
4. **Clear to understand.**
5. **Consistent on all interfacing screens.**

### Types of User Interface

User interfaces are of two main types:

1. Command line interface (CLI).
2. Graphical user interface (GUI).

#### 1. Command Line Interface (CLI)

A command line interface is a text-based interface in which the user types **commands** at a **prompt**, and the system replies with text. Examples are the UNIX shell and the Windows command prompt.

The elements of a CLI are:

1. **Command prompt** — a text notifier that shows the system is waiting for a command and the current context (for example, the current folder).
2. **Cursor** — a small blinking line or rectangle that shows the position where the next character will be typed.
3. **Command** — an executable instruction, possibly with parameters (options and arguments).

**Advantages:** it uses few computer resources, gives many options and fine control, and repetitive tasks can be automated with scripts and macros.

**Disadvantages:** the user must **remember** the commands and their syntax (recall rather than recognition), so it is hard for new users, and early CLIs handled user errors poorly.

#### 2. Graphical User Interface (GUI)

A graphical user interface is an interface in which the user interacts with the system through **graphical elements** — windows, icons, menus and a pointer (the **WIMP** interface) — usually with a mouse, touchpad or touch screen.

The elements of a GUI are:

1. **Window** — an area that shows the contents of an application; it can be moved, resized, minimized and maximized.
2. **Tabs** — let several documents or pages share one window.
3. **Menu** — a list of standard commands, usually at the top of the window.
4. **Icon** — a small picture that represents an application, file or action.
5. **Cursor (pointer)** — shows the position of the mouse, touchpad or pen.
6. **Application-specific components** — dialog boxes, text boxes, buttons, radio buttons (one choice), check boxes (several choices), list boxes, sliders, combo boxes and drop-down lists.

**Advantages:** it is easy to learn and use without expert knowledge (recognition rather than recall), it gives quick switching between tasks, and it can show several kinds of information at once.

**Disadvantages:** it needs more computer resources (memory and processing power), and it is less flexible and less customizable for expert users.

#### CLI vs GUI

| Basis | Command line interface (CLI) | Graphical user interface (GUI) |
| --- | --- | --- |
| Interaction | Typing text commands | Pointing and clicking on graphical elements |
| Main input device | Keyboard | Mouse, touchpad or touch screen |
| Ease of learning | Hard; commands must be remembered | Easy; options are visible |
| Speed for experts | Fast | Slower for repetitive tasks |
| Resource use | Low | High |
| Flexibility and automation | High (scripts) | Lower |
| Examples | UNIX shell, Windows command prompt | Windows, macOS, Android |

### User Interface Design Process

UI design is an iterative process, which can follow the waterfall, iterative or spiral model. It has five activities:

1. **Requirements gathering** — the functional and non-functional requirements of the interface are collected from the users and from existing systems.
2. **User analysis** — the users are studied: who they are and what their skill level is. Expert users can work with complex interfaces, while novices need simple interfaces with more guidance.
3. **Task analysis** — the tasks the users must perform are identified and divided into sub-tasks; this decides **what** the interface must do and the flow of its screens. (User, task and environment analysis are often done together.)
4. **Interface design and implementation** — the interface objects, actions and screen layouts are designed, a **prototype** is built (often with a GUI tool), and it is connected to the working or dummy back-end.
5. **Interface validation (testing)** — the interface is evaluated by inspection, with users and by beta release, for usability, compatibility and user acceptance.

Some GUI implementation tools are FLUID, App Inventor (Android), LucidChart, Wavemaker and Visual Studio.

### Golden Rules of User Interface Design

**Theo Mandel's three golden rules** (Pressman) are:

1. **Place the user in control:**
   1. Do not force the user into unnecessary or unwanted actions.
   2. Provide flexible interaction (keyboard, mouse, touch).
   3. Allow user interaction to be interruptible and undoable.
   4. Allow the interface to be customized by expert users.
   5. Hide technical internals from the casual user.
2. **Reduce the user's memory load:**
   1. Reduce demand on short-term memory (show previous actions and results).
   2. Establish meaningful defaults.
   3. Define intuitive shortcuts.
   4. Base the visual layout on a real-world metaphor.
   5. Disclose information progressively (overview first, details on demand).
3. **Make the interface consistent:**
   1. Keep the same layout, terms and behaviour throughout the application, and across a family of applications.
   2. Do not change interaction models that users already know, unless there is a compelling reason.

**Shneiderman's eight golden rules** (Ben Shneiderman and Catherine Plaisant) are:

1. **Strive for consistency** — the same sequences of actions, terms and commands in similar situations.
2. **Enable frequent users to use shortcuts** — abbreviations, function keys, hidden commands and macros.
3. **Offer informative feedback** — every action gets a response, modest for minor actions and substantial for major ones.
4. **Design dialogs to yield closure** — group actions into sequences with a beginning, middle and end, and show when a task is complete.
5. **Offer simple error handling** — prevent serious errors, and when an error occurs, detect it and offer a simple way to recover.
6. **Permit easy reversal of actions** — allow undo, which reduces anxiety and encourages exploration.
7. **Support internal locus of control** — users should feel that they are in charge and that the system responds to them.
8. **Reduce short-term memory load** — keep displays simple, consolidate multiple pages and reduce window movement.

### Principles of User Interface Design

1. **Structure** — organize the interface purposefully: put related things together and separate unrelated ones, based on clear, consistent models.
2. **Simplicity** — make common tasks easy, communicate in the user's language and provide shortcuts.
3. **Visibility** — keep all the options needed for a task visible, without distracting the user with unnecessary information.
4. **Feedback** — keep users informed of actions, changes of state, conditions and errors, in clear language.
5. **Tolerance** — be forgiving: allow undo and redo, reduce the cost of mistakes and accept varied inputs.

## Object-Oriented Design Techniques {#object-oriented-design-techniques}

### Definition of Object-Oriented Design

Object-oriented design (OOD) is the process of designing a software system as a set of **interacting objects**, each with its own state and operations. It converts the technology-independent **analysis model** (produced by object-oriented analysis) into a design model of **classes and objects** that can be implemented with a particular technology.

Object-oriented development has three stages:

1. **Object-oriented analysis (OOA)** — builds an object model of the **application domain** (the problem): it identifies the objects, their attributes, behaviour and interactions from the requirements.
2. **Object-oriented design (OOD)** — builds an object model of the **software system** (the solution): it adds classes, interfaces and algorithms needed to implement the requirements.
3. **Object-oriented programming (OOP)** — implements the design in an object-oriented language such as C++, Java or Python.

The object-oriented concepts used in design — classes, objects, encapsulation, inheritance and polymorphism — are explained in [Object-Oriented Programming Concepts](/topics/programming/oop-concepts).

### Object-Oriented Design Process

The object-oriented design process has five main activities:

1. **Understand and define the context and the use of the system** — model the system's relationships with its environment (context model) and how it is used (use cases).
2. **Design the system architecture** — divide the system into subsystems and layers.
3. **Identify the principal objects (classes)** of the system — from the nouns in the use cases and requirements, from the things, roles and events in the domain, and from scenario analysis.
4. **Develop design models** — **static models** (class and object diagrams) that show the classes and their relationships, and **dynamic models** (sequence and state diagrams) that show how the objects interact and change state.
5. **Specify the object interfaces** — define the operations (signatures) of each object, so that objects can be designed and implemented in parallel.

### Phases of Object-Oriented Design

Object-oriented design is done in two phases:

1. **System design** — the overall architecture is created: the system is divided into **layers and subsystems** (shown as UML packages), concurrency is identified, design patterns are chosen, and events and boundary conditions (start-up, shutdown, failure) are handled.
2. **Object design** — the design of the individual classes, in seven steps:
   1. **Object identification** — the objects from analysis are grouped into classes and refined, with their associations, inheritance and aggregation.
   2. **Object representation** — static models (class and object diagrams) and dynamic models (interaction and state diagrams) are built.
   3. **Classification of operations** — the operations of each class are defined (what each one does).
   4. **Algorithm design** — an algorithm is chosen for each operation, considering its complexity, flexibility and clarity.
   5. **Design of relationships** — associations are made one-way or two-way, many-to-many associations are implemented as separate classes, and abstract classes are identified for inheritance.
   6. **Implementation of control** — the dynamic model is implemented as procedural control, as a state machine, or as concurrent tasks.
   7. **Packaging of classes** — related classes are grouped into packages (modules) with high cohesion and low coupling, and with their internal details hidden.

The design is then **optimized** (for example, by adding redundant associations for faster access, or storing derived attributes) and **documented** with class diagrams, interaction diagrams and descriptions of the main design decisions.

### Object-Oriented Design Methods

Several object-oriented analysis and design methods were developed in the 1980s and 1990s; the main ones are:

1. **Booch method (Grady Booch)** — an object-oriented design method, first developed for Ada, that models the system with class, object, state and interaction diagrams and with logical and physical views; it is strong in design.
2. **Object Modeling Technique — OMT (James Rumbaugh)** — models a system with three models:
   1. **Object model** — the static structure (classes and relationships);
   2. **Dynamic model** — the behaviour over time (state diagrams);
   3. **Functional model** — the transformation of data (data-flow diagrams).
   OMT is strong in analysis.
3. **Object-Oriented Software Engineering — OOSE (Ivar Jacobson)** — a use-case-driven method; it introduced **use cases** to capture requirements.
4. **Coad–Yourdon method (Peter Coad and Edward Yourdon)** — an early object-oriented analysis and design method.

In the 1990s Booch, Rumbaugh and Jacobson combined their notations into the **Unified Modeling Language (UML)**, and their processes into the **Unified Process (UP)**, an iterative, use-case-driven, architecture-centric process (its commercial version is the Rational Unified Process, RUP).

### Design Patterns

A design pattern is a general, reusable solution to a commonly occurring problem in object-oriented design. It describes the problem, the solution (classes and their relationships) and its consequences, and it is a way of **reusing design knowledge**. The book *Design Patterns* (1994) by the "Gang of Four" (Gamma, Helm, Johnson and Vlissides) describes 23 patterns.

Design patterns are of three types:

1. **Creational patterns** — deal with object creation: Singleton, Factory Method, Abstract Factory, Builder, Prototype.
2. **Structural patterns** — deal with the composition of classes and objects: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.
3. **Behavioural patterns** — deal with communication between objects: Observer, Strategy, Command, Iterator, State, Template Method, Visitor (and others).

The **Model–View–Controller (MVC)** pattern divides an interactive application into the **model** (data and business logic), the **view** (presentation) and the **controller** (handles input and coordinates the model and view); it is explained in [Server-Side Programming](/topics/software-engineering/server-side-programming#mvc-web-framework).

### Object-Oriented Analysis vs Object-Oriented Design

| Basis | Object-oriented analysis (OOA) | Object-oriented design (OOD) |
| --- | --- | --- |
| Focus | The problem domain: **what** the system must do | The solution: **how** the system will do it |
| Models | Use cases, domain object model | Detailed class diagrams, sequence and state diagrams, package diagrams |
| Objects | Real-world (domain) objects | Software classes, including technical classes (interfaces, controllers, data access) |
| Technology | Independent of implementation technology | Depends on the chosen platform and language |
| Output | Analysis model | Design model, ready to be implemented |

## Real-Time Software Design {#real-time-software-design}

### Definition of Real-Time System

A real-time system is a software system whose correct functioning depends both on the **results it produces** and on the **time at which they are produced**. It must respond to events from its environment within fixed **time limits (deadlines)**; a correct result that is produced too late is a failure.

Examples are flight control systems, air-traffic control, car airbag controllers, industrial process control, medical devices, telephone switches and online reservation and trading systems.

### Types of Real-Time Systems

By the effect of a missed deadline, real-time systems are of three types:

1. **Hard real-time system** — a deadline must **never** be missed; missing one is a system failure that may cause damage or loss of life. Examples: aircraft flight control, airbag control, pacemakers.
2. **Soft real-time system** — deadlines may **occasionally** be missed; the system keeps working, but its performance (the usefulness of the late result) degrades. Examples: video streaming, online games, telephone switches.
3. **Firm real-time system** — occasional misses are tolerated, but a **late result is useless** and is discarded (although it causes no catastrophe). Examples: online trading and auction systems, reservation systems, video frames in conferencing.

#### Hard Real-Time vs Soft Real-Time Systems

| Basis | Hard real-time system | Soft real-time system |
| --- | --- | --- |
| Missed deadline | Not allowed; it is a failure | Occasionally allowed |
| Effect of a miss | Catastrophic (damage, loss of life) | Degraded performance |
| Response time | Strict and guaranteed (deterministic) | Desirable, not guaranteed |
| Scheduling | Priority-based, preemptive, with guaranteed worst-case timing | Can be more flexible |
| Validation | Deadlines must be proved and tested | Average performance is measured |
| Examples | Flight control, airbags, pacemakers | Video streaming, online games |

### Characteristics of Real-Time Systems

1. **Time constraints** — every task has a deadline within which it must finish.
2. **Correctness** — results must be both correct and on time.
3. **Embedded** — most real-time systems are embedded in larger hardware systems and read data from the environment through sensors.
4. **Safety and reliability** — they often run continuously for long periods and must not fail.
5. **Concurrency** — they respond to many events and run many processes at the same time.
6. **Distributed** — their components may be spread across several computers.
7. **Stability** — under heavy load they still meet the deadlines of their critical tasks.
8. **Fault tolerance** — they detect faults and recover from them without missing deadlines.
9. **Determinism (predictability)** — their response times are predictable.
10. **Real-time communication** — messages between components must be fast and reliable.
11. **Resource management** — the processor, memory and I/O are managed so that timing requirements are met.
12. **Heterogeneous environment** — they work with many different kinds of hardware.
13. **Scalability** — they can be extended as the workload grows.
14. **Security** — they protect their data and operation from unauthorized access.

### Stimulus–Response Model

A real-time system is described as a **stimulus–response system**: given a particular input (**stimulus**), it must produce a corresponding output (**response**) within a set time.

Stimuli are of two classes:

1. **Periodic stimuli** — occur at predictable, regular intervals; for example, the system reads a temperature sensor every 50 milliseconds.
2. **Aperiodic stimuli** — occur irregularly and unpredictably; they are usually signalled by **interrupts**, for example an I/O request or a fault alarm.

The hardware of a real-time system consists of **sensors**, which measure the environment and generate stimuli, and **actuators**, which receive the system's responses and change the environment (motors, valves, displays). For each kind of sensor and actuator, the software has a separate **process**: sensor-control processes collect data, data-processing processes compute the responses, and actuator-control processes drive the actuators.

![Stimulus–response model: sensors measure the environment and send stimuli to the real-time control system, which sends responses to actuators that change the environment](/diagrams/software-engineering/realtime-system.svg)

### Timing Terms

1. **Release time** — the time at which a job (task) becomes ready to run.
2. **Execution time** — the processor time the job needs.
3. **Relative deadline** — the maximum allowed time from release to completion.
4. **Absolute deadline** — the actual time by which the job must finish.
5. **Response time** — the time from the release of the job to its completion.

> **Absolute deadline = release time + relative deadline**
>
> **Response time = completion time − release time**

**Example:** a job is released at 2 ms, has a relative deadline of 10 ms and completes at 9 ms.

1. Absolute deadline = 2 + 10 = **12 ms**.
2. Response time = 9 − 2 = **7 ms**.
3. Since the job finished at 9 ms, before 12 ms, it **meets its deadline**.

### Real-Time System Design Process

Real-time system design has six main steps:

1. **Identify the stimuli** that the system must process and the **associated responses**.
2. **Identify the timing constraints** that apply to each stimulus and response.
3. **Aggregate** the stimulus and response processing into **concurrent processes** (tasks); usually one process for each class of stimulus and response.
4. **Design the algorithms** for each stimulus and response, considering the processing time they need.
5. **Design a scheduling system** that starts every process in time to meet its deadline.
6. **Integrate** the system under the control of a **real-time operating system**, and check that the timing requirements are met.

Hardware and software are designed together: the designer decides which functions are done in hardware (faster) and which in software (more flexible). **State machine models** are used to model the event-driven behaviour.

### Real-Time Operating System (RTOS)

A real-time operating system is an operating system that manages the processes and resources of a real-time system and guarantees that tasks are completed within their deadlines, with **predictable (deterministic)** response times. Examples are QNX, VxWorks and FreeRTOS.

The components of a real-time operating system are:

1. **Real-time clock** — provides the timing information used to schedule processes periodically.
2. **Interrupt handler** — manages aperiodic requests for service.
3. **Scheduler** — chooses the next process to run, usually by **priority**.
4. **Resource manager** — allocates memory and processor resources to the selected process.
5. **Dispatcher** — starts the execution of the process.

An RTOS uses **priority-based preemptive scheduling**: each task has a priority, the processor runs the highest-priority ready task, and a higher-priority task that becomes ready interrupts (preempts) a lower-priority one. Common real-time scheduling algorithms are **Rate Monotonic Scheduling (RMS)**, which gives the highest priority to the task with the shortest period, and **Earliest Deadline First (EDF)**, which runs the task whose deadline is nearest.

### Classes of Real-Time Systems

Two common classes of real-time systems are:

1. **Monitoring and control systems** — they check sensors continuously and act on the results: a **monitoring system** takes action when a value is out of range (for example, a burglar alarm or a fire alarm), and a **control system** continuously controls the hardware actuators according to the sensor values (for example, a heating control system or a car's engine control).
2. **Data acquisition systems** — they collect data from sensors for later processing and analysis (for example, scientific experiments and process monitoring). The collecting and processing processes run at different speeds, so they communicate through a **circular buffer**, following the **producer–consumer** pattern; mutual exclusion prevents both from using the same buffer element at once.

### Advantages and Disadvantages of Real-Time Systems

**Advantages:**

1. Fast and accurate responses to events, which suits critical applications.
2. Automation of complex tasks that are difficult to do manually.
3. Fewer human errors in precise, repetitive work.
4. Predictable behaviour and high reliability.

**Disadvantages:**

1. Complex to design, implement and test; they need specialized skills.
2. Expensive, because of special hardware and software.
3. Less flexible: strict timing makes changes difficult.
4. Failures can be serious in critical applications, so they need continuous monitoring and maintenance.

## System Design with Reuse {#system-design-with-reuse}

### Definition of Software Reuse

Software reuse is the process of building new software from **existing software assets** — components, designs, code, documents and knowledge — instead of developing everything from scratch. Reuse-based software engineering aims to reduce cost and development time and to increase quality.

### Levels of Software Reuse

Software can be reused at three levels:

1. **Application system reuse** — a whole application is reused, either unchanged as a subsystem of a new system, or configured for different customers (for example, COTS products and application product lines).
2. **Component reuse** — a subsystem or component of an application (from a single object class to a whole subsystem) is reused.
3. **Object and function reuse (module reuse)** — small, well-defined functions or classes are reused, usually from a **program library** (for example, a mathematics library).

A component is a part of a program that performs an **independent task** in the system, such as a login procedure or a printing subsystem. Components have **high cohesion and low coupling** and communicate through **interfaces**, so they can be reused without depending on other modules (see [Component-Oriented Design](/topics/software-engineering/software-engineering-principles#object-oriented-component-oriented-structured)).

### Benefits of Software Reuse

1. **Increased dependability** — reused software has already been tested and used in working systems, so its faults have been found and fixed.
2. **Reduced process risk** — the cost of existing software is already known, so cost estimates are more accurate.
3. **Effective use of specialists** — experts develop reusable software once, instead of repeating the same work in many projects.
4. **Standards compliance** — standards (such as standard user-interface components) can be built into reusable components.
5. **Accelerated development** — systems are delivered sooner, because less new software has to be written and validated.
6. **Lower development cost.**

### Problems of Software Reuse

1. **Increased maintenance costs** — if the source code of a reused component is not available, it may become incompatible with changes in the system.
2. **Lack of tool support** — development tools may not support development with reuse.
3. **Not-invented-here syndrome** — some engineers prefer to rewrite components, believing they can improve on them, or distrusting other people's software.
4. **Creating, maintaining and using a component library** — building a library of reusable components and making sure developers can use it is expensive.
5. **Finding, understanding and adapting components** — components must be found in a library, understood and sometimes adapted to work in a new environment.

### Software Reuse Process

The process of design with reuse has five steps:

1. **Requirement specification** — the functional and non-functional requirements of the new system are specified, from the existing system, from user input, or both.
2. **Design** — the architecture of the whole system and its subsystems is designed.
3. **Specify components** — the design is divided into components and subsystems.
4. **Search for suitable components** — the component repository is searched for components that match the required functionality.
5. **Incorporate components** — the matched components are integrated (with new components where needed) to form the complete system.

There are two options during reuse: keep the **requirements fixed** and adapt the components, or keep the **components fixed** and modify the requirements so that existing components can be used.

### Approaches to Software Reuse

The main approaches to designing systems with reuse are:

1. **Design patterns** — generic, reusable design solutions to common problems (see [Design Patterns](#object-oriented-design-techniques)).
2. **Component-based software engineering (CBSE)** — systems are built by integrating independent components that follow a component model.
3. **Application frameworks** — collections of abstract and concrete classes (for example, a web application framework) that are extended and specialized to create applications.
4. **Legacy system wrapping** — an old system is given a new set of interfaces so that it can be reused.
5. **Service-oriented systems** — systems are built by linking shared (web) services.
6. **Application product lines** — a common architecture is adapted to create a family of related applications for different customers.
7. **COTS product reuse** — **commercial off-the-shelf** systems are configured to meet the needs of a customer; ERP systems (such as SAP) are large configurable COTS systems.
8. **Program libraries** — libraries of classes and functions that implement commonly used abstractions.
9. **Program generators** — a generator system embeds knowledge of a type of application and generates programs from a model or specification.
10. **Aspect-oriented software development** — shared components are woven into an application at different places when the program is compiled.

**COTS (commercial off-the-shelf) system:** a COTS system is a ready-made software product, sold to many customers, that can be adapted to the needs of a particular customer through configuration, without changing its source code. Using COTS products reduces development time and cost, but the buyer depends on the vendor and must adapt the requirements to the product's features.

**Application framework:** an application framework is an integrated set of reusable classes, with their interactions, that provides a skeleton for a family of applications; developers add application-specific classes to it, and the framework calls them (inversion of control). Examples are web frameworks based on the Model–View–Controller pattern.

## References {#references}

**TutorialsPoint**

- [Software User Interface Design](https://www.tutorialspoint.com/software_engineering/software_user_interface_design.htm) — accessed 2026-11-04 (attributes of a good UI, CLI and GUI elements, UI design activities, GUI tools, Shneiderman's eight golden rules)
- [Software Maintenance Overview](https://www.tutorialspoint.com/software_engineering/software_maintenance_overview.htm) — accessed 2026-11-04 (component reusability: reuse levels and reuse process)
- [OOAD – Object Oriented Paradigm](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_paradigm.htm) — accessed 2026-11-04 (OOA, OOD, OOP; Booch, Coad, Rumbaugh and Jacobson)
- [OOAD – Object Oriented Model](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_model.htm) — accessed 2026-11-04 (objects, classes, inheritance, links and associations, aggregation and composition)
- [OOAD – Object Oriented Design](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_design.htm) — accessed 2026-11-04 (system design, the seven steps of object design, optimization, documentation)
- [UML – Basic Notations](https://www.tutorialspoint.com/uml/uml_basic_notations.htm) — accessed 2026-11-04 (structural, behavioural, grouping and annotational things; relationships)
- [Real-Time Operating System (RTOS)](https://www.tutorialspoint.com/operating_system/os_real_time.htm) — accessed 2026-11-04 (hard, soft and firm real-time; priority-based preemptive scheduling)

**GeeksforGeeks**

- [Short note on Behavioral Model](https://www.geeksforgeeks.org/software-engineering/short-note-on-behavioral-model/) — accessed 2026-11-04
- [Models in OOAD](https://www.geeksforgeeks.org/system-design/models-in-ooad/) — accessed 2026-11-04
- [Object Model](https://www.geeksforgeeks.org/system-design/object-model-object-oriented-analysis-design/) — accessed 2026-11-04 (inheritance, association, aggregation)
- [Unified Modeling Language (UML) Diagrams](https://www.geeksforgeeks.org/system-design/unified-modeling-language-uml-introduction/) — accessed 2026-11-04 (it lists six structural and six behavioural diagrams, leaving out the profile and timing diagrams of UML 2.5; the full list of fourteen is used here)
- [User Interface Design – Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-engineering-user-interface-design/) — accessed 2026-11-04 (Theo Mandel's golden rules, the UI design process)
- [Real Time Systems](https://www.geeksforgeeks.org/computer-science-fundamentals/real-time-systems/) — accessed 2026-11-04 (hard, soft and firm systems; timing terms)
- [Characteristics of Real-time Systems](https://www.geeksforgeeks.org/characteristics-of-real-time-systems/) — accessed 2026-11-04
- [Booch Methodology in OOAD](https://www.geeksforgeeks.org/system-design/booch-methodology-in-object-oriented-analysis-and-designooad/) — accessed 2026-11-04
- GeeksforGeeks has no separate page on software reuse; it mentions reuse processes only in its list of SDLC activities (checked 2026-11-04).

**TpointTech**

- [System Models in Software Engineering](https://www.tpointtech.com/system-models-in-software-engineering) — accessed 2026-11-04 (four perspectives and four types of system model; its insulin-pump figure is an activity model, although the text calls it a sequence diagram)
- [Context Model in Software Engineering](https://www.tpointtech.com/context-model-in-software-engineering) — accessed 2026-11-04 (ATM example)
- [Behavioural Model in Software Engineering](https://www.tpointtech.com/behavioural-model-in-software-engineering) — accessed 2026-11-04 (DFD and state-diagram elements; it says the level 0 DFD "is divided into multiple bubbles" — the level 0 DFD is a single bubble, and the division happens at level 1 — and it describes a DFD process as an "event"; a process transforms data)
- [UML Diagrams](https://www.tpointtech.com/uml-diagrams) — accessed 2026-11-04
- [What is User Interface (UI) Design?](https://www.tpointtech.com/software-engineering-user-interface-design) — accessed 2026-11-04 (principles: structure, simplicity, visibility, feedback, tolerance)
- [Object Oriented Design](https://www.tpointtech.com/software-engineering-object-oriented-design) — accessed 2026-11-04
- [Real-Time Operating System](https://www.tpointtech.com/real-time-operating-system) — accessed 2026-11-04 (it lists MTS as an example of a real-time OS; MTS is a time-sharing system, so it is not used here)
- TpointTech has no separate page on software reuse; it mentions reuse only as a benefit of modularity (checked 2026-11-04).

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-04 (UML: seven structural and seven behavioural diagrams; activity, use case, sequence and class diagrams; design patterns; MVC; user interface design as a design phase). The page has nothing on context models, real-time software design or software reuse.

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (the reference websites do not cover the real-time design process, RTOS components, the classes of real-time systems, or the benefits, problems and approaches of software reuse)

- Ian Sommerville, *Software Engineering*, Pearson — "System Modeling" (context, interaction, structural and behavioural models), "Object-Oriented Design" (the design process), "Real-Time Software Design" (stimulus–response model, design process, real-time operating system components, monitoring and control systems, data acquisition systems) and "Software Reuse" (reuse levels, benefits and problems, the reuse landscape, application frameworks, COTS)
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — Theo Mandel's golden rules of interface design
- Object Management Group, [UML specification, version 2.5.1](https://www.omg.org/spec/UML/2.5.1/) — the fourteen UML diagram types
- Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, *Design Patterns: Elements of Reusable Object-Oriented Software*, Addison-Wesley, 1994
