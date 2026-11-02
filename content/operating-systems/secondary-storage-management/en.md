---
description: Secondary storage management - disk structure and access-time terms (seek time, rotational latency, transfer time) with formulas, and the disk scheduling algorithms FCFS, SSTF, SCAN, C-SCAN, LOOK and C-LOOK with a fully worked example.
updated: 2026-11-03
---

## Disk Scheduling Algorithms {#disk-scheduling-algorithms}

### Secondary Storage and Disk Structure

**Secondary storage** (mainly magnetic hard disks) holds programs and data permanently, because main memory is too small and is volatile. The OS's secondary-storage management covers **free-space management**, **storage allocation** and **disk scheduling**.

A magnetic disk consists of:

1. **Platters:** circular plates coated with magnetic material; each surface has a read/write **head** on a **disk arm**.
2. **Tracks:** concentric circles on a surface.
3. **Sectors:** the divisions of a track (the smallest unit that is read or written).
4. **Cylinder:** the set of tracks at the same arm position on all the surfaces.

### Disk Access Time

1. **Seek time:** the time for the disk arm to move the head to the required **track (cylinder)**. It is the largest part of the access time, and it grows with the distance moved.
2. **Rotational latency:** the time for the required **sector** to rotate under the head.
3. **Transfer time:** the time to actually read or write the data.

> **Disk access time = Seek time + Rotational latency + Transfer time**
>
> **Average rotational latency = ½ × time for one rotation**, where **time for one rotation = 60 ÷ RPM seconds**
>
> **Transfer time = Amount of data ÷ Transfer rate**
>
> **Total seek time = Total head movement (cylinders) × Seek time per cylinder**

**Example:** a disk rotates at 7,200 RPM, the average seek time is 4 ms, and 4 KB is read at a transfer rate of 100 MB/s.

1. One rotation = 60 ÷ 7,200 s = 0.00833 s = **8.33 ms**; average rotational latency = 8.33 ÷ 2 = **4.17 ms**.
2. Transfer time = 4 KB ÷ (100 × 1,024 KB/s) = 0.000039 s ≈ **0.04 ms**.
3. Disk access time ≈ 4 + 4.17 + 0.04 = **8.21 ms**.

Other terms:

1. **Disk bandwidth:** total bytes transferred ÷ total time from the first request to the completion of the last.
2. **Response time:** the time a request waits before its I/O is done; a good algorithm keeps the **average** and the **variance** of response time low.

### Disk Scheduling

> **Disk scheduling is the method the operating system uses to decide the order in which pending disk I/O requests are serviced.**

Many processes send disk requests, and they wait in a queue. Because seek time is the largest part of the access time, the main goal of disk scheduling is to **minimize the total head movement (seek time)**. Other goals are high **throughput**, low **response time** and **fairness** (no request should starve).

### Types of Disk Scheduling Algorithms

The main disk scheduling algorithms are:

1. FCFS (First-Come, First-Served)
2. SSTF (Shortest Seek Time First)
3. SCAN (Elevator algorithm)
4. C-SCAN (Circular SCAN)
5. LOOK
6. C-LOOK (Circular LOOK)

Other algorithms are LIFO, random scheduling, N-step SCAN and F-SCAN.

### The Example Used Below

A disk has cylinders **0 to 199**. The head is at cylinder **53**, and the request queue (in arrival order) is:

> **98, 183, 37, 122, 14, 124, 65, 67**

For every algorithm:

> **Total head movement = Σ |next position − current position|**

and **average seek length = total head movement ÷ number of requests**.

### 1. FCFS (First-Come, First-Served)

Requests are serviced in the **order they arrive**.

Order: 53 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67

Head movement = 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = **640 cylinders**

![FCFS head movement chart starting at cylinder 53](/diagrams/operating-systems/disk-fcfs.svg)

- **Advantages:** simplest; fair — every request is served in turn, no starvation.
- **Disadvantages:** does not try to reduce seek time, so total head movement is usually the largest; wild swings of the head (for example, 122 → 14 → 124).

### 2. SSTF (Shortest Seek Time First)

Service the pending request **closest to the current head position** (the one with the least seek time) next.

Order: 53 → 65 → 67 → 37 → 14 → 98 → 122 → 124 → 183

Head movement = 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = **236 cylinders**

