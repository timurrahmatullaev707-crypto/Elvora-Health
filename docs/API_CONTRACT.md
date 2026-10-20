# ELVORA HEALTH — FASTAPI REST API CONTRACT & POSTGRESQL SCHEMA

This document details the planned REST API contracts and relational database schema for the upcoming FastAPI + PostgreSQL backend.

---

## 1. REST API Endpoints Overview (Base URL: `/api/v1`)

### Authentication & Tenant
* `POST /api/v1/auth/login` — Authenticate staff member with email & password, returns JWT.
* `POST /api/v1/auth/refresh` — Refresh access token via secure HttpOnly cookie.
* `GET  /api/v1/auth/me` — Retrieve current authenticated staff profile, clinic details, and role permissions.

### Patients (`/api/v1/patients`)
* `GET    /api/v1/patients` — List patients (query params: `page`, `limit`, `search`, `gender`, `branch_id`).
* `POST   /api/v1/patients` — Create new patient profile.
* `GET    /api/v1/patients/{id}` — Get single patient details, visit history, and invoices.
* `PATCH  /api/v1/patients/{id}` — Update patient details.
* `DELETE /api/v1/patients/{id}` — Archive / soft-delete patient.

### Doctors & Schedules (`/api/v1/doctors`)
* `GET    /api/v1/doctors` — List clinic doctors, specialties, and active statuses.
* `POST   /api/v1/doctors` — Register new doctor.
* `GET    /api/v1/doctors/{id}` — Get doctor profile and services.
* `PATCH  /api/v1/doctors/{id}` — Update doctor settings or consultation fees.
* `GET    /api/v1/doctors/{id}/schedule` — Get weekly schedule and booked slots.
* `PUT    /api/v1/doctors/{id}/schedule` — Update working hours, break periods, and days off.
* `GET    /api/v1/doctors/{id}/available-slots` — Query free 30-min slots for a given date.

### Appointments & Queue (`/api/v1/appointments`)
* `GET    /api/v1/appointments` — Filter appointments by date, doctor, status, branch.
* `POST   /api/v1/appointments` — Book new appointment (performs atomic DB lock to prevent double-booking).
* `PATCH  /api/v1/appointments/{id}/status` — Update appointment status (`kutilmoqda` → `qabulda` → `yakunlandi`).
* `DELETE /api/v1/appointments/{id}` — Cancel appointment with reason.
* `GET    /api/v1/appointments/queue-board` — Real-time queue tickets for waiting room display tablos.

### Finance & Billing (`/api/v1/finance`)
* `GET    /api/v1/finance/transactions` — Query revenue & expense entries with date filters.
* `POST   /api/v1/finance/transactions` — Create manual or appointment-linked financial record.
* `POST   /api/v1/finance/transactions/{id}/void` — Void transaction with required audit reason.
* `GET    /api/v1/finance/summary` — Aggregate financial summary (income, expenses, net result).

### Elvora Insights™ (`/api/v1/insights`)
* `GET    /api/v1/insights/report` — Runs server-side deterministic rules engine and returns verified clinical observations.

---

## 2. PostgreSQL Relational Database Schema

```sql
-- 1. Clinics (Multi-Tenant Master)
CREATE TABLE clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    plan VARCHAR(50) DEFAULT 'pro', -- 'basic', 'pro', 'business'
    currency VARCHAR(10) DEFAULT 'UZS',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Branches
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Staff Users & Roles
CREATE TABLE staff_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'doctor', 'receptionist', 'accountant'
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Patients
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    blood_group VARCHAR(10),
    address TEXT,
    notes TEXT,
    total_visits INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Doctors
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    staff_user_id UUID REFERENCES staff_users(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    room_number VARCHAR(50),
    consultation_fee INT NOT NULL DEFAULT 0,
    working_days INT[] NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    break_start TIME NOT NULL,
    break_end TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    fee INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'kutilmoqda',
    queue_number INT NOT NULL,
    reminder_sent BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT prevent_doctor_overlap UNIQUE (doctor_id, date, start_time)
);

-- 7. Transactions (Accounting)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    type VARCHAR(20) NOT NULL, -- 'kirim' | 'chiqim'
    category VARCHAR(100) NOT NULL,
    amount INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    description TEXT,
    receipt_number VARCHAR(100) NOT NULL,
    is_voided BOOLEAN DEFAULT FALSE,
    void_reason TEXT,
    voided_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
