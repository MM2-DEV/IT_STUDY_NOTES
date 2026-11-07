---
description: Cloud security issues — threats, the shared responsibility model, data protection and mitigation — and edge and fog computing compared with cloud computing.
updated: 2026-11-06
---

## Cloud Security Issues {#cloud-security-issues}

### Definition of Cloud Security

Cloud security is the set of policies, technologies and controls that protect the data, applications and infrastructure of cloud computing from unauthorized access, data loss, attacks and other threats, and that keep cloud use compliant with laws and regulations.

Security is the biggest concern about cloud computing, because data and infrastructure are managed by a third party, data travels over the Internet, and many customers share the same resources.

### Why Cloud Security Is Needed

1. **Larger attack surface:** services are reachable over the Internet through many interfaces and APIs.
2. **Shared responsibility:** security duties are split between provider and customer, and gaps appear when either side misunderstands its part.
3. **Higher risk of data breaches:** large amounts of valuable data in one place attract attackers.
4. **Regulatory compliance:** data may be stored in several countries with different laws.
5. **Limited visibility:** customers cannot see or control the provider's infrastructure directly.

### Shared Responsibility Model

**The shared responsibility model** is the division of security duties between the cloud provider, which is responsible for the security *of* the cloud (its data centres, hardware, network and virtualization), and the customer, which is responsible for security *in* the cloud (its data, user access, configurations and applications).

The boundary depends on the service model: in IaaS the customer secures the operating system, applications and data; in PaaS the applications and data; in SaaS mainly its data and user accounts. The **Cloud Security Alliance (CSA) stack model** shows these boundaries: moving up from IaaS to PaaS to SaaS, each model inherits the capabilities and security concerns of the one below; IaaS has the least built-in security and SaaS the most. Any security mechanism below the boundary is built in by the provider; the customer must handle everything above it (see [Cloud Service Models](/topics/artificial-intelligence/cloud-service-models)).

### Cloud Security Issues (Threats and Risks)

1. **Data breach:** confidential data is viewed, accessed or stolen by an unauthorized party, for example through weak authentication or wrongly configured cloud storage.
2. **Data loss:** data is deleted, corrupted or made unreadable by attacks, mistakes, faulty hardware or software, or inadequate backups.
3. **Account hijacking:** an attacker steals a user's or organization's cloud account credentials (for example, by phishing) and uses the account for unauthorized activities. It is one of the most serious threats.
4. **Insecure interfaces and APIs:** cloud services are managed through APIs; weak or exposed APIs let attackers access or damage data.
5. **Misconfiguration:** wrongly configured storage, permissions or security settings (such as public storage buckets) expose data.
6. **Insider threats:** employees of the customer or the provider misuse their access.
7. **Denial of service (DoS) and distributed DoS (DDoS):** a flood of traffic makes cloud services unavailable to legitimate users.
8. **Shared resources and isolation failure:** the failure of the mechanisms that separate tenants (storage, memory, routing, the hypervisor) can let one customer's compromise affect others.
9. **Hardware vulnerabilities:** flaws such as Spectre and Meltdown let programs read data being processed by other programs on the same processor, including in the cloud.
10. **Phishing and social engineering:** tricking users into revealing passwords or access.
11. **Compliance and legal issues:** data may be stored in jurisdictions with different data-protection laws; customers must verify that the provider meets the required regulations.
12. **Vendor lock-in:** difficulty of moving data and applications to another provider.
13. **Malicious insider at the provider and management-interface compromise:** the provider's administrators and web management consoles are high-value targets.
14. **Lack of skills:** staff may not know how to configure and operate cloud security correctly.
15. **Data retention and deletion:** when a customer releases storage, the data must be erased so the next customer cannot read it.

### Data Security Mechanisms

All service models should include security mechanisms in four areas:

1. **Access control:** only authorized users and programs can reach resources.
2. **Authentication:** verifying the identity of users (passwords, multi-factor authentication).
3. **Authorization:** deciding what an authenticated user may do.
4. **Auditing:** recording and reviewing who did what.

Other mechanisms:

1. **Encryption:** data is encrypted both in transit and at rest, so that stolen data cannot be read without the keys.
2. **Brokered cloud storage access:** storage is isolated from clients by two services — a **broker**, which has full access to storage but no access to the client, and a **proxy**, which has access to the client and the broker but not to storage. A client's request goes to the proxy, the proxy forwards it to the broker, the broker fetches the data from storage, and the data returns through the broker and the proxy to the client.

