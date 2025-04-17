'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';

type Space = {
  title: string;
  description: string;
  image: string;
};

const spaces: Space[] = [
  {
    title: "Petits Commerces",
    description: "Solutions d'éclairage innovantes pour sublimer vos espaces commerciaux",
    image: "/heroB.png"
  },
  {
    title: "Halls d'Entreprise",
    description: "Illumination professionnelle pour créer une première impression mémorable",
    image: "/heroB.png"
  },
  {
    title: "Hôtels",
    description: "Éclairage élégant et sophistiqué pour l'industrie hôtelière",
    image: "/heroB.png"
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % spaces.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + spaces.length) % spaces.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevSlide();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Transition */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <Image
          src={spaces[currentIndex].image}
          alt={spaces[currentIndex].title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-4xl mx-auto transition-all duration-500 transform">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {spaces[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl mb-12">
            {spaces[currentIndex].description}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-8 mt-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex gap-3">
            {spaces.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`Aller à l'espace ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
