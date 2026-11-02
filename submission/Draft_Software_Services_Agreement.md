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

1.1 **Development Scope**: The Consultant agrees to design, engineer, test, deliver, and support a bespoke web application suite tailored for Company A’s Vidarbha rooftop solar operations, comprising the following eight core functional modules:
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

2.1 **Project Duration**: The development, testing, and deployment of the software platform shall be completed within **six (6) calendar weeks** from the Effective Date, subject to the Client fulfilling its dependency obligations under Clause 3.

2.2 **Contract Value**: The total fixed-price fee for the complete scope of services under this Agreement shall be **₹6,00,000 (Indian Rupees Six Lakh Only)**, exclusive of applicable Goods and Services Tax (GST).

2.3 **Milestone Payment Schedule**: The Client shall remit payments to the Consultant based strictly on verified technical milestones and acceptance criteria:

| Milestone | Deliverable Scope | Target Timeline | Verification & Acceptance Criteria | Amount Payable (₹) | Share |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **M1** | **Architecture, Data Schemas & Subsidy Engine** | End of Week 1 | PRD v2.0 approved; Express REST APIs live; dated subsidy engine passing test cases for PM Surya Ghar and Phase II schemes. | ₹1,50,000 | 25% |
| **M2** | **Intake Form & AI OCR Verification** | End of Week 2 | Form deployed in Marathi/Hindi/English; side-by-side OCR verification and blurriness alert fully functional. | ₹1,50,000 | 25% |
| **M3** | **Quotation Builder & Public Tracker** | End of Week 4 | Vector PDF quote generator operational; public `/track/:token` active; qualification routing verified. | ₹1,50,000 | 25% |
| **M4** | **SLA Monitor, Nagpur Pilot, UAT & Handover** | End of Week 6 | 100% automated test suite passing; staff training completed; Founder-MD sign-off. | ₹1,50,000 | 25% |
| **TOTAL** | | | **Full Platform Delivery** | **₹6,00,000** | **100%** |

2.4 **Payment Terms**: The Client agrees to release milestone payments via electronic bank transfer (NEFT/RTGS/IMPS) within **five (5) business days** of receiving the Consultant’s milestone invoice and accompanying Certificate of Acceptance.

---

## 3. CLIENT OBLIGATIONS & DEPENDENCIES

3.1 To maintain the agreed six-week schedule, the Client shall:
1. Provide thirty (30) anonymized sample MSEDCL electricity bills from Vidarbha circles within three (3) business days of signing.
2. Furnish official rate cards for PV modules, inverters, elevated structures, and standard payment milestones within five (5) business days.
3. Review and provide consolidated feedback on weekly milestone deliverables within three (3) business days of presentation.
4. Designate a dedicated Project Lead (Sales / Operations Manager) as the single point of contact for operational queries.
5. Provide ten (10) sales and survey staff members for the User Acceptance Testing (UAT) session in Week 6.

---

## 4. ACCEPTANCE TESTING & DEFECT REMEDIATION

4.1 **Review Window**: Following delivery of each milestone build, the Client shall have **five (5) business days** ("Acceptance Period") to review the deliverables against the agreed acceptance criteria specified in the Statement of Work.

4.2 **Defect Classification**:
- **Critical Defect**: Application crash, data loss, failure to calculate subsidies accurately according to the active scheme, or non-functional PDF generation. Critical defects shall be resolved by the Consultant within **forty-eight (48) hours** at no additional cost.
- **Major Defect**: Significant functional flaw with a temporary workaround available. Remediation window: **four (4) business days**.
- **Minor Defect**: Cosmetic, minor styling, or typographical issues. Remediation window: scheduled for the subsequent weekly sprint.

4.3 **Deemed Acceptance**: If the Client does not provide written notification of reproducible defects within the five-day Acceptance Period, the milestone shall be deemed accepted, and the corresponding invoice shall become payable.

---

## 5. INTELLECTUAL PROPERTY RIGHTS & OWNERSHIP

5.1 **Work-for-Hire**: Upon full and final receipt of the total contract consideration (₹6,00,000 plus applicable taxes), all rights, title, interest, and intellectual property in and to the custom source code, database architectures, user interface designs, scripts, documentation, and algorithms developed specifically for Company A under this Agreement shall vest exclusively in the Client as a "work-for-hire".

