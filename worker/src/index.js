import {
  clearSessionCookie,
  constantTimeEqual,
  hashPassword,
  normalizeUsername,
  parseCookies,
  randomId,
  randomToken,
  sessionCookie,
  sha256,
  validPassword,
  validUsername,
  verifyPassword,
} from './security.js';
import { messageFor } from './messages.js';
import {
  coachInput,
  coachMessages,
  coachResponseSchema,
  fallbackCoach,
  parseCoachResult,
  validateCoachResponse,
} from './coach.js';
import { REFERENCE_AUDIO_PROMPTS, referenceAudioPrompt } from '../../src/data/referenceAudio.js';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };
const MAX_BODY_BYTES = 600_000;
const PROGRESS_BYTES = 500_000;
const ASSIGNMENT_KINDS = new Set(['EXTRA', 'REQUIRED']);
const TARGET_TYPES = new Set(['LESSON', 'MODULE', 'EXERCISE', 'REVIEW']);
const ASSIGNMENT_STATUSES = new Set(['OPEN', 'COMPLETED', 'EXEMPT', 'CANCELLED']);
const ATTEMPT_TYPES = new Set(['QUIZ', 'SPEAKING', 'LISTENING', 'TYPING', 'REVIEW', 'LESSON']);
const ATTEMPT_RESULTS = new Set([
  'COMPLETED', 'CORRECT', 'INCORRECT', 'ALMOST', 'UNCERTAIN', 'TECHNICAL_ERROR', 'SKIPPED',
  'GOOD', 'RETRY', 'UNSCORABLE', 'REVIEW_PENDING',
]);
const ATTEMPT_METADATA_KEYS = new Set([
  'durationMs', 'confidence', 'exerciseId', 'attemptNumber',
  'reason', 'model', 'quality', 'pronunciationStatus',
]);
const AUDIO_TYPES = new Set(['audio/webm', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a', 'audio/mpeg']);
const REVIEW_AUDIO_MAX_BYTES = 1_500_000;
const REFERENCE_AUDIO_MAX_BYTES = 750_000;
// workerd weigert PBKDF2-aanvragen boven 100.000 iteraties. We gebruiken het
// platformmaximum en voegen daarnaast een server-side pepper toe, zodat een
// los D1-databaselek niet volstaat om wachtwoorden offline te kraken.
const PASSWORD_ITERATIONS = 100_000;

function asciiAt(bytes, offset, text) {
  if (bytes.length < offset + text.length) return false;
  return [...text].every((character, index) => bytes[offset + index] === character.charCodeAt(0));
}

function detectAudioContainer(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value || 0);
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return 'webm';
  if (asciiAt(bytes, 0, 'OggS')) return 'ogg';
  if (asciiAt(bytes, 0, 'RIFF') && asciiAt(bytes, 8, 'WAVE')) return 'wav';
  if (asciiAt(bytes, 4, 'ftyp')) return 'mp4';
  if (asciiAt(bytes, 0, 'ID3') || (bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)) return 'mpeg';
  return '';
}

function audioContainerMatches(mime, value) {
  const expected = {
    'audio/webm': 'webm',
    'audio/ogg': 'ogg',
    'audio/wav': 'wav',
    'audio/x-wav': 'wav',
    'audio/mp4': 'mp4',
    'audio/m4a': 'mp4',
    'audio/x-m4a': 'mp4',
    'audio/mpeg': 'mpeg',
  }[mime];
  return Boolean(expected && detectAudioContainer(value) === expected);
}

async function bytesSha256Hex(value) {
  const digest = await crypto.subtle.digest('SHA-256', value);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

class ApiError extends Error {
  constructor(code, status = 400, details = undefined) {
    super(code);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function ok(data = {}, init = {}) {
  return new Response(JSON.stringify({ ok: true, ...data }), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init.headers || {}) },
  });
}

function failure(error) {
  const isApiError = error instanceof ApiError;
  const code = isApiError ? error.code : 'INTERNAL_ERROR';
  const status = isApiError ? error.status : 500;
  if (!isApiError) console.error(error);
  return new Response(JSON.stringify({
    ok: false,
    code,
    message: messageFor(code),
    ...(isApiError && error.details ? { details: error.details } : {}),
  }), { status, headers: JSON_HEADERS });
}

function allowedOrigins(env, request) {
  const configured = String(env.APP_ORIGIN || '').split(',').map((value) => value.trim()).filter(Boolean);
  // De productie-UI en API worden door dezelfde Worker-origin geleverd. Zo
  // hoeft een nieuwe workers.dev-URL niet eerst als variabele gekopieerd te
  // worden, terwijl externe origins nog steeds expliciet geconfigureerd zijn.
  const ownOrigin = new URL(request.url).origin;
  return [...new Set([ownOrigin, ...configured])];
}

function withCors(response, request, env) {
  const origin = request.headers.get('origin');
  if (origin && allowedOrigins(env, request).includes(origin)) {
    response.headers.set('access-control-allow-origin', origin);
    response.headers.set('access-control-allow-credentials', 'true');
    response.headers.set('vary', 'Origin');
  }
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('referrer-policy', 'no-referrer');
  if (!response.headers.has('cache-control')) response.headers.set('cache-control', 'no-store');
  // API-responses zijn nooit HTML; een strenge, minimale CSP + clickjacking- en
  // HTTPS-afdwinging als defense-in-depth (consistent met de asset-responses).
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('strict-transport-security', 'max-age=31536000; includeSubDomains');
  response.headers.set('permissions-policy', 'microphone=(), camera=(), geolocation=()');
  response.headers.set(
    'content-security-policy',
    "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  );
  return response;
}

function withAssetSecurity(response) {
  const secured = new Response(response.body, response);
  secured.headers.set('x-content-type-options', 'nosniff');
  secured.headers.set('x-frame-options', 'DENY');
  secured.headers.set('referrer-policy', 'no-referrer');
  secured.headers.set('permissions-policy', 'microphone=(self), camera=(), geolocation=()');
  secured.headers.set('strict-transport-security', 'max-age=31536000; includeSubDomains');
  secured.headers.set(
    'content-security-policy',
    "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; "
      + "script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; "
      + "font-src 'self' data:; connect-src 'self'; media-src 'self' blob: https://translate.googleapis.com; "
      + "worker-src 'self' blob:; manifest-src 'self'",
  );
  return secured;
}

function verifyOrigin(request, env) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) return;
  const origin = request.headers.get('origin');
  if (origin && !allowedOrigins(env, request).includes(origin)) throw new ApiError('INVALID_ORIGIN', 403);
}

async function readJson(request, maxBytes = MAX_BODY_BYTES) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > maxBytes) throw new ApiError('PAYLOAD_TOO_LARGE', 413);
  let body;
  try {
    body = await request.json();
  } catch {
    throw new ApiError('INVALID_JSON', 400);
  }
  if (!body || Array.isArray(body) || typeof body !== 'object') throw new ApiError('INVALID_JSON', 400);
  if (new TextEncoder().encode(JSON.stringify(body)).byteLength > maxBytes) {
    throw new ApiError('PAYLOAD_TOO_LARGE', 413);
  }
  return body;
}

function isoNow() {
  return new Date().toISOString();
}

function passwordMaterial(password, env) {
  const pepper = String(env.ADMIN_BOOTSTRAP_SECRET || '');
  if (!pepper) throw new Error('PASSWORD_PEPPER_UNAVAILABLE');
  return `${String(password)}\u0000${pepper}`;
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name || '',
    email: row.email || null,
    role: row.role,
    status: row.status,
    mustChangePassword: Boolean(row.must_change_password),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at || null,
    approvedAt: row.approved_at || null,
    ...(row.active_seconds !== undefined ? { activeSeconds: Number(row.active_seconds || 0) } : {}),
    ...(row.last_active_at !== undefined ? { lastActiveAt: row.last_active_at || null } : {}),
    ...(row.is_online !== undefined ? { online: Boolean(row.is_online) } : {}),
    ...(row.open_assignments !== undefined ? { openAssignments: Number(row.open_assignments || 0) } : {}),
  };
}

