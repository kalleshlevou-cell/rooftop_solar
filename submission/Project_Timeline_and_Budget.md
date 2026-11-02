# Project Implementation Timeline, Budget & Governance Plan
## Software Platform Development for Company A, Nagpur
### Schedule B to the Master Software Development & Professional Services Agreement

**Client Organization**: Company A Solar Pvt. Ltd., Nagpur  
**Project Scope**: Custom Rooftop Solar Lead Qualification, Quotation Engine & Milestone Tracking Suite  
**Document Reference**: Schedule B (Timeline Plan v2.0)  
**Total Commercial Value**: ₹6,00,000 (INR 6 Lakh, Exclusive of Applicable GST)  
**Total Duration**: 6 Calendar Weeks (42 Calendar Days)  
**Warranty Period**: 60 Calendar Days commencing upon actual production deployment or 14 calendar days post-M4 formal acceptance, whichever occurs earlier (support hours: 09:30–18:30 IST, Monday–Saturday, excluding public holidays)  
**Change Request Rate**: ₹2,500 per developer hour (subject to signed approval)  
**Document Status**: Draft for Technical & Commercial Assessment – Pending Client Approval  

---

## 1. Commercial Structure & Financial Inputs

### 1.1 Classification of Inputs, Assumptions & Facts
- **Supplied Commercial Inputs (Contractual)**: Total development fee of **₹6,00,000** allocated across four milestone payments; target delivery window of **6 weeks**.
- **Working Engineering Assumptions**: Company A will provide sample historical MSEDCL bills (anonymized), representative cost schedules for Tier-1 modules/inverters, and access to internal sales/survey personnel for User Acceptance Testing (UAT).
- **Verified Policy Facts**: Central PM Surya Ghar subsidy rates for general-state residential consumers (₹30,000/kW up to 2 kW, ₹18,000/kW from 2 kW to 3 kW with fractional capacity support, capped at ₹78,000; commercial excluded) and MSEDCL LT-I domestic tariff slabs across Nagpur/Vidarbha.

### 1.2 Budget Breakdown by Deliverable Category
The ₹6,00,000 fixed-price fee is distributed across technical work packages as follows:

| Work Package | Deliverable Description | Budget Allocation (₹) | % Share |
| :--- | :--- | :---: | :---: |
| **WP-1: Architecture & Dated Subsidy Engine** | Express REST APIs, dated rule database, DPDP security controls | ₹1,50,000 | 25.0% |
| **WP-2: AI Bill OCR & Qualification Logic** | MSEDCL OCR parser, side-by-side verification UI, qualification engine | ₹1,50,000 | 25.0% |
| **WP-3: Quotation Engine & Tracking Portal** | "Simple Story" UI, vector PDF generator, public tracking link (`/track/:token`) | ₹1,50,000 | 25.0% |
| **WP-4: SLA Monitor, Localized Comms & UAT** | Internal monitoring threshold dashboard, WhatsApp simulation, training & go-live | ₹1,50,000 | 25.0% |
| **TOTAL CONTRACT PRICE** | **Full-Stack Software Development & Deployment** | **₹6,00,000** | **100.0%** |

---

## 2. Six-Week Implementation Schedule & Dependency Map

```
[Week 1: Architecture & Dated Subsidy Engine]
  │ (Depends on: Client written approval of PRD v2.0 & baseline rate card)
  ▼
[Week 2: Multilingual Lead Form & AI OCR Verification]
  │ (Depends on: 30 sample MSEDCL bills supplied by Client)
  ▼
[Week 3: Qualification Scoring & Sizing Algorithm]
  │ (Depends on: Client approval of qualification threshold criteria)
  ▼
[Week 4: Quotation Builder & Vector PDF Generator]
  │ (Depends on: Client sign-off on quote template branding & payment milestones)
  ▼
[Week 5: 8-Stage Tracker, Public Status Link & Internal SLA Monitor]
  │ (Depends on: Client validation of MSEDCL liaisoning stages & monitoring days)
  ▼
[Week 6: Notification Simulation, Nagpur Pilot, UAT & Handover]
    (Depends on: Pilot execution with 10 Company A staff & Founder-MD sign-off)
```

