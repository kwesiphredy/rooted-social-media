// Shared pieces for every Rooted post.
import path from 'node:path';
import url from 'node:url';
export const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
export const asset = (p) => 'file://' + path.join(ROOT, 'assets', p);

export const SPROUT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>`;

export const bug = (tin = 0, tout) => `<div class="bug" data-in="${tin}" ${tout != null ? `data-out="${tout}"` : ''} data-a="fade"><div class="mark">${SPROUT}</div>Rooted</div>`;

// Closing card: logo, name, line, CTA. Starts at t0.
export const endCard = (t0, line = 'Faith that lasts past Sunday.', cta = 'Download Rooted: link in bio') => `
<div class="layer center" style="gap:0;padding:0 90px">
  <div data-in="${t0}" data-a="pop" data-d="0.7" style="width:200px;height:200px;border-radius:58px;background:var(--peach);display:flex;align-items:center;justify-content:center;box-shadow:0 30px 80px rgba(0,0,0,0.35)">
    <div style="width:110px;height:110px;color:var(--teal)">${SPROUT}</div></div>
  <div data-in="${t0 + 0.25}" class="serif" style="margin-top:44px;font-size:96px;font-weight:600;color:var(--peach);letter-spacing:-0.01em">Rooted</div>
  <div data-in="${t0 + 0.35}" style="margin-top:6px;font-size:36px;font-weight:500;color:var(--muted)">Christian Faith App</div>
  <div data-in="${t0 + 0.6}" class="serif" style="margin-top:56px;font-size:52px;font-style:italic;line-height:1.25">${line}</div>
  <div data-in="${t0 + 0.9}" class="pill" style="margin-top:56px;font-size:36px;padding:22px 44px">${cta}</div>
  <div data-in="${t0 + 1.1}" style="margin-top:34px;font-size:38px;font-weight:600;color:var(--peach);letter-spacing:0.02em">@stay.rootedapp</div>
</div>`;

// A real app screenshot inside a phone frame. img is a file under assets/.
export const phone = ({ x, y, w, img, id = 'ph', h }) => {
  const H = h || Math.round(w * 2.164); // 390 x 844 screen + bezel
  return `<div class="phone" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${H}px"><div class="screen"><img id="${id}-img" src="${asset(img)}"></div></div>`;
};

const smart = (s) => s.replace(/(^|[\s(\[])"/g, '$1\u201C').replace(/"/g, '\u201D').replace(/(^|[\s(\[])'/g, '$1\u2018').replace(/'/g, '\u2019');
export const esc = (s) => smart(String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;');
