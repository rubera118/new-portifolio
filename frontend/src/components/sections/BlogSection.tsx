import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Calendar, Tag } from 'lucide-react'
import { getBlogPosts, type BlogPost } from '@/services/api'

function BlogCard({ post, index, lang }: { post: BlogPost; index: number; lang: string }) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const title =
    lang === 'fr' && post.title_fr ? post.title_fr :
    lang === 'rw' && post.title_rw ? post.title_rw :
    post.title

  const excerpt =
    lang === 'fr' && post.excerpt_fr ? post.excerpt_fr :
    lang === 'rw' && post.excerpt_rw ? post.excerpt_rw :
    post.excerpt

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden border border-[var(--border)] card-glow group flex flex-col"
    >
      {/* Cover */}
      <div className="h-44 bg-gradient-to-br from-[rgba(108,99,255,0.15)] to-[rgba(0,191,166,0.15)] relative overflow-hidden">
        {post.cover_image ? (
          <img src={post.cover_image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-5xl opacity-10 text-[var(--primary)]">✍</span>
          </div>
        )}
        {/* Tag */}
        {post.tags?.[0] && (
          <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded-full bg-[var(--primary)] text-white">
            {post.tags[0]}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-xs text-[var(--text3)]">
            <Calendar size={11} />
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-display font-bold text-base text-[var(--text)] mb-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[var(--text2)] leading-relaxed flex-1 mb-4">{excerpt}</p>

        <button className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:gap-2.5 transition-all">
          {t('blog.read_more')}
          <ArrowUpRight size={13} />
        </button>
      </div>
    </motion.article>
  )
}

function ComingSoon() {
  const { t } = useTranslation()
  return (
    <div className="glass rounded-2xl border border-[var(--border)] p-16 text-center max-w-lg mx-auto">
      <div className="text-5xl mb-4">✍️</div>
      <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">{t('blog.coming_soon')}</h3>
      <p className="text-[var(--text2)] text-sm">{t('blog.coming_soon_msg')}</p>
    </div>
  )
}

export default function BlogSection() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    getBlogPosts()
      .then(data => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="blog" className="relative overflow-hidden bg-[var(--bg2)]">
      <div className="section-wrapper" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label justify-center">{t('blog.label')}</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text)] mb-3">
            {t('blog.title')}
          </h2>
          <p className="text-[var(--text2)] max-w-lg mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} lang={i18n.language} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
