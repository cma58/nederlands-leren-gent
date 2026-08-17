export const AUDIO_QUALITY = Object.freeze({
  OK: 'OK',
  TOO_SHORT: 'TOO_SHORT',
  TOO_LONG: 'TOO_LONG',
  TOO_QUIET: 'TOO_QUIET',
  CLIPPING: 'CLIPPING',
  EMPTY: 'EMPTY',
  UNKNOWN: 'UNKNOWN',
})

/**
 * Lokale kwaliteitscontrole. Audio verlaat het toestel pas na deze controle.
 * Een browser die het opnameformaat niet kan decoderen krijgt UNKNOWN/pass:
 * dat is geen uitspraakfout en de server kan de opname nog wel verwerken.
 */
export async function analyzeAudioQuality(blob, options = {}) {
  const {
    minDuration = 0.35,
    maxDuration = 18,
    minRms = 0.008,
    maxClippingRatio = 0.08,
  } = options

  if (!blob?.size || blob.size < 700) return result(AUDIO_QUALITY.EMPTY, false)
  if (typeof AudioContext === 'undefined') return result(AUDIO_QUALITY.UNKNOWN, true)

  let context
  try {
    context = new AudioContext()
    const audioBuffer = await context.decodeAudioData(await blob.arrayBuffer())
    const duration = audioBuffer.duration
    if (duration < minDuration) return result(AUDIO_QUALITY.TOO_SHORT, false, { duration })
    if (duration > maxDuration) return result(AUDIO_QUALITY.TOO_LONG, false, { duration })

    let squares = 0
    let clipped = 0
    let samples = 0
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
      const data = audioBuffer.getChannelData(channel)
      const stride = Math.max(1, Math.floor(data.length / 48000))
      for (let index = 0; index < data.length; index += stride) {
        const amplitude = Math.abs(data[index])
        squares += amplitude * amplitude
        if (amplitude >= 0.985) clipped += 1
        samples += 1
      }
    }

    const rms = Math.sqrt(squares / Math.max(samples, 1))
    const clippingRatio = clipped / Math.max(samples, 1)
    if (rms < minRms) return result(AUDIO_QUALITY.TOO_QUIET, false, { duration, rms, clippingRatio })
    if (clippingRatio > maxClippingRatio) {
      return result(AUDIO_QUALITY.CLIPPING, false, { duration, rms, clippingRatio })
    }
    return result(AUDIO_QUALITY.OK, true, { duration, rms, clippingRatio })
  } catch {
    return result(AUDIO_QUALITY.UNKNOWN, true)
  } finally {
    context?.close().catch(() => {})
  }
}

function result(code, usable, metrics = {}) {
  return { code, usable, metrics }
}
