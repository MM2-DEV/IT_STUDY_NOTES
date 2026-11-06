---
description: Data analysis and mining - data mining and the KDD process, data mining tasks and applications, data warehouse and OLAP vs data mining; decision trees with entropy, information gain and Gini index (ID3 worked example), pruning; Bayes' theorem and the naive Bayes classifier with worked examples; and randomized trees (random forest and extremely randomized trees).
updated: 2026-11-06
---

## Data Mining {#data-mining}

### Definition of Data Mining

Data mining is the **process of discovering useful, previously unknown patterns and knowledge from large amounts of data**.

It uses techniques from **statistics, machine learning and database systems** on data stored in databases, data warehouses and other repositories. It is also called **knowledge discovery in databases (KDD)**; strictly, data mining is the central step of the KDD process.

### KDD Process (Steps of Data Mining)

1. **Data cleaning** — remove noise and inconsistent data; fill missing values (for example, with the mean or the most probable value); remove duplicates.
2. **Data integration** — combine data from multiple sources (databases, files) into one store.
3. **Data selection** — retrieve the data relevant to the analysis task.
4. **Data transformation** — convert the data into forms suitable for mining by normalization, aggregation, discretization or dimensionality reduction.
5. **Data mining** — apply intelligent methods (classification, clustering, association analysis and so on) to extract patterns.
6. **Pattern evaluation** — identify the truly interesting patterns using measures of validity, novelty, usefulness and understandability.
7. **Knowledge presentation** — present the discovered knowledge to the user with visualization and reports.

The process is **iterative**: the results can lead back to earlier steps.

![The KDD process: databases → cleaning and integration → selection and transformation → data mining → pattern evaluation → knowledge presentation](/diagrams/dbms/kdd-process.svg)

### Data Mining Tasks

Data mining tasks are of two kinds:

1. **Descriptive tasks** — describe the general properties of the existing data:
   - **Class/concept description** — characterization (summarizing a class) and discrimination (comparing classes).
   - **Association rule mining** — finds items that occur together, for example "customers who buy bread also buy butter" (market basket analysis), measured by **support** and **confidence**; algorithms: **Apriori**, **FP-growth**.
   - **Clustering** — groups similar objects into clusters **without predefined class labels** (unsupervised); for example, k-means.
   - **Outlier analysis** — finds objects that do not follow the general behaviour (useful in fraud detection).
2. **Predictive tasks** — use existing data to predict unknown values:
   - **Classification** — assigns objects to **predefined classes** using a model learned from labelled training data (supervised), such as **decision trees, naive Bayes, neural networks, k-nearest neighbour**.
   - **Regression (prediction)** — predicts a **continuous numeric value**, such as a price or salary.
   - **Evolution (trend) analysis** — finds trends in data that change over time.

### Applications of Data Mining

1. **Market analysis** — customer profiling, market basket analysis, target marketing and cross-selling.
2. **Banking and finance** — loan and credit risk analysis, **fraud detection** (credit cards, telecom).
3. **Healthcare** — disease prediction and treatment effectiveness.
4. **Retail and e-commerce** — product recommendation and sales forecasting.
5. **Education, manufacturing, telecommunication and customer relationship management (CRM).**
6. **Science and engineering** — bioinformatics, astronomy and so on.

### Advantages of Data Mining

1. Discovers hidden patterns and trends automatically.
2. Supports better and faster decision making.
3. Helps predict future trends and behaviour.
4. Cost-effective compared with manual analysis.

### Disadvantages of Data Mining

1. **Privacy and security** concerns about personal data.
2. Results may be **inaccurate** if the data is incomplete or noisy.
3. Tools are complex, and choosing the right algorithm needs expertise.
4. Requires large data and computing resources.

### Data Warehouse vs Data Mining

A **data warehouse** is a **subject-oriented, integrated, time-variant and non-volatile collection of data** that supports management decision making; it stores historical data from many sources. **Data mining** analyses such data to find patterns.

| Basis | Data warehouse | Data mining |
| --- | --- | --- |
| Meaning | A store of integrated historical data | The process of finding patterns in data |
| Purpose | Store and organize data for analysis and reporting | Extract hidden knowledge |
| Done by | Database engineers | Analysts and business users with engineers |
| Output | Integrated data, reports | Patterns, rules, predictive models |

