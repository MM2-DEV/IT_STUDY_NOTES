---
description: Knowledge representation in AI - knowledge and its types, the knowledge cycle and knowledge base, what to represent, requirements and approaches, techniques (logic, semantic networks, frames, scripts, production rules), and the organization and manipulation of knowledge with indexing, inheritance and forward and backward chaining.
updated: 2026-11-06
---

## General Concepts of Knowledge {#general-concepts-of-knowledge}

### Definition of Knowledge

Knowledge is **awareness or understanding of facts, rules and relationships, gained through experience or learning, that can be used to reason and solve problems**.

In AI, a hierarchy is often used: **data** (raw symbols and values) becomes **information** when it is organized and given meaning, and information becomes **knowledge** when it is understood well enough to be used for decisions.

### Knowledge and Intelligence

Knowledge of the real world is essential for intelligent behaviour. An agent can act correctly on an input only if it has some knowledge or experience about that input — just as a person cannot respond to someone speaking an unknown language. **Knowledge** supplies the facts; **intelligence** uses them to reason, decide and adapt. Without knowledge, an AI system cannot show intelligent behaviour.

### Types of Knowledge

There are five types of knowledge:

1. **Declarative knowledge** — knowing **"what"**: facts, concepts and objects, expressed as statements (also called **descriptive** knowledge). Example: "Paris is the capital of France."
2. **Procedural knowledge** — knowing **"how"** to do something: rules, strategies, procedures and steps (also called **imperative** knowledge). Example: the steps to sort a list of numbers.
3. **Meta-knowledge** — **knowledge about knowledge**: what the system knows, and which knowledge to use when. Example: knowing that a certain rule works best for a certain kind of problem.
4. **Heuristic knowledge** — **rules of thumb** of experts, based on experience; useful but not guaranteed to be correct. Example: a doctor's guess of a likely disease from experience.
5. **Structural knowledge** — knowledge of **relationships** between concepts, such as kind-of, part-of and grouping. Example: "A car is a kind of vehicle."

### Declarative vs Procedural Knowledge

| Basis | Declarative knowledge | Procedural knowledge |
| --- | --- | --- |
| Question answered | What | How |
| Other name | Descriptive knowledge | Imperative knowledge |
| Nature | Facts, concepts, objects | Rules, steps, strategies |
| Representation | Statements, logic, databases | Programs, production rules |
| Use | Can be used for many tasks | Tied to a particular task |
| Example | "A triangle has three sides" | How to draw a triangle |

### Knowledge Base

A knowledge base (KB) is the **central store of facts, rules and procedures of a knowledge-based system, written as sentences in a knowledge representation language**.

A **knowledge-based agent** has a knowledge base and an **inference engine** that derives new sentences from it. It works by two operations: **TELL** (add a new sentence to the KB) and **ASK** (query the KB to decide what to do).

### The AI Knowledge Cycle

An AI system displays intelligent behaviour through these components:

1. **Perception** — gathers information from the environment (vision, sound, other sensors).
2. **Learning** — learns from the data captured by perception.
3. **Knowledge representation** — stores the knowledge in a form the system can use.
4. **Reasoning** — draws conclusions from the stored knowledge.
5. **Planning** — decides the actions needed to reach goals.
6. **Execution** — carries out the actions in the environment.

Knowledge representation and reasoning are at the centre of the cycle; planning and execution depend on them.

![The AI knowledge cycle](/diagrams/artificial-intelligence/knowledge-cycle.svg)

## Knowledge Representation {#knowledge-representation}

### Definition of Knowledge Representation

Knowledge representation (KR) is the **part of AI concerned with representing information about the real world in a form that a computer can store and use to reason and solve complex problems**.

It is more than storing data in a database: it enables a machine to **reason** with the knowledge (for example, to diagnose a disease or understand natural language). The field is often called **knowledge representation and reasoning (KRR)**.

### What to Represent

1. **Objects** — facts about objects in the domain. Example: guitars have strings; trumpets are brass instruments.
2. **Events** — actions and events that happen in the world. Example: a traffic light turns red.
3. **Performance** — knowledge about how to do things (behaviour).
4. **Meta-knowledge** — knowledge about what we know.
5. **Facts** — truths about the real world.
6. **Knowledge base** — the collection of all these sentences.

### Requirements of a Knowledge Representation System

A good KR system must have four properties:

