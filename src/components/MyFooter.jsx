import React from "react"; // Importa React

// Componente per il footer della pagina
const MyFooter = () => (
  <footer className="custom-footer">
    {" "}
    {/* Footer con stile personalizzato */}
    {/* Testo del footer */}
    <div>Epibooks © {new Date().getFullYear()} - Tutti i diritti riservati</div>
  </footer>
);

export default MyFooter; // Esporta il componente
