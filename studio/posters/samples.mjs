import fs from 'node:fs';
import * as K from './kit.mjs';
const rows = JSON.parse(fs.readFileSync('plan182.json', 'utf8'));
const by = Object.fromEntries(rows.map((r) => [r.date, r]));
const P = (d, extra = {}) => { const r = by[d]; return { ...r.spec, ...r, verse_ref: r.verse_ref, verse_text: r.verse_text, ...extra }; };
const out = 'out2/samples/';
const jobs = [
  { out: out + 'sun.jpg', html: K.sermonPoster(P('2027-01-03'), 0) },
  { out: out + 'mon.jpg', html: K.sermonPoster(P('2027-01-11', { label: 'Monday', script: 'make it count' }), 1) },
  { out: out + 'verse1.jpg', html: K.collageVerse(P('2027-01-16'), 0) },
  { out: out + 'verse2.jpg', html: K.collageVerse(P('2027-02-27'), 1) },
  { out: out + 'wed.jpg', html: K.prayerCream(P('2027-01-13')) },
  { out: out + 'tot.jpg', html: K.thisOrThat(P('2027-01-15')) },
  { out: out + 'fill.jpg', html: K.fillBlank(P('2027-01-08')) },
  { out: out + 'tag.jpg', html: K.tagFriend(P('2026-12-18')) },
  { out: out + 'finish.jpg', html: K.finishVerse(P('2027-01-22')) },
  { out: out + 'spot1.jpg', html: K.spotlight(P('2026-12-12'), 0) },
  { out: out + 'spot2.jpg', html: K.spotlight(P('2026-12-26'), 1) },
  ...K.carousel(P('2027-01-26')).slice(0, 3).map((h, i) => ({ out: out + `car${i}.jpg`, html: h })),
];
fs.writeFileSync('/tmp/jobs.json', JSON.stringify(jobs));
