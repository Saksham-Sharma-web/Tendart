import React, { useState } from 'react';
import {
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Globe,
  Database,
  Lock
} from 'lucide-react';

export const GovSandboxView: React.FC = () => {
  const [connectors, setConnectors] = useState([
    {
      id: 'gstn',
      name: 'GSTN Central Portal (GST System)',
      protocol: 'REST / e-Invoice API v2.1',
      status: 'ONLINE',
      latency: '118 ms',
      reliability: '99.9%',
      lastSync: 'Just now',
      mockRecords: '1.4M Entities'
    },
    {
      id: 'cbdt',
      name: 'CBDT PAN & Income Tax Database',
      protocol: 'PAN Verification Service v3.0',
      status: 'ONLINE',
      latency: '84 ms',
      reliability: '99.8%',
      lastSync: 'Just now',
      mockRecords: '850K Corporate PANs'
    },
    {
      id: 'udyam',
      name: 'Ministry of MSME (Udyam Portal)',
      protocol: 'MSME SAMADHAAN API v1.4',
      status: 'ONLINE',
      latency: '142 ms',
      reliability: '99.5%',
      lastSync: '2 min ago',
      mockRecords: '2.1M MSME Units'
    },
    {
      id: 'cppp',
      name: 'CPPP Central Debarment / Blacklist',
      protocol: 'National Vigilance Registry',
      status: 'ONLINE',
      latency: '62 ms',
      reliability: '100%',
      lastSync: 'Just now',
      mockRecords: '12.4K Debarred Entities'
    },
    {
      id: 'epfo',
      name: 'EPFO Electronic Challan System',
      protocol: 'EPFO Shram Suvidha API',
      status: 'ONLINE',
      latency: '165 ms',
      reliability: '98.9%',
      lastSync: '5 min ago',
      mockRecords: '620K Employers'
    },
    {
      id: 'digilocker',
      name: 'DigiLocker Document Verification',
      protocol: 'e-Sign & Digital Asset API v2',
      status: 'ONLINE',
      latency: '190 ms',
      reliability: '99.7%',
      lastSync: '1 min ago',
      mockRecords: 'Issued Certificates Pool'
    }
  ]);

  const [weights, setWeights] = useState({
    statutory: 30,
    financial: 25,
    technical: 25,
    document: 10,
    localContent: 10
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Card - Full Width */}
      <div className="gov-card p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded">
              System Administration
            </span>
            <span className="text-xs text-slate-400">Government Registry Integrations</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Registry Connectors & Compliance Weights</h1>
          <p className="text-sm text-slate-300">
            Live authorized government connectors, simulated API latency injection, and dynamic scoring formula configurator.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-4 py-2 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-sm font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Sandbox Mode Active</span>
          </span>
        </div>
      </div>

      {/* Grid: Connectors & Weightage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Government Connectors Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>Authorized Government Registries</span>
            </h2>
            <span className="text-xs text-slate-400">Click any badge to toggle API outage</span>
          </div>

          <div className="space-y-3">
            {connectors.map((c) => (
              <div
                key={c.id}
                className="gov-card p-5 flex items-center justify-between gap-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#0A1624] text-blue-400 border border-[#1E2E42] shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{c.name}</h3>
                    <p className="text-sm text-slate-300">{c.protocol} • Mock Pool: {c.mockRecords}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                      <span>Latency: <strong className="text-white">{c.latency}</strong></span>
                      <span>•</span>
                      <span>Uptime: <strong className="text-white">{c.reliability}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnectorStatus(c.id)}
                  className={`px-4 py-2 rounded-md text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                    c.status === 'ONLINE'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/60'
                      : c.status === 'DEGRADED'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800/60 hover:bg-amber-900/60'
                      : 'bg-red-950/80 text-red-300 border-red-800/60 hover:bg-red-900/60'
                  }`}
                >
                  {c.status === 'ONLINE' && '● Live 200 OK'}
                  {c.status === 'DEGRADED' && '▲ Degraded (Slow)'}
                  {c.status === 'OFFLINE' && '✕ Offline (503 Fallback)'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Rule Weightage & Scoring Engine Config */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <span>Compliance Scoring Formula</span>
          </h2>

          <form onSubmit={handleSaveWeights} className="gov-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1E2E42] pb-4">
              <span className="text-sm font-semibold text-slate-300">Total Formula Sum</span>
              <span className={`text-sm font-bold px-3 py-1 rounded ${totalWeight === 100 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' : 'bg-red-950/80 text-red-300 border border-red-800/60'}`}>
                {totalWeight} / 100%
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Statutory Compliance Weight</span>
                <span className="font-bold text-blue-400 text-base">{weights.statutory}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={weights.statutory}
                onChange={(e) => setWeights({ ...weights, statutory: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Financial Criteria Weight</span>
                <span className="font-bold text-blue-400 text-base">{weights.financial}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={weights.financial}
                onChange={(e) => setWeights({ ...weights, financial: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Technical & OEM Authorization</span>
                <span className="font-bold text-blue-400 text-base">{weights.technical}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={weights.technical}
                onChange={(e) => setWeights({ ...weights, technical: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Make in India (Local Content)</span>
                <span className="font-bold text-blue-400 text-base">{weights.localContent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={weights.localContent}
                onChange={(e) => setWeights({ ...weights, localContent: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-blue-950 mt-2"
            >
              {savedSuccess ? '✓ Updated Successfully' : 'Save Scoring Formula'}
            </button>
          </form>

          {/* Cryptography Box */}
          <div className="p-5 bg-[#0A1624] rounded-lg border border-[#1E2E42] text-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>SHA-256 Document Integrity</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every uploaded document is hashed with SHA-256 at ingestion. All comparisons execute inside an isolated sandbox with zero data leakage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
