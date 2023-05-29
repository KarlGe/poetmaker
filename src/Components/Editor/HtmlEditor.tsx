import { useCallback, useMemo, useState } from "react";
import "./HtmlEditor.css";
import { jsx } from "slate-hyperscript";
import { Transforms, createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Element from "./Element";
import Leaf from "./Leaf";

type TypeDict = { [key: string]: any };

const ELEMENT_TAGS = {
  A: (el: HTMLAnchorElement) => ({
    type: "link",
    url: el.getAttribute("href"),
  }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el: HTMLImageElement) => ({
    type: "image",
    url: el.getAttribute("src"),
  }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
} as TypeDict;

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
} as TypeDict;

export const deserialize = (el: ChildNode): any => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0] as HTMLElement;
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => {
      return jsx("text", attrs, child);
    });
  }

  return children;
};

const HtmlEditor = () => {
  const [isEditing, setIsEditing] = useState(true);
  const renderElement = useCallback(
    (props: any) => <Element {...props} isEditing={isEditing} />,
    [isEditing]
  );
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHtml(withReact(createEditor())), []);
  return (
    <div className="editor-wrapper">
      <button type="button" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Stop edit" : "Edit text"}
      </button>
      <Slate editor={editor} value={initialValue}>
        <Editable
          spellCheck={false}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    </div>
  );
};

const withHtml = (editor: Editor) => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "By default, pasting content into a Slate editor will use the clipboard's ",
      },
      { text: "'text/plain'", code: true },
      {
        text: " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle ",
      },
      { text: "'text/html'", code: true },
      { text: " data. " },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "This is an example of doing exactly that!" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Try it out for yourself! Copy and paste some rendered HTML rich text content (not the source code) from another site into this editor and it's formatting should be preserved.",
      },
    ],
  },
];

export default HtmlEditor;
