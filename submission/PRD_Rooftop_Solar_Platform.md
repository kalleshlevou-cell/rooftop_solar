# Product Requirements Document (PRD v2.0)
## Rooftop Solar Lead Qualification, Quotation & Project Tracker Platform
### Schedule A to the Master Software Development & Professional Services Agreement

**Client Organization**: Company A Solar Pvt. Ltd., Nagpur (Maharashtra)  
**Industry**: Distributed Rooftop Solar EPC (Residential & Commercial)  
**Project Title**: Digital Lead Qualification, Instant Quotation & Milestone Project Tracking Suite  
**Document Reference**: Schedule A (PRD v2.0)  
**Contractual Value**: ₹6,00,000 (INR 6 Lakh, Exclusive of Applicable GST)  
**Project Duration**: 6 Calendar Weeks (42 Calendar Days)  
**Warranty Period**: 60 Calendar Days Post-Deployment  
**Change Request Rate**: ₹2,500 per developer hour (subject to signed approval)  
**Document Status**: Formally Approved Functional Specification  

---

## 1. Executive Summary & Client Context

Company A is an established rooftop solar engineering, procurement, and construction (EPC) provider based in Nagpur, delivering residential and commercial rooftop solar installations across the 11 districts of the Vidarbha region in Maharashtra.

### 1.1 Verified Client Baseline (Supplied Facts)
- **Workforce**: Approximately 75 staff members across sales, site survey, engineering, liaisoning, and administration.
- **Annual Turnover**: ₹30 Crore to ₹38 Crore per annum.
- **Installation Volume**: Approximately 120 rooftop solar installations commissioned per month.
- **Current Operational Workflow**: Leads originate via WhatsApp and manual telephone inquiries, logged manually in spreadsheets. Sales representatives call each lead to request electricity bill photographs. Field surveyors are dispatched for physical roof measurements before qualification. Quotations are drafted manually in Microsoft Excel (requiring ~3 days). Net metering applications and PM Surya Ghar subsidy claims with MSEDCL (Maharashtra State Electricity Distribution Co. Ltd.) are tracked across disconnected sheets.

---

## 2. Business Problem & Financial Impact Analysis

The platform is designed to remediate operational bottlenecks and financial leakages identified during the initial operational assessment.

### 2.1 Stated Business Case Assumptions (Labelled for Validation)
The financial justification relies on the following operational assumptions provided in the project brief, to be benchmarked during the first 30 days of platform deployment:

1. **Lead Flow & Qualification Baseline (Assumptions)**:
   - Total Monthly Inquiries: ~1,400 leads/month.
   - Genuine Viable Buyer Proportion: 25% (~350 leads/month).
   - Monthly Field Surveys Conducted: ~220 physical surveys/month.
   - **Unqualified Survey Proportion**: **40% of surveys (88 visits/month)** are conducted for properties that will never transact (primarily tenants lacking landlord NOC or consumers with monthly electricity bills under ₹1,000 where payback is extended).
   - **Unit Cost per Physical Survey**: Estimated at **₹2,500 per survey visit** (incorporating surveyor compensation, round-trip travel across Nagpur/Vidarbha, and measuring equipment depreciation).

2. **Quotation Turnaround & Opportunity Loss (Assumptions)**:
   - Current Quote Turnaround Time: **3 business days (72 hours)**.
   - Lead Attrition to Faster Competitors: **4% of genuine leads (14 orders/month)** are lost to competing installers providing faster turnaround.
   - Average Order Value: **₹2,00,000** per rooftop solar system (approx. 3 kW system).
   - Contractor Gross Margin: **18%** (₹36,000 gross margin per lost installation).

### 2.2 Financial Bleed Model

$$\begin{aligned}
\text{Annual Wasted Survey Cost} &= 88 \text{ wasted visits/mo} \times ₹2,500 \times 12 \text{ months} = \mathbf{₹26,40,000 / \text{year}} \\
\text{Annual Lost Gross Margin} &= 14 \text{ lost sales/mo} \times ₹36,000 \text{ margin} \times 12 \text{ months} = \mathbf{₹60,48,000 / \text{year}} \\
\hline
\mathbf{\text{Total Estimated Annual Bleed}} &= \mathbf{₹86,88,000 / \text{year}}
\end{aligned}$$

*Note: While the ₹86.88 Lakh figure represents a modeled economic opportunity loss, post-launch analytics will measure actual field metrics against these baseline assumptions.*

---

## 3. Project Objectives & Target Success Metrics (Proposed KPIs)

