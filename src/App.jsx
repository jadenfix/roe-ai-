// App.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';

/********************
 * Helper Components
 *******************/

// Slide wrapper with intersection observer + a11y attributes
const Slide = ({ id, className = '', children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: false });
  const titleId = `${id}-title`;

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      tabIndex={0}
      className={`slide-container ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isInView ? 1 : 0.3, y: isInView ? 0 : 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {React.Children.map(children, child =>
        typeof child === 'object' && child?.props?.isTitle
          ? React.cloneElement(child, { id: titleId })
          : child
      )}
    </motion.section>
  );
};

// Animated text block
const AnimatedText = ({ as: Tag = 'div', delay = 0, className = '', isTitle = false, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2, once: true });
  const MotionTag = motion(Tag);
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
};

/********************
 * Slides Metadata
 *******************/

const slidesMeta = [
  { id: 'hero', label: 'Title' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'solution', label: 'Solution' },
  { id: 'roi-kpi', label: 'ROI & KPIs' },
  { id: 'gap-roadmap', label: 'Gap Roadmap' },
  { id: 'red-flags', label: 'Red Flags' },
  { id: 'sql', label: 'SQL Examples' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'pilot', label: 'Pilot' },
  { id: 'cta', label: 'Call-to-Action' }
];

/********************
 * Navigation + Progress
 *******************/

const Navigation = ({ active, scrollTo }) => {
  const navSlides = useMemo(() => slidesMeta, []);
  return (
    <div className="nav-indicator">
      {navSlides.map(s => (
        <button
          key={s.id}
          className={`nav-dot ${active === s.id ? 'active' : ''}`}
          onClick={() => scrollTo(s.id)}
          title={s.label}
          aria-label={`Jump to ${s.label}`}
        />
      ))}
    </div>
  );
};

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="progress-bar" style={{ scaleX, transformOrigin: '0%' }} />;
};

/********************
 * Main App
 *******************/

export default function App() {
  const [active, setActive] = useState('hero');

  // Smooth scroll helper
  const scrollTo = useCallback(id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const order = slidesMeta.map(s => s.id);
      const idx = order.indexOf(active);
      const next = e.key === 'ArrowDown' ? order[idx + 1] : order[idx - 1];
      if (next) scrollTo(next);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, scrollTo]);

  // Track active slide via IntersectionObserver on root
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const vis = entries.find(e => e.isIntersecting);
        if (vis) setActive(vis.target.id);
      },
      { threshold: 0.4 }
    );
    slidesMeta.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ProgressBar />
      <Navigation active={active} scrollTo={scrollTo} />

      {/* Slide 0 – Title */}
      <Slide id="hero" className="hero">
        <AnimatedText delay={0} isTitle className="slide-title brand">
          Roe-AI Lite
        </AnimatedText>
        <AnimatedText delay={0.2} className="slide-subtitle">
          Automated Merchant-Risk Compliance for AcquirePay
        </AnimatedText>
        <AnimatedText delay={0.4} className="slide-text">
          Jaden Fix · Solutions Engineer
        </AnimatedText>
      </Slide>

      {/* Slide 1 – Challenge */}
      <Slide id="challenge">
        <AnimatedText isTitle className="slide-title">
          The $10 M Compliance Challenge
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">20 000+ sites mutate daily—humans can't keep up</AnimatedText>
          <AnimatedText as="li">Multi-million-dollar fines & rising chargebacks</AnimatedText>
          <AnimatedText as="li">Analysts waste hours chasing false positives</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 2 – Solution */}
      <Slide id="solution">
        <AnimatedText isTitle className="slide-title brand">
          Meet Roe-AI Lite Sentinel
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">24/7 monitoring — nightly crawls + &lt;5-min deltas</AnimatedText>
          <AnimatedText as="li">SQL-native agents — analysts write plain SQL</AnimatedText>
          <AnimatedText as="li">Signal fusion — web, Trustpilot, BBB, socials</AnimatedText>
          <AnimatedText as="li">Immutable audit — ClickHouse + S3 logs</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 3 – ROI & KPIs */}
      <Slide id="roi-kpi" className="brand-bg">
        <AnimatedText isTitle className="slide-title white">
          Quantified ROI & KPIs
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">80 % fewer compliance violations</AnimatedText>
          <AnimatedText as="li">75 % analyst-hour reduction</AnimatedText>
          <AnimatedText as="li">15–20 % fraud-detection lift</AnimatedText>
          <AnimatedText as="li">Payback &lt; 90 days</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 4 – Gap Roadmap */}
      <Slide id="gap-roadmap">
        <AnimatedText isTitle className="slide-title">
          Gap-Analysis Roadmap
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">Workflow & escalation paths</AnimatedText>
          <AnimatedText as="li">Tech stack & data sources</AnimatedText>
          <AnimatedText as="li">True cost of manual review</AnimatedText>
          <AnimatedText as="li">Risk-policy definitions & thresholds</AnimatedText>
          <AnimatedText as="li">Stakeholders & decision-makers</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 5 – Red Flags */}
      <Slide id="red-flags">
        <AnimatedText isTitle className="slide-title">
          Anticipating Red Flags
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">Vague answers → live process-mapping</AnimatedText>
          <AnimatedText as="li">"We're fine" → benchmark reveal</AnimatedText>
          <AnimatedText as="li">Missing execs → brief & roles map</AnimatedText>
          <AnimatedText as="li">Feature focus → refocus on outcomes</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 6 – SQL Examples */}
      <Slide id="sql" className="dark-bg">
        <AnimatedText isTitle className="slide-title white">
          Analyst-Friendly SQL
        </AnimatedText>
        <AnimatedText delay={0.2} className="slide-text" style={{ color: '#f9e46b' }}>
          roe_ai_agent()
        </AnimatedText>
        <AnimatedText delay={0.4} className="slide-text">
          • Prohibited-item scan <br/>
          • Business-model classification <br/>
          • Reputation synthesis
        </AnimatedText>
      </Slide>

      {/* Slide 7 – Architecture */}
      <Slide id="architecture">
        <AnimatedText isTitle className="slide-title">
          Secure Integration Architecture
        </AnimatedText>
        <AnimatedText delay={0.2}>
          <img src="/architecture.png" alt="Batch & real-time architecture" className="slide-image" style={{ width: '90%', maxWidth: 800 }} />
        </AnimatedText>
      </Slide>

      {/* Slide 8 – Pilot */}
      <Slide id="pilot">
        <AnimatedText isTitle className="slide-title">
          30-Day Pilot Timeline
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">Week 1 — VPC peering & access</AnimatedText>
          <AnimatedText as="li">Week 2 — First crawl & baseline scores</AnimatedText>
          <AnimatedText as="li">Week 3 — Dashboards live; training</AnimatedText>
          <AnimatedText as="li">Week 4 — KPI review & production green-light</AnimatedText>
        </ul>
      </Slide>

      {/* Slide 9 – CTA */}
      <Slide id="cta">
        <AnimatedText isTitle className="slide-title">
          Ready to Eliminate Blind Spots?
        </AnimatedText>
        <ul className="slide-list">
          <AnimatedText as="li">1. Gap-analysis workshop (2 h)</AnimatedText>
          <AnimatedText as="li">2. Architecture review</AnimatedText>
          <AnimatedText as="li">3. POC sandbox on your data</AnimatedText>
        </ul>
        <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '1.5rem' }}>
          Jaden Fix · jaden@roe-ai.com
        </AnimatedText>
      </Slide>
    </>
  );
}