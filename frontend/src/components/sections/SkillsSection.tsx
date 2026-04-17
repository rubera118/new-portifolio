import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SKILLS = [
  { name: 'HTML5',             level: 90, color: '#E34F26' },
  { name: 'CSS3',              level: 85, color: '#1572B6' },
  { name: 'JavaScript',        level: 78, color: '#F7DF1E' },
  { name: 'React.js',          level: 72, color: '#61DAFB' },
  { name: 'Responsive Design', level: 88, color: '#00D4AA' },
  { name: 'Git / GitHub',      level: 75, color: '#F05032' },
  { name: 'Problem Solving',   level: 85, color: '#7C6FFF' },
  { name: 'FastAPI / Python',  level: 62, color: '#009688' },
]

const TOOLS = [
  { name: 'VS Code',  color: '#007ACC' },
  { name: 'Figma',    color: '#A259FF' },
  { name: 'GitHub',   color: '#E5E7EB' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Vercel',   color: '#E5E7EB' },
  { name: 'Postman',  color: '#FF6C37' },
  { name: 'Railway',  color: '#7C6FFF' },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const fillRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  useEffect(() => {
    if (inView && fillRef.current) {
      fillRef.current.style.transitionDelay = `${delay}s`
      fillRef.current.classList.add('in')
      fillRef.current.style.width = `${level}%`
    }
  }, [inView, delay, level])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{name}</span>
        <span className="text-[11px] font-mono" style={{ color: 'var(--text3)' }}>{level}%</span>
      </div>
      <div className="skill-track">
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            width: 0,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            transition: 'width 1.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[450px] h-[450px] bg-[var(--primary)] bottom-0 left-0" />
      </div>

      <div className="section-wrapper" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-16">

          {/* ── Left: Header + Skills ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="eyebrow">{t('skills.label')}</p>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4"
                style={{ color: 'var(--text)' }}>
                {t('skills.title')}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text2)' }}>
                {t('skills.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-5">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.07} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block w-px self-stretch"
            style={{ background: 'var(--border2)' }}
          />

          {/* ── Right: Tools + Currently Learning ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Tools */}
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--text3)' }}>
                Tools & Environment
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {TOOLS.map(tool => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-default
                               hover:border-[var(--border)] group"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: tool.color }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently learning box */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--secondary)' }}>
                  Currently Learning
                </p>
              </div>
              <div className="space-y-2">
                {['Next.js', 'PostgreSQL', 'Docker', 'TypeScript (Advanced)'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span style={{ color: 'var(--primary)' }}>→</span>
                    <span className="text-sm" style={{ color: 'var(--text2)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
