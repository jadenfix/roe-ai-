// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, useInView, useScroll, useSpring } from 'framer-motion';

const SLIDES = [
  { id: 'hero', label: 'Hero' },
  { id: 'contents', label: 'Executive Summary' },
  { id: 'challenge', label: '1 The Challenge' },
  { id: 'solution', label: '2 The Solution' },
  { id: 'roi', label: '3 Pilot Hypotheses' },
  { id: 'objections', label: '3.2 Objections & Responses' },
  { id: 'kpis', label: '3.3 KPIs' },
  { id: 'gap-intro', label: '4 Discovery Intro' },
  { id: 'critical-gaps', label: '5 Critical Information Gaps' },
  { id: 'discovery-questions', label: '6 Discovery Questions' },
  { id: 'red-flags', label: '7 Anticipating Red Flags' },
  { id: 'deepdive-intro', label: '8 Deep Dive Intro' },
  { id: 'sql1', label: '9.1 Keyword Scan' },
  { id: 'sql2', label: '9.2 Business Classification' },
  { id: 'sql3', label: '9.3 Reputation Analysis' },
  { id: 'architecture', label: '10 Integration Architecture' },
  { id: 'matrix', label: '11 Risk Matrix' },
  { id: 'pilot', label: '12 Pilot Plan' },
  { id: 'thanks', label: '13 Next Steps' },
];

