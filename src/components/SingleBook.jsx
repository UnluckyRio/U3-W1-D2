import React, { Component } from "react"; // Importo React e Component
import Card from "react-bootstrap/Card"; // Importo Card da react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Importo lo stile di Bootstrap
import CommentArea from "./CommentArea"; // Importo il componente CommentArea

// Componente che mostra un singolo libro e gestisce la selezione
class SingleBook extends Component {
  constructor(props) {
    super(props);
    // Stato con proprietà selected per gestire la selezione
    this.state = {
      selected: false,
    };
  }

  // Funzione per fare il toggle della selezione
  handleSelect = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }));
  };

  render() {
    // Estraggo i dati del libro dalle props
    const { book } = this.props;
    // Applico uno stile condizionale se il libro è selezionato
    const cardStyle = {
      width: "14rem", // Larghezza fissa
      height: "26rem", // Altezza fissa
      display: "flex", // Per allineare il contenuto
      flexDirection: "column", // Disposizione verticale
      justifyContent: "space-between", // Spazio tra immagine e titolo
      cursor: "pointer",
      ...(this.state.selected ? { border: "3px solid yellow" } : {}),
    };

    // Stile per l'immagine per adattarla alla card
    const imgStyle = {
      height: "320px", // Altezza fissa per l'immagine
      objectFit: "cover", // L'immagine si adatta senza deformarsi
    };

    // Stile per il titolo per troncare il testo lungo
    const titleStyle = {
      overflow: "hidden", // Nasconde il testo che esce
      textOverflow: "ellipsis", // Mostra i puntini di sospensione
      whiteSpace: "nowrap", // Impedisce l'andata a capo
      width: "100%", // Occupa tutta la larghezza disponibile
    };

    return (
      <>
        <Card style={cardStyle} className="mb-3" onClick={this.handleSelect}>
          {/* Mostro la copertina del libro */}
          <Card.Img
            variant="top"
            src={book.img}
            alt={book.title}
            style={imgStyle}
          />
          <Card.Body
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Mostro il titolo del libro */}
            <Card.Title className="text-center" style={titleStyle}>
              {book.title}
            </Card.Title>
          </Card.Body>
        </Card>
        {/* Mostro CommentArea solo se il libro è selezionato */}
        {this.state.selected && <CommentArea asin={book.asin} />}
      </>
    );
  }
}

export default SingleBook; // Esporto il componente
