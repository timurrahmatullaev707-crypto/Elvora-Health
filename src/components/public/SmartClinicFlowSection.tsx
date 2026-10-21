import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Building,
  UserCheck,
  ChevronRight,
  FileCheck2,
  Tv,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface DemoQueueItem {
  id: string;
  ticketNumber: string;
  patientName: string;
  doctorName: string;
  roomNumber: string;
  status: 'qabulda' | 'kutmoqda' | 'yakunlandi';
  estimatedWaitMinutes: number;
}

export const SmartClinicFlowSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active Phase tab in journey: 1: Ro'yxatdan o'tish, 2: E-Navbat, 3: Shifokor ko'rigi, 4: Retsept & Chiqish
  const [activePhase, setActivePhase] = useState<number>(2);

  // Local simulated queue state
  const [currentTicketNumber, setCurrentTicketNumber] = useState<number>(104);
  const [consultationTimer, setConsultationTimer] = useState<number>(12); // minutes in consultation

  const initialQueue: DemoQueueItem[] = [
    {
      id: 'q-1',
      ticketNumber: '#A-104',
      patientName: 'Dilshod Rahimov',
      doctorName: 'Dr. Nilufar Karimova',
      roomNumber: '105-xona',
      status: 'qabulda',
      estimatedWaitMinutes: 0,
    },
    {
      id: 'q-2',
      ticketNumber: '#A-105',
      patientName: 'Shahnoza Aliyeva',
      doctorName: 'Dr. Nilufar Karimova',
      roomNumber: '105-xona',
      status: 'kutmoqda',
      estimatedWaitMinutes: 6,
    },
    {
      id: 'q-3',
      ticketNumber: '#A-106',
      patientName: 'Jamshid Mahmudov',
      doctorName: 'Dr. Nilufar Karimova',
      roomNumber: '105-xona',
      status: 'kutmoqda',
      estimatedWaitMinutes: 18,
    },
    {
      id: 'q-4',
      ticketNumber: '#A-107',
      patientName: 'Madina Olimova',
      doctorName: 'Dr. Nilufar Karimova',
      roomNumber: '105-xona',
      status: 'kutmoqda',
      estimatedWaitMinutes: 30,
    },
  ];

  const [queue, setQueue] = useState<DemoQueueItem[]>(initialQueue);
  const [completedTickets, setCompletedTickets] = useState<string[]>(['#A-102', '#A-103']);
  const [justAdvanced, setJustAdvanced] = useState(false);

  // Advance queue
  const handleNextPatient = () => {
    setJustAdvanced(true);
    setTimeout(() => setJustAdvanced(false), 800);

    setQueue((prevQueue) => {
      if (prevQueue.length === 0) return prevQueue;

      const current = prevQueue[0];
      setCompletedTickets((completed) => [current.ticketNumber, ...completed.slice(0, 3)]);

      // The second person becomes 'qabulda'
      const remaining = prevQueue.slice(1);
      if (remaining.length > 0) {
        remaining[0].status = 'qabulda';
        remaining[0].estimatedWaitMinutes = 0;
      }

      // Decrement wait minutes for others
      const updated = remaining.map((item, idx) => ({
        ...item,
        estimatedWaitMinutes: Math.max(0, (idx) * 12),
      }));

      // If queue is getting short, add a new simulated patient
      if (updated.length < 3) {
        const nextNum = currentTicketNumber + updated.length + 2;
        const sampleNames = ['Gulbahor Karimova', 'Farhod Yusupov', 'Shoira Mirzayeva', 'Rustam Saidov'];
        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        updated.push({
          id: `q-${Date.now()}`,
          ticketNumber: `#A-${nextNum}`,
          patientName: randomName,
          doctorName: 'Dr. Nilufar Karimova',
          roomNumber: '105-xona',
          status: 'kutmoqda',
          estimatedWaitMinutes: updated.length * 12,
        });
      }

      return updated;
    });

    setConsultationTimer(1);
  };

  // Add demo patient
  const handleAddPatient = () => {
    const nextNum = currentTicketNumber + queue.length + 1;
    const sampleNames = ['Malika Azizova', 'Akmal Zokirov', 'Barno Rahimova', 'Sherzod Qodirov'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];

    setQueue((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}`,
        ticketNumber: `#A-${nextNum}`,
        patientName: randomName,
        doctorName: 'Dr. Nilufar Karimova',
        roomNumber: '105-xona',
        status: 'kutmoqda',
        estimatedWaitMinutes: prev.length * 12,
      },
    ]);
  };

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.smart-flow-reveal', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    },
    []
  );

  const activePatient = queue.find((q) => q.status === 'qabulda') || queue[0];

  const journeyPhases = [
    {
      num: 1,
      title: 'Bemor ro‘yxatga olish',
      desc: 'Onlayn yoki registratura orqali E-talon shakllantiriladi.',
      icon: Users,
    },
    {
      num: 2,
      title: 'E-Navbat tablosi',
      desc: 'Kutish zalidagi raqamli ekranda real vaqtda yangilanadi.',
      icon: Tv,
    },
    {
      num: 3,
      title: 'Shifokor ko‘rigi',
      desc: 'Shifokor kabinetida qabul, anamnez va raqamli tekshiruv.',
      icon: Stethoscope,
    },
    {
      num: 4,
      title: 'Tashrif yakunlandi',
      desc: 'Elektron retsept, xizmatlar to‘lovi va qabul xulosasi.',
      icon: FileCheck2,
    },
  ];

  return (
    <section id="smart-flow" ref={containerRef} className="py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CDEBDD] text-xs font-bold text-[#0F4C3C]">
            <Sparkles size={14} className="text-[#176B55]" />
            <span>Signature Feature • Elvora Smart Flow</span>
          </div>

          <h2 className="section-headline text-[#172923]">
            Raqamli klinika oqimi: navbatsiz va tartibli g‘amxo‘rlik.
          </h2>

          <p className="text-lg text-[#68756F] font-normal leading-relaxed">
            Qabulga yozilishdan boshlab, shifokor ko‘rigi va elektron retseptgacha — barcha bosqichlar yagona aqlli tizimda bog‘langan.
          </p>
        </div>

        {/* 4-Step Journey Interactive Tabs */}
        <div className="smart-flow-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {journeyPhases.map((phase) => {
            const Icon = phase.icon;
            const isActive = activePhase === phase.num;
            return (
              <div
                key={phase.num}
                onClick={() => setActivePhase(phase.num)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-[#176B55] bg-[#EBF6F0] shadow-md -translate-y-1'
                    : 'border-[#E2E8E3] bg-[#F7F8F5] hover:border-[#CDEBDD]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        isActive ? 'bg-[#176B55] text-white' : 'bg-white text-[#68756F]'
                      }`}
                    >
                      0{phase.num}-bosqich
                    </span>
                    <Icon
                      size={20}
                      className={isActive ? 'text-[#176B55]' : 'text-[#68756F]'}
                    />
                  </div>
                  <h3 className="text-base font-extrabold text-[#172923]">{phase.title}</h3>
                  <p className="text-xs text-[#68756F] leading-relaxed">{phase.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8E3]/60 flex items-center justify-between text-xs font-bold">
                  <span className={isActive ? 'text-[#176B55]' : 'text-[#68756F]'}>
                    {isActive ? 'Ko‘rilmoqda' : 'Tafsilotlar'}
                  </span>
                  <ChevronRight size={14} className={isActive ? 'text-[#176B55]' : 'text-[#68756F]'} />
                </div>
              </div>
            );
          })}
        </div>

        {/* STANDOUT INTERACTIVE LIVE DEMO QUEUE BOARD */}
        <div className="smart-flow-reveal rounded-3xl bg-[#172923] text-white p-6 sm:p-10 shadow-2xl overflow-hidden relative border border-[#263D36]">
          {/* Subtle Ambient Pulse Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#176B55]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Screen Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#176B55] flex items-center justify-center text-[#CDEBDD]">
                <Tv size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Kutish Zali Jonli E-Navbat Tablosi
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-[#CDEBDD]/80">
                  Elvora Central Clinic • Terapevt qabul bo‘limi (Frontend Simulyatsiyasi)
                </p>
              </div>
            </div>

            {/* Live Interactive Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleNextPatient}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B55] hover:bg-[#1B7C63] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Play size={14} className="fill-white" />
                <span>Keyingi bemorni chaqirish</span>
              </button>

              <button
                onClick={handleAddPatient}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
              >
                + Bemor qo‘shish
              </button>
            </div>
          </div>

          {/* Main Grid: Active Calling Ticket on Left, Upcoming Queue on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
            {/* Left 7 cols: CURRENT ACTIVE CONSULTATION */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#CDEBDD] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Hozir qabul qilinmoqda:</span>
              </div>

              {activePatient && (
                <div
                  className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E362F] to-[#12231E] border-2 transition-all duration-500 ${
                    justAdvanced
                      ? 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] scale-[1.01]'
                      : 'border-[#176B55]/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-bold text-[#CDEBDD] uppercase tracking-wider">
                        Talon Raqami
                      </span>
                      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
                        {activePatient.ticketNumber}
                      </div>
                    </div>

                    <div className="text-right sm:text-right">
                      <span className="text-xs font-bold text-[#CDEBDD] uppercase tracking-wider">
                        Shifokor Kabineti
                      </span>
                      <div className="text-2xl font-black text-emerald-400 mt-1">
                        {activePatient.roomNumber}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-white/60">Bemor F.I.Sh.:</span>
                      <div className="text-lg font-bold text-white">{activePatient.patientName}</div>
                      <span className="text-xs text-emerald-400 font-semibold">Qabul jarayoni faol</span>
                    </div>

                    <div>
                      <span className="text-xs text-white/60">Qabul qilayotgan shifokor:</span>
                      <div className="text-lg font-bold text-white">{activePatient.doctorName}</div>
                      <span className="text-xs text-[#CDEBDD]/80">Oliy toifali terapevt</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-emerald-400" />
                      <span>Qabul boshlanganiga: ~{consultationTimer} daqiqa</span>
                    </div>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-[#CDEBDD]">
                      Taxminiy davomiyligi: ~25 daq
                    </span>
                  </div>
                </div>
              )}

              {/* Doctor Availability Matrix */}
              <div className="pt-2">
                <span className="text-xs font-bold text-white/70 block mb-2">
                  Klinika mutaxassislari holati (Demo Matrix):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'Dr. Nilufar K.', status: 'Qabulda', color: 'bg-emerald-500' },
                    { name: 'Dr. Alisher U.', status: 'Tayyor', color: 'bg-blue-400' },
                    { name: 'Dr. Rayhon R.', status: 'Qabulda', color: 'bg-emerald-500' },
                    { name: 'Dr. Bobur M.', status: 'Tanaffus', color: 'bg-amber-400' },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between"
                    >
                      <span className="font-semibold text-white/90 truncate mr-1">{doc.name}</span>
                      <span className="flex items-center gap-1 text-[10px] text-white/70 shrink-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${doc.color}`} />
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: UPCOMING QUEUE LIST */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#CDEBDD]">
                  Kutayotgan bemorlar ro‘yxati:
                </span>
                <span className="text-xs text-white/60">
                  Jami: {queue.filter((q) => q.status === 'kutmoqda').length} ta
                </span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {queue
                  .filter((q) => q.status === 'kutmoqda')
                  .map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#CDEBDD] text-[#0F4C3C] font-extrabold flex items-center justify-center text-xs">
                          {item.ticketNumber}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.patientName}</div>
                          <div className="text-[11px] text-[#CDEBDD]/80">
                            Navbat: #{idx + 1}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-emerald-400 block">
                          ~{item.estimatedWaitMinutes} daq
                        </span>
                        <span className="text-[9px] text-white/50">Taxminiy kutish</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Recently Completed */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>So‘nggi qabul qilinganlar:</span>
                <div className="flex gap-1.5">
                  {completedTickets.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transparency sample label */}
          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/50 text-center">
            * Eslatma: Ushbu navbat ko‘rsatkichlari va kutish hisoblagichlari ko‘rgazmali dasturiy simulyatsiya (Demo) bo‘lib, real operatsion tibbiy ma’lumotlarni aks ettirmaydi.
          </div>
        </div>
      </div>
    </section>
  );
};
