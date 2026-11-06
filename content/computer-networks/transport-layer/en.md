---
description: Transport layer - services, port numbers, multiplexing and demultiplexing, UDP and its checksum, principles of reliable data transfer (rdt 1.0 to 3.0, pipelining), TCP segment structure, connection management, RTT estimation and flow control, principles of congestion control, and TCP congestion control (slow start, AIMD, Tahoe and Reno), with worked examples.
updated: 2026-11-06
---

## Transport-Layer Services {#transport-layer-services}

### Definition of the Transport Layer

The transport layer is the **layer that provides logical communication between application processes running on different hosts**, delivering data **process-to-process (end-to-end)**.

It lies between the application layer and the network layer. The network layer gives **host-to-host** delivery (using IP addresses); the transport layer extends it to the right **process** on the host (using port numbers). Transport protocols run only in the **end systems**, not in routers.

At the sender, the transport layer breaks application messages into **segments** and passes them to the network layer; at the receiver, it reassembles the segments and delivers the data to the application.

### Services of the Transport Layer

1. **Process-to-process delivery** — uses **port numbers** to identify the sending and receiving processes.
2. **Multiplexing and demultiplexing** — many applications share one network connection.
3. **Segmentation and reassembly** — messages are divided into segments, numbered, and put back in order.
4. **Connection control** — **connection-oriented** service (TCP) or **connectionless** service (UDP).
5. **Reliable delivery (error control)** — detects lost, damaged and duplicate segments and retransmits (TCP).
6. **Flow control** — prevents a fast sender from overflowing the receiver's buffer (TCP).
7. **Congestion control** — prevents senders from overloading the network (TCP).

The transport layer **cannot** guarantee delay or bandwidth, because the network layer (IP) gives only **best-effort** service.

### Port Numbers

**Port number** is a **16-bit number (0 to 65 535) that identifies a process (application) on a host**.

1. **Well-known (system) ports: 0–1023** — assigned to standard servers (HTTP 80, HTTPS 443, FTP 20/21, SMTP 25, DNS 53).
2. **Registered (user) ports: 1024–49 151** — registered with IANA for specific applications.
3. **Dynamic (private, ephemeral) ports: 49 152–65 535** — chosen temporarily by clients.

A **socket address** is the combination of an **IP address and a port number** (for example, 203.0.113.5:80); it identifies one process on the Internet.

### TCP vs UDP

| Basis | TCP | UDP |
| --- | --- | --- |
| Full form | Transmission Control Protocol | User Datagram Protocol |
| Connection | Connection-oriented (three-way handshake) | Connectionless |
| Reliability | Reliable: acknowledgements, retransmission | Unreliable: no acknowledgements |
| Ordering | Delivers data in order | No ordering |
| Flow and congestion control | Yes | No |
| Header size | 20–60 bytes | 8 bytes |
| Data unit | Byte stream (segments) | Messages (datagrams) |
| Speed and overhead | Slower, more overhead | Faster, little overhead |
| Broadcast and multicast | Not supported | Supported |
| Applications | HTTP, FTP, SMTP, SSH | DNS, DHCP, SNMP, VoIP, online games |

## Multiplexing and Demultiplexing {#multiplexing-and-demultiplexing}

### Definition of Multiplexing and Demultiplexing

**Multiplexing** is the **job at the sending host of gathering data from different sockets, adding a transport header (with port numbers) to each piece, and passing the segments to the network layer**.

**Demultiplexing** is the **job at the receiving host of delivering the data in each received segment to the correct socket**, using the port numbers in the segment header.

Each segment carries a **source port number** and a **destination port number**. For example, a host can run a web browser, an e-mail client and a DNS lookup at the same time; the transport layer delivers each arriving segment to the right one.

![Multiplexing and demultiplexing with port numbers](/diagrams/computer-networks/transport-mux.svg)

### Connectionless Demultiplexing (UDP)

A UDP socket is identified by a **two-tuple**: **(destination IP address, destination port number)**. All UDP segments with the same destination IP address and port go to the **same socket**, even if they come from different senders. The source port is used as the "return address" for replies.

### Connection-Oriented Demultiplexing (TCP)

