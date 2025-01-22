// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';

import rehypeSanitize from 'rehype-sanitize';
import rehypeShiftHeading from 'rehype-shift-heading';
import rehypeUniqueHeadingIds from './src/plugins/rehype/rehype-unique-heading-ids';

// https://astro.build/config
export default defineConfig({
  site: 'https://ztz0.com',
  redirects: {
    '/flag': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/flags': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  output: 'static',
  integrations: [tailwind({
    applyBaseStyles: true
  }), icon(), expressiveCode({
    styleOverrides: {
      codeFontFamily: "'Monaspace Neon', monospace",
      uiFontFamily: "'Noto Sans', sans-serif"
    },
    themes: ['min-dark']
  }), sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeUniqueHeadingIds,
      // rehypeInjectFrontmatterTitle,
      [rehypeShiftHeading, { shift: 1 }],
      // [rehypeAutolinkHeadings, { behavior: 'append' }],
      rehypeSanitize
    ]
  },
  scopedStyleStrategy: 'where'
});