---

## 3. Weekly Work Breakdown Structure (WBS) with Dependencies & Acceptance Criteria

### Week 1: Data Architecture, Security & Dated Subsidy Engine
- **Technical Scope**:
  - Full-stack project setup (React + Vite + Express + Node.js).
  - Database schema for leads, quotes, active projects, audit history, and subsidy rule tables.
  - Development of the Date-Effective Subsidy Calculation Engine supporting the active PM Surya Ghar scheme and legacy Phase II schemes.
  - Integration of DPDP Act 2023 technical safeguards (masking algorithms and consent logs).
- **Prerequisites & Dependencies**: Formal written approval of Schedule A (PRD v2.0); delivery of Company A’s current module and structure price card.
- **Client Responsibilities**: Company A Founder-MD reviews and approves the subsidy rate logic and pricing schedules in writing.
- **Contractor Responsibilities**: Deliver core API, schema migration, and unit test suite verifying date-effective subsidy calculations.
- **Formal Acceptance Criteria**:
  1. `POST /api/quotes/calculate` returns exact PM Surya Ghar subsidies (1 kW: ₹30,000; 2 kW: ₹60,000; 3 kW+: ₹78,000).
  2. Subsidy engine correctly switches between historical (pre-Feb 2024) and current rules based on quote date.
  3. Consumer numbers can be masked (`04901*****31`) with a toggle.

---

### Week 2: Multilingual Lead Intake & Side-by-Side OCR Reader
- **Technical Scope**:
  - Trilingual translation framework (Marathi, Hindi, English).
  - Mobile-responsive customer intake form: Owner vs Tenant selector, roof type (RCC, Metal, Tile) and area, bill amount, Vidarbha pincode.
  - AI Bill Reading service extracting consumer number, tariff, connected load, and monthly units.
  - Side-by-side verification interface allowing human review and manual override directly beside the bill image.
  - Image quality check warning for blurry/dark uploads (&lt; 60% quality score, distinguished from OCR extraction confidence).
- **Prerequisites & Dependencies**: Completion of Week 1 schema; provision of 30 sample MSEDCL bills from Vidarbha circles.
- **Client Responsibilities**: Supply sample bill photos spanning residential circles (Dharampeth, Sadar, Gandhibagh, Laxmi Nagar) and review Marathi/Hindi wording.
- **Contractor Responsibilities**: Implement front-end form, OCR extraction service, side-by-side verification modal, and language toggle.
- **Formal Acceptance Criteria**:
  1. Form renders smoothly on mobile viewports (360px–420px width).
  2. Language switcher updates all UI labels instantly across Marathi, Hindi, and English.
  3. Side-by-side modal accurately displays extracted values alongside the bill image and allows manual editing.
  4. Uploading a blurry image reliably displays a `Quality Warning: Image blurry` alert.

---

### Week 3: Qualification Logic & Surveyor Cost-Saving Routing
- **Technical Scope**:
  - Automated qualification algorithm implementing the "Low score never rejects a lead" principle.
  - Automatic routing of `High` leads to on-site surveys and `Low` leads (tenants or bills &lt; ₹1,000) to 5-minute phone consultations.
  - Solar sizing logic based on the 1,400 kWh/kW/yr Vidarbha constant (Monthly Units / 116.7).
  - Real-time survey savings counter (tallying ₹2,500 per bypassed trip).
