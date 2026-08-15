import React, { useState } from 'react';
import './App.css';
import { initialBattleData, sampleBattles, generateBattleResponse } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SolutionCard } from './components/SolutionCard';
import { JudgeCard } from './components/JudgeCard';
import { ChatInput } from './components/ChatInput';
import { JsonModal } from './components/JsonModal';

export const App = () => {
  const [battles, setBattles] = useState(sampleBattles);
  const [activeBattleId, setActiveBattleId] = useState(sampleBattles[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get current active battle
  const currentBattle = battles.find((b) => b.id === activeBattleId) || battles[0];
  const battleData = currentBattle?.data || initialBattleData.data;

  const handleSelectBattle = (id) => {
    setActiveBattleId(id);
  };

  const handleNewBattle = () => {
    const newId = `battle-${Date.now()}`;
    const newBattle = {
      id: newId,
      title: "New AI Battle",
      timestamp: "Just now",
      model1: "Model Alpha (v4.5)",
      model2: "Model Beta (v2.1)",
      judgeModel: "Arbiter-Pro v3",
      data: {
        problem: "Enter a question or prompt below to battle two AI models...",
        solution_1: "Solution 1 will appear here with direct, concise factual synthesis.",
        solution_2: "Solution 2 will appear here with comprehensive context, depth, and structured breakdown.",
        judege_response: {
          solution_1_score: 8.5,
          solution_2_score: 9.5,
          solutio_1_reasoning: "Awaiting prompt submission to evaluate Solution 1.",
          solutio_2_reasoning: "Awaiting prompt submission to evaluate Solution 2."
        }
      }
    };

    setBattles([newBattle, ...battles]);
    setActiveBattleId(newId);
  };

  const handleSendMessage = (messageText) => {
    setIsLoading(true);

    // Simulate response latency
    setTimeout(() => {
      const generated = generateBattleResponse(messageText);
      const updatedId = `battle-${Date.now()}`;
      const newBattleItem = {
        id: updatedId,
        title: messageText.length > 32 ? messageText.substring(0, 32) + "..." : messageText,
        timestamp: "Just now",
        model1: "Model Alpha (v4.5)",
        model2: "Model Beta (v2.1)",
        judgeModel: "Arbiter-Pro v3",
        data: generated
      };

      setBattles((prev) => [newBattleItem, ...prev]);
      setActiveBattleId(updatedId);
      setIsLoading(false);
    }, 600);
  };

  const handleResetToDefault = () => {
    setActiveBattleId(sampleBattles[0].id);
  };

  const handleVote = (solutionNum) => {
    setUserVotes((prev) => ({
      ...prev,
      [currentBattle.id]: prev[currentBattle.id] === solutionNum ? null : solutionNum
    }));
  };

  const currentPayloadForModal = {
    data: battleData
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#121212] text-[#e5e2e1]">
      {/* Left Sidebar */}
      <Sidebar
        battles={battles}
        activeBattleId={activeBattleId}
        onSelectBattle={handleSelectBattle}
        onNewBattle={handleNewBattle}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenJson={() => setIsJsonModalOpen(true)}
          model1={currentBattle?.model1 || "Model Alpha"}
          model2={currentBattle?.model2 || "Model Beta"}
          judgeModel={currentBattle?.judgeModel || "Arbiter-Pro v3"}
          onResetToDefault={handleResetToDefault}
        />

        {/* Top Battle Dual-Color Sparkline / Progress Bar */}
        <div className="w-full h-1 bg-[#202020] flex shrink-0">
          <div className="h-full bg-[#00e5ff] transition-all duration-500" style={{ width: '50%' }} />
          <div className="h-full bg-[#dcb8ff] transition-all duration-500" style={{ width: '50%' }} />
        </div>

        {/* Scrollable Arena Content Area */}
        <main className="flex-1 overflow-y-auto w-full relative z-0 flex flex-col items-center px-4 md:px-8 py-6">
          <div className="w-full max-w-6xl flex flex-col gap-6 pb-6">
            {/* User Message / Prompt Bubble */}
            <div className="self-end max-w-2xl w-full bg-[#1e1e1e] rounded-2xl rounded-tr-md p-4 md:p-5 border border-[#333333] shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                    User Prompt
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-mono">
                  {currentBattle?.timestamp || "Just now"}
                </span>
              </div>
              <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                {battleData.problem}
              </p>
            </div>

            {/* Battle Arena Grid: Solution 1 vs Solution 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full items-stretch">
              {/* Solution 1 */}
              <SolutionCard
                solutionNumber={1}
                modelName={currentBattle?.model1 || "Model Alpha"}
                solutionText={battleData.solution_1}
                score={battleData.judege_response?.solution_1_score}
                tags={["Direct", "Concise", "Accurate"]}
                latency={currentBattle?.latency1 || "180ms"}
                tokens={currentBattle?.tokens1 || "12 tokens"}
                isWinner={
                  (battleData.judege_response?.solution_1_score || 0) >=
                  (battleData.judege_response?.solution_2_score || 0)
                }
                onVote={handleVote}
              />

              {/* Solution 2 */}
              <SolutionCard
                solutionNumber={2}
                modelName={currentBattle?.model2 || "Model Beta"}
                solutionText={battleData.solution_2}
                score={battleData.judege_response?.solution_2_score}
                tags={["Contextual", "Comprehensive", "High Detail"]}
                latency={currentBattle?.latency2 || "320ms"}
                tokens={currentBattle?.tokens2 || "48 tokens"}
                isWinner={
                  (battleData.judege_response?.solution_2_score || 0) >=
                  (battleData.judege_response?.solution_1_score || 0)
                }
                onVote={handleVote}
              />
            </div>

            {/* AI Judge Verdict & Recommendations Card */}
            <div className="w-full">
              <JudgeCard
                judgeResponse={battleData.judege_response}
                model1Name={currentBattle?.model1 || "Solution 1"}
                model2Name={currentBattle?.model2 || "Solution 2"}
                judgeModel={currentBattle?.judgeModel || "Arbiter-Pro v3"}
              />
            </div>
          </div>
        </main>

        {/* Pinned Bottom Chat Input Bar */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onSelectPrompt={handleSendMessage}
        />
      </div>

      {/* Raw JSON Data Viewer Modal */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        data={currentPayloadForModal}
      />
    </div>
  );
};

export default App;