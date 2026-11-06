---
description: The cloud service models — IaaS, PaaS and SaaS — with their characteristics, benefits, issues and examples, a comparison, and other models (XaaS, FaaS).
updated: 2026-11-06
---

## IaaS, PaaS, SaaS {#iaas-paas-saas}

### Cloud Service Models

**A cloud service model** is a category of cloud service defined by the level of the computing stack that the provider delivers and manages, and the level that the customer controls.

Cloud computing is based on three basic service models, defined by NIST:

1. Infrastructure as a Service (IaaS)
2. Platform as a Service (PaaS)
3. Software as a Service (SaaS)

IaaS is the most basic level. Each higher model is built on the one below it and inherits its security and management mechanisms: PaaS runs on infrastructure, and SaaS runs on a platform. From IaaS to SaaS, the provider manages more and the customer manages less.

![Who manages each layer in on-premises IT and the three cloud service models](/diagrams/artificial-intelligence/cloud-service-models.svg)

### Infrastructure as a Service (IaaS)

**Infrastructure as a Service (IaaS)** is the cloud service model in which the provider supplies fundamental computing resources — processing (virtual machines), storage and networks — on which the consumer can deploy and run any software, including operating systems and applications.

The consumer does not manage the underlying physical infrastructure but controls the operating systems, storage and deployed applications, and possibly some networking components such as host firewalls. IaaS is also called **Hardware as a Service (HaaS)**. Its resources are delivered through **server virtualization**, and customers use them as if they owned them.

Resources offered by IaaS:

1. Virtual machines (with pre-installed operating systems such as Windows or Linux, if wanted).
2. Virtual machine disk storage.
3. Virtual local area networks (VLANs).
4. Load balancers.
5. IP addresses.
6. Firewalls, bandwidth and monitoring services.
7. Software bundles.

Characteristics:

1. Resources are available as a service, on demand.
2. Highly scalable: resources can be scaled up and down easily.
3. Dynamic and flexible; accessed through a graphical interface (GUI) or an API.
4. Copies of data can be kept in different locations.
5. Administrative tasks are automated.
6. Payment depends on how long each resource is kept.

Benefits:

1. **Full control** of the computing resources through administrative access to the VMs: the customer can start servers, install any software, even a custom operating system.
2. **Flexible and efficient renting** of hardware, avoiding the cost and complexity of buying and managing physical servers.
3. **Portability and interoperability with legacy applications:** applications such as web or e-mail servers that ran on the customer's own hardware can run on VMs in the cloud.

Issues:

1. **Legacy security vulnerabilities:** running old software in the cloud exposes its security weaknesses.
2. **Virtual machine sprawl:** VMs kept in running, suspended or off states can miss security updates.
3. **Robustness of VM-level isolation:** customers are isolated only by the hypervisor.
4. **Data erase practices:** when one customer releases a disk, the next customer must not be able to see the old data.
5. Network dependence and browser-based risks (shared with PaaS and SaaS).

Users: system administrators and network architects. Examples: **Amazon EC2** (AWS), Microsoft Azure virtual machines, Google Compute Engine, DigitalOcean, Linode, Rackspace.

### Platform as a Service (PaaS)

**Platform as a Service (PaaS)** is the cloud service model in which the provider supplies a platform — a runtime environment with programming languages, libraries, development and deployment tools — on which consumers build, test, deploy and run their own applications.

The consumer does not manage the underlying infrastructure (network, servers, operating systems or storage) but controls the deployed applications and possibly the configuration of the hosting environment.

Characteristics:

1. Browser-based development environment; code and databases can be created through APIs or point-and-click tools.
2. Built-in security, scalability (auto-scaling) and web service interfaces.
3. Built-in tools for workflow, approval processes and business rules.
4. Supports multiple programming languages and frameworks.
5. Easy integration with databases, web services and other applications on the same platform.
6. Many users can use the same development application.

Benefits:

1. **Lower administrative overhead:** the provider administers the platform.
2. **Lower total cost of ownership:** no need to buy hardware, servers, power or storage.
3. **Scalable solutions:** resources scale up and down automatically with demand.
4. **Up-to-date system software:** the provider maintains software versions and installs patches.
5. Faster development: developers concentrate on code, not servers.

Issues:

1. **Lack of portability between PaaS clouds:** platform interfaces (for files, queues and so on) differ, so moving an application to another provider is hard (**vendor lock-in**).
2. **Event-based processor scheduling:** applications must respond to each request within a time limit.
3. **Security engineering:** applications depend on the network and must use cryptography and manage security themselves.
4. Limited control over the underlying system and limited customisation.

PaaS can be of four types: stand-alone development environments, application-delivery-only environments, open platform as a service, and add-on development facilities (which customise an existing SaaS platform).

Users: software and web developers. Examples: **Google App Engine**, AWS Elastic Beanstalk, Microsoft Azure App Service, Heroku, Salesforce Platform (Force.com), Red Hat OpenShift.

### Software as a Service (SaaS)

**Software as a Service (SaaS)** is the cloud service model in which the provider's applications, running on cloud infrastructure, are delivered to users over the Internet, usually through a web browser, without installation on the user's computer.

The consumer does not manage the infrastructure, platform or even the application's features, except possibly some user-specific settings. SaaS is also called **on-demand software** or web-based software. Examples of SaaS applications are billing and invoicing systems, customer relationship management (CRM), help-desk applications and human resource (HR) solutions.

Characteristics:

1. The software is available over the Internet and managed from a central location by the vendor.
2. The licence is a subscription or based on usage, billed on a recurring basis.
3. It is available on demand and can be scaled up or down.
4. It is upgraded and updated automatically; all users run the same version.
5. It is **multi-tenant**: many users share a single instance of the application, isolated virtually.
6. APIs allow developers to build customised applications on it.

Benefits:

1. **Modest software tools:** little or no client-side installation, low distribution cost and little configuration risk.
2. **Efficient use of licences:** one licence can serve many computers in different places; no licence servers are needed.
3. **Centralised management and data.**
4. **Platform responsibilities managed by the provider:** backups, maintenance, security, hardware refresh and power management.
5. **Multi-tenant solutions:** customers customise their use without affecting the core application.
6. Accessible from any device with a browser, anywhere.

Issues:

1. **Browser-based risks:** a browser infected by a malicious website can expose the SaaS data; a separate browser or a virtual desktop reduces the risk.
2. **Network dependence:** the application works only when the network is available and reliable.
3. **Lack of portability between SaaS clouds:** workflows, business logic and interfaces are provider-specific.
4. Less flexibility than installed software, and data is held by the provider.

Users: end users and businesses. Examples: **Google Docs and Google Workspace** (Gmail), Microsoft 365, Salesforce CRM, Dropbox, Zoom, Slack, Cisco WebEx.

### Comparison of IaaS, PaaS and SaaS

| Point | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| Full form | Infrastructure as a Service | Platform as a Service | Software as a Service |
| What is provided | Virtual machines, storage, networks | Runtime environment, development and deployment tools | Ready-to-use applications |
| What the provider manages | Physical hardware and virtualization | Hardware, OS, runtime and middleware | Everything, including the application |
| What the customer manages | OS, runtime, applications, data | Applications and data | Only user settings and data |
| Main users | System administrators, network architects | Developers | End users |
| Technical knowledge needed | High | Moderate | None |
| Control | Most | Medium | Least |
| Provides | Infrastructure only | Infrastructure + platform | Infrastructure + platform + software |
| Examples | Amazon EC2, Google Compute Engine, DigitalOcean | Google App Engine, AWS Elastic Beanstalk, Heroku | Google Workspace, Microsoft 365, Salesforce |

### Other Service Models

1. **Anything (Everything) as a Service (XaaS):** the general name for the delivery of any IT service over the Internet on a pay-as-you-use basis. It includes, for example:
   1. **Network as a Service (NaaS)**, **Storage as a Service (STaaS)**, **Database as a Service (DBaaS)**, **Identity as a Service (IDaaS)**, **Desktop as a Service (DaaS)**, **Container as a Service (CaaS)**, **Business as a Service** and **Strategy as a Service**.
   2. Example: a company that uses AWS virtual servers (IaaS), Google Workspace (SaaS) and Firebase (PaaS) together is using XaaS.
2. **Function as a Service (FaaS, serverless computing):** developers upload small functions that run only when triggered by an event (such as an image upload); the provider allocates resources and scales automatically, and the customer pays only for the execution time. It is suited to event-driven, short tasks but not to long-running ones, and an idle function may start with a delay.

## References {#references}

- NIST — Peter Mell and Timothy Grance, [The NIST Definition of Cloud Computing, SP 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf), 2011 (definitions of SaaS, PaaS and IaaS), accessed 2026-11-06.
- TutorialsPoint — [Infrastructure as a Service](https://www.tutorialspoint.com/cloud_computing/cloud_computing_infrastructure_as_a_service.htm), [Platform as a Service](https://www.tutorialspoint.com/cloud_computing/cloud_computing_platform_as_a_service.htm), [Software as a Service](https://www.tutorialspoint.com/cloud_computing/cloud_computing_software_as_a_service.htm), [Difference between IaaS, PaaS and SaaS](https://www.tutorialspoint.com/cloud_computing/difference_between_iaas_paas_and_saas.htm), [Cloud Computing Overview](https://www.tutorialspoint.com/cloud_computing/cloud_computing_overview.htm), accessed 2026-11-06.
- TpointTech — [Cloud Service Models](https://www.tpointtech.com/cloud-service-models), [Infrastructure as a Service](https://www.tpointtech.com/infrastructure-as-a-service), [Platform as a Service](https://www.tpointtech.com/platform-as-a-service), [Software as a Service](https://www.tpointtech.com/software-as-a-service), accessed 2026-11-06.
- GeeksforGeeks — [Cloud Based Services](https://www.geeksforgeeks.org/cloud-computing/cloud-based-services/), [Introduction to Cloud Computing](https://www.geeksforgeeks.org/cloud-computing/cloud-computing/), accessed 2026-11-06.
- Programiz has no page on cloud service models.

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint's IaaS–PaaS–SaaS comparison table lists Salesforce under IaaS and AWS under SaaS in its "outsourced cloud services" row, and describes IaaS as delivering "a graphical representation of computing resources". Salesforce CRM is SaaS (and Force.com is PaaS), AWS EC2 is IaaS, and IaaS delivers virtualized resources; that row and phrase were not used.
2. TutorialsPoint lists Facebook as a SaaS cloud service; Facebook is a social network, not a software service offered for business use, so it was not used as an example.
3. TutorialsPoint gives Microsoft Office Suite as an example of non-customisable SaaS; the installed Office suite is not SaaS (Microsoft 365 online is), so it was not used.
4. The reference websites name different numbers of service models (three on TutorialsPoint and TpointTech; five on GeeksforGeeks, adding XaaS and FaaS). The three NIST models are the basic ones; XaaS and FaaS are given under "Other Service Models".
