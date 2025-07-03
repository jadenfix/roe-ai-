// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options);

    const { current: currentObserver } = observer;
    return () => currentObserver.disconnect();
  }, [options]);

  const observe = (element) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
    }
  };

  return [entries, { observe, unobserve }];
};

// Slide component with animations
const Slide = ({ children, className = '', id, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: false });

  return (
    <motion.section
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
    </motion.section>
  );
};

// Animated text component
const AnimatedText = ({ children, delay = 0, className = '', ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Navigation component
const Navigation = ({ activeSection }) => {
  const slides = [
    { id: 'hero', label: 'Hero' },
    { id: 'contents', label: 'Contents' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    { id: 'roi', label: 'ROI' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'gaps', label: 'Gaps' },
    { id: 'matrix', label: 'Matrix' },
    { id: 'triggers', label: 'Triggers' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'deepdive', label: 'Deep Dive' },
    { id: 'sql', label: 'SQL' },
    { id: 'pilot', label: 'Pilot' },
    { id: 'thanks', label: 'Thanks' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav-indicator">
      {slides.map((slide) => (
        <div
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
    <motion.div
      className="progress-bar"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
};

// Main App component
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  const [entries] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });

  useEffect(() => {
    const visibleEntry = entries.find(entry => entry.isIntersecting);
    if (visibleEntry) {
      setActiveSection(visibleEntry.target.id);
    }
  }, [entries]);

  return (
    <>
      <ProgressBar />
      <Navigation activeSection={activeSection} />
      
      {/* Hero Slide */}
      <Slide id="hero" className="hero">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          {/* Logo placeholder - will work when logo is added to public/ */}
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
            Merchant Risk Intelligence for AcquirePay
          </AnimatedText>
          <AnimatedText delay={0.6} className="slide-text">
            5-Minute Technical Demo · Jaden Fix, Solutions Engineer
          </AnimatedText>
        </div>
      </Slide>

      {/* Contents Slide */}
      <Slide id="contents">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            Executive Summary
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-text" style={{ fontSize: '1.8rem', lineHeight: 1.4 }}>
            Challenge → AI Solution → Proven ROI → Technical Architecture → Implementation Roadmap
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '2rem', fontSize: '1.4rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
            From manual risk reviews to AI-powered compliance in 30 days
          </AnimatedText>
        </div>
      </Slide>

      {/* Challenge Slide */}
      <Slide id="challenge">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            The $10M Problem
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Why Manual Risk Reviews Are Failing
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>20,000+ merchant sites</strong> change daily — impossible to monitor manually
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Analyst fatigue</strong> leads to missed violations and compliance gaps
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Multi-million dollar fines</strong> from regulatory violations and chargebacks
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Solution Slide */}
      <Slide id="solution">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title brand">
            Roe-AI Lite Sentinel
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--neutral-700)', marginBottom: '2rem' }}>
            AI-Powered Risk Detection at Enterprise Scale
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>24/7 Automated Monitoring</strong> — Nightly full crawls + &lt;5 minute delta detection
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>SQL-Native AI Agents</strong> — 200 pages/minute processing with familiar query syntax
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Immutable Audit Trail</strong> — ClickHouse vectors + S3 compliance logging
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* ROI Slide */}
      <Slide id="roi" className="brand-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="stat-number">
            80%
          </AnimatedText>
          <AnimatedText delay={0.2} className="stat-label">
            Compliance Violations Prevented
          </AnimatedText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <AnimatedText delay={0.4} className="stat-sub">
              <strong>75%</strong> reduction in analyst hours
            </AnimatedText>
            <AnimatedText delay={0.6} className="stat-sub">
              <strong>15-20%</strong> fraud detection improvement
            </AnimatedText>
            <AnimatedText delay={0.8} className="stat-sub">
              <strong>&lt;90 days</strong> to positive ROI
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* Discovery Slide */}
      <Slide id="discovery">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Fast-Track Implementation
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            2-Hour Discovery Workshop
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Workflow Mapping</strong> — Document existing processes & identify integration points
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>KPI Definition</strong> — Set success metrics & compliance benchmarks
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Sandbox Launch</strong> — Live environment with first alerts in 7 days
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Critical Info Gaps Slide */}
      <Slide id="gaps">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Pre-Implementation Checklist
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Critical Data Requirements
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>SKU-Level Data Feeds</strong> — Product catalogs for content analysis
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>Policy Document Locations</strong> — Terms of service & compliance PDFs
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>Historical Training Data</strong> — Past violation examples for model tuning
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>Audit Trail Infrastructure</strong> — Versioned compliance logging setup
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Matrix Slide */}
      <Slide id="matrix">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Risk Prioritization Framework
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
                style={{ width: '100%', maxWidth: '600px' }}
              />
              <div className="matrix-description">
                <strong>Strategic Focus:</strong> High-impact, high-frequency risks like vape/kratom sales 
                and sanctions violations get immediate AI attention, while low-risk items use automated screening.
              </div>
            </div>
          </AnimatedText>
        </div>
      </Slide>

      {/* Red Flag Triggers Slide */}
      <Slide id="triggers">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Automated Detection Rules
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Out-of-the-Box Risk Triggers
          </AnimatedText>
          <ul className="slide-list" style={{ fontSize: '1.8rem' }}>
            <AnimatedText delay={0.2} as="li">
              <strong>🚫 Prohibited Keywords</strong> — Vape, kratom, CBD, and restricted substance detection
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>📈 Price Volatility</strong> — Swings greater than 40% trigger fraud investigation
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              <strong>🆕 New Domain Risk</strong> — Sites less than 90 days old get enhanced scrutiny
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              <strong>🌍 Geographic Anomalies</strong> — IP/location mismatches and geo-fencing violations
            </AnimatedText>
            <AnimatedText delay={0.6} as="li">
              <strong>⚡ Traffic Spikes</strong> — Sudden visitor surges that indicate coordinated attacks
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Architecture Overview Slide */}
      <Slide id="architecture">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            Enterprise Architecture
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Battle-Tested at Scale
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <img
              src="/architecture.png"
              alt="Roe-AI Lite system architecture showing batch and real-time processing pipelines"
              className="slide-image"
              style={{ width: '90%', maxWidth: '1000px' }}
            />
          </AnimatedText>
        </div>
      </Slide>

      {/* Technical Deep Dive Slide */}
      <Slide id="deepdive">
        <div className="tech-deep-dive">
          <AnimatedText delay={0.1}>
            <img
              src="/architecture.png"
              alt="Technical architecture diagram with detailed component breakdown"
              className="slide-image"
              style={{ width: '100%' }}
            />
          </AnimatedText>
          <div className="feature-card">
            <AnimatedText delay={0.2} className="slide-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              Technical Implementation
            </AnimatedText>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>
              <AnimatedText delay={0.3} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Infrastructure Prerequisites:</strong><br/>
                VPC peering, IAM roles, and secure credential management
              </AnimatedText>
              <AnimatedText delay={0.4} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Data Ingestion Pipeline:</strong><br/>
                Nightly SFTP manifest uploads trigger Airflow DAG orchestration
              </AnimatedText>
              <AnimatedText delay={0.5} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Real-Time Processing:</strong><br/>
                SNS event triggers → Fargate containers (99th percentile &lt;5 minutes)
              </AnimatedText>
              <AnimatedText delay={0.6} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>AI Agent Farm:</strong><br/>
                200 pages/minute parallel processing with LLM + SQL hybrid agents
              </AnimatedText>
              <AnimatedText delay={0.7} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Data Storage Strategy:</strong><br/>
                ClickHouse for vector embeddings + S3/MinIO for immutable audit logs
              </AnimatedText>
              <AnimatedText delay={0.8} as="li">
                <strong style={{ color: 'var(--brand-primary)' }}>Alert Distribution:</strong><br/>
                JSON risk scores → Snowflake → Tableau dashboards/Slack/Jira tickets
              </AnimatedText>
            </ul>
          </div>
        </div>
      </Slide>

      {/* SQL Demo Slide */}
      <Slide id="sql" className="dark-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            Developer-Friendly Implementation
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-light)', marginBottom: '2rem' }}>
            2-Line Risk Query
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="code-container">
              <pre>
                <code style={{ color: '#ff6b6b' }}>SELECT</code> <code style={{ color: '#ffd93d' }}>merchant_id</code>,{'\n'}
                {'       '}<code style={{ color: '#6bcf7f' }}>AI_RISK</code>(<code style={{ color: '#ffd93d' }}>page_content</code>) <code style={{ color: '#ff6b6b' }}>AS</code> <code style={{ color: '#ffd93d' }}>risk_score</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>FROM</code> <code style={{ color: '#74b9ff' }}>merchants_crawl_today</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>WHERE</code> <code style={{ color: '#ffd93d' }}>risk_score</code> <code style={{ color: '#ff7675' }}>&gt;</code> <code style={{ color: '#a29bfe' }}>0.8</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>ORDER BY</code> <code style={{ color: '#ffd93d' }}>risk_score</code> <code style={{ color: '#ff6b6b' }}>DESC</code>;
              </pre>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ color: 'var(--neutral-300)', marginTop: '2rem' }}>
            <strong>No Python knowledge required</strong> — Your existing SQL analysts can build and modify risk rules
          </AnimatedText>
        </div>
      </Slide>

      {/* Pilot Plan Slide */}
      <Slide id="pilot">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            30-Day Pilot Implementation
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Proven Deployment Timeline
          </AnimatedText>
          <div className="timeline">
            <AnimatedText delay={0.2} className="timeline-item">
              <h3>Week 1</h3>
              <p><strong>Foundation Setup</strong><br/>Access provisioning, rule configuration, and initial data pipeline</p>
            </AnimatedText>
            <AnimatedText delay={0.3} className="timeline-item">
              <h3>Week 2</h3>
              <p><strong>First Crawl Launch</strong><br/>Automated nightly processing with baseline risk scoring</p>
            </AnimatedText>
            <AnimatedText delay={0.4} className="timeline-item">
              <h3>Week 3</h3>
              <p><strong>Dashboard Activation</strong><br/>Live monitoring, alerts, and analyst training sessions</p>
            </AnimatedText>
            <AnimatedText delay={0.5} className="timeline-item">
              <h3>Week 4</h3>
              <p><strong>Optimization & Scale</strong><br/>KPI review, rule tuning, and production expansion planning</p>
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* Thank You Slide */}
      <Slide id="thanks">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Ready to Eliminate Compliance Risk?
          </AnimatedText>
          <AnimatedText delay={0.1} className="slide-subtitle" style={{ color: 'var(--brand-primary)', marginBottom: '2rem' }}>
            Next Steps
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.2} as="li">
              <strong>Technical Deep Dive Session</strong> — 30-minute architecture walkthrough with your team
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              <strong>POC Environment Setup</strong> — Live sandbox with your data for immediate testing
            </AnimatedText>
          </ul>
          <AnimatedText delay={0.5} className="slide-text" style={{ marginTop: '3rem', fontSize: '1.3rem', color: 'var(--brand-primary)', fontWeight: 700 }}>
            Let's turn your biggest compliance challenge into your competitive advantage
          </AnimatedText>
          <AnimatedText delay={0.6} className="slide-text" style={{ marginTop: '1rem' }}>
            <strong>Jaden Fix</strong> · Solutions Engineer · roe-ai.com
          </AnimatedText>
        </div>
      </Slide>
    </>
  );
}