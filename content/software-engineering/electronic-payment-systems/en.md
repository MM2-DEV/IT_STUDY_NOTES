---
description: Electronic payment systems - credit, debit and smart cards and the card payment process, e-wallets and mobile financial services (bKash, Nagad, Rocket), payment gateways and their working, and electronic funds transfer (EFT) with BEFTN, RTGS and NPSB.
updated: 2026-11-04
---

## Credit and Debit Cards {#credit-and-debit-cards}

### Electronic Payment System

An electronic payment system is a system that lets buyers **pay for goods and services electronically, without cash or paper cheques**.

Payments are made over the Internet or another network. It reduces paperwork, transaction costs and labour costs, and it is faster and more convenient than manual payment.

The main modes of electronic payment are:

1. **Credit card**
2. **Debit card**
3. **Smart card**
4. **E-money and electronic wallets (e-wallets)**, including **mobile financial services**
5. **Electronic funds transfer (EFT)** and Internet banking

Online payments by card or wallet usually pass through a **payment gateway**.

### Credit Card

A credit card is a bank-issued card that lets the cardholder **buy now and pay later** with money borrowed from the card issuer.

The **card issuer bank pays the merchant on the customer's behalf**, and the customer repays the bank later, usually once a month. The card has a unique card number linked to the customer's credit account, a magnetic strip and/or a chip, an expiry date and a **CVV** (card verification value) security code.

#### Features of a Credit Card

1. **Credit limit** — the issuer sets the maximum amount the cardholder can spend.
2. **Billing cycle** — purchases are collected in a monthly statement; the customer can pay the full amount, or a minimum amount, by the due date.
3. **Interest** is charged on the unpaid balance after the due date.
4. **Interest-free (grace) period** — no interest is charged if the full bill is paid by the due date.
5. Accepted worldwide by merchants of its **card brand** (network), such as **Visa**, **Mastercard** and **American Express**.

#### Parties in a Credit Card Transaction

1. **Cardholder** — the customer who uses the card.
2. **Merchant** — the seller who accepts the card.
3. **Card issuer bank** — the cardholder's bank, which issues the card and gives the credit.
4. **Acquirer bank** — the merchant's bank, which receives the payment for the merchant.
5. **Card brand (card network)** — the network, such as Visa or Mastercard, that connects the banks and clears the payment.

#### Credit Card Payment Process

1. The bank issues and activates a credit card for the customer.
2. The customer gives the card details to the merchant (online, or by swiping or tapping the card in a shop).
3. The merchant sends the payment request, through the acquirer and the card brand, for **authorization**.
4. The card brand passes it to the issuer bank, which checks the card and the credit limit and **approves** the payment; the merchant keeps a record (sales slip) of the sale.
5. The merchant submits the sales record to the **acquirer bank** and receives the payment, less a service charge.
6. The acquirer bank asks the card brand to clear the amount and receives the money.
7. The card brand asks the **issuer bank** to clear the amount; the issuer pays it and adds the purchase to the customer's monthly bill.

![Card payment through a payment gateway: the request passes from the cardholder through the merchant, gateway, acquiring bank and card network to the issuing bank, and the response comes back](/diagrams/software-engineering/card-payment-flow.svg)

### Debit Card

A debit card is a card linked to the customer's **bank account**, from which the payment is **deducted immediately**.

The customer must have enough balance in the account; no credit is given. It is also used to withdraw cash from ATMs.

#### Features of a Debit Card

1. The customer need not carry cash or cheques.
2. Merchants accept it readily.
3. Spending is limited to the account balance, and the bank sets a **daily withdrawal limit**, which helps control spending.
4. Payment is protected by a **PIN** (personal identification number) or an OTP for online payments.
5. No interest is charged, because the customer spends his or her own money.

### Difference Between Credit Card and Debit Card

