
import React, { useState, useCallback } from 'react';
import { CalculatorMode, HistoryItem } from './types';
import StandardCalculator from './components/StandardCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import GraphingModule from './components/GraphingModule';
import SmartSolver from './components/SmartSolver';
import HistorySidebar from './components/HistorySidebar';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const addToHistory = useCallback((expression: string, result: string) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      expression,
      result,
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  }, []);

  const clearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Navigation - Sidebar on Desktop, Bottom on Mobile */}
      <nav className="w-full md:w-20 lg:w-24 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-row md:flex-col items-center justify-around md:justify-start md:py-8 gap-4 z-20">
        <div className="hidden md:flex mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
            Σ
          </div>
        </div>
        
        <NavButton 
          active={mode === CalculatorMode.STANDARD} 
          onClick={() => setMode(CalculatorMode.STANDARD)}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
          label="Basic"
        />
        <NavButton 
          active={mode === CalculatorMode.SCIENTIFIC} 
          onClick={() => setMode(CalculatorMode.SCIENTIFIC)}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.31a2 2 0 00-1.029 1.029l-.31.691a6 6 0 00-.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l6.414-6.414a2 2 0 000-2.828l-1.428-1.428zM14.828 4.828a4 4 0 015.656 0l1.414 1.414a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.656 0l-1.414-1.414a4 4 0 010-5.656l1.414-1.414z" /></svg>}
          label="Sci"
        />
        <NavButton 
          active={mode === CalculatorMode.GRAPHING} 
          onClick={() => setMode(CalculatorMode.GRAPHING)}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
          label="Graph"
        />
        <NavButton 
          active={mode === CalculatorMode.SMART} 
          onClick={() => setMode(CalculatorMode.SMART)}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          label="AI"
        />

        <div className="mt-auto hidden md:flex pb-8">
           <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className={`p-3 rounded-xl transition-all ${isHistoryOpen ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
        <header className="p-4 md:p-6 border-b border-slate-900 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">
            {mode === CalculatorMode.STANDARD && "Standard Calculator"}
            {mode === CalculatorMode.SCIENTIFIC && "Scientific Calculator"}
            {mode === CalculatorMode.GRAPHING && "Function Visualizer"}
            {mode === CalculatorMode.SMART && "AI Math Assistant"}
          </h1>
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="md:hidden p-2 text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-4xl h-full flex flex-col">
            {mode === CalculatorMode.STANDARD && <StandardCalculator onResult={addToHistory} />}
            {mode === CalculatorMode.SCIENTIFIC && <ScientificCalculator onResult={addToHistory} />}
            {mode === CalculatorMode.GRAPHING && <GraphingModule />}
            {mode === CalculatorMode.SMART && <SmartSolver onResult={addToHistory} />}
          </div>
        </div>
      </main>

      {/* History Sidebar */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history} 
        onClear={clearHistory}
      />
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-xl transition-all duration-200 group ${active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
  >
    {icon}
    <span className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </button>
);

export default App;
