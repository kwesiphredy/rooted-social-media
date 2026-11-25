// Render every new post in plan182.json into out2/<date>/ (feed.jpg or slide-XX.jpg).
// node posters/build_all.mjs [date ...]
import fs from 'node:fs';
import * as K from './kit.mjs';
import * as K2 from './kit2.mjs';
import { STYLE, FEATURE_PHOTO, PHOTO_BY_DATE } from './styles.mjs';
const rows = JSON.parse(fs.readFileSync('plan182.json', 'utf8'));
const only = process.argv.slice(2);
const photos = fs.existsSync('photos/manifest.json') ? JSON.parse(fs.readFileSync('photos/manifest.json', 'utf8')) : [];

const FEATURE_BULLETS = {
  'Open Play': ['Open a game for anyone to join', 'Rooted lets everyone know', 'Play live together'],
  'Bible Playzone': ['Bible Trivia, HolyHunt, Parable Remix, RhemaRush', 'Live game rooms with friends', 'Leaderboards'],
  'The Gathering Place': ['Chat with other believers', 'Share verses and notes', 'Join groups'],
  'Prayer Wall': ['Share a prayer request', 'Pray for others', 'Celebrate answered prayers'],
};
const SEASON_RAIL = {
  '2026-12-24': ['Christmas', 'Eve', 'Luke 2'], '2027-02-14': ["Valentine's", 'Day', '1 John 4'],
  '2027-03-21': ['Palm', 'Sunday', 'Hosanna'], '2027-03-27': ['Holy', 'Saturday', 'Isaiah 53'],
  '2027-03-28': ['He is', 'risen', 'Easter'], '2027-05-08': ["Mother's", 'Day', 'Weekend'],
  '2027-05-16': ['Pentecost', 'Sunday', 'Acts 2'], '2027-05-31': ['Memorial', 'Day', 'We remember'],
};
const pickPhoto = (tags) => { if (!tags) return null; const m = photos.find((x) => tags.some((t) => (x.tags || []).includes(t)) && !x.used); if (m) { m.used = true; return 'file://' + process.cwd() + '/photos/' + m.file; } return null; };

const PH = (n) => 'file://' + process.cwd() + '/photos/' + n + '.jpg';
const POOLS = {
  sunday: ['worship-hands-raised-stage', 'worship-woman-hand-raised', 'friends-worship-guitar-livingroom', 'two-men-bible-study', 'man-writing-notes-bible', 'hands-reading-bible-notes', 'silhouette-arms-raised-sunrise'],
  monday: ['man-writing-notes-bible', 'friends-bible-study-table', 'hands-reading-bible-notes', 'two-men-bible-study', 'bible-journal-phone-flatlay', 'woman-studying-bible-note'],
  prayer: ['woman-praying-open-bible', 'man-praying-black-and-white', 'young-man-praying-outdoors', 'woman-holding-bible-eyes-closed', 'group-praying-livingroom', 'man-praying-hands-sunlight', 'family-praying-dinner', 'couple-praying-dinner', 'family-three-generations-praying', 'journal-writing-bible', 'woman-journaling-bed'],
  verse: ['silhouette-open-arms-sky', 'silhouette-arms-raised-sunset', 'silhouette-arms-raised-sunrise', 'open-bible-coffee-flowers', 'bible-flatlay-flowers', 'bible-coffee-morning', 'man-reading-bible-dim'],
  carousel: ['friends-bible-study-table', 'man-reading-bible-dim', 'bible-coffee-morning', 'woman-studying-bible-note', 'man-holding-bible-desk', 'group-praying-livingroom', 'bible-breakfast-morning', 'two-men-bible-study', 'hands-reading-bible-notes', 'open-bible-coffee-flowers', 'friends-worship-guitar-livingroom'],
};
const idx = {}; const next = (k) => { idx[k] = (idx[k] || 0) + 1; const a = POOLS[k]; return PH(a[(idx[k] - 1) % a.length]); };
const PRAYER_PICK = { '2027-05-12': 'family-three-generations-praying', '2027-03-17': 'family-praying-dinner', '2027-01-27': 'group-praying-livingroom', '2027-04-28': 'woman-studying-bible-note' };
const jobs = []; let vSun = 0, vSat = 0, vVerse = 0;
for (const r of rows) {
  if (r.source !== 'New' || r.kind === 'trivia') continue;
  if (only.length && !only.includes(r.date)) continue;
  const p = { ...r.spec, ...r, verse_ref: r.verse_ref, verse_text: r.verse_text, date: r.date };
  const dir = `out2/${r.date}/`;
  const dow = new Date(r.date + 'T12:00:00').getDay();
  let pages = [];
  const st = STYLE[r.date];
  if (st) { Object.assign(p, st); pages = [K2[st.layout](p)]; }
  else if (r.kind === 'spotlight' && FEATURE_PHOTO[p.feature]) { p.bullets = p.bullets || FEATURE_BULLETS[p.feature] || []; [p.photo, p.photoPos] = PHOTO_BY_DATE[r.date] || FEATURE_PHOTO[p.feature]; pages = [K2.photoFeature(p)]; }
  else if (r.kind === 'carousel') { p.photo = next('carousel'); pages = K.carousel(p); }
  else if (r.kind === 'flier' && r.pillar === 'Keep the Sermon') {
    if (dow === 0) { p.label = 'Sunday Sermon'; p.script = 'before church'; p.photo = next('sunday'); pages = [K.sermonPoster(p, 0)]; }
    else { p.label = 'Monday'; p.script = 'this week'; p.bandPhoto = next('monday'); p.strip = [['Reread', 'The summary'], ['Read', 'Every verse'], ['Do', 'One thing']]; pages = [K.sermonPoster(p, 1)]; }
  } else if (r.kind === 'flier') { p.photo = PRAYER_PICK[r.date] ? PH(PRAYER_PICK[r.date]) : next('prayer'); p.dayname = r.date === '2027-05-06' ? 'National Day of Prayer' : 'Wednesday'; pages = [K.prayerCream(p)]; }
  else if (r.kind === 'verse') { if (!['2026-12-24', '2027-03-28', '2027-05-16'].includes(r.date)) p.photo = next('verse'); p.rail = SEASON_RAIL[r.date] || ['Rooted', 'Weekend', 'Verse']; pages = [K.collageVerse(p, vVerse++)]; }
  else if (r.kind === 'engage') {
    const st = r.spec.style;
    pages = [st === 'this-or-that' ? K.thisOrThat(p) : st === 'fill-blank' ? K.fillBlank(p) : st === 'tag' ? K.tagFriend(p) : K.finishVerse(p)];
  } else if (r.kind === 'spotlight') { p.bullets = p.bullets || FEATURE_BULLETS[p.feature] || []; pages = [K.spotlight(p, vSat++)]; }
  pages.forEach((html, i) => jobs.push({ out: dir + (pages.length > 1 ? `slide-${String(i + 1).padStart(2, '0')}.jpg` : 'feed.jpg'), html }));
}
fs.writeFileSync('/tmp/jobs_all.json', JSON.stringify(jobs));
console.log('jobs', jobs.length);
