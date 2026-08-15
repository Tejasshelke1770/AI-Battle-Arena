import React from 'react';

/**
 * A lightweight, safe Markdown formatter for chat bubbles and solution cards.
 * Handles **bold**, *italic*, `inline code`, numbered lists, bullet lists, and line breaks.
 */
export const MarkdownRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  const renderFormattedText = (text) => {
    // Split on **bold**, *italic*, `code`
    const parts = [];
    let remaining = text;
    let keyIndex = 0;

    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2]) {
        // Bold: **text**
        parts.push(
          <strong key={keyIndex++} className="font-bold text-white tracking-wide">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // Italic: *text*
        parts.push(
          <em key={keyIndex++} className="italic text-gray-300">
            {match[3]}
          </em>
        );
      } else if (match[4]) {
        // Code: `text`
        parts.push(
          <code
            key={keyIndex++}
            className="px-1.5 py-0.5 rounded bg-[#1e293b] text-[#38bdf8] font-mono text-[0.875em] border border-cyan-500/20"
          >
            {match[4]}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const paragraphs = content.split(/\n\n+/);

  return (
    <div className={`space-y-3 leading-relaxed ${className}`}>
      {paragraphs.map((para, idx) => {
        const lines = para.split('\n');

        // Check if paragraph is a list
        if (lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
          return (
            <ul key={idx} className="list-disc list-inside space-y-1.5 text-gray-200">
              {lines.map((item, lIdx) => (
                <li key={lIdx} className="leading-normal">
                  {renderFormattedText(item.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Check for numbered list (1. item)
        if (lines.some((line) => /^\d+\.\s+/.test(line.trim()))) {
          return (
            <ol key={idx} className="list-decimal list-inside space-y-1.5 text-gray-200 pl-1">
              {lines.map((item, lIdx) => {
                const cleanItem = item.replace(/^\d+\.\s+/, '');
                return (
                  <li key={lIdx} className="leading-normal">
                    {renderFormattedText(cleanItem)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Check for header
        if (para.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-base font-bold text-cyan-300 pt-1 pb-0.5">
              {renderFormattedText(para.replace('### ', ''))}
            </h4>
          );
        }

        return (
          <p key={idx} className="text-gray-200 text-sm md:text-[15px] font-normal">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderFormattedText(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};
