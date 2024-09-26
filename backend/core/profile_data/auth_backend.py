import requests
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

class AuthServiceBackend(BaseBackend):
    def authenticate(self, request, token=None):
        if not token:
            return None

        # Chiama il servizio di autenticazione
        response = requests.get(
            'http://auth:8002/auth/user-info/',  # Cambia l'URL se necessario
            headers={'Authorization': f'Bearer {token}'}
        )

        if response.status_code == 200:
            user_data = response.json()
            # Ora puoi creare o ottenere l'utente locale basato sui dati dal servizio `auth`
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data.get('email', ''),
                    'first_name': user_data.get('first_name', ''),
                    'last_name': user_data.get('last_name', '')
                }
            )
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None