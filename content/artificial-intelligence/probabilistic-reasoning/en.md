---
description: Uncertainty, probability basics, conditional probability, Bayes' theorem, Bayesian networks, Markov models and Dempster–Shafer theory in AI.
updated: 2026-11-06
---

### Uncertainty

Knowledge represented in propositional or first-order logic is certain: a rule `A → B` says that whenever A is true, B is true. In the real world an agent is often not sure whether A is true, or B follows from A only most of the time. This situation is called **uncertainty**.

**Uncertainty** is the lack of complete and certain knowledge about the state of the world, the result of an action or the truth of a statement.

Causes of uncertainty:

1. Information from unreliable sources.
2. Experimental errors.
3. Equipment faults.
4. Temperature variation.
5. Climate change and other unpredictable natural events.
6. Incomplete information (missing data).
7. Noise in data from sensors or measurements.
8. Ambiguity: an input that can be interpreted in more than one way.

Example: a medical diagnosis system must interpret symptoms that can be caused by several diseases, cope with noisy test results and account for an incomplete patient history.

### Probabilistic Reasoning

**Probabilistic reasoning** is a way of knowledge representation and reasoning that applies the concept of probability to indicate the uncertainty in knowledge, combining probability theory with logic.

Probability summarises the uncertainty that comes from "laziness" (it is too much work to list every exception) and "ignorance" (not all facts are known). Examples of uncertain statements are "It will rain today" and "Team A will win the match".

Probabilistic reasoning is needed:

1. When there are unpredictable outcomes.
2. When the number of possibilities is too large to handle with exact rules.
3. When an unknown error occurs during an experiment.

Two common ways to solve problems with uncertain knowledge are:

1. Bayes' rule
2. Bayesian statistics

### Basic Terms of Probability

**Probability** is the numerical measure of the likelihood that an event will occur, written `P(A)` for an event A, with `0 ≤ P(A) ≤ 1`.

1. `P(A) = 0` means that A certainly does not occur (it is impossible).
2. `P(A) = 1` means that A certainly occurs.
3. `P(¬A)` is the probability that A does not occur, and `P(A) + P(¬A) = 1`.

Other terms:

1. **Event:** each possible outcome of a variable.
2. **Sample space:** the collection of all possible outcomes.
3. **Random variable:** a variable that represents events and objects of the real world; it takes values from its domain with certain probabilities (for example, `Weather` ∈ {sunny, rainy, cloudy}).
4. **Prior probability:** the probability of an event before new evidence is observed, `P(A)`.
5. **Posterior probability:** the probability of an event after the evidence has been taken into account, `P(A | B)`.
6. **Joint probability:** the probability that two events occur together, `P(A ∧ B)`.
7. **Joint probability distribution:** the probabilities of all combinations of values of a set of random variables.

### Conditional Probability

**Conditional probability** is the probability that an event A occurs given that another event B has already occurred, written `P(A | B)`.

`P(A | B) = P(A ∧ B) / P(B)`, provided `P(B) > 0`

where:

1. `P(A ∧ B)` is the joint probability of A and B.
2. `P(B)` is the (marginal) probability of B.

Once B has occurred, the sample space is reduced to B, so the probability of A is the part of B where A also occurs, divided by the probability of B. Rearranging gives the **product rule**:

`P(A ∧ B) = P(A | B) · P(B) = P(B | A) · P(A)`

**Example.** In a class, 70% of the students like English, and 40% like both English and Mathematics. What percentage of the students who like English also like Mathematics?

1. Let E = "likes English" and M = "likes Mathematics": `P(E) = 0.7`, `P(M ∧ E) = 0.4`.
2. `P(M | E) = P(M ∧ E) / P(E) = 0.4 / 0.7 ≈ 0.571`.
3. So about **57%** of the students who like English also like Mathematics.

**Independent events.** A and B are independent if the occurrence of one does not change the probability of the other: `P(A | B) = P(A)`, or equivalently `P(A ∧ B) = P(A) · P(B)`.

**Law of total probability.** If `A₁, A₂, …, Aₙ` are mutually exclusive and exhaustive events (exactly one of them occurs), then for any event B:

`P(B) = P(B | A₁)P(A₁) + P(B | A₂)P(A₂) + … + P(B | Aₙ)P(Aₙ)`

