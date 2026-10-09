"use client";

import { useState } from "react";
import {
  Activity,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  Layers3,
  Menu,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { projectSavings } from "@/lib/calculator.mjs";
import { AnimatedAmount, usePreviewTilt, useScrollReveals } from "./motion";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
const compact = (value: number) =>
  value >= 10000000
    ? `₹${(value / 10000000).toFixed(2)} cr`
    : `₹${(value / 100000).toFixed(2)} lakh`;
const faqs = [
  [
    "What is Fermor?",
    "Fermor helps you make sense of everyday money decisions with financial calculators and clear educational content. Its broader vision brings understanding, planning, and investing into one place.",
  ],
  [
    "Do I need to know about investing to get started?",
    "No. Start with a question you already have, like how much to save each month. Explore the calculator, change one number at a time, and see what changes.",
  ],
  [
    "Are the calculator results guaranteed?",
    "No. Results are illustrations based on a constant assumed return, with contributions made at the end of each month. Actual returns vary. Taxes, fees, and inflation are not included.",
  ],
  [
    "Does Fermor provide financial advice?",
    "Fermor provides educational tools and information. It is not a SEBI-registered investment adviser. Consider your circumstances and consult a qualified adviser for personal financial advice.",
  ],
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#"
      aria-label="Fermor home"
    >
      <span className="brand-icon" aria-hidden="true">
        f
      </span>
      fermor<span className="brand-period">.</span>
    </a>
  );
}

