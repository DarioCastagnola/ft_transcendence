from abc import ABC, abstractmethod
from .models import Match, Tournament, Stat

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
    
    def set_match_winner(self, match, winner=None, draw=False):
        if draw and winner is not None:
            raise ValueError("A match cannot have both a winner and be a draw.")
        match = Match.objects.select_related('player1__stat', 'player2__stat').get(id=match.id, tournament=self.tournament)

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
        if self.tournament.players.filter(id=player.id).exists():
            raise ValueError(f"Player {player.id} is already in the tournament.")
        
        if player.type == "USER" and not hasattr(player, 'stat'):
            player.save()
            stat_instance = Stat.objects.create(player=player)
            player.stat = stat_instance
            player.save()
        
        if self.tournament.closed:
            raise ValueError("Cannot add player to a closed tournament.")
        
        if self.tournament.players.count() >= self.tournament.max_participants:
            raise ValueError("Tournament is full.")
        
        if self.tournament.players.filter(nickname=player.nickname).exists():
            raise ValueError(f"Nickname {player.nickname} is already in use.")
        
        player.score = 0
        player.save()
        
        self.tournament.players.add(player)
        self.tournament.save()
    
    def close_tournament(self):
        self.tournament.closed = True
        self.tournament.save()

    def leaderboard(self):
        return (
            self.tournament.players
            .select_related('stat')
            .values('id', 'nickname', 'score', 'stat__wins', 'stat__losses', 'stat__draws')
            .order_by('-score', '-stat__wins', 'stat__losses', '-stat__draws')
        )
