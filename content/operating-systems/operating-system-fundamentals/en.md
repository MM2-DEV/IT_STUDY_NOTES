---
description: Operating system fundamentals - definition and overview, goals and components, functions, characteristics, evolution, types of operating system, DOS, Windows, and the hardware concepts related to an OS (CPU states, I/O channels, memory hierarchy and microprogramming).
updated: 2026-11-03
---

## Overview of Operating System {#overview-of-operating-system}

### Definition

> **An operating system (OS) is system software that acts as an interface (intermediary) between the user and the computer hardware.**

It manages all the hardware and software resources of the computer and provides common services to the programs that run on it.

The operating system can be described in three ways:

1. **Low-level software:** it supports the basic functions of the computer, such as scheduling tasks and controlling peripheral devices.
2. **Interface program:** it works between the user and the hardware and controls the execution of all kinds of programs.
3. **Resource manager:** it manages the hardware and software resources (CPU, memory, storage and I/O devices) and gives them to the programs that need them.

The OS is the first program loaded when the computer starts (through a boot program). After that it controls all other programs. No application program can run on a computer without an operating system.

### Place of the OS in a Computer System

A general-purpose computer system has four parts, from the bottom to the top:

1. **Hardware:** the CPU, main memory, storage devices, and input/output (I/O) devices.
2. **Operating system:** controls the hardware and provides services to the other software.
3. **System programs:** compilers, assemblers, loaders, editors, utilities and command interpreters.
4. **Application programs:** user software that performs specific tasks, such as word processors, web browsers and games.

![Layers of a computer system: users, application programs, system programs, operating system and hardware](/diagrams/operating-systems/computer-system-layers.svg)

The user works with application programs; the application programs request services from the operating system; and only the operating system controls the hardware directly.

### Parts of an Operating System: Kernel and Shell

The two commonly named parts of an operating system are:

1. **Kernel:** the core of the operating system. It stays in memory while the computer runs, provides the interface between software and hardware, and manages the CPU, memory, files and devices.
2. **Shell:** the command interpreter. It accepts the user's commands, interprets them, and calls the programs or system services that carry them out. Examples are the Windows command window (Command Prompt), and Bash and C-Shell on UNIX/Linux.

### Types of User Interfaces

A user communicates with an operating system through one of two types of interface:

1. **Command-Line Interface (CLI):** the user types text commands, for example in MS-DOS, Bash or PowerShell.
2. **Graphical User Interface (GUI):** the user works with windows, icons, menus and a pointing device (mouse), for example the Windows desktop or macOS Finder.

### Examples of Operating Systems

1. **Microsoft Windows:** developed by Microsoft; used for personal computing, business and gaming.
2. **macOS:** developed by Apple for Mac computers.
3. **Linux:** created by Linus Torvalds and developed by an open-source community; used in servers, embedded systems and personal computers.
4. **UNIX:** originally developed at AT&T Bell Labs; used in servers, workstations and research.
5. **Android** and **iOS:** operating systems for smartphones and tablets.
6. **MS-DOS:** an early command-line operating system for IBM PC-compatible computers.

Operating systems run on many kinds of devices: mobile phones, personal computers, mainframes, cars, televisions and even toys.

## Goals and Components of Operating System {#goals-and-components-of-operating-system}

### Goals of an Operating System

The goals of an operating system are divided into primary and secondary goals.

**Primary goals:**

1. **User convenience:** the computer should be easy to use, with a user-friendly interface (GUI or simple commands) and helpful error messages. The OS hides the complexity of the hardware from the user.
2. **Program execution:** the OS provides the environment and services that programs need to run (loading programs into memory, running them and ending them).
3. **Resource management:** the OS allocates the CPU, memory, disk storage and I/O devices to users and programs fairly.
4. **Security:** the OS protects system and user data from unauthorized access (through authentication, file permissions and access control).

**Secondary goals:**

1. **Efficient resource utilization:** the OS should get the maximum performance from the CPU, memory and I/O devices.
2. **Reliability:** the OS should detect and handle errors and unexpected situations and keep the system stable.

### The Three Objectives of an OS (Textbook View)

William Stallings' textbook *Operating Systems: Internals and Design Principles* describes the OS with three objectives:

1. **Convenience:** an OS makes the computer more convenient to use.
2. **Efficiency:** an OS allows the resources of the computer system to be used in an efficient manner.
3. **Ability to evolve:** an OS should be built so that new system functions can be developed, tested and introduced without interfering with service. An OS must change over time because of hardware upgrades, new types of hardware, new services and fixes to faults.

### Components of an Operating System

An operating system is made of components, each of which performs a definite task. Most operating systems share the following eight components.

#### 1. Process Management

A **process** is a program in execution.

It needs resources such as CPU time, memory, files and I/O devices. The process management component:

1. Creates and deletes (terminates) user and system processes.
2. Suspends and resumes processes.
3. Switches the CPU among the processes in main memory (scheduling).
4. Provides mechanisms for **process synchronization**, so that concurrent access to shared data stays consistent.
5. Provides mechanisms for **process communication**, so that processes on the same or different computers can exchange information.
6. Allocates and releases resources carefully to prevent or avoid **deadlock**.

#### 2. I/O Device Management

This component hides the details of specific hardware devices from the user and the application programs. User programs cannot perform I/O directly; the OS performs it for them. It:

1. Provides a general device-driver interface and drivers for particular hardware devices.
2. Manages memory for devices through **buffering**, **caching** and **spooling**.
3. Keeps track of the characteristics of each device.

#### 3. File Management

A **file** is a collection of related information defined by its creator.

Files usually hold programs (source and object form) and data, which may be numeric, alphabetic or alphanumeric. Files are organized into **directories** (folders). The file management component:

1. Creates and deletes files.
2. Creates and deletes directories.
3. Provides operations (primitives) to manipulate files and directories, such as read, write, copy and rename.
4. Maps files onto secondary storage.
5. Backs up files on stable (non-volatile) storage media.

#### 4. Network Management

Network management administers a network of connected computers so that they can communicate efficiently. It includes:

1. Network administration and maintenance.
2. Network operation and provisioning.
3. Fault analysis and performance management.
4. Maintaining the quality of service.
5. Network security.

#### 5. Main Memory Management

**Main memory** is a large array of bytes (or words), each with its own address.

It is fast and directly accessible by the CPU, but it is **volatile** (its contents are lost when power fails) and limited in size. A program must be in main memory to run. The main memory management component:

