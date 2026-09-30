import React from 'react';
import { Terminal, ArrowUp, Github, Heart, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { DynamicIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg font-mono">
                {PERSONAL_INFO.handle}.github.io
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {PERSONAL_INFO.name} — Linux Infrastructure Engineer & IT Consultant specializing in secure cloud deployments, server hardening, and DevOps workflows.
            </p>
            <div className="text-xs font-mono text-emerald-400/90 pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Production SLA: 99.99% Uptime Mindset</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block mb-3 font-mono">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home (Tactical AI)</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About & Profile</a></li>
              <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Technical Stack</a></li>
              <li><a href="#experience" className="hover:text-emerald-400 transition-colors">Work Experience</a></li>
              <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">Customer Reviews (5.0★)</a></li>
              <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Open Source Projects</a></li>
              <li><a href="#resume" className="hover:text-emerald-400 transition-colors">Resume & Certifications</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Engineering Blog</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Form</a></li>
            </ul>
          </div>

          {/* Social Profiles Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block mb-3 font-mono">
              Social Channels
            </span>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                  title={link.name}
                >
                  <DynamicIcon name={link.iconName} className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 font-mono pt-2">
              shamim4s@gmail.com
            </p>
          </div>

        </div>

        {/* Bottom copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Md Shamim Mia ({PERSONAL_INFO.handle}). Built for <span className="text-emerald-400 font-mono">shamim4s.github.io</span>.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
