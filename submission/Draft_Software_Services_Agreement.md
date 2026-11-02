# Software Development & Professional Services Agreement

**Agreement Reference No**: CA-SW/2026/001  
**Effective Date**: _____ day of _______________, 2026  
**Place of Execution**: Nagpur, Maharashtra  

---

## BY AND BETWEEN:

**COMPANY A SOLAR PVT. LTD.**, a private limited company incorporated under the provisions of the Companies Act, 2013, having its registered corporate office at Civil Lines, Nagpur, Maharashtra – 440001, acting through its authorized representative, the **Founder & Managing Director** (hereinafter referred to as the **"Client"** or **"Company A"**, which expression shall, unless repugnant to the context or meaning thereof, include its successors, permitted assigns, and legal representatives) of the **FIRST PART**;

### AND

**_____________________________________________**, an independent Software Engineering Consultant / Technology Services Firm, having their principal place of business at __________________________________________________________________________________ (hereinafter referred to as the **"Consultant"** or **"Software Contractor"**, which expression shall, unless repugnant to the context or meaning thereof, include their successors and permitted assigns) of the **SECOND PART**.

*(The Client and the Consultant are hereinafter collectively referred to as the "Parties" and individually as a "Party".)*

---

## RECITALS

**WHEREAS**:
A. The Client is engaged in the business of engineering, procurement, and construction (EPC) of rooftop solar photovoltaic power plants across the Vidarbha region of Maharashtra, installing approximately 120 systems per month with an annual turnover of ₹30 to ₹38 Crore.  
B. The Client currently processes prospective leads via manual telephone calls, WhatsApp, and spreadsheets, leading to an estimated ₹86.88 Lakh annual operational loss resulting from unqualified on-site survey visits (approx. 40% of surveys) and quote turnaround delays (approx. 3 business days).  
C. The Client desires to commission a custom web-based software suite encompassing digital lead qualification, MSEDCL electricity bill AI reading, side-by-side human OCR verification, date-effective subsidy calculation, vector PDF quotation generation, an 8-stage project tracker with public customer links, and an SLA bottleneck alert center.  
D. The Consultant possesses the specialized technical skills, software engineering competence, and architectural experience required to design, develop, test, and deliver the customized software platform on the terms and conditions outlined herein.

**NOW, THEREFORE, IN CONSIDERATION OF THE MUTUAL COVENANTS CONTAINED HEREIN, THE PARTIES HEREBY AGREE AS FOLLOWS**:

---

## 1. SCOPE OF SERVICES & SOFTWARE DELIVERABLES

1.1 **Development Scope**: The Consultant agrees to design, engineer, test, deliver, and support a bespoke web application suite tailored for Company A’s Vidarbha rooftop solar operations, comprising the eight core functional modules detailed in **Schedule A (Statement of Work & Deliverables Specification, PRD v2.0)**:
1. **Module 1 (Lead Intake)**: Multilingual (Marathi, Hindi, English) lead capture form with property ownership logic (`Owner` vs `Tenant`), roof specifications (RCC, Metal, Tile, area), electricity bill intake, Vidarbha pincode validation, and DPDP Act 2023 legal consent.
2. **Module 2 (AI Bill OCR & Verification)**: Automated MSEDCL electricity bill parsing (Consumer No., Tariff, Sanctioned Load, Units, Billed Amount) accompanied by a side-by-side verification interface allowing staff to confirm/edit extracted values, with image quality blurriness detection (&lt; 60% confidence).
3. **Module 3 (Qualification & Sizing Engine)**: Algorithmic lead classification into `High`, `Medium`, `Low (tenant)`, and `Low (small bill)` tiers. Employs the non-rejection principle (routing low-scoring prospects to 5-minute phone consultations to prevent ₹2,500 wasted survey visits) and automates system sizing via the Vidarbha generation constant (1,400 kWh/kW/year).
4. **Module 4 (Date-Effective Subsidy Engine)**: Date-versioned calculation table applying active PM Surya Ghar rates (₹30,000/kW up to 2 kW; ₹18,000 for 3rd kW; capped at ₹78,000) and historical MNRE Phase II rules, with 25-year payback modeling.
5. **Module 5 (Quotation Builder & PDF Generator)**: "Simple Story First" customer quote view (Capacity, Net Cost After Subsidy, Payback, Annual Savings) with milestone payment schedule (10%-40%-40%-10%) and branded client-side vector PDF download.
6. **Module 6 (Public Customer Tracker)**: Secure tokenized URL (`/track/:token`) accessible by homeowners via smartphone without login, displaying an 8-stage progress tracker, document locker, and advance payment gateway simulation.
7. **Module 7 (Stuck Projects SLA Dashboard)**: Kanban and tabular pipeline highlighting projects exceeding statutory SLAs (MSEDCL sanction SLA: 10 days; DBT release SLA: 20 days) with one-click escalation tools.
8. **Module 8 (Localized Notifications)**: Real-time WhatsApp/SMS notification simulation dispatching automated milestone updates in Marathi, Hindi, and English.

