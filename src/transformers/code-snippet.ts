import { h } from "hastscript";
import type { ShikiTransformer } from "shiki";

function createCopyIcon(className: string) {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: `lucide lucide-${className}-icon lucide-${className}`,
    },
    [h("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }), h("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" })]
  );
}

function createCheckIcon(className: string) {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: `lucide lucide-${className}-icon lucide-${className}`,
    },
    [h("path", { d: "M20 6 9 17l-5-5" })]
  );
}

export const codeSnippetTransformer = (): ShikiTransformer => {
  return {
    name: "shiki-transformer-code-snippet",
    pre(node) {
      const { meta } = this.options;
  
      const wrapper = h(
        "div",
        { class: "relative code-wrapper not-prose" },
        node
      );

      const headerContainer = h("div", { class: "header-container" }, []);

      const matchFilename = meta?.__raw?.match(/filename=['"]([^'"]+)['"]/);
      if (matchFilename) {
        const fileName = matchFilename[0]
          .replace(/filename=['"]/, "")
          .replace(/['"]$/, "");
        headerContainer.children.push(h("span", { class: "title" }, fileName));
      }

      const copyIcon = createCopyIcon("copy");
      const checkIcon = createCheckIcon("check");
      
      const copyButton = h(
        "div",
        {
          class: "copy-button",
          "data-code": this.source,
        },
        [copyIcon, checkIcon]
      );

      const buttonContainer = h("div", { class: "button-container" }, [copyButton]);

      if (matchFilename) {
        headerContainer.children.push(buttonContainer);
        wrapper.children.unshift(headerContainer);
      } else {
        wrapper.children.push(buttonContainer);
      }

      return wrapper;
    }
  };
};