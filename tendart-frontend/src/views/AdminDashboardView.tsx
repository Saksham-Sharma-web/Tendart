import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Users,
  ShieldCheck,
  Globe,
  Sliders,
  Database,
  Lock,
  Activity,
  Server,
  Cpu,
  History,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Tender, Bid } from '../types';

interface Props {
  tenders?: Tender[];
  bids?: Bid[];
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export const AdminDashboardView: React.FC<Props> = ({
  activeView,
  onNavigate
}) => {
  const activeAdminTab =
    activeView === 'users_roles'
      ? 'users_roles'
      : activeView === 'gov_integrations'
      ? 'gov_integrations'
      : activeView === 'compliance_rules_builder'
      ? 'compliance_rules_builder'
      : activeView === 'system_health'
      ? 'system_health'
      : activeView === 'audit_trail'
      ? 'audit_trail'
      : 'admin_dashboard';

  // Gov API Mock State
  const [apiStatus, setApiStatus] = useState<'LIVE' | 'DEGRADED' | 'OFFLINE'>('LIVE');

  // Rules Engine State
  const [weights, setWeights] = useState({
    statutory: 30,
    financial: 25,
    technical: 25,
    mii: 20
  });

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Clean Admin Header */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#124B7A] uppercase tracking-wider text-[11px]">
            System & Security Admin Console
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#5F6B76] text-xs shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Admin Superuser Mode</span>
        </div>
      </div>

      {activeAdminTab === 'admin_dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card p-5">
            <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Total Tenders Hosted</span>
            <p className="text-2xl font-bold text-[#17212B] mt-2">1,245</p>
            <p className="text-xs text-[#5F6B76] mt-1">Across 85 Departments</p>
          </div>
          <div className="gov-card p-5">
            <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Bids Ingested (24h)</span>
            <p className="text-2xl font-bold text-[#124B7A] mt-2">4,890</p>
            <p className="text-xs text-[#5F6B76] mt-1">AI Verified</p>
          </div>
          <div className="gov-card p-5">
            <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">System API Uptime</span>
            <p className="text-2xl font-bold text-[#16803C] mt-2">99.98%</p>
            <p className="text-xs text-[#5F6B76] mt-1">All Connectors Healthy</p>
          </div>
          <div className="gov-card p-5">
            <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Threat Alerts</span>
            <p className="text-2xl font-bold text-[#C0392B] mt-2">0</p>
            <p className="text-xs text-[#5F6B76] mt-1">System Secure</p>
          </div>
        </div>
      )}

