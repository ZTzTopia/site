// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

import rehypeUniqueHeadingIds from './src/plugins/rehype/rehype-unique-heading-ids';
import rehypeShiftHeading from 'rehype-shift-heading';

const flexokiDark = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(new URL(`./flexoki-dark.jsonc`, import.meta.url), 'utf-8')
);
const flexokiLight = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(new URL(`./flexoki-light.jsonc`, import.meta.url), 'utf-8')
);

// https://astro.build/config
export default defineConfig({
  site: 'https://ztz0.com',
  redirects: {
    '/flag': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/flags': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  output: 'static',
  integrations: [
    icon(), 
    expressiveCode({
      defaultProps: {
        wrap: true
      },
      styleOverrides: {
        codeFontFamily: "'Monaspace Neon', monospace",
        uiFontFamily: "'Noto Sans', sans-serif",
        borderRadius: '0.25rem',
        codeFontSize: '0.75rem',
        frames: {
          shadowColor: 'rgba(0, 0, 0, 0.0)',
        }
      },
      themes: [flexokiDark, flexokiLight]
    }), 
    sitemap()
  ],
  markdown: {
    rehypePlugins: [
      rehypeUniqueHeadingIds,
      // rehypeInjectFrontmatterTitle,
      [rehypeShiftHeading, { shift: 1 }]
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  },
  scopedStyleStrategy: 'where'
});