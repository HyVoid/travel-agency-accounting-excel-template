import React from 'react';
import {
  Booking,
  CalculatedInvoice,
  CalculatedOrderEngineRow,
  CalculatedPayment,
  CalculatedSupplierBill,
  SystemConfig,
} from '../types';
import { formatMoney, formatPercent } from '../utils/calculations';
import { StatusBadge } from './StatusBadge';
import { X, Calendar, MapPin, Users, User, FileText, Receipt, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface BookingDrilldownModalProps {
  bookingId: string | null;
  onClose: () => void;
  booking: Booking | undefined;
  engineRow: CalculatedOrderEngineRow | undefined;
  invoices: CalculatedInvoice[];
  bills: CalculatedSupplierBill[];
  payments: CalculatedPayment[];
  config: SystemConfig;
}

export const BookingDrilldownModal: React.FC<BookingDrilldownModalProps> = ({
  bookingId,
  onClose,
  booking,
  engineRow,
  invoices,
  bills,
  payments,
  config,
}) => {
  if (!bookingId || !booking) return null;

  const linkedInvoices = invoices.filter((i) => i.bookingId === bookingId);
  const linkedBills = bills.filter((b) => b.bookingId === bookingId);
  const linkedInvoiceIds = new Set(linkedInvoices.map((i) => i.id));
  const linkedBillIds = new Set(linkedBills.map((b) => b.id));

  const linkedPayments = payments.filter(
    (p) => linkedInvoiceIds.has(p.docId) || linkedBillIds.has(p.docId)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.4)] backdrop-blur-[8px]">
      <div className="card-surface-static w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm px-2.5 py-1 rounded bg-[#051C2C] text-white font-semibold">
              {booking.id}
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#051C2C]">
                {booking.client}
              </h3>
              <p className="text-xs text-[#888888] flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#2251FF]" />
                  {booking.destination}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#888888]" />
                  {booking.travelDate} to {booking.returnDate} ({engineRow?.durationDays || 1}d)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#888888]" />
                  {booking.pax} PAX ({booking.tourType})
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {engineRow && <StatusBadge status={engineRow.diagnostic} />}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-[#F5F5F2]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[13px]">
          {/* Financial Summary Strip */}
          {engineRow && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F5F5F2] border border-[#E8E8E6]">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
                  Sales Revenue
                </span>
                <div className="font-heading text-xl font-bold text-[#051C2C]">
                  {formatMoney(engineRow.salesRevenueBase, config.baseCurrencySymbol)}
                </div>
                <div className="text-[11px] text-[#888888] mt-0.5">
                  Uncollected AR: {formatMoney(engineRow.uncollectedARBase, config.baseCurrencySymbol)}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
                  Direct Costs
                </span>
                <div className="font-heading text-xl font-bold text-[#051C2C]">
                  {formatMoney(engineRow.directCostBase, config.baseCurrencySymbol)}
                </div>
                <div className="text-[11px] text-[#888888] mt-0.5">
                  Unpaid AP: {formatMoney(engineRow.unpaidAPBase, config.baseCurrencySymbol)}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
                  Order Gross Profit
                </span>
                <div
                  className={`font-heading text-xl font-bold ${
                    engineRow.grossProfitBase < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                  }`}
                >
                  {formatMoney(engineRow.grossProfitBase, config.baseCurrencySymbol)}
                </div>
                <div className="text-[11px] text-[#888888] mt-0.5">
                  Margin: <span className="font-semibold text-[#051C2C]">{formatPercent(engineRow.grossMarginPct)}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
                  Rev / PAX
                </span>
                <div className="font-heading text-xl font-bold text-[#051C2C]">
                  {formatMoney(engineRow.revPerPaxBase, config.baseCurrencySymbol)}
                </div>
                <div className="text-[11px] text-[#888888] mt-0.5 flex items-center gap-1">
                  <User className="w-3 h-3 text-[#888888]" />
                  <span>Rep: {booking.salesRep}</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Sales Invoices */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase font-semibold text-[#051C2C] tracking-label flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Sales Invoices (AR) — {linkedInvoices.length} billings</span>
              </h4>
              <span className="text-xs font-mono font-semibold text-[#051C2C]">
                Total: {formatMoney(engineRow?.salesRevenueBase, config.baseCurrencySymbol)}
              </span>
            </div>
            {linkedInvoices.length === 0 ? (
              <div className="p-3 rounded-lg bg-[rgba(211,47,47,0.06)] text-[#D32F2F] text-xs font-medium">
                ⚠️ No sales invoice recorded yet for this booking. Revenue is unbilled!
              </div>
            ) : (
              <div className="border border-[#E8E8E6] rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label">
                    <tr>
                      <th className="px-3 py-2">Invoice ID</th>
                      <th className="px-3 py-2">Issue / Due Date</th>
                      <th className="px-3 py-2 text-right">Original Amount</th>
                      <th className="px-3 py-2 text-right">Base Amount</th>
                      <th className="px-3 py-2 text-right">Collected</th>
                      <th className="px-3 py-2 text-right">Remaining AR</th>
                      <th className="px-3 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6]">
                    {linkedInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#F5F5F2]">
                        <td className="px-3 py-2 font-mono font-medium">{inv.id}</td>
                        <td className="px-3 py-2 text-[#888888]">{inv.invoiceDate} → {inv.dueDate}</td>
                        <td className="px-3 py-2 text-right font-mono font-medium">
                          {inv.currency} {inv.originalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-medium text-[#051C2C]">
                          {formatMoney(inv.baseAmount, config.baseCurrencySymbol)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-[#051C2C]">
                          {inv.currency} {inv.collectedOriginal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-semibold text-[#2251FF]">
                          {formatMoney(inv.uncollectedBase, config.baseCurrencySymbol)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <StatusBadge status={inv.statusText} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 2: Supplier Bills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase font-semibold text-[#051C2C] tracking-label flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Supplier Direct Cost Bills (AP) — {linkedBills.length} items</span>
              </h4>
              <span className="text-xs font-mono font-semibold text-[#051C2C]">
                Total: {formatMoney(engineRow?.directCostBase, config.baseCurrencySymbol)}
              </span>
            </div>
            {linkedBills.length === 0 ? (
              <div className="p-3 rounded-lg bg-[rgba(211,47,47,0.06)] text-[#D32F2F] text-xs font-medium">
                ⚠️ No direct cost bills registered for this booking. Profit may be overstated!
              </div>
            ) : (
              <div className="border border-[#E8E8E6] rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label">
                    <tr>
                      <th className="px-3 py-2">Bill ID</th>
                      <th className="px-3 py-2">Supplier & Category</th>
                      <th className="px-3 py-2 text-right">Original Amount</th>
                      <th className="px-3 py-2 text-right">Base Cost</th>
                      <th className="px-3 py-2 text-right">Paid</th>
                      <th className="px-3 py-2 text-right">Remaining AP</th>
                      <th className="px-3 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6]">
                    {linkedBills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-[#F5F5F2]">
                        <td className="px-3 py-2 font-mono font-medium">{bill.id}</td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-[#051C2C]">{bill.supplier}</div>
                          <div className="text-[11px] text-[#888888]">{bill.category}</div>
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-medium">
                          {bill.currency} {bill.originalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-medium text-[#051C2C]">
                          {formatMoney(bill.baseAmount, config.baseCurrencySymbol)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-[#051C2C]">
                          {bill.currency} {bill.paidOriginal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-semibold text-[#2251FF]">
                          {formatMoney(bill.unpaidBase, config.baseCurrencySymbol)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <StatusBadge status={bill.statusText} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 3: Cash Flow Payments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase font-semibold text-[#051C2C] tracking-label flex items-center gap-1.5">
                <ArrowDownRight className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Associated Payment Transactions — {linkedPayments.length} entries</span>
              </h4>
            </div>
            {linkedPayments.length === 0 ? (
              <div className="p-3 rounded-lg bg-[#F5F5F2] text-[#888888] text-xs">
                No cash transactions settled yet for this booking.
              </div>
            ) : (
              <div className="border border-[#E8E8E6] rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label">
                    <tr>
                      <th className="px-3 py-2">Payment ID</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Document</th>
                      <th className="px-3 py-2">Method</th>
                      <th className="px-3 py-2 text-right">Original Amount</th>
                      <th className="px-3 py-2 text-right">Base Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6]">
                    {linkedPayments.map((pmt) => {
                      const isReceipt = pmt.type === config.receiptTypeLabel;
                      return (
                        <tr key={pmt.id} className="hover:bg-[#F5F5F2]">
                          <td className="px-3 py-2 font-mono font-medium">{pmt.id}</td>
                          <td className="px-3 py-2 text-[#888888]">{pmt.paymentDate}</td>
                          <td className="px-3 py-2 font-medium">
                            <span className="flex items-center gap-1">
                              {isReceipt ? (
                                <ArrowDownRight className="w-3.5 h-3.5 text-[#2251FF]" />
                              ) : (
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
                              )}
                              <span>{pmt.type}</span>
                            </span>
                          </td>
                          <td className="px-3 py-2 font-mono">{pmt.docId}</td>
                          <td className="px-3 py-2 text-[#888888]">{pmt.method}</td>
                          <td className="px-3 py-2 text-right font-mono font-medium">
                            {pmt.currency} {pmt.originalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-semibold text-[#051C2C]">
                            {formatMoney(pmt.baseAmount, config.baseCurrencySymbol)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E8E6] bg-[#F5F5F2] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#051C2C] hover:bg-[#082a42] transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
