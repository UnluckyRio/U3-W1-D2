import React, { Component } from "react"; // Importo React e Component
import Card from "react-bootstrap/Card"; // Importo Card da react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Importo lo stile di Bootstrap

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
    const cardStyle = this.state.selected ? { border: "3px solid yellow" } : {};

    return (
      <Card
        style={{ width: "14rem", ...cardStyle, cursor: "pointer" }}
        className="mb-3"
        onClick={this.handleSelect}
      >
        {/* Mostro la copertina del libro */}
        <Card.Img variant="top" src={book.img} alt={book.title} />
        <Card.Body>
          {/* Mostro il titolo del libro */}
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook; // Esporto il componente
