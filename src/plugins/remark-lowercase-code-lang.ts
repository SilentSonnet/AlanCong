// src/plugins/remark-lowercase-code-lang.ts
import { visit } from "unist-util-visit";

export default function remarkLowercaseCodeLang() {
  return (tree: any) => {
    visit(tree, "code", (node: any) => {
      if (typeof node.lang === "string") {
        node.lang = node.lang.toLowerCase();
      }
    });
  };
}
