---
description: Definition of cloud computing (NIST), how it works, its five essential and other characteristics, enabling technologies, and its advantages and disadvantages.
updated: 2026-11-06
---

## Definition and Essential Characteristics {#definition-and-essential-characteristics}

### Definition of Cloud Computing

Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (for example, networks, servers, storage, applications and services) that can be rapidly provisioned and released with minimal management effort or service-provider interaction.

This is the standard definition of the US **National Institute of Standards and Technology (NIST)**, published in Special Publication 800-145 (Peter Mell and Timothy Grance, September 2011). In simple words, cloud computing means renting computing resources — processing power, storage, servers, databases, software — over the Internet from a provider, instead of buying and maintaining them, and paying only for what is used.

The word **cloud** refers to a network or the Internet: something present at a remote location. Cloud services can be offered over public and private networks (WAN, LAN or VPN). Applications such as e-mail, web conferencing and customer relationship management (CRM) run in the cloud. Large cloud service providers include Amazon Web Services (AWS), Microsoft Azure and Google Cloud.

According to NIST, the cloud model is composed of **five essential characteristics, three service models and four deployment models**.

![The NIST cloud model](/diagrams/artificial-intelligence/nist-cloud-model.svg)

1. Service models: Software as a Service (SaaS), Platform as a Service (PaaS) and Infrastructure as a Service (IaaS) — see [Cloud Service Models](/topics/artificial-intelligence/cloud-service-models).
2. Deployment models: public, private, community and hybrid clouds — see [Cloud Deployment Models](/topics/artificial-intelligence/cloud-deployment-models).

### How Cloud Computing Works

![Cloud computing overview](/diagrams/artificial-intelligence/cloud-overview.svg)

1. The cloud provider runs large **data centres** with many servers, storage systems and networks.
2. Using **virtualization**, these physical resources are divided into virtual machines, virtual storage and virtual networks, and pooled to serve many customers.
3. Users access the services over the Internet, through a web browser, an application or an API, from any device.
4. Resources are allocated when requested and released when no longer needed; usage is metered and billed.

**Why cloud computing?** Traditionally, every company needed its own server room with database and mail servers, networking equipment, firewalls, a fast connection and maintenance engineers — a large up-front investment (**capital expenditure, CapEx**). Capacity had to be estimated for the peak load, often wasting resources, and new servers took weeks to buy and set up. In the cloud, resources are rented when needed (**operational expenditure, OpEx**) and provisioned in minutes.

Uses of cloud computing:

1. Developing new applications and services.
2. Storing, backing up and recovering data.
3. Hosting websites and blogs.
4. Delivering software on demand.
5. Analysing data.
6. Streaming audio and video.

### Essential Characteristics of Cloud Computing

NIST defines five essential characteristics:

1. On-demand self-service
2. Broad network access
3. Resource pooling
4. Rapid elasticity
5. Measured service

#### 1. On-Demand Self-Service

**On-demand self-service** is the characteristic that a consumer can provision computing capabilities, such as server time and network storage, automatically as needed, without requiring human interaction with the service provider.

For example, a user creates a virtual server or adds storage from a web portal or an API in a few minutes, and releases it when the work is finished.

#### 2. Broad Network Access

**Broad network access** is the characteristic that capabilities are available over the network and accessed through standard mechanisms from many kinds of client devices (mobile phones, tablets, laptops and workstations).

Users can work from any location and any device with a network connection.

#### 3. Resource Pooling

**Resource pooling** is the characteristic that the provider's computing resources are pooled to serve multiple consumers using a multi-tenant model, with physical and virtual resources dynamically assigned and reassigned according to demand.

1. Examples of pooled resources are storage, processing, memory and network bandwidth.
2. **Location independence:** the customer generally does not control or know the exact location of the resources, but may choose it at a higher level (for example, a country, region or data centre).
3. **Multi-tenancy:** many customers (tenants) share the same physical infrastructure while their data and applications are kept separate.

#### 4. Rapid Elasticity

