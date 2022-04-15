import React from "react";
import { useIndexedDB } from "./database/IndexedDB";
import TextPanel from "./components/molecules/TextPanel/TextPanel";

interface Words {
  collectionName: string;
  key?: string;
  schema: {
    word: string;
    status: string;
  };
}

interface Database {
  Words: Words;
}

function App() {
  const DBProvider = useIndexedDB<Database>("LWTDB", 1, [
    { collectionName: "Words" as keyof Database, key: "word" },
  ]);

  return (
    <div className="App">
      <DBProvider>
        <header className="App-header">
          <TextPanel
            text={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          />
        </header>
      </DBProvider>
    </div>
  );
}

export default App;
