import React, { useState } from "react";

// Componente per aggiungere un nuovo commento
const AddComment = ({ asin, onAdd }) => {
  // Stato per il testo del commento
  const [comment, setComment] = useState("");
  // Stato per il voto
  const [rate, setRate] = useState("1");
  // Stato per il caricamento
  const [isLoading, setIsLoading] = useState(false);
  // Stato per l'errore
  const [isError, setIsError] = useState(false);

  // Funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevengo il comportamento di default
    setIsLoading(true); // Imposto lo stato di caricamento
    setIsError(false); // Resetto lo stato di errore
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTMzNTc1OTIsImV4cCI6MTc1NDU2NzE5Mn0.7XMTNRRJo0rrE5aYu-EeRqf0V8R5VFOiSMM_iY4sj_A",
          },
          body: JSON.stringify({
            comment,
            rate,
            elementId: asin,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Errore nell'aggiunta del commento");
      }
      const data = await response.json();
      onAdd(data); // Aggiungo il nuovo commento alla lista
      setComment(""); // Resetto il campo commento
      setRate("1"); // Resetto il campo voto
    } catch {
      setIsError(true); // Imposto lo stato di errore
    } finally {
      setIsLoading(false); // Fine caricamento
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      {/* Input per il testo del commento */}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Scrivi qui la tua recensione..."
        required
        aria-label="Testo del commento"
      />
      {/* Select per il voto */}
      <select
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        aria-label="Voto"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {/* Bottone per inviare il commento */}
      <button type="submit" disabled={isLoading} aria-label="Aggiungi commento">
        {isLoading ? (
          <>
            <span role="img" aria-label="loading" style={{ marginRight: 4 }}>
              ⏳
            </span>
            Invio...
          </>
        ) : (
          <>
            <span role="img" aria-label="aggiungi" style={{ marginRight: 4 }}>
              ➕
            </span>
            Aggiungi
          </>
        )}
      </button>
      {/* Mostro l'errore se presente */}
      {isError && (
        <div className="error">Errore nell'aggiunta del commento</div>
      )}
    </form>
  );
};

export default AddComment;