1.2 **Exclusions from Scope**: The services do not include automated bot submission on the National Subsidy Portal (which mandates manual Aadhaar OTP and CAPTCHA validation), internal warehouse inventory purchasing systems, or live inverter IoT telemetry.

---

## 2. TIMELINE, MILESTONES & COMMERCIAL TERMS

2.1 **Project Duration**: The development, testing, and deployment of the software platform shall be completed within **six (6) calendar weeks** from the Effective Date, subject to Schedule adjustments under Clauses 3.2, 4.3, and 11.

2.2 **Contract Value**: The total fixed-price fee for the complete scope of services under this Agreement shall be **₹6,00,000 (Indian Rupees Six Lakh Only)**, exclusive of applicable Goods and Services Tax (GST).

2.3 **Milestone Payment Schedule**: The Client shall remit payments to the Consultant based strictly on verified technical milestones and acceptance criteria:

| Milestone | Deliverable Scope | Target Timeline | Verification & Acceptance Criteria | Amount Payable (₹) | Share |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **M1** | **Architecture, Data Schemas & Subsidy Engine** | End of Week 1 | PRD v2.0 approved; Express REST APIs live; dated subsidy engine passing test cases for PM Surya Ghar and Phase II schemes. | ₹1,50,000 | 25% |
| **M2** | **Intake Form & AI OCR Verification** | End of Week 2 | Form deployed in Marathi/Hindi/English; side-by-side OCR verification and blurriness alert fully functional. | ₹1,50,000 | 25% |
| **M3** | **Quotation Builder & Public Tracker** | End of Week 4 | Vector PDF quote generator operational; public `/track/:token` active; qualification routing verified. | ₹1,50,000 | 25% |
| **M4** | **SLA Monitor, Nagpur Pilot, UAT & Handover** | End of Week 6 | 100% automated test suite passing; staff training completed; Founder-MD sign-off. | ₹1,50,000 | 25% |
| **TOTAL** | | | **Full Platform Delivery** | **₹6,00,000** | **100%** |

2.4 **Payment Terms & Late Payment Consequences**:
1. The Client agrees to release milestone payments via electronic bank transfer (NEFT/RTGS/IMPS) within **five (5) business days** of receiving the Consultant’s milestone invoice and accompanying Certificate of Acceptance.
2. In the event of any failure or delay by the Client in releasing payment within the stipulated five (5) business days, interest shall accrue on the overdue balance at the rate of **1.5% per month (18% per annum)** or the maximum statutory rate permitted by Indian law, calculated on a daily basis from the due date until full receipt.
3. If an invoice remains unpaid for more than **ten (10) business days** past its due date, the Consultant reserves the legal right, upon written notice, to immediately suspend all ongoing development, withhold subsequent milestone source code commits, and pause deployment without liability. In such event, the overall project timeline shall automatically extend on a day-for-day basis by the duration of such suspension, without prejudice to the Consultant’s right to claim accrued interest and damages.

---

## 3. CLIENT OBLIGATIONS & SCHEDULE EXTENSIONS

3.1 **Client Dependencies**: To ensure timely delivery, the Client shall:
1. Provide thirty (30) anonymized sample MSEDCL electricity bills from Vidarbha circles within three (3) business days of signing.
2. Furnish official rate cards for PV modules, inverters, elevated structures, and standard payment milestones within five (5) business days.
3. Review and provide consolidated feedback on weekly milestone deliverables within three (3) business days of presentation.
4. Designate a dedicated Project Lead (Sales / Operations Manager) as the single point of contact for operational queries.
5. Provide ten (10) sales and survey staff members for the User Acceptance Testing (UAT) session in Week 6.

3.2 **Day-for-Day Schedule Relief**: If the Client fails to satisfy any of the dependencies or review obligations set forth in Clause 3.1 within the prescribed timeframes, the Consultant’s delivery schedule for subsequent milestones and the overall project deadline shall automatically be extended on a day-for-day basis by the duration of the Client delay, without any financial penalty or liability to the Consultant.

