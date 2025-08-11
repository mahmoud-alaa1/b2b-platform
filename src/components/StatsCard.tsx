import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-50">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  );
}
