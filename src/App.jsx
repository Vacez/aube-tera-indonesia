import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { ScrollRevealSection } from './components/ScrollRevealSection/ScrollRevealSection';
import { HeroSection } from './sections/Hero/HeroSection';
import { AboutSection } from './sections/About/AboutSection';
import { VisionMissionSection } from './sections/VisionMission/VisionMissionSection';
import { WhyChooseUsSection } from './sections/WhyChooseUs/WhyChooseUsSection';
import { ServicesSection } from './sections/Services/ServicesSection';
import { TechnologiesSection } from './sections/Technologies/TechnologiesSection';
import { PortfolioSection } from './sections/Portfolio/PortfolioSection';
import { ProcessSection } from './sections/Process/ProcessSection';
import { CTASection } from './sections/CTA/CTASection';
import { TestimonialsSection } from './sections/Testimonials/TestimonialsSection';
import { FAQSection } from './sections/FAQ/FAQSection';
import { ContactSection } from './sections/Contact/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp/FloatingWhatsApp';
import { Footer } from './components/Footer/Footer';
import ThreeGlobeBackground from './components/ThreeGlobe/ThreeGlobeBackground';
import { useTheme } from './context/ThemeContext';

// AI Components
import { AubeAIButton } from './components/ai/AubeAIButton';
import { AubeAIChat } from './components/ai/AubeAIChat';
import { AIProjectEstimator } from './components/ai/AIProjectEstimator';

export function App() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen relative flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Persistent 3D Interactive Cyber Globe that stays visible during scrolling */}
      <ThreeGlobeBackground isFixed={true} interactive={true} />

      {/* Scroll Progress Bar at the top */}
      <div className="relative z-50">
        <ScrollProgress />
      </div>

      {/* Sticky Header Navigation */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Main Page Sections with Scroll Entrance Animations */}
      <main className="flex-grow relative z-10">
        <HeroSection onOpenAi={() => setIsAiChatOpen(true)} />

        <ScrollRevealSection>
          <AboutSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <VisionMissionSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <WhyChooseUsSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <ServicesSection />
        </ScrollRevealSection>

        {/* AI Feature #3: Interactive AI Project Estimator */}
        <ScrollRevealSection>
          <AIProjectEstimator onOpenConsultant={() => setIsAiChatOpen(true)} />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <TechnologiesSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <PortfolioSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <ProcessSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <CTASection onOpenAi={() => setIsAiChatOpen(true)} />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <TestimonialsSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <FAQSection />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <ContactSection />
        </ScrollRevealSection>
      </main>

      {/* Floating Action Elements */}
      <FloatingWhatsApp />

      {/* AI Feature #1: Floating ✨ AUBE AI Button */}
      <AubeAIButton 
        onClick={() => setIsAiChatOpen(!isAiChatOpen)} 
        isOpen={isAiChatOpen} 
      />

      {/* Floating ✨ AUBE AI Chat Modal */}
      <AubeAIChat 
        isOpen={isAiChatOpen} 
        onClose={() => setIsAiChatOpen(false)} 
      />

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}

export default App;
