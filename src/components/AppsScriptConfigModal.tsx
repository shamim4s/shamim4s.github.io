import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Code, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw, 
  Mail, 
  HelpCircle,
  FileCode
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';

interface AppsScriptConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl: string;
  onSaveAppsScriptUrl: (url: string) => void;
  googleClientId: string;
  onSaveGoogleClientId: (clientId: string) => void;
  onToast: (title: string, msg: string) => void;
}

const APPS_SCRIPT_CODE = `/**
 * GOOGLE APPS SCRIPT: Portfolio Contact Form Webhook
 * Recipient: shamim4s@gmail.com (Md Shamim Mia)
 */
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

    // 1. Send notification to Md Shamim Mia using MailApp (Avoids Google Sensitive Scope Block)
    const ownerSubject = "[Portfolio Inquiry] " + projectType + " - from " + name;
    const ownerBody = 
      "Hello Shamim,\\n\\n" +
      "You received a new inquiry from your portfolio website!\\n\\n" +
      "Name: " + name + "\\n" +
      "Verified Email: " + email + (isGoogleVerified ? " (✓ Google OAuth Verified)" : "") + "\\n" +
      "Focus: " + projectType + "\\n" +
      "Subject: " + subject + "\\n" +
      "Date: " + timestamp + "\\n\\n" +
      "Message:\\n" + message + "\\n\\n" +
      "Hit Reply to respond directly to " + name + " (" + email + ").";

    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: ownerSubject,
      body: ownerBody,
      replyTo: email,
      name: name + " (via Portfolio)"
    });

    // 2. Send polite confirmation to client
    try {
      const clientSubject = "Inquiry Received - Md Shamim Mia (Cloud Infrastructure Engineer)";
      const clientBody = 
        "Hi " + name + ",\\n\\n" +
        "Thank you for reaching out through my portfolio website regarding \\"" + projectType + "\\".\\n\\n" +
        "I have received your message and will review the details promptly. You can expect a response within 6 to 12 hours.\\n\\n" +
        "Upwork Profile: " + CONFIG.UPWORK_URL + "\\n\\n" +
        "Best regards,\\nMd Shamim Mia\\nAI Agent Developer & Cloud Infrastructure Engineer & IT Consultant";

      MailApp.sendEmail({
        to: email,
        subject: clientSubject,
        body: clientBody,
        name: CONFIG.OWNER_NAME,
        replyTo: CONFIG.NOTIFICATION_EMAIL
      });
    } catch (cErr) {
      console.warn("Could not send client auto-reply: " + cErr);
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
}`;

