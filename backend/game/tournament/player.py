from rest_framework.generics import RetrieveAPIView
from .serializers import PlayerSerializer, StatSerializer
from .models import Player, Stat
from rest_framework import response, status


class PlayerView(RetrieveAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    

class StatView(RetrieveAPIView):
    serializer_class = StatSerializer
    queryset = Stat.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data, status=status.HTTP_200_OK)