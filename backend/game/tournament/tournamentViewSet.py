from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Tournament
from .serializers import TournamentSerializer
from .views import get_user_id

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    def create(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy() 
        data['id_user'] = user_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)