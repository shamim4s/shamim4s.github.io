import confetti from 'canvas-confetti';
import { RESUME_DATA, EXPERIENCES } from '../data/portfolioData';

export const triggerResumeDownload = () => {
  // Fire celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#14b8a6', '#06b6d4', '#3b82f6']
    });
  } catch (e) {
    // ignore
  }

  // Create a clean printable window or trigger print
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // Fallback: direct window print
    window.print();
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume - ${RESUME_DATA.name} - ${RESUME_DATA.role}</title>
  <style>
    @page { margin: 15mm; size: A4; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #059669;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    h1 {
      margin: 0 0 4px 0;
      color: #0f172a;
      font-size: 22pt;
    }
    .role {
      font-size: 13pt;
      font-weight: 600;
      color: #059669;
      margin: 0 0 6px 0;
    }
    .contact-info {
      font-size: 9.5pt;
      color: #475569;
    }
    h2 {
      font-size: 12pt;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin: 14px 0 8px 0;
    }
    p { margin: 0 0 8px 0; }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
      font-size: 9.5pt;
    }
    .skills-grid strong { color: #0f172a; }
    .exp-item { margin-bottom: 12px; }
    .exp-head {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 10.5pt;
    }
    .exp-company {
      font-size: 9.5pt;
      color: #059669;
      margin-bottom: 3px;
    }
    ul { margin: 4px 0 6px 18px; padding: 0; }
    li { margin-bottom: 3px; font-size: 9.5pt; color: #334155; }
    .footer-note {
      margin-top: 20px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      font-size: 8.5pt;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${RESUME_DATA.name}</h1>
    <div class="role">${RESUME_DATA.role}</div>
    <div class="contact-info">
      Email: ${RESUME_DATA.email} | GitHub: github.com/shamim4s | Location: ${RESUME_DATA.location} | Website: shamim4s.github.io
    </div>
  </div>

  <h2>Executive Summary</h2>
  <p>${RESUME_DATA.summary}</p>

  <h2>Technical Competencies</h2>
  <div class="skills-grid">
    <div><strong>Operating Systems:</strong> ${RESUME_DATA.skills.operatingSystems.join(', ')}</div>
    <div><strong>Cloud & Virtualization:</strong> ${RESUME_DATA.skills.cloudAndVirtualization.join(', ')}</div>
    <div><strong>Containers & Web:</strong> ${RESUME_DATA.skills.containersAndWebServers.join(', ')}</div>
    <div><strong>Security & Firewalls:</strong> ${RESUME_DATA.skills.securityAndNetworking.join(', ')}</div>
    <div><strong>DevOps & CI/CD:</strong> ${RESUME_DATA.skills.devOpsAndAutomation.join(', ')}</div>
    <div><strong>Databases & Caching:</strong> ${RESUME_DATA.skills.databasesAndMonitoring.join(', ')}</div>
  </div>

  <h2>Professional Experience</h2>
  ${EXPERIENCES.map(e => `
    <div class="exp-item">
      <div class="exp-head">
        <span>${e.role}</span>
        <span>${e.period}</span>
      </div>
      <div class="exp-company">${e.company} • ${e.location}</div>
      <p style="font-size: 9.5pt; margin-bottom: 4px;">${e.description}</p>
      <ul>
        ${e.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <h2>Certifications & Education</h2>
  <ul>
    ${RESUME_DATA.certifications.map(c => `<li><strong>${c}</strong></li>`).join('')}
    ${RESUME_DATA.education.map(edu => `<li><strong>${edu.degree}</strong> - ${edu.institution} (${edu.period})</li>`).join('')}
  </ul>

  <div class="footer-note">
    Verified Portfolio Profile: shamim4s.github.io • Generated for ${RESUME_DATA.name}
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    }
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
