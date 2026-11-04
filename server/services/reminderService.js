import { db } from '../data/db.js';
import { formatNotification } from './notificationService.js';

const REMINDER_INTERVAL_MS = 60 * 60 * 1000; // Run every hour
const TRIGGER_DAYS_WITHOUT_PAYMENT = 5; // Days after SURVEY_COMPLETED with no advance
const MIN_REMINDER_GAP_MS = 48 * 60 * 60 * 1000; // Min 48h between reminders per lead

export function startReminderService() {
  console.log('[ReminderService] Quote re-engagement service started (hourly scan)');
  setInterval(scanAndSendReminders, REMINDER_INTERVAL_MS);
}

function scanAndSendReminders() {
  const leads = db.getLeads();
  const now = Date.now();

  leads.forEach(lead => {
    // Only HIGH leads stuck at SURVEY_COMPLETED with no payment
    if (
      lead.scoreCategory !== 'HIGH' ||
      lead.status !== 'SURVEY_COMPLETED' ||
      !lead.quoteGenerated
    ) return;

    const updatedAt = new Date(lead.updatedAt).getTime();
    const daysSinceSurvey = (now - updatedAt) / (1000 * 60 * 60 * 24);
    if (daysSinceSurvey <= TRIGGER_DAYS_WITHOUT_PAYMENT) return;

    // Check if a reminder was already sent within 48 hours
    const notifications = lead.notifications || [];
    const lastReminder = notifications
      .filter(n => n.type === 'REMINDER_SENT')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    if (lastReminder) {
      const lastReminderTime = new Date(lastReminder.timestamp).getTime();
      if (now - lastReminderTime < MIN_REMINDER_GAP_MS) return;
    }

    // Send re-engagement notification
    const lang = lead.preferredLanguage || 'en';
    const notif = formatNotification('QUOTE_REENGAGEMENT', {
      name: lead.name,
      kw: lead.recommendedKw || 3,
      link: `http://localhost:5173/track/${lead.trackingToken}`
    }, lang);
    notif.leadId = lead.id;
    db.addNotification(notif);

    // Log reminder on lead
    const reminderEntry = { type: 'REMINDER_SENT', timestamp: new Date().toISOString() };
    const updatedNotifications = [...notifications, reminderEntry];
    db.updateLead(lead.id, { notifications: updatedNotifications });

    console.log(`[ReminderService] Re-engagement sent to ${lead.name} (${lead.id}) — ${daysSinceSurvey.toFixed(1)} days since survey`);
  });
}
