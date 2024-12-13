from rest_framework.generics import RetrieveAPIView
from .serializers import PlayerSerializer, StatSerializer
from .models import Player, Stat
from rest_framework import response, status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response


class PlayerView(RetrieveAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    

class StatView(RetrieveAPIView):
    serializer_class = StatSerializer

    def get_object(self):
        # Ottieni l'user_id dalla request (ad esempio dai parametri URL o dai dati della sessione)
        user_id = self.kwargs.get('user_id')  # supponendo che user_id sia passato come parametro nell'URL

        if not user_id:
            raise NotFound("user_id non fornito nella richiesta")

        try:
            # Trova l'oggetto Stat corrispondente a user_id
            stat = Stat.objects.get(user_id=user_id)
        except Stat.DoesNotExist:
            raise NotFound(f"Stat per l'utente con user_id {user_id} non trovato")

        return stat

    def get(self, request, *args, **kwargs):
        instance = self.get_object()  # recupera l'oggetto tramite get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)