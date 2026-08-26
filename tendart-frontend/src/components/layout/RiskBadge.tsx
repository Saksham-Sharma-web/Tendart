import React from 'react';
import { ShieldCheck, ShieldAlert, AlertOctagon, AlertCircle } from 'lucide-react';
import { RiskLevel } from '../../types';

interface Props {
  risk: RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<Props> = ({ risk, size = 'md' }) => {
  const r = (risk || 'LOW').toUpperCase();

  let bg = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-[0_0_12px_rgba(5,150,105,0.2)]';
  let Icon = ShieldCheck;
  let label = 'LOW RISK';

  if (r === 'CRITICAL') {
    bg = 'bg-rose-950/90 text-rose-300 border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.3)] animate-pulse';
    Icon = AlertOctagon;
    label = 'CRITICAL RISK';
  } else if (r === 'HIGH') {
    bg = 'bg-orange-950/80 text-orange-300 border-orange-700/70 shadow-[0_0_12px_rgba(234,88,12,0.25)]';
    Icon = ShieldAlert;
    label = 'HIGH RISK';
  } else if (r === 'MEDIUM') {
    bg = 'bg-amber-950/80 text-amber-300 border-amber-700/60 shadow-[0_0_12px_rgba(217,119,6,0.2)]';
    Icon = AlertCircle;
    label = 'MEDIUM RISK';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border tracking-wider uppercase ${bg} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      {label}
    </span>
  );
};
