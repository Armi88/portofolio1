import { useState, useEffect, useRef } from "react";
import "./App.css";
import profileImg from "./assets/WhatsApp Image 2026-04-02 at 11.17.35.jpeg";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", cat: "Frontend", color: "#61dafb" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", cat: "Frontend", color: "#f7df1e" },
  { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", cat: "Frontend", color: "#06b6d4" },
  { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", cat: "Backend", color: "#8892be" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", cat: "Backend", color: "#68a063" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", cat: "Backend", color: "#00758f" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", cat: "Design", color: "#a259ff" },
];

const PROJECTS = [
  {
    title: "Tonella - Printer Toner & Ink Monitoring System",
    desc: "saya berperan dalam kegiatan perencanaan dan pengembangan aplikasi internal yang digunakan untuk mendukung proses operasional, khususnya terkait pengelolaan laporan penggantian toner dan tagihan printer. Aplikasi ini dibangun menggunakan CodeIgniter 3 sebagai framework backend, PHP sebagai bahasa pemrograman, MySQL sebagai database, dan Tailwind CSS untuk styling antarmuka pengguna. Dalam proyek ini, saya terlibat dalam merancang struktur database, mengimplementasikan fitur-fitur utama seperti manajemen laporan penggantian toner, serta memastikan aplikasi berjalan dengan baik dan memenuhi kebutuhan pengguna internal perusahaan.",
    tags: ["PHP", "CodeIgniter 3", "MySQL", "Tailwind CSS"],
    color: "#00ff88",
    icon: "◉",
    year: "2024",
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: "Belajar Budaya Indonesia",
    desc: "Platform ini dirancang untuk mempermudah proses edukasi dengan memperkenalkan kekayaan budaya dari 34 provinsi di Indonesia. Melalui platform ini, pengguna dapat mengenal berbagai unsur budaya seperti rumah adat, pakaian tradisional, alat musik khas, makanan daerah, serta fakta-fakta menarik dari setiap provinsi.Dengan penyajian informasi yang lengkap, terstruktur, dan mudah diakses, platform ini diharapkan dapat meningkatkan pemahaman sekaligus menumbuhkan apresiasi masyarakat terhadap keberagaman dan kekayaan budaya Indonesia.",
    tags: ["Html", "Css", "JavaScript"],
    color: "#7c3aed",
    icon: "◉",
    year: "2024",
    liveUrl: 'https://armi88.github.io/belajar-budaya-Indonesia/',
    githubUrl: 'https://github.com/Armi88/belajar-budaya-Indonesia',
  },
];

const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    company: "PT. Angkasa Pura Indonesia Bandar Udara Soekarno-Hatta",
    period: "September - November 2025",
    desc: "Selama magang, saya terlibat dalam pengembangan dan membangun sistem berbasis web (TONELLA), mulai dari analisis kebutuhan, perancangan database, hingga implementasi fitur dan UI/UX, serta berkomunikasi langsung dengan internal operasional kantor.",
  },
];

function useTypingEffect(words, speed = 100) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1800);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SkillIcon({ name, icon, img, cat, color, textIcon, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`skill-icon-item ${inView ? "fade-up" : ""}`}
      style={{ animationDelay: `${delay}ms`, "--skill-color": color }}
    >
      <div className="skill-icon-badge" style={{ borderColor: color + "44", background: color + "11" }}>
        {img ? (
          <img src={img} alt={name} className="skill-icon-img" />
        ) : textIcon ? (
          <span className="skill-icon-text" style={{ color }}>{icon}</span>
        ) : (
          <span className="skill-icon-emoji">{icon}</span>
        )}
      </div>
      <span className="skill-icon-name">{name}</span>
      <span className="skill-icon-cat">{cat}</span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? "fade-up" : ""}`}
      style={{ animationDelay: `${index * 120}ms`, "--accent": project.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-top">
        <span className="project-icon" style={{ color: project.color }}>{project.icon}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((t) => (
          <span key={t} className="tag" style={{ borderColor: project.color + "44", color: project.color }}>
            {t}
          </span>
        ))}
      </div>
      {/* Hover overlay with links */}
      <div className={`project-links-overlay ${hovered ? "overlay-show" : ""}`}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="project-link-btn"
            style={{ borderColor: project.color, color: project.color }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <span>🌐</span> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="project-link-btn project-link-github"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <span>⑂</span> GitHub
          </a>
        )}
      </div>
    </div>
  );
}


export default function App() {
  const typed = useTypingEffect([
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Grid background */}
      <div className="grid-bg" />
      <div className="noise-overlay" />

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a className="logo" href="#">
          <span className="logo-bracket">&lt;</span>
          Varian
          <span className="logo-bracket">/&gt;</span>
        </a>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
          <a href="#contact" className="btn-hire" onClick={(e) => { e.preventDefault(); scrollTo("Contact"); }}>
            Hire Me
          </a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot-pulse" />
            Available for work
          </div>
          <h1 className="hero-name">
            Halo, saya<br />
            <span className="name-gradient">Varian Armi</span>
          </h1>
          <div className="hero-typed">
            <span className="typed-prefix">$ </span>
            <span>{typed}</span>
            <span className="cursor">█</span>
          </div>
          <p className="hero-desc">
          Frontend Developer (Junior) yang berfokus pada pembangunan antarmuka modern, responsif, dan berperforma tinggi. 
          Memiliki pengalaman magang sebagai Full Stack Developer, dengan pemahaman dalam pengembangan aplikasi web dari sisi frontend hingga backend 
          untuk menciptakan pengalaman pengguna yang optimal
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>
              Lihat Proyek
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("Contact")}>
              Hubungi Saya
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-window">
            <div className="window-bar">
              <span className="dot r" /><span className="dot y" /><span className="dot g" />
              <span className="window-title">portfolio.js</span>
            </div>
            <pre className="code-body">{`const developer = {
  name: "Varian Armi",
  location: "Kabupaten Bogor, BojongGede",
  skills: [
    "React", "PHP",
    "Node.js", "MySQL"
  ],
  passion: "Frontend Developer (Junior)",
  status: "🟢 Available"
};

