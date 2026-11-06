---
description: Interprocess communication (IPC) - IPC techniques (shared memory, message passing, pipes, FIFOs, message queues, sockets, signals, semaphores), message passing with send and receive, synchronization and buffering, and direct and indirect communication.
updated: 2026-11-03
---

## IPC Techniques {#ipc-techniques}

### Definition

> **Interprocess communication (IPC) is the mechanism provided by the operating system that allows processes to exchange data and to synchronize their actions.**

Each process has its own address space, so one process cannot normally read or write another process's memory. **Cooperating processes** need IPC; independent processes do not.

### Need for IPC

1. **Information sharing:** several processes need the same data (for example, a shared file).
2. **Computation speed-up:** a task is split into subtasks that run in parallel and exchange results.
3. **Modularity:** a system built from separate processes needs them to communicate.
4. **Convenience:** a user runs many tasks at once (editing, printing, playing music).
5. **Privilege separation** and **synchronization** of the actions of processes.

### The Two Fundamental Models of IPC

1. **Shared memory:** a region of memory is shared by the cooperating processes. One process creates the shared-memory segment in its address space; the others attach it to theirs. Processes exchange data by **reading and writing the shared region**. After it is set up, no kernel help is needed, so it is **fast**, but the processes must synchronize their access themselves (for example, with semaphores).
2. **Message passing:** processes communicate by **exchanging messages** through the kernel, using `send()` and `receive()`; no memory is shared. It is easier to use and suits **distributed systems** (processes on different computers), but it is **slower**, because every message needs a system call.

![Shared-memory and message-passing models of IPC](/diagrams/operating-systems/ipc-models.svg)

| Basis | Shared memory | Message passing |
| --- | --- | --- |
| How data is exchanged | Reading and writing a common memory region | Sending and receiving messages |
| Kernel involvement | Only to set up the region | For every message (system calls) |
| Speed | Faster | Slower |
| Synchronization | Done by the programmer (semaphores, mutexes) | Provided by the send/receive mechanism |
| Amount of data | Suitable for large amounts | Best for small amounts |
| Distributed systems | Difficult (needs a common memory) | Easy (works across a network) |
| Conflicts | Possible if access is not synchronized | No memory conflicts |
| Example | Several people editing one shared document | A group chat where every message passes through a server |

### IPC Techniques (Mechanisms)

