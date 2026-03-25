"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import styles from "./RichTextEditor.module.scss";
import clsx from "clsx";

interface RichTextEditorProps {
  content: unknown;
  onChange: (json: unknown) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: content as Record<string, unknown> | undefined,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(styles.toolbarButton, editor.isActive("bold") && styles.active)}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(styles.toolbarButton, editor.isActive("italic") && styles.active)}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx(styles.toolbarButton, editor.isActive("heading", { level: 2 }) && styles.active)}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={clsx(styles.toolbarButton, editor.isActive("heading", { level: 3 }) && styles.active)}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(styles.toolbarButton, editor.isActive("bulletList") && styles.active)}
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(styles.toolbarButton, editor.isActive("orderedList") && styles.active)}
        >
          OL
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={clsx(styles.toolbarButton, editor.isActive("link") && styles.active)}
        >
          LINK
        </button>
      </div>
      <EditorContent editor={editor} className={styles.content} />
    </div>
  );
}
