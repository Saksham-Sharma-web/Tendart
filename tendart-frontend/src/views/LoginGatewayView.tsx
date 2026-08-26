import React from 'react';
import {
  Shield,
  User,
  Landmark,
  Settings,
  ArrowRight,
  Lock,
  Eye
} from 'lucide-react';

interface Props {
  onSelectRole: (role: string) => void;
  onLoadDemo: () => void;
}

export const LoginGatewayView: React.FC<Props> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'BIDDER',
      title: 'Bidders',
      subtitle: 'Vendor Proposal Filing & AI Pre-Check',
      desc: 'Explore published tenders feed, review mandatory specifications, test compliance with automated AI pre-flight checks, and submit encrypted proposals to GeM.',
      icon: User,
      badge: 'Vendor Portal',
      demoUser: 'Bharat Tactical & Safety Gear Pvt Ltd'
    },
    {
      id: 'TENDERER',
      title: 'Tender Authority',
      subtitle: 'Tender Creation & Specification Editor',
      desc: 'Create new tenders, specify compliance rules, upload tender PDFs for AI extraction, and monitor submitted bids across active tenders.',
      icon: Settings,
      badge: 'Tender Management',
      demoUser: 'Chennai Petroleum Corp Ltd (CPCL Tendering)'
    },
    {
      id: 'OFFICER',
      title: 'Procurement Officer',
      subtitle: 'Government Decision-Support Hub',
      desc: 'Verify bidder compliance, cross-check multi-source government registries (GSTN/CBDT/Udyam), inspect OCR evidence, and record legally binding qualification decisions.',
      icon: Landmark,
      badge: 'Decision Authority',
      demoUser: 'Shri R. K. Sharma (Joint Director, GeM)'
    },
    {
      id: 'ADMIN',
      title: 'System & Security Admin',
      subtitle: 'Platform Governance & API Management',
      desc: 'Manage users and RBAC, configure government registry APIs, monitor system health, define compliance rules, and inspect cryptographic audit logs.',
      icon: Shield,
      badge: 'System Control',
      demoUser: 'National Informatics Centre (NIC Admin)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#17212B] flex flex-col justify-between p-6 lg:p-10 font-sans">
      {/* Top Government Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#E1E6EA] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#124B7A] text-white flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#17212B]">TENDART</span>
              <span className="text-xs font-semibold bg-[#EBF3FA] text-[#124B7A] border border-[#D0E2F2] px-2 py-0.5 rounded">
                GeM AI Portal
              </span>
            </div>
            <p className="text-xs text-[#5F6B76]">
              Government of India • Ministry of Commerce & Industry (SIH PS 26100)
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[#5F6B76] text-xs bg-[#FFFFFF] border border-[#E1E6EA] px-3 py-1.5 rounded-md shadow-xs">
          <Lock className="w-3.5 h-3.5 text-[#16803C]" />
          <span>256-Bit SSL Secured Government System</span>
        </div>
      </div>

      {/* Center Welcome Header */}
      <div className="max-w-6xl mx-auto w-full py-8 text-center space-y-2">
        <span className="text-xs font-bold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-3 py-1 rounded-full">
          Single Sign-On (SSO) Portal Gateway
        </span>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#17212B] tracking-tight">
          AI-Powered Bid Compliance Verification Platform
        </h1>
        <p className="text-sm text-[#5F6B76] max-w-2xl mx-auto">
          Please select your authorized portal below to enter your dedicated operational workspace.
        </p>
      </div>

      {/* The 4 Primary Portal Login Cards */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="gov-card p-6 flex flex-col justify-between space-y-5 cursor-pointer hover:border-[#124B7A] hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-md bg-[#EBF3FA] text-[#124B7A] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded-full">
                    {role.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#17212B]">{role.title}</h2>
                  <p className="text-xs text-[#124B7A] font-medium mt-0.5">{role.subtitle}</p>
                  <p className="text-sm text-[#5F6B76] mt-2 leading-relaxed">{role.desc}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEFF3] flex items-center justify-between">
                <div className="text-xs text-[#5F6B76]">
                  <span>Demo Account: </span>
                  <strong className="text-[#17212B]">{role.demoUser}</strong>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRole(role.id);
                  }}
                  className="gov-btn-primary h-9 px-4 text-xs flex items-center gap-1.5"
                >
                  <span>Login as {role.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional Footer */}
      <div className="max-w-6xl mx-auto w-full pt-6 border-t border-[#E1E6EA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6B76]">
        <div>
          <span>Smart India Hackathon • Problem Statement 26100 • GeM AI Compliance Platform</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Confidentiality: Strict Enterprise Multi-Tenant Isolation</span>
        </div>
      </div>
    </div>
  );
};
