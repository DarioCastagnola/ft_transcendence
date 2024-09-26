from django.contrib import admin
from oauth2_provider.models import Application, AccessToken, RefreshToken

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'client_id', 'client_type', 'authorization_grant_type')
    search_fields = ('name', 'client_id')

if not admin.site._registry.get(Application):
    admin.site.register(Application, ApplicationAdmin)

class AccessTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'application', 'expires')
    search_fields = ('user', 'token')

if not admin.site._registry.get(AccessToken):
    admin.site.register(AccessToken, AccessTokenAdmin)

class RefreshTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'application', 'expires')
    search_fields = ('user', 'token')

# Registrazione condizionale per evitare conflitti
if not admin.site._registry.get(RefreshToken):
    admin.site.register(RefreshToken, RefreshTokenAdmin)