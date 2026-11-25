// Rooted poster kit: shared pieces and layouts. Every layout returns
// { html, bg } for a 1080 x 1350 page (4:5), unless it says otherwise.
import { SPROUT } from '../specs/common.mjs';

const smart = (s) => String(s).replace(/(^|[\s(\[—-])"/g, '$1“').replace(/"/g, '”')
  .replace(/(^|[\s(\[])'/g, '$1‘').replace(/'/g, '’');
export const esc = (s) => smart(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// seeded random so a post always renders the same
export function rng(seed) { let s = 0; for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// jagged torn-paper polygon (percent coordinates) for clip-path
export function torn(r, { top = true, bottom = true, left = false, right = false, amp = 2.2, n = 26 } = {}) {
  const pts = [];
  const j = () => (r() * amp);
  for (let i = 0; i <= n; i++) pts.push(`${(i / n) * 100}% ${top ? j() : 0}%`);
  for (let i = 1; i <= n; i++) pts.push(`${right ? 100 - j() : 100}% ${(i / n) * 100}%`);
  for (let i = n - 1; i >= 0; i--) pts.push(`${(i / n) * 100}% ${bottom ? 100 - j() : 100}%`);
  for (let i = n - 1; i >= 1; i--) pts.push(`${left ? j() : 0}% ${(i / n) * 100}%`);
  return `polygon(${pts.join(',')})`;
}

const ICONS = {
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
  tt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2 1.7 3.4 3.9 3.6v3a7.4 7.4 0 0 1-3.9-1.2v6.3A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.6V21h3.3z"/></svg>`,
};
export const footer = (color = '#fff', bg = 'rgba(0,0,0,0.25)') =>
  `<div class="footer pill" style="color:${color};background:${bg}"><span class="icons">${ICONS.ig}${ICONS.tt}${ICONS.fb}</span><span>@stay.rootedapp</span></div>`;

export const lockup = (label, { fg = '#fff', tile = 'var(--peach)', mark = 'var(--teal)' } = {}) =>
  `<div class="lockup" style="color:${fg}"><div class="tile" style="background:${tile};color:${mark}">${SPROUT}</div><div class="name">Rooted</div>${label ? `<div class="bar" style="background:${fg}"></div><div class="label">${label}</div>` : ''}</div>`;

// stacked poster headline: each line scales to the box width (see fit script)
export const stack = (lines, { w, h, max = 260, color = '#fff', gap = 0.02, cls = 'display', align = 'center' } = {}) =>
  `<div class="fitbox" data-h="${h}" style="width:${w}px;text-align:${align}">${lines.map((l) => {
    const [t, c, scale] = Array.isArray(l) ? l : [l, color, 1];
    return `<div class="fitline ${cls}" data-max="${Math.round(max * (scale || 1))}" style="color:${c};margin-bottom:${gap}em">${esc(t)}</div>`;
  }).join('')}</div>`;

// split a hook into 2-4 poster lines, short words joined
export function lines(text, maxLines = 3) {
  const sent = String(text).replace(/\.$/, '').split(/(?<=[.?!:])\s+/);
  if (sent.length > 1 && sent.length <= maxLines) {
    const per = Math.max(1, Math.ceil(maxLines / sent.length));
    const out = sent.flatMap((x) => lines(x, per));
    if (out.length <= maxLines + 1) return out;
  }
  const w = String(text).replace(/\.$/, '').split(/\s+/);
  if (w.length <= 2) return w;
  const target = Math.ceil(w.join(' ').length / Math.min(maxLines, Math.ceil(w.length / 1.5)));
  const out = []; let cur = '';
  for (const x of w) { if (cur && (cur + ' ' + x).length > target + 2) { out.push(cur); cur = x; } else cur = cur ? cur + ' ' + x : x; }
  if (cur) out.push(cur);
  while (out.length > maxLines) { const a = out.pop(); out[out.length - 1] += ' ' + a; }
  return out;
}

const verseBlock = (text, ref, { color = '#fff', size = 30, refColor = 'var(--peach)', italic = true, max = 360 } = {}) => {
  let t = text;
  if (t.length > max) t = t.slice(0, t.lastIndexOf(' ', max)) + '...';
  return `<div style="color:${color};font-family:'Edit',serif;${italic ? 'font-style:italic;' : ''}font-size:${size}px;line-height:1.42">“${esc(t).replace(/[“”]/g, '')}”</div>
  <div style="margin-top:14px;font-weight:700;letter-spacing:0.2em;font-size:19px;color:${refColor};text-transform:uppercase">${esc(ref)}</div>`;
};

const glow = (x, y, c, s = 900) => `<div class="abs" style="left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle, ${c} 0%, transparent 65%)"></div>`;

const ovalRail = (words, color) => `<div style="display:flex;align-items:center;gap:16px;color:${color};font-family:'Block';font-size:22px;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap">${words.map((w, i) => (i ? `<div style="flex:1;height:22px;border:3px solid ${color};border-radius:999px;min-width:60px"></div>` : '') + `<span>${esc(w)}</span>`).join('')}</div>`;

// newsprint-ish faint columns of lines for collage paper
const newsprint = (r, color = 'rgba(30,30,30,0.18)') => {
  let s = '';
  for (let c = 0; c < 4; c++) for (let i = 0; i < 46; i++) {
    const w = 60 + r() * 40;
    s += `<div class="abs" style="left:${c * 280 + 20}px;top:${20 + i * 30}px;width:${w * 2.4}px;height:7px;background:${color};border-radius:2px"></div>`;
  }
  return `<div class="abs" style="inset:0;transform:rotate(-3deg) scale(1.1)">${s}</div>`;
};

const sprig = (color = 'var(--gold)', op = 0.35) => `<svg viewBox="0 0 200 300" fill="none" stroke="${color}" stroke-width="2.2" style="opacity:${op}"><path d="M100 290 C 100 200, 95 120, 110 20"/>${[40, 80, 120, 160, 200, 240].map((y, i) => i % 2 ? `<path d="M${103 - y / 30} ${y} C ${60} ${y - 30}, ${40} ${y - 10}, ${30} ${y + 10} C ${55} ${y + 18}, ${85} ${y + 10}, ${103 - y / 30} ${y}"/>` : `<path d="M${103 - y / 30} ${y} C ${140} ${y - 30}, ${165} ${y - 12}, ${172} ${y + 8} C ${145} ${y + 18}, ${115} ${y + 10}, ${103 - y / 30} ${y}"/>`).join('')}</svg>`;

// ======================= LAYOUTS =======================

// 1. Bold sermon poster (Sunday / Monday fliers). Teal stage, giant type, info strip.
export function sermonPoster(p, v = 0) {
  const r = rng(p.date);
  const L = lines(p.hook, 4);
  const last = L.length - 1;
  const strip = p.strip || [['Open', 'SpiritScript'], ['Tap', 'Record'], ['Keep', 'Every verse']];
  const cream = v % 2 === 1 && !p.photo;
  const fg = cream ? 'var(--teal-ink)' : '#fff';
  const acc = cream ? 'var(--rust)' : 'var(--peach)';
  const bg = cream ? '' : `background: radial-gradient(110% 80% at 50% 0%, var(--teal-lift) 0%, var(--teal) 45%, var(--teal-ink) 100%);`;
  const photo = p.photo ? `<div class="abs" style="inset:0;background:url('${p.photo}') center/cover;filter:grayscale(1) contrast(1.1)"></div><div class="abs" style="inset:0;background:linear-gradient(180deg, rgba(28,48,48,0.55), rgba(19,34,34,0.92));mix-blend-mode:multiply"></div><div class="abs" style="inset:0;background:linear-gradient(180deg, rgba(45,74,74,0.35), rgba(19,34,34,0.85))"></div>` : '';
  return `<div id="stage" class="grain ${cream && !p.photo ? 'paper' : ''}" style="${bg}">${photo}
  ${cream ? `<div class="abs" style="left:-80px;top:815px;width:1300px;height:190px;background:var(--teal);transform:rotate(-3deg);clip-path:${torn(r, { amp: 6 })}"></div>` : glow(880, 280, 'rgba(244,196,160,0.22)', 1100)}
  <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup(p.label || 'Keep the Sermon', { fg })}</div>
  ${p.kicker ? `<div class="abs edit" style="left:0;right:0;top:186px;text-align:center;font-style:italic;font-size:40px;color:${acc}">${esc(p.kicker)}</div>` : ''}
  <div class="abs" style="left:70px;top:${p.kicker ? 250 : 220}px;width:940px">
    ${stack(L.map((t, i) => [t.toUpperCase(), cream ? (i === last ? 'var(--rust)' : 'var(--ink)') : (i === last ? 'var(--peach)' : '#fff')]), { w: 940, h: 560, max: 230 })}
  </div>
  ${cream ? '' : ''}
  <div class="abs script" style="right:70px;top:${p.kicker ? 740 : 720}px;font-size:76px;color:${acc};transform:rotate(-7deg)">${esc(p.script || 'this week')}</div>
  <div class="abs" style="left:70px;right:70px;top:850px">
    <div class="strip" style="background:${cream ? 'var(--teal)' : 'rgba(244,196,160,0.14)'};color:${cream ? '#fff' : 'var(--peach)'}">
      ${strip.map(([k, val]) => `<div><div class="k">${esc(k)}</div><div class="v" style="color:#fff">${esc(val)}</div></div>`).join('')}
    </div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:1035px;text-align:center">${verseBlock(p.verse_text, p.verse_ref, { color: fg, size: 33, refColor: acc, max: 230 })}</div>
  <div class="abs" style="left:0;right:0;bottom:44px;display:flex;justify-content:center">${footer(cream ? 'var(--teal-ink)' : '#fff', cream ? 'rgba(45,74,74,0.10)' : 'rgba(0,0,0,0.28)')}</div>
</div>`;
}

// 2. Collage verse poster (Saturday verses, seasonal). Torn paper layers + giant type.
export function collageVerse(p, v = 0) {
  const r = rng(p.date + 'c');
  const L = lines(p.hook, 3);
  const pal = [
    { base: 'var(--teal)', a: 'var(--peach)', b: 'var(--cream)', ink: 'var(--ink)', hi: 'var(--rust)' },
    { base: 'var(--cream)', a: 'var(--teal)', b: 'var(--apricot)', ink: 'var(--ink)', hi: 'var(--rust)' },
    { base: 'var(--teal-ink)', a: 'var(--apricot)', b: 'var(--paper)', ink: 'var(--ink)', hi: 'var(--teal)' },
  ][v % 3];
  return `<div id="stage" class="grain" style="background:${pal.base}">
  <div class="abs paper" style="left:-60px;top:115px;width:1200px;height:830px;transform:rotate(${(r() * 2.4 - 1.2).toFixed(2)}deg);clip-path:${torn(r, { amp: 3.5, left: true, right: true })}">${newsprint(r)}</div>
  <div class="abs" style="left:-60px;top:${300 + r() * 80}px;width:700px;height:260px;background:${pal.a};opacity:0.55;transform:rotate(${(-14 + r() * 6).toFixed(1)}deg);clip-path:${torn(r, { amp: 9, left: true, right: true })}"></div>
  <div class="abs" style="right:-80px;top:${560 + r() * 60}px;width:640px;height:230px;background:${pal.b};opacity:0.6;transform:rotate(${(8 + r() * 6).toFixed(1)}deg);clip-path:${torn(r, { amp: 9, left: true, right: true })}"></div>
  <div class="tape" style="left:120px;top:140px;width:220px;transform:rotate(-12deg)"></div>
  <div class="tape" style="right:110px;top:880px;width:200px;transform:rotate(9deg)"></div>
  <div class="abs" style="left:60px;right:60px;top:62px">${ovalRail(p.rail || ['Rooted', 'Weekend', 'Verse'], v % 3 === 1 ? 'var(--teal-ink)' : '#fff')}</div>
  <div class="abs" style="left:80px;top:220px;width:920px">
    ${stack(L.map((t, i) => [t.toUpperCase(), i % 2 ? pal.hi : pal.ink]), { w: 920, h: 600, max: 250 })}
  </div>
  <div class="abs" style="left:90px;right:90px;top:960px;background:var(--cream);padding:34px 40px;box-shadow:0 18px 40px rgba(0,0,0,0.25);transform:rotate(-1deg);clip-path:${torn(r, { amp: 1.4 })}">
    ${verseBlock(p.verse_text, p.verse_ref, { color: 'var(--ink)', size: 28, refColor: 'var(--rust)', max: 300 })}
  </div>
  <div class="abs" style="left:60px;right:60px;bottom:40px">${ovalRail(['Faith', 'that lasts', 'past Sunday'], v % 3 === 1 ? 'var(--teal-ink)' : '#fff')}</div>
</div>`;
}

// 3. Prayer prompt (Wednesdays). Cream editorial, serif with italic accent, sprigs.
export function prayerCream(p) {
  const words = p.hook.replace(/\.$/, '').split(' ');
  const cut = Math.max(1, Math.ceil(words.length * 0.55));
  const a = words.slice(0, cut).join(' '), b = words.slice(cut).join(' ');
  return `<div id="stage" class="paper grain" style="--grain:0.14">
  <div class="abs" style="right:-30px;top:40px;width:300px;height:450px;transform:rotate(12deg)">${sprig()}</div>
  <div class="abs" style="left:-40px;bottom:120px;width:240px;height:360px;transform:rotate(-160deg)">${sprig('var(--teal)', 0.18)}</div>
  <div class="abs" style="right:-160px;bottom:-140px;width:520px;height:520px;border-radius:50%;background:var(--peach);opacity:0.55"></div>
  <div class="abs" style="left:80px;top:80px">${lockup('', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs caps" style="left:84px;top:200px;font-size:20px;color:var(--gold)">Prayer prompt · ${esc(p.dayname || 'Wednesday')}</div>
  <div class="abs edit" style="left:80px;top:250px;width:900px;color:var(--ink);font-size:${a.length + b.length > 60 ? 84 : a.length + b.length > 34 ? 100 : 118}px;line-height:1.05;letter-spacing:-0.01em">
    ${esc(a)} <span style="font-style:italic;color:var(--teal)">${esc(b.replace(/[?!]$/, ''))}</span><span style="color:var(--gold)">${/[?!]$/.test(b) ? b.slice(-1) : '.'}</span>
  </div>
  <div class="abs" style="left:84px;top:${a.length + b.length > 60 ? 690 : 640}px;width:90px;height:3px;background:var(--gold)"></div>
  <div class="abs" style="left:84px;top:${a.length + b.length > 60 ? 730 : 680}px;width:860px">${verseBlock(p.verse_text, p.verse_ref, { color: 'var(--teal-ink)', size: 38, refColor: 'var(--gold)', max: 260 })}</div>
  <div class="abs" style="left:84px;bottom:140px;width:780px;background:var(--teal);color:#fff;border-radius:28px;padding:26px 32px;display:flex;gap:22px;align-items:center;box-shadow:0 20px 40px rgba(28,48,48,0.25)">
    <div style="width:58px;height:58px;border-radius:16px;background:var(--peach);color:var(--teal);display:flex;align-items:center;justify-content:center;flex:none"><div style="width:32px;height:32px">${SPROUT}</div></div>
    <div style="font-size:27px;line-height:1.35;font-weight:600">${esc(p.body)}</div>
  </div>
  <div class="abs" style="left:84px;bottom:56px">${footer('var(--teal-ink)', 'rgba(45,74,74,0.08)')}</div>
</div>`;
}

// 4. This or That
export function thisOrThat(p) {
  const [a, b] = p.options;
  const q = p.hook.replace(/\?$/, '');
  return `<div id="stage" class="grain" style="background:var(--teal)">
  <div class="abs" style="left:0;top:0;width:1080px;height:1350px;background:var(--peach);clip-path:polygon(0 0, 100% 0, 100% 38%, 0 62%)"></div>
  <div class="abs" style="left:0;right:0;top:56px;display:flex;justify-content:center">${lockup('This or That', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs" style="left:80px;top:190px;width:700px">${stack([[a.toUpperCase(), 'var(--teal-ink)']], { w: 700, h: 300, max: 250 })}</div>
  <div class="abs" style="right:80px;top:820px;width:700px;text-align:right">${stack([[b.toUpperCase(), 'var(--peach)']], { w: 700, h: 300, max: 250, align: 'right' })}</div>
  <div class="abs" style="left:420px;top:555px;width:240px;height:240px;border-radius:50%;background:var(--teal-ink);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(0,0,0,0.35);border:6px solid var(--cream)"><span class="script" style="font-size:96px;color:var(--peach)">or</span></div>
  <div class="abs edit" style="left:80px;top:520px;width:300px;font-style:italic;font-size:34px;color:var(--teal-ink);transform:rotate(-6deg)">${esc(q)}?</div>
  <div class="abs" style="left:0;right:0;bottom:150px;text-align:center;color:#fff;font-size:30px;font-weight:600">Comment your pick below</div>
  <div class="abs" style="left:0;right:0;bottom:56px;display:flex;justify-content:center">${footer()}</div>
</div>`;
}

// 5. Fill in the blank: notebook page, handwriting, marker circle
export function fillBlank(p) {
  const [pre, post] = p.hook.split('____');
  const lines = Array.from({ length: 22 }, (_, i) => `<div class="abs" style="left:0;right:0;top:${190 + i * 52}px;height:2px;background:rgba(45,74,74,0.16)"></div>`).join('');
  return `<div id="stage" class="paper grain" style="--grain:0.16">
  ${lines}<div class="abs" style="left:120px;top:0;bottom:0;width:3px;background:rgba(185,96,58,0.45)"></div>
  <div class="abs" style="left:170px;top:70px">${lockup('Fill in the blank', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs marker" style="left:170px;top:280px;width:840px;font-size:96px;line-height:1.3;color:var(--teal-ink)">${esc(pre.trim())}
    <span style="display:inline-block;width:330px;border-bottom:8px solid var(--rust);transform:translateY(-12px)"></span>${esc((post || '').trim())}</div>
  <svg class="abs" style="left:560px;top:900px;width:330px;height:150px" viewBox="0 0 330 150" fill="none" stroke="var(--rust)" stroke-width="5" stroke-linecap="round"><path d="M20 120 C 90 140, 200 120, 250 60"/><path d="M225 62 L 252 56 L 252 86"/></svg>
  <div class="abs hand" style="left:170px;top:1030px;font-size:70px;font-weight:700;color:var(--rust);transform:rotate(-3deg)">Your answer goes in the comments</div>
  <div class="abs" style="left:170px;bottom:60px">${footer('var(--teal-ink)', 'rgba(45,74,74,0.08)')}</div>
</div>`;
}

// 6. Tag a friend
export function tagFriend(p) {
  const r = rng(p.date);
  return `<div id="stage" class="grain" style="background:var(--peach)">
  <div class="abs" style="left:-60px;top:640px;width:1200px;height:420px;background:var(--teal);transform:rotate(-6deg);clip-path:${torn(r, { amp: 7 })}"></div>
  <div class="abs" style="left:0;right:0;top:60px;display:flex;justify-content:center">${lockup('Faith with Friends', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs display" style="left:0;right:0;top:160px;text-align:center;font-size:440px;color:transparent;-webkit-text-stroke:6px var(--teal-ink)">TAG</div>
  <div class="abs" style="left:540px;top:470px;transform:rotate(8deg);background:var(--cream);color:var(--teal-ink);padding:18px 34px;border-radius:20px;font-family:'Marker';font-size:56px;box-shadow:0 14px 30px rgba(0,0,0,0.2)">@________</div>
  <div class="abs" style="left:90px;top:720px;width:900px">${stack(lines(p.hook.replace(/^Tag /i, ''), 3).map((t, i) => [t.toUpperCase(), i === 0 ? 'var(--peach)' : '#fff']), { w: 900, h: 340, max: 140 })}</div>
  <div class="abs" style="left:0;right:0;bottom:56px;display:flex;justify-content:center">${footer('#fff', 'rgba(0,0,0,0.25)')}</div>
</div>`;
}

// 7. Finish the verse: typed scrap on teal
export function finishVerse(p) {
  const r = rng(p.date);
  const [pre, post] = p.hook.split('____');
  return `<div id="stage" class="grain" style="background:radial-gradient(100% 80% at 50% 20%, var(--teal-lift), var(--teal-ink))">
  <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup('Finish the verse')}</div>
  <div class="abs display" style="left:0;right:0;top:170px;text-align:center;font-size:150px;color:var(--peach)">FINISH IT</div>
  <div class="abs hand" style="left:0;right:0;top:320px;text-align:center;font-size:52px;color:#fff;font-weight:500">no peeking, no Googling</div>
  <div class="abs paper" style="left:90px;right:90px;top:470px;padding:90px 70px;transform:rotate(-1.5deg);clip-path:${torn(r, { amp: 1.6, left: true, right: true })};box-shadow:0 30px 60px rgba(0,0,0,0.35)">
    <div class="edit" style="font-size:66px;line-height:1.35;color:var(--ink)">“${esc(pre.trim())} <span style="display:inline-block;width:260px;border-bottom:6px solid var(--rust);transform:translateY(-6px)"></span>${post && post.trim() ? ' ' + esc(post.trim().replace(/\.$/, '')) : ''}.”</div>
    <div style="margin-top:30px;font-weight:700;letter-spacing:0.2em;font-size:20px;color:var(--rust)">${esc(p.verse_ref.replace(' (KJV)', ''))} · KJV</div>
  </div>
  <div class="tape" style="left:420px;top:430px;width:240px;transform:rotate(-4deg)"></div>
  <div class="abs" style="left:0;right:0;top:1130px;text-align:center;color:#fff;font-size:34px;font-weight:600">Type the missing words in the comments</div>
  <div class="abs" style="left:0;right:0;bottom:56px;display:flex;justify-content:center">${footer()}</div>
</div>`;
}

// 8. Feature spotlight with phone mockup (drawn Rooted UI)
import { screenFor } from './screens.mjs';
export function spotlight(p, v = 0) {
  const words = p.hook.replace(/\.$/, '').split(' ');
  const cut = Math.max(1, Math.ceil(words.length * 0.5));
  const cream = v % 2 === 0;
  const fg = cream ? 'var(--ink)' : '#fff';
  return `<div id="stage" class="grain ${cream ? 'paper' : ''}" style="${cream ? '--grain:0.14' : 'background:radial-gradient(100% 80% at 30% 10%, var(--teal-lift), var(--teal-ink))'}">
  ${cream ? `<div class="abs" style="right:-200px;top:330px;width:760px;height:760px;border-radius:50%;background:var(--peach);opacity:0.6"></div>` : glow(800, 600, 'rgba(244,196,160,0.25)', 1000)}
  <div class="abs" style="left:70px;top:70px">${lockup(p.feature, { fg: cream ? 'var(--teal-ink)' : '#fff', tile: cream ? 'var(--teal)' : 'var(--peach)', mark: cream ? 'var(--peach)' : 'var(--teal)' })}</div>
  <div class="abs edit" style="left:70px;top:200px;width:560px;font-size:${p.hook.length > 44 ? 58 : 72}px;line-height:1.04;color:${fg};letter-spacing:-0.01em">${esc(words.slice(0, cut).join(' '))} <span style="font-style:italic;color:${cream ? 'var(--teal)' : 'var(--peach)'}">${esc(words.slice(cut).join(' ').replace(/[?!]$/, ''))}</span><span style="color:var(--gold)">${/[?!]$/.test(p.hook) ? p.hook.slice(-1) : '.'}</span></div>
  <div class="abs" style="left:74px;top:700px;width:70px;height:3px;background:var(--gold)"></div>
  <div class="abs" style="left:70px;top:740px;width:500px;display:flex;flex-direction:column;gap:28px">
    ${(p.bullets || []).map((b) => `<div style="display:flex;gap:16px;align-items:flex-start;color:${fg};font-size:31px;line-height:1.3;font-weight:600"><span style="flex:none;width:14px;height:14px;margin-top:11px;border-radius:50%;background:var(--gold)"></span>${esc(b)}</div>`).join('')}
  </div>
  <div class="abs" style="left:620px;top:150px;width:400px;height:860px;border-radius:64px;background:#0E1717;padding:14px;box-shadow:0 40px 80px rgba(0,0,0,0.35);transform:rotate(${cream ? 4 : -4}deg)">
    <div style="width:100%;height:100%;border-radius:52px;overflow:hidden;background:var(--teal);position:relative">${screenFor(p.feature, p)}</div>
  </div>
  <div class="abs" style="left:70px;bottom:120px;color:${cream ? 'var(--teal)' : 'var(--peach)'};font-family:'Edit';font-style:italic;font-size:34px">Try it in Rooted. Link in bio.</div>
  <div class="abs" style="left:70px;bottom:44px">${footer(cream ? 'var(--teal-ink)' : '#fff', cream ? 'rgba(45,74,74,0.08)' : 'rgba(0,0,0,0.25)')}</div>
</div>`;
}

// 9. Carousel slides (1080 x 1350). Returns an array of pages.
export function carousel(p) {
  const r = rng(p.date);
  const N = p.slides.length;
  const pages = [];
  const L = lines(p.hook, 4);
  pages.push(`<div id="stage" class="grain" style="background:radial-gradient(110% 80% at 50% 0%, var(--teal-lift), var(--teal) 45%, var(--teal-ink))">
    <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup(p.pillar)}</div>
    <div class="abs" style="left:-60px;top:820px;width:1200px;height:220px;background:var(--peach);transform:rotate(-5deg);clip-path:${torn(r, { amp: 8 })}"></div>
    <div class="abs" style="left:70px;top:210px;width:940px">${stack(L.map((t, i) => [t.toUpperCase(), i === L.length - 1 ? 'var(--peach)' : '#fff']), { w: 940, h: 560, max: 210 })}</div>
    <div class="abs script" style="left:0;right:0;top:868px;text-align:center;font-size:84px;color:var(--teal-ink);transform:rotate(-5deg)">swipe through</div>
    <div class="abs" style="left:0;right:0;top:1110px;text-align:center;color:#fff;font-size:28px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase">Save this for later →</div>
    <div class="abs" style="left:0;right:0;bottom:50px;display:flex;justify-content:center">${footer()}</div>
  </div>`);
  p.slides.forEach(([h, b], i) => {
    const alt = i % 2 === 1;
    pages.push(`<div id="stage" class="grain ${alt ? '' : 'paper'}" style="${alt ? 'background:var(--teal)' : '--grain:0.14'}">
      <div class="abs display" style="right:40px;top:20px;font-size:420px;line-height:1;color:transparent;-webkit-text-stroke:5px ${alt ? 'rgba(244,196,160,0.55)' : 'rgba(45,74,74,0.28)'}">${String(i + 1).padStart(2, '0')}</div>
      <div class="abs caps" style="left:84px;top:90px;font-size:19px;color:${alt ? 'var(--peach)' : 'var(--rust)'}">${esc(p.hookShort || p.pillar)}</div>
      <div class="abs" style="left:84px;top:470px;width:910px">
        <div class="edit" style="font-size:${h.length > 34 ? 84 : 104}px;line-height:1.04;font-weight:600;color:${alt ? '#fff' : 'var(--ink)'};letter-spacing:-0.01em">${esc(h)}</div>
        <div style="margin-top:22px;width:80px;height:4px;background:${alt ? 'var(--peach)' : 'var(--gold)'}"></div>
        <div style="margin-top:34px;font-size:46px;line-height:1.4;color:${alt ? 'rgba(255,255,255,0.88)' : 'var(--teal-ink)'};font-weight:500">${esc(b)}</div>
      </div>
      <div class="abs" style="left:84px;right:84px;bottom:60px;display:flex;justify-content:space-between;align-items:center;color:${alt ? 'rgba(255,255,255,0.7)' : 'rgba(26,31,31,0.6)'};font-weight:700;font-size:20px;letter-spacing:0.15em">
        <span>${i + 2} / ${N + 2}</span><span>${i < N - 1 ? 'SWIPE →' : '@STAY.ROOTEDAPP'}</span></div>
      <div class="abs" style="left:-40px;right:-40px;bottom:130px;height:120px;background:${alt ? 'var(--peach)' : 'var(--teal)'};opacity:0.95;transform:rotate(${i % 2 ? 2 : -2}deg);clip-path:${torn(r, { amp: 10 })}"></div>
    </div>`);
  });
  pages.push(`<div id="stage" class="grain paper" style="--grain:0.14">
    <div class="abs" style="left:0;right:0;top:0;height:560px;background:var(--teal)"></div>
    <div class="abs" style="left:0;right:0;top:80px;display:flex;justify-content:center">${lockup('', {})}</div>
    <div class="abs edit" style="left:90px;right:90px;top:220px;text-align:center;color:#fff;font-size:64px;line-height:1.1;font-style:italic">Faith that lasts <span style="color:var(--peach)">past Sunday.</span></div>
    <div class="abs" style="left:90px;right:90px;top:620px;text-align:center">${verseBlock(p.verse_text, p.verse_ref, { color: 'var(--ink)', size: 34, refColor: 'var(--rust)', max: 300 })}</div>
    <div class="abs" style="left:0;right:0;bottom:170px;display:flex;justify-content:center"><div class="pill" style="background:var(--teal);color:#fff;font-weight:700;font-size:30px;padding:24px 44px">Download Rooted: link in bio</div></div>
    <div class="abs" style="left:0;right:0;bottom:70px;display:flex;justify-content:center">${footer('var(--teal-ink)', 'rgba(45,74,74,0.08)')}</div>
  </div>`);
  return pages;
}
