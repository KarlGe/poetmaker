import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = {
  type: "paragraph" | "link" | "image";
  children: CustomText[];
};
type CustomText = { text: string; code?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
