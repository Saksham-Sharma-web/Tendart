import React, { useState } from 'react';
import {
  Building2,
  Award,
  ShieldAlert,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Printer,
  Sparkles,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { Bid, Tender, ComplianceScore, Evidence } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';

interface Props {
  bid: Bid;
  tender: Tender;
  complianceScore: ComplianceScore;
  evidenceList: Evidence[];
  onOpenEvidenceViewer: (evidenceId: string, docId?: string, pageNumber?: number) => void;
  onRecordDecision: (decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD', remarks: string) => void;
  onNavigate: (view: string) => void;
}

export const BidderDetailView: React.FC<Props> = ({
  bid,
  tender,
  complianceScore,
  evidenceList,
  onOpenEvidenceViewer,
  onRecordDecision,
  onNavigate
}) => {
  const [decision, setDecision] = useState<'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD'>('APPROVE');
  const [remarks, setRemarks] = useState('');
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

  const score = complianceScore?.total_score || bid.compliance_score || 0;
  const risk = complianceScore?.risk_level || bid.risk_level || 'LOW';
  const status = complianceScore?.status || bid.compliance_status || 'SUBMITTED';

  const evaluations = complianceScore?.requirement_evaluations || [];
  const discrepancies = complianceScore?.discrepancies || [];

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks) {
      alert('Please enter justification remarks before recording the decision.');
      return;
    }
    setIsSubmittingDecision(true);
    onRecordDecision(decision, remarks);
    setTimeout(() => {
      setIsSubmittingDecision(false);
      alert(`Decision recorded successfully: ${decision}`);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('rankings')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rankings Board</span>
        </button>

        <button
          onClick={() => onNavigate('compliance_report')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Export Official Bid Report</span>
        </button>
      </div>

      {/* Hero Dossier Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B192C]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                {bid.bid_id}
              </span>
              <RiskBadge risk={risk} size="md" />
              <StatusBadge status={status} size="md" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white mt-2 tracking-tight">
              {bid.legal_name || bid.bidder_name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tender Ref: <b className="text-slate-300">{tender.tender_number}</b> • {tender.title}
            </p>
          </div>

          {/* Radial Score Gauge */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Compliance Score</p>
              <div className="text-3xl font-black text-emerald-400">
                {score}<span className="text-sm font-bold text-slate-500">/100</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Deterministic Evaluation</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(5,150,105,0.3)]">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">PAN Registration</span>
            <p className="text-sm font-mono font-bold text-white mt-0.5">{bid.pan || 'AABCU9603R'}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">GSTIN Registration</span>
            <p className="text-sm font-mono font-bold text-white mt-0.5">{bid.gstin || '07AABCU9603R1ZM'}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Udyam MSME Number</span>
            <p className="text-sm font-mono font-bold text-amber-400 mt-0.5">{bid.udyam_number || 'UDYAM-DL-01-0019283'}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">Submitted Bid Amount</span>
            <p className="text-sm font-bold text-white mt-0.5">₹{bid.bid_amount_cr} Crore</p>
          </div>
        </div>
      </div>

      {/* Discrepancy Alert Cards (if any) */}
      {discrepancies.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-rose-600/50 bg-rose-950/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              ⚠️ Cross-Document Contradictions & Discrepancies Detected ({discrepancies.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {discrepancies.map((disc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/90 border border-rose-900/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-rose-300">{disc.title}</span>
                    <span className="text-[10px] uppercase font-bold bg-rose-950 text-rose-400 border border-rose-800 px-2 py-0.5 rounded">
                      {disc.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1 leading-relaxed">{disc.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span>Expected: <b className="text-slate-200">{disc.expected_value}</b></span>
                    <span>•</span>
                    <span>Found: <b className="text-rose-400">{disc.found_value}</b></span>
                    <span>•</span>
                    <span>Sources: <b className="text-amber-400">{disc.source_docs.join(', ')}</b></span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEvidenceViewer('EV-REQ-004', 'DOC-TO', 1)}
                  className="px-3.5 py-1.5 rounded-lg font-bold bg-rose-600 hover:bg-rose-500 text-white shrink-0 transition-all cursor-pointer text-xs"
                >
                  Inspect Conflicting PDFs
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirement & Evidence Checklist */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Deterministic Requirement Evaluation Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any evidence fact to open the original PDF at the exact highlighted page coordinates
            </p>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{evaluations.length} Evaluated Rules</span>
        </div>

        <div className="space-y-3">
          {evaluations.map((ev) => (
            <div
              key={ev.requirement_id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {ev.requirement_id}
                  </span>
                  <h4 className="font-bold text-white text-sm">{ev.name}</h4>
                  <StatusBadge status={ev.status} size="sm" />
                </div>

                <p className="text-slate-300 font-medium">{ev.rule_explanation}</p>

                {ev.source_text && (
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono italic">
                    "{ev.source_text}"
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span>Extracted Fact: <b className="text-emerald-400">{ev.display_value}</b></span>
                  <span>•</span>
                  <span>Required: <b>{String(ev.expected_value)}</b></span>
                  <span>•</span>
                  <span>Source: <b className="text-cyan-400">{ev.source_doc_name || 'Document'}</b> (Page {ev.source_page || 1})</span>
                  <span>•</span>
                  <span>Verification: <b className="text-indigo-400">{ev.verification_source}</b></span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">Weight Earned:</span>{' '}
                  <span className="text-sm font-extrabold text-amber-400">
                    {ev.soft_score_earned}/{ev.max_soft_score}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEvidenceViewer(ev.evidence_id || 'EV-001', undefined, ev.source_page)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-950/30"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF Evidence</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Procurement Officer Final Decision Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#0B192C] to-slate-950 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Procurement Officer Final Verdict Sign-Off</h3>
            <p className="text-xs text-slate-400">
              "Tendart provides evidence-backed decision support. Final procurement authority remains with the authorized officer."
            </p>
          </div>
        </div>

        {bid.officer_decision ? (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Recorded Decision:</span>
              <StatusBadge status={bid.officer_decision} size="md" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Signed By:</span>
              <span className="font-bold text-white">{bid.decision_by}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Timestamp:</span>
              <span className="font-mono text-slate-400">{bid.decision_at}</span>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-slate-400 block mb-1">Remarks / Justification:</span>
              <p className="text-slate-200 font-medium">{bid.decision_remarks}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDecisionSubmit} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'APPROVE', label: 'Approve Qualification', color: 'bg-emerald-600' },
                { id: 'REQUEST_CLARIFICATION', label: 'Request Clarification', color: 'bg-blue-600' },
                { id: 'HOLD', label: 'Keep Under Review', color: 'bg-amber-600' },
                { id: 'REJECT', label: 'Disqualify Bidder', color: 'bg-rose-600' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDecision(opt.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    decision === opt.id
                      ? `${opt.color} text-white border-white shadow-lg`
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Official Remarks & Compliance Justification *
              </label>
              <textarea
                rows={2}
                required
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Verified against CA Turnover Certificate and GSTN Registry. Local content exceeds 50% threshold. Approved for commercial opening."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingDecision}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-950/40"
              >
                {isSubmittingDecision ? 'Signing...' : 'Record & Sign Official Verdict'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