      {activeAdminTab === 'users_roles' && (
        <div className="gov-card p-8 flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <div className="w-16 h-16 bg-[#EBF3FA] text-[#124B7A] rounded-full flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#17212B]">Users & RBAC Management</h2>
          <p className="text-sm text-[#5F6B76] max-w-lg">
            Manage permissions, roles, and organizations across the platform. (UI Hidden for Demo)
          </p>
        </div>
      )}

      {activeAdminTab === 'gov_integrations' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Government API Connectors Sandbox</h1>
              <p className="text-xs text-[#5F6B76] mt-1">Simulate connectivity scenarios for GSTN, CBDT, and Udyam API endpoints.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setApiStatus('LIVE')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${apiStatus === 'LIVE' ? 'bg-[#16803C] text-white' : 'bg-gray-100 text-gray-600'}`}>LIVE (200 OK)</button>
              <button onClick={() => setApiStatus('DEGRADED')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${apiStatus === 'DEGRADED' ? 'bg-[#B7791F] text-white' : 'bg-gray-100 text-gray-600'}`}>DEGRADED (Latency)</button>
              <button onClick={() => setApiStatus('OFFLINE')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${apiStatus === 'OFFLINE' ? 'bg-[#C0392B] text-white' : 'bg-gray-100 text-gray-600'}`}>OFFLINE (503)</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`gov-card p-5 border-l-4 ${apiStatus === 'LIVE' ? 'border-[#16803C]' : apiStatus === 'DEGRADED' ? 'border-[#B7791F]' : 'border-[#C0392B]'}`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17212B]">GSTN Root Gateway</span>
                {apiStatus === 'LIVE' && <CheckCircle2 className="w-5 h-5 text-[#16803C]" />}
                {apiStatus === 'DEGRADED' && <RefreshCw className="w-5 h-5 text-[#B7791F] animate-spin" />}
                {apiStatus === 'OFFLINE' && <AlertTriangle className="w-5 h-5 text-[#C0392B]" />}
              </div>
              <p className="text-xs text-[#5F6B76] mt-2">Latency: {apiStatus === 'LIVE' ? '45ms' : apiStatus === 'DEGRADED' ? '4500ms' : 'Timeout'}</p>
            </div>
            <div className={`gov-card p-5 border-l-4 ${apiStatus === 'LIVE' ? 'border-[#16803C]' : apiStatus === 'DEGRADED' ? 'border-[#B7791F]' : 'border-[#C0392B]'}`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17212B]">CBDT PAN Verification</span>
                {apiStatus === 'LIVE' && <CheckCircle2 className="w-5 h-5 text-[#16803C]" />}
                {apiStatus === 'DEGRADED' && <RefreshCw className="w-5 h-5 text-[#B7791F] animate-spin" />}
                {apiStatus === 'OFFLINE' && <AlertTriangle className="w-5 h-5 text-[#C0392B]" />}
              </div>
              <p className="text-xs text-[#5F6B76] mt-2">Latency: {apiStatus === 'LIVE' ? '60ms' : apiStatus === 'DEGRADED' ? '5100ms' : 'Timeout'}</p>
            </div>
            <div className={`gov-card p-5 border-l-4 ${apiStatus === 'LIVE' ? 'border-[#16803C]' : apiStatus === 'DEGRADED' ? 'border-[#B7791F]' : 'border-[#C0392B]'}`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17212B]">Udyam MSME DB</span>
                {apiStatus === 'LIVE' && <CheckCircle2 className="w-5 h-5 text-[#16803C]" />}
                {apiStatus === 'DEGRADED' && <RefreshCw className="w-5 h-5 text-[#B7791F] animate-spin" />}
                {apiStatus === 'OFFLINE' && <AlertTriangle className="w-5 h-5 text-[#C0392B]" />}
              </div>
              <p className="text-xs text-[#5F6B76] mt-2">Latency: {apiStatus === 'LIVE' ? '30ms' : apiStatus === 'DEGRADED' ? '3800ms' : 'Timeout'}</p>
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'compliance_rules_builder' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">System Scoring Weights Configuration</h1>
            <p className="text-xs text-[#5F6B76] mt-1">Adjust global AI compliance evaluation weights.</p>
          </div>
          
          <div className="gov-card p-8 max-w-2xl mx-auto space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm font-bold text-[#17212B]">
                <span>Statutory Compliance</span>
                <span className="text-[#124B7A]">{weights.statutory}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.statutory} onChange={(e) => setWeights({...weights, statutory: Number(e.target.value)})} className="w-full accent-[#124B7A]" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm font-bold text-[#17212B]">
                <span>Financial Turnover</span>
                <span className="text-[#124B7A]">{weights.financial}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.financial} onChange={(e) => setWeights({...weights, financial: Number(e.target.value)})} className="w-full accent-[#124B7A]" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm font-bold text-[#17212B]">
                <span>Technical & OEM</span>
                <span className="text-[#124B7A]">{weights.technical}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.technical} onChange={(e) => setWeights({...weights, technical: Number(e.target.value)})} className="w-full accent-[#124B7A]" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm font-bold text-[#17212B]">
                <span>Make in India</span>
                <span className="text-[#124B7A]">{weights.mii}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.mii} onChange={(e) => setWeights({...weights, mii: Number(e.target.value)})} className="w-full accent-[#124B7A]" />
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'system_health' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">System Health & OCR Worker Pipeline</h1>
            <p className="text-xs text-[#5F6B76] mt-1">Live metrics of AI extraction jobs and server load.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gov-card p-6 text-center">
              <Server className="w-12 h-12 text-[#124B7A] mx-auto mb-3" />
              <h3 className="font-bold text-[#17212B]">Active OCR Workers</h3>
              <p className="text-3xl font-bold text-[#124B7A] mt-2">48 Nodes</p>
            </div>
            <div className="gov-card p-6 text-center">
              <Activity className="w-12 h-12 text-[#16803C] mx-auto mb-3" />
              <h3 className="font-bold text-[#17212B]">Pending Extraction Jobs</h3>
              <p className="text-3xl font-bold text-[#16803C] mt-2">1,204 Jobs</p>
            </div>
            <div className="gov-card p-6 text-center">
              <Cpu className="w-12 h-12 text-[#B7791F] mx-auto mb-3" />
              <h3 className="font-bold text-[#17212B]">GPU Utilization</h3>
              <p className="text-3xl font-bold text-[#B7791F] mt-2">76% Load</p>
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'audit_trail' && (
        <div className="gov-card p-8 flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <div className="w-16 h-16 bg-[#F6F8FA] text-[#17212B] rounded-full flex items-center justify-center">
            <History className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#17212B]">Global System Audit Ledger</h2>
          <p className="text-sm text-[#5F6B76] max-w-lg">
            A full system-wide cryptographic log is active. (Search & Query UI Hidden for Demo)
          </p>
        </div>
      )}
    </div>
  );
};
