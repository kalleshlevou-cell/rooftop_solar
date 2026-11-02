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

## 1. Executive Summary & Client Context

Company A is an established rooftop solar engineering, procurement, and construction (EPC) provider based in Nagpur, delivering residential and commercial rooftop solar installations across the 11 districts of the Vidarbha region in Maharashtra.

### 1.1 Client Baseline (Supplied Facts from Initial Brief)
The following operational profile is drawn directly from Company A's initial client brief:
- **Workforce**: Approximately 75 staff members across sales, site survey, engineering, liaisoning, and administration.
- **Annual Turnover**: ₹30 Crore to ₹38 Crore per annum.
- **Installation Volume**: Approximately 120 rooftop solar installations commissioned per month.
- **Current Operational Workflow**: Leads originate via WhatsApp and manual telephone inquiries, logged manually in spreadsheets. Sales representatives call each lead to request electricity bill photographs. Field surveyors are dispatched for physical roof measurements before qualification. Quotations are drafted manually in Microsoft Excel (requiring ~3 days). Net metering applications and PM Surya Ghar subsidy claims with MSEDCL (Maharashtra State Electricity Distribution Co. Ltd.) are tracked across disconnected sheets.

---

## 2. Business Problem & Financial Impact Analysis

The platform is designed to remediate operational bottlenecks and financial leakages identified during the initial operational assessment.

### 2.1 Stated Business Case Assumptions (Labelled for Operational Validation)
The financial justification relies on the following operational assumptions provided in the project brief, to be benchmarked and validated during the first 30 days of platform deployment:

1. **Lead Flow & Qualification Baseline (Assumptions)**:
   - Total Monthly Inquiries: ~1,400 leads/month.
   - Genuine Viable Buyer Proportion: Modeled at 25% (~350 leads/month).
   - Monthly Field Surveys Conducted: ~220 physical surveys/month.
   - **Unqualified Survey Proportion (Assumption)**: **40% of surveys (88 visits/month)** are estimated to be conducted for properties that will never transact (primarily tenants lacking landlord NOC or consumers with monthly electricity bills under ₹1,000 where payback is extended).
   - **Unit Cost per Physical Survey**: Estimated at **₹2,500 per survey visit** (incorporating surveyor compensation, round-trip travel across Nagpur/Vidarbha, and measuring equipment depreciation).
   - **Potential Avoided Cost Rule**: The ₹2,500 per avoided survey is classified as a *potential avoided cost*, not automatically realized savings; it is logged only when an on-site physical survey that would otherwise have been dispatched is successfully replaced by virtual qualification or phone consultation.

2. **Quotation Turnaround & Opportunity Loss (Assumptions)**:
   - Current Quote Turnaround Time: **3 business days (72 hours)**.
   - Lead Attrition to Faster Competitors: **4% of genuine viable leads (14 orders/month, estimated as 4% of 350 genuine leads)** are assumed lost to competing installers providing faster turnaround, rather than independently observed competitor telemetry.
   - Average Order Value: **₹2,00,000** per rooftop solar system (approx. 3 kW system).
   - Contractor Gross Margin: **18%** (₹36,000 gross margin per lost installation).

### 2.2 Financial Bleed Model

$$\begin{aligned}
\text{Annual Potential Avoided Survey Cost} &= 88 \text{ visits/mo} \times ₹2,500 \times 12 \text{ months} = \mathbf{₹26,40,000 / \text{year}} \\
\text{Annual Modeled Opportunity Loss (Margin)} &= 14 \text{ estimated lost sales/mo} \times ₹36,000 \text{ margin} \times 12 \text{ months} = \mathbf{₹60,48,000 / \text{year}} \\
\hline
\mathbf{\text{Total Modeled Annual Economic Opportunity Loss}} &= \mathbf{₹86,88,000 / \text{year}}
\end{aligned}$$

*(Note: The ₹86.88 Lakh figure represents a modeled economic opportunity loss based on supplied assumptions, subject to operational field validation. Post-launch analytics will measure actual field metrics against these working assumptions.)*

