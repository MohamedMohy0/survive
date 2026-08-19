# Survive

SURVIVE

لعبة قصصية تفاعلية عربية — المهمة الأولى: غرفة 207

Build a polished Arabic cinematic interactive survival game called:

SURVIVE

The project must feel like a real narrative game that happens to run in a browser, NOT like a website containing a game.

The player enters mysterious situations, makes decisions, explores locations, discovers clues, interacts with characters, collects items, and creates their own path through a large branching story.

The first playable mission must be:

غرفة 207

---

1. IMPORTANT CHANGE IN GAME STRUCTURE

Do NOT organize the game around:

- Day 1

- Day 2

- Daily Challenge

- Daily Level

Instead, organize it around:

MISSIONS / المهام

Example:

المهمة 01

غرفة 207

المهمة 02

آخر قطار

المهمة 03

الإشارة

المهمة 04

القبو

المهمة 05

الرجل الذي لا يتذكر

Each mission is a complete interactive story.

The player unlocks missions progressively.

Previous completed missions can be replayed.

Future missions remain locked until their requirements are met.

---

2. CORE EXPERIENCE

The game is a branching narrative survival mystery.

The player should never feel that they are simply answering questions.

They should feel that they are:

- exploring

- investigating

- surviving

- making decisions

- discovering secrets

- interacting with characters

- collecting evidence

- opening paths

- solving mysteries

- changing the story

The player should constantly wonder:

«"ماذا كان سيحدث لو اخترت الخيار الآخر؟"»

---

3. FIRST MISSION

The first mission is:

غرفة 207

Subtitle:

«"بعض الأبواب لا يجب أن تُفتح."»

The mission begins in a mysterious hotel.

The player receives a strange message directing them to:

الغرفة 207

The story should gradually become more mysterious.

Do NOT immediately explain everything.

Build tension progressively.

---

4. STORY LENGTH

The first mission must NOT be short.

This is extremely important.

Do NOT create:

5–10 scenes and finish.

Do NOT create:

10 minutes of gameplay.

The first mission should feel like a complete mini-game.

Target:

- 50–100+ meaningful story nodes

- 20+ meaningful decisions

- 8–15 major branching points

- multiple locations

- multiple characters

- multiple items

- multiple clues

- several major events

- multiple possible endings

- hidden routes

- conditional routes

- long-term consequences

The story should take a meaningful amount of time to complete.

However:

DO NOT artificially make it long by adding meaningless text.

Every scene must introduce:

- information

- tension

- choice

- discovery

- character development

- consequence

- mystery

- or gameplay progression.

---

5. BRANCHING MUST BE REAL

This is one of the most important requirements.

Do NOT create a fake branching system where:

A → Scene 5

B → Scene 5

C → Scene 5

with only slightly different text.

Different choices must create genuinely different experiences.

Example:

The player hears something behind Room 207.

Choice:

01

افتح الباب.

This may lead to:

ROOM 207

↓

Meet a mysterious woman.

↓

Follow her.

↓

Discover a hidden corridor.

↓

Enter the basement.

↓

Find evidence.

↓

Reach Ending A.

---

Choice:

02

راقب الباب من الخارج.

This may lead to:

Hotel hallway.

↓

Meet security guard.

↓

Discover the room was officially empty.

↓

Find old hotel records.

↓

Discover that Room 207 was sealed years ago.

↓

Unlock a completely different route.

---

Choice:

03

اترك الفندق.

This may seem like the safest option.

But later:

↓

Someone follows you.

↓

Your phone receives another message.

↓

You realize the story has followed you outside.

↓

Unlock a different route.

---

Choice:

04

ابحث عن مدير الفندق.

This creates another route involving:

- hotel office

- security footage

- old records

- employee

- hidden key

- secret room

---

6. BRANCHING GRAPH

The mission should resemble a large story graph.

Example:

START

│

├── Investigate Room 207

│   ├── Open the door

│   │   ├── Woman

│   │   ├── Empty room

│   │   └── Hidden passage

│   │

│   └── Observe from outside

