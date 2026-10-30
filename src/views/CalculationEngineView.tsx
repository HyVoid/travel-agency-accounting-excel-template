import React, { useState, useMemo } from 'react';
import { CalculatedOrderEngineRow, SystemConfig } from '../types';
import { formatMoney, formatPercent } from '../utils/calculations';
import { StatusBadge } from '../components/StatusBadge';
import { exportArrayToCSV } from '../utils/csvHelper';
import {
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface CalculationEngineViewProps {
  engineRows: CalculatedOrderEngineRow[];
  config: SystemConfig;
  onSelectBooking: (bookingId: string) => void;
}

export const CalculationEngineView: React.FC<CalculationEngineViewProps> = ({
  engineRows,
  config,
  onSelectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');

  const symbol = config.baseCurrencySymbol;

  // Filter to active bookings only as per sheet 07 specification
  const activeRows = useMemo(
    () => engineRows.filter((r) => r.isActive),
    [engineRows]
  );

  const filteredRows = useMemo(() => {
    return activeRows.filter((r) => {
      const matchSearch =
        searchTerm === '' ||
        r.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.salesRep.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDiagnostic =
        selectedDiagnostic === 'all' || r.diagnostic === selectedDiagnostic;
      const matchDest =
        selectedDestination === 'all' || r.destination === selectedDestination;
      const matchClient =
        selectedClient === 'all' || r.client === selectedClient;

      return matchSearch && matchDiagnostic && matchDest && matchClient;
    });
  }, [
    activeRows,
    searchTerm,
    selectedDiagnostic,
    selectedDestination,
    selectedClient,
  ]);

  // Aggregate totals for the filtered subset
  const totals = useMemo(() => {
    const rev = filteredRows.reduce((sum, r) => sum + r.salesRevenueBase, 0);
    const cost = filteredRows.reduce((sum, r) => sum + r.directCostBase, 0);
    const profit = rev - cost;
    const margin = rev > 0 ? profit / rev : 0;
    const ar = filteredRows.reduce((sum, r) => sum + r.uncollectedARBase, 0);
    const ap = filteredRows.reduce((sum, r) => sum + r.unpaidAPBase, 0);
    const pax = filteredRows.reduce((sum, r) => sum + r.pax, 0);
    return { rev, cost, profit, margin, ar, ap, pax };
  }, [filteredRows]);

  const anomalyCount = activeRows.filter((r) => r.isAnomaly).length;

  const handleExportCSV = () => {
    const headers = [
      'Booking ID',
      'Tour Type',
      'B2B Client Name',
      'Destination',
      'Sales Rep',
      'Travel Month',
      'PAX',
      `Sales Revenue (${config.baseCurrency})`,
      `Direct Cost (${config.baseCurrency})`,
      `Gross Profit (${config.baseCurrency})`,
      'Gross Margin %',
      `Rev per PAX (${config.baseCurrency})`,
      `Collected (${config.baseCurrency})`,
      `Uncollected AR (${config.baseCurrency})`,
      `Unpaid AP (${config.baseCurrency})`,
      'Audit Diagnosis',
    ];

    const rows = filteredRows.map((r) => [
      r.bookingId,
      r.tourType,
      r.client,
      r.destination,
      r.salesRep,
      r.travelMonth,
      r.pax,
      r.salesRevenueBase,
      r.directCostBase,
      r.grossProfitBase,
      (r.grossMarginPct * 100).toFixed(1) + '%',
      r.revPerPaxBase,
      r.collectedBase,
      r.uncollectedARBase,
      r.unpaidAPBase,
      r.diagnostic,
    ]);

    exportArrayToCSV(headers, rows, '07_Calculation_Engine_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Title & Diagnostic Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 07 • Dynamic Calculation Engine
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Order Profitability & Audit Engine
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Zero-entry automated engine. Real-time aggregation of sales revenue, direct costs, order gross profit, and missing documentation diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {anomalyCount > 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(211,47,47,0.08)] text-[#D32F2F] text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{anomalyCount} orders require attention</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(0,200,83,0.08)] text-[#051C2C] text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
              <span>All active orders pass audit criteria</span>
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-semibold text-[#051C2C] hover:bg-[#F5F5F2] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export View</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card-surface-static p-4 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Booking ID, client, destination, or rep..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
            />
          </div>

          {/* Diagnostic Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#888888]" />
            <select
              value={selectedDiagnostic}
              onChange={(e) => setSelectedDiagnostic(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-medium text-[#051C2C]"
            >
              <option value="all">All Diagnostics ({activeRows.length})</option>
              <option value="Healthy / On Target">✅ Healthy / On Target</option>
              <option value="Below Target Margin">⚠️ Below Target Margin</option>
              <option value="Loss Warning">❌ Loss Warning</option>
              <option value="Missing Sales Invoice">❌ Missing Sales Invoice</option>
              <option value="Missing Supplier Cost">❌ Missing Supplier Cost</option>
            </select>
          </div>

          {/* Destination Filter */}
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg border border-[#E8E8E6] bg-white text-xs text-[#051C2C]"
          >
            <option value="all">All Destinations</option>
            {config.destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Client Filter */}
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg border border-[#E8E8E6] bg-white text-xs text-[#051C2C]"
          >
            <option value="all">All B2B Clients</option>
            {config.b2bClients.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-[#888888] font-mono">
          Showing <strong>{filteredRows.length}</strong> of {activeRows.length} active orders
        </div>
      </div>

      {/* Main Calculated Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1200px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Destination</th>
                <th className="py-2.5 px-3 text-center">Month</th>
                <th className="py-2.5 px-3 text-right">PAX</th>
                <th className="py-2.5 px-3 text-right min-w-[110px]">Sales Revenue</th>
                <th className="py-2.5 px-3 text-right min-w-[100px]">Direct Cost</th>
                <th className="py-2.5 px-3 text-right min-w-[100px]">Gross Profit</th>
                <th className="py-2.5 px-3 text-right">Margin %</th>
                <th className="py-2.5 px-3 text-right">Rev / PAX</th>
                <th className="py-2.5 px-3 text-right">Uncollected AR</th>
                <th className="py-2.5 px-3 text-right">Unpaid AP</th>
                <th className="py-2.5 px-3 text-center min-w-[160px]">Audit Health</th>
                <th className="py-2.5 px-3 text-center">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-12 text-center text-[#888888]">
                    No active orders match your criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const isLoss = row.grossProfitBase < 0;
                  return (
                    <tr
                      key={row.bookingId}
                      className={`hover:bg-[#F5F5F2] transition-colors ${
                        row.isAnomaly ? 'bg-[rgba(211,47,47,0.02)]' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-medium text-[#051C2C]">
                        <button
                          onClick={() => onSelectBooking(row.bookingId)}
                          className="hover:text-[#2251FF] hover:underline transition-colors"
                        >
                          {row.bookingId}
                        </button>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-[#051C2C] truncate max-w-[170px]">
                          {row.client}
                        </div>
                        <div className="text-[10px] text-[#888888]">{row.salesRep}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="truncate max-w-[160px]">{row.destination}</div>
                        <div className="text-[10px] text-[#888888]">{row.tourType}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-[#888888]">
                        {row.travelMonth}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {row.pax}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-[#051C2C]">
                        {formatMoney(row.salesRevenueBase, symbol, 0)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {formatMoney(row.directCostBase, symbol, 0)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-mono font-semibold ${
                          isLoss ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                        }`}
                      >
                        {formatMoney(row.grossProfitBase, symbol, 0)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-mono ${
                          row.grossMarginPct < config.targetGrossMarginPct
                            ? 'font-medium'
                            : 'font-semibold text-[#051C2C]'
                        }`}
                      >
                        {formatPercent(row.grossMarginPct)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#888888]">
                        {formatMoney(row.revPerPaxBase, symbol, 0)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-mono ${
                          row.uncollectedARBase > config.roundingTolerance
                            ? 'font-medium text-[#2251FF]'
                            : 'text-[#888888]'
                        }`}
                      >
                        {formatMoney(row.uncollectedARBase, symbol, 0)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-mono ${
                          row.unpaidAPBase > config.roundingTolerance
                            ? 'font-medium text-[#2251FF]'
                            : 'text-[#888888]'
                        }`}
                      >
                        {formatMoney(row.unpaidAPBase, symbol, 0)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <StatusBadge status={row.diagnostic} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => onSelectBooking(row.bookingId)}
                          className="p-1 rounded text-[#2251FF] hover:bg-[rgba(34,81,255,0.08)] transition-colors"
                          title="View 360° Financial Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {/* Filtered Subset Summary Footer */}
            <tfoot className="bg-[#051C2C]/5 font-semibold text-[#051C2C] border-t-2 border-[#051C2C]/20">
              <tr>
                <td colSpan={4} className="py-3 px-3 uppercase tracking-label text-[11px]">
                  Aggregated Summary ({filteredRows.length} orders)
                </td>
                <td className="py-3 px-3 text-right font-mono">{totals.pax}</td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(totals.rev, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(totals.cost, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatMoney(totals.profit, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {formatPercent(totals.margin)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#888888]">
                  {totals.pax > 0 ? formatMoney(totals.rev / totals.pax, symbol, 0) : '—'}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#2251FF]">
                  {formatMoney(totals.ar, symbol, 0)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#2251FF]">
                  {formatMoney(totals.ap, symbol, 0)}
                </td>
                <td colSpan={2} className="py-3 px-3 text-center text-[11px] text-[#888888]">
                  {anomalyCount} anomalies in register
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Audit Guide Note */}
      <div className="p-4 rounded-lg bg-white border border-[#E8E8E6] flex items-start gap-3 text-xs text-[#888888]">
        <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#051C2C]">Engine Diagnostic Criteria:</strong>{' '}
          Orders are flagged as <em>Missing Sales Invoice</em> if billed revenue is ≤ {config.roundingTolerance}; <em>Missing Supplier Cost</em> if registered direct cost is ≤ {config.roundingTolerance}; <em>Loss Warning</em> if gross margin &lt; {(config.lossRedlineMarginPct * 100).toFixed(0)}%; and <em>Below Target Margin</em> if gross margin &lt; {(config.targetGrossMarginPct * 100).toFixed(0)}%. Cancelled bookings are automatically excluded.
        </div>
      </div>
    </div>
  );
};
