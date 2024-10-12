from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Tournament(models.Model):
    TOURNAMENT_TYPES = [
        ("TOURNAMENT", "Torneo"),
        ("ELIMINATION", "Eliminazione diretta"),
    ]
    id_user = models.IntegerField(null=False, blank=False)
    type = models.CharField(max_length=20, choices=TOURNAMENT_TYPES, blank=False)
    max_participants = models.IntegerField(
        validators=[MinValueValidator(2), MaxValueValidator(8)],
        default=2
    )
    closed = models.BooleanField(default=False)
    players = models.ManyToManyField('Player', blank=True)
    duration = models.IntegerField(null=False, blank=False, default=300, validators=[MinValueValidator(60), MaxValueValidator(3600)])
    point_to_win = models.IntegerField(null=False, blank=False, default=3, validators=[MinValueValidator(1), MaxValueValidator(10)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_type_display()} - {self.max_participants} partecipanti"
    
    def delete(self):
        self.players.clear()
        super().delete()
    
class Player(models.Model):
    PLAYER_TYPES = [
        ("USER", "Utente"),
        ("BOT", "Computer"),
        ("GUEST", "Ospite"),
    ]

    user_id = models.IntegerField(null=True, blank=True)
    nickname = models.CharField(max_length=100, blank=False)
    type = models.CharField(max_length=100, choices=PLAYER_TYPES, blank=False)
    stat = models.OneToOneField('Stat', on_delete=models.CASCADE, blank=True, null=True)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.nickname
    
    def save(self, *args, **kwargs):
        if self.type == "USER" and not self.stat_id:
            self.stat, created = Stat.objects.get_or_create()  # Ottieni o crea lo stat
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.type == "USER" and self.stat:
            self.stat.delete()
        super().delete(*args, **kwargs)
    
class Stat(models.Model):
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.wins} vittorie, {self.losses} sconfitte, {self.draws} pareggi"
    
class Match(models.Model):
    tournament = models.ForeignKey('Tournament', on_delete=models.CASCADE, blank=False, null=False)
    player1 = models.ForeignKey('Player', on_delete=models.CASCADE, related_name='player1', blank=True, null=True)
    player2 = models.ForeignKey('Player', on_delete=models.CASCADE, related_name='player2', blank=True, null=True)
    winner = models.ForeignKey('Player', on_delete=models.CASCADE, related_name='winner', blank=True, null=True)
    draw = models.BooleanField(default=False)
    closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.player1} vs {self.player2} - {self.tournament}"
