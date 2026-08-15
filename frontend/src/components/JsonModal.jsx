import React, { useState } from 'react';

export const JsonModal = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedJson = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#161616] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1a1a1a] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-cyan-400 text-[22px]">
              data_object
            </span>
            <h3 className="font-bold text-white text-base">Raw Data Payload</h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              JSON format
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#282828] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto bg-[#101010] font-mono text-xs md:text-sm text-gray-200">
          <pre className="p-4 rounded-xl bg-[#161616] border border-[#262626] overflow-x-auto text-cyan-100/90 leading-relaxed">
            {formattedJson}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#1a1a1a] border-t border-[#282828] flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Schema: problem • solution_1 • solution_2 • judege_response
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-gray-200 hover:text-white text-xs font-semibold border border-gray-700 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied to Clipboard' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] text-black text-xs font-bold hover:brightness-110 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
