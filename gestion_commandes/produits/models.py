from django.db import models

# models.py
class Fabricant(models.Model):
    nom = models.CharField(max_length=255)

class Produit(models.Model):
    nom = models.CharField(max_length=255)
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)
    fabricant = models.ForeignKey(Fabricant, on_delete=models.CASCADE)

class Commande(models.Model):
    date_commande = models.DateTimeField(auto_now_add=True)

class LigneCommande(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE, related_name="lignes")
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.PositiveIntegerField()

    @property
    def montant(self):
        return self.quantite * self.produit.prix_unitaire