### OLAP vs Data Mining

**OLAP (online analytical processing)** lets users analyse multidimensional data interactively — summarizing, drilling down and slicing data cubes.

| Basis | OLAP | Data mining |
| --- | --- | --- |
| Approach | Query-driven: the user asks specific questions | Discovery-driven: the system finds patterns |
| Focus | Analysing past data | Predicting future behaviour |
| Direction | Top-down | Bottom-up |
| Dimensions | Limited number | Many |

## Decision Tree {#decision-tree}

### Definition of Decision Tree

A decision tree is a **tree-shaped classification (or regression) model** in which:

1. each **internal node** is a **test on an attribute**,
2. each **branch** is an **outcome of the test**,
3. each **leaf node** holds a **class label** (decision), and
4. the topmost node is the **root**.

To classify a new tuple, its attribute values are tested from the root down to a leaf, which gives the predicted class. A decision tree can be converted into **IF–THEN rules**.

### Decision Tree Induction Algorithms

1. **ID3 (Iterative Dichotomiser 3)** — by **J. R. Quinlan** (1986); uses **information gain** to choose attributes.
2. **C4.5** — Quinlan's successor to ID3; uses **gain ratio**, handles numeric attributes and missing values, and prunes trees.
3. **CART (Classification and Regression Trees)** — by Breiman et al. (1984); builds **binary trees** using the **Gini index**.

All use a **greedy, top-down, recursive divide-and-conquer** strategy:

1. Start with all training tuples at the root.
2. If all tuples belong to the same class, make the node a **leaf** with that class.
3. If no attributes are left, make a leaf with the **majority class**.
4. Otherwise choose the **best splitting attribute** by an **attribute selection measure**, create a branch for each outcome, partition the tuples, and **repeat** for each partition.

### Attribute Selection Measures

#### Entropy

Entropy measures the **impurity (uncertainty)** of a set of tuples D:

> **Entropy(D) = − Σ pᵢ log₂ pᵢ**

where pᵢ is the proportion of tuples in D belonging to class i (summed over all m classes). Entropy is **0** for a pure set (one class) and **1** for an equal two-class mix.

**Example:** a set with 3 tuples of class a and 5 of class b: Entropy = −(3/8) log₂(3/8) − (5/8) log₂(5/8) = **0.954** bits.

#### Information Gain

Information gain is the **reduction in entropy** obtained by splitting D on attribute A:

> **Gain(D, A) = Entropy(D) − Σ (|Dᵥ| ÷ |D|) × Entropy(Dᵥ)**

where Dᵥ is the subset of tuples having value v of A. ID3 chooses the attribute with the **highest information gain**.

#### Gain Ratio

Information gain favours attributes with many values; C4.5 normalizes it:

> **GainRatio(A) = Gain(A) ÷ SplitInfo(A), where SplitInfo(A) = − Σ (|Dᵥ| ÷ |D|) log₂ (|Dᵥ| ÷ |D|)**

#### Gini Index

CART measures impurity with the Gini index:

> **Gini(D) = 1 − Σ pᵢ²**

Gini is 0 for a pure set and 0.5 for an equal two-class mix; the split with the **lowest** weighted Gini is chosen.

### Worked Example: ID3 on the Play-Tennis Data

The training set has 14 days, with attributes Outlook, Temperature, Humidity and Wind, and class Play (9 Yes, 5 No):

| Day | Outlook | Temperature | Humidity | Wind | Play |
| --- | --- | --- | --- | --- | --- |
| 1 | Sunny | Hot | High | Weak | No |
| 2 | Sunny | Hot | High | Strong | No |
| 3 | Overcast | Hot | High | Weak | Yes |
| 4 | Rain | Mild | High | Weak | Yes |
| 5 | Rain | Cool | Normal | Weak | Yes |
| 6 | Rain | Cool | Normal | Strong | No |
| 7 | Overcast | Cool | Normal | Strong | Yes |
| 8 | Sunny | Mild | High | Weak | No |
| 9 | Sunny | Cool | Normal | Weak | Yes |
| 10 | Rain | Mild | Normal | Weak | Yes |
| 11 | Sunny | Mild | Normal | Strong | Yes |
| 12 | Overcast | Mild | High | Strong | Yes |
| 13 | Overcast | Hot | Normal | Weak | Yes |
| 14 | Rain | Mild | High | Strong | No |

