import { h } from "hastscript";
import type { ShikiTransformer } from "shiki";

export const codeSnippetTransformer = (): ShikiTransformer => {
  return {
    name: "shiki-transformer-code-snippet",
    pre(node) {
      const { meta } = this.options;
  
      const wrapper = h(
        "div",
        {
          class: "relative code-wrapper not-prose",
        },
        node,
      );

      /* if (this.options.lang) {
        const languageSpan = h(
          "span",
          {
            class: "language",
          },
          this.options.lang
        );
        wrapper.children.push(languageSpan);
      } */

      const headerContainer = h("div", { class: "header-container" }, []);

      const matchFilename = meta?.__raw?.match(/filename=['"]([^'"]+)['"]/);
      if (matchFilename) {
        const fileName = matchFilename[0]
          .replace('filename="', "")
          .replace("filename='", "")
          .replace('"', "")
          .replace("'", "");
        headerContainer.children.push(h("span", { class: "title" }, fileName));
      }

      const copyButton = h(
        "div",
        {
          class: "copy-button",
          "data-code": this.source,
        },
        [createHastCopySvg(), createHastCheckSvg()],
      );

      const buttonContainer = h("div", { class: "button-container" }, []);
      buttonContainer.children.push(copyButton);

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

const createHastCopySvg = () => {
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
      class: "lucide lucide-copy-icon lucide-copy",
    },
    [
      h("rect", {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2"
      }),
      h("path", {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      })
    ]
  );
};

const createHastCheckSvg = () => {
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
      class: "lucide lucide-check-icon lucide-check",
    },
    [
      h("path", {
        d: "M20 6 9 17l-5-5"
      })
    ],
  );
};
