import React, { useState, useMemo } from 'react';
import {
  CalculatedPayment,
  CurrencyCode,
  PaymentRecord,
  PaymentType,
  SalesInvoice,
  SupplierBill,
  SystemConfig,
} from '../types';
import { formatMoney } from '../utils/calculations';
import { StatusBadge } from '../components/StatusBadge';
import { exportArrayToCSV } from '../utils/csvHelper';
import { Plus, Trash2, Search, Download, ArrowDownRight, ArrowUpRight, AlertTriangle } from 'lucide-react';

interface PaymentsViewProps {
  payments: CalculatedPayment[];
  invoices: SalesInvoice[];
  bills: SupplierBill[];
  config: SystemConfig;
  onUpdatePayment: (id: string, updated: Partial<PaymentRecord>) => void;
  onAddPayment: (payment: PaymentRecord) => void;
  onDeletePayment: (id: string) => void;
  onSelectBooking: (bookingId: string) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  payments,
  invoices,
  bills,
  config,
  onUpdatePayment,
  onAddPayment,
  onDeletePayment,
  onSelectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const symbol = config.baseCurrencySymbol;

  const [newPayment, setNewPayment] = useState<Partial<PaymentRecord>>({
    id: `PMT-${config.analysisYear}-${String(payments.length + 1).padStart(3, '0')}`,
    paymentDate: new Date().toISOString().split('T')[0],
    type: 'Customer Receipt',
    docId: invoices[0]?.id || '',
    method: 'UniCredit EUR',
    currency: 'EUR',
    originalAmount: 5000,
    lockedFxRate: null,
    notes: '',
  });

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        searchTerm === '' ||
        p.id.toLowerCase().includes(q) ||
        p.docId.toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q) ||
        p.linkedBookingId.toLowerCase().includes(q);

      const matchType = selectedType === 'all' || p.type === selectedType;
      return matchSearch && matchType;
    });
  }, [payments, searchTerm, selectedType]);

  const totals = useMemo(() => {
    const totalReceiptsBase = payments
      .filter((p) => p.type === config.receiptTypeLabel)
      .reduce((s, p) => s + p.baseAmount, 0);
    const totalDisbursementsBase = payments
      .filter((p) => p.type === config.paymentTypeLabel)
      .reduce((s, p) => s + p.baseAmount, 0);
    const netCashMovement = totalReceiptsBase - totalDisbursementsBase;
    const mismatchCount = payments.filter((p) => !p.currencyMatches).length;
    return { totalReceiptsBase, totalDisbursementsBase, netCashMovement, mismatchCount };
  }, [payments, config]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.id) return;
    onAddPayment(newPayment as PaymentRecord);
    setIsAddingNew(false);
    setNewPayment({
      id: `PMT-${config.analysisYear}-${String(payments.length + 2).padStart(3, '0')}`,
      paymentDate: new Date().toISOString().split('T')[0],
      type: 'Customer Receipt',
      docId: invoices[0]?.id || '',
      method: 'UniCredit EUR',
      currency: 'EUR',
      originalAmount: 5000,
      lockedFxRate: null,
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Payment ID',
      'Payment Date',
      'Transaction Type',
      'Linked Document ID',
      'Linked Booking ID',
      'Payment Method',
      'Currency',
      'Original Amount',
      'Locked FX',
      'Applied FX',
      `Base Amount (${config.baseCurrency})`,
      'Currency Match Check',
    ];
    const rows = filteredPayments.map((p) => [
      p.id,
      p.paymentDate,
      p.type,
      p.docId,
      p.linkedBookingId,
      p.method,
      p.currency,
      p.originalAmount,
      p.lockedFxRate || '',
      p.effectiveFxRate,
      p.baseAmount,
      p.currencyMatches ? 'Normal' : 'Currency Mismatch',
    ]);
    exportArrayToCSV(headers, rows, '05_Payment_Register_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 05 • Cash Ledger (Cash Accounting)
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Cash Inflows & Outflows Register
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Independent log of all bank and cash settlements. Every receipt links to an Invoice ID; every disbursement links to a Supplier Bill ID.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
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
            Total Customer Inflows
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4 text-[#2251FF]" />
            <span>{formatMoney(totals.totalReceiptsBase, symbol, 0)}</span>
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Total Vendor Disbursements
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-[#888888]" />
            <span>{formatMoney(totals.totalDisbursementsBase, symbol, 0)}</span>
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Net Booking Cash Movement
          </span>
          <div
            className={`font-heading text-xl font-bold ${
              totals.netCashMovement < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {formatMoney(totals.netCashMovement, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Currency Consistency
          </span>
          <div
            className={`font-heading text-xl font-bold ${
              totals.mismatchCount > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {totals.mismatchCount === 0 ? 'All Matches OK' : `${totals.mismatchCount} Mismatches`}
          </div>
        </div>
      </div>

      {/* New Payment Form Drawer */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubmit}
          className="card-surface-static p-5 bg-white border border-[#2251FF]/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E8E8E6] pb-2">
            <h3 className="font-heading text-base font-bold text-[#051C2C]">
              Record Cash Flow Transaction
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
                Payment ID *
              </label>
              <input
                type="text"
                required
                value={newPayment.id || ''}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, id: e.target.value.trim() })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Transaction Date
              </label>
              <input
                type="date"
                required
                value={newPayment.paymentDate || ''}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, paymentDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Transaction Type *
              </label>
              <select
                value={newPayment.type}
                onChange={(e) => {
                  const val = e.target.value as PaymentType;
                  const defaultDoc =
                    val === 'Customer Receipt'
                      ? invoices[0]?.id || ''
                      : bills[0]?.id || '';
                  setNewPayment({
                    ...newPayment,
                    type: val,
                    docId: defaultDoc,
                  });
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-medium"
              >
                <option value="Customer Receipt">Customer Receipt (Inflow)</option>
                <option value="Supplier Payment">Supplier Payment (Outflow)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Linked Document ID *
              </label>
              <select
                required
                value={newPayment.docId}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, docId: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              >
                {newPayment.type === 'Customer Receipt' ? (
                  invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.id} — {inv.bookingId} ({inv.currency} {inv.originalAmount})
                    </option>
                  ))
                ) : (
                  bills.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.id} — {b.bookingId} ({b.supplier} {b.currency} {b.originalAmount})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Payment Method / Account
              </label>
              <input
                type="text"
                required
                value={newPayment.method || ''}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, method: e.target.value })
                }
                placeholder="e.g. UniCredit EUR, Raiffeisen BAM"
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Currency
              </label>
              <select
                value={newPayment.currency}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
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
                value={newPayment.originalAmount || ''}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
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
                value={newPayment.lockedFxRate != null ? newPayment.lockedFxRate : ''}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
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
              Save Payment
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Toolbar */}
      <div className="card-surface-static p-4 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search payment ID, document, method, or booking..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-medium text-[#051C2C]"
            >
              <option value="all">All Flow Types ({payments.length})</option>
              <option value="Customer Receipt">Customer Receipts Only</option>
              <option value="Supplier Payment">Supplier Payments Only</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-[#888888] font-mono">
          Showing <strong>{filteredPayments.length}</strong> transactions
        </div>
      </div>

      {/* Main Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1250px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Payment ID</th>
                <th className="py-2.5 px-3">Payment Date</th>
                <th className="py-2.5 px-3">Transaction Type</th>
                <th className="py-2.5 px-3">Linked Doc ID</th>
                <th className="py-2.5 px-3 bg-[#F5F5F2]">Booking ID (Passthrough)</th>
                <th className="py-2.5 px-3">Method / Account</th>
                <th className="py-2.5 px-3 text-center">Curr</th>
                <th className="py-2.5 px-3 text-right">Original Amount</th>
                <th className="py-2.5 px-3 text-right">Locked FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Applied FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-bold">Base Amount</th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Currency Audit</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredPayments.map((pmt) => {
                const isReceipt = pmt.type === config.receiptTypeLabel;
                return (
                  <tr key={pmt.id} className="hover:bg-[#F5F5F2] transition-colors">
                    <td className="py-2 px-3 font-mono font-medium text-[#051C2C]">
                      {pmt.id}
                    </td>

                    <td className="py-2 px-3">
                      <input
                        type="date"
                        value={pmt.paymentDate}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, { paymentDate: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-[110px]"
                      />
                    </td>

                    <td className="py-2 px-3">
                      <select
                        value={pmt.type}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, {
                            type: e.target.value as PaymentType,
                          })
                        }
                        className="p-1 rounded text-xs input-editable font-medium"
                      >
                        <option value="Customer Receipt">Customer Receipt</option>
                        <option value="Supplier Payment">Supplier Payment</option>
                      </select>
                    </td>

                    <td className="py-2 px-3 font-mono">
                      <input
                        type="text"
                        value={pmt.docId}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, { docId: e.target.value.trim() })
                        }
                        className="p-1 rounded text-xs font-mono input-editable w-[120px]"
                      />
                    </td>

                    <td className="py-2 px-3 font-mono bg-[#F5F5F2]">
                      {pmt.linkedBookingId && !pmt.linkedBookingId.startsWith('⚠️') ? (
                        <button
                          onClick={() => onSelectBooking(pmt.linkedBookingId)}
                          className="text-[#2251FF] hover:underline"
                        >
                          {pmt.linkedBookingId}
                        </button>
                      ) : (
                        <span className="text-[#D32F2F]">
                          {pmt.linkedBookingId || '—'}
                        </span>
                      )}
                    </td>

                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={pmt.method}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, { method: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-[130px]"
                      />
                    </td>

                    <td className="py-2 px-3 text-center">
                      <select
                        value={pmt.currency}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, {
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
                        value={pmt.originalAmount}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, {
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
                        value={pmt.lockedFxRate != null ? pmt.lockedFxRate : ''}
                        onChange={(e) =>
                          onUpdatePayment(pmt.id, {
                            lockedFxRate: e.target.value
                              ? parseFloat(e.target.value)
                              : null,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[75px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#888888]">
                    {pmt.effectiveFxRate.toFixed(4)}
                  </td>

                  <td
                    className={`py-2 px-3 text-right font-mono font-bold bg-[#F5F5F2] ${
                      isReceipt ? 'text-[#051C2C]' : 'text-[#888888]'
                    }`}
                  >
                    {isReceipt ? '+' : '-'}{formatMoney(pmt.baseAmount, symbol, 2)}
                  </td>

                  <td className="py-2 px-3 text-center bg-[#F5F5F2]">
                    {pmt.currencyMatches ? (
                      <span className="text-[11px] text-[#00C853] font-medium">
                        ✓ Match OK
                      </span>
                    ) : (
                      <StatusBadge status="⚠️ Currency Mismatch" />
                    )}
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onDeletePayment(pmt.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)] rounded"
                      title="Delete Transaction"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};
