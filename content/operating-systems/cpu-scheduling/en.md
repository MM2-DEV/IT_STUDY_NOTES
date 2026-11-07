---
description: CPU scheduling - job and processor scheduling (scheduling queues, long-, medium- and short-term schedulers, preemptive and non-preemptive scheduling, scheduling criteria and formulas) and the scheduling algorithms FCFS, SJF, SRTF, Priority, Round Robin, HRRN, multilevel queue and multilevel feedback queue, with worked examples, and starvation and aging (causes, algorithms that starve, aging examples, starvation vs deadlock).
updated: 2026-11-07
---

## Job and Processor Scheduling {#job-and-processor-scheduling}

### Definition

> **Process scheduling is the activity of the operating system that decides which process gets the CPU, and when.**

It removes the running process from the CPU and selects another process according to a particular strategy.

Scheduling is essential in a **multiprogramming** system: several processes are kept in memory, and when one has to wait (for example, for I/O), the CPU is given to another, so the CPU is never idle. In a uniprogramming system such as MS-DOS, the CPU simply sits idle while the single program waits.

**Job scheduling** decides which jobs are admitted into the system (loaded into memory); **processor (CPU) scheduling** decides which of the ready processes gets the CPU next.

### CPU–I/O Burst Cycle

A process alternates between using the CPU (a **CPU burst**) and waiting for I/O (an **I/O burst**).

1. An **I/O-bound** process spends more time doing I/O; it has **many short** CPU bursts.
2. A **CPU-bound** process spends more time computing; it has **a few long** CPU bursts.

A good mix of I/O-bound and CPU-bound processes keeps both the CPU and the I/O devices busy.

### Scheduling Queues

The OS keeps the PCBs of processes in queues:

1. **Job queue:** all the processes in the system (the job pool on disk).
2. **Ready queue:** the processes in main memory that are ready and waiting for the CPU.
3. **Device (I/O) queues:** the processes waiting for a particular I/O device.

As a process changes state, its PCB moves from one queue to another.

### Types of Schedulers

1. **Long-term scheduler (job scheduler):** selects jobs from the job pool and loads them into memory (New → Ready). It controls the **degree of multiprogramming** (the number of processes in memory) and tries to admit a balanced mix of I/O-bound and CPU-bound jobs. It runs infrequently (seconds or minutes). It is minimal or absent in time-sharing systems.
2. **Short-term scheduler (CPU scheduler):** selects one of the ready processes and allocates the CPU to it (Ready → Running), through the **dispatcher**. It runs very frequently (every few milliseconds), so it must be fast.
3. **Medium-term scheduler (swapper):** removes (**swaps out**) processes from memory to secondary storage and later swaps them back in. It **reduces the degree of multiprogramming** and is used in time-sharing systems when memory is short.

![Queueing diagram: job pool, ready queue, CPU, I/O queue and swapped-out processes with the three schedulers](/diagrams/operating-systems/scheduling-queues.svg)

| Basis | Long-term scheduler | Short-term scheduler | Medium-term scheduler |
| --- | --- | --- | --- |
| Also called | Job scheduler | CPU scheduler | Swapper (swapping scheduler) |
| Function | Loads jobs from disk into memory | Selects a ready process for the CPU | Swaps processes out of and into memory |
| State change | New → Ready | Ready → Running | Ready/Blocked ↔ Suspended |
| Frequency | Least frequent | Most frequent | In between (when memory is short) |
| Speed | Slowest | Fastest | In between |
| Degree of multiprogramming | Controls it | Little control | Reduces it |
| In time-sharing systems | Minimal or absent | Present | Present |

