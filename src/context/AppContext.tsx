import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Patient,
  Doctor,
  Appointment,
  Transaction,
  ClinicSettings,
  UserProfile,
  UserRole,
  SubscriptionPlan,
  AppAction,
  AppResource,
} from '../types';
import { storageService } from '../services/storage';
import { patientService } from '../services/patientService';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import { financeService } from '../services/financeService';
import { can, getRoleTitleUz } from '../lib/permissions';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AppContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  transactions: Transaction[];
  settings: ClinicSettings;
  userProfile: UserProfile;
  currentRole: UserRole;
  currentPlan: SubscriptionPlan;
  dateFilter: 'today' | '7days' | '30days' | 'all';
  toasts: Toast[];

  canAction: (action: AppAction, resource: AppResource) => boolean;
  setDateFilter: (filter: 'today' | '7days' | '30days' | 'all') => void;
  setCurrentRole: (role: UserRole) => void;
  setCurrentPlan: (plan: SubscriptionPlan) => void;
  updateSettings: (newSettings: Partial<ClinicSettings>) => void;
  refreshData: () => void;
  resetDemoData: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<ClinicSettings>(storageService.getSettings());
  const [userProfile, setUserProfile] = useState<UserProfile>(storageService.getUserProfile());
  const [currentRole, setCurrentRoleState] = useState<UserRole>('admin');
  const [currentPlan, setCurrentPlanState] = useState<SubscriptionPlan>('pro');
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | 'all'>('today');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const loadData = useCallback(() => {
    setPatients(patientService.getAll());
    setDoctors(doctorService.getAll());
    setAppointments(appointmentService.getAll());
    setTransactions(financeService.getAll());
    const savedSettings = storageService.getSettings();
    setSettings(savedSettings);
    setCurrentPlanState(savedSettings.currentPlan || 'pro');
    const profile = storageService.getUserProfile();
    setUserProfile(profile);
    setCurrentRoleState(profile.role || 'admin');
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = () => {
    loadData();
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const canAction = useCallback(
    (action: AppAction, resource: AppResource) => {
      return can(currentRole, action, resource);
    },
    [currentRole]
  );

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    const updated = {
      ...userProfile,
      role,
      roleTitleUz: getRoleTitleUz(role),
    };
    setUserProfile(updated);
    storageService.setUserProfile(updated);
    showToast(`Foydalanuvchi roli o'zgartirildi: ${updated.roleTitleUz}`, 'info');
  };

  const setCurrentPlan = (plan: SubscriptionPlan) => {
    setCurrentPlanState(plan);
    const updatedSettings = { ...settings, currentPlan: plan };
    setSettings(updatedSettings);
    storageService.setSettings(updatedSettings);
    const planNames: Record<SubscriptionPlan, string> = {
      basic: 'Basic (Boshlang\'ich)',
      pro: 'Pro (Professional)',
      business: 'Business (Tarmoq)',
    };
    showToast(`Tarif rejasi o'zgartirildi: ${planNames[plan]}`, 'success');
  };

  const updateSettings = (newSettings: Partial<ClinicSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.setSettings(updated);
    showToast('Klinika sozlamalari saqlandi', 'success');
  };

  const resetDemoData = () => {
    storageService.resetAllToDemo();
    loadData();
    showToast('Namunaviy ma\'lumotlar dastlabki holatiga qaytarildi', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        transactions,
        settings,
        userProfile,
        currentRole,
        currentPlan,
        dateFilter,
        toasts,
        canAction,
        setDateFilter,
        setCurrentRole,
        setCurrentPlan,
        updateSettings,
        refreshData,
        resetDemoData,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
