import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, FileText, Building2, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { Tender } from '../types';

interface Props {
  tender: Tender;
  onSubmitBid: (bidData: any) => void;
  onNavigate: (view: string) => void;
}

export const BidSubmissionView: React.FC<Props> = ({ tender, onSubmitBid, onNavigate }) => {
  const [bidderName, setBidderName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [pan, setPan] = useState('');
  const [gstin, setGstin] = useState('');
  const [udyam, setUdyam] = useState('');
  const [bidAmount, setBidAmount] = useState<number>(40.0);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([
    'CA_Turnover_Certificate.pdf',
    'GST_Registration_Certificate.pdf',
    'Experience_Certificate.pdf',
    'Make_In_India_Local_Content_Declaration.pdf',
    'OEM_Authorization_Letter.pdf',
    'Non_Blacklisting_Affidavit.pdf'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidderName) return alert('Bidder entity name is required');

    setIsSubmitting(true);
    const newBid = {
      bid_id: `BID-VENDOR-${Math.floor(1000 + Math.random() * 9000)}`,
      tender_id: tender.tender_id,
      bidder_name: bidderName,
      legal_name: legalName || bidderName,
      pan: pan.toUpperCase() || 'AABCU9912K',
      gstin: gstin.toUpperCase() || '07AABCU9912K1Z9',
      udyam_number: udyam.toUpperCase() || 'UDYAM-DL-01-0099812',
      bid_amount_cr: bidAmount,
      documents: uploadedDocs.map((d, i) => ({
        doc_id: `DOC-SUB-${i + 1}`,
        filename: d,
        document_type: d.replace('.pdf', '')
      }))
    };

    setTimeout(() => {
      onSubmitBid(newBid);
      setIsSubmitting(false);
      alert('Bid submitted successfully! Ingestion & verification pipeline queued.');
      onNavigate('rankings');
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B192C]">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Vendor Bid Submission Portal</h2>
            <p className="text-xs text-slate-400">
              Submit proposal & upload compliance evidence for <b>{tender.tender_number}</b>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-medium text-slate-300 mb-1">Company / Bidder Name *</label>
              <input
                type="text"
                required
                value={bidderName}
                onChange={(e) => setBidderName(e.target.value)}
                placeholder="e.g. Swadeshi Defense & Safety Systems Pvt Ltd"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Permanent Account Number (PAN) *</label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                placeholder="e.g. AABCU9912K"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">GSTIN Number *</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="e.g. 07AABCU9912K1Z9"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Udyam Registration Number</label>
              <input
                type="text"
                value={udyam}
                onChange={(e) => setUdyam(e.target.value)}
                placeholder="e.g. UDYAM-DL-01-0099812"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Total Commercial Bid Amount (₹ Cr) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Document Upload Zone */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Mandatory Compliance PDF Attachments ({uploadedDocs.length})
            </label>
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-900/60">
              <UploadCloud className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white mt-2">All 6 Mandatory Evidence Documents Attached</p>
              <p className="text-[11px] text-slate-400 mt-0.5">SHA-256 checksums will be calculated upon ingestion</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {uploadedDocs.map((doc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Bid...' : 'Submit Official Bid'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