A TCP socket is identified by a **four-tuple**: **(source IP address, source port, destination IP address, destination port)**. A server can therefore have many TCP sockets at the same time (for example, a web server on port 80 with one socket for each connected client); two segments from different clients to port 80 go to **different sockets**.

## Connectionless Transport: UDP {#connectionless-transport-udp}

### Definition of UDP

UDP (User Datagram Protocol) is a **simple, connectionless and unreliable transport protocol that adds only port numbers and an error-checking checksum to IP**.

UDP sends each message as an independent **datagram** without a handshake, acknowledgements or retransmission. Lost or out-of-order datagrams are not recovered.

### Why Applications Use UDP

1. **No connection setup** — no handshake delay (DNS would be slower over TCP).
2. **No connection state** — a server can support many more clients.
3. **Small header** — only 8 bytes (TCP needs at least 20).
4. **Better control of sending time** — no congestion control, so real-time applications can send at their own rate and tolerate some loss.

Applications: **DNS, DHCP, SNMP, RIP, TFTP, NTP**, internet telephony (VoIP), live video and online games. Reliability, if needed, can be added in the application (for example, **QUIC**, used by HTTP/3, runs over UDP).

### UDP Segment Structure

![UDP segment format](/diagrams/computer-networks/udp-header.svg)

The UDP header is **8 bytes** and has four 16-bit fields:

1. **Source port** — port of the sending process.
2. **Destination port** — port of the receiving process.
3. **Length** — length of the whole UDP segment (header + data) in bytes; the minimum is 8.
4. **Checksum** — for error detection over the segment (and a pseudo-header of IP addresses); optional in IPv4, compulsory in IPv6.

### UDP Checksum

The UDP checksum is the **ones' complement of the ones' complement sum of all 16-bit words** of the segment.

1. **Sender:** add the 16-bit words; any carry out of the leftmost bit is added back to the rightmost bit (**wraparound**); the checksum is the complement of the sum.
2. **Receiver:** add all words **including the checksum**. If the result is all 1s (**1111111111111111**), no error is detected; any 0 means an error.

**Example:** a segment has three 16-bit words: 0110011001100000, 0101010101010101 and 1000111100001100.

1. 0110011001100000 + 0101010101010101 = **1011101110110101**.
2. 1011101110110101 + 1000111100001100 = 1 0100101011000001 (17 bits); wrapping the carry gives **0100101011000010**.
3. Checksum = complement of 0100101011000010 = **1011010100111101**.
4. Receiver: the sum of the three words and the checksum is **1111111111111111**, so no error is detected.

UDP detects errors but does **not** correct them; a damaged segment is discarded (or passed on with a warning).

## Principles of Reliable Data Transfer {#principles-of-reliable-data-transfer}

### Reliable Data Transfer

Reliable data transfer is the **service in which no transferred bit is corrupted or lost, and all data is delivered in the order in which it was sent**, even though the underlying channel (IP) may corrupt or lose packets.

A **reliable data transfer protocol (rdt)** builds this service. Its versions add mechanisms step by step:

| Version | Channel assumed | Mechanisms added |
| --- | --- | --- |
| rdt 1.0 | Perfectly reliable (no errors, no loss) | None: sender sends, receiver delivers |
| rdt 2.0 | Bit errors possible | **Checksum**, receiver feedback (**ACK** / **NAK**), **retransmission** |
| rdt 2.1 | Bit errors, also in ACK/NAK | **Sequence numbers** (0 and 1) to detect duplicate packets |
| rdt 2.2 | Same as 2.1 | NAK-free: a **duplicate ACK** of the last good packet acts as a NAK |
| rdt 3.0 | Bit errors and **packet loss** | **Countdown timer**: retransmit if no ACK arrives in time |

1. **rdt 1.0** — over a perfect channel, no feedback is needed.
2. **rdt 2.0** — a **stop-and-wait** protocol: the sender sends a packet and waits; a positive acknowledgement (ACK) or negative acknowledgement (NAK) tells it whether to send the next packet or resend. Protocols based on retransmission are called **ARQ (automatic repeat request)** protocols.
3. **rdt 2.1** — if an ACK or NAK is corrupted, the sender simply resends; a 1-bit **sequence number** lets the receiver recognize and discard the duplicate.
4. **rdt 2.2** — instead of a NAK, the receiver resends the ACK of the last correctly received packet; a **duplicate ACK** tells the sender to retransmit.
5. **rdt 3.0** (the **alternating-bit protocol**) — the sender starts a **timer** with each packet; if the timer expires (the packet or its ACK was lost, or is just late), it retransmits. Duplicates are handled by the sequence numbers.

