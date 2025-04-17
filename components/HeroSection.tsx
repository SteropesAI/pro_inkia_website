import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="w-full h-full bg-[url('/hero1.png')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-left md:text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            L'ART QUI <span className="text-[#66C6E8]">TRANSFORME</span> VOTRE ESPACE
            </h1>
        <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto mb-10">
          Des tableaux exclusifs pour valoriser votre espace professionnel et captiver votre clientèle
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#offres" 
            className="px-8 py-4 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Découvrir nos offres <ArrowRight size={18} />
          </Link>
          <Link 
            href="#contact" 
            className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            Nous contacter
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <Link href="#offres" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}