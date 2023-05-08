import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import { Context } from "../App";

export const Workspace = () => {
  const { notes } = useContext(Context);
  const [noteData, setNoteData] = useState(notes);

  const handleTitleChange = (event, id) => {
    const updatedNotes = noteData.map((el) => {
      if (el.id === id) {
        return { ...el, title: event.target.value };
      }
      return el;
    });
    setNoteData(updatedNotes);
  };

  const handleTextNoteChange = (event, id) => {
    const updatedNotes = noteData.map((el) => {
      if (el.id === id) {
        return { ...el, textnote: event.target.value };
      }
      return el;
    });
    setNoteData(updatedNotes);
  };

  return (
    <div className="Workspace">
      {noteData.map((el) => {
        return (
          <div key={el.id} className="content">
            <h3>{el.date + " " + el.time}</h3>
            <div className="text-area">
              <input
                type="text"
                value={el.title}
                onChange={(event) => handleTitleChange(event, el.id)}
              />
              <textarea
                value={el.textnote}
                onChange={(event) => handleTextNoteChange(event, el.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