---

## 3. Project Objectives & Target Success Metrics (Proposed KPIs)

The software project aims to achieve the following performance targets within 90 days of production go-live:

| Performance Metric | Baseline | Project Target Goal | Validation & Measurement Methodology |
| :--- | :---: | :---: | :--- |
| **Same-Day Quotation Rate** | To be measured during baseline period | **&gt; 90% of viable inquiries** | Measured as: $\frac{\text{Viable inquiries receiving quotation within same business day after verified bill data is available}}{\text{Total viable inquiries with verified bill data}} \times 100$ |
| **Unqualified Physical Survey Rate** | Assumed 40% | **&lt; 15%** | Measured as: $\frac{\text{Survey visits resulting in non-viable quotes}}{\text{Total physical survey visits completed}} \times 100$ |
| **Routine Inbound Status Calls** | To be measured during baseline period | **&ge; 50% Reduction** | Measured via CRM incoming call tags for DISCOM sanction, installation, and subsidy status checks. |

**Standardized Measurement Definitions**:
- **Same-Day Quotation Rate**: Defined strictly as:
  $$\text{Same-Day Quotation Rate} = \frac{\text{Number of viable inquiries receiving a quotation within the same business day after verified bill data is available}}{\text{Total viable inquiries with verified bill data}} \times 100$$
  *(Note: Measuring within the same business day rather than a raw 24-hour clock prevents distorting metrics across weekends, gazetted holidays, and non-working hours).*
- **Unqualified Physical Survey Rate**: Physical survey visits dispatched to properties subsequently disqualified due to tenancy constraints, structural roof non-viability, or economic non-feasibility, expressed as a percentage of total physical surveys dispatched.
- **Cautionary Note**: These metrics represent targeted project performance goals for the platform, not historical or pre-existing achievements.

---

## 4. Regulatory & Technical Grounding (Verified Facts vs Constraints)

### 4.1 Verified Policy: PM Surya Ghar Muft Bijli Yojana (Residential General-State Category)
The Central Residential Solar Rooftop Scheme (notified by MNRE in February 2024 and clarified in operational guidelines) establishes the central financial assistance (CFA) framework for individual residential grid-connected solar rooftop systems in the general-state category (including Maharashtra):
- **First 2 kW capacity**: ₹30,000 per kW (e.g., ₹60,000 for a 2.0 kW system).
- **Additional capacity between 2 kW and 3 kW**: ₹18,000 per kW (e.g., a 2.5 kW system receives ₹60,000 + 0.5 × ₹18,000 = ₹69,000).
- **Capacity of 3 kW or greater**: Fixed maximum cap of **₹78,000** total central financial assistance (no additional CFA beyond 3 kW).
- **Residential Scope Limitation**: These rates apply strictly to eligible residential consumers under applicable domestic tariffs. Commercial, industrial, and institutional installations are not eligible for this residential CFA and must be calculated with ₹0 central subsidy unless a specific commercial incentive scheme is approved and entered by the Client.
- **Disbursement Mechanism**: Direct Benefit Transfer (DBT) directly from the Central Government into the homeowner’s verified Aadhaar-linked bank account following DISCOM net-meter inspection and commissioning report upload.
- **Client Governance**: Subsidy eligibility depends on the application submission date on the National Portal and applicable transitional provisions rather than quotation date alone. The Client shall inspect, approve, and maintain the date-effective subsidy tables in the software against official Ministry notifications.

### 4.2 Vidarbha Solar Generation Benchmark (Engineering Assumption)
- Solar generation in Vidarbha (Nagpur solar insolation ~5.2–5.6 kWh/m²/day) is engineered at **1,400 units (kWh) per kW per annum** (approx. 116.7 kWh/month per kW).
- **Constraint**: Generation formulas are fixed engineering constants configurable by administrators, never estimated or hallucinated by AI models.

