import { Doctor, DoctorSpecialty, Appointment } from './index';

export type AiMessageRole = 'user' | 'assistant' | 'system';

export type AiMessageType =
  | 'text'
  | 'doctor_recommendation'
  | 'booking_action'
  | 'lab_result'
  | 'emergency_alert'
  | 'clinic_info';

export interface DoctorRecommendation {
  specialty: DoctorSpecialty;
  recommendedDoctors: Doctor[];
  urgencyLevel: 'urgent' | 'routine' | 'consultation';
  reasoningUz: string;
  clarifyingQuestions?: string[];
  disclaimerUz: string;
}

export interface EmergencyAlert {
  isEmergency: boolean;
  detectedSymptoms: string[];
  immediateActionUz: string;
  emergencyNumber: string; // "103"
  hospitalGuidanceUz: string;
}

export interface LabAnalysisItem {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
    label: string;
  };
  status: 'normal' | 'low' | 'high' | 'critical';
  explanationUz: string;
  clinicalSignificanceUz: string;
}

export interface LabAnalysisResult {
  analyzedAt: string;
  patientConsentObtained: boolean;
  items: LabAnalysisItem[];
  overallSummaryUz: string;
  recommendedSpecialistUz?: DoctorSpecialty;
  disclaimerUz: string;
}

export interface AiBookingDraft {
  doctorId: string;
  doctorName: string;
  specialty: DoctorSpecialty;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  patientName: string;
  patientPhone: string;
  fee: number;
  confirmed: boolean;
  createdAppointment?: Appointment;
}

export interface AiMessage {
  id: string;
  role: AiMessageRole;
  content: string;
  timestamp: string; // HH:mm or ISO
  type?: AiMessageType;
  isDemo?: boolean;
  recommendation?: DoctorRecommendation;
  emergency?: EmergencyAlert;
  labResult?: LabAnalysisResult;
  bookingDraft?: AiBookingDraft;
  suggestedFollowUps?: string[];
}

export interface AiConsentState {
  consented: boolean;
  consentDate?: string;
  privacyVersion: string;
  piiRedactionAgreed: boolean;
}

export interface AiReminder {
  id: string;
  appointmentId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  channel: 'telegram' | 'sms';
  scheduledFor: string;
  status: 'rejalashtirilgan' | 'yuborildi' | 'yetkazildi' | 'bekor_qilingan' | 'rad_etildi';
  deliveryConfirmedAt?: string;
  consentObtained: boolean;
  textUz: string;
}

export interface ClinicAiContext {
  clinicName: string;
  address: string;
  phone: string;
  workingHours: string;
  workingDays: string;
  activeDoctors: {
    id: string;
    fullName: string;
    specialty: DoctorSpecialty;
    roomNumber: string;
    consultationFee: number;
    workingDays: number[];
    startHour: string;
    endHour: string;
  }[];
  servicesList: {
    name: string;
    category: string;
    price: number;
  }[];
}
