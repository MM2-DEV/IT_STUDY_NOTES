---
description: Version control systems and Git commands, branching and merging (branching strategies, fast-forward and three-way merges, merge conflicts), DevOps and its significance (principles, lifecycle, CI/CD, tools) and DevSecOps.
updated: 2026-11-07
---

## Version Control and Git Commands {#version-control-and-git-commands}

### Version Control

**Version control** is a system that records changes to a file or set of files over time, so that any earlier version can be recalled later.

A **version control system (VCS)** keeps the complete history of a project: who changed what, when and why. Several developers can work on the same code without overwriting each other's work, compare versions, and go back to an earlier version when something goes wrong.

#### Types of Version Control Systems

There are three types of version control systems:

1. **Local VCS:** all versions are kept on one computer in a simple local database (for example, **RCS**, which stores the differences between versions). It is simple, but only one person can use it and the whole history is lost if that disk fails.
2. **Centralized VCS (CVCS):** one **central server** holds all the files and their history; developers check out files from it and commit changes back to it (for example, **CVS, Subversion (SVN) and Perforce**). Everyone can see what others are doing and administrators can control access, but the server is a **single point of failure**: if it is down, nobody can commit, and if its disk is lost without a backup, the entire history is lost.
3. **Distributed VCS (DVCS):** every developer's computer holds a **complete copy of the repository, including its full history** (for example, **Git, Mercurial and Bazaar**). Commits are made locally and then shared by pushing and pulling. Every copy is a full backup, most operations are fast because they are local, and developers can work offline.

| Basis | Local VCS | Centralized VCS | Distributed VCS |
| --- | --- | --- | --- |
| Where the history is kept | On one local computer | On one central server | In every developer's repository |
| Collaboration | One user only | Through the server | By pushing and pulling between repositories |
| Network needed to commit? | No | Yes | No (a commit is local; pushing needs the network) |
| Single point of failure | Yes (the one disk) | Yes (the server) | No — any copy can restore the others |
| Speed | Fast | Slower; operations go to the server | Fast; most operations are local |
| Examples | RCS | CVS, Subversion, Perforce | Git, Mercurial, Bazaar |

### Git

**Git** is a free and open-source **distributed** version control system, created by **Linus Torvalds in 2005** for the development of the Linux kernel.

Git stores each version as a **snapshot** of the project (not as a list of differences), and identifies every object by a **SHA-1 hash** (40 hexadecimal characters), so any corruption is detected.

**Basic terms:**

1. **Repository (repo):** the `.git` directory that holds all the commits, branches and tags of a project. A **local** repository is on the developer's computer; a **remote** repository is on a server (for example, GitHub).
2. **Working directory (working tree):** the files that the developer edits.
3. **Staging area (index):** the place where changes are collected for the next commit.
4. **Commit:** a snapshot of the project with its author, message and a pointer to its parent commit(s), identified by a hash.
5. **Branch:** a lightweight, movable pointer to a commit.
6. **HEAD:** a pointer to the branch (and so the commit) that is currently checked out.
7. **Tag:** a fixed name for a particular commit, usually a release (for example, `v1.0`).
8. **Remote (origin):** a named connection to another repository; `origin` is the default name of the repository a project was cloned from.

A file in Git is in one of three states: **modified** (changed but not staged), **staged** (marked for the next commit) or **committed** (stored in the repository). The basic workflow is: edit files → `git add` → `git commit` → `git push`.

![The working directory, staging area, local repository and remote repository, with git add, git commit, git push, git fetch and git pull](/diagrams/software-engineering/git-three-areas.svg)

### Common Git Commands