5.2 **Delivery of Assets**: Upon milestone M4 sign-off and settlement of dues, the Consultant shall deliver:
1. Complete, unminified source code in a private Git repository with full commit history.
2. Production build packages and environment configuration files (`.env.example`).
3. Database migration scripts and administrative documentation.

5.3 **Pre-Existing Frameworks & Open-Source Software**: The Client acknowledges that the platform incorporates standard, permissive open-source frameworks (e.g., Node.js, Express, React, Tailwind CSS, jsPDF under MIT / Apache 2.0 licenses). The Consultant warrants that no proprietary copyleft licenses (e.g., GNU GPL) that would require the Client to open-source its proprietary business logic are utilized.

---

## 6. DATA PRIVACY, CONFIDENTIALITY & DPDP ACT 2023

6.1 **Confidentiality**: Each Party agrees to maintain the strict confidentiality of all proprietary business information, customer lists, pricing cards, and operational procedures disclosed by the other Party during the course of the engagement.

6.2 **Personal Data Protection**:
1. The Consultant acknowledges that consumer numbers, mobile numbers, and site addresses entered into the platform constitute personal data under the **Digital Personal Data Protection (DPDP) Act, 2023**.
2. The Consultant shall implement technical safeguards including database field masking, TLS encryption in transit, purpose-limited consent checkboxes, and unguessable public tracking tokens.
3. The Consultant covenants that it shall not retain, harvest, replicate, sell, or disclose the Client’s customer data to any third party for commercial or advertising purposes.

---

## 7. WARRANTIES & POST-DEPLOYMENT SUPPORT

7.1 **Performance Warranty**: The Consultant warrants that for a period of **sixty (60) calendar days** following production go-live (Milestone M4 sign-off), the platform shall operate substantially in accordance with the specifications in the PRD. The Consultant shall remediate reproducible software bugs without additional charge during this warranty period.

7.2 **Warranty Exclusions**: The warranty shall not cover issues arising from:
1. Unauthorized modifications to source code by Client personnel or third parties.
2. Outages or changes in external third-party infrastructure (e.g., MSEDCL portal re-architecture, browser vendor deprecations).
3. Failure of Client-managed hosting environments.

7.3 **Non-Infringement**: The Consultant warrants that all original custom software delivered hereunder does not infringe upon any copyright, patent, trademark, or trade secret of any third party.

---

## 8. TERMINATION & LIMITATION OF LIABILITY

8.1 **Termination for Cause**: Either Party may terminate this Agreement immediately upon written notice if the other Party commits a material breach and fails to cure such breach within **fourteen (14) business days** of receiving written notification.

8.2 **Termination for Convenience**: The Client may terminate this Agreement for convenience by providing **ten (10) business days'** written notice, provided the Client compensates the Consultant for all verified, completed milestones and a pro-rata share of active work-in-progress up to the effective termination date.

8.3 **Limitation of Liability**: To the maximum extent permitted by applicable law, neither Party shall be liable for indirect, incidental, or consequential damages. The Consultant’s aggregate cumulative financial liability under this Agreement, regardless of the form of action, shall be strictly capped at the **total fees actually paid by the Client hereunder (₹6,00,000)**.

---

## 9. GOVERNING LAW & DISPUTE RESOLUTION

9.1 **Governing Law**: This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of India.

9.2 **Amicable Settlement**: In the event of any controversy, dispute, or claim arising out of or relating to this Agreement, the designated Project Leads shall first endeavor to resolve the dispute amicably within fifteen (15) days.

9.3 **Arbitration**: If unresolved amicably, the dispute shall be finally referred to and resolved by arbitration administered by a sole arbitrator mutually agreed upon by the Parties in accordance with the Arbitration and Conciliation Act, 1996. The seat, venue, and legal place of arbitration shall be **Nagpur, Maharashtra**. The language of arbitration shall be English.

9.4 **Jurisdiction**: Subject to Clause 9.3, the competent courts located in **Nagpur, Maharashtra** shall have exclusive jurisdiction over all legal proceedings arising out of this Agreement.

---

## 10. ENTIRE AGREEMENT & MISCELLANEOUS

10.1 This Agreement, together with the Product Requirements Document (PRD) and Statement of Work, constitutes the entire understanding between the Parties, superseding all prior oral or written discussions, proposals, and representations.

10.2 Any amendments or modifications to this Agreement shall be valid only if executed in writing and signed by authorized representatives of both Parties.

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
