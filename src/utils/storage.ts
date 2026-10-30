/**
 * LocalStorage & Backup/Restore Utilities
 * RT Vacations Balkan
 */

import { getInitialData } from '../data/initialData';
import { AppState } from '../types';

const STORAGE_KEY = 'rt_vacations_balkan_data_v1';

export function loadStateFromStorage(): AppState {
  const initial = getInitialData();
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) {
      saveStateToStorage(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      saveStateToStorage(initial);
      return initial;
    }

    // Defensive merge to guarantee all required arrays and nested configs exist
    const mergedState: AppState = {
      config: {
        ...initial.config,
        ...(parsed.config || {}),
        currencies:
          Array.isArray(parsed.config?.currencies) && parsed.config.currencies.length > 0
            ? parsed.config.currencies
            : initial.config.currencies,
        tourTypes: Array.isArray(parsed.config?.tourTypes)
          ? parsed.config.tourTypes
          : initial.config.tourTypes,
        bookingStatuses: Array.isArray(parsed.config?.bookingStatuses)
          ? parsed.config.bookingStatuses
          : initial.config.bookingStatuses,
        destinations: Array.isArray(parsed.config?.destinations)
          ? parsed.config.destinations
          : initial.config.destinations,
        b2bClients: Array.isArray(parsed.config?.b2bClients)
          ? parsed.config.b2bClients
          : initial.config.b2bClients,
        suppliers: Array.isArray(parsed.config?.suppliers)
          ? parsed.config.suppliers
          : initial.config.suppliers,
        directCostCategories: Array.isArray(parsed.config?.directCostCategories)
          ? parsed.config.directCostCategories
          : initial.config.directCostCategories,
        salesReps: Array.isArray(parsed.config?.salesReps)
          ? parsed.config.salesReps
          : initial.config.salesReps,
        operatingExpenseCategories: Array.isArray(parsed.config?.operatingExpenseCategories)
          ? parsed.config.operatingExpenseCategories
          : initial.config.operatingExpenseCategories,
      },
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : initial.bookings,
      invoices: Array.isArray(parsed.invoices) ? parsed.invoices : initial.invoices,
      bills: Array.isArray(parsed.bills) ? parsed.bills : initial.bills,
      payments: Array.isArray(parsed.payments) ? parsed.payments : initial.payments,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : initial.expenses,
      lastSaved: parsed.lastSaved || initial.lastSaved,
    };

    return mergedState;
  } catch (err) {
    console.error('Failed to parse state from localStorage, falling back to seed data:', err);
    saveStateToStorage(initial);
    return initial;
  }
}

export function saveStateToStorage(state: AppState): void {
  try {
    if (typeof window === 'undefined') return;
    const toSave: AppState = {
      ...state,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function exportBackupJSON(state: AppState): void {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute(
    'download',
    `rt_vacations_balkan_backup_${dateStr}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importBackupJSON(
  file: File,
  onSuccess: (state: AppState) => void,
  onError: (msg: string) => void
): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content) as AppState;
      if (!parsed.config || !Array.isArray(parsed.bookings)) {
        onError('Invalid backup file format: missing configuration or bookings array.');
        return;
      }
      saveStateToStorage(parsed);
      onSuccess(parsed);
    } catch {
      onError('Failed to parse backup JSON file. Please ensure it is a valid RT Vacations backup.');
    }
  };
  reader.onerror = () => {
    onError('Error reading uploaded file.');
  };
  reader.readAsText(file);
}

export function resetToSampleData(): AppState {
  const initial = getInitialData();
  saveStateToStorage(initial);
  return initial;
}
