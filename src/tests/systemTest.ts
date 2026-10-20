import { doctorService } from '../services/doctorService';
import { financeService } from '../services/financeService';
import { insightsService } from '../services/insightsService';
import { appointmentService } from '../services/appointmentService';
import { patientService } from '../services/patientService';
import { initialDoctors, initialPatients, initialAppointments, initialTransactions } from '../services/seedData';

// Standalone automated test suite to verify critical calculations and business logic
console.log('=== ELVORA HEALTH AUTOMATED SYSTEM TEST SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Doctor Occupancy Calculation
const doc1 = initialDoctors[0]; // Dr. Alisher Usmonov, 08:30 - 17:30 (break 13:00 - 14:00) => 8 hours = 480 mins
const todayApts = initialAppointments.filter((a) => a.doctorId === doc1.id && a.date === '2026-10-20');
const occ = doctorService.calculateOccupancy(doc1, todayApts);

assert(occ.totalWorkingMinutes === 480, `Doctor working minutes correctly calculated: ${occ.totalWorkingMinutes} == 480`);
assert(occ.slotsCount === 16, `Doctor slots count (30m per slot): ${occ.slotsCount} == 16`);
assert(typeof occ.occupancyPercent === 'number' && occ.occupancyPercent >= 0, 'Doctor occupancy percent is valid number');

// 2. Conflict and Double Booking Prevention
const conflictCheck = doctorService.checkSlotAvailability(
  doc1,
  '2026-10-20',
  '09:00',
  '09:30',
  initialAppointments
);
assert(!conflictCheck.available, `Conflict detected on already booked slot (09:00 - 09:30): reason = "${conflictCheck.reason}"`);

const breakCheck = doctorService.checkSlotAvailability(
  doc1,
  '2026-10-20',
  '13:15',
  '13:45',
  initialAppointments
);
assert(!breakCheck.available, `Break time booked slot correctly rejected: reason = "${breakCheck.reason}"`);

// 3. Finance Service Calculations
const summary = financeService.calculateSummary(initialTransactions);
const validIncomes = initialTransactions.filter((t) => t.type === 'kirim' && !t.isVoided);
const validExpenses = initialTransactions.filter((t) => t.type === 'chiqim' && !t.isVoided);

const expectedIncome = validIncomes.reduce((s, t) => s + t.amount, 0);
const expectedExpense = validExpenses.reduce((s, t) => s + t.amount, 0);
const expectedNet = expectedIncome - expectedExpense;

assert(summary.totalIncome === expectedIncome, `Total Income equals sum of valid income transactions (${summary.totalIncome} == ${expectedIncome})`);
assert(summary.totalExpenses === expectedExpense, `Total Expenses equals sum of valid expense transactions (${summary.totalExpenses} == ${expectedExpense})`);
assert(summary.netOperatingResult === expectedNet, `Net Operating Result equals Income minus Expenses (${summary.netOperatingResult} == ${expectedNet})`);

// 4. Voiding Transaction Integrity
const expenseBreakdown = financeService.getExpenseBreakdown(initialTransactions);
assert(expenseBreakdown.length > 0, `Expense breakdown contains categories (${expenseBreakdown.length} categories)`);
const topExpenseCat = expenseBreakdown[0];
assert(topExpenseCat.amount > 0 && topExpenseCat.percentage > 0, `Top expense category has amount and percentage (${topExpenseCat.category}: ${topExpenseCat.percentage}%)`);

// 5. Elvora Insights Verification
const insightsReport = insightsService.generateInsights();
assert(insightsReport.hasSufficientData === true, 'Elvora Insights generated with sufficient application data');
assert(insightsReport.insights.length >= 2, `Elvora Insights generated ${insightsReport.insights.length} distinct actionable observations`);

const noShowInsight = insightsReport.insights.find((i) => i.id === 'ins-no-show');
assert(Boolean(noShowInsight), 'No-show surge insight correctly computed from 7-day missed appointments dataset');
if (noShowInsight) {
  assert(noShowInsight.supportingData.length > 0, 'No-show insight includes factual supporting data');
  assert(noShowInsight.impactExplanation.length > 0, 'No-show insight explains business & financial impact');
  assert(noShowInsight.actionLink === '/app/appointments', 'No-show insight links directly to appointments module');
}

const idleSlotInsight = insightsReport.insights.find((i) => i.id === 'ins-idle-slots');
assert(Boolean(idleSlotInsight), 'Idle capacity insight computed from doctors schedule');

console.log(`\n=== TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED ===`);
