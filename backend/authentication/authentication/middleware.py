from django.utils.deprecation import MiddlewareMixin

class RefreshAccessTokenMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # Controlla se è presente un nuovo access_token nella richiesta
        new_access_token = getattr(request, 'new_access_token', None)
        
        if new_access_token:
            # Aggiorna il cookie con il nuovo access_token
            response.set_cookie('access_token', new_access_token, httponly=True, secure=True, samesite='Lax')
        
        return response