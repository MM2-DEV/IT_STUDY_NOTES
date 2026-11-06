---
description: Uninformed and informed search strategies, heuristics, A*, hill climbing, matching in rule-based systems, and game playing with minimax and alpha-beta pruning.
updated: 2026-11-06
---

## Search Strategies {#search-strategies}

### Definition of Search

**Search** is a step-by-step procedure that finds a sequence of actions leading from an initial state to a goal state in a given search space.

Searching is the universal problem-solving technique of AI. Problem-solving agents (goal-based agents) use search algorithms to decide what to do. Examples of search problems are the 8-puzzle and 15-puzzle, route finding, the travelling salesman problem, the Rubik's cube and theorem proving.

### Components of a Search Problem

A search problem is defined by six components:

1. **State space (search space):** the set of all states that can be reached, together with the operators that change one state into another.
2. **Initial state (start state):** the state in which the agent begins.
3. **Actions (operators):** the moves that can be applied in a state.
4. **Transition model:** the state that results from applying an action to a state.
5. **Goal test:** a function that checks whether a state is a goal state.
6. **Path cost:** a numeric cost of a path, usually the sum of the step costs.

A **solution** is a sequence of actions from the initial state to a goal state; an **optimal solution** has the lowest path cost of all solutions.

### Search Terminology

1. **Search tree:** a tree representation of the search problem; the root is the initial state.
2. **Problem instance:** the initial state together with the goal state.
3. **Branching factor (b):** the (average or maximum) number of children of a node.
4. **Depth (d):** the depth of the shallowest goal node, that is, the length of the shortest path from the initial state to a goal.
5. **Maximum depth (m):** the length of the longest path in the state space.
6. **Frontier (open list, fringe):** the generated nodes that are waiting to be expanded.
7. **Closed list (explored set):** the nodes that have already been expanded.
8. **Admissibility:** the property of an algorithm that it always finds an optimal solution.

### Properties of Search Algorithms

Search algorithms are compared by four properties:

1. **Completeness:** an algorithm is complete if it is guaranteed to find a solution whenever one exists.
2. **Optimality:** an algorithm is optimal if the solution it finds is guaranteed to have the lowest path cost.
3. **Time complexity:** the number of nodes generated (time taken) to find a solution.
4. **Space complexity:** the maximum number of nodes stored in memory at any time during the search.

### Types of Search Strategies

There are two main types of search strategies:

1. **Uninformed (blind) search**
2. **Informed (heuristic) search**

![Classification of search strategies](/diagrams/artificial-intelligence/search-strategies.svg)

Local search algorithms (hill climbing, simulated annealing, local beam search) keep only the current state and move to a neighbouring state using an objective function. TpointTech places them under informed search; TutorialsPoint lists them as a separate group, "local search algorithms".

### Uninformed Search

**Uninformed search** (blind search) is a search strategy that uses no information about the problem other than its definition: it does not know how close a state is to the goal and can only generate successors and distinguish goal states from non-goal states.

It is also called **brute-force search**. There are six uninformed search algorithms:

1. Breadth-first search (BFS)
2. Depth-first search (DFS)
3. Depth-limited search (DLS)
4. Iterative deepening depth-first search (IDDFS)
5. Uniform-cost search (UCS)
6. Bidirectional search

#### 1. Breadth-First Search

**Breadth-first search (BFS)** is an uninformed search that starts at the root and expands all nodes at the current depth level before moving to the nodes at the next level.

1. It uses a **FIFO queue** for the frontier.
2. If there are several solutions, it finds the one with the fewest steps (the shallowest goal).
3. **Advantages:** it always finds a solution if one exists; it finds the shallowest solution.
4. **Disadvantages:** it needs a lot of memory, because every level must be stored to generate the next one; it takes a long time if the goal is far from the root.

