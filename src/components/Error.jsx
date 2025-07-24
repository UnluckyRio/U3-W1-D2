import React from "react";

// Componente che mostra un messaggio di errore
const Error = ({ message }) => {
  return <div style={{ color: "red" }}>{message}</div>;
};

export default Error;