![SSTF head movement chart starting at cylinder 53](/diagrams/operating-systems/disk-sstf.svg)

- **Advantages:** much less head movement than FCFS; better throughput and average response time.
- **Disadvantages:** can cause **starvation** of requests far from the head (if new requests keep arriving near the head); high variance of response time; not optimal (for example, 53 → 37 → 14 → 65 → 67 → 98 → 122 → 124 → 183 would need only 208); it is like SJF scheduling.

### 3. SCAN (Elevator Algorithm)

The head starts at one end and moves **towards the other end**, servicing requests on the way; at the **end of the disk** it reverses direction and services requests on the way back — like an elevator.

Assume the head is moving **towards 0**:

Order: 53 → 37 → 14 → **0** → 65 → 67 → 98 → 122 → 124 → 183

Head movement = 16 + 23 + 14 + 65 + 2 + 31 + 24 + 2 + 59 = **236 cylinders**

(Shortcut: (53 − 0) + (183 − 0) = 53 + 183 = 236.)

![SCAN head movement chart moving towards 0 first](/diagrams/operating-systems/disk-scan.svg)

If the head were moving towards 199 instead: 53 → 65 → 67 → 98 → 122 → 124 → 183 → **199** → 37 → 14 = (199 − 53) + (199 − 14) = 146 + 185 = **331 cylinders**.

- **Advantages:** no starvation; high throughput; low variance of response time.
- **Disadvantages:** the head goes all the way to the end of the disk even if there are no requests there; requests just behind the head (and at the ends) wait a long time.

### 4. C-SCAN (Circular SCAN)

Like SCAN, but requests are serviced in **one direction only**. When the head reaches the end, it **returns immediately to the other end (cylinder 0) without servicing** any request, and starts again. The cylinders are treated as a circular list, which gives a **more uniform waiting time**.

Assume the head is moving **towards 199**:

Order: 53 → 65 → 67 → 98 → 122 → 124 → 183 → **199** → **0** → 14 → 37

Head movement = 12 + 2 + 31 + 24 + 2 + 59 + 16 + **199** + 14 + 23 = **382 cylinders** (counting the return 199 → 0)

(Shortcut: (199 − 53) + 199 + 37 = 146 + 199 + 37 = 382.)

![C-SCAN head movement chart moving towards 199 with a return to 0](/diagrams/operating-systems/disk-cscan.svg) If the return seek is not counted (some books treat it as a fast jump), the movement is 382 − 199 = **183 cylinders** — always state which convention is used.

- **Advantages:** more uniform waiting time than SCAN; fair to the requests at both ends.
- **Disadvantages:** extra movement to the end and back; more head movement than SCAN.

### 5. LOOK

Like SCAN, but the head goes only as far as the **last request** in each direction (it "looks" ahead) and then reverses — it does **not** go to the end of the disk.

Assume the head is moving **towards 0**:

Order: 53 → 37 → 14 → 65 → 67 → 98 → 122 → 124 → 183

Head movement = 16 + 23 + 51 + 2 + 31 + 24 + 2 + 59 = **208 cylinders**

(Shortcut: (53 − 14) + (183 − 14) = 39 + 169 = 208.)

![LOOK head movement chart moving towards 0 first](/diagrams/operating-systems/disk-look.svg)

- **Advantages:** avoids the useless travel to the disk ends, so less head movement than SCAN; no starvation.
- **Disadvantages:** requests just behind the head can still wait long; the scheduler must know the pending requests in each direction.

### 6. C-LOOK (Circular LOOK)

Like C-SCAN, but the head goes only as far as the **last request** in the direction of movement, then **jumps back to the lowest pending request** (not to cylinder 0) and continues in the same direction.

Assume the head is moving **towards 199**:

Order: 53 → 65 → 67 → 98 → 122 → 124 → 183 → **14** → 37

Head movement = 12 + 2 + 31 + 24 + 2 + 59 + **169** + 23 = **322 cylinders** (counting the jump 183 → 14)

(Shortcut: (183 − 53) + (183 − 14) + (37 − 14) = 130 + 169 + 23 = 322.)

![C-LOOK head movement chart moving towards 199 and jumping back to 14](/diagrams/operating-systems/disk-clook.svg)

- **Advantages:** less head movement than C-SCAN; uniform waiting time.
- **Disadvantages:** the long return jump; new requests arriving behind the head wait for a full cycle.

