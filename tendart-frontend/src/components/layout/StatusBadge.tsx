import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Clock, ShieldAlert } from 'lucide-react';
import { ComplianceStatus, QualificationStatus } from '../../types';

interface Props {
  status: ComplianceStatus | QualificationStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const s = (status || '').toUpperCase();

  let bg = 'bg-slate-800/80 text-slate-300 border-slate-700';
  let Icon = Clock;

  if (s === 'PASS' || s === 'QUALIFIED' || s === 'APPROVED' || s === 'ACTIVE' || s === 'VALID' || s === 'CLEARED' || s === 'SUPPORTED') {
    bg = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-[0_0_12px_rgba(5,150,105,0.2)]';
    Icon = CheckCircle2;
  } else if (s === 'FAIL' || s === 'DISQUALIFIED' || s === 'REJECTED' || s === 'EXPIRED' || s === 'SUSPENDED') {
    bg = 'bg-rose-950/80 text-rose-300 border-rose-700/60 shadow-[0_0_12px_rgba(225,29,72,0.2)]';
    Icon = XCircle;
  } else if (s === 'REVIEW_REQUIRED' || s === 'REVIEW' || s === 'PARTIAL' || s === 'HOLD') {
    bg = 'bg-amber-950/80 text-amber-300 border-amber-700/60 shadow-[0_0_12px_rgba(217,119,6,0.2)]';
    Icon = AlertTriangle;
  } else if (s === 'MISSING' || s === 'NOT_FOUND') {
    bg = 'bg-slate-900 text-slate-400 border-slate-700';
    Icon = HelpCircle;
  } else if (s === 'CONTRADICTED' || s === 'BLACKLISTED') {
    bg = 'bg-purple-950/90 text-purple-300 border-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse';
    Icon = ShieldAlert;
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border font-medium uppercase tracking-wider backdrop-blur-sm ${bg} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      {s.replace(/_/g, ' ')}
    </span>
  );
};
