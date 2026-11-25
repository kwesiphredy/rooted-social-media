// node posters/render.mjs jobs.json  -> each job {out, html, w?, h?}
import fs from 'node:fs'; import path from 'node:path'; import url from 'node:url';
import { chromium } from 'playwright-core';
const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const FIT = `
(async () => {
  await document.fonts.ready;
  for (const box of document.querySelectorAll('.fitbox')) {
    const W = box.clientWidth, H = +box.dataset.h;
    const ls = [...box.querySelectorAll('.fitline')];
    for (const l of ls) { l.style.display='inline-block'; l.style.whiteSpace='nowrap';
      let lo = 10, hi = +l.dataset.max; l.style.fontSize = hi + 'px';
      while (hi - lo > 1) { const m = (lo + hi) >> 1; l.style.fontSize = m + 'px'; if (l.scrollWidth <= W) lo = m; else hi = m; }
      l.style.fontSize = lo + 'px'; l.style.display='block'; }
    let tot = box.scrollHeight;
    if (H && tot > H) { const k = H / tot; for (const l of ls) l.style.fontSize = (parseFloat(l.style.fontSize) * k) + 'px'; }
  }
  window.__done = true;
})();`;
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--allow-file-access-from-files'] });
const page = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const j of jobs) {
  const w = j.w || 1080, h = j.h || 1350;
  await page.setViewportSize({ width: w, height: h });
  const doc = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="kit.css"><style>:root{--W:${w}px;--H:${h}px}</style></head><body>${j.html}<script>${FIT}</script></body></html>`;
  const f = path.join(DIR, '_page.html'); fs.writeFileSync(f, doc);
  await page.goto('file://' + f); await page.waitForFunction('window.__done === true', null, { timeout: 15000 });
  await page.waitForTimeout(60);
  fs.mkdirSync(path.dirname(j.out), { recursive: true });
  await page.screenshot({ path: j.out, type: 'jpeg', quality: 92 });
}
await b.close(); console.log('rendered', jobs.length);