1. Keeps track of which parts of memory are in use and by which process.
2. Decides which processes to load when memory space becomes available.
3. Allocates memory to a process when it requests it.
4. Deallocates (frees) memory when a process no longer needs it or has terminated.

#### 6. Secondary Storage Management

Main memory is too small and is volatile, so it cannot hold all programs and data permanently. **Secondary storage** (mainly hard disks and SSDs) is used as the back-up of main memory. Programs such as compilers, assemblers and editors stay on disk until they are loaded into memory. The secondary storage management component handles:

1. Free-space management.
2. Storage allocation.
3. Disk scheduling.

#### 7. Security Management

The OS protects processes from one another and makes sure that only properly authorized processes can use the files, memory, CPU and other resources. Examples:

1. **Memory-addressing hardware** keeps each process within its own address space.
2. A **timer** prevents any process from holding the CPU forever.
3. Processes are not allowed to do their own I/O, which protects the peripheral devices.

#### 8. Command Interpreter System

The command interpreter is the main interface between the user and the rest of the system. It reads each command (control statement) and carries it out by calling system programs or system calls. It is also called the **command-line interpreter**, **control-card interpreter**, or **shell** (in UNIX). It starts automatically when a user logs in to a time-sharing system or when a batch job starts.

#### Other Components Named by GeeksforGeeks

1. **System calls:** the interface between a running program and the services of the OS. A user program obtains an OS service (for example, file or I/O operations) only through a system call.
2. **Signals:** notifications sent to a process that an event has occurred. A signal interrupts the current task, and the process handles it with a default or a user-defined handler.

## Functions / Functionalities of Operating System {#functions-functionalities-of-operating-system}

The main functions of an operating system are:

1. Memory management
2. Processor (process) management
3. Device management
4. File management
5. Security and protection
6. Network management
7. User interface
8. Control over system performance
9. Job accounting
10. Error-detecting aids
11. Coordination between other software and users

### 1. Memory Management

Main memory is a large array of words or bytes, each with its own address. Every program must be in main memory to run. The OS:

1. Keeps track of primary memory: which parts are in use, by whom, and which parts are free.
2. Decides, in multiprogramming, which process gets memory, when, and how much.
3. Allocates memory when a process requests it.
4. Deallocates memory when a process no longer needs it or has terminated.
5. Protects the memory of one process from other processes.
6. Provides **virtual memory**, which lets a program larger than physical memory run by using disk space as extra memory.

### 2. Processor Management

In a multiprogramming environment, the OS decides which process gets the processor, when, and for how long. This function is called **process scheduling**. The OS:

1. Keeps track of the processor and the status of each process. The program that does this is called the **traffic controller**.
2. Allocates the processor (CPU) to a process, using a scheduling algorithm such as First Come First Serve, Shortest Job First, Round Robin or Priority scheduling.
3. De-allocates the processor when a process no longer needs it.
4. Performs **context switching**: it saves the state of the current process before giving the CPU to the next one.

### 3. Device Management

The OS manages device communication through the respective drivers. It:

1. Keeps track of all devices. The program responsible for this is called the **I/O controller**.
2. Decides which process gets a device, when, and for how long.
3. Allocates devices efficiently.
4. De-allocates devices when they are no longer needed.
5. Uses **buffering** and **spooling** (Simultaneous Peripheral Operation On-Line) to balance the speed difference between the fast CPU and slow devices. For example, with spooling, print jobs wait on the disk while the CPU continues with other work.

### 4. File Management

A file system is normally organized into directories for easy navigation and use. The OS:

1. Keeps track of information, location, uses and status of files. These facilities are collectively called the **file system**.
2. Decides who gets access to the files.
3. Allocates and de-allocates the resources (creates, opens, reads, writes, copies and deletes files).

### Other Functions

1. **Security:** protects programs and data from unauthorized access with passwords and similar techniques.
2. **Network management:** manages network resources and lets users reach remote resources in the same way as local files.
3. **User interface:** provides a CLI or a GUI through which the user communicates with the computer.
4. **Control over system performance:** records the delay between a request for a service and the response from the system.
5. **Job accounting:** keeps track of the time and resources used by various jobs and users.
6. **Error-detecting aids:** produces dumps, traces, error messages and other debugging and error-detecting aids.
7. **Coordination between other software and users:** coordinates and assigns compilers, interpreters, assemblers and other software to the various users.

## Characteristics of Operating System {#characteristics-of-operating-system}

The important characteristics (properties) of an operating system are listed below.

### 1. Batch Processing

The OS collects programs and data together in a **batch** before processing starts. Each job is a predefined sequence of commands, programs and data. Jobs are run one after another in first-come, first-served order without manual intervention. When a job finishes, its memory is released and its output goes to an output spool for later printing.

- **Advantages:** the operator's work is reduced; performance improves because a new job starts as soon as the previous one ends.
- **Disadvantages:** programs are hard to debug; a job could enter an infinite loop; without a protection scheme, one job may affect the pending jobs.

### 2. Multitasking

Multiple jobs are executed by the CPU by switching between them so quickly that the user can interact with each program while it runs. Multitasking is also called **time-sharing**. Each user gets a small portion of CPU time (a time slice), and because switching is fast, each user feels that the whole CPU is dedicated to him or her.

- **Advantages:** several programs and users can work at the same time; response time is better; resources are used efficiently.
- **Disadvantages:** programs may slow down when many run together; more CPU activity produces more heat.

### 3. Multiprogramming

Two or more programs reside in main memory at the same time and share a single processor. When the running program waits (for example, for I/O), the CPU switches to another program, so the CPU is rarely idle. The OS keeps several jobs in memory, picks one, and runs it.

- **Advantages:** high and efficient CPU utilization; the user feels that many programs are running almost simultaneously.
- **Disadvantages:** CPU scheduling is required; memory management is required to hold many jobs in memory.

### 4. Interactivity

Interactivity is the ability of users to interact with the computer system.

For this the OS:

1. Provides a user interface to interact with the system.
2. Manages input devices (such as the keyboard) and output devices (such as the monitor).

An interactive system must have a **short response time**, because the user waits for the result.

### 5. Real-Time System

A **real-time system** is a system that must respond to inputs (events) within a **guaranteed, fixed time period** to work correctly.

It is usually a **dedicated, embedded system**: the OS reads information from sensors and must respond in time.

- **Advantages:** fast and timely response; suitable for time-critical tasks.
- **Disadvantages:** very complex to design.

### 6. Distributed Environment

Several independent processors (CPUs) are used. The OS distributes the computation among them. The processors do not share memory or a clock; each has its own local memory, and they communicate through communication lines.