**Rapid elasticity** is the characteristic that capabilities can be provisioned and released quickly, in some cases automatically, to scale out and in with demand, so that the available capacity appears unlimited to the consumer.

Example: an online shop adds servers automatically during a festival sale and removes them afterwards. **Scalability** is the ability to handle more work by adding resources; **elasticity** is the ability to add and remove resources automatically as the load rises and falls.

#### 5. Measured Service

**Measured service** is the characteristic that cloud systems automatically control and optimise resource use with a metering capability, so that usage (storage, processing, bandwidth, active user accounts) can be monitored, controlled and reported, transparently for both provider and consumer.

Metering makes the **pay-per-use (pay-as-you-go)** billing model possible: the customer is charged for the amount and duration of the resources used.

### Other Characteristics of Cloud Computing

The reference websites also list these characteristics:

1. **Agility:** resources are shared in a distributed computing environment and can be obtained quickly.
2. **High availability and reliability:** redundancy and fault tolerance keep services running when some components fail.
3. **High scalability:** on-demand provisioning of resources on a large scale, without engineers for peak loads.
4. **Multi-sharing (multi-tenancy):** many users and applications share common infrastructure, reducing cost.
5. **Device and location independence:** systems are accessed through a web browser from any device and any place.
6. **Easy maintenance:** applications do not need to be installed on each user's computer; the provider updates the systems.
7. **Low cost and pay-per-use:** no need to build one's own infrastructure; services are accessed through APIs and paid for by usage.
8. **Virtualization:** hardware is abstracted into logical resources.
9. **Automation:** resources are deployed, configured and maintained automatically.
10. **Security:** providers use encryption, authentication and access control, physical protection of data centres, and backups. Security is a **shared responsibility**: the provider secures the cloud itself, and the customer secures what it puts in the cloud.
11. **Flexible pricing:** pay-per-use, subscription and other pricing models.

### Key Enabling Technologies of Cloud Computing

1. **Virtualization:** lets many virtual machines run on one physical server (see [Virtualization](/topics/artificial-intelligence/virtualization)).
2. **Distributed computing:** many interconnected computers share resources and process data together.
3. **High-speed Internet and networking:** fast, reliable connectivity to reach the services.
4. **Service-oriented architecture (SOA) and web services:** services communicate and work together over the network through standard interfaces (APIs).
5. **Data centres:** large facilities of servers, storage, power and cooling that host the cloud.

## Advantages and Disadvantages {#advantages-and-disadvantages}

### Advantages of Cloud Computing

1. **Cost reduction:** no need to buy hardware, build data centres or employ large IT staff; capital expenditure becomes operational expenditure, and resources are shared.
2. **Pay as you go:** customers pay only for the resources they use and for the time they use them.
3. **Scalability and flexibility:** resources and storage can be increased or decreased at any time, almost without limit.
4. **Accessibility and mobility:** services and data can be accessed from anywhere, at any time, from any device with an Internet connection.
5. **Better collaboration:** teams in different places can work on the same data and documents.
6. **Backup, restore and business continuity:** data is replicated in several locations and can be recovered easily after a disaster.
7. **Reliability and availability:** redundant infrastructure and load balancing keep services running.
8. **Security features:** providers invest in strong security tools and expert staff, and offer fine-grained access control.
9. **Quick deployment:** new servers and applications are ready in minutes, reducing time to market.
10. **Automatic updates:** software and security updates are applied by the provider.
11. **Easy monitoring and management** of resources within budget and time.
12. **Environmental sustainability:** shared, efficient data centres use energy better than many small server rooms.

**Example (cost, with assumed prices).** A company needs 10 servers for a project that runs 8 hours a day, 22 days a month, for 36 months.

1. Buying: if each server costs 1,200 dollars, the purchase alone is `10 × 1,200 = 12,000` dollars, before power, cooling, space and staff.
2. Renting: if a cloud server costs 0.05 dollars per hour, the cost is `10 × 0.05 × 8 × 22 × 36 = 3,168` dollars, and the servers can be released when the project ends.

