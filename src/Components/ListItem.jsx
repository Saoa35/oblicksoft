import { useCallback, useContext } from "react";
import { Context } from "../App";

export const ListItem = () => {
  const {
    notes,
    setSelectedNoteId,
    selectedNoteId,
    searchValue,
    setIsSelected,
    showNewContent,
    newNoteId,
    setNewNoteId,
  } = useContext(Context);

  const handleNoteClick = useCallback(
    (id) => {
      if (id === "new") {
        setSelectedNoteId(null);
        setNewNoteId(id);
      } else {
        setSelectedNoteId(id);
        setNewNoteId(null);
      }
      setIsSelected(true);
    },
    [setSelectedNoteId, setNewNoteId, setIsSelected]
  );

  return (
    <div className="ListItem">
      {notes
        .filter((obj) => {
          if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
          return false;
        })
        .map((el) => {
          const isChoosen = el.id === selectedNoteId || el.id === newNoteId;
          return (
            <div className={isChoosen ? "choosen" : ""} key={el.id}>
              <ul onClick={() => handleNoteClick(el.id)}>
                <li className="title truncated">{el.title}</li>
                <li className="text">
                  <span>{el.time}</span>
                  <span className="truncated">{el.textnote}</span>
                </li>
              </ul>
            </div>
          );
        })}

      {showNewContent && (
        <div className="choosen">
          <ul onClick={() => handleNoteClick("new")}>
            <li className="title truncated">Your Note Theme</li>
            <li className="text">
              <span>TIME</span>
              <span className="truncated">Your Note Text</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
