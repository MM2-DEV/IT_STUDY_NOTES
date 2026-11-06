---
description: The cloud deployment models — public, private, community and hybrid clouds (and multi-cloud) — with their benefits, drawbacks, examples and a comparison.
updated: 2026-11-06
---

## Public, Private, Hybrid and Community Clouds {#public-private-hybrid-and-community-clouds}

### Cloud Deployment Models

**A cloud deployment model** is a type of cloud defined by who owns and manages the cloud infrastructure, who may use it, and where it is located.

Deployment models define the type of access to the cloud. NIST defines four deployment models:

1. Public cloud
2. Private cloud
3. Community cloud
4. Hybrid cloud

![The four cloud deployment models](/diagrams/artificial-intelligence/cloud-deployment-models.svg)

### 1. Public Cloud

**A public cloud** is a cloud infrastructure provisioned for open use by the general public, owned and operated by a cloud provider (a business, academic or government organization) and located on the provider's premises.

The provider owns and manages the servers, storage and networks and delivers them over the Internet to many customers, whose data and workloads are kept isolated. Services are paid for on a pay-as-you-go basis. Examples: Amazon Web Services (for example, Amazon EC2), Microsoft Azure and Google Cloud.

Benefits:

1. **Cost-effective:** resources are shared by a very large number of customers, so they are cheap; there is no capital cost.
2. **No maintenance:** the provider manages the infrastructure, updates and operations.
3. **Reliability:** if a resource fails, another one from a different location is used.
4. **High scalability:** resources come from a large pool and can be scaled up or down on demand.
5. **Location independence:** services are delivered through the Internet.
6. **Utility-style costing:** pay-per-use.
7. **Flexibility:** it can be integrated with a private cloud.

Drawbacks:

1. **Lower security and privacy:** data is hosted off-site on shared resources, so it may not suit sensitive data; public clouds are attractive targets for attackers.
2. **Less customisable** than a private cloud.
3. **Resource contention:** sharing may reduce performance at peak times.
4. Less control over the infrastructure.

### 2. Private Cloud

**A private cloud** is a cloud infrastructure provisioned for the exclusive use of a single organization, which may be owned, managed and operated by the organization, a third party or both, and may be located on or off its premises.

It is also called an **internal** or **corporate cloud**. Its services are accessible only within the organization (for example, by its departments). It is used when high security, strict regulatory compliance and control are essential, for example by banks and government agencies.

Benefits:

1. **High security and privacy:** resources are not shared with the general public.
2. **More control:** the organization controls its hardware, resources, policies and access.
3. **Customisation:** the infrastructure can be configured to the organization's needs, including support for legacy systems.
4. Better utilisation than separate departmental data centres, because one cloud infrastructure is shared by all departments.

Drawbacks:

1. **High cost:** the organization must buy and maintain hardware, software and data centres and employ skilled staff.
2. **Limited scalability:** it can grow only within the capacity of its own resources.
3. **Restricted area of operation:** harder to make available globally.
4. **Additional skills** are needed to run the cloud.

### 3. Community Cloud

**A community cloud** is a cloud infrastructure provisioned for the exclusive use of a specific community of organizations that have shared concerns, such as mission, security requirements, policy or compliance.

It may be owned and managed by one or more of the organizations, by a third party, or both, and may be on or off premises. Examples: a cloud shared by several banks, hospitals, universities or government agencies.

Benefits:

1. **Cost-effective:** it gives the advantages of a private cloud at a lower cost, because the cost is shared among the organizations.
2. **Sharing:** resources and capabilities are shared among the member organizations.
3. **Security:** more secure than a public cloud (fewer, known users), although less secure than a private cloud.

Drawbacks:

1. Data is stored in one place shared by several organizations, so access must be controlled carefully.
2. Allocating responsibility for governance, security and cost among the organizations is difficult.
3. Higher cost than a public cloud, because fewer customers share it.

### 4. Hybrid Cloud

**A hybrid cloud** is a cloud infrastructure composed of two or more distinct clouds (private, community or public) that remain separate entities but are bound together by technology that enables data and application portability.

