"use client";

import { LucideIcon } from 'lucide-react';

interface ToggleProps {
  label: string;
  isActive: boolean;
  isAutoMode: boolean;
  icon: LucideIcon;
  onClick: () => void;
}

export const SystemToggle = ({ label, isActive, isAutoMode, icon: Icon, onClick }: ToggleProps) => {
  return (
    <div className="relative group">
      <button 
        disabled={isAutoMode}
        onClick={onClick}
        className={`flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-300 ${
          isAutoMode ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200' :
          isActive ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 
          'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive && !isAutoMode ? 'text-green-600' : 'text-slate-400'} />
          <span className="font-bold text-sm">{label}</span>
        </div>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? 'bg-green-500' : 'bg-slate-200'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isActive ? 'right-1' : 'left-1'}`} />
        </div>
      </button>
      
      {isAutoMode && (
        <span className="absolute -top-2 left-4 bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-md">
          AI Auto
        </span>
      )}
    </div>
  );
};