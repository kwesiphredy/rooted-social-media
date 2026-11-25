// Carousel slides (1080 x 1350) and verse graphics (any size).
// Slide kinds:
//   cover: { kicker, title, sub }            first slide, with a swipe cue
//   verse: { n, text, ref, label }           scripture slide
//   item:  { n, title, body, ref }           one idea per slide
//   cta:   { title, sub, cta }               last slide, logo and link
import { SPROUT, esc } from './common.mjs';

const brand = (n, total) => `
  <div class="cb"><span class="m">${SPROUT}</span>Rooted</div>
  ${total ? `<div class="cnum">${n} / ${total}</div>` : ''}`;

export function slideHtml(s, n, total) {
  const inner = (() => {
    switch (s.kind) {
      case 'cover': return `
        <div class="pad" style="justify-content:center">
          ${s.kicker ? `<div class="kicker" style="font-size:30px;margin-bottom:34px">${esc(s.kicker)}</div>` : ''}
          <div class="serif" style="font-size:${s.size || 108}px;font-weight:600;line-height:1.06">${esc(s.title)}</div>
          ${s.sub ? `<div class="serif peach" style="margin-top:40px;font-size:52px;font-style:italic;line-height:1.3">${esc(s.sub)}</div>` : ''}
          <div class="swipe">Swipe <span>→</span></div>
        </div>`;
      case 'verse': return `
        <div class="pad" style="justify-content:center">
          ${s.label ? `<div class="kicker" style="font-size:28px;margin-bottom:26px">${s.n ? `<span class="peach">${esc(s.n)}</span>&nbsp;&nbsp;` : ''}${esc(s.label)}</div>` : ''}
          <div class="serif peach" style="font-size:150px;line-height:1;height:80px;margin-top:10px;overflow:visible">“</div>
          <div class="serif" style="font-size:${s.size || (s.text.length > 200 ? 54 : s.text.length > 120 ? 62 : 72)}px;line-height:1.34">${esc(s.text)}</div>
          <div class="kicker" style="margin-top:42px;font-size:30px">${esc(s.ref)}</div>
        </div>`;
      case 'item': return `
        <div class="pad" style="justify-content:center">
          <div class="serif peach" style="font-size:150px;font-weight:700;line-height:1">${esc(s.n)}</div>
          <div class="serif" style="margin-top:28px;font-size:${s.size || 92}px;font-weight:600;line-height:1.1">${esc(s.title)}</div>
          ${s.body ? `<div style="margin-top:40px;font-size:46px;line-height:1.45;color:var(--muted)">${esc(s.body)}</div>` : ''}
          ${s.ref ? `<div class="kicker" style="margin-top:40px;font-size:28px">${esc(s.ref)}</div>` : ''}
        </div>`;
      case 'cta': return `
        <div class="pad center" style="justify-content:center">
          <div style="width:170px;height:170px;border-radius:50px;background:var(--peach);display:flex;align-items:center;justify-content:center">
            <div style="width:96px;height:96px;color:var(--teal)">${SPROUT}</div></div>
          <div class="serif" style="margin-top:50px;font-size:${s.size || 80}px;font-weight:600;line-height:1.12">${esc(s.title)}</div>
          ${s.sub ? `<div class="serif peach" style="margin-top:30px;font-size:48px;font-style:italic;line-height:1.3">${esc(s.sub)}</div>` : ''}
          <div class="pill" style="margin-top:56px;font-size:36px;padding:22px 44px">${esc(s.cta || 'Download Rooted: link in bio')}</div>
          <div style="margin-top:30px;font-size:36px;font-weight:600;color:var(--peach)">@stay.rootedapp</div>
        </div>`;
    }
    throw new Error('kind ' + s.kind);
  })();
  return `${brand(n, total)}${inner}`;
}

export const carouselCss = `
  .pad { position:absolute; left:90px; right:90px; top:150px; bottom:150px; display:flex; flex-direction:column; }
  .cb { position:absolute; left:90px; top:70px; display:flex; align-items:center; gap:14px; font-family:var(--serif); font-weight:600; font-size:34px; color:var(--peach); }
  .cb .m { width:52px; height:52px; border-radius:16px; background:var(--peach); display:flex; align-items:center; justify-content:center; }
  .cb .m svg { width:30px; height:30px; color:var(--teal); }
  .cnum { position:absolute; right:90px; top:80px; font-size:28px; font-weight:600; color:var(--muted); letter-spacing:0.08em; }
  .swipe { position:absolute; bottom:0; right:0; font-size:32px; font-weight:600; color:var(--peach); display:flex; gap:12px; align-items:center; }
  .swipe span { font-size:40px; }`;

export function carousel(slides) {
  return { W: 1080, H: 1350, css: carouselCss, slides: slides.map((s, i) => slideHtml(s, i + 1, slides.length)) };
}

// Single verse graphic in the given size (1080x1350 feed, 1000x1500 Pinterest,
// 1080x1920 story). Peach variant flips the colours.
export function verseGraphic({ text, ref, kicker, W = 1080, H = 1350, peachBg = false, cross = false }) {
  const big = W * H > 1.8e6;
  const fs = text.length > 160 ? (big ? 64 : 58) : text.length > 90 ? (big ? 76 : 68) : (big ? 92 : 84);
  const css = carouselCss + `
    #stage { ${peachBg ? 'background: radial-gradient(120% 80% at 50% 30%, #F8D6BC 0%, #F4C4A0 60%, #E9B48E 100%) !important; color: var(--teal);' : ''} }
    .vg { position:absolute; left:${Math.round(W * 0.09)}px; right:${Math.round(W * 0.09)}px; top:0; bottom:0; display:flex; flex-direction:column; justify-content:center; text-align:center; align-items:center; }
    ${peachBg ? '.cb { color: var(--teal) } .cb .m { background: var(--teal) } .cb .m svg { color: var(--peach) } .kicker { color: var(--teal) }' : ''}`;
  const crossSvg = `<svg width="70" height="100" viewBox="0 0 70 100" style="margin-bottom:46px"><rect x="29" y="0" width="12" height="100" rx="3" fill="${peachBg ? '#2D4A4A' : '#F4C4A0'}"/><rect x="5" y="26" width="60" height="12" rx="3" fill="${peachBg ? '#2D4A4A' : '#F4C4A0'}"/></svg>`;
  const slide = `
    <div class="cb" style="left:50%;transform:translateX(-50%);top:${Math.round(H * 0.06)}px"><span class="m">${SPROUT}</span>Rooted</div>
    <div class="vg">
      ${cross ? crossSvg : ''}
      ${kicker ? `<div class="kicker" style="font-size:30px;margin-bottom:40px">${esc(kicker)}</div>` : ''}
      <div class="serif" style="font-size:${fs}px;line-height:1.34;${peachBg ? 'color:var(--teal)' : ''}">${esc(text)}</div>
      <div class="kicker" style="margin-top:50px;font-size:32px">${esc(ref)}</div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:${Math.round(H * 0.06)}px;text-align:center;font-size:32px;font-weight:600;${peachBg ? 'color:var(--teal)' : 'color:var(--peach)'}">@stay.rootedapp</div>`;
  return { W, H, css, slides: [slide] };
}
