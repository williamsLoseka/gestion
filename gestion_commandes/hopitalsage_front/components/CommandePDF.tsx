import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 8.5, // Taille de police réduite
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.05, // Opacité plus faible pour éviter de "pousser" le contenu
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
    color: '#0a3d62',
  },
  fournisseur: {
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 10,
    color: '#3c6382',
  },
  date: {
    fontSize: 8,
    textAlign: 'right',
    marginBottom: 8,
    color: '#576574',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#dfe6e9',
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderBottom: '1 solid #8395a7',
    color: '#1e272e',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderBottom: '1 solid #dcdde1',
  },
  cell: { flex: 1 },
  cellRight: { flex: 1, textAlign: 'right' },

  totalRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: '1 solid #2f3640',
    textAlign: 'right',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0c2461',
  },
});

export default function CommandePDF({
  commande,
}: {
  commande: { produit: any; quantite: number }[];
}) {
  const date = new Date().toLocaleDateString('fr-FR');
  const totalGeneral = commande.reduce(
    (acc, item) => acc + item.produit.prix_unitaire * item.quantite,
    0
  );
  const nomFournisseur = commande.length > 0 ? commande[0].produit.fabricant.nom : 'N/A';

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR').replace(/\s/g, '.');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        {/* ✅ Image de fond légère et floue */}
        <Image src="/images/med3.jpg" style={styles.backgroundImage} />

        <Text style={styles.title}>Bon de Commande</Text>
        <Text style={styles.fournisseur}>Fournisseur : {nomFournisseur}</Text>
        <Text style={styles.date}>Date : {date}</Text>

        {/* Tableau */}
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Produit</Text>
          <Text style={styles.cellRight}>Quantité</Text>
          <Text style={styles.cellRight}>Prix U (FC)</Text>
          <Text style={styles.cellRight}>Total (FC)</Text>
        </View>

        {commande.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{item.produit.nom}</Text>
            <Text style={styles.cellRight}>{item.quantite}</Text>
            <Text style={styles.cellRight}>{formatNumber(item.produit.prix_unitaire)}</Text>
            <Text style={styles.cellRight}>
              {formatNumber(item.produit.prix_unitaire * item.quantite)}
            </Text>
          </View>
        ))}

        <Text style={styles.totalRow}>
          Total général : {formatNumber(totalGeneral)} FC
        </Text>
      </Page>
    </Document>
  );
}
