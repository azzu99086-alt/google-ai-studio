
import React from 'react';
import { HistoryItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClear: () => void;
}

const HistorySidebar: React.FC<Props> = ({ isOpen, onClose, history, onClear }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`fixed right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 z-40 transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold">History</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm text-center">
              <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              No calculations yet
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="group bg-slate-800/40 border border-slate-800 p-4 rounded-2xl hover:border-indigo-500/30 transition-all">
                <div className="text-[10px] text-slate-500 mb-1 font-mono uppercase">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-slate-400 text-sm mb-1 truncate group-hover:text-slate-200 transition-colors">
                  {item.expression}
                </div>
                <div className="text-indigo-400 font-bold font-mono">
                  {item.result}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="mt-6 w-full py-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all font-semibold"
          >
            Clear All
          </button>
        )}
      </aside>
    </>
  );
};

export default HistorySidebar;
