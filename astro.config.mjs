// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';

import rehypeUniqueHeadingIds from './src/plugins/rehype/rehype-unique-heading-ids';
import rehypeSanitize from 'rehype-sanitize';
import rehypeShiftHeading from 'rehype-shift-heading';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import expressiveCode from 'astro-expressive-code';
import rehypeInjectFrontmatterTitle from './src/plugins/rehype/rehype-inject-frontmatter-title';

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
  markdown: {
    rehypePlugins: [
      rehypeUniqueHeadingIds,
      // rehypeInjectFrontmatterTitle,
      [rehypeShiftHeading, { shift: 1 }],
      // [rehypeAutolinkHeadings, { behavior: 'append' }],
      rehypeSanitize
    ]
  },
  compressHTML: false,
  scopedStyleStrategy: 'where'
});