import React from 'react';

const Modal = ({ modalText, buttonText, closeModal }) => {
  return (
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>{modalText}</p>
              <button
                type='button'
                className='btn btn-primary'
                onClick={closeModal}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
