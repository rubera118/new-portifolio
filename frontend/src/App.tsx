import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import ScrollProgress  from '@/components/ui/ScrollProgress'
import HeroSection     from '@/components/sections/HeroSection'
import AboutSection    from '@/components/sections/AboutSection'
import HighlightsSection from '@/components/sections/HighlightsSection'
import SkillsSection   from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AwardsSection   from '@/components/sections/AwardsSection'
import GallerySection  from '@/components/sections/GallerySection'
import BlogSection     from '@/components/sections/BlogSection'
import ContactSection  from '@/components/sections/ContactSection'

export default function App() {
  return (
    <ThemeProvider>
      <div className="noise min-h-screen">
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <HighlightsSection />
          <SkillsSection />
          <ProjectsSection />
          <AwardsSection />
          <GallerySection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  )
}
