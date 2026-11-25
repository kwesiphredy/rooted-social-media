# New daily posts for Dec 1, 2026 to May 31, 2027 (Claude-made, no filming).
# kinds: carousel (slides), flier (single graphic), verse (KJV verse graphic),
#        trivia (animated video), spotlight (feature flier), engage (comment flier)
# verse refs are filled with KJV text by the builder and verified there.

SUN_HEAD = [
    "Before church today: hit record.",
    "Today's sermon deserves more than a Sunday.",
    "Record it today. Reread it Monday.",
    "Going to church today? Let your phone take the notes.",
    "Don't let today's sermon fade by Wednesday.",
    "One sermon. Every verse. Saved.",
]

P = {}
def add(date, **k): P[date] = k

# ---------------- SUNDAYS: Keep the Sermon flier (SpiritScript) ----------------
sun = [
 ("2026-12-06", "Isaiah 40:3", "Second Sunday of Advent. Prepare the way.", "Advent"),
 ("2026-12-13", "Luke 2:10", "Third Sunday of Advent. Good tidings of great joy.", "Advent"),
 ("2026-12-20", "Isaiah 7:14", "Fourth Sunday of Advent. God with us.", "Advent"),
 ("2026-12-27", "Luke 2:20", "The shepherds went back changed. So can we.", None),
 ("2027-01-03", "Psalm 122:1", None, None),
 ("2027-01-10", "Ecclesiastes 5:1", None, None),
 ("2027-01-17", "Hebrews 10:25", None, None),
 ("2027-01-24", "Psalm 100:4", None, None),
 ("2027-02-07", "Psalm 118:24", None, None),
 ("2027-02-14", "1 John 4:19", "Happy Valentine's Day. He loved you first.", "Valentine's Day"),
 ("2027-02-21", "Matthew 18:20", None, None),
 ("2027-02-28", "Psalm 95:6", None, None),
 ("2027-03-07", "Colossians 3:16", None, None),
 ("2027-03-14", "Psalm 34:3", None, None),
 ("2027-03-21", "Matthew 21:9", "Palm Sunday. Hosanna!", "Palm Sunday"),
 ("2027-03-28", "Matthew 28:6", "He is risen. Happy Easter.", "Easter"),
 ("2027-04-04", "John 20:29", "Blessed are they that have not seen, and yet have believed.", None),
 ("2027-04-11", "Psalm 84:10", None, None),
 ("2027-04-18", "Acts 2:42", None, None),
 ("2027-04-25", "Psalm 27:4", None, None),
 ("2027-05-02", "John 4:24", None, None),
 ("2027-05-16", "Acts 2:4", "Happy Pentecost Sunday.", "Pentecost"),
 ("2027-05-23", "Luke 4:16", None, None),
 ("2027-05-30", "Psalm 92:1", None, None),
]
for i, (d, ref, head, season) in enumerate(sun):
    if season in ("Valentine's Day", "Easter", "Palm Sunday", "Pentecost"):
        add(d, pillar="Seasonal", kind="verse", hook=head, verse=ref, feature="Daily Verse Drop",
            q={"Valentine's Day": "Who taught you what God's love looks like?",
               "Palm Sunday": "What does Holy Week look like in your house?",
               "Easter": "What is one word for what Easter means to you?",
               "Pentecost": "What do you know about Pentecost? Tell us below."}[season],
            cta="share")
    else:
        add(d, pillar="Keep the Sermon", kind="flier", feature="SpiritScript",
            hook=head or SUN_HEAD[i % len(SUN_HEAD)], verse=ref,
            body="Open SpiritScript, tap record, and get the transcript, a summary and every verse your pastor mentioned.",
            q="What is your church preaching through right now?")

