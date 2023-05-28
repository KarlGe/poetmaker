import "./App.css";
import { useState } from "react";
import testContent from "./testContent.json";
import Editor from "./Components/Editor/Editor";
import HtmlEditor from "./Components/Editor/HtmlEditor";

type BlackedOutState = { [key: number]: boolean };

function App() {
  const [blackedOut, setBlackedOut] = useState<BlackedOutState>({});
  const words = testContent.content.split(" ");

  const onWordClick = (index: number) => {
    setBlackedOut({ ...blackedOut, [index]: true });
  };

  return (
    <>
      <h1>Poetmaker 3000</h1>
      <div className="card">
        {/* <Editor /> */}
        <HtmlEditor />
        {/* {words.map((word, index) => (
          <span
            key={index}
            className={blackedOut[index] ? "blacked-out" : ""}
            onClick={() => onWordClick(index)}
          >
            {word}{" "}
          </span>
        ))} */}
      </div>
    </>
  );
}

export default App;
