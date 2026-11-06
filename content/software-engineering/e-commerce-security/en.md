---
description: E-commerce security - security requirements, security threats to e-commerce and their countermeasures, encryption (symmetric and asymmetric), digital signatures, SSL/TLS and the TLS handshake, HTTPS, digital certificates and certificate authorities, and SET.
updated: 2026-11-06
---

## Security Threats {#security-threats}

### E-Commerce Security

E-commerce security is the **protection of e-commerce systems and data from unauthorized access, use, alteration or destruction** so that online transactions are safe.

It covers websites, payment systems, databases and the data of customers and businesses. E-commerce sites hold confidential data such as passwords, addresses and card details, so security is essential for customer trust.

### Security Requirements of E-Commerce

E-commerce security has six main requirements (dimensions):

1. **Confidentiality** — only authorized parties can read the information; it must not be read by others while it travels over the network.
2. **Integrity** — the information must not be changed (altered) during transmission or storage.
3. **Availability** — the system and information must be available whenever authorized users need them.
4. **Authenticity (authentication)** — the identity of the user, the website and the parties must be verified before access is given.
5. **Non-repudiation** — neither the sender nor the receiver can later deny having sent or received a message (for example, an order or a payment).
6. **Privacy** — the customer's personal information is used only as agreed, and is protected from misuse.

Other requirements are **authorization** (giving each user only the rights he or she needs) and **auditability** (keeping records so that transactions can be checked later).

### Security Threats to E-Commerce

A security threat is any possible danger that can exploit a weakness of an e-commerce system to steal data or money, damage the system or interrupt its service. The main threats are:

#### Threats to Payments and Accounts

1. **Financial fraud** — criminals use stolen PINs, passwords or card details (often captured by spyware) to make unauthorized purchases or transfers.
2. **Credit and debit card fraud:**
   - **Card skimming** — a hidden device on an ATM or POS card reader copies the card data (card number, name, expiry date, CVV) from the magnetic strip.
   - **POS theft** — a dishonest salesperson copies the card details while processing a payment.
   - Watching (shoulder surfing) the PIN at an ATM.
3. **E-wallet attacks** — breaking into an e-wallet exposes the linked bank and card details.
4. **Payment conflicts** — technical errors in automated payment systems cause double or wrong charges.
5. **Tax evasion** — electronic sales that are not reported are hard for tax authorities to track.

#### Social Engineering Threats

1. **Phishing** — fake e-mails or messages with links to **fake websites** that look like real banks or shops, to steal usernames, passwords and card details.
2. **Vishing and smishing** — the same trick through fake **voice calls** or **SMS**, asking for a PIN, OTP or account details.
3. **Identity theft** — using another person's stolen personal data to shop, borrow or open accounts.

#### Malicious Software (Malware)

1. **Viruses and worms** — damage data and spread to other computers.
2. **Trojan horses** — appear useful but secretly install malicious programs that steal personal and financial data.
3. **Spyware and keyloggers** — record keystrokes to capture passwords and card numbers.
4. **Backdoors** — hidden ways to bypass normal authentication and get into a system.
5. **Ransomware** — encrypts the victim's data and demands payment to unlock it.
6. **Web skimming** — malicious code placed on a shop's checkout page captures what customers type.

#### Attacks on the Website and Network

1. **Denial of service (DoS) and distributed denial of service (DDoS)** — flooding the server with requests (from many computers in DDoS) so that real customers cannot use the site.
2. **SQL injection** — inserting malicious SQL into input fields to read or change the database (for example, customer and card data).
3. **Cross-site scripting (XSS)** — injecting malicious scripts into web pages to steal cookies and sessions of other users.
4. **Man-in-the-middle (MITM) attack and eavesdropping (sniffing)** — secretly intercepting, reading or changing the data exchanged between the customer and the website, for example on public Wi-Fi.
5. **Brute-force attacks** — trying many password combinations until the right one is found.
6. **Malicious bots** — automated programs that scrape prices and data, buy up stock or try stolen passwords.
7. **Hacking and data breaches** — breaking into the servers and stealing customer databases.

#### Other Threats

1. **Insider threats** — employees misusing their access.
2. **Software errors (bugs)** that weaken security.
3. **Repudiation** — a party falsely denying an order or payment.
4. **Direct access attacks** — physical access to a computer to install harmful software or copy data.

