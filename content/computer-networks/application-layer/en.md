---
description: Application layer - principles of network applications (client-server and P2P, processes, sockets, port numbers, transport services), the Web and HTTP (persistent and non-persistent connections, messages, methods, status codes, cookies, web caching), FTP, e-mail (SMTP, POP3, IMAP, MIME) and DNS.
updated: 2026-11-06
---

## Principles of Network Applications {#principles-of-network-applications}

### Application Layer

The application layer is the **top layer of the OSI and TCP/IP models, which provides network services directly to user applications** through application-layer protocols such as HTTP, FTP, SMTP and DNS.

A network application (such as a web browser and web server) runs on **end systems** only; routers and switches in the network core do not run application-layer software. An application-layer protocol defines:

1. The **types of messages** exchanged (for example, request and response).
2. The **syntax** of each message (its fields).
3. The **meaning (semantics)** of the fields.
4. The **rules** for when and how processes send and respond to messages.

### Application Architectures

There are two main application architectures:

1. **Client-server architecture** — an **always-on server** with a fixed IP address serves requests from many **clients**; clients do not communicate directly with each other. Large services use **data centres** with many servers. Examples: the Web, FTP, e-mail.
2. **Peer-to-peer (P2P) architecture** — pairs of intermittently connected hosts (**peers**) communicate directly; each peer acts as both a client and a server. It is **self-scalable** (every new peer adds service capacity as well as demand) and cheap, but harder to secure and manage. Example: BitTorrent file sharing.

![Client-server and peer-to-peer architectures](/diagrams/computer-networks/client-server-p2p.svg)

### Client-Server vs Peer-to-Peer

| Basis | Client-server | Peer-to-peer |
| --- | --- | --- |
| Roles | Fixed: server provides, clients request | Each peer is both client and server |
| Server | Always on, fixed IP address | No dedicated server |
| Scalability | Limited by server capacity (more servers needed) | Self-scalable |
| Cost | High (servers, data centres, bandwidth) | Low |
| Control and security | Centralized, easier | Distributed, harder |
| Examples | Web, e-mail, FTP | BitTorrent, Skype (originally) |

### Processes and Sockets

1. A **process** is a program running on an end system. On the network, the process that starts the communication is the **client process**, and the one that waits to be contacted is the **server process**.
2. A **socket** is the **software interface between an application process and the transport layer**; a process sends and receives messages through its socket. It is the API between the application and the network.
3. To address a process, two identifiers are needed: the **IP address** of the host and the **port number** of the process on that host (for example, a web server uses port 80).

### Well-Known Port Numbers

| Protocol | Port | Transport |
| --- | --- | --- |
| FTP (data / control) | 20 / 21 | TCP |
| SSH | 22 | TCP |
| Telnet | 23 | TCP |
| SMTP | 25 (587 for mail submission) | TCP |
| DNS | 53 | UDP (TCP for large replies and zone transfers) |
| DHCP (server / client) | 67 / 68 | UDP |
| HTTP | 80 | TCP |
| POP3 | 110 (995 with SSL/TLS) | TCP |
| IMAP | 143 (993 with SSL/TLS) | TCP |
| SNMP | 161 | UDP |
| HTTPS | 443 | TCP |

### Transport Services Needed by Applications

An application chooses a transport protocol according to four needs:

1. **Reliable data transfer** — file transfer, e-mail and web pages need every byte delivered correctly; audio and video can **tolerate some loss**.
2. **Throughput** — **bandwidth-sensitive** applications (such as video) need a minimum rate; **elastic** applications (e-mail, file transfer) use whatever is available.
3. **Timing** — interactive real-time applications (internet telephony, games) need small delays.
4. **Security** — encryption, integrity and authentication (provided by TLS on top of TCP).

The Internet offers two transport protocols:

1. **TCP** — connection-oriented, **reliable**, with flow and congestion control. Used by HTTP, FTP, SMTP, POP3, IMAP, SSH.
2. **UDP** — connectionless, unreliable, with no flow or congestion control, but **fast** with little overhead. Used by DNS, DHCP, SNMP and many real-time applications.