1. **Pipes (anonymous pipes):** a **unidirectional** channel between **related** processes (parent and child); one writes, the other reads, in FIFO order. Two pipes give two-way communication. See [Forks and Pipes](/topics/operating-systems/process-management#forks-and-pipes).
2. **Named pipes (FIFOs):** like pipes, but they have a name in the file system, so **unrelated** processes can use them, and they remain after the processes end.
3. **Message queues:** a linked list of messages kept by the kernel. Processes add messages to and read messages from the queue without being connected to each other; messages stay in the queue until they are read (asynchronous communication).
4. **Shared memory:** the fastest IPC technique; processes share a memory segment directly.
5. **Semaphores:** used to synchronize processes (for example, to control access to shared memory); they do not carry data.
6. **Sockets:** endpoints for communication between processes on the same computer or on different computers over a network (using TCP or UDP); used in client–server applications.
7. **Signals:** short notifications sent to a process that an event has occurred; used for commands, not for data. See [Signals](/topics/operating-systems/process-management#signals).
8. **Files:** data stored on disk that several processes can read and write.
9. **Remote Procedure Call (RPC):** a process calls a procedure that runs in another process (usually on another computer) as if it were a local call; the arguments and result are passed as messages.

### Synchronization Used with IPC

1. **Mutual exclusion:** only one process at a time in a critical section.
2. **Semaphore:** controls access to a shared resource.
3. **Barrier:** a process waits at the barrier until all the processes of the group have reached it.
4. **Spinlock:** a lock on which a process busy-waits until it is free.

## Message Passing {#message-passing}

### Definition

> **Message passing is an IPC technique in which processes communicate and synchronize by sending and receiving messages, without sharing variables or memory.**

A message-passing facility provides at least two operations:

1. **`send(message)`**
2. **`receive(message)`**

Messages can be of:

| Message size | System implementation | Programming |
| --- | --- | --- |
| Fixed size | Simple | Harder for the programmer |
| Variable size | More complex | Simpler for the programmer |

### Communication Link

If processes P and Q want to communicate, a **communication link** must exist between them. The logical design of the link raises three questions:

1. **Naming:** direct or indirect communication (see the next two sections).
2. **Synchronization:** blocking or non-blocking send and receive.
3. **Buffering:** how many messages the link can hold.

### Types of Message Passing: Blocking (Synchronous) and Non-blocking (Asynchronous)

Message passing may be **blocking (synchronous)** or **non-blocking (asynchronous)**:

1. **Blocking send:** the sender is blocked until the message is received by the receiving process or mailbox.
2. **Non-blocking send:** the sender sends the message and continues.
3. **Blocking receive:** the receiver is blocked until a message is available.
4. **Non-blocking receive:** the receiver gets either a valid message or a null and continues.

When **both** send and receive are blocking, the sender and receiver meet — this is called a **rendezvous**.

### Types of Buffering in Message Passing

Messages exchanged by communicating processes wait in a temporary queue (buffer). The queue can be:

1. **Zero capacity (no buffering):** the link cannot hold any waiting message, so the **sender must block** until the receiver takes the message (rendezvous).
2. **Bounded capacity:** the queue has a finite length n. If the queue is not full, the sender continues; if it is **full**, the sender must **block** until space is free (or the send fails with an error).
3. **Unbounded capacity:** the queue can hold any number of messages, so the **sender never blocks**.

Zero capacity is sometimes called a message system with **no buffering**; the other two cases are **automatic buffering**.

### Advantages and Disadvantages of Message Passing

| Advantages | Disadvantages |
| --- | --- |
| No shared-memory conflicts | Slower than shared memory |
| Works across a network (distributed systems) | System-call overhead for every message |
| Synchronization is built in | Message size is limited |
| Processes stay isolated | Needs kernel involvement |

## Direct Communication {#direct-communication}

**Direct communication** is a message-passing scheme in which each process that wants to communicate must **explicitly name** the recipient or the sender.

### Types of Addressing in Direct Communication

Direct communication uses one of two types of addressing:

1. **Symmetric addressing**
2. **Asymmetric addressing**

#### 1. Symmetric Addressing

Both the sender and the receiver name each other:

1. `send(P, message)` — send a message to process P.
2. `receive(Q, message)` — receive a message from process Q.

#### 2. Asymmetric Addressing

Only the sender names the recipient; the receiver accepts a message from any process:

1. `send(P, message)` — send a message to process P.
2. `receive(id, message)` — receive a message from any process; `id` is set to the name of the sender.

### Properties of the Link

1. A link is established **automatically** between every pair of processes that want to communicate; the processes only need to know each other's identity.
2. A link is associated with **exactly two** processes.
3. Between each pair of processes there is **exactly one** link.
4. The link may be unidirectional, but is usually bidirectional.

### Disadvantage

**Limited modularity:** the process names are hard-coded. If the name (identifier) of a process changes, every reference to the old name must be found and changed.

## Indirect Communication {#indirect-communication}

**Indirect communication** is a message-passing scheme in which messages are sent to and received from **mailboxes** (also called **ports**).

A mailbox is an object into which messages can be placed by processes and from which messages can be removed. Each mailbox has a **unique identification**.

1. `send(A, message)` — send a message to mailbox A.
2. `receive(A, message)` — receive a message from mailbox A.

### Properties of the Link

1. A link is established between two processes **only if they share a mailbox**.
2. A link may be associated with **more than two** processes.
3. Between each pair of processes there may be **several** links, each corresponding to one mailbox.
4. A link may be unidirectional or bidirectional.

### Who Receives the Message?

Suppose P1, P2 and P3 share mailbox A; P1 sends a message to A, and both P2 and P3 execute `receive()` from A. The system may:

1. allow a link to be associated with at most two processes;
2. allow at most one process at a time to execute a `receive()` operation; or
3. select arbitrarily (or by an algorithm such as round robin) which process receives the message, and tell the sender who received it.

### Ownership of a Mailbox

1. **Owned by a process:** the mailbox is part of the process's address space. The owner can only receive through it, and others can only send to it; the mailbox disappears when the owner terminates.
2. **Owned by the operating system:** the mailbox exists independently. The OS provides operations to **create** a mailbox, **send and receive** messages through it, and **delete** it. The creating process is the owner by default, but ownership and receiving rights can be passed to other processes.

![Direct communication between P and Q, and indirect communication through mailbox A](/diagrams/operating-systems/direct-indirect.svg)

### Direct vs Indirect Communication

| Basis | Direct communication | Indirect communication |
| --- | --- | --- |
| Addressing | Processes name each other | Processes name a mailbox (port) |
| Operations | `send(P, msg)`, `receive(Q, msg)` | `send(A, msg)`, `receive(A, msg)` |
| Link established | Automatically between the two processes | Only if the processes share a mailbox |
| Processes per link | Exactly two | Two or more |
| Links between a pair | Exactly one | Possibly several (one per mailbox) |
| Modularity | Low (names are hard-coded) | Higher (processes do not need to know each other) |
| Example | A call between two named people | A shared post-office box; a message queue |

## References {#references}

**TutorialsPoint**

- [Inter Process Communication (IPC)](https://www.tutorialspoint.com/operating_system/os_inter_process_communication.htm) — accessed 2026-11-03
- [What is message passing technique in OS?](https://www.tutorialspoint.com/article/what-is-message-passing-technique-in-os) — accessed 2026-11-03

**GeeksforGeeks**

- [Inter Process Communication (IPC)](https://www.geeksforgeeks.org/operating-systems/inter-process-communication-ipc/) — accessed 2026-11-03
- [Methods in Inter Process Communication](https://www.geeksforgeeks.org/operating-systems/methods-in-interprocess-communication/) — accessed 2026-11-03
- [Message based Communication in IPC](https://www.geeksforgeeks.org/message-based-communication-in-ipc-inter-process-communication/) — accessed 2026-11-03
- [What is Message Buffering?](https://www.geeksforgeeks.org/computer-networks/what-is-message-buffering/) — accessed 2026-11-03

**TpointTech**

- [What is Inter Process Communication](https://www.tpointtech.com/what-is-inter-process-communication) — accessed 2026-11-03 (it calls a FIFO full-duplex; a FIFO, like a pipe, carries data in one direction — two FIFOs are used for two-way communication)

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (the reference websites mention direct and indirect communication only briefly)

- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "Interprocess Communication" — symmetric and asymmetric addressing, the properties of direct and indirect links, mailbox ownership, blocking and non-blocking send and receive, and zero, bounded and unbounded buffering