function Overview() {
  const [tab, setTab] = useState("Overview");
  const tiltRef = usePreviewTilt();
  const labels: Record<string, [string, number]> = {
    Overview: ["Your net worth", 842500],
    Investments: ["Your investments", 568000],
    Savings: ["Your savings", 274500],
  };
  return (
    <div className="hero-product" ref={tiltRef}>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="dashboard">
        <div className="dashboard-heading">
          <span className="mini-brand">
            f<span>My money</span>
          </span>
          <span className="avatar">A</span>
        </div>
        <div
          className="dashboard-tabs"
          role="group"
          aria-label="Financial preview"
        >
          {Object.keys(labels).map((t) => (
            <button
              aria-pressed={tab === t}
              aria-controls="overview-panel"
              id={`tab-${t}`}
              key={t}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div id="overview-panel" role="region" aria-labelledby={`tab-${tab}`}>
          <div className="balance-caption">
            {labels[tab][0]}
            <span>
              INR <ChevronDown size={12} />
            </span>
          </div>
          <div className="balance">
            <AnimatedAmount value={labels[tab][1]} format={money} />
          </div>
          <p className="positive">
            <TrendingUp size={13} /> 12.8% <span>over the last year</span>
          </p>
          <svg
            key={tab}
            className="hero-chart"
            viewBox="0 0 360 135"
            role="img"
            aria-label="Illustrative upward financial trend"
          >
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bddb91" stopOpacity=".65" />
                <stop offset="100%" stopColor="#bddb91" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="chart-grid" d="M0 25H360 M0 65H360 M0 105H360" />
            <path
              className="chart-area"
              d="M0 123 L24 115 L45 119 L68 94 L91 99 L113 83 L139 91 L162 66 L183 74 L207 44 L230 53 L253 29 L280 37 L306 17 L330 23 L355 7 V135 H0Z"
              fill="url(#chart-fill)"
            />
            <path
              className="chart-stroke"
              pathLength="1"
              d="M0 123 L24 115 L45 119 L68 94 L91 99 L113 83 L139 91 L162 66 L183 74 L207 44 L230 53 L253 29 L280 37 L306 17 L330 23 L355 7"
              fill="none"
              stroke="#527c46"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="chart-months">
            <span>APR</span>
            <span>JUN</span>
            <span>AUG</span>
            <span>OCT</span>
            <span>DEC</span>
            <span>MAR</span>
          </div>
        </div>
        <div className="account-row">
          <span>
            <i className="investment-dot" />
            Investments
          </span>
          <strong>₹5,68,000</strong>
        </div>
        <div className="account-row">
          <span>
            <i className="savings-dot" />
            Savings
          </span>
          <strong>₹2,74,500</strong>
        </div>
        <div className="dashboard-note">
          An illustrative view of what’s possible
        </div>
      </div>
      <div className="floating-insight">
        <span className="insight-icon">
          <Sparkles size={19} />
        </span>
        <div>
          <strong>A little more clarity.</strong>
          <p>Your next move starts here.</p>
        </div>
      </div>
      <div className="floating-goal">
        <span className="goal-icon">
          <Compass size={19} />
        </span>
        <span>
          Your next adventure<strong>One step closer.</strong>
        </span>
        <div className="goal-progress">
          <span />
        </div>
      </div>
    </div>
  );
}

function Calculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(10);
  const result = projectSavings(monthly, years, rate);
  const timeline = Array.from({ length: 12 }, (_, i) =>
    projectSavings(monthly, (years * (i + 1)) / 12, rate),
  );
  const controls = [
    {
      label: "Monthly investment",
      value: monthly,
      set: setMonthly,
      min: 500,
      max: 50000,
      step: 500,
      display: money(monthly),
      start: "₹500",
      end: "₹50,000",
    },
    {
      label: "Time to grow",
      value: years,
      set: setYears,
      min: 1,
      max: 30,
      step: 1,
      display: `${years} years`,
      start: "1 year",
      end: "30 years",
    },
    {
      label: "Expected annual return",
      value: rate,
      set: setRate,
      min: 0,
      max: 20,
      step: 0.5,
      display: `${rate}%`,
      start: "0%",
      end: "20%",
    },
  ];
  return (
    <section className="calculator-section section" id="calculator">
      <div className="section-intro">
        <span className="eyebrow">SMALL STEPS. REAL POSSIBILITIES.</span>
        <h2>
          Your future has
          <br />a starting point.
        </h2>
        <p>
          It doesn’t have to be a big number.
          <br />
          See what a little consistency could add up to.
        </p>
        <div className="calculator-callout">
          <span>
            <TrendingUp size={21} />
          </span>
          <p>
            A habit today.
            <br />
            <strong>More possibilities tomorrow.</strong>
          </p>
        </div>
      </div>
      <div className="calculator-card">
        <div className="calculator-title">
          <h3>The possibility calculator</h3>
          <span>SIP</span>
        </div>
        <div className="calculator-layout">
          <div className="calculator-inputs">
            {controls.map((c, i) => (
              <div className="slider-control" key={c.label}>
                <label htmlFor={`slider-${i}`}>
                  {c.label}
                  <output htmlFor={`slider-${i}`}>{c.display}</output>
                </label>
                <input
                  id={`slider-${i}`}
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={c.value}
                  onChange={(e) => c.set(Number(e.target.value))}
                  style={
                    {
                      "--range-progress": `${((c.value - c.min) / (c.max - c.min)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className="range-ends">
                  <span>{c.start}</span>
                  <span>{c.end}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="calculator-result"
            aria-live="polite"
            aria-atomic="true"
          >
            <span>In {years} years, you could have</span>
            <strong>
              <AnimatedAmount value={result.total} format={compact} />
            </strong>
            <div className="result-bars" aria-hidden="true">
              {timeline.map((point, i) => (
                <div
                  key={i}
                  style={{
                    height: `${(point.total / result.total) * 100}%`,
                  }}
                >
                  <span
                    style={{
                      height: `${(point.invested / point.total) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="result-key">
              <span>
                <i />
                You invest
              </span>
              <b>{compact(result.invested)}</b>
            </div>
            <div className="result-key">
              <span>
                <i />
                Potential growth
              </span>
              <b>{compact(result.growth)}</b>
            </div>
          </div>
        </div>
        <p className="calculator-disclaimer">
          <CircleHelp size={14} /> Illustrative only. Returns aren’t guaranteed.
          Excludes taxes, fees and inflation.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveals();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav
            className={menuOpen ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            <a href="#possibilities" onClick={() => setMenuOpen(false)}>
              Why Fermor
            </a>
            <a href="#calculator" onClick={() => setMenuOpen(false)}>
              Tools
            </a>
            <a href="#learn" onClick={() => setMenuOpen(false)}>
              Learn
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQs
            </a>
          </nav>
          <a className="button button-small nav-cta" href="#calculator">
            Find your starting point
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span /> YOUR MONEY. A CLEARER PICTURE.
            </div>
            <h1>
              A little clarity.
              <br />A lot of <em>possibility.</em>
            </h1>
            <p>
              Understand your money. Make a plan.
              <br className="desktop-break" /> Move forward with a little more
              confidence.
            </p>
            <div className="hero-actions">
              <a className="button" href="#calculator">
                Find your starting point
              </a>
              <a className="text-link" href="#possibilities">
                Meet Fermor <span className="small-play">▶</span>
              </a>
            </div>
            <div className="hero-assurance">
              <span>
                <Check size={14} /> Simple tools
              </span>
              <span>
                <Check size={14} /> Clear explanations
              </span>
              <span>
                <Check size={14} /> Your pace
              </span>
            </div>
          </div>
          <Overview />
        </section>
        <div className="belief-strip">
          <span>BIG DREAMS START WITH SMALL DECISIONS.</span>
          <p>
            A first investment.<span>A place of your own.</span>A future with
            more freedom.
          </p>
        </div>
        <section className="possibilities section" id="possibilities">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                LESS OVERWHELM. MORE UNDERSTANDING.
              </span>
              <h2>
                Money feels different
                <br />
                when it makes sense.
              </h2>
            </div>
            <p>
              You don’t need to have it all figured out.
              <br />
              Just a clearer picture of what comes next.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon">
                <Wallet size={23} />
              </span>
              <h3>See the bigger picture.</h3>
              <p>
                Make sense of the pieces, from what you save to what you’re
                working towards.
              </p>
              <div className="mini-allocation">
                <div className="allocation-top">
                  <span>A balanced perspective</span>
                  <Layers3 size={16} />
                </div>
                <div className="allocation-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="allocation-legend">
                  <span>Savings</span>
                  <span>Investments</span>
                  <span>Everyday</span>
                </div>
              </div>
              <span className="feature-caption">01 / UNDERSTAND</span>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <Compass size={23} />
              </span>
              <h3>Give your dreams a plan.</h3>
              <p>
                A home. A little adventure. More breathing room. Explore the
                numbers behind your goals.
              </p>
              <div className="mini-goal">
                <span className="mini-goal-emoji">
                  <Compass size={25} />
                </span>
                <div>
                  <strong>The next chapter</strong>
                  <span>Build it one month at a time</span>
                </div>
                <span className="mini-check">
                  <Check size={15} />
                </span>
              </div>
              <span className="feature-caption">02 / PLAN</span>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <Activity size={23} />
              </span>
              <h3>Start small. Keep growing.</h3>
              <p>
                Get comfortable with the basics and discover how consistent
                habits can go a long way.
              </p>
              <div className="mini-growth">
                <div>
                  <span>Little by little</span>
                  <strong>Progress adds up.</strong>
                </div>
                <div className="growth-columns" aria-hidden="true">
                  {[23, 31, 40, 49, 65, 82].map((h) => (
                    <i key={h} style={{ height: h }} />
                  ))}
                </div>
              </div>
              <span className="feature-caption">03 / GROW</span>
            </article>
          </div>
        </section>
        <Calculator />
        <section className="learn-section section" id="learn">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                A LITTLE KNOW-HOW GOES A LONG WAY.
              </span>
              <h2>Make room for an “aha”.</h2>
            </div>
            <a
              className="text-link"
              href="https://fermor.in/blogs"
              target="_blank"
              rel="noreferrer"
            >
              Explore Fermor’s resources <BookOpen size={16} />
            </a>
          </div>
          <div className="learn-grid">
            <a
              className="learn-card"
              href="https://fermor.in/calculators"
              target="_blank"
              rel="noreferrer"
            >
              <div className="editorial-art art-compound">
                <span>
                  1.01<span>365</span>
                </span>
                <p>Small habits. Compounding possibilities.</p>
              </div>
              <div className="article-meta">
                THE FUNDAMENTALS · INTERACTIVE TOOLS
              </div>
              <h3>Small amounts. A surprisingly big difference.</h3>
              <p>Explore the power of consistency and compound growth.</p>
            </a>
            <a
              className="learn-card"
              href="https://fermor.in/calculators"
              target="_blank"
              rel="noreferrer"
            >
              <div className="editorial-art art-plan">
                <span className="editorial-word">
                  now<span>then.</span>
                </span>
                <span className="editorial-line" />
              </div>
              <div className="article-meta">MONEY & LIFE · PLANNING TOOLS</div>
              <h3>A little planning for life’s bigger moments.</h3>
              <p>Put some numbers behind your next chapter.</p>
            </a>
            <a
              className="learn-card"
              href="https://fermor.in/blogs"
              target="_blank"
              rel="noreferrer"
            >
              <div className="editorial-art art-clarity">
                <span>₹</span>
                <span className="clarity-label">
                  MAKING SENSE
                  <br />
                  OF YOUR MONEY.
                </span>
              </div>
              <div className="article-meta">
                EVERYDAY FINANCE · FURTHER READING
              </div>
              <h3>Less financial jargon. More understanding.</h3>
              <p>Find clear explanations for everyday money questions.</p>
            </a>
          </div>
        </section>
        <section className="faq-section section" id="faq">
          <div>
            <span className="eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
            <h2>A little more clarity.</h2>
            <p>Because understanding comes first.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing section">
          <div className="closing-decoration" aria-hidden="true" />
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS WITH YOU.</span>
          <h2>
            You don’t need all the answers.
            <br />
            Just a place to begin.
          </h2>
          <a className="button button-lime" href="#calculator">
            Find your starting point
          </a>
          <span className="closing-note">
            <ShieldCheck size={15} /> Explore at your own pace.
          </span>
        </section>
      </main>
      <footer className="section">
        <div className="footer-top">
          <div>
            <Brand />
            <p>A little clarity. A lot of possibility.</p>
          </div>
          <div className="footer-links">
            <a href="#possibilities">Why Fermor</a>
            <a href="#calculator">Calculator</a>
            <a href="#learn">Learn</a>
            <a href="https://fermor.in" target="_blank" rel="noreferrer">
              Official website
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fermor · Homepage concept</span>
          <p>
            For educational purposes only. Not investment advice. Product
            visuals use illustrative data.
          </p>
        </div>
      </footer>
    </>
  );
}
