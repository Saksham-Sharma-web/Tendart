import React from 'react';
import {
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MetricCard } from '../components/layout/MetricCard';
import { StatusBadge } from '../components/layout/StatusBadge';
import { RiskBadge } from '../components/layout/RiskBadge';
import { Tender, Bid } from '../types';

interface Props {
  tenders: Tender[];
  bids: Bid[];
  onSelectTender: (tenderId: string) => void;
  onSelectBid: (bidId: string) => void;
  onNavigate: (view: string) => void;
  onLoadDemo: () => void;
}

export const DashboardView: React.FC<Props> = ({
  tenders,
  bids,
  onSelectTender,
  onSelectBid,
  onNavigate,
  onLoadDemo
}) => {
  const activeTender = tenders[0];

  const totalBids = bids.length;
  const qualifiedBids = bids.filter((b) => b.compliance_status === 'QUALIFIED' || b.status === 'QUALIFIED').length;
  const reviewBids = bids.filter((b) => (b.compliance_status || '').includes('REVIEW') || (b.status || '').includes('REVIEW')).length;
  const disqualifiedBids = bids.filter((b) => b.compliance_status === 'DISQUALIFIED' || b.status === 'DISQUALIFIED').length;
  const criticalRiskCount = bids.filter((b) => b.risk_level === 'CRITICAL').length;

  const qualRate = totalBids > 0 ? Math.round((qualifiedBids / totalBids) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-r from-slate-950 via-[#0B192C] to-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Decision Support Center
              </span>
              <span className="text-xs text-slate-400 font-medium">SIH 26100 Prototype</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-2 tracking-tight">
              AI-Powered Bid Compliance Intelligence
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Automated document ingestion, multi-page vector & OCR parsing, source-grounded evidence extraction, and deterministic rule evaluation for GeM procurement.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLoadDemo}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Load GeM Demo Tender</span>
            </button>
            <button
              onClick={() => onNavigate('rankings')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Ranking Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Active Tenders"
          value={tenders.length}
          subtitle="GeM Procurement Bids"
          icon={FileText}
          color="navy"
          onClick={() => onNavigate('tenders')}
        />
        <MetricCard
          title="Total Bidders"
          value={totalBids}
          subtitle="Packages Processed"
          icon={Users}
          color="cyan"
          onClick={() => onNavigate('rankings')}
        />
        <MetricCard
          title="Qualified Bids"
          value={qualifiedBids}
          subtitle={`${qualRate}% Qualification Rate`}
          icon={CheckCircle2}
          color="emerald"
          trend={`${qualRate}%`}
          onClick={() => onNavigate('rankings')}
        />
        <MetricCard
          title="Review Queue"
          value={reviewBids}
          subtitle="Human Review Needed"
          icon={AlertTriangle}
          color="amber"
          onClick={() => onNavigate('rankings')}
        />
        <MetricCard
          title="Disqualified"
          value={disqualifiedBids}
          subtitle="Failed Hard Criteria"
          icon={XCircle}
          color="rose"
          onClick={() => onNavigate('rankings')}
        />
        <MetricCard
          title="Critical Risk"
          value={criticalRiskCount}
          subtitle="Debarred / Violations"
          icon={ShieldAlert}
          color="purple"
          onClick={() => onNavigate('rankings')}
        />
      </div>

      {/* Main Split: Featured Tender & Live Bidder Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Featured Tender Card */}
        {activeTender && (
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0B192C]/90">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {activeTender.tender_number}
                  </span>
                  <StatusBadge status={activeTender.status} size="sm" />
                </div>
                <h3 className="text-lg font-bold text-white mt-2 leading-snug">{activeTender.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeTender.department}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Value</p>
                <p className="text-xl font-extrabold text-amber-400">₹{activeTender.estimated_value_cr} Cr</p>
              </div>
            </div>

            {/* Requirement Checklist Overview */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Mandatory Tender Requirements ({activeTender.requirements?.length || 0})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTender.requirements?.map((req) => (
                  <div
                    key={req.requirement_id}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span className="text-slate-200 font-medium">{req.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
                      {req.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Submission Deadline: <b>30 Oct 2026</b>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tenders')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
                >
                  Tender Matrix
                </button>
                <button
                  onClick={() => onNavigate('rankings')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Rankings ({totalBids})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right 1 Col: Top Ranked Bidders Shortlist */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0B192C]/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Live Qualified Shortlist</h3>
              </div>
              <button
                onClick={() => onNavigate('rankings')}
                className="text-[11px] text-amber-400 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {bids.slice(0, 5).map((b, idx) => (
                <div
                  key={b.bid_id}
                  onClick={() => {
                    onSelectBid(b.bid_id);
                    onNavigate('bid_detail');
                  }}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-extrabold text-xs flex items-center justify-center border border-amber-500/30">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {b.bidder_name}
                      </p>
                      <p className="text-[11px] text-slate-400">Bid: ₹{b.bid_amount_cr} Cr</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-400">
                      {b.compliance_score || 90}/100
                    </span>
                    <div>
                      <RiskBadge risk={b.risk_level || 'LOW'} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('evidence_viewer')}
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Split Evidence Viewer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