## Web and HTTP {#web-and-http}

### World Wide Web

The World Wide Web (WWW) is a **distributed system of linked documents and resources, identified by URLs and accessed over the Internet with HTTP**.

It was invented by **Tim Berners-Lee** at **CERN** (1989–1991). A **web page** consists of **objects**: a **base HTML file** and the objects it references (images, scripts, style sheets, videos). Each object is addressed by a **URL** (uniform resource locator).

**URL format:** `protocol://host:port/path`, for example `https://www.example.com:443/notes/index.html`, where `https` is the protocol, `www.example.com` the host name, `443` the port (optional) and `/notes/index.html` the path of the object.

### HTTP

HTTP (HyperText Transfer Protocol) is the **application-layer protocol of the Web, in which a client (browser) sends request messages for objects and a server (web server) returns response messages containing them**.

1. HTTP uses **TCP** as its transport protocol, on **port 80** (HTTPS uses port 443).
2. HTTP is **stateless**: the server keeps no information about past requests from a client. (State is added with cookies.)
3. HTTP is **media independent**: any type of data can be sent, described by its MIME type.
4. Versions: HTTP/1.0 (1996, non-persistent), HTTP/1.1 (1997, persistent connections and pipelining), HTTP/2 (2015, multiplexing of many requests over one connection, header compression), HTTP/3 (over QUIC/UDP).

### Non-Persistent and Persistent HTTP

The **round-trip time (RTT)** is the time for a small packet to travel from the client to the server and back.

1. **Non-persistent HTTP** (HTTP/1.0) — a **separate TCP connection** is opened for **each object** and closed after the response. Each object needs **2 RTT** (one to set up TCP, one for the request and the start of the response) plus its transmission time. Browsers reduce the delay by opening several **parallel** connections.
2. **Persistent HTTP** (default in HTTP/1.1) — the server **leaves the connection open** after a response, and later requests and responses between the same client and server use the same connection.
   1. **Without pipelining** — the client sends a new request only after the previous response arrives: one RTT per object.
   2. **With pipelining** — the client sends requests for all referenced objects one after another: as little as **one RTT for all of them**.

![Non-persistent and persistent HTTP](/diagrams/computer-networks/http-persistent.svg)

> **Response time of one object (non-persistent) = 2 RTT + transmission time**

**Example:** a web page has a base HTML file and **10 images**, all on the same server. The RTT is 100 ms, and transmission times are ignored.

1. **Non-persistent, one connection at a time:** 11 objects × 2 RTT = 22 RTT = **2.2 s**.
2. **Non-persistent with 5 parallel connections:** 2 RTT for the base file + 2 RTT for the first 5 images + 2 RTT for the next 5 = 6 RTT = **0.6 s**.
3. **Persistent without pipelining:** 2 RTT (connection + base file) + 10 × 1 RTT = 12 RTT = **1.2 s**.
4. **Persistent with pipelining:** 2 RTT + 1 RTT = 3 RTT = **0.3 s**.

For a page of one base file and three images, the client sends **four requests** and receives **four responses**, one per object.

### Persistent vs Non-Persistent HTTP

| Basis | Non-persistent HTTP | Persistent HTTP |
| --- | --- | --- |
| TCP connections | One per object | One for many objects |
| Delay per object | 2 RTT + transmission time | About 1 RTT (less with pipelining) |
| Server overhead | High (a connection per object; buffers and variables each time) | Low |
| Default in | HTTP/1.0 | HTTP/1.1 and later |

### HTTP Request Message

An HTTP request has:

1. **Request line** — **method**, **URL** and **HTTP version**: `GET /notes/index.html HTTP/1.1`.
2. **Header lines** — for example `Host: www.example.com`, `User-Agent`, `Accept-Language`, `Connection: close` (or `keep-alive`).
3. A **blank line**.
4. **Entity body** — empty for GET; contains form data for POST.

