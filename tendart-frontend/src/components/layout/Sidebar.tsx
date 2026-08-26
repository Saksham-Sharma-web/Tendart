import React from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  UploadCloud,
  History,
  Settings,
  Building,
  ShieldCheck
} from 'lucide-react';

interface Props {
  activeView: string;
  onNavigate: (view: string) => void;
  selectedTenderId?: string;
  selectedBidId?: string;
  currentRole?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export const Sidebar: React.FC<Props> = ({
  activeView,
  onNavigate,
  selectedTenderId,
  currentRole = 'OFFICER'
}) => {
  // Role 1: Tendering Authority
  const tendererNavItems: NavItem[] = [
    { id: 'tenderer_dashboard', label: 'Tender Overview', icon: Building },
    { id: 'tenders', label: 'Tender Rules Checklist', icon: FileText },
    { id: 'create_tender', label: 'Create / Upload Tender', icon: PlusCircle }
  ];

  // Role 2: Bidder / Vendor
  const bidderNavItems: NavItem[] = [
    { id: 'bidder_dashboard', label: 'My Bids & Documents', icon: LayoutDashboard },
    { id: 'bid_submission', label: 'Upload Bid Proposal', icon: UploadCloud },
    { id: 'tenders', label: 'View Tender Criteria', icon: FileText }
  ];

  // Role 3: Procurement Officer
  const officerNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'rankings', label: 'Bidder Evaluation Matrix', icon: BarChart3 },
    { id: 'audit_trail', label: 'System Audit Trail', icon: History }
  ];

  // Role 4: System Admin
  const adminNavItems: NavItem[] = [
    { id: 'gov_sandbox', label: 'Registry Connectors & Sandbox', icon: Settings },
    { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
    { id: 'audit_trail', label: 'System Logs', icon: History }
  ];

  // Role 5: Auditor
  const auditorNavItems: NavItem[] = [
    { id: 'audit_trail', label: 'Forensic Audit Trail', icon: History },
    { id: 'rankings', label: 'Evaluation Matrix', icon: BarChart3 }
  ];

  const navItems =
    currentRole === 'TENDERER'
      ? tendererNavItems
      : currentRole === 'BIDDER'
      ? bidderNavItems
      : currentRole === 'ADMIN'
      ? adminNavItems
      : currentRole === 'AUDITOR'
      ? auditorNavItems
      : officerNavItems;

  const roleLabel =
    currentRole === 'TENDERER'
      ? 'Tendering Authority'
      : currentRole === 'BIDDER'
      ? 'Vendor Workspace'
      : currentRole === 'ADMIN'
      ? 'System Admin'
      : currentRole === 'AUDITOR'
      ? 'Vigilance & Audit'
      : 'Procurement Officer';

  return (
    <aside className="w-60 bg-[#FFFFFF] border-r border-[#E1E6EA] flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-64px)]">
      <div className="space-y-4">
        <div>
          <p className="px-3 text-[11px] font-bold text-[#5F6B76] uppercase tracking-wider">
            {roleLabel}
          </p>

          <nav className="mt-2.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EBF3FA] text-[#124B7A] font-semibold border-l-3 border-[#124B7A]'
                      : 'text-[#5F6B76] hover:text-[#17212B] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#124B7A]' : 'text-[#8A949E]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Tender Context Box */}
        {selectedTenderId && (
          <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] text-xs">
            <p className="text-[10px] uppercase font-bold text-[#124B7A] tracking-wider">Active Tender</p>
            <p className="text-[#17212B] font-bold mt-1 truncate">GEM/2026/B/891240</p>
            <p className="text-[#5F6B76] mt-0.5 truncate text-[11px]">Industrial Safety Gear</p>
          </div>
        )}
      </div>

      {/* Institutional Legal Footer */}
      <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] text-xs space-y-1">
        <p className="font-semibold text-[#17212B] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Decision Authority</span>
        </p>
        <p className="text-[11px] leading-relaxed text-[#5F6B76]">
          AI assists verification; the Procurement Officer makes the legal qualification decision.
        </p>
      </div>
    </aside>
  );
};
