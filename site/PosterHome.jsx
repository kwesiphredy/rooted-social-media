import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sprout, Plane } from 'lucide-react';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/storeLinks';
import './poster.css';

// Real photos (Pexels), shown in the Rooted teal duotone like the fliers.
const M = 'https://media.base44.com/images/public/69e00ff2ae83438254c1c495/';
const PHOTO = {
  worship: M + '26fcedc691a0268d2b7f312d912a2647_worship-hands-raised-stage.webp',
  notes: M + '3ca2075368d8a0e8447fdb1d9495f153_man-writing-notes-bible.webp',
  coffee: M + '16ec60de2596ebd6ae5e6b4cecf1a5f2_bible-coffee-morning.webp',
  prayer: M + '4bb1deb2f89aca153d961235cae4d190_woman-holding-bible-eyes-closed.webp',
  friends: M + 'ef06d4d1bb374287024bee5559f06113_friends-bible-study-table.webp',
  group: M + '2ac5a47c04e13d1a5b3347e5d65e7189_group-praying-livingroom.webp',
  sunrise: M + '74ef7946c9c22c8045c3f485d783cf0b_silhouette-arms-raised-sunrise.webp',
  flowers: M + 'db646d4a00cf1d951a2e5639b6224a3a_open-bible-coffee-flowers.webp',
  journal: M + 'fbdaba752e1258d636769000fad7c6e0_woman-journaling-bed.webp',
  family: M + 'd7b9e535012b426dfe0266d7097a7c06_family-praying-dinner.webp',
  discuss: M + '57f326236370b801854fcafebf3c3923_friends-bible-discussion.jpeg',
  womenCouch: M + 'c5a1d0cd0801573c5d0570aa158849aa_women-bible-couch.jpeg',
  writing: M + '07561edf0285098a32a9d6eee44eb0cf_woman-writing-journal.jpeg',
  worshipWoman: M + 'c918eda3625ef843a94fab1ae68494b8_worship-woman-hand-raised.webp',
};

// Real Rooted app screens, two per feature.
const SHOTS = {
  spiritscript: ['f99b613d3295c546872cae777689e612_403bf7b3f_rooted-spirit-2-summary-real-phone.webp', '7fdc217a45b7781ec333c5bd24b6d61a_e6aaef0d8_rooted-spirit-4-highlights-real-phone.webp'],
  biblewell: ['48c6a7ab3bb9e27489a6f6e94acc987d_19d80f157_rooted-bible-2-reader-phone.webp', 'ff731ab52bcd27e8253601ddce51e196_0418af7bf_rooted-bible-3-verse-real-phone.webp'],
  devodesk: ['232d1225f2f9d3c3476e4b601307e849_4fbe563cc_rooted-devo-1-home-phone.webp', 'f6444a2811b8cbe38d8035a17e71256b_961964c4d_rooted-devo-5-step-phone.webp'],
  soulnotes: ['d42d78ad94f7ab23008dfd40e8378320_7b449e4a9_rooted-soul-1-home-phone.webp', '335c175e55a41af792ec7aa68891ddb7_1b2b397ac_rooted-soul-5-entry-phone.webp'],
  prayerwall: ['c24b3d90a1f996474b5bd0ccd34dff38_16ed0906a_rooted-prayer-1-home-real-phone.webp', 'a0e270801aa36d0a8069233cbebce2fc_746025c0b_rooted-prayer-4-pray-phone.webp'],
  playzone: ['caea8f3efc57eb065d87aae5fb024ca0_a2e3e6a88_rooted-play-hub-real-phone.webp', '4c3a2c18feafb49a0b1a43ccf0704d51_57a12340e_rooted-play-trivia-q1-phone.webp'],
  gathering: ['520639f381a64ae58b8d045f8666f02c_da72635e1_rooted-gather-1-home-phone.webp', '896d98057446868b59c93cf32db70408_637f19e2e_rooted-gather-4-prayer-phone.webp'],
};

const SOCIAL = {
  instagram: 'https://www.instagram.com/stay.rootedapp',
  tiktok: 'https://www.tiktok.com/@stay.rootedapp',
};

