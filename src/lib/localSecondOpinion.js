/**
 * Eerlijke plaats voor een toekomstige Vosk-adapter.
 *
 * Er is nog geen gecontroleerd Nederlands modelbestand in de app opgenomen.
 * Daarom retourneert deze adapter expliciet `available: false`; de interface
 * doet nooit alsof een tweede model heeft meegeluisterd.
 */
export async function transcribeWithLocalSecondOpinion() {
  return {
    available: false,
    text: '',
    provider: null,
    reason: 'LOCAL_MODEL_NOT_INSTALLED',
  }
}
