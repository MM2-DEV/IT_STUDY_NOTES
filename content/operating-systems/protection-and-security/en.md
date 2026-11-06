---
description: Protection and security - protection vs security, security goals, the classification of security violations, threats (program threats, system threats, intruders and malware) and levels of security, and the techniques for handling them (authentication, one-time passwords, access control with domains of protection and the access matrix, ACLs and capability lists, encryption, firewalls, intrusion detection, auditing, TCSEC classes).
updated: 2026-11-03
---

## Classification of Protection and Security Issues {#classification-of-protection-and-security-issues}

### Meaning of Protection and Security

> **Protection is the mechanism that controls how programs, processes and users access the resources of a computer system.**

It deals with internal threats.
>
> **Security is the defence of a computer system and its information against outside threats, such as unauthorized access, malicious modification or destruction, and accidental damage.**

It deals with external threats.

Protection is a **component of security**: it provides the means to enforce policies, while security also needs authentication and defence against outside attacks.

| Basis | Protection | Security |
| --- | --- | --- |
| Deals with | **Internal** threats | **External** threats |
| Question answered | Which user/process may access **which resource**, and how? | Is this user **allowed into the system** at all? |
| Concern | Controlled access to files, memory, CPU and devices | Defence against attackers, malware and misuse |
| Mechanisms | Access matrix, ACLs, capabilities, memory protection, dual mode | Authentication, encryption, firewalls, antivirus, intrusion detection |
| Scope | Narrower; simpler questions | Broader; more complex questions |

### Goals of Protection

1. Prevent **malicious, intentional violation** of access restrictions by users.
2. Ensure that each process uses resources **only in ways allowed by the policy**.
3. Improve **reliability** by detecting latent errors at the interfaces between subsystems.
4. Provide a mechanism that is separate from the **policy** — *mechanisms* decide **how** something is done; *policies* decide **what** will be done.

**Principle of least privilege:** a program, user or system should be given **only the privileges it needs** to do its task, so that a fault or an attack does the least possible damage. A related rule is the **need-to-know principle**: a process should be able to access only the objects it currently needs.

### Goals of Security (CIA)

1. **Confidentiality (secrecy):** only authorized users can read the information.
2. **Integrity:** only authorized users can modify the information and system resources.
3. **Availability:** authorized users can use the resources when needed; no user or process can monopolize them.

Authenticity (users and messages are genuine) is also an important goal.

### Classification of Security Violations

Security violations (misuse) can be **malicious** (intentional) or **accidental**; accidental misuse is easier to guard against. The types of violation are:

1. **Breach of confidentiality:** unauthorized **reading** of data (for example, theft of credit-card numbers or passwords).
2. **Breach of integrity:** unauthorized **modification** of data (for example, changing a payment or the source code of an application).
3. **Breach of availability:** unauthorized **destruction** of data (for example, defacing a website).
4. **Theft of service:** unauthorized **use of resources** (for example, an intruder using a system as a file server).
5. **Denial of service (DoS):** **preventing legitimate use** of the system (sometimes accidental).

**Threat vs attack:** a **threat** is a potential security violation (such as a vulnerability); an **attack** is an actual attempt to break security.

### Common Methods of Attack

1. **Masquerading:** one participant pretends to be another (breach of authentication).
2. **Replay attack:** a valid data transmission is captured and repeated maliciously.
3. **Message modification (man-in-the-middle):** the attacker sits in the data flow and changes the messages.
4. **Session hijacking:** an active communication session is taken over.

### Classification of Threats

**1. Program threats** — a user program makes the OS or another user's program behave maliciously:

1. **Trojan horse:** a program that appears useful but secretly performs harmful actions (for example, a fake login program that steals passwords).
2. **Trap door (back door):** a hidden entry point left in a program by its designer that bypasses normal security.
3. **Logic bomb:** code that does harm only when a certain condition occurs (for example, on a particular date).
4. **Virus:** a code fragment **embedded in a legitimate program** that replicates itself into other programs when the infected program runs; it can modify or delete files and crash systems. A virus needs a host program.
5. **Stack and buffer overflow:** an attacker sends more input than a program's buffer can hold, overwriting the stack (such as the return address) so that the attacker's code runs — the most common way an outside attacker gains control.

**2. System and network threats** — misuse of system services and network connections:

1. **Worm:** a **standalone** program that replicates itself and spreads across a network, using up system resources (the **Morris worm**, 1988, was a famous example). Unlike a virus, a worm does not need a host program.
2. **Port scanning:** probing a system's ports to find vulnerabilities before an attack (often launched from "zombie" systems to hide the attacker).
3. **Denial of service (DoS):** overloading a system or network so that legitimate users cannot use it; a **distributed DoS (DDoS)** attack comes from many machines at once.

**3. Intruders:**

1. **Masquerader:** an outsider who uses a legitimate user's account.
2. **Misfeasor:** a legitimate user who misuses his or her privileges or accesses data without authorization.
3. **Clandestine (rogue) user:** a user who gains supervisory control and evades auditing and access controls.

**Other malware:** ransomware, spyware and rootkits.

**Virus vs worm:**

| Basis | Virus | Worm |
| --- | --- | --- |
| Host program | Needs a host program (attaches to files) | Standalone program |
| Spreading | Spreads when the infected program is run (user action) | Spreads by itself over the network |
| Main damage | Modifies or deletes files | Consumes resources (CPU, memory, bandwidth) |

### Levels of Security

Security must be applied at four levels; a weakness at any level makes the others useless:

1. **Physical:** the computers and terminals must be physically secured (locked rooms).
2. **Human (people):** users must be authorized carefully; attacks such as **phishing** and **social engineering** trick users into giving away information.
3. **Operating system:** the OS must protect itself from accidental or deliberate breaches (for example, buffer overflows, bad default settings).
4. **Network:** data travelling over networks must be protected from interception and attacks.

### Protection Issues Inside the OS

Protection must also be provided for:

1. **Memory:** each process must stay within its own address space (base and limit registers, page tables).
2. **CPU:** a **timer** prevents a process from holding the CPU forever.
3. **I/O:** user processes cannot perform I/O directly; I/O instructions are **privileged** (dual-mode operation).
4. **Files:** access to files is controlled by permissions (owner, group, others; ACLs).

## Protection and Security Handling Techniques {#protection-and-security-handling-techniques}

### 1. Authentication

> **Authentication is the process of verifying the identity of a user before allowing access to the system.**

Users are authenticated by something they **know**, **have** or **are**:

1. **Something the user knows — passwords:** the user enters a user name and a password. Passwords must be protected:
   1. store them **encrypted (hashed)**, never in plain text, often with a random **salt**;
   2. use long, complex passwords and change them regularly;
   3. limit the number of failed attempts.
2. **Something the user has:** a card, smart card or hardware key (token) that is inserted or that generates a code.
3. **Something the user is — biometrics:** fingerprint, retina or iris scan, face, voice or signature, compared with a stored sample.

Using two or more of these together is called **two-factor (multi-factor) authentication**.

### 2. One-Time Passwords (OTP)

An **OTP** is valid for only **one** login session and cannot be reused, so a captured password is useless:

1. **Random numbers:** the user has a card of numbers mapped to letters; the system asks for the numbers matching some randomly chosen letters.
2. **Secret key:** a hardware device generates a secret code that is tied to the user's ID and must be entered at each login.
3. **Network password:** a one-time code is sent to the user's registered mobile phone or e-mail.

### 3. Access Control: Domains of Protection

A computer system is a collection of **objects** (hardware objects such as the CPU, memory, printers and disks; software objects such as files, programs and semaphores). Each object can be accessed only through well-defined operations.

> **A protection domain is a set of (object, access rights) pairs that specifies which operations a process running in that domain may perform on which objects.**