### Bayes' Theorem

**Bayes' theorem** (Bayes' rule) is a formula that computes the probability of a cause (hypothesis) A given observed evidence B from the reverse conditional probability `P(B | A)` and the prior probabilities.

`P(A | B) = P(B | A) · P(A) / P(B)`

where:

1. `P(A | B)` is the **posterior** probability: the probability of hypothesis A after evidence B is observed.
2. `P(B | A)` is the **likelihood**: the probability of the evidence if the hypothesis is true.
3. `P(A)` is the **prior** probability of the hypothesis, before the evidence is considered.
4. `P(B)` is the **marginal** probability of the evidence (the normalising constant).

The theorem is named after the British mathematician Thomas Bayes. It allows an AI system to update a belief when new information arrives, and it is the basis of most modern AI systems for probabilistic inference.

**Derivation.** From the product rule, `P(A ∧ B) = P(A | B) · P(B)` and `P(A ∧ B) = P(B | A) · P(A)`. Equating the right-hand sides and dividing by `P(B)` gives Bayes' theorem.

**General form.** For mutually exclusive and exhaustive hypotheses `A₁, …, Aₙ`, `P(B)` is found by the law of total probability:

`P(Aᵢ | B) = P(B | Aᵢ) · P(Aᵢ) / Σₖ P(B | Aₖ) · P(Aₖ)`

Bayes' theorem is useful because the probability in the causal direction, `P(effect | cause)`, is often known, while the probability in the diagnostic direction, `P(cause | effect)`, is what is needed.

#### Worked Example 1: Server Latency

Server X handles 60% of incoming requests and server Y handles 40%. The probability of high latency is 2% for X and 4% for Y. Find the probability that a randomly selected request has high latency, and the probability that a delayed request was handled by X.

1. Given: `P(X) = 0.6`, `P(Y) = 0.4`, `P(L | X) = 0.02`, `P(L | Y) = 0.04`, where L = "high latency".
2. Total probability: `P(L) = P(L | X)P(X) + P(L | Y)P(Y) = 0.02 × 0.6 + 0.04 × 0.4 = 0.012 + 0.016 = 0.028` (2.8%).
3. Bayes' theorem: `P(X | L) = P(L | X)P(X) / P(L) = 0.012 / 0.028 = 3/7 ≈ 0.4286`.
4. Similarly, `P(Y | L) = 0.016 / 0.028 = 4/7 ≈ 0.5714`.

So a delayed request is more likely to have come from Y, although Y handles fewer requests. (This question was asked in an Assistant Programmer examination.)

#### Worked Example 2: Meningitis

A doctor knows that meningitis causes a stiff neck in 80% of cases. The probability that a patient has meningitis is 1/30,000, and the probability that a patient has a stiff neck is 2%. What is the probability that a patient with a stiff neck has meningitis?

1. Let M = "has meningitis" and S = "has a stiff neck": `P(S | M) = 0.8`, `P(M) = 1/30,000`, `P(S) = 0.02`.
2. `P(M | S) = P(S | M) · P(M) / P(S) = 0.8 × (1/30,000) / 0.02 = 1/750 ≈ 0.00133`.
3. So only about 1 patient in 750 with a stiff neck has meningitis.

#### Worked Example 3: Playing Cards

A card is drawn from a standard deck of 52 cards. Given that it is a face card (jack, queen or king), what is the probability that it is a king?

1. `P(King) = 4/52 = 1/13`; `P(Face) = 12/52 = 3/13`; `P(Face | King) = 1` (every king is a face card).
2. `P(King | Face) = P(Face | King) · P(King) / P(Face) = 1 × (1/13) / (3/13) = 1/3`.

Bayes' theorem is also the basis of the Naive Bayes classifier, explained in [Bayes Theory](/topics/dbms/data-analysis-and-mining#bayes-theory).

#### Applications of Bayes' Theorem in AI

1. **Medical diagnosis:** computing the probability of diseases from symptoms and test results.
2. **Spam filtering:** computing the probability that an e-mail is spam from the words it contains.
3. **Robotics:** updating a robot's estimate of its position and map from noisy sensor readings (localisation and mapping, SLAM).
4. **Image recognition:** labelling an image with a probability for each class.
5. **Recommender systems:** estimating the probability that a user will like an item from past behaviour.
6. **Machine learning:** Bayesian inference updates a model's parameters as new data arrives.

