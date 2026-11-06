---
description: Server-side programming - server-side vs client-side scripting, the HTTP (web) server and HTTP request-response with methods and status codes, the application server and its comparison with a web server, and the MVC (Model-View-Controller) web framework.
updated: 2026-11-04
---

## HTTP Server {#http-server}

### Server-Side Programming

Server-side programming is the writing of programs that **run on the web server** to process requests and generate the responses sent to the browser.

These programs access databases, apply business logic and produce an HTML page or data, instead of running in the user's browser. It is used for dynamic pages, user login, shopping carts, form processing and access to databases.

Common server-side languages and technologies are:

1. **PHP**.
2. **Java** (Servlets, JSP, Spring).
3. **C#** (ASP.NET).
4. **Python** (Django, Flask).
5. **JavaScript** (Node.js with Express).
6. **Ruby** (Ruby on Rails).

#### Client-Side vs Server-Side Scripting

| Basis | Client-side scripting | Server-side scripting |
| --- | --- | --- |
| Runs on | The user's browser | The web server |
| Languages | HTML, CSS, JavaScript | PHP, Java, C#, Python, Node.js, Ruby |
| Access to databases and server files | No | Yes |
| Source code visible to the user | Yes | No (the user sees only the output) |
| Main use | User interface, interactivity, input validation | Business logic, database access, dynamic page generation, authentication |
| Security | Less secure (code can be viewed and changed by the user) | More secure |
| Load | On the user's computer | On the server |

### Definition of HTTP Server (Web Server)

An HTTP server (web server) is software that **stores web content and delivers it to clients (browsers) over HTTP or HTTPS**.

The term also refers to the computer that runs this software. It accepts HTTP requests from browsers and returns HTTP responses containing web pages, images, style sheets, scripts or error messages.

### How an HTTP Server Works

1. The user enters a URL or clicks a link; the browser finds the server's IP address through **DNS** and sends an **HTTP request** (for example, `GET /index.html HTTP/1.1`) to the server, normally on **port 80** (HTTP) or **443** (HTTPS).
2. The web server receives the request and looks for the requested resource.
3. If the request is for a **static** file (HTML, CSS, image), the server reads it from disk and returns it in an **HTTP response** with a status code, such as `HTTP/1.1 200 OK`.
4. If the resource does not exist, it returns an error, such as **404 Not Found**.
5. If the request needs **dynamic** content, the server runs a server-side program (or passes the request to an **application server**), which may query a database and generates the page; the server then returns it to the browser.
6. The browser displays the response.

![Static requests are served by the web server; dynamic requests go on to the application server and the database](/diagrams/software-engineering/web-request-flow.svg)

HTTP is a **stateless** protocol: each request is independent, and the server keeps no memory of earlier requests. Sessions are maintained with **cookies**, session IDs or tokens.

### HTTP Request Methods

1. **GET** — requests (retrieves) a resource; data is sent in the URL; it should not change data on the server.
2. **POST** — sends data to the server in the request body (for example, a form or a file upload), usually to create something.
3. **PUT** — replaces a resource with the data sent.
4. **DELETE** — deletes a resource.
5. **HEAD** — like GET, but returns only the headers, without the body.
6. **OPTIONS** — asks which methods the server supports for a resource.
7. **PATCH** — partially modifies a resource.
8. **CONNECT** and **TRACE** — open a tunnel through a proxy, and echo the request for testing.

#### GET vs POST

| Basis | GET | POST |
| --- | --- | --- |
| Data sent in | The URL (query string) | The request body |
| Visible in the URL | Yes | No |
| Data size | Limited by the URL length | Large data allowed |
| Bookmarked and cached | Can be | Usually not |
| Security for sensitive data | Not suitable (passwords appear in the URL) | More suitable |
| Purpose | Retrieving data | Sending data to be processed or stored |

### HTTP Status Codes

HTTP status codes are of five classes:

