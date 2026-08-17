export const MESSAGES = {
  BAD_REQUEST: { nl: 'De aanvraag is niet geldig.', darija: 'Had talab ma-sal7ch.' },
  INVALID_JSON: { nl: 'De verstuurde gegevens zijn niet geldig.', darija: 'Lma3loumat li tsifto ma-sal7inch.' },
  UNAUTHORIZED: { nl: 'Meld je opnieuw aan.', darija: '3awed dkhol l7sab dyalk.' },
  FORBIDDEN: { nl: 'Je hebt hiervoor geen toestemming.', darija: 'Ma-3ndekch l7e9 tdir hadchi.' },
  INVALID_ORIGIN: { nl: 'Deze aanvraag komt van een onbekende website.', darija: 'Had talab jay men site ma-ma3roufch.' },
  USERNAME_INVALID: { nl: 'Gebruik 3–32 letters, cijfers, een streepje of underscore.', darija: 'Sta3mel 3–32 7arf, ra9m, - wla _.' },
  USERNAME_TAKEN: { nl: 'Deze gebruikersnaam is al in gebruik.', darija: 'Had smit lmosta3mil deja mest3mla.' },
  PASSWORD_WEAK: { nl: 'Kies een wachtwoord van minstens 10 tekens.', darija: 'Khtar mot de passe fih 10 dyal l7orof 3la l2a9al.' },
  INVALID_CREDENTIALS: { nl: 'Gebruikersnaam of wachtwoord is niet juist.', darija: 'Smit lmosta3mil wla mot de passe ma-s7i7ch.' },
  ACCOUNT_PENDING: { nl: 'Je account wacht nog op goedkeuring.', darija: 'L7sab dyalk mazal kaytsenna lmosada9a.' },
  ACCOUNT_REJECTED: { nl: 'Deze accountaanvraag is geweigerd.', darija: 'Talab dyal had l7sab trefed.' },
  ACCOUNT_SUSPENDED: { nl: 'Dit account is tijdelijk geblokkeerd.', darija: 'Had l7sab mwa9ef mo2a9atan.' },
  NOT_FOUND: { nl: 'Niet gevonden.', darija: 'Ma-l9inach hadchi.' },
  INVALID_STATUS: { nl: 'Deze accountstatus is niet geldig.', darija: '7alat l7sab ma-sal7ach.' },
  RESET_CODE_INVALID: { nl: 'De resetcode is ongeldig of verlopen.', darija: 'Code dyal tabdil mot de passe ghalet wla salat.' },
  PAYLOAD_TOO_LARGE: { nl: 'Deze synchronisatie bevat te veel gegevens.', darija: 'Had synchronisation fiha lma3loumat bzaf.' },
  EVENT_ID_REQUIRED: { nl: 'Een unieke synchronisatiecode ontbreekt.', darija: 'Code wa7ed dyal synchronisation na9es.' },
  ASSIGNMENT_INVALID: { nl: 'De opdracht is niet volledig of ongeldig.', darija: 'Had tamrin na9es wla ma-sal7ch.' },
  ASSIGNMENT_CRITERIA_NOT_MET: { nl: 'De opdracht voldoet nog niet aan het doel.', darija: 'Had tamrin mazal ma-wselch lhadaf.' },
  RATE_LIMITED: { nl: 'Te veel pogingen. Probeer later opnieuw.', darija: 'M7awalat bzaf. 3awed jreb mn b3d.' },
  AUDIO_INVALID: { nl: 'De opname is ongeldig of te lang.', darija: 'Tssjil ma-sal7ch wla twil bzaf.' },
  QUOTA_REACHED: { nl: 'De gratis spraaklimiet is bereikt. Probeer later opnieuw.', darija: 'L7ed lmajani dyal ssout wsel. 3awed jreb mn b3d.' },
  SPEECH_UNAVAILABLE: { nl: 'Spraakherkenning is tijdelijk niet beschikbaar.', darija: 'Ta3arof 3la ssout ma-khdamch daba.' },
  INTERNAL_ERROR: { nl: 'Er ging iets mis. Probeer later opnieuw.', darija: 'Tra chi mochkil. 3awed jreb mn b3d.' },
};

export function messageFor(code) {
  return MESSAGES[code] || MESSAGES.INTERNAL_ERROR;
}
