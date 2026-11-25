// Rooted poster kit, part 2: boarding pass, vintage badge, blinds-light verse,
// big word with signature script, and real-photo feature posters.
import { esc, rng, lockup, footer } from './kit.mjs';
import { SPROUT } from '../specs/common.mjs';

const barcode = (r, h = 620, w = 90) => {
  let x = 0, s = '';
  while (x < h) { const t = 2 + Math.floor(r() * 7); if (r() > 0.35) s += `<rect x="0" y="${x}" width="${w}" height="${t}"/>`; x += t + 2 + Math.floor(r() * 4); }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="var(--ink)">${s}</svg>`;
};
const qr = (r, n = 21, size = 150) => {
  const c = size / n; let s = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const finder = (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
    if (finder) { const fx = x < 7 ? x : x - (n - 7), fy = y < 7 ? y : y - (n - 7); const on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx > 1 && fx < 5 && fy > 1 && fy < 5); if (on) s += `<rect x="${x * c}" y="${y * c}" width="${c}" height="${c}"/>`; }
    else if (r() > 0.52) s += `<rect x="${x * c}" y="${y * c}" width="${c}" height="${c}"/>`;
  }
  return `<svg width="${size}" height="${size}" fill="var(--ink)">${s}</svg>`;
};
const PLANE = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;

// 1. Boarding pass. t = {kicker, sub, big, dest, fields:[[k,v]...], ref}
export function ticket(p) {
  const r = rng(p.date + 't'); const t = p.ticket;
  return `<div id="stage" class="grain" style="background:radial-gradient(100% 80% at 50% 0%, var(--teal-lift), var(--teal-ink))">
  <div class="abs paper" style="left:110px;top:60px;width:860px;height:1230px;border-radius:34px;box-shadow:0 40px 80px rgba(0,0,0,0.45);overflow:hidden">
    <div class="abs" style="left:0;right:0;top:0;height:14px;background:var(--peach)"></div>
    <div class="abs" style="left:56px;top:54px;display:flex;align-items:center;gap:14px;color:var(--teal)"><div style="width:44px;height:44px;border-radius:12px;background:var(--teal);color:var(--peach);display:flex;align-items:center;justify-content:center"><div style="width:26px;height:26px">${SPROUT}</div></div><div style="font-weight:800;letter-spacing:0.22em;font-size:18px">ROOTED AIRWAYS</div></div>
    <div class="abs" style="right:150px;top:62px;font-family:monospace;font-size:24px;color:var(--teal-ink)">${esc(t.code || 'R01')}</div>
    <div class="abs" style="left:46px;top:220px">${barcode(r)}</div>
    <div class="abs caps" style="left:6px;top:840px;transform:rotate(-90deg);transform-origin:left top;font-size:24px;color:var(--teal-ink)">Boarding pass</div>
    <div class="abs" style="right:96px;top:0;bottom:0;border-left:4px dashed rgba(45,74,74,0.35)"></div>
    <div class="abs" style="right:-30px;top:560px;width:60px;height:60px;border-radius:50%;background:var(--teal-ink)"></div>
    <div class="abs caps" style="right:36px;top:330px;transform:rotate(90deg);transform-origin:right top;font-size:18px;color:var(--teal);white-space:nowrap">You are going places</div>
    <div class="abs" style="right:30px;top:820px;width:34px;color:var(--teal)">${PLANE}</div>
    <div class="abs" style="left:190px;right:130px;top:200px;text-align:center">
      <div class="block" style="font-size:66px;color:var(--ink)">${esc(t.kicker)}</div>
      <div style="font-size:22px;letter-spacing:0.3em;font-weight:700;color:var(--teal);margin-top:8px">${esc(t.sub)}</div>
    </div>
    <div class="abs" style="left:300px;top:390px;width:300px;height:300px;opacity:0.12;background:linear-gradient(var(--teal),var(--teal)) center/70px 100% no-repeat, linear-gradient(var(--teal),var(--teal)) center 30%/100% 70px no-repeat"></div>
    <div class="abs" style="left:400px;top:470px;width:110px;color:var(--teal-ink)">${PLANE}</div>
    <div class="abs" style="left:190px;right:130px;top:600px;text-align:center">
      <div class="fitbox" data-h="200" style="width:540px;margin:0 auto"><div class="fitline block" data-max="170" style="color:var(--teal)">${esc(t.big)}</div></div>
      <div style="margin-top:22px;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);padding:14px 0;font-size:22px;letter-spacing:0.28em;font-weight:700;color:var(--ink)">${esc(t.dest)}</div>
    </div>
    <div class="abs" style="left:190px;right:130px;top:900px">
      <div style="display:flex;gap:0">${t.fields.slice(0, 4).map(([k, v], i) => `<div style="flex:1;${i ? 'border-left:2px solid rgba(26,31,31,0.25);padding-left:16px' : ''}"><div style="font-size:15px;letter-spacing:0.2em;font-weight:700;color:var(--teal)">${esc(k)}</div><div class="block" style="font-size:32px;margin-top:6px;color:var(--ink)">${esc(v)}</div></div>`).join('')}</div>
      <div style="display:flex;gap:30px;margin-top:30px;align-items:flex-end">${t.fields.slice(4).map(([k, v]) => `<div><div style="font-size:15px;letter-spacing:0.2em;font-weight:700;color:var(--teal)">${esc(k)}</div><div class="block" style="font-size:32px;margin-top:6px;color:var(--ink)">${esc(v)}</div></div>`).join('')}
      <div style="margin-left:auto">${qr(r, 21, 130)}</div></div>
    </div>
    <div class="abs" style="left:56px;right:130px;bottom:40px;display:flex;justify-content:space-between;font-size:16px;letter-spacing:0.18em;font-weight:700;color:rgba(26,31,31,0.6)"><span>@STAY.ROOTEDAPP</span><span>${esc(p.verse_ref.replace(' (KJV)', '').toUpperCase())} · KJV</span></div>
  </div>
</div>`;
}

const SPECK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='9'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.91  0 0 0 0 0.86  0 0 0 -9 5.2'/></filter><rect width='100%' height='100%' filter='url(%23s)'/></svg>")`;
// distressed print mask
const DISTRESS = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='d'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.7'/></filter><rect width='100%' height='100%' filter='url(%23d)'/></svg>")`;
const ICON = {
  mountains: `<svg viewBox="0 0 600 220" fill="currentColor"><path d="M0 220 L120 90 L170 140 L260 20 L340 120 L390 70 L470 150 L520 110 L600 220 Z"/><path d="M260 20 L235 60 L255 52 L270 70 L282 45 Z" fill="var(--cream)"/><path d="M120 90 L104 110 L120 104 L132 116 Z" fill="var(--cream)"/><path d="M390 70 L376 90 L392 84 L402 96 Z" fill="var(--cream)"/></svg>`,
  sunrise: `<svg viewBox="0 0 600 240" fill="currentColor"><path d="M150 200 A150 150 0 0 1 450 200 Z"/>${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (i + 0.5) / 11; const x1 = 300 - Math.cos(a) * 175, y1 = 200 - Math.sin(a) * 175, x2 = 300 - Math.cos(a) * 250, y2 = 200 - Math.sin(a) * 250; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>`; }).join('')}<rect x="40" y="212" width="520" height="14" rx="7"/></svg>`,
  waves: `<svg viewBox="0 0 600 200" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round">${[40, 90, 140].map((y) => `<path d="M20 ${y} q 40 -40 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0"/>`).join('')}</svg>`,
};
// 2. Vintage badge print on cream. b = {word, icon, line, color}
export function badge(p) {
  const b = p.badge; const col = b.color || 'var(--rust)';
  return `<div id="stage" class="paper grain" style="--grain:0.18">
  <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup('', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs" style="left:0;right:0;top:250px;display:flex;flex-direction:column;align-items:center;color:${col}">
    <div style="border:9px solid ${col};border-radius:50%;padding:18px 70px 8px"><span class="script" style="font-size:118px;line-height:1">${esc(b.word)}</span></div>
    <div style="width:620px;margin-top:40px">${ICON[b.icon]}</div>
    <div class="block" style="margin-top:44px;font-size:68px;text-align:center;line-height:1.02;max-width:860px">${esc(b.line)}</div>
    <div class="script" style="margin-top:22px;font-size:46px">${esc(p.verse_ref.replace(' (KJV)', ''))}</div>
  </div>
  <div class="abs speck" style="left:0;right:0;top:230px;height:820px"></div>
  <div class="abs" style="left:110px;right:110px;bottom:140px;text-align:center;font-family:'Edit',serif;font-style:italic;font-size:28px;line-height:1.45;color:var(--teal-ink)">“${esc(p.verse_text.length > 230 ? p.verse_text.slice(0, p.verse_text.lastIndexOf(' ', 230)) + '...' : p.verse_text)}”</div>
  <div class="abs" style="left:0;right:0;bottom:50px;display:flex;justify-content:center">${footer('var(--teal-ink)', 'rgba(45,74,74,0.08)')}</div>
</div>`;
}

