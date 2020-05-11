test('testing there is no multiple active rentals for one unicorn', () => {
  require('../service/MiscService').mainTest().then((res) => {
    expect(res).toBeLessThanOrEqual(1);
  });
});