- **Advantages:** the failure of one processor does not stop the whole system; the combined processing power is available; processors can be added easily.
- **Disadvantages:** less software support; security and data-integrity problems; the network is expensive to set up.

### 7. Spooling

**Spooling** (**Simultaneous Peripheral Operations On-Line**) is a technique in which the data of I/O jobs is placed in a buffer — a special area in memory or on the hard disk — from which the slow I/O devices take it, so that the CPU and the devices can work at the same time.

Spooling:

1. Handles I/O devices that have different data access rates.
2. Keeps the data in the spool while the slower device catches up.
3. Allows parallel work: the computer can read data from one device, write to another and print at the same time as it computes.

- **Advantages:** uses the disk as a very large buffer; overlaps the I/O of one job with the computation of another job.
- **Disadvantages:** increases disk traffic; needs a large amount of storage.

## Evolution of Operating System {#evolution-of-operating-system}

Operating systems developed together with computer hardware. Their evolution is usually described in four generations.

### Generations of Operating Systems

The four generations of operating systems are:

1. First generation (1945–1955): no operating system
2. Second generation (1955–1965): batch processing systems
3. Third generation (1965–1980): multiprogramming and time-sharing
4. Fourth generation (1980–present): personal computers, GUI and networks

#### 1. First Generation (1945–1955): No Operating System

1. Computers (for example, ENIAC and UNIVAC) were huge machines built with vacuum tubes.
2. There was **no operating system**. Programmers wrote programs directly in **machine language** and set up the machine with switches and wires (plug boards).
3. Each user booked the whole machine for a time slot and loaded the program by hand using punched cards or paper tape.
4. **Problem:** the setup time was often longer than the computation time.

#### 2. Second Generation (1955–1965): Batch Processing Systems

1. Jobs were submitted on **punched cards**. An operator grouped jobs with similar needs into **batches**, and the batches were run one after another.
2. A small resident program (a **monitor**) loaded the next job automatically when the previous one finished.
3. **GM-NAA I/O (1956)**, developed by General Motors Research and North American Aviation for the **IBM 704**, is regarded as the first operating system. Other examples are FMS (Fortran Monitor System) and IBSYS for the IBM 7094.
4. **Problems:** no interaction between the user and the job (results could take hours or days); the CPU was often idle while slow mechanical I/O devices worked.

#### 3. Third Generation (1965–1980): Multiprogramming and Time-Sharing

1. **Multiprogramming:** several jobs were kept in memory at the same time, and the CPU switched to another job when one waited for I/O. Examples: IBM OS/360, CDC SCOPE and Burroughs MCP.
2. **Time-sharing:** many users at online terminals used one computer at the same time, each getting a short slice of CPU time. Examples: **CTSS** (1961) and **MULTICS** (developed in the mid-1960s by MIT, Bell Labs and General Electric).
3. **UNIX** development began at **Bell Labs in 1969**, led by **Ken Thompson** and **Dennis Ritchie**, as a smaller system after Bell Labs left the MULTICS project. UNIX was rewritten in the **C language in 1973**.
4. **Spooling** came into use, and minicomputers (starting with the DEC PDP-1 in 1961) appeared.

#### 4. Fourth Generation (1980–Present): Personal Computers, GUI and Networks

1. Personal computers became common, along with **graphical user interfaces**, **networking** and **distributed computing**.
2. Early PC operating systems were command-line based: **CP/M** (1974) and **MS-DOS** (1981).
3. GUI operating systems followed: Apple **Macintosh** (1984) and **Microsoft Windows 1.0** (1985).
4. **Network operating systems** (such as Novell NetWare and Windows NT) managed file sharing and communication between computers.
5. **Linux** (1991) brought open-source operating systems.
6. **Mobile operating systems** — **iOS** (2007) and **Android** (2008) — became dominant on smartphones.
7. Modern operating systems add cloud and virtualization support and AI-based voice assistants such as Siri, Google Assistant and Alexa.

### Summary of the Generations

| Generation | Period | Hardware | Operating system stage | Examples |
| --- | --- | --- | --- | --- |
| First | 1945–1955 | Vacuum tubes | No OS; manual operation in machine language | ENIAC, UNIVAC |
| Second | 1955–1965 | Transistors | Batch processing systems | GM-NAA I/O, FMS, IBSYS |
| Third | 1965–1980 | Integrated circuits | Multiprogramming and time-sharing | OS/360, CTSS, MULTICS, UNIX |
| Fourth | 1980–present | Microprocessors (VLSI) | Personal computer, GUI, network, distributed and mobile OS | MS-DOS, Mac OS, Windows, Linux, Android |

### Important Milestones

| Year | Milestone |
| --- | --- |
| 1956 | GM-NAA I/O, the first operating system (for the IBM 704) |
| 1961 | CTSS, an early time-sharing system |
| 1964 | IBM OS/360 announced |
| 1969 | UNIX development begins at Bell Labs |
| 1973 | UNIX rewritten in C |
| 1974 | CP/M |
| 1981 | MS-DOS (and IBM PC DOS) |
| 1984 | Apple Macintosh with a GUI |
| 1985 | Microsoft Windows 1.0 |
| 1991 | Linux |
| 1993 | Windows NT 3.1 |
| 1995 | Windows 95 |
| 2007 | iOS (iPhone) |
| 2008 | Android |

## Types of Operating System {#types-of-operating-system}

The main types of operating system are:

1. Batch operating system
2. Multiprogramming operating system
3. Multitasking / time-sharing operating system
4. Multiprocessing operating system
5. Distributed operating system
6. Network operating system
7. Real-time operating system
8. Mobile operating system

### 1. Batch Operating System

The users do not interact with the computer directly. Each user prepares a job offline (for example, on punched cards) and gives it to the computer operator. The operator groups jobs with similar requirements into **batches**, and the batches are executed one after another.

- **Examples of use:** payroll processing, bank statements, billing.
- **Advantages:** little CPU idle time between jobs; suitable for large repetitive jobs; high throughput.
- **Disadvantages:** no direct interaction between the user and the job; the CPU is often idle because mechanical I/O devices are slower than the CPU; it is hard to give a desired priority to a job; output can take a long time.

### 2. Multiprogramming Operating System

Several programs are kept in main memory at the same time. When the running program waits for I/O, the CPU switches to another program, so the CPU always has something to execute.

- **Advantages:** better CPU utilization; higher throughput; efficient sharing of CPU, memory and I/O devices.
- **Disadvantages:** needs complex CPU scheduling and memory management; needs more memory.

### 3. Multitasking / Time-Sharing Operating System