- **Prerequisites & Dependencies**: Completion of Week 2 intake form and OCR parser.
- **Client Responsibilities**: Company A Sales Manager validates qualification threshold values (e.g. ₹1,000 bill cutoff).
- **Contractor Responsibilities**: Implement qualification logic, tagging system, and savings metric calculations in REST API.
- **Formal Acceptance Criteria**:
  1. Test lead `LD-30881` (Prashant Wankhede, Owner, ₹3,200) qualifies as `High` with 3 kW recommendation.
  2. Test lead `LD-30902` (Rohit Meshram, Tenant, ₹1,900) qualifies as `Low (tenant)` with phone call recommendation and logs ₹2,500 saved.
  3. Test lead `LD-30915` (Ayesha Siddiqui, Owner, ₹650) qualifies as `Low (small bill)` with 1 kW advice call recommendation and logs ₹2,500 saved.

---

### Week 4: Quotation Builder & Client-Side Vector PDF Generator
- **Technical Scope**:
  - "Simple Story First" customer presentation: System Size, Net Cost After Subsidy, Payback Period, and Yearly Savings.
  - Interactive equipment selection (Tier-1 Mono PERC DCR vs TOPCon Bifacial; standard vs elevated terrace superstructure).
  - 25-Year financial model factoring 0.7%/yr degradation and 4.5%/yr tariff escalation.
  - Client-side vector PDF generation (`jspdf` + `jspdf-autotable`) with Company A branding, technical scope, warranty terms, and 4 payment milestones.
- **Prerequisites & Dependencies**: Completion of Week 1 subsidy engine and Week 3 qualification outputs.
- **Client Responsibilities**: Deliver high-resolution Company A logo, official quote terms, and authorized signatory details.
- **Contractor Responsibilities**: Build interactive quotation UI and implement high-resolution vector PDF generator.
- **Formal Acceptance Criteria**:
  1. Quote computes and displays within 200ms upon selecting system capacity.
  2. PDF downloads cleanly on both mobile and desktop with correct pricing, subsidy, and milestone schedules.
  3. Financial breakdown reconciles exactly: Gross Cost minus Subsidy equals Net Cost.

---

### Week 5: 8-Stage Tracker, Public Status Link & Internal SLA Monitor
- **Technical Scope**:
  - 8-Stage project lifecycle pipeline tracking progress from advance to DBT release.
  - Public customer tracking link (`/track/:token`) accessible via smartphone without password authentication.
  - Customer Document Locker for survey reports, agreements, sanction letters, and subsidy receipts.
  - Stuck Projects Monitor flagging projects exceeding internal monitoring thresholds (MSEDCL sanction threshold: 10 days; DBT release threshold: 20 days) with one-click escalation.
  - Mock payment gateway operating in simulation mode for demonstrating milestone advance workflows.
- **Prerequisites & Dependencies**: Completion of Week 4 quote generation and payment milestone definitions.
- **Client Responsibilities**: Validate internal operational monitoring thresholds for Nagpur urban and rural circles.
- **Contractor Responsibilities**: Implement project pipeline views, public tracking endpoint, internal threshold alert logic, and mock payment simulation.
- **Formal Acceptance Criteria**:
  1. Navigating to `/track/:token` displays sanitized progress, document locker, and milestone payments without authentication.
  2. Projects with elapsed days exceeding internal monitoring thresholds appear prominently in the Stuck Projects Alert Center.
  3. Executing a mock payment successfully advances lead status to `QUOTE_APPROVED` and logs the transaction.

---

### Week 6: Notification Simulation, Nagpur Pilot, UAT & Handover
- **Technical Scope**:
  - WhatsApp & SMS notification dispatcher operating in simulation mode with pre-built Marathi, Hindi, and English templates.
  - Interactive message simulation interface and audit trail.
  - End-to-end regression testing (`test-e2e.js`) with agreed acceptance threshold (100% of internal platform test suites pass, excluding third-party network outages).
  - Staff training workshop and delivery of operational manuals.
