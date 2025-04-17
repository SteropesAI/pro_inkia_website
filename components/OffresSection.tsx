import React from 'react';
import Link from 'next/link';

import CollectionSection from '@/components/CollectionSection';

export default function OffresSection() {
  return (
    <section id="offres" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">NOS OFFRES 2</h2>
          <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Des solutions artistiques adaptées à vos besoins professionnels
          </p>
        </div>

        {/* IMPACT Section */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#66C6E8] to-[#922B21]">A - IMPACT</span>
            <span className="block text-lg font-normal mt-2 text-neutral-600">Pour un espace unique à valoriser</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collection */}
            <div className="bg-neutral-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="bg-[#FFECDB] p-6">
                <h4 className="text-2xl font-bold mb-2">1. COLLECTION</h4>
                <p className="text-neutral-700 font-medium">Devenez propriétaire d'une œuvre qui vous ressemble</p>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-neutral-600 mb-6">
                  Acquérez une œuvre d'art qui sublimera votre espace professionnel et captivera votre clientèle.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Tableaux grand format (jusqu'à 120 cm)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Designs exclusifs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Différentes collections thématiques disponibles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Achat direct ou paiement mensuel</span>
                  </li>
                </ul>
                <p className="italic text-neutral-500 text-sm">
                  Idéal pour : Boutiques, cabinets, restaurants souhaitant investir dans une décoration distinctive et durable.
                </p>
              </div>
              <div className="p-6 bg-neutral-100">
                <div className="mb-4">
                  <span className="text-sm text-neutral-500">À partir de</span>
                  <div className="text-3xl font-bold text-[#66C6E8]">70€</div>
                </div>
                <Link 
                  href="#contact" 
                  className="block text-center py-3 px-4 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Signature */}
            <div className="bg-neutral-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="bg-[#FFECDB] p-6">
                <h4 className="text-2xl font-bold mb-2">2. SIGNATURE</h4>
                <p className="text-neutral-700 font-medium">Une œuvre unique conçue exclusivement pour vous</p>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-neutral-600 mb-6">
                  Exprimez votre identité à travers une création artistique personnalisée.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Consultation créative dédiée</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Design sur-mesure selon vos souhaits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Format adapté à votre espace</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Œuvre exclusive qui vous appartient pleinement</span>
                  </li>
                </ul>
                <p className="italic text-neutral-500 text-sm">
                  Idéal pour : Établissements souhaitant une œuvre reflétant parfaitement leur identité et leurs valeurs.
                </p>
              </div>
              <div className="p-6 bg-neutral-100">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-[#66C6E8]">Sur devis</div>
                </div>
                <Link 
                  href="#contact" 
                  className="block text-center py-3 px-4 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            {/* Évolution */}
            <div className="bg-neutral-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="bg-[#FFECDB] p-6">
                <h4 className="text-2xl font-bold mb-2">3. ÉVOLUTION</h4>
                <p className="text-neutral-700 font-medium">Renouvelez votre décor au fil des saisons</p>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-neutral-600 mb-6">
                  Maintenez la fraîcheur de votre espace avec un renouvellement artistique régulier.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>4 tableaux différents par an</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Designs exclusifs adaptés à la saisonnalité</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Installation et remplacement inclus</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Uniquement sur Pau et sa région</span>
                  </li>
                </ul>
                <p className="italic text-neutral-500 text-sm">
                  Idéal pour : Commerces souhaitant maintenir une fraîcheur visuelle et surprendre régulièrement leur clientèle.
                </p>
              </div>
              <div className="p-6 bg-neutral-100">
                <div className="mb-4">
                  <span className="text-sm text-neutral-500">À partir de</span>
                  <div className="text-3xl font-bold text-[#66C6E8]">45€<span className="text-lg font-normal">/mois</span></div>
                  <div className="text-xs text-neutral-500">Engagement 12 mois</div>
                </div>
                <Link 
                  href="#contact" 
                  className="block text-center py-3 px-4 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZON Section */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#66C6E8] to-[#922B21]">B - HORIZON</span>
            <span className="block text-lg font-normal mt-2 text-neutral-600">Décoration artistique pour espaces multiples</span>
          </h3>

          <div className="bg-neutral-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-4">Pour grands espaces et multi-sites</h4>
                <p className="text-neutral-600 mb-6">
                  Déployez une identité artistique cohérente à travers plusieurs espaces, que ce soit au sein d'un même établissement ou à travers différents sites.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Cohérence visuelle à travers plusieurs espaces ou sites</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Adaptation aux différentes zones et fonctions des espaces</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Solutions pour halls d'accueil, espaces de travail, salles de réunion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Tarifs dégressifs selon le volume</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Coordination des installations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Gestion centralisée de votre projet</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-[#66C6E8]">Sur devis personnalisé</div>
                </div>
                <Link 
                  href="#contact" 
                  className="inline-block py-3 px-6 bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold rounded-md transition-all duration-300"
                >
                  Demander un devis
                </Link>
              </div>
              <div className="bg-neutral-100 p-8">
                <h4 className="text-xl font-semibold mb-4">Idéal pour :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Grands établissements avec plusieurs espaces à décorer (hôtels, espaces événementiels)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Entreprises avec open spaces et multiples bureaux</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Franchises et réseaux commerciaux</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Chaînes hôtelières</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#66C6E8] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Institutions avec plusieurs départements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}