# Candidate Submission Package (Final V3 Edition)
## Company A, Nagpur — Rooftop Solar EPC Lead Qualification, Quotation & Project Tracker

**Client**: Company A Solar Pvt. Ltd., Nagpur (Maharashtra)  
**Project Budget**: ₹6,00,000 (INR 6 Lakh Fixed Fee)  
**Implementation Duration**: 6 Calendar Weeks  
**Candidate Submission Type**: Software Engineering, Commercial & Architecture Package  

---

## Deliverables in this Archive:

### 1. `PRD_Rooftop_Solar_Platform.md` (PRD v2.0)
- **Problem Formulation**: Clearly separates confirmed client inputs from working model assumptions (₹86.88L modeled bleed: 40% unqualified surveys @ ₹2,500/visit + 4% lost genuine leads @ ₹36,000 margin).
- **Target Performance KPIs**: Formulates proposed target goals (&lt; 15% unqualified survey rate; &gt; 90% same-day quotation delivery; &ge; 50% status call reduction) with testable mathematical measurement criteria.
- **Statutory Alignment**: Incorporates verified PM Surya Ghar rules (₹30,000/kW up to 2 kW, ₹18,000 for 3rd kW, max ₹78,000), 1,400 kWh/kW/yr Vidarbha solar generation constant, and DPDP Act 2023 personal data protections.
- **Functional Modules**: Lead capture form, side-by-side AI OCR verification, qualification engine (routing low scores to 5-min phone calls to save ₹2,500), date-effective subsidy calculation, vector PDF quote generator, public customer tracker (`/track/:token`), and stuck project SLA monitor.

### 2. `Project_Timeline_and_Budget.md` (Timeline Plan v2.0)
- **Work Breakdown Structure (WBS)**: Detailed week-by-week implementation deliverables with explicit technical prerequisites and dependencies.
- **Client & Contractor Responsibilities**: Clear delineation of duties (sample bills, rate cards, UAT staff).
- **Objective Acceptance Criteria**: Clear testable verification standards for each milestone.
- **Milestone Payment Schedule**: 4 milestones of ₹1,50,000 (25% each) tied to formal technical acceptance.
- **Governance**: Full RACI responsibility assignment matrix and risk management plan.

### 3. `Draft_Software_Services_Agreement.md` (Software Agreement v2.0)
- **Master Software Development & Professional Services Agreement**: Specifically structured for commissioning and delivering Company A’s software platform.
- **Refined Commercial Terms**: Late payment interest (1.5%/month) and suspension rights; day-for-day schedule extensions for client delays; 5-day acceptance testing window with explicit defect remediation SLAs.
- **Intellectual Property Rights**: Clear division between custom code ("work-for-hire" vesting in Client upon full payment), consultant pre-existing IP (licensed to Client), and permissive third-party open-source components.
- **DPDP Act 2023 Compliance**: Data deletion/destruction SLA within 14 days; 24-hour security breach notification window; subcontractor data protection obligations.
- **Service Level Agreement (SLA)**: 60-Day post-deployment warranty with defined support hours and response times (Critical: 2h/24h; Major: 4h/48h; Minor: 8h/patch).
- **Limitation of Liability**: Capped at contract price (₹6 Lakh) with standard carve-outs for confidentiality breach, gross negligence/fraud, IP infringement indemnity, and gross DPDP non-compliance.
- **Three Critical Added Clauses**:
  1. *Change Management Procedure* (Clause 11): Written Change Request and impact assessment before out-of-scope work proceeds.
  2. *Hosting, API & Third-Party Pass-Through Costs* (Clause 12): Client directly bears domain, hosting, AI/OCR API, WhatsApp Business API, and SMS gateway fees.
  3. *Source Code Handover & Knowledge Transfer* (Clause 13): Delivery of unminified Git repository, deployment configs, schemas, API docs, credentials, and 4 hours of recorded developer walkthrough upon final payment.

### 4. Working Software Implementation:
- Production React + Node.js + Express platform running live on `http://localhost:5000` with 10 passing automated end-to-end regression tests (`test-e2e.js`).