A time-sharing OS lets many users at different terminals use one computer at the same time by **sharing the processor's time**. It is a logical extension of multiprogramming. The CPU switches between jobs so quickly that each user gets a short time slice (**quantum**) in turn and receives an immediate response.

- **Main objective:** to **minimize response time**. (A multiprogrammed batch system aims to **maximize processor use**.)
- **Examples:** IBM VM/CMS, TSO (Time Sharing Option), Windows Terminal Services.
- **Advantages:** quick response; avoids duplication of software; reduces CPU idle time.
- **Disadvantages:** problems of reliability; security and integrity of user programs and data; problems of data communication.

### 4. Multiprocessing Operating System

A multiprocessing OS uses **two or more CPUs** that execute processes at the same time, which increases throughput. There are two kinds:

1. **Symmetric multiprocessing (SMP):** all processors are equal, share memory and I/O, and share the workload. If one fails, the others continue.
2. **Asymmetric multiprocessing (AMP):** one **master** processor assigns tasks to the **slave** processors.

- **Examples:** UNIX, Linux, Solaris.
- **Advantages:** faster processing; high reliability (if one processor fails, the others keep working).
- **Disadvantages:** costly hardware; complex design.

### 5. Distributed Operating System

A distributed OS uses several independent computers (called **sites** or **nodes**), each with its own CPU and memory, connected by communication lines (high-speed buses or networks). The processors do not share memory or a clock. Jobs are distributed among the computers, but the whole collection appears to the users as **one single system**, and a user can use files and resources on remote machines.

- **Examples:** LOCUS, MICROS, Amoeba.
- **Advantages:** resource sharing between sites; if one site fails, the others can continue; faster processing by sharing the load; reduced delay in data processing; easy to add new computers.
- **Disadvantages:** depends on the network; complex and expensive to build; security is harder across many nodes.

### 6. Network Operating System

A network OS runs on a **server** and manages data, users, groups, security, applications and other networking functions. Its main purpose is to let computers on a network (usually a LAN) share files, printers and other resources. Each computer keeps its own operating system, and users are aware of the other computers in the network.

- **Examples:** Microsoft Windows Server 2003 and 2008, UNIX, Linux, Mac OS X, Novell NetWare, BSD.
- **Advantages:** centralized servers are highly stable; security is managed by the server; new technology and hardware are easy to add; servers can be accessed remotely.
- **Disadvantages:** servers are costly; users depend on the central server; regular maintenance and updates are needed.

### 7. Real-Time Operating System (RTOS)

A real-time system is one in which the time taken to process an input and respond (the **response time**) is very small and fixed. It is used where there are **rigid time requirements**, and it must finish the work within the time limit, otherwise the system fails.

- **Examples of use:** scientific experiments, medical imaging systems, industrial control systems, weapon systems, robots, air traffic control systems.

Types of real-time systems:

1. **Hard real-time system:** guarantees that critical tasks are completed on time; any delay is unacceptable (for example, airbags and flight control). Secondary storage is limited or absent, data is stored in ROM, and virtual memory is almost never used.
2. **Soft real-time system:** less restrictive; a critical task gets priority over other tasks until it completes, and an occasional missed deadline is tolerated (for example, multimedia, video streaming and virtual reality).
3. **Firm real-time system:** a missed deadline makes the result useless but does not cause failure of the system.

- **Advantages:** fast and predictable response; high utilization of devices.
- **Disadvantages:** only a few tasks run at a time; complex algorithms; expensive to design.

### 8. Mobile Operating System

A mobile OS is designed for smartphones and tablets. It manages the device's hardware and provides a touch-based platform for apps.

- **Examples:** Android, iOS.
- **Advantages:** easy touch interface; large app stores; many connectivity options.
- **Disadvantages:** limited battery life; security risks from malware.

### Comparison: Multiprogramming, Multitasking and Multiprocessing

| Basis | Multiprogramming | Multitasking (time-sharing) | Multiprocessing |
| --- | --- | --- | --- |
| Idea | Several programs in memory share one CPU | Several tasks share the CPU in fixed time slices | Two or more CPUs work at the same time |
| When the CPU switches | When the running program waits (for example, for I/O) | When the time slice (quantum) ends | Tasks run in parallel on different CPUs |
| Main objective | Maximize CPU utilization | Minimize response time | Increase throughput and reliability |
| Number of CPUs | One | One (or more) | More than one |

## DOS {#dos}

### Definition

**DOS (Disk Operating System)** is an operating system that manages data on disk storage devices.

The best-known DOS is **MS-DOS (Microsoft Disk Operating System)**, a **16-bit, single-user, single-tasking, command-line** operating system for x86-based IBM PC-compatible personal computers.

### History

1. **86-DOS** (also called **QDOS**, "Quick and Dirty Operating System") was written by **Tim Paterson** at **Seattle Computer Products** in 1980 for the Intel 8086 processor. It was modelled on Digital Research's **CP/M**.
2. **Microsoft** acquired 86-DOS and adapted it for IBM's new personal computer under the name **Microsoft Disk Operating System**.
3. The first version was released in **August 1981** (IBM sold it as **PC DOS**).
4. MS-DOS was the main operating system of IBM PC-compatible computers in the 1980s; it went through eight major versions.
5. **MS-DOS 6.22** (1994) was the last stand-alone version. Windows 95 included MS-DOS 7.0, and the final release came with Windows Me in **2000**.

### Features

1. **Command-line interface (CLI):** commands are typed at a prompt (such as `C:\>`); there is no GUI and the original system had no mouse support.
2. **Single-user** and **single-tasking:** only one user and one program at a time.
3. **16-bit** operating system with a **640 KB** conventional memory limit.
4. Uses the **FAT** (File Allocation Table) file system.
5. File names follow the **8.3 format**: up to 8 characters for the name and up to 3 for the extension (for example, `REPORT.TXT`). Extensions such as `.BAT`, `.COM`, `.EXE` and `.SYS` have special meanings.
6. Commands are **not case-sensitive**.
7. Lightweight: it boots quickly and runs on small machines.

### Boot Files of MS-DOS

| File | Role |
| --- | --- |
| `IO.SYS` | Hidden system file containing the default device drivers and basic input/output routines |
| `MSDOS.SYS` | Hidden system file containing the DOS kernel (core services) |
| `COMMAND.COM` | The command interpreter (shell); provides the prompt, contains the internal commands, and runs batch (`.BAT`) files |
| `CONFIG.SYS` | Configuration file read at start-up; can name the command interpreter and load drivers |
| `AUTOEXEC.BAT` | Batch file whose commands run automatically at start-up |

