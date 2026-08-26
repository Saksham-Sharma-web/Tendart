import React, { useState } from 'react';
import {
  Bid,
  Tender,
  Evidence
} from '../types';
import {
  ArrowLeft,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
  CheckCircle,
  FileCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Database,
  Printer
} from 'lucide-react';

interface Props {
  bid?: Bid;
  tender: Tender;
  evidenceList: Evidence[];
  initialEvidenceId?: string;
  initialDocId?: string;
  initialPage?: number;
  onEvidenceReviewed?: () => void;
  onNavigate: (view: string) => void;
}

export const EvidenceViewerView: React.FC<Props> = ({
  bid,
  tender,
  evidenceList,
  initialEvidenceId,
  initialDocId,
  initialPage = 1,
  onNavigate
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={() => onNavigate('rankings')}
          className="gov-btn-secondary h-8 px-3 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Evaluation Matrix</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5F6B76]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>Side-by-Side OCR Bounding Box Evidence Viewer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Uploaded PDF Viewer Simulation */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">Uploaded Document Preview</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">Form GST REG-06 Certificate.pdf</p>
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

          {/* Document Canvas with OCR Bounding Box */}
          <div className="border border-[#CBD3DA] rounded-md p-6 bg-[#F6F8FA] min-h-[420px] relative text-xs space-y-4 font-mono text-[#17212B]">
            <div className="text-center font-bold pb-2 border-b border-[#E1E6EA]">
              GOVERNMENT OF INDIA • FORM GST REG-06
            </div>

            <div className="space-y-2">
              <p>Registration Number: <strong>07AABCB1234F1Z5</strong></p>
              <p>Legal Name: <strong>Bharat Tactical and Safety Gear Private Limited</strong></p>
              <p>Trade Name: <strong>Bharat Tactical & Safety Gear</strong></p>
              <p>Date of Registration: <strong>14/02/2018</strong></p>
              <p>Principal Place of Business: <strong>Plot 14, Okhla Industrial Area Phase-III, New Delhi - 110020</strong></p>
            </div>

            {/* Simulated OCR Highlight Box */}
            <div className="evidence-highlight-box p-3 rounded mt-4">
              <span className="text-[10px] font-bold text-[#124B7A] block uppercase tracking-wider">
                [OCR Vector Match: 99.4% Token Ground Truth]
              </span>
              <p className="text-xs font-bold text-[#17212B] mt-1">
                "07AABCB1234F1Z5" matches GSTN Central Master Directory
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Extracted Data & Live Government Portal Verification */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">Live Government Verification Match</h2>
              <p className="text-xs text-[#5F6B76] mt-0.5">Direct query to GSTN Portal API v2.1</p>
            </div>

            <span className="text-xs font-semibold text-[#16803C] bg-[#EBF6EE] px-2.5 py-0.5 rounded border border-[#CEEBD5]">
              ● Live 200 OK
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Registry Status</span>
              <p className="font-bold text-[#16803C] text-sm">ACTIVE TAXPAYER (REGULAR)</p>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">Entity Name Match</span>
              <p className="font-bold text-[#17212B]">Bharat Tactical and Safety Gear Private Limited</p>
              <p className="text-[#16803C] text-[11px]">✓ 100% Levenshtein Distance Match with CBDT PAN</p>
            </div>

            <div className="p-3.5 bg-[#F6F8FA] rounded-md border border-[#E1E6EA] space-y-1">
              <span className="text-[#5F6B76] uppercase font-semibold text-[10px]">CPPP Debarment Check</span>
              <p className="font-bold text-[#16803C]">0 Debarment Records in National Vigilance Registry</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
