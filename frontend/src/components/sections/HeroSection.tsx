import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDownRight, Github, Linkedin, Mail, Eye } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { recordVisit } from '@/services/api'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const profilePhotoUrl = `${import.meta.env.BASE_URL}phionah.jpeg`
const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const [visits, setVisits] = useState<number | null>(null)
  const [photoLoaded, setPhotoLoaded] = useState(false)

  useEffect(() => {
    recordVisit().then(r => setVisits(r.total_visits)).catch(() => {})
  }, [])

  const roles   = t('hero.roles', { returnObjects: true }) as string[]
  const typeSeq = roles.flatMap(r => [r, 2200]).flat()
  const lang = i18n.language === 'fr' || i18n.language === 'rw' ? i18n.language : 'en'
  const miniProof = {
    en: ['Based in Kigali', 'Open to internships', 'Frontend + full-stack growth'],
    fr: ['Basée à Kigali', 'Ouverte aux stages', 'Progression frontend + full-stack'],
    rw: ['Ntuye i Kigali', 'Niteguye internship', 'Ndi gukura muri frontend na full-stack'],
  }[lang]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[700px] h-[700px] bg-[var(--primary)] -top-60 -left-60 animate-pulse-s" />
        <div className="orb w-[600px] h-[600px] bg-[var(--secondary)] -bottom-48 -right-48 animate-pulse-s" style={{ animationDelay: '2s' }} />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.028 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* ── Portrait — right side, desktop only ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="absolute right-0 bottom-0 top-0 hidden lg:flex items-end pointer-events-none"
        style={{ width: 'clamp(240px, 25vw, 380px)' }}
      >
        {/* Glow behind photo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(124,111,255,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Photo container */}
        <div className="relative w-full h-full flex items-end overflow-hidden">
          {/* Fade from sides and top */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right,  var(--bg) 0%, transparent 25%),
                linear-gradient(to left,   var(--bg) 0%, transparent 8%),
                linear-gradient(to bottom, var(--bg) 0%, transparent 20%)
              `,
            }}
          />

          {/* Shimmer placeholder */}
          {!photoLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: 'var(--bg3)', opacity: 0.4 }}
            />
          )}

          <img
            src={profilePhotoUrl}
            alt="Uwamwezi Phionah"
            onLoad={() => setPhotoLoaded(true)}
            className="relative w-full object-cover object-top transition-opacity duration-700"
            style={{
              height: '88vh',
              objectPosition: 'center top',
              opacity: photoLoaded ? 0.85 : 0,
              maskImage: 'linear-gradient(to top, transparent 0%, black 18%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 18%)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="section-wrapper relative z-10 flex flex-col justify-center min-h-screen lg:pr-[19rem] xl:pr-[23rem]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="w-full max-w-none lg:max-w-[52rem] xl:max-w-[58rem]"
        >
          <motion.div variants={fadeUp} className="lg:hidden mb-8">
            <div
              className="relative w-full max-w-[260px] rounded-3xl overflow-hidden border border-[var(--border2)]"
              style={{ background: 'var(--bg3)' }}
            >
              {!photoLoaded && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: 'var(--bg4)' }}
                />
              )}
              <img
                src={profilePhotoUrl}
                alt="Uwamwezi Phionah"
                onLoad={() => setPhotoLoaded(true)}
                className="w-full h-[300px] object-cover object-top transition-opacity duration-700"
                style={{ opacity: photoLoaded ? 1 : 0 }}
              />
            </div>
          </motion.div>

          {/* Availability chip */}
          <motion.div variants={fadeUp} className="mb-10">
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-mono font-semibold
                         tracking-widest uppercase px-4 py-2 rounded-full glass-subtle"
              style={{ color: 'var(--secondary)' }}
            >
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
              Available for opportunities
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mb-6">
            {miniProof.map(item => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </motion.div>

          {/* Main headline */}
          <motion.div variants={fadeUp} className="mb-4 pr-2">
            <h1
              className="font-display font-black leading-[0.96] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2.8rem, 6.6vw, 5.8rem)' }}
            >
              <span className="text-shimmer block">Uwamwezi</span>
              <span
                className="block"
                style={{
                  color: 'var(--text)',
                  WebkitTextStroke: '1px rgba(240,244,255,0.12)',
                }}
              >
                PHIONAH
              </span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-shrink-0 w-10"
              style={{ background: 'var(--secondary)' }}
            />
            <span
              className="font-display font-semibold text-lg sm:text-xl tracking-tight"
              style={{ color: 'var(--secondary)' }}
            >
              <TypeAnimation
                sequence={typeSeq}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg max-w-lg leading-relaxed mb-10"
            style={{ color: 'var(--text2)' }}
          >
            {t('hero.tagline')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-14">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              {t('hero.cta_projects')}
              <ArrowDownRight size={15} />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost"
            >
              {t('hero.cta_contact')}
            </button>
            <a href={cvUrl} download className="btn-ghost">
              CV
            </a>
          </motion.div>

          {/* Socials + visitors */}
          <motion.div variants={fadeUp} className="flex items-center gap-5">
            {[
              { href: 'https://github.com/rubera118',                              icon: Github,   label: 'GitHub'   },
              { href: 'https://www.linkedin.com/in/uwamwezi-phionah-4139203aa/',   icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:uwaphiona11@gmail.com',                              icon: Mail,     label: 'Email'    },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-1.5 transition-colors"
                style={{ color: 'var(--text3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span className="text-xs font-mono hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </a>
            ))}

            {visits !== null && (
              <span
                className="ml-4 flex items-center gap-1.5 text-xs font-mono"
                style={{ color: 'var(--text3)' }}
              >
                <Eye size={13} strokeWidth={1.8} />
                <span style={{ color: 'var(--text2)' }}>{visits.toLocaleString()}</span>
                <span>{t('hero.visitors')}</span>
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-5 sm:right-8 lg:right-12 flex flex-col items-center gap-3"
          style={{ color: 'var(--text3)' }}
        >
          <span
            className="text-[9px] font-mono tracking-[0.25em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('hero.scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
