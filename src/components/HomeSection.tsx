import React, { useEffect, useRef, useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  ChevronDown, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO, UPWORK_PROFILE_STATS } from '../data/portfolioData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

export const HomeSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const particleCount = width < 640 ? 45 : width < 1024 ? 70 : 95;
    const maxDistance = width < 640 ? 110 : 140;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      isActive: false
    };

    // Helper to detect dark mode for particles color
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius,
        baseRadius: radius
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst 4 new particles outward
      for (let i = 0; i < 4; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1.5;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 2,
          baseRadius: 2
        });
      }
      if (particles.length > particleCount + 20) {
        particles.splice(0, 4);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Animation Loop (Vincent Garreau particles.js constellation logic)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const darkMode = isDarkMode();
      const dotColor = darkMode ? 'rgba(56, 189, 248, 0.85)' : 'rgba(15, 118, 110, 0.8)';
      const lineColorRgb = darkMode ? '56, 189, 248' : '13, 148, 136';
      const mouseLineColorRgb = darkMode ? '16, 185, 129' : '15, 118, 110';

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0) {
          p.x = 0;
          p.vx = -p.vx;
        } else if (p.x > width) {
          p.x = width;
          p.vx = -p.vx;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = -p.vy;
        } else if (p.y > height) {
          p.y = height;
          p.vy = -p.vy;
        }

        // Mouse interaction (repulsion)
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 2.5;
            p.y += (dy / dist) * force * 2.5;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // 2. Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (darkMode ? 0.45 : 0.35);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColorRgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // 3. Connect to mouse cursor
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (darkMode ? 0.6 : 0.45);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${mouseLineColorRgb}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  const avatarSrc = !imageError 
    ? PERSONAL_INFO.avatarUrl 
    : PERSONAL_INFO.fallbackAvatarUrl;

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      {/* Interactive particles.js Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        title="Interactive particles network - move cursor or click"
      />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
        
        {/* Profile Picture with Round Border in Middle */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            {/* Outer decorative glowing ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-75 blur-xs group-hover:opacity-100 transition-opacity" />
            
            {/* Round Border Frame */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-white dark:bg-slate-900 border-4 border-emerald-500 shadow-2xl ring-8 ring-emerald-500/20 flex items-center justify-center overflow-hidden">
              <img
                src={avatarSrc}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Verified Online Badge */}
              <div 
                className="absolute bottom-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center"
                title="Available for consulting & IT management"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {PERSONAL_INFO.name}
        </h1>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 mt-3 font-mono">
          {PERSONAL_INFO.title}
        </h2>

        {/* Company & Role Tagline */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">AI Agent Developer</span> & IT Manager at <span className="font-semibold text-slate-900 dark:text-white">Japna Bangladesh Ltd.</span> · Professional Upwork IT Consultant with <span className="font-semibold text-emerald-600 dark:text-emerald-400">16+ years</span> in Autonomous Agents, LLM Systems, Cloud & Linux Server Hardening.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Top Rated Upwork Freelancer</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>5.0 / 5.0 Rating (60+ Reviews)</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>100% Job Success Score</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <a
            href="https://www.upwork.com/freelancers/~0126a9e3ea476741d8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span>Hire on Upwork</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/shamim4s4/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="#reviews"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
          >
            <span>Customer Reviews</span>
          </a>

          <a
            href="#experience"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
          >
            <span>Experience (16+ yrs)</span>
          </a>
        </div>

        {/* Scroll Down Prompt */}
        <div className="mt-14 flex justify-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-500 transition-colors animate-bounce"
            title="Scroll to About & Background"
          >
            <span>Explore Portfolio</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
