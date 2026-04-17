import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ZoomIn } from 'lucide-react'

// Placeholder gallery items (replace src with real image URLs)
const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80', alt: 'Coding setup', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt: 'Web development', span: '' },
  { src: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80', alt: 'Programming', span: '' },
  { src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80', alt: 'Laptop workspace', span: '' },
  { src: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&q=80', alt: 'Code on screen', span: '' },
  { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80', alt: 'Developer tools', span: '' },
  { src: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80', alt: 'HTML CSS project', span: 'col-span-2' },
]

export default function GallerySection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const slides = GALLERY_ITEMS.map(item => ({ src: item.src, alt: item.alt }))

  return (
    <section id="gallery" className="relative overflow-hidden">
      <div className="section-wrapper" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label justify-center">{t('gallery.label')}</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text)] mb-3">
            {t('gallery.title')}
          </h2>
          <p className="text-[var(--text2)] max-w-lg mx-auto">{t('gallery.subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                />
              </div>
              {/* Corner accent */}
              <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-[var(--primary)] opacity-0 group-hover:opacity-80 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.95)' },
        }}
      />
    </section>
  )
}
