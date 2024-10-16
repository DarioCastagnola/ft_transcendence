from abc import ABC, abstractmethod

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
        match.winner = winner
        match.closed = True
        match.draw = draw
        match.save()


    def add_player(self, player):
        self.tournament.players.add(player)
    
    def close_tournament(self):
        self.tournament.closed = True
        self.tournament.save()
