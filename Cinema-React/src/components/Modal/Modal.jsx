import React from 'react';
import "./Modal.css";

function Modal({ 
  show, 
  onClose, 
  titulo, 
  children, 
  footerContent,
  size = ''
}) {
  const modalStyle = {
    display: show ? 'block' : 'none',
    backgroundColor: 'rgba(0,0,0,0.5)'
  };

  return (
    <>
      {show && (
        <div 
          className="modal show fade" 
          style={modalStyle}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose}
                  aria-label="Fechar"
                />
              </div>
              
              <div className="modal-body">
                {children}
              </div>
              
              {footerContent && (
                <div className="modal-footer">
                  {footerContent}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;