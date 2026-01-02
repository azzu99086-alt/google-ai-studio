
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GraphingModule: React.FC = () => {
  const [equation, setEquation] = useState('Math.sin(x)');
  const [range, setRange] = useState({ min: -10, max: 10, step: 0.5 });

  const data = useMemo(() => {
    const points = [];
    try {
      // Use Function constructor with a predefined set of Math functions for slightly better security
      const mathFunc = new Function('x', `
        const { sin, cos, tan, pow, sqrt, log, PI, E, abs, exp } = Math;
        return ${equation};
      `);
      
      for (let x = range.min; x <= range.max; x += range.step) {
        const y = mathFunc(x);
        if (typeof y === 'number' && !isNaN(y) && isFinite(y)) {
          points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(4)) });
        }
      }
    } catch (e) {
      console.error("Graph error", e);
    }
    return points;
  }, [equation, range]);

  return (
    <div className="w-full flex flex-col gap-6 h-full min-h-[500px]">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Function y = f(x)</label>
            <input 
              type="text" 
              value={equation} 
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g. sin(x) * x"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <p className="text-[10px] text-slate-500 mt-2">Available: sin, cos, tan, pow, sqrt, log, PI, E</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="w-1/2 md:w-24">
              <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Min X</label>
              <input 
                type="number" 
                value={range.min} 
                onChange={(e) => setRange(r => ({ ...r, min: parseFloat(e.target.value) }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-center focus:outline-none"
              />
            </div>
            <div className="w-1/2 md:w-24">
              <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Max X</label>
              <input 
                type="number" 
                value={range.max} 
                onChange={(e) => setRange(r => ({ ...r, max: parseFloat(e.target.value) }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-center focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/50 rounded-3xl border border-slate-800 p-4 min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="x" 
              stroke="#64748b" 
              tick={{ fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
              type="number"
            />
            <YAxis 
              stroke="#64748b" 
              tick={{ fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
              itemStyle={{ color: '#818cf8' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphingModule;
