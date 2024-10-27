from .tournament import TournamentManager
from .models import Match

class ClassicTournamentManager(TournamentManager):
    
    def next_round(self, request):
        if self.Player.objects.all().count() != self.tournament.max_participants:
            return "Not enough players"
        if self.tournament.closed:
            return "Tournament is closed"
        if Match == None:
            self.set_match()
        matches = Match.objects.select_related('player1', 'player2').filter(tournament=self.tournament)
        for match in matches:
            if not match.closed:
                return match
        return None

    def set_match(self):
        if self.tournament.closed:
            return "Tournament is closed"
        if self.tournament.players.all().count() != self.tournament.max_participants:
            return "Not enough players"
        players = list(self.tournament.players.all())
        for i in range(len(players) - 1):
            for j in range(i + 1, len(players)): 
                match = Match.objects.create(tournament=self.tournament, player1=players[i], player2=players[j])
                match.save()
        return "Matches created"