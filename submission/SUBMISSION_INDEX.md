# Candidate Submission Package (Final Approved Edition)
## Company A, Nagpur — Rooftop Solar EPC Lead Qualification, Quotation & Project Tracker

**Client**: Company A Solar Pvt. Ltd., Nagpur (Maharashtra)  
**Project Budget**: ₹6,00,000 (INR 6 Lakh Fixed Fee, Exclusive of Applicable GST)  
**Implementation Duration**: 6 Calendar Weeks (42 Calendar Days)  
**Warranty Period**: 60 Calendar Days Post-Deployment (Commencing on production deployment or within 14 days of M4)  
**Change Request Rate**: ₹2,500 per developer hour  
**Document Status**: Draft for Technical & Commercial Assessment – Pending Client Approval  

---

## Deliverables in this Archive:

### 1. `Draft_Software_Services_Agreement.md` (Master Software Agreement)
- **Document Classification**: DRAFT FOR TECHNICAL & COMMERCIAL ASSESSMENT (PRE-EXECUTION).
- **Refined Commercial Terms**: Milestone table with clean separator rows; late payment interest (1.5%/month); day-for-day schedule extensions for client delays; 5-day acceptance testing window with explicit defect remediation SLAs.
- **Intellectual Property Assignment**: Express assignment of custom code to Client upon full payment, with perpetual licensing of pre-existing tools, open-source warranties, and obligation to execute further confirmatory assignments.
- **DPDP Act 2023 Allocation**: Clear separation of Data Fiduciary responsibilities (Client) vs technical safeguards (Consultant); 14-day data destruction SLA for local development copies; 24-hour security breach notification window; subcontractor data protection obligations.
- **Service Level Agreement (SLA)**: 60-Day post-deployment warranty commencing upon production deployment or 14 days post-M4, with defined support hours (09:30–18:30 IST) and response times (Critical: 2h/24h; Major: 4h/48h; Minor: 8h/patch).
- **Limitation of Liability**: Mutual cap at fees actually paid up to ₹6,00,000, with mutual carve-outs for confidentiality breach, gross negligence/fraud, IP infringement indemnity, and payment obligations.
- **Five Critical Operational Clauses**:
  1. *AI/OCR Verification Principle* (Clause 1.1)
  2. *Subsidy Governance Principle* (Clause 1.1)
  3. *Simulation Mode Clarification* (Clause 1.1)
  4. *Change Management Procedure* (Clause 11)
  5. *Hosting, API & Third-Party Pass-Through Costs* (Clause 12)
  6. *Source Code Handover & Knowledge Transfer* (Clause 13)

### 2. `PRD_Rooftop_Solar_Platform.md` (Schedule A — PRD v2.0)
- **Document Status**: Draft for Technical & Commercial Assessment – Pending Client Approval.
- **Problem Formulation**: Distinctly separates confirmed client inputs from working model assumptions (₹86.88L modeled bleed: potential avoided survey costs + modeled lost margin from 4% of genuine viable leads).
- **Target Performance KPIs**: Standardized measurement definitions with business-day same-day quote rates, baseline survey rates, and routine status call reductions.
- **Statutory Alignment & Governance**: Verified PM Surya Ghar rules including fractional kW calculation ($S(P)$ formula up to ₹78,000 cap), residential scope limitation (commercial excluded by default), National Portal eligibility date logic, and DPDP Act 2023 technical safeguards.
- **Safety Conditions & Token Security**: System sizing safety conditions (consumption-based preliminary capacity with low-consumption advisory below 1 kW, roof feasibility, human review) and high-entropy (≥128-bit) rate-limited public tracking tokens with revocation.
- **AI/OCR Responsibility & Simulation Clarity**: Normalized 0–100 image quality score distinguishing sharpness from per-field character confidence; confirms OCR values are preliminary until human-reviewed; verifies payment gateway and WhatsApp/SMS operate in simulation mode.
- **Pricing & DBT Verification Governance**: Reproducible rate cards for gross and net pricing ($Net = Gross - Subsidy$); Stage 8 DBT completion strictly requires verified credit confirmation.

### 3. `Project_Timeline_and_Budget.md` (Schedule B — Timeline Plan v2.0)
- **Scope Prioritization Framework**: Explicit four-tier classification (Must-Have core, Should-Have enhancements, Simulation-Only demonstrations, Excluded boundaries) protecting the 6-week delivery feasibility.
- **Work Breakdown Structure (WBS)**: Detailed week-by-week implementation deliverables with explicit technical prerequisites and dependencies (sample bills, rate cards).
- **Client & Contractor Responsibilities**: Clear delineation of duties (sample bills, rate cards, UAT staff).
- **Objective Acceptance Criteria**: Standardized verification criteria for each milestone matching Agreement Clause 4.
- **Milestone Payment Schedule**: 4 milestones of ₹1,50,000 (25% each) tied to formal technical acceptance.
- **Handover Deliverables**: Complete source code Git repository, schemas, API documentation, 14-day DPDP data wipe, and 4 hours of interactive recorded training (Clause 13.2).
- **Governance**: Full RACI responsibility assignment matrix and risk management plan with day-for-day extension clauses.

### 4. Working Software Implementation:
- Production React + Node.js + Express platform running live on `http://localhost:5000` with 10 passing automated end-to-end regression tests (`test-e2e.js`).
