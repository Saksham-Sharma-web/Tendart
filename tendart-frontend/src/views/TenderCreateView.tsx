import React, { useState } from 'react';
import {
  ArrowLeft,
  FilePlus2,
  UploadCloud,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Building,
  FileText
} from 'lucide-react';

interface Props {
  onCreateTender: (tenderData: any) => void;
  onCancel: () => void;
}

export const TenderCreateView: React.FC<Props> = ({ onCreateTender, onCancel }) => {
  const [tenderNumber, setTenderNumber] = useState('GEM/2026/B/901844');
  const [title, setTitle] = useState('Procurement of Smart Grid Monitoring Substation Units');
  const [department, setDepartment] = useState('Chennai Petroleum Corporation Limited (CPCL) / Power Systems');
  const [estimatedValue, setEstimatedValue] = useState<number>(18.5);
  const [deadline, setDeadline] = useState('2026-10-30');
  const [description, setDescription] = useState('National competitive bid for supply, installation, and testing of smart telemetry sensors under Make-in-India guidelines.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTender({
      tender_number: tenderNumber,
      title,
      department,
      estimated_value_cr: Number(estimatedValue),
      submission_deadline: new Date(deadline).toISOString(),
      description,
      status: 'ACTIVE_EVALUATION',
      created_by: 'Director of Procurement (CPCL)',
      requirements: []
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E1E6EA] pb-3">
        <button
          onClick={onCancel}
          className="gov-btn-secondary h-8 px-3 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tenders</span>
        </button>

        <span className="text-xs text-[#5F6B76]">Tender Creation & Document Ingestion</span>
      </div>

      <div className="gov-card p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[#17212B]">Create New GeM Procurement Tender</h1>
          <p className="text-xs text-[#5F6B76] mt-0.5">
            Fill in metadata and upload the tender document to trigger automated AI requirement extraction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Tender Reference ID *</label>
              <input
                type="text"
                required
                value={tenderNumber}
                onChange={(e) => setTenderNumber(e.target.value)}
                className="gov-input w-full font-mono uppercase text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Estimated Value (₹ Crores) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(parseFloat(e.target.value))}
                className="gov-input w-full font-bold text-[#124B7A] text-xs"
              />
            </div>

            <div>
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Submission Deadline *</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Tender Scope Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Procuring Department *</label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#5F6B76] uppercase font-semibold mb-1.5">Scope Description & Summary</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-[#FFFFFF] border border-[#CBD3DA] rounded-md text-[#17212B] placeholder-[#8A949E] focus:outline-none focus:border-[#124B7A] text-xs"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E1E6EA] flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="gov-btn-secondary h-9 px-4 text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="gov-btn-primary h-9 px-5 text-xs"
            >
              <FilePlus2 className="w-3.5 h-3.5" />
              <span>Create Tender & Ingest Rules</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
