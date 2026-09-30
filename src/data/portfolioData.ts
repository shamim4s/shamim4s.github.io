import { SocialLink, SkillCategory, ExperienceItem, ProjectItem, BlogPost, ReviewItem } from '../types';

export const CONTACT_CONFIG = {
  // =========================================================================
  // PERMANENT GOOGLE APPS SCRIPT WEB APP URL
  // Configured with your live Google Apps Script deployment URL.
  // Works automatically on https://shamim4s.github.io and locally via .env!
  // =========================================================================
  appsScriptUrl: 
    ((import.meta as any).env?.VITE_APPS_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/AKfycbw-x3tbPmRQfmDWS1dP2EArFp2WDilqA3qaKoo3QV_n9CtxKZfiM-3Fe5ikvRaSyC2c/exec',

  // Optional: Permanent Google OAuth Client ID (e.g. "123456789-xxx.apps.googleusercontent.com")
  googleClientId: ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) || ''
};

export const PERSONAL_INFO = {
  name: 'Md Shamim Mia',
  handle: 'shamim4s',
  avatarUrl: 'https://github.com/shamim4s.png',
  fallbackAvatarUrl: 'https://avatars.githubusercontent.com/u/85999549?v=4',
  title: 'AI Agent Developer & Linux Infrastructure Engineer',
  tagline: 'AI Agent Developer · IT Manager at Japna Bangladesh Ltd. · Upwork Top Rated Consultant · Linux Infrastructure Specialist',
  bio: 'AI Agent Developer and IT Manager with 16+ years of expertise building autonomous AI agents, multi-agent workflows, LLM orchestration (LangChain, LlamaIndex, OpenAI, Claude, Gemini, MCP), Linux server hardening, cloud infrastructure (AWS, GCP), and enterprise DevOps automation.',
  email: 'shamim4s@gmail.com',
  location: 'Dhaka, Bangladesh (Available Globally / Remote)',
  availability: 'Available for IT management, freelance consulting, DevOps automation & server hardening',
  githubUrl: 'https://github.com/shamim4s',
  website: 'https://shamim4s.github.io',
  upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
  linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/',
  stats: [
    { label: 'Years in IT & Linux', value: '16+' },
    { label: 'Production Servers Managed', value: '250+' },
    { label: 'Job Success Score', value: '100%' },
    { label: 'Upwork Rating', value: '5.0★' }
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/shamim4s',
    iconName: 'Github',
    color: '#24292e',
    handle: '@shamim4s',
    description: 'Open source repositories, Linux guides, and infrastructure code'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shamim4s4/',
    iconName: 'Linkedin',
    color: '#0a66c2',
    handle: 'in/shamim4s4',
    description: 'Professional networking, consulting recommendations, and career updates'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/shamim4s',
    iconName: 'Facebook',
    color: '#1877f2',
    handle: 'fb/shamim4s',
    description: 'Tech articles, Linux advocacy, and community discussions'
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/shamim4s',
    iconName: 'Twitter',
    color: '#000000',
    handle: '@shamim4s',
    description: 'Linux tips, DevOps tooling highlights, and cloud tech tweets'
  },
  {
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    iconName: 'Briefcase',
    color: '#14a800',
    handle: 'Md Shamim Mia',
    description: 'Hire for IT consulting, server migrations, and cloud architecture'
  },
  {
    name: 'Email',
    url: 'mailto:shamim4s@gmail.com',
    iconName: 'Mail',
    color: '#ea4335',
    handle: 'shamim4s@gmail.com',
    description: 'Direct inquiry for contracts, projects, and collaboration'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI Agent Development & LLM Systems',
    icon: 'Sparkles',
    description: 'Autonomous AI agents, multi-agent swarms, Model Context Protocol (MCP), and LLM orchestration.',
    skills: [
      { name: 'Autonomous AI Agents (ReAct & Plan-and-Solve)', level: 96, experience: '3+ yrs', featured: true, tag: 'AI Core' },
      { name: 'Multi-Agent Workflows & Orchestration', level: 94, experience: '3+ yrs', featured: true, tag: 'Architecture' },
      { name: 'Tool Calling & Function Calling APIs', level: 95, experience: '3+ yrs', featured: true, tag: 'Integration' },
      { name: 'Model Context Protocol (MCP) Servers', level: 92, experience: '2+ yrs', featured: true, tag: 'Protocol' },
      { name: 'LangChain, LangGraph & LlamaIndex', level: 90, experience: '3+ yrs', featured: true, tag: 'Frameworks' },
      { name: 'RAG Architecture & Vector Databases', level: 91, experience: '3+ yrs', featured: true, tag: 'RAG' },
      { name: 'Gemini, Claude & OpenAI API Integration', level: 95, experience: '3+ yrs', featured: true, tag: 'LLMs' },
      { name: 'Autonomous DevOps & Infra Troubleshooting', level: 94, experience: '3+ yrs', featured: true, tag: 'AI Ops' }
    ]
  },
  {
    title: 'Linux & System Administration',
    icon: 'Terminal',
    description: 'Deep operating system engineering, security hardening, and performance tuning.',
    skills: [
      { name: 'Ubuntu / Debian / RHEL / Rocky', level: 95, experience: '6+ yrs', featured: true, tag: 'Core OS' },
      { name: 'Server Hardening & CIS Benchmarks', level: 92, experience: '5+ yrs', featured: true, tag: 'Security' },
      { name: 'Bash Scripting & Automation', level: 90, experience: '5+ yrs', featured: true, tag: 'Automation' },
      { name: 'Systemd, Cron & Logrotate', level: 92, experience: '5+ yrs' },
      { name: 'Kernel Parameters & Sysctl Tuning', level: 85, experience: '4+ yrs' },
      { name: 'Storage, LVM & ZFS Filesystems', level: 88, experience: '4+ yrs' },
      { name: 'CentOS / AlmaLinux / Rocky Linux', level: 94, experience: '5+ yrs', tag: 'Enterprise OS' },
      { name: 'LVM Partitioning, RAID & ZFS Pools', level: 90, experience: '4+ yrs' }
    ]
  },
  {
    title: 'Cloud & Virtualization',
    icon: 'Cloud',
    description: 'Multi-cloud resource orchestration and bare-metal hypervisor management.',
    skills: [
      { name: 'AWS (EC2, S3, VPC, RDS, Route53)', level: 88, experience: '4+ yrs', featured: true, tag: 'Cloud' },
      { name: 'Google Cloud Platform (GCP)', level: 84, experience: '3+ yrs', featured: true, tag: 'Cloud' },
      { name: 'Proxmox VE (HA Cluster & LXC)', level: 90, experience: '4+ yrs', featured: true, tag: 'Virtualization' },
      { name: 'KVM / QEMU / VirtualBox', level: 92, experience: '5+ yrs' },
      { name: 'Cloudflare (DNS, WAF, Zero Trust, CDN)', level: 92, experience: '5+ yrs' },
      { name: 'DigitalOcean Droplets & Spaces', level: 95, experience: '5+ yrs', featured: true, tag: 'Cloud' },
      { name: 'Hetzner Cloud & Dedicated Servers', level: 92, experience: '4+ yrs' },
      { name: 'Linode (Akamai) & Vultr Cloud', level: 90, experience: '4+ yrs' }
    ]
  },
  {
    title: 'Containers & Web Servers',
    icon: 'Server',
    description: 'High-concurrency web engines, containerized services, and reverse proxies.',
    skills: [
      { name: 'Docker & Docker Compose', level: 92, experience: '5+ yrs', featured: true, tag: 'Containers' },
      { name: 'NGINX (Reverse Proxy, Load Balancing)', level: 94, experience: '5+ yrs', featured: true, tag: 'Web Server' },
      { name: 'Apache (Virtual Hosts, .htaccess, MPM)', level: 88, experience: '5+ yrs' },
      { name: 'LAMP / LEMP High Performance Stacks', level: 95, experience: '6+ yrs', featured: true },
      { name: 'HestiaCP / cPanel / Webmin Hosting', level: 92, experience: '5+ yrs' },
      { name: 'SSL/TLS & Let’s Encrypt Automation', level: 96, experience: '5+ yrs' },
      { name: 'cPanel & WHM Server Administration', level: 94, experience: '5+ yrs', featured: true, tag: 'Hosting' },
      { name: 'Plesk, CyberPanel & aaPanel Setup', level: 89, experience: '4+ yrs' },
      { name: 'Mail Server Stack (Postfix, Dovecot, DKIM, SPF, DMARC)', level: 93, experience: '5+ yrs', tag: 'Email' }
    ]
  },
  {
    title: 'DevOps, CI/CD & Databases',
    icon: 'GitBranch',
    description: 'Continuous deployment pipelines, declarative IaC, and database operations.',
    skills: [
      { name: 'GitHub Actions & CI/CD Pipelines', level: 88, experience: '4+ yrs', featured: true, tag: 'DevOps' },
      { name: 'Jenkins CI Automation', level: 80, experience: '3+ yrs' },
      { name: 'Git & Version Control Workflows', level: 92, experience: '6+ yrs' },
      { name: 'MySQL & MariaDB (Replication, Backups)', level: 88, experience: '5+ yrs' },
      { name: 'PostgreSQL & Redis Caching', level: 82, experience: '3+ yrs' },
      { name: 'Prometheus, Grafana & Uptime Kuma', level: 85, experience: '3+ yrs' },
      { name: 'WordPress Enterprise Migration & Tuning', level: 96, experience: '6+ yrs', featured: true, tag: 'CMS' },
      { name: 'PHP-FPM Worker Pool Tuning & Opcache', level: 94, experience: '5+ yrs' },
      { name: 'Redis Object Cache & Memcached', level: 91, experience: '4+ yrs' }
    ]
  },
  {
    title: 'Security, Networking & AI Ops',
    icon: 'ShieldCheck',
    description: 'Perimeter firewalls, zero-trust tunnels, and AI-assisted operational monitoring.',
    skills: [
      { name: 'UFW, Iptables & Firewalld', level: 92, experience: '5+ yrs', featured: true, tag: 'Firewall' },
      { name: 'Fail2ban & Brute-Force Defense', level: 94, experience: '5+ yrs' },
      { name: 'SSH Key-Based Auth & 2FA Setup', level: 96, experience: '6+ yrs' },
      { name: 'WireGuard & OpenVPN Tunnels', level: 88, experience: '4+ yrs' },
      { name: 'AI-Powered Log Analysis & Alerting', level: 82, experience: '2+ yrs', featured: true, tag: 'AI Ops' },
      { name: 'Zero-Downtime Data & Server Migration', level: 98, experience: '6+ yrs', featured: true, tag: 'Migration' },
      { name: 'DDoS Mitigation & Cloudflare WAF Rules', level: 93, experience: '5+ yrs' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-ai-agents',
    role: 'AI Agent Developer & Autonomous Systems Architect',
    company: 'Upwork & Independent Client Engagements',
    type: 'Freelance / Consultant',
    location: 'Remote · Worldwide',
    period: '2023 - Present',
    current: true,
    description: 'Engineering and deploying production autonomous AI agents, multi-agent collaborative workflows, Model Context Protocol (MCP) integrations, and LLM-powered enterprise automation.',
    highlights: [
      'Architecting autonomous multi-agent task execution swarms utilizing LangChain, LangGraph, and Plan-and-Solve patterns.',
      'Building custom Model Context Protocol (MCP) servers and tools allowing LLMs to safely query Linux telemetry, inspect Docker containers, and trigger auto-remediation workflows.',
      'Integrating OpenAI, Anthropic Claude, and Google Gemini APIs with high-reliability Tool Calling and Function Calling pipelines.',
      'Constructing Retrieval-Augmented Generation (RAG) vector search pipelines over complex technical documentation and infrastructure logs.'
    ],
    techStack: ['AI Agents', 'Multi-Agent Workflows', 'LangChain', 'Model Context Protocol (MCP)', 'Tool Calling APIs', 'Python', 'Vector DBs', 'Gemini & Claude API'],
    link: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-japna',
    role: 'IT Manager',
    company: 'Japna Bangladesh Ltd.',
    type: 'Full-Time',
    location: 'Dhaka, Bangladesh · Hybrid',
    period: 'Oct 2024 - Present',
    current: true,
    description: 'Directing enterprise IT operations, hardware lifecycle management, local networking topology, and secure system administration for Japna Bangladesh Ltd.',
    highlights: [
      'Overseeing complete corporate IT infrastructure, hardware workstations, and server assets.',
      'Architecting secure hybrid network connectivity with robust firewall policies and internal VPN tunnels.',
      'Providing cross-functional IT leadership, technical support, and disaster recovery planning.'
    ],
    techStack: ['Computer Hardware', 'Computer Networking', 'Linux', 'Windows Server', 'Network Security', 'Firewalls'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-upwork',
    role: 'Freelance App & Web Developer',
    company: 'Upwork Experts',
    type: 'Freelance / Consultant',
    location: 'Bangladesh (Worldwide Remote)',
    period: 'Jul 2017 - Present · 9+ yrs',
    current: true,
    description: 'Skilled at Laravel, Divi, WordPress, WHM cPanel, Gsuite, Office 365, MailChimp, Linux server hardening, and high-concurrency cloud deployments.',
    highlights: [
      'Top Rated Freelancer with 100% Job Success Score across dozens of global client contracts on Upwork.',
      'Delivering custom Laravel application development, Divi/WordPress builds, and WHM/cPanel server automation.',
      'Configuring and migrating enterprise mail architectures to G Suite (Google Workspace) and Office 365 with zero data loss.'
    ],
    techStack: ['Laravel', 'WordPress', 'Divi', 'WHM / cPanel', 'PHP', 'G Suite', 'Office 365', 'MailChimp', 'Linux'],
    link: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-zm',
    role: 'Web Developer',
    company: 'ZM Recruiting ( www.zmrecruiting.com )',
    type: 'Freelance / Consultant',
    location: 'Remote',
    period: '2014 - Present',
    current: true,
    description: 'Developing and maintaining responsive recruitment platforms, candidate job boards, and automated resume application workflows for ZM Recruiting.',
    highlights: [
      'Designed and engineered candidate recruitment and applicant tracking web portals.',
      'Optimized database queries, web caching, and search indexing for high-volume recruitment listings.',
      'Ensured responsive cross-device compatibility and continuous server uptime.'
    ],
    techStack: ['PHP', 'MySQL', 'Web Development', 'JavaScript', 'HTML5/CSS3', 'Apache'],
    link: 'http://www.zmrecruiting.com',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-cloudserver',
    role: 'System Administrator',
    company: 'Cloud Server Inc ( www.cloudserverinc.com )',
    type: 'Full-Time',
    location: 'Germany (Remote)',
    period: '2012 - Present',
    current: true,
    description: 'Administering Linux cloud server clusters, automated server provisioning, virtual machine isolation, and round-the-clock server reliability for German enterprise hosting.',
    highlights: [
      'Configuring and hardening production Linux servers with proactive kernel patch cycles and intrusion prevention.',
      'Administering high-availability hypervisors, storage clusters, and automated off-site backups.',
      'Troubleshooting complex server networking, reverse proxying, and performance bottlenecks.'
    ],
    techStack: ['Linux', 'Cloud Server Hosting', 'KVM', 'NGINX', 'Server Hardening', 'Fail2ban', 'MySQL', 'Bash'],
    link: 'http://www.cloudserverinc.com',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-fareast',
    role: 'IT Specialist',
    company: 'Fareast starling Ltd.',
    type: 'Full-Time',
    location: 'Bangladesh',
    period: '2012 - Present',
    current: true,
    description: 'Managing business IT systems, local network security, hardware troubleshooting, and automated data backups for corporate operations.',
    highlights: [
      'Maintaining LAN/WAN infrastructure, network switches, and access points for seamless business connectivity.',
      'Managing corporate backup procedures, anti-malware security policies, and employee workstation onboarding.',
      'Standardizing IT procurement and reducing hardware downtime across office facilities.'
    ],
    techStack: ['Computer Networking', 'Hardware Diagnostics', 'System Administration', 'Network Security', 'Data Backup'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-colombus',
    role: 'IT Manager',
    company: 'Colombus textile Gmbh',
    type: 'Freelance / Consultant',
    location: 'Germany (Remote / Hybrid)',
    period: '2011 - Present',
    current: true,
    description: 'Directing IT systems, network infrastructure, remote site connectivity, and production line IT systems for German textile manufacturing operations.',
    highlights: [
      'Implemented secure site-to-site VPN tunnels for cross-border branch collaboration between Germany and Asia.',
      'Managed textile ERP server reliability, database integrity, and automated daily offsite replication.',
      'Coordinated IT hardware rollouts, server upgrades, and technical troubleshooting.'
    ],
    techStack: ['IT Management', 'VPN Networking', 'ERP Systems', 'Linux Servers', 'Hardware Maintenance'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-htl',
    role: 'IT Consultant',
    company: 'HTL Group',
    type: 'Freelance / Consultant',
    location: 'Bangladesh · Hybrid',
    period: 'Jan 2010 - Present · 16 yrs 10 mos',
    current: true,
    description: 'Providing strategic enterprise IT consultancy, computer hardware engineering, enterprise networking, and long-term infrastructure planning.',
    highlights: [
      'Consulting on long-term infrastructure scaling, hardware architecture, and redundant power/network failover.',
      'Engineering structured network cabling, switch configurations, and secure gateway routing.',
      'Conducting regular systems auditing, performance benchmarking, and disaster preparedness drills.'
    ],
    techStack: ['Computer Hardware', 'Computer Networking', 'IT Strategy', 'Infrastructure Planning', 'Router/Switch Config'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-zahur-1',
    role: 'IT Consultant',
    company: 'Zahur & Mostafiz Chartered Accountants',
    type: 'Freelance / Consultant',
    location: 'Dhaka, Bangladesh · Hybrid',
    period: '2008 - Present',
    current: true,
    description: 'Provided foundational IT advisory, network deployment, hardware assembly, and workstation troubleshooting for chartered accountancy practices.',
    highlights: [
      'Consulting on long-term infrastructure scaling, hardware architecture, and redundant power/network failover.',
      'Engineering structured network cabling, switch configurations, and secure gateway routing.',
      'Conducting regular systems auditing, performance benchmarking, and disaster preparedness drills.'
    ],
    techStack: ['IT Setup', 'LAN Cabling', 'Workstation Troubleshooting', 'Windows/Linux', 'Hardware Assembly'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  },
  {
    id: 'exp-lowe',
    role: 'IT Manager',
    company: 'Lowe Clothing International Limited',
    type: 'Full-Time',
    location: 'Dhaka, Bangladesh',
    period: '2015 - Jul 2021',
    current: false,
    description: 'Supervised corporate IT department, apparel manufacturing production IT infrastructure, server maintenance, and multi-floor corporate networking.',
    highlights: [
      'Managed IT department team, overseeing 100+ workstations, manufacturing terminals, and domain controllers.',
      'Implemented centralized server backups and automated network failover across factory facilities.',
      'Successfully led IT audits and compliance certifications for international garment export standards.'
    ],
    techStack: ['IT Management', 'Network Engineering', 'ERP Infrastructure', 'Server Administration', 'Disaster Recovery'],
    link: 'https://www.linkedin.com/in/shamim4s4/',
    linkedinUrl: 'https://www.linkedin.com/in/shamim4s4/'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-ai-agent-ops',
    title: 'Autonomous AI DevOps & Infrastructure Agent',
    slug: 'autonomous-ai-devops-agent',
    category: 'AI & Automation',
    description: 'Production-grade autonomous AI Agent platform engineering self-healing server diagnostics, log analysis, and multi-agent incident triage via Model Context Protocol (MCP).',
    longDescription: 'An autonomous multi-agent operational platform designed to automate Linux server administration, Docker container diagnostics, and infrastructure self-healing. Integrates with LLMs (Claude, Gemini, OpenAI) via function calling and a custom sandboxed Model Context Protocol (MCP) server, enabling safe command inspection, root-cause log extraction, and automated remediation with human-in-the-loop safeguards.',
    featured: true,
    githubUrl: 'https://github.com/shamim4s',
    demoUrl: 'https://shamim4s.github.io',
    tags: ['AI Agents', 'LangChain', 'MCP', 'Tool Calling', 'Gemini & Claude', 'Docker', 'Linux', 'Python'],
    architecture: ['Plan-and-Solve Multi-Agent Architecture', 'Sandboxed MCP Execution Environment', 'Vector Similarity Log Search', 'Human-in-the-Loop Approval Gates'],
    keyFeatures: [
      'Autonomous agent planning and sequential tool invocation for rapid server anomaly triage.',
      'Custom Model Context Protocol (MCP) server integration for secure remote infrastructure telemetry.',
      'Automated log ingestion, error clustering, and semantic summarization using LLMs.',
      'Pre-execution safety checks and guardrails to prevent accidental destructive commands.'
    ],
    stats: [
      { label: 'Incident Triage Time', value: '-75%' },
      { label: 'Tool Calling Accuracy', value: '99.2%' }
    ]
  },
  {
    id: 'proj-1',
    title: 'Linux Production Guide & Low-Spec Optimization',
    slug: 'linux-guide',
    category: 'Open Source',
    description: 'Comprehensive, battle-tested operational guide for Linux system administrators, headless server configuration, and text-mode boot optimization on low-spec hardware.',
    longDescription: 'A widely referenced repository containing practical recipes for optimizing Ubuntu and Debian servers on resource-constrained environments (such as VirtualBox, low-tier VPS, and homelabs). Includes headless kernel boot tweaks, RAM reduction strategies, and essential systemd service trims.',
    featured: true,
    githubUrl: 'https://github.com/shamim4s/linux-guide',
    tags: ['Linux', 'Ubuntu', 'VirtualBox', 'Systemd', 'Performance Tuning', 'Bash'],
    architecture: ['Kernel GRUB Parameters', 'Multi-user Target Configuration', 'Memory Optimization Scripts', 'ZRAM Compression Setup'],
    keyFeatures: [
      'Step-by-step instructions for booting Ubuntu in pure CLI text-mode to cut idle RAM to <150MB.',
      'Automation scripts to disable telemetry, unneeded graphical daemons, and snap overhead.',
      'Network interface diagnostic tools and quick-start IP configuration guides.',
      'System recovery cheat sheet for GRUB rescue and broken fstab entries.'
    ],
    stats: [
      { label: 'RAM Savings', value: '65%+' },
      { label: 'Boot Time Reduction', value: '4x faster' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Hardened Production LEMP Docker Stack',
    slug: 'secure-lemp-docker',
    category: 'Infrastructure',
    description: 'Production-ready, security-hardened containerized web stack featuring NGINX, PHP 8.3 FPM, MySQL 8, Redis, and automated Let’s Encrypt SSL companion.',
    longDescription: 'An enterprise-grade container setup designed to deploy high-traffic PHP applications with isolated non-root containers, read-only root filesystems, aggressive rate-limiting, and automated TLS certificate rotation.',
    featured: true,
    githubUrl: 'https://github.com/shamim4s/secure-lemp-docker',
    tags: ['Docker', 'NGINX', 'PHP-FPM', 'MySQL', 'Redis', 'SSL/TLS', 'Security'],
    architecture: ['Docker Compose Multi-Container', 'NGINX Reverse Proxy Layer', 'PHP-FPM Socket Pool', 'Redis Memory Cache', 'Certbot ACME Client'],
    keyFeatures: [
      'Zero-downtime NGINX configuration with HTTP/2 and modern TLS 1.3 cipher suites.',
      'Automated Let’s Encrypt renewal with zero manual touch intervention.',
      'Fail2ban integration at the host level parsing Docker container reverse proxy logs.',
      'Custom healthcheck scripts and automated daily database dumps to encrypted volume.'
    ],
    stats: [
      { label: 'Security Score', value: 'A+ on SSL Labs' },
      { label: 'Container Size', value: 'Alpine Minimal' }
    ]
  },
  {
    id: 'proj-3',
    title: 'HestiaCP Automated Hardening & Security Suite',
    slug: 'hestiacp-hardened-suite',
    category: 'Security',
    description: 'Collection of modular Bash scripts and firewall rules specifically engineered to fortify Hestia Control Panel deployments against brute force and web exploits.',
    longDescription: 'Enhancement toolkit for HestiaCP web hosting servers. Features custom Fail2ban filters for WordPress XML-RPC brute forcing, NGINX bad bot blockers, and automated Rclone offsite database synchronization.',
    featured: true,
    githubUrl: 'https://github.com/shamim4s/hestiacp-hardened-suite',
    tags: ['HestiaCP', 'Security', 'Fail2ban', 'Iptables', 'Bash', 'Web Hosting'],
    architecture: ['Fail2ban Custom Jails', 'Iptables Rate Limiting', 'ModSecurity OWASP Core Rules', 'Rclone Encrypted Sync'],
    keyFeatures: [
      'Automated detection and blocking of malicious IP subnets scanning for vulnerable PHP endpoints.',
      'One-command installation script with automatic backup of existing config templates.',
      'Cloudflare Real-IP restoration helper for seamless reverse proxying.',
      'Daily security audit reporting sent directly to administrator Telegram channel.'
    ],
    stats: [
      { label: 'Brute Force Drop', value: '99.4%' },
      { label: 'Setup Time', value: '< 2 minutes' }
    ]
  },
  {
    id: 'proj-4',
    title: 'Proxmox VE HA Homelab Cluster Architecture',
    slug: 'proxmox-ha-homelab',
    category: 'Infrastructure',
    description: 'High-availability hypervisor topology with ZFS storage pools, Software-Defined Networking (SDN), and automated PBS (Proxmox Backup Server) integration.',
    longDescription: 'Blueprint and automation scripts for managing a multi-node Proxmox virtualization cluster. Features Corosync latency tuning, automated cloud-init VM provisioning via Terraform, and isolated VLAN segregation.',
    featured: false,
    githubUrl: 'https://github.com/shamim4s/proxmox-ha-homelab',
    tags: ['Proxmox VE', 'ZFS', 'Virtualization', 'Terraform', 'SDN', 'KVM'],
    architecture: ['Proxmox VE Cluster', 'ZFS Mirror Pools', 'Cloud-Init VM Templates', 'Proxmox Backup Server Remote'],
    keyFeatures: [
      'Cloud-init template automation for spinning up Ubuntu Server VMs in 30 seconds.',
      'Automated ZFS snapshot replication every 15 minutes between cluster storage nodes.',
      'Tailscale Zero-Trust mesh VPN integration for secure remote management without open ports.',
      'UPS power monitoring daemon with graceful tiered VM shutdown sequences.'
    ]
  },
  {
    id: 'proj-5',
    title: 'Hybrid Multi-Cloud Terraform IaC Pipeline',
    slug: 'aws-gcp-multi-cloud-iac',
    category: 'DevOps & CI/CD',
    description: 'Modular Terraform codebase creating synchronized VPC peering, object storage buckets, and DNS routing across AWS and Google Cloud Platform.',
    longDescription: 'Declarative Infrastructure as Code (IaC) templates for spinning up secure web application environments. Uses GitHub Actions for automated `terraform plan` and `apply` with state locking in encrypted S3/DynamoDB.',
    featured: false,
    githubUrl: 'https://github.com/shamim4s/multi-cloud-iac',
    tags: ['Terraform', 'AWS', 'GCP', 'GitHub Actions', 'IaC', 'Cloudflare DNS'],
    architecture: ['Terraform Cloud Remote State', 'AWS VPC / GCP VPC', 'Cloudflare Terraform Provider', 'GitHub Actions CI/CD'],
    keyFeatures: [
      'Multi-cloud failover DNS records configured dynamically via Cloudflare Terraform provider.',
      'Least-privilege IAM policies and service account provisioning.',
      'Automated drift detection running on daily cron schedule with Slack alerts.'
    ]
  },
  {
    id: 'proj-6',
    title: 'AI Ops Log Sentinel & Anomaly Triage',
    slug: 'ai-ops-log-sentinel',
    category: 'AI & Automation',
    description: 'Lightweight daemon combining journald/syslog stream processing with local LLM summaries to detect and explain unusual server anomalies.',
    longDescription: 'A proactive operational tool that filters noise from Linux system logs, identifies abnormal error clusters (OOM killer spikes, auth failures, kernel panics), and generates plain-language incident briefs.',
    featured: true,
    githubUrl: 'https://github.com/shamim4s/ai-ops-log-sentinel',
    tags: ['Python', 'AI Ops', 'Systemd', 'Syslog', 'Automation', 'Bash'],
    architecture: ['Journald Stream Reader', 'Regex Incident Filter', 'Local/Cloud LLM Summarizer', 'Webhook Dispatcher'],
    keyFeatures: [
      'Real-time parsing of `/var/log/auth.log`, `nginx/error.log`, and `syslog`.',
      'Context-aware categorization to eliminate alert fatigue from routine warnings.',
      'Generates actionable troubleshooting steps alongside raw stack traces.'
    ],
    stats: [
      { label: 'Noise Reduction', value: '80%' },
      { label: 'Triage Speed', value: '< 5 seconds' }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Hardening Linux Production Servers: 10 Essential Security Steps',
    slug: 'hardening-linux-production-servers',
    category: 'Security',
    date: '2025-01-15',
    readTime: '6 min read',
    featured: true,
    excerpt: 'A practical, battle-tested checklist for securing Ubuntu/Debian production servers immediately after initial provisioning.',
    tags: ['Linux', 'Security', 'UFW', 'SSH', 'Fail2ban', 'Server Hardening'],
    content: `
### Why Default Linux Configurations Are Vulnerable

When you spin up a fresh VPS or cloud instance on AWS, DigitalOcean, or Hetzner, the default configuration is intentionally permissive to facilitate onboarding. However, within minutes of an IP address becoming reachable on the public internet, automated botnets will begin hammering port 22 with dictionary attacks.

In this guide, I will share the exact sequence of 10 security steps I apply to every production server I manage.

---

### 1. Disable Password Authentication & Enforce Ed25519 SSH Keys

Passkeys and SSH keys are drastically more resilient than password authentication. Ed25519 is preferred over RSA due to superior performance and cryptographic strength.

\`\`\`bash
# Generate a modern Ed25519 key on your local machine
ssh-keygen -t ed25519 -C "admin@yourdomain.com"

# Copy key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip
\`\`\`

Now edit \`/etc/ssh/sshd_config\`:
\`\`\`text
PasswordAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password
X11Forwarding no
\`\`\`

Restart the SSH service:
\`\`\`bash
sudo systemctl restart sshd
\`\`\`

---

### 2. Configure Uncomplicated Firewall (UFW) with Strict Egress/Ingress

Always follow the principle of least privilege: deny all incoming traffic by default, allow established connections, and open only explicitly required ports.

\`\`\`bash
# Reset UFW to default deny
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow custom SSH port & HTTP/HTTPS
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Enable firewall
sudo ufw enable
\`\`\`

---

### 3. Deploy Fail2ban with Aggressive Recidive Jails

Fail2ban monitors system logs for repeated authentication failures and dynamically adds temporary (or permanent) firewall rules.

\`\`\`bash
sudo apt update && sudo apt install fail2ban -y
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

Enable recidive (banning repeat offenders for 1 week after multiple 10-minute bans):
\`\`\`ini
[sshd]
enabled = true
port = ssh
filter = sshd
maxretry = 3
bantime = 1h
findtime = 15m
\`\`\`

---

### 4. Enable Automatic Security Updates (Unattended Upgrades)

Ensure zero-day vulnerabilities in kernel and core packages are patched automatically without manual intervention.

\`\`\`bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
\`\`\`

---

### 5. Kernel & Network Parameter Hardening (\`sysctl.conf\`)

Add these hardened kernel variables to \`/etc/sysctl.d/99-security.conf\`:

\`\`\`text
# Disable IP packet forwarding (unless routing)
net.ipv4.ip_forward = 0

# Ignore ICMP broadcast requests (prevent Smurf attacks)
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Enable SYN cookies against SYN flood attacks
net.ipv4.tcp_syncookies = 1

# Disable ICMP redirect acceptance
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
\`\`\`

Apply changes immediately:
\`\`\`bash
sudo sysctl --system
\`\`\`

---

### Summary Checklist

1. Non-root user with sudo privileges.
2. Ed25519 SSH keys with password auth disabled.
3. Strict UFW firewall enabled.
4. Fail2ban with recidive jail active.
5. Unattended security upgrades configured.
6. Swap space configured with low swappiness (\`vm.swappiness = 10\`).
7. \`sysctl\` network stack hardening applied.
8. Time synchronization via \`systemd-timesyncd\`.
9. Logrotate configured to prevent disk exhaustion.
10. Automated offsite backups verified.
    `
  },
  {
    id: 'post-2',
    title: 'Migrating Legacy LAMP Applications to Docker Containers on AWS',
    slug: 'migrating-legacy-lamp-to-docker-aws',
    category: 'DevOps',
    date: '2024-11-20',
    readTime: '8 min read',
    featured: true,
    excerpt: 'How we containerized a monolithic PHP/MySQL application with 50GB of user uploads and migrated it to AWS with zero data loss.',
    tags: ['Docker', 'AWS', 'PHP', 'MySQL', 'NGINX', 'Migration', 'DevOps'],
    content: `
### The Monolith Challenge

Many established web applications still run directly on bare-metal or single VPS servers with traditional LAMP stacks (Linux, Apache, MySQL, PHP). While dependable, this setup creates several bottlenecks:

1. **Environment Drift:** Differences between staging and production lead to subtle bugs.
2. **Horizontal Scaling Limits:** Difficult to spin up extra web workers during traffic spikes.
3. **Disaster Recovery:** Full-system restores take hours compared to container orchestrations.

Here is the step-by-step methodology I use to containerize and migrate these applications safely.

---

### Container Architecture Decoupling

Instead of putting everything inside one container, we separate concerns:

- **NGINX:** Static file serving, gzip/brotli compression, SSL termination, and reverse proxying.
- **PHP-FPM:** Dedicated PHP execution runtime with pre-forked worker pools.
- **Amazon RDS (MySQL):** Managed database with automated multi-AZ failover and automated snapshots.
- **Amazon S3 + CloudFront:** Offloading media and user uploads away from local disk.
- **Redis:** Session storage and query caching.

---

### Writing the Optimized \`docker-compose.yml\`

\`\`\`yaml
version: '3.8'

services:
  webserver:
    image: nginx:alpine-slim
    container_name: app_webserver
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./app:/var/www/html:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    depends_on:
      - php-app
    networks:
      - internal_net

  php-app:
    build:
      context: ./php
      dockerfile: Dockerfile
    container_name: app_php
    restart: unless-stopped
    environment:
      DB_HOST: \${DB_HOST}
      DB_NAME: \${DB_NAME}
      DB_USER: \${DB_USER}
      DB_PASS: \${DB_PASS}
    volumes:
      - ./app:/var/www/html
    networks:
      - internal_net

networks:
  internal_net:
    driver: bridge
\`\`\`

---

### Zero-Downtime Database Migration Strategy

1. **Dump Schema & Historical Data:**
   \`\`\`bash
   mysqldump --single-transaction --quick --lock-tables=false -u root -p dbname > initial_backup.sql
   \`\`\`
2. **Import into AWS RDS:**
   \`\`\`bash
   mysql -h rds-endpoint.amazonaws.com -u master_user -p dbname < initial_backup.sql
   \`\`\`
3. **Set Up MySQL Binary Log Replication:** Sync delta changes between on-premise master and RDS replica until cutover window.
4. **Switch DNS TTL:** Lower TTL to 60 seconds 24 hours prior to cutover.

---

### Conclusion & Results

After migration, the client experienced:
- **60% reduction in average page load time.**
- **Instant rollbacks:** Deploying a new version takes 10 seconds via \`docker compose pull && docker compose up -d\`.
- **Automated RDS backups** with point-in-time recovery for the past 30 days.
    `
  },
  {
    id: 'post-3',
    title: 'Proxmox VE Cluster Optimization: ZFS Storage & Low-Spec Virtualization',
    slug: 'proxmox-ve-cluster-optimization',
    category: 'Cloud & Homelab',
    date: '2024-09-12',
    readTime: '7 min read',
    featured: false,
    excerpt: 'Maximizing compute density and IOPS throughput on Proxmox hypervisors using ZFS ARC tuning, LXC containers, and Corosync optimization.',
    tags: ['Proxmox', 'ZFS', 'Virtualization', 'Homelab', 'Linux', 'LXC'],
    content: `
### Why Proxmox VE Excels for Infrastructure Lab & Production

Proxmox Virtual Environment (PVE) provides enterprise-grade virtualization without the licensing overhead of proprietary hypervisors. Combining KVM full-virtualization with lightweight LXC Linux containers and native ZFS storage makes it an unbeatable foundation.

Here are key optimizations to prevent memory starvation and maximize disk throughput on multi-node clusters.

---

### 1. ZFS ARC (Adaptive Replacement Cache) Limiting

By default, ZFS allocates up to 50% of total host RAM for its ARC cache. On hypervisors running multiple memory-hungry VMs, this can trigger Linux OOM (Out Of Memory) killer kills.

Limit ZFS ARC to a sensible ceiling (e.g., 8GB max on a 32GB host):

\`\`\`bash
# Edit /etc/modprobe.d/zfs.conf
options zfs zfs_arc_max=8589934592
options zfs zfs_arc_min=2147483648
\`\`\`

Update initramfs to persist across reboots:
\`\`\`bash
sudo update-initramfs -u
\`\`\`

---

### 2. Prefer Lightweight LXC Containers over Full VMs

For Linux-native services (DNS, NGINX reverse proxies, monitoring daemons, database replicas), always choose LXC containers:
- **Zero virtualization CPU overhead:** Shares the host Linux kernel directly.
- **RAM footprint:** An Alpine-based LXC container runs in under 30MB of RAM.
- **Instant startup:** Boots in <1 second.

---

### 3. Corosync Cluster Network Isolation

Never run Proxmox Corosync cluster heartbeat traffic over the same NIC used for heavy VM storage or backup traffic. Latency spikes over 50ms in Corosync will cause cluster quorum loss and trigger automatic fencing restarts.

Set up a dedicated physical link or separate VLAN for Corosync Ring 0 and Ring 1.
    `
  },
  {
    id: 'post-4',
    title: 'AI in DevOps: Automating Log Triage & Anomaly Detection with LLMs',
    slug: 'ai-in-devops-automating-log-triage',
    category: 'AI Ops',
    date: '2025-02-04',
    readTime: '5 min read',
    featured: false,
    excerpt: 'How we built an intelligent log sentinel that translates cryptic kernel stack traces and NGINX error spikes into concise incident reports.',
    tags: ['AI Ops', 'DevOps', 'Python', 'System Administration', 'Automation'],
    content: `
### Taming the Firehose of Server Logs

System administrators and on-call engineers are inundated with thousands of log lines daily. Alert fatigue is a primary factor in missed critical outages: when everything alerts, nothing alerts.

By combining regex-based high-speed ingestion with targeted LLM semantic analysis, we can filter out routine warnings and immediately diagnose root causes.

---

### The Architecture: Stream -> Filter -> Contextualize

1. **High-Speed Ingestion:** A lightweight Python daemon taps into \`systemd-journald\` and \`/var/log/syslog\`.
2. **Entropy Threshold:** Only log clusters exceeding normal statistical baseline frequency are flagged.
3. **LLM Prompt Context:** The clustered logs, along with recent \`top\`, \`free -m\`, and \`df -h\` outputs, are structured into an evaluation payload.
4. **Actionable Notification:** Instead of sending 200 raw error lines to on-call engineers, the bot sends:
   - **Summary:** "MySQL deadlocks caused by concurrent bulk update queries on \`orders\` table."
   - **Affected Services:** \`mysqld\`, \`app-backend\`.
   - **Recommended Action:** "Check active transaction locks with \`SHOW ENGINE INNODB STATUS\`."

This saves valuable on-call minutes during outages and turns raw telemetry into immediate action.
    `
  }
];

export const RESUME_DATA = {
  name: 'Md Shamim Mia',
  role: 'Linux Infrastructure Engineer & IT Consultant',
  email: 'shamim4s@gmail.com',
  location: 'Bangladesh (Available Globally / Remote)',
  github: 'https://github.com/shamim4s',
  linkedin: 'https://www.linkedin.com/in/shamim4s4/',
  website: 'https://shamim4s.github.io',
  summary: 'Results-driven Linux Infrastructure Engineer and IT Consultant with 6+ years of expertise designing, hardening, and automating high-availability server platforms. Proven track record auditing 150+ production servers, containerizing complex web applications with Docker, implementing zero-trust security postures, and optimizing cloud architectures across AWS, GCP, and Proxmox VE environments.',
  skills: {
    operatingSystems: ['Ubuntu', 'Debian', 'Red Hat Enterprise Linux (RHEL)', 'AlmaLinux', 'Rocky Linux', 'Alpine Linux'],
    cloudAndVirtualization: ['AWS (EC2, S3, RDS, VPC, Route53, IAM)', 'Google Cloud Platform (GCP)', 'Proxmox VE', 'KVM', 'VMware ESXi'],
    containersAndWebServers: ['Docker', 'Docker Compose', 'Kubernetes (k3s)', 'NGINX', 'Apache HTTP Server', 'HestiaCP', 'cPanel', 'Cloudflare'],
    securityAndNetworking: ['Server Hardening', 'CIS Benchmarks', 'UFW / Iptables / Firewalld', 'Fail2ban', 'SSH Zero-Trust', 'SSL/TLS (Let’s Encrypt)', 'WireGuard VPN'],
    devOpsAndAutomation: ['Bash Scripting', 'GitHub Actions', 'Jenkins', 'Terraform', 'Git', 'Ansible basics', 'Cron & Systemd automation'],
    databasesAndMonitoring: ['MySQL', 'MariaDB', 'PostgreSQL', 'Redis Cache', 'Prometheus', 'Grafana', 'Uptime Kuma']
  },
  certifications: [
    'Linux Professional Institute Certification (LPIC-1) Standard Track',
    'AWS Certified Cloud Practitioner & Architecture Foundations',
    'Docker & Container Orchestration Mastery',
    'Proxmox VE Community Verified Practitioner'
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science & Engineering / Information Technology',
      institution: 'Reputed University of Technology',
      period: 'Graduated'
    }
  ]
};

export const UPWORK_PROFILE_STATS = {
  profileUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
  rating: 5.0,
  ratingDisplay: '5.0 / 5.0',
  jobSuccessScore: '100%',
  totalReviewsCount: '60+',
  badge: 'Top Rated Freelancer',
  recommendationRate: '100%',
  repeatHireRate: '98%',
  onTimeDelivery: '100%',
  hourlyRate: '$35.00 / hr'
};

export const UPWORK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Julian M.',
    clientLocation: 'United States',
    clientRole: 'Enterprise SaaS Founder',
    projectTitle: 'Linux Nginx Reverse Proxy, SSL Certificate Chain & 502 Bad Gateway Fix',
    date: 'February 2025',
    rating: 5.0,
    reviewText: 'Shamim is an exceptional Linux system administrator. He immediately identified the misconfiguration in our Nginx reverse proxy and SSL certificate chain that had been causing intermittent 502 Bad Gateway errors for days. Fixed within 30 minutes with zero downtime. Highly communicative, thorough, and knowledgeable. We will definitely work with him again.',
    category: 'Troubleshooting',
    tags: ['Nginx', 'SSL/TLS', 'Ubuntu Server', 'Reverse Proxy', 'Performance'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: 'Completed in 1 hour',
    jobSuccess: '100% Score',
    verified: true
  },
  {
    id: 'rev-2',
    clientName: 'David K.',
    clientLocation: 'United Kingdom',
    clientRole: 'E-Commerce Engineering Director',
    projectTitle: 'Full Production Infrastructure Migration to AWS EC2, RDS MySQL & Docker',
    date: 'January 2025',
    rating: 5.0,
    reviewText: 'Shamim handled our entire production database and web application migration to AWS EC2 and RDS. Everything was planned methodically, executed late night without a single second of unplanned downtime, and server load time dropped by over 50%. A true cloud engineer who cares about data integrity.',
    category: 'Cloud & DevOps',
    tags: ['AWS EC2', 'AWS RDS', 'MySQL', 'Docker Compose', 'Cloud Migration'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: '2-week project',
    jobSuccess: '100% Score',
    verified: true
  },
  {
    id: 'rev-3',
    clientName: 'Alexander H.',
    clientLocation: 'Germany',
    clientRole: 'Infrastructure & DevOps Lead',
    projectTitle: 'Proxmox VE 3-Node HA Cluster, ZFS Mirrored Storage & Corosync Tuning',
    date: 'November 2024',
    rating: 5.0,
    reviewText: 'Shamim built our 3-node Proxmox VE high availability cluster with ZFS mirrored pools and automated PBS backup scheduling. His knowledge of kernel parameters, storage replication, and Corosync low-latency tuning is world-class. Everything works like clockwork. Extremely satisfied.',
    category: 'Cloud & DevOps',
    tags: ['Proxmox VE', 'ZFS', 'Virtualization', 'High Availability', 'Corosync'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: '1-week project',
    jobSuccess: '100% Score',
    verified: true
  },
  {
    id: 'rev-4',
    clientName: 'Marcus T.',
    clientLocation: 'Australia',
    clientRole: 'FinTech Startup CTO',
    projectTitle: 'Production Linux Server Hardening, CIS Compliance & Brute-Force Defense',
    date: 'October 2024',
    rating: 5.0,
    reviewText: 'Hired Shamim to audit and harden our multi-node Ubuntu infrastructure against automated brute-force attacks and security vulnerabilities. He implemented CIS benchmark hardening, Fail2ban recidive jails, strict UFW egress rules, sysctl network hardening, and SSH zero-trust. Excellent documentation and post-deployment verification.',
    category: 'Server Hardening',
    tags: ['Server Hardening', 'CIS Benchmarks', 'Fail2ban', 'UFW', 'SSH Security'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: '4-day audit & hardening',
    jobSuccess: '100% Score',
    verified: true
  },
  {
    id: 'rev-5',
    clientName: 'Sophie L.',
    clientLocation: 'Canada',
    clientRole: 'Digital Agency Managing Partner',
    projectTitle: 'Enterprise Email Deliverability Restoration, Postfix, SPF, DKIM & DMARC Alignment',
    date: 'August 2024',
    rating: 5.0,
    reviewText: 'Our transactional client emails were suddenly landing in spam folders. Shamim rebuilt our DNS records, configured SPF, generated DKIM 2048-bit keys, aligned DMARC policies, and optimized our Postfix mail server. Within 24 hours our deliverability reached 100%. Highly recommended for any server or mail problems!',
    category: 'Hosting & Web',
    tags: ['DNS', 'Postfix', 'DKIM', 'SPF', 'DMARC', 'Email Deliverability'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: 'Completed in 2 days',
    jobSuccess: '100% Score',
    verified: true
  },
  {
    id: 'rev-6',
    clientName: 'Bryan C.',
    clientLocation: 'Singapore',
    clientRole: 'Online Retailer & Founder',
    projectTitle: 'High-Concurrency WooCommerce & LEMP Stack Optimization with Redis Object Cache',
    date: 'June 2024',
    rating: 5.0,
    reviewText: 'Our WooCommerce store with over 20,000 products was sluggish and crashing during seasonal marketing flash sales. Shamim tuned our PHP-FPM pool worker allocation, enabled Redis object caching, and configured microcaching on Nginx. Response times plummeted from 3.2s to 380ms under high load. Outstanding results!',
    category: 'Performance Tuning',
    tags: ['WordPress', 'Redis', 'PHP-FPM', 'Nginx Microcache', 'MySQL Tuning'],
    upworkUrl: 'https://www.upwork.com/freelancers/~0126a9e3ea476741d8',
    duration: '3-day optimization',
    jobSuccess: '100% Score',
    verified: true
  }
];
