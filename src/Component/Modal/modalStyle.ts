import styled from "styled-components";
import ReactModal from "react-modal";

export const ModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgb(255 255 255 / 60%)",
    width: "100%",
    height: "100%",
    zIndex: 10,
    top: "0",
    left: "0",
  },
  content: {
    width: "400px",
    height: "400px",
    zIndex: "11",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  },
};

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 15px;
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  font-family: "SCDream4";
  font-size: 14px;
`;

export const ButtonStyle = styled.button`
  border: none;
  background: none;
`;

export const Ul = styled.ul`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  list-style: none;
`;

export const Li = styled.li`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: 10px;
  font-family: "SCDream7";
`;

export const Description = styled.span`
  font-size: 8px;
  color: #6c757d;
`;

export const Price = styled.span`
  margin-right: 10px;
  font-family: "SCDream3";
`;

export const Growth = styled.span`
  color: #ff5759;
  font-size: 8px;
  margin-left: "10px";
`;

export const SearchImg = styled.img`
  position: absolute;
  width: 20px;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