# ---------------- MONDAYS ----------------
mon_car = {
 "2026-12-07": ("5 things to do with Sunday's sermon before Wednesday", [
    ("Write one sentence", "Sum up the whole sermon in one line. If you can't, reread your notes."),
    ("Look up every verse", "Read the verses your pastor mentioned in their full context."),
    ("Pick one action", "Not five. One thing you will actually do this week."),
    ("Tell one person", "Saying it out loud helps it stick. Text a friend what you learned."),
    ("Pray it back", "Turn the main point into a prayer before Wednesday."),
 ], "Matthew 7:24"),
 "2026-12-21": ("Christmas sermons fade by New Year. Keep this one.", [
    ("Record the service", "Christmas and Christmas Eve messages are some of the most personal of the year."),
    ("Read Luke 2 the next morning", "Let the story you heard sink in while it's quiet."),
    ("Write what surprised you", "One line about something you heard with fresh ears."),
    ("Share it with family", "Talk about the message at the table, not just the presents."),
    ("Save it for next year", "Read it again next December and see what changed."),
 ], "Luke 2:19"),
 "2027-01-04": ("How to take sermon notes you'll actually reread", [
    ("Write questions, not quotes", "What is this asking me to believe or do?"),
    ("Note the main passage", "Book, chapter and verse at the top. Everything hangs on it."),
    ("Circle one verse", "The one that hit you. That's your verse for the week."),
    ("Add a 'so what?'", "One line on what changes Monday because of this."),
    ("Review Monday morning", "Two minutes with your notes and coffee. That's it."),
 ], "Psalm 119:11"),
 "2027-01-18": ("5 questions to ask after every sermon", [
    ("What did I learn about God?", "Start with Him, not with you."),
    ("What did I learn about myself?", "Where did the message hit close to home?"),
    ("What should I stop or start?", "Faith shows up in what we do next."),
    ("Who needs to hear this?", "Someone in your life needs this message too."),
    ("Which verse do I take with me?", "Pick one and carry it all week."),
 ], "James 1:22"),
 "2027-02-01": ("Turn one sermon into 5 days of devotion", [
    ("Monday: reread the summary", "Remind yourself what was preached."),
    ("Tuesday: read the main passage", "Slowly, in full, in context."),
    ("Wednesday: pray it", "Turn the key point into a prayer."),
    ("Thursday: share it", "Send one line to someone who needs it."),
    ("Friday: write what changed", "One honest line in your journal."),
 ], "Joshua 1:8"),
 "2027-02-15": ("How to listen well this Lent", [
    ("Come expecting", "Walk in ready to hear from God, not just a speaker."),
    ("Put the phone on record, not on scroll", "Let SpiritScript take the notes so you can listen."),
    ("Listen for one thing", "You don't need all of it. You need what God is saying to you."),
    ("Sit with it", "Leave a minute of quiet before you rush out."),
    ("Respond this week", "Lent is about turning toward God. Take one step."),
 ], "Joel 2:13"),
 "2027-03-01": ("Small group leaders: use Sunday's sermon for Wednesday's group", [
    ("Start with the main passage", "Read it together before anyone gives an opinion."),
    ("Ask what stood out", "Let people share what hit them on Sunday."),
    ("Go one layer deeper", "Look at the verses around it. Context changes everything."),
    ("Make it personal", "Ask: what is one thing you'll do this week?"),
    ("Pray for each other", "End with the needs that came up."),
 ], "Acts 2:42"),
 "2027-03-15": ("When the sermon stepped on your toes", [
    ("Notice it", "That uncomfortable feeling is worth paying attention to."),
    ("Don't argue it away", "Ask what is true in it before what is wrong with it."),
    ("Bring it to God", "Be honest with Him about why it stung."),
    ("Take one small step", "Conviction is an invitation, not a punishment."),
    ("Remember grace", "God corrects the people He loves."),
 ], "Hebrews 12:11"),
 "2027-03-29": ("Easter Sunday is over. Now what?", [
    ("The resurrection is still true on Monday", "Easter is not a day. It's the reason for every day."),
    ("Reread the story", "Read Matthew 28 again this week."),
    ("Thank Him daily", "Start each morning this week with one line of thanks."),
    ("Invite someone back", "Someone came to church for the first time yesterday. Follow up."),
    ("Keep showing up", "Next Sunday matters just as much."),
 ], "1 Corinthians 15:58"),
 "2027-04-12": ("Missed church? How to catch up on the sermon", [
    ("Ask for the recording", "Many churches post the message online."),
    ("Read the main passage first", "Know the text before you hear the message."),
    ("Listen with notes open", "Record it in SpiritScript to get the summary and verses."),
    ("Ask a friend what stood out", "It turns a missed Sunday into a conversation."),
    ("Plan for next week", "Put Sunday on your calendar like it matters. It does."),
 ], "Hebrews 10:25"),
 "2027-04-26": ("How to study the verses your pastor mentioned", [
    ("Collect them", "SpiritScript lists every scripture reference from the sermon."),
    ("Read the whole chapter", "A verse makes the most sense in its chapter."),
    ("Ask who, what, why", "Who wrote it, to whom, and why?"),
    ("Read it in plain language", "BibleWell explains the verse in everyday words."),
    ("Apply one", "Pick the verse that speaks to your week."),
 ], "2 Timothy 2:15"),
 "2027-05-10": ("Talk about Sunday's sermon at the dinner table", [
    ("Ask what they remember", "Kids remember more than you think."),
    ("Share your one thing", "Tell them what stuck with you."),
    ("Read the main verse together", "Short and simple is fine."),
    ("Ask one 'what would you do' question", "Make it real for their week."),
    ("Pray together", "One sentence each. That's enough."),
 ], "Deuteronomy 6:7"),
 "2027-05-24": ("Why you should save your sermons", [
    ("You'll forget more than you think", "Even a great message fades in a few days."),
    ("God speaks over time", "Patterns show up when you look back across months."),
    ("Your notes become a record", "Of what God taught you, season by season."),
    ("They help you encourage others", "Find the exact message a friend needs."),
    ("They remind you He was faithful", "Reread an old sermon in a hard week."),
 ], "Psalm 77:11"),
}
for d, (hook, slides, ref) in mon_car.items():
    add(d, pillar="Keep the Sermon", kind="carousel", feature="SpiritScript", hook=hook, slides=slides, verse=ref,
        q="Which one do you need to start this week?")

