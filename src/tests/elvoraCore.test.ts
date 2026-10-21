import { describe, it, expect } from 'vitest';
import { doctorService } from '../services/doctorService';
import { financeService } from '../services/financeService';
import { insightsService } from '../services/insightsService';
import { can, getRoleTitleUz } from '../lib/permissions';
import { hasFeature } from '../lib/featureGating';
import { formatCurrency, formatDateUz, formatPhoneUz } from '../lib/formatters';
import { initialDoctors, initialAppointments, initialTransactions } from '../services/seedData';
import { Doctor, Transaction } from '../types';

describe('1. Appointment Conflict Detection & Slot Generation', () => {
  const doc1 = initialDoctors[0]; // Dr. Alisher Usmonov, 08:30 - 17:30 (break 13:00 - 14:00)

  it('correctly calculates doctor working minutes and total slots', () => {
    // 08:30 to 17:30 is 9 hours = 540 mins. Break 13:00 to 14:00 is 60 mins. Net = 480 mins.
    const todayApts = initialAppointments.filter((a) => a.doctorId === doc1.id && a.date === '2026-10-20');
    const occ = doctorService.calculateOccupancy(doc1, todayApts);

    expect(occ.totalWorkingMinutes).toBe(480);
    expect(occ.slotsCount).toBe(16); // 480 mins / 30 mins = 16 slots
    expect(occ.occupancyPercent).toBeGreaterThanOrEqual(0);
    expect(occ.occupancyPercent).toBeLessThanOrEqual(100);
  });

  it('detects and blocks double-booking conflict on already booked slot', () => {
    const bookedApt = initialAppointments[0];
    const conflictCheck = doctorService.checkSlotAvailability(
      doc1,
      bookedApt.date,
      bookedApt.startTime,
      bookedApt.endTime,
      initialAppointments
    );

    expect(conflictCheck.available).toBe(false);
    expect(conflictCheck.reason).toContain('boshqa qabul mavjud');
  });

  it('detects and blocks booking during doctor lunch break', () => {
    const breakCheck = doctorService.checkSlotAvailability(
      doc1,
      '2026-10-20',
      '13:15',
      '13:45',
      initialAppointments
    );

    expect(breakCheck.available).toBe(false);
    expect(breakCheck.reason).toContain('tushlik tanaffusiga to\'g\'ri keladi');
  });

  it('detects and blocks booking on doctor day off', () => {
    // 2026-10-25 is a Sunday (day 0)
    const dayOffCheck = doctorService.checkSlotAvailability(
      doc1,
      '2026-10-25',
      '10:00',
      '10:30',
      initialAppointments
    );

    expect(dayOffCheck.available).toBe(false);
    expect(dayOffCheck.reason).toContain('dam olish kuni');
  });

  it('detects and blocks booking outside working hours', () => {
    const beforeHoursCheck = doctorService.checkSlotAvailability(
      doc1,
      '2026-10-20',
      '07:30',
      '08:00',
      initialAppointments
    );

    expect(beforeHoursCheck.available).toBe(false);
    expect(beforeHoursCheck.reason).toContain('ish soatlari oralig\'ida');
  });

  it('allows booking on an authentic free slot within working hours', () => {
    // 16:30 on 2026-10-20 is free
    const freeSlotCheck = doctorService.checkSlotAvailability(
      doc1,
      '2026-10-20',
      '16:30',
      '17:00',
      initialAppointments
    );

    expect(freeSlotCheck.available).toBe(true);
  });
});

