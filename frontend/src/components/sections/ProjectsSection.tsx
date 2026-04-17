import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Github } from 'lucide-react'
import { getProjects, type Project } from '@/services/api'

const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Urban Bites',
    description:
      'A responsive restaurant website built with HTML and CSS to present a business professionally online. This project demonstrates layout structure, visual hierarchy, and mobile-first thinking for a real brand scenario.',
    description_fr:
      'Un site web responsive de restaurant construit avec HTML et CSS pour présenter une entreprise en ligne de manière professionnelle. Ce projet montre la structure du layout, la hiérarchie visuelle et une approche mobile-first.',
    description_rw:
      "Urubuga rwa restaurant rwubatswe na HTML na CSS kugira ngo ubucuruzi bwerekanwe neza online. Uyu mushinga werekana layout nziza, visual hierarchy n'imitekereze ya mobile-first.",
    image_url: '',
    live_url: '#',
    github_url: 'https://github.com/rubera118',
    tags: ['HTML5', 'CSS3', 'Responsive', 'Multi-page'],
    featured: true,
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Portfolio v2',
    description:
      'A full-stack portfolio designed to communicate credibility, personality, and technical range. It combines React, FastAPI, Supabase, animation, multilingual support, and deploy-ready structure in one polished product.',
    description_fr:
      "Un portfolio full-stack conçu pour communiquer la crédibilité, la personnalité et l'étendue technique. Il combine React, FastAPI, Supabase, animation, support multilingue et structure prête au déploiement.",
    description_rw:
      "Portfolio yuzuye yakozwe kugira ngo yerekane credibility, personality n'ubumenyi bwa tekiniki. Ihuza React, FastAPI, Supabase, animation na support y'indimi nyinshi muri product iteguye neza.",
    image_url: '',
    live_url: '#',
    github_url: 'https://github.com/rubera118',
    tags: ['React', 'TypeScript', 'FastAPI', 'Supabase', 'Tailwind'],
    featured: true,
    order: 2,
    created_at: new Date().toISOString(),
  },
]

const TAG_COLOR: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3B82F6',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  FastAPI: '#009688',
  Supabase: '#3ECF8E',
  Tailwind: '#38BDF8',
  Responsive: '#7C6FFF',
  'Multi-page': '#00D4AA',
}

const PROJECT_PROOF: Record<string, { en: string[]; fr: string[]; rw: string[] }> = {
  'Urban Bites': {
    en: ['Responsive layout planning', 'Brand-focused visual design', 'Semantic HTML/CSS fundamentals'],
    fr: ['Planification responsive', 'Design visuel orienté marque', 'Fondamentaux HTML/CSS sémantiques'],
    rw: ['Gutegura responsive layout', 'Design yibanda kuri brand', 'HTML/CSS zubatswe neza'],
  },
  'Portfolio v2': {
    en: ['Full-stack integration', 'Production-ready deployment thinking', 'Stronger personal positioning'],
    fr: ['Intégration full-stack', 'Pensée orientée déploiement', 'Meilleur positionnement personnel'],
    rw: ['Full-stack integration', 'Gutegura deployment', "Kwigaragaza neza nk'umukora software"],
  },
}

function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: string }) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const currentLang = lang === 'fr' || lang === 'rw' ? lang : 'en'

  const desc =
    currentLang === 'fr' && project.description_fr
      ? project.description_fr
      : currentLang === 'rw' && project.description_rw
        ? project.description_rw
        : project.description

  const proof = PROJECT_PROOF[project.title]?.[currentLang] ?? []

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative card flex flex-col lg:flex-row"
    >
      <div
        className="relative w-full lg:w-80 lg:flex-shrink-0 h-52 lg:h-auto overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${TAG_COLOR[project.tags[0]] ?? '#7C6FFF'}18, transparent 70%), var(--bg4)`,
        }}
      >
        <span
          className="absolute top-5 left-5 font-display font-black text-6xl leading-none select-none"
          style={{ color: `${TAG_COLOR[project.tags[0]] ?? '#7C6FFF'}18` }}
        >
          0{index + 1}
        </span>

        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{ background: `${TAG_COLOR[tag] ?? '#7C6FFF'}20`, color: TAG_COLOR[tag] ?? '#7C6FFF' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-7 lg:p-10">
        {project.featured && (
          <span
            className="self-start text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4"
            style={{ background: 'var(--secondary-dim)', color: 'var(--secondary)' }}
          >
            Featured
          </span>
        )}

        <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-3" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--text2)' }}>
          {desc}
        </p>

        {proof.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-2.5" style={{ color: 'var(--text3)' }}>
              {currentLang === 'fr' ? 'Ce que cela prouve' : currentLang === 'rw' ? 'Icyo byerekana' : 'What this shows'}
            </p>
            <div className="flex flex-wrap gap-2">
              {proof.map(item => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-7">
          <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-2.5" style={{ color: 'var(--text3)' }}>
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg"
                style={{
                  background: `${TAG_COLOR[tag] ?? '#7C6FFF'}14`,
                  color: TAG_COLOR[tag] ?? '#7C6FFF',
                  border: `1px solid ${TAG_COLOR[tag] ?? '#7C6FFF'}28`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.live_url && project.live_url !== '#' && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary py-2.5 px-5 text-xs">
              {t('projects.live')}
              <ArrowUpRight size={13} />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-ghost py-2.5 px-5 text-xs">
              <Github size={13} />
              {t('projects.github')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const { t, i18n } = useTranslation()
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  useEffect(() => {
    getProjects()
      .then(data => {
        if (data.length > 0) setProjects(data)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-[var(--primary)] top-0 right-0" />
      </div>

      <div className="section-wrapper" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl"
        >
          <p className="eyebrow">{t('projects.label')}</p>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4" style={{ color: 'var(--text)' }}>
            {t('projects.title')}
          </h2>
          <p className="text-base" style={{ color: 'var(--text2)' }}>
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} lang={i18n.language} />
          ))}
        </div>
      </div>
    </section>
  )
}
