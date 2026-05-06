"use client";

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { SystemToggle } from './SystemToggle';
import { Droplets, Thermometer, Sun, Waves, Activity, Power, Zap, Brain, User } from 'lucide-react';

export default function WaterDashboard() {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isPumpActive, setIsPumpActive] = useState(true);
  const [isUVActive, setIsUVActive] = useState(false);
  
  // Simulated Live Data
  const [data, setData] = useState({
    ph: 7.2,
    ec: 1.8,
    waterLevel: 85,
    temp: 24.5,
    humidity: 65
  });

  const getAdvice = () => {
    if (data.ph > 7.5) return "pH too high → dose acid (pH Down)";
    if (data.waterLevel < 20) return "Low water level → refill reservoir needed";
    if (data.humidity > 80) return "High humidity → risk of mold, start fans";
    return "All systems optimal. Stabilizing conditions...";
  };

  const handleModeSwitch = () => {
    const msg = isAutoMode ? "Switch to Manual? Automation rules will stop." : "Switch to Auto? AI will override controls.";
    if (window.confirm(msg)) setIsAutoMode(!isAutoMode);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 font-sans">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            AgriNexus <span className="text-indigo-400 italic">HydroAI+</span>
          </h1>
          <p className="text-slate-400 text-sm">Member 3: Environment Control System</p>
        </div>
        <button 
          onClick={handleModeSwitch}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            isAutoMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-amber-500 hover:bg-amber-400'
          }`}
        >
          {isAutoMode ? <Brain size={20} /> : <User size={20} />}
          {isAutoMode ? "AUTO MODE ACTIVE" : "MANUAL MODE ACTIVE"}
        </button>
      </div>

      {/* Smart Advice Banner */}
      <div className={`p-4 rounded-xl border flex items-center gap-3 ${
        getAdvice().includes('✅') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'
      }`}>
        <Zap size={18} />
        <span className="font-medium text-sm">System Note: {getAdvice()}</span>
      </div>

      {/* 1. Water Dashboard (pH, EC, Level) */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Waves size={14} /> Water Health Monitor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="pH Level" value={data.ph} unit="pH" min={5.5} max={6.5} icon={Droplets} color="text-blue-500" />
          <MetricCard title="Nutrient (EC)" value={data.ec} unit="mS/cm" min={1.2} max={2.0} icon={Activity} color="text-indigo-500" />
          <MetricCard title="Water Level" value={data.waterLevel} unit="%" min={30} max={100} icon={Waves} color="text-cyan-500" />
        </div>
      </section>

      {/* 2. Environment Controls (Temp, Humidity, Devices) */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Sun size={14} /> Climate Control Center
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard title="Water Temp" value={data.temp} unit="°C" min={18} max={26} icon={Thermometer} color="text-orange-500" />
          <MetricCard title="Humidity" value={data.humidity} unit="%" min={40} max={70} icon={Sun} color="text-yellow-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <SystemToggle label="Main Pump" isActive={isPumpActive} isAutoMode={isAutoMode} icon={Power} onClick={() => setIsPumpActive(!isPumpActive)} />
          <SystemToggle label="UV Lights" isActive={isUVActive} isAutoMode={isAutoMode} icon={Sun} onClick={() => setIsUVActive(!isUVActive)} />
          <SystemToggle label="Circulation Fan" isActive={true} isAutoMode={isAutoMode} icon={Zap} onClick={() => {}} />
          <SystemToggle label="CO2 Injector" isActive={false} isAutoMode={isAutoMode} icon={Brain} onClick={() => {}} />
        </div>
      </section>
    </div>
  );
}