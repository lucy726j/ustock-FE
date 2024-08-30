import React from "react";
import "./DeleteButtonStyle.css";

interface AnimatedButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<AnimatedButtonProps> = ({ onClick }) => {
  return (
    <div
      className="delete"
      onClick={onClick}
      style={{
        left: "410px",
        cursor: "pointer",
        top: "-2px",
        marginRight: "2rem",
      }}
    >
      <div className="top"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default DeleteButton;
