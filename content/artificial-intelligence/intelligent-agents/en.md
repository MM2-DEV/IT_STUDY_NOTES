---
description: Intelligent agents - agents and environments, percepts, percept sequence and agent function, rational agents and rationality, PEAS task descriptions, properties of environments, the structure of agents, and the five types of agents (simple reflex, model-based, goal-based, utility-based and learning agents).
updated: 2026-11-06
---

### Definition of Agent

An agent is **anything that perceives its environment through sensors and acts upon that environment through actuators (effectors)**.

1. A **human agent** has eyes, ears, nose, tongue and skin as sensors, and hands, legs and mouth as actuators.
2. A **robotic agent** has cameras and infrared range finders as sensors, and motors and other actuators.
3. A **software agent** receives keystrokes, file contents and network packets as percepts, and acts by displaying output, writing files or sending packets.

An AI system is made of an **agent and its environment**; the environment may contain other agents.

![An agent and its environment](/diagrams/artificial-intelligence/agent-environment.svg)

### Intelligent Agent

An intelligent agent is an **autonomous agent that perceives its environment, reasons and learns, and acts to achieve its goals in the best possible way**.

Examples include a self-driving car, a robot vacuum cleaner, a chess program, a thermostat that controls temperature, and a voice assistant such as Siri.

**Characteristics of an intelligent agent:**

1. **Autonomy** — acts without constant human control, using its own experience.
2. **Reactivity (perception)** — senses the environment and responds to changes in time.
3. **Pro-activeness (goal-directed)** — takes the initiative to achieve its goals.
4. **Social ability** — interacts with other agents and humans.
5. **Learning and adaptation** — improves its performance with experience.

### Agent Terminology

1. **Percept** — the agent's perceptual input at a given instant.
2. **Percept sequence** — the complete history of everything the agent has perceived so far.
3. **Agent function** — a mathematical mapping from **percept sequences to actions**; it describes the agent's behaviour abstractly.
4. **Agent program** — the concrete implementation of the agent function, running on the agent's machinery.
5. **Performance measure** — the criterion that judges how successful an agent's behaviour is.
6. **Behaviour** — the action that the agent performs after any given percept sequence.

### Structure of an Agent

> **Agent = Architecture + Agent program**

1. **Architecture** — the machinery (computing device with sensors and actuators) on which the agent runs.
2. **Agent program** — the program that implements the agent function, taking the current percept as input and returning an action.

### Rational Agent

A rational agent is an **agent that, for each possible percept sequence, selects the action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and its built-in knowledge**.

A rational agent always tries to do the **right thing** — the action that makes it most successful. Rationality is **not omniscience** (knowing the actual outcome of every action) and not perfection: a rational agent maximizes the **expected** performance with the information it has, and it gathers information and learns where useful.

**Rationality depends on four things:**

1. The **performance measure** that defines success.
2. The agent's **prior knowledge** of the environment.
3. The **actions** that the agent can perform.
4. The agent's **percept sequence** to date.

### PEAS Description

**PEAS** is a **way of specifying the task environment of an agent by its Performance measure, Environment, Actuators and Sensors**.

**Example 1: automated taxi driver**

| Component | Description |
| --- | --- |
| **P**erformance measure | Safe, fast, legal and comfortable trip; maximum profit; minimum fuel |
| **E**nvironment | Roads, other traffic, pedestrians, customers, weather |
| **A**ctuators | Steering, accelerator, brake, signal, horn, display |
| **S**ensors | Cameras, sonar or radar, speedometer, GPS, odometer, engine sensors, keyboard |

**Example 2: medical diagnosis system**

| Component | Description |
| --- | --- |
| **P**erformance measure | Healthy patient, minimum cost, minimum lawsuits |
| **E**nvironment | Patient, hospital, staff |
| **A**ctuators | Display of questions, tests, diagnoses, treatments and referrals |
| **S**ensors | Keyboard entry of symptoms, test findings and the patient's answers |

**Example 3: vacuum-cleaner robot**

| Component | Description |
| --- | --- |
| **P**erformance measure | Cleanliness, battery use, time taken |
| **E**nvironment | Room, floor, dirt, furniture, obstacles |
| **A**ctuators | Wheels, brushes, vacuum extractor |
| **S**ensors | Camera, dirt detection sensor, bump sensor, infrared wall sensor |

