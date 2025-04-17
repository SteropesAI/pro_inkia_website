import React from 'react';
import { Award, Palette, RefreshCw, Shield } from 'lucide-react';

export default function GarantiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">NOS GARANTIES</h2>
          <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 flex flex-col items-center">
            <div className="bg-[#66C6E8] p-4 rounded-full mb-4">
              <Shield className="text-[#FFFFFF] h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Installation professionnelle</h3>
            <p className="text-neutral-600 text-sm">Incluse sur Pau et sa région</p>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 flex flex-col items-center">
            <div className="bg-[#66C6E8] p-4 rounded-full mb-4">
              <RefreshCw className="text-[#FFFFFF] h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Satisfaction visuelle garantie</h3>
            <p className="text-neutral-600 text-sm">Remplacement sous 14 jours si l'œuvre ne vous convient pas</p>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 flex flex-col items-center">
            <div className="bg-[#66C6E8] p-4 rounded-full mb-4">
              <Award className="text-[#FFFFFF] h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Exclusivité locale</h3>
            <p className="text-neutral-600 text-sm">Aucun établissement n'aura le même tableau</p>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 flex flex-col items-center">
            <div className="bg-[#66C6E8] p-4 rounded-full mb-4">
              <Palette className="text-[#FFFFFF] h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Conseils personnalisés</h3>
            <p className="text-neutral-600 text-sm">Pour une intégration optimale dans votre espace</p>
          </div>
        </div>
      </div>
    </section>
  );
}