### Summary of the Example

| Algorithm | Direction assumed | Order of service | Total head movement |
| --- | --- | --- | --- |
| FCFS | — | 98, 183, 37, 122, 14, 124, 65, 67 | 640 |
| SSTF | — | 65, 67, 37, 14, 98, 122, 124, 183 | 236 |
| SCAN | Towards 0 | 37, 14, (0), 65, 67, 98, 122, 124, 183 | 236 |
| C-SCAN | Towards 199 | 65, 67, 98, 122, 124, 183, (199, 0), 14, 37 | 382 |
| LOOK | Towards 0 | 37, 14, 65, 67, 98, 122, 124, 183 | **208** (least) |
| C-LOOK | Towards 199 | 65, 67, 98, 122, 124, 183, 14, 37 | 322 |

Average seek length for SSTF = 236 ÷ 8 = **29.5 cylinders**; for FCFS = 640 ÷ 8 = **80 cylinders**.

### Other Disk Scheduling Algorithms

1. **LIFO (Last-In, First-Out):** the newest request is served first; it can use locality, but old requests may starve.
2. **Random scheduling (RSS):** requests are picked at random; used only for analysis and simulation.
3. **N-step SCAN:** the queue is divided into sub-queues of length N; each sub-queue is processed completely with SCAN while new requests go into another sub-queue — prevents "arm stickiness".
4. **F-SCAN:** two queues are used; one is serviced with SCAN while all new requests go into the other.

### Comparison of Disk Scheduling Algorithms

| Algorithm | Selection rule | Starvation | Head movement | Remark |
| --- | --- | --- | --- | --- |
| FCFS | Arrival order | No | High | Fair but slow |
| SSTF | Nearest request | Possible | Low | Like SJF; high variance |
| SCAN | Sweep to the end, reverse | No | Medium | Elevator; good under heavy load |
| C-SCAN | Sweep one way, jump back to start | No | Higher | Most uniform waiting time |
| LOOK | Sweep to the last request, reverse | No | Low | Improves SCAN |
| C-LOOK | Sweep one way to the last request, jump to the lowest | No | Medium | Improves C-SCAN |

### Choosing an Algorithm

1. **SSTF** is common and gives good performance under moderate load.
2. **SCAN and C-SCAN** (and LOOK, C-LOOK) perform better for systems with a **heavy disk load**, because they are less likely to cause starvation.
3. Performance depends on the number and type of requests and on the file-allocation method. The disk-scheduling algorithm is written as a **separate module** of the OS so that it can be replaced if necessary; SSTF or LOOK is a reasonable default.

## References {#references}

**TutorialsPoint**

- [Disk Scheduling Algorithms](https://www.tutorialspoint.com/operating_system/os_disk_scheduling_algorithms.htm) — accessed 2026-11-03 (same FCFS and SSTF example as these notes, 640 and 236 agree; in its C-LOOK example — head 70 moving right, queue 82, 170, 43, 140, 34, 190 — it gives 276, but 120 + 156 + 9 = 285 when the return jump is counted)

**GeeksforGeeks**

- [Disk Scheduling Algorithms](https://www.geeksforgeeks.org/operating-systems/disk-scheduling-algorithms/) — accessed 2026-11-03

**TpointTech**

- [Disk Scheduling in Operating Systems](https://www.tpointtech.com/os-disk-scheduling) — accessed 2026-11-03
- [Numerical on Disk Scheduling Algorithms](https://www.tpointtech.com/os-numerical-on-disk-scheduling-algorithms) — accessed 2026-11-03 (its totals — FCFS 640, SSTF 236, SCAN 236, LOOK 208, C-SCAN 382, C-LOOK 322 — agree with these notes, but its printed request queue lists 64 and 38 where its working uses 67 and starts at 98)

**IT Job QnS**

- The IT Job QnS Operating System page has no disk-scheduling questions in its fetched text (checked 2026-11-03).

**Programiz**

- Programiz has no operating-system tutorial; no page was found for this subtopic (checked 2026-11-03).

**Additional sources**

- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "Mass-Storage Structure" — the standard request queue 98, 183, 37, 122, 14, 124, 65, 67 with the head at 53, and the guidance on choosing an algorithm

All head movements in these notes were computed with a script and checked by hand.