mon_fl = [
 ("2026-12-14", "What did Sunday's sermon ask you to do this week?", "James 1:22"),
 ("2026-12-28", "Name one sermon from this year that changed you.", "Luke 8:15"),
 ("2027-01-11", "Sunday filled you up. Monday is where it counts.", "Colossians 3:23"),
 ("2027-01-25", "Hearing is good. Doing is better.", "Matthew 7:24"),
 ("2027-02-08", "Faith grows by hearing. Keep listening.", "Romans 10:17"),
 ("2027-02-22", "Be quick to listen this week.", "James 1:19"),
 ("2027-03-08", "Your pastor spent hours on that message. Keep it.", "1 Thessalonians 5:13"),
 ("2027-03-22", "Holy Week starts now. Walk it day by day.", "Mark 11:17"),
 ("2027-04-05", "He is risen. Now live like it.", "Romans 6:4"),
 ("2027-04-19", "Mondays are for doing what Sunday said.", "Philippians 4:9"),
 ("2027-05-03", "What is one verse from Sunday you're carrying this week?", "Psalm 119:105"),
 ("2027-05-17", "The same Spirit goes with you into Monday.", "Acts 1:8"),
]
for d, hook, ref in mon_fl:
    add(d, pillar="Keep the Sermon", kind="flier", feature="SpiritScript", hook=hook, verse=ref,
        body="SpiritScript keeps the transcript, summary and every verse from Sunday, so Monday has something to stand on.",
        q="What's one thing from Sunday you're putting into practice this week?")
