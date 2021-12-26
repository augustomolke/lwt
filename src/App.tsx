import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TextPanel from "./components/molecules/TextPanel/TextPanel";
import data from "./db/data.json";

function App() {
  return <TextPanel text={data.text} />;
}

export default App;
