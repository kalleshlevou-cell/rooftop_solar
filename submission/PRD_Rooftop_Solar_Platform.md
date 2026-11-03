# Product Requirements Document (PRD v2.0)
## Rooftop Solar Lead Qualification, Quotation & Project Tracker Platform
### Schedule A to the Master Software Development & Professional Services Agreement

**Client Organization**: Company A Solar Pvt. Ltd., Nagpur (Maharashtra)  
**Industry**: Distributed Rooftop Solar EPC (Residential & Commercial)  
**Project Title**: Digital Lead Qualification, Instant Quotation & Milestone Project Tracking Suite  
**Document Reference**: Schedule A (PRD v2.0)  
**Contractual Value**: ₹6,00,000 (INR 6 Lakh, Exclusive of Applicable GST)  
**Project Duration**: 6 Calendar Weeks (42 Calendar Days)  
**Warranty Period**: 60 Calendar Days commencing upon actual production deployment or 14 calendar days post-M4 formal acceptance, whichever occurs earlier (support hours: 09:30–18:30 IST, Monday–Saturday, excluding public holidays)  
**Change Request Rate**: ₹2,500 per developer hour (subject to signed approval)  
**Document Status**: Draft for Technical & Commercial Assessment – Pending Client Approval

---

## 0. Scope Decisions & Honest Trade-Offs

*This section is written first so an evaluator, client, or engineer can understand the key choices before reading the requirements detail. It is the most important section of this document.*

### 0.1 What We Are Building (and What We Are Not)

The platform solves three specific, costed problems for Company A:

| Problem | Root Cause | Platform Solution | What We Are Not Building |
| :--- | :--- | :--- | :--- |
| 40% of physical surveys wasted on tenants and tiny bills | No pre-qualification before dispatching a ₹2,500 surveyor | AI bill reading + algorithmic qualification routes low-score leads to a 5-minute phone call instead | An autonomous decision system — every AI output requires human confirmation before any action |
| Quotes take 3 business days; 14 leads/month lost to faster competitors | Manual Excel quoting process | One-click quote builder with pre-loaded date-effective subsidy rules and instant PDF | A live ERP or inventory system — this is a quotation tool, not a procurement platform |
| 50% of coordinator time spent on repetitive status calls | No self-service tracking for customers | Zero-login public tracker link sent via WhatsApp/SMS | A live IoT generation monitor or DISCOM portal integration — those are explicitly out of scope |

### 0.2 What We Cut and Why

The following were considered and deliberately excluded from this 6-week, ₹6,00,000 scope:

| Excluded Feature | Reason for Exclusion | Recommended Path |
| :--- | :--- | :--- |
| **Automated National Portal submission** | MNRE portal mandates manual Aadhaar OTP and CAPTCHA verification — no API exists; automation would be illegal impersonation | Staff-assisted manual portal filing remains the process; tracker Stage 7 flags when filing is due |
| **Live WhatsApp / SMS dispatch** | Requires Meta BSP onboarding, DLT registration, and per-message carrier fees paid by Client — not bundled in fixed fee | Client contracts a BSP (Gupshup / Twilio); Consultant configures the integration under a Change Order |
| **Live payment gateway** | Requires RBI-compliant merchant account underwriting under the Client's own PAN/GSTIN — cannot be in Consultant's scope | Mock gateway in scope for demonstration; Client applies for Razorpay/PayU merchant account independently |
| **Inventory / warehouse ERP** | Separate domain with different data models, procurement workflows, and compliance requirements — doubles scope | Future phase or separate engagement |
| **IoT inverter telemetry** | Requires manufacturer API agreements, hardware commissioning, and real-time data infrastructure beyond 6-week budget | Post-go-live phase |
| **Commercial subsidy calculation** | PM Surya Ghar explicitly excludes commercial/institutional connections from residential CFA — building it would create a compliance risk for the Client | Admin can configure ₹0 commercial subsidy; future commercial incentive schemes can be added via admin console |

### 0.3 When the AI Gets It Wrong — The Answer