**Main methods:**

1. **GET** — request an object (data, if any, is sent in the URL).
2. **POST** — send data (such as form input) to the server in the body.
3. **HEAD** — like GET, but the response has no body (used for testing and debugging).
4. **PUT** — upload an object to the given URL.
5. **DELETE** — delete the object at the given URL.

### HTTP Response Message

An HTTP response has a **status line** (version, **status code** and phrase, such as `HTTP/1.1 200 OK`), **header lines** (such as `Date`, `Server`, `Last-Modified`, `Content-Length`, `Content-Type`), a blank line and the **body** (the requested object). Some responses, such as **304 Not Modified**, have an empty body.

### HTTP Status Codes

Status codes are grouped into five classes by their first digit:

| Class | Meaning | Common codes |
| --- | --- | --- |
| 1xx | Informational | 100 Continue |
| 2xx | Success | **200 OK** |
| 3xx | Redirection | **301 Moved Permanently**, **304 Not Modified** |
| 4xx | Client error | **400 Bad Request**, 401 Unauthorized, **403 Forbidden**, **404 Not Found** |
| 5xx | Server error | **500 Internal Server Error**, 503 Service Unavailable, **505 HTTP Version Not Supported** |

### Cookies

**Cookie** is a **small piece of data that a web server sends to a browser and that the browser returns with later requests**, so that the server can recognize the user and keep state over the stateless HTTP.

Cookies have four parts: a **Set-cookie** header line in the HTTP response, a **Cookie** header line in later requests, a **cookie file** in the browser, and a **back-end database** at the website. They are used for log-in sessions, shopping carts and recommendations, but also raise **privacy** concerns (tracking).

### Web Caching (Proxy Server)

**Web cache** (proxy server) is a **server that stores copies of recently requested objects and answers requests on behalf of the origin server**.

The browser sends its request to the cache. If the cache has a fresh copy (a **hit**), it returns it at once; otherwise (a **miss**) it fetches the object from the origin server, keeps a copy and returns it. Caches **reduce the response time** for clients and **reduce traffic** on an organization's access link. A cache checks that its copy is up to date with a **conditional GET** (an `If-Modified-Since` header); if the object has not changed, the server replies **304 Not Modified** with no body.

### HTTP vs HTTPS

| Basis | HTTP | HTTPS |
| --- | --- | --- |
| Full form | HyperText Transfer Protocol | HyperText Transfer Protocol Secure |
| Security | Data sent in plain text | Data encrypted with SSL/TLS |
| Port | 80 | 443 |
| Certificate | Not needed | Digital (SSL/TLS) certificate needed |
| Protection | Can be intercepted and changed | Protects against eavesdropping and tampering; authenticates the server |
| URL | http:// | https:// |

## FTP {#ftp}

### Definition of FTP

FTP (File Transfer Protocol) is an **application-layer protocol for transferring files between a client and a server over a TCP/IP network**.

The user logs in to the remote server with a user name and password, then can list directories and upload or download files. FTP can be used from the command line or with graphical clients such as FileZilla.

### Control and Data Connections

FTP uses **two parallel TCP connections**:

1. **Control connection (TCP port 21)** — carries **commands and replies** (user name, password, directory changes, requests to store or retrieve files). It stays open for the **whole session**.
2. **Data connection (TCP port 20)** — carries the **file** (or directory listing). A **new data connection** is opened for each file and closed after it.

Because control information is sent on a separate connection from the data, FTP is said to send its control information **out-of-band** (HTTP sends it **in-band**). FTP is also **stateful**: the server keeps track of the user's current directory and log-in during the session.

![FTP control and data connections](/diagrams/computer-networks/ftp-connections.svg)

### Active and Passive Modes

1. **Active mode** — the client tells the server a port (PORT command), and the **server opens** the data connection from its port 20 to the client.
2. **Passive mode** — the client sends PASV, the server replies with a port, and the **client opens** the data connection; this works better through firewalls and NAT.

