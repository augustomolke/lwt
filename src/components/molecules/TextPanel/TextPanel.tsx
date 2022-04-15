import React from "react";
import WordButton from "../../atoms/WordButton/WordButton";
import { v4 as uuid } from "uuid";
import { useInsert } from "../../../database/IndexedDB";

interface Props {
  text?: string;
}

const TextPanel: React.FunctionComponent<Props> = ({ text = "" }) => {
  const textArray = text.match(/\b(\w+)\b/g);
  useInsert();
  return (
    <>
      {textArray &&
        textArray.map((word) => (
          <WordButton word={word} state="unknown" key={uuid()} />
        ))}
    </>
  );
};

export default TextPanel;
