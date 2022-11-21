import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalOverlayProps = PropsWithChildren<{}>;

type ModalAndBackdropProps = PropsWithChildren<{
  onHideCart?: () => void;
}>;

const Backdrop = (props: ModalAndBackdropProps) => {
  return <div onClick={props.onHideCart} className={styles.backdrop}></div>;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const targetLocation = document.getElementById('overlays');

const Modal = (props: ModalAndBackdropProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, targetLocation!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        targetLocation!
      )}

      {}
    </>
  );
};

export default Modal;
