import React, { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, Layers, ShieldCheck, FileCheck, Cpu, Database, Eye } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const PipelineProgressModal: React.FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Document Ingestion & SHA-256 Hashing', desc: 'Calculating cryptographic SHA-256 hashes and saving PDFs to object storage', icon: FileCheck },
    { title: 'PyMuPDF Vector & OCR Parsing', desc: 'Vector layout extraction and token bounding box normalization', icon: Cpu },
    { title: 'QR Code & Government Seal Decoding', desc: 'Scanning digital signatures and official empanelment seals', icon: Eye },
    { title: 'Source-Grounded AI Fact Extraction', desc: 'Extracting turnover, experience years, local content %, and OEM facts', icon: Layers },
    { title: 'Government Portal Verification Adapters', desc: 'Querying GSTN, Income Tax PAN, MSME Udyam, and CPPP Debarment registries', icon: Database },
    { title: 'Cross-Document Discrepancy Detection', desc: 'Cross-matching legal entity names and financial figures across disparate documents', icon: ShieldCheck },
    { title: 'Deterministic Compliance Rule Evaluation', desc: 'Applying mandatory hard constraints first, then computing soft scores (0-100)', icon: CheckCircle2 },
    { title: 'Bidder Shortlist Ranking & Audit Trail', desc: 'Ranking qualified bidders and writing immutable audit logs', icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPct = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="gov-card w-full max-w-lg p-6 shadow-2xl bg-[#0D1B2A] border border-[#1E2E42] space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2E42] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Live Compliance Pipeline</h3>
              <p className="text-xs text-slate-400">Processing Tender GEM/2026/B/891240</p>
            </div>
          </div>
          <span className="text-sm font-bold text-blue-400">{progressPct}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step-by-Step List */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`p-3 rounded border text-xs flex items-start gap-3 transition-colors ${
                  isCurrent
                    ? 'bg-blue-950/40 border-blue-500 shadow-sm'
                    : isCompleted
                    ? 'bg-[#0A1624] border-[#1E2E42]'
                    : 'bg-[#07111D] border-[#152234] opacity-40'
                }`}
              >
                <div
                  className={`p-1.5 rounded shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : isCurrent
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
