/**
 * ============================================================================
 *  INTERFACE-VERTALINGEN  (Nederlands + Marokkaans-Darija)
 * ============================================================================
 *
 *  Dit bestand bevat ALLE knoppen, titels en teksten van de interface in
 *  twee talen: 'nl' (Nederlands) en 'dar' (Darija, Arabisch schrift).
 *
 *  BELANGRIJK — voor toekomstige uitbreidingen:
 *  Voeg elke nieuwe interface-tekst hier toe met een sleutel, in BEIDE talen.
 *  Gebruik in componenten `t('sleutel')` (zie LanguageContext) in plaats van
 *  een harde tekst. Zo blijft de app automatisch volledig tweetalig.
 *
 *  De LESSTOF zelf (de Nederlandse woorden die geleerd worden) staat in
 *  data/curriculum.js en blijft Nederlands — dat is precies wat geleerd wordt.
 * ============================================================================
 */

export const LANGS = {
  nl: { label: 'Nederlands', short: 'NL', dir: 'ltr' },
  dar: { label: 'الدارجة', short: 'ع', dir: 'rtl' },
}

export const translations = {
  // ==========================================================================
  //  NEDERLANDS
  // ==========================================================================
  nl: {
    // Algemeen
    appTitle: 'Nederlands leren in Gent',
    back: 'Terug',
    settings: 'Instellingen',
    close: 'Sluiten',
    language: 'Taal',
    switchToDarija: 'بالدارجة',
    switchToDutch: 'Nederlands',

    // Welkomstscherm
    welcome: 'Welkom',
    welcomeName: 'Oumayma',
    welcomeTagline:
      'Jouw persoonlijke app om stap voor stap Nederlands te leren voor je nieuwe leven in Gent. 🌷',
    begin: 'Begin met leren',
    help: 'Help',
    chooseLanguage: 'Taal van de app',

    // Dashboard
    dashTitle: 'Leer stap voor stap Nederlands voor Gent',
    dashSub:
      'Een cursus op maat van Darija-sprekers uit Oujda. Van de eerste klanken tot je eerste gesprek bij de bakker.',
    totalProgress: 'Jouw totale voortgang',
    chooseLevel: 'Kies een niveau',
    morePractice: 'Meer oefenen (gratis)',
    offlineNote:
      'De lessen werken offline. De bronnen hierboven openen in je browser voor extra oefening.',
    modules: 'modules',
    lessonsCount: 'lessen',
    completed: 'afgerond',

    // Lestypes
    type_phonetics: 'Uitspraak',
    type_vocab: 'Woordenschat',
    type_phrases: 'Zinnen',
    type_numbers: 'Getallen',
    type_grammar: 'Grammatica',
    type_speaking: 'Spreken',
    type_quiz: 'Oefening',
    items: 'items',
    lesson: 'Les',
    module: 'Module',

    // Leer-modus (kaartjes)
    tapToReveal: 'tik om de vertaling te zien',
    listen: 'Beluister',
    next: 'Volgende',
    toExercise: 'Naar de oefening',
    finishArrow: 'Klaar',

    // Quiz
    quizPrompt: 'Wat is dit in het Nederlands?',
    question: 'Vraag',
    backToLearn: 'terug naar leren',
    seeResult: 'Bekijk resultaat',
    nextQuestion: 'Volgende vraag',
    score: 'Score',

    // Klaar-scherm
    wellDone: 'Goed gedaan!',
    lessonCompletePre: 'Je hebt de les',
    lessonCompletePost: 'afgerond.',
    finishAndBack: 'Afronden en terug',
    practiceAgain: 'Nog eens oefenen',

    // Spreekoefening
    speakThisSentence: 'Spreek deze zin',
    sayLetterWord: 'Zeg de letter en het woord',
    listenExample: 'Beluister voorbeeld',
    record: 'Neem op',
    stopAndCheck: 'Stop & controleer',
    typeYourAnswer: 'Typ hier je antwoord…',
    check: 'Check',
    pleaseWait: 'Even geduld… ik luister en controleer.',
    iHeard: 'Ik hoorde',
    speakingCorrect: 'Goed gedaan!',
    speakingAlmost: 'Bijna — kijk even:',
    correctLabel: 'Correct',
    skip: 'Overslaan',
    keysNeeded: 'Voor de spreekoefening met AI heb je gratis sleutels nodig.',
    openSettingsLink: 'Open de instellingen',
    keysNeededPost: 'om ze in te vullen. Je kunt hieronder ook typen om te oefenen.',
    errNoGroq: 'Geen Groq-sleutel ingesteld.',
    errNoGemini: 'Er is nog geen Gemini-sleutel ingesteld. Open de instellingen.',
    errKeyRejected: 'De sleutel wordt geweigerd. Controleer of je hem juist hebt gekopieerd.',
    errTooMany: 'Even te veel verzoeken. Wacht een momentje en probeer opnieuw.',
    errGeneric: 'Er ging iets mis. Controleer je internet en je sleutels.',
    errNoAudio: 'Ik heb niets verstaan. Probeer opnieuw, wat luider.',
    micNoPermission: 'Geen toestemming voor de microfoon. Sta het toe in je browser.',
    micNoStart: 'Kon de microfoon niet starten.',

    // Instellingen
    settingsTitle: 'Instellingen · API-sleutels',
    settingsDesc:
      'Deze sleutels zijn nodig voor de spreekoefening (microfoon + AI-feedback). Ze zijn gratis en worden alleen op dit toestel bewaard.',
    geminiLabel: 'Google Gemini-sleutel',
    geminiHint: '(AI-feedback)',
    groqLabel: 'Groq-sleutel',
    groqHint: '(spraakherkenning)',
    makeGeminiKey: 'Gratis sleutel maken op Google AI Studio',
    makeGroqKey: 'Gratis sleutel maken op Groq Console',
    settingsTip:
      'Tip: je kunt de app al zonder sleutels gebruiken voor alle lessen en quizzen. De sleutels zijn enkel voor de spreekoefening met AI.',
    save: 'Opslaan',
    saved: 'Opgeslagen',

    // Help
    helpTitle: 'Hoe werkt de app?',
    helpIntro: 'Een korte uitleg over wat de app doet en hoe je ze gebruikt.',
    helpClose: 'Ik snap het!',
  },

  // ==========================================================================
  //  DARIJA (Marokkaans-Arabisch)
  // ==========================================================================
  dar: {
    // Algemeen
    appTitle: 'تعلم الهولندية فگاند',
    back: 'رجوع',
    settings: 'الإعدادات',
    close: 'سد',
    language: 'اللغة',
    switchToDarija: 'بالدارجة',
    switchToDutch: 'Nederlands',

    // Welkomstscherm
    welcome: 'مرحبا',
    welcomeName: 'أوميمة',
    welcomeTagline:
      'التطبيق ديالك باش تعلمي الهولندية شوية بشوية لحياتك الجديدة فگاند. 🌷',
    begin: 'بدا التعلم',
    help: 'مساعدة',
    chooseLanguage: 'لغة التطبيق',

    // Dashboard
    dashTitle: 'تعلمي الهولندية خطوة بخطوة لگاند',
    dashSub:
      'دورة مخصصة لللي كيهضرو الدارجة من وجدة. من أول الأصوات حتى أول محادثة عند الفران.',
    totalProgress: 'التقدم الإجمالي ديالك',
    chooseLevel: 'ختاري مستوى',
    morePractice: 'تمرين إضافي (فابور)',
    offlineNote:
      'الدروس كتخدم بلا أنترنت. الروابط اللي فوق كتحل فالمتصفح لتمرين إضافي.',
    modules: 'وحدات',
    lessonsCount: 'دروس',
    completed: 'مكمّل',

    // Lestypes
    type_phonetics: 'النطق',
    type_vocab: 'المفردات',
    type_phrases: 'جمل',
    type_numbers: 'الأرقام',
    type_grammar: 'القواعد',
    type_speaking: 'الكلام',
    type_quiz: 'تمرين',
    items: 'عناصر',
    lesson: 'درس',
    module: 'وحدة',

    // Leer-modus (kaartjes)
    tapToReveal: 'كليكي باش تشوفي الترجمة',
    listen: 'سمع',
    next: 'اللي من بعد',
    toExercise: 'للتمرين',
    finishArrow: 'سالينا',

    // Quiz
    quizPrompt: 'شنو هادا بالهولندية؟',
    question: 'سؤال',
    backToLearn: 'رجوع للتعلم',
    seeResult: 'شوف النتيجة',
    nextQuestion: 'السؤال اللي من بعد',
    score: 'النقطة',

    // Klaar-scherm
    wellDone: 'برافو عليك!',
    lessonCompletePre: 'كمّلتي الدرس',
    lessonCompletePost: '.',
    finishAndBack: 'سالي ورجع',
    practiceAgain: 'عاود تمرن',

    // Spreekoefening
    speakThisSentence: 'قولي هاد الجملة',
    sayLetterWord: 'قولي الحرف والكلمة',
    listenExample: 'سمع المثال',
    record: 'سجل',
    stopAndCheck: 'وقف وتحقق',
    typeYourAnswer: 'كتبي الجواب هنا…',
    check: 'تحقق',
    pleaseWait: 'صبري شوية… كنسمع وكنتحقق.',
    iHeard: 'سمعت',
    speakingCorrect: 'برافو عليك!',
    speakingAlmost: 'قريبة — شوفي هنا:',
    correctLabel: 'الصحيح',
    skip: 'تجاوز',
    keysNeeded: 'باش تخدمي تمرين الكلام بالذكاء الاصطناعي خاصك مفاتيح فابور.',
    openSettingsLink: 'حل الإعدادات',
    keysNeededPost: 'باش تعمريهم. تقدري تكتبي هنا حتى بلا مفاتيح باش تتمرني.',
    errNoGroq: 'ماكاينش مفتاح Groq.',
    errNoGemini: 'مازال ماكاينش مفتاح Gemini. حل الإعدادات.',
    errKeyRejected: 'المفتاح مرفوض. تأكدي بللي نسختيه مزيان.',
    errTooMany: 'بزاف ديال الطلبات. تسنّي شوية وعاود.',
    errGeneric: 'وقع شي مشكل. تأكدي من الأنترنت والمفاتيح ديالك.',
    errNoAudio: 'ماسمعت والو. عاودي، هضري شوية بزّاف.',
    micNoPermission: 'ماعطيتيش الإذن للميكرو. سمحي بيه فالمتصفح.',
    micNoStart: 'ماقدرتش نشغل الميكرو.',

    // Instellingen
    settingsTitle: 'الإعدادات · مفاتيح API',
    settingsDesc:
      'هاد المفاتيح خاصين لتمرين الكلام (الميكرو + تصحيح بالذكاء الاصطناعي). فابور وكيتسجلو غير فهاد الجهاز.',
    geminiLabel: 'مفتاح Google Gemini',
    geminiHint: '(التصحيح بالذكاء الاصطناعي)',
    groqLabel: 'مفتاح Groq',
    groqHint: '(التعرف على الصوت)',
    makeGeminiKey: 'صايبي مفتاح فابور فـ Google AI Studio',
    makeGroqKey: 'صايبي مفتاح فابور فـ Groq Console',
    settingsTip:
      'ملاحظة: تقدري تستعملي التطبيق بلا مفاتيح لجميع الدروس والتمارين. المفاتيح غير لتمرين الكلام بالذكاء الاصطناعي.',
    save: 'سجل',
    saved: 'تسجل',

    // Help
    helpTitle: 'كيفاش كيخدم التطبيق؟',
    helpIntro: 'شرح قصير على شنو كيدير التطبيق وكيفاش تستعمليه.',
    helpClose: 'فهمت!',
  },
}
