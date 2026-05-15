
import React from 'react';
import { Icons } from '../constants';

interface StatsCardProps {
  label: string;
  value: number;
  type: 'pending' | 'serviced' | 'in_progress';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, type }) => {
  const getColors = () => {
    switch (type) {
      case 'serviced':
        return { bg: 'bg-emerald-50', text: 'text-emerald-500', icon: <Icons.Check /> };
      case 'in_progress':
        return { bg: 'bg-blue-50', text: 'text-blue-500', icon: <Icons.Play /> };
      case 'pending':
      default:
        return { bg: 'bg-amber-50', text: 'text-amber-500', icon: <Icons.Clock /> };
    }
  };

  const colors = getColors();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-1 w-full min-w-[280px]">
      <div>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{value}</h3>
      </div>
      <div className={`${colors.bg} p-4 rounded-xl`}>
        <div className={colors.text}>
          {colors.icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
