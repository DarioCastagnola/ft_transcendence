from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
from django.views import View
from django.conf import settings
import requests
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer, AddFriendSerializer
from .utils import get_user_id
from rest_framework.exceptions import ValidationError

AUTH_SERVICE_URL = 'http://authentication:8002/api/auth/user-info/'

class UserInfoView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"detail": "Authorization header not provided"}, status=400)

        parts = auth_header.split()

        if len(parts) != 2 or parts[0] != 'Bearer':
            return Response({"detail": "Authorization header must be 'Bearer <token>'"}, status=400)

        token = parts[1]

        headers = {'Authorization': f'Bearer {token}'}
        try:
            response = requests.get(AUTH_SERVICE_URL, headers=headers)
            response.raise_for_status()  # Genera un'eccezione per errori HTTP
        except requests.exceptions.RequestException as e:
            return Response({"detail": "Failed to retrieve user info", "error": str(e)}, status=500)

        if response.status_code == 200:
            return Response(response.json(), status=200)
        else:
            return Response({"detail": "Failed to retrieve user info"}, status=response.status_code)
    

class UserProfileUpdate(APIView):
    serializer_class = UserProfileSerializer

    def post(self, request):
        user_id = get_user_id(request)

        if user_id is None:
            return Response({'error': 'User ID not found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = UserProfile.objects.get(user_id=user_id)
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        except UserProfile.DoesNotExist:
            serializer = UserProfileSerializer(data=request.data, user_id=user_id)

        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileDetail(APIView):
    serializer_class = UserProfileSerializer
    def get(self, request, user_id):
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            profile = self.create_user_profile(user_id)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def create_user_profile(user_id):
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            return profile
        except UserProfile.DoesNotExist:
            avatar = "/avatars/anon.jpeg"
            return UserProfile.objects.create(user_id=user_id, avatar=avatar)
        
class AddFriendView(APIView):
    serializer_class = AddFriendSerializer
    def post(self, request):
        user_id = get_user_id(request)
        if not user_id:
            raise ValidationError({"error": "User not found"})
        friend_id = request.data.get('friend_id')
        if not friend_id:
            return Response({'error': 'Friend ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        if user_id == friend_id:
            return Response({'error': 'You cannot add yourself as a friend'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            friend = UserProfile.objects.get(user_id=friend_id)
            if friend in profile.friends.all():
                return Response({'error': 'Friend already added'}, status=status.HTTP_400_BAD_REQUEST)
            profile.friends.add(friend)
            profile.save()
            return Response({'error': 'Friend added'}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class RemoveFriendView(APIView):
    serializer_class = AddFriendSerializer
    def post(self, request):
        user_id = get_user_id(request)
        if not user_id:
            raise ValidationError({"error": "User not found"})
        friend_id = request.data.get('friend_id')
        if not friend_id:
            return Response({'error': 'Friend ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            friend = UserProfile.objects.get(user_id=friend_id)
            if friend not in profile.friends.all():
                return Response({'error': 'Friend not found'}, status=status.HTTP_400_BAD_REQUEST)
            profile.friends.remove(friend)
            profile.save()
            return Response({'error': 'Friend removed'}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)