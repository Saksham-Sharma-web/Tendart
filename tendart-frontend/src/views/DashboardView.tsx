import React from 'react';
import {
  Tender,
  Bid
} from '../types';
import { MetricCard } from '../components/layout/MetricCard';
import { StatusBadge } from '../components/layout/StatusBadge';
import {
  FileText,
  Building,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  Database
} from 'lucide-react';

interface Props {
  tenders: Tender[];
  bids: Bid[];
  onSelectTender: (tenderId: string) => void;
  onSelectBid: (bidId: string) => void;
  onNavigate: (view: string) => void;
  onRunPipeline: () => void;
}

export const DashboardView: React.FC<Props> = ({
  tenders,
  bids,
  onSelectTender,
  onSelectBid,
  onNavigate,
  onRunPipeline
}) => {
  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Banner Card */}
      <div className="gov-card p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#124B7A] uppercase tracking-wider bg-[#EBF3FA] border border-[#D0E2F2] px-2.5 py-0.5 rounded">
              Procurement Intelligence
            </span>
            <span className="text-xs text-[#5F6B76]">GeM Central Procurement Network</span>
          </div>
          <h1 className="text-2xl font-bold text-[#17212B] tracking-tight">
            Automated Bid Compliance & Risk Intelligence Hub
          </h1>
          <p className="text-sm text-[#5F6B76]">
            SIH Problem Statement 26100 • Automated Extraction, Cross-Registry Verification & Human Decision Support
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRunPipeline}
            className="gov-btn-primary h-10 px-5 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Execute AI Pipeline</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Tenders"
          value={tenders.length.toString()}
          subtitle="Published on GeM Portal"
          icon={FileText}
        />
        <MetricCard
          title="Bids Received"
          value={bids.length.toString()}
          subtitle="From Verified Enterprises"
          icon={Users}
        />
        <MetricCard
          title="Compliant (Passed)"
          value={bids.filter((b) => (b.compliance_score || 0) >= 75).length.toString()}
          subtitle="Passed All Hard Filters"
          icon={CheckCircle}
        />
        <MetricCard
          title="Discrepancies Flagged"
          value={bids.filter((b) => (b.compliance_score || 0) < 75).length.toString()}
          subtitle="Requiring Officer Review"
          icon={AlertTriangle}
        />
      </div>

      {/* Active Tenders Quick Table */}
      <div className="gov-card overflow-hidden">
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#17212B]">Active Tenders Overview</h2>
          <span className="text-xs text-[#5F6B76] font-mono">{tenders.length} Active Procurements</span>
        </div>

        <table className="w-full gov-table text-left">
          <thead>
            <tr>
              <th>Tender Number</th>
              <th>Tender Scope Title</th>
              <th>Department</th>
              <th>Estimated Value</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((t) => (
              <tr key={t.tender_id}>
                <td><span className="font-mono font-bold text-[#124B7A] text-xs">{t.tender_number}</span></td>
                <td><span className="font-semibold text-[#17212B] text-xs">{t.title}</span></td>
                <td><span className="text-xs text-[#5F6B76]">{t.department}</span></td>
                <td><span className="font-semibold text-[#17212B] text-xs">₹ {t.estimated_value_cr} Cr</span></td>
                <td><StatusBadge status={t.status} size="sm" /></td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      onSelectTender(t.tender_id);
                      onNavigate('rankings');
                    }}
                    className="gov-btn-primary h-8 px-3 text-xs"
                  >
                    Evaluate Bids
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
