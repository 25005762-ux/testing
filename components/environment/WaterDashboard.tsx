"use client";

import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import { SystemToggle } from './SystemToggle';
import { Droplets, Thermometer, Sun, Waves, Activity, Power, Zap, Brain, User } from 'lucide-react';

export default function WaterDashboard() {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isPumpActive, setIsPumpActive] = useState(true);
  const [isUVActive, setIsUVActive] = useState(false);
  
  const [data] = useState({
    ph: 7.2,
    ec: 1.8,
    waterLevel: 85,
    temp: 24.5,
    humidity: 65
  });

  const getAdvice = () => {
    if (data.ph > 7.5) return "pH too high → dose acid (pH Down)";
    if (data.waterLevel < 20) return "Low water level → refill reservoir needed";
    return "All systems optimal. Stabilizing conditions...";
  };

  const handleModeSwitch = () => {
    const msg = isAutoMode ? "Switch to Manual Mode? Automation rules will pause." : "Switch to Auto Mode? AI will take control.";
    if (window.confirm(msg)) setIsAutoMode(!isAutoMode);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans pt-10">
      {/* --- THIS IS THE MODE SWITCHER HEADER --- */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-6 rounded-3xl shadow-xl border-b-4 border-indigo-500">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            AgriNexus <span className="text-indigo-400 italic">HydroAI+</span>
          </h1>
          <p className="text-slate-400 text-sm">System Control Panel • Member 3</p>
        </div>
        <button 
          onClick={handleModeSwitch}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${
            isAutoMode ? 'bg-indigo-600 shadow-indigo-500/50 shadow-lg' : 'bg-amber-500 shadow-amber-500/50 shadow-lg'
          }`}
        >
          {isAutoMode ? <Brain size={20} /> : <User size={20} />}
          {isAutoMode ? "AUTO MODE ACTIVE" : "MANUAL MODE ACTIVE"}
        </button>
      </div>

      {/* Smart Advice Banner */}
      <div className={`p-4 rounded-xl border flex items-center gap-3 ${
        data.ph <= 7.5 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'
      }`}>
        <Zap size={18} className="animate-bounce" />
        <span className="font-medium text-sm italic">Status Update: {getAdvice()}</span>
      </div>

      {/* Water Monitoring Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-2">
          <Waves size={14} /> Water Health Monitor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="pH Level" value={data.ph} unit="pH" min={5.5} max={6.5} icon={Droplets} color="text-blue-500" />
          <MetricCard title="Nutrient (EC)" value={data.ec} unit="mS/cm" min={1.2} max={2.0} icon={Activity} color="text-indigo-500" />
          <MetricCard title="Water Level" value={data.waterLevel} unit="%" min={30} max={100} icon={Waves} color="text-cyan-500" />
        </div>
      </section>

      {/* Environment & Device Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-2">
          <Sun size={14} /> Climate & Device Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard title="Water Temp" value={data.temp} unit="°C" min={18} max={26} icon={Thermometer} color="text-orange-500" />
          <MetricCard title="Humidity" value={data.humidity} unit="%" min={40} max={70} icon={Sun} color="text-yellow-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SystemToggle label="Main Pump" isActive={isPumpActive} isAutoMode={isAutoMode} icon={Power} onClick={() => setIsPumpActive(!isPumpActive)} />
          <SystemToggle label="UV Lights" isActive={isUVActive} isAutoMode={isAutoMode} icon={Sun} onClick={() => setIsUVActive(!isUVActive)} />
          <SystemToggle label="Circulation Fan" isActive={true} isAutoMode={isAutoMode} icon={Zap} onClick={() => {}} />
          <SystemToggle label="CO2 Injector" isActive={false} isAutoMode={isAutoMode} icon={Brain} onClick={() => {}} />
        </div>
      </section>
    </div>
  );
}