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

| Work Package | Deliverable Description | Target Period | Budget Allocation (₹) | % Share |
| :--- | :--- | :---: | :---: | :---: |
| **WP-1: Architecture & Dated Subsidy Engine** | Week 1 architecture, schemas, API specifications, DPDP security controls, and dated subsidy engine | Week 1 | ₹1,50,000 | 25.0% |
| **WP-2: Lead Intake, OCR & Qualification Logic** | Weeks 2–3 intake form, OCR extraction, side-by-side verification UI, and qualification engine | Weeks 2–3 | ₹1,50,000 | 25.0% |
| **WP-3: Quotation Engine & Public Tracking Portal** | Weeks 4–5 "Simple Story" UI, vector PDF generator, 8-stage tracker, and public status link (`/track/:token`) | Weeks 4–5 | ₹1,50,000 | 25.0% |
| **WP-4: SLA Monitor, Localized Comms & UAT** | Weeks 5–6 bottleneck monitor, WhatsApp/SMS simulation, formal 5-day UAT, staff training & handover | Weeks 5–6 | ₹1,50,000 | 25.0% |
| **TOTAL CONTRACT PRICE** | **Full-Stack Software Development & Deployment** | **Weeks 1–6** | **₹6,00,000** | **100.0%** |

*(Note: Work-package values represent internal engineering resource allocations and planning benchmarks, not separate billing or payment triggers. Billing and invoicing are strictly governed by formal Client sign-off on the four contractual technical milestones M1–M4 under Section 4 and Agreement Clause 2.3.)*

### 1.3 Scope Prioritization Framework
To protect delivery feasibility within the strict 6-week timeframe and ₹6,00,000 fixed-price budget, deliverables are explicitly categorized into four delivery tiers:
- **Must-Have (Committed Functional Scope)**:
  1. Lead intake form with property owner vs tenant routing (virtual phone consultation for property authorization/consent).
  2. Side-by-side MSEDCL bill OCR reader with normalized 0–100 image quality score and per-field character extraction confidence.
  3. Algorithmic qualification engine with cost-saving phone consultation routing and preliminary sizing advisory.
  4. Date-effective subsidy calculation engine (PM Surya Ghar fractional formula up to ₹78,000 cap; verified historical Phase II dataset support; commercial exclusion).
  5. Interactive quotation builder and vector PDF generator with versioned Client-approved rate cards ($Net = Gross - Subsidy$).
  6. 8-Stage project tracker with evidence-gated Stage 8 DBT completion (verified bank reference or National Portal credit confirmation).
  7. Public zero-login customer status link (`/track/:token`) with cryptographically random tokens (≥128 bits entropy) and IP rate limiting.
  8. Internal SLA bottleneck alert dashboard with monitoring thresholds and draft escalation records.
  9. **Mandatory DPDP Act 2023 Technical Safeguards**: Purpose-limited consent capture, consumer number and address masking (`04901*****31`), access logging of customer documents, and 14-day local dev data wipe protocol.
  10. **Committed Multilingual Localization**: Marathi, Hindi, and English labels across all core intake, quote, and tracker interfaces; approved notification templates in all three languages.
- **Should-Have (Enhanced Experience Scope)**:
  1. Full translation of secondary administrative screens and non-essential backend reports.
  2. Customer Document Locker for downloadable project files.
  3. Administrative pricing rate card editor and dated subsidy rule tester.
- **Simulation-Only (Demonstration & Audit Scope)**:
  1. Mock payment gateway simulating advance UPI/NetBanking transactions without live money movement.
  2. Localized WhatsApp and SMS simulation generating visual CRM audit logs without live carrier dispatch.
- **Explicitly Excluded (Out-of-Scope Boundaries)**:
  1. Automated CAPTCHA/Aadhaar bot submissions to the National Subsidy Portal.
  2. Internal warehouse inventory, procurement, and physical logistics ERP modules.
  3. Inverter IoT string telemetry and live generation monitoring.
  4. Third-party commercial payment gateway merchant underwriting and live carrier SMS/WhatsApp API charges (paid directly by Client under Agreement Clause 12).

---

## 2. Six-Week Implementation Schedule & Dependency Map