1. **1xx — Informational** — the request was received and is being processed (for example, 100 Continue).
2. **2xx — Success** — the request succeeded (for example, **200 OK**, 201 Created).
3. **3xx — Redirection** — the client must go to another address (for example, **301 Moved Permanently**, 302 Found, 304 Not Modified).
4. **4xx — Client error** — the request has an error (for example, 400 Bad Request, 401 Unauthorized, **403 Forbidden**, **404 Not Found**).
5. **5xx — Server error** — the server failed to process a valid request (for example, **500 Internal Server Error**, 503 Service Unavailable).

### Examples of HTTP Servers

1. **Apache HTTP Server** — open source, from the Apache Software Foundation; runs on Linux, UNIX, Windows and macOS; one of the most widely used web servers.
2. **Nginx** — open source, high-performance web server, also used as a reverse proxy and load balancer.
3. **Microsoft IIS (Internet Information Services)** — Microsoft's web server for Windows Server.
4. **LiteSpeed** and **Lighttpd** — fast, lightweight web servers.
5. **Apache Tomcat** — a Java **servlet container** that also acts as a web server for Java web applications.

### Architecture of a Web Server

A web server handles many requests at the same time in one of three ways:

1. **Multi-process** — a parent process creates several child processes, and each child handles requests.
2. **Multi-threaded** — one process creates many threads, and each thread handles a request.
3. **Event-driven (asynchronous)** — a single process (or a few) handles many connections with non-blocking input/output and an event loop (as in Nginx and Node.js).

## Application Server {#application-server}

### Definition of Application Server

An application server is server software that **provides the environment and enterprise services to run server-side business applications**.

Its services include transaction management, security, database connection pooling, messaging, load balancing and fault tolerance, so that developers do not have to program them. It sits in the **middle tier** of a three-tier architecture, between the web server (presentation tier) and the database (data tier), and generates **dynamic content**.

In Java (Jakarta EE), an application server contains both a **web container** (servlet container, which runs servlets and JSP) and an **EJB container** (which runs Enterprise JavaBeans, the business components).

### Services of an Application Server

1. Running business logic (application components).
2. **Transaction management** — keeps database updates consistent.
3. **Database connection pooling** — reuses database connections for speed.
4. **Security** — authentication and authorization.
5. **Messaging** and communication with other systems (HTTP, RMI, RPC, web services).
6. **Clustering, load balancing and fail-over** — for scalability and fault tolerance.

### Examples of Application Servers

1. **JBoss / WildFly** (Red Hat).
2. **Oracle WebLogic Server**.
3. **IBM WebSphere Application Server**.
4. **GlassFish** (Eclipse Foundation).
5. **Microsoft IIS with ASP.NET** (for .NET applications).

### Web Server vs Application Server

| Basis | Web (HTTP) server | Application server |
| --- | --- | --- |
| Main job | Delivers web content over HTTP | Runs business applications and provides enterprise services |
| Content | Mainly static (HTML, CSS, images); dynamic through scripts or by passing requests on | Dynamic content generated by business logic |
| Protocols | HTTP / HTTPS | HTTP and others (RMI, RPC, messaging) |
| Containers (Java) | Web (servlet) container only | Web container and EJB container |
| Enterprise services | Few (no transactions or connection pooling) | Transactions, connection pooling, security, messaging, clustering |
| Resource use | Lower; lightweight | Higher |
| Fault tolerance and scalability | Lower | Higher |
| Typical use | Websites, static content, reverse proxy | Enterprise and business applications |
| Examples | Apache HTTP Server, Nginx, IIS, Tomcat (servlet container) | JBoss/WildFly, WebLogic, WebSphere, GlassFish |

In practice the two are used together: the web server receives all requests, serves static files itself, and passes dynamic requests to the application server.

## MVC Web Framework {#mvc-web-framework}

### Definition of MVC

MVC (Model–View–Controller) is an **architectural pattern that divides an application into three components — model, view and controller** — separating data and logic from the user interface.

An **MVC web framework** is a framework that organizes a web application according to this pattern.

### Components of MVC

