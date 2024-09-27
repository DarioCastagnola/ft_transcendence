# from django.db import models

# class UserProfile(models.Model):
#     user_id = models.IntegerField()  # ID utente fornito dal microservizio di autenticazione
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)  # Campo per l'avatar

#     def __str__(self):
#         return f'User {self.user_id} avatar'

# import os
# from django.db import models

# def avatar_file_path(instance, filename):
#     # Estrai l'estensione del file originale
#     ext = filename.split('.')[-1]
#     # Costruisci il nuovo nome del file come avatar{user_id}.{ext}
#     filename = f'avatar{instance.user_id}.{ext}'
#     # Definisci il percorso nella cartella avatars
#     return os.path.join('avatars', filename)

# class UserProfile(models.Model):
#     user_id = models.IntegerField()  # ID utente fornito dal microservizio di autenticazione
#     avatar = models.ImageField(upload_to=avatar_file_path, null=True, blank=True)  # Campo per l'avatar

#     def __str__(self):
#         return f'User {self.user_id} avatar'

from django.db import models
import os

def avatar_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'avatar{instance.user_id}.{ext}'
    return os.path.join('avatars', filename)

class UserProfile(models.Model):
    user_id = models.IntegerField()
    avatar = models.ImageField(upload_to=avatar_file_path, null=True, blank=True)

    def __str__(self):
        return f'User {self.user_id} avatar'

    def save(self, *args, **kwargs):
        if self.pk:
            old_avatar = UserProfile.objects.get(pk=self.pk).avatar
            if old_avatar and self.avatar != old_avatar:
                old_avatar.delete(save=False)
        super().save(*args, **kwargs)