from .models import Match, Player, Stat, Tournament
from rest_framework import serializers

class MatchSerializer(serializers.ModelSerializer):
    player1 = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())
    player2 = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())
    player1_score = serializers.IntegerField(required=False)
    player2_score = serializers.IntegerField(required=False)
    winner = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all(), required=False)

    class Meta:
        model = Match
        fields = ('id', 'tournament', 'player1', 'player2', 'winner', 'draw', 'closed', 'created_at', 'updated_at', 'player1_score', 'player2_score')
        extra_kwargs = {'tournament': {'required': True}, 'player1': {'required': True}, 'player2': {'required': True}, 'winner': {'required': False}, 'draw': {'required': False}, 'closed': {'required': False}, 'created_at': {'required': False}, 'updated_at': {'required': False}, 'player1_score': {'required': False}, 'player2_score': {'required': False}}

class PlayerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    score = serializers.IntegerField(read_only=True)

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
    closed = serializers.BooleanField(default=False, read_only=True)
    type = serializers.ChoiceField(choices=Tournament.TOURNAMENT_TYPES)
    duration = serializers.IntegerField(min_value=10, max_value=600, help_text="Duration in seconds min 10 max 600")
    
    class Meta:
        model = Tournament
        fields = ('id', 'user_id', 'type', 'max_participants', 'closed', 'players', 'duration', 'point_to_win', 'created_at', 'updated_at')
        extra_kwargs = {'id': {'required': False}, 'user_id': {'required': False},'type': {'required': True}, 'max_participants': {'required': True}, 'closed': {'required': False}, 'players': {'required': False}, 'duration': {'required': True}, 'point_to_win': {'required': True}, 'created_at': {'required': False}, 'updated_at': {'required': False}}

class TournamentCreateSerializer(serializers.Serializer):
    type = serializers.ChoiceField(choices=[("TOURNAMENT", "Tournament")], required=True)
    max_participants = serializers.IntegerField(min_value=2, max_value=10, required=True)
    duration = serializers.IntegerField(required=True, min_value=10, max_value=600, help_text="Duration in seconds min 10 max 600")
    point_to_win = serializers.IntegerField(min_value=1, required=True)

class SetMatchWinnerSerializer(serializers.Serializer):
    winner = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all(), required=False, allow_null=True)
    draw = serializers.BooleanField(required=False)
    player1_score = serializers.IntegerField(required=False)
    player2_score = serializers.IntegerField(required=False)

class RapidMatchSerializer(serializers.ModelSerializer):
    player1_score = serializers.IntegerField(required=True)
    player2_score = serializers.IntegerField(required=True)
    draw = serializers.BooleanField(required=False, read_only=True)
    closed = serializers.BooleanField(required=False, read_only=True)
    winner = serializers.PrimaryKeyRelatedField(read_only=True)
    player1 = serializers.PrimaryKeyRelatedField(read_only=True)
    player2 = serializers.PrimaryKeyRelatedField(read_only=True)
    tournament = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Match
        fields = ('id', 'tournament', 'player1', 'player2', 'winner', 'draw', 'closed', 'created_at', 'updated_at', 'player1_score', 'player2_score')
        extra_kwargs = {
            'tournament': {'required': False},  
            'player1': {'required': False},
            'player2': {'required': False},
            'winner': {'required': False},
            'draw': {'required': False},
            'closed': {'required': False},
            'created_at': {'required': False},
            'updated_at': {'required': False},
        }

    def create(self, validated_data):
        return Match.objects.create(**validated_data)
