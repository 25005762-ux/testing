"use client";

import { LucideIcon } from 'lucide-react';

interface ToggleProps {
  label: string; isActive: boolean; isAutoMode: boolean;
  icon: LucideIcon; onClick: () => void;
}

export const SystemToggle = ({ label, isActive, isAutoMode, icon: Icon, onClick }: ToggleProps) => {
  return (
    <div className="relative group">
      <button 
        disabled={isAutoMode}
        onClick={onClick}
        className={`flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-300 ${
          isAutoMode ? 'opacity-40 cursor-not-allowed bg-slate-900/20 border-slate-800' :
          isActive ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 shadow-inner' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive && !isAutoMode ? 'text-indigo-400' : 'text-slate-500'} />
          <span className="font-bold text-[10px] uppercase tracking-wider">{label}</span>
        </div>
        <div className={`w-8 h-4 rounded-full relative transition-colors ${isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
          <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isActive ? 'right-1' : 'left-1'}`} />
        </div>
      </button>
      
      {/* Floating AI Lock Indicator */}
      {isAutoMode && (
        <span className="absolute -top-2 left-3 bg-indigo-600 text-[8px] px-2 py-0.5 rounded shadow-lg text-white font-black uppercase tracking-widest border border-indigo-400">
          AI Active
        </span>
      )}
    </div>
  );
};