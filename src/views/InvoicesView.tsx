import React, { useState, useMemo } from 'react';
import {
  Booking,
  CalculatedInvoice,
  CurrencyCode,
  SalesInvoice,
  SystemConfig,
} from '../types';
import { formatMoney } from '../utils/calculations';
import { StatusBadge } from '../components/StatusBadge';
import { exportArrayToCSV } from '../utils/csvHelper';
import { Plus, Trash2, Search, Download, FileText, AlertCircle } from 'lucide-react';

interface InvoicesViewProps {
  invoices: CalculatedInvoice[];
  bookings: Booking[];
  config: SystemConfig;
  onUpdateInvoice: (id: string, updated: Partial<SalesInvoice>) => void;
  onAddInvoice: (invoice: SalesInvoice) => void;
  onDeleteInvoice: (id: string) => void;
  onSelectBooking: (bookingId: string) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  bookings,
  config,
  onUpdateInvoice,
  onAddInvoice,
  onDeleteInvoice,
  onSelectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const symbol = config.baseCurrencySymbol;

  const [newInvoice, setNewInvoice] = useState<Partial<SalesInvoice>>({
    id: `INV-${config.analysisYear}-${String(invoices.length + 1).padStart(3, '0')}`,
    bookingId: bookings[0]?.id || '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    currency: 'EUR',
    originalAmount: 10000,
    lockedFxRate: null,
    notes: '',
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const q = searchTerm.toLowerCase();
      return (
        searchTerm === '' ||
        i.id.toLowerCase().includes(q) ||
        i.bookingId.toLowerCase().includes(q) ||
        i.clientName.toLowerCase().includes(q)
      );
    });
  }, [invoices, searchTerm]);

  // Aggregate stats
  const totals = useMemo(() => {
    const totalBilledBase = filteredInvoices.reduce((s, i) => s + i.baseAmount, 0);
    const totalCollectedBase = filteredInvoices.reduce(
      (s, i) => s + (i.baseAmount - i.uncollectedBase),
      0
    );
    const totalARBase = filteredInvoices.reduce((s, i) => s + i.uncollectedBase, 0);
    const overdueCount = filteredInvoices.filter((i) => i.isOverdue).length;
    return { totalBilledBase, totalCollectedBase, totalARBase, overdueCount };
  }, [filteredInvoices]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.id) return;
    onAddInvoice(newInvoice as SalesInvoice);
    setIsAddingNew(false);
    setNewInvoice({
      id: `INV-${config.analysisYear}-${String(invoices.length + 2).padStart(3, '0')}`,
      bookingId: bookings[0]?.id || '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      currency: 'EUR',
      originalAmount: 10000,
      lockedFxRate: null,
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Invoice ID',
      'Booking ID',
      'B2B Client Name',
      'Invoice Date',
      'Due Date',
      'Currency',
      'Original Amount',
      'Locked FX',
      'Applied FX',
      `Base Amount (${config.baseCurrency})`,
      'Collected Original',
      'Uncollected Original',
      `Uncollected Base (${config.baseCurrency})`,
      'Status',
      'Month',
    ];
    const rows = filteredInvoices.map((i) => [
      i.id,
      i.bookingId,
      i.clientName,
      i.invoiceDate,
      i.dueDate,
      i.currency,
      i.originalAmount,
      i.lockedFxRate || '',
      i.effectiveFxRate,
      i.baseAmount,
      i.collectedOriginal,
      i.uncollectedOriginal,
      i.uncollectedBase,
      i.statusText,
      i.invoiceMonth,
    ]);
    exportArrayToCSV(headers, rows, '03_Sales_Invoices_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 03 • Accounts Receivable Ledger
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Client Sales Invoices & AR Tracking
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Linked to Booking IDs. Receipts registered in 05_Payment_Register automatically accumulate and calculate remaining AR balance and aging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-semibold text-[#051C2C] hover:bg-[#F5F5F2] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Total Billed (Base)
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.totalBilledBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Total Collected (Cash In)
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.totalCollectedBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Outstanding AR Balance
          </span>
          <div className="font-heading text-xl font-bold text-[#2251FF]">
            {formatMoney(totals.totalARBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Overdue Invoices
          </span>
          <div
            className={`font-heading text-xl font-bold ${
              totals.overdueCount > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {totals.overdueCount} bills past due
          </div>
        </div>
      </div>

      {/* New Invoice Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubmit}
          className="card-surface-static p-5 bg-white border border-[#2251FF]/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E8E8E6] pb-2">
            <h3 className="font-heading text-base font-bold text-[#051C2C]">
              Issue New Sales Invoice
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-[#888888] hover:text-[#051C2C]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Invoice ID *
              </label>
              <input
                type="text"
                required
                value={newInvoice.id || ''}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, id: e.target.value.trim() })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Linked Booking ID *
              </label>
              <select
                required
                value={newInvoice.bookingId}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, bookingId: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              >
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} — {b.client} ({b.destination})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                required
                value={newInvoice.invoiceDate || ''}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, invoiceDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Payment Due Date
              </label>
              <input
                type="date"
                required
                value={newInvoice.dueDate || ''}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, dueDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Original Currency
              </label>
              <select
                value={newInvoice.currency}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    currency: e.target.value as CurrencyCode,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
              >
                {config.currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Original Amount *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={newInvoice.originalAmount || ''}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    originalAmount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Manual Locked FX Rate (Optional)
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="Leave blank to use live setup rate"
                value={newInvoice.lockedFxRate != null ? newInvoice.lockedFxRate : ''}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    lockedFxRate: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Notes
              </label>
              <input
                type="text"
                value={newInvoice.notes || ''}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, notes: e.target.value })
                }
                placeholder="Contract reference..."
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] shadow-sm"
            >
              Save Invoice
            </button>
          </div>
        </form>
      )}

      {/* Search Toolbar */}
      <div className="card-surface-static p-4 bg-white flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice ID, booking ID, or client..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
          />
        </div>
        <div className="text-[11px] text-[#888888] font-mono">
          Showing <strong>{filteredInvoices.length}</strong> invoices
        </div>
      </div>

      {/* Main Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1300px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Invoice ID</th>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3 min-w-[180px] bg-[#F5F5F2]">Client (Auto)</th>
                <th className="py-2.5 px-3">Issue Date</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3 text-center">Curr</th>
                <th className="py-2.5 px-3 text-right">Original Amount</th>
                <th className="py-2.5 px-3 text-right">Locked FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Applied FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-bold">Base Amount</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Collected Orig</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-semibold text-[#2251FF]">
                  Uncollected AR
                </th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Aging & Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F5F5F2] transition-colors">
                  {/* Invoice ID */}
                  <td className="py-2 px-3 font-mono font-medium text-[#051C2C]">
                    {inv.id}
                  </td>

                  {/* Booking ID */}
                  <td className="py-2 px-3 font-mono">
                    <button
                      onClick={() => onSelectBooking(inv.bookingId)}
                      className="text-[#2251FF] hover:underline"
                    >
                      {inv.bookingId}
                    </button>
                  </td>

                  {/* Auto Client */}
                  <td className="py-2 px-3 bg-[#F5F5F2] text-[#051C2C] font-medium truncate max-w-[180px]">
                    {inv.clientName}
                  </td>

                  {/* Issue Date */}
                  <td className="py-2 px-3">
                    <input
                      type="date"
                      value={inv.invoiceDate}
                      onChange={(e) =>
                        onUpdateInvoice(inv.id, { invoiceDate: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-[110px]"
                    />
                  </td>

                  {/* Due Date */}
                  <td className="py-2 px-3">
                    <input
                      type="date"
                      value={inv.dueDate}
                      onChange={(e) =>
                        onUpdateInvoice(inv.id, { dueDate: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-[110px]"
                    />
                  </td>

                  {/* Currency */}
                  <td className="py-2 px-3 text-center">
                    <select
                      value={inv.currency}
                      onChange={(e) =>
                        onUpdateInvoice(inv.id, {
                          currency: e.target.value as CurrencyCode,
                        })
                      }
                      className="p-1 rounded text-xs input-editable font-mono"
                    >
                      {config.currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Original Amount */}
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={inv.originalAmount}
                      onChange={(e) =>
                        onUpdateInvoice(inv.id, {
                          originalAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[90px]"
                    />
                  </td>

                  {/* Locked FX Rate */}
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="Auto"
                      value={inv.lockedFxRate != null ? inv.lockedFxRate : ''}
                      onChange={(e) =>
                        onUpdateInvoice(inv.id, {
                          lockedFxRate: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[75px]"
                    />
                  </td>

                  {/* Auto: Effective FX */}
                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#888888]">
                    {inv.effectiveFxRate.toFixed(4)}
                  </td>

                  {/* Auto: Base Amount */}
                  <td className="py-2 px-3 text-right font-mono font-bold bg-[#F5F5F2] text-[#051C2C]">
                    {formatMoney(inv.baseAmount, symbol, 2)}
                  </td>

                  {/* Auto: Collected Original */}
                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#051C2C]">
                    {inv.currency} {inv.collectedOriginal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Auto: Uncollected Base */}
                  <td className="py-2 px-3 text-right font-mono font-semibold bg-[#F5F5F2] text-[#2251FF]">
                    {formatMoney(inv.uncollectedBase, symbol, 2)}
                  </td>

                  {/* Auto: Settlement & Aging Status */}
                  <td className="py-2 px-3 text-center bg-[#F5F5F2]">
                    <StatusBadge status={inv.statusText} />
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onDeleteInvoice(inv.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)] rounded"
                      title="Delete Invoice"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
