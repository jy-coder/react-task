import React, { useContext, useState } from 'react';
import './modal.css';
import { Button } from '../button/Button';
import AppContext from '../../../context/AppContext';

interface DialogProps {
  // setOpenModal: (value: boolean) => void;
  content?: JSX.Element;
  footerDisplayLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({ content, footerDisplayLabel }) => {
  const { setModalOpen } = useContext(AppContext);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">{content}</div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

interface ModalProps {
  modalLabel?: string;
  content: JSX.Element;
  icon?: JSX.Element;
  footerDisplayLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ content, icon, footerDisplayLabel }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const { modalOpen, setModalOpen } = useContext(AppContext);
  return (
    <div className="Modal">
      <Button
        icon={icon}
        color=""
        // className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      ></Button>
      {modalOpen && (
        <Dialog
          content={content}
          footerDisplayLabel={footerDisplayLabel ?? ''}
        />
      )}
    </div>
  );
};

export default Modal;
