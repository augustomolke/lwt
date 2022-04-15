import React from "react";
import Button from "@mui/material/Button";

interface Props {
  word: string;
  state: "unknown" | "well" | "poor" | "regular" | "ignore";
}
const WordButton: React.FunctionComponent<Props> = ({
  word,
  state = "unknown",
}) => {
  const [_studyState, setStudyState] = React.useState<string>(state);
  const variant: { [key: string]: any } = {
    unknown: "danger",
    well: "sucess",
    poor: "danger",
    regular: "warning",
    ignore: "outline-secondary",
  };
  return <Button onClick={() => setStudyState("poor")}>{word}</Button>;
};

export default WordButton;
