import React, { useState } from 'react';
import {
  Building,
  FilePlus2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Users,
  BarChart3,
  Sparkles,
  ShieldAlert,
  UploadCloud,
  Clock,
  Printer,
  History,
  Check,
  RefreshCw,
  Award
} from 'lucide-react';
import { Tender, Bid, TenderRequirement } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';

interface Props {
  tenders: Tender[];
  bids: Bid[];
  onNavigate: (view: string) => void;
  onSelectTender: (tenderId: string) => void;
}

export const TendererDashboardView: React.FC<Props> = ({
  tenders,
  bids,
  onNavigate,
  onSelectTender
}) => {
  // Navigation Tabs for Tendering Authority
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'create_tender'
    | 'ai_extracted_rules'
    | 'bidders'
    | 'comparison'
    | 'award_reports'
  >('dashboard');

  // Selected Active Tender
  const [selectedTender, setSelectedTender] = useState<Tender>(tenders[0] || {
    tender_id: 'TND-GEM-2026-001',
    tender_number: 'GEM/2026/B/891240',
    title: 'Procurement of Industrial & Tactical Safety Equipment',
    department: 'Chennai Petroleum Corporation Limited (CPCL) / Logistics Div',
    description: 'National procurement of PPE, tactical sensors, and biometric tracking gear under Make-in-India mandates.',
    estimated_value_cr: 15.0,
    submission_deadline: '2026-09-15T17:00:00Z',
    status: 'ACTIVE_EVALUATION',
    created_by: 'Director of Procurement (CPCL)',
    created_at: '2026-08-01T10:00:00Z',
    requirements: []
  });

  // Create Tender Form State
  const [newTitle, setNewTitle] = useState('Supply & Commissioning of High-Pressure Industrial Valve Assemblies');
  const [newRefNumber, setNewRefNumber] = useState('CPCL/2026/PROC/VALVE-881');
  const [newDepartment, setNewDepartment] = useState('Chennai Petroleum Corporation Limited (CPCL) - Manali Refinery');
  const [newValueCr, setNewValueCr] = useState<number>(24.5);
  const [newDeadline, setNewDeadline] = useState('2026-10-15');

  // AI Tender PDF Ingestion State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisCompleted, setAiAnalysisCompleted] = useState(true);

  // Extracted Requirements List (Editable by Tenderer)
  const [extractedRules] = useState<TenderRequirement[]>([
    {
      requirement_id: 'REQ-GST-01',
      name: 'Mandatory GST Registration (Active Status)',
      category: 'STATUTORY',
      mandatory: true,
      data_type: 'BOOLEAN',
      expected_value: true,
      operator: '==',
      weight: 15,
      verification_type: 'PORTAL_CHECK',
      required_document_types: ['GST_Registration_Certificate']
    },
    {
      requirement_id: 'REQ-PAN-01',
      name: 'Corporate Income Tax PAN Verification',
      category: 'STATUTORY',
      mandatory: true,
      data_type: 'BOOLEAN',
      expected_value: true,
      operator: '==',
      weight: 15,
      verification_type: 'PORTAL_CHECK',
      required_document_types: ['PAN_Card']
    },
    {
      requirement_id: 'REQ-TURNOVER-01',
      name: 'Minimum 3-Year Average Annual Turnover (≥ ₹5.0 Cr)',
      category: 'FINANCIAL',
      mandatory: true,
      data_type: 'NUMBER',
      expected_value: 5.0,
      operator: '>=',
      weight: 25,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['CA_Audited_Balance_Sheet']
    },
    {
      requirement_id: 'REQ-EXP-01',
      name: 'Past Experience in Refinery / Industrial Supply (≥ 3 Years)',
      category: 'EXPERIENCE',
      mandatory: true,
      data_type: 'NUMBER',
      expected_value: 3,
      operator: '>=',
      weight: 15,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['Past_Work_Orders']
    },
    {
      requirement_id: 'REQ-OEM-01',
      name: 'Valid OEM Authorization Letter (Annexure IV)',
      category: 'TECHNICAL',
      mandatory: true,
      data_type: 'STRING',
      expected_value: 'Authorized',
      operator: '==',
      weight: 15,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['OEM_Authorization_Letter']
    },
    {
      requirement_id: 'REQ-MII-01',
      name: 'Make in India Class-1 Local Content (≥ 50%)',
      category: 'LOCAL_CONTENT',
      mandatory: true,
      data_type: 'PERCENTAGE',
      expected_value: 50.0,
      operator: '>=',
      weight: 15,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['Make_in_India_Declaration']
    }
  ]);

  const handleSimulateAiPdfParse = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setIsAiAnalyzing(false);
      setAiAnalysisCompleted(true);
      setActiveTab('ai_extracted_rules');
    }, 1000);
  };

  const handlePublishTender = () => {
    alert(`Tender ${selectedTender.tender_number} has been Published to GeM Portal! Compliance verification rules are now active.`);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Tendering Authority Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-sm overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeTab === 'dashboard'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. Organization Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('create_tender')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeTab === 'create_tender' || activeTab === 'ai_extracted_rules'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <FilePlus2 className="w-4 h-4" />
            <span>2. Create / Ingest Tender PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('bidders')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeTab === 'bidders'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Participating Bidders ({bids.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeTab === 'comparison'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>4. Bidder Comparison</span>
          </button>

          <button
            onClick={() => setActiveTab('award_reports')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeTab === 'award_reports'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>5. Award & Evaluation Reports</span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[#5F6B76] text-xs">
          <Building className="w-3.5 h-3.5 text-[#124B7A]" />
          <span>Authority: CPCL Logistics Division</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MAIN TENDERER DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top Banner Card */}
          <div className="gov-card p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                  Tendering Authority Dashboard
                </span>
                <span className="text-xs text-[#5F6B76]">Chennai Petroleum Corporation Limited (CPCL)</span>
              </div>
              <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">
                Tender Lifecycle & Compliance Management
              </h1>
              <p className="text-sm text-[#5F6B76]">
                Create tenders, configure AI-extracted eligibility criteria, publish rules, and track evaluation handoff to Procurement Officers.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('create_tender')}
                className="gov-btn-primary h-10 px-5 text-xs"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>Create New Tender</span>
              </button>
            </div>
          </div>

          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Tenders</span>
              <p className="text-2xl font-bold text-[#17212B] mt-2">12 Published</p>
              <p className="text-xs text-[#5F6B76] mt-1">Live on GeM Portal</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Draft Tenders</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-2">4 In Draft</p>
              <p className="text-xs text-[#5F6B76] mt-1">Rule Configuration In Progress</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Total Bids Ingested</span>
              <p className="text-2xl font-bold text-[#16803C] mt-2">86 Bids</p>
              <p className="text-xs text-[#5F6B76] mt-1">From Verified Enterprises</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Officer Handoff</span>
              <p className="text-2xl font-bold text-[#B7791F] mt-2">17 Pending</p>
              <p className="text-xs text-[#5F6B76] mt-1">Under Final Review</p>
            </div>
          </div>

          {/* Verification Progress Bar */}
          <div className="gov-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#124B7A]" />
                <h3 className="text-sm font-bold text-[#17212B]">Active Tender Verification Progress ({selectedTender.tender_number})</h3>
              </div>
              <span className="text-sm font-bold text-[#16803C]">82% Verified</span>
            </div>

            <div className="w-full bg-[#E1E6EA] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#124B7A] h-full rounded-full" style={{ width: '82%' }} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs text-[#5F6B76]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
                <span>15 Fully Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />
                <span>5 Require Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>3 Disqualified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#124B7A]" />
                <span>1 Under Verification</span>
              </div>
            </div>
          </div>

          {/* Managed Tenders List */}
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#17212B]">Organization Active Tenders</h2>
              <span className="text-xs font-semibold text-[#124B7A]">{tenders.length} Published</span>
            </div>

            <div className="divide-y divide-[#EAEFF3]">
              {tenders.map((t) => (
                <div
                  key={t.tender_id}
                  onClick={() => {
                    setSelectedTender(t);
                    onSelectTender(t.tender_id);
                  }}
                  className={`p-4 text-xs cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    selectedTender.tender_id === t.tender_id
                      ? 'bg-[#EBF3FA]'
                      : 'hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#124B7A]">{t.tender_number}</span>
                      <StatusBadge status={t.status} size="sm" />
                      <span className="text-xs text-[#5F6B76]">Officer Assigned: <strong className="text-[#17212B]">Shri R. K. Sharma</strong></span>
                    </div>
                    <h3 className="font-semibold text-[#17212B] text-sm">{t.title}</h3>
                    <p className="text-xs text-[#5F6B76]">{t.department}</p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Value / Deadline</span>
                      <p className="font-bold text-[#17212B]">₹ {t.estimated_value_cr} Cr</p>
                      <p className="text-[11px] text-[#5F6B76]">{new Date(t.submission_deadline).toLocaleDateString()}</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('bidders')}
                      className="gov-btn-secondary h-8 px-3 text-xs"
                    >
                      View Bidders ({bids.length})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CREATE TENDER & UPLOAD PDF WORKFLOW */}
      {/* ========================================================================= */}
      {activeTab === 'create_tender' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                Tender Ingestion Engine
              </span>
              <h1 className="text-xl font-bold text-[#17212B] mt-1">Upload GeM Tender PDF for Automated Parsing</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                AI extracts all eligibility conditions, financial turnover thresholds, and statutory mandates.
              </p>
            </div>
          </div>

          <div className="gov-card p-6 space-y-5">
            <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-3">
              1. Basic Tender Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Tender Reference Number *</label>
                <input
                  type="text"
                  value={newRefNumber}
                  onChange={(e) => setNewRefNumber(e.target.value)}
                  className="gov-input w-full font-mono uppercase text-xs"
                />
              </div>

              <div>
                <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Estimated Value (₹ Crores) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={newValueCr}
                  onChange={(e) => setNewValueCr(parseFloat(e.target.value))}
                  className="gov-input w-full font-bold text-[#124B7A] text-xs"
                />
              </div>

              <div>
                <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Submission Deadline *</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Tender Scope Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="gov-input w-full text-xs"
                />
              </div>
            </div>

            {/* Document Upload Dropzone */}
            <div className="pt-3 border-t border-[#E1E6EA] space-y-3">
              <h3 className="text-sm font-bold text-[#17212B]">2. Tender Specification & Eligibility Documents</h3>

              <div className="border border-dashed border-[#CBD3DA] hover:border-[#124B7A] rounded-lg p-6 text-center bg-[#F6F8FA] space-y-2 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#EBF3FA] text-[#124B7A] flex items-center justify-center mx-auto">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#17212B]">Upload Tender Document (PDF, BOQ, Specification Sheet)</p>
                  <p className="text-[11px] text-[#5F6B76] mt-0.5">PyMuPDF OCR will automatically extract all mandatory eligibility rules</p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateAiPdfParse}
                  disabled={isAiAnalyzing}
                  className="gov-btn-primary h-9 px-5 text-xs"
                >
                  {isAiAnalyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{isAiAnalyzing ? 'Extracting Requirements via AI...' : 'Parse Tender PDF & Extract Rules'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. AI-EXTRACTED RULES & REQUIREMENT EDITOR */}
      {/* ========================================================================= */}
      {activeTab === 'ai_extracted_rules' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#16803C]" />
                <h1 className="text-xl font-bold text-[#17212B]">AI-Extracted Compliance Rule Checklist</h1>
              </div>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                Tenderer reviews, edits thresholds, and configures external government verification adapters before publishing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePublishTender}
                className="gov-btn-primary h-9 px-5 text-xs bg-[#16803C] hover:bg-[#126630]"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Publish Tender on GeM</span>
              </button>
            </div>
          </div>

          {/* AI Pre-Publish Quality Check Box */}
          <div className="gov-card p-4 border-l-3 border-[#16803C] bg-[#EBF6EE]/30 space-y-1">
            <h3 className="text-xs font-bold text-[#16803C] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>AI Pre-Publish Integrity Check: 0 Conflicting Clauses</span>
            </h3>
            <p className="text-[11px] text-[#5F6B76]">
              Clause consistency verified across technical specifications and commercial conditions.
            </p>
          </div>

          {/* Extracted Rules Table */}
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#17212B]">Configured Rules Checklist ({extractedRules.length})</h2>
              <span className="text-xs text-[#5F6B76]">Rules applied deterministically to all incoming bids</span>
            </div>

            <div className="divide-y divide-[#EAEFF3]">
              {extractedRules.map((rule) => (
                <div key={rule.requirement_id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#124B7A]">{rule.requirement_id}</span>
                      <span className="font-semibold text-[#17212B] text-sm">{rule.name}</span>
                      <span className="text-[10px] font-semibold text-[#5F6B76] bg-[#F1F4F7] px-2 py-0.2 rounded">{rule.category}</span>
                    </div>
                    <p className="text-[#5F6B76] text-[11px]">
                      Verification Source: <strong className="text-[#17212B]">{rule.verification_type}</strong> • Weight: <strong className="text-[#124B7A]">{rule.weight}%</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-bold text-[#C0392B] bg-[#FDF2F1] px-2 py-0.5 rounded border border-[#FACDC9]">
                      MANDATORY HARD FILTER
                    </span>
                    <button className="text-xs text-[#124B7A] hover:underline font-semibold cursor-pointer">
                      Edit Rule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PARTICIPATING BIDDERS OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'bidders' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Participating Bidders Overview</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Live status of bids ingested and verified for Tender {selectedTender.tender_number}</p>
            </div>

            <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-3 py-1 rounded border border-[#D0E2F2]">
              Assigned to Procurement Officer
            </span>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Bidder Enterprise</th>
                  <th>Commercial Bid</th>
                  <th>Compliance Score</th>
                  <th>AI Preliminary Status</th>
                  <th>Officer Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((b) => (
                  <tr key={b.bid_id}>
                    <td>
                      <div>
                        <p className="font-semibold text-[#17212B]">{b.bidder_name}</p>
                        <p className="text-xs text-[#5F6B76] mt-0.5">{b.gstin || b.pan}</p>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold text-[#17212B]">₹ {b.bid_amount_cr} Cr</span>
                    </td>
                    <td>
                      <span className="font-bold text-[#16803C]">{b.compliance_score || 85}/100</span>
                    </td>
                    <td>
                      <StatusBadge status={b.compliance_status || (b as any).status || 'QUALIFIED'} size="sm" />
                    </td>
                    <td>
                      <span className="text-xs text-[#5F6B76] bg-[#F1F4F7] px-2.5 py-0.5 rounded border border-[#E1E6EA]">
                        Assigned to Officer
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BIDDER COMPARISON */}
      {/* ========================================================================= */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Bidder Comparative Evaluation Matrix</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Multi-bidder benchmark for Tender Committee Review</p>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Evaluation Category</th>
                  <th>Bharat Tactical</th>
                  <th>Surya Infotech</th>
                  <th>Zenith Trade</th>
                  <th>Apex Global</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Total Compliance Score</span></td>
                  <td><span className="font-bold text-[#16803C]">87 / 100</span></td>
                  <td><span className="font-bold text-[#B7791F]">74 / 100</span></td>
                  <td><span className="font-bold text-[#C0392B]">42 / 100</span></td>
                  <td><span className="font-bold text-[#16803C]">94 / 100</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Commercial Quote (₹ Cr)</span></td>
                  <td><span className="font-bold text-[#124B7A]">₹ 12.80 Cr (L2)</span></td>
                  <td><span className="font-bold text-[#124B7A]">₹ 11.90 Cr (L1)</span></td>
                  <td><span className="font-bold text-[#5F6B76]">₹ 14.50 Cr</span></td>
                  <td><span className="font-bold text-[#124B7A]">₹ 13.50 Cr (L3)</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Statutory & GST Compliance</span></td>
                  <td><span className="text-[#16803C] font-semibold">✓ 100% Valid</span></td>
                  <td><span className="text-[#16803C] font-semibold">✓ 100% Valid</span></td>
                  <td><span className="text-[#C0392B] font-semibold">✕ Cancelled GST</span></td>
                  <td><span className="text-[#16803C] font-semibold">✓ 100% Valid</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Make in India Local Content</span></td>
                  <td><span className="text-[#16803C] font-semibold">62.5% (Class-I)</span></td>
                  <td><span className="text-[#16803C] font-semibold">54.0% (Class-I)</span></td>
                  <td><span className="text-[#C0392B] font-semibold">28.0% (Non-Compliant)</span></td>
                  <td><span className="text-[#16803C] font-semibold">70.0% (Class-I)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. AWARD & EVALUATION REPORTS */}
      {/* ========================================================================= */}
      {activeTab === 'award_reports' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Tender Award & Evaluation Reports</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Export official GeM tender summaries and signed qualification records</p>
            </div>

            <button
              onClick={() => window.print()}
              className="gov-btn-primary h-9 px-4 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Award Dossier</span>
            </button>
          </div>

          <div className="gov-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
              <div>
                <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
                  Evaluation Stage: Completed by Officer
                </span>
                <h2 className="text-lg font-bold text-[#17212B] mt-1.5">CPCL Procurement Recommendation Summary</h2>
              </div>
              <p className="font-mono text-xs text-[#5F6B76]">Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">L1 Qualified Bidder</span>
                <p className="font-bold text-[#17212B] text-sm mt-1">Surya Infotech & Defense Pvt Ltd</p>
                <p className="font-bold text-[#124B7A] mt-0.5">₹ 11.90 Crores</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">L2 Qualified Bidder</span>
                <p className="font-bold text-[#17212B] text-sm mt-1">Bharat Tactical & Safety Gear Pvt Ltd</p>
                <p className="font-bold text-[#124B7A] mt-0.5">₹ 12.80 Crores</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">Signing Officer</span>
                <p className="font-bold text-[#17212B] text-sm mt-1">Shri R. K. Sharma</p>
                <p className="text-[#16803C] mt-0.5 font-medium">✓ Cryptographically Signed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