```
[Week 1: Architecture & Dated Subsidy Engine]
  │ (Depends on: Client written approval of PRD v2.0 & baseline rate card)
  ▼
[Week 2: Multilingual Lead Form & AI OCR Verification]
  │ (Depends on: 30 anonymized sample MSEDCL bills supplied within 3 business days)
  ▼
[Week 3: Qualification Scoring & Sizing Algorithm]
  │ (Depends on: Client approval of qualification threshold criteria)
  ▼
[Week 4: Quotation Builder & Vector PDF Generator]
  │ (Depends on: Client written approval of quote template branding, rate cards & payment milestones)
  ▼
[Week 5: 8-Stage Tracker, Public Status Link & Internal SLA Monitor]
  │ (Depends on: Client validation of MSEDCL liaisoning stages & operational monitoring thresholds)
  ▼
[Week 6: Notification Simulation, Formal 5-Day UAT, Training & Handover]
    (Depends on: Feature freeze at start of W6, 10 staff for UAT, Founder-MD sign-off)
```

---

## 3. Weekly Work Breakdown Structure (WBS) with Dependencies & Acceptance Criteria

### Week 1: Data Architecture, Security & Dated Subsidy Engine
- **Technical Scope**:
  - Full-stack project setup (React + Vite + Express + Node.js).
  - Database schema for leads, quotes, active projects, audit history, and subsidy rule tables.
  - Development of the Date-Effective Subsidy Calculation Engine supporting the active PM Surya Ghar scheme and legacy Phase II schemes.
  - Integration of mandatory DPDP Act 2023 technical safeguards (masking algorithms, purpose-limited consent capture, and access logs).
- **Prerequisites & Dependencies**: Formal written approval of Schedule A (PRD v2.0); provision of thirty (30) anonymized sample MSEDCL electricity bills from Vidarbha circles within three (3) business days of project commencement, with written authorization for processing and testing; delivery of Client-approved baseline equipment rate cards (modules, inverters, structures, taxes).
- **Client Responsibilities**: Company A Founder-MD reviews and approves the subsidy rate logic and pricing schedules in writing; provides sample bills within 3 business days.
- **Contractor Responsibilities**: Deliver core API, schema migration, and unit test suite verifying date-effective subsidy calculations and DPDP masking.
- **Formal Acceptance Criteria**:
  1. `POST /api/quotes/calculate` returns exact PM Surya Ghar subsidies (1 kW: ₹30,000; 2 kW: ₹60,000; 2.5 kW: ₹69,000; 3 kW+: ₹78,000; commercial: ₹0).
  2. The subsidy engine selects the applicable approved, date-effective rule using the relevant scheme eligibility date, including the National Portal application submission date and applicable transitional provisions. Quote creation date is retained for audit purposes and does not independently determine subsidy eligibility. (Historical Phase II rules are enabled once the Client supplies and approves a verified historical rule dataset).
  3. Consumer numbers can be masked (`04901*****31`) with a toggle and consent logs are stored.

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
  1. Test lead `LD-30881` (synthetic test record: Prashant Wankhede, Owner, ₹3,200 bill, 350 kWh monthly consumption) qualifies as `High` with a preliminary calculation of 3 kW ($\text{Round}(350 / 116.7) = 3\text{ kW}$), eligible for priority survey scheduling.
  2. Test lead `LD-30902` (synthetic test record: Rohit Meshram, Tenant, ₹1,900 bill, 200 kWh) qualifies as `Low (tenant)` with virtual consultation for landlord consent and property authorization. Logs potential ₹2,500 avoided survey cost.
  3. Test lead `LD-30915` (synthetic test record: Ayesha Siddiqui, Owner, ₹650 bill, 68 kWh) is classified as `Low (small bill)`, routed to a virtual guidance call, and shown a low-consumption advisory. No 1 kW installation recommendation shall be generated unless verified consumption-based calculation and technical review support it. Logs potential ₹2,500 avoided survey cost.
  4. *(Note: All named test profiles are synthetic test fixtures created solely for automated regression and contain no actual consumer personal data).*

---

### Week 4: Quotation Builder & Client-Side Vector PDF Generator
- **Technical Scope**:
  - "Simple Story First" customer presentation: System Size, Net Cost After Subsidy, Payback Period, and Yearly Savings.
  - Interactive equipment selection (Tier-1 Mono PERC DCR vs TOPCon Bifacial; standard vs elevated terrace superstructure).
  - 25-Year financial model factoring 0.7%/yr degradation and 4.5%/yr tariff escalation.
  - Client-side vector PDF generation (`jspdf` + `jspdf-autotable`) with Company A branding, technical scope, warranty terms, and 4 payment milestones.
