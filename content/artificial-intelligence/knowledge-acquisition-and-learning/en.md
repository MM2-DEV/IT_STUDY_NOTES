---
description: Knowledge acquisition and machine learning — symbolic learning (rote, advice, induction, explanation-based, analogy) and non-symbolic learning (neural networks, perceptron, genetic algorithms), with the types of machine learning.
updated: 2026-11-06
---

## Learning in Symbolic and Non-Symbolic Representation {#learning-in-symbolic-and-non-symbolic-representation}

### Knowledge Acquisition

**Knowledge acquisition** is the process of gathering knowledge from human experts and other sources and converting it into a form that a computer system can use, such as the rules of a knowledge base.

It is done by a **knowledge engineer**, who interviews the domain expert, records and observes the expert at work, and organises the knowledge as IF–THEN rules (see [Expert Systems and Computer Vision](/topics/artificial-intelligence/expert-systems-and-computer-vision)). Manual knowledge acquisition is slow and expensive, and experts often find it hard to state what they know as rules; this is called the **knowledge acquisition bottleneck**. Machine learning reduces the bottleneck by letting the system acquire knowledge automatically from examples, data and experience.

### Learning

**Learning** is the process by which an AI system improves its performance on a task over time through experience, data or interaction with the environment.

**Machine learning (ML)** is the subset of artificial intelligence that enables machines to learn from data and improve with experience, without being explicitly programmed for every task.

The term *machine learning* was coined by Arthur Samuel in 1959. The output of a learning algorithm run on training data is called a **model**; in general, the more good data, the better the model.

### Symbolic and Non-Symbolic Representation

The knowledge that a system learns can be represented in two ways:

![Learning methods grouped by the representation of the learned knowledge](/diagrams/artificial-intelligence/learning-representations.svg)

1. **Symbolic representation:** knowledge is represented explicitly with symbols that humans can read: rules, logic, frames, semantic networks and decision trees. AI based on it is called **symbolic AI** (classical AI, or "good old-fashioned AI", GOFAI); it is the **top-down** approach.
2. **Non-symbolic (sub-symbolic) representation:** knowledge is represented implicitly as numbers, for example the connection weights of a neural network. AI based on it is called **connectionist AI**; it is the **bottom-up** approach, inspired by the structure of the brain.

| Point | Symbolic AI | Non-symbolic (connectionist) AI |
| --- | --- | --- |
| Knowledge representation | Explicit symbols and rules | Connections and numerical weights |
| Transparency | High: reasoning can be traced and explained | Low: often a "black box" |
| Strength | Logical reasoning, problem solving, explicit knowledge | Pattern recognition and prediction from data |
| How knowledge is obtained | Hand-coded by experts (knowledge engineering), or learned as rules | Learned from data by training |
| Learning from raw data | Difficult | Good |
| Flexibility to new situations | Less flexible | Adapts through training |
| Handling noisy data | Poor | Good |
| Data and computing needs | Less data and computing | Large datasets and heavy computing |
| Risk of overfitting | Lower | Higher |
| Examples | Expert systems, theorem provers, Prolog, decision-tree rules | Neural networks, deep learning, genetic algorithms |

**Neuro-symbolic (hybrid) AI** combines the two: the learning ability of neural networks with the structured knowledge and interpretability of symbolic AI.

### Learning in Symbolic Representation

In symbolic learning, the result of learning is an explicit symbolic structure (a fact, rule, concept description or decision tree) that a person can read. There are five main symbolic learning methods:

1. Rote learning
2. Learning by taking advice
3. Learning by induction (from examples)
4. Explanation-based learning
5. Learning by analogy

#### 1. Rote Learning

**Rote learning** is the simplest form of learning, in which the system stores (memorises) the results of computations or the given facts so that it can retrieve them later instead of computing them again.

1. It does not generalise; it only remembers.
2. It needs efficient storage and retrieval (organisation of memory) and must decide what is worth storing.
3. **Example:** Arthur Samuel's checkers program (1950s) remembered every board position it had already evaluated, together with its value. When the position appeared again, the stored value was used, which in effect extended the depth of its game-tree search.

#### 2. Learning by Taking Advice

**Learning by taking advice** is learning in which a teacher gives the system general, high-level instructions (advice), and the system converts (operationalises) the advice into concrete rules or procedures that it can execute.

Example: the advice "in a card game, avoid taking points" must be turned into specific rules about which card to play in each situation. The system must understand the advice, translate it into its own representation, and check that it fits its existing knowledge.

#### 3. Learning by Induction (From Examples)

**Inductive learning** is a type of learning in which the system forms a general rule or concept from a set of specific examples (training data), and uses it to make predictions about new examples.

