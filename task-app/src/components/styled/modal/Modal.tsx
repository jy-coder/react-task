import React, { useState } from 'react';
import './modal.css';
import { Button } from '../button/button.style';
interface DialogProps {
  setOpenModal: (value: boolean) => void;
  content?: JSX.Element;
}

const Dialog: React.FC<DialogProps> = ({ setOpenModal, content }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">{content}</div>
        <div className="footer">
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Save
          </Button>
          {/* <Button>Continue</Button> */}
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  displayLabel: string;
  buttonLabel: string;
  content: JSX.Element;
  //   setOpenModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  displayLabel,
  buttonLabel,
  content
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="Modal">
      <h1>{displayLabel}</h1>
      <Button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {buttonLabel}
      </Button>
      {modalOpen && <Dialog setOpenModal={setModalOpen} content={content} />}
    </div>
  );
};

export default Modal;
