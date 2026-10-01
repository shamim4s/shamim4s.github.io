# Google Apps Script & Google OAuth Setup Guide

This guide provides step-by-step instructions for:
1. **Google Apps Script Webhook**: Receiving contact inquiries directly into `shamim4s@gmail.com` with zero third-party services and automatic client confirmation emails.
2. **Google OAuth Client ID & One Tap Authentication**: Verifying that visitors submitting inquiries are real humans logged into a valid Google account (`human_verified`).

---

## Part 1: Google Apps Script Webhook Deployment

### ⚠️ Important: Avoiding "This app is blocked" Error
Google blocks personal scripts that use `GmailApp` because it requests full access to read and delete emails in your personal mailbox.
**Our Solution**: The provided `Code.gs` exclusively uses `MailApp.sendEmail` with `https://www.googleapis.com/auth/script.send_mail`. This only requests send-only permissions and is **never blocked** by Google!

### Step 1: Create the Apps Script Project
1. Navigate to [https://script.google.com/](https://script.google.com/) signed in as `shamim4s@gmail.com`.
2. Click **+ New project**.
3. In the top-left, rename the project to: `Md Shamim Mia - Portfolio Contact Webhook`.

### Step 2: Paste the Production Script
1. In the Apps Script code editor, delete any existing placeholder code inside `Code.gs`.
2. Paste the full script from [`google-apps-script/Code.gs`](./Code.gs):
   ```javascript
   const CONFIG = {
     NOTIFICATION_EMAIL: "shamim4s@gmail.com",
     OWNER_NAME: "Md Shamim Mia",
     PORTFOLIO_URL: "https://shamim4s.github.io",
     UPWORK_URL: "https://www.upwork.com/freelancers/~0126a9e3ea476741d8"
   };

   function doPost(e) {
     const lock = LockService.getScriptLock();
     const hasLock = lock.tryLock(10000);
     try {
       if (!e || !e.postData || !e.postData.contents) {
         return createJsonResponse({ status: "error", message: "No data received" }, 400);
       }
       const data = JSON.parse(e.postData.contents);
       const name = (data.name || "Anonymous Client").trim();
       const email = (data.email || "").trim();
       const isGoogleVerified = Boolean(data.email_verified);
       const projectType = (data.projectType || "General Consulting").trim();
       const subject = (data.subject || ("Inquiry regarding " + projectType)).trim();
       const message = (data.message || "").trim();
       const timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

       if (!email || !message) {
         return createJsonResponse({ status: "error", message: "Missing required fields" }, 400);
       }

       // 1. Notification to Md Shamim Mia
       const ownerSubject = "[Portfolio Inquiry] " + projectType + " - from " + name;
       const ownerBody = 
         "Hello Shamim,\n\n" +
         "You received a new inquiry from your portfolio website!\n\n" +
         "Name: " + name + "\n" +
         "Verified Email: " + email + (isGoogleVerified ? " (✓ Google Human Verified)" : "") + "\n" +
         "Focus Area: " + projectType + "\n" +
         "Subject: " + subject + "\n" +
         "Date: " + timestamp + "\n\n" +
         "Message:\n" + message + "\n\n" +
         "Hit Reply to respond directly to " + name + " (" + email + ").";

       MailApp.sendEmail({
         to: CONFIG.NOTIFICATION_EMAIL,
         subject: ownerSubject,
         body: ownerBody,
         replyTo: email,
         name: name + " (via Portfolio)"
       });

       // 2. Automated Confirmation Receipt to Sender
       try {
         const clientSubject = "Inquiry Received - Md Shamim Mia (AI Agent Developer & Cloud Infrastructure Engineer)";
         const clientBody = 
           "Hi " + name + ",\n\n" +
           "Thank you for reaching out through my portfolio website regarding \"" + projectType + "\".\n\n" +
           "I have received your message and will review the details promptly. You can expect a response within 6 to 12 hours.\n\n" +
           "Upwork Profile: " + CONFIG.UPWORK_URL + "\n\n" +
           "Best regards,\nMd Shamim Mia\nAI Agent Developer & Cloud Infrastructure Engineer & IT Consultant";

         MailApp.sendEmail({
           to: email,
           subject: clientSubject,
           body: clientBody,
           name: CONFIG.OWNER_NAME,
           replyTo: CONFIG.NOTIFICATION_EMAIL
         });
       } catch (cErr) {
         console.warn("Client receipt notice: " + cErr);
       }

       return createJsonResponse({ status: "success", message: "Delivered to Md Shamim Mia!" }, 200);
     } catch (error) {
       return createJsonResponse({ status: "error", message: error.toString() }, 500);
     } finally {
       if (hasLock) lock.releaseLock();
     }
   }

   function doGet(e) {
     return createJsonResponse({
       status: "ok",
       service: "Md Shamim Mia Portfolio Contact API",
       recipient: CONFIG.NOTIFICATION_EMAIL
     }, 200);
   }

   function createJsonResponse(data, statusCode) {
     const output = ContentService.createTextOutput(JSON.stringify(data));
     output.setMimeType(ContentService.MimeType.JSON);
     return output;
   }
   ```
3. Press **Ctrl + S** (or **Cmd + S**) to save.

### Step 3: Deploy as a Public Web App
1. Click **Deploy** (blue button in top-right) -> **New deployment**.
2. Click the gear icon (**⚙️**) next to *Select type* and select **Web app**.
3. Configure the deployment settings:
   - **Description**: `Portfolio Webhook v1`
   - **Execute as**: `Me (shamim4s@gmail.com)`
   - **Who has access**: `Anyone` *(Must be "Anyone" so visitors can send messages!)*
4. Click **Deploy**.
5. Click **Authorize access** when prompted:
   - Choose your Google account (`shamim4s@gmail.com`).
   - Click **Advanced** -> **Go to Md Shamim Mia - Portfolio Contact Webhook (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** (ends in `/exec`).
   Example: `https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec`

### Step 4: Permanent Setup in Your Codebase
The Web App URL is already baked into `src/data/portfolioData.ts` as the default fallback:
```typescript
export const CONTACT_CONFIG = {
  appsScriptUrl: 
    ((import.meta as any).env?.VITE_APPS_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec',
  googleClientId: ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) || ''
};
```
You can also set it in `.env` as:
```env
VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec"
```

---

## Part 2: Google OAuth Client ID Setup (Google One Tap & GIS)

The portfolio uses **Google Identity Services (GIS)** to verify human senders. Visitors can 1-click verify with any active Google account in their browser.

### Step 1: Create a Google Cloud Project
1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top -> **NEW PROJECT**.
3. Name it `Shamim Portfolio Auth` and click **Create**.

### Step 2: Configure OAuth Consent Screen
1. Go to **APIs & Services** -> **OAuth consent screen**.
2. Select User Type: **External** -> click **Create**.
3. Enter App information:
   - **App name**: `Md Shamim Mia Portfolio`
   - **User support email**: `shamim4s@gmail.com`
   - **Developer contact email**: `shamim4s@gmail.com`
4. Click **Save and Continue**.
5. Under **Scopes**, click **Save and Continue** (standard openid, email, profile are granted by default).
6. Under **Test Users**, add `shamim4s@gmail.com` or publish the app to "In Production" (verification is NOT required for basic profile and email scopes).
7. Click **Back to Dashboard**.

### Step 3: Create OAuth Client ID Credentials
1. Go to **APIs & Services** -> **Credentials**.
2. Click **+ CREATE CREDENTIALS** -> **OAuth client ID**.
3. Select Application type: **Web application**.
4. Name: `Portfolio Web Client`.
5. Under **Authorized JavaScript origins**, add your domains:
   - Local development: `http://localhost:3000`
   - Local dev (optional): `http://127.0.0.1:3000`
   - GitHub Pages: `https://shamim4s.github.io`
   - Cloudflare Pages (if using): `https://<your-project>.pages.dev` and any custom domains
6. Under **Authorized redirect URIs**, add the same URLs:
   - `http://localhost:3000`
   - `https://shamim4s.github.io`
7. Click **CREATE**.
8. Copy your **Client ID** (it looks like `xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`).

### Step 4: Add Client ID to Portfolio
- In `.env`:
  ```env
  VITE_GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
  ```
- Or set it in `src/data/portfolioData.ts`.
- Or click the **Apps Script & OAuth Setup** button in the header of the Contact section on your site to save it in browser storage.

---

## How Human Verification Works

1. **No Intrusive Prompts on Page Load**: The Google One Tap prompt does not interrupt visitors during general site browsing.
2. **Auto-Restoration**: If the visitor previously verified during a session, the verified status (`human_verified`) is remembered automatically.
3. **One-Click Verification**: Clicking **Verify Human with Google Account** triggers the Google account selection prompt.
4. **Account Switching / Sign Out**: Clicking the sign-out icon clears the active identity and immediately prompts the account selector so the visitor can pick any logged-in Google account.
5. **Send Verification Check**: Clicking **Send Message** checks for a verified session; if not verified, the prompt opens to ensure spam-free delivery.
