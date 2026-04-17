import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const NAV_ITEMS = ['home','about','highlights','skills','projects','awards','gallery','blog','contact'] as const
const LANGS = [
  { code: 'en', label: 'EN', full: 'English',     flag: '🇬🇧' },
  { code: 'fr', label: 'FR', full: 'Français',    flag: '🇫🇷' },
  { code: 'rw', label: 'RW', full: 'Kinyarwanda', flag: '🇷🇼' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [langOpen,    setLangOpen]    = useState(false)
  const [active,      setActive]      = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i])
        if (el && el.getBoundingClientRect().top <= 90) {
          setActive(NAV_ITEMS[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.lang-wrapper')) setLangOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [langOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const currentLang = LANGS.find(l => l.code === i18n.language) ?? LANGS[0]

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className={clsx(
          'fixed top-0 inset-x-0 z-50 h-[68px] flex items-center',
          'px-5 sm:px-8 lg:px-12 transition-all duration-500',
          scrolled
            ? 'glass border-b border-[var(--border2)]'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-display font-black text-base tracking-tight gradient-text select-none flex-shrink-0"
        >
          UP<span style={{ color: 'var(--secondary)' }}>.</span>
        </button>

        {/* Desktop links — centered */}
        <ul className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={clsx('nav-link capitalize', active === id && 'active')}
              >
                {t(`nav.${id}`)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Lang */}
          <div className="lang-wrapper relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest
                         text-[var(--text3)] hover:text-[var(--text)] transition-colors"
            >
              <Globe size={12} strokeWidth={2} />
              {currentLang.label}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-3 glass rounded-xl overflow-hidden min-w-[140px] shadow-2xl shadow-black/40"
                >
                  {LANGS.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false) }}
                      className={clsx(
                        'flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors text-left',
                        i18n.language === lang.code
                          ? 'text-[var(--primary)]'
                          : 'text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.full}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-[var(--text3)] hover:text-[var(--text)] transition-colors"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center
                       text-[var(--text3)] hover:text-[var(--text)] transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-2
                       bg-[var(--bg)] lg:hidden"
          >
            {NAV_ITEMS.map((id, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() => scrollTo(id)}
                className={clsx(
                  'font-display font-black text-3xl capitalize transition-colors py-2',
                  active === id
                    ? 'gradient-text'
                    : 'text-[var(--text3)] hover:text-[var(--text)]'
                )}
              >
                {t(`nav.${id}`)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
