import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.4)] backdrop-blur-[8px]">
      <div className="card-surface-static w-full max-w-md bg-white shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-[#888888] hover:text-[#051C2C]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(211,47,47,0.1)] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#D32F2F]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#051C2C]">
              Reset to Sample Dataset?
            </h3>
            <p className="text-xs text-[#888888] mt-1 leading-relaxed">
              This will replace all current bookings, sales invoices, supplier bills, payments, and operating expenses with the default Balkan B2B reference dataset for FY 2026.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[rgba(34,81,255,0.04)] border-l-[3px] border-[#2251FF] text-xs text-[#051C2C]/80 mb-6">
          Tip: If you have current custom records, you can click <strong>Export</strong> on the top navigation bar to download a full JSON backup first.
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#D32F2F] hover:bg-[#b71c1c] shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