The stop-and-wait ARQ at the data link layer works in the same way; see [Data Link Control](/topics/computer-networks/data-link-control#error-control-and-flow-control).

### Performance of Stop-and-Wait (rdt 3.0)

> **Utilization of the sender: U = (L / R) / (RTT + L / R)**

Here **L** is the packet length in bits, **R** the transmission rate, **L / R** the transmission time and **RTT** the round-trip time.

**Example:** two hosts are connected by a 1 Gbps link with an RTT of 30 ms, and packets are 1000 bytes (8000 bits).

1. Transmission time L / R = 8000 / 10⁹ = **8 µs**.
2. U = 0.008 ms / (30 + 0.008) ms ≈ **0.00027** — the sender is busy only 0.027% of the time.
3. Effective throughput = 8000 bits / 30.008 ms ≈ **267 kbps** on a 1 Gbps link.

To fill the link, about (RTT + L / R) / (L / R) = 30.008 / 0.008 ≈ **3751** packets must be in flight at once.

### Pipelined Protocols

In **pipelining**, the sender sends **several packets without waiting** for acknowledgements. This needs a larger range of sequence numbers and buffers at the sender (and possibly the receiver). With N packets in flight, utilization rises N times (up to 100%). Two pipelined protocols are used:

1. **Go-Back-N (GBN)** — up to N unacknowledged packets; **cumulative ACKs**; one timer for the oldest unacknowledged packet; on a timeout, the sender resends that packet and **all packets after it**; the receiver discards out-of-order packets.
2. **Selective Repeat (SR)** — the sender resends **only the packets that were lost**; each packet has its own timer; the receiver **buffers** out-of-order packets and acknowledges each individually. The window must be at most half the sequence-number space.

Their windows, efficiencies and a worked example are given in [Data Link Control](/topics/computer-networks/data-link-control#error-control-and-flow-control).

## Connection-Oriented Transport: TCP {#connection-oriented-transport-tcp}

### Definition of TCP

TCP (Transmission Control Protocol) is a **connection-oriented, reliable, byte-stream transport protocol that delivers data in order and provides flow control and congestion control**.

Main features:

1. **Connection-oriented** — a connection is set up with a three-way handshake before data is sent, and released afterwards.
2. **Point-to-point** — one sender and one receiver (no multicast).
3. **Full-duplex** — data flows in both directions at the same time.
4. **Byte stream** — TCP numbers **bytes**, not segments; the application sees a continuous stream.
5. **Reliable and ordered** — sequence numbers, cumulative acknowledgements, checksums, timers and retransmission.
6. **Flow control** and **congestion control**.

A segment carries at most the **MSS (maximum segment size)** bytes of application data, typically **1460 bytes** (Ethernet MTU of 1500 bytes − 20-byte IP header − 20-byte TCP header).

### TCP Segment Structure

![TCP segment structure](/diagrams/computer-networks/tcp-segment.svg)

| Field | Size | Purpose |
| --- | --- | --- |
| Source port, destination port | 16 bits each | Identify the sending and receiving processes |
| Sequence number | 32 bits | Number of the **first byte** of data in the segment |
| Acknowledgement number | 32 bits | Number of the **next byte expected** from the other side |
| Header length | 4 bits | Header length in 32-bit words (5 to 15, i.e. 20 to 60 bytes) |
| Flags | 6 main bits | **URG** (urgent data), **ACK** (acknowledgement field valid), **PSH** (push data to the application at once), **RST** (reset), **SYN** (set up a connection), **FIN** (finish) |
| Receive window | 16 bits | Number of bytes the receiver can accept (flow control) |
| Checksum | 16 bits | Error detection over the segment and a pseudo-header |
| Urgent pointer | 16 bits | Last byte of urgent data (when URG is set) |
| Options | 0–40 bytes | Such as MSS, window scaling and timestamps |

### Sequence and Acknowledgement Numbers

TCP numbers each **byte** of data. The sequence number of a segment is the byte-stream number of its first byte.

**Example:** a 500 000-byte file is sent with an MSS of 1000 bytes and an initial sequence number of 0. It is divided into 500 segments, whose sequence numbers are 0, 1000, 2000, …, 499 000.

The acknowledgement number is the sequence number of the **next byte** the receiver expects. If host B has received bytes 0 to 535, it sends ACK **536**. TCP acknowledgements are **cumulative**: ACK 536 confirms all bytes up to 535.

### Connection Management

**Connection setup — three-way handshake:**

1. **SYN** — the client sends a segment with the SYN flag set and its initial sequence number (**seq = x**); it carries no data.
2. **SYN + ACK** — the server allocates buffers and replies with SYN and ACK set, its own initial sequence number (**seq = y**) and **ack = x + 1**.
3. **ACK** — the client acknowledges with **ack = y + 1** (and may carry data). The connection is **ESTABLISHED**.

A SYN consumes one sequence number, which is why the acknowledgements are x + 1 and y + 1. **Example:** with client ISN = 1000 and server ISN = 5000, the segments are SYN (seq 1000), SYN+ACK (seq 5000, ack 1001) and ACK (seq 1001, ack 5001).

**Connection release — four steps:**

1. The client sends a segment with **FIN** set.
2. The server sends an **ACK**.
3. When it has finished, the server sends its own **FIN**.
4. The client sends an **ACK**, waits in the **TIME_WAIT** state (to resend the final ACK if it is lost), and then closes.

A connection can also be closed abruptly with an **RST** segment.

![Opening and closing a TCP connection](/diagrams/computer-networks/tcp-handshake.svg)

### Reliable Data Transfer in TCP

1. **Retransmission on timeout** — the sender keeps one timer for the oldest unacknowledged segment and resends it when the timer expires; the timeout value is then doubled.
2. **Fast retransmit** — if the sender receives **three duplicate ACKs** for the same data, it resends the missing segment at once, without waiting for the timeout.
3. **Cumulative acknowledgements** and buffering of out-of-order segments at the receiver.
4. **Checksum** to detect damaged segments.

### Round-Trip Time Estimation and Timeout

TCP sets its timeout from measured round-trip times:

> **EstimatedRTT = (1 − α) × EstimatedRTT + α × SampleRTT**, with **α = 0.125**

> **DevRTT = (1 − β) × DevRTT + β × |SampleRTT − EstimatedRTT|**, with **β = 0.25**

> **TimeoutInterval = EstimatedRTT + 4 × DevRTT**

Here **SampleRTT** is the measured time from sending a segment to receiving its ACK, **EstimatedRTT** a weighted (exponential) average of the samples, and **DevRTT** an estimate of how much SampleRTT varies. The recommended initial timeout is 1 second.

**Example:** EstimatedRTT = 100 ms, DevRTT = 5 ms, and a new SampleRTT of 120 ms is measured (DevRTT is updated with the previous EstimatedRTT, as in RFC 6298).

1. DevRTT = 0.75 × 5 + 0.25 × |120 − 100| = 3.75 + 5 = **8.75 ms**.
2. EstimatedRTT = 0.875 × 100 + 0.125 × 120 = **102.5 ms**.
3. TimeoutInterval = 102.5 + 4 × 8.75 = **137.5 ms**.

### TCP Flow Control

TCP flow control is a **service that prevents the sender from overflowing the receiver's buffer**, by having the receiver advertise how much free buffer space it has.

The receiver puts its free space, the **receive window (rwnd)**, in every segment it sends:

> **rwnd = RcvBuffer − (LastByteRcvd − LastByteRead)**

The sender keeps the amount of unacknowledged data within rwnd: **LastByteSent − LastByteAcked ≤ rwnd**.

Here **RcvBuffer** is the size of the receive buffer, **LastByteRcvd** the number of the last byte placed in the buffer and **LastByteRead** the number of the last byte read by the application.

**Example:** RcvBuffer = 4096 bytes, LastByteRcvd = 3000 and LastByteRead = 1000. Then rwnd = 4096 − (3000 − 1000) = **2096 bytes**, so the sender may have at most 2096 unacknowledged bytes in flight. If rwnd becomes 0, the sender sends 1-byte probe segments until the window opens again.

## Principles of Congestion Control {#principles-of-congestion-control}

### Congestion

Congestion is the **condition in which too many sources send data into the network too fast for routers and links to handle**, so that queues grow and packets are delayed and lost.

Flow control protects the **receiver**; congestion control protects the **network**.

### Causes and Costs of Congestion

1. **Long queuing delays** — as the arrival rate approaches the link capacity, queuing delay grows very large (it becomes unbounded as the rate reaches the capacity).
2. **Packet loss and retransmissions** — when buffers overflow, packets are dropped; the sender must retransmit, so part of the link capacity carries duplicate data.
3. **Unneeded retransmissions** — packets that were only delayed (not lost) are retransmitted after a premature timeout, wasting capacity.
4. **Wasted upstream work** — when a packet is dropped at a later router, the capacity used by all earlier routers to forward it is wasted. In the worst case this causes **congestion collapse**, where throughput falls towards zero as load increases.

### Approaches to Congestion Control

1. **End-to-end congestion control** — the network gives no explicit help; the end systems infer congestion from **packet loss** (timeouts or duplicate ACKs) and **delay**. TCP uses this approach.
2. **Network-assisted congestion control** — routers give explicit feedback to the senders, such as a bit in a packet that signals congestion (**ECN**, explicit congestion notification) or the sending rate a link can support (as in ATM ABR).

Congestion control can also be classified as:

1. **Open-loop (prevention)** — policies that prevent congestion before it happens: retransmission policy, window policy, acknowledgement policy, discarding policy and admission policy.
2. **Closed-loop (removal)** — mechanisms that react after congestion starts: backpressure, choke packets, implicit signalling (TCP) and explicit signalling.

### Leaky Bucket Algorithm

The leaky bucket algorithm is a **traffic-shaping method in which packets enter a bucket (buffer) and leave it at a constant rate**, whatever the input rate.

Bursty input traffic becomes a smooth, constant-rate output. If the bucket is full, arriving packets are **discarded**.

### Token Bucket Algorithm

The token bucket algorithm is a **traffic-shaping method in which tokens are added to a bucket at a constant rate, and a packet may be sent only by removing tokens equal to its size**.

The bucket holds at most **C** tokens and fills at **r** tokens per second. When the bucket has saved tokens, a **burst** can be sent at once, so the output rate can vary. The maximum amount of data that can be sent in t seconds is **C + r × t**.

**Example:** tokens are added at 2 per second, the bucket holds at most 10 tokens, and it currently has 5. A packet of size 3 arrives: since 3 ≤ 5, it is sent, leaving 2 tokens. A packet of size 4 arriving next must wait (or is dropped) until enough tokens accumulate. Starting from a full bucket, at most 10 + 2 × 5 = **20** tokens' worth of data can be sent in 5 seconds.

### Leaky Bucket vs Token Bucket

| Basis | Leaky bucket | Token bucket |
| --- | --- | --- |
| Output rate | Fixed and constant | Variable; allows bursts |
| Idle time | Saves nothing | Saves tokens for later bursts |
| When the bucket is full | Packets are discarded | Tokens are discarded (packets are not) |
| Suitable for | Constant-rate traffic | Bursty (variable-rate) traffic |
| Flexibility | Less | More |

## TCP Congestion Control {#tcp-congestion-control}

### Congestion Window

**Congestion window (cwnd)** is a **variable kept by the TCP sender that limits how much unacknowledged data it may send into the network**.

TCP congestion control is **end-to-end**: each sender limits its sending rate according to the congestion it detects. The sender keeps a **congestion window (cwnd)** and sends at most the smaller of cwnd and the receiver's window:

> **LastByteSent − LastByteAcked ≤ min(cwnd, rwnd)**

> **Sending rate ≈ cwnd / RTT** bytes per second

TCP treats a **loss event** (a timeout or **three duplicate ACKs**) as a sign of congestion and reduces cwnd; each new ACK is a sign that the network is fine, and cwnd is increased. TCP is **self-clocking**: ACKs arriving faster let the window grow faster.

### Phases of TCP Congestion Control

TCP congestion control has three phases:

1. **Slow start** — cwnd starts at **1 MSS** and increases by 1 MSS for every ACK, so it **doubles every RTT** (exponential growth: 1, 2, 4, 8, …). Slow start ends when cwnd reaches the **slow-start threshold (ssthresh)**, or when a loss occurs.
2. **Congestion avoidance** — after cwnd reaches ssthresh, it grows by only **1 MSS per RTT** (linear growth). This is **additive increase**.
3. **Fast recovery** (TCP Reno) — after three duplicate ACKs, the missing segment is retransmitted (**fast retransmit**), and cwnd is reduced to about half instead of to 1 MSS.

On a loss, TCP reacts as follows:

1. **Timeout:** ssthresh = cwnd / 2, cwnd = **1 MSS**, and slow start begins again (in all versions).
2. **Three duplicate ACKs:** ssthresh = cwnd / 2;
   1. **TCP Tahoe** (the older version) sets cwnd = **1 MSS** and starts slow start again.
   2. **TCP Reno** sets cwnd = ssthresh + 3 MSS (fast recovery), then continues with congestion avoidance (linear growth).

### AIMD

**AIMD (additive increase, multiplicative decrease)** is the **rule of TCP congestion control by which cwnd grows slowly when there is no loss and is cut sharply on a loss**.

cwnd is increased by 1 MSS per RTT when there is no loss and **halved** on a loss (three duplicate ACKs). The resulting cwnd graph has a **saw-tooth** shape. AIMD makes competing TCP connections converge towards an **equal (fair) share** of a bottleneck link.

### Example of TCP Tahoe and TCP Reno

ssthresh is initially **8 MSS**, and a loss is detected by **three duplicate ACKs** at the end of round 8, when cwnd = 12 MSS.

1. **Rounds 1–4 (slow start):** cwnd = 1, 2, 4, 8 (doubling each RTT until it reaches ssthresh = 8).
2. **Rounds 5–8 (congestion avoidance):** cwnd = 9, 10, 11, 12 (+1 per RTT).
3. **Loss at cwnd = 12:** new ssthresh = 12 / 2 = **6**.
4. **TCP Tahoe:** cwnd falls to **1**, then slow start again: 1, 2, 4, 6 (capped at ssthresh), then linear: 7, 8, 9, 10.
5. **TCP Reno:** cwnd = 6 + 3 = **9**, then linear growth: 9, 10, 11, 12, …

![Congestion window of TCP Tahoe and TCP Reno](/diagrams/computer-networks/tcp-cwnd.svg)

**Example (slow start time):** with no loss and a large ssthresh, cwnd grows from 1 to 32 MSS in log₂ 32 = **5 RTTs** (1 → 2 → 4 → 8 → 16 → 32).

### Average Throughput of TCP

If the window when a loss occurs is **W** bytes, cwnd varies between W/2 and W, so the average is about 0.75 W:

> **Average throughput ≈ 0.75 × W / RTT**

**Example:** W = 150 000 bytes (1.2 Mbit) and RTT = 100 ms. Average throughput ≈ 0.75 × 1.2 Mbit / 0.1 s = **9 Mbps**.

### Flow Control vs Congestion Control

| Basis | Flow control | Congestion control |
| --- | --- | --- |
| Protects | The receiver (its buffer) | The network (routers and links) |
| Scope | Between one sender and one receiver | Among all senders sharing the network |
| Window used | Receive window (rwnd), advertised by the receiver | Congestion window (cwnd), computed by the sender |
| Signal | rwnd value in the TCP header | Packet loss (timeout, duplicate ACKs), delay, ECN |
| Methods | Sliding window | Slow start, congestion avoidance, fast recovery; leaky and token bucket |

## References {#references}

**TutorialsPoint**

- [Transport Layer Introduction](https://www.tutorialspoint.com/data_communication_computer_network/transport_layer_introduction.htm), [Transmission Control Protocol](https://www.tutorialspoint.com/data_communication_computer_network/transmission_control_protocol.htm), [User Datagram Protocol](https://www.tutorialspoint.com/data_communication_computer_network/user_datagram_protocol.htm), [TCP Service Model](https://www.tutorialspoint.com/data_communication_computer_network/tcp_service_model.htm) and [TCP vs UDP](https://www.tutorialspoint.com/data_communication_computer_network/tcp_vs_udp.htm) — accessed 2026-11-06 (functions, port ranges 0–1023, 1024–49151 and 49152–65535; TCP header fields and flags; UDP header and applications). Its TCP page states that the receiver "always sends either positive or negative acknowledgement"; TCP has no negative acknowledgements — a lost segment is signalled by duplicate ACKs or a timeout.
- [Congestion Control](https://www.tutorialspoint.com/data_communication_computer_network/congestion_control.htm), [Open Loop Congestion Control](https://www.tutorialspoint.com/data_communication_computer_network/open_loop_congestion_control.htm), [Closed Loop Congestion Control](https://www.tutorialspoint.com/data_communication_computer_network/closed_loop_congestion_control.htm), [Congestion Control Algorithms](https://www.tutorialspoint.com/data_communication_computer_network/congestion_control_algorithms.htm), [TCP Tahoe](https://www.tutorialspoint.com/data_communication_computer_network/tcp_tahoe_algorithm.htm), [TCP Reno](https://www.tutorialspoint.com/data_communication_computer_network/tcp_reno_algorithm.htm) and [Flow Control vs Congestion Control](https://www.tutorialspoint.com/data_communication_computer_network/flow_control_vs_congestion_control.htm) — accessed 2026-11-06 (open- and closed-loop policies, leaky bucket, token bucket and its example, slow start, congestion avoidance, fast retransmit and fast recovery with cwnd = ssthresh + 3)

**GeeksforGeeks**

- [Transport Layer Responsibilities](https://www.geeksforgeeks.org/computer-networks/transport-layer-responsibilities/), [Multiplexing and Demultiplexing in Transport Layer](https://www.geeksforgeeks.org/computer-networks/multiplexing-and-demultiplexing-in-transport-layer/), [User Datagram Protocol](https://www.geeksforgeeks.org/computer-networks/user-datagram-protocol-udp/), [Reliable Data Transfer (rdt) 1.0](https://www.geeksforgeeks.org/computer-networks/reliable-data-transfer-rdt-1-0/), [What is TCP](https://www.geeksforgeeks.org/computer-networks/what-is-transmission-control-protocol-tcp/), [TCP 3-Way Handshake Process](https://www.geeksforgeeks.org/computer-networks/tcp-3-way-handshake-process/), [TCP Connection Termination](https://www.geeksforgeeks.org/computer-networks/tcp-connection-termination/) and [TCP Congestion Control](https://www.geeksforgeeks.org/computer-networks/tcp-congestion-control/) — accessed 2026-11-06 (port fields in segments; UDP header and pseudo-header; rdt 1.0; ISN example 1000 and 5000; FIN, ACK and TIME_WAIT; slow start, congestion avoidance and the two reactions to loss). Its UDP page says that UDP relies on "higher layers (IP/ICMP) for error reporting"; IP and ICMP are lower (network-layer) protocols. Its congestion-control example says that 3 duplicate ACKs "trigger additive increase"; they trigger a multiplicative decrease.

**TpointTech**

- [Transport Layer](https://www.tpointtech.com/computer-network-transport-layer), [Transport Layer Protocols](https://www.tpointtech.com/computer-network-transport-layer-protocols), [TCP](https://www.tpointtech.com/tcp), [UDP Protocol](https://www.tpointtech.com/udp-protocol), [TCP vs UDP](https://www.tpointtech.com/tcp-vs-udp), [TCP Connection Termination](https://www.tpointtech.com/tcp-connection-termination), [TCP Retransmission](https://www.tpointtech.com/tcp-retransmission) and [Protocols in Noiseless and Noisy Channel](https://www.tpointtech.com/protocols-in-noiseless-and-noisy-channel) — accessed 2026-11-06 (services of the transport layer, TCP and UDP features and headers, connection termination, retransmission and three duplicate ACKs, the simplest and stop-and-wait protocols)

**Programiz**

- Programiz has no page on the transport layer (checked 2026-11-06).

**Additional source** (used because the reference websites do not give the rdt 2.0–3.0 progression, the stop-and-wait utilization example, the RTT-estimation and timeout formulas, the receive-window formula, the causes of congestion, the Tahoe and Reno cwnd example of round 8, AIMD fairness or the average-throughput formula)

- James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th edition, Pearson, chapter 3 (sections 3.1–3.7), and IETF RFC 6298 (computing TCP's retransmission timer). All checksums, timers, windows and throughput values above were checked by script.