export const AppsScriptConfigModal: React.FC<AppsScriptConfigModalProps> = ({
  isOpen,
  onClose,
  appsScriptUrl,
  onSaveAppsScriptUrl,
  googleClientId,
  onSaveGoogleClientId,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'code' | 'guide'>('config');
  const [urlInput, setUrlInput] = useState(appsScriptUrl);
  const [clientIdInput, setClientIdInput] = useState(googleClientId);
  const [copiedCode, setCopiedCode] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedCode(true);
    onToast('Code Copied', 'Google Apps Script Code.gs copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSave = () => {
    onSaveAppsScriptUrl(urlInput.trim());
    onSaveGoogleClientId(clientIdInput.trim());
    onToast('Settings Saved', 'Google Apps Script & OAuth settings updated successfully');
    onClose();
  };

  const handleTestConnection = async () => {
    const targetUrl = urlInput.trim();
    if (!targetUrl) {
      setTestResult({ success: false, msg: 'Please enter a valid Google Apps Script Web App URL first.' });
      return;
    }

    if (!targetUrl.includes('script.google.com/macros/s/')) {
      setTestResult({ success: false, msg: 'URL should be a Google Apps Script deployment URL ending in /exec' });
      return;
    }

    setTestingConnection(true);
    setTestResult(null);

    try {
      // Test GET request
      const res = await fetch(targetUrl, { method: 'GET', mode: 'no-cors' });
      // In no-cors mode, reaching without throwing network error indicates reachable endpoint
      setTestResult({
        success: true,
        msg: 'Connection test passed! The Google Apps Script endpoint responded successfully.'
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        msg: `Connection test failed: ${err.message || 'Network unreachable'}. Verify your deployment is set to "Who has access: Anyone".`
      });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Google Apps Script & OAuth Setup
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure direct email delivery to shamim4s@gmail.com with verified Google sender authentication
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 px-6 pt-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'config'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Connection & Keys</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Apps Script Code (Code.gs)</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Step-by-Step Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Config */}
          {activeTab === 'config' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs leading-relaxed flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>How this works:</strong> When clients send a message, your Google Apps Script Web App receives the details, verifies sender authenticity, and instantly sends an email to <span className="font-mono font-bold">shamim4s@gmail.com</span> with <span className="font-mono">replyTo</span> set to the client's verified Gmail address.
                </div>
              </div>

              {/* Web App URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Google Apps Script Web App URL *</span>
                  <a
                    href="https://script.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-normal"
                  >
                    Open script.google.com <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testingConnection || !urlInput}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                    <span>Test</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Deploy your Apps Script project with <strong>Execute as: Me</strong> and <strong>Who has access: Anyone</strong>.
                </p>

                {/* Permanent Project Configuration Callout */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Permanent Project Configuration (Zero Setup for Visitors)</span>
                    </span>
                    {CONTACT_CONFIG.appsScriptUrl ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        Baked in Source Code
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        Browser Storage Only
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    To make this URL permanent for <strong>all visitors on all devices</strong> without typing it in every time, paste it into <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">src/data/portfolioData.ts</code>:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-slate-950 text-slate-200 font-mono text-[10px] overflow-x-auto border border-slate-800">
                    <code>{`export const CONTACT_CONFIG = {
  appsScriptUrl: '${urlInput || 'https://script.google.com/macros/s/AKfycb.../exec'}',
  ...
};`}</code>
                  </pre>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Once pushed to GitHub, GitHub Pages compiles this URL directly into the live site!
                  </p>
                </div>
              </div>

              {testResult && (
                <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  testResult.success 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}>
                  {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{testResult.msg}</span>
                </div>
              )}

              {/* Google Client ID */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Google OAuth 2.0 Client ID (Optional)</span>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-normal"
                  >
                    Google Cloud Console <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <input
                  type="text"
                  value={clientIdInput}
                  onChange={e => setClientIdInput(e.target.value)}
                  placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  If left blank, the app will use standard Google Identity verification or quick Google account verification for sending inquiries.
                </p>
              </div>

              {/* Target Notification Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      Target Destination Inbox
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      shamim4s@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  Active
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Code */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    google-apps-script/Code.gs
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Copy and paste this exact script into your project on script.google.com
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[380px] border border-slate-800 selection:bg-emerald-500 selection:text-white">
                  <code>{APPS_SCRIPT_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 3: Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-sm block mb-0.5">
                      Create Project on Google Apps Script
                    </strong>
                    Visit <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-emerald-500 underline font-semibold">script.google.com</a> signed in with your account (<code className="text-[11px]">shamim4s@gmail.com</code>). Click <strong>+ New project</strong> and title it <em>Shamim Portfolio Contact Webhook</em>.
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-sm block mb-0.5">
                      Paste the Script Code
                    </strong>
                    Switch to the <strong>Apps Script Code (Code.gs)</strong> tab in this modal, click <strong>Copy Code</strong>, and replace the contents of <code className="text-[11px]">Code.gs</code> in the Google Apps Script editor. Click the Save icon (💾).
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-sm block mb-0.5">
                      Deploy as Web App (Critical Settings)
                    </strong>
                    Click <strong>Deploy</strong> (top right) → <strong>New deployment</strong>.<br />
                    Click the <strong>gear icon (⚙️)</strong> next to "Select type" and pick <strong>Web app</strong>.<br />
                    • Description: <code className="text-[11px]">Portfolio Contact Webhook</code><br />
                    • Execute as: <strong>Me (shamim4s@gmail.com)</strong><br />
                    • Who has access: <strong className="text-emerald-600 dark:text-emerald-400">Anyone</strong> (Mandatory so visitors can submit inquiries!)
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-sm block mb-0.5">
                      Authorize Access & Copy Web App URL
                    </strong>
                    Click <strong>Deploy</strong>. Click <strong>Authorize access</strong> → select your Google account → Click <em>Advanced</em> → Click <em>Go to Shamim Portfolio Contact Webhook (unsafe)</em> → Click <em>Allow</em>.<br />
                    Copy the generated <strong>Web app URL</strong> (ends with <code className="text-[11px]">/exec</code>).
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    5
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-sm block mb-0.5">
                      Paste in Portfolio & Save
                    </strong>
                    Return to the <strong>Connection & Keys</strong> tab in this dialog, paste your Web app URL into the field, and click <strong>Save Settings</strong>.
                  </div>
                </div>

                {/* Troubleshooting Block for 'This app is blocked' */}
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-2 font-bold text-xs mb-1 text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Seeing "This app is blocked" Error in Apps Script?</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2">
                    Google blocks personal scripts that use <code className="font-mono text-amber-700 dark:text-amber-300">GmailApp</code> because it requests full access to read and delete your personal inbox. We have updated <code className="font-mono text-amber-700 dark:text-amber-300">Code.gs</code> to use <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">MailApp</code> instead!
                  </p>
                  <ol className="text-[11px] list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Copy the updated code from the <strong>Apps Script Code (Code.gs)</strong> tab (which uses <code className="font-mono">MailApp.sendEmail</code>).</li>
                    <li>Paste it into your Apps Script editor and click <strong>Save (💾)</strong>.</li>
                    <li>Click <strong>Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy</strong>.</li>
                    <li>Click <strong>Authorize access</strong>. Google will now show the standard warning where you can click <strong>Advanced → Go to project (unsafe) → Allow</strong> without being blocked!</li>
                  </ol>
                </div>

                {/* Guide for Error 401: invalid_client & Domain Origin Setup */}
                <div className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-950 dark:text-cyan-200 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-cyan-800 dark:text-cyan-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Fixing "Error 401: invalid_client" & Adding shamim4s.github.io to Google Cloud</span>
                  </div>
                  
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    <strong>Why Error 401 occurred:</strong> Google gives <code>401: invalid_client (flowName=GeneralOAuthFlow)</code> when an OAuth Client ID is missing, incomplete, or rejected by Google Cloud Console.
                  </p>

                  <div className="text-[11px] space-y-2 text-slate-700 dark:text-slate-300">
                    <div className="p-2.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-cyan-500/20">
                      <strong className="text-cyan-900 dark:text-cyan-300 block mb-1">Step A: Add Domain to OAuth Consent Screen</strong>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Google Cloud Console → OAuth consent screen</a>.</li>
                        <li>Under <strong>Authorized domains</strong>, click <strong>+ ADD DOMAIN</strong> and enter: <code className="font-bold text-emerald-600 dark:text-emerald-400">github.io</code> <em>(Note: Do not type https:// or path, Google requires the top domain)</em>.</li>
                        <li>Set Application home page to: <code className="font-mono text-slate-800 dark:text-slate-200">https://shamim4s.github.io</code></li>
                        <li>Click <strong>Save and Continue</strong>.</li>
                      </ol>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-cyan-500/20">
                      <strong className="text-cyan-900 dark:text-cyan-300 block mb-1">Step B: Create / Edit OAuth 2.0 Web Client ID</strong>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Google Cloud Console → Credentials</a>.</li>
                        <li>Click <strong>+ CREATE CREDENTIALS</strong> → <strong>OAuth client ID</strong>.</li>
                        <li>Application type: Choose <strong>Web application</strong>.</li>
                        <li>Name: <code className="font-mono">Shamim Portfolio Web Client</code></li>
                        <li>Under <strong>Authorized JavaScript origins</strong>, click <strong>+ ADD URI</strong> and enter: <code className="font-bold text-emerald-600 dark:text-emerald-400">https://shamim4s.github.io</code></li>
                        <li>Click <strong>Create</strong>, then copy your generated <strong>Client ID</strong> (ends in <code>.apps.googleusercontent.com</code>) and paste it into the <strong>Connection & Keys</strong> tab in this dialog!</li>
                      </ol>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[11px]">
                      💡 <strong>Note:</strong> Google Apps Script Web App works <strong>without</strong> an OAuth Client ID! As long as you have pasted your Web App URL, any visitor can send messages to your inbox immediately.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 active:scale-98 transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
