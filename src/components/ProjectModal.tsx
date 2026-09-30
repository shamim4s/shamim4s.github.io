import React, { useEffect } from 'react';
import { X, Github, ExternalLink, ShieldCheck, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { updatePageSEO } from '../utils/seo';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Dynamic Open Graph & Meta Tags for the active project
      updatePageSEO({
        title: `${project.title} - Project Architecture | Md Shamim Mia`,
        description: project.description,
        canonicalUrl: `https://shamim4s.github.io#projects-${project.slug}`,
        keywords: [project.category, ...(project.tags || []), 'Linux Project', 'Md Shamim Mia']
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);

      // Restore default portfolio metadata when closing
      updatePageSEO();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto flex flex-col text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 px-6 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {project.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                repo: {project.slug}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              System Overview & Architecture
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Metrics if available */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.stats.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">{s.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Components */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Architectural Modules & Topology</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Core Capabilities & Implementations</span>
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tech Stack & Tooling
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Open Source • MIT / GPL License
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
