import React from "react";

// Componente che mostra un messaggio di errore
const Error = ({ message }) => {
  return (
    <div className="error">
      {/* Icona di errore e testo */}
      <span role="img" aria-label="errore" style={{ marginRight: 8 }}>
        ❌
      </span>
      {message}
    </div>
  );
};

export default Error;