- **Prerequisites & Dependencies**: Completion of Week 1 subsidy engine and Week 3 qualification outputs; written delivery of Client-approved pricing rate cards.
- **Client Responsibilities**: Deliver high-resolution Company A logo, approved equipment rate cards, official quote terms, and authorized signatory details within three (3) business days of request.
- **Contractor Responsibilities**: Build interactive quotation UI, integrate rate cards, and implement high-resolution vector PDF generator.
- **Formal Acceptance Criteria**:
  1. The quotation calculation response completes within 200 ms at the 95th percentile under an agreed test environment and representative test dataset, excluding external API latency, PDF rendering, and network transfer time.
  2. PDF downloads cleanly on both mobile and desktop with correct pricing, subsidy, and milestone schedules.
  3. Financial breakdown reconciles exactly: Gross System Price (from Client rate card) minus Applicable Approved Subsidy equals Net Customer Cost.

---

### Week 5: 8-Stage Tracker, Public Status Link & Internal SLA Monitor
- **Technical Scope**:
  - 8-Stage project lifecycle pipeline tracking progress from advance to DBT release, with Stage 8 strictly governed by verified credit evidence (never inferred from elapsed days).
  - Public customer tracking link (`/track/:token`) accessible via smartphone without password authentication, using cryptographically random tokens (≥128 bits entropy) and IP rate limiting (HTTP 429 upon exceeding 60 requests/minute).
  - Customer Document Locker with access logging and token authorization; sensitive documents are never exposed merely by guessing tokens.
  - Mandatory DPDP Act 2023 technical safeguards verification: consumer number masking (`04901*****31`), purpose-limitation consent logs, and secure tokenization.
  - Stuck Projects Monitor flagging projects exceeding internal monitoring thresholds (MSEDCL sanction threshold: 10 days; DBT release threshold: 20 days) with internal escalation logging and draft escalation communications.
  - SLA clock governance: Each SLA clock has a documented start event, stop event, pause condition, and responsible owner, displaying elapsed calendar days and reference dates as internal operational alerts only (not statutory deadlines).
  - Mock payment gateway operating in simulation mode for demonstrating milestone advance workflows.
- **Prerequisites & Dependencies**: Completion of Week 4 quote generation and payment milestone definitions.
- **Client Responsibilities**: Validate internal operational monitoring thresholds for Nagpur urban and rural circles within three (3) business days.
- **Contractor Responsibilities**: Implement project pipeline views, public tracking endpoint, internal threshold alert logic, and mock payment simulation.
- **Formal Acceptance Criteria**:
  1. Navigating to `/track/:token` displays sanitized progress, document locker, and milestone payments without authentication; requests exceeding rate limits return HTTP 429.
  2. Projects with elapsed days exceeding internal monitoring thresholds appear prominently in the Stuck Projects Alert Center with documented reference events.
  3. Executing a mock payment successfully advances lead status to `QUOTE_APPROVED` and logs the transaction.
  4. Stage 8 requires manual entry of verified credit reference before advancing to complete.

---

### Week 6: Notification Simulation, Formal 5-Day UAT, Training & Handover
- **Technical Scope**:
  - WhatsApp & SMS notification dispatcher operating in simulation mode with pre-built Marathi, Hindi, and English templates (generating internal visual and audit logs without live carrier dispatch).
  - Feature development and internal integration testing frozen at the beginning of Week 6.
  - Formal five (5) business day User Acceptance Testing (UAT) window governed by Agreement Clause 4, with testing conducted against the agreed objective acceptance checklist by 10 designated Company A staff.
  - Contractual defect remediation adhering to Agreement Clause 4.2 SLAs:
    - **Critical Defect (Severity 1)**: Deploy verified fix or workaround within **forty-eight (48) hours** at no extra charge.
    - **Major Defect (Severity 2)**: Deploy verified fix within **four (4) business days**.
    - **Minor Defect (Severity 3)**: Resolved in next scheduled release / patch.
  - End-to-end regression testing (`test-e2e.js`) with agreed acceptance threshold (100% of internal platform test suites pass, excluding external third-party network outages).
  - Source code and asset handover under Agreement Clause 13: Git repository, production build artifacts, deployment instructions, schema DDL, and API documentation.
  - Four (4) hours of interactive recorded training for Company A sales, technical, and operations personnel (Clause 13.2).
  - Mandatory DPDP Act 2023 14-day data wipe protocol executed for all development and local staging environments under Consultant control.
  - Project delivery period and acceptance-review period are governed by Agreement Clause 4; any Client-caused delays in dependencies, feedback (beyond 3 business days), or UAT attendance automatically extend the project timeline on a day-for-day basis under Clause 3.2.
