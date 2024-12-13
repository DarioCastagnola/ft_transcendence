import os
from django.db import models

def avatar_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'avatar_{instance.user_id}.{ext}'
    return os.path.join('avatars', filename)

class UserProfile(models.Model):
    user_id = models.IntegerField()
    avatar = models.ImageField(upload_to=avatar_file_path, null=True, blank=True)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    last_seen = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'User {self.user_id} avatar'

    def save(self, *args, **kwargs):
        # Controlla se l'oggetto esiste già nel database
        if self.pk:
            try:
                # Recupera l'istanza esistente
                old_profile = UserProfile.objects.filter(pk=self.pk).first()
                
                # Verifica se c'è un avatar precedente e se è diverso da quello attuale
                if (old_profile and 
                    old_profile.avatar and 
                    self.avatar and 
                    self.avatar != old_profile.avatar):
                    # Cancella il vecchio avatar
                    old_profile.avatar.delete(save=False)
            except Exception:
                # Ignora qualsiasi errore durante il processo
                pass
        
        # Salva l'oggetto
        super().save(*args, **kwargs)