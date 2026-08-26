import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Sparkles,
  Eye,
  FileText,
  Lock,
  Building,
  Globe,
  Award,
  Layers,
  Database,
  ExternalLink,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sliders,
  Send,
  MessageSquare
} from 'lucide-react';
import { Bid, Tender, TenderRequirement } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';

interface Props {
  bid: Bid;
  tender: Tender;
  onBack: () => void;
  onRecordDecision?: (decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD', remarks: string) => void;
}

export const FullBidderDossierView: React.FC<Props> = ({
  bid,
  tender,
  onBack,
  onRecordDecision
}) => {
  // Active sub-tab inside the full dossier
  const [activeDossierTab, setActiveDossierTab] = useState<
    'requirements_matrix' | 'document_viewer' | 'cross_consistency' | 'decision_station'
  >('requirements_matrix');

  // Currently Selected Document in the Document Viewer Tab
  const [selectedDocId, setSelectedDocId] = useState<string>('DOC-GST');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Decision State
  const [decision, setDecision] = useState<'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD'>('APPROVE');
  const [remarks, setRemarks] = useState(
    'Bidder satisfies all statutory requirements (Active GSTN & CBDT PAN). 3-Year Audited Annual Turnover of ₹18.50 Cr exceeds mandatory ₹5.0 Cr threshold. OEM Authorization verified. Recommend for Technical Qualification.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decisionRecorded, setDecisionRecorded] = useState(false);

  // 6 Comprehensive Requirement vs Fulfillment Data Objects
  const requirementComparisons = [
    {
      id: 'REQ-GST-01',
      title: 'Mandatory GST Registration (Active Status)',
      category: 'Statutory Identity',
      mandatory: true,
      tenderRequirement: 'Active GST registration under GSTN with Regular Taxpayer status',
      submittedEvidence: 'Form GST REG-06 Certificate (Uploaded: 10-Aug-2026)',
      extractedValue: '07AABCB1234F1Z5 • Bharat Tactical & Safety Gear Pvt Ltd',
      govRegistryValue: 'ACTIVE (GSTN Live 200 OK • Principal Place: Okhla Phase-III)',
      matchResult: 'COMPLIANT',
      confidence: 99.4,
      docId: 'DOC-GST',
      page: 1
    },
    {
      id: 'REQ-PAN-01',
      title: 'Corporate Income Tax PAN Verification',
      category: 'Statutory Identity',
      mandatory: true,
      tenderRequirement: 'Valid PAN registered in CBDT Income Tax Master Registry',
      submittedEvidence: 'Corporate PAN Card Copy (Uploaded: 10-Aug-2026)',
      extractedValue: 'AABCB1234F • Status: Regular Business Enterprise',
      govRegistryValue: 'VALID & OPERATIONAL (CBDT Direct Query Match)',
      matchResult: 'COMPLIANT',
      confidence: 98.8,
      docId: 'DOC-PAN',
      page: 1
    },
    {
      id: 'REQ-TURNOVER-01',
      title: 'Minimum 3-Year Average Annual Turnover',
      category: 'Financial Eligibility',
      mandatory: true,
      tenderRequirement: 'Minimum 3-Year Average Annual Turnover ≥ ₹5.00 Crores',
      submittedEvidence: 'CA Audited Balance Sheet & P&L (FY 23-24, 24-25, 25-26)',
      extractedValue: '₹ 18.50 Crores Average (Exceeds Threshold by ₹13.50 Cr)',
      govRegistryValue: 'Tax Returns Matched: ₹19.20 Cr Reported to CBDT',
      matchResult: 'COMPLIANT',
      confidence: 96.5,
      docId: 'DOC-FIN',
      page: 4
    },
    {
      id: 'REQ-OEM-01',
      title: 'Valid OEM Authorization Letter (Annexure IV)',
      category: 'Technical Capability',
      mandatory: true,
      tenderRequirement: 'Manufacturer Authorization Letter issued on OEM Letterhead',
      submittedEvidence: 'Annexure IV Manufacturer Letter (Ref: OEM-VALVE-2026)',
      extractedValue: 'Authorized Supply Partner for CPCL Refinery Spec Sensors',
      govRegistryValue: 'Verified Manufacturer Signature & Issue Date (Valid thru 2027)',
      matchResult: 'COMPLIANT',
      confidence: 97.2,
      docId: 'DOC-OEM',
      page: 1
    },
    {
      id: 'REQ-MII-01',
      title: 'Make-in-India Class-1 Local Content (≥ 50%)',
      category: 'Public Procurement Mandate',
      mandatory: true,
      tenderRequirement: 'Minimum 50% Domestic Value Addition under DPIIT Order',
      submittedEvidence: 'Class-1 Make in India Self-Declaration on Letterhead',
      extractedValue: '62.5% Domestic Value Addition (Calculated as per GeM GTC)',
      govRegistryValue: 'Plant verified at Okhla Industrial Area, Delhi',
      matchResult: 'COMPLIANT',
      confidence: 100.0,
      docId: 'DOC-MII',
      page: 1
    },
    {
      id: 'REQ-DEBAR-01',
      title: 'National Vigilance & Debarment Check',
      category: 'Legal Integrity',
      mandatory: true,
      tenderRequirement: 'Zero active blacklisting or debarment records across CPPP & GeM',
      submittedEvidence: 'Vendor Integrity Undertaking Affidavit',
      extractedValue: 'No Debarment Record Reported by Enterprise',
      govRegistryValue: '0 MATCHES (8 Central Public Registries Queried)',
      matchResult: 'COMPLIANT',
      confidence: 100.0,
      docId: 'DOC-DEBAR',
      page: 1
    }
  ];

  // Document Library details
  const documentsList = [
    {
      id: 'DOC-GST',
      title: 'Form GST REG-06 Certificate.pdf',
      category: 'Statutory Identity',
      size: '1.8 MB',
      hash: 'sha256:4a8e2b9c1d0f5e3a8c7b9e1d2f4a6c8e0b2d4f6a',
      uploadedAt: '10 Aug 2026, 14:32 IST',
      extractedFields: [
        { label: 'GSTIN', value: '07AABCB1234F1Z5', match: true },
        { label: 'Legal Name', value: 'Bharat Tactical and Safety Gear Private Limited', match: true },
        { label: 'Trade Name', value: 'Bharat Tactical & Safety Gear', match: true },
        { label: 'Registration Date', value: '14/02/2018', match: true },
        { label: 'Taxpayer Status', value: 'Regular / Active', match: true },
        { label: 'Principal Address', value: 'Plot 14, Okhla Industrial Area Phase-III, New Delhi - 110020', match: true }
      ],
      previewContent: {
        title: 'GOVERNMENT OF INDIA • CERTIFICATE OF REGISTRATION (FORM GST REG-06)',
        bodyLines: [
          'Registration Number: 07AABCB1234F1Z5',
          'Legal Name: Bharat Tactical and Safety Gear Private Limited',
          'Trade Name: Bharat Tactical & Safety Gear',
          'Constitution of Business: Private Limited Company',
          'Address: Plot 14, Okhla Industrial Area Phase-III, New Delhi, Delhi, 110020',
          'Date of Validity: 14/02/2018 to Continuing',
          'Jurisdictional Office: Ward 84, Delhi Central'
        ],
        highlightBadge: 'OCR Vector Ground Truth Match: 99.4% with GSTN API'
      }
    },
    {
      id: 'DOC-FIN',
      title: '3-Year CA Audited Financial Statements.pdf',
      category: 'Financial Statements',
      size: '4.5 MB',
      hash: 'sha256:7f1c3d5e9a2b4c6e8f0a2d4b6c8e0a2d4f6a8b0c',
      uploadedAt: '15 Aug 2026, 11:20 IST',
      extractedFields: [
        { label: 'FY 2025-26 Turnover', value: '₹ 21.40 Crores', match: true },
        { label: 'FY 2024-25 Turnover', value: '₹ 18.20 Crores', match: true },
        { label: 'FY 2023-24 Turnover', value: '₹ 15.90 Crores', match: true },
        { label: '3-Year Average Turnover', value: '₹ 18.50 Crores (Required ≥ ₹5.0 Cr)', match: true },
        { label: 'Net Worth Status', value: 'Positive (₹ 8.40 Crores)', match: true },
        { label: 'Statutory Auditor UDIN', value: '26048192AAAAAB1234 (Verified)', match: true }
      ],
      previewContent: {
        title: 'INDEPENDENT AUDITOR’S REPORT & STATEMENT OF TURNOVER',
        bodyLines: [
          'To the Members of Bharat Tactical and Safety Gear Private Limited',
          'UDIN: 26048192AAAAAB1234',
          'Turnover for FY 2025-26: INR 21,40,00,000/-',
          'Turnover for FY 2024-25: INR 18,20,00,000/-',
          'Turnover for FY 2023-24: INR 15,90,00,000/-',
          'Average Annual Turnover: INR 18,50,00,000/- (Eighteen Crores Fifty Lakhs)',
          'We certify that the company satisfies all solvency and liquidity requirements.'
        ],
        highlightBadge: 'OCR Financial Extraction: ₹18.50 Cr Verified (Threshold ≥ ₹5.0 Cr)'
      }
    },
    {
      id: 'DOC-OEM',
      title: 'OEM Manufacturer Authorization Letter.pdf',
      category: 'Technical Capability',
      size: '1.4 MB',
      hash: 'sha256:9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      uploadedAt: '18 Aug 2026, 16:45 IST',
      extractedFields: [
        { label: 'OEM Principal', value: 'Apex Sensor Technologies India Pvt Ltd', match: true },
        { label: 'Authorized Partner', value: 'Bharat Tactical & Safety Gear Pvt Ltd', match: true },
        { label: 'Tender Reference', value: 'GEM/2026/B/891240', match: true },
        { label: 'Validity Period', value: 'Valid thru 31-Dec-2027', match: true },
        { label: 'Warranty Backing', value: '3 Years Comprehensive Back-to-Back', match: true }
      ],
      previewContent: {
        title: 'MANUFACTURER AUTHORIZATION FORM (ANNEXURE IV)',
        bodyLines: [
          'To: Procurement Officer, Chennai Petroleum Corporation Limited (CPCL)',
          'Tender Reference: GEM/2026/B/891240',
          'We, Apex Sensor Technologies India Pvt Ltd, who are official manufacturers of Refinery Tactical Sensors,',
          'do hereby authorize M/s Bharat Tactical and Safety Gear Private Limited,',
          'to submit a bid and subsequently negotiate and sign the contract.',
          'We guarantee full manufacturer warranty support for the entire tenure of the contract.'
        ],
        highlightBadge: 'OEM Manufacturer Signature & Authority Verified'
      }
    },
    {
      id: 'DOC-MII',
      title: 'Class-1 Make-in-India Declaration.pdf',
      category: 'Local Content',
      size: '0.8 MB',
      hash: 'sha256:3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e',
      uploadedAt: '19 Aug 2026, 09:15 IST',
      extractedFields: [
        { label: 'Local Supplier Class', value: 'Class-I Local Supplier', match: true },
        { label: 'Local Content %', value: '62.50% (Required ≥ 50%)', match: true },
        { label: 'Manufacturing Location', value: 'Plot 14, Okhla Phase-III, New Delhi', match: true },
        { label: 'Statutory Undertaking', value: 'Signed by Managing Director', match: true }
      ],
      previewContent: {
        title: 'SELF-DECLARATION CERTIFICATE FOR LOCAL CONTENT (DPIIT MANDATE)',
        bodyLines: [
          'Tender Ref: GEM/2026/B/891240',
          'We hereby certify that the goods/services offered meet the minimum local content requirement.',
          'Percentage of Local Value Addition: 62.50%',
          'Location of Manufacturing Facility: Plot 14, Okhla Phase-III, New Delhi - 110020',
          'We declare that we qualify as a Class-I Local Supplier as defined under Public Procurement Order.'
        ],
        highlightBadge: 'Make-in-India Domestic Value Addition: 62.5% (Class-I Compliant)'
      }
    }
  ];

  const currentDoc = documentsList.find((d) => d.id === selectedDocId) || documentsList[0];

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks) return alert('Mandatory officer justification remarks are required.');
    setIsSubmitting(true);
    if (onRecordDecision) {
      onRecordDecision(decision, remarks);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setDecisionRecorded(true);
      setTimeout(() => setDecisionRecorded(false), 4000);
    }, 500);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Breadcrumb & Action Navigation */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={onBack}
          className="gov-btn-secondary h-8 px-3 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Participating Bidders List</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#5F6B76] bg-[#FFFFFF] border border-[#E1E6EA] px-3 py-1 rounded-md">
            <Lock className="w-3.5 h-3.5 text-[#16803C]" />
            <span>Cryptographically Verified Audit Dossier (SHA-256)</span>
          </div>

