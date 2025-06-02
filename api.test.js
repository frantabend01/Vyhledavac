const { fetchUnitTestResults } = require('./api.cjs');



global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      items: [
        { title: 'Youtube', link: 'http://youtube.com/' },
        { title: 'StackOverflow', link: 'http://stackoverflow.com/' }
      ]
    })
  })
);


test('fetchResults vrátí výsledky', async () => {
  const results = await fetchUnitTestResults('test query', 'testApiKey', 'testCx');
  expect(results).toEqual([
    { title: 'Youtube', link: 'http://youtube.com/' },
    { title: 'StackOverflow', link: 'http://stackoverflow.com/' }
  ]);
});
