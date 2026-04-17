import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Gauge, Sparkles } from 'lucide-react'

const COPY = {
  en: {
    label: 'Why This Portfolio Works',
    title: 'A stronger signal for recruiters and collaborators',
    subtitle:
      'Inspired by strong portfolio principles: be specific, show evidence, and make it easy to understand the value you bring.',
    cards: [
      {
        icon: Briefcase,
        title: 'Clear positioning',
        body: 'I present myself as a frontend-leaning software developer who can design, build, and polish modern web experiences.',
      },
      {
        icon: Gauge,
        title: 'Proof over claims',
        body: 'The portfolio now highlights projects, tools, and working patterns that show how I solve problems instead of only listing technologies.',
      },
      {
        icon: Sparkles,
        title: 'Human story',
        body: 'A memorable portfolio is not just code. It shows motivation, growth, reliability, and the kind of teammate someone would want to work with.',
      },
    ],
    metrics: [
      { value: '10+', label: 'Projects built' },
      { value: '3', label: 'Portfolio languages' },
      { value: '2+', label: 'Years growing in software' },
      { value: '100%', label: 'Focus on clean UX' },
    ],
  },
  fr: {
    label: 'Pourquoi Ce Portfolio Fonctionne',
    title: 'Un signal plus fort pour les recruteurs et collaborateurs',
    subtitle:
      'Inspiré par les principes des bons portfolios: être précis, montrer des preuves et rendre votre valeur immédiatement compréhensible.',
    cards: [
      {
        icon: Briefcase,
        title: 'Positionnement clair',
        body: "Je me présente comme une développeuse orientée frontend capable de concevoir, construire et soigner des expériences web modernes.",
      },
      {
        icon: Gauge,
        title: 'Des preuves avant les promesses',
        body: 'Le portfolio met en avant les projets, outils et méthodes de travail qui montrent comment je résous des problèmes.',
      },
      {
        icon: Sparkles,
        title: 'Une histoire humaine',
        body: "Un portfolio mémorable n'est pas seulement du code. Il montre aussi la motivation, la progression et l'esprit d'équipe.",
      },
    ],
    metrics: [
      { value: '10+', label: 'Projets réalisés' },
      { value: '3', label: 'Langues du portfolio' },
      { value: '2+', label: "Années d'apprentissage" },
      { value: '100%', label: 'Attention à l’UX' },
    ],
  },
  rw: {
    label: 'Impamvu Iyi Portfolio Ari Nziza',
    title: 'Kwerekana agaciro kanjye mu buryo bwumvikana',
    subtitle:
      'Bishingiye ku mahame ya portfolio nziza: kuvuga ibintu byihariye, gutanga ibimenyetso, no kugaragaza agaciro utanga.',
    cards: [
      {
        icon: Briefcase,
        title: 'Kwigaragaza neza',
        body: 'Niyerekana nk’umuntu ukora software wibanda kuri frontend kandi ushobora gukora experience nziza ku rubuga.',
      },
      {
        icon: Gauge,
        title: 'Ibimenyetso mbere y’amagambo',
        body: 'Portfolio yerekana imishinga, ibikoresho n’uburyo nkoramo kugira ngo bigaragaze uko nkemura ibibazo.',
      },
      {
        icon: Sparkles,
        title: 'Inkuru yanjye',
        body: 'Portfolio nziza si code gusa. Igaragaza intego, iterambere, kwizerwa n’ubufatanye.',
      },
    ],
    metrics: [
      { value: '10+', label: 'Imishinga yakozwe' },
      { value: '3', label: 'Indimi za portfolio' },
      { value: '2+', label: 'Imyaka yo kwiga' },
      { value: '100%', label: 'Kwita kuri UX' },
    ],
  },
} as const

export default function HighlightsSection() {
  const { i18n } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const lang = i18n.language === 'fr' || i18n.language === 'rw' ? i18n.language : 'en'
  const content = COPY[lang]

  return (
    <section id="highlights" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[520px] h-[520px] bg-[var(--secondary)] -top-20 -left-20" />
      </div>

      <div className="section-wrapper" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="eyebrow">{content.label}</p>
          <h2
            className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4"
            style={{ color: 'var(--text)' }}
          >
            {content.title}
          </h2>
          <p className="text-base" style={{ color: 'var(--text2)' }}>
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div className="grid md:grid-cols-3 gap-4">
            {content.cards.map(({ icon: Icon, title, body }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)' }}
                >
                  <Icon size={18} style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-3" style={{ color: 'var(--text)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {body}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: 'linear-gradient(180deg, var(--bg3), rgba(17,24,39,0.78))',
              border: '1px solid var(--border2)',
            }}
          >
            <p
              className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase mb-5"
              style={{ color: 'var(--secondary)' }}
            >
              Proof Snapshot
            </p>
            <div className="grid grid-cols-2 gap-3">
              {content.metrics.map(metric => (
                <div
                  key={metric.label}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--border2)' }}
                >
                  <div
                    className="font-display font-black text-3xl leading-none mb-2"
                    style={{ color: 'var(--text)' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: 'var(--text3)' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
