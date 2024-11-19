from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    avatar = serializers.ImageField(read_only=True, required=False)
    last_seen = serializers.DateTimeField(
        format='%d %B %Y, %H:%M', 
        read_only=True, 
        required=False
    )

    class Meta:
        model = UserProfile
        fields = ['avatar', 'friends', 'user_id', 'last_seen']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.avatar:
            representation['avatar'] = instance.avatar.url
        return representation

class AddFriendSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()