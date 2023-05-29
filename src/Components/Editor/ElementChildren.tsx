import React, { useState } from "react";

const ElementChildren = ({ children, isEditing }) => {
  if (isEditing) {
    return <>{children}</>;
  }
  return (
    <>
      {children.map((child) => (
        <ElementChild key={child.key} child={child} />
      ))}
    </>
  );
};

type ActiveState = { [key: number]: boolean };

const ElementChild = ({ child }) => {
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
  return childText.split(" ").map((word, index) => (
    <span
      {...child.props.attributes}
      contentEditable={false}
      key={child.key + index}
      className={active[child.key + index] ? "active" : ""}
      onPointerDown={(e) => onWordClick(child.key + index)}
      onPointerEnter={(e) => onWordMove(e, child.key + index)}
    >
      {word}{" "}
    </span>
  ));
};

export default ElementChildren;
