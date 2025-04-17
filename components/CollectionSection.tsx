import React from 'react';
import CollectionCard3d from './CollectionCard3d';

export default function CollectionSection() {
  const collections = [
    {
      title: "COLLECTION",
      subtitle: "Devenez propriétaire d'une œuvre qui vous ressemble",
      description: "Acquérez une œuvre d'art qui sublimera votre espace professionnel et captivera votre clientèle.",
      imageSrc: "/image1.png",
      price: "70€",
      features: [
        "Tableaux grand format (jusqu'à 120 cm)",
        "Designs exclusifs",
        "Différentes collections thématiques disponibles",
        "Achat direct ou paiement mensuel"
      ],
      idealFor: "Boutiques, cabinets, restaurants souhaitant investir dans une décoration distinctive et durable.",
      linkText: "En savoir plus",
      linkHref: "#contact"
    },
    {
      title: "SIGNATURE",
      subtitle: "Une œuvre unique conçue exclusivement pour vous",
      description: "Exprimez votre identité à travers une création artistique personnalisée.",
      imageSrc: "/image2.png",
      price: "Sur devis",
      features: [
        "Consultation créative dédiée",
        "Design sur-mesure selon vos souhaits",
        "Format adapté à votre espace",
        "Œuvre exclusive qui vous appartient pleinement"
      ],
      idealFor: "Établissements souhaitant une œuvre reflétant parfaitement leur identité et leurs valeurs.",
      linkText: "Demander un devis",
      linkHref: "#contact"
    },
    {
      title: "ÉVOLUTION",
      subtitle: "Renouvelez votre décor au fil des saisons",
      description: "Maintenez la fraîcheur de votre espace avec un renouvellement artistique régulier.",
      imageSrc: "/image3.png",
      price: "45€/mois",
      features: [
        "4 tableaux différents par an",
        "Designs exclusifs adaptés à la saisonnalité",
        "Installation et remplacement inclus",
        "Uniquement sur Pau et sa région"
      ],
      idealFor: "Commerces souhaitant maintenir une fraîcheur visuelle et surprendre régulièrement leur clientèle.",
      linkText: "Nous contacter",
      linkHref: "#contact"
    }
  ];

  return (
    <div className="mb-24">
      <h3 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#66C6E8] to-[#922B21]">IMPACT</span>
        <span className="block text-lg font-normal mt-2 text-[#6D6D6D]">Pour un espace unique à valoriser</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <CollectionCard3d
            key={index}
            {...collection}
          />
        ))}
      </div>
    </div>
  );
}