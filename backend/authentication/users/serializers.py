from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email:
            raise serializers.ValidationError({"email": "L'email non può essere vuota."})
        

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "L'email è già in uso."})
        
        if password:
            password_validator = RegexValidator(
                regex=r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
                message=(
                    "La password deve contenere almeno 8 caratteri, una lettera maiuscola, "
                    "una lettera minuscola, un numero e un carattere speciale."
                )
            )
            password_validator(password)
        
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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['oauth2'] = False
        return token

class UserListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username')


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_username(self, value):
        # Controlla che il nuovo username sia univoco, escludendo l'utente attuale
        if User.objects.filter(username=value).exclude(pk=self.instance.pk).exists():
            raise ValidationError("Il nome utente è già in uso.")
        return value

    def validate_email(self, value):
        # Controlla che la nuova email sia univoca, escludendo l'utente attuale
        if User.objects.filter(email=value).exclude(pk=self.instance.pk).exists():
            raise ValidationError("L'email è già in uso.")
        return value

    def validate_password(self, value):
        # Validatore per la password
        password_validator = RegexValidator(
            regex=r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
            message=(
                "La password deve contenere almeno 8 caratteri, una lettera maiuscola, "
                "una lettera minuscola, un numero e un carattere speciale."
            )
        )
        password_validator(value)
        return value

    def update(self, instance, validated_data):
        # Aggiorna password se presente
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        # Aggiorna gli altri campi
        instance = super().update(instance, validated_data)
        instance.save()
        return instance