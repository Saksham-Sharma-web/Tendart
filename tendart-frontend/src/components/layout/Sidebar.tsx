import React from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Search,
  UploadCloud,
  History,
  FileCheck2,
  Building2,
  ChevronRight
} from 'lucide-react';

interface Props {
  activeView: string;
  onNavigate: (view: string) => void;
  selectedTenderId?: string;
  selectedBidId?: string;
}

export const Sidebar: React.FC<Props> = ({
  activeView,
  onNavigate,
  selectedTenderId,
  selectedBidId
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'tenders', label: 'Tenders & Requirements', icon: FileText },
    { id: 'create_tender', label: 'Create New Tender', icon: PlusCircle },
    { id: 'rankings', label: 'Bidder Ranking Board', icon: BarChart3 },
    { id: 'bid_detail', label: 'Bidder Compliance Dossier', icon: Building2, requiresBid: true },
    { id: 'evidence_viewer', label: 'Split Evidence Viewer', icon: Search },
    { id: 'bid_submission', label: 'Vendor Bid Submission', icon: UploadCloud },
    { id: 'audit_trail', label: 'Immutable Audit Trail', icon: History },
    { id: 'compliance_report', label: 'Printable GeM Report', icon: FileCheck2, requiresBid: true }
  ];

  return (
    <aside className="w-64 bg-[#0B192C] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase">Procurement Modules</p>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isBlocked = item.requiresBid && !selectedBidId;

              return (
                <button
                  key={item.id}
                  onClick={() => !isBlocked && onNavigate(item.id)}
                  disabled={isBlocked}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(217,119,6,0.15)]'
                      : isBlocked
                      ? 'opacity-40 text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tender Context Tag */}
        {selectedTenderId && (
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Active Tender Context</p>
            <p className="text-white font-bold mt-1 truncate">GEM/2026/SAFETY/001</p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Industrial Safety Equipment</p>
          </div>
        )}
      </div>

      {/* Tendart Philosophy Footer */}
      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-300">🏛️ Core Principle</p>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
          AI extracts evidence. Rules verify compliance. Government officers decide.
        </p>
      </div>
    </aside>
  );
};
