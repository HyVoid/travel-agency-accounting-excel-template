/**
 * Real-time Financial Calculation Engine & Diagnostic Formulas
 * RT Vacations Balkan
 */

import {
  Booking,
  CalculatedExpense,
  CalculatedInvoice,
  CalculatedOrderEngineRow,
  CalculatedPayment,
  CalculatedSupplierBill,
  ClientPerformance,
  CurrencyCode,
  DestinationPerformance,
  InvoiceSettlementStatus,
  MonthlyDashboardRow,
  OperatingExpense,
  PaymentRecord,
  SalesInvoice,
  SalesRepPerformance,
  SupplierBill,
  SystemConfig,
} from '../types';

/**
 * Round to 2 decimal places with financial precision
 */
export function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculate effective exchange rate to base currency
 */
export function getEffectiveFxRate(
  currency: CurrencyCode,
  lockedRate: number | null | undefined,
  config: SystemConfig
): number {
  if (currency === config.baseCurrency) {
    return 1.0;
  }
  if (lockedRate != null && lockedRate > 0) {
    return lockedRate;
  }
  const match = config.currencies.find((c) => c.code === currency);
  return match ? match.defaultRate : 1.0;
}

/**
 * Difference in calendar days between two YYYY-MM-DD dates + 1
 */
export function calculateTripDurationDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

/**
 * Extract YYYY-MM from date string
 */
export function getMonthString(dateStr: string): string {
  if (!dateStr || dateStr.length < 7) return '';
  return dateStr.substring(0, 7);
}

/**
 * Check if a due date is within N days after reference date
 */
function isDateWithinDays(dueDateStr: string, refDateStr: string, days: number): boolean {
  if (!dueDateStr || !refDateStr) return false;
  const due = new Date(dueDateStr).getTime();
  const ref = new Date(refDateStr).getTime();
  const diffMs = due - ref;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}

/**
 * Compute calculated sales invoices with real-time links to payments and bookings
 */
export function computeCalculatedInvoices(
  invoices: SalesInvoice[],
  bookings: Booking[],
  payments: PaymentRecord[],
  config: SystemConfig
): CalculatedInvoice[] {
  const bookingMap = new Map<string, Booking>();
  bookings.forEach((b) => bookingMap.set(b.id, b));

  return invoices.map((inv) => {
    const booking = bookingMap.get(inv.bookingId);
    const clientName = booking ? booking.client : '⚠️ Invalid Booking ID';
    const effectiveFxRate = getEffectiveFxRate(inv.currency, inv.lockedFxRate, config);
    const baseAmount = round2(inv.originalAmount * effectiveFxRate);

    // Sum receipts for this invoice
    const collectedOriginal = payments
      .filter(
        (p) =>
          p.docId === inv.id &&
          p.type === config.receiptTypeLabel
      )
      .reduce((sum, p) => sum + p.originalAmount, 0);

    const uncollectedOriginal = round2(inv.originalAmount - collectedOriginal);
    const uncollectedBase = round2(uncollectedOriginal * effectiveFxRate);

    const isOverdue =
      inv.dueDate < config.referenceDate &&
      uncollectedOriginal > config.roundingTolerance;
    const isDueSoon =
      !isOverdue &&
      uncollectedOriginal > config.roundingTolerance &&
      isDateWithinDays(inv.dueDate, config.referenceDate, config.dueSoonDays);

    let statusText: InvoiceSettlementStatus = 'Normal Pending';
    if (uncollectedOriginal < -config.roundingTolerance) {
      statusText = 'Overcollected';
    } else if (Math.abs(uncollectedOriginal) <= config.roundingTolerance) {
      statusText = 'Settled';
    } else if (isOverdue) {
      statusText = 'Overdue Unpaid';
    } else if (isDueSoon) {
      statusText = 'Due Soon';
    } else {
      statusText = 'Normal Pending';
    }

    return {
      ...inv,
      clientName,
      effectiveFxRate,
      baseAmount,
      collectedOriginal,
      uncollectedOriginal,
      uncollectedBase,
      statusText,
      invoiceMonth: getMonthString(inv.invoiceDate),
      isOverdue,
      isDueSoon,
    };
  });
}

/**
 * Compute calculated supplier bills with real-time links to payments and bookings
 */
