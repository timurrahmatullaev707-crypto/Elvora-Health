import React, { useState } from 'react';
import {
  Smartphone,
  Stethoscope,
  FileText,
  Activity,
  Bot,
  FlaskConical,
  Tv,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  tag: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
  color: string;
  features: string[];
}

export const DmedEcosystemMap: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('dmed-pro');

  const nodes: EcosystemNode[] = [
    {
      id: 'dmed-pro',
      name: 'DMED Pro',
      category: 'Shifokorlar va Klinikalar',
      tag: 'MIS / SaaS',
      icon: <Stethoscope size={20} />,
      title: 'Klinikalar va Shifokorlar Ish Kunini To‘liq Raqamlashtirish',
      description: 'Shifokor kabineti, 30 daqiqalik shaffof qabul slotlari, tushlik tanaffuslari himoyasi va bemorning to‘liq kasallik tarixi.',
      stats: '2 800+ Shifokorlar',
      color: '#0D7C74',
      features: [
        'Bemorlarni 1 tugma bilan xonaga chaqirish',
        'Double-booking va no-show oldini olish',
        'Xalqaro ICD-10 bo‘yicha tezkor tashxis qo‘yish',
        'Kassa va fiskal cheklar avtomatik generatsiyasi',
      ],
    },
    {
      id: 'dmed-app',
      name: 'DMED App',
      category: 'Bemorlar Mobil Ilovasi',
      tag: 'SuperApp',
      icon: <Smartphone size={20} />,
      title: 'Bemorning Shaxsiy Tibbiy Yordamchisi',
      description: 'Fuqarolarga o‘z salomatligini masofadan boshqarish, navbatsiz poliklinikaga yozilish va barcha tahlil natijalarini smartfonda ko‘rish imkoniyati.',
      stats: '450 000+ Foydalanuvchilar',
      color: '#0A9188',
      features: [
        'Aniq vaqtli QR-kodli elektron navbat chiptasi',
        'Navbatga 2 ta bemor qolganda SMS eslatma',
        'Qon tahlillari va MRT/KT natijalari bir kartada',
        'Oila a\'zolari (farzandlar, ota-ona) salomatligini qo‘shish',
      ],
    },
    {
      id: 'e-retsept',
      name: 'E-Retsept',
      category: 'Raqamli Dorixona Integratsiyasi',
      tag: 'E-Prescription',
      icon: <FileText size={20} />,
      title: 'Yagona Elektron Retseptlar Tizimi',
      description: 'Shifokor tomonidan raqamli imzolangan retseptlar dorixonalar tarmog‘iga avtomatik uzatiladi va noqonuniy dori vositalarini cheklaydi.',
      stats: '1 200+ Dorixonalar',
      color: '#085F59',
      features: [
        'QR-kodli xavfsiz elektron retsept',
        'Dozalar va dori mosligini avtomatik tekshirish',
        'Dorixonalarda dori mavjudligini ko‘rish',
        'Qog‘oz retseptlardagi xatoliklar va tushunarsiz yozuvlarga chek',
      ],
    },
    {
      id: 'queue-tv',
      name: 'E-Navbat & TV Tablo',
      category: 'Kutish Zali Displeyi',
      tag: 'Smart Display',
      icon: <Tv size={20} />,
      title: 'Kutish Zali Avtomatlashtirilgan Elektron Tablosi',
      description: 'Xususiy klinikalarning kutish zallaridagi ulkan LED/TV ekranlarida chaqirilgan chipta, xona va shifokor nomi ovozli e\'lon qilinadi.',
      stats: '99.8% Tartibli qabul',
      color: '#0D9488',
      features: [
        'Ovozli robot chaqiruv: "Chipta #04, 102-xona"',
        'Keyingi 3 ta kutayotgan bemor vaqti ko‘rinib turadi',
        'Kutish zalidagi janjal va noaniqliklarga 100% barham',
        'Infokiosk (o‘z-o‘ziga ro‘yxatdan o‘tish terminali) bilan integratsiya',
      ],
    },
    {
      id: 'dmed-ai',
      name: 'DMED AI & Muxlisa',
      category: 'Sun\'iy Intellekt Moduli',
      tag: 'AI Healthcare',
      icon: <Bot size={20} />,
      title: 'Klinika Operatsion Tahlili va Bemorlar Skriningi',
      description: 'Klinikadagi bo‘sh slotlarni tahlil qilish, eng ko‘p yo‘qotilayotgan daromad manbalarini aniqlash va bemorlarga birlamchi yo‘naltirish.',
      stats: '+22% Klinik rentabelligi',
      color: '#14B8A6',
      features: [
        'Klinika rahbariga har kunlik moliyaviy & operatsion xulosalar',
        'Kelmagan (no-show) bemorlar sabablarini prognozlash',
        'Shifokorlar ish yuklamasini optimallashtirish',
        'Shaffof matematik algoritmlar asosida ishlash',
      ],
    },
    {
      id: 'lab-lis',
      name: 'Laboratoriya (LIS)',
      category: 'Diagnostika Tizimi',
      tag: 'Lab System',
      icon: <FlaskConical size={20} />,
      title: 'Tahlillar va Diagnostika Avtomatizatsiyasi',
      description: 'Qon tahlillari, UTT (UZI), EKG va rentgen natijalari laboratoriya apparatlaridan to‘g‘ridan-to‘g‘ri bemorning elektron kartasiga tushadi.',
      stats: '15 daqiqada tahlil',
      color: '#0F766E',
      features: [
        'Shtrix-kodli probirkalar va xatoliksiz identifikatsiya',
        'Natija tayyor bo‘lishi bilan bemorga SMS xabar',
        'PDF tahlil blankasini xalqaro standartda chop etish',
        'Dinamik ko‘rsatkichlar grafikasi (gemoglobin, qand va h.k.)',
      ],
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div id="ecosystem" className="py-20 bg-gradient-to-b from-[#F4F7F5] via-white to-[#F4F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0D7C74] bg-[#E6F5F0] px-4 py-1.5 rounded-full border border-[#B7E2D8]">
            DMED 1-GA-1 RAQAMLI EKOTIZIMI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#132229] tracking-tight">
            Yagona Tibbiy Axborot Ekotizimi Mahsulotlari
          </h2>
          <p className="text-sm sm:text-base text-[#5F737B]">
            Har bir modul bir-biri bilan 100% integratsiyalashgan holda ishlaydi. O‘zaro bog‘langan mahsulotlarimizni bitta ekranda o‘rganing.
          </p>
        </div>

        {/* Interactive Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Product Nodes Selector */}
          <div className="lg:col-span-5 space-y-2.5">
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-white border-[#0D7C74] shadow-xl scale-[1.02]'
                      : 'bg-white/60 border-[#DFE8E4] hover:bg-white hover:border-[#B7E2D8]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-105 ${
                        isSelected
                          ? 'bg-[#0D7C74] text-white shadow-md'
                          : 'bg-[#E6F5F0] text-[#0D7C74]'
                      }`}
                    >
                      {node.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#132229]">
                          {node.name}
                        </h4>
                        <span className="text-[10px] font-bold text-[#0D7C74] bg-[#E6F5F0] px-2 py-0.5 rounded-md">
                          {node.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#5F737B] mt-0.5">{node.category}</p>
                    </div>
                  </div>

                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isSelected ? 'bg-[#0D7C74] scale-125 animate-pulse' : 'bg-[#DFE8E4]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Product Showcase Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-[#DFE8E4] p-6 sm:p-9 shadow-2xl space-y-6 relative overflow-hidden">
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0D7C74] via-[#0A9188] to-[#085F59]" />

              {/* Product Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pt-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F5F0] text-[#085F59] font-bold text-xs mb-2 border border-[#B7E2D8]">
                    <Sparkles size={13} className="text-[#0D7C74]" />
                    <span>{activeNode.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#132229] tracking-tight">
                    {activeNode.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#5F737B] font-semibold block">Ko‘rsatkich:</span>
                  <span className="text-lg font-black text-[#0D7C74]">
                    {activeNode.stats}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5F737B] leading-relaxed">
                {activeNode.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2.5 pt-4 border-t border-[#DFE8E4]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#132229]">
                  Asosiy imkoniyatlari:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeNode.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DFE8E4] flex items-start gap-2.5 text-xs text-[#132229] font-medium"
                    >
                      <CheckCircle2 size={16} className="text-[#0D7C74] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link to App */}
              <div className="pt-4 border-t border-[#DFE8E4] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#5F737B] flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0D7C74]" />
                  <span>Sog‘liqni Saqlash Vazirligi (SSV) standartlariga muvofiq</span>
                </span>

                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D7C74] text-white text-xs font-bold hover:bg-[#085F59] transition-all shadow-md active:scale-98"
                >
                  <span>Namoyishni ochish</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
