import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const Modal = ({ closeModalHandler, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseDown = (event) => {
    event.currentTarget.onmouseup = handleMouseUp.bind(event, event.target);
  };

  const handleMouseUp = (target, event) => {
    if (target === event.currentTarget && target === event.target) {
      closeModalHandler();
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => setIsOpen(true));
    } else if (!props.isOpen) {
      setTimeout(() => setIsOpen(false));
    }
  }, [props.isOpen]);

  return (
    <div
      className={classNames({ modal: true, 'modal--active': isOpen })}
      onMouseDown={handleMouseDown}
    >
      <div className="modal-body">
        <div className="modal-top">
          <h4 className="modal-top__title">{props.title}</h4>
          <div
            className="modal-top__close-button"
            onClick={closeModalHandler}
          />
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
