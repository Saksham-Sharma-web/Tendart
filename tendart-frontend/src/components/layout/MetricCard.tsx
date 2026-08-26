import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'navy' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan';
  trend?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'navy',
  trend,
  onClick
}) => {
  const colorMap = {
    navy: 'from-blue-900/30 to-slate-900 border-blue-800/40 text-blue-400',
    emerald: 'from-emerald-950/40 to-slate-900 border-emerald-800/50 text-emerald-400',
    amber: 'from-amber-950/40 to-slate-900 border-amber-800/50 text-amber-400',
    rose: 'from-rose-950/40 to-slate-900 border-rose-800/50 text-rose-400',
    purple: 'from-purple-950/40 to-slate-900 border-purple-800/50 text-purple-400',
    cyan: 'from-cyan-950/40 to-slate-900 border-cyan-800/50 text-cyan-400'
  };

  const iconBgMap = {
    navy: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel bg-gradient-to-b ${colorMap[color]} rounded-xl p-5 border glass-card-hover ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
            {trend && <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">{trend}</span>}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg border ${iconBgMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
