import styles from "./RichTextRenderer.module.scss";

interface TiptapNode {
  type: string;
  content?: TiptapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, string> }[];
  attrs?: Record<string, unknown>;
}

function renderMarks(
  text: string,
  marks?: { type: string; attrs?: Record<string, string> }[],
): React.ReactNode {
  if (!marks || marks.length === 0) return text;

  return marks.reduce<React.ReactNode>((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>;
      case "italic":
        return <em>{acc}</em>;
      case "link":
        return (
          <a href={mark.attrs?.href} target="_blank" rel="noopener noreferrer">
            {acc}
          </a>
        );
      default:
        return acc;
    }
  }, text);
}

function renderNode(node: TiptapNode, index: number): React.ReactNode {
  switch (node.type) {
    case "doc":
      return node.content?.map((child, i) => renderNode(child, i));
    case "paragraph":
      return (
        <p key={index}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </p>
      );
    case "heading": {
      const level = (node.attrs?.level as number) || 2;
      const children = node.content?.map((child, i) => renderNode(child, i));
      if (level === 2) return <h2 key={index}>{children}</h2>;
      if (level === 3) return <h3 key={index}>{children}</h3>;
      return <h2 key={index}>{children}</h2>;
    }
    case "bulletList":
      return (
        <ul key={index}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={index}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );
    case "listItem":
      return (
        <li key={index}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </li>
      );
    case "text":
      return (
        <span key={index}>{renderMarks(node.text ?? "", node.marks)}</span>
      );
    default:
      return null;
  }
}

interface RichTextRendererProps {
  content: unknown;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || typeof content !== "object") return null;

  return (
    <div className={styles.richText}>
      {renderNode(content as TiptapNode, 0)}
    </div>
  );
}
