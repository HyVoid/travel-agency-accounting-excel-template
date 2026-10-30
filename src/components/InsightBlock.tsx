import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InsightBlockProps {
  title?: string;
  children: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const InsightBlock: React.FC<InsightBlockProps> = ({
  title = 'Management Insight & Strategic Takeaway',
  children,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div
      className={`rounded-r-lg p-4 transition-all duration-200 border-l-[3px] border-[#2251FF] bg-[rgba(34,81,255,0.04)] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="w-4 h-4 text-[#2251FF] shrink-0" />
          <h4 className="text-xs uppercase font-semibold text-[#051C2C] tracking-label">
            {title}
          </h4>
        </div>
        {actionText && (
          <button
            onClick={onActionClick}
            className="text-xs font-semibold text-[#2251FF] hover:underline shrink-0 transition-colors"
          >
            {actionText} →
          </button>
        )}
      </div>
      <div className="text-xs text-[#051C2C]/85 leading-relaxed pl-6 mt-1">
        {children}
      </div>
    </div>
  );
};