### Bayesian Network

**A Bayesian network** is a probabilistic graphical model that represents a set of random variables and their conditional dependencies by a directed acyclic graph (DAG), with a conditional probability table for each node.

It is also called a **Bayes network**, **belief network**, **Bayesian belief network (BBN)** or **Bayesian model**. A Bayesian network has two components:

1. **Directed acyclic graph (the causal component, or structure):**
   1. Each **node** represents a random variable, which can be discrete or continuous.
   2. Each **arc** (arrow) represents a direct influence (a causal relationship or conditional dependency). An arrow from X to Y means X is a **parent** of Y.
   3. The absence of an arc between two nodes means that neither directly influences the other.
2. **Conditional probability tables (the numerical component, or parameters):** each node X has a table that gives `P(X | Parents(X))` for every combination of values of its parents. A node with no parents has just its prior probability. Each row of a table sums to 1. A Boolean variable with `k` Boolean parents needs `2^k` rows (one independent probability per row).

**Conditional independence.** Each node is conditionally independent of its non-descendants, given its parents. Because of this, the full joint probability distribution is the product of the local conditional probabilities:

`P(X₁, X₂, …, Xₙ) = Π P(Xᵢ | Parents(Xᵢ))`, for `i = 1 to n`

where `Π` means the product of the terms. This is derived from the **chain rule**, `P(x₁, …, xₙ) = P(x₁ | x₂, …, xₙ) · P(x₂ | x₃, …, xₙ) ⋯ P(xₙ)`, by dropping from each condition the variables that are not parents.

#### Example: Burglar Alarm

Harry has a burglar alarm at home. It responds reliably to a burglary but also to minor earthquakes. Two neighbours, David and Sophia, have promised to call Harry at work when they hear the alarm. David always calls when he hears the alarm, but sometimes confuses the telephone ringing with the alarm and calls then too. Sophia listens to loud music and sometimes misses the alarm.

![Bayesian network for the burglar-alarm example](/diagrams/artificial-intelligence/bayesian-network.svg)

Variables: Burglary (B), Earthquake (E), Alarm (A), David calls (D), Sophia calls (S). Burglary and Earthquake are the parents of Alarm; Alarm is the parent of both calls. The neighbours do not perceive a burglary or an earthquake directly, and they do not confer before calling.

By the chain rule and conditional independence:

`P(D, S, A, B, E) = P(D | A) · P(S | A) · P(A | B, E) · P(B) · P(E)`

**Query 1.** What is the probability that the alarm has sounded, there is neither a burglary nor an earthquake, and both David and Sophia call?

1. `P(S, D, A, ¬B, ¬E) = P(S | A) · P(D | A) · P(A | ¬B, ¬E) · P(¬B) · P(¬E)`
2. `= 0.75 × 0.91 × 0.001 × 0.998 × 0.999`
3. `≈ 0.00068`

**Query 2.** What is the probability that the alarm sounds, `P(A)`? Sum over all four combinations of B and E:

1. `P(A) = P(A | B, E)P(B)P(E) + P(A | B, ¬E)P(B)P(¬E) + P(A | ¬B, E)P(¬B)P(E) + P(A | ¬B, ¬E)P(¬B)P(¬E)`
2. `= 0.94 × 0.002 × 0.001 + 0.95 × 0.002 × 0.999 + 0.31 × 0.998 × 0.001 + 0.001 × 0.998 × 0.999`
3. `= 0.00000188 + 0.0018981 + 0.00030938 + 0.000997002 ≈ 0.0032`

**Query 3 (diagnostic reasoning).** If both David and Sophia call, the probability of a burglary is found by summing the joint probability over the unknown variables (E and A) and normalising: `P(B | D, S) ≈ 0.0013 / 0.0032 ≈ 0.41`. The two calls raise the probability of a burglary from 0.002 to about 0.41. (All three answers were checked with a short program.)

A Bayesian network supports both **predictive** reasoning (from causes to effects, as in Query 2) and **diagnostic** reasoning (from effects to causes, as in Query 3).

#### Inference and Learning in Bayesian Networks

