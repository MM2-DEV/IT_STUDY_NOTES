---
description: Verification and validation, static and dynamic techniques, software testing (principles, levels, black-box, white-box and grey-box methods, types of testing), errors, faults and failures, static analysis (reviews, walkthroughs and inspections), and debugging.
updated: 2026-11-04
---

## Verification and Validation {#verification-and-validation}

### Definition of Verification and Validation

Verification and validation (V&V) are the checking and analysis processes that ensure that software conforms to its specification and meets the needs of its users.

They are carried out at every stage of the software process, from requirements reviews to final testing.

**Verification** is the process of checking that the software (and each work product: requirements, design and code) **conforms to its specification** and to the standards.

It answers the question (Barry Boehm):

> **"Are we building the product right?"**

**Validation** is the process of checking that the finished software **meets the real needs and expectations of the customer** in its intended environment.

It answers the question:

> **"Are we building the right product?"**

**Example:** reviewing the design of a banking app to check that it matches the requirements specification is verification; running the finished app to check that customers can actually transfer money as they need is validation.

### Techniques of Verification and Validation

V&V uses two kinds of techniques:

1. **Static techniques (static verification)** — the work products are examined **without executing** the program: requirements and design reviews, walkthroughs, inspections and automated static analysis. They are mainly used for verification.
2. **Dynamic techniques (dynamic validation)** — the program is **executed** with test data and its behaviour is observed: software testing (functional, system and acceptance testing). They are mainly used for validation.

**Verification activities:**

1. Reviews of requirements, design and code.
2. Walkthroughs.
3. Inspections.
4. Static analysis.

**Validation activities:**

1. Functional testing.
2. System testing.
3. User acceptance testing.

### Verification vs Validation

| Basis | Verification | Validation |
|---|---|---|
| Question | "Are we building the product right?" | "Are we building the right product?" |
| Checks against | The specification and standards | The user's real needs and intended use |
| Focus | Requirements, design, code and documents | The behaviour of the final software |
| Execution of code | Not required (static) | Required (dynamic) |
| Methods | Reviews, walkthroughs, inspections, static analysis | Functional, system and acceptance testing |
| Timing | Throughout development, before validation | After executable software is available, usually after verification |
| Done by | Developers, reviewers, QA team | Testers, QA team and users |
| Finds | Defects early, before execution | Failures in behaviour and unmet user needs |
| Example | Reviewing the design of a banking app against its SRS | Running the app to check that money transfers work as users need |

### Software Testing vs Quality Assurance, Quality Control and Audit

1. **Software quality assurance (SQA)** — monitors the **development process** to check that it follows the organization's standards and procedures (process-oriented).
2. **Software quality control (QC)** — checks the **product** to maintain its quality, including its functional and non-functional requirements (product-oriented).
3. **Software audit** — an **independent** review of the processes, procedures and documents by an outside team, to check conformance with standards and regulations.
4. **Software testing** — executes the software to find defects; it is one part of quality control.