### FTP Commands and Replies

1. **Commands** (sent as ASCII text on the control connection): `USER` (user name), `PASS` (password), `LIST` (list files), `RETR` (retrieve a file), `STOR` (store a file), `QUIT`. Client programs offer commands such as `get`, `put`, `mget`, `ls` and `cd`.
2. **Replies** are three-digit codes with a phrase, for example **200** Command OK, **331** User name OK, password required, **425** Can't open data connection, **452** Error writing file, **530** Not logged in.

### Transmission Modes and File Types

1. **Transmission modes:** **stream** mode (data sent as a continuous stream of bytes; the default), **block** mode (data sent in blocks with headers) and **compressed** mode.
2. **File (data) types:** **ASCII**, **EBCDIC** and **image (binary)** files.

### Anonymous FTP

Anonymous FTP lets users log in with the user name **anonymous** (and usually an e-mail address as the password) to download public files.

### FTP vs HTTP

| Basis | FTP | HTTP |
| --- | --- | --- |
| Main use | File transfer (upload and download) | Transfer of web pages and objects |
| Connections | Two (control and data) | One |
| Ports | 21 (control), 20 (data) | 80 |
| Control information | Out-of-band | In-band |
| State | Stateful (keeps the session state) | Stateless |
| Authentication | User name and password usually required | Usually not required |

## E-mail {#e-mail}

### Components of the E-mail System

The Internet e-mail system has three main components:

1. **User agent (UA)** — the program used to read, compose, reply to and forward messages, such as Microsoft Outlook, Thunderbird or a web-mail page.
2. **Mail server** — holds each user's **mailbox** of incoming messages and a **message queue** of outgoing messages; mail servers transfer mail to each other (as **message transfer agents**).
3. **SMTP** — the protocol used to send mail from the sender's user agent to its mail server, and between mail servers.

![Main parts of the Internet e-mail system](/diagrams/computer-networks/email-system.svg)

**Steps of sending an e-mail:**

1. The sender writes the message in the user agent, which sends it to the sender's mail server with SMTP.
2. The sender's mail server queues it and opens a TCP connection (port 25) to the receiver's mail server, then sends the message with SMTP. If the receiver's server is down, it retries later.
3. The receiver's mail server stores the message in the receiver's mailbox.
4. The receiver's user agent retrieves the message with **POP3**, **IMAP** or **HTTP** (web mail).

### SMTP

SMTP (Simple Mail Transfer Protocol) is the **application-layer protocol used to send (push) e-mail from a sender to the receiver's mail server, using TCP port 25**.

1. SMTP is a **push** protocol: the sending server pushes the message to the receiving server. It cannot be used to retrieve mail from a mailbox.
2. It works in three phases: **handshaking** (greeting), **transfer of messages** and **closure**.
3. Its commands are ASCII text, such as **HELO**, **MAIL FROM**, **RCPT TO**, **DATA** and **QUIT**; replies are three-digit codes (such as 250 OK).
4. The message body must be **7-bit ASCII**, so other data (images, other languages) is encoded with **MIME**.
5. Mail is usually transferred directly from the sender's server to the receiver's server, without intermediate servers.

### E-mail Message Format

An e-mail message (RFC 822, now RFC 5322) has a **header** and a **body**, separated by a blank line.

| Header field | Meaning |
| --- | --- |
| To | Address of the primary recipients |
| Cc | Carbon copy: addresses of secondary recipients |
| Bcc | Blind carbon copy: recipients hidden from the others |
| From | The person who wrote the message |
| Subject | Topic of the message |
| Date | Date and time the message was sent |
| Received | Added by each mail server along the route |

An e-mail address has the form **user-name@domain-name**, for example `student@example.com`.

### MIME

MIME (Multipurpose Internet Mail Extensions) is a **set of extensions that lets e-mail carry non-ASCII data, such as images, audio, video, files and text in other languages**, by encoding it as 7-bit ASCII for SMTP.

