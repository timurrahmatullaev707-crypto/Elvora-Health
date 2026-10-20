import {
  Transaction,
  TransactionType,
  ExpenseCategory,
  IncomeCategory,
  PaymentMethod,
} from '../types';
import { storageService } from './storage';
import { getTodayDateString, getOffsetDateString } from './seedData';

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  netOperatingResult: number;
  incomeCount: number;
  expenseCount: number;
  voidedCount: number;
}

export const financeService = {
  getAll(): Transaction[] {
    return storageService.getTransactions();
  },

  getValid(): Transaction[] {
    return this.getAll().filter((t) => !t.isVoided);
  },

  getById(id: string): Transaction | undefined {
    return this.getAll().find((t) => t.id === id);
  },

  // Filter transactions by date range
  getByPeriod(startDate: string, endDate: string): Transaction[] {
    return this.getAll().filter((t) => t.date >= startDate && t.date <= endDate);
  },

  // Calculate totals for a given array of transactions (defaulting to all valid)
  calculateSummary(transactions?: Transaction[]): FinanceSummary {
    const list = (transactions || this.getAll()).filter((t) => !t.isVoided);
    const voidedList = (transactions || this.getAll()).filter((t) => t.isVoided);

    let totalIncome = 0;
    let totalExpenses = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    list.forEach((t) => {
      if (t.type === 'kirim') {
        totalIncome += t.amount;
        incomeCount++;
      } else if (t.type === 'chiqim') {
        totalExpenses += t.amount;
        expenseCount++;
      }
    });

    const netOperatingResult = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netOperatingResult,
      incomeCount,
      expenseCount,
      voidedCount: voidedList.length,
    };
  },

  // Pre-configured period summaries
  getSummaryForPeriod(period: 'today' | '7days' | '30days' | 'all'): {
    summary: FinanceSummary;
    transactions: Transaction[];
    startDate: string;
    endDate: string;
  } {
    const today = getTodayDateString();
    let startDate = today;
    const endDate = today;

    if (period === '7days') {
      startDate = getOffsetDateString(-7);
    } else if (period === '30days') {
      startDate = getOffsetDateString(-30);
    } else if (period === 'all') {
      startDate = '2020-01-01';
    }

    const txs = this.getByPeriod(startDate, endDate);
    const summary = this.calculateSummary(txs);

    return { summary, transactions: txs, startDate, endDate };
  },

  // Expense breakdown by category
  getExpenseBreakdown(transactions?: Transaction[]): {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
    count: number;
  }[] {
    const expenses = (transactions || this.getAll()).filter(
      (t) => t.type === 'chiqim' && !t.isVoided
    );
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    const map: Record<string, { amount: number; count: number }> = {};

    expenses.forEach((t) => {
      if (!map[t.category]) {
        map[t.category] = { amount: 0, count: 0 };
      }
      map[t.category].amount += t.amount;
      map[t.category].count += 1;
    });

    return Object.entries(map)
      .map(([cat, val]) => ({
        category: cat as ExpenseCategory,
        amount: val.amount,
        percentage: totalExpenses > 0 ? Math.round((val.amount / totalExpenses) * 100) : 0,
        count: val.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  // Income breakdown by category
  getIncomeBreakdown(transactions?: Transaction[]): {
    category: IncomeCategory;
    amount: number;
    percentage: number;
    count: number;
  }[] {
    const incomes = (transactions || this.getAll()).filter(
      (t) => t.type === 'kirim' && !t.isVoided
    );
    const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

    const map: Record<string, { amount: number; count: number }> = {};

    incomes.forEach((t) => {
      if (!map[t.category]) {
        map[t.category] = { amount: 0, count: 0 };
      }
      map[t.category].amount += t.amount;
      map[t.category].count += 1;
    });

    return Object.entries(map)
      .map(([cat, val]) => ({
        category: cat as IncomeCategory,
        amount: val.amount,
        percentage: totalIncome > 0 ? Math.round((val.amount / totalIncome) * 100) : 0,
        count: val.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  // Create Income
  createIncome(data: {
    category: IncomeCategory;
    amount: number;
    paymentMethod: PaymentMethod;
    description: string;
    patientId?: string;
    patientName?: string;
    doctorId?: string;
    doctorName?: string;
    appointmentId?: string;
    date?: string;
  }): Transaction {
    const list = storageService.getTransactions();
    const today = getTodayDateString();
    const nowTime = new Date().toTimeString().slice(0, 5);

    const receiptSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'kirim',
      category: data.category,
      amount: Number(data.amount),
      date: data.date || today,
      time: nowTime,
      paymentMethod: data.paymentMethod,
      description: data.description,
      patientId: data.patientId,
      patientName: data.patientName,
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      appointmentId: data.appointmentId,
      receiptNumber: `CH-${(data.date || today).replace(/-/g, '')}-${receiptSuffix}`,
      isVoided: false,
      createdAt: `${data.date || today} ${nowTime}`,
    };

    list.unshift(newTx);
    storageService.setTransactions(list);
    return newTx;
  },

  // Create Expense
  createExpense(data: {
    category: ExpenseCategory;
    amount: number;
    paymentMethod: PaymentMethod;
    description: string;
    date?: string;
  }): Transaction {
    const list = storageService.getTransactions();
    const today = getTodayDateString();
    const nowTime = new Date().toTimeString().slice(0, 5);

    const receiptSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'chiqim',
      category: data.category,
      amount: Number(data.amount),
      date: data.date || today,
      time: nowTime,
      paymentMethod: data.paymentMethod,
      description: data.description,
      receiptNumber: `EXP-${(data.date || today).replace(/-/g, '')}-${receiptSuffix}`,
      isVoided: false,
      createdAt: `${data.date || today} ${nowTime}`,
    };

    list.unshift(newTx);
    storageService.setTransactions(list);
    return newTx;
  },

  // Void a transaction with a required reason
  voidTransaction(id: string, reason: string): { success: boolean; error?: string } {
    if (!reason || reason.trim().length < 5) {
      return { success: false, error: 'Tranzaksiyani bekor qilish sababini batafsil ko\'rsating (kamida 5 belgi)' };
    }

    const list = storageService.getTransactions();
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) {
      return { success: false, error: 'Tranzaksiya topilmadi' };
    }

    list[index] = {
      ...list[index],
      isVoided: true,
      voidReason: reason.trim(),
      voidedAt: `${getTodayDateString()} ${new Date().toTimeString().slice(0, 5)}`,
    };

    storageService.setTransactions(list);
    return { success: true };
  },

  // Export to CSV string
  exportToCsv(transactions?: Transaction[]): string {
    const list = transactions || this.getAll();
    const headers = [
      'ID',
      'Turi',
      'Kategoriya',
      'Summa (so\'m)',
      'Sana',
      'Vaqt',
      'To\'lov usuli',
      'Izoh',
      'Bemor',
      'Kvitansiya raqami',
      'Holat',
      'Bekor qilish sababi',
    ];

    const rows = list.map((t) => [
      t.id,
      t.type === 'kirim' ? 'Kirim' : 'Chiqim',
      `"${t.category}"`,
      t.amount,
      t.date,
      t.time,
      `"${t.paymentMethod}"`,
      `"${(t.description || '').replace(/"/g, '""')}"`,
      `"${(t.patientName || '').replace(/"/g, '""')}"`,
      t.receiptNumber,
      t.isVoided ? 'Bekor qilingan' : 'Tasdiqlangan',
      `"${(t.voidReason || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
