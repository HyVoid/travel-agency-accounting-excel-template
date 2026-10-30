/**
 * CSV Import & Export Utilities
 * RT Vacations Balkan
 */

import {
  Booking,
  CurrencyCode,
  DirectCostCategory,
  ExpenseCategory,
  OperatingExpense,
  PaymentRecord,
  PaymentType,
  SalesInvoice,
  SupplierBill,
  TourType,
} from '../types';

/**
 * Basic RFC 4180 compliant CSV parser
 */
export function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let curr = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        curr += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        curr += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(curr.trim());
        curr = '';
      } else if (char === '\r') {
        // ignore carriage return
      } else if (char === '\n') {
        row.push(curr.trim());
        if (row.some((cell) => cell.length > 0)) {
          lines.push(row);
        }
        row = [];
        curr = '';
      } else {
        curr += char;
      }
    }
  }

  if (curr.length > 0 || row.length > 0) {
    row.push(curr.trim());
    if (row.some((cell) => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

export function escapeCSVCell(val: unknown): string {
  if (val == null) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportArrayToCSV(headers: string[], rows: unknown[][], filename: string): void {
  const csvContent =
    headers.map(escapeCSVCell).join(',') +
    '\n' +
    rows.map((row) => row.map(escapeCSVCell).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('download', filename);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

// ── CSV Templates & Parsers for specific tables ──

export const CSV_TEMPLATES: Record<
  string,
  { name: string; headers: string[]; sampleRow: string[] }
> = {
  bookings: {
    name: '02_Booking_Register',
    headers: [
      'Booking ID',
      'Booking Date',
      'Tour Type',
      'B2B Client Name',
      'Destination',
      'Travel Start Date',
      'Return Date',
      'PAX',
      'Sales Rep',
      'Status',
      'Notes',
    ],
    sampleRow: [
      'BK-2026-101',
      '2026-05-10',
      'Group',
      'Balkan Discovery Tours (Vienna)',
      'Sarajevo Historic & Cultural',
      '2026-06-12',
      '2026-06-16',
      '22',
      'Emir Hadzic',
      'Confirmed',
      'Sample imported booking note',
    ],
  },
  invoices: {
    name: '03_Sales_Invoices',
    headers: [
      'Invoice ID',
      'Booking ID',
      'Invoice Date',
      'Due Date',
      'Currency',
      'Original Amount',
      'Locked FX Rate',
      'Notes',
    ],
    sampleRow: [
      'INV-2026-101',
      'BK-2026-101',
      '2026-05-15',
      '2026-06-01',
      'EUR',
      '24500.00',
      '',
      'Standard 30-day invoice',
    ],
  },
  bills: {
    name: '04_Supplier_Bills',
    headers: [
      'Supplier Bill ID',
      'Booking ID',
      'Supplier Name',
      'Cost Category',
      'Bill Date',
      'Due Date',
      'Currency',
      'Original Amount',
      'Locked FX Rate',
      'Notes',
    ],
    sampleRow: [
      'BILL-2026-101',
      'BK-2026-101',
      'Hotel Europe Sarajevo',
      'Hotel',
      '2026-06-16',
      '2026-07-05',
      'BAM',
      '18200.00',
      '',
      '4 nights accommodation',
    ],
  },
  payments: {
    name: '05_Payment_Register',
    headers: [
      'Payment ID',
      'Payment Date',
      'Transaction Type',
      'Linked Document ID',
      'Payment Method',
      'Currency',
      'Original Amount',
      'Locked FX Rate',
      'Notes',
    ],
    sampleRow: [
      'PMT-2026-101',
      '2026-05-25',
      'Customer Receipt',
      'INV-2026-101',
      'UniCredit EUR',
      'EUR',
      '10000.00',
      '',
      'Deposit payment via wire transfer',
    ],
  },
  expenses: {
    name: '06_Operating_Expenses',
    headers: [
      'Expense ID',
      'Expense Date',
      'Category',
      'Description',
      'Currency',
      'Original Amount',
      'Locked FX Rate',
      'Payment Status',
      'Notes',
    ],
    sampleRow: [
      'OPEX-2026-101',
      '2026-06-25',
      'Office Rent',
      'Sarajevo HQ Rent June',
      'BAM',
      '3200.00',
      '',
      'Paid',
      'Monthly office lease',
    ],
  },
};

export function parseBookingsCSV(rows: string[][]): Booking[] {
  if (rows.length < 2) return [];
  // Skip header row
  return rows.slice(1).map((r, idx) => ({
    id: r[0] || `BK-${Date.now()}-${idx + 1}`,
    bookingDate: r[1] || new Date().toISOString().split('T')[0],
    tourType: (r[2] === 'FIT' ? 'FIT' : 'Group') as TourType,
    client: r[3] || 'Unassigned Client',
    destination: r[4] || 'Sarajevo Historic & Cultural',
    travelDate: r[5] || new Date().toISOString().split('T')[0],
    returnDate: r[6] || r[5] || new Date().toISOString().split('T')[0],
    pax: parseInt(r[7], 10) || 1,
    salesRep: r[8] || 'Emir Hadzic',
    status: (r[9] as Booking['status']) || 'Confirmed',
    notes: r[10] || '',
  }));
}

export function parseInvoicesCSV(rows: string[][]): SalesInvoice[] {
  if (rows.length < 2) return [];
  return rows.slice(1).map((r, idx) => ({
    id: r[0] || `INV-${Date.now()}-${idx + 1}`,
    bookingId: r[1] || '',
    invoiceDate: r[2] || new Date().toISOString().split('T')[0],
    dueDate: r[3] || new Date().toISOString().split('T')[0],
    currency: (r[4] as CurrencyCode) || 'EUR',
    originalAmount: parseFloat(r[5]) || 0,
    lockedFxRate: r[6] ? parseFloat(r[6]) : null,
    notes: r[7] || '',
  }));
}

export function parseBillsCSV(rows: string[][]): SupplierBill[] {
  if (rows.length < 2) return [];
  return rows.slice(1).map((r, idx) => ({
    id: r[0] || `BILL-${Date.now()}-${idx + 1}`,
    bookingId: r[1] || '',
    supplier: r[2] || 'Hotel Europe Sarajevo',
    category: (r[3] as DirectCostCategory) || 'Hotel',
    billDate: r[4] || new Date().toISOString().split('T')[0],
    dueDate: r[5] || new Date().toISOString().split('T')[0],
    currency: (r[6] as CurrencyCode) || 'BAM',
    originalAmount: parseFloat(r[7]) || 0,
    lockedFxRate: r[8] ? parseFloat(r[8]) : null,
    notes: r[9] || '',
  }));
}

export function parsePaymentsCSV(rows: string[][]): PaymentRecord[] {
  if (rows.length < 2) return [];
  return rows.slice(1).map((r, idx) => ({
    id: r[0] || `PMT-${Date.now()}-${idx + 1}`,
    paymentDate: r[1] || new Date().toISOString().split('T')[0],
    type: (r[2] === 'Supplier Payment' ? 'Supplier Payment' : 'Customer Receipt') as PaymentType,
    docId: r[3] || '',
    method: r[4] || 'UniCredit EUR',
    currency: (r[5] as CurrencyCode) || 'EUR',
    originalAmount: parseFloat(r[6]) || 0,
    lockedFxRate: r[7] ? parseFloat(r[7]) : null,
    notes: r[8] || '',
  }));
}

export function parseExpensesCSV(rows: string[][]): OperatingExpense[] {
  if (rows.length < 2) return [];
  return rows.slice(1).map((r, idx) => ({
    id: r[0] || `OPEX-${Date.now()}-${idx + 1}`,
    expenseDate: r[1] || new Date().toISOString().split('T')[0],
    category: (r[2] as ExpenseCategory) || 'Office Rent',
    description: r[3] || '',
    currency: (r[4] as CurrencyCode) || 'BAM',
    originalAmount: parseFloat(r[5]) || 0,
    lockedFxRate: r[6] ? parseFloat(r[6]) : null,
    status: r[7] === 'Unpaid' ? 'Unpaid' : 'Paid',
    notes: r[8] || '',
  }));
}
