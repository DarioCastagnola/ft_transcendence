from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Tournament(models.Model):
    TOURNAMENT_TYPES = [
        ("tournament", "Torneo"),
        ("elimination", "Eliminazione diretta"),
    ]
    
    type = models.CharField(max_length=20, choices=TOURNAMENT_TYPES, blank=False)
    max_participants = models.IntegerField(
        validators=[MinValueValidator(2), MaxValueValidator(8)],
        default=2
    )
    closed = models.BooleanField(default=False)
    players = models.ManyToManyField('Player', blank=False)
    duration = models.IntegerField(null=False, blank=False, default=300, validators=[MinValueValidator(60), MaxValueValidator(3600)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_type_display()} - {self.max_participants} partecipanti"
    
class Player(models.Model):
    PLAYER_TYPES = [
        ("USER", "Utente"),
        ("BOT", "Computer"),
        ("GUEST", "Ospite"),
    ]

    user_id = models.IntegerField(null=True, blank=True)
    nickname = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=PLAYER_TYPES, blank=False)
    stat = models.OneToOneField('Stat', on_delete=models.CASCADE, blank=True, null=True)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.nickname
    
class Stat(models.Model):
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.wins} vittorie, {self.losses} sconfitte, {self.draws} pareggi"