import "./App.css"; // Importa lo stile personalizzato
import "bootstrap/dist/css/bootstrap.min.css"; // Importa lo stile di Bootstrap
import MyNav from "./components/MyNav"; // Importa la navbar personalizzata
import MyFooter from "./components/MyFooter"; // Importa il footer personalizzato
import Welcome from "./components/Welcome"; // Importa il componente di benvenuto
import AllTheBooks from "./components/AllTheBooks"; // Importa il componente che mostra i libri
import BookList from "./components/BookList"; // Importo il nuovo componente BookList
import fantasyBooks from "./assets/fantasy.json"; // Importo la lista di libri fantasy

function App() {
  return (
    <>
      <MyNav /> {/* Barra di navigazione */}
      <Welcome /> {/* Messaggio di benvenuto */}
      {/* <AllTheBooks />  Visualizzazione delle copertine dei libri (commentato per usare BookList) */}
      <BookList books={fantasyBooks} />{" "}
      {/* Passo la lista di libri a BookList */}
      <MyFooter /> {/* Footer della pagina */}
    </>
  );
}

export default App; // Esporta il componente principale
