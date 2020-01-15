import { setExpireValue } from './setExpireValue';

test('order in store opening hours during weekday (mon-fri) should have expiry 2 hours after order time (1)', () => {
  let orderTime = "2020-01-15T011:00:37.961Z";
  let expireTime = setExpireValue(orderTime);
  expect(expireTime).toBe(
    "2020-01-15T13:14:37.961Z");
});

test('order in store opening hours should have expiry 2 hours after order time (1)', () => {
  let orderTime = "2020-01-15T11:14:37.961Z";
  let expireTime = setExpireValue(orderTime);
  expect(expireTime).toBe("2020-01-15T13:14:37.961Z");
});