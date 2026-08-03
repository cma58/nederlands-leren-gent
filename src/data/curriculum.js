/**
 * ============================================================================
 *  LEERLIJN / CURRICULUM  —  Nederlands leren in Gent (voor Darija-sprekers)
 * ============================================================================
 *
 *  Doelgroep : Marokkaans-Darija sprekende beginners (uit Oujda) die naar
 *              Gent (Vlaanderen) verhuizen.
 *  Focus     : Vlaams-Nederlands (nl-BE), niveau 0 -> A1.1.
 *
 *  SCHEMA
 *  ------
 *  curriculum = {
 *    meta:   { ... },              // algemene info
 *    levels: [ Level, ... ]
 *  }
 *
 *  Level = {
 *    id:          string,          // uniek, bv. "niveau-0"
 *    order:       number,          // volgorde in de UI
 *    title:       string,
 *    subtitle:    string,
 *    description: string,
 *    cefr:        string|null,     // Europees referentieniveau (bv. "A1.1")
 *    icon:        string,          // emoji voor de UI
 *    accent:      string,          // tailwind-kleurnaam voor accenten
 *    modules:     [ Module, ... ]
 *  }
 *
 *  Module = {
 *    id:          string,          // bv. "0.1"
 *    title:       string,
 *    goal:        string,          // leerdoel in één zin
 *    icon:        string,
 *    lessons:     [ Lesson, ... ]
 *  }
 *
 *  Lesson = {
 *    id:          string,          // bv. "0.1.1"
 *    title:       string,
 *    type:        LessonType,      // bepaalt welke oefen-component wordt getoond
 *    intro:       string,          // korte uitleg (NL)
 *    darijaNote?: string,          // extra uitleg in het Darija/Arabisch (optioneel)
 *    items:       [ Item, ... ]    // vocabulaire / voorbeeldzinnen / oefeningen
 *  }
 *
 *  LessonType (voor Stap 2 — de interactieve components):
 *    'phonetics'  -> klank-/uitspraakoefening (minimale paren)
 *    'vocab'      -> woordenschat met audio
 *    'phrases'    -> voorbeeldzinnen naspreken
 *    'numbers'    -> getallen
 *    'grammar'    -> grammaticaregel + voorbeelden
 *    'speaking'   -> spreekoefening (Whisper + Gemini)
 *    'quiz'       -> meerkeuze / invuloefening
 *
 *  Item (flexibel per lestype — alle velden optioneel behalve 'nl'):
 *    nl:         string            // het Nederlandse woord/zin (verplicht)
 *    darija?:    string            // vertaling in het Darija (Arabisch schrift)
 *    darijaLat?: string            // Darija in Latijns schrift (transliteratie)
 *    ipa?:       string            // fonetische uitspraak
 *    tip?:       string            // uitspraaktip afgestemd op Darija-sprekers
 *    article?:   'de' | 'het'      // lidwoord (voor zelfstandige naamwoorden)
 *    example?:   string            // voorbeeldzin
 *    pair?:      string            // minimaal paar (contrastwoord bij fonetiek)
 *    options?:   string[]          // antwoordopties (bij quiz)
 *    answer?:    string            // correct antwoord (bij quiz/speaking)
 * ============================================================================
 */

export const LESSON_TYPES = {
  PHONETICS: 'phonetics',
  VOCAB: 'vocab',
  PHRASES: 'phrases',
  NUMBERS: 'numbers',
  GRAMMAR: 'grammar',
  SPEAKING: 'speaking',
  QUIZ: 'quiz',
}

