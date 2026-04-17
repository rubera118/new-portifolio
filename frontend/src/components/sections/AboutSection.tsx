import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, MapPin, Zap, Code2 } from 'lucide-react'

export default function AboutSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [imgLoaded, setImgLoaded] = useState(false)

  const stats = [
    { num: t('about.stat1_num'), label: t('about.stat1_label'), color: 'var(--primary)' },
    { num: t('about.stat2_num'), label: t('about.stat2_label'), color: 'var(--secondary)' },
    { num: t('about.stat3_num'), label: t('about.stat3_label'), color: 'var(--accent)' },
  ]

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-[var(--secondary)] top-0 right-0" />
      </div>

      <div className="section-wrapper" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-20 items-start">

          {/* ── Left: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">{t('about.label')}</p>
            <h2
              className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-10"
              style={{ color: 'var(--text)' }}
            >
              {t('about.title')}
            </h2>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map(({ num, label, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
                >
                  <div
                    className="font-display font-black text-3xl leading-none mb-1"
                    style={{ color }}
                  >
                    {num}
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: 'var(--text3)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick facts */}
            <div className="space-y-3 mb-10">
              {[
                { icon: MapPin, text: 'Kigali, Rwanda' },
                { icon: Code2,  text: 'Frontend & Full-stack Development' },
                { icon: Zap,    text: 'Open to opportunities & collaboration' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3" style={{ color: 'var(--text2)' }}>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)' }}
                  >
                    <Icon size={13} style={{ color: 'var(--primary)' }} />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>

            <a href="/cv.pdf" download className="btn-ghost self-start inline-flex">
              <Download size={14} />
              {t('about.download_cv')}
            </a>
          </motion.div>

          {/* ── Right: Photo + cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="space-y-5"
          >
            {/* ── Portrait card ── */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border2)' }}
            >
              {/* Decorative gradient top strip */}
              <div
                className="absolute top-0 inset-x-0 h-1 z-10"
                style={{
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                }}
              />

              <div className="flex items-stretch" style={{ background: 'var(--bg3)' }}>
                {/* Photo */}
                <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden"
                  style={{ minHeight: '180px' }}>
                  {/* Skeleton shimmer while loading */}
                  {!imgLoaded && (
                    <div
                      className="absolute inset-0 animate-pulse"
                      style={{ background: 'var(--bg4)' }}
                    />
                  )}
                  <img
                    src="/phionah.jpeg"
                    alt="Uwamwezi Phionah"
                    onLoad={() => setImgLoaded(true)}
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                    style={{ opacity: imgLoaded ? 1 : 0 }}
                  />
                  {/* Subtle gradient overlay on right edge for blend */}
                  <div
                    className="absolute inset-y-0 right-0 w-8"
                    style={{
                      background: 'linear-gradient(to right, transparent, var(--bg3))',
                    }}
                  />
                </div>

                {/* Info beside photo */}
                <div className="flex flex-col justify-center px-6 py-6 flex-1">
                  <h3
                    className="font-display font-black text-xl leading-tight mb-1"
                    style={{ color: 'var(--text)' }}
                  >
                    Uwamwezi<br />Phionah
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
                    Software Development<br />Student
                  </p>
                  {/* Available badge */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{ background: 'var(--secondary)' }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ background: 'var(--secondary)' }}
                      />
                    </span>
                    <span
                      className="text-[11px] font-mono font-bold tracking-widest uppercase"
                      style={{ color: 'var(--secondary)' }}
                    >
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bio card ── */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm leading-[1.85] mb-3" style={{ color: 'var(--text2)' }}>
                {t('about.bio')}
              </p>
              <p className="text-sm leading-[1.85]" style={{ color: 'var(--text2)' }}>
                {t('about.bio2')}
              </p>
            </div>

            {/* ── Stack chips ── */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
            >
              <p
                className="text-[10px] font-mono font-bold tracking-widest uppercase mb-3"
                style={{ color: 'var(--text3)' }}
              >
                Current stack
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'FastAPI', 'Supabase', 'Tailwind CSS', 'Framer Motion'].map(
                  tech => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
