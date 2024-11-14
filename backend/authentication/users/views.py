import requests
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.contrib.auth import authenticate, get_user_model, login as django_login
from .serializers import UserSerializer, LoginSerializer, OTPSerializer
from django.views import View
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import CustomTokenObtainPairSerializer, UserListSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication
import jwt

User = get_user_model()

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')

        if not access_token:
            return None

        try:
            token = AccessToken(access_token, verify=False)
            user = User.objects.get(id=token['user_id'])
            return (user, token)
    
        except jwt.ExpiredSignatureError:
            if not refresh_token:
                raise AuthenticationFailed('Access token expired and refresh token missing.')
            
            new_access_token = self.refresh_access_token(refresh_token)
            if new_access_token:
                request.new_access_token = new_access_token
                new_access_token['oauth2'] = access_token['oauth2']
                user = User.objects.get(id=AccessToken(new_access_token)['user_id'])
                
                return (user, new_access_token)
            else:
                raise AuthenticationFailed('Unable to refresh access token.')
        
        except Exception:
            raise AuthenticationFailed('Invalid token')
        
    def refresh_access_token(self, refresh_token):
        url = 'http://localhost/api/auth/token/refresh-cookie/'
        response = requests.post(url, data={'refresh': refresh_token})

        if response.status_code == 200:
            return response.json().get('access')
        return None


#EFFETTUA LOGIN IMMEDIATO

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)

        response.set_cookie(
            key='access_token', 
            value=access_token, 
            httponly=True, 
            secure=True, 
            max_age=3600
        )
        response.set_cookie(
            key='refresh_token', 
            value=refresh_token, 
            httponly=True, 
            secure=True, 
            max_age=86400
        )

        return response

#NON EFFETTUA LOGIN IMMEDIATO

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = UserSerializer

#     def perform_create(self, serializer):
#         user = serializer.save()

#         refresh = RefreshToken.for_user(user)
#         access_token = str(refresh.access_token)
#         refresh_token = str(refresh)

#         return Response({
#             'message': 'User created successfully',
#             'access_token': access_token,
#             'refresh_token': refresh_token
#         })



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
                refresh = CustomTokenObtainPairSerializer.get_token(user)
                refresh['oauth2'] = False
                access_token = str(refresh.access_token)

                response = Response({"message": "Login successful"})
                response.set_cookie(
                    key='access_token', 
                    value=access_token, 
                    httponly=True, 
                    secure=True, 
                    max_age=3600 
                )
                response.set_cookie(
                    key='refresh_token', 
                    value=str(refresh), 
                    httponly=True, 
                    secure=True, 
                    max_age=86400 
                )
                return response

        return Response({"error": "Invalid Credentials"}, status=400)

class VerifyOTPView(APIView):
    serializer_class = OTPSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        user = User.objects.filter(username=username).first()
        if not user or user == None:
            return Response({"error": "User not found"}, status=400)
        otp_code = request.data.get('otp')
        device = TOTPDevice.objects.filter(user=user, confirmed=True).first()

        if device and device.verify_token(otp_code):
            refresh = CustomTokenObtainPairSerializer.get_token(user)
            refresh['oauth2'] = False
            access_token = str(refresh.access_token)

            response = Response({"message": "Login successful"})
            response.set_cookie(
                key='access_token', 
                    value=access_token, 
                    httponly=True, 
                    secure=True, 
                    max_age=3600
                )
            response.set_cookie(
                    key='refresh_token', 
                    value=str(refresh), 
                    httponly=True, 
                    secure=True, 
                    max_age=86400 
                )
            return response
        else:
            return Response({"error": "Invalid OTP"}, status=400)

class Enable2FAView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request, *args, **kwargs):
        token_str = request.COOKIES.get('access_token')

        if token_str:
            try:
                token = jwt.decode(token_str, 'your-secret-key', algorithms=['HS256'], options={'verify_exp': False})

                if token.get('oauth2') is True:
                    return Response({"error": "2FA can only be enabled for local users"}, status=400)

            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token has expired')
            except jwt.DecodeError:
                raise AuthenticationFailed('Invalid token')
            except Exception as e:
                raise AuthenticationFailed('Authentication failed')

        else:
            raise AuthenticationFailed('Token not found in cookies')

        user = request.user

        device, created = TOTPDevice.objects.get_or_create(user=user, name='default')

        if created:
            otp_uri = device.config_url
            return Response({"otp_uri": otp_uri}, status=200)
        else:
            return Response({"message": "2FA is already enabled"}, status=200)

class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

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
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            'message': 'Login successful'
        })
        response.set_cookie(
            key='access_token', 
            value=access_token, 
            httponly=True, 
            secure=True, 
            max_age=3600
        )
        response.set_cookie(
            key='refresh_token', 
            value=refresh_token, 
            httponly=True, 
            secure=True, 
            max_age=86400
        )
        
        return response

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        response = Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
        
        # if hasattr(request, 'new_access_token'):
        #     response.set_cookie(
        #         key='access_token',
        #         value=request.new_access_token,
        #         httponly=True,
        #         secure=True,
        #         max_age=3600
        #     )
        
        return response
    
class TokenRefreshCookieView(BaseTokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=401)
        
        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            response.set_cookie(
                key='access_token', 
                value=access_token, 
                httponly=True, 
                secure=True, 
                max_age=3600
            )
        return response
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request, *args, **kwargs):
        response = Response({"message": "Logout successful"})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
    
class is_Oauth2View(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request, *args, **kwargs):
        token_str = request.COOKIES.get('access_token')

        if token_str:
            try:
                token = jwt.decode(token_str, 'your-secret-key', algorithms=['HS256'], options={'verify_exp': False})
                return Response({"oauth2": token.get('oauth2')}, status=200)
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token has expired')
            except jwt.DecodeError:
                raise AuthenticationFailed('Invalid token')
            except Exception as e:
                raise AuthenticationFailed('Authentication failed')
        else:
            raise AuthenticationFailed('Token not found in cookies')
        
class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        users = User.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data, status=200)