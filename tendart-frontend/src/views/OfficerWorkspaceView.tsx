import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sliders,
  Send,
  Printer,
  History,
  FileText,
  Lock,
  Layers,
  Sparkles,
  BarChart3,
  RefreshCw,
  Eye,
  MessageSquare,
  Scale,
  Award,
  AlertCircle,
  Database,
  ArrowLeft
} from 'lucide-react';
import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';
import { AuditReportView } from './AuditReportView';

interface Props {
  tender: Tender;
  bids: Bid[];
  rankings: RankedBidder[];
  auditTrail: AuditLog[];
  onSelectBid: (bidId: string) => void;
  onOpenEvidenceViewer: (evidenceId: string, docId?: string, pageNumber?: number) => void;
  onRecordDecision: (decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD', remarks: string) => void;
  onRunPipeline: () => void;
  onNavigate: (view: string) => void;
}

export const OfficerWorkspaceView: React.FC<Props> = ({
  tender,
  bids,
  rankings,
  auditTrail,
  onSelectBid,
  onOpenEvidenceViewer,
  onRecordDecision,
  onRunPipeline,
  onNavigate
}) => {
  // Navigation Tabs for Officer Workspace
  const [activeOfficerTab, setActiveOfficerTab] = useState<
    | 'dashboard'
    | 'bidders'
    | 'dossier'
    | 'cross_verification'
    | 'discrepancies'
    | 'clarifications'
    | 'comparison'
    | 'audit_trail'
  >('dashboard');

  // Currently Selected Bidder for Deep Inspection
  const [selectedBidId, setSelectedBidId] = useState<string>(bids[0]?.bid_id || 'BID-2026-BHARAT-01');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  // Decision State
  const [officerDecision, setOfficerDecision] = useState<'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD'>('APPROVE');
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);
  const [decisionSuccessMsg, setDecisionSuccessMsg] = useState('');

  // Clarification Form State
  const [clarificationQuery, setClarificationQuery] = useState('');
  const [clarificationReqId, setClarificationReqId] = useState('REQ-OEM-01');
  const [clarificationSent, setClarificationSent] = useState(false);

