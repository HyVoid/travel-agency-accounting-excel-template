import React from 'react';
import {
  CalculatedInvoice,
  CalculatedOrderEngineRow,
  CalculatedSupplierBill,
  SystemConfig,
} from '../types';
import {
  computeClientRankings,
  computeDestinationRankings,
  computeGlobalKPIs,
  computeMonthlyDashboard,
  computeSalesRepRankings,
  formatMoney,
  formatPercent,
} from '../utils/calculations';
import { KPICards } from '../components/KPICards';
import { DataBar } from '../components/DataBar';
import { StatusBadge } from '../components/StatusBadge';
import { InsightBlock } from '../components/InsightBlock';
import { CalculatedPayment, CalculatedExpense } from '../types';
import { MapPin, Users, Award } from 'lucide-react';

interface DashboardViewProps {
  engineRows: CalculatedOrderEngineRow[];
  invoices: CalculatedInvoice[];
  bills: CalculatedSupplierBill[];
  payments: CalculatedPayment[];
  expenses: CalculatedExpense[];
  config: SystemConfig;
  onNavigateToTab: (tab: any) => void;
  onSelectBooking: (bookingId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  engineRows,
  invoices,
  bills,
  payments,
  expenses,
  config,
  onNavigateToTab,
}) => {
  const symbol = config.baseCurrencySymbol;
  const monthlyRows = computeMonthlyDashboard(
    config.analysisYear,
    engineRows,
    payments,
    expenses,
    config
  );
  const kpis = computeGlobalKPIs(monthlyRows, invoices, bills, config);
  const destinations = computeDestinationRankings(engineRows);
  const clients = computeClientRankings(engineRows, config);
  const salesReps = computeSalesRepRankings(engineRows);

  const maxMonthRev = Math.max(...monthlyRows.map((m) => m.salesRevenue), 1);
  const maxDestRev = Math.max(...destinations.map((d) => d.revenue), 1);
  const maxClientRev = Math.max(...clients.map((c) => c.revenue), 1);
  const maxRepRev = Math.max(...salesReps.map((r) => r.revenue), 1);

  // Compute strategic insight narrative
  const topDest = destinations[0];
  const totalOverdueInvoices = invoices.filter((i) => i.isOverdue);
  const overdueARAmount = totalOverdueInvoices.reduce(
    (sum, i) => sum + i.uncollectedBase,
    0
  );
  const totalNetCashFlow = monthlyRows.reduce(
    (sum, m) => sum + m.netCashFlow,
    0
  );
  const cashVsProfitDiff = totalNetCashFlow - kpis.annualNetOperatingProfit;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 08 • Executive Cockpit
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            B2B Financial & Operating Dashboard (FY {config.analysisYear})
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#888888]">
            As of Reference Date: <strong className="text-[#051C2C]">{config.referenceDate}</strong>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards kpis={kpis} symbol={symbol} />

      {/* Strategic Insight Block */}
      <InsightBlock
        title="Executive Management Commentary & Working Capital Audit"
        actionText="Inspect Profit Engine"
        onActionClick={() => onNavigateToTab('engine')}
      >
        <p>
          • <strong>Product Line Star:</strong>{' '}
          {topDest ? (
            <>
              <strong>{topDest.destination}</strong> generates{' '}
              {formatMoney(topDest.revenue, symbol, 0)} ({formatPercent(topDest.grossMarginPct)} gross margin), leading overall profitability across the Western Balkans.
            </>
          ) : (
            'Awaiting active booking volume.'
          )}
        </p>
        <p className="mt-1">
          • <strong>Working Capital & Cash vs. Accrual Divergence:</strong>{' '}
          Annual net cash inflow stands at{' '}
          <strong>{formatMoney(totalNetCashFlow, symbol, 0)}</strong> compared to{' '}
          <strong>{formatMoney(kpis.annualNetOperatingProfit, symbol, 0)}</strong> accounting operating profit (variance of{' '}
          {formatMoney(cashVsProfitDiff, symbol, 0)} due to client credit terms and advance supplier disbursements).
          {overdueARAmount > 0 ? (
            <span className="text-[#D32F2F] font-semibold ml-1">
              Currently {totalOverdueInvoices.length} invoices are past due totaling {formatMoney(overdueARAmount, symbol, 0)} requiring collections intervention.
            </span>
          ) : (
            <span className="text-[#051C2C] ml-1">
              All client accounts are currently within agreed payment credit terms.
            </span>
          )}
        </p>
      </InsightBlock>

      {/* Monthly Performance & Cash Flow Table */}
      <div className="card-surface-static p-6 bg-white overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#051C2C] tracking-heading">
              Monthly Operating Profit & Actual Cash Flow Summary (1–12 Months)
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">
              Accrual order profitability (by travel month) vs. actual cash flow (by bank settlement date).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#888888]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2251FF]" />
              <span>Revenue Volume</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#051C2C]" />
              <span>Target Baseline ({formatMoney(config.monthlyProfitTarget, symbol, 0)})</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs min-w-[980px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Month</th>
                <th className="py-2.5 px-3 text-right">Orders</th>
                <th className="py-2.5 px-3 text-right min-w-[140px]">Sales Revenue</th>
                <th className="py-2.5 px-3 text-right">Budget %</th>
                <th className="py-2.5 px-3 text-right">Direct Cost</th>
                <th className="py-2.5 px-3 text-right">Gross Profit</th>
                <th className="py-2.5 px-3 text-right">Margin %</th>
                <th className="py-2.5 px-3 text-right">OPEX</th>
                <th className="py-2.5 px-3 text-right">Operating Profit</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right min-w-[120px]">Net Cash Flow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {monthlyRows.map((row) => {
                const isLoss = row.netOperatingProfit < 0;
                return (
                  <tr
                    key={row.month}
                    className={`hover:bg-[#F5F5F2] transition-colors ${
                      row.orderCount === 0 && row.opex === 0 ? 'text-[#888888]' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-medium font-mono text-[#051C2C]">
                      {row.monthName}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {row.orderCount > 0 ? row.orderCount : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {row.salesRevenue > 0 ? (
                        <DataBar
                          value={row.salesRevenue}
                          max={maxMonthRev}
                          formattedValue={formatMoney(row.salesRevenue, symbol, 0)}
                        />
                      ) : (
                        <span className="font-mono text-[#888888]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {row.salesRevenue > 0 ? (
                        <span
                          className={
                            row.budgetAchievementPct >= 1 ? 'font-semibold text-[#051C2C]' : 'text-[#888888]'
                          }
                        >
                          {formatPercent(row.budgetAchievementPct)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {row.directCost > 0 ? formatMoney(row.directCost, symbol, 0) : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-[#051C2C]">
                      {row.grossProfit !== 0 ? formatMoney(row.grossProfit, symbol, 0) : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {row.salesRevenue > 0 ? formatPercent(row.grossMarginPct) : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#888888]">
                      {row.opex > 0 ? formatMoney(row.opex, symbol, 0) : '—'}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono font-semibold ${
                        isLoss ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                      }`}
                    >
                      {row.orderCount > 0 || row.opex > 0
                        ? formatMoney(row.netOperatingProfit, symbol, 0)
                        : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {row.orderCount > 0 || row.opex > 0 ? (
                        <StatusBadge status={row.profitTargetStatus} />
                      ) : (
                        <span className="text-[#888888] text-[11px]">No Activity</span>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono font-semibold ${
                        row.netCashFlow < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                      }`}
                    >
                      {formatMoney(row.netCashFlow, symbol, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Summary Footer */}
            <tfoot className="bg-[#051C2C]/5 font-semibold text-[#051C2C] border-t-2 border-[#051C2C]/20">
              <tr>
                <td className="py-3 px-3 uppercase tracking-label text-[11px]">
                  FY Total ({config.analysisYear})
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {monthlyRows.reduce((sum, m) => sum + m.orderCount, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(kpis.annualSalesRevenue, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatPercent(kpis.annualSalesRevenue / (config.monthlyRevenueBudget * 12))}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(
                    monthlyRows.reduce((sum, m) => sum + m.directCost, 0),
                    symbol,
                    0
                  )}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(kpis.annualGrossProfit, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatPercent(kpis.annualGrossMarginPct)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(kpis.annualOpex, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#051C2C]">
                  {formatMoney(kpis.annualNetOperatingProfit, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge
                    status={
                      kpis.annualNetOperatingProfit >= config.monthlyProfitTarget * 12
                        ? 'Target Met'
                        : 'Below Target'
                    }
                  />
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#051C2C]">
                  {formatMoney(totalNetCashFlow, symbol, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Multi-Dimensional Ranking Grids (3 Columns / Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dimension 1: Destination Performance */}
        <div className="card-surface-static p-5 bg-white">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8E8E6] pb-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-heading text-base font-bold text-[#051C2C]">
                Destination Ranking
              </h3>
            </div>
            <span className="text-[11px] text-[#888888] font-mono">
              {destinations.length} routes
            </span>
          </div>
          <div className="space-y-3">
            {destinations.map((d) => (
              <div
                key={d.destination}
                className="interactive-cell p-2.5 rounded-lg border border-transparent hover:border-[#E8E8E6] bg-[#F5F5F2]/60"
              >
                <div className="flex items-center justify-between text-xs font-medium text-[#051C2C] mb-1">
                  <span className="truncate pr-2">{d.destination}</span>
                  <span className="font-mono text-[#888888] shrink-0">
                    {d.orderCount} tours
                  </span>
                </div>
                <DataBar
                  value={d.revenue}
                  max={maxDestRev}
                  formattedValue={`${formatMoney(d.revenue, symbol, 0)} (${formatPercent(d.grossMarginPct)} GP)`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 2: Client Volume & AR Credit Risk */}
        <div className="card-surface-static p-5 bg-white">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8E8E6] pb-2.5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-heading text-base font-bold text-[#051C2C]">
                B2B Clients & AR Risk
              </h3>
            </div>
            <span className="text-[11px] text-[#888888] font-mono">
              {clients.length} partners
            </span>
          </div>
          <div className="space-y-3">
            {clients.map((c) => (
              <div
                key={c.client}
                className="interactive-cell p-2.5 rounded-lg border border-transparent hover:border-[#E8E8E6] bg-[#F5F5F2]/60"
              >
                <div className="flex items-center justify-between text-xs font-medium text-[#051C2C] mb-1">
                  <span className="truncate pr-2">{c.client}</span>
                  <StatusBadge status={c.creditRisk} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#888888] mb-1 font-mono">
                  <span>Revenue: {formatMoney(c.revenue, symbol, 0)}</span>
                  <span>
                    AR Balance:{' '}
                    <strong
                      className={
                        c.arBalance > config.roundingTolerance ? 'text-[#2251FF]' : 'text-[#888888]'
                      }
                    >
                      {formatMoney(c.arBalance, symbol, 0)}
                    </strong>
                  </span>
                </div>
                <DataBar
                  value={c.revenue}
                  max={maxClientRev}
                  showLabel={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 3: Sales Rep Performance */}
        <div className="card-surface-static p-5 bg-white">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8E8E6] pb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-heading text-base font-bold text-[#051C2C]">
                Sales Reps & Collection
              </h3>
            </div>
            <span className="text-[11px] text-[#888888] font-mono">
              {salesReps.length} reps
            </span>
          </div>
          <div className="space-y-3">
            {salesReps.map((r) => (
              <div
                key={r.salesRep}
                className="interactive-cell p-2.5 rounded-lg border border-transparent hover:border-[#E8E8E6] bg-[#F5F5F2]/60"
              >
                <div className="flex items-center justify-between text-xs font-medium text-[#051C2C] mb-1">
                  <span>{r.salesRep}</span>
                  <span className="font-mono text-[11px] text-[#888888]">
                    {r.orderCount} bookings
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#888888] mb-1 font-mono">
                  <span>Profit: {formatMoney(r.grossProfit, symbol, 0)}</span>
                  <span>Pending AR: {formatMoney(r.outstandingAR, symbol, 0)}</span>
                </div>
                <DataBar
                  value={r.revenue}
                  max={maxRepRev}
                  formattedValue={formatMoney(r.revenue, symbol, 0)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
