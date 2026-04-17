import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--border2)', background: 'var(--bg2)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <span className="font-display font-black text-base gradient-text">UP.</span>

          {/* Caption */}
          <p className="text-[12px] font-mono text-center" style={{ color: 'var(--text3)' }}>
            © {year} Uwamwezi Phionah · {t('footer.rights')}
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/rubera118', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/uwamwezi-phionah-4139203aa/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:uwaphiona11@gmail.com', icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors hover:text-[var(--text)]"
                style={{ color: 'var(--text3)' }}
              >
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