add("2027-05-31", pillar="Seasonal", kind="verse", feature="Daily Verse Drop", hook="Memorial Day. We remember.",
    verse="John 15:13", q="Who are you remembering today?", cta="share")

# ---------------- TUESDAYS: Understand the Word carousels ----------------
tue = {
 "2026-12-01": ("What is Advent? Explained simply.", [
    ("It means 'coming'", "Advent comes from a Latin word for arrival."),
    ("4 Sundays before Christmas", "Many churches mark the season with readings and candles."),
    ("Looking back", "We remember the long wait for the promised Messiah."),
    ("Looking forward", "We also look ahead to the day Christ returns."),
    ("A season to slow down", "Make room for Jesus in the busiest month of the year."),
 ], "Isaiah 9:2", "Do you celebrate Advent at your church or at home?"),
 "2026-12-15": ("The 5 names of Jesus in Isaiah 9:6", [
    ("Wonderful", "Beyond anything we could imagine."),
    ("Counsellor", "The One with perfect wisdom for your life."),
    ("The mighty God", "The baby in the manger is God Himself."),
    ("The everlasting Father", "His care for His people never ends."),
    ("The Prince of Peace", "Peace with God, and peace in us."),
 ], "Isaiah 9:6", "Which name of Jesus means the most to you this year?"),
 "2026-12-22": ("The wise men: what the Bible actually says", [
    ("It never says three", "Matthew mentions three gifts, not three men."),
    ("They came from the east", "Matthew 2:1 says 'wise men from the east'."),
    ("They followed a star", "They saw His star and came to worship Him."),
    ("They found Him in a house", "Matthew 2:11 says house, not stable."),
    ("They went home another way", "Warned in a dream, they avoided Herod."),
 ], "Matthew 2:11", "Which of these surprised you?"),
 "2027-01-12": ("How to read a Psalm", [
    ("Read it out loud", "Psalms were written to be sung and prayed."),
    ("Notice the feeling", "Joy, grief, anger, trust. All of it is welcome."),
    ("Look for the turn", "Many psalms shift from complaint to praise."),
    ("Make it your prayer", "Put your own name and situation into it."),
    ("Try one a day", "There are 150. Start this week."),
 ], "Psalm 62:8", "What's your favorite psalm?"),
 "2027-01-26": ("The Lord's Prayer, line by line", [
    ("Our Father which art in heaven", "We come to God as children, together."),
    ("Hallowed be thy name", "We start with who He is, not what we need."),
    ("Thy kingdom come", "We ask for His will above our plans."),
    ("Give us this day our daily bread", "We trust Him for today's needs."),
    ("Forgive us our debts", "We receive grace and give it away."),
 ], "Matthew 6:9", "Which line do you find hardest to pray?"),
 "2027-02-16": ("Fasting in the Bible: 5 things to know", [
    ("Jesus said 'when', not 'if'", "In Matthew 6:16 He assumes His followers will fast."),
    ("It's about God, not food", "Fasting makes room to seek Him."),
    ("Keep it between you and God", "Jesus warned against fasting to be seen."),
    ("It comes with prayer", "In the Bible, fasting and prayer go together."),
    ("Start small", "Skip one meal and spend that time in prayer."),
 ], "Matthew 6:17", "Are you fasting from anything this Lent?"),
 "2027-04-27": ("The fruit of the Spirit, one by one", [
    ("Love, joy, peace", "What God grows in us first: how we relate to Him."),
    ("Longsuffering, gentleness, goodness", "How we treat other people."),
    ("Faith, meekness, temperance", "How we carry ourselves."),
    ("It's fruit, not fruits", "One fruit, nine flavors, all grown together."),
    ("Fruit grows slowly", "Stay rooted and it grows in season."),
 ], "Galatians 5:22", "Which fruit do you most want to grow this year?"),
 "2027-05-18": ("Pentecost was a feast before it was the Spirit's arrival", [
    ("A harvest feast", "Pentecost was the Feast of Weeks in the Old Testament."),
    ("Fifty days", "It came fifty days after Passover. Pentecost means fiftieth."),
    ("Jerusalem was full", "Jews from many nations were there for the feast."),
    ("Then the Spirit came", "Acts 2 tells how the Holy Spirit filled the believers."),
    ("A new harvest", "That day about three thousand people believed."),
 ], "Acts 2:1", "What does your church do for Pentecost?"),
 "2027-05-25": ("The armor of God, piece by piece", [
    ("Belt of truth", "Truth holds everything else together."),
    ("Breastplate of righteousness", "It guards your heart."),
    ("Shoes of the gospel of peace", "Ready to go where God sends you."),
    ("Shield of faith", "It quenches the fiery darts."),
    ("Helmet of salvation and sword of the Spirit", "The sword is the word of God."),
 ], "Ephesians 6:11", "Which piece do you need most this week?"),
}
for d, (hook, slides, ref, q) in tue.items():
    add(d, pillar="Understand the Word", kind="carousel", feature="BibleWell", hook=hook, slides=slides, verse=ref, q=q)

