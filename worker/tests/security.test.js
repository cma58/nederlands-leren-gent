import test from 'node:test';
import assert from 'node:assert/strict';

import { assignmentInput, safeParse } from '../src/index.js';
import { MESSAGES } from '../src/messages.js';
import {
  constantTimeEqual,
  hashPassword,
  normalizeUsername,
  validPassword,
  validUsername,
  verifyPassword,
} from '../src/security.js';

test('username wordt NFKC genormaliseerd en hoofdletterongevoelig', () => {
  assert.equal(normalizeUsername('  AMINE_01  '), 'amine_01');
  assert.equal(normalizeUsername('ＡＭＩＮＥ'), 'amine');
  assert.equal(validUsername('ab'), false);
  assert.equal(validUsername('amine 01'), false);
  assert.equal(validUsername('Amine-01'), true);
});

test('wachtwoordgrenzen en PBKDF2-verificatie', async () => {
  assert.equal(validPassword('kort'), false);
  assert.equal(validPassword('lang-genoeg'), true);
  const stored = await hashPassword('veilig-wachtwoord', 1000);
  assert.equal(await verifyPassword('veilig-wachtwoord', stored.hash, stored.salt, stored.iterations), true);
  assert.equal(await verifyPassword('ander-wachtwoord', stored.hash, stored.salt, stored.iterations), false);
  const productionDefault = await hashPassword('veilig-wachtwoord');
  assert.equal(productionDefault.iterations, 100000);
});

test('constante vergelijking verwerkt gelijke en ongelijke lengtes', () => {
  assert.equal(constantTimeEqual('abc', 'abc'), true);
  assert.equal(constantTimeEqual('abc', 'abd'), false);
  assert.equal(constantTimeEqual('abc', 'abcd'), false);
});

test('opdracht vereist Nederlandse en Darija-Latijnse tekst', () => {
  const parsed = assignmentInput({
    userId: 'user-1', kind: 'required', targetType: 'lesson', targetId: 'lesson-1',
    title: { nl: 'Herhalen', darija: '3awed' }, successCriteria: {},
  });
  assert.equal(parsed.kind, 'REQUIRED');
  assert.equal(parsed.titleDarija, '3awed');
  assert.throws(() => assignmentInput({
    userId: 'user-1', kind: 'EXTRA', targetType: 'LESSON', targetId: 'lesson-1',
    title: { nl: 'Herhalen' }, successCriteria: {},
  }));
  assert.equal(assignmentInput({
    userId: 'user-1', kind: 'REQUIRED', targetType: 'LESSON', targetId: 'lesson-1',
    title: { nl: 'Herhalen', darija: '3awed' }, successCriteria: { minimumPercent: 80 },
  }).successCriteria.minimumPercent, 80);
  assert.throws(() => assignmentInput({
    userId: 'user-1', kind: 'REQUIRED', targetType: 'LESSON', targetId: 'lesson-1',
    title: { nl: 'Herhalen', darija: '3awed' }, successCriteria: { minimumPercent: 101 },
  }));
});

test('veilige JSON fallback', () => {
  assert.deepEqual(safeParse('{"a":1}', {}), { a: 1 });
  assert.deepEqual(safeParse('{kapot', {}), {});
});

test('alle foutmeldingen zijn tweetalig en Darija gebruikt geen Arabisch schrift', () => {
  for (const message of Object.values(MESSAGES)) {
    assert.ok(message.nl);
    assert.ok(message.darija);
    assert.doesNotMatch(message.darija, /[\u0600-\u06ff]/u);
  }
});
