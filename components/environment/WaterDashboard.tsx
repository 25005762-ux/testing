"use client";

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { SystemToggle } from './SystemToggle';
import { 
  Droplets, Thermometer, Sun, Power, Zap, Brain, User, 
  Wind, ThermometerSnowflake, Lightbulb, Activity 
} from 'lucide-react';

export default function WaterDashboard() {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [automationLog, setAutomationLog] = useState("System Standby: Monitoring Sensors...");

  // --- Hardware States ---
  const [isPumpActive, setIsPumpActive] = useState(true);
  const [isUVActive, setIsUVActive] = useState(false);
  const [isFanActive, setIsFanActive] = useState(true);
  const [isCO2Active, setIsCO2Active] = useState(false);
  const [isLightActive, setIsLightActive] = useState(true);
  const [isCoolingActive, setIsCoolingActive] = useState(false);

  // --- Sensor Data ---
  const [data, setData] = useState({
    ph: 7.20, // Current high pH (Target: 5.5 - 6.5)
    temp: 24.5,
    humidity: 65,
    ec: 1.8
  });

  // --- AI Automation & Scheduling Logic ---
  useEffect(() => {
    if (!isAutoMode) return;

    const aiBrain = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();

      // 1. SCHEDULE: Grow Light Control (On 6AM - 10PM)
      if (hour >= 22 || hour < 6) {
        if (isLightActive) {
          setIsLightActive(false);
          setAutomationLog("SCHEDULE: Night mode detected. Disabling Grow Lights.");
        }
      } else {
        if (!isLightActive) {
          setIsLightActive(true);
          setAutomationLog("SCHEDULE: Day mode detected. Enabling Grow Lights.");
        }
      }

      // 2. AUTOMATED CORRECTION: pH Dosing Loop
      if (data.ph > 6.50) {
        setAutomationLog("AI ACTION: pH (High) detected. Dosing 'pH Down' stabilizer...");
        setData(prev => ({ ...prev, ph: Number((prev.ph - 0.01).toFixed(2)) }));
      } else if (data.ph < 5.50) {
        setAutomationLog("AI ACTION: pH (Low) detected. Dosing 'pH Up' stabilizer...");
        setData(prev => ({ ...prev, ph: Number((prev.ph + 0.01).toFixed(2)) }));
      }

      // 3. CLIMATE CONTROL: Temperature Regulation
      if (data.temp > 26) {
        setIsCoolingActive(true);
        setAutomationLog("AI ACTION: Temperature critical. Activating Cooling System.");
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(aiBrain);
  }, [isAutoMode, data, isLightActive]);

  const handleModeSwitch = () => {
    const msg = isAutoMode 
      ? "Switch to Manual Mode? All AI corrections and schedules will pause." 
      : "Switch to Auto Mode? AI will take control of dosing and schedules.";
    if (window.confirm(msg)) setIsAutoMode(!isAutoMode);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* AI Mode Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 text-white p-6 rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            AI <span className="text-indigo-400 font-mono italic">Manager</span>
          </h1>
          <p className="text-slate-500 text-xs tracking-widest font-bold uppercase">Member 3 • AgriNexus HydroAI+</p>
        </div>
        <button 
          onClick={handleModeSwitch}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all transform active:scale-95 ${
            isAutoMode ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-amber-500 shadow-lg shadow-amber-500/20'
          }`}
        >
          {isAutoMode ? <Brain size={18} /> : <User size={18} />}
          <span className="text-sm">{isAutoMode ? "AI AUTO ACTIVE" : "MANUAL OVERRIDE"}</span>
        </button>
      </div>

      {/* AI Activity Log */}
      <div className="bg-slate-900/80 border border-indigo-500/30 p-4 rounded-xl flex items-center gap-3">
        <Activity size={16} className="text-indigo-400 animate-pulse" />
        <span className="text-xs font-mono text-indigo-300">LOG: {automationLog}</span>
      </div>

      {/* Monitoring Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="pH Level" value={data.ph} unit="pH" min={5.5} max={6.5} icon={Droplets} color="text-blue-400" />
        <MetricCard title="Air Temp" value={data.temp} unit="°C" min={18} max={26} icon={Thermometer} color="text-orange-400" />
        <MetricCard title="Humidity" value={data.humidity} unit="%" min={40} max={70} icon={Sun} color="text-yellow-400" />
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SystemToggle label="Grow Lights" isActive={isLightActive} isAutoMode={isAutoMode} icon={Lightbulb} onClick={() => setIsLightActive(!isLightActive)} />
        <SystemToggle label="Circulation Fan" isActive={isFanActive} isAutoMode={isAutoMode} icon={Wind} onClick={() => setIsFanActive(!isFanActive)} />
        <SystemToggle label="Cooling System" isActive={isCoolingActive} isAutoMode={isAutoMode} icon={ThermometerSnowflake} onClick={() => setIsCoolingActive(!isCoolingActive)} />
        <SystemToggle label="CO2 Injector" isActive={isCO2Active} isAutoMode={isAutoMode} icon={Brain} onClick={() => setIsCO2Active(!isCO2Active)} />
        <SystemToggle label="Main Pump" isActive={isPumpActive} isAutoMode={isAutoMode} icon={Power} onClick={() => setIsPumpActive(!isPumpActive)} />
        <SystemToggle label="UV Sterilizer" isActive={isUVActive} isAutoMode={isAutoMode} icon={Sun} onClick={() => setIsUVActive(!isUVActive)} />
      </div>
    </div>
  );
}