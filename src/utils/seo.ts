/**
 * Utility to manage dynamic Open Graph, Twitter Cards, Canonical URL, and standard SEO meta tags.
 */

export interface MetaTagOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  imageUrl?: string;
  publishedTime?: string;
  author?: string;
  keywords?: string[];
}

const DEFAULT_META: Required<MetaTagOptions> = {
  title: 'Md Shamim Mia - AI Agent Developer & Cloud Infrastructure Engineer',
  description: 'Professional portfolio, technical projects, resume, and engineering blog of Md Shamim Mia (shamim4s) - AI Agent Developer, Cloud Infrastructure Engineer, and IT Consultant.',
  canonicalUrl: 'https://shamim4s.github.io',
  ogType: 'website',
  imageUrl: 'https://avatars.githubusercontent.com/shamim4s',
  publishedTime: '',
  author: 'Md Shamim Mia',
  keywords: [
    'Md Shamim Mia',
    'shamim4s',
    'AI Agent Developer',
    'Cloud Infrastructure Engineer',
    'Cloud Architect',
    'DevOps',
    'Server Hardening',
    'AWS',
    'GCP',
    'Proxmox VE',
    'Docker',
    'Nginx',
    'HestiaCP',
    'IT Consultant'
  ]
};

function setOrUpdateMetaTag(attribute: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function updatePageSEO(options: MetaTagOptions = {}) {
  const config = {
    title: options.title || DEFAULT_META.title,
    description: options.description || DEFAULT_META.description,
    canonicalUrl: options.canonicalUrl || DEFAULT_META.canonicalUrl,
    ogType: options.ogType || DEFAULT_META.ogType,
    imageUrl: options.imageUrl || DEFAULT_META.imageUrl,
    publishedTime: options.publishedTime || DEFAULT_META.publishedTime,
    author: options.author || DEFAULT_META.author,
    keywords: options.keywords || DEFAULT_META.keywords
  };

  // 1. Update Document Title
  document.title = config.title;

  // 2. Standard Search Engine Meta Tags
  setOrUpdateMetaTag('name', 'description', config.description);
  setOrUpdateMetaTag('name', 'keywords', config.keywords.join(', '));
  setOrUpdateMetaTag('name', 'author', config.author);
  setOrUpdateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setCanonicalLink(config.canonicalUrl);

  // 3. Open Graph (Facebook, LinkedIn, Discord, Slack, WhatsApp)
  setOrUpdateMetaTag('property', 'og:title', config.title);
  setOrUpdateMetaTag('property', 'og:description', config.description);
  setOrUpdateMetaTag('property', 'og:url', config.canonicalUrl);
  setOrUpdateMetaTag('property', 'og:type', config.ogType);
  setOrUpdateMetaTag('property', 'og:image', config.imageUrl);
  setOrUpdateMetaTag('property', 'og:image:alt', `${config.author} - Portfolio & Engineering Profile`);
  setOrUpdateMetaTag('property', 'og:site_name', 'Md Shamim Mia Portfolio (shamim4s)');
  setOrUpdateMetaTag('property', 'og:locale', 'en_US');

  if (config.publishedTime) {
    setOrUpdateMetaTag('property', 'article:published_time', config.publishedTime);
    setOrUpdateMetaTag('property', 'article:author', config.author);
  }

  // 4. Twitter / X Cards
  setOrUpdateMetaTag('name', 'twitter:card', 'summary_large_image');
  setOrUpdateMetaTag('name', 'twitter:site', '@shamim4s');
  setOrUpdateMetaTag('name', 'twitter:creator', '@shamim4s');
  setOrUpdateMetaTag('name', 'twitter:title', config.title);
  setOrUpdateMetaTag('name', 'twitter:description', config.description);
  setOrUpdateMetaTag('name', 'twitter:image', config.imageUrl);
  setOrUpdateMetaTag('name', 'twitter:image:alt', `${config.author} - Portfolio & Engineering Profile`);
}
