import json, hashlib, re
CORE = {
 "Keep the Sermon": ["#sermonnotes","#sermon","#church","#churchlife","#sundayservice","#preaching","#pastor","#christianliving","#godsword","#biblestudy","#christiancommunity","#faith","#jesus","#christian"],
 "Understand the Word": ["#biblestudy","#bibleverse","#scripture","#bible","#wordofgod","#godsword","#biblejournaling","#dailydevotional","#christianliving","#kjv","#faith","#jesus","#christian"],
 "Pray & Write": ["#prayer","#prayerjournal","#powerofprayer","#prayerlife","#prayerworks","#pray","#quiettime","#devotional","#christianwomen","#godisgood","#faith","#jesus","#christian"],
 "Trivia Thursday": ["#bibletrivia","#biblequiz","#biblegames","#triviathursday","#biblefacts","#christianfun","#sundayschool","#youthgroup","#christianyouth","#trivia","#bible","#faith","#jesus"],
 "Faith with Friends": ["#christiancommunity","#smallgroup","#faithfriends","#christianfriends","#fellowship","#youngadults","#youthgroup","#christianlife","#church","#bible","#faith","#jesus"],
 "Weekend Verse": ["#bibleverse","#dailyverse","#verseoftheday","#scripture","#kjv","#godsword","#encouragement","#christianquotes","#hope","#bible","#faith","#jesus","#christian"],
 "Feature Spotlight": ["#christianapp","#bibleapp","#prayerapp","#devotional","#biblestudy","#quiettime","#faithjourney","#christianliving","#faith","#jesus","#christian"],
 "Launch": ["#comingsoon","#christianapp","#faith","#bible","#christian"],
 "Seasonal": ["#bibleverse","#scripture","#godsword","#encouragement","#bible","#faith","#jesus","#christian"],
}
SEASON = [  # (start, end, tags)
 ("2026-11-29","2026-12-24",["#advent","#christmas","#christmasseason"]),
 ("2026-12-24","2026-12-26",["#christmas","#merrychristmas","#jesusisthereasonfortheseason"]),
 ("2026-12-29","2027-01-06",["#newyear","#newbeginnings"]),
 ("2027-02-12","2027-02-15",["#valentinesday","#godslove"]),
 ("2027-02-10","2027-03-21",["#lent","#lentenseason"]),
 ("2027-03-21","2027-03-28",["#holyweek","#palmsunday"]),
 ("2027-03-26","2027-03-30",["#easter","#heisrisen","#resurrection"]),
 ("2027-05-05","2027-05-07",["#nationaldayofprayer"]),
 ("2027-05-07","2027-05-13",["#mothersday","#christianmom"]),
 ("2027-05-15","2027-05-19",["#pentecost","#holyspirit"]),
 ("2027-05-30","2027-06-01",["#memorialday"]),
]
TT_BASE = ["#christiantiktok","#fyp","#foryou"]
def tags_for(p):
    d=p['post_at'][:10]; pil=p['pillar']
    core=CORE[pil][:]
    h=int(hashlib.md5(d.encode()).hexdigest(),16)
    # keep the first 5 (most relevant) and rotate the rest so sets vary day to day
    head,tail=core[:5],core[5:]
    if tail:
        k=h%len(tail); tail=tail[k:]+tail[:k]
    seas=[t for a,b,ts in SEASON if a<=d<b for t in ts]
    # Instagram caps hashtags at 5 per post (Dec 2025): 4 specific tags + #rootedapp
    ig=list(dict.fromkeys(seas[:1]+head))[:4]+["#rootedapp"]
    tt=list(dict.fromkeys(TT_BASE+seas[:2]+head[:3]))+["#rootedapp"]
    fb=list(dict.fromkeys(seas[:1]+head[:3]))+["#rootedapp"]
    return ig,tt,fb
def strip_tags(c):
    parts=c.rstrip().split("\n\n")
    if parts and parts[-1].startswith('#'): parts=parts[:-1]
    return "\n\n".join(parts)
if __name__=="__main__":
    f='schedule.json'; s=json.load(open(f))
    for p in s['posts']:
        base=p.get('caption_base') or p['caption']
        # finish-the-verse answers sit after the tags: keep them at the very end
        ans=''
        m=re.search(r"\n\n\.\n\.\n\.\nAnswer:.*$", base, re.S)
        if m: ans=m.group(0); base=base[:m.start()]
        base=strip_tags(base)
        p['caption_base']=base+ans
        ig,tt,fb=tags_for(p)
        p['caption']=base+"\n\n"+" ".join(ig)+ans
        p['caption_tiktok']=base+"\n\n"+" ".join(tt)+ans
        fbbase=base.replace("Download Rooted: link in bio.","Get Rooted: https://rootedapp.plexodev.com/go/facebook-bio")
        p['caption_facebook']=fbbase+"\n\n"+" ".join(fb)+ans
    json.dump(s,open(f,'w'),indent=1)
    p=s['posts'][0]; print(p['caption'],'\n---\n',p['caption_tiktok'],'\n---\n',p['caption_facebook'])