1. **Entropy of the whole set:** Entropy(D) = −(9/14) log₂(9/14) − (5/14) log₂(5/14) = **0.940**.
2. **Gain(Outlook):** Sunny has 5 days (2 Yes, 3 No; entropy 0.971), Overcast 4 days (4 Yes; entropy 0), Rain 5 days (3 Yes, 2 No; entropy 0.971):
   Gain = 0.940 − (5/14)(0.971) − (4/14)(0) − (5/14)(0.971) = **0.247**.
3. **Gain(Humidity):** High 7 days (3 Yes, 4 No; 0.985), Normal 7 days (6 Yes, 1 No; 0.592): Gain = 0.940 − 0.5(0.985) − 0.5(0.592) = **0.152**.
4. **Gain(Wind):** Weak 8 days (6 Yes, 2 No; 0.811), Strong 6 days (3 Yes, 3 No; 1.0): Gain = **0.048**.
5. **Gain(Temperature)** = **0.029**.
6. **Outlook** has the highest gain, so it becomes the **root**. The Overcast branch is pure → leaf **Yes**.
7. For the **Sunny** subset, Humidity gives the highest gain (0.971; Temperature 0.571, Wind 0.020) → split on **Humidity** (High → No, Normal → Yes).
8. For the **Rain** subset, Wind gives the highest gain (0.971) → split on **Wind** (Strong → No, Weak → Yes).

![Decision tree from ID3: Outlook at the root; Sunny → Humidity (High: No, Normal: Yes); Overcast → Yes; Rain → Wind (Strong: No, Weak: Yes)](/diagrams/dbms/decision-tree-tennis.svg)

Rule form: IF Outlook = Sunny AND Humidity = High THEN Play = No; IF Outlook = Overcast THEN Play = Yes; and so on.

### Overfitting and Tree Pruning

A tree that grows until it fits every training tuple may **overfit** — it learns noise and outliers and performs poorly on new data. **Pruning** removes the least reliable branches:

1. **Pre-pruning** — stops growing the tree early, when a split does not improve a measure (such as information gain) beyond a threshold.
2. **Post-pruning** — grows the full tree and then removes subtrees, replacing them with leaves (for example, **cost-complexity pruning**, which considers the number of leaves and the error rate).

### Advantages of Decision Trees

1. Easy to understand and interpret; can be converted to rules.
2. Need little data preparation (no scaling or normalization).
3. Handle both categorical and numeric data.
4. Fast to build and to classify.

### Disadvantages of Decision Trees

1. Tend to **overfit** without pruning.
2. **Unstable** — a small change in the data can produce a very different tree.
3. Greedy splitting may not find the best overall tree.
4. Biased toward attributes with many values (with information gain).

## Bayes Theory {#bayes-theory}

### Bayes' Theorem

Bayes' theorem is a formula that gives the **probability of a hypothesis H given the observed evidence X**, using the probability of the evidence given the hypothesis.

It is written as:

> **P(H | X) = P(X | H) × P(H) ÷ P(X)**

Here:

1. **P(H | X)** — **posterior probability**: the probability of H after seeing X.
2. **P(H)** — **prior probability**: the probability of H before seeing X.
3. **P(X | H)** — **likelihood**: the probability of observing X if H is true.
4. **P(X)** — **evidence** (marginal probability of X), calculated by the **law of total probability**: P(X) = Σ P(X | Hᵢ) × P(Hᵢ) over all hypotheses.

### Worked Example: Medical Test

A disease affects **1%** of people. A test detects it in **99%** of sick people (true positive) but also gives a positive result for **5%** of healthy people (false positive). What is the probability that a person who tests positive actually has the disease?

