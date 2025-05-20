import { h } from "hastscript";
import type { ShikiTransformer } from "shiki";

export const codeSnippetTransformer = (): ShikiTransformer => {
  return {
    name: "shiki-transformer-code-snippet",
    pre(node) {
      const wrapper = h(
        "div",
        {
          class: "relative code-wrapper not-prose",
        },
        node,
      );

      // TODO: Implement filename from meta and copy button, maybe language too?
      return wrapper;
    }
  };
};
