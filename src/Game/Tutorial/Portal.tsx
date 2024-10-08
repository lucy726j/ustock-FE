import reactDom from "react-dom";
import styled from "styled-components";

const FixedContainer = styled.div`
  position: relative;
  top: -1025px;
  left: 250px;
  z-index: 1000;
  width: 100px;
  height: auto;

  /* @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }

  @media (max-width: 430px) {
    bottom: 5px;
    right: 5px;
    width: 80px;
  } */
`;

const Portal = ({ children }: any) => {
  const el = document.getElementById("portal");
  if (!el) {
    return null;
  }
  return reactDom.createPortal(<FixedContainer>{children}</FixedContainer>, el);
};

export default Portal;
