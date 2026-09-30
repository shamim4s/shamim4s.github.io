import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Infrastructure', 'Security', 'Open Source', 'DevOps & CI/CD', 'AI & Automation'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineered Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Technical Projects & Repositories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              Real-world server hardening scripts, virtualization blueprints, container stacks, and open-source infrastructure guides.
            </p>
          </div>

          {/* GitHub Profile Direct CTA */}
          <a
            href="https://github.com/shamim4s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-emerald-500 shadow-xs transition-colors shrink-0"
          >
            <Github className="w-4 h-4 text-emerald-500" />
            <span>Visit @shamim4s GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="group rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.slug}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2.5">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Stat if present */}
                {project.stats && project.stats.length > 0 && (
                  <div className="mb-5 flex gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                    {project.stats.map((s, idx) => (
                      <div key={idx} className="flex-1">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono block">
                          {s.value}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
