// Animation helpers that run inside the page. Everything is a pure function of
// time t (seconds), so any frame can be drawn on its own.
window.E = {
  clamp: (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)),
  outCubic: (p) => 1 - Math.pow(1 - p, 3),
  outBack: (p) => { const c = 1.4; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
  inOut: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  prog(t, start, dur) { return this.clamp((t - start) / dur); },
};

// Declarative motion: data-in (s), data-out (s, optional), data-a (up | down |
// fade | pop | left | right | blur), data-d (in duration), data-od (out duration).
function applyDeclarative(t) {
  document.querySelectorAll('[data-in]').forEach((el) => {
    const tin = parseFloat(el.dataset.in);
    const tout = el.dataset.out != null ? parseFloat(el.dataset.out) : Infinity;
    const d = parseFloat(el.dataset.d || '0.55');
    const od = parseFloat(el.dataset.od || '0.35');
    const kind = el.dataset.a || 'up';
    let p = E.outCubic(E.prog(t, tin, d));
    let q = t >= tout ? E.prog(t, tout, od) : 0; // 0..1 leaving
    const pb = kind === 'pop' ? E.outBack(E.prog(t, tin, d)) : p;
    let o = p * (1 - q);
    let tf = '';
    const dist = parseFloat(el.dataset.dist || '60');
    if (kind === 'up') tf = `translateY(${(1 - p) * dist - q * 30}px)`;
    if (kind === 'down') tf = `translateY(${-(1 - p) * dist + q * 30}px)`;
    if (kind === 'left') tf = `translateX(${(1 - p) * dist}px)`;
    if (kind === 'right') tf = `translateX(${-(1 - p) * dist}px)`;
    if (kind === 'pop') tf = `scale(${0.6 + 0.4 * pb - q * 0.08})`;
    if (kind === 'blur') el.style.filter = `blur(${(1 - p) * 18 + q * 10}px)`;
    el.style.opacity = o.toFixed(3);
    el.style.transform = tf;
    el.style.visibility = o < 0.002 ? 'hidden' : 'visible';
  });
  // Word by word reveal: data-words on a container, each word fades up in turn.
  document.querySelectorAll('[data-words]').forEach((el) => {
    if (!el._split) {
      el._split = true;
      el.innerHTML = el.innerHTML.split(/(\s+)/).map((w) => (/^\s+$/.test(w) ? w : `<span class="w" style="display:inline-block">${w}</span>`)).join('');
    }
    const start = parseFloat(el.dataset.words);
    const gap = parseFloat(el.dataset.gap || '0.09');
    el.querySelectorAll('.w').forEach((w, i) => {
      const p = E.outCubic(E.prog(t, start + i * gap, 0.45));
      w.style.opacity = p.toFixed(3);
      w.style.transform = `translateY(${(1 - p) * 26}px)`;
    });
  });
}

window.__seek = (t) => {
  applyDeclarative(t);
  if (window.frame) window.frame(t);
};
