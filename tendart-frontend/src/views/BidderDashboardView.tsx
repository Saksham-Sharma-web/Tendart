import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Building2,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  FolderLock,
  Layers,
  Inbox,
  UserCheck,
  Search,
  Check,
  Eye,
  Award,
  HelpCircle,
  IndianRupee,
  Calendar,
  Building,
  Download,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';
import { Tender, Bid } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';

interface Props {
  tender: Tender;
  bids: Bid[];
  activeView?: string;
  onNavigate: (view: string) => void;
  onSelectTender: (id: string | null) => void;
}

export const BidderDashboardView: React.FC<Props> = ({ tender, bids, activeView, onNavigate, onSelectTender }) => {
  // Navigation Flow State:
  // 'feed' (Explore list of tenders) | 'tender_detail' (Inspect full 15-section tender) | 'bidding' (Prepare & submit bid) | 'vault' | 'profile' | 'submitted_bid'
  const [currentFlowStage, setCurrentFlowStage] = useState<'feed' | 'tender_detail' | 'bidding' | 'vault' | 'profile' | 'submitted_bid'>(activeView === 'tender_my_bid' ? 'submitted_bid' : 'feed');

  // Currently Selected Tender
  const [selectedTender, setSelectedTender] = useState<Tender | null>(activeView === 'tender_my_bid' ? tender : null);

  // Sub-tabs inside the Bidding Submission Stage
  const [biddingStep, setBiddingStep] = useState<'pre_check' | 'commercial_quote' | 'submission_status' | 'clarifications'>('pre_check');

  // Search & Category Filters for Tender Feed
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'SAFETY' | 'VALVES' | 'POWER'>('ALL');

  // Available Published Tenders Feed
  const availableTenders: (Tender & { category: string; categoryLabel: string; vaultMatchScore: number; matchCriteria: string; emd: string; tenderFee: string; validity: string })[] = [
    {
      tender_id: 'TND-GEM-2026-002',
      tender_number: 'CPCL/2026/VALVE-881',
      title: 'PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS',
      department: 'Chennai Petroleum Corporation Limited (CPCL)',
      description: 'Procurement of industrial safety valves including supply, installation, testing and commissioning for refinery operations.',
      estimated_value_cr: 24.50,
      emd: '₹ 24.50 Lakh',
      tenderFee: '₹ 5,000',
      validity: '180 Days',
      submission_deadline: '2026-08-28T17:00:00Z',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Refinery Chief Engineer (CPCL)',
      created_at: '2026-08-18T10:00:00Z',
      category: 'VALVES',
      categoryLabel: 'Refinery Valves & Piping',
      vaultMatchScore: 82,
      matchCriteria: '5 of 6 Documents Ready in Vault',
      requirements: []
    },
    {
      tender_id: 'TND-GEM-2026-001',
      tender_number: 'GEM/2026/B/891240',
      title: 'Procurement of Industrial & Tactical Safety Equipment',
      department: 'Chennai Petroleum Corporation Limited (CPCL) / Logistics Div',
      description: 'National competitive bid for supply, testing, and delivery of PPE, tactical body armor, and biometric tracking gear under Make-in-India mandates.',
      estimated_value_cr: 15.0,
      emd: '₹ 15.00 Lakh',
      tenderFee: '₹ 2,500',
      validity: '180 Days',
      submission_deadline: '2026-09-15T17:00:00Z',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Director of Procurement (CPCL)',
      created_at: '2026-08-01T10:00:00Z',
      category: 'SAFETY',
      categoryLabel: 'Industrial Safety Gear',
      vaultMatchScore: 94,
      matchCriteria: '6 of 6 Documents Ready in Vault',
      requirements: []
    },
    {
      tender_id: 'TND-GEM-2026-003',
      tender_number: 'GEM/2026/B/901844',
      title: 'Smart Grid Monitoring Substation Sensors & Telemetry Units',
      department: 'Power Grid Corporation of India / Power Systems Div',
      description: 'Supply, calibration, and cloud-integration of industrial smart telemetry sensors, surge protectors, and RTUs under DPIIT Class-1 requirements.',
      estimated_value_cr: 18.5,
      emd: '₹ 18.50 Lakh',
      tenderFee: '₹ 5,000',
      validity: '180 Days',
      submission_deadline: '2026-10-30T17:00:00Z',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Chief Procurement Officer',
      created_at: '2026-08-12T10:00:00Z',
      category: 'POWER',
      categoryLabel: 'Power Grid Telemetry',
      vaultMatchScore: 68,
      matchCriteria: '4 of 6 Documents Ready in Vault',
      requirements: []
    }
  ];

  // Reusable Document Vault State
  const [vaultDocs] = useState([
    { id: 'DOC-GST', name: 'Form GST REG-06 Certificate', category: 'Statutory', size: '1.8 MB', verified: true, date: '2026-08-10', expiry: '15 days' },
    { id: 'DOC-PAN', name: 'Permanent Account Number (PAN) Card', category: 'Statutory', size: '0.9 MB', verified: true, date: '2026-08-10', expiry: 'Valid' },
    { id: 'DOC-UDYAM', name: 'Udyam MSME Registration Certificate', category: 'MSME', size: '1.2 MB', verified: true, date: '2026-08-12', expiry: 'Valid' },
    { id: 'DOC-FIN', name: '3-Year CA Audited Financial Statements (₹18.5 Cr)', category: 'Financial', size: '4.5 MB', verified: true, date: '2026-08-15', expiry: 'Valid' },
    { id: 'DOC-OEM', name: 'OEM Authorization Letter (Annexure IV)', category: 'Technical', size: '1.4 MB', verified: true, date: '2026-08-18', expiry: '7 days' },
    { id: 'DOC-MII', name: 'Class-1 Make-in-India Self Declaration (62.5%)', category: 'Local Content', size: '0.8 MB', verified: true, date: '2026-08-19', expiry: 'Valid' }
  ]);

  // Pre-Submission Check State
  const [preCheckRun, setPreCheckRun] = useState(false);
  const [isPreChecking, setIsPreChecking] = useState(false);
  const [undertakingSigned, setUndertakingSigned] = useState(true);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [commercialQuote, setCommercialQuote] = useState<number>(24.50);

  // Clarification reply state
  const [clarificationReply, setClarificationReply] = useState('');
  const [clarificationSent, setClarificationSent] = useState(false);

  // Filtered feed
  const filteredTenders = availableTenders.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tender_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stage Handlers
  const handleOpenTenderDetail = (t: Tender) => {
    setSelectedTender(t);
    // If they already submitted a bid, default to showing the submitted bid details, otherwise tender details
    const existingBid = bids.find(b => b.tender_id === t.tender_id && (b.bidder_name === 'Bharat Tactical & Safety Gear Pvt Ltd' || b.bidder_name === 'Bharat Tactical and Safety Gear Pvt Ltd'));
    if (existingBid) {
      setCurrentFlowStage('submitted_bid');
    } else {
      setCurrentFlowStage('tender_detail');
    }
    onSelectTender?.(t.tender_id);
  };

  const handleStartBidding = () => {
    onNavigate('bid_submission');
  };

  const handleBackToFeed = () => {
    setSelectedTender(null);
    setCurrentFlowStage('feed');
    onSelectTender?.('');
  };

  const handleExecutePreCheck = () => {
    setIsPreChecking(true);
    setTimeout(() => {
      setIsPreChecking(false);
      setPreCheckRun(true);
    }, 600);
  };

  const handleFinalSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!undertakingSigned) return alert('Please check the mandatory legal declaration before submitting.');
    setBidSubmitted(true);
    setBiddingStep('submission_status');
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationReply) return;
    setClarificationSent(true);
    setTimeout(() => {
      setClarificationReply('');
      setTimeout(() => setClarificationSent(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Header Bar for Bidder Portal */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleBackToFeed()}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
              currentFlowStage === 'feed'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>1. Browse Tenders Feed ({availableTenders.length})</span>
          </button>

          <button
            onClick={() => setCurrentFlowStage('vault')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
              currentFlowStage === 'vault'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span>2. Document Vault ({vaultDocs.length})</span>
          </button>

          <button
            onClick={() => setCurrentFlowStage('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
              currentFlowStage === 'profile'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>3. Enterprise Profile</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#5F6B76] text-xs">
          <Lock className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Vendor Privacy: Confidential Isolation</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: LANDING PAGE — TENDERS FEED WITH FILTERS */}
      {/* ========================================================================= */}
      {currentFlowStage === 'feed' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                GeM Active Tenders Feed
              </span>
              <h1 className="text-2xl font-bold text-[#17212B] mt-1">Explore Published GeM Procurement Tenders</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                Click on any tender card to open the complete official specification, extracted requirements, and application portal.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#8A949E] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CPCL, safety valves, sensors..."
                className="gov-input pl-9 pr-3 text-xs w-72 h-9"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#124B7A] text-white'
                  : 'bg-white border border-[#E1E6EA] text-[#5F6B76] hover:text-[#17212B]'
              }`}
            >
              All Categories ({availableTenders.length})
            </button>
            <button
              onClick={() => setSelectedCategory('VALVES')}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedCategory === 'VALVES'
                  ? 'bg-[#124B7A] text-white'
                  : 'bg-white border border-[#E1E6EA] text-[#5F6B76] hover:text-[#17212B]'
              }`}
            >
              Refinery Valves & Piping
            </button>
            <button
              onClick={() => setSelectedCategory('SAFETY')}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedCategory === 'SAFETY'
                  ? 'bg-[#124B7A] text-white'
                  : 'bg-white border border-[#E1E6EA] text-[#5F6B76] hover:text-[#17212B]'
              }`}
            >
              Industrial Safety Gear
            </button>
            <button
              onClick={() => setSelectedCategory('POWER')}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedCategory === 'POWER'
                  ? 'bg-[#124B7A] text-white'
                  : 'bg-white border border-[#E1E6EA] text-[#5F6B76] hover:text-[#17212B]'
              }`}
            >
              Power Grid Telemetry
            </button>
          </div>

          {/* Tenders Feed Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredTenders.map((t) => (
              <div
                key={t.tender_id}
                onClick={() => handleOpenTenderDetail(t)}
                className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#124B7A] cursor-pointer transition-all shadow-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#124B7A] text-xs bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                      {t.tender_number}
                    </span>
                    <StatusBadge status="ACTIVE" size="sm" />
                    <span className="text-[11px] text-[#5F6B76]">• {t.department}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#17212B] hover:text-[#124B7A] transition-colors">{t.title}</h3>
                  <p className="text-xs text-[#5F6B76] line-clamp-2">{t.description}</p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-[#16803C] font-semibold bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t.vaultMatchScore}% Vault Match ({t.matchCriteria})</span>
                    </div>
                    <span className="text-[#5F6B76]">
                      EMD: <strong className="text-[#17212B]">{t.emd}</strong>
                    </span>
                    <span className="text-[#5F6B76]">
                      Deadline: <strong className="text-[#17212B]">{new Date(t.submission_deadline).toLocaleDateString()}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 border-t md:border-t-0 md:border-l border-[#E1E6EA] pt-4 md:pt-0 md:pl-6">
                  <div className="text-right">
                    <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Tender Value</span>
                    <p className="text-2xl font-bold text-[#124B7A]">₹ {t.estimated_value_cr} Cr</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenTenderDetail(t);
                    }}
                    className="gov-btn-primary h-10 px-5 text-xs flex items-center gap-2"
                  >
                    <span>View Tender Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* STAGE 2: 15-SECTION OFFICIAL TENDER DETAIL SCREEN */}
      {/* ========================================================================= */}
      {currentFlowStage === 'tender_detail' && (
        <div className="space-y-6">
          {/* Breadcrumb Bar */}
          <div className="flex items-center justify-between text-xs text-[#5F6B76] border-b border-[#E1E6EA] pb-3">
            <div className="flex items-center gap-2">
              <button onClick={handleBackToFeed} className="hover:text-[#124B7A] flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span>Tenders</span>
              <span>/</span>
              <span>CPCL</span>
              <span>/</span>
              <span className="text-[#17212B] font-bold">{selectedTender?.tender_number || 'CPCL/2026/VALVE-881'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-[#124B7A] hover:underline font-semibold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Help Desk</span>
              </button>
            </div>
          </div>

          {/* Hero Header Card */}
          <div className="gov-card p-6 lg:p-7 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#124B7A] text-sm bg-[#EBF3FA] px-3 py-1 rounded border border-[#D0E2F2]">
                {selectedTender?.tender_number || 'CPCL/2026/VALVE-881'}
              </span>

              <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16803C]" />
                OPEN FOR SUBMISSION
              </span>
            </div>

            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#17212B] tracking-tight">
                {selectedTender?.title || 'PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS'}
              </h1>
              <p className="text-xs text-[#5F6B76] mt-1 font-medium">
                {selectedTender?.department || 'Chennai Petroleum Corporation Limited (CPCL)'} • Ministry of Petroleum & Natural Gas • Government of India
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#5F6B76] border-y border-[#E1E6EA] py-3">
              <span>Published: <strong className="text-[#17212B]">18 Aug 2026</strong></span>
              <span>Bid Submission Ends: <strong className="text-[#C0392B]">28 Aug 2026, 17:00 IST</strong></span>
            </div>

            {/* 4 Top Highlight Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">ESTIMATED VALUE</span>
                <p className="text-2xl font-bold text-[#124B7A] mt-1">₹ 24.50 Cr</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">EARNEST MONEY</span>
                <p className="text-2xl font-bold text-[#17212B] mt-1">₹ 24.50 Lakh</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">TENDER FEE</span>
                <p className="text-2xl font-bold text-[#17212B] mt-1">₹ 5,000</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">BID VALIDITY</span>
                <p className="text-2xl font-bold text-[#17212B] mt-1">180 Days</p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button className="gov-btn-secondary h-11 px-5 text-xs flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download Tender</span>
              </button>

              <button
                onClick={handleStartBidding}
                className="gov-btn-primary h-11 px-7 text-xs font-bold flex items-center gap-2"
              >
                <span>Apply for this Tender</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Column Overview & Deadlines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col (2 cols wide): Tender Overview */}
            <div className="lg:col-span-2 gov-card p-6 space-y-4">
              <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-3 uppercase tracking-wider text-[11px] text-[#5F6B76]">
                TENDER OVERVIEW
              </h2>

              <p className="text-xs text-[#17212B] leading-relaxed">
                Procurement of industrial safety valves including supply, installation, testing and commissioning for refinery operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Tender Type:</span>
                  <span className="font-semibold text-[#17212B]">Open Tender</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Procurement Category:</span>
                  <span className="font-semibold text-[#17212B]">Goods & Services</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Tender Mode:</span>
                  <span className="font-semibold text-[#17212B]">Online (GeM)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Location:</span>
                  <span className="font-semibold text-[#17212B]">Chennai, Tamil Nadu</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Contract Period:</span>
                  <span className="font-semibold text-[#17212B]">12 Months</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                  <span className="text-[#5F6B76]">Tender Reference:</span>
                  <span className="font-mono font-semibold text-[#124B7A]">CPCL/2026/VALVE-881</span>
                </div>
              </div>
            </div>

            {/* Right Col: Submission Deadline & Quick Details */}
            <div className="space-y-4">
              <div className="gov-card p-6 space-y-3 bg-[#FFFFFF]">
                <h3 className="text-[11px] font-bold text-[#5F6B76] uppercase tracking-wider">SUBMISSION DEADLINE</h3>
                <div>
                  <p className="text-2xl font-bold text-[#C0392B]">28 AUG 2026</p>
                  <p className="text-xs text-[#5F6B76] mt-0.5">17:00 IST • <strong>1 day 22 hours left</strong></p>
                </div>

                <button
                  onClick={handleStartBidding}
                  className="w-full gov-btn-primary h-10 text-xs font-bold mt-2"
                >
                  Start Application
                </button>
              </div>

              <div className="gov-card p-5 space-y-2 text-xs">
                <h3 className="text-[11px] font-bold text-[#5F6B76] uppercase tracking-wider border-b border-[#E1E6EA] pb-2">
                  QUICK DETAILS
                </h3>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#5F6B76]">Bid Type:</span>
                    <span className="font-semibold text-[#17212B]">2 Cover (Tech + Fin)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6B76]">Bid Opening:</span>
                    <span className="font-semibold text-[#17212B]">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6B76]">Consortium:</span>
                    <span className="font-semibold text-[#16803C]">Allowed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6B76]">Subcontracting:</span>
                    <span className="font-semibold text-[#16803C]">Allowed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6B76]">Currency:</span>
                    <span className="font-semibold text-[#17212B]">INR (₹)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="border-t border-[#E1E6EA] pt-4">
            <span className="text-xs font-bold text-[#5F6B76] uppercase tracking-wider">
              TENDER INFORMATION & REQUIREMENTS SPECIFICATION
            </span>
          </div>

          {/* 01 DESCRIPTION & SCOPE OF WORK */}
          <div className="gov-card p-6 space-y-3">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">01</span>
              <span>DESCRIPTION & SCOPE OF WORK</span>
            </h2>
            <p className="text-xs text-[#17212B] leading-relaxed">
              The successful bidder shall supply, install, test and commission industrial safety valves as specified in the technical specification and BOQ.
            </p>
            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1.5 text-xs text-[#17212B]">
              <span className="font-semibold text-[#5F6B76] block mb-1">Scope includes:</span>
              <p>• Supply of safety and pressure-control valves</p>
              <p>• Factory inspection and testing</p>
              <p>• Transportation to CPCL facility</p>
              <p>• Installation and commissioning</p>
              <p>• Site testing and acceptance</p>
              <p>• Training and technical documentation</p>
              <p>• Warranty and post-installation support</p>
            </div>
          </div>

          {/* 02 ELIGIBILITY & QUALIFICATION REQUIREMENTS */}
          <div className="gov-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
              <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                <span className="font-mono text-[#124B7A]">02</span>
                <span>ELIGIBILITY & QUALIFICATION REQUIREMENTS</span>
              </h2>
              <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">
                82% Profile Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
                <span className="font-bold text-[#124B7A] uppercase text-[11px]">ORGANISATIONAL REQUIREMENTS</span>
                <p className="text-[#16803C]">✓ Valid GST registration (Active regular status)</p>
                <p className="text-[#16803C]">✓ Valid Income Tax PAN</p>
                <p className="text-[#16803C]">✓ Legally registered business entity</p>
                <p className="text-[#16803C]">✓ Minimum average annual turnover of ₹50 Cr during the last 3 financial years</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
                <span className="font-bold text-[#124B7A] uppercase text-[11px]">EXPERIENCE REQUIREMENTS</span>
                <p className="text-[#16803C]">✓ Minimum 5 years of relevant experience</p>
                <p className="text-[#16803C]">✓ At least 2 completed contracts of comparable nature</p>
                <p className="text-[#16803C]">✓ Experience certificate from eligible clients</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
                <span className="font-bold text-[#124B7A] uppercase text-[11px]">TECHNICAL REQUIREMENTS</span>
                <p className="text-[#16803C]">✓ OEM authorization / manufacturer authorization</p>
                <p className="text-[#16803C]">✓ Compliance with applicable technical standards</p>
                <p className="text-[#16803C]">✓ Product testing certificates</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
                <span className="font-bold text-[#124B7A] uppercase text-[11px]">OTHER REQUIREMENTS</span>
                <p className="text-[#16803C]">✓ Make in India declaration (≥ 50% Class-1)</p>
                <p className="text-[#16803C]">✓ No debarment / blacklisting declaration</p>
                <p className="text-[#16803C]">✓ Acceptance of tender terms and conditions</p>
              </div>
            </div>
          </div>

          {/* 03 BID STRUCTURE (TWO-COVER SYSTEM) */}
          <div className="gov-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">03</span>
              <span>BID STRUCTURE (TWO-COVER SYSTEM)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#EBF3FA] rounded-md border border-[#D0E2F2] space-y-2">
                <div className="flex items-center justify-between border-b border-[#D0E2F2] pb-2">
                  <span className="font-bold text-[#124B7A]">COVER 1: TECHNICAL BID</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#124B7A] font-semibold">Stage 1 + 2</span>
                </div>
                <p>• Eligibility documents</p>
                <p>• Technical specifications & datasheets</p>
                <p>• Statutory certificates (GST, PAN, UDIN)</p>
                <p>• Declarations & OEM authorization</p>
              </div>

              <div className="p-4 bg-[#EBF6EE] rounded-md border border-[#CEEBD5] space-y-2">
                <div className="flex items-center justify-between border-b border-[#CEEBD5] pb-2">
                  <span className="font-bold text-[#16803C]">COVER 2: FINANCIAL BID</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#16803C] font-semibold">Stage 3</span>
                </div>
                <p>• BOQ / Price Schedule Excel Sheet</p>
                <p>• Commercial quotation in INR</p>
                <p>• Applicable GST and tax breakdown</p>
                <p>• Commercial terms & validity</p>
              </div>
            </div>
          </div>

          {/* 04 DOCUMENTS REQUIRED TABLE */}
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                <span className="font-mono text-[#124B7A]">04</span>
                <span>DOCUMENTS REQUIRED CHECKLIST</span>
              </h2>
              <span className="text-xs text-[#5F6B76]">10 Mandatory Documents</span>
            </div>

            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>DOCUMENT NAME</th>
                  <th>REQUIRED</th>
                  <th>FORMAT</th>
                  <th>MAX SIZE</th>
                  <th>VAULT STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold text-[#17212B]">PAN Certificate</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">10 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#17212B]">GST Registration Certificate</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">10 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#17212B]">Company Registration Certificate</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">10 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#17212B]">Turnover Certificate / Audited Financials</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">20 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#17212B]">OEM Authorization Letter (Annexure IV)</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">10 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#17212B]">Make in India Declaration</td>
                  <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                  <td className="font-mono text-xs">PDF</td>
                  <td className="text-xs text-[#5F6B76]">10 MB</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ In Vault</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 05 TENDER DOCUMENTS */}
          <div className="gov-card p-6 space-y-3">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">05</span>
              <span>TENDER DOCUMENTS (DOWNLOAD & PREVIEW)</span>
            </h2>

            <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md text-xs">
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">Tender Document.pdf</span>
                  <span className="text-[11px] text-[#5F6B76]">(4.8 MB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Preview</button>
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">Technical Specification.pdf</span>
                  <span className="text-[11px] text-[#5F6B76]">(2.1 MB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Preview</button>
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-[#16803C]" />
                  <span className="font-semibold text-[#17212B]">BOQ Price Schedule.xlsx</span>
                  <span className="text-[11px] text-[#5F6B76]">(184 KB)</span>
                </div>
                <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#124B7A]" />
                  <span className="font-semibold text-[#17212B]">General Terms & Conditions (GTC).pdf</span>
                  <span className="text-[11px] text-[#5F6B76]">(1.3 MB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Preview</button>
                  <button className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
                </div>
              </div>
            </div>
          </div>

          {/* 06 FINANCIAL INFORMATION */}
          <div className="gov-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">06</span>
              <span>FINANCIAL INFORMATION & DEPOSITS</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] flex justify-between">
                <span className="text-[#5F6B76]">Estimated Tender Value:</span>
                <span className="font-bold text-[#124B7A]">₹ 24,50,00,000 (₹24.50 Cr)</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] flex justify-between">
                <span className="text-[#5F6B76]">Earnest Money Deposit (EMD):</span>
                <span className="font-bold text-[#17212B]">₹ 24,50,000 (1%)</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] flex justify-between">
                <span className="text-[#5F6B76]">Tender Fee:</span>
                <span className="font-bold text-[#17212B]">₹ 5,000</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] flex justify-between">
                <span className="text-[#5F6B76]">Performance Security:</span>
                <span className="font-bold text-[#17212B]">5% of Contract Value</span>
              </div>
            </div>
          </div>

          {/* 07 IMPORTANT DATES TIMELINE */}
          <div className="gov-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">07</span>
              <span>IMPORTANT DATES & MILESTONES (IST)</span>
            </h2>

            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="p-2 bg-white rounded border border-[#E1E6EA]">
                  <p className="font-bold text-[#124B7A]">18 AUG 2026</p>
                  <p className="text-[11px] text-[#5F6B76] mt-0.5">Published</p>
                </div>
                <div className="p-2 bg-white rounded border border-[#E1E6EA]">
                  <p className="font-bold text-[#124B7A]">22 AUG 2026</p>
                  <p className="text-[11px] text-[#5F6B76] mt-0.5">Pre-Bid Meeting</p>
                </div>
                <div className="p-2 bg-white rounded border border-[#E1E6EA]">
                  <p className="font-bold text-[#124B7A]">24 AUG 2026</p>
                  <p className="text-[11px] text-[#5F6B76] mt-0.5">Queries Deadline</p>
                </div>
                <div className="p-2 bg-[#FDF2F1] rounded border border-[#FACDC9]">
                  <p className="font-bold text-[#C0392B]">28 AUG 2026</p>
                  <p className="text-[11px] text-[#C0392B] mt-0.5">Bid Closing 17:00</p>
                </div>
                <div className="p-2 bg-white rounded border border-[#E1E6EA]">
                  <p className="font-bold text-[#124B7A]">29 AUG 2026</p>
                  <p className="text-[11px] text-[#5F6B76] mt-0.5">Bid Opening 11:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* 08 TECHNICAL SPECIFICATIONS */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">08</span>
              <span>TECHNICAL SPECIFICATIONS PARAMETERS</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                <span className="text-[#5F6B76]">Product Category:</span>
                <span className="font-semibold text-[#17212B]">Industrial Safety Valves</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                <span className="text-[#5F6B76]">Applicable Standard:</span>
                <span className="font-semibold text-[#17212B]">API / ASME Standard</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                <span className="text-[#5F6B76]">Operating Environment:</span>
                <span className="font-semibold text-[#17212B]">Refinery Operations</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAEFF3]">
                <span className="text-[#5F6B76]">Inspection:</span>
                <span className="font-semibold text-[#17212B]">Mandatory Third-Party</span>
              </div>
            </div>
          </div>

          {/* 09 EVALUATION METHOD */}
          <div className="gov-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">09</span>
              <span>EVALUATION METHODOLOGY (3 STAGES)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1">
                <span className="font-bold text-[#124B7A]">STAGE 1: ELIGIBILITY</span>
                <p className="text-[#5F6B76]">Mandatory compliance check against hard criteria (GST, Turnover, OEM).</p>
              </div>
              <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1">
                <span className="font-bold text-[#124B7A]">STAGE 2: TECHNICAL</span>
                <p className="text-[#5F6B76]">Detailed technical datasheet and testing compliance scoring.</p>
              </div>
              <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1">
                <span className="font-bold text-[#124B7A]">STAGE 3: FINANCIAL</span>
                <p className="text-[#5F6B76]">Opening of commercial price bids of technically qualified bidders.</p>
              </div>
            </div>
          </div>

          {/* 10 AI PRE-SUBMISSION COMPLIANCE CHECK */}
          <div className="gov-card p-6 space-y-4 border-l-4 border-[#124B7A]">
            <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
              <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                <span className="font-mono text-[#124B7A]">10</span>
                <span>AI PRE-SUBMISSION COMPLIANCE CHECK</span>
              </h2>
              <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">
                82% Profile Match
              </span>
            </div>

            <p className="text-xs text-[#5F6B76]">
              TENDART can compare your profile and documents against the published tender requirements before submission. This is an assistance tool and does not constitute an official eligibility decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] text-center">
                <span className="text-[#5F6B76] block">Requirements</span>
                <span className="font-bold text-[#16803C] text-sm mt-0.5">6 / 6 identified</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] text-center">
                <span className="text-[#5F6B76] block">Documents</span>
                <span className="font-bold text-[#124B7A] text-sm mt-0.5">11 required</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] text-center">
                <span className="text-[#5F6B76] block">Profile Match</span>
                <span className="font-bold text-[#16803C] text-sm mt-0.5">Ready to check</span>
              </div>
            </div>

            <button
              onClick={handleStartBidding}
              className="gov-btn-primary h-10 px-5 text-xs flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Run Pre-Submission Check</span>
            </button>
          </div>

          {/* 11 AMENDMENTS & CLARIFICATIONS */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">11</span>
              <span>AMENDMENTS & CLARIFICATIONS LOG</span>
            </h2>

            <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md">
              <div className="p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#124B7A] mr-2">24 Aug 2026 • Amendment 02</span>
                  <span className="text-[#5F6B76]">Technical specification updated</span>
                </div>
                <button className="text-xs text-[#124B7A] font-semibold hover:underline">View</button>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#124B7A] mr-2">21 Aug 2026 • Amendment 01</span>
                  <span className="text-[#5F6B76]">Pre-bid meeting date updated</span>
                </div>
                <button className="text-xs text-[#124B7A] font-semibold hover:underline">View</button>
              </div>
            </div>
          </div>

          {/* 12 PRE-BID MEETING */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">12</span>
              <span>PRE-BID MEETING DETAILS</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Date:</span>
                <span className="font-bold text-[#17212B]">22 Aug 2026</span>
              </div>
              <div className="p-2.5 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Time:</span>
                <span className="font-bold text-[#17212B]">11:00 IST</span>
              </div>
              <div className="p-2.5 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Mode:</span>
                <span className="font-bold text-[#17212B]">Online (Video)</span>
              </div>
              <div className="p-2.5 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Link:</span>
                <span className="font-bold text-[#124B7A]">Available to Bidders</span>
              </div>
            </div>
          </div>

          {/* 13 TERMS & CONDITIONS */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">13</span>
              <span>TERMS & CONDITIONS APPLICABLE</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#17212B]">
              <p>✓ General Terms (GTC)</p>
              <p>✓ Special Conditions</p>
              <p>✓ Payment Milestones</p>
              <p>✓ Delivery Timelines</p>
              <p>✓ 3-Yr Warranty Terms</p>
              <p>✓ Liquidated Damages</p>
              <p>✓ Performance Security</p>
              <p>✓ Dispute Resolution</p>
            </div>
          </div>

          {/* 14 CONTACT & PROCUREMENT AUTHORITY */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">14</span>
              <span>CONTACT & PROCURING AUTHORITY</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Procuring Entity:</span>
                <span className="font-semibold text-[#17212B]">Chennai Petroleum Corp Ltd</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Inviting Officer:</span>
                <span className="font-semibold text-[#17212B]">R.K. Mehta (Procurement Div)</span>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] block">Official Email:</span>
                <span className="font-semibold text-[#124B7A]">procurement@cpcl.co.in</span>
              </div>
            </div>
          </div>

          {/* 15 BIDDER ACKNOWLEDGEMENT */}
          <div className="gov-card p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
              <span className="font-mono text-[#124B7A]">15</span>
              <span>BIDDER ACKNOWLEDGEMENT & REVIEW</span>
            </h2>
            <p className="text-[#5F6B76]">
              Before submitting your bid, confirm that you have reviewed the tender document, eligibility requirements, technical specifications, BOQ, and applicable terms.
            </p>
          </div>

          {/* Final Application Readiness Sticky Banner */}
          <div className="gov-card p-6 bg-[#FFFFFF] border-2 border-[#124B7A] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#124B7A] uppercase tracking-wider">APPLICATION READINESS SUMMARY</span>
              <p className="text-base font-bold text-[#17212B] mt-0.5">Your organisation profile is 82% complete</p>
              <p className="text-xs text-[#5F6B76]">All 6 core eligibility documents are ready in your Document Vault</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleStartBidding}
                className="gov-btn-primary h-11 px-7 text-xs font-bold flex items-center gap-2"
              >
                <span>Apply for this Tender</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: BID PREPARATION & SUBMISSION WORKSPACE */}
      {/* ========================================================================= */}
      {currentFlowStage === 'bidding' && (
        <div className="space-y-6">
          {/* Active Tender Bidding Banner */}
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-[#124B7A]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentFlowStage('tender_detail')}
                  className="text-xs text-[#124B7A] hover:underline font-semibold flex items-center gap-1 mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Tender Details</span>
                </button>
                <span className="font-mono font-bold text-[#124B7A] text-xs bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                  {selectedTender?.tender_number || 'CPCL/2026/VALVE-881'}
                </span>
                <StatusBadge status="ACTIVE" size="sm" />
              </div>

              <h1 className="text-xl font-bold text-[#17212B] tracking-tight">{selectedTender?.title || 'PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS'}</h1>
              <p className="text-xs text-[#5F6B76]">{selectedTender?.department || 'Chennai Petroleum Corporation Limited (CPCL)'}</p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Tender Budget</span>
              <p className="text-2xl font-bold text-[#124B7A]">₹ {selectedTender?.estimated_value_cr || 24.5} Cr</p>
            </div>
          </div>

          {/* Submission Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E1E6EA] pb-3 text-xs overflow-x-auto">
            <button
              onClick={() => setBiddingStep('pre_check')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                biddingStep === 'pre_check'
                  ? 'bg-[#124B7A] text-white'
                  : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>1. AI Pre-Submission Self-Check</span>
            </button>

            <button
              onClick={() => setBiddingStep('commercial_quote')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                biddingStep === 'commercial_quote'
                  ? 'bg-[#124B7A] text-white'
                  : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>2. Commercial Quote & Submit</span>
            </button>

            <button
              onClick={() => setBiddingStep('submission_status')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                biddingStep === 'submission_status'
                  ? 'bg-[#124B7A] text-white'
                  : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
              <span>3. Submission Status Tracker</span>
            </button>

            <button
              onClick={() => setBiddingStep('clarifications')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                biddingStep === 'clarifications'
                  ? 'bg-[#124B7A] text-white'
                  : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>4. Clarifications Inbox (0)</span>
            </button>
          </div>

          {/* Sub-Step 1: AI Pre-Submission Self-Check */}
          {biddingStep === 'pre_check' && (
            <div className="space-y-6">
              <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#17212B]">Pre-Submission AI Self-Check & Validation</h2>
                  <p className="text-xs text-[#5F6B76] mt-0.5">Test your proposal against all hard filters before final filing to avoid rejection</p>
                </div>

                <button
                  onClick={handleExecutePreCheck}
                  disabled={isPreChecking}
                  className="gov-btn-primary h-10 px-5 text-xs flex items-center gap-2"
                >
                  {isPreChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                  <span>{isPreChecking ? 'Evaluating Hard Constraints...' : 'Execute Pre-Flight Self-Check'}</span>
                </button>
              </div>

              {preCheckRun ? (
                <div className="gov-card p-6 space-y-5 bg-[#FFFFFF]">
                  <div className="p-4 rounded-lg bg-[#EBF6EE] border border-[#CEEBD5] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#16803C]">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold text-sm">Self-Check Passed: 100% Eligible (Zero Missing Mandatory Annexures)</span>
                    </div>
                    <span className="text-xs font-semibold text-[#16803C] bg-white px-3 py-1 rounded border border-[#CEEBD5]">
                      Ready for Proposal Filing
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">GST Verification:</span>
                      <span className="font-bold text-[#16803C]">✓ Verified (Active Taxpayer)</span>
                    </div>
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">Income Tax PAN:</span>
                      <span className="font-bold text-[#16803C]">✓ Verified (CBDT 100% Match)</span>
                    </div>
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">Turnover (≥ ₹5.0 Cr):</span>
                      <span className="font-bold text-[#16803C]">✓ ₹18.50 Cr (Exceeds)</span>
                    </div>
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">OEM Authorization:</span>
                      <span className="font-bold text-[#16803C]">✓ Valid Annexure IV Attached</span>
                    </div>
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">Make in India (≥ 50%):</span>
                      <span className="font-bold text-[#16803C]">✓ 62.5% (Class-1 Compliant)</span>
                    </div>
                    <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                      <span className="text-[#5F6B76] block">National Debarment:</span>
                      <span className="font-bold text-[#16803C]">✓ 0 Blacklist Records</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E1E6EA] flex justify-end">
                    <button
                      onClick={() => setBiddingStep('commercial_quote')}
                      className="gov-btn-primary h-10 px-6 text-xs flex items-center gap-2"
                    >
                      <span>Proceed to Commercial Quote & Submit →</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="gov-card p-10 text-center space-y-3">
                  <Sparkles className="w-10 h-10 text-[#124B7A] mx-auto opacity-70" />
                  <h3 className="text-sm font-bold text-[#17212B]">Run Automated Pre-Flight Check</h3>
                  <p className="text-xs text-[#5F6B76] max-w-md mx-auto">
                    Click the button above to run simulated OCR vector extractions and check compliance against tender hard filters.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sub-Step 2: Commercial Quote Form */}
          {biddingStep === 'commercial_quote' && (
            <div className="space-y-6">
              <form onSubmit={handleFinalSubmitProposal} className="gov-card p-6 space-y-5">
                <div className="border-b border-[#E1E6EA] pb-3">
                  <h2 className="text-lg font-bold text-[#17212B]">Commercial Proposal & Statutory Undertaking</h2>
                  <p className="text-xs text-[#5F6B76] mt-0.5">Tender Reference: {selectedTender?.tender_number || 'CPCL/2026/VALVE-881'} • Budget: ₹ {selectedTender?.estimated_value_cr || 24.5} Cr</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                      Commercial Bid Quote (₹ Crores) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-sm font-bold text-[#5F6B76]">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={commercialQuote}
                        onChange={(e) => setCommercialQuote(parseFloat(e.target.value))}
                        className="gov-input w-full pl-8 font-bold text-[#124B7A] text-base h-11"
                      />
                    </div>
                  </div>

                  {/* Attached Documents Preview */}
                  <div className="space-y-2 pt-2">
                    <span className="font-semibold text-[#17212B] block">Auto-Attached Documents from Vault:</span>
                    <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md">
                      {vaultDocs.map((doc) => (
                        <div key={doc.id} className="p-3 flex items-center justify-between bg-white text-xs">
                          <div className="flex items-center gap-2">
                            <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                            <span className="font-semibold text-[#17212B]">{doc.name}</span>
                          </div>
                          <span className="text-[#16803C] font-semibold bg-[#EBF6EE] px-2 py-0.5 rounded text-[11px]">
                            ✓ Attached (100% Verified)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legal Undertaking Checkbox */}
                  <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#CBD3DA]">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#17212B]">
                      <input
                        type="checkbox"
                        checked={undertakingSigned}
                        onChange={(e) => setUndertakingSigned(e.target.checked)}
                        className="mt-0.5 accent-[#124B7A]"
                      />
                      <span>
                        I hereby officially declare that the submitted documents and certifications are authentic, valid, and fully compliant with GeM General Terms and Conditions (GTC).
                      </span>
                    </label>
                  </div>

                  <div className="pt-3 border-t border-[#E1E6EA] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#5F6B76]">
                      <Lock className="w-3.5 h-3.5 text-[#16803C]" />
                      <span>Encrypted with SHA-256 upon submission</span>
                    </div>

                    <button
                      type="submit"
                      className="gov-btn-primary h-11 px-8 text-xs font-bold"
                    >
                      Submit Official Proposal to GeM
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Sub-Step 3: Submission Status Tracker */}
          {biddingStep === 'submission_status' && (
            <div className="space-y-6">
              <div className="gov-card p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                        Bid ID: BID-2026-BHARAT-01
                      </span>
                      <StatusBadge status="ACTIVE" size="sm" />
                    </div>
                    <h2 className="text-lg font-bold text-[#17212B] mt-1">Proposal Submission Status</h2>
                  </div>

                  <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5]">
                    ● Under Procurement Officer Evaluation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] uppercase font-semibold">Submitted Commercial Bid</span>
                    <p className="text-2xl font-bold text-[#124B7A] mt-1">₹ {commercialQuote} Cr</p>
                    <p className="text-[11px] text-[#5F6B76] mt-0.5">Budget: ₹ {selectedTender?.estimated_value_cr || 24.5} Cr</p>
                  </div>

                  <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] uppercase font-semibold">Assigned Officer</span>
                    <p className="text-base font-bold text-[#17212B] mt-1">Shri R. K. Sharma</p>
                    <p className="text-[11px] text-[#16803C] mt-0.5">GeM Evaluation Division</p>
                  </div>

                  <div className="p-4 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] uppercase font-semibold">Attached Vault Docs</span>
                    <p className="text-2xl font-bold text-[#16803C] mt-1">6 Certificates</p>
                    <p className="text-[11px] text-[#5F6B76] mt-0.5">All 100% Verified</p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] text-xs space-y-1">
                  <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Cryptographic Submission Hash</span>
                  <p className="font-mono text-[#5F6B76] text-[11px] break-all">
                    sha256:7f1c3d5e9a2b4c6e8f0a2d4b6c8e0a2d4f6a8b0c9e1d2f4a6c8e0b2d4f6a8b0c
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Step 4: Clarifications Inbox */}
          {biddingStep === 'clarifications' && (
            <div className="space-y-6">
              <div className="gov-card p-6 space-y-4">
                <div className="border-b border-[#E1E6EA] pb-3">
                  <h2 className="text-lg font-bold text-[#17212B]">Clarifications & Inquiries Inbox</h2>
                  <p className="text-xs text-[#5F6B76] mt-0.5">Official communication channel with the Procurement Officer for {selectedTender?.tender_number || 'CPCL/2026/VALVE-881'}</p>
                </div>

                {clarificationSent && (
                  <div className="p-3 bg-[#EBF6EE] border border-[#CEEBD5] rounded text-[#16803C] font-bold text-xs">
                    ✓ Official response submitted to Procurement Officer Shri R. K. Sharma.
                  </div>
                )}

                <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#17212B]">Officer Query: Plant Registration Address Confirmation</span>
                    <span className="text-[11px] text-[#5F6B76]">26 Aug 2026</span>
                  </div>
                  <p className="text-[#5F6B76]">
                    "Please confirm whether the Okhla industrial manufacturing facility is recorded as the principal or additional place of business under GST REG-06."
                  </p>
                </div>

                <form onSubmit={handleSendClarification} className="space-y-3 text-xs">
                  <textarea
                    rows={3}
                    value={clarificationReply}
                    onChange={(e) => setClarificationReply(e.target.value)}
                    placeholder="Type official response to procurement officer..."
                    className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A]"
                  />

                  <button
                    type="submit"
                    className="gov-btn-primary h-9 px-4 text-xs"
                  >
                    <span>Submit Response to Officer</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* GLOBAL TAB: REUSABLE DOCUMENT VAULT */}
      {/* ========================================================================= */}
      {currentFlowStage === 'vault' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Enterprise Reusable Document Vault</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Certificates verified once and reused automatically across all GeM tender bids</p>
            </div>

            <button className="gov-btn-primary h-9 px-4 text-xs flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload New Certificate</span>
            </button>
          </div>

          {/* Automated Expiry Tracker */}
          <div className="p-4 bg-[#FEF8EC] rounded-lg border border-[#FCE6BE] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#B7791F] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Automated Certificate Expiry Tracker
              </span>
              <span className="text-[11px] font-semibold text-[#B7791F] bg-white px-2 py-0.5 rounded border border-[#FCE6BE]">
                2 Actions Recommended
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#17212B]">
              <div className="p-2.5 bg-white rounded border border-[#FCE6BE] flex items-center justify-between">
                <div>
                  <p className="font-bold">Form GST REG-06 Tax Certificate</p>
                  <p className="text-[#B7791F] text-[10px]">Annual Review due in 15 days</p>
                </div>
                <button className="text-xs font-semibold text-[#124B7A] hover:underline">Update</button>
              </div>
              <div className="p-2.5 bg-white rounded border border-[#FCE6BE] flex items-center justify-between">
                <div>
                  <p className="font-bold">OEM Authorization Letter (Annexure IV)</p>
                  <p className="text-[#C0392B] text-[10px]">Expiring in 7 days (Apex Sensors)</p>
                </div>
                <button className="text-xs font-semibold text-[#124B7A] hover:underline">Renew</button>
              </div>
            </div>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Category</th>
                  <th>File Size</th>
                  <th>Verification Status</th>
                  <th>Expiry Track</th>
                </tr>
              </thead>
              <tbody>
                {vaultDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                        <span className="font-semibold text-[#17212B]">{doc.name}</span>
                      </div>
                    </td>
                    <td><span className="text-xs text-[#5F6B76]">{doc.category}</span></td>
                    <td><span className="font-mono text-xs text-[#5F6B76]">{doc.size}</span></td>
                    <td>
                      <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
                        ✓ AI Verified
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-[#5F6B76]">{doc.expiry}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GLOBAL TAB: ENTERPRISE MASTER PROFILE */}
      {/* ========================================================================= */}
      {currentFlowStage === 'profile' && (
        <div className="space-y-6">
          <div className="gov-card p-6 space-y-6">
            <div className="border-b border-[#E1E6EA] pb-3">
              <h1 className="text-xl font-bold text-[#17212B]">Enterprise Master Identity</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Government registry verified enterprise information synchronized with GeM</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Legal Corporate Name</span>
                <p className="font-bold text-[#17212B] text-sm">Bharat Tactical & Safety Gear Private Limited</p>
                <p className="text-[#16803C] text-[11px]">✓ Verified in MCA Database</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">GSTIN (Active Taxpayer)</span>
                <p className="font-mono font-bold text-[#124B7A] text-sm">07AABCB1234F1Z5</p>
                <p className="text-[#16803C] text-[11px]">✓ Verified in GSTN Central Directory</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Corporate PAN</span>
                <p className="font-mono font-bold text-[#17212B] text-sm">AABCB1234F</p>
                <p className="text-[#16803C] text-[11px]">✓ Matched in CBDT Registry</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Udyam MSME Registration</span>
                <p className="font-mono font-bold text-[#17212B] text-sm">UDYAM-DL-02-0019283</p>
                <p className="text-[#16803C] text-[11px]">✓ Medium Enterprise Classification</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* STAGE 3: SUBMITTED BID DETAILS SCREEN */}
      {/* ========================================================================= */}
      {currentFlowStage === 'submitted_bid' && selectedTender && (() => {
        const myBid = bids.find(b => b.tender_id === selectedTender.tender_id && (b.bidder_name === 'Bharat Tactical & Safety Gear Pvt Ltd' || b.bidder_name === 'Bharat Tactical and Safety Gear Pvt Ltd')) || bids[bids.length - 1];
        
        return (
          <div className="space-y-6">
            {/* Breadcrumb Bar */}
            <div className="flex items-center justify-between text-xs text-[#5F6B76] border-b border-[#E1E6EA] pb-3">
              <div className="flex items-center gap-2">
                <button onClick={handleBackToFeed} className="hover:text-[#124B7A] flex items-center gap-1 font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <span>/</span>
                <span>Tenders</span>
                <span>/</span>
                <span className="text-[#17212B] font-bold">{selectedTender.tender_number}</span>
                <span>/</span>
                <span className="text-[#16803C] font-bold">My Submitted Bid</span>
              </div>
            </div>

            {/* Submitted Hero Header */}
            <div className="gov-card p-8 bg-[#FAFAFA] border-t-4 border-t-[#16803C]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                      BID OFFICIALLY SUBMITTED
                    </span>
                    <span className="font-mono text-xs text-[#5F6B76]">BID ID: {myBid?.bid_id || 'BID-2026-991'}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-[#17212B] tracking-tight mb-1">{selectedTender.title}</h1>
                  <p className="text-xs text-[#5F6B76]">Submission Timestamp: <strong className="text-[#17212B]">{new Date(myBid?.submission_date || new Date()).toLocaleString()} IST</strong></p>
                </div>
                
                <div className="text-right">
                  <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Submitted Commercial Quote</span>
                  <p className="text-3xl font-bold text-[#124B7A] mt-1">₹ {myBid?.bid_amount_cr || '0.00'} Cr</p>
                </div>
              </div>
            </div>

            {/* Detailed Submission Record */}
            <div className="gov-card overflow-hidden">
              <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA]">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <FolderLock className="w-4 h-4 text-[#124B7A]" />
                  <span>Official Submission Record & Extracted Data</span>
                </h2>
                <p className="text-xs text-[#5F6B76] mt-0.5">This is the exact data that was extracted by AI and cryptographically sealed into GeM.</p>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA]">
                {/* Identity */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5F6B76] uppercase border-b border-[#E1E6EA] pb-2">Verified Identity</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[#5F6B76] block mb-0.5">Legal Entity Name</span>
                      <strong className="text-[#17212B]">Bharat Tactical and Safety Gear Private Limited</strong>
                    </div>
                    <div>
                      <span className="text-[#5F6B76] block mb-0.5">Verified GSTIN</span>
                      <strong className="text-[#16803C] font-mono">07AABCB1234F1Z5</strong>
                    </div>
                    <div>
                      <span className="text-[#5F6B76] block mb-0.5">Verified PAN</span>
                      <strong className="text-[#16803C] font-mono">AABCB1234F</strong>
                    </div>
                  </div>
                </div>

                {/* Compliance Extraction */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5F6B76] uppercase border-b border-[#E1E6EA] pb-2">AI Compliance Verification</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center bg-[#FFFFFF] p-2 border border-[#E1E6EA] rounded">
                      <span className="text-[#5F6B76] font-semibold">Extracted Financial Turnover</span>
                      <span className="font-bold text-[#124B7A]">₹ 18.5 Cr</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#FFFFFF] p-2 border border-[#E1E6EA] rounded">
                      <span className="text-[#5F6B76] font-semibold">Extracted Local Content (MII)</span>
                      <span className="font-bold text-[#124B7A]">65% (Class-1)</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#FFFFFF] p-2 border border-[#E1E6EA] rounded">
                      <span className="text-[#5F6B76] font-semibold">Extracted Past Experience</span>
                      <span className="font-bold text-[#124B7A]">5 Years</span>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div className="md:col-span-2 space-y-4 pt-4 border-t border-[#E1E6EA]">
                  <h3 className="text-xs font-bold text-[#5F6B76] uppercase border-b border-[#E1E6EA] pb-2">Cryptographically Sealed Annexures</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {myBid?.documents?.map((doc: any, i: number) => (
                      <div key={i} className="p-3 bg-[#FFFFFF] border border-[#E1E6EA] rounded-md text-center">
                        <FileCheck2 className="w-6 h-6 text-[#16803C] mx-auto mb-2" />
                        <p className="text-[11px] font-bold text-[#17212B] line-clamp-2">{doc.file_name}</p>
                        <p className="text-[10px] text-[#5F6B76] mt-1">{(doc.file_size_bytes / (1024*1024)).toFixed(1)} MB • PDF</p>
                      </div>
                    ))}
                    {!myBid?.documents && (
                      <div className="col-span-4 p-4 text-center text-xs text-[#5F6B76]">Documents securely sealed.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