# ---------------- WEDNESDAYS: Pray & Write fliers ----------------
wed = [
 ("2026-12-02", "Pray for someone who's hard to love this week.", "Matthew 5:44", "Upper Room"),
 ("2026-12-16", "Christmas can be heavy. Pray for someone grieving this season.", "Psalm 34:18", "Prayer Wall"),
 ("2026-12-23", "Before the rush, take 2 minutes of quiet.", "Isaiah 26:3", "SoulNotes"),
 ("2026-12-30", "Write down one prayer God answered this year.", "Psalm 116:1", "Upper Room"),
 ("2027-01-06", "Ask God for one word for this year.", "Psalm 90:12", "SoulNotes"),
 ("2027-01-13", "Pray for your pastor today.", "2 Thessalonians 3:1", "Upper Room"),
 ("2027-01-20", "The midweek dip is real. Keep going.", "Galatians 6:9", "DevoDesk"),
 ("2027-01-27", "Pray for the friend who stopped coming to church.", "Luke 15:4", "Upper Room"),
 ("2027-02-03", "Worried? Turn it into a prayer list.", "Philippians 4:6", "Upper Room"),
 ("2027-02-24", "Lent: what are you making room for?", "Matthew 6:6", "SoulNotes"),
 ("2027-03-03", "Pray for your city today.", "Jeremiah 29:7", "Prayer Wall"),
 ("2027-03-10", "Pray Psalm 23 slowly, one line at a time.", "Psalm 23:1", "SoulNotes"),
 ("2027-03-17", "Pray for your family by name.", "Joshua 24:15", "Upper Room"),
 ("2027-03-31", "Thank Him for one thing the cross changed for you.", "1 Peter 2:24", "SoulNotes"),
 ("2027-04-14", "Pray for the person who hurt you.", "Ephesians 4:32", "SoulNotes"),
 ("2027-04-21", "Ask God for wisdom about one decision.", "James 1:5", "Upper Room"),
 ("2027-04-28", "Pray for students in finals season.", "Proverbs 2:6", "Prayer Wall"),
 ("2027-05-05", "Tomorrow is the National Day of Prayer. Who are you praying for?", "1 Timothy 2:1", "Prayer Wall"),
 ("2027-05-12", "Pray for the moms who found this week hard.", "Isaiah 66:13", "Prayer Wall"),
 ("2027-05-19", "Pray for boldness to share your faith.", "Acts 4:29", "Upper Room"),
 ("2027-05-26", "Pray for this year's graduates.", "Psalm 32:8", "Prayer Wall"),
]
WED_BODY = {
 "Upper Room": "Add it to Upper Room in Rooted, and mark it answered when God moves.",
 "Prayer Wall": "Post a request on the Prayer Wall in Rooted, or pray for someone else's.",
 "SoulNotes": "Write it in SoulNotes, your private journal in Rooted.",
 "DevoDesk": "Five minutes in DevoDesk is enough to reset the week.",
}
for d, hook, ref, feat in wed:
    add(d, pillar="Pray & Write", kind="flier", feature=feat, hook=hook, verse=ref, body=WED_BODY[feat],
        q="Who or what are you praying for today?")