---

## 4. ACCEPTANCE TESTING & DEFECT REMEDIATION

4.1 **Review Window & Interaction with Milestones**:
1. Following delivery of each milestone build, the Client shall have **five (5) business days** ("Acceptance Period") to review and test the deliverables against the objective acceptance criteria specified in **Schedule B (Project Implementation Timeline & Milestones Plan, v2.0)**.
2. The Acceptance Period runs in parallel with the transition into the subsequent milestone, unless a Critical Defect halts downstream dependencies.

4.2 **Defect Classification & Remediation SLAs**:
- **Critical Defect (Severity 1)**: Complete application outage, data corruption, failure to compute dated subsidies according to the active rule table, or failure of quote PDF generation. Remediation Window: Consultant shall deploy a verified fix or workaround within **forty-eight (48) hours** at no extra charge.
- **Major Defect (Severity 2)**: Core functional failure with an operational workaround available (e.g., OCR failure on specific bill formats where manual input operates). Remediation Window: **four (4) business days**.
- **Minor Defect (Severity 3)**: Non-blocking cosmetic, typographical, or minor styling discrepancies. Remediation Window: Resolved in the next scheduled weekly sprint release.

4.3 **Acceptance Clock & Deemed Acceptance**:
1. Upon notification of a Critical or Major Defect, the 5-day acceptance clock is paused while the Consultant remediates the defect. Upon delivery of the corrected build, the Client shall have a re-inspection window of **three (3) business days**.
2. If the Client neither issues a written notice specifying reproducible non-conformities nor signs the Certificate of Acceptance within the 5-day Acceptance Period, the milestone deliverables shall be conclusively deemed accepted, and the corresponding milestone payment shall become immediately payable.

---

## 5. INTELLECTUAL PROPERTY RIGHTS & OWNERSHIP

5.1 **Custom Code & Work-for-Hire**: Subject to full and final clearance of the total contract price (₹6,00,000 plus applicable taxes), all rights, title, interest, and intellectual property in and to the custom source code, database architectures, user interface workflows, schemas, algorithms, and documentation developed specifically for Company A under this Agreement shall vest exclusively in the Client as a "work-for-hire".

5.2 **Consultant Pre-Existing IP & Tools**:
1. The Consultant retains sole ownership of all pre-existing software, developer utility scripts, architectural libraries, design systems, algorithms, and methodologies owned, developed, or licensed by the Consultant prior to or independently of this Agreement ("Pre-Existing IP").
2. To the extent that any Pre-Existing IP is incorporated into the platform deliverables, the Consultant hereby grants to Company A a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, execute, display, and modify such Pre-Existing IP solely as an integrated component of the delivered platform.

5.3 **Third-Party & Open-Source Components**:
1. The Client acknowledges that the platform incorporates standard, industry-accepted open-source libraries (e.g., Node.js, Express, React, Tailwind CSS, jsPDF, lucide-react) governed by their respective permissive licenses (MIT, Apache 2.0, BSD).
2. The Consultant expressly warrants that no copyleft or viral licenses (such as GNU General Public License - GPL) that would require the Client to disclose, license, or open-source its proprietary commercial logic or business rules are embedded within the application.

---

## 6. DATA PRIVACY, DPDP ACT 2023 & SECURITY SAFEGUARDS

6.1 **Confidentiality**: Each Party agrees to maintain strict confidentiality regarding all proprietary business data, customer records, price cards, and operational workflows disclosed during the engagement.

6.2 **DPDP Act 2023 Compliance**:
1. The Consultant acknowledges that MSEDCL consumer numbers, mobile numbers, and site addresses collected by the platform constitute personal data under the **Digital Personal Data Protection (DPDP) Act, 2023**.
2. The Consultant shall implement technical safeguards including purpose-limited consent checkboxes, database field masking (`04901*****31`), HTTPS/TLS encryption in transit, and unguessable public tracking tokens.

6.3 **Data Deletion & Return Mandate**: Upon formal handover, termination, or written request by the Client, the Consultant shall securely delete, purge, and destroy all Client personal data, sample electricity bills, customer lists, and database backups stored on local development environments within **fourteen (14) calendar days**, and shall deliver a formal written Certificate of Data Destruction to the Client.

6.4 **Security Breach Notification SLA**: In the event of any confirmed or suspected unauthorized access, data breach, leak, or compromise of personal data or Client systems, the Consultant shall notify the Client in writing within **twenty-four (24) hours** of becoming aware of the incident, furnish a preliminary root-cause report within forty-eight (48) hours, and assist in remediation.

