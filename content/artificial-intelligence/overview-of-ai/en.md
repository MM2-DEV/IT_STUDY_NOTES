---
description: Overview of artificial intelligence - definitions, the four approaches, the Turing test, history and AI winters, goals and foundations, types by capability and functionality, branches, AI vs machine learning vs deep learning, applications, and advantages and disadvantages.
updated: 2026-11-06
---

### Definition of Artificial Intelligence

Artificial intelligence (AI) is the **branch of computer science that builds machines and computer programs able to perform tasks that normally need human intelligence**, such as learning, reasoning, problem solving, understanding language and perceiving the environment.

**John McCarthy**, who coined the term and is called the **father of AI**, defined it as "the science and engineering of making intelligent machines, especially intelligent computer programs". Everyday examples include voice assistants (Siri, Alexa), machine translation (Google Translate), recommendation systems (Netflix), spam filters, self-driving cars and chatbots such as ChatGPT.

### Intelligence

Intelligence is the **ability to learn from experience, reason, solve problems, understand and adapt to new situations**.

Its main components are **reasoning**, **learning**, **problem solving**, **perception** and **language understanding**. An AI system tries to reproduce these abilities in a machine.

### Four Approaches to AI

Definitions of AI fall into four groups, according to whether they are about **thinking or acting**, and whether they measure success against **human** performance or **ideal (rational)** performance:

1. **Thinking humanly (cognitive modelling)** — building systems that think the way people think, tested against psychological experiments.
2. **Acting humanly (the Turing test approach)** — building systems that behave like people.
3. **Thinking rationally (the laws of thought)** — building systems that reason correctly using logic.
4. **Acting rationally (the rational agent approach)** — building **agents** that act to achieve the best expected outcome. This is the approach of most modern AI.

![The four approaches to defining AI](/diagrams/artificial-intelligence/ai-approaches.svg)

### Turing Test

The Turing test is a **test, proposed by Alan Turing in 1950, of whether a machine can show intelligent behaviour that cannot be distinguished from that of a human**.

It was described in Turing's paper "Computing Machinery and Intelligence", which asked "Can machines think?", and is based on the **imitation game**:

1. Three players: **A, a computer**; **B, a human**; and **C, a human interrogator**, who is separated from A and B.
2. C asks questions and receives answers by **text only** (keyboard and screen), so voice and appearance do not matter.
3. If C **cannot reliably tell** which of A and B is the machine, the machine **passes** the test and is considered intelligent.

To pass, a machine would need natural language processing, knowledge representation, automated reasoning and machine learning. The **total Turing test** also includes vision and the manipulation of objects (robotics). The **Loebner Prize** (from 1991) was an annual competition based on the test.

![The Turing test](/diagrams/artificial-intelligence/turing-test.svg)

### History of AI

| Year | Milestone |
| --- | --- |
| 1943 | **Warren McCulloch and Walter Pitts** proposed a model of the artificial neuron |
| 1950 | **Alan Turing** published "Computing Machinery and Intelligence" and proposed the Turing test |
| 1955–1956 | **Allen Newell and Herbert Simon** created the **Logic Theorist**, often called the first AI program |
| 1956 | **Dartmouth Conference**: John McCarthy coined the term **"Artificial Intelligence"**; AI became an academic field |
| 1958 | John McCarthy developed the **LISP** language; Frank Rosenblatt introduced the **perceptron** |
| 1959 | Arthur Samuel coined the term **machine learning** (checkers-playing program) |
| 1966 | Joseph Weizenbaum created **ELIZA**, the first chatbot; **Shakey**, the first mobile robot that reasoned about its actions, was developed at SRI (1966–1972) |
| 1972 | **PROLOG** was developed (Alain Colmerauer); WABOT-1, the first humanoid robot, was built in Japan |
| 1974–1980 | **First AI winter** — funding and interest fell because early promises were not met |
| 1980–1987 | Boom of **expert systems** (such as XCON) in industry |
| 1987–1993 | **Second AI winter** — expert systems proved costly and hard to maintain |
| 1997 | IBM's **Deep Blue** defeated world chess champion **Garry Kasparov** |
| 2011 | IBM's **Watson** won the quiz show *Jeopardy!*; Apple's Siri was released |
| 2012 | **AlexNet** (a deep convolutional neural network) began the deep learning boom |
| 2016 | DeepMind's **AlphaGo** defeated Go champion **Lee Sedol** |
| 2022 | OpenAI released **ChatGPT**, bringing generative AI to the public |