It adds header lines such as `MIME-Version`, `Content-Type` (for example `text/html`, `image/jpeg`) and `Content-Transfer-Encoding` (for example `base64`). MIME types are also used by HTTP.

### POP3

POP3 (Post Office Protocol version 3) is a **simple mail-access protocol with which a user agent downloads messages from the mail server, using TCP port 110**.

It has three phases: **authorization** (user name and password), **transaction** (list, retrieve and mark messages for deletion) and **update** (the server deletes the marked messages when the user quits).

1. **Download-and-delete mode** — messages are deleted from the server after download (the default); they can then be read only on that one device.
2. **Download-and-keep mode** — copies are kept on the server.

POP3 does not keep state between sessions and does not support folders on the server.

### IMAP

IMAP (Internet Message Access Protocol) is a **mail-access protocol that keeps messages on the server and lets the user organize and read them there from any device, using TCP port 143**.

The user can create **folders on the server**, move messages between them, search them, and download only parts of a message (such as the header). The state (read, unread, deleted, folders) is **synchronized** across all devices. The current version is IMAP4.

### POP3 vs IMAP

| Basis | POP3 | IMAP |
| --- | --- | --- |
| Where mail is kept | Downloaded to the device (usually deleted from the server) | Kept on the server |
| Access from several devices | Difficult | Easy; synchronized |
| Folders on the server | No | Yes |
| State between sessions | Not kept | Kept (read, flagged, folders) |
| Partial download | No (whole message) | Yes (for example, headers only) |
| Offline reading | Yes | Only of messages already downloaded |
| Server storage needed | Less | More |
| Port | 110 (995 with SSL/TLS) | 143 (993 with SSL/TLS) |

### Web-Based E-mail

With web-based e-mail (such as Gmail), the user agent is a **web browser**: it sends and reads mail using **HTTP** with the mail server, while the mail servers still exchange mail with each other using SMTP.

## DNS {#dns}

### Definition of DNS

DNS (Domain Name System) is a **distributed, hierarchical database and application-layer protocol that translates human-readable host names (such as www.example.com) into IP addresses**.

People remember names, while routers need IP addresses, so almost every Internet application uses DNS first. DNS runs over **UDP port 53** (TCP is used for large replies and for zone transfers between servers). It works on the client-server model.

### Services of DNS

1. **Host name to IP address translation.**
2. **Host aliasing** — a host with a complicated **canonical** name can have simpler **alias** names.
3. **Mail server aliasing** — finds the mail server of a domain (MX record), so an address like `user@example.com` works.
4. **Load distribution** — a busy site with many servers is given a set of IP addresses, and DNS rotates their order.

### Why DNS Uses UDP

1. A DNS query and its reply are usually **single small messages**, which fit in one UDP datagram.
2. UDP needs **no connection setup**, so the lookup is faster (TCP would add a handshake RTT).
3. A DNS server can handle many more clients without keeping connection state. If a reply is lost, the client simply asks again.

### Domain Name Space

The domain names form an inverted **tree**. A **fully qualified domain name (FQDN)** lists the labels from a host up to the root, separated by dots, for example `www.buet.ac.bd.` (the final dot is the root).

1. **Root** — the top of the tree, represented by a dot.
2. **Top-level domains (TLDs):**
   1. **Generic domains (gTLDs)** — `com` (commercial), `org` (non-profit), `net` (network), `edu` (education), `gov` (government), `mil` (military), `int` (international organizations), and newer ones such as `info`, `biz`.
   2. **Country-code domains (ccTLDs)** — two-letter codes, such as `bd` (Bangladesh), `in` (India), `uk` (United Kingdom).
3. **Second-level domains and subdomains** — such as `example` in `example.com`, and `www` or `mail` below it.
4. **Inverse (reverse) domain** — `in-addr.arpa`, used to map an IP address back to a name (PTR records).

### DNS Servers

