import React, { useState } from 'react';
import { CurrencyCode, SystemConfig } from '../types';
import { Settings, Coins, Sliders, ListFilter, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface SetupViewProps {
  config: SystemConfig;
  onUpdateConfig: (updated: Partial<SystemConfig>) => void;
}

export const SetupView: React.FC<SetupViewProps> = ({ config, onUpdateConfig }) => {
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Catalog item adder state
  const [activeCatalog, setActiveCatalog] = useState<keyof SystemConfig>('destinations');
  const [newCatalogItem, setNewCatalogItem] = useState('');

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleBaseCurrencyChange = (newCode: CurrencyCode) => {
    const symbolMap: Record<CurrencyCode, string> = {
      EUR: '€',
      BAM: 'KM',
      USD: '$',
    };
    onUpdateConfig({
      baseCurrency: newCode,
      baseCurrencySymbol: symbolMap[newCode] || '€',
    });
    triggerSaveNotification();
  };

  const handleCurrencyRateChange = (code: CurrencyCode, rate: number) => {
    const updatedCurrencies = config.currencies.map((c) =>
      c.code === code ? { ...c, defaultRate: rate } : c
    );
    onUpdateConfig({ currencies: updatedCurrencies });
    triggerSaveNotification();
  };

  const handleAddCatalogItem = () => {
    if (!newCatalogItem.trim()) return;
    const currentList = (config[activeCatalog] as string[]) || [];
    if (!currentList.includes(newCatalogItem.trim())) {
      onUpdateConfig({
        [activeCatalog]: [...currentList, newCatalogItem.trim()],
      });
      setNewCatalogItem('');
      triggerSaveNotification();
    }
  };

  const handleRemoveCatalogItem = (key: keyof SystemConfig, item: string) => {
    const currentList = (config[key] as string[]) || [];
    onUpdateConfig({
      [key]: currentList.filter((i) => i !== item),
    });
    triggerSaveNotification();
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 01 • Master Parameters & Lists
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Global Control Parameters & Master Dictionaries
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Single point of maintenance. Adjust base currencies, FX valuation rates, operational thresholds, and dropdown catalogues.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(0,200,83,0.08)] text-[#051C2C] text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
            <span>Parameters saved & propagated!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: System Control Parameters */}
        <div className="card-surface-static p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E6] pb-3">
            <Sliders className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-base font-bold text-[#051C2C]">
              Global System Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Base Currency */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Base Currency Code ($C$5)
              </label>
              <select
                value={config.baseCurrency}
                onChange={(e) =>
                  handleBaseCurrencyChange(e.target.value as CurrencyCode)
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono font-bold text-[#051C2C]"
              >
                <option value="EUR">EUR (€) — Euro Standard</option>
                <option value="BAM">BAM (KM) — Bosnian Convertible Mark</option>
                <option value="USD">USD ($) — US Dollar</option>
              </select>
            </div>

            {/* Base Currency Symbol */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Base Currency Symbol ($C$6)
              </label>
              <input
                type="text"
                value={config.baseCurrencySymbol}
                onChange={(e) => {
                  onUpdateConfig({ baseCurrencySymbol: e.target.value });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono font-bold"
              />
            </div>

            {/* Target Gross Margin */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Target Gross Margin ($C$7)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={config.targetGrossMarginPct}
                  onChange={(e) => {
                    onUpdateConfig({
                      targetGrossMarginPct: parseFloat(e.target.value) || 0,
                    });
                    triggerSaveNotification();
                  }}
                  className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
                />
                <span className="text-xs text-[#888888] font-mono shrink-0">
                  ({(config.targetGrossMarginPct * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Loss Redline */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Loss Redline Threshold ($C$8)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={config.lossRedlineMarginPct}
                  onChange={(e) => {
                    onUpdateConfig({
                      lossRedlineMarginPct: parseFloat(e.target.value) || 0,
                    });
                    triggerSaveNotification();
                  }}
                  className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
                />
                <span className="text-xs text-[#888888] font-mono shrink-0">
                  ({(config.lossRedlineMarginPct * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Due Soon Days */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Due Soon Alert Threshold ($C$9)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  value={config.dueSoonDays}
                  onChange={(e) => {
                    onUpdateConfig({
                      dueSoonDays: parseInt(e.target.value, 10) || 7,
                    });
                    triggerSaveNotification();
                  }}
                  className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
                />
                <span className="text-xs text-[#888888] shrink-0">days</span>
              </div>
            </div>

            {/* Rounding Tolerance */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Settlement Tolerance ($C$10)
              </label>
              <input
                type="number"
                step="0.001"
                value={config.roundingTolerance}
                onChange={(e) => {
                  onUpdateConfig({
                    roundingTolerance: parseFloat(e.target.value) || 0.01,
                  });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
              />
            </div>

            {/* Analysis Reference Date */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Analysis Reference Date ($C$11)
              </label>
              <input
                type="date"
                value={config.referenceDate}
                onChange={(e) => {
                  onUpdateConfig({ referenceDate: e.target.value });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
              />
            </div>

            {/* Analysis Year */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Analysis Fiscal Year ($C$12)
              </label>
              <input
                type="number"
                value={config.analysisYear}
                onChange={(e) => {
                  onUpdateConfig({
                    analysisYear: parseInt(e.target.value, 10) || 2026,
                  });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono font-bold"
              />
            </div>

            {/* Monthly Revenue Budget */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Monthly Revenue Budget ($C$13)
              </label>
              <input
                type="number"
                step="1000"
                value={config.monthlyRevenueBudget}
                onChange={(e) => {
                  onUpdateConfig({
                    monthlyRevenueBudget: parseFloat(e.target.value) || 0,
                  });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono text-right"
              />
            </div>

            {/* Monthly Profit Target */}
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Monthly Net Profit Target ($C$14)
              </label>
              <input
                type="number"
                step="500"
                value={config.monthlyProfitTarget}
                onChange={(e) => {
                  onUpdateConfig({
                    monthlyProfitTarget: parseFloat(e.target.value) || 0,
                  });
                  triggerSaveNotification();
                }}
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono text-right"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Multi-Currency Exchange Rates */}
        <div className="card-surface-static p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E6] pb-3">
            <Coins className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-base font-bold text-[#051C2C]">
              Multi-Currency Valuation Table ($F$5:$I$10)
            </h2>
          </div>

          <p className="text-xs text-[#888888]">
            Exchange rates express the value of 1.00 unit of original foreign currency in terms of your base currency ({config.baseCurrency}). The base currency's active rate is automatically forced to 1.000000.
          </p>

          <div className="border border-[#E8E8E6] rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label">
                <tr>
                  <th className="px-3 py-2">Code</th>
                  <th className="px-3 py-2">Currency Name</th>
                  <th className="px-3 py-2 text-right">Default Rate</th>
                  <th className="px-3 py-2 text-right bg-[#F5F5F2]">Effective Base FX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6]">
                {config.currencies.map((curr) => {
                  const isBase = curr.code === config.baseCurrency;
                  const effective = isBase ? 1.0 : curr.defaultRate;
                  return (
                    <tr key={curr.code} className="hover:bg-[#F5F5F2]">
                      <td className="px-3 py-2 font-mono font-bold text-[#051C2C]">
                        {curr.code} ({curr.symbol})
                      </td>
                      <td className="px-3 py-2 text-[#051C2C]">{curr.name}</td>
                      <td className="px-3 py-2 text-right font-mono">
                        {isBase ? (
                          <span className="text-[#888888]">1.000000 (Base)</span>
                        ) : (
                          <input
                            type="number"
                            step="0.000001"
                            value={curr.defaultRate}
                            onChange={(e) =>
                              handleCurrencyRateChange(
                                curr.code,
                                parseFloat(e.target.value) || 1
                              )
                            }
                            className="p-1 rounded border border-[#E8E8E6] font-mono text-right input-editable w-[110px]"
                          />
                        )}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold bg-[#F5F5F2] text-[#051C2C]">
                        {effective.toFixed(6)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-lg bg-[rgba(34,81,255,0.04)] border-l-[3px] border-[#2251FF] text-xs text-[#051C2C]/85">
            <strong>Historical FX Rate Protection:</strong> If a specific transaction has a manual locked rate entered in its respective ledger, that locked rate overrides this live table, preserving historical book value.
          </div>
        </div>
      </div>

      {/* Card 3: Master Data Catalogues (Dictionaries) */}
      <div className="card-surface-static p-6 bg-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E8E6] pb-3">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-base font-bold text-[#051C2C]">
              Standardized Dropdown Dictionaries ($K$4:$R$100)
            </h2>
          </div>
          <span className="text-xs text-[#888888]">
            Prevents misspelling and maintains relational data integrity across sheets
          </span>
        </div>

        {/* Dictionary Category Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { key: 'destinations', label: 'Destinations' },
            { key: 'b2bClients', label: 'B2B Clients' },
            { key: 'suppliers', label: 'Suppliers' },
            { key: 'directCostCategories', label: 'Direct Cost Categories' },
            { key: 'salesReps', label: 'Sales Reps' },
            { key: 'operatingExpenseCategories', label: 'OPEX Categories' },
            { key: 'tourTypes', label: 'Tour Types' },
            { key: 'bookingStatuses', label: 'Booking Statuses' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCatalog(cat.key as keyof SystemConfig)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCatalog === cat.key
                  ? 'bg-[#051C2C] text-white shadow-sm'
                  : 'bg-[#F5F5F2] text-[#051C2C] hover:bg-[#E8E8E6]'
              }`}
            >
              {cat.label} ({(config[cat.key as keyof SystemConfig] as string[])?.length || 0})
            </button>
          ))}
        </div>

        {/* Add item input */}
        <div className="flex items-center gap-2 max-w-md">
          <input
            type="text"
            value={newCatalogItem}
            onChange={(e) => setNewCatalogItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCatalogItem();
              }
            }}
            placeholder={`Add new entry to ${String(activeCatalog)}...`}
            className="flex-1 p-2 rounded-lg border border-[#E8E8E6] text-xs input-editable"
          />
          <button
            onClick={handleAddCatalogItem}
            className="px-3.5 py-2 rounded-lg bg-[#2251FF] hover:bg-[#1a41cc] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Active Catalog List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
          {((config[activeCatalog] as string[]) || []).map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-2 rounded-lg border border-[#E8E8E6] bg-[#F5F5F2]/50 hover:bg-white transition-colors text-xs"
            >
              <span className="truncate pr-2 font-medium text-[#051C2C]">{item}</span>
              <button
                onClick={() => handleRemoveCatalogItem(activeCatalog, item)}
                className="text-[#888888] hover:text-[#D32F2F] p-1 rounded"
                title="Remove item from dropdown dictionary"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
