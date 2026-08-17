import { analyzeAudioQuality, AUDIO_QUALITY } from './audioQuality.js'
import { transcribeAudio } from './groq.js'
import {
  PRONUNCIATION_RESULT,
  isHighRiskPronunciation,
  scoreTranscript,
} from './pronunciation.js'
import { transcribeWithLocalSecondOpinion } from './localSecondOpinion.js'

/** Risicogestuurde spraakcascade met een eerlijke optionele second opinion. */
export async function assessPronunciation({ audioBlob, durationMs, item }) {
  const quality = await analyzeAudioQuality(audioBlob)
  if (!quality.usable) {
    return {
      result: PRONUNCIATION_RESULT.UNSCORABLE,
      reason: quality.code,
      quality,
      transcript: '',
      secondOpinion: null,
    }
  }

  let primary
  try {
    const measuredDurationMs = quality.metrics?.duration
      ? Math.round(quality.metrics.duration * 1000)
      : durationMs
    primary = await transcribeAudio(audioBlob, measuredDurationMs)
  } catch (error) {
    return {
      result: isNoSpeech(error) ? PRONUNCIATION_RESULT.UNSCORABLE : PRONUNCIATION_RESULT.TECHNICAL_ERROR,
      reason: isNoSpeech(error) ? AUDIO_QUALITY.TOO_QUIET : errorCode(error),
      quality,
      transcript: '',
      secondOpinion: null,
      error,
    }
  }

  const primaryResult = scoreTranscript(item, primary.text)
  const highRisk = isHighRiskPronunciation(item)
  const confidenceIsLow = primary.confidence !== null && primary.confidence < 0.62
  const noSpeechIsHigh = primary.noSpeechProbability !== null && primary.noSpeechProbability > 0.45
  const needsSecondOpinion = highRisk || confidenceIsLow || noSpeechIsHigh || primaryResult !== PRONUNCIATION_RESULT.GOOD

  if (!needsSecondOpinion) {
    return assessment(primaryResult, quality, primary, null, 'PRIMARY_CONFIDENT')
  }

  let secondary
  try {
    secondary = await transcribeWithLocalSecondOpinion(audioBlob)
  } catch {
    secondary = { available: false, reason: 'LOCAL_MODEL_FAILED', text: '' }
  }

  if (!secondary?.available) {
    if (highRisk || confidenceIsLow || noSpeechIsHigh) {
      return assessment(PRONUNCIATION_RESULT.REVIEW_PENDING, quality, primary, secondary, secondary?.reason || 'SECOND_OPINION_UNAVAILABLE')
    }
    return assessment(primaryResult, quality, primary, secondary, secondary?.reason || 'SECOND_OPINION_UNAVAILABLE')
  }

  const secondaryResult = scoreTranscript(item, secondary.text)
  if (secondaryResult === primaryResult) {
    return assessment(primaryResult, quality, primary, secondary, 'MODELS_AGREE')
  }
  if (primaryResult === PRONUNCIATION_RESULT.GOOD && secondaryResult === PRONUNCIATION_RESULT.ALMOST) {
    return assessment(PRONUNCIATION_RESULT.ALMOST, quality, primary, secondary, 'SECONDARY_CAUTION')
  }
  return assessment(PRONUNCIATION_RESULT.REVIEW_PENDING, quality, primary, secondary, 'MODELS_DISAGREE')
}

function assessment(result, quality, primary, secondary, reason) {
  return {
    result,
    reason,
    quality,
    transcript: primary?.text || '',
    primary,
    secondOpinion: secondary,
  }
}

function isNoSpeech(error) {
  return error?.status === 'nospeech' || String(error?.message || '').includes('GEEN_SPRAAK')
}

function errorCode(error) {
  if (error?.status === 'offline') return 'OFFLINE'
  if (error?.status === 429) return 'QUOTA_REACHED'
  if (error?.status === 401 || error?.status === 403) return 'SESSION_REQUIRED'
  return 'SPEECH_SERVICE_ERROR'
}
