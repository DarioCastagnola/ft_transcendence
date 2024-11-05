from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .tournamentViewSet import TournamentViewSet
from .match import MatchListView, MatchView
from .player import PlayerView, StatView

router = DefaultRouter()

router.register(r'tournaments', TournamentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tournaments/<int:tournament_id>/matches/', MatchListView.as_view(), name='match-list'),
    path('matches/<int:pk>/', MatchView.as_view(), name='match-detail'),
    path('players/<int:pk>/', PlayerView.as_view(), name='player-detail'),
    path('stats/<int:pk>/', StatView.as_view(), name='stat-detail'),
]