### Security Planning Before Moving to the Cloud

1. Select the resources to move and analyse their sensitivity to risk.
2. Consider the service model (IaaS, PaaS or SaaS), because each makes the customer responsible for security at a different level.
3. Consider the type of cloud (public, private, community or hybrid).
4. Understand how the provider stores data and transfers it into and out of the cloud.

### Measures to Reduce Cloud Security Risks

1. **Multi-factor authentication (MFA)** and strong identity and access management.
2. **Encryption** of data at rest and in transit, with careful key management.
3. **Regular security audits and penetration tests,** and continuous monitoring.
4. **Zero-trust security:** no user or device is trusted by default; every access is verified.
5. **Correct configuration** and secured APIs.
6. **Backups and disaster recovery** plans.
7. **Employee training** in security best practices, to prevent phishing and password theft.
8. Choosing a provider that meets the required compliance standards, and a clear service-level agreement.

## Edge and Fog Computing {#edge-and-fog-computing}

### Why Edge and Fog Computing Are Needed

In pure cloud computing, all data from devices travels to a distant data centre and the response travels back. For the Internet of Things (IoT), with millions of sensors and cameras, this causes high **latency**, heavy use of **bandwidth**, and dependence on a strong network. Edge and fog computing move processing closer to where the data is produced.

![Edge, fog and cloud layers](/diagrams/artificial-intelligence/cloud-fog-edge.svg)

### Edge Computing

**Edge computing** is a distributed computing model that brings computation and data storage close to the sources of data — on or near the devices themselves — to reduce latency and the amount of data sent to a central data centre.

The term began to be used in the 1990s for content delivery networks, which delivered web and video content from servers near users. Examples:

1. A self-driving car processes its camera and sensor data on board to brake immediately.
2. A smart camera detects motion itself and sends only alerts.
3. Industrial machines detect faults locally.

### Fog Computing

**Fog computing** is a decentralized computing layer between the end devices (the edge) and the cloud, in which **fog nodes** such as gateways, routers, switches, base stations and local servers provide computing, storage and networking services close to the devices.

The term was introduced by **Cisco in 2012**; it is also called **fogging** or **fog networking**. Fog is "a cloud close to the ground". Fog nodes filter, aggregate and analyse data from many edge devices and send only selected data to the cloud for long-term storage and heavy analysis. In 2018 NIST described fog computing (SP 500-325) as a resource layer that resides between smart end devices and traditional cloud or data centres.

Fog computing is used:

1. When only selected data needs to be sent to the cloud.
2. When data must be analysed within fractions of a second (low latency).
3. When services must be provided to many devices spread over a large area.

Types of fog computing by level: **device-level** (sensors, switches, routers), **edge-level** (network-connected servers or appliances), **gateway-level** (devices that connect the edge to the cloud and send only relevant data) and **cloud-level** (cloud servers that process data before it reaches end users).

### Advantages of Edge and Fog Computing

1. **Low latency:** data is processed near its source, so responses are fast (real-time applications).
2. **Less bandwidth use and lower cost:** only filtered or summarised data is sent to the cloud.
3. **Better privacy:** sensitive data can be processed and kept locally.
4. **Reliability:** devices can keep working when the connection to the cloud is weak or lost.
5. **Scalability:** many devices are served by distributed nodes.
6. **Location awareness and mobility support.**

**Example (latency).** Signals travel through optical fibre at about `2 × 10⁸` m/s. For a data centre 2,000 km away, the one-way propagation delay is `2,000,000 / (2 × 10⁸) = 0.01` s = 10 ms, so a round trip takes at least 20 ms; for a fog node 10 km away, the round trip takes only `2 × 10,000 / (2 × 10⁸) = 0.0001` s = 0.1 ms, before any processing time. (Distances are assumed; checked with a short program.)

**Example (bandwidth).** 1,000 sensors each send a 100-byte reading every second: `1,000 × 100 = 100,000` bytes/s, which is `100,000 × 86,400 = 8.64 × 10⁹` bytes ≈ 8.64 GB per day sent to the cloud. If a fog node sends only a summary, the data reaching the cloud falls greatly.

### Disadvantages and Security Issues of Edge and Fog Computing