| Basis | Credit card | Debit card |
| --- | --- | --- |
| Source of money | Money borrowed from the card issuer (bank) | The customer's own money in the bank account |
| Payment | Buy now, pay later (monthly bill) | Paid immediately from the account |
| Bank account | Not needed to be linked | Must be linked to a bank account |
| Spending limit | Credit limit set by the issuer | The account balance (and a daily limit) |
| Interest | Charged on unpaid balances | None |
| Eligibility | Needs credit approval (income, credit history) | Anyone with a bank account |
| Credit history | Builds (or damages) the credit history | No effect on credit history |
| Risk of debt | Higher; can encourage overspending | Lower; supports budgeting |
| Cash withdrawal | Possible as a cash advance, with high fees and interest | From the linked account at ATMs |
| Rewards | Often reward points and cash-back | Usually few or none |

### Smart Card

A smart card looks like a credit or debit card but contains an embedded **microprocessor chip** that can store and process data. It can store personal information and **electronic money**, which is reduced after each payment; it is accessed with a PIN and keeps data in encrypted form, so it is more secure and processes payments faster than a magnetic-strip card. Examples are **Mondex** and **Visa Cash** (electronic purses), and today's **EMV chip** debit and credit cards.

### Security of Card Payments

1. **PIN** and **CVV** codes confirm that the user has the card.
2. **EMV chip** cards are much harder to copy than magnetic-strip cards.
3. **3-D Secure** (Verified by Visa, Mastercard SecureCode / Identity Check) adds an extra step, such as a one-time password (OTP), for online card payments.
4. **SSL/TLS** encrypts card details sent over the Internet, and the **PCI DSS** standard governs how merchants store and handle card data.

## Electronic Wallets and Mobile Financial Services {#electronic-wallets-and-mobile-financial-services}

### Electronic Wallet (E-Wallet)

An electronic wallet (e-wallet) is a **software application that stores the user's payment information** and lets the user pay and send money from a phone or computer.

It stores debit and credit cards, bank accounts or a money balance, and is used online or in shops without physical cards or cash.

#### How an E-Wallet Works

1. The user installs the wallet app and creates an account.
2. The user links a debit or credit card or a bank account, or loads money into the wallet.
3. At checkout, the user chooses the wallet, **scans a QR code**, or **taps the phone** on the payment terminal (using NFC).
4. The user approves the payment with a **PIN or fingerprint**.
5. The wallet sends the payment, often using a **token** instead of the real card number, so the card details are not shared with the merchant.

**Examples:** PayPal, Apple Pay, Google Wallet (Google Pay), Alipay, WeChat Pay and Paytm.

#### Advantages of E-Wallets

1. **Convenience** — no need to carry many cards or cash; payment takes a few seconds.
2. **Many cards in one place** — cards, loyalty cards and coupons are stored together.
3. **Security** — PIN or biometric approval, encryption and tokenization; a lost phone does not expose the card numbers.
4. **Wide acceptance** online and in shops.
5. **Offers and rewards** — discounts and cash-back.
6. **Spending records** — the wallet shows the history of payments.

#### Disadvantages of E-Wallets

1. Not every merchant accepts every e-wallet.
2. A phone with a flat battery, or without Internet access, cannot pay.
3. If the phone has no passcode, a thief may use the linked accounts.
4. Some services charge fees.
5. Easy spending can lead to overspending.

### Mobile Financial Services (MFS)

Mobile financial services (MFS), also called **mobile banking** or **mobile money**, are financial services — such as **depositing and withdrawing cash, sending money and making payments** — provided through a **mobile phone account**, using a **USSD** code menu (on any phone) or a **smartphone app**, with a network of **agents** for cash-in and cash-out.

They give banking services to people who have no bank account, especially in rural areas, so they support **financial inclusion**.

In Bangladesh, MFS are licensed and supervised by **Bangladesh Bank** (the central bank) under its MFS Regulations (the Bangladesh Mobile Financial Services Regulations, 2018, later replaced by the 2022 regulations).

#### Services of MFS

1. **Cash in** — depositing cash into the mobile account through an agent.
2. **Cash out** — withdrawing cash from an agent or an ATM.
3. **Send money** — person-to-person transfer.
4. **Payment** — paying merchants, online shops and e-commerce sites.
5. **Mobile recharge** (airtime top-up).
6. **Bill payment** — electricity, gas, water and Internet bills.
7. **Salary and government allowance disbursement**, and receiving **foreign remittance**.
8. **Add money** from, and **transfer** to, bank accounts and cards.
9. Small **savings and loan** services.

