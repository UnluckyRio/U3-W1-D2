import React, { useEffect, useState } from "react"; // Importa React e gli hook
import { Card, Row, Col, Container, Modal } from "react-bootstrap"; // Importa i componenti di react-bootstrap
import fantasyBooks from "../assets/fantasy.json"; // Importa i dati dei libri fantasy

// Funzione per estrarre il colore dominante da un'immagine
function getDominantColor(imgUrl, callback) {
  const img = new window.Image();
  img.crossOrigin = "Anonymous";
  img.src = imgUrl;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0,
      g = 0,
      b = 0,
      count = 0;
    for (let i = 0; i < data.length; i += 4 * 50) {
      // Salta pixel per performance
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    callback(`rgba(${r},${g},${b},0.85)`); // Colore dominante semitrasparente
  };
}

// Componente che mostra tutte le copertine dei libri
const AllTheBooks = () => {
  const [books, setBooks] = useState([]); // Stato per i libri
  const [showModal, setShowModal] = useState(false); // Stato per la modale
  const [selectedBook, setSelectedBook] = useState(null); // Libro selezionato
  const [modalBg, setModalBg] = useState("rgba(0,0,0,0.7)"); // Colore di sfondo modale

  useEffect(() => {
    setBooks(fantasyBooks); // Imposta i libri dal file json
  }, []); // Effettua l'operazione solo al montaggio

  // Definisco uno stile per rendere tutte le immagini della stessa altezza
  const imgStyle = {
    height: "250px", // Altezza fissa per l'immagine
    objectFit: "cover", // Ritaglia l'immagine per riempire lo spazio
  };

  // Gestore click sulla card
  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    // Calcola il colore dominante della copertina
    getDominantColor(book.img, (color) => setModalBg(color));
  };

  // Gestore chiusura modale
  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <Container className="mt-4">
      {/* Contenitore principale */}
      <Row>
        {books.map((book) => (
          <Col key={book.asin} xs={6} md={4} lg={3} className="mb-4">
            {/* Colonna per ogni libro */}
            <Card
              className="custom-book-card"
              onClick={() => handleCardClick(book)}
              style={{ cursor: "pointer" }}
            >
              {/* Card per il libro, tutte della stessa dimensione e con ombreggiatura */}
              <Card.Img
                variant="top"
                src={book.img}
                alt={book.title}
                style={imgStyle}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title> {/* Titolo del libro */}
                <Card.Text>Categoria: {book.category}</Card.Text>{" "}
                {/* Categoria */}
                <Card.Text>Prezzo: {book.price}€</Card.Text> {/* Prezzo */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Modale per la copertina */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="lg"
        contentClassName="custom-modal-content"
        backdropClassName="custom-modal-backdrop"
        style={{ background: "transparent" }}
      >
        <div
          style={{
            background: modalBg,
            borderRadius: "18px",
            padding: "32px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          {selectedBook && (
            <>
              <img
                src={selectedBook.img}
                alt={selectedBook.title}
                style={{
                  maxWidth: "320px",
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
                  marginBottom: "18px",
                }}
              />
              <h4 style={{ color: "#fff", textShadow: "0 2px 8px #000" }}>
                {selectedBook.title}
              </h4>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #000" }}>
                Categoria: {selectedBook.category}
              </p>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #000" }}>
                Prezzo: {selectedBook.price}€
              </p>
            </>
          )}
        </div>
      </Modal>
    </Container>
  );
};

export default AllTheBooks; // Esporta il componente