1. **Model** — manages the **data and business logic** of the application: it reads and writes the database, applies the business rules and validates the data. It is independent of the user interface.
2. **View** — the **presentation layer**: it displays the data of the model to the user (for example, an HTML page generated from a template). It contains no business logic.
3. **Controller** — receives the **user's request (input)**, decides what to do, calls the model to get or update data, and selects the view that will display the result. It acts as the **link between the model and the view**.

### How an MVC Web Framework Works

1. The user sends a request (for example, clicks a link) from the browser.
2. The request is routed to a **controller**.
3. The controller asks the **model** to fetch or update data (the model may access the database).
4. The model returns the data to the controller.
5. The controller passes the data to a **view**, which produces the HTML page.
6. The page is sent back to the browser as the response.

![MVC request flow: the user's request goes to the controller, which queries the model and passes the data to the view, which returns the response](/diagrams/software-engineering/mvc-flow.svg)

### Examples of MVC Web Frameworks

1. **Spring MVC** (Java) — its **DispatcherServlet** acts as the front controller.
2. **ASP.NET MVC / ASP.NET Core MVC** (C#).
3. **Ruby on Rails** (Ruby).
4. **Laravel** and **CodeIgniter** (PHP).
5. **Django** (Python) — follows the same idea under the name **MTV** (Model–Template–View).
6. **Struts** (Java) — an earlier Java MVC framework.

In Java web applications, MVC is also called **Model 2 architecture**: a **servlet** acts as the controller, **JSP** pages act as the views, and **JavaBeans** act as the model. (In the older **Model 1** architecture, JSP pages handled both requests and presentation, so navigation control was not centralized.)

### Advantages of MVC

1. **Separation of concerns** — data, presentation and control logic are separate, so the code is organized and easy to maintain.
2. **Parallel development** — different developers can work on the model, views and controllers at the same time.
3. **Reusability** — one model can be shown by several views (for example, a web page and a mobile app).
4. **Easier testing** — each component can be tested separately.
5. **Low coupling and easy extension** — a change in one component has little effect on the others.
6. **Scalability** — new features can be added easily.

### Disadvantages of MVC

1. It adds complexity and extra code, which is unnecessary for small applications.
2. It needs more planning and design at the start.
3. It is harder for beginners to learn, and navigating a framework's many files can be difficult.
4. Developers need knowledge of several technologies.

## References {#references}

**TutorialsPoint**

- [Web Servers (Internet Technologies)](https://www.tutorialspoint.com/internet_technologies/web_servers.htm) — accessed 2026-11-04 (definition, working, multi-process and multi-threaded architecture, examples; its description of the multi-threaded approach as "multiple single-threaded processes" is incorrect — it is one process with several threads)
- [HTTP – Methods](https://www.tutorialspoint.com/http/http_methods.htm) — accessed 2026-11-04 (GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE)

**GeeksforGeeks**

- [Difference between Web Server and Application Server](https://www.geeksforgeeks.org/websites-apps/difference-between-web-server-and-application-server/) — accessed 2026-11-04 (definitions, examples, comparison; its table says that application servers do not support multithreading, which is incorrect — application servers are multithreaded — so this row is not used)
- [MVC Design Pattern](https://www.geeksforgeeks.org/system-design/mvc-design-pattern/) — accessed 2026-11-04 (components, flow, advantages and disadvantages)

**TpointTech**

- [Web Server vs Application Server](https://www.tpointtech.com/server-web-vs-application) — accessed 2026-11-04 (web and EJB containers, enterprise services, examples)
- [Model 1 and Model 2 (MVC) Architecture](https://www.tpointtech.com/model-1-and-model-2-mvc-architecture) — accessed 2026-11-04

**IT Job QnS**

- [Software Engineering](https://it.jobqns.com/software-engineering/) — accessed 2026-11-04 (MVC: model, view and controller, advantages and disadvantages)

**Programiz**

- Programiz has no page on web servers, application servers or MVC frameworks (checked 2026-11-04).

**Additional sources** (for the HTTP status code classes, GET vs POST and the event-driven server architecture)

- [MDN Web Docs – HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) — HTTP methods and status codes
- RFC 9110, *HTTP Semantics*, IETF, 2022
