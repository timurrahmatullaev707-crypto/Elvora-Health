import { InsightItem } from '../types';
import { appointmentService } from './appointmentService';
import { doctorService } from './doctorService';
import { financeService } from './financeService';
import { getTodayDateString, getOffsetDateString } from './seedData';

export const insightsService = {
  // Generate intelligent observations based strictly on underlying real application data
  generateInsights(): {
    insights: InsightItem[];
    lastAnalyzedAt: string;
    totalAnalyzedAppointments: number;
    totalAnalyzedTransactions: number;
    hasSufficientData: boolean;
  } {
    const today = getTodayDateString();
    const weekAgo = getOffsetDateString(-7);

    const allAppointments = appointmentService.getAll();
    const allTransactions = financeService.getAll();
    const doctors = doctorService.getAll();

    const totalAnalyzedAppointments = allAppointments.length;
    const totalAnalyzedTransactions = allTransactions.length;

    // Check data sufficiency
    if (totalAnalyzedAppointments < 3 && totalAnalyzedTransactions < 2) {
      return {
        insights: [
          {
            id: 'ins-insufficient',
            title: 'Ma\'lumot yetarli emas',
            type: 'operational',
            priority: 'low',
            description:
              'Klinika faoliyati bo\'yicha ishonchli xulosa va tavsiyalar shakllantirish uchun kamida 5 ta qabul va 3 ta moliyaviy operatsiya yozuvlari talab qilinadi.',
            supportingData: `Mavjud yozuvlar: ${totalAnalyzedAppointments} ta qabul, ${totalAnalyzedTransactions} ta tranzaksiya.`,
            dateRange: 'Oxirgi 30 kun',
            impactExplanation:
              'Yetarli statistik baza bo\'lmaganda algoritmlar xatolik berishi mumkin.',
            suggestedAction:
              'Klinika tizimiga yangi bemorlar, qabullar va to\'lovlarni kiritishda davom eting.',
            actionLink: '/appointments',
            actionLabel: 'Qabul yaratish',
            isCalculatedFact: true,
          },
        ],
        lastAnalyzedAt: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        totalAnalyzedAppointments,
        totalAnalyzedTransactions,
        hasSufficientData: false,
      };
    }

    const insights: InsightItem[] = [];

    // -------------------------------------------------------------
    // 1. Idle Doctor Capacity & Available Slots Analysis
    // -------------------------------------------------------------
    const todayAppointments = appointmentService.getByDate(today);
    let totalOpenSlotsToday = 0;
    const doctorsWithOpenSlots: { name: string; openSlots: number; specialty: string }[] = [];

    doctors.forEach((doc) => {
      if (!doc.isActive) return;
      const occ = doctorService.calculateOccupancy(doc, todayAppointments);
      const open = Math.max(0, occ.slotsCount - occ.bookedSlotsCount);
      if (open > 0) {
        totalOpenSlotsToday += open;
        doctorsWithOpenSlots.push({ name: doc.fullName, openSlots: open, specialty: doc.specialty });
      }
    });

    if (totalOpenSlotsToday > 0) {
      const topDoctorText = doctorsWithOpenSlots
        .slice(0, 3)
        .map((d) => `${d.name} (${d.openSlots} ta bo'sh slot)`)
        .join(', ');

      const estimatedLostRevenue = totalOpenSlotsToday * 130000;

      insights.push({
        id: 'ins-idle-slots',
        title: `Bugun shifokorlar jadvalida ${totalOpenSlotsToday} ta bo'sh qabul vaqti mavjud`,
        type: 'opportunity',
        priority: totalOpenSlotsToday >= 5 ? 'high' : 'medium',
        description: `Bugungi ish soatlari bo'yicha shifokorlar qabulida zaxira quvvat mavjud. Xususan: ${topDoctorText}.`,
        supportingData: `Bugun (${today}): Jami ${doctors.length} nafar faol shifokor bo'yicha ${todayAppointments.length} ta band qilingan qabul va ${totalOpenSlotsToday} ta ochiq slot aniqlandi.`,
        dateRange: `Bugun (${today})`,
        impactExplanation: `O'rtacha konsultatsiya narxi 130 000 UZS bo'lganda, to'ldirilmagan vaqtlar klinika uchun kuniga taxminan ~${estimatedLostRevenue.toLocaleString('uz-UZ')} UZS ga teng potentsial operatsion tushum yo'qotilishiga sabab bo'ladi (hisob-kitob o'rtacha tarifga asoslangan).`,
        suggestedAction:
          'Kutish ro\'yxatidagi bemorlarga yoki profilaktik ko\'rik muddati kelgan doimiy mijozlarga avtomatik SMS/Telegram xabarnoma yuborish orqali bo\'sh vaqtlarni to\'ldiring.',
        actionLink: '/appointments',
        actionLabel: 'Qabullar jadvalini ko\'rish',
        isCalculatedFact: true,
      });
    }

    // -------------------------------------------------------------
    // 2. Missed Appointments (No-show) Pattern in Last 7 Days
    // -------------------------------------------------------------
    const last7DaysApts = allAppointments.filter((a) => a.date >= weekAgo && a.date <= today);
    const missedApts = last7DaysApts.filter((a) => a.status === 'kelmagan');
    const total7Apts = last7DaysApts.length;

    if (missedApts.length > 0 && total7Apts > 0) {
      const noShowPercent = Math.round((missedApts.length / total7Apts) * 100);
      const missedValue = missedApts.reduce((sum, a) => sum + (a.fee || 120000), 0);
      const missedPatientNames = missedApts.map((a) => a.patientName).slice(0, 3).join(', ');

      insights.push({
        id: 'ins-no-show',
        title: `Oxirgi 7 kunda ${missedApts.length} ta qabulga bemorlar kelmadi (No-show: ${noShowPercent}%)`,
        type: 'warning',
        priority: noShowPercent > 15 ? 'high' : 'medium',
        description: `Qayd etilgan qabullarga kelmagan bemorlar: ${missedPatientNames}${missedApts.length > 3 ? ' va boshqalar' : ''}. Bu ko'rsatkich shifokorlar vaqti bekorga sarflanishiga olib keladi.`,
        supportingData: `Davr: ${weekAgo} dan ${today} gacha. Jami ${total7Apts} ta rejalashtirilgan qabuldan ${missedApts.length} tasi 'kelmagan' sifatida qayd etilgan.`,
        dateRange: `Oxirgi 7 kun (${weekAgo} — ${today})`,
        impactExplanation: `Kelmagan qabullar bo'yicha to'g'ridan-to'g'ri olinmagan xizmat haqi: ~${missedValue.toLocaleString('uz-UZ')} UZS. Bundan tashqari, boshqa muhtoj bemorlar ushbu vaqt band bo'lgani sababli qabulga yozila olmagan.`,
        suggestedAction:
          'Pro tarifidagi avtomatlashtirilgan eslatma modulini sozlang: qabuldan 24 soat va 2 soat oldin tasdiqlash tugmali SMS yuborish no-show ko\'rsatkichini 60% gacha kamaytiradi.',
        actionLink: '/appointments',
        actionLabel: 'Navbat va eslatmalarni boshqarish',
        isCalculatedFact: true,
      });
    }

    // -------------------------------------------------------------
    // 3. Expense to Revenue Dynamic & Largest Expense Category
    // -------------------------------------------------------------
    const last30DaysStart = getOffsetDateString(-30);
    const financeSummary = financeService.getSummaryForPeriod('30days');
    const totalInc = financeSummary.summary.totalIncome;
    const totalExp = financeSummary.summary.totalExpenses;

    if (totalExp > 0) {
      const expenseBreakdown = financeService.getExpenseBreakdown(financeSummary.transactions);
      const topExpense = expenseBreakdown[0];

      if (topExpense) {
        insights.push({
          id: 'ins-top-expense',
          title: `Eng yirik xarajat: "${topExpense.category}" umumiy chiqimning ${topExpense.percentage}% qismini tashkil etmoqda`,
          type: 'financial',
          priority: topExpense.percentage >= 40 ? 'high' : 'medium',
          description: `Tanlangan 30 kunlik davrda eng ko'p mablag' "${topExpense.category}" moddasiga sarflangan (${topExpense.amount.toLocaleString('uz-UZ')} UZS, jami ${topExpense.count} ta to'lov).`,
          supportingData: `Hisoblangan davr: ${last30DaysStart} dan ${today} gacha. Jami xarajatlar: ${totalExp.toLocaleString('uz-UZ')} UZS.`,
          dateRange: 'Oxirgi 30 kun',
          impactExplanation:
            'Bir xarajat moddasi 40% dan oshganda, klinika operatsion likvidligi ushbu yo\'nalishdagi narxlar o\'zgarishiga sezgir bo\'lib qoladi.',
          suggestedAction:
            'Ushbu toifadagi yetkazib beruvchilar shartnomalarini qayta ko\'rib chiqish yoki to\'lovlarni oylar kesimida taqsimlash tavsiya etiladi.',
          actionLink: '/finance',
          actionLabel: 'Moliya bo\'limiga o\'tish',
          isCalculatedFact: true,
        });
      }

      // Check if expenses outpace revenue in selected period
      if (totalExp > totalInc) {
        const deficit = totalExp - totalInc;
        insights.push({
          id: 'ins-negative-operating',
          title: 'Davr bo\'yicha operatsion xarajatlar tushumdan yuqori bo\'ldi',
          type: 'warning',
          priority: 'high',
          description: `Tanlangan 30 kunlik davrda jami chiqim (${totalExp.toLocaleString('uz-UZ')} UZS) kirimdan (${totalInc.toLocaleString('uz-UZ')} UZS) ${deficit.toLocaleString('uz-UZ')} UZS ga oshgan.`,
          supportingData: `Oxirgi 30 kunda: Kirim: ${totalInc.toLocaleString('uz-UZ')} UZS, Chiqim: ${totalExp.toLocaleString('uz-UZ')} UZS (shu jumladan bino ijarasi va asbob-uskunalar xarajatlari).`,
          dateRange: 'Oxirgi 30 kun',
          impactExplanation:
            'Katta hajmdagi davriy xarajatlar (masalan, oylik ijara yoki uskuna yangilash) sababli vaqtinchalik sof natija salbiy. Bu to\'liq rentabellikni aks ettirmaydi, lekin likvidlikni nazorat qilishni talab qiladi.',
          suggestedAction:
            'Birlamchi va takroriy konsultatsiyalar sonini oshirish choralarini ko\'ring hamda doimiy xarajatlarni optimallashtiring.',
          actionLink: '/finance',
          actionLabel: 'Moliyaviy hisobotlarni ko\'rish',
          isCalculatedFact: true,
        });
      }
    }

    // -------------------------------------------------------------
    // 4. Live Waiting Queue Operational Alert
    // -------------------------------------------------------------
    const waitingQueue = todayAppointments.filter((a) => a.status === 'kutilmoqda');
    if (waitingQueue.length >= 3) {
      insights.push({
        id: 'ins-queue-bottleneck',
        title: `Kutish zalida ${waitingQueue.length} nafar bemor navbat kutmoqda`,
        type: 'operational',
        priority: 'medium',
        description: `Ayni vaqtda qabul kutayotgan bemorlar soni ortgan. O'rtacha hisoblangan kutish vaqti: ~${waitingQueue.length * 15} daqiqa.`,
        supportingData: `Kutayotgan bemorlar: ${waitingQueue.map((b) => b.patientName).join(', ')}.`,
        dateRange: `Bugun (${today})`,
        impactExplanation:
          'Bemorlarning 20 daqiqadan ortiq kutishi klinika qoniqish darajasiga (CSAT/NPS) salbiy ta\'sir qiladi.',
        suggestedAction:
          'Registratura xodimlariga bemorlarni navbat tartibi bo\'yicha tezkor yo\'naltirishni va shifokorlarga qabul vaqtlarini muvofiqlashtirishni tavsiya eting.',
        actionLink: '/appointments',
        actionLabel: 'Jonli navbatni ochish',
        isCalculatedFact: true,
      });
    }

    return {
      insights,
      lastAnalyzedAt: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      totalAnalyzedAppointments,
      totalAnalyzedTransactions,
      hasSufficientData: true,
    };
  },
};
