import React from 'react';
import { 
  FileDown, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Cloud, 
  Terminal, 
  ExternalLink,
  MapPin,
  CheckCircle,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { DynamicIcon } from './SocialIcons';
import { TerminalSimulator } from './TerminalSimulator';
import { Avatar } from './Avatar';

interface HeroProps {
  onDownloadResume: () => void;
  onOpenDeploymentGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadResume, onOpenDeploymentGuide }) => {
  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Subtle Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-emerald-600/5 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Personal Bio & Value Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Profile Avatar + Status Header Card */}
            <div className="flex items-center gap-4 sm:gap-5 p-2 pr-4 sm:pr-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs shadow-2xs w-fit">
              <Avatar size="lg" showStatus={true} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {PERSONAL_INFO.name}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" title="Verified Engineering Profile" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>github.com/{PERSONAL_INFO.handle}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for Hire</span>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Server Architecture & DevOps Consulting</span>
            </div>

            {/* Name and Titles */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-mono font-medium">
                  @{PERSONAL_INFO.handle}
                </span>
              </div>

              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Elevator Pitch */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                <Server className="w-3.5 h-3.5 text-emerald-500" />
                <span>150+ Servers Hardened</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                <Cloud className="w-3.5 h-3.5 text-teal-500" />
                <span>AWS & GCP Infrastructure</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>Zero-Trust & CIS Security</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Remote / Worldwide</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-resume-download-btn"
                type="button"
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 active:scale-98 transition-all cursor-pointer"
              >
                <FileDown className="w-5 h-5" />
                <span>Download Resume (PDF)</span>
              </button>

              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span>Hire Me</span>
              </a>

              {onOpenDeploymentGuide && (
                <button
                  type="button"
                  onClick={onOpenDeploymentGuide}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                  title="View GitHub Pages & Cloudflare Pages deployment details"
                >
                  <Server className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Deployment Guide</span>
                </button>
              )}
            </div>

            {/* Comprehensive Social Links Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Connect Across Channels & Profiles
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`hero-social-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-xs transition-all group"
                    title={link.description}
                  >
                    <DynamicIcon name={link.iconName} className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Interactive Terminal Simulator */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono px-1">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                LIVE SHELL SESSION
              </span>
              <span>HOST: shamim4s.github.io</span>
            </div>

            <TerminalSimulator />

            {/* Fast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center shadow-xs"
                >
                  <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