1. **Inference** computes the probability of some variables given observed values (evidence) of others:
   1. **Exact inference:** enumeration, variable elimination, the junction-tree algorithm.
   2. **Approximate inference:** Monte Carlo (sampling) methods and loopy belief propagation.
2. **Learning** a Bayesian network has two tasks:
   1. **Structure learning:** finding the DAG from data.
   2. **Parameter learning:** estimating the conditional probability tables, for example by maximum likelihood estimation.

An **influence diagram** (decision network) is a generalisation of a Bayesian network that adds decision nodes and utility nodes to solve decision problems under uncertainty.

#### Applications of Bayesian Networks

1. Medical diagnosis (linking diseases to symptoms).
2. Spam filtering and document classification.
3. Fault diagnosis in machines and networks.
4. Risk analysis in finance and environmental management.
5. Prediction and anomaly detection.
6. Gene regulatory networks in bioinformatics.

### Markov Models

**A Markov chain** is a probabilistic model of a system that moves between states, in which the probability of the next state depends only on the current state and not on the earlier states (the **Markov, or memoryless, property**).

The probabilities of moving between states are given by a **state transition matrix**.

**Example.** A weather model has two states. If today is Sunny, tomorrow is Sunny with probability 0.8 and Rainy with 0.2. If today is Rainy, tomorrow is Sunny with probability 0.4 and Rainy with 0.6. Today is Sunny; what is the probability that the day after tomorrow is Rainy?

1. Path Sunny → Sunny → Rainy: `0.8 × 0.2 = 0.16`.
2. Path Sunny → Rainy → Rainy: `0.2 × 0.6 = 0.12`.
3. `P(Rainy on day 2) = 0.16 + 0.12 = 0.28`.

**A hidden Markov model (HMM)** is a Markov chain whose states are hidden (not directly observed); each hidden state produces observable outputs with certain **emission probabilities**.

HMMs are used in speech recognition (the sounds are observed, the phonemes are hidden), part-of-speech tagging, bioinformatics and financial modelling.

**A dynamic Bayesian network (DBN)** is an extension of a Bayesian network over many time steps, used to model processes that change over time; an HMM is a simple DBN.

**A Markov decision process (MDP)** is a model of decision-making under uncertainty, with states, actions, transition probabilities and rewards; an agent finds the best policy (action for each state).

MDPs are the foundation of reinforcement learning.

### Dempster–Shafer Theory

**Dempster–Shafer theory** is a generalisation of Bayesian probability theory that assigns degrees of belief (masses) to sets of possibilities rather than to single events, so that ignorance can be represented explicitly.

1. The set of all possible answers is the **frame of discernment** `Θ`.
2. A **mass function** `m` assigns a value between 0 and 1 to each subset of `Θ`; the masses add up to 1, and `m(∅) = 0`. Mass given to the whole set `Θ` represents "don't know".
3. **Belief** `Bel(A)` is the sum of the masses of all subsets of A; it is a lower bound on the probability of A.
4. **Plausibility** `Pl(A) = 1 − Bel(¬A)` is the sum of the masses of all sets that intersect A; it is an upper bound on the probability of A.
5. The **belief interval** `[Bel(A), Pl(A)]` shows how uncertain the evidence about A is.
6. It does not require prior probabilities, and it is used to combine evidence from several independent sources (sensor fusion, fault diagnosis).

**Dempster's rule of combination** combines two independent mass functions `m₁` and `m₂`:

`m₁₂(A) = [Σ m₁(B) · m₂(C), over all B ∩ C = A] / (1 − K)`, for `A ≠ ∅`

`K = Σ m₁(B) · m₂(C)`, over all `B ∩ C = ∅`

where `K` measures the conflict between the two sources, and dividing by `1 − K` normalises the result.

**Example.** A machine fault is either in the pump (P) or the valve (V), so `Θ = {P, V}`. Sensor 1 gives `m₁({P}) = 0.6`, `m₁(Θ) = 0.4`. Sensor 2 gives `m₂({V}) = 0.5`, `m₂(Θ) = 0.5`.

| m₁ \ m₂ | {V} = 0.5 | Θ = 0.5 |
| --- | --- | --- |
| {P} = 0.6 | ∅ : 0.30 | {P} : 0.30 |
| Θ = 0.4 | {V} : 0.20 | Θ : 0.20 |

