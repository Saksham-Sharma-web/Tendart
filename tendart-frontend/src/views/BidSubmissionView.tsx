import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck2,
  AlertCircle,
  Building2,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  FolderLock,
  CheckCircle2,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { Tender } from '../types';

interface Props {
  tender: Tender;
  onSubmitBid: (bidData: any) => void;
  onNavigate: (view: string) => void;
}

export const BidSubmissionView: React.FC<Props> = ({ tender, onSubmitBid, onNavigate }) => {
  const [bidAmount, setBidAmount] = useState<number>(12.8);
  const [isPreChecking, setIsPreChecking] = useState(false);
  const [preCheckCompleted, setPreCheckCompleted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Attached Proposal Documents (Ready from Vault)
  const [documents] = useState([
    {
      type: 'GST_Registration_Certificate',
      title: 'Form GST REG-06 Certificate',
      category: 'Statutory Identity',
      size: '1.8 MB • PDF',
      extractedSnippet: 'GSTIN: 07AABCB1234F1Z5 • Legal Name: Bharat Tactical and Safety Gear Pvt Ltd',
      status: 'VERIFIED',
      confidence: 99
    },
    {
      type: 'PAN_Card',
      title: 'Corporate Income Tax PAN Card',
      category: 'Statutory Identity',
      size: '0.9 MB • PDF',
      extractedSnippet: 'PAN: AABCB1234F • Status: Regular Business Entity',
      status: 'VERIFIED',
      confidence: 98
    },
    {
      type: 'CA_Audited_Balance_Sheet',
      title: '3-Year CA Audited Balance Sheet & Financials',
      category: 'Financial Turnover',
      size: '4.5 MB • PDF',
      extractedSnippet: 'Average Annual Turnover: ₹18.50 Crores (Threshold Requirement: ≥ ₹5.0 Cr)',
      status: 'VERIFIED',
      confidence: 96
    },
    {
      type: 'OEM_Authorization_Letter',
      title: 'OEM Manufacturer Authorization Letter (Annexure IV)',
      category: 'Technical & Authorization',
      size: '1.4 MB • PDF',
      extractedSnippet: 'Authorized Supply Partner for CPCL Refinery Spec Sensors (Valid thru 2027)',
      status: 'VERIFIED',
      confidence: 97
    }
  ]);

  const handleRunPreCheck = () => {
    setIsPreChecking(true);
    setTimeout(() => {
      setIsPreChecking(false);
      setPreCheckCompleted(true);
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the mandatory legal declaration before submitting.');
      return;
    }

    const payload = {
      tender_id: tender.tender_id,
      bidder_name: 'Bharat Tactical & Safety Gear Pvt Ltd',
      legal_name: 'Bharat Tactical and Safety Gear Private Limited',
      pan: 'AABCB1234F',
      gstin: '07AABCB1234F1Z5',
      udyam_number: 'UDYAM-DL-02-0019283',
      bid_amount_cr: Number(bidAmount),
      documents: documents.map((d) => ({
        document_type: d.type,
        file_name: `${d.type}.pdf`,
        file_size_bytes: 1024 * 1024 * 1.5,
        uploaded_at: new Date().toISOString()
      }))
    };

    onSubmitBid(payload);
    alert('Bid Proposal Submitted Successfully to GeM! Your proposal is now queued for evaluation.');
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Back & Action Banner */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={() => onNavigate('bidder_dashboard')}
          className="gov-btn-secondary h-8 px-3 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bidder Workspace</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5F6B76]">
          <Lock className="w-3.5 h-3.5 text-[#16803C]" />
          <span>256-Bit SSL Encrypted GeM Tender Ingestion</span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="gov-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
              Bid Proposal Filing
            </span>
            <span className="text-xs font-mono text-[#5F6B76]">Tender: {tender.tender_number}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">{tender.title}</h1>
          <p className="text-xs text-[#5F6B76]">
            Department: <strong className="text-[#17212B]">{tender.department}</strong>
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Estimated Budget</span>
            <p className="text-2xl font-bold text-[#124B7A] mt-0.5">₹ {tender.estimated_value_cr} Cr</p>
          </div>
          <div className="text-right border-l border-[#E1E6EA] pl-6">
            <span className="text-[11px] text-[#5F6B76] uppercase font-semibold">Closing Deadline</span>
            <p className="text-sm font-bold text-[#17212B] mt-0.5">{new Date(tender.submission_deadline).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Section 1: Bidder Profile & Commercial Quote */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <h2 className="text-sm font-bold text-[#17212B]">1. Enterprise Identity & Commercial Quote</h2>
            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
              ✓ GeM Verified Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1">Legal Entity Name</label>
              <input
                type="text"
                readOnly
                value="Bharat Tactical and Safety Gear Private Limited"
                className="gov-input w-full bg-[#F6F8FA] text-[#5F6B76] cursor-not-allowed text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1">GSTIN</label>
              <input
                type="text"
                readOnly
                value="07AABCB1234F1Z5"
                className="gov-input w-full bg-[#F6F8FA] text-[#124B7A] font-mono cursor-not-allowed text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1">PAN Card Number</label>
              <input
                type="text"
                readOnly
                value="AABCB1234F"
                className="gov-input w-full bg-[#F6F8FA] text-[#5F6B76] font-mono cursor-not-allowed text-xs"
              />
            </div>

            <div>
              <label className="block text-[#17212B] uppercase font-bold mb-1">
                Commercial Bid Quote (₹ Crores) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                className="gov-input w-full font-bold text-[#124B7A] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Attached Proposal Documents */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">2. Attached Compliance & Eligibility Documents</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">Documents synchronized from your verified Document Vault</p>
            </div>

            <button
              type="button"
              onClick={handleRunPreCheck}
              disabled={isPreChecking}
              className="gov-btn-primary h-8 px-3.5 text-xs"
            >
              {isPreChecking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isPreChecking ? 'Checking...' : 'Run Pre-Flight AI Check'}</span>
            </button>
          </div>

          {/* AI Pre-Flight Alert */}
          {preCheckCompleted && (
            <div className="p-4 rounded-md bg-[#EBF6EE] border border-[#CEEBD5] text-xs space-y-1">
              <p className="font-bold text-[#16803C] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pre-Flight Readiness Check: 100% Ready</span>
              </p>
              <p className="text-[#5F6B76]">
                All mandatory annexures attached and legal entity consistency verified across GSTN and CBDT PAN.
              </p>
            </div>
          )}

          {/* Document Cards List */}
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.type}
                className="p-4 rounded-md bg-[#FFFFFF] border border-[#E1E6EA] hover:border-[#124B7A] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                    <h3 className="font-bold text-[#17212B] text-sm">{doc.title}</h3>
                    <span className="text-[10px] font-semibold text-[#5F6B76] bg-[#F1F4F7] px-2 py-0.2 rounded">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-[#5F6B76] text-[11px]">{doc.extractedSnippet}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[11px] font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
                    ✓ Verified ({doc.confidence}% Confidence)
                  </span>
                  <span className="font-mono text-[#5F6B76] text-[11px]">{doc.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Legal Declaration & Submit */}
        <div className="gov-card p-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer text-xs text-[#5F6B76]">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 accent-[#124B7A]"
            />
            <span className="leading-relaxed">
              I hereby solemnly declare that all information and documents submitted in this proposal are authentic, complete, and legally valid. I acknowledge that submitting fraudulent certificates constitutes grounds for debarment under Rule 151 of General Financial Rules (GFR).
            </span>
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-[#E1E6EA]">
            <div className="flex items-center gap-1.5 text-xs text-[#5F6B76]">
              <ShieldCheck className="w-4 h-4 text-[#16803C]" />
              <span>SHA-256 Encrypted Proposal Hashing</span>
            </div>

            <button
              type="submit"
              className="gov-btn-primary h-10 px-6 text-xs"
            >
              <span>Submit Official Proposal to GeM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
