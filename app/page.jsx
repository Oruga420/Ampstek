'use client';

import PdfButton from './components/PdfButton';
import WebGLRibbon from './components/WebGLRibbon';

const resumeData = {
  name: 'Alejandro De La Mora',
  role: 'Generative AI Solution Architect',
  contact: [
    { label: 'Phone', value: '+1 437 243 3693', href: 'tel:+14372433693' },
    { label: 'Email', value: 'alex@seshwithfriends.org', href: 'mailto:alex@seshwithfriends.org' },
    { label: 'LinkedIn', value: 'linkedin.com/in/amorac', href: 'https://www.linkedin.com/in/amorac' },
    { label: 'Website', value: 'eloruga.com', href: 'http://www.eloruga.com' },
    { label: 'GitHub', value: 'github.com/Oruga420', href: 'https://github.com/Oruga420' },
  ],
  summary:
    'Generative AI Solution Architect with deep expertise in Google Cloud Platform (GCP), AWS, and Vercel, specializing in RAG pipelines and Agentic workflows. Proven track record of architecting over 120 GenAI applications and 90 chatbots, driving over $1M in company savings and reducing manual labor by 20,000+ hours. Expert in bridging Salesforce and LLM architectures to deliver scalable, secure production systems.',
  expertise: [
    'Generative AI Architecture',
    'RAG Pipelines',
    'Agentic Workflows',
    'LLM Gateway',
    'Multi-Agent Systems',
    'Google Cloud Platform (GCP)',
    'AWS',
    'Vercel',
    'Next.js',
    'Salesforce (Certified Admin/AI Associate)',
    'Zapier',
    'Model Context Protocol (MCP)',
    'English (Native/Bilingual)',
    'Spanish (Full Professional)',
  ],
  experience: [
    {
      role: 'AI Solutions Architect',
      company: 'Assent',
      dates: 'February 2025 - Present',
      bullets: [
        'Architected secure GenAI stack using OpenAI, Anthropic, and Gemini models with live RAG and agentic workflows, creating a scalable foundation for compliance data processing.',
        'Saved the company over 20,000 man-hours in one year by deploying internal tools and automations that replaced repetitive operational tasks.',
        'Drove internal AI adoption from 47% to 97% through the implementation of accessible, high-impact tools and custom MCP servers exposing data safely.',
        'Designed and implemented governance, documentation, and security standards to ensure auditable, safe AI usage across the organization.',
      ],
    },
    {
      role: 'AI Solutions Architect',
      company: 'Sesh | Ai Solutions',
      dates: 'November 2021 - Present',
      bullets: [
        'Designed the architecture for over 120 GenAI applications and 90 chatbots across 30 different clients, all currently in production stages.',
        'Achieved over $1 million in savings for clients by implementing Agentic Workflows and GenAI automations that increased proficiency and productivity, allowing teams to do more with less.',
        'Lead a community of 100+ members, delivering tutorials, webinars, and open office hours to teach AI adoption and workflow practices. Featured speaker for Latinas in Tech and Somos Latinos in Tech Ottawa.',
        'Built AI-ready websites and marketing landing pages wired into chatbots and automation backends using Next.js and Vercel.',
      ],
    },
    {
      role: 'Salesforce Consultant',
      company: 'Online Business Systems',
      dates: 'June 2024 - November 2024',
      bullets: [
        'Led the configuration of AI assistants and Copilot-style experiences, defining use cases and wiring data access securely for sales and service teams.',
        'Aligned AI agents with existing workflows to ensure seamless adoption instead of friction, developing reusable patterns for prompt engineering and action configuration.',
      ],
    },
    {
      role: 'Salesforce Manager',
      company: 'Globalization Partners',
      dates: 'November 2018 - November 2023',
      bullets: [
        'Managed a large Salesforce org with 1,000+ licenses, critical integrations, and business capabilities across sales and operations.',
        "Spearheaded early GenAI initiatives, developing 'GIA' (internal chatbot) and GenAI-powered workflows for Jira ticket handling using LLMs to support 'vibe coding' patterns while maintaining governance.",
      ],
    },
  ],
  education: [
    {
      program: 'Ingenieria en Sistemas',
      school: 'Universidad Marista de MAcrida',
      years: '2004 - 2007',
    },
  ],
  certifications: ['Salesforce Certified AI Associate', 'Salesforce Certified Administrator (SCA)'],
};

const SectionTitle = ({ children }) => <h2 className="section-title">{children}</h2>;

const Pill = ({ text }) => <span className="pill">{text}</span>;

const ExperienceCard = ({ entry }) => (
  <article className="card">
    <div className="card-header">
      <div>
        <p className="card-title">{entry.role}</p>
        <p className="card-subtitle">{entry.company}</p>
      </div>
      <p className="card-dates">{entry.dates}</p>
    </div>
    <ul className="bullet-list">
      {entry.bullets.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </article>
);

export default function Page() {
  return (
    <div className="page-shell">
      <div className="floating-action">
        <PdfButton targetId="resume-root" />
      </div>
      <div className="hero">
        <WebGLRibbon />
        <div className="hero-content" id="resume-root">
          <header className="header">
            <div className="intro">
              <p className="eyebrow">Role</p>
              <h1>{resumeData.name}</h1>
              <p className="role">{resumeData.role}</p>
              <p className="summary">{resumeData.summary}</p>
            </div>
            <div className="contact-card">
              <p className="eyebrow">Contact</p>
              <ul>
                {resumeData.contact.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <a href={item.href} rel="noreferrer" target="_blank">
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <section>
            <SectionTitle>Areas of Expertise</SectionTitle>
            <div className="pill-grid">
              {resumeData.expertise.map((item) => (
                <Pill key={item} text={item} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Work Experience</SectionTitle>
            <div className="stack">
              {resumeData.experience.map((entry) => (
                <ExperienceCard key={`${entry.company}-${entry.role}`} entry={entry} />
              ))}
            </div>
          </section>

          <section className="dual">
            <div>
              <SectionTitle>Education</SectionTitle>
              <div className="stack">
                {resumeData.education.map((item) => (
                  <article className="card" key={item.program}>
                    <p className="card-title">{item.program}</p>
                    <p className="card-subtitle">{item.school}</p>
                    <p className="card-dates">{item.years}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle>Certifications</SectionTitle>
              <div className="stack">
                <article className="card" key="certifications">
                  <ul className="bullet-list">
                    {resumeData.certifications.map((cert) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
