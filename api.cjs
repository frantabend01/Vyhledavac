/**
 * Přímo pro unit test
 * @param {string} query vyhledávaný text
 * @param {string} apiKey API klíč pro Google Custom Search
 * @param {string} cx ID vyhledávacího enginu (Custom Search Engine ID) 
 * @returns {Promise<Array>} Vrací pole výsledků vyhledávání
 * @throws {Error} Pokud dojde k chybě při načítání dat
 */
async function fetchUnitTestResults(query, apiKey, cx){
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
    const resp = await fetch(url);
    if(!resp.ok) throw new Error(`Chyba při načítání dat: ${resp.statusText}`);
    const data = await resp.json();
    return data.items || [];

}

module.exports = { fetchUnitTestResults };
