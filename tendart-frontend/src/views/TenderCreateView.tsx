import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  FilePlus2,
  UploadCloud,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Building,
  FileText,
  AlertTriangle,
  Lock,
  FileCheck2,
  Layers,
  ShieldCheck,
  Eye,
  Check,
  Zap,
  Info,
  Award,
  Sliders,
  History
} from 'lucide-react';

interface Props {
  onCreateTender: (tenderData: any) => void;
  onCancel: () => void;
}

export const TenderCreateView: React.FC<Props> = ({ onCreateTender, onCancel }) => {
  // Extraction & Ingestion State
  const [isExtracting, setIsExtracting] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(true);
  const [selectedNitFile, setSelectedNitFile] = useState('CPCL_NIT_VALVE_881_2026.pdf');
  const [tenderDetailSubTab, setTenderDetailSubTab] = useState<'15_sections' | 'top_bidders' | 'rules_weights' | 'audit_log'>('15_sections');
  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedNitFile(file.name);
      // You could store the file object in state if needed for upload later
    }
  };

  // ==========================================
  // ⚡ 1. AI-EXTRACTED FIELDS (FROM NIT PDF) - ALL EDITABLE
  // ==========================================
  const [tenderNumber, setTenderNumber] = useState('CPCL/2026/VALVE-881');
  const [title, setTitle] = useState('PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS');
  const [department, setDepartment] = useState('Chennai Petroleum Corporation Limited (CPCL) / Manali Refinery');
  const [ministry, setMinistry] = useState('Ministry of Petroleum & Natural Gas, Government of India');
  const [estimatedValueCr, setEstimatedValueCr] = useState<number>(24.50);
  const [emdAmountLakh, setEmdAmountLakh] = useState<number>(24.50);
  const [tenderFee, setTenderFee] = useState<number>(5000);
  const [bidValidityDays, setBidValidityDays] = useState<number>(180);
  const [contractPeriodMonths, setContractPeriodMonths] = useState<number>(12);
  const [location, setLocation] = useState('Chennai, Tamil Nadu');

  // Milestone Dates (Extracted)
  const [publishDate, setPublishDate] = useState('2026-08-18');
  const [preBidDate, setPreBidDate] = useState('2026-08-22');
  const [queriesDate, setQueriesDate] = useState('2026-08-24');
  const [deadlineDate, setDeadlineDate] = useState('2026-08-28');
  const [openingDate, setOpeningDate] = useState('2026-08-29');

  // Scope & Technical Parameters (Extracted)
  const [scopeDescription, setScopeDescription] = useState(
    'Procurement of industrial safety valves including supply, installation, testing and commissioning for refinery operations under Make-in-India mandates.'
  );
  const [technicalStandard, setTechnicalStandard] = useState('API 520, API 526, ASME Section VIII Div 1');

  // Eligibility Thresholds (Extracted)
  const [minTurnoverCr, setMinTurnoverCr] = useState<number>(50.0);
  const [minExperienceYrs, setMinExperienceYrs] = useState<number>(5);
  const [minLocalContentPercent, setMinLocalContentPercent] = useState<number>(50.0);
  const [oemMandatory, setOemMandatory] = useState<boolean>(true);

  // ==========================================
  // ✍ 2. OFFICER / ADMIN MANUAL FIELDS (CANNOT BE EXTRACTED FROM PUBLIC NIT)
  // ==========================================
  const [budgetHeadCode, setBudgetHeadCode] = useState('CPCL-CAPEX-2026-REF-VALVE-09');
  const [officerEmpId, setOfficerEmpId] = useState('EMP-88192 (Shri R.K. Mehta, CGM Procurement)');
  const [sanctionOrderNo, setSanctionOrderNo] = useState('SANCTION-CPCL-MD-2026-0812');
  const [preBidMeetingLink, setPreBidMeetingLink] = useState('https://meet.cpcl.gov.in/prebid-valve-881');
  const [supplierClassRestriction, setSupplierClassRestriction] = useState('Class-1 & Class-2 Local Suppliers Only');
  const [securityDscPin, setSecurityDscPin] = useState('••••••••');

  // Trigger simulated AI extraction from selected NIT PDF
  const handleTriggerAiExtraction = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setHasExtracted(true);
      setTenderNumber('CPCL/2026/VALVE-881');
      setTitle('PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS');
      setDepartment('Chennai Petroleum Corporation Limited (CPCL) / Manali Refinery');
      setEstimatedValueCr(24.50);
      setEmdAmountLakh(24.50);
      setTenderFee(5000);
      setBidValidityDays(180);
      setContractPeriodMonths(12);
      setMinTurnoverCr(50.0);
      setMinExperienceYrs(5);
      setMinLocalContentPercent(50.0);
    }, 800);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTender({
      tender_number: tenderNumber,
      title,
      department,
      estimated_value_cr: Number(estimatedValueCr),
      submission_deadline: new Date(deadlineDate).toISOString(),
      description: scopeDescription,
      status: 'ACTIVE_EVALUATION',
      created_by: officerEmpId,
      requirements: []
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={onCancel}
          className="gov-btn-secondary h-8 px-3 text-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tenders Overview</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5F6B76]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Tender Authority: Authorized Creation Console</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
            Tender Creation & Ingestion Engine
          </span>
          <h1 className="text-2xl font-bold text-[#17212B] mt-1">Create & Publish GeM Procurement Tender</h1>
          <p className="text-xs text-[#5F6B76] mt-0.5">
            Upload the official Notice Inviting Tender (NIT) document to trigger automated AI requirement extraction, review auto-populated rules, and add internal administrative parameters.
          </p>
        </div>
      </div>

      {/* STEP 1: NIT DOCUMENT UPLOAD & AI INGESTION HERO BOX */}
      <div className="gov-card p-6 border-2 border-[#D0E2F2] bg-[#F9FBFC] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#124B7A] text-white flex items-center justify-center font-bold text-xs">
              NIT
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">Step 1: Ingest Notice Inviting Tender (NIT) PDF</h2>
              <p className="text-[11px] text-[#5F6B76]">Automate extraction of metadata, mandatory clauses, thresholds, and documents checklist</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-3 py-1 rounded border border-[#D0E2F2]">
            PyMuPDF + Document AI OCR Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-center">
          <div className="md:col-span-2 p-3 bg-white rounded border border-[#E1E6EA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#124B7A]" />
              <div>
                <p className="font-bold text-[#17212B]">{selectedNitFile}</p>
                <p className="text-[11px] text-[#5F6B76]">4.8 MB • Official NIT Document • 48 Pages</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">
              ✓ Ready for Extraction
            </span>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
            className="gov-btn-primary h-11 px-5 text-xs font-bold flex items-center justify-center gap-2"
          >
            {isExtracting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{isExtracting ? 'Extracting 15 Sections...' : 'Inject Notice inviting tender pdf'}</span>
          </button>
        </div>

        {/* AI Clause Quality & Conflict Inspector Banner */}
        <div className="p-3.5 bg-[#EBF6EE] rounded-md border border-[#CEEBD5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#16803C]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              <strong>AI Clause Quality Inspection:</strong> 15 sections extracted with 98% confidence. Clause 4.1 (Turnover) and Clause 9.2 (Audited Balance Sheet) are consistent. Zero conflicting conditions found.
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#16803C] bg-white px-2 py-0.5 rounded border border-[#CEEBD5] shrink-0">
            Validated
          </span>
        </div>
      </div>

      {/* SUB-TABS (Consistent with Detail View) */}
      <div className="flex items-center gap-2 border-b border-[#E1E6EA] pb-3 text-xs overflow-x-auto">
        <button
          onClick={() => setTenderDetailSubTab('15_sections')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            tenderDetailSubTab === '15_sections'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>1. 15-Section Tender Specifications (Editable)</span>
        </button>

        <button
          onClick={() => setTenderDetailSubTab('top_bidders')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            tenderDetailSubTab === 'top_bidders'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>2. Participating Bidders & Live Rankings (0)</span>
        </button>

        <button
          onClick={() => setTenderDetailSubTab('rules_weights')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            tenderDetailSubTab === 'rules_weights'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>3. Rules Checklist & Weights</span>
        </button>

        <button
          onClick={() => setTenderDetailSubTab('audit_log')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            tenderDetailSubTab === 'audit_log'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>4. Cryptographic Audit Trail</span>
        </button>
      </div>

      {/* STEP 2: FULL EDITABLE TENDER SPECIFICATION FORM */}
      {tenderDetailSubTab === '15_sections' && (
      <form onSubmit={handlePublishSubmit} className="space-y-6">
        {/* ========================================================================= */}
        {/* SECTION A: ⚡ AI-EXTRACTED CORE TENDER METADATA (EDITABLE) */}
        {/* ========================================================================= */}
        <div className="gov-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#124B7A]" />
              <h2 className="text-base font-bold text-[#17212B]">Section A: Core Tender Parameters (AI-Extracted)</h2>
            </div>
            <span className="text-[11px] font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>⚡ AI Populated • Fully Editable</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Tender Reference ID *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 1.1</span>
              </div>
              <input
                type="text"
                required
                value={tenderNumber}
                onChange={(e) => setTenderNumber(e.target.value)}
                className="gov-input w-full font-mono uppercase text-xs font-bold text-[#124B7A]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Estimated Value (₹ Crores) *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 1.4</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-[#5F6B76]">₹</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={estimatedValueCr}
                  onChange={(e) => setEstimatedValueCr(parseFloat(e.target.value))}
                  className="gov-input w-full pl-7 font-bold text-[#124B7A] text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Earnest Money (EMD ₹ Lakh) *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 1.6</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-[#5F6B76]">₹</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={emdAmountLakh}
                  onChange={(e) => setEmdAmountLakh(parseFloat(e.target.value))}
                  className="gov-input w-full pl-7 font-bold text-[#17212B] text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Tender Fee (₹) *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 1.7</span>
              </div>
              <input
                type="number"
                required
                value={tenderFee}
                onChange={(e) => setTenderFee(parseInt(e.target.value))}
                className="gov-input w-full text-xs font-semibold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Bid Validity (Days) *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 2.3</span>
              </div>
              <input
                type="number"
                required
                value={bidValidityDays}
                onChange={(e) => setBidValidityDays(parseInt(e.target.value))}
                className="gov-input w-full text-xs font-semibold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Contract Duration (Months) *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ NIT Cl. 3.1</span>
              </div>
              <input
                type="number"
                required
                value={contractPeriodMonths}
                onChange={(e) => setContractPeriodMonths(parseInt(e.target.value))}
                className="gov-input w-full text-xs font-semibold"
              />
            </div>

            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#5F6B76] uppercase font-semibold">Tender Scope Title *</label>
                <span className="text-[10px] text-[#124B7A] font-semibold">⚡ Extracted Scope</span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="gov-input w-full text-xs font-bold text-[#17212B]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Procuring Entity / Department *</label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Location of Execution *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Comprehensive Scope Description</label>
              <textarea
                rows={3}
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION B: ⚡ KEY MILESTONE DATES & TIMELINE (AI-EXTRACTED) */}
        {/* ========================================================================= */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <h2 className="text-base font-bold text-[#17212B]">Section B: Key Milestone Dates & Schedule (IST)</h2>
            <span className="text-[11px] text-[#5F6B76]">Extracted from Schedule of Events</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">1. Published Date *</label>
              <input
                type="date"
                required
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">2. Pre-Bid Meeting *</label>
              <input
                type="date"
                required
                value={preBidDate}
                onChange={(e) => setPreBidDate(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">3. Queries Deadline *</label>
              <input
                type="date"
                required
                value={queriesDate}
                onChange={(e) => setQueriesDate(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-[#C0392B] uppercase font-semibold mb-1.5">4. Bid Closing Date *</label>
              <input
                type="date"
                required
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="gov-input w-full text-xs border-[#FACDC9] font-bold text-[#C0392B]"
              />
            </div>

            <div>
              <label className="block text-[#124B7A] uppercase font-semibold mb-1.5">5. Bid Opening Date *</label>
              <input
                type="date"
                required
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                className="gov-input w-full text-xs font-bold text-[#124B7A]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION C: ⚡ MANDATORY ELIGIBILITY CRITERIA MATRIX (AI-EXTRACTED) */}
        {/* ========================================================================= */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#17212B]">Section C: Mandatory Eligibility Criteria Thresholds</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">Automated hard filters extracted from Section 02 of NIT</p>
            </div>
            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">
              4 Hard Filter Rules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
              <span className="font-semibold text-[#124B7A] block">Min 3-Yr Annual Turnover (₹ Cr)</span>
              <input
                type="number"
                step="1"
                required
                value={minTurnoverCr}
                onChange={(e) => setMinTurnoverCr(parseFloat(e.target.value))}
                className="gov-input w-full font-bold text-xs"
              />
              <span className="text-[10px] text-[#5F6B76]">Threshold: ≥ ₹50.0 Cr required</span>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
              <span className="font-semibold text-[#124B7A] block">Min Experience (Years)</span>
              <input
                type="number"
                step="1"
                required
                value={minExperienceYrs}
                onChange={(e) => setMinExperienceYrs(parseInt(e.target.value))}
                className="gov-input w-full font-bold text-xs"
              />
              <span className="text-[10px] text-[#5F6B76]">Threshold: ≥ 5 Years in Refinery</span>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
              <span className="font-semibold text-[#124B7A] block">Make-in-India Min %</span>
              <input
                type="number"
                step="1"
                required
                value={minLocalContentPercent}
                onChange={(e) => setMinLocalContentPercent(parseFloat(e.target.value))}
                className="gov-input w-full font-bold text-xs"
              />
              <span className="text-[10px] text-[#5F6B76]">Threshold: ≥ 50% Class-1 Local</span>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-2">
              <span className="font-semibold text-[#124B7A] block">OEM Authorization Letter</span>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemMandatory}
                    onChange={(e) => setOemMandatory(e.target.checked)}
                    className="accent-[#124B7A]"
                  />
                  <span className="font-bold text-[#17212B]">Annexure IV Mandatory</span>
                </label>
              </div>
              <span className="text-[10px] text-[#5F6B76]">Required if bidder is non-OEM</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION D: ✍ INTERNAL OFFICER / ADMIN MANUAL FIELDS */}
        {/* ========================================================================= */}
        <div className="gov-card p-6 space-y-5 border-l-4 border-[#124B7A]">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#124B7A]" />
                <h2 className="text-base font-bold text-[#17212B]">Section D: Officer & Internal Administrative Parameters</h2>
              </div>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                Internal accounting codes, meeting credentials, and sanction file references not present in the public NIT document
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B7791F] bg-[#FEF8EC] px-2.5 py-0.5 rounded border border-[#FCE6BE]">
              ✍ Officer Manual Entry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Internal Budget Head / CAPEX Accounting Code *
              </label>
              <input
                type="text"
                required
                value={budgetHeadCode}
                onChange={(e) => setBudgetHeadCode(e.target.value)}
                className="gov-input w-full font-mono text-xs font-semibold"
              />
              <span className="text-[11px] text-[#5F6B76] mt-1 block">ERP financial allocation identifier</span>
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Internal Sanction Order File Reference *
              </label>
              <input
                type="text"
                required
                value={sanctionOrderNo}
                onChange={(e) => setSanctionOrderNo(e.target.value)}
                className="gov-input w-full font-mono text-xs font-semibold"
              />
              <span className="text-[11px] text-[#5F6B76] mt-1 block">Approved competent authority sanction order</span>
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Tender Inviting Officer Designation & Employee ID *
              </label>
              <input
                type="text"
                required
                value={officerEmpId}
                onChange={(e) => setOfficerEmpId(e.target.value)}
                className="gov-input w-full text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Pre-Bid Virtual Video Meeting URL *
              </label>
              <input
                type="text"
                required
                value={preBidMeetingLink}
                onChange={(e) => setPreBidMeetingLink(e.target.value)}
                className="gov-input w-full text-xs font-mono"
              />
              <span className="text-[11px] text-[#5F6B76] mt-1 block">Dispatched to registered bidders before meeting date</span>
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Bidder Category Restriction Mandate *
              </label>
              <input
                type="text"
                required
                value={supplierClassRestriction}
                onChange={(e) => setSupplierClassRestriction(e.target.value)}
                className="gov-input w-full text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">
                Officer Digital Signature (DSC) Clearance PIN *
              </label>
              <input
                type="password"
                required
                value={securityDscPin}
                onChange={(e) => setSecurityDscPin(e.target.value)}
                className="gov-input w-full text-xs font-mono"
              />
              <span className="text-[11px] text-[#16803C] mt-1 block">✓ Cryptographic token connected</span>
            </div>
          </div>
        </div>

        {/* FORM FOOTER & PUBLISH BUTTONS */}
        <div className="gov-card p-6 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="gov-btn-secondary h-11 px-6 text-xs"
          >
            Cancel & Discard
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="gov-btn-primary h-11 px-8 text-xs font-bold flex items-center gap-2"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Review & Publish Tender to GeM Platform</span>
            </button>
          </div>
        </div>
      </form>
      )}

      {tenderDetailSubTab === 'top_bidders' && (
        <div className="gov-card p-10 text-center space-y-3">
          <Award className="w-10 h-10 text-[#5F6B76] mx-auto opacity-70" />
          <h3 className="text-sm font-bold text-[#17212B]">No Bidders Yet</h3>
          <p className="text-xs text-[#5F6B76] max-w-md mx-auto">
            This tender is currently in draft mode. Bidders will appear here once the tender is published to the GeM network.
          </p>
        </div>
      )}

      {tenderDetailSubTab === 'rules_weights' && (
        <div className="gov-card p-10 text-center space-y-3">
          <Sliders className="w-10 h-10 text-[#5F6B76] mx-auto opacity-70" />
          <h3 className="text-sm font-bold text-[#17212B]">Compliance Rules Configuration</h3>
          <p className="text-xs text-[#5F6B76] max-w-md mx-auto">
            Rules and scoring weights will be generated automatically based on the extracted metadata and the Global System Admin settings once published.
          </p>
        </div>
      )}

      {tenderDetailSubTab === 'audit_log' && (
        <div className="gov-card p-10 text-center space-y-3">
          <History className="w-10 h-10 text-[#5F6B76] mx-auto opacity-70" />
          <h3 className="text-sm font-bold text-[#17212B]">Audit Trail Pending</h3>
          <p className="text-xs text-[#5F6B76] max-w-md mx-auto">
            The cryptographic audit ledger will begin tracking provenance once this tender is officially published.
          </p>
        </div>
      )}
    </div>
  );
};