### Countermeasures

1. **Encryption with SSL/TLS (HTTPS)** for all data sent between the customer and the site.
2. **Secure payment gateways** that follow **PCI DSS**, with **tokenization** and **3-D Secure / OTP** for card payments.
3. **Strong authentication** — strong passwords, **two-factor authentication (2FA)** and **CAPTCHA** against bots.
4. **Digital certificates** to prove the identity of the website, and **digital signatures** for integrity and non-repudiation.
5. **Firewalls**, intrusion detection and prevention systems, and DDoS protection.
6. **Anti-virus and anti-malware software**, kept up to date.
7. **Secure coding** — input validation and parameterized queries against SQL injection and XSS.
8. **Regular updates, security testing, backups and audit logs.**
9. **User awareness** — never sharing a PIN or OTP, checking for `https://` and the correct web address, and avoiding public Wi-Fi for payments.

## Encryption, SSL/TLS and Digital Certificates {#encryption-ssl-tls-and-digital-certificates}

### Encryption

Encryption is the process of **converting readable data (plaintext) into an unreadable form (ciphertext)** using an algorithm and a key.

Only an authorized person with the correct key can convert it back (**decryption**). It provides **confidentiality** for e-commerce data such as passwords and card numbers.

There are two types of encryption:

1. **Symmetric (secret-key) encryption** — the **same secret key** is used to encrypt and decrypt. It is fast and suitable for large amounts of data, but the key must be shared secretly with the receiver. Examples: **AES**, **DES**, **3DES**, Blowfish and RC4.
2. **Asymmetric (public-key) encryption** — a **pair of keys** is used: a **public key**, which anyone may have, and a **private key**, which only the owner keeps. Data encrypted with the receiver's public key can be decrypted **only with the receiver's private key**. It solves the key-sharing problem but is slower. Examples: **RSA**, **ECC**, **Diffie–Hellman** (key exchange), ElGamal and DSA. Public-key cryptography was introduced by **Diffie and Hellman in 1976**.

