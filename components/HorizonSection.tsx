"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HorizonSection() {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Propriétés de l'offre HORIZON
  const horizonData = {
    title: "HORIZON",
    subtitle: "Décoration artistique pour espaces multiples",
    description: "Déployez une identité artistique cohérente à travers plusieurs espaces, que ce soit au sein d'un même établissement ou à travers différents sites.",
    imageSrc: "/horizon.png",
    features: [
      "Cohérence visuelle à travers plusieurs espaces ou sites",
      "Adaptation aux différentes zones et fonctions des espaces",
      "Solutions pour halls d'accueil, espaces de travail, salles de réunion",
      "Tarifs dégressifs selon le volume",
      "Coordination des installations",
      "Gestion centralisée de votre projet"
    ],
    idealFor: [
      "Grands établissements avec plusieurs espaces à décorer (hôtels, espaces événementiels)",
      "Entreprises avec open spaces et multiples bureaux",
      "Franchises et réseaux commerciaux",
      "Chaînes hôtelières",
      "Institutions avec plusieurs départements"
    ],
    price: "Sur devis personnalisé",
    linkText: "Demander un devis",
    linkHref: "#contact"
  };

   // Gestion du mouvement de la souris pour l'effet 3D - avec typage correct
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculer la position relative de la souris par rapport au centre de la carte
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  // Calcul des valeurs de transformation 3D
  const transform = isHovered ? 
    `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)` : 
    'perspective(1000px) rotateX(0) rotateY(0)';

  // Calcul de la position du reflet/halo
  const lightPosition = {
    x: mousePosition.x * 100,
    y: mousePosition.y * 100
  };

  return (
    <div className="mb-24">
      <h3 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#66C6E8] to-[#922B21]">HORIZON</span>
        <span className="block text-lg font-normal mt-2 text-[#6D6D6D]">Décoration artistique pour espaces multiples</span>
      </h3>

      <div 
        ref={cardRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-500"
        style={{
          transform: transform,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Couche d'arrière-plan */}
        <div className="relative h-64 md:h-80 w-full">
          <div className="absolute inset-0 "></div>
          <Image 
            src={horizonData.imageSrc} 
            alt="Horizon service" 
            fill 
            className="object-cover"
          />
          
          {/* Effet de halo/reflet qui suit le curseur */}
          {isHovered && (
            <div 
              className="absolute inset-0 z-20 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 50%)`
              }}
            ></div>
          )}
          
          {/* Titre et sous-titre sur l'image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-30">
            <h4 className="text-3xl font-bold text-white">Pour grands espaces et multi-sites</h4>
            <p className="text-xl text-gray-400 mt-2 max-w-2xl">
              {horizonData.description}
            </p>
          </div>
        </div>
        
        {/* Contenu principal - Organisation en grid pour un vrai côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Colonne gauche: Caractéristiques */}
          <div>
            <h5 className="text-xl font-semibold text-gray-800 mb-6">Caractéristiques</h5>
            <ul className="space-y-4">
              {horizonData.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <div className="text-[#E67E22] mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colonne droite: Idéal pour */}
          <div>
            <h5 className="text-xl font-semibold text-gray-800 mb-6">Idéal pour :</h5>
            <ul className="space-y-4">
              {horizonData.idealFor.map((ideal, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <div className="text-[#1ABC9C] mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{ideal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Pied de carte avec prix et bouton */}
        <div className="p-8 bg-gray-700 border-t border-[#505050]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-[#F1D282]">{horizonData.price}</div>
            </div>
            <Link 
              href={horizonData.linkHref} 
              className="inline-block py-3 px-6 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300 shadow-lg"
            >
              {horizonData.linkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}