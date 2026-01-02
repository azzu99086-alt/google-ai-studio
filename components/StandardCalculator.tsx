
import React, { useState } from 'react';

interface Props {
  onResult: (expr: string, res: string) => void;
}

const StandardCalculator: React.FC<Props> = ({ onResult }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleAction = (val: string) => {
    if (val === 'AC') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (val === 'DEL') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
      return;
    }

    if (val === '=') {
      try {
        // Simple safety: only allow numbers and basic math symbols
        const sanitizedExpr = (expression + display).replace(/[^-0-9+*/.%()]/g, '');
        // We use Function instead of eval for a bit more isolation, though still careful
        const result = new Function(`return ${sanitizedExpr}`)();
        const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, "");
        onResult(sanitizedExpr, formattedResult);
        setDisplay(formattedResult);
        setExpression('');
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(val)) {
      setExpression(prev => prev + display + val);
      setDisplay('0');
      return;
    }

    if (val === '%') {
      setDisplay((parseFloat(display) / 100).toString());
      return;
    }

    if (val === '.') {
      if (!display.includes('.')) {
        setDisplay(prev => prev + '.');
      }
      return;
    }

    // Numbers
    setDisplay(prev => prev === '0' ? val : prev + val);
  };

  const buttons = [
    { label: 'AC', type: 'special' },
    { label: 'DEL', type: 'special' },
    { label: '%', type: 'special' },
    { label: '/', type: 'operator' },
    { label: '7', type: 'num' },
    { label: '8', type: 'num' },
    { label: '9', type: 'num' },
    { label: '*', type: 'operator' },
    { label: '4', type: 'num' },
    { label: '5', type: 'num' },
    { label: '6', type: 'num' },
    { label: '-', type: 'operator' },
    { label: '1', type: 'num' },
    { label: '2', type: 'num' },
    { label: '3', type: 'num' },
    { label: '+', type: 'operator' },
    { label: '0', type: 'num', wide: true },
    { label: '.', type: 'num' },
    { label: '=', type: 'equals' },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl w-full max-w-md mx-auto">
      <div className="mb-6 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 text-right overflow-hidden">
        <div className="text-slate-500 text-sm font-mono h-6 mb-1 truncate">{expression}</div>
        <div className="text-4xl font-bold font-mono tracking-tighter truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleAction(btn.label)}
            className={`
              h-16 rounded-2xl text-xl font-semibold transition-all duration-100 flex items-center justify-center
              ${btn.wide ? 'col-span-2' : ''}
              ${btn.type === 'num' ? 'bg-slate-800/50 text-slate-200 hover:bg-slate-700' : ''}
              ${btn.type === 'special' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : ''}
              ${btn.type === 'operator' ? 'bg-slate-700/50 text-indigo-400 hover:bg-slate-600' : ''}
              ${btn.type === 'equals' ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20' : ''}
              active:scale-95
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StandardCalculator;
