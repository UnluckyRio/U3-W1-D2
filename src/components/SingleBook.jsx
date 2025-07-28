import React from "react"; // Importo React
import Card from "react-bootstrap/Card"; // Importo Card da react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Importo lo stile di Bootstrap

// Componente che mostra un singolo libro
const SingleBook = ({ book, selected, onClick }) => {
  // Applico uno stile condizionale se il libro è selezionato
  const cardStyle = {
    width: "14rem", // Larghezza fissa
    height: "26rem", // Altezza fissa
    display: "flex", // Per allineare il contenuto
    flexDirection: "column", // Disposizione verticale
    justifyContent: "space-between", // Spazio tra immagine e titolo
    cursor: "pointer",
    ...(selected ? { border: "3px solid red" } : {}),
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
    <Card style={cardStyle} className="mb-3" onClick={onClick}>
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
  );
};

export default SingleBook; // Esporto il componente
