from rest_framework import response, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import MatchSerializer
from .models import Match

class MatchListView(ListAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Match.objects.filter(tournament_id=tournament_id)
    
class MatchView(RetrieveAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data, status=status.HTTP_200_OK)