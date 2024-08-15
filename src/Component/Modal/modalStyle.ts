import styled from "styled-components";
import ReactModal from "react-modal";

export const ModalStyles : ReactModal.Styles = {
    overlay : {
        backgroundColor: "rgb(255 255 255 / 100%)",
        width: "100%",
        height: "100%",
        zIndex: 10,
        top: "0",
        left: "0",
    },
    content : {
        width: "400px",
        height: "auto",
        zIndex: "11",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow : "auto"
    }
}

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
    font-family: 'SCDream4';
    padding: 10px 0;
    font-size: 14px;
`;

export const ButtonStyle = styled.button`
    border: none;
    background: none;
`;
