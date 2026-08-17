const encoder = new TextEncoder();

export function normalizeUsername(value) {
  return String(value || '').normalize('NFKC').trim().toLocaleLowerCase('nl-BE');
}

export function validUsername(value) {
  const username = String(value || '').normalize('NFKC').trim();
  return /^[\p{L}\p{N}_-]{3,32}$/u.test(username);
}

export function validPassword(value) {
  return typeof value === 'string' && value.length >= 10 && value.length <= 128;
}

export function randomToken(byteLength = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return base64Url(bytes);
}

export function randomId() {
  return crypto.randomUUID();
}

function base64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function toBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export async function sha256(value) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(String(value)));
  return base64Url(new Uint8Array(digest));
}

export async function hashPassword(password, iterations = 310000, saltBase64 = null) {
  const salt = saltBase64 ? fromBase64(saltBase64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    256,
  );
  return {
    hash: toBase64(new Uint8Array(bits)),
    salt: toBase64(salt),
    iterations,
  };
}

export async function verifyPassword(password, storedHash, salt, iterations) {
  const candidate = await hashPassword(password, Number(iterations), salt);
  return constantTimeEqual(candidate.hash, storedHash);
}

export function constantTimeEqual(left, right) {
  const a = encoder.encode(String(left));
  const b = encoder.encode(String(right));
  let mismatch = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    mismatch |= (a[index % a.length] || 0) ^ (b[index % b.length] || 0);
  }
  return mismatch === 0;
}

export function parseCookies(header = '') {
  return Object.fromEntries(
    header.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
      const separator = part.indexOf('=');
      return separator < 0
        ? [decodeURIComponent(part), '']
        : [decodeURIComponent(part.slice(0, separator)), decodeURIComponent(part.slice(separator + 1))];
    }),
  );
}

export function sessionCookie(token, env, maxAgeSeconds) {
  const secure = String(env.COOKIE_SECURE ?? 'true') !== 'false';
  const parts = [
    `nl_session=${encodeURIComponent(token)}`,
    'Path=/api',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookie(env) {
  return sessionCookie('', env, 0);
}