          <button
            onClick={() => window.print()}
            className="gov-btn-secondary h-8 px-3 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Full Dossier</span>
          </button>
        </div>
      </div>

      {/* Hero Master Header Card */}
      <div className="gov-card p-6 lg:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E1E6EA] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
                Bid ID: {bid.bid_id}
              </span>
              <RiskBadge risk={bid.risk_level || 'LOW'} size="sm" />
              <StatusBadge status={bid.compliance_status || (bid as any).status || 'QUALIFIED'} size="sm" />
            </div>
            <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{bid.legal_name || bid.bidder_name}</h1>
            <p className="text-xs text-[#5F6B76]">
              Participating in Tender: <strong className="text-[#17212B]">{tender.tender_number}</strong> — {tender.title}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <span className="text-xs text-[#5F6B76] uppercase font-semibold">Total AI Compliance</span>
              <p className="text-3xl font-bold text-[#16803C] mt-0.5">
                {bid.compliance_score || 87}<span className="text-sm text-[#5F6B76] font-normal">/100</span>
              </p>
            </div>

            <div className="text-right border-l border-[#E1E6EA] pl-6">
              <span className="text-xs text-[#5F6B76] uppercase font-semibold">Commercial Bid</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-0.5">₹ {bid.bid_amount_cr} Cr</p>
              <p className="text-[11px] text-[#5F6B76]">Budget: ₹ {tender.estimated_value_cr} Cr</p>
            </div>
          </div>
        </div>