│       ├── Security guard

│       ├── Camera

│       └── Hotel records

│

├── Search the hotel

│   ├── Reception

│   ├── Basement

│   ├── Kitchen

│   └── Staff corridor

│

├── Leave the hotel

│   ├── Street

│   ├── Taxi

│   ├── Phone call

│   └── Someone follows you

│

└── Find the manager

├── Office

├── Security room

├── Old archive

└── Secret elevator

Branches may eventually reconnect.

BUT:

When branches reconnect, the world state must remain different.

---

7. WORLD STATE

The game must remember the player's actions.

Example:

{

  "inventory": [],

  "clues": [],

  "flags": {},

  "stats": {

    "health": 100,

    "fear": 20,

    "trust": 0,

    "suspicion": 0

  },

  "relationships": {},

  "visitedLocations": [],

  "choices": []

}

The story engine must update this state after every meaningful decision.

---

8. CONSEQUENCES

Choices must have delayed consequences.

Example:

At the beginning:

The player finds an old key.

They can ignore it.

Thirty minutes later:

A locked door appears.

Player who collected the key:

«استخدم المفتاح.»

Player who ignored it:

«الباب مغلق.»

Then the second player must find another way.

This creates real replayability.

---

9. ENDINGS MUST HAVE NAMES

Do NOT show:

"Ending 1"

"Ending 2"

only.

Every ending should have a memorable name.

Examples:

النهاية — الناجي

«خرجت من الفندق قبل أن تعرف الحقيقة.»

---

النهاية — الغرفة التي لم تكن موجودة

«فتحت الباب الخطأ.»

---

النهاية — الشاهد

«عرفت الحقيقة... لكن شخصًا آخر عرف أنك عرفت.»

---

النهاية — لا تثق بأحد

«اخترت الشخص الخطأ.»

---

النهاية — العودة

«خرجت من الفندق، لكنك لم تغادره حقًا.»

---

النهاية السرية — 207

«أنت لم تكن الشخص الذي كان يبحثون عنه.»

---

النهاية الحقيقية — الحقيقة

«كل ما حدث منذ البداية كان جزءًا من شيء أكبر.»

Use unique names and descriptions for every ending.

---

10. ENDING QUALITY

An ending must feel like a reward.

When the player reaches an ending:

Slow down the interface.

Change the atmosphere.

Use a special background.

Reveal:

النهاية: الشاهد

Then:

وصف النهاية.

Then:

- القرارات المهمة

- الأدلة المكتشفة

- العناصر المستخدمة

- الشخصيات التي قابلها اللاعب

- الوقت

- تقييم اللاعب

Example:

النهاية

الشاهد

التقييم

A+

الأدلة

8 / 12

القرارات

27

الشخصيات

4

الأسرار المكتشفة

3

---

11. ENDING COLLECTION

Create an:

سجل النهايات

Players can see endings they have discovered.

Undiscovered endings appear as:

???

Example:

النهاية 01

الناجي

✓ مكتشفة

النهاية 02

الشاهد

✓ مكتشفة

النهاية 03

???

🔒

النهاية 04

الغرفة التي لم تكن موجودة

✓ مكتشفة

This encourages replayability.

---

12. REPLAY SYSTEM

Unlike the daily system, completed missions can be replayed.

When replaying:

Show:

«هل تريد بدء رحلة جديدة؟»

[ رحلة جديدة ]

[ إلغاء ]

Do NOT overwrite the player's discovered endings.

The game should remember:

- discovered endings

- discovered clues

- mission completion

- best result

---

13. MISSION PROGRESSION

Main screen:

SURVIVE

Then:

المهام

01 — غرفة 207

✓ مكتملة

02 — آخر قطار

🔒

03 — الإشارة

🔒

04 — القبو

🔒

The player unlocks the next mission according to the game's progression.

Do not require daily access.

---

14. JSON CONTENT ARCHITECTURE

All story content must live in JSON.

Example:

src/

  data/

    missions/

      mission-001-room-207.json

      mission-002-last-train.json

      mission-003-signal.json

