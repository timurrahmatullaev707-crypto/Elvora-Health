# 🌿 Elvora Health — Complete Clinic Management SaaS Platform

> **"Your clinic. One intelligent system."**  
> *"Klinikangiz uchun yagona aqlli tizim."*

**Elvora Health** is a premium, complete clinic management SaaS platform designed for private medical practices in Uzbekistan, developed for the **IT Live** investor selection presentation.

---

## 🎨 Visual Identity & Color System

The platform features a refined, modern international healthcare aesthetic:
- **Deep Midnight Navy:** `#101C2C` (Contrast, primary typography, dark footer)
- **Rich Emerald Teal:** `#087F72` (Primary brand color, primary CTAs, active highlights)
- **Fresh Mint:** `#DDF5EB` (Accents, badges, subtle container backgrounds)
- **Warm Off-White:** `#F8FAF8` (Page backdrop, section backgrounds)
- **Pure White:** `#FFFFFF` (Surface cards, dialogs, dropdowns)
- **Soft Lavender Accent:** `#EAE7FF` (Subtle visual contrast pills)
- **Muted Slate:** `#687586` (Secondary and helper text)
- **Subtle Borders:** `#E6EBEF` (Restrained card & section borders)

---

## 🚀 Ishga tushirish (Quick Start)

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Rivojlantirish serverini ishga tushirish
npm run dev

# 3. Brauzerda ochish
# http://localhost:5173/
```

### Production Build & Automated System Tests:
```bash
# Production yig'masi (Vite + TypeScript + Tailwind)
npm run build

