# Project Timeline, Budget & Delivery Plan
## Company A, Nagpur — Rooftop Solar EPC Platform

**Total Budget**: ₹6,00,000 (INR 6 Lakh)  
**Total Timeline**: 6 Weeks  
**Delivery Model**: Milestone-Driven Agile Sprints  
**Target Region**: Nagpur & Vidarbha (Maharashtra)  

---

## 1. Project Budget Breakdown (₹6.00 Lakh)

The ₹6 Lakh budget is structured across technical engineering, integration, UX/UI localization (Marathi/Hindi), and deployment:

| Cost Item | Description | Allocation (₹) | % of Budget |
| :--- | :--- | :--- | :--- |
| **Backend & Architecture** | Node.js/Express REST APIs, Dated Subsidy Engine, Audit Trails | ₹1,50,000 | 25.0% |
| **Frontend & UI/UX** | React.js, Tailwind CSS, Responsive Mobile Portal, PDF Engine | ₹1,50,000 | 25.0% |
| **AI Bill OCR & Qualification** | MSEDCL parsing, side-by-side verification, qualification engine | ₹1,20,000 | 20.0% |
| **Project Tracker & WhatsApp** | 8-Stage tracker, public token link, WhatsApp/SMS simulation | ₹1,00,000 | 16.7% |
| **QA, Testing & Localization** | Marathi/Hindi translation verification, E2E test suite, UAT | ₹50,000 | 8.3% |
| **Deployment & Training** | Production setup, staff training workshops, documentation | ₹30,000 | 5.0% |
| **TOTAL PROJECT BUDGET** | **Comprehensive Turnkey Deliverables** | **₹6,00,000** | **100.0%** |

---

## 2. Six-Week Implementation Schedule (Gantt Overview)

```
Week 1: Requirements, Data Schemas, DPDP Compliance & Dated Subsidy Engine
████████████████████
Week 2: Multilingual Lead Form & AI Bill OCR with Side-by-Side Verification
     ████████████████████
Week 3: Lead Qualification Engine & Solar Sizing (1,400 units/kW/yr)
          ████████████████████
Week 4: Interactive Quote Builder, Payback Calculator & Branded PDF Engine
               ████████████████████
Week 5: 8-Stage Tracker, Public Status Link (/track/:token) & Stuck SLA Monitor
                    ████████████████████
Week 6: Multilingual WhatsApp Dispatcher, Nagpur Circle UAT & Go-Live
                         ████████████████████
```

---

## 3. Detailed Weekly Work Breakdown Structure (WBS)

### Week 1: Foundation, Data Modeling & Dated Subsidy Engine
- **Objectives**: Establish architecture, secure DPDP Act 2023 compliance, and implement date-effective subsidy calculation engine.
- **Deliverables**:
  - Full-stack project scaffolding (React + Vite + Express).
  - Database schema for leads, quotes, active projects, and audit logs.
  - Date-effective subsidy engine supporting PM Surya Ghar (₹30k/kW up to 2kW + ₹18k for 3rd kW, cap ₹78k) and historical schemes.
  - DPDP Act consent mechanism and consumer number masking utilities.
- **Milestone Exit**: Core calculation engine verified against statutory solar rules.

### Week 2: Multilingual Lead Intake & Side-by-Side OCR Reader
- **Objectives**: Ship the customer-facing lead form and OCR verification modal.
- **Deliverables**:
  - Trilingual translation system (Marathi, Hindi, English).
  - Property owner vs tenant selector with instant tenant advisory.
  - Rooftop specifications: Concrete, Metal Sheet, Clay Tile and area calculations.
  - MSEDCL Mahavitaran bill photo uploader with drag-and-drop.
  - Side-by-side OCR verification interface displaying extracted consumer number, load, tariff, and monthly units next to the bill image.
  - Blurry/poor photo detection warning (&lt; 60% confidence).
- **Milestone Exit**: Homeowner can submit bill and confirm OCR extraction in under 60 seconds.

### Week 3: Qualification Engine & Surveyor Cost-Saving Dispatch
- **Objectives**: Automate lead scoring to stop the ₹26.4L annual survey trip bleed.
- **Deliverables**:
  - Qualification scoring algorithm:
    - `High`: Owner + bill &gt; ₹2,500 → Auto-books priority on-site survey.
    - `Low (tenant)`: Tenant status → Converts ₹2,500 survey to 5-minute virtual phone call.
    - `Low (small bill)`: Bill &lt; ₹1,000 → Converts survey to 1 kW micro-solar advice call.
  - Solar capacity sizing logic using Vidarbha constant (1,400 kWh/kW/yr = 116.7 units/month per kW).
  - Realized survey savings counter (tallying ₹2,500 per bypassed trip).