### 4.3 Digital Personal Data Protection (DPDP) Act 2023 Compliance
- MSEDCL Consumer Numbers, monthly consumption figures, and residential addresses are classified as personal data.
- **Technical Safeguards**: Purpose-limited consent capture, automated consumer number masking (`04901*****31`), encrypted transmission, and unguessable public tracking tokens (`TRK-XXXXXXXX`).
- **Data Fiduciary**: Company A serves as the statutory Data Fiduciary determining the purpose and means of customer data processing.

---

## 5. User Personas & Workflows

### 5.1 Persona 1: Homeowner (Vidarbha Resident)
- **Context**: Accessing the platform from a mobile phone (Android/iOS via mobile browser).
- **Languages**: Marathi (मराठी), Hindi (हिंदी), and English.
- **Mental Model**: Needs a "simple story first": What size solar system do I need? What is my net cost after government subsidy? When will I break even?
- **Friction to Avoid**: Must not require password creation or app store downloads. Tracking operates via a single-click secure web token.

### 5.2 Persona 2: Sales Representative & Technical Surveyor
- **Context**: Managing 30–50 incoming leads daily and conducting site visits.
- **Key Tasks**: Rapidly verifying AI-extracted bill parameters, confirming roof type, scheduling priority on-site surveys for viable leads, and initiating virtual phone consultations for low-scoring prospects.

### 5.3 Persona 3: Project Coordinator & Operations Desk
- **Context**: Coordinating installations across 8 stages, tracking MSEDCL junior engineer inspections, and monitoring DBT subsidy releases.
- **Key Tasks**: Monitoring an internal SLA threshold dashboard that flags projects delayed at MSEDCL sanction or national portal disbursement beyond operational guidelines.

### 5.4 Persona 4: Founder & Managing Director
- **Context**: Executive oversight of financial margins, team productivity, and agreement execution.
- **Key Tasks**: Reviewing monthly survey savings tallies, updating pricing tables, approving dated subsidy scheme revisions, and signing turnkey customer agreements.

---

## 6. Functional Requirements (System Architecture)

### 6.1 Module 1: Lead Capture & MSEDCL Bill Upload
- **FR-1.1 Occupancy Qualification**: Explicit selector for `Property Owner` vs `Tenant`. Tenant inquiries shall be routed for a virtual consultation to verify property authorization, landlord consent, and applicable DISCOM documentation requirements before a physical survey is scheduled.
- **FR-1.2 Roof Characteristics**: Captures Roof Type (Concrete Flat RCC, Metal/Tin Sheet, Tiled/Slanted) and approximate shadow-free area (sq ft).
- **FR-1.3 Bill & Location Intake**: Captures monthly electricity bill (₹) and Vidarbha pincode (validated against 440xxx–445xxx postal regions).
- **FR-1.4 Bill Image Upload**: Supports drag-and-drop or camera capture of MSEDCL bills (JPG, PNG, PDF) up to 10 MB.
- **FR-1.5 DPDP Consent**: Mandatory consent checkbox detailing specific purpose limitation under DPDP Act 2023.

### 6.2 Module 2: AI Bill Reading & Side-by-Side OCR Verification
- **FR-2.1 Extraction Schema**: Automatically extracts:
  - MSEDCL Consumer Number (12 digits)
  - Tariff Category (LT-I Residential)
  - Sanctioned Connected Load (kW)
  - Monthly Units Billed (kWh)
  - Total Billed Amount (₹)
- **FR-2.2 Side-by-Side Verification Layout**: Displays extracted parameters in an editable form directly alongside the bill image for one-click human confirmation before qualification.
- **FR-2.3 Image Quality vs Character Confidence**: Distinguishes overall image sharpness/lighting detection from individual OCR character extraction confidence. If image quality is below 60%, flags `Quality Warning: Image blurry or dark` and prompts for re-upload or manual entry.
- **FR-2.4 AI/OCR Responsibility Principle**: OCR and AI-generated values are preliminary extracted data and do not constitute verified customer information until reviewed and confirmed by authorized Client personnel. The platform provides manual correction and shall not autonomously approve or reject a lead based solely on OCR output.
- **FR-2.5 DPDP Privacy Mask**: Provides a one-click toggle to mask consumer numbers (`04901*****31`) and addresses.

