import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppNumber,
  validateBookingInput,
  createBookingRecord,
  buildWhatsAppUrl,
  PLANS,
  MODALITIES,
} from './bookingLogic';

test('formatWhatsAppNumber formats 11-digit Brazilian mobile numbers accurately', () => {
  assert.equal(formatWhatsAppNumber('11987654321'), '(11) 98765-4321');
  assert.equal(formatWhatsAppNumber('(11) 98765-4321'), '(11) 98765-4321');
  assert.equal(formatWhatsAppNumber(''), '');
});

test('validateBookingInput rejects empty or invalid required fields', () => {
  const invalidResult = validateBookingInput({
    studentName: 'A',
    whatsapp: '12345',
    planId: 'premium',
    modalityId: 'boxe-tradicional',
    preferredDay: '',
    preferredTime: '',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.studentName);
  assert.ok(invalidResult.errors.whatsapp);
  assert.ok(invalidResult.errors.preferredDay);
  assert.ok(invalidResult.errors.preferredTime);
});

test('validateBookingInput accepts complete valid booking data', () => {
  const validResult = validateBookingInput({
    studentName: 'Carlos Eduardo',
    whatsapp: '(11) 99876-5432',
    planId: 'premium',
    modalityId: 'boxe-tradicional',
    preferredDay: 'Segunda-feira',
    preferredTime: '19:30',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('createBookingRecord resolves plan price and modality title', () => {
  const record = createBookingRecord(
    {
      studentName: '  Marina Silva ',
      whatsapp: '21988887777',
      planId: 'elite',
      modalityId: 'preparacao-competicao',
      preferredDay: 'Quartas e Sextas',
      preferredTime: '18:00',
    },
    'test-101'
  );

  assert.equal(record.id, 'booking-test-101');
  assert.equal(record.studentName, 'Marina Silva');
  assert.equal(record.whatsapp, '(21) 98888-7777');
  assert.equal(record.planName, 'ELITE');
  assert.equal(record.monthlyPrice, 399);
  assert.equal(record.modalityTitle, 'PREPARAÇÃO PARA COMPETIÇÃO');
  assert.equal(PLANS.length, 3);
  assert.equal(MODALITIES.length, 4);
});

test('buildWhatsAppUrl encodes selected topic and optional custom note', () => {
  const url = buildWhatsAppUrl('experimental', 'Horário noturno.');
  assert.ok(url.startsWith('https://wa.me/5511999999999?text='));
  assert.ok(url.includes(encodeURIComponent('aula experimental')));
  assert.ok(url.includes(encodeURIComponent('Horário noturno.')));
});
