import React from "react";

const Leaf = ({ attributes, children, leaf }) => {
  console.log(children);

  const words = leaf.text.split(" ").map((word, index) => (
    <span
      key={index}
      //   className={active[child.key + index] ? "active" : ""}
      //   onClick={() => onWordClick(child.key + index)}
      //   {...child.props.attributes}
      {...children.props}
    >
      {word}{" "}
    </span>
  ));
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{words}</span>;
};

export default Leaf;