Quality assurance is explained in [Reliability and Quality Assurance](/topics/software-engineering/reliability-and-quality-assurance#quality-assurance).

## Software Testing {#software-testing}

### Definition of Software Testing

Software testing is the process of **executing a program with test data** to find errors, and to check whether the software meets its specified requirements.

Its aim is to find defects — bugs, missing requirements and differences between expected and actual results — before the software is delivered.

### Objectives of Software Testing

1. To find defects (errors) in the software before it is delivered.
2. To check that the software meets its requirements (functional and non-functional).
3. To give confidence in the quality of the software.
4. To prevent defects, by finding them early, when they are cheaper to fix.

### Error, Defect, Bug, Fault and Failure

1. **Error (mistake)** — a human mistake made during development, such as wrong logic in the code or a misunderstanding of a requirement.
2. **Fault (defect)** — the result of an error: an incorrect step, statement or data definition in the program. A defect found during testing is the difference between the actual and the expected result.
3. **Bug** — an informal name for a fault or defect.
4. **Failure** — the inability of the system to perform its required function, observed when a fault is executed.

An error by the programmer introduces a **fault** into the code; when the faulty code is executed, it may cause a **failure**. Not every fault causes a failure (a fault in code that is never executed causes none).

### Principles of Software Testing

There are seven principles of software testing:

1. **Testing shows the presence of defects** — testing can show that defects are present, but it cannot prove that there are none.
2. **Exhaustive testing is impossible** — testing every combination of inputs and preconditions is not feasible, so tests are selected by risk and priority.
3. **Early testing** — testing should start as early as possible (on requirements and design), because defects found early are cheaper to fix.
4. **Defect clustering** — a small number of modules usually contain most of the defects.
5. **Pesticide paradox** — running the same tests again and again eventually finds no new defects, so the tests must be reviewed and new tests added.
6. **Testing is context-dependent** — the testing approach depends on the kind of software (a banking system is tested differently from a game).
7. **Absence-of-errors fallacy** — software with no known defects is still useless if it does not meet the users' needs.

### Levels of Testing

Software is tested at four levels:

1. **Unit testing** — each **unit (module, function or class)** is tested on its own, usually by its developer, with white-box techniques.
2. **Integration testing** — the units are **combined** and the **interfaces** between them are tested, to find errors in the way they pass data and call each other.
3. **System testing** — the **complete, integrated system** is tested against the requirements, including non-functional requirements: functionality, performance (load and stress), security, usability, compatibility and portability.
4. **Acceptance testing** — the **customer or users** test the system to decide whether to accept it:
   1. **Alpha testing** — done at the **developer's site** by internal testers or users, in a controlled environment, before release.
   2. **Beta testing** — done at the **user's site** by real users in their real environment, before the final release; their feedback is used to fix problems.

**Regression testing** is repeated at every level after a change: the earlier tests are run again to check that the change has not broken existing functions.

#### Approaches to Integration Testing

Integration testing has four approaches:

1. **Big-bang integration** — all the modules are combined at once and tested together. It is simple and suitable only for small systems; when a test fails, it is hard to find which module caused the error.
2. **Top-down integration** — testing starts with the top (main) module and adds the lower modules one by one. Lower modules that are not yet ready are replaced by **stubs** — dummy modules that are called by the module under test and return fixed results. It tests the main control flow early.
3. **Bottom-up integration** — testing starts with the lowest modules and adds the higher modules. Higher modules that are not yet ready are replaced by **drivers** — dummy modules that call the module under test and pass it test data. Low-level faults are found early, but the whole program does not exist until the end.
4. **Sandwich (hybrid) integration** — a combination: the top part is integrated top-down and the bottom part bottom-up, meeting in the middle; both stubs and drivers are used.

![Top-down integration uses stubs in place of lower modules; bottom-up integration uses a driver in place of the higher module](/diagrams/software-engineering/integration-testing.svg)

**Stub vs driver:** a stub is a dummy **lower-level** module (used in top-down testing) that is **called by** the module under test; a driver is a dummy **higher-level** module (used in bottom-up testing) that **calls** the module under test.

### Types (Methods) of Testing by Knowledge of the Code

Testing methods are of three types by how much the tester knows about the internal code:

1. Black-box testing.
2. White-box testing.
3. Grey-box testing.

#### 1. Black-Box Testing

Black-box testing (functional, behavioural or closed-box testing) tests the software **without any knowledge of its internal code**: the tester gives inputs and checks the outputs against the specification. It is usually done by testers and users.

The black-box techniques are:

1. **Equivalence partitioning (equivalence class testing)** — the input values are divided into **classes (partitions)** that the program should treat in the same way, and **one value from each class** is tested.
2. **Boundary value analysis (BVA)** — test values are chosen **at and around the boundaries** of each input range, because errors occur most often at the edges.
3. **Decision table testing** — a table of all combinations of conditions and the resulting actions is made, and each combination is tested (for example, loan approval based on salary and credit score).
4. **State transition testing** — the system's states and the events that change them are tested, including invalid transitions (for example, an ATM moving from *Idle* to *Card inserted* to *PIN entered*, and a wrong PIN).
5. **Cause–effect graphing** — the causes (inputs) and effects (outputs) are linked in a graph, which is converted into a decision table of test cases.
6. **Pair-wise testing** — every pair of input parameter values is tested, instead of every combination.
7. **Error guessing** — the tester uses experience to guess likely error areas (empty input, zero, very large values).
8. **Use case testing** — test cases are derived from the use cases of the system.

**Example — an input field accepts whole numbers from 1 to 999:**

1. **Equivalence partitioning** gives three classes:
   1. Invalid: values less than 1 (test value: **−5**).
   2. Valid: 1 to 999 (test value: **500**).
   3. Invalid: values greater than 999 (test value: **1200**).
2. **Boundary value analysis** tests each boundary, the value just below it and the value just above it:
   1. Lower boundary: **0, 1, 2**.
   2. Upper boundary: **998, 999, 1000**.

For n input variables, simple boundary value analysis (testing min, min+1, nominal, max−1 and max for one variable at a time, the others held at their nominal values) needs:

> **Number of test cases = 4n + 1**

where **n** is the number of input variables. **Example:** for n = 2 variables, 4 × 2 + 1 = **9** test cases.

#### 2. White-Box Testing

White-box testing (structural, glass-box, clear-box or open-box testing) tests the **internal structure, logic and code** of the program; the tester must know the code and designs test cases to exercise its statements, branches and paths. It is usually done by developers.

The white-box techniques are:

1. **Statement coverage** — every **statement** is executed at least once.
2. **Branch (decision) coverage** — every **branch** of each decision (both true and false outcomes) is executed at least once.
3. **Condition coverage** — every individual **condition** in a decision is evaluated both true and false.
4. **Path testing (basis path testing)** — every **independent path** through the program is executed at least once; the number of independent paths is given by the **cyclomatic complexity** (see [Graph-Based Complexity Measures](/topics/software-engineering/software-cost-estimation-and-metrics#graph-based-complexity-measures)).
5. **Loop testing** — loops are tested with zero, one, two, typical and maximum numbers of iterations.
6. **Data-flow testing** — test paths are chosen according to where variables are defined and used.

> **Statement coverage = (statements executed ÷ total statements) × 100%**
>
> **Branch coverage = (branches executed ÷ total branches) × 100%**

**Example:** a function has 10 statements and 4 branches. A test executes 5 statements and 1 branch.

1. Statement coverage = 5 ÷ 10 × 100% = **50%**.
2. Branch coverage = 1 ÷ 4 × 100% = **25%**.

100% branch coverage includes 100% statement coverage, so branch coverage is the stronger criterion.

#### 3. Grey-Box Testing

Grey-box testing tests the software with **partial knowledge** of its internal structure: the tester knows the design documents, data structures and database, but tests from the outside like a user. It is used for integration testing and for testing data flows and interfaces.

#### Black-Box vs White-Box vs Grey-Box Testing

| Basis | Black-box testing | White-box testing | Grey-box testing |
|---|---|---|---|
| Knowledge of code | Not needed | Full knowledge needed | Partial knowledge |
| Other names | Functional, behavioural, closed-box | Structural, glass-box, clear-box | Translucent testing |
| Basis of test cases | Specification (requirements) | Internal code and logic | Design documents, data flows and interfaces |
| Done by | Testers and users | Developers | Testers with some technical knowledge |
| Levels where used | System and acceptance testing | Unit (and integration) testing | Integration testing |
| Techniques | Equivalence partitioning, boundary value analysis, decision tables, state transition | Statement, branch and path coverage, loop testing | Matrix and regression testing, pattern testing |
| Time needed | Least | Most | Medium |
| Suitable for testing algorithms | No | Yes | No |

### Types of Testing by What Is Tested

Testing is also classified into functional and non-functional testing:

1. **Functional testing** — checks that the functions of the software work as specified: unit, integration, system, user acceptance and **smoke testing** (a quick check that the most important functions of a new build work, before deeper testing).
2. **Non-functional testing** — checks the quality attributes:
   1. **Performance testing** — speed and responsiveness under the expected workload.
   2. **Load testing** — behaviour with many users at the same time, to find the maximum capacity.
   3. **Stress testing** — behaviour beyond normal limits, to check stability and recovery.
   4. **Security testing** — protection against unauthorized access.
   5. **Usability testing** — ease of use.
   6. **Compatibility testing** — working on different devices, operating systems and browsers.

### Manual Testing vs Automation Testing

| Basis | Manual testing | Automation testing |
|---|---|---|
| Method | Testers execute the test cases by hand | Tools and scripts execute the test cases |
| Speed | Slow | Fast |
| Accuracy | Human errors are possible | Consistent and repeatable |
| Initial cost | Low | High (tools and scripts) |
| Best for | Exploratory, usability and ad-hoc testing | Regression, load and repeated testing |
| Programming knowledge | Not needed | Needed to write the scripts |

**Ad-hoc testing** is informal, unplanned testing done without test cases, to find defects that formal testing missed.

### Testing Documentation

1. **Before testing** — the SRS, test policy, test strategy and the **traceability matrix** (which links each requirement to its test cases).
2. **During testing** — test cases, test descriptions, test case reports and test logs.
3. **After testing** — the **test summary report**, which states whether the software is ready for release.

## Analysis and Debugging {#analysis-and-debugging}

### Software Analysis (Static Analysis)

Software analysis is the verification of software by **examining** the program and its documents, **without executing** it, to find errors and prove properties.

It complements testing: testing executes the program for a few inputs, while analysis reasons about all possible executions.

Analysis techniques are of two kinds:

1. **Informal (manual) analysis** — people read and examine the work products: code reviews, **walkthroughs** and **inspections**.
2. **Formal and automated analysis** — tools or mathematics are used: automated **static analysis**, **symbolic execution**, **correctness proofs** and **model checking**.

#### Static Testing vs Dynamic Testing

| Basis | Static testing | Dynamic testing |
|---|---|---|
| Execution of code | Not executed | Executed |
| Purpose | Finds flaws in requirements, design, documents and code early | Finds failures that appear when the program runs |
| When performed | From the requirements stage onwards | When executable code is available |
| Techniques | Reviews, walkthroughs, inspections, static analysis | Black-box, white-box and grey-box testing |
| Defects found | Requirement gaps, design faults, coding-standard violations, unreachable code | Functional failures, run-time errors, performance problems |
| Mainly used for | Verification | Validation |
| Cost of fixing defects found | Low (found early) | Higher (found later) |

#### Walkthrough

A walkthrough is an **informal review** in which the **author** leads a small group of colleagues through a work product (such as code or a design), explaining it step by step, while the others ask questions and point out possible defects.

Its purpose is to find errors and share knowledge; it has no checklist and little or no preparation.

#### Inspection

An inspection (Fagan inspection) is a **formal, rigorous group review** that uses a **checklist** of common errors to find defects as close as possible to where they were introduced.

It has defined roles and stages:

The roles in an inspection are:

1. **Moderator** — plans and leads the inspection.
2. **Author** — the creator of the work product; answers questions and fixes the defects.
3. **Reader** — reads out the code or document during the meeting.
4. **Recorder (scribe)** — records the defects found.
5. **Inspectors** — examine the work product and find defects.

The stages of an inspection are:

1. Planning.
2. Overview.
3. Individual preparation.
4. Inspection meeting.
5. Rework.
6. Follow-up.

#### Inspection vs Walkthrough

| Basis | Inspection | Walkthrough |
|---|---|---|
| Formality | Formal | Informal |
| Initiated by | The project team (moderator) | The author |
| Led by | A trained moderator | The author |
| Checklist | Used | Not used |
| Preparation | Each inspector prepares in advance | Little or no preparation |
| Roles | Moderator, reader, recorder, author, inspectors | Author and participants |
| Recording of defects | By a recorder | By the author |
| Process | Formal stages, with rework and follow-up | No formal procedure |
| Duration | Longer | Shorter |
| Main goal | Find defects | Find defects and share understanding |

#### Automated Static Analysis

Automated static analysers are tools that scan the source code without running it and report possible errors and anomalies, such as:

1. **Data faults** — variables used before they are initialized, variables declared but never used, array bounds violations.
2. **Control faults** — unreachable (dead) code, unconditional branches into loops.
3. **Interface faults** — wrong types or numbers of parameters in function calls.
4. **Storage faults** — memory allocated but never freed, pointer misuse.
5. **Violations of coding standards.**

#### Formal Analysis

1. **Symbolic execution** — the program is executed with **symbolic values** (such as x = A) instead of real numbers, so that one symbolic run represents a whole class of inputs.
2. **Correctness proofs** — the program is proved mathematically to satisfy its specification, using preconditions, postconditions and loop invariants.
3. **Model checking** — a tool explores all the states of a model of the system automatically to check that a property (for example, "a deadlock never occurs") always holds.

### Debugging

#### Definition of Debugging

Debugging is the process of **locating, analyzing and removing the cause of an error (bug)** that has been revealed, usually by testing.

Testing shows that a failure exists; debugging finds **why** it occurs and **fixes** it.

#### Steps of Debugging

The debugging process has six steps:

1. **Reproduce the bug** — recreate the conditions in which the failure occurs.
2. **Locate the bug** — find the part of the code where the fault is, using error messages, logs and debugging tools.
3. **Identify the root cause** — analyze why the code fails under these conditions.
4. **Fix the bug** — change the code to correct the fault.
5. **Test the fix** — run the failed test again, and run regression tests to make sure that the fix has not introduced new errors.
6. **Document** — record the cause and the fix for future reference.

#### Debugging Approaches (Strategies)

The main debugging approaches are:

1. **Brute force** — the most common but least efficient approach: the programmer collects a lot of information (memory dumps, print statements, traces) and searches it for the cause. It is used when other approaches fail.
2. **Backtracking** — starting from the place where the failure (wrong output) appears, the programmer traces the code **backwards** until the cause is found. It works well for small programs, but the number of backward paths grows quickly in large ones.
3. **Cause elimination** — a list of possible causes is made, and tests are run to **eliminate** them one by one (often by binary partitioning of the data or code) until the real cause is found. It uses:
   1. **Induction** — moving from the particular symptoms to a general hypothesis about the cause.
   2. **Deduction** — starting from all possible causes and eliminating those that do not fit the evidence.
4. **Forward analysis** — the program is traced **forwards** from the start, with breakpoints or print statements, to see where wrong values first appear.
5. **Program slicing** — only the statements (the **slice**) that can affect the value of a particular variable at a particular point are examined, which narrows the search.
6. **Experience-based debugging** — knowledge of similar past problems is used to guess the cause.

**Debugging tools:** debuggers in IDEs (Visual Studio, Eclipse, PyCharm) and stand-alone debuggers (such as GDB) provide **breakpoints**, step-by-step execution, watchpoints and inspection of variables and memory; logging utilities, static analysers, memory checkers (such as Valgrind) and profilers are also used.

#### Testing vs Debugging

| Basis | Testing | Debugging |
|---|---|---|
| Purpose | To find defects (show that failures exist) | To locate and fix the cause of a defect |
| Starts | When code is written (test design can start earlier) | When a test fails |
| Done by | Testers (and developers) | Developers |
| Knowledge of design | Not required for black-box testing | Required |
| Process | Planned, designed and executed with test cases | Driven by the failure; uses deductive reasoning |
| Automation | Can be largely automated | Mostly manual, helped by debugging tools |
| Output | Defect reports | Corrected code |
| Organized by | Levels (unit, integration, system, acceptance) | Approaches (brute force, backtracking, cause elimination) |
| Relationship | Comes first | Follows testing |

## References {#references}

**TutorialsPoint**

- [Software Testing Overview](https://www.tutorialspoint.com/software_engineering/software_testing_overview.htm) — accessed 2026-11-04 (validation and verification, errors, faults and failures, manual and automated testing, black-box and white-box techniques, testing levels, documentation, testing vs QA, QC and audit; it says verification checks the software against the "business requirements", while validation checks the "user requirements"; standard usage, followed here, is that verification checks the software against its specification and validation checks it against the user's needs)
- [Software Testing Methods](https://www.tutorialspoint.com/software_testing/software_testing_methods.htm) — accessed 2026-11-04 (black-box, white-box and grey-box testing)

**GeeksforGeeks**

- [Verification and Validation](https://www.geeksforgeeks.org/software-engineering/software-engineering-verification-and-validation/) — accessed 2026-11-04
- [Principles of Software Testing](https://www.geeksforgeeks.org/software-engineering/software-engineering-seven-principles-of-software-testing/) — accessed 2026-11-04
- [Integration Testing](https://www.geeksforgeeks.org/software-testing/software-engineering-integration-testing/) — accessed 2026-11-04 (big-bang, bottom-up, top-down and sandwich integration; stubs and drivers)
- [Software Testing Techniques](https://www.geeksforgeeks.org/software-testing/software-testing-techniques/) — accessed 2026-11-04 (equivalence partitioning, boundary value analysis, decision tables, state transition, statement, branch and condition coverage)
- [Static Testing vs Dynamic Testing](https://www.geeksforgeeks.org/software-engineering/difference-between-static-and-dynamic-testing/) — accessed 2026-11-04
- [Difference between Inspection and Walkthrough](https://www.geeksforgeeks.org/software-engineering/difference-between-inspection-and-walkthrough/) — accessed 2026-11-04
- [Debugging in Software Engineering](https://www.geeksforgeeks.org/software-engineering/software-engineering-debugging/) — accessed 2026-11-04 (debugging process, approaches and tools)
- [Differences between Testing and Debugging](https://www.geeksforgeeks.org/software-testing/differences-between-testing-and-debugging/) — accessed 2026-11-04

**TpointTech**

- [Software Testing Tutorial](https://www.tpointtech.com/software-testing-tutorial) — accessed 2026-11-04 (types of testing, black-box and white-box techniques; it misspells "equivalence partitioning" and lists "visual box testing", which is not a testing method)
- [Debugging](https://www.tpointtech.com/debugging) — accessed 2026-11-04 (debugging steps, backward and forward analysis, tools)
- [Testing vs Debugging](https://www.tpointtech.com/testing-vs-debugging) — accessed 2026-11-04 (debugging approaches by induction, deduction and brute force; it says debugging "cannot be automated" and is "not a part of SDLC", which are overstatements — debugging is part of development and is helped by automated tools)

**Programiz**

- Programiz has no software engineering tutorial; no page was found for these subtopics (checked 2026-11-04).

**Additional sources** (the reference websites do not cover symbolic execution, correctness proofs, model checking or program slicing)

- Carlo Ghezzi, Mehdi Jazayeri and Dino Mandrioli, *Fundamentals of Software Engineering*, 2nd edition, Prentice Hall, chapter 6, "Verification" — testing, analysis (informal analysis, correctness proofs), symbolic execution, model checking and debugging
- Roger S. Pressman, *Software Engineering: A Practitioner's Approach* — debugging strategies (brute force, backtracking, cause elimination) and boundary value analysis
- Barry W. Boehm, *Software Engineering Economics*, 1981 — "Are we building the product right?" and "Are we building the right product?"