### Booting Process of DOS

1. **POST (Power-On Self Test):** the BIOS checks the RAM, CPU and peripherals.
2. The BIOS looks for a bootable device (hard disk, floppy disk or CD-ROM) and reads its first sector (the **Master Boot Record** / boot record).
3. The **bootstrap loader** is loaded into memory.
4. `IO.SYS` is loaded (device drivers, basic I/O).
5. `MSDOS.SYS` is loaded (the kernel).
6. `CONFIG.SYS` is processed, and the command interpreter — `COMMAND.COM` unless `CONFIG.SYS` names another — is loaded.
7. `AUTOEXEC.BAT` is executed, and the DOS prompt appears.

Starting a computer from the power-off state is a **cold boot**; restarting a running computer (for example, with **Ctrl + Alt + Del**) is a **warm boot**.

### Types of DOS Commands: Internal and External

| Basis | Internal commands | External commands |
| --- | --- | --- |
| Storage | Built into `COMMAND.COM`; loaded into memory at boot | Stored as separate program files on the disk |
| Execution | Run directly at the prompt, without a separate file | The file is loaded from disk into memory when the command is run |
| Examples | `DIR`, `CD`, `MD`, `RD`, `COPY`, `DEL`, `REN`, `TYPE`, `CLS`, `DATE`, `TIME`, `VER` | `FORMAT`, `CHKDSK`, `DISKCOPY`, `XCOPY`, `TREE`, `ATTRIB`, `MEM`, `DELTREE` |

Purpose of some common commands:

| Command | Purpose |
| --- | --- |
| `DIR` | Lists the files and directories |
| `CD` | Changes the current directory |
| `MD` | Makes a new directory |
| `RD` | Removes an empty directory |
| `COPY` | Copies files |
| `DEL` | Deletes files |
| `REN` | Renames files |
| `TYPE` | Displays the contents of a text file |
| `FORMAT` | Prepares (formats) a disk |
| `CHKDSK` | Checks a disk for errors |

Wildcards: `*` matches any number of characters and `?` matches one character (for example, `DIR *.TXT`).

### Advantages of DOS

1. Lightweight; boots fast and needs very little memory.
2. Direct access to the hardware and BIOS calls.
3. No multitasking overhead.
4. Simple commands; useful for repair, diagnostics and running old programs and games.

### Disadvantages of DOS

1. No multitasking; only one program runs at a time.
2. Single-user only.
3. No GUI; commands are hard for beginners to learn.
4. No built-in networking.
5. No security (no file ownership or permissions); files can easily be deleted without warning.
6. Difficult memory access beyond 640 KB, and limited graphics.

## Windows {#windows}

### Definition

**Microsoft Windows** is a family of **graphical user interface (GUI)** operating systems developed by **Microsoft**.

The user works with windows, icons, menus and a pointing device instead of typing commands. Windows is the most widely used desktop operating system.

### History

1. **Windows 1.0** was released on **20 November 1985** as a graphical operating environment running **on top of MS-DOS**.
2. The early versions (1.0 to 3.x) and the **Windows 9x** family (95, 98, Me) were based on MS-DOS. **Windows Me (2000)** was the last MS-DOS-based version.
3. **Windows NT** (New Technology), first released as **Windows NT 3.1 in July 1993**, was a separate 32-bit, multiprocessing, multiuser line for workstations and servers.
4. **Windows XP (2001)** merged the two lines: from XP onward, all consumer versions use the **NT kernel**.

### Major Versions

| Version | Release date | Notable point |
| --- | --- | --- |
| Windows 1.0 | 20 Nov 1985 | First Windows; GUI on top of MS-DOS |
| Windows 2.0 | 9 Dec 1987 | |
| Windows 3.0 | 22 May 1990 | Improved memory management; very popular |
| Windows 3.1 | 6 Apr 1992 | TrueType fonts, multimedia support |
| Windows NT 3.1 | July 1993 | First of the NT family |
| Windows 95 | 24 Aug 1995 | Start menu, taskbar, Plug and Play, 32-bit preemptive multitasking |
| Windows 98 | 25 Jun 1998 | FAT32 in a full retail release (first shipped in Windows 95 OSR2, 1996), better USB support |
| Windows 2000 | 17 Feb 2000 | NT-based business OS |
| Windows Me | 14 Sep 2000 | Last MS-DOS-based Windows |
| Windows XP | 25 Oct 2001 | Consumer Windows moves to the NT kernel |
| Windows Vista | 30 Jan 2007 | User Account Control |
| Windows 7 | 22 Oct 2009 | |
| Windows 8 | 26 Oct 2012 | Touch-focused Start screen |
| Windows 8.1 | 17 Oct 2013 | |
| Windows 10 | 29 Jul 2015 | Start menu returns; Edge browser; Cortana |
| Windows 11 | 5 Oct 2021 | Centered Start menu; needs TPM 2.0 and Secure Boot |

### Features of Windows

1. **Graphical user interface:** windows, icons, menus and mouse or touch input.
2. **Multitasking:** several applications run at the same time, each in its own window.
3. **Plug and Play:** connected hardware is detected and configured automatically.
4. **Start menu and taskbar** (introduced in Windows 95).
5. Wide **hardware and software compatibility**.
6. **Networking** and Internet support.
7. Still includes a **command prompt** for typing commands.

### Advantages of Windows

1. Easy to use, even for beginners, because of the GUI.
2. Supports most hardware, because manufacturers build drivers for it.
3. A very large range of software is available, including professional software and games.
4. Plug and Play makes adding devices easy.
5. Good support for gaming (DirectX).

### Disadvantages of Windows

1. It is a frequent target of viruses and malware.
2. It must be bought (licensing cost), and much of its software is paid.
3. It needs more resources (memory, processor, storage) than simpler systems.
4. Performance can slow down over time and needs maintenance.

### Difference between DOS and Windows

| Basis | DOS | Windows |
| --- | --- | --- |
| Interface | Command-line (CLI) | Graphical (GUI) |
| Tasks | Single-tasking | Multitasking |
| Users | Single-user | Multi-user support |
| Ease of use | Harder; commands must be remembered | Easier; point and click |
| Pointing device | Not needed (no mouse in the original) | Used (mouse, touch) |
| Windows open | One program at a time | Several windows at once |
| Memory and power use | Low | High |
| Networking | Not supported | Supported |
| Multimedia | Not supported | Supported (games, audio, video) |
| Speed of a single task | Faster (little overhead) | Slower |
| Word size | 16-bit | 32-bit and 64-bit (modern versions) |
| Use today | Rarely used | Widely used |

