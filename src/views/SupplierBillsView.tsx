import React, { useState, useMemo } from 'react';
import {
  Booking,
  CalculatedSupplierBill,
  CurrencyCode,
  DirectCostCategory,
  SupplierBill,
  SystemConfig,
} from '../types';
import { formatMoney } from '../utils/calculations';
import { StatusBadge } from '../components/StatusBadge';
import { exportArrayToCSV } from '../utils/csvHelper';
import { Plus, Trash2, Search, Download, AlertTriangle } from 'lucide-react';

interface SupplierBillsViewProps {
  bills: CalculatedSupplierBill[];
  bookings: Booking[];
  config: SystemConfig;
  onUpdateBill: (id: string, updated: Partial<SupplierBill>) => void;
  onAddBill: (bill: SupplierBill) => void;
  onDeleteBill: (id: string) => void;
  onSelectBooking: (bookingId: string) => void;
}

export const SupplierBillsView: React.FC<SupplierBillsViewProps> = ({
  bills,
  bookings,
  config,
  onUpdateBill,
  onAddBill,
  onDeleteBill,
  onSelectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const symbol = config.baseCurrencySymbol;

  const [newBill, setNewBill] = useState<Partial<SupplierBill>>({
    id: `BILL-${config.analysisYear}-${String(bills.length + 1).padStart(3, '0')}`,
    bookingId: bookings[0]?.id || '',
    supplier: config.suppliers[0] || '',
    category: 'Hotel',
    billDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    currency: 'BAM',
    originalAmount: 5000,
    lockedFxRate: null,
    notes: '',
  });

  const filteredBills = useMemo(() => {
    return bills.filter((b) => {
      const q = searchTerm.toLowerCase();
      return (
        searchTerm === '' ||
        b.id.toLowerCase().includes(q) ||
        b.bookingId.toLowerCase().includes(q) ||
        b.supplier.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    });
  }, [bills, searchTerm]);

  const totals = useMemo(() => {
    const totalCostBase = filteredBills.reduce((s, b) => s + b.baseAmount, 0);
    const totalPaidBase = filteredBills.reduce(
      (s, b) => s + (b.baseAmount - b.unpaidBase),
      0
    );
    const totalAPBase = filteredBills.reduce((s, b) => s + b.unpaidBase, 0);
    const overdueCount = filteredBills.filter((b) => b.isOverdue).length;
    return { totalCostBase, totalPaidBase, totalAPBase, overdueCount };
  }, [filteredBills]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBill.id) return;
    onAddBill(newBill as SupplierBill);
    setIsAddingNew(false);
    setNewBill({
      id: `BILL-${config.analysisYear}-${String(bills.length + 2).padStart(3, '0')}`,
      bookingId: bookings[0]?.id || '',
      supplier: config.suppliers[0] || '',
      category: 'Hotel',
      billDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      currency: 'BAM',
      originalAmount: 5000,
      lockedFxRate: null,
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Bill ID',
      'Booking ID',
      'Supplier Name',
      'Cost Category',
      'Bill Date',
      'Due Date',
      'Currency',
      'Original Amount',
      'Locked FX',
      'Applied FX',
      `Base Cost (${config.baseCurrency})`,
      'Paid Original',
      'Unpaid Original',
      `Unpaid Base (${config.baseCurrency})`,
      'Status',
    ];
    const rows = filteredBills.map((b) => [
      b.id,
      b.bookingId,
      b.supplier,
      b.category,
      b.billDate,
      b.dueDate,
      b.currency,
      b.originalAmount,
      b.lockedFxRate || '',
      b.effectiveFxRate,
      b.baseAmount,
      b.paidOriginal,
      b.unpaidOriginal,
      b.unpaidBase,
      b.statusText,
    ]);
    exportArrayToCSV(headers, rows, '04_Supplier_Bills_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 04 • Accounts Payable Ledger
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Supplier Procurement Bills & Direct Costs
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Hotels, coach lines, local guides, and admissions tied to orders. Payments in 05_Payment_Register automatically settle balances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Bill</span>
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
            Total Direct Costs (Base)
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.totalCostBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Total Paid to Vendors
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.totalPaidBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Outstanding AP Balance
          </span>
          <div className="font-heading text-xl font-bold text-[#2251FF]">
            {formatMoney(totals.totalAPBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Overdue Payables
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

      {/* New Bill Form Drawer */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubmit}
          className="card-surface-static p-5 bg-white border border-[#2251FF]/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E8E8E6] pb-2">
            <h3 className="font-heading text-base font-bold text-[#051C2C]">
              Register New Supplier Procurement Bill
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
                Supplier Bill ID *
              </label>
              <input
                type="text"
                required
                value={newBill.id || ''}
                onChange={(e) =>
                  setNewBill({ ...newBill, id: e.target.value.trim() })
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
                value={newBill.bookingId}
                onChange={(e) =>
                  setNewBill({ ...newBill, bookingId: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              >
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} — {b.destination} ({b.client})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Supplier Name
              </label>
              <select
                value={newBill.supplier}
                onChange={(e) =>
                  setNewBill({ ...newBill, supplier: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.suppliers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Cost Category
              </label>
              <select
                value={newBill.category}
                onChange={(e) =>
                  setNewBill({
                    ...newBill,
                    category: e.target.value as DirectCostCategory,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.directCostCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Bill Registration Date
              </label>
              <input
                type="date"
                required
                value={newBill.billDate || ''}
                onChange={(e) =>
                  setNewBill({ ...newBill, billDate: e.target.value })
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
                value={newBill.dueDate || ''}
                onChange={(e) =>
                  setNewBill({ ...newBill, dueDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Currency
              </label>
              <select
                value={newBill.currency}
                onChange={(e) =>
                  setNewBill({
                    ...newBill,
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
                value={newBill.originalAmount || ''}
                onChange={(e) =>
                  setNewBill({
                    ...newBill,
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
                placeholder="Auto rate"
                value={newBill.lockedFxRate != null ? newBill.lockedFxRate : ''}
                onChange={(e) =>
                  setNewBill({
                    ...newBill,
                    lockedFxRate: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable text-right"
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
              Save Supplier Bill
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
            placeholder="Search bill ID, booking ID, supplier, or category..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
          />
        </div>
        <div className="text-[11px] text-[#888888] font-mono">
          Showing <strong>{filteredBills.length}</strong> bills
        </div>
      </div>

      {/* Main Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1300px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Bill ID</th>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3 min-w-[180px]">Supplier Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Bill Date</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3 text-center">Curr</th>
                <th className="py-2.5 px-3 text-right">Original Amount</th>
                <th className="py-2.5 px-3 text-right">Locked FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Applied FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-bold">Base Cost</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Paid Orig</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-semibold text-[#2251FF]">
                  Unpaid AP
                </th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Payment Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-[#F5F5F2] transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-[#051C2C]">
                    {bill.id}
                  </td>

                  <td className="py-2 px-3 font-mono">
                    <button
                      onClick={() => onSelectBooking(bill.bookingId)}
                      className="text-[#2251FF] hover:underline"
                    >
                      {bill.bookingId}
                    </button>
                    {!bill.isValidBooking && (
                      <span className="text-[#D32F2F] ml-1 font-semibold" title="Invalid Booking ID">
                        ⚠️
                      </span>
                    )}
                  </td>

                  <td className="py-2 px-3">
                    <select
                      value={bill.supplier}
                      onChange={(e) =>
                        onUpdateBill(bill.id, { supplier: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-full max-w-[200px]"
                    >
                      {config.suppliers.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 px-3">
                    <select
                      value={bill.category}
                      onChange={(e) =>
                        onUpdateBill(bill.id, {
                          category: e.target.value as DirectCostCategory,
                        })
                      }
                      className="p-1 rounded text-xs input-editable"
                    >
                      {config.directCostCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 px-3">
                    <input
                      type="date"
                      value={bill.billDate}
                      onChange={(e) =>
                        onUpdateBill(bill.id, { billDate: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-[110px]"
                    />
                  </td>

                  <td className="py-2 px-3">
                    <input
                      type="date"
                      value={bill.dueDate}
                      onChange={(e) =>
                        onUpdateBill(bill.id, { dueDate: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-[110px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-center">
                    <select
                      value={bill.currency}
                      onChange={(e) =>
                        onUpdateBill(bill.id, {
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

                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={bill.originalAmount}
                      onChange={(e) =>
                        onUpdateBill(bill.id, {
                          originalAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[90px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="Auto"
                      value={bill.lockedFxRate != null ? bill.lockedFxRate : ''}
                      onChange={(e) =>
                        onUpdateBill(bill.id, {
                          lockedFxRate: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[75px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#888888]">
                    {bill.effectiveFxRate.toFixed(4)}
                  </td>

                  <td className="py-2 px-3 text-right font-mono font-bold bg-[#F5F5F2] text-[#051C2C]">
                    {formatMoney(bill.baseAmount, symbol, 2)}
                  </td>

                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#051C2C]">
                    {bill.currency} {bill.paidOriginal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-2 px-3 text-right font-mono font-semibold bg-[#F5F5F2] text-[#2251FF]">
                    {formatMoney(bill.unpaidBase, symbol, 2)}
                  </td>

                  <td className="py-2 px-3 text-center bg-[#F5F5F2]">
                    <StatusBadge status={bill.statusText} />
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onDeleteBill(bill.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)] rounded"
                      title="Delete Bill"
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
