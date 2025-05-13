'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CommandePDF from '../../components/CommandePDF'; // ajuste le chemin si besoin


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

export default function CommandePage() {
  const [fabricants, setFabricants] = useState<Fabricant[]>([]);
  const [selectedFabricant, setSelectedFabricant] = useState<number | null>(null);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [commande, setCommande] = useState<{ produit: Produit; quantite: number }[]>([]);
  const [editionIndex, setEditionIndex] = useState<number | null>(null);
  const [nouvelleQuantite, setNouvelleQuantite] = useState<number>(1);

  useEffect(() => {
    fetch('http://localhost:8000/api/fabricants/')
      .then((res) => res.json())
      .then((data) => setFabricants(data));
  }, []);

  useEffect(() => {
    if (selectedFabricant !== null) {
      fetch(`http://localhost:8000/api/produits/?fabricant=${selectedFabricant}`)
        .then((res) => res.json())
        .then((data) => setProduits(data));
    } else {
      setProduits([]);
    }
  }, [selectedFabricant]);

  const ajouterProduit = (produit: Produit, quantite: number) => {
    if (quantite <= 0) return;
    const exist = commande.find((c) => c.produit.id === produit.id);
    if (exist) {
      setCommande((prev) =>
        prev.map((c) =>
          c.produit.id === produit.id
            ? { ...c, quantite: c.quantite + quantite }
            : c
        )
      );
    } else {
      setCommande((prev) => [...prev, { produit, quantite }]);
    }
  };

  const supprimerProduit = (index: number) => {
    setCommande((prev) => prev.filter((_, i) => i !== index));
  };

  const modifierQuantite = (index: number) => {
    if (nouvelleQuantite <= 0) return;
    setCommande((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantite: nouvelleQuantite } : item
      )
    );
    setEditionIndex(null);
    setNouvelleQuantite(1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Passage de commande</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Sélectionner un fabricant :</label>
        <select
          className="border rounded px-4 py-2 w-full"
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Produits du fabricant sélectionné</h2>
          <ul className="space-y-4">
            {produits.map((prod) => (
              <li key={prod.id} className="border rounded p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{prod.nom}</p>
                    <p>Prix unitaire : {prod.prix_unitaire} FC</p>
                  </div>
                  <CommandeForm produit={prod} onAdd={ajouterProduit} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Commande en cours</h2>
        {commande.length === 0 ? (
          <p>Aucun produit ajouté.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Produit</th>
                <th className="border p-2">Fabricant</th>
                <th className="border p-2">Quantité</th>
                <th className="border p-2">Prix U</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commande.map((c, i) => (
                <tr key={i}>
                  <td className="border p-2">{c.produit.nom}</td>
                  <td className="border p-2">{c.produit.fabricant.nom}</td>
                  <td className="border p-2">
                    {editionIndex === i ? (
                      <input
                        type="number"
                        value={nouvelleQuantite}
                        min={1}
                        onChange={(e) => setNouvelleQuantite(Number(e.target.value))}
                        className="border px-2 py-1 w-20"
                      />
                    ) : (
                      c.quantite
                    )}
                  </td>
                  <td className="border p-2">{c.produit.prix_unitaire}</td>
                  <td className="border p-2">{c.produit.prix_unitaire * c.quantite} FC</td>
                  <td className="border p-2">
                    {editionIndex === i ? (
                      <button
                        onClick={() => modifierQuantite(i)}
                        className="bg-green-600 text-white px-2 py-1 rounded mr-1"
                      >
                        OK
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditionIndex(i);
                          setNouvelleQuantite(c.quantite);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Modifier
                      </button>
                    )}
                    <button
                      onClick={() => supprimerProduit(i)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
        {commande.length > 0 && (
        <div className="mt-4">
          <PDFDownloadLink
            document={<CommandePDF commande={commande} />}
            fileName="bon-de-commande.pdf"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {({ loading }) =>
              loading ? 'Préparation du PDF...' : '📄 Télécharger le Bon de Commande'
            }
          </PDFDownloadLink>
        </div>
      )}

      </div>
    </div>
  );
}


// 🔹 Formulaire de quantité et bouton pour commander
function CommandeForm({
  produit,
  onAdd,
}: {
  produit: Produit;
  onAdd: (produit: Produit, quantite: number) => void;
}) {
  const [quantite, setQuantite] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        value={quantite}
        onChange={(e) => setQuantite(parseInt(e.target.value))}
        className="border px-2 py-1 rounded w-20"
      />
      <button
        onClick={() => {
          onAdd(produit, quantite);
          setQuantite(1);
        }}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Commander
      </button>
    </div>
  );
}