This deserves a direct answer in one place, not scattered across requirement clauses.

**The AI (OCR) extracts five fields from an uploaded MSEDCL electricity bill: Consumer Number, Tariff Category, Sanctioned Load, Monthly Units, and Billed Amount.** It will sometimes be wrong. Here is how the platform handles it at every stage:

**Before extraction — image quality gate:**
- Every uploaded image is scored 0–100 on focus sharpness, brightness, and edge contrast before OCR runs.
- If the score is below 60, the system immediately shows: *"Quality Warning: Image blurry or dark — please re-upload or enter values manually."*
- This is a separate score from per-field confidence. A sharp photo of a faded bill can have a high quality score but low field confidence on the faded fields.

**During extraction — field-level confidence display:**
- Each extracted field is shown alongside its individual confidence percentage.
- A sales representative sees, for example: *"Monthly Units: 340 kWh (confidence: 94%)"* vs *"Sanctioned Load: 3.5 kW (confidence: 61% — verify)"*.
- Low-confidence fields are highlighted visually.

**After extraction — mandatory human gate:**
- The platform operates a **side-by-side verification interface**: the bill image on the left, extracted fields in an editable form on the right.
- No lead can be scored or sized until an authorized staff member reviews and confirms (or manually corrects) every extracted value.
- OCR output is explicitly labelled "Preliminary — Pending Verification" in the UI until confirmed.
- **The system will never autonomously approve, reject, or price a lead based on unconfirmed OCR output.**

**Contractual responsibility:**
- The Agreement (Clause 1.1 — AI/OCR Verification Principle) records this formally: OCR values are preliminary data, not verified facts, until confirmed by Client personnel. The Consultant's liability does not extend to consequences of staff approving incorrect unverified OCR values.

**Why this matters for Company A specifically:**
An incorrectly read sanctioned load (e.g., 3.5 kW read as 35 kW) would generate an absurd 30 kW system quote. The mandatory human gate catches this before a quote is built. The phone consultation routing for low-score leads means that even if an OCR misread causes a wrong score, the worst outcome is a phone call — not a wasted ₹2,500 physical survey.

### 0.4 Priority Stack (MoSCoW)

| Priority | Items |
| :--- | :--- |
| **Must-Have** | Lead intake (owner/tenant routing) · AI bill OCR with human gate · Qualification engine · Date-effective subsidy calculator (PM Surya Ghar formula, fractional kW, ₹78,000 cap) · Quote builder + PDF · 8-stage tracker · Public zero-login tracking link · Stuck-projects SLA dashboard · DPDP Act 2023 safeguards · Marathi/Hindi/English UI |
| **Should-Have** | Customer Document Locker · Admin pricing rate card editor · Dated subsidy rule tester / time-travel simulator |
| **Simulation Only** (demo, no live money/messages) | Mock UPI/NetBanking payment gateway · WhatsApp/SMS notification dispatcher |
| **Excluded** | National Portal bot · Inventory ERP · IoT telemetry · Live payment gateway merchant account · Live carrier SMS/WhatsApp API fees |

---

## 1. Executive Summary & Client Context

Company A is an established rooftop solar engineering, procurement, and construction (EPC) provider based in Nagpur, delivering residential and commercial rooftop solar installations across the 11 districts of the Vidarbha region in Maharashtra.

### 1.1 Client Baseline (Supplied Facts from Initial Brief)
The following operational profile is drawn directly from Company A's initial client brief:
- **Workforce**: Approximately 75 staff members across sales, site survey, engineering, liaisoning, and administration.
- **Annual Turnover**: ₹30 Crore to ₹38 Crore per annum.
- **Installation Volume**: Approximately 120 rooftop solar installations commissioned per month.
- **Current Operational Workflow**: Leads originate via WhatsApp and manual telephone inquiries, logged manually in spreadsheets. Sales representatives call each lead to request electricity bill photographs. Field surveyors are dispatched for physical roof measurements before qualification. Quotations are drafted manually in Microsoft Excel (requiring ~3 days). Net metering applications and PM Surya Ghar subsidy claims with MSEDCL are tracked across disconnected sheets.

