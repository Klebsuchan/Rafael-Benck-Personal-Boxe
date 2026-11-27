export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ModalityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  schedule: string;
  duration: string;
  level: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  value: string;
  line1: string;
  line2: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface PlanItem {
  id: 'basico' | 'premium' | 'elite';
  name: string;
  frequency: string;
  price: number;
  priceFormatted: string;
  popular?: boolean;
  perks: string[];
}

export interface PillarItem {
  id: string;
  label: string;
  description: string;
}

export interface BookingInput {
  studentName: string;
  whatsapp: string;
  planId: 'basico' | 'premium' | 'elite';
  modalityId: string;
  preferredDay: string;
  preferredTime: string;
  notes?: string;
}

export interface BookingRecord extends BookingInput {
  id: string;
  createdAt: string;
  planName: string;
  modalityTitle: string;
  monthlyPrice: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingInput, string>>;
}

export const HERO_STATS: StatItem[] = [
  { id: 'exp', value: '8+', label: 'ANOS DE EXPERIÊNCIA' },
  { id: 'students', value: '200+', label: 'ALUNOS ATENDIDOS' },
  { id: 'comps', value: '12', label: 'COMPETIÇÕES' },
  { id: 'titles', value: '5', label: 'TÍTULOS CONQUISTADOS' },
];

export const PILLARS: PillarItem[] = [
  {
    id: 'disciplina',
    label: 'DISCIPLINA',
    description: 'Constância diária no treino e nos hábitos que constroem resultados duradouros.',
  },
  {
    id: 'foco',
    label: 'FOCO',
    description: 'Atenção total em cada movimento, esquiva e combinação dentro do ringue.',
  },
  {
    id: 'respeito',
    label: 'RESPEITO',
    description: 'Valorização do processo, dos parceiros de treino e da nobre arte do boxe.',
  },
  {
    id: 'evolucao',
    label: 'EVOLUÇÃO',
    description: 'Superação contínua dos seus próprios limites físicos e mentais a cada aula.',
  },
];