const curriculum = {
  meta: {
    appName: 'Nederlands leren in Gent',
    targetLang: 'nl-BE',
    learnerL1: 'Marokkaans-Arabisch (Darija)',
    city: 'Gent',
    version: '0.1.0',
  },

  levels: [
    // =======================================================================
    //  NIVEAU 0 — ABSOLUTE BASIS & FONETIEK
    // =======================================================================
    {
      id: 'niveau-0',
      order: 0,
      title: 'Niveau 0',
      subtitle: 'Absolute basis & fonetiek',
      description:
        'De klanken, de begroetingen, de getallen en je eerste woorden. De perfecte start als je nog geen Nederlands kent.',
      cefr: null,
      icon: '🔤',
      accent: 'gent',
      modules: [
        // ---- Module 0.0 — Het Alfabet & De Klanken ----------------------
        {
          id: '0.0',
          title: 'Het Alfabet & De Klanken',
          titleDarija: 'الأبجدية والأصوات',
          goal: 'De letters A t/m Z leren herkennen én actief uitspreken.',
          icon: '🔡',
          lessons: [
            {
              id: '0.0.1',
              title: 'Het alfabet: A – E',
              titleDarija: 'الأبجدية: A – E',
              type: LESSON_TYPES.SPEAKING,
              intro:
                'Zeg elke letter hardop met het voorbeeldwoord ("A van appel"). Luister eerst, spreek dan zelf in.',
              darijaNote: 'قولي كل حرف بصوت عالي مع الكلمة ديالو. سمع الأول، من بعد سجلي.',
              items: [
                { nl: 'A', word: 'appel', icon: '🍎', darija: 'تفاحة', darijaLat: 'teffaha', tip: 'Mond wijd open, heldere "a".', answer: 'appel' },
                { nl: 'B', word: 'bal', icon: '⚽', darija: 'كورة', darijaLat: 'koura', tip: 'Lippen samen mét stem (voel je keel trillen). Verschil met de P.', answer: 'bal' },
                { nl: 'C', word: 'cadeau', icon: '🎁', darija: 'كادو', darijaLat: 'kadou', tip: 'De C klinkt hier als "k". Voor e/i klinkt ze als "s".', answer: 'cadeau' },
                { nl: 'D', word: 'deur', icon: '🚪', darija: 'باب', darijaLat: 'bab', tip: 'Tongpunt tegen de boventanden, mét stem.', answer: 'deur' },
                { nl: 'E', word: 'eend', icon: '🦆', darija: 'بطة', darijaLat: 'betta', tip: 'Korte "e", zoals in het Franse «est».', answer: 'eend' },
              ],
            },
            {
              id: '0.0.2',
              title: 'Het alfabet: F – J',
              titleDarija: 'الأبجدية: F – J',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Luister, kijk naar de mondstand-tip en spreek elke letter met het woord in.',
              darijaNote: 'سمع، شوف نصيحة الفم، وقولي كل حرف مع الكلمة.',
              items: [
                { nl: 'F', word: 'fiets', icon: '🚲', darija: 'بيسكليت', darijaLat: 'bishklit', tip: 'Boventanden op de onderlip, blazen zonder stem. Verschil met de V.', answer: 'fiets' },
                { nl: 'G', word: 'geit', icon: '🐐', darija: 'معزة', darijaLat: 'm3iza', tip: 'De harde "g" is een keelklank, zoals de Arabische «خ».', answer: 'geit' },
                { nl: 'H', word: 'huis', icon: '🏠', darija: 'دار', darijaLat: 'dar', tip: 'Zachte adem uit de keel, zoals de «ه».', answer: 'huis' },
                { nl: 'I', word: 'iglo', icon: '🛖', darija: 'إغلو', darijaLat: 'iglou', tip: 'Korte, korte "i".', answer: 'iglo' },
                { nl: 'J', word: 'jas', icon: '🧥', darija: 'جاكيطة', darijaLat: 'jakita', tip: 'De J klinkt als de «ي» (zoals "ya").', answer: 'jas' },
              ],
            },
            {
              id: '0.0.3',
              title: 'Het alfabet: K – O',
              titleDarija: 'الأبجدية: K – O',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg elke letter met het voorbeeldwoord. De app luistert en helpt je.',
              darijaNote: 'قولي كل حرف مع الكلمة. التطبيق كيسمع وكيعاونك.',
              items: [
                { nl: 'K', word: 'kat', icon: '🐱', darija: 'قطة', darijaLat: 'qetta', tip: 'Klank achter in de mond, zoals de «ك».', answer: 'kat' },
                { nl: 'L', word: 'lamp', icon: '💡', darija: 'ضو', darijaLat: 'dou', tip: 'Tongpunt achter de boventanden.', answer: 'lamp' },
                { nl: 'M', word: 'maan', icon: '🌙', darija: 'قمر', darijaLat: 'qamar', tip: 'Lippen samen, neusklank, zoals de «م».', answer: 'maan' },
                { nl: 'N', word: 'neus', icon: '👃', darija: 'نيف', darijaLat: 'nif', tip: 'Tong achter de tanden, neusklank, zoals de «ن».', answer: 'neus' },
                { nl: 'O', word: 'oog', icon: '👁️', darija: 'عين', darijaLat: '3in', tip: 'Ronde lippen, volle "o".', answer: 'oog' },
              ],
            },
            {
              id: '0.0.4',
              title: 'Het alfabet: P – T',
              titleDarija: 'الأبجدية: P – T',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Let goed op de P: die bestaat niet in het Darija. Luister en oefen.',
              darijaNote: 'رد بالك للحرف P: ما كاينش فالدارجة. سمع وتمرن.',
              items: [
                { nl: 'P', word: 'paard', icon: '🐴', darija: 'حصان', darijaLat: 'hsan', tip: 'Lippen samen én een pufje lucht, zonder stem. De P bestaat niet in het Darija!', answer: 'paard' },
                { nl: 'Q', word: 'quiz', icon: '❓', darija: 'كويز', darijaLat: 'kwiz', tip: 'De Q klinkt als "kw". Komt zelden voor.', answer: 'quiz' },
                { nl: 'R', word: 'roos', icon: '🌹', darija: 'وردة', darijaLat: 'warda', tip: 'Rollende tong-r of een lichte keel-r.', answer: 'roos' },
                { nl: 'S', word: 'ster', icon: '⭐', darija: 'نجمة', darijaLat: 'nejma', tip: 'Sissende "s", zoals de «س».', answer: 'ster' },
                { nl: 'T', word: 'tafel', icon: '🪑', darija: 'طبلة', darijaLat: 'tebla', tip: 'Tongpunt tegen de tanden, zonder stem.', answer: 'tafel' },
              ],
            },
            {
              id: '0.0.5',
              title: 'Het alfabet: U – Z',
              titleDarija: 'الأبجدية: U – Z',
              type: LESSON_TYPES.SPEAKING,
              intro: 'De laatste letters. Let op de U en de V — die zijn lastig voor Darija-sprekers.',
              darijaNote: 'الحروف الأخيرة. رد بالك لـ U و V — صعاب على اللي كيهضرو الدارجة.',
              items: [
                { nl: 'U', word: 'uur', icon: '⏰', darija: 'ساعة', darijaLat: 'sa3a', tip: 'Ronde lippen zoals bij «oe», maar zeg «i». Bestaat niet in het Darija.', answer: 'uur' },
                { nl: 'V', word: 'vis', icon: '🐟', darija: 'حوت', darijaLat: 'hout', tip: 'Zoals de F, maar mét een beetje stem. In Vlaanderen zacht.', answer: 'vis' },
                { nl: 'W', word: 'water', icon: '💧', darija: 'ما', darijaLat: 'lma', tip: 'Ronde lippen, zoals de «و».', answer: 'water' },
                { nl: 'X', word: 'taxi', icon: '🚕', darija: 'طاكسي', darijaLat: 'taksi', tip: 'De X klinkt als "ks". Zeldzaam in het Nederlands.', answer: 'taxi' },
                { nl: 'Y', word: 'yoghurt', icon: '🥛', darija: 'ياغورت', darijaLat: 'yaghourt', tip: 'De Y klinkt hier als "j" (zoals «ي»).', answer: 'yoghurt' },
                { nl: 'Z', word: 'zon', icon: '☀️', darija: 'شمس', darijaLat: 'chems', tip: 'Zoemende "s" mét stem, zoals de «ز».', answer: 'zon' },
              ],
            },
          ],
        },

        // ---- Module 0.1 -------------------------------------------------
        {
          id: '0.1',
          title: 'Klankleer & uitspraak',
          goal: 'De Nederlandse klanken herkennen en uitspreken — met tips voor Darija-sprekers.',
          icon: '🗣️',
          lessons: [
            {
              id: '0.1.1',
              title: 'Korte vs. lange klinkers',
              type: LESSON_TYPES.SPEAKING,
              intro:
                'In het Nederlands verandert de betekenis van een woord als een klinker kort of lang is. Luister goed naar het verschil.',
              darijaNote: 'الفرق بين الصوت القصير والطويل يغيّر معنى الكلمة في الهولندية.',
              items: [
                { nl: 'man', pair: 'maan', ipa: '/mɑn/ – /maːn/', tip: 'Kort "a" zoals in Darija «مانا»; lange "aa" houd je langer aan.', darijaLat: 'rajel – qamar' },
                { nl: 'bos', pair: 'boos', ipa: '/bɔs/ – /boːs/', tip: 'Korte "o" is open; lange "oo" is ronder en langer.', darijaLat: 'ghaba – ghadeb' },
                { nl: 'pit', pair: 'piet', ipa: '/pɪt/ – /pit/', tip: 'Korte "i" ligt tussen i en e; lange "ie" is een heldere «i».' },
                { nl: 'bus', pair: 'buur', ipa: '/bʏs/ – /byːr/', tip: 'De "u" bestaat niet in Darija: rond je lippen als bij «oe» maar zeg «i».' },
                { nl: 'les', pair: 'lees', ipa: '/lɛs/ – /leːs/', tip: 'Korte "e" zoals in «best»; lange "ee" langer aanhouden.' },
                { nl: 'zon', pair: 'zoon', ipa: '/zɔn/ – /zoːn/', tip: 'Korte "o" (zon = شمس) vs. lange "oo" (zoon = الولد).', darija: 'شمس', darijaLat: 'chems (zon)' },
                { nl: 'tak', pair: 'taak', ipa: '/tɑk/ – /taːk/', tip: 'tak = فرع, taak = مهمة. De "aa" is duidelijk langer.', darija: 'فرع', darijaLat: 'fer3 (tak)' },
                { nl: 'vis', pair: 'vies', ipa: '/vɪs/ – /vis/', tip: 'vis = حوت, vies = موسخ. Korte "i" vs. heldere "ie".', darija: 'حوت', darijaLat: 'hout (vis)' },
                { nl: 'bom', pair: 'boom', ipa: '/bɔm/ – /boːm/', tip: 'bom = قنبلة, boom = شجرة.', darija: 'شجرة', darijaLat: 'chajra (boom)' },
                { nl: 'pot', pair: 'poot', ipa: '/pɔt/ – /poːt/', tip: 'pot = طنجرة, poot = رجل الحيوان.', darija: 'طنجرة', darijaLat: 'tenjra (pot)' },
                { nl: 'rok', pair: 'rook', ipa: '/rɔk/ – /roːk/', tip: 'rok = تنورة, rook = دخان.', darija: 'دخان', darijaLat: 'dokhan (rook)' },
              ],
            },
            {
              id: '0.1.2',
              title: 'Tweeklanken (UI, EU, IE, IJ/EI, OE, OU/AU)',
              type: LESSON_TYPES.SPEAKING,
              intro:
                'Tweeklanken zijn twee klinkers die samensmelten tot één klank. Let goed op de stand van je mond.',
              darijaNote:
                'الأصوات المركّبة (diftongen) غير موجودة بهذا الشكل في الدارجة — ركّزي على حركة الفم.',
              items: [
                { nl: 'huis', ipa: '/hœys/', tip: '"ui": begin met «a» en glijd naar «u». Rond je lippen op het einde.', darija: 'دار', darijaLat: 'dar (huis)' },
                { nl: 'deur', ipa: '/døːr/', tip: '"eu": zeg «ee» maar met ronde lippen, zoals bij «oe».', darija: 'باب', darijaLat: 'bab (deur)' },
                { nl: 'niet', ipa: '/nit/', tip: '"ie": een lange, heldere «i» zoals in het Arabische «ي».', darija: 'ماشي', darijaLat: 'machi' },
                { nl: 'trein', pair: 'tijd', ipa: '/trɛin/ – /tɛit/', tip: '"ei" en "ij" klinken hetzelfde: begin bij «e» en glijd naar «i».' },
                { nl: 'boek', ipa: '/buk/', tip: '"oe" is als de Arabische «و» in «نور».', darija: 'كتاب', darijaLat: 'ktab (boek)' },
                { nl: 'koud', pair: 'blauw', ipa: '/kɑut/ – /blɑu/', tip: '"ou" en "au" klinken hetzelfde: «a» die naar «u» glijdt.' },
                { nl: 'tuin', ipa: '/tœyn/', tip: '"ui" opnieuw: van «a» naar «u» met ronde lippen.', darija: 'جردة', darijaLat: 'jarda (tuin)' },
                { nl: 'neus', ipa: '/nøːs/', tip: '"eu": «ee» met ronde lippen.', darija: 'نيف', darijaLat: 'nif (neus)' },
                { nl: 'vier', ipa: '/vir/', tip: '"ie": lange heldere «i».', darija: 'ربعة', darijaLat: 'reb3a (vier)' },
                { nl: 'klein', ipa: '/klɛin/', tip: '"ei": van «e» naar «i».', darija: 'صغير', darijaLat: 'sghir (klein)' },
                { nl: 'goed', ipa: '/ɣut/', tip: '"oe" zoals de Arabische «و».', darija: 'مزيان', darijaLat: 'mzyan (goed)' },
                { nl: 'vrouw', ipa: '/vrɑu/', tip: '"ou": «a» die naar «u» glijdt.', darija: 'مرا', darijaLat: 'mra (vrouw)' },
              ],
            },
            {
              id: '0.1.3',
              title: 'Moeilijke medeklinkers (P/B, F/V, G/CH)',
              type: LESSON_TYPES.SPEAKING,
              intro:
                'Sommige medeklinkers zijn lastig omdat ze in het Darija niet (zo) bestaan. Oefen ze met minimale paren.',
              darijaNote:
                'الحرف «P» ما كاينش فالدارجة — كتنطق «B». ركّزي على الفرق باش الكلمة تكون مفهومة.',
              items: [
                { nl: 'pen', pair: 'ben', ipa: '/pɛn/ – /bɛn/', tip: 'P is stemloos (geen trilling in de keel), B is stemhebbend. Leg je hand op je keel om te voelen.' },
                { nl: 'pak', pair: 'bak', ipa: '/pɑk/ – /bɑk/', tip: 'Blaas een klein beetje lucht bij de "p", niet bij de "b".' },
                { nl: 'fee', pair: 'vee', ipa: '/feː/ – /veː/', tip: 'F is stemloos, V is licht stemhebbend. In Vlaanderen liggen ze dicht bij elkaar.' },
                { nl: 'gaan', ipa: '/ɣaːn/', tip: 'De harde "g/ch" is als de Arabische «خ» (khaa), diep in de keel.', darija: 'خ', darijaLat: 'zoals in «خبز» (khubz)' },
                { nl: 'lachen', ipa: '/ˈlɑxə(n)/', tip: '"ch" = dezelfde keelklank als «خ». In Gent iets zachter dan in Nederland.' },
                { nl: 'peer', pair: 'beer', ipa: '/peːr/ – /beːr/', tip: 'peer = لنجاصة (blaas lucht), beer = دب (geen lucht).', darija: 'لنجاصة', darijaLat: 'lenjassa (peer)' },
                { nl: 'vel', pair: 'fel', ipa: '/vɛl/ – /fɛl/', tip: 'vel = جلد (licht stemhebbend), fel = قوي (stemloos).', darija: 'جلد', darijaLat: 'jeld (vel)' },
                { nl: 'vaas', ipa: '/vaːs/', tip: 'Begin zacht met de "v", niet als een "f".', darija: 'مزهرية', darijaLat: 'mazhariya (vaas)' },
                { nl: 'school', ipa: '/sxoːl/', tip: '"sch" = «s» + keelklank «خ». Vlaams vaak zachter.', darija: 'مدرسة', darijaLat: 'medrasa (school)' },
                { nl: 'nacht', ipa: '/nɑxt/', tip: '"cht" = keelklank «خ» + t.', darija: 'ليل', darijaLat: 'lil (nacht)' },
              ],
            },
          ],
        },

        // ---- Module 0.2 -------------------------------------------------
        {
          id: '0.2',
          title: 'Begroetingen & beleefdheid',
          goal: 'Iemand groeten en beleefd reageren in het dagelijks leven.',
          icon: '👋',
          lessons: [
            {
              id: '0.2.1',
              title: 'Groeten',
              type: LESSON_TYPES.VOCAB,
              intro: 'Zo begroet je mensen in Gent, van formeel tot informeel.',
              items: [
                { nl: 'Hallo', darija: 'السلام', darijaLat: 'salam', tip: 'Neutraal, altijd goed.' },
                { nl: 'Dag', darija: 'أهلا', darijaLat: 'ahlan', tip: 'Kan zowel "hallo" als "tot ziens" betekenen.' },
                { nl: 'Goedemorgen', darija: 'صباح الخير', darijaLat: 'sbah lkhir', tip: 'Tot ongeveer 12u.' },
                { nl: 'Goedemiddag', darija: 'مساء الخير', darijaLat: 'msa lkhir', tip: 'Van de middag tot de avond.' },
                { nl: 'Goedenavond', darija: 'مسا الخير', darijaLat: 'msa lkhir', tip: "'s Avonds." },
                { nl: 'Tot ziens', darija: 'بسلامة', darijaLat: 'bslama', tip: 'Bij het afscheid.' },
                { nl: 'Tot morgen', darija: 'نتلاقاو غدا', darijaLat: 'ntlaqaw ghedda' },
                { nl: 'Tot straks', darija: 'نشوفك من بعد', darijaLat: 'nchoufek men be3d', tip: 'Als je elkaar later dezelfde dag weer ziet.' },
                { nl: 'Welkom', darija: 'مرحبا', darijaLat: 'marhba' },
                { nl: 'Hoe gaat het?', darija: 'كي داير؟', darijaLat: 'ki dayer? (labas?)', tip: 'De gewone vraag "hoe gaat het".' },
                { nl: 'Goed, dank u.', darija: 'بخير، شكرا', darijaLat: 'bikhir, choukran', tip: 'Het antwoord op "hoe gaat het?".' },
              ],
            },
            {
              id: '0.2.2',
              title: 'Beleefdheid',
              type: LESSON_TYPES.VOCAB,
              intro: 'Beleefde woorden die je elke dag nodig hebt.',
              items: [
                { nl: 'Alstublieft', darija: 'من فضلك', darijaLat: 'men fadlek', tip: 'Formeel (met "u").' },
                { nl: 'Alsjeblieft', darija: 'عافاك', darijaLat: 'afak', tip: 'Informeel (met "je"). Ook: "hier je" als je iets geeft.' },
                { nl: 'Dank u wel', darija: 'شكرا', darijaLat: 'choukran', tip: 'Formeel bedanken.' },
                { nl: 'Dank je wel', darija: 'شكرا بزاف', darijaLat: 'choukran bezzaf', tip: 'Informeel bedanken.' },
                { nl: 'Graag gedaan', darija: 'بلا جميل', darijaLat: 'bla jmil', tip: 'Antwoord op "dank u".' },
                { nl: 'Sorry', darija: 'سمح ليا', darijaLat: 'smeh liya' },
                { nl: 'Pardon', darija: 'سمح ليا', darijaLat: 'smeh liya', tip: 'Om langs iemand te gaan of iets te vragen.' },
                { nl: 'Merci', darija: 'شكرا', darijaLat: 'choukran', tip: 'In Gent zeggen mensen heel vaak "merci" voor "dank je".' },
                { nl: 'Excuseer', darija: 'سمح ليا', darijaLat: 'smeh liya', tip: 'Typisch Vlaams voor "sorry" of "excuseer me".' },
                { nl: 'Mag ik?', darija: 'واش يمكن؟', darijaLat: 'wach ymken?', tip: 'Om beleefd iets te vragen.' },
                { nl: 'Geen probleem', darija: 'ماكاين مشكل', darijaLat: 'makayn mochkil' },
                { nl: 'Natuurlijk', darija: 'بطبيعة الحال', darijaLat: 'tabi3i' },
              ],
            },
            {
              id: '0.2.3',
              title: 'Spreekoefening: groeten & beleefdheid',
              titleDarija: 'تمرين الكلام: التحية والأدب',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg de begroetingen en beleefde woorden hardop. Luister eerst, spreek dan na.',
              darijaNote: 'قولي التحيات وكلمات الأدب بصوت عالي. سمع الأول، من بعد عاود.',
              items: [
                { nl: 'Hallo', darija: 'السلام', darijaLat: 'salam' },
                { nl: 'Goedemorgen', darija: 'صباح الخير', darijaLat: 'sbah lkhir' },
                { nl: 'Goedenavond', darija: 'مسا الخير', darijaLat: 'msa lkhir' },
                { nl: 'Dank u wel', darija: 'شكرا', darijaLat: 'choukran' },
                { nl: 'Alstublieft', darija: 'من فضلك', darijaLat: 'men fadlek' },
                { nl: 'Sorry', darija: 'سمح ليا', darijaLat: 'smeh liya' },
                { nl: 'Tot ziens', darija: 'بسلامة', darijaLat: 'bslama' },
              ],
            },
          ],
        },

        // ---- Module 0.3 -------------------------------------------------
        {
          id: '0.3',
          title: 'Getallen 0–20',
          goal: 'Tot twintig tellen en getallen herkennen.',
          icon: '🔢',
          lessons: [
            {
              id: '0.3.1',
              title: 'Tellen van 0 tot 20',
              type: LESSON_TYPES.NUMBERS,
              intro: 'Luister en spreek elk getal na. Let op: "twaalf" en "dertien" klinken anders dan je denkt.',
              items: [
                { nl: 'nul', value: 0, darija: 'صفر', darijaLat: 'sifr' },
                { nl: 'een', value: 1, darija: 'واحد', darijaLat: 'wahed' },
                { nl: 'twee', value: 2, darija: 'جوج', darijaLat: 'jouj' },
                { nl: 'drie', value: 3, darija: 'تلاتة', darijaLat: 'tlata' },
                { nl: 'vier', value: 4, darija: 'ربعة', darijaLat: 'reb3a' },
                { nl: 'vijf', value: 5, darija: 'خمسة', darijaLat: 'khamsa' },
                { nl: 'zes', value: 6, darija: 'ستة', darijaLat: 'setta' },
                { nl: 'zeven', value: 7, darija: 'سبعة', darijaLat: 'seb3a' },
                { nl: 'acht', value: 8, darija: 'تمنية', darijaLat: 'tmenya' },
                { nl: 'negen', value: 9, darija: 'تسعة', darijaLat: 'tes3a' },
                { nl: 'tien', value: 10, darija: 'عشرة', darijaLat: '3echra' },
                { nl: 'elf', value: 11, darija: 'حداش', darijaLat: 'hdach' },
                { nl: 'twaalf', value: 12, darija: 'طناش', darijaLat: 'tnach' },
                { nl: 'dertien', value: 13, darija: 'تلطاش', darijaLat: 'teltach' },
                { nl: 'veertien', value: 14, darija: 'ربعطاش', darijaLat: 'rbe3tach' },
                { nl: 'vijftien', value: 15, darija: 'خمسطاش', darijaLat: 'khmestach' },
                { nl: 'zestien', value: 16, darija: 'سطاش', darijaLat: 'settach' },
                { nl: 'zeventien', value: 17, darija: 'سبعطاش', darijaLat: 'sbe3tach' },
                { nl: 'achttien', value: 18, darija: 'تمنطاش', darijaLat: 'tmentach' },
                { nl: 'negentien', value: 19, darija: 'تسعطاش', darijaLat: 'tse3tach' },
                { nl: 'twintig', value: 20, darija: 'عشرين', darijaLat: '3echrin' },
              ],
            },
            {
              id: '0.3.2',
              title: 'Spreekoefening: tel mee (0–20)',
              titleDarija: 'تمرين الكلام: عد معايا',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg elk getal hardop. Je ziet het cijfer en het woord.',
              darijaNote: 'قولي كل رقم بصوت عالي. كتشوف الرقم والكلمة.',
              items: [
                { nl: 'nul', value: 0, darija: 'صفر', darijaLat: 'sifr' },
                { nl: 'een', value: 1, darija: 'واحد', darijaLat: 'wahed' },
                { nl: 'twee', value: 2, darija: 'جوج', darijaLat: 'jouj' },
                { nl: 'drie', value: 3, darija: 'تلاتة', darijaLat: 'tlata' },
                { nl: 'vier', value: 4, darija: 'ربعة', darijaLat: 'reb3a' },
                { nl: 'vijf', value: 5, darija: 'خمسة', darijaLat: 'khamsa' },
                { nl: 'zes', value: 6, darija: 'ستة', darijaLat: 'setta' },
                { nl: 'zeven', value: 7, darija: 'سبعة', darijaLat: 'seb3a' },
                { nl: 'acht', value: 8, darija: 'تمنية', darijaLat: 'tmenya' },
                { nl: 'negen', value: 9, darija: 'تسعة', darijaLat: 'tes3a' },
                { nl: 'tien', value: 10, darija: 'عشرة', darijaLat: '3echra' },
                { nl: 'twaalf', value: 12, darija: 'طناش', darijaLat: 'tnach' },
                { nl: 'vijftien', value: 15, darija: 'خمسطاش', darijaLat: 'khmestach' },
                { nl: 'twintig', value: 20, darija: 'عشرين', darijaLat: '3echrin' },
              ],
            },
          ],
        },

        // ---- Module 0.4 -------------------------------------------------
        {
          id: '0.4',
          title: 'Vraagwoorden & omgeving',
          goal: 'De basisvraagwoorden en tien woorden in en om het huis.',
          icon: '🏠',
          lessons: [
            {
              id: '0.4.1',
              title: 'Vraagwoorden',
              type: LESSON_TYPES.VOCAB,
              intro: 'Met deze woorden stel je je eerste vragen.',
              items: [
                { nl: 'Wie?', darija: 'شكون؟', darijaLat: 'chkoun?', example: 'Wie ben jij?' },
                { nl: 'Wat?', darija: 'شنو؟', darijaLat: 'chnou?', example: 'Wat is dat?' },
                { nl: 'Waar?', darija: 'فين؟', darijaLat: 'fin?', example: 'Waar woon je?' },
                { nl: 'Wanneer?', darija: 'إمتى؟', darijaLat: 'imta?', example: 'Wanneer kom je?' },
                { nl: 'Hoe?', darija: 'كيفاش؟', darijaLat: 'kifach?', example: 'Hoe gaat het?' },
                { nl: 'Waarom?', darija: 'علاش؟', darijaLat: '3lach?', example: 'Waarom niet?' },
                { nl: 'Hoeveel?', darija: 'بشحال؟', darijaLat: 'bch7al?', example: 'Hoeveel kost dit?' },
                { nl: 'Welke?', darija: 'أشمن؟', darijaLat: 'achmen?', example: 'Welke bus is dit?' },
              ],
            },
            {
              id: '0.4.2',
              title: 'In huis (10 basiswoorden)',
              type: LESSON_TYPES.VOCAB,
              intro: 'Tien dingen die je thuis ziet. Let op het lidwoord (de/het).',
              items: [
                { nl: 'tafel', article: 'de', darija: 'الطبلة', darijaLat: 'tebla' },
                { nl: 'stoel', article: 'de', darija: 'الكرسي', darijaLat: 'kursi' },
                { nl: 'raam', article: 'het', darija: 'الشرجم', darijaLat: 'chergem' },
                { nl: 'deur', article: 'de', darija: 'الباب', darijaLat: 'bab' },
                { nl: 'bed', article: 'het', darija: 'الناموسية', darijaLat: 'namousiya' },
                { nl: 'lamp', article: 'de', darija: 'الضو', darijaLat: 'dou' },
                { nl: 'keuken', article: 'de', darija: 'الكوزينة', darijaLat: 'kuzina' },
                { nl: 'bad', article: 'het', darija: 'الحمام', darijaLat: 'hammam' },
                { nl: 'muur', article: 'de', darija: 'الحيط', darijaLat: 'hit' },
                { nl: 'vloer', article: 'de', darija: 'الأرض', darijaLat: 'lard' },
                { nl: 'kast', article: 'de', darija: 'الخزانة', darijaLat: 'khzana' },
                { nl: 'bank', article: 'de', darija: 'الكنبة', darijaLat: 'kanaba', tip: 'De zetel om op te zitten (niet de geldbank).' },
                { nl: 'spiegel', article: 'de', darija: 'المراية', darijaLat: 'mraya' },
                { nl: 'koelkast', article: 'de', darija: 'التلاجة', darijaLat: 'tallaja' },
                { nl: 'toilet', article: 'het', darija: 'المرحاض', darijaLat: 'mirhad' },
                { nl: 'bord', article: 'het', darija: 'الطبسيل', darijaLat: 'tebsil' },
                { nl: 'lepel', article: 'de', darija: 'المعلقة', darijaLat: 'm3elqa' },
                { nl: 'vork', article: 'de', darija: 'الفرشيطة', darijaLat: 'farchita' },
                { nl: 'mes', article: 'het', darija: 'الموس', darijaLat: 'mous' },
                { nl: 'tas', article: 'de', darija: 'الكاس', darijaLat: 'kas', tip: 'In Vlaanderen: een "tas" koffie = een kop koffie.' },
              ],
            },
            {
              id: '0.4.3',
              title: 'Spreekoefening: vragen & voorwerpen',
              titleDarija: 'تمرين الكلام: الأسئلة والأشياء',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg de vraagwoorden en de dingen in huis hardop, met het lidwoord (de/het).',
              darijaNote: 'قولي كلمات السؤال والأشياء ديال الدار بصوت عالي، مع الأداة (de/het).',
              items: [
                { nl: 'Wie?', darija: 'شكون؟', darijaLat: 'chkoun?' },
                { nl: 'Wat?', darija: 'شنو؟', darijaLat: 'chnou?' },
                { nl: 'Waar?', darija: 'فين؟', darijaLat: 'fin?' },
                { nl: 'de tafel', darija: 'الطبلة', darijaLat: 'tebla' },
                { nl: 'de stoel', darija: 'الكرسي', darijaLat: 'kursi' },
                { nl: 'het raam', darija: 'الشرجم', darijaLat: 'chergem' },
                { nl: 'de deur', darija: 'الباب', darijaLat: 'bab' },
                { nl: 'het bed', darija: 'الناموسية', darijaLat: 'namousiya' },
              ],
            },
          ],
        },
      ],
    },

    // =======================================================================
    //  NIVEAU 1 — EERSTE COMMUNICATIE (A1.1, Gent/Vlaanderen)
    // =======================================================================
    {
      id: 'niveau-1',
      order: 1,
      title: 'Niveau 1',
      subtitle: 'Eerste communicatie',
      description:
        'Jezelf voorstellen, over je familie praten, eenvoudige zinnen maken en boodschappen doen in Gent.',
      cefr: 'A1.1',
      icon: '💬',
      accent: 'saffraan',
      modules: [
        // ---- Module 1.1 -------------------------------------------------
        {
          id: '1.1',
          title: 'Jezelf voorstellen',
          goal: 'Vertellen wie je bent, waar je vandaan komt en waar je woont.',
          icon: '🙋‍♀️',
          lessons: [
            {
              id: '1.1.1',
              title: 'Wie ben ik?',
              type: LESSON_TYPES.PHRASES,
              intro: 'De zinnen die je nodig hebt om jezelf voor te stellen in Gent.',
              items: [
                { nl: 'Ik ben Fatima.', darija: 'أنا فاطمة', darijaLat: 'ana Fatima' },
                { nl: 'Mijn naam is Fatima.', darija: 'سميتي فاطمة', darijaLat: 'smiti Fatima' },
                { nl: 'Ik kom uit Marokko.', darija: 'أنا من المغرب', darijaLat: 'ana men lmaghrib' },
                { nl: 'Ik kom uit Oujda.', darija: 'أنا من وجدة', darijaLat: 'ana men Oujda' },
                { nl: 'Ik woon in Gent.', darija: 'أنا ساكنة فگاند', darijaLat: 'ana sakna f Gent' },
                { nl: 'Ik spreek Darija en een beetje Nederlands.', darija: 'كنهضر بالدارجة وشوية بالهولندية', darijaLat: 'kanhder b darija w chwiya b hollandiya' },
                { nl: 'Aangenaam.', darija: 'متشرفين', darijaLat: 'motacharrifin', tip: 'Zeg je als je iemand voor het eerst ontmoet.' },
                { nl: 'Hoe heet jij?', darija: 'شنو سميتك؟', darijaLat: 'chno smitek?' },
                { nl: 'Waar kom jij vandaan?', darija: 'منين نتا/نتِ؟', darijaLat: 'mnin nta/nti?' },
                { nl: 'Ik ben getrouwd.', darija: 'أنا مزوجة', darijaLat: 'ana mzewja' },
                { nl: 'Ik heb twee kinderen.', darija: 'عندي جوج دراري', darijaLat: '3andi jouj drari' },
              ],
            },
            {
              id: '1.1.2',
              title: 'Spreekoefening: stel jezelf voor',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Spreek de zinnen in. De app luistert (Whisper) en een AI-docent (Gemini) helpt je verbeteren.',
              items: [
                { nl: 'Ik ben Fatima.', darija: 'أنا فاطمة (بدلي بسميتك)' },
                { nl: 'Ik kom uit Oujda.', darija: 'أنا من وجدة' },
                { nl: 'Ik woon in Gent.', darija: 'أنا ساكنة فگاند' },
                { nl: 'Ik spreek een beetje Nederlands.', darija: 'كنهضر شوية بالهولندية' },
                {
                  nl: 'Stel jezelf nu voor in drie zinnen.',
                  answer: 'Ik ben ... Ik kom uit Oujda. Ik woon in Gent.',
                  darija: 'دابا قدمي راسك بثلاث جمل',
                },
              ],
            },
          ],
        },

        // ---- Module 1.2 -------------------------------------------------
        {
          id: '1.2',
          title: 'Familie & gezin',
          goal: 'Praten over je familie en bezit aangeven (mijn, jouw, uw).',
          icon: '👨‍👩‍👧‍👦',
          lessons: [
            {
              id: '1.2.1',
              title: 'De familieleden',
              type: LESSON_TYPES.VOCAB,
              intro: 'Woordenschat over het gezin.',
              items: [
                { nl: 'man', article: 'de', darija: 'الراجل', darijaLat: 'rajel' },
                { nl: 'vrouw', article: 'de', darija: 'المرا', darijaLat: 'mra' },
                { nl: 'kind', article: 'het', darija: 'الولد/الطفل', darijaLat: 'weld / tfel' },
                { nl: 'zoon', article: 'de', darija: 'الولد', darijaLat: 'weld' },
                { nl: 'dochter', article: 'de', darija: 'البنت', darijaLat: 'bent' },
                { nl: 'broer', article: 'de', darija: 'الخو', darijaLat: 'khou' },
                { nl: 'zus', article: 'de', darija: 'الأخت', darijaLat: 'oukht' },
                { nl: 'moeder', article: 'de', darija: 'الأم', darijaLat: 'oumm / mama' },
                { nl: 'vader', article: 'de', darija: 'الأب', darijaLat: 'bba / baba' },
                { nl: 'ouders', article: 'de', darija: 'الوالدين', darijaLat: 'lwalidin', tip: 'Vader én moeder samen (altijd "de", meervoud).' },
                { nl: 'oma', article: 'de', darija: 'الجدة', darijaLat: 'jedda', tip: 'grootmoeder' },
                { nl: 'opa', article: 'de', darija: 'الجد', darijaLat: 'jedd', tip: 'grootvader' },
                { nl: 'tante', article: 'de', darija: 'العمة / الخالة', darijaLat: '3amma / khala', tip: 'In Vlaanderen ook "matante".' },
                { nl: 'oom', article: 'de', darija: 'العم / الخال', darijaLat: '3amm / khal', tip: 'In Vlaanderen zegt men vaak "nonkel".' },
                { nl: 'baby', article: 'de', darija: 'الرضيع', darijaLat: 'rdi3' },
              ],
            },
            {
              id: '1.2.2',
              title: 'Bezittelijke voornaamwoorden',
              type: LESSON_TYPES.GRAMMAR,
              intro:
                'Met "mijn", "jouw" en "uw" laat je zien van wie iets is. "Uw" is beleefd (formeel).',
              darijaNote: 'ديالي = mijn، ديالك = jouw، ديالكم (احترام) = uw.',
              items: [
                { nl: 'mijn', darija: 'ديالي', darijaLat: 'dyali', example: 'mijn broer / mijn kind' },
                { nl: 'jouw', darija: 'ديالك', darijaLat: 'dyalek', example: 'jouw zus / jouw huis' },
                { nl: 'uw', darija: 'ديالكم', darijaLat: 'dyalkoum', example: 'uw naam (beleefd)' },
                { nl: 'Dat is mijn dochter.', example: 'Voorbeeldzin', darija: 'هادي بنتي', darijaLat: 'hadi benti' },
                { nl: 'Is dat jouw broer?', example: 'Voorbeeldzin', darija: 'واش هادا خوك؟', darijaLat: 'wach hada khouk?' },
                { nl: 'zijn', darija: 'ديالو', darijaLat: 'dyalou', example: 'zijn vader (van een man)' },
                { nl: 'haar', darija: 'ديالها', darijaLat: 'dyalha', example: 'haar moeder (van een vrouw)' },
                { nl: 'ons / onze', darija: 'ديالنا', darijaLat: 'dyalna', example: 'ons huis / onze straat' },
                { nl: 'hun', darija: 'ديالهم', darijaLat: 'dyalhom', example: 'hun kinderen' },
              ],
            },
            {
              id: '1.2.3',
              title: 'Spreekoefening: familie',
              titleDarija: 'تمرين الكلام: العائلة',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg de familieleden hardop, met het lidwoord (de/het).',
              darijaNote: 'قولي أفراد العائلة بصوت عالي، مع الأداة (de/het).',
              items: [
                { nl: 'de man', darija: 'الراجل', darijaLat: 'rajel' },
                { nl: 'de vrouw', darija: 'المرا', darijaLat: 'mra' },
                { nl: 'het kind', darija: 'الولد', darijaLat: 'weld' },
                { nl: 'de zoon', darija: 'الولد', darijaLat: 'weld' },
                { nl: 'de dochter', darija: 'البنت', darijaLat: 'bent' },
                { nl: 'de broer', darija: 'الخو', darijaLat: 'khou' },
                { nl: 'de zus', darija: 'الأخت', darijaLat: 'oukht' },
                { nl: 'de moeder', darija: 'الأم', darijaLat: 'mama' },
                { nl: 'de vader', darija: 'الأب', darijaLat: 'baba' },
              ],
            },
          ],
        },

        // ---- Module 1.3 -------------------------------------------------
        {
          id: '1.3',
          title: 'Basisgrammatica',
          goal: 'De/het, de tegenwoordige tijd en de werkwoorden "zijn" en "hebben".',
          icon: '📘',
          lessons: [
            {
              id: '1.3.1',
              title: 'DE of HET?',
              type: LESSON_TYPES.GRAMMAR,
              intro:
                'Elk zelfstandig naamwoord heeft "de" of "het". Handige regels: mensen zijn (bijna) altijd "de", een meervoud is ALTIJD "de", en een verkleinwoord (-je) is ALTIJD "het".',
              darijaNote:
                'ما كاينش قاعدة كاملة، خاصك تحفظي. ولكن: الجمع دائماً «de»، والتصغير (-je) دائماً «het».',
              items: [
                { nl: 'de man', article: 'de', tip: 'Persoon → de.' },
                { nl: 'de vrouw', article: 'de', tip: 'Persoon → de.' },
                { nl: 'het kind', article: 'het', tip: 'Uitzondering: onzijdig.' },
                { nl: 'de kinderen', article: 'de', tip: 'Meervoud → altijd de.' },
                { nl: 'het tafeltje', article: 'het', tip: 'Verkleinwoord (-je) → altijd het.' },
                { nl: 'het huis', article: 'het' },
                { nl: 'de straat', article: 'de' },
                { nl: 'het meisje', article: 'het', tip: 'Let op: een persoon, maar toch "het" (uitzondering).' },
                { nl: 'de stad', article: 'de', tip: 'Gent is een stad.' },
                { nl: 'het land', article: 'het' },
                { nl: 'de auto', article: 'de' },
                { nl: 'het water', article: 'het' },
                { nl: 'de fiets', article: 'de', tip: 'Heel belangrijk in Gent!' },
                { nl: 'het geld', article: 'het' },
                { nl: 'de winkel', article: 'de' },
              ],
            },
            {
              id: '1.3.2',
              title: 'Tegenwoordige tijd (stam + t)',
              type: LESSON_TYPES.GRAMMAR,
              intro:
                'Regel: ik = stam. jij/hij/zij = stam + t. wij/jullie/zij (mv) = hele werkwoord. Voorbeeld met "wonen" (stam = woon).',
              items: [
                { nl: 'ik woon', darijaLat: 'wonen → ik woon' },
                { nl: 'jij woont', tip: 'stam + t' },
                { nl: 'hij/zij woont', tip: 'stam + t' },
                { nl: 'wij wonen', tip: 'hele werkwoord' },
                { nl: 'ik werk / jij werkt', darijaLat: 'werken' },
                { nl: 'ik heet / jij heet', tip: 'stam eindigt al op t → geen dubbele t', darijaLat: 'heten' },
                { nl: 'ik spreek / jij spreekt', darijaLat: 'spreken' },
                { nl: 'ik kom / jij komt', darijaLat: 'komen' },
                { nl: 'ik eet / jij eet', tip: 'stam eindigt op t → geen dubbele t', darijaLat: 'eten' },
                { nl: 'ik leer / jij leert', darijaLat: 'leren' },
                { nl: 'ik maak / jij maakt', darijaLat: 'maken' },
              ],
            },
            {
              id: '1.3.3',
              title: 'Onregelmatig: zijn & hebben',
              type: LESSON_TYPES.GRAMMAR,
              intro:
                'Deze twee werkwoorden zijn onregelmatig en heel belangrijk. Leer ze uit het hoofd.',
              darijaNote: '«zijn» = كون (ana... )، «hebben» = عند.',
              items: [
                { nl: 'ik ben', darija: 'أنا كاين/ة', darijaLat: 'zijn' },
                { nl: 'jij bent', darijaLat: 'zijn' },
                { nl: 'hij/zij is', darijaLat: 'zijn' },
                { nl: 'wij zijn', darijaLat: 'zijn' },
                { nl: 'ik heb', darija: 'عندي', darijaLat: 'hebben' },
                { nl: 'jij hebt', darija: 'عندك', darijaLat: 'hebben' },
                { nl: 'hij/zij heeft', darija: 'عندو/عندها', darijaLat: 'hebben' },
                { nl: 'wij hebben', darija: 'عندنا', darijaLat: 'hebben' },
                { nl: 'jullie zijn', darijaLat: 'zijn' },
                { nl: 'zij zijn', darijaLat: 'zijn (meervoud)' },
                { nl: 'jullie hebben', darija: 'عندكم', darijaLat: 'hebben' },
                { nl: 'zij hebben', darija: 'عندهم', darijaLat: 'hebben (meervoud)' },
              ],
            },
            {
              id: '1.3.4',
              title: 'Spreekoefening: zijn & hebben',
              titleDarija: 'تمرين الكلام: كون وعند',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg de vormen van "zijn" en "hebben" hardop.',
              darijaNote: 'قولي تصريفات الفعلين "zijn" و "hebben" بصوت عالي.',
              items: [
                { nl: 'ik ben', darija: 'أنا كاين', darijaLat: 'ana kayn' },
                { nl: 'jij bent', darijaLat: 'zijn' },
                { nl: 'hij is', darijaLat: 'zijn' },
                { nl: 'wij zijn', darijaLat: 'zijn' },
                { nl: 'ik heb', darija: 'عندي', darijaLat: '3andi' },
                { nl: 'jij hebt', darija: 'عندك', darijaLat: '3andek' },
                { nl: 'hij heeft', darija: 'عندو', darijaLat: '3andou' },
                { nl: 'wij hebben', darija: 'عندنا', darijaLat: '3andna' },
              ],
            },
          ],
        },

        // ---- Module 1.4 -------------------------------------------------
        {
          id: '1.4',
          title: 'Vragen stellen & boodschappen',
          goal: 'Vragen maken met inversie, tellen tot 100 en boodschappen doen.',
          icon: '🛒',
          lessons: [
            {
              id: '1.4.1',
              title: 'Vragen met inversie',
              type: LESSON_TYPES.GRAMMAR,
              intro:
                'Voor een ja/nee-vraag wissel je het werkwoord en het onderwerp om. "Jij woont" → "Woon jij?"',
              darijaNote: 'باش تسولي سؤال، كتبدلي الفعل والفاعل: «jij woont» → «woon jij?».',
              items: [
                { nl: 'Woon jij in Gent?', example: 'van: jij woont in Gent' },
                { nl: 'Spreek jij Nederlands?', example: 'van: jij spreekt Nederlands' },
                { nl: 'Heb jij kinderen?', example: 'van: jij hebt kinderen' },
                { nl: 'Ben jij van Oujda?', example: 'van: jij bent van Oujda' },
                { nl: 'Werk jij in Gent?', example: 'van: jij werkt in Gent' },
                { nl: 'Kom jij uit Marokko?', example: 'van: jij komt uit Marokko' },
                { nl: 'Versta jij mij?', example: 'van: jij verstaat mij', tip: 'In Vlaanderen: "verstaan" = begrijpen.' },
                { nl: 'Heb jij tijd?', example: 'van: jij hebt tijd' },
              ],
            },
            {
              id: '1.4.2',
              title: 'Getallen 20–100',
              type: LESSON_TYPES.NUMBERS,
              intro:
                'Let op de volgorde: eerst het eenheidsgetal, dan "en", dan het tiental. "eenentwintig" = 1 + en + 20.',
              items: [
                { nl: 'twintig', value: 20 },
                { nl: 'eenentwintig', value: 21, tip: 'een + en + twintig' },
                { nl: 'dertig', value: 30 },
                { nl: 'veertig', value: 40 },
                { nl: 'vijftig', value: 50 },
                { nl: 'zestig', value: 60 },
                { nl: 'zeventig', value: 70 },
                { nl: 'tachtig', value: 80, tip: 'Let op: begint met "t".' },
                { nl: 'negentig', value: 90 },
                { nl: 'honderd', value: 100 },
                { nl: 'vijfentwintig', value: 25, tip: 'vijf + en + twintig' },
                { nl: 'drieëndertig', value: 33, tip: 'drie + en + dertig' },
                { nl: 'achtenveertig', value: 48 },
                { nl: 'negenennegentig', value: 99 },
                { nl: 'duizend', value: 1000 },
              ],
            },
            {
              id: '1.4.3',
              title: 'Bij de winkel & de bakker',
              type: LESSON_TYPES.PHRASES,
              intro: 'Zinnen die je meteen kunt gebruiken bij de bakker of in de winkel in Gent.',
              items: [
                { nl: 'Hoeveel kost dit?', darija: 'بشحال هادا؟', darijaLat: 'bch7al hada?' },
                { nl: 'Ik wil graag een brood.', darija: 'بغيت خبزة عافاك', darijaLat: 'bghit khobza afak' },
                { nl: 'Mag ik een koffie?', darija: 'واش يمكن قهوة؟', darijaLat: 'wach ymken qahwa?' },
                { nl: 'Dat is te duur.', darija: 'هادا غالي بزاف', darijaLat: 'hada ghali bezzaf' },
                { nl: 'Heeft u wisselgeld?', darija: 'واش عندك الصرف؟', darijaLat: 'wach 3andek serf?' },
                { nl: 'Alleen dit, dank u.', darija: 'غير هادا، شكرا', darijaLat: 'ghir hada, choukran' },
                { nl: 'Ik zoek melk.', darija: 'كنقلب على الحليب', darijaLat: 'kanqelleb 3la lhalib' },
                { nl: 'Waar is de kassa?', darija: 'فين الكاصة؟', darijaLat: 'fin lkassa?' },
                { nl: 'Mag ik betalen?', darija: 'واش نخلص؟', darijaLat: 'wach nkhelles?' },
                { nl: 'Met de kaart, alstublieft.', darija: 'بالكارطة عافاك', darijaLat: 'b lkarta afak' },
                { nl: 'Een zakje, alstublieft.', darija: 'شكارة عافاك', darijaLat: 'chkara afak' },
                { nl: 'Bedankt, tot ziens.', darija: 'شكرا، بسلامة', darijaLat: 'choukran, bslama' },
              ],
            },
            {
              id: '1.4.4',
              title: 'Spreekoefening: bij de bakker',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Oefen hardop de zinnen die je bij de bakker of in de winkel gebruikt.',
              items: [
                { nl: 'Goedemorgen, mag ik een brood?', darija: 'صباح الخير، واش يمكن خبزة؟' },
                { nl: 'Hoeveel kost dit?', darija: 'بشحال هادا؟' },
                { nl: 'Ik betaal met de kaart.', darija: 'غنخلص بالكارطة' },
                { nl: 'Dank u wel, tot ziens.', darija: 'شكرا بزاف، بسلامة' },
              ],
            },
          ],
        },

        // ---- Module 1.5 — Tijd: dagen, maanden & de klok ----------------
        {
          id: '1.5',
          title: 'Tijd: dagen, maanden & de klok',
          titleDarija: 'الوقت: الأيام، الشهور والساعة',
          goal: 'De dagen, de maanden en de klok begrijpen en zeggen.',
          icon: '🕒',
          lessons: [
            {
              id: '1.5.1',
              title: 'De dagen van de week',
              titleDarija: 'أيام الأسبوع',
              type: LESSON_TYPES.VOCAB,
              intro: 'De zeven dagen, plus vandaag, morgen en gisteren.',
              items: [
                { nl: 'maandag', darija: 'الاثنين', darijaLat: 'letnin' },
                { nl: 'dinsdag', darija: 'الثلاثاء', darijaLat: 'ttlat' },
                { nl: 'woensdag', darija: 'الأربعاء', darijaLat: 'larb3' },
                { nl: 'donderdag', darija: 'الخميس', darijaLat: 'lekhmis' },
                { nl: 'vrijdag', darija: 'الجمعة', darijaLat: 'jjem3a' },
                { nl: 'zaterdag', darija: 'السبت', darijaLat: 'ssebt' },
                { nl: 'zondag', darija: 'الأحد', darijaLat: 'lhedd' },
                { nl: 'vandaag', darija: 'اليوم', darijaLat: 'lyoum' },
                { nl: 'morgen', darija: 'غدا', darijaLat: 'ghedda' },
                { nl: 'gisteren', darija: 'البارح', darijaLat: 'lbareh' },
              ],
            },
            {
              id: '1.5.2',
              title: 'De maanden',
              titleDarija: 'الشهور',
              type: LESSON_TYPES.VOCAB,
              intro: 'De twaalf maanden van het jaar.',
              items: [
                { nl: 'januari', darija: 'يناير', darijaLat: 'yanayer' },
                { nl: 'februari', darija: 'فبراير', darijaLat: 'febrayer' },
                { nl: 'maart', darija: 'مارس', darijaLat: 'mars' },
                { nl: 'april', darija: 'أبريل', darijaLat: 'abril' },
                { nl: 'mei', darija: 'ماي', darijaLat: 'may' },
                { nl: 'juni', darija: 'يونيو', darijaLat: 'younyou' },
                { nl: 'juli', darija: 'يوليوز', darijaLat: 'youlyouz' },
                { nl: 'augustus', darija: 'غشت', darijaLat: 'ghocht' },
                { nl: 'september', darija: 'شتنبر', darijaLat: 'choutanbir' },
                { nl: 'oktober', darija: 'أكتوبر', darijaLat: 'oktober' },
                { nl: 'november', darija: 'نونبر', darijaLat: 'nounbir' },
                { nl: 'december', darija: 'دجنبر', darijaLat: 'dujanbir' },
              ],
            },
            {
              id: '1.5.3',
              title: 'Hoe laat is het?',
              titleDarija: 'شحال فالساعة؟',
              type: LESSON_TYPES.PHRASES,
              intro: 'Vragen en zeggen hoe laat het is, en de delen van de dag.',
              items: [
                { nl: 'Hoe laat is het?', darija: 'شحال فالساعة؟', darijaLat: 'ch7al f sa3a?' },
                { nl: 'Het is één uur.', darija: 'الساعة الوحدة', darijaLat: 'sa3a lwehda' },
                { nl: 'Het is half drie.', darija: 'الساعة الجوج ونص', darijaLat: 'sa3a jouj w ness' },
                { nl: 'de ochtend', darija: 'الصباح', darijaLat: 'sbah' },
                { nl: 'de middag', darija: 'الظهر', darijaLat: 'dhor' },
                { nl: 'de avond', darija: 'العشية', darijaLat: 'l3chiya' },
                { nl: 'de nacht', darija: 'الليل', darijaLat: 'llil' },
                { nl: 'nu', darija: 'دابا', darijaLat: 'daba' },
                { nl: 'straks', darija: 'من بعد', darijaLat: 'men be3d' },
              ],
            },
            {
              id: '1.5.4',
              title: 'Spreekoefening: dagen & tijd',
              titleDarija: 'تمرين الكلام: الأيام والوقت',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Zeg de dagen en enkele tijdswoorden hardop.',
              items: [
                { nl: 'maandag', darija: 'الاثنين', darijaLat: 'letnin' },
                { nl: 'vrijdag', darija: 'الجمعة', darijaLat: 'jjem3a' },
                { nl: 'zondag', darija: 'الأحد', darijaLat: 'lhedd' },
                { nl: 'vandaag', darija: 'اليوم', darijaLat: 'lyoum' },
                { nl: 'morgen', darija: 'غدا', darijaLat: 'ghedda' },
                { nl: 'Hoe laat is het?', darija: 'شحال فالساعة؟', darijaLat: 'ch7al f sa3a?' },
              ],
            },
          ],
        },

        // ---- Module 1.6 — Onderweg in Gent ------------------------------
        {
          id: '1.6',
          title: 'Onderweg in Gent',
          titleDarija: 'فالطريق فگاند',
          goal: 'Het openbaar vervoer gebruiken en de weg vragen in Gent.',
          icon: '🚋',
          lessons: [
            {
              id: '1.6.1',
              title: 'Vervoer & tickets',
              titleDarija: 'النقل والتيكيات',
              type: LESSON_TYPES.PHRASES,
              intro: 'Woorden en zinnen voor de tram, de bus en het station.',
              items: [
                { nl: 'de tram', darija: 'الطرام', darijaLat: 'tram' },
                { nl: 'de bus', darija: 'الطوبيس', darijaLat: 'tobis' },
                { nl: 'de trein', darija: 'القطار', darijaLat: 'tran' },
                { nl: 'het station', darija: 'المحطة', darijaLat: 'mahatta' },
                { nl: 'de halte', darija: 'الأريي', darijaLat: 'arret' },
                { nl: 'het ticket', darija: 'التيكي', darijaLat: 'tiki' },
                { nl: 'Waar is de halte?', darija: 'فين الأريي؟', darijaLat: 'fin larret?' },
                { nl: 'Een ticket, alstublieft.', darija: 'تيكي عافاك', darijaLat: 'tiki afak' },
                { nl: 'Hoeveel kost een ticket?', darija: 'بشحال التيكي؟', darijaLat: 'bch7al tiki?' },
              ],
            },
            {
              id: '1.6.2',
              title: 'De weg vragen',
              titleDarija: 'تسول على الطريق',
              type: LESSON_TYPES.PHRASES,
              intro: 'Vragen waar iets is, en de richtingen begrijpen.',
              items: [
                { nl: 'Waar is...?', darija: 'فين...؟', darijaLat: 'fin...?' },
                { nl: 'links', darija: 'على اليسار', darijaLat: '3la lisar' },
                { nl: 'rechts', darija: 'على اليمين', darijaLat: '3la limin' },
                { nl: 'rechtdoor', darija: 'نيشان', darijaLat: 'nichan' },
                { nl: 'hier', darija: 'هنا', darijaLat: 'hna' },
                { nl: 'daar', darija: 'تما', darijaLat: 'temma' },
                { nl: 'dichtbij', darija: 'قريب', darijaLat: 'qrib' },
                { nl: 'ver', darija: 'بعيد', darijaLat: 'b3id' },
                { nl: 'Ik ben verdwaald.', darija: 'أنا توضرت', darijaLat: 'ana twedert' },
                { nl: 'Kunt u mij helpen?', darija: 'واش تقدر تعاوني؟', darijaLat: 'wach tqder t3awni?' },
              ],
            },
            {
              id: '1.6.3',
              title: 'Spreekoefening: onderweg',
              titleDarija: 'تمرين الكلام: فالطريق',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Oefen hardop de zinnen die je onderweg gebruikt.',
              items: [
                { nl: 'Waar is de halte?', darija: 'فين الأريي؟', darijaLat: 'fin larret?' },
                { nl: 'Een ticket, alstublieft.', darija: 'تيكي عافاك', darijaLat: 'tiki afak' },
                { nl: 'links', darija: 'على اليسار', darijaLat: '3la lisar' },
                { nl: 'rechts', darija: 'على اليمين', darijaLat: '3la limin' },
                { nl: 'rechtdoor', darija: 'نيشان', darijaLat: 'nichan' },
                { nl: 'Kunt u mij helpen?', darija: 'واش تقدر تعاوني؟', darijaLat: 'wach tqder t3awni?' },
              ],
            },
          ],
        },

        // ---- Module 1.7 — Bij de dokter & gezondheid --------------------
        {
          id: '1.7',
          title: 'Bij de dokter & gezondheid',
          titleDarija: 'عند الطبيب والصحة',
          goal: 'Je lichaam benoemen en zeggen dat je ziek bent of pijn hebt.',
          icon: '🩺',
          lessons: [
            {
              id: '1.7.1',
              title: 'Het lichaam',
              titleDarija: 'الجسم',
              type: LESSON_TYPES.VOCAB,
              intro: 'De belangrijkste lichaamsdelen. Let op het lidwoord (de/het).',
              items: [
                { nl: 'hoofd', article: 'het', darija: 'الراس', darijaLat: 'ras' },
                { nl: 'hand', article: 'de', darija: 'اليد', darijaLat: 'yedd' },
                { nl: 'voet', article: 'de', darija: 'الرجل', darijaLat: 'rjel' },
                { nl: 'buik', article: 'de', darija: 'الكرش', darijaLat: 'kerch' },
                { nl: 'rug', article: 'de', darija: 'الظهر', darijaLat: 'dher' },
                { nl: 'oog', article: 'het', darija: 'العين', darijaLat: '3in' },
                { nl: 'oor', article: 'het', darija: 'الودن', darijaLat: 'weden' },
                { nl: 'mond', article: 'de', darija: 'الفم', darijaLat: 'fomm' },
                { nl: 'keel', article: 'de', darija: 'الحلق', darijaLat: 'helq' },
              ],
            },
            {
              id: '1.7.2',
              title: 'Ik ben ziek',
              titleDarija: 'أنا مريضة',
              type: LESSON_TYPES.PHRASES,
              intro: 'Zeggen dat je ziek bent, pijn hebt, en een afspraak maken.',
              items: [
                { nl: 'Ik ben ziek.', darija: 'أنا مريضة', darijaLat: 'ana mrida' },
                { nl: 'Ik heb pijn.', darija: 'كنحس بالوجيعة', darijaLat: 'kanhess b lwji3a' },
                { nl: 'Ik heb hoofdpijn.', darija: 'راسي كيوجعني', darijaLat: 'rasi kaywej3ni' },
                { nl: 'Ik heb koorts.', darija: 'عندي السخانة', darijaLat: '3andi skhana' },
                { nl: 'Ik heb een dokter nodig.', darija: 'خاصني طبيب', darijaLat: 'khasni tbib' },
                { nl: 'Ik heb een afspraak.', darija: 'عندي موعد', darijaLat: '3andi maw3id' },
                { nl: 'Waar is de apotheek?', darija: 'فين الفارماسيان؟', darijaLat: 'fin farmasyan?' },
                { nl: 'Help!', darija: 'عاونوني!', darijaLat: '3awnouni!' },
              ],
            },
            {
              id: '1.7.3',
              title: 'Spreekoefening: bij de dokter',
              titleDarija: 'تمرين الكلام: عند الطبيب',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Oefen hardop wat je bij de dokter zegt.',
              items: [
                { nl: 'Ik ben ziek.', darija: 'أنا مريضة', darijaLat: 'ana mrida' },
                { nl: 'Ik heb pijn.', darija: 'كنحس بالوجيعة', darijaLat: 'kanhess b lwji3a' },
                { nl: 'Ik heb koorts.', darija: 'عندي السخانة', darijaLat: '3andi skhana' },
                { nl: 'Ik heb een afspraak.', darija: 'عندي موعد', darijaLat: '3andi maw3id' },
                { nl: 'Waar is de apotheek?', darija: 'فين الفارماسيان؟', darijaLat: 'fin farmasyan?' },
              ],
            },
          ],
        },

        // ---- Module 1.8 — Eten & boodschappen ---------------------------
        {
          id: '1.8',
          title: 'Eten & boodschappen',
          titleDarija: 'الماكلة والتسوق',
          goal: 'Kleuren, eten en drinken, en bestellen op café of restaurant.',
          icon: '🍽️',
          lessons: [
            {
              id: '1.8.1',
              title: 'Kleuren',
              titleDarija: 'الألوان',
              type: LESSON_TYPES.VOCAB,
              intro: 'De basiskleuren.',
              items: [
                { nl: 'rood', darija: 'أحمر', darijaLat: 'hmer' },
                { nl: 'blauw', darija: 'أزرق', darijaLat: 'zreq' },
                { nl: 'geel', darija: 'أصفر', darijaLat: 'sfer' },
                { nl: 'groen', darija: 'أخضر', darijaLat: 'khder' },
                { nl: 'zwart', darija: 'كحل', darijaLat: 'khel' },
                { nl: 'wit', darija: 'بيض', darijaLat: 'byed' },
                { nl: 'bruin', darija: 'قهوي', darijaLat: 'qehwi' },
                { nl: 'oranje', darija: 'ليموني', darijaLat: 'limouni' },
              ],
            },
            {
              id: '1.8.2',
              title: 'Eten & drinken',
              titleDarija: 'الماكلة والمشروب',
              type: LESSON_TYPES.VOCAB,
              intro: 'Woorden voor eten en drinken. Let op het lidwoord (de/het).',
              items: [
                { nl: 'brood', article: 'het', darija: 'الخبز', darijaLat: 'khobz' },
                { nl: 'water', article: 'het', darija: 'الما', darijaLat: 'lma' },
                { nl: 'koffie', article: 'de', darija: 'القهوة', darijaLat: 'qahwa' },
                { nl: 'thee', article: 'de', darija: 'أتاي', darijaLat: 'atay' },
                { nl: 'melk', article: 'de', darija: 'الحليب', darijaLat: 'hlib' },
                { nl: 'fruit', article: 'het', darija: 'الفاكية', darijaLat: 'fakya' },
                { nl: 'groente', article: 'de', darija: 'الخضرة', darijaLat: 'khodra' },
                { nl: 'vlees', article: 'het', darija: 'اللحم', darijaLat: 'lhem' },
                { nl: 'vis', article: 'de', darija: 'الحوت', darijaLat: 'hout' },
                { nl: 'ei', article: 'het', darija: 'البيضة', darijaLat: 'bida' },
                { nl: 'suiker', article: 'de', darija: 'السكر', darijaLat: 'soukkar' },
                { nl: 'kaas', article: 'de', darija: 'الفرماج', darijaLat: 'fromaj' },
              ],
            },
            {
              id: '1.8.3',
              title: 'Op café & restaurant',
              titleDarija: 'فالقهوة والمطعم',
              type: LESSON_TYPES.PHRASES,
              intro: 'Bestellen, betalen en beleefd zijn op café of restaurant.',
              items: [
                { nl: 'Een koffie, alstublieft.', darija: 'قهوة عافاك', darijaLat: 'qahwa afak' },
                { nl: 'Mag ik de kaart?', darija: 'واش يمكن المونيو؟', darijaLat: 'wach ymken menu?' },
                { nl: 'Ik heb honger.', darija: 'فيا الجوع', darijaLat: 'fiya jou3' },
                { nl: 'Ik heb dorst.', darija: 'فيا العطش', darijaLat: 'fiya l3tech' },
                { nl: 'Lekker!', darija: 'لذيذ', darijaLat: 'ldid' },
                { nl: 'Smakelijk!', darija: 'بالصحة', darijaLat: 'b sahha' },
                { nl: 'De rekening, alstublieft.', darija: 'الحساب عافاك', darijaLat: 'l7sab afak' },
              ],
            },
            {
              id: '1.8.4',
              title: 'Spreekoefening: bestellen',
              titleDarija: 'تمرين الكلام: الطلب',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Oefen hardop hoe je iets bestelt.',
              items: [
                { nl: 'Een koffie, alstublieft.', darija: 'قهوة عافاك', darijaLat: 'qahwa afak' },
                { nl: 'Mag ik de kaart?', darija: 'واش يمكن المونيو؟', darijaLat: 'wach ymken menu?' },
                { nl: 'De rekening, alstublieft.', darija: 'الحساب عافاك', darijaLat: 'l7sab afak' },
                { nl: 'Smakelijk!', darija: 'بالصحة', darijaLat: 'b sahha' },
              ],
            },
          ],
        },

        // ---- Module 1.9 — Werk & afspraken ------------------------------
        {
          id: '1.9',
          title: 'Werk & afspraken',
          titleDarija: 'الخدمة والمواعيد',
          goal: 'Praten over werk en een afspraak maken.',
          icon: '💼',
          lessons: [
            {
              id: '1.9.1',
              title: 'Werk',
              titleDarija: 'الخدمة',
              type: LESSON_TYPES.VOCAB,
              intro: 'Woorden over werk. Let op het lidwoord (de/het).',
              items: [
                { nl: 'werk', article: 'het', darija: 'الخدمة', darijaLat: 'khedma' },
                { nl: 'baan', article: 'de', darija: 'الپوسط', darijaLat: 'poste' },
                { nl: 'collega', article: 'de', darija: 'الزميل', darijaLat: 'zamil' },
                { nl: 'baas', article: 'de', darija: 'الپاطرون', darijaLat: 'patron' },
                { nl: 'kantoor', article: 'het', darija: 'المكتب', darijaLat: 'mekteb' },
                { nl: 'fabriek', article: 'de', darija: 'المعمل', darijaLat: 'm3mel' },
                { nl: 'afspraak', article: 'de', darija: 'الموعد', darijaLat: 'maw3id' },
                { nl: 'vergadering', article: 'de', darija: 'الاجتماع', darijaLat: 'ijtima3' },
                { nl: 'loon', article: 'het', darija: 'الأجرة', darijaLat: 'lujra' },
                { nl: 'pauze', article: 'de', darija: 'الاستراحة', darijaLat: 'listiraha' },
              ],
            },
            {
              id: '1.9.2',
              title: 'Een afspraak maken',
              titleDarija: 'دير موعد',
              type: LESSON_TYPES.PHRASES,
              intro: 'Zinnen om over werk te praten en een afspraak te maken.',
              items: [
                { nl: 'Ik werk in Gent.', darija: 'كنخدم فگاند', darijaLat: 'kankhdem f Gent' },
                { nl: 'Wat is uw beroep?', darija: 'أشنو الخدمة ديالك؟', darijaLat: 'achnou khedma dyalek?' },
                { nl: 'Ik heb een afspraak.', darija: 'عندي موعد', darijaLat: '3andi maw3id' },
                { nl: 'Kunnen we een afspraak maken?', darija: 'واش نقدرو نديرو موعد؟', darijaLat: 'wach nqedro ndiro maw3id?' },
                { nl: 'Wanneer past het u?', darija: 'إمتى يناسبك؟', darijaLat: 'imta ynasbek?' },
                { nl: 'Om negen uur.', darija: 'فالتسعة', darijaLat: 'f tes3a' },
                { nl: 'Ik kan vandaag niet.', darija: 'ماقدرتش اليوم', darijaLat: 'maqdertch lyoum' },
                { nl: 'Sorry dat ik te laat ben.', darija: 'سمح ليا على التعطيل', darijaLat: 'smeh liya 3la t3til' },
                { nl: 'Tot volgende week.', darija: 'نتلاقاو السيمانة الجاية', darijaLat: 'ntlaqaw simana jjaya' },
              ],
            },
            {
              id: '1.9.3',
              title: 'Spreekoefening: werk & afspraken',
              titleDarija: 'تمرين الكلام: الخدمة والمواعيد',
              type: LESSON_TYPES.SPEAKING,
              intro: 'Oefen hardop wat je zegt over werk en afspraken.',
              items: [
                { nl: 'Ik werk in Gent.', darija: 'كنخدم فگاند', darijaLat: 'kankhdem f Gent' },
                { nl: 'Ik heb een afspraak.', darija: 'عندي موعد', darijaLat: '3andi maw3id' },
                { nl: 'Kunnen we een afspraak maken?', darija: 'واش نقدرو نديرو موعد؟', darijaLat: 'wach nqedro ndiro maw3id?' },
                { nl: 'Sorry dat ik te laat ben.', darija: 'سمح ليا على التعطيل', darijaLat: 'smeh liya 3la t3til' },
                { nl: 'Tot volgende week.', darija: 'نتلاقاو السيمانة الجاية', darijaLat: 'ntlaqaw simana jjaya' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// -- Handige helpers voor de UI ------------------------------------------------

/** Aantal lessen in een level. */
export function countLessons(level) {
  return level.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}

/** Platte lijst met alle lessen-id's (voor voortgangsberekening). */
export function allLessonIds(level) {
  return level.modules.flatMap((m) => m.lessons.map((l) => l.id))
}

/** Zoek een level op id. */
export function getLevel(id) {
  return curriculum.levels.find((l) => l.id === id)
}

export default curriculum
