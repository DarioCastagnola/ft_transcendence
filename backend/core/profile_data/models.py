import os
from django.db import models

def avatar_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'avatar_{instance.user_id}.{ext}'
    return os.path.join('avatars', filename)

class UserProfile(models.Model):
    user_id = models.IntegerField()
    avatar = models.ImageField(upload_to=avatar_file_path, null=True, blank=True)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True, related_name='friend_set')
    online = models.BooleanField(default=False)

    def __str__(self):
        return f'User {self.user_id} avatar'

    def save(self, *args, **kwargs):
        if self.pk:
            old_avatar = UserProfile.objects.filter(pk=self.pk).first()
            if old_avatar and old_avatar.avatar and self.avatar != old_avatar.avatar:
                old_avatar.avatar.delete(save=False)
        super().save(*args, **kwargs)

    