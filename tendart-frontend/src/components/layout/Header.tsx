import React from 'react';
import { Shield, Sparkles, Play, UserCheck, RefreshCw, Layers } from 'lucide-react';

interface Props {
  currentRole: string;
  onRoleChange: (role: string) => void;
  onLoadDemo: () => void;
  onRunPipeline: () => void;
  isProcessing?: boolean;
}

export const Header: React.FC<Props> = ({
  currentRole,
  onRoleChange,
  onLoadDemo,
  onRunPipeline,
  isProcessing = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
      <div className="flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.35)] border border-amber-400/40">
            <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-['Outfit']">TENDART</span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                GeM Procurement AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Smart India Hackathon • Problem Statement 26100</p>
          </div>
        </div>

        {/* Center Live Demo Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onLoadDemo}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-400/30 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-900/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Load GeM Demo Tender</span>
          </button>

          <button
            onClick={onRunPipeline}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border border-amber-400 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-amber-900/40 transition-all cursor-pointer disabled:opacity-50 font-bold"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isProcessing ? 'Processing Pipeline...' : 'Run Live Pipeline'}</span>
          </button>
        </div>

        {/* Right Status & Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-300 font-medium">Adapters Active:</span>
            <span className="text-emerald-400 font-semibold">12 Portals</span>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => onRoleChange('ADMIN')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                currentRole === 'ADMIN'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Procurement Officer
            </button>
            <button
              onClick={() => onRoleChange('REVIEWER')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                currentRole === 'REVIEWER'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reviewer
            </button>
            <button
              onClick={() => onRoleChange('BIDDER')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                currentRole === 'BIDDER'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bidder
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
