/**
 * RT Vacations Balkan - B2B Travel Finance & Order Profit Management System
 * Core Data Models & Type Definitions
 */

export type CurrencyCode = 'EUR' | 'BAM' | 'USD';

export type TourType = 'FIT' | 'Group';

export type BookingStatus = 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';

export type DirectCostCategory =
  | 'Hotel'
  | 'Transport'
  | 'Tour Guide'
  | 'Meals & Tickets'
  | 'Other Direct Cost';

export type PaymentType = 'Customer Receipt' | 'Supplier Payment';

export type ExpenseCategory =
  | 'Office Rent'
  | 'Staff Salaries'
  | 'Marketing & Trade Shows'
  | 'Bank & FX Fees'
  | 'Software & IT'
  | 'General Admin';

export type ExpensePaymentStatus = 'Paid' | 'Unpaid';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  defaultRate: number; // Rate to 1 Base Currency (e.g., EUR to Base)
}

export interface SystemConfig {
  baseCurrency: CurrencyCode;
  baseCurrencySymbol: string;
  targetGrossMarginPct: number; // e.g. 0.25 (25%)
  lossRedlineMarginPct: number; // e.g. 0.00 (0%)
  dueSoonDays: number; // e.g. 7 days
  roundingTolerance: number; // e.g. 0.01
  referenceDate: string; // YYYY-MM-DD
  analysisYear: number; // e.g. 2026
  monthlyRevenueBudget: number; // e.g. 50000
  monthlyProfitTarget: number; // e.g. 10000
  excludedBookingStatus: BookingStatus; // 'Cancelled'
  receiptTypeLabel: string; // 'Customer Receipt'
  paymentTypeLabel: string; // 'Supplier Payment'

  // Exchange rate definitions
  currencies: CurrencyConfig[];

  // Master Data Catalogues
  tourTypes: string[];
  bookingStatuses: string[];
  destinations: string[];
  b2bClients: string[];
  suppliers: string[];
  directCostCategories: string[];
  salesReps: string[];
  operatingExpenseCategories: string[];
}

export interface Booking {
  id: string; // e.g., BK-2026-001
  bookingDate: string; // YYYY-MM-DD
  tourType: TourType;
  client: string;
  destination: string;
  travelDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  pax: number;
  salesRep: string;
  status: BookingStatus;
  notes?: string;
}

export interface SalesInvoice {
  id: string; // e.g., INV-2026-001
  bookingId: string;
  invoiceDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  currency: CurrencyCode;
  originalAmount: number;
  lockedFxRate?: number | null; // Optional locked rate
  notes?: string;
}

export interface SupplierBill {
  id: string; // e.g., BILL-2026-001
  bookingId: string;
  supplier: string;
  category: DirectCostCategory;
  billDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  currency: CurrencyCode;
  originalAmount: number;
  lockedFxRate?: number | null; // Optional locked rate
  notes?: string;
}

export interface PaymentRecord {
  id: string; // e.g., PMT-2026-001
  paymentDate: string; // YYYY-MM-DD
  type: PaymentType;
  docId: string; // Invoice ID or Bill ID
  method: string; // e.g. UniCredit EUR, Raiffeisen BAM, Cash
  currency: CurrencyCode;
  originalAmount: number;
  lockedFxRate?: number | null;
  notes?: string;
}

export interface OperatingExpense {
  id: string; // e.g., OPEX-2026-001
  expenseDate: string; // YYYY-MM-DD
  category: ExpenseCategory;
  description: string;
  currency: CurrencyCode;
  originalAmount: number;
  lockedFxRate?: number | null;
  status: ExpensePaymentStatus;
  notes?: string;
}

export interface AppState {
  config: SystemConfig;
  bookings: Booking[];
  invoices: SalesInvoice[];
  bills: SupplierBill[];
  payments: PaymentRecord[];
  expenses: OperatingExpense[];
  lastSaved: string; // ISO string
}

// ── Computed / Virtual View Models ──

export type InvoiceSettlementStatus =
  | 'Settled'
  | 'Overcollected'
  | 'Overdue Unpaid'
  | 'Due Soon'
  | 'Normal Pending';

export interface CalculatedInvoice extends SalesInvoice {
  clientName: string;
  effectiveFxRate: number;
  baseAmount: number;
  collectedOriginal: number;
  uncollectedOriginal: number;
  uncollectedBase: number;
  statusText: InvoiceSettlementStatus;
  invoiceMonth: string; // YYYY-MM
  isOverdue: boolean;
  isDueSoon: boolean;
}

export type BillSettlementStatus =
  | 'Settled'
  | 'Overpaid'
  | 'Overdue Unpaid'
  | 'Due Soon'
  | 'Normal Pending';

export interface CalculatedSupplierBill extends SupplierBill {
  isValidBooking: boolean;
  destination: string;
  effectiveFxRate: number;
  baseAmount: number;
  paidOriginal: number;
  unpaidOriginal: number;
  unpaidBase: number;
  statusText: BillSettlementStatus;
  billMonth: string; // YYYY-MM
  isOverdue: boolean;
  isDueSoon: boolean;
}

export interface CalculatedPayment extends PaymentRecord {
  linkedBookingId: string;
  currencyMatches: boolean;
  effectiveFxRate: number;
  baseAmount: number;
  paymentMonth: string; // YYYY-MM
}

export interface CalculatedExpense extends OperatingExpense {
  effectiveFxRate: number;
  baseAmount: number;
  expenseMonth: string; // YYYY-MM
}

export type OrderDiagnostic =
  | 'Missing Sales Invoice'
  | 'Missing Supplier Cost'
  | 'Loss Warning'
  | 'Below Target Margin'
  | 'Healthy / On Target';

export interface CalculatedOrderEngineRow {
  bookingId: string;
  tourType: TourType;
  client: string;
  destination: string;
  salesRep: string;
  travelMonth: string; // YYYY-MM
  pax: number;
  durationDays: number;
  bookingStatus: BookingStatus;
  isActive: boolean;
  isDuplicateId: boolean;

  // Aggregated financials in base currency
  salesRevenueBase: number;
  directCostBase: number;
  grossProfitBase: number;
  grossMarginPct: number;
  revPerPaxBase: number;
  collectedBase: number;
  uncollectedARBase: number;
  unpaidAPBase: number;

  diagnostic: OrderDiagnostic;
  isAnomaly: boolean;
}

export interface MonthlyDashboardRow {
  month: string; // YYYY-MM
  monthName: string; // Jan, Feb...
  orderCount: number;
  salesRevenue: number;
  budgetAchievementPct: number;
  directCost: number;
  grossProfit: number;
  grossMarginPct: number;
  opex: number;
  netOperatingProfit: number;
  profitTargetStatus: 'Target Met' | 'Below Target' | 'Operating Loss';
  netCashFlow: number;
  customerReceipts: number;
  supplierPayments: number;
  paidOpex: number;
}

export interface DestinationPerformance {
  destination: string;
  orderCount: number;
  revenue: number;
  grossProfit: number;
  grossMarginPct: number;
}

export interface ClientPerformance {
  client: string;
  revenue: number;
  grossProfit: number;
  arBalance: number;
  collectionRatePct: number;
  creditRisk: 'Fully Settled' | 'Partial Pending' | 'High Risk AR';
}

export interface SalesRepPerformance {
  salesRep: string;
  orderCount: number;
  revenue: number;
  grossProfit: number;
  outstandingAR: number;
}

export type ActiveTab =
  | 'dashboard'
  | 'engine'
  | 'bookings'
  | 'invoices'
  | 'bills'
  | 'payments'
  | 'expenses'
  | 'setup';
