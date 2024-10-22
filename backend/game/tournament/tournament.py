from abc import ABC, abstractmethod
from models import Match

class TournamentManager(ABC):
    def __init__(self, tournament):
        self.tournament = tournament

    @abstractmethod
    def next_round(self):
        pass

    @abstractmethod
    def set_match(self):
        pass
    
    def set_match_winner(self, match, winner=None, draw=False):
        if draw and winner is not None:
            raise ValueError("A match cannot have both a winner and be a draw.")
        match = Match.objects.select_related('player1__stat', 'player2__stat').get(id=match.id)

        match.winner = winner
        match.closed = True
        match.draw = draw
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
        else:
            match.player1.score += 0.5
            match.player2.score += 0.5
            if match.player1.type == "USER":
                match.player1.stat.draws += 1
            if match.player2.type == "USER":
                match.player2.stat.draws += 1
        match.player1.save()
        match.player2.save()
        match.save()


    def add_player(self, player):
        player.score = 0
        self.tournament.players.add(player)
    
    def close_tournament(self):
        self.tournament.closed = True
        self.tournament.save()

    def leaderboard(self):
        return self.tournament.players.select_related('stat').order_by('-score')