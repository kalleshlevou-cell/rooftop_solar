/**
 * WhatsApp & SMS Notification Simulator with Multilingual Marathi, Hindi, and English Templates
 * Supports stage change triggers, tracking link delivery, and stuck project alerts.
 */

export const NOTIFICATION_TEMPLATES = {
  LEAD_QUALIFIED_HIGH: {
    stage: 'LEAD_QUALIFIED',
    title: 'Lead Qualified (High Priority)',
    en: 'Namaste {name}! Your rooftop solar enquiry at Company A, Nagpur has been evaluated. You qualify for an estimated {kw} kW system with ₹{subsidy} PM Surya Ghar subsidy! Our technical surveyor is scheduled to visit your site today. Track status: {link}',
    mr: 'नमस्कार {name}! कंपनी ए, नागपूर कडून तुमची सोलर चौकशी मंजूर झाली आहे. तुम्हाला {kw} kW सोलर प्रणाली आणि ₹{subsidy} पीएम सूर्य घर सबसिडी मिळू शकते! आमचे सर्व्हेअर आज तुमच्या छताची तपासणी करतील. स्थिती तपासा: {link}',
    hi: 'नमस्ते {name}! कंपनी ए, नागपुर द्वारा आपकी सोलर जांच स्वीकृत की गई है। आप {kw} kW सिस्टम और ₹{subsidy} पीएम सूर्य घर सब्सिडी के पात्र हैं! हमारे सर्वेक्षक आज आपकी साइट का दौरा करेंगे। स्टेटस देखें: {link}'
  },
  LEAD_QUALIFIED_LOW_TENANT: {
    stage: 'LEAD_QUALIFIED',
    title: 'Virtual Consultation Scheduled (Tenant)',
    en: 'Namaste {name}, thank you for contacting Company A, Nagpur. As a tenant, rooftop solar requires landlord consent under MSEDCL regulations. Our solar consultant will call you shortly to explain community/landlord solar options: {link}',
    mr: 'नमस्कार {name}, कंपनी ए नागपूरशी संपर्क साधल्याबद्दल धन्यवाद. भाडेकरू असल्याने महावितरण नियमांनुसार घरमालकाची एनओसी आवश्यक आहे. आमचे सोलर सल्लागार तुम्हाला फोनवर मार्गदर्शन करतील: {link}',
    hi: 'नमस्ते {name}, कंपनी ए नागपुर से संपर्क करने के लिए धन्यवाद। किरायेदार होने के कारण महावितरण नियमानुसार मकान मालिक की सहमति आवश्यक है। हमारे सलाहकार जल्द ही आपको कॉल करेंगे: {link}'
  },
  LEAD_QUALIFIED_LOW_BILL: {
    stage: 'LEAD_QUALIFIED',
    title: 'Mini Solar Consultation (Small Bill)',
    en: 'Namaste {name}! For your electricity bill of ₹{bill}, our engineering team has designed a micro 1 kW setup. Our advisor will call you today to discuss high-efficiency options: {link}',
    mr: 'नमस्कार {name}! तुमच्या ₹{bill} बिलासाठी आमच्या इंजिनिअरिंग टीमने 1 kW मायक्रो सोलर डिझाइन केले आहे. आमचे सल्लागार तुम्हाला योग्य पर्यायांची माहिती देण्यासाठी आज कॉल करतील: {link}',
    hi: 'नमस्ते {name}! आपके ₹{bill} के बिजली बिल के लिए हमने 1 kW माइक्रो सोलर का सुझाव दिया है। हमारे सलाहकार आज आपको कॉल करके पूरी जानकारी देंगे: {link}'
  },
  SURVEY_COMPLETED: {
    stage: 'SURVEY_COMPLETED',
    title: 'Roof Survey Completed & Quote Ready',
    en: 'Good news {name}! The roof survey for {address} is complete. Your official quote for {kw} kW with ₹{subsidy} subsidy and {payback} year payback is ready. View and approve quote here: {link}',
    mr: 'आनंदाची बातमी {name}! {address} येथील छताचे सर्वेक्षण पूर्ण झाले आहे. ₹{subsidy} सबसिडीसह {kw} kW सोलर कोटेशन तयार आहे. येथे पहा आणि मंजूर करा: {link}',
    hi: 'खुशखबरी {name}! {address} की छत का सर्वे पूरा हो गया है। ₹{subsidy} सब्सिडी के साथ {kw} kW का आधिकारिक कोटेशन तैयार है। यहाँ देखें और स्वीकृत करें: {link}'
  },
  QUOTE_APPROVED: {
    stage: 'QUOTE_APPROVED',
    title: 'Agreement Signed & Advance Received',
    en: 'Congratulations {name}! Your solar agreement with Company A is confirmed and ₹10,000 booking advance received. MSEDCL Net Metering application is now being prepared. Track live progress: {link}',
    mr: 'अभिनंदन {name}! कंपनी ए सोबत तुमचा सोलर करार पक्का झाला आहे आणि ₹10,000 ॲडव्हान्स मिळाला आहे. महावितरण नेट मीटरिंग अर्ज तयार केला जात आहे. ट्रॅक करा: {link}',
    hi: 'बधाई हो {name}! कंपनी ए के साथ आपका सोलर अनुबंध पक्का हो गया है और ₹10,000 एडवांस प्राप्त हुआ है। महावितरण नेट मीटरिंग आवेदन प्रक्रिया शुरू हो गई है: {link}'
  },
  DISCOM_APPLICATION_SUBMITTED: {
    stage: 'DISCOM_APPLICATION_SUBMITTED',
    title: 'MSEDCL Net Metering Application Filed',
    en: 'Update {name}: Your grid-tied solar application (Ref: {discomRef}) has been submitted on the MSEDCL Mahavitaran portal. Sanction is expected within 7-10 business days. Track: {link}',
    mr: 'अपडेट {name}: तुमचा ग्रिड-कनेक्टेड सोलर अर्ज (क्रमांक: {discomRef}) महावितरण पोर्टलवर यशस्वीरित्या सादर करण्यात आला आहे. 7-10 दिवसात मंजुरी मिळेल. ट्रॅक करा: {link}',
    hi: 'अपडेट {name}: आपका नेट मीटरिंग आवेदन (क्रमांक: {discomRef}) महावितरण पोर्टल पर जमा कर दिया गया है। 7-10 दिनों में स्वीकृति अपेक्षित है। ट्रॅक: {link}'
  },
  MATERIAL_DISPATCHED_INSTALLED: {
    stage: 'MATERIAL_DISPATCHED_INSTALLED',
    title: 'Solar System Installed On Roof',
    en: 'Milestone reached! Tier-1 DCR solar panels & inverter have been safely installed and wired on your roof at {address}. Ready for DISCOM inspection: {link}',
    mr: 'महत्त्वाचा टप्पा! टियर-1 सोलर पॅनेल आणि इन्व्हर्टर तुमच्या छतावर यशस्वीरित्या बसवले गेले आहेत. महावितरण तपासणीची तयारी पूर्ण: {link}',
    hi: 'महत्वपूर्ण पड़ाव! टियर-1 सोलर पैनल और इन्वर्टर आपकी छत पर सफलतापूर्वक स्थापित कर दिए गए हैं। महावितरण निरीक्षण के लिए तैयार: {link}'
  },
  DISCOM_INSPECTION_METERING: {
    stage: 'DISCOM_INSPECTION_METERING',
    title: 'MSEDCL Net Meter Energized',
    en: 'Solar grid energized! MSEDCL inspection complete and bi-directional net meter installed. You are now producing clean green electricity and saving on every unit! Track: {link}',
    mr: 'सोलर वीज सुरू झाली! महावितरण तपासणी पूर्ण झाली असून बाय-डायरेक्शनल नेट मीटर बसवले आहे. तुमचे वीज बिल आता शून्य होण्यास सुरुवात झाली आहे! ट्रॅक: {link}',
    hi: 'सोलर ग्रिड चालू हो गया! महावितरण निरीक्षण पूरा हुआ और नेट मीटर लगाया गया। आप अब अपनी हरित बिजली बना रहे हैं और बचत शुरू हो गई है! ट्रॅक: {link}'
  },
  SUBSIDY_CREDITED: {
    stage: 'SUBSIDY_CREDITED',
    title: 'PM Surya Ghar Subsidy ₹{subsidy} Credited!',
    en: 'Great celebration {name}! Your central government PM Surya Ghar subsidy of ₹{subsidy} has been credited to your Aadhaar-linked bank account. Project completed successfully with Company A, Nagpur! {link}',
    mr: 'मोठा आनंदोत्सव {name}! तुमची केंद्र सरकारची पीएम सूर्य घर सबसिडी ₹{subsidy} थेट तुमच्या बँक खात्यात जमा झाली आहे. प्रकल्प यशस्वीरित्या पूर्ण झाला! {link}',
    hi: 'बधाई {name}! आपकी केंद्र सरकार की पीएम सूर्य घर सब्सिडी ₹{subsidy} आपके बैंक खाते में जमा हो गई है। कंपनी ए के साथ सोलर प्रोजेक्ट सफलतापूर्वक पूरा हुआ! {link}'
  },
  QUOTE_REENGAGEMENT: {
    stage: 'SURVEY_COMPLETED',
    title: 'Re-engagement: Quote Waiting',
    en: 'Namaste {name}! Your {kw} kW solar quote from Company A, Nagpur is still open. Solar panel prices in Vidarbha have been stable — lock in today\'s rate before the next revision. View your quote here: {link}',
    mr: 'नमस्कार {name}! कंपनी ए कडून तुमचे {kw} kW सोलर कोटेशन अजूनही उपलब्ध आहे. विदर्भात सोलर पॅनेलचे दर स्थिर आहेत — पुढील बदलापूर्वी आजचे दर निश्चित करा. कोटेशन पहा: {link}',
    hi: 'नमस्ते {name}! कंपनी ए, नागपुर से आपका {kw} kW सोलर कोटेशन अभी भी उपलब्ध है। विदर्भ में सोलर पैनल दरें स्थिर हैं — अगले बदलाव से पहले आज की दर पक्की करें। कोटेशन देखें: {link}'
  },
  STUCK_STAGE_REMINDER: {
    stage: 'STUCK_ALERT',
    title: 'Action Required / Stage Stuck Alert',
    en: 'Notice: Project {leadId} for {name} has been at stage "{currentStage}" for {days} days (exceeds SLA of {slaDays} days). Coordinator has escalated this with MSEDCL / National Portal: {link}',
    mr: 'सूचना: प्रकल्प {leadId} ({name}) "{currentStage}" या टप्प्यावर {days} दिवसांपासून प्रलंबित आहे (एसएलए मर्यादा: {slaDays} दिवस). समन्वयक महावितरण अधिकाऱ्यांशी संपर्क करत आहेत: {link}',
    hi: 'सूचना: प्रोजेक्ट {leadId} ({name}) "{currentStage}" चरण में {days} दिनों से लंबित है। टीम महावितरण अधिकारियों से संपर्क कर रही है: {link}'
  }
};

export function formatNotification(templateKey, data = {}, lang = 'en') {
  const templateObj = NOTIFICATION_TEMPLATES[templateKey] || NOTIFICATION_TEMPLATES.LEAD_QUALIFIED_HIGH;
  const rawText = templateObj[lang] || templateObj.en;

  let text = rawText;
  Object.keys(data).forEach(key => {
    const val = data[key] !== undefined && data[key] !== null ? String(data[key]) : '';
    text = text.replaceAll(`{${key}}`, val);
  });

  return {
    templateKey,
    title: templateObj.title,
    channel: 'WhatsApp & SMS',
    recipientPhone: data.phone || '+91 98230 XXXXX',
    recipientName: data.name || 'Homeowner',
    language: lang,
    messageText: text,
    timestamp: new Date().toISOString(),
    status: 'DELIVERED',
    providerMessageId: 'WA-' + Math.floor(10000000 + Math.random() * 90000000)
  };
}

