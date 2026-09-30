import React, { useState } from 'react';
import { 
  FileDown, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Award, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Download
} from 'lucide-react';
import { RESUME_DATA, PERSONAL_INFO, EXPERIENCES } from '../data/portfolioData';
import { Avatar } from './Avatar';

interface ResumeSectionProps {
  onDownloadResume: () => void;
  onCopySuccess: (text: string) => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onDownloadResume, onCopySuccess }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'skills' | 'certifications' | 'markdown'>('preview');
  const [copied, setCopied] = useState(false);

  const getMarkdownResume = () => {
    return `# ${RESUME_DATA.name}
**${RESUME_DATA.role}**
Email: ${RESUME_DATA.email} | GitHub: ${RESUME_DATA.github} | Location: ${RESUME_DATA.location}

## Professional Summary
${RESUME_DATA.summary}

## Key Technical Skills
- **Operating Systems:** ${RESUME_DATA.skills.operatingSystems.join(', ')}
- **Cloud & Virtualization:** ${RESUME_DATA.skills.cloudAndVirtualization.join(', ')}
- **Containers & Web Servers:** ${RESUME_DATA.skills.containersAndWebServers.join(', ')}
- **Security & Hardening:** ${RESUME_DATA.skills.securityAndNetworking.join(', ')}
- **DevOps & CI/CD:** ${RESUME_DATA.skills.devOpsAndAutomation.join(', ')}
- **Databases & Monitoring:** ${RESUME_DATA.skills.databasesAndMonitoring.join(', ')}

## Experience Highlights
${EXPERIENCES.map(e => `### ${e.role} - ${e.company} (${e.period})
${e.description}
Key Highlights:
${e.highlights.map(h => `- ${h}`).join('\n')}
Tech: ${e.techStack.join(', ')}
`).join('\n')}

## Certifications
${RESUME_DATA.certifications.map(c => `- ${c}`).join('\n')}

## Education
${RESUME_DATA.education.map(ed => `- ${ed.degree} (${ed.period})`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    const text = getMarkdownResume();
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopySuccess('Full Resume Markdown copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Resume & Verified Qualifications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Instant access to complete technical qualifications, verified certifications, production track record, and educational credentials.
            </p>
          </div>

          {/* Prominent High-Visibility Download Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="resume-section-primary-download-btn"
              type="button"
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all cursor-pointer text-sm sm:text-base"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>Download Resume (PDF)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors text-sm cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print CV</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 overflow-x-auto text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Interactive Resume Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Competency Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'certifications'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications & Education</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('markdown')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'markdown'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Markdown / Raw Code</span>
          </button>
        </div>

        {/* Tab 1: Interactive Resume Sheet Preview */}
        {activeTab === 'preview' && (
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm text-left font-sans">
            
            {/* CV Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar size="lg" showStatus={false} />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {RESUME_DATA.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-base">
                    {RESUME_DATA.role}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono space-y-1">
                <div>Email: <span className="text-slate-800 dark:text-slate-200">{RESUME_DATA.email}</span></div>
                <div>GitHub: <span className="text-slate-800 dark:text-slate-200">github.com/shamim4s</span></div>
                <div>Location: <span className="text-slate-800 dark:text-slate-200">{RESUME_DATA.location}</span></div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Executive Profile Summary
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {RESUME_DATA.summary}
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Core Competencies & Toolsets
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Linux & Operating Systems:</span>
                  <span className="text-slate-600 dark:text-slate-300">{RESUME_DATA.skills.operatingSystems.join(', ')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Cloud & Hypervisors:</span>
                  <span className="text-slate-600 dark:text-slate-300">{RESUME_DATA.skills.cloudAndVirtualization.join(', ')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Containers & Web Engines:</span>
                  <span className="text-slate-600 dark:text-slate-300">{RESUME_DATA.skills.containersAndWebServers.join(', ')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Security & Firewalls:</span>
                  <span className="text-slate-600 dark:text-slate-300">{RESUME_DATA.skills.securityAndNetworking.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Experience List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Selected Professional Engagements
              </h4>
              <div className="space-y-6">
                {EXPERIENCES.map(exp => (
                  <div key={exp.id} className="border-l-2 border-emerald-500/50 pl-4 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between text-sm">
                      <span className="font-bold text-slate-900 dark:text-white">{exp.role}</span>
                      <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{exp.company} • {exp.location}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Skills Matrix */}
        {activeTab === 'skills' && (
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Categorized Technical Competencies
            </h3>

            <div className="space-y-6">
              {Object.entries(RESUME_DATA.skills).map(([categoryName, skillList]) => (
                <div key={categoryName} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-3 capitalize">
                    {categoryName.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Certifications & Education */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Certifications Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Certifications & Accreditations
                  </h3>
                  <span className="text-xs text-slate-500">Verified Technical Training</span>
                </div>
              </div>

              <div className="space-y-3">
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Academic Background
                  </h3>
                  <span className="text-xs text-slate-500">Computer Science & Engineering</span>
                </div>
              </div>

              <div className="space-y-3">
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{edu.institution}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Markdown Copy */}
        {activeTab === 'markdown' && (
          <div className="rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 p-6 text-left font-mono">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-xs text-slate-400">resume.md (Raw Markdown for ATS & Portals)</span>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-96 leading-relaxed">
              {getMarkdownResume()}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};
