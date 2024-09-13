import React from "react";
import "./DeleteButtonStyle.css";

interface AnimatedButtonProps {
  onClick: () => void;
}

const DeleteButton2: React.FC<AnimatedButtonProps> = ({ onClick }) => {
  return (
    <div
      className="delete"
      onClick={onClick}
      style={{
        left: "410px",
        cursor: "pointer",
        top: "-2px",
        marginRight: "2.5rem",
      }}
    >
      <div className="top"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default DeleteButton2;