| Command | What it does |
| --- | --- |
| `git config --global user.name "Name"` | Sets the name (and, with `user.email`, the e-mail) recorded in commits |
| `git init` | Creates a new, empty repository in the current directory |
| `git clone <url>` | Copies a remote repository, with its full history, to the local computer and names it `origin` |
| `git status` | Shows the current branch and the staged, modified and untracked files |
| `git add <file>` / `git add .` | Stages changes for the next commit |
| `git commit -m "message"` | Records the staged changes as a new commit in the local repository |
| `git log` | Shows the commit history, newest first (`--oneline`, `--graph` for short forms) |
| `git diff` | Shows unstaged changes; `git diff --staged` shows staged changes |
| `git push <remote> <branch>` | Uploads local commits to a remote repository |
| `git fetch <remote>` | Downloads new commits from the remote without changing the local branch or files |
| `git pull <remote> <branch>` | Fetches from the remote and integrates the changes into the current branch |
| `git merge <branch>` | Joins the history of another branch into the current branch |
| `git rebase <branch>` | Replays the current branch's commits on top of another branch, giving a linear history |
| `git branch` / `git branch <name>` / `git branch -d <name>` | Lists, creates or deletes branches |
| `git checkout <branch>` / `git switch <branch>` | Switches to another branch (`checkout -b` or `switch -c` creates and switches) |
| `git stash` / `git stash pop` | Saves uncommitted changes temporarily and cleans the working directory / brings them back |
| `git reset <commit>` | Moves the current branch back to an earlier commit (see below) |
| `git revert <commit>` | Creates a new commit that undoes an earlier commit |
| `git remote -v` / `git remote add <name> <url>` | Lists or adds remote repositories |
| `git tag <name>` | Marks the current commit with a tag (for a release) |

**Example session** in a new, empty repository (created with `git init`), using Git 2.43.0:

```text
$ echo "Hello" > notes.txt
$ git status --short
?? notes.txt
$ git add notes.txt
$ git status --short
A  notes.txt
$ git commit -m "Add notes"
[main (root-commit) 5b30eec] Add notes
 1 file changed, 1 insertion(+)
 create mode 100644 notes.txt
$ git log --oneline
5b30eec Add notes
```

In the short status, `??` means the file is untracked and `A` means it is staged as a new file.

### Differences Between git fetch and git pull

| Basis | git fetch | git pull |
| --- | --- | --- |
| What it does | Only downloads new commits from the remote | Downloads them **and** integrates them into the current branch |
| What it updates | The remote-tracking branches (such as `origin/main`); not the local branch or the working files | The current local branch and the working files too |
| Review before integrating | Yes — the changes can be inspected first, then merged | No separate review step |
| Merge conflicts | Cannot cause conflicts | Can cause conflicts |
| Relationship | — | git pull = git fetch + git merge (or git rebase with `--rebase`) |

**Note:** in recent Git versions, if the local and remote branches have diverged and no integration method has been configured, `git pull` stops with "Need to specify how to reconcile divergent branches" and asks for `--rebase`, `--no-rebase` (merge) or `--ff-only`.

### Differences Between git merge and git rebase

| Basis | git merge | git rebase |
| --- | --- | --- |
| Method | Joins two branches, creating a merge commit with two parents (unless a fast-forward is possible) | Moves the branch's commits so that they start from the tip of another branch |
| History | Kept as it happened (non-linear) | Rewritten into a straight line |
| Commit IDs | Existing commits are unchanged | The moved commits get new IDs |
| Conflicts | Resolved once, in the merge commit | Resolved commit by commit |
| Safe on shared branches? | Yes | No — commits that others already have must not be rebased |

### Differences Between git reset and git revert

`git reset` has three modes: `--soft` moves the branch back but keeps the changes staged; `--mixed` (the default) also unstages them but keeps them in the working files; `--hard` discards them from the working files as well.

| Basis | git reset | git revert |
| --- | --- | --- |
| How it undoes | Moves the branch pointer back to an earlier commit; later commits drop out of the branch | Adds a new commit that applies the opposite of an earlier commit |
| History | Rewritten | Kept; one extra commit is added |
| Safe for commits already pushed? | No | Yes — the preferred way to undo a public commit |
| Typical use | Undo local commits, unstage files, discard local work | Undo a commit that is already shared |

