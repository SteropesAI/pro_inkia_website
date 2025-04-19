"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface CollectionCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  price: string;
  features: string[];
  idealFor: string;
  linkText: string;
  linkHref: string;
}

export default function CollectionCard({
  title,
  subtitle,
  description,
  imageSrc,
  price,
  features,
  idealFor
}: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Gestion du mouvement de la souris pour l'effet 3D
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
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      style={{
        transform: transform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Effet de halo/reflet qui suit le curseur */}
        {isHovered && (
          <div 
            className="absolute inset-0 z-20 opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 50%)`
            }}
          ></div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h4 className="text-2xl font-bold mb-1">{title}</h4>
          <p className="text-white/90 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <p className="text-gray-700 mb-6">
          {description}
        </p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <div className="text-[#66C6E8] mr-2 mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="italic text-gray-500 text-sm mb-4">
          Idéal pour : {idealFor}
        </p>
      </div>

      <div className="p-4 bg-gray-700 mt-auto">
        <div className="mb-4">
          <span className="text-sm text-[#66C6E8]">À partir de</span>
          <div className="text-2xl font-bold text-[#F1D282]">{price}</div>
        </div>
      </div>
    </div>
  );
}