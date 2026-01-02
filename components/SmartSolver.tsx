
import React, { useState } from 'react';
import { solveProblem } from '../services/gemini';

interface Props {
  onResult: (expr: string, res: string) => void;
}

const SmartSolver: React.FC<Props> = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; reasoning: string; complexity: string } | null>(null);

  const handleSolve = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await solveProblem(query);
      setResult(data);
      onResult(query, data.answer);
    } catch (e) {
      alert("Failed to solve problem. Ensure your API key is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 flex gap-3 items-center">
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white shrink-0">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
        </div>
        <p className="text-sm text-indigo-300">
          Ask anything from simple arithmetic to complex word problems or finance questions. 
          "What's the monthly payment on a $400k loan at 4.5% over 30 years?"
        </p>
      </div>

      <div className="relative group">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your mathematical question here..."
          rows={3}
          className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none shadow-2xl placeholder:text-slate-600"
        />
        <button
          onClick={handleSolve}
          disabled={loading || !query.trim()}
          className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-2 rounded-2xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : 'Solve'}
        </button>
      </div>

      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${result.complexity === 'Easy' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : result.complexity === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                {result.complexity} Complexity
              </span>
              <h3 className="text-3xl font-bold mt-2 text-indigo-400">{result.answer}</h3>
            </div>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
            {result.reasoning}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSolver;
