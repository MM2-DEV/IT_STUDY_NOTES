---
description: Virtualization — virtual machines, type 1 and type 2 hypervisors, types of virtualization, server consolidation — and containers, Docker, and VMs vs containers.
updated: 2026-11-06
---

## Virtual Machines and Hypervisors (Type 1 and Type 2) {#virtual-machines-and-hypervisors-type-1-and-type-2}

### Definition of Virtualization

Virtualization is the creation of a virtual (software-based) version of a computing resource — such as a server, operating system, storage device or network — so that a single physical resource can be shared by many users, applications or organizations as several independent virtual resources.

Virtualization works by assigning a logical name to a physical resource and providing a pointer to that resource on demand. It is considered the **foundation of cloud computing**: providers such as AWS, Microsoft and Google use it to divide their hardware among many customers, which gives resource sharing, rapid scalability, efficient hardware use and isolation between users.

### Virtual Machine

**A virtual machine (VM)** is a software-based computer, created by virtualization, that has its own virtual CPU, memory, storage and network interface and runs its own operating system and applications, while actually using the resources of a physical machine.

1. The physical machine on which VMs are created is the **host** (host machine); each VM is a **guest** (guest machine), and its operating system is the **guest OS**.
2. A VM is isolated from the hardware and from other VMs, so different operating systems (for example, Windows and Linux) can run on one computer at the same time.
3. Each VM has a virtual hard disk; if the guest crashes or is damaged, the host is not affected.

Advantages of VMs:

1. Several operating systems on one computer.
2. Security: risky software can be tested in a guest OS; the damage disappears when the guest is shut down or restored.
3. Easy backup, copying, migration and recovery of whole machines.
4. Better use of hardware.

Disadvantages of VMs:

1. Less efficient than a real machine, because hardware is accessed indirectly.
2. Performance drops when many VMs share a host with insufficient resources.
3. A weakness in the host or hypervisor can affect all the VMs on it.

### Hypervisor

**A hypervisor**, also called a **virtual machine monitor (VMM)**, is the software, firmware or hardware layer that creates and runs virtual machines, allocating the physical resources (CPU, memory, storage, network) among them and keeping them isolated.

It intercepts the guest operating systems' requests to the hardware and translates them to the physical hardware. In a reference model, a hypervisor has three modules: a **dispatcher** (the entry point, which routes the VM's instructions), an **allocator** (which decides the resources given to each VM) and an **interpreter** (routines executed when a VM executes a privileged instruction).

### Types of Hypervisors

Hypervisors were classified into two types by Robert P. Goldberg (1973):

![Type 1 and type 2 hypervisors](/diagrams/artificial-intelligence/hypervisor-types.svg)

1. **Type 1 (native, bare-metal) hypervisor:** runs directly on the host's hardware, without a host operating system, and manages the guest operating systems.
   1. High performance (direct hardware access) and strong security (no host OS to attack).
   2. Used in data centres and by cloud providers.
   3. Requires dedicated hardware; setup and management are more complex.
   4. Examples: **VMware ESXi**, **Microsoft Hyper-V**, **Xen**, Oracle VM.
2. **Type 2 (hosted) hypervisor:** runs as an application on a conventional host operating system (Windows, macOS or Linux).
   1. Easy to install and use; good for desktops, development, testing and malware analysis.
   2. Slower, because requests pass through the host OS; its security depends on the host OS.
   3. Examples: **Oracle VirtualBox**, **VMware Workstation**, VMware Fusion, Parallels Desktop.

The distinction is not always sharp: **KVM** (Kernel-based Virtual Machine) is a module of the Linux kernel that turns the Linux host itself into a type 1 hypervisor.

| Point | Type 1 hypervisor | Type 2 hypervisor |
| --- | --- | --- |
| Other names | Native, bare-metal | Hosted |
| Runs on | Directly on hardware | On a host operating system |
| Performance | High | Lower (overhead of host OS) |
| Security | Stronger | Depends on the host OS |
| Installation | Needs dedicated hardware; complex | Like an ordinary application; easy |
| Used for | Servers, data centres, cloud | Desktops, development, testing |
| Examples | VMware ESXi, Hyper-V, Xen | VirtualBox, VMware Workstation |

