from models import Match, Player, Stat, Tournament
from rest_framework import serializers

class matchserializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('id', 'tournament', 'player1', 'player2', 'winner', 'draw', 'closed', 'created_at', 'updated_at')
        extra_kwargs = {'tournament': {'required': True}, 'player1': {'required': True}, 'player2': {'required': True}, 'winner': {'required': False}, 'draw': {'required': False}, 'closed': {'required': False}, 'created_at': {'required': False}, 'updated_at': {'required': False}}

class playerserializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'user_id', 'nickname', 'type', 'score')
        extra_kwargs = {'user_id': {'required': False}, 'nickname': {'required': True}, 'type': {'required': True}, 'score': {'required': False}}

class statserializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'player', 'wins', 'losses', 'draws')
        extra_kwargs = {'player': {'required': True}, 'wins': {'required': False}, 'losses': {'required': False}, 'draws': {'required': False}}

class tournamentserializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id', 'type', 'max_participants', 'closed', 'players', 'duration', 'point_to_win', 'created_at', 'updated_at')
        extra_kwargs = {'type': {'required': True}, 'max_participants': {'required': True}, 'closed': {'required': False}, 'players': {'required': False}, 'duration': {'required': True}, 'point_to_win': {'required': True}, 'created_at': {'required': False}, 'updated_at': {'required': False}}