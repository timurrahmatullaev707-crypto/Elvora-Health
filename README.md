# 🌿 Elvora Health — Premium Healthcare Management SaaS

> **"Bitta platforma. Klinikani samarali boshqarish."**  
> *"One platform. Better clinic management."*

O'zbekistondagi xususiy tibbiyot klinikalari uchun mo'ljallangan, zamonaviy, xavfsiz va aqlli boshqaruv SaaS platformasi.  
Loyixa **IT Live** investorlar tanlovi taqdimoti uchun to'liq ishchi holatda ishlab chiqilgan.

---

## 🚀 Ishga tushirish (Quick Start)

Loyihani lokal muhitda ishga tushirish juda oson:

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Rivojlantirish serverini ishga tushirish
npm run dev

# 3. Brauzerda ochish
# http://localhost:5173/
```

### Ishlab chiqarish (Production build) va testlar:
```bash
# Kodni yig'ish (TypeScript + Vite)
npm run build

# Avtomatlashtirilgan tizim testlarini ishga tushirish
npx tsx src/tests/systemTest.ts
```

---

## 💎 Dizayn tizimi va brend identifikatsiyasi

Platforma xususiy tibbiyot sohasining eng yuqori standartlariga mos holda **DMED** platformasining vizual sifatlaridan (yorug' fonlar, sokin tibbiy ranglar, o'qilishi qulay ma'lumotlar arxitekturasi, intellektual navigatsiya) ilhomlanib, o'ziga xos **Elvora Health** brendi ostida yaratildi.

### Ranglar palitrasi:
- **Primary Teal:** `#167D72`
- **Dark Teal:** `#125B54`
- **Pale Mint:** `#EAF6F2`
- **Main Background:** `#F5F8F7`
- **White Surfaces:** `#FFFFFF`
- **Main Text:** `#20312F`
- **Secondary Text:** `#71817D`
- **Borders:** `#E4EBE8`
- **Muvaffaqiyat (Success):** `#10B981` / `#059669`
- **Ogohlantirish (Warning):** `#F59E0B`
- **Xatolik (Danger):** `#EF4444`

---

## 📦 Amalga oshirilgan modullar (10 ta to'liq ishchi sahifa)

Har bir sahifa real biznes mantiq va ichki ma'lumotlar bazasi bilan bog'langan:

1. **Boshqaruv paneli (`/`)**
   - Kassaga tushum, xarajatlar va **Sof operatsion natija** (Net Operating Result) hisob-kitobi.
   - Bugun, Oxirgi 7 kun, Oxirgi 30 kun va Barcha davr filtrlari (barcha grafiklar va summalar filtrga mos dinamik yangilanadi).
   - Recharts asosidagi kirim-chiqim oqimi dinamikasi.
   - Shifokorlarning real bandlik foizi (occupancy rate) ko'rsatkichlari.
   - Jonli navbat va so'nggi tranzaksiyalar bloki.
   - **Elvora Insights** aqlli xulosalari qisqa anonsi.

2. **Bemorlar kartotekasi (`/patients`)**
   - Bemorlarni qidirish (ism, telefon, manzil), jinsi bo'yicha filtrlash va paginatsiya.
   - Yangi bemor qo'shish va tahrirlash modallari.
   - Bemorning to'liq qabullar va tashriflar tarixi bilan batafsil profili (Drawer).
   - Ma'lumotlarni o'chirishdan oldin tasdiqlash dialogi.

3. **Qabullar va jonli navbat (`/appointments`)**
   - **Jonli doska (Kanban Queue)**: *Kutish zalida*, *Qabulda*, *Yakunlangan*, *Kelmagan/Bekor*.
   - **Shifokor bandligini tekshirish va Double-booking ni oldini olish**: agar vaqt band bo'lsa yoki tanaffusga to'g'ri kelsa, tizim ogohlantiradi va ochiq slotlarni taklif qiladi.
   - Bemorlarni shifokor huzuriga chaqirish va navbatdagi kutish vaqtini hisoblash (~15 daqiqa).
   - **Simulyatsiya qilingan SMS/Telegram eslatma moduli**: qabuldan oldin bemorga tasdiqlash xabarnomasi yuborish flowsini namoyish etadi.
   - Qabullarni boshqa sanaga ko'chirish (Reschedule).

4. **Shifokorlar va ish jadvali (`/doctors`)**
   - Shifokorlar shtati (Kardiolog, Terapevt, Nevropatolog, Pediatr, Jarroh, Ginekolog).
   - Ish kunlari, boshlanish/tugash soatlari va tushlik tanaffuslari sozlamalari.
   - Har bir shifokorning tanlangan sanadagi real bandlik foizi (occupancy rate) hisoblanishi.

5. **Moliya va kassa boshqaruvi (`/finance`)**
   - To'lov kvitansiyalarini yaratish (Kirim) va xarajatlarni qayd etish (Chiqim).
   - Xarajatlar toifalari: *Ijara, Ish haqi, Kommunal xarajatlar, Tibbiy materiallar, Uskunalar, Boshqa*.
   - To'lov usullari: *Karta (Uzcard/Humo), Naqd, Payme/Click, Bank o'tkazmasi*.
   - Tranzaksiyani sabab ko'rsatgan holda bekor qilish (**Void transaction**) auditorlik jurnali.
   - Ma'lumotlarni **CSV formatida yuklab olish** va **Chop etish (Print preview)** imkoniyati.