![Asymmetric encryption: the sender encrypts the plaintext with the receiver's public key, and the receiver decrypts the ciphertext with its private key](/diagrams/software-engineering/public-key-encryption.svg)

#### Difference Between Symmetric and Asymmetric Encryption

| Basis | Symmetric encryption | Asymmetric encryption |
| --- | --- | --- |
| Keys | One shared secret key | A pair: public key and private key |
| Key used to encrypt / decrypt | The same key | Public key to encrypt, private key to decrypt (or private key to sign, public key to verify) |
| Speed | Fast | Slow |
| Resource use | Low | High |
| Suitable for | Large amounts of data | Small data: keys, signatures |
| Key distribution | Difficult; the key must be sent secretly | Easy; the public key can be published |
| Typical key length | 128 or 256 bits (AES) | 2048 bits or more (RSA) |
| Security services | Confidentiality | Confidentiality, authentication and non-repudiation |
| Examples | AES, DES, 3DES, Blowfish, RC4 | RSA, ECC, Diffie–Hellman, ElGamal, DSA |

In practice both are combined (**hybrid encryption**): asymmetric encryption is used to exchange a symmetric **session key** securely, and the fast symmetric key then encrypts the data. SSL/TLS works this way.

### Digital Signature

A digital signature is an **electronic signature, created with the sender's private key**, that proves the sender's identity and that the message was not changed.

It is computed on a **hash (message digest)** of the message, and the receiver checks it with the **sender's public key**. It proves **who sent** the message (authentication), that the message **was not changed** (integrity), and that the sender **cannot deny** sending it (non-repudiation).

**How it works:**

1. The sender computes a hash of the message.
2. The sender encrypts the hash with his or her **private key** — this is the signature — and sends it with the message.
3. The receiver decrypts the signature with the sender's **public key** to get the original hash.
4. The receiver computes a new hash of the received message and compares the two; if they match, the signature is valid.

### SSL and TLS

SSL (**Secure Sockets Layer**) is a security protocol, developed by **Netscape** in **1995**, that creates an **encrypted and authenticated connection** between a web browser (client) and a web server, so that data sent between them cannot be read or changed by others. TLS (**Transport Layer Security**) is its successor, standardized by the **IETF** in **1999**; all SSL versions are now deprecated, and current websites use TLS, although the name "SSL" is still commonly used (for example, "SSL certificate").

SSL/TLS provides three services:

1. **Encryption (confidentiality)** — data in transit cannot be read by others.
2. **Authentication** — the server (and optionally the client) proves its identity with a digital certificate.
3. **Integrity** — a message authentication code (MAC) detects any change in the data.

#### Versions of SSL and TLS

| Version | Year | Remark |
| --- | --- | --- |
| SSL 1.0 | — | Never released (insecure) |
| SSL 2.0 | 1995 | First public version; deprecated |
| SSL 3.0 | 1996 | Deprecated |
| TLS 1.0 | 1999 | Successor of SSL 3.0; deprecated |
| TLS 1.1 | 2006 | Deprecated |
| TLS 1.2 | 2008 | Widely used |
| TLS 1.3 | 2018 | Current; faster handshake (one round trip), forward secrecy required |

#### Protocols of SSL/TLS

1. **Handshake Protocol** — authenticates the server (and optionally the client), agrees on the algorithms and creates the session keys.
2. **Record Protocol** — breaks data into blocks, compresses them (optional), adds a MAC, encrypts them and sends them.
3. **Change Cipher Spec Protocol** — a one-byte message that tells the other side to start using the agreed keys and algorithms.
4. **Alert Protocol** — reports errors and warnings; a **warning** (level 1) is non-critical, while a **fatal** alert (level 2) ends the connection.

#### SSL/TLS Handshake

1. **ClientHello** — the browser sends the TLS versions and cipher suites it supports and a random number.
2. **ServerHello** — the server chooses the version and cipher suite and sends its own random number.
3. **Certificate** — the server sends its **digital certificate**, which contains its public key.
4. **Authentication** — the browser checks the certificate: that a trusted CA issued it, that it has not expired and that it belongs to this website.
5. **Key exchange** — the browser creates a pre-master secret and sends it encrypted with the server's public key (or both sides use **Diffie–Hellman**).
6. **Session keys** — both sides compute the same **symmetric session key** from the exchanged values.
7. **Finished** — each side sends an encrypted "Finished" message to confirm that the handshake was not tampered with.
8. **Secure communication** — all data is now encrypted with the session key.

![Simplified TLS handshake between the client and the server, ending with data encrypted by the session key](/diagrams/software-engineering/tls-handshake.svg)

#### HTTPS

HTTPS (**HTTP Secure**) is **HTTP running over SSL/TLS**: web pages and form data are sent encrypted. A website that uses it has an address starting with `https://` and shows a padlock in the browser. All e-commerce and banking sites must use HTTPS for logins and payments.

| Basis | HTTP | HTTPS |
| --- | --- | --- |
| Full form | Hypertext Transfer Protocol | Hypertext Transfer Protocol Secure |
| Security | No encryption; data sent as plain text | Encrypted with SSL/TLS |
| Default port | **80** | **443** |
| Certificate | Not needed | SSL/TLS certificate needed |
| URL prefix | `http://` | `https://` |
| Use | Ordinary information pages | Logins, payments, banking, e-commerce |

### Digital Certificate

A digital certificate is an **electronic document, issued by a Certificate Authority, that binds a public key to the identity of its owner**.

The owner can be a website, an organization or a person. It works like an online identity card: it proves that the public key really belongs to the named owner. Digital certificates follow the **X.509** standard.

#### Contents of a Digital Certificate

1. The **owner's name** (subject), such as the website's domain name.
2. The **owner's public key**.
3. The **serial number** of the certificate.
4. The **validity period** (issue date and expiry date).
5. The **name of the issuing CA**.
6. The **CA's digital signature**.

#### Certificate Authority (CA)

A certificate authority (CA) is a **trusted third party that issues, renews and revokes digital certificates** after verifying identities.

Browsers trust a certificate by checking the chain of signatures from the website's certificate, through intermediate certificates, up to a **root CA** whose certificate is built into the browser. Examples of CAs are DigiCert, Sectigo, GlobalSign and Let's Encrypt. A revoked certificate is listed in a **certificate revocation list (CRL)** or reported by **OCSP**.

#### Types of SSL/TLS Certificates

By the level of checking (validation):

1. **Domain Validation (DV)** — only ownership of the domain is checked; quick and cheap.
2. **Organization Validation (OV)** — the organization's identity is also checked.
3. **Extended Validation (EV)** — the strictest checking of the business; the highest level of trust (used by banks and large e-commerce sites).

By the number of domains:

1. **Single-domain certificate** — secures one domain.
2. **Wildcard certificate** — secures a domain and all its subdomains (`*.example.com`).
3. **Multi-domain (SAN) certificate** — secures several different domains.

Other kinds of digital certificates are **client (personal) certificates**, used to identify a person (for example, for signing e-mail), and **code-signing certificates**, which prove that software has not been altered.

### SET (Secure Electronic Transaction)

SET (Secure Electronic Transaction) is a **security protocol developed by Visa and Mastercard (1996) to protect credit card payments** over the Internet.

It uses digital certificates for the cardholder, the merchant and the payment gateway, and it hides the card number from the merchant. Its components are the **cardholder's digital wallet**, the **merchant software**, the **payment gateway server software** and the **certificate authority software**. SET was very secure but complex, because every customer needed special software and a certificate, so it was never widely adopted and has been replaced by SSL/TLS together with 3-D Secure.

**S-HTTP (Secure HTTP)** was another early protocol that added encryption and digital signatures to individual HTTP messages; it was replaced by HTTPS.

## References {#references}

**TutorialsPoint**

- [E-Commerce – Quick Guide](https://www.tutorialspoint.com/e_commerce/e_commerce_quick_guide.htm) — accessed 2026-11-05 (security requirements; encryption, digital signature and security certificates; SSL, S-HTTP and SET). Its separate `e_commerce_security_systems` page returns 404.

**GeeksforGeeks**

- [Different Types of Threat to E-Commerce](https://www.geeksforgeeks.org/computer-networks/different-types-of-threat-to-e-commerce/) — accessed 2026-11-05 (threats and countermeasures)
- [E-commerce and Security Threats to E-commerce](https://www.geeksforgeeks.org/computer-networks/e-commerce-and-security-threats-to-e-commerce/) — accessed 2026-11-05
- [Secure Socket Layer (SSL)](https://www.geeksforgeeks.org/computer-networks/secure-socket-layer-ssl/) — accessed 2026-11-05 (services, record, handshake, change cipher spec and alert protocols, certificate types, versions)
- [What is SSL/TLS Handshake?](https://www.geeksforgeeks.org/computer-networks/what-is-ssl-tls-handshake/) — accessed 2026-11-05
- [What are Digital Certificates?](https://www.geeksforgeeks.org/computer-networks/what-are-digital-certificates/) — accessed 2026-11-05 (contents, types, certificate authority)
- [Symmetric vs Asymmetric Key Encryption](https://www.geeksforgeeks.org/difference-between-symmetric-and-asymmetric-key-encryption/) — accessed 2026-11-05 (comparison table; its row calling symmetric encryption "less secure" is not used, because the security of both depends on key length and use)

**TpointTech**

- [Security Threats to E-Commerce](https://www.tpointtech.com/security-threat-to-e-commerce) — accessed 2026-11-05 (payment fraud, e-cash threats, card fraud, phishing, vishing)
- [SSL vs TLS](https://www.tpointtech.com/ssl-vs-tls) — accessed 2026-11-05 (versions and differences). This page says in one place that TLS was released in 1990; TLS 1.0 was published in 1999, as the page itself states elsewhere and as GeeksforGeeks confirms.
- [HTTP vs HTTPS](https://www.tpointtech.com/http-vs-https) — accessed 2026-11-05 (ports 80 and 443). This page calls HTTPS a transport-layer protocol; HTTPS is HTTP (an application-layer protocol) running over TLS.

**IT Job QnS**

- [Previous Bank IT Question Analysis](https://it.jobqns.com/previous-bank-it-question-analysis-post-wise/) and [Bangladesh Bank, AME/AE (IT), 2026](https://it.jobqns.com/bangladesh-bank-ame-ae-2026/) — accessed 2026-11-05 (HTTPS uses TLS to encrypt communication; response to a stolen TLS private key: revoke the certificate and issue a new key pair)

**Programiz**

- Programiz has no page on e-commerce security, SSL/TLS or digital certificates (checked 2026-11-05).
