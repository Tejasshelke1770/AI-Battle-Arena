import { useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { SolutionCard } from "./components/SolutionCard";
import { JudgeCard } from "./components/JudgeCard";
import { ChatInput } from "./components/ChatInput";
import { JsonModal } from "./components/JsonModal";
import axios from "axios";

export const App = () => {
  const [battles, setBattles] = useState([]);
  const [activeBattleId, setActiveBattleId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get current active battle
  const currentBattle =
    battles?.find((b) => b.id === activeBattleId) || battles[0];
  const battleData = currentBattle?.data;

  const handleSelectBattle = (id) => {
    setActiveBattleId(id);
  };

  const handleNewBattle = () => {
    const newId = `battle-${Date.now()}`;
    const newBattle = {
      id: newId,
      title: "New AI Battle",
      data: null,
      model1: "Mistral",
      model2: "Cohere",
      judgeModel: "Gemini",
    };

    setBattles([newBattle, ...battles]);
    setActiveBattleId(newId);
  };

  const handleSendMessage = async (messageText) => {
    setIsLoading(true);

    const result = await axios.post("http://localhost:3000/api/invoke", {
      message: messageText,
    });

    // Simulate response latency
    setTimeout(() => {
      const generated = result.data;
      const updatedId = `battle-${Date.now()}`;
      const newBattleItem = {
        id: updatedId,
        title:
          messageText.length > 32
            ? messageText.substring(0, 32) + "..."
            : messageText,

        model1: "Mistral",
        model2: "Cohere",
        judgeModel: "Gemini",
        data: generated,
      };

      if (!battles[0].data) {
        const exUpdated = {
          ...battles[0],
          data: generated,
          title: newBattleItem.title,
        };
        setBattles((prev) => [exUpdated, ...prev.slice(1)]);
        setActiveBattleId(battles[0].id);
      }

      if (battles[0].data) {
        setBattles((prev) => [newBattleItem, ...prev]);
        setActiveBattleId(updatedId);
      }
      setIsLoading(false);
    }, 600);
  };

  const currentPayloadForModal = {
    data: battleData,
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
        />

        {/* Top Battle Dual-Color Sparkline / Progress Bar */}
        <div className="w-full h-1 bg-[#202020] flex shrink-0">
          <div
            className="h-full bg-[#00e5ff] transition-all duration-500"
            style={{ width: "50%" }}
          />
          <div
            className="h-full bg-[#dcb8ff] transition-all duration-500"
            style={{ width: "50%" }}
          />
        </div>

        {/* Scrollable Arena Content Area */}
        {currentBattle?.data && (
          <main className="flex-1 overflow-y-auto w-full mb-20 relative z-0 flex flex-col items-center px-4 md:px-8 py-6">
            <div className="w-full max-w-7xl flex flex-col gap-6 pb-6">
              {/* User Message / Prompt Bubble */}
              <div className="self-end max-w-1/2 w-full bg-[#1e1e1e] rounded-2xl rounded-tr-md p-4 md:p-5 border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#2a2a2a]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs">
                      <span className="material-symbols-outlined text-[14px]">
                        person
                      </span>
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
        )}

        {!currentBattle?.data && (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm md:text-base font-mono px-4 text-center max-w-2xl mx-auto">
            Enter some text in the input below to start a new AI battle between
            two models.
          </div>
        )}

        {/* Pinned Bottom Chat Input Bar */}
        <div className="w-full absolute bottom-0">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onSelectPrompt={handleSendMessage}
          />
        </div>
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
