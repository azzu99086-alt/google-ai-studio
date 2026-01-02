
import React, { useState } from 'react';

interface Props {
  onResult: (expr: string, res: string) => void;
}

const ScientificCalculator: React.FC<Props> = ({ onResult }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const calculateFunc = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    let label = '';

    try {
      switch (func) {
        case 'sin': res = Math.sin(val); label = `sin(${val})`; break;
        case 'cos': res = Math.cos(val); label = `cos(${val})`; break;
        case 'tan': res = Math.tan(val); label = `tan(${val})`; break;
        case 'log': res = Math.log10(val); label = `log(${val})`; break;
        case 'ln': res = Math.log(val); label = `ln(${val})`; break;
        case 'sqrt': res = Math.sqrt(val); label = `√(${val})`; break;
        case 'pow2': res = Math.pow(val, 2); label = `(${val})²`; break;
        case 'pi': res = Math.PI; label = 'π'; break;
        case 'e': res = Math.E; label = 'e'; break;
        default: return;
      }
      const finalResult = res.toFixed(8).replace(/\.?0+$/, "");
      setDisplay(finalResult);
      onResult(label, finalResult);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleAction = (val: string) => {
    if (val === 'AC') {
      setDisplay('0');
      setExpression('');
      return;
    }
    if (val === '=') {
      try {
        const fullExpr = expression + display;
        const result = new Function(`return ${fullExpr.replace(/x/g, '*')}`)();
        const formatted = result.toString();
        onResult(fullExpr, formatted);
        setDisplay(formatted);
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
    setDisplay(prev => prev === '0' ? val : prev + val);
  };

  const sciButtons = [
    { label: 'sin', action: () => calculateFunc('sin') },
    { label: 'cos', action: () => calculateFunc('cos') },
    { label: 'tan', action: () => calculateFunc('tan') },
    { label: '√', action: () => calculateFunc('sqrt') },
    { label: 'x²', action: () => calculateFunc('pow2') },
    { label: 'log', action: () => calculateFunc('log') },
    { label: 'ln', action: () => calculateFunc('ln') },
    { label: 'π', action: () => calculateFunc('pi') },
    { label: 'e', action: () => calculateFunc('e') },
  ];

  const numButtons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'AC', '+', '='];

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex flex-col">
        <div className="mb-6 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 text-right overflow-hidden min-h-[120px] flex flex-col justify-end">
          <div className="text-slate-500 text-sm font-mono h-6 mb-1 truncate">{expression}</div>
          <div className="text-4xl font-bold font-mono tracking-tighter truncate">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {numButtons.map((label) => (
            <button
              key={label}
              onClick={() => handleAction(label)}
              className={`
                h-14 rounded-xl text-lg font-semibold transition-all duration-100 flex items-center justify-center
                ${label === '=' ? 'col-span-1 bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}
                active:scale-95
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-48 flex flex-col gap-3">
        <div className="text-slate-500 uppercase text-[10px] font-bold tracking-widest mb-1">Functions</div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
          {sciButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="h-12 bg-indigo-900/30 text-indigo-300 rounded-xl text-sm font-medium hover:bg-indigo-900/50 transition-colors border border-indigo-500/20 active:scale-95"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
