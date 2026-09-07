"use client";

import { Fragment, type ReactNode } from "react";

/** Inline: **bold**, *italic*, `code`, [links](url) */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    }
    const token = m[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-slate-800"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const lm = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (lm) {
        const href = lm[2].startsWith("http") ? lm[2] : "#";
        nodes.push(
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline underline-offset-2"
          >
            {lm[1]}
          </a>
        );
      } else {
        nodes.push(<Fragment key={key++}>{token}</Fragment>);
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }
  return nodes;
}

function isListLine(line: string) {
  return /^(\s*)([-*]|\d+\.)\s+/.test(line);
}

export function Markdown({ content }: { content: string }) {
  if (!content.trim()) return null;

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      const cls =
        level === 1
          ? "mt-3 mb-2 text-xl font-semibold tracking-tight text-slate-900"
          : level === 2
            ? "mt-3 mb-1.5 text-lg font-semibold text-slate-900"
            : "mt-2 mb-1 text-base font-semibold text-slate-900";
      blocks.push(
        <p key={key++} className={cls}>
          {renderInline(h[2])}
        </p>
      );
      i += 1;
      continue;
    }

    // Unordered / ordered lists
    if (isListLine(line)) {
      const items: string[] = [];
      while (i < lines.length && isListLine(lines[i])) {
        items.push(lines[i].replace(/^(\s*)([-*]|\d+\.)\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="my-2 list-disc space-y-1.5 pl-5 text-[15px] text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph (merge consecutive non-empty non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].match(/^#{1,3}\s+/) &&
      !isListLine(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={key++} className="my-2 text-[15px] leading-[1.7] text-slate-700">
        {renderInline(para.join(" "))}
      </p>
    );
  }

  return <div className="markdown-body">{blocks}</div>;
}
