'use client';

import { useState, useEffect } from 'react';

type Fabricant = {
  id: number;
  nom: string;
};

type Produit = {
  id: number;
  nom: string;
  prix_unitaire: number;
  fabricant: Fabricant;
};

export default function ModifierPrixProduits() {
  const [fabricants, setFabricants] = useState<Fabricant[]>([]);
  const [selectedFabricant, setSelectedFabricant] = useState<number | null>(null);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [prixModifies, setPrixModifies] = useState<{ [key: number]: number }>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/fabricants/')
      .then((res) => res.json())
      .then(setFabricants);
  }, []);

  useEffect(() => {
    if (selectedFabricant) {
      fetch(`http://localhost:8000/api/produits/?fabricant=${selectedFabricant}`)
        .then((res) => res.json())
        .then(setProduits);
    } else {
      setProduits([]);
    }
  }, [selectedFabricant]);

  const handlePrixChange = (id: number, newPrice: number) => {
    setPrixModifies((prev) => ({ ...prev, [id]: newPrice }));
  };

  const saveModifications = async () => {
    setIsSaving(true);
    const updates = Object.entries(prixModifies).map(async ([id, newPrice]) => {
      return fetch(`http://localhost:8000/api/produits/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prix_unitaire: newPrice }),
      });
    });

    await Promise.all(updates);
    setPrixModifies({});
    // Rafraîchir les produits
    const res = await fetch(`http://localhost:8000/api/produits/?fabricant=${selectedFabricant}`);
    const data = await res.json();
    setProduits(data);
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛠 Modifier le prix des produits</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Sélectionner un fabricant :</label>
        <select
          className="border px-4 py-2 w-full rounded"
          value={selectedFabricant ?? ''}
          onChange={(e) => setSelectedFabricant(Number(e.target.value))}
        >
          <option value="">-- Choisir un fabricant --</option>
          {fabricants.map((fab) => (
            <option key={fab.id} value={fab.id}>
              {fab.nom}
            </option>
          ))}
        </select>
      </div>

      {produits.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Produits disponibles</h2>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-2 text-left">Nom</th>
                <th className="border px-2 py-2 text-left">Prix unitaire (FC)</th>
                <th className="border px-2 py-2 text-left">Nouveau prix</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((prod) => (
                <tr key={prod.id}>
                  <td className="border px-2 py-2">{prod.nom}</td>
                  <td className="border px-2 py-2">{prod.prix_unitaire}</td>
                  <td className="border px-2 py-2">
                    <input
                      type="number"
                      value={prixModifies[prod.id] ?? prod.prix_unitaire}
                      onChange={(e) => handlePrixChange(prod.id, Number(e.target.value))}
                      className="border px-2 py-1 rounded w-24"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={saveModifications}
            disabled={isSaving || Object.keys(prixModifies).length === 0}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSaving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
          </button>
        </div>
      )}
    </div>
  );
}