A common form is a mixture of a private and a public cloud: critical and sensitive activities run in the private cloud, and non-critical activities run in the public cloud. An example of portability is **cloud bursting**: an application runs in the private cloud and uses the public cloud when demand exceeds the private capacity.

Benefits:

1. **Scalability:** the scalability of the public cloud together with the private cloud.
2. **Flexibility:** secure private resources and scalable public resources.
3. **Cost efficiency:** non-critical work uses the cheaper public cloud.
4. **Security:** sensitive data stays in the private cloud.

Drawbacks:

1. **Complex networking and management** across two kinds of cloud.
2. **Security compliance:** all cloud services must comply with the organization's security policies.
3. **Infrastructure dependency:** it depends on the internal IT infrastructure, so redundancy across data centres is needed.

### Multi-Cloud

**Multi-cloud** is the use of cloud services from two or more different cloud providers, so that an organization can choose the best service for each need and avoid dependence on one provider.

Unlike a hybrid cloud, a multi-cloud need not combine private and public clouds; it may use several public clouds (for example, AWS for computing and Google Cloud for analytics). Its advantages are flexibility, avoiding vendor lock-in and price benefits; its drawbacks are complexity and the cost of managing several providers.

### Comparison of Deployment Models

| Point | Public cloud | Private cloud | Community cloud | Hybrid cloud |
| --- | --- | --- | --- | --- |
| Users | General public, many organizations | One organization | A group of organizations with common concerns | Combination |
| Ownership and management | Cloud provider | Organization or third party | Member organizations or third party | Mixed |
| Location | Provider's premises | On or off premises | On or off premises | Both |
| Cost | Lowest; pay-as-you-go | Highest; large initial investment | Medium; shared among members | Medium; optimised by placing workloads |
| Security and privacy | Lowest | Highest | Higher than public, lower than private | High for private part |
| Control and customisation | Least | Most | Medium | Medium |
| Scalability | Very high | Limited by own resources | Limited | High |
| Example | AWS, Microsoft Azure, Google Cloud | A bank's internal cloud | A cloud shared by hospitals | Private cloud + public cloud with cloud bursting |

## References {#references}

- NIST — Peter Mell and Timothy Grance, [The NIST Definition of Cloud Computing, SP 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf), 2011 (definitions of the four deployment models), accessed 2026-11-06.
- TutorialsPoint — [Public Cloud Model](https://www.tutorialspoint.com/cloud_computing/cloud_computing_public_cloud_model.htm), [Private Cloud Model](https://www.tutorialspoint.com/cloud_computing/cloud_computing_private_cloud_model.htm), [Community Cloud Model](https://www.tutorialspoint.com/cloud_computing/cloud_computing_community_cloud_model.htm), [Hybrid Cloud Model](https://www.tutorialspoint.com/cloud_computing/cloud_computing_hybrid_cloud_model.htm), accessed 2026-11-06.
- TpointTech — [Cloud Deployment Model](https://www.tpointtech.com/cloud-deployment-model), accessed 2026-11-06.
- GeeksforGeeks — [Types of Cloud](https://www.geeksforgeeks.org/cloud-computing/types-of-cloud/), accessed 2026-11-06.
- Programiz has no page on cloud deployment models.

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint says that private cloud resources "offer more efficiency than public cloud resources" and that a private cloud "is only accessible locally"; these statements are unclear or too strong (a private cloud can be hosted off premises and accessed over a VPN), so the notes state the drawback as "harder to make available globally".
2. GeeksforGeeks gives Cloud Foundry, Kubernetes, Apache Mesos, Red Hat OpenShift and Docker Swarm as "examples" of multi-cloud; these are tools that can help manage applications across clouds, not multi-cloud deployments, so they were not used.
3. The reference websites differ on the number of deployment models (four in NIST and TutorialsPoint; five in TpointTech and GeeksforGeeks, adding multi-cloud). The four NIST models are the main ones; multi-cloud is described separately.
