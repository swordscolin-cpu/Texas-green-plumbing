import { useState, useEffect, useRef } from "react";

const SERVICES = [
  { icon: "💧", title: "Leak Detection & Repair", desc: "Advanced leak detection technology to pinpoint and fix leaks fast — before they become expensive disasters.", price: "From $89" },
  { icon: "🔥", title: "Water Heater Services", desc: "Installation, repair, and maintenance for traditional and tankless water heaters. We handle all major brands.", price: "From $149" },
  { icon: "🚿", title: "Shower & Tub Repair", desc: "Handle and valve replacements, caulking, drain clearing, and full shower restorations.", price: "From $99" },
  { icon: "🔧", title: "Gas Line Services", desc: "Licensed gas leak detection, repair, and new gas line installation done safely and up to code.", price: "From $199" },
  { icon: "🚽", title: "Toilet Repair & Install", desc: "From running toilets to full replacements — quick, clean, and guaranteed work.", price: "From $75" },
  { icon: "🌱", title: "Eco-Friendly Upgrades", desc: "Low-flow fixtures, water-saving toilets, and green plumbing solutions to cut your utility bills.", price: "From $120" },
];

const REVIEWS = [
  { name: "Sammy Wu", rating: 5, ago: "5 years ago", text: "This company is amazing! The employees are hardworking, professional, and informative. A previous plumber was unable to remove the part due to corrosion, but Texas Green handled it perfectly." },
  { name: "Roman Fleysher", rating: 5, ago: "4 years ago", text: "Any issue and cost to repair are explained and must be approved by the client prior to beginning any work. They repaired gas leaks for us and all I can say is top-notch service!" },
  { name: "Jarron Rice", rating: 4, ago: "4 years ago", text: "They found a different problem before it became a bigger issue — caught something I never would have noticed. That kind of thoroughness is hard to find." },
  { name: "Maria T.", rating: 5, ago: "2 years ago", text: "Very friendly and responded quickly at a great price. Budget friendly too! Recommending them to all of my friends and family." },
  { name: "Kevin S.", rating: 5, ago: "1 year ago", text: "Good service, friendly staff, would recommend. They showed up on time and left my bathroom cleaner than they found it." },
];

