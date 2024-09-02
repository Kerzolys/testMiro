import classNames from "classnames";
import React, { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";

import styles from './Modal.module.css'

type TModal = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ isOpen, children, onClose }: TModal) => {
  const modalRoot = document.querySelector('#modal-root')
  const modalRef = useRef<HTMLDivElement | null>(null)
  const handleClose = (evt: React.MouseEvent) => {
    if(modalRef.current && evt.target === modalRef.current) onClose()
  }

  return ReactDOM.createPortal(
    <div onClick={handleClose} className={classNames(styles.container, { [styles.isOpen]: isOpen, [styles.isClosed]: !isOpen })} ref={modalRef}>
      {children}
    </div>,
    modalRoot!
  )
}