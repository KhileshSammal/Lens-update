import React from "react";

/**
 * Parses a string containing markdown links [label](url) and bare URLs (https://...)
 * and converts them into safe, high-contrast accessible anchor tags.
 */
export function formatInlineText(text?: string | null): React.ReactNode {
  if (!text) return null;

  // Regex matching [label](url) OR standalone http(s) URLs
  const linkRegex = /(?:\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s)]+)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = linkRegex.lastIndex;

    // Push text before the link
    if (matchStart > lastIndex) {
      elements.push(text.slice(lastIndex, matchStart));
    }

    if (match[1] && match[2]) {
      // Markdown link [label](url)
      const label = match[1];
      const url = match[2];
      elements.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-400/50 hover:decoration-amber-300 transition-colors font-medium"
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      // Plain URL
      const url = match[3];
      const displayUrl = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      elements.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-400/50 hover:decoration-amber-300 transition-colors font-medium break-all"
        >
          {displayUrl}
        </a>
      );
    }

    lastIndex = matchEnd;
  }

  // Push remainder
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length === 1 && typeof elements[0] === "string" ? elements[0] : elements;
}