The game engine must NOT contain story-specific logic.

The JSON should contain:

- mission metadata

- nodes

- choices

- conditions

- effects

- locations

- characters

- items

- clues

- endings

---

15. STORY NODE

Example:

{

  "id": "hallway_207",

  "location": "hotel_hallway",

  "text": "تتوقف أمام الباب رقم 207...",

  "choices": [

    {

      "id": "open",

      "text": "افتح الباب",

      "next": "room_207",

      "effects": {

        "fear": 10

      }

    },

    {

      "id": "observe",

      "text": "راقب الباب",

      "next": "observe_207"

    }

  ]

}

---

16. CONDITIONS

Support:

- item requirements

- clue requirements

- flags

- previous choices

- relationship levels

- stats

- visited locations

- previous events

Example:

{

  "required": {

    "items": ["old_key"],

    "flags": ["discovered_secret"]

  }

}

---

17. ITEMS

The first mission should contain meaningful items.

Examples:

- مفتاح صدئ

- مصباح

- هاتف

- صورة قديمة

- بطاقة موظف

- شريط تسجيل

- خريطة الفندق

- رسالة

- قطعة معدنية

- دفتر

Items must affect gameplay.

Do NOT add items just to fill an inventory.

---

18. CLUES

The player should discover clues.

Examples:

- رقم غريب

- صورة

- تسجيل

- رسالة

- رمز

- خريطة

- اسم

- تاريخ

- بصمة

- ملف قديم

Some clues should only make sense later.

---

19. LOCATIONS

Room 207 should NOT be the only location.

The first mission should contain multiple locations.

Examples:

- استقبال الفندق

- الممر

- غرفة 207

- غرفة 208

- المصعد

- السلم

- الطابق السفلي

- مكتب المدير

- غرفة الأمن

- المطبخ

- الممر الخلفي

- السطح

- موقف السيارات

- الشارع

- غرفة مخفية

Different paths should expose different locations.

---

20. CHARACTERS

Create several characters.

Examples:

حارس الفندق

غامض.

موظفة الاستقبال

تعرف شيئًا لكنها لا تريد الكلام.

الرجل الغريب

لا تعرف هل يساعدك أم يستغلك.

المرأة في الغرفة 207

وجودها مرتبط بالسر الرئيسي.

مدير الفندق

قد يكون مفتاح الحقيقة.

Not every player should meet every character.

Characters should appear depending on player choices.

---

21. RELATIONSHIP SYSTEM

Characters should have relationship values.

Example:

trust

fear

suspicion

A player's previous actions can change future dialogue.

Example:

If trust > 60:

«"سأخبرك بما حدث."»

If trust < 20:

«"ابتعد عني."»

---

22. MISSION STRUCTURE

The first mission should have several acts.

Example:

الفصل الأول

الوصول

الفصل الثاني

الغرفة 207

الفصل الثالث

الفندق

الفصل الرابع

السر

الفصل الخامس

المواجهة

الفصل السادس

النهاية

But do not force every player through the same sequence.

Different branches may skip or alter entire acts.

---

23. PACING

Avoid boredom.

Every few scenes introduce something new:

- discovery

- decision

- threat

- character

- clue

- location

- mystery

- unexpected consequence

Do not make the player read huge walls of text repeatedly.

Break narrative into cinematic chunks.

---

24. TEXT PRESENTATION

Never show giant paragraphs.

Use:

Short cinematic paragraphs.

Example:

«الممر فارغ.»

Pause.

«لكن المصباح في نهايته ما زال يعمل.»

Pause.

«ثم ينطفئ.»

Pause.

«واحدًا تلو الآخر.»

This creates tension.

Use text reveal animations carefully.

---

25. VISUAL DESIGN

The game should be atmospheric but NOT excessively dark.

This is extremely important.

Do NOT create an almost-black interface where text is difficult to read.

Use:

Cinematic Light & Dark

rather than:

Pure Black UI

The environment can be mysterious and dark while the UI remains readable.

---

26. COLOR DIRECTION

Use a balanced cinematic palette:

- deep blue-gray

