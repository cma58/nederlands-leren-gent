/**
 * Kleine, centrale client voor onze eigen backend.
 *
 * Authenticatie gebeurt uitsluitend via een HttpOnly-cookie. Daarom bewaart
 * deze module nooit tokens in localStorage en stuurt elke call cookies mee.
 */

const DEFAULT_TIMEOUT = 15000

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'UNKNOWN_ERROR', details = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

function preferredMessage(payload) {
  const message = payload?.message
  if (typeof message === 'string') return message
  if (message && typeof message === 'object') {
    return message.nl || message.darija || message.dar || Object.values(message)[0]
  }
  return ''
}

export function apiErrorMessage(error, lang = 'nl') {
  const messages = error?.details?.message
  if (messages && typeof messages === 'object') {
    return lang === 'dar'
      ? messages.darija || messages.dar || messages.nl || error.message
      : messages.nl || messages.darija || messages.dar || error.message
  }
  return error?.message || ''
}

export async function fetchJSON(path, options = {}) {
  const { body, headers, signal, timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  const abort = () => controller.abort()
  signal?.addEventListener('abort', abort, { once: true })

  const requestHeaders = new Headers(headers || {})
  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }
  requestHeaders.set('Accept', 'application/json')

  try {
    const response = await fetch(path, {
      ...fetchOptions,
      credentials: 'include',
      headers: requestHeaders,
      body:
        body === undefined || body instanceof FormData || typeof body === 'string'
          ? body
          : JSON.stringify(body),
      signal: controller.signal,
    })
    const payload = await response.json().catch(() => null)

    if (!response.ok || payload?.ok === false) {
      throw new ApiError(preferredMessage(payload) || `Verzoek mislukt (${response.status})`, {
        status: response.status,
        code: payload?.code || `HTTP_${response.status}`,
        details: payload,
      })
    }
    return payload ?? { ok: true }
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error?.name === 'AbortError') {
      throw new ApiError('De server antwoordde niet op tijd.', { code: 'TIMEOUT' })
    }
    throw new ApiError('De server is niet bereikbaar. Controleer je internetverbinding.', {
      code: 'NETWORK_ERROR',
    })
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abort)
  }
}

const post = (path, body, options) =>
  fetchJSON(path, { ...options, method: 'POST', body })
const patch = (path, body, options) =>
  fetchJSON(path, { ...options, method: 'PATCH', body })

export const authApi = {
  session: (options) => fetchJSON('/api/auth/me', options),
  login: (credentials, options) => post('/api/auth/login', credentials, options),
  register: (account, options) => post('/api/auth/register', account, options),
  logout: (options) => post('/api/auth/logout', {}, options),
  changePassword: (passwords, options) => post('/api/auth/change-password', passwords, options),
  resetPassword: (payload, options) => post('/api/auth/reset-password', payload, options),
}

export const adminApi = {
  users: (status = '', options) =>
    fetchJSON(`/api/admin/users${status ? `?status=${encodeURIComponent(status)}` : ''}`, options),
  updateUserStatus: (id, action, options) =>
    post(`/api/admin/users/${encodeURIComponent(id)}/${action}`, {}, options),
  createPasswordReset: (id, options) =>
    post(`/api/admin/users/${encodeURIComponent(id)}/password-reset`, {}, options),
  userActivity: (id, options) =>
    fetchJSON(`/api/admin/users/${encodeURIComponent(id)}/activity`, options),
  assignments: (options) => fetchJSON('/api/admin/assignments', options),
  createAssignment: (assignment, options) => post('/api/admin/assignments', assignment, options),
  updateAssignment: (id, changes, options) =>
    patch(`/api/admin/assignments/${encodeURIComponent(id)}`, changes, options),
}

export const learnerApi = {
  assignments: (options) => fetchJSON('/api/assignments', options),
  completeAssignment: (id, options) =>
    post(`/api/assignments/${encodeURIComponent(id)}/complete`, {}, options),
}