1. P(D) = 0.01, P(¬D) = 0.99, P(+ | D) = 0.99, P(+ | ¬D) = 0.05.
2. P(+) = 0.99 × 0.01 + 0.05 × 0.99 = 0.0099 + 0.0495 = **0.0594**.
3. P(D | +) = 0.0099 ÷ 0.0594 = **0.167** — only about **16.7%**, because the disease is rare.

### Naive Bayes Classifier

The naive Bayes classifier predicts the class C of a tuple X = (x₁, x₂, …, xₙ) by choosing the class with the **highest posterior probability** P(C | X). Since P(X) is the same for all classes, it compares P(X | C) × P(C), and it makes the **"naive" assumption that the attributes are conditionally independent** given the class:

> **P(X | C) = P(x₁ | C) × P(x₂ | C) × … × P(xₙ | C)**

> **Predicted class = the C that maximizes P(C) × Π P(xᵢ | C)**

**Types:** **Gaussian** naive Bayes (continuous attributes, normal distribution), **multinomial** (counts, such as word frequencies in text) and **Bernoulli** (binary attributes).

### Worked Example: Naive Bayes

Using the play-tennis table above, classify the new day **X = (Outlook = Sunny, Temperature = Cool, Humidity = High, Wind = Strong)**.

1. **Priors:** P(Yes) = 9/14, P(No) = 5/14.
2. **Likelihoods** (counted in the table):
   - Yes: P(Sunny | Yes) = 2/9, P(Cool | Yes) = 3/9, P(High | Yes) = 3/9, P(Strong | Yes) = 3/9.
   - No: P(Sunny | No) = 3/5, P(Cool | No) = 1/5, P(High | No) = 4/5, P(Strong | No) = 3/5.
3. **Yes:** (9/14) × (2/9) × (3/9) × (3/9) × (3/9) = **0.0053**.
4. **No:** (5/14) × (3/5) × (1/5) × (4/5) × (3/5) = **0.0206**.
5. Since 0.0206 > 0.0053, the prediction is **Play = No** (normalized: No ≈ 0.795, Yes ≈ 0.205).

If some attribute value never occurs with a class, its probability is 0 and makes the whole product 0; the **Laplace correction** (adding 1 to every count) avoids this.

### Advantages and Disadvantages of Naive Bayes

1. **Advantages:** simple, fast, works well with many attributes and small training sets; widely used for **spam filtering** and text classification.
2. **Disadvantages:** the independence assumption is often false in practice; zero probabilities need smoothing.

## Randomized Trees {#randomized-trees}

### Definition of Randomized Trees

Randomized trees are **ensemble methods that build many decision trees with randomness and combine their predictions**.

The randomness is in the training samples, in the attributes considered at each split, or in the split thresholds. Because the individual trees differ, their errors partly cancel, giving more accurate and stable predictions than a single tree and **reducing overfitting**. The two main methods are **random forest** and **extremely randomized trees (Extra-Trees)**.

### Random Forest

A random forest (Leo **Breiman**, 2001) is an ensemble of decision trees built as follows:

1. **Bootstrap sampling (bagging):** for each tree, draw a random sample of the training tuples **with replacement**, of the same size as the training set.
2. **Random feature selection:** at each node, choose the best split from only a **random subset of the attributes** (for example, √n of n attributes).
3. **Grow** each tree fully (usually without pruning).
4. **Combine:** for classification, the forest predicts the class with the **majority vote** of the trees; for regression, the **average** of their predictions.

The tuples not included in a tree's bootstrap sample (**out-of-bag** samples) can be used to estimate its accuracy, and the forest also gives a measure of **feature importance**.

### Extremely Randomized Trees (Extra-Trees)

Extremely randomized trees (P. Geurts, D. Ernst and L. Wehenkel, 2006) add even more randomness:

1. Each tree is usually built on the **whole training set** (no bootstrap sampling).
2. At each node, for each randomly chosen attribute, a **split threshold is chosen at random**, and the best of these random splits is used.

This makes training **faster** and further reduces variance, at the cost of slightly more bias.

### Random Forest vs Extra-Trees

