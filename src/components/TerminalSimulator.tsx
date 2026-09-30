import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalSimulator: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'neofetch',
      output: (
        <div className="text-xs sm:text-sm font-mono space-y-1">
          <div className="text-emerald-400 font-bold mb-2">shamim4s@infra-node01</div>
          <div className="text-slate-400">----------------------</div>
          <div><span className="text-teal-400 font-semibold">OS:</span> Ubuntu 24.04.1 LTS x86_64 / Proxmox PVE</div>
          <div><span className="text-teal-400 font-semibold">Host:</span> Dell PowerEdge / AWS Cloud Instance</div>
          <div><span className="text-teal-400 font-semibold">Kernel:</span> 6.8.0-45-generic (Hardened)</div>
          <div><span className="text-teal-400 font-semibold">Role:</span> Linux Infrastructure Engineer & IT Consultant</div>
          <div><span className="text-teal-400 font-semibold">Uptime:</span> 1,280 days, 14 hours (99.99% SLA)</div>
          <div><span className="text-teal-400 font-semibold">Packages:</span> 1,420 (dpkg), 18 (docker), 4 (snap)</div>
          <div><span className="text-teal-400 font-semibold">Shell:</span> bash 5.2.21</div>
          <div><span className="text-teal-400 font-semibold">Memory:</span> 4,120MiB / 32,768MiB (ZFS ARC Active)</div>
          <div className="pt-2 text-emerald-300">💡 Type <code className="bg-emerald-950 px-1 py-0.5 rounded text-emerald-200">help</code> for available commands.</div>
        </div>
      )
    }
  ]);
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent scrolling on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only scroll the terminal's internal container, NEVER the window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response: React.ReactNode = null;

    switch (lower) {
      case 'help':
        response = (
          <div className="text-xs sm:text-sm font-mono space-y-1 text-slate-300">
            <div className="text-emerald-400 font-semibold">Available Shell Commands:</div>
            <div><span className="text-teal-300 font-bold">whoami</span> - Display author profile and core role</div>
            <div><span className="text-teal-300 font-bold">neofetch</span> - Show Linux environment & system telemetry</div>
            <div><span className="text-teal-300 font-bold">skills</span> - Display categorized engineering stack</div>
            <div><span className="text-teal-300 font-bold">docker ps</span> - List active containerized services</div>
            <div><span className="text-teal-300 font-bold">ls projects</span> - Browse technical repositories</div>
            <div><span className="text-teal-300 font-bold">uptime</span> - Check server uptime and load averages</div>
            <div><span className="text-teal-300 font-bold">contact</span> - Show direct contact & social media channels</div>
            <div><span className="text-teal-300 font-bold">clear</span> - Clear current terminal screen</div>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="text-xs sm:text-sm font-mono space-y-1.5 text-slate-300">
            <div className="text-emerald-400 font-bold text-base">{PERSONAL_INFO.name} ({PERSONAL_INFO.handle})</div>
            <div className="text-teal-300 font-medium">{PERSONAL_INFO.title}</div>
            <p className="text-slate-400 text-xs leading-relaxed">{PERSONAL_INFO.bio}</p>
            <div className="text-xs text-amber-300/90 pt-1">🟢 Status: {PERSONAL_INFO.availability}</div>
          </div>
        );
        break;

      case 'skills':
      case 'cat skills.txt':
        response = (
          <div className="text-xs sm:text-sm font-mono space-y-1.5 text-slate-300">
            <div><span className="text-emerald-400 font-bold">[OS & Kernel]:</span> Ubuntu, Debian, RHEL, Rocky, AlmaLinux, Alpine, Bash</div>
            <div><span className="text-emerald-400 font-bold">[Cloud & Hypervisor]:</span> AWS, GCP, Proxmox VE, KVM, Cloudflare</div>
            <div><span className="text-emerald-400 font-bold">[Containers & Web]:</span> Docker, Docker Compose, NGINX, Apache, HestiaCP, Redis</div>
            <div><span className="text-emerald-400 font-bold">[Security & Networks]:</span> UFW, Iptables, Fail2ban, SSH 2FA, Let’s Encrypt, WireGuard</div>
            <div><span className="text-emerald-400 font-bold">[DevOps & CI/CD]:</span> GitHub Actions, Jenkins, Terraform, MySQL, PostgreSQL</div>
          </div>
        );
        break;

      case 'docker ps':
        response = (
          <div className="text-xs font-mono overflow-x-auto text-slate-300 whitespace-pre">
            <div className="text-slate-500 font-bold">CONTAINER ID   IMAGE                 COMMAND                  STATUS          PORTS</div>
            <div><span className="text-emerald-400">c8f921e4a101</span>   nginx:alpine-slim     "nginx -g 'daemon..."    Up 8 weeks      0.0.0.0:80,443-&gt;80,443</div>
            <div><span className="text-emerald-400">b12e84d720a4</span>   php:8.3-fpm-alpine    "docker-php-entry..."    Up 8 weeks      9000/tcp</div>
            <div><span className="text-emerald-400">e901a45bb318</span>   mysql:8.0-oracle      "docker-entrypoin..."    Up 8 weeks      3306/tcp (internal)</div>
            <div><span className="text-emerald-400">a4f7831cc882</span>   redis:7-alpine        "docker-entrypoin..."    Up 8 weeks      6379/tcp (internal)</div>
            <div><span className="text-emerald-400">d3301ff98210</span>   fail2ban:latest       "/entrypoint.sh"         Up 8 weeks      host-network</div>
          </div>
        );
        break;

      case 'ls projects':
      case 'ls':
        response = (
          <div className="text-xs sm:text-sm font-mono grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-emerald-400 font-semibold">📁 {p.slug}/</div>
                <div className="text-slate-400 text-xs truncate">{p.title}</div>
                <div className="text-[11px] text-teal-400/80">{p.tags.slice(0, 3).join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'uptime':
        response = (
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            <span> 13:08:24 up 420 days,  4:12,  2 users,  load average: 0.12, 0.08, 0.05</span>
          </div>
        );
        break;

      case 'contact':
      case 'cat contact.json':
        response = (
          <div className="text-xs sm:text-sm font-mono space-y-1 text-slate-300">
            <div><span className="text-teal-300 font-bold">Email:</span> <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.email}</a></div>
            <div><span className="text-teal-300 font-bold">GitHub:</span> <a href="https://github.com/shamim4s" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">https://github.com/shamim4s</a></div>
            <div><span className="text-teal-300 font-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/shamim4s4/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">linkedin.com/in/shamim4s4</a></div>
            <div><span className="text-teal-300 font-bold">Facebook:</span> <a href="https://www.facebook.com/shamim4s" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">facebook.com/shamim4s</a></div>
            <div><span className="text-teal-300 font-bold">Upwork:</span> <a href="https://www.upwork.com/freelancers/~0126a9e3ea476741d8" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">upwork.com/freelancers/~0126a9e3ea476741d8</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
      case 'sudo su':
      case 'sudo rm -rf /':
        response = (
          <div className="text-xs sm:text-sm font-mono text-rose-400">
            [SECURITY ALERT] Nice try! User 'visitor' is not in sudoers file. This incident has been logged to /var/log/auth.log with Fail2ban tracking.
          </div>
        );
        break;

      default:
        response = (
          <div className="text-xs sm:text-sm font-mono text-rose-400">
            bash: {cmd}: command not found. Try typing <span className="text-emerald-300 underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> for list of commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  const handleQuickCommand = (cmd: string) => {
    setInputVal(cmd);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden font-mono text-left">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
          <span className="ml-2 text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            shamim4s@infra-node01:~ (bash)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHistory([])}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-xs flex items-center gap-1"
            title="Clear terminal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={terminalBodyRef} className="p-4 sm:p-5 max-h-[380px] overflow-y-auto space-y-4 text-slate-200">
        {history.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <span className="text-emerald-400">shamim4s@infra:~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-2 border-l-2 border-slate-800/60">{item.output}</div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-semibold text-xs sm:text-sm shrink-0">
            shamim4s@infra:~$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="type 'help', 'neofetch', 'whoami', 'skills'..."
            className="flex-1 bg-transparent border-none text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-600 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* Interactive Quick Chip Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold shrink-0">Quick run:</span>
        {['neofetch', 'whoami', 'skills', 'docker ps', 'ls projects', 'uptime', 'contact'].map(cmd => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleQuickCommand(cmd)}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-emerald-950/70 text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/50 transition-colors whitespace-nowrap cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
