import {
  Patient,
  Doctor,
  Appointment,
  Transaction,
  ClinicSettings,
  UserProfile,
} from '../types';
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialTransactions,
  initialSettings,
  initialUserProfile,
} from './seedData';

const STORAGE_KEYS = {
  PATIENTS: 'elvora_patients_v1',
  DOCTORS: 'elvora_doctors_v1',
  APPOINTMENTS: 'elvora_appointments_v1',
  TRANSACTIONS: 'elvora_transactions_v1',
  SETTINGS: 'elvora_settings_v1',
  USER_PROFILE: 'elvora_user_profile_v1',
  DEMO_MODE_NOTICE: 'elvora_is_demo_mode',
};

class StorageService {
  private isStorageAvailable(): boolean {
    try {
      const test = '__elvora_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  public init(): void {
    if (!this.isStorageAvailable()) {
      console.warn('LocalStorage mavjud emas. Xotirada vaqtinchalik ishlatiladi.');
      return;
    }

    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      this.setPatients(initialPatients);
    }
    const existingDocs = this.getDoctors();
    if (!localStorage.getItem(STORAGE_KEYS.DOCTORS) || existingDocs.length < initialDoctors.length) {
      this.setDoctors(initialDoctors);
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      this.setAppointments(initialAppointments);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      this.setTransactions(initialTransactions);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.setSettings(initialSettings);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      this.setUserProfile(initialUserProfile);
    }
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE_NOTICE, 'true');
  }

  public resetAllToDemo(): void {
    this.setPatients(initialPatients);
    this.setDoctors(initialDoctors);
    this.setAppointments(initialAppointments);
    this.setTransactions(initialTransactions);
    this.setSettings(initialSettings);
    this.setUserProfile(initialUserProfile);
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE_NOTICE, 'true');
  }

  // Patients
  public getPatients(): Patient[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return data ? JSON.parse(data) : initialPatients;
    } catch {
      return initialPatients;
    }
  }

  public setPatients(patients: Patient[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch (e) {
      console.error('Error saving patients to storage:', e);
    }
  }

  // Doctors
  public getDoctors(): Doctor[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return data ? JSON.parse(data) : initialDoctors;
    } catch {
      return initialDoctors;
    }
  }

  public setDoctors(doctors: Doctor[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    } catch (e) {
      console.error('Error saving doctors to storage:', e);
    }
  }

  // Appointments
  public getAppointments(): Appointment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  }

  public setAppointments(appointments: Appointment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments to storage:', e);
    }
  }

  // Transactions
  public getTransactions(): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  }

  public setTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Error saving transactions to storage:', e);
    }
  }

  // Settings
  public getSettings(): ClinicSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : initialSettings;
    } catch {
      return initialSettings;
    }
  }

  public setSettings(settings: ClinicSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings to storage:', e);
    }
  }

  // User Profile
  public getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : initialUserProfile;
    } catch {
      return initialUserProfile;
    }
  }

  public setUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to storage:', e);
    }
  }
}

export const storageService = new StorageService();
// Initialize storage
storageService.init();
