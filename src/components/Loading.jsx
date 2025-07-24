import React from "react";

// Componente che mostra un messaggio di caricamento
const Loading = () => {
  return (
    <div className="loading">
      {/* Icona di caricamento e testo */}
      <span role="img" aria-label="loading" style={{ marginRight: 8 }}>
        ⏳
      </span>
      Caricamento in corso...
    </div>
  );
};

export default Loading;
