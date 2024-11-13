from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    online = serializers.BooleanField(read_only=True)
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['avatar', 'online', 'friends']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.avatar:
            representation['avatar'] = instance.avatar.url
        return representation

class AddFriendSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()