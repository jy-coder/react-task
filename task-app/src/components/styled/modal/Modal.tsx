import React, { useContext, useEffect, useState } from 'react';
import './modal.css';
import { Button } from '../button/Button';
import AppContext from '../../../context/AppContext';

interface DialogProps {
  content?: JSX.Element;
  footerDisplayLabel?: string;
  setModalOpen: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({
  content,
  footerDisplayLabel,
  setModalOpen
}) => {
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
  style?: React.CSSProperties;
  modalOpen: boolean;
  setModalOpen: (click: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  content,
  icon,
  footerDisplayLabel,
  modalOpen,
  setModalOpen
}) => {
  return (
    <div>
      <Button
        icon={icon}
        color="#1a2332"
        onClick={() => {
          setModalOpen(true);
        }}
      ></Button>
      {modalOpen && (
        <Dialog
          setModalOpen={setModalOpen}
          content={content}
          footerDisplayLabel={footerDisplayLabel ?? ''}
        />
      )}
    </div>
  );
};

export default Modal;