### Goals of AI

1. To create **expert systems** that show intelligent behaviour and advise users.
2. To implement **human intelligence** in machines — systems that understand, think, learn and behave like humans.
3. To develop **problem-solving** and **reasoning** abilities.
4. To enable **continuous learning** from data and experience.
5. To **automate** tasks and help humans make better decisions.

### Foundations of AI

AI draws on several disciplines:

1. **Philosophy** — logic, reasoning and the nature of mind and knowledge.
2. **Mathematics** — logic, probability, statistics and algorithms.
3. **Economics** — decision theory and game theory.
4. **Neuroscience** — how the brain processes information (neural networks).
5. **Psychology** — how people think and act (cognitive science).
6. **Computer engineering** — fast computers and hardware.
7. **Control theory** — systems that act on feedback.
8. **Linguistics** — the structure and meaning of language.

### Types of AI Based on Capabilities

There are three types of AI based on capabilities:

1. **Narrow AI (weak AI)** — performs **one specific task** (or a narrow range of tasks) intelligently, but cannot work beyond it. All AI in use today is narrow AI. Examples: Siri, Alexa, face recognition, chess programs, recommendation engines.
2. **General AI (strong AI, AGI)** — would perform **any intellectual task a human can**, learning and adapting across tasks. It is still **theoretical**.
3. **Super AI** — would **surpass human intelligence** in every field, including creativity and decision making. It is **hypothetical**.

### Types of AI Based on Functionality

There are four types of AI based on functionality:

1. **Reactive machines** — the most basic type: they respond only to the **current input**, with no memory of the past. Example: IBM's **Deep Blue**, which chose chess moves by evaluating the present board position.
2. **Limited memory** — use **recent past data** for a short time to make decisions; most modern AI belongs here. Examples: **self-driving cars** (which track the speed and position of nearby cars), chatbots that remember the current conversation.
3. **Theory of mind** — would understand human **emotions, beliefs and intentions** and interact socially; still under research.
4. **Self-aware AI** — would have **consciousness** and awareness of itself; hypothetical.

### Branches (Subfields) of AI

1. **Machine learning** — systems that learn from data without being explicitly programmed.
2. **Neural networks and deep learning** — models inspired by the brain, with many layers.
3. **Natural language processing (NLP)** — understanding and generating human language.
4. **Expert systems** — programs that give expert advice in a narrow domain using rules.
5. **Computer vision** — understanding images and video.
6. **Robotics** — machines that perceive and act in the physical world.
7. **Fuzzy logic** — reasoning with degrees of truth rather than only true and false.
8. **Search, planning and game playing** — finding sequences of actions to reach goals.
9. **Knowledge representation and reasoning** — storing knowledge and drawing conclusions from it.

### AI vs Machine Learning vs Deep Learning

![AI, machine learning and deep learning](/diagrams/artificial-intelligence/ai-ml-dl.svg)

| Basis | Artificial intelligence | Machine learning | Deep learning |
| --- | --- | --- | --- |
| Scope | The broad field of intelligent machines | A subset of AI | A subset of machine learning |
| Idea | Machines that act intelligently, by any method (rules, search, learning) | Systems that learn patterns from data | Learning with neural networks of many layers |
| Data needed | Varies (rule-based AI needs little data) | Moderate amounts | Very large amounts |
| Features | Defined by experts (in rule-based AI) | Often chosen by humans | Learned automatically from raw data |
| Hardware | Ordinary computers | Ordinary computers | GPUs or other accelerators |
| Examples | Expert systems, search, chess programs | Spam filters, recommendation systems | Image recognition, speech recognition, ChatGPT |

### AI Programming vs Traditional Programming

| Basis | AI programming | Traditional programming |
| --- | --- | --- |
| Problems | Complex, ill-defined problems | Well-defined, predictable problems |
| Method | Learns or reasons from data and knowledge | Follows fixed, step-by-step instructions |
| Adaptation | Improves with experience | Changes only when the code is changed |
| Output | May be approximate (probabilistic) | Exact and deterministic |

### Applications of AI

