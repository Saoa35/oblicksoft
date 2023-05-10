export const ModalDelete = ({ message, onConfirm, onCancel, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onConfirm}>Подтвердить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};
