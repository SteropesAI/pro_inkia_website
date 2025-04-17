"use client";

import React, { useState } from 'react';
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
  idealFor,
  linkText,
  linkHref
}: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-[#404040] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: isHovered ? '200px' : '300px' }}>
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover transition-all duration-500"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            opacity: isHovered ? 0.8 : 1
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#404040] to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h4 className="text-2xl font-bold mb-1">{title}</h4>
          <p className="text-white/90 font-medium">{subtitle}</p>
        </div>
      </div>

      <div 
        className="transition-all duration-500 overflow-hidden"
        style={{ 
          maxHeight: isHovered ? '500px' : '0',
          opacity: isHovered ? 1 : 0,
          padding: isHovered ? '1.5rem' : '0 1.5rem'
        }}
      >
        <p className="text-white/80 mb-6">
          {description}
        </p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-white/80">
              <div className="text-[#E67E22] mr-2 mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="italic text-white/60 text-sm mb-4">
          Idéal pour : {idealFor}
        </p>
      </div>

      <div className="p-4 bg-[#333333] mt-auto">
        <div className="mb-4">
          <span className="text-sm text-white/60">À partir de</span>
          <div className="text-3xl font-bold text-[#66C6E8]">{price}</div>
        </div>
        
      </div>
    </div>
  );
}