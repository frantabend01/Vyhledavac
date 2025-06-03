import { fetchResults } from './api.js';

class App{
    constructor() {
        // this.apiKey = null; // Nulové hodnoty, public repo, v provozu se dosadí z node.env nebo přímo string
        // this.cx = null;  // Nulové hodnoty, public repo, v provozu se dosadí z node.env nebo přímo string
    }

    /**
     * Vytvoření UI
     * - container
     * - input group
     * - input 
     * - tlačítko pro vyhledávání 
     */
    start(){
        // console.warn("připojeno");
        const $container = $('<div class="container mt-5 d-flex justify-content-center"></div>');
        const $inputGroup = $('<div class="input-group"></div>');
        const $input = $('<input type="text" class="form-control" placeholder="Zadejte text" name="query">');
        const $button = $('<button class="btn btn-primary">Klikni mě</button>');
        $input.appendTo($inputGroup);
        $button.appendTo($inputGroup);
        $inputGroup.appendTo($container);
        $container.appendTo('#main');
        this.$result = $('<div class="result mt-3 text-center"></div>');
        this.$result.appendTo('#main');
        $button.on('click', () => {
            const text = $input.val();
            if (text) {
                this.search(text);
            } else {
                alert('Prosím zadejte nějaký text.');
            }
        });
        //Odesílání enterem
        $input.on('keypress', (event) => {
            if (event.key === 'Enter') {
                $button.click();
            }
        });
    }


    /**
     * 
     * @param {string} query vyhledávaný text
     * Spustí vyhledávání a zpracuje výsledky
     * Pokud přijdou výsledky, zobrazí zprávu v UI a tlačítko pro stažení JSON souboru
     * Pokud dojde k chybě, zobrazí chybovou zprávu v UI
     */
    async search(query) {
        this.$result.empty();
        try{
            // const data = await fetchResults(query, this.apiKey, this.cx); //voláme importovaný modul fetch
            const data = await fetchResults(query);
            console.warn("Data:", data);
                if(data.length > 0){
                this.$downloadBtn = $('<button class="btn btn-success mt-3">Stáhnout JSON</button>');
                this.$result.append('<h5>Máme výsledky! V consoli nebo ke stažení</h5>');
                this.$result.append(this.$downloadBtn);

                    this.$downloadBtn.on('click', () => {
                        const jsonString = JSON.stringify(data, null, 2); // pretty print
                        const blob = new Blob([jsonString], { type: "application/json" });
                        const url = URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `vysledky.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    });
                }
        }catch (error) {
            console.error("Chyba při vyhledávání:", error);
            this.$result.text("Došlo k chybě při vyhledávání", error);
        }
}
}

// Inicializace aplikace
$(document).ready(() => {
    const app = new App();
    app.start();

});

