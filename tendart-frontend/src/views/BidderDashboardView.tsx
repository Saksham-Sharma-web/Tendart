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
  Sparkles,
  ShieldCheck,
  RefreshCw,
  FolderLock,
  Layers,
  Inbox,
  UserCheck
} from 'lucide-react';
import { Tender, Bid } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';

interface Props {
  tender: Tender;
  bids: Bid[];
  onNavigate: (view: string) => void;
}

export const BidderDashboardView: React.FC<Props> = ({ tender, bids, onNavigate }) => {
  // Bidder sub-tabs
  const [activeBidderTab, setActiveBidderTab] = useState<
    'overview' | 'vault' | 'tenders' | 'prep' | 'clarifications' | 'profile'
  >('overview');

  // Vault upload state
  const [vaultDocs, setVaultDocs] = useState([
    { id: 'DOC-GST', name: 'Form GST REG-06 Certificate', category: 'Statutory', size: '1.8 MB', verified: true, date: '2026-08-10', status: 'VERIFIED' },
    { id: 'DOC-PAN', name: 'Permanent Account Number Card', category: 'Statutory', size: '0.9 MB', verified: true, date: '2026-08-10', status: 'VERIFIED' },
    { id: 'DOC-UDYAM', name: 'Udyam Registration Certificate', category: 'MSME', size: '1.2 MB', verified: true, date: '2026-08-12', status: 'VERIFIED' },
    { id: 'DOC-FIN', name: '3-Year CA Audited Financial Statements', category: 'Financial', size: '4.5 MB', verified: true, date: '2026-08-15', status: 'VERIFIED' },
    { id: 'DOC-OEM', name: 'OEM Authorization Letter (Annexure IV)', category: 'Technical', size: '1.4 MB', verified: true, date: '2026-08-18', status: 'VERIFIED' },
    { id: 'DOC-MII', name: 'Class-1 Make-in-India Self Declaration', category: 'Local Content', size: '0.8 MB', verified: true, date: '2026-08-19', status: 'VERIFIED' }
  ]);

  // Pre-Submission Check State
  const [preCheckRun, setPreCheckRun] = useState(false);
  const [isPreChecking, setIsPreChecking] = useState(false);
  const [undertakingSigned, setUndertakingSigned] = useState(true);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  // Clarification reply state
  const [clarificationReply, setClarificationReply] = useState('');
  const [clarificationSent, setClarificationSent] = useState(false);

  const handleRunPreCheck = () => {
    setIsPreChecking(true);
    setTimeout(() => {
      setIsPreChecking(false);
      setPreCheckRun(true);
    }, 800);
  };

  const handleFinalSubmit = () => {
    if (!undertakingSigned) return alert('Please agree to the mandatory legal declaration.');
    setBidSubmitted(true);
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
      {/* Bidder Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3 text-sm overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveBidderTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'overview'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Bidder Workspace</span>
          </button>

          <button
            onClick={() => setActiveBidderTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'vault'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <FolderLock className="w-4 h-4" />
            <span>2. Document Vault ({vaultDocs.length})</span>
          </button>

          <button
            onClick={() => setActiveBidderTab('tenders')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'tenders'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>3. Browse Tenders (82% Ready)</span>
          </button>

          <button
            onClick={() => setActiveBidderTab('prep')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'prep'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>4. Bid Preparation & Submit</span>
          </button>

          <button
            onClick={() => setActiveBidderTab('clarifications')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'clarifications'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>5. Clarifications Inbox</span>
          </button>

          <button
            onClick={() => setActiveBidderTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeBidderTab === 'profile'
                ? 'bg-[#124B7A] text-white'
                : 'text-[#5F6B76] hover:text-[#17212B] bg-[#FFFFFF] border border-[#E1E6EA]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>6. Enterprise Profile</span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[#5F6B76] text-xs">
          <Lock className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Vendor Privacy: Confidential Isolation</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BIDDER MAIN DASHBOARD */}
      {/* ========================================================================= */}
      {activeBidderTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Banner Card */}
          <div className="gov-card p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#16803C] uppercase tracking-wider bg-[#EBF6EE] border border-[#CEEBD5] px-2.5 py-0.5 rounded">
                  Active Vendor Session
                </span>
                <span className="text-xs text-[#5F6B76]">GSTIN: 07AABCB1234F1Z5</span>
              </div>
              <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">
                Bharat Tactical & Safety Gear Pvt Ltd
              </h1>
              <p className="text-sm text-[#5F6B76]">
                GeM Verified Vendor • Class-1 Local Supplier (62.5% Domestic Value Addition)
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveBidderTab('prep')}
                className="gov-btn-primary h-10 px-5 text-xs"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Prepare & Submit Bid</span>
              </button>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Active Bids</span>
              <p className="text-2xl font-bold text-[#17212B] mt-2">2 Submitted</p>
              <p className="text-xs text-[#5F6B76] mt-1">Under Officer Review</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Document Vault</span>
              <p className="text-2xl font-bold text-[#16803C] mt-2">6 Verified</p>
              <p className="text-xs text-[#5F6B76] mt-1">Ready for 1-Click Submission</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Tender Readiness</span>
              <p className="text-2xl font-bold text-[#124B7A] mt-2">82% Match</p>
              <p className="text-xs text-[#5F6B76] mt-1">CPCL Safety Equipment Bid</p>
            </div>

            <div className="gov-card p-5">
              <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">Clarification Requests</span>
              <p className="text-2xl font-bold text-[#B7791F] mt-2">0 Pending</p>
              <p className="text-xs text-[#5F6B76] mt-1">All Queries Answered</p>
            </div>
          </div>

          {/* Readiness Bar */}
          <div className="gov-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#17212B]">Tender Eligibility Readiness: {tender.tender_number}</h3>
                <p className="text-xs text-[#5F6B76] mt-0.5">Your Document Vault satisfies 5 of 6 mandatory tender criteria</p>
              </div>
              <span className="text-sm font-bold text-[#16803C]">82% Ready</span>
            </div>

            <div className="w-full bg-[#E1E6EA] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#124B7A] h-full rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DOCUMENT VAULT */}
      {/* ========================================================================= */}
      {activeBidderTab === 'vault' && (
        <div className="space-y-6">
          <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#17212B]">Enterprise Document Vault</h1>
              <p className="text-xs text-[#5F6B76] mt-0.5">Maintain reusable certificates verified once, usable across all GeM bids</p>
            </div>

            <button className="gov-btn-primary h-9 px-4 text-xs">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload New Document</span>
            </button>
          </div>

          <div className="gov-card overflow-hidden">
            <table className="w-full gov-table text-left">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Category</th>
                  <th>File Size</th>
                  <th>Verification Status</th>
                  <th>Uploaded Date</th>
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
                    <td><span className="text-xs text-[#5F6B76]">{doc.date}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BROWSE TENDERS */}
      {/* ========================================================================= */}
      {activeBidderTab === 'tenders' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Browse Published GeM Tenders</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Explore active procurements and check automatic vault readiness match</p>
          </div>

          <div className="gov-card p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E1E6EA] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#124B7A]">{tender.tender_number}</span>
                  <StatusBadge status="ACTIVE" size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] mt-1">{tender.title}</h3>
                <p className="text-xs text-[#5F6B76] mt-0.5">{tender.department}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#5F6B76] uppercase font-semibold">Estimated Value</span>
                <p className="text-xl font-bold text-[#124B7A]">₹ {tender.estimated_value_cr} Cr</p>
                <p className="text-[11px] text-[#5F6B76]">Deadline: {new Date(tender.submission_deadline).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-[#16803C] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>82% Vault Match • 5 of 6 Documents Ready</span>
              </div>

              <button
                onClick={() => setActiveBidderTab('prep')}
                className="gov-btn-primary h-9 px-4 text-xs"
              >
                <span>Apply for this Tender</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. BID PREPARATION & SUBMISSION */}
      {/* ========================================================================= */}
      {activeBidderTab === 'prep' && (
        <div className="space-y-6">
          <div className="gov-card p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E1E6EA] pb-4">
              <div>
                <h1 className="text-xl font-bold text-[#17212B]">Bid Proposal Preparation</h1>
                <p className="text-xs text-[#5F6B76] mt-0.5">Tender: {tender.tender_number} • {tender.title}</p>
              </div>

              <button
                type="button"
                onClick={handleRunPreCheck}
                disabled={isPreChecking}
                className="gov-btn-primary h-9 px-4 text-xs"
              >
                {isPreChecking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                <span>{isPreChecking ? 'Running AI Verification...' : 'Run Pre-Submission Check'}</span>
              </button>
            </div>

            {/* AI Pre-Check Banner */}
            {preCheckRun && (
              <div className="p-4 rounded-md bg-[#EBF6EE] border border-[#CEEBD5] text-xs space-y-1">
                <p className="font-bold text-[#16803C] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pre-Submission Self-Check: 100% Eligible</span>
                </p>
                <p className="text-[#5F6B76]">
                  All mandatory annexures attached and legal entity consistency verified across GSTN and CBDT PAN.
                </p>
              </div>
            )}

            {/* Attached Documents Form */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#17212B]">Attached Proposal Documents</h3>

              <div className="divide-y divide-[#EAEFF3] border border-[#E1E6EA] rounded-md">
                {vaultDocs.map((doc) => (
                  <div key={doc.id} className="p-3 flex items-center justify-between text-xs bg-[#FFFFFF]">
                    <div className="flex items-center gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-[#124B7A]" />
                      <div>
                        <p className="font-semibold text-[#17212B]">{doc.name}</p>
                        <p className="text-[11px] text-[#5F6B76]">{doc.category} • {doc.size}</p>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-[#16803C] bg-[#EBF6EE] px-2 py-0.5 rounded">
                      ✓ Attached & Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Quote */}
            <div className="pt-3 border-t border-[#E1E6EA]">
              <label className="block text-xs uppercase font-semibold text-[#5F6B76] mb-1.5">
                Commercial Bid Amount (₹ Crores) *
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={12.80}
                className="gov-input w-full font-bold text-[#124B7A] text-sm"
              />
            </div>

            {/* Legal Undertaking */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5F6B76]">
                <input
                  type="checkbox"
                  checked={undertakingSigned}
                  onChange={(e) => setUndertakingSigned(e.target.checked)}
                  className="mt-0.5 accent-[#124B7A]"
                />
                <span>
                  I hereby declare that the documents submitted are authentic and comply with all GeM General Terms and Conditions (GTC).
                </span>
              </label>
            </div>

            {bidSubmitted && (
              <div className="p-3 rounded-md bg-[#EBF6EE] border border-[#CEEBD5] text-[#16803C] text-xs font-bold">
                ✓ Bid Proposal Submitted Successfully! Encryption Hash SHA-256 generated.
              </div>
            )}

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="gov-btn-primary w-full h-10 text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Official Proposal to GeM</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CLARIFICATIONS INBOX */}
      {/* ========================================================================= */}
      {activeBidderTab === 'clarifications' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Clarification Requests & Responses</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Respond to official inquiries dispatched by the Procurement Officer</p>
          </div>

          <div className="gov-card p-6 space-y-4">
            <div className="p-4 bg-[#FEF8EC]/50 rounded-md border border-[#FCE6BE] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17212B]">Official Inquiry: Plant Address Clarification</span>
                <span className="text-[10px] font-bold text-[#B7791F] bg-[#FEF8EC] px-2 py-0.5 rounded border border-[#FCE6BE]">
                  48h Window Active
                </span>
              </div>
              <p className="text-[#5F6B76]">
                "Please confirm if the Okhla manufacturing unit is the principal place of business registered under GST REG-06."
              </p>
              <p className="text-[11px] text-[#5F6B76]">From: Shri R. K. Sharma (Procurement Officer)</p>
            </div>

            {clarificationSent && (
              <div className="p-3 rounded bg-[#EBF6EE] border border-[#CEEBD5] text-[#16803C] text-xs font-bold">
                ✓ Response dispatched to Procurement Officer with cryptographic timestamp.
              </div>
            )}

            <form onSubmit={handleSendClarification} className="space-y-3 text-xs">
              <label className="block font-semibold text-[#17212B]">Your Official Response *</label>
              <textarea
                rows={3}
                required
                value={clarificationReply}
                onChange={(e) => setClarificationReply(e.target.value)}
                placeholder="Type your official explanation and reference supporting annexure numbers..."
                className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
              />

              <button
                type="submit"
                className="gov-btn-primary h-9 px-4 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Response to Officer</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ENTERPRISE PROFILE */}
      {/* ========================================================================= */}
      {activeBidderTab === 'profile' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h1 className="text-xl font-bold text-[#17212B]">Master Enterprise Profile</h1>
            <p className="text-xs text-[#5F6B76] mt-0.5">Verified GeM vendor credentials synchronized with government databases</p>
          </div>

          <div className="gov-card p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">Legal Enterprise Name</span>
                <p className="font-bold text-[#17212B] text-sm mt-1">Bharat Tactical and Safety Gear Private Limited</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">GSTIN (Active)</span>
                <p className="font-mono font-bold text-[#124B7A] text-sm mt-1">07AABCB1234F1Z5</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">Permanent Account Number (PAN)</span>
                <p className="font-mono font-bold text-[#17212B] text-sm mt-1">AABCB1234F</p>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-md border border-[#E1E6EA]">
                <span className="text-[#5F6B76] uppercase font-semibold">Udyam MSME Registration</span>
                <p className="font-mono font-bold text-[#17212B] text-sm mt-1">UDYAM-DL-02-0019283</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