The algorithm, an example and programs are given in [Breadth-First Search (BFS)](/topics/data-structures-algorithms/graphs-and-graph-traversal#breadth-first-search-bfs).

**Number of nodes.** With branching factor `b`, the root has `b` children, each of them has `b` children, and so on. The number of nodes up to depth `d` is:

`1 + b + b² + b³ + … + b^d = O(b^d)`

Example: with `b = 10` and `d = 5`, BFS may generate `1 + 10 + 100 + 1,000 + 10,000 + 100,000 = 111,111` nodes, and it must keep the whole last level (100,000 nodes) in memory.

#### 2. Depth-First Search

**Depth-first search (DFS)** is an uninformed search that always expands the deepest node in the frontier, following one path down to its deepest node before backtracking to try the next path.

1. It uses a **LIFO stack** (or recursion) for the frontier.
2. It stores only the nodes on the current path and their unexpanded siblings, so its memory is linear: `O(b·m)`.
3. **Advantages:** very little memory; it can reach a goal quickly if it happens to follow the right path.
4. **Disadvantages:** it may go down an infinite path (or loop in a graph with cycles) and never return; it does not guarantee the shortest or cheapest solution.

The algorithm and programs are given in [Depth-First Search (DFS)](/topics/data-structures-algorithms/graphs-and-graph-traversal#depth-first-search-dfs).

#### 3. Depth-Limited Search

**Depth-limited search (DLS)** is depth-first search with a predetermined depth limit `ℓ`: nodes at depth `ℓ` are treated as if they have no successors.

1. It removes DFS's problem of infinite paths.
2. It can fail in two ways: **standard failure** (the problem has no solution) and **cutoff failure** (there is no solution within the depth limit).
3. **Advantages:** it uses little memory, like DFS.
4. **Disadvantages:** it is incomplete if the shallowest goal is deeper than `ℓ` (`ℓ < d`), and it is not optimal.
5. Time `O(b^ℓ)`, space `O(b·ℓ)`.

#### 4. Iterative Deepening Depth-First Search

**Iterative deepening depth-first search (IDDFS)** is a search that runs depth-limited search repeatedly with depth limits 0, 1, 2, … until a goal is found.

It combines the memory efficiency of DFS with the completeness of BFS. Steps:

1. Set the depth limit to 0.
2. Perform depth-limited search to the depth limit.
3. If a goal is found, return it.
4. Otherwise, increase the depth limit by 1 and repeat from step 2.

For a tree with root A, children B and C, grandchildren D, E (under B) and F, G (under C), the iterations visit:

1. Limit 0: A
2. Limit 1: A, B, C
3. Limit 2: A, B, D, E, C, F, G

**Repeated work.** The upper levels are generated again in every iteration, but this costs little, because most nodes are in the bottom level. Nodes at depth 1 are generated `d` times, nodes at depth 2 are generated `d − 1` times, and so on:

`N(IDDFS) = d·b + (d − 1)·b² + … + 1·b^d`, while `N(BFS) = b + b² + … + b^d`

Example with `b = 10`, `d = 5`:

1. `N(IDDFS) = 5×10 + 4×100 + 3×1,000 + 2×10,000 + 1×100,000 = 50 + 400 + 3,000 + 20,000 + 100,000 = 123,450`
2. `N(BFS) = 10 + 100 + 1,000 + 10,000 + 100,000 = 111,110`

IDDFS generates only about 11% more nodes than BFS, but needs memory `O(b·d)` instead of `O(b^d)`. It is the preferred uninformed method when the search space is large and the depth of the solution is unknown.

#### 5. Uniform-Cost Search

**Uniform-cost search (UCS)** is an uninformed search that always expands the node with the lowest path cost `g(n)` from the root, so it finds the cheapest path when step costs differ.

1. It uses a **priority queue** ordered by `g(n)`.
2. It is equivalent to BFS when every step has the same cost.
3. It is optimal and complete if every step cost is at least some positive constant `ε`.
4. **Disadvantages:** it ignores the number of steps, so it may explore many long paths of cheap steps; it stores the whole frontier.

**Complexity.** Let `C*` be the cost of the optimal solution and `ε` the smallest step cost. The search can go `⌊C*/ε⌋` steps deep and one more level, so time and space are `O(b^(1 + ⌊C*/ε⌋))`.

Example: `C* = 8`, `ε = 1`, `b = 3`: `⌊8/1⌋ + 1 = 9`, so the bound is `3⁹ = 19,683` nodes.

#### 6. Bidirectional Search

**Bidirectional search** is a search that runs two simultaneous searches, one forward from the initial state and one backward from the goal, and stops when the two searches meet.

1. The solution is the forward path joined to the reverse of the backward path.
2. Each search needs to go only half the depth, so time and space are `O(b^(d/2))`.
3. **Advantages:** much faster and needs less memory than a single search.
4. **Disadvantages:** the goal state must be known in advance and the actions must be reversible; implementation is harder, because each new node must be checked against the other search.

Example: with `b = 10` and `d = 6`, BFS from the start generates about `1 + 10 + … + 10⁶ = 1,111,111` nodes, while two searches of depth 3 generate about `2 × (1 + 10 + 100 + 1,000) = 2,222` nodes.

#### Comparison of Uninformed Search Algorithms

| Criterion | BFS | DFS | DLS | IDDFS | UCS | Bidirectional |
| --- | --- | --- | --- | --- | --- | --- |
| Data structure | FIFO queue | LIFO stack | LIFO stack | LIFO stack | Priority queue | Two queues |
| Complete | Yes (finite `b`) | No (yes in finite spaces) | No (yes if `ℓ ≥ d`) | Yes (finite `b`) | Yes (step cost ≥ ε) | Yes (BFS both ways) |
| Optimal | Yes, if all step costs are equal | No | No | Yes, if all step costs are equal | Yes | Yes, if all step costs are equal |
| Time | `O(b^d)` | `O(b^m)` | `O(b^ℓ)` | `O(b^d)` | `O(b^(1+⌊C*/ε⌋))` | `O(b^(d/2))` |
| Space | `O(b^d)` | `O(b·m)` | `O(b·ℓ)` | `O(b·d)` | `O(b^(1+⌊C*/ε⌋))` | `O(b^(d/2))` |

Here `b` is the branching factor, `d` the depth of the shallowest solution, `m` the maximum depth, `ℓ` the depth limit, `C*` the optimal cost and `ε` the smallest step cost.

### Informed Search

**Informed search** (heuristic search) is a search strategy that uses problem-specific knowledge, in the form of a heuristic function, to decide which node to expand next.

It expands the most promising nodes first, so it usually finds a solution much faster than uninformed search.

#### Heuristic Function

**A heuristic function** is a function, written `h(n)`, that estimates the cost of the cheapest path from node `n` to a goal; `h(goal) = 0`.

An informed search chooses nodes with an **evaluation function** `f(n)`, built from:

1. `g(n)`: the actual cost of the path from the start node to `n`.
2. `h(n)`: the estimated cost from `n` to the goal.

Two properties of heuristics are important:

1. **Admissible heuristic:** `h(n)` never overestimates the true cost to the goal, that is, `h(n) ≤ h*(n)` for every node, where `h*(n)` is the true cost.
2. **Consistent (monotone) heuristic:** for every node `n` and successor `n'` reached with step cost `c(n, n')`, `h(n) ≤ c(n, n') + h(n')`. Every consistent heuristic is admissible.

**Example: heuristics for the 8-puzzle.** Two standard heuristics are:

1. `h1` = the number of misplaced tiles (the blank is not counted).
2. `h2` = the sum of the **Manhattan distances** of the tiles from their goal positions (horizontal moves + vertical moves).

Current state and goal state (`_` is the blank):

| Current | | | | Goal | | |
| --- | --- | --- | --- | --- | --- | --- |
| 8 | 1 | 3 | | 1 | 2 | 3 |
| 4 | _ | 2 | | 4 | 5 | 6 |
| 7 | 6 | 5 | | 7 | 8 | _ |

1. Misplaced tiles: 8, 1, 2, 6 and 5, so `h1 = 5`.
2. Manhattan distances: tile 8 = 2 + 1 = 3; tile 1 = 1; tile 2 = 1 + 1 = 2; tile 6 = 1 + 1 = 2; tile 5 = 1 + 1 = 2; tiles 3, 4, 7 = 0. So `h2 = 3 + 1 + 2 + 2 + 2 = 10`.

Both heuristics are admissible, because each misplaced tile needs at least one move (h1) and at least its Manhattan distance in moves (h2). Since `h2 ≥ h1` for every state, `h2` **dominates** `h1` and leads to fewer nodes being expanded.

#### Greedy Best-First Search

**Greedy best-first search** is an informed search that always expands the node that appears closest to the goal, using only the heuristic: `f(n) = h(n)`.

1. It uses a priority queue ordered by `h(n)`.
2. **Advantages:** it is often fast with a good heuristic; it is simple to implement.
3. **Disadvantages:** it ignores the cost already paid (`g(n)`), so it is **not optimal**; the tree-search version is **not complete**, because it can get stuck in loops.
4. Worst-case time and space: `O(b^m)`.

#### A* Search

**A\* search** is an informed search that expands the node with the lowest value of `f(n) = g(n) + h(n)`, the estimated cost of the cheapest solution through `n`.

where:

1. `g(n)` = actual cost from the start node to `n`.
2. `h(n)` = estimated cost from `n` to the goal.
3. `f(n)` = estimated total cost of the cheapest path through `n`.

A* is the best-known form of best-first search. It combines uniform-cost search (which uses `g(n)`) and greedy best-first search (which uses `h(n)`). Steps:

1. Put the start node in the open list (a priority queue) with `f = h(start)`.
2. Remove the node with the lowest `f` from the open list. If it is the goal, return the path.
3. Move it to the closed list, and generate its successors. For each successor, compute `g`, `h` and `f`; add it to the open list, or update it if the new path is cheaper.
4. Repeat from step 2; if the open list becomes empty, return failure.

**Properties:**

1. **Optimal** if `h(n)` is admissible (tree search) or consistent (graph search).
2. **Complete** if the branching factor is finite and every step cost is at least `ε > 0`.
3. Time and space are exponential in the worst case; A* keeps all generated nodes in memory, which is its main disadvantage.

#### Worked Example: UCS, Greedy Best-First Search and A*

Find a path from S to G in the graph below. Edge labels are step costs; `h` is the heuristic (it is admissible and consistent).

![Example search graph with step costs and heuristic values](/diagrams/artificial-intelligence/search-example-graph.svg)

| Node | S | A | B | C | D | G |
| --- | --- | --- | --- | --- | --- | --- |
| `h(n)` | 7 | 6 | 4 | 2 | 5 | 0 |

**Greedy best-first search** (`f = h`):

| Step | Expand | Open list after expansion (h) |
| --- | --- | --- |
| 1 | S | B(4), A(6) |
| 2 | B (h = 4) | C(2), A(6) |
| 3 | C (h = 2) | G(0), A(6) |
| 4 | G (h = 0) | goal reached |

Path: S → B → C → G, cost 4 + 2 + 3 = **9**. This is not the cheapest path.

**A\* search** (`f = g + h`):

| Step | Expand (g, f) | Open list after expansion: node (g + h = f) |
| --- | --- | --- |
| 1 | S (0, 7) | A(1 + 6 = 7), B(4 + 4 = 8) |
| 2 | A (1, 7) | B(3 + 4 = 7, cheaper path via A), C(6 + 2 = 8), D(4 + 5 = 9) |
| 3 | B (3, 7) | C(5 + 2 = 7, cheaper path via B), D(9) |
| 4 | C (5, 7) | G(8 + 0 = 8), D(9) |
| 5 | G (8, 8) | goal reached |

Path: S → A → B → C → G, cost 1 + 2 + 2 + 3 = **8**, the optimal cost.

**Uniform-cost search** (`f = g`) expands S(0), A(1), B(3), D(4), C(5) and G(8), and also finds the cost-8 path, but it expands D, which A* does not. For comparison, BFS finds S → A → C → G (fewest edges, cost 9). These results were checked with a short program.

#### Hill Climbing

**Hill climbing** is a local search algorithm that starts from a state and repeatedly moves to a neighbouring state with a better value of the objective function, stopping when no neighbour is better (a peak).

1. It is also called **greedy local search**, because it looks only at its immediate neighbours.
2. It keeps only the current state and its value; it does not keep a search tree.
3. It is used for optimisation problems, such as the travelling salesman problem (minimising distance).
4. It is neither complete nor optimal.

**State-space landscape.** The landscape plots the states (x-axis) against the objective function (y-axis). With an objective function, the goal is the global maximum; with a cost function, the goal is the global minimum.

![State-space landscape for hill climbing](/diagrams/artificial-intelligence/hill-climbing-landscape.svg)

1. **Global maximum:** the best state of the whole landscape.
2. **Local maximum:** a state better than all its neighbours, but worse than some other state.
3. **Flat local maximum:** a flat area where all neighbours have the same value.
4. **Shoulder:** a plateau that has an uphill edge.
5. **Current state:** the state the algorithm is in now.

**Types of hill climbing.** There are three types:

1. **Simple hill climbing:** examines neighbours one at a time and moves to the **first** neighbour that is better than the current state. It is fast but may give a less optimal solution.
2. **Steepest-ascent hill climbing:** examines **all** neighbours and moves to the **best** one (the one closest to the goal). It takes more time per step.
3. **Stochastic hill climbing:** selects a neighbour **at random** and decides whether to move to it, depending on how much it improves the state.

Simple hill climbing algorithm:

1. Evaluate the initial state. If it is a goal, return success and stop.
2. Loop until a solution is found or no operator is left to apply:
   1. Select and apply an operator to the current state to produce a new state.
   2. If the new state is a goal, return success and stop.
   3. Else, if it is better than the current state, make it the current state.
   4. Else, continue the loop.
3. Exit.

**Problems of hill climbing.** There are three problems:

1. **Local maximum:** the algorithm stops at a peak that is not the highest. *Solution:* backtracking; keep a list of promising paths and try another.
2. **Plateau:** a flat area where all neighbours have the same value, so there is no direction to move. *Solution:* take a big jump (or many small steps) to a far state, or select a random state.
3. **Ridge:** a higher area with a slope that cannot be climbed in a single move, because every single move goes downhill. *Solution:* move in several directions at once, or use bidirectional search.

#### Simulated Annealing

**Simulated annealing** is a local search algorithm that picks a random move and always accepts it if it improves the state, but also accepts a worse move with a probability that decreases as a "temperature" parameter is lowered.

The name comes from **annealing** in metallurgy: a metal is heated to a high temperature and cooled gradually so that it reaches a low-energy crystalline state. Accepting some downhill moves lets the search escape local maxima.

Probability of accepting a worse move:

`P = e^(−ΔE / T)`

where:

1. `ΔE` = how much worse the new state is (a positive number).
2. `T` = the current temperature; it starts high and is reduced slowly by a schedule.
3. `e` = the base of the natural logarithm (≈ 2.718).

Example: a move that is worse by `ΔE = 2`:

1. At `T = 10`: `P = e^(−2/10) = e^(−0.2) ≈ 0.819` (accepted about 82% of the time).
2. At `T = 5`: `P = e^(−0.4) ≈ 0.670`.
3. At `T = 1`: `P = e^(−2) ≈ 0.135`.

So bad moves are common at the start and rare at the end. If `T` is lowered slowly enough, simulated annealing finds a global optimum with probability approaching 1.

#### Local Beam Search

**Local beam search** is a local search algorithm that keeps `k` states instead of one: it generates all successors of the `k` states and keeps the best `k` of them for the next step, stopping when a goal is found.

1. The `k` initial states are generated randomly; `k` is called the **beam width**.
2. It is not optimal; if the beam width is too small, the best solution may be discarded.

### Informed vs Uninformed Search

| Point | Uninformed (blind) search | Informed (heuristic) search |
| --- | --- | --- |
| Knowledge used | Only the problem definition | Problem definition plus a heuristic |
| Evaluation function | Not used | Used (`h(n)` or `f(n) = g(n) + h(n)`) |
| Search direction | Systematic, without guidance | Towards the most promising nodes |
| Efficiency and speed | Less efficient; slower in large spaces | More efficient; faster |
| Cost of computation | Higher | Lower |
| Optimality | Some are optimal (BFS, UCS, IDDFS under conditions) | Optimal with an admissible heuristic (A*); greedy is not |
| Implementation | Simpler | Needs a good heuristic, which can be hard to design |
| Suitable for | Small or simple problems | Large, complex problems |
| Examples | BFS, DFS, DLS, IDDFS, UCS, bidirectional search | Greedy best-first search, A*, hill climbing |

## Matching Techniques {#matching-techniques}

### Definition of Matching

**Matching** is the process of comparing the condition (left-hand side) of a rule with the current state description (the facts in working memory) to decide whether the rule applies, and with which variable bindings.

Matching is used in rule-based systems, also called **production systems**, in which knowledge is stored as `IF condition THEN action` rules. A rule whose condition matches the facts is said to be **triggered**; a rule whose action is executed is said to **fire**.

### The Match–Resolve–Act Cycle

The inference engine of a rule-based system repeats three steps:

![The match–resolve–act cycle of a rule-based system](/diagrams/artificial-intelligence/match-resolve-act.svg)

1. **Match:** compare the conditions of all rules with the facts in working memory. The set of rules whose conditions are satisfied is called the **conflict set**.
2. **Conflict resolution:** choose one rule (or a few) from the conflict set.
3. **Act:** execute the chosen rule's action, which adds or deletes facts in working memory.

The cycle stops when no rule matches, when a "halt" action is executed, or when the goal is reached. Matching is usually the most expensive step of the cycle, so efficient matching techniques are needed.

### Types of Matching Techniques

There are four matching techniques:

1. Indexing
2. Matching with variables
3. Complex and approximate matching
4. Conflict resolution

#### 1. Indexing

**Indexing** is a matching technique in which the current state is used as an index into the rules, so that only the rules that can possibly match are retrieved, instead of comparing every rule with the state.

1. A naive system checks each rule against the facts one by one, which is far too slow for large rule bases.
2. With indexing, the rules are stored under a key (for example, the predicate names that appear in their conditions). For a fact `Bird(Tweety)`, only the rules stored under `Bird` are examined.
3. In a game program, a board position can be converted to a number and used directly as the index of the rules (moves) that apply to it.
4. **Limitation:** simple indexing works only when the rule conditions are written in a fixed form that matches the state exactly; it does not handle variables or general patterns well.

#### 2. Matching with Variables

**Matching with variables** is a matching technique in which the rule conditions contain variables, so a match must find bindings (substitutions) for the variables that make the conditions identical to facts in working memory.

1. For a single pattern and a single fact, the bindings are found by **unification**, explained in [First-Order Logic](/topics/artificial-intelligence/first-order-logic). For example, the condition `Bird(x)` matches the fact `Bird(Tweety)` with the binding `{x/Tweety}`.
2. A real system has the **many–many match problem**: many rules must be matched against many facts in every cycle, and the same variable must have the same value in all conditions of a rule.
3. Example: the rule `IF Parent(x, y) AND Parent(y, z) THEN Grandparent(x, z)` with the facts `Parent(Rahim, Karim)` and `Parent(Karim, Sami)` matches with `{x/Rahim, y/Karim, z/Sami}`, because `y` is Karim in both conditions. It adds `Grandparent(Rahim, Sami)`.
4. **Rete algorithm:** an efficient algorithm for the many–many match problem, designed by Charles L. Forgy of Carnegie Mellon University (first published in a working paper in 1974, a Ph.D. thesis in 1979 and a paper in 1982). It compiles the rule conditions into a network of nodes. Each node remembers the facts that satisfied its pattern, so when facts change, only the changes pass through the network, instead of matching everything again. It trades memory for speed. *Rete* is Latin for "net".
5. Rete was first used in the OPS5 production-system language and is the basis of rule engines such as CLIPS, Jess and Drools.

#### 3. Complex and Approximate Matching

**Approximate matching** is a matching technique in which a rule is applied when its condition matches the current situation only approximately (partially), instead of exactly.

1. **Complex matching** is needed when the condition of a rule does not describe the state directly, so properties must first be derived from the state (for example, by other rules) before the match can be made.
2. Approximate matching is used where exact matching is impossible or too strict, for example in **speech understanding**, where the input is noisy, and in natural-language dialogue systems.
3. **Example: ELIZA**, a natural-language program written by Joseph Weizenbaum at MIT between 1964 and 1967, simulated a conversation (as a psychotherapist) by pattern matching and substitution:
   1. It looks for a **keyword** in the user's sentence; each keyword has a rank, and the highest-ranked keyword is used.
   2. A **decomposition rule** (a pattern with "match anything" parts) splits the sentence into pieces.
   3. A **reassembly rule** rearranges the pieces and adds fixed words to form the reply. For example, an input that matches "… you are …" can be answered "What makes you think I am …?".
   4. If no keyword matches, it gives a content-free reply such as "Please go on".

ELIZA matched the shape of a sentence, not its meaning; it gave an illusion of understanding without understanding anything.

#### 4. Conflict Resolution

**Conflict resolution** is the step of a production system that selects which rule to fire when the matching process finds more than one applicable rule (the conflict set).

The choice affects both the efficiency and the correctness of the system. Preferences for choosing a rule are of three kinds:

1. **Preferences based on rules:**
   1. **Rule order:** fire the rule that appears first in the rule list (or has the highest assigned priority).
   2. **Specificity:** prefer a more specific rule (one with more conditions) to a general one, because it was written for a special case.
2. **Preferences based on objects:** prefer rules that match more important objects; for example, ELIZA ranks its keywords and uses the rule for the highest-ranked keyword in the sentence.
3. **Preferences based on states:** fire all the matching rules on trial, evaluate the resulting states with a heuristic function, and choose the rule that produces the best state.

Other common strategies are:

1. **Recency:** prefer rules that match the most recently added facts (or that were fired least recently).
2. **Refraction:** do not fire the same rule on the same facts twice, which prevents endless loops.
3. **Fire all:** some systems simply fire every matching rule.

## Game Planning {#game-planning}

### Game Playing in AI

**Game playing** in AI is the design of programs that choose good moves in games, in which an agent must plan ahead against one or more opponents whose goals conflict with its own.

Search in such competitive environments is called **adversarial search**. Each player must consider the opponent's possible replies, and the opponent's replies to those, so the program searches a **game tree**. Game playing is a classic area of AI because games have clear rules and outcomes, but huge search spaces. For example, IBM's Deep Blue defeated the world chess champion Garry Kasparov in 1997 using adversarial search.

### Types of Games

Games are classified in two ways:

1. **By information:**
   1. **Perfect information:** every player can see the whole state of the game (the complete board), for example chess, checkers, Go and Othello.
   2. **Imperfect information:** some information is hidden from players, for example Battleship, bridge and poker (cards in other hands are hidden).
2. **By chance:**
   1. **Deterministic:** no randomness; each move has a fixed result, for example chess, checkers, Go and tic-tac-toe.
   2. **Stochastic (non-deterministic):** chance, such as dice or shuffled cards, affects the result, for example backgammon and Monopoly.

| | Deterministic | Chance (stochastic) |
| --- | --- | --- |
| Perfect information | Chess, checkers, Go, Othello, tic-tac-toe | Backgammon, Monopoly |
| Imperfect information | Battleship, blind tic-tac-toe | Bridge, poker, Scrabble |

**A zero-sum game** is a game in which one player's gain is exactly the other player's loss, so the total payoff of the players is the same (zero or constant) in every outcome.

Chess and tic-tac-toe are zero-sum games. In such games each player must think about what the opponent will do in reply ("embedded thinking").

### Formal Definition of a Game

A game can be defined as a search problem with six elements:

1. **Initial state (S0):** how the game is set up at the start.
2. **PLAYER(s):** which player has the move in state `s`.
3. **ACTIONS(s):** the set of legal moves in state `s`.
4. **RESULT(s, a):** the transition model; the state that results from move `a` in state `s`.
5. **TERMINAL-TEST(s):** true when the game is over; such states are **terminal states**.
6. **UTILITY(s, p):** the utility function (payoff function, objective function); the final numeric value of terminal state `s` for player `p`. In chess, a win, loss and draw are worth 1, 0 and ½; in tic-tac-toe they can be +1, −1 and 0.

**A game tree** is a tree whose nodes are game states and whose edges are moves; the root is the current position, the levels alternate between the two players, and the leaves are terminal states labelled with utilities.

The two players are called **MAX** (the program, who wants the highest utility) and **MIN** (the opponent, who wants the lowest utility for MAX). MAX moves first.

### Minimax Algorithm

**The minimax algorithm** is a recursive, depth-first algorithm for two-player zero-sum games that chooses the best move for MAX by assuming that both players play optimally: MAX chooses the move with the maximum value and MIN chooses the move with the minimum value.

The **minimax value** of a node is defined as:

1. `UTILITY(s)`, if `s` is a terminal state.
2. The **maximum** of the minimax values of its children, if MAX moves in `s`.
3. The **minimum** of the minimax values of its children, if MIN moves in `s`.

Algorithm:

```text
function MINIMAX(node, depth, maximizingPlayer)
    if depth = 0 or node is a terminal node then
        return the utility (static evaluation) of node
    if maximizingPlayer then
        value ← −∞
        for each child of node do
            value ← max(value, MINIMAX(child, depth − 1, false))
        return value
    else
        value ← +∞
        for each child of node do
            value ← min(value, MINIMAX(child, depth − 1, true))
        return value
```

Initial call: `MINIMAX(root, depth, true)`.

#### Worked Example of Minimax

A is a MAX node with three MIN children B, C and D; the leaves give the utilities for MAX.

![Minimax and alpha-beta pruning on a game tree](/diagrams/artificial-intelligence/minimax-alpha-beta.svg)

1. Leaves: B → 4, 9, 6; C → 3, 8, 7; D → 5, 2, 10.
2. MIN level: `B = min(4, 9, 6) = 4`, `C = min(3, 8, 7) = 3`, `D = min(5, 2, 10) = 2`.
3. MAX level: `A = max(4, 3, 2) = 4`.

So the minimax value of A is 4, and MAX's best move is the move to B. Minimax evaluates all 9 leaves.

#### Properties of Minimax

1. **Complete:** yes, if the game tree is finite.
2. **Optimal:** yes, against an optimal opponent.
3. **Time complexity:** `O(b^m)`, because it performs a complete depth-first search of the game tree (`b` = legal moves per position, `m` = maximum depth).
4. **Space complexity:** `O(b·m)`, like depth-first search.

**Limitation:** for real games the tree is far too large. In chess, `b ≈ 35` and a game often has about 50 moves by each player (`m ≈ 100`), so `35^100 ≈ 10^154` nodes would have to be searched. Two improvements are used: alpha–beta pruning, and cutting the search off at a fixed depth and using a heuristic **evaluation function** (for example, a weighted sum of material and position) instead of the true utility.

### Alpha–Beta Pruning

**Alpha–beta pruning** is an optimisation of the minimax algorithm that skips (prunes) the branches of the game tree that cannot affect the final decision, and returns the same move as minimax.

It uses two parameters, which give the algorithm its name:

1. **Alpha (α):** the best (highest) value found so far for MAX along the path; it starts at `−∞`.
2. **Beta (β):** the best (lowest) value found so far for MIN along the path; it starts at `+∞`.

Key points:

1. A MAX node updates only α; a MIN node updates only β.
2. α and β are passed down to the children; node values (not α and β) are passed up.
3. **Pruning condition:** when `α ≥ β` at a node, its remaining children are not examined.

Algorithm:

```text
function ALPHABETA(node, depth, α, β, maximizingPlayer)
    if depth = 0 or node is a terminal node then
        return the utility (static evaluation) of node
    if maximizingPlayer then
        value ← −∞
        for each child of node do
            value ← max(value, ALPHABETA(child, depth − 1, α, β, false))
            α ← max(α, value)
            if α ≥ β then break        // β cut-off
        return value
    else
        value ← +∞
        for each child of node do
            value ← min(value, ALPHABETA(child, depth − 1, α, β, true))
            β ← min(β, value)
            if α ≥ β then break        // α cut-off
        return value
```

Initial call: `ALPHABETA(root, depth, −∞, +∞, true)`.

#### Worked Example of Alpha–Beta Pruning

The same tree as the minimax example (leaves B → 4, 9, 6; C → 3, 8, 7; D → 5, 2, 10):

| Step | Node | Event | α | β | Action |
| --- | --- | --- | --- | --- | --- |
| 1 | A → B | Pass down α = −∞, β = +∞ | −∞ | +∞ | |
| 2 | B | Leaves 4, 9, 6; `β = min(+∞, 4, 9, 6)` | −∞ | 4 | B returns 4 |
| 3 | A | `α = max(−∞, 4)` | 4 | +∞ | |
| 4 | C | First leaf 3; `β = 3` | 4 | 3 | `α ≥ β`: prune leaves 8 and 7; C returns 3 |
| 5 | A | `α = max(4, 3)` | 4 | +∞ | |
| 6 | D | Leaf 5: `β = 5` | 4 | 5 | `α < β`: continue |
| 7 | D | Leaf 2: `β = 2` | 4 | 2 | `α ≥ β`: prune leaf 10; D returns 2 |
| 8 | A | `max(4, 3, 2) = 4` | 4 | +∞ | Best move: A → B |

The result (4, move to B) is the same as minimax, but only 6 of the 9 leaves were evaluated; the leaves 8, 7 and 10 were pruned. (Checked with a short program.) Once C has a leaf of value 3, MIN can force C to be at most 3; MAX already has 4 from B, so C's other leaves cannot change MAX's choice.

#### Move Ordering

The amount of pruning depends on the order in which moves are examined:

1. **Worst ordering:** the best moves are examined last (on the right of the tree); nothing is pruned, and the time is `O(b^m)`, the same as minimax.
2. **Ideal ordering:** the best moves are examined first (on the left); the time is `O(b^(m/2))`, so in the same time alpha–beta can search **twice as deep** as minimax.

Example: with `b = 35` and `m = 10`, minimax examines about `35^10 ≈ 2.8 × 10^15` leaves, but alpha–beta with ideal ordering about `35^5 ≈ 5.3 × 10^7`.

Rules for good ordering:

1. Try the moves that were best in earlier (shallower) searches first.
2. Use domain knowledge; in chess, try captures first, then threats, then forward moves, then backward moves.
3. Remember states that were already evaluated, because the same position can be reached by different move orders.

### Minimax vs Alpha–Beta Pruning

| Point | Minimax | Alpha–beta pruning |
| --- | --- | --- |
| Nodes examined | All nodes of the game tree | Skips branches that cannot affect the decision |
| Extra parameters | None | α and β |
| Result | Optimal move | The same optimal move |
| Time complexity | `O(b^m)` | `O(b^m)` worst case, `O(b^(m/2))` with ideal ordering |
| Depth searched in a fixed time | `d` | Up to `2d` with ideal ordering |
| Depends on move order | No | Yes |

## References {#references}

- TutorialsPoint — [Popular Search Algorithms](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_popular_search_algorithms.htm), accessed 2026-11-06. TutorialsPoint has no page on matching techniques, minimax or alpha–beta pruning.
- TpointTech — [Search Algorithms in AI](https://www.tpointtech.com/search-algorithms-in-ai), [Uninformed Search Algorithms](https://www.tpointtech.com/ai-uninformed-search-algorithms), [Informed Search Algorithms](https://www.tpointtech.com/informed-search-algorithms-in-artificial-intelligence), [A* Search Algorithm](https://www.tpointtech.com/a-search-algorithm-in-artificial-intelligence), [Hill Climbing Algorithm](https://www.tpointtech.com/hill-climbing-algorithm-in-ai), [Adversarial Search](https://www.tpointtech.com/ai-adversarial-search), [Mini-Max Algorithm](https://www.tpointtech.com/mini-max-algorithm-in-ai), [Alpha-Beta Pruning](https://www.tpointtech.com/ai-alpha-beta-pruning), [Game Playing in Artificial Intelligence](https://www.tpointtech.com/game-playing-in-artificial-intelligence), accessed 2026-11-06.
- GeeksforGeeks — [Uninformed Search Algorithms in AI](https://www.geeksforgeeks.org/artificial-intelligence/uniformed-search-algorithms-in-ai/), [Search Algorithms in AI](https://www.geeksforgeeks.org/machine-learning/search-algorithms-in-ai/), [Informed Search Algorithms in AI](https://www.geeksforgeeks.org/artificial-intelligence/informed-search-algorithms-in-artificial-intelligence/), [Informed vs. Uninformed Search in AI](https://www.geeksforgeeks.org/artificial-intelligence/difference-between-informed-and-uninformed-search-in-ai/), [Hill Climbing in AI](https://www.geeksforgeeks.org/artificial-intelligence/introduction-hill-climbing-artificial-intelligence/), [Adversarial Search Algorithms](https://www.geeksforgeeks.org/artificial-intelligence/adversarial-search-algorithms/), [Minimax Algorithm in Adversarial Search](https://www.geeksforgeeks.org/artificial-intelligence/minimax-algorithm-in-adversarial-search-for-optimal-decision-making/), [Alpha-Beta Pruning in Adversarial Search Algorithms](https://www.geeksforgeeks.org/artificial-intelligence/alpha-beta-pruning-in-adversarial-search-algorithms/), [Rule-Based System in AI](https://www.geeksforgeeks.org/artificial-intelligence/rule-based-system-in-ai/), accessed 2026-11-06.
- Programiz — [Breadth First Search](https://www.programiz.com/dsa/graph-bfs) and [Depth First Search](https://www.programiz.com/dsa/graph-dfs) (graph traversal only). Programiz has no page on AI search, matching or game playing.
- Matching techniques are not covered by any of the five reference websites. Sources used: Wikipedia — [Production system (computer science)](https://en.wikipedia.org/wiki/Production_system_(computer_science)), [Rete algorithm](https://en.wikipedia.org/wiki/Rete_algorithm) and [ELIZA](https://en.wikipedia.org/wiki/ELIZA), accessed 2026-11-06. The division into indexing, matching with variables, complex and approximate matching, and conflict resolution (with preferences based on rules, objects and states) follows Elaine Rich and Kevin Knight, *Artificial Intelligence*, 2nd edition, McGraw-Hill, 1991, chapter "Representing Knowledge Using Rules".

Issues found on the reference websites and how they were resolved:

1. TpointTech gives the time and space of bidirectional search as `O(b^d)`; each of the two searches goes only to depth `d/2`, so both are `O(b^(d/2))`, as TutorialsPoint's table gives.
2. TutorialsPoint's comparison table gives uniform-cost search a time and space of `b^d`; the correct bound is `O(b^(1 + ⌊C*/ε⌋))`, as TpointTech gives.
3. TpointTech's A* page defines `g(n)` as "the sum of the costs of node n outgoing edges"; `g(n)` is the cost of the path from the start node to `n`, as on TutorialsPoint and GeeksforGeeks.
4. TpointTech says that informed search "produces the most optimal solution possible"; greedy best-first search and hill climbing are not optimal. Only A* with an admissible (or consistent) heuristic is.
5. TpointTech says that simulated annealing "yields both efficiency and completeness"; it reaches a global optimum only with probability approaching 1 when the temperature is lowered slowly enough.
6. TpointTech's adversarial search page lists tic-tac-toe as a game of imperfect information and also as a deterministic perfect-information example; ordinary tic-tac-toe has perfect information (the list item probably meant "blind tic-tac-toe").
7. TpointTech's alpha–beta page says that pruning nodes "makes the algorithm slow"; it makes it faster.
8. TpointTech's "Game Playing in Artificial Intelligence" page is written in garbled wording ("phoney encounters", "diversion playing") and was not used for any point.
9. TutorialsPoint's pure heuristic search description places newly generated child nodes in the closed list; generated nodes go to the open list, and expanded nodes to the closed list.