1. **Complexity:** many distributed nodes are harder to deploy, manage and update.
2. **Security:** fog and edge nodes are many, physically exposed and resource-constrained, which creates new risks — authentication of mobile users and nodes, intrusion detection across the hierarchy, and the need for lightweight cryptography. Traditional threats (eavesdropping, denial of service) and cloud-specific ones (virtualization vulnerabilities) also apply.
3. **Limited resources:** edge devices have little processing power and storage.
4. **Cost:** building a large distributed infrastructure can be expensive.

### Edge vs Fog vs Cloud Computing

| Point | Edge computing | Fog computing | Cloud computing |
| --- | --- | --- | --- |
| Where processing happens | On or next to the device | On fog nodes between devices and cloud (gateways, base stations, micro data centres) | In central, remote data centres |
| Distance from data source | Nearest | Near (local network) | Farthest |
| Latency | Lowest | Low | Highest |
| Number of nodes | Billions of devices | Many, geographically distributed | Few, large data centres |
| Computing power per node | Lowest | Medium | Highest |
| Bandwidth to cloud | Lowest (only results or alerts) | Medium (filtered, aggregated data) | Highest (all data) |
| Architecture | Fully distributed | Decentralised and distributed | Centralised |
| Mobility and location awareness | Supported | Supported | Limited |
| Typical uses | Real-time decisions in devices, vehicles, cameras | IoT aggregation, smart cities, regional analytics | Big data analytics, long-term storage, heavy computation |

Edge and fog computing are often used as synonyms in small systems; in larger deployments (such as smart cities), fog is a distinct layer between the edge and the cloud. They **complement** the cloud rather than replace it.

## References {#references}

- TutorialsPoint — [Cloud Computing Security](https://www.tutorialspoint.com/cloud_computing/cloud_computing_security.htm), [Cloud Computing Challenges](https://www.tutorialspoint.com/cloud_computing/cloud_computing_challenges.htm), [Cloud Computing Overview](https://www.tutorialspoint.com/cloud_computing/cloud_computing_overview.htm) (risks), accessed 2026-11-06. TutorialsPoint has no page on edge or fog computing.
- TpointTech — [Security Risks of Cloud Computing](https://www.tpointtech.com/security-risks-of-cloud-computing), [Fog Computing vs Cloud Computing](https://www.tpointtech.com/fog-computing-vs-cloud-computing), accessed 2026-11-06.
- GeeksforGeeks — [Security Issues in Cloud Computing](https://www.geeksforgeeks.org/cloud-computing/security-issues-in-cloud-computing/), [Fog Computing](https://www.geeksforgeeks.org/cloud-computing/fog-computing/), [Difference between Edge Computing and Fog Computing](https://www.geeksforgeeks.org/cloud-computing/difference-between-edge-computing-and-fog-computing/), accessed 2026-11-06.
- Wikipedia — [Fog computing](https://en.wikipedia.org/wiki/Fog_computing) (Cisco, 2012; NIST SP 500-325) and [Edge computing](https://en.wikipedia.org/wiki/Edge_computing) (definition; content delivery networks in the 1990s; relation to fog), accessed 2026-11-06.
- Ahmed M. Alwakeel, [An Overview of Fog Computing and Edge Computing Security and Privacy Issues](https://pmc.ncbi.nlm.nih.gov/articles/PMC8708798/), *Sensors*, 21(24), 8226, 2021 (security issues of fog and edge computing), accessed 2026-11-06.
- The latency and bandwidth examples use assumed figures and were checked with a short program.

Issues found on the reference websites and how they were resolved:

1. GeeksforGeeks's security page says that cloud computing "is also known as Serverless technology"; serverless computing (FaaS) is one cloud service model, not another name for cloud computing.
2. GeeksforGeeks says that when a DoS attack occurs "data is lost"; a DoS attack mainly makes services unavailable, while data loss is a separate threat.
3. GeeksforGeeks's fog computing page says that fog computing "is also known as Edge Computing" and that the term was coined by Cisco "in January 2014"; its own edge-versus-fog page treats them as different layers, and Wikipedia records that Cisco introduced the term in 2012. The notes give 2012 and explain how edge and fog relate.
4. TpointTech's fog-versus-cloud table says that the response time of cloud computing is "low" and of fog computing "high"; this is reversed — fog computing has the lower response time (its own first row says fog has lower latency).
5. TpointTech's table says that fog computing has "high security" and cloud computing "less security"; a 2021 survey of fog and edge security (Alwakeel) describes new security problems in fog networks (authentication, intrusion detection, side-channel attacks, constrained hardware), so the notes list security as both a benefit (local processing protects privacy) and a challenge.
