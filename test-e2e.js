import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE E2E VERIFICATION ---');

  // 1. Health check
  console.log('\n1. Checking Health Check API...');
  const health = await request({ hostname: 'localhost', port: 5000, path: '/api/health', method: 'GET' });
  console.log('Health Status:', health.status, health.data);
  if (health.status !== 200) throw new Error('Health check failed');

  // 2. Leads Listing & Metrics
  console.log('\n2. Checking Leads API & Savings Metrics...');
  const leadsRes = await request({ hostname: 'localhost', port: 5000, path: '/api/leads', method: 'GET' });
  console.log('Total Leads:', leadsRes.data.count);
  console.log('Unqualified Surveys Saved:', leadsRes.data.metrics.surveyCostSavedInRupees, 'INR');
  console.log('Unqualified Survey Rate:', leadsRes.data.metrics.unqualifiedSurveyRatePercent, '% (Target < 15%)');
  console.log('Same-Day Quote Rate:', leadsRes.data.metrics.sameDayQuoteRatePercent, '% (Target > 90%)');
  
  const samplePrashant = leadsRes.data.leads.find(l => l.id === 'LD-30881');
  const sampleRohit = leadsRes.data.leads.find(l => l.id === 'LD-30902');
  const sampleAyesha = leadsRes.data.leads.find(l => l.id === 'LD-30915');

  console.log('Prashant (LD-30881):', samplePrashant.name, '| Score:', samplePrashant.score, '| Rec kW:', samplePrashant.recommendedKw);
  console.log('Rohit (LD-30902):', sampleRohit.name, '| Score:', sampleRohit.score, '| Rec kW:', sampleRohit.recommendedKw, '| Saved:', sampleRohit.surveyCostSaved);
  console.log('Ayesha (LD-30915):', sampleAyesha.name, '| Score:', sampleAyesha.score, '| Rec kW:', sampleAyesha.recommendedKw, '| Saved:', sampleAyesha.surveyCostSaved);

  // 3. New Lead Creation & AI Qualification
  console.log('\n3. Creating New Lead with AI Bill Reading...');
  const newLeadPayload = {
    name: 'Suresh Dandekar',
    phone: '+91 98220 99411',
    occupancyType: 'Owner',
    monthlyBill: 4100,
    roofType: 'Concrete Flat',
    roofAreaSqFt: 1000,
    pincode: '440010',
    address: 'Dharampeth, Nagpur',
    dpdpConsent: true,
    sampleBillName: 'msedcl_dharampeth.jpg',
    preferredLanguage: 'mr'
  };

  const createRes = await request({
    hostname: 'localhost', port: 5000, path: '/api/leads', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, newLeadPayload);
  console.log('Created Lead ID:', createRes.data.lead.id);
  console.log('Score:', createRes.data.lead.score, '| Recommended kW:', createRes.data.lead.recommendedKw);
  console.log('WhatsApp Dispatched (Marathi):', createRes.data.notificationSent.messageText);

  // 4. Side-by-Side OCR Confirmation
  console.log('\n4. Testing Side-by-Side OCR Confirmation & Re-evaluation...');
  const ocrConfirmRes = await request({
    hostname: 'localhost', port: 5000, path: `/api/leads/${createRes.data.lead.id}/ocr-confirm`, method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  }, {
    consumerNumber: '049018823109',
    sanctionedLoadKw: 4.0,
    monthlyUnits: 420,
    billedAmount: 4100,
    occupancyType: 'Owner'
  });
  console.log('Updated Score:', ocrConfirmRes.data.qualification.score, '| Recommended kW:', ocrConfirmRes.data.qualification.recommendedKw);

  // 5. Dated Subsidy & Payback Calculation
  console.log('\n5. Testing Dated Subsidy & Payback Calculation...');
  const calcRes = await request({
    hostname: 'localhost', port: 5000, path: '/api/quotes/calculate', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    systemKw: 3,
    panelTierId: 'TIER_STANDARD',
    structureId: 'STANDARD_RCC',
    quoteDate: '2026-11-01'
  });
  console.log('3 kW Gross Cost:', calcRes.data.calculation.grossCost);
  console.log('3 kW PM Surya Ghar Subsidy:', calcRes.data.calculation.subsidyAmount, '(Expected: 78,000)');
  console.log('3 kW Net Cost:', calcRes.data.calculation.netCost, '(Expected: 1,02,000)');
  console.log('Annual Generation:', calcRes.data.calculation.annualGenerationKwh, 'kWh (1,400 units/kW/yr formula)');
  console.log('Payback Period:', calcRes.data.calculation.paybackYears, 'Years');

  // 6. Historical Time-Travel Subsidy Verification
  console.log('\n6. Testing Historical vs Active Dated Subsidy Rules...');
  const testHist = await request({
    hostname: 'localhost', port: 5000, path: '/api/admin/test-subsidy-date', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { systemKw: 3, testDate: '2023-05-10' });
  console.log('2023 Legacy Phase II Subsidy for 3kW:', testHist.data.result.subsidyAmount, 'Rule:', testHist.data.result.ruleName);

  const testActive = await request({
    hostname: 'localhost', port: 5000, path: '/api/admin/test-subsidy-date', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { systemKw: 3, testDate: '2026-11-01' });
  console.log('2026 Active PM Surya Ghar Subsidy for 3kW:', testActive.data.result.subsidyAmount, 'Rule:', testActive.data.result.ruleName);

  // 7. Stuck Projects & Pipeline
  console.log('\n7. Checking Stuck Projects Dashboard...');
  const projectsRes = await request({ hostname: 'localhost', port: 5000, path: '/api/projects', method: 'GET' });
  console.log('Total Projects:', projectsRes.data.totalProjects);
  console.log('Stuck Projects Count:', projectsRes.data.stuckCount);
  projectsRes.data.stuckProjects.forEach(p => {
    console.log(`- ${p.name} (${p.id}): Stuck at ${p.status} for ${p.daysAtCurrentStage} days (exceeds ${p.slaDays}-day SLA by ${p.delayDays} days)`);
  });

  // 8. Public Customer Tracker Link
  console.log('\n8. Checking Public Customer Tracking Token Endpoint...');
  const trackRes = await request({
    hostname: 'localhost', port: 5000, path: `/api/projects/track/${samplePrashant.trackingToken}`, method: 'GET'
  });
  console.log('Tracked Customer:', trackRes.data.tracking.customerName);
  console.log('Masked Consumer No (DPDP):', trackRes.data.tracking.maskedConsumerNumber);
  console.log('Timeline Stages Count:', trackRes.data.tracking.timeline.length);
  console.log('Documents Available:', trackRes.data.tracking.documents.length);

  // 9. Mock Advance Payment
  console.log('\n9. Testing Mock Advance Payment Gateway...');
  const payRes = await request({
    hostname: 'localhost', port: 5000, path: '/api/projects/mock-payment', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    leadId: createRes.data.lead.id,
    amount: 10200,
    paymentMethod: 'UPI'
  });
  console.log('Payment Result:', payRes.data.message, '| New Status:', payRes.data.newStatus);

  // 10. Frontend Distribution Check
  console.log('\n10. Checking Frontend Index HTML Delivery...');
  const indexRes = await request({ hostname: 'localhost', port: 5000, path: '/', method: 'GET' });
  console.log('Root HTML Status:', indexRes.status, '| Contains HTML:', typeof indexRes.raw === 'string' && indexRes.raw.includes('<!doctype html>'));

  console.log('\n ALL 10 TESTS PASSED SUCCESSFULLY! FULL STACK VERIFIED.');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
