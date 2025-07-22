import React from "react"; // Importa React
import { Alert } from "react-bootstrap"; // Importa Alert di react-bootstrap

// Componente di benvenuto con alert e sottotitolo
const Welcome = () => (
  <Alert variant="info" className="mt-4 text-center">
    {" "}
    {/* Alert informativo */}
    <h2>Benvenuto su EpiBooks!</h2> {/* Titolo di benvenuto */}
    <p>Il tuo negozio online di libri preferito</p> {/* Sottotitolo */}
  </Alert>
);

export default Welcome; // Esporta il componente
