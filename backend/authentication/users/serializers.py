from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        email = data.get('email')
        
        if not email:
            raise serializers.ValidationError({"email": "L'email non può essere vuota."})
        

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "L'email è già in uso."})
        
        return data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class OTPSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp = serializers.CharField()