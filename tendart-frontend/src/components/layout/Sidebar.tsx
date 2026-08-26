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
  ShieldCheck,
  Search,
  FolderLock,
  UserCheck,
  Sparkles,
  Inbox,
  ArrowLeft,
  CheckCircle2,
  Users,
  Globe
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
    { id: 'tenderer_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tenders', label: 'All Tenders', icon: Building },
    { id: 'create_tender', label: 'Create Tender', icon: PlusCircle }
  ];

  // Role 2: Bidder / Vendor Navigation
  // If NO tender selected -> Discovery & Global Tools
  const bidderDiscoveryItems: NavItem[] = [
    { id: 'bidder_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tenders_browse', label: 'Browse Tenders', icon: Search },
    { id: 'my_bids', label: 'My Bids', icon: FileText },
    { id: 'bidder_vault', label: 'Document Vault', icon: FolderLock },
    { id: 'compliance_center', label: 'Compliance Center', icon: Sparkles },
    { id: 'bidder_profile', label: 'Company Profile', icon: UserCheck }
  ];

  // If a tender IS selected -> Contextual Tender Bidding Actions
  const bidderTenderContextItems: NavItem[] = [
    { id: 'tender_criteria', label: '1. Tender Criteria & Rules', icon: FileText },
    { id: 'tender_vault_map', label: '2. Required Documents', icon: FolderLock },
    { id: 'tender_pre_check', label: '3. AI Pre-Flight Check', icon: Sparkles },
    { id: 'bid_submission', label: '4. Prepare & Submit Bid', icon: UploadCloud },
    { id: 'tender_my_bid', label: '5. My Bid Submission Status', icon: ShieldCheck },
    { id: 'tender_clarifications', label: '6. Clarifications Inbox', icon: Inbox }
  ];

  // Role 3: Procurement Officer
  const officerNavItems: NavItem[] = [
    { id: 'officer_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tenders_assigned', label: 'My Assigned Tenders', icon: FileText },
    { id: 'bidders_eval', label: 'Bidders', icon: Users },
    { id: 'compliance_verify', label: 'Compliance Overview', icon: Sparkles },
    { id: 'action_center', label: 'Action Center', icon: Inbox },
    { id: 'rankings', label: 'Evaluation Matrix', icon: BarChart3 }
  ];

  // Role 4: System Admin
  const adminNavItems: NavItem[] = [
    { id: 'admin_dashboard', label: 'System Dashboard', icon: LayoutDashboard },
    { id: 'users_roles', label: 'Users & Roles', icon: Users },
    { id: 'gov_integrations', label: 'Government Integrations', icon: Globe },
    { id: 'compliance_rules_builder', label: 'Compliance Rule Builder', icon: Settings },
    { id: 'system_health', label: 'System Health', icon: ShieldCheck },
    { id: 'audit_trail', label: 'Cryptographic Audit Trail', icon: History }
  ];

  // Determine active nav items for current role
  let navItems: NavItem[];
  if (currentRole === 'TENDERER') {
    navItems = tendererNavItems;
  } else if (currentRole === 'BIDDER') {
    navItems = selectedTenderId ? bidderTenderContextItems : bidderDiscoveryItems;
  } else if (currentRole === 'ADMIN') {
    navItems = adminNavItems;
  } else {
    navItems = officerNavItems;
  }

  const roleLabel =
    currentRole === 'BIDDER'
      ? 'Bidders'
      : currentRole === 'ADMIN'
      ? 'System Admin'
      : currentRole === 'TENDERER'
      ? 'Tender Authority'
      : 'Procurement Officer';

  return (
    <aside className="w-60 bg-[#FFFFFF] border-r border-[#E1E6EA] flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-64px)]">
      <div className="space-y-4">
        {/* Role & Context Heading */}
        <div>
          <div className="px-3">
            <p className="text-[11px] font-bold text-[#5F6B76] uppercase tracking-wider">
              {roleLabel}
            </p>
          </div>

          <nav className="mt-2.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id || (item.id === 'bidder_dashboard' && activeView === 'bidder_dashboard');

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EBF3FA] text-[#124B7A] font-semibold border-l-3 border-[#124B7A]'
                      : 'text-[#5F6B76] hover:text-[#17212B] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#124B7A]' : 'text-[#8A949E]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

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
