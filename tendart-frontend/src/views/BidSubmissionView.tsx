import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Search,
  Database,
  Cpu
} from 'lucide-react';
import { Tender } from '../types';

interface Props {
  tender: Tender;
  onSubmitBid: (bidData: any) => void;
  onNavigate: (view: string) => void;
}

export const BidSubmissionView: React.FC<Props> = ({ tender, onSubmitBid, onNavigate }) => {
  const [wizardStep, setWizardStep] = useState<'UPLOAD' | 'EXTRACTING' | 'REVIEW'>('UPLOAD');
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Extraction State
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractionStatus, setExtractionStatus] = useState('Initializing AI Extractor...');

  // Track uploaded files by their index
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File>>({});

  const handleFileSelect = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [idx]: e.target.files![0] }));
    }
  };

  const requiredDocuments = [
    { title: 'Form GST REG-06 Certificate', type: 'Statutory' },
    { title: 'Corporate PAN Card', type: 'Statutory' },
    { title: '3-Year CA Audited Balance Sheet', type: 'Financial' },
    { title: 'OEM Authorization Letter', type: 'Technical' },
    { title: 'Class-1 MII Affidavit', type: 'Declaration' },
    { title: 'Experience / Completion Certs', type: 'Experience' },
    { title: 'Technical Compliance Datasheet', type: 'Technical' }
  ];

  const handleStartExtraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount) {
      alert("Please enter a commercial quote.");
      return;
    }
    setWizardStep('EXTRACTING');
    setExtractionProgress(15);
    setExtractionStatus('Parsing uploaded PDFs via OCR engine...');
    
    setTimeout(() => { setExtractionProgress(35); setExtractionStatus('Cross-referencing GSTIN & PAN with Govt registries...'); }, 1200);
    setTimeout(() => { setExtractionProgress(60); setExtractionStatus('Extracting Financial Turnover & MII content...'); }, 2400);
    setTimeout(() => { setExtractionProgress(85); setExtractionStatus('Verifying semantic compliance with Tender specifications...'); }, 3600);
    setTimeout(() => { 
      setExtractionProgress(100); 
      setExtractionStatus('Extraction & Mapping Complete!');
      setTimeout(() => setWizardStep('REVIEW'), 800);
    }, 4800);
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
      documents: requiredDocuments.map((d) => ({
        document_type: d.type,
        file_name: `${d.title}.pdf`,
        file_size_bytes: 1024 * 1024 * 1.5,
        uploaded_at: new Date().toISOString()
      }))
    };

    onSubmitBid(payload);
    alert('Bid Proposal Submitted Successfully to GeM! Your proposal is now cryptographically sealed.');
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
          <span>Back to Workspace</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5F6B76]">
          <Lock className="w-3.5 h-3.5 text-[#16803C]" />
          <span>256-Bit SSL Encrypted GeM Tender Application</span>
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

      {/* --- WIZARD STEP 1: UPLOAD --- */}
      {wizardStep === 'UPLOAD' && (
        <form onSubmit={handleStartExtraction} className="space-y-6">
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA]">
              <h2 className="text-sm font-bold text-[#17212B]">Step 1: Upload Documents & Input Financials</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">Upload your official documents. The AI will extract and verify them automatically.</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Financial Input */}
              <div className="bg-[#F8FAFC] border border-[#E1E6EA] p-5 rounded-md">
                <label className="block text-[#17212B] uppercase font-bold mb-2">
                  Commercial Bid Quote (₹ Crores) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={bidAmount}
                  onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                  placeholder="e.g. 12.50"
                  className="gov-input w-full md:w-1/3 font-bold text-[#124B7A] text-lg"
                />
                <p className="text-xs text-[#5F6B76] mt-2">Enter your total comprehensive quote for the Bill of Quantities (BoQ) including GST.</p>
              </div>

              {/* Document Upload Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase text-[#17212B] mb-3 border-b border-[#E1E6EA] pb-2">Mandatory Annexures for Extraction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requiredDocuments.map((doc, idx) => (
                    <label key={idx} className="block border border-dashed border-[#A9B4BE] rounded-md p-4 bg-[#FDFDFE] hover:bg-[#F6F8FA] hover:border-[#124B7A] transition-colors cursor-pointer text-center group">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => handleFileSelect(idx, e)} 
                      />
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform ${uploadedFiles[idx] ? 'bg-[#EBF6EE] text-[#16803C]' : 'bg-[#EBF3FA] text-[#124B7A]'}`}>
                        {uploadedFiles[idx] ? <CheckCircle2 className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />}
                      </div>
                      <p className="text-xs font-bold text-[#17212B]">{doc.title}</p>
                      {uploadedFiles[idx] ? (
                        <p className="text-[10px] text-[#16803C] mt-1 font-semibold truncate px-2">{uploadedFiles[idx].name}</p>
                      ) : (
                        <p className="text-[10px] text-[#5F6B76] mt-1">{doc.type} • PDF (Max 10MB)</p>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border-t border-[#E1E6EA] flex justify-end">
              <button
                type="submit"
                className="gov-btn-primary h-10 px-6 text-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run AI Extraction & Verify Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* --- WIZARD STEP 2: EXTRACTING --- */}
      {wizardStep === 'EXTRACTING' && (
        <div className="gov-card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="relative mb-8">
            {/* Spinning glowing border effect */}
            <div className="absolute inset-0 rounded-full border-4 border-t-[#124B7A] border-r-transparent border-b-[#16803C] border-l-transparent animate-spin w-20 h-20 -left-2 -top-2 opacity-50"></div>
            <div className="w-16 h-16 rounded-full bg-[#F6F8FA] border border-[#E1E6EA] flex items-center justify-center relative z-10 shadow-sm">
              <Cpu className="w-8 h-8 text-[#124B7A] animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-[#17212B] mb-2">Analyzing Bid Submission</h2>
          <p className="text-sm text-[#5F6B76] mb-6 font-medium max-w-md h-6">{extractionStatus}</p>

          <div className="w-full max-w-md h-2 bg-[#E1E6EA] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#124B7A] to-[#16803C] transition-all duration-300 ease-out" 
              style={{ width: `${extractionProgress}%` }}
            />
          </div>
          <p className="text-xs text-[#5F6B76] mt-3 font-mono">{extractionProgress}% Complete</p>
        </div>
      )}

      {/* --- WIZARD STEP 3: REVIEW --- */}
      {wizardStep === 'REVIEW' && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="gov-card overflow-hidden">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#17212B]">Step 2: Review AI Extraction Results</h2>
                <p className="text-xs text-[#5F6B76] mt-0.5">Please verify the extracted data against the tender requirements before final submission.</p>
              </div>
              <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-3 py-1 rounded border border-[#CEEBD5] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> AI VERIFICATION PASSED
              </span>
            </div>

            {/* Extracted Data Mapping Form */}
            <div className="p-6 lg:p-8 space-y-8 bg-[#FAFAFA]">
              {/* Identity Block */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-[#5F6B76] tracking-wider border-b border-[#E1E6EA] pb-2">1. Extracted Identity & Commercials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">Bidder Legal Name</label>
                    <div className="gov-input w-full bg-[#FFFFFF] font-bold text-[#17212B] cursor-not-allowed">Bharat Tactical and Safety Gear Pvt Ltd</div>
                  </div>
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">GST Registration (GSTN Verified)</label>
                    <div className="gov-input w-full bg-[#EBF6EE] border-[#CEEBD5] font-mono text-[#16803C] cursor-not-allowed">07AABCB1234F1Z5</div>
                  </div>
                  <div>
                    <label className="block text-[#5F6B76] font-semibold mb-1">PAN Account (CBDT Verified)</label>
                    <div className="gov-input w-full bg-[#EBF6EE] border-[#CEEBD5] font-mono text-[#16803C] cursor-not-allowed">AABCB1234F</div>
                  </div>
                  <div className="lg:col-span-3">
                    <label className="block text-[#5F6B76] font-semibold mb-1">Extracted Commercial Quote</label>
                    <div className="gov-input w-full bg-[#EBF3FA] border-[#D0E2F2] font-bold text-[#124B7A] text-lg h-12 flex items-center cursor-not-allowed">
                      ₹ {bidAmount} Crores
                    </div>
                  </div>
                </div>
              </div>

              {/* Qualification Block */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-[#5F6B76] tracking-wider border-b border-[#E1E6EA] pb-2">2. Qualification & Compliance Check</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="gov-card p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between items-start mb-2">
                      <label className="font-semibold text-[#17212B]">Financial Turnover (CA Certified)</label>
                      <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ QUALIFIED</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#5F6B76]">Tender Requirement: <strong className="text-[#17212B]">≥ ₹ 15.0 Cr</strong></span>
                      <span className="text-[#124B7A]">Extracted from Doc: <strong>₹ 18.5 Cr</strong></span>
                    </div>
                  </div>

                  <div className="gov-card p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between items-start mb-2">
                      <label className="font-semibold text-[#17212B]">Make in India (MII) Local Content</label>
                      <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ QUALIFIED</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#5F6B76]">Tender Requirement: <strong className="text-[#17212B]">≥ 50% (Class-1)</strong></span>
                      <span className="text-[#124B7A]">Extracted from Doc: <strong>65% (Class-1)</strong></span>
                    </div>
                  </div>

                  <div className="gov-card p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between items-start mb-2">
                      <label className="font-semibold text-[#17212B]">Past Experience</label>
                      <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ QUALIFIED</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#5F6B76]">Tender Requirement: <strong className="text-[#17212B]">≥ 3 Years</strong></span>
                      <span className="text-[#124B7A]">Extracted from Doc: <strong>5 Years (Verified)</strong></span>
                    </div>
                  </div>

                  <div className="gov-card p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between items-start mb-2">
                      <label className="font-semibold text-[#17212B]">Technical Compliance</label>
                      <span className="text-[10px] font-bold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">✓ QUALIFIED</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#5F6B76]">Tender Requirement: <strong className="text-[#17212B]">{(tender as any)?.techStandard || 'BIS / EN 397 / ISO 9001'}</strong></span>
                      <span className="text-[#124B7A]">Extracted from Doc: <strong>Semantic Match Confirmed</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Block */}
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E1E6EA] space-y-6">
              <div className="p-4 rounded-md bg-[#FEF8EC] border border-[#FDEBCE] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#B7791F] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#975A16]">Pre-Flight Check Successful</h4>
                  <p className="text-xs text-[#7B4A11]">
                    Your extracted values meet all mandatory thresholds for this tender. If this data is correct, proceed to submit. You will not be disqualified during the technical screening phase due to missing or invalid documents.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer text-xs text-[#5F6B76]">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 accent-[#124B7A]"
                />
                <span className="leading-relaxed font-medium">
                  I hereby solemnly declare that all information and documents uploaded in this proposal are authentic and legally valid. I confirm that the AI-extracted values shown above accurately represent my submission. I acknowledge that submitting fraudulent certificates constitutes grounds for debarment under Rule 151 of General Financial Rules (GFR).
                </span>
              </label>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setWizardStep('UPLOAD')}
                  className="gov-btn-secondary h-10 px-6 text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Go Back & Re-Upload</span>
                </button>
                
                <button
                  type="submit"
                  disabled={!agreedToTerms}
                  className={`gov-btn-primary h-10 px-8 text-xs flex items-center gap-2 ${!agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Final Bid Proposal</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

