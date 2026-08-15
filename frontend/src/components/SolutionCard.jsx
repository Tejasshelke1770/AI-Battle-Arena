import React, { useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

export const SolutionCard = ({
  solutionNumber = 1,
  modelName = "Model Alpha (v4.5)",
  solutionText = "",
  score = null,
  tags = ["Accurate", "Direct"],
  latency = "180ms",
  tokens = "12 tokens",
  isWinner = false,
  onVote = null,
  userVoted = false,
}) => {
  const [copied, setCopied] = useState(false);

  const isSol1 = solutionNumber === 1;
  const accentColor = isSol1 ? "cyan" : "violet";

  const handleCopy = () => {
    navigator.clipboard.writeText(solutionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative flex flex-col h-full bg-[#1c1b1b] rounded-xl border transition-all duration-300 overflow-hidden group ${
        isSol1
          ? "border-[#2f383b] hover:border-[#00e5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.18)]"
          : "border-[#352f3d] hover:border-[#dcb8ff] hover:shadow-[0_0_20px_rgba(220,184,255,0.18)]"
      } ${userVoted ? (isSol1 ? "ring-2 ring-[#00e5ff]" : "ring-2 ring-[#dcb8ff]") : ""}`}
    >
      {/* Top indicator bar */}
      <div
        className={`w-full h-1 transition-all duration-300 ${
          isSol1
            ? "bg-gradient-to-r from-[#00e5ff] to-[#00b4d8]"
            : "bg-gradient-to-r from-[#dcb8ff] to-[#9d4edd]"
        }`}
      />

      {/* Header */}
      <div className="px-5 py-3.5 bg-[#181818] border-b border-[#2a2a2a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
              isSol1
                ? "bg-cyan-950/70 text-[#00e5ff] border border-cyan-500/30"
                : "bg-purple-950/70 text-[#dcb8ff] border border-purple-500/30"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSol1 ? "smart_toy" : "psychology"}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold text-sm md:text-base tracking-wide ${
                  isSol1 ? "text-[#00e5ff]" : "text-[#dcb8ff]"
                }`}
              >
                Solution {solutionNumber}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                ({modelName})
              </span>
            </div>
          </div>
        </div>

        {/* Tags & Badges */}
        <div className="flex items-center gap-1.5">

          {score !== null && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ml-1 flex items-center gap-1 ${
                isWinner
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {score}/10
              {isWinner && (
                <span className="material-symbols-outlined text-[14px] text-amber-400">
                  emoji_events
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 overflow-y-auto min-h-[140px] bg-[#161616]">
        <MarkdownRenderer content={solutionText} />
      </div>

      {/* Footer / Controls */}
      <div className="px-4 py-3 bg-[#181818] border-t border-[#262626] flex items-center justify-end text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy solution text"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#252525] hover:bg-[#303030] text-gray-300 hover:text-white transition-colors border border-gray-700/60 font-medium"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copied ? "check" : "content_copy"}
            </span>
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          {/* User Vote Button */}
          {/* {onVote && (
            <button
              onClick={() => onVote(solutionNumber)}
              className={`flex items-center gap-1 px-3 py-1 rounded font-semibold text-xs transition-all active:scale-95 ${
                userVoted
                  ? isSol1
                    ? "bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                    : "bg-[#dcb8ff] text-black shadow-[0_0_12px_rgba(220,184,255,0.4)]"
                  : isSol1
                    ? "border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black"
                    : "border border-[#dcb8ff] text-[#dcb8ff] hover:bg-[#dcb8ff] hover:text-black"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {userVoted ? "check_circle" : "how_to_vote"}
              </span>
              <span>
                {userVoted
                  ? "Voted"
                  : `Vote ${solutionNumber === 1 ? "A" : "B"}`}
              </span>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};