---

## 2. Business Problem & Financial Impact Analysis

### 2.1 Stated Business Case Assumptions (Labelled for Operational Validation)
The financial justification relies on the following operational assumptions provided in the project brief, to be benchmarked and validated during the first 30 days of platform deployment:

1. **Lead Flow & Qualification Baseline (Assumptions)**:
   - Total Monthly Inquiries: ~1,400 leads/month.
   - Genuine Viable Buyer Proportion: Modeled at 25% (~350 leads/month).
   - Monthly Field Surveys Conducted: ~220 physical surveys/month.
   - **Unqualified Survey Proportion (Assumption)**: **40% of surveys (88 visits/month)** are estimated to be conducted for properties that will never transact (primarily tenants lacking landlord NOC or consumers with monthly electricity bills under ₹1,000).
   - **Unit Cost per Physical Survey**: Estimated at **₹2,500 per survey visit** (surveyor compensation, round-trip travel, equipment depreciation).
   - **Potential Avoided Cost Rule**: Classified as a *potential avoided cost*, not automatically realized savings; logged only when a physical survey is successfully replaced by virtual qualification.

2. **Quotation Turnaround & Opportunity Loss (Assumptions)**:
   - Current Quote Turnaround Time: **3 business days (72 hours)**.
   - Lead Attrition to Faster Competitors: **4% of genuine viable leads (14 orders/month)** are assumed lost to competitors providing faster turnaround — not independently observed competitor telemetry.
   - Average Order Value: **₹2,00,000** per rooftop solar system (approx. 3 kW).
   - Contractor Gross Margin: **18%** (₹36,000 gross margin per lost installation).

### 2.2 Financial Bleed Model

$$\begin{aligned}
\text{Annual Potential Avoided Survey Cost} &= 88 \text{ visits/mo} \times ₹2,500 \times 12 = \mathbf{₹26,40,000 / \text{year}} \\
\text{Annual Modeled Opportunity Loss (Margin)} &= 14 \text{ lost sales/mo} \times ₹36,000 \times 12 = \mathbf{₹60,48,000 / \text{year}} \\
\hline
\mathbf{\text{Total Modeled Annual Economic Opportunity Loss}} &= \mathbf{₹86,88,000 / \text{year}}
\end{aligned}$$

*(Note: The ₹86.88 Lakh figure is a modeled economic opportunity loss based on supplied assumptions, subject to operational field validation.)*

---

## 3. Project Objectives & Target Success Metrics (Proposed KPIs)

The software project aims to achieve the following performance targets within 90 days of production go-live:

| Performance Metric | Baseline | Project Target Goal | Validation & Measurement Methodology |
| :--- | :---: | :---: | :--- |
| **Same-Day Quotation Rate** | To be measured during baseline period | **> 90% of viable inquiries** | $\frac{\text{Viable inquiries receiving quotation within same business day after verified bill data available}}{\text{Total viable inquiries with verified bill data}} \times 100$ |
| **Unqualified Physical Survey Rate** | Assumed 40% | **< 15%** | $\frac{\text{Survey visits resulting in non-viable quotes}}{\text{Total physical survey visits completed}} \times 100$ |
| **Routine Inbound Status Calls** | To be measured during baseline period | **≥ 50% Reduction** | Measured via CRM incoming call tags for DISCOM sanction, installation, and subsidy status checks |

**Cautionary Note**: These metrics represent targeted project performance goals, not historical or pre-existing achievements.

---

## 4. Regulatory & Technical Grounding (Verified Facts vs Constraints)

### 4.1 Verified Policy: PM Surya Ghar Muft Bijli Yojana (Residential General-State Category)
Central financial assistance (CFA) framework for individual residential grid-connected solar rooftop systems (general-state category, including Maharashtra), notified by MNRE in February 2024:

- **First 2 kW capacity**: ₹30,000 per kW (e.g., ₹60,000 for a 2.0 kW system).
- **Additional capacity between 2 kW and 3 kW**: ₹18,000 per kW (e.g., 2.5 kW = ₹60,000 + 0.5 × ₹18,000 = ₹69,000).
- **3 kW or greater**: Fixed maximum cap of **₹78,000** — no additional CFA beyond 3 kW.
- **Residential Scope Limitation**: These rates apply strictly to eligible residential consumers. Commercial, industrial, and institutional installations are not eligible and are calculated with ₹0 CFA unless a specific commercial scheme is configured by the Client.
- **Disbursement Mechanism**: Direct Benefit Transfer (DBT) from Central Government into the homeowner's Aadhaar-linked bank account following DISCOM net-meter inspection and commissioning upload.
- **Client Governance**: Subsidy eligibility depends on the National Portal application submission date and applicable transitional provisions — not quote creation date alone. The Client shall inspect and maintain date-effective subsidy tables against official Ministry notifications.

### 4.2 Vidarbha Solar Generation Benchmark (Engineering Assumption)
- Vidarbha solar insolation ~5.2–5.6 kWh/m²/day → engineered at **1,400 kWh per kW per annum** (~116.7 kWh/month per kW).
- **Constraint**: Generation constants are admin-configurable and never hallucinated by AI models.

### 4.3 Digital Personal Data Protection (DPDP) Act 2023 Compliance
- MSEDCL Consumer Numbers, consumption figures, and residential addresses are personal data.
- **Technical Safeguards**: Purpose-limited consent capture, consumer number masking (`04901*****31`), encrypted transmission, and unguessable public tracking tokens (≥128 bits entropy).
- **Data Fiduciary**: Company A serves as the statutory Data Fiduciary.

---

## 5. User Personas & Workflows

### 5.1 Persona 1: Homeowner (Vidarbha Resident)
- **Context**: Mobile browser (Android/iOS). Languages: Marathi, Hindi, English.
- **Mental Model**: "What size? What does it cost after subsidy? When do I break even?"
- **Friction to Avoid**: No password creation, no app store download. Tracking via single-click secure token.

### 5.2 Persona 2: Sales Representative & Technical Surveyor
- **Context**: Managing 30–50 incoming leads daily.
- **Key Tasks**: Verifying AI-extracted bill values, confirming roof type, scheduling priority surveys for viable leads, routing low-score leads to phone consultation.

### 5.3 Persona 3: Project Coordinator & Operations Desk
- **Context**: Coordinating 8-stage installations, tracking MSEDCL inspections and DBT releases.
- **Key Tasks**: SLA threshold dashboard, escalation records, status updates.

### 5.4 Persona 4: Founder & Managing Director
- **Context**: Executive oversight of margins, productivity, and agreement execution.
- **Key Tasks**: Reviewing savings tallies, approving dated subsidy revisions, signing customer agreements.

---

## 6. Functional Requirements (System Architecture)

### 6.1 Module 1: Lead Capture & MSEDCL Bill Upload
- **FR-1.1 Occupancy Qualification**: Explicit selector for `Property Owner` vs `Tenant`. Tenants are routed to a virtual consultation to verify landlord consent and DISCOM documentation before any physical survey is scheduled.
- **FR-1.2 Roof Characteristics**: Roof Type (Concrete Flat RCC, Metal/Tin Sheet, Tiled/Slanted) and approximate shadow-free area (sq ft).
- **FR-1.3 Bill & Location Intake**: Monthly electricity bill (₹) and Vidarbha pincode (validated against 440xxx–445xxx postal regions).
- **FR-1.4 Bill Image Upload**: Drag-and-drop or camera capture of MSEDCL bills (JPG, PNG, PDF) up to 10 MB.
- **FR-1.5 DPDP Consent**: Mandatory consent checkbox detailing specific purpose limitation under DPDP Act 2023.

### 6.2 Module 2: AI Bill Reading & Side-by-Side OCR Verification

*(See Section 0.3 for the full "when AI is wrong" answer. This section specifies the technical implementation.)*