### 6.3 Module 3: Qualification & Sizing Engine
- **FR-3.1 Non-Rejection Principle**: A low score never rejects a customer inquiry; it replaces an expensive ₹2,500 on-site surveyor trip with a structured 5-minute virtual telephone consultation.
- **FR-3.2 Scoring Classification**:
  - `High`: Owner + Monthly Bill &gt; ₹2,500 → Priority Same-Day Physical Survey Visit.
  - `Medium`: Owner + Monthly Bill ₹1,000–₹2,500 → Standard Survey Visit (within 48 hours).
  - `Low (tenant)`: Tenant status → 5-Minute Virtual Consultation on Property Authorization & Landlord Consent (Logs potential ₹2,500 avoided survey cost).
  - `Low (small bill)`: Owner + Monthly Bill &lt; ₹1,000 → 1 kW Micro-Solar Guidance Call (Logs potential ₹2,500 avoided survey cost).
- **FR-3.3 System Sizing Formula**:
  $$\text{Recommended Capacity (kW)} = \max\left(1, \text{Round}\left(\frac{\text{Monthly Consumption (kWh)}}{116.7}\right)\right)$$
- **FR-3.3.1 Engineering & Safety Condition**: The sizing engine shall provide a preliminary recommendation subject to minimum capacity rules, roof feasibility, sanctioned load, shading, and applicable DISCOM requirements. Recommendations shall be reviewed by authorized Client personnel before being included in a customer quotation. The system shall not automatically approve a final installation capacity.

### 6.4 Module 4: Dated Subsidy Rules & Pricing Engine
- **FR-4.1 Date-Bounded Rule Evaluation**: Subsidy rules shall be maintained in version-controlled, date-effective tables. The system shall select the applicable rule using the relevant scheme eligibility date, including the National Portal application submission date and applicable transitional provisions. Quote creation date shall be retained for audit purposes but shall not independently determine subsidy eligibility. The Client shall approve all rule versions against authoritative government notifications before production use.
- **FR-4.2 PM Surya Ghar Calculation (Residential General-State Category)**:
  For eligible residential consumers in the general-state category, Central Financial Assistance (CFA) is calculated on system capacity $P$ (in kW) as:
  $$S(P) = \begin{cases} 
  30,000 \times P & 0 < P \le 2 \\
  60,000 + 18,000 \times (P - 2) & 2 < P < 3 \\
  78,000 & P \ge 3 
  \end{cases}$$
  Where $P$ is the eligible residential system capacity in kW, subject to scheme eligibility and applicable government rules (e.g., a 2.5 kW residential system receives ₹60,000 + 0.5 × ₹18,000 = ₹69,000 subsidy; whereas capacity of 3 kW or greater receives the maximum capped subsidy of ₹78,000).
- **FR-4.2.1 Commercial Installation Exclusion**: Commercial installations, institutional entities, and non-residential connections are excluded from this residential subsidy by default (subsidy calculated as ₹0 unless a specific approved commercial scheme is configured by the Client).
- **FR-4.3 Historical & Future Scheme Support**: Administrators can schedule future policy adjustments or test historical quotes against legacy rules (e.g., Phase II benchmark scheme).
- **FR-4.4 Subsidy Responsibility**: Subsidy calculations are based strictly on date-effective tables approved in writing by the Client. The platform does not guarantee statutory disbursement or government approval.
- **FR-4.5 Payback Math**: Incorporates 1,400 kWh/kW/yr generation, MSEDCL residential tariff slabs (~₹8.20/unit average), 4.5% annual tariff escalation, and 0.7% annual solar panel degradation across 25 years.