## Branching and Merging {#branching-and-merging}

### Branching

**A branch** is an independent line of development; in Git it is a lightweight, movable pointer to a commit.

New work (a feature or a bug fix) is done in its own branch, so the main branch stays stable; when the work is finished, the branch is merged back. Creating a branch only creates a new pointer, so branching in Git is very cheap and fast.

**A branching strategy** is the set of rules a team follows for creating, naming, using and merging branches.

#### Branching Strategies

1. **Feature branch workflow:** every feature or bug fix is developed in its own short-lived branch created from the main branch, reviewed (usually through a pull request) and merged back, and then the branch is deleted.
2. **Git Flow** (proposed by Vincent Driessen in 2010): two permanent branches — **main (master)**, which holds the released versions (tagged), and **develop**, which collects finished features — and three kinds of temporary branches:
   1. **feature** branches start from develop and are merged back into develop.
   2. **release** branches start from develop when a release is prepared (only bug fixes are allowed); they are merged into **main and develop**, and the release is tagged on main.
   3. **hotfix** branches start from main to fix an urgent production bug; they are merged into **main and develop**.

   Git Flow suits projects with scheduled, versioned releases; it is complex for continuous delivery.
3. **GitHub Flow:** only **main** (always deployable) and short-lived feature branches merged through pull requests; suits continuous deployment and small teams.
4. **Trunk-based development:** all developers integrate small changes into one shared branch (the **trunk** or main) at least once a day; any branches live for only hours or a day or two, and unfinished work is hidden behind **feature flags**. It relies on continuous integration and automated tests, and gives few and small merge conflicts.
5. **Release branches:** a branch is created for each release (for example, `release/2.1`) to stabilise and maintain that version with bug fixes, while new development continues on main.

![Git Flow: feature branches merge into develop, a release branch merges into main and develop, and a hotfix branch from main merges into main and develop](/diagrams/software-engineering/git-flow.svg)

### Merging

**Merging** is joining the histories of two branches into one.

There are two kinds of merges:

1. **Fast-forward merge:** if the current branch has no new commits since the other branch was created (its tip is an ancestor of the other branch), Git simply **moves the branch pointer forward**. No new commit is created, and the history stays linear.
2. **Three-way merge:** if both branches have new commits (they have diverged), Git combines **three snapshots — the two branch tips and their common ancestor (the merge base)** — and creates a new **merge commit with two parents**.

| Basis | Fast-forward merge | Three-way merge |
| --- | --- | --- |
| When | The current branch has no new commits | Both branches have new commits |
| How | The branch pointer moves forward | The two tips are combined using their common ancestor |
| New commit | None | A merge commit with two parents |
| History | Linear | Shows the branch and the join |
| Conflicts | Not possible | Possible |

**Example (fast-forward):**

```text
$ git switch -c feature
Switched to a new branch 'feature'
$ echo "Feature line" >> notes.txt
$ git commit -am "Add feature line"
[feature 3489669] Add feature line
 1 file changed, 1 insertion(+)
$ git switch main
Switched to branch 'main'
$ git merge feature
Updating 5b30eec..3489669
Fast-forward
 notes.txt | 1 +
 1 file changed, 1 insertion(+)
```

### Merge Conflicts

**A merge conflict** occurs when the same part of the same file has been changed differently in the two branches being merged, so Git cannot decide which change to keep.

Git stops the merge and marks the conflicting part of the file:

```text
$ git merge discount
Auto-merging config.txt
CONFLICT (content): Merge conflict in config.txt
Automatic merge failed; fix conflicts and then commit the result.
$ git status --short
UU config.txt
$ cat config.txt
<<<<<<< HEAD
price = 120
=======
price = 90
>>>>>>> discount
```

The part between `<<<<<<< HEAD` and `=======` is the current branch's version; the part between `=======` and `>>>>>>> discount` is the other branch's version.

**Steps to resolve a merge conflict:**