# 17 ta avtomatlashtirilgan tizim testlari
npx tsx src/tests/systemTest.ts
```

---

## 🗺️ Tizim arxitekturasi va marshrutlar (Route Map)

### A. Ommaviy veb-sayt (Public Web Experience)
1. **Public Landing Page — [`/`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/public/LandingPage.tsx)**
   - **Navigation:** Logo, wordmark, Product, Features, Solutions, Pricing, FAQ, Sign In, "Try the demo" CTA.
   - **Hero Section:** "Run your clinic with clarity." / "Klinikangizni aniq va samarali boshqarish."
     - GSAP va ScrollTrigger kirish animatsiyalari.
     - O'ng tomonda statik skrinshot emas, real interaktiv React komponenti (`HeroProductPreview`) bilan jonli dashboard namunasi.
   - **Trust / Value Strip:** Zero Data Leakage, ziddiyatsiz qabullar, sof kassa, milliy standartlar.
   - **Problem & Solution:** Eski qog'oz/chat uslubidagi muammolar va Elvora Health keltiradigan yechimlar solishtirmasi.
   - **Feature Showcase:** Bemorlar, navbat, shifokorlar va moliya bo'yicha chuqur tahlillar.
   - **Elvora Insights™ Showcase:** Imzo intellektual modulning jonli namoyishi (haqiqiy va taxminiy hisob-kitoblar farqlangan holda).
   - **How It Works:** 3 bosqichli ishga tushirish jarayoni.
   - **Tariflar (Pricing):** Oylik va yillik (-15% chegirma) kommutatorli Basic, Pro va Business rejalari.
   - **FAQ:** 6 ta amaliy savol-javob akordeoni.
   - **Public Footer:** Barcha bo'limlarga havolalar va aloqa rekvizitlari.

2. **Autentifikatsiya sahifasi — [`/login`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/public/LoginPage.tsx)**
   - Login, parol va parolni ko'rsatish/yashirish tugmasi.
   - Investorlar uchun **tezkor demo rollari** (*Rahbar/Admin*, *Registrator*, *Shifokor*).
   - Bosh sahifaga qaytish havolasi va to'g'ridan-to'g'ri `/app/dashboard` ga yo'naltirish.

---

### B. Boshqaruv SaaS ilovasi (Clinical SaaS Management Suite — `/app/*`)
1. **Boshqaruv paneli — [`/app/dashboard`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/DashboardPage.tsx)**
   - Bugun, Oxirgi 7 kun, Oxirgi 30 kun va Barcha davr bo'yicha hisoblanadigan jonli KPIlar: *Tushum, Chiqim, Sof operatsion natija, Shifokorlar bandligi*.
   - Recharts grafiklari, shifokorlar bandlik foizlari va jonli kutish navbati.
   - Elvora Insights aqlli operatsion xulosasi kartasi.

2. **Bemorlar kartotekasi — [`/app/patients`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/PatientsPage.tsx)**
   - Bemorlar ro'yxati, ism/telefon/manzil bo'yicha qidiruv, jins filtri, sahifalash (pagination).
   - Yangi bemor qo'shish, tahrirlash, qabullar tarixi drawer'i va o'chirish tasdiqlash modallari.

3. **Qabullar va navbat — [`/app/appointments`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/AppointmentsPage.tsx)**
   - **Jonli Kanban navbat doskasi**: *Kutish zalida*, *Qabulda*, *Yakunlangan*, *Kelmagan/Bekor*.
   - **Double-booking va tanaffus ziddiyatlarini avtomatik bloklash**.
   - Navbatdagi kutish vaqtini dinamik hisoblash (~15 daqiqa).
   - Simulyatsiya qilingan SMS/Telegram eslatma yuborish moduli.
   - Qabullarni boshqa sanaga ko'chirish (Reschedule).

4. **Shifokorlar va ish jadvali — [`/app/doctors`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/DoctorsPage.tsx)**
   - Shifokorlar shtati (Kardiolog, Terapevt, Nevropatolog, Pediatr, Jarroh, Ginekolog).
   - Ish soatlari, kunlari, tushlik tanaffuslari va tanlangan sanadagi real bandlik (occupancy) foizi.

5. **Moliya va kassa — [`/app/finance`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/FinancePage.tsx)**
   - Kassaga kirim to'lovini qabul qilish va chiqim xarajatlarini qayd etish.
   - Xarajat toifalari taqsimoti doiraviy grafigi.
   - Tranzaksiyani sababi bilan bekor qilish (**Void transaction**) auditi.
   - **CSV eksport** va **Chop etish (Print)** imkoniyatlari.

6. **🌟 Elvora Insights™ — [`/app/insights`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/InsightsPage.tsx)**
   - **Platformaning asosiy imzo funksiyasi**:
     - *Bo'sh qabul vaqtlari (Idle capacity)* va yo'qotilayotgan potentsial daromad tahlili.
     - *No-show (Kelmagan bemorlar)* ko'rsatkichi va olinmagan xizmat haqlari hisobi.
     - *Xarajatlar o'sishi va eng katta xarajat moddasi nazorati*.
     - *Navbatdagi kutish to'siqlari (Bottlenecks)*.
   - Har bir tahlil: *1. Nima yuz berdi*, *2. Asoslovchi dalillar*, *3. Biznes ta'siri*, *4. Tavsiya etilgan amaliy harakat*, *5. To'g'ridan-to'g'ri modulga havola* bilan ta'minlangan.

7. **Hisobotlar — [`/app/reports`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/ReportsPage.tsx)**
   - Shifokorlar samaradorligi (keltirilgan tushum), qabullar holati, xarajatlar taqsimoti, CSV va chop etish.

8. **Xodimlar va rollar — [`/app/staff`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/StaffPage.tsx)**
   - Rolga asoslangan kirish huquqlari (RBAC) matritsasi (*Klinika rahbari*, *Registrator*, *Shifokor*) va taqdimot simulyatori.

9. **Obuna va tariflar — [`/app/subscription`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/SubscriptionPage.tsx)**
   - Basic (590 000 UZS), Pro (1 290 000 UZS), Business (2 490 000 UZS) rejalari taqqoslanishi va simulyatsiya qilingan rejani almashtirish.

10. **Klinika sozlamalari — [`/app/settings`](file:///c:/Users/user/Desktop/Elvora%20Health/src/pages/SettingsPage.tsx)**
    - Rekvizitlar, ish soatlari, standart qabul vaqti (30 daqiqa), eslatmalar va **Namunaviy ma'lumotlarni tiklash** (Reset Demo).

---

## 🧪 Avtomatlashtirilgan test natijalari

`npx tsx src/tests/systemTest.ts` buyrug'i quyidagi 17 ta muhim hisob-kitob va xavfsizlik qoidalarini tekshiradi:
- [x] Shifokor ish soatlari va tushlik tanaffuslari to'g'ri ayirilishi (480 daqiqa = 16 ta 30 daqiqalik slot).
- [x] Allaqachon band qilingan vaqtga takroriy qabul (double-booking) qat'iy bloklanishi.
- [x] Shifokorning tushlik tanaffusiga to'g'ri kelgan vaqtlarning rad etilishi.
- [x] Jami kirim barcha tasdiqlangan to'lovlar summasiga tengligi.
- [x] Jami chiqim barcha operatsion xarajatlar summasiga tengligi.
- [x] Sof operatsion natija = Kirim − Chiqim ekanligi.
- [x] Bekor qilingan (Void) tranzaksiyalarning kassa hisob-kitoblaridan chiqarib tashlanishi.
- [x] Xarajat toifalari taqsimoti va foiz nisbatlari to'g'ri hisoblanishi.
- [x] Elvora Insights™ yetarli statistik ma'lumotlarni tahlil qilishi va 5 ta aniq xulosa chiqarishi.
- [x] No-show ko'rsatkichi va yo'qotilgan xizmat haqi aniq hisoblanishi.
- [x] Xulosalar to'g'ri modullarga (`/app/appointments`, `/app/finance`) havolalar bilan ta'minlangani.

**Natija:** 17/17 test muvaffaqiyatli o'tdi.
