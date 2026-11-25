import json, re
rows=json.load(open('plan182.json'))
n=0
for r in rows:
    if r.get('kind')!='trivia': continue
    sp=r['spec']; parts=re.split(r'(?<=[.?!])\s+', sp['hook'],1)
    h1=parts[0]; h2=parts[1] if len(parts)>1 else 'Comment your score.'
    qs=[dict(q=q,options=o,answer=a,note=f"{o[a]}. {ref} (KJV)") for q,o,a,ref,_ in sp['questions']]
    open(f"posts/{r['date']}.mjs",'w').write("import { trivia } from '../specs/trivia.mjs';\nexport default trivia(" + json.dumps(dict(kicker='Trivia Thursday',hook1=h1,hook2=h2,questions=qs),indent=1) + ");\n")
    n+=1; print(r['date'], h1, '|', h2)
