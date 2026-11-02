/**
 * Persistent Data Store for Company A, Nagpur
 * Saves state to server/data/store.json so changes persist.
 * Seeds with prompt sample data and realistic active Vidarbha projects.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'store.json');

// Default Seed Data
const DEFAULT_SUBSIDY_RULES = [
  {
    id: 'SUB-2024-ACTIVE',
    code: 'PM_SURYA_GHAR_2024',
    name: 'PM Surya Ghar: Muft Bijli Yojana (Active Central Scheme)',
    schemeAuthority: 'Ministry of New and Renewable Energy (MNRE) / National Portal',
    effectiveFrom: '2024-02-15',
    effectiveTo: '2099-12-31',
    isActive: true,
    type: 'TIERED_PER_KW',
    tier1MaxKw: 2,
    tier1RatePerKw: 30000,
    tier2RatePerKw: 18000,
    maxCap: 78000,
    notes: 'Direct DBT subsidy credited to consumer Aadhaar-linked bank account within 30 days of net meter commissioning. Verified active policy.'
  },
  {
    id: 'SUB-2022-LEGACY',
    code: 'MNRE_PHASE_2_LEGACY',
    name: 'Rooftop Solar Phase II (Legacy Historical Scheme)',
    schemeAuthority: 'MNRE Central Financial Assistance',
    effectiveFrom: '2022-01-01',
    effectiveTo: '2024-02-14',
    isActive: false,
    type: 'PERCENTAGE_BENCHMARK',
    benchmarkCostPerKw: 54000,
    maxCap: 150000,
    notes: 'Legacy scheme based on 40% up to 3 kW and 20% beyond 3 kW up to 10 kW. Preserved for historical quotes and compliance.'
  }
];

const DEFAULT_PRICING_CONFIG = {
  generationFactorPerKwYear: 1400, // Client rule: 1,400 units per kW per year
  gridTariffPerUnit: 8.20, // MSEDCL residential slab average
  tariffEscalationRate: 4.5, // 4.5% annual tariff inflation
  panelTiers: [
    {
      id: 'TIER_STANDARD',
      name: 'Tier-1 Mono PERC DCR (Made in India)',
      efficiency: '21.4%',
      warrantyYears: 25,
      pricePerKw: {
        1: 68000,
        2: 62500, // 1,25,000 for 2kW
        3: 60000, // 1,80,000 for 3kW
        4: 58750, // 2,35,000 for 4kW
        5: 57000, // 2,85,000 for 5kW
        default: 56000
      }
    },
    {
      id: 'TIER_PREMIUM_BIFACIAL',
      name: 'High-Efficiency TOPCon Bifacial (+15% rear gain)',
      efficiency: '22.8%',
      warrantyYears: 30,
      pricePerKw: {
        1: 72000,
        2: 66000,
        3: 63500, // 1,90,500 for 3kW
        4: 62000,
        5: 60000,
        default: 59500
      }
    }
  ],
  structureOptions: [
    { id: 'STANDARD_RCC', name: 'Standard Elevated GI Structure (3-4 ft)', surcharge: 0 },
    { id: 'HIGH_RISE_TERRACE', name: 'High-Rise Usable Terrace Super-Structure (> 7 ft)', surcharge: 8000 }
  ],
  surveyCostPerVisit: 2500, // ₹2,500 surveyor cost per visit
  discomLiaisonFee: 4500 // Included in turnkey quote
};

const DEFAULT_LEADS = [
  {
    id: 'LD-30881',
    name: 'Prashant Wankhede',
    phone: '+91 98230 44102',
    email: 'prashant.wankhede@gmail.com',
    occupancyType: 'Owner',
    monthlyBill: 3200,
    avgUnits: 340,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 850,
    pincode: '440022',
    address: 'Plot 42, Laxmi Nagar, Nagpur 440022',
    consumerNumber: '049010045231',
    sanctionedLoadKw: 3.5,
    tariffCategory: 'LT-I B Residential',
    recommendedKw: 3,
    score: 'High',
    scoreCategory: 'HIGH',
    recommendationAction: 'Priority Same-Day Surveyor Visit (Hot Genuine Lead)',
    surveyCostSaved: 0,
    status: 'SURVEY_COMPLETED',
    quoteGenerated: true,
    quoteId: 'QT-30881-A',
    trackingToken: 'TRK-WANKHEDE-30881',
    createdAt: '2026-10-31T09:15:00.000Z',
    updatedAt: '2026-11-01T15:30:00.000Z',
    billImage: 'msedcl_sample_bill_high.png',
    billDetails: {
      consumerNumber: '049010045231',
      maskedConsumerNumber: '04901*****31',
      tariff: 'LT-I B Residential',
      sanctionedLoad: 3.5,
      units: 340,
      amount: 3200,
      imageQualityScore: 95
    },
    history: [
      { timestamp: '2026-10-31T09:15:00.000Z', stage: 'LEAD_RECEIVED', note: 'Lead submitted via web form with MSEDCL bill photo' },
      { timestamp: '2026-10-31T09:17:00.000Z', stage: 'LEAD_QUALIFIED', note: 'AI qualified lead as High (340 units/₹3,200 bill). Recommended 3 kW system.' },
      { timestamp: '2026-11-01T11:00:00.000Z', stage: 'SURVEY_COMPLETED', note: 'Surveyor Amit Verma completed roof inspection. 850 sq ft unshaded RCC terrace verified.' },
      { timestamp: '2026-11-01T14:30:00.000Z', stage: 'QUOTE_SENT', note: 'Official Quote QT-30881-A sent via WhatsApp.' }
    ]
  },
  {
    id: 'LD-30902',
    name: 'Rohit Meshram',
    phone: '+91 94221 88319',
    email: 'rohit.meshram@outlook.com',
    occupancyType: 'Tenant',
    monthlyBill: 1900,
    avgUnits: 210,
    roofType: 'Metal Sheet',
    roofAreaSqFt: 400,
    pincode: '440010',
    address: 'Flat 302, Gokulpeth, Nagpur 440010',
    consumerNumber: '049015523912',
    sanctionedLoadKw: 2.0,
    tariffCategory: 'LT-I Residential',
    recommendedKw: null,
    score: 'Low (tenant)',
    scoreCategory: 'LOW_TENANT',
    recommendationAction: '5-Min Phone Consultation (Landlord Consent & Virtual Consult)',
    surveyCostSaved: 2500, // SAVED ₹2,500!
    status: 'PHONE_CONSULTATION_SCHEDULED',
    quoteGenerated: false,
    trackingToken: 'TRK-MESHRAM-30902',
    createdAt: '2026-11-01T10:20:00.000Z',
    updatedAt: '2026-11-01T10:25:00.000Z',
    billImage: 'msedcl_sample_bill_tenant.png',
    billDetails: {
      consumerNumber: '049015523912',
      maskedConsumerNumber: '04901*****12',
      tariff: 'LT-I Residential',
      sanctionedLoad: 2.0,
      units: 210,
      amount: 1900,
      imageQualityScore: 90
    },
    history: [
      { timestamp: '2026-11-01T10:20:00.000Z', stage: 'LEAD_RECEIVED', note: 'Form submitted' },
      { timestamp: '2026-11-01T10:22:00.000Z', stage: 'LEAD_QUALIFIED', note: 'Evaluated as Low (tenant). Replaced ₹2,500 survey with 5-minute virtual consultation.' }
    ]
  },
  {
    id: 'LD-30915',
    name: 'Ayesha Siddiqui',
    phone: '+91 98902 12948',
    email: 'ayesha.siddiqui@rediffmail.com',
    occupancyType: 'Owner',
    monthlyBill: 650,
    avgUnits: 85,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 600,
    pincode: '440002',
    address: 'House 14, Mominpura, Nagpur 440002',
    consumerNumber: '049019912044',
    sanctionedLoadKw: 1.0,
    tariffCategory: 'LT-I Residential',
    recommendedKw: 1,
    score: 'Low (small bill)',
    scoreCategory: 'LOW_BILL',
    recommendationAction: 'Mini 1 kW Advice Call (Replace Survey with Call)',
    surveyCostSaved: 2500, // SAVED ₹2,500!
    status: 'PHONE_CONSULTATION_SCHEDULED',
    quoteGenerated: false,
    trackingToken: 'TRK-SIDDIQUI-30915',
    createdAt: '2026-11-01T14:45:00.000Z',
    updatedAt: '2026-11-01T14:50:00.000Z',
    billImage: 'msedcl_sample_bill_low.png',
    billDetails: {
      consumerNumber: '049019912044',
      maskedConsumerNumber: '04901*****44',
      tariff: 'LT-I Residential',
      sanctionedLoad: 1.0,
      units: 85,
      amount: 650,
      imageQualityScore: 92
    },
    history: [
      { timestamp: '2026-11-01T14:45:00.000Z', stage: 'LEAD_RECEIVED', note: 'Form submitted' },
      { timestamp: '2026-11-01T14:48:00.000Z', stage: 'LEAD_QUALIFIED', note: 'Evaluated as Low (small bill ₹650). Replaced ₹2,500 physical survey with 1 kW micro-solar advice call.' }
    ]
  },
  {
    id: 'LD-30820',
    name: 'Rajesh Agrawal',
    phone: '+91 98222 30190',
    email: 'rajesh.agrawal@agrawalsurgicals.com',
    occupancyType: 'Owner',
    monthlyBill: 5800,
    avgUnits: 620,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 1400,
    pincode: '440012',
    address: 'Commercial Complex, Itwari, Nagpur 440012',
    consumerNumber: '049018471920',
    sanctionedLoadKw: 5.0,
    tariffCategory: 'LT-I B Residential / Commercial Hybrid',
    recommendedKw: 5,
    score: 'High',
    scoreCategory: 'HIGH',
    recommendationAction: 'Priority Same-Day Surveyor Visit',
    surveyCostSaved: 0,
    status: 'DISCOM_APPLICATION_SUBMITTED', // STUCK AT THIS STAGE!
    quoteGenerated: true,
    quoteId: 'QT-30820-A',
    trackingToken: 'TRK-AGRAWAL-30820',
    createdAt: '2026-10-12T08:00:00.000Z',
    updatedAt: '2026-10-16T11:00:00.000Z',
    billImage: 'msedcl_sample_bill_agrawal.png',
    billDetails: {
      consumerNumber: '049018471920',
      maskedConsumerNumber: '04901*****20',
      tariff: 'LT-I B Residential',
      sanctionedLoad: 5.0,
      units: 620,
      amount: 5800,
      imageQualityScore: 96
    },
    history: [
      { timestamp: '2026-10-12T08:00:00.000Z', stage: 'LEAD_RECEIVED', note: 'Lead registered' },
      { timestamp: '2026-10-12T10:00:00.000Z', stage: 'SURVEY_COMPLETED', note: '5 kW roof survey done' },
      { timestamp: '2026-10-13T14:00:00.000Z', stage: 'QUOTE_APPROVED', note: 'Quote approved, advance ₹10,000 received' },
      { timestamp: '2026-10-16T11:00:00.000Z', stage: 'DISCOM_APPLICATION_SUBMITTED', note: 'MSEDCL online portal application filed (Ref: MSEDCL-NGP-9482). Pending DISCOM Junior Engineer sanction.' }
    ]
  },
  {
    id: 'LD-30774',
    name: 'Sunita Deshmukh',
    phone: '+91 97631 55902',
    email: 'sunita.deshmukh@yahoo.com',
    occupancyType: 'Owner',
    monthlyBill: 3400,
    avgUnits: 360,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 900,
    pincode: '440025',
    address: 'Plot 18, Manish Nagar, Nagpur 440025',
    consumerNumber: '049017723910',
    sanctionedLoadKw: 3.5,
    tariffCategory: 'LT-I B Residential',
    recommendedKw: 3,
    score: 'High',
    scoreCategory: 'HIGH',
    recommendationAction: 'Priority Same-Day Surveyor Visit',
    surveyCostSaved: 0,
    status: 'SUBSIDY_CLAIM_FILED', // STUCK AT THIS STAGE!
    quoteGenerated: true,
    quoteId: 'QT-30774-A',
    trackingToken: 'TRK-DESHMUKH-30774',
    createdAt: '2026-09-28T09:00:00.000Z',
    updatedAt: '2026-10-02T16:00:00.000Z',
    billImage: 'msedcl_sample_bill_deshmukh.png',
    billDetails: {
      consumerNumber: '049017723910',
      maskedConsumerNumber: '04901*****10',
      tariff: 'LT-I B Residential',
      sanctionedLoad: 3.5,
      units: 360,
      amount: 3400,
      imageQualityScore: 94
    },
    history: [
      { timestamp: '2026-09-28T09:00:00.000Z', stage: 'LEAD_RECEIVED', note: 'Lead registered' },
      { timestamp: '2026-09-29T10:00:00.000Z', stage: 'SURVEY_COMPLETED', note: 'Survey done' },
      { timestamp: '2026-09-30T14:00:00.000Z', stage: 'QUOTE_APPROVED', note: 'Advance paid' },
      { timestamp: '2026-10-08T11:00:00.000Z', stage: 'DISCOM_APPLICATION_SUBMITTED', note: 'Sanction received' },
      { timestamp: '2026-10-15T16:00:00.000Z', stage: 'MATERIAL_DISPATCHED_INSTALLED', note: 'Panels & inverter installed' },
      { timestamp: '2026-10-20T14:00:00.000Z', stage: 'DISCOM_INSPECTION_METERING', note: 'Net meter commissioned' },
      { timestamp: '2026-10-22T12:00:00.000Z', stage: 'SUBSIDY_CLAIM_FILED', note: 'National portal claim submitted. Pending DBT disbursement.' }
    ]
  },
  {
    id: 'LD-30650',
    name: 'Dr. Anand Kulkarni',
    phone: '+91 98224 77109',
    email: 'dr.anand.kulkarni@gmail.com',
    occupancyType: 'Owner',
    monthlyBill: 4600,
    avgUnits: 490,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 1100,
    pincode: '440015',
    address: 'Bungalow 7, Dhantoli, Nagpur 440015',
    consumerNumber: '049013349018',
    sanctionedLoadKw: 4.0,
    tariffCategory: 'LT-I B Residential',
    recommendedKw: 4,
    score: 'High',
    scoreCategory: 'HIGH',
    recommendationAction: 'Priority Same-Day Surveyor Visit',
    surveyCostSaved: 0,
    status: 'SUBSIDY_CREDITED', // COMPLETED!
    quoteGenerated: true,
    quoteId: 'QT-30650-A',
    trackingToken: 'TRK-KULKARNI-30650',
    createdAt: '2026-09-10T10:00:00.000Z',
    updatedAt: '2026-10-25T11:00:00.000Z',
    billImage: 'msedcl_sample_bill_kulkarni.png',
    billDetails: {
      consumerNumber: '049013349018',
      maskedConsumerNumber: '04901*****18',
      tariff: 'LT-I B Residential',
      sanctionedLoad: 4.0,
      units: 490,
      amount: 4600,
      imageQualityScore: 97
    },
    history: [
      { timestamp: '2026-09-10T10:00:00.000Z', stage: 'LEAD_RECEIVED', note: 'Lead registered' },
      { timestamp: '2026-09-11T12:00:00.000Z', stage: 'SURVEY_COMPLETED', note: 'Survey done' },
      { timestamp: '2026-09-12T15:00:00.000Z', stage: 'QUOTE_APPROVED', note: 'Advance paid' },
      { timestamp: '2026-09-20T10:00:00.000Z', stage: 'DISCOM_APPLICATION_SUBMITTED', note: 'Sanctioned' },
      { timestamp: '2026-09-28T16:00:00.000Z', stage: 'MATERIAL_DISPATCHED_INSTALLED', note: 'Installed' },
      { timestamp: '2026-10-05T14:00:00.000Z', stage: 'DISCOM_INSPECTION_METERING', note: 'Net meter energized' },
      { timestamp: '2026-10-08T11:00:00.000Z', stage: 'SUBSIDY_CLAIM_FILED', note: 'Claim filed' },
      { timestamp: '2026-10-25T11:00:00.000Z', stage: 'SUBSIDY_CREDITED', note: '₹78,000 PM Surya Ghar DBT credited to SBI A/c ending 4902' }
    ]
  }
];

const DEFAULT_QUOTES = [
  {
    id: 'QT-30881-A',
    leadId: 'LD-30881',
    customerName: 'Prashant Wankhede',
    customerPhone: '+91 98230 44102',
    address: 'Plot 42, Laxmi Nagar, Nagpur 440022',
    quoteDate: '2026-11-01',
    validUntil: '2026-11-30',
    systemKw: 3,
    panelTierId: 'TIER_STANDARD',
    panelTierName: 'Tier-1 Mono PERC DCR (540Wp)',
    panelCount: 6, // 6 x 540Wp = 3.24 kWp
    inverterSpec: '3.3 kW Single-Phase On-Grid String Inverter (10 Year Warranty)',
    grossCost: 180000,
    subsidyAmount: 78000, // PM Surya Ghar max subsidy for 3kW
    subsidyRuleApplied: 'PM Surya Ghar: Muft Bijli Yojana (Active Central Scheme)',
    netCost: 102000,
    generationFactor: 1400, // 1,400 units/kW/yr
    annualGenerationKwh: 4200, // 3 * 1400
    monthlyAverageUnits: 350,
    annualElectricitySavings: 34440, // 4200 * 8.20
    paybackYears: 3.0,
    lifetime25YrSavings: 861000,
    co2OffsetTonnesPerYear: 3.44,
    status: 'SENT',
    paymentMilestones: [
      { stage: 'Booking Advance (10%)', amount: 10200, status: 'PENDING' },
      { stage: 'MSEDCL Sanction & Material Dispatch (40%)', amount: 40800, status: 'PENDING' },
      { stage: 'Installation & Mechanical Completion (40%)', amount: 40800, status: 'PENDING' },
      { stage: 'Net Meter Commissioning (10%)', amount: 10200, status: 'PENDING' }
    ]
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    leadId: 'LD-30881',
    recipientName: 'Prashant Wankhede',
    recipientPhone: '+91 98230 44102',
    channel: 'WhatsApp',
    stage: 'SURVEY_COMPLETED',
    language: 'mr',
    messageText: 'आनंदाची बातमी प्रशांत वानखेडे! प्लॉट 42, लक्ष्मीनगर, नागपूर येथील छताचे सर्वेक्षण पूर्ण झाले आहे. ₹78,000 सबसिडीसह 3 kW सोलर कोटेशन तयार आहे. येथे पहा: http://localhost:5173/track/TRK-WANKHEDE-30881',
    timestamp: '2026-11-01T14:30:00.000Z',
    status: 'DELIVERED'
  },
  {
    id: 'NOTIF-2',
    leadId: 'LD-30820',
    recipientName: 'Rajesh Agrawal',
    recipientPhone: '+91 98222 30190',
    channel: 'WhatsApp & SMS',
    stage: 'DISCOM_APPLICATION_SUBMITTED',
    language: 'en',
    messageText: 'Update Rajesh Agrawal: Your grid-tied solar application (Ref: MSEDCL-NGP-9482) has been submitted on the MSEDCL Mahavitaran portal. Sanction is expected within 7-10 business days.',
    timestamp: '2026-10-16T11:05:00.000Z',
    status: 'DELIVERED'
  }
];

class Database {
  constructor() {
    this.data = {
      leads: DEFAULT_LEADS,
      quotes: DEFAULT_QUOTES,
      subsidyRules: DEFAULT_SUBSIDY_RULES,
      pricingConfig: DEFAULT_PRICING_CONFIG,
      notifications: DEFAULT_NOTIFICATIONS
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure all top-level keys exist
        if (!this.data.leads) this.data.leads = DEFAULT_LEADS;
        if (!this.data.quotes) this.data.quotes = DEFAULT_QUOTES;
        if (!this.data.subsidyRules) this.data.subsidyRules = DEFAULT_SUBSIDY_RULES;
        if (!this.data.pricingConfig) this.data.pricingConfig = DEFAULT_PRICING_CONFIG;
        if (!this.data.notifications) this.data.notifications = DEFAULT_NOTIFICATIONS;
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading db file, falling back to memory defaults:', err);
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db file:', err);
    }
  }

  getLeads() { return this.data.leads; }
  getLeadById(id) { return this.data.leads.find(l => l.id === id || l.trackingToken === id); }
  
  createLead(lead) {
    this.data.leads.unshift(lead);
    this.save();
    return lead;
  }

  updateLead(id, updates) {
    const idx = this.data.leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.data.leads[idx] = { ...this.data.leads[idx], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data.leads[idx];
    }
    return null;
  }

  getQuotes() { return this.data.quotes; }
  getQuoteById(id) { return this.data.quotes.find(q => q.id === id || q.leadId === id); }
  createQuote(quote) {
    this.data.quotes.unshift(quote);
    this.save();
    return quote;
  }

  getSubsidyRules() { return this.data.subsidyRules; }
  updateSubsidyRule(id, updates) {
    const idx = this.data.subsidyRules.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.subsidyRules[idx] = { ...this.data.subsidyRules[idx], ...updates };
      this.save();
      return this.data.subsidyRules[idx];
    }
    return null;
  }
  createSubsidyRule(rule) {
    this.data.subsidyRules.unshift(rule);
    this.save();
    return rule;
  }

  getPricingConfig() { return this.data.pricingConfig; }
  updatePricingConfig(updates) {
    this.data.pricingConfig = { ...this.data.pricingConfig, ...updates };
    this.save();
    return this.data.pricingConfig;
  }

  getNotifications() { return this.data.notifications; }
  addNotification(notif) {
    this.data.notifications.unshift(notif);
    this.save();
    return notif;
  }
}

export const db = new Database();
