import React from 'react';

interface DataBarProps {
  value: number; // Current value
  max: number; // Max value for proportion
  formattedValue?: string;
  fillColor?: string; // Default #2251FF
  height?: number; // Default 6px
  showLabel?: boolean;
}

export const DataBar: React.FC<DataBarProps> = ({
  value,
  max,
  formattedValue,
  fillColor = '#2251FF',
  height = 5,
  showLabel = true,
}) => {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className="flex flex-col gap-1 w-full min-w-[70px]">
      {showLabel && (
        <span className="text-right text-xs font-mono font-medium text-[#051C2C]">
          {formattedValue !== undefined ? formattedValue : value.toLocaleString()}
        </span>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: `${height}px`,
          backgroundColor: 'rgba(5, 28, 44, 0.10)', // Track with 10% opacity
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
};
