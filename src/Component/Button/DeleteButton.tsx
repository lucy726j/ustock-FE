import React from "react";
import "./DeleteButtonStyle.css";

interface AnimatedButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<AnimatedButtonProps> = ({ onClick }) => {
  return (
    <button
      className="delete"
      onClick={onClick}
      style={{
        left: "410px",
        cursor: "pointer",
        top: "-2px",
      }}
    >
      <div className="top"></div>
      <div className="bottom"></div>
    </button>
  );
};

export default DeleteButton;