export function computeCalculatedSupplierBills(
  bills: SupplierBill[],
  bookings: Booking[],
  payments: PaymentRecord[],
  config: SystemConfig
): CalculatedSupplierBill[] {
  const bookingMap = new Map<string, Booking>();
  bookings.forEach((b) => bookingMap.set(b.id, b));

  return bills.map((bill) => {
    const booking = bookingMap.get(bill.bookingId);
    const isValidBooking = Boolean(booking);
    const destination = booking ? booking.destination : '⚠️ Invalid Booking ID';
    const effectiveFxRate = getEffectiveFxRate(bill.currency, bill.lockedFxRate, config);
    const baseAmount = round2(bill.originalAmount * effectiveFxRate);

    // Sum supplier payments for this bill
    const paidOriginal = payments
      .filter(
        (p) =>
          p.docId === bill.id &&
          p.type === config.paymentTypeLabel
      )
      .reduce((sum, p) => sum + p.originalAmount, 0);

    const unpaidOriginal = round2(bill.originalAmount - paidOriginal);
    const unpaidBase = round2(unpaidOriginal * effectiveFxRate);

    const isOverdue =
      bill.dueDate < config.referenceDate &&
      unpaidOriginal > config.roundingTolerance;
    const isDueSoon =
      !isOverdue &&
      unpaidOriginal > config.roundingTolerance &&
      isDateWithinDays(bill.dueDate, config.referenceDate, config.dueSoonDays);

    let statusText: CalculatedSupplierBill['statusText'] = 'Normal Pending';
    if (unpaidOriginal < -config.roundingTolerance) {
      statusText = 'Overpaid';
    } else if (Math.abs(unpaidOriginal) <= config.roundingTolerance) {
      statusText = 'Settled';
    } else if (isOverdue) {
      statusText = 'Overdue Unpaid';
    } else if (isDueSoon) {
      statusText = 'Due Soon';
    } else {
      statusText = 'Normal Pending';
    }

    return {
      ...bill,
      isValidBooking,
      destination,
      effectiveFxRate,
      baseAmount,
      paidOriginal,
      unpaidOriginal,
      unpaidBase,
      statusText,
      billMonth: getMonthString(bill.billDate),
      isOverdue,
      isDueSoon,
    };
  });
}

/**
 * Compute calculated payments with document verification
 */
export function computeCalculatedPayments(
  payments: PaymentRecord[],
  invoices: SalesInvoice[],
  bills: SupplierBill[],
  config: SystemConfig
): CalculatedPayment[] {
  const invMap = new Map<string, SalesInvoice>();
  invoices.forEach((i) => invMap.set(i.id, i));

  const billMap = new Map<string, SupplierBill>();
  bills.forEach((b) => billMap.set(b.id, b));

  return payments.map((pmt) => {
    let linkedBookingId = '⚠️ Document Not Found';
    let targetCurrency: CurrencyCode | null = null;

    if (pmt.type === config.receiptTypeLabel) {
      const inv = invMap.get(pmt.docId);
      if (inv) {
        linkedBookingId = inv.bookingId;
        targetCurrency = inv.currency;
      }
    } else {
      const bill = billMap.get(pmt.docId);
      if (bill) {
        linkedBookingId = bill.bookingId;
        targetCurrency = bill.currency;
      }
    }

    const currencyMatches = targetCurrency ? targetCurrency === pmt.currency : false;
    const effectiveFxRate = getEffectiveFxRate(pmt.currency, pmt.lockedFxRate, config);
    const baseAmount = round2(pmt.originalAmount * effectiveFxRate);

    return {
      ...pmt,
      linkedBookingId,
      currencyMatches,
      effectiveFxRate,
      baseAmount,
      paymentMonth: getMonthString(pmt.paymentDate),
    };
  });
}

/**
 * Compute calculated OPEX
 */
export function computeCalculatedExpenses(
  expenses: OperatingExpense[],
  config: SystemConfig
): CalculatedExpense[] {
  return expenses.map((exp) => {
    const effectiveFxRate = getEffectiveFxRate(exp.currency, exp.lockedFxRate, config);
    const baseAmount = round2(exp.originalAmount * effectiveFxRate);
    return {
      ...exp,
      effectiveFxRate,
      baseAmount,
      expenseMonth: getMonthString(exp.expenseDate),
    };
  });
}

