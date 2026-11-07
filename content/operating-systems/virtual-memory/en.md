---
description: Virtual memory - virtual memory concepts, demand paging and page faults with effective access time, virtual storage management (fetch, placement and replacement policies, frame allocation, thrashing, working set and page-fault frequency), and page replacement strategies (FIFO, Optimal, LRU, LRU approximations, LFU, MFU) with Belady's anomaly, and page fault handling in detail, with worked examples.
updated: 2026-11-07
---

## Virtual Memory Concepts {#virtual-memory-concepts}

### Definition

> **Virtual memory is a memory-management technique that lets a process run even when it is not completely in main memory.**

It gives each process the illusion of a very large, contiguous memory (its virtual address space) by keeping only the parts in use in RAM and the rest on secondary storage (disk).

Part of the disk (the **swap space** or **backing store**) is used as an extension of main memory. The mapping between virtual and physical addresses is kept in the page table.

### Why Virtual Memory Works

Programs do not need all their code and data at the same time — for example, error-handling routines, unused options and large arrays are rarely all used together. Programs also show **locality of reference**: they use a small set of pages for a while, then move on to another set.

### Benefits of Virtual Memory

1. Programs **larger than physical memory** can run.
2. **More processes** can be in memory at the same time (higher degree of multiprogramming), so CPU utilization and throughput increase.
3. **Less I/O** is needed to load or swap a program, because only the needed parts are loaded.
4. Programmers do not have to worry about the size of physical memory (no overlays).
5. Processes can **share** pages (for example, shared libraries), and each process has its own isolated address space.

### Disadvantages

1. Accessing a page that is on disk is very slow, so frequent page faults reduce performance.
2. It is complex to implement (page tables, page faults, replacement).
3. It can lead to **thrashing**.

### Implementation

Virtual memory is implemented by:

1. **Demand paging** (most common), and
2. **Demand segmentation**.

### Demand Paging

> **Demand paging is a technique in which a page is brought into main memory only when it is needed (referenced) during execution, not in advance.**

1. The pager that brings pages in only on demand is called a **lazy swapper** (lazy pager): it never swaps a page into memory unless the page will be needed.
2. A **valid–invalid bit** in each page-table entry shows whether the page is in memory:
   1. **Valid (v):** the page is legal and in memory.
   2. **Invalid (i):** the page is not in the process's address space, or it is valid but currently on disk.
3. **Pure demand paging:** a process starts with **no** pages in memory; even the first instruction causes a page fault.
4. **Pre-paging:** some pages that are expected to be needed soon are loaded in advance (to reduce the initial page faults).

### Page Fault

> **A page fault is a trap (interrupt) that occurs when a process accesses a page that is not currently in main memory, that is, a page whose page-table entry is marked invalid.**

**Steps in handling a page fault:**

1. The process references a page; the page-table entry is **invalid**, so the hardware **traps** to the OS (page fault).
2. The OS checks an internal table (in the PCB): if the reference was **illegal**, the process is terminated; if it was **valid** but the page is on disk, it continues.
3. The OS finds a **free frame** (if there is none, a **page-replacement algorithm** selects a victim frame).
4. The OS schedules a **disk read** to bring the page into the frame.
5. When the read completes, the OS updates the page table (frame number, bit = **valid**).
6. The **instruction that caused the fault is restarted**; the process continues as if the page had always been in memory.

![The six steps in handling a page fault](/diagrams/operating-systems/page-fault-steps.svg)

