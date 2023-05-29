import { useState } from "react";

type ActiveState = { [key: number]: boolean };

const ElementChild = ({ child }: { child: any }) => {
  const [active, setActive] = useState<ActiveState>({});

  const onWordClick = (index: number) => {
    setActive({ ...active, [index]: true });
  };
  const onWordMove = (event: any, index: number) => {
    const flags = event.buttons !== undefined ? event.buttons : event.which;
    const primaryMouseButtonDown = (flags & 1) === 1;
    if (primaryMouseButtonDown) {
      onWordClick(index);
    }
  };
  const childText = child.props.text.text;
  return childText.split(" ").map((word: string, index: number) => (
    <span
      {...child.props.attributes}
      contentEditable={false}
      key={child.key + index}
      className={active[child.key + index] ? "active" : ""}
      onPointerDown={() => onWordClick(child.key + index)}
      onPointerEnter={(e) => onWordMove(e, child.key + index)}
    >
      {word}{" "}
    </span>
  ));
};

export default ElementChild;