// 3. Blinds light: warm wall with slatted window shadow, big word, script, pill. l = {top, big, script, pill, bottom}
export function blinds(p) {
  const l = p.blinds;
  return `<div id="stage" class="grain" style="--grain:0.28;background:linear-gradient(160deg, #D9B999 0%, #C69A76 55%, #8E6A52 100%)">
  <div class="abs" style="inset:-200px;transform:rotate(-28deg);background:repeating-linear-gradient(0deg, rgba(28,48,48,0.0) 0 46px, rgba(28,48,48,0.55) 46px 86px);filter:blur(10px)"></div>
  <div class="abs" style="inset:0;background:radial-gradient(70% 60% at 60% 40%, rgba(255,230,200,0.35), transparent 70%)"></div>
  <div class="abs" style="left:-120px;bottom:-60px;width:620px;height:760px;background:rgba(19,34,34,0.5);filter:blur(30px);border-radius:45% 55% 40% 60%;transform:rotate(-18deg)"></div>
  <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup('', { fg: '#FFF6EC' })}</div>
  <div class="abs caps" style="left:40px;top:675px;transform:rotate(-90deg);transform-origin:left top;font-size:18px;color:#FFF6EC;white-space:nowrap">· ${esc(p.verse_ref.replace(' (KJV)', ''))} ·</div>
  <div class="abs caps" style="right:40px;top:520px;transform:rotate(90deg);transform-origin:right top;font-size:18px;color:#FFF6EC;white-space:nowrap">· ${esc(p.verse_ref.replace(' (KJV)', ''))} ·</div>
  <div class="abs" style="left:100px;right:100px;top:300px;text-align:center;color:#FFF6EC">
    <div style="font-size:30px;font-weight:500;line-height:1.35">${l.top}</div>
    <div style="width:3px;height:60px;background:#FFF6EC;margin:22px auto"></div>
    <div class="fitbox" data-h="260" style="width:880px"><div class="fitline" data-max="250" style="font-family:'Sans';font-weight:800;letter-spacing:-0.02em;line-height:0.9;color:#FFF6EC">${esc(l.big)}</div></div>
    <div class="script" style="font-size:92px;margin-top:-34px;color:var(--peach);text-shadow:0 4px 20px rgba(0,0,0,0.25)">${esc(l.script)}</div>
    <div style="display:inline-block;margin-top:18px;border:3px solid #FFF6EC;border-radius:999px;padding:10px 30px;font-weight:800;font-size:26px;letter-spacing:0.06em">${esc(l.pill)}</div>
    <div style="width:3px;height:60px;background:#FFF6EC;margin:22px auto"></div>
    <div style="font-size:30px;font-weight:500;line-height:1.35">${l.bottom}</div>
  </div>
  <div class="abs" style="left:0;right:0;bottom:50px;display:flex;justify-content:center">${footer('#FFF6EC', 'rgba(19,34,34,0.35)')}</div>
</div>`;
}

