import React, { useState, useMemo } from 'react';
import {
  CalculatedExpense,
  CurrencyCode,
  ExpenseCategory,
  ExpensePaymentStatus,
  OperatingExpense,
  SystemConfig,
} from '../types';
import { formatMoney } from '../utils/calculations';
import { exportArrayToCSV } from '../utils/csvHelper';
import { Plus, Trash2, Search, Download, Building2 } from 'lucide-react';

interface ExpensesViewProps {
  expenses: CalculatedExpense[];
  config: SystemConfig;
  onUpdateExpense: (id: string, updated: Partial<OperatingExpense>) => void;
  onAddExpense: (expense: OperatingExpense) => void;
  onDeleteExpense: (id: string) => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({
  expenses,
  config,
  onUpdateExpense,
  onAddExpense,
  onDeleteExpense,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const symbol = config.baseCurrencySymbol;

  const [newExpense, setNewExpense] = useState<Partial<OperatingExpense>>({
    id: `OPEX-${config.analysisYear}-${String(expenses.length + 1).padStart(3, '0')}`,
    expenseDate: new Date().toISOString().split('T')[0],
    category: 'Office Rent',
    description: '',
    currency: 'BAM',
    originalAmount: 3200,
    lockedFxRate: null,
    status: 'Paid',
    notes: '',
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const q = searchTerm.toLowerCase();
      return (
        searchTerm === '' ||
        e.id.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    });
  }, [expenses, searchTerm]);

  const totals = useMemo(() => {
    const totalOpexBase = filteredExpenses.reduce((s, e) => s + e.baseAmount, 0);
    const paidOpexBase = filteredExpenses
      .filter((e) => e.status === 'Paid')
      .reduce((s, e) => s + e.baseAmount, 0);
    const unpaidOpexBase = totalOpexBase - paidOpexBase;
    return { totalOpexBase, paidOpexBase, unpaidOpexBase };
  }, [filteredExpenses]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.id) return;
    onAddExpense(newExpense as OperatingExpense);
    setIsAddingNew(false);
    setNewExpense({
      id: `OPEX-${config.analysisYear}-${String(expenses.length + 2).padStart(3, '0')}`,
      expenseDate: new Date().toISOString().split('T')[0],
      category: 'Office Rent',
      description: '',
      currency: 'BAM',
      originalAmount: 3200,
      lockedFxRate: null,
      status: 'Paid',
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Expense ID',
      'Expense Date',
      'Category',
      'Description & Payee',
      'Currency',
      'Original Amount',
      'Locked FX',
      'Applied FX',
      `Base Amount (${config.baseCurrency})`,
      'Payment Status',
      'Expense Month',
    ];
    const rows = filteredExpenses.map((e) => [
      e.id,
      e.expenseDate,
      e.category,
      e.description,
      e.currency,
      e.originalAmount,
      e.lockedFxRate || '',
      e.effectiveFxRate,
      e.baseAmount,
      e.status,
      e.expenseMonth,
    ]);
    exportArrayToCSV(headers, rows, '06_Operating_Expenses_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 06 • Indirect Operating Expenses
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Operating Expenses (OPEX)
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            General corporate overheads (rent, salaries, marketing, SaaS, bank fees). Strictly segregated from tour-level direct costs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Expense</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-semibold text-[#051C2C] hover:bg-[#F5F5F2] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Total OPEX Overhead (Base)
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.totalOpexBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Paid Cash OPEX
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C]">
            {formatMoney(totals.paidOpexBase, symbol, 0)}
          </div>
        </div>

        <div className="card-surface-static p-3 bg-white">
          <span className="text-[10px] uppercase font-semibold text-[#888888] tracking-label">
            Unpaid Pending OPEX
          </span>
          <div className="font-heading text-xl font-bold text-[#2251FF]">
            {formatMoney(totals.unpaidOpexBase, symbol, 0)}
          </div>
        </div>
      </div>

      {/* New Expense Form Drawer */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubmit}
          className="card-surface-static p-5 bg-white border border-[#2251FF]/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E8E8E6] pb-2">
            <h3 className="font-heading text-base font-bold text-[#051C2C]">
              Record Operating Overhead Expense
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-[#888888] hover:text-[#051C2C]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Expense ID *
              </label>
              <input
                type="text"
                required
                value={newExpense.id || ''}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, id: e.target.value.trim() })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Date Incurred
              </label>
              <input
                type="date"
                required
                value={newExpense.expenseDate || ''}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, expenseDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Expense Category
              </label>
              <select
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    category: e.target.value as ExpenseCategory,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.operatingExpenseCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Description & Payee
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Office rent, monthly staff payroll..."
                value={newExpense.description || ''}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Currency
              </label>
              <select
                value={newExpense.currency}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    currency: e.target.value as CurrencyCode,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable font-mono"
              >
                {config.currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Original Amount *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={newExpense.originalAmount || ''}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    originalAmount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Manual Locked FX Rate (Optional)
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="Auto rate"
                value={newExpense.lockedFxRate != null ? newExpense.lockedFxRate : ''}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    lockedFxRate: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Payment Status
              </label>
              <select
                value={newExpense.status}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    status: e.target.value as ExpensePaymentStatus,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                <option value="Paid">Paid (Cash Cleared)</option>
                <option value="Unpaid">Unpaid (Accrued)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] shadow-sm"
            >
              Save OPEX Record
            </button>
          </div>
        </form>
      )}

