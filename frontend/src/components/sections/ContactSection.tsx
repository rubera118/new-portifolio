import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Send, Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { sendContact, type ContactPayload } from '@/services/api'

export default function ContactSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactPayload>()

  const onSubmit = async (data: ContactPayload) => {
    try {
      await sendContact(data)
      toast.success(t('contact.success'), {
        style: { background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border)' },
        iconTheme: { primary: 'var(--secondary)', secondary: 'white' },
      })
      reset()
    } catch {
      toast.error(t('contact.error'), {
        style: { background: 'var(--bg3)', color: 'var(--text)', border: '1px solid #ff6b9d44' },
      })
    }
  }

  const contacts = [
    { icon: Mail,   label: t('contact.email_label'), value: 'uwaphiona11@gmail.com',   href: 'mailto:uwaphiona11@gmail.com' },
    { icon: Phone,  label: t('contact.phone_label'), value: '+250 793 838 275',         href: 'tel:+250793838275' },
    { icon: MapPin, label: t('contact.location_label'), value: 'Kigali, Rwanda',        href: 'https://maps.google.com/?q=Kigali+Rwanda' },
  ]

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-[var(--primary)] bottom-0 left-0" />
        <div className="orb w-[400px] h-[400px] bg-[var(--secondary)] top-0 right-0" />
      </div>

      <div className="section-wrapper" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          >
            <p className="eyebrow">{t('contact.label')}</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: 'var(--text)' }}>
              {t('contact.title')}
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--text2)' }}>
              {t('contact.subtitle')}
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl p-4 transition-all
                             hover:border-[var(--border)]"
                  style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--text3)' }}>{label}</p>
                    <p className="text-sm font-medium truncate group-hover:text-[var(--primary)] transition-colors"
                      style={{ color: 'var(--text)' }}>{value}</p>
                  </div>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color: 'var(--primary)' }} />
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a href="https://github.com/rubera118" target="_blank" rel="noopener noreferrer"
                className="btn-ghost py-2.5 px-5 text-xs flex-1 justify-center">
                <Github size={13} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/uwamwezi-phionah-4139203aa/" target="_blank" rel="noopener noreferrer"
                className="btn-ghost py-2.5 px-5 text-xs flex-1 justify-center">
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl p-7 sm:p-9 space-y-4"
              style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('name', { required: 'Name required', minLength: { value: 2, message: 'Min 2 chars' } })}
                    placeholder={t('contact.name')}
                    className="form-input"
                  />
                  {errors.name && (
                    <p className="text-[11px] mt-1" style={{ color: 'var(--accent)' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                    placeholder={t('contact.email')}
                    type="email"
                    className="form-input"
                  />
                  {errors.email && (
                    <p className="text-[11px] mt-1" style={{ color: 'var(--accent)' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <input
                {...register('subject')}
                placeholder={t('contact.subject')}
                className="form-input"
              />

              <div>
                <textarea
                  {...register('message', { required: 'Message required', minLength: { value: 10, message: 'Min 10 chars' } })}
                  placeholder={t('contact.message')}
                  rows={5}
                  className="form-input resize-none"
                />
                {errors.message && (
                  <p className="text-[11px] mt-1" style={{ color: 'var(--accent)' }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
