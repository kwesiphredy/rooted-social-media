import json, datetime as dt, re, sys
sys.path.insert(0,'.')
from kjv import kjv
import plan182_content as C

HASH = {
 "Keep the Sermon": "#sermonnotes #church #christiantiktok #faith #rootedapp",
 "Understand the Word": "#biblestudy #bibleverse #scripture #christian #rootedapp",
 "Pray & Write": "#prayer #prayerjournal #christianwomen #faith #rootedapp",
 "Trivia Thursday": "#bibletrivia #biblegames #christianfun #triviathursday #rootedapp",
 "Faith with Friends": "#christiancommunity #smallgroup #faithfriends #church #rootedapp",
 "Seasonal": "#bibleverse #christian #faith #holidays #rootedapp",
 "Weekend Verse": "#bibleverse #dailyverse #christian #faith #rootedapp",
 "Feature Spotlight": "#christianapp #biblestudy #christian #faith #rootedapp",
}
TIME = {0:"07:00",1:"07:00",2:"07:00",3:"19:00",4:"07:00",5:"07:00",6:"14:00"}
FMT = {"carousel":"Carousel (7 slides)","flier":"Flier","verse":"Verse graphic","trivia":"Trivia video",
       "engage":"Comment flier","spotlight":"Feature flier"}
def off(d): return "-05:00" if d >= dt.date(2027,3,14) else "-06:00"
errs=[]
def clean(t):
    t=re.sub(r'\s+',' ',t.replace('[','').replace(']','')).strip()
    return t
def verse_txt(ref):
    try:
        t=clean(kjv(ref))
        if not t: errs.append(f"no text {ref}")
        return t
    except Exception as e:
        errs.append(f"{ref}: {e}"); return ""

existing = json.load(open('/home/claude/rooted-social-media/schedule.json'))['posts']
ex = {p['post_at'][:10]: p for p in existing}
rows=[]
d=dt.date(2026,12,1)
while d<=dt.date(2027,5,31):
    k=d.isoformat()
    if k in ex:
        p=ex[k]
        cap=p['caption']
        rows.append(dict(date=k, day=d.strftime('%a'), time=p['post_at'][11:16], pillar=p['pillar'],
            fmt={"video":"Video (made)","carousel":"Carousel (made)","graphic":"Verse graphic (made)"}[p['kind']],
            feature="", hook=p['hook'], content="Already made and in the posting folder.", verse_ref="", verse_text="",
            caption=cap, status="Ready", source="Made earlier"))
    else:
        e=C.P[k]
        ref=e.get('verse'); vt=verse_txt(ref) if ref else ""
        kind=e['kind']; lines=[]
        if kind=="carousel":
            lines.append(f"1. Cover: {e['hook']}")
            for i,(h,b) in enumerate(e['slides'],2): lines.append(f"{i}. {h}: {b}")
            lines.append(f"7. Verse + CTA: \"{vt}\" {ref} (KJV) | Save this. @stay.rootedapp")
        elif kind=="flier":
            lines.append(f"Headline: {e['hook']}")
            lines.append(f"Verse: \"{vt}\" {ref} (KJV)")
            lines.append(f"Footer: {e['body']}")
        elif kind=="verse":
            lines.append(f"Top line: {e['hook']}")
            lines.append(f"Verse: \"{vt}\" {ref} (KJV)")
            lines.append("Footer: @stay.rootedapp")
        elif kind=="trivia":
            lines.append(f"Hook: {e['hook']}")
            for i,(q,opts,a,r,proof) in enumerate(e['questions'],1):
                t=verse_txt(r)
                if proof.lower() not in t.lower(): errs.append(f"{k} trivia {i}: '{proof}' not in {r}: {t}")
                lines.append(f"Q{i}. {q} A) {opts[0]} B) {opts[1]} C) {opts[2]} | Answer: {opts[a]} ({r})")
            lines.append("End: Comment your score. Play more in the Bible Playzone.")
        elif kind=="engage":
            st=e['style']
            lines.append(f"Style: {dict(**{'this-or-that':'This or That','fill-blank':'Fill in the blank','tag':'Tag a friend','finish':'Finish the verse'})[st]}")
            lines.append(f"Headline: {e['hook']}")
            if e.get('options'): lines.append(f"Options: {e['options'][0]} | {e['options'][1]}")
            if st=="finish":
                lines.append(f"Answer (in caption, hidden at bottom): \"{vt}\" {ref} (KJV)")
        elif kind=="spotlight":
            lines.append(f"Headline: {e['hook']}")
            for b in e.get('bullets') or []: lines.append(f"- {b}")
            lines.append(f"Feature: {e['feature']} | CTA: Try it in Rooted. Link in bio.")
        # caption
        q=e['q']; pill=e['pillar']
        if kind=="carousel": intro="Save this so you can come back to it."
        elif kind=="flier": intro=e.get('body','')
        elif kind=="verse": intro=f"{ref} (KJV)"
        elif kind=="trivia": intro="Trivia Thursday! Answers are in the video."
        elif kind=="spotlight":
            intro = e['hook'] + (" " + ". ".join(e['bullets'])+"." if e.get('bullets') else f" Find it in {e['feature']} in Rooted.")
        else: intro=""
        cta = "Save and share." if e.get('cta')=="share" else "Download Rooted: link in bio."
        cap="\n\n".join(x for x in [ (intro+" "+q).strip(), cta, HASH[pill]] if x)
        if kind=="engage" and e['style']=="finish":
            cap += f"\n\n.\n.\n.\nAnswer: \"{vt}\" {ref} (KJV)"
        rows.append(dict(date=k, day=d.strftime('%a'), time=TIME[d.weekday()], pillar=pill, fmt=FMT[kind],
            feature=e.get('feature',''), hook=e['hook'], content="\n".join(lines), verse_ref=(ref+" (KJV)") if ref else "",
            verse_text=vt, caption=cap, status="Draft for review", source="New", kind=kind, spec=e))
    d+=dt.timedelta(1)

# content checks
for r in rows:
    blob=json.dumps({k:v for k,v in r.items() if k!='spec'})
    if '—' in blob or '–' in blob: errs.append(f"{r['date']} has a dash")
    if re.search(r'\bfree\b', (r['caption']+r['content']).replace(r['verse_text'],'').lower()): errs.append(f"{r['date']} says free")
print(len(rows), "rows;", sum(r['source']=='New' for r in rows), "new")
print("\n".join(errs) or "no errors")
json.dump(rows, open('plan182.json','w'), indent=1)
