import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Award, 
  ThumbsUp, 
  Clock, 
  Filter 
} from 'lucide-react';
import { UPWORK_REVIEWS, UPWORK_PROFILE_STATS } from '../data/portfolioData';

export const ReviewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cloud & DevOps',
    'Server Hardening',
    'Performance Tuning',
    'Hosting & Web',
    'Troubleshooting'
  ];

  const filteredReviews = selectedCategory === 'All' 
    ? UPWORK_REVIEWS 
    : UPWORK_REVIEWS.filter(r => r.category === selectedCategory);

  return (
    <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Customer Reviews & Satisfaction
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
              Real testimonials from global founders, SaaS executives, and engineering managers who hired Md Shamim Mia on Upwork for mission-critical infrastructure projects.
            </p>
          </div>

          {/* Upwork Profile Action */}
          <div className="flex items-center gap-3">
            <a
              href={UPWORK_PROFILE_STATS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all hover:shadow-md"
            >
              <span>View Upwork Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Upwork Performance Metrics Summary Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall Rating</span>
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              5.0 / 5.0
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Top Rated with consistent 5-star ratings
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Success Score</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              100%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Perfect milestone completion record
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed Projects</span>
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              60+ Contracts
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Across 20+ countries worldwide
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">On-Time Delivery</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              100%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Zero unplanned project downtime
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all text-left"
            >
              <div>
                {/* Review Header: Rating and Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-1.5">
                      5.0
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    {review.date}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {review.projectTitle}
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 italic">
                  "{review.reviewText}"
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {review.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {review.tags.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{review.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Client Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{review.clientName}</span>
                      <span className="text-emerald-500" title="Verified Client">
                        <CheckCircle2 className="w-3.5 h-3.5 inline" />
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{review.clientLocation}</span>
                    </div>
                  </div>

                  {/* Hyperlink to Upwork Profile */}
                  <a
                    href={review.upworkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    title="View review on Upwork"
                  >
                    <span>Upwork</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Centered Show All Reviews Button */}
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <a
            href={UPWORK_PROFILE_STATS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-98 transition-all group"
          >
            <span>Show all Reviews</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5">
            Read all 60+ verified 5.0-star client testimonials directly on Upwork
          </p>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Guaranteed Satisfaction & Secure Service Level Agreement
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Every consulting engagement includes structured milestone validation, post-migration monitoring, and comprehensive runbook documentation.
              </p>
            </div>
          </div>
          <a
            href="mailto:shamim4s@gmail.com"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors whitespace-nowrap text-center shrink-0"
          >
            Hire on Upwork / Contract
          </a>
        </div>

      </div>
    </section>
  );
};