### 6.5 Module 5: Customer Quotation Presentation & PDF Generator
- **FR-5.1 "Simple Story First" Presentation**: Highlights the 4 primary decision metrics before technical schematics:
  1. System Sizing (kW)
  2. Net Cost After Subsidy (₹)
  3. Payback Period (Years)
  4. Estimated Annual Savings (₹/year)
- **FR-5.2 Milestone Payment Schedule**:
  - Milestone 1: 10% Booking Advance
  - Milestone 2: 40% DISCOM Sanction & Material Delivery
  - Milestone 3: 40% Installation & Wiring Completion
  - Milestone 4: 10% Net Meter Energization & Subsidy Claim
- **FR-5.3 Vector PDF Generation**: Produces a branded, downloadable quote PDF incorporating Company A credentials, customer details, warranty schedules, and payment terms.

### 6.6 Module 6: Public Customer Status Link (`/track/:token`)
- **FR-6.1 Zero-Login Public Tracker & Token Security**:
  - Customers access live project status via cryptographically random tracking tokens with at least 128 bits of entropy (`TRK-` followed by high-entropy unguessable token).
  - Supports token revocation and regeneration upon customer request or security incident.
  - Rate limiting applied to public tracking endpoints (e.g., 60 requests/minute per client IP) to mitigate enumeration attacks.
  - Privacy safeguards: Never exposes internal database IDs, raw Aadhaar/bank numbers, or sensitive documents without authorization. All access to tracking URLs and document downloads is audit-logged.
- **FR-6.2 8-Stage Progress Tracker**:
  1. Lead Qualified & AI Sized
  2. Roof Survey Completed
  3. Quote Approved & Advance Paid
  4. MSEDCL Net Metering Application Submitted
  5. Solar Equipment Installed on Roof
  6. MSEDCL Inspection & Bi-directional Net Meter Energized
  7. PM Surya Ghar DBT Claim Filed on National Portal
  8. Subsidy Credited to Bank Account
- **FR-6.3 Document Locker**: In-browser download for survey reports, turnkey contracts, MSEDCL sanction letters, and DBT receipts.
- **FR-6.4 Mock Payment Gateway (Simulation Mode)**: Integrated UPI/NetBanking simulation for demonstrating milestone advance workflows. Operates in simulation mode without transferring real money.

### 6.7 Module 7: Project Coordinator & Internal SLA Monitoring Dashboard
- **FR-7.1 Internal Monitoring Thresholds**: Monitors internal operational guidelines (MSEDCL sanction monitoring threshold: 10 days; DBT release monitoring threshold: 20 days).
- **FR-7.2 Bottleneck Alert Center & Escalation Records**: Automatically flags delayed projects with color-coded urgency. The one-click MSEDCL escalation feature creates an internal escalation record and draft escalation communication for staff review, rather than an automated direct transmission into MSEDCL's internal IT systems unless a separately approved external integration is implemented.

### 6.8 Module 8: Multilingual WhatsApp & SMS Dispatcher (Simulation Mode)
- **FR-8.1 Automated Simulation Triggers**: Logs status updates on milestone transitions. The notification simulation creates an internal notification log and visual dispatch record in the CRM, and does not imply actual SMS/WhatsApp packet transmission to a customer's cellular handset.
- **FR-8.2 Localization & Live Carrier Clarification**: Pre-configured message templates in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **English**. Operates in simulation mode without dispatching paid live SMS/WhatsApp traffic unless live provider accounts (e.g., Meta WhatsApp Cloud API / Gupshup / Twilio) are contracted and funded by the Client.

---

## 7. Out-of-Scope Boundaries

The following areas are explicitly excluded from this release:
1. Automated bot-based submission on the National Subsidy Portal (prohibited by CAPTCHA and Aadhaar OTP verification).
2. Internal inventory purchasing and ERP warehouse logistics.
3. Inverter IoT string-level telemetry and live generation monitoring.
4. Live merchant payment gateway onboarding and commercial WhatsApp Business API fees (paid directly by Client under Clause 12 of the Agreement).
