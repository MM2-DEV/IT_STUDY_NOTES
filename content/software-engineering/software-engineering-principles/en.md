---
description: Software engineering principles - modularity (with cohesion and coupling), abstraction and generality - and the structured, object-oriented and component-oriented approaches to software design.
updated: 2026-11-03
---

## Modularity, Abstraction, Generality {#modularity-abstraction-generality}

Software engineering principles are general rules that guide the development of good software. They apply to the process as well as to the product, and they are supported by methods and techniques (for example, structured or object-oriented design) and by tools. Ghezzi, Jazayeri and Mandrioli list seven key principles:

1. Rigor and formality.
2. Separation of concerns.
3. Modularity.
4. Abstraction.
5. Anticipation of change.
6. Generality.
7. Incrementality.

Three of these principles — modularity, abstraction and generality — are explained below.

### Modularity

Modularity is the principle of dividing a complex system into smaller, separately named and addressable parts called modules, which are developed separately and then integrated to form the complete system. The process of dividing a system into modules is called modularization.

A module is a well-defined part of a system that performs a specific task, such as a function, a procedure, a class or a package. Modularity is an application of the principle of separation of concerns: each module deals with one concern, so each part can be understood, built and changed on its own. It is the property that makes a large program intellectually manageable.

#### Benefits of Modularity

Modularity supports four abilities (Ghezzi, Jazayeri and Mandrioli):

1. **Decomposability** — a complex problem can be divided top-down into simpler subproblems (modules), and each subproblem can be solved separately ("divide and conquer").
2. **Composability** — a system can be built bottom-up by assembling existing modules, as hardware is built from standard components.
3. **Understandability** — each module can be understood on its own, without understanding the whole system.
4. **Modifiability** — a change usually affects only a few modules, so the system is easier to modify and repair.

#### Characteristics of a Good Module

1. It is self-contained and performs a single, well-defined task.
2. It can be designed, coded, compiled and tested separately.
3. It is reusable in other programs.
4. It is simpler to use than to build: it hides its internal details behind a simple interface.

#### Advantages of Modularity

1. Smaller modules are easier to understand, test and maintain.
2. Different modules can be developed in parallel by different team members.
3. Highly cohesive modules can be reused, which allows libraries of modules.
4. The desired level of abstraction can be achieved.
5. Errors are confined to a module, so testing and debugging are easier.
6. Modules can be executed concurrently.
7. Security is improved, because each module exposes only what other modules need.

#### Disadvantages of Modularity

1. Execution time may increase because of calls between modules.
2. More storage may be needed.
3. Compilation and loading time may increase.
4. Communication between modules can cause problems, and linking the modules adds work.
5. More documentation is needed.

#### Modular Design: Functional Independence

A good modular design has functional independence: each module performs one kind of task and has as little interaction with other modules as possible. Functional independence is measured by two criteria:

1. **Cohesion** — the strength of the relationships between the elements inside a module (intra-module strength).
2. **Coupling** — the degree of interdependence between modules (inter-module dependence).

A good design has **high cohesion and low coupling**. Modular design also uses **information hiding**: each module hides its internal data and algorithms and exposes only what other modules need, so errors and changes do not spread from one module to others.

![Types of cohesion from functional (best) to coincidental (worst), and types of coupling from data (best) to content (worst)](/diagrams/software-engineering/coupling-cohesion.svg)

#### Types of Cohesion

Cohesion is of seven types, from the best (highest) to the worst (lowest):

1. **Functional cohesion** — all the elements of the module work together to perform one well-defined function; for example, a module that computes the square root of a number. It is the best type.
2. **Sequential cohesion** — the output of one element is the input of the next element.
3. **Communicational cohesion** — the elements operate on the same input data or produce the same output data.
4. **Procedural cohesion** — the elements are grouped because they are executed in a particular sequence to complete a task.
5. **Temporal cohesion** — the elements are grouped because they are executed at the same time or phase, such as the statements in an initialization module.
6. **Logical cohesion** — the elements perform logically similar tasks (for example, all input routines) and are grouped into one category.
7. **Coincidental cohesion** — the elements have no meaningful relationship; they are grouped arbitrarily. It is the worst type.

#### Types of Coupling

Coupling is of six types, from the best (lowest) to the worst (highest):

