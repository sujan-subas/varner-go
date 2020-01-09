import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getFormattedDeadLine } from './utils/time';

test('returns hours and minutes left to deadline', () => {
  let timestamp = new Date('2020-01-09T15:44:41');
  let now = new Date('2020-01-09T17:44:41');
  expect(getFormattedDeadLine(timestamp, now)).toBe('0');
});