// 4. Big word with signature script and a photo card (GRACE style). g = {top, big, script, left:[[k,v]], right}
export function bigScript(p) {
  const g = p.big; const ph = p.photo;
  return `<div id="stage" class="paper grain" style="--grain:0.2">
  <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center">${lockup(g.label || '', { fg: 'var(--teal-ink)', tile: 'var(--teal)', mark: 'var(--peach)' })}</div>
  <div class="abs block" style="left:0;right:0;top:185px;text-align:center;font-size:54px;color:var(--ink);display:flex;align-items:center;justify-content:center;gap:22px"><span style="width:70px;height:10px;background:var(--ink)"></span>${esc(g.top)}<span style="width:70px;height:10px;background:var(--ink)"></span></div>
  <div class="abs" style="left:50px;top:250px;width:980px"><div class="fitbox" data-h="330" style="width:980px;text-align:center"><div class="fitline display" data-max="330" style="background:linear-gradient(90deg, var(--rust), var(--apricot) 55%, var(--gold));-webkit-background-clip:text;color:transparent;line-height:0.95">${esc(g.big)}</div></div></div>
  <div class="abs script" style="left:0;right:0;top:470px;text-align:center;font-size:120px;color:var(--teal-ink);transform:rotate(-6deg);opacity:0.92">${esc(g.script)}</div>
  ${ph ? `<div class="abs" style="left:330px;top:640px;width:420px;height:520px;border-radius:26px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.3);border:10px solid var(--cream);transform:rotate(2deg)"><div style="width:100%;height:100%;background:url('${ph}') ${g.pos || 'center'}/cover;filter:saturate(0.9) contrast(1.05)"></div></div>` : ''}
  <div class="abs" style="left:70px;top:690px;width:240px">${(g.left || []).map(([k, v]) => `<div style="margin-bottom:28px"><div class="caps" style="font-size:16px;color:var(--rust)">${esc(k)}</div><div class="block" style="font-size:38px;margin-top:6px;color:var(--ink)">${esc(v)}</div></div>`).join('')}</div>
  <div class="abs" style="right:66px;top:720px;width:230px;text-align:left">
    <div style="border:3px solid var(--rust);border-radius:50%;padding:30px 20px;text-align:center;transform:rotate(-6deg)"><div class="block" style="font-size:28px;color:var(--ink);line-height:1.1">${esc(g.right)}</div></div>
  </div>
  <div class="abs" style="left:80px;right:80px;bottom:120px;text-align:center;font-family:'Edit',serif;font-style:italic;font-size:27px;color:var(--teal-ink);line-height:1.4">“${esc(p.verse_text.length > 160 ? p.verse_text.slice(0, p.verse_text.lastIndexOf(' ', 160)) + '...' : p.verse_text)}” <span style="font-style:normal;font-weight:700;font-family:'Sans';font-size:18px;letter-spacing:0.18em;color:var(--rust)">${esc(p.verse_ref.toUpperCase())}</span></div>
  <div class="abs" style="left:0;right:0;bottom:44px;display:flex;justify-content:center">${footer('var(--teal-ink)', 'rgba(45,74,74,0.08)')}</div>
</div>`;
}

