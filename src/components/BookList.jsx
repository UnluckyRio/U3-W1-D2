import React, { useState } from "react"; // Importo React e useState
import SingleBook from "./SingleBook"; // Importo il componente SingleBook
import CommentArea from "./CommentArea"; // Importo il componente CommentArea
import { Container, Row, Col, Form, Alert } from "react-bootstrap"; // Importo componenti di layout da react-bootstrap

// Componente che mostra una lista di libri e un campo di ricerca
const BookList = ({ books }) => {
  // Stato per la stringa di ricerca
  const [search, setSearch] = useState("");
  // Stato per l'asin del libro selezionato
  const [selectedAsin, setSelectedAsin] = useState(null);

  // Funzione per filtrare i libri in base al titolo
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid>
      {/* Campo di ricerca per filtrare i libri */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      {/* Layout a due colonne */}
      <Row>
        {/* Colonna sinistra con la griglia dei libri */}
        <Col md={8}>
          <Row>
            {filteredBooks.map((book) => (
              <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <SingleBook 
                  book={book} 
                  selected={selectedAsin === book.asin}
                  onClick={() => setSelectedAsin(book.asin)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {/* Colonna destra con l'area commenti */}
        <Col md={4}>
          <div className="comment-area-container sticky-top" style={{ top: "20px" }}>
            <h4 className="mb-3">Area Commenti</h4>
            {selectedAsin ? (
              <CommentArea asin={selectedAsin} />
            ) : (
              <Alert variant="info">
                Seleziona un libro per visualizzare i commenti
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookList; // Esporto il componente