1. Conflict: `K = 0.30` (the intersection of {P} and {V} is empty).
2. `m₁₂({P}) = 0.30 / 0.70 ≈ 0.429`; `m₁₂({V}) = 0.20 / 0.70 ≈ 0.286`; `m₁₂(Θ) = 0.20 / 0.70 ≈ 0.286`.
3. `Bel({P}) ≈ 0.429` and `Pl({P}) = 1 − Bel({V}) ≈ 1 − 0.286 = 0.714`, so the belief interval for a pump fault is about [0.43, 0.71]. (Checked with a short program.)

### Fuzzy Logic and Uncertainty

Probability handles uncertainty about **whether** an event occurs. **Fuzzy logic** handles a different kind of uncertainty: the vagueness of concepts such as "warm" or "tall". A fuzzy set allows partial membership between 0 and 1; for example, 25 °C may belong to the set "warm" with degree 0.8, and 30 °C with degree 1. Fuzzy inference uses linguistic rules such as "if temperature is high and humidity is low, then increase cooling moderately", and is used in control systems.

## References {#references}

- TpointTech — [Probabilistic Reasoning in Artificial Intelligence](https://www.tpointtech.com/probabilistic-reasoning-in-artifical-intelligence), [Bayes' Theorem in Artificial Intelligence](https://www.tpointtech.com/bayes-theorem-in-artifical-intelligence), [Bayesian Belief Network in Artificial Intelligence](https://www.tpointtech.com/bayesian-belief-network-in-artificial-intelligence), [Uncertainty in Artificial Intelligence](https://www.tpointtech.com/uncertainty-in-artificial-intelligence), accessed 2026-11-06.
- GeeksforGeeks — [Bayes' Theorem in Artificial Intelligence](https://www.geeksforgeeks.org/artificial-intelligence/bayes-theorem-in-artificial-intelligence/), [Understanding Bayesian Networks](https://www.geeksforgeeks.org/artificial-intelligence/understanding-bayesian-networks-modeling-probabilistic-relationships-between-variables/), [Representing Knowledge in an Uncertain Domain in AI](https://www.geeksforgeeks.org/artificial-intelligence/representing-knowledge-in-an-uncertain-domain-in-ai/), accessed 2026-11-06.
- TutorialsPoint — [Machine Learning: Bayes Theorem](https://www.tutorialspoint.com/machine_learning/machine_learning_bayes_theorem.htm), accessed 2026-11-06. Its Artificial Intelligence tutorial has no page on probabilistic reasoning or Bayesian networks.
- Programiz has no page on probability or Bayes' theorem.
- Wikipedia — [Dempster–Shafer theory](https://en.wikipedia.org/wiki/Dempster%E2%80%93Shafer_theory), accessed 2026-11-06 (belief, plausibility and Dempster's rule; the reference websites mention the theory only briefly).

Issues found on the reference websites and how they were resolved:

1. TpointTech says that `P(A) = 0` "indicates total uncertainty in event A"; it means that A certainly does not occur. Probability 0.5 for a two-way choice, not 0, is the point of greatest uncertainty.
2. TpointTech writes the denominator of the general Bayes' rule as `P(B) = P(A)*P(B|Ai)`; the law of total probability needs a sum, `P(B) = Σ P(Aᵢ)·P(B | Aᵢ)`.
3. TpointTech says that a Bayesian network is also called a "decision network"; a decision network (influence diagram) is a Bayesian network extended with decision and utility nodes, so it is a different model. TpointTech's own page also calls the influence diagram a generalisation.
4. TpointTech says that if there is an arrow from node B to node A, "then Node A becomes the parent Node to B"; the node at the tail of the arrow (B) is the parent.
5. GeeksforGeeks's uncertainty page says that "belief networks extend Bayesian networks by allowing imprecise probabilities"; "belief network" is another name for a Bayesian network, as GeeksforGeeks's own Bayesian network page states. Imprecise (interval) probabilities belong to other models (credal networks, Dempster–Shafer theory).
6. All the worked calculations (the conditional-probability example, the three Bayes examples, the Bayesian network queries, the Markov chain and the Dempster–Shafer combination) were checked with short programs.
