import { useContext } from "react";
import { Context } from "../App";

export const ModalDelete = () => {
  const { handleCloseModal, handleDeleteNote, selectedNoteId } =
    useContext(Context);

  const handleConfirmDelete = () => {
    handleDeleteNote(selectedNoteId);
    handleCloseModal();
  };

  return (
    <div className="ModalDelete">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete the note?</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