function assignmentDto(row) {
  return {
    id: row.id,
    userId: row.user_id,
    kind: row.kind,
    required: row.kind === 'REQUIRED',
    targetType: row.target_type,
    targetId: row.target_id,
    title: { nl: row.title_nl, darija: row.title_darija },
    instructions: { nl: row.instructions_nl || '', darija: row.instructions_darija || '' },
    successCriteria: safeParse(row.success_criteria_json, {}),
    startsAt: row.starts_at || null,
    dueAt: row.due_at || null,
    status: row.status,
    completedAt: row.completed_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function safeParse(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

async function currentSession(request, env) {
  const token = parseCookies(request.headers.get('cookie') || '').nl_session;
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.DB.prepare(`
    SELECT u.*, s.id AS auth_session_id
    FROM auth_sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.revoked_at IS NULL AND datetime(s.expires_at) > CURRENT_TIMESTAMP
    LIMIT 1
  `).bind(tokenHash).first();
  if (!row || row.status !== 'ACTIVE') return null;
  await env.DB.prepare("UPDATE auth_sessions SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ? AND last_seen_at < datetime('now', '-5 minutes')")
    .bind(row.auth_session_id).run();
  return row;
}

async function requireUser(request, env) {
  const user = await currentSession(request, env);
  if (!user) throw new ApiError('UNAUTHORIZED', 401);
  return user;
}

async function requireAdmin(request, env) {
  const user = await requireUser(request, env);
  if (user.role !== 'ADMIN') throw new ApiError('FORBIDDEN', 403);
  return user;
}

async function createSession(env, userId) {
  const token = randomToken(32);
  const id = randomId();
  const days = Math.min(30, Math.max(1, Number(env.SESSION_DAYS || 14)));
  const expiresAt = new Date(Date.now() + days * 86400_000).toISOString();
  await env.DB.prepare(`
    INSERT INTO auth_sessions (id, user_id, token_hash, expires_at)
    VALUES (?, ?, ?, ?)
  `).bind(id, userId, await sha256(token), expiresAt).run();
  return { token, expiresAt, maxAge: days * 86400 };
}

async function audit(env, actorUserId, action, targetType = null, targetId = null, metadata = {}) {
  await env.DB.prepare(`
    INSERT INTO audit_log (id, actor_user_id, action, target_type, target_id, metadata_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(randomId(), actorUserId, action, targetType, targetId, JSON.stringify(metadata)).run();
}

async function rateLimit(env, request, action, subject, limit = 10, minutes = 15) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const key = await sha256(`${action}:${normalizeUsername(subject)}:${ip}`);
  const size = minutes * 60_000;
  const windowStart = new Date(Math.floor(Date.now() / size) * size).toISOString();
  await env.DB.prepare(`
    INSERT INTO auth_rate_limits (rate_key, window_start, attempts) VALUES (?, ?, 1)
    ON CONFLICT(rate_key, window_start) DO UPDATE SET attempts = attempts + 1
  `).bind(key, windowStart).run();
  const row = await env.DB.prepare('SELECT attempts FROM auth_rate_limits WHERE rate_key = ? AND window_start = ?')
    .bind(key, windowStart).first();
  if (Number(row?.attempts || 0) > limit) throw new ApiError('RATE_LIMITED', 429);
}

async function sendRegistrationNotification(env, user) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return;
  const safe = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[char]);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.ADMIN_EMAIL || 'amine.chtaiti@gmail.com'],
      subject: 'Nieuwe accountaanvraag – Nederlands Leren Gent',
      html: `<p>Nieuwe aanvraag van <strong>${safe(user.displayName || user.username)}</strong> (${safe(user.username)}).</p><p>Open het admindashboard om te beoordelen.</p>`,
    }),
  });
  if (!response.ok) console.error('Registration email failed', response.status);
}

async function register(request, env, ctx) {
  const body = await readJson(request, 20_000);
  // Beperk zowel per gebruikersnaam als over alle namen vanaf hetzelfde IP.
  // Anders kan een bot telkens een nieuwe naam kiezen om de limiet te omzeilen.
  await rateLimit(env, request, 'register-ip', '*', 20, 60);
  await rateLimit(env, request, 'register', body.username, 5, 30);
  if (!validUsername(body.username)) throw new ApiError('USERNAME_INVALID');
  if (!validPassword(body.password)) throw new ApiError('PASSWORD_WEAK');
  const username = String(body.username).normalize('NFKC').trim();
  const normalized = normalizeUsername(username);
  const displayName = String(body.displayName || '').normalize('NFKC').trim().slice(0, 80) || null;
  const exists = await env.DB.prepare('SELECT 1 FROM users WHERE username_normalized = ?').bind(normalized).first();
  if (exists) throw new ApiError('USERNAME_TAKEN', 409);
  const derived = await hashPassword(passwordMaterial(body.password, env), PASSWORD_ITERATIONS);
  const user = { id: randomId(), username, displayName };
  try {
    await env.DB.prepare(`
      INSERT INTO users (id, username, username_normalized, display_name, password_hash, password_salt, password_iterations)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(user.id, username, normalized, displayName, derived.hash, derived.salt, derived.iterations).run();
  } catch (error) {
    if (String(error).includes('UNIQUE')) throw new ApiError('USERNAME_TAKEN', 409);
    throw error;
  }
  await audit(env, user.id, 'USER_REGISTERED', 'USER', user.id);
  ctx.waitUntil(sendRegistrationNotification(env, user).catch(console.error));
  return ok({ user: { id: user.id, username, displayName: displayName || '', role: 'STUDENT', status: 'PENDING' } }, { status: 201 });
}

// Vaste dummy-waarden zodat we ALTIJD een (dure) PBKDF2-verificatie kunnen doen,
// ook als de gebruiker niet bestaat. De waarden zijn willekeurig; de vergelijking
// faalt sowieso. Doel: de responstijd verraadt niet of een account bestaat.
const DUMMY_PASSWORD_SALT = btoa('nl-gent-dummy-salt-16');
const DUMMY_PASSWORD_HASH = btoa('nl-gent-dummy-hash-value-32-bytes!!');

async function login(request, env) {
  const body = await readJson(request, 20_000);
  await rateLimit(env, request, 'login', body.username, 10, 15);
  const row = await env.DB.prepare('SELECT * FROM users WHERE username_normalized = ? LIMIT 1')
    .bind(normalizeUsername(body.username)).first();
  // Altijd verifiëren tegen een echte of dummy-hash: gelijk tijdsprofiel, ongeacht
  // of het account bestaat (voorkomt username-enumeratie via timing).
  const target = row || {
    password_hash: DUMMY_PASSWORD_HASH,
    password_salt: DUMMY_PASSWORD_SALT,
    password_iterations: PASSWORD_ITERATIONS,
  };
  const passwordOk = validPassword(body.password)
    && await verifyPassword(passwordMaterial(body.password, env), target.password_hash, target.password_salt, target.password_iterations);
  if (!row || !passwordOk) {
    throw new ApiError('INVALID_CREDENTIALS', 401);
  }
  const statusErrors = { PENDING: 'ACCOUNT_PENDING', REJECTED: 'ACCOUNT_REJECTED', SUSPENDED: 'ACCOUNT_SUSPENDED' };
  if (row.status !== 'ACTIVE') throw new ApiError(statusErrors[row.status] || 'FORBIDDEN', 403);
  const session = await createSession(env, row.id);
  await env.DB.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(row.id).run();
  await audit(env, row.id, 'USER_LOGGED_IN', 'USER', row.id);
  return ok({ user: publicUser({ ...row, last_login_at: isoNow() }), expiresAt: session.expiresAt }, {
    headers: { 'set-cookie': sessionCookie(session.token, env, session.maxAge) },
  });
}

async function logout(request, env) {
  const token = parseCookies(request.headers.get('cookie') || '').nl_session;
  if (token) {
    await env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE token_hash = ?')
      .bind(await sha256(token)).run();
  }
  return ok({}, { headers: { 'set-cookie': clearSessionCookie(env) } });
}

async function sessionInfo(request, env) {
  const user = await currentSession(request, env);
  return ok({ user: publicUser(user) });
}

async function bootstrapAdmin(request, env) {
  if (!env.ADMIN_BOOTSTRAP_SECRET) throw new ApiError('FORBIDDEN', 403);
  const supplied = request.headers.get('x-bootstrap-secret') || '';
  if (!constantTimeEqual(supplied, env.ADMIN_BOOTSTRAP_SECRET)) {
    await rateLimit(env, request, 'admin-bootstrap-invalid-v2', '*', 5, 15);
    throw new ApiError('FORBIDDEN', 403);
  }
  // Gebruik voor geldige installatiepogingen een eigen kort venster. Zo
  // blokkeren eerdere platformfouten een legitieme eerste installatie niet.
  await rateLimit(env, request, 'admin-bootstrap-valid-v2', '*', 10, 15);
  const existing = await env.DB.prepare("SELECT 1 FROM users WHERE role = 'ADMIN' LIMIT 1").first();
  if (existing) throw new ApiError('FORBIDDEN', 409);
  const body = await readJson(request, 20_000);
  if (!validUsername(body.username)) throw new ApiError('USERNAME_INVALID');
  if (!validPassword(body.password)) throw new ApiError('PASSWORD_WEAK');
  const password = await hashPassword(passwordMaterial(body.password, env), PASSWORD_ITERATIONS);
  const id = randomId();
  const email = String(env.ADMIN_EMAIL || 'amine.chtaiti@gmail.com').trim().toLowerCase();
  try {
    await env.DB.prepare(`
      INSERT INTO users (
        id, username, username_normalized, display_name, email, role, status,
        password_hash, password_salt, password_iterations, approved_at
      ) VALUES (?, ?, ?, ?, ?, 'ADMIN', 'ACTIVE', ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      id,
      String(body.username).normalize('NFKC').trim(),
      normalizeUsername(body.username),
      String(body.displayName || 'Amine').normalize('NFKC').trim().slice(0, 80),
      email,
      password.hash,
      password.salt,
      password.iterations,
    ).run();
  } catch (error) {
    if (String(error).includes('UNIQUE')) throw new ApiError('USERNAME_TAKEN', 409);
    throw error;
  }
  await audit(env, id, 'ADMIN_BOOTSTRAPPED', 'USER', id, { email });
  return ok({ user: { id, username: String(body.username).trim(), displayName: body.displayName || 'Amine', email, role: 'ADMIN', status: 'ACTIVE' } }, { status: 201 });
}

async function recoverAdmin(request, env) {
  if (!env.ADMIN_BOOTSTRAP_SECRET) throw new ApiError('FORBIDDEN', 403);
  const supplied = request.headers.get('x-bootstrap-secret') || '';
  // Rate-limit FOUTE pogingen vóór de afwijzing (zelfde patroon als bootstrapAdmin).
  // Anders is het bootstrap-secret hier onbeperkt te brute-forcen → admin-overname.
  if (!constantTimeEqual(supplied, env.ADMIN_BOOTSTRAP_SECRET)) {
    await rateLimit(env, request, 'admin-recover-invalid', '*', 5, 15);
    throw new ApiError('FORBIDDEN', 403);
  }
  // Geldige pogingen krijgen een eigen, ruimer venster.
  await rateLimit(env, request, 'admin-recover-valid', '*', 10, 60);
  const body = await readJson(request, 20_000);
  if (!validPassword(body.newPassword)) throw new ApiError('PASSWORD_WEAK');
  const email = String(env.ADMIN_EMAIL || 'amine.chtaiti@gmail.com').trim().toLowerCase();
  const admin = await env.DB.prepare("SELECT * FROM users WHERE role = 'ADMIN' AND lower(email) = ? LIMIT 1")
    .bind(email).first();
  if (!admin) throw new ApiError('NOT_FOUND', 404);
  const next = await hashPassword(passwordMaterial(body.newPassword, env), PASSWORD_ITERATIONS);
  await env.DB.batch([
    env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?,
      must_change_password = 0, status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .bind(next.hash, next.salt, next.iterations, admin.id),
    env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ?').bind(admin.id),
    env.DB.prepare('UPDATE password_reset_codes SET used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND used_at IS NULL').bind(admin.id),
  ]);
  await audit(env, admin.id, 'ADMIN_PASSWORD_RECOVERED', 'USER', admin.id);
  return ok();
}

async function changePassword(request, env) {
  const user = await requireUser(request, env);
  const body = await readJson(request, 20_000);
  if (!validPassword(body.newPassword)) throw new ApiError('PASSWORD_WEAK');
  if (!(await verifyPassword(passwordMaterial(body.currentPassword || '', env), user.password_hash, user.password_salt, user.password_iterations))) {
    throw new ApiError('INVALID_CREDENTIALS', 401);
  }
  const next = await hashPassword(passwordMaterial(body.newPassword, env), PASSWORD_ITERATIONS);
  await env.DB.batch([
    env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .bind(next.hash, next.salt, next.iterations, user.id),
    env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ? AND id <> ?')
      .bind(user.id, user.auth_session_id),
  ]);
  await audit(env, user.id, 'PASSWORD_CHANGED', 'USER', user.id);
  return ok();
}

async function redeemReset(request, env) {
  const body = await readJson(request, 20_000);
  await rateLimit(env, request, 'reset', body.username, 8, 30);
  if (!validPassword(body.newPassword)) throw new ApiError('PASSWORD_WEAK');
  const codeHash = await sha256(String(body.code || '').trim().toUpperCase());
  const row = await env.DB.prepare(`
    SELECT r.id AS reset_id, r.user_id
    FROM password_reset_codes r JOIN users u ON u.id = r.user_id
    WHERE u.username_normalized = ? AND r.code_hash = ? AND r.used_at IS NULL AND datetime(r.expires_at) > CURRENT_TIMESTAMP
    LIMIT 1
  `).bind(normalizeUsername(body.username), codeHash).first();
  if (!row) throw new ApiError('RESET_CODE_INVALID', 400);
  const next = await hashPassword(passwordMaterial(body.newPassword, env), PASSWORD_ITERATIONS);
  await env.DB.batch([
    env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .bind(next.hash, next.salt, next.iterations, row.user_id),
    env.DB.prepare('UPDATE password_reset_codes SET used_at = CURRENT_TIMESTAMP WHERE id = ?').bind(row.reset_id),
    env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ?').bind(row.user_id),
  ]);
  await audit(env, row.user_id, 'PASSWORD_RESET_REDEEMED', 'USER', row.user_id);
  return ok();
}

async function listUsers(request, env) {
  await requireAdmin(request, env);
  const status = new URL(request.url).searchParams.get('status');
  const params = [];
  const where = status ? 'WHERE u.status = ?' : '';
  if (status) {
    if (!['PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED'].includes(status)) throw new ApiError('INVALID_STATUS');
    params.push(status);
  }
  const result = await env.DB.prepare(`
    SELECT u.*,
      COALESCE((SELECT SUM(duration_seconds) FROM activity_buckets b WHERE b.user_id = u.id), 0) AS active_seconds,
      (SELECT MAX(bucket_start) FROM activity_buckets b WHERE b.user_id = u.id) AS last_active_at,
      CASE WHEN datetime((SELECT MAX(bucket_start) FROM activity_buckets b WHERE b.user_id = u.id)) >= datetime('now', '-90 seconds')
        THEN 1 ELSE 0 END AS is_online,
      COALESCE((SELECT COUNT(*) FROM assignments a WHERE a.user_id = u.id AND a.status = 'OPEN'), 0) AS open_assignments
    FROM users u ${where} ORDER BY CASE u.status WHEN 'PENDING' THEN 0 ELSE 1 END, u.created_at DESC LIMIT 250
  `).bind(...params).all();
  return ok({ users: result.results.map(publicUser) });
}

async function updateUserStatus(request, env, userId, action) {
  const admin = await requireAdmin(request, env);
  const transitions = {
    approve: 'ACTIVE', activate: 'ACTIVE', unblock: 'ACTIVE',
    reject: 'REJECTED', suspend: 'SUSPENDED', block: 'SUSPENDED',
  };
  const status = transitions[action];
  if (!status) throw new ApiError('NOT_FOUND', 404);
  if (userId === admin.id && status !== 'ACTIVE') throw new ApiError('FORBIDDEN', 403);
  const target = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!target) throw new ApiError('NOT_FOUND', 404);
  await env.DB.prepare(`
    UPDATE users SET status = ?, approved_at = CASE WHEN ? = 'ACTIVE' THEN CURRENT_TIMESTAMP ELSE approved_at END,
      approved_by = CASE WHEN ? = 'ACTIVE' THEN ? ELSE approved_by END, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(status, status, status, admin.id, userId).run();
  if (status !== 'ACTIVE') {
    await env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ?').bind(userId).run();
  }
  await audit(env, admin.id, `USER_${status}`, 'USER', userId, { previousStatus: target.status });
  return ok({ user: publicUser({ ...target, status, updated_at: isoNow(), approved_at: status === 'ACTIVE' ? isoNow() : target.approved_at }) });
}

async function createResetCode(request, env, userId) {
  const admin = await requireAdmin(request, env);
  const target = await env.DB.prepare('SELECT id FROM users WHERE id = ?').bind(userId).first();
  if (!target) throw new ApiError('NOT_FOUND', 404);
  let raw = '';
  while (raw.length < 10) raw += randomToken(9).replace(/[-_]/g, '');
  raw = raw.slice(0, 10).toUpperCase();
  const expiresAt = new Date(Date.now() + 60 * 60_000).toISOString();
  // Maak het oude wachtwoord meteen ongeldig. De willekeurige tussenwaarde
  // wordt nergens bewaard; alleen de eenmalige resetcode kan nu nog herstellen.
  const lockedPassword = await hashPassword(passwordMaterial(randomToken(48), env), PASSWORD_ITERATIONS);
  await env.DB.batch([
    env.DB.prepare('UPDATE password_reset_codes SET used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND used_at IS NULL').bind(userId),
    env.DB.prepare(`INSERT INTO password_reset_codes (id, user_id, code_hash, expires_at, created_by) VALUES (?, ?, ?, ?, ?)`)
      .bind(randomId(), userId, await sha256(raw), expiresAt, admin.id),
    env.DB.prepare(`
      UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?,
        must_change_password = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(lockedPassword.hash, lockedPassword.salt, lockedPassword.iterations, userId),
    env.DB.prepare('UPDATE auth_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ?').bind(userId),
  ]);
  await audit(env, admin.id, 'PASSWORD_RESET_CREATED', 'USER', userId, { expiresAt });
  return ok({ resetCode: raw, expiresAt });
}

async function getProgress(request, env) {
  const user = await requireUser(request, env);
  const row = await env.DB.prepare('SELECT * FROM progress_snapshots WHERE user_id = ?').bind(user.id).first();
  return ok({
    completed: safeParse(row?.completed_json || '{}', {}),
    reviewState: safeParse(row?.review_state_json || '{}', {}),
    speakingState: safeParse(row?.speaking_state_json || '{}', {}),
    updatedAt: row?.updated_at || null,
  });
}

function assertJsonObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

async function putProgress(request, env) {
  const user = await requireUser(request, env);
  const body = await readJson(request, PROGRESS_BYTES);
  if (!body.eventId || !/^[A-Za-z0-9:_-]{8,100}$/.test(String(body.eventId))) throw new ApiError('EVENT_ID_REQUIRED');
  const suppliedKeys = ['completed', 'reviewState', 'speakingState'].filter((key) => body[key] !== undefined);
  if (!suppliedKeys.length || suppliedKeys.some((key) => !assertJsonObject(body[key]))) throw new ApiError('INVALID_JSON');
  const payloadHash = await sha256(JSON.stringify({
    merge: body.merge === true,
    data: suppliedKeys.sort().reduce((value, key) => ({ ...value, [key]: body[key] }), {}),
  }));
  const previous = await env.DB.prepare('SELECT payload_hash FROM progress_events WHERE event_id = ? AND user_id = ?')
    .bind(String(body.eventId), user.id).first();
  if (previous) {
    if (previous.payload_hash !== payloadHash) throw new ApiError('BAD_REQUEST', 409);
    return getProgress(request, env);
  }
  const hasCompleted = body.completed !== undefined ? 1 : 0;
  const hasReview = body.reviewState !== undefined ? 1 : 0;
  const hasSpeaking = body.speakingState !== undefined ? 1 : 0;
  const merge = body.merge === true ? 1 : 0;
  await env.DB.batch([
    env.DB.prepare('INSERT INTO progress_events (event_id, user_id, payload_hash) VALUES (?, ?, ?)')
      .bind(String(body.eventId), user.id, payloadHash),
    env.DB.prepare(`
      INSERT INTO progress_snapshots (user_id, completed_json, review_state_json, speaking_state_json, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id) DO UPDATE SET
        completed_json = CASE WHEN ? = 0 THEN progress_snapshots.completed_json WHEN ? = 1
          THEN json_patch(progress_snapshots.completed_json, excluded.completed_json) ELSE excluded.completed_json END,
        review_state_json = CASE WHEN ? = 0 THEN progress_snapshots.review_state_json WHEN ? = 1
          THEN json_patch(progress_snapshots.review_state_json, excluded.review_state_json) ELSE excluded.review_state_json END,
        speaking_state_json = CASE WHEN ? = 0 THEN progress_snapshots.speaking_state_json WHEN ? = 1
          THEN json_patch(progress_snapshots.speaking_state_json, excluded.speaking_state_json) ELSE excluded.speaking_state_json END,
        updated_at = CURRENT_TIMESTAMP
    `).bind(
      user.id,
      JSON.stringify(body.completed || {}), JSON.stringify(body.reviewState || {}), JSON.stringify(body.speakingState || {}),
      hasCompleted, merge, hasReview, merge, hasSpeaking, merge,
    ),
  ]);
  return getProgress(request, env);
}

async function heartbeat(request, env) {
  const user = await requireUser(request, env);
  const body = await readJson(request, 10_000);
  if (!/^[A-Za-z0-9:_-]{8,100}$/.test(String(body.sessionId || '')) || !Number.isSafeInteger(body.sequence) || body.sequence < 0) {
    throw new ApiError('BAD_REQUEST');
  }
  if (!['active', 'idle', 'hidden'].includes(body.state)) throw new ApiError('BAD_REQUEST');
  const serverTime = new Date();
  const sessionId = String(body.sessionId);
  const previous = await env.DB.prepare(`
    SELECT last_sequence, last_seen_at, state FROM activity_sessions
    WHERE user_id = ? AND client_session_id = ?
  `).bind(user.id, sessionId).first();

  // Een eerste puls bewijst nog geen verstreken actieve tijd. Replays en
  // out-of-order pulsen worden genegeerd maar krijgen wel een geldig antwoord.
  if (previous && body.sequence <= Number(previous.last_sequence)) {
    const total = await env.DB.prepare('SELECT COALESCE(SUM(duration_seconds), 0) AS seconds FROM activity_buckets WHERE user_id = ?')
      .bind(user.id).first();
    return ok({ serverTime: serverTime.toISOString(), counted: false, activeSeconds: Number(total?.seconds || 0) });
  }

  let counted = false;
  if (body.state === 'active' && previous?.state === 'active') {
    const deltaSeconds = Math.floor((serverTime.getTime() - new Date(previous.last_seen_at).getTime()) / 1000);
    const creditedSeconds = Math.min(30, Math.max(0, deltaSeconds));
    const bucket = new Date(Math.floor(serverTime.getTime() / 30_000) * 30_000).toISOString();
    if (creditedSeconds > 0 && deltaSeconds <= 45) {
      const result = await env.DB.prepare(`
      INSERT INTO activity_buckets (user_id, bucket_start, duration_seconds, client_session_id, client_sequence)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, bucket_start) DO UPDATE SET
        duration_seconds = MAX(activity_buckets.duration_seconds, excluded.duration_seconds)
    `).bind(user.id, bucket, creditedSeconds, sessionId, body.sequence).run();
      counted = Number(result.meta?.changes || 0) > 0;
    }
  }
  await env.DB.prepare(`
    INSERT INTO activity_sessions (user_id, client_session_id, last_sequence, last_seen_at, state)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id, client_session_id) DO UPDATE SET
      last_sequence = excluded.last_sequence,
      last_seen_at = excluded.last_seen_at,
      state = excluded.state
  `).bind(user.id, sessionId, body.sequence, serverTime.toISOString(), body.state).run();
  const total = await env.DB.prepare('SELECT COALESCE(SUM(duration_seconds), 0) AS seconds FROM activity_buckets WHERE user_id = ?')
    .bind(user.id).first();
  return ok({ serverTime: serverTime.toISOString(), counted, activeSeconds: Number(total?.seconds || 0) });
}

async function createAttempt(request, env) {
  const user = await requireUser(request, env);
  const body = await readJson(request, 20_000);
  const eventId = String(body.eventId || '');
  const lessonId = String(body.lessonId || '').trim();
  const itemKey = body.itemKey == null ? null : String(body.itemKey).trim().slice(0, 160);
  const type = String(body.type || '').toUpperCase();
  const result = String(body.result || '').toUpperCase();
  if (!/^[A-Za-z0-9:_-]{8,100}$/.test(eventId) || !lessonId || lessonId.length > 160
      || !ATTEMPT_TYPES.has(type) || !ATTEMPT_RESULTS.has(result)) throw new ApiError('BAD_REQUEST');
  const score = body.score == null ? null : Number(body.score);
  const maxScore = body.maxScore == null ? null : Number(body.maxScore);
  const hasOnlyOneScorePart = (score == null) !== (maxScore == null);
  if (hasOnlyOneScorePart || (score != null && (!Number.isFinite(score) || score < 0))
      || (maxScore != null && (!Number.isFinite(maxScore) || maxScore <= 0 || maxScore > 1000))
      || (score != null && maxScore != null && score > maxScore)) {
    throw new ApiError('BAD_REQUEST');
  }
  const metadata = {};
  if (body.metadata !== undefined) {
    if (!assertJsonObject(body.metadata)) throw new ApiError('BAD_REQUEST');
    for (const [key, value] of Object.entries(body.metadata)) {
      if (!ATTEMPT_METADATA_KEYS.has(key) || !['string', 'number', 'boolean'].includes(typeof value)) {
        throw new ApiError('BAD_REQUEST');
      }
      metadata[key] = typeof value === 'string' ? value.slice(0, 300) : value;
    }
  }
  const inserted = await env.DB.prepare(`
    INSERT OR IGNORE INTO learning_attempts
      (event_id, user_id, lesson_id, item_key, type, result, score, max_score, metadata_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(eventId, user.id, lessonId, itemKey, type, result, score, maxScore, JSON.stringify(metadata)).run();
  return ok({ stored: Number(inserted.meta?.changes || 0) > 0, eventId }, { status: 201 });
}

async function cleanupExpiredSpeakingReviews(env) {
  await env.DB.batch([
    env.DB.prepare(`
      UPDATE learning_attempts SET result = 'UNSCORABLE'
      WHERE event_id IN (
        SELECT event_id FROM speaking_reviews
        WHERE status = 'PENDING' AND datetime(created_at) < datetime('now', '-7 days')
      )
    `),
    env.DB.prepare(`
      UPDATE speaking_reviews
      SET status = 'RETRY', audio_blob = NULL, reviewed_at = CURRENT_TIMESTAMP
      WHERE status = 'PENDING' AND datetime(created_at) < datetime('now', '-7 days')
    `),
  ]);
}

async function createSpeakingReview(request, env) {
  const user = await requireUser(request, env);
  // Begrens het aantal audio-uploads per gebruiker (elk tot ~1,5MB in D1) om
  // storage-misbruik te voorkomen. Reviews ontstaan alleen bij echte twijfel,
  // dus 60/uur is ruim voldoende voor normaal gebruik.
  await rateLimit(env, request, 'speaking-review', user.id, 60, 60);
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > REVIEW_AUDIO_MAX_BYTES + 50_000) throw new ApiError('PAYLOAD_TOO_LARGE', 413);
  let form;
  try { form = await request.formData(); } catch { throw new ApiError('BAD_REQUEST'); }

  const eventId = String(form.get('eventId') || '');
  const lessonId = String(form.get('lessonId') || '').trim();
  const itemKey = String(form.get('itemKey') || '').trim().slice(0, 160) || null;
  const expectedText = String(form.get('expectedText') || '').normalize('NFKC').trim().slice(0, 160);
  const transcript = String(form.get('transcript') || '').normalize('NFKC').trim().slice(0, 300);
  const reason = String(form.get('reason') || 'SECOND_OPINION_UNAVAILABLE').slice(0, 100);
  const durationMs = Math.round(Number(form.get('durationMs')));
  const audio = form.get('audio');
  const audioType = audio instanceof File ? audio.type.split(';')[0].toLowerCase() : '';

  if (!/^[A-Za-z0-9:_-]{8,100}$/.test(eventId) || !lessonId || lessonId.length > 160
      || !expectedText || !(audio instanceof File) || audio.size < 300
      || audio.size > REVIEW_AUDIO_MAX_BYTES || !AUDIO_TYPES.has(audioType)
      || !Number.isFinite(durationMs) || durationMs < 250 || durationMs > 30_000) {
    throw new ApiError('BAD_REQUEST');
  }

  await cleanupExpiredSpeakingReviews(env);
  const audioBytes = await audio.arrayBuffer();
  const metadata = JSON.stringify({ reason });
  const results = await env.DB.batch([
    env.DB.prepare(`
      INSERT OR IGNORE INTO learning_attempts
        (event_id, user_id, lesson_id, item_key, type, result, metadata_json)
      VALUES (?, ?, ?, ?, 'SPEAKING', 'REVIEW_PENDING', ?)
    `).bind(eventId, user.id, lessonId, itemKey, metadata),
    env.DB.prepare(`
      INSERT OR IGNORE INTO speaking_reviews
        (event_id, user_id, expected_text, transcript_text, audio_mime, audio_blob, duration_ms, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(eventId, user.id, expectedText, transcript || null, audioType, audioBytes, durationMs, reason),
  ]);
  return ok({ stored: Number(results[1]?.meta?.changes || 0) > 0, eventId }, { status: 201 });
}

async function listSpeakingReviews(request, env) {
  await requireAdmin(request, env);
  await cleanupExpiredSpeakingReviews(env);
  const result = await env.DB.prepare(`
    SELECT sr.event_id, sr.user_id, sr.expected_text, sr.transcript_text,
      sr.duration_ms, sr.reason, sr.created_at, u.username, u.display_name
    FROM speaking_reviews sr JOIN users u ON u.id = sr.user_id
    WHERE sr.status = 'PENDING' AND sr.audio_blob IS NOT NULL
    ORDER BY sr.created_at ASC LIMIT 250
  `).all();
  return ok({ reviews: result.results.map((row) => ({
    eventId: row.event_id,
    userId: row.user_id,
    username: row.username,
    displayName: row.display_name || row.username,
    expectedText: row.expected_text,
    transcript: row.transcript_text || '',
    durationMs: Number(row.duration_ms),
    reason: row.reason || '',
    createdAt: row.created_at,
    audioUrl: `/api/admin/speaking-reviews/${encodeURIComponent(row.event_id)}/audio`,
  })) });
}

function d1BlobToBytes(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  // D1 leest een SQLite BLOB volgens de Workers Binding API terug als een
  // gewone nummerarray. Response accepteert die array niet als binaire audio.
  if (Array.isArray(value)) return Uint8Array.from(value);
  return null;
}

async function speakingReviewAudio(request, env, eventId) {
  await requireAdmin(request, env);
  const row = await env.DB.prepare(`
    SELECT audio_blob, audio_mime FROM speaking_reviews
    WHERE event_id = ? AND status = 'PENDING' AND audio_blob IS NOT NULL
  `).bind(eventId).first();
  if (!row) throw new ApiError('NOT_FOUND', 404);
  const audioBytes = d1BlobToBytes(row.audio_blob);
  if (!audioBytes?.byteLength) throw new ApiError('NOT_FOUND', 404);
  return new Response(audioBytes, {
    headers: {
      'content-type': row.audio_mime,
      'content-length': String(audioBytes.byteLength),
      'cache-control': 'private, no-store',
      'content-disposition': 'inline',
    },
  });
}

async function decideSpeakingReview(request, env, eventId) {
  const admin = await requireAdmin(request, env);
  const body = await readJson(request, 10_000);
  const decision = String(body.decision || '').toUpperCase();
  if (!['APPROVED', 'RETRY'].includes(decision)) throw new ApiError('BAD_REQUEST');
  const review = await env.DB.prepare('SELECT status, user_id FROM speaking_reviews WHERE event_id = ?')
    .bind(eventId).first();
  if (!review) throw new ApiError('NOT_FOUND', 404);
  if (review.status !== 'PENDING') throw new ApiError('INVALID_STATUS', 409);
  const attemptResult = decision === 'APPROVED' ? 'GOOD' : 'RETRY';
  await env.DB.batch([
    env.DB.prepare('UPDATE learning_attempts SET result = ? WHERE event_id = ?').bind(attemptResult, eventId),
    env.DB.prepare(`
      UPDATE speaking_reviews SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP,
        audio_blob = NULL WHERE event_id = ?
    `).bind(decision, admin.id, eventId),
  ]);
  await audit(env, admin.id, `SPEAKING_REVIEW_${decision}`, 'ATTEMPT', eventId, { userId: review.user_id });
  return ok({ eventId, decision, result: attemptResult });
}

async function listReferenceAudioPrompts(request, env) {
  await requireAdmin(request, env);
  const result = await env.DB.prepare(`
    SELECT prompt_id, category, locale, spoken_text, audio_mime, duration_ms,
      size_bytes, version, updated_at
    FROM reference_audio
  `).all();
  const stored = new Map(result.results.map((row) => [row.prompt_id, row]));
  const prompts = REFERENCE_AUDIO_PROMPTS.map((prompt) => {
    const row = stored.get(prompt.id);
    const needsRerecording = Boolean(row && (
      row.category !== prompt.category || row.locale !== prompt.locale || row.spoken_text !== prompt.text
    ));
    return {
      ...prompt,
      recorded: Boolean(row) && !needsRerecording,
      hasStoredAudio: Boolean(row),
      needsRerecording,
      audioMime: row?.audio_mime || null,
      durationMs: row ? Number(row.duration_ms) : null,
      sizeBytes: row ? Number(row.size_bytes) : null,
      version: row ? Number(row.version) : 0,
      updatedAt: row?.updated_at || null,
      audioUrl: row && !needsRerecording ? `/api/reference-audio/${encodeURIComponent(prompt.id)}` : null,
    };
  });
  return ok({
    prompts,
    orphanedAudio: result.results
      .filter((row) => !referenceAudioPrompt(row.prompt_id))
      .map((row) => ({
        promptId: row.prompt_id,
        durationMs: Number(row.duration_ms),
        sizeBytes: Number(row.size_bytes),
        updatedAt: row.updated_at,
      })),
    summary: {
      total: prompts.length,
      recorded: prompts.filter((prompt) => prompt.recorded).length,
      required: prompts.filter((prompt) => prompt.requiredForLive).length,
      requiredRecorded: prompts.filter((prompt) => prompt.requiredForLive && prompt.recorded).length,
    },
  });
}

async function uploadReferenceAudio(request, env) {
  const admin = await requireAdmin(request, env);
  await rateLimit(env, request, 'reference-audio-upload', admin.id, 200, 60);
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > REFERENCE_AUDIO_MAX_BYTES + 50_000) throw new ApiError('PAYLOAD_TOO_LARGE', 413);
  let form;
  try { form = await request.formData(); } catch { throw new ApiError('BAD_REQUEST'); }

  const promptId = String(form.get('promptId') || '');
  const prompt = referenceAudioPrompt(promptId);
  const promptMaxBytes = Math.min(REFERENCE_AUDIO_MAX_BYTES, Number(prompt?.maxSizeBytes || REFERENCE_AUDIO_MAX_BYTES));
  const durationMs = Math.round(Number(form.get('durationMs')));
  const consentConfirmed = form.get('consentConfirmed') === 'yes';
  const audio = form.get('audio');
  const audioType = audio instanceof File ? audio.type.split(';')[0].toLowerCase() : '';
  if (!prompt || !(audio instanceof File) || audio.size < 300 || audio.size > promptMaxBytes
      || !AUDIO_TYPES.has(audioType) || !Number.isFinite(durationMs)
      || durationMs < 300 || durationMs > Math.min(10_000, prompt.maxDurationMs)
      || !consentConfirmed) {
    throw new ApiError('AUDIO_INVALID');
  }

  const audioBytes = await audio.arrayBuffer();
  if (!audioContainerMatches(audioType, audioBytes)) throw new ApiError('AUDIO_INVALID');
  const contentSha256 = await bytesSha256Hex(audioBytes);
  await env.DB.prepare(`
    INSERT INTO reference_audio
      (prompt_id, category, locale, spoken_text, audio_mime, audio_blob,
       duration_ms, size_bytes, content_sha256, consent_confirmed, uploaded_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    ON CONFLICT(prompt_id) DO UPDATE SET
      category = excluded.category,
      locale = excluded.locale,
      spoken_text = excluded.spoken_text,
      audio_mime = excluded.audio_mime,
      audio_blob = excluded.audio_blob,
      duration_ms = excluded.duration_ms,
      size_bytes = excluded.size_bytes,
      content_sha256 = excluded.content_sha256,
      consent_confirmed = 1,
      uploaded_by = excluded.uploaded_by,
      version = reference_audio.version + 1,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    prompt.id,
    prompt.category,
    prompt.locale,
    prompt.text,
    audioType,
    audioBytes,
    durationMs,
    audio.size,
    contentSha256,
    admin.id,
  ).run();
  await audit(env, admin.id, 'REFERENCE_AUDIO_UPSERT', 'REFERENCE_AUDIO', prompt.id, {
    locale: prompt.locale,
    durationMs,
    sizeBytes: audio.size,
  });
  const row = await env.DB.prepare(`
    SELECT version, updated_at FROM reference_audio WHERE prompt_id = ?
  `).bind(prompt.id).first();
  return ok({
    promptId: prompt.id,
    recorded: true,
    version: Number(row?.version || 1),
    updatedAt: row?.updated_at || isoNow(),
    audioUrl: `/api/reference-audio/${encodeURIComponent(prompt.id)}`,
  }, { status: 201 });
}

async function deleteReferenceAudio(request, env, promptId) {
  const admin = await requireAdmin(request, env);
  if (!/^[a-z0-9-]{1,100}$/.test(promptId)) throw new ApiError('NOT_FOUND', 404);
  const result = await env.DB.prepare('DELETE FROM reference_audio WHERE prompt_id = ?').bind(promptId).run();
  if (Number(result.meta?.changes || 0) === 0) throw new ApiError('NOT_FOUND', 404);
  await audit(env, admin.id, 'REFERENCE_AUDIO_DELETE', 'REFERENCE_AUDIO', promptId);
  return ok({ promptId, deleted: true });
}

async function referenceAudioFile(request, env, promptId) {
  await requireUser(request, env);
  if (!referenceAudioPrompt(promptId)) throw new ApiError('NOT_FOUND', 404);
  const row = await env.DB.prepare(`
    SELECT audio_blob, audio_mime, size_bytes, version, category, locale, spoken_text
    FROM reference_audio WHERE prompt_id = ?
  `).bind(promptId).first();
  if (!row) throw new ApiError('NOT_FOUND', 404);
  const prompt = referenceAudioPrompt(promptId);
  if (row.category !== prompt.category || row.locale !== prompt.locale || row.spoken_text !== prompt.text) {
    throw new ApiError('NOT_FOUND', 404);
  }
  const audioBytes = d1BlobToBytes(row.audio_blob);
  if (!audioBytes?.byteLength) throw new ApiError('NOT_FOUND', 404);
  return new Response(audioBytes, {
    headers: {
      'content-type': row.audio_mime,
      'content-length': String(audioBytes.byteLength),
      'cache-control': 'private, no-cache',
      'content-disposition': 'inline',
      etag: `"reference-${promptId}-v${Number(row.version || 1)}"`,
    },
  });
}

async function reserveCoachGeneration(env, userId) {
  const usageDay = new Date().toISOString().slice(0, 10);
  const maxDaily = Math.min(50, Math.max(1, Number(env.AI_COACH_DAILY_GENERATIONS_PER_USER || 20)));
  await env.DB.prepare('INSERT OR IGNORE INTO ai_coach_daily_usage (user_id, usage_day) VALUES (?, ?)')
    .bind(userId, usageDay).run();
  const reserved = await env.DB.prepare(`
    UPDATE ai_coach_daily_usage SET generations = generations + 1
    WHERE user_id = ? AND usage_day = ? AND generations < ?
  `).bind(userId, usageDay, maxDaily).run();
  return Number(reserved.meta?.changes || 0) > 0;
}

function coachCacheKey(input) {
  return input.mode === 'WORD' ? `coach:v1:${input.lessonId}:${input.itemIndex}:word` : null;
}

async function coachExplain(request, env) {
  const user = await requireUser(request, env);
  const input = coachInput(await readJson(request, 10_000));
  if (!input) throw new ApiError('BAD_REQUEST');
  const cacheKey = coachCacheKey(input);
  if (cacheKey) {
    const cached = await env.DB.prepare(`
      SELECT id, response_json FROM ai_coach_responses WHERE cache_key = ?
    `).bind(cacheKey).first();
    const coach = validateCoachResponse(safeParse(cached?.response_json, null));
    if (cached && coach) return ok({ coach, responseId: cached.id, source: 'ai', cached: true });
  }

  const fallback = fallbackCoach(input.item, input.mode);
  if (!env.AI || !(await reserveCoachGeneration(env, user.id))) {
    return ok({ coach: fallback, responseId: null, source: 'fallback', limited: true });
  }

  const model = String(env.AI_COACH_MODEL || '@cf/qwen/qwen3-30b-a3b-fp8');
  try {
    const result = await env.AI.run(model, {
      messages: coachMessages(input),
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'coach_response', strict: true, schema: coachResponseSchema },
      },
      max_tokens: 700,
      temperature: 0.2,
    });
    const coach = parseCoachResult(result);
    if (!coach) return ok({ coach: fallback, responseId: null, source: 'fallback' });
    const responseId = randomId();
    const inserted = await env.DB.prepare(`
      INSERT OR IGNORE INTO ai_coach_responses
        (id, cache_key, lesson_id, item_index, mode, model, response_json)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(responseId, cacheKey, input.lessonId, input.itemIndex, input.mode, model, JSON.stringify(coach)).run();
    if (cacheKey && Number(inserted.meta?.changes || 0) === 0) {
      const winner = await env.DB.prepare('SELECT id, response_json FROM ai_coach_responses WHERE cache_key = ?')
        .bind(cacheKey).first();
      const winnerCoach = validateCoachResponse(safeParse(winner?.response_json, null));
      if (winner && winnerCoach) return ok({ coach: winnerCoach, responseId: winner.id, source: 'ai', cached: true });
    }
    return ok({ coach, responseId, source: 'ai', cached: false });
  } catch (error) {
    console.error('AI_COACH_UNAVAILABLE', error?.message || error);
    return ok({ coach: fallback, responseId: null, source: 'fallback' });
  }
}

async function coachFeedback(request, env) {
  const user = await requireUser(request, env);
  const body = await readJson(request, 5_000);
  const responseId = String(body.responseId || '');
  if (!/^[A-Za-z0-9-]{16,80}$/.test(responseId)) throw new ApiError('BAD_REQUEST');
  const id = randomId();
  const inserted = await env.DB.prepare(`
    INSERT OR IGNORE INTO ai_coach_feedback (id, user_id, response_id)
    SELECT ?, ?, id FROM ai_coach_responses WHERE id = ?
  `).bind(id, user.id, responseId).run();
  if (Number(inserted.meta?.changes || 0) === 0) {
    const exists = await env.DB.prepare('SELECT id FROM ai_coach_responses WHERE id = ?').bind(responseId).first();
    if (!exists) throw new ApiError('NOT_FOUND', 404);
  }
  return ok({ reported: true });
}

async function listCoachFeedback(request, env) {
  await requireAdmin(request, env);
  const result = await env.DB.prepare(`
    SELECT r.id AS response_id, r.lesson_id, r.item_index, r.mode, r.model, r.response_json,
      MIN(f.created_at) AS first_reported_at, COUNT(f.id) AS reports
    FROM ai_coach_feedback f JOIN ai_coach_responses r ON r.id = f.response_id
    WHERE f.resolved_at IS NULL
    GROUP BY r.id, r.lesson_id, r.item_index, r.mode, r.model, r.response_json
    ORDER BY first_reported_at ASC LIMIT 100
  `).all();
  return ok({ feedback: result.results.map((row) => ({
    responseId: row.response_id,
    lessonId: row.lesson_id,
    itemIndex: Number(row.item_index),
    mode: row.mode,
    model: row.model,
    coach: validateCoachResponse(safeParse(row.response_json, null)),
    reports: Number(row.reports),
    firstReportedAt: row.first_reported_at,
  })) });
}

async function resolveCoachFeedback(request, env, responseId) {
  const admin = await requireAdmin(request, env);
  const body = await readJson(request, 5_000);
  const decision = String(body.decision || '').toUpperCase();
  if (!['RESOLVED', 'REGENERATE'].includes(decision)) throw new ApiError('BAD_REQUEST');
  const response = await env.DB.prepare('SELECT id, mode FROM ai_coach_responses WHERE id = ?').bind(responseId).first();
  if (!response) throw new ApiError('NOT_FOUND', 404);
  await env.DB.batch([
    env.DB.prepare(`UPDATE ai_coach_feedback SET resolved_at = CURRENT_TIMESTAMP, resolved_by = ?
      WHERE response_id = ? AND resolved_at IS NULL`).bind(admin.id, responseId),
    env.DB.prepare(`UPDATE ai_coach_responses SET cache_key = CASE WHEN ? = 'REGENERATE' THEN NULL ELSE cache_key END,
      updated_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(decision, responseId),
  ]);
  await audit(env, admin.id, `AI_COACH_${decision}`, 'AI_COACH_RESPONSE', responseId);
  return ok({ responseId, decision });
}

async function cleanupAiCoach(env) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM ai_coach_daily_usage WHERE date(usage_day) < date('now', '-14 days')"),
    env.DB.prepare("DELETE FROM auth_rate_limits WHERE datetime(window_start) < datetime('now', '-2 days')"),
    env.DB.prepare(`DELETE FROM ai_coach_responses
      WHERE mode = 'PRONUNCIATION' AND datetime(created_at) < datetime('now', '-30 days')
        AND id NOT IN (SELECT response_id FROM ai_coach_feedback WHERE resolved_at IS NULL)`),
  ]);
}

async function transcribeSpeech(request, env) {
  const user = await requireUser(request, env);
  if (!env.GROQ_API_KEY) throw new ApiError('SPEECH_UNAVAILABLE', 503);
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 6_000_000) throw new ApiError('AUDIO_INVALID', 413);
  let form;
  try { form = await request.formData(); } catch { throw new ApiError('AUDIO_INVALID'); }
  const audio = form.get('audio');
  const durationMs = Number(form.get('durationMs'));
  const maxSeconds = Math.min(60, Math.max(2, Number(env.SPEECH_MAX_SECONDS || 30)));
  const audioType = audio instanceof File ? audio.type.split(';')[0].toLowerCase() : '';
  const declaredSizeCeiling = Number.isFinite(durationMs)
    ? 100_000 + Math.ceil(durationMs / 1000) * 100_000
    : 0;
  if (!(audio instanceof File) || audio.size < 300 || audio.size > 5_000_000
      || audio.size > declaredSizeCeiling || !AUDIO_TYPES.has(audioType)
      || !Number.isFinite(durationMs) || durationMs < 250 || durationMs > maxSeconds * 1000) {
    throw new ApiError('AUDIO_INVALID');
  }
  const usageDay = new Date().toISOString().slice(0, 10);
  const maxDailySeconds = Math.min(3600, Math.max(60, Number(env.SPEECH_DAILY_SECONDS_PER_USER || 600)));
  const maxDailyRequests = Math.min(500, Math.max(10, Number(env.SPEECH_DAILY_REQUESTS_PER_USER || 100)));
  await env.DB.prepare('INSERT OR IGNORE INTO speech_daily_usage (user_id, usage_day) VALUES (?, ?)')
    .bind(user.id, usageDay).run();
  // Reserveer PESSIMISTISCH het platformmaximum (niet de door de client opgegeven
  // duur). Anders kan een aanvaller met durationMs=250 tientallen parallelle
  // verzoeken tegelijk door de dagcap heen laten glippen (race). Na afloop boeken
  // we het ongebruikte deel terug — ook bij een fout, zodat een mislukte poging
  // geen quotum verbruikt.
  const reserveSeconds = maxSeconds;
  const reserved = await env.DB.prepare(`
    UPDATE speech_daily_usage SET requests = requests + 1, audio_seconds = audio_seconds + ?
    WHERE user_id = ? AND usage_day = ? AND requests < ? AND audio_seconds + ? <= ?
  `).bind(reserveSeconds, user.id, usageDay, maxDailyRequests, reserveSeconds, maxDailySeconds).run();
  if (Number(reserved.meta?.changes || 0) === 0) throw new ApiError('QUOTA_REACHED', 429);

  const refundSpeechSeconds = async (amount) => {
    if (amount > 0) {
      await env.DB.prepare(`UPDATE speech_daily_usage SET audio_seconds = max(0, audio_seconds - ?)
        WHERE user_id = ? AND usage_day = ?`).bind(amount, user.id, usageDay).run();
    }
  };

  let data;
  try {
    const upstream = new FormData();
    upstream.set('file', audio, audio.name || 'opname.webm');
    upstream.set('model', env.GROQ_SPEECH_MODEL || 'whisper-large-v3-turbo');
    upstream.set('language', 'nl');
    upstream.set('response_format', 'verbose_json');
    upstream.set('temperature', '0');
    let response;
    try {
      response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.GROQ_API_KEY}` },
        body: upstream,
      });
    } catch {
      throw new ApiError('SPEECH_UNAVAILABLE', 503);
    }
    if (response.status === 429) throw new ApiError('QUOTA_REACHED', 429);
    if (!response.ok) throw new ApiError('SPEECH_UNAVAILABLE', 503);
    try { data = await response.json(); } catch { throw new ApiError('SPEECH_UNAVAILABLE', 503); }
    // Groq rapporteert de gemeten duur; die bepaalt het werkelijke verbruik.
    const measuredSeconds = Number(data.duration);
    if (!Number.isFinite(measuredSeconds) || measuredSeconds <= 0) {
      throw new ApiError('SPEECH_UNAVAILABLE', 503);
    }
    if (measuredSeconds > maxSeconds + 1) throw new ApiError('AUDIO_INVALID', 413);
    // Alleen het werkelijk verbruikte deel blijft staan; de rest terug.
    const billedSeconds = Math.min(reserveSeconds, Math.max(1, Math.ceil(measuredSeconds)));
    await refundSpeechSeconds(reserveSeconds - billedSeconds);
  } catch (error) {
    // Mislukte transcriptie: geef de volledige reservering terug.
    await refundSpeechSeconds(reserveSeconds);
    throw error;
  }
  const segments = Array.isArray(data.segments) ? data.segments : [];
  const logProbs = segments.map((segment) => Number(segment.avg_logprob)).filter(Number.isFinite);
  const noSpeech = segments.map((segment) => Number(segment.no_speech_prob)).filter(Number.isFinite);
  const confidence = logProbs.length
    ? Math.max(0, Math.min(1, Math.exp(logProbs.reduce((sum, value) => sum + value, 0) / logProbs.length)))
    : undefined;
  const noSpeechProbability = noSpeech.length ? Math.max(...noSpeech) : undefined;
  return ok({
    text: String(data.text || '').trim(),
    ...(confidence !== undefined ? { confidence } : {}),
    ...(noSpeechProbability !== undefined ? { noSpeechProbability } : {}),
    provider: 'groq-whisper',
  });
}

async function adminUserActivity(request, env, userId) {
  await requireAdmin(request, env);
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!user) throw new ApiError('NOT_FOUND', 404);
  const totals = await env.DB.prepare(`
    SELECT
      COALESCE(SUM(duration_seconds), 0) AS total,
      COALESCE(SUM(CASE WHEN date(bucket_start) = date('now') THEN duration_seconds ELSE 0 END), 0) AS today,
      COALESCE(SUM(CASE WHEN datetime(bucket_start) >= datetime('now', '-7 days') THEN duration_seconds ELSE 0 END), 0) AS seven_days,
      COALESCE(SUM(CASE WHEN datetime(bucket_start) >= datetime('now', '-30 days') THEN duration_seconds ELSE 0 END), 0) AS thirty_days
    FROM activity_buckets WHERE user_id = ?
  `).bind(userId).first();
  const attempts = await env.DB.prepare(`
    SELECT event_id, lesson_id, item_key, type, result, score, max_score, metadata_json, created_at
    FROM learning_attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 100
  `).bind(userId).all();
  const progress = await env.DB.prepare('SELECT * FROM progress_snapshots WHERE user_id = ?').bind(userId).first();
  const assignments = await env.DB.prepare('SELECT * FROM assignments WHERE user_id = ? ORDER BY created_at DESC LIMIT 100')
    .bind(userId).all();
  return ok({
    user: publicUser(user),
    activity: {
      todaySeconds: Number(totals?.today || 0),
      sevenDaySeconds: Number(totals?.seven_days || 0),
      thirtyDaySeconds: Number(totals?.thirty_days || 0),
      totalSeconds: Number(totals?.total || 0),
    },
    attempts: attempts.results.map((row) => ({
      eventId: row.event_id, lessonId: row.lesson_id, itemKey: row.item_key, type: row.type,
      result: row.result, score: row.score, maxScore: row.max_score,
      metadata: safeParse(row.metadata_json, {}), createdAt: row.created_at,
    })),
    progress: {
      completed: safeParse(progress?.completed_json || '{}', {}),
      reviewState: safeParse(progress?.review_state_json || '{}', {}),
      speakingState: safeParse(progress?.speaking_state_json || '{}', {}),
      updatedAt: progress?.updated_at || null,
    },
    assignments: assignments.results.map(assignmentDto),
  });
}

async function listAssignments(request, env, adminMode = false) {
  const user = adminMode ? await requireAdmin(request, env) : await requireUser(request, env);
  const url = new URL(request.url);
  const requestedUser = adminMode ? url.searchParams.get('userId') : user.id;
  const where = requestedUser ? 'WHERE a.user_id = ?' : '';
  const result = await env.DB.prepare(`SELECT a.* FROM assignments a ${where} ORDER BY CASE a.status WHEN 'OPEN' THEN 0 ELSE 1 END, a.due_at, a.created_at DESC LIMIT 500`)
    .bind(...(requestedUser ? [requestedUser] : [])).all();
  return ok({ assignments: result.results.map(assignmentDto) });
}

function assignmentInput(body, partial = false) {
  const pickText = (nested, flat, language) => String(body[nested]?.[language] ?? body[flat] ?? '').normalize('NFKC').trim();
  const value = {
    userId: body.userId,
    kind: String(body.kind || '').toUpperCase(),
    targetType: String(body.targetType || '').toUpperCase(),
    targetId: String(body.targetId || '').trim(),
    titleNl: pickText('title', 'titleNl', 'nl'),
    titleDarija: pickText('title', 'titleDarija', 'darija'),
    instructionsNl: pickText('instructions', 'instructionsNl', 'nl'),
    instructionsDarija: pickText('instructions', 'instructionsDarija', 'darija'),
    successCriteria: body.successCriteria ?? {},
    startsAt: body.startsAt || null,
    dueAt: body.dueAt || null,
    status: body.status ? String(body.status).toUpperCase() : undefined,
  };
  const criteriaKeys = assertJsonObject(value.successCriteria) ? Object.keys(value.successCriteria) : [];
  const minimum = value.successCriteria?.minimumPercent;
  const invalidCriteria = criteriaKeys.some((key) => key !== 'minimumPercent')
    || (minimum !== undefined && (!Number.isFinite(Number(minimum)) || Number(minimum) < 0 || Number(minimum) > 100));
  if (!partial && (!value.userId || !ASSIGNMENT_KINDS.has(value.kind) || !TARGET_TYPES.has(value.targetType)
      || !value.targetId || !value.titleNl || !value.titleDarija || !assertJsonObject(value.successCriteria) || invalidCriteria)) {
    throw new ApiError('ASSIGNMENT_INVALID');
  }
  if (partial && body.successCriteria !== undefined && (!assertJsonObject(value.successCriteria) || invalidCriteria)) {
    throw new ApiError('ASSIGNMENT_INVALID');
  }
  if (value.status && !ASSIGNMENT_STATUSES.has(value.status)) throw new ApiError('ASSIGNMENT_INVALID');
  return value;
}

async function createAssignment(request, env) {
  const admin = await requireAdmin(request, env);
  const input = assignmentInput(await readJson(request, 50_000));
  const target = await env.DB.prepare("SELECT 1 FROM users WHERE id = ? AND role = 'STUDENT'").bind(input.userId).first();
  if (!target) throw new ApiError('NOT_FOUND', 404);
  const id = randomId();
  await env.DB.prepare(`
    INSERT INTO assignments (id, user_id, created_by, kind, target_type, target_id, title_nl, title_darija,
      instructions_nl, instructions_darija, success_criteria_json, starts_at, due_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, input.userId, admin.id, input.kind, input.targetType, input.targetId, input.titleNl, input.titleDarija,
    input.instructionsNl || null, input.instructionsDarija || null, JSON.stringify(input.successCriteria), input.startsAt, input.dueAt).run();
  const row = await env.DB.prepare('SELECT * FROM assignments WHERE id = ?').bind(id).first();
  await audit(env, admin.id, 'ASSIGNMENT_CREATED', 'ASSIGNMENT', id, { userId: input.userId, kind: input.kind });
  return ok({ assignment: assignmentDto(row) }, { status: 201 });
}

async function updateAssignment(request, env, assignmentId) {
  const admin = await requireAdmin(request, env);
  const body = await readJson(request, 50_000);
  const existing = await env.DB.prepare('SELECT * FROM assignments WHERE id = ?').bind(assignmentId).first();
  if (!existing) throw new ApiError('NOT_FOUND', 404);
  const input = assignmentInput(body, true);
  const titleNl = body.title || body.titleNl !== undefined ? input.titleNl : existing.title_nl;
  const titleDarija = body.title || body.titleDarija !== undefined ? input.titleDarija : existing.title_darija;
  if (!titleNl || !titleDarija) throw new ApiError('ASSIGNMENT_INVALID');
  const status = input.status || existing.status;
  await env.DB.prepare(`
    UPDATE assignments SET title_nl = ?, title_darija = ?, instructions_nl = ?, instructions_darija = ?,
      starts_at = ?, due_at = ?, status = ?, completed_at = CASE WHEN ? = 'COMPLETED' THEN COALESCE(completed_at, CURRENT_TIMESTAMP) ELSE completed_at END,
      updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(
    titleNl, titleDarija,
    body.instructions || body.instructionsNl !== undefined ? input.instructionsNl : existing.instructions_nl,
    body.instructions || body.instructionsDarija !== undefined ? input.instructionsDarija : existing.instructions_darija,
    body.startsAt !== undefined ? input.startsAt : existing.starts_at,
    body.dueAt !== undefined ? input.dueAt : existing.due_at,
    status, status, assignmentId,
  ).run();
  const updated = await env.DB.prepare('SELECT * FROM assignments WHERE id = ?').bind(assignmentId).first();
  await audit(env, admin.id, 'ASSIGNMENT_UPDATED', 'ASSIGNMENT', assignmentId, { status });
  return ok({ assignment: assignmentDto(updated) });
}

async function completeAssignment(request, env, assignmentId) {
  const user = await requireUser(request, env);
  const existing = await env.DB.prepare('SELECT * FROM assignments WHERE id = ? AND user_id = ?')
    .bind(assignmentId, user.id).first();
  if (!existing) throw new ApiError('NOT_FOUND', 404);
  if (existing.status !== 'OPEN') throw new ApiError('ASSIGNMENT_INVALID', 409);
  if (existing.kind === 'REQUIRED') {
    const criteria = safeParse(existing.success_criteria_json, {});
    const minimum = Number(criteria.minimumPercent);
    const scoredCriterion = Number.isFinite(minimum);
    const latest = await env.DB.prepare(`
      SELECT result, score, max_score FROM learning_attempts
      WHERE user_id = ? AND lesson_id = ?
        ${scoredCriterion ? 'AND max_score > 0' : ''}
      ORDER BY created_at DESC LIMIT 1
    `).bind(user.id, existing.target_id).first();
    const scoredPass = latest && Number.isFinite(minimum) && Number(latest.max_score) > 0
      && (Number(latest.score) / Number(latest.max_score)) * 100 >= minimum;
    const resultPass = latest && ['COMPLETED', 'CORRECT', 'GOOD'].includes(latest.result) && !Number.isFinite(minimum);
    if (!scoredPass && !resultPass) throw new ApiError('ASSIGNMENT_CRITERIA_NOT_MET', 409);
  }
  await env.DB.prepare("UPDATE assignments SET status = 'COMPLETED', completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(assignmentId).run();
  await audit(env, user.id, 'ASSIGNMENT_COMPLETED', 'ASSIGNMENT', assignmentId);
  const updated = await env.DB.prepare('SELECT * FROM assignments WHERE id = ?').bind(assignmentId).first();
  return ok({ assignment: assignmentDto(updated) });
}

async function listAudit(request, env) {
  await requireAdmin(request, env);
  const result = await env.DB.prepare(`
    SELECT id, actor_user_id, action, target_type, target_id, metadata_json, created_at
    FROM audit_log ORDER BY created_at DESC LIMIT 250
  `).all();
  return ok({ entries: result.results.map((row) => ({
    id: row.id, actorUserId: row.actor_user_id, action: row.action, targetType: row.target_type,
    targetId: row.target_id, metadata: safeParse(row.metadata_json, {}), createdAt: row.created_at,
  })) });
}

async function route(request, env, ctx) {
  verifyOrigin(request, env);
  const { pathname } = new URL(request.url);
  if (request.method === 'GET' && pathname === '/api/health') return ok({ service: 'nederlands-leren-gent-api' });
  if (request.method === 'POST' && pathname === '/api/auth/register') return register(request, env, ctx);
  if (request.method === 'POST' && pathname === '/api/auth/login') return login(request, env);
  if (request.method === 'POST' && pathname === '/api/auth/logout') return logout(request, env);
  if (request.method === 'GET' && ['/api/auth/session', '/api/auth/me'].includes(pathname)) return sessionInfo(request, env);
  if (request.method === 'POST' && pathname === '/api/auth/change-password') return changePassword(request, env);
  if (request.method === 'POST' && pathname === '/api/auth/reset-password') return redeemReset(request, env);
  if (request.method === 'POST' && pathname === '/api/admin/bootstrap') return bootstrapAdmin(request, env);
  if (request.method === 'POST' && pathname === '/api/admin/recover') return recoverAdmin(request, env);
  if (request.method === 'GET' && pathname === '/api/admin/users') return listUsers(request, env);
  if (request.method === 'GET' && pathname === '/api/admin/audit') return listAudit(request, env);
  if (request.method === 'GET' && pathname === '/api/progress') return getProgress(request, env);
  if (request.method === 'PUT' && pathname === '/api/progress') return putProgress(request, env);
  if (request.method === 'POST' && pathname === '/api/activity/heartbeat') return heartbeat(request, env);
  if (request.method === 'POST' && pathname === '/api/attempts') return createAttempt(request, env);
  if (request.method === 'POST' && pathname === '/api/speaking-reviews') return createSpeakingReview(request, env);
  if (request.method === 'POST' && pathname === '/api/coach/explain') return coachExplain(request, env);
  if (request.method === 'POST' && pathname === '/api/coach/feedback') return coachFeedback(request, env);
  if (request.method === 'POST' && pathname === '/api/speech/transcribe') return transcribeSpeech(request, env);
  if (request.method === 'GET' && pathname === '/api/assignments') return listAssignments(request, env);
  if (request.method === 'GET' && pathname === '/api/admin/assignments') return listAssignments(request, env, true);
  if (request.method === 'GET' && pathname === '/api/admin/speaking-reviews') return listSpeakingReviews(request, env);
  if (request.method === 'GET' && pathname === '/api/admin/coach-feedback') return listCoachFeedback(request, env);
  if (request.method === 'GET' && pathname === '/api/admin/reference-audio') return listReferenceAudioPrompts(request, env);
  if (request.method === 'POST' && pathname === '/api/admin/reference-audio') return uploadReferenceAudio(request, env);
  if (request.method === 'POST' && pathname === '/api/admin/assignments') return createAssignment(request, env);

  let match = pathname.match(/^\/api\/admin\/users\/([^/]+)\/(approve|reject|suspend|block|activate|unblock)$/);
  if (request.method === 'POST' && match) return updateUserStatus(request, env, decodeURIComponent(match[1]), match[2]);
  match = pathname.match(/^\/api\/admin\/users\/([^/]+)\/password-reset$/);
  if (request.method === 'POST' && match) return createResetCode(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/users\/([^/]+)\/activity$/);
  if (request.method === 'GET' && match) return adminUserActivity(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/assignments\/([^/]+)$/);
  if (request.method === 'PATCH' && match) return updateAssignment(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/speaking-reviews\/([^/]+)\/audio$/);
  if (request.method === 'GET' && match) return speakingReviewAudio(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/speaking-reviews\/([^/]+)$/);
  if (request.method === 'PATCH' && match) return decideSpeakingReview(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/coach-feedback\/([^/]+)$/);
  if (request.method === 'PATCH' && match) return resolveCoachFeedback(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/admin\/reference-audio\/([^/]+)$/);
  if (request.method === 'DELETE' && match) return deleteReferenceAudio(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/reference-audio\/([^/]+)$/);
  if (request.method === 'GET' && match) return referenceAudioFile(request, env, decodeURIComponent(match[1]));
  match = pathname.match(/^\/api\/assignments\/([^/]+)\/complete$/);
  if (request.method === 'POST' && match) return completeAssignment(request, env, decodeURIComponent(match[1]));
  throw new ApiError('NOT_FOUND', 404);
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (!pathname.startsWith('/api/')) {
      return withAssetSecurity(await env.ASSETS.fetch(request));
    }
    if (request.method === 'OPTIONS') {
      const response = new Response(null, {
        status: 204,
        headers: {
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'access-control-allow-headers': 'content-type, x-bootstrap-secret',
          'access-control-max-age': '86400',
        },
      });
      return withCors(response, request, env);
    }
    try {
      return withCors(await route(request, env, ctx), request, env);
    } catch (error) {
      return withCors(failure(error), request, env);
    }
  },
  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(Promise.all([cleanupExpiredSpeakingReviews(env), cleanupAiCoach(env)]));
  },
};

export { assignmentInput, audioContainerMatches, d1BlobToBytes, detectAudioContainer, publicUser, safeParse };