- **FR-2.1 Extraction Schema**: Automatically extracts: MSEDCL Consumer Number (12 digits), Tariff Category, Sanctioned Connected Load (kW), Monthly Units Billed (kWh), Total Billed Amount (₹).
- **FR-2.2 Side-by-Side Verification Layout**: Bill image displayed on the left; extracted parameters in an editable form on the right. No lead can advance until an authorized staff member confirms each field.
- **FR-2.3 Image Quality Assessment vs Character Field Confidence**:
  - Image quality score: normalized 0–100 evaluating focus sharpness, brightness, and edge contrast. Score below 60 triggers: *"Quality Warning: Image blurry or dark."*
  - OCR field confidence: stored and displayed separately per field. A high image quality score does not imply high field confidence on all fields.
  - Both scores are displayed to the reviewing staff member simultaneously.
- **FR-2.4 AI/OCR Responsibility Principle**: OCR values are labelled "Preliminary — Pending Verification" until confirmed. The system will not autonomously approve, reject, or price a lead based solely on OCR output. Manual correction is always available.
- **FR-2.5 DPDP Privacy Mask**: One-click toggle to mask consumer numbers (`04901*****31`) and addresses.

### 6.3 Module 3: Qualification & Sizing Engine
- **FR-3.1 Non-Rejection Principle**: A low score never rejects a customer inquiry; it replaces a ₹2,500 on-site survey with a 5-minute virtual phone consultation.
- **FR-3.2 Scoring Classification**:
  - `High`: Owner + Monthly Bill > ₹2,500 → Priority Same-Day Physical Survey.
  - `Medium`: Owner + Monthly Bill ₹1,000–₹2,500 → Standard Survey (within 48 hours).
  - `Low (tenant)`: Tenant → Virtual Consultation on Landlord Consent (logs potential ₹2,500 avoided cost).
  - `Low (small bill)`: Owner + Bill < ₹1,000 → 1 kW Micro-Solar Guidance Call (logs potential ₹2,500 avoided cost).
- **FR-3.3 Preliminary Capacity Calculation**:
  $$\text{Calculated Capacity (kW)} = \frac{\text{Monthly Consumption (kWh)}}{116.7}$$
  Where the calculated capacity is below 1 kW, the system displays a low-consumption advisory instead of recommending a 1 kW installation. Final capacity is subject to technical feasibility and Client approval.
- **FR-3.3.1 Engineering & Safety Condition**: Preliminary recommendation is subject to roof feasibility (~90 sq ft shadow-free area per kW), sanctioned load constraints, shading analysis, and DISCOM requirements. Recommendations require review by Client personnel before inclusion in a customer quotation.

### 6.4 Module 4: Dated Subsidy Rules & Pricing Engine
- **FR-4.1 Date-Bounded Rule Evaluation**: Subsidy rules maintained in version-controlled, date-effective tables. Applicable rule selected using the relevant scheme eligibility date (National Portal application submission date and applicable transitional provisions). Quote creation date retained for audit but does not independently determine subsidy eligibility.
- **FR-4.2 PM Surya Ghar Calculation (Residential General-State Category)**:
  $$S(P) = \begin{cases} 
  30{,}000 \times P & 0 < P \le 2 \\
  60{,}000 + 18{,}000 \times (P - 2) & 2 < P < 3 \\
  78{,}000 & P \ge 3 
  \end{cases}$$
  *Examples: 2.5 kW → ₹69,000; 3 kW or greater → ₹78,000.*
- **FR-4.2.1 Commercial Installation Exclusion**: Non-residential connections default to ₹0 subsidy.
- **FR-4.3 Historical & Future Scheme Support**: Admins can schedule future adjustments or test historical quotes against legacy rules.
- **FR-4.4 Subsidy Responsibility**: Subsidy calculations are based on Client-approved date-effective tables. The platform does not guarantee statutory disbursement or government approval.
- **FR-4.5 Payback Math**: 1,400 kWh/kW/yr generation · MSEDCL residential tariff (~₹8.20/unit average) · 4.5%/yr tariff escalation · 0.7%/yr panel degradation across 25 years.

