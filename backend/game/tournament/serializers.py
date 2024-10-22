from .models import Match, Player, Stat, Tournament
from rest_framework import serializers

class MatchSerializer(serializers.ModelSerializer):
    player1 = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())
    player2 = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())
    winner = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all(), required=False)

    class Meta:
        model = Match
        fields = ('id', 'tournament', 'player1', 'player2', 'winner', 'draw', 'closed', 'created_at', 'updated_at')
        extra_kwargs = {'tournament': {'required': True}, 'player1': {'required': True}, 'player2': {'required': True}, 'winner': {'required': False}, 'draw': {'required': False}, 'closed': {'required': False}, 'created_at': {'required': False}, 'updated_at': {'required': False}}

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'user_id', 'nickname', 'type', 'score')
        extra_kwargs = {'user_id': {'required': False}, 'nickname': {'required': True}, 'type': {'required': True}, 'score': {'required': False}}

class StatSerializer(serializers.ModelSerializer):
    player = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())

    class Meta:
        model = Stat
        fields = ('id', 'player', 'wins', 'losses', 'draws')
        extra_kwargs = {'player': {'required': True}, 'wins': {'required': False}, 'losses': {'required': False}, 'draws': {'required': False}}

class TournamentSerializer(serializers.ModelSerializer):
    players = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all(), required=False, many=True)
    
    class Meta:
        model = Tournament
        fields = ('user_id', 'type', 'max_participants', 'closed', 'players', 'duration', 'point_to_win', 'created_at', 'updated_at')
        extra_kwargs = {'user_id': {'required': True},'type': {'required': True}, 'max_participants': {'required': True}, 'closed': {'required': False}, 'players': {'required': False}, 'duration': {'required': True}, 'point_to_win': {'required': True}, 'created_at': {'required': False}, 'updated_at': {'required': False}}