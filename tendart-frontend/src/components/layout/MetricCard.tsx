import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`gov-card p-5 lg:p-6 flex flex-col justify-between transition-colors ${
        onClick ? 'cursor-pointer hover:border-[#CBD3DA]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#5F6B76] uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-md bg-[#EBF3FA] text-[#124B7A] flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-2xl lg:text-3xl font-bold text-[#17212B] tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-[#5F6B76] mt-1 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
};
