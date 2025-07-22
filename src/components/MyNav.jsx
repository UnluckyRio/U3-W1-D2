import React from "react"; // Importa React
import { Navbar, Nav, Container } from "react-bootstrap"; // Importa i componenti di react-bootstrap

// Componente per la barra di navigazione
const MyNav = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
    {" "}
    {/* Navbar scura e personalizzata */}
    <Container>
      <Navbar.Brand href="#" className="custom-navbar-brand">
        {" "}
        {/* Nome del sito con stile personalizzato */}
        <span role="img" aria-label="book">
          📚
        </span>{" "}
        EpiBooks
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Browse</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MyNav; // Esporta il componente