| Basis | Random forest | Extremely randomized trees |
| --- | --- | --- |
| Training data per tree | Bootstrap sample | Whole training set |
| Split threshold | Best threshold for each candidate attribute | Random threshold |
| Randomness | Samples and attributes | Attributes and thresholds |
| Training speed | Slower | Faster |

### Advantages of Randomized Trees

1. **High accuracy** and robustness; less overfitting than a single tree.
2. Work with large data and many attributes; no scaling needed.
3. Give feature-importance measures.

### Disadvantages of Randomized Trees

1. Many trees need more memory and computation.
2. Harder to interpret than a single decision tree.

## References {#references}

**TutorialsPoint**

- [Data Mining – Overview](https://www.tutorialspoint.com/data_mining/dm_overview.htm) and [Data Mining – Tasks](https://www.tutorialspoint.com/data_mining/dm_tasks.htm) — accessed 2026-11-06 (definition, KDD steps, descriptive and predictive tasks, applications)
- [Decision Tree Induction](https://www.tutorialspoint.com/data_mining/dm_dti.htm) — accessed 2026-11-06 (structure, ID3 and C4.5, the induction algorithm, pre- and post-pruning)
- [Bayesian Classification](https://www.tutorialspoint.com/data_mining/dm_bayesian_classification.htm) — accessed 2026-11-06 (Bayes' theorem, prior and posterior probability)

**GeeksforGeeks**

- [Data Mining](https://www.geeksforgeeks.org/dbms/data-mining/) and [KDD Process](https://www.geeksforgeeks.org/dbms/kdd-process-in-data-mining/) — accessed 2026-11-06
- [Decision Tree](https://www.geeksforgeeks.org/machine-learning/decision-tree/) — accessed 2026-11-06 (structure, entropy with the 3a/5b example, information gain, Gini index)
- [Bayes' Theorem](https://www.geeksforgeeks.org/maths/bayes-theorem/) and [Naive Bayes Classifiers](https://www.geeksforgeeks.org/machine-learning/naive-bayes-classifiers/) — accessed 2026-11-06 (formula, terms, independence assumption, types). In its golf example the factor for Temperature = Hot is given as 2/9 for Yes and 2/5 for No, but its own table has Hot in 3 of the 9 Yes rows and 1 of the 5 No rows; the prediction (Yes) does not change.
- [Random Forest Algorithm](https://www.geeksforgeeks.org/machine-learning/random-forest-algorithm-in-machine-learning/) — accessed 2026-11-06 (random samples and feature subsets, voting and averaging, advantages and limitations)

**TpointTech**

- [Data Mining](https://www.tpointtech.com/data-mining) and [KDD Process](https://www.tpointtech.com/kdd-process-in-data-mining) — accessed 2026-11-06 (advantages, disadvantages, applications)
- [Decision Tree Induction](https://www.tpointtech.com/decision-tree-induction) and [Bayesian Classifiers](https://www.tpointtech.com/data-mining-bayesian-classifiers) — accessed 2026-11-06. Its factory expected-value example gives the "not expand" value as $3M; (0.6 × 4 + 0.4 × 2) − 0 = $3.2M (the decision does not change).
- [Data Mining vs OLAP](https://www.tpointtech.com/data-mining-vs-olap) and [Data Mining vs Data Warehousing](https://www.tpointtech.com/data-mining-cluster-vs-data-warehousing) — accessed 2026-11-06 (comparison tables)

**IT Job QnS**

- IT Job QnS has no page on data mining (checked 2026-11-06).

**Programiz**

- Programiz has no page on data mining (checked 2026-11-06).

**Additional sources** (for the topics the reference websites do not cover)

- J. R. Quinlan, "Induction of Decision Trees", *Machine Learning*, 1(1), 1986 — ID3 and the play-tennis data used above; information gain values were calculated with a script
- L. Breiman, "Random Forests", *Machine Learning*, 45(1), 2001
- P. Geurts, D. Ernst and L. Wehenkel, "Extremely Randomized Trees", *Machine Learning*, 63(1), 2006
- The syllabus says "Randomize tree"; it is taken here to mean randomized-tree ensembles (random forest and extremely randomized trees) — see note N8 in TOPICS.md.
