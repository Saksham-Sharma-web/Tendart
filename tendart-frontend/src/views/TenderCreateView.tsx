import React, { useState } from 'react';
import { Plus, Trash2, Shield, FileCheck, ArrowRight, Save, Layers } from 'lucide-react';
import { TenderRequirement, RequirementCategory } from '../types';

interface Props {
  onCreateTender: (tenderData: any) => void;
  onCancel: () => void;
}

export const TenderCreateView: React.FC<Props> = ({ onCreateTender, onCancel }) => {
  const [title, setTitle] = useState('');
  const [tenderNumber, setTenderNumber] = useState('');
  const [department, setDepartment] = useState('Ministry of Heavy Industries & GeM Cell');
  const [description, setDescription] = useState('');
  const [estimatedValueCr, setEstimatedValueCr] = useState<number>(50.0);
  const [deadline, setDeadline] = useState('2026-11-30T17:00:00');

  const [requirements, setRequirements] = useState<TenderRequirement[]>([
    {
      requirement_id: 'REQ-001',
      name: 'Active GSTIN Registration',
      category: 'STATUTORY',
      mandatory: true,
      data_type: 'STRING',
      expected_value: 'ACTIVE',
      operator: '==',
      weight: 15,
      verification_type: 'PORTAL_CHECK',
      required_document_types: ['GST_Registration_Certificate']
    },
    {
      requirement_id: 'REQ-002',
      name: 'Minimum Annual Turnover (>= ₹20 Cr)',
      category: 'FINANCIAL',
      mandatory: true,
      data_type: 'NUMBER',
      expected_value: 20.0,
      operator: '>=',
      weight: 25,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['CA_Turnover_Certificate']
    },
    {
      requirement_id: 'REQ-003',
      name: 'Make In India Local Content (>= 50%)',
      category: 'LOCAL_CONTENT',
      mandatory: true,
      data_type: 'PERCENTAGE',
      expected_value: 50.0,
      operator: '>=',
      weight: 10,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['Local_Content_Declaration']
    }
  ]);

  const addRequirement = () => {
    const nextIdx = requirements.length + 1;
    const newReq: TenderRequirement = {
      requirement_id: `REQ-00${nextIdx}`,
      name: 'New Requirement',
      category: 'TECHNICAL',
      mandatory: true,
      data_type: 'STRING',
      expected_value: 'Compliant',
      operator: '==',
      weight: 10,
      verification_type: 'DOCUMENT_AI',
      required_document_types: ['Documentary_Evidence']
    };
    setRequirements([...requirements, newReq]);
  };

  const removeRequirement = (idx: number) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  const updateRequirement = (idx: number, field: keyof TenderRequirement, value: any) => {
    const updated = [...requirements];
    updated[idx] = { ...updated[idx], [field]: value };
    setRequirements(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Tender title is required');

    onCreateTender({
      title,
      tender_number: tenderNumber || `GEM/2026/PROC/${Math.floor(1000 + Math.random() * 9000)}`,
      department,
      description,
      estimated_value_cr: estimatedValueCr,
      submission_deadline: deadline,
      requirements
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Create GeM Procurement Tender</h2>
          <p className="text-xs text-slate-400">Define tender specifications and deterministic compliance requirements</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Tender</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Tender Details */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">1. Tender Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Tender Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Supply of Industrial Safety Equipment & PPE"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tender Number</label>
              <input
                type="text"
                value={tenderNumber}
                onChange={(e) => setTenderNumber(e.target.value)}
                placeholder="Auto-generated if blank (e.g. GEM/2026/SAFETY/001)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department / Ministry</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Tender Value (₹ Cr)</label>
              <input
                type="number"
                step="0.1"
                value={estimatedValueCr}
                onChange={(e) => setEstimatedValueCr(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Submission Deadline</label>
              <input
                type="datetime-local"
                value={deadline.slice(0, 16)}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Tender Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Scope of work and procurement guidelines..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 2: Requirement Builder */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">2. Deterministic Compliance Requirements</h3>
              <p className="text-xs text-slate-400 mt-0.5">Rules will be evaluated deterministically against extracted facts</p>
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>

          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {req.requirement_id}
                    </span>
                    <input
                      type="text"
                      value={req.name}
                      onChange={(e) => updateRequirement(idx, 'name', e.target.value)}
                      placeholder="Requirement Name"
                      className="bg-transparent border-b border-slate-700 text-xs font-bold text-white px-1 py-0.5 focus:outline-none focus:border-amber-500 w-64"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={req.mandatory}
                        onChange={(e) => updateRequirement(idx, 'mandatory', e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>Mandatory (Hard Filter)</span>
                    </label>

                    {requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(idx)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Category</label>
                    <select
                      value={req.category}
                      onChange={(e) => updateRequirement(idx, 'category', e.target.value as RequirementCategory)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="STATUTORY">Statutory</option>
                      <option value="FINANCIAL">Financial</option>
                      <option value="TECHNICAL">Technical</option>
                      <option value="EXPERIENCE">Experience</option>
                      <option value="LOCAL_CONTENT">Local Content</option>
                      <option value="DOCUMENT">Document</option>
                      <option value="ELIGIBILITY">Eligibility</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Operator</label>
                    <select
                      value={req.operator}
                      onChange={(e) => updateRequirement(idx, 'operator', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value=">=">&gt;= (At least)</option>
                      <option value="<=">&lt;= (At most)</option>
                      <option value="==">== (Exact Match)</option>
                      <option value="CONTAINS">Contains</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Expected Threshold</label>
                    <input
                      type="text"
                      value={req.expected_value}
                      onChange={(e) => updateRequirement(idx, 'expected_value', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Soft Score Weight</label>
                    <input
                      type="number"
                      value={req.weight}
                      onChange={(e) => updateRequirement(idx, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
