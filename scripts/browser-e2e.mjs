import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const baseURL = 'http://127.0.0.1:4173';
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

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const browserErrors = [];
  desktop.on('pageerror', (error) => browserErrors.push(error.message));
  desktop.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  await desktop.goto(baseURL, { waitUntil: 'networkidle' });

  await assert.doesNotReject(() => desktop.getByTestId('demo-disclosure').waitFor());
  assert.match(await desktop.getByTestId('demo-disclosure').innerText(), /synthetic examples/i);

  const slideIds = await desktop.locator('section.slide-container').evaluateAll((sections) =>
    sections.map((section) => section.id),
  );
  assert.equal(slideIds.length, 19, 'the deck should expose all 19 navigable slides');
  assert.equal(new Set(slideIds).size, 19, 'slide ids must be unique');
  assert.equal(await desktop.locator('.nav-dot').count(), 19, 'navigation must match the slide count');

  const invalidListChildren = await desktop.locator('ul').evaluateAll((lists) =>
    lists.flatMap((list) => [...list.children].filter((child) => child.tagName !== 'LI').map((child) => child.outerHTML)),
  );
  assert.deepEqual(invalidListChildren, [], 'unordered lists must contain semantic list items');

  const bodyText = await desktop.locator('body').innerText();
  for (const unsupportedClaim of ['AcquirePay', '20,000+ merchant', '95%+ precision', '80% Compliance']) {
    assert.equal(bodyText.includes(unsupportedClaim), false, `unsupported claim remained: ${unsupportedClaim}`);
  }

  await desktop.keyboard.press('PageDown');
  await desktop.waitForTimeout(900);
  assert.ok((await desktop.evaluate(() => window.scrollY)) > 100, 'keyboard navigation should move to the next slide');

  await desktop.getByRole('button', { name: '10 Integration Architecture' }).click();
  await desktop.waitForTimeout(900);
  const architectureTop = await desktop.locator('#architecture').evaluate((element) => element.getBoundingClientRect().top);
  assert.ok(Math.abs(architectureTop) < 220, 'navigation dot should reveal the architecture slide');
  assert.match(await desktop.locator('#architecture').innerText(), /Architecture discussion only/i);
  assert.equal(browserErrors.length, 0, `browser emitted errors: ${browserErrors.join(' | ')}`);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(baseURL, { waitUntil: 'networkidle' });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, `mobile layout overflows horizontally by ${overflow}px`);
  const disclosureBox = await mobile.getByTestId('demo-disclosure').boundingBox();
  assert.ok(disclosureBox && disclosureBox.width <= 374, 'demo disclosure must fit on a phone viewport');
  await mobile.getByRole('button', { name: '13 Next Steps' }).click();
  await mobile.waitForTimeout(900);
  assert.match(await mobile.locator('#thanks').innerText(), /Validate the evidence/i);

  console.log('Browser E2E passed: 19 slides, semantic lists, truthful disclosure, keyboard/dot navigation, desktop/mobile layout.');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