// Slide component with animations
const Slide = ({ children, className = '', id, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: false });

  return (
    <Motion.section
      ref={ref}
      id={id}
      className={`slide-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      <div className="slide-content">
        {children}
      </div>
    </Motion.section>
  );
};

// Animated text component
const AnimatedText = ({ children, delay = 0, className = '', as = 'div', ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: true });
  const MotionElement = Motion[as];

  return (
    <MotionElement
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </MotionElement>
  );
};

// Navigation component
const Navigation = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav-indicator">
      {SLIDES.map((slide) => (
        <button
          type="button"
          aria-label={slide.label}
          aria-current={activeSection === slide.id ? "step" : undefined}
          key={slide.id}
          className={`nav-dot ${activeSection === slide.id ? 'active' : ''}`}
          onClick={() => scrollToSection(slide.id)}
          title={slide.label}
        />
      ))}
    </div>
  );
};

// Progress bar component
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Motion.div
      className="progress-bar"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
};

// Main App component
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { threshold: 0, rootMargin: '-20% 0px -50% 0px' });
    document.querySelectorAll('.slide-container').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      const direction = ['ArrowDown', 'ArrowRight', 'PageDown'].includes(event.key)
        ? 1
        : ['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;

      event.preventDefault();
      const currentIndex = Math.max(0, SLIDES.findIndex((slide) => slide.id === activeSection));
      const nextIndex = Math.min(SLIDES.length - 1, Math.max(0, currentIndex + direction));
      document.getElementById(SLIDES[nextIndex].id)?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  return (
    <>
      <ProgressBar />
      <Navigation activeSection={activeSection} />
      <aside className="demo-disclosure" data-testid="demo-disclosure" aria-label="Demo scope">
        <span className="demo-disclosure__dot" aria-hidden="true" />
        Illustrative concept · synthetic examples · no live customer data
      </aside>
      
      {/* Hero Slide */}
      <Slide id="hero" className="hero">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText delay={0}>
            <img
              src="/roe_ai_logo.jpeg"
              alt="Roe AI Logo"
              className="roe-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-title brand">
            Roe-AI Lite
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-subtitle">
            Merchant Risk Intelligence · Illustrative Case Study
          </AnimatedText>
          <AnimatedText delay={0.6} className="slide-text">
            Provider-free presentation demo · not a production deployment
          </AnimatedText>
        </div>
      </Slide>

      {/* Executive Summary */}
      <Slide id="contents">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            Executive Summary
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-text" style={{ fontSize: '1.8rem', lineHeight: 1.4 }}>
            <strong>I.</strong> Solution Brief → <strong>II.</strong> Gap Analysis Guide → <strong>III.</strong> Technical Deep Dive
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '2rem', fontSize: '1.4rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
            A proposed workflow from manual review to evidence-backed risk triage
          </AnimatedText>
        </div>
      </Slide>

      {/* I. SOLUTION BRIEF */}
      
      {/* 1. The Challenge */}
      <Slide id="challenge">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            I. Solution Brief
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            1. The Illustrative Compliance Challenge
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Large merchant portfolios</strong> can change faster than manual review cycles
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Analyst fatigue</strong> leads to missed violations and compliance gaps
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Regulatory and chargeback exposure</strong> makes review quality consequential
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Hidden operational costs</strong> — FTE hours, false positives, manual escalations
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* 2. The Solution */}
      <Slide id="solution">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title brand">
            2. Roe-AI Lite Sentinel
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--neutral-700)', marginBottom: '2rem' }}>
            Proposed Risk-Triage Architecture
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Scheduled Monitoring</strong> — candidate batch crawls plus change detection
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>SQL-Native Review Interface</strong> — proposed analyst-friendly query patterns
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Multi-Source Signal Fusion</strong> — example website and reputation-source inputs
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Reviewable Audit Trail</strong> — proposed evidence and decision receipts
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* 3. ROI Metrics */}
      <Slide id="roi" className="brand-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            3. Pilot Hypotheses
          </AnimatedText>
          <AnimatedText className="stat-number">
            Measure
          </AnimatedText>
          <AnimatedText delay={0.2} className="stat-label">
            Before claiming improvement
          </AnimatedText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <AnimatedText delay={0.4} className="stat-sub">
              <strong>Efficiency:</strong> review time per merchant
            </AnimatedText>
            <AnimatedText delay={0.6} className="stat-sub">
              <strong>Quality:</strong> precision, recall, and abstention rate
            </AnimatedText>
            <AnimatedText delay={0.8} className="stat-sub">
              <strong>Safety:</strong> escalation and policy-miss rates
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* 3.2 Objections & Counterarguments */}
      <Slide id="objections">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            3.2 Potential Objections & Counters
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>"Budget is tight—how justify cost?"</strong><br/>
              Response: compare pilot operating cost with an agreed manual baseline.
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>"AI will be complex to maintain."</strong><br/>
              Response: validate the smallest maintainable workflow during the pilot.
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>"We have existing monitoring tools."</strong><br/>
              Response: test a read-only integration path before proposing replacement.
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>"False positives will overwhelm analysts."</strong><br/>
              Response: measure precision, recall, and abstention on reviewed examples.
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* 3.3 Key Performance Indicators */}
      <Slide id="kpis">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            3.3 Key Performance Indicators
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Policy Review Quality</strong> → precision, recall, and adjudicated misses
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Detection Speed</strong> → observed end-to-end latency distribution
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Downstream Outcomes</strong> → monitored, not attributed without evidence
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Analyst Productivity</strong> → reviewed cases per hour and correction rate
            </AnimatedText>
            <AnimatedText delay={0.6} as="li">
              <strong>Stakeholder Confidence</strong> ↑ via surveys/executive reports
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* II. GAP ANALYSIS GUIDE */}

      {/* Gap Analysis Intro */}
      <Slide id="gap-intro">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            II. Gap Analysis Guide
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Structured Discovery Roadmap
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ fontSize: '1.6rem', lineHeight: 1.5 }}>
            A discovery framework for a fictional merchant-risk team. Any real deployment would
            require customer-specific policy, security, and data validation.
          </AnimatedText>
        </div>
      </Slide>

      {/* 5. Critical Information Gaps */}
      <Slide id="critical-gaps">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            5. Critical Information Gaps
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Current Monitoring Workflow:</strong> Who, cadence, escalation paths
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Existing Tech Stack & Data Sources:</strong> APIs, SFTP, BI tools
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Operational Cost:</strong> FTE hours, tool spend, false-positive rates
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Risk Policy & Definitions:</strong> Prohibited lists, geo-rules, thresholds
            </AnimatedText>
            <AnimatedText delay={0.6} as="li">
              <strong>Team Structure & Stakeholders:</strong> Roles, decision-makers, owners
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* 6. Discovery Questions */}
      <Slide id="discovery-questions">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            6. Impact × Discovery Questions
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Current Workflow (High):</strong> "Walk me through end-to-end merchant monitoring..."
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Tech Stack (High):</strong> "What orchestration tools and data stores do you use?"
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Cost of Monitoring (High):</strong> "How many merchants per FTE per month?"
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Risk Policies (High):</strong> "Can we review your Acceptable Use Policy?"
            </AnimatedText>
            <AnimatedText delay={0.6} as="li">
              <strong>Stakeholders (Medium):</strong> "Who owns compliance & pilot sign-off?"
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* 7. Anticipating Red Flags */}
      <Slide id="red-flags">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            7. Anticipating Red Flags
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Vague Answers:</strong> May hide tribal knowledge → co-map workflows live
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>"We're fine" Attitude:</strong> Use benchmarks to reveal gaps
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>No Decision-Maker Access:</strong> Map roles & request executive briefs
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Feature-Only Focus:</strong> Reframe to outcomes (hours saved, fines avoided)
            </AnimatedText>
            <AnimatedText delay={0.6} as="li">
              <strong>Analysis Paralysis:</strong> Propose time-boxed pilot with clear success metrics
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* III. TECHNICAL DEEP DIVE */}

      {/* Technical Deep Dive Intro */}
      <Slide id="deepdive-intro">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            III. Technical Deep Dive
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            From Analyst-Friendly SQL to Proposed Architecture
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ fontSize: '1.6rem', lineHeight: 1.5 }}>
            Three illustrative query patterns for discussing merchant-risk review.
          </AnimatedText>
        </div>
      </Slide>

      {/* 9.1 Keyword Scan */}
      <Slide id="sql1" className="dark-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            9.1 Prohibited-Item Keyword Scan
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="code-container">
              <pre>
                <code style={{ color: '#ff6b6b' }}>SELECT</code> <code style={{ color: '#ffd93d' }}>m.merchant_id</code>, <code style={{ color: '#ffd93d' }}>m.business_name</code>,{'\n'}
                {'       '}<code style={{ color: '#6bcf7f' }}>roe_ai_agent</code>(<code style={{ color: '#ffd93d' }}>m.homepage_url</code>, <code style={{ color: '#a29bfe' }}>'prohibited_keywords'</code>) <code style={{ color: '#ff6b6b' }}>AS</code> <code style={{ color: '#ffd93d' }}>violation_check</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>FROM</code> <code style={{ color: '#74b9ff' }}>merchants</code> <code style={{ color: '#ffd93d' }}>m</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>WHERE</code> <code style={{ color: '#ffd93d' }}>violation_check</code>.<code style={{ color: '#ffd93d' }}>has_violation</code> <code style={{ color: '#ff7675' }}>=</code> <code style={{ color: '#a29bfe' }}>TRUE</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>ORDER BY</code> <code style={{ color: '#ffd93d' }}>violation_check</code>.<code style={{ color: '#ffd93d' }}>confidence</code> <code style={{ color: '#ff6b6b' }}>DESC</code>;
              </pre>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ color: 'var(--neutral-300)', marginTop: '2rem' }}>
            Flags banned terms (vape, CBD, kratom) with TRUE/FALSE plus context snippets
          </AnimatedText>
        </div>
      </Slide>

      {/* 9.2 Business Classification */}
      <Slide id="sql2" className="dark-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            9.2 Business-Model Classification
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="code-container">
              <pre>
                <code style={{ color: '#ff6b6b' }}>SELECT</code> <code style={{ color: '#ffd93d' }}>m.merchant_id</code>,{'\n'}
                {'       '}<code style={{ color: '#6bcf7f' }}>roe_ai_agent</code>(<code style={{ color: '#ffd93d' }}>m.homepage_url</code>, <code style={{ color: '#a29bfe' }}>'business_classification'</code>) <code style={{ color: '#ff6b6b' }}>AS</code> <code style={{ color: '#ffd93d' }}>category</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>FROM</code> <code style={{ color: '#74b9ff' }}>merchants</code> <code style={{ color: '#ffd93d' }}>m</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>WHERE</code> <code style={{ color: '#ffd93d' }}>category</code>.<code style={{ color: '#ffd93d' }}>classification</code> <code style={{ color: '#ff7675' }}>LIKE</code> <code style={{ color: '#a29bfe' }}>'%Unregulated%'</code>{'\n'}
                {'   '}<code style={{ color: '#ff6b6b' }}>AND</code> <code style={{ color: '#ffd93d' }}>category</code>.<code style={{ color: '#ffd93d' }}>confidence</code> <code style={{ color: '#ff7675' }}>&gt;</code> <code style={{ color: '#a29bfe' }}>0.85</code>;
              </pre>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ color: 'var(--neutral-300)', marginTop: '2rem' }}>
            Illustrative query only; no classifier or confidence result runs in this repository
          </AnimatedText>
        </div>
      </Slide>

      {/* 9.3 Reputation Analysis */}
      <Slide id="sql3" className="dark-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            9.3 Reputation & Fraud-Risk Analysis
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="code-container">
              <pre>
                <code style={{ color: '#ff6b6b' }}>SELECT</code> <code style={{ color: '#ffd93d' }}>m.merchant_id</code>,{'\n'}
                {'       '}<code style={{ color: '#6bcf7f' }}>roe_ai_agent</code>([<code style={{ color: '#ffd93d' }}>m.homepage_url</code>, <code style={{ color: '#ffd93d' }}>trustpilot_url</code>, <code style={{ color: '#ffd93d' }}>bbb_url</code>],{'\n'}
                {'                    '}<code style={{ color: '#a29bfe' }}>'reputation_synthesis'</code>) <code style={{ color: '#ff6b6b' }}>AS</code> <code style={{ color: '#ffd93d' }}>reputation</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>FROM</code> <code style={{ color: '#74b9ff' }}>merchants</code> <code style={{ color: '#ffd93d' }}>m</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>WHERE</code> <code style={{ color: '#ffd93d' }}>reputation</code>.<code style={{ color: '#ffd93d' }}>fraud_risk_score</code> <code style={{ color: '#ff7675' }}>&gt;</code> <code style={{ color: '#a29bfe' }}>0.7</code>;
              </pre>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ color: 'var(--neutral-300)', marginTop: '2rem' }}>
            Illustrative query only; no external sources or provider requests run in this repository
          </AnimatedText>
        </div>
      </Slide>

      {/* 10. Integration Architecture */}
      <Slide id="architecture">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            10. Integration Architecture
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Proposed Multi-Source Signal-Fusion Boundary
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <img
              src="/architecture.svg"
              alt="Illustrative merchant-risk review architecture showing evidence intake, policy checks, analyst review, and decision receipts"
              className="slide-image"
              style={{ width: '90%', maxWidth: '1000px' }}
            />
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
            Architecture discussion only. Latency, throughput, security, and scaling targets require
            measurement in the intended environment.
          </AnimatedText>
        </div>
      </Slide>

      {/* 11. Risk Matrix */}
      <Slide id="matrix">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            11. Risk Prioritization Framework
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Impact × Frequency Matrix
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="matrix-container">
              <img
                src="/matrix.svg"
                alt="Risk prioritization matrix showing high-impact, high-frequency violations"
                className="slide-image"
                style={{ width: '100%', maxWidth: '700px' }}
              />
              <div className="matrix-description">
                <strong>Strategic Focus:</strong> High-impact, high-frequency risks like vape/kratom sales 
                and sanctions violations get immediate AI attention, while low-risk items use automated screening.
              </div>
            </div>
          </AnimatedText>
        </div>
      </Slide>

      {/* 12. Pilot Plan */}
      <Slide id="pilot">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            12. 30-Day Pilot Implementation
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Example Planning Sequence
          </AnimatedText>
          <div className="timeline">
            <AnimatedText delay={0.2} className="timeline-item">
              <h3>Week 1</h3>
              <p><strong>Scope & Baseline</strong><br/>Policy, evidence, access, and success-metric review</p>
            </AnimatedText>
            <AnimatedText delay={0.3} className="timeline-item">
              <h3>Week 2</h3>
              <p><strong>Fixture Replay</strong><br/>Provider-free examples and deterministic receipt checks</p>
            </AnimatedText>
            <AnimatedText delay={0.4} className="timeline-item">
              <h3>Week 3</h3>
              <p><strong>Read-Only Pilot</strong><br/>Analyst review, correction logging, and failure analysis</p>
            </AnimatedText>
            <AnimatedText delay={0.5} className="timeline-item">
              <h3>Week 4</h3>
              <p><strong>Decision Gate</strong><br/>KPI review and explicit go, revise, or stop decision</p>
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* 13. Next Steps */}
      <Slide id="thanks">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            13. Ready to Validate the Workflow?
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Next Steps
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Gap Analysis Workshop</strong> — 2-hour discovery session with your compliance team
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Technical Architecture Review</strong> — Infrastructure prerequisites & integration planning
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Fixture Environment Setup</strong> — synthetic examples before any live-data discussion
            </AnimatedText>
          </ul>
          <AnimatedText delay={0.6} className="slide-text" style={{ marginTop: '3rem', fontSize: '1.3rem', color: 'var(--brand-primary)', fontWeight: 700 }}>
            Validate the evidence before making production or performance claims
          </AnimatedText>
          <AnimatedText delay={0.7} className="slide-text" style={{ marginTop: '1rem' }}>
            <strong>Jaden Fix</strong> · Portfolio presentation demo
          </AnimatedText>
        </div>
      </Slide>
    </>
  );
}
