"use client";

import ReactMarkdown from "react-markdown";
import styles from "./MarkdownRenderer.module.scss";

interface MarkdownRendererProps {
  url: string;
}

export function MarkdownRenderer({ url }: MarkdownRendererProps) {
  return <MarkdownContent url={url} />;
}

import { useEffect, useState } from "react";

function MarkdownContent({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent(null));
  }, [url]);

  if (!content) return null;

  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
