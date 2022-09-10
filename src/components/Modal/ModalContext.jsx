import React, { createContext, useRef } from "react";
import Modal from "./Modal";

const ModalContext = createContext();

function ModalWrapper({ children }) {
  const modalRef = useRef();

  return (
    <ModalContext.Provider value={modalRef}>
      <Modal ref={modalRef} />
      {children}
    </ModalContext.Provider>
  );
}
export default ModalWrapper;
export { ModalContext };
