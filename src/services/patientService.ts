import { Patient } from '../types';
import { storageService } from './storage';
import { getTodayDateString } from './seedData';

export const patientService = {
  getAll(): Patient[] {
    return storageService.getPatients();
  },

  getById(id: string): Patient | undefined {
    return storageService.getPatients().find((p) => p.id === id);
  },

  search(query: string): Patient[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAll();
    return this.getAll().filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        (p.address && p.address.toLowerCase().includes(q))
    );
  },

  create(patientData: Omit<Patient, 'id' | 'createdAt' | 'totalVisits'>): Patient {
    const list = storageService.getPatients();
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`,
      createdAt: getTodayDateString(),
      totalVisits: 0,
    };
    list.unshift(newPatient);
    storageService.setPatients(list);
    return newPatient;
  },

  update(id: string, updates: Partial<Patient>): Patient | null {
    const list = storageService.getPatients();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    storageService.setPatients(list);
    return list[index];
  },

  delete(id: string): boolean {
    const list = storageService.getPatients();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length !== list.length) {
      storageService.setPatients(filtered);
      return true;
    }
    return false;
  },

  recordVisit(id: string): void {
    const patient = this.getById(id);
    if (patient) {
      this.update(id, {
        totalVisits: (patient.totalVisits || 0) + 1,
        lastVisitDate: getTodayDateString(),
      });
    }
  },
};
