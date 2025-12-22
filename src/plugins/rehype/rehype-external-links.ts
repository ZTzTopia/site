import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

export default function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        const href = node.properties.href as string;

        if (!href.startsWith('http://') && !href.startsWith('https://')) {
          return;
        }

        const isSameOrigin = href.includes(typeof window !== 'undefined' ? window.location.origin : '');
        if (isSameOrigin) {
          return;
        }

        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';

        const existingClass = node.properties.className;
        const newClasses = ['flex', 'flex-row', 'gap-0.5', 'items-center', 'group', 'external-link'];

        if (Array.isArray(existingClass)) {
          node.properties.className = [...existingClass, ...newClasses];
        } else if (typeof existingClass === 'string') {
          node.properties.className = [existingClass, ...newClasses];
        } else {
          node.properties.className = newClasses;
        }

        // We can do this in CSS too
        node.children.push({
          type: 'element',
          tagName: 'svg',
          properties: {
            className: ['lucide', 'lucide-arrow-up-right-icon', 'lucide-arrow-up-right'],
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M7 7h10v10',
              },
              children: [],
            },
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M7 17 17 7',
              },
              children: [],
            },
          ],
        });
      }
    });
  };
}