### Properties (Types) of Environments

1. **Fully observable vs partially observable** — in a **fully observable** environment the agent's sensors give it the **complete state** at each moment (chess); in a **partially observable** one, some of the state is hidden (driving: the agent cannot see what is around the corner), so the agent needs memory.
2. **Deterministic vs stochastic** — in a **deterministic** environment the next state is completely determined by the current state and the agent's action (chess); a **stochastic** environment has randomness or uncertainty (driving, dice games).
3. **Episodic vs sequential** — in an **episodic** environment the agent's experience is divided into independent episodes, and an action does not affect future episodes (classifying defective parts on an assembly line); in a **sequential** environment the current action affects future decisions (chess, driving).
4. **Static vs dynamic** — a **static** environment does not change while the agent is deciding (a crossword puzzle); a **dynamic** environment keeps changing (driving). It is **semi-dynamic** if the environment does not change but the agent's score does (chess with a clock).
5. **Discrete vs continuous** — a **discrete** environment has a finite number of distinct states and actions (chess); a **continuous** one has values that vary continuously (the speed and steering angle of a car).
6. **Single-agent vs multi-agent** — one agent acting alone (solving a crossword or maze) or several agents interacting (chess, football). A multi-agent environment can be **competitive** (chess) or **cooperative** (vehicles avoiding collisions).
7. **Known vs unknown** — whether the agent knows the rules ("laws of physics") of the environment, that is, the outcomes of its actions.

The hardest case is **partially observable, multi-agent, stochastic, sequential, dynamic, continuous and unknown** — such as driving a taxi in real traffic.

| Task environment | Observable | Agents | Deterministic | Episodic | Static | Discrete |
| --- | --- | --- | --- | --- | --- | --- |
| Crossword puzzle | Fully | Single | Deterministic | Sequential | Static | Discrete |
| Chess with a clock | Fully | Multi | Deterministic | Sequential | Semi-dynamic | Discrete |
| Taxi driving | Partially | Multi | Stochastic | Sequential | Dynamic | Continuous |
| Medical diagnosis | Partially | Single | Stochastic | Sequential | Dynamic | Continuous |
| Image analysis | Fully | Single | Deterministic | Episodic | Semi-dynamic | Continuous |

### Types of Agents

There are five types of agents, in increasing order of capability:

1. Simple reflex agent
2. Model-based reflex agent
3. Goal-based agent
4. Utility-based agent
5. Learning agent

![How the four basic types of agents choose an action](/diagrams/artificial-intelligence/agent-types.svg)

### 1. Simple Reflex Agent

A simple reflex agent is an **agent that selects actions on the basis of the current percept only, using condition–action (if–then) rules, and ignores the percept history**.

Example rule: IF the car in front is braking THEN start braking. A vacuum cleaner that sucks when the current square is dirty and moves otherwise is a simple reflex agent.

1. Works correctly only in a **fully observable** environment.
2. Has **no memory** and no model of the world; it can get stuck in **infinite loops** in partially observable environments.
3. Very simple and fast, but very limited intelligence.

### 2. Model-Based Reflex Agent

A model-based reflex agent is an **agent that keeps an internal state (a model of the world, based on the percept history) and uses it together with the current percept to choose actions by condition–action rules**.

The **model** is knowledge about "how the world works": how the world changes by itself and how the agent's actions affect it. The **internal state** records the unobserved aspects of the current situation. This lets the agent work in **partially observable** environments. Example: a robot vacuum cleaner that maps the room and remembers which areas it has already cleaned; a driver who remembers where other cars were before they went out of view.

### 3. Goal-Based Agent

A goal-based agent is an **agent that uses goal information, describing desirable situations, and chooses the actions that will lead to achieving its goal**.

Knowing the current state is not always enough; the agent must also know **where it wants to be**. It considers the future — "what will happen if I do action A?" — using **search and planning**. Goal-based agents are **more flexible** than reflex agents, because the knowledge behind decisions is explicit and can be changed. Example: a navigation system that finds a route to a destination.

### 4. Utility-Based Agent

A utility-based agent is an **agent that chooses the action that maximizes its expected utility — a measure of how desirable (how "happy") a state is**.

