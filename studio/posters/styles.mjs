// Which new layout a post uses, with its extra content. Verse quotes inside pills
// and lines are KJV wording from the cited verse.
const P = 'file://' + process.cwd() + '/photos/';
export const STYLE = {
  '2026-12-05': { layout: 'ticket', ticket: { code: 'R05', kicker: 'ONE WAY TO', sub: 'THE LITTLE TOWN', big: 'BETHLEHEM', dest: 'FINAL DESTINATION: THE KING', fields: [['GATE', 'MICAH'], ['TIME', '5:2'], ['ROW', 'HOPE'], ['SEAT', 'PEACE'], ['PASSENGER', 'YOU'], ['CLASS', 'FIRST']] } },
  '2026-12-19': { layout: 'blinds', blinds: { top: 'And the', big: 'WORD', script: 'was made flesh', pill: 'AND DWELT AMONG US', bottom: 'full of <b>grace</b> and <i>truth</i>.' } },
  '2027-01-02': { layout: 'badge', badge: { word: 'New', icon: 'sunrise', line: 'BEHOLD, I WILL DO A NEW THING' } },
  '2027-01-16': { layout: 'blinds', blinds: { top: 'Come unto me,<br><b>all ye that labour</b>', big: 'REST', script: 'is His gift', pill: 'AND I WILL GIVE YOU REST', bottom: 'Tired? Bring it to <i>Him</i>.' } },
  '2027-01-30': { layout: 'badge', badge: { word: 'Look up', icon: 'mountains', line: 'MY HELP COMETH FROM THE LORD', color: 'var(--teal)' } },
  '2027-02-13': { layout: 'ticket', ticket: { code: 'R14', kicker: 'ONE WAY', sub: 'PAID IN FULL', big: 'LOVE', dest: 'WHILE WE WERE YET SINNERS', fields: [['GATE', 'ROMANS'], ['TIME', '5:8'], ['ROW', 'GRACE'], ['SEAT', 'MERCY'], ['PASSENGER', 'YOU'], ['CLASS', 'FIRST']] } },
  '2027-03-13': { layout: 'badge', badge: { word: 'Mercy', icon: 'sunrise', line: 'THEY ARE NEW EVERY MORNING' } },
  '2027-04-10': { layout: 'blinds', blinds: { top: 'Now the God of hope<br><b>fill you with all joy</b> and peace', big: 'HOPE', script: 'that overflows', pill: 'THROUGH THE POWER OF THE HOLY GHOST', bottom: 'that ye may <i>abound</i> in hope.' } },
  '2027-04-24': { layout: 'bigScript', photo: P + 'hands-biblewell.jpg', big: { label: 'Weekend Verse', top: "HE'S NOT", big: 'FINISHED', script: 'with you', left: [['Verse', 'Phil 1:6'], ['Promise', 'He will finish it']], right: 'A GOOD WORK IN YOU', pos: '60% center' } },
  '2027-05-22': { layout: 'blinds', blinds: { top: 'The LORD thy God<br>in the midst of thee <b>is mighty</b>', big: 'REJOICE', script: 'He sings over you', pill: 'HE WILL JOY OVER THEE WITH SINGING', bottom: 'He will <i>rest</i> in his love.' } },
  // Sundays: big word + photo
  '2027-01-24': { layout: 'bigScript', photo: P + 'hands-biblewell.jpg', big: { label: 'Sunday Sermon', top: 'DON\'T LET IT', big: 'FADE', script: 'this Sunday', left: [['Open', 'SpiritScript'], ['Tap', 'Record']], right: 'EVERY VERSE SAVED', pos: '60% center' } },
  '2027-03-14': { layout: 'bigScript', photo: P + 'app-home-stones.jpg', big: { label: 'Sunday Sermon', top: 'HIT', big: 'RECORD', script: 'before church', left: [['Get', 'Transcript'], ['Get', 'Summary']], right: 'EVERY VERSE SAVED', pos: 'center' } },
  '2027-05-02': { layout: 'bigScript', photo: P + 'hands-biblewell.jpg', big: { label: 'Sunday Sermon', top: 'KEEP THE', big: 'SERMON', script: 'all week', left: [['Open', 'SpiritScript'], ['Tap', 'Record']], right: 'REREAD IT MONDAY', pos: '60% center' } },
};
// feature fliers with a real mockup photo
export const FEATURE_PHOTO = {
  'Bible Playzone': [P + 'hands-holyhunt.jpg', 'center 30%'],
  'Open Play': [P + 'hands-holyhunt.jpg', 'center 30%'],
  'The Gathering Place': [P + 'friends-mom-daughter-phone.jpg', '35% center'],
  'Find People': [P + 'friends-mom-daughter-phone.jpg', '35% center'],
  'DevoDesk': [P + 'app-devodesk-texture.jpg', 'center'],
  'SoulNotes': [P + 'app-soulnotes-dark.jpg', 'center'],
  'BibleWell': [P + 'hands-biblewell.jpg', '60% center'],
  'Daily Verse Drop': [P + 'app-home-stones.jpg', 'center'],
};
// per-date photo picks so the same shot doesn't repeat and screens match the post
export const PHOTO_BY_DATE = {
  '2027-02-06': [P + 'app-two-phones-dark.jpg', 'center'],
  '2027-05-21': [P + 'app-two-phones-dark.jpg', 'center'],
};
