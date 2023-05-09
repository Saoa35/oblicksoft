import { useCallback, useContext } from "react";
import { Context } from "../App";

export const ListItem = () => {
  const { notes, setSelectedNoteId } = useContext(Context);

  const handleNoteClick = useCallback(
    (id) => {
      setSelectedNoteId(id);
    },
    [setSelectedNoteId]
  );

  return (
    <div className="ListItem">
      {notes.map((el) => {
        return (
          <ul key={el.id} onClick={() => handleNoteClick(el.id)}>
            <li className="title truncated">{el.title}</li>
            <li className="text">
              <span>{el.time}</span>
              <span className="truncated">{el.textnote}</span>
            </li>
          </ul>
        );
      })}
    </div>
  );
};
