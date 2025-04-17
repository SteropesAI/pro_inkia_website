import React from 'react';
import Link from 'next/link';

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NOS SOLUTIONS</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez notre gamme de solutions pour sublimer votre espace professionnel avec des œuvres d'art uniques qui captiveront vos clients.
          </p>
        </div>
      </section>

      {/* Offres Détaillées */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Offre Découverte */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16 transform transition hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-3 text-[#E67E22]">DÉCOUVERTE</h2>
                  <p className="text-xl text-blue-300 mb-4">Testez avant d'adopter</p>
                  <p className="text-2xl font-bold text-white">
                    <span className="text-amber-300">15€</span> de caution
                  </p>
                  <p className="text-sm text-blue-200">Remboursable ou déductible</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <p className="italic text-gray-300 mb-4 border-l-4 border-blue-500 pl-4">
                    "Essayez un tableau d'exception pour 15€ seulement pendant un mois. Si vous l'adoptez, cette somme est déduite du prix final."
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Tableau vitrine (60x30 cm) en prêt pour 1 mois</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Choix parmi 5 modèles contemporains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Caution minime de 15€, remboursable ou déductible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Prix d'achat après essai : 45€</span>
                    </li>
                  </ul>
                  <div className="bg-blue-900/30 p-4 rounded-lg mb-6">
                    <p className="font-bold text-amber-300 mb-1">OFFRE SPÉCIALE LANCEMENT</p>
                    <p>Décidez dans les 15 jours et recevez un mini-tableau décoratif offert (valeur 20€)</p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/solutions/discovery" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Choisir cette offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Abonnement Premium */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16 transform transition hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-3 text-[#E67E22]">ABONNEMENT PREMIUM</h2>
                  <p className="text-xl text-blue-300 mb-4">Une décoration toujours dans l'air du temps</p>
                  <p className="text-2xl font-bold text-white">
                    <span className="text-amber-300">25€</span>/mois
                  </p>
                  <p className="text-sm text-blue-200">Engagement 12 mois</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <p className="italic text-gray-300 mb-4 border-l-4 border-blue-500 pl-4">
                    "Pour moins d'1€ par jour, offrez une nouvelle ambiance à votre espace chaque saison et distinguez-vous de la concurrence."
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Un tableau grand format renouvelé 4 fois par an</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Designs exclusifs adaptés aux saisons</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Installation et remplacement inclus sur Pau</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Certificat d'exclusivité territoriale</span>
                    </li>
                  </ul>
                  <div className="mb-6">
                    <p className="font-bold text-blue-300">Pack Duo : 40€/mois pour deux tableaux</p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/solutions/premium" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Choisir cette offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offre Signature */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16 transform transition hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-3 text-[#E67E22]">SIGNATURE</h2>
                  <p className="text-xl text-blue-300 mb-4">Une œuvre exclusive prête à sublimer votre espace</p>
                  <p className="text-2xl font-bold text-white">
                    <span className="text-amber-300">299€</span>
                  </p>
                  <p className="text-sm text-blue-200">Paiement en 3 fois sans frais possible</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <p className="italic text-gray-300 mb-4 border-l-4 border-blue-500 pl-4">
                    "Une œuvre d'art contemporaine de qualité galerie à un prix accessible, livrée en une semaine."
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Tableau premium (120x60 cm)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Choix parmi 10 designs exclusifs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Livraison sous 7 jours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Certificat d'authenticité numéroté</span>
                    </li>
                  </ul>
                  <div className="mb-6">
                    <p className="font-bold text-blue-300">Personnalisation sur demande : +70€</p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/solutions/signature" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Choisir cette offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Création Sur Mesure */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16 transform transition hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-3 text-[#E67E22]">CRÉATION SUR MESURE</h2>
                  <p className="text-xl text-blue-300 mb-4">Votre vision, notre création</p>
                  <p className="text-2xl font-bold text-white">
                    <span className="text-amber-300">À partir de 400€</span>
                  </p>
                  <p className="text-sm text-blue-200">Consultation créative incluse</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <p className="italic text-gray-300 mb-4 border-l-4 border-blue-500 pl-4">
                    "Une œuvre créée exclusivement pour votre établissement, en parfaite harmonie avec votre identité."
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Design unique créé selon vos idées</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Maquette numérique gratuite avant production</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Toile premium jusqu'à 120x180 cm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Rencontre créative incluse</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900 p-4 rounded-lg text-center">
                      <p className="font-bold text-blue-400 mb-2">BASIQUE</p>
                      <p className="text-xl font-bold text-amber-300 mb-2">400€</p>
                      <p className="text-sm">Design personnalisé selon vos directives</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg text-center border border-blue-500">
                      <p className="font-bold text-blue-400 mb-2">PREMIUM</p>
                      <p className="text-xl font-bold text-amber-300 mb-2">550€</p>
                      <p className="text-sm">Consultation créative approfondie + 2 révisions</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg text-center">
                      <p className="font-bold text-blue-400 mb-2">EXCLUSIF</p>
                      <p className="text-xl font-bold text-amber-300 mb-2">700€</p>
                      <p className="text-sm">Développement conceptuel complet + édition limitée numérotée</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/solutions/custom" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Choisir cette offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Espaces */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16 transform transition hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-3 text-[#E67E22]">MULTI-ESPACES</h2>
                  <p className="text-xl text-blue-300 mb-4">Solution complète pour grands établissements</p>
                  <p className="text-2xl font-bold text-white">
                    <span className="text-amber-300">Tarifs dégressifs</span>
                  </p>
                  <p className="text-sm text-blue-200">À partir de 3 tableaux</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <p className="italic text-gray-300 mb-4 border-l-4 border-blue-500 pl-4">
                    "Une solution complète pour habiller tous vos espaces avec une identité visuelle cohérente et distinctive."
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Ensemble de tableaux assortis pour plusieurs espaces</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Thème cohérent adapté à votre établissement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E67E22] mr-2 mt-1">✓</span>
                      <span>Service d'installation professionnelle</span>
                    </li>
                  </ul>
                  <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-blue-400 mb-3">TARIFS DÉGRESSIFS :</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>3 tableaux :</span>
                        <span className="font-bold text-amber-300">269€/tableau (remise 10%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>5 tableaux :</span>
                        <span className="font-bold text-amber-300">254€/tableau (remise 15%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>10+ tableaux :</span>
                        <span className="font-bold text-amber-300">239€/tableau (remise 20%)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-blue-400 mb-2">OPTION ABONNEMENT SAISONNIER :</h3>
                    <p className="mb-2">Ensemble de tableaux renouvelés 4 fois par an</p>
                    <p className="font-bold text-amber-300">À partir de 450€/an (3 tableaux)</p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/solutions/multi-space" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Choisir cette offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">PRÊT À TRANSFORMER VOTRE ESPACE ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Prenez rendez-vous pour une présentation personnalisée de nos collections dans votre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-amber-400 hover:bg-[#66C6E8] text-gray-900 px-8 py-3 rounded-md font-bold transition-colors">
              Demander un rendez-vous
            </Link>
            <Link href="/gallery" className="border border-blue-400 hover:bg-blue-400/10 text-blue-400 px-8 py-3 rounded-md transition-colors">
              Voir notre galerie
            </Link>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">NOS GARANTIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-900 p-6 rounded-lg border-t-2 border-amber-400">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">✓</span>
                <span>Satisfaction garantie</span>
              </h3>
              <p className="text-gray-300">Si le rendu ne vous convient pas, nous le remplaçons</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border-t-2 border-amber-400">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">✓</span>
                <span>Exclusivité locale</span>
              </h3>
              <p className="text-gray-300">Aucun concurrent n'aura le même tableau dans un rayon de 500m</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border-t-2 border-amber-400">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">✓</span>
                <span>Livraison offerte</span>
              </h3>
              <p className="text-gray-300">Sur Pau et agglomération, installation professionnelle incluse</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border-t-2 border-amber-400">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">✓</span>
                <span>Garantie qualité</span>
              </h3>
              <p className="text-gray-300">Toiles premium résistantes aux UV et à l'humidité</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">QUESTIONS FRÉQUENTES</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">Q.</span>
                <span>Comment choisir la formule qui me convient ?</span>
              </h3>
              <p className="text-gray-300 pl-8">
                Tout dépend de vos besoins. Pour tester sans engagement, optez pour l'offre Découverte. 
                Si vous aimez renouveler votre décoration, l'Abonnement Premium est idéal. 
                Pour une œuvre durable, choisissez l'offre Signature, et pour une création unique, 
                la formule Sur Mesure.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">Q.</span>
                <span>Les tableaux sont-ils vraiment exclusifs ?</span>
              </h3>
              <p className="text-gray-300 pl-8">
                Oui, nous garantissons l'exclusivité territoriale. Aucun concurrent dans un rayon de 500m 
                n'aura le même tableau. Pour les créations sur mesure, elles sont entièrement uniques et 
                adaptées à votre établissement.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">Q.</span>
                <span>Quel est le délai de livraison ?</span>
              </h3>
              <p className="text-gray-300 pl-8">
                Pour l'offre Découverte et Signature, la livraison se fait sous 7 jours. 
                Les créations sur mesure nécessitent généralement 2 à 3 semaines selon la complexité. 
                L'abonnement Premium est livré selon le calendrier des saisons.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-[#E67E22] mr-2">Q.</span>
                <span>Quels types d'établissements peuvent bénéficier de vos services ?</span>
              </h3>
              <p className="text-gray-300 pl-8">
                Nos solutions s'adaptent à tous types d'espaces professionnels : salons de coiffure, 
                cabinets médicaux, boutiques, hôtels, restaurants, bureaux d'entreprise... Nous créons des œuvres 
                adaptées à chaque type d'environnement et aux attentes de sa clientèle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Mini-Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">CE QU'EN DISENT NOS CLIENTS</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="italic mb-4 text-gray-300">
                  "Les tableaux de InkIA ont complètement transformé l'ambiance de notre salon. 
                  Nos clients prennent systématiquement des photos et nous posent des questions. 
                  Un vrai plus pour notre image !"
                </p>
                <p className="font-bold text-[#E67E22]">Marie L. - Salon de coiffure, Pau</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="italic mb-4 text-gray-300">
                  "L'abonnement saisonnier nous permet de renouveler notre décoration sans effort. 
                  Nos clients réguliers apprécient ce changement qui marque les saisons."
                </p>
                <p className="font-bold text-[#E67E22]">Thomas D. - Boutique de prêt-à-porter, Pau</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials" className="text-blue-400 hover:text-blue-300 underline">
                Voir tous les témoignages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offre de lancement */}
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gray-900/30 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">OFFRE DE LANCEMENT LIMITÉE</h2>
            <p className="text-xl mb-6">Pour les 10 premiers clients :</p>
            <div className="inline-block text-left mb-8">
              <div className="flex items-center mb-3">
                <span className="text-[#E67E22] mr-2 text-2xl">•</span>
                <span className="text-xl">15% de remise sur toute commande</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#E67E22] mr-2 text-2xl">•</span>
                <span className="text-xl">Un mini-tableau décoratif offert (valeur 40€)</span>
              </div>
            </div>
            <p className="mb-8">Offre valable 30 jours - Contactez-nous rapidement !</p>
            <Link href="/contact" className="bg-amber-400 hover:bg-[#66C6E8] text-gray-900 px-8 py-3 rounded-md font-bold transition-colors">
              Profiter de l'offre
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;