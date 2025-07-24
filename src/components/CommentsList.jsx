import React from "react";
import SingleComment from "./SingleComment"; // Componente per il singolo commento

// Componente che mostra la lista dei commenti
const CommentsList = ({ comments, onDelete }) => {
  return (
    <ul className="comments-list">
      {/* Ciclo su tutti i commenti e li mostro */}
      {comments.map((comment) => (
        <li key={comment._id}>
          <SingleComment comment={comment} />
          {/* Bottone per cancellare il commento */}
          <button onClick={() => onDelete(comment._id)}>Elimina</button>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