1. **Representational accuracy** — it can represent all kinds of knowledge needed in the domain.
2. **Inferential adequacy** — it can manipulate the representations to produce new knowledge.
3. **Inferential efficiency** — it can direct inference in the most productive directions by storing suitable guides.
4. **Acquisitional efficiency** — it can acquire new knowledge easily, preferably automatically.

### Approaches to Knowledge Representation

There are four approaches to knowledge representation:

1. **Simple relational knowledge** — facts are stored as rows in tables (relations), as in a database. Simple, but allows **little inference**.

   | Player | Weight | Age |
   | --- | --- | --- |
   | Player1 | 65 | 23 |
   | Player2 | 58 | 18 |

2. **Inheritable knowledge** — knowledge is stored in a **hierarchy of classes**; elements **inherit** values from their classes (the is-a and instance relations), as in frames and semantic networks.
3. **Inferential knowledge** — knowledge is written in **formal logic**, so new facts can be derived with guaranteed correctness. Example: "Marcus is a man" and "All men are mortal" are written `man(Marcus)` and `∀x man(x) → mortal(x)`, from which `mortal(Marcus)` follows.
4. **Procedural knowledge** — knowledge is written as small programs or **if–then rules** that say how to do things (for example, in LISP or PROLOG); good for heuristic, domain-specific knowledge.

### Techniques of Knowledge Representation

There are four main techniques of knowledge representation:

1. Logical representation
2. Semantic network representation
3. Frame representation
4. Production rules

Scripts are a related technique for representing sequences of events.

### 1. Logical Representation

Logical representation is a **knowledge representation technique that uses formal logic, with precise syntax and semantics, to represent facts and rules and to draw conclusions**.

1. **Syntax** — the rules for writing valid sentences (like grammar).
2. **Semantics** — the rules that give sentences meaning (whether they are true or false in a world).

It has two main forms: **propositional logic** (whole statements joined by AND, OR, NOT, →) and **first-order (predicate) logic**, which adds objects, relations and the quantifiers ∀ and ∃ (see [First-Order Logic](/topics/artificial-intelligence/first-order-logic)).

**Advantages:** precise and unambiguous; supports sound reasoning; the basis of logic programming. **Disadvantages:** reasoning can be slow, especially in first-order logic; poor at handling uncertainty; rigid and hard to use for large, changing knowledge.

### 2. Semantic Networks

**Semantic network** is a **knowledge representation technique that represents knowledge as a graph, with nodes for objects or concepts and labelled arcs for the relations between them**.

Two important relations are **is-a** (a class is a kind of another class; supports **inheritance**) and **instance-of** (an object belongs to a class). Other arcs show properties, such as *has* or *owned-by*.

![A semantic network](/diagrams/artificial-intelligence/semantic-network.svg)

**Example:** Tom is an instance of Cat; Cat is-a Mammal; Mammal is-a Animal; Cat has Fur. By following the arcs, the system concludes that Tom is an animal and has fur.

**Advantages:** natural and easy to understand and visualize; easy to extend; supports inheritance. **Disadvantages:** searching a large network is slow; there are no standard names for links; it cannot easily express quantifiers, negation or disjunction.

### 3. Frames

**Frame** is a **record-like data structure that represents a stereotyped object or situation as a collection of slots (attributes) and their fillers (values)**.

Frames were introduced by **Marvin Minsky** (1974). A slot can hold a value, a **default value**, a pointer to another frame, or a procedure (**demon**) that runs when the slot is read or changed. Frames are linked in a hierarchy, so an **instance frame inherits** the slot values of its class frame unless it gives its own. A collection of linked frames is a **frame system**.

![A class frame and an instance frame](/diagrams/artificial-intelligence/frame-example.svg)

**Advantages:** groups related knowledge together; easy to extend; supports defaults and inheritance; easy to visualize. **Disadvantages:** inference is not always efficient; hard to represent general rules and uncertain knowledge.

### 4. Production Rules

**Production rule** is a **knowledge representation technique that represents knowledge as a condition–action (IF–THEN) pair**: IF a condition is true, THEN perform an action or conclude a fact.

Example: IF the traffic light is red AND the car is moving, THEN stop.

A **production system** has three parts:

1. **Set of production rules** (the rule base).
2. **Working memory** — the facts describing the current state of the problem.
3. **Recognize–act cycle (inference engine)** — repeatedly matches rules against working memory, selects one (**conflict resolution**) and fires it.

