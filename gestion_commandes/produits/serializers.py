# serializers.py
from rest_framework import serializers
from .models import Fabricant, Produit

class FabricantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabricant
        fields = '__all__'

class ProduitSerializer(serializers.ModelSerializer):
    fabricant = FabricantSerializer(read_only=True)
    fabricant_id = serializers.PrimaryKeyRelatedField(
        queryset=Fabricant.objects.all(), source='fabricant', write_only=True
    )

    class Meta:
        model = Produit
        fields = ['id', 'nom', 'prix_unitaire', 'fabricant', 'fabricant_id']
