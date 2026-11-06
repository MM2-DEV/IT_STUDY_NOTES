---
description: Web services - definition, characteristics, components (XML, SOAP, WSDL, UDDI), architecture with publish-find-bind, protocol stack, SOAP and RESTful web services, SOAP vs REST, advantages and security.
updated: 2026-11-04
---

### Definition of Web Service

A web service is a **software component that lets different applications communicate and exchange data over a network** using standard protocols such as **HTTP and XML**.

It is available over the **Internet or an intranet** and uses a **standardized XML messaging system**. It is independent of any operating system and programming language, describes itself in XML and can be discovered through a registry.

Because a web service is language and platform independent, a Java application, a .NET application and a PHP application can all use the same web service and exchange data through it.

**Example:** in a restaurant, the waiter carries the customer's order to the kitchen and brings back the food; the customer never enters the kitchen. In the same way, a web service carries a client application's request to another application and returns the result. Another example is a bank's ATM that uses a web service of a different bank to read the data of that bank's customer.

### How a Web Service Works

Web services follow the **request–response** model:

1. The client application prepares a request, wraps it in an XML (SOAP) message or an HTTP request, and sends it over the network, usually with HTTP POST or GET.
2. The web service receives the request, extracts the data and processes it (for example, creates a new account).
3. The service sends the result back to the client as a response in XML (or JSON for RESTful services).
4. The client reads the response and uses the data.

The basic web service platform is **XML + HTTP**: XML tags the data, SOAP carries the message, WSDL describes the service and UDDI lists it so it can be found.

### Characteristics of Web Services

1. **XML-based** — uses XML to represent and transport data, so it is not tied to any operating system, platform or language, which makes it highly **interoperable**.
2. **Loosely coupled** — the client and the service are not tightly tied to each other; the service's implementation can change over time without breaking the clients.
3. **Coarse-grained** — offers complete business-level operations (for example, "transfer money") instead of many small methods.
4. **Synchronous or asynchronous** — in synchronous use, the client waits until the service finishes; in asynchronous use, the client continues its work and collects the result later.
5. **Supports Remote Procedure Calls (RPC)** — clients can call functions and methods on a remote object through an XML-based protocol.
6. **Supports document exchange** — can transfer complete business documents (for example, a purchase order).

### Components of Web Services

Web services have four basic components:

1. **XML (eXtensible Markup Language)** — the common data format in which all the messages and descriptions are written.
2. **SOAP (Simple Object Access Protocol)** — an XML-based **messaging protocol** for exchanging information between applications, usually over HTTP. It is a W3C recommendation.
3. **WSDL (Web Services Description Language)** — an XML-based language that **describes a web service**: its name and location (endpoint), the operations it offers, the parameters, return types and possible errors, and how to access it. It is pronounced "wiz-dull".
4. **UDDI (Universal Description, Discovery and Integration)** — an XML-based **registry (directory)** in which service providers **publish** their services and from which clients **find** them; it holds a pointer to each service's WSDL description.

#### Structure of a SOAP Message

A SOAP message is an XML document with four elements:

1. **Envelope** (required) — the root element; marks the start and end of the message.
2. **Header** (optional) — extra information for processing the message, such as authentication data or a transaction ID.
3. **Body** (required) — the actual request or response data.
4. **Fault** (optional, inside the Body) — information about errors that occurred while the message was being processed.

![A SOAP message: an Envelope containing an optional Header and a required Body, with an optional Fault inside the Body](/diagrams/software-engineering/soap-message.svg)

### Web Service Architecture

The web service architecture has **three roles**:

1. **Service provider** — creates the web service, hosts it on a server and publishes its description.
2. **Service requestor (consumer)** — a client application (a program or a browser) that finds and uses (invokes) the service.
3. **Service registry (broker)** — a central directory (UDDI) in which providers publish service descriptions and requestors search for them.

It has **three operations**:

1. **Publish** — the provider publishes the service description (WSDL) in the registry.
2. **Find** — the requestor searches the registry and gets the service description.
3. **Bind** — the requestor uses the binding information in the description to connect to the provider and invoke the service.

![Web service architecture: the provider publishes to the registry, the requestor finds the service there and then binds to the provider](/diagrams/software-engineering/web-service-architecture.svg)

### Web Service Protocol Stack

The web service protocol stack has four layers, from bottom to top:

1. **Service transport** — moves messages between applications: **HTTP** (main), SMTP, FTP and BEEP.
2. **XML messaging** — encodes messages in a common XML format: **SOAP** and XML-RPC.
3. **Service description** — describes the public interface of the service: **WSDL**.
4. **Service discovery** — publishes services in a common registry so they can be found: **UDDI**.

The lower three layers are needed to provide or use a web service; the simplest stack is **HTTP + SOAP + WSDL**.

### Types of Web Services

There are two main types of web services:

1. **SOAP web services**
2. **RESTful web services**

#### SOAP Web Services

SOAP web services exchange **XML messages** that follow the SOAP protocol, and are described by **WSDL**. They have a strict, standard message structure and can run over HTTP, SMTP, FTP and other transport protocols. They are used in enterprise systems (for example, banking) that need strict standards, security (**WS-Security**) and reliable messaging. In Java they are built with **JAX-WS**.

#### RESTful Web Services

REST (**Representational State Transfer**) is an **architectural style**, not a protocol, defined by **Roy Fielding** in his doctoral dissertation (2000). A RESTful web service treats data as **resources**, each identified by a **URI**, and works on them with the standard **HTTP methods**:

| HTTP method | Operation on the resource | Example |
| --- | --- | --- |
| GET | Read (retrieve) | `GET /users/5` — returns user 5 |
| POST | Create | `POST /users` — creates a new user |
| PUT | Update (replace) | `PUT /users/5` — updates user 5 |
| DELETE | Delete | `DELETE /users/5` — deletes user 5 |

RESTful services are **stateless** (each request carries all the information needed to process it), their responses can be **cached**, and they can return data in **JSON**, XML, HTML or plain text (JSON is the most common). They are lighter and faster than SOAP services and are the most common type today, especially for web, mobile and cloud applications. In Java they are built with **JAX-RS**.

### SOAP vs REST

| Basis | SOAP | REST |
| --- | --- | --- |
| Full form | Simple Object Access Protocol | Representational State Transfer |
| Nature | A protocol | An architectural style |
| Data format | XML only | JSON, XML, HTML, plain text |
| Transport | HTTP, SMTP, FTP and others | Mainly HTTP/HTTPS |
| Service description | WSDL | Usually OpenAPI (no required standard) |
| Operations | Operations defined in WSDL | Standard HTTP methods (GET, POST, PUT, DELETE) on URIs |
| State | Can support stateful operations | Stateless |
| Message size and speed | Heavy (large XML messages); slower | Lightweight; faster; uses less bandwidth |
| Caching | Responses cannot be cached | Responses can be cached |
| Security | WS-Security (built-in standards) plus HTTPS | Uses the transport's security: HTTPS, OAuth, tokens (JWT), API keys |
| Ease of use | More complex, more code | Simpler and more flexible |
| Common use | Enterprise systems needing strict standards and reliability | Web, mobile, cloud and microservices |

### Advantages of Web Services

1. **Interoperability** — applications written in different languages and running on different platforms (for example, Java and .NET) can communicate.
2. **Reusability** — the functions of existing code can be exposed over the network and used by many applications.
3. **Standardized protocols** — they use open standards (XML, SOAP, WSDL, HTTP), giving more choice and lower cost.
4. **Low cost of communication** — they run over the existing Internet infrastructure (HTTP), which is cheaper than private solutions such as EDI.
5. **Loose coupling** — clients and services can change independently.
6. **Discoverability** — services can be found through a registry.

### Security of Web Services

Three security concerns of web services are:

1. **Confidentiality** — messages are encrypted with **SSL/TLS (HTTPS)**; **XML Encryption** protects messages that pass through several intermediaries.
2. **Authentication** — the identity of the client is checked with HTTP Basic/Digest authentication, digital signatures (XML Signature), **SAML**, **OAuth** or tokens such as **JWT**.
3. **Network security** — firewalls can filter web service traffic (for example, SOAP messages sent by HTTP POST).

For SOAP services, **WS-Security** adds authentication, encryption and digital signatures to the messages themselves.

## References {#references}

**TutorialsPoint**

- [Web Services – Quick Guide](https://www.tutorialspoint.com/webservices/web_services_quick_guide.htm) — accessed 2026-11-04 (definition, characteristics, components, working, architecture, protocol stack, advantages, security)
- [SOAP – Message Structure](https://www.tutorialspoint.com/soap/soap_message_structure.htm) — accessed 2026-11-04

**GeeksforGeeks**

- [Web Services – Definition, Working, Types, Applications](https://www.geeksforgeeks.org/computer-science-fundamentals/web-services-definition-working-types-applications/) — accessed 2026-11-04 (definition, components, SOAP and RESTful types, characteristics, restaurant and ATM examples)
- [Web Services in Cloud Computing](https://www.geeksforgeeks.org/cloud-computing/web-services-in-cloud-computing/) — accessed 2026-11-04 (working, components, features, security)
- [REST API vs SOAP API](https://www.geeksforgeeks.org/websites-apps/difference-between-rest-api-and-soap-api/) — accessed 2026-11-04 (comparison table)

**TpointTech**

- [What is Web Service](https://www.tpointtech.com/what-is-web-service) — accessed 2026-11-04 (definition, types, features)
- [Architecture of Web Services](https://www.tpointtech.com/restful-web-services-architecture-of-web-services) — accessed 2026-11-04 (roles, publish/find/bind, protocol stack)
- [Introduction of SOAP and REST Web Services](https://www.tpointtech.com/soap-and-rest-web-services) — accessed 2026-11-04 (SOAP and REST, comparison). This page contradicts itself: it says that the SOAP specification has no security features and that SOAP does not support error handling, although its own comparison table says that SOAP defines its own security and it describes the SOAP Fault element. SOAP reports errors with the Fault element and is secured with WS-Security, as given above (cross-checked with GeeksforGeeks and TutorialsPoint). It also calls SOAP both "lightweight" and "heavyweight"; the other sites agree that SOAP is the heavier of the two.

**IT Job QnS**

- [Bangladesh Bank, AME/AE (IT), 2026](https://it.jobqns.com/bangladesh-bank-ame-ae-2026/) — accessed 2026-11-04 (SOAP uses XML and strict standards for enterprise use; REST can exchange data in several formats, mostly JSON). IT Job QnS has no separate web-services page.

**Programiz**

- Programiz has no page on web services, SOAP or REST (two searches, 2026-11-04).

**Additional source**

- R. T. Fielding, *Architectural Styles and the Design of Network-based Software Architectures*, doctoral dissertation, University of California, Irvine, 2000 (definition of REST)
