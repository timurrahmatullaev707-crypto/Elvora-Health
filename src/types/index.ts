export type Gender = 'erkak' | 'ayol';

export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  address?: string;
  bloodGroup?: string;
  notes?: string;
  createdAt: string;
  totalVisits: number;
  lastVisitDate?: string;
}

export type DoctorSpecialty =
  | 'Kardiolog'
  | 'Terapevt'
  | 'Nevropatolog'
  | 'Pediatr'
  | 'Stomatolog'
  | 'Ginekolog'
  | 'Jarroh'
  | 'Oftalmolog'
  | 'LOR';

export interface Doctor {
  id: string;
  fullName: string;
  specialty: DoctorSpecialty;
  phone: string;
  email?: string;
  roomNumber: string;
  consultationFee: number; // in UZS
  workingDays: number[]; // 1: Mon, 2: Tue, ..., 6: Sat
  startHour: string; // e.g. "08:30"
  endHour: string;   // e.g. "17:30"
  breakStart: string;// e.g. "13:00"
  breakEnd: string;  // e.g. "14:00"
  appointmentDurationMinutes: number; // e.g. 30
  avatarColor?: string;
  isActive: boolean;
}

export type AppointmentStatus =
  | 'kutilmoqda'
  | 'qabulda'
  | 'yakunlandi'
  | 'bekor_qilindi'
  | 'kelmagan';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: DoctorSpecialty;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  serviceName: string;
  fee: number; // UZS
  status: AppointmentStatus;
  queueNumber: number;
  estimatedWaitMinutes?: number;
  notes?: string;
  reminderSent: boolean;
  createdAt: string;
}

export type TransactionType = 'kirim' | 'chiqim';

export type ExpenseCategory =
  | 'Ijara'
  | 'Ish haqi'
  | 'Kommunal xarajatlar'
  | 'Tibbiy materiallar'
  | 'Uskunalar'
  | 'Boshqa xarajatlar';

export type IncomeCategory =
  | 'Konsultatsiya'
  | 'Diagnostika va tahlil'
  | 'Muolaja xizmati'
  | 'Dori vositalari'
  | 'Boshqa xizmatlar';

export type PaymentMethod =
  | 'Naqd'
  | 'Karta (Uzcard/Humo)'
  | 'Bank o\'tkazmasi'
  | 'Payme / Click';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | IncomeCategory;
  amount: number; // in UZS
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  paymentMethod: PaymentMethod;
  description: string;
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName?: string;
  appointmentId?: string;
  receiptNumber: string;
  isVoided: boolean;
  voidReason?: string;
  voidedAt?: string;
  createdAt: string;
}

export type InsightType = 'warning' | 'opportunity' | 'financial' | 'operational';
export type InsightPriority = 'high' | 'medium' | 'low';

export interface InsightItem {
  id: string;
  title: string;
  type: InsightType;
  priority: InsightPriority;
  description: string;
  supportingData: string;
  dateRange: string;
  impactExplanation: string;
  suggestedAction: string;
  actionLink: string;
  actionLabel: string;
  isCalculatedFact: boolean;
}

export type UserRole = 'admin' | 'receptionist' | 'doctor';

export interface UserProfile {
  id: string;
  fullName: string;
  role: UserRole;
  roleTitleUz: string;
  email: string;
  phone: string;
  branchName: string;
}

export type SubscriptionPlan = 'basic' | 'pro' | 'business';

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  address: string;
  phone: string;
  currency: string;
  workingDays: string;
  workingHours: string;
  defaultAppointmentDuration: number;
  currentPlan: SubscriptionPlan;
  smsRemindersEnabled: boolean;
  telegramBotConnected: boolean;
}
