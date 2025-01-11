// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';

import rehypeUniqueHeadingIds from './packages/markdown/remark/src/rehype-unique-heading-ids';
import rehypeSanitize from 'rehype-sanitize';
import rehypeShiftHeading from 'rehype-shift-heading';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  markdown: {
    rehypePlugins: [
      rehypeUniqueHeadingIds,
      [rehypeShiftHeading, { shift: 1 }],
      // [rehypeAutolinkHeadings, { behavior: 'append' }],
      // rehypeSanitize
    ]
  },
  integrations: [
    tailwind({
      applyBaseStyles: true
    }), 
    icon(), 
    expressiveCode({
      styleOverrides: {
        codeFontFamily: "'Monaspace Neon', monospace",
        uiFontFamily: "'Noto Sans', sans-serif"
      },
      themes: ['min-dark']
    })
  ],
});