## Hardware Concepts Related to OS {#hardware-concepts-related-to-os}

An operating system depends on some hardware features to protect the system and to manage resources efficiently. Four important ones are **CPU states**, **I/O channels**, the **memory hierarchy** and **microprogramming**.

### CPU States

The CPU can run in (at least) two **states** or **modes**, so that user programs cannot damage the operating system or other programs. This is called **dual-mode operation**.

1. **Kernel mode** (also called **supervisor mode**, **system mode**, **privileged mode** or **master mode**): the operating system runs in this mode. It has **full access** to the hardware and can execute every instruction, including privileged instructions.
2. **User mode** (also called **restricted mode** or **slave mode**): application programs run in this mode. Access is **restricted**; a program cannot execute privileged instructions or access the hardware directly.

#### Mode Bit

A bit in the CPU, called the **mode bit**, shows the current mode:

| Mode | Mode bit |
| --- | --- |
| Kernel mode | **0** |
| User mode | **1** |

#### Privileged Instructions

**Privileged instructions** are the instructions that can be executed **only in kernel mode**.

Examples:

1. I/O instructions (I/O control and device management).
2. Instructions for interrupt handling (enabling and disabling interrupts).
3. Setting the timer.
4. Switching from user mode to kernel mode, and other mode-control instructions.
5. Memory-management instructions.

If a user program tries to execute a privileged instruction, the hardware does not execute it; it treats it as illegal and **traps** to the operating system.

#### Switching Between Modes

1. The computer **starts in kernel mode** at boot time. The OS is loaded, and then user programs are started in user mode.
2. **User mode → kernel mode** (mode bit 1 → 0) happens only through a **system call**, an **interrupt** or a **trap** (an exception such as division by zero or an invalid memory access).
3. The OS performs the requested service in kernel mode.
4. **Kernel mode → user mode** (mode bit 0 → 1): the OS sets the mode bit back to 1 before returning control to the user program.

![Dual-mode operation: a system call traps to kernel mode (mode bit 0) and returns to user mode (mode bit 1)](/diagrams/operating-systems/dual-mode.svg)

#### User Mode vs Kernel Mode

| Basis | User mode | Kernel mode |
| --- | --- | --- |
| Mode bit | 1 | 0 |
| Other names | Restricted mode, slave mode | Supervisor, system, privileged or master mode |
| Who runs in it | Application programs (editor, browser, calculator) | The operating system (kernel) |
| Privileged instructions | Not allowed (cause a trap) | Allowed |
| Hardware access | Indirect, through system calls | Direct and full |
| Address space | Each process has its own address space | Kernel processes share one address space |
| Effect of a crash | Only the faulty process fails | The whole system may fail |

**Advantages of dual mode:** protection (user programs cannot use privileged resources), stability (a fault in a user program does not crash the OS), and security. **Disadvantage:** switching between modes adds overhead.

### I/O Channels

An **I/O channel** (also called an **I/O processor**) is a special-purpose processor that controls input/output operations **on behalf of the CPU**.

It is an extension of the DMA (Direct Memory Access) idea: the channel is connected directly to main memory, can execute its own I/O instructions, and has complete control over the I/O operation. The CPU only starts the operation, so the CPU's I/O work is greatly reduced.

#### How a Channel Works

1. The CPU prepares a **channel program** in main memory. Each instruction of a channel program is a **Channel Command Word (CCW)**, which contains:
   1. the **command** (the I/O operation to perform),
   2. the **data address** (start of the memory buffer),
   3. the **count** (number of bytes to transfer), and
   4. **flag bits**.
2. The CPU issues an I/O instruction (such as **Start I/O**) that names the channel and the device.
3. The channel executes the channel program and transfers the data between the device and memory without the CPU.
4. When the transfer finishes, the channel informs the CPU (by an interrupt), and the result is recorded in a status word.

(The IBM 370, where the I/O processor is called a channel, is the standard example.)

#### Types of I/O Channels

1. **Selector channel:** connected to several **high-speed** devices (such as disks) but serves **only one device at a time**. It transfers a whole block for that device before selecting another.
2. **Multiplexer channel (byte multiplexer):** connected to many **slow and medium-speed** devices (such as card readers, printers and terminals) and serves **several devices at the same time** by interleaving their data **one byte (character) at a time**.
3. **Block multiplexer channel:** combines the features of the other two. It serves **several high-speed devices** at the same time by interleaving **blocks** of data.

| Basis | Selector channel | Multiplexer (byte) channel | Block multiplexer channel |
| --- | --- | --- | --- |
| Devices | High-speed | Slow and medium-speed | High-speed |
| Devices served at a time | One | Several | Several |
| Unit of transfer | Whole block for one device | One byte at a time from each device | Blocks interleaved from several devices |

**Advantages of I/O channels:** the CPU is freed from I/O work; the channel handles I/O errors itself; I/O and computation overlap. **Disadvantages:** channel hardware is costly; managing many channels at once can cause synchronization problems.

### Memory Hierarchy

The **memory hierarchy** is the arrangement of the different memories of a computer in levels according to their **speed (access time)**, **capacity (size)** and **cost per bit**.

Fast memory is expensive, so it is small; large memory is cheap but slow. The hierarchy combines them to give speed close to the fastest memory at a cost close to the cheapest.

#### Levels (from top to bottom)

1. **CPU registers:** inside the processor; the fastest and smallest storage, holding the data and instructions in current use.
2. **Cache memory:** small, fast SRAM memory between the CPU and main memory; holds frequently used data and instructions (levels L1, L2, L3).
3. **Main memory (RAM):** holds the programs and data currently running; larger and slower than cache. Static RAM (SRAM) stores bits in flip-flops; dynamic RAM (DRAM) stores bits as charge in capacitors and needs refreshing.
4. **Secondary storage:** magnetic (hard) disks and SSDs; non-volatile, much larger and slower.
5. **Tertiary storage:** magnetic tape and optical disks; used for backup and archiving; the largest, cheapest and slowest.

![Memory hierarchy pyramid from registers at the top to tertiary storage at the bottom](/diagrams/operating-systems/memory-hierarchy.svg)

Registers, cache and main memory are **internal (primary) memory**, accessed directly by the processor. Disks and tapes are **external (secondary) memory**, accessed through I/O modules.

#### Characteristics (moving down the hierarchy)