Goals only distinguish between "goal achieved" and "not achieved"; a **utility function** maps each state to a real number that measures its degree of desirability. It is used when there are **several ways** to reach a goal (choosing the quickest, safest or cheapest route) or **conflicting goals** (speed versus safety), or when goals cannot be achieved with certainty. Example: a self-driving car that balances speed, safety, comfort and fuel.

### 5. Learning Agent

A learning agent is an **agent that can learn from its past experience and improve its performance over time**, starting with basic knowledge and adapting automatically.

It has four conceptual components:

1. **Learning element** — makes improvements by learning from the environment.
2. **Critic** — gives feedback on how well the agent is doing with respect to a fixed **performance standard**.
3. **Performance element** — selects the external actions (this is the whole agent in the earlier types).
4. **Problem generator** — suggests new, **exploratory** actions that lead to new and informative experiences.

Examples: spam filters that learn from user feedback, recommendation systems, game-playing programs that improve by self-play.

![Components of a learning agent](/diagrams/artificial-intelligence/learning-agent.svg)

### Comparison of Agent Types

| Basis | Simple reflex | Model-based reflex | Goal-based | Utility-based | Learning |
| --- | --- | --- | --- | --- | --- |
| Uses | Current percept | Percept + internal state | State + goal | State + utility function | Experience and feedback |
| Memory | No | Yes | Yes | Yes | Yes |
| Looks ahead (plans) | No | No | Yes | Yes | Yes |
| Environment | Fully observable | Partially observable | Partially observable | Partially observable, uncertain | Unknown or changing |
| Example | Thermostat, basic vacuum cleaner | Mapping robot vacuum | Route finder | Self-driving car | Spam filter, recommender |

### Multi-Agent Systems

**Multi-agent system** is a **system of several agents that interact in a shared environment**.

The agents may **cooperate** to reach common goals (robots in a warehouse) or **compete** (players in a game). Agents may be **homogeneous** (similar) or **heterogeneous** (with different roles).

## References {#references}

**TutorialsPoint**

- [Agents and Environments](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_agents_and_environments.htm) — accessed 2026-11-06 (human, robotic and software agents, agent terminology, rationality, the ideal rational agent, PEAS, agent = architecture + agent program, simple reflex, model-based, goal-based and utility-based agents, properties of environments)

**GeeksforGeeks**

- [Agents in AI](https://www.geeksforgeeks.org/artificial-intelligence/agents-artificial-intelligence/), [Types of Agents in AI](https://www.geeksforgeeks.org/artificial-intelligence/types-of-agents-in-ai/), [Types of Environments in AI](https://www.geeksforgeeks.org/artificial-intelligence/types-of-environments-in-ai/), [Rational Agent in AI](https://www.geeksforgeeks.org/artificial-intelligence/rational-agent-in-ai/) and [PEAS Description of Task Environment](https://www.geeksforgeeks.org/artificial-intelligence/peas-description-of-task-environment/) — accessed 2026-11-06 (characteristics of agents, single- and multi-agent systems, the five types of agents with examples, the environment properties including competitive and collaborative, PEAS). It gives "traffic light control systems that change signals based on fixed timing" as a simple reflex agent; a fixed-timer controller does not perceive anything, so it is not a good example — a reflex agent must act on a percept.

**TpointTech**

- [AI Agents](https://www.tpointtech.com/ai-agents), [Types of AI Agents](https://www.tpointtech.com/types-of-ai-agents), [Agent and Environment](https://www.tpointtech.com/agent-and-environment-in-artificial-intelligence), [Intelligent Agent](https://www.tpointtech.com/intelligent-agent-in-ai) and [Problem-Solving Agents](https://www.tpointtech.com/problem-solving-agents-in-artificial-intelligence) — accessed 2026-11-06 (rules for an AI agent, rational agent, structure of an agent, PEAS, the five types of agents with the four components of a learning agent, features of environments)

**Programiz**

- Programiz has no page on intelligent agents (checked 2026-11-06).

**Additional source** (used for the PEAS tables of the taxi and medical diagnosis agents, the table of environment properties, "known vs unknown" environments, and the point that rationality is not omniscience)

- Stuart Russell and Peter Norvig, *Artificial Intelligence: A Modern Approach*, 4th edition, Pearson, chapter 2 (intelligent agents).
