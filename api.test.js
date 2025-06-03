const { fetchUnitTestResults } = require('./api.cjs');

// Nastavíme mock pro fetch před každým testem
beforeEach(() => {
  global.fetch = jest.fn();
});

describe('fetchUnitTestResults', () => {
    test('calls Google API with correct parameters', async () => {
    // Nakonfigurujeme mock fetch s předdefinovanou odpovědí
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          items: [{ title: 'Test', link: 'http://test.com/' }]
        })
    });
  
    // Zavoláme funkci s parametry
    await fetchUnitTestResults('javascript tutorial', 'abc123', 'cx456');
    
    // Kontrola že fetch byl zavolán
    expect(fetch).toHaveBeenCalled();
    
    // Získáme argumenty volání fetch
    const [url, options] = fetch.mock.calls[0];
    
    // Kontrola parametrů
    expect(url).toContain('https://www.googleapis.com/customsearch/v1');
    expect(url).toContain('q=javascript%20tutorial');
    expect(url).toContain('key=abc123');
    expect(url).toContain('cx=cx456');
  });
  
    test('returns search results when API call succeeds', async () => {
      const mockResults = [
        { title: 'Youtube', link: 'http://youtube.com/' },
        { title: 'StackOverflow', link: 'http://stackoverflow.com/' }
      ];
      // Nakonfigurujeme mock fetch s úspěšnou odpovědí
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: mockResults })
      });
      // Očekáváme, že funkce vrátí výsledky které se rovnají mockResults
      const results = await fetchUnitTestResults('test', 'key', 'cx');
      expect(results).toEqual(mockResults);
    });
    // Test pro prázdné výsledky
    test('handles empty search results', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [] })
      });
      
      const results = await fetchUnitTestResults('test', 'key', 'cx');
      expect(results).toEqual([]);
    });
    // Test pro chybu API
    test('handles API error responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      });
      
      await expect(fetchUnitTestResults('test', 'key', 'cx'))
        .rejects.toThrow('Chyba při načítání dat: Forbidden');
    });
    // Test pro chyby sítě
    test('handles network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network failure'));
      
      await expect(fetchUnitTestResults('test', 'key', 'cx'))
        .rejects.toThrow('Network failure');
    });
});