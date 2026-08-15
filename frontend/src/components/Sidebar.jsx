import React from "react";

export const Sidebar = ({
  battles = [],
  activeBattleId = "",
  onSelectBattle = () => {},
  onNewBattle = () => {},
  isOpen = true,
  onToggle = () => {},
}) => {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col h-full bg-[#141414] border-r border-[#262626] transition-all duration-300 ${
        isOpen
          ? "w-64 translate-x-0"
          : "w-0 -translate-x-full md:w-16 md:translate-x-0"
      }`}
    >
      {/* Top Brand Header */}
      <div className="h-16 px-4 border-b border-[#262626] flex items-center justify-between shrink-0 bg-[#161616]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00e5ff] via-purple-500 to-[#dcb8ff] p-[1px] shrink-0">
            <div className="w-full h-full bg-[#121212] rounded-[7px] flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-[20px]">
                swords
              </span>
            </div>
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-white uppercase whitespace-nowrap">
                AI Battle Arena
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                Dual Model & Judge
              </span>
            </div>
          )}
        </div>

        {/* Toggle Button on Mobile / Desktop */}
        <button
          onClick={onToggle}
          className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252525]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* New Battle Button */}
      <div className="p-3 shrink-0">
        <button
          onClick={onNewBattle}
          className={`w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] text-black font-semibold text-xs tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.25)] ${
            !isOpen ? "md:px-0" : ""
          }`}
          title="Start New Battle"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {isOpen && <span>Start New Battle</span>}
        </button>
      </div>

      {/* Navigation & History Section */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        <div>
          {isOpen && (
            <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
              <span>Recent Battles</span>
              <span className="text-gray-600">{battles.length}</span>
            </div>
          )}
          <div className="space-y-1">
            {battles.map((b) => {
              const isActive = b.id === activeBattleId;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBattle(b.id)}
                  title={b.title}
                  className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all text-xs ${
                    isActive
                      ? "bg-gradient-to-r from-purple-950/40 to-cyan-950/40 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#1c1c1c]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-gray-500 shrink-0">
                    chat_bubble_outline
                  </span>
                  {isOpen && (
                    <div className="flex-1 truncate">
                      <div className="truncate font-medium">{b.title}</div>
                      <div className="text-[10px] text-gray-500">
                        {b.timestamp}
                      </div>
                    </div>
                  )}
                  {isOpen && isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#262626] bg-[#161616] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1px] shrink-0">
            <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-cyan-400 text-xs font-bold">
              NC
            </div>
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-xs text-white truncate">
                Neural Commander
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
