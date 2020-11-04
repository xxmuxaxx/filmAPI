import React from 'react';
import classNames from 'classnames';

const Modal = (props) => {
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      props.toggleModalHadler();
    }
  };

  return (
    <div className={classNames({ modal: true, 'modal--active': props.isModalOpen })} onClick={closeModal}>
      <div className="modal-body">
        <div className="modal-top">
          <h4 className="modal-top__title">{props.title}</h4>
          <div className="modal-top__close-button" onClick={props.toggleModalHadler} />
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
