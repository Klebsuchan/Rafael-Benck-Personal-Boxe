import React, { useState } from 'react';
import { Check, Copy, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { buildWhatsAppUrl, WHATSAPP_TOPICS } from '../utils/bookingLogic';

interface WhatsAppSectionProps {
  onOpenModalBooking: () => void;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({
  onOpenModalBooking,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(WHATSAPP_TOPICS[0].id);
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeTopic =
    WHATSAPP_TOPICS.find((t) => t.id === selectedTopicId) ?? WHATSAPP_TOPICS[0];

  const fullMessage = customNote.trim()
    ? `${activeTopic.message} ${customNote.trim()}`
    : activeTopic.message;

  const whatsappUrl = buildWhatsAppUrl(selectedTopicId, customNote);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="whatsapp"
      aria-label="Atendimento direto pelo WhatsApp"
      className="relative mt-12 scroll-mt-6 md:mt-16"
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden border border-white/20 bg-gradient-to-br from-[#0D0D0D] via-[#090909] to-[#050505] p-5 sm:p-8 lg:p-10"
      >
        {/* Subtle 3D Diagonal Red Accent Layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-12 bg-[#E50914]/15 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#25D366]/8 to-transparent"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Pitch & Topic Selection */}
          <div className="lg:col-span-7">
            <p className="font-condensed text-xs font-extrabold tracking-[0.2em] text-[#E50914] uppercase sm:text-sm">
              ATENDIMENTO DIRETO &amp; PERSONALIZADO
            </p>
            <h2 className="mt-1.5 font-display text-[32px] leading-[0.95] text-white uppercase sm:text-[40px] lg:text-[48px]">
              TIRE SUAS DÚVIDAS NO WHATSAPP
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              Quer conversar sobre qual plano combina com seu objetivo, disponibilidade de horários ou montar um treino sob medida? Escolha o assunto e fale direto comigo.
            </p>

            {/* Topic Selector */}
            <div className="mt-5">
              <span className="mb-2 block font-condensed text-xs font-bold tracking-wider text-white/60 uppercase">
                SELECIONE O ASSUNTO DA CONVERSA:
              </span>
              <div className="flex flex-wrap gap-2">
                {WHATSAPP_TOPICS.map((topic) => {
                  const isActive = topic.id === selectedTopicId;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopicId(topic.id)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-3.5 py-1.5 font-condensed text-xs font-bold tracking-wider uppercase transition-colors sm:text-sm ${
                        isActive
                          ? 'border-[#E50914] bg-[#E50914] text-white'
                          : 'border-white/30 bg-black/60 text-white/85 hover:border-[#E50914] hover:bg-[#E50914] hover:text-white'
                      }`}
                    >
                      {topic.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Interactive Chat Card & Direct Action */}
          <div className="lg:col-span-5">
            <div className="border border-white/15 bg-black/80 p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-condensed text-sm font-extrabold tracking-wide text-white uppercase">
                      RAFAEL BENCK · WHATSAPP
                    </p>
                    <p className="text-[11px] text-white/55">
                      Resposta rápida para dúvidas e horários
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  aria-label="Copiar mensagem para WhatsApp"
                  className="inline-flex items-center gap-1 border border-white/20 px-2.5 py-1 text-[11px] font-medium text-white/75 transition-colors hover:border-white/50 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-[#25D366]" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 border border-white/10 bg-[#0E0E0E] p-3 text-xs leading-relaxed text-white/85 sm:text-[13px]">
                “{fullMessage}”
              </div>

              <div className="mt-3">
                <label htmlFor="whatsapp-note" className="sr-only">
                  Observação opcional (ex: seu objetivo ou melhor horário)
                </label>
                <input
                  id="whatsapp-note"
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Adicionar horário ou objetivo (opcional)..."
                  className="w-full border border-white/15 bg-[#080808] px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-[#25D366] focus:outline-none sm:text-sm"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 font-condensed text-[15px] font-extrabold tracking-widest text-black uppercase transition-colors hover:bg-[#1fb858] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageCircle className="h-4 w-4 stroke-[2.5]" />
                  CONVERSAR NO WHATSAPP
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </a>

                <button
                  type="button"
                  onClick={onOpenModalBooking}
                  className="w-full border border-white/25 bg-transparent py-2.5 font-condensed text-xs font-bold tracking-widest text-white/80 uppercase transition-colors hover:border-[#E50914] hover:text-white"
                >
                  OU AGENDAR PELO FORMULÁRIO DO SITE
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
