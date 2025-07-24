import React from "react";
import SingleComment from "./SingleComment"; // Componente per il singolo commento

// Componente che mostra la lista dei commenti
const CommentsList = ({ comments, onDelete }) => {
  return (
    <ul className="comments-list">
      {/* Ciclo su tutti i commenti e li mostro */}
      {comments.map((comment) => (
        <li key={comment._id}>
          <div style={{ flex: 1 }}>
            <SingleComment comment={comment} />
          </div>
          {/* Bottone per cancellare il commento con icona */}
          <button
            onClick={() => onDelete(comment._id)}
            aria-label="Elimina commento"
            title="Elimina commento"
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
