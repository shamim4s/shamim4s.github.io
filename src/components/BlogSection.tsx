import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Search, 
  ArrowRight, 
  Sparkles,
  Tag,
  PenTool
} from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogModal } from './BlogModal';

interface BlogSectionProps {
  onCopySuccess: (msg: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onCopySuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Security', 'DevOps', 'Cloud & Homelab', 'AI Ops'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="blog" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <PenTool className="w-3.5 h-3.5" />
              <span>Engineering Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Software Development & Infrastructure Blog
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Documenting practical server hardening recipes, container orchestration, low-spec Linux virtualization, and DevOps insights.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2.5 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer row */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No blog posts found matching your search</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <BlogModal
        post={activePost}
        onClose={() => setActivePost(null)}
        onCopySuccess={onCopySuccess}
      />
    </section>
  );
};
