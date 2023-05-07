import "./App.scss";
import { ListItem } from "./Components/ListItem";
import { Sidebar } from "./Components/Sidebar";
import { Workspace } from "./Components/Workspace";

function App() {
  let openRequest = indexedDB.open("notes", 1);
  openRequest.onupgradeneeded = function () {
    // спрацьовує, якщо на клієнті немає бази даних
    // ...виконати ініціалізацію...
  };

  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
  };

  openRequest.onsuccess = function () {
    let db = openRequest.result;
    // продовжити роботу з базою даних за допомогою об’єкта db
  };

  return (
    <div className="App">
      <header>
        <Sidebar />
      </header>
      <main>
        <ListItem />
        <Workspace />
      </main>
    </div>
  );
}

export default App;
