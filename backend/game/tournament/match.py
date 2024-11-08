from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .serializers import MatchSerializer, RapidMatchSerializer
from .models import Match, Player, Stat
from .views import get_user_id, get_user_info
from rest_framework.exceptions import ValidationError
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse, extend_schema_view
from .errorResponseSerializer import ErrorResponseSerializer


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
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class MatchCreateView(CreateAPIView):
    serializer_class = RapidMatchSerializer
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
        ],
        request=RapidMatchSerializer,
        responses={
            status.HTTP_201_CREATED: MatchSerializer,
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                response=ErrorResponseSerializer,
                description="User not found"
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                response=ErrorResponseSerializer,
                description="Validation errors"
            ),
        }
    )
    def post(self, request, *args, **kwargs):
        user_id = get_user_id(self.request)
        if not user_id:
            raise ValidationError({"error": "User not found"})

        player = Player.objects.filter(user_id=user_id).first()
        if not player:
            username = get_user_info(self.request, "username")
            if username:
                player = Player.objects.create(
                    user_id=user_id, 
                    nickname=username, 
                    type=Player.PLAYER_TYPES[0][0]
                )
            else:
                raise ValidationError({"error": "User data could not be retrieved"})
            
        if not hasattr(player, 'stat'):
            Stat.objects.create(player=player)

        player2 = Player.objects.filter(nickname="Guest").first()
        if not player2:
            player2 = Player.objects.create(nickname="Guest", type=Player.PLAYER_TYPES[2][0])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        draw = False
        if serializer.validated_data.get('player1_score') == serializer.validated_data.get('player2_score'):
            win = None
            draw = True
        else:
            win = player if serializer.validated_data.get('player1_score') > serializer.validated_data.get('player2_score') else player2
        match = serializer.save(player1=player, player2=player2, tournament_id=None, closed=True, winner=win, draw=draw)

        stat = player.stat
        if match.winner == player:
            stat.wins += 1
        elif match.draw:
            stat.draws += 1
        else:
            stat.losses += 1
        stat.save()

        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)


@extend_schema_view(
    get=extend_schema(
        parameters=[
            OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
        ],
        responses={
            status.HTTP_200_OK: MatchSerializer(many=True),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                response=ErrorResponseSerializer,
                description="User not found"
            ),
        }
    )
)
class MatchHistoryView(ListAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self, *args, **kwargs):
        user_id = get_user_id(self.request)
        if not user_id:
            return Match.objects.none()

        player = Player.objects.filter(user_id=user_id).first()
        if not player:
            return Match.objects.none()

        matches = Match.objects.filter(player1=player) | Match.objects.filter(player2=player)
        return matches.order_by('-updated_at')