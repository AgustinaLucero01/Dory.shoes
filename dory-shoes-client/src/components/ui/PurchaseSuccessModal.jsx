

import { useEffect, useRef } from "react";
import { Modal } from 'bootstrap';

function PurchaseSuccessModal({ show, onClose }) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      bsModalRef.current = new Modal(modalRef.current);
    }
  }, []);

  useEffect(() => {
    if (show) {
      bsModalRef.current?.show();
      // Escuchar el evento para detectar cierre manual
      modalRef.current?.addEventListener(
        "hidden.bs.modal",
        () => {
          onClose?.();
        },
        { once: true }
      );
    }
  }, [show, onClose]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¡Compra exitosa!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <p>Gracias por tu compra. Te enviamos un email con los detalles.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PurchaseSuccessModal;