- charcoal

- warm gray

- muted beige

- soft white

- subtle amber

- restrained red only for danger

Avoid:

- pure black everywhere

- pure white backgrounds

- excessive neon

- excessive purple

- excessive red

- excessive glow

The interface must have sufficient contrast.

---

27. READABILITY

Narrative text must be easy to read.

Use:

- large enough font

- generous line height

- controlled text width

- subtle background overlay

- readable contrast

Do not place white text directly over a busy image.

Use a subtle gradient/overlay behind text.

---

28. GAMEPLAY SCREEN

Use a full-screen environment.

Example:

Background:

Hotel hallway.

Foreground:

Narrative text.

Bottom:

Choices.

Top corner:

Small contextual information.

Avoid clutter.

The UI should almost disappear when the player is reading.

---

29. UI SHOULD NOT BE ANNOYING

Do NOT:

- constantly animate everything

- shake the screen unnecessarily

- use huge buttons

- display unnecessary popups

- show notifications everywhere

- use excessive particles

- use excessive sound effects

- use intrusive ads during gameplay

The interface should feel calm and premium.

---

30. ADVERTISING

The project must include reserved advertising areas.

However:

Ads must NEVER interrupt an important story decision.

Do NOT display ads:

- during dialogue

- during scene transitions

- while choosing

- during a major reveal

- during an ending

Ad slots should exist in:

Main Menu

Mission Selection

After Mission Completion

Ending Summary

Statistics Screen

Create:

AdSlot.tsx

and:

ads.ts

Use placeholders during development.

Example:

ADVERTISEMENT

Keep them visually separated from the gameplay.

The system must allow advertisements to be enabled/disabled through configuration.

---

31. MOBILE ADS

On mobile:

Reserve a safe responsive area for advertisements.

Never allow an ad to cover:

- story text

- choices

- inventory

- important UI

Use CSS safe-area support for mobile devices.

---

32. SAVE SYSTEM

Use localStorage for MVP.

Save:

- current mission

- current node

- inventory

- clues

- flags

- stats

- relationships

- choices

- discovered endings

- mission completion

The player can close the browser and continue.

---

33. GAME ENGINE

Create:

storyEngine.ts

conditionEngine.ts

effectEngine.ts

stateManager.ts

missionManager.ts

storage.ts

Responsibilities must be separated.

Story Engine:

runs the story.

Condition Engine:

checks requirements.

Effect Engine:

changes state.

State Manager:

holds current game state.

Mission Manager:

handles mission progression.

Storage:

persists progress.

---

34. TECH STACK

Use:

React

TypeScript

Vite

Tailwind CSS

Do not add unnecessary dependencies.

---

35. RESPONSIVE DESIGN

Design separately for:

Mobile portrait

Mobile landscape

Tablet

Laptop

Desktop

The game must feel intentional on every screen.

---

36. MAIN MENU

The first screen should feel like a game title screen.

Example:

SURVIVE

«كل قرار يترك أثرًا.»

Then:

متابعة

المهام

سجل النجاة

سجل النهايات

الإعدادات

Do not create a standard navigation bar.

Use cinematic menu transitions.

---

37. MISSION SCREEN

Example:

المهمة 01

غرفة 207

«بعض الأبواب لا يجب أن تُفتح.»

الحالة:

متاحة

[ ابدأ المهمة ]

Below:

A subtle mission preview.

---

38. SETTINGS

Settings should be minimal.

Include:

- الصوت

- الموسيقى

- الحركة

- جودة الخلفيات

- اللغة لاحقًا

Do not make it look like a website settings page.

---

39. LOADING SCREEN

Create a cinematic loading state.

Example:

«جاري فتح الملف...»

or:

«يتم تحميل القضية...»

Then:

غرفة 207

Avoid generic:

"Loading..."

---

40. MISSION COMPLETION

After an ending:

Show a cinematic result.

Example:

انتهت الرحلة

النهاية: الشاهد

«خرجت من الفندق...

لكن الحقيقة خرجت معك.»

ثم:

التقييم A

