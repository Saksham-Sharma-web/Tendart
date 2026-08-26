import React from 'react';
import {
  Tender,
  Bid,
  TenderRequirement
} from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import {
  FileText,
  Sparkles,
  Calendar,
  IndianRupee,
  Building,
  CheckCircle,
  AlertCircle,
  FileCheck2,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

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
  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Header Card */}
      <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
              {tender.tender_number}
            </span>
            <StatusBadge status={tender.status} size="sm" />
          </div>
          <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{tender.title}</h1>
          <p className="text-xs text-[#5F6B76]">{tender.department}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRunEvaluation}
            className="gov-btn-primary h-10 px-5 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Run AI Pipeline</span>
          </button>
        </div>
      </div>

      {/* Tender Requirements Rules Checklist */}
      <div className="gov-card overflow-hidden">
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17212B]">AI-Extracted Eligibility Requirements</h2>
            <p className="text-xs text-[#5F6B76] mt-0.5">Mandatory criteria enforced against all bidder submissions</p>
          </div>
        </div>

        <table className="w-full gov-table text-left">
          <thead>
            <tr>
              <th>Rule ID</th>
              <th>Requirement Name</th>
              <th>Category</th>
              <th>Threshold / Condition</th>
              <th>Weight</th>
              <th>Constraint Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono font-bold text-[#124B7A]">REQ-GST-01</span></td>
              <td><span className="font-semibold text-[#17212B]">Mandatory GST Registration</span></td>
              <td><span className="text-xs text-[#5F6B76]">Statutory</span></td>
              <td><span className="text-xs text-[#5F6B76]">Active Status in GSTN</span></td>
              <td><span className="text-xs font-semibold text-[#124B7A]">15%</span></td>
              <td><span className="text-[10px] font-bold text-[#C0392B] bg-[#FDF2F1] px-2 py-0.5 rounded">MANDATORY HARD FILTER</span></td>
            </tr>
            <tr>
              <td><span className="font-mono font-bold text-[#124B7A]">REQ-TURNOVER-01</span></td>
              <td><span className="font-semibold text-[#17212B]">Minimum Annual Turnover</span></td>
              <td><span className="text-xs text-[#5F6B76]">Financial</span></td>
              <td><span className="font-bold text-[#17212B]">≥ ₹5.0 Crores (Last 3 FY)</span></td>
              <td><span className="text-xs font-semibold text-[#124B7A]">25%</span></td>
              <td><span className="text-[10px] font-bold text-[#C0392B] bg-[#FDF2F1] px-2 py-0.5 rounded">MANDATORY HARD FILTER</span></td>
            </tr>
            <tr>
              <td><span className="font-mono font-bold text-[#124B7A]">REQ-OEM-01</span></td>
              <td><span className="font-semibold text-[#17212B]">OEM Authorization Letter</span></td>
              <td><span className="text-xs text-[#5F6B76]">Technical</span></td>
              <td><span className="text-xs text-[#5F6B76]">Annexure IV Valid Certificate</span></td>
              <td><span className="text-xs font-semibold text-[#124B7A]">15%</span></td>
              <td><span className="text-[10px] font-bold text-[#C0392B] bg-[#FDF2F1] px-2 py-0.5 rounded">MANDATORY HARD FILTER</span></td>
            </tr>
            <tr>
              <td><span className="font-mono font-bold text-[#124B7A]">REQ-MII-01</span></td>
              <td><span className="font-semibold text-[#17212B]">Make in India Local Content</span></td>
              <td><span className="text-xs text-[#5F6B76]">Local Content</span></td>
              <td><span className="font-bold text-[#17212B]">≥ 50% Domestic Addition</span></td>
              <td><span className="text-xs font-semibold text-[#124B7A]">15%</span></td>
              <td><span className="text-[10px] font-bold text-[#C0392B] bg-[#FDF2F1] px-2 py-0.5 rounded">MANDATORY HARD FILTER</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
