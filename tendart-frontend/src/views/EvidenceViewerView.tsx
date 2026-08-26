import React, { useState } from 'react';
import {
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Edit3,
  MessageSquare,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Evidence, Bid, Tender } from '../types';
import { StatusBadge } from '../components/layout/StatusBadge';
import { api } from '../services/api';

interface Props {
  bid?: Bid;
  tender?: Tender;
  evidenceList: Evidence[];
  initialEvidenceId?: string;
  initialDocId?: string;
  initialPage?: number;
  onEvidenceReviewed: () => void;
  onNavigate: (view: string) => void;
}

export const EvidenceViewerView: React.FC<Props> = ({
  bid,
  tender,
  evidenceList,
  initialEvidenceId,
  initialDocId,
  initialPage = 1,
  onEvidenceReviewed,
  onNavigate
}) => {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(
    initialEvidenceId || (evidenceList[0]?.evidence_id || 'EV-001')
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Review Edit State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [overrideValue, setOverrideValue] = useState<string>('');
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [isSavingReview, setIsSavingReview] = useState<boolean>(false);

  const selectedEvidence =
    evidenceList.find((e) => e.evidence_id === selectedEvidenceId) || evidenceList[0];

  const docId = selectedEvidence?.doc_id || initialDocId || (bid?.documents[0]?.doc_id || 'DOC-TO-BID-APEX-001');
  const imageUrl = api.getPageImageUrl(docId, currentPage);

  // Default bounding box if available
  const normBox = selectedEvidence?.norm_box || [0.15, 0.42, 0.70, 0.08];

  const handleReviewAction = async (status: 'APPROVED' | 'REJECTED' | 'EDITED') => {
    if (!selectedEvidence) return;
    setIsSavingReview(true);
    try {
      await api.reviewEvidence(
        selectedEvidence.evidence_id,
        status,
        status === 'EDITED' ? overrideValue : undefined,
        reviewNotes || (status === 'APPROVED' ? 'Verified by Officer' : 'Rejected by Officer')
      );
      setIsEditing(false);
      onEvidenceReviewed();
      alert(`Evidence ${status.toLowerCase()} successfully!`);
    } catch (err: any) {
      alert(`Error reviewing evidence: ${err.message}`);
    } finally {
      setIsSavingReview(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('bid_detail')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                EVIDENCE VIEWER
              </span>
              <h2 className="text-base font-bold text-white">
                {bid?.legal_name || 'Apex Safety Gear Pvt Ltd'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Document: <b className="text-slate-200">{selectedEvidence?.document_name || 'CA_Turnover_Certificate.pdf'}</b> (Page {currentPage})
            </p>
          </div>
        </div>

        {/* Zoom & Page Navigation Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-300">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.15))}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1.0)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold text-slate-300">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-190px)] min-h-[600px]">
        {/* Left Pane (7 Cols): High-Res PDF Document Viewer with Bounding Box Overlay */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-slate-800 p-4 bg-slate-950 flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 overflow-auto rounded-xl bg-slate-900/50 flex items-center justify-center p-4">
            <div
              className="relative transition-transform duration-200 origin-center inline-block shadow-2xl rounded-lg overflow-hidden border border-slate-700 bg-white"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Rendered Document Page Image */}
              <img
                src={imageUrl}
                alt="Document Page"
                className="max-w-none w-[560px] h-auto object-contain block"
                onError={(e) => {
                  // Fallback synthetic placeholder if local image still rendering
                  (e.target as any).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="560" height="750" fill="%23FFFFFF"><rect width="100%" height="100%" fill="%23F8FAFC"/><text x="40" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="%230B192C">SHARMA &amp; ASSOCIATES</text><text x="40" y="110" font-family="sans-serif" font-size="12" fill="%2364748B">CHARTERED ACCOUNTANTS • UDIN: 26084912AAAA8821</text><line x1="40" y1="130" x2="520" y2="130" stroke="%230B192C" stroke-width="2"/><text x="40" y="170" font-family="sans-serif" font-size="16" font-weight="bold" fill="%230B192C">ANNUAL TURNOVER CERTIFICATE</text><text x="40" y="210" font-family="sans-serif" font-size="13" fill="%23334155">Average Annual Turnover for the preceding 3 FYs is</text><text x="40" y="235" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23059669">Rs. 42.5 Crore (Rupees 42.5 Crores Only)</text><rect x="35" y="195" width="480" height="60" fill="none" stroke="%23D97706" stroke-width="3" stroke-dasharray="6,4"/></svg>';
                }}
              />

              {/* Bounding Box Visual Overlay */}
              {normBox && (
                <div
                  className="absolute border-2 border-amber-500 bg-amber-500/20 evidence-highlight-box rounded transition-all shadow-[0_0_15px_rgba(217,119,6,0.5)] pointer-events-none"
                  style={{
                    left: `${normBox[0] * 100}%`,
                    top: `${normBox[1] * 100}%`,
                    width: `${normBox[2] * 100}%`,
                    height: `${normBox[3] * 100}%`
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[9px] font-mono font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded shadow">
                    FACT PROVENANCE [p.{currentPage}]
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Document Switcher Strip */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Click evidence items on right to navigate facts & documents</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300 font-mono">OCR Coordinates Normalized</span>
            </div>
          </div>
        </div>

        {/* Right Pane (5 Cols): Evidence Metadata & Review Drawer */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 p-5 bg-[#0B192C] flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            {/* Evidence Selector Strip */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Evidence Fact to Inspect ({evidenceList.length})
              </label>
              <div className="space-y-2">
                {evidenceList.map((ev) => (
                  <div
                    key={ev.evidence_id}
                    onClick={() => {
                      setSelectedEvidenceId(ev.evidence_id);
                      if (ev.page_number) setCurrentPage(ev.page_number);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      selectedEvidenceId === ev.evidence_id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-950/40'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{ev.field_name.replace(/_/g, ' ').toUpperCase()}</p>
                      <p className="text-[11px] text-amber-400 font-extrabold mt-0.5">{ev.display_value}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block">p. {ev.page_number}</span>
                      <StatusBadge status={ev.admin_status || 'SUPPORTED'} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Evidence Card */}
            {selectedEvidence && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    {selectedEvidence.evidence_id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Confidence:</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {Math.round((selectedEvidence.confidence || 0.94) * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Extracted Fact Value</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={overrideValue}
                      onChange={(e) => setOverrideValue(e.target.value)}
                      className="w-full bg-slate-800 border border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-white mt-1"
                    />
                  ) : (
                    <h3 className="text-lg font-black text-white mt-0.5">
                      {selectedEvidence.admin_override_value || selectedEvidence.display_value}
                    </h3>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Source Verbatim Quote</span>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 italic mt-1 leading-relaxed">
                    "{selectedEvidence.source_text}"
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Document</span>
                    <p className="text-slate-200 font-medium truncate">{selectedEvidence.document_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Page Number</span>
                    <p className="text-slate-200 font-bold">Page {selectedEvidence.page_number}</p>
                  </div>
                </div>

                {selectedEvidence.review_notes && (
                  <div className="p-2 rounded bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-300">
                    <b>Reviewer Notes:</b> {selectedEvidence.review_notes}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reviewer Action Controls */}
          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Human-in-the-Loop Review Station
            </h4>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                Reviewer Notes / Justification
              </label>
              <textarea
                rows={2}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="e.g. Coordinates cross-verified against official seal."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleReviewAction('APPROVED')}
                disabled={isSavingReview}
                className="py-2 px-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>

              <button
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                    setOverrideValue(String(selectedEvidence?.extracted_value || ''));
                  } else {
                    handleReviewAction('EDITED');
                  }
                }}
                disabled={isSavingReview}
                className="py-2 px-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Save Edit' : 'Edit Fact'}</span>
              </button>

              <button
                onClick={() => handleReviewAction('REJECTED')}
                disabled={isSavingReview}
                className="py-2 px-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
