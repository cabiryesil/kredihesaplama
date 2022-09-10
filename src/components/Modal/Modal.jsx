import React, { useContext, useImperativeHandle, useState } from "react";
import "./Modal.css";
import { ModalContext } from "./ModalContext";

function Modal(props, ref) {
  const [active, setActive] = useState(false);
  const [child, setChild] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (props) => {
      setActive(true);
      setChild(props.child);
    },
    close: () => setActive(false),
  }));

  return active ? (
    <div
      className="modal"
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className="modal-inner"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {child}
      </div>
    </div>
  ) : (
    <></>
  );
}

function ModalHeader({ title }) {
  const modal = useContext(ModalContext);
  const modalCloseClickHandler = () => {
    modal.current.close();
  };

  return (
    <div className="modal-header">
      {title && <h2 className="modal-title">{title}</h2>}
      <div className="modal-close" onClick={modalCloseClickHandler}>
        X
      </div>
    </div>
  );
}

function ModalBody(props) {
  return <div className="modal-body">{props.children}</div>;
}

export default React.forwardRef(Modal);
export { ModalHeader, ModalBody };