1. Run `git status` to see the files with conflicts (marked `UU`, both modified).
2. Open each file, decide what to keep (this branch's change, the other's, or a combination), edit the text and **delete the markers** `<<<<<<<`, `=======` and `>>>>>>>`.
3. Run `git add <file>` to mark the conflict as resolved.
4. Run `git commit` to complete the merge.
5. To give up instead, `git merge --abort` returns to the state before the merge.

After the conflict above was resolved (keeping `price = 110`), the history shows the three-way merge:

```text
$ git add config.txt
$ git commit -m "Merge discount"
[main 11743e7] Merge discount
$ git log --oneline --graph
*   11743e7 Merge discount
|\
| * bd213c7 Discount price
* | 9e31906 Raise price
|/
* de2486b Set price
```

Conflicts are reduced by merging often, keeping branches short-lived and changes small.

## DevOps and Its Significance {#devops-and-its-significance}

### Definition

**DevOps** is a culture and set of practices that brings software development (Dev) and IT operations (Ops) together, so that software is built, tested, released and run quickly and reliably through collaboration, automation and continuous improvement.

In traditional organisations, the developers write the code and a separate operations team deploys and runs it; DevOps removes this wall and gives one team shared responsibility for the whole life cycle. The term grew from the first **DevOpsDays** conference, organised by **Patrick Debois** in Ghent, Belgium, in **2009**.

### Principles of DevOps

**CALMS:**

1. **Culture:** collaboration and shared responsibility; no silos between teams.
2. **Automation:** automate building, testing, deployment and infrastructure.
3. **Lean:** small batches of work, less waste, fast flow.
4. **Measurement:** measure everything — deployment frequency, lead time, failure rate and recovery time.
5. **Sharing:** share knowledge, tools and feedback across teams.

**The Three Ways** (Gene Kim):

1. **Flow (systems thinking):** make work flow quickly from development to the customer.
2. **Feedback:** create fast feedback from operations back to development, so problems are corrected early.
3. **Continual learning and experimentation:** learn from failures and keep improving.

### DevOps Lifecycle

The DevOps lifecycle has eight phases, which form a continuous loop:

1. **Plan:** gather requirements and plan the work (tools: Jira, Trello, Confluence).
2. **Code:** write and review code under version control (Git, GitHub, GitLab, Bitbucket).
3. **Build:** compile the code and package it (Maven, Gradle, Docker).
4. **Test:** run automated tests (Selenium, JUnit, TestNG, SonarQube).
5. **Release:** prepare a tested version for deployment (Jenkins, GitLab CI, CircleCI).
6. **Deploy:** deploy it to the servers (Ansible, Terraform, Kubernetes, Chef, Puppet).
7. **Operate:** run, configure and scale the system (Kubernetes, Ansible, Chef, Puppet).
8. **Monitor:** watch performance, logs and errors, and feed the results back to planning (Prometheus, Grafana, Nagios, the ELK Stack).

These are also described as the **7 Cs** of DevOps: continuous development, continuous integration, continuous testing, continuous deployment, continuous monitoring, continuous feedback and continuous operations.

![The DevOps lifecycle as an infinity loop: Plan, Code, Build and Test on the Dev side; Release, Deploy, Operate and Monitor on the Ops side](/diagrams/software-engineering/devops-lifecycle.svg)

### Continuous Integration, Delivery and Deployment (CI/CD)

1. **Continuous integration (CI):** developers merge their code into a shared repository frequently (several times a day), and every merge automatically triggers a build and automated tests, so that errors are found early.
2. **Continuous delivery:** extends CI so that the code is **always ready to release**: every change is built, tested and deployed to a staging environment automatically, but the **release to production is approved manually**.
3. **Continuous deployment:** goes one step further: every change that passes all the automated tests is **released to production automatically**, without human approval.