1. A process executes within a protection domain.
2. The association between a process and a domain can be **static** (fixed for the process's lifetime) or **dynamic** (the process can **switch** domains).
3. In UNIX, a domain is associated with the **user ID**; the **setuid** bit lets a program run with the domain of its owner. Dual-mode operation (user mode and kernel mode) is the simplest form of two domains.

### 4. Access Matrix

> **The access matrix is a general model of protection in which the rows represent domains, the columns represent objects, and each entry lists the operations that a process in that domain may perform on that object.**

Its rows represent domains, its columns represent objects, and each entry access(i, j) lists the operations that a process in domain Dᵢ may perform on object Oⱼ.

**Example:**

| Domain | F1 | F2 | F3 | Printer |
| --- | --- | --- | --- | --- |
| D1 | read | | read | |
| D2 | | | | print |
| D3 | | read | execute | |
| D4 | read, write | | read, write | |

1. A process in D1 can **read** files F1 and F3.
2. Only a process in D2 can use the **printer**.
3. A process in D3 can **read** F2 and **execute** F3.
4. D4 has the rights of D1 plus **write** access to F1 and F3.

**Domain switching:** domains can also be treated as objects. A process may switch from domain Dᵢ to Dⱼ only if the **switch** right is in access(i, j).

**Special rights:**

1. **Copy right (`*`):** a right marked with `*` (for example, `read*`) can be copied to other domains in the same column.
2. **Owner right:** the owner of an object can add and remove any right in that object's column.
3. **Control right:** a process in domain Dᵢ with the control right on Dⱼ can remove rights from row j.

### 5. Implementation of the Access Matrix

The access matrix is usually **large and sparse** (most entries are empty), so it is not stored as a full table. Methods:

1. **Global table:** a set of ordered triples ⟨domain, object, rights-set⟩. Simple, but the table is very large (often cannot be kept in memory) and grouping is difficult.
2. **Access-control list (ACL) for each object** (the **columns**): each object keeps a list of ⟨domain, rights-set⟩ pairs, with empty entries removed. Easy to see and change who can access an object; used for files in UNIX (owner/group/others) and Windows.
3. **Capability list for each domain** (the **rows**): each domain keeps a list of **capabilities** — protected references to objects together with the allowed operations. Possessing a capability is proof of the right to access. Capability lists are protected by the OS (the user cannot modify them directly).
4. **Lock–key mechanism:** a compromise — each object has a list of **locks** (bit patterns) and each domain a list of **keys**; a process can access an object only if its domain has a key that matches one of the object's locks.

| Basis | Access-control list (ACL) | Capability list |
| --- | --- | --- |
| Part of the matrix | Column (per object) | Row (per domain) |
| Stored with | The object | The domain (process) |
| Easy to answer | "Who can access this object?" | "Which objects can this process access?" |
| Revoking a right | Easy (edit the object's list) | Difficult (capabilities are spread among domains) |

### 6. Encryption (Cryptography)

**Encryption** converts readable data (**plaintext**) into an unreadable form (**ciphertext**) using a **key**; only those with the right key can **decrypt** it. It protects data **stored on disk** and **sent over networks**.

1. **Symmetric encryption:** the same key encrypts and decrypts (for example, **AES**, DES). Fast, but the key must be shared secretly.
2. **Asymmetric (public-key) encryption:** a **public key** encrypts and a **private key** decrypts (for example, **RSA**). It solves the key-distribution problem and supports **digital signatures**.
3. **Hashing:** a one-way function (for example, SHA-256) used to store passwords and to check integrity.

### 7. Firewalls

A **firewall** is a computer, appliance or software that sits between a trusted network (or computer) and an untrusted one, **monitors all incoming and outgoing traffic**, and allows or blocks it according to security rules (for example, by address, port or protocol).

A network can be divided into security domains, such as a **DMZ** (demilitarized zone) for public servers.

### 8. Intrusion Detection and Prevention

**Intrusion detection systems (IDS)** monitor system and network activity to detect attempted or successful intrusions and raise alerts; **intrusion prevention systems (IPS)** also block them. Detection methods:

1. **Signature-based detection:** looks for known attack patterns (signatures) — like antivirus software.
2. **Anomaly detection:** looks for behaviour that differs from normal (can find new attacks, but gives more false alarms).

### 9. Other Techniques

1. **Antivirus and anti-malware software:** scan files and memory for known malware signatures and suspicious behaviour; must be updated regularly.
2. **Auditing and logging:** record security-relevant events (logins, failed attempts, file access) to detect and investigate breaches.
3. **Patches and updates:** fix known vulnerabilities in the OS and applications.
4. **Physical security** of computers and storage.
5. **Security policy:** a written document that defines what is being secured and how; users must be trained, and the policy reviewed regularly.

### 10. Computer Security Classifications (TCSEC)

The U.S. Department of Defense **Trusted Computer System Evaluation Criteria (TCSEC, the "Orange Book")** defines four security divisions, from lowest to highest:

1. **Division D — Minimal protection:** systems that fail to meet the requirements of the higher classes (for example, MS-DOS and Windows 3.1).
2. **Division C — Discretionary protection:** discretionary protection and accountability of users through auditing.
   1. **C1:** users can protect their private information from other users (most versions of UNIX).
   2. **C2:** adds individual-level access control and auditing.
3. **Division B — Mandatory protection:** all the properties of C2 plus a **sensitivity label** on each object.
   1. **B1:** maintains a security label for each object, used for mandatory access control.
   2. **B2:** extends labels to all system resources (including storage objects) and addresses covert channels and auditing.
   3. **B3:** allows ACLs that name users or groups that are not to be given access, and adds security-monitoring requirements.
4. **Division A — Verified protection:** like B3, but uses **formal design specifications and verification** techniques, giving a high degree of assurance.

### Summary of Techniques

| Technique | Protects against |
| --- | --- |
| Authentication, OTP, biometrics | Unauthorized users (masqueraders) |
| Access matrix, ACLs, capabilities, file permissions | Unauthorized access to objects |
| Dual mode, memory protection, timer | Processes interfering with the OS and each other |
| Encryption | Reading or changing data in storage or in transit |
| Firewalls | Unwanted network traffic |
| Intrusion detection / prevention | Attacks in progress |
| Antivirus, patches | Malware and known vulnerabilities |
| Auditing and logging | Undetected misuse; supports investigation |

## References {#references}

**TutorialsPoint**

- [Operating System - Security](https://www.tutorialspoint.com/operating_system/os_security.htm) — accessed 2026-11-03

**GeeksforGeeks**

- [Operating System Security](https://www.geeksforgeeks.org/operating-systems/operating-system-security/) — accessed 2026-11-03
- [System Protection in Operating System](https://www.geeksforgeeks.org/operating-systems/system-protection-in-operating-system/) — accessed 2026-11-03
- [Access Matrix in Operating System](https://www.geeksforgeeks.org/access-matrix-in-operating-system/) — accessed 2026-11-03

**TpointTech**

- [Operating System Security](https://www.tpointtech.com/operating-system-security) — accessed 2026-11-03
- [Difference between Security and Protection in Operating System](https://www.tpointtech.com/security-vs-protection-in-operating-system) — accessed 2026-11-03
- [Implementation of Access matrix in the operating system](https://www.tpointtech.com/implementation-of-access-matrix-in-the-operating-system) — accessed 2026-11-03

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources**

- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "Protection" and "Security" — the goals and principles of protection, the copy, owner and control rights, the four levels of security, the methods of attack and the encryption types
- William Stallings, *Operating Systems: Internals and Design Principles*, "Computer Security Threats" — the classes of intruders (masquerader, misfeasor, clandestine user)