describe('2. Finance Totals & Accounting Integrity', () => {
  it('correctly calculates total income from non-voided transactions', () => {
    const validIncomes = initialTransactions.filter((t) => t.type === 'kirim' && !t.isVoided);
    const expectedIncome = validIncomes.reduce((sum, t) => sum + t.amount, 0);

    const summary = financeService.calculateSummary(initialTransactions);
    expect(summary.totalIncome).toBe(expectedIncome);
    expect(summary.totalIncome).toBeGreaterThan(0);
  });

  it('correctly calculates total expenses from non-voided transactions', () => {
    const validExpenses = initialTransactions.filter((t) => t.type === 'chiqim' && !t.isVoided);
    const expectedExpenses = validExpenses.reduce((sum, t) => sum + t.amount, 0);

    const summary = financeService.calculateSummary(initialTransactions);
    expect(summary.totalExpenses).toBe(expectedExpenses);
    expect(summary.totalExpenses).toBeGreaterThan(0);
  });

  it('calculates net operating result accurately: Income - Expenses', () => {
    const summary = financeService.calculateSummary(initialTransactions);
    const expectedNet = summary.totalIncome - summary.totalExpenses;

    expect(summary.netOperatingResult).toBe(expectedNet);
  });

  it('strictly excludes voided transactions from revenue and expense totals', () => {
    const mockTxs: Transaction[] = [
      {
        id: 'tx-1',
        type: 'kirim',
        category: 'Konsultatsiya',
        amount: 200000,
        date: '2026-10-20',
        time: '10:00',
        paymentMethod: 'Naqd',
        description: 'Test payment 1',
        receiptNumber: 'REC-001',
        isVoided: false,
        createdAt: '2026-10-20 10:00',
      },
      {
        id: 'tx-2',
        type: 'kirim',
        category: 'Konsultatsiya',
        amount: 500000,
        date: '2026-10-20',
        time: '11:00',
        paymentMethod: 'Payme / Click',
        description: 'Voided payment',
        receiptNumber: 'REC-002',
        isVoided: true,
        voidReason: 'Bemor qabulga kela olmadi',
        createdAt: '2026-10-20 11:00',
      },
    ];

    const summary = financeService.calculateSummary(mockTxs);
    expect(summary.totalIncome).toBe(200000); // 500k voided must not be added
    expect(summary.voidedCount).toBe(1);
    expect(summary.voidedAmount).toBe(500000);
  });

  it('computes expense breakdown with valid percentages summing to ~100%', () => {
    const breakdown = financeService.getExpenseBreakdown(initialTransactions);
    expect(breakdown.length).toBeGreaterThan(0);

    const totalPercentage = breakdown.reduce((sum, item) => sum + item.percentage, 0);
    expect(totalPercentage).toBeGreaterThanOrEqual(98);
    expect(totalPercentage).toBeLessThanOrEqual(102); // Rounding margin
  });
});

describe('3. Elvora Insights Engine & Data-Sufficiency Rules', () => {
  it('returns valid insights report when application data meets minimum sufficiency thresholds', () => {
    const report = insightsService.generateInsights();

    expect(report.hasSufficientData).toBe(true);
    expect(report.totalAnalyzedAppointments).toBeGreaterThan(0);
    expect(report.totalAnalyzedTransactions).toBeGreaterThan(0);
    expect(report.insights.length).toBeGreaterThanOrEqual(3);
  });

  it('includes all mandatory structure fields on every generated insight', () => {
    const report = insightsService.generateInsights();

    report.insights.forEach((insight) => {
      expect(insight.id).toBeDefined();
      expect(insight.title.length).toBeGreaterThan(5);
      expect(['warning', 'opportunity', 'financial', 'operational']).toContain(insight.type);
      expect(['high', 'medium', 'low']).toContain(insight.priority);
      expect(insight.description.length).toBeGreaterThan(10);
      expect(insight.supportingData.length).toBeGreaterThan(5);
      expect(insight.impactExplanation.length).toBeGreaterThan(5);
      expect(insight.suggestedAction.length).toBeGreaterThan(5);
      expect(insight.actionLink.startsWith('/app/')).toBe(true);
      expect(insight.isCalculatedFact).toBe(true);
    });
  });

  it('identifies no-show pattern and provides actionable appointments navigation', () => {
    const report = insightsService.generateInsights();
    const noShowInsight = report.insights.find((i) => i.id === 'ins-no-show');

    expect(noShowInsight).toBeDefined();
    expect(noShowInsight?.actionLink).toBe('/app/appointments');
  });

  it('identifies idle doctor capacity and suggests schedule optimization', () => {
    const report = insightsService.generateInsights();
    const idleInsight = report.insights.find((i) => i.id === 'ins-idle-slots');

    expect(idleInsight).toBeDefined();
    expect(idleInsight?.actionLink).toBe('/app/appointments');
  });
});

