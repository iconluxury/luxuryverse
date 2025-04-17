import { Text } from '@chakra-ui/react';
import React from 'react';

const ALLOWED_TAGS = ['div', 'span', 'p', 'strong', 'em', 'ul', 'li', 'ol'];
const ALLOWED_ATTRIBUTES = ['class', 'style'];
const ALLOWED_STYLES = {
  color: /^#(0x)?[0-9a-f]+$/i,
  'text-align': /^left$|^right$|^center$/,
  'font-size': /^\d+(?:px|em|rem|%)$/,
};

interface HtmlNode {
  type: 'element' | 'text';
  tag?: string;
  attributes?: Record<string, string>;
  children?: HtmlNode[];
  content?: string;
}

export function parseHtml(html: string): React.ReactNode {
  if (!html || typeof html !== 'string') {
    return <Text fontSize="lg" color="gray.700" mb={4}>No description available</Text>;
  }

  try {
    // Tokenize HTML string
    const tokens: string[] = [];
    let current = '';
    let inTag = false;
    let inComment = false;

    for (let i = 0; i < html.length; i++) {
      if (html[i] === '<' && html.slice(i, i + 4) === '<!--') {
        inComment = true;
        i += 3;
        continue;
      }
      if (inComment && html.slice(i, i + 3) === '-->') {
        inComment = false;
        i += 2;
        continue;
      }
      if (inComment) continue;

      if (html[i] === '<' && !inTag) {
        if (current) tokens.push(current);
        current = '<';
        inTag = true;
      } else if (html[i] === '>' && inTag) {
        current += '>';
        tokens.push(current);
        current = '';
        inTag = false;
      } else {
        current += html[i];
      }
    }
    if (current) tokens.push(current);

    // Parse tokens into a node tree
    function parseTokens(tokens: string[], index: { value: number }): HtmlNode[] {
      const nodes: HtmlNode[] = [];

      while (index.value < tokens.length) {
        const token = tokens[index.value].trim();
        index.value++;

        if (!token) continue;

        if (token.startsWith('</')) {
          return nodes;
        } else if (token.startsWith('<') && token.endsWith('>')) {
          const tagMatch = token.match(/^<([a-zA-Z][a-zA-Z0-9]*)([^>]*)>$/);
          if (!tagMatch) continue;

          const [, tag, attrString] = tagMatch;
          if (!ALLOWED_TAGS.includes(tag.toLowerCase())) {
            const children = parseTokens(tokens, index);
            nodes.push(...children);
            continue;
          }

          const attributes: Record<string, string> = {};
          const attrMatches = attrString.matchAll(/([a-zA-Z-]+)(?:="([^"]*)")?/g);
          for (const match of attrMatches) {
            const [, name, value = ''] = match;
            if (ALLOWED_ATTRIBUTES.includes(name.toLowerCase())) {
              if (name === 'style') {
                const styleProps = value
                  .split(';')
                  .filter(Boolean)
                  .map((prop) => prop.trim().split(':').map((s) => s.trim()));
                const validStyles = styleProps
                  .filter(([key, val]) => ALLOWED_STYLES[key]?.test(val))
                  .map(([key, val]) => `${key}: ${val}`);
                if (validStyles.length) {
                  attributes.style = validStyles.join('; ');
                }
              } else {
                attributes[name.toLowerCase()] = value;
              }
            }
          }

          const children = parseTokens(tokens, index);
          nodes.push({
            type: 'element',
            tag: tag.toLowerCase(),
            attributes,
            children,
          });
        } else {
          nodes.push({
            type: 'text',
            content: token
              .replace(/</g, '<')
              .replace(/>/g, '>')
              .replace(/&/g, '&')
              .replace(/"/g, '"'),
          });
        }
      }

      return nodes;
    }

    const nodes = parseTokens(tokens, { value: 0 });

    // Convert nodes to React elements
    function nodesToReact(nodes: HtmlNode[]): React.ReactNode[] {
      return nodes
        .map((node, index) => {
          if (node.type === 'text') {
            return node.content ? (
              <Text key={index} as="span" fontSize="lg" color="gray.700">
                {node.content}
              </Text>
            ) : null;
          }
          if (node.type === 'element' && node.tag) {
            const props: Record<string, any> = {
              fontSize: 'lg',
              color: 'gray.700',
              mb: 2,
              ...node.attributes,
            };
            if (node.tag === 'ul' || node.tag === 'ol') {
              props.as = node.tag;
            } else if (node.tag === 'li') {
              props.as = 'li';
            } else {
              props.as = 'div';
            }
            return (
              <Text key={index} {...props}>
                {node.children ? nodesToReact(node.children) : null}
              </Text>
            );
          }
          return null;
        })
        .filter(Boolean);
    }

    const reactNodes = nodesToReact(nodes);
    return reactNodes.length > 0 ? reactNodes : <Text fontSize="lg" color="gray.700" mb={4}>No description available</Text>;
  } catch (err) {
    console.error('Error parsing HTML:', err, 'HTML:', html);
    return <Text fontSize="lg" color="gray.700" mb={4}>Failed to parse description</Text>;
  }
}