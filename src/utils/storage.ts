/**
 * LocalStorage & Backup/Restore Utilities
 * RT Vacations Balkan
 */

import { getInitialData } from '../data/initialData';
import { AppState } from '../types';

const STORAGE_KEY = 'rt_vacations_balkan_data_v1';

export function loadStateFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialData();
      saveStateToStorage(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.config || !parsed.bookings || !parsed.invoices) {
      const initial = getInitialData();
      saveStateToStorage(initial);
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to parse state from localStorage, falling back to seed data:', err);
    const initial = getInitialData();
    saveStateToStorage(initial);
    return initial;
  }
}

export function saveStateToStorage(state: AppState): void {
  try {
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
