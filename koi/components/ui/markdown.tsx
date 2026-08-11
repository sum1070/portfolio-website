import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import ThemedSpoiler from "@/components/ui/themed-spoiler";
import { cn } from "@/utils";

/**
 * Markdown renderer built on react-markdown + remark-gfm (tables, strikethrough, ...).
 * Markdown "#" renders as <h2> (etc.) so each page keeps a single <h1>.
 */

interface MarkdownProps {
  content: string;
  className?: string;
}

const styles = {
  container: "flex flex-col gap-4 leading-relaxed",
  h1: "text-2xl md:text-3xl font-semibold mt-4 scroll-mt-20",
  h2: "text-xl md:text-2xl font-semibold mt-3 scroll-mt-20",
  h3: "text-lg md:text-xl font-semibold mt-2 scroll-mt-20",
  ul: "list-disc pl-6 flex flex-col gap-1",
  ol: "list-decimal pl-6 flex flex-col gap-1",
  code: "font-mono text-sm bg-white/40 dark:bg-white/10 rounded px-1.5 py-0.5",
  // the [&_code] variants reset the inline-code chip styling inside code blocks
  pre: cn(
    "font-mono text-sm bg-black2/90 text-milky-white rounded-lg p-4 overflow-x-auto",
    "[&_code]:bg-transparent [&_code]:p-0 [&_code]:rounded-none",
  ),
  link: "text-purple2 dark:text-pale-purple2 underline underline-offset-2 hover:text-nice-purple1 transition-colors",
  img: "rounded-lg max-w-full",
  table: "w-full border-collapse text-left",
  th: "border border-nice-purple1/40 px-3 py-1.5 font-semibold bg-white/30 dark:bg-white/10",
  td: "border border-nice-purple1/40 px-3 py-1.5",
  hr: "border-nice-purple1/30",
  blockquote: "border-l-4 border-nice-purple1/50 pl-4 italic opacity-90",
  mark: "bg-pink1/70 dark:bg-purple2/50 text-inherit rounded px-1",
};

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

const textOf = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (React.isValidElement(children)) {
    return textOf((children.props as { children?: React.ReactNode }).children);
  }
  return "";
};

const richColors: Record<string, string> = {
  pink: "var(--color-bright-pink)",
  purple: "var(--color-purple2)",
  blue: "var(--color-blue2)",
  phlox: "var(--color-phlox)",
};

const richPattern = /(\|\|[^|]+\|\|)|(==[^=]+==)|(\{[\w#-]+:[^}]+\})/g;

const parseRichText = (text: string): React.ReactNode => {
  const nodes: React.ReactNode[] = [];
  const regex = new RegExp(richPattern.source, "g");
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("||")) {
      nodes.push(
        <ThemedSpoiler key={key++}>{token.slice(2, -2)}</ThemedSpoiler>,
      );
    } else if (token.startsWith("==")) {
      nodes.push(
        <mark key={key++} className={styles.mark}>
          {token.slice(2, -2)}
        </mark>,
      );
    } else {
      const colonIndex = token.indexOf(":");
      const colorName = token.slice(1, colonIndex);
      nodes.push(
        <span key={key++} style={{ color: richColors[colorName] || colorName }}>
          {token.slice(colonIndex + 1, -1)}
        </span>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (nodes.length === 0) return text;
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
};

const renderRichText = (children: React.ReactNode): React.ReactNode => {
  if (typeof children === "string") return parseRichText(children);
  if (Array.isArray(children)) {
    return children.map((child, index) =>
      typeof child === "string" ? (
        <React.Fragment key={index}>{parseRichText(child)}</React.Fragment>
      ) : (
        child
      ),
    );
  }
  return children;
};

const markdownComponents: Components = {
  h1: ({ node, children, ...props }) => (
    <h2 id={slugify(textOf(children))} className={styles.h1} {...props}>{renderRichText(children)}</h2>
  ),
  h2: ({ node, children, ...props }) => (
    <h3 id={slugify(textOf(children))} className={styles.h2} {...props}>{renderRichText(children)}</h3>
  ),
  h3: ({ node, children, ...props }) => (
    <h4 id={slugify(textOf(children))} className={styles.h3} {...props}>{renderRichText(children)}</h4>
  ),
  h4: ({ node, children, ...props }) => (
    <h4 id={slugify(textOf(children))} className={styles.h3} {...props}>{renderRichText(children)}</h4>
  ),
  p: ({ node, children, ...props }) => (
    <p {...props}>{renderRichText(children)}</p>
  ),
  li: ({ node, children, ...props }) => (
    <li {...props}>{renderRichText(children)}</li>
  ),
  strong: ({ node, children, ...props }) => (
    <strong {...props}>{renderRichText(children)}</strong>
  ),
  em: ({ node, children, ...props }) => (
    <em {...props}>{renderRichText(children)}</em>
  ),
  ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
  ol: ({ node, ...props }) => <ol className={styles.ol} {...props} />,
  pre: ({ node, ...props }) => <pre className={styles.pre} {...props} />,
  code: ({ node, ...props }) => <code className={styles.code} {...props} />,
  img: ({ node, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={styles.img} alt={alt ?? ""} {...props} />
  ),
  hr: ({ node, ...props }) => <hr className={styles.hr} {...props} />,
  blockquote: ({ node, children, ...props }) => (
    <blockquote className={styles.blockquote} {...props}>
      {renderRichText(children)}
    </blockquote>
  ),
  a: ({ node, href, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className={styles.link}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto">
      <table className={styles.table} {...props} />
    </div>
  ),
  th: ({ node, children, ...props }) => (
    <th className={styles.th} {...props}>{renderRichText(children)}</th>
  ),
  td: ({ node, children, ...props }) => (
    <td className={styles.td} {...props}>{renderRichText(children)}</td>
  ),
};

const Markdown = ({ content, className }: MarkdownProps) => {
  return (
    <div id="markdown-content" className={cn(styles.container, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;