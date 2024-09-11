import reactDom from "react-dom";

const Portal = ({ children }: any) => {
  const el = document.getElementById("portal");
  if (!el) {
    return null;
  }
  return reactDom.createPortal(children, el);
};

export default Portal;