6.5 **Subcontractor Obligations**: The Consultant shall not engage any subcontractor or sub-processor to process personal data without prior written authorization from the Client. Any permitted sub-processor shall be bound by data protection obligations no less restrictive than those set forth in this Agreement.

---

## 7. WARRANTIES, SERVICE LEVELS & POST-DEPLOYMENT SUPPORT

7.1 **Performance Warranty**: The Consultant warrants that for a period of **sixty (60) calendar days** following production go-live (Milestone M4 sign-off), the platform shall operate substantially in accordance with the specifications in the PRD v2.0. The Consultant shall remediate reproducible software bugs without additional charge during this warranty period.

7.2 **Warranty Support Hours & Response Times**:
During the 60-day warranty period, the Consultant shall provide technical support under the following Service Level Agreement (SLA):
- **Support Window**: Monday through Saturday, 09:30 AM to 06:30 PM IST (excluding gazetted national holidays).
- **Severity 1 (Critical Downtime)**: Initial response within **two (2) hours**; resolution or operational workaround within **twenty-four (24) hours**.
- **Severity 2 (Major Impairment)**: Initial response within **four (4) hours**; resolution within **forty-eight (48) hours**.
- **Severity 3 (Minor Defect)**: Initial response within **eight (8) business hours**; resolution delivered in the next scheduled patch update.

7.3 **Warranty Exclusions**: The warranty shall not cover defects resulting from:
1. Unauthorized modifications to the code by Client personnel or third-party agencies.
2. Changes, disruptions, or policy revisions in external third-party infrastructure (e.g., MSEDCL portal re-designs, operating system or browser engine deprecations).
3. Failures in Client-managed cloud hosting or infrastructure accounts.

7.4 **Non-Infringement Warranty**: The Consultant warrants that the custom software delivered hereunder does not infringe upon any copyright, patent, trademark, or trade secret of any third party.

---

## 8. TERMINATION & LIMITATION OF LIABILITY

8.1 **Termination for Cause**: Either Party may terminate this Agreement immediately upon written notice if the other Party commits a material breach and fails to cure such breach within **fourteen (14) business days** of receiving written notification.

8.2 **Termination for Convenience**: The Client may terminate this Agreement for convenience by providing **ten (10) business days'** written notice, provided the Client compensates the Consultant for all verified, completed milestones and a pro-rata share of active work-in-progress up to the effective termination date.

8.3 **Limitation of Liability & Carve-Out Exceptions**:
1. Except as provided in Clause 8.3.2, neither Party shall be liable to the other for indirect, incidental, special, or consequential damages. The Consultant’s aggregate cumulative financial liability under this Agreement shall be strictly capped at the **total fees actually paid by the Client hereunder (₹6,00,000)**.
2. **Carve-Out Exceptions**: The liability cap in Clause 8.3.1 shall **NOT apply to**, and neither Party’s liability shall be limited with respect to:
   (a) Breach of confidentiality obligations under Clause 6.1;
   (b) Willful misconduct, gross negligence, or intentional fraud;
   (c) Indemnification obligations for third-party intellectual property infringement under Clause 7.4;
   (d) Direct regulatory penalties or damages arising from material, un-remediated violation of the DPDP Act 2023 directly attributable to gross negligence or intentional act of the Party.

---

## 9. GOVERNING LAW & DISPUTE RESOLUTION

9.1 **Governing Law**: This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of India.

9.2 **Amicable Settlement**: In the event of any controversy, dispute, or claim arising out of or relating to this Agreement, the designated Project Leads shall first endeavor to resolve the dispute amicably within fifteen (15) days.

9.3 **Arbitration**: If unresolved amicably, the dispute shall be finally referred to and resolved by arbitration administered by a sole arbitrator mutually agreed upon by the Parties in accordance with the Arbitration and Conciliation Act, 1996. The seat, venue, and legal place of arbitration shall be **Nagpur, Maharashtra**. The language of arbitration shall be English.

9.4 **Jurisdiction**: Subject to Clause 9.3, the competent courts located in **Nagpur, Maharashtra** shall have exclusive jurisdiction over all legal proceedings arising out of this Agreement.

---

## 10. ATTACHMENTS & DOCUMENT VERSIONING

10.1 This Agreement expressly incorporates the following schedules, which form an integral, legally binding part of this Agreement:
- **Schedule A**: Statement of Work & Technical Deliverables Specification (Referencing Product Requirements Document **PRD v2.0**, dated November 2, 2026).
- **Schedule B**: Project Implementation Timeline, Dependency Map & Milestones Plan (**Timeline Plan v2.0**, dated November 2, 2026).