export default developer;`}</pre>
          </div>
          <div className="float-badge badge-1">⚡ Vite</div>
          <div className="float-badge badge-2">⚛ React</div>
          <div className="float-badge badge-3">🐘 PHP</div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span className="scroll-label">Scroll Down</span>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="section-inner">
          <SectionLabel label="01" title="Tentang Saya" />
          <div className="about-grid">
            <div className="about-photo">
              <div className="photo-frame">
                <div className="avatar-upload-wrapper" style={{ cursor: "default" }}>
                  <img src={profileImg} alt="Profile" className="avatar-photo" />
                </div>
                <div className="photo-deco" />
              </div>
              <div className="about-socials">
                {[
                  { name: "GitHub", url: "https://github.com/Armi88/" },
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/varian-armi-eka-saputro-b3b827243/" },
                  { name: "Email", url: "varianarmi78@gmail.com" }
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-chip">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="about-text">
              <p className="about-lead">
                Saya adalah <span className="highlight">Junior Full Stack Developer</span> yang memiliki minat dalam membangun aplikasi web yang fungsional dan mudah digunakan.
              </p>
              <p className="about-body">
              Saya merupakan mahasiswa aktif semester 8 Program Studi Sistem Informasi di Universitas Gunadarma dengan pengalaman magang sebagai Full Stack Web Developer di PT Angkasa Pura Indonesia. Selama magang, saya terlibat dalam 
              pengembangan dan membangun sistem berbasis web (TONELLA), mulai dari analisis kebutuhan, perancangan database, hingga implementasi fitur dan UI/UX, serta berkomunikasi langsung dengan pengguna.
              Selain itu, saya juga memiliki pengalaman mengembangkan beberapa proyek mandiri seperti website properti dan e-commerce. Saya terbiasa menggunakan teknologi seperti HTML, CSS, JavaScript, React, PHP, dan CodeIgniter dalam pengembangan aplikasi web.
              </p>
              <p className="about-body">
                Saat ini fokus pada pengembangan kemampuan aplikasi web modern menggunakan React, CodeIgniter, dan ekosistem JavaScript. Saya juga aktif belajar tentang distributed systems dan cloud architecture.
              </p>
              <div className="about-tools">
                <span className="tools-label">Tools favorit:</span>
                <div className="tools-list">
                  {["VS Code", "Vite", "Postman", "Figma", "TablePlus", "Git"].map((t) => (
                    <span key={t} className="tool-chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section section-alt" id="skills">
        <div className="section-inner">
          <SectionLabel label="02" title="Keahlian" />
          <div className="skills-icon-grid">
            {SKILLS.map((s, i) => (
              <SkillIcon key={s.name} {...s} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <div className="section-inner">
          <SectionLabel label="03" title="Proyek Pilihan" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section section-alt" id="experience">
        <div className="section-inner">
          <SectionLabel label="04" title="Pengalaman" />
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="exp-role">{e.role}</h3>
                      <span className="exp-company">{e.company}</span>
                    </div>
                    <span className="exp-period">{e.period}</span>
                  </div>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-inner contact-inner">
          <SectionLabel label="05" title="Hubungi Saya" />
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-headline">
                Mari Berkolaborasi<br />
                <span className="name-gradient">Bersama! 🚀</span>
              </h2>
              <p className="contact-desc">
                Terbuka untuk peluang freelance, kolaborasi proyek, atau sekadar ngobrol soal teknologi. Jangan ragu untuk menghubungi saya!
              </p>
              <div className="contact-links">
                {[
                  { icon: "✉", label: "varianarmi78@gmail.com" },
                  { icon: "📍", label: "Kabupaten Bogor, BojongGede" },
                  { icon: "🕐", label: "WIB (UTC+7)" },
                ].map((c) => (
                  <div key={c.label} className="contact-item">
                    <span className="contact-icon">{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Nama</label>
                <input className="form-input" type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Pesan</label>
                <textarea className="form-input form-textarea" rows={5} placeholder="Halo, saya ingin berkolaborasi..." />
              </div>
              <button type="submit" className="btn-primary btn-full">
                Kirim Pesan →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="logo">
            <span className="logo-bracket">&lt;</span>Varian<span className="logo-bracket">/&gt;</span>
          </span>
          <p className="footer-text">
            Dibuat dengan ❤️ menggunakan React + Vite · {new Date().getFullYear()}
          </p>
          <p className="footer-sub">Designed & Developed by Varian Armi</p>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ label, title }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`section-header ${inView ? "fade-up" : ""}`}>
      <span className="section-num">{label}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}
