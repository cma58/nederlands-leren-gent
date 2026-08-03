export const LESSON_TYPES = {
  PHONETICS: 'phonetics',
  VOCAB: 'vocab',
  PHRASES: 'phrases',
  NUMBERS: 'numbers',
  GRAMMAR: 'grammar',
  SPEAKING: 'speaking',
  QUIZ: 'quiz',
  LISTEN: 'listen',
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
      "subtitle": "Absolute basis & fonetiek",
      "description": "De klanken, de begroetingen, de getallen en je eerste woorden. De perfecte start als je nog geen Nederlands kent.",
      "cefr": null,
      "icon": "🔤",
      "accent": "gent",
      "modules": [
        {
          "id": "0.0",
          "title": "Het Alfabet & De Klanken",
          "titleDarija": "الأبجدية والأصوات",
          "goal": "De letters A t/m Z leren herkennen én actief uitspreken.",
          "icon": "🔡",
          "lessons": [
            {
              "id": "0.0.1",
              "title": "Het alfabet: A – E",
              "titleDarija": "الأبجدية: A – E",
              "type": "speaking",
              "intro": "Zeg elke letter hardop met het voorbeeldwoord (\"A van appel\"). Luister eerst, spreek dan zelf in.",
              "darijaNote": "قولي كل حرف بصوت عالي مع الكلمة ديالو. سمعي الأول، ومن بعد سجلي.",
              "items": [
                {
                  "nl": "A",
                  "word": "appel",
                  "icon": "🍎",
                  "darija": "تفاحة",
                  "darijaLat": "teffaha",
                  "tip": "Mond wijd open, heldere \"a\".",
                  "answer": "appel"
                },
                {
                  "nl": "B",
                  "word": "bal",
                  "icon": "⚽",
                  "darija": "كورة",
                  "darijaLat": "koura",
                  "tip": "Lippen samen mét stem (voel je keel trillen). Verschil met de P.",
                  "answer": "bal"
                },
                {
                  "nl": "C",
                  "word": "cadeau",
                  "icon": "🎁",
                  "darija": "كادو",
                  "darijaLat": "kadou",
                  "tip": "De C klinkt hier als \"k\". Voor e/i klinkt ze als \"s\".",
                  "answer": "cadeau"
                },
                {
                  "nl": "D",
                  "word": "deur",
                  "icon": "🚪",
                  "darija": "باب",
                  "darijaLat": "bab",
                  "tip": "Tongpunt tegen de boventanden, mét stem.",
                  "answer": "deur"
                },
                {
                  "nl": "E",
                  "word": "eend",
                  "icon": "🦆",
                  "darija": "بطة",
                  "darijaLat": "betta",
                  "tip": "De letter E en \"eend\" hebben een lange \"ee\" (zoals in \"zee\").",
                  "answer": "eend"
                }
              ]
            },
            {
              "id": "0.0.2",
              "title": "Het alfabet: F – J",
              "titleDarija": "الأبجدية: F – J",
              "type": "speaking",
              "intro": "Luister, kijk naar de mondstand-tip en spreek elke letter met het woord in.",
              "darijaNote": "سمعي، شوفي كيفاش خاص الفم يتحرك، وقولي كل حرف مع الكلمة.",
              "items": [
                {
                  "nl": "F",
                  "word": "fiets",
                  "icon": "🚲",
                  "darija": "بيسكليت",
                  "darijaLat": "bisklit",
                  "tip": "Boventanden op de onderlip, blazen zonder stem. Verschil met de V.",
                  "answer": "fiets"
                },
                {
                  "nl": "G",
                  "word": "geit",
                  "icon": "🐐",
                  "darija": "معزة",
                  "darijaLat": "m3iza",
                  "tip": "In Vlaanderen/Gent is de \"g\" zacht (bijna een «h», /ɣ/). De harde keel-«g» zoals «خ» hoor je in Nederland.",
                  "answer": "geit"
                },
                {
                  "nl": "H",
                  "word": "huis",
                  "icon": "🏠",
                  "darija": "دار",
                  "darijaLat": "dar",
                  "tip": "Zachte adem uit de keel, zoals de «ه».",
                  "answer": "huis"
                },
                {
                  "nl": "I",
                  "word": "iglo",
                  "icon": "🛖",
                  "darija": "إغلو",
                  "darijaLat": "iglou",
                  "tip": "Korte, korte \"i\".",
                  "answer": "iglo"
                },
                {
                  "nl": "J",
                  "word": "jas",
                  "icon": "🧥",
                  "darija": "جاكيطة",
                  "darijaLat": "jakita",
                  "tip": "De J klinkt als de «ي» (zoals \"ya\").",
                  "answer": "jas"
                }
              ]
            },
            {
              "id": "0.0.3",
              "title": "Het alfabet: K – O",
              "titleDarija": "الأبجدية: K – O",
              "type": "speaking",
              "intro": "Zeg elke letter met het voorbeeldwoord. De app luistert en helpt je.",
              "darijaNote": "قولي كل حرف مع الكلمة. التطبيق كيسمع ليك وكيعاونك.",
              "items": [
                {
                  "nl": "K",
                  "word": "kat",
                  "icon": "🐱",
                  "darija": "قطة",
                  "darijaLat": "qetta",
                  "tip": "Klank achter in de mond, zoals de «ك».",
                  "answer": "kat"
                },
                {
                  "nl": "L",
                  "word": "lamp",
                  "icon": "💡",
                  "darija": "اللمبة",
                  "darijaLat": "lamba",
                  "tip": "Tongpunt achter de boventanden.",
                  "answer": "lamp"
                },
                {
                  "nl": "M",
                  "word": "maan",
                  "icon": "🌙",
                  "darija": "قمر",
                  "darijaLat": "qamar",
                  "tip": "Lippen samen, neusklank, zoals de «م».",
                  "answer": "maan"
                },
                {
                  "nl": "N",
                  "word": "neus",
                  "icon": "👃",
                  "darija": "نيف",
                  "darijaLat": "nif",
                  "tip": "Tong achter de tanden, neusklank, zoals de «ن».",
                  "answer": "neus"
                },
                {
                  "nl": "O",
                  "word": "oog",
                  "icon": "👁️",
                  "darija": "عين",
                  "darijaLat": "3in",
                  "tip": "Ronde lippen, volle \"o\".",
                  "answer": "oog"
                }
              ]
            },
            {
              "id": "0.0.4",
              "title": "Het alfabet: P – T",
              "titleDarija": "الأبجدية: P – T",
              "type": "speaking",
              "intro": "Let goed op de P: die bestaat niet in het Darija. Luister en oefen.",
              "darijaNote": "ردي بالك للحرف P: ما كاينش فالدارجة. سمعي وتمرني.",
              "items": [
                {
                  "nl": "P",
                  "word": "paard",
                  "icon": "🐴",
                  "darija": "حصان",
                  "darijaLat": "7san",
                  "tip": "Lippen samen én een pufje lucht, zonder stem. De P bestaat niet in het Darija!",
                  "answer": "paard"
                },
                {
                  "nl": "Q",
                  "word": "quiz",
                  "icon": "❓",
                  "darija": "كويز",
                  "darijaLat": "kwiz",
                  "tip": "De Q klinkt als \"kw\". Komt zelden voor.",
                  "answer": "quiz"
                },
                {
                  "nl": "R",
                  "word": "roos",
                  "icon": "🌹",
                  "darija": "وردة",
                  "darijaLat": "warda",
                  "tip": "Rollende tong-r of een lichte keel-r.",
                  "answer": "roos"
                },
                {
                  "nl": "S",
                  "word": "ster",
                  "icon": "⭐",
                  "darija": "نجمة",
                  "darijaLat": "nejma",
                  "tip": "Sissende \"s\", zoals de «س».",
                  "answer": "ster"
                },
                {
                  "nl": "T",
                  "word": "tafel",
                  "icon": "🪑",
                  "darija": "طبلة",
                  "darijaLat": "tebla",
                  "tip": "Tongpunt tegen de tanden, zonder stem.",
                  "answer": "tafel"
                }
              ]
            },
            {
              "id": "0.0.5",
              "title": "Het alfabet: U – Z",
              "titleDarija": "الأبجدية: U – Z",
              "type": "speaking",
              "intro": "De laatste letters. Let op de U en de V — die zijn lastig voor Darija-sprekers.",
              "darijaNote": "هادو هما الحروف الأخيرة. ردي بالك لـ U وV، حيت يقدرو يكونو صعاب على اللي كيهضرو بالدارجة.",
              "items": [
                {
                  "nl": "U",
                  "word": "uur",
                  "icon": "⏰",
                  "darija": "ساعة",
                  "darijaLat": "sa3a",
                  "tip": "Ronde lippen zoals bij «oe», maar zeg «i». Bestaat niet in het Darija.",
                  "answer": "uur"
                },
                {
                  "nl": "V",
                  "word": "vis",
                  "icon": "🐟",
                  "darija": "حوت",
                  "darijaLat": "7out",
                  "tip": "Zoals de F, maar mét een beetje stem. In Vlaanderen zacht.",
                  "answer": "vis"
                },
                {
                  "nl": "W",
                  "word": "water",
                  "icon": "💧",
                  "darija": "الما",
                  "darijaLat": "lma",
                  "tip": "Ronde lippen, zoals de «و».",
                  "answer": "water"
                },
                {
                  "nl": "X",
                  "word": "taxi",
                  "icon": "🚕",
                  "darija": "طاكسي",
                  "darijaLat": "taxi",
                  "tip": "De X klinkt als \"ks\". Zeldzaam in het Nederlands.",
                  "answer": "taxi"
                },
                {
                  "nl": "Y",
                  "word": "yoghurt",
                  "icon": "🥛",
                  "darija": "ياغورت",
                  "darijaLat": "yaghourt",
                  "tip": "De Y klinkt hier als \"j\" (zoals «ي»).",
                  "answer": "yoghurt"
                },
                {
                  "nl": "Z",
                  "word": "zon",
                  "icon": "☀️",
                  "darija": "شمس",
                  "darijaLat": "chems",
                  "tip": "Zoemende \"s\" mét stem, zoals de «ز».",
                  "answer": "zon"
                }
              ]
            }
          ]
        },
        {
          "id": "0.1",
          "title": "Klankleer & uitspraak",
          "goal": "De Nederlandse klanken herkennen en uitspreken — met tips voor Darija-sprekers.",
          "icon": "🗣️",
          "lessons": [
            {
              "id": "0.1.0",
              "title": "Luister: welk woord hoor je?",
              "titleDarija": "سمعي: أشمن كلمة سمعتي؟",
              "type": "listen",
              "intro": "Eerst leren hóren, dan pas zelf zeggen. Luister en kies het juiste woord.",
              "darijaNote": "الأول تعلمي تسمعي الفرق، ومن بعد تنطقي. سمعي وختاري الكلمة الصحيحة.",
              "items": [
                {
                  "nl": "man",
                  "pair": "maan",
                  "tip": "Kort \"a\" vs. lange \"aa\"."
                },
                {
                  "nl": "bos",
                  "pair": "boos",
                  "tip": "Korte \"o\" vs. lange \"oo\"."
                },
                {
                  "nl": "pit",
                  "pair": "piet",
                  "tip": "Korte \"i\" vs. lange \"ie\"."
                },
                {
                  "nl": "bus",
                  "pair": "buur",
                  "tip": "Korte \"u\" vs. lange \"uu\"."
                },
                {
                  "nl": "zon",
                  "pair": "zoon",
                  "tip": "Kort \"o\" vs. lang \"oo\"."
                },
                {
                  "nl": "vis",
                  "pair": "vies",
                  "tip": "Kort \"i\" vs. lange \"ie\"."
                },
                {
                  "nl": "pen",
                  "pair": "ben",
                  "tip": "P (stemloos) vs. B (stemhebbend)."
                },
                {
                  "nl": "fee",
                  "pair": "vee",
                  "tip": "F vs. V."
                }
              ]
            },
            {
              "id": "0.1.1",
              "title": "Korte vs. lange klinkers",
              "type": "speaking",
              "intro": "In het Nederlands verandert de betekenis van een woord als een klinker kort of lang is. Luister goed naar het verschil.",
              "darijaNote": "الفرق بين الصوت القصير والصوت الطويل يقدر يبدل معنى الكلمة بالهولندية.",
              "items": [
                {
                  "nl": "man",
                  "pair": "maan",
                  "ipa": "/mɑn/ – /maːn/",
                  "tip": "Kort \"a\" zoals in Darija «مانا»; lange \"aa\" houd je langer aan.",
                  "darijaLat": "rajel — qamar",
                  "darija": "راجل — قمر"
                },
                {
                  "nl": "bos",
                  "pair": "boos",
                  "ipa": "/bɔs/ – /boːs/",
                  "tip": "Korte \"o\" is open; lange \"oo\" is ronder en langer.",
                  "darijaLat": "ghaba — ghadban",
                  "darija": "غابة — غضبان"
                },
                {
                  "nl": "pit",
                  "pair": "piet",
                  "ipa": "/pɪt/ – /pit/",
                  "tip": "Korte \"i\" ligt tussen i en e; lange \"ie\" is een heldere «i»."
                },
                {
                  "nl": "bus",
                  "pair": "buur",
                  "ipa": "/bʏs/ – /byːr/",
                  "tip": "De \"u\" bestaat niet in Darija: rond je lippen als bij «oe» maar zeg «i»."
                },
                {
                  "nl": "les",
                  "pair": "lees",
                  "ipa": "/lɛs/ – /leːs/",
                  "tip": "Korte \"e\" zoals in «best»; lange \"ee\" langer aanhouden."
                },
                {
                  "nl": "zon",
                  "pair": "zoon",
                  "ipa": "/zɔn/ – /zoːn/",
                  "tip": "Korte \"o\" (zon = شمس) vs. lange \"oo\" (zoon = الولد).",
                  "darija": "شمس — ولد",
                  "darijaLat": "chems — weld"
                },
                {
                  "nl": "tak",
                  "pair": "taak",
                  "ipa": "/tɑk/ – /taːk/",
                  "tip": "tak = فرع, taak = مهمة. De \"aa\" is duidelijk langer.",
                  "darija": "فرع — مهمة",
                  "darijaLat": "fer3 — mohimma"
                },
                {
                  "nl": "vis",
                  "pair": "vies",
                  "ipa": "/vɪs/ – /vis/",
                  "tip": "vis = حوت, vies = موسخ. Korte \"i\" vs. heldere \"ie\".",
                  "darija": "حوت — موسخ",
                  "darijaLat": "hout — mwsekh"
                },
                {
                  "nl": "bom",
                  "pair": "boom",
                  "ipa": "/bɔm/ – /boːm/",
                  "tip": "bom = قنبلة, boom = شجرة.",
                  "darija": "قنبلة — شجرة",
                  "darijaLat": "qonbola — chajra"
                },
                {
                  "nl": "pot",
                  "pair": "poot",
                  "ipa": "/pɔt/ – /poːt/",
                  "tip": "pot = طنجرة, poot = رجل الحيوان.",
                  "darija": "طنجرة — رجل",
                  "darijaLat": "tenjra — rjel"
                },
                {
                  "nl": "rok",
                  "pair": "rook",
                  "ipa": "/rɔk/ – /roːk/",
                  "tip": "rok = تنورة, rook = دخان.",
                  "darija": "جيبة — دخان",
                  "darijaLat": "jiba — dokhan"
                }
              ]
            },
            {
              "id": "0.1.2",
              "title": "Lange klinkers & tweeklanken",
              "titleDarija": "الحروف الطويلة والمركّبة",
              "type": "speaking",
              "intro": "Sommige klinkers zijn lang (ie, oe, eu), andere smelten samen tot één klank — een echte tweeklank (ui, ij/ei, ou/au). Let goed op de stand van je mond.",
              "darijaNote": "الأصوات المركبة ما كايناش بنفس الشكل فالدارجة، لذلك ركزي مزيان على حركة الفم.",
              "items": [
                {
                  "nl": "huis",
                  "ipa": "/hœys/",
                  "tip": "\"ui\": begin met «a» en glijd naar «u». Rond je lippen op het einde.",
                  "darija": "دار",
                  "darijaLat": "dar"
                },
                {
                  "nl": "deur",
                  "ipa": "/døːr/",
                  "tip": "\"eu\": zeg «ee» maar met ronde lippen, zoals bij «oe».",
                  "darija": "باب",
                  "darijaLat": "bab"
                },
                {
                  "nl": "niet",
                  "ipa": "/nit/",
                  "tip": "\"ie\": een lange, heldere «i» zoals in het Arabische «ي».",
                  "darija": "ماشي",
                  "darijaLat": "machi"
                },
                {
                  "nl": "trein",
                  "pair": "tijd",
                  "ipa": "/trɛin/ – /tɛit/",
                  "tip": "\"ei\" en \"ij\" klinken hetzelfde: begin bij «e» en glijd naar «i»."
                },
                {
                  "nl": "boek",
                  "ipa": "/buk/",
                  "tip": "\"oe\" is als de Arabische «و» in «نور».",
                  "darija": "كتاب",
                  "darijaLat": "ktab"
                },
                {
                  "nl": "koud",
                  "pair": "blauw",
                  "ipa": "/kɑut/ – /blɑu/",
                  "tip": "\"ou\" en \"au\" klinken hetzelfde: «a» die naar «u» glijdt."
                },
                {
                  "nl": "tuin",
                  "ipa": "/tœyn/",
                  "tip": "\"ui\" opnieuw: van «a» naar «u» met ronde lippen.",
                  "darija": "جردة",
                  "darijaLat": "jarda"
                },
                {
                  "nl": "neus",
                  "ipa": "/nøːs/",
                  "tip": "\"eu\": «ee» met ronde lippen.",
                  "darija": "نيف",
                  "darijaLat": "nif"
                },
                {
                  "nl": "vier",
                  "ipa": "/vir/",
                  "tip": "\"ie\": lange heldere «i».",
                  "darija": "ربعة",
                  "darijaLat": "reb3a"
                },
                {
                  "nl": "klein",
                  "ipa": "/klɛin/",
                  "tip": "\"ei\": van «e» naar «i».",
                  "darija": "صغير",
                  "darijaLat": "sghir"
                },
                {
                  "nl": "goed",
                  "ipa": "/ɣut/",
                  "tip": "\"oe\" zoals de Arabische «و».",
                  "darija": "مزيان",
                  "darijaLat": "mzyan"
                },
                {
                  "nl": "vrouw",
                  "ipa": "/vrɑu/",
                  "tip": "\"ou\": «a» die naar «u» glijdt.",
                  "darija": "مرا",
                  "darijaLat": "mra"
                }
              ]
            },
            {
              "id": "0.1.3",
              "title": "Moeilijke medeklinkers (P/B, F/V, G/CH)",
              "type": "speaking",
              "intro": "Sommige medeklinkers zijn lastig omdat ze in het Darija niet (zo) bestaan. Oefen ze met minimale paren.",
              "darijaNote": "الحرف P ما كاينش فالدارجة، وكيقدر يخرج بحال B. ركزي على الفرق باش الكلمة تبان مفهومة.",
              "items": [
                {
                  "nl": "pen",
                  "pair": "ben",
                  "ipa": "/pɛn/ – /bɛn/",
                  "tip": "P is stemloos (geen trilling in de keel), B is stemhebbend. Leg je hand op je keel om te voelen."
                },
                {
                  "nl": "pak",
                  "pair": "bak",
                  "ipa": "/pɑk/ – /bɑk/",
                  "tip": "Blaas een klein beetje lucht bij de \"p\", niet bij de \"b\"."
                },
                {
                  "nl": "fee",
                  "pair": "vee",
                  "ipa": "/feː/ – /veː/",
                  "tip": "F is stemloos, V is licht stemhebbend. In Vlaanderen liggen ze dicht bij elkaar."
                },
                {
                  "nl": "gaan",
                  "ipa": "/ɣaːn/",
                  "tip": "In Vlaanderen is de \"g\" zacht /ɣ/ (bijna een «h»). In Nederland is het een harde keelklank zoals «خ».",
                  "darija": "بحال الصوت خ فـ خبز",
                  "darijaLat": "kh zoals in khobz"
                },
                {
                  "nl": "lachen",
                  "ipa": "/ˈlɑxə(n)/",
                  "tip": "\"ch\" = dezelfde keelklank als «خ». In Gent iets zachter dan in Nederland."
                },
                {
                  "nl": "peer",
                  "pair": "beer",
                  "ipa": "/peːr/ – /beːr/",
                  "tip": "peer = لنجاصة (blaas lucht), beer = دب (geen lucht).",
                  "darija": "لنجاصة",
                  "darijaLat": "lenjassa"
                },
                {
                  "nl": "vel",
                  "pair": "fel",
                  "ipa": "/vɛl/ – /fɛl/",
                  "tip": "vel = جلد (licht stemhebbend), fel = قوي (stemloos).",
                  "darija": "الجلد",
                  "darijaLat": "jeld"
                },
                {
                  "nl": "vaas",
                  "ipa": "/vaːs/",
                  "tip": "Begin zacht met de \"v\", niet als een \"f\".",
                  "darija": "فازة / مزهرية",
                  "darijaLat": "vaza / mezhariya"
                },
                {
                  "nl": "school",
                  "ipa": "/sxoːl/",
                  "tip": "\"sch\" = «s» + keelklank «خ». Vlaams vaak zachter.",
                  "darija": "المدرسة",
                  "darijaLat": "lmadrasa"
                },
                {
                  "nl": "nacht",
                  "ipa": "/nɑxt/",
                  "tip": "\"cht\" = keelklank «خ» + t.",
                  "darija": "الليل",
                  "darijaLat": "lil"
                }
              ]
            }
          ]
        },
        {
          "id": "0.2",
          "title": "Begroetingen & beleefdheid",
          "goal": "Iemand groeten en beleefd reageren in het dagelijks leven.",
          "icon": "👋",
          "lessons": [
            {
              "id": "0.2.1",
              "title": "Groeten",
              "type": "vocab",
              "intro": "Zo begroet je mensen in Gent, van formeel tot informeel.",
              "items": [
                {
                  "nl": "Hallo",
                  "darija": "السلام",
                  "darijaLat": "salam",
                  "tip": "Neutraal, altijd goed."
                },
                {
                  "nl": "Dag",
                  "darija": "سلام",
                  "darijaLat": "salam",
                  "tip": "Kan zowel \"hallo\" als \"tot ziens\" betekenen."
                },
                {
                  "nl": "Goedemorgen",
                  "darija": "صباح الخير",
                  "darijaLat": "sbah lkhir",
                  "tip": "Tot ongeveer 12u."
                },
                {
                  "nl": "Goedemiddag",
                  "darija": "مسا الخير",
                  "darijaLat": "msa lkhir",
                  "tip": "Overdag, na de middag. Het Darija maakt geen apart onderscheid met de avond."
                },
                {
                  "nl": "Goedenavond",
                  "darija": "مسا الخير",
                  "darijaLat": "msa lkhir",
                  "tip": "'s Avonds."
                },
                {
                  "nl": "Tot ziens",
                  "darija": "بسلامة",
                  "darijaLat": "bslama",
                  "tip": "Bij het afscheid."
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
                  "tip": "Als je elkaar later dezelfde dag weer ziet."
                },
                {
                  "nl": "Welkom",
                  "darija": "مرحبا",
                  "darijaLat": "marhba"
                },
                {
                  "nl": "Hoe gaat het?",
                  "darija": "لاباس؟ / كي داير؟ / كي دايرة؟",
                  "darijaLat": "labas? / ki dayer? / ki dayra?",
                  "tip": "De gewone vraag \"hoe gaat het\"."
                },
                {
                  "nl": "Goed, dank u.",
                  "darija": "لاباس، شكرا",
                  "darijaLat": "labas, choukran",
                  "tip": "Het antwoord op \"hoe gaat het?\"."
                }
              ]
            },
            {
              "id": "0.2.2",
              "title": "Beleefdheid",
              "type": "vocab",
              "intro": "Beleefde woorden die je elke dag nodig hebt.",
              "items": [
                {
                  "nl": "Alstublieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak",
                  "tip": "Formeel (met \"u\")."
                },
                {
                  "nl": "Alsjeblieft",
                  "darija": "عافاك",
                  "darijaLat": "3afak",
                  "tip": "Informeel (met \"je\"). Ook: \"hier je\" als je iets geeft."
                },
                {
                  "nl": "Dank u wel",
                  "darija": "شكرا",
                  "darijaLat": "choukran",
                  "tip": "Formeel bedanken."
                },
                {
                  "nl": "Dank je wel",
                  "darija": "شكرا بزاف",
                  "darijaLat": "choukran bezzaf",
                  "tip": "Informeel bedanken."
                },
                {
                  "nl": "Graag gedaan",
                  "darija": "مرحبا",
                  "darijaLat": "marhba",
                  "tip": "Antwoord op \"dank u\"."
                },
                {
                  "nl": "Sorry",
                  "darija": "سمح ليا",
                  "darijaLat": "smeh liya"
                },
                {
                  "nl": "Pardon",
                  "darija": "سمح ليا",
                  "darijaLat": "smeh liya",
                  "tip": "Om langs iemand te gaan of iets te vragen."
                },
                {
                  "nl": "Merci",
                  "darija": "شكرا",
                  "darijaLat": "choukran",
                  "tip": "In Gent zeggen mensen heel vaak \"merci\" voor \"dank je\"."
                },
                {
                  "nl": "Excuseer",
                  "darija": "سمح ليا",
                  "darijaLat": "smeh liya",
                  "tip": "Typisch Vlaams voor \"sorry\" of \"excuseer me\"."
                },
                {
                  "nl": "Mag ik?",
                  "darija": "واش نقدر؟",
                  "darijaLat": "wach nqder?",
                  "tip": "Om beleefd iets te vragen."
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
              "type": "speaking",
              "intro": "Zeg de begroetingen en beleefde woorden hardop. Luister eerst, spreek dan na.",
              "darijaNote": "قولي التحيات وكلمات الأدب بصوت عالي. سمعي الأول، ومن بعد عاودي.",
              "items": [
                {
                  "nl": "Hallo",
                  "darija": "السلام",
                  "darijaLat": "salam"
                },
                {
                  "nl": "Goedemorgen",
                  "darija": "صباح الخير",
                  "darijaLat": "sbah lkhir"
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
                  "darijaLat": "smeh liya"
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
          "goal": "Tot twintig tellen en getallen herkennen.",
          "icon": "🔢",
          "lessons": [
            {
              "id": "0.3.1",
              "title": "Tellen van 0 tot 20",
              "type": "numbers",
              "intro": "Luister en spreek elk getal na. Let op: \"twaalf\" en \"dertien\" klinken anders dan je denkt.",
              "items": [
                {
                  "nl": "nul",
                  "value": 0,
                  "darija": "صفر",
                  "darijaLat": "sifr"
                },
                {
                  "nl": "een",
                  "value": 1,
                  "darija": "واحد",
                  "darijaLat": "wahed"
                },
                {
                  "nl": "twee",
                  "value": 2,
                  "darija": "جوج",
                  "darijaLat": "jouj"
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
                  "darijaLat": "hdach"
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
                  "darijaLat": "teltach"
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
              "type": "speaking",
              "intro": "Zeg elk getal hardop. Je ziet het cijfer en het woord.",
              "darijaNote": "قولي كل رقم بصوت عالي. غادي تشوفي الرقم والكلمة.",
              "items": [
                {
                  "nl": "nul",
                  "value": 0,
                  "darija": "صفر",
                  "darijaLat": "sifr"
                },
                {
                  "nl": "een",
                  "value": 1,
                  "darija": "واحد",
                  "darijaLat": "wahed"
                },
                {
                  "nl": "twee",
                  "value": 2,
                  "darija": "جوج",
                  "darijaLat": "jouj"
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
          "goal": "De basisvraagwoorden en woorden in en om het huis.",
          "icon": "🏠",
          "lessons": [
            {
              "id": "0.4.1",
              "title": "Vraagwoorden",
              "type": "vocab",
              "intro": "Met deze woorden stel je je eerste vragen.",
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
                  "darijaLat": "chnou?",
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
                  "darija": "إمتى؟",
                  "darijaLat": "imta?",
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
              "type": "vocab",
              "intro": "Tien dingen die je thuis ziet. Let op het lidwoord (de/het).",
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
                  "darijaLat": "hit"
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
                  "tip": "De zetel om op te zitten (niet de geldbank)."
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
                  "tip": "Vooral: handtas/zak. In Vlaanderen ook \"een tas koffie\" = een kopje."
                }
              ]
            },
            {
              "id": "0.4.3",
              "title": "Spreekoefening: vragen & voorwerpen",
              "titleDarija": "تمرين الكلام: الأسئلة والأشياء",
              "type": "speaking",
              "intro": "Zeg de vraagwoorden en de dingen in huis hardop, met het lidwoord (de/het).",
              "darijaNote": "قولي كلمات السؤال وحوايج الدار بصوت عالي، ومعاهم de ولا het.",
              "items": [
                {
                  "nl": "Wie?",
                  "darija": "شكون؟",
                  "darijaLat": "chkoun?"
                },
                {
                  "nl": "Wat?",
                  "darija": "شنو؟",
                  "darijaLat": "chnou?"
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
        }
      ]
    },
    {
      "id": "niveau-1",
      "order": 1,
      "title": "Niveau 1",
      "subtitle": "Eerste communicatie",
      "description": "Jezelf voorstellen, over je familie praten, eenvoudige zinnen maken en boodschappen doen in Gent.",
      "cefr": "A1.1",
      "icon": "💬",
      "accent": "saffraan",
      "modules": [
        {
          "id": "1.1",
          "title": "Jezelf voorstellen",
          "goal": "Vertellen wie je bent, waar je vandaan komt en waar je woont.",
          "icon": "🙋‍♀️",
          "lessons": [
            {
              "id": "1.1.1",
              "title": "Wie ben ik?",
              "type": "phrases",
              "intro": "De zinnen die je nodig hebt om jezelf voor te stellen in Gent.",
              "items": [
                {
                  "nl": "Ik ben Oumayma.",
                  "darija": "أنا أميمة",
                  "darijaLat": "ana Oumayma"
                },
                {
                  "nl": "Mijn naam is Oumayma.",
                  "darija": "سميتي أميمة",
                  "darijaLat": "smiti Oumayma"
                },
                {
                  "nl": "Ik kom uit Marokko.",
                  "darija": "أنا من المغرب",
                  "darijaLat": "ana men lmaghrib"
                },
                {
                  "nl": "Ik kom uit Oujda.",
                  "darija": "أنا من وجدة",
                  "darijaLat": "ana men Oujda"
                },
                {
                  "nl": "Ik woon in Gent.",
                  "darija": "أنا ساكنة فـ گنت",
                  "darijaLat": "ana sakna f Gent"
                },
                {
                  "nl": "Ik spreek Darija en een beetje Nederlands.",
                  "darija": "كنهضر بالدارجة وشوية بالهولندية",
                  "darijaLat": "kanhder b darija w chwiya b hollandiya"
                },
                {
                  "nl": "Aangenaam.",
                  "darija": "متشرفة",
                  "darijaLat": "mtcherfa",
                  "tip": "Zeg je als je iemand voor het eerst ontmoet."
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
                  "darija": "عندي جوج ديال الدراري",
                  "darijaLat": "3andi jouj dyal drari"
                }
              ]
            },
            {
              "id": "1.1.2",
              "title": "Spreekoefening: stel jezelf voor",
              "type": "speaking",
              "intro": "Spreek de zinnen in. De app luistert (Whisper) en een AI-docent (Gemini) helpt je verbeteren.",
              "items": [
                {
                  "nl": "Ik ben Oumayma.",
                  "darija": "أنا أميمة (بدليها بسميتك)",
                  "darijaLat": "ana Oumayma"
                },
                {
                  "nl": "Ik kom uit Oujda.",
                  "darija": "أنا من وجدة",
                  "darijaLat": "ana men Oujda"
                },
                {
                  "nl": "Ik woon in Gent.",
                  "darija": "أنا ساكنة فـ گنت",
                  "darijaLat": "ana sakna f Gent"
                },
                {
                  "nl": "Ik spreek een beetje Nederlands.",
                  "darija": "كنهضر شوية بالهولندية",
                  "darijaLat": "kanhder chwiya b hollandiya"
                },
                {
                  "nl": "Stel jezelf nu voor in drie zinnen.",
                  "answer": "Ik ben ... Ik kom uit Oujda. Ik woon in Gent.",
                  "darija": "دابا قدمي راسك فـ ثلاث جمل",
                  "darijaLat": "daba qedmi rassek f tlata d jomal"
                }
              ]
            }
          ]
        },
        {
          "id": "1.2",
          "title": "Familie & gezin",
          "goal": "Praten over je familie en bezit aangeven (mijn, jouw, uw).",
          "icon": "👨‍👩‍👧‍👦",
          "lessons": [
            {
              "id": "1.2.1",
              "title": "De familieleden",
              "type": "vocab",
              "intro": "Woordenschat over het gezin.",
              "items": [
                {
                  "nl": "man",
                  "article": "de",
                  "darija": "الراجل",
                  "darijaLat": "rajel"
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
                  "tip": "Vader én moeder samen (altijd \"de\", meervoud)."
                },
                {
                  "nl": "oma",
                  "article": "de",
                  "darija": "جدّة",
                  "darijaLat": "jedda",
                  "tip": "grootmoeder"
                },
                {
                  "nl": "opa",
                  "article": "de",
                  "darija": "جدّ",
                  "darijaLat": "jedd",
                  "tip": "grootvader"
                },
                {
                  "nl": "tante",
                  "article": "de",
                  "darija": "العمة / الخالة",
                  "darijaLat": "3amma / khala",
                  "tip": "In Vlaanderen ook \"matante\"."
                },
                {
                  "nl": "oom",
                  "article": "de",
                  "darija": "العم / الخال",
                  "darijaLat": "3amm / khal",
                  "tip": "In Vlaanderen zegt men vaak \"nonkel\"."
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
              "type": "grammar",
              "intro": "Met \"mijn\", \"jouw\" en \"uw\" laat je zien van wie iets is. \"Uw\" is beleefd (formeel).",
              "darijaNote": "ديالي = mijn، ديالك = jouw، وديالكم = uw أو jullie حسب السياق.",
              "items": [
                {
                  "nl": "mijn",
                  "darija": "ديالي",
                  "darijaLat": "dyali",
                  "example": "mijn broer / mijn kind"
                },
                {
                  "nl": "jouw",
                  "darija": "ديالك",
                  "darijaLat": "dyalek",
                  "example": "jouw zus / jouw huis"
                },
                {
                  "nl": "uw",
                  "darija": "ديالكم",
                  "darijaLat": "dyalkoum",
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
                  "darija": "ديالو",
                  "darijaLat": "dyalou",
                  "example": "zijn vader (van een man)"
                },
                {
                  "nl": "haar",
                  "darija": "ديالها",
                  "darijaLat": "dyalha",
                  "example": "haar moeder (van een vrouw)"
                },
                {
                  "nl": "ons / onze",
                  "darija": "ديالنا",
                  "darijaLat": "dyalna",
                  "example": "ons huis / onze straat"
                },
                {
                  "nl": "hun",
                  "darija": "ديالهم",
                  "darijaLat": "dyalhom",
                  "example": "hun kinderen"
                }
              ]
            },
            {
              "id": "1.2.3",
              "title": "Spreekoefening: familie",
              "titleDarija": "تمرين الكلام: العائلة",
              "type": "speaking",
              "intro": "Zeg de familieleden hardop, met het lidwoord (de/het).",
              "darijaNote": "قولي أفراد العائلة بصوت عالي، ومعاهم de ولا het.",
              "items": [
                {
                  "nl": "de man",
                  "darija": "الراجل",
                  "darijaLat": "rajel"
                },
                {
                  "nl": "de vrouw",
                  "darija": "المرا",
                  "darijaLat": "mra"
                },
                {
                  "nl": "het kind",
                  "darija": "طفل / طفلة",
                  "darijaLat": "tfel / tfla"
                },
                {
                  "nl": "de zoon",
                  "darija": "الولد",
                  "darijaLat": "weld"
                },
                {
                  "nl": "de dochter",
                  "darija": "البنت",
                  "darijaLat": "bent"
                },
                {
                  "nl": "de broer",
                  "darija": "خو",
                  "darijaLat": "khou"
                },
                {
                  "nl": "de zus",
                  "darija": "خت",
                  "darijaLat": "kht"
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
          "goal": "De/het, de tegenwoordige tijd en de werkwoorden \"zijn\" en \"hebben\".",
          "icon": "📘",
          "lessons": [
            {
              "id": "1.3.1",
              "title": "DE of HET?",
              "type": "grammar",
              "intro": "Elk zelfstandig naamwoord heeft \"de\" of \"het\". Handige regels: mensen zijn (bijna) altijd \"de\", een meervoud is ALTIJD \"de\", en een verkleinwoord (-je) is ALTIJD \"het\".",
              "darijaNote": "ما كايناش قاعدة كاملة، خاصك تحفظي الكلمات. ولكن الجمع ديما كياخد de، والتصغير بـ -je ديما كياخد het.",
              "items": [
                {
                  "nl": "de man",
                  "article": "de",
                  "tip": "Persoon → de."
                },
                {
                  "nl": "de vrouw",
                  "article": "de",
                  "tip": "Persoon → de."
                },
                {
                  "nl": "het kind",
                  "article": "het",
                  "tip": "Uitzondering: onzijdig."
                },
                {
                  "nl": "de kinderen",
                  "article": "de",
                  "tip": "Meervoud → altijd de."
                },
                {
                  "nl": "het tafeltje",
                  "article": "het",
                  "tip": "Verkleinwoord (-je) → altijd het."
                },
                {
                  "nl": "het huis",
                  "article": "het"
                },
                {
                  "nl": "de straat",
                  "article": "de"
                },
                {
                  "nl": "het meisje",
                  "article": "het",
                  "tip": "Let op: een persoon, maar toch \"het\" (uitzondering)."
                },
                {
                  "nl": "de stad",
                  "article": "de",
                  "tip": "Gent is een stad."
                },
                {
                  "nl": "het land",
                  "article": "het"
                },
                {
                  "nl": "de auto",
                  "article": "de"
                },
                {
                  "nl": "het water",
                  "article": "het"
                },
                {
                  "nl": "de fiets",
                  "article": "de",
                  "tip": "Heel belangrijk in Gent!"
                },
                {
                  "nl": "het geld",
                  "article": "het"
                },
                {
                  "nl": "de winkel",
                  "article": "de"
                }
              ]
            },
            {
              "id": "1.3.2",
              "title": "Tegenwoordige tijd (stam + t)",
              "type": "grammar",
              "intro": "Regel: ik = stam. jij/hij/zij = stam + t. wij/jullie/zij (mv) = hele werkwoord. Voorbeeld met \"wonen\" (stam = woon).",
              "items": [
                {
                  "nl": "ik woon",
                  "darijaLat": "kanskon",
                  "darija": "كنسكن"
                },
                {
                  "nl": "jij woont",
                  "tip": "stam + t"
                },
                {
                  "nl": "hij/zij woont",
                  "tip": "stam + t"
                },
                {
                  "nl": "wij wonen",
                  "tip": "hele werkwoord"
                },
                {
                  "nl": "ik werk / jij werkt",
                  "darijaLat": "kankhdem / katkhdem, katkhdmi",
                  "darija": "كنخدم / كتخدم، كتخدمي"
                },
                {
                  "nl": "ik heet / jij heet",
                  "tip": "stam eindigt al op t → geen dubbele t",
                  "darijaLat": "smiti… / smitek…",
                  "darija": "سميتي… / سميتك…"
                },
                {
                  "nl": "ik spreek / jij spreekt",
                  "darijaLat": "kanhder / kathder, kathdri",
                  "darija": "كنهضر / كتهضر، كتهضري"
                },
                {
                  "nl": "ik kom / jij komt",
                  "darijaLat": "kanji / katji",
                  "darija": "كنجي / كتجي"
                },
                {
                  "nl": "ik eet / jij eet",
                  "tip": "stam eindigt op t → geen dubbele t",
                  "darijaLat": "kanakel / katakel, katakli",
                  "darija": "كناكل / كتاكل، كتاكلي"
                },
                {
                  "nl": "ik leer / jij leert",
                  "darijaLat": "kant3ellem / kat3ellem, kat3elmi",
                  "darija": "كنتعلم / كتتعلم، كتتعلمي"
                },
                {
                  "nl": "ik maak / jij maakt",
                  "darijaLat": "kandir / katdir, katdiri",
                  "darija": "كندير / كتدير، كتديري"
                }
              ]
            },
            {
              "id": "1.3.3",
              "title": "Onregelmatig: zijn & hebben",
              "type": "grammar",
              "intro": "Deze twee werkwoorden zijn onregelmatig en heel belangrijk. Leer ze uit het hoofd.",
              "darijaNote": "مهم: فالدارجة ما كنستعملوش فعل zijn فالحاضر بحال الهولندية. مثلا ik ben Oumayma = أنا أميمة. وفعل hebben كيتعبر عليه بـ عند.",
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
              "type": "speaking",
              "intro": "Zeg de vormen van \"zijn\" en \"hebben\" hardop.",
              "darijaNote": "قولي تصريفات الفعلين zijn وhebben بصوت عالي.",
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
          "goal": "Vragen maken met inversie, tellen tot 100 en boodschappen doen.",
          "icon": "🛒",
          "lessons": [
            {
              "id": "1.4.1",
              "title": "Vragen met inversie",
              "type": "grammar",
              "intro": "Voor een ja/nee-vraag wissel je het werkwoord en het onderwerp om. \"Jij woont\" → \"Woon jij?\"",
              "darijaNote": "باش تسولي سؤال، كتبدلي بلاصة الفعل والفاعل: jij woont كتولي woon jij?",
              "items": [
                {
                  "nl": "Woon jij in Gent?",
                  "example": "van: jij woont in Gent"
                },
                {
                  "nl": "Spreek jij Nederlands?",
                  "example": "van: jij spreekt Nederlands"
                },
                {
                  "nl": "Heb jij kinderen?",
                  "example": "van: jij hebt kinderen"
                },
                {
                  "nl": "Kom jij uit Oujda?",
                  "example": "van: jij komt uit Oujda"
                },
                {
                  "nl": "Werk jij in Gent?",
                  "example": "van: jij werkt in Gent"
                },
                {
                  "nl": "Kom jij uit Marokko?",
                  "example": "van: jij komt uit Marokko"
                },
                {
                  "nl": "Versta jij mij?",
                  "example": "van: jij verstaat mij",
                  "tip": "In Vlaanderen: \"verstaan\" = begrijpen."
                },
                {
                  "nl": "Heb jij tijd?",
                  "example": "van: jij hebt tijd"
                }
              ]
            },
            {
              "id": "1.4.2",
              "title": "Getallen 20–100",
              "type": "numbers",
              "intro": "Let op de volgorde: eerst het eenheidsgetal, dan \"en\", dan het tiental. \"eenentwintig\" = 1 + en + 20.",
              "items": [
                {
                  "nl": "twintig",
                  "value": 20
                },
                {
                  "nl": "eenentwintig",
                  "value": 21,
                  "tip": "een + en + twintig"
                },
                {
                  "nl": "dertig",
                  "value": 30
                },
                {
                  "nl": "veertig",
                  "value": 40
                },
                {
                  "nl": "vijftig",
                  "value": 50
                },
                {
                  "nl": "zestig",
                  "value": 60
                },
                {
                  "nl": "zeventig",
                  "value": 70
                },
                {
                  "nl": "tachtig",
                  "value": 80,
                  "tip": "Let op: begint met \"t\"."
                },
                {
                  "nl": "negentig",
                  "value": 90
                },
                {
                  "nl": "honderd",
                  "value": 100
                },
                {
                  "nl": "vijfentwintig",
                  "value": 25,
                  "tip": "vijf + en + twintig"
                },
                {
                  "nl": "drieëndertig",
                  "value": 33,
                  "tip": "drie + en + dertig"
                },
                {
                  "nl": "achtenveertig",
                  "value": 48
                },
                {
                  "nl": "negenennegentig",
                  "value": 99
                },
                {
                  "nl": "duizend",
                  "value": 1000
                }
              ]
            },
            {
              "id": "1.4.3",
              "title": "Bij de winkel & de bakker",
              "type": "phrases",
              "intro": "Zinnen die je meteen kunt gebruiken bij de bakker of in de winkel in Gent.",
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
                  "darija": "كنقلب على الحليب",
                  "darijaLat": "kanqelleb 3la l7lib"
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
                  "darija": "شكارة عافاك",
                  "darijaLat": "chkara 3afak"
                },
                {
                  "nl": "Bedankt, tot ziens.",
                  "darija": "شكرا، بسلامة",
                  "darijaLat": "choukran, bslama"
                }
              ]
            },
            {
              "id": "1.4.4",
              "title": "Spreekoefening: bij de bakker",
              "type": "speaking",
              "intro": "Oefen hardop de zinnen die je bij de bakker of in de winkel gebruikt.",
              "items": [
                {
                  "nl": "Goedemorgen, mag ik een brood?",
                  "darija": "صباح الخير، ممكن خبزة عافاك؟",
                  "darijaLat": "sbah lkhir, momkin khobza 3afak?"
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
                  "darijaLat": "choukran bzzaf, bslama"
                }
              ]
            }
          ]
        },
        {
          "id": "1.5",
          "title": "Tijd: dagen, maanden & de klok",
          "titleDarija": "الوقت: الأيام، الشهور والساعة",
          "goal": "De dagen, de maanden en de klok begrijpen en zeggen.",
          "icon": "🕒",
          "lessons": [
            {
              "id": "1.5.1",
              "title": "De dagen van de week",
              "titleDarija": "أيام الأسبوع",
              "type": "vocab",
              "intro": "De zeven dagen, plus vandaag, morgen en gisteren.",
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
                  "darijaLat": "lhedd"
                },
                {
                  "nl": "vandaag",
                  "darija": "اليوم",
                  "darijaLat": "lyoum"
                },
                {
                  "nl": "morgen",
                  "darija": "غدا",
                  "darijaLat": "ghedda"
                },
                {
                  "nl": "gisteren",
                  "darija": "البارح",
                  "darijaLat": "lbareh"
                }
              ]
            },
            {
              "id": "1.5.2",
              "title": "De maanden",
              "titleDarija": "الشهور",
              "type": "vocab",
              "intro": "De twaalf maanden van het jaar.",
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
              "type": "phrases",
              "intro": "Vragen en zeggen hoe laat het is, en de delen van de dag.",
              "items": [
                {
                  "nl": "Hoe laat is het?",
                  "darija": "شحال فالساعة؟",
                  "darijaLat": "ch7al f sa3a?"
                },
                {
                  "nl": "Het is één uur.",
                  "darija": "الساعة الوحدة",
                  "darijaLat": "sa3a lwehda"
                },
                {
                  "nl": "Het is half drie.",
                  "darija": "الساعة الجوج ونص",
                  "darijaLat": "sa3a jouj w ness",
                  "tip": "Half drie = 2u30 (halfweg naar drie)."
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
                  "darijaLat": "sbah"
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
                  "darija": "دابا",
                  "darijaLat": "daba"
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
              "type": "speaking",
              "intro": "Zeg de dagen en enkele tijdswoorden hardop.",
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
                  "darijaLat": "lhedd"
                },
                {
                  "nl": "vandaag",
                  "darija": "اليوم",
                  "darijaLat": "lyoum"
                },
                {
                  "nl": "morgen",
                  "darija": "غدا",
                  "darijaLat": "ghedda"
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
          "goal": "Het openbaar vervoer gebruiken en de weg vragen in Gent.",
          "icon": "🚋",
          "lessons": [
            {
              "id": "1.6.1",
              "title": "Vervoer & tickets",
              "titleDarija": "النقل والتيكيات",
              "type": "phrases",
              "intro": "Woorden en zinnen voor de tram, de bus en het station.",
              "items": [
                {
                  "nl": "de tram",
                  "darija": "الطرام",
                  "darijaLat": "tram"
                },
                {
                  "nl": "de bus",
                  "darija": "الطوبيس",
                  "darijaLat": "tobis"
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
                  "darija": "لاري / الموقف",
                  "darijaLat": "l'arrêt / lmawqif"
                },
                {
                  "nl": "het ticket",
                  "darija": "التيكي",
                  "darijaLat": "tiki"
                },
                {
                  "nl": "Waar is de halte?",
                  "darija": "فين لاري؟",
                  "darijaLat": "fin l'arrêt?"
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
                }
              ]
            },
            {
              "id": "1.6.2",
              "title": "De weg vragen",
              "titleDarija": "تسول على الطريق",
              "type": "phrases",
              "intro": "Vragen waar iets is, en de richtingen begrijpen.",
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
              "type": "speaking",
              "intro": "Oefen hardop de zinnen die je onderweg gebruikt.",
              "items": [
                {
                  "nl": "Waar is de halte?",
                  "darija": "فين لاري؟",
                  "darijaLat": "fin l'arrêt?"
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
          "goal": "Je lichaam benoemen en zeggen dat je ziek bent of pijn hebt.",
          "icon": "🩺",
          "lessons": [
            {
              "id": "1.7.1",
              "title": "Het lichaam",
              "titleDarija": "الجسم",
              "type": "vocab",
              "intro": "De belangrijkste lichaamsdelen. Let op het lidwoord (de/het).",
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
                  "darijaLat": "dher"
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
                  "darijaLat": "helq"
                }
              ]
            },
            {
              "id": "1.7.2",
              "title": "Ik ben ziek",
              "titleDarija": "أنا مريضة",
              "type": "phrases",
              "intro": "Zeggen dat je ziek bent, pijn hebt, en een afspraak maken.",
              "items": [
                {
                  "nl": "Ik ben ziek.",
                  "darija": "أنا مريضة",
                  "darijaLat": "ana mrida"
                },
                {
                  "nl": "Ik heb pijn.",
                  "darija": "عندي الوجع / كنحس بالوجع",
                  "darijaLat": "3andi lwej3 / kan7ess b lwej3"
                },
                {
                  "nl": "Ik heb hoofdpijn.",
                  "darija": "راسي كيوجعني",
                  "darijaLat": "rasi kaywej3ni"
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
                  "darija": "عندي موعد",
                  "darijaLat": "3andi maw3id"
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
              "type": "speaking",
              "intro": "Oefen hardop wat je bij de dokter zegt.",
              "items": [
                {
                  "nl": "Ik ben ziek.",
                  "darija": "أنا مريضة",
                  "darijaLat": "ana mrida"
                },
                {
                  "nl": "Ik heb pijn.",
                  "darija": "عندي الوجع / كنحس بالوجع",
                  "darijaLat": "3andi lwej3 / kan7ess b lwej3"
                },
                {
                  "nl": "Ik heb koorts.",
                  "darija": "عندي السخانة",
                  "darijaLat": "3andi skhana"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي موعد",
                  "darijaLat": "3andi maw3id"
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
          "goal": "Kleuren, eten en drinken, en bestellen op café of restaurant.",
          "icon": "🍽️",
          "lessons": [
            {
              "id": "1.8.1",
              "title": "Kleuren",
              "titleDarija": "الألوان",
              "type": "vocab",
              "intro": "De basiskleuren.",
              "items": [
                {
                  "nl": "rood",
                  "darija": "أحمر",
                  "darijaLat": "hmer"
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
                  "darijaLat": "khel"
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
              "type": "vocab",
              "intro": "Woorden voor eten en drinken. Let op het lidwoord (de/het).",
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
                  "darijaLat": "hlib"
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
                  "darijaLat": "lhem"
                },
                {
                  "nl": "vis",
                  "article": "de",
                  "darija": "الحوت",
                  "darijaLat": "hout"
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
              "type": "phrases",
              "intro": "Bestellen, betalen en beleefd zijn op café of restaurant.",
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
                  "darijaLat": "b sahha"
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
              "type": "speaking",
              "intro": "Oefen hardop hoe je iets bestelt.",
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
                  "darijaLat": "b sahha"
                }
              ]
            },
            {
              "id": "1.8.5",
              "title": "Tegenstellingen & hoeveelheden",
              "titleDarija": "الأضداد والكميات",
              "type": "vocab",
              "intro": "Handige bijvoeglijke naamwoorden en hoeveelheden voor de winkel.",
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
                  "darijaLat": "wehda / qet3a"
                },
                {
                  "nl": "een fles",
                  "darija": "قرعة",
                  "darijaLat": "qer3a"
                }
              ]
            }
          ]
        },
        {
          "id": "1.9",
          "title": "Werk & afspraken",
          "titleDarija": "الخدمة والمواعيد",
          "goal": "Praten over werk en een afspraak maken.",
          "icon": "💼",
          "lessons": [
            {
              "id": "1.9.1",
              "title": "Werk",
              "titleDarija": "الخدمة",
              "type": "vocab",
              "intro": "Woorden over werk. Let op het lidwoord (de/het).",
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
                  "darijaLat": "pause / listiraha"
                }
              ]
            },
            {
              "id": "1.9.2",
              "title": "Een afspraak maken",
              "titleDarija": "ديري موعد",
              "type": "phrases",
              "intro": "Zinnen om over werk te praten en een afspraak te maken.",
              "items": [
                {
                  "nl": "Ik werk in Gent.",
                  "darija": "كنخدم فـ گنت",
                  "darijaLat": "kankhdem f Gent"
                },
                {
                  "nl": "Wat is uw beroep?",
                  "darija": "شنو هي الخدمة ديالك؟",
                  "darijaLat": "chno hiya lkhedma dyalek?"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي موعد",
                  "darijaLat": "3andi maw3id"
                },
                {
                  "nl": "Kunnen we een afspraak maken?",
                  "darija": "واش نقدرو نديرو موعد؟",
                  "darijaLat": "wach nqedro ndiro maw3id?"
                },
                {
                  "nl": "Wanneer past het u?",
                  "darija": "إمتى يجيك مناسب؟",
                  "darijaLat": "imta yjik monasib?"
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
              "type": "speaking",
              "intro": "Oefen hardop wat je zegt over werk en afspraken.",
              "items": [
                {
                  "nl": "Ik werk in Gent.",
                  "darija": "كنخدم فـ گنت",
                  "darijaLat": "kankhdem f Gent"
                },
                {
                  "nl": "Ik heb een afspraak.",
                  "darija": "عندي موعد",
                  "darijaLat": "3andi maw3id"
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
          "goal": "Voornaamwoorden, ontkenning (niet/geen), meervoud en het lidwoord \"een\".",
          "icon": "🧩",
          "lessons": [
            {
              "id": "1.10.1",
              "title": "Persoonlijke voornaamwoorden",
              "titleDarija": "الضمائر",
              "type": "vocab",
              "intro": "Wie doet iets? ik, jij, hij, zij, wij, jullie, zij.",
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
                  "darija": "نتا / نتي باحترام",
                  "darijaLat": "nta / nti b i7tiram"
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
              "type": "phrases",
              "intro": "Gebruik \"geen\" bij een zelfstandig naamwoord (geen tijd), en \"niet\" bij de rest.",
              "darijaNote": "geen كتستعمل مع الاسم، بحال geen tijd. وniet كتستعمل فحالات أخرى.",
              "items": [
                {
                  "nl": "Ik heb geen tijd.",
                  "darija": "ماعنديش الوقت",
                  "darijaLat": "ma3andich lweqt"
                },
                {
                  "nl": "Ik spreek geen Frans.",
                  "darija": "ما كنهضرش بالفرنسية",
                  "darijaLat": "ma kanhderch b lfransiya"
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
              "type": "grammar",
              "intro": "Meestal +en, soms +s (na -e, -el, -er, en bij korte woorden). Het meervoud is altijd \"de\".",
              "items": [
                {
                  "nl": "het huis → de huizen",
                  "tip": "+en"
                },
                {
                  "nl": "de man → de mannen",
                  "tip": "+en (dubbele n)"
                },
                {
                  "nl": "de vrouw → de vrouwen",
                  "tip": "+en"
                },
                {
                  "nl": "het kind → de kinderen",
                  "tip": "onregelmatig"
                },
                {
                  "nl": "de tafel → de tafels",
                  "tip": "+s (na -el)"
                },
                {
                  "nl": "de fiets → de fietsen",
                  "tip": "+en"
                },
                {
                  "nl": "de auto → de auto's",
                  "tip": "+'s"
                },
                {
                  "nl": "de baby → de baby's",
                  "tip": "+'s"
                }
              ]
            },
            {
              "id": "1.10.4",
              "title": "een, de of het",
              "titleDarija": "een، de ولا het",
              "type": "grammar",
              "intro": "\"een\" = één, onbekend (een brood). \"de/het\" = het bekende, specifieke (het brood dat jij wil).",
              "darijaNote": "een كتجي مع شي حاجة مازال ما معروفةش، وde ولا het كيجيو مع الحاجة اللي معروفة وسبق هضرتي عليها.",
              "items": [
                {
                  "nl": "een brood",
                  "tip": "een willekeurig brood"
                },
                {
                  "nl": "het brood",
                  "tip": "dat specifieke brood"
                },
                {
                  "nl": "een huis",
                  "tip": "een of ander huis"
                },
                {
                  "nl": "het huis",
                  "tip": "jouw/dat huis"
                },
                {
                  "nl": "een man",
                  "tip": "iemand"
                },
                {
                  "nl": "de man",
                  "tip": "die man"
                },
                {
                  "nl": "een vraag",
                  "tip": "zomaar een vraag"
                },
                {
                  "nl": "de vraag",
                  "tip": "die ene vraag"
                }
              ]
            }
          ]
        },
        {
          "id": "1.11",
          "title": "In Gent: administratie & nood",
          "titleDarija": "فـ گنت: الإدارة والطوارئ",
          "goal": "Woorden voor de gemeente en werk, en wat je zegt in een noodsituatie.",
          "icon": "🏛️",
          "lessons": [
            {
              "id": "1.11.1",
              "title": "Bij de gemeente",
              "titleDarija": "فالبلدية",
              "type": "phrases",
              "intro": "Woorden en zinnen voor het stadhuis en je papieren.",
              "items": [
                {
                  "nl": "de gemeente",
                  "darija": "البلدية / الكومين",
                  "darijaLat": "lbaladiya / komin"
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
                  "darija": "بطاقة التعريف / الكارط ديدونتيتي",
                  "darijaLat": "bitaqat ta3rif / carte d'identité"
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
                  "darijaLat": "fin khasni nwqe3?"
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
              "type": "vocab",
              "intro": "Belangrijke diensten in Vlaanderen.",
              "items": [
                {
                  "nl": "VDAB",
                  "darija": "مكتب التشغيل VDAB",
                  "darijaLat": "plek voor werk en opleiding",
                  "tip": "Vlaamse dienst om werk te zoeken."
                },
                {
                  "nl": "het OCMW",
                  "darija": "مركز المساعدة الاجتماعية OCMW",
                  "darijaLat": "sociale hulp",
                  "tip": "Sociale hulp van de gemeente."
                },
                {
                  "nl": "de mutualiteit",
                  "darija": "الموطويال / الصندوق الصحي",
                  "darijaLat": "mutuelle / sandouq si7i",
                  "tip": "Je ziekenfonds (terugbetaling dokter)."
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
                  "darijaLat": "hessa d hollandiya"
                }
              ]
            },
            {
              "id": "1.11.3",
              "title": "Noodsituaties",
              "titleDarija": "الطوارئ",
              "type": "phrases",
              "intro": "In nood bel je 112. Deze zinnen zijn belangrijk om te kennen.",
              "darijaNote": "فحالة الطوارئ عيطي لـ 112. هاد الجمل مهمين بزاف.",
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
                  "darija": "عيط / عيطي للبوليس!",
                  "darijaLat": "3ayet / 3ayti l lbolis!"
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
                  "darija": "كاينة حادثة",
                  "darijaLat": "kayna 7adita"
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
              "type": "speaking",
              "intro": "Oefen hardop wat je in een noodsituatie zegt.",
              "items": [
                {
                  "nl": "Help!",
                  "darija": "عاونوني!",
                  "darijaLat": "3awnouni!"
                },
                {
                  "nl": "Bel de politie!",
                  "darija": "عيط / عيطي للبوليس!",
                  "darijaLat": "3ayet / 3ayti l lbolis!"
                },
                {
                  "nl": "Ik heb hulp nodig.",
                  "darija": "خاصني المساعدة",
                  "darijaLat": "khasni lmosa3ada"
                },
                {
                  "nl": "Er is een ongeval.",
                  "darija": "كاينة حادثة",
                  "darijaLat": "kayna 7adita"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export function countLessons(level) {
  return level.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}

export function allLessonIds(level) {
  return level.modules.flatMap((m) => m.lessons.map((l) => l.id))
}

export function getLevel(id) {
  return curriculum.levels.find((l) => l.id === id)
}

export default curriculum