(The prices are assumptions for illustration; real prices depend on the provider and the server size.)

**Availability.** Cloud providers state their availability in a service-level agreement (SLA) as a percentage of uptime. The maximum downtime per year is `(1 − availability) × 8,760 hours` (a year has `365 × 24 = 8,760` hours):

| Availability | Maximum downtime per year |
| --- | --- |
| 99.9% | `0.001 × 8,760 = 8.76` hours |
| 99.99% | `0.0001 × 8,760 = 0.876` hours ≈ 52.6 minutes |
| 99.995% | `0.00005 × 8,760 = 0.438` hours ≈ 26.3 minutes |

### Disadvantages of Cloud Computing

1. **Internet dependency:** services and data cannot be accessed without a working Internet connection, and performance depends on its speed.
2. **Downtime:** outages at the provider (power loss, maintenance, technical faults) or network problems stop access to the services.
3. **Security and privacy risks:** sensitive data is handed to a third party and may be exposed by breaches, hacking or misconfiguration.
4. **Limited control and flexibility:** the provider owns and manages the infrastructure, so the customer has limited control over data, applications and settings.
5. **Vendor lock-in:** moving from one provider to another is difficult because of different platforms and formats.
6. **Unknown data location:** customers often do not know exactly where their data is stored or how it is processed, which creates **compliance and legal issues** (data-protection laws).
7. **Performance variation:** shared resources may slow down when other customers' workloads are heavy or under attack.
8. **Cost management:** costs can grow unexpectedly with usage, extra bandwidth or data transfer, and long-term renting can cost more than owning.
9. **Limited bandwidth:** exceeding the provider's bandwidth allowance costs extra.
10. **Lack of support and skills:** some providers give limited support, and cloud systems need new technical skills.

## References {#references}

- NIST — Peter Mell and Timothy Grance, [The NIST Definition of Cloud Computing, SP 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf), September 2011, accessed 2026-11-06.
- TutorialsPoint — [Cloud Computing Overview](https://www.tutorialspoint.com/cloud_computing/cloud_computing_overview.htm), [Characteristics](https://www.tutorialspoint.com/cloud_computing/cloud_computing_characteristics.htm), [Advantages and Disadvantages of Cloud Computing](https://www.tutorialspoint.com/cloud_computing/advantages_and_disadvantages_of_cloud_computing.htm), accessed 2026-11-06.
- TpointTech — [Cloud Computing Tutorial](https://www.tpointtech.com/cloud-computing), [Features of Cloud Computing](https://www.tpointtech.com/features-of-cloud-computing), [Principles of Cloud Computing](https://www.tpointtech.com/principles-of-cloud-computing), [Advantages and Disadvantages of Cloud Computing](https://www.tpointtech.com/advantages-and-disadvantages-of-cloud-computing), accessed 2026-11-06.
- GeeksforGeeks — [Introduction to Cloud Computing](https://www.geeksforgeeks.org/cloud-computing/cloud-computing/), [Characteristics of Cloud Computing](https://www.geeksforgeeks.org/cloud-computing/characteristics-of-cloud-computing/), accessed 2026-11-06.
- Programiz has no page on cloud computing.
- The cost and availability examples were calculated with a short program; the prices in the cost example are assumed.

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint, TpointTech and GeeksforGeeks give different lists of characteristics. The five essential characteristics are taken from the NIST definition, which GeeksforGeeks also follows; the others are listed separately as "other characteristics".
2. TutorialsPoint says there are "no additional fees or hidden costs"; this is too absolute (unexpected costs are listed as a disadvantage on the same site), so these notes state the cost advantage with its limits.
3. TutorialsPoint says that the concept of cloud computing "came into existence in the year 1950" with mainframes; that is a historical root (shared mainframe access), not cloud computing as defined by NIST, so it was not used as a date.
4. TutorialsPoint says that resource pooling "is often used in wireless technologies like a radio transmission"; this is unrelated to cloud resource pooling and was not used.
