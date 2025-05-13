'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const messages = [
    "💊 Bienvenue dans l'application de gestion pharmaceutique",
    "🩺 Gagnez du temps et gardez le contrôle",
    "📦 Suivi intelligent de vos produits médicaux",
    "🧾 Bonne utilisation et excellente gestion !"
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 overflow-hidden">
      {/* Image de fond floutée */}
      <img
        src="/images/med1.jpg"
        alt="Pharmacie"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 blur-sm z-0"
      />

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 transition-opacity duration-1000">
          {messages[currentMessageIndex]}
        </h1>

        {/* Images des médicaments */}
        <div className="flex flex-wrap justify-center gap-8 animate-pulse">
          <img src="/images/med1.jpg" alt="Médicament 1" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg" />
          <img src="/images/med2.jpg" alt="Médicament 2" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg" />
          <img src="/images/med3.jpg" alt="Médicament 3" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg" />
          <img src="/images/med4.jpg" alt="Médicament 4" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg" />
        </div>
      </div>
    </main>
  );
}
