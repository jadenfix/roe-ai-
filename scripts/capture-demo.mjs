import { mkdir, rename } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { chromium } from 'playwright';

const baseURL = 'http://127.0.0.1:4173';
const outputDir = path.resolve(process.env.DEMO_OUTPUT_DIR || 'artifacts/demo');
await mkdir(outputDir, { recursive: true });

const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Timed out waiting for the preview server');
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: outputDir, size: { width: 1280, height: 720 } },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outputDir, 'roe-ai-demo-poster.png') });

  const stops = [
    ['Hero', 1500],
    ['2 The Solution', 1600],
    ['3 Pilot Hypotheses', 1600],
    ['10 Integration Architecture', 1900],
    ['11 Risk Matrix', 1700],
    ['12 Pilot Plan', 1700],
    ['13 Next Steps', 1900],
  ];
  for (const [label, duration] of stops) {
    await page.getByRole('button', { name: label }).click();
    await page.waitForTimeout(duration);
  }

  const video = page.video();
  await context.close();
  const recordedPath = await video.path();
  await rename(recordedPath, path.join(outputDir, 'roe-ai-demo.webm'));
  console.log(`Captured actual browser workflow in ${outputDir}`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
