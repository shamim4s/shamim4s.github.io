import React from 'react';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Mail, 
  Briefcase, 
  Globe, 
  ExternalLink,
  Terminal,
  Server,
  Cloud,
  ShieldCheck,
  GitBranch,
  Cpu,
  Layers
} from 'lucide-react';

interface SocialIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<SocialIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'twitter':
    case 'x':
      return <Twitter className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'briefcase':
    case 'upwork':
      return <Briefcase className={className} />;
    case 'terminal':
      return <Terminal className={className} />;
    case 'server':
      return <Server className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'gitbranch':
    case 'git':
      return <GitBranch className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'layers':
      return <Layers className={className} />;
    default:
      return <Globe className={className} />;
  }
};