### Types of Hardware Virtualization

1. **Full virtualization:** the hardware is completely simulated, so the guest operating system runs without modification.
2. **Emulation virtualization:** the VM simulates the hardware and becomes independent of it; the guest OS needs no modification.
3. **Paravirtualization:** the hardware is not simulated; the guest OS is modified to cooperate with the hypervisor and runs in its own isolated domain.

### Types of Virtualization by Resource

1. **Server (hardware) virtualization:** a physical server is divided into several virtual servers, each with its own OS and applications.
2. **Operating system virtualization:** the virtualization software runs on an existing OS and creates several isolated environments (this is the basis of containers).
3. **Storage virtualization:** several physical storage devices are combined into one virtual storage pool that users see as a single unit.
4. **Network virtualization:** physical network resources are divided into independent virtual networks (for example, VLANs and virtual switches).
5. **Desktop virtualization:** users' desktops run on central servers and are accessed remotely.
6. **Application virtualization:** an application runs in an isolated environment without being installed on the user's OS.
7. **Data virtualization:** data from different sources and formats is presented to applications as one logical view, without copying it.

### Server Consolidation and Benefits of Virtualization

**Server consolidation** is the use of virtualization to run the workloads of many under-used physical servers as virtual machines on fewer physical servers.

Example (assumed figures): 10 physical servers each run at about 15% CPU utilisation. Their total load is `10 × 15% = 150%` of one server. If each host may be used up to 80%, the workloads need `⌈150 / 80⌉ = 2` hosts, so 8 servers (with their power, cooling and space) can be removed.

Benefits of virtualization:

1. **Better resource utilisation** and lower hardware cost.
2. **Scalability and flexibility:** new VMs can be created in minutes.
3. **Easy deployment** of applications.
4. **Centralised management** of CPU, memory and storage.
5. **Backup and recovery:** VMs are easily copied, migrated and restored.
6. **High availability:** VMs can be moved to another server during maintenance or failure.
7. **Isolation and security:** a failure or attack in one VM does not affect the others.
8. Lower energy use (fewer physical servers).

## Containers {#containers}

### Definition of Container

A container is a lightweight, portable unit of software that packages an application with all its dependencies (code, libraries, configuration files and binaries) and runs it as an isolated process that shares the host operating system's kernel.

Containerization is a form of **operating-system-level virtualization**: instead of virtualizing the hardware, it virtualizes the operating system. Containers do not include a full operating system image, so they are small (often megabytes), start in seconds or less, and use little memory. On Linux, containers are isolated with kernel features: **namespaces** (separate views of processes, network and file system) and resource controls (**cgroups**) that limit CPU and memory. Many containers can be managed as clusters by a **container orchestrator** such as **Kubernetes**.

![Virtual machines compared with containers](/diagrams/artificial-intelligence/vm-vs-container.svg)

### Docker

**Docker** is an open-source platform for developing, packaging, delivering and running applications in containers, so that an application runs in the same way on a developer's laptop, a test server, a data centre or a cloud.

Docker has a **client–server architecture**:

1. **Docker client:** the command-line tool (`docker`) through which users give commands.
2. **Docker daemon (`dockerd`):** the background server process on the host that builds, runs and distributes containers.
3. **Docker registry:** a store of images, such as **Docker Hub**.

Components:

1. **Dockerfile:** a text file of instructions (such as `FROM`, `RUN`, `COPY`, `CMD`) from which an image is built; each instruction creates a layer.
2. **Docker image:** a read-only, layered template containing the application code, libraries and tools needed to run it; an image is not changed after it is built.
3. **Docker container:** a running instance of an image.

Workflow: `docker build` creates an image from a Dockerfile; `docker push` and `docker pull` store and fetch images from a registry; `docker run` starts a container from an image.

### Advantages of Containers

