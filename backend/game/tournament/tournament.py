from abc import ABC, abstractmethod
from .models import Match, Tournament, Stat
from .serializers import MatchSerializer, PlayerSerializer, StatSerializer, TournamentSerializer
from rest_framework import status
from rest_framework.response import Response

class TournamentManager(ABC):
    def __init__(self, tournament):
        if not isinstance(tournament, Tournament):
            raise TypeError("Expected a Tournament instance")
        self.tournament = tournament

    @abstractmethod
    def next_round(self):
        pass

    @abstractmethod
    def set_match(self):
        pass
    
    def set_match_winner(self, match, winner=None, draw=False, player1_score=None, player2_score=None):
        if self.tournament.closed:
            raise ValueError("Tournament is closed.")
        if not isinstance(match, Match):
            raise TypeError("Expected a Match instance.")
        if match.closed:
            raise ValueError("The match is already closed.")
        if draw and winner is not None:
            raise ValueError("A match cannot have both a winner and be a draw.")
        if player1_score is None or player2_score is None:
            raise ValueError("Both player scores are required.")
        if winner is None and not draw:
            raise ValueError("A winner or a draw is required.")
        if winner not in {match.player1, match.player2} and not draw:
            raise ValueError("Winner must be one of the players.")

        match.winner = winner
        match.closed = True
        match.draw = draw
        match.player1_score = player1_score
        match.player2_score = player2_score

        if winner == match.player1:
            match.player1.score += 1
            if match.player1.type == "USER":
                match.player1.stat.wins += 1
            if match.player2.type == "USER":
                match.player2.stat.losses += 1
        elif winner == match.player2:
            match.player2.score += 1
            if match.player2.type == "USER":
                match.player2.stat.wins += 1
            if match.player1.type == "USER":
                match.player1.stat.losses += 1
        elif draw:
            match.player1.score += 0.5
            match.player2.score += 0.5
            if match.player1.type == "USER":
                match.player1.stat.draws += 1
            if match.player2.type == "USER":
                match.player2.stat.draws += 1

        if match.player1.type == "USER":
            match.player1.stat.save()
        
        if match.player2.type == "USER":
            match.player2.stat.save()

        match.player1.save()
        match.player2.save()
        match.save()

        if self.next_round() is None:
            self.tournament.closed = True
            self.tournament.save()
        
        return match




    def add_player(self, player):
        if self.tournament.players.filter(id=player.id).exists() and player.type == "USER":
            raise ValueError(f"Player {player.nickname} is already in the tournament.")
        
        player.save()
        if player.type == "USER" and not hasattr(player, 'stat'):
            Stat.objects.create(player=player)
        
        if self.tournament.closed:
            raise ValueError("Tournament is closed.")
        
        if self.tournament.players.count() >= self.tournament.max_participants:
            raise ValueError("Tournament is full.")
        
        if self.tournament.players.filter(nickname=player.nickname).exists():
            raise ValueError(f"Nickname {player.nickname} is already in use.")
        
        player.score = 0
        player.save()
        
        self.tournament.players.add(player)
        self.tournament.save()
        if self.tournament.players.count() == self.tournament.max_participants:
            self.set_match()
    
    def close_tournament(self):
        if self.tournament.closed:
            raise ValueError("Tournament is already closed.")
        self.tournament.closed = True
        self.tournament.save()

    def leaderboard(self):
        return (
            self.tournament.players
            .select_related('stat')
            .values('id', 'nickname', 'score', 'stat__wins', 'stat__losses', 'stat__draws')
            .order_by('-score', '-stat__wins', 'stat__losses', '-stat__draws')
        )