| Basis | Continuous delivery | Continuous deployment |
| --- | --- | --- |
| Release to production | Manual approval | Automatic once the tests pass |
| Human intervention | Needed before release | None in the pipeline |
| Risk | Moderate | Higher — needs very strong automated tests and monitoring |
| Relationship | Builds on CI | Builds on continuous delivery and CI |

### Significance (Benefits) of DevOps

1. **Faster time to market:** shorter release cycles and more frequent deployments.
2. **Better collaboration:** development and operations share goals and responsibility.
3. **Higher quality and reliability:** automated testing finds bugs early.
4. **Fewer human errors:** building, testing and deployment are automated.
5. **Faster recovery:** monitoring and small changes reduce the mean time to recovery.
6. **Scalability and consistency:** infrastructure is managed as code.
7. **Better security:** security checks can be built into the pipeline (DevSecOps).
8. **Higher customer satisfaction:** quicker response to customer feedback.

**Challenges:** a shortage of skilled DevOps engineers, the cost of tools and training, and the cultural change needed in the organisation.

### Differences Between Waterfall, Agile and DevOps

| Basis | Waterfall | Agile | DevOps |
| --- | --- | --- | --- |
| Approach | Sequential phases | Iterative and incremental | Continuous delivery and operation |
| Releases | Once, at the end | At the end of every sprint (1–4 weeks) | Continuously; possibly many times a day |
| Testing | After development | In every iteration | Automated and continuous in the pipeline |
| Customer involvement | At the start and the end | Throughout the project | Continuous feedback, including monitoring |
| Teams | Separate teams for each phase | Cross-functional development team | Development and operations (and QA) share responsibility |
| Handling change | Costly | Welcomed | Small, frequent changes |
| Automation | Little | Not the main focus | A primary goal |
| Main focus | Following the plan and documentation | Working software | Fast and reliable delivery and operation |

## DevSecOps {#devsecops}

### Definition

**DevSecOps** (development, security and operations) is the practice of integrating security into every phase of the DevOps lifecycle, with automated security checks in the CI/CD pipeline, so that security is a shared responsibility of all teams rather than a separate check at the end.

**Shift left** means moving security (and testing) to the **earliest stages** of development — requirements, design and coding — so that vulnerabilities are found when they are cheapest to fix.

### Security in Each Phase

| Phase | Security activities | Example tools |
| --- | --- | --- |
| Plan | Security requirements, threat modelling, risk assessment | — |
| Code | Secure coding standards, code review, **secrets scanning** (finding passwords and keys committed to the repository) | Gitleaks, Semgrep |
| Build | **SAST** — static application security testing: analyses the source code without running it; **SCA** — software composition analysis: finds known vulnerabilities and licence problems in third-party libraries | SonarQube, Checkmarx (SAST); Snyk (SCA) |
| Test | **DAST** — dynamic application security testing: tests the running application from outside, as an attacker would; penetration testing | OWASP ZAP, Burp Suite |
| Release and deploy | **Container image scanning**, **infrastructure-as-code (IaC) scanning** of Terraform or Kubernetes files, security gates that stop the pipeline on serious findings | Trivy, Checkov |
| Operate and monitor | Continuous monitoring, runtime protection, vulnerability management, incident response | SIEM tools, Falco |

**SAST vs DAST:** SAST is **white-box** testing of the source code early in development, from the inside; DAST is **black-box** testing of the running application later, from the outside. SAST cannot find run-time and configuration problems; DAST cannot point to the exact line of code.

### Benefits of DevSecOps

1. Vulnerabilities are found early, when they are cheaper to fix.
2. Releases are faster and safer, because automated security checks remove late security bottlenecks.
3. The risk of security breaches is reduced.
4. Development, security and operations teams collaborate and share responsibility.
5. Compliance is checked continuously (compliance as code).

### Differences Between DevOps and DevSecOps

