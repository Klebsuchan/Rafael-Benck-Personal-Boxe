import React, { useRef, useState } from 'react';
import { ArrowRight, CalendarCheck, ChevronDown, Menu, X } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import rafaPortrait from '../rafa.png';
import { BrandLogo } from './components/BrandLogo';
import { BookingModal } from './components/BookingModal';
import { WhatsAppSection } from './components/WhatsAppSection';
import {
  ACHIEVEMENTS,
  BookingRecord,
  HERO_STATS,
  MODALITIES,
  PILLARS,
  PLANS,
  TESTIMONIALS,
} from './utils/bookingLogic';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [expandedModalityId, setExpandedModalityId] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPlanId, setBookingPlanId] = useState<'basico' | 'premium' | 'elite'>('premium');
  const [bookingModalityId, setBookingModalityId] = useState<string>('boxe-tradicional');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [socialToast, setSocialToast] = useState<string | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Refs for scroll-linked 3D parallax layers
  const heroRef = useRef<HTMLElement | null>(null);
  const sobreRef = useRef<HTMLElement | null>(null);
  const conquistasRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: sobreScroll } = useScroll({
    target: sobreRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: conquistasScroll } = useScroll({
    target: conquistasRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms (compositor-only translate/scale)
  const heroSlashY = useTransform(heroScroll, [0, 1], [0, prefersReducedMotion ? 0 : 72]);
  const heroPortraitY = useTransform(heroScroll, [0, 1], [0, prefersReducedMotion ? 0 : -44]);
  const heroTextY = useTransform(heroScroll, [0, 1], [0, prefersReducedMotion ? 0 : 28]);

  const sobreFrameY = useTransform(sobreScroll, [0, 1], [24, prefersReducedMotion ? 24 : -24]);
  const sobreImageY = useTransform(sobreScroll, [0, 1], [-22, prefersReducedMotion ? -22 : 22]);

  const conquistasShardX = useTransform(conquistasScroll, [0, 1], [-40, prefersReducedMotion ? -40 : 40]);
  const ctaShardX = useTransform(ctaScroll, [0, 1], [35, prefersReducedMotion ? 35 : -35]);

  // 3D pointer tilt for desktop Hero portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 22,
  });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const openBooking = (
    planId: 'basico' | 'premium' | 'elite' = 'premium',
    modalityId = 'boxe-tradicional'
  ) => {
    setBookingPlanId(planId);
    setBookingModalityId(modalityId);
    setBookingModalOpen(true);
    setMenuOpen(false);
  };

  const activePillar = selectedPillarId
    ? PILLARS.find((p) => p.id === selectedPillarId) ?? null
    : null;

  const handleSocialClick = (network: string) => {
    setSocialToast(`Perfil oficial @ciganoboxe no ${network}`);
    window.setTimeout(() => {
      setSocialToast((prev) =>
        prev === `Perfil oficial @ciganoboxe no ${network}` ? null : prev
      );
    }, 3000);
  };

  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <div className="w-full px-4 pb-12 pt-4 sm:px-6">
        {/* Header: Mobile hamburger; Desktop 3-zone top bar */}
        <header className="relative z-30 flex items-center justify-between gap-8 pb-4 md:pb-6">
          <BrandLogo className="shrink-0" />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegação desktop"
            className="hidden md:flex items-center gap-7 font-condensed text-[15px] font-bold tracking-wider text-white/85 uppercase"
          >
            <a
              href="#sobre"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#E50914]"
            >
              Sobre
            </a>
            <a
              href="#modalidades"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#E50914]"
            >
              Modalidades
            </a>
            <a
              href="#conquistas"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#E50914]"
            >
              Conquistas
            </a>
            <a
              href="#depoimentos"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#E50914]"
            >
              Depoimentos
            </a>
            <a
              href="#planos"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#E50914]"
            >
              Planos
            </a>
            <a
              href="#whatsapp"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#25D366]"
            >
              WhatsApp
            </a>
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden md:block shrink-0">
            <button
              type="button"
              onClick={() => openBooking('premium', 'boxe-tradicional')}
              className="whitespace-nowrap shrink-0 bg-[#E50914] px-5 py-2.5 font-condensed text-sm font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              AGENDE SUA AULA
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#E50914] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] md:hidden"
          >
            {menuOpen ? <X className="h-7 w-7 stroke-[2.2]" /> : <Menu className="h-7 w-7 stroke-[2.2]" />}
          </button>

          {/* Mobile Navigation Drawer */}
          {menuOpen && (
            <nav
              aria-label="Navegação principal"
              className="absolute right-0 top-13 w-full border border-white/20 bg-[#0B0B0B] p-4 shadow-2xl md:hidden"
            >
              <ul className="flex flex-col divide-y divide-white/10">
                <li>
                  <a
                    href="#sobre"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-[#E50914]"
                  >
                    Sobre o Rafael
                  </a>
                </li>
                <li>
                  <a
                    href="#modalidades"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-[#E50914]"
                  >
                    Modalidades
                  </a>
                </li>
                <li>
                  <a
                    href="#conquistas"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-[#E50914]"
                  >
                    Conquistas
                  </a>
                </li>
                <li>
                  <a
                    href="#depoimentos"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-[#E50914]"
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a
                    href="#planos"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-[#E50914]"
                  >
                    Planos
                  </a>
                </li>
                <li>
                  <a
                    href="#whatsapp"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-condensed text-base font-bold tracking-wider text-[#25D366] uppercase transition-colors hover:text-white"
                  >
                    WhatsApp Direto
                  </a>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openBooking('premium', 'boxe-tradicional')}
                className="mt-3 w-full bg-[#E50914] py-2.5 font-condensed text-sm font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812]"
              >
                AGENDE SUA AULA
              </button>
            </nav>
          )}
        </header>

        <main>
          {/* Hero Section with Multi-Layer 3D Parallax */}
          <section
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            aria-label="Apresentação"
            className="perspective-3d relative overflow-hidden bg-[#070707] px-4 pb-8 pt-6 sm:border sm:border-white/20 sm:bg-[#0A0A0A] sm:px-8 md:px-12 md:py-12 lg:py-16"
          >
            {/* Parallax Grit Texture Layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grit-pattern opacity-70"
            />

            {/* Parallax Diagonal Red Slash Layer */}
            <motion.div
              aria-hidden="true"
              style={{ y: heroSlashY }}
              className="pointer-events-none absolute -right-14 -top-12 h-[145%] w-[62%] rotate-[22deg] bg-gradient-to-b from-[#E50914] via-[#CF0812] to-[#7A0308] opacity-95 will-change-transform md:-right-20 md:w-[48%]"
            />

            {/* Atmospheric Contrast Scrim + Mobile Bottom Seamless Blend */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent sm:hidden"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <motion.div style={{ y: heroTextY }} className="lg:col-span-7 will-change-transform">
                <h1 className="font-display text-[70px] leading-[0.86] tracking-tight text-white uppercase sm:text-[88px] lg:text-[112px]">
                  RAFAEL
                  <br />
                  BENCK
                </h1>

                <p className="mt-3 font-condensed text-[20px] font-extrabold tracking-wide text-[#E50914] uppercase sm:text-[24px] lg:text-[28px]">
                  PROFESSOR DE BOXE &amp; ATLETA
                </p>

                <p className="mt-2.5 text-[15px] font-medium leading-snug text-white/95 sm:text-[16px] lg:text-[18px]">
                  Disciplina hoje.
                  <br />
                  Resultados amanhã.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={() => openBooking('premium', 'boxe-tradicional')}
                    className="w-full bg-[#E50914] px-8 py-3.5 text-center font-condensed text-[15px] font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:min-w-[230px]"
                  >
                    AGENDE SUA AULA
                  </button>

                  <a
                    href="#sobre"
                    className="block w-full border border-white/70 bg-black/50 px-8 py-3 text-center font-condensed text-[15px] font-extrabold tracking-widest text-white uppercase backdrop-blur-xs transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] sm:w-auto sm:min-w-[230px]"
                  >
                    CONHEÇA MEU TRABALHO
                  </a>
                </div>
              </motion.div>

              {/* Desktop Hero 3D Interactive Portrait Frame */}
              <div className="hidden lg:flex lg:col-span-5 lg:justify-end">
                <motion.div
                  style={{
                    y: heroPortraitY,
                    rotateX: prefersReducedMotion ? 0 : rotateX,
                    rotateY: prefersReducedMotion ? 0 : rotateY,
                  }}
                  className="editorial-slant-clip w-[340px] xl:w-[390px] aspect-square bg-[#E50914] p-[3px] shadow-[0_30px_60px_rgba(0,0,0,0.85)] will-change-transform"
                >
                  <div className="editorial-slant-clip h-full w-full overflow-hidden bg-black">
                    <img
                      src={rafaPortrait}
                      alt="Rafael Benck no ringue com luvas vermelhas"
                      referrerPolicy="no-referrer"
                      decoding="async"
                      fetchPriority="high"
                      className="h-full w-full scale-105 object-cover object-top contrast-105"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Active Booking Badge (appears when user books a session) */}
          {bookings.length > 0 && (
            <div
              data-testid="active-bookings-banner"
              className="mt-4 flex flex-wrap items-center justify-between gap-2 border border-[#E50914]/50 bg-[#E50914]/10 px-4 py-3 text-xs sm:text-sm"
            >
              <span className="flex items-center gap-2 font-semibold text-white">
                <CalendarCheck className="h-4 w-4 text-[#E50914]" />
                {bookings.length === 1
                  ? `Aula solicitada: ${bookings[0].modalityTitle} (${bookings[0].preferredDay}, ${bookings[0].preferredTime})`
                  : `${bookings.length} aulas solicitadas recentemente`}
              </span>
              <button
                type="button"
                onClick={() => openBooking('premium', 'boxe-tradicional')}
                className="font-condensed font-bold tracking-wider text-[#E50914] uppercase hover:underline"
              >
                NOVO HORÁRIO
              </button>
            </div>
          )}

          {/* Stats Strip: Fluid hairline cross-grid on Mobile (less blocky), 4 Cards on Desktop */}
          <section
            aria-label="Números de carreira"
            className="mt-4 grid grid-cols-2 border-y border-white/15 bg-gradient-to-b from-[#0A0A0A] to-black md:mt-6 md:grid-cols-4 md:gap-4 md:border-y-0 md:bg-none"
          >
            {HERO_STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`px-4 py-5 md:border md:border-white/20 md:bg-[#080808] md:px-6 md:py-5 ${
                  idx % 2 === 0 ? 'border-r border-white/15' : ''
                } ${idx < 2 ? 'border-b border-white/15 md:border-b' : ''}`}
              >
                <div className="font-display text-[36px] leading-none tabular-nums text-[#E50914] sm:text-[42px] lg:text-[48px]">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-condensed text-[12px] font-bold tracking-wider text-white/90 uppercase sm:text-[13px] lg:text-[14px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Sobre o Rafael: Stylized Fluid Editorial Flow on Mobile + 12-Col Parallax Split on Desktop */}
          <section ref={sobreRef} id="sobre" className="mt-10 scroll-mt-6 md:mt-16">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-14">
              {/* Slanted Parallax Portrait Frame */}
              <motion.div
                style={{ y: sobreFrameY }}
                className="mx-auto w-[78%] max-w-[320px] md:col-span-4 md:w-full md:max-w-none will-change-transform"
              >
                <div className="relative">
                  <div className="editorial-slant-clip aspect-square w-full bg-[#E50914] p-[3px] shadow-[0_24px_48px_rgba(229,9,20,0.16)]">
                    <div className="editorial-slant-clip relative h-full w-full overflow-hidden bg-black">
                      <motion.img
                        style={{ y: sobreImageY }}
                        src={rafaPortrait}
                        alt="Retrato de Rafael Benck, professor de boxe e atleta"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="h-[112%] w-full -translate-y-[6%] object-cover object-top contrast-105 will-change-transform"
                      />
                      {/* Seamless bottom fade on mobile */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent md:hidden"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bio & Pillars */}
              <div className="md:col-span-8">
                <p className="font-condensed text-xs font-extrabold tracking-[0.2em] text-[#E50914] uppercase md:hidden">
                  HISTÓRIA &amp; PROPÓSITO
                </p>
                <h2 className="mt-1 font-display text-[34px] leading-none text-white uppercase sm:text-[38px] md:mt-0 lg:text-[44px]">
                  SOBRE O RAFAEL
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/90 sm:text-[16px] lg:text-[17px]">
                  Sou professor de boxe e <strong className="font-bold text-white">atleta</strong>, com uma paixão gigante pelo esporte. Acredito que o boxe transforma vidas, dentro e fora do ringue.
                </p>

                {/* Fluid Pillar Buttons with Red Hover + White Text */}
                <div className="mt-5 flex flex-wrap gap-2.5 md:mt-6 md:grid md:max-w-lg md:grid-cols-4 md:gap-3">
                  {PILLARS.map((pillar) => {
                    const isSelected = pillar.id === selectedPillarId;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() =>
                          setSelectedPillarId(isSelected ? null : pillar.id)
                        }
                        aria-pressed={isSelected}
                        className={`rounded-full border px-4 py-1.5 text-center font-condensed text-[12px] font-bold tracking-wider uppercase transition-all duration-150 sm:text-[13px] ${
                          isSelected
                            ? 'border-[#E50914] bg-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.35)]'
                            : 'border-white/55 bg-black/50 text-white hover:border-[#E50914] hover:bg-[#E50914] hover:text-white'
                        }`}
                      >
                        {pillar.label}
                      </button>
                    );
                  })}
                </div>

                {activePillar && (
                  <p
                    data-testid="active-pillar-detail"
                    className="mt-4 max-w-xl border-t border-white/15 pt-3 text-sm text-white/85"
                  >
                    <span className="font-condensed font-bold tracking-wider text-[#E50914] uppercase">
                      {activePillar.label}:
                    </span>{' '}
                    {activePillar.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Modalidades: Fluid Hairline List on Mobile, 2x2 Grid on Desktop */}
          <section id="modalidades" className="mt-12 scroll-mt-6 md:mt-16">
            <h2 className="mb-3.5 font-display text-[30px] leading-none text-white uppercase sm:text-[34px] lg:mb-5 lg:text-[42px]">
              MODALIDADES
            </h2>

            <div className="divide-y divide-white/15 border-y border-white/15 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:border-y-0">
              {MODALITIES.map((mod) => {
                const isExpanded = expandedModalityId === mod.id;
                return (
                  <motion.div
                    key={mod.id}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-transparent transition-colors md:border md:border-white/20 md:bg-[#080808] md:hover:border-[#E50914]/70"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedModalityId(isExpanded ? null : mod.id)
                      }
                      aria-expanded={isExpanded}
                      className="flex w-full items-center gap-3.5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] md:px-6 md:py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="stroke-number-red w-14 shrink-0 text-[46px] tabular-nums sm:w-16 sm:text-[54px] lg:w-20 lg:text-[64px]"
                      >
                        {mod.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-condensed text-[17px] font-extrabold tracking-wide text-white uppercase sm:text-[19px] lg:text-[22px]">
                          {mod.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] leading-snug text-white/80 sm:text-[14px]">
                          {mod.description}
                        </p>
                      </div>

                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-150 ${
                          isExpanded ? 'rotate-180 text-[#E50914]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-white/10 bg-[#080808]/90 px-3 pb-4 pt-3 text-xs text-white/85 md:bg-black/60 md:px-6 md:pb-5 md:text-sm">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70">
                          <span>
                            <strong className="text-white">Horários:</strong> {mod.schedule}
                          </span>
                          <span>
                            <strong className="text-white">Duração:</strong> {mod.duration}
                          </span>
                          <span>
                            <strong className="text-white">Nível:</strong> {mod.level}
                          </span>
                        </div>

                        <ul className="mt-2.5 space-y-1 text-white/85">
                          {mod.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#E50914]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() => openBooking('premium', mod.id)}
                          className="mt-3.5 inline-flex items-center gap-1.5 bg-[#E50914] px-4 py-2 font-condensed text-xs font-extrabold tracking-widest text-white uppercase transition-colors hover:bg-[#c80812] md:text-sm"
                        >
                          AGENDAR {mod.title}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Conquistas with Parallax Shards */}
          <section
            ref={conquistasRef}
            id="conquistas"
            aria-label="Conquistas"
            className="conquistas-clip relative mt-12 scroll-mt-6 overflow-hidden bg-gradient-to-br from-[#0044FF] via-[#0034DB] to-[#0020A8] px-4 pb-6 pt-5 sm:px-8 md:mt-16 md:px-12 md:py-10"
          >
            {/* Parallax Blue Geometric Shards */}
            <motion.div
              aria-hidden="true"
              style={{ x: conquistasShardX }}
              className="pointer-events-none absolute -right-8 -top-10 h-44 w-56 rotate-12 bg-white/10 will-change-transform"
            />
            <motion.div
              aria-hidden="true"
              style={{ x: conquistasShardX }}
              className="pointer-events-none absolute -bottom-12 left-10 h-40 w-48 -rotate-12 bg-black/20 will-change-transform"
            />

            <div className="relative z-10">
              <h2 className="mb-4 font-display text-[26px] leading-none text-white uppercase sm:text-[32px] lg:mb-7 lg:text-[40px]">
                CONQUISTAS
              </h2>

              <div className="grid grid-cols-4 divide-x divide-white/30 text-center">
                {ACHIEVEMENTS.map((item) => (
                  <div key={item.id} className="px-1.5 md:px-4">
                    <div className="font-display text-[30px] leading-none tabular-nums text-white sm:text-[42px] lg:text-[54px]">
                      {item.value}
                    </div>
                    <div className="mt-1.5 font-condensed text-[10px] font-bold leading-tight tracking-wider text-white uppercase sm:text-[12px] lg:text-[14px]">
                      {item.line1}
                      <br />
                      {item.line2}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Depoimentos */}
          <section id="depoimentos" className="mt-12 scroll-mt-6 md:mt-16">
            <h2 className="mb-3.5 font-display text-[30px] leading-none text-white uppercase sm:text-[34px] lg:mb-5 lg:text-[42px]">
              DEPOIMENTOS
            </h2>

            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
              {TESTIMONIALS.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center gap-3.5 border border-white/15 bg-gradient-to-br from-[#0D0D0D] to-[#050505] px-4 py-4 md:gap-5 md:border-white/20 md:px-6 md:py-6"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#E50914] bg-neutral-900 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                    <img
                      src={item.avatar}
                      alt={`Foto de ${item.name}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="font-display text-[34px] leading-[0.8] text-[#E50914] lg:text-[44px]"
                      >
                        “
                      </span>
                      <blockquote className="text-[13px] leading-snug text-white/95 sm:text-[14px] lg:text-[15px]">
                        {item.quote}
                      </blockquote>
                    </div>

                    <div className="mt-2.5 pl-5">
                      <p className="text-[12px] font-bold text-white lg:text-sm">{item.name}</p>
                      <p className="text-[10px] font-medium tracking-widest text-white/60 uppercase lg:text-[11px]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Planos */}
          <section id="planos" className="mt-12 scroll-mt-6 md:mt-16">
            <h2 className="mb-3.5 font-display text-[30px] leading-none text-white uppercase sm:text-[34px] lg:mb-6 lg:text-[42px]">
              PLANOS
            </h2>

            <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3 lg:gap-5">
              {PLANS.map((plan) => {
                const isPopular = Boolean(plan.popular);
                return (
                  <motion.button
                    key={plan.id}
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openBooking(plan.id, 'boxe-tradicional')}
                    aria-label={`Selecionar plano ${plan.name} - ${plan.priceFormatted} por mês`}
                    className={`group relative flex w-full items-center justify-between px-4 py-4 text-left lg:flex-col lg:items-stretch lg:justify-between lg:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isPopular
                        ? 'border border-[#E50914] bg-[#E50914] text-white'
                        : 'border border-white/40 bg-[#080808] text-white hover:border-[#E50914]'
                    }`}
                  >
                    {isPopular && (
                      <span className="absolute -top-2.5 left-3 -skew-x-12 bg-white px-2.5 py-0.5 font-condensed text-[10px] font-extrabold italic tracking-wider text-[#E50914] uppercase shadow-sm lg:left-6 lg:text-xs">
                        MAIS POPULAR
                      </span>
                    )}

                    <div>
                      <div className="font-condensed text-[18px] font-extrabold leading-none tracking-wide uppercase lg:text-[26px]">
                        {plan.name}
                      </div>
                      <div
                        className={`mt-1 text-[11.5px] lg:text-sm ${
                          isPopular ? 'text-white/90' : 'text-white/75'
                        }`}
                      >
                        {plan.frequency}
                      </div>

                      {/* Desktop Perks List */}
                      <ul className="mt-5 hidden space-y-2 border-t border-white/20 pt-4 text-sm lg:block">
                        {plan.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2">
                            <span
                              className={`mt-2 h-1.5 w-1.5 shrink-0 ${
                                isPopular ? 'bg-white' : 'bg-[#E50914]'
                              }`}
                            />
                            <span className={isPopular ? 'text-white/95' : 'text-white/80'}>
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 lg:mt-8 lg:justify-between lg:border-t lg:border-white/20 lg:pt-4">
                      <span className="text-[15px] tabular-nums lg:text-2xl">
                        <strong className="font-extrabold">{plan.priceFormatted}</strong>
                        <span className="text-xs font-normal opacity-90 lg:text-sm">/mês</span>
                      </span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Structured Direct WhatsApp Conversion Section */}
          <WhatsAppSection
            onOpenModalBooking={() => openBooking('premium', 'boxe-tradicional')}
          />

          {/* Vem Treinar Comigo CTA Banner with Parallax */}
          <section
            ref={ctaRef}
            aria-label="Chamada para agendamento"
            className="relative mt-10 overflow-hidden bg-[#E50914] px-5 pb-6 pt-7 text-center sm:px-8 md:mt-14 md:px-12 md:py-12"
          >
            {/* Parallax Diagonal Geometric Facets */}
            <motion.div
              aria-hidden="true"
              style={{ x: ctaShardX }}
              className="pointer-events-none absolute -left-8 -top-8 h-36 w-48 -rotate-12 bg-black/15 will-change-transform"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 right-3 h-16 w-[3px] rotate-[40deg] bg-white"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-[36px] leading-[0.95] text-white uppercase sm:text-[44px] lg:text-[56px]">
                VEM TREINAR COMIGO!
              </h2>
              <p className="mt-1.5 font-condensed text-[15px] font-semibold tracking-wider text-white uppercase md:mt-2 md:text-lg">
                SUA MELHOR VERSÃO COMEÇA AGORA.
              </p>

              <button
                type="button"
                onClick={() => openBooking('premium', 'boxe-tradicional')}
                className="mt-5 w-full bg-white py-3.5 font-condensed text-[16px] font-extrabold tracking-widest text-[#E50914] uppercase transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:mt-6 md:w-auto md:min-w-[300px] md:px-10"
              >
                AGENDE SUA AULA
              </button>
            </div>
          </section>
        </main>

        {/* Footer: Only Instagram and TikTok */}
        <footer className="mt-8 md:mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
            <BrandLogo />

            <nav
              aria-label="Links do rodapé desktop"
              className="hidden md:flex items-center gap-4 text-xs font-medium tracking-wider text-white/75 uppercase"
            >
              <a href="#sobre" className="hover:text-white">
                SOBRE
              </a>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <a href="#modalidades" className="hover:text-white">
                MODALIDADES
              </a>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <a href="#depoimentos" className="hover:text-white">
                DEPOIMENTOS
              </a>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <a href="#whatsapp" className="hover:text-white">
                WHATSAPP
              </a>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <button
                type="button"
                onClick={() => openBooking('premium', 'boxe-tradicional')}
                className="uppercase hover:text-white"
              >
                CONTATO
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ciganoboxe/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @ciganoboxe"
                className="text-white/85 transition-colors hover:text-[#E50914]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* TikTok */}
              <button
                type="button"
                onClick={() => handleSocialClick('TikTok')}
                aria-label="TikTok de Rafael Benck"
                className="text-white/85 transition-colors hover:text-[#E50914]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2 6.34 6.34 0 0 0 9.49 21.5a6.34 6.34 0 0 0 6.34-6.34V8.78a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
                </svg>
              </button>
            </div>
          </div>

          {socialToast && (
            <p className="mt-3 text-center text-xs font-medium text-[#E50914]" role="status">
              {socialToast}
            </p>
          )}

          {/* Mobile Footer Nav */}
          <nav
            aria-label="Links do rodapé mobile"
            className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-wider text-white/75 uppercase md:hidden"
          >
            <a href="#sobre" className="hover:text-white">
              SOBRE
            </a>
            <span aria-hidden="true" className="text-white/30">
              |
            </span>
            <a href="#modalidades" className="hover:text-white">
              MODALIDADES
            </a>
            <span aria-hidden="true" className="text-white/30">
              |
            </span>
            <a href="#depoimentos" className="hover:text-white">
              DEPOIMENTOS
            </a>
            <span aria-hidden="true" className="text-white/30">
              |
            </span>
            <a href="#whatsapp" className="hover:text-white">
              WHATSAPP
            </a>
          </nav>

          <p className="mt-4 text-center text-[11px] text-white/50">
            © 2025 Rafael Benck. Todos os direitos reservados.
          </p>
        </footer>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        initialPlanId={bookingPlanId}
        initialModalityId={bookingModalityId}
        onClose={() => setBookingModalOpen(false)}
        onBooked={(record) => setBookings((prev) => [record, ...prev])}
        bookingsCount={bookings.length}
      />
    </div>
  );
}
