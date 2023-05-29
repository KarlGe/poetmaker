import ElementChildren from "./ElementChildren";

const Element = (props: any) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    default:
      return (
        <p {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </p>
      );
    case "quote":
      return (
        <blockquote {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </blockquote>
      );
    case "code":
      return (
        <pre>
          <code {...attributes}>
            <ElementChildren isEditing={props.isEditing}>
              {children}
            </ElementChildren>
          </code>
        </pre>
      );
    case "bulleted-list":
      return (
        <ul {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </ul>
      );
    case "heading-one":
      return (
        <h1 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h2>
      );
    case "heading-three":
      return (
        <h3 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h3>
      );
    case "heading-four":
      return (
        <h4 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h4>
      );
    case "heading-five":
      return (
        <h5 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h5>
      );
    case "heading-six":
      return (
        <h6 {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </h6>
      );
    case "list-item":
      return (
        <li {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </li>
      );
    case "numbered-list":
      return (
        <ol {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </ol>
      );
    case "link":
      return (
        <span {...attributes}>
          <ElementChildren isEditing={props.isEditing}>
            {children}
          </ElementChildren>
        </span>
      );
    case "image":
      return null;
  }
};

export default Element;
