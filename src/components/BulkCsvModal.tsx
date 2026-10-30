import React, { useState } from 'react';
import { CSV_TEMPLATES, exportArrayToCSV, parseBookingsCSV, parseCSV, parseInvoicesCSV, parseBillsCSV, parsePaymentsCSV, parseExpensesCSV } from '../utils/csvHelper';
import { Booking, OperatingExpense, PaymentRecord, SalesInvoice, SupplierBill } from '../types';
import { X, Upload, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface BulkCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportBookings: (data: Booking[], mode: 'append' | 'replace') => void;
  onImportInvoices: (data: SalesInvoice[], mode: 'append' | 'replace') => void;
  onImportBills: (data: SupplierBill[], mode: 'append' | 'replace') => void;
  onImportPayments: (data: PaymentRecord[], mode: 'append' | 'replace') => void;
  onImportExpenses: (data: OperatingExpense[], mode: 'append' | 'replace') => void;
}

export const BulkCsvModal: React.FC<BulkCsvModalProps> = ({
  isOpen,
  onClose,
  onImportBookings,
  onImportInvoices,
  onImportBills,
  onImportPayments,
  onImportExpenses,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>('bookings');
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [csvText, setCsvText] = useState<string>('');
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const template = CSV_TEMPLATES[selectedTable];
    if (template) {
      exportArrayToCSV(
        template.headers,
        [template.sampleRow],
        `${template.name}_template.csv`
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      processPreview(text);
    };
    reader.readAsText(file);
  };

  const handleTextChange = (text: string) => {
    setCsvText(text);
    processPreview(text);
  };

  const processPreview = (text: string) => {
    try {
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        setPreviewRows(parsed);
        setErrorMessage('');
      } else {
        setPreviewRows([]);
      }
    } catch {
      setErrorMessage('Failed to parse CSV formatted text.');
    }
  };

  const handleExecuteImport = () => {
    if (previewRows.length < 2) {
      setErrorMessage('CSV must contain a header row and at least one data row.');
      return;
    }

    try {
      if (selectedTable === 'bookings') {
        const data = parseBookingsCSV(previewRows);
        onImportBookings(data, importMode);
      } else if (selectedTable === 'invoices') {
        const data = parseInvoicesCSV(previewRows);
        onImportInvoices(data, importMode);
      } else if (selectedTable === 'bills') {
        const data = parseBillsCSV(previewRows);
        onImportBills(data, importMode);
      } else if (selectedTable === 'payments') {
        const data = parsePaymentsCSV(previewRows);
        onImportPayments(data, importMode);
      } else if (selectedTable === 'expenses') {
        const data = parseExpensesCSV(previewRows);
        onImportExpenses(data, importMode);
      }

      setSuccessMessage(
        `Successfully imported ${previewRows.length - 1} records into ${CSV_TEMPLATES[selectedTable].name} (${importMode === 'replace' ? 'replaced' : 'appended'}).`
      );
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1400);
    } catch {
      setErrorMessage('An error occurred during row mapping. Please check column format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.4)] backdrop-blur-[8px]">
      <div className="card-surface-static w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2251FF]" />
            <h3 className="font-heading text-lg font-bold text-[#051C2C]">
              Bulk CSV Data Import
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-[#F5F5F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[13px]">
          {/* Target Table Selector */}
          <div>
            <label className="block text-xs uppercase font-semibold text-[#051C2C] tracking-label mb-1.5">
              Target Sheet to Import
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'bookings', label: '02 Bookings' },
                { id: 'invoices', label: '03 Invoices' },
                { id: 'bills', label: '04 Bills' },
                { id: 'payments', label: '05 Payments' },
                { id: 'expenses', label: '06 OPEX' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedTable(opt.id);
                    setPreviewRows([]);
                    setCsvText('');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-medium text-center transition-all ${
                    selectedTable === opt.id
                      ? 'bg-[#051C2C] text-white shadow-sm'
                      : 'bg-[#F5F5F2] text-[#051C2C] hover:bg-[#E8E8E6]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Import Mode & Template Download */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-[#F5F5F2]">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#051C2C]">Mode:</span>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="importMode"
                  value="append"
                  checked={importMode === 'append'}
                  onChange={() => setImportMode('append')}
                  className="accent-[#2251FF]"
                />
                <span>Append to Existing</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                  className="accent-[#2251FF]"
                />
                <span className="text-[#D32F2F] font-medium">Replace Entire Sheet</span>
              </label>
            </div>

            <button
              onClick={handleDownloadTemplate}
              className="px-3 py-1.5 rounded text-xs font-semibold text-[#2251FF] hover:bg-white transition-colors flex items-center gap-1.5 border border-dashed border-[#2251FF]/40"
            >
              <Download className="w-3.5 h-3.5" />
              Download {CSV_TEMPLATES[selectedTable].name}.csv Template
            </button>
          </div>

          {/* File Upload / Paste Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-semibold text-[#051C2C] tracking-label">
                Upload CSV File or Paste Raw CSV Text
              </label>
              <label className="px-2.5 py-1 text-xs rounded bg-white text-[#051C2C] border border-[#E8E8E6] hover:bg-[#F5F5F2] cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Choose .csv file</span>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={csvText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Paste comma-separated values here, including header row..."
              rows={4}
              className="w-full p-2.5 rounded-lg border border-[#E8E8E6] text-xs font-mono input-editable resize-none"
            />
          </div>

          {/* Messages */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(211,47,47,0.06)] text-[#D32F2F] text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(0,200,83,0.08)] text-[#051C2C] text-xs font-semibold">
              <CheckCircle className="w-4 h-4 text-[#00C853] shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Parsed Preview Table */}
          {previewRows.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase font-semibold text-[#051C2C] tracking-label">
                  Data Preview ({previewRows.length - 1} data rows detected)
                </span>
                <span className="text-[11px] text-[#888888]">
                  Showing first 5 rows
                </span>
              </div>
              <div className="max-h-44 overflow-auto border border-[#E8E8E6] rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051C2C]/5 sticky top-0 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label">
                    <tr>
                      {previewRows[0].map((h, i) => (
                        <th key={i} className="px-3 py-1.5 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6]">
                    {previewRows.slice(1, 6).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#F5F5F2]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-1.5 whitespace-nowrap font-mono text-[11px]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E8E6] bg-[#F5F5F2] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#051C2C] hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExecuteImport}
            disabled={previewRows.length < 2}
            className={`px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all flex items-center gap-1.5 ${
              previewRows.length >= 2
                ? 'bg-[#2251FF] hover:bg-[#1a41cc] shadow-md'
                : 'bg-[#888888] cursor-not-allowed opacity-50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              Execute Import ({previewRows.length > 1 ? previewRows.length - 1 : 0} rows)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
