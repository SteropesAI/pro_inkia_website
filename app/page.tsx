import React from 'react';
import { ArrowRight, Award, Eye, MessageSquare, Palette, RefreshCw, Shield, Star } from 'lucide-react';
import Link from 'next/link';

// Import des sections modulaires (à définir dans des fichiers séparés)
import HeroSection from '@/components/HeroSection';
import OffresSection from '@/components/OffresSection';
import CollectionSection from '@/components/CollectionSection';
import HorizonSection from '@/components/HorizonSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import GarantiesSection from '@/components/GarantiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <HeroSection />
      {/* Section Offres */}
      <section id="offres" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">NOS OFFRES</h2>
          <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Des solutions artistiques adaptées à vos besoins professionnels
            </p>
          </div>
          
          {/* Section IMPACT avec les cartes interactives */}
          <CollectionSection />
          
          {/* Section HORIZON avec la carte pleine largeur */}
          <HorizonSection />
          </div>
      </section>
      <WhyChooseUsSection />
      <GarantiesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}