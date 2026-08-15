import React from 'react';

export const Header = ({
  onToggleSidebar = () => {},
  onOpenJson = () => {},
  model1 = "Mistral",
  model2 = "Cohere",
}) => {
  return (
    <header className="h-16 px-4 md:px-6 bg-[#141414] border-b border-[#262626] flex items-center justify-between shrink-0 z-30">
      {/* Left: Sidebar toggle & Arena title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#222222] transition-colors"
          title="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 font-mono uppercase">
            Arena Mode
          </span>
          <span className="text-xs text-gray-400 hidden lg:inline">
            Dual AI Model Battle + Neutral Judge Scoring
          </span>
        </div>
      </div>

      {/* Center / Right: Model Badges & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Model Alpha selector pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] border border-cyan-500/20 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
          <span className="text-gray-400">Sol 1:</span>
          <span className="text-[#00e5ff] font-semibold">{model1}</span>
        </div>

        {/* VS badge */}
        <span className="hidden xl:inline text-xs font-black text-gray-600 font-mono">VS</span>

        {/* Model Beta selector pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] border border-purple-500/20 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#dcb8ff]" />
          <span className="text-gray-400">Sol 2:</span>
          <span className="text-[#dcb8ff] font-semibold">{model2}</span>
        </div>

        {/* View Raw JSON Modal Button */}
        <button
          onClick={onOpenJson}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-cyan-900/40 hover:from-purple-800/60 hover:to-cyan-800/60 text-cyan-300 hover:text-white text-xs font-semibold border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">data_object</span>
          <span>View JSON</span>
        </button>
      </div>
    </header>
  );
};
