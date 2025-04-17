import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 bg-[#66C6E8] text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">NOUS CONTACTER</h2>
              <p className="mb-8">
                Prenez rendez-vous pour une consultation artistique personnalisée et découvrez comment nos œuvres peuvent transformer votre espace.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Galerie d'art à Pau</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@inkia.art</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>05 XX XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>@inkia.art</span>
                </div>
              </div>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#66C6E8]"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#66C6E8]"
                    placeholder="Votre email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#66C6E8]"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="collection">Offre Collection</option>
                    <option value="signature">Offre Signature</option>
                    <option value="evolution">Offre Évolution</option>
                    <option value="horizon">Offre Horizon</option>
                    <option value="other">Autre demande</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#66C6E8]"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#66C6E8] hover:bg-[#4FA8C6] text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}