import { useState } from 'react';

export const ChatInput = ({
  onSendMessage = () => {},
  isLoading = false,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-[#161616]/95 backdrop-blur-md border-t border-[#262626] px-4 md:px-6 py-3.5 z-20 shrink-0 ">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Input Form Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          {/* Leading Icon */}
          <div className="absolute left-3.5 text-gray-500 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Type your question or prompt to compare Model 1 vs Model 2 with Judge verdict..."
            className="w-full bg-[#1e1e1e] text-white placeholder-gray-500 text-sm md:text-base rounded-xl pl-11 pr-24 py-3.5 border border-[#303030] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] focus:outline-none transition-all shadow-inner"
          />

          {/* Action Buttons */}
          <div className="absolute right-2 flex items-center gap-1.5">
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="p-1 text-gray-500 hover:text-gray-300 rounded-md"
                title="Clear input"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-2.5 rounded-lg font-semibold flex items-center justify-center transition-all ${
                inputText.trim() && !isLoading
                  ? 'bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:brightness-110 active:scale-95'
                  : 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
              }`}
              title="Send prompt"
            >
              {isLoading ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">send</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
