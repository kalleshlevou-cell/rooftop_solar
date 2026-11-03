# Candidate Submission Package (Final Approved Edition)
## Company A, Nagpur — Rooftop Solar EPC Lead Qualification, Quotation & Project Tracker

**Client**: Company A Solar Pvt. Ltd., Nagpur (Maharashtra)  
**Project Budget**: ₹6,00,000 (INR 6 Lakh Fixed Fee, Exclusive of Applicable GST)  
**Implementation Duration**: 6 Calendar Weeks (42 Calendar Days)  
**Warranty Period**: 60 Calendar Days Post-Deployment (Commencing on production deployment or within 14 days of M4)  
**Change Request Rate**: ₹2,500 per developer hour  
**Document Status**: Draft for Technical & Commercial Assessment – Pending Client Approval

---

## How to Read This Package

Start with **PRD.pdf Section 0** (Scope Decisions & Honest Trade-Offs). It answers three questions up front before any requirement detail:
1. What are we building and what are we not building — and why?
2. What did we cut from scope, and what is the recommended path for each cut item?
3. What happens when the AI gets it wrong?

The rest of the documents provide the supporting detail.

---

## Deliverables in this Package

### 1. `PRD.pdf` — Product Requirements Document (Schedule A, PRD v2.0)

**New in this version**: Section 0 (Scope Decisions & Honest Trade-Offs) was added to the front of the document. It contains:
- A three-column scope table (problem → solution → what we are NOT building)
- A full trade-off table of every excluded feature with rationale and recommended path
- A consolidated "When the AI Gets It Wrong" answer in one place (Section 0.3), covering the three-stage OCR error handling: image quality gate → per-field confidence display → mandatory human verification gate before any action
- An explicit MoSCoW priority table

The remainder of the PRD covers:
- Client baseline facts (clearly labelled as supplied by Company A)
- Financial bleed model with assumptions labelled for operational validation (₹86.88L modeled)
- Target KPIs with measurement definitions
- Verified PM Surya Ghar subsidy formula ($S(P)$) and DPDP Act 2023 technical safeguards
- Full functional requirements for all 8 modules with AI/OCR and subsidy governance principles
- Out-of-scope boundaries

### 2. `Timeline.pdf` — Project Implementation Timeline, Budget & Governance Plan (Schedule B, v2.0)

Covers:
- ₹6,00,000 budget breakdown across 4 work packages (25% each), with a note clarifying work-package allocations are internal planning benchmarks — billing is governed by the 4 contractual milestones
- 6-week dependency map with explicit client input deadlines at each stage
- Weekly work breakdown with formal acceptance criteria, client responsibilities, and contractor responsibilities for each week
- Milestone payment schedule (M1–M4, ₹1,50,000 each) with objective acceptance evidence required for each
- RACI responsibility matrix
- Risk management table with pre-emptive mitigations
- **Week 2 updated** to reference PRD Section 0.3 for the full OCR error handling specification

### 3. `Agreement.pdf` — Software Development & Professional Services Agreement (Draft)

**Document Classification**: DRAFT FOR TECHNICAL & COMMERCIAL ASSESSMENT (PRE-EXECUTION)

> **Note on Blank Consultant Fields**: The Consultant's legal name and registered address appear as `[CONSULTANT LEGAL NAME]` and `[CONSULTANT ADDRESS]` throughout this draft. This is intentional — the document is submitted as a pre-execution assessment draft. All substantive commercial, technical, IP, data protection, and legal terms are fully specified. Consultant details will be inserted prior to execution upon engagement confirmation.

Covers:
- Full 8-module scope of services with AI/OCR Verification Principle, Subsidy Governance Principle, and Simulation Mode Clarification explicitly stated
- Milestone payment schedule (₹1,50,000 × 4) with 5-day payment terms and 1.5%/month late interest
- Day-for-day schedule relief for client delays
- 5-day acceptance window with Critical/Major/Minor defect remediation SLAs
- IP assignment to Client upon full payment; perpetual license for pre-existing tools; open-source warranty (no copyleft/GPL contamination)
- DPDP Act 2023 allocation: Client as Data Fiduciary; Consultant implements technical safeguards; 14-day data destruction SLA; 24-hour breach notification
- 60-day warranty with defined support hours and response times
- Mutual liability cap at ₹6,00,000 with 5 carve-out exceptions
- Governing law: India; arbitration seat: Nagpur, Maharashtra
- Change Order procedure at ₹2,500/hour
- Third-party infrastructure costs clause (hosting, OCR API, WhatsApp BSP, SMS, SSL — all paid by Client)
- Source code and credential handover + 4 hours of recorded training

### 4. Working Software Implementation

Production React + Node.js + Express platform with 10 passing automated end-to-end regression tests (`test-e2e.js`), running at `http://localhost:5000`.

---

## Numbers That May Be Questioned in Interview

| Number | Source | Notes |
| :--- | :--- | :--- |
| ₹86.88L annual bleed | Derived from client brief assumptions | = ₹26.4L (survey waste) + ₹60.48L (margin loss). Both components labelled as working assumptions pending field validation |
| 40% unqualified survey rate | Client-supplied assumption | Baseline to be measured during first 30 days of deployment |
| ₹2,500 per survey | Client-supplied estimate | Surveyor compensation + travel + equipment depreciation |
| 14 orders/month lost | 4% of 350 genuine leads (modeled) | Not independently observed competitor telemetry — explicitly labelled |
| ₹78,000 subsidy cap | MNRE notification, Feb 2024 | Verified: ₹30,000/kW × 2 kW + ₹18,000/kW × 1 kW = ₹78,000 maximum |
| 1,400 kWh/kW/yr | Vidarbha insolation engineering constant | Based on ~5.2–5.6 kWh/m²/day insolation; admin-configurable |
| ₹6,00,000 fixed fee | Client brief | 4 × ₹1,50,000 milestones |
