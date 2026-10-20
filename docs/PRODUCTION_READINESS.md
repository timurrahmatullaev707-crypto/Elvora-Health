# ELVORA HEALTH — PRODUCTION READINESS & COMPLIANCE ROADMAP

> **CRITICAL ARCHITECTURAL NOTICE:**
> The current version of Elvora Health is a high-fidelity frontend SaaS demonstration and investor prototype. All data is managed in-browser via localStorage repositories.
> **DO NOT USE THIS DEMO VERSION WITH REAL, IDENTIFIABLE PATIENT HEALTH RECORDS (PHI) UNTIL THE FOLLOWING PRODUCTION REQUIREMENTS ARE MET.**

---

## 1. Statutory Compliance (Uzbekistan Healthcare & Privacy Laws)

Before clinical deployment in the Republic of Uzbekistan, the platform must comply with:
1. **O‘zbekiston Respublikasi Prezidentining 415-son Qarori (415-PQ):**
   * Integration with the Ministry of Health (SSV) unified healthcare ecosystem standards.
   * Standardized electronic medical card (EMK) schemas and digital prescription registries.
2. **"Shaxsga doir ma’lumotlar to‘g‘risida"gi O‘zbekiston Respublikasi Qonuni (O‘RQ-547):**
   * Server hardware and physical databases storing Uzbek citizens' personal data must be geographically located inside the Republic of Uzbekistan.
   * "Zero-Data Leakage": No unvetted third-party analytics or external generative AI APIs without explicit Ministry accreditation.
3. **Informed Consent & Medical Secrecy (Vrachlik siri):**
   * Digital consent recording for diagnostic procedures and electronic prescription generation.

---

## 2. Server-Side Security & Authentication Architecture

1. **Authentication (FastAPI + OAuth2 / OIDC):**
   * Transition from client-side demo profiles to JWT access tokens (short-lived, 15m) and secure HttpOnly refresh tokens.
   * Multi-Factor Authentication (MFA / SMS OTP via local providers such as PlayMobile / Eskiz) for Clinic Administrators and Doctors.
2. **Authoritative Role-Based Access Control (RBAC):**
   * Enforcement of permissions (`can(user, action, resource)`) must occur on every backend FastAPI route using dependency injection (`Depends(require_permission("finance:export"))`).
   * Frontend UI gates serve solely for UX and must never be relied upon for data security.
3. **Data Encryption:**
   * **In Transit:** TLS 1.3 with strict HSTS, enforced forward secrecy, and certificate pinning.
   * **At Rest:** Database disk encryption using AES-256 for PostgreSQL tablespaces, and column-level encryption for sensitive diagnostic notes.
4. **Comprehensive Immutable Audit Logging:**
   * Automated audit trail tracking every read, write, update, and export of patient records:
     `timestamp, user_id, action, patient_id, ip_address, user_agent, diff_summary`.

---

## 3. Reliability, Backups & Disaster Recovery

* **PostgreSQL Replication:** Primary-Standby replica cluster with automated failover.
* **Point-in-Time Recovery (PITR):** Continuous Write-Ahead Logging (WAL) archiving to S3-compatible local object storage (Tashkent DC) with 15-minute RPO.
* **Daily Automated Encrypted Snapshots:** Retained for 180 days with off-site disaster recovery replication.