1. **Less overhead:** no guest operating system, so fewer resources are needed than for VMs.
2. **Portability:** the same container runs on different platforms and clouds.
3. **Consistent operation:** the application behaves the same in development, testing and production.
4. **Efficiency and speed:** containers start quickly and can be scaled, patched and deployed rapidly.
5. **Support for DevOps, Agile, CI/CD and microservices:** faster development, test and release cycles.
6. **Higher density:** many more containers than VMs fit on one server.

### Disadvantages of Containers

1. **Weaker isolation:** all containers share the host kernel, so a kernel flaw or attack can affect them all.
2. **Same OS kernel:** containers must use the host's kernel type (for example, Linux containers on a Linux kernel).
3. **Not suitable for every application;** they do not replace all VM deployments.
4. **Dependency management:** many dependencies inside containers can limit portability.
5. **Management tools** for monitoring and managing many containers are complex.

### Virtual Machines vs Containers

| Point | Virtual machine | Container |
| --- | --- | --- |
| What is virtualized | Hardware | Operating system |
| Managed by | Hypervisor | Container engine (for example, Docker) |
| Operating system | Each VM has its own full guest OS | All containers share the host OS kernel |
| Size | Large (gigabytes) | Small (megabytes) |
| Start-up time | Minutes | Seconds or less |
| Resource use | High memory and CPU overhead | Low overhead |
| Isolation and security | Strong (hardware-level) | Weaker (shared kernel) |
| Different OS types on one host | Yes (Windows and Linux together) | No; must match the host kernel |
| Portability | Lower (tied to the hypervisor format) | High (runs wherever the engine runs) |
| Density per server | Fewer | Many more |
| Best for | Running different OSs; strong isolation; legacy applications | Microservices; many instances of applications on few servers |
| Examples | VMware, Xen, KVM, VirtualBox | Docker containers (orchestrated by Kubernetes) |

## References {#references}

- TutorialsPoint — [Cloud Computing: Virtualization](https://www.tutorialspoint.com/cloud_computing/cloud_computing_virtualization.htm), [Docker Overview](https://www.tutorialspoint.com/docker/docker_overview.htm), accessed 2026-11-06.
- TpointTech — [Virtualization in Cloud Computing](https://www.tpointtech.com/virtualization-in-cloud-computing), [Cloud Hypervisor](https://www.tpointtech.com/cloud-hypervisor), [Difference between Virtual Machine and Containers](https://www.tpointtech.com/virtual-machine-vs-containers), [Virtual Machines in Cloud Computing](https://www.tpointtech.com/virtual-machines-in-cloud-computing), [Cloud Computing using Containers](https://www.tpointtech.com/cloud-computing-using-containers), accessed 2026-11-06.
- GeeksforGeeks — [Hypervisor](https://www.geeksforgeeks.org/cloud-computing/hypervisor/), [Virtualization in Cloud Computing and Types](https://www.geeksforgeeks.org/cloud-computing/virtualization-cloud-computing-types/), [Containerization Using Docker](https://www.geeksforgeeks.org/devops/containerization-using-docker/), accessed 2026-11-06.
- Programiz has no page on virtualization or containers.
- Wikipedia — [Hypervisor](https://en.wikipedia.org/wiki/Hypervisor) (Goldberg's 1973 classification; KVM), accessed 2026-11-06.
- The server-consolidation figures are assumed for illustration; the calculation was checked with a short program.

Issues found on the reference websites and how they were resolved:

1. The websites disagree on KVM: TutorialsPoint lists it as a type 2 hypervisor, while TpointTech and GeeksforGeeks list it as type 1. Wikipedia explains that KVM is a Linux kernel module that effectively turns the host OS into a type 1 hypervisor; the notes say this and do not use KVM as a type 2 example.
2. TutorialsPoint's Docker page says that because containers are isolated, "more containers can run concurrently on a single host, improving security"; running more containers does not improve security, so this was not used.
3. TpointTech's VM-vs-container table says that "all services of Google Docs get a container" and gives PhotonOS and RancherOS as container examples; PhotonOS and RancherOS are operating systems designed to run containers, not containers, so Docker containers are given as the example.
4. GeeksforGeeks says that containers boot in "milliseconds", TpointTech says "seconds"; the notes say "seconds or less".