### 6.5 Module 5: Customer Quotation Presentation & PDF Generator
- **FR-5.1 "Simple Story First" Presentation**: Four primary decision metrics displayed before technical schematics: System Size (kW), Net Cost After Subsidy (₹), Payback Period (Years), Annual Savings (₹/year).
- **FR-5.2 Milestone Payment Schedule**: 10% Booking Advance · 40% DISCOM Sanction & Material Delivery · 40% Installation & Wiring · 10% Net Meter Energization & Subsidy Claim.
- **FR-5.3 Vector PDF Generation**: Branded downloadable quote PDF incorporating Company A credentials, customer details, warranty schedules, and payment terms.
- **FR-5.4 Rate-Card Reproducibility**: Net customer cost calculated strictly as:
  $$\text{Net Cost to Customer} = \text{Gross System Price} - \text{Applicable Approved Subsidy}$$
  All rate-card changes are versioned and timestamped so historical quotations remain reproducible.

### 6.6 Module 6: Public Customer Status Link (`/track/:token`)
- **FR-6.1 Zero-Login Public Tracker & Token Security**: Cryptographically random tokens (≥128 bits entropy, `TRK-` prefix). Token revocation and regeneration on request. Rate limiting: 60 requests/minute per client IP (HTTP 429 on breach). No internal database IDs, Aadhaar, or sensitive data exposed via token guessing. All access audit-logged.
- **FR-6.2 8-Stage Progress Tracker**:
  1. Lead Qualified & AI Sized
  2. Roof Survey Completed
  3. Quote Approved & Advance Paid
  4. MSEDCL Net Metering Application Submitted
  5. Solar Equipment Installed on Roof
  6. MSEDCL Inspection & Net Meter Energized
  7. PM Surya Ghar DBT Claim Filed on National Portal
  8. Subsidy Credited to Bank Account
  
  *DBT Verification Rule*: Stage 8 requires authorized staff to record verified evidence of subsidy credit (bank reference or National Portal confirmation). The platform never infers DBT completion from elapsed SLA thresholds.
- **FR-6.3 Document Locker**: In-browser download for survey reports, contracts, MSEDCL sanction letters, and DBT receipts.
- **FR-6.4 Mock Payment Gateway (Simulation Mode)**: Integrated UPI/NetBanking simulation for demonstrating milestone advance workflows. No real money is transferred.

### 6.7 Module 7: Project Coordinator & Internal SLA Monitoring Dashboard
- **FR-7.1 Internal Monitoring Thresholds**: MSEDCL sanction monitoring threshold: 10 days; DBT release monitoring threshold: 20 days. These are internal operational alerts, not statutory deadlines.
- **FR-7.2 Bottleneck Alert Center**: Automatically flags delayed projects with color-coded urgency. One-click escalation creates an internal escalation record and draft communication for staff review — not an automated direct submission into MSEDCL's systems.

### 6.8 Module 8: Multilingual WhatsApp & SMS Dispatcher (Simulation Mode)
- **FR-8.1 Simulation Mode**: Creates internal notification logs and visual dispatch records on milestone transitions. Does not dispatch live SMS/WhatsApp traffic to a customer's handset.
- **FR-8.2 Live Carrier Path**: If Company A contracts a BSP (Meta / Twilio / Gupshup) and funds a live account, the Consultant configures the integration under a Change Order. The simulation templates in Marathi, Hindi, and English are pre-built and ready to connect.

---

## 7. Out-of-Scope Boundaries

The following are explicitly excluded (see Section 0.2 for rationale):
1. Automated bot-based National Subsidy Portal submission.
2. Internal inventory purchasing and warehouse logistics ERP.
3. Inverter IoT string-level telemetry and live generation monitoring.
4. Live merchant payment gateway onboarding and commercial WhatsApp Business API fees (paid directly by Client under Agreement Clause 12).
