import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  Cloud, 
  Server, 
  GitBranch, 
  ShieldCheck, 
  Search, 
  Sparkles,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { DynamicIcon } from './SocialIcons';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map(category => {
      // Filter skills by search query
      const matchingSkills = category.skills.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      return {
        ...category,
        skills: matchingSkills
      };
    }).filter(category => {
      if (selectedCategory === 'all') {
        return category.skills.length > 0;
      }
      return category.title.toLowerCase().includes(selectedCategory.toLowerCase()) && category.skills.length > 0;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills, Tooling & Infrastructure Stack
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              A comprehensive view of technologies, hypervisors, cloud services, and security frameworks mastered over 6+ years of production operations.
            </p>
          </div>

          {/* Quick Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Docker, AWS, NGINX)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            All Disciplines
          </button>
          
          {SKILL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.title;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => setSelectedCategory(cat.title)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <DynamicIcon name={cat.icon} className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <div
              key={category.title}
              className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <DynamicIcon name={category.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {category.title}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {category.skills.length} core proficiencies
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List with Progress */}
                <div className="space-y-4">
                  {category.skills.map(skill => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {skill.name}
                          </span>
                          {skill.tag && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                          {skill.experience}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Production Verified
                </span>
                <span className="font-mono">Linux Standard</span>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">No skills match "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for generic terms like "Linux", "Docker", "AWS", or "Security".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