/**
 * Compute 07_Calculation_Engine dynamic rows for all valid bookings
 */
export function computeEngineRows(
  bookings: Booking[],
  calculatedInvoices: CalculatedInvoice[],
  calculatedBills: CalculatedSupplierBill[],
  config: SystemConfig
): CalculatedOrderEngineRow[] {
  const idCounts = new Map<string, number>();
  bookings.forEach((b) => {
    idCounts.set(b.id, (idCounts.get(b.id) || 0) + 1);
  });

  return bookings.map((b) => {
    const isActive = b.status !== config.excludedBookingStatus;
    const isDuplicateId = (idCounts.get(b.id) || 0) > 1;
    const travelMonth = getMonthString(b.travelDate);
    const durationDays = calculateTripDurationDays(b.travelDate, b.returnDate);

    // Sum revenue from invoices for this booking
    const matchingInvoices = calculatedInvoices.filter((i) => i.bookingId === b.id);
    const salesRevenueBase = round2(
      matchingInvoices.reduce((sum, i) => sum + i.baseAmount, 0)
    );
    const uncollectedARBase = round2(
      matchingInvoices.reduce((sum, i) => sum + i.uncollectedBase, 0)
    );
    const collectedBase = round2(salesRevenueBase - uncollectedARBase);

    // Sum direct costs from supplier bills for this booking
    const matchingBills = calculatedBills.filter((bill) => bill.bookingId === b.id);
    const directCostBase = round2(
      matchingBills.reduce((sum, bill) => sum + bill.baseAmount, 0)
    );
    const unpaidAPBase = round2(
      matchingBills.reduce((sum, bill) => sum + bill.unpaidBase, 0)
    );

    const grossProfitBase = round2(salesRevenueBase - directCostBase);
    const grossMarginPct =
      salesRevenueBase > 0 ? round2(grossProfitBase / salesRevenueBase) : 0;
    const revPerPaxBase = b.pax > 0 ? round2(salesRevenueBase / b.pax) : 0;

    // Diagnostic logic
    let diagnostic: CalculatedOrderEngineRow['diagnostic'] = 'Healthy / On Target';
    if (salesRevenueBase <= config.roundingTolerance) {
      diagnostic = 'Missing Sales Invoice';
    } else if (directCostBase <= config.roundingTolerance) {
      diagnostic = 'Missing Supplier Cost';
    } else if (grossMarginPct < config.lossRedlineMarginPct) {
      diagnostic = 'Loss Warning';
    } else if (grossMarginPct < config.targetGrossMarginPct) {
      diagnostic = 'Below Target Margin';
    } else {
      diagnostic = 'Healthy / On Target';
    }

    const isAnomaly = diagnostic !== 'Healthy / On Target';

    return {
      bookingId: b.id,
      tourType: b.tourType,
      client: b.client,
      destination: b.destination,
      salesRep: b.salesRep,
      travelMonth,
      pax: b.pax,
      durationDays,
      bookingStatus: b.status,
      isActive,
      isDuplicateId,
      salesRevenueBase,
      directCostBase,
      grossProfitBase,
      grossMarginPct,
      revPerPaxBase,
      collectedBase,
      uncollectedARBase,
      unpaidAPBase,
      diagnostic,
      isAnomaly,
    };
  });
}

/**
 * Compute 1-12 Months Executive Dashboard Rows
 */
