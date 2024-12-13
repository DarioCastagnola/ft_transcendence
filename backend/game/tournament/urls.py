from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .tournamentViewSet import TournamentViewSet
from .match import MatchListView, MatchView, MatchCreateView, MatchHistoryView, MatchHistoryPlayerView
from .player import PlayerView, StatView

router = DefaultRouter()

router.register(r'tournaments', TournamentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tournaments/<int:tournament_id>/matches/', MatchListView.as_view(), name='match-list'),
    path('matches/<int:pk>/', MatchView.as_view(), name='match-detail'),
    path('players/<int:pk>/', PlayerView.as_view(), name='player-detail'),
    path('stat/<int:user_id>/', StatView.as_view(), name='stat-detail'),
    path('matches/', MatchCreateView.as_view(), name='match-create'),
    path('matches/history/', MatchHistoryView.as_view(), name='match-history'),
    path('matches/history/<int:pk>/', MatchHistoryPlayerView.as_view(), name='match-history-player'),
]
