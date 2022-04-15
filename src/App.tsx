import React from "react";
import Button from "@mui/material/Button";
import { useIndexedDB } from "./database/useIndexedDB";

interface Words {
  collectionName: string;
  key?: string;
  schema: {
    word: string;
    status: string;
  };
}

interface Database {
  collection1: Words;
}

function App() {
  const DB: IDBOpenDBRequest = useIndexedDB<Database>("LWTDB", 1, [
    { collectionName: "Words" as keyof Database, key: "word" },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <Button> PRIMEIRO BOTÃO</Button>
      </header>
    </div>
  );
}

export default App;