const FAQS = [
  { q: "Do you offer emergency plumbing services?", a: "Yes! We offer same-day emergency service. Call us at (972) 498-1047 and we'll dispatch a technician as quickly as possible." },
  { q: "Are you licensed and insured?", a: "Absolutely. Texas Green Plumbing is fully licensed, bonded, and insured in the state of Texas. All our technicians are background-checked professionals." },
  { q: "Do you provide free estimates?", a: "We provide upfront pricing before any work begins. All costs are explained and must be approved by you before we start — no surprises." },
  { q: "What areas do you serve?", a: "We serve Richardson, Plano, Allen, McKinney, Garland, and the greater Dallas area." },
  { q: "Are your services eco-friendly?", a: "Sustainability is in our name! We offer green plumbing solutions including low-flow fixtures, water-efficient systems, and environmentally responsible disposal." },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#16a34a" : "#d1d5db", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

function NavBar({ scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "About", "Reviews", "FAQ", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #e5e7eb" : "none",
      transition: "all 0.3s ease",
      padding: "0 5vw",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#16a34a,#4ade80)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌱</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: scrolled ? "#111" : "#fff", lineHeight: 1.1 }}>Texas Green</div>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: scrolled ? "#16a34a" : "#86efac", textTransform: "uppercase", fontWeight: 600 }}>Plumbing</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: scrolled ? "#374151" : "#fff", letterSpacing: "0.03em", padding: 0 }}>
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>Get a Quote</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 24, color: scrolled ? "#111" : "#fff" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "#fff", padding: "16px 5vw 20px", borderTop: "1px solid #e5e7eb" }}>
          {links.map(l => (
            <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#374151", padding: "10px 0", textAlign: "left" }}>
              {l}
            </button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 700px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero({ scrollTo }) {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: 68,
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 60%), radial-gradient(circle at 80% 20%, #86efac 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #f0fdf4, transparent)" }} />

      <div style={{ maxWidth: 800, textAlign: "center", padding: "60px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>⭐ 4.5 Stars · 120+ Reviews</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>
          Richardson's Trusted<br /><span style={{ color: "#4ade80" }}>Green Plumbing</span> Experts
        </h1>
        <p style={{ fontSize: 18, color: "#a7f3d0", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Professional, eco-friendly plumbing services with upfront pricing and no surprises. Serving Richardson, TX and the greater Dallas area since 2014.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("contact")} style={{
            background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px",
            fontSize: 16, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 24px rgba(22,163,74,0.4)"
          }}>Get a Free Quote</button>
          <a href="tel:9724981047" style={{
            background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10,
            padding: "14px 32px", fontSize: 16, fontWeight: 600, textDecoration: "none", display: "inline-block"
          }}>📞 (972) 498-1047</a>
        </div>
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[["✓", "Licensed & Insured"], ["⚡", "Same-Day Service"], ["💚", "Eco-Friendly"], ["💰", "Upfront Pricing"]].map(([icon, text]) => (
            <div key={text} style={{ color: "#d1fae5", fontSize: 14, fontWeight: 500 }}>{icon} {text}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: "#f0fdf4", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#16a34a", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#052e16", marginBottom: 16 }}>Our Services</h2>
          <p style={{ color: "#374151", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>From emergency repairs to eco-friendly upgrades — we handle every plumbing need with skill and care.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {SERVICES.map(s => (
            <div key={s.title} style={{
              background: "#fff", borderRadius: 16, padding: "28px 28px 24px",
              border: "1px solid #dcfce7", transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(22,163,74,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#052e16", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 15 }}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#fff", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ color: "#16a34a", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Who We Are</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#052e16", marginBottom: 20, lineHeight: 1.2 }}>Plumbing That's Good for You and the Planet</h2>
          <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
            Texas Green Plumbing has served the Richardson community since 2014. We believe great plumbing should be transparent, professional, and environmentally responsible.
          </p>
          <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
            Our technicians are licensed, background-checked, and trained to explain every option before any work begins. No pressure, no hidden fees — just honest service you can trust.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[["120+", "Happy Customers"], ["10+", "Years in Business"], ["100%", "Upfront Pricing"], ["⭐ 4.5", "Average Rating"]].map(([num, label]) => (
              <div key={label} style={{ background: "#f0fdf4", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#16a34a" }}>{num}</div>
                <div style={{ color: "#4b5563", fontSize: 13, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "linear-gradient(135deg, #052e16, #166534)", borderRadius: 24, padding: 48, color: "#fff" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🌿</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 16 }}>Our Green Promise</h3>
            <p style={{ color: "#a7f3d0", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              We're committed to eco-friendly plumbing practices — from water-conserving fixtures to responsible waste disposal. Save money on utilities while doing your part for the environment.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Low-flow fixture installation", "Water leak prevention", "Eco-safe drain cleaning", "Energy-efficient water heaters"].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "#d1fae5", fontSize: 14 }}>
                  <span style={{ color: "#4ade80", fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){#about > div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function Reviews() {
  const [active, setActive] = useState(0);
  return (
    <section id="reviews" style={{ background: "#f0fdf4", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#16a34a", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>What Customers Say</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#052e16", marginBottom: 12 }}>Customer Reviews</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ color: "#fbbf24", fontSize: 22, letterSpacing: 2 }}>★★★★½</span>
            <span style={{ fontWeight: 700, color: "#052e16", fontSize: 18 }}>4.5</span>
            <span style={{ color: "#6b7280", fontSize: 14 }}>based on 120 reviews</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #dcfce7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#052e16", fontSize: 14 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{r.ago}</div>
                </div>
              </div>
              <StarRating rating={r.rating} />
              <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>"{r.text}"</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 600, fontSize: 15, textDecoration: "none", borderBottom: "2px solid #4ade80" }}>
            See all 120 reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background: "#fff", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: "#16a34a", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Got Questions?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#052e16" }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ border: "1px solid #dcfce7", borderRadius: 12, overflow: "hidden", background: open === i ? "#f0fdf4" : "#fff" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left"
              }}>
                <span style={{ fontWeight: 600, color: "#052e16", fontSize: 15 }}>{f.q}</span>
                <span style={{ color: "#16a34a", fontSize: 20, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", color: "#4b5563", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ background: "linear-gradient(135deg,#052e16,#14532d)", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ color: "#fff" }}>
          <div style={{ color: "#4ade80", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Reach Out</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>Get a Free Quote Today</h2>
          <p style={{ color: "#a7f3d0", fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
            Fill out the form or reach us directly. We'll get back to you quickly with transparent, upfront pricing.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              ["📞", "Phone", "(972) 498-1047", "tel:9724981047"],
              ["🌐", "Website", "texasgreenplumbing.com", "https://texasgreenplumbing.com"],
              ["📍", "Address", "1300 E Arapaho Rd #101, Richardson, TX 75081", null],
              ["🕐", "Hours", "Mon–Sat: 8AM – 6PM", null],
            ].map(([icon, label, value, href]) => (
              <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, background: "rgba(74,222,128,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ color: "#86efac", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ color: "#fff", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>{value}</a>
                  ) : (
                    <div style={{ color: "#fff", fontSize: 15, fontWeight: 500 }}>{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: 36 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#052e16", marginBottom: 12 }}>Request Sent!</h3>
              <p style={{ color: "#4b5563", lineHeight: 1.6 }}>Thank you, {form.name}! We'll contact you within 2 hours to discuss your plumbing needs.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); }}
                style={{ marginTop: 20, background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600 }}>
                Submit Another
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#052e16", marginBottom: 24 }}>Request a Quote</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { key: "name", label: "Full Name *", placeholder: "John Smith", type: "text" },
                  { key: "phone", label: "Phone Number *", placeholder: "(972) 555-0000", type: "tel" },
                  { key: "email", label: "Email Address", placeholder: "john@email.com", type: "email" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                      onFocus={e => e.target.style.borderColor = "#16a34a"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Service Needed</label>
                  <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 15, background: "#fff", boxSizing: "border-box", fontFamily: "inherit" }}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message</label>
                  <textarea placeholder="Describe your issue..." value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={3} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 15, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = "#16a34a"}
                    onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <button onClick={handleSubmit} disabled={loading || !form.name || !form.phone}
                  style={{
                    background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "13px",
                    fontSize: 15, fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: !form.name || !form.phone ? 0.6 : 1,
                    marginTop: 4, transition: "opacity 0.2s"
                  }}>
                  {loading ? "Sending..." : "Request Free Quote →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@media(max-width:700px){#contact > div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function Footer({ scrollTo }) {
  return (
    <footer style={{ background: "#020d07", color: "#a7f3d0", padding: "48px 5vw 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#16a34a,#4ade80)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌱</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: 16 }}>Texas Green Plumbing</div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#6ee7b7" }}>Richardson's trusted eco-friendly plumbing professionals since 2014.</p>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Services</div>
            {SERVICES.slice(0, 4).map(s => (
              <div key={s.title} style={{ color: "#6ee7b7", fontSize: 13, marginBottom: 8, cursor: "pointer" }}
                onClick={() => scrollTo("services")}>{s.title}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Quick Links</div>
            {["About", "Reviews", "FAQ", "Contact"].map(l => (
              <div key={l} style={{ color: "#6ee7b7", fontSize: 13, marginBottom: 8, cursor: "pointer" }} onClick={() => scrollTo(l.toLowerCase())}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Contact</div>
            <div style={{ color: "#6ee7b7", fontSize: 13, lineHeight: 1.8 }}>
              1300 E Arapaho Rd #101<br />Richardson, TX 75081<br />
              <a href="tel:9724981047" style={{ color: "#4ade80", textDecoration: "none" }}>(972) 498-1047</a><br />
              Mon–Sat: 8AM – 6PM
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #052e16", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#4b5563" }}>© 2025 Texas Green Plumbing. All rights reserved.</div>
          <div style={{ fontSize: 13, color: "#4b5563" }}>Licensed · Bonded · Insured · Texas License #XXXXXX</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <NavBar scrollTo={scrollTo} />
        <Hero scrollTo={scrollTo} />
        <Services />
        <About />
        <Reviews />
        <FAQ />
        <Contact />
        <Footer scrollTo={scrollTo} />

        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 200,
          display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end"
        }}>
          <a href="tel:9724981047" style={{
            background: "#16a34a", color: "#fff", padding: "12px 20px", borderRadius: 100,
            textDecoration: "none", fontWeight: 700, fontSize: 15, boxShadow: "0 4px 20px rgba(22,163,74,0.4)",
            display: "flex", alignItems: "center", gap: 8
          }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </>
  );
}