**Advantages:** natural, modular (rules can be added or removed independently), easy to explain. **Disadvantages:** large rule bases are inefficient to search; little learning; rules may conflict.

### Scripts

**Script** is a **frame-like structure that represents a stereotyped sequence of events in a particular context**, such as going to a restaurant.

Scripts were proposed by **Roger Schank and Robert Abelson** (1977). A script has **entry conditions**, **props**, **roles**, **scenes** (for a restaurant: entering, ordering, eating, paying, leaving) and **results**. It lets a system understand stories and predict events that were not stated.

### Comparison of Representation Techniques

| Basis | Logic | Semantic network | Frames | Production rules |
| --- | --- | --- | --- | --- |
| Structure | Formulas | Graph of nodes and labelled arcs | Slots and values | IF–THEN rules |
| Knowledge type | Declarative | Declarative, structural | Declarative (with procedures) | Procedural |
| Inheritance | Through rules | Yes (is-a links) | Yes (frame hierarchy) | No |
| Reasoning | Precise inference | Following links | Inheritance, defaults, demons | Matching and firing rules |
| Weakness | Slow; no uncertainty | No quantifiers; slow search | Weak general inference | Inefficient for large rule sets |

### Issues in Knowledge Representation

1. **Important attributes** — which attributes (such as *instance* and *is-a*) are basic and must be supported everywhere.
2. **Relationships among attributes** — such as inverses, is-a hierarchies, single-valued attributes and inheritance.
3. **Choosing the granularity** — at what level of detail knowledge should be represented (primitive facts or larger units).
4. **Representing sets of objects** — properties that belong to a set rather than to each member.
5. **Finding the right structure** — selecting and changing the appropriate knowledge structure for a situation.
6. **Ambiguity and uncertainty** — words with several meanings, and incomplete or uncertain facts.

## Knowledge Organization and Manipulation {#knowledge-organization-and-manipulation}

### Knowledge Organization

Knowledge organization is the **arrangement of the knowledge in a knowledge base so that the relevant items can be found, used and updated efficiently**.

As a knowledge base grows to thousands of facts and rules, searching all of it for every question becomes too slow, so knowledge must be organized (much as books in a library are classified and indexed).

### Methods of Organizing Knowledge

1. **Indexing** — each item is stored with **keys** (index terms); retrieval looks up the key instead of scanning everything. Indexes can be built by **hashing** a key or by grouping items under common **cues** (attributes that describe the situation in which the knowledge is useful).
2. **Hierarchical (taxonomic) organization** — concepts are arranged in **class hierarchies** (is-a links), so common properties are stored once at the general class and **inherited** by more specific classes and instances. This saves memory and allows **default reasoning**.
3. **Associative (network) organization** — related items are **linked** to each other, as in semantic networks, so that finding one item gives quick access to related ones.
4. **Grouping into structures** — knowledge about one object or situation is collected into a single unit (**frames** and **scripts**); rules can be grouped by the part of the problem they apply to.

### Inheritance

Inheritance is the **process by which a class or instance obtains the properties of its more general classes in a hierarchy**.

**Example:** "Birds can fly" is stored once at the class Bird; Sparrow is-a Bird, so the system infers that sparrows can fly. **Exceptions** are stored at the lower level and override the inherited **default**: Penguin is-a Bird, but "Penguins cannot fly" is stored at Penguin, so penguins do not inherit the ability to fly.

### Knowledge Manipulation

Knowledge manipulation is the **use of stored knowledge to answer questions and solve problems: retrieving the relevant knowledge, matching it with the current situation, and inferring new knowledge from it**.

It includes:

