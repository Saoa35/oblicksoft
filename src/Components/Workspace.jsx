import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../App";

export const Workspace = () => {
  const { notes, selectedNoteId } = useContext(Context);
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    if (selectedNoteId !== null) {
      setNoteData(notes.find((note) => note.id === selectedNoteId));
    }
  }, [notes, selectedNoteId]);

  const handleTitleChange = (event) => {
    const updatedNoteData = { ...noteData, title: event.target.value };
    setNoteData(updatedNoteData);
  };

  const handleTextNoteChange = (event) => {
    const updatedNoteData = { ...noteData, textnote: event.target.value };
    setNoteData(updatedNoteData);
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
            type="text"
            value={noteData.title}
            onChange={handleTitleChange}
          />
          <textarea value={noteData.textnote} onChange={handleTextNoteChange} />
        </div>
      </div>
    </div>
  );
};
