from django.core.management.base import BaseCommand
from oauth2_provider.models import Application

class Command(BaseCommand):
    help = 'Crea un client OAuth2 per l\'autenticazione'

    def handle(self, *args, **kwargs):
        client_id = 'u-s4t2ud-ad73af585dfdd1ff90139ee7a9030635a0f9f563b584c7a3b92dd0dda112b3cd'
        client_secret = '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'
        application, created = Application.objects.get_or_create(
            client_id=client_id,
            defaults={
                'name': 'oauth2',
                'client_type': Application.CLIENT_CONFIDENTIAL,
                'authorization_grant_type': Application.GRANT_PASSWORD,
                'client_secret': client_secret,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Client OAuth2 creato con successo'))
        else:
            self.stdout.write(self.style.WARNING('Client OAuth2 già esistente'))