No single server holds all mappings; DNS uses a **hierarchy of servers**:

1. **Root DNS servers** — at the top; they return the addresses of the TLD servers. There are 13 root server names (A to M), each run as many copies around the world.
2. **Top-level domain (TLD) servers** — responsible for `com`, `org`, `bd` and so on; they return the addresses of authoritative servers.
3. **Authoritative DNS servers** — hold the actual records of an organization's hosts (for example, the servers of `example.com`).
4. **Local DNS server (resolver)** — provided by each ISP or organization; hosts send their queries to it, and it queries the hierarchy on their behalf and caches the results.

![The hierarchy of the Domain Name System](/diagrams/computer-networks/dns-hierarchy.svg)

### Recursive and Iterative Queries

1. **Recursive query** — the queried server must find the **final answer** itself (by asking other servers) and return it. The query from a host to its local DNS server is normally recursive.
2. **Iterative query** — the queried server returns the **best answer it has**: either the answer or the address of the **next server to ask**. Queries from the local DNS server to the root, TLD and authoritative servers are normally iterative.

![Resolving a name with recursive and iterative queries](/diagrams/computer-networks/dns-resolution.svg)

**Steps of resolving www.example.com:**

1. The browser (or operating system) checks its own **cache**; if the name is not there, the host asks the **local DNS server**.
2. The local server, if it has no cached answer, asks a **root server**, which replies with the address of the **.com TLD server**.
3. The local server asks the **TLD server**, which replies with the address of the **authoritative server** for example.com.
4. The local server asks the **authoritative server**, which returns the **IP address** of www.example.com.
5. The local server returns the address to the host and **caches** it; the browser then opens a TCP connection to that address.

### DNS Caching

Every DNS server **caches** the replies it receives, so later queries for the same name are answered at once. Each cached record has a **time to live (TTL)** after which it is removed. Because TLD server addresses are usually cached, root servers are rarely contacted.

### DNS Resource Records

DNS servers store **resource records (RRs)** of the form **(Name, Value, Type, TTL)**:

| Type | Name | Value |
| --- | --- | --- |
| **A** | Host name | IPv4 address of the host |
| **AAAA** | Host name | IPv6 address of the host |
| **NS** | Domain | Host name of the authoritative DNS server for the domain |
| **CNAME** | Alias name | Canonical (real) name of the host |
| **MX** | Domain | Canonical name of the mail server of the domain |
| **PTR** | IP address (in in-addr.arpa) | Host name (reverse lookup) |

DNS query and reply messages have the **same format**: a header (with an identification number and flags, such as "recursion desired"), followed by question, answer, authority and additional sections.

## References {#references}

**TutorialsPoint**

