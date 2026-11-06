# SOFTWARE ENGINEERING

Master topic list for the **Software Engineering** section of the website (`/software-engineering`): a hands-on, interview-focused path through professional software development, from HTML to cloud deployment and agentic software development with AI.

This section is separate from the Topics section. The Topics section explains theory for government IT examinations (for example, the SDLC models, normalization and the OSI model). This section teaches the **practical skills** a working developer uses and is asked about in job interviews. When a subject needs theory that the Topics section already covers, link to it instead of repeating it.

- Each **category** maps to a folder under `content-software-engineering/` (folder name shown next to the category heading).
- Each **topic** is one page: `content-software-engineering/<category>/<slug>/en.md`. The notes are in **English only**; there is no Bengali version for this section.
- Each **subtopic** is one section of the page. Subtopic titles must not contain " — " or backticks.
- After any change to this file, run `npm run se:sync`, which writes `content-software-engineering/<category>/category.json`.

## How Topics Are Written

Every topic is **practical**: little theory, a lot of working code, and the questions interviewers ask.

Each subtopic (`##` section) contains, in this order:

1. **Concept:** a short definition (shown in a definition box) and the explanation needed to use it. No history or background that is not needed in practice.
2. **Hands-on:** runnable code, commands or configuration, built up step by step, with the **real output** shown. Every program and command is run before it is published.
3. **Common mistakes:** the errors beginners make and how to avoid or fix them.
4. **Interview questions:** the questions interviewers commonly ask on the subtopic, each with a short model answer. Include practical "what happens if…" and "how would you debug…" questions, not only definitions.

After the subtopics, each topic ends with:

- `## Practice {#practice}`: one or more small, concrete tasks or a mini-project that uses the whole topic, with clear acceptance criteria.
- `## References {#references}`: the sources used.

