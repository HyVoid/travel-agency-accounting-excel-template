import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'neutral' | 'anomaly' | 'positive' | 'warning';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'neutral',
  className = '',
}) => {
  // Infer type if not explicitly set
  let resolvedType = type;
  const s = status.toLowerCase();

  if (
    s.includes('overdue') ||
    s.includes('loss') ||
    s.includes('missing') ||
    s.includes('high risk') ||
    s.includes('invalid') ||
    s.includes('duplicate') ||
    s.includes('mismatch') ||
    s.includes('overcollected') ||
    s.includes('overpaid')
  ) {
    resolvedType = 'anomaly';
  } else if (s.includes('below') || s.includes('due soon') || s.includes('partial')) {
    resolvedType = 'warning';
  } else if (s.includes('target met') || s.includes('healthy') || s.includes('settled')) {
    resolvedType = 'positive';
  }

  // Visual styling according to design tokens
  let styleClasses = 'bg-[rgba(5,28,44,0.06)] text-[#051C2C] border-transparent';
  let dotColor = '#888888';

  if (resolvedType === 'anomaly') {
    styleClasses = 'bg-[rgba(211,47,47,0.08)] text-[#D32F2F] font-semibold';
    dotColor = '#D32F2F';
  } else if (resolvedType === 'warning') {
    // Subtle muted warning without banned orange
    styleClasses = 'bg-[rgba(5,28,44,0.08)] text-[#051C2C] font-medium';
    dotColor = '#2251FF';
  } else if (resolvedType === 'positive') {
    styleClasses = 'bg-[rgba(0,200,83,0.08)] text-[#051C2C] font-medium';
    dotColor = '#00C853';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs transition-transform duration-150 ${styleClasses} ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: dotColor }}
      />
      <span className="truncate">{status}</span>
    </span>
  );
};