export const MODALITIES: ModalityItem[] = [
  {
    id: 'boxe-tradicional',
    number: '01',
    title: 'BOXE TRADICIONAL',
    description: 'Técnica, condicionamento e combate para todos os níveis.',
    schedule: 'Seg a Sex · 07h, 12h, 18h, 19h30',
    duration: '60 minutos',
    level: 'Iniciante ao Avançado',
    highlights: [
      'Fundamentos de guarda, deslocamento (footwork) e golpes retos/curvos',
      'Trabalho técnico na manopla, saco de pancada e sparring controlado',
      'Desenvolvimento de reflexo, defesa pessoal e coordenação motora',
    ],
  },
  {
    id: 'boxe-fitness',
    number: '02',
    title: 'BOXE FITNESS',
    description: 'Emagrecimento, saúde e bem-estar através do boxe.',
    schedule: 'Seg a Sáb · 08h, 17h30, 19h',
    duration: '50 minutos',
    level: 'Todos os níveis (Sem contato)',
    highlights: [
      'Alto gasto calórico (até 800 kcal por sessão) sem impacto de combate',
      'Circuitos dinâmicos combinando golpes no saco e exercícios metabólicos',
      'Alívio do estresse, definição muscular e melhora cardiorrespiratória',
    ],
  },
  {
    id: 'treinamento-funcional',
    number: '03',
    title: 'TREINAMENTO FUNCIONAL',
    description: 'Mais força, resistência e performance no seu dia a dia.',
    schedule: 'Ter, Qui e Sáb · 07h30, 18h30',
    duration: '50 minutos',
    level: 'Todos os níveis',
    highlights: [
      'Fortalecimento de core, estabilidade articular e potência explosiva',
      'Exercícios multiarticulares específicos para agilidade e prevenção de lesões',
      'Condicionamento físico completo integrado à movimentação do boxe',
    ],
  },
  {
    id: 'preparacao-competicao',
    number: '04',
    title: 'PREPARAÇÃO PARA COMPETIÇÃO',
    description: 'Treinos específicos para quem quer ir mais longe.',
    schedule: 'Seg a Sáb · Horários personalizados',
    duration: '90 minutos',
    level: 'Intermediário e Atletas',
    highlights: [
      'Estratégia de luta, leitura de adversário e simulações reais de rounds',
      'Periodização física, controle de peso e preparação mental pré-luta',
      'Acompanhamento técnico individualizado para torneios estaduais e nacionais',
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  { id: 'estaduais', value: '3', line1: 'CAMPEONATOS', line2: 'ESTADUAIS' },
  { id: 'nacionais', value: '2', line1: 'CAMPEONATOS', line2: 'NACIONAIS' },
  { id: 'internacional', value: '1', line1: 'TÍTULO', line2: 'INTERNACIONAL' },
  { id: 'dedicacao', value: '100%', line1: 'DEDICAÇÃO', line2: 'AO ESPORTE' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'lucas',
    quote:
      '“O Rafael é um profissional incrível! Me ensinou muito mais que boxe, me ensinou disciplina e confiança.”',
    name: 'Lucas Ferreira',
    role: 'ALUNO',
    avatar: '/src/assets/images/avatar_lucas_ferreira_1795519133540.jpg',
  },
  {
    id: 'mariana',
    quote:
      '“Treinos desafiadores, ambiente incrível e resultados reais. O melhor professor!”',
    name: 'Mariana Costa',
    role: 'ALUNA',
    avatar: '/src/assets/images/avatar_mariana_costa_1795519103519.jpg',
  },
];

export const PLANS: PlanItem[] = [
  {
    id: 'basico',
    name: 'BÁSICO',
    frequency: '1x por semana',
    price: 149,
    priceFormatted: 'R$ 149',
    perks: ['4 aulas mensais', 'Avaliação técnica inicial', 'Acesso ao Boxe Tradicional ou Fitness'],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    frequency: '3x por semana',
    price: 249,
    priceFormatted: 'R$ 249',
    popular: true,
    perks: [
      '12 aulas mensais',
      'Acesso a todas as modalidades',
      'Acompanhamento de evolução física',
    ],
  },
  {
    id: 'elite',
    name: 'ELITE',
    frequency: '5x por semana',
    price: 399,
    priceFormatted: 'R$ 399',
    perks: [
      '20 aulas mensais + treinos livres',
      'Feedback técnico individual na manopla',
      'Planejamento completo de performance',
    ],
  },
];

export function formatWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateBookingInput(input: BookingInput): ValidationResult {
  const errors: Partial<Record<keyof BookingInput, string>> = {};

  const trimmedName = input.studentName.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.studentName = 'Informe seu nome completo.';
  }

  const digits = input.whatsapp.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD (10 ou 11 dígitos).';
  }

  const validPlan = PLANS.some((p) => p.id === input.planId);
  if (!validPlan) {
    errors.planId = 'Selecione um plano válido.';
  }

  const validModality = MODALITIES.some((m) => m.id === input.modalityId);
  if (!validModality) {
    errors.modalityId = 'Selecione uma modalidade válida.';
  }

  if (!input.preferredDay.trim()) {
    errors.preferredDay = 'Selecione o melhor dia para sua aula.';
  }

  if (!input.preferredTime.trim()) {
    errors.preferredTime = 'Selecione o horário de preferência.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createBookingRecord(input: BookingInput, idSuffix = '1'): BookingRecord {
  const plan = PLANS.find((p) => p.id === input.planId) ?? PLANS[1];
  const modality = MODALITIES.find((m) => m.id === input.modalityId) ?? MODALITIES[0];

  return {
    ...input,
    studentName: input.studentName.trim(),
    whatsapp: formatWhatsAppNumber(input.whatsapp),
    id: `booking-${idSuffix}`,
    createdAt: new Date().toISOString(),
    planName: plan.name,
    modalityTitle: modality.title,
    monthlyPrice: plan.price,
  };
}

export interface WhatsAppTopic {
  id: string;
  label: string;
  message: string;
}

export const WHATSAPP_NUMBER = '5511999999999';

export const WHATSAPP_TOPICS: WhatsAppTopic[] = [
  {
    id: 'planos',
    label: 'Planos e Valores',
    message: 'Olá Rafael! Gostaria de saber mais sobre os planos de treino e valores disponíveis.',
  },
  {
    id: 'experimental',
    label: 'Aula Experimental',
    message: 'Olá Rafael! Quero agendar uma aula experimental de boxe. Quais horários estão disponíveis?',
  },
  {
    id: 'fitness',
    label: 'Boxe Fitness',
    message: 'Olá Rafael! Tenho interesse nas aulas de Boxe Fitness para condicionamento e saúde.',
  },
  {
    id: 'competicao',
    label: 'Preparação / Competição',
    message: 'Olá Rafael! Gostaria de conversar sobre treinos avançados e preparação para competição.',
  },
];

export function buildWhatsAppUrl(topicId: string, customNote?: string): string {
  const topic = WHATSAPP_TOPICS.find((t) => t.id === topicId) ?? WHATSAPP_TOPICS[0];
  const note = customNote?.trim();
  const fullMessage = note ? `${topic.message} ${note}` : topic.message;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}
