import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Kleine hook rond de MediaRecorder-API om audio op te nemen met de microfoon.
 *
 * Geeft terug:
 *   supported   – of opnemen mogelijk is in deze browser
 *   recording   – of er nu opgenomen wordt
 *   elapsedMs   – hoe lang de huidige opname al loopt (voor een timer)
 *   error       – foutcode voor vertaling (micNoPermission/micNoStart/micNotSupported)
 *   start(opts) – begin met opnemen. opts = { maxMs, onComplete(blob) }.
 *                 Stopt automatisch na maxMs; onComplete krijgt de Blob (of null).
 *   stop()      – stop nu; onComplete wordt aangeroepen met de opname
 *   reset()     – wis de laatste fout
 */
export function useRecorder() {
  const supported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof window !== 'undefined' &&
    'MediaRecorder' in window

  const [recording, setRecording] = useState(false)
  const [error, setError] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)

  const mediaRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const onCompleteRef = useRef(null)
  const autoStopRef = useRef(null)
  const tickRef = useRef(null)
  const startedAtRef = useRef(0)
  const unmountedRef = useRef(false)
  // Voorkomt een dubbele start terwijl we nog op de microfoon-toestemming wachten
  // (getUserMedia is async; een tweede tik zou anders een tweede opname starten).
  const startingRef = useRef(false)

  const clearTimers = () => {
    if (autoStopRef.current) {
      clearTimeout(autoStopRef.current)
      autoStopRef.current = null
    }
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
  }

  const teardownStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }

  // Ruim altijd op als de component verdwijnt (bv. les gesloten tijdens opname).
  useEffect(() => {
    return () => {
      unmountedRef.current = true
      clearTimers()
      try {
        if (mediaRef.current && mediaRef.current.state !== 'inactive') mediaRef.current.stop()
      } catch {
        /* negeren */
      }
      teardownStream()
    }
  }, [])

  const start = useCallback(
    async ({ maxMs = 12000, onComplete } = {}) => {
      setError(null)
      if (!supported) {
        setError('micNotSupported')
        return
      }
      // Voorkom meerdere gelijktijdige opnames — ook tijdens het toestemmings-
      // venster (startingRef), niet alleen als de recorder al loopt.
      if (startingRef.current) return
      if (mediaRef.current && mediaRef.current.state === 'recording') return
      startingRef.current = true
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            // Standaard browser-audiobewerking AAN: op de meeste telefoons
            // normaliseert autoGainControl het volume, wat Whisper juist helpt.
            // (Uitzetten bleek in de praktijk slechtere herkenning te geven.)
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
          },
        })
        // Ge-unmount terwijl de mic-toestemming nog liep → meteen opruimen.
        if (unmountedRef.current) {
          stream.getTracks().forEach((tr) => tr.stop())
          return
        }
        streamRef.current = stream
        chunksRef.current = []
        onCompleteRef.current = onComplete || null

        const mime =
          ['audio/webm', 'audio/ogg', 'audio/mp4'].find(
            (t) => window.MediaRecorder.isTypeSupported?.(t),
          ) || ''
        const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)

        rec.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data)
        rec.onstop = () => {
          clearTimers()
          const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' })
          teardownStream()
          setRecording(false)
          setElapsedMs(0)
          const cb = onCompleteRef.current
          onCompleteRef.current = null
          if (cb) cb(blob.size ? blob : null)
        }
        mediaRef.current = rec
        rec.start()
        startedAtRef.current = Date.now()
        setElapsedMs(0)
        setRecording(true)
        tickRef.current = setInterval(() => setElapsedMs(Date.now() - startedAtRef.current), 200)
        // Automatisch stoppen op de tijdslimiet.
        autoStopRef.current = setTimeout(() => {
          try {
            if (rec.state !== 'inactive') rec.stop()
          } catch {
            /* negeren */
          }
        }, maxMs)
      } catch (e) {
        teardownStream()
        setError(e?.name === 'NotAllowedError' ? 'micNoPermission' : 'micNoStart')
      } finally {
        // Startvenster voorbij: vanaf hier bewaakt de 'recording'-status re-entry.
        startingRef.current = false
      }
    },
    [supported],
  )

  const stop = useCallback(() => {
    const rec = mediaRef.current
    try {
      if (rec && rec.state !== 'inactive') rec.stop()
    } catch {
      /* negeren */
    }
  }, [])

  const reset = useCallback(() => setError(null), [])

  return { supported, recording, error, elapsedMs, start, stop, reset }
}
