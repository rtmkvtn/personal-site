import clsx from "clsx";
import styles from "./GlitchText.module.scss";

type ElementTag = "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";

interface GlitchTextProps {
  children: string;
  active: boolean;
  as?: ElementTag;
  className?: string;
}

export function GlitchText({
  children,
  active,
  as: Tag = "span",
  className,
}: GlitchTextProps) {
  return (
    <Tag
      data-text={children}
      className={clsx(styles.root, active && styles.active, className)}
    >
      {children}
    </Tag>
  );
}
