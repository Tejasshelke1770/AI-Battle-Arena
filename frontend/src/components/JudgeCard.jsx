import React, { useState } from 'react';

export const JudgeCard = ({
  judgeResponse,
  model1Name = "Model Alpha (Solution 1)",
  model2Name = "Model Beta (Solution 2)",
  judgeModel = "Arbiter-Pro AI",
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'sol1' | 'sol2'

  if (!judgeResponse) return null;

  const score1 = judgeResponse.solution_1_score ?? 0;
  const score2 = judgeResponse.solution_2_score ?? 0;
  const reasoning1 = judgeResponse.solutio_1_reasoning || judgeResponse.solution_1_reasoning || "Direct and accurate.";
  const reasoning2 = judgeResponse.solutio_2_reasoning || judgeResponse.solution_2_reasoning || "Comprehensive and adds useful context.";

  const isSol2Winner = score2 >= score1;
  const winnerName = isSol2Winner ? "Solution 2" : "Solution 1";
  const winnerScore = isSol2Winner ? score2 : score1;

  // Percentage calculations
  const pct1 = Math.min(100, Math.round((score1 / 10) * 100));
  const pct2 = Math.min(100, Math.round((score2 / 10) * 100));

  return (
    <div className="w-full bg-[#181818] rounded-xl border border-[#383344] p-5 md:p-6 relative overflow-hidden shadow-2xl transition-all duration-300">
      {/* Background radial gradient glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#282828]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-inner">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base md:text-lg text-white tracking-tight flex items-center gap-2">
                AI Judge Verdict & Recommendation
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-purple-950/70 text-[#dcb8ff] border border-purple-500/30">
                {judgeModel}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Independent multi-criteria automated evaluation
            </p>
          </div>
        </div>

        {/* Winner Banner Badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 px-4 py-2 rounded-lg border border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
          <span className="material-symbols-outlined text-amber-400 text-[20px] animate-bounce">
            emoji_events
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80">
              Verdict Winner
            </span>
            <span className="font-bold text-sm text-amber-200">
              {winnerName} ({winnerScore}/10)
            </span>
          </div>
        </div>
      </div>

      {/* Score Comparison Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {/* Solution 1 Score Card */}
        <div className={`p-4 rounded-xl bg-[#141414] border transition-all ${
          !isSol2Winner ? 'border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.15)]' : 'border-[#262626]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
              <span className="font-semibold text-sm text-[#00e5ff]">Solution 1</span>
              <span className="text-xs text-gray-400">Model Alpha</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-mono">{score1}</span>
              <span className="text-xs text-gray-500 font-mono">/ 10</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-[#252525] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-[#00e5ff] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct1}%` }}
            />
          </div>
        </div>

        {/* Solution 2 Score Card */}
        <div className={`p-4 rounded-xl bg-[#141414] border transition-all ${
          isSol2Winner ? 'border-[#dcb8ff] shadow-[0_0_20px_rgba(220,184,255,0.2)]' : 'border-[#262626]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dcb8ff]" />
              <span className="font-semibold text-sm text-[#dcb8ff]">Solution 2</span>
              <span className="text-xs text-gray-400">Model Beta</span>
              {isSol2Winner && (
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  TOP
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-300 font-mono">{score2}</span>
              <span className="text-xs text-gray-500 font-mono">/ 10</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-[#252525] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-[#dcb8ff] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct2}%` }}
            />
          </div>
        </div>
      </div>

      {/* Reasoning Details Card */}
      <div className="relative z-10 bg-[#121212] rounded-xl border border-[#282828] p-4 md:p-5">
        <div className="flex items-center justify-between mb-3 border-b border-[#222222] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">
              analytics
            </span>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-300">
              Judge Reasoning & Evaluation Notes
            </h4>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-0.5 rounded-lg border border-[#2a2a2a] text-[11px]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'all' ? 'bg-[#2e2e2e] text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setActiveTab('sol1')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'sol1' ? 'bg-cyan-950/60 text-[#00e5ff]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sol 1
            </button>
            <button
              onClick={() => setActiveTab('sol2')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'sol2' ? 'bg-purple-950/60 text-[#dcb8ff]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sol 2
            </button>
          </div>
        </div>

        {/* Reasoning Items */}
        <div className="space-y-3 pt-1">
          {/* Solution 1 Reasoning */}
          {(activeTab === 'all' || activeTab === 'sol1') && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#181818] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="w-6 h-6 rounded-md bg-cyan-950/80 text-[#00e5ff] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-cyan-500/30">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#00e5ff]">Solution 1 Evaluation</span>
                  <span className="text-[10px] text-gray-500 font-mono">Score: {score1}/10</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {reasoning1}
                </p>
              </div>
            </div>
          )}

          {/* Solution 2 Reasoning */}
          {(activeTab === 'all' || activeTab === 'sol2') && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#181818] border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-6 h-6 rounded-md bg-purple-950/80 text-[#dcb8ff] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-purple-500/30">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#dcb8ff]">Solution 2 Evaluation</span>
                  <span className="text-[10px] text-gray-500 font-mono">Score: {score2}/10</span>
                  {isSol2Winner && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {reasoning2}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
