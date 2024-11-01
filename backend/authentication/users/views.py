import requests
from django.conf import settings
from django.contrib.auth import get_user_model, login, authenticate
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.contrib.auth import authenticate, login as django_login
from .serializers import UserSerializer, LoginSerializer, OTPSerializer
from django.http import JsonResponse
from django.views import View
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            device = TOTPDevice.objects.filter(user=user, confirmed=True).first()
            if device:
                return Response({"message": "2FA enabled, enter OTP"}, status=200)
            else:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
        return Response({"error": "Invalid Credentials"}, status=400)

class VerifyOTPView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OTPSerializer


    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        user = User.objects.filter(username=username).first()
        if not user or user == None:
            return Response({"error": "User not found"}, status=400)
        otp_code = request.data.get('otp')
        device = TOTPDevice.objects.filter(user=user, confirmed=True).first()

        if device and device.verify_token(otp_code):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid OTP"}, status=400)

class Enable2FAView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        device, created = TOTPDevice.objects.get_or_create(user=user, name='default')
        otp_uri = device.config_url
        return Response({"otp_uri": otp_uri}, status=200)

class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"message": "User deleted successfully"}, status=204)
    

class OAuth2CallbackView(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        
        if not code:
            return Response({"error": "No code provided"}, status=400)
        
        token_url = f"{settings.OAUTH2_PROVIDER_URL}/token"
        data = {
            'grant_type': 'authorization_code',
            'client_id': settings.OAUTH2_CLIENT_ID,
            'client_secret': settings.OAUTH2_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.OAUTH2_REDIRECT_URI,
        }
        
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        try:
            response = requests.post(token_url, data=data, headers=headers)
            response.raise_for_status() 
        except requests.HTTPError as e:
            return Response({"error": f"Failed to obtain access token: {str(e)}"}, status=response.status_code)
        
        tokens = response.json()
        access_token = tokens.get('access_token')
        
        if not access_token:
            return Response({"error": "No access token found"}, status=400)
        
        user_info_url = settings.USER_INFO_URL
        headers = {'Authorization': f'Bearer {access_token}'}
        try:
            user_info_response = requests.get(user_info_url, headers=headers)
            user_info_response.raise_for_status()
        except requests.HTTPError as e:
            return Response({"error": f"Failed to obtain user info: {str(e)}"}, status=user_info_response.status_code)
        
        user_info = user_info_response.json()
        username = user_info.get('login')
        email = user_info.get('email')
        
        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email}
        )
        
        if created:
            user.save()

        django_login(request, user, backend='oauth2_provider.backends.OAuth2Backend')

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
    


# class OAuth2CallbackView(APIView):
#     def post(self, request, *args, **kwargs):
#         code = request.data.get('code')  # Ottieni il code dal body della richiesta
        
#         if not code:
#             return Response({"error": "No code provided"}, status=400)
        
#         token_url = f"{settings.OAUTH2_PROVIDER_URL}/token"
#         data = {
#             'grant_type': 'authorization_code',
#             'client_id': settings.OAUTH2_CLIENT_ID,
#             'client_secret': settings.OAUTH2_CLIENT_SECRET,
#             'code': code,
#             'redirect_uri': settings.OAUTH2_REDIRECT_URI,
#         }
        
#         headers = {'Content-Type': 'application/x-www-form-urlencoded'}
#         try:
#             response = requests.post(token_url, data=data, headers=headers)
#             response.raise_for_status() 
#         except requests.HTTPError as e:
#             return Response({"error": f"Failed to obtain access token: {str(e)}"}, status=response.status_code)
        
#         tokens = response.json()
#         access_token = tokens.get('access_token')
        
#         if not access_token:
#             return Response({"error": "No access token found"}, status=400)
        
#         user_info_url = settings.USER_INFO_URL
#         headers = {'Authorization': f'Bearer {access_token}'}
#         try:
#             user_info_response = requests.get(user_info_url, headers=headers)
#             user_info_response.raise_for_status()
#         except requests.HTTPError as e:
#             return Response({"error": f"Failed to obtain user info: {str(e)}"}, status=user_info_response.status_code)
        
#         user_info = user_info_response.json()
#         username = user_info.get('login')
#         email = user_info.get('email')
        
#         user, created = User.objects.get_or_create(
#             username=username,
#             defaults={'email': email}
#         )
        
#         if created:
#             user.save()

#         django_login(request, user, backend='oauth2_provider.backends.OAuth2Backend')

#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         })