- [Application Layer](https://www.tutorialspoint.com/data_communication_computer_network/application_layer_introduction.htm), [Client-Server Model](https://www.tutorialspoint.com/data_communication_computer_network/client_server_model.htm), [Application Protocols](https://www.tutorialspoint.com/data_communication_computer_network/application_protocols.htm), [Network Services](https://www.tutorialspoint.com/data_communication_computer_network/network_services.htm), [HTTP](https://www.tutorialspoint.com/data_communication_computer_network/computer_network_http.htm), [File Transfer Protocol](https://www.tutorialspoint.com/data_communication_computer_network/file_transfer_protocol.htm) and [E-Mail Format](https://www.tutorialspoint.com/data_communication_computer_network/e_mail_format.htm) — accessed 2026-11-06 (functions of the application layer; DNS on UDP port 53; SMTP on ports 25 and 587; POP3 on port 110 and its delete and keep modes; FTP control and data connections and its stream, block and compressed modes; RFC 822 header fields). Issues: the *Application Protocols* page reverses the FTP ports ("port 20 for exchanging controlling information and the actual data is sent over TCP port 21"); its own FTP page gives the correct ports (control 21, data 20). The HTTP page calls HTTP "connectionless"; HTTP runs over a TCP connection and is **stateless**. The e-mail page writes "Return Patch" for Return-Path.

**GeeksforGeeks**

- [HTTP Full Form](https://www.geeksforgeeks.org/computer-networks/http-full-form/) and [HTTP Non-Persistent & Persistent Connection](https://www.geeksforgeeks.org/computer-networks/http-non-persistent-persistent-connection/) — accessed 2026-11-06 (HTTP over TCP port 80, stateless; 2 RTT per object; persistent with and without pipelining). It says a non-pipelined persistent connection takes "two RTTs" to establish; it takes one RTT for the TCP connection and one RTT for the base file.
- [File Transfer Protocol (FTP) in Application Layer](https://www.geeksforgeeks.org/computer-networks/file-transfer-protocol-ftp-in-application-layer/) — accessed 2026-11-06 (control port 21, data port 20, out-of-band control, active and passive modes, data types, commands and replies, anonymous FTP)
- [Simple Mail Transfer Protocol (SMTP)](https://www.geeksforgeeks.org/computer-networks/simple-mail-transfer-protocol-smtp/) and [Differences between POP3 and IMAP](https://www.geeksforgeeks.org/computer-networks/differences-between-pop3-and-imap/) — accessed 2026-11-06. Its IMAP section says that after messages are downloaded "they are immediately deleted from the email service"; that describes POP3 in its default mode, not IMAP, which keeps mail on the server.
- [Domain Name System (DNS)](https://www.geeksforgeeks.org/computer-networks/domain-name-system-dns-in-application-layer/), [Working of DNS Server](https://www.geeksforgeeks.org/computer-networks/working-of-domain-name-system-dns-server/), [Client-Server Model](https://www.geeksforgeeks.org/computer-networks/client-server-model/) and [P2P File Sharing](https://www.geeksforgeeks.org/computer-networks/p2p-peer-to-peer-file-sharing/) — accessed 2026-11-06 (resolution steps, root, TLD and authoritative servers, generic, country and reverse domains, record types; client-server and P2P)

**TpointTech**

- [Principles of Network Applications](https://www.tpointtech.com/principles-of-network-applications), [Application Layer](https://www.tpointtech.com/computer-network-application-layer) and [Client and Server Model](https://www.tpointtech.com/computer-network-client-and-server-model) — accessed 2026-11-06 (application architectures, processes communicating, transport services available to applications). The *Principles* page also lists three-tier and microservices architectures, which are software-design architectures rather than the client-server and P2P application architectures of networking; it also says the link layer determines "the best route" for data, which is the job of the network layer.
- [HTTP](https://www.tpointtech.com/computer-network-http), [HTTP Status Codes](https://www.tpointtech.com/http-status-codes) and [HTTP vs HTTPS](https://www.tpointtech.com/http-vs-https) — accessed 2026-11-06 (cookies, HTTP versions, status-code classes, ports 80 and 443). It also calls HTTP "connectionless" (see above).
- [FTP](https://www.tpointtech.com/computer-network-ftp), [SMTP](https://www.tpointtech.com/simple-mail-transfer-protocol), [POP Protocol](https://www.tpointtech.com/pop-protocol), [IMAP Protocol](https://www.tpointtech.com/imap-protocol), [IMAP vs POP3](https://www.tpointtech.com/imap-vs-pop3), [MIME Protocol](https://www.tpointtech.com/mime-protocol) and [DNS](https://www.tpointtech.com/computer-network-dns) — accessed 2026-11-06 (user agent and mail transfer agent, SMTP on port 25, MIME headers, generic and country domains, inverse domain, resolution steps)

**Programiz**

- Programiz has no page on the application layer (checked 2026-11-06).

**Additional source** (used for the principles of network applications — sockets, the four transport-service needs, elastic and loss-tolerant applications — the HTTP response-time calculations, the four parts of cookies, conditional GET, the three phases of POP3, the services of DNS and the resource-record format)

- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, chapter 2 (sections 2.1–2.4). All response-time calculations above were checked by script.
