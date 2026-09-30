# Google Apps Script Setup & Configuration Guide

This guide explains how to connect your portfolio contact form with Google Apps Script so that messages sent by visitors are delivered directly to your personal inbox (`shamim4s@gmail.com`), with the sender's verified Google OAuth email address automatically set as the `replyTo`!

---

## ⚠️ If You See "This app is blocked" During Deployment:
Google blocks personal scripts that use `GmailApp` because `GmailApp` requests full read/delete access to your personal mailbox (a restricted OAuth scope).
**The solution**: We use `MailApp.sendEmail` instead of `GmailApp.sendEmail`. `MailApp` only requests send-only permissions (`https://www.googleapis.com/auth/script.send_mail`), which Google does NOT block!

Follow the steps below to deploy smoothly without any block.

---

## Step 1: Open Google Apps Script
1. Go to [https://script.google.com/](https://script.google.com/) while signed in to your Google account (`shamim4s@gmail.com`).
2. Click the **+ New project** button in the top left.
3. Name your project: `Shamim Portfolio Contact Webhook`.

---

## Step 2: Paste the Updated Apps Script Code
1. Open the file `Code.gs` in the Apps Script editor.
2. Select all existing text and delete it.
3. Copy the full code from `/google-apps-script/Code.gs` (which uses `MailApp`) and paste it into the editor.
4. Click the **Save project** icon (💾) or press `Ctrl + S` / `Cmd + S`.

*(Optional recommended step if you still see scope issues)*:
5. Click **Project Settings** (gear icon ⚙️ on the left panel).
6. Check **Show "appsscript.json" manifest file in editor**.
7. Go back to the **Editor** (`< >`), click `appsscript.json`, and ensure `oauthScopes` is set to `["https://www.googleapis.com/auth/script.send_mail"]` (see `/google-apps-script/appsscript.json`).

---

## Step 3: Deploy as a Web App (Critical Settings)
1. In the upper-right corner, click **Deploy** -> **New deployment**.
2. Click the **gear icon (⚙️)** next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description**: `Portfolio Contact Webhook v2`
   - **Execute as**: `Me (shamim4s@gmail.com)`
   - **Who has access**: `Anyone` *(IMPORTANT: Must be "Anyone" so visitors to your portfolio can submit contact inquiries!)*
4. Click **Deploy**.
5. When prompted with "Authorization required", click **Authorize access**:
   - Choose your Google account (`shamim4s@gmail.com`).
   - Click **Advanced** (at the bottom of the prompt).
   - Click **Go to Shamim Portfolio Contact Webhook (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** provided in the deployment confirmation modal.
   It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## Step 4: Configure the Web App URL in Your Portfolio
1. On your portfolio site, scroll down to the **Initiate Contact** section.
2. Click the **Apps Script & OAuth Setup** button above the contact form.
3. Paste your Web App URL into the **Google Apps Script Web App URL** input field.
4. Click **Test** to verify connection, then click **Save Settings**.
5. Done! Your portfolio is now permanently connected to your personal Google Apps Script webhook.

---

## Step 5: (Optional) Google OAuth Client ID for Sender Verification
The contact form verifies sender identities via Google OAuth so you receive legitimate inquiries from verified Gmail accounts:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Navigate to **APIs & Services** -> **Credentials**.
4. Click **+ Create Credentials** -> **OAuth client ID**.
5. Set Application type to **Web application**.
6. Under **Authorized JavaScript origins**, add:
   - Your local dev URL: `http://localhost:3000`
   - Your production URLs: `https://shamim4s.github.io`
7. Click **Create** and copy your **Client ID** (ends with `.apps.googleusercontent.com`).
8. Paste this Client ID in the **Apps Script & OAuth Setup** modal on your portfolio.
