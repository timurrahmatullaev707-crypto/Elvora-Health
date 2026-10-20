import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ToastContainer } from '../common/ToastContainer';
import { NewAppointmentModal } from '../modals/NewAppointmentModal';
import { NewPatientModal } from '../modals/NewPatientModal';
import { NewPaymentModal } from '../modals/NewPaymentModal';

export const Layout: React.FC = () => {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FBFE] text-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <TopBar
          onOpenNewAppointment={() => setAppointmentModalOpen(true)}
          onOpenNewPatient={() => setPatientModalOpen(true)}
          onOpenNewPayment={() => setPaymentModalOpen(true)}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet
              context={{
                openNewAppointment: () => setAppointmentModalOpen(true),
                openNewPatient: () => setPatientModalOpen(true),
                openNewPayment: () => setPaymentModalOpen(true),
              }}
            />
          </div>
        </main>
      </div>

      {/* Global Quick Action Modals */}
      <NewAppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
      <NewPatientModal
        isOpen={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
      />
      <NewPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
