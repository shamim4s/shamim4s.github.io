export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  color: string;
  handle: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    featured?: boolean;
    tag?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: 'Freelance / Consultant' | 'Full-Time' | 'Open Source' | 'Community';
  location: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  link?: string;
  linkedinUrl?: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientLocation: string;
  clientRole?: string;
  projectTitle: string;
  date: string;
  rating: number; // 5.0
  reviewText: string;
  category: 'All' | 'Cloud & DevOps' | 'Server Hardening' | 'Performance Tuning' | 'Hosting & Web' | 'Troubleshooting';
  tags: string[];
  upworkUrl: string;
  duration?: string;
  jobSuccess?: string;
  verified: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: 'Infrastructure' | 'DevOps & CI/CD' | 'Security' | 'Open Source' | 'AI & Automation';
  description: string;
  longDescription: string;
  featured: boolean;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  architecture: string[];
  keyFeatures: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Linux' | 'DevOps' | 'Security' | 'Cloud & Homelab' | 'AI Ops';
  tags: string[];
  content: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}