# ---------------- THURSDAYS ----------------
add("2026-12-24", pillar="Seasonal", kind="verse", feature="Daily Verse Drop", hook="Christmas Eve.",
    verse="Luke 2:11", q="What is your family's Christmas Eve tradition?", cta="share")
add("2027-05-06", pillar="Pray & Write", kind="flier", feature="Prayer Wall",
    hook="Today is the National Day of Prayer.", verse="1 Thessalonians 5:17",
    body="Post a request on the Prayer Wall in Rooted and pray for someone else's today.",
    q="What are you praying for today?")
trivia = {
 "2027-01-07": ("New year, first questions. 3 for 3?", [
    ("What did God create on the first day?", ["Light", "Land", "Animals"], 0, "Genesis 1:3", "light"),
    ("On which day did God rest?", ["Sixth", "Seventh", "Eighth"], 1, "Genesis 2:2", "seventh day"),
    ("Which Gospel begins 'In the beginning was the Word'?", ["Matthew", "Mark", "John"], 2, "John 1:1", "In the beginning was the Word"),
 ]),
 "2027-01-14": ("Prophets trivia. Who did what?", [
    ("Which prophet was swallowed by a great fish?", ["Jonah", "Amos", "Micah"], 0, "Jonah 1:17", "Jonah"),
    ("Who went up to heaven by a whirlwind?", ["Elisha", "Elijah", "Isaiah"], 1, "2 Kings 2:11", "Elijah"),
    ("Who saw a valley full of dry bones?", ["Daniel", "Jeremiah", "Ezekiel"], 2, "Ezekiel 37:1", "bones"),
 ]),
 "2027-03-11": ("Animals of the Bible. Easy? Let's see.", [
    ("Which animal spoke to Balaam?", ["A donkey", "A snake", "A camel"], 0, "Numbers 22:28", "ass"),
    ("Which bird did Noah send out first?", ["A dove", "A raven", "An eagle"], 1, "Genesis 8:7", "raven"),
    ("What did Samson tear apart with his bare hands?", ["A bear", "A wolf", "A lion"], 2, "Judges 14:5-6", "lion"),
 ]),
 "2027-04-22": ("Paul's journeys. Only real ones get 3/3.", [
    ("Where was Saul going when he met Jesus?", ["Damascus", "Rome", "Antioch"], 0, "Acts 9:3", "Damascus"),
    ("Who sang hymns with Paul in the Philippi jail?", ["Barnabas", "Silas", "Timothy"], 1, "Acts 16:25", "Silas"),
    ("On which island was Paul shipwrecked?", ["Crete", "Cyprus", "Melita (Malta)"], 2, "Acts 28:1", "Melita"),
 ]),
 "2027-05-20": ("Pentecost trivia. How well do you know Acts 2?", [
    ("Where were the believers when the Spirit came?", ["Jerusalem", "Galilee", "Bethlehem"], 0, "Acts 2:5", "Jerusalem"),
    ("What appeared on each of them?", ["Doves", "Tongues like as of fire", "Crowns"], 1, "Acts 2:3", "cloven tongues like as of fire"),
    ("About how many were added that day?", ["Three hundred", "Five thousand", "Three thousand"], 2, "Acts 2:41", "three thousand"),
 ]),
 "2027-05-27": ("Finish the verse. No peeking.", [
    ("'The LORD is my shepherd; I shall not ___'", ["want", "fear", "fall"], 0, "Psalm 23:1", "I shall not want"),
    ("'Lean not unto thine own ___'", ["way", "understanding", "strength"], 1, "Proverbs 3:5", "lean not unto thine own understanding"),
    ("'For God so loved the world, that he gave his only begotten ___'", ["Word", "Lamb", "Son"], 2, "John 3:16", "only begotten Son"),
 ]),
}
for d, (hook, qs) in trivia.items():
    add(d, pillar="Trivia Thursday", kind="trivia", feature="Bible Playzone", hook=hook, questions=qs,
        q="How many did you get? Be honest.")

