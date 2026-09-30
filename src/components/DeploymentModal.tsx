import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Globe, 
  Terminal, 
  Cloud, 
  ExternalLink, 
  CheckCircle2, 
  FileCode, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess: (msg: string) => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({
  isOpen,
  onClose,
  onCopySuccess
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'cloudflare'>('github');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string, msg: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onCopySuccess(msg);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const ghActionsYaml = `name: Deploy Portfolio to GitHub Pages

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
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Build
        run: |
          npm ci || npm install
          npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 text-left">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Deployment & Hosting Guide</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold">
                  100% Ready
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target Domain: <strong className="font-mono text-emerald-600 dark:text-emerald-400">shamim4s.github.io</strong> or Cloudflare Pages
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'github'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>GitHub Pages (shamim4s.github.io)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloudflare')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'cloudflare'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Cloudflare Pages</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Answer confirmation banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">
                Yes! This application is 100% compatible with both GitHub Pages and Cloudflare Pages.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                It compiles into a zero-dependency static Single Page Application in <code className="font-mono bg-emerald-500/20 px-1 py-0.5 rounded">dist/</code> with relative base paths and SPA routing fallback rules included.
              </p>
            </div>
          </div>

          {activeTab === 'github' ? (
            <div className="space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs">1</span>
                  Create / Push to Repository: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">shamim4s/shamim4s.github.io</code>
                </h4>
                <div className="relative mt-2 p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                  <pre>{`git init
git remote add origin https://github.com/shamim4s/shamim4s.github.io.git
git add .
git commit -m "Deploy Shamim Mia portfolio"
git push -u origin main`}</pre>
                  <button
                    type="button"
                    onClick={() => handleCopy(`git init\ngit remote add origin https://github.com/shamim4s/shamim4s.github.io.git\ngit add .\ngit commit -m "Deploy Shamim Mia portfolio"\ngit push -u origin main`, 'git-commands', 'Git commands copied')}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedId === 'git-commands' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs">2</span>
                  Enable GitHub Pages via Actions
                </h4>
                <ul className="space-y-1.5 list-disc pl-5 text-slate-600 dark:text-slate-400 text-xs">
                  <li>Go to your GitHub repository: <strong>Settings &gt; Pages</strong></li>
                  <li>Under <strong>Build and deployment &gt; Source</strong>, choose <strong>GitHub Actions</strong></li>
                  <li>The included <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">.github/workflows/deploy.yml</code> will automatically build and publish your site at <strong>https://shamim4s.github.io</strong> on every commit!</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500 font-mono">
                    GitHub Actions Workflow (.github/workflows/deploy.yml)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(ghActionsYaml, 'yaml-code', 'Workflow YAML copied')}
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {copiedId === 'yaml-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'yaml-code' ? 'Copied' : 'Copy Workflow'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 text-slate-300 font-mono text-[11px] rounded-xl max-h-48 overflow-y-auto">
                  <pre>{ghActionsYaml}</pre>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs">1</span>
                  Connect to Cloudflare Pages Dashboard
                </h4>
                <ul className="space-y-1.5 list-disc pl-5 text-slate-600 dark:text-slate-400 text-xs">
                  <li>Login to <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-teal-500 underline font-semibold">dash.cloudflare.com</a> &gt; <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong>.</li>
                  <li>Select <strong>Connect to Git</strong> and authorize your GitHub repository <code className="font-mono">shamim4s/shamim4s.github.io</code> (or any portfolio repo).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs">2</span>
                  Build Settings for Cloudflare Pages
                </h4>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-1.5">
                    <span className="text-slate-500">Framework preset:</span>
                    <strong className="text-slate-900 dark:text-white">Vite</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-1.5">
                    <span className="text-slate-500">Build command:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">npm run build</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-1.5">
                    <span className="text-slate-500">Build output directory:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">dist</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Node.js Version:</span>
                    <strong className="text-slate-900 dark:text-white">20.x or above</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs">3</span>
                  Custom Domain & CDN Performance
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cloudflare provides automatic SSL certificates, global edge caching, and allows binding custom domains (e.g. <code className="font-mono">shamim.me</code> or <code className="font-mono">shamim4s.com</code>) with zero server maintenance.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            Build command: <code className="text-emerald-600 dark:text-emerald-400 font-bold">npm run build</code> → <code className="text-emerald-600 dark:text-emerald-400 font-bold">dist/</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
