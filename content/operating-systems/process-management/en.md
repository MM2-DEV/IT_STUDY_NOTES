---
description: Process management - the concept of a process, operations on processes, process states, concurrent processes, the process control block (PCB), process context, UNIX process control, signals, process hierarchies, fork and pipe, and threads (thread components, user-level and kernel-level threads, multithreading models, process vs thread).
updated: 2026-11-07
---

## Concept of a Process {#concept-of-a-process}

### Definition

> **A process is a program in execution.**

A process is the basic unit of work in a system. When an executable program is loaded into main memory and starts running, it becomes a process. A process needs resources — CPU time, memory, files and I/O devices — to do its work.

### Program vs Process

A **program** is a set of instructions stored on disk (a **passive** entity).

A **process** is that program while it is running (an **active** entity). One program can create many processes; for example, opening the same browser program three times creates three processes.

| Basis | Program | Process |
| --- | --- | --- |
| Nature | Passive, static | Active, dynamic |
| Where it is | Stored in secondary memory (disk) | Loaded in main memory |
| Lifetime | Exists until it is deleted | Exists from creation to termination |
| Control structure | None | Has a Process Control Block (PCB) |
| Resources | Needs only storage for its code | Needs CPU, memory, files and I/O devices |
| Change | Changes only when the programmer edits it | Its state changes as it runs |

### Process in Memory

When a program is loaded into memory as a process, its memory (address space) is divided into four sections:

1. **Text section:** the program code (executable instructions); usually read-only.
2. **Data section:** global and static variables.
3. **Heap:** memory allocated dynamically while the process runs (for example, with `malloc()` in C).
4. **Stack:** temporary data such as function parameters, return addresses and local variables.

![A process in memory: stack, free space, heap, data and text sections](/diagrams/operating-systems/process-memory-layout.svg)

The stack and the heap grow towards each other. Besides these sections, a process also has its **current activity**: the value of the **program counter** (the address of the next instruction) and the contents of the CPU registers.

### Types of Processes: Independent and Cooperating

1. **Independent process:** does not share data with any other process and is not affected by other processes. Its result for the same input is always the same.
2. **Cooperating process:** can affect or be affected by other processes (it shares data with them). It needs synchronization and interprocess communication.

## Operations on Processes {#operations-on-processes}

The main operations that an operating system performs on processes are:

1. Process creation
2. Scheduling (dispatching)
3. Blocking
4. Preemption
5. Termination

### 1. Process Creation

A new process is created when:

1. The system is initialized (background processes are started).
2. A user starts a program (for example, double-clicks an icon or types a command).
3. A running process makes a system call to create a child process.
4. A batch job is started.

The creating process is the **parent** and the new process is the **child**. To create a process, the OS:

1. Assigns a unique **process ID (PID)** and adds an entry in the process table.
2. Allocates memory for the code, data, stack and the PCB.
3. Initializes the PCB (PID, parent's PID, registers, program counter, priority) and puts the process in the ready queue.

In UNIX, a child is created with the `fork()` system call (see [Forks and Pipes](#forks-and-pipes)). In Windows, the `CreateProcess()` call creates a new process and loads the program in one step.

A child has only one parent, but a parent may have many children. After creation:

1. **Execution:** the parent and the child can run concurrently, or the parent can wait until the child terminates.
2. **Resources:** the child may share all, some or none of the parent's resources.
3. **Address space:** each has its own address space; in UNIX the child starts as a copy of the parent.

### 2. Scheduling / Dispatching

The OS selects a process from the ready queue and gives it the CPU (Ready → Running). The process's saved state is loaded from its PCB. This happens when the CPU becomes free, or when a process of higher priority becomes ready.

### 3. Blocking

When a running process needs an event that is not yet available — usually the completion of an I/O operation — it is **blocked** (Running → Waiting). The OS then dispatches another process. When the event completes, the blocked process becomes ready again.

### 4. Preemption

The running process is stopped and moved back to the ready queue (Running → Ready) when its **time slice expires**, when a **higher-priority** process arrives, or on a hardware interrupt. Its state is saved in its PCB (a context switch). Preemption happens only with preemptive scheduling.

### 5. Termination

A process terminates and releases all its resources (memory, open files, buffers) to the OS. Reasons for termination:

1. **Normal completion:** the process executes its last statement and calls `exit()`.
2. **Error or fault:** the OS ends it because of an error (for example, an invalid memory access or division by zero) or a hardware problem.
3. **Killed by the parent:** the parent ends the child (for example, with `kill()`) because the child has exceeded its resources, its task is no longer needed, or the parent itself is exiting.

When a child terminates, its exit status is returned to the parent (which collects it with `wait()`). In some systems, when a parent terminates, all its children are also terminated — this is called **cascading termination**. In UNIX, the children of a terminated parent are instead adopted by the `init` process.

## Process States {#process-states}

The **process state** is the current activity of a process.

As a process executes, it changes its state.

Process states are described by three **process state models**:

1. **Five-state model** (the standard model)
2. **Two-state model** (the simplest)
3. **Seven-state model** (with suspended states)

### Five-State Model

| State | Meaning |
| --- | --- |
| **New** (Start) | The process is being created. |
| **Ready** | The process is in main memory and has all resources except the CPU; it is waiting to be assigned the CPU. |
| **Running** | The process's instructions are being executed by the CPU. |
| **Waiting** (Blocked) | The process is waiting for some event, such as I/O completion or user input. |
| **Terminated** (Exit) | The process has finished execution (normally or abnormally). |

On a single CPU, only **one process can be running** at a time; many processes can be ready or waiting.

![Five-state process diagram: new, ready, running, waiting and terminated with their transitions](/diagrams/operating-systems/process-states.svg)

### State Transitions

| Transition | When it happens |
| --- | --- |
| New → Ready | The OS admits the newly created process. |
| Ready → Running | The dispatcher selects the process and gives it the CPU. |
| Running → Ready | The time slice expires, or a higher-priority process arrives (preemption, interrupt). |
| Running → Waiting | The process requests I/O or waits for an event. |
| Waiting → Ready | The I/O or event the process was waiting for completes. |
| Running → Terminated | The process completes or is aborted. |

A process cannot go directly from **Waiting to Running**: after the event completes it must first become Ready and then be selected by the scheduler.

### Two-State Model

The simplest model has only two states: **Running** and **Not Running**. A newly created process enters Not Running; when the dispatcher gives it the CPU, it becomes Running; when it is interrupted or waits for I/O, it goes back to Not Running.

### Seven-State Model (with Suspended States)

When main memory is short, the OS may move (**swap out**) a process from main memory to secondary memory. This adds two states to the five-state model:

1. **Suspended Ready:** the process is ready to run but is in secondary memory. It must be swapped into main memory before it can be scheduled.
2. **Suspended Blocked (Suspended Wait):** the process is waiting for an event and is also in secondary memory.

![Seven-state process diagram with suspended ready and suspended blocked states](/diagrams/operating-systems/process-states-suspend.svg)

A Suspended Blocked process becomes Suspended Ready when its event occurs. A suspended process moves back to main memory (Ready or Blocked) when it is swapped in.

## Concurrent Processes {#concurrent-processes}

### Definition

Processes are **concurrent** when their execution overlaps in time — they are all active at the same time.

On a single CPU they run **interleaved** (the CPU switches between them through context switching); on multiple CPUs they can run **in parallel**. The OS must manage and coordinate them.

### Reasons for Concurrent Execution

1. **Physical resource sharing:** limited hardware is shared by many users.
2. **Logical resource sharing:** several processes use the same data or file.
3. **Computation speed-up:** a task is divided into parts that run at the same time.
4. **Modularity:** system functions are divided into separate processes.

### Principles of Concurrency

Interleaved and overlapped execution cause the same problems. The relative speed of execution of a process cannot be predicted; it depends on:

1. The activities of other processes.
2. The way the OS handles interrupts.
3. The scheduling policy of the OS.

### Problems in Concurrency

1. **Sharing global resources:** if two processes read and write the same shared variable, the order of reads and writes decides the result.
2. **Optimal allocation of resources** is difficult for the OS.
3. **Locating programming errors** is difficult, because the results are often not reproducible.
4. **Locking a channel** (resource) for one process may be inefficient for others.

### Issues of Concurrency

1. **Non-atomic operations:** operations that can be interrupted part-way give wrong results.
2. **Race condition:** the result depends on which process reaches a point first.
3. **Blocking:** a process waits for a resource and cannot proceed.
4. **Starvation:** a process never gets the resources it needs.
5. **Deadlock:** two or more processes wait for each other forever.

These problems are solved by process synchronization (see [Process Synchronization and Concurrency](/topics/operating-systems/process-synchronization-and-concurrency)).

### Advantages and Disadvantages

- **Advantages:** several applications run at the same time; better resource utilization; better average response time; better performance, because CPU work and I/O work overlap.
- **Disadvantages:** applications must be protected from one another; extra mechanisms are needed to coordinate them; context switching adds overhead; running too many processes reduces performance.

## Process Control Block (PCB) {#process-control-block-pcb}

### Definition

> **A Process Control Block (PCB) is a data structure that the operating system keeps for every process, containing all the information the OS needs to manage that process.**

The PCB is also called the **Task Control Block** or **process descriptor**. It is created when the process is created and deleted when the process terminates. Each process is identified by its **process ID (PID)**.

### Fields of a PCB

1. **Process ID (PID):** a unique number identifying the process.
2. **Process state:** new, ready, running, waiting or terminated.
3. **Program counter:** the address of the next instruction to be executed.
4. **CPU registers:** the contents of the accumulators, index registers, stack pointers and general-purpose registers, saved when the process leaves the CPU.
5. **CPU scheduling information:** priority, pointers to scheduling queues and other scheduling parameters.
6. **Memory-management information:** base and limit registers, page tables or segment tables.
7. **Accounting information:** CPU time used, time limits, account numbers.
8. **I/O status information:** the list of I/O devices allocated to the process and the list of open files.
9. **Pointer to the parent process** (parent PID).
10. **Process privileges:** what system resources the process may access.

### Where the PCB Is Kept

The PCBs of all processes are kept in a **process table** in the OS kernel. The PCB is stored in a protected memory area that user programs cannot access (some operating systems place it at the beginning of the process's kernel stack).

### Role of the PCB

1. **Context switching:** when the CPU switches from one process to another, the state of the running process is saved in its PCB, and the state of the next process is loaded from its PCB.
2. **Scheduling:** the scheduler reads the state and priority from the PCBs.
3. **Resuming:** because the state is saved, a paused process continues exactly where it stopped.

## Process Context {#process-context}

### Definition

The **context** of a process is all the information needed to describe the process's current execution — everything that must be saved when the process stops running and restored when it runs again.

It is kept in the process's PCB.

The context includes:

1. The **program counter** and the contents of the **CPU registers** (and the processor status word).
2. The **process state**.
3. **Memory-management information** (base/limit registers, page or segment tables).
4. **Open files**, I/O status and accounting information.

In the UNIX design (M. J. Bach, *The Design of the UNIX Operating System*), the context of a process is divided into three parts:

1. **User-level context:** the process's text, data and stack in its address space.
2. **Register context:** the program counter, processor status register, stack pointer and general-purpose registers.
3. **System-level context:** the kernel's data about the process — its process-table entry, u-area, memory tables and kernel stack.

### Context Switching

> **Context switching is the process of saving the state (context) of the running process and loading the saved state of the next process, so that the CPU can switch from one process to another.**

Steps of a context switch from process P0 to process P1:

1. P0 is running; an interrupt or system call occurs.
2. The OS saves P0's state (program counter, registers) in P0's PCB.
3. P0's PCB is updated and P0 is moved to the appropriate queue (ready or waiting).
4. The scheduler selects P1.
5. The OS loads P1's state from P1's PCB and marks P1 as running.
6. P1 resumes exactly where it stopped.

![Context switch from P0 to P1 and back: the OS saves and reloads states in the PCBs](/diagrams/operating-systems/context-switch.svg)

**Causes (triggers) of a context switch:**

1. A timer interrupt when the time slice (quantum) expires.
2. The running process blocks for I/O.
3. A higher-priority process becomes ready.
4. Hardware and software interrupts and system calls.
5. The running process terminates.

**Context-switch overhead:** the time spent in a context switch is pure overhead — the CPU does no useful work for any process during it. The time depends on the hardware support, the number of registers to save and the speed of memory. Very frequent switching reduces CPU efficiency.

Switching between **threads** of the same process is cheaper than switching between processes, because threads share the same memory.

## UNIX Process Control and Management {#unix-process-control-and-management}

### Process Control System Calls in UNIX

| System call | Purpose |
| --- | --- |
| `fork()` | Creates a new (child) process that is a copy of the calling (parent) process |
| `exec()` family (`execl`, `execv`, `execve`, …) | Replaces the current process's memory with a new program; does not return on success |
| `wait()` / `waitpid()` | The parent waits until a child terminates and collects its exit status |
| `exit()` | Terminates the calling process and returns its exit status to the parent |
| `getpid()` / `getppid()` | Returns the PID of the process / of its parent |
| `kill()` | Sends a signal to a process |
| `signal()` | Sets the action (handler) for a signal |

The usual pattern for running a new program is: the parent calls `fork()`; the child calls `exec()` to load the new program; the parent calls `wait()` until the child finishes. (A UNIX shell runs every command this way.)

### UNIX Process States

A UNIX process passes through more detailed states than the five-state model:

1. **Created:** newly created by `fork()`, not yet ready to run.
2. **User running:** executing in user mode.
3. **Kernel running:** executing in kernel mode (for example, during a system call or interrupt).
4. **Ready to run in memory:** waiting for the scheduler.
5. **Asleep in memory:** blocked (waiting for an event) while in main memory.
6. **Ready to run, swapped:** ready, but must be swapped into memory first.
7. **Sleeping, swapped:** blocked and swapped out to secondary storage.
8. **Preempted:** the kernel preempted it while it was returning from kernel mode to user mode.
9. **Zombie:** the process has called `exit()`; only its process-table entry (exit code and timing statistics) remains for the parent to collect. This is the final state.

### Special UNIX Processes

1. **Process 0 (swapper):** created when the system boots; swaps processes between main memory and secondary storage.
2. **Process 1 (init):** the ancestor of all user processes; it adopts orphan processes.
3. **Zombie process:** a process that has terminated but whose parent has not yet called `wait()`; it still has an entry in the process table. A child always becomes a zombie for a short time before it is removed.
4. **Orphan process:** a process whose parent has terminated while the child is still running. Orphans are adopted by `init`, which calls `wait()` for them.

### Process Management Commands (UNIX/Linux)

| Command | Purpose |
| --- | --- |
| `ps` | Lists running processes |
| `top` | Shows processes and resource usage continuously |
| `kill PID` | Sends a signal (default SIGTERM) to a process |
| `pstree` | Shows the process tree |
| `nice` | Starts a process with a given priority |

## Signals {#signals}

### Definition

> **A signal is a software interrupt sent to a process to notify it that an event has occurred.**

Signals are sent by the kernel to a process, by one process to another, or by a process to itself. Each signal has a name and an integer number (for example, SIGINT = 2). Signals are also a simple form of interprocess communication; they carry no data.

### Life Cycle of a Signal

1. **Generation:** an event generates the signal (for example, Ctrl+C, division by zero, a child terminating, or a `kill()` call).
2. **Delivery:** the signal is delivered to the target process. A blocked signal stays **pending** until it is unblocked.
3. **Handling:** the process handles the signal. The current task is paused, its registers are saved, and the handler runs.

### Ways of Handling a Signal

1. **Default action:** each signal has a default action — terminate, terminate with core dump, ignore, stop, or continue.
2. **Ignore** the signal.
3. **Catch** the signal: run a user-defined **signal handler** function.

**SIGKILL** and **SIGSTOP** can **not** be caught, blocked or ignored.

### Common Signals

| Signal | Number (Linux) | Meaning | Default action |
| --- | --- | --- | --- |
| SIGHUP | 1 | Hang-up: the controlling terminal was closed | Terminate |
| SIGINT | 2 | Interrupt from the keyboard (Ctrl+C) | Terminate |
| SIGQUIT | 3 | Quit from the keyboard (Ctrl+\\) | Terminate with core dump |
| SIGILL | 4 | Illegal instruction | Terminate with core dump |
| SIGABRT | 6 | Abort, raised by `abort()` | Terminate with core dump |
| SIGFPE | 8 | Floating-point / arithmetic error (such as division by zero) | Terminate with core dump |
| SIGKILL | 9 | Kill immediately (cannot be caught or ignored) | Terminate |
| SIGSEGV | 11 | Invalid memory reference (segmentation fault) | Terminate with core dump |
| SIGPIPE | 13 | Write to a pipe with no reader | Terminate |
| SIGALRM | 14 | Timer set by `alarm()` expired | Terminate |
| SIGTERM | 15 | Termination request (default signal of `kill`) | Terminate |
| SIGCHLD | 17 | A child process stopped or terminated | Ignore |
| SIGCONT | 18 | Continue a stopped process | Continue |
| SIGSTOP | 19 | Stop the process (cannot be caught or ignored) | Stop |
| SIGTSTP | 20 | Stop from the terminal (Ctrl+Z) | Stop |

### Sending and Handling Signals in C

1. `signal(signum, handler)` installs a handler for a signal.
2. `kill(pid, signum)` sends a signal to another process; `raise(signum)` sends it to the calling process.
3. From the shell: `kill -9 1234` sends SIGKILL to process 1234.

```c
#include <signal.h>
#include <stdio.h>
#include <unistd.h>

void handler(int sig)
{
    printf("Caught signal %d (SIGINT)\n", sig);
}

int main(void)
{
    signal(SIGINT, handler);         /* install a handler for SIGINT */
    raise(SIGINT);                   /* send SIGINT to this process */
    printf("Program continues after the handler\n");
    return 0;
}
```

Output:

```text
Caught signal 2 (SIGINT)
Program continues after the handler
```

Without the handler, the default action of SIGINT would terminate the program.

## Process Hierarchies {#process-hierarchies}

A **process hierarchy (process tree)** is the tree of parent and child processes formed when processes create child processes, which in turn create their own children.

Each process (except the first) has exactly one parent, and a parent can have many children.

### Process Hierarchy in UNIX

1. At boot time, a special process, **init** (PID 1), is started. It starts the login processes (shells) for the users, and these start further processes. So **all user processes belong to one tree with init at the root**.
2. A process and all its children and further descendants together form a **process group**. A signal sent from the keyboard (for example, Ctrl+C) is delivered to all members of the process group connected to that keyboard; each process can catch, ignore or take the default action.
3. When a parent terminates first, its orphan children are adopted by `init`.
4. The tree can be displayed with the `pstree` command, and a child's parent can be found with `getppid()`.

### Process Hierarchy in Windows

Windows has **no concept of a process hierarchy**: all processes are equal. When a process creates a child, the parent receives a special token (a **handle**) to control the child, but it is free to pass this handle to another process, which breaks the hierarchy.

### Process Tree Example

If the shell runs a program P, and P calls `fork()` twice in a row, then:

1. The first `fork()` creates child C1 of P.
2. The second `fork()` is executed by both P and C1, creating C2 (child of P) and C3 (child of C1).

The tree is: init → shell → P → {C1 → C3, C2}.

![Process tree: init, shell, P and its children C1, C2 and grandchild C3](/diagrams/operating-systems/process-tree.svg)

## Forks and Pipes {#forks-and-pipes}

### fork()

> **`fork()` is the UNIX system call that creates a new process (the child) as a copy of the calling process (the parent).**

1. `fork()` takes no arguments and returns a value of type `pid_t`.
2. After `fork()`, **both** processes continue from the instruction after the call; they run concurrently.
3. The child gets a copy of the parent's memory (code, data, stack), program counter, registers and open files, but has its own PID. Changes made by one do not affect the other.

**Return value of fork():**

| Value | Meaning |
| --- | --- |
| Negative (−1) | Creation of the child failed |
| 0 | Returned in the **child** process |
| Positive | Returned in the **parent**; it is the PID of the new child |

```c
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void)
{
    int x = 10;
    pid_t pid = fork();              /* create a child process */

    if (pid < 0) {                   /* fork failed */
        perror("fork");
        return 1;
    } else if (pid == 0) {           /* child: fork() returned 0 */
        x = x + 5;
        printf("Child : x = %d\n", x);
    } else {                         /* parent: fork() returned the child's PID */
        wait(NULL);                  /* wait for the child to finish */
        x = x - 5;
        printf("Parent: x = %d\n", x);
    }
    return 0;
}
```

Output:

```text
Child : x = 15
Parent: x = 5
```

Each process changed only its own copy of `x`.

### Number of Processes Created by fork()

If `fork()` is called **n** times in a row (each process executing every following `fork()`), the number of processes doubles at each call:

> **Total processes = 2ⁿ** and **child processes created = 2ⁿ − 1**

where **n** is the number of `fork()` calls.

**Example:** n = 3.

```c
#include <stdio.h>
#include <unistd.h>

int main(void)
{
    fork();
    fork();
    fork();
    printf("Hello\n");
    return 0;
}
```

1. After the 1st `fork()`: 2 processes.
2. After the 2nd `fork()`: 2 × 2 = 4 processes.
3. After the 3rd `fork()`: 4 × 2 = 8 processes.

Each of the 2³ = **8** processes prints once, so "Hello" is printed **8 times**, and 2³ − 1 = **7** child processes were created.

### fork() vs exec()

| Basis | fork() | exec() |
| --- | --- | --- |
| Purpose | Creates a new process | Runs a new program in the existing process |
| Result | Two processes (parent and child) | Still one process; its code is replaced |
| PID | The child gets a new PID | PID does not change |
| Return | Returns twice (in parent and child) | Does not return on success |

### Pipes

> **A pipe is a one-way (unidirectional) communication channel through which one process writes data and another, related process reads it.**

1. A pipe is created with `int pipe(int fd[2]);`. It returns 0 on success and −1 on error.
2. `fd[0]` is the **read end** and `fd[1]` is the **write end**.
3. Data is read in **FIFO** (first in, first out) order.
4. A pipe is kept in main memory by the kernel and is used like a file, with `read()` and `write()`.
5. If a process reads from an empty pipe, it **blocks** until data is written. When no process has the write end open, `read()` returns 0 (end of file).
6. An ordinary pipe can be used only between **related processes** (such as a parent and child), because the child inherits the pipe's file descriptors through `fork()`.
7. For two-way communication, **two pipes** are needed.
8. In the shell, the `|` symbol connects two commands with a pipe: in `ls | sort`, the output of `ls` becomes the input of `sort`.

![A pipe: the parent writes into fd[1] and the child reads from fd[0]](/diagrams/operating-systems/pipe.svg)

### Using fork() and pipe() Together

The pipe is created **before** `fork()`, so both processes have both ends. Each process closes the end it does not use.

```c
#include <stdio.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void)
{
    int fd[2];                       /* fd[0] = read end, fd[1] = write end */
    char buf[32];

    if (pipe(fd) == -1) {
        perror("pipe");
        return 1;
    }

    if (fork() == 0) {               /* child: reader */
        close(fd[1]);                /* close the unused write end */
        int n = read(fd[0], buf, sizeof(buf) - 1);
        buf[n] = '\0';
        printf("Child read: %s\n", buf);
        close(fd[0]);
    } else {                         /* parent: writer */
        close(fd[0]);                /* close the unused read end */
        const char *msg = "Hello, child";
        write(fd[1], msg, strlen(msg));
        close(fd[1]);
        wait(NULL);
    }
    return 0;
}
```

Output:

```text
Child read: Hello, child
```

## Threads: Process vs Thread {#threads-process-vs-thread}

### Definition

**A thread** is the smallest unit of execution (the basic unit of CPU utilization) within a process: a single sequential flow of control.

A thread is also called a **lightweight process (LWP)**. A traditional process has a single thread of control; a **multithreaded** process has several threads that run concurrently and share the resources of the process. For example, a word processor can use one thread to read keystrokes, another to check spelling and another to save the file in the background.

**Multithreading** is the ability of a process to have several threads that execute concurrently and share the process's resources.

### Components of a Thread

Each thread has its own:

1. **Thread ID.**
2. **Program counter (PC):** the address of the next instruction of the thread.
3. **Register set:** the values of the CPU registers of the thread.
4. **Stack:** the local variables and the return addresses of the thread's function calls.
5. **Thread state** (running, ready, blocked and so on).

These are kept in a **Thread Control Block (TCB)**, which also points to the PCB of the process that owns the thread.

All threads of a process **share**:

1. The **code section**.
2. The **data section** (global variables) and the heap.
3. **Open files**, signals and other operating-system resources.

![A single-threaded process and a multithreaded process with three threads: code, data and files are shared; each thread has its own registers, stack and program counter](/diagrams/operating-systems/single-vs-multithreaded-process.svg)

### Benefits of Multithreading

1. **Responsiveness:** one thread can keep working (for example, the user interface) while another is blocked or doing a long operation.
2. **Resource sharing:** threads share the memory and resources of their process automatically, so they need no special arrangement to communicate.
3. **Economy:** creating a thread and switching between threads cost much less time and memory than creating and switching processes.
4. **Scalability:** the threads of one process can run in parallel on different processors or cores.

### Types of Threads

There are two types of threads:

1. User-level threads
2. Kernel-level threads

#### 1. User-Level Threads

**A user-level thread (ULT)** is a thread that is created and managed by a thread library in user space, without the kernel knowing about it.

The kernel sees the process as single-threaded. Thread switching needs no change to kernel mode, so it is fast, and user-level threads can run on any operating system. However, if one thread makes a blocking system call, the whole process is blocked, and the threads of one process cannot run in parallel on several processors.

#### 2. Kernel-Level Threads

**A kernel-level thread (KLT)** is a thread that is created, scheduled and managed directly by the operating-system kernel.

The kernel keeps information about every thread. If one thread blocks, the kernel can run another thread of the same process, and threads can run in parallel on several processors. However, creating and switching kernel threads is slower, because every operation needs the kernel. Almost all modern operating systems — Windows, Linux, Solaris and macOS — support kernel threads.

#### Differences Between User-Level and Kernel-Level Threads

| Basis | User-level thread | Kernel-level thread |
| --- | --- | --- |
| Managed by | A thread library in user space | The operating-system kernel |
| Kernel awareness | The kernel does not know about the threads | The kernel knows about each thread |
| Creation and management | Fast and simple | Slower and more complex |
| Context switch | Fast; no switch to kernel mode | Slower; needs a switch to kernel mode |
| Blocking system call | Blocks the whole process | Blocks only the calling thread |
| Multiprocessor use | Threads of a process cannot run in parallel | Threads can run in parallel on different processors |
| Portability | Run on any operating system | Specific to the operating system |

### Multithreading Models

**A multithreading model** is the relationship (mapping) between user threads and kernel threads.

There are four multithreading models:

1. **Many-to-one:** many user threads are mapped to **one** kernel thread. Thread management is done in user space, so it is efficient, but a blocking call by one thread blocks the whole process, and only one thread can be in the kernel at a time, so there is no parallelism. Example: Solaris Green Threads. Few systems use this model today.
2. **One-to-one:** each user thread is mapped to **its own** kernel thread. It gives more concurrency: when one thread blocks, another can run, and threads run in parallel on multiprocessors. Its drawback is that creating a user thread means creating a kernel thread, so the number of threads is often limited. Examples: Windows and Linux.
3. **Many-to-many:** many user threads are multiplexed onto a **smaller or equal number** of kernel threads. The programmer can create as many user threads as needed, the kernel threads run in parallel, and a blocking call does not block the whole process. Example: Solaris before version 9.
4. **Two-level model:** like many-to-many, but a user thread can also be **bound** to one kernel thread. Examples: IRIX, HP-UX and Tru64 UNIX.

![The many-to-one, one-to-one and many-to-many models, mapping user threads to kernel threads](/diagrams/operating-systems/multithreading-models.svg)

### Differences Between a Process and a Thread

| Basis | Process | Thread |
| --- | --- | --- |
| Definition | A program in execution | A unit of execution within a process |
| Weight | Heavyweight | Lightweight |
| Memory | Has its own separate address space | Shares the address space (code, data, files) of its process |
| Private items | Its own PCB, address space and resources | Its own TCB, program counter, registers and stack |
| Creation and termination time | More | Less |
| Context switching | Slower | Faster |
| Communication | Needs inter-process communication (pipes, message queues, shared memory) through system calls | Directly through shared memory; faster |
| Resource use | More | Less |
| Independence | Processes are independent of each other | Threads of a process are interdependent; one thread can read and write another's data |
| Effect of a crash | A crash in one process does not affect other processes | A crash in one thread can stop the whole process |
| Synchronization | Needed only when processes share resources | Needed for shared data (to avoid race conditions) |
| Creation (UNIX) | `fork()` system call | A thread library call such as `pthread_create()` |
| Relationship | A process can contain several threads | A thread belongs to exactly one process |

## References {#references}

**TutorialsPoint**

- [Operating System - Processes](https://www.tutorialspoint.com/operating_system/os_processes.htm) — accessed 2026-11-03 (it describes the text section as the "current activity"; the text section holds the program code, as GeeksforGeeks states)
- [States of a Process](https://www.tutorialspoint.com/operating_system/os_states_of_process.htm) — accessed 2026-11-03
- [Process Control Block](https://www.tutorialspoint.com/operating_system/os_process_control_block.htm) — accessed 2026-11-03
- [Operations on Processes](https://www.tutorialspoint.com/operating_system/os_operations_on_processes.htm) — accessed 2026-11-03
- [fork() System Call in Linux](https://www.tutorialspoint.com/unix_system_calls/fork.htm) — accessed 2026-11-03
- [pipe() System Call in Linux](https://www.tutorialspoint.com/unix_system_calls/pipe.htm) — accessed 2026-11-03
- [Operating System – Multi-Threading](https://www.tutorialspoint.com/operating_system/os_multi_threading.htm) — accessed 2026-11-07
- [Difference between Process and Thread](https://www.tutorialspoint.com/article/difference-between-process-and-thread) — accessed 2026-11-07

**GeeksforGeeks**

- [Process in Operating System](https://www.geeksforgeeks.org/operating-systems/process-in-operating-system/) — accessed 2026-11-03
- [Operations on Processes](https://www.geeksforgeeks.org/operating-systems/operations-on-processes/) — accessed 2026-11-03
- [Process Creation and Deletions in Operating Systems](https://www.geeksforgeeks.org/operating-systems/process-creation-and-deletions-in-operating-systems/) — accessed 2026-11-03
- [Concurrency in Operating System](https://www.geeksforgeeks.org/operating-systems/concurrency-in-operating-system/) — accessed 2026-11-03
- [Context Switching in Operating System](https://www.geeksforgeeks.org/operating-systems/context-switch-in-operating-system/) — accessed 2026-11-03
- [Process States and Transitions in a UNIX Process](https://www.geeksforgeeks.org/linux-unix/process-states-and-transitions-in-a-unix-process/) — accessed 2026-11-03
- [Zombie and Orphan Processes in C](https://www.geeksforgeeks.org/c/zombie-and-orphan-processes-in-c/) — accessed 2026-11-03
- [Signals in C language](https://www.geeksforgeeks.org/signals-c-language/) — accessed 2026-11-03
- [fork() in C](https://www.geeksforgeeks.org/c/fork-system-call/) — accessed 2026-11-03
- [pipe() System call](https://www.geeksforgeeks.org/c/pipe-system-call/) — accessed 2026-11-03 (it says a read on an empty pipe with no writer returns −1; it returns 0, end of file — see Additional sources)
- [Thread in Operating System](https://www.geeksforgeeks.org/operating-systems/thread-in-operating-system/) — accessed 2026-11-07
- [Process vs Thread](https://www.geeksforgeeks.org/operating-systems/difference-between-process-and-thread/) — accessed 2026-11-07
- [User Level vs Kernel Level Threads](https://www.geeksforgeeks.org/operating-systems/difference-between-user-level-thread-and-kernel-level-thread/) — accessed 2026-11-07
- [Multithreading in OS – Different Models](https://www.geeksforgeeks.org/operating-systems/multithreading-in-operating-system/) — accessed 2026-11-07

**TpointTech**

- [What is the Process in Operating Systems](https://www.tpointtech.com/what-is-the-process-in-operating-system) — accessed 2026-11-03
- [OS Process States](https://www.tpointtech.com/os-process-states) — accessed 2026-11-03
- [Process Control Block (PCB) in Operating Systems](https://www.tpointtech.com/process-control-block-pcb-in-operating-systems) — accessed 2026-11-03
- [Context Switching in OS](https://www.tpointtech.com/what-is-the-context-switching-in-the-operating-system) — accessed 2026-11-03
- [Concurrency in Operating System](https://www.tpointtech.com/concurrency-in-operating-system) — accessed 2026-11-03
- [Linux Signals](https://www.tpointtech.com/linux-signals) — accessed 2026-11-03 (it says SIGQUIT is sent by Ctrl+D; it is sent by Ctrl+\\, and Ctrl+D means end of input)
- [C Program to Demonstrate fork() and pipe()](https://www.tpointtech.com/c-program-to-demonstrate-fork-and-pipe) — accessed 2026-11-03
- [Threads in Operating System (OS)](https://www.tpointtech.com/threads-in-operating-system) — accessed 2026-11-07
- [Process vs Thread: What's the Difference?](https://www.tpointtech.com/process-vs-thread) — accessed 2026-11-07
- [Difference between User level and Kernel level threads](https://www.tpointtech.com/user-level-vs-kernel-level-threads-in-operating-system) — accessed 2026-11-07
- [Multithreading Models in Operating System](https://www.tpointtech.com/multithreading-models-in-operating-system) — accessed 2026-11-07

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (used where the reference websites do not cover the point or disagree)

- Maurice J. Bach, *The Design of the UNIX Operating System* — the user-level, register and system-level context of a process
- Andrew S. Tanenbaum, *Modern Operating Systems*, "Process Hierarchies" — UNIX process groups and the absence of a process hierarchy in Windows
- [signal(7) — Linux manual page](https://man7.org/linux/man-pages/man7/signal.7.html) — signal numbers and default actions; SIGKILL and SIGSTOP cannot be caught — accessed 2026-11-03
- [pipe(7) — Linux manual page](https://man7.org/linux/man-pages/man7/pipe.7.html) — `read()` returns 0 (end of file) when all write ends are closed — accessed 2026-11-03
- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, 9th ed., [Chapter 4 slides: Threads](https://www.os-book.com/OS9/slide-dir/PDF-dir/ch4.pdf) — benefits of multithreading, multithreading models including the two-level model, and examples — accessed 2026-11-07
- All C programs were compiled with GCC and run on Linux; the outputs shown are the real outputs.

Issues found on the reference websites (threads) and how they were resolved:

1. TutorialsPoint's process-vs-thread table says a blocked process prevents other processes from running; other processes continue (GeeksforGeeks, TpointTech).
2. GeeksforGeeks' user-level vs kernel-level table says kernel threads each have their own address space; all threads of a process share its address space, so that row was not used.
3. GeeksforGeeks and TpointTech list Pthreads and Java threads as user-level threads and also as kernel-level threads; these are thread libraries (APIs) that can be implemented either way, so the examples follow Silberschatz (kernel threads are supported by Windows, Linux and Solaris).
4. TpointTech's multithreading-models page says many-to-one blocks "the whole system" and that many-to-many can schedule only one process at a time; a blocking call blocks the whole process, and many-to-many gives parallelism (Silberschatz, TutorialsPoint, GeeksforGeeks).
5. TutorialsPoint's "What is a multithreading model in OS?" page describes process/thread configurations rather than user-to-kernel thread mappings, so it was not used.
6. The two-level model is not described on any of the reference websites; it is taken from Silberschatz, Galvin and Gagne.