**Sources.** Prefer the official documentation of each technology (for example MDN Web Docs, web.dev, react.dev, the Next.js, TypeScript, Python, Django, Django REST Framework, FastAPI, Node.js, NestJS, Go, PostgreSQL, Git, Docker, Kubernetes and GitHub documentation, the OWASP project and the AI providers' documentation). Use the reference websites in `REFERENCES.md` (GeeksforGeeks, TutorialsPoint, TpointTech, Programiz) to check interview-oriented coverage. Version-specific facts (commands, APIs, defaults) must be checked against the current official documentation, and the version used must be stated.

## Topic Status

| Status         | Meaning                                  |
| -------------- | ---------------------------------------- |
| `Not started`  | No notes written yet.                    |
| `In progress`  | Research or writing has started.         |
| `Done`         | The notes are published.                 |

## Shared Subjects

Some subjects are needed in several places. Write the full explanation once, in the **main home**, and link to it from the other places.

| Subject                          | Main home                                  | Other places (link to the main home)                    |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| HTTP methods and status codes    | 1.2 HTTP and HTTPS                         | 14.1 REST API Design (API-design angle only)            |
| Cookies and sessions             | 1.2 HTTP and HTTPS                         | 19.2 Authentication Security (security attributes)      |
| CORS and same-origin policy      | 19.4 Browser and Transport Security        | 4.6 Browser and Web APIs; 14.3 API Integration          |
| Command line basics              | 1.3 Command Line Basics                    | 21.1 Linux for Developers (server administration angle) |
| DNS and domains                  | 1.1 How the Web Works                      | 21.3 Web Servers, Reverse Proxies and Domains           |
| API versioning and documentation | 14.1 REST API Design                       | 8.1 Backend Architecture                                |
| Backups and restore              | 15.4 Database Technologies and ORMs        | 22.4 Deployment                                         |
| N+1 query problem                | 15.3 Indexes, Transactions and Performance | 10.2 Django Models and ORM; 20.2 Backend Performance    |
| Testing tools per language       | 18.2 Frontend Testing; 18.3 Backend Testing | Each language and framework topic (link only)          |
| Caching                          | 15.5 NoSQL and Caching                     | 17.1 System Design Fundamentals; 20.2 Backend Performance |

## Suggested Learning Order

1. Web fundamentals → HTML → CSS → JavaScript
2. Git and developer tools → TypeScript
3. React → frontend architecture → Next.js
4. Backend fundamentals → one language and framework in depth (Python with Django or FastAPI, Node.js with NestJS, or Go)
5. SQL → PostgreSQL → data modeling → caching
6. API design → authentication → frontend and backend integration
7. Software design → system design → testing → security
8. Linux and networking → Docker → CI/CD → cloud deployment
9. AI-assisted and agentic development → building AI features
10. Portfolio projects → interview preparation

Choose one primary frontend stack and one primary backend stack and learn them deeply; study the other languages and frameworks for comparison and when a project needs them.

---

## 1. Web Fundamentals — `web-fundamentals`

### 1.1 How the Web Works

**Slug:** `how-the-web-works` · **Status:** Not started

- Client-Server Architecture
- IP Addresses, Ports, Domains and DNS
- What Happens When You Type a URL
- What a Web Server Does
- Static vs Dynamic Websites
- Frontend vs Backend

### 1.2 HTTP and HTTPS

**Slug:** `http-and-https` · **Status:** Not started

- HTTP and HTTPS
- Request and Response Lifecycle
- HTTP Methods
- HTTP Status Codes
- Headers, Query Parameters, Path Parameters and Request Bodies
- Cookies and Sessions
- HTTP Caching Headers
- HTTP/1.1, HTTP/2 and HTTP/3

### 1.3 Command Line Basics

**Slug:** `command-line-basics` · **Status:** Not started

- Terminal and Shell
- Navigating the File System
- Working with Files and Directories
- Pipes and Redirection
- Environment Variables and PATH
- Running Programs and Scripts

## 2. HTML — `html`

### 2.1 HTML Documents and Elements

**Slug:** `html-documents-and-elements` · **Status:** Not started

- HTML Document Structure
- Elements, Tags and Attributes
- Headings, Paragraphs, Links and Images
- Lists: Ordered, Unordered and Description Lists
- Tables
- div and span
- Audio, Video and iframe
- HTML Entities

### 2.2 HTML Forms

**Slug:** `html-forms` · **Status:** Not started

- Forms and Form Controls
- Labels and Grouping
- Input Types
- Validation Attributes
- Form Submission: GET vs POST

### 2.3 Semantic and Accessible HTML

**Slug:** `semantic-and-accessible-html` · **Status:** Not started

- Semantic HTML
- Accessibility Fundamentals and ARIA
- Meta Tags and Page Metadata
- Favicon and Document Title
- SEO-Friendly HTML Structure

## 3. CSS — `css`

### 3.1 CSS Basics and the Cascade

**Slug:** `css-basics-and-the-cascade` · **Status:** Not started

- Ways to Add CSS: Inline, Internal and External
- Selectors and Combinators
- Specificity and the Cascade
- Inheritance
- Colors, Backgrounds and Gradients
- Units: px, %, em, rem, vw and vh
- Typography and Web Fonts
- Pseudo-Classes and Pseudo-Elements
- CSS Variables (Custom Properties)

### 3.2 Box Model and Positioning

**Slug:** `box-model-and-positioning` · **Status:** Not started

- Box Model
- Width, Height, Margin, Padding and Border
- Display Property and Normal Flow
- Positioning: Static, Relative, Absolute, Fixed and Sticky
- Overflow, Stacking Context and z-index
- Borders, Shadows and Outlines

### 3.3 Flexbox and Grid

**Slug:** `flexbox-and-grid` · **Status:** Not started

- Flexbox
- CSS Grid
- Flexbox vs Grid
- Common Layout Patterns
- CSS Functions: calc(), min(), max() and clamp()

### 3.4 Responsive Design

**Slug:** `responsive-design` · **Status:** Not started

- Responsive Design Principles
- Media Queries
- Mobile-First Design
- Responsive Images
- Container Queries

### 3.5 Transitions and Animations

**Slug:** `transitions-and-animations` · **Status:** Not started

- Transitions
- Transforms
- Keyframe Animations
- Reduced Motion and Animation Performance

### 3.6 CSS Architecture and Tailwind CSS

**Slug:** `css-architecture-and-tailwind` · **Status:** Not started

- CSS Architecture and Reusable Styles
- BEM Naming Convention
- CSS Modules
- Sass and SCSS Fundamentals
- Utility-First CSS and Tailwind CSS
- Cross-Browser Compatibility

## 4. JavaScript — `javascript`

### 4.1 JavaScript Basics

**Slug:** `javascript-basics` · **Status:** Not started

- JavaScript Runtimes: Browser and Node.js
- Variables: var, let and const
- Data Types and Type Conversion
- Primitive vs Reference Values
- Operators and Equality
- Conditions and Switch Statements
- Loops
- Functions, Parameters and Return Values

### 4.2 Arrays, Objects and Modern Syntax

**Slug:** `arrays-objects-and-modern-syntax` · **Status:** Not started

- Arrays and Array Methods
- Objects and Object Methods
- Destructuring
- Spread and Rest Syntax
- Template Literals
- Optional Chaining and Nullish Coalescing
- Modules: import and export
- JSON
- Regular Expressions
- Dates and Times

### 4.3 Scope, Closures and Objects in Depth

**Slug:** `scope-closures-and-objects` · **Status:** Not started

- Execution Context and the Call Stack
- Scope and Lexical Scope
- Hoisting and the Temporal Dead Zone
- Closures
- The this Keyword
- Prototypes and Inheritance
- Classes and Constructors

### 4.4 Asynchronous JavaScript

**Slug:** `asynchronous-javascript` · **Status:** Not started

- Synchronous vs Asynchronous Execution
- The Event Loop, Tasks and Microtasks
- Callbacks
- Promises
- async and await
- Error Handling: try, catch and finally
- Fetch API

### 4.5 DOM and Events

**Slug:** `dom-and-events` · **Status:** Not started

- DOM Tree and DOM Manipulation
- Event Handling
- Event Bubbling, Capturing and Delegation
- Form Handling and Validation
- Browser Storage: localStorage, sessionStorage and Cookies

### 4.6 Browser and Web APIs

**Slug:** `browser-and-web-apis` · **Status:** Not started

- Browser Rendering Basics
- DOM and BOM
- File API and File Uploads
- Clipboard API
- Geolocation API
- WebSockets in the Browser

## 5. Developer Tools and Git — `developer-tools-and-git`

### 5.1 Browser Developer Tools

**Slug:** `browser-developer-tools` · **Status:** Not started

- Inspecting Elements and Styles
- Console
- Debugging JavaScript with Breakpoints
- Network Tab and Request Inspection
- Performance and Lighthouse

### 5.2 Package Managers

**Slug:** `package-managers` · **Status:** Not started

- npm, pnpm and yarn
- package.json and Scripts
- Dependencies and devDependencies
- Semantic Version Ranges
- Lock Files

### 5.3 Git Fundamentals

**Slug:** `git-fundamentals` · **Status:** Not started

- Repository, Working Tree, Staging Area and Commits
- init, clone, status, add, commit and log
- .gitignore
- Remotes: push, fetch and pull
- Undoing Changes: restore, revert and reset
- Writing Good Commit Messages

### 5.4 Branching, Merging and Rebasing

**Slug:** `branching-merging-and-rebasing` · **Status:** Not started

- Branches
- Merging and Merge Conflicts
- Rebasing
- stash and cherry-pick
- Git Workflows: Feature Branches and Trunk-Based Development

### 5.5 Collaboration on GitHub

**Slug:** `collaboration-on-github` · **Status:** Not started

- GitHub Repository Management
- Pull Requests
- Code Reviews on Pull Requests
- Issues and Project Boards
- README and Project Documentation

## 6. TypeScript — `typescript`

### 6.1 TypeScript Basics

**Slug:** `typescript-basics` · **Status:** Not started

- Why TypeScript
- Type Annotations and Type Inference
- Primitive, Array and Tuple Types
- Object Types
- Type Aliases and Interfaces
- Function Types
- Optional and Readonly Properties
- any, unknown, never and void

### 6.2 Advanced Types

**Slug:** `advanced-types` · **Status:** Not started

- Union and Intersection Types
- Literal Types
- Enums and Alternatives to Enums
- Type Narrowing and Type Guards
- Generics
- Utility Types

### 6.3 TypeScript in Projects

**Slug:** `typescript-in-projects` · **Status:** Not started

- tsconfig.json and Strict Mode
- Typing Asynchronous Functions
- Typing and Validating API Responses
- Declaration Files
- TypeScript with React
- TypeScript with Node.js
- Migrating a JavaScript Project to TypeScript

## 7. React and Next.js — `react`

### 7.1 React Fundamentals

**Slug:** `react-fundamentals` · **Status:** Not started

- Why Component-Based UI Development
- React Project Setup
- JSX
- Function Components and Props
- State
- Event Handling
- Conditional Rendering
- Rendering Lists and Keys
- Component Composition and Lifting State Up
- Thinking in Components

### 7.2 React Hooks

**Slug:** `react-hooks` · **Status:** Not started

- useState
- useEffect, Cleanup and Dependency Arrays
- useRef
- useMemo and useCallback
- useContext
- Custom Hooks
- Rules of Hooks
- Avoiding Unnecessary Effects

### 7.3 State Management and Data Fetching

**Slug:** `state-management-and-data-fetching` · **Status:** Not started

- State Management Concepts
- Context API
- Redux Toolkit
- Server State vs Client State
- Data Fetching and Caching
- TanStack Query and RTK Query

### 7.4 Routing, Forms and Application Architecture

**Slug:** `routing-forms-and-architecture` · **Status:** Not started

- Component Design and Folder Structure
- Routing with React Router
- Protected Routes and Authentication Flows
- Forms with React Hook Form
- Schema Validation with Zod
- Tables, Pagination, Sorting and Filtering
- File Upload UI
- Error Boundaries
- Lazy Loading and Code Splitting
- Environment Variables in Frontend Apps
- Component Libraries, Design Systems and Storybook

### 7.5 Next.js and Rendering Strategies

**Slug:** `nextjs-and-rendering` · **Status:** Not started

- Rendering Strategies: CSR, SSR, SSG and ISR
- Hydration
- Next.js Fundamentals
- App Router, Pages and Layouts
- Server and Client Components
- Data Fetching and Route Handlers
- Caching and Revalidation
- Metadata and SEO
- Middleware

### 7.6 Frontend Quality

**Slug:** `frontend-quality` · **Status:** Not started

- Accessibility and Keyboard Navigation
- Responsive UI Implementation
- Loading and Error States
- Internationalization (i18n)
- Frontend Security Basics
- Cross-Browser Testing

## 8. Backend Fundamentals — `backend-fundamentals`

### 8.1 Backend Architecture and Request Lifecycle

**Slug:** `backend-architecture` · **Status:** Not started

- Backend Responsibilities
- Runtimes and Frameworks
- Request Lifecycle
- Routing, Controllers and Handlers
- Middleware
- Business Logic and Service Layers
- Data Access Layer and Repositories

### 8.2 Configuration, Validation, Logging and Errors

**Slug:** `configuration-validation-logging-errors` · **Status:** Not started

- Configuration Management
- Environment Variables and Secrets
- Input Validation
- Error Handling
- Logging

### 8.3 Common Backend Features

**Slug:** `common-backend-features` · **Status:** Not started

- Pagination, Sorting, Filtering and Searching
- File Uploads and Object Storage
- Sending Email
- Background Jobs and Task Queues
- Scheduled Jobs

### 8.4 Choosing a Backend Language and Framework

**Slug:** `choosing-a-backend-stack` · **Status:** Not started

- Python, JavaScript (Node.js) and Go Compared
- Django, FastAPI and NestJS Compared
- Choosing a Stack Based on Project Requirements

## 9. Python — `python`

### 9.1 Python Foundations

**Slug:** `python-foundations` · **Status:** Not started

- Python Syntax and Indentation
- Variables and Built-in Data Types
- Conditions and Loops
- Functions and Arguments
- Lists, Tuples, Sets and Dictionaries
- Comprehensions
- Strings and String Formatting
- Exceptions
- File Handling

### 9.2 Python in Depth

**Slug:** `python-in-depth` · **Status:** Not started

- Object-Oriented Programming in Python
- Iterators and Generators
- Decorators
- Context Managers
- Type Hints
- Asynchronous Python with asyncio
- Mutable Default Arguments and Other Common Pitfalls

### 9.3 Python Projects and Tooling

**Slug:** `python-projects-and-tooling` · **Status:** Not started

- Modules and Packages
- Virtual Environments
- Package Management: pip, pyproject.toml and uv
- Python Project Structure
- Linting and Formatting

## 10. Django and Django REST Framework — `django`

### 10.1 Django Fundamentals

**Slug:** `django-fundamentals` · **Status:** Not started

- Django Project vs App
- manage.py and Settings
- URL Routing
- Views and Request and Response Objects
- Templates and Template Inheritance
- Static and Media Files
- Class-Based Views

### 10.2 Django Models and ORM

**Slug:** `django-models-and-orm` · **Status:** Not started

- Models and Fields
- Relationships
- Migrations
- QuerySets and Lookups
- select_related and prefetch_related
- Aggregation and Annotation
- Django Admin

### 10.3 Forms, Authentication and Middleware

**Slug:** `django-forms-auth-middleware` · **Status:** Not started

- Forms and ModelForms
- Validation
- Authentication and Authorization
- Groups and Permissions
- Sessions and Messages
- Middleware
- Signals

### 10.4 Django REST Framework

**Slug:** `django-rest-framework` · **Status:** Not started

- Serializers and ModelSerializers
- API Views and Generic Views
- ViewSets and Routers
- Authentication: Session, Token and JWT
- Permissions
- Throttling
- Filtering, Searching, Ordering and Pagination
- Nested Serializers and Relationships
- Exception Handling
- OpenAPI Documentation

### 10.5 Django in Production

**Slug:** `django-in-production` · **Status:** Not started

- Settings for Development and Production
- Caching
- File Uploads and Storage
- Background Tasks with Celery
- WSGI and ASGI
- Deployment Checklist

## 11. FastAPI — `fastapi`

### 11.1 FastAPI Fundamentals

**Slug:** `fastapi-fundamentals` · **Status:** Not started

- Path Operations and Routing
- Path and Query Parameters
- Request Bodies with Pydantic Models
- Response Models and Status Codes
- Validation and Error Handling
- Dependency Injection
- Async Endpoints
- Automatic API Documentation

### 11.2 FastAPI Applications

**Slug:** `fastapi-applications` · **Status:** Not started

- Project Structure and APIRouter
- Databases with SQLAlchemy
- Migrations with Alembic
- Authentication with OAuth2 and JWT
- Middleware and CORS
- Background Tasks
- Settings Management
- Running with Uvicorn in Production

## 12. Node.js and NestJS — `nodejs`

### 12.1 Node.js Fundamentals

**Slug:** `nodejs-fundamentals` · **Status:** Not started

- Node.js Runtime and the Event Loop
- CommonJS and ES Modules
- The File System Module
- Streams and Buffers
- The HTTP Module
- Express.js Basics
- Error Handling in Node.js

### 12.2 NestJS Fundamentals

**Slug:** `nestjs-fundamentals` · **Status:** Not started

- NestJS Architecture
- Modules
- Controllers
- Providers and Dependency Injection
- Pipes and Validation with DTOs
- Guards
- Interceptors
- Exception Filters

### 12.3 NestJS Applications

**Slug:** `nestjs-applications` · **Status:** Not started

- Configuration Module
- Databases with Prisma or TypeORM
- Authentication with JWT and Passport
- Role-Based Authorization
- OpenAPI Documentation with Swagger
- Testing NestJS Applications

## 13. Go — `golang`

### 13.1 Go Foundations

**Slug:** `go-foundations` · **Status:** Not started

- Go Syntax, Packages and Modules
- Variables, Types and Constants
- Control Flow
- Functions and Multiple Return Values
- Arrays, Slices and Maps
- Structs and Methods
- Pointers
- Interfaces
- Error Handling

### 13.2 Concurrency in Go

**Slug:** `concurrency-in-go` · **Status:** Not started

- Goroutines
- Channels
- select
- sync Package: WaitGroup and Mutex
- context Package
- Common Concurrency Patterns

### 13.3 Web Services in Go

**Slug:** `web-services-in-go` · **Status:** Not started

- HTTP Servers with net/http
- Routing and Middleware
- JSON Encoding and Decoding
- Databases with database/sql
- Configuration and Graceful Shutdown
- Testing Go Code

## 14. API Design and Integration — `api-design`

### 14.1 REST API Design

**Slug:** `rest-api-design` · **Status:** Not started

- What an API Is
- REST Constraints and Resource Design
- RESTful URL Conventions
- Methods and Status Codes in API Design
- Request and Response Formats
- Pagination Strategies
- Filtering, Sorting and Searching
- Validation Error Formats
- Idempotency
- API Versioning
- OpenAPI Specification and API Documentation

### 14.2 API Authentication and Authorization

**Slug:** `api-authentication-and-authorization` · **Status:** Not started

- Authentication vs Authorization
- Session-Based vs Token-Based Authentication
- JWT Structure and Lifecycle
- Access and Refresh Token Flow
- OAuth 2.0 and OpenID Connect
- API Keys
- Role-Based and Permission-Based Access Control

### 14.3 API Integration and Real-Time Communication

**Slug:** `api-integration-and-real-time` · **Status:** Not started

- Consuming Third-Party APIs
- Timeouts, Retries and Error Handling
- Rate Limiting
- Webhooks
- WebSockets and Server-Sent Events
- GraphQL Overview
- gRPC Overview
- Postman and API Clients

## 15. Databases — `databases`

### 15.1 Relational Data Modeling

**Slug:** `relational-data-modeling` · **Status:** Not started

- Tables, Rows, Columns and Constraints
- Primary and Foreign Keys
- Relationships: One-to-One, One-to-Many and Many-to-Many
- ER Diagrams
- Normalization in Practice
- Designing a Schema for an Application

### 15.2 SQL Hands-On

**Slug:** `sql-hands-on` · **Status:** Not started

- SELECT, INSERT, UPDATE and DELETE
- WHERE, ORDER BY and LIMIT
- Aggregate Functions, GROUP BY and HAVING
- JOINs
- Subqueries and CTEs
- Window Functions
- Views
- Stored Procedures and Functions

### 15.3 Indexes, Transactions and Performance

**Slug:** `indexes-transactions-and-performance` · **Status:** Not started

- Indexes
- Query Plans with EXPLAIN
- Transactions and ACID
- Isolation Levels and Locking
- N+1 Query Problem
- Connection Pooling

### 15.4 Database Technologies and ORMs

**Slug:** `database-technologies-and-orms` · **Status:** Not started

- PostgreSQL, MySQL and SQLite
- Choosing a Database for an Application
- ORM Concepts
- SQLAlchemy, Prisma and Other ORMs
- Database Migrations
- Backups and Restore

### 15.5 NoSQL and Caching

**Slug:** `nosql-and-caching` · **Status:** Not started

- Relational vs NoSQL Databases
- Document Databases and MongoDB
- Redis Fundamentals
- Caching Patterns: Cache-Aside, Write-Through and Write-Behind
- Cache Invalidation and Expiry
- When Not to Cache

## 16. Software Design and Architecture — `software-design`

### 16.1 Programming Paradigms and OOP in Practice

**Slug:** `paradigms-and-oop` · **Status:** Not started

- Procedural, Object-Oriented and Functional Programming
- Encapsulation, Inheritance, Abstraction and Polymorphism
- Composition over Inheritance

### 16.2 Clean Code and Design Principles

**Slug:** `clean-code-and-principles` · **Status:** Not started

- SOLID Principles
- DRY, KISS and YAGNI
- Separation of Concerns
- Cohesion and Coupling
- Clean Code and Naming
- Code Smells and Refactoring

### 16.3 Design Patterns

**Slug:** `design-patterns` · **Status:** Not started

- Factory
- Singleton
- Strategy
- Adapter
- Observer
- Decorator
- Repository
- Dependency Injection

### 16.4 Application Architecture

**Slug:** `application-architecture` · **Status:** Not started

- Layered Architecture
- MVC and Related Patterns
- Modular Monolith
- Microservices
- Monolith vs Microservices
- Domain-Driven Design Overview
- Event-Driven Architecture
- Message Queues and Brokers

## 17. System Design — `system-design`

### 17.1 System Design Fundamentals

**Slug:** `system-design-fundamentals` · **Status:** Not started

- Scalability: Vertical and Horizontal Scaling
- Availability, Reliability and Fault Tolerance
- Latency and Throughput
- Load Balancing
- Caching and CDNs in System Design
- Database Replication
- Sharding and Partitioning
- CAP Theorem and Consistency Models
- Queues and Asynchronous Processing

### 17.2 System Design Interview Practice

**Slug:** `system-design-interviews` · **Status:** Not started

- How to Approach a System Design Interview
- Back-of-the-Envelope Estimation
- Design a URL Shortener
- Design a Rate Limiter
- Design a Chat System
- Design a News Feed
- Design a Notification System
- Design a File Storage Service

## 18. Testing and Debugging — `testing`

### 18.1 Testing Fundamentals

**Slug:** `testing-fundamentals` · **Status:** Not started

- Why Testing Matters
- Test Pyramid
- Unit, Integration and End-to-End Tests
- Regression and Smoke Testing
- Manual vs Automated Testing
- Test Cases and Test Plans
- Arrange-Act-Assert
- Mocks, Stubs and Fakes
- Code Coverage and Its Limits
- Test-Driven Development

### 18.2 Frontend Testing

**Slug:** `frontend-testing` · **Status:** Not started

- Unit Testing with Vitest or Jest
- Component Testing with Testing Library
- Browser Testing with Playwright
- Mocking API Calls

### 18.3 Backend Testing

**Slug:** `backend-testing` · **Status:** Not started

- Testing Python with pytest
- Testing Django and DRF APIs
- Testing FastAPI Applications
- Testing NestJS Applications with Jest
- Testing Go Code with the testing Package
- Test Databases and Fixtures
- Running Tests in CI

### 18.4 Debugging

**Slug:** `debugging` · **Status:** Not started

- A Systematic Debugging Process
- Using Debuggers
- Reading Stack Traces and Logs
- Debugging Unfamiliar Codebases
- Root-Cause Analysis

## 19. Application Security — `security`

### 19.1 Security Fundamentals for Developers

**Slug:** `security-fundamentals` · **Status:** Not started

- Threat Modeling
- OWASP Top 10
- Least Privilege and Access Control
- Secrets Management
- Dependency Vulnerability Scanning
- Logging Without Exposing Sensitive Data

### 19.2 Authentication Security

**Slug:** `authentication-security` · **Status:** Not started

- Password Hashing and Salting
- Session Security
- Secure Cookie Attributes
- Multi-Factor Authentication
- Account Recovery and Brute-Force Protection

### 19.3 Common Web Vulnerabilities

**Slug:** `web-vulnerabilities` · **Status:** Not started

- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- SQL Injection
- Command Injection
- Server-Side Request Forgery (SSRF)
- Broken Access Control and IDOR
- File Upload Security
- Input Validation and Output Encoding

### 19.4 Browser and Transport Security

**Slug:** `browser-and-transport-security` · **Status:** Not started

- HTTPS and TLS Basics
- Same-Origin Policy and CORS
- Content Security Policy
- Security Headers

## 20. Performance and Observability — `performance`

### 20.1 Frontend Performance

**Slug:** `frontend-performance` · **Status:** Not started

- Measuring Before Optimizing
- Core Web Vitals
- Critical Rendering Path
- Lazy Loading and Code Splitting
- Image and Font Optimization
- Bundle Analysis
- Compression and Browser Caching

### 20.2 Backend Performance and Reliability

**Slug:** `backend-performance-and-reliability` · **Status:** Not started

- Database Query Profiling
- Caching at Application and Database Layers
- Background Processing
- Timeouts, Retries and Circuit Breakers
- Health Checks
- Graceful Shutdown
- Load and Stress Testing
- CPU and Memory Profiling

### 20.3 Observability

**Slug:** `observability` · **Status:** Not started

- Structured Logging
- Metrics
- Distributed Tracing and OpenTelemetry
- Monitoring and Alerting
- Error Tracking

## 21. Linux, Networking and Servers — `linux-and-servers`

### 21.1 Linux for Developers

**Slug:** `linux-for-developers` · **Status:** Not started

- Linux File System Structure
- File and Directory Commands
- Users, Groups and Permissions
- Processes and Services
- Package Management
- Disk, Memory and CPU Monitoring
- Logs and Log Rotation
- Shell Scripting Basics

### 21.2 Networking for Developers

**Slug:** `networking-for-developers` · **Status:** Not started

- IP Addresses and Subnet Basics
- Ports and Sockets
- DNS Lookup
- Networking Commands: ping, curl, dig, ss and traceroute
- Firewalls
- SSH and Key-Based Authentication

### 21.3 Web Servers, Reverse Proxies and Domains

**Slug:** `web-servers-and-reverse-proxies` · **Status:** Not started

- Nginx Fundamentals
- Reverse Proxy Configuration
- Application Servers: Gunicorn, Uvicorn and PM2
- Process Managers and systemd Services
- Domain and DNS Configuration
- TLS Certificates with Let's Encrypt

## 22. Containers, CI/CD and Cloud Deployment — `devops-and-cloud`

### 22.1 Docker

**Slug:** `docker` · **Status:** Not started

- Why Containers
- Images and Containers
- Dockerfile
- Building and Running Containers
- Ports, Volumes and Environment Variables
- Docker Networks
- Docker Compose
- Multi-Stage Builds
- Persisting Database Data
- Container Logs and Troubleshooting
- Container Security Basics

### 22.2 Kubernetes Fundamentals

**Slug:** `kubernetes-fundamentals` · **Status:** Not started

- Why Kubernetes
- Pods, Deployments and ReplicaSets
- Services and Ingress
- ConfigMaps and Secrets
- Scaling and Rolling Updates
- kubectl Basics

### 22.3 CI/CD

**Slug:** `ci-cd` · **Status:** Not started

- Continuous Integration vs Continuous Delivery and Deployment
- CI/CD Pipeline Stages
- GitHub Actions
- Automated Linting and Tests
- Build Artifacts and Container Registries
- Environments, Secrets and Deployment Approvals

### 22.4 Deployment

**Slug:** `deployment` · **Status:** Not started

- Development, Staging and Production Environments
- Build-Time vs Runtime Configuration
- Database Migrations During Deployment
- Static and Media File Hosting
- Deployment Strategies: Rolling, Blue-Green and Canary
- Rollback Strategy
- Backups and Disaster Recovery

### 22.5 Cloud Fundamentals for Developers

**Slug:** `cloud-fundamentals` · **Status:** Not started

- IaaS, PaaS, SaaS and Serverless
- Virtual Machines
- Object Storage
- Managed Databases
- Load Balancers and CDNs in the Cloud
- IAM and Access Permissions
- AWS, Azure and Google Cloud Equivalents
- Infrastructure as Code with Terraform
- Cost Awareness and Resource Monitoring

### 22.6 Hosting and End-to-End Deployment

**Slug:** `hosting-and-end-to-end-deployment` · **Status:** Not started

- Frontend Hosting Platforms
- Backend Hosting Platforms
- Deploying a Full-Stack Application Step by Step
- Post-Deployment Checklist

## 23. AI-Assisted and Agentic Software Development — `ai-assisted-development`

### 23.1 LLM Fundamentals for Developers

**Slug:** `llm-fundamentals` · **Status:** Not started

- How Large Language Models Work
- Tokens and Context Windows
- Sampling Parameters: Temperature and Others
- Capabilities and Limitations: Hallucination and Knowledge Cutoff
- Choosing a Model: Capability, Latency and Cost
- Embeddings

### 23.2 AI Coding Assistants

**Slug:** `ai-coding-assistants` · **Status:** Not started

- Types of AI Coding Tools: Completion, Chat and Agents
- Claude Code, GitHub Copilot and Cursor
- Prompting for Code
- Giving Project Context: Instruction Files such as CLAUDE.md and AGENTS.md
- Reviewing and Verifying AI-Generated Code
- Privacy, Security and Licensing Concerns

### 23.3 Agentic Development Workflows

**Slug:** `agentic-development-workflows` · **Status:** Not started

- What Makes a Coding Agent Agentic
- Explore, Plan, Implement and Verify
- Breaking Work into Agent-Sized Tasks
- Tests and Type Checks as Guardrails
- Git Workflows with Agents
- Subagents and Parallel Agents
- Permissions, Sandboxing and Hooks
- When Not to Use an Agent

### 23.4 Building LLM-Powered Features

**Slug:** `building-llm-features` · **Status:** Not started

- Calling an LLM API
- System Prompts and Prompt Engineering
- Streaming Responses
- Structured Output with JSON Schemas
- Tool Use and Function Calling
- Prompt Caching, Cost and Latency
- Error Handling and Rate Limits

### 23.5 Retrieval-Augmented Generation (RAG)

**Slug:** `retrieval-augmented-generation` · **Status:** Not started

- Why RAG
- Chunking Documents
- Vector Databases and pgvector
- Retrieval, Hybrid Search and Reranking
- Building a RAG Pipeline
- Evaluating RAG Quality

### 23.6 Building AI Agents

**Slug:** `building-ai-agents` · **Status:** Not started

- The Agent Loop
- Designing Tools for Agents
- Model Context Protocol (MCP)
- Memory and State
- Multi-Agent Orchestration
- Human-in-the-Loop and Guardrails

### 23.7 Evaluating and Securing AI Features

**Slug:** `evaluating-and-securing-ai` · **Status:** Not started

- Evaluations (Evals)
- Prompt Injection
- Data Leakage and Sensitive Information
- Validating Model Output
- Observability for LLM Applications
- Responsible AI Practices

## 24. Professional Practices — `professional-practices`

### 24.1 Working in a Software Team

**Slug:** `working-in-a-team` · **Status:** Not started

- Software Development Lifecycle in Practice
- Requirement Gathering and Clarification
- Breaking Work into Tasks
- Estimation and Prioritization
- Agile and Scrum
- Issue Trackers such as Jira
- Pair Programming
- Communication in Engineering Teams

### 24.2 Code Review and Documentation

**Slug:** `code-review-and-documentation` · **Status:** Not started

- Code Review Practices
- Giving and Receiving Feedback
- Technical Documentation
- Architecture Decision Records

### 24.3 Releases and Maintenance

**Slug:** `releases-and-maintenance` · **Status:** Not started

- Release Management
- Semantic Versioning
- Changelogs
- Technical Debt Management
- Working with Legacy Systems

## 25. Portfolio Projects and Interview Preparation — `projects-and-interviews`

### 25.1 Portfolio Projects

**Slug:** `portfolio-projects` · **Status:** Not started

- Responsive Portfolio Website
- Task Management Application
- REST API with Authentication
- Admin Dashboard
- Full-Stack Application
- AI-Powered Application
- Production Deployment
- What Every Portfolio Project Should Include

### 25.2 Coding Interview Problem Solving

**Slug:** `coding-interview-problem-solving` · **Status:** Not started

- How to Approach a Coding Problem
- Complexity Analysis in Interviews
- Arrays, Strings and Hash Maps
- Two Pointers and Sliding Window
- Stacks and Queues
- Binary Search
- Linked Lists
- Trees and Graphs: BFS and DFS
- Recursion and Backtracking
- Dynamic Programming
- Heaps and Priority Queues

### 25.3 The Technical Interview Process

**Slug:** `technical-interview-process` · **Status:** Not started

- Resume, GitHub and Portfolio
- Take-Home Assignments
- Live Coding Interviews
- Frontend and Backend Technical Rounds
- Behavioral Interviews and the STAR Method
- Questions to Ask the Interviewer
