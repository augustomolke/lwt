import React from "react";
import Button from "react-bootstrap/Button";

interface Props {
  word: string;
  state: "unknown" | "well" | "poor" | "regular" | "ignore";
}
const WordButton: React.FunctionComponent<Props> = ({
  word,
  state = "unknown",
}) => {
  const [studyState, setStudyState] = React.useState<string>(state);
  const variant: { [key: string]: any } = {
    unknown: "danger",
    well: "sucess",
    poor: "danger",
    regular: "warning",
    ignore: "outline-secondary",
  };
  return <Button variant={variant[studyState]}>{word}</Button>;
};

export default WordButton;