#### MFS Providers in Bangladesh

1. **Rocket** — the mobile banking service of **Dutch-Bangla Bank**, started in **2011**; one of the first MFS in Bangladesh.
2. **bKash** — launched on **21 July 2011**; a subsidiary of **BRAC Bank**; the largest MFS provider in Bangladesh.
3. **Nagad** — the digital financial service of the **Bangladesh Post Office**, launched on **26 March 2019**.
4. **Upay** (United Commercial Bank) and others.

#### Advantages of MFS

1. Banking services for people without bank accounts (financial inclusion).
2. Money can be sent anywhere in the country instantly, 24 × 7.
3. Works on basic mobile phones through USSD; no Internet is required.
4. Cheaper and faster than traditional money transfer, with agents in every area.
5. Supports cashless payments, e-commerce and government payments.

#### Disadvantages of MFS

1. **Fraud** — fake calls and messages that trick users into sharing their PIN or OTP.
2. **Cash-out charges** are relatively high.
3. Transaction limits restrict large payments.
4. Depends on mobile network coverage and on agents having enough cash.

#### Difference Between E-Wallet and MFS

| Basis | E-wallet | Mobile financial service (MFS) |
| --- | --- | --- |
| Basis of the account | Usually linked to an existing card or bank account | A mobile money account; no bank account needed |
| Cash in / cash out | Usually not; money comes from a card or bank | Yes, through agents and ATMs |
| Device needed | Smartphone with Internet | Any mobile phone (USSD) or a smartphone app |
| Main users | Card and bank customers, online shoppers | Also unbanked and rural people |
| Examples | PayPal, Apple Pay, Google Pay | bKash, Nagad, Rocket |

## Payment Gateways {#payment-gateways}

### Definition of Payment Gateway

A payment gateway is an online merchant service that **securely sends a customer's payment details to the bank for authorization** and returns the result to the merchant.

It collects the card, wallet or bank details on the website or app and encrypts them. It works as the link — the "middleman" — between the online store, the customer and the banks, like the card terminal of a physical shop.

### How a Payment Gateway Works

1. The customer places an order on the website and is directed to the payment gateway.
2. The gateway collects the payment details (card, wallet or bank account) and **encrypts** them.
3. The gateway sends the details, through the acquiring bank (processor) and the card network, to the customer's bank, which checks the account and the available balance (**authorization**).
4. The bank's response (approved or declined) comes back to the gateway, which passes it to the merchant.
5. The merchant accepts or declines the order and informs the customer.
6. If it is approved, the merchant asks for the payment to be completed (**capture**).
7. The bank **settles** the money through the gateway into the merchant's account, and the customer receives a payment confirmation.

### Types of Payment Gateways

Payment gateways are of two kinds by provider:

1. **Third-party gateway** — run by a private payment company; offers many payment methods and easy integration.
2. **Bank gateway** — run directly by a bank; highly trusted.

By the way the payment page is handled, they are of five types:

1. **Hosted gateway** — the customer is **redirected** to the payment provider's own page to pay, then returned to the store (for example, PayPal). It is simple and secure for the merchant.
2. **Self-hosted gateway** — the payment details are collected on the merchant's own website and then sent to the gateway.
3. **API-hosted (integrated) gateway** — the merchant's site or app handles the payment through the gateway's **API**, without redirecting the customer.
4. **Local bank integration** — the customer is redirected to the bank's own payment page.
5. **Off-website methods** — payments made outside the website, such as through mobile wallets.

### Security Features of a Payment Gateway

1. **SSL/TLS encryption** of all data sent between the customer, the merchant and the gateway.
2. **PCI DSS compliance** — following the Payment Card Industry Data Security Standard for protecting card data.
3. **Tokenization** — replacing the card number with a token that is useless to a thief.
4. **3-D Secure** — an extra authentication step (OTP) for card payments.
5. **Address Verification Service (AVS)** and other fraud checks.

### Examples of Payment Gateways

1. **PayPal**
2. **Stripe**
3. **Authorize.Net**
4. **2Checkout**
5. **Amazon Pay**
6. **Razorpay** and **PayU** (India)
7. **SSLCOMMERZ**, **aamarPay** and **shurjoPay** (Bangladesh)

