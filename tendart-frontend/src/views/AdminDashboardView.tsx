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
  Cpu
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    | 'overview'
    | 'users_roles'
    | 'gov_integrations'
    | 'rule_builder'
    | 'ai_config'
    | 'mock_data'
    | 'system_health'
  >('overview');

  const [systemStats] = useState({
    totalUsers: '12,482',
    organizations: '126',
    activeTenders: '428',
    activeBids: '3,842',
    apiUptime: '98.9%',
    automationRate: '84%',
    docsProcessed: '1,284,932'
  });

  const [usersList] = useState([
    { id: 'USR-01', name: 'Shri R. K. Sharma', email: 'rk.sharma@gem.gov.in', role: 'PROCUREMENT_OFFICER', org: 'GeM Procurement Div', status: 'ACTIVE', mfa: 'ENABLED', lastLogin: 'Today 18:40' },
    { id: 'USR-02', name: 'Vikramaditya Malhotra', email: 'tenders@bharattactical.in', role: 'BIDDER', org: 'Bharat Tactical Gear Pvt Ltd', status: 'ACTIVE', mfa: 'ENABLED', lastLogin: 'Today 18:24' },
    { id: 'USR-03', name: 'Dr. S. K. Narayanan', email: 'procurement@cpcl.co.in', role: 'TENDERER', org: 'Chennai Petroleum Corp Ltd', status: 'ACTIVE', mfa: 'ENABLED', lastLogin: 'Today 17:15' },
    { id: 'USR-04', name: 'Vigilance Directorate', email: 'audit@cag.gov.in', role: 'AUDITOR', org: 'Comptroller & Auditor General', status: 'ACTIVE', mfa: 'ENABLED', lastLogin: 'Yesterday 14:10' },
    { id: 'USR-05', name: 'System Administrator', email: 'admin@tendart.nic.in', role: 'SYSTEM_ADMIN', org: 'NIC / MeitY Infrastructure', status: 'ACTIVE', mfa: 'ENABLED', lastLogin: 'Now' }
  ]);

  const [connectors, setConnectors] = useState([
    { id: 'gstn', name: 'GSTN Central Portal (GST System)', protocol: 'REST / e-Invoice API v2.1', status: 'ONLINE', latency: '118 ms', reliability: '99.9%', records: '1.4M Entities' },
    { id: 'cbdt', name: 'CBDT PAN & Income Tax Database', protocol: 'PAN Verification Service v3.0', status: 'ONLINE', latency: '84 ms', reliability: '99.8%', records: '850K PANs' },
    { id: 'udyam', name: 'Ministry of MSME (Udyam Portal)', protocol: 'MSME SAMADHAAN API v1.4', status: 'ONLINE', latency: '142 ms', reliability: '99.5%', records: '2.1M MSMEs' },
    { id: 'cppp', name: 'CPPP Central Debarment / Blacklist', protocol: 'National Vigilance Registry', status: 'ONLINE', latency: '62 ms', reliability: '100%', records: '12.4K Debarred' },
    { id: 'epfo', name: 'EPFO Electronic Challan System', protocol: 'EPFO Shram Suvidha API', status: 'ONLINE', latency: '165 ms', reliability: '98.9%', records: '620K Employers' },
    { id: 'digilocker', name: 'DigiLocker Document Verification', protocol: 'e-Sign & Digital Asset API v2', status: 'ONLINE', latency: '190 ms', reliability: '99.7%', records: 'Issued Certs' }
  ]);

  const [aiThresholds] = useState({
    autoVerify: 95,
    reviewRequired: 80,
    manualVerification: 70
  });

  const [weights, setWeights] = useState({
    statutory: 30,
    financial: 25,
    technical: 25,
    document: 10,
    localContent: 10
  });

  const [mockGstRecords] = useState([
    { gstin: '07AABCB1234F1Z5', entity: 'Bharat Tactical and Safety Gear Private Limited', status: 'ACTIVE', address: 'Plot 14, Okhla Phase-III, New Delhi', type: 'Regular Taxpayer' },
    { gstin: '33AABCS8891G1Z2', entity: 'Surya Infotech & Defense Solutions Pvt Ltd', status: 'ACTIVE', address: 'Chennai Industrial Corridor, Tamil Nadu', type: 'Regular Taxpayer' },
    { gstin: '27AAACZ4455E1Z9', entity: 'Zenith Trade & Logistics LLP', status: 'SUSPENDED', address: 'Bandra Kurla Complex, Mumbai', type: 'Cancelled GST' },
    { gstin: '06AABCA9911D1Z8', entity: 'Apex Global Protective Solutions Ltd', status: 'ACTIVE', address: 'Gurugram Cyber Hub, Haryana', type: 'Regular Taxpayer' }
  ]);

  const toggleConnectorStatus = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'ONLINE' ? 'OFFLINE' : c.status === 'OFFLINE' ? 'DEGRADED' : 'ONLINE';
          return {
            ...c,
            status: nextStatus,
            latency: nextStatus === 'OFFLINE' ? 'TIMEOUT (503)' : nextStatus === 'DEGRADED' ? '820 ms' : '110 ms'
          };
        }
        return c;
      })
    );
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Admin Sub-Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-sm overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'overview'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Platform Overview</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('users_roles')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'users_roles'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Users & RBAC Matrix</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('gov_integrations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'gov_integrations'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>3. Government Connectors</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('rule_builder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'rule_builder'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>4. Rule Engine & Weights</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('ai_config')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'ai_config'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>5. AI Engine & Thresholds</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('mock_data')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'mock_data'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>6. Mock Datasets</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('system_health')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeAdminTab === 'system_health'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>7. System Health</span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[#5F6B76] text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Admin Root Authority: Active</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PLATFORM OVERVIEW */}
      {/* ========================================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="gov-card p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                  System Administration
                </span>
                <span className="text-xs text-[#5F6B76]">Tendart Infrastructure</span>
              </div>
              <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">
                Platform Control & Governance Center
              </h1>
              <p className="text-sm text-[#5F6B76]">
                Manage global users, authorized government API adapters, compliance scoring formulas, and infrastructure health.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-md bg-[#EBF6EE] text-[#16803C] border border-[#CEEBD5] text-xs font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#16803C]" />
                <span>All Systems Operational (98.9%)</span>
              </span>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Registered Users</span>
              <p className="text-2xl font-bold text-[#17212B] mt-2">{systemStats.totalUsers}</p>
              <p className="text-xs text-[#5F6B76] mt-1">Across 126 Organizations</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Tenders</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-2">{systemStats.activeTenders}</p>
              <p className="text-xs text-[#5F6B76] mt-1">Published on GeM Network</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Total Bids Processed</span>
              <p className="text-2xl font-bold text-[#16803C] mt-2">{systemStats.activeBids}</p>
              <p className="text-xs text-[#5F6B76] mt-1">84% Automated Extraction</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Document Vault Scale</span>
              <p className="text-2xl font-bold text-[#B7791F] mt-2">1.28 Million</p>
              <p className="text-xs text-[#5F6B76] mt-1">Encrypted with SHA-256</p>
            </div>
          </div>

          {/* System Services Health Matrix */}
          <div className="gov-card p-6 space-y-3">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2 border-b border-[#E1E6EA] pb-3">
              <Server className="w-4 h-4 text-[#124B7A]" />
              <span>Core Microservice Architecture & Health</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17212B]">Government API Mesh</span>
                  <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.2 rounded">99.2% Uptime</span>
                </div>
                <p className="text-[#5F6B76]">GSTN, CBDT, Udyam, EPFO, CPPP registries synced</p>
              </div>

              <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17212B]">AI OCR & Parsing Engine</span>
                  <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.2 rounded">Operational</span>
                </div>
                <p className="text-[#5F6B76]">PyMuPDF vector parser & token normalization</p>
              </div>

              <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17212B]">Immutable Audit Ledger</span>
                  <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.2 rounded">Healthy</span>
                </div>
                <p className="text-[#5F6B76]">Zero data tampering detected • SHA-256 verified</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. USERS & RBAC PERMISSION MATRIX */}
      {/* ========================================================================= */}
      {activeAdminTab === 'users_roles' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">User Directory & Role Permissions (RBAC)</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Manage user identities, MFA enforcement, and access boundaries</p>
            </div>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>User / Official Name</th>
                  <th>Organization</th>
                  <th>Assigned Role</th>
                  <th>Status</th>
                  <th>MFA Security</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div>
                        <p className="font-semibold text-[#17212B]">{u.name}</p>
                        <p className="text-xs text-[#5F6B76] mt-0.5">{u.email}</p>
                      </div>
                    </td>
                    <td><span className="text-xs text-[#5F6B76]">{u.org}</span></td>
                    <td>
                      <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2 py-0.5 rounded border border-[#D0E2F2]">
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">
                        ● {u.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-[#5F6B76] flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#16803C]" />
                        <span>{u.mfa}</span>
                      </span>
                    </td>
                    <td><span className="text-xs text-[#5F6B76] font-mono">{u.lastLogin}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GOVERNMENT CONNECTORS & SANDBOX */}
      {/* ========================================================================= */}
      {activeAdminTab === 'gov_integrations' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Authorized Government Registry Adapters</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Live authorized government connectors with latency injection and 503 fallback simulation</p>
          </div>

          <div className="space-y-3">
            {connectors.map((c) => (
              <div
                key={c.id}
                className="gov-card p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-[#EBF3FA] text-[#124B7A] shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#17212B]">{c.name}</h3>
                    <p className="text-xs text-[#5F6B76]">{c.protocol} • Mock Pool: {c.records}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-[#5F6B76]">
                      <span>Latency: <strong className="text-[#17212B]">{c.latency}</strong></span>
                      <span>•</span>
                      <span>Uptime: <strong className="text-[#16803C]">{c.reliability}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnectorStatus(c.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                    c.status === 'ONLINE'
                      ? 'bg-[#EBF6EE] text-[#16803C] border-[#CEEBD5]'
                      : c.status === 'DEGRADED'
                      ? 'bg-[#FEF8EC] text-[#B7791F] border-[#FCE6BE]'
                      : 'bg-[#FDF2F1] text-[#C0392B] border-[#FACDC9]'
                  }`}
                >
                  {c.status === 'ONLINE' && '● Live 200 OK'}
                  {c.status === 'DEGRADED' && '▲ Degraded'}
                  {c.status === 'OFFLINE' && '✕ Offline (503)'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RULE BUILDER & COMPLIANCE WEIGHTS */}
      {/* ========================================================================= */}
      {activeAdminTab === 'rule_builder' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Compliance Scoring Formula & Rule Weights</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Configure global mathematical weightages across evaluation categories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 gov-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                <span className="text-xs font-semibold text-[#5F6B76]">Total Formula Sum</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${totalWeight === 100 ? 'bg-[#EBF6EE] text-[#16803C] border border-[#CEEBD5]' : 'bg-[#FDF2F1] text-[#C0392B] border border-[#FACDC9]'}`}>
                  {totalWeight} / 100%
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-[#17212B] mb-1">
                    <span>Statutory Weight (GST/PAN/Udyam)</span>
                    <span className="font-bold text-[#124B7A]">{weights.statutory}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weights.statutory}
                    onChange={(e) => setWeights({ ...weights, statutory: Number(e.target.value) })}
                    className="w-full accent-[#124B7A] h-1.5"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-[#17212B] mb-1">
                    <span>Financial Weight (Turnover/Balance Sheet)</span>
                    <span className="font-bold text-[#124B7A]">{weights.financial}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weights.financial}
                    onChange={(e) => setWeights({ ...weights, financial: Number(e.target.value) })}
                    className="w-full accent-[#124B7A] h-1.5"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-[#17212B] mb-1">
                    <span>Technical & OEM Authorization</span>
                    <span className="font-bold text-[#124B7A]">{weights.technical}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weights.technical}
                    onChange={(e) => setWeights({ ...weights, technical: Number(e.target.value) })}
                    className="w-full accent-[#124B7A] h-1.5"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-[#17212B] mb-1">
                    <span>Make in India (Local Content %)</span>
                    <span className="font-bold text-[#124B7A]">{weights.localContent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weights.localContent}
                    onChange={(e) => setWeights({ ...weights, localContent: Number(e.target.value) })}
                    className="w-full accent-[#124B7A] h-1.5"
                  />
                </div>
              </div>
            </div>

            <div className="gov-card p-6 space-y-3">
              <h2 className="text-xs font-bold text-[#17212B] border-b border-[#E1E6EA] pb-2">Rule Versioning</h2>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                  <p className="font-bold text-[#17212B]">Rule Set v2.4 (Active)</p>
                  <p className="text-[#5F6B76] text-[11px] mt-0.5">Effective: 01-Aug-2026</p>
                  <p className="text-[#16803C] font-semibold mt-1 text-[11px]">Approved by GeM Standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. AI ENGINE & THRESHOLDS */}
      {/* ========================================================================= */}
      {activeAdminTab === 'ai_config' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">AI Model Configuration & Confidence Thresholds</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Configure confidence gates for automated candidate flags and review triggers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="gov-card p-5 space-y-2">
              <span className="text-xs font-semibold text-[#16803C] uppercase tracking-wider">Auto-Verify Candidate</span>
              <p className="text-2xl font-bold text-[#17212B]">≥ {aiThresholds.autoVerify}%</p>
              <p className="text-xs text-[#5F6B76]">High-confidence extractions flagged as verified candidate</p>
            </div>

            <div className="gov-card p-5 space-y-2">
              <span className="text-xs font-semibold text-[#B7791F] uppercase tracking-wider">Review Recommended</span>
              <p className="text-2xl font-bold text-[#17212B]">{aiThresholds.reviewRequired}% – 94%</p>
              <p className="text-xs text-[#5F6B76]">Discrepancies flagged for officer inspection</p>
            </div>

            <div className="gov-card p-5 space-y-2">
              <span className="text-xs font-semibold text-[#C0392B] uppercase tracking-wider">Manual Verification Only</span>
              <p className="text-2xl font-bold text-[#17212B]">&lt; {aiThresholds.reviewRequired}%</p>
              <p className="text-xs text-[#5F6B76]">Low OCR clarity requires manual review</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MOCK DATASETS */}
      {/* ========================================================================= */}
      {activeAdminTab === 'mock_data' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Mock Government Registry Datasets</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Simulated public registries for offline and live demonstration</p>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Mock GSTIN</th>
                  <th>Enterprise Legal Name</th>
                  <th>Taxpayer Status</th>
                  <th>Registered Address</th>
                  <th>Enterprise Type</th>
                </tr>
              </thead>
              <tbody>
                {mockGstRecords.map((rec) => (
                  <tr key={rec.gstin}>
                    <td><span className="font-mono font-bold text-[#124B7A]">{rec.gstin}</span></td>
                    <td><span className="font-semibold text-[#17212B]">{rec.entity}</span></td>
                    <td>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${rec.status === 'ACTIVE' ? 'bg-[#EBF6EE] text-[#16803C]' : 'bg-[#FDF2F1] text-[#C0392B]'}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td><span className="text-xs text-[#5F6B76]">{rec.address}</span></td>
                    <td><span className="text-xs text-[#5F6B76]">{rec.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SYSTEM HEALTH */}
      {/* ========================================================================= */}
      {activeAdminTab === 'system_health' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Document Processing Queues & Infrastructure</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Live queue throughput and asynchronous worker health</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Queue Pending</span>
              <p className="text-2xl font-bold text-[#17212B] mt-2">128 Jobs</p>
              <p className="text-xs text-[#5F6B76] mt-1">PyMuPDF Ingestion</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Processing</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-2">42 Jobs</p>
              <p className="text-xs text-[#5F6B76] mt-1">Layout Parsing</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Completed Today</span>
              <p className="text-2xl font-bold text-[#16803C] mt-2">12,842</p>
              <p className="text-xs text-[#5F6B76] mt-1">Avg 18s latency</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Failed / Retry</span>
              <p className="text-2xl font-bold text-[#C0392B] mt-2">7 Jobs</p>
              <p className="text-xs text-[#5F6B76] mt-1">Auto-retry active</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
