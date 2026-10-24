import React, { useState } from 'react';
import { FileText, X, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Upload } from 'lucide-react';
import { labExplainerService, LAB_REFERENCE_DATABASE } from '../../services/labExplainerService';
import { LabAnalysisResult } from '../../types/ai';
import { Button } from '../common/Button';

interface AiLabUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (result: LabAnalysisResult) => void;
}

export const AiLabUploadModal: React.FC<AiLabUploadModalProps> = ({
  isOpen,
  onClose,
  onSendToChat,
}) => {
  const [selectedTests, setSelectedTests] = useState<{ [code: string]: number }>({
    hb: 110, // Slightly low for demonstration
    glucose: 6.3, // Slightly high
    wbc: 6.8, // Normal
  });

  const [analysisResult, setAnalysisResult] = useState<LabAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleTestValueChange = (code: string, value: number) => {
    setSelectedTests((prev) => ({ ...prev, [code]: value }));
  };

  const handleLoadSample = (sampleType: 'anemia' | 'metabolic' | 'healthy') => {
    if (sampleType === 'anemia') {
      setSelectedTests({ hb: 105, esr: 18, wbc: 6.2 });
    } else if (sampleType === 'metabolic') {
      setSelectedTests({ glucose: 6.8, cholesterol: 5.9, alt: 48 });
    } else {
      setSelectedTests({ hb: 135, glucose: 4.8, wbc: 6.5, plt: 240 });
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const inputs = Object.entries(selectedTests).map(([testCode, value]) => ({
        testCode,
        value,
      }));
      const res = labExplainerService.analyzeResults(inputs, true);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSendAndClose = () => {
    if (analysisResult) {
      onSendToChat(analysisResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DFE8E4] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#06142B] to-[#0A2540] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00D2B4]/20 border border-[#00D2B4]/30 flex items-center justify-center text-[#00D2B4]">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Laboratoriya tahlillarini tushuntirish
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D2B4]/20 text-[#00D2B4] border border-[#00D2B4]/30">
                  Elvora AI Lab™
                </span>
              </h3>
              <p className="text-xs text-white/70">Me'yordan chetga chiqqan ko'rsatkichlarni aniqlash va tushuntirish</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#132229]">
          {/* Quick sample buttons */}
          <div className="flex items-center justify-between gap-2 flex-wrap bg-[#F8FAF9] p-3 rounded-2xl border border-[#DFE8E4]">
            <span className="text-xs font-semibold text-[#5F737B]">Tezkor namunalar:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLoadSample('anemia')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DFE8E4] hover:border-[#008BFF] text-[11px] font-medium"
              >
                Kamqonlik (Anemiya)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('metabolic')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DFE8E4] hover:border-[#008BFF] text-[11px] font-medium"
              >
                Shakar / Xolesterin
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('healthy')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DFE8E4] hover:border-[#059669] text-[11px] font-medium"
              >
                Normal panel
              </button>
            </div>
          </div>

          {/* Test entries grid */}
          <div>
            <h4 className="font-bold text-sm text-[#132229] mb-2.5">
              Tahlil ko'rsatkichlarini kiriting:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LAB_REFERENCE_DATABASE.map((test) => {
                const currentVal = selectedTests[test.code];
                const isSelected = currentVal !== undefined;

                return (
                  <div
                    key={test.code}
                    className={`p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-white border-[#008BFF]/40 shadow-xs'
                        : 'bg-[#F8FAF9] border-[#DFE8E4] opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#132229]">{test.nameUz}</span>
                      <span className="text-[10px] text-[#5F737B] bg-[#F0F4F2] px-2 py-0.5 rounded-md">
                        Me'yor: {test.min} - {test.max} {test.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Qiymat..."
                        value={currentVal !== undefined ? currentVal : ''}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v)) {
                            handleTestValueChange(test.code, v);
                          } else {
                            const copy = { ...selectedTests };
                            delete copy[test.code];
                            setSelectedTests(copy);
                          }
                        }}
                        className="w-full px-3 py-1.5 bg-[#F8FAF9] border border-[#DFE8E4] rounded-xl text-xs font-semibold focus:ring-1 focus:ring-[#008BFF] outline-hidden"
                      />
                      <span className="text-xs font-semibold text-[#5F737B] shrink-0">{test.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            disabled={isAnalyzing || Object.keys(selectedTests).length === 0}
            onClick={handleRunAnalysis}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00D2B4] via-[#008BFF] to-[#0D34B4] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            <Sparkles size={16} />
            {isAnalyzing ? 'Tahlil qilinmoqda...' : 'AI orqali tahlil qilish va tushuntirish'}
          </button>

          {/* Results display */}
          {analysisResult && (
            <div className="space-y-3 pt-3 border-t border-[#DFE8E4] animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#132229] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#059669]" />
                  Tahlil xulosasi
                </h4>
                <span className="text-[11px] text-[#5F737B] bg-[#F8FAF9] px-2.5 py-1 rounded-lg border border-[#DFE8E4]">
                  Vaqt: {analysisResult.analyzedAt}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EBF7FC] border border-[#BAE6FD] text-xs text-[#0A2540]">
                {analysisResult.overallSummaryUz}
              </div>

              {/* Items breakdown */}
              <div className="space-y-2">
                {analysisResult.items.map((item) => {
                  const badgeColor =
                    item.status === 'normal'
                      ? 'bg-[#E3F1EC] text-[#059669] border-[#A7F3D0]'
                      : item.status === 'low'
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : 'bg-[#FEECEE] text-[#E02D3C] border-[#FECDD3]';

                  return (
                    <div key={item.id} className="p-3 rounded-xl bg-white border border-[#DFE8E4] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{item.testName}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs">
                            {item.value} {item.unit}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeColor}`}>
                            {item.status === 'normal'
                              ? 'Me\'yorda'
                              : item.status === 'low'
                              ? 'Me\'yordan past'
                              : 'Me\'yordan baland'}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#5F737B] leading-relaxed">{item.explanationUz}</p>
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#92400E] leading-relaxed flex items-start gap-2">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-[#B45309]" />
                <span>{analysisResult.disclaimerUz}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAF9] border-t border-[#DFE8E4] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#5F737B]">
            <ShieldCheck size={16} className="text-[#059669]" />
            <span>Ma'lumotlar shifrlangan va xavfsiz</span>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>
              Yopish
            </Button>
            {analysisResult && (
              <Button
                size="sm"
                variant="primary"
                icon={<ArrowRight size={14} />}
                onClick={handleSendAndClose}
              >
                Chatga yuborish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