| Basis | DevOps | DevSecOps |
| --- | --- | --- |
| Teams | Development and operations | Development, security and operations |
| When security is handled | Usually at the end, by a separate team | In every stage of the pipeline, from the start (shift left) |
| Security testing | Manual or occasional | Automated and continuous (SAST, DAST, SCA, scanning) |
| Goal | Speed and reliability of delivery | Speed and reliability **with** security |
| Effect | Late security findings cause delays and rework | Fewer vulnerabilities reach production |

## References {#references}

**TutorialsPoint**

- [Git – Basic Concepts](https://www.tutorialspoint.com/git/git_basic_concepts.htm) — accessed 2026-11-07
- [Git – Basic Commands](https://www.tutorialspoint.com/git/git-basic-commands.htm) — accessed 2026-11-07
- [Difference between Git Fetch and Git Pull](https://tutorialspoint.com/difference-between-git-fetch-and-git-pull) — accessed 2026-11-07
- [Git – Merge vs. Rebase](https://www.tutorialspoint.com/git/git-rebase-vs-merge.htm) — accessed 2026-11-07
- [Git – Branching Workflows](https://www.tutorialspoint.com/git/git-branching-workflows.htm) — accessed 2026-11-07
- [DevOps – Quick Guide](https://www.tutorialspoint.com/devops/devops-quick-guide.htm) — accessed 2026-11-07 (traditional SDLC vs DevOps)
- [DevOps – Lifecycle](https://www.tutorialspoint.com/devops/devops-lifecycle.htm) — accessed 2026-11-07
- [DevOps – Continuous Deployment](https://www.tutorialspoint.com/devops/devops-continuous-deployment.htm) — accessed 2026-11-07
- [What is DevSecOps and Why it is Important?](https://www.tutorialspoint.com/what-is-devsecops-and-why-it-is-important) — accessed 2026-11-07

**GeeksforGeeks**

- [Version Control Systems](https://www.geeksforgeeks.org/git/version-control-systems/) — accessed 2026-11-07
- [Git Cheat Sheet](https://www.geeksforgeeks.org/git/git-cheat-sheet/) — accessed 2026-11-07
- [Difference Between Git Fetch and Git Pull](https://www.geeksforgeeks.org/git/git-difference-between-git-fetch-and-git-pull/) — accessed 2026-11-07
- [Difference Between Merging and Rebasing](https://www.geeksforgeeks.org/git/git-difference-between-merging-and-rebasing/) — accessed 2026-11-07
- [Difference Between Git Revert, Checkout and Reset](https://www.geeksforgeeks.org/git/git-difference-between-git-revert-checkout-and-reset/) — accessed 2026-11-07
- [Branching Strategies in Git](https://www.geeksforgeeks.org/git/branching-strategies-in-git/) — accessed 2026-11-07
- [Trunk-Based Development in Software Development](https://www.geeksforgeeks.org/devops/trunk-based-development-in-software-development/) — accessed 2026-11-07
- [What is DevOps?](https://www.geeksforgeeks.org/introduction-to-devops/) — accessed 2026-11-07
- [DevOps Lifecycle](https://www.geeksforgeeks.org/devops/devops-lifecycle/) — accessed 2026-11-07
- [DevOps Principles](https://www.geeksforgeeks.org/devops/devops-principles/) — accessed 2026-11-07
- [Introduction to CI/CD](https://www.geeksforgeeks.org/devops/what-is-ci-cd/) — accessed 2026-11-07
- [Agile Vs Waterfall Model](https://www.geeksforgeeks.org/software-engineering/agile-vs-waterfall/) — accessed 2026-11-07
- [What Is DevSecOps?](https://www.geeksforgeeks.org/devops/devsecops/) — accessed 2026-11-07
- [Difference Between DevOps and DevSecOps](https://www.geeksforgeeks.org/devops/difference-between-devops-and-devsecops/) — accessed 2026-11-07
- [DevSecOps Pipeline With Shift-Left Security](https://www.geeksforgeeks.org/devops/devsecops-pipeline-with-shift-left-security/) — accessed 2026-11-07
- [Difference between SAST and DAST](https://www.geeksforgeeks.org/software-engineering/difference-between-sast-and-dast/) — accessed 2026-11-07

**TpointTech**

- [Git Commands](https://www.tpointtech.com/git-commands) — accessed 2026-11-07
- [Git Fetch](https://www.tpointtech.com/git-fetch) — accessed 2026-11-07
- [Git Rebase](https://www.tpointtech.com/git-rebase) — accessed 2026-11-07
- [Git Flow](https://www.tpointtech.com/git-flow) — accessed 2026-11-07
- [Git Merge and Merge Conflict](https://www.tpointtech.com/git-merge-and-merge-conflict) — accessed 2026-11-07
- [DevOps Tutorial](https://www.tpointtech.com/devops) — accessed 2026-11-07 (history of DevOps)
- [DevOps Lifecycle](https://www.tpointtech.com/devops-lifecycle) — accessed 2026-11-07
- [DevOps vs Agile](https://www.tpointtech.com/devops-vs-agile) — accessed 2026-11-07
- [What is DevSecOps](https://www.tpointtech.com/what-is-devsecops) — accessed 2026-11-07

**Programiz**

- Programiz has no pages on version control, Git, DevOps or DevSecOps (checked 2026-11-07).

**Additional sources** (used where the reference websites are wrong, disagree, or do not cover the point)

- Scott Chacon and Ben Straub, *Pro Git*, 2nd ed., git-scm.com: [About Version Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control), [A Short History of Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git), [What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F), [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) and [Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) — accessed 2026-11-07
- Git reference manual: [git-reset](https://git-scm.com/docs/git-reset), [git-revert](https://git-scm.com/docs/git-revert), [git-pull](https://git-scm.com/docs/git-pull), [git-fetch](https://git-scm.com/docs/git-fetch), [git-switch](https://git-scm.com/docs/git-switch) and [git-stash](https://git-scm.com/docs/git-stash) — accessed 2026-11-07
- Vincent Driessen, [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/), 2010 — Git Flow — accessed 2026-11-07
- Gene Kim, [The Three Ways: The Principles Underpinning DevOps](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/), IT Revolution, 2012 — accessed 2026-11-07
- [Leading DevOps Practice and Principle Adoption](https://arxiv.org/pdf/2008.10515) — arXiv 2008.10515 (the CALMS principles) — accessed 2026-11-07
- All Git commands and outputs shown were run with Git 2.43.0 on Linux.

Issues found on the reference websites and how they were resolved:

1. GeeksforGeeks' cheat sheet says `git reset <commit>` resets the staging area and the working directory; that is `--hard`. The default (`--mixed`) resets only the staging area (git-reset documentation, checked by running Git).
2. GeeksforGeeks says `git revert` removes commits from the remote repository; it adds a new commit that undoes an earlier one, locally like any other commit (git-revert documentation).
3. GeeksforGeeks' and TutorialsPoint's fetch-vs-pull tables say that fetch updates the local branches and that pull applies changes to the remote; fetch updates only the remote-tracking branches, and pull changes the local branch (git-fetch and git-pull documentation).
4. GeeksforGeeks' merge-vs-rebase page says rebase "merges" a branch, and TutorialsPoint's rebase column shows `git merge` commands; rebase replays commits on a new base and does not merge.
5. TpointTech's merge-conflict page finishes a merge conflict with `git rebase --continue`; a merge conflict is finished with `git add` and `git commit` (Pro Git, checked by running Git).
6. TpointTech's Git Flow page merges hotfix branches into master only; Driessen's model merges them into master and develop.
7. GeeksforGeeks' "Difference between Agile and DevOps" page contains several wrong statements (for example, that DevOps is unrelated to software development), so it was not used; TpointTech's comparison was used instead.
8. TpointTech expands DORA as "DevOps Research and Assignment"; the correct name is DevOps Research and Assessment.
9. None of the reference websites describes the CALMS principles or the Three Ways; they are taken from Gene Kim's article and the arXiv paper listed above.
