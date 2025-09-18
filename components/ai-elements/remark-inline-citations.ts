/**
 * Remark plugin to parse inline citations in markdown
 * Transforms [1], [2] etc into citation components
 */

import { visit } from 'unist-util-visit';
import type { Root, Text } from 'mdast';

export function remarkInlineCitations() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === null) return;

      const citationRegex = /\[(\d+)\]/g;
      const text = node.value;
      const matches = Array.from(text.matchAll(citationRegex));

      if (matches.length === 0) return;

      const children: any[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [fullMatch, citationNumber] = match;
        const matchIndex = match.index!;

        // Add text before citation
        if (matchIndex > lastIndex) {
          children.push({
            type: 'text',
            value: text.slice(lastIndex, matchIndex)
          });
        }

        // Add citation component
        children.push({
          type: 'mdxJsxTextElement',
          name: 'Citation',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'index',
              value: citationNumber
            }
          ],
          children: []
        });

        lastIndex = matchIndex + fullMatch.length;
      }

      // Add remaining text after last citation
      if (lastIndex < text.length) {
        children.push({
          type: 'text',
          value: text.slice(lastIndex)
        });
      }

      // Replace the original text node with the new nodes
      parent.children.splice(index!, 1, ...children);
    });
  };
}