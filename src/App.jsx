import { useEffect, useState } from "react";
import React, { createContext } from "react";
import { ListItem } from "./Components/ListItem";
import { Sidebar } from "./Components/Sidebar";
import { Workspace } from "./Components/Workspace";
import "./App.scss";
import { ModalDelete } from "./Components/ModalDelete";

const data = [
  {
    title: "What is Lorem Ipsum",
    textnote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    date: "May 10, 2018 at",
    time: "12:17 PM",
  },
  {
    title: "Do we use it, why",
    textnote:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    date: "June 8, 2017 at",
    time: "09:05 AM",
  },
  {
    title: "It come from, where does",
    textnote:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    date: "February 18, 2016 at",
    time: "06:38 PM",
  },
  {
    title: "Can I get some, where",
    textnote:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    date: "September 10, 2015 at",
    time: "11:20 AM",
  },
];

export const Context = createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [showNewContent, setShowNewContent] = useState(false);
  const [newNoteId, setNewNoteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setSelectedNoteId(null);
    setIsSelected(false);
  };

  const handleAddContent = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newNote = {
      id: newId,
      title: "Your Note Theme",
      date: "New Date",
      time: "New Time",
      textnote: "Your Note Text",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setNewNoteId(newId);
    setSelectedNoteId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = indexedDB.open("myDatabase", 2);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          if (db.objectStoreNames.contains("notes")) {
            db.deleteObjectStore("notes");
          }

          const objectStore = db.createObjectStore("notes", {
            keyPath: "id",
            autoIncrement: true,
          });
          objectStore.createIndex("title", "title", { unique: false });
          objectStore.createIndex("textnote", "textnote", { unique: false });
          objectStore.createIndex("date", "date", { unique: false });
          objectStore.createIndex("time", "time", { unique: false });

          for (const item of data) {
            objectStore.add(item);
          }
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("notes", "readonly");
          const objectStore = transaction.objectStore("notes");
          const getRequest = objectStore.getAll();

          getRequest.onsuccess = () => {
            const result = getRequest.result;
            setNotes(result);
          };

          transaction.oncomplete = () => {
            db.close();
          };
        };

        request.onerror = (event) => {
          console.log("Error", event.target.errorCode);
        };
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log(notes);

  return (
    <div className="App">
      <Context.Provider
        value={{
          notes,
          setNotes,
          selectedNoteId,
          setSelectedNoteId,
          searchValue,
          setSearchValue,
          isSelected,
          setIsSelected,
          showNewContent,
          handleAddContent,
          newNoteId,
          setNewNoteId,
          handleOpenModal,
          handleCloseModal,
          handleDeleteNote,
          setShowNewContent,
          setIsEditing,
          handleEditClick,
          handleSaveClick,
          isEditing,
          isEditingEnabled,
          setIsEditingEnabled,
        }}
      >
        <header>
          <Sidebar />
        </header>
        <main>
          <ListItem />
          <Workspace />
        </main>
        {showModal && <ModalDelete />}
      </Context.Provider>
    </div>
  );
}

export default App;
