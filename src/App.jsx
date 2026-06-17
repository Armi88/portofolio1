import { useState, useEffect, useRef } from "react";
import "./App.css";
import profileImg from "./assets/WhatsApp Image 2026-04-02 at 11.17.35.jpeg";

const NAV_LINKS = ["About", "Skills", "Projects", "Certificates", "Experience", "Contact"];

const SKILLS = [
  { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", cat: "Frontend", color: "#e34f26" },
  { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", cat: "Frontend", color: "#1572b6" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", cat: "Frontend", color: "#7952b3" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", cat: "Frontend", color: "#61dafb" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", cat: "Frontend", color: "#f7df1e" },
  { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", cat: "Frontend", color: "#06b6d4" },
  { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", cat: "Backend", color: "#8892be" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", cat: "Backend", color: "#68a063" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", cat: "Backend", color: "#00758f" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", cat: "Design", color: "#a259ff" },
  { name: "CodeIgniter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg", cat: "Backend", color: "#ef4223" },
];

const PROJECTS = [
  {
    title: "Tonella - Printer Toner & Ink Monitoring System",
    desc: "saya berperan dalam kegiatan perencanaan dan pengembangan aplikasi internal yang digunakan untuk mendukung proses operasional, khususnya terkait pengelolaan laporan penggantian toner dan tagihan printer. Aplikasi ini dibangun menggunakan CodeIgniter 3 sebagai framework backend, PHP sebagai bahasa pemrograman, MySQL sebagai database, dan Tailwind CSS untuk styling antarmuka pengguna. Dalam proyek ini, saya terlibat dalam merancang struktur database, mengimplementasikan fitur-fitur utama seperti manajemen laporan penggantian toner, serta memastikan aplikasi berjalan dengan baik dan memenuhi kebutuhan pengguna internal perusahaan.",
    tags: ["PHP", "CodeIgniter 3", "MySQL", "Tailwind CSS"],
    color: "#00ff88",
    icon: "◉",
    year: "2025",
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: "Belajar Budaya Indonesia",
    desc: "Platform ini dirancang untuk mempermudah proses edukasi dengan memperkenalkan kekayaan budaya dari 34 provinsi di Indonesia. Melalui platform ini, pengguna dapat mengenal berbagai unsur budaya seperti rumah adat, pakaian tradisional, alat musik khas, makanan daerah, serta fakta-fakta menarik dari setiap provinsi.Dengan penyajian informasi yang lengkap, terstruktur, dan mudah diakses, platform ini diharapkan dapat meningkatkan pemahaman sekaligus menumbuhkan apresiasi masyarakat terhadap keberagaman dan kekayaan budaya Indonesia.",
    tags: ["Html", "Css", "JavaScript"],
    color: "#7c3aed",
    icon: "◉",
    year: "2025",
    liveUrl: 'https://armi88.github.io/belajar-budaya-Indonesia/',
    githubUrl: 'https://github.com/Armi88/belajar-budaya-Indonesia',
  },
  {
    title: "Rumah Impian",
    desc: "Platform ini dirancang untuk jual rumah yang memudahkan pengguna dalam mencari dan menemukan rumah impian mereka. Dengan fitur pencarian yang canggih, pengguna dapat dengan mudah menyaring hasil berdasarkan lokasi, harga, tipe properti, dan fasilitas yang diinginkan. Selain itu, platform ini juga menyediakan informasi lengkap tentang setiap listing rumah, termasuk foto, deskripsi, dan kontak penjual. Dengan antarmuka yang user-friendly dan responsif, platform ini bertujuan untuk memberikan pengalaman terbaik bagi pengguna dalam proses pencarian rumah.",
    tags: ["Html", "Css", "JavaScript"],
    color: "#67C090",
    icon: "◉",
    year: "2025",
    liveUrl: 'https://rumah-inpian-hlt7xhvoo-armi88s-projects.vercel.app/',
    githubUrl: 'https://github.com/Armi88/Rumah-Inpian',
  },
];

const CERTIFICATES = [
  {
    title: "Sertifikat Intern Kantor Regional 1 PT Angkasa Pura Indonesia",
    desc: "For Succesfully Completing Internship Program At Kantor Regional I Pt Angkasa Pura Indonesia The Internship Was Conducted From September 8th 2025 To November 30th 2025",
    color: "#3b82f6",
    icon: "",
    year: "2025",
    driveUrl: "https://drive.google.com/file/d/1JcjXrTKEbfFl2c1eceQclS12uqxImV-E/view?usp=sharing", // Ganti "#" dengan link Google Drive Anda
  },
  {
    title: "Sertifikat  Pelatihan Perisapan Data Untuk Proses Busnis",
    desc: "Sertifikat telah mengikuti pelatihan persiapan data untuk proses bisnis yang di selenggarakan oleh LSP UG",
    color: "#f59e0b",
    icon: "",
    year: "2025",
    driveUrl: "https://drive.google.com/file/d/10ZmQcZiAcsPq971_0DR1awl327thXQRw/view?usp=sharing", // Ganti "#" dengan link Google Drive Anda
  }
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

function CertificateCard({ cert, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? "fade-up" : ""}`}
      style={{ animationDelay: `${index * 120}ms`, "--accent": cert.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-top">
        <span className="project-icon" style={{ color: cert.color }}>{cert.icon}</span>
        <span className="project-year">{cert.year}</span>
      </div>
      <h3 className="project-title">{cert.title}</h3>
      <p className="project-desc">{cert.desc}</p>
      {/* Hover overlay with links */}
      <div className={`project-links-overlay ${hovered ? "overlay-show" : ""}`}>
        {cert.driveUrl && (
          <a
            href={cert.driveUrl}
            className="project-link-btn"
            style={{ borderColor: cert.color, color: cert.color }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <span>📁</span> Lihat di Drive
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
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const WA_NUMBER = "6282190215227"; // Nomor WhatsApp Varian Armi

  const handleSendWA = () => {
    const text = `Halo, saya ${formData.name}!\nNo. HP: ${formData.phone}\n\nPesan:\n${formData.message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

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
          <span className="logo-icon">⚡</span>
          <span className="logo-name">Portfolio<span className="logo-dot">.</span></span>
        </a>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}>
              {l}
              <span className="nav-link-underline" />
            </button>
          ))}
        </div>
        <div className="nav-right">
          <a href="https://github.com/Armi88/" className="nav-icon-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/varian-armi-eka-saputro-b3b827243/" className="nav-icon-btn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#contact" className="btn-hire" onClick={(e) => { e.preventDefault(); scrollTo("Contact"); }}>
            <span>Hire Me</span>
            <span className="btn-hire-arrow">→</span>
          </a>
        </div>
        <button className={`hamburger ${menuOpen ? "hamburger-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
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
            Junior Full Stack Developer yang berfokus pada pembangunan antarmuka modern, responsif, dan berperforma tinggi.
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
          <SectionLabel label="" title="Tentang Saya" />
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
                Saya merupakan mahasiswa semester akhir Program Studi Sistem Informasi di Universitas Gunadarma dengan pengalaman magang sebagai Full Stack Web Developer di PT Angkasa Pura Indonesia. Selama magang, saya terlibat dalam
                pengembangan dan membangun sistem berbasis web (TONELLA), mulai dari analisis kebutuhan, perancangan database, hingga implementasi fitur dan UI/UX, serta berkomunikasi langsung dengan pengguna.
                Selain itu, saya juga memiliki pengalaman mengembangkan beberapa proyek mandiri seperti website properti dan e-commerce. Saya terbiasa menggunakan teknologi seperti HTML, CSS, JavaScript, React, PHP, dan CodeIgniter dalam pengembangan aplikasi web.
              </p>
              <p className="about-body">
                Saat ini fokus pada pengembangan kemampuan aplikasi web modern menggunakan React, CodeIgniter, dan ekosistem JavaScript. Saya juga aktif belajar tentang distributed systems dan cloud architecture.
              </p>
              <div className="about-tools">
                <span className="tools-label">Tools favorit:</span>
                <div className="tools-list">
                  {["VS Code", "Vite", "Figma", "Git", "codeigniter",].map((t) => (
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
          <SectionLabel label="" title="Keahlian" />
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
          <SectionLabel label="" title="Pengalaman Projek" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section section-alt" id="certificates">
        <div className="section-inner">
          <SectionLabel label="" title="Sertifikat" />
          <div className="projects-grid">
            {CERTIFICATES.map((c, i) => (
              <CertificateCard key={c.title} cert={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="section-inner">
          <SectionLabel label="" title="Pengalaman Magang" />
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
      <section className="section section-alt" id="contact">
        <div className="section-inner contact-inner">
          <SectionLabel label="" title="Hubungi Saya" />
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
                  { icon: "📱", label: "+62 82190215227" },
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
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">No. HP / WhatsApp</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+62 812-XXXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pesan</label>
                <textarea
                  className="form-input form-textarea"
                  rows={5}
                  placeholder="Halo, saya ingin berkolaborasi..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="button"
                className="btn-primary btn-full"
                onClick={handleSendWA}
              >
                💬 Kirim via WhatsApp →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-glow" />
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="logo footer-logo" href="#">
                <span className="logo-icon">⚡</span>
                <span className="logo-name">Portofolio<span className="logo-dot">.</span></span>
              </a>
              <p className="footer-brand-desc">
                Junior Full Stack Developer yang berfokus pada membangun antarmuka modern dan berperforma tinggi.
              </p>
              <div className="footer-socials">
                <a href="https://github.com/Armi88/" className="footer-social-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/varian-armi-eka-saputro-b3b827243/" className="footer-social-btn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:varianarmi78@gmail.com" className="footer-social-btn" title="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>
            <div className="footer-links-group">
              <h4 className="footer-links-title">Navigasi</h4>
              <ul className="footer-links-list">
                {NAV_LINKS.map((l) => (
                  <li key={l}>
                    <button className="footer-nav-link" onClick={() => scrollTo(l)}>{l}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-links-group">
              <h4 className="footer-links-title">Kontak</h4>
              <ul className="footer-links-list">
                <li><span className="footer-contact-item">📱 +62 82190215227</span></li>
                <li><span className="footer-contact-item">📍 Kab. Bogor, BojongGede</span></li>
                <li><span className="footer-contact-item">✉️ varianarmi78@gmail.com</span></li>
                <li><span className="footer-contact-item">🕐 WIB (UTC+7)</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} <span className="footer-copy-name">Varian Armi</span>. All rights reserved.
            </p>
            <p className="footer-made">
              Dibuat dengan <span className="footer-heart">❤️</span> menggunakan <span className="footer-stack">React</span> + <span className="footer-stack">Vite</span>
            </p>
          </div>
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
