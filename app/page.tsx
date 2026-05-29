'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value.trim(),
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {

    const nav = document.getElementById('nav');
    let lastY = 0;

    const sectionIds = ['about', 'stack', 'projects', 'experience', 'services', 'contact'];

    const setActive = () => {
      let current = '';
      sectionIds.forEach((id) => {
        const s = document.getElementById(id);
        if (!s) return;
        const r = s.getBoundingClientRect();
        if (r.top < 220 && r.bottom > 220) current = id;
      });
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((l) => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };

    const handleScroll = () => {
      const y = window.scrollY;
      if (nav) {
        nav.classList.toggle('shrunk', y > 60);
        if (y > lastY && y > 320) nav.classList.add('hidden');
        else nav.classList.remove('hidden');
      }
      lastY = y;
      setActive();
    };

    window.addEventListener('scroll', handleScroll);
    setActive();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const valEl = e.target.querySelector<HTMLElement>('.stat-value span');
          const statDiv = e.target.querySelector<HTMLElement>('.stat-value');
          if (!valEl || !statDiv) return;
          const target = parseInt(statDiv.dataset.count || '0', 10);
          const dur = 1400;
          let startTime: number | null = null;
          const step = (t: number) => {
            if (!startTime) startTime = t;
            const p = Math.min(1, (t - startTime) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            valEl.textContent = String(Math.floor(target * eased));
            if (p < 1) requestAnimationFrame(step);
            else valEl.textContent = String(target);
          };
          requestAnimationFrame(step);
          statIo.unobserve(e.target);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('.stat').forEach((s) => statIo.observe(s));

    const handleMouseMove = (e: MouseEvent) => {
      const orbs = document.querySelectorAll<HTMLElement>('.orb');
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      orbs.forEach((o, i) => {
        const f = (i + 1) * 12;
        o.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      io.disconnect();
      statIo.disconnect();
    };
  }, []);

  const timelineItems = [
    {
      cat: 'edu',
      current: true,
      period: '2025 — Présent',
      badge: 'En cours',
      title: 'Troisième Année de Licence en Génie Logiciel et Base de Données',
      org: "École Nationale d'Informatique (ENI) · Fianarantsoa",
      desc: "Troisième année de licence en cours. Approfondissement en génie logiciel, bases de données, développement web et mobile, et architectures applicatives.",
      stack: [] as string[],
    },
    {
      cat: 'work',
      period: 'Stage · 2025',
      title: "Conception et Mise en Œuvre d'une application commerciale",
      org: 'Agrohelp Consulting · Antananarivo',
      desc: "Premier stage en entreprise : analyse des besoins, modélisation de la base de données, développement de l'interface client et de la logique métier d'une application de gestion commerciale.",
      stack: ['PHP', 'React JS', 'PostgreSQL'],
    },
    {
      cat: 'cert',
      period: '16 juin — 04 juillet 2025',
      title: 'Data Analyst avec Excel',
      org: 'IDEA Academy',
      desc: "Formation à l'analyse de données : tableaux croisés dynamiques, fonctions avancées, visualisations et reporting professionnel.",
      stack: [] as string[],
    },
    {
      cat: 'edu',
      period: '2024 — 2025',
      title: 'Deuxième année de Licence en Génie Logiciel et Base de Données',
      org: "École Nationale d'Informatique (ENI)",
      desc: "Deuxième année réussie. Algorithmique avancée, programmation orientée objet, systèmes d'exploitation, réseaux.",
      stack: [] as string[],
    },
    {
      cat: 'cert',
      period: '26 — 29 novembre 2024',
      title: 'Formation Java',
      org: 'Orange Digital Center (ODC) · Fianarantsoa',
      desc: "Programme intensif sur la programmation Java : POO, collections, gestion des exceptions, bases du développement multi-thread.",
      stack: [] as string[],
    },
    {
      cat: 'edu',
      period: '2023 — 2024',
      title: 'Première Année de Licence en Génie Logiciel et Base de Données',
      org: "École Nationale d'Informatique (ENI)",
      desc: "Première année réussie. Bases de l'informatique : mathématiques pour l'info, programmation impérative, logique, architecture des ordinateurs.",
      stack: [] as string[],
    },
    {
      cat: 'edu',
      period: '2023',
      title: 'Baccalauréat Série C',
      org: "Lycée d'enseignement général",
      desc: 'Baccalauréat scientifique Série C, filière Mathématiques et Sciences Physiques.',
      stack: [] as string[],
    },
  ];

  const filteredItems =
    activeTab === 'all' ? timelineItems : timelineItems.filter((item) => item.cat === activeTab);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.tl-item.reveal:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  const tabLabels: Record<string, string> = {
    all: 'Tout',
    work: 'Stage',
    edu: 'Études',
    cert: 'Certifications',
  };

  return (
    <>
      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="nav" id="nav">
        <a href="#hero" className="brand">
          <div className="brand-mark">E</div>
          <div>
            Élyse R.
            <small>Dev · Web &amp; Mobile</small>
          </div>
        </a>
        <div className="nav-links">
          <a href="#about">À propos</a>
          <a href="#stack">Stack</a>
          <a href="#projects">Projets</a>
          <a href="#experience">Parcours</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary nav-cta">
            <span>Me contacter</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="hbar"></span>
            <span className="hbar"></span>
            <span className="hbar"></span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ───────────────────────────────────── */}
      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu">
            {[
              ['#about',      'À propos'],
              ['#stack',      'Stack'],
              ['#projects',   'Projets'],
              ['#experience', 'Parcours'],
              ['#services',   'Services'],
              ['#contact',    'Contact'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                <span>{label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
            <div className="mobile-menu-sep" />
            <a href="#contact" className="btn btn-primary mobile-menu-cta" onClick={() => setMenuOpen(false)}>
              <span>Me contacter</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </>
      )}

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              <span>Étudiant à l&apos;ENI · Fianarantsoa</span>
            </div>

            <h1>
              <span className="word">RAZAFINDRAVONJY</span>
              <br />
              <span className="word">Solofonirina</span>{' '}
              <span className="word gradient-text" style={{ padding: '0 0 6px' }}>
                Elysé
              </span>
            </h1>

            <div className="hero-role">Développeur Web &amp; Mobile · Junior</div>

            <div className="hero-slogan">« Créer des interfaces qui ont du sens. »</div>

            <p className="hero-subtext">
              Étudiant en troisième année à l&apos;École Nationale d&apos;Informatique. J&apos;apprends,
              je code, je construis — du web au mobile, avec passion et rigueur.
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary btn-lg">
                <span>Voir mes projets</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-ghost btn-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Me contacter</span>
              </a>
            </div>

             
          </div>

          <div className="hero-visual">
            <div className="avatar-stage">
              <div className="avatar-frame">
                <div className="avatar-photo">
                  <Image
                    src="/IMG_8870.png"
                    alt="RAZAFINDRAVONJY Solofonirina Élyse — Développeur Web &amp; Mobile"
                    width={480}
                    height={540}
                    priority
                    sizes="(max-width: 480px) 240px, (max-width: 640px) 280px, (max-width: 980px) 360px, 480px"
                    quality={90}
                  />
                </div>
              </div>

              <div className="floating-card float-1">
                <div className="ic">{'{}'}</div>
                <div>
                  TypeScript
                  <br />
                  <small>Strict mode</small>
                </div>
              </div>
              <div className="floating-card float-2">
                <div className="ic" style={{ background: 'linear-gradient(135deg,#3FA4D8,#5BBCE8)' }}>
                  ✦
                </div>
                <div>
                  React · Next 14
                  <br />
                  <small>App router</small>
                </div>
              </div>
              <div className="floating-card float-3">
                <div className="ic" style={{ background: 'linear-gradient(135deg,#87D0F2,#3FA4D8)' }}>
                  ▲
                </div>
                <div>
                  Deploy · Vercel
                  <br />
                  <small>Edge runtime</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="line"></div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">À propos · 01</div>
            <h2 className="section-title">
              Un artisan du <em>numérique</em>,<br />
              obsédé par le détail.
            </h2>
            <p className="section-sub">
              Je conçois et développe des expériences digitales modernes, où l&apos;esthétique
              rencontre la performance. Mon métier : transformer une vision en produit réel —
              soigné, rapide, mémorable.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-copy reveal" data-delay="1">
              <p>
                Je suis un <strong>développeur junior</strong> en pleine ascension, étudiant en
                troisième année à l&apos;<strong>École Nationale d&apos;Informatique</strong>. Le code est
                devenu mon terrain d&apos;expression — du web au mobile, du wireframe au livrable.
              </p>
              <p>
                J&apos;aime apprendre vite, soigner les détails, et construire des interfaces qui ont du
                sens. Je crois aux <strong>fondations solides</strong>, à l&apos;
                <strong>esprit d&apos;équipe</strong>, et au <strong>plaisir d&apos;itérer</strong> jusqu&apos;à
                ce que ce soit juste.
              </p>
              <p>
                Quand je n&apos;écris pas du code, j&apos;explore Figma, je lis sur l&apos;UX, et je teste les
                nouvelles technologies — toujours en quête de la prochaine compétence à dompter.
              </p>
            </div>

            <div className="about-pillars">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                  ),
                  title: 'Code propre',
                  text: 'TypeScript strict, tests intégrés, architecture pensée pour durer.',
                  delay: '1',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  ),
                  title: 'UX/UI affûté',
                  text: "Interfaces qui ne se contentent pas d'être belles — elles fonctionnent.",
                  delay: '2',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  ),
                  title: 'Mobile-first',
                  text: "Web responsive, apps natives, PWA — l'expérience suit l'utilisateur.",
                  delay: '3',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: 'Performance',
                  text: 'Core Web Vitals au vert. Le rapide gagne, partout, toujours.',
                  delay: '4',
                },
              ].map((p) => (
                <div key={p.title} className="pillar reveal" data-delay={p.delay}>
                  <div className="pillar-ic">{p.icon}</div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stats">
            {[
              { count: 3, label: "Années d'études · ENI" },
              { count: 1, label: 'Stage en entreprise' },
              { count: 2, label: 'Certifications obtenues', sup: '' },
              { count: 12, label: 'Technos travaillées', sup: '+' },
            ].map((s, i) => (
              <div key={s.label} className="stat reveal" data-delay={String(i + 1)}>
                <div className="stat-value" data-count={s.count}>
                  <span>0</span>
                  <sup>{s.sup ?? ''}</sup>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ─────────────────────────────────────────── */}
      <section id="stack">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Stack technique · 02</div>
            <h2 className="section-title">
              Les outils. <em>Utilisés.</em>
            </h2>
            <p className="section-sub">
              Une boîte à outils précise et à jour. Choisie pour la lisibilité, la rapidité
              d&apos;itération, et la fiabilité en production.
            </p>
          </div>

          <div className="stack-groups">
            {/* Frontend */}
            <div className="stack-group reveal">
              <div className="stack-group-head">
                <h4>Frontend</h4>
                <span>05</span>
              </div>
              <div className="stack-items">
                <div className="stack-item">
                  <div className="logo" style={{ background: 'linear-gradient(135deg,#61DAFB22,#5BBCE822)' }}>
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <circle cx="12" cy="12" r="2" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#5BBCE8" strokeWidth="1" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#5BBCE8" strokeWidth="1" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#5BBCE8" strokeWidth="1" transform="rotate(120 12 12)" />
                    </svg>
                  </div>
                  <div><span>React</span><small>v18.3</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#1D6FA4">
                      <path d="M11.572 0c-.176 0-.31.001-.46.018L10.5.107a12 12 0 0 0-10.4 10.4l-.014.146C.001 11.082 0 11.343 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12C24 5.372 18.628 0 12 0c-.176 0-.252-.001-.428.018zM7.5 8h2.5l4 6.5V8h2v8h-2.5l-4-6.5V16H7.5V8z" />
                    </svg>
                  </div>
                  <div><span>Next.js</span><small>App router</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo" style={{ background: 'linear-gradient(135deg,#3178C622,#5BBCE822)' }}>
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M3 3h18v18H3V3zm10.7 12.6c.4-.4.6-1 .6-1.7 0-.7-.2-1.2-.6-1.6-.4-.4-1-.6-1.7-.6H10v6h1.3v-2h.7c.7 0 1.3-.2 1.7-.6zM8 10v1h2v5h1V11h2v-1H8z" />
                    </svg>
                  </div>
                  <div><span>TypeScript</span><small>5.x · strict</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#3FA4D8">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                    </svg>
                  </div>
                  <div><span>Tailwind CSS</span><small>v4 · utility</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5BBCE8" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" /><path d="M21 12a9 9 0 0 1-15 6.7M3 12a9 9 0 0 1 15-6.7" />
                    </svg>
                  </div>
                  <div><span>Framer Motion</span><small>Animations</small></div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="stack-group reveal" data-delay="1">
              <div className="stack-group-head">
                <h4>Backend</h4>
                <span>05</span>
              </div>
              <div className="stack-items">
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.5.28-.78.82-.78 1.39v8.52c0 .57.29 1.11.78 1.39l2.05 1.18c.99.49 1.34.49 1.79.49 1.46 0 2.31-.88 2.31-2.42V8.47c0-.12-.1-.22-.22-.22h-.99c-.13 0-.23.1-.23.22v8.44c0 .68-.71 1.36-1.86.78L4.5 16.46c-.06-.03-.1-.1-.1-.18V7.74c0-.07.04-.14.1-.18l7.44-4.3c.06-.03.14-.03.2 0l7.44 4.3c.06.03.1.1.1.18v8.54c0 .07-.04.14-.1.18l-7.44 4.3c-.06.03-.14.03-.2 0L9.96 19.6c-.06-.03-.13-.04-.2-.01-.51.29-.61.34-1.09.5-.12.04-.29.11.06.3l2.49 1.47c.24.14.51.21.79.21s.55-.07.79-.21l7.44-4.29c.5-.29.78-.82.78-1.39V7.74c0-.57-.29-1.11-.78-1.39L12.78 2.05c-.23-.13-.51-.2-.78-.2z" />
                    </svg>
                  </div>
                  <div><span>Node.js</span><small>v20 LTS</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#2A8BC4">
                      <path d="M11.572 0c-.176 0-.31.001-.46.018L10.5.107a12 12 0 0 0-10.4 10.4l-.014.146C.001 11.082 0 11.343 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12C24 5.372 18.628 0 12 0c-.176 0-.252-.001-.428.018zM8 8h1l2 3 2-3h1l-2.5 4 2.5 4h-1l-2-3-2 3H8l2.5-4L8 8z" />
                    </svg>
                  </div>
                  <div><span>Express.js</span><small>API REST</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#3FA4D8">
                      <path d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39 0 .73-.07 1.07-.06.32-.17.65-.36.93-.4.6-1.13.93-1.93.93H8.86A2.86 2.86 0 0 1 6 17.07v-3.78A2.86 2.86 0 0 1 8.86 10.43h5.71V9.71H6.43V8.93a2.86 2.86 0 0 1 2.86-2.85H10.5c.4 0 .73 0 1.07.07.32.06.65.17.93.36.6.4.93 1.13.93 1.93v1.07h5.71zm-.95-3.36a.71.71 0 1 0-1.43 0 .71.71 0 0 0 1.43 0zM9.5 14.93a.71.71 0 1 0 0-1.43.71.71 0 0 0 0 1.43z" />
                    </svg>
                  </div>
                  <div><span>PHP</span><small>Laravel · Symfony</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                    </svg>
                  </div>
                  <div><span>Python</span><small>Django · Scripts</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#2A8BC4">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.749-.891 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.54 1.644-2.469 6.197-3.665 5.19-7.626M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
                    </svg>
                  </div>
                  <div><span>Java</span><small>POO · Spring</small></div>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="stack-group reveal" data-delay="2">
              <div className="stack-group-head">
                <h4>Mobile</h4>
                <span>02</span>
              </div>
              <div className="stack-items">
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46z" />
                    </svg>
                  </div>
                  <div><span>Flutter</span><small>Cross-platform</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#3FA4D8">
                      <circle cx="12" cy="12" r="3" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#3FA4D8" strokeWidth="1" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#3FA4D8" strokeWidth="1" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#3FA4D8" strokeWidth="1" transform="rotate(120 12 12)" />
                    </svg>
                  </div>
                  <div><span>React Native</span><small>Expo SDK</small></div>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="stack-group reveal" data-delay="3">
              <div className="stack-group-head">
                <h4>Database</h4>
                <span>03</span>
              </div>
              <div className="stack-items">
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3FA4D8" strokeWidth="1.5">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 10c0 1.7 4 3 9 3s9-1.3 9-3M3 15c0 1.7 4 3 9 3s9-1.3 9-3" />
                    </svg>
                  </div>
                  <div><span>PostgreSQL</span><small>Relationnel · SQL</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M12 2C7 2 3 4 3 6.5v11C3 20 7 22 12 22s9-2 9-4.5v-11C21 4 17 2 12 2zm0 2c4.4 0 7 1.4 7 2s-2.6 2-7 2-7-1.4-7-2 2.6-2 7-2zm0 16c-4.4 0-7-1.4-7-2v-2.7c1.6.9 4 1.4 7 1.4s5.4-.5 7-1.4V18c0 .6-2.6 2-7 2zm0-4c-4.4 0-7-1.4-7-2v-2.7c1.6.9 4 1.4 7 1.4s5.4-.5 7-1.4V14c0 .6-2.6 2-7 2z" />
                    </svg>
                  </div>
                  <div><span>MySQL</span><small>Relationnel · SQL</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#2A8BC4">
                      <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                    </svg>
                  </div>
                  <div><span>SQLite</span><small>Local · Embedded</small></div>
                </div>
              </div>
            </div>

            {/* Outils */}
            <div className="stack-group reveal" data-delay="4">
              <div className="stack-group-head">
                <h4>Outils</h4>
                <span>05</span>
              </div>
              <div className="stack-items">
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#1D6FA4">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div><span>GitHub</span><small>Actions · PRs</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#5BBCE8">
                      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.185-.186V3.574a.186.186 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m0 2.716h2.119a.187.187 0 00.185-.186V6.29a.186.186 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.184-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.12a.186.186 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
                    </svg>
                  </div>
                  <div><span>Docker</span><small>Compose · Swarm</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#2A8BC4">
                      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm0 15.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.49c0 2.476-2.014 4.49-4.588 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019v-3.019H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098a4.467 4.467 0 0 1-2.397-.762 4.49 4.49 0 1 1 2.495.762z" />
                    </svg>
                  </div>
                  <div><span>Figma</span><small>Design · Tokens</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#3FA4D8">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="#3FA4D8" strokeWidth="1.5" /><path d="M9 9h6v6H9z" fill="#3FA4D8" />
                    </svg>
                  </div>
                  <div><span>VS Code</span><small>+ Vim mode</small></div>
                </div>
                <div className="stack-item">
                  <div className="logo">
                    <svg viewBox="0 0 24 24" fill="#1D6FA4">
                      <polygon points="2,7 12,2 22,7 22,17 12,22 2,17" />
                    </svg>
                  </div>
                  <div><span>Vercel · AWS</span><small>Edge · Lambda</small></div>
                </div>
              </div>
            </div>
          </div>

          <div className="marquee reveal">
            <div className="marquee-track">
              {['TypeScript','React JS','Next.js','Tailwind CSS','Flutter','PHP','Python','PostgreSQL','MySQL','Docker','Figma',
                'TypeScript','React JS','Next.js','Tailwind CSS','Flutter','PHP','Python','PostgreSQL','MySQL','Docker','Figma',
              ].map((item, i) => (
                <span key={i} className="marquee-item">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section id="projects">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Projets · 03</div>
            <h2 className="section-title">
              Mes projets. <em>Vrais &amp; concrets.</em>
            </h2>
            <p className="section-sub">
              Projets personnels, académiques et professionnels — chaque ligne de code
              représente un apprentissage, une idée concrétisée.
            </p>
          </div>

          <div className="projects-grid">

            {/* Color Arcs */}
            <article className="project feature reveal">
              <div className="project-cover">
                <span className="project-tag">Projet Perso</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://github.com/ElyseRaz/ColorArc" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon /></a>
                  <a className="icon-btn" href="https://color-arc.vercel.app" target="_blank" rel="noopener noreferrer" title="Live demo"><ExternalIcon /></a>
                </div>
                <div className="preview pv pv-colors">
                  <div className="pv-arc pv-arc-1"></div>
                  <div className="pv-arc pv-arc-2"></div>
                  <div className="pv-arc pv-arc-3"></div>
                  <div className="pv-arc-center"></div>
                </div>
                <ProjectImage src="/colorarc.png" alt="Color Arcs" />
              </div>
              <div className="project-body">
                <div className="project-title">Color Arcs</div>
                <p className="project-desc">
                  Outil de visualisation et d&apos;exploration de palettes de couleurs en arcs.
                  Interface interactive pour générer, tester et exporter des combinaisons harmonieuses.
                </p>
                <div className="project-techs">
                  {['Next JS','TypeScript','Vercel'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Cartyping */}
            <article className="project feature reveal" data-delay="1">
              <div className="project-cover">
                <span className="project-tag">Projet Perso</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://github.com/ElyseRaz/cartyping" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon /></a>
                  <a className="icon-btn" href="https://cartyping.up.railway.app/" target="_blank" rel="noopener noreferrer" title="Live demo"><ExternalIcon /></a>
                </div>
                <div className="preview pv pv-api">
                  <div className="pv-api-line"><span className="c">{'// Cartyping — speed test'}</span></div>
                  <div className="pv-api-line"><span className="k">WPM</span>{' '}<span className="s">&quot;87&quot;</span>{' '}<span className="c">↑ record</span></div>
                  <div className="pv-api-line"><span className="k">ACC</span>{' '}<span className="s">&quot;96.4%&quot;</span></div>
                  <div className="pv-api-line"><span className="c">{'// timer: 60s mode'}</span></div>
                  <div className="pv-api-line"><span className="k">SCORE</span>{' '}<span className="s">&quot;1240 pts&quot;</span></div>
                  <div className="pv-api-line"><span className="c">{'// Railway · Node.js'}</span></div>
                </div>
                <ProjectImage src="/cartyping.png" alt="Cartyping" />
              </div>
              <div className="project-body">
                <div className="project-title">Cartyping</div>
                <p className="project-desc">
                  Application de test de vitesse de frappe au clavier avec thème automobile.
                  Statistiques en temps réel, classements et modes de jeu variés.
                </p>
                <div className="project-techs">
                  {['Next JS', 'PostgreSQL','Railway','TypeScript'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Mon Portfolio */}
            <article className="project reveal" data-delay="2">
              <div className="project-cover">
                <span className="project-tag">Portfolio</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://color-arc.vercel.app" target="_blank" rel="noopener noreferrer" title="Live"><ExternalIcon /></a>
                </div>
                <div className="preview pv pv-portfolio">
                  <div className="row1"><div className="avatar"></div><div className="name"></div></div>
                  <div className="heading"></div>
                  <div className="grid"><div></div><div></div><div></div><div></div></div>
                </div>
                <ProjectImage src="/portfolio.png" alt="Mon Portfolio" />
              </div>
              <div className="project-body">
                <div className="project-title">Mon Portfolio</div>
                <p className="project-desc">Ce portfolio — conçu et développé de A à Z avec Next.js, animations CSS, responsive.</p>
                <div className="project-techs">
                  {['Next.js','TypeScript','Tailwind'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Vérité ou Défi */}
            <article className="project reveal" data-delay="3">
              <div className="project-cover">
                <span className="project-tag">Mobile · Perso</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://github.com/ElyseRaz/Verite-ou-Defi" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon /></a>
                </div>
                <div className="preview pv pv-mobile">
                  <div className="pv-phone-2"><div className="pv-screen"><div className="pv-bar2 acc"></div><div className="pv-circle"></div><div className="pv-bar2"></div><div className="pv-bar2"></div></div></div>
                  <div className="pv-phone"><div className="pv-screen"><div className="pv-bar2 acc"></div><div className="pv-circle"></div><div className="pv-bar2"></div><div className="pv-bar2"></div><div className="pv-bar2"></div></div></div>
                </div>
                <ProjectImage src="/veriteoudefi.jpg" alt="Vérité ou Défi" />
              </div>
              <div className="project-body">
                <div className="project-title">Vérité ou Défi</div>
                <p className="project-desc">Jeu mobile multijoueur local Vérité ou Défi. Interface ludique, questions par catégories.</p>
                <div className="project-techs">
                  {['Flutter','Dart'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Akrifi App */}
            <article className="project reveal" data-delay="4">
              <div className="project-cover">
                <span className="project-tag">Mobile · Perso</span>
                <div className="project-actions">
                  {/* GitHub à venir */}
                </div>
                <div className="preview pv pv-mobile">
                  <div className="pv-phone"><div className="pv-screen"><div className="pv-bar2"></div><div className="pv-bar2 acc"></div><div className="pv-circle"></div><div className="pv-bar2"></div><div className="pv-bar2 acc"></div><div className="pv-bar2"></div></div></div>
                </div>
                <ProjectImage src="/akrifi.jpg" alt="Akrifi App" />
              </div>
              <div className="project-body">
                <div className="project-title">Akrifi App</div>
                <p className="project-desc">Application mobile pour voir les partitions de musique et de système de notifications pour les membres</p>
                <div className="project-techs">
                  {['Flutter','Dart','PostgreSQL', 'SQLite'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Agrohelp Consulting */}
            <article className="project reveal" data-delay="5">
              <div className="project-cover">
                <span className="project-tag">Stage · Web</span>
                <div className="project-actions">
                  {/* Code source confidentiel */}
                </div>
                <div className="preview pv pv-saas">
                  <div className="pv-sidebar">
                    {[true,false,false,false,false].map((a,i) => <div key={i} className={`pv-sb-item${a?' active':''}`}></div>)}
                  </div>
                  <div className="pv-main">
                    <div className="pv-row">
                      {[0,1,2].map(i => <div key={i} className="pv-card"><div className="pv-bar"></div></div>)}
                    </div>
                    <div className="pv-chart">
                      {[40,60,35,80,55,70,90].map((h,i) => (
                        <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <ProjectImage src="/agrohelp.png" alt="Agrohelp Consulting App" />
              </div>
              <div className="project-body">
                <div className="project-title">Agrohelp Consulting App</div>
                <p className="project-desc">Application web de gestion commerciale développée en stage. Gestion des stocks, clients, facturation. Code source confidentiel.</p>
                <div className="project-techs">
                  {['PHP','React JS','PostgreSQL'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* MediFlow */}
            <article className="project reveal" data-delay="3">
              <div className="project-cover">
                <span className="project-tag">Académique</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://github.com/ElyseRaz/MediFlow" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon /></a>
                </div>
                <div className="preview pv pv-saas">
                  <div className="pv-sidebar">
                    {[false,true,false,false].map((a,i) => <div key={i} className={`pv-sb-item${a?' active':''}`}></div>)}
                  </div>
                  <div className="pv-main">
                    <div className="pv-row">
                      {[0,1].map(i => <div key={i} className="pv-card"><div className="pv-bar"></div></div>)}
                    </div>
                    <div className="pv-chart">
                      {[50,70,45,85,60,75,55,80].map((h,i) => (
                        <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <ProjectImage src="/Mediflow.png" alt="MediFlow" />
              </div>
              <div className="project-body">
                <div className="project-title">MediFlow</div>
                <p className="project-desc">Application de Gestion de Stock de Médicaments d'une Pharmacie. Projet académique ENI.</p>
                <div className="project-techs">
                  {['Next JS','PostgreSQL','TypeScript'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

            {/* Gestion-questionnaire */}
            <article className="project reveal" data-delay="4">
              <div className="project-cover">
                <span className="project-tag">Académique</span>
                <div className="project-actions">
                  <a className="icon-btn" href="https://github.com/ElyseRaz/Gestion-questionnaire" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon /></a>
                </div>
                <div className="preview pv pv-shop">
                  <div className="pv-shop-grid">
                    {[0,1,2,3,4,5].map(i => <div key={i} className="pv-prod"></div>)}
                  </div>
                </div>
                <ProjectImage src="/Gestionquestionnaire.png" alt="Gestion Questionnaire" />
              </div>
              <div className="project-body">
                <div className="project-title">Gestion Questionnaire</div>
                <p className="project-desc">Système de Question à Choix Multiple pour faire des examens en ligne</p>
                <div className="project-techs">
                  {['HTML','CSS','Java','PostgreSQL'].map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────── */}
      <section id="experience">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Parcours · 04</div>
            <h2 className="section-title">
              Un chemin <em>continu.</em>
            </h2>
            <p className="section-sub">
              Études, postes, certifications, missions freelance — la trajectoire d&apos;un développeur
              curieux qui n&apos;a jamais cessé d&apos;apprendre.
            </p>
          </div>

          <div className="timeline-tabs reveal">
            {['all','work','edu','cert'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div className="timeline">
            {filteredItems.map((item, i) => (
              <div
                key={i}
                className={`tl-item${item.current ? ' current' : ''} reveal`}
                data-delay={String(Math.min(i, 5))}
                data-cat={item.cat}
              >
                <div className="tl-head">
                  <div className="tl-meta">
                    <span>{item.period}</span>
                    {item.current && <span className="badge">En cours</span>}
                  </div>
                </div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-org">{item.org}</div>
                <div className="tl-desc">{item.desc}</div>
                {item.stack && item.stack.length > 0 && (
                  <div className="tl-stack">
                    {item.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section id="services">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Services · 05</div>
            <h2 className="section-title">
              Ce que je <em>construis pour vous.</em>
            </h2>
            <p className="section-sub">
              Six expertises, une approche : produire des produits numériques qui durent. Du wireframe
              à la mise en ligne, du prototype à l&apos;industrialisation.
            </p>
          </div>

          <div className="services-grid">
            {[
              {
                num: '01 / 06', title: 'Développement Web',
                desc: 'Sites vitrines, applications SaaS, plateformes éditoriales. Performances mesurées, SEO technique, expérience qui convertit.',
                tags: ['Next.js','Astro','Headless CMS'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
              },
              {
                num: '02 / 06', title: 'Applications Mobiles',
                desc: 'Apps iOS & Android avec une seule codebase. Animations natives, performance, déploiement sur stores.',
                tags: ['Flutter','React Native','Expo'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
              },
              {
                num: '03 / 06', title: 'UI / UX Design',
                desc: "Wireframes, prototypes haute fidélité, design systems. Audit ergonomique et tests utilisateurs.",
                tags: ['Figma','Design Tokens','Prototypage'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
              },
              {
                num: '04 / 06', title: 'Backend & API',
                desc: 'APIs REST & GraphQL, bases de données, authentification, file queues. Code testé, documenté, scalable.',
                tags: ['Node.js','PostgreSQL','tRPC'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
              },
              {
                num: '05 / 06', title: 'Maintenance & Évolution',
                desc: 'Surveillance, mises à jour, ajout de fonctionnalités, refactoring. Votre produit reste à jour, sûr et rapide.',
                tags: ['Monitoring','CI/CD','Refactor'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>,
              },
              {
                num: '06 / 06', title: 'Déploiement Cloud',
                desc: 'Infrastructure Vercel, AWS, Cloudflare. CDN, edge runtime, gestion des secrets, observabilité.',
                tags: ['Vercel','AWS','Docker'],
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 14.9"/><polyline points="8 17 12 13 16 17"/><line x1="12" y1="13" x2="12" y2="21"/></svg>,
              },
            ].map((s, i) => (
              <div key={s.num} className="service reveal" data-delay={String(i)}>
                <div className="service-num">{s.num}</div>
                <div className="service-ic">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Contact · 08</div>
            <h2 className="section-title">
              On <em>en parle ?</em>
            </h2>
            <p className="section-sub">
              Une idée, un produit à lancer, un audit à mener ? Je réponds sous 24h ouvrées.
            </p>
          </div>

          <div className="contact-wrap">
            <div className="contact-info reveal">
              <p>
                Que vous soyez fondateur, chef de produit ou agence — si vous cherchez quelqu&apos;un de
                fiable pour bâtir, refondre ou faire évoluer votre produit, écrivez-moi.
              </p>

              <div className="contact-channels">
                <a className="channel" href="mailto:erazafindravonjy@gmail.com">
                  <div className="channel-ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div><small>Email</small><strong>erazafindravonjy@gmail.com</strong></div>
                  <svg className="channel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a className="channel" href="https://github.com/ElyseRaz" target="_blank" rel="noopener noreferrer">
                  <div className="channel-ic"><GithubIcon /></div>
                  <div><small>GitHub</small><strong>ElyseRaz</strong></div>
                  <svg className="channel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a className="channel" href="https://linkedin.com/in/elysé-razafindravonjy-9355b32b5/" target="_blank" rel="noopener noreferrer">
                  <div className="channel-ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div><small>LinkedIn</small><strong>RAZAFINDRAVONJY Solofonirina Elysé</strong></div>
                  <svg className="channel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a className="channel" href="https://wa.me/261346571348" target="_blank" rel="noopener noreferrer">
                  <div className="channel-ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </div>
                  <div><small>WhatsApp</small><strong>034 65 713 48</strong></div>
                  <svg className="channel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
              </div>

              
            </div>

            <form className="contact-form reveal" data-delay="1" onSubmit={handleContact}>
              <div className="form-head">
                <h3>Démarrons une conversation</h3>
                <small>02 / 02</small>
              </div>

              <div className="field" style={{ marginBottom: '14px' }}>
                <label htmlFor="name">Nom complet</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom complet"
                  required
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                />
              </div>

              <div className="field" style={{ marginBottom: '14px' }}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@email.com"
                  required
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                />
              </div>

              <div className="field" style={{ marginBottom: '20px' }}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez votre projet, votre idée ou votre question…"
                  rows={6}
                  required
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                />
              </div>

              {formStatus === 'success' && (
                <div className="form-feedback form-feedback--success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message envoyé — je vous réponds sous 24h !
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-feedback form-feedback--error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Une erreur est survenue. Réessayez ou contactez-moi directement.
                </div>
              )}

              {formStatus !== 'success' && (
                <button
                  className="btn btn-primary btn-lg form-submit"
                  type="submit"
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="form-spinner" />
                      <span>Envoi en cours…</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer>
        <div className="container">
          <div className="footer-quote reveal">
            <h2>
              Les meilleurs sites n'ont pas été écrits en un jour. Continuons.
            </h2>
            <p>— Manifeste personnel</p>
          </div>

          <div className="footer-cols">
            <div className="footer-brand-col">
              <a href="#hero" className="brand">
                <div className="brand-mark">E</div>
                <div>
                  Élyse R.
                  <small>Dev · Web &amp; Mobile</small>
                </div>
              </a>
              <p>
                Développeur web &amp; mobile, basé à Fianarantsoa, travaillant avec des équipes du monde
                entier.
              </p>
              <div className="footer-socials">
                <a href="https://github.com/ElyseRaz" className="social-btn" title="GitHub"><GithubIcon /></a>
                <a href="https://linkedin.com/" className="social-btn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="social-btn" title="Dribbble">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.568 13.302a10.34 10.34 0 00-.298-2.06c-.6.1-1.225.17-1.872.17-3.04 0-5.83-.81-8.107-2.13a13.95 13.95 0 01-1.31 1.78c2.85 1.84 4.78 4.49 5.45 7.86 2.97-1.85 4.95-5.13 4.95-8.86a.78.78 0 00-.005-.04zm-9.568-9.55c-1.13 0-2.22.18-3.24.5 1.27 1.71 2.32 3.59 3.1 5.6 1.9-.78 3.43-1.85 4.5-3.13a10.297 10.297 0 00-4.36-2.97zm-4.55 1.4a10.378 10.378 0 00-5.32 6.6c.46.02 5.45.16 9.9-1.35-.78-1.95-1.84-3.82-3.06-5.5-.5.07-1 .17-1.52.25zM2.057 13.165c.6 4.55 4.4 8.08 9.04 8.42-.36-2.16-1.47-4.43-3.11-6.42-3.34 1.36-5.92-2-5.93-2zm10.94 8.39c.92-.13 1.79-.39 2.6-.76-.43-3.4-2.42-6.16-4.65-7.85-.07.04-.15.07-.22.1-.16.07-.32.13-.49.19a13.65 13.65 0 011.93 5.62c.4.92.66 1.83.83 2.7z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h5>Navigation</h5>
              <ul>
                <li><a href="#about">À propos</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#projects">Projets</a></li>
                <li><a href="#experience">Parcours</a></li>
              </ul>
            </div>

            <div>
              <h5>Ressources</h5>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/CV.pdf" download>CV (PDF)</a></li>
                <li><a href="#">Uses</a></li>
              </ul>
            </div>

            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:erazafindravonjy@gmail.com">erazafindravonjy@gmail.com</a></li>
                <li><a href="https://wa.me/261346571348">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bot">
            <span>© 2026 — Razafindravonjy Solofonirina Élyse. Tous droits réservés.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// ── Composant image projet ────────────────────────────────
// Utilisation : <ProjectImage src="/projects/color-arcs.png" alt="Color Arcs" />
// Si src est undefined, le CSS preview s'affiche à la place.
function ProjectImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="project-img"
      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
      quality={85}
    />
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
