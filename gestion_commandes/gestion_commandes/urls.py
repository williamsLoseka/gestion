from django.contrib import admin
from django.urls import path, include
from django.urls import path, include
from rest_framework import routers
from produits.views import FabricantViewSet, ProduitViewSet

router = routers.DefaultRouter()
router.register(r'fabricants', FabricantViewSet)
router.register(r'produits', ProduitViewSet)
#router.register(r'commandes', CommandeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

]



