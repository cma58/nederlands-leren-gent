export const LESSON_TYPES = {
  PHONETICS: 'phonetics',
  VOCAB: 'vocab',
  PHRASES: 'phrases',
  NUMBERS: 'numbers',
  GRAMMAR: 'grammar',
  SPEAKING: 'speaking',
  QUIZ: 'quiz',
  LISTEN: 'listen',
  TYPING: 'typing',
  ALPHABET: 'alphabet',
  ALPHABET_OVERVIEW: 'alphabet-overview',
  NAME_SPELLING: 'name-spelling',
}

const curriculum = {
  "meta": {
    "appName": "Nederlands leren in Gent",
    "targetLang": "nl-BE",
    "learnerL1": "Marokkaans-Arabisch (Darija)",
    "city": "Gent",
    "version": "0.1.0"
  },
  "levels": [
    {
      "id": "niveau-0",
      "order": 0,
      "title": "Niveau 0",
      "titleDarija": "المستوى 0",
      "titleDarijaLat": "l-mostawa 0",
      "subtitle": "Absolute basis & fonetiek",
      "subtitleDarijaLat": "L-asas w n-not9",
      "description": "De klanken, de begroetingen, de getallen en je eerste woorden. De perfecte start als je nog geen Nederlands kent.",
      "descriptionDarijaLat": "L-aswat, t-ta7iyat, l-ar9am w awwel kelmat dyalkom. Bidaya mezyana ila mazal ma kat3rfouch Nederlands.",
      "cefr": null,
      "icon": "🔤",
      "accent": "gent",
      "modules": [
        {
          "id": "0.0",
          "title": "Het Alfabet & De Klanken",
          "titleDarija": "الأبجدية والأصوات",
          "titleDarijaLat": "l-abjadiya w l-aswat",
          "goal": "De letters A t/m Z leren herkennen én actief uitspreken.",
          "goalDarijaLat": "T3ellmo t3erfo l-7orof men A 7tta Z w tnt9ohom b-sout.",
          "icon": "🔡",
          "lessons": [
            {
              "id": "0.0.1",
              "title": "Het alfabet: A – E",
              "titleDarija": "الأبجدية: A – E",
              "titleDarijaLat": "l-abjadiya: A – E",
              "type": "speaking",
              "intro": "Zeg elke letter hardop met het voorbeeldwoord (\"A van appel\"). Luister eerst, spreek dan zelf in.",
              "introDarijaLat": "9olo kol 7arf b-sout 3ali m3a l-kelma dyal l-mital (\"A van appel\"). Sm3o luwel, w men be3d sejjlo soutkom.",
              "darijaNote": "قولي كل حرف بصوت عالي مع الكلمة ديالو. سمعي الأول، ومن بعد سجلي.",
              "darijaNoteLat": "9olo kol 7arf b-sout 3ali m3a l-kelma dyalo. Sm3o luwel, w men be3d sejjlo.",
              "items": [
                {
                  "nl": "A",
                  "word": "appel",
                  "icon": "🍎",
                  "darija": "تفاحة",
                  "darijaLat": "tffa7a",
                  "tip": "Mond wijd open, heldere \"a\".",
                  "answer": "appel",
                  "tipDarija": "فمّك محلول مزيان، «a» واضحة.",
                  "tipDarijaLat": "fmk m7lwl mzyan, \"a\" wad7a.",
                },
                {
                  "nl": "B",
                  "word": "bal",
                  "icon": "⚽",
                  "darija": "كورة",
                  "darijaLat": "koura",
                  "tip": "Lippen samen mét stem (voel je keel trillen).",
                  "answer": "bal",
                  "tipDarija": "جمعي شفايفك وخرّجي الصوت باش تحسّي حلقك يتهز.",
                  "tipDarijaLat": "jm3i chfayefk w khrji s-sout bach t7sy 7l9k ythzz.",
                },
                {
                  "nl": "C",
                  "word": "cadeau",
                  "icon": "🎁",
                  "darija": "كادو",
                  "darijaLat": "kado",
                  "tip": "De C klinkt hier als \"k\".",
                  "answer": "cadeau",
                  "tipDarija": "هنا حرف «C» ننطقوه كيما «k».",
                  "tipDarijaLat": "hna 7arf \"C\" nnt9wh kima \"k\".",
                },
                {
                  "nl": "D",
                  "word": "deur",
                  "icon": "🚪",
                  "darija": "باب",
                  "darijaLat": "bab",
                  "tip": "Tongpunt tegen de boventanden, mét stem.",
                  "answer": "deur",
                  "tipDarija": "راس اللسان على السنان الفوقانية، مع الصوت.",
                  "tipDarijaLat": "ras l-lsan 3la s-snan l-fw9anya, m3a s-sout.",
                },
                {
                  "nl": "E",
                  "word": "eend",
                  "icon": "🦆",
                  "darija": "بطة",
                  "darijaLat": "betta",
                  "tip": "Lange \"ee\".",
                  "answer": "eend",
                  "tipDarija": "«ee» طويلة.",
                  "tipDarijaLat": "\"ee\" twila.",
                }
              ]
            },
            {
              "id": "0.0.2",
              "title": "Het alfabet: F – J",
              "titleDarija": "الأبجدية: F – J",
              "titleDarijaLat": "l-abjadiya: F – J",
              "type": "speaking",
              "intro": "Luister, kijk naar de mondstand-tip en spreek elke letter met het woord in.",
              "introDarijaLat": "Sm3o, choufo nsi7at kifach t7etto femmkom, w sejjlo kol 7arf m3a l-kelma.",
              "darijaNote": "سمعي، شوفي كيفاش خاص الفم يتحرك، وقولي كل حرف مع الكلمة.",
              "darijaNoteLat": "Sm3o, choufo kifach khass l-femm yt7errek, w 9olo kol 7arf m3a l-kelma.",
              "items": [
                {
                  "nl": "F",
                  "word": "fiets",
                  "icon": "🚲",
                  "darija": "بيسكليت",
                  "darijaLat": "bisklit",
                  "tip": "Blazen zonder stem. Verschil met de V.",
                  "answer": "fiets",
                  "tipDarija": "السنان الفوقانية على الشفة التحتانية، نفخي بلا صوت. الفرق مع V.",
                  "tipDarijaLat": "s-snan l-fo9aniya 3la l-chfa l-t7tanya, nfkhi bla sout. l-fr9 m3a V.",
                },
                {
                  "nl": "G",
                  "word": "geit",
                  "icon": "🐐",
                  "darija": "معزة",
                  "darijaLat": "me3za",
                  "tip": "In Gent is de \"g\" zacht (bijna een «h»).",
                  "answer": "geit",
                  "tipDarija": "فـ فلاندرز/غنت «g» ماشية خفيفة (قريبة لـ «ه»، /ɣ/). «g» القوية من الحلق بحال «خ» كتسمعها فهولندا.",
                  "tipDarijaLat": "f Flandre/Gent \"g\" machya khfifa (9riba l \"h\", /ɣ/). \"g\" l-9wiya men l-7la9 b7al \"kh\" ktsm3ha f-Holland.",
                },
                {
                  "nl": "H",
                  "word": "huis",
                  "icon": "🏠",
                  "darija": "دار",
                  "darijaLat": "dar",
                  "tip": "Zachte adem uit de keel, zoals de «ه».",
                  "answer": "huis",
                  "tipDarija": "نفس خفيف من الحلق، بحال «ﻫ».",
                  "tipDarijaLat": "nafs khfif men al7l9, b7al \"h\".",
                },
                {
                  "nl": "I",
                  "word": "iglo",
                  "icon": "🛖",
                  "darija": "إيگلو",
                  "darijaLat": "iglo",
                  "tip": "Korte, korte \"i\".",
                  "answer": "iglo",
                  "tipDarija": "«i» قصيرة بزاف.",
                  "tipDarijaLat": "\"i\" 9sira bezzaf.",
                },
                {
                  "nl": "J",
                  "word": "jas",
                  "icon": "🧥",
                  "darija": "جاكيطة",
                  "darijaLat": "jakita",
                  "tip": "Klinkt als de «ي».",
                  "answer": "jas",
                  "tipDarija": "«J» كتنطق بحال «ي» (بحال «يا»).",
                  "tipDarijaLat": "\"J\" ktnt9 b7al \"y\" (b7al \"ya\").",
                }
              ]
            },
            {
              "id": "0.0.3",
              "title": "Het alfabet: K – O",
              "titleDarija": "الأبجدية: K – O",
              "titleDarijaLat": "l-abjadiya: K – O",
              "type": "speaking",
              "intro": "Zeg elke letter met het voorbeeldwoord. De app luistert en helpt je.",
              "introDarijaLat": "9olo kol 7arf m3a l-kelma dyal l-mital. L-app katsem3 likom w kat3awnkom.",
              "darijaNote": "قولي كل حرف مع الكلمة. التطبيق كيسمع ليك وكيعاونك.",
              "darijaNoteLat": "9olo kol 7arf m3a l-kelma. L-app katsem3 likom w kat3awnkom.",
              "items": [
                {
                  "nl": "K",
                  "word": "kat",
                  "icon": "🐱",
                  "darija": "قطة",
                  "darijaLat": "qetta",
                  "tip": "Zoals de «ك».",
                  "answer": "kat",
                  "tipDarija": "صوت من مورا الفم، بحال «ك».",
                  "tipDarijaLat": "sout men mora l-fm, b7al \"k\".",
                },
                {
                  "nl": "L",
                  "word": "lamp",
                  "icon": "💡",
                  "darija": "اللمبة",
                  "darijaLat": "llamba",
                  "tip": "Tongpunt achter de boventanden.",
                  "answer": "lamp",
                  "tipDarija": "راس اللسان مورا السنان الفوقانية.",
                  "tipDarijaLat": "ras l-lsan mora s-snan l-fo9aniya.",
                },
                {
                  "nl": "M",
                  "word": "maan",
                  "icon": "🌙",
                  "darija": "القمر",
                  "darijaLat": "lqmer",
                  "tip": "Zoals de «م».",
                  "answer": "maan",
                  "tipDarija": "الشفايف مجموعين، صوت من الأنف، بحال «م».",
                  "tipDarijaLat": "ch-chfayef mjmw3yn, sout men alanf, b7al \"m\".",
                },
                {
                  "nl": "N",
                  "word": "neus",
                  "icon": "👃",
                  "darija": "نيف",
                  "darijaLat": "nif",
                  "tip": "Zoals de «ن».",
                  "answer": "neus",
                  "tipDarija": "اللسان مورا السنان، صوت من الأنف، بحال «ن».",
                  "tipDarijaLat": "l-lsan mora l-snan, sout men alanf, b7al \"n\".",
                },
                {
                  "nl": "O",
                  "word": "oog",
                  "icon": "👁️",
                  "darija": "عين",
                  "darijaLat": "3in",
                  "tip": "Ronde lippen, volle \"o\".",
                  "answer": "oog",
                  "tipDarija": "الشفايف مدوّرين، «o» كاملة.",
                  "tipDarijaLat": "ch-chfayef mdwryn, \"o\" kamla.",
                }
              ]
            },
            {
              "id": "0.0.4",
              "title": "Het alfabet: P – T",
              "titleDarija": "الأبجدية: P – T",
              "titleDarijaLat": "l-abjadiya: P – T",
              "type": "speaking",
              "intro": "Let goed op de P: die bestaat niet in het Darija. Luister en oefen.",
              "introDarijaLat": "Rddo balkom l-7arf P: ma kaynch f-Darija. Sm3o w tmerrno.",
              "darijaNote": "ردي بالك للحرف P: ما كاينش فالدارجة. سمعي وتمرني.",
              "darijaNoteLat": "Rddo balkom l-7arf P: ma kaynch f-Darija. Sm3o w tmerrno.",
              "items": [
                {
                  "nl": "P",
                  "word": "paard",
                  "icon": "🐴",
                  "darija": "حصان",
                  "darijaLat": "7san",
                  "tip": "Pufje lucht, zonder stem. Bestaat niet in het Darija!",
                  "answer": "paard",
                  "tipDarija": "الشفايف مجموعين مع نفخة ديال هوا، بلا صوت. «P» ما كايناش فالدارجة!",
                  "tipDarijaLat": "ch-chfayef mjmw3yn m3a nfkha dyal hwa, bla sout. \"P\" ma makanach f-darija!",
                },
                {
                  "nl": "Q",
                  "word": "quiz",
                  "icon": "❓",
                  "darija": "كويز",
                  "darijaLat": "kwiz",
                  "tip": "Klinkt als \"kw\".",
                  "answer": "quiz",
                  "tipDarija": "«Q» كتنطق بحال «kw». قليلة.",
                  "tipDarijaLat": "\"Q\" ktnt9 b7al \"kw\". 9lila.",
                },
                {
                  "nl": "R",
                  "word": "roos",
                  "icon": "🌹",
                  "darija": "وردة",
                  "darijaLat": "warda",
                  "tip": "Rollende tong-r of een lichte keel-r.",
                  "answer": "roos",
                  "tipDarija": "«r» باللسان كيتحرّك ولا خفيفة من الحلق.",
                  "tipDarijaLat": "\"r\" b-l-lsan kit7rrek wlla khfifa men l-7la9.",
                },
                {
                  "nl": "S",
                  "word": "ster",
                  "icon": "⭐",
                  "darija": "نجمة",
                  "darijaLat": "nejma",
                  "tip": "Sissende \"s\", zoals de «س».",
                  "answer": "ster",
                  "tipDarija": "«s» صافرة، بحال «س».",
                  "tipDarijaLat": "\"s\" safra, b7al \"s\".",
                },
                {
                  "nl": "T",
                  "word": "tafel",
                  "icon": "🍽️",
                  "darija": "طابلة",
                  "darijaLat": "tabla",
                  "tip": "Tongpunt tegen de tanden, zonder stem.",
                  "answer": "tafel",
                  "tipDarija": "راس اللسان على السنان، بلا صوت.",
                  "tipDarijaLat": "ras l-lsan 3la l-snan, bla sout.",
                }
              ]
            },
            {
              "id": "0.0.5",
              "title": "Het alfabet: U – Z",
              "titleDarija": "الأبجدية: U – Z",
              "titleDarijaLat": "l-abjadiya: U – Z",
              "type": "speaking",
              "intro": "De laatste letters. Let op de U en de V — die zijn lastig voor Darija-sprekers.",
              "introDarijaLat": "Hado homa l-7orof l-akhrin. Rddo balkom l-U w l-V, 7it y9dro ykouno s3ab 3la lli kayhdro b-Darija.",
              "darijaNote": "هادو هما الحروف الأخيرة. ردي بالك لـ U وV، حيت يقدرو يكونو صعاب على اللي كيهضرو بالدارجة.",
              "darijaNoteLat": "Hado homa l-7orof l-akhrin. Rddo balkom l-U w l-V, 7it y9dro ykouno s3ab 3la lli kayhdro b-Darija.",
              "items": [
                {
                  "nl": "U",
                  "word": "uur",
                  "icon": "⏰",
                  "darija": "ساعة",
                  "darijaLat": "sa3a",
                  "tip": "Ronde lippen zoals bij «oe», maar zeg «i».",
                  "answer": "uur",
                  "tipDarija": "الشفايف مدوّرين بحال «oe»، ولكن قولي «i». ما كايناش فالدارجة.",
                  "tipDarijaLat": "ch-chfayef mdwryn b7al \"oe\", walakin 9olo \"i\". ma makanach f-darija.",
                },
                {
                  "nl": "V",
                  "word": "vis",
                  "icon": "🐟",
                  "darija": "حوت",
                  "darijaLat": "7out",
                  "tip": "Zoals de F, maar mét een beetje stem.",
                  "answer": "vis",
                  "tipDarija": "بحال F، ولكن مع شوية صوت. فـ فلاندرز خفيفة.",
                  "tipDarijaLat": "b7al F, walakin m3a chwya sout. f Flandre khfifa.",
                },
                {
                  "nl": "W",
                  "word": "water",
                  "icon": "💧",
                  "darija": "الما",
                  "darijaLat": "lma",
                  "tip": "Ronde lippen, zoals de «و».",
                  "answer": "water",
                  "tipDarija": "الشفايف مدوّرين، بحال «و».",
                  "tipDarijaLat": "ch-chfayef mdwryn, b7al \"w\".",
                },
                {
                  "nl": "X",
                  "word": "taxi",
                  "icon": "🚕",
                  "darija": "طاكسي",
                  "darijaLat": "taxi",
                  "tip": "De X klinkt als \"ks\". Zeldzaam in het Nederlands.",
                  "answer": "taxi",
                  "tipDarija": "«X» كتنطق بحال «ks». قليلة فالهولندية.",
                  "tipDarijaLat": "\"X\" ktnt9 b7al \"ks\". 9lila f n-nederlands.",
                },
                {
                  "nl": "Y",
                  "word": "yoghurt",
                  "icon": "🥛",
                  "darija": "ياغورت",
                  "darijaLat": "yaghourt",
                  "tip": "De Y klinkt hier als \"j\" (zoals «ي»).",
                  "answer": "yoghurt",
                  "tipDarija": "هنا «Y» كتنطق بحال «j» (بحال «ي»).",
                  "tipDarijaLat": "hna \"Y\" ktnt9 b7al \"j\" (b7al \"y\").",
                },
                {
                  "nl": "Z",
                  "word": "zon",
                  "icon": "☀️",
                  "darija": "شمس",
                  "darijaLat": "chems",
                  "tip": "Zoemende \"s\" mét stem, zoals de «ز».",
                  "answer": "zon",
                  "tipDarija": "«s» كتزمزم مع الصوت، بحال «ز».",
                  "tipDarijaLat": "\"s\" ktzmzm m3a l-swt, b7al \"z\".",
                }
              ]
            }
          ]
        },
        {
          "id": "0.1",
          "title": "Klankleer & uitspraak",
          "titleDarija": "الأصوات والنطق",
          "titleDarijaLat": "L-aswat w n-not9",
          "goal": "De Nederlandse klanken herkennen en uitspreken — met tips voor Darija-sprekers.",
          "goalDarijaLat": "T3erfo w tnt9o l-aswat dyal Nederlands, m3a nsa2e7 l-nas lli kayhdro b-Darija.",
          "icon": "🗣️",
          "lessons": [
            {
              "id": "0.1.0",
              "title": "Luister: welk woord hoor je?",
              "titleDarija": "سمعي: أشمن كلمة سمعتي؟",
              "titleDarijaLat": "Sm3o: achmen kelma sme3to?",
              "type": "listen",
              "intro": "Eerst leren hóren, dan pas zelf zeggen. Luister en kies het juiste woord.",
              "introDarijaLat": "Luwel t3ellmo tsem3o, w men be3d nt9o. Sm3o w khtaro l-kelma s-s7i7a.",
              "darijaNote": "الأول تعلمي تسمعي الفرق، ومن بعد تنطقي. سمعي وختاري الكلمة الصحيحة.",
              "darijaNoteLat": "Luwel t3ellmo tsem3o l-far9, w men be3d nt9o. Sm3o w khtaro l-kelma s-s7i7a.",
              "items": [
                {
                  "nl": "man",
                  "pair": "maan",
                  "tip": "Korte 'a' vs. lange 'aa'",
                  "darija": "راجل — القمر",
                  "darijaLat": "rajel — lqmer",
                  "tipDarija": "«a» قصيرة مقابل «aa» طويلة.",
                  "tipDarijaLat": "\"a\" 9sira m9abl \"aa\" twila.",
                  "pronunciation": {
                    "focus": "korte a",
                    "acceptedTranscripts": [
                      "man"
                    ],
                    "commonConfusions": [
                      "maan"
                    ],
                    "highlight": "a",
                    "pairHighlight": "aa"
                  }
                },
                {
                  "nl": "bos",
                  "pair": "boos",
                  "tip": "Korte 'o' vs. lange 'oo'",
                  "darija": "الغابة — زعفان",
                  "darijaLat": "lghaba — za3fan",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "bos"
                    ],
                    "commonConfusions": [
                      "boos"
                    ],
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "pit",
                  "pair": "piet",
                  "tip": "Korte 'i' vs. lange 'ie'",
                  "darija": "النواة",
                  "darijaLat": "nnwa",
                  "tipDarija": "«i» قصيرة مقابل «ie» طويلة.",
                  "tipDarijaLat": "\"i\" 9sira m9abl \"ie\" twila.",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "pit"
                    ],
                    "commonConfusions": [
                      "piet"
                    ],
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "bus",
                  "pair": "buur",
                  "tip": "Korte \"u\" vs. lange \"uu\".",
                  "darija": "الطوبيس",
                  "darijaLat": "ttobis",
                  "tipDarija": "«u» قصيرة مقابل «uu» طويلة.",
                  "tipDarijaLat": "\"u\" 9sira m9abl \"uu\" twila.",
                },
                {
                  "nl": "zon",
                  "pair": "zoon",
                  "tip": "Kort \"o\" vs. lang \"oo\".",
                  "darija": "الشمس",
                  "darijaLat": "chchems",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                },
                {
                  "nl": "vis",
                  "pair": "vies",
                  "tip": "Korte 'i' vs. heldere 'ie'.",
                  "darija": "حوت — موسخ",
                  "darijaLat": "7out — mwsekh",
                  "tipDarija": "«i» قصيرة مقابل «ie» طويلة.",
                  "tipDarijaLat": "\"i\" 9sira m9abl \"ie\" twila.",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "vis"
                    ],
                    "commonConfusions": [
                      "vies"
                    ],
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "pen",
                  "pair": "ben",
                  "tip": "P is stemloos, B is stemhebbend.",
                  "darija": "الستيلو",
                  "darijaLat": "sstilo",
                  "tipDarija": "P (بلا صوت) مقابل B (مع صوت).",
                  "tipDarijaLat": "P (bla sout) m9abl B (m3a sout).",
                  "pronunciation": {
                    "focus": "p / b",
                    "acceptedTranscripts": [
                      "pen"
                    ],
                    "commonConfusions": [
                      "ben"
                    ],
                    "highlight": "p",
                    "pairHighlight": "b"
                  }
                },
                {
                  "nl": "fee",
                  "pair": "vee",
                  "tip": "F is stemloos, V is licht stemhebbend.",
                  "darija": "جنية — الماشية",
                  "darijaLat": "jenniya — lmashiya",
                  "tipDarija": "F مقابل V.",
                  "tipDarijaLat": "F m9abl V.",
                  "pronunciation": {
                    "focus": "f / v",
                    "acceptedTranscripts": [
                      "fee"
                    ],
                    "commonConfusions": [
                      "vee"
                    ],
                    "highlight": "f",
                    "pairHighlight": "v"
                  }
                }
              ]
            },
            {
              "id": "0.1.1",
              "title": "Korte vs. lange klinkers",
              "titleDarija": "الصوائت القصيرة والطويلة",
              "titleDarijaLat": "s-swayet l-9sira w t-twila",
              "type": "speaking",
              "intro": "In het Nederlands verandert de betekenis van een woord als een klinker kort of lang is. Luister goed naar het verschil.",
              "introDarijaLat": "F-Nederlands, ma3na dyal l-kelma kaytbeddel ila s-sout 9sir wlla twil. Sm3o mezyan l-far9.",
              "darijaNote": "الفرق بين الصوت القصير والصوت الطويل يقدر يبدل معنى الكلمة بالهولندية.",
              "darijaNoteLat": "L-far9 bin s-sout l-9sir w s-sout t-twil y9der ybeddel ma3na l-kelma b-Nederlands.",
              "items": [
                {
                  "nl": "man",
                  "pair": "maan",
                  "ipa": "/mɑn/ – /maːn/",
                  "tip": "Korte 'a' vs. lange 'aa'",
                  "darijaLat": "rajel — lqmer",
                  "darija": "راجل — القمر",
                  "pronunciation": {
                    "focus": "korte a",
                    "acceptedTranscripts": [
                      "man"
                    ],
                    "commonConfusions": [
                      "maan"
                    ],
                    "tipNl": "Kort \"a\" zoals in Darija «مانا»; lange \"aa\" houd je langer aan.",
                    "tipDarija": "قولي «man» بصوت a قصير، وما تطوليش الصوت بحال فـ «maan».",
                    "tipDarijaLat": "9olo \"man\" b-sout a 9syr, w ma ttwlych s-sout b7al f \"maan\".",
                    "highlight": "a",
                    "pairHighlight": "aa"
                  }
                },
                {
                  "nl": "bos",
                  "pair": "boos",
                  "ipa": "/bɔs/ – /boːs/",
                  "tip": "Korte 'o' vs. lange 'oo'",
                  "darijaLat": "lghaba — za3fan",
                  "darija": "الغابة — زعفان",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "bos"
                    ],
                    "commonConfusions": [
                      "boos"
                    ],
                    "tipNl": "Korte \"o\" is open; lange \"oo\" is ronder en langer.",
                    "tipDarija": "قولي «bos» بصوت o قصير ومفتوح، ماشي o طويلة بحال فـ «boos».",
                    "tipDarijaLat": "9olo \"bos\" b-sout o 9syr wmftw7, machi o twila b7al f \"boos\".",
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "pit",
                  "pair": "piet",
                  "ipa": "/pɪt/ – /pit/",
                  "tip": "Korte 'i' vs. lange 'ie'",
                  "darija": "النواة",
                  "darijaLat": "nnwa",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "pit"
                    ],
                    "commonConfusions": [
                      "piet"
                    ],
                    "tipNl": "Korte \"i\" ligt tussen i en e; lange \"ie\" is een heldere «i».",
                    "tipDarija": "قولي «pit» بصوت i قصير، وما تطوليش الصوت بحال فـ «piet».",
                    "tipDarijaLat": "9olo \"pit\" b-sout i 9syr, w ma ttwlych s-sout b7al f \"piet\".",
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "bus",
                  "pair": "buur",
                  "ipa": "/bʏs/ – /byːr/",
                  "tip": "De \"u\" bestaat niet in Darija: rond je lippen als bij «oe» maar zeg «i».",
                  "darija": "الطوبيس",
                  "darijaLat": "ttobis",
                  "pronunciation": {
                    "focus": "korte u",
                    "acceptedTranscripts": [
                      "bus"
                    ],
                    "commonConfusions": [
                      "buur"
                    ],
                    "tipNl": "De \"u\" bestaat niet in Darija: rond je lippen als bij «oe» maar zeg «i».",
                    "tipDarija": "فـ «bus» صوت u قصير. ما تطوليش الصوت بحال uu فـ «buur».",
                    "tipDarijaLat": "f \"bus\" sout u 9syr. ma ttwlych s-sout b7al uu f \"buur\".",
                    "highlight": "u",
                    "pairHighlight": "uu"
                  }
                },
                {
                  "nl": "les",
                  "pair": "lees",
                  "ipa": "/lɛs/ – /leːs/",
                  "tip": "Korte \"e\" zoals in «best»; lange \"ee\" langer aanhouden.",
                  "darija": "الدرس",
                  "darijaLat": "dders",
                  "pronunciation": {
                    "focus": "korte e",
                    "acceptedTranscripts": [
                      "les"
                    ],
                    "commonConfusions": [
                      "lees"
                    ],
                    "tipNl": "Korte \"e\" zoals in «best»; lange \"ee\" langer aanhouden.",
                    "tipDarija": "قولي «les» بصوت e قصير ومفتوح، ماشي ee طويلة بحال فـ «lees».",
                    "tipDarijaLat": "9olo \"les\" b-sout e 9syr wmftw7, machi ee twila b7al f \"lees\".",
                    "highlight": "e",
                    "pairHighlight": "ee"
                  }
                },
                {
                  "nl": "zon",
                  "pair": "zoon",
                  "ipa": "/zɔn/ – /zoːn/",
                  "tip": "Korte \"o\" (zon = شمس) vs. lange \"oo\" (zoon = الولد).",
                  "darija": "شمس — ولد",
                  "darijaLat": "chems — weld",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "zon"
                    ],
                    "commonConfusions": [
                      "zoon"
                    ],
                    "tipNl": "Korte \"o\" (zon = شمس) vs. lange \"oo\" (zoon = الولد).",
                    "tipDarija": "قولي «zon» بصوت o قصير ومفتوح، ماشي oo طويلة بحال فـ «zoon».",
                    "tipDarijaLat": "9olo \"zon\" b-sout o 9syr wmftw7, machi oo twila b7al f \"zoon\".",
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "tak",
                  "pair": "taak",
                  "ipa": "/tɑk/ – /taːk/",
                  "tip": "tak = فرع, taak = مهمة. De \"aa\" is duidelijk langer.",
                  "darija": "فرع — مهمة",
                  "darijaLat": "fer3 — mohimma",
                  "pronunciation": {
                    "focus": "korte a",
                    "acceptedTranscripts": [
                      "tak"
                    ],
                    "commonConfusions": [
                      "taak"
                    ],
                    "tipNl": "tak = فرع, taak = مهمة. De \"aa\" is duidelijk langer.",
                    "tipDarija": "قولي «tak» بصوت a قصير، وما تطوليش الصوت بحال aa فـ «taak».",
                    "tipDarijaLat": "9olo \"tak\" b-sout a 9syr, w ma ttwlych s-sout b7al aa f \"taak\".",
                    "highlight": "a",
                    "pairHighlight": "aa"
                  }
                },
                {
                  "nl": "vis",
                  "pair": "vies",
                  "ipa": "/vɪs/ – /vis/",
                  "tip": "Korte 'i' vs. heldere 'ie'.",
                  "darija": "حوت — موسخ",
                  "darijaLat": "7out — mwsekh",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "vis"
                    ],
                    "commonConfusions": [
                      "vies"
                    ],
                    "tipNl": "vis = حوت, vies = موسخ. Korte \"i\" vs. heldere \"ie\".",
                    "tipDarija": "قولي «vis» بصوت i قصير، ماشي ie طويلة بحال فـ «vies».",
                    "tipDarijaLat": "9olo \"vis\" b-sout i 9syr, machi ie twila b7al f \"vies\".",
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "bom",
                  "pair": "boom",
                  "ipa": "/bɔm/ – /boːm/",
                  "tip": "bom = قنبلة, boom = شجرة.",
                  "darija": "قنبلة — شجرة",
                  "darijaLat": "qonbola — chajra",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "bom"
                    ],
                    "commonConfusions": [
                      "boom"
                    ],
                    "tipNl": "bom = قنبلة, boom = شجرة.",
                    "tipDarija": "قولي «bom» بصوت o قصير ومفتوح، ماشي oo طويلة بحال فـ «boom».",
                    "tipDarijaLat": "9olo \"bom\" b-sout o 9syr wmftw7, machi oo twila b7al f \"boom\".",
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "pot",
                  "pair": "poot",
                  "ipa": "/pɔt/ – /poːt/",
                  "tip": "pot = طنجرة, poot = رجل الحيوان.",
                  "darija": "طنجرة — رجل",
                  "darijaLat": "tenjra — rjel",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "pot"
                    ],
                    "commonConfusions": [
                      "poot"
                    ],
                    "tipNl": "pot = طنجرة, poot = رجل الحيوان.",
                    "tipDarija": "قولي «pot» بصوت o قصير ومفتوح، ماشي oo طويلة بحال فـ «poot».",
                    "tipDarijaLat": "9olo \"pot\" b-sout o 9syr wmftw7, machi oo twila b7al f \"poot\".",
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "rok",
                  "pair": "rook",
                  "ipa": "/rɔk/ – /roːk/",
                  "tip": "rok = تنورة, rook = دخان.",
                  "darija": "جيبة — دخان",
                  "darijaLat": "jiba — dokhan",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "rok"
                    ],
                    "commonConfusions": [
                      "rook"
                    ],
                    "tipNl": "rok = تنورة, rook = دخان.",
                    "tipDarija": "قولي «rok» بصوت o قصير ومفتوح، ماشي oo طويلة بحال فـ «rook».",
                    "tipDarijaLat": "9olo \"rok\" b-sout o 9syr wmftw7, machi oo twila b7al f \"rook\".",
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                }
              ]
            },
            {
              "id": "0.1.2",
              "title": "Lange klinkers & tweeklanken",
              "titleDarija": "الحروف الطويلة والمركّبة",
              "titleDarijaLat": "l-7orof t-twila w l-mrakkba",
              "type": "speaking",
              "intro": "Sommige klinkers zijn lang (ie, oe, eu), andere smelten samen tot één klank — een echte tweeklank (ui, ij/ei, ou/au). Let goed op de stand van je mond.",
              "introDarijaLat": "Chi aswat twal (ie, oe, eu), w chi aswat kaytjm3o f-sout wa7ed (ui, ij/ei, ou/au). Rddo balkom kifach t7etto femmkom.",
              "darijaNote": "الأصوات المركبة ما كايناش بنفس الشكل فالدارجة، لذلك ركزي مزيان على حركة الفم.",
              "darijaNoteLat": "L-aswat l-mrakkba ma kaynach b-nafs ch-chkel f-Darija. Rkkzo mezyan 3la 7arakat l-femm.",
              "items": [
                {
                  "nl": "huis",
                  "ipa": "/hœys/",
                  "tip": "\"ui\": begin met «a» en glijd naar «u». Rond je lippen op het einde.",
                  "darija": "دار",
                  "darijaLat": "dar",
                  "tipDarija": "«ui»: بدا بـ «a» وزلق ل«u». دوّر شفايفك فالأخر.",
                  "tipDarijaLat": "\"ui\": bda b \"a\" wzl9 l\"u\". dwr chfayefk falakhr.",
                },
                {
                  "nl": "deur",
                  "ipa": "/døːr/",
                  "tip": "\"eu\": zeg «ee» maar met ronde lippen, zoals bij «oe».",
                  "darija": "باب",
                  "darijaLat": "bab",
                  "tipDarija": "«eu»: قولي «ee» ولكن بشفايف مدوّرة، بحال «oe».",
                  "tipDarijaLat": "\"eu\": 9olo \"ee\" walakin bchfayf mdwra, b7al \"oe\".",
                },
                {
                  "nl": "niet",
                  "ipa": "/nit/",
                  "tip": "\"ie\": een lange, heldere «i» zoals in het Arabische «ي».",
                  "darija": "ماشي",
                  "darijaLat": "machi",
                  "tipDarija": "«ie»: «i» طويلة وواضحة بحال «ي» العربية.",
                  "tipDarijaLat": "\"ie\": \"i\" twila w wad7a b7al \"y\" l-3arbiya.",
                },
                {
                  "nl": "trein",
                  "pair": "tijd",
                  "ipa": "/trɛin/ – /tɛit/",
                  "tip": "\"ei\" en \"ij\" klinken hetzelfde: begin bij «e» en glijd naar «i».",
                  "darija": "التران",
                  "darijaLat": "ttran",
                  "pronunciation": {
                    "focus": "ei / ij",
                    "acceptedTranscripts": [
                      "trein"
                    ],
                    "commonConfusions": [
                      "tijd"
                    ],
                    "tipNl": "\"ei\" en \"ij\" klinken hetzelfde: begin bij «e» en glijd naar «i».",
                    "tipDarija": "«ei» و«ij» كيتنطقو بنفس الصوت فالهولندية. قولي «trein» بوضوح.",
                    "tipDarijaLat": "\"ei\" w\"ij\" kytnt9w b-nafs s-sout f n-nederlands. 9olo \"trein\" bwdw7.",
                    "highlight": "ei",
                    "pairHighlight": "ij"
                  }
                },
                {
                  "nl": "boek",
                  "ipa": "/buk/",
                  "tip": "\"oe\" is als de Arabische «و» in «نور».",
                  "darija": "كتاب",
                  "darijaLat": "ktab",
                  "tipDarija": "«oe» بحال «و» العربية فـ «نور».",
                  "tipDarijaLat": "\"oe\" b7al \"w\" l-3arbiya f \"nwr\".",
                },
                {
                  "nl": "koud",
                  "pair": "blauw",
                  "ipa": "/kɑut/ – /blɑu/",
                  "tip": "\"ou\" en \"au\" klinken hetzelfde: «a» die naar «u» glijdt.",
                  "darija": "بارد",
                  "darijaLat": "bared",
                  "pronunciation": {
                    "focus": "ou / au",
                    "acceptedTranscripts": [
                      "koud"
                    ],
                    "commonConfusions": [
                      "blauw"
                    ],
                    "tipNl": "\"ou\" en \"au\" klinken hetzelfde: «a» die naar «u» glijdt.",
                    "tipDarija": "«ou» و«au» كيتنطقو بنفس الصوت. الصوت كيبدا قريب لـ a وكيزلق لـ u.",
                    "tipDarijaLat": "\"ou\" w\"au\" kytnt9w b-nafs s-sout. s-sout kibda 9rib l a wkyzl9 l u.",
                    "highlight": "ou",
                    "pairHighlight": "auw"
                  }
                },
                {
                  "nl": "tuin",
                  "ipa": "/tœyn/",
                  "tip": "\"ui\" opnieuw: van «a» naar «u» met ronde lippen.",
                  "darija": "جردة",
                  "darijaLat": "jarda",
                  "tipDarija": "«ui» عاود: من «a» ل«u» بشفايف مدوّرة.",
                  "tipDarijaLat": "\"ui\" 3awd: men \"a\" l\"u\" bchfayf mdwra.",
                },
                {
                  "nl": "neus",
                  "ipa": "/nøːs/",
                  "tip": "\"eu\": «ee» met ronde lippen.",
                  "darija": "نيف",
                  "darijaLat": "nif",
                  "tipDarija": "«eu»: «ee» بشفايف مدوّرة.",
                  "tipDarijaLat": "\"eu\": \"ee\" bchfayf mdwra.",
                },
                {
                  "nl": "vier",
                  "ipa": "/vir/",
                  "tip": "\"ie\": lange heldere «i».",
                  "darija": "ربعة",
                  "darijaLat": "reb3a",
                  "tipDarija": "«ie»: «i» طويلة وواضحة.",
                  "tipDarijaLat": "\"ie\": \"i\" twila w wad7a.",
                  "value": 4
                },
                {
                  "nl": "klein",
                  "ipa": "/klɛin/",
                  "tip": "\"ei\": van «e» naar «i».",
                  "darija": "صغير",
                  "darijaLat": "sghir",
                  "tipDarija": "«ei»: من «e» ل«i».",
                  "tipDarijaLat": "\"ei\": men \"e\" l\"i\".",
                },
                {
                  "nl": "goed",
                  "ipa": "/ɣut/",
                  "tip": "\"oe\" zoals de Arabische «و».",
                  "darija": "مزيان",
                  "darijaLat": "mzyan",
                  "tipDarija": "«oe» بحال «و» العربية.",
                  "tipDarijaLat": "\"oe\" b7al \"w\" l-3arbiya.",
                },
                {
                  "nl": "vrouw",
                  "ipa": "/vrɑu/",
                  "tip": "\"ou\": «a» die naar «u» glijdt.",
                  "darija": "مرا",
                  "darijaLat": "mra",
                  "tipDarija": "«ou»: «a» كتزلق ل«u».",
                  "tipDarijaLat": "\"ou\": \"a\" ktzl9 l\"u\".",
                }
              ]
            },
            {
              "id": "0.1.3",
              "title": "Moeilijke medeklinkers (P/B, F/V, G/CH)",
              "titleDarija": "الصوامت الصعيبة (P/B، F/V، G/CH)",
              "titleDarijaLat": "S-swamat s-s3ab (P/B, F/V, G/CH)",
              "type": "speaking",
              "intro": "Sommige medeklinkers zijn lastig omdat ze in het Darija niet (zo) bestaan. Oefen ze met minimale paren.",
              "introDarijaLat": "Chi 7orof s3ab 7it ma kayninch b-nafs ch-chkel f-Darija. Tmerrno 3lihom b-kelmat lli binathom ghir far9 sghir.",
              "darijaNote": "الحرف P ما كاينش فالدارجة، وكيقدر يخرج بحال B. ركزي على الفرق باش الكلمة تبان مفهومة.",
              "darijaNoteLat": "L-7arf P ma kaynch f-Darija, w y9der ykhrej b7al B. Rkkzo 3la l-far9 bach l-kelma tban mfhouma.",
              "items": [
                {
                  "nl": "pen",
                  "pair": "ben",
                  "ipa": "/pɛn/ – /bɛn/",
                  "tip": "P is stemloos, B is stemhebbend.",
                  "darija": "الستيلو",
                  "darijaLat": "sstilo",
                  "pronunciation": {
                    "focus": "p / b",
                    "acceptedTranscripts": [
                      "pen"
                    ],
                    "commonConfusions": [
                      "ben"
                    ],
                    "tipNl": "P is stemloos (geen trilling in de keel), B is stemhebbend. Leg je hand op je keel om te voelen.",
                    "tipDarija": "مع «p» الحبال الصوتية ما كيهتزوش، وكيخرج شوية ديال الهوا. قولي «pen»، ماشي «ben».",
                    "tipDarijaLat": "m3a \"p\" l-7bal s-soutiya ma kyhtzwch, w kikhrej chwya dyal l-hwa. 9olo \"pen\", machi \"ben\".",
                    "highlight": "p",
                    "pairHighlight": "b"
                  }
                },
                {
                  "nl": "pak",
                  "pair": "bak",
                  "ipa": "/pɑk/ – /bɑk/",
                  "tip": "Blaas een klein beetje lucht bij de 'p'.",
                  "darija": "الكوستيم",
                  "darijaLat": "lkostim",
                  "pronunciation": {
                    "focus": "p / b",
                    "acceptedTranscripts": [
                      "pak"
                    ],
                    "commonConfusions": [
                      "bak"
                    ],
                    "tipNl": "Blaas een klein beetje lucht bij de \"p\", niet bij de \"b\".",
                    "tipDarija": "«p» كتخرج معاها نفخة خفيفة، أما «b» ففيها اهتزاز. قولي «pak»، ماشي «bak».",
                    "tipDarijaLat": "\"p\" ktkhrj m3aha nfkha khfyfa, ama \"b\" f fiha ahtzaz. 9olo \"pak\", machi \"bak\".",
                    "highlight": "p",
                    "pairHighlight": "b"
                  }
                },
                {
                  "nl": "fee",
                  "pair": "vee",
                  "ipa": "/feː/ – /veː/",
                  "tip": "F is stemloos, V is licht stemhebbend.",
                  "darija": "جنية — الماشية",
                  "darijaLat": "jenniya — lmashiya",
                  "pronunciation": {
                    "focus": "f / v",
                    "acceptedTranscripts": [
                      "fee"
                    ],
                    "commonConfusions": [
                      "vee"
                    ],
                    "tipNl": "F is stemloos, V is licht stemhebbend. In Vlaanderen liggen ze dicht bij elkaar.",
                    "tipDarija": "مع «f» الحبال الصوتية ما كيهتزوش، أما مع «v» كاين شوية ديال الاهتزاز. قولي «fee».",
                    "tipDarijaLat": "m3a \"f\" l-7bal s-soutiya ma kyhtzwch, ama m3a \"v\" kayn chwya dyal alahtzaz. 9olo \"fee\".",
                    "highlight": "f",
                    "pairHighlight": "v"
                  }
                },
                {
                  "nl": "gaan",
                  "ipa": "/ɣaːn/",
                  "tip": "In Vlaanderen is de \"g\" zacht /ɣ/ (bijna een «h»). In Nederland is het een harde keelklank zoals «خ».",
                  "darija": "بحال الصوت خ فـ خبز",
                  "darijaLat": "kh zoals in khobz",
                  "tipDarija": "فـ فلاندرز «g» خفيفة /ɣ/ (قريبة لـ «ه»). فهولندا صوت قوي من الحلق بحال «خ».",
                  "tipDarijaLat": "f Flandre \"g\" khfifa /ɣ/ (9riba l \"h\"). f-Holland sout 9wy men l-7la9 b7al \"kh\".",
                },
                {
                  "nl": "lachen",
                  "ipa": "/ˈlɑxə(n)/",
                  "tip": "\"ch\" = dezelfde keelklank als «خ». In Gent iets zachter dan in Nederland.",
                  "darija": "يضحك",
                  "darijaLat": "yde7k",
                  "tipDarija": "«ch» = نفس صوت الحلق بحال «خ». فـ غنت شوية خفيفة كثر من هولندا.",
                  "tipDarijaLat": "\"ch\" = nafs sout l-7la9 b7al \"kh\". f Gent chwya khfifa ktr men Holland.",
                },
                {
                  "nl": "peer",
                  "pair": "beer",
                  "ipa": "/peːr/ – /beːr/",
                  "tip": "peer = لنجاصة (blaas lucht), beer = دب (geen lucht).",
                  "darija": "لنجاصة",
                  "darijaLat": "lenjassa",
                  "pronunciation": {
                    "focus": "p / b",
                    "acceptedTranscripts": [
                      "peer"
                    ],
                    "commonConfusions": [
                      "beer"
                    ],
                    "tipNl": "peer = لنجاصة (blaas lucht), beer = دب (geen lucht).",
                    "tipDarija": "«p» كتخرج معاها نفخة خفيفة. قولي «peer»، ماشي «beer».",
                    "tipDarijaLat": "\"p\" ktkhrj m3aha nfkha khfifa. 9olo \"peer\", machi \"beer\".",
                    "highlight": "p",
                    "pairHighlight": "b"
                  }
                },
                {
                  "nl": "vel",
                  "pair": "fel",
                  "ipa": "/vɛl/ – /fɛl/",
                  "tip": "vel = جلد (licht stemhebbend), fel = قوي (stemloos).",
                  "darija": "الجلد",
                  "darijaLat": "jeld",
                  "pronunciation": {
                    "focus": "v / f",
                    "acceptedTranscripts": [
                      "vel"
                    ],
                    "commonConfusions": [
                      "fel"
                    ],
                    "tipNl": "vel = جلد (licht stemhebbend), fel = قوي (stemloos).",
                    "tipDarija": "مع «v» كاين شوية ديال الاهتزاز، أما «f» فبلا اهتزاز. قولي «vel»، ماشي «fel».",
                    "tipDarijaLat": "m3a \"v\" kayn chwya dyal alahtzaz, ama \"f\" f bla ahtzaz. 9olo \"vel\", machi \"fel\".",
                    "highlight": "v",
                    "pairHighlight": "f"
                  }
                },
                {
                  "nl": "vaas",
                  "ipa": "/vaːs/",
                  "tip": "Begin zacht met de \"v\", niet als een \"f\".",
                  "darija": "فازة / مزهرية",
                  "darijaLat": "vaza / mezhariya",
                  "tipDarija": "بدا «v» بلطافة، ماشي بحال «f».",
                  "tipDarijaLat": "bda \"v\" bltafa, machi b7al \"f\".",
                },
                {
                  "nl": "school",
                  "ipa": "/sxoːl/",
                  "tip": "\"sch\" = «s» + keelklank «خ». Vlaams vaak zachter.",
                  "darija": "المدرسة",
                  "darijaLat": "lmadrasa",
                  "tipDarija": "«sch» = «s» + صوت الحلق «خ». الفلامنكية غالبا خفيفة.",
                  "tipDarijaLat": "\"sch\" = \"s\" + sout l-7la9 \"kh\". l-flamnkya ghalba khfifa.",
                },
                {
                  "nl": "nacht",
                  "ipa": "/nɑxt/",
                  "tip": "\"cht\" = keelklank «خ» + t.",
                  "darija": "الليل",
                  "darijaLat": "lil",
                  "tipDarija": "«cht» = صوت الحلق «خ» + t.",
                  "tipDarijaLat": "\"cht\" = sout l-7la9 \"kh\" + t.",
                }
              ]
            },
            {
              "id": "0.1.4",
              "title": "Luister: korte of lange klank?",
              "titleDarija": "سمع: صوت قصير ولا طويل؟",
              "titleDarijaLat": "Sm3o: sout 9sir wlla twil?",
              "type": "listen",
              "intro": "Welk woord hoor je? Eerst leren horen, dan pas uitspreken.",
              "introDarijaLat": "Achmen kelma katsem3o? Luwel sm3o mezyan, w men be3d nt9o.",
              "items": [
                {
                  "nl": "man",
                  "pair": "maan",
                  "tip": "Korte 'a' vs. lange 'aa'",
                  "tipDarija": "«a» قصيرة مقابل «aa» طويلة.",
                  "tipDarijaLat": "\"a\" 9sira m9abl \"aa\" twila.",
                  "darija": "راجل — القمر",
                  "darijaLat": "rajel — lqmer",
                  "pronunciation": {
                    "focus": "korte a",
                    "acceptedTranscripts": [
                      "man"
                    ],
                    "commonConfusions": [
                      "maan"
                    ],
                    "highlight": "a",
                    "pairHighlight": "aa"
                  }
                },
                {
                  "nl": "bos",
                  "pair": "boos",
                  "tip": "Korte 'o' vs. lange 'oo'",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                  "darija": "الغابة — زعفان",
                  "darijaLat": "lghaba — za3fan",
                  "pronunciation": {
                    "focus": "korte o",
                    "acceptedTranscripts": [
                      "bos"
                    ],
                    "commonConfusions": [
                      "boos"
                    ],
                    "highlight": "o",
                    "pairHighlight": "oo"
                  }
                },
                {
                  "nl": "zon",
                  "pair": "zoon",
                  "tip": "Korte o vs. lange oo.",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                },
                {
                  "nl": "tak",
                  "pair": "taak",
                  "tip": "Korte a vs. lange aa.",
                  "tipDarija": "«a» قصيرة مقابل «aa» طويلة.",
                  "tipDarijaLat": "\"a\" 9sira m9abl \"aa\" twila.",
                },
                {
                  "nl": "vis",
                  "pair": "vies",
                  "tip": "Korte 'i' vs. heldere 'ie'.",
                  "tipDarija": "«i» قصيرة مقابل «ie» طويلة.",
                  "tipDarijaLat": "\"i\" 9sira m9abl \"ie\" twila.",
                  "darija": "حوت — موسخ",
                  "darijaLat": "7out — mwsekh",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "vis"
                    ],
                    "commonConfusions": [
                      "vies"
                    ],
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "bom",
                  "pair": "boom",
                  "tip": "Korte o vs. lange oo.",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                },
                {
                  "nl": "pot",
                  "pair": "poot",
                  "tip": "Korte o vs. lange oo.",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                },
                {
                  "nl": "rok",
                  "pair": "rook",
                  "tip": "Korte o vs. lange oo.",
                  "tipDarija": "«o» قصيرة مقابل «oo» طويلة.",
                  "tipDarijaLat": "\"o\" 9sira m9abl \"oo\" twila.",
                },
                {
                  "nl": "pit",
                  "pair": "piet",
                  "tip": "Korte 'i' vs. lange 'ie'",
                  "tipDarija": "«i» قصيرة مقابل «ie» طويلة.",
                  "tipDarijaLat": "\"i\" 9sira m9abl \"ie\" twila.",
                  "darija": "النواة",
                  "darijaLat": "nnwa",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "pit"
                    ],
                    "commonConfusions": [
                      "piet"
                    ],
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "les",
                  "pair": "lees",
                  "tip": "Korte e vs. lange ee.",
                  "tipDarija": "«e» قصيرة مقابل «ee» طويلة.",
                  "tipDarijaLat": "\"e\" 9sira m9abl \"ee\" twila.",
                }
              ]
            }
          ]
        },
        {
          "id": "0.2",
          "title": "Begroetingen & beleefdheid",
          "titleDarija": "التحيات والأدب",
          "titleDarijaLat": "t-ta7iyat w l-adab",
          "goal": "Iemand groeten en beleefd reageren in het dagelijks leven.",
          "goalDarijaLat": "Tsellmo 3la chi wa7ed w tjawbo b-adab f-l7ayat l-yawmiya.",
          "icon": "👋",
          "lessons": [
            {
              "id": "0.2.0",
              "title": "Ja, nee & korte antwoorden",
              "titleDarija": "إيه، لا والأجوبة القصيرة",
              "titleDarijaLat": "iyh, la w l-ajwiba l-9sira",
              "type": "vocab",
              "intro": "De belangrijkste kleine woorden om te antwoorden.",
              "introDarijaLat": "Aham l-kelmat sghar bach tjawbo.",
              "items": [
                {
                  "nl": "ja",
                  "darija": "إيه",
                  "darijaLat": "iyyeh",
                  "tip": "In Marokko ook: واه (wah).",
                  "tipDarija": "فالمغرب حتى: واه.",
                  "tipDarijaLat": "f l-maghrib 7tta: wah.",
                },
                {
                  "nl": "nee",
                  "darija": "لا",
                  "darijaLat": "la"
                },
                {
                  "nl": "misschien",
                  "darija": "يمكن",
                  "darijaLat": "yemken"
                },
                {
                  "nl": "oké / goed",
                  "darija": "واخّا",
                  "darijaLat": "waxxa"
                },
                {
                  "nl": "een beetje",
                  "darija": "شوية",
                  "darijaLat": "chwiya"
                },
                {
                  "nl": "ik weet het niet",
                  "darija": "ما عارفش",
                  "darijaLat": "ma 3arefch"
                },
                {
                  "nl": "dat klopt",
                  "darija": "صحيح",
                  "darijaLat": "s7i7"
                },
                {
                  "nl": "alstublieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak"
                }
              ]
            },
            {
              "id": "0.2.1",
              "title": "Groeten",
              "titleDarija": "التحيات",
              "titleDarijaLat": "t-ta7iyat",
              "type": "vocab",
              "intro": "Zo begroet je mensen in Gent, van formeel tot informeel.",
              "introDarijaLat": "Hakka katsellmo 3la n-nas f-Gent, men r-rasmi 7tta l-3adi.",
              "items": [
                {
                  "nl": "Hallo",
                  "darija": "سلام",
                  "darijaLat": "salam",
                  "tip": "Neutraal, altijd goed.",
                  "tipDarija": "محايد، ديما مزيان.",
                  "tipDarijaLat": "m7ayd, dima mezyan.",
                },
                {
                  "nl": "Dag",
                  "darija": "سلام / بسلامة",
                  "darijaLat": "salam / bslama",
                  "tip": "Kan zowel \"hallo\" als \"tot ziens\" betekenen.",
                  "tipDarija": "يقدر يعني «سلام» ولا «بسلامة» بجوج.",
                  "tipDarijaLat": "y9der y3ni \"slam\" wlla \"bslama\" b-jouj.",
                },
                {
                  "nl": "Goedemorgen",
                  "darija": "صباح الخير",
                  "darijaLat": "sba7 lkhir",
                  "tip": "Tot ongeveer 12u.",
                  "tipDarija": "حتى لـ حوالي 12.",
                  "tipDarijaLat": "7tta l 7waly 12.",
                },
                {
                  "nl": "Goedemiddag",
                  "darija": "مسا الخير",
                  "darijaLat": "msa lkhir",
                  "tip": "Overdag, na de middag. Het Darija maakt geen apart onderscheid met de avond.",
                  "tipDarija": "فالنهار، من بعد الظهر. الدارجة ما كتفرقش بينو وبين العشية.",
                  "tipDarijaLat": "F-nhar, men be3d d-dher. Darija ma katferre9ch bino w bin l-3chiya.",
                },
                {
                  "nl": "Goedenavond",
                  "darija": "مسا الخير",
                  "darijaLat": "msa lkhir",
                  "tip": "'s Avonds.",
                  "tipDarija": "فالعشية.",
                  "tipDarijaLat": "f-l3chiya.",
                },
                {
                  "nl": "Tot ziens",
                  "darija": "بسلامة",
                  "darijaLat": "bslama",
                  "tip": "Bij het afscheid.",
                  "tipDarija": "فالوداع.",
                  "tipDarijaLat": "f-lwda3.",
                },
                {
                  "nl": "Tot morgen",
                  "darija": "حتى لغدا",
                  "darijaLat": "7tta lghda"
                },
                {
                  "nl": "Tot straks",
                  "darija": "حتى من بعد",
                  "darijaLat": "7tta men be3d",
                  "tip": "Als je elkaar later dezelfde dag weer ziet.",
                  "tipDarija": "إلا غادي تشوفو بعضياتكم من بعد نفس النهار.",
                  "tipDarijaLat": "Ila ghadi tchoufo ba3diyatkom men be3d f-nafs n-nhar.",
                },
                {
                  "nl": "Welkom",
                  "darija": "مرحبا",
                  "darijaLat": "mar7ba"
                },
                {
                  "nl": "Hoe gaat het?",
                  "darija": "لاباس؟ / كي داير؟ / كي دايرة؟",
                  "darijaLat": "labas? / ki dayer? / ki dayra?",
                  "tip": "De gewone vraag \"hoe gaat het\".",
                  "tipDarija": "السؤال العادي «كيداير/كيدايرة».",
                  "tipDarijaLat": "s-so2al l-3adi \"kidayr/kidayra\".",
                },
                {
                  "nl": "Goed, dank u.",
                  "darija": "لاباس، شكرا",
                  "darijaLat": "labas, choukran",
                  "tip": "Het antwoord op \"hoe gaat het?\".",
                  "tipDarija": "الجواب على «كيداير».",
                  "tipDarijaLat": "l-jwab 3la \"kidayr\".",
                }
              ]
            },
            {
              "id": "0.2.2",
              "title": "Beleefdheid",
              "titleDarija": "الأدب واللباقة",
              "titleDarijaLat": "l-adab w l-lba9a",
              "type": "vocab",
              "intro": "Beleefde woorden die je elke dag nodig hebt.",
              "introDarijaLat": "Kelmat b-adab lli kat7tajohom kol nhar.",
              "items": [
                {
                  "nl": "Alstublieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak",
                  "tip": "Formeel (met \"u\").",
                  "tipDarija": "رسمي (مع «u»).",
                  "tipDarijaLat": "rasmi (m3a \"u\").",
                },
                {
                  "nl": "Alsjeblieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak",
                  "tip": "Informeel (met \"je\"). Ook: \"hier je\" als je iets geeft.",
                  "tipDarija": "غير رسمي (مع «je»). حتى: «هاك» ملي كتعطي شي حاجة.",
                  "tipDarijaLat": "ghir rasmi (m3a \"je\"). 7tta: \"hak\" mlli kt3ti chi 7aja.",
                },
                {
                  "nl": "Dank u wel",
                  "darija": "شكرا",
                  "darijaLat": "choukran",
                  "tip": "Formeel bedanken.",
                  "tipDarija": "شكر رسمي.",
                  "tipDarijaLat": "chkr rasmi.",
                },
                {
                  "nl": "Dank je wel",
                  "darija": "شكرا بزاف",
                  "darijaLat": "choukran bezzaf",
                  "tip": "Informeel bedanken.",
                  "tipDarija": "شكر غير رسمي.",
                  "tipDarijaLat": "chkr ghir rasmi.",
                },
                {
                  "nl": "Graag gedaan",
                  "darija": "مرحبا",
                  "darijaLat": "mar7ba",
                  "tip": "Antwoord op \"dank u\".",
                  "tipDarija": "الجواب على «شكرا».",
                  "tipDarijaLat": "l-jwab 3la \"chkra\".",
                },
                {
                  "nl": "Sorry",
                  "darija": "سمح ليا",
                  "darijaLat": "sme7 liya"
                },
                {
                  "nl": "Pardon",
                  "darija": "سمح ليا",
                  "darijaLat": "sme7 liya",
                  "tip": "Om langs iemand te gaan of iets te vragen.",
                  "tipDarija": "باش تعدّي حدا شي حد ولا تسول شي حاجة.",
                  "tipDarijaLat": "bach t3eddi 7da chi 7d wlla tswl chi 7aja.",
                },
                {
                  "nl": "Merci",
                  "darija": "شكرا",
                  "darijaLat": "choukran",
                  "tip": "In Gent zeggen mensen heel vaak 'merci'.",
                  "tipDarija": "فـ غنت الناس كيقولو بزاف «merci» بمعنى «شكرا».",
                  "tipDarijaLat": "f Gent l-nas ki9olo bezzaf \"merci\" b-ma3na \"chkra\".",
                },
                {
                  "nl": "Excuseer",
                  "darija": "سمح ليا",
                  "darijaLat": "sme7 liya",
                  "tip": "Typisch Vlaams voor \"sorry\" of \"excuseer me\".",
                  "tipDarija": "فلامنكية بمعنى «سمح ليا».",
                  "tipDarijaLat": "flamankiya b-ma3na \"sme7 liya\".",
                },
                {
                  "nl": "Mag ik?",
                  "darija": "واش نقدر؟",
                  "darijaLat": "wach nqder?",
                  "tip": "Om beleefd iets te vragen.",
                  "tipDarija": "باش تطلب شي حاجة بأدب.",
                  "tipDarijaLat": "bach ttlb chi 7aja b l-adab.",
                },
                {
                  "nl": "Geen probleem",
                  "darija": "ما كاين حتى مشكل",
                  "darijaLat": "ma kayn 7ta mochkil"
                },
                {
                  "nl": "Natuurlijk",
                  "darija": "طبعا",
                  "darijaLat": "tab3an"
                }
              ]
            },
            {
              "id": "0.2.3",
              "title": "Spreekoefening: groeten & beleefdheid",
              "titleDarija": "تمرين الكلام: التحية والأدب",
              "titleDarijaLat": "Tamrin l-klam: t-ta7iyat w l-adab",
              "type": "speaking",
              "intro": "Zeg de begroetingen en beleefde woorden hardop. Luister eerst, spreek dan na.",
              "introDarijaLat": "9olo t-ta7iyat w kelmat l-adab b-sout 3ali. Sm3o luwel, w men be3d 3awdo.",
              "darijaNote": "قولي التحيات وكلمات الأدب بصوت عالي. سمعي الأول، ومن بعد عاودي.",
              "darijaNoteLat": "9olo t-ta7iyat w kelmat l-adab b-sout 3ali. Sm3o luwel, w men be3d 3awdo.",
              "items": [
                {
                  "nl": "Hallo",
                  "darija": "سلام",
                  "darijaLat": "salam"
                },
                {
                  "nl": "Goedemorgen",
                  "darija": "صباح الخير",
                  "darijaLat": "sba7 lkhir"
                },
                {
                  "nl": "Goedenavond",
                  "darija": "مسا الخير",
                  "darijaLat": "msa lkhir"
                },
                {
                  "nl": "Dank u wel",
                  "darija": "شكرا",
                  "darijaLat": "choukran"
                },
                {
                  "nl": "Alstublieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak"
                },
                {
                  "nl": "Sorry",
                  "darija": "سمح ليا",
                  "darijaLat": "sme7 liya"
                },
                {
                  "nl": "Tot ziens",
                  "darija": "بسلامة",
                  "darijaLat": "bslama"
                }
              ]
            }
          ]
        },
        {
          "id": "0.3",
          "title": "Getallen 0–20",
          "titleDarija": "الأرقام 0–20",
          "titleDarijaLat": "l-ar9am 0–20",
          "goal": "Tot twintig tellen en getallen herkennen.",
          "goalDarijaLat": "T3eddo 7tta l-3echrin w t3erfo l-ar9am.",
          "icon": "🔢",
          "lessons": [
            {
              "id": "0.3.1",
              "title": "Tellen van 0 tot 20",
              "titleDarija": "العدّ من 0 حتى 20",
              "titleDarijaLat": "l-3edd men 0 7tta 20",
              "type": "numbers",
              "intro": "Luister en spreek elk getal na. Let op: \"twaalf\" en \"dertien\" klinken anders dan je denkt.",
              "introDarijaLat": "Sm3o w 3awdo kol ra9m. Rddo balkom: \"twaalf\" w \"dertien\" ma kaytsm3ouch kima katdenno.",
              "items": [
                {
                  "nl": "nul",
                  "value": 0,
                  "darija": "زيرو",
                  "darijaLat": "zero"
                },
                {
                  "nl": "een",
                  "value": 1,
                  "darija": "واحد",
                  "darijaLat": "wa7ed"
                },
                {
                  "nl": "twee",
                  "value": 2,
                  "darija": "زوج",
                  "darijaLat": "zouj"
                },
                {
                  "nl": "drie",
                  "value": 3,
                  "darija": "تلاتة",
                  "darijaLat": "tlata"
                },
                {
                  "nl": "vier",
                  "value": 4,
                  "darija": "ربعة",
                  "darijaLat": "reb3a"
                },
                {
                  "nl": "vijf",
                  "value": 5,
                  "darija": "خمسة",
                  "darijaLat": "khamsa"
                },
                {
                  "nl": "zes",
                  "value": 6,
                  "darija": "ستة",
                  "darijaLat": "setta"
                },
                {
                  "nl": "zeven",
                  "value": 7,
                  "darija": "سبعة",
                  "darijaLat": "seb3a"
                },
                {
                  "nl": "acht",
                  "value": 8,
                  "darija": "تمنية",
                  "darijaLat": "tmenya"
                },
                {
                  "nl": "negen",
                  "value": 9,
                  "darija": "تسعة",
                  "darijaLat": "tes3a"
                },
                {
                  "nl": "tien",
                  "value": 10,
                  "darija": "عشرة",
                  "darijaLat": "3echra"
                },
                {
                  "nl": "elf",
                  "value": 11,
                  "darija": "حداش",
                  "darijaLat": "7dach"
                },
                {
                  "nl": "twaalf",
                  "value": 12,
                  "darija": "طناش",
                  "darijaLat": "tnach"
                },
                {
                  "nl": "dertien",
                  "value": 13,
                  "darija": "تلطاش",
                  "darijaLat": "tltach"
                },
                {
                  "nl": "veertien",
                  "value": 14,
                  "darija": "ربعطاش",
                  "darijaLat": "rbe3tach"
                },
                {
                  "nl": "vijftien",
                  "value": 15,
                  "darija": "خمسطاش",
                  "darijaLat": "khmestach"
                },
                {
                  "nl": "zestien",
                  "value": 16,
                  "darija": "سطاش",
                  "darijaLat": "settach"
                },
                {
                  "nl": "zeventien",
                  "value": 17,
                  "darija": "سبعطاش",
                  "darijaLat": "sbe3tach"
                },
                {
                  "nl": "achttien",
                  "value": 18,
                  "darija": "تمنطاش",
                  "darijaLat": "tmentach"
                },
                {
                  "nl": "negentien",
                  "value": 19,
                  "darija": "تسعطاش",
                  "darijaLat": "tse3tach"
                },
                {
                  "nl": "twintig",
                  "value": 20,
                  "darija": "عشرين",
                  "darijaLat": "3echrin"
                }
              ]
            },
            {
              "id": "0.3.2",
              "title": "Spreekoefening: tel mee (0–20)",
              "titleDarija": "تمرين الكلام: عد معايا",
              "titleDarijaLat": "Tamrin l-klam: 3eddo m3aya",
              "type": "speaking",
              "intro": "Zeg elk getal hardop. Je ziet het cijfer en het woord.",
              "introDarijaLat": "9olo kol ra9m b-sout 3ali. Ghadi tchoufo r-ra9m w l-kelma.",
              "darijaNote": "قولي كل رقم بصوت عالي. غادي تشوفي الرقم والكلمة.",
              "darijaNoteLat": "9olo kol ra9m b-sout 3ali. Ghadi tchoufo r-ra9m w l-kelma.",
              "items": [
                {
                  "nl": "nul",
                  "value": 0,
                  "darija": "زيرو",
                  "darijaLat": "zero"
                },
                {
                  "nl": "een",
                  "value": 1,
                  "darija": "واحد",
                  "darijaLat": "wa7ed"
                },
                {
                  "nl": "twee",
                  "value": 2,
                  "darija": "زوج",
                  "darijaLat": "zouj"
                },
                {
                  "nl": "drie",
                  "value": 3,
                  "darija": "تلاتة",
                  "darijaLat": "tlata"
                },
                {
                  "nl": "vier",
                  "value": 4,
                  "darija": "ربعة",
                  "darijaLat": "reb3a"
                },
                {
                  "nl": "vijf",
                  "value": 5,
                  "darija": "خمسة",
                  "darijaLat": "khamsa"
                },
                {
                  "nl": "zes",
                  "value": 6,
                  "darija": "ستة",
                  "darijaLat": "setta"
                },
                {
                  "nl": "zeven",
                  "value": 7,
                  "darija": "سبعة",
                  "darijaLat": "seb3a"
                },
                {
                  "nl": "acht",
                  "value": 8,
                  "darija": "تمنية",
                  "darijaLat": "tmenya"
                },
                {
                  "nl": "negen",
                  "value": 9,
                  "darija": "تسعة",
                  "darijaLat": "tes3a"
                },
                {
                  "nl": "tien",
                  "value": 10,
                  "darija": "عشرة",
                  "darijaLat": "3echra"
                },
                {
                  "nl": "twaalf",
                  "value": 12,
                  "darija": "طناش",
                  "darijaLat": "tnach"
                },
                {
                  "nl": "vijftien",
                  "value": 15,
                  "darija": "خمسطاش",
                  "darijaLat": "khmestach"
                },
                {
                  "nl": "twintig",
                  "value": 20,
                  "darija": "عشرين",
                  "darijaLat": "3echrin"
                }
              ]
            }
          ]
        },
        {
          "id": "0.4",
          "title": "Vraagwoorden & omgeving",
          "titleDarija": "أدوات الاستفهام والمحيط",
          "titleDarijaLat": "adwat l-istifham w l-mo7it",
          "goal": "De basisvraagwoorden en woorden in en om het huis.",
          "goalDarijaLat": "Kelmat l-as2ila l-asasiya w kelmat f-dar w 7waliha.",
          "icon": "🏠",
          "lessons": [
            {
              "id": "0.4.1",
              "title": "Vraagwoorden",
              "titleDarija": "أدوات الاستفهام",
              "titleDarijaLat": "adwat l-istifham",
              "type": "vocab",
              "intro": "Met deze woorden stel je je eerste vragen.",
              "introDarijaLat": "B-had l-kelmat t9dro tswlo awwel as2ila dyalkom.",
              "items": [
                {
                  "nl": "Wie?",
                  "darija": "شكون؟",
                  "darijaLat": "chkoun?",
                  "example": "Wie ben jij?"
                },
                {
                  "nl": "Wat?",
                  "darija": "شنو؟",
                  "darijaLat": "chno?",
                  "example": "Wat is dat?"
                },
                {
                  "nl": "Waar?",
                  "darija": "فين؟",
                  "darijaLat": "fin?",
                  "example": "Waar woon je?"
                },
                {
                  "nl": "Wanneer?",
                  "darija": "وقتاش؟",
                  "darijaLat": "weqtach?",
                  "example": "Wanneer kom je?"
                },
                {
                  "nl": "Hoe?",
                  "darija": "كيفاش؟",
                  "darijaLat": "kifach?",
                  "example": "Hoe gaat het?"
                },
                {
                  "nl": "Waarom?",
                  "darija": "علاش؟",
                  "darijaLat": "3lach?",
                  "example": "Waarom niet?"
                },
                {
                  "nl": "Hoeveel?",
                  "darija": "شحال؟",
                  "darijaLat": "ch7al?",
                  "example": "Hoeveel kost dit?"
                },
                {
                  "nl": "Welke?",
                  "darija": "أشمن؟",
                  "darijaLat": "achmen?",
                  "example": "Welke bus is dit?"
                }
              ]
            },
            {
              "id": "0.4.2",
              "title": "In en om het huis",
              "titleDarija": "فالدار وحواليها",
              "titleDarijaLat": "F-dar w 7waliha",
              "type": "vocab",
              "intro": "Dingen die je thuis ziet. Let op het lidwoord (de/het).",
              "introDarijaLat": "7wayej lli katban f-dar. Rddo balkom l-de w l-het.",
              "items": [
                {
                  "nl": "tafel",
                  "article": "de",
                  "darija": "الطبلة",
                  "darijaLat": "tebla"
                },
                {
                  "nl": "stoel",
                  "article": "de",
                  "darija": "الكرسي",
                  "darijaLat": "kursi"
                },
                {
                  "nl": "raam",
                  "article": "het",
                  "darija": "الشرجم",
                  "darijaLat": "chergem"
                },
                {
                  "nl": "deur",
                  "article": "de",
                  "darija": "الباب",
                  "darijaLat": "bab"
                },
                {
                  "nl": "bed",
                  "article": "het",
                  "darija": "الفراش / الناموسية",
                  "darijaLat": "ferrash / namousiya"
                },
                {
                  "nl": "lamp",
                  "article": "de",
                  "darija": "اللمبة",
                  "darijaLat": "lamba"
                },
                {
                  "nl": "keuken",
                  "article": "de",
                  "darija": "الكوزينة",
                  "darijaLat": "kuzina"
                },
                {
                  "nl": "bad",
                  "article": "het",
                  "darija": "البانيو",
                  "darijaLat": "lbanyo"
                },
                {
                  "nl": "muur",
                  "article": "de",
                  "darija": "الحيط",
                  "darijaLat": "7it"
                },
                {
                  "nl": "vloer",
                  "article": "de",
                  "darija": "الأرض",
                  "darijaLat": "lard"
                },
                {
                  "nl": "kast",
                  "article": "de",
                  "darija": "الخزانة",
                  "darijaLat": "khzana"
                },
                {
                  "nl": "bank",
                  "article": "de",
                  "darija": "الكنبة",
                  "darijaLat": "kanaba",
                  "tip": "De zetel om op te zitten (niet de geldbank).",
                  "tipDarija": "الكنبة لي كتگلس عليها (ماشي بنك الفلوس).",
                  "tipDarijaLat": "l-knba lli ktgls 3liha (machi bnk l-flous).",
                },
                {
                  "nl": "spiegel",
                  "article": "de",
                  "darija": "المراية",
                  "darijaLat": "mraya"
                },
                {
                  "nl": "koelkast",
                  "article": "de",
                  "darija": "التلاجة",
                  "darijaLat": "tallaja"
                },
                {
                  "nl": "toilet",
                  "article": "het",
                  "darija": "الطواليت",
                  "darijaLat": "twalit"
                },
                {
                  "nl": "bord",
                  "article": "het",
                  "darija": "الطبسيل",
                  "darijaLat": "tebsil"
                },
                {
                  "nl": "lepel",
                  "article": "de",
                  "darija": "المعلقة",
                  "darijaLat": "m3elqa"
                },
                {
                  "nl": "vork",
                  "article": "de",
                  "darija": "الفرشيطة",
                  "darijaLat": "farchita"
                },
                {
                  "nl": "mes",
                  "article": "het",
                  "darija": "الموس",
                  "darijaLat": "mous"
                },
                {
                  "nl": "tas",
                  "article": "de",
                  "darija": "الساك / الشكارة",
                  "darijaLat": "sak",
                  "tip": "Vooral: handtas/zak. In Vlaanderen ook \"een tas koffie\" = een kopje.",
                  "tipDarija": "بالخصوص: صاك/شكارة. فـ فلاندرز حتى «een tas koffie» = كاس قهوة.",
                  "tipDarijaLat": "b-khossous: sak/chkara. f Flandre 7tta \"een tas koffie\" = kas 9hwa.",
                }
              ]
            },
            {
              "id": "0.4.3",
              "title": "Spreekoefening: vragen & voorwerpen",
              "titleDarija": "تمرين الكلام: الأسئلة والأشياء",
              "titleDarijaLat": "Tamrin l-klam: l-as2ila w l-7wayej",
              "type": "speaking",
              "intro": "Zeg de vraagwoorden en de dingen in huis hardop, met het lidwoord (de/het).",
              "introDarijaLat": "9olo kelmat s-so2al w 7wayej d-dar b-sout 3ali, m3a de wlla het.",
              "darijaNote": "قولي كلمات السؤال وحوايج الدار بصوت عالي، ومعاهم de ولا het.",
              "darijaNoteLat": "9olo kelmat s-so2al w 7wayej d-dar b-sout 3ali, w m3ahom de wlla het.",
              "items": [
                {
                  "nl": "Wie?",
                  "darija": "شكون؟",
                  "darijaLat": "chkoun?"
                },
                {
                  "nl": "Wat?",
                  "darija": "شنو؟",
                  "darijaLat": "chno?"
                },
                {
                  "nl": "Waar?",
                  "darija": "فين؟",
                  "darijaLat": "fin?"
                },
                {
                  "nl": "de tafel",
                  "darija": "الطبلة",
                  "darijaLat": "tebla"
                },
                {
                  "nl": "de stoel",
                  "darija": "الكرسي",
                  "darijaLat": "kursi"
                },
                {
                  "nl": "het raam",
                  "darija": "الشرجم",
                  "darijaLat": "chergem"
                },
                {
                  "nl": "de deur",
                  "darija": "الباب",
                  "darijaLat": "bab"
                },
                {
                  "nl": "het bed",
                  "darija": "الفراش / الناموسية",
                  "darijaLat": "ferrash / namousiya"
                }
              ]
            }
          ]
        },
        {
          "id": "0.5",
          "title": "\"Gratis\" woorden",
          "titleDarija": "كلمات \"فابور\"",
          "titleDarijaLat": "Kelmat \"fabor\"",
          "lessons": [
            {
              "id": "0.5.1",
              "title": "Woorden die je al kent!",
              "titleDarija": "كلمات فايت ليك عرفتيهم!",
              "titleDarijaLat": "Kelmat fayt likom 3reftohom!",
              "type": "speaking",
              "intro": "Sommige Nederlandse woorden klinken bijna hetzelfde in het Darija. Dat is makkelijk!",
              "introDarijaLat": "Chi kelmat f-Nederlands kaychbho bezzaf l-Darija. Hadi sahla!",
              "darijaNote": "بعض الكلمات فالهولندية كتشبه للدارجة. هادو ساهلين باش تعقلي عليهم!",
              "darijaNoteLat": "Chi kelmat f-Nederlands kaychbho l-Darija. Hado sahlin bach t3e9lo 3lihom!",
              "items": [
                {
                  "nl": "de banaan",
                  "article": "de",
                  "darija": "البنان",
                  "darijaLat": "lbanan"
                },
                {
                  "nl": "de tomaat",
                  "article": "de",
                  "darija": "مطيشة / طوماطيش",
                  "darijaLat": "mticha / tomatich"
                },
                {
                  "nl": "de taxi",
                  "article": "de",
                  "darija": "الطاكسي",
                  "darijaLat": "ttaxi"
                },
                {
                  "nl": "de suiker",
                  "article": "de",
                  "darija": "السكر",
                  "darijaLat": "ssoukkar"
                },
                {
                  "nl": "de koffie",
                  "article": "de",
                  "darija": "القهوة",
                  "darijaLat": "lqahwa"
                },
                {
                  "nl": "de lamp",
                  "article": "de",
                  "darija": "اللمبة",
                  "darijaLat": "llamba"
                }
              ]
            }
          ]
        },
        {
          "id": "0.6",
          "title": "Overleven in de les",
          "titleDarija": "النجاة فـ الدرس",
          "titleDarijaLat": "N-naja f d-ders",
          "lessons": [
            {
              "id": "0.6.1",
              "title": "Als je het niet begrijpt",
              "titleDarija": "إلى ما فهمتيش",
              "titleDarijaLat": "Ila ma fhemtouch",
              "type": "phrases",
              "intro": "Deze zinnen zijn je redding als je vastloopt.",
              "introDarijaLat": "Had l-jomal ghadi y3awnokom ila t7sselto w ma fhemtouch.",
              "darijaNote": "هاد الجمل غيعاونوك بزاف إلى حصلتي وما فهمتيش شي حاجة.",
              "darijaNoteLat": "Had l-jomal ghadi y3awnokom bezzaf ila t7sselto w ma fhemtouch chi 7aja.",
              "items": [
                {
                  "nl": "Ik begrijp het niet.",
                  "darija": "ما فهمتش.",
                  "darijaLat": "ma fhemtch."
                },
                {
                  "nl": "Wat is dit?",
                  "darija": "شنو هادا؟",
                  "darijaLat": "chno hada?"
                },
                {
                  "nl": "Kunt u dat herhalen?",
                  "darija": "واش ممكن تعاود عافاك؟",
                  "darijaLat": "wach momkin t3awed 3afak?"
                },
                {
                  "nl": "Wat betekent dat?",
                  "darija": "شنو معناها هادي؟",
                  "darijaLat": "chno ma3naha hadi?"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "niveau-1",
      "order": 1,
      "title": "Niveau 1",
      "titleDarija": "المستوى 1",
      "titleDarijaLat": "l-mostawa 1",
      "subtitle": "Eerste communicatie",
      "subtitleDarijaLat": "Awwel tawasol",
      "description": "Jezelf voorstellen, over je familie praten, eenvoudige zinnen maken en boodschappen doen in Gent.",
      "descriptionDarijaLat": "T9eddmo raskom, thdro 3la l-3a2ila, tdiro jomal sahlin w t9daw f-Gent.",
      "cefr": "A1.1",
      "icon": "💬",
      "accent": "saffraan",
      "modules": [
        {
          "id": "1.1",
          "title": "Jezelf voorstellen",
          "titleDarija": "تقدّم راسك",
          "titleDarijaLat": "9eddmo raskom",
          "goal": "Vertellen wie je bent, waar je vandaan komt en waar je woont.",
          "goalDarijaLat": "T9olo chkoun ntooma, mnin jito w fin saknin.",
          "icon": "🙋‍♀️",
          "lessons": [
            {
              "id": "1.1.1",
              "title": "Wie ben ik?",
              "titleDarija": "شكون أنا؟",
              "titleDarijaLat": "Chkoun ana?",
              "type": "phrases",
              "intro": "De zinnen die je nodig hebt om jezelf voor te stellen in Gent.",
              "introDarijaLat": "L-jomal lli kat7tajohom bach t9eddmo raskom f-Gent.",
              "items": [
                {
                  "nl": "Ik ben ...",
                  "darija": "أنا ...",
                  "darijaLat": "ana ..."
                },
                {
                  "nl": "Mijn naam is ...",
                  "darija": "سميتي ...",
                  "darijaLat": "smiti ..."
                },
                {
                  "nl": "Ik kom uit Marokko.",
                  "darija": "أنا من المغرب",
                  "darijaLat": "ana men lmaghrib"
                },
                {
                  "nl": "Ik kom uit ...",
                  "darija": "أنا من ...",
                  "darijaLat": "ana men ..."
                },
                {
                  "nl": "Ik woon in Gent.",
                  "darija": "أنا ساكنة فـ گنت",
                  "darijaLat": "ana sakna f Gent"
                },
                {
                  "nl": "Ik spreek Darija en een beetje Nederlands.",
                  "darija": "نهدر بالدارجة وشوية بالهولندية",
                  "darijaLat": "nhder b darija w chwiya b hollandiya"
                },
                {
                  "nl": "Aangenaam.",
                  "darija": "متشرفة",
                  "darijaLat": "mtcherfa",
                  "tip": "Zeg je als je iemand voor het eerst ontmoet.",
                  "tipDarija": "كتقوليها ملي كتلاقي شي حد لأول مرة.",
                  "tipDarijaLat": "kt9wlyha mlli ktla9y chi 7d l-awel mra.",
                },
                {
                  "nl": "Hoe heet jij?",
                  "darija": "شنو سميتك؟",
                  "darijaLat": "chno smitek?"
                },
                {
                  "nl": "Waar kom jij vandaan?",
                  "darija": "منين نتا؟ / منين نتي؟",
                  "darijaLat": "mnin nta? / mnin nti?"
                },
                {
                  "nl": "Ik ben getrouwd.",
                  "darija": "أنا مزوجة",
                  "darijaLat": "ana mzewja"
                },
                {
                  "nl": "Ik heb twee kinderen.",
                  "darija": "عندي زوج تاع الدراري",
                  "darijaLat": "3andi zouj ta3 drari"
                }
              ]
            },
            {
              "id": "1.1.2",
              "title": "Spreekoefening: stel jezelf voor",
              "titleDarija": "تمرين الكلام: قدّم راسك",
              "titleDarijaLat": "Tamrin l-klam: 9eddmo raskom",
              "type": "speaking",
              "intro": "Spreek de zinnen in. De app controleert eerst de opnamekwaliteit en geeft alleen feedback wanneer de herkenning betrouwbaar genoeg is.",
              "introDarijaLat": "Sejjlo l-jomal b-soutkom. L-app katchekk luwel jawdat t-tasjil, w kat3ti ra2y ghir ila t-ta3arrof 3la s-sout mawto9 bih.",
              "items": [
                {
                  "nl": "Ik ben ...",
                  "answer": "Ik ben ...",
                  "darija": "أنا ...",
                  "darijaLat": "ana ..."
                },
                {
                  "nl": "Ik kom uit ...",
                  "answer": "Ik kom uit ...",
                  "darija": "أنا من ...",
                  "darijaLat": "ana men ..."
                },
                {
                  "nl": "Ik woon in Gent.",
                  "darija": "أنا ساكنة فـ گنت",
                  "darijaLat": "ana sakna f Gent"
                },
                {
                  "nl": "Ik spreek een beetje Nederlands.",
                  "darija": "نهضر شوية بالهولندية",
                  "darijaLat": "nhder chwiya b hollandiya"
                },
                {
                  "nl": "Stel jezelf nu voor in drie zinnen.",
                  "answer": "Ik ben ... Ik kom uit ... Ik woon in Gent.",
                  "darija": "دروك قدمي راسك فـ ثلاث جمل",
                  "darijaLat": "drouk qedmi rassek f tlata d jomal"
                }
              ]
            }
          ]
        },
        {
          "id": "1.2",
          "title": "Familie & gezin",
          "titleDarija": "العائلة",
          "titleDarijaLat": "l-3a2ila",
          "goal": "Praten over je familie en bezit aangeven (mijn, jouw, uw).",
          "goalDarijaLat": "Thdro 3la l-3a2ila w tbeyno l-milkiya (mijn, jouw, uw).",
          "icon": "👨‍👩‍👧‍👦",
          "lessons": [
            {
              "id": "1.2.1",
              "title": "De familieleden",
              "titleDarija": "أفراد العائلة",
              "titleDarijaLat": "afrad l-3a2ila",
              "type": "vocab",
              "intro": "Woordenschat over het gezin.",
              "introDarijaLat": "Kelmat 3la l-3a2ila.",
              "items": [
                {
                  "nl": "man",
                  "article": "de",
                  "darija": "راجل — القمر",
                  "darijaLat": "rajel — lqmer",
                  "tip": "Korte 'a' vs. lange 'aa'",
                  "pair": "maan",
                  "pronunciation": {
                    "focus": "korte a",
                    "acceptedTranscripts": [
                      "man"
                    ],
                    "commonConfusions": [
                      "maan"
                    ],
                    "highlight": "a",
                    "pairHighlight": "aa"
                  }
                },
                {
                  "nl": "vrouw",
                  "article": "de",
                  "darija": "المرا",
                  "darijaLat": "mra"
                },
                {
                  "nl": "kind",
                  "article": "het",
                  "darija": "طفل / طفلة",
                  "darijaLat": "tfel / tfla"
                },
                {
                  "nl": "zoon",
                  "article": "de",
                  "darija": "الولد",
                  "darijaLat": "weld"
                },
                {
                  "nl": "dochter",
                  "article": "de",
                  "darija": "البنت",
                  "darijaLat": "bent"
                },
                {
                  "nl": "broer",
                  "article": "de",
                  "darija": "خو",
                  "darijaLat": "khou"
                },
                {
                  "nl": "zus",
                  "article": "de",
                  "darija": "خت",
                  "darijaLat": "kht"
                },
                {
                  "nl": "moeder",
                  "article": "de",
                  "darija": "مّ / ماما",
                  "darijaLat": "mm / mama"
                },
                {
                  "nl": "vader",
                  "article": "de",
                  "darija": "بّا / بابا",
                  "darijaLat": "bba / baba"
                },
                {
                  "nl": "ouders",
                  "article": "de",
                  "darija": "الوالدين",
                  "darijaLat": "lwalidin",
                  "tip": "Vader én moeder samen (altijd \"de\", meervoud).",
                  "tipDarija": "الوالدين بجوج (ديما «de»، جمع).",
                  "tipDarijaLat": "l-walidin b-jouj (dima \"de\", jam3).",
                },
                {
                  "nl": "oma",
                  "article": "de",
                  "darija": "جدّة",
                  "darijaLat": "jedda",
                  "tip": "grootmoeder",
                  "tipDarija": "الجدّة.",
                  "tipDarijaLat": "l-jda.",
                },
                {
                  "nl": "opa",
                  "article": "de",
                  "darija": "جدّ",
                  "darijaLat": "jedd",
                  "tip": "grootvader",
                  "tipDarija": "الجدّ.",
                  "tipDarijaLat": "l-jd.",
                },
                {
                  "nl": "tante",
                  "article": "de",
                  "darija": "العمة / الخالة",
                  "darijaLat": "3amma / khala",
                  "tip": "In Vlaanderen ook \"matante\".",
                  "tipDarija": "فـ فلاندرز حتى «matante».",
                  "tipDarijaLat": "f Flandre 7tta \"matante\".",
                },
                {
                  "nl": "oom",
                  "article": "de",
                  "darija": "العم / الخال",
                  "darijaLat": "3amm / khal",
                  "tip": "In Vlaanderen zegt men vaak \"nonkel\".",
                  "tipDarija": "فـ فلاندرز كيقولو بزاف «nonkel».",
                  "tipDarijaLat": "f Flandre ki9olo bezzaf \"nonkel\".",
                },
                {
                  "nl": "baby",
                  "article": "de",
                  "darija": "بيبي / رضيع",
                  "darijaLat": "bébé / rdi3"
                }
              ]
            },
            {
              "id": "1.2.2",
              "title": "Bezittelijke voornaamwoorden",
              "titleDarija": "ضمائر الملكية",
              "titleDarijaLat": "dmayr l-mlkya",
              "type": "grammar",
              "intro": "Met \"mijn\", \"jouw\" en \"uw\" laat je zien van wie iets is. \"Uw\" is beleefd (formeel).",
              "introDarijaLat": "B-\"mijn\", \"jouw\" w \"uw\" katbeyno dyal men chi 7aja. \"Uw\" mo2addaba w rasmiya.",
              "darijaNote": "ديالي = mijn، ديالك = jouw، وديالكم = uw أو jullie حسب السياق.",
              "darijaNoteLat": "dyali = mijn, dyalk = jouw, w dyalkom = uw wlla jullie 7sab s-siya9.",
              "items": [
                {
                  "nl": "mijn",
                  "darija": "تاعي",
                  "darijaLat": "ta3i",
                  "example": "mijn broer / mijn kind"
                },
                {
                  "nl": "jouw",
                  "darija": "تاعك",
                  "darijaLat": "ta3ek",
                  "example": "jouw zus / jouw huis"
                },
                {
                  "nl": "uw",
                  "darija": "تاعكم",
                  "darijaLat": "ta3koum",
                  "example": "uw naam (beleefd)"
                },
                {
                  "nl": "Dat is mijn dochter.",
                  "example": "Voorbeeldzin",
                  "darija": "هادي بنتي",
                  "darijaLat": "hadi benti"
                },
                {
                  "nl": "Is dat jouw broer?",
                  "example": "Voorbeeldzin",
                  "darija": "واش هادا خوك؟",
                  "darijaLat": "wach hada khouk?"
                },
                {
                  "nl": "zijn",
                  "darija": "تاعو",
                  "darijaLat": "ta3ou",
                  "example": "zijn vader (van een man)"
                },
                {
                  "nl": "haar",
                  "darija": "تاعها",
                  "darijaLat": "ta3ha",
                  "example": "haar moeder (van een vrouw)"
                },
                {
                  "nl": "ons / onze",
                  "darija": "تاعنا",
                  "darijaLat": "ta3na",
                  "example": "ons huis / onze straat"
                },
                {
                  "nl": "hun",
                  "darija": "تاعهم",
                  "darijaLat": "ta3hom",
                  "example": "hun kinderen"
                }
              ]
            },
            {
              "id": "1.2.3",
              "title": "Spreekoefening: familie",
              "titleDarija": "تمرين الكلام: العائلة",
              "titleDarijaLat": "tamrin l-klam: l-3a2ila",
              "type": "speaking",
              "intro": "Zeg de familieleden hardop, met het lidwoord (de/het).",
              "introDarijaLat": "9olo afrad l-3a2ila b-sout 3ali, m3a de wlla het.",
              "darijaNote": "قولي أفراد العائلة بصوت عالي، ومعاهم de ولا het.",
              "darijaNoteLat": "9olo afrad l-3a2ila b-sout 3ali, w m3ahom de wlla het.",
              "items": [
                {
                  "nl": "de man",
                  "darija": "الراجل",
                  "darijaLat": "rrajel",
                  "article": "de"
                },
                {
                  "nl": "de vrouw",
                  "darija": "المرا",
                  "darijaLat": "lmra",
                  "article": "de"
                },
                {
                  "nl": "het kind",
                  "darija": "الدري / الدرية",
                  "darijaLat": "ddri / ddriya",
                  "article": "het"
                },
                {
                  "nl": "de zoon",
                  "darija": "الولد",
                  "darijaLat": "lweld",
                  "article": "de"
                },
                {
                  "nl": "de dochter",
                  "darija": "البنت",
                  "darijaLat": "lbent",
                  "article": "de"
                },
                {
                  "nl": "de broer",
                  "darija": "خو",
                  "darijaLat": "khou",
                  "article": "de"
                },
                {
                  "nl": "de zus",
                  "darija": "خت",
                  "darijaLat": "kht",
                  "article": "de"
                },
                {
                  "nl": "de moeder",
                  "darija": "ماما",
                  "darijaLat": "mama"
                },
                {
                  "nl": "de vader",
                  "darija": "بابا",
                  "darijaLat": "baba"
                }
              ]
            }
          ]
        },
        {
          "id": "1.3",
          "title": "Basisgrammatica",
          "titleDarija": "قواعد أساسية",
          "titleDarijaLat": "9awa3ed asasiya",
          "goal": "De/het, de tegenwoordige tijd en de werkwoorden \"zijn\" en \"hebben\".",
          "goalDarijaLat": "De/het, l-7ader w l-af3al \"zijn\" w \"hebben\".",
          "icon": "📘",
          "lessons": [
            {
              "id": "1.3.1",
              "title": "DE of HET?",
              "titleDarija": "DE ولا HET؟",
              "titleDarijaLat": "DE wlla HET?",
              "type": "grammar",
              "intro": "Elk zelfstandig naamwoord heeft \"de\" of \"het\". Handige regels: mensen zijn (bijna) altijd \"de\", een meervoud is ALTIJD \"de\", en een verkleinwoord (-je) is ALTIJD \"het\".",
              "introDarijaLat": "Kol ism 3ndo \"de\" wlla \"het\". 9awa3ed mofida: n-nas ta9riban dima \"de\", l-jam3 dima \"de\", w t-tsghir b -je dima \"het\".",
              "darijaNote": "ما كايناش قاعدة كاملة، خاصك تحفظي الكلمات. ولكن الجمع ديما كياخد de، والتصغير بـ -je ديما كياخد het.",
              "darijaNoteLat": "Ma kaynach 9a3da kamla; khasskom t7efdo l-kelmat. Walakin l-jam3 dima kayakhod de, w t-tsghir b -je kayakhod het dima.",
              "items": [
                {
                  "nl": "de man",
                  "article": "de",
                  "tip": "Persoon → de.",
                  "darija": "الراجل",
                  "darijaLat": "rrajel",
                  "tipDarija": "شخص → de.",
                  "tipDarijaLat": "chekhs → de.",
                },
                {
                  "nl": "de vrouw",
                  "article": "de",
                  "tip": "Persoon → de.",
                  "darija": "المرا",
                  "darijaLat": "lmra",
                  "tipDarija": "شخص → de.",
                  "tipDarijaLat": "chekhs → de.",
                },
                {
                  "nl": "het kind",
                  "article": "het",
                  "tip": "Uitzondering: onzijdig.",
                  "darija": "الدري / الدرية",
                  "darijaLat": "ddri / ddriya",
                  "tipDarija": "استثناء: محايد (het).",
                  "tipDarijaLat": "asttna2: m7ayed (het).",
                },
                {
                  "nl": "de kinderen",
                  "article": "de",
                  "tip": "Meervoud → altijd de.",
                  "darija": "الدراري",
                  "darijaLat": "ddrari",
                  "tipDarija": "جمع → ديما de.",
                  "tipDarijaLat": "jam3 → dima de.",
                },
                {
                  "nl": "het tafeltje",
                  "article": "het",
                  "tip": "Verkleinwoord (-je) → altijd het.",
                  "darija": "طابلة صغيرة",
                  "darijaLat": "tabla sghira",
                  "tipDarija": "تصغير (-je) → ديما het.",
                  "tipDarijaLat": "tsghyr (-je) → dima het.",
                },
                {
                  "nl": "het huis",
                  "article": "het",
                  "darija": "الدار",
                  "darijaLat": "ddar"
                },
                {
                  "nl": "de straat",
                  "article": "de",
                  "darija": "الزنقة",
                  "darijaLat": "zznqa"
                },
                {
                  "nl": "het meisje",
                  "article": "het",
                  "tip": "Let op: een persoon, maar toch \"het\" (uitzondering).",
                  "darija": "البنت",
                  "darijaLat": "lbent",
                  "tipDarija": "رد بالك: شخص، ولكن «het» (استثناء).",
                  "tipDarijaLat": "rd balk: chkhs, walakin \"het\" (asttna2).",
                },
                {
                  "nl": "de stad",
                  "article": "de",
                  "tip": "Gent is een stad.",
                  "darija": "المدينة",
                  "darijaLat": "lmdina",
                  "tipDarija": "غنت مدينة.",
                  "tipDarijaLat": "Gent mdyna.",
                },
                {
                  "nl": "het land",
                  "article": "het",
                  "darija": "البلاد",
                  "darijaLat": "lblad"
                },
                {
                  "nl": "de auto",
                  "article": "de",
                  "darija": "الطوموبيل",
                  "darijaLat": "ttomobil"
                },
                {
                  "nl": "het water",
                  "article": "het",
                  "darija": "الما",
                  "darijaLat": "lma"
                },
                {
                  "nl": "de fiets",
                  "article": "de",
                  "tip": "Heel belangrijk in Gent!",
                  "darija": "البيسكليت",
                  "darijaLat": "lbisiklet",
                  "tipDarija": "مهمة بزاف فـ غنت!",
                  "tipDarijaLat": "mohima bezzaf f Gent!",
                },
                {
                  "nl": "het geld",
                  "article": "het",
                  "darija": "الفلوس",
                  "darijaLat": "lflous"
                },
                {
                  "nl": "de winkel",
                  "article": "de",
                  "darija": "الحانوت",
                  "darijaLat": "l7anout"
                }
              ]
            },
            {
              "id": "1.3.2",
              "title": "Tegenwoordige tijd (stam + t)",
              "titleDarija": "الحاضر (الجذر + t)",
              "titleDarijaLat": "l-7ader (j-jder + t)",
              "type": "grammar",
              "intro": "Regel: ik = stam. jij/hij/zij = stam + t. wij/jullie/zij (mv) = hele werkwoord. Voorbeeld met \"wonen\" (stam = woon).",
              "introDarijaLat": "L-9a3da: ik = j-jder. jij/hij/zij = j-jder + t. wij/jullie/zij (jam3) = l-fi3l kamel. Mital b-\"wonen\" (j-jder = woon).",
              "items": [
                {
                  "nl": "ik woon",
                  "darijaLat": "nskon",
                  "darija": "نسكن"
                },
                {
                  "nl": "jij woont",
                  "tip": "stam + t",
                  "darija": "نتا تسكن / نتي تسكني",
                  "darijaLat": "nta tskon / nti tskoni",
                  "tipDarija": "الجذر + t.",
                  "tipDarijaLat": "j-jder + t.",
                },
                {
                  "nl": "hij/zij woont",
                  "tip": "stam + t",
                  "darija": "هو يسكن / هي تسكن",
                  "darijaLat": "houwa yskon / hiya tskon",
                  "tipDarija": "الجذر + t.",
                  "tipDarijaLat": "j-jder + t.",
                },
                {
                  "nl": "wij wonen",
                  "tip": "hele werkwoord",
                  "darija": "حنا نسكنو",
                  "darijaLat": "7na nskno",
                  "tipDarija": "الفعل كامل.",
                  "tipDarijaLat": "l-fi3l kaml.",
                },
                {
                  "nl": "ik werk / jij werkt",
                  "darijaLat": "nkhdem / tkhdem, tkhdmi",
                  "darija": "نخدم / تخدم، تخدمي"
                },
                {
                  "nl": "ik heet / jij heet",
                  "tip": "stam eindigt al op t → geen dubbele t",
                  "darijaLat": "smiti… / smitek…",
                  "darija": "سميتي… / سميتك…",
                  "tipDarija": "الجذر كيسالي بـ t → ما كنزيدوش t خرى.",
                  "tipDarijaLat": "j-jder kisali b t → ma kanzidouch t khra.",
                },
                {
                  "nl": "ik spreek / jij spreekt",
                  "darijaLat": "nhder / thder, thdri",
                  "darija": "نهضر / تهضر، تهضري"
                },
                {
                  "nl": "ik kom / jij komt",
                  "darijaLat": "nji / tji",
                  "darija": "نجي / تجي"
                },
                {
                  "nl": "ik eet / jij eet",
                  "tip": "stam eindigt op t → geen dubbele t",
                  "darijaLat": "nakel / takel, takli",
                  "darija": "ناكل / تاكل، تاكلي",
                  "tipDarija": "الجذر كيسالي بـ t → ما كنزيدوش t خرى.",
                  "tipDarijaLat": "j-jder kisali b t → ma kanzidouch t khra.",
                },
                {
                  "nl": "ik leer / jij leert",
                  "darijaLat": "nt3ellem / t3ellem, t3elmi",
                  "darija": "نتعلم / تتعلم، تتعلمي"
                },
                {
                  "nl": "ik maak / jij maakt",
                  "darijaLat": "ndir / tdir, tdiri",
                  "darija": "ندير / تدير، تديري"
                }
              ]
            },
            {
              "id": "1.3.3",
              "title": "Onregelmatig: zijn & hebben",
              "titleDarija": "الشاذّ: zijn و hebben",
              "titleDarijaLat": "Chawad: zijn w hebben",
              "type": "grammar",
              "intro": "Deze twee werkwoorden zijn onregelmatig en heel belangrijk. Leer ze uit het hoofd.",
              "introDarijaLat": "Had jouj af3al chawad w mohimin bezzaf. 7efdohom mezyan.",
              "darijaNote": "Mohim: f Darija ma kanst3mloch fi3l zijn f l7ader b7al Nederlands. Matal: ik ben ... = ana ... W fi3l hebben kan3ebro 3lih b 3and.",
              "darijaNoteLat": "Mohim: f Darija ma kanst3mloch fi3l zijn f l7ader b7al Nederlands. Matal: ik ben ... = ana ... W fi3l hebben kan3ebro 3lih b 3and.",
              "items": [
                {
                  "nl": "ik ben",
                  "darija": "أنا",
                  "darijaLat": "ana"
                },
                {
                  "nl": "jij bent",
                  "darijaLat": "nta / nti",
                  "darija": "نتا / نتي"
                },
                {
                  "nl": "hij/zij is",
                  "darijaLat": "houwa / hiya",
                  "darija": "هو / هي"
                },
                {
                  "nl": "wij zijn",
                  "darijaLat": "7na",
                  "darija": "حنا"
                },
                {
                  "nl": "ik heb",
                  "darija": "عندي",
                  "darijaLat": "3andi"
                },
                {
                  "nl": "jij hebt",
                  "darija": "عندك",
                  "darijaLat": "3andek"
                },
                {
                  "nl": "hij/zij heeft",
                  "darija": "عندو / عندها",
                  "darijaLat": "3andou / 3andha"
                },
                {
                  "nl": "wij hebben",
                  "darija": "عندنا",
                  "darijaLat": "3andna"
                },
                {
                  "nl": "jullie zijn",
                  "darijaLat": "ntouma",
                  "darija": "نتوما"
                },
                {
                  "nl": "zij zijn",
                  "darijaLat": "houma",
                  "darija": "هوما"
                },
                {
                  "nl": "jullie hebben",
                  "darija": "عندكم",
                  "darijaLat": "3andkom"
                },
                {
                  "nl": "zij hebben",
                  "darija": "عندهم",
                  "darijaLat": "3andhom"
                }
              ]
            },
            {
              "id": "1.3.4",
              "title": "Spreekoefening: zijn & hebben",
              "titleDarija": "تمرين الكلام: كون وعند",
              "titleDarijaLat": "Tamrin l-klam: koun w 3and",
              "type": "speaking",
              "intro": "Zeg de vormen van \"zijn\" en \"hebben\" hardop.",
              "introDarijaLat": "9olo tasrifat \"zijn\" w \"hebben\" b-sout 3ali.",
              "darijaNote": "قولي تصريفات الفعلين zijn وhebben بصوت عالي.",
              "darijaNoteLat": "9olo tasrifat l-fi3layn zijn w hebben b-sout 3ali.",
              "items": [
                {
                  "nl": "ik ben",
                  "darija": "أنا",
                  "darijaLat": "ana"
                },
                {
                  "nl": "jij bent",
                  "darijaLat": "nta / nti",
                  "darija": "نتا / نتي"
                },
                {
                  "nl": "hij is",
                  "darijaLat": "houwa",
                  "darija": "هو"
                },
                {
                  "nl": "wij zijn",
                  "darijaLat": "7na",
                  "darija": "حنا"
                },
                {
                  "nl": "ik heb",
                  "darija": "عندي",
                  "darijaLat": "3andi"
                },
                {
                  "nl": "jij hebt",
                  "darija": "عندك",
                  "darijaLat": "3andek"
                },
                {
                  "nl": "hij heeft",
                  "darija": "عندو",
                  "darijaLat": "3andou"
                },
                {
                  "nl": "wij hebben",
                  "darija": "عندنا",
                  "darijaLat": "3andna"
                }
              ]
            }
          ]
        },
        {
          "id": "1.4",
          "title": "Vragen stellen & boodschappen",
          "titleDarija": "طرح الأسئلة والتسوّق",
          "titleDarijaLat": "Tsawlo w tsow9o",
          "goal": "Vragen maken met inversie, tellen tot 100 en boodschappen doen.",
          "goalDarijaLat": "Tsaybo as2ila b-9elb t-tertib, t3eddo 7tta 100 w t9daw.",
          "icon": "🛒",
          "lessons": [
            {
              "id": "1.4.1",
              "title": "Vragen met inversie",
              "titleDarija": "الأسئلة بقلب الترتيب",
              "titleDarijaLat": "L-as2ila b-9elb t-tertib",
              "type": "grammar",
              "intro": "Voor een ja/nee-vraag wissel je het werkwoord en het onderwerp om. \"Jij woont\" → \"Woon jij?\"",
              "introDarijaLat": "F-so2al dyal iyyeh/la, kat9elbo l-fi3l w l-fa3el: \"Jij woont\" katwlli \"Woon jij?\"",
              "darijaNote": "باش تسولي سؤال، كتبدلي بلاصة الفعل والفاعل: jij woont كتولي woon jij?",
              "darijaNoteLat": "Bach tswlo so2al, katbeddlo blassa l-fi3l w l-fa3el: jij woont katwlli woon jij?",
              "items": [
                {
                  "nl": "Woon jij in Gent?",
                  "example": "van: jij woont in Gent",
                  "darija": "واش نتا تسكن فـ گنت؟ / واش نتي تسكني فـ گنت؟",
                  "darijaLat": "wach nta tskon f Gent? / wach nti tskoni f Gent?"
                },
                {
                  "nl": "Spreek jij Nederlands?",
                  "example": "van: jij spreekt Nederlands",
                  "darija": "واش نتا تهضر بالهولندية؟ / واش نتي تهضري بالهولندية؟",
                  "darijaLat": "wach nta thder b hollandiya? / wach nti thdri b hollandiya?"
                },
                {
                  "nl": "Heb jij kinderen?",
                  "example": "van: jij hebt kinderen",
                  "darija": "واش عندك الدراري؟",
                  "darijaLat": "wach 3andek ddrari?"
                },
                {
                  "nl": "Kom jij uit Marokko?",
                  "example": "van: jij komt uit Marokko",
                  "darija": "واش نتا من المغرب؟ / واش نتي من المغرب؟",
                  "darijaLat": "wach nta men lmaghrib? / wach nti men lmaghrib?"
                },
                {
                  "nl": "Werk jij in Gent?",
                  "example": "van: jij werkt in Gent",
                  "darija": "واش نتا تخدم فـ گنت؟ / واش نتي تخدمي فـ گنت؟",
                  "darijaLat": "wach nta tkhdem f Gent? / wach nti tkhdmi f Gent?"
                },
                {
                  "nl": "Kom jij uit Marokko?",
                  "example": "van: jij komt uit Marokko",
                  "darija": "واش نتا من المغرب؟ / واش نتي من المغرب؟",
                  "darijaLat": "wach nta men lmaghrib? / wach nti men lmaghrib?"
                },
                {
                  "nl": "Versta jij mij?",
                  "example": "van: jij verstaat mij",
                  "tip": "In Vlaanderen: \"verstaan\" = begrijpen.",
                  "darija": "واش نتا تفهمني؟ / واش نتي تفهميني؟",
                  "darijaLat": "wach nta tfhemni? / wach nti tfhemini?",
                  "tipDarija": "فـ فلاندرز «verstaan» = تفهم.",
                  "tipDarijaLat": "f Flandre \"verstaan\" = tfhm.",
                },
                {
                  "nl": "Heb jij tijd?",
                  "example": "van: jij hebt tijd",
                  "darija": "واش عندك الوقت؟",
                  "darijaLat": "wach 3andek lweqt?"
                }
              ]
            },
            {
              "id": "1.4.2",
              "title": "Getallen 20–100",
              "titleDarija": "الأرقام 20–100",
              "titleDarijaLat": "l-ar9am 20–100",
              "type": "numbers",
              "intro": "Let op de volgorde: eerst het eenheidsgetal, dan \"en\", dan het tiental. \"eenentwintig\" = 1 + en + 20.",
              "introDarijaLat": "Rddo balkom t-tertib: luwel ra9m l-wa7dat, men be3d \"en\", w men be3d l-3acharat. \"eenentwintig\" = 1 + en + 20.",
              "items": [
                {
                  "nl": "twintig",
                  "value": 20,
                  "darija": "عشرين",
                  "darijaLat": "3echrin"
                },
                {
                  "nl": "eenentwintig",
                  "value": 21,
                  "tip": "een + en + twintig",
                  "darija": "واحد وعشرين",
                  "darijaLat": "wa7ed w 3echrin",
                  "tipDarija": "een + en + twintig.",
                  "tipDarijaLat": "een + en + twintig.",
                },
                {
                  "nl": "dertig",
                  "value": 30,
                  "darija": "ثلاثين",
                  "darijaLat": "tlatin"
                },
                {
                  "nl": "veertig",
                  "value": 40,
                  "darija": "أربعين",
                  "darijaLat": "reb3in"
                },
                {
                  "nl": "vijftig",
                  "value": 50,
                  "darija": "خمسين",
                  "darijaLat": "khamsin"
                },
                {
                  "nl": "zestig",
                  "value": 60,
                  "darija": "ستين",
                  "darijaLat": "settin"
                },
                {
                  "nl": "zeventig",
                  "value": 70,
                  "darija": "سبعين",
                  "darijaLat": "seb3in"
                },
                {
                  "nl": "tachtig",
                  "value": 80,
                  "tip": "Let op: begint met \"t\".",
                  "darija": "ثمانين",
                  "darijaLat": "tmanin",
                  "tipDarija": "رد بالك: كتبدا بـ «t».",
                  "tipDarijaLat": "rd balk: ktbda b \"t\".",
                },
                {
                  "nl": "negentig",
                  "value": 90,
                  "darija": "تسعين",
                  "darijaLat": "tes3in"
                },
                {
                  "nl": "honderd",
                  "value": 100,
                  "darija": "مية",
                  "darijaLat": "mya"
                },
                {
                  "nl": "vijfentwintig",
                  "value": 25,
                  "tip": "vijf + en + twintig",
                  "darija": "خمسة وعشرين",
                  "darijaLat": "khamsa w 3echrin",
                  "tipDarija": "vijf + en + twintig.",
                  "tipDarijaLat": "vijf + en + twintig.",
                },
                {
                  "nl": "drieëndertig",
                  "value": 33,
                  "tip": "drie + en + dertig",
                  "darija": "ثلاثة وثلاثين",
                  "darijaLat": "tlata w tlatin",
                  "tipDarija": "drie + en + dertig.",
                  "tipDarijaLat": "drie + en + dertig.",
                },
                {
                  "nl": "achtenveertig",
                  "value": 48,
                  "darija": "ثمانية وأربعين",
                  "darijaLat": "tmnya w reb3in"
                },
                {
                  "nl": "negenennegentig",
                  "value": 99,
                  "darija": "تسعة وتسعين",
                  "darijaLat": "tes3a w tes3in"
                },
                {
                  "nl": "duizend",
                  "value": 1000,
                  "darija": "ألف",
                  "darijaLat": "alf"
                }
              ]
            },
            {
              "id": "1.4.3",
              "title": "Bij de winkel & de bakker",
              "titleDarija": "فالحانوت وعند الخبّاز",
              "titleDarijaLat": "F-l7anout w 3and l-khabbaz",
              "type": "phrases",
              "intro": "Zinnen die je meteen kunt gebruiken bij de bakker of in de winkel in Gent.",
              "introDarijaLat": "Jomal t9dro tsta3mlohom daba 3and l-khabbaz wlla f-l7anout f-Gent.",
              "items": [
                {
                  "nl": "Hoeveel kost dit?",
                  "darija": "بشحال هادا؟",
                  "darijaLat": "bch7al hada?"
                },
                {
                  "nl": "Ik wil graag een brood.",
                  "darija": "بغيت خبزة عافاك",
                  "darijaLat": "bghit khobza 3afak"
                },
                {
                  "nl": "Mag ik een koffie?",
                  "darija": "ممكن قهوة عافاك؟",
                  "darijaLat": "momkin qahwa 3afak?"
                },
                {
                  "nl": "Dat is te duur.",
                  "darija": "هادا غالي بزاف",
                  "darijaLat": "hada ghali bezzaf"
                },
                {
                  "nl": "Heeft u wisselgeld?",
                  "darija": "واش عندك الصرف؟",
                  "darijaLat": "wach 3andek sserf?"
                },
                {
                  "nl": "Alleen dit, dank u.",
                  "darija": "غير هادا، شكرا",
                  "darijaLat": "ghir hada, choukran"
                },
                {
                  "nl": "Ik zoek melk.",
                  "darija": "نقلب على الحليب",
                  "darijaLat": "nqelleb 3la l7lib"
                },
                {
                  "nl": "Waar is de kassa?",
                  "darija": "فين الكاصة؟",
                  "darijaLat": "fin lkassa?"
                },
                {
                  "nl": "Mag ik betalen?",
                  "darija": "نقدر نخلص؟",
                  "darijaLat": "nqder nkhelles?"
                },
                {
                  "nl": "Met de kaart, alstublieft.",
                  "darija": "بالكارطة عافاك",
                  "darijaLat": "b lkarta 3afak"
                },
                {
                  "nl": "Een zakje, alstublieft.",
                  "darija": "ساشي عافاك.",
                  "darijaLat": "sachi 3afak."
                },
                {
                  "nl": "Bedankt, tot ziens.",
                  "darija": "شكرا، بسلامة",
                  "darijaLat": "choukran, bslama"
                },
                {
                  "nl": "Bancontact",
                  "darija": "بانكونتاكت",
                  "darijaLat": "Bancontact",
                  "tip": "Betalen met je bankkaart — heel gewoon in België.",
                  "tipDarija": "الخلاص بالكارطة البانكية — عادي بزاف فبلجيكا.",
                  "tipDarijaLat": "l-khlas b-l-karta l-bankya — 3adi bezzaf f-Beljika.",
                },
                {
                  "nl": "de bankkaart",
                  "article": "de",
                  "darija": "الكارطة البانكية",
                  "darijaLat": "lkarta lbankiya"
                },
                {
                  "nl": "Kan ik met de kaart betalen?",
                  "answer": "Kan ik met de kaart betalen?",
                  "darija": "واش نقدر نخلّص بالكارطة؟",
                  "darijaLat": "wach nqder nkhelles b lkarta?"
                }
              ]
            },
            {
              "id": "1.4.4",
              "title": "Spreekoefening: bij de bakker",
              "titleDarija": "تمرين الكلام: عند الخبّاز",
              "titleDarijaLat": "tamrin l-klam: 3nd l-khabbaz",
              "type": "speaking",
              "intro": "Oefen hardop de zinnen die je bij de bakker of in de winkel gebruikt.",
              "introDarijaLat": "Tmerrno b-sout 3ali 3la l-jomal lli katsta3mlo 3and l-khabbaz wlla f-l7anout.",
              "items": [
                {
                  "nl": "Goedemorgen, mag ik een brood?",
                  "darija": "صباح الخير، ممكن خبزة عافاك؟",
                  "darijaLat": "sba7 lkhir, momkin khobza 3afak?"
                },
                {
                  "nl": "Hoeveel kost dit?",
                  "darija": "بشحال هادا؟",
                  "darijaLat": "bch7al hada?"
                },
                {
                  "nl": "Ik betaal met de kaart.",
                  "darija": "غادي نخلص بالكارطة",
                  "darijaLat": "ghadi nkhelles b lkarta"
                },
                {
                  "nl": "Dank u wel, tot ziens.",
                  "darija": "شكرا بزاف، بسلامة",
                  "darijaLat": "choukran bezzaf, bslama"
                }
              ]
            }
          ]
        },
        {
          "id": "1.5",
          "title": "Tijd: dagen, maanden & de klok",
          "titleDarija": "الوقت: الأيام، الشهور والساعة",
          "titleDarijaLat": "L-we9t: l-iyam, ch-chhor w s-sa3a",
          "goal": "De dagen, de maanden en de klok begrijpen en zeggen.",
          "goalDarijaLat": "Tfahmo w t9olo l-iyam, ch-chhor w s-sa3a.",
          "icon": "🕒",
          "lessons": [
            {
              "id": "1.5.1",
              "title": "De dagen van de week",
              "titleDarija": "أيام الأسبوع",
              "titleDarijaLat": "Iyam s-simana",
              "type": "vocab",
              "intro": "De zeven dagen, plus vandaag, morgen en gisteren.",
              "introDarijaLat": "Sb3a dyal l-iyam, m3a l-youm, ghedda w l-bare7.",
              "items": [
                {
                  "nl": "maandag",
                  "darija": "الاثنين",
                  "darijaLat": "letnin"
                },
                {
                  "nl": "dinsdag",
                  "darija": "التلاتة",
                  "darijaLat": "ttlat"
                },
                {
                  "nl": "woensdag",
                  "darija": "لاربعا",
                  "darijaLat": "larb3"
                },
                {
                  "nl": "donderdag",
                  "darija": "الخميس",
                  "darijaLat": "lekhmis"
                },
                {
                  "nl": "vrijdag",
                  "darija": "الجمعة",
                  "darijaLat": "jjem3a"
                },
                {
                  "nl": "zaterdag",
                  "darija": "السبت",
                  "darijaLat": "ssebt"
                },
                {
                  "nl": "zondag",
                  "darija": "لحد",
                  "darijaLat": "l7edd"
                },
                {
                  "nl": "vandaag",
                  "darija": "اليوم",
                  "darijaLat": "lyoum"
                },
                {
                  "nl": "morgen",
                  "darija": "غدوة",
                  "darijaLat": "ghodwa"
                },
                {
                  "nl": "gisteren",
                  "darija": "البارح",
                  "darijaLat": "lbare7"
                }
              ]
            },
            {
              "id": "1.5.2",
              "title": "De maanden",
              "titleDarija": "الشهور",
              "titleDarijaLat": "ch-chhor",
              "type": "vocab",
              "intro": "De twaalf maanden van het jaar.",
              "introDarijaLat": "Tnach ch-har dyal l-3am.",
              "items": [
                {
                  "nl": "januari",
                  "darija": "يناير",
                  "darijaLat": "yanayer"
                },
                {
                  "nl": "februari",
                  "darija": "فبراير",
                  "darijaLat": "febrayer"
                },
                {
                  "nl": "maart",
                  "darija": "مارس",
                  "darijaLat": "mars"
                },
                {
                  "nl": "april",
                  "darija": "أبريل",
                  "darijaLat": "abril"
                },
                {
                  "nl": "mei",
                  "darija": "ماي",
                  "darijaLat": "may"
                },
                {
                  "nl": "juni",
                  "darija": "يونيو",
                  "darijaLat": "younyou"
                },
                {
                  "nl": "juli",
                  "darija": "يوليوز",
                  "darijaLat": "youlyouz"
                },
                {
                  "nl": "augustus",
                  "darija": "غشت",
                  "darijaLat": "ghocht"
                },
                {
                  "nl": "september",
                  "darija": "شتنبر",
                  "darijaLat": "chtanber"
                },
                {
                  "nl": "oktober",
                  "darija": "أكتوبر",
                  "darijaLat": "oktobar"
                },
                {
                  "nl": "november",
                  "darija": "نونبر",
                  "darijaLat": "nonber"
                },
                {
                  "nl": "december",
                  "darija": "دجنبر",
                  "darijaLat": "djanber"
                }
              ]
            },
            {
              "id": "1.5.3",
              "title": "Hoe laat is het?",
              "titleDarija": "شحال فالساعة؟",
              "titleDarijaLat": "Ch7al f-sa3a?",
              "type": "phrases",
              "intro": "Vragen en zeggen hoe laat het is, en de delen van de dag.",
              "introDarijaLat": "Tswlo w t9olo ch7al f-sa3a, w t3erfo aw9at n-nhar.",
              "items": [
                {
                  "nl": "Hoe laat is het?",
                  "darija": "شحال فالساعة؟",
                  "darijaLat": "ch7al f sa3a?"
                },
                {
                  "nl": "Het is één uur.",
                  "darija": "الساعة الوحدة",
                  "darijaLat": "sa3a lwe7da"
                },
                {
                  "nl": "Het is half drie.",
                  "darija": "الساعة الزوج ونص",
                  "darijaLat": "sa3a zouj w ness",
                  "tip": "Half drie = 2u30 (halfweg naar drie).",
                  "tipDarija": "«Half drie» = 2:30 (نص الطريق ل3).",
                  "tipDarijaLat": "\"Half drie\" = 2:30 (ns l-try9 l3).",
                },
                {
                  "nl": "Het is kwart over drie.",
                  "darija": "الساعة تلاتة والربع",
                  "darijaLat": "sa3a tlata w rbe3"
                },
                {
                  "nl": "Het is kwart voor vijf.",
                  "darija": "الساعة خمسة غير الربع",
                  "darijaLat": "sa3a khamsa ghir rbe3"
                },
                {
                  "nl": "Het is tien uur.",
                  "darija": "الساعة عشرة",
                  "darijaLat": "sa3a 3echra"
                },
                {
                  "nl": "de ochtend",
                  "darija": "الصباح",
                  "darijaLat": "sba7"
                },
                {
                  "nl": "de middag",
                  "darija": "الظهر",
                  "darijaLat": "dhor"
                },
                {
                  "nl": "de avond",
                  "darija": "العشية",
                  "darijaLat": "l3chiya"
                },
                {
                  "nl": "de nacht",
                  "darija": "الليل",
                  "darijaLat": "llil"
                },
                {
                  "nl": "nu",
                  "darija": "دروك",
                  "darijaLat": "drouk"
                },
                {
                  "nl": "straks",
                  "darija": "من بعد",
                  "darijaLat": "men be3d"
                }
              ]
            },
            {
              "id": "1.5.4",
              "title": "Spreekoefening: dagen & tijd",
              "titleDarija": "تمرين الكلام: الأيام والوقت",
              "titleDarijaLat": "tamrin l-klam: alayam w l-we9t",
              "type": "speaking",
              "intro": "Zeg de dagen en enkele tijdswoorden hardop.",
              "introDarijaLat": "9olo l-iyam w chi kelmat dyal l-we9t b-sout 3ali.",
              "items": [
                {
                  "nl": "maandag",
                  "darija": "الاثنين",
                  "darijaLat": "letnin"
                },
                {
                  "nl": "vrijdag",
                  "darija": "الجمعة",
                  "darijaLat": "jjem3a"
                },
                {
                  "nl": "zondag",
                  "darija": "لحد",
                  "darijaLat": "l7edd"
                },
                {
                  "nl": "vandaag",
                  "darija": "اليوم",
                  "darijaLat": "lyoum"
                },
                {
                  "nl": "morgen",
                  "darija": "غدوة",
                  "darijaLat": "ghodwa"
                },
                {
                  "nl": "Hoe laat is het?",
                  "darija": "شحال فالساعة؟",
                  "darijaLat": "ch7al f sa3a?"
                }
              ]
            }
          ]
        },
        {
          "id": "1.6",
          "title": "Onderweg in Gent",
          "titleDarija": "فالطريق فـ گنت",
          "titleDarijaLat": "F-ttri9 f-Gent",
          "goal": "Het openbaar vervoer gebruiken en de weg vragen in Gent.",
          "goalDarijaLat": "Tsta3mlo n-na9l l-3omomi w tswlo 3la t-tri9 f-Gent.",
          "icon": "🚋",
          "lessons": [
            {
              "id": "1.6.1",
              "title": "Vervoer & tickets",
              "titleDarija": "النقل والتيكيات",
              "titleDarijaLat": "n-na9l w t-tikiyat",
              "type": "phrases",
              "intro": "Woorden en zinnen voor de tram, de bus en het station.",
              "introDarijaLat": "Kelmat w jomal dyal t-tram, t-tobis w l-ma7atta.",
              "items": [
                {
                  "nl": "de tram",
                  "darija": "الطرام",
                  "darijaLat": "tram"
                },
                {
                  "nl": "de bus",
                  "darija": "الطوبيس",
                  "darijaLat": "ttobis"
                },
                {
                  "nl": "de trein",
                  "darija": "التران",
                  "darijaLat": "tran"
                },
                {
                  "nl": "het station",
                  "darija": "محطة القطار / لاگار",
                  "darijaLat": "ma7tat lqtar / la gare"
                },
                {
                  "nl": "de halte",
                  "darija": "لاري",
                  "darijaLat": "lari"
                },
                {
                  "nl": "het ticket",
                  "darija": "التيكي",
                  "darijaLat": "ttiki"
                },
                {
                  "nl": "Waar is de halte?",
                  "darija": "فين لاري؟",
                  "darijaLat": "fin lari?"
                },
                {
                  "nl": "Een ticket, alstublieft.",
                  "darija": "تيكي عافاك",
                  "darijaLat": "tiki 3afak"
                },
                {
                  "nl": "Hoeveel kost een ticket?",
                  "darija": "بشحال التيكي؟",
                  "darijaLat": "bch7al tiki?"
                },
                {
                  "nl": "De Lijn",
                  "darija": "دي لاين",
                  "darijaLat": "De Lijn",
                  "tip": "De Vlaamse bus- en tram­maatschappij.",
                  "tipDarija": "شركة الطوبيسات والطرام الفلامنكية.",
                  "tipDarijaLat": "chrka t-tobissat waltram l-flamnkya.",
                },
                {
                  "nl": "overstappen",
                  "darija": "نبدّل",
                  "darijaLat": "nbeddel",
                  "tip": "Van de ene bus/tram op de andere.",
                  "tipDarija": "من طوبيس/طرام لواحد آخر.",
                  "tipDarijaLat": "men tobis/tram l-wa7ed akhor.",
                },
                {
                  "nl": "de kaart opladen",
                  "darija": "نعمّر الكارطة",
                  "darijaLat": "n3ammer lkarta"
                },
                {
                  "nl": "het fietspad",
                  "article": "het",
                  "darija": "طريق البشكليط",
                  "darijaLat": "triq lbeshklit",
                  "tip": "Fietsen is heel handig in Gent.",
                  "tipDarija": "البشكليط مفيد بزاف فـ غنت.",
                  "tipDarijaLat": "l-bisklit mfyd bezzaf f Gent.",
                },
                {
                  "nl": "lek (band)",
                  "darija": "مثقوب",
                  "darijaLat": "mtqoub"
                },
                {
                  "nl": "gestolen",
                  "darija": "تسرق",
                  "darijaLat": "tsreq",
                  "tip": "Bv. 'Mijn fiets is gestolen.'",
                  "tipDarija": "مثلا: «البشكليط ديالي تسرق».",
                  "tipDarijaLat": "matalan: \"l-bisklit dyali tsr9\".",
                }
              ]
            },
            {
              "id": "1.6.2",
              "title": "De weg vragen",
              "titleDarija": "تسول على الطريق",
              "titleDarijaLat": "Tsawlo 3la t-tri9",
              "type": "phrases",
              "intro": "Vragen waar iets is, en de richtingen begrijpen.",
              "introDarijaLat": "Tswlo fin kayna chi 7aja w tfahmo l-ittijahat.",
              "items": [
                {
                  "nl": "Waar is...?",
                  "darija": "فين...؟",
                  "darijaLat": "fin...?"
                },
                {
                  "nl": "links",
                  "darija": "على اليسار",
                  "darijaLat": "3la lisar"
                },
                {
                  "nl": "rechts",
                  "darija": "على اليمين",
                  "darijaLat": "3la limin"
                },
                {
                  "nl": "rechtdoor",
                  "darija": "نيشان",
                  "darijaLat": "nichan"
                },
                {
                  "nl": "hier",
                  "darija": "هنا",
                  "darijaLat": "hna"
                },
                {
                  "nl": "daar",
                  "darija": "تما",
                  "darijaLat": "temma"
                },
                {
                  "nl": "dichtbij",
                  "darija": "قريب",
                  "darijaLat": "qrib"
                },
                {
                  "nl": "ver",
                  "darija": "بعيد",
                  "darijaLat": "b3id"
                },
                {
                  "nl": "Ik ben verdwaald.",
                  "darija": "أنا ضايعة",
                  "darijaLat": "ana day3a"
                },
                {
                  "nl": "Kunt u mij helpen?",
                  "darija": "واش ممكن تعاونّي؟",
                  "darijaLat": "wach momkin t3awni?"
                }
              ]
            },
            {
              "id": "1.6.3",
              "title": "Spreekoefening: onderweg",
              "titleDarija": "تمرين الكلام: فالطريق",
              "titleDarijaLat": "Tamrin l-klam: f-ttri9",
              "type": "speaking",
              "intro": "Oefen hardop de zinnen die je onderweg gebruikt.",
              "introDarijaLat": "Tmerrno b-sout 3ali 3la l-jomal lli katsta3mlo f-ttri9.",
              "items": [
                {
                  "nl": "Waar is de halte?",
                  "darija": "فين لاري؟",
                  "darijaLat": "fin lari?"
                },
                {
                  "nl": "Een ticket, alstublieft.",
                  "darija": "تيكي عافاك",
                  "darijaLat": "tiki 3afak"
                },
                {
                  "nl": "links",
                  "darija": "على اليسار",
                  "darijaLat": "3la lisar"
                },
                {
                  "nl": "rechts",
                  "darija": "على اليمين",
                  "darijaLat": "3la limin"
                },
                {
                  "nl": "rechtdoor",
                  "darija": "نيشان",
                  "darijaLat": "nichan"
                },
                {
                  "nl": "Kunt u mij helpen?",
                  "darija": "واش ممكن تعاونّي؟",
                  "darijaLat": "wach momkin t3awni?"
                }
              ]
            }
          ]
        },
        {
          "id": "1.7",
          "title": "Bij de dokter & gezondheid",
          "titleDarija": "عند الطبيب والصحة",
          "titleDarijaLat": "3and t-tbib w s-sa7a",
          "goal": "Je lichaam benoemen en zeggen dat je ziek bent of pijn hebt.",
          "goalDarijaLat": "Tsmmio a3da2 l-bdan w t9olo belli ntooma mrad wlla 3ndkom l-wje3.",
          "icon": "🩺",
          "lessons": [
            {
              "id": "1.7.1",
              "title": "Het lichaam",
              "titleDarija": "الجسم",
              "titleDarijaLat": "j-jsem",
              "type": "vocab",
              "intro": "De belangrijkste lichaamsdelen. Let op het lidwoord (de/het).",
              "introDarijaLat": "Aham a3da2 l-bdan. Rddo balkom l-de w l-het.",
              "items": [
                {
                  "nl": "hoofd",
                  "article": "het",
                  "darija": "الراس",
                  "darijaLat": "ras"
                },
                {
                  "nl": "hand",
                  "article": "de",
                  "darija": "اليد",
                  "darijaLat": "yedd"
                },
                {
                  "nl": "voet",
                  "article": "de",
                  "darija": "القدم / الرجل",
                  "darijaLat": "lqdem / rjel"
                },
                {
                  "nl": "buik",
                  "article": "de",
                  "darija": "الكرش",
                  "darijaLat": "kerch"
                },
                {
                  "nl": "rug",
                  "article": "de",
                  "darija": "الظهر",
                  "darijaLat": "ddher"
                },
                {
                  "nl": "oog",
                  "article": "het",
                  "darija": "العين",
                  "darijaLat": "3in"
                },
                {
                  "nl": "oor",
                  "article": "het",
                  "darija": "الودن",
                  "darijaLat": "weden"
                },
                {
                  "nl": "mond",
                  "article": "de",
                  "darija": "الفم",
                  "darijaLat": "fomm"
                },
                {
                  "nl": "keel",
                  "article": "de",
                  "darija": "الحلق",
                  "darijaLat": "7elq"
                }
              ]
            },
            {
              "id": "1.7.2",
              "title": "Ik ben ziek",
              "titleDarija": "أنا مريضة",
              "titleDarijaLat": "Kan7ess b-rassi mrid(a)",
              "type": "phrases",
              "intro": "Zeggen dat je ziek bent, pijn hebt, en een afspraak maken.",
              "introDarijaLat": "T9olo belli ntooma mrad, 3ndkom l-wje3, w tdiro maw3id.",
              "items": [
                {
                  "nl": "Ik ben ziek.",
                  "darija": "أنا مريضة",
                  "darijaLat": "ana mrida"
                },
                {
                  "nl": "Ik heb pijn.",
                  "darija": "راني نتوجع",
                  "darijaLat": "rani netwejje3"
                },
                {
                  "nl": "Ik heb hoofdpijn.",
                  "darija": "راسي يوجعني",
                  "darijaLat": "rasi ywej3ni"
                },
                {
                  "nl": "Ik heb koorts.",
                  "darija": "عندي السخانة",
                  "darijaLat": "3andi skhana"
                },
                {
                  "nl": "Ik heb een dokter nodig.",
                  "darija": "خاصني طبيب",
                  "darijaLat": "khasni tbib"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي رونديفو",
                  "darijaLat": "3andi rondifou"
                },
                {
                  "nl": "Waar is de apotheek?",
                  "darija": "فين الفارماسي؟",
                  "darijaLat": "fin lfarmasi?"
                },
                {
                  "nl": "Help!",
                  "darija": "عاونوني!",
                  "darijaLat": "3awnouni!"
                }
              ]
            },
            {
              "id": "1.7.3",
              "title": "Spreekoefening: bij de dokter",
              "titleDarija": "تمرين الكلام: عند الطبيب",
              "titleDarijaLat": "tamrin l-klam: 3nd t-tbib",
              "type": "speaking",
              "intro": "Oefen hardop wat je bij de dokter zegt.",
              "introDarijaLat": "Tmerrno b-sout 3ali 3la dakchi lli kat9olo 3and t-tbib.",
              "items": [
                {
                  "nl": "Ik ben ziek.",
                  "darija": "أنا مريضة",
                  "darijaLat": "ana mrida"
                },
                {
                  "nl": "Ik heb pijn.",
                  "darija": "راني نتوجع",
                  "darijaLat": "rani netwejje3"
                },
                {
                  "nl": "Ik heb koorts.",
                  "darija": "عندي السخانة",
                  "darijaLat": "3andi skhana"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي رونديفو",
                  "darijaLat": "3andi rondifou"
                },
                {
                  "nl": "Waar is de apotheek?",
                  "darija": "فين الفارماسي؟",
                  "darijaLat": "fin lfarmasi?"
                }
              ]
            }
          ]
        },
        {
          "id": "1.8",
          "title": "Eten & boodschappen",
          "titleDarija": "الماكلة والتسوق",
          "titleDarijaLat": "l-makla w t-teswa9",
          "goal": "Kleuren, eten en drinken, en bestellen op café of restaurant.",
          "goalDarijaLat": "L-alwan, l-makla w ch-chorb, w kifach tcommandiw f-9ahwa wlla mat3am.",
          "icon": "🍽️",
          "lessons": [
            {
              "id": "1.8.1",
              "title": "Kleuren",
              "titleDarija": "الألوان",
              "titleDarijaLat": "l-alwan",
              "type": "vocab",
              "intro": "De basiskleuren.",
              "introDarijaLat": "L-alwan l-asasiya.",
              "items": [
                {
                  "nl": "rood",
                  "darija": "أحمر",
                  "darijaLat": "7mer"
                },
                {
                  "nl": "blauw",
                  "darija": "أزرق",
                  "darijaLat": "zreq"
                },
                {
                  "nl": "geel",
                  "darija": "أصفر",
                  "darijaLat": "sfer"
                },
                {
                  "nl": "groen",
                  "darija": "أخضر",
                  "darijaLat": "khder"
                },
                {
                  "nl": "zwart",
                  "darija": "كحل",
                  "darijaLat": "k7el"
                },
                {
                  "nl": "wit",
                  "darija": "بيض",
                  "darijaLat": "byed"
                },
                {
                  "nl": "bruin",
                  "darija": "قهوي",
                  "darijaLat": "qehwi"
                },
                {
                  "nl": "oranje",
                  "darija": "برتقالي / أورونج",
                  "darijaLat": "bortoqali / orange"
                }
              ]
            },
            {
              "id": "1.8.2",
              "title": "Eten & drinken",
              "titleDarija": "الماكلة والمشروب",
              "titleDarijaLat": "l-makla w l-machroub",
              "type": "vocab",
              "intro": "Woorden voor eten en drinken. Let op het lidwoord (de/het).",
              "introDarijaLat": "Kelmat dyal l-makla w ch-chorb. Rddo balkom l-de w l-het.",
              "items": [
                {
                  "nl": "brood",
                  "article": "het",
                  "darija": "الخبز",
                  "darijaLat": "khobz"
                },
                {
                  "nl": "water",
                  "article": "het",
                  "darija": "الما",
                  "darijaLat": "lma"
                },
                {
                  "nl": "koffie",
                  "article": "de",
                  "darija": "القهوة",
                  "darijaLat": "qahwa"
                },
                {
                  "nl": "thee",
                  "article": "de",
                  "darija": "أتاي",
                  "darijaLat": "atay"
                },
                {
                  "nl": "melk",
                  "article": "de",
                  "darija": "الحليب",
                  "darijaLat": "7lib"
                },
                {
                  "nl": "fruit",
                  "article": "het",
                  "darija": "الفواكه",
                  "darijaLat": "lfawakih"
                },
                {
                  "nl": "groente",
                  "article": "de",
                  "darija": "الخضرة",
                  "darijaLat": "khodra"
                },
                {
                  "nl": "vlees",
                  "article": "het",
                  "darija": "اللحم",
                  "darijaLat": "l7em"
                },
                {
                  "nl": "vis",
                  "article": "de",
                  "darija": "حوت — موسخ",
                  "darijaLat": "7out — mwsekh",
                  "tip": "Korte 'i' vs. heldere 'ie'.",
                  "pair": "vies",
                  "pronunciation": {
                    "focus": "korte i",
                    "acceptedTranscripts": [
                      "vis"
                    ],
                    "commonConfusions": [
                      "vies"
                    ],
                    "highlight": "i",
                    "pairHighlight": "ie"
                  }
                },
                {
                  "nl": "ei",
                  "article": "het",
                  "darija": "البيضة",
                  "darijaLat": "bida"
                },
                {
                  "nl": "suiker",
                  "article": "de",
                  "darija": "السكر",
                  "darijaLat": "soukkar"
                },
                {
                  "nl": "kaas",
                  "article": "de",
                  "darija": "الفرماج",
                  "darijaLat": "fromaj"
                }
              ]
            },
            {
              "id": "1.8.3",
              "title": "Op café & restaurant",
              "titleDarija": "فالقهوة والمطعم",
              "titleDarijaLat": "f l-9ahwa w l-mat3am",
              "type": "phrases",
              "intro": "Bestellen, betalen en beleefd zijn op café of restaurant.",
              "introDarijaLat": "Tcommandiw, tkhllso w thdro b-adab f-9ahwa wlla mat3am.",
              "items": [
                {
                  "nl": "Een koffie, alstublieft.",
                  "darija": "قهوة عافاك",
                  "darijaLat": "qahwa 3afak"
                },
                {
                  "nl": "Mag ik de kaart?",
                  "darija": "ممكن المينيو عافاك؟",
                  "darijaLat": "momkin lmenu 3afak?"
                },
                {
                  "nl": "Ik heb honger.",
                  "darija": "فيا الجوع",
                  "darijaLat": "fiya jou3"
                },
                {
                  "nl": "Ik heb dorst.",
                  "darija": "فيا العطش",
                  "darijaLat": "fiya l3tech"
                },
                {
                  "nl": "Lekker!",
                  "darija": "بنين!",
                  "darijaLat": "bnin!"
                },
                {
                  "nl": "Smakelijk!",
                  "darija": "بالصحة",
                  "darijaLat": "b sa77a"
                },
                {
                  "nl": "De rekening, alstublieft.",
                  "darija": "الحساب عافاك",
                  "darijaLat": "l7sab 3afak"
                }
              ]
            },
            {
              "id": "1.8.4",
              "title": "Spreekoefening: bestellen",
              "titleDarija": "تمرين الكلام: الطلب",
              "titleDarijaLat": "tamrin l-klam: l-tlb",
              "type": "speaking",
              "intro": "Oefen hardop hoe je iets bestelt.",
              "introDarijaLat": "Tmerrno b-sout 3ali kifach tcommandiw chi 7aja.",
              "items": [
                {
                  "nl": "Een koffie, alstublieft.",
                  "darija": "قهوة عافاك",
                  "darijaLat": "qahwa 3afak"
                },
                {
                  "nl": "Mag ik de kaart?",
                  "darija": "ممكن المينيو عافاك؟",
                  "darijaLat": "momkin lmenu 3afak?"
                },
                {
                  "nl": "De rekening, alstublieft.",
                  "darija": "الحساب عافاك",
                  "darijaLat": "l7sab 3afak"
                },
                {
                  "nl": "Smakelijk!",
                  "darija": "بالصحة",
                  "darijaLat": "b sa77a"
                }
              ]
            },
            {
              "id": "1.8.5",
              "title": "Tegenstellingen & hoeveelheden",
              "titleDarija": "الأضداد والكميات",
              "titleDarijaLat": "L-addad w l-kammiyat",
              "type": "vocab",
              "intro": "Handige bijvoeglijke naamwoorden en hoeveelheden voor de winkel.",
              "introDarijaLat": "Sifat w kammiyat mofida f-l7anout.",
              "items": [
                {
                  "nl": "groot",
                  "darija": "كبير",
                  "darijaLat": "kbir"
                },
                {
                  "nl": "klein",
                  "darija": "صغير",
                  "darijaLat": "sghir"
                },
                {
                  "nl": "goedkoop",
                  "darija": "رخيص",
                  "darijaLat": "rkhis"
                },
                {
                  "nl": "duur",
                  "darija": "غالي",
                  "darijaLat": "ghali"
                },
                {
                  "nl": "warm",
                  "darija": "سخون",
                  "darijaLat": "skhoun"
                },
                {
                  "nl": "koud",
                  "darija": "بارد",
                  "darijaLat": "bared"
                },
                {
                  "nl": "veel",
                  "darija": "بزاف",
                  "darijaLat": "bezzaf"
                },
                {
                  "nl": "weinig",
                  "darija": "شوية",
                  "darijaLat": "chwiya"
                },
                {
                  "nl": "een kilo",
                  "darija": "كيلو",
                  "darijaLat": "kilo"
                },
                {
                  "nl": "een halve kilo",
                  "darija": "نص كيلو",
                  "darijaLat": "ness kilo"
                },
                {
                  "nl": "een stuk",
                  "darija": "وحدة / قطعة",
                  "darijaLat": "we7da / qet3a"
                },
                {
                  "nl": "een fles",
                  "darija": "قرعة",
                  "darijaLat": "qer3a"
                }
              ]
            },
            {
              "id": "1.8.6",
              "title": "Halal & wat zit erin?",
              "titleDarija": "حلال وشنو كاين فيه",
              "titleDarijaLat": "7lal w chno kayn fih",
              "type": "vocab",
              "intro": "Belangrijk om etiketten en menu’s te begrijpen.",
              "introDarijaLat": "Mohim bach tfahmo l-etiquettes w l-menu.",
              "items": [
                {
                  "nl": "halal",
                  "darija": "حلال",
                  "darijaLat": "7alal"
                },
                {
                  "nl": "het varkensvlees",
                  "article": "het",
                  "darija": "لحم الخنزير",
                  "darijaLat": "l7em lekhnzir",
                  "tip": "Niet halal — goed om te herkennen.",
                  "tipDarija": "ماشي حلال — مزيان باش تعرفيه.",
                  "tipDarijaLat": "machi 7lal — mezyan bach t3rfyh.",
                },
                {
                  "nl": "het spek",
                  "article": "het",
                  "darija": "لحم الخنزير المدخّن",
                  "darijaLat": "l7em lekhnzir lmdekhkhen",
                  "tip": "Bacon; komt van varken.",
                  "tipDarija": "لحم الخنزير المدخّن؛ كيجي من الحلوف.",
                  "tipDarijaLat": "l7m l-khenzir l-mdkhn; kiji men l-7louf.",
                },
                {
                  "nl": "de gelatine",
                  "article": "de",
                  "darija": "جيلاتين",
                  "darijaLat": "jilatin",
                  "tip": "Kan van varken zijn — vraag na.",
                  "tipDarija": "يمكن يكون من الحلوف — سولي.",
                  "tipDarijaLat": "ymken ykoun men l-7louf — swli.",
                },
                {
                  "nl": "vegetarisch",
                  "darija": "نباتي",
                  "darijaLat": "nabati"
                },
                {
                  "nl": "het rundvlees",
                  "article": "het",
                  "darija": "لحم البڭري",
                  "darijaLat": "l7em lbagri"
                },
                {
                  "nl": "de kip",
                  "article": "de",
                  "darija": "الدجاج",
                  "darijaLat": "ddjaj"
                },
                {
                  "nl": "Is dit halal?",
                  "answer": "Is dit halal?",
                  "darija": "واش هادا حلال؟",
                  "darijaLat": "wach hada 7alal?"
                },
                {
                  "nl": "Zit hier varkensvlees in?",
                  "answer": "Zit hier varkensvlees in?",
                  "darija": "واش فيه لحم الخنزير؟",
                  "darijaLat": "wach fih l7em lekhnzir?"
                }
              ]
            }
          ]
        },
        {
          "id": "1.9",
          "title": "Werk & afspraken",
          "titleDarija": "الخدمة والمواعيد",
          "titleDarijaLat": "l-khedma w l-mawa3id",
          "goal": "Praten over werk en een afspraak maken.",
          "goalDarijaLat": "Thdro 3la l-khedma w tdiro maw3id.",
          "icon": "💼",
          "lessons": [
            {
              "id": "1.9.1",
              "title": "Werk",
              "titleDarija": "الخدمة",
              "titleDarijaLat": "l-khedma",
              "type": "vocab",
              "intro": "Woorden over werk. Let op het lidwoord (de/het).",
              "introDarijaLat": "Kelmat 3la l-khedma. Rddo balkom l-de w l-het.",
              "items": [
                {
                  "nl": "werk",
                  "article": "het",
                  "darija": "الخدمة",
                  "darijaLat": "khedma"
                },
                {
                  "nl": "baan",
                  "article": "de",
                  "darija": "خدمة / بوسط",
                  "darijaLat": "khedma / poste"
                },
                {
                  "nl": "collega",
                  "article": "de",
                  "darija": "كوليگ / زميل",
                  "darijaLat": "collègue / zamil"
                },
                {
                  "nl": "baas",
                  "article": "de",
                  "darija": "الپاطرون",
                  "darijaLat": "patron"
                },
                {
                  "nl": "kantoor",
                  "article": "het",
                  "darija": "المكتب / البيرو",
                  "darijaLat": "lmektab / lbiro"
                },
                {
                  "nl": "fabriek",
                  "article": "de",
                  "darija": "المعمل",
                  "darijaLat": "m3mel"
                },
                {
                  "nl": "afspraak",
                  "article": "de",
                  "darija": "الموعد",
                  "darijaLat": "maw3id"
                },
                {
                  "nl": "vergadering",
                  "article": "de",
                  "darija": "الاجتماع",
                  "darijaLat": "ijtima3"
                },
                {
                  "nl": "loon",
                  "article": "het",
                  "darija": "الصالير / الأجرة",
                  "darijaLat": "salaire / lujra"
                },
                {
                  "nl": "pauze",
                  "article": "de",
                  "darija": "البوز / الاستراحة",
                  "darijaLat": "pause / listira7a"
                }
              ]
            },
            {
              "id": "1.9.2",
              "title": "Een afspraak maken",
              "titleDarija": "ديري موعد",
              "titleDarijaLat": "Diro maw3id",
              "type": "phrases",
              "intro": "Zinnen om over werk te praten en een afspraak te maken.",
              "introDarijaLat": "Jomal bach thdro 3la l-khedma w tdiro maw3id.",
              "items": [
                {
                  "nl": "Ik werk in Gent.",
                  "darija": "نخدم فـ گنت",
                  "darijaLat": "nkhdem f Gent"
                },
                {
                  "nl": "Wat is uw beroep?",
                  "darija": "شنو هي الخدمة تاعك؟",
                  "darijaLat": "chno hiya lkhedma ta3ek?"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي رونديفو",
                  "darijaLat": "3andi rondifou"
                },
                {
                  "nl": "Kunnen we een afspraak maken?",
                  "darija": "واش نقدرو نديرو موعد؟",
                  "darijaLat": "wach nqedro ndiro maw3id?"
                },
                {
                  "nl": "Wanneer past het u?",
                  "darija": "وقتاش يجيك مناسب؟",
                  "darijaLat": "weqtach yjik monasib?"
                },
                {
                  "nl": "Om negen uur.",
                  "darija": "فالتسعة",
                  "darijaLat": "f tes3a"
                },
                {
                  "nl": "Ik kan vandaag niet.",
                  "darija": "ما نقدرش اليوم",
                  "darijaLat": "ma nqderch lyoum"
                },
                {
                  "nl": "Sorry dat ik te laat ben.",
                  "darija": "سمح ليا حيث تعطلت",
                  "darijaLat": "sme7 liya 7it t3ettelt"
                },
                {
                  "nl": "Tot volgende week.",
                  "darija": "نتلاقاو السيمانة الجاية",
                  "darijaLat": "ntlaqaw simana jjaya"
                }
              ]
            },
            {
              "id": "1.9.3",
              "title": "Spreekoefening: werk & afspraken",
              "titleDarija": "تمرين الكلام: الخدمة والمواعيد",
              "titleDarijaLat": "tamrin l-klam: l-khedma w l-mawa3id",
              "type": "speaking",
              "intro": "Oefen hardop wat je zegt over werk en afspraken.",
              "introDarijaLat": "Tmerrno b-sout 3ali 3la dakchi lli kat9olo 3la l-khedma w l-mawa3id.",
              "items": [
                {
                  "nl": "Ik werk in Gent.",
                  "darija": "نخدم فـ گنت",
                  "darijaLat": "nkhdem f Gent"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي رونديفو",
                  "darijaLat": "3andi rondifou"
                },
                {
                  "nl": "Kunnen we een afspraak maken?",
                  "darija": "واش نقدرو نديرو موعد؟",
                  "darijaLat": "wach nqedro ndiro maw3id?"
                },
                {
                  "nl": "Sorry dat ik te laat ben.",
                  "darija": "سمح ليا حيث تعطلت",
                  "darijaLat": "sme7 liya 7it t3ettelt"
                },
                {
                  "nl": "Tot volgende week.",
                  "darija": "نتلاقاو السيمانة الجاية",
                  "darijaLat": "ntlaqaw simana jjaya"
                }
              ]
            }
          ]
        },
        {
          "id": "1.10",
          "title": "Extra grammatica",
          "titleDarija": "قواعد إضافية",
          "titleDarijaLat": "9awa3ed idafiya",
          "goal": "Voornaamwoorden, ontkenning (niet/geen), meervoud en het lidwoord \"een\".",
          "goalDarijaLat": "D-damayr, n-nafy (niet/geen), l-jam3 w l-adat \"een\".",
          "icon": "🧩",
          "lessons": [
            {
              "id": "1.10.1",
              "title": "Persoonlijke voornaamwoorden",
              "titleDarija": "الضمائر",
              "titleDarijaLat": "D-damayr",
              "type": "vocab",
              "intro": "Wie doet iets? ik, jij, hij, zij, wij, jullie, zij.",
              "introDarijaLat": "Chkoun kaydir chi 7aja? ik, jij, hij, zij, wij, jullie, zij.",
              "items": [
                {
                  "nl": "ik",
                  "darija": "أنا",
                  "darijaLat": "ana"
                },
                {
                  "nl": "jij",
                  "darija": "نتا / نتِ",
                  "darijaLat": "nta / nti"
                },
                {
                  "nl": "u",
                  "darija": "نتا / نتِ (بلاحترام)",
                  "darijaLat": "nta / nti (b l'i7tiram)",
                  "tip": "Beleefde vorm van 'jij' (tegen vreemden, de dokter, het loket)."
                },
                {
                  "nl": "hij",
                  "darija": "هو",
                  "darijaLat": "houwa"
                },
                {
                  "nl": "zij",
                  "darija": "هي",
                  "darijaLat": "hiya"
                },
                {
                  "nl": "wij",
                  "darija": "حنا",
                  "darijaLat": "7na"
                },
                {
                  "nl": "jullie",
                  "darija": "نتوما",
                  "darijaLat": "ntouma"
                },
                {
                  "nl": "zij (meervoud)",
                  "darija": "هوما",
                  "darijaLat": "houma"
                }
              ]
            },
            {
              "id": "1.10.2",
              "title": "Ontkenning: niet & geen",
              "titleDarija": "النفي: niet و geen",
              "titleDarijaLat": "N-nafy: niet w geen",
              "type": "phrases",
              "intro": "Gebruik \"geen\" bij een zelfstandig naamwoord (geen tijd), en \"niet\" bij de rest.",
              "introDarijaLat": "Sta3mlo \"geen\" m3a l-ism (geen tijd), w \"niet\" m3a l-ba9i.",
              "darijaNote": "geen كتستعمل مع الاسم، بحال geen tijd. وniet كتستعمل فحالات أخرى.",
              "darijaNoteLat": "Geen katsta3mel m3a l-ism, b7al geen tijd. Niet katsta3mel f-7alat okhrin.",
              "items": [
                {
                  "nl": "Ik heb geen tijd.",
                  "darija": "ماعنديش الوقت",
                  "darijaLat": "ma3andich lweqt"
                },
                {
                  "nl": "Ik spreek geen Frans.",
                  "darija": "ما نهضرش بالفرنسية",
                  "darijaLat": "ma nhderch b lfransiya"
                },
                {
                  "nl": "Ik versta het niet.",
                  "darija": "مافهمتش",
                  "darijaLat": "mafhemtch"
                },
                {
                  "nl": "Ik weet het niet.",
                  "darija": "ما نعرفش",
                  "darijaLat": "ma n3refch"
                },
                {
                  "nl": "Dat is niet goed.",
                  "darija": "هادا ماشي مزيان",
                  "darijaLat": "hada machi mzyan"
                },
                {
                  "nl": "Ik heb geen geld.",
                  "darija": "ماعنديش الفلوس",
                  "darijaLat": "ma3andich lflous"
                }
              ]
            },
            {
              "id": "1.10.3",
              "title": "Meervoud (-en / -s)",
              "titleDarija": "الجمع",
              "titleDarijaLat": "L-jam3",
              "type": "grammar",
              "intro": "Meestal +en, soms +s (na -e, -el, -er, en bij korte woorden). Het meervoud is altijd \"de\".",
              "introDarijaLat": "Ghaliban +en, w mrrat +s (men be3d -e, -el, -er, w m3a kelmat 9sar). L-jam3 dima kayakhod \"de\".",
              "items": [
                {
                  "nl": "het huis → de huizen",
                  "tip": "+en",
                  "darija": "الدار → الديور",
                  "darijaLat": "ddar → ddyor",
                  "tipDarija": "+en.",
                  "tipDarijaLat": "+en.",
                },
                {
                  "nl": "de man → de mannen",
                  "tip": "+en (dubbele n)",
                  "darija": "الراجل → الرجال",
                  "darijaLat": "rrajel → rjal",
                  "tipDarija": "+en (n مزدوجة).",
                  "tipDarijaLat": "+en (n mzdwja).",
                },
                {
                  "nl": "de vrouw → de vrouwen",
                  "tip": "+en",
                  "darija": "المرا → العيالات",
                  "darijaLat": "lmra → l3yalat",
                  "tipDarija": "+en.",
                  "tipDarijaLat": "+en.",
                },
                {
                  "nl": "het kind → de kinderen",
                  "tip": "onregelmatig",
                  "darija": "الطفل → الدراري",
                  "darijaLat": "ttefl → ddrari",
                  "tipDarija": "شاذ.",
                  "tipDarijaLat": "chad.",
                },
                {
                  "nl": "de tafel → de tafels",
                  "tip": "+s (na -el)",
                  "darija": "الطابلة → الطوابل",
                  "darijaLat": "ttabla → ttwabel",
                  "tipDarija": "+s (من بعد -el).",
                  "tipDarijaLat": "+s (men be3d -el).",
                },
                {
                  "nl": "de fiets → de fietsen",
                  "tip": "+en",
                  "darija": "البيسكليت → البيسكليتات",
                  "darijaLat": "lbisiklet → lbisikletat",
                  "tipDarija": "+en.",
                  "tipDarijaLat": "+en.",
                },
                {
                  "nl": "de auto → de auto's",
                  "tip": "+'s",
                  "darija": "الطوموبيل → الطوموبيلات",
                  "darijaLat": "ttomobil → ttomobilat",
                  "tipDarija": "+'s.",
                  "tipDarijaLat": "+'s.",
                },
                {
                  "nl": "de baby → de baby's",
                  "tip": "+'s",
                  "darija": "البيبي → البيبيات",
                  "darijaLat": "lbibi → lbibiyat",
                  "tipDarija": "+'s.",
                  "tipDarijaLat": "+'s.",
                }
              ]
            },
            {
              "id": "1.10.4",
              "title": "een, de of het",
              "titleDarija": "een، de ولا het",
              "titleDarijaLat": "een, de wlla het",
              "type": "grammar",
              "intro": "\"een\" = één, onbekend (een brood). \"de/het\" = het bekende, specifieke (het brood dat jij wil).",
              "introDarijaLat": "\"een\" = wa7ed, ma ma3roufch (een brood). \"de/het\" = ma3rouf w mo7addad (het brood lli bghito).",
              "darijaNote": "een كتجي مع شي حاجة مازال ما معروفةش، وde ولا het كيجيو مع الحاجة اللي معروفة وسبق هضرتي عليها.",
              "darijaNoteLat": "Een katji m3a chi 7aja mazal ma ma3roufach. De wlla het kayjiw m3a l-7aja lli ma3roufa w sbe9 hdarto 3liha.",
              "items": [
                {
                  "nl": "een brood",
                  "tip": "een willekeurig brood",
                  "darija": "خبزة",
                  "darijaLat": "khobza",
                  "tipDarija": "خبزة أيّ كيفما كانت (غير معيّنة).",
                  "tipDarijaLat": "khobza ay kyfma kant (ghir mo3ayena).",
                },
                {
                  "nl": "het brood",
                  "tip": "dat specifieke brood",
                  "darija": "الخبز",
                  "darijaLat": "lkhobz",
                  "tipDarija": "داك الخبز المعيّن.",
                  "tipDarijaLat": "dak l-khobz l-mo3ayen.",
                },
                {
                  "nl": "een huis",
                  "tip": "een of ander huis",
                  "darija": "دار",
                  "darijaLat": "dar",
                  "tipDarija": "شي دار ما.",
                  "tipDarijaLat": "chi dar ma.",
                },
                {
                  "nl": "het huis",
                  "tip": "jouw/dat huis",
                  "darija": "الدار",
                  "darijaLat": "ddar",
                  "tipDarija": "دارك/داك الدار المعيّنة.",
                  "tipDarijaLat": "dark/dak d-dar l-m3yna.",
                },
                {
                  "nl": "een man",
                  "tip": "iemand",
                  "darija": "راجل",
                  "darijaLat": "rajel",
                  "tipDarija": "شي واحد.",
                  "tipDarijaLat": "chi wa7ed.",
                },
                {
                  "nl": "de man",
                  "tip": "die man",
                  "darija": "الراجل",
                  "darijaLat": "rrajel",
                  "tipDarija": "داك الراجل.",
                  "tipDarijaLat": "dak r-rajel.",
                  "article": "de"
                },
                {
                  "nl": "een vraag",
                  "tip": "zomaar een vraag",
                  "darija": "سؤال",
                  "darijaLat": "so2al",
                  "tipDarija": "غير شي سؤال.",
                  "tipDarijaLat": "ghir chi so2al.",
                },
                {
                  "nl": "de vraag",
                  "tip": "die ene vraag",
                  "darija": "السؤال",
                  "darijaLat": "sso2al",
                  "tipDarija": "داك السؤال المعيّن.",
                  "tipDarijaLat": "dak s-so2al l-mo3ayen.",
                }
              ]
            },
            {
              "id": "1.10.5",
              "title": "Beleefd: 'u' (dokter, gemeente, winkel)",
              "titleDarija": "بأدب: «u» (الطبيب، البلدية، الحانوت)",
              "titleDarijaLat": "B l-adab: \"u\" (t-tbib, l-baladiya, l-7anout)",
              "type": "phrases",
              "intro": "Tegen vreemden, de dokter of aan het loket gebruik je 'u' (beleefd), niet 'jij'.",
              "introDarijaLat": "M3a n-nas lli ma kat3rfohomch, t-tbib wlla f-chobbak, sta3mlo 'u' b-adab, machi 'jij'.",
              "items": [
                {
                  "nl": "Hoe heet u?",
                  "answer": "Hoe heet u?",
                  "darija": "أشنو سميتك؟",
                  "darijaLat": "achno smitek?",
                  "tip": "Beleefde vorm van 'Hoe heet jij?'",
                  "tipDarija": "الصيغة المؤدّبة ديال «Hoe heet jij?».",
                  "tipDarijaLat": "l-sygha l-mo2addaba dyal \"Hoe heet jij?\".",
                },
                {
                  "nl": "Waar woont u?",
                  "answer": "Waar woont u?",
                  "darija": "فين ساكن/ساكنة؟",
                  "darijaLat": "fin saken/sakna?"
                },
                {
                  "nl": "Spreekt u Nederlands?",
                  "answer": "Spreekt u Nederlands?",
                  "darija": "واش تهضر بالهولندية؟",
                  "darijaLat": "wach thder b hollandiya?"
                },
                {
                  "nl": "Hebt u kinderen?",
                  "answer": "Hebt u kinderen?",
                  "darija": "واش عندك دراري؟",
                  "darijaLat": "wach 3andek drari?"
                },
                {
                  "nl": "Kunt u mij helpen?",
                  "answer": "Kunt u mij helpen?",
                  "darija": "واش تقدر تعاوني؟",
                  "darijaLat": "wach tqder t3awenni?"
                },
                {
                  "nl": "Kunt u wat trager spreken?",
                  "answer": "Kunt u wat trager spreken?",
                  "darija": "واش تقدر تهدر بشوية؟",
                  "darijaLat": "wach tqder thder bchwiya?"
                },
                {
                  "nl": "Dank u wel.",
                  "answer": "Dank u wel.",
                  "darija": "شكرا بزاف",
                  "darijaLat": "choukran bezzaf",
                  "tip": "Beleefd; informeel is 'Dank je wel'.",
                  "tipDarija": "مؤدّب؛ غير الرسمي هو «Dank je wel».",
                  "tipDarijaLat": "mwdb; ghir l-rsmy howa \"Dank je wel\".",
                }
              ]
            }
          ]
        },
        {
          "id": "1.11",
          "title": "In Gent: administratie & nood",
          "titleDarija": "فـ گنت: الإدارة والطوارئ",
          "titleDarijaLat": "f gnt: l-idara w t-tawari2",
          "goal": "Woorden voor de gemeente en werk, en wat je zegt in een noodsituatie.",
          "goalDarijaLat": "Kelmat dyal l-baladiya w l-khedma, w achno t9olo f-7alat t-tawari2.",
          "icon": "🏛️",
          "lessons": [
            {
              "id": "1.11.1",
              "title": "Bij de gemeente",
              "titleDarija": "فالبلدية",
              "titleDarijaLat": "f l-baladiya",
              "type": "phrases",
              "intro": "Woorden en zinnen voor het stadhuis en je papieren.",
              "introDarijaLat": "Kelmat w jomal dyal l-baladiya w lwra9 dyalkom.",
              "items": [
                {
                  "nl": "de gemeente",
                  "darija": "البلدية / الكومين",
                  "darijaLat": "lbaladiya / lkomin"
                },
                {
                  "nl": "het stadhuis",
                  "darija": "دار البلدية",
                  "darijaLat": "dar lbaladiya"
                },
                {
                  "nl": "de inburgering",
                  "darija": "الاندماج",
                  "darijaLat": "lindimaj"
                },
                {
                  "nl": "het document",
                  "darija": "الوثيقة / الورقة",
                  "darijaLat": "lwatiqa / lwrqa"
                },
                {
                  "nl": "de identiteitskaart",
                  "darija": "لاكارت ناسيونال",
                  "darijaLat": "lakart nasional"
                },
                {
                  "nl": "de handtekening",
                  "darija": "الإمضاء / التوقيع",
                  "darijaLat": "limda / ttewqi3"
                },
                {
                  "nl": "Ik heb een afspraak bij de gemeente.",
                  "darija": "عندي موعد فالبلدية",
                  "darijaLat": "3andi maw3id f lbaladiya"
                },
                {
                  "nl": "Waar moet ik tekenen?",
                  "darija": "فين خاصني نوقع؟",
                  "darijaLat": "fin khasni nweqqe3?"
                },
                {
                  "nl": "Ik versta het niet, kunt u het herhalen?",
                  "darija": "ما فهمتش، واش ممكن تعاود؟",
                  "darijaLat": "ma fhemtch, wach momkin t3awed?"
                }
              ]
            },
            {
              "id": "1.11.2",
              "title": "Werk & hulp",
              "titleDarija": "الخدمة والمساعدة",
              "titleDarijaLat": "l-khedma w l-mosa3ada",
              "type": "vocab",
              "intro": "Belangrijke diensten in Vlaanderen.",
              "introDarijaLat": "Khadamat mohima f-Flandre.",
              "items": [
                {
                  "nl": "VDAB",
                  "darija": "مكتب التشغيل VDAB",
                  "darijaLat": "maktab ttachghil VDAB",
                  "tip": "Vlaamse dienst om werk te zoeken (plek voor werk en opleiding).",
                  "tipDarija": "مصلحة فلامنكية باش تقلّب على الخدمة (بلاصة للخدمة والتكوين).",
                  "tipDarijaLat": "msl7a flamankiya bach t9lb 3la l-khedma (blassa llkhdma w t-takwin).",
                },
                {
                  "nl": "het OCMW",
                  "darija": "الـ OCMW / السوسيال",
                  "darijaLat": "l-OCMW / ssosyal",
                  "tip": "Sociale hulp van de gemeente.",
                  "tipDarija": "المساعدة الاجتماعية ديال البلدية.",
                  "tipDarijaLat": "l-mosa3ada alajtma3ya dyal l-baladiya.",
                },
                {
                  "nl": "de mutualiteit",
                  "darija": "الموطويال / الصندوق الصحي",
                  "darijaLat": "mutuelle / sandouq si7i",
                  "tip": "Je ziekenfonds (terugbetaling dokter).",
                  "tipDarija": "الصندوق الصحي ديالك (استرجاع مصاريف الطبيب).",
                  "tipDarijaLat": "l-sndw9 s-s7i dyalk (astrja3 msaryf t-tbib).",
                },
                {
                  "nl": "de huur",
                  "darija": "الكرا",
                  "darijaLat": "lkra"
                },
                {
                  "nl": "het contract",
                  "darija": "العقد / الكونطرا",
                  "darijaLat": "l3aqd / kontra"
                },
                {
                  "nl": "de les Nederlands",
                  "darija": "حصة الهولندية",
                  "darijaLat": "7essa d hollandiya"
                }
              ]
            },
            {
              "id": "1.11.3",
              "title": "Noodsituaties",
              "titleDarija": "الطوارئ",
              "titleDarijaLat": "t-tawari2",
              "type": "phrases",
              "intro": "In nood bel je 112. Deze zinnen zijn belangrijk om te kennen.",
              "introDarijaLat": "F-tawari2 3ayto l-112. Mohim t3erfo had l-jomal.",
              "darijaNote": "فحالة الطوارئ عيطي لـ 112. هاد الجمل مهمين بزاف.",
              "darijaNoteLat": "F-7alat t-tawari2 3ayto l-112. Had l-jomal mohimin bezzaf.",
              "items": [
                {
                  "nl": "Help!",
                  "darija": "عاونوني!",
                  "darijaLat": "3awnouni!"
                },
                {
                  "nl": "Bel 112!",
                  "darija": "عيط / عيطي لـ 112!",
                  "darijaLat": "3ayet / 3ayti l 112!"
                },
                {
                  "nl": "Bel de politie!",
                  "darija": "عيط للبوليس!",
                  "darijaLat": "3ayet lbolis!"
                },
                {
                  "nl": "de politie",
                  "darija": "البوليس",
                  "darijaLat": "lbolis"
                },
                {
                  "nl": "de brandweer",
                  "darija": "البومبيي",
                  "darijaLat": "lbombiy"
                },
                {
                  "nl": "de ziekenwagen",
                  "darija": "الإسعاف / لامبيلونس",
                  "darijaLat": "lis3af / lambilans"
                },
                {
                  "nl": "Er is een ongeval.",
                  "darija": "كاين أكسيدون",
                  "darijaLat": "kayn aksidon"
                },
                {
                  "nl": "Ik heb hulp nodig.",
                  "darija": "خاصني المساعدة",
                  "darijaLat": "khasni lmosa3ada"
                }
              ]
            },
            {
              "id": "1.11.4",
              "title": "Spreekoefening: nood & hulp",
              "titleDarija": "تمرين الكلام: الطوارئ",
              "titleDarijaLat": "tamrin l-klam: t-tawari2",
              "type": "speaking",
              "intro": "Oefen hardop wat je in een noodsituatie zegt.",
              "introDarijaLat": "Tmerrno b-sout 3ali 3la dakchi lli t9olo f-7alat t-tawari2.",
              "items": [
                {
                  "nl": "Help!",
                  "darija": "عاونوني!",
                  "darijaLat": "3awnouni!"
                },
                {
                  "nl": "Bel de politie!",
                  "darija": "عيط للبوليس!",
                  "darijaLat": "3ayet lbolis!"
                },
                {
                  "nl": "Ik heb hulp nodig.",
                  "darija": "خاصني المساعدة",
                  "darijaLat": "khasni lmosa3ada"
                },
                {
                  "nl": "Er is een ongeval.",
                  "darija": "كاين أكسيدون",
                  "darijaLat": "kayn aksidon"
                }
              ]
            }
          ]
        },
        {
          "id": "1.12",
          "title": "Kinderen & school",
          "titleDarija": "الدراري والمدرسة",
          "titleDarijaLat": "d-drari w l-mdrasa",
          "lessons": [
            {
              "id": "1.12.1",
              "title": "Kinderen & school",
              "titleDarija": "الدراري والمدرسة",
              "titleDarijaLat": "d-drari w l-mdrasa",
              "type": "vocab",
              "intro": "Woorden voor het dagelijks leven met kinderen in Gent.",
              "introDarijaLat": "Kelmat dyal l-7ayat l-yawmiya m3a d-drari f-Gent.",
              "items": [
                {
                  "nl": "de school",
                  "article": "de",
                  "darija": "ليكول",
                  "darijaLat": "likol"
                },
                {
                  "nl": "de juf",
                  "article": "de",
                  "darija": "المعلمة",
                  "darijaLat": "lm3allima"
                },
                {
                  "nl": "de meester",
                  "article": "de",
                  "darija": "المعلم",
                  "darijaLat": "lm3allem"
                },
                {
                  "nl": "de klas",
                  "article": "de",
                  "darija": "القسم",
                  "darijaLat": "lqism"
                },
                {
                  "nl": "de speelplaats",
                  "article": "de",
                  "darija": "الساحة",
                  "darijaLat": "ssa7a"
                },
                {
                  "nl": "de kinderopvang",
                  "article": "de",
                  "darija": "الحضانة",
                  "darijaLat": "l7adana"
                },
                {
                  "nl": "de boekentas",
                  "article": "de",
                  "darija": "الصاك تاع المدرسة",
                  "darijaLat": "ssak ta3 lmedrasa"
                },
                {
                  "nl": "het oudercontact",
                  "article": "het",
                  "darija": "رونديفو مع المعلّم ولا المعلّمة",
                  "darijaLat": "rondifou m3a lm3ellem wla lm3ellma"
                }
              ]
            },
            {
              "id": "1.12.2",
              "title": "Op school: wat zeg je?",
              "titleDarija": "فالمدرسة: أشنو كتقولي؟",
              "titleDarijaLat": "F-lmdrasa: achno kat9olo?",
              "type": "phrases",
              "intro": "Handige zinnen voor de school van je kinderen.",
              "introDarijaLat": "Jomal mofida l-mdrasa dyal drarikom.",
              "items": [
                {
                  "nl": "Ik wil mijn kind inschrijven.",
                  "answer": "Ik wil mijn kind inschrijven.",
                  "darija": "بغيت نسجّل ولدي",
                  "darijaLat": "bghit nsejjel weldi"
                },
                {
                  "nl": "Mijn kind is ziek vandaag.",
                  "answer": "Mijn kind is ziek vandaag.",
                  "darija": "ولدي مريض اليوم / بنتي مريضة اليوم",
                  "darijaLat": "weldi mrid lyoum / benti mrida lyoum"
                },
                {
                  "nl": "Wanneer is het oudercontact?",
                  "answer": "Wanneer is het oudercontact?",
                  "darija": "وقتاش اجتماع الوالدين؟",
                  "darijaLat": "weqtach ijtima3 lwalidin?"
                },
                {
                  "nl": "Hoe laat begint de school?",
                  "answer": "Hoe laat begint de school?",
                  "darija": "وقتاش تبدا ليكول؟",
                  "darijaLat": "weqtach tebda likol?"
                },
                {
                  "nl": "Waar is de school?",
                  "answer": "Waar is de school?",
                  "darija": "فين المدرسة؟",
                  "darijaLat": "fin lmedrasa?"
                }
              ]
            }
          ]
        },
        {
          "id": "1.13",
          "title": "Beschrijven (Hoe is het?)",
          "titleDarija": "الوصف (كيفاش داير؟)",
          "titleDarijaLat": "L-wasf (kifach dayr/dayra?)",
          "lessons": [
            {
              "id": "1.13.1",
              "title": "Tegenstellingen en emoties",
              "titleDarija": "الأضداد والمشاعر",
              "titleDarijaLat": "l-addad w l-macha3er",
              "type": "vocab",
              "intro": "Handige woorden om dingen en mensen te beschrijven.",
              "introDarijaLat": "Kelmat mofida bach twsfo l-7wayej w n-nas.",
              "darijaNote": "كلمات مهمة باش توصفي الناس والحوايج.",
              "darijaNoteLat": "Kelmat mohima bach twsfo n-nas w l-7wayej.",
              "items": [
                {
                  "nl": "mooi",
                  "darija": "زوين",
                  "darijaLat": "zwin"
                },
                {
                  "nl": "lelijk",
                  "darija": "خايب",
                  "darijaLat": "khayeb"
                },
                {
                  "nl": "lief",
                  "darija": "ضريف",
                  "darijaLat": "drif"
                },
                {
                  "nl": "stout",
                  "darija": "باسل / داسر",
                  "darijaLat": "basel / daser"
                },
                {
                  "nl": "lekker",
                  "darija": "بنين",
                  "darijaLat": "bnin"
                },
                {
                  "nl": "vies",
                  "darija": "موسخ / ما بنينش",
                  "darijaLat": "mwsekh / ma bninch"
                }
              ]
            }
          ]
        },
        {
          "id": "1.14",
          "title": "De Buurt & De Markt",
          "titleDarija": "الحومة والسوق",
          "titleDarijaLat": "l-7ouma w s-sou9",
          "lessons": [
            {
              "id": "1.14.1",
              "title": "Op de markt in Gent",
              "titleDarija": "فالسوق ف غاند",
              "titleDarijaLat": "f s-sou9 f Gent",
              "type": "phrases",
              "intro": "Woorden en zinnen voor de lokale markt (bijv. Vrijdagmarkt).",
              "introDarijaLat": "Kelmat w jomal dyal s-sou9 l-ma7alli (b7al Vrijdagmarkt).",
              "items": [
                {
                  "nl": "de markt",
                  "article": "de",
                  "darija": "السوق / المرشي",
                  "darijaLat": "ssouq / lmarshi"
                },
                {
                  "nl": "vers",
                  "darija": "طري",
                  "darijaLat": "tri"
                },
                {
                  "nl": "de groenten",
                  "darija": "الخضرة",
                  "darijaLat": "lkhodra"
                }
              ]
            },
            {
              "id": "1.14.2",
              "title": "In de buurt",
              "titleDarija": "فالحومة",
              "titleDarijaLat": "f l-7ouma",
              "type": "phrases",
              "items": [
                {
                  "nl": "de buren",
                  "darija": "الجيران",
                  "darijaLat": "jjiran"
                },
                {
                  "nl": "het park",
                  "article": "het",
                  "darija": "الجردة / البارك",
                  "darijaLat": "jjarda / lpark"
                },
                {
                  "nl": "Mooi weer, hè?",
                  "darija": "الجو زوين، ياك؟",
                  "darijaLat": "ljaw zwin, yak?"
                },
                {
                  "nl": "Dag buurman!",
                  "darija": "سلام جاري!",
                  "darijaLat": "salam jari!"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "niveau-2",
      "title": "Niveau 2",
      "titleDarija": "المستوى 2",
      "titleDarijaLat": "l-mostawa 2",
      "subtitle": "Dagelijks leven & leren typen",
      "subtitleDarijaLat": "L-7ayat l-yawmiya w t3ellom l-ktaba",
      "description": "Het leven thuis, kleding en weer, boodschappen en gevoelens — en je eerste typoefeningen.",
      "descriptionDarijaLat": "L-7ayat f-dar, l-7wayej w l-jaw, t-t9dya w l-i7sas, m3a awwel tamarin dyal l-ktaba.",
      "cefr": "A1.2",
      "icon": "🏠",
      "accent": "gent",
      "order": 2,
      "modules": [
        {
          "id": "2.1",
          "title": "Wonen & thuis",
          "titleDarija": "السكن والدار",
          "titleDarijaLat": "S-skan w d-dar",
          "lessons": [
            {
              "id": "2.1.1",
              "title": "In en om het huis",
              "titleDarija": "فالدار وداير بيها",
              "titleDarijaLat": "F-dar w dayr biha",
              "type": "vocab",
              "intro": "Nieuwe woorden voor ruimtes en spullen in huis.",
              "introDarijaLat": "Kelmat jdod dyal l-biyout w l-7wayej f-dar.",
              "items": [
                {
                  "nl": "zetel",
                  "article": "de",
                  "darija": "الفوتوي / السدّاري",
                  "darijaLat": "lfotoy / ssedari"
                },
                {
                  "nl": "televisie",
                  "article": "de",
                  "darija": "التلفزة",
                  "darijaLat": "ttelfaza"
                },
                {
                  "nl": "tapijt",
                  "article": "het",
                  "darija": "الزربية",
                  "darijaLat": "zzerbiya"
                },
                {
                  "nl": "sleutel",
                  "article": "de",
                  "darija": "الساروت",
                  "darijaLat": "ssarout"
                },
                {
                  "nl": "slaapkamer",
                  "article": "de",
                  "darija": "بيت النعاس",
                  "darijaLat": "bit nne3as"
                },
                {
                  "nl": "badkamer",
                  "article": "de",
                  "darija": "الحمام",
                  "darijaLat": "l7mmam"
                }
              ]
            },
            {
              "id": "2.1.2",
              "title": "Type-oefening: woorden thuis",
              "titleDarija": "تمرين فالكتابة: كلمات فالدار",
              "titleDarijaLat": "Tamrin f-lktaba: kelmat f-dar",
              "type": "typing",
              "intro": "Typ het Nederlandse woord correct over.",
              "introDarijaLat": "Ktbo l-kelma b-Nederlands bla ghalat.",
              "darijaNote": "كتبي الكلمة بالهولندية كيما راهي.",
              "darijaNoteLat": "Ktbo l-kelma b-Nederlands kima hiya.",
              "items": [
                {
                  "nl": "raam",
                  "answer": "raam",
                  "darija": "الشرجم",
                  "darijaLat": "chcherjem",
                  "tip": "Met een dubbele 'aa'."
                },
                {
                  "nl": "deur",
                  "answer": "deur",
                  "darija": "الباب",
                  "darijaLat": "lbab",
                  "tip": "Met de 'eu'-klank."
                },
                {
                  "nl": "huis",
                  "answer": "huis",
                  "darija": "الدار",
                  "darijaLat": "ddar",
                  "tip": "Met 'ui'."
                },
                {
                  "nl": "sleutel",
                  "answer": "sleutel",
                  "darija": "الساروت",
                  "darijaLat": "ssarout",
                  "tip": "Met de 'eu'-klank in het midden."
                }
              ]
            }
          ]
        },
        {
          "id": "2.2",
          "title": "Kleding & weer",
          "titleDarija": "الحوايج والجو",
          "titleDarijaLat": "L-7wayej w l-jaw",
          "lessons": [
            {
              "id": "2.2.1",
              "title": "Wat trek je aan?",
              "titleDarija": "شنو غادي تلبسي؟",
              "titleDarijaLat": "Chno ghadi tlbso?",
              "type": "vocab",
              "intro": "Kledingstukken voor elk weertype.",
              "introDarijaLat": "7wayej dyal l-lbas l-kol no3 dyal l-jaw.",
              "items": [
                {
                  "nl": "broek",
                  "article": "de",
                  "darija": "السروال",
                  "darijaLat": "sserwal"
                },
                {
                  "nl": "trui",
                  "article": "de",
                  "darija": "التريكو",
                  "darijaLat": "ttriko"
                },
                {
                  "nl": "schoenen",
                  "article": "de",
                  "darija": "الصباط",
                  "darijaLat": "ssebbat"
                },
                {
                  "nl": "jas",
                  "article": "de",
                  "darija": "الجاكيطة",
                  "darijaLat": "ljakita"
                },
                {
                  "nl": "paraplu",
                  "article": "de",
                  "darija": "المضلة",
                  "darijaLat": "lmdella"
                }
              ]
            },
            {
              "id": "2.2.2",
              "title": "Het weer in België",
              "titleDarija": "الجو فـ بلجيكا",
              "titleDarijaLat": "l-jw f Beljika",
              "type": "phrases",
              "intro": "Zinnen over het weer.",
              "introDarijaLat": "Jomal 3la l-jaw.",
              "items": [
                {
                  "nl": "Het is koud.",
                  "darija": "الجو بارد.",
                  "darijaLat": "ljaw bared."
                },
                {
                  "nl": "Het is warm.",
                  "darija": "الجو دافي.",
                  "darijaLat": "ljaw dafi."
                },
                {
                  "nl": "Het regent.",
                  "darija": "الشتا تصبّ.",
                  "darijaLat": "cchta tsebb."
                }
              ]
            },
            {
              "id": "2.2.3",
              "title": "Type-oefening: kleding & weer",
              "titleDarija": "تمرين فالكتابة: الحوايج والجو",
              "titleDarijaLat": "Tamrin f-lktaba: l-7wayej w l-jaw",
              "type": "typing",
              "intro": "Typ de woorden over kleding en weer.",
              "introDarijaLat": "Ktbo kelmat dyal l-7wayej w l-jaw.",
              "darijaNote": "كتبي الكلمات ديال الحوايج والجو.",
              "darijaNoteLat": "Ktbo l-kelmat dyal l-7wayej w l-jaw.",
              "items": [
                {
                  "nl": "jas",
                  "answer": "jas",
                  "darija": "الجاكيطة",
                  "darijaLat": "ljakita",
                  "tip": "Drie letters, begint met een 'j'."
                },
                {
                  "nl": "trui",
                  "answer": "trui",
                  "darija": "التريكو",
                  "darijaLat": "ttriko",
                  "tip": "Met 'ui'."
                },
                {
                  "nl": "broek",
                  "answer": "broek",
                  "darija": "السروال",
                  "darijaLat": "sserwal",
                  "tip": "Met 'oe'."
                },
                {
                  "nl": "koud",
                  "answer": "koud",
                  "darija": "بارد",
                  "darijaLat": "bared",
                  "tip": "Met 'ou'."
                }
              ]
            }
          ]
        },
        {
          "id": "2.3",
          "title": "Boodschappen & supermarkt",
          "titleDarija": "التقضية فالسوبيرمارشي",
          "titleDarijaLat": "T-t9dya f-supermarche",
          "lessons": [
            {
              "id": "2.3.1",
              "title": "Verpakkingen en winkelwoorden",
              "titleDarija": "التغليف وكلمات الحانوت",
              "titleDarijaLat": "t-tghlif w kelmat l-7anout",
              "type": "vocab",
              "intro": "Handige woorden voor in de winkel.",
              "introDarijaLat": "Kelmat mofida f-l7anout.",
              "items": [
                {
                  "nl": "blik",
                  "article": "het",
                  "darija": "البواطة",
                  "darijaLat": "lbwata"
                },
                {
                  "nl": "doos",
                  "article": "de",
                  "darija": "الصندوق / الكارطونة",
                  "darijaLat": "ssendouq / lkartona"
                },
                {
                  "nl": "korting",
                  "article": "de",
                  "darija": "تخفيض",
                  "darijaLat": "takhfid"
                },
                {
                  "nl": "rek",
                  "article": "het",
                  "darija": "الرّف",
                  "darijaLat": "rref"
                },
                {
                  "nl": "weegschaal",
                  "article": "de",
                  "darija": "الميزان",
                  "darijaLat": "lmizan"
                }
              ]
            },
            {
              "id": "2.3.2",
              "title": "Type-oefening: supermarkt",
              "titleDarija": "تمرين فالكتابة: السوبيرمارشي",
              "titleDarijaLat": "Tamrin f-lktaba: supermarche",
              "type": "typing",
              "intro": "Typ de winkelwoorden over.",
              "introDarijaLat": "Ktbo kelmat l-7anout.",
              "darijaNote": "كتبي كلمات الحانوت.",
              "darijaNoteLat": "Ktbo kelmat l-7anout.",
              "items": [
                {
                  "nl": "fles",
                  "answer": "fles",
                  "darija": "قرعة",
                  "darijaLat": "qer3a",
                  "tip": "Vier letters, begint met een 'f'."
                },
                {
                  "nl": "duur",
                  "answer": "duur",
                  "darija": "غالي",
                  "darijaLat": "ghali",
                  "tip": "Met een dubbele 'uu'."
                },
                {
                  "nl": "vers",
                  "answer": "vers",
                  "darija": "طري",
                  "darijaLat": "tri",
                  "tip": "Eindigt op 'rs'."
                }
              ]
            }
          ]
        },
        {
          "id": "2.4",
          "title": "Lichaam, gezondheid & gevoelens",
          "titleDarija": "البدن والصحة وكيفاش حاسة",
          "titleDarijaLat": "L-bdan, s-sa7a w kifach kat7ess",
          "lessons": [
            {
              "id": "2.4.1",
              "title": "Hoe voel je je?",
              "titleDarija": "كيفاش حاسة براسك؟",
              "titleDarijaLat": "Kifach kat7ess b-rask?",
              "type": "phrases",
              "intro": "Zinnen over emoties en hoe je je voelt.",
              "introDarijaLat": "Jomal 3la l-i7sas w kifach kat7esso.",
              "items": [
                {
                  "nl": "Ik ben moe.",
                  "darija": "راني عيانة.",
                  "darijaLat": "rani 3iyana."
                },
                {
                  "nl": "Ik ben blij.",
                  "darija": "راني فرحانة.",
                  "darijaLat": "rani fer7ana."
                },
                {
                  "nl": "Ik ben boos.",
                  "darija": "راني زعفانة.",
                  "darijaLat": "rani za3fana."
                },
                {
                  "nl": "Ik ben bang.",
                  "darija": "راني خايفة.",
                  "darijaLat": "rani khayfa."
                }
              ]
            },
            {
              "id": "2.4.2",
              "title": "Type-oefening: gevoelens & lichaam",
              "titleDarija": "تمرين فالكتابة: الإحساس والبدن",
              "titleDarijaLat": "Tamrin f-lktaba: l-i7sas w l-bdan",
              "type": "typing",
              "intro": "Typ de woorden over gezondheid en gevoelens.",
              "introDarijaLat": "Ktbo kelmat dyal s-sa7a w l-i7sas.",
              "darijaNote": "كتبي الكلمات ديال الإحساس والبدن.",
              "darijaNoteLat": "Ktbo l-kelmat dyal l-i7sas w l-bdan.",
              "items": [
                {
                  "nl": "moe",
                  "answer": "moe",
                  "darija": "عيانة",
                  "darijaLat": "3iyana",
                  "tip": "Met 'oe'."
                },
                {
                  "nl": "pijn",
                  "answer": "pijn",
                  "darija": "الوجع",
                  "darijaLat": "lwej3",
                  "tip": "Met 'ij'."
                },
                {
                  "nl": "rug",
                  "answer": "rug",
                  "darija": "الظهر",
                  "darijaLat": "ddher",
                  "tip": "Met korte 'u'."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const ALPHABET_NAMES = {
  A: 'aa', B: 'bee', C: 'cee', D: 'dee', E: 'ee', F: 'ef', G: 'gee',
  H: 'haa', I: 'ie', J: 'jee', K: 'kaa', L: 'el', M: 'em', N: 'en', O: 'oo',
  P: 'pee', Q: 'kuu', R: 'er', S: 'es', T: 'tee', U: 'uu', V: 'vee', W: 'wee',
  X: 'iks', Y: 'i-grec / Griekse ij', Z: 'zet',
}

const ALPHABET_SOUNDS = {
  A: 'In appel hoor je een korte a.',
  B: 'In bal hoor je b.',
  C: 'In cadeau klinkt c als k.',
  D: 'In deur hoor je d.',
  E: 'In eend hoor je ee.',
  F: 'In fiets hoor je f.',
  G: 'In geit hoor je g. Die kan per regio anders klinken.',
  H: 'In huis hoor je h.',
  I: 'In iglo hoor je een korte i.',
  J: 'In jas hoor je j.',
  K: 'In kat hoor je k.',
  L: 'In lamp hoor je l.',
  M: 'In maan hoor je m.',
  N: 'In neus hoor je n.',
  O: 'In oog hoor je oo.',
  P: 'In paard hoor je p. Deze klank is in Darija vaak minder vertrouwd.',
  Q: 'In quiz klinkt q als kw. Deze letter komt niet vaak voor.',
  R: 'In roos hoor je r. Verschillende Vlaamse r-klanken zijn goed.',
  S: 'In ster hoor je s.',
  T: 'In tafel hoor je t.',
  U: 'In uur hoor je uu.',
  V: 'In vis hoor je v. De uitspraak verschilt per regio.',
  W: 'In water hoor je een Nederlandse w.',
  X: 'In taxi staat x midden in het woord en klinkt hij als ks.',
  Y: 'In yoghurt klinkt y als j. De letter heet ook i-grec of Griekse ij.',
  Z: 'In zon hoor je z.',
}

const ALPHABET_SOUNDS_DARIJA = {
  A: 'F kelmet appel kaytsem3 a 9sira.', B: 'F kelmet bal kaytsem3 b.',
  C: 'F cadeau, C katnt9 b7al k.', D: 'F deur kaytsem3 d.', E: 'F eend kaytsem3 ee.',
  F: 'F fiets kaytsem3 f.', G: 'F geit kaytsem3 g. N-not9 kaykhtalef 7sab l-manta9a.',
  H: 'F huis kaytsem3 h.', I: 'F iglo kaytsem3 i 9sira.', J: 'F jas kaytsem3 j.',
  K: 'F kat kaytsem3 k.', L: 'F lamp kaytsem3 l.', M: 'F maan kaytsem3 m.',
  N: 'F neus kaytsem3 n.', O: 'F oog kaytsem3 oo.',
  P: 'F paard kaytsem3 p. Had s-sout momkin ykoun a9all ma3rouf f Darija.',
  Q: 'F quiz, Q katnt9 kw. Had l7arf ma kayjich bzaf.',
  R: 'F roos kaytsem3 r. Kaynin toro9 Vlaamse mokhtalfa w kolhom m9bolin.',
  S: 'F ster kaytsem3 s.', T: 'F tafel kaytsem3 t.', U: 'F uur kaytsem3 uu.',
  V: 'F vis kaytsem3 v. N-not9 kaykhtalef 7sab l-manta9a.',
  W: 'F water kaytsem3 w Nederlands.',
  X: 'F taxi, X kayna f west l-kelma w katnt9 ks.',
  Y: 'F yoghurt, Y katnt9 b7al j. Smit l7arf 7ta i-grec wela Griekse ij.',
  Z: 'F zon kaytsem3 z.',
}

function stripArabicFields(value) {
  if (Array.isArray(value)) return value.map(stripArabicFields)
  if (typeof value === 'string') return value.replace(/[\u0600-\u06ff]+/g, '').replace(/\s{2,}/g, ' ').trim()
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !/darija/i.test(key) || /darijaLat/i.test(key))
      .map(([key, child]) => [key, stripArabicFields(child)]),
  )
}

function alphabetLesson(source, displayId) {
  const lesson = stripArabicFields(source)
  return {
    ...lesson,
    displayId,
    type: LESSON_TYPES.ALPHABET,
    intro: 'Leer de naam van de letter, luister naar het voorbeeldwoord en kies daarna de juiste letter. Je wordt hier nooit automatisch afgekeurd.',
    introDarijaLat: 'T3ellmo smit l7arf, sm3o kelmet l-mital, w men be3d khtaro l7arf s7i7. Ma kayn 7ta rfos automatique hna.',
    items: lesson.items.map((item) => ({
      letter: item.nl,
      lowercase: item.nl.toLowerCase(),
      letterName: ALPHABET_NAMES[item.nl],
      letterNameHint: item.nl === 'C' ? 'klinkt als “see”' : '',
      letterNameHintDarijaLat: item.nl === 'C' ? 'kattsme3 b7al “see”' : '',
      exampleWord: item.word,
      exampleSound: ALPHABET_SOUNDS[item.nl],
      exampleSoundDarijaLat: ALPHABET_SOUNDS_DARIJA[item.nl],
      speakPrompt: `${item.nl} van ${item.word}`,
      icon: item.icon,
      darijaLat: item.darijaLat,
    })),
  }
}

function lessonPart(source, { id = source.id, displayId, title, titleDarijaLat, items, type = source.type, intro, introDarijaLat }) {
  return {
    ...stripArabicFields(source),
    id,
    displayId,
    title: title || source.title,
    titleDarijaLat: titleDarijaLat || source.titleDarijaLat,
    type,
    intro: intro || source.intro,
    introDarijaLat: introDarijaLat || source.introDarijaLat,
    items: stripArabicFields(items ?? source.items ?? []),
  }
}

function rebuildBeginnerRoute() {
  const level0 = curriculum.levels.find((level) => level.id === 'niveau-0')
  const level1 = curriculum.levels.find((level) => level.id === 'niveau-1')
  if (!level0 || !level1) return

  const oldModules = new Map(level0.modules.map((module) => [module.id, module]))
  const oldLessons = new Map(level0.modules.flatMap((module) => module.lessons.map((lesson) => [lesson.id, lesson])))
  const alphabetSources = ['0.0.1', '0.0.2', '0.0.3', '0.0.4', '0.0.5'].map((id) => oldLessons.get(id))
  const alphabetDisplayIds = ['0.2.2', '0.3.1', '0.4.1', '0.5.1', '0.6.1']
  const alphabetLessons = alphabetSources.map((lesson, index) => alphabetLesson(lesson, alphabetDisplayIds[index]))
  const alphabetItems = alphabetLessons.flatMap((lesson) => lesson.items)

  const yesNo = oldLessons.get('0.2.0')
  const greetings = oldLessons.get('0.2.1')
  const politeness = oldLessons.get('0.2.2')
  const numbers = oldLessons.get('0.3.1')
  const questions = oldLessons.get('0.4.1')
  const survival = oldLessons.get('0.6.1')
  const cognates = oldLessons.get('0.5.1')
  const listenPairs = oldLessons.get('0.1.0')
  const allowedPairs = new Set(['man|maan', 'bos|boos', 'pit|piet', 'zon|zoon', 'vis|vies', 'pen|ben', 'pak|bak'])

  const firstWords = {
    id: '0.start.1', displayId: '0.1.1', title: 'Je eerste vijf woorden',
    titleDarijaLat: 'Awwel khamsa d l-kelmat', type: LESSON_TYPES.VOCAB,
    intro: 'Begin met woorden die je vandaag meteen kunt gebruiken.',
    introDarijaLat: 'Bdao b kelmat li t9dro tst3mlohom lyoum.',
    listenFirst: true,
    items: [
      { nl: 'hallo', darijaLat: 'salam', icon: '👋' },
      { nl: 'dag', darijaLat: 'salam / bslama', icon: '🙂' },
      { nl: 'ja', darijaLat: 'iyyeh', icon: '✅' },
      { nl: 'nee', darijaLat: 'la', icon: '❌' },
      { nl: 'dank u', darijaLat: 'chokran', icon: '🙏' },
    ],
  }
  const overview = {
    id: '0.alphabet.overview', displayId: '0.2.1', title: 'Bekijk en beluister A tot Z',
    titleDarijaLat: 'Chofo w sm3o A 7tta Z', type: LESSON_TYPES.ALPHABET_OVERVIEW,
    intro: 'Dit is een eerste kennismaking. Je hoeft nog niets uit het hoofd te kennen.',
    introDarijaLat: 'Hadi ghir awwel m3rifa. Ma khasskom t7fdo walo daba.',
    items: alphabetItems,
    displayItemCount: 26,
  }
  const selfIntro = {
    id: '0.self.1', displayId: '0.3.2', title: 'Zeg wie je bent',
    titleDarijaLat: '3erfo b raskom', type: LESSON_TYPES.PHRASES,
    intro: 'Luister naar vier korte zinnen om jezelf voor te stellen.', introDarijaLat: 'Sm3o rb3a d jomal 9sar bach t3erfo b raskom.',
    items: [
      { nl: 'Ik heet …', darijaLat: 'Smiyti …' },
      { nl: 'Mijn naam is …', darijaLat: 'Smiti hiya …' },
      { nl: 'Hoe heet u?', darijaLat: 'Chno smitk?' },
      { nl: 'Aangenaam.', darijaLat: 'Mtcherfin.' },
    ],
  }
  const spellName = {
    id: '0.spell.1', displayId: '0.6.2', title: 'Spel je eigen naam',
    titleDarijaLat: 'Hajjio smitkom b l7orof', type: LESSON_TYPES.NAME_SPELLING,
    intro: 'Typ eerst je naam. Zeg daarna de letters rustig één voor één.',
    introDarijaLat: 'Ktbo smitkom luwel. Men be3d 9olo l7orof wa7ed b wa7ed.',
    items: alphabetItems,
    displayItemCount: 1,
  }

  const modules = [
    {
      id: '0.1', title: 'Meteen beginnen', titleDarijaLat: 'Bidaya daba', icon: '👋',
      goal: 'Vijf woorden gebruiken en zeggen wanneer je iets niet begrijpt.',
      goalDarijaLat: 'St3mlo khamsa d l-kelmat w 9olo ila ma fhemtouch.',
      lessons: [firstWords, lessonPart(survival, { displayId: '0.1.2' })],
    },
    {
      id: '0.2', title: 'Alfabet A tot E', titleDarijaLat: 'L7orof A 7tta E', icon: '🔤',
      goal: 'Het alfabet eerst bekijken en de eerste vijf letters herkennen.',
      goalDarijaLat: 'Chofo l7orof kamlin w t3erfo 3la awwel khamsa.',
      lessons: [overview, alphabetLessons[0]],
    },
    {
      id: '0.3', title: 'F tot J en jezelf voorstellen', titleDarijaLat: 'F 7tta J w ta3rif b n-nafs', icon: '🙋',
      goal: 'Vijf letters leren en je naam zeggen.', goalDarijaLat: 'T3ellmo khamsa d l7orof w 9olo smitkom.',
      lessons: [alphabetLessons[1], selfIntro],
    },
    {
      id: '0.4', title: 'K tot O en tellen tot vijf', titleDarijaLat: 'K 7tta O w l7sab 7tta khamsa', icon: '🖐️',
      goal: 'Vijf letters leren en de getallen 0 tot 5 gebruiken.',
      goalDarijaLat: 'T3ellmo khamsa d l7orof w st3mlo l-ar9am 0 7tta 5.',
      lessons: [alphabetLessons[2], lessonPart(numbers, { id: '0.3.1', displayId: '0.4.2', title: 'Tellen van 0 tot 5', titleDarijaLat: 'L7sab men 0 7tta 5', items: numbers.items.slice(0, 6) })],
    },
    {
      id: '0.5', title: 'Alfabet P tot T', titleDarijaLat: 'L7orof P 7tta T', icon: '✍️',
      goal: 'Vijf nieuwe letters herkennen, beluisteren en kiezen.',
      goalDarijaLat: 'T3erfo 3la khamsa d l7orof jdod, sm3ohom w khtarohom.',
      lessons: [alphabetLessons[3]],
    },
    {
      id: '0.6', title: 'U tot Z en tellen tot tien', titleDarijaLat: 'U 7tta Z w l7sab 7tta 3chra', icon: '🔡',
      goal: 'De laatste zes letters leren, je naam spellen en tellen van 6 tot 10.',
      goalDarijaLat: 'T3ellmo akher setta d l7orof, hajjio smitkom w 7sbo men 6 7tta 10.',
      lessons: [
        alphabetLessons[4],
        spellName,
        { ...lessonPart(numbers, { id: '0.3.1b', displayId: '0.6.3', title: 'Tellen van 6 tot 10', titleDarijaLat: 'L7sab men 6 7tta 10', items: numbers.items.slice(6, 11) }), legacyLessonIds: ['0.3.2'] },
      ],
    },
    {
      id: '0.7', title: 'Praten in het dagelijks leven', titleDarijaLat: 'Lhdra f l7ayat lyoumiya', icon: '💬',
      goal: 'Groeten, beleefd antwoorden en eenvoudige vragen begrijpen.',
      goalDarijaLat: 'T7iya, jawabat b adab w fahm dyal as2ila sahlin.',
      lessons: [
        lessonPart(greetings, { displayId: '0.7.1', items: greetings.items.slice(0, 5) }),
        lessonPart(greetings, { id: '0.2.1b', displayId: '0.7.2', title: 'Afscheid nemen', titleDarijaLat: '9olo bslama', items: greetings.items.slice(5, 8) }),
        lessonPart(greetings, { id: '0.2.1c', displayId: '0.7.3', title: 'Welkom: hoe gaat het?', titleDarijaLat: 'Mar7ba: kif dayrin?', items: greetings.items.slice(8) }),
        { ...lessonPart(politeness, { displayId: '0.7.4', items: politeness.items.slice(0, 6) }), legacyLessonIds: ['0.2.3'] },
        lessonPart(politeness, { id: '0.2.2b', displayId: '0.7.5', title: 'Nog meer beleefde woorden', titleDarijaLat: 'Kelmat zyada b adab', items: politeness.items.slice(6) }),
        lessonPart(questions, { displayId: '0.7.6', items: [questions.items[1], questions.items[2], questions.items[0], questions.items[4], { nl: 'Hoeveel?', darijaLat: 'Ch7al?' }] }),
        lessonPart(yesNo, { displayId: '0.7.7', items: yesNo.items.slice(0, 6) }),
        lessonPart(cognates, { displayId: '0.7.8' }),
      ],
    },
    {
      id: '0.8', title: 'Extra uitspraak', titleDarijaLat: 'N-not9 zyada', icon: '👂',
      goal: 'Alleen na de basis: luister naar enkele belangrijke klankverschillen.',
      goalDarijaLat: 'Ghir men be3d l-asas: sm3o chi forou9 mohimma f n-not9.',
      optional: true,
      lessons: [{ ...lessonPart(listenPairs, {
        displayId: '0.8.1', title: 'Luister naar echte klankparen', titleDarijaLat: 'Sm3o lforou9 bin l-kelmat',
        items: listenPairs.items
          .filter((item) => allowedPairs.has(`${item.nl}|${item.pair}`))
          .slice(0, 6)
          .map((item) => ({
            ...item,
            tip: item.nl === 'pen'
              ? 'De lipstand blijft gelijk: p is zonder stem en met meer lucht; b is met stem.'
              : `${item.nl}/${item.pair}: de klinkerkwaliteit verandert en meestal ook de duur.`,
            tipDarijaLat: item.nl === 'pen'
              ? 'Chfayef kayb9aw kifkif: p bla sout w b hwa kter; b m3a sout.'
              : `F ${item.nl}/${item.pair}, naw3 s-sout kaytbddel w ghaliban 7ta t-toul.`,
            noSlowAudio: true,
          })),
        intro: 'Telkens verandert één belangrijk klankkenmerk. Bij de klinkerparen veranderen de klankkwaliteit en vaak de duur; bij pen–ben vooral stem en lucht.',
        introDarijaLat: 'Kol marra kaytbddel wa7ed lfar9 mohim. F l7orof ssawtiya kaytbddel naw3 s-sout w ghaliban t-toul; f pen-ben lfar9 f s-sout w l-hwa.',
      }), legacyLessonIds: ['0.1.1', '0.1.2', '0.1.3', '0.1.4'] }],
    },
  ]

  level0.titleDarijaLat = 'Niveau 0'
  delete level0.titleDarija
  level0.subtitle = 'Eerste woorden, alfabet & praktische basis'
  level0.subtitleDarijaLat = 'Awwel kelmat, l7orof w l-asas l3amali'
  level0.description = 'Een rustige route voor wie nog geen Nederlands kent: eerst bruikbare woorden, daarna het alfabet in kleine stappen.'
  level0.descriptionDarijaLat = 'Tri9a b chwia llli mazal ma kay3refch Nederlands: kelmat mofida luwel, w men be3d l7orof b khotwat sghar.'
  level0.modules = modules

  const movedModule = {
    id: '1.0', title: 'Uitbreiding na niveau 0', titleDarijaLat: 'Ziyada men be3d niveau 0',
    goal: 'Tellen tot twintig en woorden voor in en om het huis.',
    goalDarijaLat: 'L7sab 7tta 20 w kelmat dyal ddar w 7daha.', icon: '🏠',
    lessons: [
      lessonPart(numbers, { id: '1.0.1', displayId: '1.0.1', title: 'Tellen van 11 tot 20', titleDarijaLat: 'L7sab men 11 7tta 20', items: numbers.items.slice(11) }),
      { ...lessonPart(oldLessons.get('0.4.2'), { id: '1.0.2', displayId: '1.0.2' }), legacyLessonIds: ['0.4.2', '0.4.3'] },
    ],
  }
  level1.modules = [movedModule, ...level1.modules.filter((module) => module.id !== movedModule.id)]
  curriculum.meta.version = '0.2.0-workversion'
}

rebuildBeginnerRoute()

export function countLessons(level) {
  return level.modules.reduce((sum, module) => sum + (module.optional ? 0 : module.lessons.length), 0)
}

export function allLessonIds(level) {
  return level.modules.filter((module) => !module.optional).flatMap((module) => module.lessons.map((lesson) => lesson.id))
}

export function getLevel(id) {
  return curriculum.levels.find((l) => l.id === id)
}

export default curriculum
