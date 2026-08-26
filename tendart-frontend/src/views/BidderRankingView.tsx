import React, { useState } from 'react';
import {
  Award,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpDown,
  Maximize2
} from 'lucide-react';
import { RankedBidder, Tender } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';

interface Props {
  tender: Tender;
  rankings: RankedBidder[];
  onSelectBid: (bidId: string) => void;
  onNavigate: (view: string) => void;
  onFilterChange: (status?: string, risk?: string) => void;
}

export const BidderRankingView: React.FC<Props> = ({
  tender,
  rankings,
  onSelectBid,
  onNavigate,
  onFilterChange
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val);
    onFilterChange(val === 'ALL' ? undefined : val, riskFilter === 'ALL' ? undefined : riskFilter);
  };

  const handleRiskFilter = (val: string) => {
    setRiskFilter(val);
    onFilterChange(statusFilter === 'ALL' ? undefined : statusFilter, val === 'ALL' ? undefined : val);
  };

  const toggleCompare = (bidId: string) => {
    if (selectedForComparison.includes(bidId)) {
      setSelectedForComparison(selectedForComparison.filter((id) => id !== bidId));
    } else {
      if (selectedForComparison.length >= 3) {
        alert('You can compare up to 3 bidders simultaneously.');
        return;
      }
      setSelectedForComparison([...selectedForComparison, bidId]);
    }
  };

  const exportCSV = () => {
    const headers = 'Rank,Bidder Name,Legal Name,PAN,GSTIN,Bid Amount (Cr),Compliance Score,Statutory,Financial,Technical,Document,Local Content,Risk Level,Status\n';
    const rows = rankings
      .map(
        (r) =>
          `"${r.rank || 'N/A'}","${r.bidder_name}","${r.legal_name}","${r.pan || ''}","${r.gstin || ''}","${r.bid_amount_cr}","${r.compliance_score}","${r.statutory_score}","${r.financial_score}","${r.technical_score}","${r.document_score}","${r.local_content_score}","${r.risk_level}","${r.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tendart_Rankings_${tender.tender_number}.csv`;
    a.click();
  };

  const comparedBidders = rankings.filter((r) => selectedForComparison.includes(r.bid_id));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B192C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
              Deterministic Evaluation
            </span>
            <span className="text-xs text-slate-400">Hard Filtered → Soft Scored</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2 flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Bidder Compliance Ranking Board</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tender: <b className="text-slate-200">{tender.title}</b> ({tender.tender_number})
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedForComparison.length >= 2 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950/40 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Compare Selected ({selectedForComparison.length})</span>
            </button>
          )}

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1">Status Filter:</span>
          {['ALL', 'QUALIFIED', 'REVIEW_REQUIRED', 'DISQUALIFIED'].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1">Risk Filter:</span>
          {['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((rk) => (
            <button
              key={rk}
              onClick={() => handleRiskFilter(rk)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                riskFilter === rk
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {rk}
            </button>
          ))}
        </div>
      </div>

      {/* Ranking Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5 text-center">Compare</th>
                <th className="px-4 py-3.5 text-center">Rank</th>
                <th className="px-5 py-3.5">Bidder Entity</th>
                <th className="px-4 py-3.5">Bid Amount</th>
                <th className="px-4 py-3.5 text-center">Total Score</th>
                <th className="px-4 py-3.5">Statutory (25)</th>
                <th className="px-4 py-3.5">Financial (25)</th>
                <th className="px-4 py-3.5">Technical (25)</th>
                <th className="px-4 py-3.5">Local Content (10)</th>
                <th className="px-4 py-3.5">Risk Level</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rankings.map((r, idx) => {
                const isSelected = selectedForComparison.includes(r.bid_id);
                return (
                  <tr
                    key={r.bid_id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-indigo-950/20' : ''
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCompare(r.bid_id)}
                        className="rounded accent-amber-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      {r.rank ? (
                        <span
                          className={`w-7 h-7 mx-auto rounded-lg font-black text-xs flex items-center justify-center border ${
                            r.rank === 1
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                              : r.rank === 2
                              ? 'bg-slate-300 text-slate-950 border-white'
                              : r.rank === 3
                              ? 'bg-amber-800 text-amber-200 border-amber-700'
                              : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          #{r.rank}
                        </span>
                      ) : (
                        <span className="text-slate-600 font-bold">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-white text-sm">{r.bidder_name}</p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          PAN: {r.pan || 'N/A'} • GST: {r.gstin || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-200">₹{r.bid_amount_cr} Cr</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-base font-extrabold text-emerald-400">
                        {r.compliance_score}
                      </span>
                      <span className="text-[10px] text-slate-500">/100</span>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-300">{r.statutory_score}</td>
                    <td className="px-4 py-4 font-medium text-slate-300">{r.financial_score}</td>
                    <td className="px-4 py-4 font-medium text-slate-300">{r.technical_score}</td>
                    <td className="px-4 py-4 font-medium text-slate-300">{r.local_content_score}</td>
                    <td className="px-4 py-4">
                      <RiskBadge risk={r.risk_level} size="sm" />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={r.status} size="sm" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => {
                          onSelectBid(r.bid_id);
                          onNavigate('bid_detail');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && comparedBidders.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-5xl rounded-2xl border border-indigo-500/40 p-6 bg-[#0B192C] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Side-by-Side Bidder Comparison</h3>
                  <p className="text-xs text-slate-400">Comparing {comparedBidders.length} bidders on deterministic criteria</p>
                </div>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {comparedBidders.map((b) => (
                <div key={b.bid_id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">#{b.rank || 'N/A'}</span>
                      <RiskBadge risk={b.risk_level} size="sm" />
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">{b.bidder_name}</h4>
                    <p className="text-xs text-slate-400">Bid: ₹{b.bid_amount_cr} Cr</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Total Score:</span>
                      <span className="font-extrabold text-emerald-400">{b.compliance_score}/100</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Statutory (25):</span>
                      <span className="font-bold text-slate-200">{b.statutory_score}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Financial (25):</span>
                      <span className="font-bold text-slate-200">{b.financial_score}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Technical (25):</span>
                      <span className="font-bold text-slate-200">{b.technical_score}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Local Content (10):</span>
                      <span className="font-bold text-slate-200">{b.local_content_score}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Status:</span>
                      <StatusBadge status={b.status} size="sm" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectBid(b.bid_id);
                      setShowComparisonModal(false);
                      onNavigate('bid_detail');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all"
                  >
                    Open Full Dossier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
