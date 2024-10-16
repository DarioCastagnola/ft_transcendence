from tournament import TournamentManager
from game.tournament.models import Match

class ClassicTournamentManager(TournamentManager):
    
    def next_round(self):
        match = list(self.tournament.match_set.all())
        for m in match:
            if m.closed == False:
                return m
        return None

    def set_match(self):
        players = list(self.tournament.players.all())
        for i in range(len(players) - 1):
            for j in range(i + 1, len(players)): 
                match = Match.objects.create(tournament=self.tournament, player1=players[i], player2=players[j])

    