1. **Data coupling** — the modules communicate only by passing the elementary data items they need as parameters. It is the best type.
2. **Stamp coupling** — the modules pass a whole data structure (such as a record), although the receiving module uses only part of it.
3. **Control coupling** — one module controls the flow of execution of another by passing it control information, such as a flag.
4. **External coupling** — the modules depend on something outside the software, such as an external data format, communication protocol or device.
5. **Common coupling** — the modules share the same global data.
6. **Content coupling** — one module directly accesses or changes the internal data or code of another module. It is the worst type.

### Abstraction

Abstraction is the principle of identifying the important aspects of a problem and ignoring its unimportant details. It lets the designer think about a component in terms of what it does, without considering how it is implemented.

1. The choice of what to keep and what to ignore depends on the purpose; the same system can be described by different abstractions for different people. For example, a car driver needs the steering wheel, pedals and gears, while a mechanic needs the engine and the brakes.
2. Models, specifications and designs are all abstractions of the final system.
3. Abstraction and modularity work together: a module is used through its interface (an abstraction), and its implementation details are hidden.

#### Types of Abstraction

Abstraction in design is of two types:

1. **Functional (procedural) abstraction** — a module is specified by the function it performs, and the algorithm that performs it is hidden. For example, a function `sort(list)` is used without knowing whether it uses quicksort or merge sort. Functional abstraction is the basis of function-oriented (structured) design.
2. **Data abstraction** — a data object is described by the operations that can be performed on it, and its internal representation is hidden. For example, a stack is used through `push` and `pop` without knowing whether it is stored in an array or a linked list. Data abstraction is the basis of object-oriented design.

#### Levels of Abstraction in Design

Software design proceeds through three levels of abstraction, from the most abstract to the most detailed:

1. **Architectural design** — the system as a set of interacting components.
2. **High-level design** — the subsystems and modules and their relationships.
3. **Detailed design** — the internal logic of each module and its interfaces.

### Generality

Generality is the principle that, when a problem must be solved, the designer should look for the more general problem that lies behind it, because a solution to the general problem is likely to be reusable. A general solution may also be simpler than a special one, or it may already be available as an existing component or package.

1. **Example:** instead of writing a program that merges two particular files sorted by customer number, the designer can write a general merge routine that merges any two sorted files on any key. The general routine can be reused in other programs.
2. **Benefits:** generality increases reusability, and a general module can be used in many applications; this is why general-purpose software such as database systems, spreadsheets and libraries are widely used.
3. **Costs:** a general solution may take more time and effort to develop, and it may be less efficient than a special-purpose one in speed or memory. The designer must therefore balance generality against cost and efficiency.

### Related Design Principles

Other principles that support modularity, abstraction and generality are:

1. **Anticipation of change** — design the software so that likely future changes (new features, fixes, new technology) can be made easily, without a major redesign.
2. **Simplicity** — keep the design simple, which reduces errors and makes the software easier to read and maintain.
3. **Sufficiency and completeness** — include all the required functions and leave out unnecessary features.
4. **Problem partitioning** — divide a large problem into smaller pieces that can be handled separately.

## Object-Oriented, Component-Oriented, Structured {#object-oriented-component-oriented-structured}

These are three approaches (paradigms) to software design and development:

1. **Structured (function-oriented) approach** — the system is viewed as a set of functions.
2. **Object-oriented approach** — the system is viewed as a set of interacting objects.
3. **Component-oriented approach** — the system is assembled from reusable, independently deployable components.

### Structured Design

Structured design is a design approach in which the problem is broken down into smaller, well-organized parts (modules) by the principle of divide and conquer, and each part is solved separately until the whole problem is solved. The modules are arranged in a hierarchy and communicate with each other; a good structured design has high cohesion and low coupling.

#### Function-Oriented Design

Function-oriented design is the form of structured design in which the system is viewed as a set of functions, each of which performs a significant task. The top-level function (the whole system) is broken down into smaller and smaller functions (top-down decomposition).

1. The functions share data by passing parameters or through global data.
2. The details of each function are hidden behind its interface (functional abstraction).
3. It works best when the system state is less important and the functions mainly transform input data into output data.

The steps of function-oriented design are:

1. Draw a data flow diagram (DFD) to show how data flows through the system.
2. Use the DFD to see how each function changes the data and the state of the system.
3. Divide the system into functions according to their operations.
4. Describe each function in detail.

