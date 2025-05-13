'use client';

import { useState } from 'react';

export default function AjouterFabricantPage() {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/fabricants/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom }),
    });

    if (res.ok) {
      setMessage('Fabricant ajouté avec succès.');
      setNom('');
    } else {
      setMessage('Erreur lors de l’ajout.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Ajouter un fabricant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du fabricant"
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Enregistrer
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
    </div>
  );
}
