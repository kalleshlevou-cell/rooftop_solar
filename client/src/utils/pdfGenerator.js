import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateQuotePDF(quote, customer = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [22, 101, 52]; // Deep emerald solar green
  const amberColor = [217, 119, 6]; // Amber solar gold
  const darkTextColor = [30, 41, 59];
  const mutedTextColor = [100, 116, 139];

  // Top Accent Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 8, 'F');

  // Company Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text('COMPANY A SOLAR', 14, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...mutedTextColor);
  doc.text('Nagpur & Vidarbha Rooftop Solar EPC | 120+ Monthly Installations', 14, 28);
  doc.text('Civil Lines, Nagpur 440001, Maharashtra | +91 712 255XXXX | info@companya-solar.in', 14, 33);

  // Quote Metadata Box (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkTextColor);
  doc.text(`QUOTE REF: ${quote.id || 'QT-30881-A'}`, 135, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Date: ${quote.quoteDate || new Date().toISOString().split('T')[0]}`, 135, 25);
  doc.text(`Valid Until: ${quote.validUntil || '30 Days from issue'}`, 135, 30);
  doc.text(`DISCOM: MSEDCL Mahavitaran (Vidarbha)`, 135, 35);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 39, 196, 39);

  // Customer Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('CUSTOMER & SITE DETAILS', 14, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkTextColor);
  doc.text(`Customer Name: ${customer.name || quote.customerName || 'Prashant Wankhede'}`, 14, 52);
  doc.text(`Site Address: ${customer.address || quote.address || 'Nagpur, Maharashtra'}`, 14, 57);
  doc.text(`Pincode: ${customer.pincode || quote.pincode || '440022'}`, 14, 62);
  
  const consNum = customer.consumerNumber || quote.consumerNumber || '049010045231';
  const maskedCons = consNum.substring(0, 5) + '*****' + consNum.slice(-2);
  doc.text(`MSEDCL Consumer No: ${maskedCons} (DPDP Act Protected)`, 110, 52);
  doc.text(`Tariff Category: ${customer.tariffCategory || 'LT-I B Residential'}`, 110, 57);
  doc.text(`Sanctioned Load: ${customer.sanctionedLoadKw || 3.5} kW`, 110, 62);

  // Hero Story Box: Simple Story First!
  doc.setFillColor(240, 253, 244); // Light emerald bg
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14, 68, 182, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  doc.text('EXECUTIVE SUMMARY: YOUR SOLAR ROI STORY', 20, 75);

  // 4 Big Metrics
  // Metric 1: System Size
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('SYSTEM SIZE', 22, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkTextColor);
  doc.text(`${quote.systemKw || 3} kW`, 22, 90);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('On-Grid Rooftop', 22, 95);

  // Metric 2: Net Investment
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('NET INVESTMENT', 65, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text(`Rs. ${(quote.netCost || 102000).toLocaleString('en-IN')}`, 65, 90);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(`After Rs. ${(quote.subsidyAmount || 78000).toLocaleString('en-IN')} Subsidy`, 65, 95);

  // Metric 3: Payback Period
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('PAYBACK PERIOD', 115, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(217, 119, 6); // Amber
  doc.text(`${quote.paybackYears || 3.0} Years`, 115, 90);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Free power for 22+ yrs', 115, 95);

  // Metric 4: Annual Generation
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('EST. ANNUAL SAVINGS', 158, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkTextColor);
  doc.text(`Rs. ${(quote.annualElectricitySavings || 34440).toLocaleString('en-IN')}`, 158, 90);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${(quote.annualGenerationKwh || (quote.systemKw * 1400)).toLocaleString('en-IN')} Units/yr`, 158, 95);

  // Technical Scope of Work Table
  autoTable(doc, {
    startY: 112,
    head: [['Component', 'Technical Specification', 'Warranty & Compliance']],
    body: [
      ['Solar PV Modules', `${quote.panelTierName || 'Tier-1 Mono PERC 540Wp DCR Modules'} (${quote.panelCount || 6} Panels)`, '25-Year Linear Performance Warranty (Made in India ALMM)'],
      ['Grid-Tied Inverter', quote.inverterSpec || '3.3 kW Single-Phase String Inverter (IP65, Built-in WiFi Monitoring)', '10-Year Manufacturer Replacement Warranty'],
      ['Mounting Structure', quote.structureName || 'Hot-Dip Galvanized (HDG 80 Micron) Elevated Structure (150 km/h wind rated)', '10-Year Structural Integrity Warranty'],
      ['Balance of System', 'Polycab/Finolex DC & AC Solar Cables, IP67 MC4 Connectors, ACDB & DCDB with SPD & MCB', 'IS / IEC Certified Solar Standards'],
      ['Earthing & Safety', '3 Dedicated Chemical Earthing Pits (Inverter, DC, Lightning) + Solid Copper ESE Lightning Arrester', 'MSEDCL CEA Safety Standard Compliant'],
      ['DISCOM Liaisoning', 'Net-metering application, inspection, testing report & commissioning with Mahavitaran', 'Turnkey Execution by Company A Staff']
    ],
    headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { fontSize: 8, textColor: darkTextColor },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 }
  });

  // Financial Breakdown & Subsidy Table
  const tableEndY = doc.lastAutoTable.finalY + 6;

  autoTable(doc, {
    startY: tableEndY,
    head: [['Financial Breakdown & Government Subsidy', 'Amount (INR)']],
    body: [
      ['Turnkey Rooftop Solar EPC Cost (Inclusive of GST & Engineering)', `Rs. ${(quote.grossCost || 180000).toLocaleString('en-IN')}`],
      [`Central Government Subsidy (PM Surya Ghar: Muft Bijli Yojana DBT)`, `- Rs. ${(quote.subsidyAmount || 78000).toLocaleString('en-IN')}`],
      ['NET INVESTMENT PAYABLE BY CUSTOMER', `Rs. ${(quote.netCost || 102000).toLocaleString('en-IN')}`],
      ['Guaranteed Generation Factor (Fixed Engineering Formula)', `${quote.generationFactor || 1400} Units (kWh) / kW / Year`],
      ['Estimated 25-Year Cumulative Electricity Savings', `Rs. ${(quote.lifetime25YrSavings || 861000).toLocaleString('en-IN')}`]
    ],
    headStyles: { fillColor: [51, 65, 85], textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { fontSize: 8, textColor: darkTextColor },
    columnStyles: {
      0: { cellWidth: 130 },
      1: { cellWidth: 52, halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  // Payment Milestones
  const milestonesY = doc.lastAutoTable.finalY + 6;

  autoTable(doc, {
    startY: milestonesY,
    head: [['Milestone Stage', 'Percentage', 'Payable (INR)', 'Trigger Event']],
    body: [
      ['Stage 1: Booking Advance', '10%', `Rs. ${Math.round((quote.netCost || 102000) * 0.1).toLocaleString('en-IN')}`, 'Design approval & MSEDCL portal application submission'],
      ['Stage 2: Material Dispatch', '40%', `Rs. ${Math.round((quote.netCost || 102000) * 0.4).toLocaleString('en-IN')}`, 'Solar modules, inverter & structure delivery at site'],
      ['Stage 3: Installation & Wiring', '40%', `Rs. ${Math.round((quote.netCost || 102000) * 0.4).toLocaleString('en-IN')}`, 'Array mounting, earthing pits & internal wiring completion'],
      ['Stage 4: Commissioning & Net Meter', '10%', `Rs. ${Math.round((quote.netCost || 102000) * 0.1).toLocaleString('en-IN')}`, 'MSEDCL net-meter installation & subsidy claim submission']
    ],
    headStyles: { fillColor: [71, 85, 105], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, textColor: darkTextColor },
    margin: { left: 14, right: 14 }
  });

  // Signatures & Footer
  const footerY = 270;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('Prepared by: Amit Verma (Technical Sales, Company A)', 14, footerY);
  doc.text('Approved by: Founder & Managing Director, Company A', 120, footerY);

  doc.setFontSize(7);
  doc.text('* Subsidy is disbursed directly by MNRE DBT to homeowner bank account upon net meter energization. Generated using Company A Solar ERP.', 14, footerY + 8);

  // Save the PDF
  const filename = `Quote-${quote.id || 'CompanyA-Solar'}-${customer.name?.replace(/\s+/g, '_') || 'Customer'}.pdf`;
  doc.save(filename);
}
