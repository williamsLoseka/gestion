'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FaCapsules,
  FaFileMedicalAlt,
  FaShoppingCart,
  FaHome,
  FaPlus,
  FaList,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const [openProduits, setOpenProduits] = useState(false);

  return (
    <aside className="w-64 bg-green-50 text-blue-800 flex flex-col shadow-md border-r border-green-100">
      <div className="p-6 text-center text-2xl font-bold text-green-700 bg-white border-b">
        💊 PharmApp
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        {/* Accueil */}
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200 ${
            pathname === '/' ? 'bg-green-100 text-green-800' : 'hover:bg-green-100 hover:text-green-800'
          }`}
        >
          <FaHome className="text-lg" /> Accueil
        </Link>

        {/* Produits avec sous-menu */}
        <button
          onClick={() => setOpenProduits(!openProduits)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition hover:bg-green-100 hover:text-green-800"
        >
          <span className="flex items-center gap-3">
            <FaCapsules className="text-lg" /> Produits
          </span>
          {openProduits ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        </button>

        {openProduits && (
          <div className="ml-8 mt-2 space-y-2 text-sm transition-all">
            <Link
              href="/produits/ajouter"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-green-100 ${
                pathname === '/produits/ajouter' ? 'bg-green-100 text-green-800' : ''
              }`}
            >
              <FaPlus /> Ajouter Produit
            </Link>
            <Link
              href="/produits/modifier"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-green-100 ${
                pathname === '/produits/modifier' ? 'bg-green-100 text-green-800' : ''
              }`}
            >
              <FaList /> Gérer Produits
            </Link>
          </div>
        )}

        {/* Commandes */}
        <Link
          href="/commandes"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200 ${
            pathname === '/commandes' ? 'bg-green-100 text-green-800' : 'hover:bg-green-100 hover:text-green-800'
          }`}
        >
          <FaShoppingCart className="text-lg" /> Commandes
        </Link>

        {/* Rapports */}
        <Link
          href="/fabricants/ajouter"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200 ${
            pathname === '/rapports' ? 'bg-green-100 text-green-800' : 'hover:bg-green-100 hover:text-green-800'
          }`}
        >
          <FaFileMedicalAlt className="text-lg" /> Ajouter Fournisseur
        </Link>
      </nav>

      <div className="p-4 text-xs text-center text-green-600 border-t border-green-100">
        &copy; {new Date().getFullYear()} PharmApp
      </div>
    </aside>
  );
}
