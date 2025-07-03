// App.jsx
import React from "react";
import {
  Deck,
  Slide,
  Heading,
  Text,
  FlexBox,
  CodePane,
  Box,
} from "spectacle";
import { motion } from "framer-motion";

/* ---------- tiny helper for consistent fade-in --------- */
const Fade = ({ delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

/* ---------- brand theme -------------------------------- */
const theme = {
  fonts: { header: "Inter, sans-serif", text: "Inter, sans-serif" },
  colors: { brand: "#E44E00", text: "#222", bg: "#fff", dark: "#1e1e1e" },
};

/* ---------- 25 000 ms = auto-advance every 25 s -------- */
const AUTO = 25_000;

export default function App() {
  return (
    <Deck theme={theme} autoPlay={AUTO} transitionEffect="fade">
      {/* Slide 0 – Title & Hero */}
      <Slide backgroundColor="bg">
        <Fade>
          <Heading color="brand" fontSize="h1">Roe-AI Lite</Heading>
        </Fade>
        <Fade delay={0.3}>
          <Text fontSize={42}>AcquirePay Proposal · Jaden Fix</Text>
        </Fade>
        <Fade delay={0.6}>
          <Text fontSize={28}>5-Minute Demo</Text>
        </Fade>
      </Slide>

      {/* Slide 1 – Contents */}
      <Slide>
        <Heading>Contents</Heading>
        <Fade delay={0.2}>
          <Text fontSize={32}>
            1 Challenge · 2 Solution · 3 ROI · 4 Discovery · 5 Gaps · 6 Matrix · 7 Red Flags · 8 Arch · 9 Deep Dive · 10 SQL · 11 Pilot
          </Text>
        </Fade>
      </Slide>

      {/* Slide 2 – The Challenge */}
      <Slide>
        <Heading>Hidden, Moving Targets</Heading>
        <Fade>
          <ul style={{ fontSize: "36px", lineHeight: 1.4 }}>
            <li>20k+ sites shift daily</li>
            <li>Manual reviews → fatigue</li>
            <li>Multi-million fines possible</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 3 – Our Solution */}
      <Slide>
        <Heading color="brand">Roe-AI Lite Sentinel</Heading>
        <Fade>
          <ul style={{ fontSize: "36px", lineHeight: 1.4 }}>
            <li>Nightly crawl + &lt;5 min delta</li>
            <li>SQL-first AI agents</li>
            <li>Audit in ClickHouse/S3</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 4 – ROI They Can't Ignore */}
      <Slide backgroundColor="brand">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column">
          <Heading color="bg" fontSize={200}>80%</Heading>
          <Text color="bg" fontSize={36}>fines avoided</Text>
          <Fade delay={0.3}>
            <Text color="bg" fontSize={28}>75% fewer analyst hours</Text>
          </Fade>
          <Fade delay={0.6}>
            <Text color="bg" fontSize={28}>15-20% fraud reduction</Text>
          </Fade>
        </FlexBox>
      </Slide>

      {/* Slide 5 – Discovery Kick-Off */}
      <Slide>
        <Heading>2-Hour Workshop</Heading>
        <Fade>
          <ul style={{ fontSize: "36px", lineHeight: 1.4 }}>
            <li>Map workflows & KPIs</li>
            <li>Sandbox spin-up</li>
            <li>First alerts in 7 days</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 6 – Critical Info Gaps */}
      <Slide>
        <Heading>Critical Info Gaps</Heading>
        <Fade>
          <ul style={{ fontSize: "36px", lineHeight: 1.4 }}>
            <li>SKU feeds missing</li>
            <li>PDF paths unknown</li>
            <li>No versioned logs</li>
            <li>Historical labels scarce</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 7 – Impact × Frequency Matrix */}
      <Slide>
        <Heading>Impact × Frequency</Heading>
        <Fade>
          <img
            src="/matrix.svg"
            alt="2×2 heat-map"
            style={{ width: "70%" }}
          />
        </Fade>
        <Fade delay={0.3}>
          <Text fontSize={24}>Vape & CBD (Hi-Hi) • Sanctions (Hi-Lo)</Text>
        </Fade>
      </Slide>

      {/* Slide 8 – Top Red-Flag Triggers */}
      <Slide>
        <Heading>Top Red-Flag Triggers</Heading>
        <Fade>
          <ul style={{ fontSize: "32px", lineHeight: 1.4 }}>
            <li>① Prohibited keywords</li>
            <li>② Price swings &gt;40%</li>
            <li>③ Domain age &lt;90 d</li>
            <li>④ Geo/IP mismatch</li>
            <li>⑤ Traffic spikes</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 9 – Architecture at a Glance */}
      <Slide>
        <Heading>Architecture at a Glance</Heading>
        <Fade>
          <img
            src="/architecture.png"
            alt="pipeline"
            style={{ width: "80%", border: "1px solid #ccc" }}
          />
        </Fade>
      </Slide>

      {/* Slide 10 – Technical Deep Dive */}
      <Slide>
        <FlexBox width="100%" justifyContent="space-between" alignItems="flex-start">
          {/* Left: Architecture image */}
          <img
            src="/architecture.png"
            alt="pipeline diagram"
            style={{ width: "60%", border: "1px solid #ccc" }}
          />

          {/* Right: Call-outs */}
          <Box width="35%" padding="0 1rem">
            <Heading fontSize="28px" marginBottom="1rem">Technical Deep Dive</Heading>
            <ul style={{ fontSize: "20px", lineHeight: 1.5, listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Access prereqs</strong>: VPC peering & creds
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>CRM manifest</strong>: nightly SFTP → Airflow DAG
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Real-time</strong>: SNS → Fargate (&lt;5m P99)
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Roe AI Lite</strong>: 200 ppm, SQL + LLM agents
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Audit store</strong>: ClickHouse vecs + S3/MinIO logs
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Alerts</strong>: JSON → Snowflake → Tableau/Slack/Jira
              </li>
            </ul>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 11 – 2-Line SQL Demo */}
      <Slide backgroundColor="dark">
        <Heading color="brand">2-Line Risk Query</Heading>
        <CodePane language="sql" theme="dracula">
{`SELECT id,
       AI_RISK(page_html) AS risk
FROM merchants_today
WHERE risk > 0.8;`}
        </CodePane>
      </Slide>

      {/* Slide 12 – 30-Day Pilot Plan */}
      <Slide>
        <Heading>30-Day Pilot Plan</Heading>
        <Fade>
          <ul style={{ fontSize: "36px", lineHeight: 1.4 }}>
            <li>Wk 1 – Access & rules</li>
            <li>Wk 2 – Nightly run</li>
            <li>Wk 3 – Dashboards live</li>
            <li>Wk 4 – KPI review</li>
          </ul>
        </Fade>
      </Slide>

      {/* Slide 13 – Thank You & Next Steps */}
      <Slide>
        <Heading>Thank You & Next Steps</Heading>
        <Fade>
          <ul style={{ fontSize: "32px", lineHeight: 1.4 }}>
            <li>Let's schedule the deep dive</li>
            <li>See draft PDF & SQL in repo</li>
          </ul>
        </Fade>
        <Fade delay={0.3}>
          <Text fontSize={24} marginTop="2rem">
            Book a 30-min technical deep dive
          </Text>
        </Fade>
      </Slide>
    </Deck>
  );
}