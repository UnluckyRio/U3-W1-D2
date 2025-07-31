# Test Suite per EpiBooks

Questa cartella contiene i test per l'applicazione EpiBooks. I test sono stati implementati utilizzando Vitest e React Testing Library.

## Struttura dei Test

I test sono organizzati per componente:

- `Welcome.test.jsx`: Test per il componente di benvenuto
- `SingleBook.test.jsx`: Test per il componente che mostra un singolo libro
- `BookList.test.jsx`: Test per il componente che mostra la lista dei libri

## Comandi per i Test

Per eseguire i test, puoi utilizzare i seguenti comandi:

- `npm test`: Esegue i test in modalità watch (interattiva)
- `npm test -- --run`: Esegue i test una sola volta
- `npm run coverage`: Esegue i test e genera un report di copertura

## Configurazione

La configurazione dei test si trova nei seguenti file:

- `vitest.config.js`: Configurazione di Vitest
- `tests/setup.js`: Setup per i test (configurazione di jsdom, matchers, ecc.)

## Dipendenze

I test utilizzano le seguenti librerie:

- Vitest: Framework di test
- React Testing Library: Libreria per testare componenti React
- jest-dom: Estensioni per i matcher di jest
- jest-axe: Libreria per testare l'accessibilità