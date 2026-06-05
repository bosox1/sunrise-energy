import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Послуги", "Переваги", "Контакти"];

const SERVICES = [
  {
    icon: "☀️",
    title: "Сонячні електростанції",
    desc: "Проєктування та монтаж СЕС для приватних будинків і підприємств під ключ. Від розрахунку до підключення.",
  },
  {
    icon: "🔋",
    title: "Системи резервного живлення",
    desc: "ДБЖ та акумуляторні накопичувачі — стабільне живлення навіть під час відключень.",
  },
  {
    icon: "🔧",
    title: "Монтаж і сервіс",
    desc: "Власна бригада монтажників. Гарантійне та постгарантійне обслуговування систем.",
  },
  {
    icon: "📦",
    title: "Продаж обладнання",
    desc: "Офіційні поставки панелей, інверторів, акумуляторів від провідних виробників.",
  },
];

function CounterCard({ value, label, delay, inView }) {
  const numeric = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const count = useCounter(numeric, inView);
  return (
    <div style={{
      padding: "48px 24px", textAlign: "center",
      background: "rgba(255,255,255,0.02)",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease ${delay}ms`,
    }}>
      <div style={{
        fontFamily: "'Exo 2', sans-serif", fontWeight: 900,
        fontSize: "clamp(36px, 6vw, 56px)",
        background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        lineHeight: 1, marginBottom: 12,
      }}>
        {isNaN(numeric) ? value : `${count}${suffix}`}
      </div>
      <div style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Exo 2', sans-serif", fontSize: 15 }}>{label}</div>
    </div>
  );
}
const ADVANTAGES = [
  { value: "100+", label: "Реалізованих проєктів" },
  { value: "5+", label: "Років на ринку" },
  { value: "24/7", label: "Технічна підтримка" },
  { value: "15р", label: "Гарантія на панелі" },
];

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

function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target);
    if (isNaN(numeric)) return;
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView]);
  return count;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,15,26,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(245,158,11,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%, #fbbf24, #f59e0b, #d97706)",
            boxShadow: "0 0 16px rgba(245,158,11,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>☀️</div>
          <span style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.02em" }}>
            Sunrise <span style={{ color: "#f59e0b" }}>Energy</span>
          </span>
        </div>

        {/* Desktop */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontFamily: "'Exo 2', sans-serif", fontSize: 15, cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.03em" }}
              onMouseEnter={e => e.target.style.color = "#f59e0b"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
            >{l}</button>
          ))}
          <button onClick={() => document.getElementById("контакти")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "8px 20px", borderRadius: 8,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#0a0f1a", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14,
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
            }}>Зателефонувати</button>
          
        </div>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }} className="burger">
          <div style={{ width: 24, height: 2, background: "#f59e0b", marginBottom: 5, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "#f59e0b", marginBottom: 5, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: "#f59e0b", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(10,15,26,0.98)", borderTop: "1px solid rgba(245,158,11,0.2)", padding: "16px 24px 24px" }}>
          {NAV_LINKS.map((l) => (
            <div key={l} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <button onClick={() => scrollTo(l.toLowerCase())}
                style={{ background: "none", border: "none", color: "#fff", fontFamily: "'Exo 2', sans-serif", fontSize: 16, cursor: "pointer" }}>
                {l}
              </button>
            </div>
          ))}
          <a href="tel:+380938329811" style={{ display: "block", marginTop: 16, padding: "12px", textAlign: "center", borderRadius: 8, background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#0a0f1a", fontWeight: 700, textDecoration: "none", fontFamily: "'Exo 2', sans-serif" }}>
            Зателефонувати
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, #0a0f1a 0%, #0f1a2e 50%, #0a0f1a 100%)",
      padding: "100px 24px 60px",
    }}>
      {/* Animated orbs */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
        animation: "pulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "0%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
        animation: "pulse 6s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 780, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "6px 18px", borderRadius: 100,
          border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b",
          fontFamily: "'Exo 2', sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 32,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          Коломия · Прикарпаття
        </div>

        <h1 style={{
          fontFamily: "'Exo 2', sans-serif", fontWeight: 900,
          fontSize: "clamp(40px, 8vw, 80px)", lineHeight: 1.05,
          color: "#fff", margin: "0 0 24px",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.15s",
        }}>
          Енергія сонця —<br />
          <span style={{
            background: "linear-gradient(135deg, #fbbf24, #f59e0b, #ea580c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>ваша незалежність</span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.6)", fontSize: "clamp(16px, 2vw, 20px)",
          lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px",
          fontFamily: "'Exo 2', sans-serif",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.3s",
        }}>
          Встановлюємо сонячні електростанції та системи резервного живлення для будинків і бізнесу під ключ.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.45s",
        }}>
          <button onClick={() => document.getElementById("контакти")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "16px 36px", borderRadius: 10,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              color: "#0a0f1a", fontFamily: "'Exo 2', sans-serif", fontWeight: 800,
              fontSize: 16, border: "none", cursor: "pointer",
              boxShadow: "0 8px 32px rgba(245,158,11,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,158,11,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.4)"; }}
          >
            📞 Отримати консультацію
          </button>
          <button onClick={() => document.getElementById("послуги")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "16px 36px", borderRadius: 10,
              background: "transparent", border: "1px solid rgba(245,158,11,0.4)",
              color: "#f59e0b", fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
              fontSize: 16, cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; e.currentTarget.style.borderColor = "#f59e0b"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"; }}
          >
            Наші послуги ↓
          </button>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [ref, inView] = useInView();
  return (
    <section id="послуги" style={{ padding: "100px 24px", background: "#080d1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{ color: "#f59e0b", fontFamily: "'Exo 2', sans-serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Що ми робимо</p>
          <h2 style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", margin: 0 }}>Наші послуги</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px", borderRadius: 16,
        background: hovered ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
        cursor: "default",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}>
      <div style={{ fontSize: 40, marginBottom: 20 }}>{icon}</div>
      <h3 style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Exo 2', sans-serif", lineHeight: 1.7, fontSize: 15, margin: 0 }}>{desc}</p>
    </div>
  );
}

function Advantages() {
  const [ref, inView] = useInView();
  return (
    <section id="переваги" style={{
      padding: "100px 24px",
      background: "linear-gradient(160deg, #0a0f1a, #0f1a2e)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 72,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{ color: "#f59e0b", fontFamily: "'Exo 2', sans-serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Чому обирають нас</p>
          <h2 style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", margin: "0 0 20px" }}>Цифри говорять самі</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Exo 2', sans-serif", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Досвід, якість обладнання та власна команда монтажників — основа нашої роботи.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(245,158,11,0.15)" }}>
        {ADVANTAGES.map((a, i) => (
          <CounterCard key={i} {...a} delay={i * 120} inView={inView} />
        ))}
      </div>
        {/* Why us list */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 48,
        }}>
          {[
            { icon: "✅", text: "Монтаж під ключ — від проєкту до підключення" },
            { icon: "⚡", text: "Офіційна гарантія на все обладнання" },
            { icon: "🌱", text: "Знижуємо рахунки за електроенергію на 70–90%" },
            { icon: "🛡️", text: "Власна сервісна бригада, виїзд по всьому Прикарпаттю" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "20px 24px", borderRadius: 12,
              background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.12)",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s ease ${400 + i * 100}ms`,
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Exo 2', sans-serif", fontSize: 15, lineHeight: 1.6 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    await fetch("https://formspree.io/f/mojzvywk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message }),
    });
    setSent(true);
  };

  return (
    <section id="контакти" style={{ padding: "100px 24px", background: "#080d1a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{ color: "#f59e0b", fontFamily: "'Exo 2', sans-serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Зв'язатись</p>
          <h2 style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", margin: "0 0 16px" }}>Отримати консультацію</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Exo 2', sans-serif", fontSize: 17 }}>Безкоштовно розрахуємо систему для вашого об'єкта</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
          {/* Left — contact info */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <div style={{ marginBottom: 40 }}>
              {[
                { icon: "📞", label: "Телефон", val: "+380 (93) 832 98 11", href: "tel:+380938329811" },
                { icon: "💬", label: "Telegram", val: "+380 (67) 340 20 08", href: "https://t.me/+380673402008" },
                { icon: "📲", label: "Viber", val: "+380 (67) 340 20 08", href: "viber://chat?number=%2B380673402008" },
                { icon: "📍", label: "Місто", val: "Коломия, Івано-Франківська обл.", href: null },
                { icon: "📱", label: "Instagram", val: "@sunriseenergyteam", href: "https://instagram.com/sunriseenergyteam" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Exo 2', sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontSize: 16, fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#f59e0b"}
                        onMouseLeave={e => e.target.style.color = "#fff"}
                      >{c.val}</a>
                    ) : (
                      <span style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontSize: 16 }}>{c.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.3s",
          }}>
            {sent ? (
              <div style={{ padding: "48px 24px", textAlign: "center", borderRadius: 16, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌟</div>
                <h3 style={{ color: "#f59e0b", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, marginBottom: 8 }}>Дякуємо!</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Exo 2', sans-serif" }}>Ми зателефонуємо вам найближчим часом.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", placeholder: "Ваше ім'я", type: "text" },
                  { key: "phone", placeholder: "Номер телефону", type: "tel" },
                ].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      padding: "14px 18px", borderRadius: 10,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontFamily: "'Exo 2', sans-serif", fontSize: 15, outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                ))}
                <textarea placeholder="Ваше питання (необов'язково)" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  style={{
                    padding: "14px 18px", borderRadius: 10, resize: "none",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", fontFamily: "'Exo 2', sans-serif", fontSize: 15, outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.6)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button onClick={handleSubmit} style={{
                  padding: "16px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #fbbf24, #d97706)",
                  color: "#0a0f1a", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 16,
                  boxShadow: "0 6px 24px rgba(245,158,11,0.4)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Надіслати запит ☀️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "32px 24px", background: "#050a14", borderTop: "1px solid rgba(245,158,11,0.1)", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>☀️</span>
        <span style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>Sunrise <span style={{ color: "#f59e0b" }}>Energy</span></span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Exo 2', sans-serif", fontSize: 13, margin: 0 }}>
        © {new Date().getFullYear()} Sunrise Energy Team · Коломия
      </p>
    </footer>
  );
}

function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
    }} />
  );
}
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0f1a; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <Advantages />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}