import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">TÉMOIGNAGES</h2>
          <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-all duration-300">
            <div className="mb-4">
              <svg className="h-8 w-8 text-[#66C6E8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
            <p className="text-lg mb-6">
              Depuis l'installation du tableau, nos clients s'arrêtent et commentent systématiquement. C'est devenu un véritable point d'attraction dans notre boutique.
            </p>
            <div>
              <div className="font-bold">Marie L.</div>
              <div className="text-neutral-400">Fleuriste à Pau</div>
            </div>
          </div>
          
          <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-all duration-300">
            <div className="mb-4">
              <svg className="h-8 w-8 text-[#66C6E8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
            <p className="text-lg mb-6">
              Le système d'abonnement est parfait pour notre salon. Nos clients réguliers apprécient de découvrir une nouvelle œuvre à chaque saison, cela crée de la conversation et rafraîchit notre image.
            </p>
            <div>
              <div className="font-bold">Thomas D.</div>
              <div className="text-neutral-400">Salon de coiffure</div>
            </div>
          </div>
          
          <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-all duration-300">
            <div className="mb-4">
              <svg className="h-8 w-8 text-[#66C6E8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
            <p className="text-lg mb-6">
              Nous avons opté pour l'offre HORIZON pour décorer nos trois étages de bureaux. La cohérence artistique tout en ayant des œuvres différentes est exactement ce que nous recherchions.
            </p>
            <div>
              <div className="font-bold">Philippe R.</div>
              <div className="text-neutral-400">Directeur administratif</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}