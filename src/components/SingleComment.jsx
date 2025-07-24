import React from "react";

// Componente che mostra un singolo commento
const SingleComment = ({ comment }) => {
  return (
    <div className="single-comment">
      {/* Mostro il testo del commento */}
      <p>{comment.comment}</p>
      {/* Mostro il voto del commento */}
      <span>Voto: {comment.rate}</span>
    </div>
  );
};

export default SingleComment;
