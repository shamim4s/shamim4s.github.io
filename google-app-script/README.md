# Google Apps Script & Google OAuth Setup Guide

Please see the full documentation in [`/google-apps-script/README.md`](../google-apps-script/README.md) or below:

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
2. Copy code from [`/google-apps-script/Code.gs`](../google-apps-script/Code.gs).
3. Press **Ctrl + S** (or **Cmd + S**) to save.

### Step 3: Deploy as a Public Web App
1. Click **Deploy** (blue button in top-right) -> **New deployment**.
2. Click the gear icon (**⚙️**) next to *Select type* and select **Web app**.
3. Configure the deployment settings:
   - **Description**: `Portfolio Webhook v1`
   - **Execute as**: `Me (shamim4s@gmail.com)`
   - **Who has access**: `Anyone` *(Must be "Anyone" so visitors can send messages!)*
4. Click **Deploy**.
5. Click **Authorize access** when prompted.
6. Copy the **Web app URL** (ends in `/exec`).
   Example: `https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec`

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

### Step 3: Create OAuth Client ID Credentials
1. Go to **APIs & Services** -> **Credentials**.
2. Click **+ CREATE CREDENTIALS** -> **OAuth client ID**.
3. Select Application type: **Web application**.
4. Name: `Portfolio Web Client`.
5. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000`
   - `https://shamim4s.github.io`
   - Any Cloudflare Pages or custom domains
6. Under **Authorized redirect URIs**, add the same URLs.
7. Click **CREATE**.
8. Copy your **Client ID** (it looks like `xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`).

### Step 4: Add Client ID to Portfolio
- Set in `.env`:
  ```env
  VITE_GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
  ```
- Or set it in `src/data/portfolioData.ts`.