# ---------------- FRIDAYS: Faith with Friends (engagement fliers) ----------------
fri = [
 ("2026-12-04", "this-or-that", "Morning devotion or night devotion?", ("Morning", "Night"), "DevoDesk", None),
 ("2026-12-11", "fill-blank", "My favorite Christmas carol is ____.", None, "The Gathering Place", None),
 ("2026-12-18", "tag", "Tag the friend who always wins Bible trivia.", None, "Bible Playzone", None),
 ("2027-01-08", "fill-blank", "My one word for my faith this year: ____.", None, "SoulNotes", None),
 ("2027-01-15", "this-or-that", "Read the Bible or listen to it?", ("Read", "Listen"), "BibleWell", None),
 ("2027-01-22", "finish", "Thy word is a lamp unto my feet, and a ____.", None, "BibleWell", "Psalm 119:105"),
 ("2027-01-29", "spotlight", "Start a Bible game. Anyone in Rooted can join.", None, "Open Play", None),
 ("2027-02-05", "fill-blank", "The Bible character I relate to most is ____.", None, "The Gathering Place", None),
 ("2027-02-12", "tag", "Tag someone who prays for you.", None, "Prayer Wall", None),
 ("2027-02-19", "this-or-that", "Sermon notes: pen and paper or phone?", ("Pen and paper", "Phone"), "SpiritScript", None),
 ("2027-02-26", "fill-blank", "The verse that got me through a hard season: ____.", None, "SoulNotes", None),
 ("2027-03-05", "finish", "I can do all things through Christ which ____ me.", None, "BibleWell", "Philippians 4:13"),
 ("2027-03-12", "spotlight", "HolyHunt: a Bible word search. How fast can you find them?", None, "Bible Playzone", None),
 ("2027-03-19", "this-or-that", "Old Testament or New Testament?", ("Old", "New"), "BibleWell", None),
 ("2027-04-02", "fill-blank", "The worship song on repeat since Easter: ____.", None, "The Gathering Place", None),
 ("2027-04-09", "tag", "Tag your prayer partner.", None, "Prayer Wall", None),
 ("2027-04-16", "spotlight", "Find your people in The Gathering Place.", None, "The Gathering Place", None),
 ("2027-04-23", "finish", "Be strong and of a good courage... for the LORD thy God is ____.", None, "BibleWell", "Joshua 1:9"),
 ("2027-04-30", "this-or-that", "Study the Bible alone or with a group?", ("Alone", "With a group"), "The Gathering Place", None),
 ("2027-05-07", "spotlight", "Need prayer? You don't have to carry it alone.", None, "Prayer Wall", None),
 ("2027-05-14", "fill-blank", "My mom taught me ____ about God.", None, "SoulNotes", None),
 ("2027-05-21", "spotlight", "RhemaRush: race to unscramble 5 Bible words.", None, "Bible Playzone", None),
 ("2027-05-28", "fill-blank", "This summer I'm reading the book of ____.", None, "BibleWell", None),
]
for d, style, hook, opts, feat, ref in fri:
    q = {"this-or-that": "Which one are you? Comment below.",
         "fill-blank": "Fill in the blank in the comments.",
         "tag": "Tag them below.",
         "finish": "Finish it in the comments without looking it up.",
         "spotlight": "Have you tried it yet?"}[style]
    pill = "Faith with Friends"
    add(d, pillar=pill, kind="engage" if style != "spotlight" else "spotlight", style=style, feature=feat,
        hook=hook, options=opts, verse=ref, q=q)