| Characteristic | Trend from top (registers) to bottom (tape) |
| --- | --- |
| Capacity | Increases |
| Access time | Increases (memory becomes slower) |
| Cost per bit | Decreases |
| Frequency of access by the CPU | Decreases |

Typical values:

| Level | Typical size | Typical access time | Managed by |
| --- | --- | --- | --- |
| Registers | Less than 1 KB | About 0.25–0.5 ns | Compiler |
| Cache | KB to a few MB | About 0.5–25 ns | Hardware |
| Main memory | GB | About 80–250 ns | Operating system |
| Secondary storage | TB | About 5 ms (disk) | OS / user |

#### Locality of Reference

The memory hierarchy works because of the **locality of reference**: programs tend to access the same and nearby memory locations repeatedly.

1. **Temporal locality:** a location that has just been accessed is likely to be accessed again soon.
2. **Spatial locality:** locations near a recently accessed location are likely to be accessed soon.

So the most frequently used data is kept in the small, fast levels, and the rest in the large, slow levels.

#### Average Memory Access Time (Two Levels)

When the CPU looks for a word, it first checks the faster memory (for example, the cache). If the word is found, it is a **hit**; otherwise, it is a **miss**, and the word is taken from the slower memory (main memory).

**Hit ratio:**

> **H = (number of hits) ÷ (total number of memory accesses)**, and the miss ratio is **1 − H**.

**Simultaneous access** (the CPU searches both levels at the same time):

> **T = H × T₁ + (1 − H) × T₂**

**Hierarchical access** (the CPU searches level 2 only after a miss in level 1):

> **T = H × T₁ + (1 − H) × (T₁ + T₂)**

where:

- **T** = average memory access time,
- **H** = hit ratio of level 1 (the cache),
- **T₁** = access time of level 1 (the cache),
- **T₂** = access time of level 2 (main memory).

**Worked example.** Cache access time T₁ = 10 ns, main memory access time T₂ = 100 ns, hit ratio H = 0.9.

Simultaneous access:

1. Hit part: H × T₁ = 0.9 × 10 = 9 ns.
2. Miss part: (1 − H) × T₂ = 0.1 × 100 = 10 ns.
3. T = 9 + 10 = **19 ns**.

Hierarchical access:

1. Hit part: H × T₁ = 0.9 × 10 = 9 ns.
2. Miss part: (1 − H) × (T₁ + T₂) = 0.1 × (10 + 100) = 0.1 × 110 = 11 ns.
3. T = 9 + 11 = **20 ns**.

Without a cache, every access would take 100 ns, so the cache makes the average access about five times faster. If the hit ratio rises to 0.95, the averages fall to 14.5 ns (simultaneous) and 15 ns (hierarchical).

#### Advantages and Disadvantages

- **Advantages:** better performance (frequently used data is in fast memory); low overall cost; large total capacity.
- **Disadvantages:** complex design (data must be moved between levels); fast memories are expensive and therefore small; accessing the lower levels causes delay.

### Microprogramming

The **control unit** of the CPU produces the **control signals** that make the other parts of the computer carry out each instruction. A control unit can be designed in two ways:

1. **Hardwired control:** the control signals are produced by fixed logic circuits (gates, flip-flops and decoders).
2. **Microprogrammed control:** the control signals are stored as words in a special memory and produced by executing a **microprogram**.

**Microprogramming** is the technique of implementing the control unit by a program of **microinstructions** stored in a **control memory**.

#### Important Terms

1. **Control memory (control store):** the memory (usually a **ROM**) that stores the microprograms. It is part of the control unit.
2. **Control word:** a word whose bits specify control signals; each bit (or field) represents a control signal.
3. **Microinstruction:** one word stored in control memory; it contains a control word and information for selecting the next microinstruction.
4. **Microprogram:** a sequence of microinstructions.
5. **Micro-routine:** the sequence of microinstructions that carries out one machine instruction.
6. **Micro-operation:** an elementary operation (such as a register transfer) carried out by the data processor in one clock pulse as directed by a control word.
7. **Control Address Register (CAR):** holds the address of the next microinstruction to be read.
8. **Control Data Register (control buffer register):** holds the microinstruction read from control memory.
9. **Microprogram sequencer (next-address generator):** decides the address of the next microinstruction.

#### Working of a Microprogrammed Control Unit

1. The control address register supplies the address of a microinstruction to the control memory.
2. The microinstruction is read into the control data register.
3. Its control word produces the control signals, and the micro-operations are carried out.
4. At the same time, the sequencer calculates the address of the next microinstruction (the next address, a branch address, or the start of the routine of the next machine instruction).
5. The new address is loaded into the control address register, and the cycle repeats.

#### Horizontal and Vertical Microprogramming

| Basis | Horizontal microprogramming | Vertical microprogramming |
| --- | --- | --- |
| Control signals | One bit for each control signal (not encoded) | Control signals are encoded in fields (N signals need log₂N bits) |
| Length of microinstruction | Long | Short |
| Decoder | Not needed | Needed |
| Parallelism | High (many signals active at once) | Low |
| Speed | Faster | Slower |
| Control memory needed | More | Less |

Example: for 256 control signals, horizontal format needs 256 bits, while a fully encoded vertical format needs only log₂256 = 8 bits (but then only one signal can be active at a time).

#### Hardwired vs Microprogrammed Control Unit

| Basis | Hardwired control unit | Microprogrammed control unit |
| --- | --- | --- |
| Implementation | Fixed logic circuits | Microinstructions stored in control memory |
| Speed | Faster | Slower (microinstructions must be fetched) |
| Flexibility | Difficult to modify | Easy to modify (change the microprogram) |
| Complex instruction sets | Difficult to design | Easy to handle |
| Control memory | Not needed | Needed |
| Used in | RISC processors | CISC processors |

**Advantages of microprogramming:** systematic and orderly design of the control unit; easy to modify, debug and add new instructions; suits complex instruction sets. **Disadvantages:** slower than hardwired control; flexibility comes at extra cost (control memory).

## References {#references}

**TutorialsPoint**

