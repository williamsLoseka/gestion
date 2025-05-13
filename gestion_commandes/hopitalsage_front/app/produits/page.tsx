'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Fabricant = {
  id: number
  nom: string
}

export default function ProduitsPage() {
  const [nom, setNom] = useState('')
  const [prixUnitaire, setPrixUnitaire] = useState('')
  const [fabricants, setFabricants] = useState<Fabricant[]>([])
  const [fabricantId, setFabricantId] = useState<number | null>(null)

  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('/api/fabricants/').then((res) => {
      setFabricants(res.data)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/produits/', {
        nom,
        prix_unitaire: parseFloat(prixUnitaire),
        fabricant_id: fabricantId,
      })
      setMessage('Produit ajouté avec succès !')
      setNom('')
      setPrixUnitaire('')
      setFabricantId(null)
    } catch (err) {
      console.error(err)
      setMessage("Erreur lors de l'ajout")
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter un Produit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom du produit"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Prix unitaire"
          value={prixUnitaire}
          onChange={(e) => setPrixUnitaire(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={fabricantId ?? ''}
          onChange={(e) => setFabricantId(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Sélectionner un fabricant</option>
          {fabricants.map((fab) => (
            <option key={fab.id} value={fab.id}>
              {fab.nom}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  )
}
