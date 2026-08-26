import React from 'react';
import { Shield, User, Landmark, Settings, Eye, ArrowLeftRight } from 'lucide-react';

interface Props {
  currentRole: string;
  onRoleChange: (role: string) => void;
  onLogout: () => void;
  onLoadDemo?: () => void;
  onRunPipeline?: () => void;
  isProcessing?: boolean;
}

export const Header: React.FC<Props> = ({
  currentRole,
  onLogout
}) => {
  const getRoleMetadata = () => {
    switch (currentRole) {
      case 'BIDDER':
        return {
          title: 'Bidders',
          account: 'Bharat Tactical & Safety Gear Pvt Ltd',
          icon: User,
          badgeColor: 'bg-[#EBF6EE] text-[#16803C] border-[#CEEBD5]'
        };
      case 'ADMIN':
        return {
          title: 'System & Security Admin',
          account: 'NIC / MeitY Infrastructure Admin',
          icon: Shield,
          badgeColor: 'bg-[#F4EFFB] text-[#6B46C1] border-[#E2D9F3]'
        };
      case 'TENDERER':
        return {
          title: 'Tender Authority',
          account: 'Chennai Petroleum Corp Ltd (CPCL Tendering)',
          icon: Settings,
          badgeColor: 'bg-[#FEF8EC] text-[#B7791F] border-[#FCE6BE]'
        };
      case 'OFFICER':
      default:
        return {
          title: 'Procurement Officer',
          account: 'Shri R. K. Sharma (Joint Director, GeM)',
          icon: Landmark,
          badgeColor: 'bg-[#EBF3FA] text-[#124B7A] border-[#D0E2F2]'
        };
    }
  };

  const meta = getRoleMetadata();
  const Icon = meta.icon;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E1E6EA] px-6 lg:px-8 h-16 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left Branding */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-[#124B7A] text-white flex items-center justify-center shadow-sm">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-[#17212B]">TENDART</span>
            <span className="text-[11px] font-semibold bg-[#EBF3FA] text-[#124B7A] border border-[#D0E2F2] px-2 py-0.5 rounded">
              GeM AI Portal
            </span>
          </div>
          <p className="text-xs text-[#5F6B76] hidden sm:block">
            Government of India • Ministry of Commerce & Industry (SIH 26100)
          </p>
        </div>
      </div>

      {/* Right Logged-in Identity & Switch Portal Button */}
      <div className="flex items-center gap-3">
        {/* Active Account Identity Card */}
        <div className="hidden sm:flex items-center gap-2.5 bg-[#F6F8FA] border border-[#E1E6EA] px-3 py-1.5 rounded-md">
          <div className="w-7 h-7 rounded bg-[#EBF3FA] text-[#124B7A] flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#17212B]">{meta.title}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${meta.badgeColor}`}>
                Active Session
              </span>
            </div>
            <p className="text-[11px] text-[#5F6B76] truncate max-w-[220px]">{meta.account}</p>
          </div>
        </div>

        {/* Switch Portal Button */}
        <button
          onClick={onLogout}
          className="gov-btn-secondary h-9 px-3.5 text-xs flex items-center gap-1.5"
          title="Return to Portal Selection Gateway"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Switch Portal</span>
        </button>
      </div>
    </header>
  );
};
