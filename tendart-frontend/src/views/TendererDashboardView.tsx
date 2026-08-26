import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Users,
  ShieldCheck,
  Globe,
  Sliders,
  Database,
  Lock,
  Activity,
  Server,
  Cpu,
  FileText,
  FilePlus2,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Eye,
  Award,
  Clock,
  Sparkles,
  Building,
  RefreshCw,
  Search,
  Filter,
  Check,
  X,
  FileCheck2,
  History,
  Download,
  Calendar,
  IndianRupee,
  FileSpreadsheet
} from 'lucide-react';
import { Tender, Bid } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';

interface Props {
  tenders?: Tender[];
  bids?: Bid[];
  activeView?: string;
  onNavigate?: (view: string) => void;
  onSelectTender?: (id: string) => void;
}

export const TendererDashboardView: React.FC<Props> = ({
  tenders: propTenders,
  bids: propBids,
  activeView,
  onNavigate,
  onSelectTender
}) => {
  // Removed admin tab logic
  // Tenderer only uses the Tenders view
  const [activeAdminTab, setActiveAdminTab] = useState<'tenders'>('tenders');

  // Active Selected Tender for Editing & Inspection in Admin View
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [tenderDetailSubTab, setTenderDetailSubTab] = useState<'15_sections' | 'top_bidders' | 'rules_weights' | 'audit_log'>('15_sections');

  // Selected Bidder inside Top Bidders Tab
  const [selectedTenderBidId, setSelectedTenderBidId] = useState<string | null>(null);

  // Search & Filter for Tenders List
  const [tenderSearch, setTenderSearch] = useState('');
  const [tenderFilterStatus, setTenderFilterStatus] = useState<'ALL' | 'ACTIVE' | 'DRAFT' | 'CLOSED'>('ALL');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Managed Tenders in Admin Console
  const [managedTenders, setManagedTenders] = useState<
    (Tender & {
      emdAmountLakh: number;
      tenderFee: number;
      bidValidityDays: number;
      minTurnoverCr: number;
      minExperienceYrs: number;
      minLocalContentPercent: number;
      bidsCount: number;
      budgetHead: string;
      officerInCharge: string;
      ministry: string;
      location: string;
      contractMonths: number;
      publishDate: string;
      preBidDate: string;
      queriesDate: string;
      deadlineDate: string;
      openingDate: string;
      techStandard: string;
      oemMandatory: boolean;
      preBidLink: string;
    })[]
  >([
    {
      tender_id: 'TND-GEM-2026-002',
      tender_number: 'CPCL/2026/VALVE-881',
      title: 'PROCUREMENT OF INDUSTRIAL SAFETY VALVES FOR REFINERY OPERATIONS',
      department: 'Chennai Petroleum Corporation Limited (CPCL)',
      ministry: 'Ministry of Petroleum & Natural Gas, Government of India',
      description: 'Procurement of industrial safety valves including supply, installation, testing and commissioning for refinery operations.',
      estimated_value_cr: 24.50,
      emdAmountLakh: 24.50,
      tenderFee: 5000,
      bidValidityDays: 180,
      contractMonths: 12,
      location: 'Chennai, Tamil Nadu',
      minTurnoverCr: 50.0,
      minExperienceYrs: 5,
      minLocalContentPercent: 50.0,
      publishDate: '2026-08-18',
      preBidDate: '2026-08-22',
      queriesDate: '2026-08-24',
      deadlineDate: '2026-08-28',
      openingDate: '2026-08-29',
      submission_deadline: '2026-08-28T17:00:00Z',
      techStandard: 'API 520, API 526, ASME Section VIII Div 1',
      oemMandatory: true,
      preBidLink: 'https://meet.cpcl.gov.in/prebid-valve-881',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Shri R.K. Mehta (CGM Procurement)',
      created_at: '2026-08-18T10:00:00Z',
      bidsCount: 4,
      budgetHead: 'CPCL-CAPEX-2026-REF-VALVE-09',
      officerInCharge: 'Shri R. K. Sharma (GeM Division)',
      requirements: []
    },
    {
      tender_id: 'TND-GEM-2026-001',
      tender_number: 'GEM/2026/B/891240',
      title: 'Procurement of Industrial & Tactical Safety Equipment',
      department: 'Chennai Petroleum Corporation Limited (CPCL) / Logistics Div',
      ministry: 'Ministry of Petroleum & Natural Gas, Government of India',
      description: 'National competitive bid for supply of PPE, tactical sensors, and biometric tracking gear under Make-in-India mandates.',
      estimated_value_cr: 15.00,
      emdAmountLakh: 15.00,
      tenderFee: 2500,
      bidValidityDays: 180,
      contractMonths: 12,
      location: 'Chennai, Tamil Nadu',
      minTurnoverCr: 15.0,
      minExperienceYrs: 3,
      minLocalContentPercent: 50.0,
      publishDate: '2026-08-01',
      preBidDate: '2026-08-10',
      queriesDate: '2026-08-15',
      deadlineDate: '2026-09-15',
      openingDate: '2026-09-16',
      submission_deadline: '2026-09-15T17:00:00Z',
      techStandard: 'BIS / EN 397 / ISO 9001',
      oemMandatory: true,
      preBidLink: 'https://meet.cpcl.gov.in/prebid-safety-891',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Director of Procurement (CPCL)',
      created_at: '2026-08-01T10:00:00Z',
      bidsCount: 3,
      budgetHead: 'CPCL-OPEX-2026-LOG-88',
      officerInCharge: 'Dr. S. K. Narayanan',
      requirements: []
    },
    {
      tender_id: 'TND-GEM-2026-003',
      tender_number: 'GEM/2026/B/901844',
      title: 'Smart Grid Monitoring Substation Sensors & Telemetry Units',
      department: 'Power Grid Corporation of India / Power Systems Div',
      ministry: 'Ministry of Power, Government of India',
      description: 'Supply, calibration, and cloud integration of industrial smart telemetry sensors under DPIIT Class-1 requirements.',
      estimated_value_cr: 18.50,
      emdAmountLakh: 18.50,
      tenderFee: 5000,
      bidValidityDays: 180,
      contractMonths: 18,
      location: 'New Delhi & Regional Substations',
      minTurnoverCr: 25.0,
      minExperienceYrs: 4,
      minLocalContentPercent: 60.0,
      publishDate: '2026-08-12',
      preBidDate: '2026-08-25',
      queriesDate: '2026-09-05',
      deadlineDate: '2026-10-30',
      openingDate: '2026-10-31',
      submission_deadline: '2026-10-30T17:00:00Z',
      techStandard: 'IEC 61850 / IEEE 1588',
      oemMandatory: true,
      preBidLink: 'https://meet.powergrid.in/prebid-telemetry-901',
      status: 'ACTIVE_EVALUATION',
      created_by: 'Chief Procurement Officer',
      created_at: '2026-08-12T10:00:00Z',
      bidsCount: 2,
      budgetHead: 'PGCIL-CAPEX-2026-GRID-04',
      officerInCharge: 'Shri Amitabh Roy (PGCIL)',
      requirements: []
    }
  ]);

  // Selected Tender State for Editing
  const currentTender = managedTenders.find((t) => t.tender_id === selectedTenderId) || managedTenders[0];

  // Editable form state for currently selected tender
  const [editTitle, setEditTitle] = useState(currentTender.title);
  const [editRefNumber, setEditRefNumber] = useState(currentTender.tender_number);
  const [editDepartment, setEditDepartment] = useState(currentTender.department);
  const [editMinistry, setEditMinistry] = useState(currentTender.ministry);
  const [editEstimatedValue, setEditEstimatedValue] = useState<number>(currentTender.estimated_value_cr);
  const [editEmd, setEditEmd] = useState<number>(currentTender.emdAmountLakh);
  const [editTenderFee, setEditTenderFee] = useState<number>(currentTender.tenderFee);
  const [editValidity, setEditValidity] = useState<number>(currentTender.bidValidityDays);
  const [editContractMonths, setEditContractMonths] = useState<number>(currentTender.contractMonths);
  const [editLocation, setEditLocation] = useState(currentTender.location);
  const [editTurnover, setEditTurnover] = useState<number>(currentTender.minTurnoverCr);
  const [editExperience, setEditExperience] = useState<number>(currentTender.minExperienceYrs);
  const [editLocalContent, setEditLocalContent] = useState<number>(currentTender.minLocalContentPercent);
  const [editOemMandatory, setEditOemMandatory] = useState<boolean>(currentTender.oemMandatory);
  const [editBudgetHead, setEditBudgetHead] = useState(currentTender.budgetHead);
  const [editOfficerInCharge, setEditOfficerInCharge] = useState(currentTender.officerInCharge);
  const [editDescription, setEditDescription] = useState(currentTender.description);
  const [editTechStandard, setEditTechStandard] = useState(currentTender.techStandard);
  const [editPublishDate, setEditPublishDate] = useState(currentTender.publishDate);
  const [editPreBidDate, setEditPreBidDate] = useState(currentTender.preBidDate);
  const [editQueriesDate, setEditQueriesDate] = useState(currentTender.queriesDate);
  const [editDeadline, setEditDeadline] = useState(currentTender.deadlineDate);
  const [editOpeningDate, setEditOpeningDate] = useState(currentTender.openingDate);
  const [editPreBidLink, setEditPreBidLink] = useState(currentTender.preBidLink);

  // When selecting a new tender, sync form fields
  const handleSelectTenderForEdit = (t: typeof managedTenders[0]) => {
    setSelectedTenderId(t.tender_id);
    if (onSelectTender) onSelectTender(t.tender_id);
    setEditTitle(t.title);
    setEditRefNumber(t.tender_number);
    setEditDepartment(t.department);
    setEditMinistry(t.ministry);
    setEditEstimatedValue(t.estimated_value_cr);
    setEditEmd(t.emdAmountLakh);
    setEditTenderFee(t.tenderFee);
    setEditValidity(t.bidValidityDays);
    setEditContractMonths(t.contractMonths);
    setEditLocation(t.location);
    setEditTurnover(t.minTurnoverCr);
    setEditExperience(t.minExperienceYrs);
    setEditLocalContent(t.minLocalContentPercent);
    setEditOemMandatory(t.oemMandatory);
    setEditBudgetHead(t.budgetHead);
    setEditOfficerInCharge(t.officerInCharge);
    setEditDescription(t.description);
    setEditTechStandard(t.techStandard);
    setEditPublishDate(t.publishDate);
    setEditPreBidDate(t.preBidDate);
    setEditQueriesDate(t.queriesDate);
    setEditDeadline(t.deadlineDate);
    setEditOpeningDate(t.openingDate);
    setEditPreBidLink(t.preBidLink);
    setTenderDetailSubTab('15_sections');
  };

  // Update Tender Handler
  const handleUpdateTender = (e: React.FormEvent) => {
    e.preventDefault();
    setManagedTenders((prev) =>
      prev.map((t) => {
        if (t.tender_id === selectedTenderId) {
          return {
            ...t,
            title: editTitle,
            tender_number: editRefNumber,
            department: editDepartment,
            ministry: editMinistry,
            estimated_value_cr: Number(editEstimatedValue),
            emdAmountLakh: Number(editEmd),
            tenderFee: Number(editTenderFee),
            bidValidityDays: Number(editValidity),
            contractMonths: Number(editContractMonths),
            location: editLocation,
            minTurnoverCr: Number(editTurnover),
            minExperienceYrs: Number(editExperience),
            minLocalContentPercent: Number(editLocalContent),
            oemMandatory: editOemMandatory,
            budgetHead: editBudgetHead,
            officerInCharge: editOfficerInCharge,
            description: editDescription,
            techStandard: editTechStandard,
            publishDate: editPublishDate,
            preBidDate: editPreBidDate,
            queriesDate: editQueriesDate,
            deadlineDate: editDeadline,
            openingDate: editOpeningDate,
            preBidLink: editPreBidLink
          };
        }
        return t;
      })
    );
    showToast(`✓ Tender ${editRefNumber} updated successfully!`);
  };

  // Delete / Cancel Tender Handler
  const handleDeleteTender = () => {
    if (!confirm(`Are you sure you want to cancel and delete tender ${currentTender.tender_number}? This action is logged in the cryptographic audit ledger.`)) {
      return;
    }
    setManagedTenders((prev) => prev.filter((t) => t.tender_id !== selectedTenderId));
    setSelectedTenderId(null);
    showToast(`🗑 Tender ${currentTender.tender_number} cancelled & removed.`);
  };

  // Top Bidders for Current Tender
  const [tenderBidders] = useState([
    {
      bid_id: 'BID-2026-BHARAT-01',
      bidder_name: 'Bharat Tactical & Safety Gear Private Limited',
      quote_cr: 12.80,
      compliance_score: 94,
      risk_level: 'LOW',
      rank: 1,
      status: 'QUALIFIED',
      turnover_cr: 18.5,
      local_content_percent: 62.5,
      gst_status: 'ACTIVE (Verified)',
      pan_status: 'CBDT Matched',
      oem_status: 'Annexure IV Attached'
    },
    {
      bid_id: 'BID-2026-SURYA-02',
      bidder_name: 'Surya Infotech & Defense Solutions Pvt Ltd',
      quote_cr: 13.45,
      compliance_score: 88,
      risk_level: 'MEDIUM',
      rank: 2,
      status: 'UNDER_REVIEW',
      turnover_cr: 12.2,
      local_content_percent: 54.0,
      gst_status: 'ACTIVE (Verified)',
      pan_status: 'CBDT Matched',
      oem_status: 'Direct OEM'
    },
    {
      bid_id: 'BID-2026-APEX-03',
      bidder_name: 'Apex Global Protective Solutions Ltd',
      quote_cr: 14.10,
      compliance_score: 82,
      risk_level: 'MEDIUM',
      rank: 3,
      status: 'UNDER_REVIEW',
      turnover_cr: 22.0,
      local_content_percent: 51.5,
      gst_status: 'ACTIVE (Verified)',
      pan_status: 'CBDT Matched',
      oem_status: 'Annexure IV Attached'
    },
    {
      bid_id: 'BID-2026-ZENITH-04',
      bidder_name: 'Zenith Trade & Logistics LLP',
      quote_cr: 11.20,
      compliance_score: 35,
      risk_level: 'HIGH',
      rank: 4,
      status: 'DISQUALIFIED',
      turnover_cr: 3.2,
      local_content_percent: 22.0,
      gst_status: 'SUSPENDED (Flagged)',
      pan_status: 'CBDT Mismatch',
      oem_status: 'Missing Annexure'
    }
  ]);

  // Filtered Tenders List
  const filteredTenders = managedTenders.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.tender_number.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.department.toLowerCase().includes(tenderSearch.toLowerCase());
    const matchesStatus = tenderFilterStatus === 'ALL' || t.status === tenderFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 bg-[#16803C] text-white rounded-lg shadow-lg text-xs font-bold flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Tenderer Header */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#124B7A] uppercase tracking-wider text-[11px]">
            Tender Authority Console
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#5F6B76] text-xs shrink-0">
          <Building className="w-3.5 h-3.5 text-[#124B7A]" />
          <span>Tender Creation Mode</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ACTIVE TENDERS DIRECTORY (LIST VIEW) */}
      {/* ========================================================================= */}
      {!selectedTenderId && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                Tender Authority
              </span>
              <h1 className="text-2xl font-bold text-[#17212B] mt-1">Platform Active Tenders Directory</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                Select any tender to inspect all 15 specification sections in editable format, update/delete records, and view participating top bidders.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8A949E] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={tenderSearch}
                  onChange={(e) => setTenderSearch(e.target.value)}
                  placeholder="Search tender reference, department..."
                  className="gov-input pl-9 pr-3 text-xs w-64 h-9"
                />
              </div>
              <button 
                onClick={() => onNavigate?.('create_tender')}
                className="gov-btn-primary h-9 px-4 text-xs flex items-center gap-2"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>Create / Ingest Tender PDF</span>
              </button>
            </div>
          </div>

          {/* Organization KPI Cards - Only show on Dashboard */}
          {activeView !== 'tenders' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="gov-card p-5">
                <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Tenders</span>
                <p className="text-2xl font-bold text-[#17212B] mt-2">12</p>
                <p className="text-xs text-[#5F6B76] mt-1">Currently Published</p>
              </div>
              <div className="gov-card p-5">
                <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Draft Tenders</span>
                <p className="text-2xl font-bold text-[#124B7A] mt-2">4</p>
                <p className="text-xs text-[#5F6B76] mt-1">Pending AI Extraction</p>
              </div>
              <div className="gov-card p-5">
                <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Total Bids Ingested</span>
                <p className="text-2xl font-bold text-[#16803C] mt-2">86</p>
                <p className="text-xs text-[#5F6B76] mt-1">Across all tenders</p>
              </div>
              <div className="gov-card p-5">
                <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Officer Handoffs</span>
                <p className="text-2xl font-bold text-[#B7791F] mt-2">17</p>
                <p className="text-xs text-[#5F6B76] mt-1">Awaiting Evaluation</p>
              </div>
            </div>
          )}

          {/* Tenders Table */}
          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>TENDER REFERENCE</th>
                  <th>SCOPE TITLE & DEPARTMENT</th>
                  <th>ESTIMATED VALUE</th>
                  <th>BIDS RECEIVED</th>
                  <th>OFFICER IN CHARGE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenders.map((t) => (
                  <tr key={t.tender_id} className="hover:bg-[#F8FAFC] cursor-pointer" onClick={() => handleSelectTenderForEdit(t)}>
                    <td>
                      <span className="font-mono font-bold text-[#124B7A] text-xs bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                        {t.tender_number}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="font-bold text-[#17212B] text-xs line-clamp-1">{t.title}</p>
                        <p className="text-[11px] text-[#5F6B76] mt-0.5">{t.department}</p>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-[#124B7A] text-xs">₹ {t.estimated_value_cr} Cr</span>
                    </td>
                    <td>
                      <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">
                        {t.bidsCount} Bids Ingested
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-[#17212B]">{t.officerInCharge}</span>
                    </td>
                    <td>
                      <StatusBadge status={t.status} size="sm" />
                    </td>
                    <td>
                      <button
                        onClick={() => handleSelectTenderForEdit(t)}
                        className="gov-btn-primary h-8 px-3 text-xs flex items-center gap-1.5"
                      >
                        <span>Manage Tender</span>
                        <ArrowRight className="w-3 h-3" />
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
      {/* 2. FULL 15-SECTION DETAILED EDITABLE TENDER GOVERNANCE SCREEN */}
      {/* ========================================================================= */}
      {selectedTenderId && (
        <div className="space-y-6">
          {/* Top Breadcrumb & Action Bar */}
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTenderId(null)}
                className="hover:text-[#124B7A] flex items-center gap-1 font-semibold text-[#5F6B76]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tenders Directory</span>
              </button>
              <span>/</span>
              <span>CPCL</span>
              <span>/</span>
              <span className="text-[#17212B] font-bold">{editRefNumber}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDeleteTender}
                className="h-8 px-3 rounded-md text-xs font-bold text-[#C0392B] bg-[#FDF2F1] border border-[#FACDC9] hover:bg-[#FCE3E1] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete / Cancel Tender</span>
              </button>

              <button
                onClick={handleUpdateTender}
                className="gov-btn-primary h-8 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Update & Save Tender</span>
              </button>

              <button
                onClick={() => showToast('Tender published to GeM Network Successfully!')}
                className="gov-btn-primary bg-[#16803C] hover:bg-[#126b32] text-white border-transparent h-8 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Publish Tender on GeM</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs on Top: 15 Sections vs Top Bidders vs Rules Weights vs Audit Log */}
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
              onClick={() => {
                setTenderDetailSubTab('top_bidders');
                setSelectedTenderBidId(null); // Reset when clicking the tab
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                tenderDetailSubTab === 'top_bidders'
                  ? 'bg-[#124B7A] text-white'
                  : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Participating Bidders & Live Rankings ({tenderBidders.length})</span>
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

          {/* SUB-TAB 1: COMPLETE 15-SECTION EDITABLE SPECIFICATION */}
          {tenderDetailSubTab === '15_sections' && (
            <form onSubmit={handleUpdateTender} className="space-y-6">
              {/* Hero Tender Header Card */}
              <div className="gov-card p-6 lg:p-7 space-y-6 border-l-4 border-[#124B7A]">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#124B7A] text-sm bg-[#EBF3FA] px-3 py-1 rounded border border-[#D0E2F2]">
                    {editRefNumber}
                  </span>

                  <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#16803C]" />
                    OPEN FOR SUBMISSION (ADMIN EDITABLE)
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Tender Title (Editable)</label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="gov-input w-full text-lg lg:text-xl font-bold text-[#17212B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Procuring Department</label>
                      <input
                        type="text"
                        required
                        value={editDepartment}
                        onChange={(e) => setEditDepartment(e.target.value)}
                        className="gov-input w-full text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Parent Ministry</label>
                      <input
                        type="text"
                        required
                        value={editMinistry}
                        onChange={(e) => setEditMinistry(e.target.value)}
                        className="gov-input w-full text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Editable Top Highlight Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                    <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">ESTIMATED VALUE (₹ CR)</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editEstimatedValue}
                      onChange={(e) => setEditEstimatedValue(parseFloat(e.target.value))}
                      className="gov-input w-full font-bold text-xl text-[#124B7A] h-9"
                    />
                  </div>

                  <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                    <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">EARNEST MONEY (₹ LAKH)</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editEmd}
                      onChange={(e) => setEditEmd(parseFloat(e.target.value))}
                      className="gov-input w-full font-bold text-xl text-[#17212B] h-9"
                    />
                  </div>

                  <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                    <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">TENDER FEE (₹)</span>
                    <input
                      type="number"
                      required
                      value={editTenderFee}
                      onChange={(e) => setEditTenderFee(parseInt(e.target.value))}
                      className="gov-input w-full font-bold text-xl text-[#17212B] h-9"
                    />
                  </div>

                  <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
                    <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">BID VALIDITY (DAYS)</span>
                    <input
                      type="number"
                      required
                      value={editValidity}
                      onChange={(e) => setEditValidity(parseInt(e.target.value))}
                      className="gov-input w-full font-bold text-xl text-[#17212B] h-9"
                    />
                  </div>
                </div>
              </div>
              {/* 2-Column Overview & Deadlines Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 gov-card p-6 space-y-4">
                  <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-3 uppercase tracking-wider text-[11px] text-[#5F6B76]">
                    TENDER OVERVIEW & INTERNAL ACCOUNTING
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Tender Type</label>
                      <input type="text" defaultValue="Open Tender" className="gov-input w-full text-xs" />
                    </div>
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Procurement Category</label>
                      <input type="text" defaultValue="Goods & Services" className="gov-input w-full text-xs" />
                    </div>
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Execution Location</label>
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="gov-input w-full text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Contract Duration (Months)</label>
                      <input
                        type="number"
                        value={editContractMonths}
                        onChange={(e) => setEditContractMonths(parseInt(e.target.value))}
                        className="gov-input w-full text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Internal Budget Head *</label>
                      <input
                        type="text"
                        value={editBudgetHead}
                        onChange={(e) => setEditBudgetHead(e.target.value)}
                        className="gov-input w-full text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5F6B76] font-semibold mb-1">Assigned Officer *</label>
                      <input
                        type="text"
                        value={editOfficerInCharge}
                        onChange={(e) => setEditOfficerInCharge(e.target.value)}
                        className="gov-input w-full text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="gov-card p-6 space-y-3 bg-[#FFFFFF]">
                  <h3 className="text-[11px] font-bold text-[#5F6B76] uppercase tracking-wider">SUBMISSION DEADLINE</h3>
                  <div>
                    <input
                      type="date"
                      required
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                      className="gov-input w-full text-base font-bold text-[#C0392B]"
                    />
                    <p className="text-xs text-[#5F6B76] mt-1">17:00 IST • Closing Time</p>
                  </div>

                  <div className="pt-3 border-t border-[#E1E6EA] space-y-2 text-xs">
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
                  </div>
                </div>
              </div>

              {/* 01 DESCRIPTION & SCOPE OF WORK */}
              <div className="gov-card p-6 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">01</span>
                  <span>DESCRIPTION & SCOPE OF WORK</span>
                </h2>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs leading-relaxed"
                />
              </div>

              {/* 02 ELIGIBILITY & QUALIFICATION REQUIREMENTS (EDITABLE) */}
              <div className="gov-card p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                  <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                    <span className="font-mono text-[#124B7A]">02</span>
                    <span>ELIGIBILITY & QUALIFICATION REQUIREMENTS THRESHOLDS</span>
                  </h2>
                  <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">
                    Hard Filters
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1.5">
                    <span className="font-semibold text-[#124B7A] block">Min 3-Yr Annual Turnover (₹ Cr)</span>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editTurnover}
                      onChange={(e) => setEditTurnover(parseFloat(e.target.value))}
                      className="gov-input w-full font-bold text-xs"
                    />
                  </div>

                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1.5">
                    <span className="font-semibold text-[#124B7A] block">Min Experience (Years)</span>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editExperience}
                      onChange={(e) => setEditExperience(parseInt(e.target.value))}
                      className="gov-input w-full font-bold text-xs"
                    />
                  </div>

                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] space-y-1.5">
                    <span className="font-semibold text-[#124B7A] block">Make-in-India Min %</span>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editLocalContent}
                      onChange={(e) => setEditLocalContent(parseFloat(e.target.value))}
                      className="gov-input w-full font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 03 BID STRUCTURE (TWO-COVER SYSTEM) */}
              <div className="gov-card p-6 space-y-4 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">03</span>
                  <span>BID STRUCTURE (TWO-COVER SYSTEM)</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#EBF3FA] rounded-md border border-[#D0E2F2] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#D0E2F2] pb-2">
                      <span className="font-bold text-[#124B7A]">COVER 1: TECHNICAL BID</span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#124B7A] font-semibold">Stage 1 + 2</span>
                    </div>
                    <p>• Statutory certificates (GST, PAN, UDIN, MCA)</p>
                    <p>• Audited financial statements & turnover certificates</p>
                    <p>• OEM authorization (Annexure IV) & datasheets</p>
                  </div>

                  <div className="p-4 bg-[#EBF6EE] rounded-md border border-[#CEEBD5] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#CEEBD5] pb-2">
                      <span className="font-bold text-[#16803C]">COVER 2: FINANCIAL BID</span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#16803C] font-semibold">Stage 3</span>
                    </div>
                    <p>• BOQ.xlsx schedule with itemized rates</p>
                    <p>• Commercial quotation in INR</p>
                    <p>• Applicable GST rate breakdown</p>
                  </div>
                </div>
              </div>

              {/* 04 DOCUMENTS REQUIRED TABLE */}
              <div className="gov-card overflow-hidden text-xs">
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold text-[#17212B]">PAN Certificate</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">10 MB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-[#17212B]">GST Registration Certificate</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">10 MB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-[#17212B]">Company Registration Certificate</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">10 MB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-[#17212B]">Turnover Certificate / Audited Financials</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">20 MB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-[#17212B]">OEM Authorization Letter (Annexure IV)</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">10 MB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-[#17212B]">Make in India Declaration</td>
                      <td><span className="text-xs font-semibold text-[#16803C]">Yes</span></td>
                      <td className="font-mono text-xs">PDF</td>
                      <td className="text-xs text-[#5F6B76]">10 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 05 TENDER DOCUMENTS */}
              <div className="gov-card p-6 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">05</span>
                  <span>TENDER DOCUMENTS (DOWNLOAD & PREVIEW)</span>
                </h2>

                <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md">
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#124B7A]" />
                      <span className="font-semibold text-[#17212B]">Tender Document NIT.pdf</span>
                      <span className="text-[11px] text-[#5F6B76]">(4.8 MB)</span>
                    </div>
                    <button type="button" className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-[#16803C]" />
                      <span className="font-semibold text-[#17212B]">BOQ Price Schedule.xlsx</span>
                      <span className="text-[11px] text-[#5F6B76]">(184 KB)</span>
                    </div>
                    <button type="button" className="gov-btn-secondary h-7 px-2.5 text-[11px]">Download</button>
                  </div>
                </div>
              </div>

              {/* 07 IMPORTANT DATES TIMELINE (EDITABLE) */}
              <div className="gov-card p-6 space-y-4 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">07</span>
                  <span>IMPORTANT DATES & MILESTONES (IST)</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">1. Published</label>
                    <input
                      type="date"
                      value={editPublishDate}
                      onChange={(e) => setEditPublishDate(e.target.value)}
                      className="gov-input w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">2. Pre-Bid Meeting</label>
                    <input
                      type="date"
                      value={editPreBidDate}
                      onChange={(e) => setEditPreBidDate(e.target.value)}
                      className="gov-input w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">3. Queries Deadline</label>
                    <input
                      type="date"
                      value={editQueriesDate}
                      onChange={(e) => setEditQueriesDate(e.target.value)}
                      className="gov-input w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C0392B] font-semibold mb-1">4. Bid Closing</label>
                    <input
                      type="date"
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                      className="gov-input w-full text-xs font-bold text-[#C0392B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#124B7A] font-semibold mb-1">5. Bid Opening</label>
                    <input
                      type="date"
                      value={editOpeningDate}
                      onChange={(e) => setEditOpeningDate(e.target.value)}
                      className="gov-input w-full text-xs font-bold text-[#124B7A]"
                    />
                  </div>
                </div>
              </div>

              {/* 08 TECHNICAL SPECIFICATIONS */}
              <div className="gov-card p-6 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">08</span>
                  <span>TECHNICAL SPECIFICATIONS & STANDARDS</span>
                </h2>
                <div>
                  <label className="block text-[#5F6B76] font-semibold mb-1">Applicable Engineering Standard</label>
                  <input
                    type="text"
                    value={editTechStandard}
                    onChange={(e) => setEditTechStandard(e.target.value)}
                    className="gov-input w-full text-xs font-semibold"
                  />
                </div>
              </div>

              {/* 12 PRE-BID MEETING & VIDEO LINK */}
              <div className="gov-card p-6 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-[#17212B] flex items-center gap-2">
                  <span className="font-mono text-[#124B7A]">12</span>
                  <span>PRE-BID MEETING LINK & CREDENTIALS</span>
                </h2>
                <div>
                  <label className="block text-[#5F6B76] font-semibold mb-1">Secure Video Conference URL</label>
                  <input
                    type="text"
                    value={editPreBidLink}
                    onChange={(e) => setEditPreBidLink(e.target.value)}
                    className="gov-input w-full text-xs font-mono"
                  />
                </div>
              </div>

              {/* Update & Save Footer */}
              <div className="gov-card p-4 flex items-center justify-between bg-white">
                <span className="text-xs text-[#5F6B76]">
                  All changes will be cryptographically updated in the central registry and live across officer and bidder consoles.
                </span>
                <button
                  type="submit"
                  className="gov-btn-primary h-11 px-8 text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Update & Save Tender Specification</span>
                </button>
              </div>
            </form>
          )}

          {/* SUB-TAB 2: PARTICIPATING BIDDERS & LIVE RANKINGS */}
          {tenderDetailSubTab === 'top_bidders' && (
            <div className="space-y-6">
              {!selectedTenderBidId ? (
                <div className="gov-card overflow-hidden">
                  <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-[#17212B]">Participating Bidders & Automated Rankings</h2>
                      <p className="text-xs text-[#5F6B76] mt-0.5">Live evaluation scores, price quotes, and registry compliance</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5]">
                        {tenderBidders.length} Bids Ingested
                      </span>
                      <button 
                        onClick={() => showToast('Award Dossier PDF generated successfully.')}
                        className="gov-btn-secondary h-8 px-3 text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-3 h-3" />
                        <span>Print Award Dossier</span>
                      </button>
                    </div>
                  </div>

                  <table className="w-full gov-table text-left">
                    <thead>
                      <tr>
                        <th>RANK</th>
                        <th>ENTERPRISE BIDDER</th>
                        <th>COMMERCIAL QUOTE</th>
                        <th>COMPLIANCE SCORE</th>
                        <th>REGISTRY STATUS</th>
                        <th>OEM & MII STATUS</th>
                        <th>EVALUATION STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenderBidders.map((b) => (
                        <tr 
                          key={b.bid_id} 
                          className="hover:bg-[#F8FAFC] cursor-pointer"
                          onClick={() => setSelectedTenderBidId(b.bid_id)}
                        >
                          <td>
                            <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                              b.rank === 1 ? 'bg-[#EBF6EE] text-[#16803C]' : 'bg-[#F6F8FA] text-[#5F6B76]'
                            }`}>
                              L{b.rank}
                            </span>
                          </td>
                          <td>
                            <div>
                              <p className="font-bold text-[#17212B] text-xs">{b.bidder_name}</p>
                              <p className="font-mono text-[10px] text-[#5F6B76] mt-0.5">{b.bid_id}</p>
                            </div>
                          </td>
                          <td>
                            <span className="font-bold text-[#124B7A] text-xs">₹ {b.quote_cr} Cr</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs">{b.compliance_score}/100</span>
                              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                b.risk_level === 'LOW' ? 'bg-[#EBF6EE] text-[#16803C]' : b.risk_level === 'MEDIUM' ? 'bg-[#FEF8EC] text-[#B7791F]' : 'bg-[#FDF2F1] text-[#C0392B]'
                              }`}>
                                {b.risk_level}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="text-[11px] space-y-0.5">
                              <p className={b.gst_status.includes('Verified') ? 'text-[#16803C]' : 'text-[#C0392B]'}>GST: {b.gst_status}</p>
                              <p className={b.pan_status.includes('Matched') ? 'text-[#16803C]' : 'text-[#C0392B]'}>PAN: {b.pan_status}</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-[11px] space-y-0.5">
                              <p className="text-[#17212B]">OEM: {b.oem_status}</p>
                              <p className="text-[#5F6B76]">MII: {b.local_content_percent}%</p>
                            </div>
                          </td>
                          <td>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                              b.status === 'QUALIFIED'
                                ? 'bg-[#EBF6EE] text-[#16803C]'
                                : b.status === 'UNDER_REVIEW'
                                ? 'bg-[#FEF8EC] text-[#B7791F]'
                                : 'bg-[#FDF2F1] text-[#C0392B]'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Detailed Bidder Dossier View */}
                  {(() => {
                    const b = tenderBidders.find(x => x.bid_id === selectedTenderBidId)!;
                    return (
                      <>
                        <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                          <button
                            onClick={() => setSelectedTenderBidId(null)}
                            className="gov-btn-secondary h-8 px-3 text-xs"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Live Rankings</span>
                          </button>
                        </div>
                        
                        <div className="gov-card p-6 space-y-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E1E6EA] pb-5">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                                  {b.bid_id}
                                </span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                  b.risk_level === 'LOW' ? 'bg-[#EBF6EE] text-[#16803C] border border-[#CEEBD5]' : 
                                  b.risk_level === 'MEDIUM' ? 'bg-[#FEF8EC] text-[#B7791F] border border-[#FBE3B8]' : 
                                  'bg-[#FDF2F1] text-[#C0392B] border border-[#FACDC9]'
                                }`}>
                                  {b.risk_level} RISK
                                </span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                  b.status === 'QUALIFIED' ? 'bg-[#EBF6EE] text-[#16803C] border border-[#CEEBD5]' : 
                                  b.status === 'UNDER_REVIEW' ? 'bg-[#FEF8EC] text-[#B7791F] border border-[#FBE3B8]' : 
                                  'bg-[#FDF2F1] text-[#C0392B] border border-[#FACDC9]'
                                }`}>
                                  {b.status}
                                </span>
                              </div>
                              <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{b.bidder_name}</h1>
                            </div>
                  
                            <div className="flex items-center gap-6 shrink-0">
                              <div className="text-right">
                                <p className="text-xs text-[#5F6B76] uppercase font-semibold">Total Compliance</p>
                                <p className="text-3xl font-bold text-[#17212B] mt-0.5">{b.compliance_score}<span className="text-sm text-[#5F6B76] font-normal">/100</span></p>
                              </div>
                  
                              <div className="text-right border-l border-[#E1E6EA] pl-6">
                                <p className="text-xs text-[#5F6B76] uppercase font-semibold">Commercial Quote (L{b.rank})</p>
                                <p className="text-2xl font-bold text-[#124B7A] mt-0.5">₹ {b.quote_cr} Cr</p>
                              </div>
                            </div>
                          </div>
                  
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
                              <p className="text-sm font-bold text-[#124B7A] mt-0.5">{b.compliance_score > 50 ? '22 / 25 (88%)' : '5 / 25 (20%)'}</p>
                            </div>
                            <div>
                              <span className="text-[#5F6B76] uppercase font-semibold">Local Content (10%)</span>
                              <p className="text-sm font-bold text-[#16803C] mt-0.5">10 / 10 (100%)</p>
                            </div>
                            <div>
                              <span className="text-[#5F6B76] uppercase font-semibold">Turnover</span>
                              <p className="text-sm font-bold text-[#16803C] mt-0.5">₹ {b.turnover_cr} Cr</p>
                            </div>
                          </div>
                        </div>

                        {/* Extracted Bidder Submission Form (Mirroring Tender Specs) */}
                        <div className={`gov-card p-6 lg:p-7 space-y-6 border-l-4 ${b.risk_level === 'LOW' ? 'border-[#16803C]' : 'border-[#C0392B]'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[#124B7A] text-sm bg-[#EBF3FA] px-3 py-1 rounded border border-[#D0E2F2]">
                              {b.bid_id}
                            </span>
                            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#16803C]" />
                              AI EXTRACTED & VERIFIED SUBMISSION
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Tender Applied For</label>
                              <div className="gov-input w-full text-sm font-bold text-[#124B7A] bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed">
                                {editTitle} ({editRefNumber})
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Enterprise Bidder Name</label>
                              <div className="gov-input w-full text-lg lg:text-xl font-bold text-[#17212B] bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed flex items-center justify-between">
                                 {b.bidder_name}
                                 <span className="text-[10px] font-normal text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded border border-[#CEEBD5]">Verified Entity</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div>
                                <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">GST Registration (Extracted)</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed flex justify-between items-center">
                                   <span>07AABC{b.bid_id.slice(-6)}1Z5</span>
                                   <span className={b.gst_status.includes('Verified') ? 'text-[#16803C] font-semibold' : 'text-[#C0392B] font-semibold'}>{b.gst_status}</span>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">PAN Account (Extracted)</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed flex justify-between items-center">
                                   <span>ABCDE1234F</span>
                                   <span className={b.pan_status.includes('Matched') ? 'text-[#16803C] font-semibold' : 'text-[#C0392B] font-semibold'}>{b.pan_status}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4 Extracted Highlight Cards */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1 relative group">
                              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">COMMERCIAL QUOTE (₹ CR)</span>
                              <div className="w-full font-bold text-xl text-[#124B7A] h-9 flex items-center">
                                 {b.quote_cr}
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => showToast('Opening BoQ')} className="p-1 bg-white rounded border border-[#E1E6EA] text-[#5F6B76] hover:text-[#124B7A]"><Eye className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1 relative group">
                              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">EMD SUBMITTED (₹ LAKH)</span>
                              <div className="w-full font-bold text-xl text-[#17212B] h-9 flex items-center">
                                 {editEmd}
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => showToast('Opening e-BG')} className="p-1 bg-white rounded border border-[#E1E6EA] text-[#5F6B76] hover:text-[#124B7A]"><Eye className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1 relative group">
                              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">TENDER FEE PAID (₹)</span>
                              <div className="w-full font-bold text-xl text-[#17212B] h-9 flex items-center">
                                 {editTenderFee}
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => showToast('Opening Receipt')} className="p-1 bg-white rounded border border-[#E1E6EA] text-[#5F6B76] hover:text-[#124B7A]"><Eye className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1 relative group">
                              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">BID VALIDITY ACCEPTED (DAYS)</span>
                              <div className="w-full font-bold text-xl text-[#17212B] h-9 flex items-center">
                                 {editValidity}
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => showToast('Opening Undertaking')} className="p-1 bg-white rounded border border-[#E1E6EA] text-[#5F6B76] hover:text-[#124B7A]"><Eye className="w-3 h-3" /></button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2-Column Overview & Registry Verification */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 gov-card p-6 space-y-4">
                            <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-3 uppercase tracking-wider text-[11px] text-[#5F6B76]">
                              BIDDER COMPLIANCE & FINANCIALS (AI EXTRACTED)
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Tender Type</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  Open Tender (Accepted)
                                </div>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Procurement Category</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  Goods & Services (Accepted)
                                </div>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Procuring Department</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  {editDepartment}
                                </div>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Parent Ministry</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  {editMinistry}
                                </div>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Financial Turnover (CA Certified)</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  ₹ {b.turnover_cr} Cr
                                </div>
                                <button onClick={() => showToast('Opening CA Cert')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Past Experience</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  {editExperience + 2} Years (3 Client Certs)
                                </div>
                                <button onClick={() => showToast('Opening Client Certs')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Make in India (MII) Local Content</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  {b.local_content_percent}% (Class 1 Supplier)
                                </div>
                                <button onClick={() => showToast('Opening DPIIT Affidavit')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">OEM Authorization (Annexure IV)</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  {b.oem_status}
                                </div>
                                <button onClick={() => showToast('Opening OEM Letter')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Execution Location Undertaking</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  Accepted: {editLocation}
                                </div>
                                <button onClick={() => showToast('Opening Location Form')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="relative group">
                                <label className="block text-[#5F6B76] font-semibold mb-1">Contract Duration Acceptance</label>
                                <div className="gov-input w-full text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed pr-8">
                                  Accepted: {editContractMonths} Months
                                </div>
                                <button onClick={() => showToast('Opening Duration Form')} className="absolute bottom-2 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="gov-card p-6 space-y-4 bg-[#F8FAFC]">
                            <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-3 uppercase tracking-wider text-[11px] text-[#5F6B76]">
                              SUBMISSION TIMESTAMP
                            </h2>
                            <div className="space-y-4">
                              <div>
                                 <label className="block text-[#5F6B76] font-semibold mb-1 text-[11px]">e-Sign Token Timestamp</label>
                                 <div className="font-bold text-[#16803C] text-sm">Prior to Deadline</div>
                                 <p className="text-[10px] text-[#5F6B76] mt-1">Validated against {editDeadline} 17:00 IST</p>
                              </div>
                              <div className="pt-2 border-t border-[#E1E6EA]">
                                 <label className="block text-[#5F6B76] font-semibold mb-1 text-[11px]">Internal Routing (Auto-Assigned)</label>
                                 <p className="text-[10px] text-[#17212B] font-medium">Budget Head: {editBudgetHead}</p>
                                 <p className="text-[10px] text-[#17212B] font-medium mt-1">Officer: {editOfficerInCharge}</p>
                              </div>
                              <button onClick={() => showToast('Opening DSC Log')} className="gov-btn-secondary w-full justify-center h-9 text-xs">
                                 View DSC Class 3 Log
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 08 TECHNICAL SPECIFICATIONS */}
                        <div className="gov-card p-6 space-y-4">
                          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                            <h2 className="text-sm font-bold text-[#17212B] uppercase tracking-wider text-[11px] text-[#5F6B76]">
                              08 TECHNICAL SPECIFICATIONS COMPLIANCE
                            </h2>
                            <button onClick={() => showToast('Opening NABL Reports')} className="gov-btn-secondary h-7 px-3 text-[11px]">View Lab Reports</button>
                          </div>
                          <div className="relative group">
                            <label className="block text-[11px] font-semibold text-[#5F6B76] uppercase mb-1">Technical Standard Verified</label>
                            <div className="gov-input w-full min-h-[80px] text-xs bg-[#F6F8FA] border-[#E1E6EA] cursor-not-allowed whitespace-pre-wrap pr-8">
                              Extracted Compliance: {editTechStandard}
{'\n\n'}
                              - Test Reports attached from NABL accredited lab.{'\n'}
                              - Parameters verified via Semantic AI Check against Tender Specs.
                            </div>
                            <button onClick={() => showToast('Opening Lab Reports')} className="absolute top-8 right-2 p-1 text-[#5F6B76] hover:text-[#124B7A] opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>

                        {/* BIDDER DOCUMENT VAULT */}
                        <div className="gov-card overflow-hidden mt-6">
                          <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
                            <div>
                              <h2 className="text-sm font-bold text-[#17212B]">Bidder Document Vault (Annexures & Evidence)</h2>
                              <p className="text-xs text-[#5F6B76] mt-0.5">Cryptographically signed and AI-verified PDF submissions</p>
                            </div>
                            <button onClick={() => showToast('Downloading ZIP...')} className="gov-btn-secondary h-8 px-3 text-xs flex items-center gap-1.5">
                              <Download className="w-3 h-3" />
                              <span>Download All (ZIP)</span>
                            </button>
                          </div>
                          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[
                              { title: 'Annexure I: GST Certificate', size: '1.2 MB', date: '25 Aug, 10:30 AM' },
                              { title: 'Annexure II: PAN Card Copy', size: '0.8 MB', date: '25 Aug, 10:32 AM' },
                              { title: 'Annexure III: CA Balance Sheet', size: '3.4 MB', date: '25 Aug, 10:35 AM' },
                              { title: 'Annexure IV: OEM Authorization', size: '1.1 MB', date: '25 Aug, 10:38 AM' },
                              { title: 'Annexure V: DPIIT MII Affidavit', size: '1.5 MB', date: '25 Aug, 10:40 AM' },
                              { title: 'Annexure VI: Experience Certs', size: '5.2 MB', date: '25 Aug, 10:45 AM' },
                              { title: 'Annexure VII: NABL Lab Reports', size: '8.7 MB', date: '25 Aug, 10:50 AM' },
                              { title: 'Annexure VIII: BoQ Price Bid', size: '0.5 MB', date: '25 Aug, 11:00 AM' }
                            ].map((doc, idx) => (
                              <div key={idx} className="border border-[#E1E6EA] rounded-md p-3 hover:border-[#124B7A] transition-colors group cursor-pointer" onClick={() => showToast(`Opening ${doc.title}`)}>
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-[#FDF2F1] text-[#C0392B] rounded">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-[#17212B] truncate" title={doc.title}>{doc.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[9px] text-[#5F6B76]">{doc.size}</span>
                                      <span className="w-1 h-1 rounded-full bg-[#E1E6EA]" />
                                      <span className="text-[9px] text-[#5F6B76] truncate">{doc.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 pt-2 border-t border-[#E1E6EA] flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-semibold text-[#124B7A] flex items-center gap-1">View Document <ArrowRight className="w-3 h-3" /></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 3: RULES CHECKLIST & WEIGHTS */}
          {tenderDetailSubTab === 'rules_weights' && (
            <div className="space-y-6">
              <div className="gov-card p-6 space-y-4">
                <h2 className="text-sm font-bold text-[#17212B]">Tender Specific Scoring Weights Configuration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] block">Statutory Compliance</span>
                    <span className="text-base font-bold text-[#124B7A] mt-1 block">30% Weight</span>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] block">Financial Turnover</span>
                    <span className="text-base font-bold text-[#124B7A] mt-1 block">25% Weight</span>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] block">Technical & OEM Match</span>
                    <span className="text-base font-bold text-[#124B7A] mt-1 block">25% Weight</span>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                    <span className="text-[#5F6B76] block">Make in India Local</span>
                    <span className="text-base font-bold text-[#124B7A] mt-1 block">20% Weight</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: CRYPTOGRAPHIC AUDIT TRAIL */}
          {tenderDetailSubTab === 'audit_log' && (
            <div className="space-y-6">
              <div className="gov-card p-6 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-[#17212B]">Tender Administrative Audit Log</h2>
                <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#124B7A] mr-2">26 Aug 2026 18:40</span>
                      <span>Tender metadata reviewed by System Administrator (admin@tendart.nic.in)</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#5F6B76]">sha256:7f1c3d...</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#124B7A] mr-2">18 Aug 2026 10:00</span>
                      <span>Tender published to GeM Portal by Shri R.K. Mehta (CGM Procurement)</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#5F6B76]">sha256:4b2a9e...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
