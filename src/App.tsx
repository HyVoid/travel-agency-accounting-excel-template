/**
 * RT Vacations Balkan - B2B Travel Finance & Order Profit Management System
 * Main SaaS Application Entry Point (Sidebar Layout)
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ActiveTab,
  AppState,
  Booking,
  OperatingExpense,
  PaymentRecord,
  SalesInvoice,
  SupplierBill,
  SystemConfig,
} from './types';
import {
  computeCalculatedExpenses,
  computeCalculatedInvoices,
  computeCalculatedPayments,
  computeCalculatedSupplierBills,
  computeEngineRows,
} from './utils/calculations';
import {
  exportBackupJSON,
  importBackupJSON,
  loadStateFromStorage,
  resetToSampleData,
  saveStateToStorage,
} from './utils/storage';

// Components & Modals
import { Sidebar } from './components/Sidebar';
import { BulkCsvModal } from './components/BulkCsvModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { BookingDrilldownModal } from './components/BookingDrilldownModal';

// Views
import { DashboardView } from './views/DashboardView';
import { CalculationEngineView } from './views/CalculationEngineView';
import { BookingsView } from './views/BookingsView';
import { InvoicesView } from './views/InvoicesView';
import { SupplierBillsView } from './views/SupplierBillsView';
import { PaymentsView } from './views/PaymentsView';
import { ExpensesView } from './views/ExpensesView';
import { SetupView } from './views/SetupView';

import { Menu, Compass } from 'lucide-react';

export default function App() {
  // Load initial state from storage or default seed data
  const [appState, setAppState] = useState<AppState>(() => loadStateFromStorage());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [lastSavedTime, setLastSavedTime] = useState<string>(appState.lastSaved);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals
  const [isBulkCsvOpen, setIsBulkCsvOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [drilldownBookingId, setDrilldownBookingId] = useState<string | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Auto-save to localStorage whenever appState changes
  useEffect(() => {
    const now = new Date().toISOString();
    setLastSavedTime(now);
    saveStateToStorage({
      ...appState,
      lastSaved: now,
    });
  }, [appState]);

  // ── Reactive Real-Time Calculations (Zero Lag Propagation) ──
  const calculatedInvoices = useMemo(() => {
    return computeCalculatedInvoices(
      appState.invoices,
      appState.bookings,
      appState.payments,
      appState.config
    );
  }, [appState.invoices, appState.bookings, appState.payments, appState.config]);

  const calculatedBills = useMemo(() => {
    return computeCalculatedSupplierBills(
      appState.bills,
      appState.bookings,
      appState.payments,
      appState.config
    );
  }, [appState.bills, appState.bookings, appState.payments, appState.config]);

  const calculatedPayments = useMemo(() => {
    return computeCalculatedPayments(
      appState.payments,
      appState.invoices,
      appState.bills,
      appState.config
    );
  }, [appState.payments, appState.invoices, appState.bills, appState.config]);

  const calculatedExpenses = useMemo(() => {
    return computeCalculatedExpenses(appState.expenses, appState.config);
  }, [appState.expenses, appState.config]);

  const engineRows = useMemo(() => {
    return computeEngineRows(
      appState.bookings,
      calculatedInvoices,
      calculatedBills,
      appState.config
    );
  }, [appState.bookings, calculatedInvoices, calculatedBills, appState.config]);

  // Selected Booking for drilldown modal
  const selectedBooking = useMemo(() => {
    if (!drilldownBookingId) return undefined;
    return appState.bookings.find((b) => b.id === drilldownBookingId);
  }, [drilldownBookingId, appState.bookings]);

  const selectedEngineRow = useMemo(() => {
    if (!drilldownBookingId) return undefined;
    return engineRows.find((r) => r.bookingId === drilldownBookingId);
  }, [drilldownBookingId, engineRows]);

  // ── State Mutation Handlers ──

  // Config
  const handleUpdateConfig = useCallback((updated: Partial<SystemConfig>) => {
    setAppState((prev) => ({
      ...prev,
      config: { ...prev.config, ...updated },
    }));
  }, []);

  // Bookings
  const handleAddBooking = useCallback((booking: Booking) => {
    setAppState((prev) => ({
      ...prev,
      bookings: [booking, ...prev.bookings],
    }));
    showToast(`Booking ${booking.id} registered.`);
  }, [showToast]);

  const handleUpdateBooking = useCallback((id: string, updated: Partial<Booking>) => {
    setAppState((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  }, []);

  const handleDeleteBooking = useCallback((id: string) => {
    setAppState((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    }));
    showToast(`Booking ${id} deleted.`);
  }, [showToast]);

  // Invoices
  const handleAddInvoice = useCallback((invoice: SalesInvoice) => {
    setAppState((prev) => ({
      ...prev,
      invoices: [invoice, ...prev.invoices],
    }));
    showToast(`Invoice ${invoice.id} recorded.`);
  }, [showToast]);

  const handleUpdateInvoice = useCallback((id: string, updated: Partial<SalesInvoice>) => {
    setAppState((prev) => ({
      ...prev,
      invoices: prev.invoices.map((i) => (i.id === id ? { ...i, ...updated } : i)),
    }));
  }, []);

  const handleDeleteInvoice = useCallback((id: string) => {
    setAppState((prev) => ({
      ...prev,
      invoices: prev.invoices.filter((i) => i.id !== id),
    }));
    showToast(`Invoice ${id} deleted.`);
  }, [showToast]);

  // Supplier Bills
  const handleAddBill = useCallback((bill: SupplierBill) => {
    setAppState((prev) => ({
      ...prev,
      bills: [bill, ...prev.bills],
    }));
    showToast(`Supplier Bill ${bill.id} recorded.`);
  }, [showToast]);

  const handleUpdateBill = useCallback((id: string, updated: Partial<SupplierBill>) => {
    setAppState((prev) => ({
      ...prev,
      bills: prev.bills.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  }, []);

  const handleDeleteBill = useCallback((id: string) => {
    setAppState((prev) => ({
      ...prev,
      bills: prev.bills.filter((b) => b.id !== id),
    }));
    showToast(`Supplier Bill ${id} deleted.`);
  }, [showToast]);

  // Payments
  const handleAddPayment = useCallback((payment: PaymentRecord) => {
    setAppState((prev) => ({
      ...prev,
      payments: [payment, ...prev.payments],
    }));
    showToast(`Payment ${payment.id} logged.`);
  }, [showToast]);

  const handleUpdatePayment = useCallback((id: string, updated: Partial<PaymentRecord>) => {
    setAppState((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  }, []);

  const handleDeletePayment = useCallback((id: string) => {
    setAppState((prev) => ({
      ...prev,
      payments: prev.payments.filter((p) => p.id !== id),
    }));
    showToast(`Payment ${id} removed.`);
  }, [showToast]);

  // Operating Expenses
  const handleAddExpense = useCallback((expense: OperatingExpense) => {
    setAppState((prev) => ({
      ...prev,
      expenses: [expense, ...prev.expenses],
    }));
    showToast(`Expense ${expense.id} logged.`);
  }, [showToast]);

  const handleUpdateExpense = useCallback((id: string, updated: Partial<OperatingExpense>) => {
    setAppState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  }, []);

  const handleDeleteExpense = useCallback((id: string) => {
    setAppState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
    showToast(`Expense ${id} deleted.`);
  }, [showToast]);

  // Bulk CSV Imports
  const handleImportBookings = useCallback((data: Booking[], mode: 'append' | 'replace') => {
    setAppState((prev) => ({
      ...prev,
      bookings: mode === 'replace' ? data : [...data, ...prev.bookings],
    }));
    showToast(`Imported ${data.length} bookings successfully.`);
  }, [showToast]);

  const handleImportInvoices = useCallback((data: SalesInvoice[], mode: 'append' | 'replace') => {
    setAppState((prev) => ({
      ...prev,
      invoices: mode === 'replace' ? data : [...data, ...prev.invoices],
    }));
    showToast(`Imported ${data.length} invoices successfully.`);
  }, [showToast]);

  const handleImportBills = useCallback((data: SupplierBill[], mode: 'append' | 'replace') => {
    setAppState((prev) => ({
      ...prev,
      bills: mode === 'replace' ? data : [...data, ...prev.bills],
    }));
    showToast(`Imported ${data.length} supplier bills successfully.`);
  }, [showToast]);

  const handleImportPayments = useCallback((data: PaymentRecord[], mode: 'append' | 'replace') => {
    setAppState((prev) => ({
      ...prev,
      payments: mode === 'replace' ? data : [...data, ...prev.payments],
    }));
    showToast(`Imported ${data.length} payments successfully.`);
  }, [showToast]);

  const handleImportExpenses = useCallback((data: OperatingExpense[], mode: 'append' | 'replace') => {
    setAppState((prev) => ({
      ...prev,
      expenses: mode === 'replace' ? data : [...data, ...prev.expenses],
    }));
    showToast(`Imported ${data.length} expenses successfully.`);
  }, [showToast]);

  // Backup & Restore
  const handleExportBackup = useCallback(() => {
    exportBackupJSON(appState);
    showToast('Exported complete JSON backup.');
  }, [appState, showToast]);

  const handleImportBackup = useCallback((file: File) => {
    importBackupJSON(
      file,
      (importedState) => {
        setAppState(importedState);
        showToast('Backup restored successfully!');
      },
      (error) => {
        alert(error);
      }
    );
  }, [showToast]);

  const handleConfirmReset = useCallback(() => {
    const fresh = resetToSampleData();
    setAppState(fresh);
    showToast('Restored default Balkan B2B dataset (FY 2026).');
  }, [showToast]);

  return (
    <div className="min-h-screen flex bg-[#F5F5F2] text-[#1A1A2E]">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        config={appState.config}
        lastSaved={lastSavedTime}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
        onResetData={() => setIsResetConfirmOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (visible only on small screens) */}
        <header className="lg:hidden h-[56px] bg-white border-b border-[#E8E8E6] px-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_3px_rgba(5,28,44,0.06)]">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1.5 text-[#051C2C] hover:bg-[#F5F5F2] rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#051C2C] flex items-center justify-center text-white">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-sm text-[#051C2C]">
              RT Vacations
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[#051C2C] font-semibold">
            {appState.config.baseCurrency}
          </span>
        </header>

        {/* View Content (max-w-[1400px] centered with 40px left/right padding) */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              engineRows={engineRows}
              invoices={calculatedInvoices}
              bills={calculatedBills}
              payments={calculatedPayments}
              expenses={calculatedExpenses}
              config={appState.config}
              onNavigateToTab={setActiveTab}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'engine' && (
            <CalculationEngineView
              engineRows={engineRows}
              config={appState.config}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingsView
              bookings={appState.bookings}
              config={appState.config}
              onUpdateBooking={handleUpdateBooking}
              onAddBooking={handleAddBooking}
              onDeleteBooking={handleDeleteBooking}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'invoices' && (
            <InvoicesView
              invoices={calculatedInvoices}
              bookings={appState.bookings}
              config={appState.config}
              onUpdateInvoice={handleUpdateInvoice}
              onAddInvoice={handleAddInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'bills' && (
            <SupplierBillsView
              bills={calculatedBills}
              bookings={appState.bookings}
              config={appState.config}
              onUpdateBill={handleUpdateBill}
              onAddBill={handleAddBill}
              onDeleteBill={handleDeleteBill}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsView
              payments={calculatedPayments}
              invoices={appState.invoices}
              bills={appState.bills}
              config={appState.config}
              onUpdatePayment={handleUpdatePayment}
              onAddPayment={handleAddPayment}
              onDeletePayment={handleDeletePayment}
              onSelectBooking={setDrilldownBookingId}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpensesView
              expenses={calculatedExpenses}
              config={appState.config}
              onUpdateExpense={handleUpdateExpense}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          )}

          {activeTab === 'setup' && (
            <SetupView
              config={appState.config}
              onUpdateConfig={handleUpdateConfig}
            />
          )}
        </main>

        {/* Page Footer & Privacy Disclaimer */}
        <footer className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-6 border-t border-[#E8E8E6] text-center text-xs text-[#888888]">
          <p>
            Data privacy note: All data and storage features operate strictly within your browser's local storage. This application does not store, transmit, or retain any user or financial data on external servers.
          </p>
          <p className="mt-1 text-[11px] text-[#888888]/80">
            RT Vacations Balkan • B2B Tour Operator Accounting & Yield Management Platform
          </p>
        </footer>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-[#051C2C] text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-[#00C853]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Booking Drilldown Dossier Modal */}
      <BookingDrilldownModal
        bookingId={drilldownBookingId}
        onClose={() => setDrilldownBookingId(null)}
        booking={selectedBooking}
        engineRow={selectedEngineRow}
        invoices={calculatedInvoices}
        bills={calculatedBills}
        payments={calculatedPayments}
        config={appState.config}
      />

      {/* Bulk CSV Modal */}
      <BulkCsvModal
        isOpen={isBulkCsvOpen}
        onClose={() => setIsBulkCsvOpen(false)}
        onImportBookings={handleImportBookings}
        onImportInvoices={handleImportInvoices}
        onImportBills={handleImportBills}
        onImportPayments={handleImportPayments}
        onImportExpenses={handleImportExpenses}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
