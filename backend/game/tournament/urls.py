from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .tournamentViewSet import TournamentViewSet

router = DefaultRouter()

router.register(r'tournaments', TournamentViewSet)

urlpatterns = [
    path('tournaments/', include(router.urls)),
]
