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
    { title: 'PyMuPDF Parsing & Neural OCR', desc: 'Vector layout parsing and PaddleOCR ONNX Runtime execution for token bounding boxes', icon: Cpu },
    { title: 'QR Code & Government Seal Decoding', desc: 'Scanning digital signatures, QR payload URLs, and official empanelment seals', icon: Eye },
    { title: 'Source-Grounded AI Fact Extraction', desc: 'Extracting turnover, experience years, local content %, and OEM facts with verbatim page quotes', icon: Layers },
    { title: 'Government Portal Verification Adapters', desc: 'Querying GSTN, Income Tax PAN, MSME Udyam, MCA, and CPPP Debarment registries', icon: Database },
    { title: 'Cross-Document Discrepancy Detection', desc: 'Cross-matching legal entity names and financial figures across disparate documents', icon: ShieldCheck },
    { title: 'Deterministic Compliance Rule Evaluation', desc: 'Applying hard constraints first, then computing transparent weighted soft scores (0-100)', icon: CheckCircle2 },
    { title: 'Bidder Shortlist Ranking & Audit Trail', desc: 'Ranking qualified bidders deterministically and writing immutable audit logs', icon: CheckCircle2 }
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
          }, 800);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPct = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-amber-500/30 p-6 shadow-2xl shadow-amber-950/50 bg-[#0B192C]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Verification Pipeline Execution</h3>
              <p className="text-xs text-slate-400">Processing Tender GEM/2026/SAFETY/001 (12 Bidders)</p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-amber-400">{progressPct}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        {/* Step-by-Step List */}
        <div className="mt-6 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-85'
                    : 'bg-slate-950/30 border-slate-900 opacity-40'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-amber-300' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                    Step {idx + 1}: {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          {currentStep === steps.length - 1 ? (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer"
            >
              View Verification Results
            </button>
          ) : (
            <span className="text-xs text-slate-400 italic">Evaluating deterministic rules across 12 bid packages...</span>
          )}
        </div>
      </div>
    </div>
  );
};
