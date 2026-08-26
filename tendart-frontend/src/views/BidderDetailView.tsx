import React, { useState } from 'react';
import {
  Bid,
  Tender,
  ComplianceScore,
  Evidence
} from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';
import {
  ArrowLeft,
  FileCheck2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  User,
  Sparkles,
  HelpCircle,
  Layers,
  FileText
} from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks) return alert('Mandatory officer justification remarks are required.');
    setIsSubmitting(true);
    onRecordDecision(decision, remarks);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Officer Decision Recorded with SHA-256 Cryptographic Signature.');
    }, 400);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={() => onNavigate('rankings')}
          className="gov-btn-secondary h-8 px-3 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Evaluation Matrix</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5F6B76]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Procurement Officer Decision Support Workspace</span>
        </div>
      </div>

      {/* Header Info */}
      <div className="gov-card p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E1E6EA] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                {bid.bid_id}
              </span>
              <RiskBadge risk={bid.risk_level || 'LOW'} size="sm" />
              <StatusBadge status={bid.compliance_status || (bid as any).status || 'QUALIFIED'} size="sm" />
            </div>
            <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{bid.legal_name || bid.bidder_name}</h1>
            <p className="text-xs text-[#5F6B76]">
              Tender: <strong className="text-[#17212B]">{tender.tender_number}</strong> — {tender.title}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <p className="text-xs text-[#5F6B76] uppercase font-semibold">Total Compliance</p>
              <p className="text-3xl font-bold text-[#17212B] mt-0.5">{bid.compliance_score || 87}<span className="text-sm text-[#5F6B76] font-normal">/100</span></p>
            </div>

            <div className="text-right border-l border-[#E1E6EA] pl-6">
              <p className="text-xs text-[#5F6B76] uppercase font-semibold">Commercial Bid</p>
              <p className="text-2xl font-bold text-[#124B7A] mt-0.5">₹ {bid.bid_amount_cr} Cr</p>
            </div>
          </div>
        </div>

        {/* Score Breakdown (Explainable AI: Why 87?) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-1 text-xs bg-[#F6F8FA] p-4 rounded-lg border border-[#E1E6EA]">
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Statutory (30%)</span>
            <p className="text-sm font-bold text-[#16803C] mt-0.5">30 / 30 (100%)</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Financial (25%)</span>
            <p className="text-sm font-bold text-[#16803C] mt-0.5">25 / 25 (100%)</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Technical (25%)</span>
            <p className="text-sm font-bold text-[#124B7A] mt-0.5">22 / 25 (88%)</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Local Content (10%)</span>
            <p className="text-sm font-bold text-[#16803C] mt-0.5">10 / 10 (100%)</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Risk Rating</span>
            <p className="text-sm font-bold text-[#16803C] mt-0.5">Low Risk</p>
          </div>
        </div>
      </div>

      {/* Extracted Evidence Table */}
      <div className="gov-card overflow-hidden">
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17212B]">AI Extracted Evidence & Government Registry Match</h2>
            <p className="text-xs text-[#5F6B76] mt-0.5">Click any rule to open the side-by-side OCR bounding-box viewer</p>
          </div>
        </div>

        <table className="w-full gov-table text-left">
          <thead>
            <tr>
              <th>Requirement Name</th>
              <th>Category</th>
              <th>Extracted Value</th>
              <th>Government Data</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">Active GST Registration</span>
                </div>
              </td>
              <td><span className="text-xs text-[#5F6B76]">Statutory</span></td>
              <td className="font-mono text-xs">07AABCB1234F1Z5</td>
              <td className="font-mono text-xs text-[#16803C]">Active (GSTN Live)</td>
              <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Verified</span></td>
              <td className="text-right">
                <button
                  onClick={() => onOpenEvidenceViewer('EVD-GST', 'DOC-GST', 1)}
                  className="gov-btn-secondary h-8 px-3 text-xs"
                >
                  View Evidence
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">Turnover ≥ ₹5.0 Cr Threshold</span>
                </div>
              </td>
              <td><span className="text-xs text-[#5F6B76]">Financial</span></td>
              <td className="font-bold text-[#17212B]">₹ 18.50 Cr (3-Yr Avg)</td>
              <td className="text-xs text-[#5F6B76]">CA Balance Sheet Page 4</td>
              <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Compliant</span></td>
              <td className="text-right">
                <button
                  onClick={() => onOpenEvidenceViewer('EVD-FIN', 'DOC-FIN', 4)}
                  className="gov-btn-secondary h-8 px-3 text-xs"
                >
                  View Evidence
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">OEM Authorization Letter</span>
                </div>
              </td>
              <td><span className="text-xs text-[#5F6B76]">Technical</span></td>
              <td>Annexure IV Attached</td>
              <td className="text-xs text-[#5F6B76]">Manufacturer Letterhead</td>
              <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Valid</span></td>
              <td className="text-right">
                <button
                  onClick={() => onOpenEvidenceViewer('EVD-OEM', 'DOC-OEM', 1)}
                  className="gov-btn-secondary h-8 px-3 text-xs"
                >
                  View Evidence
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Human Decision Form */}
      <div className="gov-card p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#17212B]">Procurement Officer Decision & Remarks</h2>
          <p className="text-xs text-[#5F6B76] mt-0.5">
            The Procurement Officer holds legal authority under GTC to qualify or disqualify bidders.
          </p>
        </div>

        <form onSubmit={handleSubmitDecision} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label
              className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                decision === 'APPROVE'
                  ? 'bg-[#EBF6EE] border-[#16803C] text-[#16803C] font-bold'
                  : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="APPROVE"
                checked={decision === 'APPROVE'}
                onChange={() => setDecision('APPROVE')}
                className="sr-only"
              />
              <span>● Qualify Bidder</span>
            </label>

            <label
              className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                decision === 'HOLD'
                  ? 'bg-[#FEF8EC] border-[#B7791F] text-[#B7791F] font-bold'
                  : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="HOLD"
                checked={decision === 'HOLD'}
                onChange={() => setDecision('HOLD')}
                className="sr-only"
              />
              <span>● Hold for Review</span>
            </label>

            <label
              className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                decision === 'REQUEST_CLARIFICATION'
                  ? 'bg-[#EBF3FA] border-[#124B7A] text-[#124B7A] font-bold'
                  : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="REQUEST_CLARIFICATION"
                checked={decision === 'REQUEST_CLARIFICATION'}
                onChange={() => setDecision('REQUEST_CLARIFICATION')}
                className="sr-only"
              />
              <span>● Request Clarification</span>
            </label>

            <label
              className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                decision === 'REJECT'
                  ? 'bg-[#FDF2F1] border-[#C0392B] text-[#C0392B] font-bold'
                  : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="REJECT"
                checked={decision === 'REJECT'}
                onChange={() => setDecision('REJECT')}
                className="sr-only"
              />
              <span>● Disqualify Bidder</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-[#17212B] mb-1.5">Official Rationale Remarks *</label>
            <textarea
              rows={3}
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="State the official justification..."
              className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="gov-btn-primary h-10 px-6 text-xs"
          >
            {isSubmitting ? 'Recording...' : 'Confirm Decision & Sign (SHA-256)'}
          </button>
        </form>
      </div>
    </div>
  );
};
