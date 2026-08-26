import React, { useState } from 'react';
import {
  Tender,
  RankedBidder,
  ComplianceScore,
  Evidence,
  AuditLog
} from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileCheck2,
  Sliders,
  Sparkles
} from 'lucide-react';

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
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredRankings = rankings.filter((r) => {
    const matchesSearch =
      r.bidder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.gstin && r.gstin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.pan && r.pan.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterRisk === 'LOW') return matchesSearch && r.risk_level === 'LOW';
    if (filterRisk === 'MEDIUM') return matchesSearch && r.risk_level === 'MEDIUM';
    if (filterRisk === 'HIGH') return matchesSearch && (r.risk_level === 'HIGH' || r.risk_level === 'CRITICAL');
    return matchesSearch;
  });

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
              {tender.tender_number}
            </span>
            <span className="text-xs text-[#5F6B76]">{tender.department}</span>
          </div>
          <h1 className="text-xl font-bold text-[#17212B]">Bidder Evaluation Matrix & Compliance Scores</h1>
          <p className="text-xs text-[#5F6B76]">
            Mathematical score breakdown across Statutory, Financial, Technical, and Make-in-India criteria
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A949E] absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company name, GSTIN, PAN..."
              className="gov-input pl-9 pr-3 text-xs w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E1E6EA] pb-3">
        <button
          onClick={() => setFilterRisk('ALL')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            filterRisk === 'ALL' ? 'bg-[#124B7A] text-white' : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          All Bidders ({rankings.length})
        </button>
        <button
          onClick={() => setFilterRisk('LOW')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            filterRisk === 'LOW' ? 'bg-[#EBF6EE] text-[#16803C] border border-[#CEEBD5]' : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          ● Low Risk (Passed)
        </button>
        <button
          onClick={() => setFilterRisk('MEDIUM')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            filterRisk === 'MEDIUM' ? 'bg-[#FEF8EC] text-[#B7791F] border border-[#FCE6BE]' : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          ● Medium Risk (Review)
        </button>
        <button
          onClick={() => setFilterRisk('HIGH')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            filterRisk === 'HIGH' ? 'bg-[#FDF2F1] text-[#C0392B] border border-[#FACDC9]' : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          ● High Risk (Disqualified)
        </button>
      </div>

      {/* Main Rankings Table */}
      <div className="gov-card overflow-hidden">
        <table className="w-full gov-table text-left">
          <thead>
            <tr>
              <th className="w-12 text-center">#</th>
              <th>Bidder Enterprise</th>
              <th>Commercial Bid</th>
              <th>Total Score</th>
              <th>Statutory</th>
              <th>Financial</th>
              <th>Technical</th>
              <th>Risk Rating</th>
              <th>AI Recommendation</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRankings.map((bid, idx) => (
              <tr
                key={bid.bid_id}
                onClick={() => onSelectBid(bid.bid_id)}
                className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
              >
                <td className="text-center font-bold text-[#5F6B76]">{idx + 1}</td>
                <td>
                  <div>
                    <p className="font-semibold text-[#17212B] hover:text-[#124B7A]">{bid.bidder_name}</p>
                    <p className="text-xs text-[#5F6B76] mt-0.5">{bid.gstin || bid.pan}</p>
                  </div>
                </td>
                <td>
                  <span className="font-semibold text-[#17212B]">₹ {bid.bid_amount_cr} Cr</span>
                </td>
                <td>
                  <span className="font-bold text-[#17212B]">{bid.compliance_score}/100</span>
                </td>
                <td><span className="text-xs text-[#5F6B76]">{bid.statutory_score}/30</span></td>
                <td><span className="text-xs text-[#5F6B76]">{bid.financial_score}/25</span></td>
                <td><span className="text-xs text-[#5F6B76]">{bid.technical_score}/25</span></td>
                <td><RiskBadge risk={bid.risk_level} size="sm" /></td>
                <td><StatusBadge status={bid.status} size="sm" /></td>
                <td className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBid(bid.bid_id);
                    }}
                    className="gov-btn-primary h-8 px-3 text-xs"
                  >
                    Inspect Dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
