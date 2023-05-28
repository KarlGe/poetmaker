import React, { useState } from "react";

type Props = {};
type ActiveState = { [key: number]: boolean };

function ElementChild({ child }: any) {
  const [active, setActive] = useState<ActiveState>({});

  const onWordClick = (index: number) => {
    setActive({ ...active, [index]: true });
  };
  const childText = child.props.text.text;

  const words = childText.split(" ").map((word, index) => (
    <span
      key={child.key + index}
      className={active[child.key + index] ? "active" : ""}
      onClick={() => onWordClick(child.key + index)}
      {...child.props.attributes}
    >
      {word}{" "}
    </span>
  ));
  return <>{words}</>;
}

export default ElementChild;