10.2 In the event of any direct conflict between the terms of this Agreement and any Schedule, the provisions of this Agreement shall prevail.

---

## 11. CHANGE MANAGEMENT & OUT-OF-SCOPE REQUESTS

11.1 Any request by the Client for feature modifications, technical enhancements, third-party integrations, or workflow changes not explicitly specified in the approved PRD v2.0 shall be treated as a formal **Change Request (CR)**.

11.2 **Change Order Procedure**:
1. The Client shall submit a written Change Request detailing the desired functional additions.
2. The Consultant shall, within three (3) business days, provide a written technical impact assessment detailing: (a) estimated engineering hours; (b) commercial cost impact calculated at the agreed rate of **₹2,500 per developer hour** (or agreed lump-sum sprint fee); and (c) required adjustment to delivery deadlines.
3. No work on any Change Request shall commence until a formal written Change Order has been signed by the Founder & Managing Director of Company A.

---

## 12. INFRASTRUCTURE, API & THIRD-PARTY OPERATIONAL COSTS

12.1 The contract fee of ₹6,00,000 covers software engineering, testing, and deployment services exclusively. The Client shall be directly responsible for all third-party recurring infrastructure, licensing, and operational usage expenses:
1. **Domain & Web Hosting**: Domain registration and cloud virtual server hosting (e.g., AWS, DigitalOcean, Hostinger VPS).
2. **AI & Vision OCR APIs**: Token consumption charges for AI bill reading services (e.g., Google Cloud Gemini / Cloud Vision API).
3. **WhatsApp Business API**: Account verification, BSP onboarding fees, and per-conversation template charges (Meta / Twilio / Gupshup).
4. **SMS Gateway**: Transactional SMS credits and Telecom Commercial Communications Customer Preference Regulations (TCCCPR / DLT) registration fees in India.
5. **Database & Storage**: Managed database instances and cloud object storage (e.g., AWS S3, Google Cloud Storage).
6. **SSL Certificates**: Commercial SSL/TLS certificates and domain validation renewals.

12.2 The Consultant shall configure, connect, and optimize these third-party services during implementation at no extra labor charge, but all direct billing accounts shall be established in Company A’s name.

---

## 13. SOURCE CODE HANDOVER, CREDENTIAL DELIVERY & KNOWLEDGE TRANSFER

13.1 **Handover Assets**: Following the clearance of the Milestone M4 payment and full settlement of the ₹6,00,000 consideration, the Consultant shall deliver the complete, unencumbered handover package to the Client, comprising:
1. **Source Code**: Unminified, fully documented source code for both frontend and backend repositories hosted on a private Git repository designated by Company A, with complete version commit history.
2. **Deployment Packages**: Production build configurations, container definitions (Dockerfile), and complete environment variable specifications (`.env.example`).
3. **Database Architecture**: Full database schemas, collections, table definitions, indexing configurations, and automated migration scripts.
4. **API Documentation**: Comprehensive OpenAPI / REST documentation specifying all endpoints, request/response JSON schemas, error codes, and authentication parameters.
5. **Access Credentials**: Master administrator credentials, production API keys, service account JSON files, and cloud dashboard logins.

13.2 **Knowledge Transfer Sessions**: The Consultant shall conduct **four (4) hours** of interactive, recorded knowledge transfer and architectural walkthrough sessions with Company A’s technical staff and project coordinators, covering platform administration, dated subsidy rule management, and disaster recovery procedures.

---

## IN WITNESS WHEREOF, THE PARTIES HERETO HAVE DULY EXECUTED THIS AGREEMENT BY THEIR AUTHORIZED SIGNATORIES ON THE DAY AND YEAR FIRST ABOVE WRITTEN.

### For and on behalf of Client:
**COMPANY A SOLAR PVT. LTD.**

________________________________________  
**Authorized Signatory**  
Name: Founder & Managing Director  
Title: Managing Director  
Company Seal:  

**Witness 1**:  
Signature: _____________________________  
Name: ________________________________  
Address: Civil Lines, Nagpur, Maharashtra  

---

### For and on behalf of Consultant:
**SOFTWARE DEVELOPMENT SERVICE PROVIDER**

________________________________________  
**Authorized Signatory**  
Name: Lead Software Engineer / Contractor  
Title: Principal Consultant  

**Witness 2**:  
Signature: _____________________________  
Name: ________________________________  
Address: ______________________________  
