import React from 'react';
import { Award, Eye, MessageSquare, Star } from 'lucide-react';

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">POURQUOI NOUS CHOISIR ?</h2>
          <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-start">
              <div className="bg-[#66C6E8] p-3 rounded-lg mr-4">
                <Eye className="text-[#FFFFFF] h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">CAPTEZ L'ATTENTION</h3>
                <p className="text-neutral-300">
                  Nos œuvres aux couleurs vibrantes et aux compositions dynamiques attirent immédiatement le regard et créent un point focal dans votre espace.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#66C6E8] p-3 rounded-lg mr-4">
                <Award className="text-[#FFFFFF] h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">VALORISEZ VOTRE IMAGE</h3>
                <p className="text-neutral-300">
                  L'art dans un espace professionnel communique une image innovante, créative et attentive aux détails.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="flex items-start">
              <div className="bg-[#66C6E8] p-3 rounded-lg mr-4">
                <MessageSquare className="text-[#FFFFFF] h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">CRÉEZ DES CONVERSATIONS</h3>
                <p className="text-neutral-300">
                  Nos tableaux suscitent naturellement commentaires et discussions, enrichissant l'expérience de vos clients et visiteurs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#66C6E8] p-3 rounded-lg mr-4">
                <Star className="text-[#FFFFFF] h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">INVESTISSEZ DURABLEMENT</h3>
                <p className="text-neutral-300">
                  Contrairement aux tendances décoratives éphémères, nos créations artistiques sont un investissement à long terme qui conserve sa valeur et apporte une distinction durable à votre espace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}