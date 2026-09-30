# Md Shamim Mia — AI Agent Developer & Linux Infrastructure Engineer Portfolio

[![Deploy to GitHub Pages](https://github.com/shamim4s/shamim4s.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/shamim4s/shamim4s.github.io/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-shamim4s.github.io-emerald)](https://shamim4s.github.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC.svg)](https://tailwindcss.com/)

> **Live Portfolio:** [https://shamim4s.github.io](https://shamim4s.github.io)  
> **Direct Email:** [shamim4s@gmail.com](mailto:shamim4s@gmail.com)  
> **Upwork Profile:** [Upwork Top Rated Consultant](https://www.upwork.com/freelancers/~0126a9e3ea476741d8)

---

## 🌟 Key Features

- **AI Agent Developer Focus**: Prominently highlights autonomous AI agents, multi-agent swarms, Model Context Protocol (MCP), and LLM orchestration (OpenAI, Claude, Gemini, LangChain, LlamaIndex).
- **Linux Infrastructure & DevOps**: 16+ years of IT management, Proxmox virtualization, server hardening, Docker container stacks, and enterprise cloud migrations (AWS / GCP).
- **Direct Webhook Contact Engine**: Inquiries post straight to Google Apps Script (`shamim4s@gmail.com`) with zero middleman services, returning an automated confirmation to the sender.
- **Human Verification via Google OAuth**: Protects inbox integrity using Google Identity Services (GIS). Verified senders display the `human_verified` badge with zero intrusive popups during initial page browsing.
- **Responsive & Modern UI**: Tailored for both dark and light modes with smooth transitions, interactive terminal, project showcases, and live status pills.

---

## 🚀 Deployment & Hosting Guide

This project is optimized for static hosting on **GitHub Pages** (`github.io`) and **Cloudflare Pages**. Follow either guide below for production deployment.

---

### Method A: Deploying to GitHub Pages (`shamim4s.github.io`)

Because your repository is named `shamim4s.github.io` (a User Pages site), Vite serves assets from the root path (`/`).

#### 1. Configure GitHub Repository Settings
1. On GitHub, navigate to your repository: `https://github.com/shamim4s/shamim4s.github.io`.
2. Click **Settings** (top navigation bar) -> **Pages** (left sidebar under *Code and automation*).
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**.
   - *(Note: Do NOT select "Deploy from a branch" when using GitHub Actions).*

#### 2. Automated GitHub Actions Workflow
The repository already includes a production-ready workflow file at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then
            npm ci || npm install
          else
            npm install
          fi

      - name: Build static production files
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 3. Deploy Your Changes
Simply commit and push your code to `main` (or `master`):
```bash
git add .
git commit -m "feat: update portfolio with AI Agent Developer and Google Apps Script webhook"
git push origin main
```
1. Go to the **Actions** tab in your GitHub repository.
2. Watch the **Deploy Portfolio to GitHub Pages** workflow run (takes ~45 seconds).
3. Once completed, your site is immediately live at [https://shamim4s.github.io/](https://shamim4s.github.io/).

#### 4. (Optional) Custom Domain on GitHub Pages
1. In **Settings** -> **Pages**, scroll down to **Custom domain**.
2. Enter your domain (e.g., `shamim.dev` or `shamim.me`).
3. Add the corresponding `CNAME` record in your DNS provider pointing to `shamim4s.github.io`.
4. Check **Enforce HTTPS**.

---

### Method B: Deploying to Cloudflare Pages

Cloudflare Pages provides global edge distribution, DDoS mitigation, and instantaneous builds.

#### 1. Connect GitHub to Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. On the left sidebar, click **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your GitHub account and choose the repository `shamim4s.github.io` (or your portfolio repository).
4. Click **Begin setup**.

#### 2. Configure Build Settings
Fill in the build configuration:
- **Project name**: `shamim-portfolio` (or your preferred project slug)
- **Production branch**: `main` (or `master`)
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave blank or default)

#### 3. Configure Environment Variables
Under **Environment variables (advanced)**, add:
- `NODE_VERSION` = `20` (or `22`)
- `VITE_APPS_SCRIPT_URL` = `https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec`
- `VITE_GOOGLE_CLIENT_ID` = `your-client-id.apps.googleusercontent.com` *(optional)*

#### 4. Save and Deploy
1. Click **Save and Deploy**.
2. Cloudflare will install dependencies, execute `npm run build`, and deploy the `./dist` folder to Cloudflare's global edge network.
3. Your site will be assigned a URL like `https://shamim-portfolio.pages.dev`.

#### 5. Cloudflare Pages Custom Domain
1. In Cloudflare Pages, go to **Custom domains** -> **Set up a custom domain**.
2. If your domain is already managed on Cloudflare DNS, it configures with 1-click. If external, add the provided `CNAME` record.
3. Cloudflare automatically provisions a free Universal SSL certificate.

#### 6. SPA Routing on Cloudflare Pages
Because this application is a Single Page Application (SPA), Cloudflare Pages automatically handles routes. If deploying multi-page deep links, Cloudflare Pages defaults to serving `/index.html` for 404s.

---

## 📬 Google Apps Script & Contact Form Architecture

Inquiries sent via the contact form are dispatched directly to **Google Apps Script**:
1. **Endpoint**: `https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec`
2. **Notification**: Delivers an email directly to `shamim4s@gmail.com` with the visitor's name, message, topic, and verified Google email.
3. **Reply-To**: The visitor's verified Google address is set as the `replyTo` header, so hitting **Reply** in Gmail responds directly to the client.
4. **Auto-Confirmation**: The client immediately receives a polite acknowledgment receipt from `shamim4s@gmail.com`.
5. **No Block Guarantee**: Uses `MailApp` rather than restricted `GmailApp` scopes to ensure 100% deliverability without triggering Google security warnings.

> Full step-by-step setup documentation, source code, and OAuth instructions are available in [`google-apps-script/README.md`](./google-apps-script/README.md).

---

## 🛡️ Human Verification (Google Identity Services) Flow

To prevent spam while providing a seamless user experience:
1. **No Disruption on Page Load**: The Google One Tap prompt does **not** fire when the page loads, leaving visitors free to read articles and view projects without popups.
2. **One-Click Human Verification**: Clicking **Verify Human with Google Account** triggers the Google account picker.
3. **Instant Account Switch / Sign Out**: Clicking the signout icon on the right clears the session and re-prompts One Tap to select another logged-in account.
4. **Send Message Protection**: If a user submits without verifying, the form asks for verification and triggers the Google account prompt.

---

## 💻 Local Development

To run and test the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/shamim4s/shamim4s.github.io.git
cd shamim4s.github.io

# 2. Install dependencies
npm install

# 3. Copy environment configuration
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement.
- `npm run build`: Compiles TypeScript and builds the production bundle into `./dist`.
- `npm run lint`: Validates the codebase for syntax, typing, and linting errors.
- `npm run preview`: Previews the production build locally.

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions Pages deployment
├── google-apps-script/
│   ├── Code.gs                     # Google Apps Script MailApp webhook
│   ├── README.md                   # Full Apps Script & OAuth setup guide
│   └── appsscript.json             # Manifest with send_mail scope
├── google-app-script/
│   └── README.md                   # Alternate path mirror
├── public/                         # Static assets and icons
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx      # Contact form with Google GIS & webhook
│   │   ├── Hero.tsx                # Hero section with AI Agent highlights
│   │   ├── Navbar.tsx              # Responsive top navigation
│   │   ├── SkillsSection.tsx       # AI Agent & infrastructure skill matrices
│   │   └── ...
│   ├── data/
│   │   └── portfolioData.ts        # Content, contact config & project items
│   ├── types.ts                    # TypeScript interface definitions
│   ├── App.tsx                     # Main application container
│   └── main.tsx                    # React DOM entry point
├── .env.example                    # Environment variable template
├── index.html                      # HTML entry with metadata & SEO tags
├── package.json                    # Project scripts & dependencies
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

---

## 📄 License & Credits

Designed and maintained by **Md Shamim Mia** ([@shamim4s](https://github.com/shamim4s)).  
Feel free to star ⭐ the repository if you find this portfolio architecture helpful!
