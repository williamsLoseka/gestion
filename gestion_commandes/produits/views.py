from django.shortcuts import render
from rest_framework import viewsets
from .models import Fabricant, Produit
from .serializers import FabricantSerializer, ProduitSerializer

class FabricantViewSet(viewsets.ModelViewSet):
    queryset = Fabricant.objects.all()
    serializer_class = FabricantSerializer


from rest_framework import filters
# views.py
from rest_framework import viewsets
from .models import Produit
from .serializers import ProduitSerializer

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        fabricant_id = self.request.query_params.get('fabricant')
        if fabricant_id:
            queryset = queryset.filter(fabricant_id=fabricant_id)
        return queryset
