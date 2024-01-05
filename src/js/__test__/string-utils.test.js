import { expect, test } from 'vitest';

import { isNotEmpty } from '@js/string-utils';

test(`isNotEmpty(...) return false for empty values; true otherwise`, async () => {
  expect(isNotEmpty()).toBeFalsy();
  expect(isNotEmpty(null)).toBeFalsy();
  expect(isNotEmpty(undefined)).toBeFalsy();
  expect(isNotEmpty(false)).toBeFalsy();
  expect(isNotEmpty(1)).toBeFalsy();
  expect(isNotEmpty('')).toBeFalsy();

  expect(isNotEmpty('abc')).toBeTruthy();
  expect(isNotEmpty('1')).toBeTruthy();
});
