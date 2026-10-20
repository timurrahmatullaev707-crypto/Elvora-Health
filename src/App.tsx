import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PatientsPage } from './pages/PatientsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { FinancePage } from './pages/FinancePage';
import { InsightsPage } from './pages/InsightsPage';
import { ReportsPage } from './pages/ReportsPage';
import { StaffPage } from './pages/StaffPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Clinical SaaS Management Application */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Backwards-compatible legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/patients" element={<Navigate to="/app/patients" replace />} />
          <Route path="/appointments" element={<Navigate to="/app/appointments" replace />} />
          <Route path="/doctors" element={<Navigate to="/app/doctors" replace />} />
          <Route path="/finance" element={<Navigate to="/app/finance" replace />} />
          <Route path="/insights" element={<Navigate to="/app/insights" replace />} />
          <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
          <Route path="/staff" element={<Navigate to="/app/staff" replace />} />
          <Route path="/subscription" element={<Navigate to="/app/subscription" replace />} />
          <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