1. **Retrieval** — finding knowledge by keys, by partial matches or by following associative links.
2. **Matching** — comparing patterns with facts to decide which knowledge applies (see [Matching Techniques](/topics/artificial-intelligence/search-strategies-and-game-playing#matching-techniques)).
3. **Search and control strategies** — choosing the order in which possibilities are explored (see [Search Strategies](/topics/artificial-intelligence/search-strategies-and-game-playing#search-strategies)).
4. **Inference** — deriving new facts: **deduction** (from general rules to specific conclusions, always sound), **induction** (generalizing from examples) and **abduction** (inferring the most likely explanation of an observation).
5. **Updating** — adding new knowledge while keeping the knowledge base consistent and free of redundancy.

### Forward and Backward Chaining

Rule-based systems manipulate knowledge by **chaining** rules together in one of two directions.

**Forward chaining** is a **data-driven inference method that starts from the known facts and repeatedly applies rules whose conditions are satisfied, adding their conclusions as new facts, until the goal is reached or no rule can fire**.

**Backward chaining** is a **goal-driven inference method that starts from the goal and works backwards, looking for rules that conclude the goal and then trying to prove their conditions as sub-goals**, until all sub-goals are known facts.

**Worked example.** Rules: **R1:** IF A AND B THEN C; **R2:** IF C THEN D; **R3:** IF D AND E THEN F. Known facts: A, B, E. Goal: F.

1. **Forward chaining:** R1 fires (A and B are known) → add **C**; R2 fires → add **D**; R3 fires (D and E are known) → add **F**. The goal is reached.
2. **Backward chaining:** to prove F, R3 needs D and E; E is a fact. To prove D, R2 needs C. To prove C, R1 needs A and B, which are facts. So F is proved.

![Forward and backward chaining on the same rules](/diagrams/artificial-intelligence/chaining.svg)

### Forward Chaining vs Backward Chaining

| Basis | Forward chaining | Backward chaining |
| --- | --- | --- |
| Direction | From facts to goal (bottom-up) | From goal to facts (top-down) |
| Driven by | Data | Goal |
| Search type | Breadth-first, typically | Depth-first, typically |
| Suitable when | Many possible conclusions from given data; planning, monitoring, control | A specific goal or hypothesis is to be proved; diagnosis |
| Efficiency | May derive many facts that are not needed | Explores only rules relevant to the goal |
| Examples | CLIPS, OPS5, design systems | PROLOG, MYCIN (medical diagnosis) |

## References {#references}

**TutorialsPoint**

- [Knowledge Representation](https://www.tutorialspoint.com/artificial_intelligence/ai_knowledge_representation.htm), [Knowledge Representation Techniques](https://www.tutorialspoint.com/artificial_intelligence/ai_knowledge_representation_techniques.htm), [Knowledge-Based Agent](https://www.tutorialspoint.com/artificial_intelligence/ai_knowledge_based_agent.htm) and [Forward and Backward Chaining](https://www.tutorialspoint.com/artificial_intelligence/ai_forward_chaining_backward_chaining.htm) — accessed 2026-11-06 (what to represent, knowledge and intelligence, types of knowledge, logical, semantic network, frame and production-rule representation with advantages and disadvantages, TELL and ASK, forward and backward chaining)

**GeeksforGeeks**

- [Knowledge Representation in AI](https://www.geeksforgeeks.org/artificial-intelligence/knowledge-representation-in-ai/) — accessed 2026-11-06 (five types of knowledge, knowledge and intelligence, the four techniques, the three parts of a production system). Its separate pages on semantic networks, frames and types of knowledge return 404.

**TpointTech**

- [Knowledge Representation in AI](https://www.tpointtech.com/knowledge-representation-in-ai), [Techniques of Knowledge Representation](https://www.tpointtech.com/ai-techniques-of-knowledge-representation), [Knowledge Representation Issues](https://www.tpointtech.com/knowledge-representation-issues-in-artificial-intelligence), [Semantic Network](https://www.tpointtech.com/semantic-network-in-artificial-intelligence), [Frames](https://www.tpointtech.com/frames-in-artificial-intelligence), [Procedural vs Declarative Knowledge](https://www.tpointtech.com/procedural-vs-declarative-knowledge-in-artificial-intelligence) and [Knowledge-Based Agent](https://www.tpointtech.com/knowledge-based-agent-in-ai) — accessed 2026-11-06 (knowledge cycle, four approaches, the Marcus example, four requirements, issues). Its issues page says that procedural ("operations") knowledge is "also known as structural knowledge"; structural knowledge is a separate type (relationships between concepts), as its own main KR page says.

**Programiz**

- Programiz has no page on knowledge representation (checked 2026-11-06).

**Additional sources** (used because the reference websites do not cover knowledge organization and manipulation — indexing, organization methods, knowledge manipulation and default inheritance — or scripts)

- Dan W. Patterson, *Introduction to Artificial Intelligence and Expert Systems*, Prentice Hall, Part III "Knowledge Organization and Manipulation" (search and control strategies, matching techniques, knowledge organization and management with indexing and retrieval).
- Elaine Rich and Kevin Knight, *Artificial Intelligence*, 2nd edition, McGraw-Hill, chapter 4 (approaches to knowledge representation, issues in knowledge representation, inheritance) and chapter 10 (frames and scripts).