- **Prerequisites & Dependencies**: Completion of all previous modules (Weeks 1–5).
- **Client Responsibilities**: Assemble 10 sales and survey staff members for a 3-hour training and UAT session; execute Founder-MD acceptance sign-off.
- **Contractor Responsibilities**: Conduct UAT, resolve reproducible defects within agreed SLAs, deploy production bundle, and conduct knowledge transfer.
- **Formal Acceptance Criteria**:
  1. Agreed automated regression test suite (`test-e2e.js`) achieves 100% pass rate on internal application code.
  2. Company A staff successfully execute full workflow from bill upload to PDF quote and status link during UAT.
  3. Founder-MD signs formal Certificate of Acceptance.

---

## 4. Milestone Payment Schedule (Tied to Client Approvals)

Payments under the software services agreement are strictly milestone-based:

| Milestone | Deliverable Scope | Target Timeline | Verification & Acceptance Criteria | Amount Payable (₹) | Share |
|---|---|---|---|---:|---:|
| **M1** | **Architecture, Data Schemas & Subsidy Engine** | End of Week 1 | Client approves PRD v2.0 in writing; schema deployed; dated subsidy engine passing unit tests. | ₹1,50,000 | 25% |
| **M2** | **Intake Form & AI OCR Verification** | End of Week 2 | Form live in EN/MR/HI; side-by-side OCR verification and blurriness alert working. | ₹1,50,000 | 25% |
| **M3** | **Quotation Builder & Public Tracker** | End of Week 4 | PDF quote generator validated; public `/track/:token` active; qualification rules active. | ₹1,50,000 | 25% |
| **M4** | **SLA Monitor, Nagpur Pilot, UAT & Handover** | End of Week 6 | Agreed regression test suite passing; staff training completed; Founder-MD sign-off. | ₹1,50,000 | 25% |
| **TOTAL** | | | **Full Platform Delivery** | **₹6,00,000** | **100%** |

---

## 5. Responsibility Assignment Matrix (RACI)

| Deliverable / Task | Software Consultant | Company A Founder-MD | Company A Sales Lead | Company A Ops Lead |
| :--- | :---: | :---: | :---: | :---: |
| **Requirements Sign-off** | Responsible | Accountable | Consulted | Consulted |
| **Pricing & Subsidy Rate Card** | Consulted | Accountable | Consulted | Informed |
| **MSEDCL Sample Bills** | Consulted | Informed | Responsible | Consulted |
| **OCR Verification Interface** | Responsible | Informed | Accountable | Consulted |
| **Quotation PDF Branding** | Responsible | Accountable | Consulted | Informed |
| **Internal Thresholds & SLA** | Consulted | Informed | Consulted | Accountable |
| **User Acceptance Testing (UAT)** | Responsible | Accountable | Responsible | Responsible |
| **Production Go-Live Sign-off** | Consulted | Accountable | Informed | Informed |

*(Legend: **R**esponsible = Executes work; **A**ccountable = Approves work; **C**onsulted = Supplies input; **I**nformed = Kept updated)*

---

## 6. Risk Management & Contingency Matrix

| Risk Event | Severity | Likelihood | Impact on Delivery | Pre-emptive Mitigation Plan |
| :--- | :---: | :---: | :--- | :--- |
| **Delayed Client Feedback on Rate Cards** | High | Low | Slips Week 2 UI design | Day-for-day extension under Clause 3.2; standard default fallback rates pre-loaded in seed data. |
| **MSEDCL Bill Variations in Vidarbha** | Medium | Medium | Incomplete OCR extraction | Side-by-side verification modal allows sales staff to verify/override values in &lt; 5 seconds. |
| **Staff Hesitation to Use New Tools** | High | Medium | Slow adoption in field | Dedicated training workshop in Week 6; mobile-first interface optimized for ease of use. |
| **Central Subsidy Policy Changes** | Low | Low | Breaks subsidy calculations | Architecture uses date-effective rule tables; new rules can be added without code refactoring. |
