from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer, AddFriendSerializer
from .utils import get_user_id
from rest_framework.exceptions import ValidationError
from django.utils import timezone

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
        
    def create_user_profile(self, user_id):
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
        
class UpdateLastSeen(APIView):
    def post(self, request):
        user_id = get_user_id(request)
        if not user_id:
            raise ValidationError({"error": "User not found"})
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            profile.last_seen = timezone.now()
            profile.save()
            return Response({'error': 'Last seen updated'}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class IsOnline(APIView):
    def get(self, request, user_id):
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            if profile.last_seen and (timezone.now() - profile.last_seen).seconds < 60:
                return Response({'is_online': True}, status=status.HTTP_200_OK)
            return Response({'is_online': False}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)