#### Design Notations of Structured Design

1. **Data flow diagram (DFD)** — shows how input data is transformed into output data through a series of functions (processes).
2. **Data dictionary** — lists and defines every data item that appears in the DFDs, giving a common vocabulary to the team.
3. **Structure chart** — shows the hierarchy of modules, how they call each other and what data passes between them.
4. **Pseudocode** — describes the logic of each module in short, English-like statements using keywords such as If-Then-Else and While-Do.

#### Top-Down and Bottom-Up Design

1. **Top-down design** — starts with the whole system and repeatedly breaks it into subsystems and components until the lowest level is reached. It suits a system that is designed from scratch.
2. **Bottom-up design** — starts with the basic components and combines them into higher-level components. It suits a system that is built from existing components.

In practice, a combination of both strategies is used.

### Object-Oriented Design

Object-oriented design (OOD) is a design approach in which the system is viewed as a collection of objects that interact with each other. Each object contains its own data (attributes) and the operations (methods) that act on that data, so the state of the system is distributed among the objects instead of being stored in global data.

#### Concepts of Object-Oriented Design

1. **Object** — an entity in the problem domain, such as a person, a bank account or a user, with attributes and methods.
2. **Class** — a general description (template) of objects that defines their attributes and methods; an object is an instance of a class.
3. **Message** — objects communicate by sending messages (requests) to each other, usually implemented as method calls.
4. **Abstraction** — only the essential features of an object are represented, and irrelevant details are ignored.
5. **Encapsulation** — data and methods are bundled together in a class, and outside access to the data is restricted (information hiding).
6. **Inheritance** — a subclass reuses the attributes and methods of its superclass and can add its own.
7. **Polymorphism** — methods with the same name can perform different actions depending on the object or the arguments, so one interface serves many types.

#### Steps of Object-Oriented Design

1. Create the design from the requirements, from an existing system or from use-case and sequence diagrams.
2. Identify the objects and group them into classes by their attributes.
3. Define the class hierarchy and the relationships between classes.
4. Define the application framework.

#### Advantages of Object-Oriented Design

1. Classes and objects can be reused, and inheritance makes new classes easy to define.
2. Encapsulation protects data from unauthorized access.
3. Objects model real-world entities, so the design is easy to understand.
4. It is well suited to large systems with changing requirements.

### Structured Approach vs Object-Oriented Approach

| Basis | Structured (function-oriented) approach | Object-oriented approach |
| --- | --- | --- |
| Basic unit | Function (process) | Object (class) |
| Main focus | Processes and procedures | Data and real-world objects |
| Decomposition | Top-down, into functions | Into interacting objects (often bottom-up) |
| Data | Shared through parameters or global data | Encapsulated inside objects |
| Abstraction used | Functional abstraction | Data abstraction |
| State | Centralized (global data) | Distributed among objects |
| Reusability | Low | High (classes, inheritance) |
| Suitable projects | Well-defined projects with stable requirements | Large projects with changing requirements |
| Risk | Higher | Lower |
| Analysis and design tools | DFD, data dictionary, ER diagram, structure chart, decision tables and trees, state transition diagram | Use-case model, class and object models, statechart, sequence and deployment diagrams (UML) |

### Component-Oriented Design

Component-based software engineering (CBSE) is an approach in which a system is built by assembling pre-built, reusable software components instead of developing everything from scratch. It is also called component-based development (CBD).

A software component is a self-contained, independently deployable unit of software that provides a set of services through a published interface and hides its implementation. Components communicate only through their interfaces, which act as contracts, and they may be developed by third parties.

#### Characteristics of a Component

1. **Reusability** — it can be used in many applications.
2. **Replaceability** — it can be replaced by another component with a similar interface.
3. **Context independence** — it can work in different environments.
4. **Extensibility** — new behaviour can be added on top of it.
5. **Encapsulation** — it exposes an interface and hides its internal state and processing.
6. **Independence** — it has minimal dependence on other components, so a change in one component does not affect others.
7. **Interoperability** — it can work with other components through standard interfaces and protocols.

#### Activities of CBSE