الأدلة 8/12

الأسرار 3/7

Then:

[ سجل النهايات ]

[ العودة إلى المهام ]

---

41. REPLAYABILITY

The first mission should encourage players to replay it.

A player who finishes with:

"النهاية: الناجي"

should wonder:

«ماذا لو دخلت من الباب الآخر؟»

The player should discover:

- new characters

- new locations

- new clues

- new items

- new endings

- new information

when replaying.

---

42. HIDDEN PATHS

Include paths that are not obvious.

Example:

If the player:

1. Finds the photograph.

2. Talks to the receptionist.

3. Refuses to leave.

4. Enters the basement.

5. Uses the photograph.

Then unlock:

الممر 207

This path should not be obvious to a first-time player.

---

43. TRUE ENDING

The first mission should have a hidden "True Ending".

The player should not be told exactly how to obtain it.

It should require understanding the story and combining clues.

The True Ending should reveal information that changes the player's understanding of the entire mission.

---

44. MISSION ARCHITECTURE

Future missions:

mission-001-room-207.json

mission-002-last-train.json

mission-003-the-signal.json

mission-004-the-basement.json

mission-005-the-stranger.json

The engine should support all of them automatically.

---

45. IMPORTANT: NO SHORT DEMO

Do not create a shallow demo and call it complete.

The first mission must be a real vertical slice.

It must demonstrate the actual architecture.

At least:

50+ meaningful nodes

20+ decisions

8+ major branches

multiple locations

multiple characters

multiple endings

conditional choices

inventory

clues

flags

relationships

delayed consequences

---

46. CONTENT QUALITY

The writing should feel like a professionally designed mystery/survival game.

Avoid:

- childish dialogue

- repetitive descriptions

- generic horror clichés

- meaningless choices

- predictable twists

- overly long exposition

Use:

- suspense

- mystery

- uncertainty

- psychological tension

- unexpected consequences

- believable dialogue

- gradual reveals

---

47. GAMEPLAY LOOP

The core loop:

EXPLORE

↓

DISCOVER

↓

DECIDE

↓

CONSEQUENCE

↓

EXPLORE MORE

↓

DISCOVER NEW INFORMATION

↓

MAKE HARDER DECISION

↓

REACH AN ENDING

↓

REPLAY TO DISCOVER ANOTHER PATH

---

48. FINAL VISUAL GOAL

When the user opens the game, they should think:

«"هذه لعبة."»

Not:

«"هذا موقع ويب."»

The interface should be:

- beautiful

- cinematic

- readable

- mysterious

- spacious

- modern

- premium

- responsive

- immersive

It can be dark in atmosphere.

But it must NOT be dark to the point that the user struggles to see.

---

49. DEVELOPMENT ORDER

Do not attempt to build everything randomly.

Build in this order:

PHASE 1

Visual Game Shell

PHASE 2

Mission System

PHASE 3

JSON Story Engine

PHASE 4

Room 207 Story

PHASE 5

Branching System

PHASE 6

Conditions + Effects

PHASE 7

Inventory + Evidence

PHASE 8

Characters + Relationships

PHASE 9

Endings + Ending Collection

PHASE 10

Save System

PHASE 11

Mission Progression

PHASE 12

Advertising Slots

PHASE 13

Mobile Optimization

PHASE 14

Visual Polish

PHASE 15

Testing

---

50. FIRST IMPLEMENTATION

Start with:

غرفة 207

Build the entire first mission before creating Mission 2.

The first mission must demonstrate:

- long story

- multiple routes

- real branching

- multiple locations

- characters

- items

- clues

- conditions

- consequences

- multiple named endings

- hidden route

- true ending

- replayability

The final result should feel like a complete playable mystery game.

---

51. FINAL RULE

The most important requirement:

Do not optimize for the number of pages or components.

Optimize for:

immersion + story depth + meaningful choices + replayability + visual quality.

The user should forget that they are using a browser.

They should feel that they are inside:

غرفة 207

Build the experience accordingly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b79502b2-8811-4a48-a8af-0526d3fc9c78).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
