"use client";

import { LucideIcon } from 'lucide-react';

interface MetricProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  min: number;
  max: number;
  color: string;
}

export const MetricCard = ({ title, value, unit, icon: Icon, min, max, color }: MetricProps) => {
  const isAlert = value < min || value > max;

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-500 ${
      isAlert ? 'bg-red-50 border-red-300 animate-pulse shadow-lg shadow-red-100' : 'bg-white border-slate-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${isAlert ? 'bg-red-500 text-white' : `${color} bg-opacity-10`}`}>
          <Icon size={20} className={isAlert ? 'text-white' : color} />
        </div>
        <span className={`text-sm font-semibold ${isAlert ? 'text-red-700' : 'text-slate-500'}`}>{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${isAlert ? 'text-red-600' : 'text-slate-900'}`}>{value}</span>
        <span className="text-slate-400 text-sm font-medium">{unit}</span>
      </div>
      <div className="mt-2 text-[10px] text-slate-400 uppercase tracking-tighter font-bold">
        Range: {min} - {max} {unit}
      </div>
    </div>
  );
};