'use client';

import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const [heure, setHeure] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHeure(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-green-700 text-3xl" />
        <div>
          <h1 className="text-xl font-bold text-green-700">Gestion des commandes de produits</h1>
          <p className="text-sm text-gray-500">Bienvenue dans votre tableau de bord</p>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Heure actuelle : <span className="font-semibold">{heure}</span>
      </div>
    </header>
  );
}
