import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Experience & Track Record
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Delivering mission-critical system administration, cloud infrastructure design, and proactive server maintenance for global clients and enterprise teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 md:pl-10 group text-left">
              
              {/* Timeline Indicator Dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                exp.current 
                  ? 'bg-emerald-500 border-white dark:border-slate-950 ring-4 ring-emerald-500/20 animate-pulse' 
                  : 'bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-950 group-hover:bg-emerald-400'
              }`} />

              {/* Experience Card */}
              <div className="rounded-2xl p-6 sm:p-7 bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Current Role
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex-wrap">
                      <span>{exp.company}</span>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-emerald-500 transition-colors"
                          title="Visit link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={exp.linkedinUrl || "https://www.linkedin.com/in/shamim4s4/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 ml-1 transition-colors"
                        title="Verify on LinkedIn"
                      >
                        <span>LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Highlights / Achievements */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Key Deliverables & Milestones:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1.5">
                    Stack:
                  </span>
                  {exp.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