### Payment Gateway vs Payment Processor

| Basis | Payment gateway | Payment processor |
| --- | --- | --- |
| Role | Collects and encrypts payment data at checkout and passes the approve/decline result | Carries the transaction data to the card network and banks, and moves the money |
| Position | Between the customer/merchant and the processor | Between the gateway and the card networks and banks |
| Comparison with a shop | The card terminal (POS machine) | The bank's card processing system |

### Advantages of Payment Gateways

1. Fast, convenient and secure online payment, 24 × 7.
2. Accepts many payment methods (cards, wallets, Internet banking).
3. Protects card data from fraud and theft, which builds customer trust.
4. Easy to add to a website or app.

### Disadvantages of Payment Gateways

1. **Fees** — set-up, annual and per-transaction charges (a percentage of each payment), usually paid by the seller.
2. A hosted gateway takes the customer away from the store's website.
3. Failed or delayed payments when the gateway or the bank is down.

## Electronic Funds Transfer (EFT) {#electronic-funds-transfer-eft}

### Definition of EFT

Electronic funds transfer (EFT) is the **electronic transfer of money from one bank account to another** without paper cheques or cash.

The accounts can be in the same bank or different banks, within a country or between countries, and no bank staff handle each transaction.

### How EFT Works (Internet Banking Transfer)

1. The customer logs in to the bank's website or app.
2. The customer registers the receiver's (beneficiary's) account details.
3. The customer enters the amount and requests the transfer.
4. If both accounts are in the **same bank**, the money is transferred directly.
5. If they are in **different banks**, the request is sent to a central clearing system — an **Automated Clearing House (ACH)** or a real-time system — which moves the money between the banks.
6. The amount is deducted from the customer's account, and the bank informs the customer when the transfer is complete.

### Types of EFT

1. **ATM transactions** — cash withdrawals and transfers.
2. **Point of sale (POS) / debit card payments** in shops.
3. **Direct deposit (credit transfer)** — money paid into accounts, such as salaries, pensions and dividends.
4. **Direct debit** — money collected from accounts, such as loan instalments, insurance premiums and utility bills.
5. **Internet and mobile banking transfers.**
6. **Wire transfer / RTGS** — fast transfer of large amounts.
7. **Electronic bill payment.**

### EFT Systems in Bangladesh

The electronic funds transfer systems of Bangladesh are operated by **Bangladesh Bank**:

1. **BEFTN (Bangladesh Electronic Funds Transfer Network)** — started on **28 February 2011**; a **batch-processing** system for interbank credit transfers (salaries, dividends, vendor and government payments) and debit transfers (loan instalments, bills, premiums). Payments are settled the **same day or the next working day**. Since 2023 it runs on Bangladesh Bank's **Nikash** platform.
2. **BD-RTGS (Real-Time Gross Settlement)** — inaugurated on **29 October 2015**; transfers **high-value** payments (**Tk 1 lakh or more**) **one by one in real time**; a completed RTGS transfer cannot be reversed.
3. **NPSB (National Payment Switch Bangladesh)** — connects the banks (and now mobile wallets) for **real-time** ATM, POS and **Internet banking fund transfers (IBFT)** between different banks, 24 × 7.

#### Difference Between BEFTN, RTGS and NPSB

| Basis | BEFTN | RTGS | NPSB |
| --- | --- | --- | --- |
| Processing | Batch (several sessions a day) | Real-time, one by one (gross) | Real-time |
| Settlement time | Same day or next working day | Immediately | Immediately (card transactions settle later) |
| Amount | Any amount | High value: Tk 1 lakh or more | Small and medium amounts |
| Availability | Banking days | Banking hours | 24 × 7 |
| Typical use | Salaries, dividends, bulk payments, bills | Large business and urgent payments | ATM, POS, Internet banking and app transfers |

Other countries have similar systems — for example, **NEFT**, **RTGS** and **IMPS** in India, **ACH** in the USA — and **SWIFT** is used for international bank transfers.

### Advantages of EFT

