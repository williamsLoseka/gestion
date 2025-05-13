'use client';

import { useEffect, useState } from 'react';

export default function AjouterProduitPage() {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [fabricantId, setFabricantId] = useState('');
  const [fabricants, setFabricants] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFabricants = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/fabricants/');
        const data = await res.json();
        setFabricants(data);
      } catch (error) {
        setMessage("Erreur lors du chargement des fabricants.");
      }
    };
    fetchFabricants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const prixDecimal = parseFloat(prix.replace(',', '.')); // remplace les virgules par des points

    if (isNaN(prixDecimal)) {
      setMessage("Veuillez entrer un prix valide.");
      return;
    }

    const res = await fetch('http://localhost:8000/api/produits/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom,
        prix_unitaire: prixDecimal,
        fabricant_id: fabricantId,
      }),
    });

    if (res.ok) {
      setMessage('✅ Produit ajouté avec succès.');
      setNom('');
      setPrix('');
      setFabricantId('');
    } else {
      const errorData = await res.json();
      setMessage(`❌ Erreur lors de l’ajout : ${JSON.stringify(errorData)}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Ajouter un produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du produit"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          inputMode="decimal"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          placeholder="Prix unitaire (ex: 12.50)"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <select
          value={fabricantId}
          onChange={(e) => setFabricantId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Sélectionner un fabricant</option>
          {fabricants.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-blue-700">{message}</p>}
    </div>
  );
}
