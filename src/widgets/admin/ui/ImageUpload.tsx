"use client";

import { useRef, useState } from "react";
import styles from "./ImageUpload.module.scss";

interface ImageUploadProps {
  label: string;
  value: string | null;
  projectId: string | null;
  type: "avatar" | "gallery" | "video" | "readme";
  onChange: (url: string | null) => void;
  accept?: string;
}

export function ImageUpload({
  label,
  value,
  projectId,
  type,
  onChange,
  accept = "image/*",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !projectId) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      onChange(url);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      {value && (
        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className={styles.image} />
          <button
            type="button"
            onClick={() => onChange(null)}
            className={styles.remove}
          >
            REMOVE
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className={styles.fileInput}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={styles.uploadButton}
        disabled={uploading || !projectId}
      >
        {uploading ? "UPLOADING..." : "UPLOAD"}
      </button>
      {!projectId && (
        <span className={styles.hint}>Save project first to upload files</span>
      )}
    </div>
  );
}