/* ---------- small pieces ---------- */
function rng(seed) { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
function Torn({ color, side = 'bottom', seed = 3 }) {
  const r = rng(seed); const n = 48; const pts = [];
  for (let i = 0; i <= n; i++) pts.push(`${(i / n) * 100}% ${side === 'bottom' ? 20 + r() * 55 : 80 - r() * 55}%`);
  const poly = side === 'bottom' ? `polygon(0 100%, ${pts.join(',')}, 100% 100%)` : `polygon(0 0, ${pts.join(',')}, 100% 0)`;
  return <div className={`ps-torn ${side}`} aria-hidden="true" style={{ background: color, clipPath: poly }} />;
}
function Duo({ src, alt = '', className = '', style, pos }) {
  return <div className={`ps-duo ${className}`} style={style}><img src={src} alt={alt} loading="lazy" style={pos ? { objectPosition: pos } : undefined} /></div>;
}
function Tape({ style }) { return <span className="ps-tape" aria-hidden="true" style={style} />; }
function Phone({ src, alt, className = '', style }) {
  return <div className={`ps-phone ${className}`} style={style}><img src={src} alt={alt} loading="lazy" /></div>;
}
function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`ps-rv ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</Tag>;
}
const AppleLogo = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM14.1 5.84c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.79 1.02.08 2.05-.52 2.68-1.27z" /></svg>);
const PlayLogo = () => (<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.3-9.7z" fill="#00D7FE" /><path d="M16 15.2 12.9 12l3.1-3.2 3.8 2.2c1.1.6 1.1 1.7 0 2.3z" fill="#FFCE00" /><path d="M16 15.2 12.9 12l-9.3 9.7c.4.4 1 .4 1.7.1z" fill="#FF3A44" /><path d="M16 8.8 5.3 2.2c-.7-.4-1.3-.3-1.7.1l9.3 9.7z" fill="#00F076" /></svg>);
const IG = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>);
const TT = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2 1.7 3.4 3.9 3.6v3a7.4 7.4 0 0 1-3.9-1.2v6.3A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3z" /></svg>);

function Stores() {
  return (
    <div className="ps-stores">
      <a className="ps-store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"><AppleLogo /><span><small>Download on the</small><strong>App Store</strong></span></a>
      <a className="ps-store" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"><PlayLogo /><span><small>GET IT ON</small><strong>Google Play</strong></span></a>
    </div>
  );
}
const TRUST = ['7-day trial', 'iPhone and Android', 'Cancel anytime'];
const shot = (id, i = 0) => (SHOTS[id] ? M + SHOTS[id][i] : undefined);

/* ---------- nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [['#week', 'Why Rooted'], ['#features', 'Features'], ['#how', 'How it works'], ['#pricing', 'Pricing']];
  return (
    <nav className="ps-nav">
      <div className="ps-nav-bg ps-paper" style={{ clipPath: 'polygon(0 0,100% 0,100% 86%,96% 90%,91% 86%,85% 91%,78% 87%,71% 92%,64% 86%,57% 90%,49% 85%,42% 91%,35% 86%,28% 90%,20% 85%,13% 91%,6% 86%,0 90%)' }} />
      <div className="ps-shell ps-nav-bar">
        <a href="#" className="ps-logo"><span className="tile"><Sprout size={21} color="#F4C4A0" /></span><span className="name">Rooted</span></a>
        <div className="ps-nav-links">
          {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          <a href="#download" className="ps-btn teal">Get the app</a>
        </div>
        <button className="ps-burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={26} /> : <Menu size={26} />}</button>
      </div>
      {open && (
        <div className="ps-paper ps-mobile">
          {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a href="#download" className="ps-btn teal" onClick={() => setOpen(false)}>Get the app</a>
        </div>
      )}
    </nav>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <header className="ps-hero ps-grain">
      <Duo src={PHOTO.worshipWoman} className="ps-hero-bg" alt="" />
      <div className="ps-hero-bg-fade" />
      <div className="ps-shell ps-hero-in">
        <div className="ps-hero-copy">
          <Reveal><div className="ps-hero-kicker ps-caps"><span className="bar" />Bible study, prayer and sermon notes</div></Reveal>
          <Reveal delay={0.08}>
            <h1 className="ps-display">Sunday fills<br /><span className="pe">you up.</span></h1>
          </Reveal>
          <Reveal delay={0.16}><div className="ps-hero-strip ps-block">Then Monday happens.</div></Reveal>
          <Reveal delay={0.24}><p className="ps-hero-script ps-script">Stay rooted all week.</p></Reveal>
          <Reveal delay={0.3}>
            <p className="ps-p ps-hero-lede">Rooted keeps the word with you after the service ends: your sermon notes, your Bible, your devotions, your prayers and your people, in one app.</p>
            <Stores />
            <ul className="ps-trust">{TRUST.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="ps-hero-art">
          <div className="sticker"><span>Faith<br />past<br />Sunday</span></div>
          <div style={{ position: 'relative' }}>
            <Tape style={{ top: -10, right: '14%', transform: 'rotate(8deg)' }} />
            <Phone src={shot('spiritscript', 0)} alt="SpiritScript sermon summary in Rooted" />
          </div>
          <figure className="ps-pola" style={{ margin: 0 }}>
            <Tape style={{ top: -14, left: '30%', width: 90, transform: 'rotate(-6deg)' }} />
            <Duo src={PHOTO.notes} alt="A man writing sermon notes in his Bible" />
            <figcaption>Monday notes, sorted.</figcaption>
          </figure>
        </Reveal>
      </div>
      <Torn color="#F2E9DB" side="bottom" seed={7} />
    </header>
  );
}

/* ---------- the week ---------- */
const DAYS = [
  { d: 'Sun', small: 'the service', photo: PHOTO.worship, cap: 'The word hits. You feel it.', pos: '50% 30%' },
  { d: 'Mon', small: 'the morning after', photo: PHOTO.notes, cap: 'Wait... what was point three?' },
  { d: 'Wed', small: 'the midweek dip', photo: PHOTO.journal, cap: 'Feeling far. Busy. Tired.', pos: '50% 35%' },
];
function Week() {
  return (
    <section id="week" className="ps-week ps-paper">
      <div className="ps-shell">
        <Reveal>
          <div className="ps-caps" style={{ color: 'var(--rust)' }}>Why Rooted</div>
          <h2 className="ps-display" style={{ marginTop: 14 }}>Faith that lasts<br /><span className="ru">past Sunday.</span></h2>
          <p className="ps-p ps-week-sub">Most of us feel close to God on Sunday and drift by Wednesday. Not because we don't care, but because life gets loud. Sound familiar?</p>
        </Reveal>
        <div className="ps-week-grid">
          {DAYS.map((x, i) => (
            <Reveal key={x.d} delay={i * 0.08} className="ps-day">
              <div className="label">{x.d}<small>{x.small}</small></div>
              <figure className="ps-pola" style={{ margin: 0 }}>
                <Tape style={{ top: -14, left: i === 1 ? '58%' : '18%', width: 96, transform: `rotate(${i === 1 ? 7 : -5}deg)` }} />
                <Duo src={x.photo} pos={x.pos} alt="" style={i === 1 ? { '--duo': '#8A4A2C', '--duo-a': .6 } : undefined} />
                <figcaption>{x.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="ps-week-end">
          <div className="big">That's where Rooted lives.</div>
          <p>Monday through Saturday. Record the sermon, open the Bible, pray, journal and play, with the people who keep you going.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- features ---------- */
const FEATURES = [
  { id: 'spiritscript', name: 'SpiritScript', tag: 'Keep the sermon', photo: PHOTO.discuss, note: 'Every verse he mentioned, saved.',
    d: "Record Sunday's message and Rooted turns it into notes you can keep: a summary, every scripture reference, the lines worth remembering and what to do next.",
    caps: ['Transcribes the sermon as it is preached', 'Summary and key takeaways', 'Every scripture reference found', 'A sermon library you can search'] },
  { id: 'biblewell', name: 'BibleWell', tag: 'Understand the Word', photo: PHOTO.coffee, note: 'Tap a verse. Get it in plain words.',
    d: 'Read and listen to Scripture in a calm reader. Highlight, bookmark, and tap any verse for a plain-language explanation. Audio picks up where you stopped.',
    caps: ['Audio Bible that remembers your place', 'Highlights, notes and bookmarks', 'Verses explained in plain language'] },
  { id: 'devodesk', name: 'DevoDesk', tag: 'A devotion for your season', photo: PHOTO.womenCouch, note: '15 minutes. Every weekday.',
    d: 'A guided devotion built on Observe, Interpret, Apply and planned around your week, so what you study fits what you are walking through.',
    caps: ['Weekly devotion plans', 'Guided Observe, Interpret, Apply', 'Streaks that keep you going'] },
  { id: 'soulnotes', name: 'SoulNotes', tag: 'Your private journal', photo: PHOTO.writing, pos: '50% 25%', note: 'Look back and see what God did.',
    d: 'Write or speak your reflections, prayers and answered prayers. Private by default, so you can be honest.',
    caps: ['Private by default', 'Seasons and moods over time', 'Write or speak your entries'] },
  { id: 'prayerwall', name: 'Upper Room', tag: 'Pray with purpose', photo: PHOTO.prayer, note: 'Mark it answered.',
    d: 'Keep your prayer requests in one place, set aside quiet time with God, and mark the answers as they come.',
    caps: ['Your personal prayer list', 'Guided prayer time', 'Answered prayers to look back on'] },
  { id: 'playzone', name: 'Bible Playzone', tag: 'Learn by playing', photo: PHOTO.family, note: 'Comment your score.',
    d: 'Bible Trivia, HolyHunt, RhemaRush and Parable Remix. Play solo, start a room with friends, or tap Open Play to play with anyone in the app.',
    caps: ['Four Scripture games', 'Live rooms with a code', 'Leaderboards and crowns'] },
  { id: 'gathering', name: 'The Gathering Place', tag: 'Find your people', photo: PHOTO.friends, note: 'Church after church.',
    d: 'Chat with friends and groups, share verses and notes, post on the Prayer Wall, and find believers from your own church.',
    caps: ['Group chats and messages', 'Prayer Wall for the community', 'Find People from your church'] },
];
const BG = ['paper', 'dark', 'paper', 'deep', 'paper', 'dark', 'paper'];

function Feature({ f, i }) {
  const bg = BG[i];
  const flip = i % 2 === 1;
  const a = shot(f.id, 0); const b = shot(f.id, 1);
  return (
    <section id={`f-${f.id}`} className={`ps-feat ps-grain ${bg === 'paper' ? 'ps-paper' : bg} ${flip ? 'flip' : ''}`}>
      <div className="ps-shell ps-feat-in">
        <Reveal className="ps-feat-copy">
          <div className="ps-feat-num">{String(i + 1).padStart(2, '0')}</div>
          <div className="ps-feat-tag">{f.tag}</div>
          <h3 className="ps-display">{f.name}</h3>
          <p className="ps-p ps-feat-d">{f.d}</p>
          <ul className="ps-list">{f.caps.map((c) => <li key={c}>{c}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.1} className="ps-feat-art">
          <Duo src={f.photo} pos={f.pos} className="photo" alt="" style={bg === 'paper' ? undefined : { '--duo': '#8A4A2C', '--duo-a': .55 }} />
          {b && <Phone src={b} alt={`${f.name} in Rooted`} className="ph2" />}
          {a && (
            <div className="ph1">
              <Tape style={{ top: -12, left: '28%', width: 96, transform: `rotate(${flip ? 6 : -6}deg)` }} />
              <Phone src={a} alt={`${f.name} in Rooted`} />
            </div>
          )}
          <div className="note">{f.note}</div>
        </Reveal>
      </div>
    </section>
  );
}
function Features() {
  return (
    <div id="features">
      <section className="ps-feat-head ps-grain" style={{ background: 'var(--teal-deep)' }}>
        <Torn color="#F2E9DB" side="top" seed={11} />
        <div className="ps-shell">
          <Reveal>
            <div className="ps-caps" style={{ color: 'var(--peach)' }}>What's inside</div>
            <h2 className="ps-display" style={{ marginTop: 14 }}>Seven tools.<br /><span className="pe">One app.</span></h2>
            <nav className="ps-chips" aria-label="Features">
              {FEATURES.map((f) => <a key={f.id} className="ps-chip" href={`#f-${f.id}`}>{f.name}</a>)}
            </nav>
          </Reveal>
        </div>
      </section>
      {FEATURES.map((f, i) => <Feature key={f.id} f={f} i={i} />)}
    </div>
  );
}

