import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trophy, Star, BookOpen, Code } from 'lucide-react'

const AWARDS = [
  {
    icon: Trophy,
    color: '#FFD700',
    title: 'Academic Progress Recognition',
    titleFr: 'Reconnaissance de Progrès Académique',
    titleRw: "Igihembo cy'Iterambere muri Akademe",
    description: 'Recognized for outstanding academic performance and dedication to learning in software development.',
    descFr: 'Reconnu pour des performances académiques exceptionnelles et un dévouement à l\'apprentissage.',
    descRw: 'Yemejwe kubera imikorere y\'ishuri nziza no kwishingira kwiga iterambere rya software.',
    year: '2024',
  },
  {
    icon: Code,
    color: '#6C63FF',
    title: 'ICT / Programming Training Participation',
    titleFr: 'Participation à la Formation ICT / Programmation',
    titleRw: "Kwitabira Imyitozo ya ICT / Porogaramu",
    description: 'Actively participated in intensive ICT and programming training programs, building foundational and advanced coding skills.',
    descFr: 'A activement participé à des programmes de formation intensifs en TIC et programmation.',
    descRw: 'Yafatanije cyane mu bikorwa byimazeyo bya ICT no kwiga gukora code.',
    year: '2023',
  },
  {
    icon: BookOpen,
    color: '#00BFA6',
    title: 'Online Course Completion — HTML, CSS & JavaScript',
    titleFr: 'Achèvement de Cours en Ligne — HTML, CSS & JavaScript',
    titleRw: "Gusoza Amasomo ya Interineti — HTML, CSS na JavaScript",
    description: 'Successfully completed multiple verified online courses in HTML5, CSS3, and JavaScript, earning completion certificates.',
    descFr: 'A terminé avec succès plusieurs cours en ligne vérifiés en HTML5, CSS3 et JavaScript.',
    descRw: 'Yasoze neza amasomo menshi ku interineti mu HTML5, CSS3 na JavaScript.',
    year: '2023',
  },
  {
    icon: Star,
    color: '#FF6B6B',
    title: 'Top Student — Web Development Module',
    titleFr: 'Meilleur Étudiant — Module Développement Web',
    titleRw: "Umunyeshuri wa Mbere — Gahunda y'Iterambere ry'Urubuga",
    description: 'Achieved top rankings in the web development module, demonstrating exceptional understanding of frontend technologies.',
    descFr: 'Classé premier dans le module de développement web, démontrant une compréhension exceptionnelle.',
    descRw: 'Yageze ku nzego zo hejuru mu gahunda y\'iterambere ry\'urubuga.',
    year: '2024',
  },
]

export default function AwardsSection() {
  const { t, i18n } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const lang = i18n.language

  return (
    <section id="awards" className="relative overflow-hidden bg-[var(--bg2)]">
      <div className="section-wrapper" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label justify-center">{t('awards.label')}</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text)] mb-3">
            {t('awards.title')}
          </h2>
          <p className="text-[var(--text2)] max-w-lg mx-auto">{t('awards.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-transparent" />

          <div className="space-y-8">
            {AWARDS.map((award, i) => {
              const Icon = award.icon
              const title =
                lang === 'fr' ? award.titleFr :
                lang === 'rw' ? award.titleRw :
                award.title
              const desc =
                lang === 'fr' ? award.descFr :
                lang === 'rw' ? award.descRw :
                award.description

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative pl-16"
                >
                  {/* Icon dot */}
                  <div
                    className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${award.color}22, ${award.color}44)`,
                      border: `1px solid ${award.color}44`,
                    }}
                  >
                    <Icon size={18} style={{ color: award.color }} />
                  </div>

                  <div className="glass rounded-xl p-5 border border-[var(--border)] card-glow">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-base text-[var(--text)] leading-tight">
                        {title}
                      </h3>
                      <span
                        className="text-xs font-mono px-2 py-1 rounded-full flex-shrink-0"
                        style={{ background: `${award.color}22`, color: award.color }}
                      >
                        {award.year}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text2)] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
