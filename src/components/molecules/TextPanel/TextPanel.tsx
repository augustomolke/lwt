import React from "react";
import WordButton from "../../atoms/WordButton/WordButton";
import { v4 as uuid } from "uuid";

interface Props {
  text?: string;
}

const TextPanel: React.FunctionComponent<Props> = ({ text = "" }) => {
  const textArray = text.match(/\b(\w+)\b/g);
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