1. **Healthcare** — disease diagnosis from medical images, drug discovery, health monitoring.
2. **Finance and banking** — fraud detection, credit scoring, algorithmic trading, chatbots.
3. **Education** — personalized learning and automatic grading.
4. **Transportation** — self-driving cars, traffic management and route planning.
5. **E-commerce and entertainment** — product and film recommendations.
6. **Agriculture** — crop and soil monitoring, pest detection.
7. **Security** — face recognition, cyber-attack detection.
8. **Manufacturing** — robots, quality control and predictive maintenance.
9. **Gaming** — intelligent opponents (chess, Go).
10. **Language** — translation, speech recognition and virtual assistants.

### Advantages of AI

1. **High accuracy** and fewer human errors.
2. **Works 24 × 7** without tiredness.
3. **Fast decisions** and processing of huge amounts of data.
4. Performs **repetitive and dangerous tasks** (for example, bomb disposal, space and deep-sea exploration).
5. Helps in **new discoveries** (such as medicine and science).

### Disadvantages of AI

1. **High cost** of development and maintenance.
2. **Unemployment** — may replace human jobs in some areas.
3. **No emotions, creativity or common sense** like humans.
4. **Dependence** on data; biased data gives **biased decisions**.
5. **Ethical, privacy and security risks** (such as deepfakes and misuse of personal data).

## References {#references}

**TutorialsPoint**

- [Artificial Intelligence – Overview](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_overview.htm), [History and Evolution](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_history_and_evolution.htm), [Types of AI](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_types.htm), [Research Areas](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_research_areas.htm), [Applications](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_applications.htm), [Intelligent Systems](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligent_systems.htm) and [Issues](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_issues.htm) — accessed 2026-11-06 (McCarthy's definition, milestones, goals, contributing disciplines, AI vs traditional coding, types by capability and functionality). Issues: it heads narrow AI as "Normal AI (Weak AI)", writes "Gray Kasparov" for Garry Kasparov, and gives AlphaGo as an example of a reactive machine that does not learn from previous games — AlphaGo was trained with deep learning on human games and by playing against itself.

**GeeksforGeeks**

- [What is Artificial Intelligence (AI)](https://www.geeksforgeeks.org/artificial-intelligence/what-is-artificial-intelligence-ai/), [Types of Artificial Intelligence](https://www.geeksforgeeks.org/artificial-intelligence/types-of-artificial-intelligence/) and [Turing Test in Artificial Intelligence](https://www.geeksforgeeks.org/artificial-intelligence/turing-test-artificial-intelligence/) — accessed 2026-11-06 (definition, core concepts, narrow, general and super AI, reactive machines to self-awareness, the imitation game). Its types page also describes AlphaGo as working "without retaining memory from past games" (see above).

**TpointTech**

- [Artificial Intelligence](https://www.tpointtech.com/artificial-intelligence-ai), [History of Artificial Intelligence](https://www.tpointtech.com/history-of-artificial-intelligence), [Types of Artificial Intelligence](https://www.tpointtech.com/types-of-artificial-intelligence), [Turing Test in AI](https://www.tpointtech.com/turing-test-in-ai), [Approaches of AI](https://www.tpointtech.com/approaches-of-artificial-intelligence), [Applications of AI](https://www.tpointtech.com/applications-of-artificial-intelligence) and [Advantages and Disadvantages of AI](https://www.tpointtech.com/advantages-and-disadvantages-of-artificial-intelligence) — accessed 2026-11-06 (milestones from McCulloch–Pitts 1943 to AlphaGo 2016, the two AI winters, the Turing test and the Loebner Prize, symbolic and statistical approaches). Issues: it calls Alan Turing an "Irishman" (he was English), and says that using an expert system "such as XCON was very cheap" — the high cost of building and maintaining expert systems was a cause of the second AI winter.

**IT Job QnS**

- [ML, AI and Big Data](https://it.jobqns.com/ml-ai-big-data/) — accessed 2026-11-06 (questions on machine learning, NLP, generative AI and explainable AI; it has no item on the overview of AI itself).

**Programiz**

- Programiz has no page on artificial intelligence (checked 2026-11-06).

**Additional source** (used for the four approaches to AI and the foundations of AI, which the reference websites do not organize in this way)

- Stuart Russell and Peter Norvig, *Artificial Intelligence: A Modern Approach*, 4th edition, Pearson, chapter 1 (thinking and acting humanly and rationally, the Turing test and total Turing test, foundations and history of AI).