- [Operating System - Overview](https://www.tutorialspoint.com/operating_system/os_overview.htm) — accessed 2026-11-03
- [Operating System - Components](https://www.tutorialspoint.com/operating_system/os_components.htm) — accessed 2026-11-03
- [Operating System - Properties](https://www.tutorialspoint.com/operating_system/os_properties.htm) — accessed 2026-11-03
- [Operating System - Evolution](https://www.tutorialspoint.com/operating_system/os_evolution.htm) — accessed 2026-11-03 (it says MULTICS was "inspired by UNIX"; MULTICS came first — see Additional sources)
- [Operating System - History](https://www.tutorialspoint.com/operating_system/os_history.htm) — accessed 2026-11-03 (it says UNIX was "first named MULTICS"; they are different systems)
- [Operating System - Types](https://www.tutorialspoint.com/operating_system/os_types.htm) — accessed 2026-11-03
- [Dual-Mode and Multi-Mode Operation in Operating System](https://www.tutorialspoint.com/article/dual-mode-and-multi-mode-operation-in-operating-system) — accessed 2026-11-03
- [What is IBM 370 I/O Channel?](https://www.tutorialspoint.com/what-is-ibm-370-i-0-channel) — accessed 2026-11-03
- [What is memory hierarchy?](https://www.tutorialspoint.com/article/what-is-memory-hierarchy) — accessed 2026-11-03
- [What is Microprogrammed Control Unit?](https://www.tutorialspoint.com/article/what-is-microprogrammed-control-unit) — accessed 2026-11-03
- [Disk Operating System Commands](https://www.tutorialspoint.com/article/disk-operating-system-commands) — accessed 2026-11-03 (its external-command table also lists Windows commands such as PING and IPCONFIG, which were not MS-DOS commands)
- [Booting Process in DOS Operating System](https://www.tutorialspoint.com/article/booting-process-in-dos-operating-system) — accessed 2026-11-03
- [What is the history of the Windows operating system and MS-DOS?](https://www.tutorialspoint.com/article/what-is-the-history-of-the-windows-operating-system-and-msdos) — accessed 2026-11-03
- [Advantages and Disadvantages of Windows Operating System](https://www.tutorialspoint.com/article/advantages-and-disadvantages-of-windows-operating-system) — accessed 2026-11-03

**GeeksforGeeks**

- [Introduction to Operating System](https://www.geeksforgeeks.org/operating-systems/introduction-of-operating-system-set-1/) — accessed 2026-11-03
- [Functions of Operating System](https://www.geeksforgeeks.org/operating-systems/functions-of-operating-system/) — accessed 2026-11-03
- [Need and Functions of Operating Systems](https://www.geeksforgeeks.org/operating-systems/need-and-functions-of-operating-systems/) — accessed 2026-11-03
- [Components of Operating System](https://www.geeksforgeeks.org/operating-systems/components-of-operating-system/) — accessed 2026-11-03
- [History of Operating System](https://www.geeksforgeeks.org/operating-systems/evolution-of-operating-system/) — accessed 2026-11-03
- [Types of Operating Systems](https://www.geeksforgeeks.org/operating-systems/types-of-operating-systems/) — accessed 2026-11-03
- [MS-DOS Operating System](https://www.geeksforgeeks.org/operating-systems/ms-dos-operating-system/) — accessed 2026-11-03 (it calls MS-DOS "free"; MS-DOS was a commercial product, so that point is not used)
- [DOS Full Form](https://www.geeksforgeeks.org/operating-systems/dos-full-form/) — accessed 2026-11-03
- [Difference between DOS and Windows](https://www.geeksforgeeks.org/operating-systems/difference-between-dos-and-windows/) — accessed 2026-11-03
- [Interesting Facts About Windows](https://www.geeksforgeeks.org/operating-systems/interesting-facts-about-windows/) — accessed 2026-11-03 (it calls Windows 98 the last MS-DOS-based Windows; it was Windows Me — see Additional sources)
- [Dual Mode operations in OS](https://www.geeksforgeeks.org/operating-systems/dual-mode-operations-os/) — accessed 2026-11-03
- [I/O Channels and its types](https://www.geeksforgeeks.org/computer-organization-architecture/i-o-channels-and-its-types/) — accessed 2026-11-03
- [Memory Hierarchy Design and its Characteristics](https://www.geeksforgeeks.org/computer-organization-architecture/memory-hierarchy-design-and-its-characteristics/) — accessed 2026-11-03
- [Difference between Simultaneous and Hierarchical Access Memory Organisations](https://www.geeksforgeeks.org/difference-between-simultaneous-and-hierarchical-access-memory-organisations/) — accessed 2026-11-03
- [Hardwired and Micro-programmed Control Unit](https://www.geeksforgeeks.org/computer-organization-architecture/computer-organization-hardwired-vs-micro-programmed-control-unit/) — accessed 2026-11-03

**TpointTech**

- [What is Operating System](https://www.tpointtech.com/what-is-operating-system) — accessed 2026-11-03
- [Functions of Operating System](https://www.tpointtech.com/functions-of-operation-system) — accessed 2026-11-03
- [Components of Operating System](https://www.tpointtech.com/components-of-operating-system) — accessed 2026-11-03
- [Properties of Operating System](https://www.tpointtech.com/properties-of-operating-system) — accessed 2026-11-03
- [History of Operating System](https://www.tpointtech.com/history-of-operating-system) — accessed 2026-11-03 (it says the first Windows was created in 1975; Windows 1.0 was released in 1985)
- [Types of Operating Systems](https://www.tpointtech.com/types-of-operating-systems) — accessed 2026-11-03
- [MS-DOS Operating System](https://www.tpointtech.com/ms-dos-operating-system) — accessed 2026-11-03
- [Names of All Windows OS Versions and History](https://www.tpointtech.com/names-of-all-windows-os-version-and-history) — accessed 2026-11-03
- [Dual Mode Operations in Operating System](https://www.tpointtech.com/dual-mode-operations-in-operating-system) — accessed 2026-11-03
- [Supervisor Mode in Operating System](https://www.tpointtech.com/supervisor-mode-in-operating-system) — accessed 2026-11-03
- [Memory Hierarchy in Computer Architecture](https://www.tpointtech.com/memory-hierarchy) — accessed 2026-11-03
- [Design of Control Unit](https://www.tpointtech.com/design-of-control-unit) — accessed 2026-11-03

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (used because the reference websites disagree or do not cover the point)

- William Stallings, *Operating Systems: Internals and Design Principles*, Chapter 2 — the three objectives convenience, efficiency and ability to evolve (not named by the reference websites)
- [GM-NAA I/O](https://en.wikipedia.org/wiki/GM-NAA_I/O) — Wikipedia (the first operating system, 1956) — accessed 2026-11-03
- [Unix](https://en.wikipedia.org/wiki/Unix) — Wikipedia (UNIX began at Bell Labs in 1969 after MULTICS; rewritten in C in 1973) — accessed 2026-11-03
- [Windows Me](https://en.wikipedia.org/wiki/Windows_Me) — Wikipedia (the last MS-DOS-based Windows) — accessed 2026-11-03
