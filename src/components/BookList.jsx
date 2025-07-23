import React, { useState } from "react"; // Importo React e useState
import SingleBook from "./SingleBook"; // Importo il componente SingleBook
import { Container, Row, Col, Form } from "react-bootstrap"; // Importo componenti di layout da react-bootstrap

// Componente che mostra una lista di libri e un campo di ricerca
const BookList = ({ books }) => {
  // Stato per la stringa di ricerca
  const [search, setSearch] = useState("");

  // Funzione per filtrare i libri in base al titolo
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      {/* Campo di ricerca per filtrare i libri */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      {/* Griglia di libri filtrati */}
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3}>
            <SingleBook book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList; // Esporto il componente