        {/* Enterprise Registration & Verification Identifiers Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-[#F6F8FA] p-4 rounded-lg border border-[#E1E6EA]">
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">GSTIN (Active Taxpayer)</span>
            <p className="font-mono font-bold text-[#124B7A] mt-0.5">{bid.gstin || '07AABCB1234F1Z5'}</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Permanent Account No (PAN)</span>
            <p className="font-mono font-bold text-[#17212B] mt-0.5">{bid.pan || 'AABCB1234F'}</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Udyam MSME Number</span>
            <p className="font-mono font-bold text-[#17212B] mt-0.5">{bid.udyam_number || 'UDYAM-DL-02-0019283'}</p>
          </div>
          <div>
            <span className="text-[#5F6B76] uppercase font-semibold">Assigned Procurement Officer</span>
            <p className="font-bold text-[#17212B] mt-0.5">Shri R. K. Sharma (GeM)</p>
          </div>
        </div>
      </div>

      {/* Dossier Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E1E6EA] pb-3 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveDossierTab('requirements_matrix')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeDossierTab === 'requirements_matrix'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Tender Requirements vs Fulfillment Matrix ({requirementComparisons.length})</span>
        </button>

        <button
          onClick={() => setActiveDossierTab('document_viewer')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeDossierTab === 'document_viewer'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>2. Full Document Viewer & OCR Highlights ({documentsList.length})</span>
        </button>

        <button
          onClick={() => setActiveDossierTab('cross_consistency')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeDossierTab === 'cross_consistency'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>3. Multi-Registry Cross-Verification</span>
        </button>

        <button
          onClick={() => setActiveDossierTab('decision_station')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeDossierTab === 'decision_station'
              ? 'bg-[#124B7A] text-white'
              : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Human Officer Decision Station</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. TENDER REQUIREMENTS VS FULFILLMENT MATRIX */}
      {/* ========================================================================= */}
      {activeDossierTab === 'requirements_matrix' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#17212B]">Tender Eligibility Conditions vs Bidder Fulfillment</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                Deterministic comparison of all tender rules against extracted evidence and live government registries.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5]">
              6 of 6 Requirements Verified Compliant
            </span>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th className="w-12 text-center">#</th>
                  <th>Tender Requirement Condition</th>
                  <th>Bidder Submitted Evidence</th>
                  <th>Extracted Value vs Registry Match</th>
                  <th>Compliance Status</th>
                  <th className="text-right">Inspect</th>
                </tr>
              </thead>
              <tbody>
                {requirementComparisons.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="text-center font-bold text-[#5F6B76] text-xs">{idx + 1}</td>
                    <td>
                      <div>
                        <span className="font-mono text-[10px] text-[#124B7A] font-bold block">{item.id}</span>
                        <p className="font-semibold text-[#17212B] text-sm">{item.title}</p>
                        <p className="text-xs text-[#5F6B76] mt-0.5">{item.tenderRequirement}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-[#17212B] text-xs">{item.submittedEvidence}</p>
                        <span className="text-[10px] text-[#5F6B76] bg-[#F1F4F7] px-2 py-0.2 rounded mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold text-[#17212B]">Extracted: {item.extractedValue}</p>
                        <p className="text-[#16803C] text-[11px] font-medium">Registry: {item.govRegistryValue}</p>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5] inline-block">
                          ✓ {item.matchResult}
                        </span>
                        <span className="text-[10px] text-[#5F6B76] block font-mono">
                          {item.confidence}% Confidence
                        </span>
                      </div>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => {
                          setSelectedDocId(item.docId);
                          setActiveDossierTab('document_viewer');
                        }}
                        className="gov-btn-secondary h-8 px-3 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect PDF</span>
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
      {/* 2. FULL DOCUMENT VIEWER & OCR HIGHLIGHTS */}
      {/* ========================================================================= */}
      {activeDossierTab === 'document_viewer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar: Document Selector */}
            <div className="gov-card p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#17212B] border-b border-[#E1E6EA] pb-2">
                Attached Proposal Documents ({documentsList.length})
              </h2>

              <div className="space-y-2 text-xs">
                {documentsList.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDocId(d.id)}
                    className={`p-3 rounded-md border cursor-pointer transition-colors space-y-1 ${
                      selectedDocId === d.id
                        ? 'bg-[#EBF3FA] border-[#124B7A] text-[#124B7A]'
                        : 'bg-[#FFFFFF] border-[#E1E6EA] hover:bg-[#F6F8FA] text-[#17212B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold truncate">{d.title}</span>
                      <span className="text-[10px] text-[#16803C] font-semibold bg-[#EBF6EE] px-1.5 py-0.2 rounded">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5F6B76]">{d.category} • {d.size}</p>
                  </div>
                ))}
              </div>

              {/* Document Hash Box */}
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] text-[11px] space-y-1">
                <span className="font-bold text-[#5F6B76] uppercase text-[10px]">Cryptographic Document Hash</span>
                <p className="font-mono text-[#5F6B76] break-all">{currentDoc.hash}</p>
                <p className="text-[#16803C] font-semibold text-[10px]">✓ Blockchain-Tamper Resistant</p>
              </div>
            </div>

            {/* Right: Full Document Preview with OCR Bounding Box */}
            <div className="lg:col-span-2 gov-card p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#17212B]">{currentDoc.title}</h3>
                  <p className="text-xs text-[#5F6B76] mt-0.5">Uploaded: {currentDoc.uploadedAt} • Category: {currentDoc.category}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
                    className="gov-btn-secondary h-7 w-7 p-0"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-[#5F6B76] font-mono">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                    className="gov-btn-secondary h-7 w-7 p-0"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Simulated Document Paper */}
              <div className="border border-[#CBD3DA] rounded-md p-6 bg-[#FFFFFF] min-h-[380px] space-y-4 text-xs font-mono text-[#17212B] shadow-xs">
                <div className="text-center font-bold text-sm pb-2 border-b border-[#E1E6EA] text-[#124B7A]">
                  {currentDoc.previewContent.title}
                </div>

                <div className="space-y-2 leading-relaxed">
                  {currentDoc.previewContent.bodyLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* OCR Bounding Box Indicator */}
                <div className="evidence-highlight-box p-3 rounded mt-4">
                  <span className="text-[10px] font-bold text-[#124B7A] uppercase tracking-wider block">
                    [PyMuPDF Vector Token Ground Truth Match]
                  </span>
                  <p className="text-xs font-bold text-[#17212B] mt-1">
                    {currentDoc.previewContent.highlightBadge}
                  </p>
                </div>
              </div>

              {/* Extracted Key-Value Fields */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F6B76]">
                  Extracted Structured Key-Value Entities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {currentDoc.extractedFields.map((f, i) => (
                    <div key={i} className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA] flex items-center justify-between">
                      <div>
                        <span className="text-[#5F6B76] text-[11px] block">{f.label}</span>
                        <span className="font-semibold text-[#17212B]">{f.value}</span>
                      </div>
                      <span className="text-[#16803C] font-bold text-xs">✓ Matched</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MULTI-REGISTRY CROSS-VERIFICATION */}
      {/* ========================================================================= */}
      {activeDossierTab === 'cross_consistency' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h2 className="text-lg font-bold text-[#17212B]">Multi-Source Government Public Registry Cross-Verification</h2>
            <p className="text-xs text-[#5F6B76] mt-0.5">
              Cross-validates legal corporate identity across GSTN ↔ CBDT Income Tax ↔ Ministry of MSME ↔ MCA ↔ Audited Balance Sheet
            </p>
          </div>

          {/* Cross-Document Name Matching Anomaly Banner */}
          <div className="p-4 bg-[#FEF8EC] rounded-lg border border-[#FCE6BE] space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#B7791F] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Cross-Document Identity Variation Detection
              </span>
              <span className="text-[11px] font-semibold text-[#B7791F] bg-white px-2 py-0.5 rounded border border-[#FCE6BE]">
                Levenshtein Distance 98.2%
              </span>
            </div>
            <p className="text-[#17212B]">
              <strong>Name Variation Detected:</strong> "BHARAT TACTICAL SYSTEMS LTD" (GST/PAN) vs "BHARAT TACTICAL SYSTEMS LIMITED" (Bank Statement).
            </p>
            <p className="text-[11px] text-[#5F6B76]">
              ✓ System Recommendation: Acceptable abbreviation under Indian Companies Act 2013. Manual verification recommended.
            </p>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Entity Parameter</th>
                  <th>Submitted Document Source</th>
                  <th>Extracted Value</th>
                  <th>Government Public Registry Query</th>
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
                  <td><span className="font-semibold text-[#17212B]">PAN Taxpayer ID</span></td>
                  <td>PAN Card Copy</td>
                  <td className="font-mono">AABCB1234F</td>
                  <td className="font-mono">AABCB1234F (Income Tax CBDT)</td>
                  <td><span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded">✓ Valid Regular</span></td>
                </tr>
                <tr>
                  <td><span className="font-semibold text-[#17212B]">Registered Business Address</span></td>
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
                  <td><span className="font-semibold text-[#17212B]">National Debarment & Blacklist</span></td>
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
      {/* 4. HUMAN OFFICER DECISION STATION WITH FINAL EVALUATION PACK */}
      {/* ========================================================================= */}
      {activeDossierTab === 'decision_station' && (
        <div className="space-y-6">
          {/* Automated Final Decision Pack Card */}
          <div className="gov-card p-6 space-y-4 border-t-3 border-[#124B7A]">
            <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
              <div>
                <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
                  Automated Evidence Compilation
                </span>
                <h2 className="text-lg font-bold text-[#17212B] mt-1">Final Evaluation Decision Pack</h2>
              </div>
              <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5]">
                ● Ready for Final Human Sign-off
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] font-semibold">Tender Eligibility:</span>
                <p className="font-bold text-[#16803C] text-sm mt-0.5">9 / 10 Satisfied</p>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] font-semibold">Technical Score:</span>
                <p className="font-bold text-[#124B7A] text-sm mt-0.5">87 / 100 (87%)</p>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] font-semibold">Financial Compliance:</span>
                <p className="font-bold text-[#16803C] text-sm mt-0.5">92 / 100 (92%)</p>
              </div>
              <div className="p-3 bg-[#F6F8FA] rounded border border-[#E1E6EA]">
                <span className="text-[#5F6B76] font-semibold">Risk Classification:</span>
                <p className="font-bold text-[#16803C] text-sm mt-0.5">LOW RISK (Passed)</p>
              </div>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#5F6B76]">
              <div>
                <span>Registry Checks:</span> <strong className="text-[#16803C]">GSTN ✓, CBDT ✓, MSME ✓</strong>
              </div>
              <div>
                <span>Discrepancies:</span> <strong className="text-[#17212B]">1 resolved, 0 pending</strong>
              </div>
              <div>
                <span>Supporting Evidence:</span> <strong className="text-[#17212B]">14 verified documents</strong>
              </div>
            </div>
          </div>

          {/* Decision Form */}
          <div className="gov-card p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#17212B]">Procurement Officer Final Decision & Remarks</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">
                In compliance with GeM guidelines, the Procurement Officer exercises full legal authority to qualify or disqualify the bidder.
              </p>
            </div>

            {decisionRecorded && (
              <div className="p-3 rounded-md bg-[#EBF6EE] border border-[#CEEBD5] text-[#16803C] font-bold text-xs">
                ✓ Official Decision Recorded: {decision} with SHA-256 cryptographic signature.
              </div>
            )}

            <form onSubmit={handleDecisionSubmit} className="space-y-4 text-xs">
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
                  <span>● Qualify Bidder (Approved)</span>
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
                <label className="block font-semibold text-[#17212B] mb-1.5">
                  Official Justification & Audit Remarks (Mandatory) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="State the official justification..."
                  className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[#5F6B76] text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                  <span>Decision signed with SHA-256 cryptographic timestamp</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gov-btn-primary h-10 px-6 text-xs"
                >
                  {isSubmitting ? 'Recording Decision...' : 'Confirm Decision & Sign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