- **Prerequisites & Dependencies**: Completion of all previous modules (Weeks 1–5); feature freeze at start of Week 6.
- **Client Responsibilities**: Assemble 10 sales and survey staff members for formal 5-day UAT session; execute Founder-MD acceptance sign-off.
- **Contractor Responsibilities**: Support UAT, resolve reproducible defects within agreed SLAs, deploy production bundle, conduct 4 hours of training, and execute complete IP/asset handover.
- **Formal Acceptance Criteria**:
  1. Agreed automated regression test suite (`test-e2e.js`) achieves 100% pass rate on internal application code.
  2. Company A staff successfully execute full workflow from bill upload to PDF quote and status link during formal 5-day UAT.
  3. Complete source code, schemas, and API documentation delivered and verified in Client environment.
  4. Four (4) hours of interactive recorded training conducted with attendance record.
  5. Founder-MD signs formal Certificate of Acceptance.

---

## 4. Milestone Payment Schedule (Tied to Client Approvals)

Payments under the software services agreement are strictly milestone-based:

| Milestone | Deliverables | Target Timeline | Acceptance Evidence & Verification Criteria | Amount Payable (₹) | Share |
|---|---|---|---|---:|---:|
| **M1** | **Architecture, Data Schemas & Subsidy Engine** | End of Week 1 | Architecture and schema review; Express REST APIs live; dated subsidy engine passing unit tests using scheme eligibility date; DPDP masking demonstration. | ₹1,50,000 | 25% |
| **M2** | **Lead Intake, OCR & Human Verification** | End of Week 2 | Mobile-responsive lead intake form live in EN/MR/HI; sample-bill testing (30 bills); side-by-side OCR verification with manual field correction and 0–100 image-quality warning. | ₹1,50,000 | 25% |
| **M3** | **Qualification Engine, Sizing & Quotation Generator** | End of Week 4 | Algorithmic qualification and sizing verified against agreed synthetic test cases; Client-approved rate-card pricing active; vector PDF quote generator operational and reconciled ($Net = Gross - Subsidy$). | ₹1,50,000 | 25% |
| **M4** | **Public Tracker, SLA Monitor, UAT & Handover** | End of Week 6 | Public customer tracking portal (`/track/:token`) active with ≥128-bit tokens and rate limiting; 8-stage pipeline with evidence-gated DBT completion; SLA dashboard; 100% pass on internal regression test suite; formal UAT acceptance sign-off; 4 hours of staff training; complete source code, documentation, and credentials handed over. | ₹1,50,000 | 25% |
| **TOTAL** | | | **Full Platform Delivery (4 Milestones)** | **₹6,00,000** | **100%** |

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
| **Delayed Client Feedback on Rate Cards** | High | Low | Slips Week 2 UI design | If approved rate cards are not supplied by the Client by the agreed date, the system shall use clearly marked demonstration data in a non-production environment. Production quotations shall remain disabled until authorized pricing, tax and configured charges are approved in writing by the Client. Timeline extends day-for-day under Clause 3.2. |
| **MSEDCL Bill Variations in Vidarbha** | Medium | Medium | Incomplete OCR extraction | Side-by-side verification modal allows sales staff to verify/override values in &lt; 5 seconds. OCR acceptance tests extraction and manual correction on the 30 supplied bills. |
| **Staff Hesitation to Use New Tools** | High | Medium | Slow adoption in field | Dedicated 4-hour recorded training workshop in Week 6; mobile-first interface optimized for ease of use. |
| **Central Subsidy Policy Changes** | Low | Low | Breaks subsidy calculations | Architecture uses date-effective rule tables; new rules can be added without code refactoring based on scheme eligibility dates. |
