/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: Portfolio Contact Form Webhook (Unblocked Version)
 * Recipient: shamim4s@gmail.com (Md Shamim Mia)
 * ============================================================================
 *
 * NOTE ON "This app is blocked":
 * We use MailApp.sendEmail() instead of GmailApp.sendEmail().
 * GmailApp requires full mailbox read/write access (restricted scope), which Google
 * blocks on unverified personal scripts. MailApp only requires the send-mail
 * permission (https://www.googleapis.com/auth/script.send_mail) which is NOT blocked!
 * ============================================================================
 */

// Configuration
const CONFIG = {
  NOTIFICATION_EMAIL: "shamim4s@gmail.com",
  OWNER_NAME: "Md Shamim Mia",
  PORTFOLIO_URL: "https://shamim4s.github.io",
  UPWORK_URL: "https://www.upwork.com/freelancers/~0126a9e3ea476741d8"
};

/**
 * Handles incoming POST requests from the portfolio contact form
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other operations to finish
  const hasLock = lock.tryLock(10000);
  
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "No post data received"
      }, 400);
    }

    // Parse the incoming JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        status: "error",
        message: "Invalid JSON payload"
      }, 400);
    }

    const name = (data.name || "Anonymous Client").trim();
    const email = (data.email || "").trim();
    const isGoogleVerified = Boolean(data.email_verified);
    const projectType = (data.projectType || "General Consulting").trim();
    const subject = (data.subject || `Inquiry regarding ${projectType}`).trim();
    const message = (data.message || "").trim();
    const timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    if (!email) {
      return createJsonResponse({
        status: "error",
        message: "Sender email address is missing"
      }, 400);
    }

    if (!message) {
      return createJsonResponse({
        status: "error",
        message: "Message body is empty"
      }, 400);
    }

    // =========================================================================
    // 1. Send Email Notification to Portfolio Owner (Md Shamim Mia)
    // =========================================================================
    const ownerSubject = `[Portfolio Inquiry] ${projectType} - from ${name}`;
    
    const ownerBody = 
`Hello Shamim,

You have received a new consultation inquiry from your portfolio website!

=======================================================
CLIENT & INQUIRY DETAILS
=======================================================
Sender Name:        ${name}
Verified Email:     ${email} ${isGoogleVerified ? "(✓ Google OAuth Verified)" : ""}
Engagement Focus:   ${projectType}
Subject:            ${subject}
Date / Time:        ${timestamp}

=======================================================
MESSAGE
=======================================================
${message}

=======================================================
QUICK ACTIONS:
- Hit "Reply" in your email client to respond directly to ${name} (${email}).
- Upwork Profile: ${CONFIG.UPWORK_URL}
=======================================================`;

    const ownerHtmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 20px; font-weight: 800;">
            🚀 New Portfolio Consultation Inquiry
          </h2>
          <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">
            Submitted from ${CONFIG.PORTFOLIO_URL}
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; width: 140px;">Client Name:</td>
            <td style="padding: 10px 12px; color: #0f172a; font-weight: 700;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #475569;">Sender Email:</td>
            <td style="padding: 10px 12px; color: #059669; font-weight: 600;">
              <a href="mailto:${escapeHtml(email)}" style="color: #059669; text-decoration: none;">${escapeHtml(email)}</a>
              ${isGoogleVerified ? '<span style="background-color: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">✓ Google OAuth Verified</span>' : ''}
            </td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569;">Engagement Focus:</td>
            <td style="padding: 10px 12px; color: #0f172a; font-weight: 600;">${escapeHtml(projectType)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #475569;">Subject:</td>
            <td style="padding: 10px 12px; color: #0f172a;">${escapeHtml(subject)}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569;">Date & Time:</td>
            <td style="padding: 10px 12px; color: #64748b; font-family: monospace; font-size: 12px;">${escapeHtml(timestamp)}</td>
          </tr>
        </table>

        <div style="background-color: #f1f5f9; border-left: 4px solid #10b981; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message Content:</h4>
          <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <a href="mailto:${escapeHtml(email)}?subject=Re: [Portfolio Inquiry] ${encodeURIComponent(projectType)}" 
             style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
            Reply to ${escapeHtml(name)}
          </a>
        </div>
      </div>
    `;

    // Send email using MailApp (Bypasses Google's sensitive scope restriction)
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: ownerSubject,
      body: ownerBody,
      htmlBody: ownerHtmlBody,
      replyTo: email,
      name: `${name} (via Portfolio)`
    });

    // =========================================================================
    // 2. Send Polite Auto-Confirmation to Client
    // =========================================================================
    try {
      const clientSubject = `Inquiry Received - Md Shamim Mia (Cloud Infrastructure Engineer)`;
      const clientBody = 
`Hi ${name},

Thank you for reaching out through my portfolio website regarding "${projectType}".

I have received your message and will review the details promptly. You can expect a response within 6 to 12 hours.

For immediate or contract engagements, feel free to also reach me on Upwork:
${CONFIG.UPWORK_URL}

Best regards,
Md Shamim Mia
AI Agent Developer & Cloud Infrastructure Engineer & IT Consultant
Dhaka, Bangladesh · shamim4s@gmail.com`;

      MailApp.sendEmail({
        to: email,
        subject: clientSubject,
        body: clientBody,
        name: CONFIG.OWNER_NAME,
        replyTo: CONFIG.NOTIFICATION_EMAIL
      });
    } catch (clientEmailErr) {
      console.warn("Could not send client confirmation: " + clientEmailErr);
    }

    return createJsonResponse({
      status: "success",
      message: "Your message has been transmitted successfully to Md Shamim Mia!",
      timestamp: timestamp
    }, 200);

  } catch (error) {
    console.error("Error handling form submission:", error);
    return createJsonResponse({
      status: "error",
      message: "An internal error occurred: " + error.toString()
    }, 500);
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

/**
 * Handles incoming GET requests (Health check)
 */
function doGet(e) {
  return createJsonResponse({
    status: "ok",
    service: "Md Shamim Mia Portfolio Contact Webhook",
    recipient: CONFIG.NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString()
  }, 200);
}

/**
 * Helper to build JSON HTTP response
 */
function createJsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Helper to prevent HTML injection in emails
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
