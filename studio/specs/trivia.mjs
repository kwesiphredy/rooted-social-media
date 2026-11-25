// Trivia Thursday template: hook, 3 multiple-choice questions with a 3 second
// countdown and reveal, "comment your score", end card.
import { bug, endCard, esc } from './common.mjs';

const LET = ['A', 'B', 'C', 'D'];
const QLEN = 6.4;

export function trivia({ kicker = 'Trivia Thursday', hook1, hook2, questions, outro = 'Play the full round in Rooted' }) {
  const hookEnd = 2.9;
  const qStart = (i) => hookEnd + i * QLEN;
  const scoreAt = qStart(questions.length);
  const endAt = scoreAt + 3.0;
  const duration = endAt + 4.2;

  const qHtml = questions.map((q, i) => {
    const s = qStart(i);
    const out = s + QLEN - 0.35;
    const opts = q.options.map((o, j) => `
      <div class="opt" id="q${i}o${j}" data-in="${s + 0.55 + j * 0.12}" data-out="${out}" data-a="left" data-dist="80">
        <span class="let">${LET[j]}</span><span class="otext">${esc(o)}</span></div>`).join('');
    return `
    <div class="layer" style="padding:0 80px">
      <div class="abs" style="left:80px;right:80px;top:330px">
        <div class="kicker" style="font-size:30px" data-in="${s}" data-out="${out}" data-a="fade">Question ${i + 1} of ${questions.length}</div>
        <div class="serif qtext" data-in="${s + 0.1}" data-out="${out}" style="margin-top:26px;font-size:${q.size || (q.q.length > 60 ? 70 : 80)}px;font-weight:600;line-height:1.12">${esc(q.q)}</div>
      </div>
      <div class="abs opts" style="left:80px;right:80px;top:${q.optTop || (q.q.length > 60 ? 780 : 720)}px">${opts}</div>
      <div class="abs ring" id="ring${i}" style="left:50%;top:1420px;margin-left:-80px" data-in="${s + 1.0}" data-out="${s + 4.15}" data-a="pop">
        <svg width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" stroke="rgba(244,196,160,0.2)" stroke-width="10" fill="none"/>
        <circle id="arc${i}" cx="80" cy="80" r="70" stroke="#F4C4A0" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="440" transform="rotate(-90 80 80)"/></svg>
        <div id="num${i}" class="serif" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:700;color:var(--peach)">3</div>
      </div>
      <div class="abs reveal" data-in="${s + 4.3}" data-out="${out}" style="left:80px;right:80px;top:1440px;text-align:center">
        <div class="serif" style="font-size:46px;font-style:italic;line-height:1.3;color:#fff">${esc(q.note)}</div>
      </div>
    </div>`;
  }).join('');

  const html = `
  ${bug(0.2)}
  <div class="layer" style="padding:0 80px">
    <div class="abs" style="left:80px;right:80px;top:640px">
      <div class="kicker" style="font-size:34px" data-in="0.05" data-out="${hookEnd - 0.3}" data-a="fade">${esc(kicker)}</div>
      <div class="serif" data-words="0.15" data-gap="0.12" data-in="0" data-out="${hookEnd - 0.3}" data-a="fade" data-d="0.01" style="margin-top:30px;font-size:118px;font-weight:600;line-height:1.05">${esc(hook1)}</div>
      <div class="serif peach" data-in="1.05" data-out="${hookEnd - 0.3}" style="margin-top:44px;font-size:64px;font-style:italic;line-height:1.2">${esc(hook2)}</div>
    </div>
  </div>
  ${qHtml}
  <div class="layer" style="padding:0 80px">
    <div class="abs" style="left:80px;right:80px;top:520px;text-align:center">
      <div class="serif" data-in="${scoreAt}" data-out="${endAt - 0.3}" style="font-size:104px;font-weight:600;line-height:1.08">How many did you get?</div>
      <div data-in="${scoreAt + 0.4}" data-out="${endAt - 0.3}" style="margin-top:70px;display:flex;justify-content:center;gap:24px">
        ${['0/3', '1/3', '2/3', '3/3'].map((x, k) => `<span class="pill score" data-in="${scoreAt + 0.45 + k * 0.1}" data-out="${endAt - 0.3}" data-a="pop" style="font-size:44px;padding:22px 34px">${x}</span>`).join('')}
      </div>
      <div class="serif peach" data-in="${scoreAt + 0.9}" data-out="${endAt - 0.3}" style="margin-top:70px;font-size:60px;font-style:italic">Comment your score. Be honest.</div>
    </div>
  </div>
  <div class="layer">${endCard(endAt, outro + '.')}</div>`;

  const css = `
  .opt { display:flex; align-items:center; gap:30px; margin-bottom:26px; padding:30px 34px; border-radius:30px;
         background: rgba(255,255,255,0.07); border: 3px solid rgba(244,196,160,0.28); font-size:48px; font-weight:600; line-height:1.2; }
  .opt .let { flex:none; width:76px; height:76px; border-radius:22px; background: rgba(244,196,160,0.16); color: var(--peach);
              display:flex; align-items:center; justify-content:center; font-weight:800; font-size:40px; }
  .opt.right { background: var(--peach); color: var(--teal); border-color: var(--peach); }
  .opt.right .let { background: var(--teal); color: var(--peach); }`;

  const answers = questions.map((q) => q.answer);
  const starts = questions.map((_, i) => qStart(i));
  const frame = new Function('t', `
    const answers = ${JSON.stringify(answers)}, starts = ${JSON.stringify(starts)};
    starts.forEach((s, i) => {
      const c0 = s + 1.0, rev = s + 4.15;
      const p = E.clamp((t - c0) / 3);
      const arc = document.getElementById('arc' + i);
      if (arc) arc.setAttribute('stroke-dashoffset', String(440 * p));
      const num = document.getElementById('num' + i);
      if (num) num.textContent = String(Math.max(1, 3 - Math.floor((t - c0))));
      for (let j = 0; j < 4; j++) {
        const el = document.getElementById('q' + i + 'o' + j);
        if (!el) continue;
        const revealed = t >= rev;
        el.classList.toggle('right', revealed && j === answers[i]);
        if (revealed && j !== answers[i]) el.style.opacity = String(Math.min(parseFloat(el.style.opacity || '1'), 0.32));
        if (revealed && j === answers[i]) {
          const k = E.outBack(E.clamp((t - rev) / 0.4));
          el.style.transform = (el.style.transform || '') + ' scale(' + (0.96 + 0.04 * k) + ')';
        }
      }
    });`);

  return { duration, html, css, frame };
}