describe('4. Role-Based Permissions & can Helper', () => {
  it('allows owner to perform all actions across all modules', () => {
    expect(can('owner', 'view', 'finance')).toBe(true);
    expect(can('owner', 'create', 'finance')).toBe(true);
    expect(can('owner', 'delete', 'patients')).toBe(true);
    expect(can('owner', 'export', 'reports')).toBe(true);
    expect(can('owner', 'edit', 'settings')).toBe(true);
    expect(can('owner', 'edit', 'subscription')).toBe(true);
  });

  it('prevents doctor from accessing finance, insights, and settings', () => {
    expect(can('doctor', 'view', 'finance')).toBe(false);
    expect(can('doctor', 'create', 'finance')).toBe(false);
    expect(can('doctor', 'view', 'insights')).toBe(false);
    expect(can('doctor', 'edit', 'settings')).toBe(false);
    expect(can('doctor', 'delete', 'patients')).toBe(false);
  });

  it('allows doctor to view and manage appointments and patients', () => {
    expect(can('doctor', 'view', 'patients')).toBe(true);
    expect(can('doctor', 'create', 'patients')).toBe(true);
    expect(can('doctor', 'view', 'appointments')).toBe(true);
  });

  it('allows receptionist to handle patients and appointments but not insights or settings', () => {
    expect(can('receptionist', 'view', 'patients')).toBe(true);
    expect(can('receptionist', 'create', 'appointments')).toBe(true);
    expect(can('receptionist', 'view', 'insights')).toBe(false);
    expect(can('receptionist', 'edit', 'settings')).toBe(false);
    expect(can('receptionist', 'delete', 'staff')).toBe(false);
  });

  it('allows accountant to view and manage finance but not edit staff or doctors', () => {
    expect(can('accountant', 'view', 'finance')).toBe(true);
    expect(can('accountant', 'create', 'finance')).toBe(true);
    expect(can('accountant', 'export', 'finance')).toBe(true);
    expect(can('accountant', 'view', 'staff')).toBe(false);
    expect(can('accountant', 'edit', 'doctors')).toBe(false);
  });

  it('returns valid Uzbek role descriptions', () => {
    expect(getRoleTitleUz('owner')).toContain('Ta\'sischi');
    expect(getRoleTitleUz('admin')).toContain('Bosh Shifokor');
    expect(getRoleTitleUz('accountant')).toContain('Hisobchi');
    expect(getRoleTitleUz('doctor')).toContain('Shifokor');
    expect(getRoleTitleUz('receptionist')).toContain('Registrator');
  });
});

describe('5. Plan Gating & hasFeature Helper', () => {
  it('restricts advanced features on Basic plan', () => {
    expect(hasFeature('basic', 'insights')).toBe(false);
    expect(hasFeature('basic', 'multi_branch')).toBe(false);
    expect(hasFeature('basic', 'automation_rules')).toBe(false);
    expect(hasFeature('basic', 'custom_roles')).toBe(false);
  });

  it('unlocks Insights and analytics on Pro plan while keeping multi-branch locked', () => {
    expect(hasFeature('pro', 'insights')).toBe(true);
    expect(hasFeature('pro', 'advanced_reports')).toBe(true);
    expect(hasFeature('pro', 'automation_rules')).toBe(true);
    expect(hasFeature('pro', 'multi_branch')).toBe(false);
    expect(hasFeature('pro', 'custom_roles')).toBe(false);
  });

  it('unlocks all capabilities on Business plan including multi-branch', () => {
    expect(hasFeature('business', 'insights')).toBe(true);
    expect(hasFeature('business', 'multi_branch')).toBe(true);
    expect(hasFeature('business', 'custom_roles')).toBe(true);
    expect(hasFeature('business', 'audit_log')).toBe(true);
  });
});

describe('6. Money, Date, and Phone Formatters', () => {
  it('formats Uzbek currency without floating point decimals', () => {
    expect(formatCurrency(1250000)).toBe('1 250 000 so‘m');
    expect(formatCurrency(590000)).toBe('590 000 so‘m');
    expect(formatCurrency(0)).toBe('0 so‘m');
    expect(formatCurrency(null)).toBe('0 so‘m');
    expect(formatCurrency(undefined)).toBe('0 so‘m');
  });

  it('formats negative currency correctly', () => {
    expect(formatCurrency(-350000)).toBe('-350 000 so‘m');
  });

  it('formats dates in readable Uzbek calendar format', () => {
    expect(formatDateUz('2026-10-20')).toBe('20-Okt, 2026');
    expect(formatDateUz('2026-03-08')).toBe('8-Mar, 2026');
  });

  it('formats Uzbek phone numbers consistently', () => {
    expect(formatPhoneUz('998901234567')).toBe('+998 (90) 123-45-67');
    expect(formatPhoneUz('901234567')).toBe('+998 (90) 123-45-67');
  });
});
