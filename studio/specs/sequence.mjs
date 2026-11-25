// Scene-by-scene typographic video. Each scene: { kind, dur, ... }.
//   hook:   { kicker, text, sub }
//   verse:  { text, ref, mark }       mark = phrase in text to underline in peach
//   line:   { text, sub, size }       one big statement
//   point:  { n, title, body }        numbered idea
//   list:   { title, items: [] }      items appear one by one
//   chat:   { bubbles: [{from, text, me}] }  text-message bubbles (sample names)
//   end:    { line, cta }
import { bug, endCard, esc } from './common.mjs';

const FADE = 0.35;

function markup(text, mark) {
  const t = esc(text);
  if (!mark) return t;
  const m = esc(mark);
  const i = t.indexOf(m);
  if (i < 0) throw new Error(`mark not found: ${mark}`);
  return `${t.slice(0, i)}<span class="mark">${m}</span>${t.slice(i + m.length)}`;
}

function scene(s, a, b, idx) {
  const out = b - FADE;
  const io = `data-out="${out}"`;
  switch (s.kind) {
    case 'hook':
      return `<div class="layer"><div class="abs" style="left:80px;right:100px;top:${s.top || 600}px">
        ${s.kicker ? `<div class="kicker" style="font-size:34px" data-in="${a}" ${io} data-a="fade">${esc(s.kicker)}</div>` : ''}
        <div class="serif" data-words="${a - 0.12}" data-gap="0.1" data-in="${a}" ${io} data-a="fade" data-d="0.01" style="margin-top:30px;font-size:${s.size || 104}px;font-weight:600;line-height:1.08">${esc(s.text)}</div>
        ${s.sub ? `<div class="serif peach" data-in="${a + (s.subAt || 1.1)}" ${io} style="margin-top:44px;font-size:58px;font-style:italic;line-height:1.25">${esc(s.sub)}</div>` : ''}
      </div></div>`;
    case 'verse':
      return `<div class="layer" style="display:flex;align-items:center;padding:0 110px 160px 90px"><div style="width:100%">
        <div class="serif peach" data-in="${a}" ${io} data-a="fade" style="font-size:150px;line-height:1;height:90px">“</div>
        <div class="serif vtext" id="v${idx}" data-in="${a - 0.12}" ${io} data-a="blur" data-d="0.9" style="font-size:${s.size || (s.text.length > 220 ? 58 : s.text.length > 140 ? 66 : 76)}px;line-height:1.34">${markup(s.text, s.mark)}</div>
        <div class="kicker" data-in="${a + 0.7}" ${io} style="margin-top:44px;font-size:32px">${esc(s.ref)}</div>
      </div></div>`;
    case 'line':
      return `<div class="layer center" style="padding:0 90px 0 80px"><div>
        <div class="serif" data-words="${a - 0.15}" data-gap="${s.gap || 0.09}" data-in="${a}" ${io} data-a="fade" data-d="0.01" style="font-size:${s.size || 92}px;font-weight:600;line-height:1.12">${esc(s.text)}</div>
        ${s.sub ? `<div class="serif peach" data-in="${a + (s.subAt || 1.0)}" ${io} style="margin-top:46px;font-size:${s.subSize || 56}px;font-style:italic;line-height:1.3">${esc(s.sub)}</div>` : ''}
      </div></div>`;
    case 'point':
      return `<div class="layer"><div class="abs" style="left:80px;right:100px;top:${s.top || 560}px">
        <div class="serif peach" data-in="${a}" ${io} data-a="pop" style="font-size:150px;font-weight:700;line-height:1">${esc(s.n)}</div>
        <div class="serif" data-in="${a + 0.15}" ${io} style="margin-top:30px;font-size:${s.size || 80}px;font-weight:600;line-height:1.12">${esc(s.title)}</div>
        ${s.body ? `<div data-in="${a + 0.5}" ${io} style="margin-top:34px;font-size:44px;line-height:1.4;color:var(--muted)">${esc(s.body)}</div>` : ''}
      </div></div>`;
    case 'list':
      return `<div class="layer"><div class="abs" style="left:80px;right:100px;top:${s.top || 420}px">
        <div class="serif" data-in="${a}" ${io} style="font-size:${s.size || 78}px;font-weight:600;line-height:1.1">${esc(s.title)}</div>
        <div style="margin-top:50px">${s.items.map((it, k) => `
          <div class="li" data-in="${a + 0.5 + k * (s.step || 0.7)}" ${io} data-a="left">
            <span class="dot">${k + 1}</span><span>${esc(it)}</span></div>`).join('')}</div>
      </div></div>`;
    case 'chat':
      return `<div class="layer"><div class="abs" style="left:80px;right:100px;top:${s.top || 520}px">
        ${s.title ? `<div class="kicker" data-in="${a}" ${io} style="font-size:30px;margin-bottom:40px">${esc(s.title)}</div>` : ''}
        ${s.bubbles.map((m, k) => `
          <div class="bub ${m.me ? 'me' : ''}" data-in="${a + 0.3 + k * (s.step || 1.1)}" ${io} data-a="pop">
            ${m.from && !m.me ? `<div class="from">${esc(m.from)}</div>` : ''}${esc(m.text)}</div>`).join('')}
      </div></div>`;
    case 'end':
      return `<div class="layer">${endCard(a, s.line, s.cta)}</div>`;
    default:
      throw new Error('unknown scene ' + s.kind);
  }
}

export function sequence(scenes, { bugUntil } = {}) {
  let t = 0;
  const parts = [];
  const marks = [];
  scenes.forEach((s, i) => {
    const a = t + (i === 0 ? 0 : 0.05);
    const b = t + s.dur;
    parts.push(scene(s, a, s.kind === 'end' ? Infinity : b, i));
    if (s.kind === 'verse' && s.mark) marks.push({ i, at: a + (s.markAt || 1.6) });
    t = b;
  });
  const duration = t;
  const html = `${bug(0.2)}${parts.join('')}`;
  const css = `
    .mark { color:#fff; background-image: linear-gradient(var(--peach), var(--peach)); background-repeat: no-repeat; background-position: 0 96%;
            background-size: var(--w, 0%) 9px; -webkit-box-decoration-break: clone; box-decoration-break: clone; padding-bottom: 6px; }
    .li { display:flex; align-items:flex-start; gap:28px; margin-bottom:34px; font-size:50px; font-weight:600; line-height:1.25; }
    .li .dot { flex:none; width:70px; height:70px; border-radius:22px; background: var(--peach-soft); border:2px solid rgba(244,196,160,0.45);
               color: var(--peach); display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:800; margin-top:-4px; }
    .bub { max-width: 78%; padding: 28px 34px; border-radius: 40px; background: rgba(255,255,255,0.1); font-size: 44px; line-height:1.3; margin-bottom: 26px; transform-origin: left bottom; }
    .bub .from { font-size: 28px; font-weight:700; color: var(--peach); margin-bottom: 8px; }
    .bub.me { margin-left: auto; background: var(--peach); color: var(--teal); font-weight:600; transform-origin: right bottom; }`;
  const frame = new Function('t', `
    const marks = ${JSON.stringify(marks)};
    marks.forEach(({ i, at }) => {
      const el = document.querySelector('#v' + i + ' .mark');
      if (el) el.style.setProperty('--w', (E.outCubic(E.clamp((t - at) / 0.7)) * 100).toFixed(1) + '%');
    });`);
  return { duration, html, css, frame };
}