The software project aims to achieve the following performance targets within 90 days of production go-live:

| Performance Metric | Baseline (Assumed) | Project Target Goal | Validation & Measurement Methodology |
| :--- | :---: | :---: | :--- |
| **Unqualified Physical Survey Rate** | 40% of surveys | **&lt; 15%** | Measured as: $\frac{\text{Survey visits resulting in non-viable quotes}}{\text{Total physical survey visits completed}} \times 100$ |
| **Same-Day Quotation Turnaround** | ~15% of surveys | **&gt; 90%** | Measured as: $\frac{\text{Quotes sent within 24 hours of bill submission}}{\text{Total viable inquiries processed}} \times 100$ |
| **Routine Inbound Status Calls** | Estimated baseline | **&ge; 50% Reduction** | Measured via CRM incoming call tags for DISCOM sanction, installation, and subsidy status checks. |

*(Cautionary Note: These percentage reductions represent targeted project performance goals for the platform, not historical or pre-existing achievements.)*

---

## 4. Regulatory & Technical Grounding (Verified Facts vs Constraints)

### 4.1 Verified Policy: PM Surya Ghar Muft Bijli Yojana
The Central Residential Solar Rooftop Scheme (notified by MNRE in February 2024) replaces all legacy benchmark subsidy schemes for residential rooftop solar:
- **Up to 2 kW capacity**: ₹30,000 per kW (e.g., ₹60,000 for a 2 kW system).
- **3rd kW incremental capacity**: ₹18,000 for the additional 1 kW.
- **Capacity above 3 kW**: Fixed maximum cap of **₹78,000** total central financial assistance.
- **Disbursement Mechanism**: Direct Benefit Transfer (DBT) directly from the Central Government into the homeowner’s verified Aadhaar-linked bank account following DISCOM net-meter inspection.
- **Client Governance**: The Client shall inspect, approve, and maintain the date-effective subsidy tables in the software against official Ministry notifications.

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
- **FR-1.1 Occupancy Qualification**: Explicit selector for `Property Owner` vs `Tenant`. Selecting `Tenant` triggers an automated legal guidance prompt noting MSEDCL regulations regarding landlord NOC, automatically scheduling a 5-minute phone consultation rather than a field survey.
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
  - `Low (tenant)`: Tenant status → 5-Minute Phone Consultation on Landlord Consent (Logs ₹2,500 survey savings).
  - `Low (small bill)`: Owner + Monthly Bill &lt; ₹1,000 → 1 kW Micro-Solar Guidance Call (Logs ₹2,500 survey savings).
- **FR-3.3 System Sizing Formula**:
  $$\text{Recommended Capacity (kW)} = \text{Round}\left(\frac{\text{Monthly Consumption (kWh)}}{116.7}\right)$$

### 6.4 Module 4: Dated Subsidy Rules & Pricing Engine
- **FR-4.1 Date-Bounded Rule Evaluation**: Subsidies are stored in date-effective tables (`effectiveFrom` and `effectiveTo`). The system queries the active rule corresponding to the quote creation date.
- **FR-4.2 PM Surya Ghar Calculation**:
  $$\text{Subsidy} = \begin{cases} 
  \text{kW} \times ₹30,000 & \text{if } \text{kW} \le 2 \\
  (2 \times ₹30,000) + (1 \times ₹18,000) = ₹78,000 & \text{if } \text{kW} \ge 3 
  \end{cases}$$
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
- **FR-6.1 Zero-Login Architecture**: Customers access their live project status via secure tracking tokens without requiring usernames or passwords.
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
- **FR-7.2 Bottleneck Alert Center**: Automatically flags delayed projects with color-coded urgency and enables one-click escalation to MSEDCL sub-division engineers.

### 6.8 Module 8: Multilingual WhatsApp & SMS Dispatcher (Simulation Mode)
- **FR-8.1 Automated Simulation Triggers**: Logs status updates on milestone transitions.
- **FR-8.2 Localization**: Pre-configured message templates in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **English**. Operates in simulation mode without dispatching paid live SMS/WhatsApp traffic unless live provider accounts are contracted.

---

## 7. Out-of-Scope Boundaries

The following areas are explicitly excluded from this release:
1. Automated bot-based submission on the National Subsidy Portal (prohibited by CAPTCHA and Aadhaar OTP verification).
2. Internal inventory purchasing and ERP warehouse logistics.
3. Inverter IoT string-level telemetry and live generation monitoring.
4. Live merchant payment gateway onboarding and commercial WhatsApp Business API fees (paid directly by Client under Clause 12 of the Agreement).