export function computeMonthlyDashboard(
  year: number,
  engineRows: CalculatedOrderEngineRow[],
  calculatedPayments: CalculatedPayment[],
  calculatedExpenses: CalculatedExpense[],
  config: SystemConfig
): MonthlyDashboardRow[] {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return Array.from({ length: 12 }, (_, i) => {
    const monthNum = String(i + 1).padStart(2, '0');
    const monthStr = `${year}-${monthNum}`;
    const monthName = `${monthNames[i]} ${year}`;

    // Filter active bookings whose travel month falls in this month
    const monthBookings = engineRows.filter(
      (r) => r.isActive && r.travelMonth === monthStr
    );

    const orderCount = monthBookings.length;
    const salesRevenue = round2(
      monthBookings.reduce((sum, r) => sum + r.salesRevenueBase, 0)
    );
    const directCost = round2(
      monthBookings.reduce((sum, r) => sum + r.directCostBase, 0)
    );
    const grossProfit = round2(salesRevenue - directCost);
    const grossMarginPct =
      salesRevenue > 0 ? round2(grossProfit / salesRevenue) : 0;
    const budgetAchievementPct =
      config.monthlyRevenueBudget > 0
        ? round2(salesRevenue / config.monthlyRevenueBudget)
        : 0;

    // Operating expenses in this month
    const monthExpenses = calculatedExpenses.filter(
      (e) => e.expenseMonth === monthStr
    );
    const opex = round2(monthExpenses.reduce((sum, e) => sum + e.baseAmount, 0));
    const paidOpex = round2(
      monthExpenses
        .filter((e) => e.status === 'Paid')
        .reduce((sum, e) => sum + e.baseAmount, 0)
    );

    const netOperatingProfit = round2(grossProfit - opex);

    let profitTargetStatus: MonthlyDashboardRow['profitTargetStatus'] = 'Below Target';
    if (netOperatingProfit < 0) {
      profitTargetStatus = 'Operating Loss';
    } else if (netOperatingProfit >= config.monthlyProfitTarget) {
      profitTargetStatus = 'Target Met';
    } else {
      profitTargetStatus = 'Below Target';
    }

    // Actual Cash flow in this month (Cash-in minus Cash-out)
    const monthPayments = calculatedPayments.filter(
      (p) => p.paymentMonth === monthStr
    );
    const customerReceipts = round2(
      monthPayments
        .filter((p) => p.type === config.receiptTypeLabel)
        .reduce((sum, p) => sum + p.baseAmount, 0)
    );
    const supplierPayments = round2(
      monthPayments
        .filter((p) => p.type === config.paymentTypeLabel)
        .reduce((sum, p) => sum + p.baseAmount, 0)
    );

    const netCashFlow = round2(customerReceipts - supplierPayments - paidOpex);

    return {
      month: monthStr,
      monthName,
      orderCount,
      salesRevenue,
      budgetAchievementPct,
      directCost,
      grossProfit,
      grossMarginPct,
      opex,
      netOperatingProfit,
      profitTargetStatus,
      netCashFlow,
      customerReceipts,
      supplierPayments,
      paidOpex,
    };
  });
}

/**
 * Breakdown by Destination
 */
export function computeDestinationRankings(
  engineRows: CalculatedOrderEngineRow[]
): DestinationPerformance[] {
  const activeRows = engineRows.filter((r) => r.isActive && r.destination);
  const map = new Map<string, { orderCount: number; revenue: number; grossProfit: number }>();

  activeRows.forEach((r) => {
    const curr = map.get(r.destination) || { orderCount: 0, revenue: 0, grossProfit: 0 };
    curr.orderCount += 1;
    curr.revenue = round2(curr.revenue + r.salesRevenueBase);
    curr.grossProfit = round2(curr.grossProfit + r.grossProfitBase);
    map.set(r.destination, curr);
  });

  const list: DestinationPerformance[] = [];
  map.forEach((val, destination) => {
    const grossMarginPct = val.revenue > 0 ? round2(val.grossProfit / val.revenue) : 0;
    list.push({
      destination,
      orderCount: val.orderCount,
      revenue: val.revenue,
      grossProfit: val.grossProfit,
      grossMarginPct,
    });
  });

  return list.sort((a, b) => b.revenue - a.revenue);
}

/**
 * Breakdown by B2B Customer
 */
export function computeClientRankings(
  engineRows: CalculatedOrderEngineRow[],
  config: SystemConfig
): ClientPerformance[] {
  const activeRows = engineRows.filter((r) => r.isActive && r.client);
  const map = new Map<
    string,
    { revenue: number; grossProfit: number; arBalance: number }
  >();

  activeRows.forEach((r) => {
    const curr = map.get(r.client) || { revenue: 0, grossProfit: 0, arBalance: 0 };
    curr.revenue = round2(curr.revenue + r.salesRevenueBase);
    curr.grossProfit = round2(curr.grossProfit + r.grossProfitBase);
    curr.arBalance = round2(curr.arBalance + r.uncollectedARBase);
    map.set(r.client, curr);
  });

  const list: ClientPerformance[] = [];
  map.forEach((val, client) => {
    const collectionRatePct =
      val.revenue > 0 ? round2((val.revenue - val.arBalance) / val.revenue) : 1;

    let creditRisk: ClientPerformance['creditRisk'] = 'Fully Settled';
    if (val.arBalance <= config.roundingTolerance) {
      creditRisk = 'Fully Settled';
    } else if (collectionRatePct >= 0.5) {
      creditRisk = 'Partial Pending';
    } else {
      creditRisk = 'High Risk AR';
    }

    list.push({
      client,
      revenue: val.revenue,
      grossProfit: val.grossProfit,
      arBalance: val.arBalance,
      collectionRatePct,
      creditRisk,
    });
  });

  return list.sort((a, b) => b.revenue - a.revenue);
}