Page faults are explained in full, with the worst-case sequence and more examples, in [Page Fault Handling](#page-fault-handling).

### Performance of Demand Paging (Effective Access Time)

> **EAT = (1 − p) × ma + p × page-fault service time**

where:

- **p** = page-fault rate (probability of a page fault), 0 ≤ p ≤ 1,
- **ma** = memory-access time,
- **page-fault service time** = time to handle a page fault (mostly the disk read, typically milliseconds).

**Example:** ma = 200 ns, page-fault service time = 8 ms = 8,000,000 ns, and one access out of 1,000 causes a page fault (p = 0.001).

1. EAT = (1 − 0.001) × 200 + 0.001 × 8,000,000
2. = 0.999 × 200 + 8,000 = 199.8 + 8,000
3. = **8,199.8 ns ≈ 8.2 µs** — about **40 times slower** than the 200 ns memory access.

**How low must p be for less than 10% slowdown?** We need EAT < 220 ns:

1. 220 > 200 + p × (8,000,000 − 200), so 20 > 7,999,800 p.
2. p < 20 ÷ 7,999,800 ≈ **0.0000025** — fewer than **one page fault in about 400,000 accesses**.

So the page-fault rate must be kept extremely low.

## Virtual Storage Management {#virtual-storage-management}

**Virtual storage management** is the set of policies the OS uses to manage virtual memory:

1. **Fetch policy:** **when** to bring a page into memory — **demand paging** (only when referenced) or **pre-paging** (anticipated pages in advance).
2. **Placement policy:** **where** to put the page in main memory (with paging, any free frame).
3. **Replacement policy:** **which** page to remove when no frame is free (see [Page Replacement Strategies](#page-replacement-strategies)).
4. **Frame-allocation policy:** **how many** frames each process gets.

### Allocation of Frames

Frame-allocation algorithms are of three types:

1. **Equal allocation:** with m frames and n processes, each process gets **m ÷ n** frames.
2. **Proportional allocation:** frames are given in proportion to process size:

> **aᵢ = (sᵢ ÷ S) × m**

where:

- **aᵢ** = number of frames allocated to process i,
- **sᵢ** = size (virtual memory) of process i,
- **S** = Σ sᵢ, the total size of all processes,
- **m** = total number of available frames.

**Example:** m = 100 frames; process P1 is 20 pages, P2 is 120 pages, so S = 140.

1. Equal allocation: 100 ÷ 2 = **50** frames each — P1 needs only 20, so 30 are wasted.
2. Proportional allocation: a₁ = 20 ÷ 140 × 100 ≈ 14.3 → **14** frames; a₂ = 120 ÷ 140 × 100 ≈ 85.7 → **86** frames.

The third type of frame allocation:

3. **Priority allocation:** high-priority processes get more frames (frames are allocated by priority, or by a combination of size and priority).

### Types of Page Replacement Scope: Global vs Local

| Basis | Local replacement | Global replacement |
| --- | --- | --- |
| Victim frame chosen from | The faulting process's own frames | Any process's frames |
| Number of frames per process | Fixed | Changes over time |
| Page-fault rate of a process | Controlled by the process itself | Affected by other processes |
| Throughput | Lower | Higher (more commonly used) |

### Thrashing

> **Thrashing is a situation in which a process (or the whole system) spends more time paging — swapping pages in and out — than executing.**

**Cause:** if a process does not have enough frames to hold the pages it is actively using, it faults again and again, replacing pages that it will need right away.

**The vicious cycle:**

1. CPU utilization is low, so the OS increases the **degree of multiprogramming** (adds more processes).
2. With global replacement, the new processes take frames from the others.
3. All processes fault more and wait for the paging disk; the ready queue empties.
4. CPU utilization falls further, so the OS adds even more processes.

As the degree of multiprogramming increases, CPU utilization rises up to a maximum; beyond that point thrashing sets in and **CPU utilization drops sharply**.

![Graph of CPU utilization against degree of multiprogramming, falling sharply when thrashing begins](/diagrams/operating-systems/thrashing.svg)

**Causes of thrashing:**

1. A high degree of multiprogramming.
2. Too few frames per process (insufficient physical memory).
3. Poor page-replacement policy and global replacement.

**Handling thrashing:**

1. **Local (or priority) replacement:** one thrashing process cannot steal frames from others (limits the damage).
2. **Working-set model** — keep each process's working set in memory.
3. **Page-fault frequency (PFF)** control.
4. **Reduce the degree of multiprogramming** — suspend (swap out) some processes.

### Locality Model and Working-Set Model

A **locality** is a set of pages that are actively used together (for example, a function with its local variables and the data it uses).

A program moves from one locality to another as it runs.

The **working set** of a process is the set of pages referenced in the most recent **Δ** page references (Δ is the **working-set window**):

1. If Δ is too small, the working set does not cover the whole locality.
2. If Δ is too large, it covers several localities.
3. If Δ = ∞, it is the set of all pages the process has touched.

If **WSSᵢ** is the working-set size of process i, the total demand for frames is:

> **D = Σ WSSᵢ**

where m is the total number of available frames:

1. If **D > m**, thrashing will occur → the OS suspends a process and gives its frames to the others.
2. If **D ≤ m**, there is no thrashing, and another process can be started.

**Example:** five processes, each with a working set of 10 pages, need D = 5 × 10 = 50 frames. If physical memory has only 40 frames, D > m and the system will thrash; one process should be suspended (then D = 40 ≤ 40).

**Working-set example:** reference string … 2 6 1 5 7 7 7 7 5 1 … with Δ = 10: if the last ten references are 2, 6, 1, 5, 7, 7, 7, 7, 5, 1, the working set is **{1, 2, 5, 6, 7}** (WSS = 5).

### Page-Fault Frequency (PFF)

The OS sets an **upper** and a **lower** bound on the acceptable page-fault rate of each process:

1. If the fault rate is **above the upper bound**, the process needs more frames — allocate it another frame.
2. If the fault rate is **below the lower bound**, the process has too many frames — take a frame away.
3. If the fault rate is too high and no free frame exists, **suspend** a process and redistribute its frames.

## Page Replacement Strategies {#page-replacement-strategies}

### Need for Page Replacement

When a page fault occurs and **no frame is free**, the OS must choose a page in memory (the **victim**) to remove, so that the required page can be brought in. If the victim has been modified (its **dirty bit** is set), it must first be written back to disk; otherwise it can simply be overwritten.

**Basic page replacement:**

1. Find the location of the desired page on disk.
2. Find a free frame; if there is none, use a page-replacement algorithm to select a victim, and write it to disk if it is dirty.
3. Read the desired page into the freed frame; update the page and frame tables.
4. Restart the process.

The goal of a replacement algorithm is the **lowest page-fault rate**. Algorithms are compared by running them on a **reference string** (a sequence of page numbers referenced).

**Example used below:** reference string **7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1** (20 references) with **3 frames**.

### Types of Page Replacement Algorithms

1. **Basic algorithms:** FIFO, Optimal (OPT) and LRU.
2. **LRU-approximation algorithms:** additional-reference-bits (aging), second chance (clock) and NRU (enhanced second chance).
3. **Counting-based algorithms:** LFU and MFU.

### 1. FIFO (First-In, First-Out)

Replace the page that has been in memory the **longest** (the oldest page). It is implemented with a FIFO queue.

### 2. Optimal (OPT or MIN)

Replace the page that will **not be used for the longest period of time** in the future. It gives the **lowest possible** page-fault rate and never suffers from Belady's anomaly, but it **cannot be implemented** because it needs to know the future reference string. It is used as a **benchmark** for comparing other algorithms.

### 3. LRU (Least Recently Used)

Replace the page that has **not been used for the longest period of time** (uses the recent past as an approximation of the near future). It is implemented with **counters** (time of last use for each page) or a **stack** of page numbers (most recently used on top); both need hardware support.

### Worked Example (3 Frames)

| Ref | FIFO frames | FIFO | OPT frames | OPT | LRU frames | LRU |
| --- | --- | --- | --- | --- | --- | --- |
| 7 | 7 | Fault | 7 | Fault | 7 | Fault |
| 0 | 7 0 | Fault | 7 0 | Fault | 7 0 | Fault |
| 1 | 7 0 1 | Fault | 7 0 1 | Fault | 7 0 1 | Fault |
| 2 | 2 0 1 | Fault | 2 0 1 | Fault | 2 0 1 | Fault |
| 0 | 2 0 1 | Hit | 2 0 1 | Hit | 2 0 1 | Hit |
| 3 | 2 3 1 | Fault | 2 0 3 | Fault | 2 0 3 | Fault |
| 0 | 2 3 0 | Fault | 2 0 3 | Hit | 2 0 3 | Hit |
| 4 | 4 3 0 | Fault | 2 4 3 | Fault | 4 0 3 | Fault |
| 2 | 4 2 0 | Fault | 2 4 3 | Hit | 4 0 2 | Fault |
| 3 | 4 2 3 | Fault | 2 4 3 | Hit | 4 3 2 | Fault |
| 0 | 0 2 3 | Fault | 2 0 3 | Fault | 0 3 2 | Fault |
| 3 | 0 2 3 | Hit | 2 0 3 | Hit | 0 3 2 | Hit |
| 2 | 0 2 3 | Hit | 2 0 3 | Hit | 0 3 2 | Hit |
| 1 | 0 1 3 | Fault | 2 0 1 | Fault | 1 3 2 | Fault |
| 2 | 0 1 2 | Fault | 2 0 1 | Hit | 1 3 2 | Hit |
| 0 | 0 1 2 | Hit | 2 0 1 | Hit | 1 0 2 | Fault |
| 1 | 0 1 2 | Hit | 2 0 1 | Hit | 1 0 2 | Hit |
| 7 | 7 1 2 | Fault | 7 0 1 | Fault | 1 0 7 | Fault |
| 0 | 7 0 2 | Fault | 7 0 1 | Hit | 1 0 7 | Hit |
| 1 | 7 0 1 | Fault | 7 0 1 | Hit | 1 0 7 | Hit |

| Algorithm | Page faults | Hits | Page-fault rate |
| --- | --- | --- | --- |
| FIFO | **15** | 5 | 15 ÷ 20 = 75% |
| Optimal | **9** | 11 | 9 ÷ 20 = 45% |
| LRU | **12** | 8 | 12 ÷ 20 = 60% |

> **Page-fault rate = Number of page faults ÷ Number of references**, and **Hit ratio = Number of hits ÷ Number of references**.

**Short example (FIFO):** reference string 1, 3, 0, 3, 5, 6, 3 with 3 frames gives faults on 1, 3, 0, 5, 6 and the last 3 (page 3 was evicted when 6 arrived) — **6 page faults**. With LRU the same string gives **5 page faults** (when 6 arrives LRU evicts 0, so the last 3 is a hit).

### Belady's Anomaly

> **Belady's anomaly is the situation in which increasing the number of page frames increases the number of page faults.**

It occurs with **FIFO** (and with other algorithms that are not stack algorithms, such as Second Chance and Random). **Optimal and LRU never suffer from it**, because they are **stack algorithms**: the set of pages in memory with n frames is always a subset of the set with n + 1 frames.

**Example (FIFO):** reference string **1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5**.

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 | Faults |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3 frames | F | F | F | F | F | F | F | H | H | F | F | H | **9** |
| 4 frames | F | F | F | F | H | H | F | F | F | F | F | F | **10** |

With **more** frames (4), FIFO gives **more** faults (10 instead of 9).

![Graph of FIFO page faults against number of frames, rising from 9 at 3 frames to 10 at 4 frames](/diagrams/operating-systems/beladys-anomaly.svg)

### LRU-Approximation Algorithms

Few systems have enough hardware for true LRU, so they use a **reference bit** (set by the hardware when the page is referenced):

1. **Additional-reference-bits (aging) algorithm:** keep an 8-bit history byte for each page; at regular intervals shift the reference bit into the high-order bit. The page with the **lowest** number is the least recently used.
2. **Second-chance (clock) algorithm:** a FIFO algorithm that checks the reference bit of the oldest page. If the bit is **0**, replace the page; if it is **1**, clear the bit, give the page a **second chance** (move it to the end, or advance the clock hand), and check the next page. If all bits are 1, it becomes FIFO.
3. **Enhanced second-chance / NRU (Not Recently Used):** uses the pair (reference bit, modify bit) and replaces a page from the lowest non-empty class:
   1. (0, 0) — not recently used, not modified — **best** page to replace.
   2. (0, 1) — not recently used but modified (must be written out first).
   3. (1, 0) — recently used but clean.
   4. (1, 1) — recently used and modified — **worst** page to replace.

### Counting-Based Algorithms

1. **LFU (Least Frequently Used):** replace the page with the **smallest** reference count. Problem: a page used heavily at the start keeps a high count and stays even when it is no longer needed.
2. **MFU (Most Frequently Used):** replace the page with the **largest** count, on the argument that the page with the smallest count was probably just brought in and has yet to be used.

Neither LFU nor MFU is common; they are expensive and do not approximate OPT well.

### Comparison of Page-Replacement Algorithms

| Algorithm | Replaces | Belady's anomaly | Implementable? | Remark |
| --- | --- | --- | --- | --- |
| FIFO | Oldest page in memory | Yes | Yes | Simplest; poor performance |
| Optimal | Page not used for the longest time in future | No | No | Lowest fault rate; benchmark |
| LRU | Page not used for the longest time in the past | No | Yes (needs hardware) | Close to optimal |
| Second chance (clock) | Oldest page with reference bit 0 | Yes | Yes | LRU approximation |
| NRU | Page in the lowest (reference, modify) class | — | Yes | Simple approximation |
| LFU | Least frequently used page | — | Yes | Costly counters |
| MFU | Most frequently used page | — | Yes | Rarely used |

## Page Fault Handling {#page-fault-handling}

### Definition

**A page fault** is a trap raised when a process accesses a page that is not currently in main memory, that is, a page whose page-table entry is marked invalid.

Each page-table entry has a **valid–invalid bit**: **v** means the page is in memory; **i** means the page is not in memory **or** is not a legal page of the process. When a process starts under demand paging, all its entries are marked i. The hardware needed for demand paging is a page table with the valid–invalid bit, a secondary memory (swap device) and the ability to **restart an instruction** after a page fault.

### Types of Page Faults

1. **Minor (soft) page fault:** the page is already in main memory (for example, shared with another process or still in a cache) but is not mapped in this process's page table; it is resolved without reading the disk.
2. **Major (hard) page fault:** the page must be read from the disk; this is slow.
3. **Invalid page fault (illegal reference):** the address is not part of the process (unallocated, protected or out of bounds); the operating system terminates the process (a segmentation fault or access violation).

### Steps in Handling a Page Fault

1. The process references a page whose entry is invalid, so the hardware **traps** to the operating system. The program counter and registers are saved.
2. The operating system checks an internal table (kept with the PCB): if the reference was **illegal**, the process is terminated; if it was **valid** but the page is not in memory, handling continues.
3. The operating system finds the page on the disk (in the swap area or the executable file).
4. It finds a **free frame**. If there is none, a **page-replacement algorithm** selects a victim frame; if the victim page has been modified (its **dirty bit** is set), it is first written back to the disk.
5. It schedules a **disk read** to bring the page into the frame. While the read is in progress, the CPU is given to another process.
6. When the read completes, the page table (and the TLB) is updated: the frame number is stored and the bit is set to **valid**.
7. The saved state is restored, and the **instruction that caused the page fault is restarted**. The process continues as if the page had always been in memory.

The basic six steps are also shown in [Virtual Memory Concepts](#virtual-memory-concepts).

#### Worst-Case Sequence of a Page Fault

In the worst case, a page fault causes this sequence of events:

1. Trap to the operating system.
2. Save the user registers and the process state.
3. Determine that the interrupt was a page fault.
4. Check that the page reference was legal, and find the location of the page on the disk.
5. Issue a read from the disk to a free frame: wait in the queue for the device, wait for the seek and rotational latency, then transfer the page.
6. While waiting, give the CPU to some other process.
7. Receive an interrupt from the disk when the I/O is complete.
8. Save the registers and process state of the other process.
9. Determine that the interrupt was from the disk.
10. Correct the page table and other tables to show that the page is now in memory.
11. Wait for the CPU to be given to this process again.
12. Restore the user registers, process state and new page table, and resume the interrupted instruction.

The **page-fault service time** has three main parts: servicing the page-fault interrupt, reading in the page (by far the longest part) and restarting the process.

### Effective Access Time with Page Faults

> **EAT = (1 − p) × ma + p × page-fault service time**

where:

1. **p** = page-fault rate (0 ≤ p ≤ 1; p = 0 means no page faults, p = 1 means every reference causes a page fault),
2. **ma** = memory-access time,
3. **page-fault service time** = page-fault overhead + time to swap the page in (+ time to swap a page out, if a modified victim must be written back).

**Example 1:** ma = 100 ns, page-fault service time = 10 ms = 10,000,000 ns, p = 0.0005.

1. EAT = (1 − 0.0005) × 100 + 0.0005 × 10,000,000
2. = 99.95 + 5,000
3. = **5,099.95 ns ≈ 5.1 µs** — about 51 times slower than memory.

**Example 2 (allowed page-fault rate):** ma = 200 ns and page-fault service time = 20 ms = 20,000,000 ns. For less than 10% slowdown, EAT must be below 220 ns:

1. 220 > (1 − p) × 200 + p × 20,000,000 = 200 + p × 19,999,800.
2. 20 > p × 19,999,800.
3. p < 20 ÷ 19,999,800 ≈ **1.0 × 10⁻⁶** — at most about **one page fault per million memory accesses**.

**Example 3 (dirty pages):** ma = 100 ns. Servicing a page fault takes 8 ms if a free frame is available or the victim page is unmodified, and 20 ms if the victim page is modified; the victim is modified 70% of the time. What page-fault rate keeps EAT at no more than 200 ns?

1. Average service time = 0.3 × 8 ms + 0.7 × 20 ms = 2.4 + 14 = **16.4 ms** = 16,400,000 ns.
2. 200 ≥ (1 − p) × 100 + p × 16,400,000 = 100 + p × 16,399,900.
3. p ≤ 100 ÷ 16,399,900 ≈ **6.1 × 10⁻⁶** — about **one page fault in 164,000 accesses**.

A process that page-faults so often that it spends more time paging than executing is **thrashing** (see [Virtual Storage Management](#virtual-storage-management)). Page faults are reduced by giving each process enough frames (the working-set model, page-fault-frequency control), by prepaging and by a good page-replacement algorithm.

## References {#references}

**TutorialsPoint**

- [Virtual Memory](https://www.tutorialspoint.com/operating_system/os_virtual_memory.htm) — accessed 2026-11-03
- [Demand Paging](https://www.tutorialspoint.com/operating_system/operating_system_demand_paging.htm) — accessed 2026-11-03
- [Page Replacement Algorithms](https://www.tutorialspoint.com/operating_system/os_page_replacement_algorithms.htm) — accessed 2026-11-03 (in its LRU example 1, 2, 3, 1, 4, 5 it evicts page 1 at the last step; LRU evicts page 3, the least recently used — the fault count, 5, is unaffected)
- [Thrashing](https://www.tutorialspoint.com/operating_system/operating_systems_thrashing.htm) — accessed 2026-11-03
- [Operating System – Demand Paging](https://www.tutorialspoint.com/operating_system/operating_system_demand_paging.htm) — accessed 2026-11-07

**GeeksforGeeks**

- [Page Replacement Algorithms in Operating Systems](https://www.geeksforgeeks.org/operating-systems/page-replacement-algorithms-in-operating-systems/) — accessed 2026-11-03
- [Belady's Anomaly in Page Replacement Algorithms](https://www.geeksforgeeks.org/operating-systems/beladys-anomaly-in-page-replacement-algorithms/) — accessed 2026-11-03
- [Demand Paging in Operating System](https://www.geeksforgeeks.org/operating-systems/what-is-demand-paging-in-operating-system/) — accessed 2026-11-03
- [Techniques to handle Thrashing](https://www.geeksforgeeks.org/techniques-to-handle-thrashing/) — accessed 2026-11-03
- [Page Fault Handling](https://www.geeksforgeeks.org/operating-systems/page-fault-handling-in-operating-system/) — accessed 2026-11-07

**TpointTech**

- [Page Replacement Algorithms in Operating Systems](https://www.tpointtech.com/os-page-replacement-algorithms) — accessed 2026-11-03 (for its reference string 1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7 with 3 frames it gives 10 faults for both Optimal and LRU; a simulation gives 8 for Optimal and 11 for LRU)
- [OS Numerical on LRU, FIFO and Optimal](https://www.tpointtech.com/os-numerical-on-lru-fifo-and-optimal) — accessed 2026-11-03 (its results — Optimal 5, FIFO 6, LRU 6 — agree with a simulation)
- [Belady's Anomaly in Operating System](https://www.tpointtech.com/os-beladys-anamoly) — accessed 2026-11-03
- [Allocation of Frames in OS](https://www.tpointtech.com/allocation-of-frames-in-os) — accessed 2026-11-03
- [Demand Paging in Operating System](https://www.tpointtech.com/os-demand-paging) — accessed 2026-11-07

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources**

- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, 9th ed., [Chapter 9 slides: Virtual Memory](https://www.os-book.com/OS9/slide-dir/PDF-dir/ch9.pdf) — the worst-case sequence of a page fault and the three parts of the service time — accessed 2026-11-07
- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "Virtual Memory" — the effective-access-time example, the 20-reference string, the LRU-approximation algorithms and the counting-based algorithms

All page-fault counts and calculations in these notes were checked with a simulation script.

Issues found on the reference websites (page fault handling) and how they were resolved:

1. TpointTech states that for less than 10% slowdown with a 200 ns memory access and a 20 ms page-fault service time the page-fault rate must be below 0.00001; the correct bound is about 1.0 × 10⁻⁶ (at p = 0.00001 the access time is about 400 ns, twice as slow).
2. TpointTech says the MMU swaps pages in and out; the MMU only detects the page fault, and the operating system (the pager) moves the pages.
3. TutorialsPoint's demand-paging page says the operating system "writes" a page from the disk into a frame; it reads it.
4. The minor, major and invalid page-fault classification is GeeksforGeeks'; standard texts describe an illegal reference as one that terminates the process.
