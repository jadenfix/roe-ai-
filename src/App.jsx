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
          <AnimatedText delay={0} className="slide-title brand">
            Roe-AI Lite
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-subtitle">
            AcquirePay Proposal · Jaden Fix
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text">
            5-Minute Technical Demo
          </AnimatedText>
        </div>
      </Slide>

      {/* Contents Slide */}
      <Slide id="contents">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            Presentation Overview
          </AnimatedText>
          <AnimatedText delay={0.2} className="slide-text" style={{ fontSize: '1.8rem', lineHeight: 1.4 }}>
            Challenge → Solution → ROI → Discovery → Technical Deep Dive → Implementation Plan
          </AnimatedText>
        </div>
      </Slide>

      {/* Challenge Slide */}
      <Slide id="challenge">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Hidden, Moving Targets
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.1} as="li">
              20k+ merchant sites shift daily
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              Manual reviews → analyst fatigue
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              Multi-million dollar fines possible
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
          <ul className="slide-list">
            <AnimatedText delay={0.1} as="li">
              Nightly crawl + &lt;5 min delta detection
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              SQL-first AI agents at scale
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              Immutable audit trail in ClickHouse/S3
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
            fines avoided
          </AnimatedText>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <AnimatedText delay={0.4} style={{ color: 'white', fontSize: '1.5rem', opacity: 0.9 }}>
              75% fewer analyst hours
            </AnimatedText>
            <AnimatedText delay={0.6} style={{ color: 'white', fontSize: '1.5rem', opacity: 0.9 }}>
              15-20% fraud reduction
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* Discovery Slide */}
      <Slide id="discovery">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            2-Hour Discovery Workshop
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.1} as="li">
              Map existing workflows & KPIs
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              Sandbox environment spin-up
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              First alerts delivered in 7 days
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Critical Info Gaps Slide */}
      <Slide id="gaps">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Critical Information Gaps
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.1} as="li">
              SKU-level data feeds missing
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              Policy PDF locations unknown
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              No versioned audit logs
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              Limited historical training labels
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Matrix Slide */}
      <Slide id="matrix">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Impact × Frequency Matrix
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <img
              src="/matrix.svg"
              alt="Risk prioritization matrix"
              className="slide-image"
              style={{ width: '80%', maxWidth: '600px' }}
            />
          </AnimatedText>
          <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '1rem' }}>
            Vape & CBD (High-High) • Sanctions (High-Low)
          </AnimatedText>
        </div>
      </Slide>

      {/* Red Flag Triggers Slide */}
      <Slide id="triggers">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Top Red-Flag Triggers
          </AnimatedText>
          <ul className="slide-list" style={{ fontSize: '1.8rem' }}>
            <AnimatedText delay={0.1} as="li">
              ① Prohibited keywords detection
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              ② Price volatility &gt;40%
            </AnimatedText>
            <AnimatedText delay={0.3} as="li">
              ③ Domain age &lt;90 days
            </AnimatedText>
            <AnimatedText delay={0.4} as="li">
              ④ Geographic/IP mismatches
            </AnimatedText>
            <AnimatedText delay={0.5} as="li">
              ⑤ Anomalous traffic spikes
            </AnimatedText>
          </ul>
        </div>
      </Slide>

      {/* Architecture Overview Slide */}
      <Slide id="architecture">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            System Architecture Overview
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <img
              src="/architecture.png"
              alt="Roe-AI Lite system architecture"
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
              alt="Technical architecture diagram"
              className="slide-image"
              style={{ width: '100%' }}
            />
          </AnimatedText>
          <div className="feature-card">
            <AnimatedText delay={0.2} className="slide-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              Technical Deep Dive
            </AnimatedText>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>
              <AnimatedText delay={0.3} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Access Prerequisites:</strong><br/>
                VPC peering & credential management
              </AnimatedText>
              <AnimatedText delay={0.4} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>CRM Integration:</strong><br/>
                Nightly SFTP manifest → Airflow DAG triggers
              </AnimatedText>
              <AnimatedText delay={0.5} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Real-time Pipeline:</strong><br/>
                SNS topics → Fargate workers (&lt;5m P99)
              </AnimatedText>
              <AnimatedText delay={0.6} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>AI Processing:</strong><br/>
                200 pages/min parallel LLM + SQL agents
              </AnimatedText>
              <AnimatedText delay={0.7} as="li" style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>Data Storage:</strong><br/>
                ClickHouse vectors + S3/MinIO audit logs
              </AnimatedText>
              <AnimatedText delay={0.8} as="li">
                <strong style={{ color: 'var(--brand-primary)' }}>Alert Distribution:</strong><br/>
                JSON → Snowflake → Tableau/Slack/Jira
              </AnimatedText>
            </ul>
          </div>
        </div>
      </Slide>

      {/* SQL Demo Slide */}
      <Slide id="sql" className="dark-bg">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title white">
            2-Line Risk Query
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="code-container">
              <pre>
                <code style={{ color: '#ff6b6b' }}>SELECT</code> <code style={{ color: '#ffd93d' }}>id</code>,{'\n'}
                {'       '}<code style={{ color: '#6bcf7f' }}>AI_RISK</code>(<code style={{ color: '#ffd93d' }}>page_html</code>) <code style={{ color: '#ff6b6b' }}>AS</code> <code style={{ color: '#ffd93d' }}>risk</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>FROM</code> <code style={{ color: '#74b9ff' }}>merchants_today</code>{'\n'}
                <code style={{ color: '#ff6b6b' }}>WHERE</code> <code style={{ color: '#ffd93d' }}>risk</code> <code style={{ color: '#ff7675' }}>&gt;</code> <code style={{ color: '#a29bfe' }}>0.8</code>;
              </pre>
            </div>
          </AnimatedText>
        </div>
      </Slide>

      {/* Pilot Plan Slide */}
      <Slide id="pilot">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
          <AnimatedText className="slide-title">
            30-Day Pilot Roadmap
          </AnimatedText>
          <div className="timeline">
            <AnimatedText delay={0.1} className="timeline-item">
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>Week 1</h3>
              <p>Access setup & rule configuration</p>
            </AnimatedText>
            <AnimatedText delay={0.2} className="timeline-item">
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>Week 2</h3>
              <p>First automated nightly crawl</p>
            </AnimatedText>
            <AnimatedText delay={0.3} className="timeline-item">
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>Week 3</h3>
              <p>Live dashboards & alerts</p>
            </AnimatedText>
            <AnimatedText delay={0.4} className="timeline-item">
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>Week 4</h3>
              <p>KPI review & expansion planning</p>
            </AnimatedText>
          </div>
        </div>
      </Slide>

      {/* Thank You Slide */}
      <Slide id="thanks">
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <AnimatedText className="slide-title">
            Thank You & Next Steps
          </AnimatedText>
          <ul className="slide-list">
            <AnimatedText delay={0.1} as="li">
              Schedule technical deep dive session
            </AnimatedText>
            <AnimatedText delay={0.2} as="li">
              Review implementation documentation
            </AnimatedText>
          </ul>
          <AnimatedText delay={0.4} className="slide-text" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
            Book your 30-minute technical consultation
          </AnimatedText>
        </div>
      </Slide>
    </>
  );
}