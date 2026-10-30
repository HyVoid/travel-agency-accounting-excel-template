import React from 'react';
import { GlobalKPISummary, formatMoney, formatPercent } from '../utils/calculations';
import { Wallet, TrendingUp, Receipt, Building2, Scale, Coins } from 'lucide-react';

interface KPICardsProps {
  kpis: GlobalKPISummary;
  symbol: string;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpis, symbol }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {/* 1. Base Currency */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            Reporting Currency
          </span>
          <Coins className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div className="font-heading text-2xl font-bold text-[#051C2C] tracking-display">
          {kpis.baseCurrencyLabel}
        </div>
        <div className="mt-2 text-[11px] text-[#888888]">
          Global consolidated basis
        </div>
      </div>

      {/* 2. Annual Sales Revenue */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            Total Revenue
          </span>
          <TrendingUp className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display">
          {formatMoney(kpis.annualSalesRevenue, symbol, 0)}
        </div>
        <div className="mt-2 text-[11px] text-[#888888]">
          Aggregated client invoices
        </div>
      </div>

      {/* 3. Annual Gross Profit */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            Order Gross Profit
          </span>
          <Wallet className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display">
          {formatMoney(kpis.annualGrossProfit, symbol, 0)}
        </div>
        <div className="mt-2 text-[11px] text-[#888888] flex items-center justify-between">
          <span>Gross Margin:</span>
          <span className="font-semibold text-[#051C2C]">
            {formatPercent(kpis.annualGrossMarginPct)}
          </span>
        </div>
      </div>

      {/* 4. Operating Expenses */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            Annual OPEX
          </span>
          <Building2 className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display">
          {formatMoney(kpis.annualOpex, symbol, 0)}
        </div>
        <div className="mt-2 text-[11px] text-[#888888]">
          Rent, salaries & overhead
        </div>
      </div>

      {/* 5. Net Operating Profit */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            Net Operating Profit
          </span>
          <Receipt className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div
          className={`font-heading text-2xl sm:text-3xl font-bold tracking-display ${
            kpis.annualNetOperatingProfit < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
          }`}
        >
          {formatMoney(kpis.annualNetOperatingProfit, symbol, 0)}
        </div>
        <div className="mt-2 text-[11px] text-[#888888]">
          Order Profit − OPEX
        </div>
      </div>

      {/* 6. AR / AP Net Exposure */}
      <div className="card-surface p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#888888] mb-2">
          <span className="text-[11px] uppercase tracking-label font-semibold text-[#051C2C]/70">
            AR/AP Net Exposure
          </span>
          <Scale className="w-4 h-4 text-[#2251FF]" />
        </div>
        <div
          className={`font-heading text-2xl sm:text-3xl font-bold tracking-display ${
            kpis.globalNetExposure < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
          }`}
        >
          {formatMoney(kpis.globalNetExposure, symbol, 0)}
        </div>
        <div className="mt-2 text-[11px] text-[#888888] flex items-center justify-between">
          <span>AR {formatMoney(kpis.globalARBalance, symbol, 0)}</span>
          <span>AP {formatMoney(kpis.globalAPBalance, symbol, 0)}</span>
        </div>
      </div>
    </div>
  );
};
