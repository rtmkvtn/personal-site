"use client";

import { useRef, useState } from "react";
import styles from "./GalleryEditor.module.scss";

interface GalleryImage {
  url: string;
  order: number;
}

interface GalleryEditorProps {
  images: GalleryImage[];
  projectId: string | null;
  onChange: (images: GalleryImage[]) => void;
}

export function GalleryEditor({
  images,
  projectId,
  onChange,
}: GalleryEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !projectId) return;

    setUploading(true);
    try {
      const newImages = [...images];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", projectId);
        formData.append("type", "gallery");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) continue;

        const { url } = await res.json();
        newImages.push({ url, order: newImages.length });
      }

      onChange(newImages);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function moveUp(index: number) {
    if (index <= 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next.map((img, i) => ({ ...img, order: i })));
  }

  function moveDown(index: number) {
    if (index >= images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next.map((img, i) => ({ ...img, order: i })));
  }

  function remove(index: number) {
    const next = images.filter((_, i) => i !== index);
    onChange(next.map((img, i) => ({ ...img, order: i })));
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>GALLERY</span>

      {images.length > 0 && (
        <div className={styles.grid}>
          {images.map((img, i) => (
            <div key={img.url} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className={styles.image} />
              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  className={styles.actionBtn}
                >
                  UP
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  className={styles.actionBtn}
                >
                  DN
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className={styles.removeBtn}
                >
                  DEL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className={styles.fileInput}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={styles.uploadButton}
        disabled={uploading || !projectId}
      >
        {uploading ? "UPLOADING..." : "ADD IMAGES"}
      </button>
      {!projectId && (
        <span className={styles.hint}>Save project first to upload files</span>
      )}
    </div>
  );
}