// 5. Real photo feature poster: photo full bleed, glass pills list, headline.
export function photoFeature(p) {
  const words = p.hook.replace(/\.$/, '').split(' ');
  const cut = Math.max(1, Math.ceil(words.length * 0.5));
  return `<div id="stage" class="grain" style="background:var(--teal-ink)">
  <div class="abs" style="inset:0;background:url('${p.photo}') ${p.photoPos || 'center'}/cover"></div>
  <div class="abs" style="inset:0;background:linear-gradient(180deg, rgba(19,34,34,0.82) 0%, rgba(19,34,34,0.2) 38%, rgba(19,34,34,0.15) 55%, rgba(19,34,34,0.9) 100%)"></div>
  <div class="abs" style="left:70px;top:66px">${lockup(p.feature)}</div>
  <div class="abs edit" style="left:70px;top:180px;width:940px;color:#fff;font-size:${p.hook.length > 40 ? 70 : 84}px;line-height:1.03;letter-spacing:-0.01em;text-shadow:0 6px 30px rgba(0,0,0,0.35)">${esc(words.slice(0, cut).join(' '))} <span style="font-style:italic;color:var(--peach)">${esc(words.slice(cut).join(' ').replace(/[?!]$/, ''))}</span><span style="color:var(--gold)">${/[?!]$/.test(p.hook) ? p.hook.slice(-1) : '.'}</span></div>
  <div class="abs" style="left:70px;bottom:150px;width:560px;display:flex;flex-direction:column;gap:14px">
    ${(p.bullets || []).map((b, i) => `<div style="display:flex;align-items:center;gap:16px;padding:18px 24px;border-radius:999px;background:${i === 0 ? 'rgba(244,196,160,0.95)' : 'rgba(30,48,48,0.55)'};backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.18);color:${i === 0 ? 'var(--teal-ink)' : '#fff'};font-size:26px;font-weight:600"><span style="width:12px;height:12px;border-radius:50%;background:${i === 0 ? 'var(--teal)' : 'var(--peach)'};flex:none"></span>${esc(b)}<span style="margin-left:auto;opacity:0.6;letter-spacing:2px">•••</span></div>`).join('')}
  </div>
  <div class="abs" style="left:70px;bottom:52px">${footer('#fff', 'rgba(0,0,0,0.35)')}</div>
</div>`;
}
