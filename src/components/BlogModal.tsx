import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Tag, Share2, Check, Bookmark, ArrowLeft, Copy } from 'lucide-react';
import { BlogPost } from '../types';
import { updatePageSEO } from '../utils/seo';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onCopySuccess: (msg: string) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, onCopySuccess }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Dynamic Open Graph & Meta Tags for the active article
      updatePageSEO({
        title: `${post.title} | Md Shamim Mia`,
        description: post.excerpt,
        canonicalUrl: `https://shamim4s.github.io#blog-${post.slug}`,
        ogType: 'article',
        publishedTime: post.date,
        keywords: [post.category, ...(post.tags || []), 'Md Shamim Mia', 'DevOps Blog']
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);

      // Restore default portfolio metadata when closing
      updatePageSEO();
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    const url = `${window.location.origin}#blog-${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    onCopySuccess('Article URL copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to render markdown-like content blocks nicely
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];
    let keyIdx = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // close code block
          const codeString = codeBuffer.join('\n');
          elements.push(
            <div key={keyIdx++} className="my-5 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-left">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-slate-400 text-xs border-b border-slate-800">
                <span>{codeLanguage || 'snippet'}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(codeString);
                    onCopySuccess('Code snippet copied!');
                  }}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-4 text-xs sm:text-sm text-emerald-400 overflow-x-auto whitespace-pre">
                {codeString}
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // start code block
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={keyIdx++} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={keyIdx++} className="text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('---')) {
        elements.push(
          <hr key={keyIdx++} className="my-6 border-slate-200 dark:border-slate-800" />
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={keyIdx++} className="ml-5 list-disc text-sm sm:text-base text-slate-700 dark:text-slate-300 my-1">
            {line.replace('- ', '')}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <div key={keyIdx++} className="flex items-start gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 my-1.5">
            <span className="font-bold text-emerald-500">{line.match(/^\d+\./)?.[0]}</span>
            <span>{line.replace(/^\d+\.\s/, '')}</span>
          </div>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={keyIdx++} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed my-3">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto flex flex-col text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content Container */}
        <div className="p-6 sm:p-10">
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
            <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
            {post.excerpt}
          </p>

          {/* Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Article Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