1. Induction goes from specific examples to a general rule; it is the basis of most machine learning, especially supervised learning, where each training example has the correct answer.
2. Symbolic inductive methods produce readable rules or trees, for example **decision trees** built by ID3 (explained with a worked example in [Decision Tree](/topics/dbms/data-analysis-and-mining#decision-tree)).
3. Steps of an inductive learning algorithm: collect data; prepare (clean) it; extract features; train the model on labelled data; test it on separate data; deploy it on new cases.
4. Inductive learners are of two kinds: **instance-based learning** (store the examples and compare new cases with them, as in k-nearest neighbours) and **model-based learning** (build a model, such as a tree or an equation, from the examples).
5. **Example:** from examples of patients' symptoms and diagnoses, a system learns the rule `IF fever AND rash THEN measles`.
6. Applications: credit-risk assessment, disease diagnosis, face recognition, self-driving cars.

#### 4. Explanation-Based Learning

**Explanation-based learning (EBL)** is learning in which the system uses its domain knowledge to explain why a single example is an instance of a concept, and then generalises that explanation into a rule that applies to other cases.

Unlike induction, which needs many examples, EBL can learn from one example, because domain knowledge does most of the work. Its steps are:

1. **Input example:** a single (positive) example of the concept.
2. **Domain knowledge:** the rules and relationships of the domain.
3. **Explanation:** the system proves, using its domain knowledge, why the example satisfies the concept, and finds the features that matter.
4. **Generalisation:** the explanation is generalised into a rule.
5. **Learning outcome:** the new rule is stored and used for similar problems.

Example: an engine diagnosis system is given one case in which an engine would not start because of a faulty ignition coil. Using its knowledge of how the ignition system works, it explains the failure and learns the general rule "if the engine does not start and there is no spark, check the ignition coil".

#### 5. Learning by Analogy

**Learning by analogy** is learning in which knowledge from a known (source) situation is transferred to a new (target) situation that is similar to it.

Example: if flying a helicopter is similar to flying a drone, knowledge from piloting a helicopter can be transferred to flying a drone. A student who has solved one physics problem solves a new problem with the same structure in the same way.

### Learning in Non-Symbolic Representation

In non-symbolic learning, the result of learning is a set of numbers (weights or parameters), not readable rules. There are three main non-symbolic learning methods:

1. Neural network learning
2. Genetic (evolutionary) learning
3. Statistical learning (for example, Bayesian learning; see [Probabilistic Reasoning](/topics/artificial-intelligence/probabilistic-reasoning))

#### 1. Neural Network Learning

**An artificial neural network (ANN)** is a computing system of many simple, highly interconnected processing elements (artificial neurons), modelled on the brain, which learns by adjusting the weights of the connections between the neurons.

1. Each **neuron** (node) receives inputs, computes a weighted sum, applies an **activation function** and passes the result (its activation) to other neurons.
2. Each connection (link) has a **weight**, a real number; learning means changing the weights.
3. Neurons are arranged in an **input layer**, one or more **hidden layers** and an **output layer**.
4. **Topologies:**
   1. **Feed-forward ANN:** information flows in one direction, from input to output, with no loops; used for pattern recognition and classification.
   2. **Feedback (recurrent) ANN:** connections loop back, so the network can handle sequences, for example in time-series prediction and language modelling.
5. **Types:** feed-forward networks, convolutional neural networks (CNNs, for images), recurrent neural networks (RNNs, for sequences), modular networks, deconvolutional networks and generative adversarial networks (GANs).
6. A network with many hidden layers is a **deep neural network**; learning with it is **deep learning**.

| Feature | Biological neuron | Artificial neuron |
| --- | --- | --- |
| Structure | Cell body, dendrites, axon | A mathematical function |
| Working | Electrical and chemical signals | Weighted sum and activation function |
| Speed | Slower (chemical processes) | Very fast electronic computation |
| Energy use | Very energy-efficient | Less energy-efficient |
| Learning | From experience; generalises well | From data by optimisation; needs large datasets |

##### The Perceptron

**The perceptron** is the simplest neural network: a single artificial neuron that computes a weighted sum of its inputs and outputs 1 if the sum is above a threshold, otherwise 0.

It was introduced by Frank Rosenblatt (1957–1958).

![A perceptron with two inputs](/diagrams/artificial-intelligence/perceptron.svg)

Output:

`net = w₁x₁ + w₂x₂ + … + wₙxₙ + b`, and `y = 1` if `net > 0`, otherwise `y = 0`

**Perceptron learning rule.** After each training example, every weight is changed by:

`wᵢ(new) = wᵢ(old) + η (t − y) xᵢ` and `b(new) = b(old) + η (t − y)`

where:

1. `xᵢ` = the `i`-th input; `wᵢ` = its weight; `b` = the bias (a weight on a constant input of 1).
2. `t` = the target (correct) output; `y` = the actual output.
3. `η` (eta) = the learning rate, a small positive constant.
4. If the output is correct, `t − y = 0` and nothing changes; if it is wrong, the weights move towards the correct answer.

**Worked example: learning the OR function.** Start with `w₁ = w₂ = b = 0` and `η = 1`, and present the four examples in order: (0,0) → 0, (0,1) → 1, (1,0) → 1, (1,1) → 1. Only the steps where the output is wrong change the weights:

| Epoch | Input (x₁, x₂) | Target t | net | Output y | New w₁, w₂, b |
| --- | --- | --- | --- | --- | --- |
| 1 | (0, 1) | 1 | 0 | 0 | 0, 1, 1 |
| 2 | (0, 0) | 0 | 1 | 1 | 0, 1, 0 |
| 2 | (1, 0) | 1 | 0 | 0 | 1, 1, 1 |
| 3 | (0, 0) | 0 | 1 | 1 | 1, 1, 0 |

In epoch 4, with `w₁ = 1`, `w₂ = 1`, `b = 0`, all four examples are correct: (0,0) gives net 0 → 0; (0,1) and (1,0) give net 1 → 1; (1,1) gives net 2 → 1. Learning stops. (The full trace was checked with a short program.)

A single perceptron can learn only **linearly separable** functions (AND, OR). It cannot learn XOR, as Marvin Minsky and Seymour Papert showed in their book *Perceptrons* (1969); XOR needs a network with a hidden layer (a multilayer perceptron), trained by backpropagation.

##### Applications of Neural Networks

1. Aerospace: autopilots, aircraft fault detection.
2. Automotive: guidance systems.
3. Military: target tracking, object discrimination, facial recognition.
4. Electronics: chip layout, chip failure analysis, machine vision, voice synthesis.
5. Finance: loan advising, credit evaluation, currency prediction.
6. Industry: process control, quality inspection.
7. Medicine: cancer cell analysis, EEG and ECG analysis.
8. Speech: speech recognition, text-to-speech.
9. Telecommunications: image and data compression.

#### 2. Genetic (Evolutionary) Learning

**A genetic algorithm (GA)** is a search and optimisation method, inspired by natural evolution, that keeps a population of candidate solutions and improves it over generations by selection, crossover and mutation.

Genetic algorithms belong to **evolutionary computation**, which also includes evolution strategies, evolutionary programming and genetic programming. The steps are:

1. **Initialisation:** create a random population of individuals (candidate solutions), usually encoded as bit strings (chromosomes).
2. **Evaluation:** compute the **fitness** of each individual with a fitness function.
3. **Selection:** choose parents, giving fitter individuals a higher chance.
4. **Crossover (recombination):** combine parts of two parents to make offspring.
5. **Mutation:** randomly flip some bits of the offspring, to keep variety.
6. **Replacement:** the offspring form the next generation; repeat from step 2 until a good enough solution is found or a set number of generations is reached.

**Worked example.** Maximise `f(x) = x²` for integers `0 ≤ x ≤ 31`, encoded as 5-bit strings.

1. Initial population and fitness:

| Individual | Binary | Fitness x² | Selection probability (fitness ÷ 1155) |
| --- | --- | --- | --- |
| 12 | 01100 | 144 | 0.125 |
| 25 | 11001 | 625 | 0.541 |
| 5 | 00101 | 25 | 0.022 |
| 19 | 10011 | 361 | 0.313 |
| Total | | 1155 | 1.000 |

2. **Selection** (roulette wheel): 25 has the highest chance (54.1%) of being chosen as a parent; 5 has only 2.2%. Suppose 25 and 12 are chosen.
3. **Single-point crossover** after the second bit: `11|001` and `01|100` produce `11100` (28) and `01001` (9).
4. **Mutation** of the third bit of `01001` gives `01101` (13).
5. The offspring 28 has fitness 784, higher than any individual in the first generation (the best was 625). Repeating the cycle moves the population towards the optimum, `x = 31` (`11111`). (Checked with a short program.)

Applications of evolutionary computation: engineering design (aerodynamic shapes, circuits), tuning machine-learning models, game development, bioinformatics, financial forecasting and scheduling.

### Types of Machine Learning

Both symbolic and non-symbolic learners are trained in one of three main ways:

1. **Supervised learning:** the model is trained with **labelled** data, in which each input has the correct output. It learns a mapping from inputs to outputs and is used for prediction.
   1. **Classification** predicts a category (spam or not spam; cat or dog). Algorithms: decision tree, naive Bayes, k-nearest neighbours, support vector machine, logistic regression, random forest.
   2. **Regression** predicts a continuous value (house price, sales). Algorithms: linear and polynomial regression.
2. **Unsupervised learning:** the model is trained with **unlabelled** data and discovers hidden patterns or groups by itself. Tasks: clustering (customer segmentation), association rules (market-basket analysis) and dimensionality reduction.
3. **Reinforcement learning:** an **agent** learns by trial and error while interacting with an environment; it receives a **reward** for good actions and a penalty for bad ones, and learns the actions that maximise the total reward over time. Applications: game playing (AlphaGo, chess), robotics, self-driving cars.

**Semi-supervised learning** uses a small amount of labelled data with a large amount of unlabelled data.

| Point | Supervised learning | Unsupervised learning | Reinforcement learning |
| --- | --- | --- | --- |
| Data | Labelled (input and correct output) | Unlabelled (input only) | No fixed dataset; experience from interaction |
| Feedback | Correct answer for every example | None | Reward or penalty after actions |
| Goal | Predict outputs for new inputs | Find hidden structure or groups | Maximise long-term reward |
| Main tasks | Classification, regression | Clustering, association, dimensionality reduction | Sequential decision-making, control |
| Examples | Spam detection, house-price prediction, disease prediction | Customer segmentation, market-basket analysis | Game playing, robot control |

### Deep Learning and Federated Learning

**Deep learning** is a subset of machine learning that uses neural networks with many layers to learn features automatically from large amounts of data.

It is used in image recognition, speech recognition, natural language processing and medical diagnosis. It can be supervised or unsupervised, and it needs large datasets and powerful hardware.

**Federated learning** is a distributed machine-learning approach in which a model is trained on many devices, each using its own local data, and only the model updates (not the raw data) are sent to a central server.

Because the data stays on the devices, federated learning protects privacy. It is used in mobile keyboard prediction, healthcare data analysis and IoT systems.

| Point | Reinforcement learning | Deep learning | Federated learning |
| --- | --- | --- | --- |
| Learning mechanism | Trial and error with reward feedback | Multi-layer neural networks learn features | Collaborative training with local model updates |
| Data usage | Generated by interaction with the environment | Large labelled or unlabelled datasets | Data stays on local devices |
| Applications | Robotics, game playing, autonomous vehicles | Image and speech recognition, NLP | Keyboard prediction, healthcare, IoT |

## References {#references}

- TutorialsPoint — [Machine Learning](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_machine_learning.htm), [Neural Networks](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_neural_networks.htm), [Evolutionary Computation](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_evolutionary_computation.htm), accessed 2026-11-06.
- TpointTech — [Inductive Learning in Artificial Intelligence](https://www.tpointtech.com/inductive-learning-in-artificial-intelligence), [Symbolic Reasoning in Artificial Intelligence](https://www.tpointtech.com/symbolic-reasoning-in-artificial-intelligence), accessed 2026-11-06.
- GeeksforGeeks — [Difference between Symbolic and Connectionist AI](https://www.geeksforgeeks.org/artificial-intelligence/difference-between-symbolic-and-connectionist-ai/), [What is Symbolic AI?](https://www.geeksforgeeks.org/artificial-intelligence/what-is-symbolic-ai/), [Explanation Based Learning in AI](https://www.geeksforgeeks.org/artificial-intelligence/explanation-based-learning-in-ai/), [Types of Machine Learning](https://www.geeksforgeeks.org/machine-learning/types-of-machine-learning/), accessed 2026-11-06.
- Programiz has no page on these subjects.
- Wikipedia — [Arthur Samuel](https://en.wikipedia.org/wiki/Arthur_Samuel_(computer_scientist)) (rote learning in the checkers program; the term "machine learning") and [Perceptron](https://en.wikipedia.org/wiki/Perceptron) (Rosenblatt; Minsky and Papert, 1969), accessed 2026-11-06.
- Learning by taking advice is not covered by the reference websites; its description follows Elaine Rich and Kevin Knight, *Artificial Intelligence*, 2nd edition, McGraw-Hill, 1991, chapter "Learning" (the book was not consulted online for these notes).

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint's neural-network page calls each connection weight "an integer number"; weights are real numbers (for example 0.35 or −1.2), which is what lets gradual learning work.
2. TutorialsPoint's evolutionary computation page says that evolutionary systems process large datasets "at a faster rate" than neural networks; this depends on the problem, so the claim was not used.
3. The perceptron and genetic-algorithm examples were checked with short programs.
