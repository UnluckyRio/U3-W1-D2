import React, { useEffect, useState } from "react";
import CommentsList from "./CommentsList"; // Componente per la lista dei commenti
import AddComment from "./AddComment"; // Componente per aggiungere un commento
import Loading from "./Loading"; // Componente per lo stato di caricamento
import Error from "./Error"; // Componente per lo stato di errore

// Componente che gestisce i commenti di un libro selezionato
const CommentArea = ({ asin }) => {
  // Stato per i commenti
  const [comments, setComments] = useState([]);
  // Stato per il caricamento
  const [isLoading, setIsLoading] = useState(false);
  // Stato per l'errore
  const [isError, setIsError] = useState(false);

  // Funzione per recuperare i commenti dal server
  const fetchComments = async () => {
    setIsLoading(true); // Imposto lo stato di caricamento
    setIsError(false); // Resetto lo stato di errore
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTM3MDc5NTIsImV4cCI6MTc1NDkxNzU1Mn0.lFP_C7O8r2Qqe8R--KEpqQCfhVwpoCca48YoOW2_Tdg",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel recupero dei commenti");
      }
      const data = await response.json();
      setComments(data); // Salvo i commenti nello stato
    } catch {
      setIsError(true); // Imposto lo stato di errore
    } finally {
      setIsLoading(false); // Fine caricamento
    }
  };

  // Effetto per recuperare i commenti quando cambia l'asin
  useEffect(() => {
    if (asin) {
      fetchComments();
    }
  }, [asin]);

  // Funzione per aggiungere un nuovo commento
  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  // Funzione per eliminare un commento
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTM3MDc5NTIsImV4cCI6MTc1NDkxNzU1Mn0.lFP_C7O8r2Qqe8R--KEpqQCfhVwpoCca48YoOW2_Tdg",
          },
        }
      );
      if (response.ok) {
        // Aggiorno lo stato solo se la richiesta è andata a buon fine
        setComments(comments.filter((c) => c._id !== commentId));
      } else {
        console.error("Errore nell'eliminazione del commento");
      }
    } catch (error) {
      console.error("Errore nella richiesta di eliminazione:", error);
    }
  };

  return (
    <div className="comment-area">
      {/* Mostro un messaggio se nessun libro è selezionato */}
      {!asin && (
        <div className="alert alert-info">
          Seleziona un libro per visualizzare i commenti
        </div>
      )}
      {/* Se un libro è selezionato, mostro i commenti */}
      {asin && (
        <>
          {/* Mostro il loader se in caricamento */}
          {isLoading && <Loading />}
          {/* Mostro l'errore se presente */}
          {isError && <Error message="Errore nel caricamento dei commenti" />}
          {/* Mostro la lista dei commenti solo se non sto caricando e non c'è errore */}
          {!isLoading && !isError && (
            <>
              <h4>Commenti</h4>
              {comments.length === 0 ? (
                <p>Nessun commento disponibile</p>
              ) : (
                <CommentsList comments={comments} onDelete={handleDeleteComment} />
              )}
              <AddComment asin={asin} onAdd={handleAddComment} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CommentArea;
