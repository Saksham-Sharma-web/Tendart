import React from 'react';

interface Props {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const norm = (status || '').toUpperCase().trim();

  let label = status;
  let bgClass = 'bg-[#F1F4F7] text-[#5F6B76] border-[#E1E6EA]';
  let dotClass = 'bg-[#5F6B76]';

  if (norm === 'QUALIFIED' || norm === 'APPROVED' || norm === 'COMPLIANT' || norm === 'VERIFIED' || norm === 'ACTIVE' || norm === 'PUBLISHED') {
    label = norm === 'QUALIFIED' ? 'Qualified' : norm === 'ACTIVE' ? 'Active' : 'Compliant';
    bgClass = 'bg-[#EBF6EE] text-[#16803C] border-[#CEEBD5]';
    dotClass = 'bg-[#16803C]';
  } else if (norm.includes('REVIEW') || norm === 'HOLD' || norm.includes('CLARIFICATION') || norm === 'DEGRADED') {
    label = norm.includes('CLARIFICATION') ? 'Clarification Required' : 'Review Required';
    bgClass = 'bg-[#FEF8EC] text-[#B7791F] border-[#FCE6BE]';
    dotClass = 'bg-[#B7791F]';
  } else if (norm === 'DISQUALIFIED' || norm === 'REJECTED' || norm === 'FAILED' || norm === 'OFFLINE' || norm === 'SUSPENDED') {
    label = norm === 'DISQUALIFIED' ? 'Disqualified' : norm === 'REJECTED' ? 'Rejected' : 'Non-Compliant';
    bgClass = 'bg-[#FDF2F1] text-[#C0392B] border-[#FACDC9]';
    dotClass = 'bg-[#C0392B]';
  } else if (norm === 'SUBMITTED' || norm === 'PENDING') {
    label = 'Submitted';
    bgClass = 'bg-[#EBF3FA] text-[#124B7A] border-[#D0E2F2]';
    dotClass = 'bg-[#124B7A]';
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
