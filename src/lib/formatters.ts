/**
 * ELVORA HEALTH FORMATTERS
 * Safe currency, date, and phone formatting utilities for Uzbekistan locales.
 */

/**
 * Formats a number as integer UZS (so'm).
 * Never uses floating-point decimals for currency.
 * Example: 1250000 -> "1 250 000 so‘m"
 */
export function formatCurrency(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '0 so‘m';
  }

  const rounded = Math.round(Number(amount));
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);

  // Group by thousands with spaces
  const parts = absVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${isNegative ? '-' : ''}${parts} so‘m`;
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into Uzbek format (e.g. "20-Okt, 2026")
 */
export function formatDateUz(dateStr: string): string {
  if (!dateStr) return '';

  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;

  const months: Record<string, string> = {
    '01': 'Yan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Iyun',
    '07': 'Iyul',
    '08': 'Avg',
    '09': 'Sen',
    '10': 'Okt',
    '11': 'Noy',
    '12': 'Dek',
  };

  const monthName = months[month] || month;
  return `${parseInt(day, 10)}-${monthName}, ${year}`;
}

/**
 * Formats a phone number into readable Uzbek format: "+998 90 123 45 67"
 */
export function formatPhoneUz(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('998')) {
    return `+998 (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
  }
  if (digits.length === 9) {
    return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
  }

  return phone;
}