The [dispatcher](/topics/operating-systems/interrupts-and-os-organization#dispatcher) is the module that actually gives the CPU to the process chosen by the short-term scheduler.

### When Does CPU Scheduling Take Place?

1. A process switches from **running to waiting** (for example, an I/O request).
2. A process switches from **running to ready** (for example, a timer interrupt).
3. A process switches from **waiting to ready** (for example, I/O completion).
4. A process **terminates**.

### Types of CPU Scheduling

Depending on whether the operating system can take the CPU away from a running process, CPU scheduling is of **two types**:

1. Non-preemptive scheduling
2. Preemptive scheduling

#### 1. Non-preemptive Scheduling

> **In non-preemptive scheduling, once the CPU has been given to a process, the process keeps the CPU until it terminates or moves to the waiting state (for example, for I/O).**

The OS cannot take the CPU away from it.

Scheduling decisions are made only when a process **terminates** or **switches from running to waiting** (cases 1 and 4 above).

**Examples:** FCFS, SJF, non-preemptive Priority, HRRN.

#### 2. Preemptive Scheduling

> **In preemptive scheduling, the OS can take the CPU away (preempt it) from a running process before its CPU burst is complete — for example, when its time slice ends or a higher-priority process arrives — and give it to another process.**

Scheduling decisions are made in all four cases above, including **running → ready** and **waiting → ready**.

**Examples:** SRTF, preemptive Priority, Round Robin, multilevel queue, multilevel feedback queue.

#### Preemptive vs Non-preemptive Scheduling

| Basis | Preemptive scheduling | Non-preemptive scheduling |
| --- | --- | --- |
| CPU taken away | Yes, before the process finishes its burst | No, the process releases it itself |
| When the process leaves the CPU | Time slice ends, higher-priority arrival, termination or I/O | Only on termination or I/O wait |
| Context switches | More (more overhead) | Fewer |
| Response time | Better (suits interactive and time-sharing systems) | Can be poor (suits batch systems) |
| Flexibility | Flexible | Rigid |
| Starvation | Possible (low-priority or long processes) | Possible (SJF, Priority) |
| Examples | SRTF, preemptive Priority, Round Robin, MLQ, MLFQ | FCFS, SJF, non-preemptive Priority, HRRN |

### Scheduling Criteria

| Criterion | Meaning | Goal |
| --- | --- | --- |
| CPU utilization | Percentage of time the CPU is busy | Maximize |
| Throughput | Number of processes completed per unit time | Maximize |
| Turnaround time | Time from arrival (submission) to completion | Minimize |
| Waiting time | Total time spent waiting in the ready queue | Minimize |
| Response time | Time from arrival until the process first gets the CPU (first response) | Minimize |
| Fairness | Each process gets a fair share of the CPU | Ensure |

### Formulas

> **Turnaround Time (TAT) = Completion Time (CT) − Arrival Time (AT)**
>
> **Waiting Time (WT) = Turnaround Time (TAT) − Burst Time (BT)**
>
> **Response Time (RT) = Time of first CPU allocation − Arrival Time (AT)**
>
> **Average TAT = (sum of all TATs) ÷ n**, **Average WT = (sum of all WTs) ÷ n**
>
> **Throughput = n ÷ (total time to complete the n processes)**
>
> **CPU utilization = (CPU busy time ÷ total time) × 100%**

where:

- **Arrival Time (AT)** = the time the process enters the ready queue,
- **Burst Time (BT)** = the CPU time the process needs,
- **Completion Time (CT)** = the time the process finishes,
- **n** = the number of processes.

## Scheduling Algorithms {#scheduling-algorithms}

A **CPU scheduling algorithm** decides which process in the ready queue gets the CPU next. Like CPU scheduling itself, the algorithms are of **two types** — non-preemptive and preemptive (see [Types of CPU Scheduling](#job-and-processor-scheduling)):

**A. Non-preemptive scheduling algorithms**

1. First-Come, First-Served (FCFS)
2. Shortest Job First (SJF)
3. Non-preemptive Priority Scheduling
4. Highest Response Ratio Next (HRRN)

**B. Preemptive scheduling algorithms**

1. Shortest Remaining Time First (SRTF) — preemptive SJF
2. Preemptive Priority Scheduling
3. Round Robin (RR)
4. Multilevel Queue (MLQ) Scheduling
5. Multilevel Feedback Queue (MLFQ) Scheduling

SJF and Priority scheduling have both forms: non-preemptive SJF is simply called SJF, and preemptive SJF is called SRTF.

**Example data.** Unless stated otherwise, the examples below use the same four processes (times in milliseconds):

| Process | Arrival Time (AT) | Burst Time (BT) |
| --- | --- | --- |
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

### A. Non-preemptive Scheduling Algorithms

#### 1. First-Come, First-Served (FCFS)

The process that requests the CPU **first** gets the CPU first. It is implemented with a **FIFO queue**. FCFS is **non-preemptive**.

**Example:**

Gantt chart:

![FCFS Gantt chart: P1 0–5, P2 5–8, P3 8–16, P4 16–22](/diagrams/operating-systems/gantt-fcfs.svg)

| Process | AT | BT | CT | TAT = CT − AT | WT = TAT − BT |
| --- | --- | --- | --- | --- | --- |
| P1 | 0 | 5 | 5 | 5 | 0 |
| P2 | 1 | 3 | 8 | 7 | 4 |
| P3 | 2 | 8 | 16 | 14 | 6 |
| P4 | 3 | 6 | 22 | 19 | 13 |

- Average TAT = (5 + 7 + 14 + 19) ÷ 4 = 45 ÷ 4 = **11.25 ms**
- Average WT = (0 + 4 + 6 + 13) ÷ 4 = 23 ÷ 4 = **5.75 ms**
- Throughput = 4 processes ÷ 22 ms ≈ **0.18 process per ms**; CPU utilization = 22 ÷ 22 × 100% = **100%** (the CPU is never idle).

**Convoy effect:** when one long process is ahead of many short processes, all the short processes have to wait behind it. Example: P1 (BT 24), P2 (BT 3) and P3 (BT 3), all arriving at time 0.

1. Order P1, P2, P3: WT = 0, 24, 27 → average WT = 51 ÷ 3 = **17 ms**.
2. Order P2, P3, P1: WT = 0, 3, 6 → average WT = 9 ÷ 3 = **3 ms**.

- **Advantages:** simplest to understand and implement; no starvation (every process eventually runs); low overhead.
- **Disadvantages:** average waiting time is often long; convoy effect; not suitable for time-sharing systems; poor for short and I/O-bound processes.

#### 2. Shortest Job First (SJF)

The CPU is given to the process with the **smallest next CPU burst**. If two processes have the same burst, FCFS breaks the tie. SJF (also called **Shortest Job Next**) is normally **non-preemptive**.

**Example:**

At time 0 only P1 has arrived, so P1 runs to completion (0–5). At time 5, P2 (3), P3 (8) and P4 (6) are waiting: P2 is shortest, then P4, then P3.

![SJF Gantt chart: P1 0–5, P2 5–8, P4 8–14, P3 14–22](/diagrams/operating-systems/gantt-sjf.svg)

| Process | AT | BT | CT | TAT | WT |
| --- | --- | --- | --- | --- | --- |
| P1 | 0 | 5 | 5 | 5 | 0 |
| P2 | 1 | 3 | 8 | 7 | 4 |
| P3 | 2 | 8 | 22 | 20 | 12 |
| P4 | 3 | 6 | 14 | 11 | 5 |

- Average TAT = 43 ÷ 4 = **10.75 ms**
- Average WT = 21 ÷ 4 = **5.25 ms**

- **Advantages:** gives the **minimum average waiting time** for a given set of processes (it is provably optimal); good throughput.
- **Disadvantages:** the length of the next CPU burst must be known in advance, which is usually impossible (it has to be predicted); long processes may **starve** if short ones keep arriving.

**Predicting the next CPU burst (exponential averaging)**

> **τₙ₊₁ = α tₙ + (1 − α) τₙ**

where:

- **τₙ₊₁** = predicted length of the next CPU burst,
- **tₙ** = actual length of the most recent (nth) CPU burst,
- **τₙ** = the previous prediction,
- **α** = a weight, 0 ≤ α ≤ 1.

If α = 0, recent history has no effect (τₙ₊₁ = τₙ). If α = 1, only the most recent burst counts (τₙ₊₁ = tₙ). Usually α = ½.

**Example:** α = 0.5, initial prediction τ₁ = 10 ms, actual bursts 6, 4, 6, 4 ms.

1. τ₂ = 0.5 × 6 + 0.5 × 10 = 3 + 5 = **8 ms**
2. τ₃ = 0.5 × 4 + 0.5 × 8 = 2 + 4 = **6 ms**
3. τ₄ = 0.5 × 6 + 0.5 × 6 = 3 + 3 = **6 ms**
4. τ₅ = 0.5 × 4 + 0.5 × 6 = 2 + 3 = **5 ms**

#### 3. Non-preemptive Priority Scheduling

Each process has a **priority** number, and the CPU is given to the process with the **highest priority**. Equal priorities are scheduled FCFS. In these notes, a **smaller number means a higher priority** (some books use the opposite convention, so always check the question). SJF is a special case of priority scheduling in which the priority is the (predicted) next CPU burst — the shorter the burst, the higher the priority.

In **non-preemptive** priority scheduling, a newly arrived high-priority process **waits** until the running process finishes its CPU burst.

**Example:** the same four processes with priorities P1 = 3, P2 = 2, P3 = 1, P4 = 4.

P1 runs 0–5. At 5, P3 (priority 1) is highest, then P2 (2), then P4 (4).

![Non-preemptive priority Gantt chart: P1 0–5, P3 5–13, P2 13–16, P4 16–22](/diagrams/operating-systems/gantt-priority-np.svg)

| Process | Priority | AT | BT | CT | TAT | WT |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | 3 | 0 | 5 | 5 | 5 | 0 |
| P2 | 2 | 1 | 3 | 16 | 15 | 12 |
| P3 | 1 | 2 | 8 | 13 | 11 | 3 |
| P4 | 4 | 3 | 6 | 22 | 19 | 13 |

Average TAT = 50 ÷ 4 = **12.5 ms**; average WT = 28 ÷ 4 = **7 ms**.

#### 4. Highest Response Ratio Next (HRRN)

HRRN is a **non-preemptive** algorithm. Whenever the CPU becomes free, it calculates the **response ratio** of every waiting process and selects the process with the **highest** ratio:

> **Response Ratio (RR) = (W + S) ÷ S**

where:

- **W** = the time the process has waited so far,
- **S** = the burst (service) time of the process.

Short jobs get a high ratio, but the ratio of a waiting long job also keeps rising, so HRRN favours short jobs **without starving** long ones (it is a modification of SJF).

**Example:** P1 (AT 0, BT 6), P2 (AT 4, BT 10), P3 (AT 4, BT 4), P4 (AT 8, BT 5).

1. t = 0: only P1 → P1 runs 0–6.
2. t = 6: P2 ratio = (2 + 10) ÷ 10 = **1.2**; P3 ratio = (2 + 4) ÷ 4 = **1.5** → P3 runs 6–10.
3. t = 10: P2 ratio = (6 + 10) ÷ 10 = **1.6**; P4 ratio = (2 + 5) ÷ 5 = **1.4** → P2 runs 10–20.
4. t = 20: P4 runs 20–25.

![HRRN Gantt chart: P1 0–6, P3 6–10, P2 10–20, P4 20–25](/diagrams/operating-systems/gantt-hrrn.svg)

| Process | AT | BT | CT | TAT | WT |
| --- | --- | --- | --- | --- | --- |
| P1 | 0 | 6 | 6 | 6 | 0 |
| P2 | 4 | 10 | 20 | 16 | 6 |
| P3 | 4 | 4 | 10 | 6 | 2 |
| P4 | 8 | 5 | 25 | 17 | 12 |

Average TAT = 45 ÷ 4 = **11.25 ms**; average WT = 20 ÷ 4 = **5 ms**.

- **Advantages:** favours short jobs like SJF; prevents starvation; few context switches.
- **Disadvantages:** burst times must be known; calculating the ratios adds overhead.

### B. Preemptive Scheduling Algorithms

#### 1. Shortest Remaining Time First (SRTF)

SRTF is the **preemptive version of SJF** (also called preemptive SJF). When a new process arrives, its burst is compared with the **remaining time** of the running process; if it is shorter, the running process is preempted.

**Example:**

1. t = 0: only P1 (5) → P1 runs.
2. t = 1: P2 arrives with 3; P1 has 4 left → 3 < 4, so P2 preempts P1.
3. t = 2: P3 (8) arrives; P2 has 2 left → P2 continues. t = 3: P4 (6) arrives → P2 (1 left) continues.
4. t = 4: P2 finishes. Remaining: P1 4, P3 8, P4 6 → P1 runs 4–8.
5. t = 8: P4 (6) runs 8–14, then P3 (8) runs 14–22.

![SRTF Gantt chart: P1 0–1, P2 1–4, P1 4–8, P4 8–14, P3 14–22](/diagrams/operating-systems/gantt-srtf.svg)

| Process | AT | BT | CT | TAT | WT |
| --- | --- | --- | --- | --- | --- |
| P1 | 0 | 5 | 8 | 8 | 3 |
| P2 | 1 | 3 | 4 | 3 | 0 |
| P3 | 2 | 8 | 22 | 20 | 12 |
| P4 | 3 | 6 | 14 | 11 | 5 |

- Average TAT = 42 ÷ 4 = **10.5 ms**
- Average WT = 20 ÷ 4 = **5 ms** (lower than non-preemptive SJF's 5.25 ms)

- **Advantages:** minimum average waiting time; short jobs finish quickly.
- **Disadvantages:** needs the burst times in advance; more context switches; long processes can starve.

#### 2. Preemptive Priority Scheduling

In **preemptive** priority scheduling, a newly arrived process whose priority is **higher** than that of the running process **preempts** it (takes the CPU at once). Priorities work as in [non-preemptive priority scheduling](#scheduling-algorithms).

**Example:** the same four processes and priorities (P1 = 3, P2 = 2, P3 = 1, P4 = 4).

P1 runs 0–1; P2 (priority 2) preempts it at 1; P3 (priority 1) preempts P2 at 2 and runs to 10; then P2 finishes (10–12), P1 finishes (12–16) and P4 runs (16–22).

![Preemptive priority Gantt chart: P1 0–1, P2 1–2, P3 2–10, P2 10–12, P1 12–16, P4 16–22](/diagrams/operating-systems/gantt-priority-p.svg)

| Process | CT | TAT | WT |
| --- | --- | --- | --- |
| P1 | 16 | 16 | 11 |
| P2 | 12 | 11 | 8 |
| P3 | 10 | 8 | 0 |
| P4 | 22 | 19 | 13 |

Average TAT = 54 ÷ 4 = **13.5 ms**; average WT = 32 ÷ 4 = **8 ms**.

**Starvation and aging (both forms of priority scheduling)**

- **Starvation (indefinite blocking):** a low-priority process may **wait forever** because higher-priority processes keep arriving.
- **Aging:** the solution to starvation — the priority of a process that waits for a long time is **gradually increased** (for example, by 1 every few minutes), so it eventually gets the CPU (see [Starvation and Aging](#starvation-and-aging)).

- **Advantages of priority scheduling:** important processes run first; priorities can be set by importance, urgency, memory needs, time limits and so on.
- **Disadvantages of priority scheduling:** starvation of low-priority processes; deciding the priorities is difficult.

#### 3. Round Robin (RR)

**Round Robin (RR)** is a preemptive CPU-scheduling algorithm, designed for **time-sharing** systems, in which the ready processes are given the CPU in turn, each for a small fixed time.

Each process gets a small fixed unit of CPU time called the **time quantum** (time slice). The ready queue is a **circular FIFO queue**.

1. The scheduler takes the first process from the ready queue and runs it for at most one quantum.
2. If the process finishes (or blocks) before the quantum ends, it releases the CPU voluntarily.
3. If the quantum expires first, the process is **preempted** and put at the **tail** of the ready queue.
4. A newly arriving process is added to the tail of the ready queue. (In these examples, a process arriving at the same moment that another is preempted is queued first.)

Round Robin is **preemptive**: a process is taken off the CPU when its time quantum expires.

**Example:** the same four processes with **quantum = 3 ms**.

| Time | Runs | Ready queue after this slice |
| --- | --- | --- |
| 0–3 | P1 (2 left) | P2, P3, P4, P1 |
| 3–6 | P2 (done) | P3, P4, P1 |
| 6–9 | P3 (5 left) | P4, P1, P3 |
| 9–12 | P4 (3 left) | P1, P3, P4 |
| 12–14 | P1 (done) | P3, P4 |
| 14–17 | P3 (2 left) | P4, P3 |
| 17–20 | P4 (done) | P3 |
| 20–22 | P3 (done) | — |

![Round Robin Gantt chart with quantum 3](/diagrams/operating-systems/gantt-rr.svg)

| Process | AT | BT | CT | TAT | WT | RT |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | 0 | 5 | 14 | 14 | 9 | 0 |
| P2 | 1 | 3 | 6 | 5 | 2 | 2 |
| P3 | 2 | 8 | 22 | 20 | 12 | 4 |
| P4 | 3 | 6 | 20 | 17 | 11 | 6 |

- Average TAT = 56 ÷ 4 = **14 ms**
- Average WT = 34 ÷ 4 = **8.5 ms**
- Average response time = (0 + 2 + 4 + 6) ÷ 4 = **3 ms** — much better than FCFS (5.75 ms), which is why RR suits interactive systems.

**Effect of the time quantum:**

1. **Very large quantum:** RR behaves like **FCFS**.
2. **Very small quantum:** too many **context switches**, so the overhead is high and the CPU efficiency falls.

- **Advantages:** fair — every process gets an equal share of the CPU; **no starvation**; good response time; best for time-sharing.
- **Disadvantages:** average waiting time is often long; performance depends heavily on the quantum size; context-switch overhead.

#### 4. Multilevel Queue (MLQ) Scheduling

The ready queue is divided into **several separate queues**, for example:

1. System processes (highest priority)
2. Interactive (foreground) processes
3. Batch (background) processes (lowest priority)

Each process is **permanently assigned** to one queue (by its type, priority or memory size), and **each queue has its own scheduling algorithm** (for example, RR for interactive processes and FCFS for batch processes). Scheduling between the queues is done by:

1. **Fixed-priority preemptive scheduling:** a lower queue runs only when all higher queues are empty; a process arriving in a higher queue preempts a lower-queue process.
2. **Time slicing:** each queue gets a fixed share of CPU time (for example, 80% for the foreground queue in RR and 20% for the background queue in FCFS).

- **Advantages:** different algorithms for different kinds of processes; low scheduling overhead.
- **Disadvantages:** inflexible — processes cannot move between queues; processes in the lower queues may **starve**.

#### 5. Multilevel Feedback Queue (MLFQ) Scheduling

MLFQ is like MLQ, but processes **can move between queues**. The scheduler watches each process's behaviour:

1. A new process enters the **highest-priority** queue, which has the **smallest quantum**.
2. If a process uses its whole quantum, it is **moved down** to a lower-priority queue (CPU-bound processes sink).
3. A process that releases the CPU early (for example, for I/O) stays in its queue (I/O-bound and interactive processes stay high).
4. A process that waits too long in a lower queue is **moved up** (**aging**), which prevents starvation.

**Example:** three queues — Q0: RR with quantum 8 ms; Q1: RR with quantum 16 ms; Q2: FCFS. A process with a CPU burst of 30 ms runs 8 ms in Q0, is moved to Q1 and runs 16 ms, is moved to Q2, and finishes its remaining 30 − 8 − 16 = 6 ms there.

![Multilevel feedback queue with three queues: RR quantum 8, RR quantum 16 and FCFS](/diagrams/operating-systems/mlfq.svg)

An MLFQ scheduler is defined by these parameters:

1. The number of queues.
2. The scheduling algorithm of each queue.
3. The method used to decide when to **upgrade** a process to a higher queue.
4. The method used to decide when to **demote** a process to a lower queue.
5. The method used to decide which queue a new process enters.

- **Advantages:** the most flexible algorithm; favours short and I/O-bound processes; prevents starvation through aging.
- **Disadvantages:** the most complex algorithm; choosing the best values for all the parameters is difficult.

### Comparison of the Algorithms (Same Four Processes)

| Algorithm | Average TAT (ms) | Average WT (ms) |
| --- | --- | --- |
| FCFS | 11.25 | 5.75 |
| SJF (non-preemptive) | 10.75 | 5.25 |
| SRTF | 10.5 | **5** (lowest) |
| Priority, non-preemptive | 12.5 | 7 |
| Priority, preemptive | 13.5 | 8 |
| Round Robin (q = 3) | 14 | 8.5 |

### Summary Table

| Algorithm | Preemptive? | Selection basis | Starvation | Main point |
| --- | --- | --- | --- | --- |
| FCFS | No | Arrival order | No | Simple; convoy effect |
| SJF | No | Shortest burst | Yes | Minimum average waiting time |
| SRTF | Yes | Shortest remaining time | Yes | Preemptive SJF |
| Priority | Either | Highest priority | Yes (solved by aging) | Important processes first |
| Round Robin | Yes | Arrival order + time quantum | No | Best for time-sharing |
| HRRN | No | Highest response ratio | No | SJF without starvation |
| Multilevel Queue | Usually | Queue priority | Yes | Fixed queues |
| Multilevel Feedback Queue | Yes | Queue priority; processes move | No (with aging) | Most flexible and complex |

## Starvation and Aging {#starvation-and-aging}

### Starvation

**Starvation** (indefinite blocking) is the condition in which a ready process waits indefinitely for the CPU, or for a resource, because other processes — usually of higher priority — are always chosen before it.

The starving process is ready to run, but it never gets its turn. For example, if new high-priority processes keep arriving, a low-priority process may never be scheduled.

#### Causes of Starvation

1. **Priority scheduling** with a continuous stream of higher-priority processes.
2. **Shortest Job First (SJF) and Shortest Remaining Time First (SRTF)** when short jobs keep arriving, so long jobs keep waiting.
3. **Random selection** of processes, in which one process may be passed over again and again.
4. **Scarce resources** or biased resource allocation.
5. Choosing the **same process as the victim** again and again when deadlocks are recovered from by preemption or rollback.

#### Scheduling Algorithms and Starvation

| Algorithm | Can it cause starvation? |
| --- | --- |
| Priority scheduling (preemptive and non-preemptive) | Yes — low-priority processes |
| Shortest Job First (SJF) | Yes — long processes |
| Shortest Remaining Time First (SRTF) | Yes — long processes |
| Multilevel queue (fixed priority between queues) | Yes — processes in the lower queues |
| First-Come, First-Served (FCFS) | No — every process eventually runs |
| Round Robin (RR) | No — every process gets a time quantum in turn |
| Highest Response Ratio Next (HRRN) | No — the response ratio of a waiting process keeps rising |

### Aging

**Aging** is a technique that gradually increases the priority of a process the longer it waits, so that every process eventually gets the CPU.

Aging is the standard solution to starvation in priority-based scheduling. The priority of a waiting process is raised by a fixed step after every fixed interval of waiting time (or in proportion to its waiting time). In a multilevel feedback queue, aging is done by moving a process that has waited too long to a higher-priority queue.

**Example 1:** priorities range from **127 (lowest)** to **0 (highest)**, and the priority of a waiting process is increased by 1 every 15 minutes. A process that starts with priority 127 reaches priority 0 after at most:

> **127 × 15 minutes = 1,905 minutes = 31.75 hours**

So even the lowest-priority process gets the highest priority, and runs, in no more than about 32 hours.

**Example 2:** a smaller number means a higher priority. New processes keep arriving with priority **5**. A waiting process P starts with priority **15**, and aging lowers its priority number by 1 for every 10 ms it waits:

| Waiting time (ms) | 0 | 10 | 20 | … | 90 | 100 | 110 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Priority of P | 15 | 14 | 13 | … | 6 | 5 | 4 |

At 100 ms, P has the same priority as the new processes; at **110 ms** its priority (4) is higher than every new process, so it is scheduled. Without aging, P would wait for ever.

**Advantages of aging:**

1. Low-priority processes eventually complete; starvation is prevented.
2. Scheduling becomes fairer.

**Disadvantages of aging:**

1. The operating system has extra work to update the priorities.
2. The rate of aging must be chosen carefully: too slow, and processes still wait a long time; too fast, and the original priorities lose their meaning.

### Differences Between Starvation and Deadlock

| Basis | Deadlock | Starvation |
| --- | --- | --- |
| Definition | Two or more processes wait for ever, each for a resource held by another | A process waits indefinitely because other processes keep getting the CPU or the resource |
| State of the processes | All the processes involved are blocked; none can proceed | Other processes keep running; only the starving process waits |
| Resources | The blocked processes hold resources that the others need | The resources are continuously used by higher-priority processes |
| Conditions | Mutual exclusion, hold and wait, no preemption and circular wait must all hold together | No fixed conditions; caused by unfair scheduling or resource allocation |
| Waiting | Permanent unless the system takes action | Indefinite; it can end if the load falls |
| Solution | Prevention, avoidance (Banker's algorithm), detection and recovery | Aging |
| Severity | More severe: the processes involved stop completely | Less severe: the system keeps working, but some processes are delayed |
| Relationship | Every deadlock means that the deadlocked processes starve | Starvation does not mean deadlock |

## References {#references}

**TutorialsPoint**

- [Process Scheduling](https://www.tutorialspoint.com/operating_system/os_process_scheduling.htm) — accessed 2026-11-03
- [Process Schedulers](https://www.tutorialspoint.com/operating_system/os_process_schedulers.htm) — accessed 2026-11-03
- [Scheduling Algorithms](https://www.tutorialspoint.com/operating_system/os_process_scheduling_algorithms.htm) — accessed 2026-11-03 (it labels FCFS and SJN "non-preemptive, pre-emptive"; both are non-preemptive. Its examples use the same four processes as these notes, and its FCFS (5.75), SJN (5.25) and Round Robin, q = 3 (8.5) averages agree with ours)
- [HRRN Scheduling Algorithm](https://www.tutorialspoint.com/operating_system/os_hrrn_scheduling_algorithm.htm) — accessed 2026-11-03
- [Starvation and Aging](https://www.tutorialspoint.com/operating_system/os_starvation_and_aging.htm) — accessed 2026-11-03
- [Turn Around Time & Waiting Time](https://www.tutorialspoint.com/operating_system/os_tat_wat.htm) — accessed 2026-11-03
- [Predicting Burst Time in SJF Scheduling](https://www.tutorialspoint.com/operating_system/os_predicting_burst_time_in_sjf_scheduling.htm) — accessed 2026-11-03
- [Operating System – Starvation and Aging](https://www.tutorialspoint.com/operating_system/os_starvation_and_aging.htm) — accessed 2026-11-07
- [Which scheduling algorithms lead to starvation?](https://www.tutorialspoint.com/article/what-are-the-types-of-process-scheduling-algorithms-and-which-algorithms-lead-to-starvation) — accessed 2026-11-07
- [Difference Between Deadlock and Starvation in OS](https://www.tutorialspoint.com/difference-between-deadlock-and-starvation-in-os) — accessed 2026-11-07

**GeeksforGeeks**

- [CPU Scheduling in Operating Systems](https://www.geeksforgeeks.org/operating-systems/cpu-scheduling-in-operating-systems/) — accessed 2026-11-03
- [Advantages and Disadvantages of various CPU scheduling algorithms](https://www.geeksforgeeks.org/operating-systems/advantages-and-disadvantages-of-various-cpu-scheduling-algorithms/) — accessed 2026-11-03
- [Multilevel Queue (MLQ) CPU Scheduling](https://www.geeksforgeeks.org/operating-systems/multilevel-queue-mlq-cpu-scheduling/) — accessed 2026-11-03
- [Multilevel Feedback Queue Scheduling (MLFQ)](https://www.geeksforgeeks.org/operating-systems/multilevel-feedback-queue-scheduling-mlfq-cpu-scheduling/) — accessed 2026-11-03
- [Starvation and Aging in Operating Systems](https://www.geeksforgeeks.org/operating-systems/starvation-and-aging-in-operating-systems/) — accessed 2026-11-07
- [Deadlock vs Starvation in OS](https://www.geeksforgeeks.org/operating-systems/difference-between-deadlock-and-starvation-in-os/) — accessed 2026-11-07

**TpointTech**

- [CPU Scheduling in Operating System](https://www.tpointtech.com/cpu-scheduling-in-operating-system) — accessed 2026-11-03
- [CPU Scheduling Algorithms in Operating Systems](https://www.tpointtech.com/cpu-scheduling-algorithms-in-operating-systems) — accessed 2026-11-03 (several of its tables have errors: its FCFS table puts completion times in the TAT and WT columns, its SJF tables use arrival times that differ from its input table, and its priority example gives P4 a TAT of 11 instead of 12)
- [Difference between Scheduler and Dispatcher](https://www.tpointtech.com/scheduler-vs-dispatcher) — accessed 2026-11-03
- [Starvation and Aging in Operating Systems](https://www.tpointtech.com/starvation-and-aging-in-operating-systems) — accessed 2026-11-07
- [Difference between Deadlock and Starvation](https://www.tpointtech.com/deadlock-vs-starvation) — accessed 2026-11-07

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

All Gantt charts and averages in these notes were computed with a scheduling simulator script and checked by hand.

Issues found on the reference websites (starvation and aging) and how they were resolved:

1. GeeksforGeeks and TpointTech give "circular wait" as another name for deadlock and "livelock" as another name for starvation; circular wait is one of the four conditions of deadlock, and livelock is a different condition, so that row was not used.
2. TpointTech says starvation can be used to break a deadlock; this is wrong and was not used.
3. TutorialsPoint's aging example states "+1 per time unit" but its priorities do not change that way; the 127-to-0 example (GeeksforGeeks, TpointTech) and a separately worked example are used instead.
4. GeeksforGeeks says aging is combined with round-robin; round-robin has no priorities — aging applies to priority-based schedulers and multilevel feedback queues (Silberschatz).
