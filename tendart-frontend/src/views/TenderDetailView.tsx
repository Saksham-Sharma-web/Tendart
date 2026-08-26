import React, { useState } from 'react';
import { FileText, Award, Users, CheckCircle2, Shield, Calendar, Building, ChevronRight, BarChart2, Plus } from 'lucide-react';
import { Tender, Bid } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';

interface Props {
  tender: Tender;
  bids: Bid[];
  onSelectBid: (bidId: string) => void;
  onNavigate: (view: string) => void;
  onRunEvaluation: () => void;
}

export const TenderDetailView: React.FC<Props> = ({
  tender,
  bids,
  onSelectBid,
  onNavigate,
  onRunEvaluation
}) => {
  const [activeTab, setActiveTab] = useState<'requirements' | 'bidders'>('requirements');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B192C]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                {tender.tender_number}
              </span>
              <StatusBadge status={tender.status} size="sm" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-2">{tender.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{tender.department}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('rankings')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Rankings Board</span>
            </button>
            <button
              onClick={onRunEvaluation}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>Re-Evaluate All Bids</span>
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Estimated Value</span>
            <p className="text-base font-extrabold text-white mt-0.5">₹{tender.estimated_value_cr} Crore</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Deadline</span>
            <p className="text-base font-bold text-slate-200 mt-0.5">{tender.submission_deadline?.slice(0, 10)}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Total Bidders</span>
            <p className="text-base font-extrabold text-cyan-400 mt-0.5">{bids.length} Submitted</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Requirements Count</span>
            <p className="text-base font-extrabold text-amber-400 mt-0.5">{tender.requirements?.length || 0} Rules</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'requirements'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Requirement Rules Matrix ({tender.requirements?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('bidders')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'bidders'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Submitted Bidders ({bids.length})</span>
        </button>
      </div>

      {/* Tab 1: Requirements Matrix */}
      {activeTab === 'requirements' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Code</th>
                  <th className="px-5 py-3.5">Requirement Name</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Constraint Type</th>
                  <th className="px-5 py-3.5">Rule / Threshold</th>
                  <th className="px-5 py-3.5">Weight</th>
                  <th className="px-5 py-3.5">Required Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tender.requirements?.map((req) => (
                  <tr key={req.requirement_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-amber-400">{req.requirement_id}</td>
                    <td className="px-5 py-4 font-bold text-white">{req.name}</td>
                    <td className="px-5 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {req.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {req.mandatory ? (
                        <span className="text-[10px] font-bold uppercase text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                          Mandatory (Hard)
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          Soft Scoring
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-200">
                      {req.operator} {String(req.expected_value)}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-amber-400">{req.weight} pts</td>
                    <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                      {req.required_document_types?.join(', ') || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Submitted Bidders List */}
      {activeTab === 'bidders' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Bidder Name</th>
                  <th className="px-5 py-3.5">PAN / GSTIN</th>
                  <th className="px-5 py-3.5">Bid Amount</th>
                  <th className="px-5 py-3.5">Compliance Score</th>
                  <th className="px-5 py-3.5">Risk Level</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bids.map((b) => (
                  <tr key={b.bid_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>{b.bidder_name}</span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-400">
                      {b.pan || 'N/A'} / {b.gstin || 'N/A'}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-200">₹{b.bid_amount_cr} Cr</td>
                    <td className="px-5 py-4 font-extrabold text-emerald-400">
                      {b.compliance_score || 0}/100
                    </td>
                    <td className="px-5 py-4">
                      <RiskBadge risk={b.risk_level || 'LOW'} size="sm" />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.compliance_status || b.status} size="sm" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => {
                          onSelectBid(b.bid_id);
                          onNavigate('bid_detail');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Inspect Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