- **Milestone Exit**: Unqualified surveys filtered before scheduling.

### Week 4: "Simple Story First" Quotation Builder & PDF Generator
- **Objectives**: Reduce quotation turnaround from 3 days to under 5 minutes.
- **Deliverables**:
  - Executive quotation card displaying System Size, Cost After Subsidy, Payback Period, and Yearly Savings.
  - Interactive equipment selection (Tier-1 Mono PERC DCR vs TOPCon Bifacial; standard vs elevated terrace superstructure).
  - 25-Year cumulative savings model with 0.7%/yr degradation and 4.5%/yr tariff escalation.
  - Automated client-side vector PDF generation (`jspdf` + `jspdf-autotable`) with Company A branding and 4 milestone payment stages.
- **Milestone Exit**: Instant PDF quotes generated and ready for customer dispatch.

### Week 5: 8-Stage Project Pipeline & Public Status Link
- **Objectives**: Eliminate repetitive customer status calls and surface project bottlenecks.
- **Deliverables**:
  - 8-Stage lifecycle tracker from advance payment to ₹78,000 DBT credit.
  - Public customer tracking link (`/track/:token`) accessible without passwords.
  - Customer Document Locker for survey reports, agreements, and sanction letters.
  - **Stuck Projects Monitor**: Automatically flags installations exceeding statutory SLA (e.g. MSEDCL sanction pending &gt; 10 days) with one-click escalation.
  - Mock advance payment gateway (UPI/NetBanking simulation).
- **Milestone Exit**: Public tracking link functional on mobile browsers.

### Week 6: WhatsApp Gateway, Nagpur Pilot, UAT & Handover
- **Objectives**: Validate with live Vidarbha sales staff, train coordinators, and achieve final MD sign-off.
- **Deliverables**:
  - WhatsApp & SMS notification gateway with automated Marathi/Hindi triggers.
  - Pilot testing with Nagpur circles (Dharampeth, Sadar, Gandhibagh).
  - Automated test suite verification (`test-e2e.js` 10/10 tests passing).
  - Training workshop for Company A sales reps and project coordinators.
  - Executive handover and warranty period commencement.
- **Milestone Exit**: Production deployment live and signed off by Founder-MD.

---

## 4. Milestone Payment Schedule (Tied to ₹6 Lakh Contract)

Payments are structured strictly against verifiable technical deliverables:

| Milestone | Deliverable Trigger | Verification Criteria | Amount (INR) |
| :--- | :--- | :--- | :--- |
| **M1: Kickoff & Core Architecture** | Week 1 Completion | PRD approved, dated subsidy engine passing test cases, Git repo initialized | ₹1,50,000 (25%) |
| **M2: Lead Intake & AI OCR Verification** | Week 2–3 Completion | Multilingual form live, side-by-side OCR working, qualification rules active | ₹1,50,000 (25%) |
| **M3: Quote Engine & Public Tracker** | Week 4–5 Completion | PDF generation verified, public `/track/:token` active, stuck alerts firing | ₹1,50,000 (25%) |
| **M4: UAT, Training & Production Go-Live** | Week 6 Completion | Pilot tested across Nagpur leads, staff trained, sign-off by Founder-MD | ₹1,50,000 (25%) |
| **TOTAL** | | | **₹6,00,000 (100%)** |

---

## 5. Risk Assessment & Mitigation Matrix

| Risk Factor | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Poor Bill Photo Quality** | High | Medium | Built-in blurriness detector triggers an instant re-upload alert; side-by-side manual input allows staff to override in seconds. |
| **Subsidy Policy Revision** | Medium | High | Subsidies are decoupled from code into date-bounded tables; new schemes can be scheduled in advance with effective dates. |
| **Customer DPDP Resistance** | Low | High | Clear DPDP Act 2023 consent checkbox and toggle to mask consumer numbers (`04901*****31`) before data transmission. |
| **Slow MSEDCL Portal APIs** | High | Medium | Decoupled workflow: System stores MSEDCL application references and monitors internal SLA timers without relying on unstable third-party scrapers. |
