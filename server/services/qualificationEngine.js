/**
 * Lead Qualification Engine for Company A, Nagpur
 * Solves the ₹26.4 Lakh/Year Wasted Survey Problem!
 * 
 * Rules:
 * 1. Low score NEVER rejects a lead: it simply replaces the expensive ₹2,500 on-site surveyor
 *    visit with a focused 5-minute phone consultation.
 * 2. High score triggers same-day on-site survey booking and expedited quote.
 * 3. Recommended size matches generation factor (1,400 kWh / kW / year = ~116.7 units/month per kW).
 */

export function qualifyLead({
  occupancyType, // 'Owner' | 'Tenant'
  monthlyBill,   // Number in ₹
  avgUnits,      // Monthly kWh units
  roofType,      // 'Concrete Flat', 'Metal Sheet', 'Tiled / Slanted', 'Other'
  roofAreaSqFt,  // Number in sq ft
  pincode,       // Nagpur / Vidarbha pincode (e.g., 440001 - 445000)
  sanctionedLoadKw // From bill OCR or entered
}) {
  const billAmount = Number(monthlyBill) || 0;
  const units = Number(avgUnits) || (billAmount > 0 ? Math.round(billAmount / 9.4) : 0);
  const area = Number(roofAreaSqFt) || 0;
  const isOwner = occupancyType === 'Owner';

  let score = 'Medium';
  let scoreCategory = 'MEDIUM';
  let recommendationAction = 'Standard Survey / Remote Quote';
  let recommendedKw = 0;
  let reason = '';
  let surveyCostSaved = 0; // ₹2,500 saved when replacing surveyor visit with a phone call
  let leadTags = [];

  // 1. Check Tenant condition first
  if (!isOwner) {
    score = 'Low (tenant)';
    scoreCategory = 'LOW_TENANT';
    recommendedKw = null; // No recommended rooftop install for tenants
    recommendationAction = '5-Min Phone Consultation (Landlord Consent & Virtual Consult)';
    reason = 'Applicant is a tenant. Under MSEDCL rules, rooftop solar requires registered property owner NOC and separate sanctioned meter. A physical survey (costing ₹2,500) is avoided in favor of a phone guidance call.';
    surveyCostSaved = 2500;
    leadTags.push('Tenant', 'Needs Landlord NOC', 'Virtual Call Assigned');
  } 
  // 2. Check Small Bill condition (< ₹1,000 or < 100 units)
  else if (billAmount < 1000 || units < 100) {
    score = 'Low (small bill)';
    scoreCategory = 'LOW_BILL';
    recommendedKw = 1; // Micro 1 kW solar
    recommendationAction = 'Mini 1 kW Advice Call (Replace Survey with Call)';
    reason = `Monthly bill of ₹${billAmount} (${units} units) is below standard threshold (₹1,000). Payback period is extended. Assigned to phone consultation rather than a ₹2,500 on-site survey.`;
    surveyCostSaved = 2500;
    leadTags.push('Small Bill (< ₹1,000)', '1 kW Suitable', 'Phone Call Assigned');
  } 
  // 3. Medium Bill (₹1,000 - ₹2,500 or 100 - 250 units)
  else if (billAmount <= 2500 || units <= 250) {
    score = 'Medium';
    scoreCategory = 'MEDIUM';
    // Calculate recommended kW: 116.7 units/month per kW
    const calculatedKw = Math.max(1, Math.round(units / 116.7));
    recommendedKw = calculatedKw;
    recommendationAction = 'Standard Survey Visit (Scheduled within 48h)';
    reason = `Moderate electricity consumption (${units} units/mo, ₹${billAmount}). Viable for ${recommendedKw} kW system with government subsidy.`;
    surveyCostSaved = 0;
    leadTags.push('Viable Homeowner', `${recommendedKw} kW Candidate`);
  } 
  // 4. High Bill (> ₹2,500 or > 250 units) - Prime Customer!
  else {
    score = 'High';
    scoreCategory = 'HIGH';
    // Sizing: units / 116.7
    let calculatedKw = Math.round(units / 116.7);
    if (calculatedKw < 3 && billAmount >= 3000) calculatedKw = 3;
    recommendedKw = Math.min(Math.max(2, calculatedKw), 15);
    recommendationAction = 'Priority Same-Day Surveyor Visit (Hot Genuine Lead)';
    reason = `High consumption (${units} units/mo, ₹${billAmount}/mo). High ROI candidate with quick payback (~3-4 years). Eligible for maximum PM Surya Ghar central subsidy (up to ₹78,000). Priority surveyor dispatched today.`;
    surveyCostSaved = 0;
    leadTags.push('High ROI', 'Priority Visit', `${recommendedKw} kW Candidate`, 'Fast-Track Quote');
  }

  // Roof Area Suitability Check (1 kW needs ~90 sq ft shadow-free area)
  let roofFeasibility = 'Feasible';
  if (recommendedKw && area > 0) {
    const requiredArea = recommendedKw * 90;
    if (area < requiredArea) {
      roofFeasibility = `Limited Area (${area} sq ft vs ${requiredArea} sq ft required for ${recommendedKw} kW). Sizing may need adjustment or high-efficiency panels.`;
      leadTags.push('Space Constrained');
    }
  }

  // Vidarbha Pincode Validation
  const vidarbhaPincodePrefixes = ['440', '441', '442', '443', '444', '445'];
  const pinStr = String(pincode || '').trim();
  const isVidarbha = vidarbhaPincodePrefixes.some(pref => pinStr.startsWith(pref));
  const locationTag = isVidarbha ? 'Vidarbha Core Service Area' : 'Outside Core Vidarbha';

  return {
    score,
    scoreCategory,
    recommendedKw,
    recommendationAction,
    reason,
    surveyCostSaved,
    billAmount,
    avgUnits: units,
    roofFeasibility,
    isVidarbha,
    locationTag,
    leadTags,
    priority: score === 'High' ? 'P1_IMMEDIATE' : score === 'Medium' ? 'P2_STANDARD' : 'P3_CALL_ONLY'
  };
}

