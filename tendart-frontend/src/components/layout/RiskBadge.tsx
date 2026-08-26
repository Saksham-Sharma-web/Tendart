import React from 'react';

interface Props {
  risk: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<Props> = ({ risk, size = 'md' }) => {
  const norm = (risk || '').toUpperCase().trim();

  let label = 'Low Risk';
  let bgClass = 'bg-[#EBF6EE] text-[#16803C] border-[#CEEBD5]';
  let dotClass = 'bg-[#16803C]';

  if (norm === 'HIGH' || norm === 'CRITICAL') {
    label = norm === 'CRITICAL' ? 'Critical Risk' : 'High Risk';
    bgClass = 'bg-[#FDF2F1] text-[#C0392B] border-[#FACDC9]';
    dotClass = 'bg-[#C0392B]';
  } else if (norm === 'MEDIUM' || norm === 'MODERATE') {
    label = 'Medium Risk';
    bgClass = 'bg-[#FEF8EC] text-[#B7791F] border-[#FCE6BE]';
    dotClass = 'bg-[#B7791F]';
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-2',
    lg: 'px-3 py-1.5 text-sm gap-2'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${sizeClasses[size]} ${bgClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
      <span>{label}</span>
    </span>
  );
};