/* ---------- verse ---------- */
function Verse() {
  return (
    <section className="ps-verse ps-grain">
      <Duo src={PHOTO.flowers} className="ps-verse-bg" alt="" />
      <Reveal className="ps-verse-card ps-paper">
        <Tape style={{ top: -14, left: '12%', transform: 'rotate(-8deg)' }} />
        <Tape style={{ top: -14, right: '12%', transform: 'rotate(7deg)' }} />
        <div className="w">Rooted</div>
        <q>Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving.</q>
        <cite>Colossians 2:7 (KJV)</cite>
      </Reveal>
    </section>
  );
}

/* ---------- how it works ---------- */
const STEPS = [
  ['Download and sign in', 'Get Rooted on iPhone or Android, create your account, and start your 7-day trial.'],
  ['Make it yours', 'Pick your focus, your Bible translation and your devotion rhythm.'],
  ['Start small', 'Record a sermon, open a devotion, or just read today\'s verse.'],
  ['Grow with others', 'Pray for each other, celebrate answers, play and study together.'],
];
function How() {
  return (
    <section id="how" className="ps-how ps-paper">
      <div className="ps-shell">
        <Reveal><h2 className="ps-display">Your boarding pass<br /><span className="ru">to every day.</span></h2></Reveal>
        <Reveal delay={0.1} className="ps-ticket ps-grain">
          <div className="ps-ticket-main">
            <div className="ps-ticket-top"><span className="ps-caps">Rooted · Boarding pass</span><span className="ps-caps">Seat: yours</span></div>
            <div className="ps-route">
              <div><div className="k">From</div><div className="v">Sunday</div></div>
              <Plane className="plane" />
              <div className="to"><div className="k">To</div><div className="v">Every day</div></div>
            </div>
            <ol className="ps-steps">
              {STEPS.map(([t, d], i) => (
                <li key={t}><div className="n">0{i + 1}</div><h4>{t}</h4><p>{d}</p></li>
              ))}
            </ol>
          </div>
          <div className="ps-ticket-stub">
            <div className="row"><div className="k">Passenger</div><div className="v">You</div></div>
            <div className="row"><div className="k">Gate</div><div className="v">App Store / Google Play</div></div>
            <div className="row"><div className="k">Boarding</div><div className="v">Now</div></div>
            <div className="ps-barcode" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */
const PLANS = [
  { name: 'Grounded', badge: 'Start here', price: '$9.99', yr: 'or $89.99 a year', cls: 'a ps-paper',
    tag: 'A steady way to stay in the Word, check in with your heart and keep your prayers organized.',
    feats: ['SpiritScript: 4 hours of sermons a month', 'SoulNotes journal: 6-month archive', 'DevoDesk: 6-month archive', 'Prayer Wall and Upper Room', 'BibleWell and Bible Playzone', 'Community and messages'] },
  { name: 'Deeply Rooted', badge: 'Keep everything', price: '$19.99', yr: 'or $179.99 a year', cls: 'b',
    tag: 'For holding on to every lesson, every breakthrough and every prayer. Build your library and keep your story.',
    feats: ['SpiritScript: 10 hours of sermons a month', 'SoulNotes journal: unlimited, forever', 'DevoDesk: unlimited, forever', 'Prayer Wall and Upper Room', 'BibleWell and Bible Playzone', 'Community and messages'] },
];
function Pricing() {
  return (
    <section id="pricing" className="ps-price ps-grain" style={{ background: 'var(--teal)' }}>
      <div className="ps-shell">
        <Reveal>
          <h2 className="ps-display">Own your<br /><span className="pe">journey.</span></h2>
          <p className="ps-p ps-price-sub">Every plan starts with a 7-day trial. Cancel anytime in your App Store or Google Play account.</p>
        </Reveal>
        <div className="ps-plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className={`ps-plan ${p.cls}`}>
                <Tape style={{ top: -14, left: 24, width: 100, transform: 'rotate(-7deg)' }} />
                <span className="badge">{p.badge}</span>
                <h3 className="ps-display">{p.name}</h3>
                <div className="price"><b>{p.price}</b><span>/month</span></div>
                <div className="yr">{p.yr}</div>
                <p className="tag">{p.tag}</p>
                <a href="#download" className="ps-btn teal">Start your 7-day trial</a>
                <ul>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="ps-price-note">Seven tools in one app · iPhone, iPad and Android</p>
      </div>
    </section>
  );
}

/* ---------- download ---------- */
function Download() {
  return (
    <section id="download" className="ps-dl ps-grain">
      <Duo src={PHOTO.sunrise} className="ps-dl-bg" alt="" />
      <Torn color="#2D4A4A" side="top" seed={19} />
      <div className="ps-shell ps-dl-in">
        <Reveal>
          <div className="ps-caps" style={{ color: 'var(--peach)' }}>Rooted: Bible Study & Prayer</div>
          <h2 className="ps-display" style={{ marginTop: 14 }}>Get <span className="pe">rooted.</span></h2>
          <div className="ps-script">Faith that lasts past Sunday.</div>
          <Stores />
          <ul className="ps-trust">{TRUST.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="ps-social">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Rooted on Instagram"><IG /></a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Rooted on TikTok"><TT /></a>
            <span>@stay.rootedapp</span>
          </div>
        </Reveal>
      </div>
      <Torn color="#F4C4A0" side="bottom" seed={23} />
    </section>
  );
}

export default function PosterHome({ footer }) {
  return (
    <div className="ps">
      <Nav />
      <Hero />
      <Week />
      <Features />
      <Verse />
      <How />
      <Pricing />
      <Download />
      {footer}
    </div>
  );
}
