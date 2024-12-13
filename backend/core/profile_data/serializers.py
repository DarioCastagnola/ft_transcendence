from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    avatar = serializers.ImageField(required=False, allow_empty_file=True)
    last_seen = serializers.DateTimeField(
        format='%d %B %Y, %H:%M',
        read_only=True,
        required=False
    )

    class Meta:
        model = UserProfile
        fields = ['avatar', 'friends', 'user_id', 'last_seen']

    def create(self, validated_data):
        # Gestisci la creazione del profilo
        user_id = self.context.get('user_id')
        avatar = validated_data.pop('avatar', None)
        
        profile = UserProfile.objects.create(
            user_id=user_id,
            avatar=avatar
        )
        return profile

    def update(self, instance, validated_data):
        # Gestisci l'aggiornamento del profilo
        avatar = validated_data.pop('avatar', None)
        if avatar:
            # Cancella il vecchio avatar se esiste
            if instance.avatar:
                instance.avatar.delete(save=False)
            instance.avatar = avatar
        
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.avatar:
            representation['avatar'] = instance.avatar.url
        return representation

class AddFriendSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()