      {/* Search Toolbar */}
      <div className="card-surface-static p-4 bg-white flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search expense ID, category, or description..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
          />
        </div>
        <div className="text-[11px] text-[#888888] font-mono">
          Showing <strong>{filteredExpenses.length}</strong> items
        </div>
      </div>

      {/* Main Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1100px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Expense ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 min-w-[200px]">Description & Payee</th>
                <th className="py-2.5 px-3 text-center">Curr</th>
                <th className="py-2.5 px-3 text-right">Original Amount</th>
                <th className="py-2.5 px-3 text-right">Locked FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2]">Applied FX</th>
                <th className="py-2.5 px-3 text-right bg-[#F5F5F2] font-bold">Base Cost</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Month</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#F5F5F2] transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-[#051C2C]">
                    {exp.id}
                  </td>

                  <td className="py-2 px-3">
                    <input
                      type="date"
                      value={exp.expenseDate}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, { expenseDate: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-[110px]"
                    />
                  </td>

                  <td className="py-2 px-3">
                    <select
                      value={exp.category}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, {
                          category: e.target.value as ExpenseCategory,
                        })
                      }
                      className="p-1 rounded text-xs input-editable"
                    >
                      {config.operatingExpenseCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={exp.description}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, { description: e.target.value })
                      }
                      className="p-1 rounded text-xs input-editable w-full max-w-[260px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-center">
                    <select
                      value={exp.currency}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, {
                          currency: e.target.value as CurrencyCode,
                        })
                      }
                      className="p-1 rounded text-xs input-editable font-mono"
                    >
                      {config.currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={exp.originalAmount}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, {
                          originalAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[90px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="Auto"
                      value={exp.lockedFxRate != null ? exp.lockedFxRate : ''}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, {
                          lockedFxRate: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      className="p-1 rounded text-xs font-mono text-right input-editable w-[75px]"
                    />
                  </td>

                  <td className="py-2 px-3 text-right font-mono bg-[#F5F5F2] text-[#888888]">
                    {exp.effectiveFxRate.toFixed(4)}
                  </td>

                  <td className="py-2 px-3 text-right font-mono font-bold bg-[#F5F5F2] text-[#051C2C]">
                    {formatMoney(exp.baseAmount, symbol, 2)}
                  </td>

                  <td className="py-2 px-3 text-center">
                    <select
                      value={exp.status}
                      onChange={(e) =>
                        onUpdateExpense(exp.id, {
                          status: e.target.value as ExpensePaymentStatus,
                        })
                      }
                      className={`p-1 rounded text-xs font-medium input-editable ${
                        exp.status === 'Paid' ? 'text-[#051C2C]' : 'text-[#2251FF]'
                      }`}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </td>

                  <td className="py-2 px-3 text-center font-mono bg-[#F5F5F2] text-[#888888]">
                    {exp.expenseMonth}
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onDeleteExpense(exp.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)] rounded"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
