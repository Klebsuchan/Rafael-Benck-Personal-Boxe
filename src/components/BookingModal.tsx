import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, Phone, User } from 'lucide-react';
import {
  BookingInput,
  BookingRecord,
  MODALITIES,
  PLANS,
  createBookingRecord,
  formatWhatsAppNumber,
  validateBookingInput,
} from '../utils/bookingLogic';

interface BookingModalProps {
  isOpen: boolean;
  initialPlanId: 'basico' | 'premium' | 'elite';
  initialModalityId: string;
  onClose: () => void;
  onBooked: (record: BookingRecord) => void;
  bookingsCount: number;
}

const DAYS = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const TIMES = ['07:00', '08:00', '12:00', '17:30', '18:30', '19:30'];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialPlanId,
  initialModalityId,
  onClose,
  onBooked,
  bookingsCount,
}) => {
  const [formData, setFormData] = useState<BookingInput>({
    studentName: '',
    whatsapp: '',
    planId: initialPlanId,
    modalityId: initialModalityId,
    preferredDay: 'Segunda-feira',
    preferredTime: '19:30',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingInput, string>>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        planId: initialPlanId,
        modalityId: initialModalityId,
      }));
      setErrors({});
      setConfirmedBooking(null);
    }
  }, [isOpen, initialPlanId, initialModalityId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingInput(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const record = createBookingRecord(formData, String(bookingsCount + 1));
    setConfirmedBooking(record);
    onBooked(record);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md border border-white/20 bg-[#0A0A0A] p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="font-condensed text-xs font-bold tracking-[0.18em] text-[#E50914] uppercase">
              TREINO EXPERIMENTAL &amp; MATRÍCULA
            </p>
            <h2 id="booking-modal-title" className="font-display text-2xl tracking-wide uppercase mt-0.5">
              AGENDE SUA AULA
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de agendamento"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-[#E50914] hover:bg-[#E50914] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {confirmedBooking ? (
          <div className="mt-6 space-y-5" data-testid="booking-confirmation">
            <div className="border border-[#E50914]/50 bg-[#E50914]/10 p-4 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-[#E50914] mt-0.5" />
              <div>
                <h3 className="font-condensed text-lg font-extrabold uppercase tracking-wide text-white">
                  AGENDAMENTO CONFIRMADO!
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Sua solicitação foi registrada. Rafael Benck entrará em contato via WhatsApp para confirmar os detalhes do seu treino.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 border border-white/15 bg-black p-4 text-sm">
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-white/60">Aluno</span>
                <span className="font-semibold text-white">{confirmedBooking.studentName}</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-white/60">WhatsApp</span>
                <span className="font-semibold tabular-nums text-white">{confirmedBooking.whatsapp}</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-white/60">Plano</span>
                <span className="font-semibold text-[#E50914]">
                  {confirmedBooking.planName} · R$ {confirmedBooking.monthlyPrice}/mês
                </span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-white/60">Modalidade</span>
                <span className="font-semibold text-white">{confirmedBooking.modalityTitle}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/60">Dia &amp; Horário</span>
                <span className="font-semibold tabular-nums text-white">
                  {confirmedBooking.preferredDay} às {confirmedBooking.preferredTime}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#E50914] py-3.5 font-condensed text-base font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812]"
            >
              CONCLUIR
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <label htmlFor="studentName" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-white/80 uppercase">
                <User className="h-3.5 w-3.5 text-[#E50914]" />
                Nome completo
              </label>
              <input
                id="studentName"
                type="text"
                value={formData.studentName}
                onChange={(e) => {
                  setFormData({ ...formData, studentName: e.target.value });
                  if (errors.studentName) setErrors({ ...errors, studentName: undefined });
                }}
                placeholder="Ex: Lucas Ferreira"
                className="w-full border border-white/20 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#E50914] focus:outline-none"
              />
              {errors.studentName && (
                <p className="mt-1 text-xs font-medium text-[#ff4d57]" role="alert">
                  {errors.studentName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-white/80 uppercase">
                <Phone className="h-3.5 w-3.5 text-[#E50914]" />
                WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => {
                  const formatted = formatWhatsAppNumber(e.target.value);
                  setFormData({ ...formData, whatsapp: formatted });
                  if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                }}
                placeholder="(11) 99999-9999"
                className="w-full border border-white/20 bg-black px-3.5 py-2.5 text-sm tabular-nums text-white placeholder:text-white/35 focus:border-[#E50914] focus:outline-none"
              />
              {errors.whatsapp && (
                <p className="mt-1 text-xs font-medium text-[#ff4d57]" role="alert">
                  {errors.whatsapp}
                </p>
              )}
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-bold tracking-wider text-white/80 uppercase">
                Plano escolhido
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map((plan) => {
                  const active = formData.planId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, planId: plan.id })}
                      aria-pressed={active}
                      className={`border px-2 py-2.5 text-center transition-colors ${
                        active
                          ? 'border-[#E50914] bg-[#E50914] text-white'
                          : 'border-white/20 bg-black text-white/80 hover:border-white/50'
                      }`}
                    >
                      <span className="block font-condensed text-sm font-extrabold tracking-wide uppercase">
                        {plan.name}
                      </span>
                      <span className="block text-[11px] tabular-nums opacity-90">
                        {plan.priceFormatted}/mês
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="modalityId" className="mb-1.5 block text-xs font-bold tracking-wider text-white/80 uppercase">
                Modalidade
              </label>
              <select
                id="modalityId"
                value={formData.modalityId}
                onChange={(e) => setFormData({ ...formData, modalityId: e.target.value })}
                className="w-full border border-white/20 bg-black px-3.5 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
              >
                {MODALITIES.map((mod) => (
                  <option key={mod.id} value={mod.id} className="bg-black text-white">
                    {mod.number} · {mod.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="preferredDay" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-white/80 uppercase">
                  <Calendar className="h-3.5 w-3.5 text-[#E50914]" />
                  Dia
                </label>
                <select
                  id="preferredDay"
                  value={formData.preferredDay}
                  onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                  className="w-full border border-white/20 bg-black px-3 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
                >
                  {DAYS.map((day) => (
                    <option key={day} value={day} className="bg-black text-white">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="preferredTime" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-white/80 uppercase">
                  <Clock className="h-3.5 w-3.5 text-[#E50914]" />
                  Horário
                </label>
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full border border-white/20 bg-black px-3 py-2.5 text-sm tabular-nums text-white focus:border-[#E50914] focus:outline-none"
                >
                  {TIMES.map((time) => (
                    <option key={time} value={time} className="bg-black text-white">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-[#E50914] py-3.5 font-condensed text-base font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812]"
            >
              CONFIRMAR AGENDAMENTO
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