1. **Component qualification** — checking whether a candidate component provides the required services and fits the architecture, based on its interface.
2. **Component adaptation** — modifying (or wrapping) a component so that it fits the architecture; an unsuitable component is replaced.
3. **Component composition** — assembling the components into a working system through the connection and coordination mechanisms of the architecture.
4. **Component update** — replacing components with new versions as requirements change; this can be complicated when a third party maintains the component.

#### Advantages of Component-Oriented Design

1. Reuse reduces development time and cost, and the product reaches the market faster.
2. Components that have been used and tested before increase reliability.
3. Components can be replaced or upgraded with little effect on the rest of the system, which makes maintenance and deployment easier.
4. Different teams can develop components in parallel against known interfaces.
5. Components can be added or replaced, so the system is flexible and scalable.

#### Disadvantages of Component-Oriented Design

1. Components from different sources may not be compatible with each other.
2. The versions, updates and retirement of components must be managed carefully.
3. Choosing the right size (granularity) of a component is difficult: very small components make the system complex, and very large ones make it rigid.
4. The system depends on third-party components that the developers cannot control.
5. The team needs training to build and integrate components.

### Comparison of the Three Approaches

| Basis | Structured | Object-oriented | Component-oriented |
| --- | --- | --- | --- |
| Building block | Function (module) | Class and object | Component |
| System viewed as | A hierarchy of functions | A set of interacting objects | An assembly of independent components |
| Reuse | Functions and libraries | Classes, through inheritance and composition | Whole deployable components, often from third parties |
| Interface | Function parameters | Public methods of classes | Published, contract-based interfaces |
| Main principle | Divide and conquer (functional abstraction) | Encapsulation, inheritance, polymorphism (data abstraction) | Reuse and replaceability |

## References {#references}

**TutorialsPoint**

- [Software Design Basics](https://www.tutorialspoint.com/software_engineering/software_design_basics.htm) — accessed 2026-11-03 (design levels, modularization, cohesion and coupling; the page lists five types of coupling, without external coupling)
- [Software Design Strategies](https://www.tutorialspoint.com/software_engineering/software_design_strategies.htm) — accessed 2026-11-03 (structured, function-oriented and object-oriented design; top-down and bottom-up design)
- [Component-Based Architecture](https://www.tutorialspoint.com/software_architecture_design/component_based_architecture.htm) — accessed 2026-11-03 (characteristics of components, advantages)

**GeeksforGeeks**

- [Effective Modular Design in Software Engineering](https://www.geeksforgeeks.org/software-engineering/effective-modular-design-in-software-engineering/) — accessed 2026-11-03 (functional independence; seven types of cohesion and six types of coupling)
- [Difference between Structured and Object-Oriented Analysis](https://www.geeksforgeeks.org/software-engineering/difference-between-structured-and-object-oriented-analysis/) — accessed 2026-11-03
- [Component Based Software Engineering](https://www.geeksforgeeks.org/software-engineering/component-based-software-engineering/) — accessed 2026-11-03 (CBSE activities)

**TpointTech**

- [Software Design Principles](https://www.tpointtech.com/software-engineering-software-design-principles) — accessed 2026-11-03 (problem partitioning, functional and data abstraction, modularity and its advantages and disadvantages, functional independence, information hiding)
- [Function Oriented Design](https://www.tpointtech.com/software-engineering-function-oriented-design) — accessed 2026-11-03 (design notations)
- [Object Oriented Design](https://www.tpointtech.com/software-engineering-object-oriented-design) — accessed 2026-11-03
- [Component-Based Software Engineering](https://www.tpointtech.com/component-based-software-engineering) — accessed 2026-11-03

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-03 (key design principles; types of coupling and cohesion. Its cohesion list leaves out logical cohesion, and its coupling list has twelve items, several of which — such as "data-content", "semantic" and "functional" coupling — are not part of the standard classification; the standard six types of coupling and seven types of cohesion given by TutorialsPoint and GeeksforGeeks are used here)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (the reference websites do not cover generality, or modularity's decomposability, composability, understandability and modifiability)

- Carlo Ghezzi, Mehdi Jazayeri and Dino Mandrioli, *Fundamentals of Software Engineering*, 2nd edition, Prentice Hall, chapter 3, "Software Engineering Principles" — rigor and formality, separation of concerns, modularity, abstraction, anticipation of change, generality and incrementality
- Ian Sommerville, *Software Engineering*, "Component-based software engineering" — components and the CBSE process