/**
 * Breakdown by Sales Representative
 */
export function computeSalesRepRankings(
  engineRows: CalculatedOrderEngineRow[]
): SalesRepPerformance[] {
  const activeRows = engineRows.filter((r) => r.isActive && r.salesRep);
  const map = new Map<
    string,
    { orderCount: number; revenue: number; grossProfit: number; outstandingAR: number }
  >();

  activeRows.forEach((r) => {
    const curr = map.get(r.salesRep) || {
      orderCount: 0,
      revenue: 0,
      grossProfit: 0,
      outstandingAR: 0,
    };
    curr.orderCount += 1;
    curr.revenue = round2(curr.revenue + r.salesRevenueBase);
    curr.grossProfit = round2(curr.grossProfit + r.grossProfitBase);
    curr.outstandingAR = round2(curr.outstandingAR + r.uncollectedARBase);
    map.set(r.salesRep, curr);
  });

  const list: SalesRepPerformance[] = [];
  map.forEach((val, salesRep) => {
    list.push({
      salesRep,
      orderCount: val.orderCount,
      revenue: val.revenue,
      grossProfit: val.grossProfit,
      outstandingAR: val.outstandingAR,
    });
  });

  return list.sort((a, b) => b.revenue - a.revenue);
}

/**
 * Global KPI Summary
 */
export interface GlobalKPISummary {
  baseCurrencyLabel: string;
  annualSalesRevenue: number;
  annualGrossProfit: number;
  annualGrossMarginPct: number;
  annualOpex: number;
  annualNetOperatingProfit: number;
  globalARBalance: number;
  globalAPBalance: number;
  globalNetExposure: number; // AR - AP
}

export function computeGlobalKPIs(
  monthlyRows: MonthlyDashboardRow[],
  calculatedInvoices: CalculatedInvoice[],
  calculatedBills: CalculatedSupplierBill[],
  config: SystemConfig
): GlobalKPISummary {
  const annualSalesRevenue = round2(
    monthlyRows.reduce((sum, m) => sum + m.salesRevenue, 0)
  );
  const annualGrossProfit = round2(
    monthlyRows.reduce((sum, m) => sum + m.grossProfit, 0)
  );
  const annualGrossMarginPct =
    annualSalesRevenue > 0 ? round2(annualGrossProfit / annualSalesRevenue) : 0;
  const annualOpex = round2(monthlyRows.reduce((sum, m) => sum + m.opex, 0));
  const annualNetOperatingProfit = round2(annualGrossProfit - annualOpex);

  const globalARBalance = round2(
    calculatedInvoices.reduce((sum, i) => sum + i.uncollectedBase, 0)
  );
  const globalAPBalance = round2(
    calculatedBills.reduce((sum, b) => sum + b.unpaidBase, 0)
  );
  const globalNetExposure = round2(globalARBalance - globalAPBalance);

  return {
    baseCurrencyLabel: `${config.baseCurrency} (${config.baseCurrencySymbol})`,
    annualSalesRevenue,
    annualGrossProfit,
    annualGrossMarginPct,
    annualOpex,
    annualNetOperatingProfit,
    globalARBalance,
    globalAPBalance,
    globalNetExposure,
  };
}

/**
 * Currency Formatter
 */
export function formatMoney(
  amount: number | null | undefined,
  symbol: string = '€',
  decimals: number = 2
): string {
  if (amount == null || isNaN(amount)) return `${symbol}0.00`;
  const isNegative = amount < 0;
  const absVal = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return isNegative ? `-${symbol}${absVal}` : `${symbol}${absVal}`;
}

export function formatPercent(val: number | null | undefined): string {
  if (val == null || isNaN(val)) return '0.0%';
  return `${(val * 100).toFixed(1)}%`;
}
