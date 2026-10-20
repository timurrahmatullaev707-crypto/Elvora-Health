/**
 * ELVORA HEALTH REPOSITORY LAYER
 *
 * This abstraction decouples UI components from storage implementation.
 * Currently uses local storage (DEMO mode).
 * In production, it can seamlessly switch to FastAPI REST API endpoints
 * when VITE_DATA_MODE='api' is configured in .env.
 */

import { Patient, Doctor, Appointment, Transaction, ClinicSettings, AppointmentStatus } from '../types';
import { patientService } from './patientService';
import { doctorService } from './doctorService';
import { appointmentService } from './appointmentService';
import { financeService } from './financeService';
import { storageService } from './storage';

const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'demo';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// ==========================================
// 1. PATIENTS REPOSITORY
// ==========================================
export const patientsRepo = {
  async getAll(): Promise<Patient[]> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/patients`);
      if (!res.ok) throw new Error('Failed to fetch patients');
      return res.json();
    }
    return patientService.getAll();
  },

  async getById(id: string): Promise<Patient | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/patients/${id}`);
      if (!res.ok) return null;
      return res.json();
    }
    return patientService.getById(id) || null;
  },

  async create(data: Omit<Patient, 'id' | 'createdAt' | 'totalVisits'>): Promise<Patient> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create patient');
      return res.json();
    }
    return patientService.create(data);
  },

  async update(id: string, data: Partial<Patient>): Promise<Patient | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/patients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update patient');
      return res.json();
    }
    return patientService.update(id, data);
  },

  async delete(id: string): Promise<boolean> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/patients/${id}`, { method: 'DELETE' });
      return res.ok;
    }
    return patientService.delete(id);
  },
};

// ==========================================
// 2. DOCTORS REPOSITORY
// ==========================================
export const doctorsRepo = {
  async getAll(): Promise<Doctor[]> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/doctors`);
      return res.json();
    }
    return doctorService.getAll();
  },

  async getById(id: string): Promise<Doctor | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
      return res.ok ? res.json() : null;
    }
    return doctorService.getById(id) || null;
  },

  async create(data: Omit<Doctor, 'id'>): Promise<Doctor> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return doctorService.create(data);
  },

  async update(id: string, data: Partial<Doctor>): Promise<Doctor | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return doctorService.update(id, data);
  },
};

// ==========================================
// 3. APPOINTMENTS REPOSITORY
// ==========================================
export const appointmentsRepo = {
  async getAll(): Promise<Appointment[]> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/appointments`);
      return res.json();
    }
    return appointmentService.getAll();
  },

  async getById(id: string): Promise<Appointment | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}`);
      return res.ok ? res.json() : null;
    }
    return appointmentService.getById(id) || null;
  },

  async create(
    data: Omit<Appointment, 'id' | 'queueNumber' | 'createdAt' | 'reminderSent'>
  ): Promise<{ success: boolean; appointment?: Appointment; error?: string }> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return appointmentService.create(data);
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment | null> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.json();
    }
    return appointmentService.updateStatus(id, status);
  },

  async cancel(id: string): Promise<boolean> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/cancel`, {
        method: 'POST',
      });
      return res.ok;
    }
    const res = appointmentService.updateStatus(id, 'bekor_qilindi');
    return res !== null;
  },
};

// ==========================================
// 4. FINANCE REPOSITORY
// ==========================================
export const financeRepo = {
  async getAll(): Promise<Transaction[]> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/finance/transactions`);
      return res.json();
    }
    return financeService.getAll();
  },

  async createExpense(data: Parameters<typeof financeService.createExpense>[0]): Promise<Transaction> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/finance/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return financeService.createExpense(data);
  },

  async createIncome(data: Parameters<typeof financeService.createIncome>[0]): Promise<Transaction> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/finance/incomes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return financeService.createIncome(data);
  },

  async voidTransaction(id: string, reason: string): Promise<{ success: boolean; error?: string }> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/finance/transactions/${id}/void`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      return res.json();
    }
    return financeService.voidTransaction(id, reason);
  },
};

// ==========================================
// 5. SETTINGS REPOSITORY
// ==========================================
export const settingsRepo = {
  async get(): Promise<ClinicSettings> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/settings`);
      return res.json();
    }
    return storageService.getSettings();
  },

  async update(settings: Partial<ClinicSettings>): Promise<ClinicSettings> {
    if (DATA_MODE === 'api') {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      return res.json();
    }
    const current = storageService.getSettings();
    const updated = { ...current, ...settings };
    storageService.setSettings(updated);
    return updated;
  },
};