# ---------------- SATURDAYS: verse graphic / feature spotlight ----------------
sat_v = [
 ("2026-12-05", "Micah 5:2", "Out of a small town came the King."),
 ("2026-12-19", "John 1:14", "The Word became flesh."),
 ("2027-01-02", "Isaiah 43:19", "A new thing."),
 ("2027-01-16", "Matthew 11:28", "Tired? Come to Him."),
 ("2027-01-30", "Psalm 121:1-2", "Look up."),
 ("2027-02-13", "Romans 5:8", "Love that came first."),
 ("2027-02-27", "Isaiah 41:10", "Fear not."),
 ("2027-03-13", "Lamentations 3:22-23", "New every morning."),
 ("2027-03-27", "Isaiah 53:5", "Holy Saturday. By His stripes."),
 ("2027-04-10", "Romans 15:13", "Hope that overflows."),
 ("2027-04-24", "Philippians 1:6", "He's not finished with you."),
 ("2027-05-08", "2 Timothy 1:5", "Faith passed down. Happy Mother's Day weekend."),
 ("2027-05-22", "Zephaniah 3:17", "He rejoices over you."),
]
for d, ref, hook in sat_v:
    add(d, pillar="Weekend Verse", kind="verse", feature="Daily Verse Drop", hook=hook, verse=ref,
        q="Who needs this verse today? Send it to them.", cta="share")

sat_f = [
 ("2026-12-12", "SpiritScript", "Your pastor preached for 40 minutes. Keep all of it.",
    ["Record the sermon", "Get a transcript and summary", "See every scripture reference"]),
 ("2026-12-26", "BibleWell", "Listen to the whole Bible on your commute.",
    ["Voice only, for the whole Bible", "Dramatized New Testament with music", "Picks up right where you left off"]),
 ("2027-01-09", "DevoDesk", "Devotions shaped around your season of life.",
    ["A devotion for where you are", "Plan your week with God", "Observation, Interpretation, Application"]),
 ("2027-01-23", "SoulNotes", "A private place to write what God is showing you.",
    ["Reflections", "Prayers", "Answered prayers"]),
 ("2027-02-06", "Bible Playzone", "Bible games you can play with friends.",
    ["Bible Trivia, HolyHunt, Parable Remix, RhemaRush", "Live game rooms", "Leaderboards"]),
 ("2027-02-20", "Upper Room", "Keep a record of what you prayed for.",
    ["Add your prayer requests", "Mark them answered", "Look back at God's faithfulness"]),
 ("2027-03-06", "Prayer Wall", "You don't have to pray alone.",
    ["Share a request", "Pray for others", "Celebrate answered prayers"]),
 ("2027-03-20", "Daily Verse Drop", "A verse waiting for you every morning.",
    ["One verse on your Home screen", "Read it, save it, share it", "Start the day in the Word"]),
 ("2027-04-03", "The Gathering Place", "Faith is better with friends.",
    ["Chat with other believers", "Share verses and notes", "Join groups"]),
 ("2027-04-17", "Open Play", "Start a game. Everyone gets the invite.",
    ["Open a game for anyone to join", "Rooted lets everyone know", "Play live together"]),
 ("2027-05-01", "BibleWell", "Stuck on a verse? Read it in plain language.",
    ["Plain-language interpretation", "Highlights and bookmarks", "Audio for every chapter"]),
 ("2027-05-15", "Find People", "Find believers from your own church.",
    ["Discover people from your church", "See mutual friends", "Grow together"]),
 ("2027-05-29", "DevoDesk", "A small daily habit. Real roots.",
    ["A few minutes a day", "Gentle streaks", "A plan for the week"]),
]
for d, feat, hook, bullets in sat_f:
    add(d, pillar="Feature Spotlight", kind="spotlight", feature=feat, hook=hook, bullets=bullets,
        q="Which feature would you use most?")
