import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

const ModalNew = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = (event) => {
        if (event.target === event.currentTarget) {
            props.closeModal();
        }
    };

    useEffect(() => {
        if (props.isOpen) {
            setTimeout(() => setIsOpen(true))
        } else if (!props.isOpen) {
            setTimeout(() => setIsOpen(false))
        }
    }, [props.isOpen])

    return (
        <div className={classNames({modal: true, 'modal--active': isOpen})} onClick={closeModal}>
            <div className="modal-body">
                <div className="modal-top">
                    <h4 className="modal-top__title">{props.title}</h4>
                    <div className="modal-top__close-button" onClick={closeModal}/>
                </div>
                <div className="modal-content">{props.children}</div>
            </div>
        </div>
    );
};

export default ModalNew;
