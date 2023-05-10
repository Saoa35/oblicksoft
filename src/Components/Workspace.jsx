import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../App";

export const Workspace = () => {
  const { notes, setNotes, selectedNoteId, isEditing, isEditingEnabled } =
    useContext(Context);
  const [noteData, setNoteData] = useState(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const isEditable = selectedNoteId !== null && isEditingEnabled;

  useEffect(() => {
    if (selectedNoteId !== null) {
      setNoteData(notes.find((note) => note.id === selectedNoteId));
    }
  }, [notes, selectedNoteId]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, title: newTitle } : note
      )
    );
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, textnote: newContent } : note
      )
    );
  };

  if (selectedNoteId === null || noteData === null) {
    return null;
  }

  return (
    <div className="Workspace">
      <div className="content">
        <p>{noteData.date + " " + noteData.time}</p>
        <div className="text-field">
          <input
            readOnly={!isEditable}
            type="text"
            value={selectedNote.title}
            onChange={handleTitleChange}
            disabled={!isEditing}
          />
          <textarea
            readOnly={!isEditable}
            value={selectedNote.textnote}
            onChange={handleContentChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};
