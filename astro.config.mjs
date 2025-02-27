// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

import rehypeUniqueHeadingIds from './src/plugins/rehype/rehype-unique-heading-ids';
import rehypeShiftHeading from './src/plugins/rehype/rehype-shift-heading';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ztz0.com',
  redirects: {
    '/flag': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/flags': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  output: 'static',
  integrations: [
    icon(),
    sitemap({
      filter: (page) => 
        !page.includes('/components/')
    })
  ],
  markdown: {
    rehypePlugins: [
      rehypeUniqueHeadingIds,
      [rehypeShiftHeading, { shift: 1 }]
    ]
  },
  scopedStyleStrategy: 'where',
  vite: {
    plugins: [tailwindcss()]
  }
});