from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from django.views import View
import jwt
from django.conf import settings

def hello_world(request):
    return JsonResponse({"message": "Hello, World!"})

class VerifyTokenView(View):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return JsonResponse({"detail": "Authorization header not provided"}, status=400)

        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != 'Bearer':
            return JsonResponse({"detail": "Authorization header must be 'Bearer <token>'"}, status=400)

        token = parts[1]

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            return JsonResponse({"detail": "Token is valid", "payload": decoded_token}, status=200)
        except jwt.ExpiredSignatureError:
            return JsonResponse({"detail": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"detail": "Invalid token"}, status=401)