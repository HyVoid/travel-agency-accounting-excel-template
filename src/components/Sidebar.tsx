import React, { useRef } from 'react';
import { ActiveTab, SystemConfig } from '../types';
import {
  LayoutDashboard,
  Calculator,
  CalendarDays,
  FileText,
  Receipt,
  ArrowDownUp,
  Building2,
  Sliders,
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  Compass,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  config: SystemConfig;
  lastSaved: string;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenBulkCsv: () => void;
  onResetData: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  config,
  lastSaved,
  onExportBackup,
  onImportBackup,
  onOpenBulkCsv,
  onResetData,
  isOpenMobile,
  onCloseMobile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navSections = [
    {
      group: 'OVERVIEW & AUDIT',
      items: [
        { id: 'dashboard' as ActiveTab, label: 'Executive Dashboard', code: '08', icon: LayoutDashboard },
        { id: 'engine' as ActiveTab, label: 'Profit Engine', code: '07', icon: Calculator },
      ],
    },
    {
      group: 'TRANSACTIONS & LEDGERS',
      items: [
        { id: 'bookings' as ActiveTab, label: 'Tour Bookings', code: '02', icon: CalendarDays },
        { id: 'invoices' as ActiveTab, label: 'Sales Invoices (AR)', code: '03', icon: FileText },
        { id: 'bills' as ActiveTab, label: 'Supplier Bills (AP)', code: '04', icon: Receipt },
        { id: 'payments' as ActiveTab, label: 'Cash Payments', code: '05', icon: ArrowDownUp },
        { id: 'expenses' as ActiveTab, label: 'Operating OPEX', code: '06', icon: Building2 },
      ],
    },
    {
      group: 'MASTER CONFIGURATION',
      items: [
        { id: 'setup' as ActiveTab, label: 'Setup & Lists', code: '01', icon: Sliders },
      ],
    },
  ];

  const formatSavedTime = (isoString: string): string => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-[#051C2C]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E8E8E6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#051C2C] flex items-center justify-center text-white shadow-sm shrink-0">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base text-[#051C2C] tracking-tight">
                RT Vacations
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[#051C2C] font-semibold">
                {config.baseCurrency}
              </span>
            </div>
            <div className="text-[10px] text-[#888888] tracking-wider uppercase -mt-0.5">
              Balkan B2B Accounting
            </div>
          </div>
        </div>

        {/* Close button on mobile */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-[#888888] hover:text-[#051C2C] rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.group} className="space-y-1">
            <div className="px-3 text-[10px] uppercase font-semibold text-[#888888] tracking-label">
              {section.group}
            </div>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[#051C2C] font-semibold shadow-xs border-l-[3px] border-[#2251FF]'
                        : 'text-[#051C2C]/70 hover:bg-[#F5F5F2] hover:text-[#051C2C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#2251FF]' : 'text-[#888888]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#2251FF] text-white font-semibold'
                          : 'bg-[rgba(5,28,44,0.05)] text-[#888888]'
                      }`}
                    >
                      {item.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Actions & Storage Panel */}
      <div className="p-4 border-t border-[#E8E8E6] bg-[#F5F5F2]/50 space-y-3">
        {/* Last Saved Badge */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white border border-[#E8E8E6] text-[11px] text-[#051C2C]">
          <span className="text-[#888888]">Auto-Saved:</span>
          <div className="flex items-center gap-1.5 font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
            <span>{formatSavedTime(lastSaved)}</span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={onExportBackup}
            title="Export Full JSON Backup"
            className="px-2.5 py-1.5 rounded-md bg-white border border-[#E8E8E6] text-[11px] font-medium text-[#051C2C] hover:bg-[#F5F5F2] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import JSON Backup"
            className="px-2.5 py-1.5 rounded-md bg-white border border-[#E8E8E6] text-[11px] font-medium text-[#051C2C] hover:bg-[#F5F5F2] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={onOpenBulkCsv}
            title="Bulk CSV Import"
            className="px-2.5 py-1.5 rounded-md bg-white border border-[#E8E8E6] text-[11px] font-medium text-[#051C2C] hover:bg-[#F5F5F2] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Bulk CSV</span>
          </button>

          <button
            onClick={onResetData}
            title="Reset to Initial Balkan Sample Dataset"
            className="px-2.5 py-1.5 rounded-md bg-white border border-[#E8E8E6] text-[11px] font-medium text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] transition-colors flex items-center justify-center gap-1 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sticky Sidebar */}
      <aside className="hidden lg:flex w-[260px] min-w-[260px] h-screen sticky top-0 border-r border-[#E8E8E6] z-30 shadow-[1px_0_3px_rgba(5,28,44,0.04)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[rgba(5,28,44,0.4)] backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-[280px] max-w-[80vw] h-full shadow-2xl z-10 animate-fade-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