  // Active Bidder Profile
  const currentBid = bids.find((b) => b.bid_id === selectedBidId) || bids[0] || {
    bid_id: 'BID-2026-BHARAT-01',
    bidder_name: 'Bharat Tactical & Safety Gear Pvt Ltd',
    legal_name: 'Bharat Tactical and Safety Gear Private Limited',
    pan: 'AABCB1234F',
    gstin: '07AABCB1234F1Z5',
    udyam_number: 'UDYAM-DL-02-0019283',
    bid_amount_cr: 12.8,
    compliance_score: 87,
    risk_level: 'LOW',
    compliance_status: 'QUALIFIED',
    submitted_at: '2026-08-20T14:30:00Z'
  };

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

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerRemarks) return alert('Mandatory officer justification remarks are required.');

    setIsSubmittingDecision(true);
    onRecordDecision(officerDecision, officerRemarks);
    setTimeout(() => {
      setIsSubmittingDecision(false);
      setDecisionSuccessMsg(`Official Decision Recorded: ${officerDecision} with SHA-256 cryptographic sign.`);
      setTimeout(() => setDecisionSuccessMsg(''), 4000);
    }, 500);
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationQuery) return;
    setClarificationSent(true);
    setTimeout(() => {
      setClarificationQuery('');
      setTimeout(() => setClarificationSent(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Officer Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-sm overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveOfficerTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'dashboard'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Command Center</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('bidders')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'bidders'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2. Bidder Evaluation List ({bids.length})</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('dossier')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'dossier'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>3. Compliance Dossier & Decision</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('cross_verification')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'cross_verification'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>4. Cross-Verification Matrix</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('discrepancies')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'discrepancies'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>5. Discrepancy Center</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('comparison')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'comparison'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>6. Tender-Wide Matrix</span>
          </button>

          <button
            onClick={() => setActiveOfficerTab('audit_trail')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeOfficerTab === 'audit_trail'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>7. Forensic Audit Trail</span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[#5F6B76] text-xs">
          <Lock className="w-3.5 h-3.5 text-[#124B7A]" />
          <span>Authority: Joint Director (GeM Procurement)</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. COMMAND CENTER / MAIN OVERVIEW */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top Banner Card */}
          <div className="gov-card p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                  Officer Operational Center
                </span>
                <span className="text-xs text-[#5F6B76]">Tender: {tender.tender_number}</span>
              </div>
              <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">
                AI Compliance Verification & Decision Hub
              </h1>
              <p className="text-sm text-[#5F6B76]">
                Core Principle: <strong>Tendart verifies & recommends. The Procurement Officer makes the legal qualification decision.</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onRunPipeline}
                className="gov-btn-primary h-10 px-5 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Execute AI Pipeline</span>
              </button>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Assigned Tenders</span>
              <p className="text-2xl font-bold text-[#17212B] mt-2">8 Active</p>
              <p className="text-xs text-[#5F6B76] mt-1">Under Direct Evaluation</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Bids to Review</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-2">{bids.length} Submissions</p>
              <p className="text-xs text-[#5F6B76] mt-1">OCR Ingestion Complete</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Pending Reviews</span>
              <p className="text-2xl font-bold text-[#B7791F] mt-2">2 Bidders</p>
              <p className="text-xs text-[#5F6B76] mt-1">Requiring Human Decision</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">High Risk Alerts</span>
              <p className="text-2xl font-bold text-[#C0392B] mt-2">1 Flagged</p>
              <p className="text-xs text-[#5F6B76] mt-1">Hard Constraint Failures</p>
            </div>
          </div>

          {/* Analytics Progress & Risk Distribution Bar */}
          <div className="gov-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#124B7A]" />
                <h3 className="text-sm font-bold text-[#17212B]">Tender Verification & Risk Distribution</h3>
              </div>
              <span className="text-sm font-bold text-[#16803C]">87% Evaluated</span>
            </div>

            <div className="w-full bg-[#E1E6EA] h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-[#16803C] h-full" style={{ width: '65%' }} title="Low Risk (65%)" />
              <div className="bg-[#B7791F] h-full" style={{ width: '22%' }} title="Medium Risk (22%)" />
              <div className="bg-[#C0392B] h-full" style={{ width: '13%' }} title="High Risk (13%)" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs text-[#5F6B76]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] shrink-0" />
                <span>Low Risk: <strong className="text-[#17212B]">26 Bidders</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B7791F] shrink-0" />
                <span>Medium: <strong className="text-[#17212B]">9 Bidders</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C0392B] shrink-0" />
                <span>High Risk: <strong className="text-[#17212B]">7 Bidders</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
                <span>Debarment Check: <strong className="text-[#16803C]">0 Matches</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Action Bidder Evaluation Table */}
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#17212B]">Participating Bidders Quick Action Queue</h2>
              <button
                onClick={() => setActiveOfficerTab('bidders')}
                className="text-xs font-semibold text-[#124B7A] hover:underline"
              >
                View Full Matrix →
              </button>
            </div>

            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Bidder Enterprise</th>
                  <th>Compliance Score</th>
                  <th>Risk Level</th>
                  <th>AI Recommendation</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rankings.slice(0, 4).map((bid) => (
                  <tr
                    key={bid.bid_id}
                    onClick={() => {
                      setSelectedBidId(bid.bid_id);
                      onSelectBid(bid.bid_id);
                      setActiveOfficerTab('dossier');
                    }}
                    className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td>
                      <div>
                        <p className="font-semibold text-[#17212B] hover:text-[#124B7A]">{bid.bidder_name}</p>
                        <p className="text-xs text-[#5F6B76] mt-0.5">{bid.gstin || bid.pan}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#17212B] text-sm">{bid.compliance_score}/100</span>
                        <div className="w-16 h-1.5 bg-[#E1E6EA] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bid.compliance_score >= 80 ? 'bg-[#16803C]' : bid.compliance_score >= 60 ? 'bg-[#B7791F]' : 'bg-[#C0392B]'
                            }`}
                            style={{ width: `${bid.compliance_score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <RiskBadge risk={bid.risk_level} size="sm" />
                    </td>
                    <td>
                      <StatusBadge status={bid.status} size="sm" />
                    </td>
                    <td className="text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBidId(bid.bid_id);
                          onSelectBid(bid.bid_id);
                          setActiveOfficerTab('dossier');
                        }}
                        className="gov-btn-secondary h-8 px-3 text-xs"
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
      )}

      {/* ========================================================================= */}
      {/* 2. BIDDER EVALUATION LIST */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'bidders' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Bidder Compliance Evaluation Matrix</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Filter, inspect, and evaluate all participating enterprises</p>
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

          {/* Risk Filters */}
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
                  <th>Risk Level</th>
                  <th>AI Recommendation</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((bid, idx) => (
                  <tr
                    key={bid.bid_id}
                    onClick={() => {
                      setSelectedBidId(bid.bid_id);
                      onSelectBid(bid.bid_id);
                      setActiveOfficerTab('dossier');
                    }}
                    className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="text-center font-bold text-[#5F6B76]">{idx + 1}</td>
                    <td>
                      <div>
                        <p className="font-semibold text-[#17212B] hover:text-[#124B7A]">{bid.bidder_name}</p>
                        <p className="text-xs text-[#5F6B76] mt-0.5">GST: {bid.gstin || 'N/A'}</p>
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
                          setSelectedBidId(bid.bid_id);
                          onSelectBid(bid.bid_id);
                          setActiveOfficerTab('dossier');
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
      )}

      {/* ========================================================================= */}
      {/* 3. COMPLIANCE DOSSIER & HUMAN DECISION */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'dossier' && (
        <div className="space-y-6">
          <div className="gov-card p-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E1E6EA] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                    {currentBid.bid_id}
                  </span>
                  <RiskBadge risk={currentBid.risk_level || 'LOW'} size="sm" />
                  <StatusBadge status={currentBid.compliance_status || (currentBid as any).status || 'QUALIFIED'} size="sm" />
                </div>
                <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{currentBid.legal_name || currentBid.bidder_name}</h1>
                <p className="text-xs text-[#5F6B76]">
                  Participating in: <strong className="text-[#17212B]">{tender.tender_number}</strong> — {tender.title}
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-[#5F6B76] uppercase font-semibold">Total Compliance</p>
                  <p className="text-3xl font-bold text-[#17212B] mt-0.5">{currentBid.compliance_score || 87}<span className="text-sm text-[#5F6B76] font-normal">/100</span></p>
                </div>

                <div className="text-right border-l border-[#E1E6EA] pl-6">
                  <p className="text-xs text-[#5F6B76] uppercase font-semibold">Commercial Bid</p>
                  <p className="text-2xl font-bold text-[#124B7A] mt-0.5">₹ {currentBid.bid_amount_cr} Cr</p>
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

          {/* AI Recommendation Box */}
          <div className="gov-card p-5 border-l-3 border-[#16803C] bg-[#EBF6EE]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#16803C] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI Recommendation: QUALIFY BIDDER (HIGH ELIGIBILITY)</span>
              </div>
              <button
                onClick={() => onOpenEvidenceViewer('EVID-GSTN', 'doc-123')}
                className="gov-btn-secondary h-8 px-3 text-xs flex items-center gap-1.5 bg-white shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Source PDFs</span>
              </button>
            </div>
            <p className="text-xs text-[#5F6B76] leading-relaxed">
              All 4 statutory registrations verified against live GSTN and CBDT registries. 3-Year Audited Annual Turnover (₹18.5 Cr) exceeds the mandatory ₹5.0 Cr threshold. Local content is 62.5% under DPIIT Class-I mandates.
            </p>
          </div>

          {/* Human Decision Box */}
          <div className="gov-card p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#17212B]">Procurement Officer Final Decision & Remarks</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                In compliance with GeM guidelines, the Procurement Officer exercises full legal authority to qualify or disqualify the bidder.
              </p>
            </div>

            {decisionSuccessMsg && (
              <div className="p-3 rounded-md bg-[#EBF6EE] border border-[#CEEBD5] text-[#16803C] font-bold text-xs">
                ✓ {decisionSuccessMsg}
              </div>
            )}

            <form onSubmit={handleDecisionSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label
                  className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                    officerDecision === 'APPROVE'
                      ? 'bg-[#EBF6EE] border-[#16803C] text-[#16803C] font-bold'
                      : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="decision"
                    value="APPROVE"
                    checked={officerDecision === 'APPROVE'}
                    onChange={() => setOfficerDecision('APPROVE')}
                    className="sr-only"
                  />
                  <span>● Qualify Bidder</span>
                </label>

                <label
                  className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                    officerDecision === 'HOLD'
                      ? 'bg-[#FEF8EC] border-[#B7791F] text-[#B7791F] font-bold'
                      : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="decision"
                    value="HOLD"
                    checked={officerDecision === 'HOLD'}
                    onChange={() => setOfficerDecision('HOLD')}
                    className="sr-only"
                  />
                  <span>● Hold for Manual Review</span>
                </label>

                <label
                  className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                    officerDecision === 'REQUEST_CLARIFICATION'
                      ? 'bg-[#EBF3FA] border-[#124B7A] text-[#124B7A] font-bold'
                      : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="decision"
                    value="REQUEST_CLARIFICATION"
                    checked={officerDecision === 'REQUEST_CLARIFICATION'}
                    onChange={() => setOfficerDecision('REQUEST_CLARIFICATION')}
                    className="sr-only"
                  />
                  <span>● Request Clarification</span>
                </label>

                <label
                  className={`p-3 rounded-md border text-center cursor-pointer transition-colors ${
                    officerDecision === 'REJECT'
                      ? 'bg-[#FDF2F1] border-[#C0392B] text-[#C0392B] font-bold'
                      : 'bg-[#FFFFFF] border-[#E1E6EA] text-[#5F6B76] hover:bg-[#F6F8FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="decision"
                    value="REJECT"
                    checked={officerDecision === 'REJECT'}
                    onChange={() => setOfficerDecision('REJECT')}
                    className="sr-only"
                  />
                  <span>● Disqualify Bidder</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1.5">
                  Official Justification & Audit Remarks (Mandatory) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  placeholder="State the official rationale, reference circular numbers, or corrigendum details..."
                  className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[#5F6B76] text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                  <span>Decision cryptographically signed with SHA-256</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingDecision}
                  className="gov-btn-primary h-10 px-6 text-xs"
                >
                  {isSubmittingDecision ? 'Recording Decision...' : 'Confirm & Sign Decision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CROSS-DOCUMENT VERIFICATION MATRIX */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'cross_verification' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Cross-Document Entity Consistency Matrix</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">
              Cross-validates legal identity across PAN ↔ GSTN ↔ Udyam ↔ MCA ↔ Audited Financials
            </p>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Field / Entity Parameter</th>
                  <th>Document Source</th>
                  <th>Extracted Value</th>
                  <th>Government Portal Data</th>
                  <th>Cross-Match Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Legal Corporate Name</span></td>
                  <td>GST Registration REG-06</td>
                  <td>Bharat Tactical and Safety Gear Private Limited</td>
                  <td>Bharat Tactical and Safety Gear Private Limited (GSTN)</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ 100% Match</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Permanent Account Number (PAN)</span></td>
                  <td>PAN Card Copy</td>
                  <td className="font-mono">AABCB1234F</td>
                  <td className="font-mono">AABCB1234F (Income Tax CBDT)</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Valid Regular</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Registered Address</span></td>
                  <td>Form GST REG-06</td>
                  <td>Plot 14, Okhla Industrial Area Phase-III, New Delhi</td>
                  <td>Plot 14, Okhla Phase 3, Delhi - 110020</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Verified Address</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">3-Year Turnover Statement</span></td>
                  <td>CA Balance Sheet</td>
                  <td>₹ 18.50 Crores Avg</td>
                  <td>Tax Returns ₹19.20 Cr (CBDT)</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Exceeds Threshold</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">CPPP Debarment List</span></td>
                  <td>National Vigilance Registry</td>
                  <td>0 Debarment Records</td>
                  <td>Clear (8 Portals Queried)</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Clear No Blacklist</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DISCREPANCY CENTER & CLARIFICATION WORKFLOW */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'discrepancies' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Discrepancy Center & Clarifications</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Manage flagged discrepancies and dispatch official queries to bidders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Col: Flagged Discrepancies */}
            <div className="gov-card p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2 border-b border-[#E1E6EA] pb-3">
                <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
                <span>Flagged Observations on {currentBid.legal_name}</span>
              </h2>

              <div className="p-3 bg-[#FEF8EC]/50 rounded-md border border-[#FCE6BE] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17212B]">Plant Address Slight Variation</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF8EC] text-[#B7791F] border border-[#FCE6BE]">LOW SEVERITY</span>
                </div>
                <p className="text-[#5F6B76]">
                  GST certificate states "Plot 14, Okhla Phase-III" whereas OEM authorization refers to "Okhla Industrial Estate".
                </p>
                <div className="flex items-center gap-4 text-[11px] text-[#5F6B76] pt-1">
                  <span>Confidence: <strong className="text-[#16803C]">96% Ground Truth</strong></span>
                  <span>Recommendation: <strong className="text-[#124B7A]">Accept as Non-Material</strong></span>
                </div>
              </div>
            </div>

            {/* Right Col: Dispatch Clarification Form */}
            <div className="gov-card p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2 border-b border-[#E1E6EA] pb-3">
                <MessageSquare className="w-4 h-4 text-[#124B7A]" />
                <span>Dispatch Official Clarification Query</span>
              </h2>

              {clarificationSent && (
                <div className="p-2.5 rounded bg-[#EBF6EE] border border-[#CEEBD5] text-[#16803C] text-xs font-bold">
                  ✓ Clarification request sent to bidder with 48-hour response deadline.
                </div>
              )}

              <form onSubmit={handleSendClarification} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#5F6B76] uppercase font-semibold mb-1">Requirement Affected</label>
                  <select
                    value={clarificationReqId}
                    onChange={(e) => setClarificationReqId(e.target.value)}
                    className="w-full h-9 px-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded text-[#17212B] text-xs focus:border-[#124B7A]"
                  >
                    <option value="REQ-OEM-01">OEM Authorization Letter (Annexure IV)</option>
                    <option value="REQ-TURNOVER-01">Audited Financial Turnover</option>
                    <option value="REQ-MII-01">Make in India Local Content Declaration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#5F6B76] uppercase font-semibold mb-1">Officer Query & Instructions</label>
                  <textarea
                    rows={3}
                    value={clarificationQuery}
                    onChange={(e) => setClarificationQuery(e.target.value)}
                    placeholder="Enter explicit clarification instructions for the vendor..."
                    className="w-full p-2.5 bg-[#FFFFFF] border border-[#CBD3DA] rounded text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="gov-btn-primary w-full h-9 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Clarification to Vendor (48h Window)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TENDER-WIDE COMPARISON MATRIX */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'comparison' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Tender-Wide Rule Compliance Matrix</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Side-by-side compliance overview across all competing bidders</p>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Tender Rule / Requirement</th>
                  <th>Bharat Tactical</th>
                  <th>Surya Infotech</th>
                  <th>Zenith Trade</th>
                  <th>Apex Global</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">1. GST Active Status</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Compliant</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Compliant</span></td>
                  <td><span className="text-[#C0392B] font-semibold">❌ Cancelled GST</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Compliant</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">2. PAN Verification</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Matched</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Matched</span></td>
                  <td><span className="text-[#C0392B] font-semibold">❌ Mismatch</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Matched</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">3. Turnover ≥ ₹5.0 Cr</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ ₹ 18.5 Cr</span></td>
                  <td><span className="text-[#B7791F] font-semibold">⚠️ ₹ 4.8 Cr (Marginal)</span></td>
                  <td><span className="text-[#C0392B] font-semibold">❌ ₹ 1.2 Cr</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ ₹ 22.0 Cr</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">4. OEM Authorization</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Valid 2026</span></td>
                  <td><span className="text-[#B7791F] font-semibold">⚠️ Expiring Soon</span></td>
                  <td><span className="text-[#C0392B] font-semibold">❌ Missing</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ Valid</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">5. Make in India ≥ 50%</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 62.5%</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 54.0%</span></td>
                  <td><span className="text-[#C0392B] font-semibold">❌ 28.0%</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 70.0%</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">6. National Debarment Check</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 0 Matches</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 0 Matches</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 0 Matches</span></td>
                  <td><span className="text-[#16803C] font-semibold">✅ 0 Matches</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. FORENSIC AUDIT TRAIL */}
      {/* ========================================================================= */}
      {activeOfficerTab === 'audit_trail' && (
        <AuditReportView
          tender={tender}
          bid={currentBid as Bid}
          auditTrail={auditTrail}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
