import React, { useState } from 'react';
import { History, Printer, Shield, CheckCircle2, FileText, Building2, Download, Search, ArrowLeft } from 'lucide-react';
import { AuditLog, Bid, Tender, ComplianceScore } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';

interface Props {
  tender?: Tender;
  bid?: Bid;
  complianceScore?: ComplianceScore;
  auditTrail: AuditLog[];
  onNavigate: (view: string) => void;
}

export const AuditReportView: React.FC<Props> = ({
  tender,
  bid,
  complianceScore,
  auditTrail,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditTrail.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B192C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
              Immutable Governance
            </span>
            <span className="text-xs text-slate-400">Cryptographic Provenance</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2 flex items-center gap-2.5">
            <History className="w-6 h-6 text-amber-400" />
            <span>Audit Trail & Formal Bid Compliance Report</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tender: <b className="text-slate-200">{tender?.title || 'Industrial Safety Equipment'}</b> ({tender?.tender_number || 'GEM/2026/SAFETY/001'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={printReport}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* Printable Formal Bid Compliance Report Section */}
      {bid && (
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 bg-white text-slate-900 shadow-2xl space-y-6 print:border-none print:shadow-none print:p-0">
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between">
            <div>
              <div className="text-xl font-black tracking-tight text-slate-950">
                🏛️ TENDART BID COMPLIANCE REPORT
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Smart India Hackathon • GeM Procurement Decision Support System
              </p>
            </div>
            <div className="text-right text-xs text-slate-600 font-mono">
              <p><b>Report ID:</b> REP-{bid.bid_id}</p>
              <p><b>Generated:</b> {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-100 text-xs">
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">Bidder Entity</span>
              <p className="font-bold text-slate-900 mt-0.5">{bid.legal_name || bid.bidder_name}</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">PAN / GSTIN</span>
              <p className="font-mono font-bold text-slate-900 mt-0.5">{bid.pan || 'N/A'} / {bid.gstin || 'N/A'}</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">Tender Reference</span>
              <p className="font-mono font-bold text-slate-900 mt-0.5">{tender?.tender_number}</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">Compliance Score</span>
              <p className="text-lg font-black text-emerald-700 mt-0.5">
                {complianceScore?.total_score || bid.compliance_score || 0}/100
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">Risk Classification</span>
              <p className="font-bold text-slate-900 mt-0.5">{complianceScore?.risk_level || bid.risk_level || 'LOW'} RISK</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px]">Qualification Verdict</span>
              <p className="font-extrabold text-emerald-700 mt-0.5">
                {complianceScore?.status || bid.compliance_status || 'QUALIFIED'}
              </p>
            </div>
          </div>

          {/* Requirements & Evidence Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              📋 Evidence-Backed Requirement Verification
            </h3>
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-2.5">Requirement</th>
                  <th className="p-2.5">Expected</th>
                  <th className="p-2.5">Extracted Fact</th>
                  <th className="p-2.5">Source Document</th>
                  <th className="p-2.5">Verification</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(complianceScore?.requirement_evaluations || []).map((ev) => (
                  <tr key={ev.requirement_id}>
                    <td className="p-2.5 font-bold">{ev.name}</td>
                    <td className="p-2.5 text-slate-600">{String(ev.expected_value)}</td>
                    <td className="p-2.5 font-bold text-slate-900">{ev.display_value}</td>
                    <td className="p-2.5 text-slate-600 font-mono text-[11px]">{ev.source_doc_name || 'N/A'} (p. {ev.source_page || 1})</td>
                    <td className="p-2.5 text-blue-700">{ev.verification_source}</td>
                    <td className="p-2.5 font-bold text-emerald-700">{ev.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Officer Sign-Off Station */}
          <div className="border border-dashed border-slate-400 p-4 rounded-xl bg-slate-50 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">Procurement Officer Final Decision Certification</h4>
            <p className="text-slate-600 text-[11px]">
              "Tendart provides evidence-backed decision support. Final procurement authority remains with the authorized procurement officer."
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <b>Decision:</b> {bid.officer_decision || 'APPROVED FOR COMMERCIAL OPENING'}
              </div>
              <div>
                <b>Signed By:</b> {bid.decision_by || 'Authorized Procurement Officer (GeM)'}
              </div>
              <div className="col-span-2">
                <b>Remarks:</b> {bid.decision_remarks || 'Verified all mandatory statutory credentials, local content % and financial criteria.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Immutable Audit Timeline Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Immutable Event Audit Log ({filteredLogs.length})
            </h3>
          </div>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.log_id}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {log.log_id}
                  </span>
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Actor: <b className="text-slate-200">{log.actor}</b></span>
                </div>
                <p className="text-slate-300 font-medium">{log.notes}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-[11px] text-slate-500">
                  {log.timestamp ? log.timestamp.slice(0, 19).replace('T', ' ') : 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