6. **🌟 Elvora Insights™ — Imzoli intellektual tahlil markazi (`/insights`)**
   - Tizimning asosiy raqobatdosh ustunligi.
   - Bemorlar va moliyaviy ma'lumotlarni tashqariga chiqarmasdan, mahalliy rule-based algoritmlar orqali hisoblanadi:
     - **Bo'sh qabul slotlari va zaxira quvvat tahlili**: yo'qotilayotgan potentsial daromad hisob-kitobi.
     - **No-show (Kelmagan bemorlar) tahlili**: oxirgi 7 kundagi no-show foizi va yo'qotilgan xizmat haqlari.
     - **Xarajatlar o'sishi va yirik toifalar monitoringi**: umumiy chiqimning 40%+ qismini egallagan moddalarni aniqlash.
     - **Navbatdagi to'siqlar (Bottlenecks)**: 20 daqiqadan ortiq kutayotgan bemorlarni aniqlash.
   - Har bir tavsiya 5 qismdan iborat:
     1. *Nima sodir bo'ldi?*
     2. *Asoslovchi aniq ma'lumotlar va davr.*
     3. *Biznes va rentabellikka ta'siri.*
     4. *Tavsiya etilgan amaliy harakat.*
     5. *Tegishli modulga to'g'ridan-to'g'ri o'tish tugmasi.*

7. **Hisobotlar va analitika (`/reports`)**
   - Davrlar bo'yicha rentabellik hisoboti.
   - Shifokorlar samaradorligi: har bir mutaxassis klinika kassasiga keltirgan aniq tushum summasi.
   - Xarajatlar moddalarining doiraviy (Pie) taqsimoti.
   - Birlashtirilgan tahliliy hisobotni CSV formatida yuklash va chop etish.

8. **Xodimlar va rollar (`/staff`)**
   - Rolga asoslangan kirish huquqlari (**RBAC**) matritsasi: *Klinika rahbari (Admin)*, *Registratura xodimi*, *Shifokor*.
   - Investorlar uchun tepa panelda rollarni bir zumda almashtirib ko'rish imkoniyati.

9. **Obuna va tariflar (`/subscription`)**
   - **Basic (590 000 UZS/oy)**, **Pro (1 290 000 UZS/oy)**, **Business (2 490 000 UZS/oy)**.
   - Prezentatsiya paytida tariflarni almashtirish orqali tizim imkoniyatlari (masalan, Insights va kengaytirilgan hisobotlar) qanday faollashishini sinab ko'rish.

10. **Klinika sozlamalari (`/settings`)**
    - Klinika rekvizitlari, ish soatlari, standart qabul vaqti (30 daqiqa).
    - Valyuta va eslatmalar konfiguratsiyasi.
    - **"Namunaviy ma'lumotlarni tiklash"** tugmasi (istalgan vaqtda seed dataga qaytish).

---

## 🏛️ Kelajakdagi Backend arxitekturasi (FastAPI + PostgreSQL)

Frontend arxitekturasi to'liq Service/Repository qatlamiga ajratilgan:
- `patientService`
- `doctorService`
- `appointmentService`
- `financeService`
- `insightsService`

Ushbu qatlam hozirda brauzerning reaktiv xotirasida (localStorage fallback bilan) ishlaydi. Ishlab chiqarish muhitiga o'tishda bu servislar bir xil interfeys bilan **FastAPI** REST API chaqiruvlariga almashtiriladi:
- **Backend Stack:** Python 3.12, FastAPI, SQLAlchemy 2.0, Alembic migrations, Pydantic v2.
- **Ma'lumotlar bazasi:** PostgreSQL 16.
- **Xavfsizlik:** JWT OAuth2 authentication, Role-based Access Control (RBAC), bcrypt parollar shifrlanishi.

---

## 🎤 Investorlar uchun namoyish ketma-ketligi (Demo Flow)

1. **Boshqaruv panelini ochish:** Bugungi tushum, xarajatlar va sof operatsion natijani ko'rsatish.
2. **Filtrlarni o'zgartirish:** "Oxirgi 7 kun" yoki "Oxirgi 30 kun" tugmasini bosib, barcha ko'rsatkichlar sinxron o'zgarishini ko'rsatish.
3. **Qabullar va navbat:** Jonli doskadan kutayotgan bemorni shifokor huzuriga chaqirish (`Qabulga chaqirish`).
4. **Shifokor jadvali va ziddiyatlarni tekshirish:** Shifokorning band vaqtiga yangi qabul qo'yishga urinib, tizimning dublikat va tanaffus vaqtlarini avtomatik bloklashini ko'rsatish.
5. **Kassaga to'lov qabul qilish:** Yangi to'lov kiritish va kassa jurnali hamda bosh sahifadagi tushum darhol yangilanishini namoyish etish.
6. **Elvora Insights™ ochish:** Tizim 7 kunlik ma'lumotlar tahlilidan kelib chiqib qanday no-show, bo'sh slotlar va rentabellik tavsiyalarini hisoblab berganini ko'rsatish.
7. **Tariflar va rollarni almashtirish:** Tepa paneldan "Rol: Registrator" yoki "Tarif: Pro" qilib ko'rib, tizim moslashuvchanligini isbotlash.

---

## 🛡️ Hozirgi demo cheklovlari (Shaffoflik kafolati)
- **SMS xabarnomalar:** Haqiqiy SMS yuborilmaydi (Eskiz/PlayMobile shlyuziga ulanish shartnomadan so'ng faollashtiriladi), simulyatsiya qilingan modal xabar matnini ko'rsatadi.
- **To'lov tizimlari:** Payme va Click orqali real pul yechib olinmaydi, kassir tomonidan tasdiqlangan tushum sifatida qayd etiladi.
- **Lokal ma'lumotlar:** Ma'lumotlar brauzer xotirasida saqlanadi va server bazasi hisoblanmaydi.
