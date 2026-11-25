// Usage:
//   node engine/render.mjs specs/x.mjs out/x.mp4            render the video
//   node engine/render.mjs specs/x.mjs out/x --stills 1,4.5  PNG frames to check
//   node engine/render.mjs specs/x.mjs out/dir --slides      carousel slides (PNG)
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const [specPath, outPath, mode, modeArg] = process.argv.slice(2);
const spec = (await import(path.resolve(specPath) + '?v=' + Date.now())).default;
const W = spec.W || 1080, H = spec.H || 1920, fps = spec.fps || 30;

function pageHtml(body, css, frameSrc) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>:root{--W:${W}px;--H:${H}px}${css || ''}</style></head>
<body><div id="stage">${body}<div id="grain"></div></div>
<script src="lib.js"></script>
<script>window.frame = ${frameSrc || 'null'};</script></body></html>`;
}

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--font-render-hinting=none', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('PAGE ERROR', e.message));

async function load(body, css, frame) {
  const file = path.join(here, `_page_${process.pid}.html`);
  fs.writeFileSync(file, pageHtml(body, css, frame ? frame.toString() : null));
  await page.goto('file://' + file);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
  fs.unlinkSync(file);
}

if (mode === '--slides') {
  fs.mkdirSync(outPath, { recursive: true });
  for (let i = 0; i < spec.slides.length; i++) {
    await load(spec.slides[i], spec.css, null);
    await page.evaluate(() => window.__seek(999));
    const f = path.join(outPath, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
  process.exit(0);
}

await load(spec.html, spec.css, spec.frame);
const cdp = await page.context().newCDPSession(page);
const shot = async (t, fmt = 'jpeg') => {
  await page.evaluate((tt) => window.__seek(tt), t);
  const r = await cdp.send('Page.captureScreenshot', { format: fmt, quality: fmt === 'jpeg' ? 92 : undefined, captureBeyondViewport: false });
  return Buffer.from(r.data, 'base64');
};

if (mode === '--stills') {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  for (const t of modeArg.split(',').map(Number)) {
    const f = `${outPath}-${t.toFixed(2)}.png`;
    fs.writeFileSync(f, await shot(t, 'png'));
    console.log(f);
  }
  await browser.close();
  process.exit(0);
}

// Full render: frames piped straight into ffmpeg, silent stereo track added so
// every platform accepts the upload. Written to a temp name, renamed on success.
fs.mkdirSync(path.dirname(outPath), { recursive: true });
const tmp = outPath.replace(/\.mp4$/, '.tmp.mp4');
const n = Math.round(spec.duration * fps);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
  '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', String(fps),
  '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
const t0 = Date.now();
for (let i = 0; i < n; i++) {
  const buf = await shot(i / fps);
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
}
ff.stdin.end();
const code = await new Promise((r) => ff.on('close', r));
await browser.close();
if (code !== 0) { console.error('ffmpeg failed', code); process.exit(1); }
fs.renameSync(tmp, outPath);
console.log(`${outPath}  ${n} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