1. **Fast** — money reaches the receiver quickly, often instantly.
2. **Low cost** — no cheques, printing or travel to the bank.
3. **Convenient** — transfers can be made from anywhere through the Internet or a mobile phone.
4. **Safe and accurate** — no risk of carrying cash or losing cheques; every transfer is recorded.
5. **Automatic payments** — salaries and bills can be paid automatically on fixed dates.

### Disadvantages of EFT

1. **Fraud and cyber attacks** — stolen passwords or phishing can lead to unauthorized transfers.
2. **Errors are hard to reverse** — money sent to a wrong account, or by RTGS, is difficult to recover.
3. Needs Internet access and technical knowledge.
4. **System failure** — transfers stop when the bank or network system is down.

## References {#references}

**TutorialsPoint**

- [E-Commerce – Payment Systems](https://www.tutorialspoint.com/e_commerce/e_commerce_payment_systems.htm) — accessed 2026-11-04 (credit card, debit card, smart card, e-money and EFT; parties and steps of a credit card payment). This page numbers two steps of the credit card process as "Step 6"; the steps are numbered in order above.
- [E-Commerce Payment Gateway](https://www.tutorialspoint.com/website_development/website_development_ecommerce_payment_gateway.htm) — accessed 2026-11-04 (definition, hosted gateways, examples, how to choose a gateway)

**GeeksforGeeks**

- [Difference between Credit Card and Debit Card](https://www.geeksforgeeks.org/difference-between-credit-card-and-debit-card/) — accessed 2026-11-04 (comparison table)
- [Payment Gateway: Definition, Working & Features](https://www.geeksforgeeks.org/blogs/payment-gateway/) — accessed 2026-11-04 (working steps, types, security features, advantages)
- [Advantages and Disadvantages of Electronic Wallets](https://geeksforgeeks.org/advantages-and-disadvantages-of-electronic-wallets) — accessed 2026-11-04
- [10 Digital Wallets for Quick Online Payments](https://www.geeksforgeeks.org/blogs/10-digital-wallets-for-quick-online-payments/) — accessed 2026-11-04 (definition, how wallets are used, examples)
- [NEFT Full Form](https://www.geeksforgeeks.org/finance/neft-full-form/) and [Immediate Payment Service (IMPS)](https://www.geeksforgeeks.org/finance/immediate-payment-service-imps-full-form-features-procedure-and-charges/) — accessed 2026-11-04 (EFT systems in India)

**TpointTech**

- [Payment Gateway Integration in Java](https://www.tpointtech.com/payment-gateway-integration-in-java) — accessed 2026-11-04 (on-site, hybrid and redirect gateways, 3-D Secure and PCI DSS, examples). TpointTech has no general page on cards, e-wallets or EFT; its `payment-gateway` and `e-wallet` pages return 404.

**Programiz**

- Programiz has no page on electronic payment systems (checked 2026-11-04).

**Additional sources** (for mobile financial services and the EFT systems of Bangladesh, which the reference websites do not cover)

- [bKash – Wikipedia](https://en.wikipedia.org/wiki/BKash), [Nagad – Wikipedia](https://en.wikipedia.org/wiki/Nagad) and [Dutch-Bangla Bank – Wikipedia](https://en.wikipedia.org/wiki/Dutch-Bangla_Bank) — accessed 2026-11-04 (launch dates and owners of bKash, Nagad and Rocket)
- The Business Standard, [BB allows financial institutions, govt entities to enter MFS business](https://www.tbsnews.net/economy/banking/bb-allows-financial-institutions-govt-entities-enter-mfs-business-371323) — MFS Regulations replacing the 2018 regulations
- UNB, [This is how RTGS funds transfer works](https://unb.com.bd/category/Business/this-is-how-rtgs-funds-transfer-works/115300) — BD-RTGS inaugurated on 29 October 2015, minimum Tk 1 lakh
- nsave, [BEFTN](https://nsave.com/bangladesh/beftn) and [NPSB](https://nsave.com/bangladesh/npsb) — accessed 2026-11-04 (BEFTN start date, batch settlement, Nikash; NPSB transaction types). These are secondary sources; fees and limits change and are therefore not given in the notes.
